#!/bin/bash
# ==============================================
# BLACKROAD OS - SET RAILWAY CUSTOM DOMAINS
# ==============================================
# Configures custom domains for all Railway services
#
# Prerequisites:
# - RAILWAY_TOKEN environment variable set
# - DNS already configured to point to Railway
#
# Usage: ./scripts/railway/set-all-domains.sh [--dry-run]
# ==============================================

set -e

DRY_RUN=false
[ "$1" = "--dry-run" ] && DRY_RUN=true

echo "=========================================="
echo "  SET RAILWAY CUSTOM DOMAINS"
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

# Service to domain mapping
declare -A DOMAINS=(
  # blackroad.io
  ["blackroad-os-web"]="app.blackroad.io"
  ["blackroad-os-home"]="home.blackroad.io"
  ["blackroad-os"]="os.blackroad.io"
  ["blackroad-os-pack-creator-studio"]="creator.blackroad.io"
  ["blackroad-os-api"]="api.blackroad.io"

  # blackroad.systems
  ["blackroad-os-api-gateway"]="api.blackroad.systems"
  ["blackroad-os-core"]="core.blackroad.systems"
  ["blackroad-os-infra"]="infra.blackroad.systems"
  ["blackroad-os-master"]="console.blackroad.systems"
  ["blackroad-os-docs"]="docs.blackroad.systems"
  ["blackroad-prism-console"]="prism.blackroad.systems"
  ["blackroad-os-beacon"]="beacon.blackroad.systems"
  ["blackroad-os-research"]="research.blackroad.systems"
  ["blackroad-os-pack-research-lab"]="lab.blackroad.systems"
  ["blackroad-os-pack-infra-devops"]="devops.blackroad.systems"
  ["blackroad-os-pack-legal"]="legal.blackroad.systems"
  ["blackroad-os-pack-finance"]="finance.blackroad.systems"
  ["blackroad-os-demo"]="demo.blackroad.systems"
  ["blackroad-os-archive"]="archive.blackroad.systems"
  ["blackroad-os-agents"]="agents.blackroad.systems"
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

# Get services with their IDs
SERVICES_QUERY="query { project(id: \\\"$PROJECT_ID\\\") { services { edges { node { id name } } } } }"
SERVICES_RESPONSE=$(curl -s -X POST "$RAILWAY_API" \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"$SERVICES_QUERY\"}")

echo "Configuring custom domains..."
echo ""

CONFIGURED=0
FAILED=0

for service in "${!DOMAINS[@]}"; do
  domain="${DOMAINS[$service]}"

  # Get service ID
  SERVICE_ID=$(echo "$SERVICES_RESPONSE" | jq -r ".data.project.services.edges[].node | select(.name == \"$service\") | .id")

  if [ -z "$SERVICE_ID" ] || [ "$SERVICE_ID" = "null" ]; then
    echo "  ⏭️  $service → $domain (service not found)"
    continue
  fi

  if [ "$DRY_RUN" = true ]; then
    echo "  🌐 $service → $domain (would configure)"
  else
    echo -n "  🌐 $service → $domain ... "

    # Add custom domain via GraphQL mutation
    DOMAIN_MUTATION="mutation { customDomainCreate(input: { domain: \\\"$domain\\\", serviceId: \\\"$SERVICE_ID\\\", environmentId: null }) { id domain } }"

    DOMAIN_RESPONSE=$(curl -s -X POST "$RAILWAY_API" \
      -H "Authorization: Bearer $RAILWAY_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"query\": \"$DOMAIN_MUTATION\"}")

    if echo "$DOMAIN_RESPONSE" | jq -e '.data.customDomainCreate.id' > /dev/null 2>&1; then
      echo "✓"
      ((CONFIGURED++))
    else
      ERROR=$(echo "$DOMAIN_RESPONSE" | jq -r '.errors[0].message // "Unknown error"')
      if [[ "$ERROR" == *"already"* ]]; then
        echo "⚠️  (already configured)"
      else
        echo "✗ $ERROR"
        ((FAILED++))
      fi
    fi
  fi
done

echo ""
echo "=========================================="
echo "  SUMMARY"
echo "=========================================="
echo "  Configured: $CONFIGURED"
echo "  Failed:     $FAILED"
echo "  Total:      ${#DOMAINS[@]}"
echo "=========================================="
echo ""
echo "DNS must point to Railway for domains to work."
echo "Use Cloudflare tunnel or Railway-generated domains."
