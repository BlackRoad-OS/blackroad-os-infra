# =============================================================================
# BlackRoad OS - Railway Service Module
# =============================================================================
# Creates a Railway service with standard configuration
#
# Usage:
#   module "api" {
#     source       = "../modules/railway-service"
#     name         = "blackroad-os-api"
#     project_id   = var.railway_project_id
#     repo         = "BlackRoad-OS/blackroad-os-api"
#     port         = 8080
#     environment  = "production"
#   }
# =============================================================================

terraform {
  required_providers {
    railway = {
      source  = "terraform-community-providers/railway"
      version = "~> 0.2"
    }
  }
}

# -----------------------------------------------------------------------------
# Variables
# -----------------------------------------------------------------------------

variable "name" {
  description = "Service name"
  type        = string
}

variable "project_id" {
  description = "Railway project ID"
  type        = string
}

variable "repo" {
  description = "GitHub repository (org/repo format)"
  type        = string
}

variable "branch" {
  description = "Git branch to deploy"
  type        = string
  default     = "main"
}

variable "port" {
  description = "Service port"
  type        = number
  default     = 8080
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "healthcheck_path" {
  description = "Health check endpoint path"
  type        = string
  default     = "/health"
}

variable "custom_domain" {
  description = "Custom domain for the service"
  type        = string
  default     = null
}

variable "env_vars" {
  description = "Environment variables"
  type        = map(string)
  default     = {}
}

variable "replicas" {
  description = "Number of replicas"
  type        = number
  default     = 1
}

# -----------------------------------------------------------------------------
# Railway Service
# -----------------------------------------------------------------------------

resource "railway_service" "this" {
  name       = var.name
  project_id = var.project_id
}

resource "railway_service_instance" "this" {
  service_id     = railway_service.this.id
  environment_id = railway_environment.this.id

  source_repo   = var.repo
  source_branch = var.branch

  num_replicas = var.replicas

  healthcheck_path    = var.healthcheck_path
  healthcheck_timeout = 30
}

resource "railway_environment" "this" {
  name       = var.environment
  project_id = var.project_id
}

# -----------------------------------------------------------------------------
# Environment Variables
# -----------------------------------------------------------------------------

resource "railway_variable" "port" {
  environment_id = railway_environment.this.id
  service_id     = railway_service.this.id
  name           = "PORT"
  value          = tostring(var.port)
}

resource "railway_variable" "node_env" {
  environment_id = railway_environment.this.id
  service_id     = railway_service.this.id
  name           = "NODE_ENV"
  value          = var.environment
}

resource "railway_variable" "host" {
  environment_id = railway_environment.this.id
  service_id     = railway_service.this.id
  name           = "HOST"
  value          = "0.0.0.0"
}

resource "railway_variable" "custom" {
  for_each = var.env_vars

  environment_id = railway_environment.this.id
  service_id     = railway_service.this.id
  name           = each.key
  value          = each.value
}

# -----------------------------------------------------------------------------
# Custom Domain (if provided)
# -----------------------------------------------------------------------------

resource "railway_custom_domain" "this" {
  count = var.custom_domain != null ? 1 : 0

  service_id     = railway_service.this.id
  environment_id = railway_environment.this.id
  domain         = var.custom_domain
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------

output "service_id" {
  description = "Railway service ID"
  value       = railway_service.this.id
}

output "service_name" {
  description = "Railway service name"
  value       = railway_service.this.name
}

output "environment_id" {
  description = "Railway environment ID"
  value       = railway_environment.this.id
}

output "railway_domain" {
  description = "Railway-generated domain"
  value       = railway_service_instance.this.domain
}
