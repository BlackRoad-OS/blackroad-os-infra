#!/bin/bash
# ==============================================
# BLACKROAD OS - CLOUDFLARE DNS SETUP
# ==============================================
# Creates all required DNS records for BlackRoad OS subdomains
#
# Prerequisites:
# - CLOUDFLARE_API_TOKEN environment variable set
# - Zone IDs for blackroad.io and blackroad.systems
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="your-token"
#   ./scripts/cloudflare/setup-dns.sh
# ==============================================

set -e

echo "=========================================="
echo "  CLOUDFLARE DNS SETUP"
echo "=========================================="
echo ""

# Check for API token
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN not set"
  echo ""
  echo "Get your API token from:"
  echo "  https://dash.cloudflare.com/profile/api-tokens"
  echo ""
  echo "Required permissions:"
  echo "  - Zone:DNS:Edit"
  echo "  - Zone:Zone:Read"
  echo ""
  echo "Export it:"
  echo "  export CLOUDFLARE_API_TOKEN='your-token'"
  exit 1
fi

# Cloudflare Zone IDs (you need to fill these in)
ZONE_BLACKROAD_IO="${CLOUDFLARE_ZONE_BLACKROAD_IO:-}"
ZONE_BLACKROAD_SYSTEMS="${CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS:-}"

if [ -z "$ZONE_BLACKROAD_IO" ] || [ -z "$ZONE_BLACKROAD_SYSTEMS" ]; then
  echo "Fetching Zone IDs..."
  echo ""

  # Get zone ID for blackroad.io
  ZONE_BLACKROAD_IO=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=blackroad.io" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" | jq -r '.result[0].id')

  # Get zone ID for blackroad.systems
  ZONE_BLACKROAD_SYSTEMS=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=blackroad.systems" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" | jq -r '.result[0].id')

  echo "Zone IDs:"
  echo "  blackroad.io:      $ZONE_BLACKROAD_IO"
  echo "  blackroad.systems: $ZONE_BLACKROAD_SYSTEMS"
  echo ""
fi

# Tunnel ID (get from cloudflared tunnel list)
TUNNEL_ID="${CLOUDFLARE_TUNNEL_ID:-}"

if [ -z "$TUNNEL_ID" ]; then
  echo "NOTE: CLOUDFLARE_TUNNEL_ID not set"
  echo "Run: cloudflared tunnel list"
  echo "Then: export CLOUDFLARE_TUNNEL_ID='your-tunnel-id'"
  echo ""
  echo "Continuing with CNAME target: blackroad-os.cfargotunnel.com"
  TUNNEL_CNAME="blackroad-os.cfargotunnel.com"
else
  TUNNEL_CNAME="${TUNNEL_ID}.cfargotunnel.com"
fi

echo "Tunnel CNAME: $TUNNEL_CNAME"
echo ""

# Function to create DNS record
create_dns_record() {
  local zone_id=$1
  local name=$2
  local content=$3
  local proxied=${4:-true}

  echo -n "Creating $name -> $content ... "

  response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{
      \"type\": \"CNAME\",
      \"name\": \"$name\",
      \"content\": \"$content\",
      \"ttl\": 1,
      \"proxied\": $proxied
    }")

  if echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    if [ "$(echo "$response" | jq -r '.success')" == "true" ]; then
      echo "✓ Created"
    else
      error=$(echo "$response" | jq -r '.errors[0].message // "Unknown error"')
      if [[ "$error" == *"already exists"* ]]; then
        echo "⚠ Already exists"
      else
        echo "✗ Failed: $error"
      fi
    fi
  else
    echo "✗ Failed: Invalid response"
  fi
}

echo "=========================================="
echo "  Creating DNS Records for blackroad.io"
echo "=========================================="
echo ""

# blackroad.io subdomains
create_dns_record "$ZONE_BLACKROAD_IO" "app" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_IO" "home" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_IO" "os" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_IO" "creator" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_IO" "api" "$TUNNEL_CNAME"

echo ""
echo "=========================================="
echo "  Creating DNS Records for blackroad.systems"
echo "=========================================="
echo ""

# blackroad.systems subdomains
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "api" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "core" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "infra" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "console" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "docs" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "prism" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "beacon" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "research" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "lab" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "devops" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "legal" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "finance" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "demo" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "archive" "$TUNNEL_CNAME"
create_dns_record "$ZONE_BLACKROAD_SYSTEMS" "agents" "$TUNNEL_CNAME"

echo ""
echo "=========================================="
echo "  DNS Setup Complete"
echo "=========================================="
echo ""
echo "All subdomains now point to the Cloudflare tunnel."
echo "Make sure the tunnel is running with the correct config."
echo ""
