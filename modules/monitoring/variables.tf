variable "env" {
  description = "Environment name"
  type        = string
}

variable "services" {
  description = "List of monitored services and their SLO targets"
  type = list(object({
    name             = string
    type             = string
    url              = string
    availability_slo = string
  }))
  default = []
}
