# =============================================================================
# BlackRoad OS - Production Environment
# =============================================================================
# Terraform configuration for production infrastructure
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    railway = {
      source  = "terraform-community-providers/railway"
      version = "~> 0.2"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "blackroad-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

# -----------------------------------------------------------------------------
# Provider Configuration
# -----------------------------------------------------------------------------

provider "railway" {
  token = var.railway_token
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# -----------------------------------------------------------------------------
# Variables
# -----------------------------------------------------------------------------

variable "railway_token" {
  description = "Railway API token"
  type        = string
  sensitive   = true
}

variable "railway_project_id" {
  description = "Railway project ID"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id_io" {
  description = "Cloudflare zone ID for blackroad.io"
  type        = string
}

variable "cloudflare_zone_id_systems" {
  description = "Cloudflare zone ID for blackroad.systems"
  type        = string
}

variable "tunnel_cname" {
  description = "Cloudflare tunnel CNAME target"
  type        = string
  default     = "blackroad-os.cfargotunnel.com"
}

# -----------------------------------------------------------------------------
# Local Variables
# -----------------------------------------------------------------------------

locals {
  environment = "production"

  # Service definitions
  services = {
    # Core services
    "blackroad-os" = {
      repo   = "BlackRoad-OS/blackroad-os"
      port   = 8080
      domain = "os.blackroad.io"
      zone   = "io"
    }
    "blackroad-os-api" = {
      repo   = "BlackRoad-OS/blackroad-os-api"
      port   = 8080
      domain = "api.blackroad.io"
      zone   = "io"
    }
    "blackroad-os-api-gateway" = {
      repo   = "BlackRoad-OS/blackroad-os-api-gateway"
      port   = 8080
      domain = "api.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-core" = {
      repo   = "BlackRoad-OS/blackroad-os-core"
      port   = 8080
      domain = "core.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-web" = {
      repo   = "BlackRoad-OS/blackroad-os-web"
      port   = 3000
      domain = "app.blackroad.io"
      zone   = "io"
    }
    "blackroad-os-home" = {
      repo   = "BlackRoad-OS/blackroad-os-home"
      port   = 3000
      domain = "home.blackroad.io"
      zone   = "io"
    }
    "blackroad-os-docs" = {
      repo   = "BlackRoad-OS/blackroad-os-docs"
      port   = 3000
      domain = "docs.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-beacon" = {
      repo   = "BlackRoad-OS/blackroad-os-beacon"
      port   = 8080
      domain = "beacon.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-agents" = {
      repo   = "BlackRoad-OS/blackroad-os-agents"
      port   = 8080
      domain = "agents.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-operator" = {
      repo   = "BlackRoad-OS/blackroad-os-operator"
      port   = 8080
      domain = "operator.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-infra" = {
      repo   = "BlackRoad-OS/blackroad-os-infra"
      port   = 8080
      domain = "infra.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-master" = {
      repo   = "BlackRoad-OS/blackroad-os-master"
      port   = 8080
      domain = "console.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-prism-console" = {
      repo   = "BlackRoad-OS/blackroad-os-prism-console"
      port   = 3000
      domain = "prism.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-demo" = {
      repo   = "BlackRoad-OS/blackroad-os-demo"
      port   = 3000
      domain = "demo.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-archive" = {
      repo   = "BlackRoad-OS/blackroad-os-archive"
      port   = 8080
      domain = "archive.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-research" = {
      repo   = "BlackRoad-OS/blackroad-os-research"
      port   = 8080
      domain = "research.blackroad.systems"
      zone   = "systems"
    }

    # Packs
    "blackroad-os-pack-creator-studio" = {
      repo   = "BlackRoad-OS/blackroad-os-pack-creator-studio"
      port   = 3000
      domain = "creator.blackroad.io"
      zone   = "io"
    }
    "blackroad-os-pack-finance" = {
      repo   = "BlackRoad-OS/blackroad-os-pack-finance"
      port   = 8080
      domain = "finance.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-pack-legal" = {
      repo   = "BlackRoad-OS/blackroad-os-pack-legal"
      port   = 8080
      domain = "legal.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-pack-research-lab" = {
      repo   = "BlackRoad-OS/blackroad-os-pack-research-lab"
      port   = 8080
      domain = "lab.blackroad.systems"
      zone   = "systems"
    }
    "blackroad-os-pack-infra-devops" = {
      repo   = "BlackRoad-OS/blackroad-os-pack-infra-devops"
      port   = 8080
      domain = "devops.blackroad.systems"
      zone   = "systems"
    }
  }
}

# -----------------------------------------------------------------------------
# Railway Services
# -----------------------------------------------------------------------------

module "railway_services" {
  source   = "../../modules/railway-service"
  for_each = local.services

  name         = each.key
  project_id   = var.railway_project_id
  repo         = each.value.repo
  port         = each.value.port
  environment  = local.environment
  custom_domain = each.value.domain
}

# -----------------------------------------------------------------------------
# Cloudflare DNS Records
# -----------------------------------------------------------------------------

module "dns_io" {
  source   = "../../modules/cloudflare-dns"
  for_each = { for k, v in local.services : k => v if v.zone == "io" }

  zone_id   = var.cloudflare_zone_id_io
  subdomain = split(".", each.value.domain)[0]
  target    = var.tunnel_cname
}

module "dns_systems" {
  source   = "../../modules/cloudflare-dns"
  for_each = { for k, v in local.services : k => v if v.zone == "systems" }

  zone_id   = var.cloudflare_zone_id_systems
  subdomain = split(".", each.value.domain)[0]
  target    = var.tunnel_cname
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------

output "services" {
  description = "All deployed services"
  value = {
    for k, v in module.railway_services : k => {
      id     = v.service_id
      name   = v.service_name
      domain = local.services[k].domain
    }
  }
}

output "dns_records" {
  description = "All DNS records"
  value = merge(
    { for k, v in module.dns_io : k => v.hostname },
    { for k, v in module.dns_systems : k => v.hostname }
  )
}
