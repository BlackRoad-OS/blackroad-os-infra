# Environment Variables and Secret Names

Names only—no secret values belong in the repo. Use this list to keep Railway, local `.env` files, and future Terraform/Pulumi configs aligned across environments.

## Global conventions

- `NODE_ENV` — Node runtime mode; `production` in prod, `development` elsewhere.
- `LOG_LEVEL` — Log verbosity; default `info`.
- `PORT` — Service listen port; mirror local ports from `infra/services.yml` and `infra/env/local.json`.

## Cross-service shared variables

- `NEXT_PUBLIC_API_BASE_URL` — Frontend base URL for the API (Prism Console, Web, Home, Brand, Ideas, Demo, Research). Defaults to `http://localhost:5002` locally; set to the environment API base URL in Railway.
- `API_BASE_URL` — Server-side API base URL for services calling the API (Operator, future cron jobs). Match the environment API base URL.
- `OPERATOR_API_BASE_URL` — Base URL for API or other services to reach Operator internal endpoints.
- `ROADCHAIN_BASE_URL` — Base URL for RoadChain once separated; keep consistent per environment.
- `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — Identity provider keys used by frontends/services that authenticate users.

## Service-specific examples

- `PRISM_CONSOLE_SESSION_SECRET` — Session encryption secret for Prism Console (name only).
- `WEB_ANALYTICS_WRITE_KEY` — Analytics token for public web surfaces.
- `DOCS_SEARCH_API_KEY` — Search integration key for Docs site.
- `DATABASE_URL` — Connection string for services backed by databases (API, Operator, others).

## Management notes

- Store secrets in Railway or the chosen secret manager; reference them here by name only.
- Keep environment variable names identical across environments to reduce drift; only values change.
- When adding a new service, list its critical environment variable names here and link back from the service’s entry in `infra/services.yml` if special handling is required.
