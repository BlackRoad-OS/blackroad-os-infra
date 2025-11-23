# Website Buildout Tracker

Track progress of building out all BlackRoad OS websites with consistent patterns.

## Legend
- ✅ Completed
- 🚧 In progress
- ⏸️ Ready to apply
- ⬜ Not started

---

## Websites

### 1. blackroad-os-prism-console

**Type:** Admin Console
**Tech:** Next.js App Router, React 19, TypeScript
**Status:** Partially built (Agents + Auth from Seasons 1-8)

| Feature | Status | Notes |
|---------|--------|-------|
| Health endpoints | ⏸️ | Needs /health and /api/health |
| Metadata endpoints | ⏸️ | Needs /api/info and /api/version |
| Environment config | ⏸️ | Needs standardized .env.example |
| Navigation component | ⏸️ | Needs consistent nav with status indicators |
| Brand integration | ⏸️ | Import brand CSS variables |
| README update | ⏸️ | Add health/env docs |

---

### 2. blackroad-os-web

**Type:** Marketing Site
**Tech:** Next.js 14 App Router, TypeScript
**Status:** Not started

| Feature | Status | Notes |
|---------|--------|-------|
| Health endpoints | ⏸️ | /health and /api/health |
| Metadata endpoints | ⏸️ | /api/info and /api/version |
| Environment config | ⏸️ | .env.example with all vars |
| Landing page | ⏸️ | Hero, features, system status widget |
| Navigation component | ⏸️ | Links to Console/Docs/Brand/API |
| Brand integration | ⏸️ | Import brand CSS variables |
| Footer | ⏸️ | Copyright + links |
| README | ⏸️ | Complete documentation |

---

### 3. blackroad-os-home

**Type:** Landing Hub
**Tech:** Next.js 14 (static export), TypeScript
**Status:** Not started

| Feature | Status | Notes |
|---------|--------|-------|
| Health endpoints | ⏸️ | /health (via custom server or serverless) |
| Metadata endpoints | ⏸️ | /api/info and /api/version |
| Environment config | ⏸️ | .env.example |
| Hub page | ⏸️ | Grid of links to all services |
| System status widget | ⏸️ | Health check indicators |
| Navigation component | ⏸️ | Minimal nav bar |
| Brand integration | ⏸️ | Import brand CSS variables |
| README | ⏸️ | Static export instructions |

---

### 4. blackroad-os-brand

**Type:** Brand Guidelines
**Tech:** Next.js (static export), TypeScript
**Status:** Not started

| Feature | Status | Notes |
|---------|--------|-------|
| Health endpoints | ⏸️ | /health (static or serverless) |
| Metadata endpoints | ⏸️ | /api/info and /api/version |
| Environment config | ⏸️ | .env.example |
| Brand CSS variables | ⏸️ | src/styles/brand.css with tokens |
| Colors page | ⏸️ | /colors - show palette with hex values |
| Typography page | ⏸️ | /typography - font stacks and sizes |
| Logos page | ⏸️ | /logos - logo variants and usage rules |
| Package export | ⏸️ | Export as @blackroad-os/brand for other repos |
| Navigation component | ⏸️ | Nav to sections |
| README | ⏸️ | Usage instructions for importing brand |

---

### 5. blackroad-os-docs

**Type:** Documentation Portal
**Tech:** Next.js 14 Pages Router, TypeScript
**Status:** Partially built (sidebar nav exists)

| Feature | Status | Notes |
|---------|--------|-------|
| Health endpoints | ⏸️ | /health and /api/health |
| Metadata endpoints | ⏸️ | /api/info and /api/version |
| Environment config | ⏸️ | .env.example |
| Homepage | ⏸️ | OS overview with links |
| Health status widget | ⏸️ | Show service status at top |
| Services docs | ⏸️ | Add docs/services/<service>.md for each website |
| Navigation component | ⏸️ | Integrate with existing sidebar |
| Brand integration | ⏸️ | Import brand CSS variables |
| README | ⏸️ | Update with health/env info |

---

## Execution Order

### Option A: All Websites Simultaneously

Open 5 terminals and paste the website prompt into each:

