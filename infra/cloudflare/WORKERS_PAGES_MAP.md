# Workers & Pages Connection Map

This document maps Cloudflare Workers & Pages deployments to their custom domains and source repositories.

> **Source of Truth**: For the authoritative service definitions, see [`/registry/services-map.yaml`](/registry/services-map.yaml).

## Deployments

| Service          | Source Repository           | Pages URL                             | Custom Domain                  |
|------------------|----------------------------|---------------------------------------|--------------------------------|
| api              | blackroad-os-api            | blackroad-os-api.pages.dev            | api.blackroad.systems          |
| web              | blackroad-os-web            | blackroad-os-web.pages.dev            | blackroad.systems              |
| operator         | blackroad-os-operator       | blackroad-os-operator.pages.dev       | operator.blackroad.systems     |
| prism            | blackroad-os-prism          | blackroad-os-prism.pages.dev          | prism.blackroad.systems        |
| prism-console    | blackroad-os-prism-console  | blackroad-os-prism-console.pages.dev  | console.blackroad.systems      |
| docs             | blackroad-os-docs           | blackroad-os-docs.pages.dev           | docs.blackroad.systems         |
| brand            | blackroad-os-brand          | blackroad-os-brand.pages.dev          | brand.blackroad.systems        |
| research         | blackroad-os-research       | blackroad-os-research.pages.dev       | research.blackroad.systems     |
| infra            | blackroad-os-infra          | blackroad-os-infra.pages.dev          | infra.blackroad.systems        |
| core             | blackroad-os-core           | blackroad-os-core.pages.dev           | core.blackroad.systems         |

## DNS Configuration

All custom domains require CNAME records pointing to the corresponding `.pages.dev` URL:

| Subdomain      | CNAME Target                         |
|----------------|--------------------------------------|
| @              | blackroad-os-web.pages.dev           |
| api            | blackroad-os-api.pages.dev           |
| operator       | blackroad-os-operator.pages.dev      |
| prism          | blackroad-os-prism.pages.dev         |
| console        | blackroad-os-prism-console.pages.dev |
| docs           | blackroad-os-docs.pages.dev          |
| brand          | blackroad-os-brand.pages.dev         |
| research       | blackroad-os-research.pages.dev      |
| infra          | blackroad-os-infra.pages.dev         |
| core           | blackroad-os-core.pages.dev          |

## Notes

- All Pages deployments are proxied through Cloudflare for security and caching.
- Custom domain bindings must be configured in both Cloudflare DNS and Pages settings.
- The `web` service maps to the root domain (`blackroad.systems`).
- The `prism-console` service maps to `console.blackroad.systems`.
