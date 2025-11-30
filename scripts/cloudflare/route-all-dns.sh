#!/bin/bash
# ==============================================
# BLACKROAD OS - ROUTE ALL DNS TO TUNNEL
# ==============================================
# Routes all subdomains to the Cloudflare tunnel
#
# Prerequisites:
# - cloudflared CLI installed and authenticated
# - Tunnel 'blackroad-os' exists
#
# Usage: ./scripts/cloudflare/route-all-dns.sh
# ==============================================

set -e

TUNNEL_NAME="blackroad-os"

echo "=========================================="
echo "  ROUTING DNS TO CLOUDFLARE TUNNEL"
echo "=========================================="
echo ""

echo "Routing blackroad.io subdomains..."
cloudflared tunnel route dns "$TUNNEL_NAME" app.blackroad.io || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" home.blackroad.io || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" os.blackroad.io || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" creator.blackroad.io || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" api.blackroad.io || echo "  (may already exist)"

echo ""
echo "Routing blackroad.systems subdomains..."
cloudflared tunnel route dns "$TUNNEL_NAME" api.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" core.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" infra.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" console.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" docs.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" prism.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" beacon.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" research.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" lab.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" devops.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" legal.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" finance.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" demo.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" archive.blackroad.systems || echo "  (may already exist)"
cloudflared tunnel route dns "$TUNNEL_NAME" agents.blackroad.systems || echo "  (may already exist)"

echo ""
echo "=========================================="
echo "  DNS ROUTING COMPLETE"
echo "=========================================="
echo ""
echo "All subdomains are now routed to tunnel: $TUNNEL_NAME"
echo ""
echo "Verify with: cloudflared tunnel route list"
echo ""
