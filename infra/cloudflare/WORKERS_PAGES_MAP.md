# Workers & Pages Connection Map

This document maps Cloudflare Workers & Pages deployments to their custom domains and source repositories.

## Deployments

| Service          | Source Repository           | Pages URL                             | Custom Domain                  |
|------------------|----------------------------|---------------------------------------|--------------------------------|
| prism            | blackroad-os-prism          | blackroad-os-prism.pages.dev          | prism.blackroad.systems        |
| operator         | blackroad-os-operator       | blackroad-os-operator.pages.dev       | operator.blackroad.systems     |
| core             | blackroad-os-core           | blackroad-os-core.pages.dev           | core.blackroad.systems         |
| api              | blackroad-os-api            | blackroad-os-api.pages.dev            | api.blackroad.systems          |
| infra            | blackroad-os-infra          | blackroad-os-infra.pages.dev          | infra.blackroad.systems        |
| docs             | blackroad-os-docs           | blackroad-os-docs.pages.dev           | docs.blackroad.systems         |
| brand            | blackroad-os-brand          | blackroad-os-brand.pages.dev          | brand.blackroad.systems        |
| research         | blackroad-os-research       | blackroad-os-research.pages.dev       | research.blackroad.systems     |
| prism-console    | blackroad-os-prism-console  | blackroad-os-prism-console.pages.dev  | console.blackroad.systems      |
| web              | blackroad-os-web            | blackroad-os-web.pages.dev            | blackroad.systems              |

## Services Map

```yaml
services:
  api:
    pages: blackroad-os-api.pages.dev
    custom: api.blackroad.systems
    repo: blackroad-os-api
  web:
    pages: blackroad-os-web.pages.dev
    custom: blackroad.systems
    repo: blackroad-os-web
  operator:
    pages: blackroad-os-operator.pages.dev
    custom: operator.blackroad.systems
    repo: blackroad-os-operator
  prism:
    pages: blackroad-os-prism.pages.dev
    custom: prism.blackroad.systems
    repo: blackroad-os-prism
  prism-console:
    pages: blackroad-os-prism-console.pages.dev
    custom: console.blackroad.systems
    repo: blackroad-os-prism-console
  docs:
    pages: blackroad-os-docs.pages.dev
    custom: docs.blackroad.systems
    repo: blackroad-os-docs
  brand:
    pages: blackroad-os-brand.pages.dev
    custom: brand.blackroad.systems
    repo: blackroad-os-brand
  research:
    pages: blackroad-os-research.pages.dev
    custom: research.blackroad.systems
    repo: blackroad-os-research
  infra:
    pages: blackroad-os-infra.pages.dev
    custom: infra.blackroad.systems
    repo: blackroad-os-infra
  core:
    pages: blackroad-os-core.pages.dev
    custom: core.blackroad.systems
    repo: blackroad-os-core
```

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
