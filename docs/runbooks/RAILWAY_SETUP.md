# Railway Setup Guide - GitHub Auto-Deploy

> Clean setup for BlackRoad OS services on Railway with GitHub auto-deploy

## Overview

This guide sets up 4 core services on Railway, each connected to its GitHub repo for automatic deployments on every push to `main`.

| Service | GitHub Repo | Railway Project |
|---------|-------------|-----------------|
| Operator | `BlackRoad-OS/blackroad-os-operator` | `blackroad-os-operator` |
| API | `BlackRoad-OS/blackroad-os-api` | `blackroad-os-api` |
| Web | `BlackRoad-OS/blackroad-os-web` | `blackroad-os-web` |
| Prism Console | `BlackRoad-OS/blackroad-os-prism-console` | `blackroad-os-prism-console` |

---

## Step 1: Clean Up Failed Services

For each project with failed deployments:

1. Go to https://railway.app/dashboard
2. Click on the project (e.g., `blackroad-os-operator`)
3. Click on the service with the red/failed status
4. Click **Settings** (gear icon)
5. Scroll to bottom → **Delete Service**
6. Confirm deletion

Repeat for any failed services in:
- `blackroad-os-operator`
- `blackroad-os-api`
- `blackroad-os-web`
- `blackroad-os-prism-console`

---

## Step 2: Create Fresh Services with GitHub Auto-Deploy

### Operator Service

1. Go to project: https://railway.app → `blackroad-os-operator`
2. Click **+ New Service**
3. Select **GitHub Repo**
4. Find and select: `BlackRoad-OS/blackroad-os-operator`
5. Railway will detect the Dockerfile and start building

**After deploy succeeds:**
1. Click on the service
2. Go to **Settings** → **Networking**
3. Click **Generate Domain**
4. Copy the URL (e.g., `blackroad-os-operator-production.up.railway.app`)

**Environment Variables** (Settings → Variables):
```
PORT=8080
CATALOG_PATH=/app/agent-catalog/agents.yaml
```

---

### API Service

1. Go to project: https://railway.app → `blackroad-os-api`
2. Click **+ New Service**
3. Select **GitHub Repo**
4. Find and select: `BlackRoad-OS/blackroad-os-api`

**Environment Variables** (Settings → Variables):
```
PORT=8000
```

**Note:** The API may need a database. For now, it will start without one.

---

### Web Service

1. Go to project: https://railway.app → `blackroad-os-web`
   (Create new project if doesn't exist: **+ New Project** → name it `blackroad-os-web`)
2. Click **+ New Service**
3. Select **GitHub Repo**
4. Find and select: `BlackRoad-OS/blackroad-os-web`

**Environment Variables**:
```
PORT=3000
NODE_ENV=production
```

---

### Prism Console Service

1. Go to project: https://railway.app → `blackroad-os-prism-console`
2. Click **+ New Service**
3. Select **GitHub Repo**
4. Find and select: `BlackRoad-OS/blackroad-os-prism-console`

**Environment Variables**:
```
PORT=3000
NODE_ENV=production
```

---

## Step 3: Generate Domains

For each successfully deployed service:

1. Click on the service
2. Go to **Settings** → **Networking**
3. Under **Public Networking**, click **Generate Domain**
4. Copy the generated URL

Expected URLs:
```
Operator: https://blackroad-os-operator-production.up.railway.app
API:      https://blackroad-os-api-production.up.railway.app
Web:      https://blackroad-os-web-production.up.railway.app
Prism:    https://blackroad-os-prism-console-production.up.railway.app
```

---

## Step 4: Verify Deployments

After each service is live, test the health endpoints:

```bash
# Operator
curl https://blackroad-os-operator-production.up.railway.app/health

# API
curl https://blackroad-os-api-production.up.railway.app/health

# Web
curl https://blackroad-os-web-production.up.railway.app/health

# Prism
curl https://blackroad-os-prism-console-production.up.railway.app/api/health
```

---

## Step 5: Enable Auto-Deploy

This should be enabled by default when you connect a GitHub repo, but verify:

1. Click on the service
2. Go to **Settings** → **Source**
3. Ensure **Automatic Deployments** is ON
4. Branch should be `main`

Now every push to `main` on GitHub will trigger a new deploy.

---

## Troubleshooting

### Build Fails

1. Click on the failed deployment
2. Click **View Logs** → **Build Logs**
3. Look for the error message

Common issues:
- Missing dependencies in `requirements.txt` or `package.json`
- Dockerfile syntax errors
- Port mismatch (ensure `PORT` env var matches what app listens on)

### Service Won't Start

1. Check **Deploy Logs** (not build logs)
2. Common issues:
   - Missing environment variables
   - Database connection errors
   - Port already in use

### Domain Not Working

1. Wait 1-2 minutes after generating domain
2. Check service is actually running (green status)
3. Try `curl -v` to see detailed error

---

## Quick Reference

### Railway CLI Commands

```bash
# Link to existing project
railway link

# Deploy manually (if needed)
railway up --detach

# View logs
railway logs

# Open dashboard
railway open

# Check domain
railway domain --json
```

### Health Check URLs

| Service | Health | Version |
|---------|--------|---------|
| Operator | `/health` | `/version` |
| API | `/health` | `/version` |
| Web | `/health` | `/version` |
| Prism | `/api/health` | `/api/version` |
