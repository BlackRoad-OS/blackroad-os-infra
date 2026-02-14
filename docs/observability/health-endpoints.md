# ❤️‍🩹 Health Endpoints

Standard health check patterns for BlackRoad OS services.

---

## 🎯 Purpose

Health endpoints enable:

1. **Load balancing**: Route traffic only to healthy instances
2. **Monitoring**: Alert when services become unhealthy
3. **Orchestration**: Railway/K8s restarts unhealthy containers
4. **Debugging**: Quick verification of service status

---

## 📋 Required Endpoints

Every BlackRoad OS service MUST implement:

| Endpoint | Purpose | Auth Required |
|----------|---------|---------------|
| `GET /health` | Health check | No |
| `GET /version` | Version info | No |

---

## 📊 Health Check (`GET /health`)

### Response Format

```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "service": "blackroad-os-api",
  "version": "1.2.3",
  "uptime": 3600,
  "checks": {
    "database": "healthy",
    "redis": "healthy",
    "external_api": "healthy"
  }
}
```

### Status Codes

| Status | HTTP Code | Meaning |
|--------|-----------|---------|
| `healthy` | 200 | All systems operational |
| `degraded` | 200 | Partial functionality, non-critical issue |
| `unhealthy` | 503 | Service cannot function |

### Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | String | ✅ | Overall status |
| `timestamp` | String | ✅ | ISO 8601 timestamp |
| `service` | String | ✅ | Service identifier |
| `version` | String | ❌ | Deployment version |
| `uptime` | Number | ❌ | Seconds since start |
| `checks` | Object | ❌ | Dependency check results |

---

## 📋 Version Endpoint (`GET /version`)

### Response Format

```json
{
  "service": "blackroad-os-api",
  "version": "1.2.3",
  "commit": "abc123def456",
  "buildTime": "2025-01-15T10:00:00.000Z",
  "environment": "production"
}
```

### Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `service` | String | ✅ | Service identifier |
| `version` | String | ✅ | Semantic version |
| `commit` | String | ❌ | Git commit SHA |
| `buildTime` | String | ❌ | Build timestamp |
| `environment` | String | ❌ | Deployment environment |

---

## 🛠️ Implementation

### Node.js (Express)

```typescript
// routes/health.ts
import { Router } from 'express';
import { checkDatabase } from '../db';
import { checkRedis } from '../cache';

const router = Router();
const startTime = Date.now();

router.get('/health', async (req, res) => {
  const checks: Record<string, string> = {};
  let status = 'healthy';
  
  // Check database
  try {
    await checkDatabase();
    checks.database = 'healthy';
  } catch (error) {
    checks.database = 'unhealthy';
    status = 'unhealthy';
  }
  
  // Check Redis
  try {
    await checkRedis();
    checks.redis = 'healthy';
  } catch (error) {
    checks.redis = 'unhealthy';
    // Redis is optional, so just degraded
    if (status === 'healthy') status = 'degraded';
  }
  
  const response = {
    status,
    timestamp: new Date().toISOString(),
    service: 'blackroad-os-api',
    version: process.env.npm_package_version || '0.0.0',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    checks,
  };
  
  const httpStatus = status === 'unhealthy' ? 503 : 200;
  res.status(httpStatus).json(response);
});

router.get('/version', (req, res) => {
  res.json({
    service: 'blackroad-os-api',
    version: process.env.npm_package_version || '0.0.0',
    commit: process.env.COMMIT_SHA || 'unknown',
    buildTime: process.env.BUILD_TIME || 'unknown',
    environment: process.env.RAILWAY_ENVIRONMENT || 'local',
  });
});

export default router;
```

### Next.js (API Route)

```typescript
// pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const startTime = Date.now();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'blackroad-os-web',
    version: process.env.npm_package_version || '0.0.0',
    uptime: Math.floor((Date.now() - startTime) / 1000),
  });
}
```

```typescript
// pages/api/version.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    service: 'blackroad-os-web',
    version: process.env.npm_package_version || '0.0.0',
    commit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    environment: process.env.RAILWAY_ENVIRONMENT || 'local',
  });
}
```

---

## 🔍 Railway Configuration

In Railway, configure health checks:

1. Go to Service → Settings → Deploy
2. Set Health Check Path: `/health`
3. Set Health Check Timeout: 5 seconds

Railway will:
- Check `/health` after deploy
- Restart container if health fails
- Route traffic only to healthy instances

---

## 📈 Cloudflare Monitoring

Set up Cloudflare health checks:

1. Cloudflare → Health Checks → Create
2. Configure:
   - **Name**: `api-health`
   - **Monitor**: `https://api.blackroad.io/health`
   - **Check Interval**: 60 seconds
   - **Timeout**: 5 seconds
   - **Retries**: 2

3. Set up notification:
   - Email alerts
   - Webhook to Slack/Discord

---

## 🧪 Testing

```bash
# Basic health check
curl https://api.blackroad.io/health
# Expected: 200 with JSON body

# Version check
curl https://api.blackroad.io/version
# Expected: 200 with version JSON

# Check response time
time curl -s -o /dev/null https://api.blackroad.io/health
# Should be < 1 second

# Continuous monitoring
watch -n 5 'curl -s https://api.blackroad.io/health | jq .status'
```

---

## ✅ Best Practices

1. **Fast**: Health check should complete in < 500ms
2. **Light**: Don't do heavy operations
3. **Honest**: Return 503 if service is truly unhealthy
4. **No auth**: Health endpoints should be public
5. **No side effects**: Don't modify data

---

## 🚫 Anti-Patterns

- ❌ Health check that always returns 200
- ❌ Expensive database queries in health check
- ❌ Auth-protected health endpoint
- ❌ Health check that modifies state
- ❌ Missing dependency checks

---

## 📊 Standard Ports

| Service | Port | Health URL |
|---------|------|------------|
| blackroad-os-api | 8080 | `/health` |
| blackroad-os-api-gateway | 8080 | `/health` |
| blackroad-os-web | 3000 | `/api/health` |
| blackroad-os-prism-console | 3000 | `/health` |
| blackroad-os-operator | 8084 | `/health` |
| blackroad-os-research | 8082 | `/health` |

---

## 🔗 Related

- [Logging Conventions](./logging.md)
- [Correlation IDs](./correlation-ids.md)
- [Service Registry](/registry/services.yaml)

---

**Last Updated**: 2025-11-25
