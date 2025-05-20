#!/usr/bin/env bash
set -euo pipefail

# LEARN-X Setup Script
# This script prepares the environment for running the LEARN-X application.
# It follows the Setup Script Contract defined in AGENTS.md

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

# 1. Install system dependencies
info "Step 1/6: Installing system dependencies..."
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
    python3-venv
else
  warn "Non-Debian/Ubuntu system detected. Please ensure the following packages are installed:"
  warn "  - build-essential"
  warn "  - libpq-dev"
  warn "  - git"
  warn "  - curl"
  warn "  - python3"
  warn "  - python3-pip"
  warn "  - python3-venv"
fi

# 2. Upgrade Python packaging tools
info "Step 2/6: Upgrading Python packaging tools..."
python3 -m pip install --upgrade pip wheel setuptools

# 3. Pre-install any heavyweight wheels (if needed)
# info "Step 3/6: Pre-installing heavyweight wheels..."
# python3 -m pip install --no-cache-dir torch==2.2.0+cpu

# 4. Install Python runtime dependencies
info "Step 4/6: Installing Python runtime dependencies..."
python3 -m pip install -r requirements.txt

# 5. Set up environment variables
info "Step 5/6: Setting up environment variables..."

# Check for required environment variables
MISSING_VARS=()
[ -z "${OPENAI_API_KEY:-}" ] && MISSING_VARS+=("OPENAI_API_KEY")
[ -z "${DATABASE_URL:-}" ] && MISSING_VARS+=("DATABASE_URL")

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
  warn "The following required environment variables are not set: ${MISSING_VARS[*]}"
  warn "Please set them in your environment or in a .env file. See .env.example."
  exit 1
fi

# Set default values for optional variables
export LEARNX_ENV=${LEARNX_ENV:-dev}
export PORT=${PORT:-8000}

# 6. Verify setup
info "Step 6/6: Verifying setup..."

# Check Python version
PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
if [[ "$PYTHON_VERSION" < "3.8" ]]; then
  warn "Python 3.8 or higher is required. Current version: $PYTHON_VERSION"
  exit 1
fi

# Verify Python packages
REQUIRED_PACKAGES=("fastapi" "uvicorn" "sqlalchemy" "psycopg2-binary" "python-dotenv")
for pkg in "${REQUIRED_PACKAGES[@]}"; do
  if ! python3 -c "import $pkg" &>/dev/null; then
    warn "Required Python package '$pkg' is not installed."
    exit 1
  fi
done

info "✅ Setup completed successfully!"
info "You can now start the application with: bash start.sh"

# Make the script executable
chmod +x setup.sh
