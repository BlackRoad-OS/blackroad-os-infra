# Multi-Zone Service Map

This document provides the authoritative cross-zone service mapping for the BlackRoad OS ecosystem, spanning both **blackroad.io** (Pages-based) and **blackroad.systems** (Railway-based) domains.

---

## Zone Overview

| Zone | Provider | Purpose |
|------|----------|---------|
| `blackroad.io` | Cloudflare Pages | Development / Preview deployments |
| `blackroad.systems` | Railway | Production deployments |

---

## Zone A: blackroad.io (Pages DNS)

### A Records

| Record | Target |
|--------|--------|
| `blackroad.io` (apex) | `174.138.44.45` |
| `www` | `174.138.44.45` |

### CNAME Records

| Subdomain | Target |
|-----------|--------|
| `api` | `blackroad-os-api.pages.dev` |
| `brand` | `blackroad-os-brand.pages.dev` |
| `chat` | `nextjs-ai-chatbot.pages.dev` |
| `console` | `blackroad-os-prism-console.pages.dev` |
| `core` | `blackroad-os-core.pages.dev` |
| `dashboard` | `blackroad-os-operator.pages.dev` |
| `demo` | `blackroad-os-demo.pages.dev` |
| `docs` | `blackroad-os-docs.pages.dev` |
| `ideas` | `blackroad-os-ideas.pages.dev` |
| `infra` | `blackroad-os-infra.pages.dev` |
| `operator` | `blackroad-os-operator.pages.dev` |
| `prism` | `blackroad-os-prism-console.pages.dev` |
| `research` | `blackroad-os-research.pages.dev` |
| `studio` | `lucidia.studio.pages.dev` |
| `web` | `blackroad-os-web.pages.dev` |

---

## Zone B: blackroad.systems (Railway DNS)

### CNAME Records

| Subdomain | Target |
|-----------|--------|
| `blackroad.systems` (apex) | `jwb6j4o5.up.railway.app` |
| `api` | `blackroad-os-api-production-ff5a.up.railway.app` |
| `app` | `qj64zcxg.up.railway.app` |
| `brand` | `blackroad-os-brand-production.up.railway.app` |
| `console` | `blackroad-os-prism-console-production-3118.up.railway.app` |
| `core` | `blackroad-os-core-production.up.railway.app` |
| `docs` | `blackroad-os-docs-production-d8de.up.railway.app` |
| `ideas` | `blackroad-os-ideas-production.up.railway.app` |
| `infra` | `blackroad-os-infra-production.up.railway.app` |
| `operator` | `blackroad-os-operator-production-021e.up.railway.app` |
| `os` | `blackroad.systems` |
| `prism` | `blackroad-prism-console-production.up.railway.app` |
| `research` | `blackroad-os-research-production.up.railway.app` |
| `router` | `h7o1fsvl.up.railway.app` |
| `web` | `blackroad-os-web-production-a2ee.up.railway.app` |
| `www` | `blackroad.systems` |

---

## Cross-Zone Service Map

For each service, this table shows presence in both zones, their targets, and the designated canonical domain.

| Service | blackroad.io | blackroad.systems | Canonical Zone |
|---------|--------------|-------------------|----------------|
| **api** | `api.blackroad.io` → `blackroad-os-api.pages.dev` | `api.blackroad.systems` → `blackroad-os-api-production-ff5a.up.railway.app` | `blackroad.systems` |
| **app** | ❌ Not present | `app.blackroad.systems` → `qj64zcxg.up.railway.app` | `blackroad.systems` |
| **brand** | `brand.blackroad.io` → `blackroad-os-brand.pages.dev` | `brand.blackroad.systems` → `blackroad-os-brand-production.up.railway.app` | `blackroad.systems` |
| **chat** | `chat.blackroad.io` → `nextjs-ai-chatbot.pages.dev` | ❌ Not present | `blackroad.io` |
| **console** | `console.blackroad.io` → `blackroad-os-prism-console.pages.dev` | `console.blackroad.systems` → `blackroad-os-prism-console-production-3118.up.railway.app` | `blackroad.systems` |
| **core** | `core.blackroad.io` → `blackroad-os-core.pages.dev` | `core.blackroad.systems` → `blackroad-os-core-production.up.railway.app` | `blackroad.systems` |
| **dashboard** | `dashboard.blackroad.io` → `blackroad-os-operator.pages.dev` | ❌ Not present | `blackroad.io` (duplicate of operator) |
| **demo** | `demo.blackroad.io` → `blackroad-os-demo.pages.dev` | ❌ Not present | `blackroad.io` |
| **docs** | `docs.blackroad.io` → `blackroad-os-docs.pages.dev` | `docs.blackroad.systems` → `blackroad-os-docs-production-d8de.up.railway.app` | `blackroad.systems` |
| **ideas** | `ideas.blackroad.io` → `blackroad-os-ideas.pages.dev` | `ideas.blackroad.systems` → `blackroad-os-ideas-production.up.railway.app` | `blackroad.systems` |
| **infra** | `infra.blackroad.io` → `blackroad-os-infra.pages.dev` | `infra.blackroad.systems` → `blackroad-os-infra-production.up.railway.app` | `blackroad.systems` |
| **operator** | `operator.blackroad.io` → `blackroad-os-operator.pages.dev` | `operator.blackroad.systems` → `blackroad-os-operator-production-021e.up.railway.app` | `blackroad.systems` |
| **os** | ❌ Not present | `os.blackroad.systems` → `blackroad.systems` (loop) | ⚠️ Loop detected |
| **prism** | `prism.blackroad.io` → `blackroad-os-prism-console.pages.dev` | `prism.blackroad.systems` → `blackroad-prism-console-production.up.railway.app` | `blackroad.systems` |
| **research** | `research.blackroad.io` → `blackroad-os-research.pages.dev` | `research.blackroad.systems` → `blackroad-os-research-production.up.railway.app` | `blackroad.systems` |
| **router** | ❌ Not present | `router.blackroad.systems` → `h7o1fsvl.up.railway.app` | `blackroad.systems` |
| **studio** | `studio.blackroad.io` → `lucidia.studio.pages.dev` | ❌ Not present | `blackroad.io` (external) |
| **web** | `web.blackroad.io` → `blackroad-os-web.pages.dev` | `web.blackroad.systems` → `blackroad-os-web-production-a2ee.up.railway.app` | `blackroad.systems` |

