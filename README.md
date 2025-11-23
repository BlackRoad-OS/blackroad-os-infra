# blackroad-os-infra

Infrastructure-as-code and runbooks for BlackRoad OS: DNS, Cloudflare, Railway environments, deployment patterns, and architectural guidelines.

## Contents

- [**Lanes**](#lanes) — End-to-end feature patterns (UI → API → Core → DB)
- [**Quick Start**](#quick-start) — Build all repos with execution prompts
- [**Runbooks**](#runbooks) — Operational guides for deployments, incidents, and development
- [**Environments**](#environments) — Railway environment configurations
- [**DNS**](#dns) — Cloudflare DNS setup and management

---

## Lanes

**Lanes** are vertical slices of functionality that span the entire BlackRoad OS stack from UI to database.

### Documentation

- 📘 [**How to Build a Lane**](./runbooks/how-to-build-a-lane.md) — Step-by-step guide for implementing new features
- 📋 [**Lane Template**](./docs/lanes/_lane-template.md) — Copy-paste template for new lanes
- ✅ [**Agent Registry v1**](./docs/lanes/agent-registry-v1.md) — Canonical example (first working lane)

### What is a Lane?

A lane provides:
- UI in Prism Console (forms, tables, views)
- API proxy in blackroad-os-api (public surface)
- Business logic in blackroad-os-core (CRUD operations)
- Database persistence in PostgreSQL (Prisma models)

**Example:** Agent Registry v1 allows admins to create and manage Agents through Prism Console, with full CRUD operations persisted in Postgres.

---

## Quick Start

### Build All Repos (Fastest Path to Production)

Complete, copy-paste ready prompts to build out all features at once:

#### 1. Core
```bash
cd ~/projects/blackroad-os-core
claude
# Paste: docs/execution-prompts/core-all-seasons.md
```

**Adds:**
- AgentRun model (trigger runs, history)
- Task model (CRUD operations)
- User model (JWT auth)
- Validation utils + error standardization
- In-memory metrics + request IDs
- Jest tests + GitHub Actions CI

#### 2. API
```bash
cd ~/projects/blackroad-os-api
claude
# Paste: docs/execution-prompts/api-all-seasons.md
```

**Adds:**
- Agent runs proxy
- Tasks proxy
- Auth proxy
- Request ID propagation
- Metrics proxy
- Proxy tests with nock + CI

#### 3. Console
```bash
cd ~/projects/blackroad-os-prism-console
claude
# Paste: docs/execution-prompts/console-all-seasons.md
```

**Adds:**
- Agent runs UI (trigger + history)
- Tasks UI (create, list, update, delete)
- Login/register pages
- Protected routes + auth context
- Status dashboard with metrics
- React Testing Library tests + CI

### Resources
- 📂 [**Execution Prompts**](./docs/execution-prompts/) — Complete prompts for all repos
- 📊 [**Season Tracker**](./docs/season-tracker.md) — Track backend progress across repos
- 📝 [**PR Templates**](./docs/pr-templates/) — Ready-to-use PR descriptions

---

### Build All Websites (Consistent Patterns)

Single prompt that works for ALL websites (Console, Web, Home, Brand, Docs):

```bash
cd ~/projects/blackroad-os-<website-name>
claude
# Paste: docs/execution-prompts/websites-all-features.md
```

**Adds to each website:**
- Health & metadata endpoints (`/health`, `/api/info`, `/api/version`)
- Standardized environment configuration
- Consistent navigation with service links
- Brand CSS variables integration
- System status widgets
- Complete documentation

📊 [**Website Tracker**](./docs/website-tracker.md) — Track website progress

---

## Runbooks

Operational guides for common tasks:

- 🚀 [**How to Build a Lane**](./runbooks/how-to-build-a-lane.md) — Build end-to-end features
- 📦 [**Deployments**](./runbooks/deployments.md) — Deployment procedures and Railway config
- 🔥 [**Incidents**](./runbooks/incidents.md) — Incident response and debugging

---

## Environments

Railway environment configurations and service topology:

- See [environments/](./environments/) for detailed setup

---

## DNS

Cloudflare DNS configuration and domain management:

- See [dns/](./dns/) for DNS records and setup
