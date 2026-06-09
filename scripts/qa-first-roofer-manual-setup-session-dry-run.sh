#!/usr/bin/env bash
echo "== FIRST ROOFER MANUAL SETUP SESSION QA DRY RUN =="
cd /root/roofleadhq || { echo "STOP: repo path missing"; exit 1; }

scripts/verify-source-of-truth.sh || { echo "FAILED: source of truth"; exit 1; }

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_QA.md || { echo "FAILED: missing session QA doc"; exit 1; }
test -f scripts/qa-first-roofer-manual-setup-session-dry-run.sh || { echo "FAILED: missing session QA wrapper"; exit 1; }
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-qa-readonly.js || { echo "FAILED: missing session QA verifier"; exit 1; }

node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-notes-readonly.js || { echo "FAILED: session notes verifier"; exit 1; }
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-qa-readonly.js || { echo "FAILED: session QA verifier"; exit 1; }

scripts/record-first-roofer-manual-setup-session-notes-dry-run.sh || { echo "FAILED: session notes wrapper"; exit 1; }
scripts/check-production-gates.sh || { echo "FAILED: production gates"; exit 1; }
scripts/verify-safe-readiness.sh || { echo "FAILED: safe readiness"; exit 1; }

echo "MANUAL SETUP SESSION QA DRY RUN PASS"
echo "No production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send occurred."
