# Examples Directory

This directory contains example configurations, sample data, and documentation packs for BlackRoad OS infrastructure.

## Contents

### Signal Examples
- **sig.beacon.sample.json** - Example beacon signal format
- **sig.deploy-log.sample.json** - Example deployment log format

### Examples Packs
- **[EXAMPLES_PACK_v148_EMOJI_DATA_MAP.md](EXAMPLES_PACK_v148_EMOJI_DATA_MAP.md)** - v148: Emoji data map (7 systems × 7 data types)

## About Examples Packs

Examples packs are versioned documentation templates that provide structured views of system data, configurations, and operational information.

### Version History

- **v148** - Emoji Data Map: 7 systems × 7 data types with legend (🔐 protected, 🗂 record, 📎 evidence, 🔎 retrieve, 🖨 produce, ⚪️ empty)

## Generating Examples

Signal examples can be regenerated using:

```bash
npm run gen:sig
```

This reads from the `sig/*.spec.json` files and generates sample JSON files.

## Usage

These examples serve multiple purposes:

1. **Documentation** - Show expected data formats and structures
2. **Templates** - Provide starting points for new configurations
3. **Testing** - Validate against schemas and specifications
4. **Communication** - Visualize system relationships and data flows

## Contributing

When adding new examples:

1. Use clear, descriptive names
2. Add an entry to this README
3. Include inline comments or documentation
4. Follow existing formatting conventions
5. Validate JSON examples with schemas when available

---

**Last Updated:** 2025-12-25
