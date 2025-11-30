#!/bin/bash
# ==============================================
# BLACKROAD OS - CREATE CLOUDFLARE TUNNEL
# ==============================================
# Creates a new Cloudflare tunnel for BlackRoad OS
#
# Prerequisites:
# - cloudflared CLI installed
# - Logged in: cloudflared login
#
# Usage: ./scripts/cloudflare/create-tunnel.sh
# ==============================================

set -e

echo "=========================================="
echo "  CLOUDFLARE TUNNEL CREATION"
echo "=========================================="
echo ""

TUNNEL_NAME="blackroad-os"

echo "Checking cloudflared authentication..."
if ! cloudflared tunnel list &>/dev/null; then
  echo "Not authenticated. Running: cloudflared login"
  cloudflared login
fi

echo ""
echo "Checking for existing tunnel..."
EXISTING=$(cloudflared tunnel list | grep "$TUNNEL_NAME" || true)

if [ -n "$EXISTING" ]; then
  echo "Tunnel '$TUNNEL_NAME' already exists:"
  echo "$EXISTING"
  echo ""
  echo "To delete and recreate:"
  echo "  cloudflared tunnel delete $TUNNEL_NAME"
  echo "  ./scripts/cloudflare/create-tunnel.sh"
  echo ""

  # Extract tunnel ID
  TUNNEL_ID=$(echo "$EXISTING" | awk '{print $1}')
  echo "Tunnel ID: $TUNNEL_ID"
  echo ""
  echo "To get the tunnel token for Railway:"
  echo "  cloudflared tunnel token $TUNNEL_NAME"
  echo ""
else
  echo "Creating new tunnel: $TUNNEL_NAME"
  cloudflared tunnel create "$TUNNEL_NAME"
  echo ""

  echo "Getting tunnel token..."
  echo ""
  echo "=========================================="
  echo "  TUNNEL TOKEN (add to Railway)"
  echo "=========================================="
  cloudflared tunnel token "$TUNNEL_NAME"
  echo ""
  echo "=========================================="
  echo ""
  echo "Add this token to Railway:"
  echo "  1. Go to Railway dashboard"
  echo "  2. Select 'cloudflared' service"
  echo "  3. Go to Variables"
  echo "  4. Add: TUNNEL_TOKEN=<token above>"
  echo ""
fi

echo "Routing DNS records to tunnel..."
echo ""
echo "Run these commands to route subdomains:"
echo ""
echo "# blackroad.io subdomains"
echo "cloudflared tunnel route dns $TUNNEL_NAME app.blackroad.io"
echo "cloudflared tunnel route dns $TUNNEL_NAME home.blackroad.io"
echo "cloudflared tunnel route dns $TUNNEL_NAME os.blackroad.io"
echo "cloudflared tunnel route dns $TUNNEL_NAME creator.blackroad.io"
echo "cloudflared tunnel route dns $TUNNEL_NAME api.blackroad.io"
echo ""
echo "# blackroad.systems subdomains"
echo "cloudflared tunnel route dns $TUNNEL_NAME api.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME core.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME infra.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME console.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME docs.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME prism.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME beacon.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME research.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME lab.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME devops.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME legal.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME finance.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME demo.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME archive.blackroad.systems"
echo "cloudflared tunnel route dns $TUNNEL_NAME agents.blackroad.systems"
echo ""
