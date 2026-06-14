# First Paid Launch Verifier Index

Date: 2026-06-05

## Purpose

This is the master index for the first paid launch verifiers in the RoofLeadHQ program.

Use it to review the local/read-only verification steps before the first contractor launch. These verifiers inspect local files and local status only. They make no Supabase reads or writes, no external service calls, and no live service activations.

## Public vs Internal Boundary (Source of Truth)

Public website/sales-facing copy, demo assets rendered on the public site, prospect/customer communications, and marketing materials MUST use ONLY the revised public direction: RoofLeadHQ AI turns roofing leads into booked inspections / booked homeowner appointments; Guided Setup happens first; 14-day trial begins after RoofLeadHQ AI setup goes live; automated email 2 days before first monthly payment; first monthly payment after the trial; Cancel anytime; No long-term contract. No Founder-Led Launch Program, no Request Founder-Led Launch Review, no founder review / manual review / manual coordination / Live Automation Disabled in public copy, no day-15 billing phrasing, no 7-day/5-qualified/14-day-launch-trial, no job-bookings / guaranteed / automatic-estimate/quote/invoice/payment claims.

Internal founder/operator/manual language (Founder-Led references, manual review, founder review queue, manual coordination, Live Automation Disabled notes, rehearsal fixtures, command packets, dry-run workspaces, operator runbooks, session notes, approval checklists, etc.) may remain in dry-run safety artifacts, internal packets, context docs, verifier index, and daily guide — but EVERY such artifact must explicitly state it is internal-only / dry-run / founder-operator-only and NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into website/index.html or outward-facing scripts. Context docs and this index restate the boundary so agents do not regress the public direction.

The Website Trial Direction Regression verifier (and prior website verifiers) enforce the boundary on public-facing files while permitting (and not policing) internal-only language inside safety artifacts.

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
- First Roofer Execution Day Runbook doc: `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- First Roofer Execution Day Runbook wrapper: `scripts/run-first-roofer-execution-day-dry-run.sh`
- First Roofer Execution Day Runbook verifier: `node backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js`
- First Roofer Day-One Command Center doc: `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- First Roofer Day-One Command Center wrapper: `scripts/run-first-roofer-day-one-command-center-dry-run.sh`
- First Roofer Day-One Command Center verifier: `node backend/scripts/verify-first-roofer-day-one-command-center-readonly.js`
- First Roofer Manual Communication Command Packet doc: `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- First Roofer Manual Communication Command Packet wrapper: `scripts/run-first-roofer-manual-communication-command-packet-dry-run.sh`
- First Roofer Manual Communication Command Packet verifier: `node backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js`
- First Roofer Inspection Coordination Command Packet doc: `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- First Roofer Inspection Coordination Command Packet wrapper: `scripts/run-first-roofer-inspection-coordination-command-packet-dry-run.sh`
- First Roofer Inspection Coordination Command Packet verifier: `node backend/scripts/verify-first-roofer-inspection-coordination-command-packet-readonly.js`
- First Roofer Appointment Readiness Command Packet doc: `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- First Roofer Appointment Readiness Command Packet wrapper: `scripts/run-first-roofer-appointment-readiness-command-packet-dry-run.sh`
- First Roofer Appointment Readiness Command Packet verifier: `node backend/scripts/verify-first-roofer-appointment-readiness-command-packet-readonly.js`
- First Roofer Appointment Outcome Command Packet doc: `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- First Roofer Appointment Outcome Command Packet wrapper: `scripts/run-first-roofer-appointment-outcome-command-packet-dry-run.sh`
- First Roofer Appointment Outcome Command Packet verifier: `node backend/scripts/verify-first-roofer-appointment-outcome-command-packet-readonly.js`
- First Roofer Manual Follow-Up Command Packet doc: `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- First Roofer Manual Follow-Up Command Packet wrapper: `scripts/run-first-roofer-manual-follow-up-command-packet-dry-run.sh`
- First Roofer Manual Follow-Up Command Packet verifier: `node backend/scripts/verify-first-roofer-manual-follow-up-command-packet-readonly.js`
- First Roofer Estimate / Next-Step Readiness Command Packet doc: `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`
- First Roofer Estimate / Next-Step Readiness Command Packet wrapper: `scripts/run-first-roofer-estimate-next-step-readiness-command-packet-dry-run.sh`
- First Roofer Estimate / Next-Step Readiness Command Packet verifier: `node backend/scripts/verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js`
- First Roofer Estimate Prep Command Packet doc: `docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md`
- First Roofer Estimate Prep Command Packet wrapper: `scripts/run-first-roofer-estimate-prep-command-packet-dry-run.sh`
- First Roofer Estimate Prep Command Packet verifier: `node backend/scripts/verify-first-roofer-estimate-prep-command-packet-readonly.js`
- First Roofer Contractor Estimate Review Command Packet doc: `docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md`
- First Roofer Contractor Estimate Review Command Packet wrapper: `scripts/run-first-roofer-contractor-estimate-review-command-packet-dry-run.sh`
- First Roofer Contractor Estimate Review Command Packet verifier: `node backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js`
- First Roofer Homeowner Clarification Command Packet doc: `docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md`
- First Roofer Homeowner Clarification Command Packet wrapper: `scripts/run-first-roofer-homeowner-clarification-command-packet-dry-run.sh`
- First Roofer Homeowner Clarification Command Packet verifier: `node backend/scripts/verify-first-roofer-homeowner-clarification-command-packet-readonly.js`
- First Roofer Homeowner Clarification Response Review Command Packet doc: `docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md`
- First Roofer Homeowner Clarification Response Review Command Packet wrapper: `scripts/run-first-roofer-homeowner-clarification-response-review-command-packet-dry-run.sh`
- First Roofer Homeowner Clarification Response Review Command Packet verifier: `node backend/scripts/verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js`
- First Roofer Manual Downstream Routing Command Packet doc: `docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md`
- First Roofer Manual Downstream Routing Command Packet wrapper: `scripts/run-first-roofer-manual-downstream-routing-command-packet-dry-run.sh`
- First Roofer Manual Downstream Routing Command Packet verifier: `node backend/scripts/verify-first-roofer-manual-downstream-routing-command-packet-readonly.js`
- Roofer Data Protection and Tenant Isolation Plan Placement Packet doc: `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md`
- Roofer Data Protection and Tenant Isolation Plan Placement Packet wrapper: `scripts/run-roofer-data-protection-tenant-isolation-plan-placement-packet-dry-run.sh`
- Roofer Data Protection and Tenant Isolation Plan Placement Packet verifier: `node backend/scripts/verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js`
- First Paid Roofer Prospect Pipeline / Tracker Packet doc: `docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md`
- First Paid Roofer Prospect Pipeline / Tracker Packet wrapper: `scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh`
- First Paid Roofer Prospect Pipeline / Tracker Packet verifier: `node backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js`
- First Paid Roofer Outreach Execution Kit doc: `docs/FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md`
- First Paid Roofer Outreach Execution Kit wrapper: `scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh`
- First Paid Roofer Outreach Execution Kit verifier: `node backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js`
- First Paid Roofer Sales Outreach System Packet doc: `docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md`
- First Paid Roofer Sales Outreach System Packet wrapper: `scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh`
- First Paid Roofer Sales Outreach System Packet verifier: `node backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js`
- First Paid Roofer Demo + Close Execution Kit doc: `docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md`
- First Paid Roofer Demo + Close Execution Kit wrapper: `scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh`
- First Paid Roofer Demo + Close Execution Kit verifier: `node backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js`
- First Paid Roofer Guided Setup Execution Kit doc: `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md`
- First Paid Roofer Guided Setup Execution Kit wrapper: `scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh`
- First Paid Roofer Guided Setup Execution Kit verifier: `node backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js`
- First Paid Roofer Go-Live Readiness Execution Kit doc: `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md`
- First Paid Roofer Go-Live Readiness Execution Kit wrapper: `scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh`
- First Paid Roofer Go-Live Readiness Execution Kit verifier: `node backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js`
- First Paid Roofer Trial Day-One Operating Kit doc: `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md`
- First Paid Roofer Trial Day-One Operating Kit wrapper: `scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh`
- First Paid Roofer Trial Day-One Operating Kit verifier: `node backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js`
- First Paid Roofer Trial Reporting + Success Review Kit doc: `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md`
- First Paid Roofer Trial Reporting + Success Review Kit wrapper: `scripts/run-first-paid-roofer-trial-reporting-success-review-kit-dry-run.sh`
- First Paid Roofer Trial Reporting + Success Review Kit verifier: `node backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js`
- First Paid Roofer Trial Conversion / Payment Handoff Kit doc: `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md`
- First Paid Roofer Trial Conversion / Payment Handoff Kit wrapper: `scripts/run-first-paid-roofer-trial-conversion-payment-handoff-kit-dry-run.sh`
- First Paid Roofer Trial Conversion / Payment Handoff Kit verifier: `node backend/scripts/verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js`
- First Paid Roofer First-Month Operating Kit doc: `docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md`
- First Paid Roofer First-Month Operating Kit wrapper: `scripts/run-first-paid-roofer-first-month-operating-kit-dry-run.sh`
- First Paid Roofer First-Month Operating Kit verifier: `node backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js`
- First Paid Roofer Monthly Success / Retention Kit doc: `docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md`
- First Paid Roofer Monthly Success / Retention Kit wrapper: `scripts/run-first-paid-roofer-monthly-success-retention-kit-dry-run.sh`
- First Paid Roofer Monthly Success / Retention Kit verifier: `node backend/scripts/verify-first-paid-roofer-monthly-success-retention-kit-readonly.js`
- First Paid Roofer Proof / Referral / Expansion Kit doc: `docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md`
- First Paid Roofer Proof / Referral / Expansion Kit wrapper: `scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh`
- First Paid Roofer Proof / Referral / Expansion Kit verifier: `node backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js`
- First Paid Roofer Launch System Packet doc: `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md`
- First Paid Roofer Launch System Packet wrapper: `scripts/run-first-paid-roofer-launch-system-packet-dry-run.sh`
- First Paid Roofer Launch System Packet verifier: `node backend/scripts/verify-first-paid-roofer-launch-system-packet-readonly.js`
- First Roofer Founder Review Queue Command Packet doc: `docs/FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md`
- First Roofer Founder Review Queue Command Packet wrapper: `scripts/run-first-roofer-founder-review-queue-command-packet-dry-run.sh`
- First Roofer Founder Review Queue Command Packet verifier: `node backend/scripts/verify-first-roofer-founder-review-queue-command-packet-readonly.js`
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

## Production Gate Check Script Packet

- Packet: `docs/FIRST_PAID_LAUNCH_PRODUCTION_GATE_CHECK_SCRIPT_PACKET.md`
- Gate script: `scripts/check-production-gates.sh`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-production-gate-check-script-packet-readonly.js`
- Aggregate readiness must include this verifier.
- Purpose: preserve disabled production gates for SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, and Retell route activation.
- Step 66 production send intent bridge remains present and guarded, but does not authorize live SMS sends.

