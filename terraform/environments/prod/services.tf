# Railway service definitions for the dev environment.
# Each service corresponds to a BlackRoad OS application.
#
# IMPORTANT: Before deploying, ensure:
# 1. The railway_project_id in terraform.tfvars is valid
# 2. All required environment variables are set in Railway
# 3. The referenced container images exist in GHCR
# 4. Each repository has a valid Dockerfile

locals {
  # Common environment variables for all services
  common_env = {
    RAILWAY_ENVIRONMENT = local.environment
    NODE_ENV            = local.environment == "prod" ? "production" : "development"
    LOG_LEVEL           = local.environment == "prod" ? "info" : "debug"
  }

  # Service definitions for all BlackRoad OS services
  # Each service specifies: name, port, image, and any additional env vars
  services = {
    # API Gateway - Routes requests to backend services
    api-gateway = {
      name         = "blackroad-os-api-gateway"
      port         = 8080
      image_suffix = "blackroad-os-api-gateway"
      env = {
        UPSTREAM_API_URL = "[SECRET - stored in Railway]"
        RATE_LIMIT       = "1000"
      }
    }

    # Core API - Main backend service
    api = {
      name         = "blackroad-os-api"
      port         = 8081
      image_suffix = "blackroad-os-api"
      env = {
        DATABASE_URL = "[SECRET - stored in Railway]"
        REDIS_URL    = "[SECRET - stored in Railway]"
        JWT_SECRET   = "[SECRET - stored in Railway]"
      }
    }

    # Web frontend - Marketing and main website
    web = {
      name         = "blackroad-os-web"
      port         = 3000
      image_suffix = "blackroad-os-web"
      env = {
        NEXT_PUBLIC_API_URL = "[SECRET - stored in Railway]"
      }
    }

    # Prism Console - Admin dashboard
    prism-console = {
      name         = "blackroad-os-prism-console"
      port         = 3000
      image_suffix = "blackroad-os-prism-console"
      env = {
        NEXT_PUBLIC_API_URL = "[SECRET - stored in Railway]"
        ADMIN_SECRET        = "[SECRET - stored in Railway]"
      }
    }

    # Research service - AI/ML research platform
    research = {
      name         = "blackroad-os-research"
      port         = 8082
      image_suffix = "blackroad-os-research"
      env = {
        OPENAI_API_KEY = "[SECRET - stored in Railway]"
        MODEL_ENDPOINT = "[SECRET - stored in Railway]"
      }
    }

    # Ideas service - Idea management
    ideas = {
      name         = "blackroad-os-ideas"
      port         = 8083
      image_suffix = "blackroad-os-ideas"
      env = {
        DATABASE_URL = "[SECRET - stored in Railway]"
      }
    }

    # Operator service - System operations
    operator = {
      name         = "blackroad-os-operator"
      port         = 8084
      image_suffix = "blackroad-os-operator"
      env = {
        RAILWAY_TOKEN = "[SECRET - stored in Railway]"
        GITHUB_TOKEN  = "[SECRET - stored in Railway]"
      }
    }

    # Directus - Headless CMS
    directus = {
      name         = "directus"
      port         = 8055
      image_suffix = "directus"
      env = {
        DB_CLIENT     = "pg"
        DB_HOST       = "[SECRET - stored in Railway]"
        DB_PORT       = "5432"
        DB_DATABASE   = "[SECRET - stored in Railway]"
        DB_USER       = "[SECRET - stored in Railway]"
        DB_PASSWORD   = "[SECRET - stored in Railway]"
        KEY           = "[SECRET - stored in Railway]"
        SECRET        = "[SECRET - stored in Railway]"
        ADMIN_EMAIL   = "[SECRET - stored in Railway]"
        ADMIN_PASSWORD = "[SECRET - stored in Railway]"
      }
    }

    # LibreChat - Chat interface
    librechat = {
      name         = "librechat"
      port         = 3080
      image_suffix = "librechat"
      env = {
        OPENAI_API_KEY       = "[SECRET - stored in Railway]"
        MONGO_URI            = "[SECRET - stored in Railway]"
        CREDS_KEY            = "[SECRET - stored in Railway]"
        CREDS_IV             = "[SECRET - stored in Railway]"
        JWT_SECRET           = "[SECRET - stored in Railway]"
        JWT_REFRESH_SECRET   = "[SECRET - stored in Railway]"
      }
    }
  }
}

# Create Railway services for each defined service
# Note: These modules will fail if:
# - railway_project_id is invalid
# - RAILWAY_TOKEN is not set
# - The container image doesn't exist
module "railway_services" {
  for_each = local.services

  source       = "../../modules/railway-service"
  project_id   = var.railway_project_id
  service_name = each.value.name
  environment  = local.environment
  port         = each.value.port
  image        = "ghcr.io/${var.gh_org}/${each.value.image_suffix}:latest"
  auto_deploy  = var.auto_deploy_enabled

  environment_overrides = merge(
    local.common_env,
    { PORT = tostring(each.value.port) },
    each.value.env
  )
}
