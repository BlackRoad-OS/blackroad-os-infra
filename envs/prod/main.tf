// Environment-level Terraform configuration for the production environment.
// Anchors required providers and shared modules that will back customer-facing services.

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
  # TODO(agent): Harden networking configuration for production traffic.
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
  services = var.services
  # TODO(agent): Plug into production monitoring/alerting vendor.
}

module "secrets" {
  source            = "../../modules/secrets"
  env               = var.env
  secret_store_type = var.secret_store_type
  secrets           = var.secrets
}

# TODO(agent): Introduce module "app_service" once Railway service contract is finalized.