## Roofer Dry-Run Intake Packet

- Packet: `docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_INTAKE_PACKET.md`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-roofer-dry-run-intake-packet-readonly.js`
- Purpose: define planning-only roofer intake requirements before dry-run onboarding workspace creation.
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.

## Roofer Dry-Run Workspace Template Packet

- Packet: `docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_TEMPLATE_PACKET.md`
- Templates:
  - `templates/roofer-dry-run-workspace/intake.md`
  - `templates/roofer-dry-run-workspace/safety-flags.env`
  - `templates/roofer-dry-run-workspace/README.md`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-template-packet-readonly.js`
- Purpose: standardize planning-only dry-run onboarding workspace files.
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.

## Roofer Onboarding Template Copy

- Script: `scripts/onboard-roofer.sh`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-roofer-onboarding-template-copy-readonly.js`
- Purpose: confirm dry-run onboarding workspaces are created from reusable templates.
- Workspace outputs:
  - `README.md`
  - `intake.md`
  - `safety-flags.env`
  - `activation-flags.env`
  - `workspace-metadata.env`
  - `onboarding-checklist.md`
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.

## Roofer Dry-Run Workspace Smoke Packet

- Packet: `docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_SMOKE_PACKET.md`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-smoke-readonly.js`
- Purpose: end-to-end smoke proof that `scripts/onboard-roofer.sh` creates and cleans up a planning-only dry-run workspace.
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.

## Roofer Dry-Run Workspace Sample Packet

- Packet: `docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_SAMPLE_PACKET.md`
- Fixture: `fixtures/roofer-dry-run-workspace/sample-roofer/`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-sample-packet-readonly.js`
- Purpose: maintain a known-good planning-only sample workspace for onboarding QA.
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.

## Roofer Dry-Run Workspace Comparison

- Packet: `docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_COMPARISON_PACKET.md`
- Read-only verifier: `backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js`
- Purpose: generate a fresh dry-run workspace and compare required structure and safety content against the known-good sample fixture.
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.


## Roofer Dry-Run Onboarding QA Wrapper

- Script: `backend/scripts/verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js`
- Wrapper: `scripts/qa-roofer-dry-run-onboarding.sh`
- Doc: `docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md`
- Scope: one-command local dry-run onboarding QA with production activation disabled.


## Roofer Dry-Run Operator Acceptance Checklist

- Doc: `docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js`
- Purpose: give the founder/operator a local PASS/HOLD/BLOCKED review before any roofer dry-run workspace moves toward real setup planning.
- Safety: no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, or production activation.


## Roofer Dry-Run First Roofer Setup Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js`
- Purpose: give the founder/operator a setup packet template after dry-run QA and acceptance review, before any real contractor setup planning.
- Safety: planning-only; no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, or production activation.


## Roofer Dry-Run First Roofer Readiness Packet QA

- Wrapper: `scripts/qa-first-roofer-readiness-packet.sh`
- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_READINESS_PACKET_QA.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js`
- Purpose: verify the combined dry-run planning chain from onboarding QA to operator acceptance checklist to first roofer setup packet.
- Safety: planning-only; no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, or production activation.


## Roofer Dry-Run First Roofer Manual Follow-Up Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js`
- Purpose: give the founder/operator a planning-only follow-up script and question checklist for HOLD or missing-information cases before real setup planning.
- Safety: planning-only; no SMS, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, or production activation.


## Roofer Dry-Run First Roofer Internal Handoff Summary Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_INTERNAL_HANDOFF_SUMMARY_PACKET.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js`
- Purpose: give the founder/operator a planning-only internal handoff summary before real first-roofer setup planning.
- Safety: planning-only; no SMS, calls, emails, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, or production activation.


## Roofer Dry-Run First Roofer Founder Review Decision Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_FOUNDER_REVIEW_DECISION_PACKET.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js`
- Purpose: give the founder/operator a planning-only PASS / HOLD / BLOCKED decision packet before real first-roofer setup planning.
- Safety: planning-only; no SMS, calls, emails, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, or production activation.


