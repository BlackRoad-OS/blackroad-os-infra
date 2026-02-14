# Cloudflare DNS Blueprint

**Single source of truth for BlackRoad OS DNS configuration.**

This document describes how domains and subdomains should be configured in Cloudflare. It does not contain API tokens or credentials - those are managed separately through the Cloudflare dashboard or Terraform.

## Apex Domains

### Primary Domains
- `blackroad.io` - Main production domain
- `blackroad.systems` - Alternative/future domain
- `blackroad-os.net` - Infrastructure/internal domain

### Domain Settings
- **Proxy Status**: Orange cloud (proxied through Cloudflare)
- **TLS Mode**: Full (strict)
- **Always Use HTTPS**: Enabled
- **Automatic HTTPS Rewrites**: Enabled
- **Minimum TLS Version**: 1.2

## Core Service Subdomains

### Production (blackroad.io)

| Subdomain | Type | Target | Proxy | Service | Notes |
|-----------|------|--------|-------|---------|-------|
| @ (apex) | CNAME | blackroad-os-web-prod.railway.app | ✅ | web | Main website |
| api | CNAME | blackroad-os-api-prod.railway.app | ✅ | api | Public API |
| operator | CNAME | blackroad-os-operator-prod.railway.app | ✅ | operator | Background worker (admin only) |
| prism | CNAME | blackroad-os-prism-console-prod.railway.app | ✅ | prism-console | Admin console |
| console | CNAME | blackroad-os-prism-console-prod.railway.app | ✅ | prism-console | Admin console (alias) |
| status | CNAME | blackroad-os-web-prod.railway.app | ✅ | web | Status page route |
| www | CNAME | @ | ✅ | web | WWW redirect to apex |

### Staging (blackroad.io)

| Subdomain | Type | Target | Proxy | Service | Notes |
|-----------|------|--------|-------|---------|-------|
| staging | CNAME | blackroad-os-web-staging.railway.app | ✅ | web | Staging website |
| api.staging | CNAME | blackroad-os-api-staging.railway.app | ✅ | api | Staging API |
| operator.staging | CNAME | blackroad-os-operator-staging.railway.app | ✅ | operator | Staging operator |
| prism.staging | CNAME | blackroad-os-prism-console-staging.railway.app | ✅ | prism-console | Staging console |
| console.staging | CNAME | blackroad-os-prism-console-staging.railway.app | ✅ | prism-console | Staging console (alias) |

## Pack Subdomains

Packs use pattern: `{pack-name}.blackroad.io` for production, `{pack-name}.staging.blackroad.io` for staging.

### Production Packs

| Subdomain | Type | Target | Proxy | Pack | Notes |
|-----------|------|--------|-------|------|-------|
| education | CNAME | pack-education-prod.railway.app | ✅ | pack-education | Educational content |
| infra | CNAME | pack-infra-devops-prod.railway.app | ✅ | pack-infra-devops | Infra/DevOps tools |
| research | CNAME | pack-research-prod.railway.app | ✅ | pack-research | Research tools |
| analytics | CNAME | pack-analytics-prod.railway.app | ✅ | pack-analytics | Analytics dashboard |

### Staging Packs

Follow pattern: `{pack-name}.staging.blackroad.io` → `pack-{pack-name}-staging.railway.app`

## Additional Service Subdomains

### Documentation & Resources

| Subdomain | Type | Target | Proxy | Service | Notes |
|-----------|------|--------|-------|---------|-------|
| docs | CNAME | blackroad-os-docs-prod.vercel.app | ✅ | docs | Documentation site |
| docs.staging | CNAME | blackroad-os-docs-staging.vercel.app | ✅ | docs | Staging docs |
| brand | CNAME | blackroad-os-brand-prod.vercel.app | ✅ | brand | Brand guidelines |
| archive | CNAME | blackroad-os-archive-prod.railway.app | ✅ | archive | Historical data/records |

### Utility Subdomains

| Subdomain | Type | Target | Proxy | Purpose | Notes |
|-----------|------|--------|-------|---------|-------|
| cdn | CNAME | @ | ✅ | N/A | CDN assets (may point to R2/S3) |
| assets | CNAME | @ | ✅ | N/A | Static assets |
| blog | CNAME | TBD | ✅ | N/A | Future blog platform |

## DNS Security Settings

