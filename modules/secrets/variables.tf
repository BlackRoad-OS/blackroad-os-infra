variable "env" {
  description = "Environment name"
  type        = string
}

variable "secret_store_type" {
  description = "Secret store backing this environment (vault|aws_ssm|gcp_sm|1password)"
  type        = string
}

variable "secrets" {
  description = "Map of logical secret names to descriptions"
  type        = map(string)
  default     = {}
}
