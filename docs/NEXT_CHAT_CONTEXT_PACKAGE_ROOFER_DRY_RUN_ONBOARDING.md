# Next Chat Context Package - Roofer Dry-Run Onboarding

Latest verified source of truth:
6f224b4 test(pilot): record roofer dry-run workspace comparison milestone

Terminal 1 source-of-truth:
- Repo path: /root/roofleadhq
- HEAD and origin/main match at 6f224b4
- Verify with scripts/verify-source-of-truth.sh

Recent verified chain:
- 6f224b4 test(pilot): record roofer dry-run workspace comparison milestone
- 933e4f7 test(pilot): add roofer dry-run workspace comparison
- bb273d1 test(pilot): record roofer dry-run workspace sample milestone
- 4f80990 test(pilot): add roofer dry-run workspace sample packet
- aa091ca test(pilot): record roofer dry-run workspace smoke milestone
- 454080a test(pilot): add roofer dry-run workspace smoke packet
- 058d40a test(pilot): record roofer onboarding template cleanup milestone
- 076029e test(pilot): fix roofer onboarding template copy cleanup

Completed safe onboarding layer:
- Roofer dry-run intake packet
- Roofer dry-run workspace templates
- Template-copy onboarding script wiring
- Cleanup repair
- End-to-end smoke verifier
- Known-good sample fixture
- Generated-vs-sample comparison verifier
- Aggregate readiness wiring
- Milestone guards

Key files:
- scripts/onboard-roofer.sh
- templates/roofer-dry-run-workspace/README.md
- templates/roofer-dry-run-workspace/intake.md
- templates/roofer-dry-run-workspace/safety-flags.env
- fixtures/roofer-dry-run-workspace/sample-roofer/
- backend/scripts/verify-first-paid-launch-roofer-onboarding-template-copy-readonly.js
- backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-smoke-readonly.js
- backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-sample-packet-readonly.js
- backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md

Safety posture:
No live automation is active.
Do not activate production.
Do not send live SMS.
Do not mutate Supabase.
Do not notify contractors or homeowners.
Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

Required validation:
- scripts/verify-source-of-truth.sh
- scripts/check-production-gates.sh
- scripts/verify-safe-readiness.sh
- npm --prefix backend run build
- scripts/show-diff-proof.sh

Recommended next safe build:
Roofer Dry-Run Onboarding Operator Runbook.
