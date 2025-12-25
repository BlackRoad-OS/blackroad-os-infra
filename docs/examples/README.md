# 📚 BlackRoad OS Infrastructure Examples

This directory contains example files and templates for various infrastructure components and processes.

---

## 📋 Available Examples

### 🧪 Experiment Board v10
**Files:**
- `experiment-board-v10.md` - Visual markdown template for tracking experiments
- `experiment-board-v10.sample.json` - Complete JSON example with sample data
- `experiment-board-v10.schema.json` - JSON schema definition

**Purpose:** Track innovation experiments with 7 experiments × 7 signals. Each experiment has 7 checkpoints with visual status indicators (🟢 good, 🟡 watch, 🔴 bad, ⚪️ empty).

**Use Cases:**
- Feature experimentation tracking
- A/B testing monitoring
- Innovation project status boards
- Research experiment documentation

**Quick Start:**
```bash
# Copy the template
cp docs/examples/experiment-board-v10.md my-experiment-board.md

# Edit with your experiment details
# Update signals as experiments progress
```

---

### 📡 SIG Beacon
**Files:**
- `sig.beacon.sample.json` - Service health beacon example

**Purpose:** Monitor service health and status across the infrastructure.

**Fields:**
- `service` - Service name
- `version` - Current version
- `env` - Environment (prod, staging, dev)
- `status` - Health status
- `url` - Health check endpoint
- `last_checked_at` - Last check timestamp
- `meta` - Additional metadata

---

### 📊 Deploy Log
**Files:**
- `sig.deploy-log.sample.json` - Deployment tracking example

**Purpose:** Track deployment events and outcomes.

**Fields:**
- `service` - Service being deployed
- `env` - Target environment
- `git_sha` - Git commit SHA
- `actor` - Who triggered the deployment
- `started_at` - Start timestamp
- `completed_at` - Completion timestamp
- `outcome` - Result (success, failure)
- `links` - Related URLs (PR, CI run, incidents)

---

## 🎯 Usage Guidelines

### For Experiment Boards

1. **Choose the right template** based on your experiment type
2. **Fill in all required fields** at the start
3. **Update signals regularly** (daily or weekly)
4. **Document learnings** in the notes
5. **Archive completed boards** for future reference

### For Service Beacons

1. **Emit beacons** from every service
2. **Include accurate metadata** for debugging
3. **Update status** in real-time
4. **Use consistent naming** across services

### For Deploy Logs

1. **Log every deployment** regardless of outcome
2. **Include all relevant links** for traceability
3. **Track timing accurately** for metrics
4. **Tag incidents** for post-mortems

---

## 🔗 Related Documentation

- [AI Innovation Agents](../AI_INNOVATION_AGENTS.md) - Automated experiment tracking
- [SIG Beacon Guide](../SIG_BEACON_GUIDE.md) - Service beacon implementation
- [Deployment Status](../DEPLOYMENT_STATUS.md) - Overall deployment tracking
- [Architecture](../ARCHITECTURE.md) - System architecture overview

---

## 🛠️ Tools & Scripts

### Validate JSON Files
```bash
# Validate against schema
npm install -g ajv-cli
ajv validate -s experiment-board-v10.schema.json -d experiment-board-v10.sample.json
```

### Generate Experiment Board
```bash
# Using TypeScript script
npx ts-node scripts/generate_sig_examples.ts
```

---

## 📝 Contributing New Examples

When adding new examples to this directory:

1. **Create a complete example** with sample data
2. **Add a JSON schema** if applicable
3. **Include markdown documentation** with usage instructions
4. **Update this README** with the new example
5. **Link to related docs** for context

### Example Template

```
my-example.md          # Visual/markdown template
my-example.sample.json # Complete JSON example
my-example.schema.json # JSON schema (if applicable)
```

---

## 🎨 Visual Indicator Legend

### Status Indicators
- 🟢 **Good** - On track, no issues
- 🟡 **Watch** - Potential issues, needs attention
- 🔴 **Bad** - Critical issues, blocked
- ⚪️ **Empty** - Not started yet

### Progress Indicators
- 📶 **Signal bars** - Visual progress (▪️ = complete, ▫️ = pending)
- 🚀 **Ready** - Fully complete and ready to launch
- 😭 **Blocked** - Cannot proceed due to dependencies

### Outcome Indicators
- ✅ **Success** - Experiment succeeded
- 🎉 **Celebration** - Outstanding results
- ❌ **Failure** - Experiment failed

---

## 📊 Example Metrics

Track these metrics for experiment boards:

| Metric | Target | Description |
|--------|--------|-------------|
| Experiment completion rate | >80% | % of experiments that reach decision stage |
| Signal accuracy | >90% | % of signals that correctly predicted outcomes |
| Time to decision | <4 weeks | Average time from hypothesis to decision |
| Success rate | >60% | % of experiments that succeed |

---

## 🔍 Quick Reference

### Experiment Types

1. **E1 🧠 Hypothesis** - Define what you're testing
2. **E2 🧬 Variant A** - First implementation approach
3. **E3 🧬 Variant B** - Alternative implementation
4. **E4 📊 Metric** - What you're measuring
5. **E5 🧪 Run** - Execute the experiment
6. **E6 ✅ Result** - Analyze outcomes
7. **E7 🧾 Decision** - Go/no-go decision

### Signal Checkpoints

Each experiment tracks 7 checkpoints to monitor progress:
- Checkpoints 1-3: Early stage validation
- Checkpoints 4-5: Mid-stage execution
- Checkpoints 6-7: Final validation and decision

---

**Last Updated:** 2025-12-25  
**Maintained By:** BlackRoad OS Infrastructure Team  
**Version:** 1.0
