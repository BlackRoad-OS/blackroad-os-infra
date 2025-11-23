# Websites: Complete Buildout Prompt

Paste this into Claude Code when in any BlackRoad OS website repository to build it out with consistent patterns, health endpoints, branding, and navigation.

---

## Prompt

```
You are editing one of the BlackRoad OS website repositories. Depending on the directory you are in, you may be working on:

* **blackroad-os-prism-console** – Admin console, currently uses Next.js App Router, already partially built.
* **blackroad-os-web** – Public marketing site, Next.js 14 App Router.
* **blackroad-os-home** – Landing hub, static Next.js 14 export.
* **blackroad-os-brand** – Brand system, Next.js export.
* **blackroad-os-docs** – Documentation portal, Next.js 14 Pages Router.

Your goal is to build out every website in a consistent, production‑ready way, following existing OS conventions. You MUST detect which repo you're in and tailor your work accordingly.

---

## 0. Context and conventions

All BlackRoad OS web services adhere to the following conventions:

1. **Next.js** for the UI layer (App Router or Pages Router).
2. **TypeScript** and React 18+.
3. **Environment configuration** via `.env.example` with variables:
   * `OS_ROOT`, `SERVICE_BASE_URL`, `CORE_API_URL`
   * `PUBLIC_*` variables for server-side use
   * `NEXT_PUBLIC_*` variables for client-side use
   * `PORT` – default 8080, bind to `0.0.0.0`
   * `NODE_ENV=production`
4. **Health endpoints**:
   * Server must respond to `GET /health` with `{ "status": "ok", "service": "<service_name>" }`.
   * An alias `/api/health` may be kept for backward compatibility.
5. **Metadata endpoints**:
   * `/api/info` – returns service metadata (`name`, `id`, version).
   * `/api/version` – returns build/version details.
6. **Deployment**:
   * Use `npm ci && npm run build` then `npm start` (binding to `$PORT`).
   * Health checks on `/health`.
   * Nixpacks or static export as appropriate.

**Brand guidelines** are defined in `blackroad-os-brand` (colors, typography, logo usage). All sites should import and use these design tokens or CSS variables for consistent look and feel.

---

## 1. Detect the repository and examine its structure

Depending on which repository you are in, start by reading its `README.md` and inspecting key files:

* Look for `package.json` to see if it uses Next.js App Router or Pages Router.
* Identify the folder structure (`src/app/` vs `src/pages/`).
* Find any existing API routes (`src/app/api` or `pages/api`).
* Identify existing pages, navigation components, and layout shells.

Document to yourself (in comments) what currently exists so you can extend rather than overwrite.

---

## 2. Standardize environment configuration

Ensure each repo has:

1. A `.env.example` file that includes **all required variables**:
```
OS_ROOT=
SERVICE_BASE_URL=
CORE_API_URL=
PUBLIC_WEB_URL=
PUBLIC_CONSOLE_URL=
PUBLIC_DOCS_URL=
NEXT_PUBLIC_OS_ROOT=
NEXT_PUBLIC_SERVICE_ID=<repo name>
NEXT_PUBLIC_SERVICE_NAME=<human-readable name>
NEXT_PUBLIC_CONSOLE_URL=
NEXT_PUBLIC_DOCS_URL=
NEXT_PUBLIC_CORE_API_URL=
NEXT_PUBLIC_PUBLIC_API_URL=
PORT=8080
```

2. A `src/config` module (e.g. `src/config.ts` or `src/config/serviceConfig.ts`) that reads these variables on both server and client sides. Use default values for local development (`localhost` URLs) but defer to environment in production.

3. A README section explaining how to copy `.env.example` to `.env.local` and which variables must be set.

---

## 3. Create or validate health and metadata endpoints

Implement the following API endpoints in Next.js, regardless of router type:

1. `GET /api/health` and `GET /health` – return `{ status: "ok", service: "<service name>" }`.

**App Router implementation:**
```typescript
// src/app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: process.env.NEXT_PUBLIC_SERVICE_NAME || "blackroad-service",
  });
}
```

**Root health endpoint (App Router):**
```typescript
// src/app/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: process.env.NEXT_PUBLIC_SERVICE_NAME || "blackroad-service",
  });
}
```

2. `GET /api/info` – return JSON with service metadata:

```typescript
// src/app/api/info/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    service: process.env.NEXT_PUBLIC_SERVICE_NAME || "blackroad-service",
    id: process.env.NEXT_PUBLIC_SERVICE_ID || "unknown",
    description: "BlackRoad OS service",
    links: {
      console: process.env.NEXT_PUBLIC_CONSOLE_URL,
      docs: process.env.NEXT_PUBLIC_DOCS_URL,
      core: process.env.NEXT_PUBLIC_CORE_API_URL,
    },
  });
}
```

3. `GET /api/version` – return build/version metadata:

```typescript
// src/app/api/version/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: process.env.npm_package_version || "0.0.0",
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
  });
}
```

Ensure these endpoints work in both development (`npm run dev`) and production (`npm run build && npm start`) with correct port binding.

**For static exports (home, brand):** Create a custom server or use Vercel serverless functions for health endpoints.

---

## 4. Build out consistent page structure

For each site, implement the following pages using existing router patterns:

### 4.1 Landing pages

**blackroad-os-web** (`/`):
* A marketing landing page introducing BlackRoad OS.
* Use brand colors and typography.
* Include sections for features, quick links to Docs, Console, and core API.
* Show real-time status by polling `/api/health` from each service (web, console, core) and displaying a small status indicator.

**Example:**
```tsx
// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ServiceStatus {
  name: string;
  url: string;
  status: "ok" | "error" | "loading";
}

