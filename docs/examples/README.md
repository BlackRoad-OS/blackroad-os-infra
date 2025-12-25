# 📚 Examples Directory

This directory contains example files and filled templates to help you understand how to use BlackRoad OS infrastructure patterns and templates.

## 📋 Available Examples

### Security Reviews

- **[SECURITY_REVIEW_EXAMPLE_v18.md](./SECURITY_REVIEW_EXAMPLE_v18.md)** - Complete example of a security review using the v18 template (7 controls × 7 checks format)
  - Shows how to fill out all sections
  - Demonstrates realistic findings with proper categorization
  - Includes action items and review history

### Signal Beacons

- **[sig.beacon.sample.json](./sig.beacon.sample.json)** - Example signal beacon file structure
- **[sig.deploy-log.sample.json](./sig.deploy-log.sample.json)** - Example deployment log format

## 🎯 How to Use These Examples

### Security Review Template

1. **Copy the template** from `/templates/SECURITY_REVIEW_TEMPLATE.md` to your working location
2. **Review the example** at `SECURITY_REVIEW_EXAMPLE_v18.md` to understand:
   - How to fill out each control section
   - How to document findings with proper detail
   - How to calculate summary statistics
   - How to structure action items
3. **Customize for your needs:**
   - Update the review name and date
   - Complete each of the 7 controls
   - Document all findings (F1-F7)
   - Calculate totals and percentages
   - Get required approvals

### Status Indicators Guide

Use these emoji consistently across all reviews:

- **🟢 Pass** - Requirement fully met, working as expected
- **🟡 Watch** - Partially complete, needs monitoring or minor improvements
- **🔴 Fail** - Not implemented or critical issue identified
- **⚪️ Empty** - Not started, not applicable, or deferred
- **⭕ Pending** - Awaiting review, approval, or action

### Severity Levels

- **Critical (🔴🔴)** - Immediate security risk, blocks deployment
- **High (🟡🟡🟡)** - Significant vulnerability, urgent attention required
- **Medium (🟡🟡)** - Moderate risk, should be addressed soon
- **Low (🟢🟢)** - Minor issue, can be addressed post-deployment

## 📖 Related Documentation

- **Security Review Template**: `/templates/SECURITY_REVIEW_TEMPLATE.md` - Blank template to copy
- **Security Workflows**: `/.github/workflows/security.yml` - Automated security scanning
- **Runbooks**: `/docs/runbooks/` - Incident response and operational procedures

## 🔄 Updating Examples

When creating new examples:

1. Keep them realistic and representative of actual use cases
2. Ensure all fields are properly filled out
3. Add comments or notes explaining non-obvious decisions
4. Update this README to reference the new example
5. Include the example in relevant documentation

## 🤝 Contributing Examples

Have a great example to share? Submit a PR with:

- The example file in this directory
- Update to this README describing the example
- Brief explanation of when to use this pattern
- Any special considerations or gotchas

---

**Maintained By:** BlackRoad OS Infrastructure Team  
**Last Updated:** 2025-12-25
