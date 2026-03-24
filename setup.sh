#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SETTINGS_TARGET="$HOME/.pi/agent/settings.json"

echo "🍕 Installing pizza..."
pi install "$SCRIPT_DIR"

# Symlink pi settings
if [ -L "$SETTINGS_TARGET" ]; then
  echo "⏭  settings.json already symlinked"
elif [ -f "$SETTINGS_TARGET" ]; then
  echo "🔗 Replacing settings.json with symlink..."
  rm "$SETTINGS_TARGET"
  ln -s "$SCRIPT_DIR/settings.json" "$SETTINGS_TARGET"
else
  echo "🔗 Symlinking settings.json..."
  ln -s "$SCRIPT_DIR/settings.json" "$SETTINGS_TARGET"
fi
