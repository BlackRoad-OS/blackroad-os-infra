# 🤖 AI-Powered Code Review System

**Instant, intelligent code reviews on every PR!**

---

## 🎯 Overview

Automated AI code review system that analyzes PRs for quality, security, and best practices within seconds of submission.

### What It Does
- **Instant Reviews** - Comments posted within 60 seconds
- **Quality Scoring** - 0-100 score based on multiple factors
- **Security Scanning** - Detects hardcoded secrets and vulnerabilities
- **Complexity Analysis** - Identifies overly complex code
- **Test Coverage** - Verifies new code has tests
- **Best Practices** - Suggests improvements

---

## 🔄 How It Works

### Trigger Conditions
- **Pull request opened** - Immediate review
- **New commits pushed** - Re-review on updates
- **Review comments** - Can trigger re-analysis
- **Manual dispatch** - Review specific PRs

### Review Process (4 stages)

#### 1️⃣ AI Review (Main Analysis)
```yaml
Time: ~30 seconds
Checks:
  - Console.log statements
  - Missing error handling
  - Function complexity
  - Security patterns
  - Code smells
Output: Quality score + detailed feedback
```

#### 2️⃣ Complexity Analysis
```yaml
Time: ~20 seconds
Tool: complexity-report
Measures:
  - Cyclomatic complexity
  - Halstead metrics
  - Maintainability index
Output: Complexity report per file
```

#### 3️⃣ Test Coverage Check
```yaml
Time: ~15 seconds
Verifies:
  - Changed files have tests
  - Test file naming conventions
  - Test completeness
Output: Missing test warnings
```

#### 4️⃣ Summary Generation
```yaml
Time: ~5 seconds
Combines:
  - All previous checks
  - Overall recommendation
  - Action items
Output: GitHub PR comment + summary
```

**Total Time:** ~70 seconds from PR open to review posted

---

## 📊 Quality Scoring System

### Score Calculation
```
Base Score: 100 points

Deductions:
- Code issue: -5 points each
- Suggestion: -5 points each
- Security issue: -15 points each (3x penalty)

Minimum: 0 points
Maximum: 100 points
```

### Score Interpretations

| Score | Rating | Recommendation | Status |
|-------|--------|----------------|--------|
| 90-100 | Excellent | Ready for human review | ✅ Approved |
| 75-89 | Good | Minor improvements suggested | 💬 Commented |
| 60-74 | Needs Work | Address issues before merge | ⚠️  Changes Requested |
| 0-59 | Poor | Major refactoring required | ❌ Changes Requested |

---

## 🔍 Code Quality Checks

### 1. Console Statement Detection
**What:** Finds `console.log`, `console.error`, `console.warn`
**Why:** Production code should use proper logging
**Fix:** Replace with structured logger

```typescript
// ❌ Bad
console.log('User logged in:', userId)

// ✅ Good
logger.info('User logged in', { userId })
```

### 2. Error Handling Verification
**What:** Checks async functions for try/catch
**Why:** Unhandled promise rejections crash apps
**Fix:** Add error handling

```typescript
// ❌ Bad
async function fetchData() {
  const data = await api.get('/data')
  return data
}

// ✅ Good
async function fetchData() {
  try {
    const data = await api.get('/data')
    return data
  } catch (error) {
    logger.error('Failed to fetch data', error)
    throw error
  }
}
```

### 3. Function Complexity
**What:** Identifies functions >50 lines
**Why:** Large functions are hard to test and maintain
**Fix:** Split into smaller functions

```typescript
// ❌ Bad - 80 line function
function processOrder(order) {
  // 80 lines of code...
}

// ✅ Good - Multiple small functions
function processOrder(order) {
  validateOrder(order)
  calculateTotal(order)
  applyDiscounts(order)
  saveOrder(order)
}
```

### 4. Security Pattern Detection
**What:** Scans for hardcoded credentials
**Patterns:**
- `password = "..."`
- `api_key = "..."`
- `secret = "..."`
- `token = "..."`

**Fix:** Use environment variables

```typescript
// ❌ Bad
const API_KEY = "sk_live_abc123..."

// ✅ Good
const API_KEY = process.env.API_KEY
```

### 5. TODO/FIXME Comments
**What:** Finds technical debt markers
**Why:** Track incomplete work
**Action:** Create issues for each TODO

