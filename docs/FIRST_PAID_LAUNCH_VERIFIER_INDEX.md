# First Paid Launch Verifier Index

Date: 2026-06-05

## Purpose

This is the master index for the first paid launch verifiers in the RoofLeadHQ Founder-Led Launch Program.

Use it to review the local/read-only verification steps before the first contractor launch. These verifiers inspect local files and local status only. They make no Supabase reads or writes, no external service calls, and no live service activations.

## Exact Command

```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Verifier Index

- Aggregate readiness verifier: `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Launch packet verifier: `node backend/scripts/verify-first-paid-pilot-launch-packet-readonly.js`
- Contractor kickoff email verifier: `node backend/scripts/verify-first-paid-contractor-kickoff-email-readonly.js`
- Contractor setup checklist verifier: `node backend/scripts/verify-first-paid-contractor-setup-checklist-readonly.js`
- Client launch readiness gate verifier: `node backend/scripts/verify-first-paid-client-launch-readiness-gate-readonly.js`
- Dashboard smoke verifier: `node backend/scripts/verify-pilot-dashboard-smoke-readonly.js`
- Manual Outreach smoke verifier: `node backend/scripts/verify-manual-outreach-smoke-readonly.js`
- Vapi phone lead smoke verifier: `node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js`
- Reporting smoke verifier: `node backend/scripts/verify-reporting-smoke-readonly.js`
- Operator status page verifier: `node backend/scripts/verify-pilot-operator-status-page-readonly.js`
- Operator status endpoint verifier: `node backend/scripts/verify-pilot-operator-status-endpoint-readonly.js`
- Dashboard navigation verifier: `node backend/scripts/verify-dashboard-navigation-readonly.js`
- Live SMS approval package stale guard: `node backend/scripts/verify-live-sms-approval-package-stale-readonly.js`
- Go/No-Go snapshot verifier: `node backend/scripts/verify-first-paid-launch-go-no-go-snapshot-readonly.js`
- FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md
- Launch control center: `docs/FIRST_PAID_LAUNCH_CONTROL_CENTER.md`
- Launch control center verifier: `node backend/scripts/verify-first-paid-launch-control-center-readonly.js`
- Launch status contract: `backend/src/services/first-paid-launch-status-contract.service.ts`
- Launch status contract verifier: `node backend/scripts/verify-first-paid-launch-status-contract-readonly.js`
- Execution pack: `docs/FIRST_PAID_LAUNCH_EXECUTION_PACK.md`
- Execution pack verifier: `node backend/scripts/verify-first-paid-launch-execution-pack-readonly.js`
- Operator dashboard QA pack: `docs/FIRST_PAID_LAUNCH_OPERATOR_DASHBOARD_QA.md`
- Operator dashboard QA verifier: `node backend/scripts/verify-first-paid-launch-operator-dashboard-qa-readonly.js`
- Emergency escalation packet: `docs/FIRST_PAID_LAUNCH_EMERGENCY_ESCALATION_PACKET.md`
- Emergency escalation packet verifier: `node backend/scripts/verify-first-paid-launch-emergency-escalation-packet-readonly.js`
- Contractor notification packet: `docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md`
- Contractor notification packet verifier: `node backend/scripts/verify-first-paid-launch-contractor-notification-packet-readonly.js`
- Appointment outcome packet: `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- Appointment outcome packet verifier: `node backend/scripts/verify-first-paid-launch-appointment-outcome-packet-readonly.js`
- Lead source quality packet: `docs/FIRST_PAID_LAUNCH_LEAD_SOURCE_QUALITY_PACKET.md`
- Lead source quality packet verifier: `node backend/scripts/verify-first-paid-launch-lead-source-quality-packet-readonly.js`
- Manual review queue packet: `docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md`
- Manual review queue packet verifier: `node backend/scripts/verify-first-paid-launch-manual-review-queue-packet-readonly.js`
- Stopped lead handling packet: `docs/FIRST_PAID_LAUNCH_STOPPED_LEAD_HANDLING_PACKET.md`
- Stopped lead handling packet verifier: `node backend/scripts/verify-first-paid-launch-stopped-lead-handling-packet-readonly.js`
- Voice path cleanup packet: `docs/FIRST_PAID_LAUNCH_VOICE_PATH_CLEANUP_PACKET.md`
- Voice path cleanup packet verifier: `node backend/scripts/verify-first-paid-launch-voice-path-cleanup-packet-readonly.js`
- Automation foundation packet: `docs/FIRST_PAID_LAUNCH_AUTOMATION_FOUNDATION_PACKET.md`
- Automation foundation packet verifier: `node backend/scripts/verify-first-paid-launch-automation-foundation-packet-readonly.js`
- Roofer onboarding script packet: `docs/FIRST_PAID_LAUNCH_ROOFER_ONBOARDING_SCRIPT_PACKET.md`
- Roofer onboarding script packet verifier: `node backend/scripts/verify-first-paid-launch-roofer-onboarding-script-packet-readonly.js`
- Schema blockers packet: `docs/FIRST_PAID_LAUNCH_SCHEMA_BLOCKERS_PACKET.md`
- Schema blockers packet verifier: `node backend/scripts/verify-first-paid-launch-schema-blockers-packet-readonly.js`
- SMS dispatcher messages write test-only: `node backend/scripts/verify-sms-dispatcher-messages-write-testonly.js`
- SMS dispatcher follow-ups update test-only: `node backend/scripts/verify-sms-dispatcher-followups-update-testonly.js`
- Vapi post-call payload discovery: `node backend/scripts/verify-vapi-post-call-payload-discovery-readonly.js`
- Vapi raw payload capture plan: `node backend/scripts/verify-vapi-raw-payload-capture-plan-readonly.js`
- Vapi sample payload mapping: `node backend/scripts/verify-vapi-sample-payload-mapping-readonly.js`
- Vapi missing-fields readiness gate: `node backend/scripts/verify-vapi-missing-fields-readiness-gate-readonly.js`
- Vapi real payload collection runbook: `node backend/scripts/verify-vapi-real-payload-collection-runbook-readonly.js`
- Vapi operator payload review checklist: `node backend/scripts/verify-vapi-operator-payload-review-checklist-readonly.js`
- Vapi test payload ingestion plan: `node backend/scripts/verify-vapi-test-payload-ingestion-plan-readonly.js`
- Vapi test payload ingestion dry-run: `node backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`

## Launch Framing

- Founder-Led Launch Program
- Help the contractor book inspections / book appointments
- No prohibited launch-promising wording
- No quota-based appointment promise
- No hard outcome promises
- No inspection or appointment outcome guarantee
- No job/revenue guarantees

## Notes

- The aggregate readiness verifier is the primary entry point.
- The other verifiers are supporting read-only checks for launch docs, dashboard visibility, and operational safety.
- Keep all launch review local, read-only, and free of production service calls unless separately approved.
- Live SMS approval package must remain stale unless a fresh approval package is created and explicitly approved.

## Vapi Dry-Run Scenario Hardening Milestone

- Commit `7e30d9b test(vapi): harden dry-run scenario coverage` added six fake/sanitized Vapi scenario payloads and `--scenario` support.
- Commit `d2ca159 docs(pilot): record vapi dry-run scenario hardening` recorded the milestone in the next-chat context package.
- Commit `823c666 docs(pilot): record vapi scenario hardening in business guide` recorded the milestone in the business buildout guide.
- `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js` now executes all six valid scenarios, confirms invalid scenario fails, and confirms missing gates fail.
- Six scenario files:
  - `docs/samples/vapi-scenario-booked-inspection.fake.json`
  - `docs/samples/vapi-scenario-unbooked-followup.fake.json`
  - `docs/samples/vapi-scenario-missing-address.fake.json`
  - `docs/samples/vapi-scenario-missing-phone.fake.json`
  - `docs/samples/vapi-scenario-emergency-leak.fake.json`
  - `docs/samples/vapi-scenario-insurance-storm.fake.json`
- Safety preserved: no live Vapi/Supabase/SMS/Twilio/Calendar/Resend/Lindy, no routes/cron/scheduler/dispatcher.

- Commit `63a1a25 test(vapi): document and verify normalized dry-run contract` added `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md` and strengthened the verifier to check all 18 normalized fields across the six scenarios (including nullable rules for `from`, `property_address`, and `appointment_suggested`).

## Vapi Normalized Dry-Run Contract Verification

Commit:
- `63a1a25 test(vapi): document and verify normalized dry-run contract`

Contract doc:
- `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md`

Verifier strengthened:
- `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`

Verification coverage:
- Confirms all six fake/sanitized Vapi dry-run scenarios execute successfully.
- Confirms each scenario emits the required normalized internal object fields.
- Confirms invalid scenario names fail closed.
- Confirms valid scenarios without required gates fail closed.
- Preserves the required gates:
  - `VAPI_INGESTION_TEST_MODE=1`
  - `--allow-vapi-test-ingestion`

Required normalized fields:
- `source`
- `call_id`
- `from`
- `to`
- `started_at`
- `ended_at`
- `homeowner_name`
- `email`
- `property_address`
- `roof_issue`
- `urgency`
- `insurance_claim`
- `outcome`
- `appointment_suggested`
- `summary`
- `has_transcript`
- `test_only`
- `ingested_at`

Nullable rules:
- `from` may be null only for `missing-phone`.
- `property_address` may be null only for `missing-address`.
- `appointment_suggested` may be null for unbooked or missing-field scenarios.

Safety posture:
- No live Vapi calls.
- No Supabase writes.
- No SMS/Twilio sends.
- No Calendar/Resend/Lindy activation.
- No routes.
- No cron/scheduler/dispatcher activation.
- Retell remains deprecated/disabled.

## Vapi Scenario-Specific Contract Enforcement

The Vapi dry-run verifier now needs to enforce scenario-specific normalized object rules, not only field presence.

Verifier:
- `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`

Enforced contract checks:
- `source` must be `vapi`.
- `test_only` must be `true`.
- `has_transcript` must be boolean.
- `ingested_at` must parse as a valid date.
- `call_id` must be fake/test-safe.
- `from` may be null only for `missing-phone`.
- `property_address` may be null only for `missing-address`.
- `appointment_suggested` may be null only for `unbooked-followup`, `missing-address`, or `missing-phone`.
- `booked-inspection` must include a suggested appointment.
- `emergency-leak` must preserve emergency/high-urgency and leak semantics.
- `insurance-storm` must preserve insurance and storm/hail semantics.

Safety checks remain read-only/test-only with no production activation.

## Vapi normalized contract documentation verifier

- Script: `backend/scripts/verify-vapi-normalized-contract-doc-readonly.js`
- Purpose: read-only guard that verifies `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md` documents the required normalized Vapi dry-run fields, nullable rules, scenario-specific semantics, and safety posture.
- Coverage:
  - required normalized fields
  - all six fake/sanitized scenarios
  - `missing-phone`, `missing-address`, and `appointment_suggested` nullable rules
  - `emergency-leak` and `insurance-storm` scenario semantics
  - no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation

## Vapi scenario sample files verifier

- Script: `backend/scripts/verify-vapi-scenario-samples-readonly.js`
- Purpose: read-only guard that directly validates the six fake/sanitized Vapi scenario sample JSON files in `docs/samples`.
- Coverage:
  - every `vapi-scenario-*.fake.json` file exists
  - every scenario file parses as JSON
  - every scenario file includes fake/test/sanitized/sample markers
  - scenario semantics are preserved for booked inspection, unbooked follow-up, missing address, missing phone, emergency leak, and insurance storm
  - no production-looking secrets or live identifiers are present
  - the dry-run ingestion script still references the scenario set

## Vapi dry-run output snapshot verifier

- Script: `backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js`
- Purpose: read-only guard that executes every fake/sanitized Vapi dry-run scenario and validates the normalized output shape and scenario semantics.
- Coverage:
  - all six scenarios execute successfully with test gates
  - all required normalized fields are emitted
  - `source` remains `vapi`
  - `test_only` remains `true`
  - `call_id` remains fake/test-safe
  - nullable rules are preserved for `missing-phone`, `missing-address`, and `appointment_suggested`
  - booked inspection, unbooked follow-up, emergency leak, and insurance storm semantics remain intact
  - dry-run script fails closed without required gates
  - snapshot verification confirms `--scenario=value` and `--scenario value` load equivalent normalized outputs
  - no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation

## Vapi dry-run CLI contract verifier

- Script: `backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js`
- Purpose: read-only guard that verifies the Vapi dry-run script accepts both `--scenario=value` and `--scenario value` forms without accidentally falling back to the default sample.
- Coverage:
  - both scenario argument forms work for all six fake/sanitized scenarios
  - equals-form and space-form outputs load the same scenario-specific fake call id
  - invalid scenarios fail closed
  - missing gates fail closed
  - outputs remain `source = vapi` and `test_only = true`
  - no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation

## Vapi scenario registry consistency verifier

- Script: `backend/scripts/verify-vapi-scenario-registry-readonly.js`
- Purpose: read-only guard that verifies the six Vapi fake/sanitized scenario names and sample files stay consistent across dry-run ingestion, scenario sample verification, output snapshot verification, CLI contract verification, docs, and next-chat context.
- Coverage:
  - exact six-file `docs/samples/vapi-scenario-*.fake.json` registry
  - every sample parses as JSON and remains visibly fake/sanitized
  - dry-run `scenarioMap` contains exact scenario-to-file mappings
  - dry-run verifier, scenario samples verifier, snapshot verifier, and CLI contract verifier include the complete scenario set
  - contract docs, verifier index, business guide, and next-chat context include the complete scenario set
  - safety markers remain documented
  - no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation

## Vapi aggregate verifier coverage

- Script: `backend/scripts/verify-vapi-aggregate-coverage-readonly.js`
- Purpose: read-only guard that verifies every `backend/scripts/verify-vapi-*-readonly.js` script is explicitly wired into aggregate first paid pilot readiness and documented in the verifier index and next-chat context.
- Coverage:
  - every expected Vapi verifier script exists
  - every expected Vapi verifier is included in `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
  - the registry exactly matches `backend/scripts/verify-vapi-*-readonly.js`
  - verifier index includes every expected Vapi verifier
  - next-chat context includes every expected Vapi verifier
  - aggregate readiness includes expected Vapi command names
  - safety markers remain documented
  - no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation


