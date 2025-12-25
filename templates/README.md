# Templates

This directory contains reusable templates for various infrastructure and project management tasks.

## Available Templates

### 🧬 Service Infrastructure Template
**File**: [`SERVICE_INFRA_TEMPLATE.md`](./SERVICE_INFRA_TEMPLATE.md)

Use this template when adding a new service to the BlackRoad OS ecosystem. It provides a complete blueprint for:
- Service configuration across environments (local, staging, production)
- Environment variables and dependencies
- Resource requirements
- Health checks and monitoring
- Complete service onboarding checklist

**When to use**: Creating a new microservice, API, worker, or any deployable service component.

### 🎯 Sprint Tracking Template
**File**: [`SPRINT_TRACKING_TEMPLATE.md`](./SPRINT_TRACKING_TEMPLATE.md)

ASCII art sprint board for tracking 7 stories across 7 stages of development. Features:
- Visual progress indicators (🟢 done, 🟡 in progress, 🔴 blocked, ⚪️ empty)
- Customizable stage labels (default: Backlog → Ready → Build → Review → Test → Ship → Done)
- Sprint metadata (name, dates, status)
- Flexible for different team sizes and workflows

**When to use**: 
- Engineering sprints
- Feature development tracking
- Project milestone visualization
- Team stand-ups and retrospectives

**Quick create**: Use the [GitHub Issue Template](./.github/ISSUE_TEMPLATE/sprint.yml) to create a sprint tracking issue.

### 📝 Environment Variables Template
**File**: [`.env.example`](./.env.example)

Standard environment variables template for BlackRoad OS services and infrastructure.

**When to use**: Setting up local development or configuring new environments.

## Using Templates

### For Service Templates
1. Copy the template file to your target location
2. Replace all placeholder values (marked with `{PLACEHOLDER}`)
3. Customize sections to match your specific needs
4. Remove any sections that don't apply
5. Follow the included checklists for completeness

### For Sprint Tracking
**Option 1: As a Markdown File**
1. Copy `SPRINT_TRACKING_TEMPLATE.md` to your project
2. Rename with sprint identifier (e.g., `SPRINT_2025_Q1_W3.md`)
3. Fill in sprint details and story names
4. Update progress indicators daily

**Option 2: As a GitHub Issue**
1. Go to GitHub → Issues → New Issue
2. Select "🧩 Sprint Tracking" template
3. Fill in the form fields
4. Update the issue body as sprint progresses

## Contributing New Templates

When adding a new template to this directory:

1. **Create the template file** with clear placeholder markers
2. **Add comprehensive documentation** within the template
3. **Include usage instructions** and examples
4. **Update this README** with the new template details
5. **Consider adding a GitHub Issue Template** if applicable (in `.github/ISSUE_TEMPLATE/`)
6. **Test the template** by following your own instructions

### Template Naming Convention
- Use `UPPERCASE_WITH_UNDERSCORES` for template names
- End with `_TEMPLATE` suffix for clarity
- Use `.md` extension for markdown templates
- Examples: `SERVICE_INFRA_TEMPLATE.md`, `SPRINT_TRACKING_TEMPLATE.md`

### Template Structure Guidelines
- Start with a clear title and description
- Include a "How to Use" section
- Provide examples where helpful
- Use consistent formatting and emoji conventions
- Add version information and last updated date

## Template Maintenance

- **Review quarterly**: Ensure templates reflect current best practices
- **Version templates**: Include version numbers in templates that may evolve
- **Deprecate old templates**: Move to an `archive/` subdirectory if replaced
- **User feedback**: Improve templates based on actual usage feedback

## Related Documentation

- [Service Onboarding Guide](../docs/DEVELOPER_ONBOARDING.md)
- [GitHub Issue Templates](../.github/ISSUE_TEMPLATE/)
- [Infrastructure Overview](../docs/INFRA_OVERVIEW.md)

---

**Last Updated**: 2025-12-25
**Maintained By**: Platform Team
