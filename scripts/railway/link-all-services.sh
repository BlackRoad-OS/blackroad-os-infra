#!/bin/bash
# ==============================================
# BLACKROAD OS - RAILWAY SERVICE LINKING SCRIPT
# ==============================================
# This script links all local repos to their Railway services
#
# Prerequisites:
# - Railway CLI authenticated (railway login)
# - Railway project "BlackRoad OS" exists
#
# Usage: ./scripts/railway/link-all-services.sh
# ==============================================

set -e

echo "=========================================="
echo "  RAILWAY SERVICE LINKING"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BASE_DIR="/Users/alexa"

# Service mapping: local_dir -> railway_service_name
declare -A SERVICES=(
  ["blackroad-os"]="blackroad-os"
  ["blackroad-os-api"]="blackroad-os-api"
  ["blackroad-os-api-gateway"]="blackroad-os-api-gateway"
  ["blackroad-os-agents"]="blackroad-os-agents"
  ["blackroad-os-archive"]="blackroad-os-archive"
  ["blackroad-os-beacon"]="blackroad-os-beacon"
  ["blackroad-os-brand"]="blackroad-os-brand"
  ["blackroad-os-core"]="blackroad-os-core"
  ["blackroad-os-demo"]="blackroad-os-demo"
  ["blackroad-os-docs"]="blackroad-os-docs"
  ["blackroad-os-home"]="blackroad-os-home"
  ["blackroad-os-ideas"]="blackroad-os-ideas"
  ["blackroad-os-infra"]="blackroad-os-infra"
  ["blackroad-os-master"]="blackroad-os-master"
  ["blackroad-os-operator"]="blackroad-os-operator"
  ["blackroad-os-pack-creator-studio"]="blackroad-os-pack-creator-studio"
  ["blackroad-os-pack-education"]="blackroad-os-pack-education"
  ["blackroad-os-pack-finance"]="blackroad-os-pack-finance"
  ["blackroad-os-pack-infra-devops"]="blackroad-os-pack-infra-devops"
  ["blackroad-os-pack-legal"]="blackroad-os-pack-legal"
  ["blackroad-os-pack-research-lab"]="blackroad-os-pack-research-lab"
  ["blackroad-os-prism-console"]="blackroad-prism-console"
  ["blackroad-os-research"]="blackroad-os-research"
  ["blackroad-os-web"]="blackroad-os-web"
)

echo -e "${BLUE}Checking Railway authentication...${NC}"
railway whoami || { echo -e "${RED}Not authenticated. Run: railway login${NC}"; exit 1; }
echo ""

echo -e "${BLUE}Linking services to Railway project...${NC}"
echo ""

LINKED=0
FAILED=0

for dir in "${!SERVICES[@]}"; do
  service="${SERVICES[$dir]}"
  repo_path="${BASE_DIR}/${dir}"

  if [ -d "$repo_path" ]; then
    echo -e "${YELLOW}Linking${NC} $dir → $service"
    cd "$repo_path"

    # Create .railway directory if it doesn't exist
    mkdir -p .railway

    # Try to link (non-interactive)
    if railway link --environment production 2>/dev/null; then
      echo -e "  ${GREEN}✓ Linked${NC}"
      ((LINKED++))
    else
      echo -e "  ${RED}✗ Failed (may need manual linking)${NC}"
      ((FAILED++))
    fi
  else
    echo -e "${RED}Directory not found:${NC} $repo_path"
    ((FAILED++))
  fi
done

echo ""
echo "=========================================="
echo -e "  ${GREEN}Linked: $LINKED${NC} | ${RED}Failed: $FAILED${NC}"
echo "=========================================="
echo ""
echo "For failed services, run manually:"
echo "  cd /Users/alexa/<repo>"
echo "  railway link"
echo "  # Select 'BlackRoad OS' project"
echo "  # Select the matching service"
echo ""
