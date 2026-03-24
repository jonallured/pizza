#!/usr/bin/env bash
set -euo pipefail
echo "🍕 Installing pizza..."
pi install "$(cd "$(dirname "$0")" && pwd)"
