# 🔑 Runbook: Key & Secret Rotation

**Category**: Security 🔐  
**Frequency**: Quarterly or after security incident  
**Owner**: Infrastructure Team

---

## 🎯 Purpose

This runbook documents the process for rotating secrets and API keys across BlackRoad OS infrastructure. **This document describes the process only — it does NOT store any actual secrets.**

---

## ⚠️ Important Security Notes

```
# COMPLIANCE-SENSITIVE INFRA BLOCK
```

- 🔑 **Never** commit secrets to git
- 🔑 **Never** share secrets in Slack/Discord/email
- 🔑 **Never** log secrets in application code
- 🔑 **Always** use secret managers (Railway, GitHub Secrets)
- 🔑 **Always** rotate after any suspected compromise

---

## 📋 Secrets Inventory

### Railway Service Secrets

| Secret | Services | Rotation Frequency |
|--------|----------|-------------------|
| `DATABASE_URL` | api, operator | On compromise only |
| `JWT_SECRET` | api, prism-console | Quarterly |
| `ADMIN_SECRET` | prism-console | Quarterly |
| `OPENAI_API_KEY` | research | On billing cycle |
| `REDIS_URL` | api | On compromise only |

### Cloudflare Secrets

| Secret | Location | Rotation Frequency |
|--------|----------|-------------------|
| `CLOUDFLARE_API_TOKEN` | CI/CD, Terraform | Quarterly |
| `CLOUDFLARE_ZONE_ID` | Terraform | Never (identifier) |

### GitHub Secrets

| Secret | Scope | Rotation Frequency |
|--------|-------|-------------------|
| `RAILWAY_TOKEN` | Organization | Quarterly |
| `CLOUDFLARE_API_TOKEN` | Organization | Quarterly |
| `GHCR_TOKEN` | Organization | On expiry |

---

## 🔄 Rotation Procedures

### Procedure 1: JWT_SECRET Rotation

**Impact**: Users will be logged out (session invalidation)  
**Downtime**: None (if done correctly)  
**Coordinate with**: Product team (user notification)

#### Steps

1. **Generate new secret**
   ```bash
   # Generate 64-character hex string
   openssl rand -hex 32
   ```

2. **Update in Railway** (do NOT copy this to clipboard history)
   - Go to Railway → Service → Variables
   - Update `JWT_SECRET` with new value
   - Service will auto-restart

3. **Update all services using this secret**
   - api
   - prism-console
   - operator (if applicable)

4. **Verify**
   ```bash
   # Health check
   curl https://api.blackroad.io/health
   
   # Attempt login (will require re-auth)
   # This is expected behavior after rotation
   ```

5. **Document rotation**
   - Log date of rotation (not the secret)
   - Note any issues encountered

---

### Procedure 2: DATABASE_URL Rotation

**Impact**: Brief connection drops  
**Downtime**: < 30 seconds during rotation  
**Coordinate with**: Database admin

#### Steps

1. **Create new database user** (in database admin panel)
   ```sql
   -- Example for PostgreSQL
   CREATE USER new_api_user WITH PASSWORD 'new_secure_password';
   GRANT CONNECT ON DATABASE blackroad TO new_api_user;
   GRANT USAGE ON SCHEMA public TO new_api_user;
   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO new_api_user;
   ```

2. **Construct new connection string**
   ```
   postgresql://new_api_user:new_password@host:5432/blackroad?sslmode=require
   ```

3. **Update in Railway**
   - Go to Railway → Service → Variables
   - Update `DATABASE_URL`
   - Service will auto-restart

4. **Verify**
   ```bash
   # Check database connectivity
   curl https://api.blackroad.io/health
   
   # Test a database-dependent endpoint
   curl https://api.blackroad.io/version
   ```

5. **Revoke old credentials**
   ```sql
   -- After confirming new credentials work
   REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM old_api_user;
   DROP USER old_api_user;
   ```

---

### Procedure 3: CLOUDFLARE_API_TOKEN Rotation

