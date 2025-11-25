# Multi-Zone Corrections Plan

This document outlines the recommended corrections to unify the DNS routing across **blackroad.io** and **blackroad.systems** zones into a coherent, production-ready infrastructure.

---

## Executive Summary

The BlackRoad OS ecosystem currently spans two DNS zones with overlapping but inconsistent configurations:

- **blackroad.io** - Cloudflare Pages-based development/preview deployments
- **blackroad.systems** - Railway-based production deployments

This plan addresses 6 identified issues and establishes `blackroad.systems` as the primary production zone.

---

## Priority Matrix

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 🔴 Critical | IO apex points to legacy droplet | Service outage risk | Low |
| 🔴 Critical | Systems apex points to random Railway | Service discovery broken | Low |
| 🟡 Medium | Prism naming mismatch | Developer confusion | Medium |
| 🟡 Medium | OS subdomain loop | Wasted DNS query | Low |
| 🟢 Low | Dashboard duplicate | Maintenance overhead | Low |
| 🟢 Low | WWW systems loop | Acceptable redirect | None |

---

## Detailed Corrections

### 1. 🔴 Fix blackroad.io Apex (Critical)

**Current State:**
```
blackroad.io → A record → 174.138.44.45 (old DigitalOcean droplet)
www.blackroad.io → A record → 174.138.44.45
```

**Problem:** The apex and www records point to a legacy droplet IP that may be decommissioned or running outdated software.

**Corrected State:**
```
blackroad.io → CNAME flatten → blackroad-os-web.pages.dev
www.blackroad.io → CNAME → blackroad.io (redirect to apex)
```

**Terraform Change:**
```hcl
# In modules/dns-cloudflare/main.tf or a new zone-specific file

resource "cloudflare_record" "io_apex" {
  zone_id = data.cloudflare_zone.io.id
  name    = "@"
  value   = "blackroad-os-web.pages.dev"
  type    = "CNAME"
  proxied = true
  comment = "Managed by Infra - Multi-Zone Authority Sweep"
}

resource "cloudflare_record" "io_www" {
  zone_id = data.cloudflare_zone.io.id
  name    = "www"
  value   = "blackroad.io"
  type    = "CNAME"
  proxied = true
  comment = "Redirect to apex"
}
```

**Manual Steps:**
1. Delete existing A records for `@` and `www` in Cloudflare dashboard
2. Apply Terraform configuration
3. Verify with `dig blackroad.io` and `curl -I https://blackroad.io`

---

### 2. 🔴 Fix blackroad.systems Apex (Critical)

**Current State:**
```
blackroad.systems → CNAME flatten → jwb6j4o5.up.railway.app (random/unknown service)
```

**Problem:** The apex points to an unidentified Railway service with a hash-based subdomain, not the primary web application.

**Corrected State:**
```
blackroad.systems → CNAME flatten → blackroad-os-web-production-a2ee.up.railway.app
www.blackroad.systems → CNAME → blackroad.systems (keep as-is)
```

**Railway Configuration:**
1. Navigate to Railway project settings
2. Update the custom domain for `blackroad.systems` to point to `blackroad-os-web-production`
3. Verify the domain binding in Railway dashboard

**Verification:**
```bash
dig blackroad.systems CNAME
curl -I https://blackroad.systems
```

---

### 3. 🟡 Standardize Prism Service Naming (Medium)

**Current State:**
```
prism.blackroad.io → blackroad-os-prism-console.pages.dev
prism.blackroad.systems → blackroad-prism-console-production.up.railway.app
```

**Problem:** The Railway deployment is missing the `os` prefix, creating naming inconsistency.

**Option A: Rename Railway Service** (Recommended)
1. In Railway, rename `blackroad-prism-console-production` to `blackroad-os-prism-console-production`
2. Update the CNAME in Cloudflare for `blackroad.systems` zone
3. Update any hardcoded references in application code

**Option B: Accept Inconsistency**
- Document the naming difference
- No infrastructure changes required
- Accept technical debt

**Recommendation:** Option A for long-term consistency.

---

### 4. 🟡 Remove OS Subdomain Loop (Medium)

**Current State:**
```
os.blackroad.systems → CNAME → blackroad.systems
```

**Problem:** Self-referential loop that adds latency and serves no purpose.

**Corrected State:**
```
os.blackroad.systems → REMOVED
```

**Alternative - If os subdomain is needed:**
```
os.blackroad.systems → CNAME → blackroad-os-core-production.up.railway.app
```

**Manual Step:**
1. Delete the `os` CNAME record from Cloudflare dashboard for `blackroad.systems` zone

---

### 5. 🟢 Deprecate Dashboard Duplicate (Low)

**Current State:**
```
dashboard.blackroad.io → blackroad-os-operator.pages.dev
operator.blackroad.io → blackroad-os-operator.pages.dev
```

