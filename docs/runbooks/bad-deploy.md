# 🚨 Incident Playbook: Bad Deploy

**Severity**: High 🟠  
**Response Time**: < 15 min to acknowledge

---

## 🎯 Scope

This playbook covers deployment failures and post-deploy issues:
- Build failures in Railway
- Service crash loops after deploy
- Broken functionality after deploy
- Performance degradation after deploy
- Partial deployments (some environments affected)

---

## 📋 Quick Checklist

- [ ] Identify which deployment is bad
- [ ] Assess impact (which envs, services)
- [ ] Decide: rollback vs hotfix
- [ ] Execute recovery
- [ ] Verify functionality
- [ ] Post-mortem

---

## 🔍 Step 1: Identify the Problem (5 min)

### 1.1 Find the Bad Deployment

```bash
# Check service health
curl https://api.blackroad.io/health
curl https://api.blackroad.io/version
# Compare version with expected deployment

# Check Railway dashboard
# 1. Go to project
# 2. Click failing service
# 3. View Deployments list
# 4. Find the bad deployment (red indicator)
```

### 1.2 Classify the Failure

| Type | Symptoms | Priority |
|------|----------|----------|
| **Build Failure** | Deploy never completed, red in Railway | High - no impact yet |
| **Crash Loop** | Service restarts repeatedly, 503 errors | Critical - service down |
| **Partial Outage** | Some endpoints fail, others work | High - degraded |
| **Performance** | Slow responses, timeouts | Medium - degraded |
| **Silent Bug** | Wrong behavior, no errors | Varies - functional issue |

### 1.3 Determine Root Cause

**Check build logs:**
```bash
# Railway Dashboard → Service → Deployments → [Failed Deploy] → View Logs
```

**Common build failures:**
- 📛 Dependency not found → Check package.json/requirements.txt
- 📛 Build script error → Check npm run build output
- 📛 Docker build failed → Check Dockerfile
- 📛 Out of memory → Increase build resources
- 📛 Timeout → Build is too slow

**Check runtime logs:**
```bash
# Railway Dashboard → Service → Logs (live)
```

**Common runtime failures:**
- 📛 Missing env var → Check Variables tab
- 📛 Database connection → Check DATABASE_URL
- 📛 Port binding → Check PORT env var
- 📛 OOM killed → Check memory usage
- 📛 Uncaught exception → Check application logs

---

## 🛠️ Step 2: Choose Recovery Strategy

### Decision Matrix

| Situation | Strategy | Time to Recover |
|-----------|----------|-----------------|
| Simple config issue | Hotfix | 5-10 min |
| Code bug, known fix | Hotfix | 15-30 min |
| Code bug, unknown cause | Rollback | 2-5 min |
| Major regression | Rollback | 2-5 min |
| Performance issue | Rollback first, then investigate | 2-5 min |

---

## 🔄 Step 3A: Rollback (Fast Recovery)

### Via Railway Dashboard

1. Go to Railway dashboard
2. Select the failing service
3. Go to **Deployments** tab
4. Find the **last successful** deployment (green indicator)
5. Click the **...** menu
6. Select **Redeploy**
7. Confirm

### Via Railway CLI

```bash
# If Railway CLI is configured
railway link [project-id]
railway service [service-name]

# View recent deployments
railway deployments

# Rollback to specific deployment
railway rollback [deployment-id]
```

### Via GitHub Revert

If the bad code was merged:

```bash
# Revert the merge commit
git revert -m 1 [merge-commit-sha]
git push origin main

# Railway will auto-deploy the revert
```

---

## 🔧 Step 3B: Hotfix (Quick Fix)

### For Environment Variable Issues

1. Go to Railway → Service → Variables
2. Add or correct the variable
3. Service will auto-restart

### For Configuration Issues

1. Make minimal fix in code
2. Create PR with `[HOTFIX]` prefix
3. Fast-track review
4. Merge to trigger deploy

```bash
# Hotfix branch workflow
git checkout main
git pull
git checkout -b hotfix/fix-issue-description

# Make minimal fix
# ...

git add .
git commit -m "[HOTFIX] Fix critical issue"
git push origin hotfix/fix-issue-description

# Create PR and fast-track merge
```

---

## ✅ Step 4: Verify Recovery

### Check Service Health

```bash
# Health endpoints
curl https://api.blackroad.io/health
# Expected: 200 OK

# Version endpoint
curl https://api.blackroad.io/version
# Should show rolled-back or fixed version

# Functional test
curl https://api.blackroad.io/[critical-endpoint]
# Should return expected data
```

### Monitor for Stability

```bash
# Watch health for 5 minutes
watch -n 30 'curl -s -o /dev/null -w "%{http_code}" https://api.blackroad.io/health'

# Check Railway metrics
# Dashboard → Service → Metrics
# - CPU usage stable
# - Memory usage stable
# - No restart loops
```

---

## 🔍 Step 5: Root Cause Analysis

### Questions to Answer

1. **What changed?** - Git diff between good and bad deploys
2. **Why did it break?** - Missing validation? Test gap?
3. **Why wasn't it caught?** - CI didn't catch it?
4. **How to prevent?** - Better tests? Canary deploys?

### Gather Evidence

```bash
# Compare deployments
git log --oneline [good-sha]..[bad-sha]

# View changes
git diff [good-sha] [bad-sha]

# Check if tests passed
# GitHub → Actions → [workflow run]
```

---

## 🛡️ Prevention Strategies

### Pre-Deploy

- [ ] All tests pass in CI
- [ ] Peer review completed
- [ ] Staging deployment verified
- [ ] Health endpoint tested

### Deploy Process

- [ ] Deploy to staging first
- [ ] Wait for staging health check
- [ ] Deploy to production
- [ ] Monitor for 15 minutes

### Post-Deploy

- [ ] Verify health endpoints
- [ ] Check error rates
- [ ] Monitor performance metrics
- [ ] Confirm critical user flows

---

## 📊 Service-Specific Notes

### blackroad-os-api

**Critical endpoints to verify:**
- `GET /health`
- `GET /version`
- `POST /auth/login` (if auth enabled)

**Common issues:**
- Missing DATABASE_URL
- JWT_SECRET mismatch between envs

### blackroad-os-web

**Critical pages to verify:**
- Homepage loads
- Navigation works
- API calls succeed

**Common issues:**
- NEXT_PUBLIC_API_URL wrong
- Build-time env vars not set

### blackroad-os-prism-console

**Critical features to verify:**
- Login works
- Dashboard loads
- Data displays correctly

**Common issues:**
- API_URL configuration
- Authentication cookie domain

---

## 🔗 Related Documentation

- [Railway Troubleshooting](../railway-troubleshooting.md)
- [Railway Playbook](../railway-playbook.md)
- [Site Down Playbook](./site-down.md)

---

## 📞 Escalation

| Severity | Action |
|----------|--------|
| Build failure (no impact) | Fix in normal hours |
| Staging only | Fix before next prod deploy |
| Prod degraded | Page on-call |
| Prod down | All hands |

---

**Last Updated**: 2025-11-25  
**Owner**: BlackRoad OS Infrastructure Team
