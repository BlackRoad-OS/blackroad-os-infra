# DNS Reconciliation Report

> Generated from Cloudflare DNS table for `blackroad.io`
> Last updated: 2025-11-25

This document captures the current state of DNS records as observed in Cloudflare.

---

## 1. Current DNS Records

### A Records

| Name | Target | Notes |
|------|--------|-------|
| `@` (blackroad.io) | 174.138.44.45 | Legacy DigitalOcean droplet |
| `www` | 174.138.44.45 | Legacy DigitalOcean droplet |

### CNAME Records

| Subdomain | Target | Service |
|-----------|--------|---------|
| `api` | blackroad-os-api.pages.dev | API Service |
| `brand` | blackroad-os-brand.pages.dev | Brand Assets |
| `chat` | nextjs-ai-chatbot.pages.dev | AI Chat Interface |
| `console` | blackroad-os-prism-console.pages.dev | Prism Console |
| `core` | blackroad-os-core.pages.dev | Core Services |
| `dashboard` | blackroad-os-operator.pages.dev | Operator Dashboard (duplicate) |
| `demo` | blackroad-os-demo.pages.dev | Demo Environment |
| `docs` | blackroad-os-docs.pages.dev | Documentation |
| `ideas` | blackroad-os-ideas.pages.dev | Ideas Portal |
| `infra` | blackroad-os-infra.pages.dev | Infrastructure Dashboard |
| `operator` | blackroad-os-operator.pages.dev | Operator Portal |
| `prism` | blackroad-os-prism-console.pages.dev | Prism Console (duplicate) |
| `research` | blackroad-os-research.pages.dev | Research Portal |
| `studio` | lucidia.studio.pages.dev | Studio Environment |
| `web` | blackroad-os-web.pages.dev | Main Web Application |

### TXT Records

| Purpose |
|---------|
| OpenAI verification |
| Atlassian verification |
| HubSpot verification |
| GitHub verification |

---

## 2. Services Map

Derived from CNAME records:

```yaml
services:
  web: web.blackroad.io → blackroad-os-web.pages.dev
  api: api.blackroad.io → blackroad-os-api.pages.dev
  operator: operator.blackroad.io → blackroad-os-operator.pages.dev
  core: core.blackroad.io → blackroad-os-core.pages.dev
  infra: infra.blackroad.io → blackroad-os-infra.pages.dev
  docs: docs.blackroad.io → blackroad-os-docs.pages.dev
  brand: brand.blackroad.io → blackroad-os-brand.pages.dev
  research: research.blackroad.io → blackroad-os-research.pages.dev
  console: console.blackroad.io → blackroad-os-prism-console.pages.dev
  prism: prism.blackroad.io → blackroad-os-prism-console.pages.dev
  ideas: ideas.blackroad.io → blackroad-os-ideas.pages.dev
  dashboard: dashboard.blackroad.io → blackroad-os-operator.pages.dev
  demo: demo.blackroad.io → blackroad-os-demo.pages.dev
  chat: chat.blackroad.io → nextjs-ai-chatbot.pages.dev
  studio: studio.blackroad.io → lucidia.studio.pages.dev
```

---

## 3. Issues Detected

### Duplicate Entries

| Issue | Details |
|-------|---------|
| `prism` + `console` | Both point to `blackroad-os-prism-console.pages.dev` |
| `dashboard` + `operator` | Both point to `blackroad-os-operator.pages.dev` |

### Legacy Infrastructure

| Record | Issue |
|--------|-------|
| `@` A record | Points to 174.138.44.45 (old DigitalOcean droplet) |
| `www` A record | Points to 174.138.44.45 (old DigitalOcean droplet) |

### Missing Entries

The following subdomains are not configured but may be needed:

- `login.blackroad.io` - Authentication landing
- `auth.blackroad.io` - Auth service endpoint
- `assets.blackroad.io` - Static assets CDN
- `api-gateway.blackroad.io` - API gateway
- `monitoring.blackroad.io` - Monitoring dashboard
- `status.blackroad.io` - Status page

### Unverified Deployments

The following Pages deployments should be verified as existing:

- `blackroad-os-ideas.pages.dev`
- `blackroad-os-demo.pages.dev`

---

## 4. Recommendations

1. **Remove duplicate records**: Delete `prism` (keep `console`) and `dashboard` (keep `operator`)
2. **Migrate apex records**: Change A records to CNAME pointing to Pages
3. **Add missing services**: Configure auth, login, assets, gateway, monitoring, status
4. **Verify deployments**: Confirm all Pages deployments are live before DNS changes

---

## References

- [DNS Corrections Plan](./DNS_CORRECTIONS_PLAN.md)
- [DNS Blueprint Final](./DNS_BLUEPRINT_FINAL.yaml)
- [Services Registry](/registry/services.yaml)
