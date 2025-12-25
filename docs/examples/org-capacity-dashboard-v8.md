# 🧩 EXAMPLES PACK v8 — Org-Wide Capacity Dashboard

**Version:** 8.0  
**Purpose:** Visual template for tracking organizational capacity across 7 teams with 7 key signals  
**Updated:** 2025-12-25

## Legend

| Symbol | Meaning | Color |
|--------|---------|-------|
| 🟢 | Good / Healthy | Green |
| 🟡 | Watch / Caution | Yellow |
| 🔴 | Bad / Critical | Red |
| ⚪️ | Empty / No Data | White |

**Scale:** 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣ (7 orgs × 7 signals)

---

## 🏢 ORG CAPACITY DASHBOARD

**Format Template:**

```
🏢 ORG CAPACITY DASHBOARD: ____________________   📅 WEEK: ____________   🚦 STATUS: 🟡

🧭 SIGNAL SCALE: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

A) 👥 Headcount     🟢🟢🟢🟢🟢⚪️⚪️
B) 🧠 Focus time    🟢🟢🟢⚪️⚪️⚪️⚪️
C) ⚙️ WIP load      🟡🟡🟡⚪️⚪️⚪️⚪️
D) 🧱 Blocked       🔴🔴⚪️⚪️⚪️⚪️⚪️   😭
E) 🔥 Priority      🟢🟢🟢🟢⚪️⚪️⚪️
F) 📣 Comms health  🟢🟢🟢⚪️⚪️⚪️⚪️
G) ✨ Momentum      🟢🟢🟢🟢🟢⚪️⚪️

👥 TEAM GRID (7)
Team A __________   🟢🟢🟢🟢⚪️⚪️⚪️
Team B __________   🟢🟢🟢⚪️⚪️⚪️⚪️
Team C __________   🟡🟡🟡⚪️⚪️⚪️⚪️
Team D __________   🔴🔴⚪️⚪️⚪️⚪️⚪️
Team E __________   🟢🟢🟢🟢🟢⚪️⚪️
Team F __________   🟢🟢⚪️⚪️⚪️⚪️⚪️
Team G __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

---

## 📊 Signal Definitions

### A) 👥 Headcount
**What it measures:** Team staffing levels relative to planned capacity  
**Good (🟢):** 90-110% of planned headcount  
**Watch (🟡):** 70-89% or 111-120% of planned  
**Bad (🔴):** <70% or >120% of planned  

### B) 🧠 Focus Time
**What it measures:** % of time available for deep work (not meetings/interrupts)  
**Good (🟢):** >50% focus time available  
**Watch (🟡):** 30-50% focus time  
**Bad (🔴):** <30% focus time  

### C) ⚙️ WIP Load
**What it measures:** Work-in-progress items per team member  
**Good (🟢):** 1-2 concurrent tasks per person  
**Watch (🟡):** 3-4 concurrent tasks per person  
**Bad (🔴):** >4 concurrent tasks per person  

### D) 🧱 Blocked
**What it measures:** % of work items currently blocked  
**Good (🟢):** <10% of items blocked  
**Watch (🟡):** 10-25% of items blocked  
**Bad (🔴):** >25% of items blocked  

### E) 🔥 Priority
**What it measures:** Team alignment on top priorities  
**Good (🟢):** Clear priorities, >80% team agreement  
**Watch (🟡):** Some confusion, 60-80% agreement  
**Bad (🔴):** Unclear priorities, <60% agreement  

### F) 📣 Comms Health
**What it measures:** Communication effectiveness and team sync  
**Good (🟢):** Regular syncs, clear updates, fast response  
**Watch (🟡):** Occasional delays, some info gaps  
**Bad (🔴):** Poor communication, frequent misalignment  

### G) ✨ Momentum
**What it measures:** Team velocity and progress on objectives  
**Good (🟢):** Meeting or exceeding sprint goals  
**Watch (🟡):** Slightly behind target, some delays  
**Bad (🔴):** Significantly behind, stalled progress  

---

## 🎯 Usage Examples

### Example 1: Healthy Org (All Teams Green)
```
🏢 ORG CAPACITY DASHBOARD: Q4 2025 Review   📅 WEEK: 2025-W52   🚦 STATUS: 🟢

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

A) 👥 Headcount     🟢🟢🟢🟢🟢🟢🟢
B) 🧠 Focus time    🟢🟢🟢🟢🟢🟢🟢
C) ⚙️ WIP load      🟢🟢🟢🟢🟢🟢🟢
D) 🧱 Blocked       🟢🟢🟢🟢🟢🟢🟢
E) 🔥 Priority      🟢🟢🟢🟢🟢🟢🟢
F) 📣 Comms health  🟢🟢🟢🟢🟢🟢🟢
G) ✨ Momentum      🟢🟢🟢🟢🟢🟢🟢

