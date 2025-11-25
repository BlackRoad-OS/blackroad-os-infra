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

# NOTE: This root main.tf is a reference example.
# Use terraform/environments/dev or terraform/environments/prod for actual deployments.
# Service definitions are in each environment's services.tf file.

# TODO(infra-next): Add VPC peering and shared networking fabric.
# TODO(infra-next): Manage managed Postgres with automated migrations.
# TODO(infra-next): Introduce secret rotation strategy with Vault/Cloudflare.
