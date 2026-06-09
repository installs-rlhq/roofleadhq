#!/usr/bin/env bash
echo "== FIRST ROOFER MANUAL SETUP SESSION FINAL SUMMARY DRY RUN =="
cd /root/roofleadhq || { echo "STOP: repo path missing"; exit 1; }

scripts/verify-source-of-truth.sh || { echo "FAILED: source of truth"; exit 1; }

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY.md || { echo "FAILED: missing session final summary doc"; exit 1; }
test -f scripts/summarize-first-roofer-manual-setup-session-dry-run.sh || { echo "FAILED: missing session final summary wrapper"; exit 1; }
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-readonly.js || { echo "FAILED: missing session final summary verifier"; exit 1; }

node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-outcome-acceptance-readonly.js || { echo "FAILED: session outcome acceptance verifier"; exit 1; }
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-readonly.js || { echo "FAILED: session final summary verifier"; exit 1; }

scripts/check-production-gates.sh || { echo "FAILED: production gates"; exit 1; }
scripts/verify-safe-readiness.sh || { echo "FAILED: safe readiness"; exit 1; }

echo "MANUAL SETUP SESSION FINAL SUMMARY DRY RUN PASS"
echo "No production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send occurred."