## Roofer Dry-Run First Roofer Manual Setup Planning Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_PACKET.md`
- Read-only verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js`
- Purpose: convert a founder/operator PASS decision into a planning-only manual setup checklist with explicit do-not-activate gates.
- Safety: planning-only; no SMS, calls, emails, Calendar, Vapi, Supabase writes, notifications, cron, scheduler, dispatcher, public routes, Retell route activation, destructive actions, secrets exposure, or production activation.

## First Roofer Manual Setup Planning QA Wrapper

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md`
- Wrapper: `scripts/qa-first-roofer-manual-setup-planning.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Safety: dry-run only; no SMS, calls, emails, Supabase writes, contractor/homeowner notifications, Calendar booking, Vapi/Retell production routes, cron, scheduler, dispatcher, public routes, secrets, or destructive actions.

## First Roofer Manual Setup Dry-Run Rehearsal

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md`
- Wrapper: `scripts/rehearse-first-roofer-manual-setup-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Safety: rehearsal-only and dry-run only; no SMS, calls, emails, Supabase writes, contractor/homeowner notifications, Calendar booking, Vapi/Retell production routes, cron, scheduler, dispatcher, public routes, secrets, or destructive actions.

## First Roofer Manual Setup Operator Runbook

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md`
- Wrapper: `scripts/run-first-roofer-manual-setup-operator-runbook-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-runbook-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Safety: operator-runbook-only and dry-run only; no SMS, calls, emails, Supabase writes, contractor/homeowner notifications, Calendar booking, Vapi/Retell production routes, cron, scheduler, dispatcher, public routes, secrets, or destructive actions.

## First Roofer Manual Setup Operator Acceptance

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-operator-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Safety: operator-acceptance-only and dry-run only; no SMS, calls, emails, Supabase writes, contractor/homeowner notifications, Calendar booking, Vapi/Retell production routes, cron, scheduler, dispatcher, public routes, secrets, or destructive actions.

- First Roofer Manual Setup Founder Approval
  - Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md`
  - Wrapper: `scripts/approve-first-roofer-manual-setup-founder-dry-run.sh`
  - Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js`
  - Purpose: Converts operator acceptance into a final internal founder/operator PASS, HOLD, or BLOCKED approval decision while remaining dry-run only and production-disabled.

- First Roofer Manual Setup Founder Approval Evidence
  - Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md`
  - Wrapper: `scripts/collect-first-roofer-manual-setup-founder-approval-evidence-dry-run.sh`
  - Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js`
  - Purpose: Collects internal dry-run evidence proving the founder approval decision is reviewable, grounded, and safe before any actual first-roofer manual setup work occurs.

- First Roofer Manual Setup Founder Approval Evidence QA
  - Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md`
  - Wrapper: `scripts/qa-first-roofer-manual-setup-founder-approval-evidence.sh`
  - Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-qa-readonly.js`
  - Purpose: Provides a one-command internal dry-run QA pass proving the founder approval evidence packet and upstream approval chain are reviewable before any actual first-roofer manual setup work occurs.

- First Roofer Manual Setup Final Go/No-Go
  - Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FINAL_GO_NO_GO.md`
  - Wrapper: `scripts/review-first-roofer-manual-setup-final-go-no-go-dry-run.sh`
  - Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-final-go-no-go-readonly.js`
  - Purpose: Provides a final internal dry-run PASS, HOLD, or BLOCKED decision gate before any actual first-roofer manual setup work occurs.

- First Roofer Manual Setup Execution Readiness
  - Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md`
  - Wrapper: `scripts/check-first-roofer-manual-setup-execution-readiness-dry-run.sh`
  - Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-execution-readiness-readonly.js`
  - Purpose: Converts final go/no-go PASS into a controlled internal dry-run founder/operator manual setup session readiness checklist.

- First Roofer Manual Setup Session Runbook
  - Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_RUNBOOK.md`
  - Wrapper: `scripts/run-first-roofer-manual-setup-session-runbook-dry-run.sh`
  - Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-runbook-readonly.js`
  - Purpose: Guides the first-roofer manual setup session as a controlled internal founder/operator dry-run procedure after execution readiness has passed.



## First Roofer Manual Setup Session Notes Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md`
- Wrapper: `scripts/record-first-roofer-manual-setup-session-notes-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-notes-readonly.js`
- Scope: dry-run-only internal founder/operator session notes for the first roofer manual setup session.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session QA Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_QA.md`
- Wrapper: `scripts/qa-first-roofer-manual-setup-session-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-qa-readonly.js`
- Scope: dry-run-only internal founder/operator QA for the first roofer manual setup session notes.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session QA Acceptance Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_QA_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-qa-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-qa-acceptance-readonly.js`
- Scope: dry-run-only internal founder/operator acceptance for the first roofer manual setup session QA.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Closeout Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_CLOSEOUT.md`
- Wrapper: `scripts/closeout-first-roofer-manual-setup-session-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-closeout-readonly.js`
- Scope: dry-run-only internal founder/operator closeout for the first roofer manual setup session.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Handoff Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_HANDOFF.md`
- Wrapper: `scripts/handoff-first-roofer-manual-setup-session-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-handoff-readonly.js`
- Scope: dry-run-only internal founder/operator handoff after the first roofer manual setup session closeout.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Handoff Acceptance Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_HANDOFF_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-handoff-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-handoff-acceptance-readonly.js`
- Scope: dry-run-only internal founder/operator acceptance after the first roofer manual setup session handoff.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Next Action Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NEXT_ACTION.md`
- Wrapper: `scripts/plan-first-roofer-manual-setup-session-next-action-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-next-action-readonly.js`
- Scope: dry-run-only internal founder/operator next action after handoff acceptance.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Next Action Acceptance Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NEXT_ACTION_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-next-action-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-next-action-acceptance-readonly.js`
- Scope: dry-run-only internal founder/operator acceptance for the next action after handoff acceptance.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Outcome Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OUTCOME.md`
- Wrapper: `scripts/record-first-roofer-manual-setup-session-outcome-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-outcome-readonly.js`
- Scope: dry-run-only internal founder/operator outcome after next action acceptance.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Outcome Acceptance Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OUTCOME_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-outcome-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-outcome-acceptance-readonly.js`
- Scope: dry-run-only internal founder/operator acceptance of the session outcome.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Final Summary Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY.md`
- Wrapper: `scripts/summarize-first-roofer-manual-setup-session-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-readonly.js`
- Scope: dry-run-only internal founder/operator final summary after outcome acceptance.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Final Summary Acceptance Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-final-summary-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-acceptance-readonly.js`
- Scope: dry-run-only internal founder/operator acceptance of the session final summary.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Archive Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE.md`
- Wrapper: `scripts/archive-first-roofer-manual-setup-session-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-readonly.js`
- Scope: dry-run-only internal founder/operator archive checkpoint after final summary acceptance.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Archive Acceptance Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-archive-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-acceptance-readonly.js`
- Scope: dry-run-only internal founder/operator acceptance of the session archive checkpoint.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.


## First Roofer Manual Setup Session Archive Final Check Packet

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_FINAL_CHECK.md`
- Wrapper: `scripts/check-first-roofer-manual-setup-session-archive-final-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-readonly.js`
- Scope: dry-run-only internal founder/operator final check after archive acceptance.
- Safety: no production activation, mutation, notification, route enablement, credential exposure, secret exposure, destructive action, or external send.

