# Native Workflow Fixture State Model Dry-Run

## 1. Purpose and Scope

This packet implements the **first local fixture-only fake-data dry-run** for the native workflow fixture state model. It proves deterministic fake-data native workflow state paths without using Supabase, production data, schema, migrations, auth/RLS, live sends, or external integrations.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### What this packet is

- local fixture-only dry-run implementation
- fake data only
- deterministic JSON stdout output
- read-only verifier
- dry-run wrapper
- first safe step from readiness planning into local-only fixture behavior

### What this packet is not

- This is **not** a production workflow engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that all 25 fixture state paths behave as planned before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`
- `docs/NATIVE_WORKFLOW_ENTITY_STATE_IMPLEMENTATION_PLAN.md`
- `docs/NATIVE_WORKFLOW_ENGINE_FOUNDATION_READINESS_PACKET.md`
- `docs/CSV_EXPORT_READINESS_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `scripts/run-native-workflow-fixture-state-model-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `19805f8 test(workflow): add native workflow fixture state model plan`

## 2. Safety Boundaries

- local fixture-only dry-run implementation
- local fake-data dry-run only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- **no Supabase** reads or writes
- **no schema** changes
- **no migrations**
- **no auth/RLS/security** changes
- **no production data** reads or writes
- **no live automation** activation
- **no integrations**
- **no external calls**
- **no bidirectional CRM integration**
- **no payment/deposit/invoice/estimate automation**
- no env/credential changes
- read-only verifier only
- dry-run wrapper only
- Live automation remains disabled unless Jason explicitly approves activation.

## 3. Dry-Run Runner Description

`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js` is a local Node.js script using only Node built-ins. It:

1. Uses only local fake fixture objects.
2. Does not import Supabase, Twilio, Vapi, Resend, Google, Lindy, CRM, or payment clients.
3. Does not read env credentials.
4. Does not perform file writes — console output only.
5. Does not call external services.
6. Produces deterministic JSON to stdout.
7. Includes summary counts and all 25 required scenario results.
8. Marks every scenario with `live_actions_performed: no`, `production_data_touched: no`, `external_services_called: no`.

Run directly:

```bash
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 4. Fixture-Only Fake-Data Principles

1. **Fake data only** — All fixture objects use fictional homeowner names, addresses, and contact details.
2. **No Supabase reads/writes** — Fixture paths operate in memory only.
3. **No live sends** — No SMS, email, voice, or calendar actions are performed.
4. **No external service calls** — No Twilio, Vapi, Resend, Google Calendar, Lindy, or other API calls.
5. **No scheduler/cron/dispatcher** — No background job execution.
6. **No bidirectional CRM integration** — CSV/reporting remains one-directional manual CRM/reference use only; not bidirectional CRM integration.
7. **No estimates/quotes/invoices/payments** — Fixture paths track estimate-needed and estimate-sent status only.
8. **Deterministic expected states** — Every fixture path produces repeatable local testing output.
9. **Unsafe actions fail closed** — Every unsafe action fails closed with HOLD/BLOCKED or dry-run-only output.
10. **Activation flags must default false** — Live send/action blocked if false.

## 5. Activation Flags Default False

All activation flags default to `false`:

| Flag | Default | Expected behavior when false |
| --- | --- | --- |
| live_sms_enabled | false | SMS send blocked; dry-run only |
| live_vapi_calls_enabled | false | Vapi call blocked; dry-run only |
| live_resend_email_enabled | false | Email send blocked; dry-run only |
| live_calendar_booking_enabled | false | Calendar booking blocked; manual fixture only |
| live_lindy_bridge_enabled | false | Lindy execution blocked |
| live_scheduler_enabled | false | Scheduler/cron blocked |
| live_csv_export_enabled | false | Live CSV export blocked; fixture snapshot only |
| live_crm_handoff_enabled | false | CRM handoff blocked |
| live_payment_or_invoice_enabled | false | Payment/invoice blocked |

Explicit Jason approval is required before any future live activation.

## 6. Required 25 Scenarios

