# 📚 Examples & Templates

This directory contains practical examples and templates for various BlackRoad OS infrastructure patterns.

---

## 📋 Available Examples

### Project Management & Tracking

| Example | Description | Version | File |
|---------|-------------|---------|------|
| **Examples Pack v74** | Project board template with 7 cards + dashboard using emoji-based visual tracking | v74 | [EXAMPLES_PACK_v74.md](./EXAMPLES_PACK_v74.md) |

### Signal (SIG) System

| Example | Description | File |
|---------|-------------|------|
| **SIG Beacon Sample** | Example beacon signal payload | [sig.beacon.sample.json](./sig.beacon.sample.json) |
| **SIG Deploy Log Sample** | Example deployment log signal | [sig.deploy-log.sample.json](./sig.deploy-log.sample.json) |

---

## 🎯 Using These Examples

### Project Management Templates

The Examples Pack series provides templates for visualizing and tracking project progress:

- **v74**: PROJECT BOARD — 7 cards + dashboard with emoji-based status indicators
- **v75** (Coming Soon): Gantt emoji chart with timelines, workstreams, and dependencies

Perfect for:
- Sprint planning
- Feature development tracking
- Multi-workstream coordination
- Quick visual status updates

### SIG System Examples

Signal (SIG) examples demonstrate the format and structure of various system signals:

- **Beacon Signals**: Service health and status broadcasts
- **Deploy Logs**: Deployment event tracking

These can be used as reference when implementing signal generation in services.

---

## 📖 Documentation Standards

When adding new examples:

1. **File Naming**: Use descriptive names with version numbers where applicable
   - Format: `{NAME}_v{VERSION}.{ext}` or `{name}.sample.{ext}`
   - Example: `EXAMPLES_PACK_v74.md`, `sig.beacon.sample.json`

2. **Documentation**: Each example should include:
   - Clear title and version
   - Overview/purpose
   - Usage instructions
   - Practical examples
   - Reference guides

3. **Maintenance**: Keep examples:
   - Up-to-date with current practices
   - Well-documented
   - Version-numbered for tracking evolution

---

## 🔄 Version History

### Examples Pack Series

- **v74** (Current): PROJECT BOARD — 7 cards + dashboard
- **v75** (Planned): Gantt emoji chart with 7 weeks × 7 workstreams

### SIG Samples

- Last updated: Check individual file timestamps

---

## 🤝 Contributing

To add a new example:

1. Create the example file in this directory
2. Follow naming conventions
3. Add entry to this README under the appropriate category
4. Include comprehensive documentation within the example

---

## 📚 Related Documentation

- [Service Templates](../../templates/) - Service infrastructure templates
- [Observability Patterns](../observability/) - Logging and monitoring examples
- [Runbooks](../runbooks/) - Operational procedures
- [Playbooks](../playbooks/) - Step-by-step guides

---

**Last Updated:** December 2024  
**Maintainer:** BlackRoad OS Infrastructure Team
