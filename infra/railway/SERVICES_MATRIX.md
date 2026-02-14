# Railway Services Deployment Matrix

> **System Role:** Cadillac-Infra-Core 💚  
> **Mission:** Define the complete Railway deployment topology for BlackRoad OS services.

## Overview

This matrix defines all BlackRoad OS microservices, their deployment environments, and associated domains. All services deploy to Railway with automatic environment isolation.

---

## Services Matrix

```yaml
services:
  api:
    name: blackroad-os-api
    repo: blackroad-os-api
    description: Core REST/GraphQL API gateway
    envs:
      - prod
      - staging
      - dev
    domains:
      prod: api.blackroad.systems
      staging: api.staging.blackroad.systems
      dev: api.dev.blackroad.systems
    port: 8080
    healthcheck: /health
    version_endpoint: /version

  operator:
    name: blackroad-os-operator
    repo: blackroad-os-operator
    description: Admin and operator management console
    envs:
      - prod
      - staging
    domains:
      prod: operator.blackroad.systems
      staging: operator.staging.blackroad.systems
    port: 3000
    healthcheck: /health
    version_endpoint: /api/version

  web:
    name: blackroad-os-web
    repo: blackroad-os-web
    description: Primary web application and landing
    envs:
      - prod
      - staging
      - dev
    domains:
      prod: blackroad.systems
      staging: staging.blackroad.systems
      dev: dev.blackroad.systems
    port: 3000
    healthcheck: /api/health
    version_endpoint: /api/version

  prism:
    name: blackroad-os-prism-console
    repo: blackroad-os-prism-console
    description: Prism visualization and analytics console
    envs:
      - prod
      - staging
    domains:
      prod: prism.blackroad.systems
      staging: prism.staging.blackroad.systems
    port: 3000
    healthcheck: /health
    version_endpoint: /api/version

  docs:
    name: blackroad-os-docs
    repo: blackroad-os-docs
    description: Documentation portal (Docsify/Docusaurus)
    envs:
      - prod
    domains:
      prod: docs.blackroad.systems
    port: 3000
    healthcheck: /
    version_endpoint: null

  archive:
    name: blackroad-os-archive
    repo: blackroad-os-archive
    description: Historical data and artifact storage
    envs:
      - prod
    domains:
      prod: archive.blackroad.systems
    port: 8080
    healthcheck: /health
    version_endpoint: /version
```

---

## Environment Configuration

### Production (prod)

| Setting                | Value                              |
|------------------------|-------------------------------------|
| Railway Environment    | `prod`                              |
| Auto Deploy            | `true` (on main branch merge)       |
| Min Instances          | 1                                   |
| Max Instances          | Auto-scale                          |
| Memory Limit           | Per service configuration           |
| Health Check Interval  | 30s                                 |

### Staging (staging)

| Setting                | Value                              |
|------------------------|-------------------------------------|
| Railway Environment    | `staging`                           |
| Auto Deploy            | `true` (on staging branch push)     |
| Min Instances          | 1                                   |
| Max Instances          | 2                                   |
| Memory Limit           | Per service configuration           |
| Health Check Interval  | 60s                                 |

### Development (dev)

| Setting                | Value                              |
|------------------------|-------------------------------------|
| Railway Environment    | `dev`                               |
| Auto Deploy            | `true` (on dev branch push)         |
| Min Instances          | 0 (scale to zero when idle)         |
| Max Instances          | 1                                   |
| Memory Limit           | Minimal                             |
| Health Check Interval  | 120s                                |

---

## Service Details

### blackroad-os-api

```yaml
service:
  name: blackroad-os-api
  image: ghcr.io/blackroad-os/blackroad-os-api:latest
  port: 8080
  environment_variables:
    PORT: 8080
    RAILWAY_ENVIRONMENT: "{{ env }}"
    NODE_ENV: "{{ env == 'prod' ? 'production' : env }}"
    DATABASE_URL: "[SECRET - stored in Railway]"
    REDIS_URL: "[SECRET - stored in Railway]"
    JWT_SECRET: "[SECRET - stored in Railway]"
  healthcheck:
    path: /health
    interval: 30s
    timeout: 10s
  resources:
    memory: 512Mi
    cpu: 0.5
```

### blackroad-os-operator

