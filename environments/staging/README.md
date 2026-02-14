# Staging Environment

Pre-production testing environment for QA and integration testing.

## Purpose
- Integration testing
- QA validation
- Performance testing
- Pre-production verification
- Demo environment

## Deployment
- Railway (primary)
- Can also use Vercel, Fly.io, or other cloud providers

## Database
- Managed PostgreSQL (Railway Postgres or similar)
- Separate from production data
- Can be reset/refreshed as needed

## Secrets
- Railway environment variables
- Managed through Railway dashboard or CLI
- Never stored in this repository

## Service Access
Expected domains (via Cloudflare):
- API: https://api.staging.blackroad.io
- Operator: https://operator.staging.blackroad.io
- Web: https://staging.blackroad.io
- Prism Console: https://prism.staging.blackroad.io

## Notes
- Should mirror production setup as closely as possible
- Safe environment for testing breaking changes
- Can use production-like data volumes for testing
- May have relaxed rate limits for testing
