# Native Workflow Fixture Feedback Permission Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data coverage for homeowner feedback capture and public-use permission boundaries.

It deepens the local fixture feedback permission layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only feedback permission expansion
- fake data only
- deterministic feedback permission summaries and items
- explicit feedback not requested / requested / captured / issue flagged tracking
- testimonial candidate internal-only boundaries
- public-use permission rules (`permission_to_use_publicly`: yes, no, not_asked)
- CSV/reporting permission value compatibility
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production feedback workflow engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live feedback requests.
- This does **not** generate public reviews or publish testimonials automatically.
- This does **not** publish case studies or homeowner feedback publicly.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that feedback permission decision rules, public-use boundaries, testimonial candidate boundaries, review ownership boundaries, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md`
- `scripts/run-native-workflow-fixture-feedback-permission-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-feedback-permission-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `abcd0d0 test(workflow): expand native workflow fixture post-inspection`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `feedback_permission_expansion_summary`, `feedback_permission_items`
- `feedback_permission_status_summary`, `testimonial_candidate_summary`
- `feedback_issue_summary`, `public_use_permission_summary`
- `feedback_csv_reporting_summary`, `feedback_review_boundary_summary`
- `feedback_permission_safety_assertions`
- per-scenario `feedback_permission_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, post-inspection fields, and existing output fields remain intact.

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
- **no live feedback request sends**
- **no unattended public review publishing**
- **no testimonial/public-use publication**
- **no bidirectional CRM integration**

## 4. Feedback Permission Decision Model

Feedback handling states tracked in fixture output:

- feedback not requested
- feedback requested
- feedback captured
- feedback issue flagged
- testimonial candidate (internal-only)
- permission_to_use_publicly yes / no / not_asked

Feedback handling must not:

- generate fabricated reviews
- engage in review solicitation farming
- request rewarded positive feedback
- generate automatic public reviews
- publish testimonials
- publish case studies
- send live feedback requests
- touch production data
- call external services

## 5. permission_to_use_publicly Values

`permission_to_use_publicly` must use exactly:

- `yes`
- `no`
- `not_asked`

Do not use `permissiontousepublicly`.

Do not use boolean true/false for public-use permission. Use only yes/no/not_asked.

## 6. Public-Use Allowed vs Blocked Rules

Feedback is internal unless permission is obtained.

Permission rules:

- `yes` means public use may be marked as allowed in the fake-data fixture, but still no automatic publication occurs.
- `no` means public use is blocked.
- `not_asked` means public use is blocked.
- missing/invalid permission means the verifier fails closed.
- testimonial candidate does not mean public publication.
- testimonial candidate with permission no or not_asked must remain internal only.
- feedback issue flag should route to appropriate review and remain internal.

Each feedback permission item sets:

- `automatic_public_review_generated: "no"`
- `testimonial_published_publicly: "no"`
- `incentivized_positive_feedback_requested: "no"`
- `fake_review_generated: "no"`
- `review_farming_detected: "no"`
- `live_feedback_request_allowed: "no"`

## 7. Testimonial Candidate Boundaries

`testimonial_candidate` is internal-only tracking. It does not publish publicly.

Testimonial candidates without `permission_to_use_publicly: yes` must remain `internal_only: true`.

Even when permission is yes, no unattended testimonial publishing occurs in fixture dry-run.

## 8. Feedback Issue Flag Routing

When `feedback_issue_flag` is true, feedback routes to review and remains internal only.

Negative, disputed, pricing/estimate/quote, or payment/contract feedback routes to roofer review for business judgment.

## 9. Roofer Review vs RoofLeadHQ/Jason System Review

Roofer/contractor review is required for:

- homeowner upset with inspection
- disputed inspection outcome
- homeowner asks for roofer follow-up
- homeowner raises pricing/estimate/quote/payment/contract issue
- testimonial/public-use decision requiring business approval
- negative feedback needing contractor response

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

## 10. CSV/Reporting Compatibility

`csv_permission_value` and `reporting_permission_value` must match `permission_to_use_publicly` for each feedback permission item.

When permission is null or not applicable, reporting values use `not_applicable`.

Scenario 19 (`csv_report_snapshot_fake_data_path`) demonstrates CSV/reporting compatibility with feedback permission fields.

## 11. Activation-Flag Boundary

All activation flags default to `false`. Feedback permission items set `live_feedback_request_allowed: "no"`. Live feedback requests remain blocked when activation flags are false.

## 12. No Production Data / No External Calls / No Live Sends / No Automatic Public Review Generation

- Feedback permission items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live notifications are sent.
- No unattended public review publishing occurs.
- No testimonial/public-use publication occurs.
- No live automation is activated.

## 13. Future Native Workflow Engine Support

This packet models feedback permission behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- feedback permission item field contracts
- permission_to_use_publicly decision rules
- public-use allowed vs blocked boundaries
- testimonial candidate and issue-flag routing
- CSV/reporting permission value compatibility
- review ownership and audit linkage expectations
- safety assertions

It does **not** implement schema, persistence, or production workflow behavior.

## 14. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents feedback permission boundaries and safety rules. Founder-operated manual follow-up, outcome command packets, and bridge packets remain independent operational layers.

## 15. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All feedback permission output is fake-data fixture only. Live automation remains disabled unless Jason explicitly approves activation.

## Required Feedback Permission Item Fields

Each feedback permission item includes:

| Field | Description |
|-------|-------------|
| `feedback_permission_item_id` | Deterministic fixture identifier |
| `scenario_id` | Source scenario |
| `lead_id` | Fixture lead identifier |
| `appointment_id` | Fixture appointment identifier when applicable |
| `post_inspection_item_id` | Linked post-inspection item |
| `plan_profile` | Plan configuration profile |
| `current_state` | Workflow state at evaluation |
| `target_state` | Expected workflow state |
| `feedback_requested` | Whether feedback was requested (tracking) |
| `feedback_captured` | Whether feedback was captured (tracking) |
| `feedback_summary` | Internal feedback summary |
| `feedback_issue_flag` | Issue-flagged feedback indicator |
| `testimonial_candidate` | Internal testimonial candidate flag |
| `permission_to_use_publicly` | `yes`, `no`, `not_asked`, or null |
| `public_use_allowed` | Whether public use is allowed in fixture |
| `public_use_block_reason` | Reason when public use is blocked |
| `internal_only` | Whether feedback remains internal only |
| `homeowner_wants_follow_up` | Homeowner follow-up intent |
| `roofer_showed_up_as_expected` | Inspection attendance signal when applicable |
| `roofer_helpful_professional` | Service quality signal when applicable |
| `roofer_review_required` | Roofer review needed |
| `roofleadhq_review_required` | RoofLeadHQ/Jason system review needed |
| `required_manual_next_step` | Required manual action |
| `csv_permission_value` | CSV export permission value |
| `reporting_permission_value` | Reporting snapshot permission value |
| `automatic_public_review_generated` | Always `"no"` in fixture dry-run |
| `testimonial_published_publicly` | Always `"no"` in fixture dry-run |
| `incentivized_positive_feedback_requested` | Always `"no"` in fixture dry-run |
| `fake_review_generated` | Always `"no"` in fixture dry-run |
| `review_farming_detected` | Always `"no"` in fixture dry-run |
| `live_feedback_request_allowed` | Always `"no"` in fixture dry-run |
| `production_data_touched` | Always `"no"` in fixture dry-run |
| `external_services_called` | Always `"no"` in fixture dry-run |

## Scenario Coverage

All 25 existing scenarios are preserved with feedback permission items:

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

- `feedback_permission_expansion_summary_present`
- `feedback_permission_items_present`
- `feedback_permission_item_required_fields_present`
- `permission_to_use_publicly_values_are_valid`
- `permissiontousepublicly_absent`
- `public_use_allowed_only_when_permission_yes`
- `public_use_blocked_when_permission_no`
- `public_use_blocked_when_permission_not_asked`
- `missing_permission_fails_closed_or_routes_to_review`
- `testimonial_candidate_does_not_publish_publicly`
- `testimonial_candidate_without_permission_remains_internal`
- `feedback_internal_unless_permission_obtained`
- `feedback_issue_flag_routes_to_review`
- `homeowner_wants_follow_up_routes_to_roofer_review`
- `negative_or_disputed_feedback_routes_to_roofer_review`
- `pricing_estimate_quote_feedback_routes_to_roofer_review`
- `payment_or_contract_feedback_routes_to_roofer_review`
- `roofleadhq_review_limited_to_system_quality`
- `feedback_permission_capture_mismatch_routes_to_roofleadhq_review`
- `csv_permission_value_matches_permission_to_use_publicly`
- `reporting_permission_value_matches_permission_to_use_publicly`
- `no_fake_reviews`
- `no_review_farming`
- `no_incentivized_positive_feedback_request`
- `no_automatic_public_review_generation`
- `no_automatic_testimonial_publication`
- `live_feedback_request_blocked_when_flag_false`
- `feedback_permission_uses_fake_data_only`
- `feedback_permission_does_not_touch_production_data`
- `feedback_permission_does_not_call_external_services`
- `feedback_permission_does_not_send_notifications`
- `feedback_permission_decisions_are_audited`
- `required_manual_next_step_present_for_issue_or_review_items`
- `automatic_public_review_generated_is_no_for_all_items`
- `testimonial_published_publicly_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`

The verifier fails closed if required fields, required permission values, public-use boundaries, feedback issue routing, review ownership boundaries, or safety assertions are missing.

## Local E2E Fixture Runner Relationship

The local E2E fixture runner packet can consume feedback permission fixture output shape as a reference for future staged testing. This expansion does not activate the local E2E runner or any live path.

## First Paid Roofer Relationship

First paid roofer onboarding and manual bridge packets remain the operational path for real roofer work. This expansion provides deterministic fixture evidence for feedback permission decision boundaries without replacing manual founder-operated feedback capture.

## How to Run

```bash
bash scripts/run-native-workflow-fixture-feedback-permission-expansion-dry-run.sh
```

Or run the verifier directly:

```bash
node backend/scripts/verify-native-workflow-fixture-feedback-permission-expansion-readonly.js
```