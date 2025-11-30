# BlackRoad OS Developer Onboarding Guide

Welcome to BlackRoad OS! This guide will help you get set up and productive quickly.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Repository Structure](#repository-structure)
5. [Development Workflow](#development-workflow)
6. [Deployment](#deployment)
7. [Architecture](#architecture)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)
10. [Resources](#resources)

---

## Overview

**BlackRoad OS** is a distributed AI operating system built for autonomous operations. It consists of:

- **24 microservices** deployed on Railway
- **20 subdomains** across `blackroad.io` and `blackroad.systems`
- **15 GitHub organizations** under the Blackbox-Enterprises umbrella
- **6 OS Packs** for specialized functionality

### Key Domains

| Domain | Purpose |
|--------|---------|
| `blackroad.io` | Public-facing services |
| `blackroad.systems` | Internal infrastructure |
| `lucidia.earth` | AI consciousness platform |
| `blackroadquantum.com` | Quantum computing research |

---

## Prerequisites

Before you begin, ensure you have:

### Required Tools

```bash
# Node.js 20+
node --version  # Should be >= 20.0.0

# pnpm (package manager)
npm install -g pnpm

# GitHub CLI
brew install gh  # or your package manager
gh auth login

# Railway CLI
npm install -g @railway/cli
railway login

# Cloudflare Wrangler (for Workers)
npm install -g wrangler
wrangler login

# Terraform (for IaC)
brew install terraform
```

### Accounts & Access

- [ ] GitHub account added to `BlackRoad-OS` organization
- [ ] Railway account with project access
- [ ] Cloudflare account (for DNS/Workers)
- [ ] Slack/Discord access for team communication

---

## Getting Started

### 1. Clone the Infrastructure Repo

```bash
cd ~/
git clone https://github.com/BlackRoad-OS/blackroad-os-infra.git
cd blackroad-os-infra
```

### 2. Clone All Service Repos

Use the bootstrap script to clone all repos:

```bash
./scripts/bootstrap-all.sh --dry-run  # Preview
./scripts/bootstrap-all.sh            # Execute
```

Or clone individually:

```bash
# Core services
gh repo clone BlackRoad-OS/blackroad-os-core ~/blackroad-os-core
gh repo clone BlackRoad-OS/blackroad-os-api ~/blackroad-os-api
gh repo clone BlackRoad-OS/blackroad-os-web ~/blackroad-os-web

# See full list in scripts/bootstrap-all.sh
```

### 3. Set Up Environment Variables

```bash
# Copy example env file
cp .env.example .env.local

# Edit with your credentials
# NEVER commit .env.local!
```

Required environment variables:

```bash
RAILWAY_TOKEN=your-railway-token
CLOUDFLARE_API_TOKEN=your-cloudflare-token
GITHUB_TOKEN=your-github-token
```

### 4. Verify Setup

```bash
# Check auth status
gh auth status
railway whoami

# Run health check
./scripts/deploy/health-check.sh
```

---

## Repository Structure

### Main Repos

```
~/
├── blackroad-os-infra/     # Infrastructure as Code (YOU ARE HERE)
│   ├── .github/workflows/  # GitHub Actions
│   ├── cloudflare/         # Cloudflare configs & Workers
│   ├── cli/                # BlackRoad CLI tool
│   ├── agents/             # Agent orchestration
│   ├── monitoring/         # Dashboards & alerts
│   ├── scripts/            # Automation scripts
│   └── terraform/          # Terraform modules
│
├── blackroad-os-core/      # Core business logic
├── blackroad-os-api/       # Public API
├── blackroad-os-api-gateway/  # API Gateway
├── blackroad-os-web/       # Main web application
├── blackroad-os-docs/      # Documentation site
└── blackroad-os-*/         # Other services...
```

### Service Categories

| Category | Repos | Purpose |
|----------|-------|---------|
| **Core** | core, api, api-gateway, operator | Business logic & APIs |
| **Frontend** | web, home, docs, prism-console, demo | User interfaces |
| **Agents** | agents, beacon, archive, research | AI/automation |
| **Packs** | pack-finance, pack-legal, etc. | Specialized modules |
| **Infra** | infra, master, ideas | Infrastructure & management |

---

## Development Workflow

### 1. Create a Branch

```bash
cd ~/blackroad-os-<service>
git checkout -b feature/your-feature-name
```

### 2. Make Changes

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Lint & format
pnpm lint
pnpm format
```

### 3. Commit & Push

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### 4. Create Pull Request

```bash
gh pr create --title "feat: add new feature" --body "Description of changes"
```

### 5. Merge & Deploy

After PR approval:
- Merge triggers GitHub Actions
- Automatically deploys to Railway
- Health check verifies deployment

---

## Deployment

### Automatic Deployment

All services are configured for automatic deployment:

1. Push to `main` branch
2. GitHub Actions runs CI/CD pipeline
3. Railway deploys the new version
4. Health check verifies success

### Manual Deployment

```bash
# Deploy specific service
cd ~/blackroad-os-<service>
railway up

# Deploy all services
cd ~/blackroad-os-infra
./scripts/deploy/deploy-all.sh

# Deploy in parallel
./scripts/deploy/deploy-all.sh --parallel
```

### Deploy via GitHub Actions

```bash
# Trigger matrix deployment
gh workflow run deploy-matrix.yml -f services=all -f parallel=true
```

---

## Architecture

### System Diagram

```
                    ┌─────────────────┐
                    │   Cloudflare    │
                    │   (DNS/Edge)    │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
           ▼                 ▼                 ▼
    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
    │ blackroad   │   │ blackroad   │   │   Other     │
    │    .io      │   │  .systems   │   │  Domains    │
    └─────────────┘   └─────────────┘   └─────────────┘
           │                 │                 │
           └─────────────────┼─────────────────┘
                             │
                    ┌────────┴────────┐
                    │     Railway     │
                    │   (Containers)  │
                    └────────┬────────┘
                             │
    ┌────────────────────────┼────────────────────────┐
    │           │            │            │           │
    ▼           ▼            ▼            ▼           ▼
┌───────┐  ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐
│  API  │  │ Core  │   │  Web  │   │Beacon │   │Agents │
└───────┘  └───────┘   └───────┘   └───────┘   └───────┘
```

### Service Communication

- **External**: HTTPS via Cloudflare tunnel
- **Internal**: Direct Railway networking
- **Events**: WebSocket for real-time
- **Agents**: gRPC for agent communication

---

## Common Tasks

### Check Service Status

```bash
# Using CLI
blackroad status

# Using script
./scripts/deploy/health-check.sh

# Manual curl
curl https://api.blackroad.systems/health
```

### View Logs

```bash
# Railway logs
cd ~/blackroad-os-<service>
railway logs

# Or via Railway dashboard
open https://railway.app/project/BlackRoad-OS
```

### Add Environment Variable

```bash
# Via Railway CLI
railway variables set KEY=value

# Or edit in Railway dashboard
```

### Create New Service

1. Create repo from template:
   ```bash
   gh repo create BlackRoad-OS/blackroad-os-<name> --template BlackRoad-OS/template-service
   ```

2. Add infrastructure:
   ```bash
   # Copy configs from existing service
   cp ~/blackroad-os-api/railway.toml ~/blackroad-os-<name>/
   cp ~/blackroad-os-api/Dockerfile ~/blackroad-os-<name>/
   ```

3. Add DNS in Cloudflare

4. Deploy:
   ```bash
   cd ~/blackroad-os-<name>
   railway up
   ```

### Update DNS

```bash
# Route new subdomain to tunnel
cloudflared tunnel route dns blackroad-os <subdomain>.blackroad.systems
```

### Debug Failed Deployment

```bash
# Check Railway build logs
railway logs --build

# Check container logs
railway logs

# Verify health endpoint
curl -v https://<service>.blackroad.systems/health
```

---

## Troubleshooting

### Common Issues

#### "Service not found" in Railway

```bash
# Link repo to service
cd ~/blackroad-os-<service>
railway link
```

#### Build failures

```bash
# Check Dockerfile syntax
docker build -t test .

# Verify package.json scripts
npm run build
```

#### DNS not resolving

```bash
# Check Cloudflare DNS
dig <subdomain>.blackroad.systems

# Verify tunnel is running
railway logs -s cloudflared
```

#### Health check failing

1. Check service is running: `railway status`
2. Verify PORT env var is set: `railway variables`
3. Check health endpoint: `curl localhost:8080/health`

### Getting Help

- **Slack**: #blackroad-dev channel
- **GitHub Issues**: Open in relevant repo
- **Docs**: https://docs.blackroad.systems

---

## Resources

### Documentation

- [Architecture Diagram](./ARCHITECTURE.md)
- [GitHub Secrets Setup](./GITHUB_SECRETS_SETUP.md)
- [Railway Troubleshooting](./railway-troubleshooting.md)
- [DNS Playbook](./dns-playbook.md)

### External Links

- [Railway Documentation](https://docs.railway.app)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)
- [GitHub Actions](https://docs.github.com/en/actions)

### Quick Commands

```bash
# Status
blackroad status
blackroad health

# Deploy
blackroad deploy --all
blackroad deploy --service blackroad-os-api

# Open in browser
blackroad open blackroad-os-web

# List all services
blackroad services
```

---

## Next Steps

1. ✅ Complete this onboarding guide
2. ⬜ Set up your development environment
3. ⬜ Clone the repos you'll be working on
4. ⬜ Run a local development server
5. ⬜ Make your first contribution!

Welcome to the team! 🚀

---

**Questions?** Ask in #blackroad-dev or reach out to the infrastructure team.

**Last Updated**: 2024-11-29
**Maintained By**: BlackRoad OS Infrastructure Team
