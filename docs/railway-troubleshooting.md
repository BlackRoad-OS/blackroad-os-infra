# Railway Deployment Troubleshooting Guide

This guide helps diagnose and fix common Railway deployment failures for BlackRoad OS services.

---

## 🚨 When All Services Fail Simultaneously

If you see multiple services failing at once (like 10+ failures within a few hours), the issue is almost certainly **infrastructure-wide**, not service-specific.

### Root Cause Priority Order

1. **Missing or invalid environment variables** (90% probability)
2. **Incomplete Dockerfiles** (70% probability)
3. **Region/workspace capacity issues** (50% probability)
4. **Broken GitHub → Railway sync** (30% probability)

---

## 🔍 Quick Diagnosis Steps

### Step 1: Check Railway Project Settings

1. Go to Railway dashboard → Your project
2. Check **Settings** → **General**
3. Verify the project is active and not paused

### Step 2: Inspect Any Failing Service

1. Click on a failing service in the project view
2. Go to **Deployments** → Click the failed deployment
3. Read the **Build Logs** - the error will tell you what's wrong

### Step 3: Common Error Patterns

| Error Message | Likely Cause | Fix |
|---------------|--------------|-----|
| `ARG XYZ is not set` | Missing build arg | Add to Railway service variables |
| `Cannot find module` | Missing dependency | Check package.json or run npm install |
| `ENOENT: no such file` | Missing file in build | Check Dockerfile COPY commands |
| `exited with code 1` | Start command failed | Check start script and PORT binding |
| `no Dockerfile found` | Missing Dockerfile | Create Dockerfile in repo root |
| `failed to connect` | Missing database URL | Set DATABASE_URL in Railway |
| `SIGTERM` | Resource limit | Check memory/CPU usage |

---

## 🛠️ Root Cause #1: Missing Environment Variables

### Symptoms

- Build fails immediately with variable reference errors
- Service starts but crashes on first request
- Logs show `undefined` or `null` for config values

### Fix

1. Open the failing service in Railway
2. Go to **Variables** tab
3. Add ALL required variables from this list:

```plaintext
# Common (all services need these)
PORT=<service-specific port>
NODE_ENV=production
RAILWAY_ENVIRONMENT=prod

# Database services
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# API services
JWT_SECRET=<generate with openssl rand -hex 32>
UPSTREAM_API_URL=https://...

# AI/Research services
OPENAI_API_KEY=sk-...
MODEL_ENDPOINT=https://...

# Directus (CMS)
DB_CLIENT=pg
DB_HOST=<postgres host>
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=<secure password>
KEY=<generate with openssl rand -hex 32>
SECRET=<generate with openssl rand -hex 32>
ADMIN_EMAIL=admin@blackroad.so
ADMIN_PASSWORD=<secure password>

# LibreChat
MONGO_URI=mongodb://...
CREDS_KEY=<generate with openssl rand -hex 32>
CREDS_IV=<generate with openssl rand -hex 16>
JWT_SECRET=<generate with openssl rand -hex 32>
JWT_REFRESH_SECRET=<generate with openssl rand -hex 32>
```

### Terraform Automation

Environment variables with `[SECRET - stored in Railway]` placeholders in `services.tf` indicate values that must be set manually in Railway.

These secrets are **never committed to git** - they are managed directly in Railway.

---

## 🛠️ Root Cause #2: Incomplete Dockerfiles

### Symptoms

- Build fails with "no Dockerfile found"
- Build fails with missing dependency errors
- Container starts but exits immediately

### Required Dockerfile Structure

Every BlackRoad OS service needs a Dockerfile. Minimum template:

```dockerfile
# Node.js service template
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Railway provides PORT as env variable
EXPOSE 8080
CMD ["node", "dist/index.js"]
```

### Critical Dockerfile Requirements

1. **Expose the correct PORT** - Must match Railway service config
2. **Multi-stage builds** - Reduce image size, faster deploys
3. **Non-root user** - Security best practice
4. **Health check** - Optional but recommended

### Validating Locally

```bash
# Build and run locally to verify
docker build -t my-service .
docker run -p 8080:8080 -e PORT=8080 my-service
curl http://localhost:8080/health
```

---

## 🛠️ Root Cause #3: Region/Capacity Issues

### Symptoms

- Builds hang indefinitely
- Random 500 errors during deploy
- "Resource temporarily unavailable" errors

### Fix

1. Check Railway status: https://status.railway.app/
2. Try a different region in project settings
3. Wait 15-30 minutes and retry
4. Contact Railway support if persists

### Hobby Plan Limits

- **500 hours** per month of compute
- **5 active deployments** at a time
- **500MB RAM** per service

If hitting limits:
- Remove unused services
- Upgrade to Pro plan
- Consolidate services

---

## 🛠️ Root Cause #4: Broken GitHub Sync

### Symptoms

- Railway shows "Source: GitHub" but deploys old code
- Changes pushed to GitHub don't trigger deploys
- "Repository not found" errors

### Fix

1. Go to Railway project → Settings → Deployments
2. Click **Disconnect GitHub** (if connected)
3. Click **Connect GitHub** again
4. Re-select the correct repository and branch
5. Verify branch name matches (main vs master)

### After Repository Renames

If you renamed a repository:
1. Railway may still reference the old name
2. Disconnect and reconnect GitHub integration
3. Select the new repository name

---

## 🔧 Service-Specific Troubleshooting

### blackroad-os-api-gateway

Required variables:
- `UPSTREAM_API_URL` - URL to blackroad-os-api
- `RATE_LIMIT` - Requests per minute (default: 1000)

### blackroad-os-api

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for token signing

### blackroad-os-prism-console

Required variables:
- `NEXT_PUBLIC_API_URL` - API endpoint for frontend
- `ADMIN_SECRET` - Admin authentication

### Directus

Required variables:
- All DB_* variables configured
- KEY and SECRET generated

Start order matters:
1. Database must be running first
2. Run migrations on first deploy
3. Then start Directus

### LibreChat

Required variables:
- `MONGO_URI` - MongoDB connection
- All CREDS_* and JWT_* secrets

---

## ✅ Pre-Deployment Checklist

Before deploying any service:

- [ ] `railway_project_id` is set in terraform.tfvars (not placeholder)
- [ ] GitHub repository has a valid Dockerfile
- [ ] Container image exists in GHCR (if using pre-built images)
- [ ] All required environment variables set in Railway
- [ ] Database migrations run (if applicable)
- [ ] Health endpoint responds at `/health`

---

## 🆘 Getting Help

1. **Check Railway docs**: https://docs.railway.app/
2. **Railway Discord**: https://discord.gg/railway
3. **File an issue**: https://github.com/BlackRoad-OS/blackroad-os-infra/issues

When reporting issues, include:
- Service name
- Build logs (redact secrets!)
- Screenshot of error
- What changed before the failure

---

## 📝 Related Documentation

- [Railway Playbook](./railway-playbook.md) - Standard deployment procedures
- [DNS Playbook](./dns-playbook.md) - DNS configuration
- [Runners Guide](./runners.md) - GitHub Actions runners
