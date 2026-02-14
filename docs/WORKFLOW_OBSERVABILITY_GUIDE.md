# 📊 Workflow Observability & Monitoring Guide

**Complete guide to BlackRoad's workflow monitoring and observability systems**

---

## 🎯 Overview

BlackRoad OS Infrastructure has **201 GitHub Actions workflows** managing everything from deployments to self-healing. Our observability system monitors, analyzes, and optimizes all workflows in real-time.

### Key Systems

1. **Workflow Observability** (`workflow-observability.yml`) - Comprehensive metrics and analysis
2. **Workflow Health Monitor** (`workflow-health-monitor.yml`) - Real-time health checks and alerts

---

## 📊 Workflow Observability System

**Schedule:** Every 15 minutes
**Purpose:** Collect metrics, detect anomalies, auto-remediate issues

### Features

#### 1. Metrics Collection
Collects comprehensive metrics from the last 24 hours:

- **Total workflow runs**
- **Success rate** (percentage of successful runs)
- **Active workflows** (currently running)
- **Failed workflows** (recent failures)
- **Average duration** (execution time)
- **Slowest workflows** (top 5 by duration)
- **Most failing workflows** (top 5 by failure count)

**Example Output:**
```
Total runs: 487
Success rate: 92.35%
Avg duration: 127.45s
Recent failures: 3/10
```

#### 2. Trend Analysis
Analyzes historical data to predict issues:

- **Failure rate trends** - Detects increasing failure patterns
- **Duration trends** - Identifies slowing workflows
- **Recent failure spikes** - Catches sudden degradation
- **Outdated dependencies** - Tracks dep age

**Python Analysis:**
```python
# Calculate failure rate trend
total = len(runs)
failures = sum(1 for r in runs if r['conclusion'] == 'failure')
failure_rate = (failures / total * 100) if total > 0 else 0

# Detect anomalies
if failure_rate > 10:
    PREDICTIONS="Failure rate trending up - investigate flaky tests"
```

#### 3. Anomaly Detection
Automatically detects four types of anomalies:

| Anomaly Type | Threshold | Severity |
|-------------|-----------|----------|
| Low success rate | <80% | High |
| High active count | >20 concurrent | Medium |
| Slow workflows | >10 min avg | Low |
| Flaky workflows | >50% failure rate | High |

**Detection Logic:**
```bash
# Success rate anomaly
if (( $(echo "$SUCCESS_RATE < 80" | bc -l) )); then
  ANOMALIES="⚠️ Success rate is ${SUCCESS_RATE}% (expected >80%)"
fi

# Stuck workflows
if [ "$STUCK" -gt 5 ]; then
  ANOMALIES="🚨 $STUCK workflows stuck (>1 hour)"
fi
```

#### 4. Auto-Remediation
Automatically fixes detected issues:

**Remediation Actions:**
- **Cancel stuck workflows** - Runs exceeding 1 hour
- **Re-run failed workflows** - Recent failures (max 5)
- **Create tracking issues** - For persistent failures
- **Update documentation** - Auto-generates reports

**Example:**
```bash
# Cancel stuck workflows
gh run list \
  --status in_progress \
  --limit 100 \
  --json databaseId,createdAt \
  | jq '.[] | select((now - (.createdAt | fromdateiso8601)) > 3600) | .databaseId' \
  | while read -r run_id; do
      gh run cancel "$run_id"
    done

# Re-run failed workflows
gh run list \
  --status failure \
  --limit 10 \
  | head -5 \
  | while read -r run_id; do
      gh run rerun "$run_id" --failed
    done
```

#### 5. HTML Dashboard
Generates live HTML dashboard at `/tmp/workflow-dashboard.html`:

```html
<div class="metrics">
  <div class="metric">
    <div class="metric-value">487</div>
    <div class="metric-label">Total Workflows (24h)</div>
  </div>

  <div class="metric">
    <div class="metric-value success">92.35%</div>
    <div class="metric-label">Success Rate</div>
  </div>
</div>
```

**Dashboard Features:**
- Real-time metrics display
- Color-coded status (green/yellow/red)
- Auto-refresh every 5 minutes
- Responsive design
- Dark mode by default

#### 6. Optimization Suggestions
Provides actionable recommendations:

**Categories:**
1. **Caching** - Add `actions/cache@v4` for dependencies
2. **Parallelization** - Use matrix strategy
3. **Resource optimization** - Use latest runners
4. **Schedule optimization** - Stagger workflows
5. **Artifact management** - Set retention periods
6. **Monitoring** - Add timeouts and notifications

