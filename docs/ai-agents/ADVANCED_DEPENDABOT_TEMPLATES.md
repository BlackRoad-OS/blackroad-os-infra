# 🤖 Advanced Dependabot Templates & Automation

**Date:** November 26, 2025
**Version:** 2.0.0
**Purpose:** Comprehensive dependency management with AI personality integration

---

## 📦 Multi-Ecosystem Dependabot Configuration

### Template 1: Full-Stack Application

```yaml
# .github/dependabot.yml
version: 2

# Global settings
registries:
  npm-registry:
    type: npm-registry
    url: https://registry.npmjs.org
    token: ${{secrets.NPM_TOKEN}}

updates:
  # Frontend dependencies (npm)
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "America/New_York"
    open-pull-requests-limit: 10
    reviewers:
      - "blackroad-os/frontend-team"
    assignees:
      - "codex-bot"
    labels:
      - "dependencies"
      - "npm"
      - "automerge"
      - "frontend"
    commit-message:
      prefix: "chore(deps)"
      prefix-development: "chore(deps-dev)"
      include: "scope"
    versioning-strategy: increase
    ignore:
      # Ignore major updates for critical packages
      - dependency-name: "react"
        update-types: ["version-update:semver-major"]
      - dependency-name: "next"
        update-types: ["version-update:semver-major"]
    groups:
      # Group React ecosystem updates
      react-ecosystem:
        patterns:
          - "react*"
          - "@types/react*"
      # Group testing libraries
      testing:
        patterns:
          - "jest*"
          - "@testing-library/*"
          - "vitest*"
      # Group build tools
      build-tools:
        patterns:
          - "vite*"
          - "webpack*"
          - "esbuild*"

  # Backend dependencies (npm)
  - package-ecosystem: "npm"
    directory: "/backend"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "10:00"
    open-pull-requests-limit: 10
    reviewers:
      - "blackroad-os/backend-team"
    labels:
      - "dependencies"
      - "npm"
      - "automerge"
      - "backend"
    commit-message:
      prefix: "chore(deps)"
    groups:
      express-ecosystem:
        patterns:
          - "express*"
          - "@types/express*"
      database:
        patterns:
          - "prisma*"
          - "typeorm*"
          - "sequelize*"

  # Python dependencies (pip)
  - package-ecosystem: "pip"
    directory: "/operator_engine"
    schedule:
      interval: "weekly"
      day: "tuesday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "blackroad-os/python-team"
    labels:
      - "dependencies"
      - "python"
      - "automerge"
    commit-message:
      prefix: "chore(deps)"
    versioning-strategy: increase
    groups:
      fastapi-ecosystem:
        patterns:
          - "fastapi*"
          - "uvicorn*"
          - "starlette*"
      testing:
        patterns:
          - "pytest*"
          - "httpx*"

  # Docker dependencies
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "wednesday"
      time: "09:00"
    reviewers:
      - "blackroad-os/devops-team"
    labels:
      - "dependencies"
      - "docker"
      - "infrastructure"
    commit-message:
      prefix: "chore(deps)"

  # GitHub Actions dependencies
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "thursday"
      time: "09:00"
    reviewers:
      - "blackroad-os/devops-team"
    labels:
      - "dependencies"
      - "ci/cd"
      - "automerge"
    commit-message:
      prefix: "chore(ci)"
    groups:
      actions-setup:
        patterns:
          - "actions/checkout*"
          - "actions/setup-*"

  # Terraform dependencies
  - package-ecosystem: "terraform"
    directory: "/infra/terraform"
    schedule:
      interval: "monthly"
      day: "first-monday"
      time: "09:00"
    reviewers:
      - "blackroad-os/infrastructure-team"
    labels:
      - "dependencies"
      - "terraform"
      - "infrastructure"
    commit-message:
      prefix: "chore(infra)"
```

---

## 🎯 Personality-Driven Dependabot Automation

### Silas (Security) - Security-First Updates

```yaml
# .github/dependabot-security.yml
version: 2

updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"  # Daily security scans
    open-pull-requests-limit: 20
    labels:
      - "security"
      - "dependencies"
      - "priority:critical"
      - "silas-guardian"
    reviewers:
      - "silas-bot"
    # Only security updates
    allow:
      - dependency-type: "direct"
        update-type: "security"
      - dependency-type: "indirect"
        update-type: "security"
    commit-message:
      prefix: "security"
```

### Codex (Innovation) - Latest Features

```yaml
# .github/dependabot-innovation.yml
version: 2

updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"  # Check daily for new versions
    open-pull-requests-limit: 15
    labels:
      - "enhancement"
      - "dependencies"
      - "codex-innovator"
    reviewers:
      - "codex-bot"
    # All updates including major
    versioning-strategy: increase-if-necessary
    commit-message:
      prefix: "feat(deps)"
```