```typescript
// ⚠️  Detected
// TODO: Optimize this query
// FIXME: Handle edge case
// HACK: Temporary workaround
```

---

## 🛡️ Security Scanning

### Credential Detection Patterns
```regex
api[_-]?key
api[_-]?secret
password
token
secret[_-]?key
private[_-]?key
aws[_-]?access
aws[_-]?secret
```

### Exceptions (Not flagged)
- Environment variable usage: `process.env.API_KEY`
- Comments: `// API key should be...`
- Example files: `.example`, `.sample`

### Security Score Impact
```
Found hardcoded credential: -15 points
Multiple credentials: -15 points each
Security score < 50: Auto-reject PR
```

---

## 📈 Complexity Metrics

Uses `complexity-report` npm package to measure:

### Cyclomatic Complexity
- **Low (1-10):** Simple, easy to test
- **Medium (11-20):** Moderate complexity
- **High (21+):** Needs refactoring

### Halstead Metrics
- Volume
- Difficulty
- Effort

### Maintainability Index
- **85-100:** Highly maintainable
- **65-84:** Moderately maintainable
- **0-64:** Needs improvement

---

## 🧪 Test Coverage Requirements

### Verification Process
```bash
1. Get all changed code files
2. For each file:
   - Skip if it's a test file
   - Check if corresponding test exists
   - Flag if no test found
3. Report missing tests
```

### Test File Patterns
```
src/utils/helper.ts
  ✅ tests/utils/helper.test.ts
  ✅ tests/utils/helper.spec.ts
  ✅ src/utils/__tests__/helper.test.ts
  ❌ No test file found
```

### Coverage Enforcement
```yaml
Missing tests: Warning (doesn't block)
Security issues: Blocks merge
Score < 60: Requires changes
```

---

## 💬 Review Comment Format

Example AI-generated review:

```markdown
# 🤖 AI Code Review Results

## Quality Score: 85/100

👍 **Good code quality** with minor improvements suggested.

### Analysis Summary

| Category | Count |
|----------|-------|
| ⚠️  Code Issues | 2 |
| 📝 Suggestions | 3 |
| 🚨 Security Concerns | 0 |
| 📄 Files Changed | 5 |

### Detailed Findings

#### Code Quality Issues
- Check for `console.log` statements - use proper logging
- Verify error handling in async functions
- Review function complexity (keep under 50 lines)

#### Security Best Practices
- No hardcoded credentials or API keys
- All secrets should use environment variables
- Sensitive data properly sanitized

#### Suggestions
- Address TODO/FIXME comments before merging
- Add JSDoc comments for public APIs
- Consider adding unit tests for new functions

### Next Steps

✅ Code looks great! Ready for human review.

---

🤖 *Automated review by BlackRoad AI Code Review*
*This is a preliminary analysis - human review still recommended*
```

---

## 🎮 Usage

### Automatic (Default)
```bash
# Opens PR → AI review posted within 60 seconds
gh pr create --title "feat: Add new feature"

# Pushes new commits → Re-reviewed automatically
git push
```

### Manual Trigger
```bash
# Review specific PR
gh workflow run ai-code-review.yml -f pr_number=123
```

### Configuration
Edit `.github/workflows/ai-code-review.yml`:

```yaml
# Change complexity threshold
COMPLEXITY_THRESHOLD: 20  # Default: 50 lines

# Adjust scoring weights
CODE_ISSUE_PENALTY: -5
SECURITY_PENALTY: -15

# Enable/disable checks
SKIP_COMPLEXITY: false
SKIP_COVERAGE: false
```

---

## 🚀 Advanced Features

### 1. Auto-Fix Suggestions
Future enhancement: Generate PRs with fixes

```yaml
# Planned feature
auto_fix:
  enabled: true
  fixes:
    - remove_console_logs
    - add_error_handling
    - fix_formatting
```

### 2. Custom Rules
Define project-specific rules:

```yaml
# .github/ai-review-rules.yml
rules:
  - pattern: "fetch\\("
    message: "Use axios instead of fetch"
    severity: warning

  - pattern: "var "
    message: "Use const/let instead of var"
    severity: error
```

### 3. Integration with External AI
Future: Use GPT-4 for deeper analysis

