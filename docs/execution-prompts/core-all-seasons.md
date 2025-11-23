# Core: All Seasons Execution Prompt

Paste this into Claude Code when in `blackroad-os-core` to apply all seasons at once.

---

## Prompt

```
You are Claude Code, inside blackroad-os-core.

Apply ALL of the following seasons to this repo in order:

---

## Season 3.5: Agent Runs v1

### Database Schema
Add AgentRun Prisma model:
- id: String (cuid, PK)
- agentId: String (FK to Agent)
- status: String (pending, running, completed, failed)
- input: String? (optional text, max 10k chars)
- output: String? (optional text, max 50k chars)
- error: String? (optional error message, max 50k chars)
- startedAt: DateTime?
- completedAt: DateTime?
- createdAt: DateTime (default: now())
- updatedAt: DateTime (auto-update)

### Business Logic
Create `src/services/agentRuns.ts`:

```typescript
import { prisma } from "../db/prisma";

// Stubbed model execution (replace with real inference later)
async function runActualModel(input: string): Promise<string> {
  // TODO: Replace with actual model inference
  return `Echo: ${input}`;
}

export async function triggerAgentRun(
  agentId: string,
  input?: string
): Promise<string> {
  // Verify agent exists
  const agent = await prisma.agent.findUnique({ where: { id: agentId } });
  if (!agent) {
    throw new Error("agent_not_found");
  }

  // Truncate input if too long
  const truncatedInput = input
    ? input.substring(0, 10000)
    : undefined;

  // Create run record
  const run = await prisma.agentRun.create({
    data: {
      agentId,
      status: "pending",
      input: truncatedInput,
      startedAt: new Date(),
    },
  });

  // Execute run asynchronously (don't await in production)
  executeRun(run.id, truncatedInput).catch(console.error);

  return run.id;
}

async function executeRun(runId: string, input?: string) {
  try {
    // Update to running
    await prisma.agentRun.update({
      where: { id: runId },
      data: { status: "running" },
    });

    // Run the model
    const output = await runActualModel(input || "");
    const truncatedOutput = output.substring(0, 50000);

    // Update to completed
    await prisma.agentRun.update({
      where: { id: runId },
      data: {
        status: "completed",
        output: truncatedOutput,
        completedAt: new Date(),
      },
    });
  } catch (error: any) {
    const truncatedError = String(error?.message || error).substring(0, 50000);
    await prisma.agentRun.update({
      where: { id: runId },
      data: {
        status: "failed",
        error: truncatedError,
        completedAt: new Date(),
      },
    });
  }
}

export async function listAgentRuns(
  agentId: string,
  limit: number = 50,
  offset: number = 0
) {
  const runs = await prisma.agentRun.findMany({
    where: { agentId },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  });

  const total = await prisma.agentRun.count({ where: { agentId } });

  return { runs, total };
}

export async function getAgentRun(runId: string) {
  const run = await prisma.agentRun.findUnique({ where: { id: runId } });
  if (!run) {
    throw new Error("run_not_found");
  }
  return run;
}
```

### API Routes
Update `src/routes/agents.ts` to add:

```typescript
// POST /agents/:id/run - Trigger new run
router.post("/:id/run", async (req, res) => {
  try {
    const { id } = req.params;
    const { input } = req.body ?? {};

    const runId = await triggerAgentRun(id, input);

    res.status(202).json({ runId });
  } catch (error: any) {
    if (error.message === "agent_not_found") {
      return res.status(404).json({ error: "agent_not_found" });
    }
    res.status(500).json({ error: "run_failed" });
  }
});

// GET /agents/:id/runs - List runs for agent
router.get("/:id/runs", async (req, res) => {
  try {
    const { id } = req.params;
    const limit = clampLimit(Number(req.query.limit) || 50);
    const offset = clampOffset(Number(req.query.offset) || 0);

    const { runs, total } = await listAgentRuns(id, limit, offset);

    res.json({ runs, total });
  } catch (error) {
    res.status(500).json({ error: "fetch_failed" });
  }
});

// GET /agent-runs/:runId - Get run details
router.get("/agent-runs/:runId", async (req, res) => {
  try {
    const { runId } = req.params;
    const run = await getAgentRun(runId);
    res.json({ run });
  } catch (error: any) {
    if (error.message === "run_not_found") {
      return res.status(404).json({ error: "run_not_found" });
    }
    res.status(500).json({ error: "fetch_failed" });
  }
});
```

---

## Season 4: Hardening

### Validation Utils
Create `src/utils/validation.ts`:

```typescript
export function validateAgentName(name: any): string {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error("name_required");
  }
  if (name.length > 500) {
    throw new Error("name_too_long");
  }
  return name.trim();
}

