// File: ops/deploy.ts

import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { updateDNS } from "../dns/cloudflare";
import { writeAuditHash } from "../.pssha/audit";
import { logDeployment } from "../registry/register";

interface DeployOptions {
  repo: string;
  branch?: string;
  port: number;
  domain: string;
  entry: string;
  envFile: string;
  agent: string;
  runtime: "node" | "docker";
  memory: {
    hash: string;
    journalFile: string;
    reason: string;
  };
  dns: {
    provider: "cloudflare";
    recordName: string;
    zone: string;
    targetIP: string;
  };
}

export async function deploy(config: DeployOptions) {
  const {
    repo,
    branch = "main",
    port,
    domain,
    entry,
    envFile,
    runtime,
    agent,
    memory,
    dns,
  } = config;

  const repoDir = path.resolve("services", repo);
  const cloneUrl = `https://github.com/BlackRoad-OS/${repo}.git`;

  console.log(`🚀 Deploying ${repo} to ${domain} on port ${port}…`);

  // 1. Clone repo
  if (!fs.existsSync(repoDir)) {
    execSync(`git clone --branch ${branch} ${cloneUrl} ${repoDir}`, {
      stdio: "inherit",
    });
  } else {
    execSync(`git pull`, { cwd: repoDir, stdio: "inherit" });
  }

  // 2. Inject .env
  const envVars = dotenv.parse(fs.readFileSync(envFile));
  const envPath = path.join(repoDir, ".env");
  fs.writeFileSync(
    envPath,
    Object.entries(envVars)
      .map(([key, val]) => `${key}=${val}`)
      .join("\n")
  );
  console.log(`✅ Injected env from ${envFile}`);

  // 3. Build & start service
  if (runtime === "node") {
    execSync(`npm install`, { cwd: repoDir, stdio: "inherit" });
    execSync(`npm run build || true`, { cwd: repoDir, stdio: "inherit" });

    execSync(`pm2 delete ${repo} || true`, { stdio: "ignore" });
    execSync(`pm2 start ${entry} --name "${repo}" --cwd "${repoDir}" --env production -- --port ${port}`, {
      stdio: "inherit",
    });
  }

  console.log(`✅ Service started on port ${port}`);

  // 4. Update DNS
  await updateDNS({
    zone: dns.zone,
    name: dns.recordName,
    type: "A",
    value: dns.targetIP,
  });

  console.log(`✅ DNS updated: ${domain} → ${dns.targetIP}`);

  // 5. Write audit hash + journal
  writeAuditHash({
    hash: memory.hash,
    timestamp: new Date().toISOString(),
    agent,
    service: repo,
    reason: memory.reason,
    file: memory.journalFile,
  });

  // 6. Register in system registry
  logDeployment({
    service: repo,
    domain,
    port,
    agent,
    hash: memory.hash,
  });

  console.log(`✅ Deployment of ${repo} completed successfully.`);
}
