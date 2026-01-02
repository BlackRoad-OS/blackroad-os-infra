# Templates Directory

This directory contains reusable templates for BlackRoad OS infrastructure and operations.

## Available Templates

### 📋 SERVICE_INFRA_TEMPLATE.md
Template for creating new service infrastructure blueprints.

**Use when**: Adding a new service to BlackRoad OS  
**See also**: `services/` directory for examples

### 🎯 MARKETING_CAMPAIGN_TRACKER.md
Visual tracker template for marketing campaigns with multiple assets across stages.

**Use when**: Planning and tracking marketing campaigns  
**Features**:
- 7-stage workflow tracking (Plan → Draft → Build → Review → Approve → Publish → Report)
- 7 default asset types (customizable)
- Visual status indicators (🟢 Done, 🟡 In Progress, 🔴 Stuck, ⚪️ Empty)
- Quick scanning for blockers and urgent items

**Example**: See `docs/examples/marketing-campaign-example.md` for a complete example

### ⚙️ .env.example
Template for environment variable configuration.

**Use when**: Setting up new services or environments  
**Note**: Never commit actual secrets - use this as a reference only

---

## Usage

1. **Copy the template** to your target location
2. **Customize** the content for your specific use case
3. **Follow** the instructions within each template
4. **Reference** related documentation as needed

---

## Adding New Templates

When adding a new template:

1. Create the template file in this directory
2. Use clear naming: `{PURPOSE}_TEMPLATE.md`
3. Include instructions and examples within the template
4. Update this README with the new template details
5. Add example usage to `docs/examples/` if applicable

---

## Related Directories

- `/services/` - Service infrastructure configurations using SERVICE_INFRA_TEMPLATE
- `/docs/examples/` - Real-world examples of template usage
- `/docs/playbooks/` - Operational playbooks and runbooks
- `.github/ISSUE_TEMPLATE/` - GitHub issue templates

---

**Maintained By**: BlackRoad OS Infrastructure Team  
**Last Updated**: 2025-12-25
