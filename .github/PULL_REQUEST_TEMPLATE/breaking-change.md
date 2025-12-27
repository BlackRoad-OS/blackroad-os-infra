# 💥 Breaking Change PR

## ⚠️ WARNING: This PR contains breaking changes!

## What's Breaking
<!-- Describe what will break -->


## Related Issue
Closes #

## Why This Breaking Change?
<!-- Justify why breaking is necessary -->


## Impact Analysis
<!-- Who/what is affected? -->
- **Affected users:** (All users / Specific API consumers / Internal only)
- **Affected systems:** (List systems/services impacted)
- **Estimated migration effort:** (Low / Medium / High)

## Changes Made
<!-- List the breaking changes -->
-
-
-

## Before/After Comparison

### Before (old API/behavior)
```typescript
// Example of old code
oldFunction({ param: value });
```

### After (new API/behavior)
```typescript
// Example of new code
newFunction({ newParam: value });
```

## Migration Guide

### For Users
**Step 1:** Update dependency
```bash
npm install package@2.0.0
```

**Step 2:** Update code
```typescript
// Old code
const result = oldFunction(arg);

// New code
const result = newFunction(arg, newRequiredParam);
```

**Step 3:** Test
```bash
npm test
```

### For Internal Systems
<!-- List internal changes needed -->
- [ ] Update service A
- [ ] Update service B
- [ ] Update documentation
- [ ] Update examples

## Deprecation Path
<!-- Was anything deprecated first? -->
- [ ] No deprecation (immediate breaking change)
- [ ] Deprecated in version: vX.X.X
- [ ] Removal planned for: vX.X.X
- [ ] Deprecation warnings added

## Version Bump
<!-- What version change is needed? -->
- [ ] Major version bump (X.0.0)
- [ ] Minor version bump (0.X.0) - if backward compatible mode exists
- [ ] Patch version (0.0.X) - NOT appropriate for breaking changes

**Old version:** vX.X.X
**New version:** vX.X.X

## Rollback Plan
<!-- How to rollback if issues found? -->
1. Revert to previous version
2. Restore old configuration
3. Communication plan for affected users

## Testing Done
- [ ] Tested migration path
- [ ] Verified old code breaks as expected
- [ ] Verified new code works
- [ ] Tested in staging environment
- [ ] Created migration test suite

## Documentation
- [ ] Migration guide written
- [ ] CHANGELOG.md updated with BREAKING CHANGE
- [ ] README updated
- [ ] API docs updated
- [ ] Blog post/announcement drafted

## Communication Plan
- [ ] Email to affected users
- [ ] Slack/Discord announcement
- [ ] GitHub release notes
- [ ] Documentation site banner
- [ ] Social media announcement

## Checklist
- [ ] Breaking changes clearly documented
- [ ] Migration guide is comprehensive
- [ ] Version bump is correct (major)
- [ ] All tests updated for new behavior
- [ ] Deprecation warnings added (if applicable)
- [ ] Communication plan ready
- [ ] Rollback plan documented

---
**Auto-Review:** Claude will review this breaking change!
- 🏗️ Architecture impact assessment
- 📚 Migration guide completeness check
- ⚠️ Risk analysis
- 💎 Ruby provides code quality review
- 📊 Impact assessment verification
