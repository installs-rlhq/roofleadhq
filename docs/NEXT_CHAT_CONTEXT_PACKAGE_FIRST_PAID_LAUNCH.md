# Next Chat Context Package — First Paid Launch

Baseline verified source-of-truth commit before next-chat handoff: `1ac4459 docs(pilot): add first paid launch operator dashboard qa`

Repo path: `/root/roofleadhq`

## Terminal 1 Source-of-Truth Rule

Use the baseline commit above to identify this handoff package. Before doing new work, verify the latest real source-of-truth with Terminal 1 using git fetch, git status, and git log.

## Launch Go/No-Go Snapshot

Latest verified commit:

`1ac4459 docs(pilot): add first paid launch operator dashboard qa`

Added:

- `docs/FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md`
- `backend/scripts/verify-first-paid-launch-go-no-go-snapshot-readonly.js`

The aggregate readiness verifier now includes the go/no-go snapshot check.

The snapshot confirms:

- Current status is demo ready with live automation disabled
- Homeowner SMS is not live
- Roofer reply SMS is not live
- Twilio sending is not live
- Live SMS approval package is stale
- Step 66 production send intent bridge is fake-only
- No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval

## Vapi Discovery & Readiness Sequence (Completed)

Latest verified commit:

`b3fc329 docs(pilot): record vapi scenario hardening in verifier index`

Completed Vapi milestones:
1. Vapi post-call payload discovery package
2. Vapi raw payload capture plan + fake sample
3. Vapi sample payload mapping
4. Vapi missing-fields readiness gate
5. Vapi real payload collection runbook
6. Vapi operator payload review checklist
7. Vapi test payload ingestion plan (planning doc + verifier)
8. Gated test-only Vapi payload ingestion dry-run script + verifier

Aggregate readiness verifier now requires the full Vapi readiness sequence (9 verifiers).

All Vapi work remains in discovery/planning/test-only dry-run phase. No webhook route, no live Vapi calls, no Supabase writes.

## Recent Commit History (Terminal 1 Verified)

- `e1a0f45` — Added gated test-only Vapi payload ingestion dry-run script + verifier
- `a9fdbe5` — Fully updated next-chat context package with Vapi ingestion plan + incident note
- `9a26ff5` — Fixed test payload ingestion verifier language after accidental push of failing verifier
- `3a4d7a3` — Added test payload ingestion plan (verifier initially failed — accidentally pushed)
- `198b412` — Recorded aggregate Vapi readiness wiring
- `b7e6498` — Wired Vapi readiness verifiers into aggregate readiness
- `575ac61` — Updated next-chat context with Vapi checklist
- `44bcc5d` — Added operator payload review checklist

**Important Incident:** Commit `3a4d7a3` was pushed while the verifier was failing. Commit `9a26ff5` corrected the verifier language. Going forward: **never commit or push if any verifier fails**.

## Vapi Test Payload Ingestion Plan Status

- Planning doc exists: `docs/VAPI_TEST_PAYLOAD_INGESTION_PLAN.md`

## RoofLeadHQ Business Buildout Daily Guide Milestone

- Full guide added: `docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md` (4,148 lines)
- Merges original June 4 guide with June 6 current-state override
- Includes: tooling reality (Telegram OpenClaw + VPS Terminal), safety posture, completed SMS/Lindy/Vapi work, dry-run ingestion status, verification incidents, next build direction, and preserved day-by-day roadmap
- VPS Terminal verified after `f8e178b`:
  - node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
  - node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js
  - npm --prefix backend run build
- HEAD and origin/main matched at `f8e178b` after fast-forward pull
- Read-only verifier exists and passes
- No ingestion script exists yet
- No live route, no Vapi calls, no Supabase writes
- No SMS/Twilio/Calendar/Resend/Lindy activation
- Real payload collection still requires explicit founder approval

## Vapi Dry-Run Scenario Hardening Milestone

Latest related commits:

- 7e30d9b test(vapi): harden dry-run scenario coverage
- d2ca159 docs(pilot): record vapi dry-run scenario hardening
- 823c666 docs(pilot): record vapi scenario hardening in business guide
- b3fc329 docs(pilot): record vapi scenario hardening in verifier index
- 63a1a25 test(vapi): document and verify normalized dry-run contract

