import { spawn } from 'child_process';
import { mkdir, readFile, stat, writeFile } from 'fs/promises';
import path from 'path';

interface DeployGitOptions {
  branch: string;
  url: string;
}

interface DeployDnsOptions {
  provider: 'cloudflare';
  recordType: 'A' | 'CNAME';
  challenge?: string;
  target: string;
}

interface DeployOptions {
  repo: string;
  domain: string;
  runtime: 'node' | 'pm2' | 'docker';
  port: number;
  env: 'production' | 'staging' | 'development' | 'local';
  memory: string;
  agent: string;
  git: DeployGitOptions;
  entry: string;
  envVars: string[];
  dns: DeployDnsOptions;
}

interface RegistryEntry {
  service: string;
  domain: string;
  agent: string;
  env: string;
  repo: string;
  branch: string;
  runtime: string;
  port: number;
  target: string;
  deployedAt: string;
}

interface DeploymentEvent {
  ok: boolean;
  service: string;
  url: string;
  agent: string;
  timestamp: string;
}

const DEPLOYMENTS_ROOT = path.join(process.cwd(), 'ops', '.deployments');
const REGISTRY_FILE = path.join(process.cwd(), 'registry', 'services.json');
const CF_TOKEN_FILE = path.join(process.cwd(), 'secrets', 'cf_api_token.env');

function logStep(step: string) {
  console.info(`\n▶ ${step}`);
}

async function runCommand(command: string, args: string[], cwd?: string, env?: NodeJS.ProcessEnv) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      env: env ?? process.env,
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
  });
}

async function ensureDir(dir: string) {
  try {
    const stats = await stat(dir);
    if (!stats.isDirectory()) {
      throw new Error(`${dir} exists but is not a directory`);
    }
  } catch (error: unknown) {
    await mkdir(dir, { recursive: true });
  }
}

async function cloneRepo(repoDir: string, git: DeployGitOptions) {
  const repoExists = await stat(repoDir).then(() => true).catch(() => false);

  if (!repoExists) {
    await ensureDir(path.dirname(repoDir));
    logStep(`Cloning ${git.url} (branch: ${git.branch})`);
    await runCommand('git', ['clone', '--branch', git.branch, git.url, repoDir]);
    return;
  }

  logStep('Refreshing existing clone');
  await runCommand('git', ['fetch'], repoDir);
  await runCommand('git', ['checkout', git.branch], repoDir);
  await runCommand('git', ['reset', '--hard', `origin/${git.branch}`], repoDir);
}

async function installAndBuild(repoDir: string) {
  logStep('Installing dependencies');
  await runCommand('npm', ['install'], repoDir);

  logStep('Building service');
  await runCommand('npm', ['run', 'build'], repoDir);
}

async function startRuntime(runtime: DeployOptions['runtime'], entry: string, repoDir: string, envVars: string[]) {
  const [command, ...args] = entry.split(' ');
  const env = {
    ...process.env,
    ...Object.fromEntries(envVars.map((item) => item.split('='))),
  } as NodeJS.ProcessEnv;

  logStep(`Launching runtime (${runtime})`);

  if (runtime === 'node') {
    await runCommand(command, args, repoDir, env);
    return;
  }

  if (runtime === 'pm2') {
    await runCommand('pm2', ['start', command, '--name', path.basename(repoDir), '--', ...args], repoDir, env);
    return;
  }

  if (runtime === 'docker') {
    await runCommand('docker', ['build', '-t', path.basename(repoDir), '.'], repoDir, env);
    await runCommand(
      'docker',
      ['run', '--rm', '-d', '-p', `${env.PORT || '3000'}:${env.PORT || '3000'}`, path.basename(repoDir)],
      repoDir,
      env,
    );
  }
}

async function loadCloudflareToken(): Promise<string | undefined> {
  const tokenExists = await stat(CF_TOKEN_FILE).then(() => true).catch(() => false);
  if (!tokenExists) {
    console.warn('Cloudflare token file not found; DNS step will be skipped');
    return undefined;
  }

  const contents = await readFile(CF_TOKEN_FILE, 'utf-8');
  const line = contents.split('\n').find((l) => l.startsWith('CLOUDFLARE_API_TOKEN='));
  return line?.split('=')[1]?.trim();
}

