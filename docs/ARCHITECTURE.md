# BlackRoad OS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            BLACKROAD OS ARCHITECTURE                            │
│                         Distributed AI Operating System                         │
└─────────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   CLOUDFLARE    │
                              │   DNS + Tunnel  │
                              │  (Zero Trust)   │
                              └────────┬────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           │                           │                           │
           ▼                           ▼                           ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│   blackroad.io      │   │ blackroad.systems   │   │  Other Domains      │
│   (Public-Facing)   │   │ (Internal Systems)  │   │  (Brand/Research)   │
└─────────────────────┘   └─────────────────────┘   └─────────────────────┘
           │                           │                           │
           ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              RAILWAY PLATFORM                                   │
│                         (Container Orchestration)                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   CORE      │  │   API       │  │   WEB       │  │  OPERATOR   │            │
│  │  :8080      │  │  :8080      │  │  :3000      │  │  :8080      │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   BEACON    │  │   AGENTS    │  │   PRISM     │  │   DOCS      │            │
│  │  :8080      │  │  :8080      │  │  :3000      │  │  :3000      │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────┐           │
│  │                         OS PACKS                                │           │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │           │
│  │  │Finance │ │ Legal  │ │Creator │ │Research│ │ DevOps │        │           │
│  │  │ :8080  │ │ :8080  │ │ :3000  │ │ :8080  │ │ :8080  │        │           │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │           │
│  └─────────────────────────────────────────────────────────────────┘           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
           │                           │                           │
           ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              GITHUB (BlackRoad-OS)                              │
│                            Source Code + CI/CD                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  blackroad-os          blackroad-os-api       blackroad-os-web                  │
│  blackroad-os-core     blackroad-os-api-gw    blackroad-os-home                 │
│  blackroad-os-operator blackroad-os-beacon    blackroad-os-docs                 │
│  blackroad-os-agents   blackroad-os-prism     blackroad-os-infra                │
│  blackroad-os-pack-*   blackroad-os-research  blackroad-os-archive              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Domain Hierarchy

```
DOMAINS
═══════════════════════════════════════════════════════════════════════════════════

PRIMARY OS DOMAINS
├── blackroad.io ─────────────────────── Public-facing surfaces
│   ├── app.blackroad.io ················ Main web application
│   ├── home.blackroad.io ··············· Landing page
│   ├── os.blackroad.io ················· Root OS index
│   ├── creator.blackroad.io ············ Creator Studio pack
│   └── api.blackroad.io ················ Public API endpoint
│
├── blackroad.systems ────────────────── Internal infrastructure
│   ├── api.blackroad.systems ··········· API Gateway (auth/routing)
│   ├── core.blackroad.systems ·········· Core engine
│   ├── infra.blackroad.systems ········· Infrastructure controllers
│   ├── console.blackroad.systems ······· Master control panel
│   ├── docs.blackroad.systems ·········· Documentation
│   ├── prism.blackroad.systems ········· Browser OS (Prism Console)
│   ├── beacon.blackroad.systems ········ Identity + heartbeat
│   ├── research.blackroad.systems ······ R&D platform
│   ├── lab.blackroad.systems ··········· Research Lab pack
│   ├── devops.blackroad.systems ········ DevOps pack
│   ├── legal.blackroad.systems ········· Legal pack
│   ├── finance.blackroad.systems ······· Finance pack
│   ├── demo.blackroad.systems ·········· Public demo
│   ├── archive.blackroad.systems ······· Permanent archive
│   └── agents.blackroad.systems ········ Agent orchestration
│
└── blackroadai.com ──────────────────── AI/Business domain

IDENTITY DOMAINS
├── lucidia.earth ────────────────────── AI consciousness platform
├── lucidiaqi.com ────────────────────── Quantum intelligence
└── lucidia.studio ───────────────────── Creative studio

QUANTUM DOMAINS
├── blackroadquantum.com ─────────────── Quantum computing hub
├── blackroadquantum.net
├── blackroadquantum.info
├── blackroadquantum.shop
└── blackroadquantum.store

RESEARCH DOMAINS
├── aliceqi.com ──────────────────────── Alice QI research
└── blackroadqi.com ──────────────────── BlackRoad QI

CORPORATE
├── blackroadinc.us ──────────────────── US corporate entity
├── blackroad.network ────────────────── Network infrastructure
└── blackroad.me ─────────────────────── Personal/developer portal
```

## Service Graph

```
SERVICE DEPENDENCIES
═══════════════════════════════════════════════════════════════════════════════════

                              ┌─────────────────┐
                              │  API GATEWAY    │
                              │ (Entry Point)   │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
           ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
           │     CORE      │  │    BEACON     │  │   OPERATOR    │
           │  (Business    │  │  (Identity    │  │  (Background  │
           │   Logic)      │  │   + Auth)     │  │   Jobs)       │
           └───────┬───────┘  └───────────────┘  └───────────────┘
                   │
     ┌─────────────┼─────────────┬─────────────┐
     │             │             │             │
     ▼             ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ AGENTS  │  │ ARCHIVE │  │RESEARCH │  │  PACKS  │
│         │  │         │  │         │  │         │
└─────────┘  └─────────┘  └─────────┘  └────┬────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │           │           │           │           │
                    ▼           ▼           ▼           ▼           ▼
               ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
               │Finance │ │ Legal  │ │Creator │ │  Lab   │ │ DevOps │
               └────────┘ └────────┘ └────────┘ └────────┘ └────────┘


FRONTEND SERVICES (Independent)
═══════════════════════════════════════════════════════════════════════════════════

┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    WEB      │  │    HOME     │  │    DOCS     │  │   PRISM     │
│ (Main App)  │  │ (Landing)   │  │ (Docs Site) │  │ (Browser OS)│
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
       │                │                │                │
       └────────────────┴────────────────┴────────────────┘
                                │
                      Calls API Gateway
```