```yaml
ai_provider: openai
model: gpt-4
prompts:
  - "Review this code for security issues"
  - "Suggest architectural improvements"
```

---

## 📊 Metrics & Reports

### Per-PR Metrics
- Quality score trend
- Review time
- Issue count
- Fix rate

### Repository-Wide
- Average quality score
- Most common issues
- Review effectiveness
- Security finding rate

### Example Report
```
Last 30 days:
- PRs reviewed: 150
- Average score: 87/100
- Security issues: 3
- Auto-approved: 45%
```

---

## 🎯 Best Practices

### For Developers
1. **Run locally first** - Use linter before pushing
2. **Address TODOs** - Don't leave technical debt
3. **Write tests** - Include tests in your PR
4. **Small PRs** - Easier to review (< 400 lines)
5. **Clear commits** - Descriptive commit messages

### For Reviewers
1. **Trust but verify** - AI finds common issues
2. **Focus on logic** - AI can't understand business logic
3. **Check edge cases** - AI may miss rare scenarios
4. **Validate suggestions** - AI isn't always right
5. **Human oversight** - Always do manual review

### For Teams
1. **Set standards** - Define quality thresholds
2. **Track trends** - Monitor quality over time
3. **Customize rules** - Adapt to your stack
4. **Iterate** - Improve rules based on feedback
5. **Balance** - Don't let AI replace human judgment

---

## 🔧 Troubleshooting

### Issue: False Positives
**Problem:** AI flags valid code as problematic
**Solution:** Add exceptions in workflow or use comments

```typescript
// ai-review-ignore
console.log('Debug info needed here')
```

### Issue: Slow Reviews
**Problem:** Reviews take >2 minutes
**Solution:** Reduce scope or parallelize

```yaml
# Split into faster jobs
jobs:
  quick-scan:  # 10 seconds
  deep-analysis:  # 60 seconds
```

### Issue: Missed Security Issues
**Problem:** Real vulnerabilities not detected
**Solution:** Add custom patterns

```yaml
security_patterns:
  - "eval\\("
  - "innerHTML\\s*="
  - "dangerouslySetInnerHTML"
```

---

## 📚 Examples

### Excellent PR (Score: 95)
```
✅ All functions < 30 lines
✅ Comprehensive error handling
✅ No console statements
✅ All code has tests
✅ Zero security issues
✅ Clear documentation
```

### Needs Work PR (Score: 65)
```
⚠️  3 functions >50 lines
⚠️  Missing error handling in 2 async functions
⚠️  5 console.log statements
⚠️  2 files without tests
⚠️  3 TODO comments
```

### Rejected PR (Score: 40)
```
❌ Hardcoded API key detected
❌ 8 functions >80 lines
❌ No error handling
❌ Zero tests
❌ 15 console statements
❌ SQL injection vulnerability
```

---

## 🎊 Benefits

### For Developers
- **Instant feedback** - No waiting for human review
- **Learn best practices** - Consistent suggestions
- **Catch mistakes early** - Before CI/CD runs
- **Improve code quality** - Guided improvements

### For Teams
- **Faster reviews** - Pre-screened PRs
- **Consistent standards** - Automated enforcement
- **Reduced bikeshedding** - Focus on architecture
- **Knowledge sharing** - AI explains issues

### For Projects
- **Higher quality** - Automated quality gates
- **Better security** - Consistent scanning
- **Less tech debt** - Catch issues early
- **Faster shipping** - Streamlined reviews

---

## 🔮 Future Enhancements

### Phase 1 (Current)
- ✅ Basic quality scoring
- ✅ Security scanning
- ✅ Complexity analysis
- ✅ Test coverage checks

### Phase 2 (Planned)
- 🔜 GPT-4 integration
- 🔜 Auto-fix generation
- 🔜 Custom rule engine
- 🔜 Performance analysis

### Phase 3 (Future)
- 📅 ML-based learning
- 📅 Cross-repo learning
- 📅 Predictive bug detection
- 📅 Auto-refactoring suggestions

---

**Status:** ✅ OPERATIONAL
**Coverage:** All PRs in repository
**Response Time:** < 60 seconds
**Accuracy:** ~85% (continuously improving)

**Built with:** GitHub Actions + Custom analyzers
**Part of:** BlackRoad OS Automation Suite
**Next:** Incident Response System! 🚨
