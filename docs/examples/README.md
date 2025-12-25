# Examples Directory

This directory contains example data files and sample payloads for various BlackRoad OS systems.

## Available Examples

### Governance & Approvals

#### [governance-approvals-v32.json](./governance-approvals-v32.json)
**Version:** v32  
**Documentation:** [GOVERNANCE_APPROVALS_V32.md](./GOVERNANCE_APPROVALS_V32.md)

A complete governance and approval workflow system demonstrating:
- 7 policies progressing through 7 approval gates
- Visual board representation with emoji status indicators
- Gate definitions: Draft, Review, Legal, Security, Vote, Approve, Publish
- Status tracking: approved (🟢), pending (🟡), rejected (🔴), empty (⚪️), vote (⭕)

**Use Cases:**
- Policy review processes
- Document approval workflows
- Change management tracking
- Compliance workflows
- Release management

### SIG (Service Integrity Gateway) Examples

#### [sig.beacon.sample.json](./sig.beacon.sample.json)
Sample SIG beacon payload for service health reporting.

**Fields:**
- `service`: Service identifier
- `version`: Semantic version + git hash
- `env`: Environment (local/staging/prod)
- `status`: Health status
- `url`: Health check endpoint
- `last_checked_at`: ISO 8601 timestamp
- `meta`: Additional metadata (region, agent_id, ps_sha_infinity)

#### [sig.deploy-log.sample.json](./sig.deploy-log.sample.json)
Sample SIG deployment log entry.

**Use Cases:**
- Tracking service deployments
- Monitoring service health
- Infrastructure reporting

## Generating Examples

Some examples are generated from specifications using scripts:

```bash
# Generate SIG examples from specs
npm run generate:sig-examples
# Or directly:
npx ts-node scripts/generate_sig_examples.ts
```

## Adding New Examples

To add a new example:

1. Create the example data file (JSON, YAML, etc.)
2. Validate the structure:
   ```bash
   cat example.json | jq '.' > /dev/null
   ```
3. Create documentation (optional but recommended)
4. Update this README
5. Consider adding to the generation script if it follows a spec pattern

## Integration

These examples can be used for:
- **Testing:** Validate parsers and data structures
- **Documentation:** Show API consumers what data looks like
- **Prototyping:** Quickly spin up UIs with realistic data
- **CI/CD:** Test deployment pipelines with sample payloads
- **Onboarding:** Help new developers understand data formats

## Related Documentation

- [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)
- [Service Registry](../../registry/services.yaml)
- [Architecture Documentation](../ARCHITECTURE.md)
- [Packs Infrastructure](../../services/packs/infra.yml)

## File Naming Conventions

- **Sample Files:** `{system}.{type}.sample.{ext}` (e.g., `sig.beacon.sample.json`)
- **Versioned Examples:** `{name}-v{version}.{ext}` (e.g., `governance-approvals-v32.json`)
- **Documentation:** `{NAME}_V{VERSION}.md` or `{SYSTEM}_{TYPE}_SAMPLE.md`

## Validation

All JSON files in this directory should be valid JSON:

```bash
for file in docs/examples/*.json; do
  echo "Validating $file..."
  jq '.' "$file" > /dev/null && echo "✅ Valid" || echo "❌ Invalid"
done
```
