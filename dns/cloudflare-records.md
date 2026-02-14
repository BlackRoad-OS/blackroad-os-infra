# Cloudflare DNS Records

This document defines the DNS records needed to wire up the BlackRoad infrastructure.

## SSL Mode

- **Recommended:** Full (strict) once all services have valid certs
- **Fallback:** Full for Railway/Vercel (they provide certs)
- **Avoid:** Flexible (no encryption between CF and origin)

---

## Priority Services (Wire These First)

### 1. blackroad.io (Marketing Site → Vercel)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `@` | CNAME | `cname.vercel-dns.com` | Proxied | Auto | Root domain |
| `www` | CNAME | `cname.vercel-dns.com` | Proxied | Auto | www redirect |

**Vercel setup:**
1. Add `blackroad.io` as custom domain in Vercel project
2. Vercel will verify via CNAME

---

### 2. os.blackroad.systems (OS Web UI → Railway)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `os` | CNAME | `<railway-service>.up.railway.app` | Proxied | Auto | Main OS entry |

**Railway setup:**
1. Get the Railway service URL from dashboard
2. Add custom domain `os.blackroad.systems` in Railway
3. Railway will issue cert via Let's Encrypt

---

### 3. console.blackroad.systems (Prism Console → Railway)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `console` | CNAME | `<railway-prism-service>.up.railway.app` | Proxied | Auto | Admin console |

---

### 4. api.blackroad.systems (API → Railway)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `api` | CNAME | `<railway-api-service>.up.railway.app` | Proxied | Auto | Main API |

---

### 5. gateway.blackroad.systems (API Gateway → Railway)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `gateway` | CNAME | `<railway-gateway-service>.up.railway.app` | Proxied | Auto | Gateway/routing |

---

### 6. docs.blackroad.io (Docs → Vercel)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `docs` | CNAME | `cname.vercel-dns.com` | Proxied | Auto | Documentation |

---

## Secondary Services

### beacon.blackroad.systems (Status/Health)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `beacon` | CNAME | `<railway-beacon-service>.up.railway.app` | Proxied | Auto | Status page |

### demo.blackroad.systems (Demo Environment)

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `demo` | CNAME | `<railway-demo-service>.up.railway.app` | Proxied | Auto | Demo |

---

## Lucidia / QI Domains

### lucidia.earth

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `@` | CNAME | `<vercel-or-railway>` | Proxied | Auto | Main Lucidia |
| `www` | CNAME | `<vercel-or-railway>` | Proxied | Auto | www redirect |

### lucidia.studio

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `@` | CNAME | `<vercel-or-railway>` | Proxied | Auto | Creative/studio |

### lucidiaqi.com

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `@` | CNAME | `<vercel-or-railway>` | Proxied | Auto | Lucidia + QI |

### aliceqi.com

| Name | Type | Value | Proxy | TTL | Notes |
|------|------|-------|-------|-----|-------|
| `@` | CNAME | `<vercel-or-railway>` | Proxied | Auto | Alice + QI |

---

## Terraform Reference (Future IaC)

```hcl
# Example Cloudflare Terraform for blackroad.systems

resource "cloudflare_record" "os" {
  zone_id = var.blackroad_systems_zone_id
  name    = "os"
  value   = "your-railway-service.up.railway.app"
  type    = "CNAME"
  proxied = true
  ttl     = 1  # Auto when proxied
}

resource "cloudflare_record" "api" {
  zone_id = var.blackroad_systems_zone_id
  name    = "api"
  value   = "your-api-service.up.railway.app"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}

resource "cloudflare_record" "console" {
  zone_id = var.blackroad_systems_zone_id
  name    = "console"
  value   = "your-prism-service.up.railway.app"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}

resource "cloudflare_record" "gateway" {
  zone_id = var.blackroad_systems_zone_id
  name    = "gateway"
  value   = "your-gateway-service.up.railway.app"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}
```

---

## Domain → Service Mapping (Canonical)

| Domain | Service Repo | Deploy Target | DNS Type | Status |
|--------|--------------|---------------|----------|--------|
| `blackroad.io` | BlackRoad-AI/BlackRoad.io | Vercel | CNAME | Planned |
| `www.blackroad.io` | BlackRoad-AI/BlackRoad.io | Vercel | CNAME | Planned |
| `docs.blackroad.io` | BlackRoad-OS/blackroad-os-docs | Vercel | CNAME | Planned |
| `os.blackroad.systems` | BlackRoad-OS/blackroad-os-web | Railway | CNAME | Planned |
| `api.blackroad.systems` | BlackRoad-OS/blackroad-os-api | Railway | CNAME | Planned |
| `console.blackroad.systems` | BlackRoad-OS/blackroad-os-prism-console | Railway | CNAME | Planned |
| `gateway.blackroad.systems` | BlackRoad-OS/blackroad-os-api-gateway | Railway | CNAME | Planned |
| `beacon.blackroad.systems` | BlackRoad-OS/blackroad-os-beacon | Railway | CNAME | Planned |
| `demo.blackroad.systems` | BlackRoad-OS/blackroad-os-demo | Railway | CNAME | Planned |

---

## Checklist

When wiring a new service:

1. [ ] Deploy service to Railway/Vercel
2. [ ] Get the service URL (e.g., `xxx.up.railway.app`)
3. [ ] Add CNAME record in Cloudflare
4. [ ] Add custom domain in Railway/Vercel dashboard
5. [ ] Wait for SSL cert to provision
6. [ ] Test health endpoint: `curl https://subdomain.domain.tld/health`
7. [ ] Update this doc with "Live" status
