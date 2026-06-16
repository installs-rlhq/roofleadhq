# Native Workflow Fixture Guard Assertions Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic guard assertion coverage across all 25 fixture scenarios. It deepens guard enforcement in scenario outputs without adding production behavior, persistence, or live automation.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### What this packet is

- local fixture-only dry-run expansion
- fake data only
- explicit guard assertion coverage in scenario outputs
- aggregate guard assertion summary
- read-only verifier
- dry-run wrapper

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

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that all 25 fixture scenarios include explicit guard assertions, safely routed guard failures, and aggregate guard coverage before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_ENTITY_STATE_IMPLEMENTATION_PLAN.md`
- `docs/NATIVE_WORKFLOW_ENGINE_FOUNDATION_READINESS_PACKET.md`
- `docs/CSV_EXPORT_READINESS_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `scripts/run-native-workflow-fixture-guard-assertions-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `11ac75d test(workflow): add native workflow fixture state model dry run`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run (`docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`) without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- per-scenario `guard_assertions`, `failed_guards`, `hold_or_block_reason`, `manual_next_step`, `owner`
- top-level `guard_assertion_summary`, `total_guard_assertions`, `passed_guard_assertions`, `failed_guard_assertions`, `guard_categories`, `fail_closed_assertions`

All 25 scenarios, transition logs, and existing output fields remain intact.

## 3. Safety Boundaries

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

## 4. Guard Assertion Categories

| Category | Purpose |
| --- | --- |
| contact_permission_guards | Contact permission known or safely routed to hold/review |
| do_not_contact_guards | Do-not-contact respected; follow-up blocked |
| required_contact_data_guards | Missing required contact data routes to MISSING_INFO or HOLD |
| service_area_guards | Service area checked; exclusions route to BAD_FIT_OR_EXCLUDED |
| lead_source_guards | Lead source captured; duplicates route to DUPLICATE_REVIEW |
| plan_profile_guards | Plan profile known; Starter/Growth/Elite volume limits enforced |
| custom_review_trigger_guards | Custom review triggers for volume, locations, calendars, phones, reps |
| appointment_readiness_guards | Appointment readiness prerequisites before APPOINTMENT_READY |
| review_ownership_guards | Roofer vs RoofLeadHQ review ownership boundaries |
| feedback_permission_guards | Feedback permission, no unattended public review publishing |
| csv_reporting_guards | CSV one-directional export, fake data only, PII warnings |
| activation_flag_guards | Activation flags default false; live actions blocked |
| unsupported_request_guards | Unsupported requests route to hold/review; no live action |
| lindy_bridge_safety_guards | Lindy bridge reference only; not source of truth |

## 5. Required Guard Assertions

### Contact / permission

- contact_permission_known_or_reviewed
- contact_permission_unknown_routes_to_hold_or_review
- do_not_contact_respected
- do_not_contact_blocks_follow_up
- missing_required_contact_data_routes_to_missing_info_or_hold

### Lead / source / service area

- service_area_checked
- excluded_service_area_routes_to_bad_fit_or_excluded
- lead_source_captured_or_marked_unknown
- lead_source_unknown_allowed_only_with_review_or_unknown_marker
- duplicate_lead_routes_to_duplicate_review

### Plan / custom review

- plan_profile_known
- starter_volume_limit_enforced
- growth_volume_limit_enforced
- elite_volume_limit_enforced
- custom_review_trigger_500_plus_leads
- custom_review_trigger_two_plus_locations
- custom_review_trigger_multiple_calendars
- custom_review_trigger_multiple_phone_numbers
- custom_review_trigger_multiple_sales_reps

### Appointment readiness

- appointment_calendar_preferences_required_before_appointment_ready
- calendar_owner_required_before_appointment_ready
- service_area_fit_required_before_appointment_ready
- appointment_ready_blocked_when_required_fields_missing
- no_live_calendar_creation_when_appointment_booked

### Review ownership

- roofer_review_required_for_pricing
- roofer_review_required_for_estimate_or_quote
- roofer_review_required_for_insurance_complexity
- roofer_review_required_for_payment_or_contract_questions
- roofleadhq_review_limited_to_system_workflow_data_routing_quality
- roofleadhq_review_required_for_broken_routing_or_data_issue

### Post-inspection / feedback

- estimate_tracking_does_not_generate_estimate
- post_inspection_follow_up_draft_or_manual_only
- feedback_public_use_permission_checked
- permission_to_use_publicly_allows_only_yes_no_not_asked
- no_fake_reviews
- no_review_farming
- no_automatic_public_review_generation

### CSV / reporting

- csv_generated_only_from_fake_or_approved_records
- csv_export_is_one_directional
- csv_not_native_crm_sync
- csv_contains_homeowner_personal_information_warning
- customer_responsible_for_downloaded_exported_data
- roi_depends_on_customer_provided_spend_source_data

### Activation flags / live actions

- activation_flags_default_false
- live_sms_blocked_when_flag_false
- live_vapi_blocked_when_flag_false
- live_resend_blocked_when_flag_false
- live_calendar_blocked_when_flag_false
- live_lindy_bridge_blocked_when_flag_false
- live_scheduler_blocked_when_flag_false
- live_csv_delivery_blocked_when_flag_false
- live_crm_handoff_blocked_when_flag_false
- live_payment_or_invoice_blocked_when_flag_false
- blocked_by_activation_flag_audit_event_present

### Lindy bridge safety

- safe_lindy_bridge_reference_not_live_activation
- live_lindy_bridge_enabled_false_not_counted_as_active
- lindy_not_source_of_truth
- lindy_not_final_reporting_authority
- no_live_lindy_workflow_execution

### Unsupported requests

- automatic_estimate_request_routes_to_hold_or_review
- automatic_quote_request_routes_to_hold_or_review
- automatic_invoice_request_routes_to_hold_or_review
- payment_or_deposit_request_routes_to_hold_or_review
- native_crm_sync_request_routes_to_later_only_or_review
- unsupported_feature_does_not_trigger_live_action

## 6. Scenario-Level Guard Expectations

| # | scenario_id | Guard expectation |
| --- | --- | --- |
| 1 | normal_lead_to_appointment_readiness | All appointment readiness prerequisites pass before APPOINTMENT_READY |
| 2 | missing_information_path | Missing contact/service data guard fails safely; routes to MISSING_INFO or HOLD |
| 3 | duplicate_review_path | Duplicate guard routes to DUPLICATE_REVIEW; RoofLeadHQ/Jason system review item |
| 4 | bad_fit_excluded_path | Service-area/exclusion guard routes to BAD_FIT_OR_EXCLUDED |
| 5 | stopped_do_not_contact_path | Do-not-contact guard blocks follow-up; routes to STOPPED_DO_NOT_CONTACT |
| 6 | missed_lead_recovery_path | Recovery proceeds when contact permission known/reviewed; live sends blocked |
| 7 | roofer_review_needed_path | Business judgment guard routes to ROOFER_REVIEW_NEEDED |
| 8 | roofleadhq_system_review_needed_path | System/data/routing/quality issue routes to ROOFLEADHQ_REVIEW_NEEDED |
| 9 | appointment_booked_path | Appointment booked without live calendar creation |
| 10 | inspection_completed_path | Post-inspection next-state evaluation without live sends |
| 11 | inspection_missed_reschedule_path | Manual reschedule next step without live calendar creation |
| 12 | post_inspection_still_open_path | Still-open follow-up need without live sends |
| 13 | estimate_needed_estimate_sent_tracking_path | Estimate status tracking only; no estimate or quote generation |
| 14 | homeowner_follow_up_needed_path | Follow-up needed is draft/manual only |
| 15 | roofer_follow_up_needed_path | Roofer follow-up owner and manual next step |
| 16 | feedback_permission_yes_path | permission_to_use_publicly yes; no unattended public review publishing |
| 17 | feedback_permission_no_path | Internal-only feedback |
| 18 | feedback_permission_not_asked_path | Internal-only feedback; permission not asked |
| 19 | csv_report_snapshot_fake_data_path | Fictional data only; one-directional CSV; no CRM sync; live CSV delivery blocked |
| 20 | starter_plan_profile_path | Starter limits and basic reporting only |
| 21 | growth_plan_profile_path | Growth features and volume limit |
| 22 | elite_plan_profile_path | Elite features and 500-lead cap unless custom approved |
| 23 | custom_review_500_plus_leads_path | 500+ leads routes to CUSTOM_REVIEW_REQUIRED or HOLD |
| 24 | custom_review_two_plus_locations_path | 2+ locations routes to CUSTOM_REVIEW_REQUIRED or HOLD |
| 25 | activation_flag_false_blocks_live_action_path | blocked_by_activation_flag audit event; no live action |

Every scenario: `live_actions_performed: no`, `production_data_touched: no`, `external_services_called: no`, `result: PASS`.

## 7. Fail-Closed Behavior

Every guard assertion that detects an unsafe condition must fail closed:

1. Route to HOLD, BLOCKED, MISSING_INFO, DUPLICATE_REVIEW, BAD_FIT_OR_EXCLUDED, STOPPED_DO_NOT_CONTACT, CUSTOM_REVIEW_REQUIRED, or appropriate review queue.
2. Record `failed_guards` with `safely_routed: true`.
3. Emit audit events describing the block reason.
4. Never trigger live sends, external service calls, or production data access.

Expected guard failures are recorded as `fail_safely_routed` and the scenario still passes because routing was correct.

## 8. Review Ownership Guard Rules

### Roofer/contractor review owns

- pricing question
- estimate question
- quote request
- insurance complexity
- scheduling issue
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

Guard assertions enforce that business judgment routes to roofer review and system/workflow/data/routing/quality issues route to RoofLeadHQ/Jason review only.

## 9. Appointment Readiness Guard Rules

Fixture paths require homeowner contact data, service address, appointment preference, service-area fit, calendar owner known, and plan profile known before APPOINTMENT_READY.

Guard assertions verify:

- appointment_calendar_preferences_required_before_appointment_ready
- calendar_owner_required_before_appointment_ready
- service_area_fit_required_before_appointment_ready
- appointment_ready_blocked_when_required_fields_missing
- no_live_calendar_creation_when_appointment_booked

No live Google Calendar event creation is allowed. Use generic calendar owners such as **Main Sales Calendar** or **Acme Roofing Calendar**.

## 10. Feedback Permission Guard Rules

`permission_to_use_publicly` uses **yes**, **no**, or **not_asked** only. The field name `permissiontousepublicly` must not appear.

- **yes** — feedback captured; internal; public use eligible after review; no unattended public review publishing
- **no** — feedback captured; internal only
- **not_asked** — feedback captured or status known; PERMISSION_TO_USE_PUBLICLY_NOT_ASKED; internal only

Guard assertions enforce no_fake_reviews, no_review_farming, and no_automatic_public_review_generation.

## 11. CSV/Reporting Guard Rules

Scenario 19 includes a fake reporting snapshot and CSV row with fictional data only.

Boundaries enforced by guard assertions:

- CSV is one-directional reporting/manual CRM/reference use.
- CSV export is **not bidirectional CRM integration**.
- CSV does not replace the roofer's CRM.
- CSV does not push data back to RoofLeadHQ.
- `live_csv_export_enabled: false` blocks delivery/export.
- CSV contains homeowner personal information warning.
- Customer is responsible for downloaded/exported data.
- ROI depends on customer-provided spend/source data.

## 12. Activation Flag Guard Rules

All activation flags default to `false`. Guard assertions verify each live channel is blocked when its flag is false and that `blocked_by_activation_flag` audit events are present when live actions are attempted.

Explicit Jason approval is required before any future live activation.

## 13. Lindy Bridge Safety Guard Rules

Lindy may remain temporarily as a low-volume manual bridge, but guard assertions enforce:

- safe_lindy_bridge_reference_not_live_activation
- live_lindy_bridge_enabled_false_not_counted_as_active
- lindy_not_source_of_truth
- lindy_not_final_reporting_authority
- no_live_lindy_workflow_execution

Native workflow logic owned by RoofLeadHQ backend + Supabase source-of-truth state is the long-term direction.

## 14. Unsupported Request Guard Rules

Unsupported requests must route to hold/review without triggering live action:

- unattended estimate/quote/invoice requests
- payment or deposit requests
- bidirectional CRM integration requests (later-only or review)
- any unsupported feature must not trigger live action

## 15. Local E2E Runner Relationship

The Local E2E Fixture Runner (`docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`) implements Stage 1 fixture dry-run. This guard assertions expansion deepens the fuller 25-scenario fixture state model with explicit guard assertion coverage.

- Fixture outputs remain deterministic.
- Tests are runnable locally without credentials.
- Tests do not call Supabase or external services.
- Guard assertions support later sandbox/test-mode implementation and local E2E runner expansion.

## 16. First Paid Roofer Relationship

- first paid roofer manual operation can use these fixture paths and guard assertions as a reference.
- fixture learning should inform native implementation priorities.
- First-roofer operations should not wait for full native engine if manual bridge is safe.
- Live automation remains disabled unless explicitly approved.
- Lindy may assist temporarily where existing workflows are useful.
- Native records/states should become the long-term authority via Supabase source of truth.

## 17. Future Implementation Sequence

Suggested next sequence after this expansion passes:

1. Port guard assertions into sandbox/test-mode transition guards.
2. Add guard assertion checks in local E2E fixture runner.
3. Add plan profile guard assertions in integration adapters.
4. Add review queue guard assertions in native workflow engine.
5. Add appointment readiness guard assertions in calendar readiness layer.
6. Add post-inspection/feedback guard assertions in follow-up layer.
7. Add reporting/CSV guard assertions in export layer.
8. Add activation-flag false blocking assertions in integration adapters.
9. Only after fixture model passes, consider schema/security/RLS readiness work.
10. Only after security review, consider native persistence.
11. Only after explicit approval, consider sandbox/test-mode integrations.

## 18. Forbidden/Preferred Language Guardrails

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
- guard assertions
- fake data
- native workflow engine
- Supabase source of truth
- plan configuration profiles
- staged E2E testing
- manual bridge
- dry-run only