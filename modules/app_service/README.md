# App Service Module

Declarative contract for services deployed to Railway. Captures domains, health checks, and environment variables without executing real deployments.

See [USAGE.md](./USAGE.md) for examples.

## Variables

- `service_name` (string): Logical service name.
- `env` (string): Environment name.
- `domain` (string): Domain where the service is exposed.
- `healthcheck_path` (string): Path used for liveness/health verification.
- `env_vars` (map(string)): Environment variables to propagate.
- `railway_project_id` (string, optional): Railway project identifier.

## Outputs

- `service_contract`: The declarative description captured in state for automation.

## Future Work

- TODO(agent): Wire Railway CLI/API automation for create/update/destroy actions.
- TODO(agent): Attach monitoring hooks once observability tooling is chosen.
