#!/usr/bin/env bash
echo "== FIRST ROOFER MANUAL SETUP SESSION ARCHIVE FINAL CHECK DRY RUN =="
cd /root/roofleadhq || { echo "STOP: repo path missing"; exit 1; }

scripts/verify-source-of-truth.sh || { echo "FAILED: source of truth"; exit 1; }

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK.md || { echo "FAILED: missing session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check doc"; exit 1; }
test -f scripts/check-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-dry-run.sh || { echo "FAILED: missing session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check wrapper"; exit 1; }
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-readonly.js || { echo "FAILED: missing session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check verifier"; exit 1; }

node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-acceptance-readonly.js || { echo "FAILED: session archive acceptance verifier"; exit 1; }
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-readonly.js || { echo "FAILED: session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check verifier"; exit 1; }

scripts/check-production-gates.sh || { echo "FAILED: production gates"; exit 1; }
scripts/verify-safe-readiness.sh || { echo "FAILED: safe readiness"; exit 1; }

echo "MANUAL SETUP SESSION ARCHIVE FINAL CHECK DRY RUN PASS"
echo "No production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send occurred."
