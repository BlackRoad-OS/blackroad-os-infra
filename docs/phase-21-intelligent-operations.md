# Phase 21: Intelligent Operations

> **AI-powered operational intelligence, predictive analytics, and automated security**

## Overview

Phase 21 introduces intelligent operations capabilities that leverage pattern recognition, predictive modeling, and automation to proactively manage infrastructure health. This phase adds 4 new workflows that work together to provide comprehensive operational visibility.

## Components

### 1. Workflow Dependency Graph (`workflow-dependency-graph.yml`)

Interactive visualization of all GitHub Actions workflows and their relationships.

#### Features

- **Automatic Discovery**: Scans all 200+ workflows
- **Dependency Mapping**: Identifies workflow_run triggers and reusable workflow calls
- **Category Classification**: Groups workflows by purpose (deployment, testing, security, etc.)
- **Interactive D3 Visualization**: Zoom, pan, search, and explore

#### Categories

| Category | Color | Examples |
|----------|-------|----------|
| Deployment | Green | deploy, canary, release |
| Testing | Blue | ci, test, lint, coverage |
| Security | Red | audit, scan, secret |
| Monitoring | Yellow | health, sla, alert |
| Automation | Purple | auto, bot, sync |
| Agents | Pink | agent, gaia, orchestrator |
| Other | Gray | Miscellaneous |

#### Usage

```bash
# Generate graph manually
gh workflow run workflow-dependency-graph.yml \
  -f output_format="all"
```

The graph is automatically regenerated weekly on Mondays at 6 AM UTC.

#### Output Files

| File | Description |
|------|-------------|
| `index.html` | Interactive D3 visualization |
| `nodes.json` | Workflow node data |
| `edges.json` | Dependency edges |
| `workflow-analysis.json` | Full analysis data |
| `REPORT.md` | Summary report |

---

### 2. Incident Post-Mortem Generator (`incident-postmortem.yml`)

Automated post-mortem document generation with timeline reconstruction.

#### Features

- **Structured Templates**: Follows industry-standard post-mortem format
- **Timeline Reconstruction**: Gathers logs and events during incident window
- **Impact Analysis**: Calculates SLA budget consumption
- **Action Item Tracking**: Creates follow-up issues automatically
- **Pull Request Workflow**: Post-mortems go through review process

#### Post-Mortem Sections

1. **Executive Summary** - High-level incident overview
2. **Timeline** - Chronological event sequence
3. **Root Cause Analysis** - 5 Whys methodology
4. **Resolution** - Actions taken to resolve
5. **Impact Assessment** - Service and business impact
6. **Lessons Learned** - What went well / could improve
7. **Action Items** - Prioritized follow-up tasks

#### Usage

```bash
# Generate post-mortem via CLI
gh workflow run incident-postmortem.yml \
  -f incident_id="INC-2024-001" \
  -f incident_title="API Gateway Outage" \
  -f severity="major" \
  -f start_time="2024-12-28T10:00:00Z" \
  -f end_time="2024-12-28T10:45:00Z" \
  -f affected_services="blackroad-api,blackroad-web" \
  -f root_cause="Database connection pool exhaustion" \
  -f resolution="Increased pool size and added connection timeout"
```

#### Automated Triggers

- Label an issue with `postmortem` to auto-generate

#### Output

- Markdown post-mortem document in `docs/postmortems/`
- Pull request for team review
- Tracking issue for action items

---

### 3. Predictive Failure Detection (`predictive-failure-detection.yml`)

ML-inspired failure prediction with 7-day forecasting.

#### Features

- **5 Prediction Models**: Multi-factor risk analysis
- **7-Day Forecast**: Daily failure probability predictions
- **Automatic Alerting**: Creates issues for high-risk periods
- **Recommendations Engine**: Actionable suggestions to reduce risk

#### Prediction Models

| Model | Weight | Description |
|-------|--------|-------------|
| Failure Rate Trend | 30% | Recent failure rate analysis |
| Failure Clustering | 25% | Detects failure spikes |
| Workflow Diversity | 20% | Multiple workflows failing |
| Time-based Risk | 10% | Peak hours, weekends |
| Dependency Health | 15% | Outdated dependencies |

#### Risk Levels

| Level | Score | Action |
|-------|-------|--------|
| 🟢 Low | 0-39 | Continue monitoring |
| 🟡 Medium | 40-69 | Review recommendations |
| 🔴 High | 70-100 | Immediate attention |

#### Usage

```bash
# Run prediction analysis
gh workflow run predictive-failure-detection.yml \
  -f analysis_depth="deep" \
  -f alert_threshold="70"
```

#### Schedule

- Runs automatically every 4 hours
- High-risk alerts create issues immediately

#### 7-Day Forecast Example

```
Day 1 (Monday):    ⚠️  75% failure probability
Day 2 (Tuesday):   🟡 55% failure probability
Day 3 (Wednesday): 🟡 50% failure probability
Day 4 (Thursday):  ✅ 40% failure probability
Day 5 (Friday):    ✅ 35% failure probability
Day 6 (Saturday):  ✅ 25% failure probability
Day 7 (Sunday):    ✅ 20% failure probability
```

---

### 4. Secret Rotation Automation (`secret-rotation.yml`)

Automated secret lifecycle management with compliance tracking.

#### Features

