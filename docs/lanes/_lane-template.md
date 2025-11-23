# <Lane Name> — Lane Overview

**What it is:** <1-2 sentence description of what this lane does and which entity/feature it manages>

**Why it exists:** <Why this feature is needed in BlackRoad OS>

**Repos touched:**
- `blackroad-os-core` — <What Core does for this lane>
- `blackroad-os-api` — <What API does for this lane>
- `blackroad-os-prism-console` — <What Console does for this lane>

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Prism Console (Next.js App Router)                             │
│  Port: 3000                                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /<entity-plural> page (UI)                                 │ │
│  │ - <Main UI features>                                       │ │
│  │ - <Secondary UI features>                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓ fetch                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /api/<entity-plural> (Next.js API Route)                   │ │
│  │ - GET  → proxy to <ENTITY>_API_URL/<entity-plural>         │ │
│  │ - POST → proxy to <ENTITY>_API_URL/<entity-plural>         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↓ HTTP
┌─────────────────────────────────────────────────────────────────┐
│  blackroad-os-api (Express + TypeScript)                        │
│  Port: 8080                                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /<entity-plural> (Generic Proxy Router)                    │ │
│  │ - Forwards to CORE_BASE_URL/<entity-plural>                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↓ HTTP
┌─────────────────────────────────────────────────────────────────┐
│  blackroad-os-core (Express + TypeScript + Prisma)              │
│  Port: 8081                                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ /<entity-plural> (Express Router)                          │ │
│  │ - GET  /<entity-plural> → prisma.<entity>.findMany()       │ │
│  │ - POST /<entity-plural> → prisma.<entity>.create()         │ │
│  │ - PUT  /<entity-plural>/:id → prisma.<entity>.update()     │ │
│  │ - DELETE /<entity-plural>/:id → prisma.<entity>.delete()   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓ SQL                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Prisma Client                                              │ │
│  │ - <Entity> model (<list key fields>)                       │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↓ SQL
┌─────────────────────────────────────────────────────────────────┐
│  PostgreSQL (Railway)                                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ <table_name> table                                         │ │
│  │ ┌──────────────────────────────────────────────────────┐   │ │
│  │ │ id          String   (cuid, PK)                      │   │ │
│  │ │ <field_1>   <Type>   <constraints>                   │   │ │
│  │ │ <field_2>   <Type>   <constraints>                   │   │ │
│  │ │ created_at  DateTime (default: now())                │   │ │
│  │ │ updated_at  DateTime (auto-update)                   │   │ │
│  │ └──────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Service Responsibilities

### Core (`blackroad-os-core`)

**Owns:** Data schema and persistence layer

**Responsibilities:**
- Defines the `<Entity>` Prisma model
- Provides REST endpoints for <Entity> operations
- Handles all business logic
- Manages database migrations

**Technology:**
- Express + TypeScript
- Prisma ORM
- PostgreSQL (Railway)

**Endpoints:**
- `GET /<entity-plural>` — List all <entities>
  - Query params: <optional: pagination, filters, sort>
  - Response: `{ <entity-plural>: <Entity>[] }`
- `GET /<entity-plural>/:id` — Get single <entity>
  - Response: `{ <entity>: <Entity> }`
- `POST /<entity-plural>` — Create new <entity>
  - Body: `{ <required fields> }`
  - Response: `{ <entity>: <Entity> }`
- `PUT /<entity-plural>/:id` — Update <entity>
  - Body: `{ <updatable fields> }`
  - Response: `{ <entity>: <Entity> }`
- `DELETE /<entity-plural>/:id` — Delete <entity>
  - Response: `{ success: boolean }`

**Files:**
- `prisma/schema.prisma` — <Entity> model definition
- `src/db/prisma.ts` — Prisma client wrapper (if not already present)
- `src/routes/<entity-plural>.ts` — <Entity> CRUD routes
- `src/index.ts` — Router registration

**Prisma Model Example:**
```prisma
model <Entity> {
  id         String   @id @default(cuid())
  <field_1>  <Type>
  <field_2>  <Type>
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  @@map("<table_name>")
}
```

---

### API (`blackroad-os-api`)

**Owns:** Public API surface

**Responsibilities:**
- Acts as a generic proxy for all `/<entity-plural>` requests
- Forwards requests to Core without modification
- Does **not** own business logic or data schema

**Technology:**
- Express + TypeScript
- Axios for HTTP proxying

**Endpoints:**
- `GET /<entity-plural>` → proxies to `${CORE_BASE_URL}/<entity-plural>`
- `GET /<entity-plural>/:id` → proxies to `${CORE_BASE_URL}/<entity-plural>/:id`
- `POST /<entity-plural>` → proxies to `${CORE_BASE_URL}/<entity-plural>`
- `PUT /<entity-plural>/:id` → proxies to `${CORE_BASE_URL}/<entity-plural>/:id`
- `DELETE /<entity-plural>/:id` → proxies to `${CORE_BASE_URL}/<entity-plural>/:id`

**Files:**
- `src/index.ts` — Router configuration (add proxy route)

**Example:**
```typescript
// In src/index.ts
app.use("/<entity-plural>", createProxyRouter(serviceClients.core));
```

---

### Prism Console (`blackroad-os-prism-console`)

**Owns:** Admin UI and user experience

