variable "service_name" {
  description = "Logical name of the application service"
  type        = string
}

variable "env" {
  description = "Environment name"
  type        = string
}

variable "domain" {
  description = "Primary domain where the service is exposed"
  type        = string
}

variable "healthcheck_path" {
  description = "Path used to verify service health"
  type        = string
  default     = "/health"
}

variable "env_vars" {
  description = "Environment variables to set for the service"
  type        = map(string)
  default     = {}
}

variable "railway_project_id" {
  description = "Optional Railway project ID for tighter coupling"
  type        = string
  default     = ""
}