export function validateAgentStatus(status: any): string {
  const validStatuses = ["active", "inactive", "pending"];
  if (typeof status !== "string" || !validStatuses.includes(status)) {
    throw new Error("invalid_status");
  }
  return status;
}

export function clampLimit(limit: number, max: number = 100): number {
  if (isNaN(limit) || limit < 1) return 50;
  return Math.min(limit, max);
}

export function clampOffset(offset: number): number {
  if (isNaN(offset) || offset < 0) return 0;
  return offset;
}
```

### Apply Validation
Update `src/routes/agents.ts`:

```typescript
import {
  validateAgentName,
  validateAgentStatus,
  clampLimit,
  clampOffset,
} from "../utils/validation";

// POST /agents
router.post("/", async (req, res) => {
  try {
    const { name, status } = req.body ?? {};

    const validName = validateAgentName(name);
    const validStatus = status ? validateAgentStatus(status) : "active";

    const agent = await prisma.agent.create({
      data: { name: validName, status: validStatus },
    });

    res.status(201).json({ agent });
  } catch (error: any) {
    if (error.message === "name_required" || error.message === "name_too_long") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "invalid_status") {
      return res.status(400).json({ error: "invalid_status" });
    }
    res.status(500).json({ error: "create_failed" });
  }
});

// GET /agents - Apply clamping to limit/offset
router.get("/", async (req, res) => {
  try {
    const limit = clampLimit(Number(req.query.limit) || 50);
    const offset = clampOffset(Number(req.query.offset) || 0);

    const agents = await prisma.agent.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    res.json({ agents });
  } catch (error) {
    res.status(500).json({ error: "fetch_failed" });
  }
});
```

---

## Season 5: Telemetry

### In-Memory Metrics
Create `src/services/metrics.ts`:

```typescript
interface MetricData {
  count: number;
  lastUpdated: Date;
}

const metrics = new Map<string, MetricData>();

export function incrementMetric(key: string) {
  const current = metrics.get(key) || { count: 0, lastUpdated: new Date() };
  metrics.set(key, {
    count: current.count + 1,
    lastUpdated: new Date(),
  });
}

export function getMetrics(): Record<string, MetricData> {
  return Object.fromEntries(metrics);
}

export function getMetric(key: string): MetricData | null {
  return metrics.get(key) || null;
}
```

### Request ID Middleware
Create `src/middleware/requestId.ts`:

```typescript
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = req.headers["x-request-id"] || randomUUID();
  req.headers["x-request-id"] = requestId as string;
  res.setHeader("x-request-id", requestId);
  next();
}
```

### Apply Telemetry
Update `src/index.ts`:

```typescript
import { requestIdMiddleware } from "./middleware/requestId";
import { getMetrics, incrementMetric } from "./services/metrics";

app.use(requestIdMiddleware);

// Add metrics endpoint
app.get("/metrics/agents", (_req, res) => {
  res.json(getMetrics());
});

// In agent routes, add:
incrementMetric("agents.created");
incrementMetric("agents.runs.triggered");
// etc.
```

---

## Season 6: Task Registry v1

### Database Schema
Add Task Prisma model:

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("pending")
  priority    String   @default("medium")
  assignee    String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("tasks")
}
```

### Routes
Create `src/routes/tasks.ts`:

```typescript
import { Router } from "express";
import { prisma } from "../db/prisma";
import {
  clampLimit,
  clampOffset,
  validateTaskTitle,
  validateTaskStatus,
  validateTaskPriority,
} from "../utils/validation";

const router = Router();

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const limit = clampLimit(Number(req.query.limit) || 50);
    const offset = clampOffset(Number(req.query.offset) || 0);

    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "fetch_failed" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, assignee } = req.body ?? {};

    const validTitle = validateTaskTitle(title);
    const validStatus = status ? validateTaskStatus(status) : "pending";
    const validPriority = priority ? validateTaskPriority(priority) : "medium";

    const task = await prisma.task.create({
      data: {
        title: validTitle,
        description: description || null,
        status: validStatus,
        priority: validPriority,
        assignee: assignee || null,
      },
    });

    res.status(201).json({ task });
  } catch (error: any) {
    if (error.message === "title_required") {
      return res.status(400).json({ error: "title_required" });
    }
    res.status(500).json({ error: "create_failed" });
  }
});

// PATCH /tasks/:id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates: any = {};

    if (req.body.title) updates.title = validateTaskTitle(req.body.title);
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.status) updates.status = validateTaskStatus(req.body.status);
    if (req.body.priority) updates.priority = validateTaskPriority(req.body.priority);
    if (req.body.assignee !== undefined) updates.assignee = req.body.assignee;

    const task = await prisma.task.update({
      where: { id },
      data: updates,
    });

    res.json({ task });
  } catch (error) {
    res.status(404).json({ error: "task_not_found" });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ error: "task_not_found" });
  }
});

export default router;
```

