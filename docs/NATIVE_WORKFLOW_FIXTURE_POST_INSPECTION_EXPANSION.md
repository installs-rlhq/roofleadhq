# Native Workflow Fixture Post-Inspection Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data post-inspection coverage for what happens after a booked homeowner inspection.

It deepens the local fixture post-inspection layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only post-inspection expansion
- fake data only
- deterministic post-inspection summaries and items
- explicit inspection completed / missed / reschedule tracking
- estimate-needed and estimate-sent tracking boundaries
- homeowner and roofer follow-up tracking boundaries
- won/lost/still-open/needs-review/closed outcome tracking
- feedback capture and public-use permission rules
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production post-inspection workflow engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live homeowner or roofer follow-up.
- This does **not** send live feedback requests.
- This does **not** generate estimates, quotes, invoices, or payment requests automatically.
- This does **not** publish homeowner feedback or generate public reviews.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that post-inspection decision rules, follow-up tracking boundaries, feedback permission rules, review ownership boundaries, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `scripts/run-native-workflow-fixture-post-inspection-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `846a388 test(workflow): expand native workflow fixture appointment readiness`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `post_inspection_summary`, `post_inspection_items`
- `post_inspection_status_summary`, `estimate_tracking_summary`
- `homeowner_follow_up_summary`, `roofer_follow_up_summary`
- `outcome_summary`, `feedback_capture_summary`, `feedback_permission_summary`
- `post_inspection_review_summary`, `post_inspection_safety_assertions`
- per-scenario `post_inspection_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, and existing output fields remain intact.

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
- **no live homeowner or roofer follow-up sends**
- **no live feedback request sends**
- **no estimate/quote/invoice/payment automation**
- **no unattended public review publishing**
- **no bidirectional CRM integration**

## 4. Post-Inspection Decision Model

Post-inspection tracking may record:

- `inspection_completed`
- `inspection_missed_or_rescheduled`
- `estimate_needed`
- `estimate_sent`
- `homeowner_follow_up_needed`
- `roofer_follow_up_needed`
- `still_open`
- `won`
- `lost`
- `needs_review`
- `closed`

Post-inspection tracking must not:

- generate an estimate
- generate a quote
- generate an invoice
- request payment
- send live homeowner follow-up
- send live roofer follow-up
- send live feedback request
- generate a public review
- publish homeowner feedback
- call external services
- touch production data

## 5. Estimate-Needed and Estimate-Sent Tracking Boundaries

Estimate-needed and estimate-sent are **tracking only** in fixture output. They record that an estimate is needed or was sent manually — they do not generate documents.

Each post-inspection item sets:

- `automatic_estimate_generated: "no"`
- `automatic_quote_generated: "no"`
- `automatic_invoice_generated: "no"`
- `automatic_payment_requested: "no"`

Estimate and quote details route to roofer review for business judgment.

## 6. Homeowner and Roofer Follow-Up Tracking Boundaries

Homeowner and roofer follow-up flags are tracking or manual-draft only. They indicate that follow-up may be needed without performing live sends.

Each post-inspection item sets:

- `live_follow_up_action_allowed: "no"`

When follow-up is needed, `next_step_owner` and `next_step_due_date` are required for operator visibility.

## 7. Won / Lost / Still-Open / Needs-Review / Closed Outcomes

Fixture output supports explicit outcome tracking:

| Outcome | Meaning in fixture |
|---------|-------------------|
| `still_open` | Post-inspection outcome unresolved |
| `won` | Job won — tracking only |
| `lost` | Lead/job lost — tracking only |
| `needs_review` | Routed to human review before next step |
| `closed` | Outcome closed — no further follow-up expected |

Disputed or unclear outcomes route to roofer review for business judgment. System-quality issues route to RoofLeadHQ/Jason review only.

## 8. Feedback Capture and Public-Use Permission Rules

Feedback is **internal unless permission is obtained**.

`permission_to_use_publicly` values must be exactly:

- `yes`
- `no`
- `not_asked`

Do not use `permissiontousepublicly`.

Do not allow:

- incentivized positive feedback
- public use without permission
- testimonial publication without explicit approval workflow

`testimonial_candidate` is internal-only tracking. It does not publish publicly.

Each post-inspection item sets:

- `live_feedback_request_allowed: "no"`

## 9. Roofer Review vs RoofLeadHQ/Jason System Review

Roofer/contractor review is required for:

- estimate details
- quote details
- pricing questions
- payment or invoice questions
- contract questions
- insurance complexity
- repair vs replacement questions
- upset homeowner
- disputed inspection outcome
- unclear next step requiring business judgment

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

Do not route business judgment to Jason/RoofLeadHQ as if RoofLeadHQ is the roofer.

## 10. Activation-Flag Boundary

All activation flags default to `false`. Post-inspection items set `live_follow_up_action_allowed: "no"` and `live_feedback_request_allowed: "no"`. Live follow-up and feedback requests remain blocked when activation flags are false.

## 11. No Production Data / No External Calls / No Live Sends / No Automatic Documents

- Post-inspection items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live notifications are sent.
- No estimates, quotes, invoices, or payment requests are auto-generated.
- No live automation is activated.

## 12. Future Native Workflow Engine Support

This packet models post-inspection behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- post-inspection item field contracts
- inspection completed / missed / reschedule decision rules
- estimate and follow-up tracking boundaries
- outcome and feedback permission tracking
- review ownership and audit linkage expectations
- safety assertions

It does **not** implement schema, persistence, or production workflow behavior.

## 13. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents post-inspection boundaries and safety rules. Founder-operated manual follow-up, outcome command packets, and bridge packets remain independent operational layers.