export default function HomePage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Console", url: process.env.NEXT_PUBLIC_CONSOLE_URL + "/health", status: "loading" },
    { name: "Core API", url: process.env.NEXT_PUBLIC_CORE_API_URL + "/health", status: "loading" },
    { name: "Docs", url: process.env.NEXT_PUBLIC_DOCS_URL + "/health", status: "loading" },
  ]);

  useEffect(() => {
    services.forEach((service, index) => {
      fetch(service.url)
        .then(res => res.json())
        .then(data => {
          setServices(prev => {
            const updated = [...prev];
            updated[index].status = data.status === "ok" ? "ok" : "error";
            return updated;
          });
        })
        .catch(() => {
          setServices(prev => {
            const updated = [...prev];
            updated[index].status = "error";
            return updated;
          });
        });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">BlackRoad OS</h1>
          <p className="text-xl text-gray-300 mb-8">
            Multi-service architecture for modern applications
          </p>
          <div className="flex gap-4">
            <Link
              href={process.env.NEXT_PUBLIC_CONSOLE_URL || "#"}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Open Console
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_DOCS_URL || "#"}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
            >
              View Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Agents</h3>
              <p className="text-gray-600">
                Manage AI agents with full CRUD operations
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Tasks</h3>
              <p className="text-gray-600">
                Track and organize tasks with priority management
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Authentication</h3>
              <p className="text-gray-600">
                Secure JWT-based authentication system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">System Status</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.name} className="flex items-center gap-3 p-4 border rounded">
                <div
                  className={`w-3 h-3 rounded-full ${
                    service.status === "ok"
                      ? "bg-green-500"
                      : service.status === "error"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                />
                <span className="font-medium">{service.name}</span>
                <span className="text-sm text-gray-500 ml-auto">
                  {service.status === "loading" ? "Checking..." : service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**blackroad-os-home** (`/`):
* A hub page linking to all other services (Console, Web, Docs, Operator, Brand).
* Should include a brief tagline and a unified navigation bar.
* Provide a health widget similar to the web site.

```tsx
// src/app/page.tsx
export default function HubPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">BlackRoad OS</h1>
        <p className="text-xl text-gray-600 mb-12">Operating System Hub</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          <Link href="/console" className="bg-white p-8 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Console</h2>
            <p className="text-gray-600">Admin dashboard</p>
          </Link>
          <Link href="/web" className="bg-white p-8 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Web</h2>
            <p className="text-gray-600">Marketing site</p>
          </Link>
          <Link href="/docs" className="bg-white p-8 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Docs</h2>
            <p className="text-gray-600">Documentation</p>
          </Link>
          <Link href="/brand" className="bg-white p-8 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Brand</h2>
            <p className="text-gray-600">Brand guidelines</p>
          </Link>
          <Link href="/api" className="bg-white p-8 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">API</h2>
            <p className="text-gray-600">Public API</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**blackroad-os-brand**:
* Static pages explaining brand guidelines (colors, fonts, logos).
* Export CSS variables or tokens in a module (e.g. `src/styles/brand.css`).

Create `src/styles/brand.css`:
```css
:root {
  /* Colors */
  --br-primary: #1e40af;
  --br-secondary: #64748b;
  --br-success: #10b981;
  --br-error: #ef4444;
  --br-warning: #f59e0b;

  /* Grays */
  --br-gray-50: #f9fafb;
  --br-gray-100: #f3f4f6;
  --br-gray-900: #111827;

  /* Typography */
  --br-font-sans: ui-sans-serif, system-ui, sans-serif;
  --br-font-mono: ui-monospace, monospace;

  /* Spacing */
  --br-spacing-xs: 0.25rem;
  --br-spacing-sm: 0.5rem;
  --br-spacing-md: 1rem;
  --br-spacing-lg: 1.5rem;
  --br-spacing-xl: 2rem;
}
```

Create brand pages:
```tsx
// src/app/colors/page.tsx
export default function ColorsPage() {
  const colors = [
    { name: "Primary", var: "--br-primary", hex: "#1e40af" },
    { name: "Secondary", var: "--br-secondary", hex: "#64748b" },
    { name: "Success", var: "--br-success", hex: "#10b981" },
    { name: "Error", var: "--br-error", hex: "#ef4444" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Brand Colors</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {colors.map((color) => (
          <div key={color.name} className="border rounded-lg overflow-hidden">
            <div
              className="h-32"
              style={{ backgroundColor: color.hex }}
            />
            <div className="p-4">
              <h3 className="font-semibold">{color.name}</h3>
              <p className="text-sm text-gray-600">{color.hex}</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                var({color.var})
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**blackroad-os-docs**:
* Sidebar navigation built from markdown files (as currently implemented).
* Ensure the homepage (`/`) includes a high-level OS overview with links to sections.
* Include a health status widget at the top.

### 4.2 Navigation

Implement a consistent header/navigation bar across all sites:

Create `src/components/Navigation.tsx`:
```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home", href: process.env.NEXT_PUBLIC_HOME_URL || "/" },
    { name: "Docs", href: process.env.NEXT_PUBLIC_DOCS_URL || "/docs" },
    { name: "Console", href: process.env.NEXT_PUBLIC_CONSOLE_URL || "/console" },
    { name: "Brand", href: process.env.NEXT_PUBLIC_BRAND_URL || "/brand" },
    { name: "API", href: process.env.NEXT_PUBLIC_PUBLIC_API_URL || "/api" },
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded" />
            <span className="font-bold text-xl">BlackRoad OS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-blue-400 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

Add to layout:
```tsx
// src/app/layout.tsx
import Navigation from "@/components/Navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2025 BlackRoad OS. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

---

## 5. Integrate brand system

In each repo:

1. **Import brand CSS variables:**
```tsx
// src/app/globals.css
@import url('../styles/brand.css');

/* Or if importing from brand package */
@import '@blackroad-os/brand/styles/brand.css';
```

2. **Use CSS variables in components:**
```css
.button-primary {
  background-color: var(--br-primary);
  color: white;
}

.text-secondary {
  color: var(--br-secondary);
}
```

3. **For monorepo setup:** Create a shared package:
```json
// packages/brand/package.json
{
  "name": "@blackroad-os/brand",
  "version": "1.0.0",
  "main": "index.js",
  "files": ["styles", "assets"]
}
```

---

## 6. Document everything

Update each repository's `README.md` to include:

```markdown
# <Service Name>

<Brief description>

## Tech Stack

- Next.js 14 (App Router / Pages Router)
- React 18
- TypeScript
- Tailwind CSS

## Local Development

1. **Clone and install:**
   \`\`\`bash
   git clone <repo>
   cd <repo>
   npm install
   \`\`\`

2. **Configure environment:**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   \`\`\`

3. **Run dev server:**
   \`\`\`bash
   npm run dev
   # Visit http://localhost:3000
   \`\`\`

## Production Build

\`\`\`bash
npm run build
npm start
# Server runs on PORT (default: 8080)
\`\`\`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| \`NEXT_PUBLIC_SERVICE_NAME\` | Yes | — | Human-readable service name |
| \`NEXT_PUBLIC_CONSOLE_URL\` | Yes | — | URL to Console |
| \`NEXT_PUBLIC_DOCS_URL\` | Yes | — | URL to Docs |
| \`PORT\` | No | 8080 | HTTP server port |

See \`.env.example\` for full list.

## Health Endpoints

- \`GET /health\` — Returns \`{ status: "ok", service: "<name>" }\`
- \`GET /api/info\` — Returns service metadata
- \`GET /api/version\` — Returns version info

## Brand System

This site uses CSS variables from \`blackroad-os-brand\`:

\`\`\`css
--br-primary
--br-secondary
--br-success
--br-error
\`\`\`

Import via:
\`\`\`tsx
import '@blackroad-os/brand/styles/brand.css';
\`\`\`

## Deployment

### Railway

\`\`\`bash
# Build command
npm ci && npm run build

# Start command
npm start

# Health check
/health
\`\`\`
```

In `blackroad-os-docs`, create `docs/services/<service-name>.md` for each website:

```markdown
# <Service Name>

## Overview

<Description>

## Repository

- GitHub: <url>
- Deployment: <url>

## Tech Stack

- Next.js 14
- React 18
- TypeScript

## API Endpoints

- \`GET /health\` — Health check
- \`GET /api/info\` — Service metadata
- \`GET /api/version\` — Version info

## Local Development

See repository README.
```

---

## 7. Compile a summary after you finish

After making these changes, report back with:

1. **Files changed or created:**
   - List full paths
   - Indicate new vs modified

2. **Commands to run:**
   ```bash
   # Development
   npm install
   npm run dev

   # Production
   npm run build
   npm start

   # Tests (if applicable)
   npm test
   ```

3. **Assumptions made:**
   - What existing content was preserved
   - What was created from scratch
   - Any deviations from the prompt

4. **Next steps:**
   - How to add a new page
   - How to extend the brand system
   - How to add a new service link

---

Be thorough and explicit. Show full file paths and full contents for any new or modified files. Avoid hand‑waving. Follow the conventions above. Detect the current repo before you begin and only apply changes that are relevant to it.

Good luck—build out this website and make it shine!
```
