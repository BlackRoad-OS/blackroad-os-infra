# Railway Services Index

This directory contains Railway deployment configurations for BlackRoad OS services.

## Service Configuration Files

| File | Service | Repository |
|------|---------|------------|
| `railway.blackroad-os-api.toml` | API Gateway/Proxy | github.com/BlackRoad-OS/blackroad-os-api |
| `railway.blackroad-os-operator.toml` | Background Operator | github.com/BlackRoad-OS/blackroad-os-operator |
| `railway.blackroad-os-web.toml` | Marketing Website | github.com/BlackRoad-OS/blackroad-os-web |
| `railway.blackroad-os-prism-console.toml` | Admin Console | github.com/BlackRoad-OS/blackroad-os-prism-console |

## Pack Services

Pack services follow the naming pattern: `railway.pack-{pack-name}.toml`

Add additional pack configurations as needed.

## Usage

These TOML files document the Railway configuration for each service. They are **reference files** and not directly deployed to Railway.

### Setting Up a New Service in Railway

1. **Create Railway Project:**
   ```bash
   railway init --name blackroad-os-{service}-{env}
   ```

2. **Link Repository:**
   - Connect GitHub repository in Railway dashboard
   - Select branch (usually `main`)
   - Configure auto-deploy settings

3. **Configure Environment Variables:**
   - Use the `[env]` section from the appropriate TOML file as a guide
   - Set values in Railway dashboard or via CLI:
   ```bash
   railway variables set KEY=value
   ```
   - **NEVER** commit secret values to this repository

4. **Configure Build & Deploy:**
   - Set build and start commands in Railway dashboard
   - Configure health check endpoint
   - Set resource limits (CPU, memory)

5. **Configure Domains:**
   - Add custom domain in Railway
   - Update Cloudflare DNS to point to Railway hostname
   - See `../cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md` for DNS mappings

### Environment Variables

Each TOML file lists required environment variables. Values should be set in:
- **Railway dashboard** (for Railway-deployed services)
- **Vercel dashboard** (for Vercel-deployed services)
- **GitHub Secrets** (for CI/CD workflows)
- **Local `.env` files** (for local development, never committed)

### Multi-Environment Strategy

For each service, create separate Railway projects:
- `blackroad-os-{service}-staging`
- `blackroad-os-{service}-prod`

This isolation ensures:
- Independent scaling
- Environment-specific configuration
- Safer deployments (test in staging first)
- Clear cost attribution

## Deployment Workflow

### Staging Deployment
1. Push to `main` branch (or configured branch)
2. Railway auto-deploys (if enabled)
3. Health check validates deployment
4. Monitor logs for errors

### Production Deployment
1. Verify staging deployment is healthy
2. Create release tag (e.g., `v1.2.3`)
3. Manually trigger production deployment in Railway
4. Monitor health checks and metrics
5. Be ready to rollback if issues arise

## Railway CLI Reference

```bash
# Login
railway login

# Link to project
railway link

# View environment variables
railway variables

# Set environment variable
railway variables set KEY=value

# View logs
railway logs

# Open dashboard
railway open

# Deploy manually
railway up
```

## Resource Limits

See individual TOML files for recommended resource allocations per environment.

### General Guidelines
- **Local**: No limits (development machine)
- **Staging**: Lower limits OK (cost savings, matches dev loads)
- **Production**: Sized for actual traffic with headroom

## Monitoring

Each service should expose:
- Health endpoint: `GET /health` (returns 200 OK)
- Metrics endpoint: `GET /metrics` (Prometheus format, if applicable)
- Version endpoint: `GET /api/version` or similar

Railway's built-in monitoring tracks:
- Request rates
- Error rates (4xx, 5xx)
- Response times
- CPU/memory usage
- Deployment history

## Troubleshooting

### Build Failures
- Check build logs in Railway dashboard
- Verify build command in TOML matches actual build script
- Ensure dependencies are locked (package-lock.json, requirements.txt, etc.)

### Deploy Failures
- Check health check endpoint is accessible
- Verify start command is correct
- Check for port binding issues ($PORT environment variable)
- Review service logs for runtime errors

### Environment Variable Issues
- Verify all required variables are set
- Check for typos in variable names
- Ensure secrets are properly configured
- Test locally with same variable values (for non-secrets)

## Security

- **Never commit secrets** to this repository
- Rotate secrets regularly
- Use Railway's environment variable encryption
- Enable Railway's private networking for inter-service communication
- Review Railway's security logs periodically

## Cost Management

- Set resource limits to prevent overages
- Use staging environment for load testing, not production
- Monitor usage dashboard
- Consider sleeping/pausing unused services
- Evaluate alternative platforms (Vercel, Fly.io) for specific workloads

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)
- [Railway Pricing](https://railway.app/pricing)
- [Cloudflare DNS Blueprint](../cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md)
- [Service Infrastructure Blueprints](../services/)

---

**Maintained By**: BlackRoad OS Infrastructure Team
**Last Updated**: 2025-11-24
