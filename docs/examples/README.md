# 📚 BlackRoad OS Infrastructure Examples

This directory contains example configurations, templates, and workflow systems for the BlackRoad OS infrastructure.

## 📋 Available Examples

### SIG (Signature/Signal) Examples

#### `sig.beacon.sample.json`
Sample beacon signal for service health monitoring.
- **Purpose**: Health check beacon format
- **Use Case**: Service monitoring and status reporting
- **Schema**: Service, version, environment, status, URL, timestamp

#### `sig.deploy-log.sample.json`
Sample deployment log signal.
- **Purpose**: Deployment tracking and audit trail
- **Use Case**: CI/CD pipeline integration, deployment history
- **Schema**: Service, environment, git SHA, actor, timing, outcome, links

---

### 🧩 Examples Packs

Example packs are versioned, comprehensive workflow and system templates designed for specific use cases.

#### 📦 Pack v134: Emoji Expense + Invoice Lane
**File**: `pack-v134-emoji-expense-invoice-lane.json`  
**Documentation**: `PACK-v134-EMOJI-EXPENSE-INVOICE-LANE.md`

**Description**: Emoji-based expense and invoice approval workflow system with 7 lanes and 7 approval stages.

**Features**:
- 7 processing lanes (💳 Expense, 🧾 Invoice, 📎 Proof, 👀 Review, ⭕ Approve, 🗂🔐 File/Store, ✅🏁 Verify/Close)
- 7 approval stages per lane
- Visual status indicators (🟢 ok, 🟡 wait, 🔴 stop, ⚪️ empty)
- Complete workflow state machine
- Finance and regulatory compliance tracking

**Use Cases**:
- Employee expense claim processing
- Vendor invoice approval and payment
- Financial document lifecycle management
- Audit trail and compliance reporting

**Status**: Active | **Version**: v134 | **Created**: 2025-12-25

**Coming Next**: v135 - Emoji Ledger + Audit Log chart (7 entries × 7 fields)

---

## 🔍 Usage

Each example includes:
1. **JSON file** - Complete data structure with all fields
2. **Markdown documentation** - Usage guide, implementation details, examples
3. **Schema validation** - Field requirements and data types

## 📖 How to Use These Examples

### For Developers

1. **Reference Implementation**: Use as a template for your service
2. **Schema Validation**: Validate your data against these schemas
3. **Testing**: Use as test fixtures for integration tests

Example:
```bash
# Validate your service beacon against the sample
cat your-beacon.json | jq -s '.[0] as $sample | .[1] | keys == ($sample | keys)'
```

### For Operations

1. **Monitoring Setup**: Configure monitoring based on beacon format
2. **Deployment Tracking**: Set up deployment logs using deploy-log format
3. **Workflow Implementation**: Implement approval workflows using pack examples

### For Documentation

1. **API Specifications**: Reference these examples in API docs
2. **Integration Guides**: Use as examples in integration documentation
3. **Training Materials**: Use for onboarding new team members

## 🛠️ Validation Scripts

Validate examples against schemas:

```bash
# Validate all examples
npm run validate

# Generate new SIG examples
npm run generate:sig
```

## 📦 Creating New Examples

When adding new examples:

1. Create both JSON and Markdown files
2. Follow naming convention: `[type]-[name].json` and `[TYPE]-[NAME].md`
3. Update this README with the new example
4. Add validation tests if applicable
5. Include metadata: version, date, author, purpose

### Example Template Structure

```json
{
  "name": "example-name",
  "version": "v1",
  "description": "Brief description",
  "metadata": {
    "created_date": "YYYY-MM-DD",
    "author": "Team Name",
    "status": "active|deprecated|draft"
  },
  "data": {
    // Example data structure
  }
}
```

## 🔗 Related Resources

- **Service Registry**: `/registry/services.yaml`
- **Templates**: `/templates/`
- **Documentation**: `/docs/`
- **Scripts**: `/scripts/`

## 📝 Version History

| Version | Date | Example | Description |
|---------|------|---------|-------------|
| v134 | 2025-12-25 | Emoji Expense+Invoice Lane | 7-lane × 7-stage approval workflow |
| - | - | SIG Beacon | Health monitoring beacon format |
| - | - | SIG Deploy Log | Deployment tracking format |

## 🤝 Contributing

To add new examples:
1. Create JSON file with complete data structure
2. Create accompanying Markdown documentation
3. Update this README index
4. Submit PR with validation tests
5. Tag with appropriate version number

---

**Maintained by**: BlackRoad OS Infrastructure Team  
**Last Updated**: 2025-12-25  
**License**: MIT
