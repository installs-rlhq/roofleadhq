#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Website Build 224 Public Source-of-Truth Dry-Run =="
echo "Mode: read-only verification of public website pricing/offer/feature copy"
echo "Static website copy only. No backend live activation, no integrations activated, no external sends."
echo "Enforces the Build 224 source of truth: Starter/Growth/Elite volume-only pricing"
echo "(\$199 setup; \$199->\$299 / \$399->\$599 / \$899; 25/75/150 leads/mo), customized founder-led"
echo "setup + 'Book a Founder-Led Setup Call', no 14-day/free-trial, unbuilt features framed as roadmap."

node --check backend/scripts/verify-website-build-224-source-of-truth-readonly.js
echo "PASS: Build 224 verifier syntax check (node --check) succeeded."

node backend/scripts/verify-website-build-224-source-of-truth-readonly.js

echo "== Confirming superseded legacy website verifiers are valid passthroughs =="
for v in \
  verify-website-pricing-volume-guardrail-readonly.js \
  verify-website-trial-direction-regression-readonly.js \
  verify-website-copy-layout-polish-readonly.js \
  verify-website-founder-led-launch-copy-readonly.js \
  verify-website-founder-led-conversion-polish-readonly.js \
  verify-website-positioning-recovery-readonly.js \
  verify-website-lead-to-inspection-positioning-update-readonly.js ; do
  node --check "backend/scripts/$v"
done
echo "PASS: all superseded legacy website verifiers pass node --check."

echo "PASS: Website Build 224 source-of-truth dry-run wrapper passed."
