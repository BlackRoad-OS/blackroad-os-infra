# How to Build a Lane — BlackRoad OS Runbook

**Status:** ✅ Active
**Owner:** Platform Team
**Last Updated:** 2025-11-22

---

## What is a Lane?

A **"Lane"** in BlackRoad OS is a complete vertical slice of functionality that spans from the user interface down to the database. It represents a coherent feature with:

- **UI** in Prism Console (forms, tables, views)
- **API proxy** in blackroad-os-api (public surface)
- **Business logic** in blackroad-os-core (CRUD operations)
- **Database persistence** in PostgreSQL (Prisma models)

**Example:** Agent Registry v1 is the canonical lane — it provides CRUD for Agents with a full UI, API, database stack.

---

## When to Build a Lane vs a Single-Service Feature

### Build a Lane when:

✅ The feature has **user-facing UI** in Prism Console
✅ The feature needs **persistent data** in the database
✅ The feature is **part of the public API surface**
✅ The feature spans **multiple services** (Console → API → Core → DB)
✅ You want **consistent patterns** across the codebase

### Build a single-service feature when:

❌ It's an internal utility or helper function
❌ It's a background job or cron task with no UI
❌ It's a one-off migration or data script
❌ It only touches one repo and doesn't need cross-service integration

---

## Lane Architecture Pattern

Every lane follows this architecture:

```
User → Prism Console UI → Console API Route → Public API (Proxy) → Core Logic → Database
         (Next.js)           (/api/...)         (Express)          (Prisma)    (Postgres)
```

**Key Principles:**

1. **Core owns data** — Prisma models and business logic live in `blackroad-os-core`
2. **API proxies** — `blackroad-os-api` forwards requests without owning logic
3. **Console provides UX** — `blackroad-os-prism-console` handles UI/UX only
4. **Environment-based config** — Each service points upstream via env vars
5. **Health checks everywhere** — Every service exposes `/health` for Railway

---

## Step-by-Step: Building a Lane

### Prerequisites

- [ ] Node.js 20+ installed locally
- [ ] Access to all three repos: `blackroad-os-core`, `blackroad-os-api`, `blackroad-os-prism-console`
- [ ] PostgreSQL database (Railway or local)
- [ ] Basic understanding of Express, Next.js, and Prisma

---

### Step 1 — Design the Domain

Before writing code, answer these questions:

- [ ] **Entity name** (singular): `<Entity>` (e.g., Agent, Task, Job)
- [ ] **Entity name** (plural): `<entities>` (e.g., agents, tasks, jobs)
- [ ] **Core fields** (id is automatic):
  - Name? Description? Status? Owner? Timestamps?
- [ ] **Lifecycle states** (if applicable):
  - Example: Agent has `status: "active" | "inactive" | "pending"`
- [ ] **UI requirements**:
  - Create form? List view? Detail view? Filters? Search?
- [ ] **API surface**:
  - Public or internal only?
  - Read-only or full CRUD?

**Output:** A simple spec document or GitHub issue with entity definition.

---

### Step 2 — Implement in Core

Work in the `blackroad-os-core` repository.

#### 2.1 Define Prisma Model

Edit `prisma/schema.prisma` and add your model:

```prisma
model <Entity> {
  id        String   @id @default(cuid())
  name      String
  status    String   @default("active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("<table_name>")
}
```

**Checklist:**
- [ ] Fields match your design
- [ ] Use `@map` for snake_case database columns
- [ ] Use `@@map` for table name if different from model name
- [ ] Include `createdAt` and `updatedAt` for audit trail

#### 2.2 Run Migration

```bash
cd ~/projects/blackroad-os-core

# Create and apply migration
npx prisma migrate dev --name init_<entity_plural>

# Generate Prisma Client
npx prisma generate
```

**Checklist:**
- [ ] Migration creates the table
- [ ] Check `prisma/migrations/` for new migration folder
- [ ] Prisma Client regenerated successfully

#### 2.3 Create CRUD Routes

Create `src/routes/<entity-plural>.ts`:

```typescript
import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

/**
 * GET /<entity-plural>
 * List all entities
 */
router.get("/<entity-plural>", async (_req, res) => {
  try {
    const <entity-plural> = await prisma.<entity>.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json({ <entity-plural> });
  } catch (err) {
    console.error("[core] GET /<entity-plural> error", err);
    res.status(500).json({ error: "internal_error" });
  }
});

/**
 * POST /<entity-plural>
 * Create new entity
 */
router.post("/<entity-plural>", async (req, res) => {
  try {
    const { name, status } = req.body ?? {};

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "name_required" });
    }

    const <entity> = await prisma.<entity>.create({
      data: {
        name,
        status: typeof status === "string" ? status : "active"
      }
    });

    res.status(201).json({ <entity> });
  } catch (err) {
    console.error("[core] POST /<entity-plural> error", err);
    res.status(500).json({ error: "internal_error" });
  }
});

export default router;
```

**Checklist:**
- [ ] Import `prisma` from `src/db/prisma.ts`
- [ ] Handle errors gracefully (500 for server errors, 400 for validation)
- [ ] Return consistent JSON format: `{ <entity-plural>: [...] }` or `{ <entity>: {...} }`
- [ ] Add console.error logging for debugging

#### 2.4 Register Router

Edit `src/index.ts`:

```typescript
import <entity>Router from './routes/<entity-plural>';

// ... existing code ...

app.use(<entity>Router);
```

**Checklist:**
- [ ] Import the new router
- [ ] Add `app.use(<entity>Router)` before `app.listen()`
- [ ] Routes are mounted at root level (router itself has `/<entity-plural>`)

#### 2.5 Update README

Add documentation to `README.md`:

```markdown
## <Entity> Registry

- **Endpoints:**
  - `GET /<entity-plural>` – List all <entities>
  - `POST /<entity-plural>` – Create new <entity>

Example:
\`\`\`bash
curl -X POST http://localhost:8081/<entity-plural> \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Example <Entity>","status":"active"}'

curl http://localhost:8081/<entity-plural>
\`\`\`
```

**Checklist:**
- [ ] Document all endpoints
- [ ] Include request/response examples
- [ ] Note required vs optional fields

#### 2.6 Test Locally

```bash
cd ~/projects/blackroad-os-core

export DATABASE_URL="postgresql://user:pass@localhost:5432/blackroad_dev"
export PORT=8081

npm install
npm run build
npm start
```

Test with curl:

```bash
# Create
curl -X POST http://localhost:8081/<entity-plural> \
  -H "Content-Type: application/json" \
  -d '{"name":"Test <Entity>","status":"active"}'

# List
curl http://localhost:8081/<entity-plural>
```

**Checklist:**
- [ ] Server starts without errors
- [ ] POST creates entity and returns 201
- [ ] GET returns created entity
- [ ] Check database directly to confirm persistence

---

### Step 3 — Wire API Proxy

Work in the `blackroad-os-api` repository.

#### 3.1 Add Proxy Route

Edit `src/index.ts`:

```typescript
// Find existing proxy routes section
app.use("/<entity-plural>", createProxyRouter(serviceClients.core));
```

**That's it!** The generic proxy router already handles:
- Forwarding all HTTP methods (GET, POST, PUT, DELETE)
- Forwarding headers, query params, request body
- Returning exact status codes from Core
- Error handling with 502 responses

**Checklist:**
- [ ] Added one line to `src/index.ts`
- [ ] Verify `serviceClients.core` points to Core via `CORE_BASE_URL`

#### 3.2 Update README

Add to `README.md`:

```markdown
## <Entity> Registry (Proxy)

- **Endpoints:** `/<entity-plural>` → proxied to Core
- **Environment:** `CORE_BASE_URL` must point to `blackroad-os-core`

Example:
\`\`\`bash
curl http://localhost:8080/<entity-plural>
\`\`\`
```

**Checklist:**
- [ ] Document proxy behavior
- [ ] Note dependency on `CORE_BASE_URL`

#### 3.3 Test Locally

```bash
cd ~/projects/blackroad-os-api

export CORE_BASE_URL=http://localhost:8081
export PORT=8080

npm install
npm run build
npm start
```

