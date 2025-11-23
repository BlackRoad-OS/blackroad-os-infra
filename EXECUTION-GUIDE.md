# BlackRoad OS Execution Guide

Complete step-by-step guide to building out the entire BlackRoad OS ecosystem.

---

## Overview

You now have **ready-to-paste prompts** for:

### Backend Services (3 repos)
- `blackroad-os-core` — Database + business logic
- `blackroad-os-api` — Public API proxy
- `blackroad-os-prism-console` — Admin UI

### Websites (5 repos)
- `blackroad-os-prism-console` — Admin console (enhanced with health/nav/branding)
- `blackroad-os-web` — Marketing site
- `blackroad-os-home` — Landing hub
- `blackroad-os-brand` — Brand guidelines
- `blackroad-os-docs` — Documentation portal

---

## Quick Start: Execute Everything

### Option 1: Backend Services First (Recommended)

#### Step 1: Core
```bash
cd ~/projects/blackroad-os-core
claude
```

Paste contents of: `docs/execution-prompts/core-all-seasons.md`

After Claude finishes:
```bash
npm install
npx prisma migrate dev --name add_all_seasons
npx prisma generate
npm run build
npm test
npm start
```

Test:
```bash
curl http://localhost:8081/health
curl -X POST http://localhost:8081/agents -H "Content-Type: application/json" -d '{"name":"Test","status":"active"}'
```

#### Step 2: API
```bash
cd ~/projects/blackroad-os-api
claude
```

Paste contents of: `docs/execution-prompts/api-all-seasons.md`

After Claude finishes:
```bash
npm install
npm run build
npm test
npm start
```

Test (with Core still running):
```bash
curl http://localhost:8080/health
curl http://localhost:8080/agents
```

#### Step 3: Console
```bash
cd ~/projects/blackroad-os-prism-console
claude
```

Paste contents of: `docs/execution-prompts/console-all-seasons.md`

After Claude finishes:
```bash
npm install
npm run dev
```

Visit in browser:
- http://localhost:3000/login
- http://localhost:3000/dashboard
- http://localhost:3000/agents
- http://localhost:3000/tasks

---

### Option 2: Websites (After or Parallel to Backend)

#### Step 1: Brand System (Foundation)
```bash
cd ~/projects/blackroad-os-brand
claude
```

Paste contents of: `docs/execution-prompts/websites-all-features.md`

After Claude finishes:
```bash
npm install
npm run build
npm start
```

#### Step 2: Marketing Site
```bash
cd ~/projects/blackroad-os-web
claude
```

Paste contents of: `docs/execution-prompts/websites-all-features.md`

After Claude finishes:
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

#### Step 3: Landing Hub
```bash
cd ~/projects/blackroad-os-home
claude
```

Paste contents of: `docs/execution-prompts/websites-all-features.md`

After Claude finishes:
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

#### Step 4: Documentation
```bash
cd ~/projects/blackroad-os-docs
claude
```

Paste contents of: `docs/execution-prompts/websites-all-features.md`

After Claude finishes:
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

#### Step 5: Console (Polish)
```bash
cd ~/projects/blackroad-os-prism-console
claude
```

Paste contents of: `docs/execution-prompts/websites-all-features.md`

(This adds health/nav/branding polish to the already-built admin console)

---

## What Gets Built

### Backend Services

**Core:**
- ✅ AgentRun model (trigger runs, track history)
- ✅ Task model (CRUD with priority/assignee)
- ✅ User model (JWT authentication)
- ✅ Validation utils + error codes
- ✅ Metrics + request IDs
- ✅ Tests (Jest + supertest)
- ✅ CI (GitHub Actions)

**API:**
- ✅ Agent runs proxy
- ✅ Tasks proxy
- ✅ Auth proxy
- ✅ Request ID propagation
- ✅ Metrics proxy
- ✅ Tests (nock)
- ✅ CI

**Console:**
- ✅ Agent runs UI (trigger + history)
- ✅ Tasks UI (create/list/update/delete)
- ✅ Auth UI (login/register)
- ✅ Protected routes
- ✅ Dashboard with metrics
- ✅ Tests (React Testing Library)
- ✅ CI

### Websites

**All websites get:**
- ✅ Health endpoints (`/health`, `/api/health`)
- ✅ Metadata endpoints (`/api/info`, `/api/version`)
- ✅ Standardized `.env.example`
- ✅ Consistent navigation bar
- ✅ Brand CSS variables
- ✅ System status widgets
- ✅ Complete README docs

