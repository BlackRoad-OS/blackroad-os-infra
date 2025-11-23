variable "env" {
  description = "Environment name"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the environment VPC (placeholder until a provider is selected)"
  type        = string
  default     = ""
}

variable "region" {
  description = "Cloud region for networking resources"
  type        = string
  default     = ""
}
