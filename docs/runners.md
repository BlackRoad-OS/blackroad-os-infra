# GitHub Runners

Self-hosted runners for the BlackRoad org are managed via Terraform. The scaffold reserves space for future runner pools and secrets management.

## Plan

- Provider: `integrations/github` scoped to `var.gh_org`.
- Authentication: `GITHUB_TOKEN` with `repo` and `admin:org` as needed.
- Runner groups and labels to be defined in a future module.

## Usage

- CI `apply.yml` applies Terraform on merges to `main` or via manual dispatch.
- Extend `terraform/main.tf` with runner resources once hardware/VM targets are ready.
- Keep secret material out of the repo; inject through GitHub Encrypted Secrets or environment variables.
