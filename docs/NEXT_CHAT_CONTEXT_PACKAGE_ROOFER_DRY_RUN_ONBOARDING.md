# Next Chat Context Package - Roofer Dry-Run Onboarding

Latest verified source of truth:
dc6d319 test(pilot): record roofer onboarding runbook readiness milestone

Terminal 1 source-of-truth:
- Repo path: /root/roofleadhq
- HEAD and origin/main match at dc6d319
- Verify with scripts/verify-source-of-truth.sh

Recent verified chain:
- dc6d319 test(pilot): record roofer onboarding runbook readiness milestone
- 6a01421 test(pilot): wire roofer onboarding runbook into readiness
- c1a75ba test(pilot): record roofer dry-run onboarding runbook milestone
- 346aecd docs(pilot): add roofer dry-run onboarding operator runbook
- 46b683b test(pilot): record roofer dry-run context package milestone
- 65af4bf docs(pilot): add roofer dry-run onboarding context package
- 6f224b4 test(pilot): record roofer dry-run workspace comparison milestone
- 933e4f7 test(pilot): add roofer dry-run workspace comparison
- bb273d1 test(pilot): record roofer dry-run workspace sample milestone
- 4f80990 test(pilot): add roofer dry-run workspace sample packet
- aa091ca test(pilot): record roofer dry-run workspace smoke milestone
- 454080a test(pilot): add roofer dry-run workspace smoke packet

Completed safe onboarding layer:
- Roofer dry-run intake packet
- Roofer dry-run workspace templates
- Template-copy onboarding script wiring
- Cleanup repair
- End-to-end smoke verifier
- Known-good sample fixture
- Generated-vs-sample comparison verifier
- Dedicated next-chat context package
- Operator runbook
- Operator runbook verifier
- Operator runbook verifier wired into aggregate readiness
- Milestone guards

Key files:
- scripts/onboard-roofer.sh
- docs/ROOFER_DRY_RUN_ONBOARDING_OPERATOR_RUNBOOK.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md
- templates/roofer-dry-run-workspace/README.md
- templates/roofer-dry-run-workspace/intake.md
- templates/roofer-dry-run-workspace/safety-flags.env
- fixtures/roofer-dry-run-workspace/sample-roofer/
- backend/scripts/verify-first-paid-launch-roofer-onboarding-template-copy-readonly.js
- backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-smoke-readonly.js
- backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-sample-packet-readonly.js
- backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js
- backend/scripts/verify-roofer-dry-run-onboarding-operator-runbook-readonly.js
- backend/scripts/verify-next-chat-context-package-roofer-dry-run-onboarding-readonly.js
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md

Operator runbook status:
- Added in 346aecd.
- Guarded in c1a75ba.
- Wired into aggregate safe readiness in 6a01421.
- Readiness wiring guarded in dc6d319.

Safety posture:
No live automation is active.
Do not activate production.
Do not send live SMS.
Do not mutate Supabase.
Do not notify contractors or homeowners.
Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

Required validation:
- scripts/verify-source-of-truth.sh
- node backend/scripts/verify-next-chat-context-package-roofer-dry-run-onboarding-readonly.js
- node backend/scripts/verify-roofer-dry-run-onboarding-operator-runbook-readonly.js
- scripts/check-production-gates.sh
- scripts/verify-safe-readiness.sh
- npm --prefix backend run build
- scripts/show-diff-proof.sh

Recommended next safe build:
Create a one-command dry-run onboarding QA wrapper that runs source-of-truth verification, creates a temporary roofer workspace, verifies files and disabled flags, compares against the sample fixture, cleans up, and exits without production activation.