## First Roofer Manual Setup Session Archive Final Check Acceptance

- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-acceptance-readonly.js`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-archive-final-check-dry-run.sh`
- Packet: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_FINAL_CHECK_ACCEPTANCE.md`
- Purpose: verifies dry-run/internal-only founder/operator acceptance of the archive final-check packet.
- Safety: no live SMS/Twilio, no calls, no emails, no Supabase writes, no contractor/homeowner notifications, no Calendar booking, no Vapi production webhook ingestion, no Retell routes, no cron, no scheduler, no dispatcher, and no public route activation.

## First Roofer Manual Setup Session Completion Lock

- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-completion-lock-readonly.js`
- Wrapper: `scripts/lock-first-roofer-manual-setup-session-completion-dry-run.sh`
- Packet: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_COMPLETION_LOCK.md`
- Purpose: verifies dry-run/internal-only founder/operator completion lock after archive final-check acceptance.
- Safety: no live SMS/Twilio, no calls, no emails, no Supabase writes, no contractor/homeowner notifications, no Calendar booking, no Vapi production webhook ingestion, no Retell routes, no cron, no scheduler, no dispatcher, and no public route activation.

## First Roofer Manual Setup Session Completion Lock Acceptance

- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-completion-lock-acceptance-readonly.js`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-completion-lock-dry-run.sh`
- Packet: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_COMPLETION_LOCK_ACCEPTANCE.md`
- Purpose: verifies dry-run/internal-only founder/operator acceptance of the completion lock packet.
- Safety: no live SMS/Twilio, no calls, no emails, no Supabase writes, no contractor/homeowner notifications, no Calendar booking, no Vapi production webhook ingestion, no Retell routes, no cron, no scheduler, no dispatcher, and no public route activation.

## First Roofer Manual Setup Session Final Lock

- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-readonly.js`
- Wrapper: `scripts/lock-first-roofer-manual-setup-session-final-dry-run.sh`
- Packet: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_LOCK.md`
- Purpose: verifies dry-run/internal-only founder/operator final lock after completion lock acceptance.
- Safety: no live SMS/Twilio, no calls, no emails, no Supabase writes, no contractor/homeowner notifications, no Calendar booking, no Vapi production webhook ingestion, no Retell routes, no cron, no scheduler, no dispatcher, and no public route activation.

## First Roofer Manual Setup Session Final Lock Acceptance

### First Roofer Manual Setup Session Preservation Snapshot

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_PRESERVATION_SNAPSHOT.md`
- Wrapper: `scripts/snapshot-first-roofer-manual-setup-session-preservation-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-preservation-snapshot-readonly.js`
- Scope: dry-run/internal-only preservation snapshot for the fully accepted first roofer manual setup session chain.

- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-acceptance-readonly.js`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-final-lock-dry-run.sh`
- Packet: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_LOCK_ACCEPTANCE.md`
- Purpose: verifies dry-run/internal-only founder/operator acceptance of the final lock packet.
- Safety: no live SMS/Twilio, no calls, no emails, no Supabase writes, no contractor/homeowner notifications, no Calendar booking, no Vapi production webhook ingestion, no Retell routes, no cron, no scheduler, no dispatcher, and no public route activation.

### First Roofer Manual Setup Session Operator Handoff Freeze

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md`
- Wrapper: `scripts/freeze-first-roofer-manual-setup-session-operator-handoff-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js`
- Scope: dry-run/internal-only operator handoff freeze for the fully preserved first roofer manual setup session chain.

### First Roofer Manual Setup Session Reopen Guard

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD.md`
- Wrapper: `scripts/check-first-roofer-manual-setup-session-reopen-guard-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-readonly.js`
- Scope: dry-run/internal-only reopen guard for the fully accepted, preserved, and operator-handoff-frozen first roofer manual setup session chain.

### First Roofer Manual Setup Session Reopen Guard Acceptance

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-reopen-guard-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-acceptance-readonly.js`
- Scope: dry-run/internal-only founder/operator acceptance of the reopen guard for the fully accepted, preserved, and frozen first roofer manual setup session chain.

### First Roofer Manual Setup Session Reopen Guard Final Lock

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK.md`
- Wrapper: `scripts/lock-first-roofer-manual-setup-session-reopen-guard-final-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-readonly.js`
- Scope: dry-run/internal-only final lock for the accepted reopen guard and preserved first roofer manual setup session chain.

### First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance

- Doc: `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE.md`
- Wrapper: `scripts/accept-first-roofer-manual-setup-session-reopen-guard-final-lock-dry-run.sh`
- Verifier: `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js`
- Scope: dry-run/internal-only founder/operator acceptance of the reopen guard final lock for the preserved first roofer manual setup session chain.

- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-readonly.js` — verifies first roofer manual setup session reopen guard final lock acceptance preservation snapshot remains dry-run/internal-only and wired into readiness/context.

- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-readonly.js` — verifies `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT.md`, wrapper coverage, aggregate readiness wiring, and next-chat context references remain dry-run/internal-only.

Reopen guard final lock acceptance preservation snapshot integration text:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT.md`
- `scripts/snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-readonly.js`
- wired into aggregate readiness and next-chat context references
- safety remains dry-run/internal-only with no production automation activated


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE.md`
- `scripts/freeze-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-readonly.js`

Scope: dry-run/internal-only founder/operator handoff freeze for the reopen guard final lock acceptance preservation snapshot chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE.md`
- `scripts/archive-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-readonly.js`

Scope: dry-run/internal-only archive snapshot for the reopen guard final lock acceptance preservation snapshot operator handoff freeze chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE.md`
- `scripts/accept-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-readonly.js`

Scope: dry-run/internal-only acceptance for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK.md`
- `scripts/check-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-readonly.js`

Scope: dry-run/internal-only final check for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK.md`
- `scripts/lock-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-readonly.js`

Scope: dry-run/internal-only completion lock for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK.md`
- `scripts/lock-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-readonly.js`

Safety remains dry-run/internal-only/founder-operator-only. No production automation is activated.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Preservation Snapshot

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT.md`
- `scripts/snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js`

Scope: dry-run/internal-only preservation snapshot for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Preservation Snapshot Operator Handoff Freeze

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE.md`
- `scripts/freeze-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-freeze-readonly.js`

Scope: dry-run/internal-only operator handoff freeze for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Preservation Snapshot Operator Handoff Freeze Archive

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE.md`
- `scripts/archive-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-freeze-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-freeze-archive-readonly.js`

Scope: dry-run/internal-only archive for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot operator handoff freeze chain.


## First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Preservation Snapshot Operator Handoff Freeze Archive Acceptance

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE.md`
- `scripts/accept-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-freeze-archive-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-acceptance-readonly.js`

Scope: dry-run/internal-only archive acceptance for the reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot operator handoff freeze archive chain.


## First Roofer Manual Setup Session Extended Archive Final Check

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_FINAL_CHECK.md`
- `scripts/check-first-roofer-manual-setup-session-extended-archive-final-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-final-check-readonly.js`

Scope: dry-run/internal-only final check for the extended archive acceptance chain.


## First Roofer Manual Setup Session Extended Archive Completion Lock

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_COMPLETION_LOCK.md`
- `scripts/lock-first-roofer-manual-setup-session-extended-archive-completion-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-lock-readonly.js`

Scope: dry-run/internal-only completion lock for the extended archive final check chain.


## First Roofer Manual Setup Session Extended Archive Preservation Snapshot

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_PRESERVATION_SNAPSHOT.md`
- `scripts/snapshot-first-roofer-manual-setup-session-extended-archive-preservation-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-preservation-snapshot-readonly.js`