---

## 🏥 Workflow Health Monitor

**Schedule:** Every 5 minutes + on workflow completion
**Purpose:** Real-time health tracking and critical alerts

### Features

#### 1. Real-Time Health Check
Provides instant health status across three levels:

| Status | Criteria | Action |
|--------|----------|--------|
| **✅ Healthy** | <30% failure rate, <20 queued, <5 stuck | Monitor |
| **⚠️ Degraded** | 30-50% failure rate, 20-50 queued, 1-5 stuck | Alert |
| **🚨 Critical** | >50% failure rate, >50 queued, >5 stuck | Emergency |

**Health Check Logic:**
```bash
# Calculate status
CRITICAL=0
WARNINGS=0
STATUS="healthy"

# Check recent failure rate (last 20 runs)
FAILURE_RATE=$((RECENT_FAILURES * 100 / RECENT_RUNS))

if [ "$FAILURE_RATE" -gt 50 ]; then
  CRITICAL=$((CRITICAL + 1))
  STATUS="critical"
elif [ "$FAILURE_RATE" -gt 30 ]; then
  WARNINGS=$((WARNINGS + 1))
  STATUS="degraded"
fi
```

#### 2. Performance Analysis
Identifies slow and inconsistent workflows:

**Slow Workflow Detection:**
```python
# Workflows with avg duration > 5 minutes
if avg_duration > 300000:  # 5 minutes in ms
    slow_workflows.append({
        'name': name,
        'avg_minutes': round(avg_duration / 60000, 2),
        'p95_minutes': round(p95 / 60000, 2),
        'runs': len(durations)
    })
```

**Optimization Candidates:**
```python
# High variance = inconsistent performance
variance = max_duration - min_duration
if variance > 300000 and len(durations) > 5:
    optimization_candidates.append({
        'name': name,
        'variance_minutes': round(variance / 60000, 2)
    })
```

#### 3. Dependency Health Check
Monitors GitHub Actions and dependencies:

**Checks:**
- **Action versions** - Detects outdated actions
- **Deprecated actions** - Flags deprecated packages
- **Common actions** - Tracks most-used actions
- **Version consistency** - Ensures uniform versions

**Version Checks:**
```bash
# Check for outdated actions
case "$ACTION" in
  "actions/checkout")
    if [ "$VERSION" != "v4" ]; then
      echo "⚠️ $ACTION is using $VERSION (latest: v4)"
    fi
    ;;
  "actions/setup-node")
    if [ "$VERSION" != "v4" ]; then
      echo "⚠️ $ACTION is using $VERSION (latest: v4)"
    fi
    ;;
esac
```

#### 4. Auto-Optimization
Automatically improves workflow configuration:

**Optimization Types:**

1. **Add Caching**
```yaml
# Detects workflows missing caching
if ! grep -q "actions/cache" "$workflow"; then
  if grep -q "actions/setup-node" "$workflow"; then
    # Suggest adding npm caching
  fi
fi
```

2. **Add Timeouts**
```yaml
# Adds timeout-minutes where missing
jobs:
  job-name:
    timeout-minutes: 30  # Auto-added
```

3. **Consolidate Checkouts**
```bash
# Detects multiple checkouts in same job
CHECKOUT_COUNT=$(grep -c "uses: actions/checkout" "$workflow")
if [ "$CHECKOUT_COUNT" -gt 3 ]; then
  echo "Consider consolidating checkouts"
fi
```

#### 5. Health Status Badge
Generates SVG badge showing current health:

**Badge Generation:**
```bash
STATUS="healthy"  # or "degraded" or "critical"

case "$STATUS" in
  "healthy")
    COLOR="brightgreen"
    ;;
  "degraded")
    COLOR="yellow"
    ;;
  "critical")
    COLOR="red"
    ;;
esac

# Generate SVG badge at .github/badges/workflow-health.svg
```

**Usage in README:**
```markdown
![Workflow Health](https://raw.githubusercontent.com/BlackRoad-OS/blackroad-os-infra/main/.github/badges/workflow-health.svg)
```

#### 6. Critical Alerts
Auto-creates GitHub issues for critical problems:

**Alert Conditions:**
- Health status = "critical"
- >50% failure rate
- >50 workflows queued
- >5 workflows stuck >1 hour

**Issue Template:**
```markdown
## Critical Workflow Health Alert

**Status:** critical
**Critical Issues:** 3
**Warnings:** 1

### Immediate Actions Required

1. Check for stuck workflows (running >1 hour)
2. Review recent failures for patterns
3. Check GitHub Actions quota/capacity
4. Investigate queue backlog

🚨 This is an automated alert from the Workflow Health Monitor
```