What changed:

- Added six fake/sanitized Vapi scenario payloads:
  - booked inspection
  - unbooked follow-up
  - missing address
  - missing phone
  - emergency leak
  - insurance/storm damage
- Enhanced gated Vapi dry-run script with --scenario support.
- Strengthened backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js so it executes:
  - all six valid scenarios and expects success
  - invalid scenario and expects failure
  - valid scenario without required gates and expects failure
- Updated docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md to record this milestone.
- Updated docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md to record this milestone.

Scenario files:

- docs/samples/vapi-scenario-booked-inspection.fake.json
- docs/samples/vapi-scenario-unbooked-followup.fake.json
- docs/samples/vapi-scenario-missing-address.fake.json
- docs/samples/vapi-scenario-missing-phone.fake.json
- docs/samples/vapi-scenario-emergency-leak.fake.json
- docs/samples/vapi-scenario-insurance-storm.fake.json

Verification passed before the related commits:

- node backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js
- node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js
- node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
- npm --prefix backend run build

Safety preserved:

- No live Vapi calls.
- No Supabase writes.
- No SMS/Twilio sends.
- No Calendar/Resend/Lindy activation.
- No routes.
- No cron/scheduler/dispatcher activation.

This added the stale live SMS approval package guard into the aggregate first-paid readiness verifier.

The aggregate verifier now confirms:

- `docs/LIVE_SMS_APPROVAL_PACKAGE.md` is stale
- stale live SMS approval cannot be treated as active
- Step 66 send intent bridge remains fake-only
- no SMS/Twilio/route/cron/scheduler activation exists

## Step 66 Verified Production Send Intent Bridge

Step 66 is present in the real repo history and verified in Terminal 1.

Step 66 commit: `9ddfebd feat(sms): add production send intent bridge`

Files confirmed present:

- `backend/scripts/verify-sms-production-send-intent-bridge.js`
- `backend/scripts/verify-live-sms-approval-package-stale-readonly.js`
- `backend/src/services/sms-production-send-intent-bridge.service.ts`
- `docs/DAILY_PILOT_OPERATIONS_CHECKLIST.md`
- `docs/SMS_DISPATCHER_EXECUTION_PLAN.md`
- `docs/SMS_DISPATCHER_EXECUTION_PLAN_VERIFICATION.md`

Terminal 1 verification passed:

- `npm --prefix backend run build`
- `node backend/scripts/verify-sms-production-send-intent-bridge.js`

Verified safety:

- No SMS sent
- No Twilio calls made
- No Twilio import
- No mutating DB calls
- No route registration
- No cron or scheduler activation
- Fake-only verification passed

Important: Step 66 creates/validates a production send intent bridge only. It is not approval to send live SMS.

## Current Safety Posture

- All production automations disabled
- No live Vapi webhook route exists
- No Vapi calls from code
- No Supabase writes
- No SMS/Twilio sends
- No Calendar/Resend/Lindy production activation
- No cron/scheduler/dispatcher activation
- Any real Vapi payload collection requires explicit founder approval in a separate task
- Retell remains deprecated/disabled
- Step 66 production send intent bridge is verified fake-only and does not send SMS
- All verifiers are local read-only filesystem inspection only
- No live service activation allowed without explicit approval

## Aggregate Verifier Command

```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Backend Build Command

```bash
npm --prefix backend run build
```

## First Paid Launch Docs List

- `docs/FIRST_PAID_LAUNCH_DAY_CHECKLIST.md`
- `docs/FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md`
- `docs/FIRST_PAID_LAUNCH_READY_RECAP.md`
- `docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md`
- `docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md`
- `docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md`
- `docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md`
- `docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Launch control center: `docs/FIRST_PAID_LAUNCH_CONTROL_CENTER.md` (primary operator-facing command center)
- Launch status contract: `backend/src/services/first-paid-launch-status-contract.service.ts` (test-safe status contract for future dashboard use)
- Execution pack: `docs/FIRST_PAID_LAUNCH_EXECUTION_PACK.md` (operator-facing execution checklist)

## First Paid Launch Verifier Scripts List

