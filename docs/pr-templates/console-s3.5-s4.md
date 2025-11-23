# Season 3.5 + 4: Agent Runs v1 + Hardening (Console)

## Summary

Adds agent run triggering UI and run history table (S3.5) plus client-side validation and error mapping (S4) to `blackroad-os-prism-console`.

---

## Season 3.5: Agent Runs v1

### UI Features

**Run Trigger Section** (on `/agents` page)
- Input field for run input text (optional)
- "Trigger Run" button
- Shows success message with run ID after triggering
- Shows error message if trigger fails

**Run History Table** (on `/agents` page)
- Displays all runs for all agents (or filtered by agent)
- Columns:
  - Agent Name
  - Status (pending, running, completed, failed)
  - Input (truncated preview)
  - Output (truncated preview)
  - Started At
  - Completed At
  - Run ID
- Sorted by most recent first
- Color-coded status badges:
  - Pending: gray
  - Running: blue
  - Completed: green
  - Failed: red

**Refresh Button**
- Manual refresh for both agents list and runs list

### API Route Updates

**`/api/agents` (existing route)**
- Already proxies GET and POST for agent CRUD

**New: `/api/agents/runs` route**
- `GET /api/agents/runs` → proxies to `${AGENTS_API_URL}/agents/runs`
  - Query params: `agentId`, `limit`, `offset`
  - Returns: `{ runs: AgentRun[], total: number }`

**New: `/api/agents/:id/run` route**
- `POST /api/agents/:id/run` → proxies to `${AGENTS_API_URL}/agents/:id/run`
  - Body: `{ input?: string }`
  - Returns: `{ runId: string }`

### Files Changed

- `src/app/agents/page.tsx` — Enhanced with run trigger form + run history table
- `src/app/api/agents/runs/route.ts` — New API route for listing runs
- `src/app/api/agents/[id]/run/route.ts` — New API route for triggering runs
- `README.md` — Updated with agent runs UI documentation

---

## Season 4: Hardening

### Client-Side Validation

**Agent Creation Form**
- Name field:
  - Required (blocks submit if empty)
  - Max 500 characters
  - Shows validation error on blur
- Status field:
  - Required
  - Validates against allowed values: `active`, `inactive`, `pending`

**Run Trigger Form**
- Input field:
  - Optional
  - Max 10,000 characters (truncated on server)
  - Shows character count

### Error Mapping

Maps Core error codes to user-friendly messages:

| Error Code | User Message |
|------------|--------------|
| `agent_not_found` | "Agent not found. Please refresh the page." |
| `name_required` | "Agent name is required and must be valid." |
| `invalid_status` | "Invalid status. Please select a valid option." |
| `run_failed` | "Failed to execute run. Please try again." |
| `run_not_found` | "Run not found." |
| (default) | "An unexpected error occurred. Please try again." |

### Loading & Error States

**Agent List**
- Loading spinner while fetching
- Error banner if fetch fails
- Empty state if no agents exist

**Run History**
- Loading spinner while fetching
- Error banner if fetch fails
- Empty state if no runs exist
- Disabled "Trigger Run" button while run is in progress

### Files Changed

- `src/app/agents/page.tsx` — Added validation + error mapping
- `src/lib/errorMapping.ts` — New utility for mapping error codes (optional)

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
npm start
# Running on http://localhost:8080
```

### 3. Start Console (Terminal 3)
```bash
cd ~/projects/blackroad-os-prism-console
export AGENTS_API_URL=http://localhost:8080
npm run dev
# Running on http://localhost:3000
```

### 4. Test in Browser

1. Open `http://localhost:3000/agents`
2. **Create an agent:**
   - Fill in name (test validation by leaving empty)
   - Select status
   - Click "Create Agent"
   - See it appear in the agents table
3. **Trigger a run:**
   - Enter optional input text
   - Click "Trigger Run"
   - See success message with run ID
4. **View run history:**
   - See the new run appear in the runs table
   - Status should be "completed" (or "failed" if error)
   - Click refresh to reload runs
5. **Test error states:**
   - Try creating agent with empty name (should show validation error)
   - Try creating agent with invalid status (should show error)
   - Stop Core service and try triggering run (should show connection error)

---

## Deployment Notes

### Environment Variables

No new environment variables required:

- `AGENTS_API_URL` — Base URL for blackroad-os-api (already configured)
- `PORT` — HTTP server port (default: 3000 dev, 8080 prod)
- `NODE_ENV` — Runtime environment

### Railway Deployment

No changes to build/start commands:

```bash
# Build
npm install && npm run build

# Start
npm start

# Health check
GET /health → { "status": "ok", "service": "prism-console" }
```

---

## UI/UX Notes

- **Real-time updates** — Users must click refresh to see new runs (no polling/websockets yet)
- **Truncated display** — Long input/output strings are truncated in table with "..." indicator
- **Status colors** — Run status is visually distinct via color-coded badges
- **Form validation** — Validates on blur and on submit
- **Error recovery** — Clear error messages with actionable guidance

---

## Next Steps

- Add auto-refresh for run history (polling or SSE)
- Add run detail modal (click row to see full input/output/error)
- Add filtering (by agent, by status)
- Add pagination for large run lists