| # | scenario_id | Expected final state |
| --- | --- | --- |
| 1 | normal_lead_to_appointment_readiness | APPOINTMENT_READY |
| 2 | missing_information_path | MISSING_INFO or HOLD |
| 3 | duplicate_review_path | DUPLICATE_REVIEW |
| 4 | bad_fit_excluded_path | BAD_FIT_OR_EXCLUDED |
| 5 | stopped_do_not_contact_path | STOPPED_DO_NOT_CONTACT |
| 6 | missed_lead_recovery_path | MISSED_LEAD_RECOVERY_ACTIVE |
| 7 | roofer_review_needed_path | ROOFER_REVIEW_NEEDED |
| 8 | roofleadhq_system_review_needed_path | ROOFLEADHQ_REVIEW_NEEDED |
| 9 | appointment_booked_path | APPOINTMENT_BOOKED |
| 10 | inspection_completed_path | INSPECTION_COMPLETED |
| 11 | inspection_missed_reschedule_path | RESCHEDULE_NEEDED |
| 12 | post_inspection_still_open_path | STILL_OPEN |
| 13 | estimate_needed_estimate_sent_tracking_path | ESTIMATE_SENT |
| 14 | homeowner_follow_up_needed_path | HOMEOWNER_FOLLOW_UP_NEEDED |
| 15 | roofer_follow_up_needed_path | ROOFER_FOLLOW_UP_NEEDED |
| 16 | feedback_permission_yes_path | FEEDBACK_CAPTURED |
| 17 | feedback_permission_no_path | FEEDBACK_CAPTURED |
| 18 | feedback_permission_not_asked_path | FEEDBACK_CAPTURED |
| 19 | csv_report_snapshot_fake_data_path | CSV_EXPORT_READY or REPORT_SNAPSHOT_READY |
| 20 | starter_plan_profile_path | APPOINTMENT_BOOKED (basic tracking) |
| 21 | growth_plan_profile_path | FEEDBACK_CAPTURED or POST_INSPECTION_OPEN |
| 22 | elite_plan_profile_path | CSV_EXPORT_READY |
| 23 | custom_review_500_plus_leads_path | CUSTOM_REVIEW_REQUIRED or HOLD |
| 24 | custom_review_two_plus_locations_path | CUSTOM_REVIEW_REQUIRED or HOLD |
| 25 | activation_flag_false_blocks_live_action_path | HOLD or BLOCKED |

Every scenario: `live_actions_performed: no`, `production_data_touched: no`, `external_services_called: no`, `result: PASS`.

## 7. Expected Output Shape

Top-level object:

- dry_run_name
- safety_posture (`demo_ready_with_live_automation_disabled`)
- implementation_scope
- source_of_truth_context
- activation_flags
- scenario_count
- passed_scenarios
- failed_scenarios
- scenarios
- aggregate_safety_assertions
- summary

Each scenario result:

- scenario_id
- scenario_name
- plan_profile
- input_fixture_summary
- starting_state
- transition_log
- guard_results
- final_state
- review_queue_items
- reporting_snapshot
- csv_snapshot_if_applicable
- activation_flag_results
- audit_events
- safety_assertions
- live_actions_performed
- production_data_touched
- external_services_called
- result

## 8. Review Queue Ownership Rules

### Roofer/contractor review owns

- pricing question
- estimate question
- quote request
- insurance complexity
- repair vs replacement question
- scheduling issue
- homeowner asks for roofer directly
- upset homeowner
- legal/insurance/carrier-specific question
- payment or invoice question
- contract question

### RoofLeadHQ/Jason review owns only

- bad or unclear AI response
- missed data capture
- broken routing
- duplicate lead confusion
- source attribution issue
- dashboard/report discrepancy
- workflow state confusion
- setup issue
- failed handoff
- quality-control concern

## 9. Plan Profile Behavior

Starter, Growth, Elite, and Custom Review are **plan configuration profiles**, not separate workflow engines.

- **Starter** — up to 100 leads/month; single location; basic reporting; no advanced/custom routing
- **Growth** — up to 300 leads/month; lead source tracking, missed lead recovery, post-inspection, feedback, CSV available in profile
- **Elite** — up to 500 leads/month; advanced reporting, deeper segmentation, larger review queue capacity; single location unless custom approved
- **Custom Review** — triggered by 500+ leads/month or 2+ locations; final state HOLD or CUSTOM_REVIEW_REQUIRED

## 10. Appointment Readiness Behavior

Fixture paths require homeowner contact data, service address, appointment preference, service-area fit, calendar owner known, routing reviewed, and plan profile known before APPOINTMENT_READY.

