#!/bin/sh
set -e

HOSTNAME="${TAILSCALE_HOSTNAME:-blackroad-railway-node}"
TAGS="${TAILSCALE_TAGS:-tag:server,tag:railway}"
ROUTES="${ROUTE_SUBNETS:-100.64.0.0/10}"

if [ -z "${TAILSCALE_AUTHKEY}" ]; then
  echo "[tailscale] ERROR: TAILSCALE_AUTHKEY is required" >&2
  exit 1
fi

# Start tailscaled in userspace networking mode (no kernel modules needed in containers)
tailscaled --tun=userspace-networking --socks5-server=localhost:1055 &
TAILSCALED_PID=$!

# Wait for tailscaled socket to become ready (up to 30 s)
WAIT=0
until tailscale status > /dev/null 2>&1; do
  sleep 1
  WAIT=$((WAIT + 1))
  if [ $WAIT -ge 30 ]; then
    echo "[tailscale] ERROR: tailscaled did not start within 30 seconds" >&2
    exit 1
  fi
done

# Bring the node up
tailscale up \
  --authkey="${TAILSCALE_AUTHKEY}" \
  --hostname="${HOSTNAME}" \
  --advertise-tags="${TAGS}" \
  --advertise-routes="${ROUTES}" \
  --advertise-exit-node \
  --accept-routes

echo "[tailscale] Node '${HOSTNAME}' is up."
echo "[tailscale] Advertising routes: ${ROUTES}"
echo "[tailscale] Tags: ${TAGS}"

# Keep the container alive
wait $TAILSCALED_PID