Scope: dry-run/internal-only preservation snapshot for the extended archive completion lock chain.


## First Roofer Manual Setup Session Extended Archive Operator Handoff Freeze

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_OPERATOR_HANDOFF_FREEZE.md`
- `scripts/freeze-first-roofer-manual-setup-session-extended-archive-operator-handoff-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-operator-handoff-freeze-readonly.js`

Scope: dry-run/internal-only operator handoff freeze for the extended archive preservation snapshot chain.


## First Roofer Manual Setup Session Extended Archive Acceptance Final Check

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_ACCEPTANCE_FINAL_CHECK.md`
- `scripts/check-first-roofer-manual-setup-session-extended-archive-acceptance-final-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-acceptance-final-check-readonly.js`

Scope: dry-run/internal-only acceptance final check for the extended archive operator handoff freeze chain.


## First Roofer Manual Setup Session Extended Archive Completion Final Lock

Files:
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_COMPLETION_FINAL_LOCK.md`
- `scripts/lock-first-roofer-manual-setup-session-extended-archive-completion-final-dry-run.sh`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-final-lock-readonly.js`

Scope: dry-run/internal-only completion final lock for the extended archive acceptance final check chain.

## First Roofer Execution Day Runbook

- Doc: `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- Wrapper: `scripts/run-first-roofer-execution-day-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: internal dry-run-only founder/operator execution day runbook for the first roofer after manual setup session chain completion. Records execution day procedure, note template, PASS/HOLD/BLOCKED decisions, and all dry-run safety flags.
- Safety: execution-day-runbook only and dry-run only. Does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose secrets, or run destructive actions. All flags: WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false. No live SMS/Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, public routes, or external notifications.

## First Roofer Execution Day Runbook Verifier

- Script: `backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js`
- Purpose: read-only guard that confirms the execution day runbook doc, wrapper, and cross-references in aggregate readiness, verifier index, and both next-chat context packages are present and preserve dry-run/internal-only/founder-operator-only posture.
- Required references enforced in: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`
- The verifier requires "first-roofer execution-day runbook" (and the three file paths + "First Roofer Execution Day Runbook") to be present in all four files.
- Safety: read-only. No production activation of any kind.

## First Roofer Lead-to-Inspection Ops Pack

- Doc: `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- Wrapper: `scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: product-moving operational packet that turns the first-roofer execution-day runbook into a practical founder/operator workflow for taking a first roofer lead from intake review through manual inspection/appointment coordination (book inspections / book appointments), outcome logging, and end-of-day reporting. Contains required sections (Product Outcome, Safety Posture, Lead Intake Review Workflow, Lead Completeness Checklist, Missing-Information Recovery Workflow, Founder/Operator Decision Log, Manual Homeowner/Contractor Communication Prep, Inspection or Appointment Coordination Tracker, Inspection Readiness Decision, Outcome Capture, End-of-Day Reporting Template, PASS/HOLD/BLOCKED Criteria, Next Build Recommendations), all required operational fields (lead source, homeowner name or placeholder, homeowner phone/email status, property address status, roof issue summary, urgency, insurance/storm context, photos status, appointment preference, service area fit, contractor availability, missing information, manual next action, owner, timestamp, inspection readiness status, appointment readiness status, outcome, next action), and all required templates (lead intake review, missing-information recovery, decision log, homeowner/contractor prep, inspection/appointment tracker, outcome capture, end-of-day report). Enforces manual founder/operator review and manual coordination only. References FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md and AGENT_PRODUCT_QUALITY_GATE.md.
- Safety: dry-run/internal-only/founder-operator-only. No live SMS/Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, public routes, production Supabase writes, external notifications, automated booking, or production credentials. No legacy pilot quota language, no job-booking or revenue guarantee language, and no live dispatch or production activation language.
- Verifier enforces: expected files, wrapper calls verifier + check-agent-product-quality-gate.sh, aggregate includes verifier, index references doc/wrapper/verifier, both next-chat contexts reference the pack, doc references runbook and quality gate, all required sections/fields/templates/PASS-HOLD-BLOCKED/safety language present with substance (not heading-only), forbidden language absent, no unsafe strings in wrapper.

## First Roofer Lead-to-Inspection Ops Pack Verifier

- Script: `backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js`
- Purpose: read-only guard that confirms the ops pack doc, wrapper, wiring into aggregate/index/both next-chat contexts, references to execution day runbook and quality gate, and that the doc contains all required sections, operational fields, templates, decision language, product language, and safety posture with substantive content.
- Required references enforced in: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`
- The verifier asserts all 19 required operational fields, 8 required templates, exact PASS/HOLD/BLOCKED strings, safety flags, and absence of forbidden/unsafe strings.
- Safety: read-only. No production activation of any kind.

## First Roofer Day-One Command Center

- Doc: `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- Wrapper: `scripts/run-first-roofer-day-one-command-center-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-first-roofer-day-one-command-center-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: product-moving operational packet that turns the first-roofer lead-to-inspection ops pack and execution-day runbook into a practical founder/operator day-one cockpit for the Founder-Led Launch Program. Enables manual run of the first roofer day from lead intake through inspection/appointment readiness (book inspections / book appointments via manual coordination only) and end-of-day reporting. Includes start-of-day readiness checklist, lead intake triage board, lead completeness and missing-information queue, homeowner manual communication prep, contractor manual communication prep, inspection readiness worksheet, appointment readiness worksheet, founder/operator decision log, manual coordination timeline, same-day escalation rules, end-of-day outcome capture, end-of-day reporting template, handoff notes for next operator session, and explicit no-live-automation confirmation. All steps use concrete fields (Lead ID, homeowner name, property address, lead source, source detail, service type, urgency, roof age if known, damage description, photos present: yes/no/unknown, insurance involvement: yes/no/unknown, contact permission status, missing fields, contractor match, manual messages prepared yes/no, inspection/appointment readiness decisions: PASS/HOLD/BLOCKED, founder/operator notes, end-of-day outcome). Enforces manual founder/operator review and manual coordination only. References lead-to-inspection ops pack, execution day runbook, and agent product quality gate.
- Safety: dry-run/internal-only/founder-operator-only. No live SMS/Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, public routes, production Supabase writes, external notifications, automated booking, or production credentials. No legacy pilot quota language, no job-booking or revenue guarantee language, and no live dispatch or production activation language.

## First Roofer Day-One Command Center Verifier

