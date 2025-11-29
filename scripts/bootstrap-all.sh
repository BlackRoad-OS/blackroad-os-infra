#!/bin/bash
# BlackRoad Org Bootstrap - Full Repo List
# Usage: ./bootstrap-all.sh [--dry-run]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DRY_RUN="${1:-}"

if [ "$DRY_RUN" == "--dry-run" ]; then
  echo "=== DRY RUN MODE ==="
  echo ""
fi

# ============================================================
# BlackRoad-OS: Active repos (full setup)
# ============================================================
BLACKROAD_OS_CORE=(
  "BlackRoad-OS/blackroad-os-core"
  "BlackRoad-OS/blackroad-os-api"
  "BlackRoad-OS/blackroad-os-api-gateway"
  "BlackRoad-OS/blackroad-os-operator"
  "BlackRoad-OS/blackroad-os-infra"
)

BLACKROAD_OS_FRONTEND=(
  "BlackRoad-OS/blackroad-os-web"
  "BlackRoad-OS/blackroad-os-home"
  "BlackRoad-OS/blackroad-os-prism-console"
  "BlackRoad-OS/blackroad-os-demo"
)

BLACKROAD_OS_META=(
  "BlackRoad-OS/blackroad"
  "BlackRoad-OS/blackroad-os"
  "BlackRoad-OS/blackroad-os-master"
  "BlackRoad-OS/blackroad-os-research"
  "BlackRoad-OS/blackroad-os-archive"
  "BlackRoad-OS/blackroad-os-beacon"
  "BlackRoad-OS/blackroad-os-brand"
  "BlackRoad-OS/blackroad-os-docs"
  "BlackRoad-OS/blackroad-os-ideas"
)

BLACKROAD_OS_AGENTS=(
  "BlackRoad-OS/blackroad-os-agents"
)

BLACKROAD_OS_PACKS=(
  "BlackRoad-OS/blackroad-os-pack-creator-studio"
  "BlackRoad-OS/blackroad-os-pack-education"
  "BlackRoad-OS/blackroad-os-pack-finance"
  "BlackRoad-OS/blackroad-os-pack-infra-devops"
  "BlackRoad-OS/blackroad-os-pack-legal"
  "BlackRoad-OS/blackroad-os-pack-research-lab"
)

# ============================================================
# BlackRoad-AI: Business shell repos
# ============================================================
BLACKROAD_AI=(
  "BlackRoad-AI/BlackRoad.io"
  "BlackRoad-AI/blackroad-plans"
  "BlackRoad-AI/urban-goggles"
)

# ============================================================
# blackboxprogramming: Legacy repos (archive notice)
# ============================================================
LEGACY_REPOS=(
  "blackboxprogramming/blackboxprogramming"
  "blackboxprogramming/blackroad"
  "blackboxprogramming/blackroad-api"
  "blackboxprogramming/BlackRoad-Operating-System"
  "blackboxprogramming/blackroad-operator"
  "blackboxprogramming/BLACKROAD-OS-MASTER"
  "blackboxprogramming/blackroad-prism-console"
  "blackboxprogramming/blackroad.io"
  "blackboxprogramming/blackroadinc.us"
  "blackboxprogramming/Holiday-Activity"
  "blackboxprogramming/next-video-starter"
  "blackboxprogramming/nextjs-ai-chatbot"
  "blackboxprogramming/my-repository"
  "blackboxprogramming/My-project--1-"
  "blackboxprogramming/untitled-folder"
  "blackboxprogramming/Chit-Chat-Cadillac"
  "blackboxprogramming/new_world"
  "blackboxprogramming/remember"
)

# ============================================================
# blackboxprogramming: Research/lab repos (research banner)
# ============================================================
RESEARCH_REPOS=(
  "blackboxprogramming/lucidia"
  "blackboxprogramming/lucidia-lab"
  "blackboxprogramming/quantum-math-lab"
  "blackboxprogramming/universal-computer"
  "blackboxprogramming/native-ai-quantum-energy"
  "blackboxprogramming/codex-agent-runner"
  "blackboxprogramming/codex-infinity"
  "blackboxprogramming/BlackStream"
)

