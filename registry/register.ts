import fs from "fs";
import path from "path";

interface DeploymentRecord {
  service: string;
  domain: string;
  port: number;
  agent: string;
  hash: string;
  deployedAt: string;
}

interface LogDeploymentOptions {
  service: string;
  domain: string;
  port: number;
  agent: string;
  hash: string;
}

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readRegistry(filePath: string): DeploymentRecord[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as DeploymentRecord[];
    }
    if (parsed && Array.isArray((parsed as { deployments?: DeploymentRecord[] }).deployments)) {
      return (parsed as { deployments: DeploymentRecord[] }).deployments;
    }
  } catch (error) {
    console.warn(`Could not read registry file ${filePath}:`, error);
  }

  return [];
}

export function logDeployment(options: LogDeploymentOptions) {
  const registryFile = path.resolve("registry", "deployments.json");
  ensureDir(registryFile);

  const deployments = readRegistry(registryFile);
  deployments.push({
    ...options,
    deployedAt: new Date().toISOString(),
  });

  fs.writeFileSync(registryFile, `${JSON.stringify(deployments, null, 2)}\n`);
}

export type { DeploymentRecord, LogDeploymentOptions };
