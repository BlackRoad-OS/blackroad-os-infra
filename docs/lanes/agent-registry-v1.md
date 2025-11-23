# Agent Registry v1 — Lane Overview

**What it is:** A complete CRUD system for managing Agents in BlackRoad OS, demonstrating the first fully operational vertical slice from UI to database.

**Why it exists:** Agent Registry v1 serves as the canonical example of how to build a "Lane" in BlackRoad OS — a coherent feature that spans multiple services (Console → API → Core → Database) with clear separation of concerns.

**Repos touched:**
- `blackroad-os-core` — Data model and business logic
- `blackroad-os-api` — Public API proxy layer
- `blackroad-os-prism-console` — Admin UI

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Prism Console (Next.js App Router)                             │
│  Port: 3000                                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /agents page (UI)                                          │ │
│  │ - Create form (name + status)                              │ │
│  │ - Agent table (list view)                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓ fetch                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /api/agents (Next.js API Route)                            │ │
│  │ - GET  → proxy to AGENTS_API_URL/agents                    │ │
│  │ - POST → proxy to AGENTS_API_URL/agents                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↓ HTTP
┌─────────────────────────────────────────────────────────────────┐
│  blackroad-os-api (Express + TypeScript)                        │
│  Port: 8080                                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /agents (Generic Proxy Router)                             │ │
│  │ - Forwards all HTTP methods to CORE_BASE_URL/agents        │ │
│  │ - GET, POST, PUT, DELETE → Core                            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↓ HTTP
┌─────────────────────────────────────────────────────────────────┐
│  blackroad-os-core (Express + TypeScript + Prisma)              │
│  Port: 8081                                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /agents (Express Router)                                   │ │
│  │ - GET  /agents → prisma.agent.findMany()                   │ │
│  │ - POST /agents → prisma.agent.create()                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓ SQL                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Prisma Client                                              │ │
│  │ - Agent model (id, name, status, createdAt)                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↓ SQL
┌─────────────────────────────────────────────────────────────────┐
│  PostgreSQL (Railway)                                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ agents table                                               │ │
│  │ ┌──────────────────────────────────────────────────────┐   │ │
│  │ │ id          String   (cuid, PK)                      │   │ │
│  │ │ name        String                                   │   │ │
│  │ │ status      String   (default: "active")             │   │ │
│  │ │ created_at  DateTime (default: now())                │   │ │
│  │ └──────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Service Responsibilities

### Core (`blackroad-os-core`)

**Owns:** Data schema and persistence layer

**Responsibilities:**
- Defines the `Agent` Prisma model
- Provides REST endpoints for Agent CRUD operations
- Handles all business logic for Agent operations
- Manages database migrations

**Technology:**
- Express + TypeScript
- Prisma ORM
- PostgreSQL (Railway)

**Endpoints:**
- `GET /agents` — List all agents (ordered by created_at desc)
  - Response: `{ agents: Agent[] }`
- `POST /agents` — Create new agent
  - Body: `{ name: string, status?: "active" | "inactive" | "pending" }`
  - Response: `{ agent: Agent }`

**Files:**
- `prisma/schema.prisma` — Agent model definition
- `src/db/prisma.ts` — Prisma client wrapper
- `src/routes/agents.ts` — Agent CRUD routes
- `src/index.ts` — Router registration

---

### API (`blackroad-os-api`)

**Owns:** Public API surface

**Responsibilities:**
- Acts as a generic proxy for all `/agents` requests
- Forwards requests to Core without modification
- Does **not** own business logic or data schema
- Provides a stable public API contract

**Technology:**
- Express + TypeScript
- Axios for HTTP proxying

**Endpoints:**
- `GET /agents` → proxies to `${CORE_BASE_URL}/agents`
- `POST /agents` → proxies to `${CORE_BASE_URL}/agents`

**Proxy Behavior:**
- Forwards all HTTP methods (GET, POST, PUT, DELETE)
- Forwards headers, query params, request body
- Returns exact status codes from upstream
- Handles errors with 502 responses

**Files:**
- `src/index.ts` — Router configuration
- `src/routes/proxy.ts` — Generic proxy router
- `src/lib/httpClient.ts` — Axios client setup

---

### Prism Console (`blackroad-os-prism-console`)

**Owns:** Admin UI and user experience

**Responsibilities:**
- Provides web interface for managing agents
- Proxies requests to the API service
- Handles UI state, loading, and error states
- Does **not** directly communicate with Core or Database

**Technology:**
- Next.js 16 (App Router)
- React 19
- TypeScript

**Routes:**
- `/agents` — Main Agents page (UI)
  - Create agent form (name + status dropdown)
  - Agent list table (name, status, created timestamp, ID)
  - Refresh button
  - Success/error messaging

