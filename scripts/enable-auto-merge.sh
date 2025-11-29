#!/bin/bash
# Enable auto-merge workflow for a repo
# Usage: ./enable-auto-merge.sh <org/repo>

REPO="$1"

if [ -z "$REPO" ]; then
  echo "Usage: ./enable-auto-merge.sh <org/repo>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKFLOW_FILE="$SCRIPT_DIR/templates/.github/workflows/auto-merge-dependabot.yml"

echo "=== Enabling auto-merge for $REPO ==="

# Clone to temp dir
TEMP_DIR=$(mktemp -d)
echo "Cloning to $TEMP_DIR..."
gh repo clone "$REPO" "$TEMP_DIR" -- --depth 1

cd "$TEMP_DIR"

# Create workflows dir if needed
mkdir -p .github/workflows

# Copy the auto-merge workflow
cp "$WORKFLOW_FILE" .github/workflows/auto-merge-dependabot.yml

# Check if there are changes
if git diff --quiet && git diff --staged --quiet; then
  echo "No changes needed - workflow may already exist"
  rm -rf "$TEMP_DIR"
  exit 0
fi

# Commit and push
git add .github/workflows/auto-merge-dependabot.yml
git commit -m "ci: add auto-merge workflow for Dependabot PRs

Automatically merges minor and patch dependency updates.

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin main

echo "=== Auto-merge workflow added to $REPO ==="
rm -rf "$TEMP_DIR"
