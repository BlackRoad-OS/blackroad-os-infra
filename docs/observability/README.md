# 📊 Observability Overview

Observability patterns and conventions for BlackRoad OS services. This document defines how services should expose logs, metrics, and traces.

---

## 🎯 Goals

1. **Visibility**: Understand what's happening across all services
2. **Correlation**: Trace requests across service boundaries
3. **Debugging**: Quickly diagnose issues in production
4. **Performance**: Identify bottlenecks and optimization opportunities

---

## 📁 Documentation

| Document | Purpose |
|----------|---------|
| [Logging](./logging.md) | Logging conventions and configuration |
| [Correlation IDs](./correlation-ids.md) | Request tracing across services |
| [Health Endpoints](./health-endpoints.md) | Standard health check patterns |
| [Dashboards](./dashboards.md) | Links to monitoring dashboards |

---

## 🧬 Core Patterns

### Every Service Must Have

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `GET /health` | Health check | 200 OK with JSON |
| `GET /version` | Version info | Deployment details |

### Every Log Entry Must Have

| Field | Description | Example |
|-------|-------------|---------|
| `timestamp` | ISO 8601 timestamp | `2025-01-15T10:30:00.000Z` |
| `level` | Log level | `info`, `warn`, `error` |
| `message` | Human-readable message | `Request processed` |
| `service` | Service name | `blackroad-os-api` |
| `requestId` | Request correlation ID | `req_abc123` |

### Every Request Must Have

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Request-ID` | Request tracking | `req_abc123def456` |
| `X-Correlation-ID` | Cross-service tracing | `corr_xyz789` |

---

## 📈 Metrics

### Standard Metrics (per service)

| Metric | Type | Description |
|--------|------|-------------|
| `http_requests_total` | Counter | Total HTTP requests |
| `http_request_duration_seconds` | Histogram | Request latency |
| `http_request_size_bytes` | Histogram | Request body size |
| `http_response_size_bytes` | Histogram | Response body size |
| `process_memory_bytes` | Gauge | Memory usage |
| `process_cpu_seconds_total` | Counter | CPU usage |

### Labels

| Label | Values | Purpose |
|-------|--------|---------|
| `service` | Service name | Identify source |
| `method` | HTTP method | Filter by method |
| `path` | URL path | Identify endpoint |
| `status` | HTTP status code | Success vs. failure |
| `env` | Environment | dev, staging, prod |

---

## 🔗 External Tools

### Railway

- **Logs**: Railway Dashboard → Service → Logs
- **Metrics**: Railway Dashboard → Service → Metrics
- **Deployments**: Railway Dashboard → Service → Deployments

### Cloudflare

- **Analytics**: Cloudflare Dashboard → Analytics → Traffic
- **Security**: Cloudflare Dashboard → Security → Events
- **Performance**: Cloudflare Dashboard → Speed → Overview

### GitHub

- **Actions**: GitHub → Repository → Actions
- **Code Scanning**: GitHub → Repository → Security

---

## 🚀 Implementation Guide

### Node.js Services

See [logging.md](./logging.md) for detailed implementation.

### Python Services

```python
import logging
import json
from datetime import datetime

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname.lower(),
            "message": record.getMessage(),
            "service": "blackroad-os-api",
            "logger": record.name
        })

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logging.root.addHandler(handler)
logging.root.setLevel(logging.INFO)
```

### Go Services

```go
package main

import (
    "encoding/json"
    "log"
    "os"
    "time"
)

type LogEntry struct {
    Timestamp string `json:"timestamp"`
    Level     string `json:"level"`
    Message   string `json:"message"`
    Service   string `json:"service"`
}

func logInfo(message string) {
    entry := LogEntry{
        Timestamp: time.Now().UTC().Format(time.RFC3339),
        Level:     "info",
        Message:   message,
        Service:   "blackroad-os-api",
    }
    json.NewEncoder(os.Stdout).Encode(entry)
}
```

---

## ✅ Checklist for New Services

- [ ] Health endpoint implemented (`GET /health`)
- [ ] Version endpoint implemented (`GET /version`)
- [ ] Structured JSON logging configured
- [ ] Request ID middleware added
- [ ] Correlation ID propagation implemented
- [ ] Error logging with stack traces
- [ ] Railway metrics visible
- [ ] Added to dashboards list

---

**Last Updated**: 2025-11-25
