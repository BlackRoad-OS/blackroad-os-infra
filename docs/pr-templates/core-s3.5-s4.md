# Season 3.5 + 4: Agent Runs v1 + Hardening (Core)

## Summary

Adds agent run triggering and history tracking (S3.5) plus input validation and error standardization (S4) to `blackroad-os-core`.

---

## Season 3.5: Agent Runs v1

### Database Schema
- **New model:** `AgentRun`
  - Links to `Agent` via `agentId`
  - Fields: `id`, `agentId`, `status`, `input`, `output`, `error`, `startedAt`, `completedAt`, `createdAt`, `updatedAt`
  - Status values: `pending`, `running`, `completed`, `failed`

### Business Logic
- **New service:** `src/services/agentRuns.ts`
  - `triggerAgentRun(agentId, input)` — Creates run record, calls stubbed model hook, updates status
  - `listAgentRuns(agentId, limit, offset)` — Paginated run history for an agent
  - `getAgentRun(runId)` — Fetch single run details

### API Routes
- `POST /agents/:id/run` — Trigger a new run for an agent
  - Body: `{ input?: string }`
  - Response: `202 Accepted` with `{ runId: string }`
- `GET /agents/:id/runs` — List runs for a specific agent
  - Query params: `limit`, `offset`
  - Response: `{ runs: AgentRun[], total: number }`
- `GET /agent-runs/:runId` — Get details of a specific run
  - Response: `{ run: AgentRun }`

### Files Changed
- `prisma/schema.prisma` — Added `AgentRun` model
- `src/services/agentRuns.ts` — New service (run logic)
- `src/routes/agents.ts` — Added run endpoints
- `src/index.ts` — Registered agent run service
- Migration: `add_agent_runs`

---

## Season 4: Hardening

### Validation Utils
- **New utility:** `src/utils/validation.ts`
  - `validateAgentName(name)` — Ensures name is non-empty string, max 500 chars
  - `validateAgentStatus(status)` — Validates against allowed statuses
  - `clampLimit(limit, max)` — Clamps pagination limit to safe range (default max: 100)
  - `clampOffset(offset)` — Ensures offset is non-negative

### Applied Validation
- `POST /agents` — Validates name and status before creation
- `PATCH /agents/:id` — Validates updates before applying
- `GET /agents` — Clamps `limit` and `offset` query params
- `POST /agents/:id/run` — Truncates long input strings (max 10,000 chars)
- Agent run `output` and `error` fields truncated to 50,000 chars

### Error Standardization
All Agent-related endpoints now return consistent error format:
```json
{ "error": "error_code_here" }
```

Error codes:
- `agent_not_found` — Agent ID doesn't exist
- `name_required` — Missing or invalid name
- `invalid_status` — Invalid status value
- `run_failed` — Agent run execution failed
- `run_not_found` — Run ID doesn't exist

### Files Changed
- `src/utils/validation.ts` — New validation utilities
- `src/routes/agents.ts` — Applied validation to all Agent routes
- `src/services/agentRuns.ts` — Applied truncation to run I/O

---

## Migration

```bash
npx prisma migrate dev --name add_agent_runs_and_hardening
npx prisma generate
```

---

## Testing Locally

### 1. Start Core
```bash
export DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
npm run build
npm start
```

### 2. Create an Agent
```bash
curl -X POST http://localhost:8081/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Agent","status":"active"}'
```

Copy the `id` from the response.

### 3. Trigger a Run
```bash
curl -X POST http://localhost:8081/agents/AGENT_ID/run \
  -H "Content-Type: application/json" \
  -d '{"input":"hello world"}'
```

Copy the `runId` from the response.

### 4. List Runs for Agent
```bash
curl http://localhost:8081/agents/AGENT_ID/runs
```

### 5. Get Run Details
```bash
curl http://localhost:8081/agent-runs/RUN_ID
```

---

## Behavior Notes

- **Model hook is stubbed:** The actual model execution in `triggerAgentRun` currently runs a placeholder that echoes input. Replace `runActualModel()` with real inference logic when ready.
- **Run status flow:** `pending` → `running` → `completed` (or `failed` on error)
- **Truncation:** Input/output/error fields are truncated to prevent unbounded storage
- **Backwards compatible:** All existing `/agents` CRUD operations continue to work as before

---

## Next Steps

- Apply Season 3.5 + 4 to `blackroad-os-api` (proxy the new run endpoints)
- Apply Season 3.5 + 4 to `blackroad-os-prism-console` (add run trigger UI + history table)
- Implement real model execution hook in `src/services/agentRuns.ts`
