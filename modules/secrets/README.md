# Secrets Module

Defines how secrets should be organized per environment while we evaluate a concrete secret manager. Outputs are predictable paths/identifiers that an operator or agent can map to Vault, AWS SSM, GCP Secret Manager, 1Password, etc.

## Variables

- `env` (string): Environment name.
- `secret_store_type` (string): Target secret store (`vault`, `aws_ssm`, `gcp_sm`, `1password`).
- `secrets` (map(string)): Logical secrets and their descriptions.

## Outputs

- `secret_paths`: Map of logical secret names to expected paths (e.g., `/dev/railway_api_token`).

## Future Work

- TODO(agent): Bind to a real secret manager and provision secrets automatically.
- TODO(agent): Add rotation and auditing policies once a provider is chosen.
