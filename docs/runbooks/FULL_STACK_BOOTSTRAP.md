# Runbook: Full Stack Bootstrap

> Complete guide to running the entire BlackRoad OS stack locally

## Prerequisites

- macOS or Linux
- Python 3.11+
- Node.js 18+ and pnpm
- Docker (optional)
- Git and GitHub CLI (`gh`)

## Clone All Repos

```bash
# Create workspace
mkdir -p ~/blackroad && cd ~/blackroad

# Clone core services
gh repo clone BlackRoad-OS/blackroad-os-operator
gh repo clone BlackRoad-OS/blackroad-os-api
gh repo clone BlackRoad-OS/blackroad-os-web
gh repo clone BlackRoad-OS/blackroad-os-prism-console
gh repo clone BlackRoad-OS/blackroad-os-infra
```

## Start Services

### Option 1: Individual Terminals

Open 4 terminal tabs/windows:

**Terminal 1 - Operator (port 8080)**
```bash
cd ~/blackroad/blackroad-os-operator
pip install -r requirements.txt
make dev
```

**Terminal 2 - API (port 8000)**
```bash
cd ~/blackroad/blackroad-os-api
poetry install
make dev
```

**Terminal 3 - Web (port 3000)**
```bash
cd ~/blackroad/blackroad-os-web
pnpm install
pnpm dev
```

**Terminal 4 - Prism Console (port 3001)**
```bash
cd ~/blackroad/blackroad-os-prism-console
pnpm install
PORT=3001 pnpm dev
```

### Option 2: Background Processes

```bash
# Start all services in background
cd ~/blackroad/blackroad-os-operator && make dev &
cd ~/blackroad/blackroad-os-api && make dev &
cd ~/blackroad/blackroad-os-web && pnpm dev &
cd ~/blackroad/blackroad-os-prism-console && PORT=3001 pnpm dev &
```

## Verify Services

```bash
# Quick health checks
curl http://localhost:8080/health  # Operator
curl http://localhost:8000/health  # API
curl http://localhost:3000/health  # Web
curl http://localhost:3001/api/health  # Prism

# Or use the smoke test script
cd ~/blackroad/blackroad-os-infra
./scripts/smoke-test.sh all http://localhost
```

## Expected Output

```json
// Operator /health
{"status":"ok","catalog":"ok","uptime_seconds":42.5}

// Operator /version
{"version":"abc123","catalog_version":"def456","service":"blackroad-os-operator"}

// API /health
{"status":"ok","uptime":123.456}

// Web /health
{"status":"ok","service":"blackroad-os-web"}

// Prism /api/health
{"status":"ok","service":"blackroad-prism-console","uptime":60}
```

## Add a Pi to the Mesh

With the operator running locally, you can now add Raspberry Pis:

```bash
# SSH to your Pi
ssh pi@<pi-hostname>.local

# Install the agent (replace with your Mac's hostname)
sudo BLACKROAD_OPERATOR_URL="ws://alexas-macbook-pro-2.local:8080/ws/agent" \
bash -c "$(curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh)"
```

Verify the Pi connected:
```bash
curl http://localhost:8080/api/agents | jq
```

## Service Ports Summary

| Service | Default Port | URL |
|---------|--------------|-----|
| Operator | 8080 | http://localhost:8080 |
| API | 8000 | http://localhost:8000 |
| Web | 3000 | http://localhost:3000 |
| Prism Console | 3001 | http://localhost:3001 |

## Troubleshooting

### Port already in use

```bash
# Find process using port
lsof -i :8080

# Kill it
kill -9 <PID>
```

### Python dependency issues

```bash
# Create fresh venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Node dependency issues

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Pi can't connect to operator

1. Check operator is running: `curl http://localhost:8080/health`
2. Check your Mac's hostname: `hostname`
3. Ensure Pi can reach Mac: `ping <mac-hostname>.local` from Pi
4. Check firewall allows port 8080

## Stop All Services

```bash
# Find and kill all services
pkill -f "uvicorn"
pkill -f "next"
pkill -f "pnpm"
```

## Next Steps

- [Deploy to Railway](../DEPLOY_OVERVIEW.md#railway-deployment)
- [Add more Pis](./PI_ONBOARDING.md)
- [View Deployment Status](../DEPLOYMENT_STATUS.md)
