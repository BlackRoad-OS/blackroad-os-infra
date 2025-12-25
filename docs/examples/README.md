# Examples Directory

This directory contains example templates and reference files for BlackRoad OS infrastructure and project management.

## Available Examples

### Signal Examples (JSON)

#### `sig.beacon.sample.json`
Sample health beacon signal showing service status and metadata.

**Use cases:**
- Service health monitoring
- Deployment status tracking
- Agent metadata reporting

#### `sig.deploy-log.sample.json`
Sample deployment log signal tracking deployment lifecycle.

**Use cases:**
- Deployment tracking
- CI/CD pipeline monitoring
- Incident correlation

### Project Management Templates (Markdown)

#### `stakeholder-map-v12.md`
Comprehensive stakeholder engagement tracking template with 7 stakeholders and 7 signal indicators each.

**Features:**
- Track 7 key stakeholder roles (Exec, Legal, Security, Eng, Comms, QA, Support)
- 7-point signal history per stakeholder
- Color-coded engagement status (🟢🟡🔴⚪️)
- Weekly tracking with gate indicators
- Full instructions and best practices

**Use cases:**
- Large project stakeholder management
- Executive status reporting
- Risk assessment and escalation
- Sprint planning and retrospectives

#### `stakeholder-map-v12-compact.md`
Compact version of the stakeholder map for quick updates and inline embedding.

**Features:**
- Condensed single-block format
- Easy to copy/paste into issues, PRs, Slack
- Same 7x7 signal tracking
- Quick reference legend

**Use cases:**
- Daily standups
- Slack/Discord status updates
- GitHub issue/PR comments
- Quick weekly check-ins

## Usage Guidelines

### Signal Files (JSON)

Copy the sample files and customize:
```bash
cp sig.beacon.sample.json ../../../public/sig.beacon.json
# Edit with your service details
```

**Note:** Never commit real secrets or sensitive data to these files.

### Stakeholder Maps

1. **For detailed planning:** Use `stakeholder-map-v12.md`
   - Copy to your project documentation
   - Fill in all sections
   - Update weekly

2. **For quick updates:** Use `stakeholder-map-v12-compact.md`
   - Copy the compact template block
   - Paste in issues, PRs, or chat
   - Update signals before standups

## Contributing

When adding new examples:

1. **Name clearly:** Use descriptive filenames with version numbers if applicable
2. **Document thoroughly:** Add usage instructions and use cases
3. **Update this README:** Add your example to the appropriate section above
4. **Keep it generic:** Remove all real credentials, names, or sensitive data
5. **Validate format:** Ensure JSON is valid, Markdown renders correctly

## Version History

- **v12 (2025-12-25):** Added stakeholder map templates (full and compact versions)
- **Initial:** Signal examples (beacon and deploy-log)

## Related Documentation

- [Service Infrastructure Template](../../templates/SERVICE_INFRA_TEMPLATE.md)
- [Observability Docs](../observability/)
- [Runbooks](../runbooks/)
- [Cloudflare Guides](../CLOUDFLARE_INDEX.md)

---

**Maintained by:** BlackRoad OS Infrastructure Team
