# Missing Bindings Tracker

This document tracks any missing domain bindings between Cloudflare Pages deployments and custom domains.

## Status

All bindings have been configured. This document is updated automatically when mismatches are detected.

## Missing Domains

```yaml
missing_domains:
  apps_without_custom_domain: []
  domains_without_app: []
```

## Binding Checklist

| Service          | Pages Binding | DNS CNAME | Cloudflare Pages Custom Domain |
|------------------|---------------|-----------|--------------------------------|
| prism            | ✓             | ✓         | ✓                              |
| operator         | ✓             | ✓         | ✓                              |
| core             | ✓             | ✓         | ✓                              |
| api              | ✓             | ✓         | ✓                              |
| infra            | ✓             | ✓         | ✓                              |
| docs             | ✓             | ✓         | ✓                              |
| brand            | ✓             | ✓         | ✓                              |
| research         | ✓             | ✓         | ✓                              |
| prism-console    | ✓             | ✓         | ✓                              |
| web              | ✓             | ✓         | ✓                              |

## Correction Templates

When mismatches are detected, use these templates for corrections:

### DNS Entry Template

Replace the placeholders as follows:
- `SERVICE_NAME`: The service key from services-map.yaml (e.g., `api`, `docs`, `prism_console`)
- `SUBDOMAIN`: The subdomain portion of the custom domain (e.g., `api`, `docs`, `console`)
- `SERVICE`: The service name matching the repository suffix (e.g., `api`, `docs`, `prism-console`)

```hcl
resource "cloudflare_record" "SERVICE_NAME" {
  zone_id = data.cloudflare_zone.blackroad_systems.id
  name    = "SUBDOMAIN"
  type    = "CNAME"
  value   = "blackroad-os-SERVICE.pages.dev"
  proxied = true
  comment = "Managed by blackroad-os-infra"
}
```

### Cloudflare Pages Custom Domain Binding

```bash
# Via Cloudflare Dashboard:
# 1. Navigate to Workers & Pages > blackroad-os-SERVICE
# 2. Settings > Custom Domains
# 3. Add custom domain: SUBDOMAIN.blackroad.systems

# Via Wrangler CLI:
wrangler pages project update blackroad-os-SERVICE \
  --domains SUBDOMAIN.blackroad.systems
```

### Railway Environment Link

```yaml
# In Railway project settings:
environment:
  PUBLIC_URL: https://SUBDOMAIN.blackroad.systems
  API_BASE_URL: https://api.blackroad.systems
```

### GitHub Workflow Environment Update

```yaml
# In .github/workflows/deploy.yml:
env:
  DEPLOY_URL: https://SUBDOMAIN.blackroad.systems
  CLOUDFLARE_PROJECT_NAME: blackroad-os-SERVICE
```

## Resolution Process

1. Identify missing binding from this document
2. Apply DNS entry using Terraform (modules/dns-cloudflare)
3. Configure Cloudflare Pages custom domain binding
4. Update Railway environment variables if needed
5. Update GitHub workflow configuration
6. Verify deployment and domain resolution
7. Update this document to mark as resolved
