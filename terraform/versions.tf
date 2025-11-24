terraform {
  required_version = "~> 1.8.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.30"
    }

    railway = {
      source  = "railwayapp/railway"
      version = "~> 1.8"
    }

    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }

    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
}