```bash
# Terminal 1
cd ~/projects/blackroad-os-prism-console
claude
# Paste: docs/execution-prompts/websites-all-features.md

# Terminal 2
cd ~/projects/blackroad-os-web
claude
# Paste: docs/execution-prompts/websites-all-features.md

# Terminal 3
cd ~/projects/blackroad-os-home
claude
# Paste: docs/execution-prompts/websites-all-features.md

# Terminal 4
cd ~/projects/blackroad-os-brand
claude
# Paste: docs/execution-prompts/websites-all-features.md

# Terminal 5
cd ~/projects/blackroad-os-docs
claude
# Paste: docs/execution-prompts/websites-all-features.md
```

**Pros:**
- Fastest way to build everything
- All sites get consistent patterns at once

**Cons:**
- Harder to review changes across 5 repos
- More overwhelming

### Option B: Sequential (Recommended)

Build in this order:

1. **blackroad-os-brand** (foundation)
   - Creates the design system other sites will import
   - Export CSS variables and tokens

2. **blackroad-os-web** (marketing)
   - Public-facing site
   - Tests brand integration

3. **blackroad-os-home** (hub)
   - Links to all other sites
   - Depends on knowing URLs

4. **blackroad-os-docs** (documentation)
   - Documents all the sites
   - Needs info from other sites

5. **blackroad-os-prism-console** (admin)
   - Already has Seasons 1-8 applied
   - Just needs health/nav/branding polish

**Pros:**
- Easier to review and test
- Brand system is ready when other sites need it
- Clear dependencies

**Cons:**
- Takes longer overall

---

## After Building Each Website

### Testing Checklist

- [ ] `npm install` succeeds
- [ ] `npm run dev` starts dev server
- [ ] `npm run build` builds successfully
- [ ] `npm start` runs production server
- [ ] `GET /health` returns `{ status: "ok", service: "..." }`
- [ ] `GET /api/info` returns service metadata
- [ ] `GET /api/version` returns version info
- [ ] Navigation links work
- [ ] Brand CSS variables are applied
- [ ] Mobile responsive
- [ ] README is complete

### Commit Pattern

```bash
git add .
git commit -m "Website buildout: health endpoints, nav, branding, docs"
git push origin main
```

---

## Common Environment Variables

All websites should support these (copy to each `.env.example`):

```bash
# Service Identity
NEXT_PUBLIC_SERVICE_NAME=BlackRoad <Site Name>
NEXT_PUBLIC_SERVICE_ID=<repo-name>

# Service URLs
NEXT_PUBLIC_HOME_URL=https://home.blackroad.systems
NEXT_PUBLIC_WEB_URL=https://blackroad.systems
NEXT_PUBLIC_CONSOLE_URL=https://console.blackroad.systems
NEXT_PUBLIC_DOCS_URL=https://docs.blackroad.systems
NEXT_PUBLIC_BRAND_URL=https://brand.blackroad.systems

# API URLs
NEXT_PUBLIC_CORE_API_URL=https://core.blackroad.systems
NEXT_PUBLIC_PUBLIC_API_URL=https://api.blackroad.systems

# Server Config
PORT=8080
NODE_ENV=production

# Build Info (set by CI)
BUILD_TIME=
npm_package_version=
```

---

## Troubleshooting

**"Health endpoint returns 404"**
- Ensure route file exists at `src/app/health/route.ts` (App Router)
- Or `pages/api/health.ts` (Pages Router)
- Check `npm run build && npm start` works (not just dev)

**"Brand CSS variables not working"**
- Ensure `@import` is at top of `globals.css`
- Verify brand repo exports `styles/brand.css`
- Check browser DevTools → Computed styles for `--br-*` variables

**"Navigation links broken"**
- Check environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_CONSOLE_URL)`
- Ensure `.env.local` exists with all required vars
- Restart dev server after changing `.env`

**"Static export fails"**
- Remove server-side API routes (use serverless functions instead)
- Or use a custom server for static sites that need /health

---

## Next Steps

After all websites are built:

1. **Deploy to Railway/Vercel**
   - Configure environment variables in deployment
   - Set up custom domains
   - Test health endpoints in production

2. **Create Website Package (Optional)**
   - Create `@blackroad-os/web-common` package with shared components:
     - Navigation component
     - Footer component
     - Health status widget
   - Import in all websites for consistency

3. **Write Season 9 for Backend**
   - Jobs queue
   - Webhooks
   - File uploads
   - Real-time features

4. **Monitor & Iterate**
   - Set up uptime monitoring for health endpoints
   - Gather user feedback
   - Refine branding and UX
