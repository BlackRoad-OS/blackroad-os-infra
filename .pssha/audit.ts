import fs from "fs";
import path from "path";

interface AuditEntry {
  hash: string;
  timestamp: string;
  agent: string;
  service: string;
  reason: string;
}

interface WriteAuditOptions extends AuditEntry {
  file: string;
}

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readAuditLog(filePath: string): AuditEntry[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed as AuditEntry[];
    }
  } catch (error) {
    console.warn(`Could not read audit log ${filePath}:`, error);
  }

  return [];
}

export function writeAuditHash(options: WriteAuditOptions) {
  const logPath = path.resolve(options.file);
  ensureDir(logPath);

  const entries = readAuditLog(logPath);
  entries.push({
    hash: options.hash,
    timestamp: options.timestamp,
    agent: options.agent,
    service: options.service,
    reason: options.reason,
  });

  fs.writeFileSync(logPath, `${JSON.stringify(entries, null, 2)}\n`);
}

export type { AuditEntry, WriteAuditOptions };