Update `src/utils/validation.ts` with task validators:

```typescript
export function validateTaskTitle(title: any): string {
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("title_required");
  }
  return title.trim();
}

export function validateTaskStatus(status: any): string {
  const validStatuses = ["pending", "in_progress", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    throw new Error("invalid_status");
  }
  return status;
}

export function validateTaskPriority(priority: any): string {
  const validPriorities = ["low", "medium", "high", "urgent"];
  if (!validPriorities.includes(priority)) {
    throw new Error("invalid_priority");
  }
  return priority;
}
```

Register in `src/index.ts`:

```typescript
import taskRoutes from "./routes/tasks";
app.use("/tasks", taskRoutes);
```

---

## Season 7: Auth & RBAC

### Database Schema
Add User model:

```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String   @map("password_hash")
  role         String   @default("user")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```

### Auth Service
Create `src/services/auth.ts`:

```typescript
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";
const JWT_EXPIRES_IN = "7d";

export async function registerUser(email: string, password: string) {
  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("user_exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { email, passwordHash, role: "user" },
  });

  // Generate token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { user: { id: user.id, email: user.email, role: user.role }, token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("invalid_credentials");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error("invalid_credentials");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { user: { id: user.id, email: user.email, role: user.role }, token };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("invalid_token");
  }
}
```

### Auth Middleware
Create `src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const token = authHeader.substring(7);
  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}
```

### Auth Routes
Create `src/routes/auth.ts`:

```typescript
import { Router } from "express";
import { registerUser, loginUser } from "../services/auth";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: "email_and_password_required" });
    }

    const result = await registerUser(email, password);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === "user_exists") {
      return res.status(409).json({ error: "user_exists" });
    }
    res.status(500).json({ error: "registration_failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: "email_and_password_required" });
    }

    const result = await loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    if (error.message === "invalid_credentials") {
      return res.status(401).json({ error: "invalid_credentials" });
    }
    res.status(500).json({ error: "login_failed" });
  }
});

export default router;
```

Register in `src/index.ts`:

```typescript
import authRoutes from "./routes/auth";
app.use("/auth", authRoutes);

// Optionally protect routes:
import { authMiddleware } from "./middleware/auth";
app.use("/agents", authMiddleware, agentRoutes);
app.use("/tasks", authMiddleware, taskRoutes);
```

Install dependencies:
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
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

### Test Setup
Create `src/__tests__/setup.ts`:

```typescript
import { prisma } from "../db/prisma";

beforeAll(async () => {
  // Ensure test database is clean
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Clean all tables before each test
  await prisma.agentRun.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
});
```

### Agent Tests
Create `src/__tests__/agents.test.ts`:

```typescript
import request from "supertest";
import app from "../index";
import { prisma } from "../db/prisma";

describe("Agents API", () => {
  it("should create an agent", async () => {
    const res = await request(app)
      .post("/agents")
      .send({ name: "Test Agent", status: "active" });

    expect(res.status).toBe(201);
    expect(res.body.agent).toHaveProperty("id");
    expect(res.body.agent.name).toBe("Test Agent");
  });

  it("should list agents", async () => {
    await prisma.agent.create({ data: { name: "Agent 1", status: "active" } });

    const res = await request(app).get("/agents");

    expect(res.status).toBe(200);
    expect(res.body.agents).toHaveLength(1);
  });

  it("should trigger an agent run", async () => {
    const agent = await prisma.agent.create({ data: { name: "Agent 1" } });

    const res = await request(app)
      .post(`/agents/${agent.id}/run`)
      .send({ input: "test input" });

    expect(res.status).toBe(202);
    expect(res.body).toHaveProperty("runId");
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

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: blackroad_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run Prisma migrations
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/blackroad_test?schema=public
        run: |
          npx prisma migrate deploy
          npx prisma generate

      - name: Run tests
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/blackroad_test?schema=public
        run: npm test

      - name: Build
        run: npm run build
```

Update `package.json`:

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
    "supertest": "^6.3.0",
    "ts-jest": "^29.1.0"
  }
}
```

---

## Your Tasks

After I apply all these changes:

1. **Review the changes** across all files
2. **Run migrations:**
   ```bash
   npx prisma migrate dev --name add_all_seasons
   npx prisma generate
   ```
3. **Install new dependencies:**
   ```bash
   npm install
   ```
4. **Build and start:**
   ```bash
   npm run build
   npm start
   ```
5. **Run tests:**
   ```bash
   npm test
   ```
6. **Update README.md** with all new endpoints

Tell me when you're ready and I'll apply all of these changes using the Edit and Write tools.
```