- `backend/scripts/verify-first-paid-launch-day-checklist-readonly.js`
- `backend/scripts/verify-first-paid-launch-operator-handoff-readonly.js`
- `backend/scripts/verify-first-paid-launch-ready-recap-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `backend/scripts/verify-sms-production-send-intent-bridge.js`
- `backend/scripts/verify-live-sms-approval-package-stale-readonly.js`

## Business Language Rules

Use:
- Founder-Led Launch Program
- book inspections / book appointments

## Forbidden Language Rules

Avoid old pilot language, quota-based appointment promises, job-booking language, and job/revenue guarantee wording.

## Live Automation Approval Rules

- Do not enable any production automation without explicit approval
- Before any live automation is turned on, confirm the approval, the launch scope, and the operator follow-up plan in writing
- No SMS/Twilio/Vapi/Calendar/Resend/Lindy production calls
- Step 66 production send intent bridge is verified fake-only and does not send SMS

## Recommended Next Build Direction

**Biggest coherent safe batch:** Create the first test-only Vapi payload ingestion dry-run script.

- Fake or explicitly approved sanitized payload only
- Gated behind `VAPI_INGESTION_TEST_MODE=1` + `--allow-vapi-test-ingestion` CLI flag
- Default = dry-run only (no writes)
- Include verifier, docs, and aggregate wiring
- No SMS, Twilio, Calendar, Resend, Lindy, or production automation

Keep all production sending disabled unless explicitly approved. Use: Founder-Led Launch Program + book inspections / book appointments.
## Latest Verified Milestone — Vapi Normalized Dry-Run Contract

Commit:
- `63a1a25 test(vapi): document and verify normalized dry-run contract`

Files changed:
- Added `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md`
- Strengthened `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`

What changed:
- Documented the normalized internal object emitted by `backend/scripts/vapi-test-payload-ingestion-dry-run.js`.
- Strengthened the Vapi dry-run verifier so all six fake/sanitized scenarios must emit the required normalized fields.
- The verifier now parses the normalized dry-run JSON output and checks field presence scenario-by-scenario.

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

Nullable field rules:
- `from` may be null only for `missing-phone`.
- `property_address` may be null only for `missing-address`.
- `appointment_suggested` may be null for unbooked or missing-field scenarios.

Verification passed before commit `63a1a25`:
- `node backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`
- `node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `npm --prefix backend run build`

Safety preserved:
- No live Vapi calls.
- No Supabase writes.
- No SMS/Twilio sends.
- No Calendar/Resend/Lindy activation.
- No routes.
- No cron/scheduler/dispatcher activation.
- Retell remains deprecated/disabled.

## Pending/Latest Build Direction — Vapi Scenario-Specific Contract Enforcement

The next Vapi hardening layer strengthens `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js` beyond field presence checks.

The verifier should enforce:
- `source = vapi`
- `test_only = true`
- `has_transcript` is boolean
- `ingested_at` is parseable
- `call_id` is fake/test-safe
- `from` is null only for `missing-phone`
- `property_address` is null only for `missing-address`
- `appointment_suggested` is null only for `unbooked-followup`, `missing-address`, or `missing-phone`
- `booked-inspection` includes a suggested appointment
- `emergency-leak` preserves emergency/high-urgency and leak semantics
- `insurance-storm` preserves insurance and storm/hail semantics

Safety remains unchanged: no live Vapi calls, no Supabase writes, no SMS/Twilio, no Calendar/Resend/Lindy activation, no routes, and no cron/scheduler/dispatcher activation.

## Latest Verified Source-of-Truth Update — Vapi Scenario Contract Enforcement

Latest verified source-of-truth commit:
- `3f280f3 docs(pilot): record vapi scenario contract enforcement`

Latest verified history:
- `3f280f3 docs(pilot): record vapi scenario contract enforcement`
- `9ddb8ec test(vapi): enforce scenario-specific dry-run contract`
- `2d8816a docs(pilot): record vapi normalized dry-run contract`
- `63a1a25 test(vapi): document and verify normalized dry-run contract`
- `2c516ec docs(pilot): fully refresh next chat context after vapi scenario hardening`
- `b3fc329 docs(pilot): record vapi scenario hardening in verifier index`
- `823c666 docs(pilot): record vapi scenario hardening in business guide`
- `d2ca159 docs(pilot): record vapi dry-run scenario hardening`

