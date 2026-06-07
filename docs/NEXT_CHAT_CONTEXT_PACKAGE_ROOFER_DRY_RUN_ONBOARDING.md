# Next Chat Context Package - Roofer Dry-Run Onboarding

Latest verified source of truth:
35c6f27 test(pilot): record first roofer dry-run setup packet milestone

Terminal 1 source-of-truth:
- Repo path: /root/roofleadhq
- HEAD and origin/main match at 35c6f27
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
- One-command dry-run onboarding QA wrapper
- Operator acceptance checklist
- First roofer dry-run setup packet

Key files:
- scripts/qa-first-roofer-readiness-packet.sh
- docs/ROOFER_DRY_RUN_FIRST_ROOFER_READINESS_PACKET_QA.md
- backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js
- docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md
- backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js
- docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md
- backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js
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


## Roofer Dry-Run Onboarding QA Wrapper

Next safe onboarding layer added:

- `scripts/qa-roofer-dry-run-onboarding.sh`
- `backend/scripts/verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js`
- `docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md`

This provides a one-command Terminal 1 QA path for creating, validating, fixture-comparing, and cleaning up a temporary roofer dry-run workspace while production activation remains disabled.


## Roofer Dry-Run Operator Acceptance Checklist

Next safe onboarding layer added:

- `docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md`
- `backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js`

This gives the founder/operator a local PASS/HOLD/BLOCKED acceptance review after the QA wrapper passes and before any real contractor setup planning. It checks workspace completeness, dry-run flags, missing information, manual review readiness, exposed secrets, and production-activation risk while production activation remains disabled.


## Roofer Dry-Run First Roofer Setup Packet

Next safe onboarding layer added:

- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md`
- `backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js`

This gives the founder/operator a planning-only setup packet template after the QA wrapper passes and the acceptance checklist is reviewed. It summarizes roofer profile, service area, services, booking preferences, lead sources, manual review/reporting preferences, setup notes, dry-run flags, and final manual decision while production activation remains disabled.


## Roofer Dry-Run First Roofer Readiness Packet QA

Next safe onboarding layer added:

- `scripts/qa-first-roofer-readiness-packet.sh`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_READINESS_PACKET_QA.md`
- `backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js`

This provides a one-command Terminal 1 QA path for the combined first roofer dry-run readiness packet: onboarding QA wrapper, operator acceptance checklist, and first roofer setup packet. It verifies source of truth, read-only verifiers, decision language, dry-run flags, safety language, cleanup, and production activation remains disabled.