Test:

```bash
# Create via API (proxies to Core)
curl -X POST http://localhost:8080/<entity-plural> \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","status":"active"}'

# List via API
curl http://localhost:8080/<entity-plural>
```

**Checklist:**
- [ ] API server starts without errors
- [ ] Requests successfully proxy to Core
- [ ] Responses match Core's responses exactly

---

### Step 4 — Add Console API Route

Work in the `blackroad-os-prism-console` repository.

#### 4.1 Create API Route

Create `src/app/api/<entity-plural>/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

export async function GET() {
  if (!serverConfig.<entity>ApiUrl) {
    return NextResponse.json(
      { error: '<ENTITY>_API_URL is not configured' },
      { status: 503 }
    );
  }

  const url = new URL('/<entity-plural>', serverConfig.<entity>ApiUrl);

  try {
    const response = await fetch(url.toString(), { cache: 'no-store' });
    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to fetch <entities>' },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  if (!serverConfig.<entity>ApiUrl) {
    return NextResponse.json(
      { error: '<ENTITY>_API_URL is not configured' },
      { status: 503 }
    );
  }

  const url = new URL('/<entity-plural>', serverConfig.<entity>ApiUrl);

  try {
    const body = await request.json();
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: payload.error || 'Unable to create <entity>' },
        { status: response.status }
      );
    }

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create <entity>' },
      { status: 502 }
    );
  }
}
```

**Checklist:**
- [ ] Both GET and POST handlers implemented
- [ ] Uses `serverConfig.<entity>ApiUrl` from config
- [ ] Returns 503 if API URL not configured
- [ ] Proper error handling with 502 for network errors

#### 4.2 Update Config (if needed)

If you need a new env var, edit `src/lib/config.ts`:

```typescript
export const serverConfig = {
  // ... existing config ...
  <entity>ApiUrl: readEnv('<ENTITY>_API_URL', { optional: isDev }),
};
```

**Checklist:**
- [ ] Add env var to serverConfig
- [ ] Mark as optional in development if appropriate

#### 4.3 Update .env.example

Add to `.env.example`:

```bash
# <Entity> Registry
<ENTITY>_API_URL=http://localhost:8080
```

**Checklist:**
- [ ] Add env var with example value
- [ ] Add comment explaining purpose

---

### Step 5 — Build UI Page

Still in `blackroad-os-prism-console`.

#### 5.1 Create Page Component

Create `src/app/<entity-plural>/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

type <Entity> = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
};

type <Entities>Response = {
  <entity-plural>: <Entity>[];
  error?: string;
};

export default function <Entities>Page() {
  const [<entity-plural>, set<Entities>] = useState<<Entity>[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const load<Entities> = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/<entity-plural>', { cache: 'no-store' });
      const payload = (await response.json()) as <Entities>Response;
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to load <entities>');
      }
      set<Entities>(payload.<entity-plural> || []);
    } catch (err) {
      set<Entities>([]);
      setError(err instanceof Error ? err.message : 'Unable to load <entities>');
    } finally {
      setLoading(false);
    }
  };

  const create<Entity> = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/<entity-plural>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, status })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to create <entity>');
      }

      setSuccessMessage(`<Entity> "${name}" created successfully`);
      setName('');
      setStatus('active');
      await load<Entities>();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create <entity>');
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    load<Entities>();
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h1><Entities></h1>
        <p className="muted">
          Manage <entities> for BlackRoad OS
        </p>
      </div>

      <div className="card">
        <h3>Create <Entity></h3>
        <form onSubmit={create<Entity>} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          <input
            type="text"
            placeholder="<Entity> name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={creating}
            style={{ flex: '1 1 200px', padding: '8px' }}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={creating}
            style={{ padding: '8px' }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <button type="submit" disabled={creating || !name} style={{ padding: '8px 16px' }}>
            {creating ? 'Creating...' : 'Create <Entity>'}
          </button>
        </form>

        {successMessage && (
          <p className="status-ok" style={{ marginTop: '12px' }}>
            {successMessage}
          </p>
        )}

        {error && (
          <p className="status-bad" style={{ marginTop: '12px' }}>
            {error}
          </p>
        )}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3><Entity> List ({<entity-plural>.length})</h3>
          <button onClick={load<Entities>} disabled={loading} style={{ padding: '6px 12px' }}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading && <p className="muted">Loading <entities>...</p>}

        {!loading && <entity-plural>.length === 0 && (
          <p className="muted">No <entities> yet. Create one above.</p>
        )}

        {!loading && <entity-plural>.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Created</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {<entity-plural>.map((<entity>) => (
                <tr key={<entity>.id}>
                  <td><strong>{<entity>.name}</strong></td>
                  <td>
                    <span className="muted">{<entity>.status}</span>
                  </td>
                  <td className="muted">{new Date(<entity>.createdAt).toLocaleString()}</td>
                  <td className="muted" style={{ fontSize: '0.85em', fontFamily: 'monospace' }}>
                    {<entity>.id.substring(0, 12)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
```