**Responsibilities:**
- Provides web interface for managing <entities>
- Proxies requests to the API service
- Handles UI state, loading, and error states

**Technology:**
- Next.js 16 (App Router)
- React 19
- TypeScript

**Routes:**
- `/<entity-plural>` — Main <Entity> page (UI)
  - <List UI features: create form, table, filters, etc.>

- `/api/<entity-plural>` — Internal Next.js API route
  - `GET` → proxies to `${<ENTITY>_API_URL}/<entity-plural>`
  - `POST` → proxies to `${<ENTITY>_API_URL}/<entity-plural>`
  - <Other methods as needed>

**Files:**
- `src/app/<entity-plural>/page.tsx` — <Entity> UI page
- `src/app/api/<entity-plural>/route.ts` — API route proxy
- `src/components/layout/AppShell.tsx` — Navigation (add link to <entities>)
- `src/lib/config.ts` — Environment config (add <ENTITY>_API_URL if needed)

---

## Environment Variables

### `blackroad-os-core`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `PORT` | No | `8081` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment |

---

### `blackroad-os-api`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CORE_BASE_URL` | Yes | `http://localhost:8081` | Base URL for blackroad-os-core |
| `PORT` | No | `8080` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment |

---

### `blackroad-os-prism-console`

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `<ENTITY>_API_URL` | Yes | — | Base URL for blackroad-os-api |
| `PORT` | No | `8080` | HTTP server port (production) |
| `NODE_ENV` | No | `development` | Runtime environment |

**Note:** If reusing existing `AGENTS_API_URL` or similar, document which env var this lane uses.

---

## Local Development Setup

### Terminal 1: Core

```bash
cd ~/projects/blackroad-os-core

export DATABASE_URL="postgresql://user:pass@localhost:5432/blackroad_dev?schema=public"
export PORT=8081

npm install
npx prisma migrate dev --name init_<entity_plural>
npm run prisma:generate
npm run build
npm start
```

**Verify:**
```bash
curl -X POST http://localhost:8081/<entity-plural> \
  -H "Content-Type: application/json" \
  -d '{ <sample create payload> }'

curl http://localhost:8081/<entity-plural>
```

---

### Terminal 2: API

```bash
cd ~/projects/blackroad-os-api

export CORE_BASE_URL=http://localhost:8081
export PORT=8080

npm install
npm run build
npm start
```

**Verify:**
```bash
curl http://localhost:8080/<entity-plural>
```

---

### Terminal 3: Prism Console

```bash
cd ~/projects/blackroad-os-prism-console

export <ENTITY>_API_URL=http://localhost:8080

npm install
npm run dev
```

**Verify:**
- Open `http://localhost:3000/<entity-plural>`
- <Test UI interactions>

---

## Railway Deployment Checklist

### Core Service

- [ ] Build: `npm install && npx prisma generate && npm run build`
- [ ] Start: `npm start`
- [ ] Health: `/health`
- [ ] Env vars: `DATABASE_URL`, `PORT`, `NODE_ENV=production`

### API Service

- [ ] Build: `npm install && npm run build`
- [ ] Start: `npm start`
- [ ] Health: `/health`
- [ ] Env vars: `CORE_BASE_URL`, `PORT`, `NODE_ENV=production`

### Prism Console Service

- [ ] Build: `npm install && npm run build`
- [ ] Start: `npm start`
- [ ] Health: `/health`
- [ ] Env vars: `<ENTITY>_API_URL`, `PORT`, `NODE_ENV=production`

---

## Implementation Checklist

Use this checklist when building a new lane:

### Planning
- [ ] Name the entity (singular + plural forms)
- [ ] Define fields and data types
- [ ] Decide on required vs optional fields
- [ ] Plan UI requirements (forms, tables, filters, etc.)

### Core Implementation
- [ ] Add Prisma model to `schema.prisma`
- [ ] Run migration: `npx prisma migrate dev --name init_<entity>`
- [ ] Generate Prisma client: `npx prisma generate`
- [ ] Create `src/routes/<entity-plural>.ts` with CRUD endpoints
- [ ] Register router in `src/index.ts`
- [ ] Update `README.md` with endpoints and usage
- [ ] Test locally with curl

### API Implementation
- [ ] Add proxy route to `src/index.ts`
- [ ] Update `README.md` with proxy documentation
- [ ] Test locally with curl

### Console Implementation
- [ ] Create `/api/<entity-plural>` route in `src/app/api/<entity-plural>/route.ts`
- [ ] Create `/<entity-plural>` page in `src/app/<entity-plural>/page.tsx`
- [ ] Add navigation link in `src/components/layout/AppShell.tsx`
- [ ] Update `.env.example` with `<ENTITY>_API_URL`
- [ ] Update `src/lib/config.ts` if needed (for server-side config)
- [ ] Update `README.md` with UI documentation
- [ ] Test in browser

### Deployment
- [ ] Push all repos to GitHub
- [ ] Set env vars in Railway for each service
- [ ] Deploy Core (migrations run automatically)
- [ ] Deploy API
- [ ] Deploy Console
- [ ] Smoke test in production

---

## References

- See [agent-registry-v1.md](./agent-registry-v1.md) for a complete working example
- See [../../runbooks/how-to-build-a-lane.md](../../runbooks/how-to-build-a-lane.md) for step-by-step instructions
