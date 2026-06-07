# Roofer Dry-Run Onboarding Operator Runbook

Purpose: safe founder/operator steps for creating and QA-checking a roofer onboarding workspace in dry-run mode.

Safety: planning-only. Do not activate production. Do not send live SMS. Do not mutate Supabase. Do not notify contractors or homeowners. Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

Current source of truth: 46b683b test(pilot): record roofer dry-run context package milestone

1. Verify source of truth:
cd /root/roofleadhq
scripts/verify-source-of-truth.sh

2. Create a dry-run workspace:
scripts/onboard-roofer.sh sample-roofer

3. Expected generated files:
.roofleadhq/onboarding/sample-roofer/README.md
.roofleadhq/onboarding/sample-roofer/intake.md
.roofleadhq/onboarding/sample-roofer/safety-flags.env
.roofleadhq/onboarding/sample-roofer/activation-flags.env
.roofleadhq/onboarding/sample-roofer/workspace-metadata.env
.roofleadhq/onboarding/sample-roofer/onboarding-checklist.md

4. QA checks:
ls -la .roofleadhq/onboarding/sample-roofer
grep -n "WORKSPACE_MODE=dry-run" .roofleadhq/onboarding/sample-roofer/workspace-metadata.env
grep -n "SMS_ACTIVATION=false" .roofleadhq/onboarding/sample-roofer/safety-flags.env
grep -n "SUPABASE_WRITES=false" .roofleadhq/onboarding/sample-roofer/safety-flags.env
grep -n "PUBLIC_ROUTE_ACTIVATION=false" .roofleadhq/onboarding/sample-roofer/safety-flags.env
grep -n "Production activation remains disabled" .roofleadhq/onboarding/sample-roofer/onboarding-checklist.md

5. Compare against known-good sample fixture:
fixtures/roofer-dry-run-workspace/sample-roofer/
node backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js

6. Required verification before commit:
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh
npm --prefix backend run build
scripts/show-diff-proof.sh

7. Cleanup test workspace:
rm -rf .roofleadhq/onboarding/sample-roofer

Final reminder: Production activation requires explicit approval and Terminal 1 verification.
