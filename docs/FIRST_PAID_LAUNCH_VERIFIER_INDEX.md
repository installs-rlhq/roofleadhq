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
