# Native Workflow Fixture Review Queue Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data review queue coverage that distinguishes:

1. **Roofer/contractor business-judgment review** — pricing, estimates, insurance, scheduling, contracts, upset homeowners, and other roofer-owned decisions.
2. **RoofLeadHQ/Jason system-quality/workflow/data/routing review** — broken routing, duplicate confusion, missed data capture, dashboard discrepancies, setup issues, and other system-quality concerns.

It deepens the fixture review queue layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only review queue expansion
- fake data only
- deterministic review queue summaries and items
- explicit roofer vs RoofLeadHQ/Jason ownership boundaries
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production review queue engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live review notifications.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that review queue ownership, routing rules, safety boundaries, and audit expectations are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `scripts/run-native-workflow-fixture-review-queue-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `fe75901 test(workflow): expand native workflow fixture reporting snapshots`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `review_queue_summary`, `review_queue_items`, `review_owner_summary`
- `roofer_review_summary`, `roofleadhq_review_summary`, `review_safety_assertions`
- per-scenario `review_queue_items` with full required fields on relevant paths
- routing catalog items demonstrating all required roofer and RoofLeadHQ/Jason routing types

All 25 scenarios, transition logs, guard assertions, reporting snapshots, and existing output fields remain intact.

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
- **no live review notifications**
- **no bidirectional CRM integration**
- **no payment/deposit/invoice/estimate automation**

## 4. Review Queue Ownership Model

### Roofer/contractor review owns business judgment

Roofer/contractor review is required for:

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

RoofLeadHQ/Jason does **not** own business judgment. Business judgment must not be routed to Jason/RoofLeadHQ as if RoofLeadHQ is the roofer.

### RoofLeadHQ/Jason review limited to system quality

RoofLeadHQ/Jason system review may be used for:

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

## 5. Required Review Item Fields

Each review queue item includes:

| Field | Description |
|-------|-------------|
| `review_item_id` | Deterministic fixture identifier |
| `scenario_id` | Source scenario |
| `review_type` | Routing type (e.g. `pricing_question`, `duplicate_lead_confusion`) |
| `review_owner` | `roofer` or `roofleadhq_jason` |
| `review_reason` | Human-readable reason |
| `business_judgment_required` | `true` for roofer business-judgment items |
| `system_quality_issue` | `true` for RoofLeadHQ/Jason system-quality items |
| `source_state` | Workflow state before review |
| `target_state` | Workflow state after review routing |
| `required_manual_next_step` | Required manual action before proceeding |
| `hold_or_block_reason` | Hold/block reason when applicable |
| `audit_event_id` | Linked audit event reference |
| `live_action_allowed` | Always `"no"` in fixture dry-run |
| `production_data_touched` | Always `"no"` in fixture dry-run |
| `external_services_called` | Always `"no"` in fixture dry-run |

## 6. Scenario Coverage

All 25 existing scenarios are preserved:

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

Scenarios with explicit review queue items include missing information, duplicate review, roofer review needed, RoofLeadHQ system review needed, inspection missed reschedule, and custom review paths. A routing catalog supplements coverage for all required routing types.

## 7. Safety Assertions

The verifier enforces deterministic read-only assertions including:

- `roofer_review_owns_business_judgment`
- `roofleadhq_review_limited_to_system_quality`
- All 11 roofer routing types route to roofer review
- All 10 RoofLeadHQ routing types route to RoofLeadHQ/Jason system review
- `review_queue_items_are_fake_data_only`
- `review_queue_does_not_send_notifications`
- `review_queue_does_not_touch_production_data`
- `review_queue_does_not_call_external_services`
- `live_review_notification_blocked_when_flag_false`
- `review_decisions_are_audited`
- `review_owner_required_before_next_step`
- `review_item_has_required_manual_next_step`
- `live_action_allowed_is_no_for_all_review_items`
- `production_data_touched_is_no_for_all_review_items`
- `external_services_called_is_no_for_all_review_items`

The verifier fails closed if required fields, required scenarios, required ownership boundaries, or safety assertions are missing.

## 8. Activation-Flag Boundary

All activation flags default to `false`. Review queue items set `live_action_allowed: "no"`. Live review notifications are blocked when activation flags are false. The activation flag false scenario (`activation_flag_false_blocks_live_action_path`) continues to demonstrate blocked live actions.

## 9. No Production Data / No External Calls / No Live Notifications

- Review queue items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live review notifications are sent.
- No live automation is activated.

## 10. Future Native Workflow Engine Support

This packet models review queue behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- review item field contracts
- ownership boundaries
- routing type catalog
- audit linkage expectations
- safety assertions

It does **not** implement schema, persistence, or production workflow behavior.

## 11. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents ownership boundaries and safety rules. Founder-operated manual review, routing commands, and bridge packets remain independent operational layers.

## 12. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All review queue output is fake-data fixture only. Live automation remains disabled unless Jason explicitly approves activation.

## Local E2E Fixture Runner Relationship

The local E2E fixture runner packet can consume review queue fixture output shape as a reference for future staged testing. This expansion does not activate the local E2E runner or any live path.

## First Paid Roofer Relationship

First paid roofer onboarding and manual bridge packets remain the operational path for real roofer work. This expansion provides deterministic fixture evidence for review queue ownership boundaries without replacing manual founder-operated review.

## How to Run

```bash
bash scripts/run-native-workflow-fixture-review-queue-expansion-dry-run.sh
```

Or run the verifier directly:

```bash
node backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js
```