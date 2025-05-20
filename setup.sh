#!/usr/bin/env bash
set -euo pipefail

# LEARN-X Setup Script
# This script prepares the environment for running the LEARN-X application.

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

section() {
  echo -e "\n${BLUE}==== $1 ====${NC}"
}

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  info "Creating .env file from .env.example..."
  cp .env.example .env
  warn "Please update the .env file with your own values"
 fi

# 1. Install system dependencies
section "Installing system dependencies"
if command -v apt-get &> /dev/null; then
  # Debian/Ubuntu
  sudo apt-get update
  sudo apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    git \
    curl \
    python3-dev \
    python3-pip \
    python3-venv \
    nodejs \
    npm
else
  warn "Non-Debian/Ubuntu system detected. Please ensure the following packages are installed:"
  warn "  - build-essential"
  warn "  - libpq-dev"
  warn "  - git"
  warn "  - curl"
  warn "  - python3-dev"
  warn "  - python3-pip"
  warn "  - python3-venv"
  warn "  - nodejs (v18+)"
  warn "  - npm"
fi

# 2. Set up Python environment
section "Setting up Python environment"
info "Upgrading Python packaging tools..."
python3 -m pip install --upgrade pip wheel setuptools

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  info "Creating Python virtual environment..."
  python3 -m venv venv
fi

# Activate the virtual environment
info "Activating virtual environment..."
source venv/bin/activate

# 3. Install Python dependencies
section "Installing Python dependencies"
info "Installing backend dependencies..."
pip install -r requirements.txt

# 4. Install Node.js dependencies
section "Installing Node.js dependencies"
if [ -d "frontend" ]; then
  info "Installing frontend dependencies..."
  cd frontend
  npm install
  cd ..
fi

# 5. Set up environment variables
section "Setting up environment variables"

# Check for required environment variables
source .env
MISSING_VARS=()
[ -z "${OPENAI_API_KEY:-}" ] && MISSING_VARS+=("OPENAI_API_KEY")
[ -z "${DATABASE_URL:-}" ] && MISSING_VARS+=("DATABASE_URL")
[ -z "${JWT_SECRET:-}" ] && MISSING_VARS+=("JWT_SECRET")

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
  warn "The following required environment variables are not set: ${MISSING_VARS[*]}"
  warn "Please update them in your .env file."
  # Don't exit, just warn
fi

# 6. Set up the database
section "Database setup"
if command -v docker &> /dev/null; then
  info "Docker detected, setting up PostgreSQL with pgvector..."
  info "Starting PostgreSQL using Docker..."
  docker-compose up -d postgres
  
  info "Waiting for PostgreSQL to be ready..."
  sleep 5
  
  info "Initializing database with pgvector extension..."
  # Use the environment variables from the .env file
  docker-compose exec postgres psql -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-learnx}" -f /app/backend/scripts/init_db.sql
else
  warn "Docker not detected. Please manually set up PostgreSQL with pgvector extension."
  warn "See README.md for manual database setup instructions."
fi

# 7. Initialize database schema with Alembic
section "Database migration"
if command -v alembic &> /dev/null; then
  info "Initializing database schema using Alembic..."
  cd backend
  alembic revision --autogenerate -m "initial schema"
  alembic upgrade head
  cd ..
else
  warn "Alembic not found. Migrations will be applied when the application starts."
fi

# 8. Verify setup
section "Verifying setup"

# Check Python version
PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
if [[ "$PYTHON_VERSION" < "3.8" ]]; then
  warn "Python 3.8 or higher is required. Current version: $PYTHON_VERSION"
fi

# Verify Python packages
REQUIRED_PACKAGES=("fastapi" "uvicorn" "sqlalchemy" "psycopg2" "alembic" "pgvector")
MISSING_PKGS=()
for pkg in "${REQUIRED_PACKAGES[@]}"; do
  if ! python3 -c "import $pkg" &>/dev/null; then
    MISSING_PKGS+=("$pkg")
  fi
done

if [ ${#MISSING_PKGS[@]} -ne 0 ]; then
  warn "The following required Python packages are not installed: ${MISSING_PKGS[*]}"
  warn "Try running: pip install -r requirements.txt"
fi

info "✅ Setup completed successfully!"
info "You can start the application with: ./start.sh"

# Make the scripts executable
chmod +x setup.sh
chmod +x start.sh