---

## 📈 Metrics & Reporting

### Key Metrics Tracked

#### Availability Metrics
| Metric | Description | Target |
|--------|-------------|--------|
| Success Rate | % of successful runs | >90% |
| Availability | % of time system operational | >99% |
| MTTR | Mean Time To Recovery | <30min |
| MTBF | Mean Time Between Failures | >24h |

#### Performance Metrics
| Metric | Description | Target |
|--------|-------------|--------|
| Avg Duration | Average workflow runtime | <5min |
| P95 Duration | 95th percentile runtime | <15min |
| Queue Time | Time spent in queue | <1min |
| Concurrent Runs | Active workflows | <20 |

#### Quality Metrics
| Metric | Description | Target |
|--------|-------------|--------|
| Flaky Rate | % of flaky workflows | <5% |
| Failure Spikes | Sudden failure increases | 0 |
| Stuck Workflows | Long-running workflows | 0 |
| Dep Freshness | Outdated dependencies | 0 |

### Report Types

#### 1. Summary Report (GitHub Step Summary)
```markdown
# 📊 Workflow Observability Report

## Key Metrics (Last 24 Hours)

| Metric | Value |
|--------|-------|
| Total Workflows | 487 |
| Success Rate | 92.35% |
| Active Workflows | 8 |
| Failed Workflows | 12 |
| Avg Duration | 127.45s |

## Health Status
✅ Healthy

## Detected Issues
2 issue(s) detected
```

#### 2. Health Report
```markdown
# 🏥 Workflow Health Monitor Report

## Overall Status
**Health:** healthy
**Critical Issues:** 0
**Warnings:** 2

## Health Indicators

| Indicator | Status |
|-----------|--------|
| Failure Rate | ✅ Normal |
| Queue Status | ✅ Clear |
| Performance | ⚠️ Some slow workflows |
| Dependencies | ✅ Up to date |
```

#### 3. Optimization Report
Generated at `/tmp/optimization-suggestions.md`:

```markdown
# 💡 Workflow Optimization Suggestions

## 1. Caching Improvements
- Add npm caching to: deployment.yml, testing.yml
- Cache Docker layers in: infrastructure-orchestration.yml

## 2. Parallel Execution
- Run tests in parallel: comprehensive-testing.yml
- Parallelize deployments: multi-cloud-deploy.yml

## 3. Resource Optimization
- Use ubuntu-latest instead of custom runners
- Add concurrency groups to prevent duplicate runs
```

---

## 🔧 Usage & Configuration

### Running Manually

#### Trigger Observability Check
```bash
gh workflow run workflow-observability.yml
```

#### Trigger Health Check
```bash
gh workflow run workflow-health-monitor.yml
```

#### View Latest Results
```bash
# Get latest workflow run
gh run list --workflow=workflow-observability.yml --limit 1

# View run details
gh run view <run-id>
```

### Configuration

#### Adjust Monitoring Frequency

**Observability (default: every 15 minutes):**
```yaml
on:
  schedule:
    - cron: '*/15 * * * *'  # Change to */30 for 30 minutes
```

**Health Monitor (default: every 5 minutes):**
```yaml
on:
  schedule:
    - cron: '*/5 * * * *'  # Change to */10 for 10 minutes
```

#### Customize Thresholds

**Success Rate:**
```bash
# Default: 80%
if (( $(echo "$SUCCESS_RATE < 80" | bc -l) )); then
  # Change to 90 for stricter monitoring
  if (( $(echo "$SUCCESS_RATE < 90" | bc -l) )); then
```

**Stuck Workflow Timeout:**
```bash
# Default: 1 hour (3600 seconds)
--jq '.[] | select((now - (.createdAt | fromdateiso8601)) > 3600)'
# Change 3600 to 7200 for 2 hours
```

**Queue Backlog:**
```bash
# Default: 50 workflows
if [ "$QUEUED" -gt 50 ]; then
  # Change to 100 for higher capacity systems
  if [ "$QUEUED" -gt 100 ]; then
```

---

## 📊 Dashboard Access

### HTML Dashboard

**Location:** `/tmp/workflow-dashboard.html`

**Access:**
1. Run workflow observability
2. Download dashboard artifact
3. Open in browser

**Auto-refresh:** Every 5 minutes

### GitHub Actions Dashboard

**URL:** `https://github.com/BlackRoad-OS/blackroad-os-infra/actions`

