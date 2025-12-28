#!/bin/bash
# Production deployment window check (8AM-6PM UTC on weekdays)
# Usage: check-production-deployment-window.sh <environment>

set -e

ENVIRONMENT="${1:-production}"

if [ "$ENVIRONMENT" = "production" ]; then
  HOUR=$(date -u +%H)
  DAY=$(date -u +%u)

  if [ "$DAY" -gt 5 ]; then
    echo "⚠️  Warning: Weekend production deployment"
  elif [ "$HOUR" -lt 8 ] || [ "$HOUR" -gt 18 ]; then
    echo "⚠️  Warning: Off-hours production deployment"
  else
    echo "✅ Within recommended deployment window (weekdays 8AM-6PM UTC)"
  fi
fi
