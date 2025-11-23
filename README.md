# blackroad-os-infra

Infrastructure-as-code and runbooks for BlackRoad OS: DNS, Cloudflare, Railway environments, deployment patterns, and architectural guidelines.

## Contents

- [**Lanes**](#lanes) — End-to-end feature patterns (UI → API → Core → DB)
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
