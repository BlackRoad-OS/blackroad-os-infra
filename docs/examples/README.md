# Examples Directory

This directory contains sample files and templates for various BlackRoad OS infrastructure patterns.

## 📋 Available Examples

### 🧩 Procurement & Vendor Tracking (v17)

**NEW** - Comprehensive procurement tracking template for managing vendor relationships and purchase workflows.

- **[procurement-vendor-tracking-v17.md](./procurement-vendor-tracking-v17.md)** - Full documentation with multiple examples and usage guide
- **[procurement-vendor-tracking-v17.txt](./procurement-vendor-tracking-v17.txt)** - Simple text format for quick copy/paste
- **[procurement-vendor-tracking-v17.sample.json](./procurement-vendor-tracking-v17.sample.json)** - JSON data structure for programmatic use

**Features:**
- Track 7 vendors/items across 7 procurement steps
- Visual status indicators (🟢 done, 🟡 waiting, 🔴 blocked, ⚪️ empty)
- Customizable step labels for different procurement types
- Multiple pre-filled examples (hardware, software, marketing)
- JSON structure for automation and integration

**Quick Start:**
```
🛒 PROCUREMENT: ____________________   📅 WEEK: ____________   🚦 STATUS: 🟡
🧭 Steps →       1️⃣  2️⃣  3️⃣  4️⃣  5️⃣  6️⃣  7️⃣

V1 💽 Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
V2 🔌 Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
V3 ⚙️ Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
V4 🧰 Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
V5 🔑 Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
V6 📺 Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
V7 🎒 Vendor/Item __________   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

✅ STEP LABELS: 1️⃣ Request  2️⃣ Approve  3️⃣ Quote  4️⃣ Order  5️⃣ Ship  6️⃣ Receive  7️⃣ Pay
```

### 🚦 Service Status & Monitoring

- **[sig.beacon.sample.json](./sig.beacon.sample.json)** - Service health beacon format
- **[sig.deploy-log.sample.json](./sig.deploy-log.sample.json)** - Deployment log format

**Service Beacon Example:**
```json
{
  "service": "blackroad-os-web",
  "version": "2025.11.23+githash",
  "env": "prod",
  "status": "healthy",
  "url": "https://web.blackroad.io/health"
}
```

**Deploy Log Example:**
```json
{
  "service": "blackroad-os-api",
  "env": "prod",
  "git_sha": "9ac5e5f7",
  "outcome": "success"
}
```

## 🎯 Usage Guidelines

### For Documentation
- Use `.md` files for comprehensive guides and documentation
- Include multiple examples and use cases
- Add contextual information and best practices

### For Quick Reference
- Use `.txt` files for simple copy/paste templates
- Keep formatting minimal and readable
- Focus on the core structure

### For Automation
- Use `.json` files for structured data
- Include all relevant metadata
- Design for programmatic consumption

## 🔗 Related Documentation

- [Main README](../../README.md) - Repository overview
- [Infrastructure Overview](../INFRA_OVERVIEW.md) - Infrastructure documentation
- [Service Registry](../../registry/services.yaml) - Service definitions
- [Templates](../../templates/) - Service templates

## 📝 Contributing New Examples

When adding new examples:

1. **Choose appropriate format(s):**
   - `.md` for comprehensive documentation
   - `.txt` for simple templates
   - `.json` for structured data

2. **Use clear naming:**
   - Descriptive names: `feature-name-vXX.format`
   - Version numbers for tracking changes
   - Sample/example suffix for clarity

3. **Include documentation:**
   - Add entry to this README
   - Provide usage examples
   - Explain the purpose and use cases

4. **Follow conventions:**
   - Use emojis for visual clarity (when appropriate)
   - Maintain consistent formatting
   - Include metadata (created date, version, etc.)

## 📊 Example Categories

### Infrastructure & Operations
- Service beacons and health checks
- Deployment logs and tracking
- Procurement and vendor management

### Future Examples (Planned)
- 🚀 CI/CD Pipeline Templates
- 📊 Monitoring Dashboard Configs
- 🔐 Security Audit Checklists
- 📈 Performance Benchmark Formats
- 🎫 Incident Response Templates

---

**Last Updated**: 2025-12-25  
**Maintained by**: BlackRoad Infrastructure Team
