// Environment-level Terraform configuration for the dev environment.
// Defines providers and composes shared modules for networking, DNS, monitoring, and secrets.

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 4.0"
    }

    null = {
      source  = "hashicorp/null"
      version = ">= 3.2.1"
    }

    external = {
      source  = "hashicorp/external"
      version = ">= 2.3.1"
    }
  }
}

provider "cloudflare" {
  // TODO(agent): prefer CLOUDFLARE_API_TOKEN from environment once secret store is wired.
  email     = var.cloudflare_email
  api_token = var.cloudflare_api_token
}

provider "null" {}

provider "external" {}

module "networking" {
  source = "../../modules/networking"
  env    = var.env
  # TODO(agent): Populate networking variables once a cloud VPC/VNet pattern is selected.
}

module "dns" {
  source      = "../../modules/dns"
  env         = var.env
  zone_name   = var.zone_name
  base_domain = var.base_domain
  records     = var.records
}

module "monitoring" {
  source = "../../modules/monitoring"
  env    = var.env
  services = []
  # TODO(agent): add monitored services once app inventory is defined.
}

module "secrets" {
  source            = "../../modules/secrets"
  env               = var.env
  secret_store_type = "tbd"
  secrets           = var.secrets
  # TODO(agent): connect to a concrete secret manager.
}

# TODO(agent): Introduce module "app_service" once Railway service contract is finalized.