```yaml
service:
  name: blackroad-os-operator
  image: ghcr.io/blackroad-os/blackroad-os-operator:latest
  port: 3000
  environment_variables:
    PORT: 3000
    RAILWAY_ENVIRONMENT: "{{ env }}"
    NODE_ENV: "{{ env == 'prod' ? 'production' : env }}"
    API_URL: "https://api.blackroad.systems"
    AUTH_SECRET: "[SECRET - stored in Railway]"
  healthcheck:
    path: /health
    interval: 30s
    timeout: 10s
  resources:
    memory: 256Mi
    cpu: 0.25
```

### blackroad-os-web

```yaml
service:
  name: blackroad-os-web
  image: ghcr.io/blackroad-os/blackroad-os-web:latest
  port: 3000
  environment_variables:
    PORT: 3000
    RAILWAY_ENVIRONMENT: "{{ env }}"
    NODE_ENV: "{{ env == 'prod' ? 'production' : env }}"
    NEXT_PUBLIC_API_URL: "https://api.blackroad.systems"
  healthcheck:
    path: /api/health
    interval: 30s
    timeout: 10s
  resources:
    memory: 512Mi
    cpu: 0.5
```

### blackroad-os-prism-console

```yaml
service:
  name: blackroad-os-prism-console
  image: ghcr.io/blackroad-os/blackroad-os-prism-console:latest
  port: 3000
  environment_variables:
    PORT: 3000
    RAILWAY_ENVIRONMENT: "{{ env }}"
    NODE_ENV: "{{ env == 'prod' ? 'production' : env }}"
    API_URL: "https://api.blackroad.systems"
  healthcheck:
    path: /health
    interval: 30s
    timeout: 10s
  resources:
    memory: 512Mi
    cpu: 0.5
```

### blackroad-os-docs

```yaml
service:
  name: blackroad-os-docs
  image: ghcr.io/blackroad-os/blackroad-os-docs:latest
  port: 3000
  environment_variables:
    PORT: 3000
    RAILWAY_ENVIRONMENT: prod
    NODE_ENV: production
  healthcheck:
    path: /
    interval: 60s
    timeout: 10s
  resources:
    memory: 128Mi
    cpu: 0.1
```

### blackroad-os-archive

```yaml
service:
  name: blackroad-os-archive
  image: ghcr.io/blackroad-os/blackroad-os-archive:latest
  port: 8080
  environment_variables:
    PORT: 8080
    RAILWAY_ENVIRONMENT: prod
    NODE_ENV: production
    STORAGE_BUCKET: "[SECRET - stored in Railway]"
  healthcheck:
    path: /health
    interval: 60s
    timeout: 10s
  resources:
    memory: 256Mi
    cpu: 0.25
```

---

## Deployment Pipeline

### Automated Triggers

| Branch    | Environment | Auto Deploy |
|-----------|-------------|-------------|
| `main`    | prod        | ✅           |
| `staging` | staging     | ✅           |
| `dev`     | dev         | ✅           |

### Manual Deployments

Manual deployments can be triggered via:

1. Railway Dashboard
2. GitHub Actions workflow dispatch
3. Railway CLI: `railway up --environment <env>`

---

## Domain Routing

All production domains route through Cloudflare to Railway:

```
User Request → Cloudflare Edge → Railway Service → Response
```

SSL termination occurs at Cloudflare with Full (Strict) mode.

---

## Terraform Integration

Reference the `railway-service` module in `/modules/railway-service` for automated service provisioning. See `/docs/railway-playbook.md` for operational procedures.

```hcl
module "railway_api" {
  source       = "../modules/railway-service"
  project_id   = var.railway_project_id
  service_name = "blackroad-os-api"
  environment  = "prod"
  port         = 8080
  image        = "ghcr.io/blackroad-os/blackroad-os-api:latest"
  auto_deploy  = true
  environment_overrides = {
    RAILWAY_ENVIRONMENT = "prod"
    PORT                = 8080
  }
}
```

---

## Validation Checklist

- [ ] All services have health endpoints configured
- [ ] All services have version endpoints configured (except docs)
- [ ] All production services mapped to `blackroad.systems` subdomains
- [ ] Staging environments have corresponding DNS entries
- [ ] Environment variables use Railway secrets (no hardcoded values)
- [ ] Auto-deploy configured for appropriate branches
- [ ] Resource limits set for each service

---

_Last Updated: Auto-generated by Cadillac-Infra-Core_
