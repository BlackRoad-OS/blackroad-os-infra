# PR Templates

Ready-to-use PR descriptions for each Season across all repos.

## How to Use

1. Complete a season in a repo (apply prompts, test locally)
2. Open a PR on GitHub
3. Copy-paste the corresponding template below as the PR description
4. Update any placeholders (USER, PASSWORD, AGENT_ID, etc.)
5. Submit the PR

---

## Available Templates

### Season 3.5 + 4: Agent Runs v1 + Hardening

| Repo | Template | What It Adds |
|------|----------|--------------|
| **Core** | [core-s3.5-s4.md](./core-s3.5-s4.md) | AgentRun model, run trigger/history endpoints, validation utils |
| **API** | [api-s3.5-s4.md](./api-s3.5-s4.md) | Proxy for run endpoints, error docs |
| **Console** | [console-s3.5-s4.md](./console-s3.5-s4.md) | Run trigger UI, history table, client validation |

---

## Template Structure

Each template includes:

- **Summary** — What changed and why
- **Changes by Season** — Grouped by S3.5 (Agent Runs) and S4 (Hardening)
- **Files Changed** — Complete list of modified/created files
- **Testing Instructions** — Step-by-step local testing with curl/browser
- **Deployment Notes** — Railway config, env vars, build commands
- **Next Steps** — What to do after merging

---

## Example Workflow

```bash
# 1. Apply season in repo
cd ~/projects/blackroad-os-core
# Paste Season 3.5 + 4 prompt into Claude Code
# Accept edits

# 2. Test locally
npx prisma migrate dev --name add_agent_runs_and_hardening
npm run build && npm start
# Test with curl

# 3. Commit and push
git add .
git commit -m "Season 3.5 + 4: Agent Runs v1 + Hardening"
git push origin feature/agent-runs

# 4. Open PR
# Copy docs/pr-templates/core-s3.5-s4.md
# Paste as PR description
# Submit

# 5. Update season tracker
# Mark S3.5 + S4 as ✅ in docs/season-tracker.md
```

---

## Adding New Templates

When you complete a new season combo (e.g. S5 Telemetry, S6 Task Registry), add templates here following the same structure:

1. Create `<repo>-s<number>.md`
2. Include summary, changes, files, testing, deployment, next steps
3. Update this README with a new row in the table above
4. Commit to `blackroad-os-infra`