**Plus site-specific features:**

- **Web:** Hero, features section, service status dashboard
- **Home:** Hub links to all services
- **Brand:** Color/typography/logo pages, exportable CSS tokens
- **Docs:** Service documentation pages
- **Console:** Health/nav polish (already has full admin features)

---

## Timeline Estimates

### Backend Services (Option 1)
- **Core:** 20-30 minutes (Claude edits + migration + testing)
- **API:** 10-15 minutes (Claude edits + testing)
- **Console:** 20-30 minutes (Claude edits + testing)
- **Total:** ~1-1.5 hours

### Websites (Option 2)
- **Brand:** 15-20 minutes
- **Web:** 20-25 minutes
- **Home:** 15-20 minutes
- **Docs:** 15-20 minutes
- **Console polish:** 10-15 minutes
- **Total:** ~1.5-2 hours

### Everything
**Grand total:** ~2.5-3.5 hours to build entire BlackRoad OS ecosystem

---

## Tracking Progress

### Backend Progress
See `docs/season-tracker.md` and update as you complete each season:

```markdown
## `blackroad-os-core`
- [x] S3.5 Agent Runs v1
- [x] S4 Hardening
- [x] S5 Telemetry
...
```

### Website Progress
See `docs/website-tracker.md` and update as you complete each website:

```markdown
### 1. blackroad-os-web
| Feature | Status | Notes |
|---------|--------|-------|
| Health endpoints | ✅ | /health working |
...
```

---

## After Execution

### 1. Test Everything Locally

**Backend stack:**
```bash
# Terminal 1: Core on 8081
cd ~/projects/blackroad-os-core && npm start

# Terminal 2: API on 8080
cd ~/projects/blackroad-os-api && npm start

# Terminal 3: Console on 3000
cd ~/projects/blackroad-os-prism-console && npm run dev
```

Visit http://localhost:3000 and test:
- Login/register
- Create agents
- Trigger runs
- Create tasks
- View dashboard metrics

**Website stack:**
```bash
# Open each in separate terminals
cd ~/projects/blackroad-os-web && npm run dev       # 3000
cd ~/projects/blackroad-os-home && npm run dev      # 3001
cd ~/projects/blackroad-os-brand && npm run dev     # 3002
cd ~/projects/blackroad-os-docs && npm run dev      # 3003
```

### 2. Commit Everything

For each repo:
```bash
git status
git add .
git commit -m "Complete buildout: all seasons / website features"
git push origin main
```

### 3. Deploy to Railway

See PR templates in `docs/pr-templates/` for Railway configuration.

### 4. Update Documentation

- Mark all trackers as ✅
- Open PRs with provided templates
- Update READMEs as needed

---

## Troubleshooting

### "Claude says 'repo not found'"
- Make sure you're `cd` into the correct repo before running `claude`
- Check `pwd` to verify location

### "npm install fails"
- Check Node.js version (need Node 20+)
- Try `rm -rf node_modules package-lock.json && npm install`

### "Migration fails in Core"
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env.local`
- Try `npx prisma migrate reset` to start fresh

### "API returns 502"
- Make sure Core is running first
- Check `CORE_BASE_URL` in API's `.env`
- Verify Core's `/health` responds: `curl http://localhost:8081/health`

### "Console can't login"
- Make sure API and Core are running
- Check `AGENTS_API_URL` in Console's `.env.local`
- Open browser DevTools → Network tab to see failed requests

### "Website health endpoint 404"
- Check route file exists at `src/app/health/route.ts` (App Router)
- Or `pages/api/health.ts` (Pages Router)
- Try `npm run build && npm start` (not just dev mode)

---

## Need Help?

- 📖 [Full Documentation](./docs/)
- 📋 [Season Tracker](./docs/season-tracker.md)
- 🌐 [Website Tracker](./docs/website-tracker.md)
- 📝 [PR Templates](./docs/pr-templates/)
- 🚀 [How to Build a Lane](./runbooks/how-to-build-a-lane.md)

---

## What's Next?

After building everything:

1. **Deploy to production** (Railway/Vercel)
2. **Set up monitoring** (health check pings)
3. **Write Season 9:**
   - Job queue (background processing)
   - Webhooks (event notifications)
   - File uploads (agent resources)
   - Real-time features (WebSockets/SSE)
4. **Add more lanes:**
   - Notifications
   - Jobs
   - Analytics
   - etc.

The pattern is established — just copy `_lane-template.md` and follow the runbook!