- `/api/agents` — Internal Next.js API route
  - `GET` → proxies to `${AGENTS_API_URL}/agents`
  - `POST` → proxies to `${AGENTS_API_URL}/agents`

**Files:**
- `src/app/agents/page.tsx` — Agents UI page
- `src/app/api/agents/route.ts` — API route proxy
- `src/components/layout/AppShell.tsx` — Navigation (includes Agents link)

---

## Environment Variables

### `blackroad-os-core`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string (Railway provides) |
| `PORT` | No | `8081` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment |

**Example:**
```bash
DATABASE_URL=postgresql://user:pass@host:5432/dbname?schema=public
PORT=8081
NODE_ENV=production
```

---

### `blackroad-os-api`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CORE_BASE_URL` | Yes | `http://localhost:8081` | Base URL for blackroad-os-core |
| `PORT` | No | `8080` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment |

**Example:**
```bash
CORE_BASE_URL=http://blackroad-os-core:8081  # Railway internal URL
PORT=8080
NODE_ENV=production
```

---

### `blackroad-os-prism-console`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `AGENTS_API_URL` | Yes | — | Base URL for blackroad-os-api |
| `PORT` | No | `8080` | HTTP server port (production) |
| `NODE_ENV` | No | `development` | Runtime environment |

**Example:**
```bash
AGENTS_API_URL=https://api.blackroad.systems  # Production
# or
AGENTS_API_URL=http://localhost:8080          # Local dev
```

---

## Local Development Setup

Run all three services in separate terminals:

### Terminal 1: Core

```bash
cd ~/projects/blackroad-os-core

# Set database connection
export DATABASE_URL="postgresql://user:pass@localhost:5432/blackroad_dev?schema=public"
export PORT=8081

# Install and setup
npm install
npx prisma migrate dev --name init_agents
npm run prisma:generate

# Build and run
npm run build
npm start

# Server running at http://localhost:8081
```

**Verify Core:**
```bash
# Create an agent
curl -X POST http://localhost:8081/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Agent","status":"active"}'

# List agents
curl http://localhost:8081/agents
```

---

### Terminal 2: API

```bash
cd ~/projects/blackroad-os-api

# Point to Core
export CORE_BASE_URL=http://localhost:8081
export PORT=8080

# Install and run
npm install
npm run build
npm start

# Server running at http://localhost:8080
```

**Verify API:**
```bash
# Create via API (proxies to Core)
curl -X POST http://localhost:8080/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test Agent","status":"pending"}'

# List via API
curl http://localhost:8080/agents
```

---

### Terminal 3: Prism Console

```bash
cd ~/projects/blackroad-os-prism-console

# Point to API
export AGENTS_API_URL=http://localhost:8080

# Install and run
npm install
npm run dev

# Server running at http://localhost:3000
```

**Verify Console:**
1. Open browser to `http://localhost:3000/agents`
2. Use the create form to add an agent
3. See it appear in the table
4. Verify in database that all agents are persisted

---

## Railway Deployment

### Core Service

**Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

**Start Command:**
```bash
npm start
```

**Health Check:**
- Path: `/health`
- Expected: `{ "status": "ok", "service": "core" }`

**Environment Variables:**
- `DATABASE_URL` — Provided by Railway Postgres plugin
- `PORT` — Provided by Railway
- `NODE_ENV=production`

---

### API Service

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Health Check:**
- Path: `/health`
- Expected: `{ "status": "ok" }`

**Environment Variables:**
- `CORE_BASE_URL` — Railway internal URL to Core service
- `PORT` — Provided by Railway
- `NODE_ENV=production`

---

### Prism Console Service

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Health Check:**
- Path: `/health`
- Expected: `{ "status": "ok", "service": "prism-console" }`

**Environment Variables:**
- `AGENTS_API_URL` — Public or internal URL to API service
- `PORT` — Provided by Railway
- `NODE_ENV=production`

---

## Key Learnings from Agent Registry v1

1. **Clear separation of concerns** — Core owns data, API proxies, Console provides UX
2. **Generic proxy pattern** — API's proxy router can be reused for any entity
3. **Environment-based config** — Each service points to upstream via env vars
4. **Health checks everywhere** — Every service exposes `/health` for Railway
5. **Prisma migrations** — Run `prisma migrate dev` locally, Railway runs `prisma generate` on build
6. **Consistent ports** — Core (8081), API (8080), Console (3000 dev / 8080 prod)
7. **TypeScript everywhere** — All three services use TS for type safety

---

## Next Steps

Use this lane as a template for:
- Task Registry
- Job Queue
- Notification System
- Any entity that needs CRUD + UI

See [`_lane-template.md`](./_lane-template.md) for a copy-paste template.
See [`../../runbooks/how-to-build-a-lane.md`](../../runbooks/how-to-build-a-lane.md) for step-by-step instructions.
