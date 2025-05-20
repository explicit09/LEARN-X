#!/usr/bin/env bash
set -e
[ -z "$OPENAI_API_KEY" ] && { echo "OPENAI_API_KEY not set"; exit 1; }
[ -z "$DATABASE_URL" ] && { echo "DATABASE_URL not set"; exit 1; }
pip install -r requirements.txt
pip install -r requirements-dev.txt
(cd frontend && npm ci)
