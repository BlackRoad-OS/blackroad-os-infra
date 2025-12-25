import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');
const docsDir = path.join(root, 'docs', 'examples');
fs.mkdirSync(docsDir, { recursive: true });

function loadSpec(file: string) {
  const content = fs.readFileSync(path.join(root, 'sig', file), 'utf-8');
  return JSON.parse(content);
}

function writeSample(filename: string, payload: unknown) {
  const target = path.join(docsDir, filename);
  fs.writeFileSync(target, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${path.relative(root, target)}`);
}

const beaconSpec = loadSpec('sig.beacon.spec.json');
const deploySpec = loadSpec('sig.deploy-log.spec.json');
const orgCapacitySpec = loadSpec('org.capacity.spec.json');

writeSample('sig.beacon.sample.json', beaconSpec.example);
writeSample('sig.deploy-log.sample.json', deploySpec.example);
writeSample('org.capacity.sample.json', orgCapacitySpec.example);
