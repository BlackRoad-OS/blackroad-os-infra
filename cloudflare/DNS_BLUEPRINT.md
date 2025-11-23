# Cloudflare DNS Blueprint

This document outlines how BlackRoad OS domains are intended to resolve across environments. It is meant to be human- and agent-readable so we can translate it into Terraform/Pulumi or manual Cloudflare changes without guessing.

## Domain overview

- **blackroad.systems** — primary root for the platform and landing experiences.
- **staging.blackroad.systems** / **dev.blackroad.systems** — staging and development roots used for preview environments.
- Service-specific subdomains map directly to their owning Railway services (or other runtimes in the future):
  - `api.blackroad.systems` → `blackroad-os-api`
  - `prism.blackroad.systems` → `blackroad-os-prism-console`
  - `operator.blackroad.systems` → `blackroad-os-operator` (internal/restricted)
  - `docs.blackroad.systems` → `blackroad-os-docs`
  - `home.blackroad.systems` → `blackroad-os-home`
  - `brand.blackroad.systems` → `blackroad-os-brand`
  - `ideas.blackroad.systems` → `blackroad-os-ideas`
  - `demo.blackroad.systems` → `blackroad-os-demo`
  - `research.blackroad.systems` → `blackroad-os-research`

Additional domains (e.g., `blackroad.io`, `lucidia.earth`) can be added as extensions, but `blackroad.systems` remains the canonical OS root.

## Production DNS Plan (blackroad.systems)

| Name        | Type  | Proxy  | Target                           | Notes                                  |
|-------------|-------|--------|----------------------------------|----------------------------------------|
| @           | A/CNAME | Proxied | <RAILWAY_IP_OR_CNAME_FOR_WEB>   | `blackroad-os-web` landing shell       |
| api         | CNAME | Proxied | <RAILWAY_CNAME_FOR_API>         | `blackroad-os-api`                     |
| prism       | CNAME | Proxied | <RAILWAY_CNAME_FOR_PRISM>       | `blackroad-os-prism-console`           |
| operator    | CNAME | Proxied | <RAILWAY_CNAME_FOR_OPERATOR>    | `blackroad-os-operator` (internal)     |
| docs        | CNAME | Proxied | <RAILWAY_CNAME_FOR_DOCS>        | `blackroad-os-docs`                    |
| home        | CNAME | Proxied | <RAILWAY_CNAME_FOR_HOME>        | `blackroad-os-home`                    |
| brand       | CNAME | Proxied | <RAILWAY_CNAME_FOR_BRAND>       | `blackroad-os-brand`                   |
| ideas       | CNAME | Proxied | <RAILWAY_CNAME_FOR_IDEAS>       | `blackroad-os-ideas`                   |
| demo        | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEMO>        | `blackroad-os-demo`                    |
| research    | CNAME | Proxied | <RAILWAY_CNAME_FOR_RESEARCH>    | `blackroad-os-research`                |

`<RAILWAY_*>` values come from Railway custom domains once services are attached. If we move to a different runtime, replace these targets with that platform’s DNS endpoints.

## Staging DNS Plan (staging.blackroad.systems)

> **Note:** The following table documents DNS records for the `staging.blackroad.systems` zone. In this context, `@` refers to the apex of `staging.blackroad.systems` (i.e., `staging.blackroad.systems` itself).
| Name        | Type  | Proxy  | Target                                   | Notes                                  |
|-------------|-------|--------|-------------------------------------------|----------------------------------------|
| @           | A/CNAME | Proxied | <RAILWAY_IP_OR_CNAME_FOR_STAGING_WEB>    | `blackroad-os-web` staging             |
| api         | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_API>          | `blackroad-os-api` staging             |
| prism       | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_PRISM>        | `blackroad-os-prism-console` staging   |
| operator    | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_OPERATOR>     | `blackroad-os-operator` staging        |
| docs        | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_DOCS>         | `blackroad-os-docs` staging            |
| home        | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_HOME>         | `blackroad-os-home` staging            |
| brand       | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_BRAND>        | `blackroad-os-brand` staging           |
| ideas       | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_IDEAS>        | `blackroad-os-ideas` staging           |
| demo        | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_DEMO>         | `blackroad-os-demo` staging            |
| research    | CNAME | Proxied | <RAILWAY_CNAME_FOR_STAGING_RESEARCH>     | `blackroad-os-research` staging        |

## Development DNS Plan (dev.blackroad.systems)

Development mirrors staging but can be lighter-weight or short-lived. Records can be wildcarded when spinning up preview branches, with the canonical subdomains configured as follows:

| Name        | Type  | Proxy  | Target                              | Notes                                  |
|-------------|-------|--------|--------------------------------------|----------------------------------------|
| @           | A/CNAME | Proxied | <RAILWAY_IP_OR_CNAME_FOR_DEV_WEB> | `blackroad-os-web` dev/root            |
| api         | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_API>        | `blackroad-os-api` dev                 |
| prism       | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_PRISM>      | `blackroad-os-prism-console` dev       |
| operator    | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_OPERATOR>   | `blackroad-os-operator` dev            |
| docs        | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_DOCS>       | `blackroad-os-docs` dev                |
| home        | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_HOME>       | `blackroad-os-home` dev                |
| brand       | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_BRAND>      | `blackroad-os-brand` dev               |
| ideas       | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_IDEAS>      | `blackroad-os-ideas` dev               |
| demo        | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_DEMO>       | `blackroad-os-demo` dev                |
| research    | CNAME | Proxied | <RAILWAY_CNAME_FOR_DEV_RESEARCH>   | `blackroad-os-research` dev            |

## Notes and next steps

- Use Cloudflare proxying to front services unless a service requires direct origin access; add firewall rules for internal-only services such as Operator.
- Once Terraform/Pulumi is introduced, this blueprint should be the source of truth for generating DNS records.
- Keep environment names consistent (`local`, `development`, `staging`, `production`) to align with Railway environments and the service registry.
