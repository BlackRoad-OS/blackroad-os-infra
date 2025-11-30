# BlackRoad OS - Domain Strategy

> Master routing plan for all BlackRoad domains

## Domain Inventory

### Core "BlackRoad" Brand
- `blackroad.io` (primary)
- `blackroad.systems`
- `blackroadinc.us`
- `blackroad.me`
- `blackroad.network`
- `blackroadai.com`
- `blackroadqi.com`

### Quantum Cluster
- `blackroadquantum.com` (primary)
- `blackroadquantum.info`
- `blackroadquantum.net`
- `blackroadquantum.shop`
- `blackroadquantum.store`

### Lucidia Cluster
- `lucidia.earth`
- `lucidia.studio`
- `lucidiaqi.com`

### Personal
- `aliceqi.com`

---

## Architecture: One OS, Many Doors

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare                                │
│                    (Traffic Cop + CDN)                          │
│                                                                  │
│   blackroad.io ─────┐                                           │
│   app.blackroad.io ─┼──► blackroad-os-web (Next.js)             │
│   lucidia.earth ────┤       ├─ Host header routing              │
│   blackroadquantum.com      ├─ Theme selection                  │
│                             └─ Feature flags                    │
│                                                                  │
│   api.blackroad.io ────────► blackroad-os-api-gateway           │
│                                                                  │
│   operator.blackroad.io ───► blackroad-os-operator              │
│                                   └─ /ws/agent (Pi mesh)        │
│                                                                  │
│   docs.blackroad.systems ──► blackroad-os-docs                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## blackroad.io Routing (Primary Domain)

### Experience Layer → `blackroad-os-web`

| Hostname | Purpose | In-App Route |
|----------|---------|--------------|
| `blackroad.io` | Marketing homepage | `/` |
| `www.blackroad.io` | Canonical redirect | 301 → `blackroad.io` |
| `app.blackroad.io` | User workspace UI | `/app` |
| `console.blackroad.io` | Operator/admin UI | `/console` |
| `finance.blackroad.io` | Finance pack surface | `/finance` |
| `studio.blackroad.io` | Creator studio | `/studio` |
| `education.blackroad.io` | Education pack | `/education` |

### API / Operator Layer

| Hostname | Service | Purpose |
|----------|---------|---------|
| `api.blackroad.io` | `blackroad-os-api-gateway` | Public REST/GraphQL |
| `operator.blackroad.io` | `blackroad-os-operator` | Pi mesh + `/ws/agent` |
| `beacon.blackroad.io` | `blackroad-os-beacon` | Telemetry ingestion |

### Utilities

| Hostname | Purpose |
|----------|---------|
| `docs.blackroad.io` | Public documentation |
| `status.blackroad.io` | Uptime status page |
| `cdn.blackroad.io` | Static assets (R2) |

---

## blackroad.systems (Infrastructure)

| Hostname | Purpose | Service |
|----------|---------|---------|
| `docs.blackroad.systems` | Technical docs, runbooks | `blackroad-os-docs` |
| `infra.blackroad.systems` | Infrastructure console | `blackroad-os-infra` |
| `id.blackroad.systems` | Identity/auth (future) | TBD |

---

## Redirect Domains

| Domain | Redirect To |
|--------|-------------|
| `blackroadai.com` | `https://blackroad.io/ai` |
| `www.blackroadai.com` | `https://blackroad.io/ai` |
| `blackroadinc.us` | `https://blackroad.io/company` |
| `blackroad.me` | `https://blackroad.io/alexa` |
| `blackroad.network` | `https://blackroad.io/protocol` |

---

## Quantum Cluster

**Primary:** `blackroadquantum.com`

| Domain | Behavior |
|--------|----------|
| `blackroadquantum.com` | Quantum/math landing → `blackroad-os-web` with host theme |
| `blackroadquantum.info` | 301 → `blackroadquantum.com` |
| `blackroadquantum.net` | 301 → `blackroadquantum.com` |
| `blackroadquantum.shop` | 301 → `blackroadquantum.com` |
| `blackroadquantum.store` | 301 → `blackroadquantum.com` |

---

## Lucidia Cluster

All map to `blackroad-os-web` with host-specific themes:

| Hostname | In-App Route |
|----------|--------------|
| `lucidia.earth` | `/lucidia/lab` - Research/math/SIG |
| `lucidia.studio` | `/lucidia/studio` - Creative tools |
| `lucidiaqi.com` | `/lucidia/qi` - Agent/reasoning |

---

## Personal

| Domain | Purpose |
|--------|---------|
| `aliceqi.com` | Personal/portfolio → static site or redirect |

---

## Service → Domain Matrix

| Railway Service | Domains |
|-----------------|---------|
| `blackroad-os-web` | `blackroad.io`, `app.blackroad.io`, `console.blackroad.io`, `finance.blackroad.io`, `studio.blackroad.io`, `education.blackroad.io`, `lucidia.earth`, `lucidia.studio`, `lucidiaqi.com`, `blackroadquantum.com` |
| `blackroad-os-operator` | `operator.blackroad.io` |
| `blackroad-os-api-gateway` | `api.blackroad.io` |
| `blackroad-os-docs` | `docs.blackroad.io`, `docs.blackroad.systems` |
| `blackroad-os-beacon` | `beacon.blackroad.io` |

---

## Implementation Checklist

### Cloudflare Setup

- [ ] Delete old A-records pointing at droplet
- [ ] Create Cloudflare Tunnel: `blackroad-core-prod`
- [ ] Add Public Hostnames for each service
- [ ] Configure redirects for alias domains

### Railway Setup

- [ ] Deploy `blackroad-os-web` with custom domains
- [ ] Deploy `blackroad-os-operator` (DONE: `operator.blackroad.io`)
- [ ] Deploy `blackroad-os-api-gateway`
- [ ] Deploy `blackroad-os-docs`
- [ ] Add `PORT` and health check env vars

### App Code

- [ ] Add host header detection in `blackroad-os-web`
- [ ] Theme switching based on hostname
- [ ] Feature flags by hostname
- [ ] Route prefixes by hostname

---

## Current Status

| Service | Railway | Domain | Health |
|---------|---------|--------|--------|
| Operator | ✅ Live | `operator.blackroad.io` | ✅ |
| API | ⏳ Pending | `api.blackroad.io` | - |
| Web | ⏳ Pending | `blackroad.io` | - |
| Prism | ⏳ Pending | `prism.blackroad.io` | - |
| Docs | ⏳ Pending | `docs.blackroad.io` | - |