- Script: `backend/scripts/verify-first-roofer-day-one-command-center-readonly.js`
- Purpose: read-only guard that confirms the command center doc, wrapper, wiring into aggregate/index/both next-chat contexts, references to lead-to-inspection ops pack + execution day runbook + quality gate, and that the doc contains all required operational sections (Purpose and safety posture, Day-one command center overview, Start-of-day readiness checklist, Lead intake triage board, Lead completeness and missing-information queue, Homeowner manual communication prep, Contractor manual communication prep, Inspection readiness worksheet, Appointment readiness worksheet, Founder/operator decision log, Manual coordination timeline, BLOCKED / HOLD / PASS criteria, Same-day escalation rules, End-of-day outcome capture, End-of-day reporting template, Handoff notes for the next operator session, Explicit no-live-automation confirmation), concrete fields (not just headings), PASS/HOLD/BLOCKED criteria, homeowner and contractor prep, inspection and appointment readiness, end-of-day reporting, dry-run/internal-only/founder-operator-only posture, explicit no-live-automation / no production activation language, required business phrases (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, inspection readiness, appointment readiness), and absence of forbidden business phrases.
- Required references enforced in: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`
- The verifier asserts file existence, wrapper points to verifier + quality gate, aggregate/index/contexts wired, all listed sections with substantive content, concrete fields present, PASS/HOLD/BLOCKED present, safety and no-automation language, required phrases present, forbidden absent, and no unsafe strings in wrapper.
- Safety: read-only. No production activation of any kind.

## First Roofer Manual Communication Command Packet

- Doc: `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- Wrapper: `scripts/run-first-roofer-manual-communication-command-packet-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: product-moving operational packet that gives the founder/operator a dedicated command packet to manually prepare, review, approve, and track homeowner and contractor communication during the first roofer execution path (Founder-Led Launch Program). Enables manual communication intake, approval states (DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED), homeowner communication intake checklist, reusable draft-only templates for homeowner missing-information request / inspection readiness confirmation / appointment readiness confirmation / HOLD follow-up, contractor briefing checklist, contractor inspection coordination / appointment coordination / HOLD capacity check, explicit homeowner no-contact / consent HOLD rules, contractor capacity / service-area HOLD rules, founder/operator approval log, manual communication tracker (with external send performed: no and production system touched: no on every entry), escalation and HOLD/BLOCKED rules, outcome capture, end-of-day communication report, and handoff notes for next operator session. All templates and entries enforce draft-only until founder/operator manually approves and sends outside the system. The packet itself must never send. Supports inspection readiness and appointment readiness via manual coordination only (book inspections / book appointments). References day-one command center, lead-to-inspection ops pack, execution day runbook, and agent product quality gate.
- Safety: dry-run/internal-only/founder-operator-only. No live SMS/Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, public routes, production Supabase writes, external notifications, automated booking, or production credentials. Explicit external send performed: no and production system touched: no on all approvals, outcomes, and reports. No legacy pilot quota language, no job-booking or revenue guarantee language, and no live dispatch or production activation language.

## First Roofer Manual Communication Command Packet Verifier

- Script: `backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js`
- Purpose: read-only guard that confirms the packet doc, wrapper, wiring into aggregate/index/both next-chat contexts + workflow context, references to day-one command center + lead-to-inspection ops pack + execution day runbook + quality gate, and that the doc contains all required operational sections (Purpose and safety posture, Manual communication command overview, Communication approval states, Homeowner communication intake checklist, Homeowner missing-information request template, Homeowner inspection readiness confirmation template, Homeowner appointment readiness confirmation template, Homeowner no-contact / consent HOLD rules, Contractor briefing checklist, Contractor inspection coordination template, Contractor appointment coordination template, Contractor capacity / service-area HOLD rules, Founder/operator approval log, Manual communication tracker, Escalation and HOLD/BLOCKED rules, Outcome capture, End-of-day communication report, Handoff notes for the next operator session, Explicit no-live-send / no-live-automation confirmation), concrete fillable fields (not just headings), all homeowner and contractor templates with safety notes, approval states (DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED), consent/contact HOLD rules, service-area/capacity HOLD rules, approval log, tracker, inspection/appointment readiness language, end-of-day reporting, dry-run/internal-only/founder-operator-only posture, explicit no-live-send / no-live-automation / no production activation language, required business phrases (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, inspection readiness, appointment readiness, draft-only, approved for manual use, external send performed: no, production system touched: no), and absence of forbidden business phrases. Also asserts wrapper calls verifier + quality gate, no unsafe strings in wrapper, aggregate/index/contexts/workflow wired, and the two pre-push failure-class + finalize-script lessons are present in the agent workflow context package.
- Required references enforced in: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md`
- The verifier asserts file existence, wrapper points to verifier + quality gate, aggregate/index/contexts/workflow wired, all listed sections with substantive content and concrete fields, all templates with draft-only + never-send safety notes, approval states + HOLD rules + tracker + log present, readiness language + end-of-day report present, safety and no-automation language (including external send performed: no / production system touched: no), required phrases present, forbidden absent, and the two lessons preserved in workflow context.
- Safety: read-only. No production activation of any kind.

## Agent Product Quality Gate

- Packet: `docs/AGENT_PRODUCT_QUALITY_GATE.md`
- Wrapper: `scripts/check-agent-product-quality-gate.sh`
- Read-only verifier: `backend/scripts/verify-agent-product-quality-gate-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: reusable repo-controlled product-depth/quality standard and read-only verifier that future agent/Grok Build tasks must use before final review. Prevents shallow verifier-satisfying artifacts by enforcing operational usefulness (not just string presence), full operator/user workflows, data fields under sections, decision logs with PASS/HOLD/BLOCKED, templates, wiring, diff proof, Terminal 1 SOT, and safety posture.
- Records the lesson from the first Grok Build run (produced shallow artifact until verifier strengthened).
- Includes reusable checklist: product outcome, required operator/user workflow sections, required data fields, required decision logs, required templates, required PASS/HOLD/BLOCKED language, required safety boundaries, required forbidden language checks, required wiring checks, required diff proof, required final Terminal 1 source-of-truth verification.
- Includes examples of shallow checks to avoid (e.g., only checking that a heading exists) and stronger checks (e.g., requiring fields under sections).
- Includes explicit rule: agents must not pass product-moving tasks by creating only archive/lock/preservation layers.
- Enforces dry-run/internal-only safety: no live SMS/Twilio, no Vapi live calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials.
- Verifier asserts: all expected files, wrapper calls verifier, aggregate includes verifier, index references all three, agent contracts/templates reference gate, next-chat references gate, doc contains checklist/lesson/examples/archive warning/safety, forbidden business language absent, no unsafe strings (twilio.messages.create, supabase.from(, resend..., etc.) in wrapper.
- Safety: read-only verification and internal planning only. Stops after gates + diff proof. No live automation, no commits/pushes from agent worktrees.

## Agent Product Quality Gate Verifier

- Script: `backend/scripts/verify-agent-product-quality-gate-readonly.js`
- Purpose: read-only guard that asserts the complete Agent Product Quality Gate packet (doc + wrapper + verifier) is present, correctly wired into aggregate/index/next-chat/agent docs, and that the doc itself contains the product-depth rule, checklist categories, first-Grok-Build lesson, shallow vs stronger check examples, archive/lock-only warning, and required safety language. Also asserts absence of forbidden guarantee language and absence of unsafe implementation strings inside the wrapper.
- Safety: read-only. No production activation of any kind.

## Website Founder-Led Launch Copy Cleanup Packet

- Packet: `docs/WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md`
- Wrapper: `scripts/run-website-founder-led-launch-copy-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-website-founder-led-launch-copy-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: website-only public copy, positioning, flow, and conversion path cleanup for the Founder-Led Launch Program. Makes the site safer and ready to support first paid roofer outreach without overclaiming or implying production automation. Repositions as founder-led lead response and inspection coordination workflow. Uses "Founder-Led Launch Program", "book inspections", "book appointments", "manual founder/operator review", "manual coordination". Safer lower-friction CTAs: "Request Founder-Led Launch Review", "See if RoofLeadHQ is a fit", "Talk with the founder", "Start with a manual setup review". Adds/refines FAQ for now-vs-later and explicit approval safety/trust copy. Removes all risky automated/guarantee/quote/invoice/payment/booking claims.
- Verifier asserts: required safe phrases present in website/index.html, forbidden/risky phrases absent from index.html + changed public docs (packet), no backend/src routes/controllers/services modified, no migration/schema/auth/secrets/env files modified, references in aggregate/index/next-chat contexts/daily guide/workflow, wrapper calls verifier + quality gate, clear PASS.
- Safety: website/copy/docs/read-only verifier changes only. No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher. No public route activation, production Supabase writes, credentials, auth, schema, migrations, secrets, access-control, notifications (any), automated booking/estimate/quote/invoice/payment, or external service calls. No implication of live production workflows or fully automated operations. Positioning remains founder-led, manual-review-backed, and manually coordinated. Live workflow activation only after explicit approval/readiness.
- Verification (pre-commit): node --check backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; node backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; scripts/run-website-founder-led-launch-copy-dry-run.sh ; node backend/scripts/verify-agent-product-quality-gate-readonly.js ; npm --prefix backend run build ; scripts/show-diff-proof.sh
- Commit: test(website): add founder-led launch copy cleanup (inside worktree only; do not push)