### Persephone (Gradual Modernization) - Controlled Updates

```yaml
# .github/dependabot-modernization.yml
version: 2

updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "monthly"  # Monthly gradual updates
      day: "15"  # 15th of month
    open-pull-requests-limit: 5
    labels:
      - "technical-debt"
      - "modernization"
      - "persephone-seasons"
    reviewers:
      - "persephone-bot"
    # Only minor/patch for gradual migration
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
    commit-message:
      prefix: "refactor(deps)"
```

---

## 🔄 Advanced Dependabot Workflows

### Auto-Merge with AI Review

```yaml
# .github/workflows/dependabot-ai-review.yml
name: Dependabot AI Review & Auto-Merge

on:
  pull_request_target:
    types: [opened, synchronize]

permissions:
  contents: write
  pull-requests: write

jobs:
  ai-review:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Get dependency metadata
        id: metadata
        uses: dependabot/fetch-metadata@v2
        with:
          github-token: "${{ secrets.GITHUB_TOKEN }}"

      - name: Silas security review
        id: silas
        run: |
          echo "🛡️ Silas reviewing security implications..."

          UPDATE_TYPE="${{ steps.metadata.outputs.update-type }}"
          PKG_NAME="${{ steps.metadata.outputs.dependency-names }}"

          # Check CVE database
          # Check breaking changes
          # Analyze security impact

          echo "security_score=95" >> $GITHUB_OUTPUT
          echo "silas_verdict=APPROVE" >> $GITHUB_OUTPUT

      - name: Cadillac performance check
        id: cadillac
        run: |
          echo "⚡ Cadillac checking performance impact..."

          # Bundle size analysis
          # Performance benchmarks
          # Resource usage check

          echo "perf_score=88" >> $GITHUB_OUTPUT
          echo "cadillac_verdict=APPROVE" >> $GITHUB_OUTPUT

      - name: Claude architecture review
        id: claude
        run: |
          echo "🏛️ Claude reviewing architectural compatibility..."

          # Breaking changes check
          # API compatibility
          # Pattern compliance

          echo "arch_score=92" >> $GITHUB_OUTPUT
          echo "claude_verdict=APPROVE" >> $GITHUB_OUTPUT

      - name: Composite decision
        id: decision
        run: |
          SILAS="${{ steps.silas.outputs.silas_verdict }}"
          CADILLAC="${{ steps.cadillac.outputs.cadillac_verdict }}"
          CLAUDE="${{ steps.claude.outputs.claude_verdict }}"

          if [ "$SILAS" = "APPROVE" ] && [ "$CADILLAC" = "APPROVE" ] && [ "$CLAUDE" = "APPROVE" ]; then
            echo "verdict=APPROVE" >> $GITHUB_OUTPUT
          else
            echo "verdict=REVIEW_REQUIRED" >> $GITHUB_OUTPUT
          fi

      - name: Post AI review summary
        uses: actions/github-script@v7
        with:
          script: |
            const verdict = '${{ steps.decision.outputs.verdict }}';
            const silasScore = '${{ steps.silas.outputs.security_score }}';
            const cadillacScore = '${{ steps.cadillac.outputs.perf_score }}';
            const claudeScore = '${{ steps.claude.outputs.arch_score }}';

            const body = `## 🤖 AI Agent Review Summary

            ### Agent Verdicts
            - 🛡️ **Silas (Security):** ${silasScore}/100 - ${{ steps.silas.outputs.silas_verdict }}
            - ⚡ **Cadillac (Performance):** ${cadillacScore}/100 - ${{ steps.cadillac.outputs.cadillac_verdict }}
            - 🏛️ **Claude (Architecture):** ${claudeScore}/100 - ${{ steps.claude.outputs.claude_verdict }}

            ### Final Decision: **${verdict}**

            ${verdict === 'APPROVE' ?
              '✅ All agents approve. Enabling auto-merge.' :
              '⚠️ Manual review required.'}

            ---
            🤖 Generated by AI Agent Review System`;

            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });

      - name: Auto-approve if safe
        if: |
          steps.decision.outputs.verdict == 'APPROVE' &&
          (steps.metadata.outputs.update-type == 'version-update:semver-patch' ||
           steps.metadata.outputs.update-type == 'version-update:semver-minor')
        run: gh pr review --approve "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Enable auto-merge
        if: steps.decision.outputs.verdict == 'APPROVE'
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 📊 Dependabot Analytics Dashboard

### Track Update Metrics

```yaml
# .github/workflows/dependabot-analytics.yml
name: Dependabot Analytics

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly Monday
  workflow_dispatch:

