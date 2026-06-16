# Native Workflow Fixture Manual Outreach Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data coverage for when RoofLeadHQ marks a lead or workflow item as needing manual outreach instead of automated live action.

It deepens the local fixture manual outreach layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only manual outreach expansion
- fake data only
- deterministic manual outreach summaries and items
- explicit outreach-needed vs outreach-blocked tracking
- missed lead recovery manual outreach handling
- post-inspection and feedback manual outreach handling
- contact permission and do-not-contact boundaries
- roofer vs RoofLeadHQ/Jason review ownership before outreach
- manual outreach owner, next-step, due-date, and attempt tracking
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production manual outreach workflow engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live SMS, email, calls, or notifications.
- This does **not** call Twilio, Vapi, Resend, Lindy, or Google Calendar.
- This does **not** perform CRM sync.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that manual outreach decision rules, contact permission boundaries, review ownership boundaries, attempt tracking, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md`
- `scripts/run-native-workflow-fixture-manual-outreach-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-manual-outreach-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-feedback-permission-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `b765fe2 test(workflow): expand native workflow fixture feedback permission`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `manual_outreach_expansion_summary`, `manual_outreach_items`
- `manual_outreach_status_summary`, `manual_outreach_owner_summary`
- `manual_outreach_reason_summary`, `manual_outreach_attempt_summary`
- `missed_lead_manual_outreach_summary`, `post_inspection_manual_outreach_summary`
- `feedback_manual_outreach_summary`, `manual_outreach_review_boundary_summary`
- `manual_outreach_safety_assertions`
- per-scenario `manual_outreach_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, post-inspection fields, feedback permission fields, and existing output fields remain intact.

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
- **no live SMS/email/call sends**
- **no notifications**
- **no Google Calendar event creation**
- **no bidirectional CRM integration**

## 4. Manual Outreach Decision Model

Manual outreach may be marked as needed when:

- a missed lead recovery path requires human follow-up
- a homeowner has not responded after safe configured follow-up attempts
- contact data is incomplete or ambiguous (routes to review first)
- contact permission is unclear and requires review
- appointment readiness is blocked by missing calendar owner or booking preferences
- homeowner asks for roofer directly
- homeowner has a pricing, estimate, quote, insurance, payment, invoice, or contract question (after roofer review)
- post-inspection next step requires roofer follow-up
- feedback issue requires review
- negative or disputed feedback requires contractor response
- RoofLeadHQ system-quality issue requires internal review before any outreach
- unsupported request requires review or later-only routing

Manual outreach must be blocked when:

- do_not_contact is true
- contact permission is missing and not reviewed
- homeowner contact data is not usable
- required roofer review is unresolved
- required RoofLeadHQ system review is unresolved
- live activation flags are false (live sends blocked; manual-only tracking allowed)
- outreach would require unsupported automation
- outreach would send a live SMS/email/call/notification

Manual outreach tracking must not:

- send live SMS
- send live email
- make live calls
- send notifications
- call Twilio/Vapi/Resend/Lindy/Calendar
- touch production data
- create calendar events
- generate estimates, quotes, invoices, or payments
- publish feedback or testimonials
- perform CRM sync

## 5. Contact Permission and Do-Not-Contact Boundaries

- `homeowner_contact_ready` must be true before outreach_needed can be true
- `contact_permission_status: unknown` blocks outreach or routes to review
- `do_not_contact_status: true` blocks all manual outreach
- unclear contact permission fails closed or routes to review before outreach

## 6. Missed Lead Recovery Manual Outreach Handling

Scenario 6 (`missed_lead_recovery_path`) demonstrates missed lead recovery routing to manual outreach after safe follow-up attempts. Recovery is simulated only — no live sends occur.

## 7. Post-Inspection and Feedback Manual Outreach Handling

Post-inspection scenarios demonstrate:

- homeowner follow-up manual outreach (scenario 14)
- roofer follow-up manual outreach with negative/disputed feedback (scenario 15)
- post-inspection still-open manual follow-up (scenario 12)
- scheduling reschedule manual outreach after roofer review (scenario 11)

Feedback scenarios demonstrate:

- feedback issue follow-up routing
- negative/disputed feedback requiring roofer manual outreach
- feedback permission capture mismatch requiring RoofLeadHQ system review before outreach

## 8. Roofer Review vs RoofLeadHQ/Jason System Review

Roofer/contractor review owns business judgment and is required before outreach for:

- pricing question
- estimate question
- quote request
- insurance complexity
- repair vs replacement question
- scheduling issue
- homeowner asks for roofer directly
- upset homeowner
- disputed inspection outcome
- negative feedback needing contractor response
- payment or invoice question
- contract question

RoofLeadHQ/Jason system review is limited to:

- bad/unclear AI response
- missed data capture
- broken routing
- source attribution issue
- dashboard/report discrepancy
- workflow state confusion
- setup issue
- failed handoff
- quality-control concern
- feedback permission capture mismatch

Do not route business judgment to Jason/RoofLeadHQ as if RoofLeadHQ is the roofer.

## 9. Manual Outreach Owner, Next-Step, Due-Date, and Attempt Tracking

Each manual outreach item tracks:

- `outreach_owner` — roofer, roofleadhq_jason, or none when blocked
- `manual_next_step` — required manual action
- `next_step_owner` — who owns the next step
- `next_step_due_date` — required when outreach_needed is true
- `manual_outreach_attempt_count` — dry-run attempt logging
- `last_manual_outreach_attempt_date` — last attempt date when applicable
- `prior_follow_up_count` — prior safe follow-up attempts
- `max_follow_up_attempts_reached` — routes to manual outreach when true

## 10. Activation-Flag Boundary

All activation flags default to `false`. Manual outreach items set:

- `live_sms_allowed: "no"`
- `live_email_allowed: "no"`
- `live_call_allowed: "no"`
- `notification_sent: "no"`

Live sends remain blocked when activation flags are false. Manual-only outreach tracking is allowed.

## 11. No Production Data / No External Calls / No Live Sends / No Notifications

- Manual outreach items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live notifications are sent.
- No live automation is activated.

## 12. Future Native Workflow Engine Support

This packet models manual outreach behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- manual outreach item field contracts
- outreach-needed vs outreach-blocked decision rules
- contact permission and do-not-contact boundaries
- review ownership and audit linkage expectations
- attempt logging and owner/next-step tracking
- safety assertions

It does **not** implement schema, persistence, or production workflow behavior.

## 13. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents manual outreach boundaries and safety rules. Founder-operated manual communication command packets and bridge packets remain independent operational layers.

## 14. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All manual outreach output is fake-data fixture only. Live automation remains disabled unless Jason explicitly approves activation.

## Required Manual Outreach Item Fields

Each manual outreach item includes:

| Field | Description |
|-------|-------------|
| `manual_outreach_item_id` | Deterministic fixture identifier |
| `scenario_id` | Source scenario |
| `lead_id` | Fixture lead identifier |
| `appointment_id` | Fixture appointment identifier when applicable |
| `post_inspection_item_id` | Linked post-inspection item when applicable |
| `feedback_permission_item_id` | Linked feedback permission item when applicable |
| `plan_profile` | Plan configuration profile |
| `current_state` | Workflow state at evaluation |
| `target_state` | Expected workflow state |
| `outreach_needed` | Whether manual outreach is needed |
| `outreach_status` | needed, blocked, tracking_only, etc. |
| `outreach_reason` | Why outreach is needed or blocked |
| `outreach_owner` | roofer, roofleadhq_jason, or none |
| `outreach_channel_allowed` | manual_only, none, etc. |
| `contact_permission_status` | Contact permission state |
| `do_not_contact_status` | Do-not-contact flag |
| `homeowner_contact_ready` | Whether contact data is usable |
| `roofer_review_required` | Roofer review needed before outreach |
| `roofleadhq_review_required` | RoofLeadHQ system review needed |
| `business_judgment_required` | Business judgment flag |
| `system_quality_issue` | System quality issue flag |
| `prior_follow_up_count` | Prior safe follow-up attempts |
| `max_follow_up_attempts_reached` | Max attempts reached flag |
| `missed_lead_recovery_used` | Missed lead recovery active |
| `manual_next_step` | Required manual action |
| `next_step_owner` | Next step owner |
| `next_step_due_date` | Due date when outreach needed |
| `last_manual_outreach_attempt_date` | Last attempt date |
| `manual_outreach_attempt_count` | Attempt count |
| `manual_outreach_notes` | Internal fixture notes |
| `hold_or_block_reason` | Hold or block reason when applicable |
| `audit_event_id` | Linked audit event |
| `live_sms_allowed` | Always `"no"` in fixture dry-run |
| `live_email_allowed` | Always `"no"` in fixture dry-run |
| `live_call_allowed` | Always `"no"` in fixture dry-run |
| `notification_sent` | Always `"no"` in fixture dry-run |
| `production_data_touched` | Always `"no"` in fixture dry-run |
| `external_services_called` | Always `"no"` in fixture dry-run |

## Scenario Coverage

All 25 existing scenarios are preserved with manual outreach items:

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

- `manual_outreach_expansion_summary_present`
- `manual_outreach_items_present`
- `manual_outreach_item_required_fields_present`
- `missed_lead_recovery_can_route_to_manual_outreach`
- `max_follow_up_attempts_can_route_to_manual_outreach`
- `missing_contact_data_blocks_manual_outreach_or_routes_to_review`
- `unclear_contact_permission_blocks_manual_outreach_or_routes_to_review`
- `do_not_contact_blocks_manual_outreach`
- `homeowner_contact_ready_required_for_manual_outreach`
- `roofer_review_required_before_business_judgment_outreach`
- `roofleadhq_review_required_before_system_quality_outreach`
- `pricing_question_routes_to_roofer_review_before_outreach`
- `estimate_question_routes_to_roofer_review_before_outreach`
- `quote_request_routes_to_roofer_review_before_outreach`
- `insurance_complexity_routes_to_roofer_review_before_outreach`
- `payment_or_invoice_routes_to_roofer_review_before_outreach`
- `contract_question_routes_to_roofer_review_before_outreach`
- `homeowner_asks_for_roofer_routes_to_roofer_review_before_outreach`
- `upset_homeowner_routes_to_roofer_review_before_outreach`
- `negative_or_disputed_feedback_routes_to_roofer_review_before_outreach`
- `broken_routing_routes_to_roofleadhq_review_before_outreach`
- `missed_data_capture_routes_to_roofleadhq_review_before_outreach`
- `source_attribution_issue_routes_to_roofleadhq_review_before_outreach`
- `feedback_permission_capture_mismatch_routes_to_roofleadhq_review_before_outreach`
- `manual_outreach_owner_required`
- `manual_next_step_required`
- `next_step_owner_required`
- `next_step_due_date_required_when_outreach_needed`
- `outreach_attempt_count_present`
- `manual_outreach_decisions_are_audited`
- `live_sms_blocked_when_flag_false`
- `live_email_blocked_when_flag_false`
- `live_call_blocked_when_flag_false`
- `notification_sent_is_no_for_all_items`
- `live_sms_allowed_is_no_for_all_items`
- `live_email_allowed_is_no_for_all_items`
- `live_call_allowed_is_no_for_all_items`
- `no_twilio_call_performed`
- `no_vapi_call_performed`
- `no_resend_call_performed`
- `no_lindy_live_workflow_performed`
- `no_google_calendar_event_created`
- `no_external_services_called`
- `manual_outreach_uses_fake_data_only`
- `manual_outreach_does_not_touch_production_data`
- `manual_outreach_does_not_send_notifications`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `unsupported_request_routes_to_review_or_later_only`
- `unsupported_request_does_not_trigger_live_outreach`

The verifier fails closed if required fields, outreach ownership, review boundaries, contact permission boundaries, do-not-contact blockers, live-send blockers, or safety assertions are missing.

## Local E2E Fixture Runner Relationship

The local E2E fixture runner packet can consume manual outreach fixture output shape as a reference for future staged testing. This expansion does not activate the local E2E runner or any live path.

## First Paid Roofer Relationship

First paid roofer onboarding and manual bridge packets remain the operational path for real roofer work. This expansion provides deterministic fixture evidence for manual outreach decision boundaries without replacing manual founder-operated communication.

## How to Run

```bash
bash scripts/run-native-workflow-fixture-manual-outreach-expansion-dry-run.sh
```

Or run the verifier directly:

```bash
node backend/scripts/verify-native-workflow-fixture-manual-outreach-expansion-readonly.js
```