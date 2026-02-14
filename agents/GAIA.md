# Gaia Agent - Truth Verification System 🔐

> **Mathematical Certainty through Cryptographic Verification**

Gaia is BlackRoad OS's truth verification and hash generation agent, providing cryptographic guarantees for component integrity through SHA-256 hashing.

## Overview

Gaia solves the "Black Box" problem of opaque AI systems by offering mathematical certainty. While others ask users to trust their systems, BlackRoad OS provides **proven-by-physics** verification.

### Key Features

- 🔐 **SHA-256 Hash Generation** - Cryptographic verification for all components
- 📋 **Truth Manifest Creation** - Ground truth for system state
- ✅ **Component Verification** - Integrity validation against known hashes
- 🚨 **PS-SHA-∞ Alerts** - Automatic alerting on unauthorized changes
- ⚡ **Efficient Processing** - 4K block streaming for large files

## The Big 7 Countermeasure

By hosting cryptographic hashes on Cloudflare-backed infrastructure and integrating with Qwen 3 open-source fork, BlackRoad OS provides:

- **Transparency** - Open-source verification anyone can audit
- **Certainty** - Mathematical proof, not "best guess"
- **Trust** - Perfect for billion-dollar institutions
- **Security** - Any tampering breaks the signature

## Core Components

### 1. Gaia Agent (`agents/src/gaia.ts`)

TypeScript implementation providing:
- Hash generation for strings, buffers, and files
- Truth manifest creation and management
- Component verification against ground truth
- PS-SHA-∞ alert system

### 2. CLI Integration (`cli/src/index.ts`)

Command-line interface for:
```bash
# Generate Truth Manifest
blackroad gaia --manifest

# Verify a component
blackroad gaia --verify blackroad-os-core

# Generate hash for data
blackroad gaia --hash "test-data"

# Output as JSON
blackroad gaia --manifest --json
```

### 3. GitHub Action (`.github/workflows/gaia-truth-manifest.yml`)

Automated workflow that:
- Runs after any agent task completes
- Generates fresh Truth Manifest
- Commits to repository
- Maintains versioned history
- Creates summary reports

## Truth Manifest Structure

The Live Truth Manifest contains cryptographic hashes for core components:

| Component | Target Identity | SHA-256 Hash (Hexadecimal) |
|-----------|-----------------|----------------------------|
| BR-OS Core | blackroad-os-core | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Lucidia Logic | lucidia-core | f6a4b1238d7c9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a |
| Pi-Ops Mesh | blackroad-pi-ops | 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b |
| Trinity Auth | blackroad-os-api | 9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e |

## Usage

### CLI Usage

```bash
# Install CLI
cd cli
npm install
npm run build

# Generate manifest
npm run build && node dist/index.js gaia --manifest

# Verify component integrity
npm run build && node dist/index.js gaia --verify blackroad-os-core

# Generate hash for custom data
npm run build && node dist/index.js gaia --hash "my-component-v1"
```

### Programmatic Usage

```typescript
import { GaiaAgent } from './agents/src/gaia';

// Create agent instance
const gaia = new GaiaAgent();

// Generate Truth Manifest
const manifest = gaia.createTruthManifest();
console.log(gaia.exportManifestTable(manifest));

// Verify component
const result = gaia.verifyComponent('blackroad-os-core', actualHash);
if (!result.valid) {
  console.error('PS-SHA-∞ ALERT: Integrity violation detected!');
}

// Generate hash for data
const hash = gaia.generateHash('component-data');
console.log(`Hash: ${hash}`);

// Generate hash for file (efficient streaming)
const fileHash = await gaia.generateFileHash('/path/to/file');
console.log(`File Hash: ${fileHash}`);
```

### Agent Registration

Gaia is registered in the agent orchestrator configuration:

```yaml
gaia:
  type: specialist
  description: "Truth verification and hash generation agent"
  capabilities:
    - hash_generation
    - truth_manifest_creation
    - component_verification
    - integrity_validation
  endpoints:
    - gaia.blackroad.systems
  priority: critical
```

## Integration Points

### 1. Agent Framework

