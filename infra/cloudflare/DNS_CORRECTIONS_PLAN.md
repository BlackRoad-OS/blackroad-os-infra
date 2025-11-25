# DNS Corrections Plan

> Action plan for reconciling `blackroad.io` DNS records
> Last updated: 2025-11-25

This document outlines the specific changes required to correct and optimize the DNS configuration.

---

## 1. Records to Delete

These records are duplicates and should be removed:

| Record | Type | Current Target | Reason |
|--------|------|----------------|--------|
| `prism` | CNAME | blackroad-os-prism-console.pages.dev | Duplicate of `console` |
| `dashboard` | CNAME | blackroad-os-operator.pages.dev | Duplicate of `operator` |

### Rationale

- **prism vs console**: The canonical name for the Prism Console should be `console`. Remove `prism` to eliminate confusion.
- **dashboard vs operator**: The canonical name for the Operator Dashboard should be `operator`. Remove `dashboard` to maintain consistency.

---

## 2. Records to Replace

These records point to legacy infrastructure and need updating:

| Record | Type | Current Value | New Value | Reason |
|--------|------|---------------|-----------|--------|
| `@` | A | 174.138.44.45 | blackroad-os-web.pages.dev | Migrate from legacy DigitalOcean droplet |
| `www` | CNAME | 174.138.44.45 | @ (alias) | Redirect www to apex |

### Migration Notes

- The A record at `174.138.44.45` points to a legacy DigitalOcean droplet
- Cloudflare Pages supports apex domains via CNAME flattening
- Ensure the `blackroad-os-web` Pages deployment is stable before migration

---

## 3. Records to Add

These new subdomains should be created:

| Record | Type | Target | Purpose |
|--------|------|--------|---------|
| `login` | CNAME | `<placeholder>` | Authentication landing page |
| `auth` | CNAME | `<placeholder>` | Auth service endpoint (OAuth/OIDC) |
| `assets` | CNAME | `<placeholder>` | Static assets CDN |
| `gateway` | CNAME | `<placeholder>` | API gateway endpoint |
| `monitoring` | CNAME | `<placeholder>` | Monitoring dashboard (Grafana/etc) |
| `status` | CNAME | `<placeholder>` | Public status page |

### Placeholder Resolution

Before creating these records, determine the target for each:

- **login/auth**: May point to Clerk, Auth0, or custom auth service
- **assets**: May point to R2, S3, or CDN origin
- **gateway**: May point to Railway or dedicated gateway service
- **monitoring**: May point to Grafana Cloud or self-hosted
- **status**: May point to Statuspage, Instatus, or custom

---

## 4. Execution Order

Follow this sequence to minimize downtime:

### Phase 1: Cleanup (Low Risk)

1. ❏ Delete `prism` CNAME
2. ❏ Delete `dashboard` CNAME
3. ❏ Verify `console` and `operator` still resolve correctly

### Phase 2: Add New Records (Low Risk)

4. ❏ Add `login` CNAME (when target is ready)
5. ❏ Add `auth` CNAME (when target is ready)
6. ❏ Add `assets` CNAME (when target is ready)
7. ❏ Add `gateway` CNAME (when target is ready)
8. ❏ Add `monitoring` CNAME (when target is ready)
9. ❏ Add `status` CNAME (when target is ready)

### Phase 3: Migrate Apex (High Risk)

10. ❏ Ensure `blackroad-os-web.pages.dev` is production-ready
11. ❏ Update `www` to CNAME pointing to `@`
12. ❏ Update `@` A record to CNAME (via Cloudflare flattening)
13. ❏ Monitor for 24 hours
14. ❏ Decommission legacy droplet (174.138.44.45)

---

## 5. Rollback Plan

If issues occur during Phase 3:

1. Revert `@` to A record pointing to 174.138.44.45
2. Revert `www` to A record pointing to 174.138.44.45
3. Investigate Pages deployment issues
4. Retry after resolution

---

## 6. Verification Checklist

After each change, verify:

- [ ] DNS propagation via `dig <record>.blackroad.io`
- [ ] HTTPS certificate is valid
- [ ] Page loads correctly
- [ ] No mixed content warnings
- [ ] Health checks pass (if applicable)

---

## References

- [DNS Reconciliation Report](./DNS_RECONCILIATION.md)
- [DNS Blueprint Final](./DNS_BLUEPRINT_FINAL.yaml)
- [Services Registry](/registry/services.yaml)
