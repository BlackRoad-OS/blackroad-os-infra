#!/bin/bash
# ==============================================
# BLACKROAD OS - BULK CREATE RAILWAY SERVICES
# ==============================================
# Creates all required Railway services via API
#
# Prerequisites:
# - RAILWAY_TOKEN environment variable set
# - jq installed
#
# Usage: ./scripts/railway/bulk-create-services.sh [--dry-run]
# ==============================================

set -e

DRY_RUN=false
[ "$1" = "--dry-run" ] && DRY_RUN=true

echo "=========================================="
echo "  BULK CREATE RAILWAY SERVICES"
echo "=========================================="
echo ""

if [ "$DRY_RUN" = true ]; then
  echo "=== DRY RUN MODE ==="
  echo ""
fi

# Check for Railway token
if [ -z "$RAILWAY_TOKEN" ]; then
  echo "ERROR: RAILWAY_TOKEN not set"
  exit 1
fi

RAILWAY_API="https://backboard.railway.app/graphql/v2"

# All services to create
declare -A SERVICES=(
  ["blackroad-os"]="BlackRoad-OS/blackroad-os"
  ["blackroad-os-api"]="BlackRoad-OS/blackroad-os-api"
  ["blackroad-os-api-gateway"]="BlackRoad-OS/blackroad-os-api-gateway"
  ["blackroad-os-agents"]="BlackRoad-OS/blackroad-os-agents"
  ["blackroad-os-archive"]="BlackRoad-OS/blackroad-os-archive"
  ["blackroad-os-beacon"]="BlackRoad-OS/blackroad-os-beacon"
  ["blackroad-os-brand"]="BlackRoad-OS/blackroad-os-brand"
  ["blackroad-os-core"]="BlackRoad-OS/blackroad-os-core"
  ["blackroad-os-demo"]="BlackRoad-OS/blackroad-os-demo"
  ["blackroad-os-docs"]="BlackRoad-OS/blackroad-os-docs"
  ["blackroad-os-home"]="BlackRoad-OS/blackroad-os-home"
  ["blackroad-os-ideas"]="BlackRoad-OS/blackroad-os-ideas"
  ["blackroad-os-infra"]="BlackRoad-OS/blackroad-os-infra"
  ["blackroad-os-master"]="BlackRoad-OS/blackroad-os-master"
  ["blackroad-os-operator"]="BlackRoad-OS/blackroad-os-operator"
  ["blackroad-os-pack-creator-studio"]="BlackRoad-OS/blackroad-os-pack-creator-studio"
  ["blackroad-os-pack-education"]="BlackRoad-OS/blackroad-os-pack-education"
  ["blackroad-os-pack-finance"]="BlackRoad-OS/blackroad-os-pack-finance"
  ["blackroad-os-pack-infra-devops"]="BlackRoad-OS/blackroad-os-pack-infra-devops"
  ["blackroad-os-pack-legal"]="BlackRoad-OS/blackroad-os-pack-legal"
  ["blackroad-os-pack-research-lab"]="BlackRoad-OS/blackroad-os-pack-research-lab"
  ["blackroad-prism-console"]="BlackRoad-OS/blackroad-os-prism-console"
  ["blackroad-os-research"]="BlackRoad-OS/blackroad-os-research"
  ["blackroad-os-web"]="BlackRoad-OS/blackroad-os-web"
)

# Get project ID
echo "Fetching BlackRoad OS project..."
PROJECT_QUERY='query { me { projects { edges { node { id name } } } } }'
PROJECT_RESPONSE=$(curl -s -X POST "$RAILWAY_API" \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"$PROJECT_QUERY\"}")

PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.data.me.projects.edges[].node | select(.name | test("BlackRoad"; "i")) | .id' | head -1)

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "null" ]; then
  echo "ERROR: BlackRoad OS project not found!"
  exit 1
fi

echo "Project ID: $PROJECT_ID"
echo ""

# Get existing services
EXISTING_QUERY="query { project(id: \\\"$PROJECT_ID\\\") { services { edges { node { name } } } } }"
EXISTING_RESPONSE=$(curl -s -X POST "$RAILWAY_API" \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"$EXISTING_QUERY\"}")

EXISTING_SERVICES=$(echo "$EXISTING_RESPONSE" | jq -r '.data.project.services.edges[].node.name')

echo "Creating services..."
echo ""

CREATED=0
SKIPPED=0

for service in "${!SERVICES[@]}"; do
  repo="${SERVICES[$service]}"

  if echo "$EXISTING_SERVICES" | grep -q "^$service$"; then
    echo "  ⏭️  $service (already exists)"
    ((SKIPPED++))
  else
    if [ "$DRY_RUN" = true ]; then
      echo "  📦 $service (would create from $repo)"
    else
      echo -n "  📦 Creating $service from $repo... "

      # Create service via GraphQL mutation
      CREATE_MUTATION="mutation { serviceCreate(input: { name: \\\"$service\\\", projectId: \\\"$PROJECT_ID\\\", source: { repo: \\\"$repo\\\" } }) { id name } }"

      CREATE_RESPONSE=$(curl -s -X POST "$RAILWAY_API" \
        -H "Authorization: Bearer $RAILWAY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"query\": \"$CREATE_MUTATION\"}")

      if echo "$CREATE_RESPONSE" | jq -e '.data.serviceCreate.id' > /dev/null 2>&1; then
        NEW_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.serviceCreate.id')
        echo "✓ Created ($NEW_ID)"
        ((CREATED++))
      else
        ERROR=$(echo "$CREATE_RESPONSE" | jq -r '.errors[0].message // "Unknown error"')
        echo "✗ Failed: $ERROR"
      fi
    fi
  fi
done

echo ""
echo "=========================================="
echo "  SUMMARY"
echo "=========================================="
echo "  Created: $CREATED"
echo "  Skipped: $SKIPPED"
echo "  Total:   ${#SERVICES[@]}"
echo "=========================================="