---

## Service Details

### api

```yaml
io:
  fqdn: api.blackroad.io
  target: blackroad-os-api.pages.dev
  type: CNAME
systems:
  fqdn: api.blackroad.systems
  target: blackroad-os-api-production-ff5a.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### web

```yaml
io:
  fqdn: web.blackroad.io
  target: blackroad-os-web.pages.dev
  type: CNAME
systems:
  fqdn: web.blackroad.systems
  target: blackroad-os-web-production-a2ee.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### operator

```yaml
io:
  fqdn: operator.blackroad.io
  target: blackroad-os-operator.pages.dev
  type: CNAME
systems:
  fqdn: operator.blackroad.systems
  target: blackroad-os-operator-production-021e.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
note: dashboard.blackroad.io is a duplicate pointing to the same service
```

### core

```yaml
io:
  fqdn: core.blackroad.io
  target: blackroad-os-core.pages.dev
  type: CNAME
systems:
  fqdn: core.blackroad.systems
  target: blackroad-os-core-production.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### infra

```yaml
io:
  fqdn: infra.blackroad.io
  target: blackroad-os-infra.pages.dev
  type: CNAME
systems:
  fqdn: infra.blackroad.systems
  target: blackroad-os-infra-production.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### docs

```yaml
io:
  fqdn: docs.blackroad.io
  target: blackroad-os-docs.pages.dev
  type: CNAME
systems:
  fqdn: docs.blackroad.systems
  target: blackroad-os-docs-production-d8de.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### brand

```yaml
io:
  fqdn: brand.blackroad.io
  target: blackroad-os-brand.pages.dev
  type: CNAME
systems:
  fqdn: brand.blackroad.systems
  target: blackroad-os-brand-production.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### research

```yaml
io:
  fqdn: research.blackroad.io
  target: blackroad-os-research.pages.dev
  type: CNAME
systems:
  fqdn: research.blackroad.systems
  target: blackroad-os-research-production.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### prism

```yaml
io:
  fqdn: prism.blackroad.io
  target: blackroad-os-prism-console.pages.dev
  type: CNAME
systems:
  fqdn: prism.blackroad.systems
  target: blackroad-prism-console-production.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: mismatch
note: io points to blackroad-os-prism-console, systems points to blackroad-prism-console (missing "os" prefix)
```

### console

```yaml
io:
  fqdn: console.blackroad.io
  target: blackroad-os-prism-console.pages.dev
  type: CNAME
systems:
  fqdn: console.blackroad.systems
  target: blackroad-os-prism-console-production-3118.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### ideas

```yaml
io:
  fqdn: ideas.blackroad.io
  target: blackroad-os-ideas.pages.dev
  type: CNAME
systems:
  fqdn: ideas.blackroad.systems
  target: blackroad-os-ideas-production.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: consistent
```

### chat

```yaml
io:
  fqdn: chat.blackroad.io
  target: nextjs-ai-chatbot.pages.dev
  type: CNAME
systems: null
canonical: blackroad.io
status: io-only
note: External Vercel/Pages app, not yet deployed to Railway
```

### demo

```yaml
io:
  fqdn: demo.blackroad.io
  target: blackroad-os-demo.pages.dev
  type: CNAME
systems: null
canonical: blackroad.io
status: io-only
```

### studio

```yaml
io:
  fqdn: studio.blackroad.io
  target: lucidia.studio.pages.dev
  type: CNAME
systems: null
canonical: blackroad.io
status: io-only
note: External ecosystem (Lucidia Studio)
```

### app

```yaml
io: null
systems:
  fqdn: app.blackroad.systems
  target: qj64zcxg.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: systems-only
note: Generic app endpoint on Railway
```

### router

```yaml
io: null
systems:
  fqdn: router.blackroad.systems
  target: h7o1fsvl.up.railway.app
  type: CNAME
canonical: blackroad.systems
status: systems-only
note: Internal routing service
```

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total unique services | 17 |
| Present in both zones | 11 |
| blackroad.io only | 4 |
| blackroad.systems only | 2 |
| Mismatches detected | 1 |
| Loops detected | 1 |
| Duplicates detected | 1 |

---

*Generated by BlackRoad OS Multi-Zone Authority Sweep*
