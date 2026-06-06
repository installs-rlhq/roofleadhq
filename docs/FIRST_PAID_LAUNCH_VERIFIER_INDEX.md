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