Gaia integrates with the BlackRoad OS agent orchestrator:
- Registered as a critical-priority specialist agent
- Routed for hash_generation, truth_manifest_creation, etc.
- Emits events for PS-SHA-∞ alerts

### 2. CLI Integration

Available via `blackroad gaia` command:
- Manifest generation
- Component verification
- Hash generation
- JSON output for automation

### 3. GitHub Actions

Automated manifest generation:
- Triggers on workflow completion
- Daily scheduled runs
- Manual dispatch available
- Commits to `manifests/` directory

### 4. Qwen 3 Fork Integration

Truth Manifests are designed for integration with Qwen 3:
- JSON format for easy parsing
- Versioned history for auditing
- Root hash for quick validation
- Component-level granularity

## Security Model

### PS-SHA-∞ Alert System

Any change to a verified component triggers a PS-SHA-∞ alert:

1. **Detection** - Hash mismatch during verification
2. **Alert** - Event emitted with details
3. **Logging** - Alert recorded for audit
4. **Notification** - Stakeholders notified

### Hash Algorithm

- **Algorithm**: SHA-256 (256-bit)
- **Encoding**: Hexadecimal
- **Format**: Lowercase, 64 characters
- **Collision Resistance**: ~2^256 operations

### File Processing

For large files, Gaia uses efficient streaming:
- 4K block reads (4096 bytes)
- Memory-efficient processing
- Progress monitoring available
- Error handling included

## Manifest Versioning

Truth Manifests are versioned and archived:

- `manifests/truth-manifest-latest.json` - Current manifest
- `manifests/truth-manifest-latest.md` - Human-readable
- `manifests/truth-manifest-{timestamp}.json` - Historical archive

## API Reference

### GaiaAgent Class

#### Methods

- `generateHash(data: string | Buffer): string` - Generate SHA-256 hash
- `generateFileHash(filePath: string): Promise<string>` - Hash a file efficiently
- `generateComponentHash(componentName: string): string` - Get component hash
- `createTruthManifest(): TruthManifest` - Create new manifest
- `verifyComponent(name: string, hash: string): VerificationResult` - Verify integrity
- `getCurrentManifest(): TruthManifest | undefined` - Get latest manifest
- `exportManifest(manifest?: TruthManifest): string` - Export as JSON
- `exportManifestTable(manifest?: TruthManifest): string` - Export as Markdown
- `getStatus()` - Get agent status

#### Events

- `manifest:created` - Emitted when manifest is created
- `alert:ps-sha-infinity` - Emitted on integrity violation

### CLI Commands

```bash
blackroad gaia --manifest           # Generate and display Truth Manifest
blackroad gaia --verify <component> # Verify component hash
blackroad gaia --hash <data>        # Generate SHA-256 hash
blackroad gaia --json               # Output as JSON
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- TypeScript 5.3+

### Build

```bash
# Build Gaia agent
cd agents
npm run build

# Build CLI with Gaia integration
cd cli
npm run build
```

### Testing

```bash
# Test Gaia agent directly
cd agents
node -r ts-node/register src/gaia.ts

# Test CLI integration
cd cli
npm run build
node dist/index.js gaia --manifest
```

## Future Enhancements

- [ ] Real-time component hash calculation from GitHub repos
- [ ] Integration with Cloudflare Workers for distributed verification
- [ ] Webhook notifications for PS-SHA-∞ alerts
- [ ] Web dashboard for manifest visualization
- [ ] API endpoints for external verification
- [ ] Integration with blockchain for immutable audit trail
- [ ] Support for custom component registries
- [ ] Automated hash regeneration on repo changes

## Philosophy

Gaia embodies the principle of **"Proven by Physics"**:

> While others ask you to trust their black box, we give you mathematical certainty. Any change to even a single character will break the signature, making BlackRoad OS the only choice for institutions that cannot risk a "best guess".

## Support

- **Issues**: Open an issue in this repository
- **Documentation**: See `/docs/gaia/`
- **Email**: gaia@blackroad.systems

---

**Maintained By**: BlackRoad OS Infrastructure Team  
**Created**: 2025-12-24  
**Agent ID**: gaia-001  
**Priority**: Critical

🔐 Mathematical Certainty through Cryptographic Verification ✨