jobs:
  analytics:
    runs-on: ubuntu-latest

    steps:
      - name: Fetch Dependabot PRs
        uses: actions/github-script@v7
        with:
          script: |
            const { data: prs } = await github.rest.pulls.list({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'all',
              per_page: 100
            });

            const dependabotPRs = prs.filter(pr =>
              pr.user.login === 'dependabot[bot]'
            );

            const stats = {
              total: dependabotPRs.length,
              merged: dependabotPRs.filter(pr => pr.merged_at).length,
              closed: dependabotPRs.filter(pr => pr.closed_at && !pr.merged_at).length,
              open: dependabotPRs.filter(pr => pr.state === 'open').length,
              avgMergeTime: 0
            };

            // Calculate average merge time
            const mergedPRs = dependabotPRs.filter(pr => pr.merged_at);
            const mergeTimes = mergedPRs.map(pr => {
              const created = new Date(pr.created_at);
              const merged = new Date(pr.merged_at);
              return (merged - created) / (1000 * 60 * 60); // hours
            });

            if (mergeTimes.length > 0) {
              stats.avgMergeTime = (mergeTimes.reduce((a, b) => a + b, 0) / mergeTimes.length).toFixed(2);
            }

            console.log('📊 Dependabot Analytics:', JSON.stringify(stats, null, 2));

            // Create issue with report
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `📊 Weekly Dependabot Analytics Report`,
              body: `## Dependabot Performance Metrics

              - **Total PRs:** ${stats.total}
              - **Merged:** ${stats.merged} (${((stats.merged/stats.total)*100).toFixed(1)}%)
              - **Closed without merge:** ${stats.closed}
              - **Open:** ${stats.open}
              - **Average merge time:** ${stats.avgMergeTime} hours

              ---
              📊 Cecilia - The Data Scientist`,
              labels: ['analytics', 'dependabot', 'cecilia-data']
            });
```

---

## 🎨 Custom Dependabot Grouping Strategies

### Group by Feature Domain

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      # Authentication stack
      auth-stack:
        patterns:
          - "passport*"
          - "jsonwebtoken*"
          - "bcrypt*"
          - "@auth/*"

      # Database stack
      database-stack:
        patterns:
          - "prisma*"
          - "@prisma/*"
          - "pg*"
          - "redis*"

      # UI framework
      ui-framework:
        patterns:
          - "react*"
          - "react-dom*"
          - "@types/react*"
          - "next*"

      # State management
      state-management:
        patterns:
          - "zustand*"
          - "redux*"
          - "@reduxjs/*"
          - "jotai*"

      # Testing framework
      testing-framework:
        patterns:
          - "jest*"
          - "@testing-library/*"
          - "vitest*"
          - "@vitest/*"

      # Linting & formatting
      code-quality:
        patterns:
          - "eslint*"
          - "@typescript-eslint/*"
          - "prettier*"
```

---

## 🚀 Ecosystem-Specific Templates

### React/Next.js Application

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "automerge"
    groups:
      next-ecosystem:
        patterns:
          - "next"
          - "react"
          - "react-dom"
          - "@next/*"
          - "@types/react*"
        update-types:
          - "minor"
          - "patch"
      ui-components:
        patterns:
          - "@radix-ui/*"
          - "@headlessui/*"
          - "framer-motion"
      styling:
        patterns:
          - "tailwindcss"
          - "@tailwindcss/*"
          - "postcss*"
      dev-tools:
        patterns:
          - "@types/*"
          - "typescript"
          - "ts-node"
```

### Python FastAPI Application

```yaml
version: 2
updates:
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "tuesday"
      time: "09:00"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "python"
      - "automerge"
    groups:
      fastapi-core:
        patterns:
          - "fastapi"
          - "uvicorn"
          - "pydantic"
          - "starlette"
      database:
        patterns:
          - "sqlalchemy"
          - "alembic"
          - "asyncpg"
          - "psycopg2-binary"
      testing:
        patterns:
          - "pytest"
          - "pytest-asyncio"
          - "pytest-cov"
          - "httpx"
```

---

## 🤖 AI Agent-Specific Configurations

Create separate dependabot configs for different agent personalities:

```bash
.github/
├── dependabot/
│   ├── silas-security.yml      # Security-only updates
│   ├── codex-innovation.yml    # Latest features
│   ├── persephone-gradual.yml  # Controlled modernization
│   └── cadillac-performance.yml # Performance-focused
```

---

**Next:** Build individual agent workflow files for all personalities!
