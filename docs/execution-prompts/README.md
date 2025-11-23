# Execution Prompts

Complete, copy-paste ready prompts to build out all BlackRoad OS repos with all seasons at once.

---

## Quick Start

### 1. Core

```bash
cd ~/projects/blackroad-os-core
claude
```

Paste the contents of [core-all-seasons.md](./core-all-seasons.md)

### 2. API

```bash
cd ~/projects/blackroad-os-api
claude
```

Paste the contents of [api-all-seasons.md](./api-all-seasons.md)

### 3. Console

```bash
cd ~/projects/blackroad-os-prism-console
claude
```

Paste the contents of [console-all-seasons.md](./console-all-seasons.md)

---

## What These Prompts Do

Each prompt applies ALL relevant seasons to its repo:

### Core ([core-all-seasons.md](./core-all-seasons.md))
- ✅ S3.5: Agent Runs v1 (AgentRun model, trigger/history endpoints)
- ✅ S4: Hardening (validation utils, error standardization)
- ✅ S5: Telemetry (metrics, request IDs, structured logging)
- ✅ S6: Task Registry v1 (Task model, CRUD endpoints)
- ✅ S7: Auth & RBAC (User model, JWT, /auth routes)
- ✅ S8: Tests & CI (Jest, supertest, GitHub Actions)

**Result:** Full-featured backend with agents, tasks, auth, validation, metrics, and tests.

### API ([api-all-seasons.md](./api-all-seasons.md))
- ✅ S3.5: Agent Runs proxy
- ✅ S4: Error response docs
- ✅ S5: Request ID propagation, metrics proxy
- ✅ S6: Task Registry proxy
- ✅ S7: Auth proxy, optional auth middleware
- ✅ S8: Proxy tests with nock, GitHub Actions

**Result:** Complete proxy layer with documentation and tests.

### Console ([console-all-seasons.md](./console-all-seasons.md))
- ✅ S3.5: Agent runs UI (trigger form, history table)
- ✅ S4: Client validation, error mapping
- ✅ S5: Status dashboard with metrics
- ✅ S6: Tasks UI (create, list, update, delete)
- ✅ S7: Login/register, protected routes, auth context
- ✅ S8: React Testing Library tests, GitHub Actions

**Result:** Full admin dashboard with agents, tasks, auth, and tests.

---

## Execution Order

### Option A: All At Once (Fastest)

Open 3 terminal windows and paste prompts into all repos simultaneously. Claude will handle each repo independently.

**Pros:**
- Fastest way to build everything
- All features available immediately

**Cons:**
- More overwhelming to review changes
- Harder to debug if something goes wrong

### Option B: Repo by Repo (Recommended)

1. **Core first** — Apply core-all-seasons.md
   - Run migrations
   - Test with curl
   - Commit: "All seasons: complete backend"

2. **API second** — Apply api-all-seasons.md
   - Test proxy behavior
   - Commit: "All seasons: complete proxy layer"

3. **Console third** — Apply console-all-seasons.md
   - Test in browser
   - Commit: "All seasons: complete admin UI"

**Pros:**
- Easier to review and debug
- Can test end-to-end at each layer
- Clear commit history

**Cons:**
- Takes longer

### Option C: Season by Season (Most Thorough)

Use the individual PR templates in `/docs/pr-templates/` and apply one season at a time across all repos.

**Pros:**
- Most controlled approach
- Easy to understand each feature
- Best for learning the architecture

**Cons:**
- Much slower
- More repetitive

---

## After Applying Prompts

### Core
```bash
npm install
npx prisma migrate dev --name add_all_seasons
npx prisma generate
npm run build
npm test
npm start
```

Verify:
```bash
# Health
curl http://localhost:8081/health

# Create agent
curl -X POST http://localhost:8081/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","status":"active"}'

# Create task
curl -X POST http://localhost:8081/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task"}'

# Register user
curl -X POST http://localhost:8081/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### API
```bash
npm install
npm run build
npm test
npm start
```

Verify (with Core running on 8081):
```bash
# Agents via proxy
curl http://localhost:8080/agents

# Tasks via proxy
curl http://localhost:8080/tasks

# Metrics
curl http://localhost:8080/metrics/agents
```

### Console
```bash
npm install
npm run dev
```

Verify in browser:
1. http://localhost:3000/login — Register/login
2. http://localhost:3000/dashboard — See metrics
3. http://localhost:3000/agents — Manage agents, trigger runs
4. http://localhost:3000/tasks — Manage tasks

---

## Environment Variables

### Core
```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public
PORT=8081
NODE_ENV=development
JWT_SECRET=your-secret-here
```

### API
```bash
CORE_BASE_URL=http://localhost:8081
PORT=8080
NODE_ENV=development
```

### Console
```bash
AGENTS_API_URL=http://localhost:8080
# Optional: TASKS_API_URL, AUTH_API_URL (defaults to AGENTS_API_URL)
PORT=3000
NODE_ENV=development
```

---

## Troubleshooting

**"Prisma migration failed"**
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Run `npx prisma migrate reset` if needed

**"API proxy returns 502"**
- Ensure Core is running on the right port
- Check CORE_BASE_URL in API's .env
- Verify Core's /health endpoint responds

**"Console can't fetch data"**
- Ensure API is running
- Check AGENTS_API_URL in Console's .env.local
- Open browser DevTools → Network tab to see request failures

**"Tests failing"**
- Core: Ensure test database is configured
- API: Check that nock is properly mocking Core
- Console: Ensure fetch is mocked in tests

---

## Next Steps

After all repos are built:

1. **Deploy to Railway** (see `/docs/pr-templates/*.md` for Railway setup)
2. **Update season tracker** (mark all seasons as ✅ in `/docs/season-tracker.md`)
3. **Open PRs** (use templates from `/docs/pr-templates/`)
4. **Write Season 9** (jobs, webhooks, file uploads, etc.)