Recent Vapi contract milestones:
- `63a1a25` added `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md`.
- `63a1a25` strengthened `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js` to check required normalized fields across all six fake/sanitized Vapi scenarios.
- `2d8816a` recorded the normalized dry-run contract milestone in the context package, verifier index, and business guide.
- `9ddb8ec` strengthened the dry-run verifier again to enforce scenario-specific contract rules.
- `3f280f3` recorded the scenario-specific contract enforcement milestone in the business guide.

Scenario-specific verifier checks now include:
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

Verification passed before recent commits:
- `node backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`
- `node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `npm --prefix backend run build`

Current safe workflow reminder:
- Use VPS Terminal direct patches when exact edits are known.
- Use Telegram OpenClaw only when useful for larger code edits.
- Require meaningful diff, targeted grep/assertions, verifier output, build output, and final git state before commit/push.
- Preserve all live-production approval gates.

Safety unchanged:
- No live Vapi calls.
- No Supabase writes from Vapi flows.
- No SMS/Twilio sends.
- No Calendar/Resend/Lindy activation.
- No routes.
- No cron/scheduler/dispatcher activation.
- Retell remains deprecated/disabled.

## Verifier Guard Exact Required Strings

This section preserves exact strings required by `backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`.

- 5053554 docs(pilot): refresh context after vapi scenario contract enforcement
- scenario-specific verifier checks

## Workflow Rule Update — Combined Verify and Commit/Push

For safe RoofLeadHQ batches where verification is expected to pass, combine verification, commit/push, final fetch/status/log, and source-of-truth confirmation in one VPS Terminal command to save time.

Required before commit inside the combined command:
- `git diff --stat`
- `GIT_PAGER=cat git diff`
- targeted grep/assertion checks when applicable
- relevant verifier scripts
- `npm --prefix backend run build` when backend or aggregate readiness could be affected
- `git status --short`

The combined command should commit and push only after all required checks pass.

Still require explicit approval before:
- Live SMS/Twilio sends.
- Production DB writes beyond approved gated tests.
- Vapi/Calendar/Resend/Lindy production triggers.
- Public route/cron/scheduler/dispatcher activation.
- Secrets exposure.
- Destructive operations.
- Real Vapi payload collection.
- Ingesting real payloads, even sanitized ones.
- Anything outside the named scope.

## Current Safe Batch — Vapi Normalized Contract Doc Verifier

Added `backend/scripts/verify-vapi-normalized-contract-doc-readonly.js` as a read-only guard for `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md`.

The verifier checks:
- required normalized Vapi dry-run fields
- all six fake/sanitized scenarios
- scenario-specific verifier contract language
- nullable rules for `missing-phone`, `missing-address`, and `appointment_suggested`
- `emergency-leak` and `insurance-storm` semantics
- preserved safety posture:
  - no live Vapi calls
  - no Supabase writes
  - no SMS/Twilio sends
  - no Calendar/Resend/Lindy activation
  - no routes
  - no cron/scheduler/dispatcher activation

This remains documentation/read-only verification work only.

## Current Safe Batch — Vapi Scenario Sample Files Verifier

Added `backend/scripts/verify-vapi-scenario-samples-readonly.js` as a read-only guard for the six fake/sanitized Vapi scenario sample JSON files in `docs/samples`.

The verifier checks:
- all six `vapi-scenario-*.fake.json` files exist
- each scenario sample parses as JSON
- fake/test/sanitized/sample markers are present
- scenario semantics are preserved for:
  - `booked-inspection`
  - `unbooked-followup`
  - `missing-address`
  - `missing-phone`
  - `emergency-leak`
  - `insurance-storm`
- no production-looking secrets or live identifiers are present
- the dry-run ingestion script still references the scenario set

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Current Safe Batch — Vapi Dry-Run Output Snapshot Verifier

Added `backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js` as a read-only guard that executes all six fake/sanitized Vapi dry-run scenarios and validates normalized output snapshots.

The verifier checks:
- all six dry-run scenarios execute successfully with required test gates
- all required normalized fields are emitted
- `source` remains `vapi`
- `test_only` remains `true`
- `call_id` remains fake/test-safe
- `ingested_at` parses as a valid date
- `has_transcript` remains boolean
- nullable rules are preserved for:
  - `missing-phone`
  - `missing-address`
  - `appointment_suggested`
- scenario semantics remain intact for:
  - `booked-inspection`
  - `unbooked-followup`
  - `emergency-leak`
  - `insurance-storm`
- dry-run script fails closed without required gates
- `--scenario=value` and `--scenario value` produce equivalent normalized outputs

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Current Safe Batch — Vapi Dry-Run CLI Contract Verifier

Added `backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js` and updated `backend/scripts/vapi-test-payload-ingestion-dry-run.js` so scenario execution supports both `--scenario=value` and `--scenario value`.

The verifier checks:
- both CLI forms work for all six fake/sanitized scenarios
- both CLI forms load the same scenario-specific fake call id
- invalid scenarios fail closed
- missing gates fail closed
- outputs remain `source = vapi`
- outputs remain `test_only = true`
- scenario execution does not accidentally fall back to the default sample

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Current Safe Batch — Vapi Scenario Registry Consistency Verifier

Added `backend/scripts/verify-vapi-scenario-registry-readonly.js` as a read-only guard that keeps the six Vapi fake/sanitized scenario names and sample files aligned across scripts, verifiers, docs, and next-chat context.

The verifier checks:
- exact six-file `docs/samples/vapi-scenario-*.fake.json` registry
- every scenario sample parses as JSON
- every scenario sample remains visibly fake/sanitized
- dry-run `scenarioMap` contains exact scenario-to-file mappings
- dry-run verifier includes all six scenarios
- scenario samples verifier includes all six scenarios
- output snapshot verifier includes all six scenarios
- CLI contract verifier includes all six scenarios
- normalized contract doc includes all six scenarios
- verifier index, business guide, and next-chat context include all six scenarios
- safety markers remain documented

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Current Vapi Verifier Coverage Registry

The aggregate first paid pilot readiness gate includes and protects the current Vapi verifier registry:

- `verify-vapi-phone-lead-smoke-readonly.js`
- `verify-vapi-post-call-payload-discovery-readonly.js`
- `verify-vapi-raw-payload-capture-plan-readonly.js`
- `verify-vapi-sample-payload-mapping-readonly.js`
- `verify-vapi-missing-fields-readiness-gate-readonly.js`
- `verify-vapi-real-payload-collection-runbook-readonly.js`
- `verify-vapi-operator-payload-review-checklist-readonly.js`
- `verify-vapi-test-payload-ingestion-plan-readonly.js`
- `verify-vapi-test-payload-ingestion-dry-run-readonly.js`
- `verify-vapi-normalized-contract-doc-readonly.js`
- `verify-vapi-scenario-samples-readonly.js`
- `verify-vapi-dry-run-output-snapshots-readonly.js`
- `verify-vapi-dry-run-cli-contract-readonly.js`
- `verify-vapi-scenario-registry-readonly.js`
- `verify-vapi-aggregate-coverage-readonly.js`
- `verify-vapi-guard-layer-readonly.js`

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Current Safe Batch — Vapi Aggregate Verifier Coverage

Added `backend/scripts/verify-vapi-aggregate-coverage-readonly.js` as a read-only guard that verifies every `backend/scripts/verify-vapi-*-readonly.js` script is explicitly wired into aggregate first paid pilot readiness and documented in the verifier index and next-chat context.

The verifier checks:
- every expected Vapi verifier script exists
- every expected Vapi verifier is wired into aggregate readiness
- the expected Vapi verifier registry exactly matches actual `verify-vapi-*-readonly.js` files
- verifier index includes every expected Vapi verifier
- next-chat context includes every expected Vapi verifier
- aggregate readiness includes expected Vapi command names
- safety markers remain documented

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Current Safe Batch — Vapi Guard Layer Coverage

Added `backend/scripts/verify-vapi-guard-layer-readonly.js` as a read-only guard that verifies the Vapi guard-layer verifiers remain wired, documented, and safety-scoped.

The verifier checks:
- aggregate coverage verifier remains included
- scenario registry verifier remains included
- dry-run output snapshot verifier remains included
- dry-run CLI contract verifier remains included
- next-chat context and next-chat verifier preserve guard-layer markers
- guard-layer scripts preserve read-only safety markers
- downstream Vapi verifiers remain protected by aggregate coverage

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Latest added guard: critical file format integrity

The launch readiness stack now includes `backend/scripts/verify-critical-file-format-integrity-readonly.js`.

It protects critical verifier and launch documentation files from malformed patch regressions, including literal backslash-n artifacts, collapsed one-line JS verifier files, missing Node shebangs, and suspiciously low line counts.

This is read-only/test-only and does not activate live automation.

## Source-of-truth update: critical file format integrity guard

Latest verified source-of-truth commit:
- `6048d21 test(pilot): guard critical file format integrity`

This milestone added:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`

