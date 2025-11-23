# Service Registry

This directory exposes a machine-readable snapshot of the BlackRoad OS service map. Use `services.json` for automation, CLI tooling, or quick lookups when syncing environment variables and DNS.

- Source of truth: [`infra/services.yml`](../infra/services.yml)
- Mirror: [`services.json`](./services.json)

Keep both files in sync when adding or updating services (ports, domains, health endpoints, dependencies).
