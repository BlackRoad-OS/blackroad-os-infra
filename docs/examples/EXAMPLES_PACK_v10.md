# 🧩 EXAMPLES PACK v10 (innovation + experiments)

> **Template for tracking experimental work with visual status indicators**

This template provides a structured format for tracking 7 experiments across 7 time periods (or signals), with visual status indicators and outcome tracking.

---

## 📊 How to Use This Template

1. **Copy the template section below** for your experimental work
2. **Fill in the experiment names** replacing the placeholder `__________`
3. **Update status indicators** for each time period/signal
4. **Update signal strength bars** (▪️ filled, ▫️ empty)
5. **Mark final outcome** by uncommenting the relevant row

---

## 🎨 Legend

### Status Indicators
- 🟢 **good** — Experiment is performing well / on track
- 🟡 **watch** — Experiment needs attention / borderline
- 🔴 **bad** — Experiment failed / blocked
- ⚪️ **empty** — No data yet / not started

### Signal Strength
- 📶 **Signal bars** — Visual representation of progress/confidence (0-7)
  - ▪️ filled bar (positive signal present)
  - ▫️ empty bar (no signal yet)
  - Example: ▪️▪️▫️▫️▫️▫️▫️ represents 2/7 strength

### Experiment Types
- 🧠 **Hypothesis** — Initial hypothesis being tested
- 🧬 **Variant A/B** — Different approaches/variations being tried
- 📊 **Metric** — Measurement/metrics being tracked
- 🧪 **Run** — Execution of the experiment
- ✅ **Result** — Outcomes observed
- 🧾 **Decision** — Final decision made

---

## 📋 TEMPLATE

```
🧪 EXPERIMENT BOARD: ____________________   📅 WEEK: ____________   🚦 STATUS: 🟡
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

E1 🧠 Hypothesis __________   🟢🟢🟢⚪️⚪️⚪️⚪️   📶 ▪️▪️▪️▫️▫️▫️▫️
E2 🧬 Variant A __________   🟢🟢⚪️⚪️⚪️⚪️⚪️   📶 ▪️▪️▫️▫️▫️▫️▫️
E3 🧬 Variant B __________   🟡🟡🟡⚪️⚪️⚪️⚪️   📶 ▪️▪️▫️▫️▫️▫️▫️
E4 📊 Metric   __________   🟢🟢🟢🟢⚪️⚪️⚪️   📶 ▪️▪️▪️▪️▫️▫️▫️
E5 🧪 Run      __________   🟢🟢⚪️⚪️⚪️⚪️⚪️   📶 ▪️▪️▫️▫️▫️▫️▫️
E6 ✅ Result   __________   🟡🟡⚪️⚪️⚪️⚪️⚪️   📶 ▪️▫️▫️▫️▫️▫️▫️
E7 🧾 Decision __________   🔴🔴⚪️⚪️⚪️⚪️⚪️   😭

🏁 OUTCOMES (pick one row)
✅✅✅✅✅✅✅
🎉🎉🎉🎉🎉🎉🎉
❌❌❌❌❌❌❌
```

---

## 🎯 Example Usage

### Example 1: AI Model Optimization Experiment

