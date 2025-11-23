# Season 3.5 + 4: Agent Runs v1 + Hardening (API)

## Summary

Adds proxy support for agent run endpoints (S3.5) and error response documentation (S4) to `blackroad-os-api`.

---

## Season 3.5: Agent Runs v1

### New Proxied Endpoints

All agent run endpoints are proxied to `${CORE_BASE_URL}` without modification:

- `POST /agents/:id/run` → `${CORE_BASE_URL}/agents/:id/run`
  - Forwards request body (input)
  - Returns 202 + runId from Core

- `GET /agents/:id/runs` → `${CORE_BASE_URL}/agents/:id/runs`
  - Forwards query params (limit, offset)
  - Returns paginated run list from Core

- `GET /agent-runs/:runId` → `${CORE_BASE_URL}/agent-runs/:runId`
  - Returns single run details from Core

### Proxy Behavior

- **Generic proxy router** — Uses existing `createProxyRouter()` pattern
- **No business logic** — API remains a pure proxy layer
- **Forwards everything** — Headers, query params, request body, status codes
- **Error handling** — 502 Bad Gateway if Core is unreachable

### Files Changed

- `src/index.ts` — Agent routes already proxied via `/agents` router
- `README.md` — Updated with new agent run endpoint documentation

---

## Season 4: Hardening

### Error Response Documentation

Updated README to document Core's standardized error format:

```json
{ "error": "error_code_here" }
```

Common error codes proxied from Core:
- `agent_not_found` — Agent ID doesn't exist
- `name_required` — Missing or invalid name
- `invalid_status` — Invalid status value
- `run_failed` — Agent run execution failed
- `run_not_found` — Run ID doesn't exist

### Files Changed

- `README.md` — Added error response documentation section

---

## Testing Locally

### 1. Start Core (Terminal 1)
```bash
cd ~/projects/blackroad-os-core
export DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
npm start
# Running on http://localhost:8081
```

### 2. Start API (Terminal 2)
```bash
cd ~/projects/blackroad-os-api
export CORE_BASE_URL=http://localhost:8081
export PORT=8080
npm run build
npm start
# Running on http://localhost:8080
```

### 3. Test via API Proxy

Create an agent:
```bash
curl -X POST http://localhost:8080/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Agent","status":"active"}'
```

Trigger a run (replace AGENT_ID):
```bash
curl -X POST http://localhost:8080/agents/AGENT_ID/run \
  -H "Content-Type: application/json" \
  -d '{"input":"hello via API proxy"}'
```

List runs:
```bash
curl http://localhost:8080/agents/AGENT_ID/runs
```

Get run details (replace RUN_ID):
```bash
curl http://localhost:8080/agent-runs/RUN_ID
```

---

## Deployment Notes

### Environment Variables

No new environment variables required. Existing config covers agent run proxying:

- `CORE_BASE_URL` — Base URL for blackroad-os-core (already configured)
- `PORT` — HTTP server port (default: 8080)
- `NODE_ENV` — Runtime environment

### Railway Deployment

No changes to build/start commands:

```bash
# Build
npm install && npm run build

# Start
npm start

# Health check
GET /health → { "status": "ok" }
```

---

## Behavior Notes

- **Zero business logic** — API remains a pure proxy layer
- **Automatic pass-through** — Generic proxy router handles all HTTP methods
- **Error propagation** — Core's error responses (400, 404, 500) are forwarded unchanged
- **Backwards compatible** — All existing agent CRUD operations continue working

---

## Next Steps

- Apply Season 3.5 + 4 to `blackroad-os-prism-console` (add run trigger UI + history table)
- Verify end-to-end: Console → API → Core → Database