It is wired into:
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

It is documented in:
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`
- `docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`

The guard protects critical verifier and launch documentation files from:
- literal backslash-n artifacts
- collapsed one-line JS verifier files
- missing Node shebang
- suspiciously low line counts
- missing protected critical files

Verification/build passed before commit:
- `node backend/scripts/verify-critical-file-format-integrity-readonly.js`
- `node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `npm --prefix backend run build`

Safety remains demo-ready with live automation disabled.

## Source-of-truth update: latest context package guard

Latest verified source-of-truth commit:
- `9147664 test(pilot): guard critical file context package`

This docs-only milestone updated the next-chat context package after commit `6048d21`.

Critical file format integrity guard:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`
- Critical file format integrity
- Protects against literal backslash-n artifacts
- Protects against collapsed one-line JS verifier files
- Protects against missing Node shebang
- Protects against suspiciously low line counts

Safety remains:
- demo-ready with live automation disabled
- Retell remains deprecated/disabled
- No live Vapi webhook route
- No Vapi-to-Supabase writes
- No Vapi-to-SMS/Twilio sends
- No Vapi-to-Calendar booking activation
- No Resend/Lindy production activation from Vapi flows
- No route/cron/scheduler/dispatcher activation

## Source-of-truth update: latest milestones verifier protected

Latest verified source-of-truth commit:
- `61c09b5 test(pilot): guard latest context milestones`

This milestone added:
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`

