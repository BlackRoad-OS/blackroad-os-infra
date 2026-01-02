# 📚 Infrastructure Examples

This directory contains example templates, sample data files, and reference implementations for BlackRoad OS infrastructure patterns.

## 📋 Available Examples

### 🧩 Program Management

#### [`program-of-programs-dashboard-v7.md`](./program-of-programs-dashboard-v7.md)
**EXAMPLES PACK v7** - Program-of-Programs Dashboard Template

A comprehensive template for tracking multi-portfolio, multi-program initiatives. Features:
- 7 portfolios (A-G) × 7 programs (1-7) grid structure
- Visual status indicators (🟢 on track, 🟡 watch, 🔴 risk, ⚪️ empty)
- Portfolio-level aggregated status view
- Detailed program progress bars (7 phases per program)
- Compact grid format for easy reporting

**Use Cases:**
- Enterprise program portfolio management
- Cross-functional initiative tracking
- Executive status reporting
- Program health monitoring

---

### 🏥 Service Health & Deployment

#### [`sig.beacon.sample.json`](./sig.beacon.sample.json)
Service health beacon example showing service status, version, and environment information.

**Fields:**
- `service`: Service name
- `version`: Deployed version
- `env`: Environment (prod/staging/local)
- `status`: Health status
- `url`: Health check endpoint
- `last_checked_at`: Last health check timestamp
- `meta`: Additional metadata (region, agent_id, ps_sha_infinity)

**Use Cases:**
- Service health monitoring
- Deployment verification
- Status page integration
- Service discovery

---

#### [`sig.deploy-log.sample.json`](./sig.deploy-log.sample.json)
Deployment log entry example for tracking deployment events and outcomes.

**Fields:**
- `service`: Service being deployed
- `env`: Target environment
- `git_sha`: Git commit SHA
- `actor`: Deployment actor/agent
- `started_at`: Deployment start time
- `completed_at`: Deployment completion time
- `outcome`: Deployment result (success/failure)
- `links`: Related links (PR, CI run, incident)

**Use Cases:**
- Deployment tracking
- Incident correlation
- Audit logging
- Change management

---

## 🎯 Using These Examples

### For Program Dashboards
1. Copy `program-of-programs-dashboard-v7.md`
2. Fill in your program/portfolio names
3. Update status indicators based on actual progress
4. Share with stakeholders

### For Service Monitoring
1. Integrate beacon/deploy-log formats into your services
2. Emit structured logs in these formats
3. Aggregate into monitoring dashboards
4. Set up alerting based on status changes

## 🔗 Related Documentation

- [Service Registry](../../registry/services.yaml) - All services catalog
- [Environments](../../environments/environments.yml) - Environment definitions
- [Observability](../observability/) - Logging and monitoring guides
- [Runbooks](../runbooks/) - Operational procedures

---

**Maintained by:** BlackRoad OS Infrastructure Team  
**Last Updated:** 2025-12-25