**Checklist:**
- [ ] Replace all `<Entity>`, `<entity>`, `<Entities>`, `<entity-plural>` with actual names
- [ ] Customize form fields to match your entity
- [ ] Customize table columns to show relevant fields
- [ ] Use existing Prism Console CSS classes (`.card`, `.table`, `.status-ok`, etc.)

#### 5.2 Add Navigation Link

Edit `src/components/layout/AppShell.tsx`:

```typescript
const navLinks: { href: Route; label: string }[] = [
  { href: '/', label: 'Overview' },
  { href: '/status', label: 'Status' },
  { href: '/agents', label: 'Agents' },
  { href: '/<entity-plural>', label: '<Entities>' },  // Add this
];
```

**Checklist:**
- [ ] Add link to navigation array
- [ ] Use proper capitalization for label

#### 5.3 Update README

Add to `README.md`:

```markdown
## <Entity> Registry

The console includes a `/<entity-plural>` page for managing <entities>.

- **Environment Variable:** `<ENTITY>_API_URL` – base URL for blackroad-os-api
- **Features:**
  - Create <entities>
  - View all <entities>
  - Real-time updates

### Local Testing

\`\`\`bash
export <ENTITY>_API_URL=http://localhost:8080
npm run dev
# Open http://localhost:3000/<entity-plural>
\`\`\`
```

**Checklist:**
- [ ] Document env var
- [ ] Explain how to access the page
- [ ] Include local testing steps

---

### Step 6 — Test End-to-End

Run all three services and test the full flow.

#### 6.1 Start All Services

**Terminal 1 - Core:**
```bash
cd ~/projects/blackroad-os-core
export DATABASE_URL="postgresql://..."
export PORT=8081
npm start
```

**Terminal 2 - API:**
```bash
cd ~/projects/blackroad-os-api
export CORE_BASE_URL=http://localhost:8081
export PORT=8080
npm start
```

**Terminal 3 - Console:**
```bash
cd ~/projects/blackroad-os-prism-console
export <ENTITY>_API_URL=http://localhost:8080
npm run dev
```

#### 6.2 Manual Testing Checklist

- [ ] **Core direct test:** curl to Core endpoints works
- [ ] **API proxy test:** curl to API endpoints returns same data as Core
- [ ] **Console loads:** Navigate to `http://localhost:3000/<entity-plural>`
- [ ] **Create form works:** Fill form and submit
- [ ] **Success message shows:** Green success message appears
- [ ] **Table updates:** New entity appears in table
- [ ] **Database persistence:** Check DB directly to confirm entity exists
- [ ] **Refresh works:** Click refresh button and see all entities
- [ ] **Error handling:** Disconnect a service and verify error messages

---

### Step 7 — Commit & Push

#### 7.1 Core Changes

```bash
cd ~/projects/blackroad-os-core
git checkout -b feat/<entity>-registry-v1
git add prisma/ src/ README.md package.json
git commit -m "Add <Entity> Registry to Core

- Add <Entity> Prisma model
- Add /< entity-plural> CRUD endpoints
- Update README with documentation"
git push origin feat/<entity>-registry-v1
```

#### 7.2 API Changes

