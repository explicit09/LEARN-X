#!/usr/bin/env bash
set -e

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

# Load environment variables from .env file
if [ -f .env ]; then
  info "Loading environment variables from .env file"
  set -o allexport
  source .env
  set +o allexport
else
  warn "No .env file found. Using system environment variables."
fi

# Check required environment variables
missing_vars=()
[ -z "${OPENAI_API_KEY}" ] && missing_vars+=(OPENAI_API_KEY)
[ -z "${DATABASE_URL}" ] && missing_vars+=(DATABASE_URL)

if [ ${#missing_vars[@]} -ne 0 ]; then
  warn "Missing required environment variables: ${missing_vars[*]}"
  warn "Please set them in your environment or in a .env file. See .env.example."
  exit 1
fi

USE_DOCKER=${USE_DOCKER:-false}

if [ "$USE_DOCKER" = true ] || [ "$1" = "docker" ]; then
  # Start with Docker Compose
  info "Starting application using Docker Compose"
  docker-compose up
else
  # Start backend and frontend separately
  info "Starting LEARN-X application locally"
  
  # Activate virtual environment if it exists
  if [ -d "venv" ]; then
    source venv/bin/activate
  fi
  
  # Start backend in the background
  info "Starting backend server on port ${PORT:-8000}"
  nohup uvicorn backend.app.main:app --host 0.0.0.0 --port "${PORT:-8000}" --reload > backend.log 2>&1 &
  BACKEND_PID=$!
  
  # Start frontend if it exists
  if [ -d "frontend" ]; then
    info "Starting frontend server on port 3000"
    cd frontend
    nohup npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
  fi
  
  info "Applications started! Backend running on http://localhost:${PORT:-8000}"
  if [ -d "frontend" ]; then
    info "Frontend running on http://localhost:3000"
  fi
  
  # Handle script termination
  trap cleanup EXIT
  cleanup() {
    info "Shutting down application..."
    [ -n "${BACKEND_PID:-}" ] && kill $BACKEND_PID
    [ -n "${FRONTEND_PID:-}" ] && kill $FRONTEND_PID
    info "Application stopped"
  }
  
  # Wait for user to press Ctrl+C
  info "Press Ctrl+C to stop the application"
  wait
fi