## Vapi guard layer coverage verifier

- Script: `backend/scripts/verify-vapi-guard-layer-readonly.js`
- Purpose: read-only guard that verifies the Vapi guard-layer verifiers remain wired into aggregate readiness, protected by aggregate coverage, documented in the verifier index, documented in next-chat context, and locked by the next-chat context verifier.
- Coverage:
  - aggregate coverage verifier remains included
  - scenario registry verifier remains included
  - dry-run output snapshot verifier remains included
  - dry-run CLI contract verifier remains included
  - next-chat context and next-chat verifier preserve guard-layer markers
  - guard-layer scripts preserve read-only safety markers
  - downstream Vapi verifiers remain protected by aggregate coverage
  - no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation

## Critical file format integrity verifier

- Script: `backend/scripts/verify-critical-file-format-integrity-readonly.js`
- Purpose: Prevent malformed patch regressions by guarding critical verifier and documentation files against literal backslash-n artifacts, collapsed one-line verifier files, missing Node shebangs, and suspiciously low line counts.
- Safety: Read-only. Does not enable SMS, Twilio, Vapi ingestion, Supabase writes, Calendar booking, Resend, Lindy, routes, cron, schedulers, or dispatchers.

## Next-chat latest milestones verifier

- Script: `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`
- Purpose: Guard the handoff/context package so it records the latest critical file integrity milestones, including commits `6048d21` and `9147664`, while preserving legacy-language and live-automation safety constraints.
- Safety: Read-only. Does not enable SMS, Twilio, Vapi ingestion, Supabase writes, Calendar booking, Resend, Lindy, routes, cron, schedulers, or dispatchers.

