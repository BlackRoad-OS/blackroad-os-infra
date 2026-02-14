# Runbook: Bring a New Pi Online

> Step-by-step guide to add a Raspberry Pi to the BlackRoad mesh

## Prerequisites

- [ ] Raspberry Pi with Raspbian/Debian (arm64 or armhf)
- [ ] SSH access to the Pi
- [ ] Pi connected to same network as operator (or operator publicly accessible)
- [ ] Operator running and accessible at known URL

## Step 1: Get Your Operator URL

**Local development (Mac):**
```
ws://alexas-macbook-pro-2.local:8000/ws/agent
```

**Railway deployment:**
```
wss://your-app.up.railway.app/ws/agent
```

## Step 2: SSH into the Pi

```bash
ssh pi@<pi-hostname>.local
# or
ssh pi@<ip-address>
```

## Step 3: Run the Installer

```bash
sudo BLACKROAD_OPERATOR_URL="ws://YOUR_OPERATOR:8000/ws/agent" \
bash -c "$(curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh)"
```

**Example with local Mac operator:**
```bash
sudo BLACKROAD_OPERATOR_URL="ws://alexas-macbook-pro-2.local:8000/ws/agent" \
bash -c "$(curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh)"
```

## Step 4: Verify Installation

On the Pi:
```bash
sudo systemctl status blackroad-agent --no-pager
```

**Expected output:**
```
● blackroad-agent.service - BlackRoad Pi Agent - Edge Device Runtime
     Active: active (running) since ...
```

Check logs:
```bash
sudo journalctl -u blackroad-agent -n 20 --no-pager
```

**Expected log messages:**
```
INFO pi_agent.scheduler: Scheduler started
INFO pi_agent.connection: Connection manager started
INFO __main__: Pi Agent running. Press Ctrl+C to stop.
INFO pi_agent.connection: Connecting to ws://...
INFO pi_agent.connection: Connected to operator
```

## Step 5: Verify on Operator Side

From the machine running the operator:

```bash
curl -s http://localhost:8000/health | jq
```

**Expected output:**
```json
{
  "status": "healthy",
  "agents": {
    "total": 1,
    "online": 1,
    "available": 1
  }
}
```

List all agents:
```bash
curl -s http://localhost:8000/api/agents | jq
```

## Step 6: Run a Smoke Test

Send a test task to verify the Pi can execute commands:

```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Smoke test",
    "commands": ["hostname", "uptime", "df -h /"]
  }' | jq
```

Check the agent received and executed it in the Pi logs.

---

## Troubleshooting

### Service won't start

**Check logs:**
```bash
sudo journalctl -u blackroad-agent -n 50 --no-pager
```

**Common issues:**

| Error | Fix |
|-------|-----|
| `Permission denied: '/etc/blackroad/pi-agent.config.json'` | `sudo chmod 755 /etc/blackroad && sudo chmod 644 /etc/blackroad/pi-agent.config.json` |
| `Connect call failed` | Operator not running or wrong URL in config |
| `ModuleNotFoundError` | Re-run installer or `cd /opt/blackroad/pi-agent && ./venv/bin/pip install -r requirements-agent.txt` |

### Reset after too many failures

```bash
sudo systemctl reset-failed blackroad-agent
sudo systemctl restart blackroad-agent
```

### Update agent to latest version

```bash
cd /opt/blackroad/pi-agent
sudo git pull origin main
sudo systemctl restart blackroad-agent
```

### Check config file

```bash
cat /etc/blackroad/pi-agent.config.json | jq
```

Verify `operator.url` is correct.

---

## File Locations

| File | Path |
|------|------|
| Agent code | `/opt/blackroad/pi-agent/` |
| Config file | `/etc/blackroad/pi-agent.config.json` |
| Log file | `/var/log/blackroad/blackroad-agent.log` |
| Systemd service | `/etc/systemd/system/blackroad-agent.service` |
| Python venv | `/opt/blackroad/pi-agent/venv/` |

## Required Permissions

| Path | Mode | Owner |
|------|------|-------|
| `/etc/blackroad/` | `755` | `root:root` |
| `/etc/blackroad/pi-agent.config.json` | `644` | `root:root` |
| `/var/log/blackroad/` | `755` | `pi:pi` |
| `/opt/blackroad/pi-agent/` | `755` | `pi:pi` |