**Filter by workflow:**
- Observability: `workflow:workflow-observability.yml`
- Health: `workflow:workflow-health-monitor.yml`

---

## 🚨 Alerts & Notifications

### Alert Levels

#### Level 1: Info (Logged)
- Minor performance degradation
- Single workflow failure
- Queue < 20 workflows

**Action:** Log only, no notification

#### Level 2: Warning (Issue)
- Success rate 70-80%
- Queue 20-50 workflows
- 1-5 stuck workflows

**Action:** Create labeled issue

#### Level 3: Critical (Issue + Assignee)
- Success rate <70%
- Queue >50 workflows
- >5 stuck workflows

**Action:** Create issue, assign, alert

### Notification Channels

**GitHub Issues:**
- Auto-created for critical alerts
- Labeled: `workflow`, `needs-attention`, `critical`
- Assigned to repository maintainers

**Workflow Summary:**
- Every run generates summary
- Visible in workflow run page
- Includes all metrics

**Commit Status:**
- Health badge updated on main branch
- Visible in README

---

## 🔍 Troubleshooting

### Common Issues

#### High Failure Rate

**Symptoms:**
- Success rate <80%
- Multiple workflows failing

**Diagnosis:**
```bash
# Check recent failures
gh run list --status failure --limit 20

# Analyze failure patterns
gh run list --json name,conclusion | \
  jq '[.[] | select(.conclusion == "failure")] | group_by(.name) | .[] | {name: .[0].name, count: length}'
```

**Solutions:**
1. Check for flaky tests
2. Review recent code changes
3. Verify infrastructure health
4. Check external dependencies

#### Stuck Workflows

**Symptoms:**
- Workflows running >1 hour
- No progress in logs

**Diagnosis:**
```bash
# Find stuck workflows
gh run list --status in_progress | \
  while read -r id name created; do
    age=$(($(date +%s) - $(date -d "$created" +%s)))
    if [ $age -gt 3600 ]; then
      echo "Stuck: $name ($id) - ${age}s"
    fi
  done
```

**Solutions:**
1. Cancel stuck runs manually
2. Add timeout-minutes to jobs
3. Check for infinite loops
4. Review resource constraints

#### Queue Backlog

**Symptoms:**
- >20 workflows queued
- Long wait times

**Diagnosis:**
```bash
# Check queue
gh run list --status queued --limit 100 | wc -l

# Check runner availability
gh api /repos/BlackRoad-OS/blackroad-os-infra/actions/runners
```

**Solutions:**
1. Add more runners
2. Optimize workflow duration
3. Use concurrency groups
4. Stagger scheduled workflows

---

## 📚 Best Practices

### 1. Monitor Proactively
- Review dashboards daily
- Check health badge in README
- Subscribe to critical issues

### 2. Optimize Continuously
- Apply optimization suggestions
- Update outdated actions
- Add caching where missing

### 3. Set Realistic Thresholds
- Adjust based on your workflow patterns
- Account for scheduled bursts
- Consider time zones

### 4. Document Changes
- Log significant workflow changes
- Update observability config
- Track optimization impact

### 5. Test Monitoring
- Manually trigger health checks
- Verify alert creation
- Test auto-remediation

---

## 🎯 Metrics Goals

### Short Term (1 month)
- [ ] Success rate >90%
- [ ] Avg duration <5 minutes
- [ ] Zero stuck workflows
- [ ] All actions up to date

### Medium Term (3 months)
- [ ] Success rate >95%
- [ ] P95 duration <10 minutes
- [ ] Flaky rate <5%
- [ ] Auto-remediation 100% effective

### Long Term (6 months)
- [ ] Success rate >99%
- [ ] All workflows cached
- [ ] Predictive alerting
- [ ] Zero manual interventions

---

## 🔗 Related Documentation

- **Infrastructure Orchestration:** [infrastructure-orchestration.yml](../.github/workflows/infrastructure-orchestration.yml)
- **Self-Healing System:** [self-healing.yml](../.github/workflows/self-healing.yml)
- **Predictive Maintenance:** [predictive-maintenance.yml](../.github/workflows/predictive-maintenance.yml)
- **Deployment Rollback:** [deployment-rollback.yml](../.github/workflows/deployment-rollback.yml)

---

## 📞 Support

**Issues:** https://github.com/BlackRoad-OS/blackroad-os-infra/issues
**Monitoring:** Every 5-15 minutes automatically
**Health Badge:** ![Workflow Health](.github/badges/workflow-health.svg)

---

**🔧 Work smarter, not harder - observability makes it possible!**
