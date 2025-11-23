// Declarative contract for Railway-backed application services.
// Uses null_resource to capture intended state; future agents can translate this into real Railway CLI/API actions.

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    null = {
      source  = "hashicorp/null"
      version = ">= 3.2.1"
    }
  }
}

resource "null_resource" "railway_service_descriptor" {
  triggers = {
    service_name      = var.service_name
    env               = var.env
    domain            = var.domain
    healthcheck_path  = var.healthcheck_path
    env_vars_json     = jsonencode(var.env_vars)
    railway_project   = var.railway_project_id
  }

  provisioner "local-exec" {
    when    = create
    command = "echo 'TODO(agent): create/align Railway service ${var.service_name} in env ${var.env} at ${var.domain}'"
  }

  provisioner "local-exec" {
    when    = destroy
    command = "echo 'TODO(agent): remove Railway service ${var.service_name} from env ${var.env}'"
  }
}

# TODO(agent): Add an update path once Railway CLI/API automation is ready.
