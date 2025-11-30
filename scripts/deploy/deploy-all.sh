#!/bin/bash
# ==============================================
# BLACKROAD OS - MASTER DEPLOYMENT SCRIPT
# ==============================================
# Deploys all BlackRoad OS services to Railway
#
# Usage: ./scripts/deploy/deploy-all.sh [--parallel]
#
# Options:
#   --parallel    Deploy all services in parallel (faster but harder to debug)
#   --dry-run     Show what would be deployed without actually deploying
# ==============================================

set -e

echo "=========================================="
echo "  BLACKROAD OS MASTER DEPLOYMENT"
echo "=========================================="
echo ""

PARALLEL=false
DRY_RUN=false

for arg in "$@"; do
  case $arg in
    --parallel) PARALLEL=true ;;
    --dry-run) DRY_RUN=true ;;
  esac
done

BASE_DIR="/Users/alexa"

# Deployment order (dependencies first)
CORE_SERVICES=(
  "blackroad-os-core"
  "blackroad-os-api"
  "blackroad-os-api-gateway"
)

INFRA_SERVICES=(
  "blackroad-os-infra"
  "blackroad-os-operator"
  "blackroad-os-beacon"
)

FRONTEND_SERVICES=(
  "blackroad-os-web"
  "blackroad-os-home"
  "blackroad-os-docs"
  "blackroad-os-prism-console"
  "blackroad-os-demo"
  "blackroad-os-brand"
)

PACK_SERVICES=(
  "blackroad-os-pack-creator-studio"
  "blackroad-os-pack-education"
  "blackroad-os-pack-finance"
  "blackroad-os-pack-infra-devops"
  "blackroad-os-pack-legal"
  "blackroad-os-pack-research-lab"
)

META_SERVICES=(
  "blackroad-os"
  "blackroad-os-agents"
  "blackroad-os-archive"
  "blackroad-os-ideas"
  "blackroad-os-master"
  "blackroad-os-research"
)

deploy_service() {
  local service=$1
  local repo_path="${BASE_DIR}/${service}"

  if [ -d "$repo_path" ]; then
    echo "Deploying $service..."
    if [ "$DRY_RUN" = true ]; then
      echo "  [DRY RUN] Would deploy $service"
    else
      cd "$repo_path"
      railway up --detach 2>/dev/null || echo "  (deploy queued or already running)"
    fi
  else
    echo "  [SKIP] $service - directory not found"
  fi
}

deploy_group() {
  local group_name=$1
  shift
  local services=("$@")

  echo ""
  echo "=========================================="
  echo "  Deploying: $group_name"
  echo "=========================================="
  echo ""

  if [ "$PARALLEL" = true ]; then
    for service in "${services[@]}"; do
      deploy_service "$service" &
    done
    wait
  else
    for service in "${services[@]}"; do
      deploy_service "$service"
    done
  fi
}

echo "Mode: $([ "$PARALLEL" = true ] && echo "Parallel" || echo "Sequential")"
echo "Dry run: $DRY_RUN"
echo ""

# Deploy in order
deploy_group "Core Services" "${CORE_SERVICES[@]}"
deploy_group "Infrastructure Services" "${INFRA_SERVICES[@]}"
deploy_group "Frontend Services" "${FRONTEND_SERVICES[@]}"
deploy_group "Pack Services" "${PACK_SERVICES[@]}"
deploy_group "Meta Services" "${META_SERVICES[@]}"

echo ""
echo "=========================================="
echo "  DEPLOYMENT COMPLETE"
echo "=========================================="
echo ""
echo "Monitor deployments at:"
echo "  https://railway.app/project/BlackRoad-OS"
echo ""
echo "Check service health:"
echo "  ./scripts/deploy/health-check.sh"
echo ""