## 14. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All post-inspection output is fake-data fixture only. Live automation remains disabled unless Jason explicitly approves activation.

## Required Post-Inspection Item Fields

Each post-inspection item includes:

| Field | Description |
|-------|-------------|
| `post_inspection_item_id` | Deterministic fixture identifier |
| `scenario_id` | Source scenario |
| `lead_id` | Fixture lead identifier |
| `appointment_id` | Fixture appointment identifier when applicable |
| `plan_profile` | Plan configuration profile |
| `current_state` | Workflow state at evaluation |
| `target_state` | Expected workflow state |
| `inspection_status` | Inspection status label |
| `inspection_completed` | Whether inspection completed |
| `inspection_missed_or_rescheduled` | Whether inspection was missed or needs reschedule |
| `estimate_needed` | Estimate-needed tracking flag |
| `estimate_sent` | Estimate-sent tracking flag |
| `homeowner_follow_up_needed` | Homeowner follow-up tracking flag |
| `roofer_follow_up_needed` | Roofer follow-up tracking flag |
| `post_inspection_status` | Post-inspection status label |
| `outcome` | Outcome when applicable |
| `outcome_date` | Outcome date when applicable |
| `still_open_days` | Days open for still-open items |
| `next_step_owner` | Owner of next manual step |
| `next_step_due_date` | Due date for follow-up when needed |
| `next_step_notes` | Notes for operator visibility |
| `feedback_requested` | Whether feedback was requested (tracking) |
| `feedback_captured` | Whether feedback was captured (tracking) |
| `feedback_summary` | Internal feedback summary |
| `testimonial_candidate` | Internal testimonial candidate flag |
| `permission_to_use_publicly` | `yes`, `no`, `not_asked`, or null |
| `feedback_issue_flag` | Issue-flagged feedback indicator |
| `roofer_review_required` | Roofer review needed |
| `roofleadhq_review_required` | RoofLeadHQ/Jason system review needed |
| `required_manual_next_step` | Required manual action |
| `live_follow_up_action_allowed` | Always `"no"` in fixture dry-run |
| `live_feedback_request_allowed` | Always `"no"` in fixture dry-run |
| `automatic_estimate_generated` | Always `"no"` in fixture dry-run |
| `automatic_quote_generated` | Always `"no"` in fixture dry-run |
| `automatic_invoice_generated` | Always `"no"` in fixture dry-run |
| `automatic_payment_requested` | Always `"no"` in fixture dry-run |
| `production_data_touched` | Always `"no"` in fixture dry-run |
| `external_services_called` | Always `"no"` in fixture dry-run |

## Scenario Coverage

All 25 existing scenarios are preserved with post-inspection items:

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

- `post_inspection_summary_present`
- `post_inspection_items_present`
- `post_inspection_item_required_fields_present`
- `inspection_completed_routes_to_post_inspection_tracking`
- `inspection_missed_routes_to_reschedule_or_review`
- `estimate_needed_is_tracking_only`
- `estimate_sent_is_tracking_only`
- `no_automatic_estimate_generated`
- `no_automatic_quote_generated`
- `no_automatic_invoice_generated`
- `no_automatic_payment_requested`
- `homeowner_follow_up_needed_is_tracking_or_manual_only`
- `roofer_follow_up_needed_is_tracking_or_manual_only`
- `still_open_days_present_for_open_items`
- `next_step_owner_required_for_open_items`
- `next_step_due_date_required_when_follow_up_needed`
- `won_lost_closed_outcomes_supported`
- `disputed_or_unclear_outcome_routes_to_review`
- `estimate_details_route_to_roofer_review`
- `quote_details_route_to_roofer_review`
- `payment_or_invoice_routes_to_roofer_review`
- `insurance_complexity_routes_to_roofer_review`
- `repair_vs_replacement_routes_to_roofer_review`
- `roofleadhq_review_limited_to_system_quality`
- `feedback_requested_tracking_present`
- `feedback_captured_tracking_present`
- `permission_to_use_publicly_values_are_valid`
- `permissiontousepublicly_absent`
- `feedback_internal_unless_permission_obtained`
- `no_fake_reviews`
- `no_review_farming`
- `no_automatic_public_review_generation`
- `testimonial_candidate_does_not_publish_publicly`
- `live_follow_up_blocked_when_flag_false`
- `live_feedback_request_blocked_when_flag_false`
- `post_inspection_uses_fake_data_only`
- `post_inspection_does_not_touch_production_data`
- `post_inspection_does_not_call_external_services`
- `post_inspection_does_not_send_notifications`
- `post_inspection_decisions_are_audited`
- `required_manual_next_step_present_for_open_or_review_items`

The verifier fails closed if required fields, required scenarios, ownership boundaries, feedback permission boundaries, post-inspection blockers, or safety assertions are missing.

## CSV/Reporting Compatibility

Post-inspection fields align with reporting snapshot and CSV export snapshot fields from prior expansions. Scenario 19 (`csv_report_snapshot_fake_data_path`) demonstrates CSV/reporting compatibility with post-inspection tracking fields.

## Local E2E Fixture Runner Relationship

The local E2E fixture runner packet can consume post-inspection fixture output shape as a reference for future staged testing. This expansion does not activate the local E2E runner or any live path.

## First Paid Roofer Relationship

First paid roofer onboarding and manual bridge packets remain the operational path for real roofer work. This expansion provides deterministic fixture evidence for post-inspection decision boundaries without replacing manual founder-operated follow-up and outcome capture.

## How to Run

```bash
bash scripts/run-native-workflow-fixture-post-inspection-expansion-dry-run.sh
```

Or run the verifier directly:

```bash
node backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js
```