**Problem:** Two subdomains pointing to the same service creates confusion and maintenance overhead.

**Corrected State - Phase 1:**
```
dashboard.blackroad.io → HTTP 301 redirect → operator.blackroad.io
```

**Corrected State - Phase 2 (after 30 days):**
```
dashboard.blackroad.io → REMOVED
```

**Implementation:**
1. Create a Cloudflare Page Rule for `dashboard.blackroad.io/*`:
   - Forwarding URL (301 Permanent Redirect)
   - Destination: `https://operator.blackroad.io/$1`
2. After deprecation period, delete the CNAME record

---

### 6. 🟢 WWW Systems Loop (No Action)

**Current State:**
```
www.blackroad.systems → CNAME → blackroad.systems
```

**Assessment:** This is a standard www-to-apex redirect pattern and is acceptable. No changes needed.

---

## Implementation Checklist

### Phase 1: Critical Fixes (Week 1)

- [ ] Back up current DNS zone files from Cloudflare
- [ ] Update blackroad.io apex from A record to CNAME flatten
- [ ] Update blackroad.io www to redirect to apex
- [ ] Verify blackroad.io apex and www are working
- [ ] Update blackroad.systems apex to point to web production
- [ ] Verify blackroad.systems apex is working
- [ ] Document changes in this repository

### Phase 2: Cleanup (Week 2)

- [ ] Remove os.blackroad.systems record
- [ ] Create redirect rule for dashboard.blackroad.io
- [ ] Rename Railway prism service (optional)
- [ ] Update Terraform modules to manage new records

### Phase 3: Automation (Week 3+)

- [ ] Import all DNS records into Terraform state
- [ ] Add multi-zone support to dns-cloudflare module
- [ ] Create CI/CD pipeline for DNS changes
- [ ] Set up monitoring for DNS resolution

---

## Rollback Plan

If any change causes issues:

1. **Immediate Rollback (< 5 minutes)**
   - Cloudflare DNS TTL is set to proxied (automatic)
   - Revert record in Cloudflare dashboard
   - Changes propagate within 60 seconds

2. **Terraform Rollback**
   ```bash
   cd terraform/environments/prod
   git checkout HEAD~1 -- .
   terraform apply -var-file=terraform.tfvars
   ```

3. **Contact Points**
   - Cloudflare: [API Token stored in Railway secrets]
   - Railway: [Token stored in Railway secrets]

---

## Corrected Routing Blueprint (Final State)

```yaml
primary_zone: blackroad.systems
secondary_zone: blackroad.io

# blackroad.systems (Production)
blackroad.systems:
  "@": blackroad-os-web-production-a2ee.up.railway.app
  www: "@"
  api: blackroad-os-api-production-ff5a.up.railway.app
  web: blackroad-os-web-production-a2ee.up.railway.app
  operator: blackroad-os-operator-production-021e.up.railway.app
  core: blackroad-os-core-production.up.railway.app
  infra: blackroad-os-infra-production.up.railway.app
  docs: blackroad-os-docs-production-d8de.up.railway.app
  brand: blackroad-os-brand-production.up.railway.app
  research: blackroad-os-research-production.up.railway.app
  prism: blackroad-os-prism-console-production-3118.up.railway.app
  console: blackroad-os-prism-console-production-3118.up.railway.app
  ideas: blackroad-os-ideas-production.up.railway.app
  router: h7o1fsvl.up.railway.app
  app: qj64zcxg.up.railway.app

# blackroad.io (Development/Preview)
blackroad.io:
  "@": blackroad-os-web.pages.dev
  www: "@"
  api: blackroad-os-api.pages.dev
  brand: blackroad-os-brand.pages.dev
  chat: nextjs-ai-chatbot.pages.dev
  console: blackroad-os-prism-console.pages.dev
  core: blackroad-os-core.pages.dev
  demo: blackroad-os-demo.pages.dev
  docs: blackroad-os-docs.pages.dev
  ideas: blackroad-os-ideas.pages.dev
  infra: blackroad-os-infra.pages.dev
  operator: blackroad-os-operator.pages.dev
  prism: blackroad-os-prism-console.pages.dev
  research: blackroad-os-research.pages.dev
  studio: lucidia.studio.pages.dev
  web: blackroad-os-web.pages.dev
```

---

## Monitoring & Validation

After implementing corrections, validate with:

```bash
# Test apex records
dig +short blackroad.io
dig +short blackroad.systems

# Test CNAME resolution
for sub in api web operator core docs; do
  echo "=== $sub ==="
  dig +short $sub.blackroad.io CNAME
  dig +short $sub.blackroad.systems CNAME
done

# HTTP health checks
curl -sI https://blackroad.systems | head -3
curl -sI https://blackroad.io | head -3
```

---

*Generated by BlackRoad OS Multi-Zone Authority Sweep*
*Last Updated: 2025-11-25*