👥 TEAM GRID (7)
Platform Eng ___   🟢🟢🟢🟢🟢🟢🟢
API Team ________   🟢🟢🟢🟢🟢🟢🟢
Web Team ________   🟢🟢🟢🟢🟢🟢🟢
Data Team _______   🟢🟢🟢🟢🟢🟢🟢
Security Team ___   🟢🟢🟢🟢🟢🟢🟢
DevOps Team _____   🟢🟢🟢🟢🟢🟢🟢
AI Research _____   🟢🟢🟢🟢🟢🟢🟢
```

### Example 2: Mixed Status (Some Issues)
```
🏢 ORG CAPACITY DASHBOARD: Sprint 42      📅 WEEK: 2025-W51   🚦 STATUS: 🟡

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

A) 👥 Headcount     🟢🟢🟢🟡🟡⚪️⚪️   ⚠️ Two teams understaffed
B) 🧠 Focus time    🟢🟢🟡🟡⚪️⚪️⚪️   ⚠️ Meeting overload
C) ⚙️ WIP load      🟡🟡🟡🟡⚪️⚪️⚪️   ⚠️ Too many concurrent projects
D) 🧱 Blocked       🔴🔴🟡⚪️⚪️⚪️⚪️   😭 Platform blockers
E) 🔥 Priority      🟢🟢🟢🟢🟢⚪️⚪️
F) 📣 Comms health  🟢🟢🟢🟡⚪️⚪️⚪️
G) ✨ Momentum      🟢🟢🟡🟡🟡⚪️⚪️

👥 TEAM GRID (7)
Platform Eng ___   🔴🟡🟡🟢🟢🟢🟢   (blocked on infra)
API Team ________   🟢🟢🟢🟢🟢🟢🟢
Web Team ________   🟡🟡🟢🟢🟢🟢🟢   (high WIP)
Data Team _______   🔴🟡🟡🟢🟢🟢🟢   (blocked + understaffed)
Security Team ___   🟢🟢🟢🟢🟢🟢🟢
DevOps Team _____   🟡🟡🟡🟢🟢🟢🟢   (focus time issues)
AI Research _____   🟢🟢🟢🟢🟢🟢🟢
```

### Example 3: Critical Issues
```
🏢 ORG CAPACITY DASHBOARD: Incident Recovery   📅 WEEK: 2025-W50   🚦 STATUS: 🔴

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

A) 👥 Headcount     🔴🔴🟡🟡🟢⚪️⚪️   😭 Critical staffing shortage
B) 🧠 Focus time    🔴🔴🔴🟡⚪️⚪️⚪️   😭 Constant firefighting
C) ⚙️ WIP load      🔴🔴🔴🔴⚪️⚪️⚪️   😭 Overloaded teams
D) 🧱 Blocked       🔴🔴🔴🔴🟡⚪️⚪️   😭 Multiple blockers
E) 🔥 Priority      🔴🔴🟡🟢🟢⚪️⚪️   😭 Priority chaos
F) 📣 Comms health  🔴🟡🟡🟢⚪️⚪️⚪️   😭 Communication breakdown
G) ✨ Momentum      🔴🔴🔴🟡⚪️⚪️⚪️   😭 Stalled progress

👥 TEAM GRID (7)
Platform Eng ___   🔴🔴🔴🔴🔴🔴🔴   (CRITICAL - multiple issues)
API Team ________   🔴🔴🔴🟡🟡🟢🟢   (incident recovery)
Web Team ________   🔴🔴🟡🟡🟢🟢🟢   (high load)
Data Team _______   🔴🔴🔴🔴🟡⚪️⚪️   (severely understaffed)
Security Team ___   🟡🟡🟡🟢🟢🟢🟢   (stretched thin)
DevOps Team _____   🔴🔴🔴🟡🟡🟢🟢   (infrastructure issues)
AI Research _____   🟡🟡🟢🟢🟢🟢🟢   (blocked dependencies)
```

---

## 📋 Data Collection Guidelines

### Manual Collection Process
1. **Weekly Survey:** Send team leads a 7-question survey
2. **Aggregate Results:** Collect and normalize responses
3. **Generate Visual:** Create the dashboard view
4. **Share & Discuss:** Review in leadership sync

### Automated Collection (Future)
```yaml
# Example automation config
dashboard:
  schedule: weekly
  day: friday
  time: "16:00"
  
  signals:
    - name: headcount
      source: hr_system_api
      threshold: { good: [0.9, 1.1], watch: [0.7, 1.2] }
    
    - name: focus_time
      source: calendar_api
      calculation: (total_hours - meeting_hours) / total_hours
      threshold: { good: 0.5, watch: 0.3 }
    
    - name: wip_load
      source: jira_api
      calculation: in_progress_items / team_size
      threshold: { good: 2, watch: 4 }
    
    - name: blocked
      source: jira_api
      calculation: blocked_items / total_items
      threshold: { good: 0.1, watch: 0.25 }
    
    - name: priority
      source: team_survey
      calculation: priority_agreement_percentage
      threshold: { good: 0.8, watch: 0.6 }
    
    - name: comms_health
      source: slack_api + team_survey
      calculation: composite_comms_score
      threshold: { good: 80, watch: 60 }
    
    - name: momentum
      source: jira_api
      calculation: completed_story_points / planned_story_points
      threshold: { good: 0.9, watch: 0.7 }
