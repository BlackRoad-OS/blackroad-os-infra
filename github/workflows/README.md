# GitHub Workflow Templates

This directory contains example GitHub Actions workflow templates for BlackRoad OS services.

## Available Templates

- `service-ci.yml` - Continuous Integration workflow (lint, test, build)
- `service-cd.yml` - Continuous Deployment workflow (deploy to Railway/Vercel)
- `security-scan.yml` - Security scanning workflow

## Usage

These are **templates** and **examples**. Copy them to individual service repositories under `.github/workflows/` and customize as needed.

### Setting Up CI/CD for a Service

1. **Copy template to service repo:**
   ```bash
   cp github/workflows/service-ci.yml ~/blackroad-os-{service}/.github/workflows/ci.yml
   ```

2. **Customize for service:**
   - Update service name
   - Adjust build/test commands
   - Configure environment-specific jobs

3. **Configure GitHub Secrets:**
   - `RAILWAY_TOKEN` (for CD workflows)
   - `CLOUDFLARE_API_TOKEN` (if needed)
   - Other service-specific secrets

4. **Test workflow:**
   - Push to a branch and observe workflow run
   - Fix any issues
   - Merge to main

## GitHub Secrets Required

These secrets should be configured in GitHub repository settings (Settings → Secrets → Actions):

### For All Services
- `RAILWAY_TOKEN` - Railway API token for deployments
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

### Service-Specific (if needed)
- `CLOUDFLARE_API_TOKEN` - For Cloudflare API interactions
- `SENTRY_AUTH_TOKEN` - For Sentry release tracking
- `SLACK_WEBHOOK_URL` - For deployment notifications

### Important Notes
- **Never** commit these secret values to any repository
- Secrets are managed per-repository or at organization level
- Use environment protection rules for production deployments
- Rotate secrets regularly

## Environment Protection

For production deployments, enable GitHub Environment Protection:

1. Go to repository Settings → Environments
2. Create `production` environment
3. Enable "Required reviewers"
4. Add review team members
5. Configure deployment branches (e.g., only `main`)

## Workflow Patterns

### CI Workflow (on every push/PR)
```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    # Run linter
  test:
    # Run tests
  build:
    # Build application
```

### CD Workflow (on main branch push or manual trigger)
```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        type: choice
        options:
          - staging
          - production

jobs:
  deploy-staging:
    # Auto-deploy to staging
  deploy-production:
    # Manual approval required
    environment: production
```

## Best Practices

1. **Separate CI and CD:**
   - CI runs on every push/PR
   - CD only runs on main branch or manual trigger

2. **Test before deploy:**
   - CI must pass before CD starts
   - Use `needs: [ci-job]` in CD workflows

3. **Environment-specific jobs:**
   - Staging auto-deploys
   - Production requires manual approval

4. **Status checks:**
   - Configure branch protection to require passing CI
   - Prevent merging broken code

5. **Notifications:**
   - Notify team on deployment success/failure
   - Use Slack, Discord, or email

6. **Caching:**
   - Cache dependencies to speed up builds
   - Use `actions/cache` for npm, pip, etc.

7. **Secrets management:**
   - Use GitHub Secrets, never hardcode
   - Use environment-specific secrets when needed

## Example Service Workflow Structure

For a typical Node.js service:

```
.github/
  workflows/
    ci.yml              # Lint, test, build on every push/PR
    cd-staging.yml      # Auto-deploy to staging on main push
    cd-production.yml   # Manual deploy to production
    security.yml        # Daily security scans
```

## Monitoring Workflows

- View workflow runs in GitHub Actions tab
- Configure notifications for failures
- Review logs for errors
- Track deployment frequency and success rate

## Troubleshooting

### Workflow not triggering
- Check `on:` conditions
- Verify branch names match
- Check if workflows are enabled

### Build failures
- Review error logs
- Test build locally first
- Verify dependencies are locked
- Check Node/Python/Go version matches

### Deployment failures
- Verify Railway token is valid
- Check Railway service name matches
- Ensure environment variables are set in Railway
- Review Railway deployment logs

### Secret issues
- Verify secret names match workflow file
- Check secret values are correct (no extra spaces)
- Ensure secrets are set at correct scope (repo vs org)

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Railway Deployment with GitHub Actions](https://docs.railway.app/deploy/integrations)
- [Environment Protection Rules](https://docs.github.com/en/actions/deployment/targeting-different-environments)

---

**Maintained By**: BlackRoad OS Infrastructure Team
**Last Updated**: 2025-11-24
