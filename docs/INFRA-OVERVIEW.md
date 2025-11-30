# BlackRoad OS Infrastructure Overview

> Single source of truth for Railway + Cloudflare infrastructure.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLOUDFLARE                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         DNS (blackroad.io)                          │    │
│  │  *.blackroad.io → CNAME → blackroad-os-tunnel.cfargotunnel.com     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│  ┌─────────────────────────────────▼───────────────────────────────────┐    │
│  │                    Cloudflare Tunnel                                 │    │
│  │                   (blackroad-os-tunnel)                              │    │
│  │                                                                      │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │    │
│  │  │blackroad.io │ │app.blackroad│ │console.     │ │api.blackroad│   │    │
│  │  │             │ │.io          │ │blackroad.io │ │.io          │   │    │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘   │    │
│  │         │               │               │               │          │    │
│  └─────────┼───────────────┼───────────────┼───────────────┼──────────┘    │
└────────────┼───────────────┼───────────────┼───────────────┼────────────────┘
             │               │               │               │
             ▼               ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RAILWAY                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Private Network (Railway Internal)                │    │
│  │                                                                      │    │
│  │  ┌────────────────────────────────────┐                              │    │
│  │  │      blackroad-os-web:3000         │ ◄── All public hostnames     │    │
│  │  │    (Next.js - context routing)     │     (via X-BR-Context header)│    │
│  │  └───────────────┬────────────────────┘                              │    │
│  │                  │                                                    │    │
│  │  ┌───────────────▼────────────────────┐                              │    │
│  │  │  blackroad-os-api-gateway:8080     │ ◄── api.blackroad.io         │    │
│  │  └───────────────┬────────────────────┘                              │    │
│  │                  │                                                    │    │
│  │      ┌───────────┼───────────┐                                       │    │
│  │      ▼           ▼           ▼                                       │    │
│  │  ┌───────┐   ┌───────┐   ┌───────┐                                   │    │
│  │  │ core  │   │operator│   │ mesh  │  (Internal only)                 │    │
│  │  │ :9000 │   │ :9001 │   │ :9002 │                                   │    │
│  │  └───────┘   └───────┘   └───────┘                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Railway Services

| Service | Repo | Port | Public | Purpose |
|---------|------|------|--------|---------|
| `blackroad-os-web` | BlackRoad-OS/blackroad-os-web | 3000 | Yes | Web UI, all public domains |
| `blackroad-os-api-gateway` | BlackRoad-OS/blackroad-os-api-gateway | 8080 | Yes | API endpoint |
| `blackroad-os-core` | BlackRoad-OS/blackroad-os-core | 9000 | No | Core business logic |
| `blackroad-os-operator` | BlackRoad-OS/blackroad-os-operator | 9001 | No | Agent orchestration |
| `blackroad-os-mesh` | BlackRoad-OS/blackroad-os-mesh | 9002 | No | Service mesh / beacon |

## Domain Routing

| Domain | Routes To | Context Header |
|--------|-----------|----------------|
| `blackroad.io` | web:3000 | `X-BR-Context: marketing` |
| `www.blackroad.io` | web:3000 | `X-BR-Context: marketing` |
| `app.blackroad.io` | web:3000 | `X-BR-Context: workspace` |
| `console.blackroad.io` | web:3000 | `X-BR-Context: console` |
| `finance.blackroad.io` | web:3000 | `X-BR-Context: finance` |
| `studio.blackroad.io` | web:3000 | `X-BR-Context: studio` |
| `edu.blackroad.io` | web:3000 | `X-BR-Context: education` |
| `api.blackroad.io` | api-gateway:8080 | - |

---

## Execution Steps

### Step 1: Railway Project Setup

```bash
# Login to Railway
railway login

# Create project (or import existing)
railway init --name blackroad-os-production

# For each service, link repo:
# Go to Railway dashboard → New Service → GitHub Repo
# Select: BlackRoad-OS/blackroad-os-web (and others)
```

**In Railway Dashboard:**
1. Create project: `blackroad-os-production`
2. Add 5 services from the repos above
3. Configure environment variables (see below)

### Step 2: Set Environment Variables

**For all services:**
```
RAILWAY_ENVIRONMENT=production
LOG_LEVEL=info
```

**For blackroad-os-web:**
```
NODE_ENV=production
API_URL=http://blackroad-os-api-gateway.railway.internal:8080
NEXT_PUBLIC_API_URL=https://api.blackroad.io
```

**For blackroad-os-api-gateway:**
```
NODE_ENV=production
CORE_URL=http://blackroad-os-core.railway.internal:9000
OPERATOR_URL=http://blackroad-os-operator.railway.internal:9001
MESH_URL=http://blackroad-os-mesh.railway.internal:9002
```

**For blackroad-os-operator:**
```
NODE_ENV=production
ANTHROPIC_API_KEY=<from secrets>
OPENAI_API_KEY=<from secrets>
```

### Step 3: Cloudflare Tunnel Setup

```bash
# Install cloudflared
brew install cloudflared

# Login
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create blackroad-os-tunnel

# Note the tunnel ID (e.g., abc123-def456-...)
```

### Step 4: Configure Tunnel Routes

In Cloudflare Dashboard → Zero Trust → Access → Tunnels:

1. Select `blackroad-os-tunnel`
2. Add public hostnames:

| Hostname | Service | Origin Request |
|----------|---------|----------------|
| `blackroad.io` | `http://blackroad-os-web.railway.internal:3000` | Host: blackroad.io |
| `app.blackroad.io` | `http://blackroad-os-web.railway.internal:3000` | Host: app.blackroad.io |
| `api.blackroad.io` | `http://blackroad-os-api-gateway.railway.internal:8080` | Host: api.blackroad.io |
| (add all others) | | |

### Step 5: DNS Records

In Cloudflare Dashboard → DNS:

For each subdomain, create CNAME:
- Name: `@` (or subdomain)
- Target: `<tunnel-id>.cfargotunnel.com`
- Proxy: ON (orange cloud)

### Step 6: Verification

```bash
# Test health endpoints
curl -I https://blackroad.io/api/health
curl -I https://api.blackroad.io/health

# Check headers
curl -I https://app.blackroad.io | grep X-BR-Context
```

---

## Secrets Required

| Secret | Where | Notes |
|--------|-------|-------|
| `ANTHROPIC_API_KEY` | Railway / GitHub | For Claude integration |
| `OPENAI_API_KEY` | Railway / GitHub | For GPT integration |
| `CLOUDFLARE_API_TOKEN` | GitHub Actions | For deployment |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub Actions | For deployment |
| `RAILWAY_TOKEN` | GitHub Actions | For CI/CD |

---

## Related Files

- Railway config: `/railway/railway-services.json`
- Cloudflare config: `/cloudflare/dns.md`
- Environment templates: `/environments/`

---

*Last updated: 2024-11-30 - Phase 1 Consolidation Complete*
