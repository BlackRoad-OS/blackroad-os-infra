# GitHub Secrets Setup Guide

## Overview

This guide explains how to configure GitHub organization and repository secrets for the BlackRoad OS CI/CD pipeline.

## Required Secrets

### Organization-Level Secrets (BlackRoad-OS)

Set these once at the organization level to share across all repos:

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `RAILWAY_TOKEN` | Railway API token for deployments | https://railway.app/account/tokens |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | https://dash.cloudflare.com/profile/api-tokens |
| `CLOUDFLARE_ZONE_BLACKROAD_IO` | Zone ID for blackroad.io | Cloudflare dashboard → Domain → Overview |
| `CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS` | Zone ID for blackroad.systems | Cloudflare dashboard → Domain → Overview |

### Repository-Level Secrets (Optional Overrides)

Only needed if a repo requires different credentials:

| Secret Name | Description |
|------------|-------------|
| `RAILWAY_SERVICE_ID` | Specific Railway service ID |
| `RAILWAY_PROJECT_ID` | Railway project ID |

---

## Setup Instructions

### Step 1: Create Railway Token

1. Go to https://railway.app/account/tokens
2. Click **"Create Token"**
3. Name it: `blackroad-os-github-actions`
4. Copy the token (you won't see it again!)

### Step 2: Create Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Use template: **"Edit zone DNS"**
4. Configure permissions:
   - Zone - DNS - Edit
   - Zone - Zone - Read
5. Zone Resources: Include - All zones (or specific zones)
6. Create and copy the token

### Step 3: Get Cloudflare Zone IDs

1. Go to https://dash.cloudflare.com
2. Select **blackroad.io** domain
3. Scroll to **API** section on the right
4. Copy **Zone ID**
5. Repeat for **blackroad.systems**

### Step 4: Add Organization Secrets

1. Go to https://github.com/organizations/BlackRoad-OS/settings/secrets/actions
2. Click **"New organization secret"**
3. Add each secret:

```
Name: RAILWAY_TOKEN
Value: <your-railway-token>
Repository access: All repositories
```

```
Name: CLOUDFLARE_API_TOKEN
Value: <your-cloudflare-token>
Repository access: All repositories
```

```
Name: CLOUDFLARE_ZONE_BLACKROAD_IO
Value: <zone-id-for-blackroad-io>
Repository access: All repositories
```

```
Name: CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS
Value: <zone-id-for-blackroad-systems>
Repository access: All repositories
```

---

## Automation Script

Run this script to verify secrets are configured:

```bash
#!/bin/bash
# verify-github-secrets.sh

echo "Checking GitHub organization secrets..."

# Check if gh CLI is authenticated
gh auth status || { echo "Not authenticated. Run: gh auth login"; exit 1; }

# List organization secrets
echo ""
echo "Organization secrets for BlackRoad-OS:"
gh api orgs/BlackRoad-OS/actions/secrets --jq '.secrets[].name' 2>/dev/null || echo "No secrets found or no access"

echo ""
echo "Required secrets:"
echo "  - RAILWAY_TOKEN"
echo "  - CLOUDFLARE_API_TOKEN"
echo "  - CLOUDFLARE_ZONE_BLACKROAD_IO"
echo "  - CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS"
```

---

## Bulk Secret Setup Script

Use this script to set all secrets at once:

```bash
#!/bin/bash
# setup-org-secrets.sh
# Usage: ./setup-org-secrets.sh

set -e

ORG="BlackRoad-OS"

echo "Setting up GitHub organization secrets for $ORG"
echo ""

# Prompt for secrets
read -sp "Enter RAILWAY_TOKEN: " RAILWAY_TOKEN
echo ""
read -sp "Enter CLOUDFLARE_API_TOKEN: " CLOUDFLARE_API_TOKEN
echo ""
read -p "Enter CLOUDFLARE_ZONE_BLACKROAD_IO: " CLOUDFLARE_ZONE_BLACKROAD_IO
read -p "Enter CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS: " CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS

echo ""
echo "Setting secrets..."

# Set secrets using gh CLI
gh secret set RAILWAY_TOKEN --org "$ORG" --body "$RAILWAY_TOKEN"
gh secret set CLOUDFLARE_API_TOKEN --org "$ORG" --body "$CLOUDFLARE_API_TOKEN"
gh secret set CLOUDFLARE_ZONE_BLACKROAD_IO --org "$ORG" --body "$CLOUDFLARE_ZONE_BLACKROAD_IO"
gh secret set CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS --org "$ORG" --body "$CLOUDFLARE_ZONE_BLACKROAD_SYSTEMS"

echo ""
echo "✓ All secrets configured!"
echo ""
echo "Verify with: gh api orgs/$ORG/actions/secrets --jq '.secrets[].name'"
```

---

## Workflow Usage

The deploy workflow uses secrets like this:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway

on:
  push:
    branches: ["main"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Deploy
        run: railway up --service ${{ github.event.repository.name }}
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Per-Repository Secrets

If a specific repo needs different credentials, add them at the repo level:

1. Go to repo → Settings → Secrets and variables → Actions
2. Click **"New repository secret"**
3. Add the secret

Repository secrets override organization secrets with the same name.

---

## Security Best Practices

1. **Rotate tokens regularly** - Every 90 days recommended
2. **Use least privilege** - Only grant necessary permissions
3. **Audit access** - Review who has access to secrets
4. **Never log secrets** - Ensure workflows don't print secret values
5. **Use environments** - Consider using GitHub Environments for production secrets

---

## Troubleshooting

### "Secret not found" in workflow

- Check secret name matches exactly (case-sensitive)
- Verify secret is available to the repository
- Check if using org secret vs repo secret

### "Permission denied" when setting secrets

- Ensure you have admin access to the organization
- Check if SSO is required: `gh auth refresh -s admin:org`

### Railway deploy fails

- Verify RAILWAY_TOKEN is valid: `railway whoami`
- Check if token has deploy permissions
- Ensure repo is linked to Railway service

### Cloudflare DNS fails

- Verify API token has correct permissions
- Check zone IDs are correct
- Ensure token hasn't expired

---

## Quick Reference

### Get Railway Token
```bash
# Open Railway tokens page
open https://railway.app/account/tokens
```

### Get Cloudflare Token
```bash
# Open Cloudflare API tokens page
open https://dash.cloudflare.com/profile/api-tokens
```

### Get Zone IDs via API
```bash
# List all zones
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" | jq '.result[] | {name, id}'
```

### Set Organization Secret
```bash
gh secret set SECRET_NAME --org BlackRoad-OS --body "secret-value"
```

### List Organization Secrets
```bash
gh api orgs/BlackRoad-OS/actions/secrets --jq '.secrets[].name'
```

---

**Last Updated**: 2024-11-29
**Maintained By**: BlackRoad OS Infrastructure Team
