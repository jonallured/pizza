#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🍕 Installing pizza as a pi package..."
pi install "$SCRIPT_DIR"

echo ""
echo "✅ Done! pizza is now loaded by pi."
echo ""
echo "What's included:"
echo "  extensions/  — TypeScript extensions"
echo "  skills/      — On-demand skill packages"
echo "  prompts/     — Reusable prompt templates"
echo "  themes/      — Custom themes"
echo ""
echo "Run 'pi list' to verify, or 'pi config' to enable/disable resources."
