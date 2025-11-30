#!/bin/bash
# ==============================================
# BLACKROAD OS - HEALTH CHECK SCRIPT
# ==============================================
# Checks the health of all BlackRoad OS services
#
# Usage: ./scripts/deploy/health-check.sh
# ==============================================

echo "=========================================="
echo "  BLACKROAD OS HEALTH CHECK"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_health() {
  local name=$1
  local url=$2

  printf "%-35s " "$name"

  response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "$url" 2>/dev/null)

  if [ "$response" = "200" ]; then
    echo -e "${GREEN}✓ OK${NC} (200)"
  elif [ "$response" = "000" ]; then
    echo -e "${RED}✗ UNREACHABLE${NC}"
  else
    echo -e "${YELLOW}⚠ $response${NC}"
  fi
}

echo "=== blackroad.io ==="
echo ""
check_health "app.blackroad.io" "https://app.blackroad.io/health"
check_health "home.blackroad.io" "https://home.blackroad.io/"
check_health "os.blackroad.io" "https://os.blackroad.io/health"
check_health "creator.blackroad.io" "https://creator.blackroad.io/"
check_health "api.blackroad.io" "https://api.blackroad.io/health"

echo ""
echo "=== blackroad.systems ==="
echo ""
check_health "api.blackroad.systems" "https://api.blackroad.systems/health"
check_health "core.blackroad.systems" "https://core.blackroad.systems/health"
check_health "infra.blackroad.systems" "https://infra.blackroad.systems/health"
check_health "console.blackroad.systems" "https://console.blackroad.systems/health"
check_health "docs.blackroad.systems" "https://docs.blackroad.systems/"
check_health "prism.blackroad.systems" "https://prism.blackroad.systems/"
check_health "beacon.blackroad.systems" "https://beacon.blackroad.systems/health"
check_health "research.blackroad.systems" "https://research.blackroad.systems/health"
check_health "lab.blackroad.systems" "https://lab.blackroad.systems/health"
check_health "devops.blackroad.systems" "https://devops.blackroad.systems/health"
check_health "legal.blackroad.systems" "https://legal.blackroad.systems/health"
check_health "finance.blackroad.systems" "https://finance.blackroad.systems/health"
check_health "demo.blackroad.systems" "https://demo.blackroad.systems/"
check_health "archive.blackroad.systems" "https://archive.blackroad.systems/health"
check_health "agents.blackroad.systems" "https://agents.blackroad.systems/health"

echo ""
echo "=========================================="
echo "  HEALTH CHECK COMPLETE"
echo "=========================================="
echo ""
