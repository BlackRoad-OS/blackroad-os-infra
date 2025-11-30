#!/bin/bash
# ==============================================
# BLACKROAD OS - RAILWAY API AUTOMATION
# ==============================================
# Automates Railway project setup via GraphQL API
#
# Prerequisites:
# - RAILWAY_TOKEN environment variable set
#
# Usage: ./scripts/railway/api-automation.sh
# ==============================================

set -e

echo "=========================================="
echo "  RAILWAY API AUTOMATION"
echo "=========================================="
echo ""

# Check for Railway token
if [ -z "$RAILWAY_TOKEN" ]; then
  echo "ERROR: RAILWAY_TOKEN not set"
  echo ""
  echo "Get your token from: https://railway.app/account/tokens"
  echo "Export it: export RAILWAY_TOKEN='your-token'"
  exit 1
fi

RAILWAY_API="https://backboard.railway.app/graphql/v2"

# GraphQL query function
railway_query() {
  local query=$1
  curl -s -X POST "$RAILWAY_API" \
    -H "Authorization: Bearer $RAILWAY_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"query\": \"$query\"}"
}

echo "Fetching project information..."
echo ""

# Get projects
PROJECTS=$(railway_query "query { me { projects { edges { node { id name } } } } }")

echo "Your Railway Projects:"
echo "$PROJECTS" | jq -r '.data.me.projects.edges[].node | "  - \(.name) (\(.id))"'
echo ""

# Find BlackRoad OS project
PROJECT_ID=$(echo "$PROJECTS" | jq -r '.data.me.projects.edges[].node | select(.name | test("BlackRoad"; "i")) | .id' | head -1)

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "null" ]; then
  echo "BlackRoad OS project not found!"
  echo "Please create it manually at https://railway.app/new"
  exit 1
fi

echo "Found BlackRoad OS Project: $PROJECT_ID"
echo ""

# Get services in project
echo "Fetching services..."
SERVICES=$(railway_query "query { project(id: \\\"$PROJECT_ID\\\") { services { edges { node { id name } } } } }")

echo "Services in project:"
echo "$SERVICES" | jq -r '.data.project.services.edges[].node | "  - \(.name) (\(.id))"'
echo ""

# Export for other scripts
echo "Exporting configuration..."
echo ""

cat << EOF > /tmp/railway-config.env
# Railway Configuration (auto-generated)
export RAILWAY_PROJECT_ID="$PROJECT_ID"

# Service IDs (update after creating services)
EOF

echo "$SERVICES" | jq -r '.data.project.services.edges[].node | "export RAILWAY_SERVICE_\(.name | gsub("-"; "_") | ascii_upcase)=\"\(.id)\""' >> /tmp/railway-config.env

echo "Configuration exported to /tmp/railway-config.env"
echo ""
echo "Source it with: source /tmp/railway-config.env"
echo ""

# Show service creation commands
echo "=========================================="
echo "  SERVICE CREATION COMMANDS"
echo "=========================================="
echo ""
echo "To create missing services via Railway CLI:"
echo ""

REQUIRED_SERVICES=(
  "blackroad-os"
  "blackroad-os-api"
  "blackroad-os-api-gateway"
  "blackroad-os-agents"
  "blackroad-os-archive"
  "blackroad-os-beacon"
  "blackroad-os-brand"
  "blackroad-os-core"
  "blackroad-os-demo"
  "blackroad-os-docs"
  "blackroad-os-home"
  "blackroad-os-ideas"
  "blackroad-os-infra"
  "blackroad-os-master"
  "blackroad-os-operator"
  "blackroad-os-pack-creator-studio"
  "blackroad-os-pack-education"
  "blackroad-os-pack-finance"
  "blackroad-os-pack-infra-devops"
  "blackroad-os-pack-legal"
  "blackroad-os-pack-research-lab"
  "blackroad-prism-console"
  "blackroad-os-research"
  "blackroad-os-web"
  "cloudflared"
)

EXISTING_SERVICES=$(echo "$SERVICES" | jq -r '.data.project.services.edges[].node.name')

for service in "${REQUIRED_SERVICES[@]}"; do
  if echo "$EXISTING_SERVICES" | grep -q "^$service$"; then
    echo "  ✓ $service (exists)"
  else
    echo "  ✗ $service (missing)"
    echo "    Create with: railway service create $service"
  fi
done

echo ""
echo "=========================================="
echo "  DONE"
echo "=========================================="
