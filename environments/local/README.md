# Local Environment

Developer machines and local Docker containers.

## Purpose
- Local development
- Testing new features
- Debugging
- Running services without cloud dependencies

## Deployment
- Docker Compose (recommended)
- Direct local processes (npm/python/go commands)
- Kubernetes (minikube/k3s for testing)

## Database
- Local PostgreSQL instance
- SQLite for lightweight services
- Docker-based databases

## Secrets
- Use `.env.local` files in each service repo
- Never commit `.env.local` to version control
- Copy from `.env.example` templates

## Service Access
Default local ports:
- API: http://localhost:8080
- Operator: http://localhost:8082
- Web: http://localhost:3000
- Prism Console: http://localhost:3001
- Core: http://localhost:8081

## Notes
- All services should work locally without external dependencies when possible
- Use mock/stub services for third-party integrations during development
- Docker Compose can orchestrate all services together