## Data Flow

```
REQUEST FLOW
═══════════════════════════════════════════════════════════════════════════════════

User Request
     │
     ▼
┌─────────────────┐
│   Cloudflare    │ ◄─── DNS resolution + TLS termination
│   Edge          │      DDoS protection, WAF, caching
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Cloudflare    │ ◄─── Zero-trust tunnel to Railway
│   Tunnel        │      No public IPs exposed
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Railway       │ ◄─── Container routing based on subdomain
│   Ingress       │
└────────┬────────┘
         │
         ├──────────────────────────────────────────┐
         │                                          │
         ▼                                          ▼
┌─────────────────┐                        ┌─────────────────┐
│   API Gateway   │                        │   Static Sites  │
│   (Auth/Route)  │                        │   (WEB/DOCS)    │
└────────┬────────┘                        └─────────────────┘
         │
         ├─────────────┬─────────────┬─────────────┐
         │             │             │             │
         ▼             ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
   │   CORE   │  │  BEACON  │  │ OPERATOR │  │  AGENTS  │
   └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## CI/CD Pipeline

```
DEPLOYMENT PIPELINE
═══════════════════════════════════════════════════════════════════════════════════

Developer Push                      GitHub Actions                    Railway
      │                                   │                              │
      │  git push origin main             │                              │
      ├──────────────────────────────────►│                              │
      │                                   │                              │
      │                            ┌──────┴──────┐                       │
      │                            │   CI Job    │                       │
      │                            │  - Lint     │                       │
      │                            │  - Test     │                       │
      │                            │  - Build    │                       │
      │                            └──────┬──────┘                       │
      │                                   │                              │
      │                                   │ On success                   │
      │                                   │                              │
      │                            ┌──────┴──────┐                       │
      │                            │   CD Job    │                       │
      │                            │railway up   │──────────────────────►│
      │                            └─────────────┘                       │
      │                                                                  │
      │                                                           ┌──────┴──────┐
      │                                                           │   Deploy    │
      │                                                           │  Container  │
      │                                                           └──────┬──────┘
      │                                                                  │
      │                                                           ┌──────┴──────┐
      │◄─────────────────────────────────────────────────────────│   Health    │
      │                         Deployment URL                    │   Check     │
      │                                                           └─────────────┘
```

## Organization Structure

```
GITHUB ORGANIZATIONS
═══════════════════════════════════════════════════════════════════════════════════

Blackbox-Enterprises (Parent Umbrella)
├── BlackRoad-OS ─────────────────────── Core operating system repos
│   ├── blackroad-os
│   ├── blackroad-os-core
│   ├── blackroad-os-api
│   ├── blackroad-os-api-gateway
│   ├── blackroad-os-web
│   ├── blackroad-os-operator
│   ├── blackroad-os-infra
│   ├── blackroad-os-agents
│   ├── blackroad-os-beacon
│   ├── blackroad-os-prism-console
│   ├── blackroad-os-docs
│   ├── blackroad-os-home
│   ├── blackroad-os-demo
│   ├── blackroad-os-research
│   ├── blackroad-os-archive
│   ├── blackroad-os-brand
│   ├── blackroad-os-ideas
│   ├── blackroad-os-master
│   └── blackroad-os-pack-* (6 packs)
│
├── BlackRoad-AI ─────────────────────── AI/ML focused repos
├── BlackRoad-Labs ───────────────────── Research & experiments
├── BlackRoad-Studio ─────────────────── Creative/design assets
├── BlackRoad-Cloud ──────────────────── Cloud infrastructure
├── BlackRoad-Security ───────────────── Security tooling
├── BlackRoad-Education ──────────────── Learning resources
├── BlackRoad-Foundation ─────────────── Open source initiatives
├── BlackRoad-Gov ────────────────────── Government/compliance
├── BlackRoad-Hardware ───────────────── Hardware projects
├── BlackRoad-Interactive ────────────── Interactive experiences
├── BlackRoad-Media ──────────────────── Media/content
├── BlackRoad-Archive ────────────────── Historical preservation
└── BlackRoad-Ventures ───────────────── Business ventures
```

## Port Mapping

```
SERVICE PORTS
═══════════════════════════════════════════════════════════════════════════════════

API/Backend Services (Port 8080)
├── blackroad-os ················· 8080
├── blackroad-os-api ············· 8080
├── blackroad-os-api-gateway ····· 8080
├── blackroad-os-core ············ 8080
├── blackroad-os-operator ········ 8080
├── blackroad-os-beacon ·········· 8080
├── blackroad-os-agents ·········· 8080
├── blackroad-os-archive ········· 8080
├── blackroad-os-research ········ 8080
├── blackroad-os-infra ··········· 8080
├── blackroad-os-master ·········· 8080
├── blackroad-os-ideas ··········· 8080
├── blackroad-os-pack-finance ···· 8080
├── blackroad-os-pack-legal ······ 8080
├── blackroad-os-pack-education ·· 8080
├── blackroad-os-pack-infra-devops 8080
└── blackroad-os-pack-research-lab 8080

Frontend Services (Port 3000)
├── blackroad-os-web ············· 3000
├── blackroad-os-home ············ 3000
├── blackroad-os-docs ············ 3000
├── blackroad-os-demo ············ 3000
├── blackroad-os-brand ··········· 3000
├── blackroad-os-prism-console ··· 3000
└── blackroad-os-pack-creator ···· 3000
```

---

**Generated**: 2024-11-29
**Author**: Claude (Cece) + Alexa Amundson
**Version**: 1.0.0