- **Secret Inventory**: Tracks all secrets with rotation schedules
- **Expiration Monitoring**: Alerts before secrets expire
- **Rotation Planning**: Generates step-by-step rotation plans
- **Audit Reporting**: Compliance-ready audit trails
- **Zero-Downtime Rotation**: Safe rotation procedures

#### Rotation Policies

| Secret Type | Rotation Period | Priority |
|-------------|-----------------|----------|
| API Keys | 90 days | High |
| Tokens | 30 days | Medium |
| Certificates | 365 days | High |
| Database Credentials | 180 days | Critical |

#### Secret Status Levels

| Status | Description |
|--------|-------------|
| 🟢 OK | Within rotation period |
| 🟡 Expiring Soon | <14 days until due |
| 🔴 Expired | Past rotation date |

#### Usage

```bash
# Run secret audit
gh workflow run secret-rotation.yml \
  -f action="audit"

# Plan rotations (dry run)
gh workflow run secret-rotation.yml \
  -f action="rotate" \
  -f dry_run="true"

# Execute rotation (requires approval)
gh workflow run secret-rotation.yml \
  -f action="rotate" \
  -f dry_run="false"
```

#### Schedule

- **Weekly**: Monday 4 AM UTC - Audit check
- **Monthly**: 1st of month 3 AM UTC - Full rotation review

#### Audit Report Contents

```json
{
  "audit_date": "2024-12-28T03:00:00Z",
  "summary": {
    "total_secrets": 7,
    "expiring_soon": 1,
    "expired": 0,
    "audit_score": 86
  },
  "compliance": {
    "rotation_policy": "enforced",
    "encryption": "AES-256",
    "access_control": "role-based"
  }
}
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 INTELLIGENT OPERATIONS                       │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   VISIBILITY    │ │   PREDICTION    │ │    SECURITY     │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ Workflow Graph  │ │ Failure Detect  │ │ Secret Rotation │
│ Post-Mortems    │ │ 7-Day Forecast  │ │ Audit Reports   │
│ Dependency Map  │ │ Risk Scoring    │ │ Compliance      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
                    ┌─────────────────┐
                    │  ALERTING &     │
                    │  ISSUE CREATION │
                    └─────────────────┘
```

## Workflow Statistics

| Workflow | Lines | Jobs | Triggers |
|----------|-------|------|----------|
| workflow-dependency-graph.yml | 420 | 2 | schedule, push, manual |
| incident-postmortem.yml | 480 | 4 | manual, issue label |
| predictive-failure-detection.yml | 450 | 4 | schedule, manual |
| secret-rotation.yml | 520 | 5 | schedule, manual |

**Total Phase 21**: ~1,870 lines of workflow YAML

## Integration with Phase 20

| Phase 20 Component | Phase 21 Integration |
|-------------------|----------------------|
| Canary Deployment | Failure prediction informs deployment timing |
| Audit Trail | Post-mortems reference audit records |
| SLA Monitoring | Predictions use SLA data as input |
| Deployment Approval | Secret rotation can trigger re-approval |

## Configuration

### Environment Variables

```yaml
# Workflow Graph
GRAPH_OUTPUT_DIR: '.github/workflow-graph'

# Post-Mortem
POSTMORTEM_DIR: 'docs/postmortems'

# Prediction
PREDICTION_WINDOW_DAYS: 7
HIGH_RISK_THRESHOLD: 70
MEDIUM_RISK_THRESHOLD: 40

# Secret Rotation
ROTATION_DAYS_API_KEY: 90
ROTATION_DAYS_TOKEN: 30
ROTATION_DAYS_CERT: 365
ROTATION_DAYS_DB: 180
```

## Best Practices

### Workflow Graph

1. Review graph after adding new workflows
2. Look for orphaned workflows (no triggers)
3. Identify overly complex dependency chains

### Post-Mortems

1. Generate post-mortem within 24 hours of incident
2. Assign all action items before merging
3. Schedule retrospective meeting for major incidents

### Failure Prediction

1. Investigate all high-risk alerts
2. Tune thresholds based on historical accuracy
3. Use predictions to plan maintenance windows

### Secret Rotation

1. Never skip critical secret rotation
2. Test rotation in staging first
3. Maintain rotation tracking for compliance

## Troubleshooting

### Graph Not Generating

- Check that `jq` is available in runner
- Verify workflow files are valid YAML
- Check for permission issues on artifact upload

### Post-Mortem Creation Fails

- Ensure `GH_TOKEN` has issue/PR permissions
- Verify branch name doesn't conflict
- Check for duplicate incident IDs

### Predictions Seem Off

- Ensure sufficient historical data (100+ runs)
- Check that workflow conclusions are being recorded
- Verify schedule is running correctly

### Rotation Not Updating

- Confirm secrets inventory is up to date
- Check environment protection is configured
- Verify dry_run is set to false for actual changes

## Future Enhancements

- [ ] ML model training on historical data
- [ ] Integration with external monitoring (Datadog, PagerDuty)
- [ ] Automatic remediation for common failures
- [ ] Cross-repository prediction correlation
- [ ] Secret rotation with external vaults (HashiCorp, AWS)
- [ ] Natural language incident summarization

---

**Phase 21** adds operational intelligence that makes infrastructure self-aware, enabling proactive issue detection and automated response.