It is wired into:
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

It is now protected by:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`

Purpose:
- Guard the next-chat context package so it records latest safe source-of-truth milestones.
- Preserve legacy-language safety.
- Preserve live-automation-disabled safety posture.

Safety remains demo-ready with live automation disabled.

## Source-of-truth update: handoff integrity aggregate

Latest safe build direction added:
- `backend/scripts/verify-handoff-integrity-readonly.js`

The handoff integrity aggregate runs:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`
- `backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`

It is wired into aggregate first-paid pilot readiness and remains read-only/test-only.

Safety remains demo-ready with live automation disabled.

## Source-of-truth update: handoff integrity aggregate committed

Latest verified source-of-truth commit:
- `61e13bb test(pilot): add handoff integrity aggregate`

This milestone added:
- `backend/scripts/verify-handoff-integrity-readonly.js`

It runs:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`
- `backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`

It is wired into:
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

It is protected by:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`

Purpose:
- Keep handoff/context package verification bundled.
- Prevent stale handoff context.
- Prevent critical verifier/doc formatting drift.
- Preserve safety posture before safe commit/push workflows.

Safety remains demo-ready with live automation disabled.

## Source-of-truth update: handoff integrity context guard

Latest verified source-of-truth commit:
- `5286ef3 test(pilot): require handoff integrity context`

This docs-only milestone recorded the handoff integrity aggregate context.

The dedicated handoff integrity context guard is:
- `backend/scripts/verify-handoff-integrity-context-readonly.js`

It verifies the context package includes:
- `backend/scripts/verify-handoff-integrity-readonly.js`
- handoff integrity aggregate
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`
- `backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- demo-ready with live automation disabled

It also blocks forbidden legacy/guarantee language.

## Source-of-truth update: handoff aggregate includes context guard

Latest verified source-of-truth commit:
- `133e5c0 test(pilot): guard handoff integrity context`

This milestone added:
- `backend/scripts/verify-handoff-integrity-context-readonly.js`

The handoff aggregate should now run:
- `backend/scripts/verify-critical-file-format-integrity-readonly.js`
- `backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`
- `backend/scripts/verify-handoff-integrity-context-readonly.js`

Safety remains demo-ready with live automation disabled.
