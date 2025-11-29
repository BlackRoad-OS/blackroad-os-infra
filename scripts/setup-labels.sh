#!/bin/bash
# Usage: ./setup-labels.sh <org/repo>
# Example: ./setup-labels.sh BlackRoad-OS/blackroad-os-core

REPO="$1"

if [ -z "$REPO" ]; then
  echo "Usage: ./setup-labels.sh <org/repo>"
  exit 1
fi

echo "Creating labels for $REPO..."

# Team labels
gh label create "team:core" --repo "$REPO" --color "1d76db" --description "Core platform team" --force 2>/dev/null || true
gh label create "team:web" --repo "$REPO" --color "0e8a16" --description "Web/frontend team" --force 2>/dev/null || true
gh label create "team:prism" --repo "$REPO" --color "5319e7" --description "Prism console team" --force 2>/dev/null || true
gh label create "team:infra" --repo "$REPO" --color "006b75" --description "Infrastructure/DevOps" --force 2>/dev/null || true
gh label create "team:docs" --repo "$REPO" --color "c5def5" --description "Documentation" --force 2>/dev/null || true
gh label create "team:pack" --repo "$REPO" --color "fbca04" --description "Domain packs" --force 2>/dev/null || true
gh label create "team:agents" --repo "$REPO" --color "d93f0b" --description "Agent development" --force 2>/dev/null || true

# Type labels
gh label create "type:feature" --repo "$REPO" --color "a2eeef" --description "New feature or capability" --force 2>/dev/null || true
gh label create "type:bug" --repo "$REPO" --color "d73a4a" --description "Something isn't working" --force 2>/dev/null || true
gh label create "type:infra" --repo "$REPO" --color "0052cc" --description "Infrastructure/CI/CD" --force 2>/dev/null || true
gh label create "type:doc" --repo "$REPO" --color "0075ca" --description "Documentation only" --force 2>/dev/null || true
gh label create "type:agent" --repo "$REPO" --color "e99695" --description "Agent-related" --force 2>/dev/null || true
gh label create "type:pack" --repo "$REPO" --color "f9d0c4" --description "Pack-related" --force 2>/dev/null || true
gh label create "type:config" --repo "$REPO" --color "bfdadc" --description "Configuration changes" --force 2>/dev/null || true
gh label create "type:refactor" --repo "$REPO" --color "d4c5f9" --description "Code refactoring" --force 2>/dev/null || true

# Priority labels
gh label create "prio:P0" --repo "$REPO" --color "b60205" --description "Critical - drop everything" --force 2>/dev/null || true
gh label create "prio:P1" --repo "$REPO" --color "ff9f1c" --description "High priority" --force 2>/dev/null || true
gh label create "prio:P2" --repo "$REPO" --color "fef2c0" --description "Normal priority" --force 2>/dev/null || true

# Status labels
gh label create "status:backlog" --repo "$REPO" --color "ededed" --description "In backlog, not started" --force 2>/dev/null || true
gh label create "status:active" --repo "$REPO" --color "0e8a16" --description "Actively being worked on" --force 2>/dev/null || true
gh label create "status:review" --repo "$REPO" --color "fbca04" --description "In review" --force 2>/dev/null || true
gh label create "status:blocked" --repo "$REPO" --color "b60205" --description "Blocked by dependency" --force 2>/dev/null || true
gh label create "status:done" --repo "$REPO" --color "6f42c1" --description "Completed" --force 2>/dev/null || true

echo "Labels created for $REPO"
