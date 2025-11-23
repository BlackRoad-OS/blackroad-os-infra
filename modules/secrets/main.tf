// Secrets module stub to describe how secrets should be organized per environment.
// TODO(agent): Integrate with a concrete secret manager and enforce rotation policies.

terraform {
  required_version = ">= 1.5.0"
}

locals {
  secret_paths = { for name, _ in var.secrets : name => "/${var.env}/${name}" }
}
