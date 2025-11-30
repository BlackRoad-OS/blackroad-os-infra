# BlackRoad OS - Deployment Overview

> Quick reference for deploying BlackRoad OS services

## Core Services

| Service | Repo | Port | Health | Version |
|---------|------|------|--------|---------|
| **Operator** | `blackroad-os-operator` | 8080 | `/health` | `/version` |
| **API** | `blackroad-os-api` | 8000 | `/health` | `/version` |
| **Web** | `blackroad-os-web` | 3000 | `/health` | `/version` |
| **Prism Console** | `blackroad-os-prism-console` | 3000 | `/api/health` | `/api/version` |

## Local Development

Each service has a standardized Makefile:

```bash
make help      # Show all commands
make install   # Install dependencies
make dev       # Run dev server
make health    # Check health endpoint
make version   # Check version endpoint
```

## Railway Deployment

### Prerequisites
- Railway CLI installed: `npm install -g @railway/cli`
- Logged in: `railway login`

### Deploy a Service

```bash
# Clone the repo
gh repo clone BlackRoad-OS/blackroad-os-operator
cd blackroad-os-operator

# Create Railway project
railway init

# Link to existing project (if any)
railway link

# Deploy
railway up

# Check logs
railway logs
```

### Environment Variables

| Service | Variable | Required | Description |
|---------|----------|----------|-------------|
| All | `PORT` | No | Override default port |
| All | `COMMIT_SHA` | No | Git SHA for version |
| Operator | `CATALOG_PATH` | No | Path to agents.yaml |
| API | `DATABASE_URL` | Yes | PostgreSQL connection |
| API | `REDIS_URL` | No | Redis for rate limiting |

## Service URLs

### Local Development
```
Operator:      http://localhost:8080
API:           http://localhost:8000
Web:           http://localhost:3000
Prism Console: http://localhost:3001
```

### Railway (Production)
```
Operator:      https://blackroad-os-operator.up.railway.app
API:           https://blackroad-os-api.up.railway.app
Web:           https://blackroad-os-web.up.railway.app
Prism Console: https://blackroad-os-prism.up.railway.app
```

## Quick Health Check

```bash
# Local
curl http://localhost:8080/health
curl http://localhost:8000/health
curl http://localhost:3000/health
curl http://localhost:3001/api/health

# Production
curl https://blackroad-os-operator.up.railway.app/health
```

## Docker

Each service includes a Dockerfile:

```bash
# Build
docker build -t blackroad-os-operator .

# Run
docker run -p 8080:8080 blackroad-os-operator

# Or use make
make docker-build
make docker-run
```

## Smoke Tests

Use the smoke test script in `blackroad-os-infra`:

```bash
# Test single service
./scripts/smoke-test.sh operator http://localhost:8080

# Test all local services
./scripts/smoke-test.sh all http://localhost
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Internet / CDN                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐       ┌─────────┐       ┌─────────┐
   │   Web   │       │  Prism  │       │  Docs   │
   │  :3000  │       │  :3001  │       │  :3002  │
   └────┬────┘       └────┬────┘       └─────────┘
        │                 │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   API Gateway   │
        │     :8080       │
        └────────┬────────┘
                 │
        ┌────────┼────────┐
        │        │        │
        ▼        ▼        ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │   API   │ │Operator │ │ Agents  │
   │  :8000  │ │  :8080  │ │  :8080  │
   └─────────┘ └────┬────┘ └─────────┘
                    │
                    │ WebSocket
                    │
         ┌──────────┼──────────┐
         │          │          │
         ▼          ▼          ▼
      ┌─────┐    ┌─────┐    ┌─────┐
      │ Pi  │    │ Pi  │    │ Pi  │
      │  1  │    │  2  │    │  N  │
      └─────┘    └─────┘    └─────┘
```

## Next Steps

1. [Full Stack Bootstrap](./runbooks/FULL_STACK_BOOTSTRAP.md) - Complete local setup
2. [Pi Onboarding](./runbooks/PI_ONBOARDING.md) - Add a Raspberry Pi to the mesh
3. [Deployment Status](./DEPLOYMENT_STATUS.md) - Full repo inventory
