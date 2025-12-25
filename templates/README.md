# BlackRoad OS Templates

This directory contains reusable templates for infrastructure, documentation, and project management.

## 📋 Available Templates

### Project Management

#### 🧾 [GIANT_TEMPLATE_V2.md](GIANT_TEMPLATE_V2.md)
**Visual project tracking template for large epics and cross-team initiatives**

A comprehensive template with emoji-based progress tracking across three phases:
- **PLAN**: Scope, Docs, Data, Access, Decision, Risk, Target (7 rows)
- **DO**: Build, Tools, Tests, Review, Comms, Issues, Output (7 rows)  
- **SHIP**: Deploy, Monitor, Signal, Status, Finish, Celebrate, Done (7 rows)
- **BONUS**: Pod tracking for multi-team coordination

**When to use:**
- Large projects spanning multiple sprints
- Cross-team initiatives requiring coordination
- Epics needing visual progress tracking
- Projects with complex planning, execution, and shipping phases

**Features:**
- Visual emoji-based progress indicators (🟢🟡🔴⚪️)
- 7 progress steps per work stream (1️⃣-7️⃣)
- Status flags and notes support (🚦, 😭, 🎯)
- Multi-team pod tracking with 5 phase indicators per pod
- At-a-glance status without reading details

**GitHub Integration:**
- Available as issue template: `.github/ISSUE_TEMPLATE/giant-template-v2.yml`
- Also in scripts template version: `.github/ISSUE_TEMPLATE/giant_template_v2.md`

---

### Infrastructure

#### 🏗️ [SERVICE_INFRA_TEMPLATE.md](SERVICE_INFRA_TEMPLATE.md)
**Template for adding new services to the BlackRoad OS ecosystem**

Use this when creating a new microservice, worker, website, or console.

**Includes:**
- Service overview and metadata
- Deployment configuration (local, staging, prod)
- Environment variables specification
- DNS and routing setup
- Health checks and monitoring
- Dependencies and integrations

---

### Environment Configuration

#### ⚙️ [.env.example](.env.example)
**Template for environment variable configuration**

Copy this to create `.env` files for local development. Never commit actual `.env` files.

---

## 📁 Template Categories

### By Purpose
- **Project Tracking**: GIANT_TEMPLATE_V2.md
- **Infrastructure**: SERVICE_INFRA_TEMPLATE.md, .env.example
- **Documentation**: (see `/scripts/templates/` for doc templates)

### By Use Case
- **Starting a new epic**: GIANT_TEMPLATE_V2.md
- **Adding a new service**: SERVICE_INFRA_TEMPLATE.md
- **Setting up environment**: .env.example

---

## 🚀 Quick Start

### Using GIANT TEMPLATE v2

**Option 1: Create a GitHub Issue**
1. Go to Issues → New Issue
2. Select "📋 Giant Template v2" from templates
3. Fill in project details
4. Update progress indicators as work progresses

**Option 2: Copy Markdown**
1. Copy content from `GIANT_TEMPLATE_V2.md`
2. Paste into your issue, doc, or tracking system
3. Update emoji indicators: ⚪️ → 🟢/🟡/🔴
4. Add status flags as needed (🚦🟡, 😭, etc.)

**Option 3: Use in Comments**
- Copy relevant sections for status updates
- Update progress in issue comments
- Great for weekly/sprint updates

### Using Service Infra Template

```bash
# Copy template for new service
cp templates/SERVICE_INFRA_TEMPLATE.md services/{new-service}/infra.yml

# Fill in the placeholders
# Update service-specific configuration
# Add to git and commit
```

---

## 📝 Template Guidelines

### Creating New Templates

When adding templates to this directory:

1. **Use clear naming**: Descriptive names that indicate purpose
2. **Add documentation**: Include usage instructions inline or in this README
3. **Follow conventions**: Match existing template structure and style
4. **Make it generic**: Remove project-specific details
5. **Add examples**: Show how to use the template with examples

### Template Best Practices

- ✅ Keep templates focused on a single purpose
- ✅ Use placeholders like `{SERVICE_NAME}` for customization
- ✅ Include inline comments and instructions
- ✅ Provide examples of completed templates
- ✅ Document required vs optional sections
- ❌ Don't include secrets or sensitive data
- ❌ Don't make templates too prescriptive
- ❌ Don't forget to update this README when adding templates

---

## 🔗 Related Resources

### Other Template Locations

- **GitHub Issue Templates**: `/.github/ISSUE_TEMPLATE/`
  - bug.yml - Bug reports
  - task.yml - Standard work items
  - agent-task.yml - Agent-specific tasks
  - giant-template-v2.yml - Giant template (GitHub version)

- **Scripts Templates**: `/scripts/templates/`
  - ARCHIVED.md - Template for archived projects
  - RESEARCH_BANNER.md - Research project banner
  - .github/ - Template GitHub configurations

### Documentation

- [Repository Structure](../README.md#-repository-structure)
- [Service Registry](../registry/services.yaml)
- [Adding New Services](../README.md#-adding-a-new-service)

---

## 📞 Support

Questions about templates?
- Open an issue in this repository
- Check existing issues with label `documentation`
- Refer to [REPO_CHARTER.md](../REPO_CHARTER.md) for overall guidelines

---

**Last Updated**: 2025-12-25  
**Maintained By**: BlackRoad OS Infrastructure Team
