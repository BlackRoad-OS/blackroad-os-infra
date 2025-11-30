#!/bin/bash
# BlackRoad OS - Service Smoke Tests
# Usage: ./smoke-test.sh [service] [url]
#
# Examples:
#   ./smoke-test.sh operator http://localhost:8000
#   ./smoke-test.sh api https://api.blackroad.io
#   ./smoke-test.sh all http://localhost

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log_pass() { echo -e "${GREEN}[PASS]${NC} $1"; }
log_fail() { echo -e "${RED}[FAIL]${NC} $1"; FAILURES=$((FAILURES + 1)); }
log_skip() { echo -e "${YELLOW}[SKIP]${NC} $1"; }
log_info() { echo -e "${CYAN}[INFO]${NC} $1"; }

FAILURES=0

# Test a health endpoint
test_health() {
    local name=$1
    local url=$2
    local expected=${3:-"ok\|healthy"}

    log_info "Testing $name at $url"

    response=$(curl -sf --max-time 10 "$url" 2>/dev/null) || {
        log_fail "$name - connection failed"
        return 1
    }

    if echo "$response" | grep -qi "$expected"; then
        log_pass "$name - health OK"
        return 0
    else
        log_fail "$name - unexpected response: $response"
        return 1
    fi
}

# Test operator-specific endpoints
test_operator() {
    local base_url=$1

    echo ""
    echo "=== Operator Tests ==="

    test_health "Operator Health" "$base_url/health"

    # Test agents endpoint
    response=$(curl -sf "$base_url/api/agents" 2>/dev/null) || {
        log_fail "Agents list - connection failed"
        return
    }

    if echo "$response" | grep -q '\['; then
        log_pass "Agents list - returns array"
    else
        log_fail "Agents list - invalid response"
    fi

    # Test online agents
    response=$(curl -sf "$base_url/api/agents/online" 2>/dev/null) || {
        log_fail "Online agents - connection failed"
        return
    }
    log_pass "Online agents endpoint"
}

# Test API service
test_api() {
    local base_url=$1

    echo ""
    echo "=== API Tests ==="

    test_health "API Health" "$base_url/health"

    # Test root
    response=$(curl -sf "$base_url/" 2>/dev/null) || {
        log_skip "API root - connection failed"
        return
    }
    log_pass "API root endpoint"
}

# Test web/frontend
test_web() {
    local base_url=$1

    echo ""
    echo "=== Web Tests ==="

    response=$(curl -sf --max-time 10 "$base_url" 2>/dev/null) || {
        log_fail "Web - connection failed"
        return
    }

    if echo "$response" | grep -qi "html"; then
        log_pass "Web - returns HTML"
    else
        log_fail "Web - not HTML response"
    fi
}

# Test Prism Console
test_prism() {
    local base_url=$1

    echo ""
    echo "=== Prism Console Tests ==="

    test_health "Prism Health" "$base_url/api/health"
}

# Test docs site
test_docs() {
    local base_url=$1

    echo ""
    echo "=== Docs Tests ==="

    response=$(curl -sf --max-time 10 "$base_url" 2>/dev/null) || {
        log_fail "Docs - connection failed"
        return
    }

    if echo "$response" | grep -qi "html\|docusaurus"; then
        log_pass "Docs - returns content"
    else
        log_fail "Docs - invalid response"
    fi
}

# Main
SERVICE=${1:-all}
BASE_URL=${2:-http://localhost}

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${NC}     ${GREEN}BlackRoad OS - Smoke Tests${NC}                              ${CYAN}║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Service: $SERVICE"
echo "Base URL: $BASE_URL"

case $SERVICE in
    operator)
        test_operator "$BASE_URL"
        ;;
    api)
        test_api "$BASE_URL"
        ;;
    web)
        test_web "$BASE_URL"
        ;;
    prism)
        test_prism "$BASE_URL"
        ;;
    docs)
        test_docs "$BASE_URL"
        ;;
    all)
        # Assume standard ports for local testing
        test_operator "${BASE_URL}:8000"
        test_api "${BASE_URL}:8080"
        test_web "${BASE_URL}:3000"
        test_prism "${BASE_URL}:3001"
        test_docs "${BASE_URL}:3002"
        ;;
    *)
        echo "Unknown service: $SERVICE"
        echo "Usage: $0 [operator|api|web|prism|docs|all] [base_url]"
        exit 1
        ;;
esac

echo ""
echo "================================"
if [ $FAILURES -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}$FAILURES test(s) failed${NC}"
    exit 1
fi
