import fs from 'fs';
import path from 'path';
import Ajv, { ErrorObject } from 'ajv';

interface EnvVar {
  name: string;
  description: string;
  optional?: boolean;
}

interface RailwayTemplate {
  name: string;
  envVars: EnvVar[];
}

const servicesDir = path.join(__dirname, '..', 'railway', 'services');
const schemaPath = path.join(__dirname, '..', 'railway', 'railway.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile<RailwayTemplate>(schema);

const requiredEnv = ['BR_SERVICE_NAME', 'BR_ENV', 'BR_BEACON_ENDPOINT'];

type ValidationIssue = { file: string; issue: string };
const issues: ValidationIssue[] = [];

function checkTemplate(file: string): void {
  const fullPath = path.join(servicesDir, file);
  let data: RailwayTemplate;
  try {
    data = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as RailwayTemplate;
  } catch (error) {
    issues.push({ file, issue: `JSON parse error: ${(error as Error).message}` });
    return;
  }

  if (!validate(data)) {
    (validate.errors as ErrorObject[]).forEach((err) => {
      issues.push({ file, issue: `schema: ${err.instancePath || '/'} ${err.message}` });
    });
    return;
  }

  const envNames = new Set((data.envVars || []).map((env) => env.name));
  requiredEnv.forEach((env) => {
    if (!envNames.has(env)) {
      issues.push({ file, issue: `missing required env var ${env}` });
    }
  });
}

function main() {
  const files = fs.readdirSync(servicesDir).filter((file) => file.endsWith('.railway.json'));
  files.forEach(checkTemplate);

  if (issues.length) {
    console.error('Railway template validation failed:');
    console.table(issues);
    process.exit(1);
  }

  console.log(`Validated ${files.length} Railway service templates with no errors.`);
}

main();