## Critical integrity coverage update

- Commit: `61c09b5 test(pilot): guard latest context milestones`
- Update: `backend/scripts/verify-critical-file-format-integrity-readonly.js` now protects `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`.
- Safety: Read-only. No live automation activation.

## Handoff integrity aggregate verifier

- Script: `backend/scripts/verify-handoff-integrity-readonly.js`
- Purpose: Run the critical file format integrity verifier, next-chat context package verifier, and latest milestones verifier together before handoff or safe commit/push workflows.
- Safety: Read-only. Does not enable SMS, Twilio, Vapi ingestion, Supabase writes, Calendar booking, Resend, Lindy, routes, cron, schedulers, or dispatchers.

## Handoff integrity context verifier

- Script: `backend/scripts/verify-handoff-integrity-context-readonly.js`
- Purpose: Guard the next-chat context package so it records the handoff integrity aggregate milestone and blocks forbidden legacy/guarantee language.
- Safety: Read-only. Does not enable SMS, Twilio, Vapi ingestion, Supabase writes, Calendar booking, Resend, Lindy, routes, cron, schedulers, or dispatchers.

## Handoff aggregate coverage update

- Commit: `133e5c0 test(pilot): guard handoff integrity context`
- Update: `backend/scripts/verify-handoff-integrity-readonly.js` now includes `backend/scripts/verify-handoff-integrity-context-readonly.js`.
- Safety: Read-only. No live automation activation.

