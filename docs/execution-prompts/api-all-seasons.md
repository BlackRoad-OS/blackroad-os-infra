# API: All Seasons Execution Prompt

Paste this into Claude Code when in `blackroad-os-api` to apply all seasons at once.

---

## Prompt

```
You are Claude Code, inside blackroad-os-api.

Apply ALL of the following seasons to this repo. Remember: API is a pure proxy layer - it forwards requests to Core without owning business logic.

---

## Season 3.5: Agent Runs v1

No code changes needed - the existing generic proxy router at `/agents` already forwards all HTTP methods (GET, POST, PUT, DELETE) to Core, including the new run endpoints:

- `POST /agents/:id/run` → proxies to Core
- `GET /agents/:id/runs` → proxies to Core
- `GET /agent-runs/:runId` → proxies to Core

### Update README.md

Add documentation for the new agent run endpoints:

```markdown
### Agent Runs

**Trigger Agent Run**
- `POST /agents/:id/run`
- Body: `{ input?: string }`
- Response: `202 Accepted` with `{ runId: string }`
- Proxies to: `${CORE_BASE_URL}/agents/:id/run`

**List Agent Runs**
- `GET /agents/:id/runs`
- Query params: `limit`, `offset`
- Response: `{ runs: AgentRun[], total: number }`
- Proxies to: `${CORE_BASE_URL}/agents/:id/runs`

**Get Run Details**
- `GET /agent-runs/:runId`
- Response: `{ run: AgentRun }`
- Proxies to: `${CORE_BASE_URL}/agent-runs/:runId`
```

---

## Season 4: Hardening

### Update README.md

Add error response documentation:

```markdown
## Error Responses

All proxied endpoints return error responses from Core in this format:

```json
{ "error": "error_code_here" }
```

### Common Error Codes

**Agent Errors:**
- `agent_not_found` — Agent ID doesn't exist
- `name_required` — Missing or invalid agent name
- `invalid_status` — Invalid status value

**Agent Run Errors:**
- `run_failed` — Agent run execution failed
- `run_not_found` — Run ID doesn't exist

**Task Errors:**
- `task_not_found` — Task ID doesn't exist
- `title_required` — Missing or invalid task title
- `invalid_status` — Invalid task status
- `invalid_priority` — Invalid task priority

**Auth Errors:**
- `unauthorized` — Missing or invalid authorization header
- `invalid_token` — JWT token is invalid or expired
- `invalid_credentials` — Email/password combination is incorrect
- `user_exists` — Email already registered
- `email_and_password_required` — Missing email or password

### HTTP Status Codes

- `200 OK` — Successful GET request
- `201 Created` — Successful POST request
- `202 Accepted` — Async operation started (agent runs)
- `400 Bad Request` — Validation error (e.g., name_required)
- `401 Unauthorized` — Authentication required or invalid
- `404 Not Found` — Resource doesn't exist
- `409 Conflict` — Resource already exists (e.g., user_exists)
- `500 Internal Server Error` — Unexpected error
- `502 Bad Gateway` — Core service is unreachable
```

---

## Season 5: Telemetry

### Request ID Propagation

Update `src/middleware/requestId.ts` (or create if doesn't exist):

```typescript
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = (req.headers["x-request-id"] as string) || randomUUID();
  req.headers["x-request-id"] = requestId;
  res.setHeader("x-request-id", requestId);
  next();
}
```

Update `src/index.ts`:

```typescript
import { requestIdMiddleware } from "./middleware/requestId";

app.use(requestIdMiddleware);

// Ensure proxy forwards x-request-id header to Core
// (Generic proxy should already forward all headers)
```

### Metrics Proxy

Add metrics proxy endpoint in `src/index.ts`:

```typescript
// Proxy metrics from Core
app.get("/metrics/agents", async (req, res) => {
  try {
    const response = await serviceClients.core.get("/metrics/agents");
    res.json(response.data);
  } catch (error) {
    res.status(502).json({ error: "core_unavailable" });
  }
});
```

---

## Season 6: Task Registry v1

No code changes needed - add new proxy route for tasks.

Update `src/index.ts`:

```typescript
import { createProxyRouter } from "./routes/proxy";

// Add tasks proxy (same pattern as agents)
app.use("/tasks", createProxyRouter(serviceClients.core));
```

### Update README.md

Add task endpoints documentation:

```markdown
### Tasks

**List Tasks**
- `GET /tasks`
- Query params: `limit`, `offset`
- Response: `{ tasks: Task[] }`
- Proxies to: `${CORE_BASE_URL}/tasks`

**Create Task**
- `POST /tasks`
- Body: `{ title: string, description?: string, status?: string, priority?: string, assignee?: string }`
- Response: `201 Created` with `{ task: Task }`
- Proxies to: `${CORE_BASE_URL}/tasks`