async function addDnsRecord(dns: DeployDnsOptions, domain: string) {
  if (dns.provider !== 'cloudflare') {
    console.warn(`DNS provider ${dns.provider} not supported`);
    return;
  }

  const token = await loadCloudflareToken();
  if (!token) {
    return;
  }

  logStep(`Adding DNS record for ${domain} -> ${dns.target}`);
  const payload = {
    type: dns.recordType,
    name: domain,
    content: dns.target,
    ttl: 120,
    proxied: true,
  };

  const response = await fetch('https://api.cloudflare.com/client/v4/zones', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to create DNS record: ${message}`);
  }
}

async function loadRegistry(): Promise<RegistryEntry[]> {
  const registryExists = await stat(REGISTRY_FILE).then(() => true).catch(() => false);
  if (!registryExists) {
    await ensureDir(path.dirname(REGISTRY_FILE));
    return [];
  }

  const contents = await readFile(REGISTRY_FILE, 'utf-8');
  try {
    return JSON.parse(contents) as RegistryEntry[];
  } catch (error: unknown) {
    console.warn('Registry file unreadable; resetting to empty array');
    return [];
  }
}

async function writeRegistry(entry: RegistryEntry) {
  await ensureDir(path.dirname(REGISTRY_FILE));
  const registry = await loadRegistry();
  const filtered = registry.filter((item) => item.service !== entry.service || item.env !== entry.env);
  filtered.push(entry);
  await writeFile(REGISTRY_FILE, `${JSON.stringify(filtered, null, 2)}\n`);
}

async function emitDeploymentEvent(options: DeployOptions): Promise<DeploymentEvent> {
  return {
    ok: true,
    service: options.repo,
    url: `https://${options.domain}`,
    agent: options.agent,
    timestamp: new Date().toISOString(),
  };
}

export async function deploy(options: DeployOptions) {
  const repoDir = path.join(DEPLOYMENTS_ROOT, options.repo);

  await ensureDir(DEPLOYMENTS_ROOT);
  await cloneRepo(repoDir, options.git);
  await installAndBuild(repoDir);
  await startRuntime(options.runtime, options.entry, repoDir, options.envVars);
  await addDnsRecord(options.dns, options.domain);

  await writeRegistry({
    service: options.repo,
    domain: options.domain,
    agent: options.agent,
    env: options.env,
    repo: options.git.url,
    branch: options.git.branch,
    runtime: options.runtime,
    port: options.port,
    target: options.dns.target,
    deployedAt: new Date().toISOString(),
  });

  const event = await emitDeploymentEvent(options);
  logStep('Deployment complete');
  console.info(JSON.stringify(event, null, 2));
  return event;
}

const presets: Record<string, DeployOptions> = {
  web: {
    repo: 'blackroad-os-web',
    domain: 'web.blackroad.systems',
    runtime: 'node',
    port: 3100,
    env: 'production',
    memory: 'ps-sha∞',
    agent: 'cadillac',
    git: {
      branch: 'main',
      url: 'https://github.com/BlackRoad-OS/blackroad-os-web.git',
    },
    entry: 'npm run start',
    envVars: [
      'NODE_ENV=production',
      'PORT=3100',
      'FRONTEND_URL=https://web.blackroad.systems',
      'LUCIDIA_HOST=https://core.blackroad.systems',
      'ROADCHAIN_API=https://roadchain.blackroad.systems',
    ],
    dns: {
      provider: 'cloudflare',
      recordType: 'A',
      challenge: '_web-verify.blackroad.systems',
      target: '1.2.3.4',
    },
  },
};

if (require.main === module) {
  const target = process.argv[2];
  const preset = presets[target];

  if (!preset) {
    console.error(`Unknown target "${target}". Available presets: ${Object.keys(presets).join(', ') || 'none'}`);
    process.exit(1);
  }

  deploy(preset).catch((error) => {
    console.error('Deployment failed:', error);
    process.exit(1);
  });
}