**Impact**: Terraform operations fail until updated  
**Downtime**: None for live services

#### Steps

1. **Create new token in Cloudflare**
   - Dashboard → My Profile → API Tokens
   - Create Token → Custom Token
   - Permissions: Zone (DNS Edit), Zone (Zone Read)
   - Zone Resources: Include All Zones
   - Generate

2. **Update in GitHub Secrets**
   - GitHub → Organization → Settings → Secrets
   - Update `CLOUDFLARE_API_TOKEN`

3. **Update local development** (for Terraform operators)
   - Update in secure password manager
   - Refresh local environment

4. **Test**
   ```bash
   # Verify token works
   curl -X GET "https://api.cloudflare.com/client/v4/zones" \
     -H "Authorization: Bearer $NEW_TOKEN" \
     -H "Content-Type: application/json"
   ```

5. **Revoke old token**
   - Cloudflare → API Tokens → Old Token → Revoke

---

### Procedure 4: RAILWAY_TOKEN Rotation

**Impact**: CI/CD deployments fail until updated  
**Downtime**: None for live services

#### Steps

1. **Generate new token in Railway**
   - Railway → Account Settings → Tokens
   - Create New Token
   - Copy immediately (shown only once)

2. **Update in GitHub Secrets**
   - GitHub → Organization → Settings → Secrets
   - Update `RAILWAY_TOKEN`

3. **Test**
   - Trigger a CI/CD workflow
   - Verify deployment succeeds

4. **Revoke old token**
   - Railway → Account Settings → Tokens
   - Delete old token

---

### Procedure 5: Third-Party API Keys (e.g., OPENAI_API_KEY)

**Impact**: Varies by service  
**Downtime**: None if rotated properly

#### Steps

1. **Generate new key in provider dashboard**
   - OpenAI: platform.openai.com → API Keys
   - Other: Check provider documentation

2. **Update in Railway**
   - Update for each service using this key
   - Note: Multiple services may share same key

3. **Verify**
   ```bash
   # Test endpoint that uses the API
   curl https://research.blackroad.io/health
   ```

4. **Delete old key in provider dashboard**

---

## 📅 Rotation Schedule

| Quarter | Secrets to Rotate |
|---------|-------------------|
| Q1 (Jan) | JWT_SECRET, ADMIN_SECRET |
| Q2 (Apr) | CLOUDFLARE_API_TOKEN, RAILWAY_TOKEN |
| Q3 (Jul) | JWT_SECRET, ADMIN_SECRET |
| Q4 (Oct) | CLOUDFLARE_API_TOKEN, RAILWAY_TOKEN |

**Annual**: Review and update all third-party API keys

---

## 🚨 Emergency Rotation (Compromise)

If a secret is suspected to be compromised:

1. **Immediately rotate** affected secret(s)
2. **Check audit logs** for unauthorized access
3. **Review access patterns** in affected services
4. **Notify security team** if breach confirmed
5. **Document incident** in post-mortem

### Signs of Compromise

- Unexpected API usage spikes
- Unauthorized deployments
- Unusual database queries
- Alerts from secret scanning tools
- Report from external party

---

## 📝 Rotation Log Template

```markdown
## Secret Rotation Log

| Date | Secret | Rotated By | Reason | Verified |
|------|--------|------------|--------|----------|
| YYYY-MM-DD | JWT_SECRET | [name] | Quarterly | ✅ |
| YYYY-MM-DD | CLOUDFLARE_API_TOKEN | [name] | Quarterly | ✅ |
```

**Note**: Store this log in a secure location, not in git.

---

## 🔗 Related Documentation

- [Railway Troubleshooting](../railway-troubleshooting.md)
- [Security Policy](/templates/.env.example)
- [Environment Variables Guide](/templates/SERVICE_INFRA_TEMPLATE.md)

---

**Last Updated**: 2025-11-25  
**Owner**: BlackRoad OS Infrastructure Team
