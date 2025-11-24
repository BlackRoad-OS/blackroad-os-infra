variable "project_id" {
  description = "Railway project hosting the service."
  type        = string
}

variable "service_name" {
  description = "Name of the Railway service to manage."
  type        = string
}

variable "environment" {
  description = "Environment name (dev, prod, etc.)."
  type        = string
}

variable "image" {
  description = "Container image to deploy."
  type        = string
}

variable "port" {
  description = "Port exposed by the service container."
  type        = number
  default     = 8080
}

variable "auto_deploy" {
  description = "Whether to auto-deploy new images."
  type        = bool
  default     = false
}

variable "environment_overrides" {
  description = "Map of environment variables to set on the service."
  type        = map(any)
  default     = {}
}
