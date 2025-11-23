# BlackRoad OS Documentation

Architectural documentation and patterns for BlackRoad OS.

## Lanes

**Lanes** are end-to-end vertical slices that span from UI to database. Each lane represents a coherent feature with clear separation of concerns across services.

### Available Lanes

- ✅ [**Agent Registry v1**](./lanes/agent-registry-v1.md) — First working lane (canonical example)

### Resources

- 📋 [**Lane Template**](./lanes/_lane-template.md) — Copy-paste template for new lanes
- 📘 [**How to Build a Lane**](../runbooks/how-to-build-a-lane.md) — Step-by-step implementation guide

---

## Lane Architecture

Every lane follows this pattern:

```
Prism Console UI → Console API Route → Public API (Proxy) → Core Logic → Database
   (Next.js)          (/api/...)         (Express)          (Prisma)    (Postgres)
```

**Key Principles:**

1. **Core owns data** — Prisma models and business logic live in `blackroad-os-core`
2. **API proxies** — `blackroad-os-api` forwards requests without owning logic
3. **Console provides UX** — `blackroad-os-prism-console` handles UI/UX only
4. **Environment-based config** — Each service points upstream via env vars
5. **Health checks everywhere** — Every service exposes `/health` for Railway

---

## Quick Start

To build a new lane:

1. Read the [Agent Registry v1 example](./lanes/agent-registry-v1.md)
2. Copy the [Lane Template](./lanes/_lane-template.md)
3. Follow the [How to Build a Lane runbook](../runbooks/how-to-build-a-lane.md)

---

## Service Responsibilities

| Service | Owns | Technology | Port (local) |
|---------|------|------------|--------------|
| **blackroad-os-core** | Data schema, business logic, persistence | Express + TypeScript + Prisma + Postgres | 8081 |
| **blackroad-os-api** | Public API surface, generic proxying | Express + TypeScript + Axios | 8080 |
| **blackroad-os-prism-console** | Admin UI, user experience | Next.js 16 + React 19 | 3000 (dev) / 8080 (prod) |

---

## Contributing

When building new features:

1. **Use the Lane pattern** for anything with UI + data persistence
2. **Follow existing conventions** for ports, env vars, health checks
3. **Document as you go** — update READMEs and create lane docs
4. **Test end-to-end** — verify all three services work together locally

See the [runbooks](../runbooks/) for operational guides.