## Website Founder-Led Launch Conversion Polish Packet

- Packet: `docs/WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET.md`
- Wrapper: `scripts/run-website-founder-led-conversion-polish-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-website-founder-led-conversion-polish-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: polish the public homepage copy after the founder-led launch safety cleanup. Make the site sound more natural, credible, and conversion-oriented for first paid roofer outreach. Keep all safety/verifier protections and founder-led/manual-review-backed/manual-coordination positioning. Primary file: website/index.html. Smoothed awkward copy (fast response support, excessive manual repetition, prepared under manual coordination, comparison phrasing, section titles, popup aria-label, footer link), improved hero/FAQ clarity, preserved required safe phrases, enforced absence of listed polish leftovers.
- Verifier asserts: required safe phrases (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination, Request Founder-Led Launch Review, See if RoofLeadHQ is a fit) present in website/index.html; polish-specific phrases absent (Book a Founder-Led Setup Call form, Appointment Booking, Calls Answered When You Cannot Pick Up, Turn Outside Leads Into Follow-Up Sequences, Why Roofers Trust RoofLeadHQ, First-Month Confidence Commitment, fast response support, prepared under manual coordination); prior forbidden also remain absent; no backend/src, migrations, schema, auth, secrets, env modified (git + constraints); wiring/references present; combined launch+polish+quality gate checks; clear PASS.
- Safety: website/copy/docs/read-only verifier changes only. No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher. No public route activation, production Supabase writes, credentials, auth, schema, migrations, secrets, access-control, notifications (any), automated booking/estimate/quote/invoice/payment, or external service calls. No implication of live production workflows or fully automated operations. Positioning remains founder-led, manual-review-backed, and manually coordinated. Live workflow activation only after explicit approval/readiness.
- Verification (pre-commit): node --check backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; node backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; node --check backend/scripts/verify-website-founder-led-conversion-polish-readonly.js ; node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js ; scripts/run-website-founder-led-launch-copy-dry-run.sh ; node backend/scripts/verify-agent-product-quality-gate-readonly.js ; npm --prefix backend run build ; scripts/show-diff-proof.sh
- Commit: test(website): polish founder-led launch conversion copy (inside worktree only; do not push)

## Website Demo Screenshot Assets Packet

- Packet: `docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md`
- Wrapper: `scripts/run-website-demo-screenshot-assets-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-website-demo-screenshot-assets-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: Create static, screenshot-ready demo pages (Dashboard, Weekly Report, Monthly Report) under website/demo/ using only dummy/sample data for marketing screenshots. Fake roofer: Front Range Roofing Co. Visible SAMPLE DATA / DEMO PREVIEW labeling on every page. All framing uses Founder-Led Launch Program, manual founder/operator review, manual coordination, inspection coordination, READY FOR FOUNDER REVIEW, live automation disabled notes. No live APIs, tokens, external calls, production behavior, or customer data. Optional shared demo.css for consistent static styling.
- Verifier asserts: all three HTML pages exist; visible sample/demo labeling in each; Founder-Led Launch Program present in each; dashboard contains required metrics/review queue/manual coordination/live automation disabled/inspection coordination/READY FOR FOUNDER REVIEW language; weekly contains weekly report/sample metrics/leads needing attention/recommended manual actions; monthly contains monthly report/month-to-date/source mix/manual review outcomes/recommended adjustments; all forbidden phrases absent (guarantee/guaranteed (historical reference only; removed from public), automatically, invoice/payment/quote/estimate, forbidden outcome-language variants, production/live automation active, instant SMS, calendar appointment booking); no external call strings (fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy) in demo pages or verifier/wrapper; no backend/src routes/controllers/services modified and no migration/schema/auth/secrets/env modified (git + constraints); wiring/references present; combined prior website verifiers + quality gate + new verifier checks; clear PASS summary.
- Safety: static website/demo/docs/read-only verifier changes only. No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher. No public route activation beyond static demo files. No production Supabase reads/writes, credentials, auth, schema, migrations, secrets, access-control, notifications (any), automated booking/estimate/quote/invoice/payment, or external service calls. No implication of live production workflows or fully automated operations. All content explicitly labeled sample/demo. Positioning remains founder-led, manual-review-backed, and manually coordinated. Use for marketing screenshots only.
- Verification (pre-commit): node --check backend/scripts/verify-website-demo-screenshot-assets-readonly.js ; node backend/scripts/verify-website-demo-screenshot-assets-readonly.js ; scripts/run-website-demo-screenshot-assets-dry-run.sh ; node backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js ; node backend/scripts/verify-agent-product-quality-gate-readonly.js ; npm --prefix backend run build ; scripts/show-diff-proof.sh
- Commit: test(website): add demo screenshot assets (inside worktree only; do not push)

## Website Homepage Screenshot Placement Packet