```

---

## 🔧 Implementation Notes

### For BlackRoad OS Infrastructure

This dashboard format can be implemented as:

1. **Static Markdown Reports:** Generated weekly via script
2. **JSON API Endpoint:** `/api/org-capacity?week=2025-W52`
3. **Live Dashboard:** Real-time visualization in Prism Console
4. **Slack/Discord Bot:** Automated weekly posts

### Integration with Existing Systems

```typescript
// Example TypeScript interface
interface OrgCapacitySignal {
  signal: 'headcount' | 'focus_time' | 'wip_load' | 'blocked' | 
          'priority' | 'comms_health' | 'momentum';
  status: 'good' | 'watch' | 'bad' | 'empty';
  value?: number;
  metadata?: {
    threshold?: { good: number; watch: number };
    notes?: string;
  };
}

interface TeamCapacity {
  team: string;
  signals: OrgCapacitySignal[];
  overallStatus: 'good' | 'watch' | 'bad';
}

interface OrgCapacityDashboard {
  org: string;
  week: string;
  status: 'good' | 'watch' | 'bad';
  teams: TeamCapacity[];
  updated_at: string;
}
```

### Example JSON Output

```json
{
  "org": "BlackRoad OS",
  "week": "2025-W52",
  "status": "watch",
  "updated_at": "2025-12-25T18:00:00Z",
  "teams": [
    {
      "team": "Platform Engineering",
      "overallStatus": "watch",
      "signals": [
        { "signal": "headcount", "status": "good", "value": 1.0 },
        { "signal": "focus_time", "status": "good", "value": 0.55 },
        { "signal": "wip_load", "status": "watch", "value": 3.2 },
        { "signal": "blocked", "status": "bad", "value": 0.30 },
        { "signal": "priority", "status": "good", "value": 0.85 },
        { "signal": "comms_health", "status": "good", "value": 82 },
        { "signal": "momentum", "status": "good", "value": 0.92 }
      ]
    }
  ]
}
```

---

## 📊 Dashboard Variants

### Compact View (Email/Slack)
```
🏢 Org Capacity W52: 🚦 🟡
A)👥🟢🟢🟢🟢🟢⚪️⚪️ B)🧠🟢🟢🟢⚪️⚪️⚪️⚪️ C)⚙️🟡🟡🟡⚪️⚪️⚪️⚪️
D)🧱🔴🔴⚪️⚪️⚪️⚪️⚪️ E)🔥🟢🟢🟢🟢⚪️⚪️⚪️ F)📣🟢🟢🟢⚪️⚪️⚪️⚪️
G)✨🟢🟢🟢🟢🟢⚪️⚪️
```

### Extended View (With Trends)
```
🏢 ORG CAPACITY DASHBOARD: Q4 2025   📅 WEEK: 2025-W52   🚦 STATUS: 🟡
Trend: 🟢→🟡 (declining)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

A) 👥 Headcount     🟢🟢🟢🟢🟢⚪️⚪️  ↗️ +2 new hires
B) 🧠 Focus time    🟢🟢🟢⚪️⚪️⚪️⚪️  ↘️ -15% vs last week
C) ⚙️ WIP load      🟡🟡🟡⚪️⚪️⚪️⚪️  → stable
D) 🧱 Blocked       🔴🔴⚪️⚪️⚪️⚪️⚪️  ↗️ +3 new blockers
E) 🔥 Priority      🟢🟢🟢🟢⚪️⚪️⚪️  → stable
F) 📣 Comms health  🟢🟢🟢⚪️⚪️⚪️⚪️  ↗️ improving
G) ✨ Momentum      🟢🟢🟢🟢🟢⚪️⚪️  → stable
```

---

## 🎓 Best Practices

1. **Consistency:** Review the same day/time each week
2. **Transparency:** Share dashboard org-wide, not just leadership
3. **Action-Oriented:** Each 🔴 should have an action plan
4. **Trend Tracking:** Compare week-over-week, not just absolute status
5. **Team Input:** Survey teams directly, don't just use metrics
6. **Context Matters:** 🔴 during a planned migration ≠ unexpected crisis
7. **Celebrate Wins:** Acknowledge teams going 🔴→🟢

---

## 📚 Related Documentation

- [Service Health Endpoints](../observability/health-endpoints.md)
- [Monitoring Dashboard Config](../../monitoring/dashboard.json)
- [SIG Beacon Specification](../../sig/sig.beacon.spec.json)
- [Team Registry](../../registry/services.yaml)

---

**Version History:**
- v8.0 (2025-12-25): Initial release with 7 orgs × 7 signals format
- Future: v9.0 will add automation and API integration

**Maintained By:** BlackRoad OS Infrastructure Team  
**Feedback:** Open an issue or PR in blackroad-os-infra repo