# ============================================================
# Counts
# ============================================================
TOTAL_ACTIVE=$((${#BLACKROAD_OS_CORE[@]} + ${#BLACKROAD_OS_FRONTEND[@]} + ${#BLACKROAD_OS_META[@]} + ${#BLACKROAD_OS_AGENTS[@]} + ${#BLACKROAD_OS_PACKS[@]} + ${#BLACKROAD_AI[@]}))
TOTAL_LEGACY=${#LEGACY_REPOS[@]}
TOTAL_RESEARCH=${#RESEARCH_REPOS[@]}

echo "=== BlackRoad Org Bootstrap ==="
echo ""
echo "Repos to process:"
echo "  - BlackRoad-OS core:     ${#BLACKROAD_OS_CORE[@]}"
echo "  - BlackRoad-OS frontend: ${#BLACKROAD_OS_FRONTEND[@]}"
echo "  - BlackRoad-OS meta:     ${#BLACKROAD_OS_META[@]}"
echo "  - BlackRoad-OS agents:   ${#BLACKROAD_OS_AGENTS[@]}"
echo "  - BlackRoad-OS packs:    ${#BLACKROAD_OS_PACKS[@]}"
echo "  - BlackRoad-AI:          ${#BLACKROAD_AI[@]}"
echo "  - Legacy (archive):      $TOTAL_LEGACY"
echo "  - Research (banner):     $TOTAL_RESEARCH"
echo "  ─────────────────────────"
echo "  Total:                   $((TOTAL_ACTIVE + TOTAL_LEGACY + TOTAL_RESEARCH))"
echo ""

if [ "$DRY_RUN" == "--dry-run" ]; then
  echo "Would process these repos:"
  echo ""
  echo "=== Active (full setup) ==="
  for repo in "${BLACKROAD_OS_CORE[@]}" "${BLACKROAD_OS_FRONTEND[@]}" "${BLACKROAD_OS_META[@]}" "${BLACKROAD_OS_AGENTS[@]}" "${BLACKROAD_OS_PACKS[@]}" "${BLACKROAD_AI[@]}"; do
    echo "  $repo"
  done
  echo ""
  echo "=== Legacy (ARCHIVED.md) ==="
  for repo in "${LEGACY_REPOS[@]}"; do
    echo "  $repo"
  done
  echo ""
  echo "=== Research (research banner) ==="
  for repo in "${RESEARCH_REPOS[@]}"; do
    echo "  $repo"
  done
  exit 0
fi

read -p "Continue? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

# Process each category
process_repos() {
  local mode="$1"
  shift
  local repos=("$@")

  for repo in "${repos[@]}"; do
    echo ""
    echo "--- $repo ---"
    if [ "$mode" == "active" ]; then
      "$SCRIPT_DIR/bootstrap-repo.sh" "$repo"
    else
      "$SCRIPT_DIR/bootstrap-repo.sh" "$repo" "$mode"
    fi
  done
}

echo ""
echo "=== Processing BlackRoad-OS Core ==="
process_repos "active" "${BLACKROAD_OS_CORE[@]}"

echo ""
echo "=== Processing BlackRoad-OS Frontend ==="
process_repos "active" "${BLACKROAD_OS_FRONTEND[@]}"

echo ""
echo "=== Processing BlackRoad-OS Meta ==="
process_repos "active" "${BLACKROAD_OS_META[@]}"

echo ""
echo "=== Processing BlackRoad-OS Agents ==="
process_repos "active" "${BLACKROAD_OS_AGENTS[@]}"

echo ""
echo "=== Processing BlackRoad-OS Packs ==="
process_repos "active" "${BLACKROAD_OS_PACKS[@]}"

echo ""
echo "=== Processing BlackRoad-AI ==="
process_repos "active" "${BLACKROAD_AI[@]}"

echo ""
echo "=== Processing Legacy Repos ==="
process_repos "--legacy" "${LEGACY_REPOS[@]}"

echo ""
echo "=== Processing Research Repos ==="
process_repos "--research" "${RESEARCH_REPOS[@]}"

echo ""
echo "=== Done ==="
