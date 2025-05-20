#!/usr/bin/env bash
set -e

# Check required environment variables
missing_vars=()
[ -z "$OPENAI_API_KEY" ] && missing_vars+=(OPENAI_API_KEY)
[ -z "$DATABASE_URL" ] && missing_vars+=(DATABASE_URL)

if [ ${#missing_vars[@]} -ne 0 ]; then
  echo "Error: Missing required environment variables: ${missing_vars[*]}"
  echo "Please set them in your environment or in a .env file. See .env.example."
  exit 1
fi

exec uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
