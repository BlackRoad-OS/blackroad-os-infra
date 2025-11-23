# Environment Overview

| Environment | Purpose | DNS Pattern | Notes |
| ----------- | ---------------- | ------------------------- | ---------------------------------------- |
| dev | Experimentation | `*.dev.blackroad.systems` | Ephemeral, unstable allowed. |
| staging | Pre-prod testing | `*.stg.blackroad.systems` | Must mirror prod as closely as possible. |
| prod | Live traffic | `*.blackroad.systems` | Strict change control. |

## Usage

- **dev:** Fast iteration, feature flags, and prototypes. Defaults are provided for quick spins.
- **staging:** Dress rehearsal for production; validate migrations and DNS before promoting.
- **prod:** Customer-facing; changes require approvals and runbook checklists.

## Terraform Layout

Environment state lives under `envs/<env>`. Each directory wires shared modules (networking, dns, monitoring, secrets) with environment-specific variables.
