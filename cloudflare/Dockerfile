FROM cloudflare/cloudflared:latest

COPY tunnel-config.yml /etc/cloudflared/config.yml

# The TUNNEL_TOKEN env var must be set in Railway
CMD ["tunnel", "--no-autoupdate", "run", "--token", "${TUNNEL_TOKEN}"]