- Packet: `docs/WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET.md`
- Wrapper: `scripts/run-website-homepage-screenshot-placement-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-website-homepage-screenshot-placement-readonly.js`
- Website Positioning Recovery Packet: `docs/WEBSITE_POSITIONING_RECOVERY_PACKET.md`
- Website Positioning Recovery wrapper: `scripts/run-website-positioning-recovery-dry-run.sh`
- Website Positioning Recovery read-only verifier: `backend/scripts/verify-website-positioning-recovery-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: Place the final Growth Tier screenshot assets (dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png) directly into the public homepage (website/index.html) Inside RoofLeadHQ screenshots section (the dashboard/reporting showcase). Replaces prior placeholder or mismatched demo image references with the actual uploaded final screenshots. Headings/labels aligned cleanly to Dashboard / Weekly Reports / Monthly Reports (or close equivalents). Uses exact required alt text. Preserves all Founder-Led Launch Program public copy, conversion polish, and safety framing. Layout kept clean with no bulky text additions. PNGs used exactly as provided in website/ root (no renames/moves/modifications to image contents).
- Verifier asserts: website/index.html references all three PNGs; the three PNG files exist in website/; homepage alt text includes the required "Sample Growth Tier dashboard/weekly/monthly report preview" descriptions; no backend/src routes/controllers/services modified; no migration/schema/auth/secrets/env files modified; no external service call strings added in this build; wiring/references present in aggregate + verifier index + next-chat contexts + workflow + daily guide; prior website verifiers + new verifier + quality gate for baseline; clear PASS summary.
- Safety: website/copy/static-asset/reference + docs/read-only verifier changes only. No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher. No production Supabase reads/writes, credentials, auth, schema, migrations, secrets, access-control, notifications (any), automated booking/estimate/quote/invoice/payment, or external service calls. No implication of live production workflows or fully automated operations. Positioning remains founder-led, manual-review-backed, and manually coordinated. Final screenshots for public homepage marketing use only.
- Verification (pre-commit): node --check backend/scripts/verify-website-homepage-screenshot-placement-readonly.js ; node backend/scripts/verify-website-homepage-screenshot-placement-readonly.js ; scripts/run-website-homepage-screenshot-placement-dry-run.sh ; node backend/scripts/verify-website-demo-screenshot-assets-readonly.js ; node backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js ; node backend/scripts/verify-agent-product-quality-gate-readonly.js ; npm --prefix backend run build ; scripts/show-diff-proof.sh
- Commit: test(website): place homepage growth tier screenshots (inside worktree only; do not push)

## Website Copy/Layout Polish Packet

- Packet: `docs/WEBSITE_COPY_LAYOUT_POLISH_PACKET.md`
- Wrapper: `scripts/run-website-copy-layout-polish-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-website-copy-layout-polish-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: Apply founder review corrections to public website copy and layout for clarity, reduced repetition, visual polish, and alignment with RoofLeadHQ AI vision (AI books homeowner appointments on the roofer’s calendar after Guided Setup + simple 14-day trial; no founder babysitting language in public; no day-15 billing phrasing; no guarantees). Changes are website/index.html + styles.css + docs/verifiers only. Preserve the three Growth Tier PNG screenshot references exactly (no image content changes). Update existing verifiers only as necessary to drop removed language requirements while keeping all safety checks (guarantees, job/revenue claims, live automation, founder/operator public language) strong.
- Verifier asserts: website/index.html includes "books homeowner appointments on your calendar", "Qualified leads booked on your calendar", "14-day trial", "first monthly payment", "automated email", "2 days before", "A typical custom setup process can be completed within 48 hours", "Manual Outreach support is built for the leads that do not arrive neatly through your website", "RoofLeadHQ is customized to fit your business needs", and the three PNGs; does NOT include any forbidden phrases (Founder-Led Launch Program, Request Founder-Led Launch Review, manual coordination/founder/operator review/review queue, Live Automation Disabled, guaranteed (historical reference only; removed from public)-jobs (historical reference only; removed)/revenue/appointments, 5 qualified/7-day-pilot (historical reference only; removed from public per founder review), legacy job-booking wording (historical reference only; removed from public copy), 14-day launch trial, Monthly billing starts/on day 15 variants, No ongoing founder babysitting required, You book the inspection); pricing no longer contains Starter "Up to 100 leads/mo." pill or the removed one-time+day-15 sentence; comparison table has RoofLeadHQ checkmark/check indicator class or markup; no backend/src routes/controllers/services modified; no migration/schema/auth/secrets/env modified; no external service call strings added; wiring/references present; prior website verifiers + quality gate; clear PASS summary.
- Safety: website/static copy/CSS/docs/read-only verifier changes only. No PNG contents modified. dashboard/weekly/monthly-sample.png references preserved exactly. No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher. No production Supabase reads/writes. No backend/src, auth, policy, migration, schema, secrets, or access-control changes. No external service calls. No production activation. Internal safety posture (demo-ready/live automation disabled) preserved. Public copy uses only allowed concepts (RoofLeadHQ AI, automated follow-up, fast response, missed lead recovery, booked homeowner appointments/booked inspections, 14-day trial, automated email 2 days before first monthly payment, Guided Setup, onboarding specialist, cancel anytime, no long-term contract). No guaranteed (historical reference only; removed from public)-jobs (historical reference only; removed)/revenue/appointment counts or production claims.
- Verification (pre-commit): node --check backend/scripts/verify-website-copy-layout-polish-readonly.js ; node backend/scripts/verify-website-copy-layout-polish-readonly.js ; scripts/run-website-copy-layout-polish-dry-run.sh ; node backend/scripts/verify-website-positioning-recovery-readonly.js ; node backend/scripts/verify-website-homepage-screenshot-placement-readonly.js ; node backend/scripts/verify-website-demo-screenshot-assets-readonly.js ; node backend/scripts/verify-website-founder-led-launch-copy-readonly.js ; node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js ; node backend/scripts/verify-agent-product-quality-gate-readonly.js ; npm --prefix backend run build ; scripts/show-diff-proof.sh
- Commit: test(website): polish public copy and layout (inside worktree only; do not push)

## Website Trial Direction Regression Packet

- Packet: `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md`
- Wrapper: `scripts/run-website-trial-direction-regression-dry-run.sh`
- Read-only verifier: `backend/scripts/verify-website-trial-direction-regression-readonly.js`
- Aggregate readiness: wired through `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Purpose: Audit current public website against the revised direction and install a dedicated regression guard so the public positioning cannot drift back to Founder-Led Launch Program language, day-15 billing, guarantees, job-bookings claims, auto-*/pilot language, or founder/manual babysitting framing. Enforces: website/index.html must contain the full revised 14-day trial direction (14-day trial begins after RoofLeadHQ AI setup goes live; automated email 2 days before first monthly payment; first payment after trial; Guided Setup first; RoofLeadHQ AI + booked inspections / booked homeowner appointments; cancel anytime; no long-term contract). Fails any public-facing website file (index.html + the 3 demo/*.html used for public screenshots) containing the forbidden list (Founder-Led Launch Program, Request Founder-Led Launch Review, founder review, manual review, manual coordination, Live Automation Disabled, Monthly billing starts on day 15 / on day 15, 14-day launch trial, seven-day pilot, five-qualified-appointment short-window claim, job-booking claims / job-booking claims / job-booking, guaranteed appointments/revenue/jobs, automatic estimate/quote/invoice/payment). Explicitly distinguishes public website/sales-facing copy from internal safety docs: internal founder/operator/manual language may remain in dry-run safety artifacts (packets, runbooks, fixtures, contexts) but context docs + this index must state it is internal-only and not public positioning. Public/business language (used in all customer-facing and prospect communications) and No public founder-led/manual babysitting positioning is used for prospects. Internal founder/operator/manual language may remain in dry-run safety artifacts but must be labeled internal-only and not public positioning. Fails if wrapper missing or not executable or wiring incomplete. Read-only. Website/docs/verifier-only; no public file patches required (state was already compliant); no backend/src, schema, auth, secrets, external, or production activation.
- Verifier asserts: required revised trial direction + AI + booked appointment phrases present in website/index.html; all forbidden public phrases absent from public-facing website files; wrapper exists + executable; wiring present in aggregate + this index + 3x NEXT_CHAT + daily guide; boundary clarifications present in the 5 context/index docs; packet contains safety + revised direction language + public-vs-internal notes; no backend/src etc modified; prior website verifiers chained in wrapper; clear PASS.
- Safety: website/demo/docs/read-only verifier + aggregate/index/context wiring only. No PNG contents modified. No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher. No production Supabase reads/writes, credentials, auth/RLS, schema, migrations, secrets, contractor portal, payment automation, or public route activation. Public copy protected at the revised AI + 14-day trial + automated 2-day email + cancel/no-contract direction. Internal founder/manual language scoped to dry-run safety artifacts with explicit internal-only labels (never copied to public surfaces).
- Verification (pre-commit): node --check backend/scripts/verify-website-trial-direction-regression-readonly.js ; node backend/scripts/verify-website-trial-direction-regression-readonly.js ; scripts/run-website-trial-direction-regression-dry-run.sh ; node backend/scripts/verify-agent-product-quality-gate-readonly.js ; npm --prefix backend run build
- Commit: test(website): add website trial direction regression packet (inside worktree only; do not push)
