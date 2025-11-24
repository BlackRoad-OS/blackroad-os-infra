#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

if ! command -v terraform >/dev/null 2>&1; then
  echo "terraform not found on PATH" >&2
  exit 1
fi

terraform fmt -recursive terraform modules

tflint --chdir=terraform || (echo "tflint failed" && exit 1)

tfsec terraform || (echo "tfsec failed" && exit 1)

checkov -d terraform || (echo "checkov failed" && exit 1)
