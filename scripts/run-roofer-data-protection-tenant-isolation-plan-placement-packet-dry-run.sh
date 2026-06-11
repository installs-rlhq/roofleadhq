#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Roofer Data Protection and Tenant Isolation Plan Placement Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is a planning/context placement packet only. No security controls, auth, schema, RLS, secrets, or access logic are implemented."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated roofer data protection tenant isolation plan placement packet verifier
node backend/scripts/verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Roofer Data Protection and Tenant Isolation Plan Placement Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
