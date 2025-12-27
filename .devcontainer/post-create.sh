#!/bin/bash

echo "🚀 BlackRoad OS Development Environment Setup"
echo "=============================================="

# Update package lists
echo "📦 Updating package lists..."
sudo apt-get update -qq

# Install additional tools
echo "🔧 Installing development tools..."
sudo apt-get install -y -qq \
  jq \
  tree \
  httpie \
  vim \
  ripgrep \
  fd-find

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ]; then
  echo "📦 Installing Node.js dependencies..."
  npm install
fi

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
  echo "🐍 Installing Python dependencies..."
  pip3 install -r requirements.txt
fi

# Setup Git hooks
echo "🪝 Setting up Git hooks..."
mkdir -p .git/hooks
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# BlackRoad OS Pre-commit Hook

echo "🔍 Running pre-commit checks..."

# Check for secrets
if git diff --cached --name-only | xargs grep -i "api[_-]key\|secret\|password\|token" 2>/dev/null; then
  echo "❌ WARNING: Potential secrets detected!"
  echo "   Please remove secrets before committing."
  exit 1
fi

# Run linters if they exist
if [ -f "package.json" ]; then
  if command -v npm &> /dev/null; then
    npm run lint --if-present || true
  fi
fi

echo "✅ Pre-commit checks passed!"
EOF

chmod +x .git/hooks/pre-commit

# Create helpful aliases
echo "⚡ Setting up helpful aliases..."
cat >> ~/.bashrc << 'EOF'

# BlackRoad OS Aliases
alias gs='git status'
alias gp='git pull'
alias gpo='git push'
alias gc='git commit -m'
alias gco='git checkout'
alias gl='git log --oneline --graph --decorate'

# GitHub CLI shortcuts
alias prs='gh pr list'
alias issues='gh issue list'
alias create-pr='gh pr create'
alias create-issue='gh issue create'

# Quick actions
alias health='gh run list --workflow=realtime-command-center.yml --limit 1'
alias triggers='gh run list --workflow=smart-triggers-system.yml --limit 1'
alias agents='gh workflow list | grep agent'

# Development
alias dev='npm run dev'
alias test='npm test'
alias build='npm run build'

echo "🚀 BlackRoad OS development environment loaded!"
echo "   Type 'help-blackroad' for available commands"
EOF

# Create help command
cat >> ~/.bashrc << 'EOF'
help-blackroad() {
  echo "🚀 BlackRoad OS Development Commands"
  echo "===================================="
  echo ""
  echo "Git Shortcuts:"
  echo "  gs           - git status"
  echo "  gp           - git pull"
  echo "  gpo          - git push"
  echo "  gc 'message' - git commit"
  echo "  gco branch   - git checkout"
  echo "  gl           - git log (pretty)"
  echo ""
  echo "GitHub CLI:"
  echo "  prs          - list pull requests"
  echo "  issues       - list issues"
  echo "  create-pr    - create new PR"
  echo "  create-issue - create new issue"
  echo ""
  echo "Workflows:"
  echo "  health       - check system health"
  echo "  triggers     - view smart triggers"
  echo "  agents       - list agent workflows"
  echo ""
  echo "Development:"
  echo "  dev          - start dev server"
  echo "  test         - run tests"
  echo "  build        - build project"
}
EOF

# Load the new configuration
source ~/.bashrc

# Display welcome message
echo ""
echo "=============================================="
echo "✅ BlackRoad OS Development Environment Ready!"
echo "=============================================="
echo ""
echo "🎯 Quick Start:"
echo "   1. Type 'help-blackroad' for available commands"
echo "   2. Type 'health' to check system health"
echo "   3. Type 'prs' to see open pull requests"
echo ""
echo "🤖 AI Agents Available:"
echo "   - Claude (Architect)"
echo "   - Felix (Auto-Fixer)"
echo "   - Ruby (Code Reviewer)"
echo "   - Winston (Refactorer)"
echo "   - Cadillac (Optimizer)"
echo "   - Silas (Guardian)"
echo "   - Codex (Innovator)"
echo "   - Ophelia (Poet)"
echo "   - And more!"
echo ""
echo "🚀 Happy coding!"
echo ""
