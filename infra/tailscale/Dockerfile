FROM alpine:3.19

RUN apk add --no-cache tailscale iptables iproute2 ca-certificates

# NOTE: IP forwarding (net.ipv4.ip_forward, net.ipv6.conf.all.forwarding) must be
# enabled at the host/platform level (Railway privileged mode or host sysctl).
# It cannot be set inside a standard container via sysctl.conf.

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
