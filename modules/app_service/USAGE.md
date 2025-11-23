# App Service Module Usage

This module defines the *shape* of a Railway-backed application service without performing real automation yet. State captures the intended domain, healthcheck, and environment variables so a future Railway agent can act on it.

## Example

```hcl
module "api_service" {
  source            = "../../modules/app_service"
  service_name      = "blackroad-os-api"
  env               = var.env
  domain            = "api.${var.base_domain}"
  healthcheck_path  = "/health"
  env_vars          = { "NODE_ENV" = var.env }
  railway_project_id = "project_xxx" # optional
}
```

## Notes

- Provisioners only `echo` the intended commands—no destructive actions occur yet.
- TODO(agent): Replace echo commands with Railway CLI/API automation once the contract stabilizes.
- TODO(agent): Add update hooks to react to configuration drift.