## Latest milestones coverage update

- Commit: `93bed54 test(pilot): include handoff context in aggregate`
- Update: `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js` now requires the latest handoff aggregate milestone in the next-chat context package.
- Safety: Read-only. No live automation activation.

## Source-of-truth commit chain verifier

- Script: `backend/scripts/verify-source-of-truth-commit-chain-readonly.js`
- Purpose: Guard the latest verified commit chain and next-chat context package against source-of-truth drift.
- Safety: Read-only. Does not enable SMS, Twilio, Vapi ingestion, Supabase writes, Calendar booking, Resend, Lindy, routes, cron, schedulers, or dispatchers.

## Handoff aggregate source-of-truth coverage update

- Commit: `8480581 test(pilot): guard source of truth commit chain`
- Update: `backend/scripts/verify-handoff-integrity-readonly.js` now includes `backend/scripts/verify-source-of-truth-commit-chain-readonly.js`.
- Safety: Read-only. No live automation activation.

## Source-of-truth chain window alignment

- Commit: `2fc84a2 test(pilot): align source of truth chain window`
- Update: `backend/scripts/verify-source-of-truth-commit-chain-readonly.js` now matches the current top-8 `git log --oneline` window.
- Safety: Read-only. No live automation activation.

## Source-of-truth verifier process alignment

