# 🧩 EXAMPLES PACK v32: Governance / Approvals

> **Version:** v32  
> **Type:** governance-approvals  
> **Date:** 2025-12-25  

## Overview

This examples pack demonstrates a governance and approval workflow system with 7 policies progressing through 7 approval gates. It provides a visual representation of the approval process and tracks the status of each policy at each stage.

## Visual Representation

```
Legend: 🟢 approved  🟡 pending  🔴 rejected  ⚪️ empty  ⭕ vote

👩‍⚖️ APPROVAL BOARD: ____________________   📅 WEEK: ____________   🚦 STATUS: 🟡
🧭 Gates →         1️⃣  2️⃣  3️⃣  4️⃣  5️⃣  6️⃣  7️⃣

📜 Policy-01 __________   🟢🟢🟢⚪️⚪️⚪️⚪️
📜 Policy-02 __________   🟡🟡🟡⚪️⚪️⚪️⚪️
📜 Policy-03 __________   🔴🔴⚪️⚪️⚪️⚪️⚪️   😭
📜 Policy-04 __________   🟢🟢⚪️⚪️⚪️⚪️⚪️
📜 Policy-05 __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
📜 Policy-06 __________   🟡🟡⚪️⚪️⚪️⚪️⚪️
📜 Policy-07 __________   🟢🟢🟢🟢⚪️⚪️⚪️

✅ GATE LABELS (edit)
1️⃣ Draft
2️⃣ Review
3️⃣ Legal
4️⃣ Security
5️⃣ Vote ⭕
6️⃣ Approve
7️⃣ Publish
```

## Approval Gates

The governance system uses 7 approval gates that each policy must pass through:

| Gate | Name | Description |
|------|------|-------------|
| 1️⃣ | **Draft** | Initial draft stage |
| 2️⃣ | **Review** | Peer review stage |
| 3️⃣ | **Legal** | Legal compliance review |
| 4️⃣ | **Security** | Security assessment |
| 5️⃣ | **Vote** ⭕ | Team voting stage |
| 6️⃣ | **Approve** | Final approval |
| 7️⃣ | **Publish** | Publication stage |

## Status Indicators

Each gate can have one of the following statuses:

| Emoji | Status | Description |
|-------|--------|-------------|
| 🟢 | **Approved** | Gate passed successfully |
| 🟡 | **Pending** | Awaiting review or action |
| 🔴 | **Rejected** | Gate failed or rejected |
| ⚪️ | **Empty** | Not yet reached |
| ⭕ | **Vote** | Currently in voting stage |

## Policies

### Policy-01
- **Status:** In Progress
- **Progress:** Passed Draft, Review, and Legal gates (3/7)
- **Current Gate:** Security

### Policy-02
- **Status:** Pending
- **Progress:** Pending at Draft, Review, and Legal gates (0/7)
- **Current Gate:** Draft (pending)

### Policy-03
- **Status:** Rejected 😭
- **Progress:** Rejected at Draft and Review gates
- **Current Gate:** Draft (rejected)
- **Note:** This policy has failed early in the process

### Policy-04
- **Status:** In Progress
- **Progress:** Passed Draft and Review gates (2/7)
- **Current Gate:** Legal

### Policy-05
- **Status:** Not Started
- **Progress:** No gates started (0/7)
- **Current Gate:** Draft (not started)

### Policy-06
- **Status:** Pending
- **Progress:** Pending at Draft and Review gates (0/7)
- **Current Gate:** Draft (pending)

### Policy-07
- **Status:** In Progress
- **Progress:** Passed Draft, Review, Legal, and Security gates (4/7)
- **Current Gate:** Vote

## Data Structure

The governance/approvals pack is stored as a JSON file: [`governance-approvals-v32.json`](./governance-approvals-v32.json)

The data structure includes:
- **Metadata:** Version, type, board name, week, overall status
- **Gates:** Definition of all 7 approval gates
- **Status Indicators:** Definition of status emojis and their meanings
- **Policies:** Complete state of all 7 policies with their gate statuses
- **Visualization:** Text-based board representation

## Use Cases

This governance/approvals system can be used for:

1. **Policy Review Processes:** Track organizational policies through approval workflows
2. **Document Approval:** Manage document review and approval cycles
3. **Change Management:** Track infrastructure or code changes through approval gates
4. **Compliance Workflows:** Ensure proper review stages for regulatory compliance
5. **Release Management:** Track release candidates through approval stages

## Integration

This example can be integrated into:
- **Dashboard UIs:** Display approval boards in web interfaces
- **Slack/Discord Bots:** Post approval status updates
- **CI/CD Pipelines:** Track deployment approvals
- **Project Management Tools:** Link to JIRA, Linear, or GitHub Issues
- **Audit Systems:** Track approval history and compliance

## Extensibility

The system can be extended with:
- **Additional Gates:** Add more approval stages as needed
- **Custom Status Types:** Define organization-specific statuses
- **Approval History:** Track who approved/rejected and when
- **Comments/Notes:** Add feedback at each gate
- **Automated Gates:** Integrate with automated testing/scanning
- **Notifications:** Trigger alerts when policies need attention
- **Analytics:** Generate reports on approval cycle times

## Example Queries

### Get All Pending Policies
```javascript
policies.filter(p => p.overallStatus === 'pending')
// Returns: Policy-02, Policy-06
```

### Get Policies at Security Gate
```javascript
policies.filter(p => 
  p.gateStatuses[3].status === 'approved' && 
  p.gateStatuses[4].status === 'empty'
)
// Returns: Policy-01
```

### Count Approved Gates
```javascript
policies.map(p => ({
  id: p.id,
  approved: p.gateStatuses.filter(g => g.status === 'approved').length
}))
```

## Schema

The JSON schema follows this structure:

```typescript
interface GovernanceApprovalsPack {
  version: string;
  type: "governance-approvals";
  metadata: {
    approvalBoard: string;
    week: string;
    overallStatus: "pending" | "approved" | "rejected";
    createdAt: string;
  };
  gates: Gate[];
  statusIndicators: StatusIndicators;
  policies: Policy[];
  visualization: {
    header: string;
    legend: string;
    board: string[];
  };
}

interface Gate {
  id: number;
  name: string;
  icon: string;
  description: string;
  specialIcon?: string;
}

interface Policy {
  id: string;
  name: string;
  icon: string;
  description: string;
  gateStatuses: GateStatus[];
  overallStatus: string;
  failureNote?: string;
}

interface GateStatus {
  gateId: number;
  status: "approved" | "pending" | "rejected" | "empty" | "vote";
  emoji: string;
}
```

## Related Documentation

- [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)
- [Service Registry](../../registry/services.yaml)
- [Packs Infrastructure](../../services/packs/infra.yml)

## License

Part of BlackRoad OS Infrastructure
