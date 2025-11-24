import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv, { ErrorObject } from 'ajv';

interface DnsRecord {
  type: string;
  name: string;
  content: string;
  proxied: boolean;
  ttl: number;
}

interface ZoneFile {
  zone: string;
  core_subdomains?: string[];
  records: DnsRecord[];
}

const zoneDir = path.join(__dirname, '..', 'cloudflare', 'zones');
const schemaPath = path.join(__dirname, '..', 'cloudflare', 'dns.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile<ZoneFile>(schema);

const coreSubdomains = ['web', 'prism', 'research', 'brand', 'archive', 'chat'];

type ValidationIssue = { file: string; issue: string };
const issues: ValidationIssue[] = [];

function normalizeName(name: string, zone: string): string {
  if (name === '@') return zone;
  if (name.endsWith(zone)) return name;
  return `${name}.${zone}`;
}

function checkZone(file: string): void {
  const fullPath = path.join(zoneDir, file);
  let data: ZoneFile;

  try {
    const parsed = yaml.load(fs.readFileSync(fullPath, 'utf-8')) as ZoneFile;
    data = parsed;
  } catch (error) {
    issues.push({ file, issue: `YAML parse error: ${(error as Error).message}` });
    return;
  }

  if (!validate(data)) {
    (validate.errors as ErrorObject[]).forEach((err) => {
      issues.push({ file, issue: `schema: ${err.instancePath || '/'} ${err.message}` });
    });
    return;
  }

  const expected = data.core_subdomains?.length ? data.core_subdomains : data.zone === 'blackroad.io' ? coreSubdomains : [];
  if (expected.length) {
    const available = new Set(
      data.records.map((record) => normalizeName(record.name, data.zone))
    );

    expected.forEach((sub) => {
      const fqdn = `${sub}.${data.zone}`;
      if (!available.has(fqdn)) {
        issues.push({ file, issue: `missing required subdomain ${fqdn}` });
      }
    });
  }
}

function main() {
  const files = fs.readdirSync(zoneDir).filter((file) => file.endsWith('.yaml'));
  files.forEach(checkZone);

  if (issues.length) {
    console.error('DNS validation failed:');
    console.table(issues);
    process.exit(1);
  }

  console.log(`Validated ${files.length} Cloudflare zone blueprints with no errors.`);
}

main();
