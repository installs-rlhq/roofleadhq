# Native Workflow Fixture Appointment Readiness Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data appointment readiness coverage that determines when a roofing lead is ready — or not ready — to proceed to manual booked homeowner appointment / inspection coordination.

It deepens the local fixture appointment readiness layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only appointment readiness expansion
- fake data only
- deterministic appointment readiness summaries and items
- explicit ready vs not-ready decision rules
- calendar owner and calendar preference requirements
- human review and unsupported request blockers
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production appointment booking engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** create Google Calendar events.
- This does **not** send live notifications.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that appointment readiness decision rules, calendar requirements, blocker routing, and safety boundaries are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `scripts/run-native-workflow-fixture-appointment-readiness-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `c743e8d test(workflow): expand native workflow fixture review queue`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `appointment_readiness_summary`, `appointment_readiness_items`
- `appointment_blocker_summary`, `appointment_ready_summary`, `appointment_not_ready_summary`
- `calendar_preference_summary`, `calendar_owner_summary`, `appointment_readiness_safety_assertions`
- per-scenario `appointment_readiness_items` with full required fields
- blocker catalog demonstrating required blocker types

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, and existing output fields remain intact.

## 3. Fake-Data / Local-Only Boundary

- local fixture-only dry-run implementation
- local fake-data dry-run only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- **no Supabase** reads or writes
- **no schema** changes
- **no migrations**
- **no auth/RLS** changes
- **no production data**
- **no live automation**
- **no integrations**
- **no external calls**
- **no live Google Calendar event creation**
- **no bidirectional CRM integration**
- **no payment/deposit/invoice/estimate automation**

## 4. Appointment Readiness Decision Model

Appointment readiness is `ready` only when the lead has enough approved fake-data information to proceed to manual inspection coordination without live booking.

Each readiness item includes a `readiness_decision` of `ready` or `not_ready`, with `readiness_reason`, `blocker_reasons`, and `required_manual_next_step` when blocked.

Appointment readiness depends on clearly captured and approved setup/lead information:

- homeowner contact data
- contact permission / do-not-contact status
- service area fit
- lead source capture or unknown marker
- roofing issue summary
- urgency
- preferred appointment windows if available
- calendar owner
- calendar booking preferences
- assigned roofer/rep if applicable
- plan profile boundaries
- human review blockers
- unsupported request blockers
- activation flag boundaries

## 5. Required Appointment Readiness Fields

Each appointment readiness item includes:

| Field | Description |
|-------|-------------|
| `readiness_item_id` | Deterministic fixture identifier |
| `scenario_id` | Source scenario |
| `lead_id` | Fixture lead identifier |
| `plan_profile` | Plan configuration profile |
| `current_state` | Workflow state at evaluation |
| `target_state` | Expected workflow state |
| `appointment_readiness_status` | Status label (ready, blocked, past readiness, etc.) |
| `readiness_decision` | `ready` or `not_ready` |
| `readiness_reason` | Human-readable decision reason |
| `required_fields_present` | Whether all required fields are present |
| `missing_fields` | List of missing required fields |
| `blocker_reasons` | List of blocker reasons when not ready |
| `homeowner_contact_ready` | Contact data completeness |
| `contact_permission_status` | Permission state |
| `do_not_contact_status` | Do-not-contact flag |
| `service_area_status` | Service area fit state |
| `lead_source_status` | Lead source capture state |
| `roofing_issue_summary_present` | Issue summary captured |
| `urgency_present` | Urgency captured |
| `preferred_appointment_windows_status` | Appointment window preference state |
| `calendar_owner` | Calendar owner assignment |
| `calendar_preferences_status` | Calendar preference approval state |
| `assigned_roofer_or_rep` | Assigned roofer/rep when required |
| `roofer_review_required` | Roofer review needed |
| `roofleadhq_review_required` | RoofLeadHQ/Jason system review needed |
| `required_manual_next_step` | Required manual action |
| `live_calendar_action_allowed` | Always `"no"` in fixture dry-run |
| `appointment_booked_live` | Always `"no"` in fixture dry-run |
| `production_data_touched` | Always `"no"` in fixture dry-run |
| `external_services_called` | Always `"no"` in fixture dry-run |

## 6. Appointment-Ready vs Appointment-Not-Ready Rules

### Appointment-ready (`readiness_decision: ready`)

A lead is appointment-ready when:

- homeowner contact data is present and approved
- contact permission is known or reviewed
- do-not-contact is false
- service area fit is confirmed
- lead source is captured or marked unknown with review
- roofing issue summary is present
- urgency is present when needed for routing
- calendar owner is assigned
- calendar booking preferences are approved
- assigned roofer/rep is present when plan/setup requires it
- no unresolved human review blocks next step
- no unsupported request blocks coordination
- live calendar flag remains false (manual coordination only)

### Appointment-not-ready (`readiness_decision: not_ready`)

Appointment readiness must be blocked or routed to review when:

- homeowner contact data is missing
- contact permission is unknown and not reviewed
- do-not-contact is true
- service area fit is unknown or excluded
- lead source is missing without unknown marker/review
- roofing issue summary is missing
- urgency is missing when needed for routing
- calendar owner is missing
- calendar booking preferences are missing or unapproved
- assigned roofer/rep is required but missing
- homeowner asks a pricing/estimate/quote/insurance/payment/contract question
- scheduling conflict or unclear appointment window exists
- unsupported request is present
- live calendar flag is false (blocks live booking, manual only)
- any required human review is unresolved

## 7. Calendar Owner and Calendar Preference Requirements

- `calendar_owner` must be present before appointment readiness can be `ready`
- `calendar_preferences_status` must be `approved` before appointment readiness can be `ready`
- Missing calendar owner or preferences block appointment readiness
- Calendar owner summary aggregates owner assignments across readiness items
- Calendar preference summary tracks approved, missing, pending, and conflict states

Appointment readiness must never create a live Google Calendar event. Booked homeowner appointments in fixture output use manual fixture booking only.

## 8. Human Review Blockers

Unresolved review blocks appointment readiness:

- roofer review required for pricing, estimate, quote, insurance, payment, contract, scheduling questions
- RoofLeadHQ/Jason system review required for duplicate confusion, broken routing, workflow state confusion
- custom review required for volume/location boundaries

Pricing, estimate, quote, insurance complexity, payment, and contract questions route to roofer review and block appointment readiness until resolved.

## 9. Unsupported Request Blockers

Unsupported requests block appointment readiness:

- unsupported estimate/quote/invoice generation requests (manual review only)
- payment or deposit automation requests
- bidirectional CRM integration requests
- live calendar booking when activation flag is false

The activation flag false scenario demonstrates blocked live calendar action even when other readiness fields are satisfied.

## 10. Activation-Flag Boundary

All activation flags default to `false`. Appointment readiness items set `live_calendar_action_allowed: "no"`. Live calendar booking is blocked when `live_calendar_booking_enabled` is false. No Google Calendar events are created in fixture output.

## 11. No Production Data / No External Calls / No Live Calendar Creation

- Appointment readiness items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live notifications are sent.
- No Google Calendar events are created.
- No live automation is activated.

## 12. Future Native Workflow Engine Support

This packet models appointment readiness behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- appointment readiness item field contracts
- ready vs not-ready decision rules
- calendar owner and preference requirements
- blocker catalog and audit linkage expectations
- safety assertions

It does **not** implement schema, persistence, or production workflow behavior.

## 13. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents appointment readiness boundaries and safety rules. Founder-operated manual coordination, inspection coordination command packets, and bridge packets remain independent operational layers.

## 14. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All appointment readiness output is fake-data fixture only. Live automation remains disabled unless Jason explicitly approves activation.

## Scenario Coverage

All 25 existing scenarios are preserved with appointment readiness items:

1. normal_lead_to_appointment_readiness
2. missing_information_path
3. duplicate_review_path
4. bad_fit_excluded_path
5. stopped_do_not_contact_path
6. missed_lead_recovery_path
7. roofer_review_needed_path
8. roofleadhq_system_review_needed_path
9. appointment_booked_path
10. inspection_completed_path
11. inspection_missed_reschedule_path
12. post_inspection_still_open_path
13. estimate_needed_estimate_sent_tracking_path
14. homeowner_follow_up_needed_path
15. roofer_follow_up_needed_path
16. feedback_permission_yes_path
17. feedback_permission_no_path
18. feedback_permission_not_asked_path
19. csv_report_snapshot_fake_data_path
20. starter_plan_profile_path
21. growth_plan_profile_path
22. elite_plan_profile_path
23. custom_review_500_plus_leads_path
24. custom_review_two_plus_locations_path
25. activation_flag_false_blocks_live_action_path

## Safety Assertions

The verifier enforces deterministic read-only assertions including:

- `appointment_readiness_summary_present`
- `appointment_readiness_items_present`
- `appointment_readiness_item_required_fields_present`
- `appointment_ready_requires_homeowner_contact_data`
- `appointment_ready_requires_contact_permission_or_review`
- `do_not_contact_blocks_appointment_readiness`
- `appointment_ready_requires_service_area_fit`
- `excluded_service_area_blocks_appointment_readiness`
- `appointment_ready_requires_lead_source_or_unknown_marker`
- `appointment_ready_requires_roofing_issue_summary`
- `appointment_ready_requires_calendar_owner`
- `appointment_ready_requires_calendar_preferences`
- `missing_calendar_preferences_blocks_appointment_ready`
- `missing_calendar_owner_blocks_appointment_ready`
- `assigned_roofer_or_rep_required_when_plan_or_setup_requires_it`
- `pricing_question_blocks_to_roofer_review`
- `estimate_question_blocks_to_roofer_review`
- `quote_request_blocks_to_roofer_review`
- `insurance_complexity_blocks_to_roofer_review`
- `payment_or_contract_question_blocks_to_roofer_review`
- `scheduling_conflict_blocks_to_roofer_review`
- `unsupported_request_blocks_appointment_readiness`
- `unresolved_review_blocks_appointment_readiness`
- `live_calendar_booking_flag_defaults_false`
- `live_calendar_creation_blocked_when_flag_false`
- `no_google_calendar_event_created`
- `no_external_calendar_call_performed`
- `appointment_booked_live_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `appointment_readiness_uses_fake_data_only`
- `appointment_readiness_does_not_touch_production_data`
- `appointment_readiness_does_not_call_external_services`
- `appointment_readiness_does_not_send_notifications`
- `appointment_decisions_are_audited`
- `required_manual_next_step_present_for_not_ready_items`

The verifier fails closed if required fields, required scenarios, ownership boundaries, appointment blockers, or safety assertions are missing.

## Local E2E Fixture Runner Relationship

The local E2E fixture runner packet can consume appointment readiness fixture output shape as a reference for future staged testing. This expansion does not activate the local E2E runner or any live path.

## First Paid Roofer Relationship

First paid roofer onboarding and manual bridge packets remain the operational path for real roofer work. This expansion provides deterministic fixture evidence for appointment readiness decision boundaries without replacing manual founder-operated inspection coordination.

## How to Run

```bash
bash scripts/run-native-workflow-fixture-appointment-readiness-expansion-dry-run.sh
```

Or run the verifier directly:

```bash
node backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js
```