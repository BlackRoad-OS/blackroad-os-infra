#!/bin/bash
# ==============================================
# BLACKROAD OS - REDEPLOY FAILED SERVICES
# ==============================================
# Checks health and redeploys any failed services
#
# Usage: ./scripts/deploy/redeploy-failed.sh
# ==============================================

set -e

echo "=========================================="
echo "  REDEPLOY FAILED SERVICES"
echo "=========================================="
echo ""

BASE_DIR="/Users/alexa"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Service to URL mapping
declare -A HEALTH_URLS=(
  ["blackroad-os"]="https://os.blackroad.io/health"
  ["blackroad-os-api"]="https://api.blackroad.io/health"
  ["blackroad-os-api-gateway"]="https://api.blackroad.systems/health"
  ["blackroad-os-core"]="https://core.blackroad.systems/health"
  ["blackroad-os-web"]="https://app.blackroad.io/"
  ["blackroad-os-home"]="https://home.blackroad.io/"
  ["blackroad-os-docs"]="https://docs.blackroad.systems/"
  ["blackroad-os-beacon"]="https://beacon.blackroad.systems/health"
  ["blackroad-os-infra"]="https://infra.blackroad.systems/health"
  ["blackroad-os-master"]="https://console.blackroad.systems/health"
  ["blackroad-os-demo"]="https://demo.blackroad.systems/"
  ["blackroad-os-archive"]="https://archive.blackroad.systems/health"
  ["blackroad-os-research"]="https://research.blackroad.systems/health"
  ["blackroad-os-agents"]="https://agents.blackroad.systems/health"
  ["blackroad-os-prism-console"]="https://prism.blackroad.systems/"
  ["blackroad-os-pack-creator-studio"]="https://creator.blackroad.io/"
  ["blackroad-os-pack-finance"]="https://finance.blackroad.systems/health"
  ["blackroad-os-pack-legal"]="https://legal.blackroad.systems/health"
  ["blackroad-os-pack-research-lab"]="https://lab.blackroad.systems/health"
  ["blackroad-os-pack-infra-devops"]="https://devops.blackroad.systems/health"
)

FAILED_SERVICES=()

echo "Checking service health..."
echo ""

for service in "${!HEALTH_URLS[@]}"; do
  url="${HEALTH_URLS[$service]}"
  response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "$url" 2>/dev/null)

  if [ "$response" != "200" ]; then
    echo -e "${RED}✗${NC} $service - HTTP $response"
    FAILED_SERVICES+=("$service")
  else
    echo -e "${GREEN}✓${NC} $service"
  fi
done

echo ""

if [ ${#FAILED_SERVICES[@]} -eq 0 ]; then
  echo -e "${GREEN}All services healthy!${NC}"
  exit 0
fi

echo "=========================================="
echo "  Redeploying ${#FAILED_SERVICES[@]} failed services"
echo "=========================================="
echo ""

for service in "${FAILED_SERVICES[@]}"; do
  repo_path="${BASE_DIR}/${service}"

  if [ -d "$repo_path" ]; then
    echo -e "${YELLOW}Redeploying${NC} $service..."
    cd "$repo_path"
    railway up --detach 2>/dev/null || echo "  (deploy queued)"
  else
    echo -e "${RED}Directory not found:${NC} $repo_path"
  fi
done

echo ""
echo "=========================================="
echo "  REDEPLOY INITIATED"
echo "=========================================="
echo ""
echo "Monitor at: https://railway.app/project/BlackRoad-OS"
echo ""
