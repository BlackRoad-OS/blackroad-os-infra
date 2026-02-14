# Cloudflare DNS Blueprint

> **System Role:** Cadillac-Infra-Core 💚  
> **Mission:** Unified DNS mapping for all BlackRoad domains managed via Cloudflare.

## Overview

This blueprint defines the DNS record structure for all 16 BlackRoad domains. The primary hub is `blackroad.systems`, with consistent subdomain patterns across all domains.

---

## Domain Inventory

```yaml
domains:
  - aliceqi.com
  - blackroadai.com
  - blackroadinc.us
  - blackroad.io
  - blackroad.me
  - blackroad.network
  - blackroadqi.com
  - blackroadquantum.com
  - blackroadquantum.info
  - blackroadquantum.net
  - blackroadquantum.shop
  - blackroadquantum.store
  - blackroad.systems      # Primary Hub
  - lucidia.earth
  - lucidiaqi.com
  - lucidia.studio
```

---

## DNS Record Pattern

For each domain, the following subdomain structure is applied:

| Record         | Type   | Target                        | Proxied | Purpose                        |
|----------------|--------|-------------------------------|---------|--------------------------------|
| `@` (apex)     | CNAME  | cloudflare-pages / api-gateway| Yes     | Root domain landing            |
| `www`          | CNAME  | pages                         | Yes     | Primary web redirect           |
| `api`          | CNAME  | blackroad-os-api              | Yes     | API gateway endpoint           |
| `operator`     | CNAME  | blackroad-os-operator         | Yes     | Operator dashboard             |
| `prism`        | CNAME  | blackroad-os-prism-console    | Yes     | Prism console interface        |
| `docs`         | CNAME  | blackroad-os-docs             | Yes     | Documentation portal           |
| `static`       | CNAME  | assets CDN                    | Yes     | Static assets CDN              |
| `*.dev`        | CNAME  | dev/staging environments      | No      | Development environments       |

---

## Primary Hub: blackroad.systems

The `blackroad.systems` domain serves as the canonical hub for all BlackRoad OS services.

### Production Records

| Subdomain                  | Target Service                          | Notes                          |
|----------------------------|-----------------------------------------|--------------------------------|
| `blackroad.systems`        | `blackroad-os-web.prod.railway.app`     | Main web application           |
| `www.blackroad.systems`    | `blackroad-os-web.prod.railway.app`     | WWW redirect                   |
| `api.blackroad.systems`    | `blackroad-os-api.prod.railway.app`     | REST/GraphQL API               |
| `operator.blackroad.systems` | `blackroad-os-operator.prod.railway.app` | Admin/Operator console       |
| `prism.blackroad.systems`  | `blackroad-os-prism-console.prod.railway.app` | Prism visualization     |
| `docs.blackroad.systems`   | `blackroad-os-docs.prod.railway.app`    | Documentation                  |
| `static.blackroad.systems` | Cloudflare R2 / CDN                     | Static asset delivery          |

### Staging Records

| Subdomain                          | Target Service                            |
|------------------------------------|-------------------------------------------|
| `staging.blackroad.systems`        | `blackroad-os-web.staging.railway.app`    |
| `api.staging.blackroad.systems`    | `blackroad-os-api.staging.railway.app`    |
| `operator.staging.blackroad.systems` | `blackroad-os-operator.staging.railway.app` |
| `prism.staging.blackroad.systems`  | `blackroad-os-prism-console.staging.railway.app` |

### Development Records

| Subdomain                      | Target Service                        |
|--------------------------------|---------------------------------------|
| `dev.blackroad.systems`        | `blackroad-os-web.dev.railway.app`    |
| `api.dev.blackroad.systems`    | `blackroad-os-api.dev.railway.app`    |

---

## Brand Domain Mappings

### aliceqi.com
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |
| `api`    | `blackroad-os-api.prod.railway.app` |

### blackroadai.com
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |
| `api`    | `blackroad-os-api.prod.railway.app` |

### blackroad.io
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |
| `api`    | `blackroad-os-api.prod.railway.app` |

### blackroad.me
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |

### blackroad.network
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |
| `api`    | `blackroad-os-api.prod.railway.app` |

### blackroadqi.com
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |

### blackroadquantum.com
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |
| `api`    | `blackroad-os-api.prod.railway.app` |

### blackroadquantum.info
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-docs.prod.railway.app`|
| `www`    | `blackroad-os-docs.prod.railway.app`|

### blackroadquantum.net
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |

### blackroadquantum.shop
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | Commerce landing (future)           |
| `www`    | Commerce landing (future)           |

### blackroadquantum.store
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | Commerce landing (future)           |
| `www`    | Commerce landing (future)           |

### blackroadinc.us
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | Corporate landing (future)          |
| `www`    | Corporate landing (future)          |

### lucidia.earth
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |
| `api`    | `blackroad-os-api.prod.railway.app` |

### lucidiaqi.com
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |

### lucidia.studio
| Record   | Target                              |
|----------|-------------------------------------|
| `@`      | `blackroad-os-web.prod.railway.app` |
| `www`    | `blackroad-os-web.prod.railway.app` |

---

## Cloudflare Settings (All Domains)

| Setting              | Value                                  |
|----------------------|----------------------------------------|
| SSL/TLS Mode         | Full (Strict)                          |
| Always Use HTTPS     | Enabled                                |
| Minimum TLS Version  | TLS 1.2                                |
| HTTP/3 (QUIC)        | Enabled                                |
| Brotli Compression   | Enabled                                |
| 0-RTT                | Enabled                                |
| WebSockets           | Enabled                                |

---

## Validation Checklist

- [ ] All 16 domains have apex (`@`) records
- [ ] All domains have `www` records
- [ ] `blackroad.systems` has all service subdomains (api, operator, prism, docs, static)
- [ ] Staging and dev environments configured for `blackroad.systems`
- [ ] SSL/TLS mode set to Full (Strict) on all domains
- [ ] All records proxied through Cloudflare (except dev wildcards)

---

## Terraform Integration

Reference the `dns-cloudflare` module in `/modules/dns-cloudflare` for automated DNS provisioning. See `/docs/dns-playbook.md` for operational procedures.

```hcl
module "dns_blackroad_systems" {
  source      = "../modules/dns-cloudflare"
  domain_root = "blackroad.systems"
  origin      = "blackroad-os-web.prod.railway.app"
}
```

---

_Last Updated: Auto-generated by Cadillac-Infra-Core_
