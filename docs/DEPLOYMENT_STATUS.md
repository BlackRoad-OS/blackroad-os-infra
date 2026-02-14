# BlackRoad OS - Deployment Status

> Generated: 2024-11-30 | Updated by CECE Deployment Sweep

## Repository Overview

| Category | Repo | Status | Deployable | Runtime | Health Endpoint |
|----------|------|--------|------------|---------|-----------------|
| **Core Runtime** | `blackroad-os-core` | Active | Yes | Node.js/pnpm | `/` |
| **Core Runtime** | `blackroad-os-operator` | Active | Yes | Python/FastAPI | `/health` |
| **Core Runtime** | `blackroad-os-api` | Active | Yes | Python/FastAPI | `/health` |
| **Web/UX** | `blackroad-os-web` | Active | Yes | Next.js | `/` |
| **Web/UX** | `blackroad-os-prism-console` | Active | Yes | Next.js | `/api/health` |
| **Web/UX** | `blackroad-os-docs` | Active | Yes | Docusaurus | `/` |
| **Infrastructure** | `blackroad-os-infra` | Active | N/A | IaC/Terraform | N/A |
| **Infrastructure** | `blackroad-os-api-gateway` | Active | Yes | Go | `/health` |
| **Infrastructure** | `blackroad-os-mesh` | Active | Yes | Cloudflare Worker | N/A |
| **Agents** | `blackroad-os-agents` | Active | Yes | Node.js | `/health` |
| **Edge/Pi** | `blackroad-pi-ops` | Active | N/A | Python/systemd | Local only |
| **Edge/Pi** | `blackroad-pi-holo` | Active | N/A | Python/systemd | Local only |
| **CLI** | `blackroad-cli` | Active | N/A | Node.js | Local CLI |
| **AI/Lucidia** | `lucidia-core` | Active | Yes | Python/FastAPI | TBD |
| **AI/Lucidia** | `lucidia-platform` | Active | Partial | Multi-service | TBD |

### Archived Repositories (Do Not Deploy)

| Repo | Reason |
|------|--------|
| `blackroad-agent-os` | Superseded by `blackroad-os-operator` |
| `blackroad-agents` | Merged into `blackroad-os-agents` |
| `blackroad-os-demo` | Demo/template only |
| `blackroad-os-helper` | Deprecated |
| `blackroad-os-home` | Company docs, not deployable |
| `blackroad-os-ideas` | Issue tracker only |
| `blackroad-os-research` | Papers/theory, not deployable |

---

## Deployment Targets

### Railway Services (Primary)

| Service | Repo | railway.toml | Dockerfile | Status |
|---------|------|--------------|------------|--------|
| Operator | `blackroad-os-operator` | Yes | Yes | Ready |
| API | `blackroad-os-api` | Yes | Yes | Ready |
| Web | `blackroad-os-web` | Yes | Yes | Ready |
| Prism Console | `blackroad-os-prism-console` | Yes | Yes | Ready |
| Docs | `blackroad-os-docs` | Yes | Yes | Ready |
| API Gateway | `blackroad-os-api-gateway` | Yes | Yes | Ready |
| Agents | `blackroad-os-agents` | Yes | Yes | Ready |

### Cloudflare Workers

| Service | Repo | wrangler.toml | Status |
|---------|------|---------------|--------|
| Mesh WebSocket | `blackroad-os-mesh` | Yes | Ready |

### Edge Devices (systemd)

| Service | Repo | install script | systemd unit | Status |
|---------|------|----------------|--------------|--------|
| Pi Agent | `blackroad-pi-ops` | Yes | Yes | Deployed |
| Pi Holo | `blackroad-pi-holo` | Manual | Yes | Manual |

---

## Service Architecture

```
                    ┌─────────────────────┐
                    │   Cloudflare CDN    │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
       ┌──────────┐    ┌──────────┐    ┌──────────┐
       │   Web    │    │   Docs   │    │  Prism   │
       │ (Next.js)│    │(Docusaur)│    │ Console  │
       └────┬─────┘    └──────────┘    └────┬─────┘
            │                               │
            └───────────┬───────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │   API Gateway   │
              │      (Go)       │
              └────────┬────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
    ┌─────────┐  ┌──────────┐  ┌─────────┐
    │   API   │  │ Operator │  │ Agents  │
    │(FastAPI)│  │(FastAPI) │  │(Node.js)│
    └─────────┘  └────┬─────┘  └─────────┘
                      │
                      │ WebSocket
                      │
         ┌────────────┼────────────┐
         │            │            │
         ▼            ▼            ▼
    ┌─────────┐  ┌─────────┐  ┌─────────┐
    │   Pi    │  │   Pi    │  │   Pi    │
    │ Agent 1 │  │ Agent 2 │  │ Agent N │
    └─────────┘  └─────────┘  └─────────┘
```

---

## Health Check Commands

### Operator (local)
```bash
curl http://localhost:8000/health
```

### Pi Mesh Status
```bash
curl http://localhost:8000/api/agents
curl http://localhost:8000/api/agents/online
```

### Smoke Test Agent
```bash
curl -X POST http://localhost:8000/api/agents/{agent_id}/smoke-test
```

---

## Deployment Checklist

### New Railway Deployment

- [ ] Fork/clone repo
- [ ] Verify `railway.toml` exists
- [ ] Verify `Dockerfile` builds locally
- [ ] Check health endpoint returns 200
- [ ] Create Railway project
- [ ] Link GitHub repo
- [ ] Set environment variables
- [ ] Deploy and verify health

### New Pi Agent

- [ ] SSH to Pi
- [ ] Set `BLACKROAD_OPERATOR_URL` environment variable
- [ ] Run installer: `curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh | sudo bash`
- [ ] Verify service: `sudo systemctl status blackroad-agent`
- [ ] Check operator: `curl http://<operator>/api/agents`

---

## Environment Variables

### Operator
| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | HTTP port (default: 8000) |
| `CATALOG_PATH` | No | Path to agents.yaml |

### API
| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | HTTP port (default: 8080) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | No | Redis for rate limiting |

### Pi Agent
| Variable | Required | Description |
|----------|----------|-------------|
| `BLACKROAD_OPERATOR_URL` | Yes | WebSocket URL to operator |
| `BLACKROAD_AGENT_ID` | No | Override auto-generated ID |

---

## Known Issues

1. **blackroad-os-api**: Has duplicate app definition in main.py (two FastAPI instances)
2. **blackroad-os-mesh**: Cloudflare Worker only, no standalone deployment
3. **lucidia-core**: Missing health endpoint
4. **lucidia-platform**: Multi-component, needs decomposition

---

## Next Steps

1. [ ] Deploy operator to Railway staging
2. [ ] Configure Railway environment variables
3. [ ] Set up Cloudflare DNS for services
4. [ ] Add CI/CD pipelines for auto-deploy
5. [ ] Create monitoring dashboards
6. [ ] Add alerting for health failures