**Update Task**
- `PATCH /tasks/:id`
- Body: `{ title?, description?, status?, priority?, assignee? }`
- Response: `{ task: Task }`
- Proxies to: `${CORE_BASE_URL}/tasks/:id`

**Delete Task**
- `DELETE /tasks/:id`
- Response: `{ success: true }`
- Proxies to: `${CORE_BASE_URL}/tasks/:id`
```

---

## Season 7: Auth & RBAC

### Auth Proxy

Add auth proxy route in `src/index.ts`:

```typescript
// Auth routes (no auth middleware on these)
app.use("/auth", createProxyRouter(serviceClients.core));
```

### Auth Middleware (Optional)

If you want to enforce auth at the API layer (instead of relying on Core):

Create `src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "unauthorized" });
  }

  // Forward token to Core for verification
  // Core will return 401 if token is invalid
  next();
}
```

Apply to protected routes in `src/index.ts`:

```typescript
import { authMiddleware } from "./middleware/auth";

// Protected routes (optional - Core also checks auth)
app.use("/agents", authMiddleware, createProxyRouter(serviceClients.core));
app.use("/tasks", authMiddleware, createProxyRouter(serviceClients.core));
```

**Note:** It's recommended to let Core handle auth validation to keep API as a pure proxy.

### Update README.md

Add auth endpoints:

```markdown
### Authentication

**Register**
- `POST /auth/register`
- Body: `{ email: string, password: string }`
- Response: `201 Created` with `{ user: { id, email, role }, token: string }`
- Proxies to: `${CORE_BASE_URL}/auth/register`

**Login**
- `POST /auth/login`
- Body: `{ email: string, password: string }`
- Response: `{ user: { id, email, role }, token: string }`
- Proxies to: `${CORE_BASE_URL}/auth/login`

### Protected Routes

To access protected endpoints, include JWT token in Authorization header:

```bash
curl http://localhost:8080/agents \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

All agent and task endpoints require authentication.
```

---

## Season 8: Tests & CI

### Jest Config

Create `jest.config.js`:

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
};
```

### Proxy Tests

Create `src/__tests__/proxy.test.ts`:

```typescript
import request from "supertest";
import nock from "nock";
import app from "../index";

const CORE_BASE_URL = process.env.CORE_BASE_URL || "http://localhost:8081";

describe("Proxy Behavior", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should proxy GET /agents to Core", async () => {
    nock(CORE_BASE_URL)
      .get("/agents")
      .reply(200, { agents: [{ id: "1", name: "Test Agent" }] });

    const res = await request(app).get("/agents");

    expect(res.status).toBe(200);
    expect(res.body.agents).toHaveLength(1);
  });

  it("should proxy POST /agents to Core", async () => {
    nock(CORE_BASE_URL)
      .post("/agents", { name: "New Agent", status: "active" })
      .reply(201, { agent: { id: "2", name: "New Agent" } });

    const res = await request(app)
      .post("/agents")
      .send({ name: "New Agent", status: "active" });

    expect(res.status).toBe(201);
    expect(res.body.agent.name).toBe("New Agent");
  });

  it("should forward error responses from Core", async () => {
    nock(CORE_BASE_URL)
      .get("/agents/invalid")
      .reply(404, { error: "agent_not_found" });

    const res = await request(app).get("/agents/invalid");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("agent_not_found");
  });

  it("should return 502 if Core is unreachable", async () => {
    nock(CORE_BASE_URL).get("/agents").replyWithError("Connection refused");

    const res = await request(app).get("/agents");

    expect(res.status).toBe(502);
  });

  it("should forward x-request-id header", async () => {
    const requestId = "test-request-id";

    nock(CORE_BASE_URL, {
      reqheaders: { "x-request-id": requestId },
    })
      .get("/agents")
      .reply(200, { agents: [] });

    const res = await request(app)
      .get("/agents")
      .set("x-request-id", requestId);

    expect(res.status).toBe(200);
    expect(res.headers["x-request-id"]).toBe(requestId);
  });
});
```

### GitHub Actions

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

### Update package.json

```json
{
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "@types/jest": "^29.5.0",
    "@types/supertest": "^6.0.0",
    "jest": "^29.5.0",
    "nock": "^13.3.0",
    "supertest": "^6.3.0",
    "ts-jest": "^29.1.0"
  }
}
```

---

## Your Tasks

After I apply all these changes:

1. **Install new dependencies:**
   ```bash
   npm install
   ```
2. **Build:**
   ```bash
   npm run build
   ```
3. **Run tests:**
   ```bash
   npm test
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Verify proxy behavior** by curling endpoints while Core is running

Tell me when you're ready and I'll apply all of these changes using the Edit and Write tools.
```
