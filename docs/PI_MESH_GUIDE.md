# BlackRoad Pi Mesh Guide

> Edge device mesh deployment and management for BlackRoad OS

## Overview

The BlackRoad Pi Mesh connects Raspberry Pi, Jetson, and other Linux edge devices to the central BlackRoad OS operator. Each device runs the **Pi Agent Runtime** which:

- Maintains persistent WebSocket connection to the operator
- Executes tasks on-demand (shell, scripts, file operations)
- Reports system telemetry (CPU, memory, disk, temperature)
- Supports scheduled and recurring tasks

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BlackRoad OS Operator                        │
│                  (Railway / Cloud Deployment)                    │
│                                                                  │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │  WebSocket Server (/ws/agent)                           │  │
│    │  - Agent registration                                    │  │
│    │  - Task dispatch                                         │  │
│    │  - Heartbeat monitoring                                  │  │
│    └─────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ WebSocket (wss://)
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │  Pi Agent  │  │  Pi Agent  │  │  Pi Agent  │
    │  (pi-001)  │  │  (pi-002)  │  │  (jetson-1)│
    │            │  │            │  │            │
    │  RPi 4B    │  │  RPi Zero  │  │  Jetson    │
    │  LED/Holo  │  │  Sensor    │  │  GPU       │
    └────────────┘  └────────────┘  └────────────┘
```

## Operator URLs

| Environment | URL |
|-------------|-----|
| **Local (Mac)** | `ws://alexas-macbook-pro-2.local:8000/ws/agent` |
| **Railway (Production)** | `wss://blackroad-os-operator.up.railway.app/ws/agent` |
| **Custom** | `wss://<your-operator>.up.railway.app/ws/agent` |

## Quick Start

### One-Line Installation (Canonical)

```bash
# For local Mac operator
sudo BLACKROAD_OPERATOR_URL="ws://alexas-macbook-pro-2.local:8000/ws/agent" \
bash -c "$(curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh)"
```

### Production (Railway)

```bash
sudo BLACKROAD_OPERATOR_URL="wss://blackroad-os-operator.up.railway.app/ws/agent" \
bash -c "$(curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh)"
```

### Legacy One-Line (Uses Default URL)

```bash
curl -sSL https://raw.githubusercontent.com/BlackRoad-OS/blackroad-pi-ops/main/install-pi-agent.sh | sudo bash
```

### Manual Installation

```bash
# Clone repository
git clone https://github.com/BlackRoad-OS/blackroad-pi-ops.git /opt/blackroad/pi-agent
cd /opt/blackroad/pi-agent

# Create virtual environment
python3 -m venv venv
venv/bin/pip install -r requirements-agent.txt

# Copy config
sudo mkdir -p /etc/blackroad
sudo cp pi-agent.config.json /etc/blackroad/

# Edit config
sudo nano /etc/blackroad/pi-agent.config.json

# Install service
sudo cp blackroad-agent.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now blackroad-agent
```

## Configuration

### Config File Location

```
/etc/blackroad/pi-agent.config.json
```

### Full Configuration Reference

```json
{
  "operator": {
    "url": "wss://operator.blackroad.app/ws/agent",
    "reconnect_interval": 5.0,
    "reconnect_max_attempts": 0,
    "ping_interval": 30.0,
    "ping_timeout": 10.0
  },
  "agent": {
    "agent_id": "pi-a1b2c3d4",
    "agent_type": "pi-node",
    "capabilities": ["shell", "telemetry", "file_read", "file_write", "service"],
    "hostname": "pi-living-room",
    "tags": {
      "location": "living-room",
      "role": "display",
      "hardware": "rpi4"
    }
  },
  "telemetry": {
    "heartbeat_interval": 15.0,
    "metrics_interval": 60.0,
    "report_system_metrics": true
  },
  "executor": {
    "max_concurrent_tasks": 4,
    "task_timeout": 300.0,
    "allowed_commands": [],
    "blocked_commands": ["rm -rf /", "mkfs", "dd if="]
  },
  "logging": {
    "level": "INFO",
    "file": "/var/log/blackroad-agent.log"
  }
}
```

### Environment Variable Overrides

| Variable | Description |
|----------|-------------|
| `BLACKROAD_OPERATOR_URL` | Override operator WebSocket URL |
| `BLACKROAD_AGENT_ID` | Override agent ID |
| `BLACKROAD_AGENT_TYPE` | Override agent type |
| `BLACKROAD_HOSTNAME` | Override reported hostname |
| `BLACKROAD_HEARTBEAT_INTERVAL` | Override heartbeat interval |
| `BLACKROAD_LOG_LEVEL` | Override log level |
| `BLACKROAD_PI_CONFIG` | Path to config file |

## Task Types

### Shell Command

```json
{
  "type": "shell",
  "payload": {
    "command": "ls -la /home/pi",
    "cwd": "/home/pi",
    "env": {"MY_VAR": "value"}
  }
}
```

### Script Execution

```json
{
  "type": "script",
  "payload": {
    "path": "/opt/scripts/update.sh",
    "args": ["--force"]
  }
}
```

### Python Code

```json
{
  "type": "python",
  "payload": {
    "code": "import os; print(os.getcwd())"
  }
}
```

### File Operations

```json
{
  "type": "file_read",
  "payload": {
    "path": "/etc/hostname"
  }
}
```

```json
{
  "type": "file_write",
  "payload": {
    "path": "/tmp/test.txt",
    "content": "Hello from operator"
  }
}
```

### Service Management

```json
{
  "type": "service",
  "payload": {
    "service": "nginx",
    "action": "restart"
  }
}
```

## WebSocket Protocol

### Message Format

```json
{
  "type": "message_type",
  "payload": {},
  "timestamp": 1700000000.0
}
```

### Message Types

| Type | Direction | Description |
|------|-----------|-------------|
| `register` | Agent → Operator | Agent registration |
| `heartbeat` | Agent → Operator | Periodic heartbeat with metrics |
| `task` | Operator → Agent | Task to execute |
| `task_result` | Agent → Operator | Task execution result |
| `cancel` | Operator → Agent | Cancel running task |
| `ping` | Operator → Agent | Health check |
| `pong` | Agent → Operator | Health check response |

### Registration Payload

```json
{
  "type": "register",
  "payload": {
    "agent_id": "pi-a1b2c3d4",
    "agent_type": "pi-node",
    "capabilities": ["shell", "telemetry"],
    "version": "0.1.0"
  }
}
```

### Heartbeat Payload

```json
{
  "type": "heartbeat",
  "payload": {
    "agent_id": "pi-a1b2c3d4",
    "hostname": "pi-living-room",
    "metrics": {
      "cpu_percent": 23.5,
      "memory_percent": 45.2,
      "disk_percent": 67.8,
      "temperature": 42.1,
      "uptime_seconds": 86400
    },
    "running_tasks": ["task-123"],
    "scheduled_tasks": 2
  }
}
```

## Operations

### View Logs

```bash
# Follow live logs
sudo journalctl -u blackroad-agent -f

# Last 100 lines
sudo journalctl -u blackroad-agent -n 100

# Logs from file
tail -f /var/log/blackroad-agent.log
```

### Service Management

```bash
# Check status
sudo systemctl status blackroad-agent

# Restart
sudo systemctl restart blackroad-agent

# Stop
sudo systemctl stop blackroad-agent

# Enable auto-start
sudo systemctl enable blackroad-agent
```

### Update Agent

```bash
cd /opt/blackroad/pi-agent
sudo git pull origin main
sudo systemctl restart blackroad-agent
```

## Security

### Blocked Commands

By default, these dangerous patterns are blocked:
- `rm -rf /`
- `mkfs`
- `dd if=`
- `shutdown`
- `reboot`

### Systemd Hardening

The service file includes security hardening:
- `NoNewPrivileges=true`
- `ProtectSystem=strict`
- `ProtectHome=read-only`
- `PrivateTmp=true`
- Resource limits (256MB RAM, 50% CPU)

### Network Security

- Use `wss://` (TLS) in production
- Agent authenticates via registration
- Operator should validate agent_id

## Troubleshooting

### Connection Issues

```bash
# Check if service is running
sudo systemctl status blackroad-agent

# Check network connectivity
ping operator.blackroad.app

# Test WebSocket (requires wscat)
wscat -c wss://operator.blackroad.app/ws/agent
```

### Agent Not Starting

```bash
# Check logs
sudo journalctl -u blackroad-agent -n 50

# Verify config syntax
python3 -m json.tool /etc/blackroad/pi-agent.config.json

# Test manually
cd /opt/blackroad/pi-agent
venv/bin/python -m pi_agent.main --log-level DEBUG
```

### High CPU/Memory

1. Check running tasks
2. Review `max_concurrent_tasks` setting
3. Check for runaway processes spawned by tasks

## Integration with Pi-Ops/Pi-Holo

The Pi Agent can run alongside existing Pi-Ops (MQTT dashboard) and Pi-Holo (holographic display) services:

```bash
# All three services can run together
sudo systemctl status pi-ops
sudo systemctl status pi-holo
sudo systemctl status blackroad-agent
```

The agent can control these services via the `service` task type:

```json
{
  "type": "service",
  "payload": {
    "service": "pi-holo",
    "action": "restart"
  }
}
```

## Related Resources

- [blackroad-pi-ops](https://github.com/BlackRoad-OS/blackroad-pi-ops) - Pi Agent source code
- [blackroad-pi-holo](https://github.com/BlackRoad-OS/blackroad-pi-holo) - Holographic display renderer
- [blackroad-os-operator](https://github.com/BlackRoad-OS/blackroad-os-operator) - Central operator service
