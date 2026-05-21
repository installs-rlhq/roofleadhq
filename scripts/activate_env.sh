#!/bin/bash
# RoofLeadHQ Environment Activation Script
# Usage: source scripts/activate_env.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Activate virtual environment
if [ -d "$ROOT_DIR/venv" ]; then
    source "$ROOT_DIR/venv/bin/activate"
    echo "✅ Virtual environment activated"
else
    echo "❌ venv not found at $ROOT_DIR/venv"
    return 1
fi

# Load environment variables
if [ -f "$ROOT_DIR/.env" ]; then
    set -a
    source "$ROOT_DIR/.env"
    set +a
    echo "✅ Environment variables loaded from .env"
else
    echo "❌ .env file not found at $ROOT_DIR/.env"
    return 1
fi

echo "🐍 Python: $(which python)"
echo "📦 Composio: $(composio --version 2>/dev/null || echo 'not installed')"
echo "🔑 VAPI_PRIVATE_KEY loaded: $([ -n "$VAPI_PRIVATE_KEY" ] && echo 'YES' || echo 'NO')"