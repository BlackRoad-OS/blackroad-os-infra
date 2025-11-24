terraform {
  backend "s3" {}
}

provider "cloudflare" {
  # Uses CLOUDFLARE_API_TOKEN from environment.
}

provider "railway" {
  # Uses RAILWAY_TOKEN from environment.
}

provider "github" {
  owner = var.gh_org
  # Uses GITHUB_TOKEN from environment.
}

provider "tls" {}
provider "null" {}

locals {
  environment = terraform.workspace != "default" ? terraform.workspace : "dev"
  origin_host = "infra.blackroad-os.net"
}

module "dns" {
  source      = "../modules/dns-cloudflare"
  domain_root = var.domain_root
  origin      = local.origin_host
}

module "railway_service" {
  source               = "../modules/railway-service"
  project_id           = var.railway_project_id
  service_name         = "blackroad-web"
  environment          = local.environment
  port                 = 8080
  image                = "ghcr.io/${var.gh_org}/blackroad-os-web:latest"
  auto_deploy          = true
  environment_overrides = {
    RAILWAY_ENVIRONMENT = local.environment
    PORT                = 8080
  }
}

# TODO(infra-next): Add VPC peering and shared networking fabric.
# TODO(infra-next): Manage managed Postgres with automated migrations.
# TODO(infra-next): Introduce secret rotation strategy with Vault/Cloudflare.
