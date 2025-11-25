# 📝 Logging Conventions

Standard logging configuration for BlackRoad OS services.

---

## 🎯 Principles

1. **Structured**: All logs must be JSON formatted
2. **Consistent**: Same fields across all services
3. **Queryable**: Optimized for log search and analysis
4. **Actionable**: Include enough context to debug issues

---

## 📋 Required Fields

Every log entry MUST include:

```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Request processed successfully",
  "service": "blackroad-os-api"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | String | ISO 8601 with milliseconds, UTC |
| `level` | String | Log level (see below) |
| `message` | String | Human-readable description |
| `service` | String | Service identifier |

---

## 📊 Log Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| `error` | Operation failed, needs attention | Database connection failed |
| `warn` | Unexpected but recoverable | Rate limit approaching |
| `info` | Normal operations | Request completed |
| `debug` | Detailed debugging info | Query execution details |

**Production Rule**: Only `info` and above in production. Enable `debug` temporarily for troubleshooting.

---

## 📝 Common Log Patterns

### HTTP Request Logging

```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "level": "info",
  "message": "HTTP request completed",
  "service": "blackroad-os-api",
  "requestId": "req_abc123",
  "method": "GET",
  "path": "/api/users",
  "statusCode": 200,
  "duration": 45,
  "userAgent": "Mozilla/5.0..."
}
```

### Error Logging

```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "level": "error",
  "message": "Database query failed",
  "service": "blackroad-os-api",
  "requestId": "req_abc123",
  "error": {
    "name": "QueryError",
    "message": "Connection refused",
    "stack": "Error: Connection refused\n    at..."
  }
}
```

### Startup Logging

```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Service started",
  "service": "blackroad-os-api",
  "version": "1.2.3",
  "port": 8080,
  "env": "production"
}
```

---

## 🛠️ Implementation

### Node.js (with Pino)

```typescript
// logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'blackroad-os-api',
    env: process.env.RAILWAY_ENVIRONMENT || 'local',
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
});
```

### Express Middleware

```typescript
// middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import { v4 as uuidv4 } from 'uuid';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  // Generate or extract request ID
  const requestId = req.headers['x-request-id'] as string || `req_${uuidv4()}`;
  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  const start = Date.now();

  res.on('finish', () => {
    logger.info({
      message: 'HTTP request completed',
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: Date.now() - start,
      userAgent: req.headers['user-agent'],
    });
  });

  next();
}
```

### Next.js API Routes

```typescript
// lib/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: {
    service: 'blackroad-os-web',
    env: process.env.RAILWAY_ENVIRONMENT || 'local',
  },
});

export default logger;

// Usage in API route
import logger from '@/lib/logger';

export default function handler(req, res) {
  logger.info({ 
    message: 'API request', 
    path: req.url 
  });
  // ...
}
```

---

## 🚫 What NOT to Log

Never log:

- 🔑 Passwords, API keys, tokens
- 🪪 Personal identifiable information (PII)
- 💳 Credit card numbers, SSNs
- 🔐 Session IDs, auth tokens
- 📧 Email addresses (hash or mask instead)

```typescript
// BAD - Never do this
logger.info({ password: user.password });

// GOOD - Mask sensitive data
logger.info({ email: maskEmail(user.email) }); // j***@example.com
```

---

## 📈 Log Aggregation

### Railway Logs

Railway automatically aggregates logs from stdout/stderr:

- View: Railway Dashboard → Service → Logs
- Filter by timestamp
- Search for keywords
- Download logs for analysis

### Best Practices

1. **Don't log too much** - High volume = high cost + noise
2. **Don't log too little** - Missing context = hard debugging
3. **Sample high-volume logs** - Log 1% of successful requests, 100% of errors
4. **Rotate/archive** - Don't keep indefinitely

---

## 🧪 Testing Logging

```typescript
// test/logger.test.ts
import { logger } from '../src/logger';

describe('Logger', () => {
  it('should include required fields', () => {
    const spy = jest.spyOn(process.stdout, 'write');
    
    logger.info({ message: 'test' });
    
    const output = JSON.parse(spy.mock.calls[0][0]);
    expect(output).toHaveProperty('timestamp');
    expect(output).toHaveProperty('level', 'info');
    expect(output).toHaveProperty('message', 'test');
    expect(output).toHaveProperty('service');
  });
});
```

---

## 🔗 Related

- [Correlation IDs](./correlation-ids.md)
- [Health Endpoints](./health-endpoints.md)

---

**Last Updated**: 2025-11-25
