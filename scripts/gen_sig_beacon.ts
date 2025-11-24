import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const payload = {
  ts: new Date().toISOString(),
  agent: "Infra-Gen-0",
};

const target = join(process.cwd(), "public", "sig.beacon.json");
const directory = dirname(target);

mkdirSync(directory, { recursive: true });
writeFileSync(target, JSON.stringify(payload, null, 2));

console.log(`sig.beacon.json updated at ${payload.ts}`);
