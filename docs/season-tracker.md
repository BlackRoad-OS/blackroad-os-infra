# Season Tracker

Track progress of architectural seasons across BlackRoad OS repos.

## Legend
- ✅ Applied & committed
- 🚧 In progress
- ⏸️ Ready to apply (prompt ready)
- ⬜ Not started

---

## `blackroad-os-core`

| Season | Status | Notes |
|--------|--------|-------|
| S1 — Agent Registry v1 | ✅ | Base CRUD for Agents |
| S3.5 — Agent Runs v1 | ⏸️ | AgentRun model + trigger/history |
| S4 — Hardening | ⏸️ | Validation utils + error hygiene |
| S5 — Telemetry | ⏸️ | Metrics + request IDs + structured logging |
| S6 — Task Registry v1 | ⏸️ | Second lane (Tasks CRUD) |
| S7 — Auth & RBAC | ⏸️ | User model + JWT + /auth routes |
| S8 — Tests & CI | ⏸️ | Jest + supertest + GitHub Actions |

---

## `blackroad-os-api`

| Season | Status | Notes |
|--------|--------|-------|
| S1 — Agent Registry v1 | ✅ | Proxy /agents to Core |
| S3.5 — Agent Runs v1 | ⏸️ | Proxy /agents/:id/run, /agents/:id/runs |
| S4 — Hardening | ⏸️ | Error response docs |
| S5 — Telemetry | ⏸️ | Request ID propagation + /metrics proxy |
| S6 — Task Registry v1 | ⏸️ | Proxy /tasks to Core |
| S7 — Auth & RBAC | ⏸️ | Proxy /auth routes + JWT middleware |
| S8 — Tests & CI | ⏸️ | Proxy behavior tests + GitHub Actions |

---

## `blackroad-os-prism-console`

| Season | Status | Notes |
|--------|--------|-------|
| S1 — Agent Registry v1 | ✅ | /agents page + create form + table |
| S3.5 — Agent Runs v1 | ⏸️ | Run trigger UI + history table |
| S4 — Hardening | ⏸️ | Client-side validation + error mapping |
| S5 — Telemetry | ⏸️ | Status card + metrics display |
| S6 — Task Registry v1 | ⏸️ | /tasks page + CRUD UI |
| S7 — Auth & RBAC | ⏸️ | Login page + session + protected routes |
| S8 — Tests & CI | ⏸️ | React Testing Library + GitHub Actions |

---

## `blackroad-os-infra`

| Season | Status | Notes |
|--------|--------|-------|
| S2 — Lane Documentation | ✅ | agent-registry-v1.md, _lane-template.md, how-to-build-a-lane.md |

---

## Recommended Order

### Phase 1: Complete Agent Lane
1. Core: Apply S3.5, S4, S5, S7, S8
2. API: Apply S3.5, S4, S5, S7, S8
3. Console: Apply S3.5, S4, S5, S7, S8

Result: Agent lane is bulletproof (runs + validation + auth + tests)

### Phase 2: Clone Pattern to Tasks
1. Core: Apply S6
2. API: Apply S6
3. Console: Apply S6

Result: Second lane proves pattern is replicable

### Phase 3: CI Everywhere
Verify all repos have green CI pipelines from S8

---

## Quick Reference: Season Prompts

Each season has a repo-aware prompt. To apply:

1. `cd ~/projects/<repo-name>`
2. `claude`
3. Paste season prompt
4. Accept edits
5. Run migrations/tests
6. Commit with: `git commit -m "Season X: <name>"`

Season prompts are stored in previous Claude Code conversation history.
