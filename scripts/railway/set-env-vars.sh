#!/bin/bash
# ==============================================
# BLACKROAD OS - SET RAILWAY ENVIRONMENT VARIABLES
# ==============================================
# Sets common environment variables across all services
#
# Usage: ./scripts/railway/set-env-vars.sh
# ==============================================

set -e

echo "=========================================="
echo "  RAILWAY ENVIRONMENT VARIABLES"
echo "=========================================="
echo ""

BASE_DIR="/Users/alexa"

# Common environment variables for all services
COMMON_VARS=(
  "NODE_ENV=production"
  "TZ=America/Chicago"
)

# API services (port 8080)
API_SERVICES=(
  "blackroad-os"
  "blackroad-os-api"
  "blackroad-os-api-gateway"
  "blackroad-os-agents"
  "blackroad-os-archive"
  "blackroad-os-beacon"
  "blackroad-os-core"
  "blackroad-os-ideas"
  "blackroad-os-infra"
  "blackroad-os-master"
  "blackroad-os-operator"
  "blackroad-os-pack-education"
  "blackroad-os-pack-finance"
  "blackroad-os-pack-infra-devops"
  "blackroad-os-pack-legal"
  "blackroad-os-pack-research-lab"
  "blackroad-os-research"
)

# Frontend services (port 3000)
FRONTEND_SERVICES=(
  "blackroad-os-brand"
  "blackroad-os-demo"
  "blackroad-os-docs"
  "blackroad-os-home"
  "blackroad-os-pack-creator-studio"
  "blackroad-os-prism-console"
  "blackroad-os-web"
)

echo "Setting environment variables..."
echo ""

# Set vars for API services
for service in "${API_SERVICES[@]}"; do
  repo_path="${BASE_DIR}/${service}"
  if [ -d "$repo_path" ]; then
    echo "Setting vars for $service (API - port 8080)..."
    cd "$repo_path"
    railway variables set PORT=8080 HOST=0.0.0.0 2>/dev/null || echo "  (skipped - not linked)"
  fi
done

# Set vars for frontend services
for service in "${FRONTEND_SERVICES[@]}"; do
  repo_path="${BASE_DIR}/${service}"
  if [ -d "$repo_path" ]; then
    echo "Setting vars for $service (Frontend - port 3000)..."
    cd "$repo_path"
    railway variables set PORT=3000 2>/dev/null || echo "  (skipped - not linked)"
  fi
done

echo ""
echo "Environment variables template for Railway dashboard:"
echo ""
echo "=== API Services (port 8080) ==="
echo "NODE_ENV=production"
echo "PORT=8080"
echo "HOST=0.0.0.0"
echo "TZ=America/Chicago"
echo ""
echo "=== Frontend Services (port 3000) ==="
echo "NODE_ENV=production"
echo "PORT=3000"
echo "TZ=America/Chicago"
echo ""
echo "=== Cloudflared Service ==="
echo "TUNNEL_TOKEN=<your-cloudflare-tunnel-token>"
echo ""
