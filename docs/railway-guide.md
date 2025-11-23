# Railway Guide

Railway is the primary PaaS for BlackRoad OS services.

## Projects and Environments

- Organize services into Railway projects aligned with environments (`dev`, `staging`, `prod`).
- Each app should map to the [`app_service` module](../modules/app_service) contract once automation is ready.

## Working with Railway

- Login: `railway login` (TODO(agent): automate via service tokens)
- View logs: `railway logs -s <service>`
- Roll back: `railway up --service <service> --rollback` (placeholder)

## Mapping from Terraform

- Module inputs describe the desired service (domain, healthcheck, env vars).
- Null resources echo the intended Railway CLI commands so humans/agents can execute them safely.

## Future Automation

- TODO(agent): Implement a Railway agent that reads Terraform state and applies creates/updates/destroys via CLI or API.
- TODO(agent): Enforce healthcheck and rollback policies tied to runbooks.