```bash
cd ~/projects/blackroad-os-api
git checkout -b feat/<entity>-registry-v1
git add src/ README.md
git commit -m "Wire /<entity-plural> proxy to Core

- Add /<entity-plural> proxy route
- Update README with proxy documentation"
git push origin feat/<entity>-registry-v1
```

#### 7.3 Console Changes

```bash
cd ~/projects/blackroad-os-prism-console
git checkout -b feat/<entity>-registry-v1
git add src/ .env.example README.md
git commit -m "Add <Entity> Registry UI

- Add /<entity-plural> page with create form and table
- Add /api/<entity-plural> proxy route
- Update navigation with <Entities> link
- Document <ENTITY>_API_URL in README and .env.example"
git push origin feat/<entity>-registry-v1
```

**Checklist:**
- [ ] All three repos have feature branches
- [ ] Commits have clear messages
- [ ] Changes pushed to GitHub

---

### Step 8 — Deploy to Railway

#### 8.1 Set Environment Variables

For each Railway service:

**Core:**
- `DATABASE_URL` — Auto-set by Railway Postgres plugin
- `PORT` — Auto-set by Railway
- `NODE_ENV=production`

**API:**
- `CORE_BASE_URL` — Internal Railway URL (e.g., `http://blackroad-os-core.railway.internal:8081`)
- `PORT` — Auto-set by Railway
- `NODE_ENV=production`

**Console:**
- `<ENTITY>_API_URL` — Public or internal API URL (e.g., `https://api.blackroad.systems`)
- `PORT` — Auto-set by Railway
- `NODE_ENV=production`

**Checklist:**
- [ ] All env vars set in Railway dashboard
- [ ] Internal URLs use Railway's `.railway.internal` domain
- [ ] Public URLs use actual domain names

#### 8.2 Deploy Services

Deploy in this order:

1. **Core first** (migrations run automatically)
2. **API second** (after Core is healthy)
3. **Console third** (after API is healthy)

**Checklist:**
- [ ] Core deploys successfully
- [ ] Core health check passes (`/health` returns 200)
- [ ] API deploys successfully
- [ ] API health check passes
- [ ] Console deploys successfully
- [ ] Console health check passes

#### 8.3 Smoke Test in Production

- [ ] Open production Console URL
- [ ] Navigate to `/<entity-plural>`
- [ ] Create an entity via the form
- [ ] Verify it appears in the table
- [ ] Check Railway logs for any errors

---

## Common Pitfalls & Solutions

### Problem: Prisma client not regenerating

**Solution:**
```bash
npm run prisma:generate
# or
npx prisma generate
```

### Problem: Migration fails in Railway

**Solution:**
- Check `DATABASE_URL` is set correctly
- Run migrations locally first: `npx prisma migrate dev`
- Push schema: `npx prisma db push` (for prototyping)

### Problem: Proxy returns 502

**Solution:**
- Check `CORE_BASE_URL` is correct
- Verify Core service is running and healthy
- Check Railway internal URLs (use `.railway.internal`)

### Problem: Console shows "API URL not configured"

**Solution:**
- Set `<ENTITY>_API_URL` in Railway environment
- Restart Console service after setting env vars

### Problem: CORS errors in browser

**Solution:**
- Console API routes (`/api/*`) run server-side, no CORS needed
- If calling external API directly from browser, add CORS middleware

---

## Reference: Agent Registry v1

See the complete working example at:
- [docs/lanes/agent-registry-v1.md](../docs/lanes/agent-registry-v1.md)

Use the template at:
- [docs/lanes/_lane-template.md](../docs/lanes/_lane-template.md)

---

## Summary Checklist

Before marking a lane "complete," ensure:

- [ ] Core has Prisma model + CRUD routes
- [ ] API has proxy route configured
- [ ] Console has UI page + API route
- [ ] All READMEs updated
- [ ] Local testing passes (all 3 services)
- [ ] Code committed and pushed
- [ ] Railway env vars set
- [ ] Production smoke test passes
- [ ] Documentation created (lane overview doc)

---

**Questions?** Check the [Agent Registry v1 example](../docs/lanes/agent-registry-v1.md) or ask the Platform Team.
