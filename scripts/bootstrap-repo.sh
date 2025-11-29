#!/bin/bash
set -e

# Usage: ./bootstrap-repo.sh <org/repo> [--legacy | --research]
# Examples:
#   ./bootstrap-repo.sh BlackRoad-OS/blackroad-os-core
#   ./bootstrap-repo.sh blackboxprogramming/blackroad --legacy
#   ./bootstrap-repo.sh blackboxprogramming/lucidia --research

REPO="$1"
MODE="${2:-active}"

if [ -z "$REPO" ]; then
  echo "Usage: ./bootstrap-repo.sh <org/repo> [--legacy | --research]"
  echo ""
  echo "Modes:"
  echo "  (default)    Active repo: labels, templates, CI"
  echo "  --legacy     Legacy repo: ARCHIVED.md only"
  echo "  --research   Research repo: research banner in README"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="$SCRIPT_DIR/templates"

echo "=== Bootstrapping $REPO (mode: $MODE) ==="

# Check gh auth
if ! gh auth status &>/dev/null; then
  echo "Error: Not authenticated with GitHub CLI. Run 'gh auth login' first."
  exit 1
fi

# Clone repo to temp dir
TEMP_DIR=$(mktemp -d)
echo "Cloning to $TEMP_DIR..."
gh repo clone "$REPO" "$TEMP_DIR" -- --depth 1

cd "$TEMP_DIR"

case "$MODE" in
  "--legacy")
    echo "Adding ARCHIVED.md..."
    cp "$TEMPLATES_DIR/ARCHIVED.md" ./ARCHIVED.md
    git add ARCHIVED.md
    git commit -m "docs: add legacy archive notice

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    ;;

  "--research")
    echo "Adding research banner to README..."
    if [ -f README.md ]; then
      # Prepend research banner
      cat "$TEMPLATES_DIR/RESEARCH_BANNER.md" README.md > README.tmp
      mv README.tmp README.md
    else
      cp "$TEMPLATES_DIR/RESEARCH_BANNER.md" README.md
    fi
    git add README.md
    git commit -m "docs: add research repository banner

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    ;;

  *)
    # Active repo: full setup
    echo "Setting up labels..."
    "$SCRIPT_DIR/setup-labels.sh" "$REPO"

    echo "Adding GitHub templates..."
    mkdir -p .github/ISSUE_TEMPLATE
    cp "$TEMPLATES_DIR/.github/ISSUE_TEMPLATE/"* .github/ISSUE_TEMPLATE/
    cp "$TEMPLATES_DIR/.github/PULL_REQUEST_TEMPLATE.md" .github/

    echo "Adding CI workflow..."
    mkdir -p .github/workflows
    cp "$TEMPLATES_DIR/.github/workflows/ci.yml" .github/workflows/

    git add .github/
    git commit -m "chore: add GitHub templates and CI workflow

- Add issue templates (feature, bug, infra, docs)
- Add PR template
- Add CI workflow (lint, build, test)

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    ;;
esac

echo ""
echo "=== Changes committed locally ==="
echo "Review with: cd $TEMP_DIR && git log --oneline -3"
echo ""
echo "To push:"
echo "  cd $TEMP_DIR"
echo "  git push origin main"
echo ""
echo "Or to create a PR:"
echo "  cd $TEMP_DIR"
echo "  git checkout -b chore/org-baseline"
echo "  git push -u origin chore/org-baseline"
echo "  gh pr create --title 'chore: add org baseline templates' --body 'Org-wide bootstrap. See tracker for details.'"