```
🧪 EXPERIMENT BOARD: AI Model Optimization   📅 WEEK: 2025-W01   🚦 STATUS: 🟢
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

E1 🧠 Hypothesis Token reduction improves latency   🟢🟢🟢🟢🟢⚪️⚪️   📶 ▪️▪️▪️▪️▪️▫️▫️
E2 🧬 Variant A  Aggressive pruning (50%)           🟢🟢🟢🟡⚪️⚪️⚪️   📶 ▪️▪️▪️▪️▫️▫️▫️
E3 🧬 Variant B  Conservative pruning (25%)         🟢🟢🟢🟢🟢⚪️⚪️   📶 ▪️▪️▪️▪️▪️▫️▫️
E4 📊 Metric     Response time & accuracy           🟢🟢🟢🟢🟢🟢⚪️   📶 ▪️▪️▪️▪️▪️▪️▫️
E5 🧪 Run        Load test 1000 requests            🟢🟢🟢🟢🟢⚪️⚪️   📶 ▪️▪️▪️▪️▪️▫️▫️
E6 ✅ Result     25% faster, accuracy maintained    🟢🟢🟢🟢🟢⚪️⚪️   📶 ▪️▪️▪️▪️▪️▫️▫️
E7 🧾 Decision   Deploy Variant B to production     🟢🟢🟢🟢🟢⚪️⚪️   🎉

🏁 OUTCOMES (pick one row)
<!-- ✅✅✅✅✅✅✅ -->
🎉🎉🎉🎉🎉🎉🎉
<!-- ❌❌❌❌❌❌❌ -->
```

### Example 2: Failed Database Migration Experiment

```
🧪 EXPERIMENT BOARD: Database Sharding Strategy   📅 WEEK: 2025-W02   🚦 STATUS: 🔴
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

E1 🧠 Hypothesis Horizontal sharding improves throughput   🟢🟢🟡⚪️⚪️⚪️⚪️   📶 ▪️▪️▫️▫️▫️▫️▫️
E2 🧬 Variant A  User ID based sharding                   🟢🟡🔴⚪️⚪️⚪️⚪️   📶 ▪️▫️▫️▫️▫️▫️▫️
E3 🧬 Variant B  Geographic sharding                      🟢🟢🟡🔴⚪️⚪️⚪️   📶 ▪️▪️▫️▫️▫️▫️▫️
E4 📊 Metric     Query latency & data consistency         🟢🟢🟢🟡⚪️⚪️⚪️   📶 ▪️▪️▪️▫️▫️▫️▫️
E5 🧪 Run        Staging environment load test            🟢🟢🟡🔴⚪️⚪️⚪️   📶 ▪️▪️▫️▫️▫️▫️▫️
E6 ✅ Result     Data consistency issues detected         🔴🔴🔴⚪️⚪️⚪️⚪️   📶 ▫️▫️▫️▫️▫️▫️▫️
E7 🧾 Decision   Roll back, keep current architecture     🔴🔴🔴⚪️⚪️⚪️⚪️   😭

🏁 OUTCOMES (pick one row)
<!-- ✅✅✅✅✅✅✅ -->
<!-- 🎉🎉🎉🎉🎉🎉🎉 -->
❌❌❌❌❌❌❌
```

---

## 📝 Best Practices

### Status Updates
- **Update regularly**: Keep status indicators current (daily or weekly)
- **Be honest**: Use 🔴 early to flag problems
- **Signal strength**: Update ▪️▫️ bars to show progress accumulation

### Experiment Structure
- **Clear hypothesis**: State what you're testing
- **Multiple variants**: Try at least 2 approaches when possible
- **Measurable metrics**: Define success criteria upfront
- **Document results**: Record outcomes even for failures

### Decision Making
- **Learn from failures**: 😭 experiments teach valuable lessons
- **Celebrate successes**: 🎉 when experiments validate hypotheses
- **Neutral outcomes**: ✅ when results are mixed or inconclusive

### Board Organization
- **One board per experiment set**: Related experiments go together
- **Track by week**: Use WEEK field for temporal tracking
- **Status badge**: 🟢 (on track), 🟡 (needs attention), 🔴 (blocked)

---

## 🔗 Related Resources

- [AI Innovation Agents](../AI_INNOVATION_AGENTS.md) - AI agent experimentation framework
- [Research Banner Template](../../scripts/templates/RESEARCH_BANNER.md) - For experimental repos
- [Service Packs](../../services/packs/) - Pack system for modular experiments

---

**Template Version**: v10  
**Created**: 2025-12-25  
**Purpose**: Track innovation experiments with visual status indicators