Expected states: APPOINTMENT_READINESS_PENDING, APPOINTMENT_READY, APPOINTMENT_NOT_READY, APPOINTMENT_BOOKED, APPOINTMENT_ISSUE, RESCHEDULE_NEEDED.

No live Google Calendar event creation is allowed. Use generic calendar owners such as **Main Sales Calendar** or **Acme Roofing Calendar** — not production-specific values.

## 11. Post-Inspection Behavior

Fixture paths track inspection completed, missed/reschedule, estimate needed/sent (tracking only), homeowner/roofer follow-up needed, and still-open outcomes.

No unattended estimate, quote, invoice, payment, or public review generation without roofer review.

## 12. Feedback and Permission Behavior

`permission_to_use_publicly` uses **yes**, **no**, or **not_asked** only. The field name `permissiontousepublicly` must not appear.

- **yes** — feedback captured; internal; public use eligible after review; no unattended public review publishing
- **no** — feedback captured; internal only
- **not_asked** — feedback captured or status known; PERMISSION_TO_USE_PUBLICLY_NOT_ASKED; internal only

## 13. Reporting/CSV Fake Snapshot Behavior

Scenario 19 includes a fake reporting snapshot with:

- total_leads
- booked_inspections
- inspection_completed
- still_open
- roofer_review_needed
- roofleadhq_review_needed
- feedback_captured
- csv_export_state

CSV snapshot includes fictional fields: lead_id, report_period, lead_created_date, homeowner_name, homeowner_phone, homeowner_email, service_address, lead_source, appointment_booked, appointment_status, post_inspection_status, feedback_captured, permission_to_use_publicly.

Boundaries:

- CSV is one-directional reporting/manual CRM/reference use.
- CSV export is **not bidirectional CRM integration**.
- CSV does not replace the roofer's CRM.
- CSV does not push data back to RoofLeadHQ.
- `live_csv_export_enabled: false` blocks delivery/export.

## 14. Local E2E Runner Relationship

The Local E2E Fixture Runner (`docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`) implements Stage 1 fixture dry-run. This dry-run implements the fuller 25-scenario fixture state model defined in `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`.

- Fixture outputs remain deterministic.
- Tests are runnable locally without credentials.
- Tests do not call Supabase or external services.
- Results support later sandbox/test-mode implementation and local E2E runner expansion.

## 15. First Paid Roofer Relationship

- first paid roofer manual operation can use these fixture paths as a reference.
- fixture learning should inform native implementation priorities.
- First-roofer operations should not wait for full native engine if manual bridge is safe.
- Live automation remains disabled unless explicitly approved.
- Lindy may assist temporarily where existing workflows are useful.
- Native records/states should become the long-term authority via Supabase source of truth.

## 16. Future Implementation Sequence

Suggested next sequence after this dry-run passes:

1. Expand local E2E fixture runner with state model assertions.
2. Add transition guard assertions in sandbox/test-mode.
3. Add plan profile fixture assertions.
4. Add review queue fixture assertions.
5. Add appointment readiness fixture assertions.
6. Add post-inspection/feedback fixture assertions.
7. Add reporting/CSV fake snapshot assertions.
8. Add activation-flag false blocking assertions in integration adapters.
9. Only after fixture model passes, consider schema/security/RLS readiness work.
10. Only after security review, consider native persistence.
11. Only after explicit approval, consider sandbox/test-mode integrations.

## 17. Forbidden/Preferred Language Guardrails

### Forbidden public language

Do not use in customer-facing materials:

- language that implies booking or closing roofing jobs for the roofer
- hard revenue outcome promises or guaranteed job counts
- hard appointment outcome promises
- unattended no-human-oversight claims
- two-way CRM integration claims
- fabricated endorsements or pressured public praise campaigns

### Preferred language

Use:

- booked inspections
- booked homeowner appointments
- lead-to-inspection
- missed-lead recovery
- automatic follow-up
- appointment readiness
- booked inspection tracking
- post-inspection follow-up
- post-inspection feedback capture
- weekly/monthly reporting
- CSV export
- roofer review
- contractor review
- guided setup
- fixture state model
- fake data
- native workflow engine
- Supabase source of truth
- plan configuration profiles
- staged E2E testing
- manual bridge
- dry-run only