### DNSSEC
- **Status**: Enabled
- **Algorithm**: ECDSAP256SHA256

### CAA Records
```
@ CAA 0 issue "letsencrypt.org"
@ CAA 0 issuewild "letsencrypt.org"
@ CAA 0 iodef "mailto:security@blackroad.io"
```

## TLS/SSL Configuration

### Universal SSL
- **Status**: Active
- **Certificate Authority**: Let's Encrypt
- **Edge Certificates**: Enabled

### TLS Settings by Environment

**Production:**
- TLS Mode: Full (strict)
- Min TLS Version: 1.2
- TLS 1.3: Enabled
- Automatic HTTPS Rewrites: On

**Staging:**
- TLS Mode: Full (strict)
- Min TLS Version: 1.2
- TLS 1.3: Enabled

**Local:**
- N/A (HTTP only for dev)

## Cloudflare Features Enabled

### Security
- ✅ WAF (Web Application Firewall)
- ✅ DDoS Protection (automatic)
- ✅ Rate Limiting (configured per endpoint)
- ✅ Bot Management (Challenge Passage)
- ✅ Security Headers (HSTS, CSP, etc.)

### Performance
- ✅ Auto Minify (HTML, CSS, JS)
- ✅ Brotli Compression
- ✅ HTTP/2
- ✅ HTTP/3 (QUIC)
- ✅ Early Hints
- ✅ Rocket Loader (optional, test per service)

### Caching
- ✅ Browser Cache TTL: 4 hours (default)
- ✅ Edge Cache TTL: Respect origin headers
- ✅ Always Online: Enabled
- ✅ Development Mode: Available for testing

## Page Rules

### Production
1. `api.blackroad.io/*` - Security Level: High, Cache Level: Bypass
2. `prism.blackroad.io/*` - Security Level: High, Cache Level: Bypass
3. `*.blackroad.io/*.js` - Cache Level: Standard, Edge Cache TTL: 1 day
4. `*.blackroad.io/*.css` - Cache Level: Standard, Edge Cache TTL: 1 day
5. `blackroad.io/assets/*` - Cache Everything, Edge Cache TTL: 7 days

### Staging
1. `*.staging.blackroad.io/*` - Security Level: Medium, Cache Level: Bypass

## Monitoring & Alerts

### Health Checks (Cloudflare monitoring)
- `https://api.blackroad.io/health` - Every 5 minutes
- `https://blackroad.io/health` - Every 5 minutes
- `https://prism.blackroad.io/health` - Every 5 minutes

### Alerts
- Health check failures → Email/Slack
- High error rates (5xx) → Email/Slack
- DDoS attacks → Email

## DNS Propagation Notes

- TTL for most records: 300 seconds (5 minutes) for flexibility
- Production changes: Update staging first, verify, then update production
- Always verify DNS with `dig` or `nslookup` after changes
- Monitor origin server response times during DNS cutover

## Terraform Management

DNS records should be managed via Terraform when possible:
- See `/terraform/modules/dns-cloudflare/` for the module
- Environment-specific configs in `/terraform/environments/{env}/`
- Manual changes in Cloudflare dashboard should be synced to Terraform

## Change Control

### Adding New Services
1. Add entry to this blueprint document
2. Update Terraform configuration
3. Apply Terraform changes to staging
4. Verify staging DNS resolution
5. Apply to production
6. Monitor for 24 hours

### Modifying Existing Records
1. Update this blueprint
2. Test changes in staging first
3. Document rollback plan
4. Apply during low-traffic window
5. Monitor health checks

## Emergency Procedures

### Service Outage
1. Check origin server health
2. Temporarily redirect to static maintenance page via Cloudflare Workers
3. Investigate and fix origin
4. Remove maintenance page

### DNS Issues
1. Verify Cloudflare dashboard settings
2. Check Terraform state vs. actual configuration
3. Use Cloudflare API for emergency changes if needed
4. Sync changes back to Terraform afterward

## Contact & Access

- **Cloudflare Account**: Managed by infrastructure team
- **API Tokens**: Stored in Railway/GitHub secrets, never in this repo
- **Dashboard Access**: Limited to authorized personnel
- **Emergency Contact**: infrastructure@blackroad.io

---

**Last Updated**: 2025-11-24
**Maintained By**: BlackRoad OS Infrastructure Team
**Review Frequency**: Quarterly or after major changes