- Script: `backend/scripts/verify-source-of-truth-commit-chain-readonly.js`
- Update: The verifier now checks Terminal 1 source-of-truth process alignment instead of hardcoding the full top-8 commit window.
- Reason: Older commits naturally age out of `git log --oneline -8` after new safe commits.
- Safety: Read-only. No live automation activation.

## Stabilized source-of-truth verifier milestone

- Commit: `befef91 test(pilot): stabilize source of truth verifier`
- Update: `backend/scripts/verify-source-of-truth-commit-chain-readonly.js` now verifies Terminal 1 source-of-truth process alignment instead of hardcoding the full top-8 commit window.
- Safety: Read-only. No live automation activation.

## Handoff context stabilized verifier coverage

- Commit: `3789630 test(pilot): record stabilized source verifier milestone`
- Update: `backend/scripts/verify-handoff-integrity-context-readonly.js` now requires the stabilized source verifier milestone and process-alignment language.
- Safety: Read-only. No live automation activation.

## Latest milestones stabilized context coverage

- Commit: `c1acc89 test(pilot): require stabilized source verifier context`
- Update: `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js` now requires the stabilized source verifier context milestone.
- Safety: Read-only. No live automation activation.

## Launch safety meta verifier

- Script: `backend/scripts/verify-launch-safety-meta-readonly.js`
- Purpose: Run the critical file format, source-of-truth, handoff integrity, handoff context, latest milestones, and next-chat context package verifiers together.
- Safety: Read-only. Does not enable SMS, Twilio, Vapi ingestion, Supabase writes, Calendar booking, Resend, Lindy, routes, cron, schedulers, or dispatchers.

## Launch safety meta verifier milestone

- Commit: `693aa0d test(pilot): add launch safety meta verifier`
- Update: Latest milestones and handoff context guards now require the launch safety meta verifier milestone.
- Safety: Read-only. No live automation activation.

## Source-of-truth process launch safety coverage

- Commit: `3ceb537 test(pilot): record launch safety meta milestone`
- Update: `backend/scripts/verify-source-of-truth-commit-chain-readonly.js` now requires launch safety meta verifier context.
- Safety: Read-only. No live automation activation.

## Latest milestones launch safety source coverage

- Commit: `574a822 test(pilot): require launch safety in source verifier`
- Update: `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js` now requires the launch-safety-in-source-verifier milestone.
- Safety: Read-only. No live automation activation.

## Latest milestone self-check verifier

- Script: `backend/scripts/verify-latest-milestone-self-check-readonly.js`
- Purpose: Catch documented milestones that are missing from the latest milestones verifier or context package, preventing doc-only drift when script updates were intended.
- Safety: Read-only. No live automation activation.

## Latest milestone self-check committed

- Commit: `3c03c72 test(pilot): add latest milestone self check`
- Update: The latest milestones verifier and latest milestone self-check now require the self-check milestone.
- Safety: Read-only. No live automation activation.

## Handoff context latest milestone self-check coverage

- Commit: `b31b00c test(pilot): record latest milestone self check`
- Update: `backend/scripts/verify-handoff-integrity-context-readonly.js` now requires the latest milestone self-check verifier and milestone commits.
- Safety: Read-only. No live automation activation.

## Latest milestones self-check context coverage

- Commit: `17a300f test(pilot): require latest milestone self check context`
- Update: The latest milestones verifier and latest milestone self-check now require the self-check context milestone.
- Safety: Read-only. No live automation activation.

