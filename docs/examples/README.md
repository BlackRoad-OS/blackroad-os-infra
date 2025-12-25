# Examples Directory

This directory contains example data files and documentation for various BlackRoad OS systems and formats.

## Available Examples

### 📊 Organization Capacity Dashboard (v8)

**File:** `org-capacity-dashboard-v8.md`  
**Spec:** `../sig/org.capacity.spec.json`  
**Sample:** `org.capacity.sample.json`

Visual ASCII dashboard format for tracking organizational capacity across 7 teams with 7 key signals:

- 👥 Headcount - Team staffing levels
- 🧠 Focus time - Deep work availability
- ⚙️ WIP load - Work-in-progress items
- 🧱 Blocked - Items waiting on dependencies
- 🔥 Priority - Priority alignment
- 📣 Comms health - Communication effectiveness
- ✨ Momentum - Team velocity

**Status Indicators:**
- 🟢 Good / Healthy
- 🟡 Watch / Caution
- 🔴 Bad / Critical
- ⚪️ Empty / No Data

**Usage:**
```bash
# Generate sample from spec
npm run generate:sig

# Render JSON as ASCII dashboard
npm run render:capacity [input.json]
```

**Example Output:**
```
🏢 ORG CAPACITY DASHBOARD: BlackRoad OS   📅 WEEK: 2025-W52   🚦 STATUS: 🟡

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

A) 👥 Headcount     🟢🟢🟢🔴🟢🟢🟢   😭
B) 🧠 Focus time    🟢🟢🟡🟡🟢🟡🟢
C) ⚙️ WIP load      🟡🟢🟡🟡🟢🟡🟢
D) 🧱 Blocked       🔴🟢🟢🔴🟢🟢🟢   😭
E) 🔥 Priority      🟢🟢🟢🟢🟢🟢🟢
F) 📣 Comms health  🟢🟢🟢🟢🟢🟢🟢
G) ✨ Momentum      🟢🟢🟡🟡🟢🟡🟢

👥 TEAM GRID (7)
Platform Engineering    🟢🟢🟡🔴🟢🟢🟢
API Team _______   🟢🟢🟢🟢🟢🟢🟢
Web Team _______   🟢🟡🟡🟢🟢🟢🟡
...
```

---

### 🎯 SIG Beacon

**File:** `sig.beacon.sample.json`  
**Spec:** `../sig/sig.beacon.spec.json`

Health beacon payload emitted by BlackRoad OS services and collected by the operator.

**Fields:**
- `service` - Service name
- `version` - Version string (semver + git hash)
- `env` - Environment (dev/stage/prod)
- `status` - Health status (healthy/degraded/unhealthy)
- `url` - Healthcheck endpoint
- `last_checked_at` - ISO8601 timestamp
- `meta` - Region, agent ID, policy steward signature

**Usage:**
```bash
npm run generate:sig
```

---

### 📝 SIG Deploy Log

**File:** `sig.deploy-log.sample.json`  
**Spec:** `../sig/sig.deploy-log.spec.json`

Append-only deploy log entries for BlackRoad OS services.

**Fields:**
- `service` - Service name deploying
- `env` - Deployment environment
- `git_sha` - Commit SHA deployed
- `actor` - Human or agent initiating deployment
- `started_at` / `completed_at` - ISO8601 timestamps
- `outcome` - Result (success/rollback/failed)
- `links` - PR, CI run, incident links

**Usage:**
```bash
npm run generate:sig
```

---

## Generating Examples

All examples are generated from their JSON Schema specifications in the `sig/` directory:

```bash
# Generate all example files from specs
npm run generate:sig

# This creates:
# - docs/examples/sig.beacon.sample.json
# - docs/examples/sig.deploy-log.sample.json
# - docs/examples/org.capacity.sample.json
```

## Related Documentation

- [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)
- [Observability Documentation](../observability/)
- [Service Registry](../../registry/services.yaml)
- [Monitoring Dashboard Config](../../monitoring/dashboard.json)

---

**Maintained By:** BlackRoad OS Infrastructure Team  
**Last Updated:** 2025-12-25
