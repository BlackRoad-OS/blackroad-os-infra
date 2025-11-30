#!/bin/bash
# ==============================================
# BLACKROAD OS - CREATE RAILWAY SERVICES
# ==============================================
# Creates all required Railway services if they don't exist
#
# Usage: ./scripts/railway/create-services.sh
# ==============================================

set -e

echo "=========================================="
echo "  RAILWAY SERVICE CREATION"
echo "=========================================="
echo ""

# All services that should exist in Railway
SERVICES=(
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

echo "Services to create/verify: ${#SERVICES[@]}"
echo ""
echo "NOTE: Railway CLI doesn't support non-interactive service creation."
echo "Please create services via the Railway dashboard:"
echo ""
echo "  1. Go to: https://railway.app/project/BlackRoad-OS"
echo "  2. Click '+ New Service'"
echo "  3. Select 'GitHub Repo'"
echo "  4. Connect to BlackRoad-OS/<service-name>"
echo ""
echo "Required services:"
echo ""

for service in "${SERVICES[@]}"; do
  echo "  - $service"
done

echo ""
echo "Or use Railway's API to create services programmatically."
echo ""