## Operating Workflow Guard

- `backend/scripts/verify-next-safe-build-operating-workflow-readonly.js`
  - Guards the next safe build operating workflow.
  - Protects Terminal 1 `/root/roofleadhq` source-of-truth workflow.
  - Protects the rule that `/root/.openclaw/workspace` must not be used.
  - Protects the rule that OpenClaw summaries alone are not trusted.
  - Protects safe verified doc/test/read-only verifier commit/push policy.
  - Protects explicit approval gates for live/production/destructive actions.
  - Protects required verification, diff, staged review, backend build, commit, push, and final source-of-truth confirmation workflow.

## Operating Workflow Guard Cross-Reference Verifier

- `backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js`
  - Ensures the operating workflow guard remains discoverable across the next-chat context, verifier index, business guide, and launch safety meta verifier.
  - Protects against documentation drift where the guard exists but stops being visible in daily build handoff surfaces.
  - Read-only. No live automation activation.

## Operating Workflow Guard Suite Verifier

- `backend/scripts/verify-operating-workflow-guard-suite-readonly.js`
  - Runs the operating workflow guard, cross-reference guard, latest milestones guard, latest milestone self-check, and launch safety meta verifier as one read-only suite.
  - Gives Terminal 1 one focused command for proving the operating workflow guard layer is intact.
  - Read-only. No live automation activation.

## Next-Chat Recorded Source-of-Truth Baseline Verifier

- `backend/scripts/verify-next-chat-context-recorded-source-of-truth-readonly.js`
  - Confirms the latest required milestone recorded by the latest milestone self-check is also recorded in the next-chat context package.
  - Prevents the context package from silently drifting behind the guarded source-of-truth baseline.
  - Read-only. No live automation activation.

## Next-Chat Safe Build Snapshot Verifier

- `backend/scripts/verify-next-chat-context-safe-build-snapshot-readonly.js`
  - Confirms the copy/paste-ready safe build snapshot includes the latest source-of-truth commit chain, guard stack, workflow rules, approval gates, business context, and safety posture.
  - Protects the next-chat handoff from losing current operating rules.
  - Read-only. No live automation activation.

## First Paid Launch Operator Day-One Checklist

Verifier:

`node backend/scripts/verify-first-paid-launch-operator-day-one-checklist-readonly.js`

Purpose:

- Protects day-one operator execution for the first paid launch.
- Keeps live automation disabled.
- Verifies source-of-truth workflow, launch-readiness intake, manual handoff, and explicit production approval gates.

## First Paid Launch Customer Intake Packet

Verifier:

`node backend/scripts/verify-first-paid-launch-customer-intake-packet-readonly.js`

Purpose:

- Protects the customer-specific intake packet for first-paid launch onboarding.
- Connects the intake worksheet, setup checklist, onboarding runbook, readiness gate, and day-one checklist.
- Verifies lead source intake, booking preferences, follow-up preferences, reporting expectations, language rules, and explicit approval gates.

## First Paid Launch Appointment Booking Preferences Packet

Verifier:

`node backend/scripts/verify-first-paid-launch-booking-preferences-packet-readonly.js`

Purpose:

- Protects appointment booking preference rules for first-paid launch onboarding.
- Verifies appointment language, appointment types, availability rules, service area rules, assignment rules, emergency booking rules, confirmation/reminder expectations, and manual booking handoff.
- Keeps Calendar booking activation disabled unless explicitly approved.

## First Paid Launch Follow-Up Cadence Packet

Verifier:

`node backend/scripts/verify-first-paid-launch-follow-up-cadence-packet-readonly.js`

Purpose:

- Protects first-paid launch follow-up cadence rules.
- Verifies lead status definitions, initial response rules, missed-call recovery, appointment reminders, emergency follow-up, opt-out handling, channel rules, reporting tie-in, and manual operator handoff.
- Keeps SMS/Twilio, dispatcher, cron, scheduler, and live follow-up automation disabled unless explicitly approved.

## First Paid Launch Reporting Preferences Packet

Verifier:

`node backend/scripts/verify-first-paid-launch-reporting-preferences-packet-readonly.js`

Purpose:

- Protects first-paid launch reporting preference rules.
- Verifies weekly reports, monthly reports, KPI definitions, lead source reporting, appointment reporting, follow-up reporting, weather/trends/recommended actions, manual report assembly, and report delivery readiness.
- Keeps Resend, Lindy, cron, scheduler, dispatcher, and live report automation disabled unless explicitly approved.
