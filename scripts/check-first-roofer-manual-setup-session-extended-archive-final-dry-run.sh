#!/usr/bin/env bash
echo "== FIRST ROOFER MANUAL SETUP SESSION EXTENDED ARCHIVE FINAL CHECK DRY RUN =="
cd /root/roofleadhq || { echo "STOP: repo path missing"; exit 1; }

scripts/verify-source-of-truth.sh || { echo "FAILED: source of truth"; exit 1; }

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_FINAL_CHECK.md || { echo "FAILED: missing extended archive final check doc"; exit 1; }
test -f scripts/check-first-roofer-manual-setup-session-extended-archive-final-dry-run.sh || { echo "FAILED: missing extended archive final check wrapper"; exit 1; }
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-final-check-readonly.js || { echo "FAILED: missing extended archive final check verifier"; exit 1; }

node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-acceptance-readonly.js || { echo "FAILED: extended archive acceptance verifier"; exit 1; }
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-final-check-readonly.js || { echo "FAILED: extended archive final check verifier"; exit 1; }

scripts/check-production-gates.sh || { echo "FAILED: production gates"; exit 1; }
scripts/verify-safe-readiness.sh || { echo "FAILED: safe readiness"; exit 1; }

echo "MANUAL SETUP SESSION EXTENDED ARCHIVE FINAL CHECK DRY RUN PASS"
echo "No production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send occurred."
