# Native Workflow Fixture Usage Volume / Plan Limit Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data coverage for usage volume tracking and plan-limit boundaries across Starter, Growth, Elite, and Custom Review tiers.

It deepens the local fixture usage volume layer without adding production behavior, persistence, schema, live billing, or live automation.

### What this packet is

- local fixture-only usage volume / plan limit expansion
- fake data only
- deterministic usage volume summaries and items
- Starter (100 leads/month), Growth (300), Elite (500) boundaries
- Custom Review trigger coverage (500+ leads, multi-location, multiple calendars/phones/reps, complex routing, advanced custom reporting)
- fake-data-only overage tracking (no billing, no auto-upgrade, no notifications)
- draft/internal $100 per additional 50 leads concept marked not approved for billing or publication
- plan upgrade recommendation as manual review only
- reporting and CSV plan/usage context compatibility
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production billing or usage metering system.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** bill, auto-upgrade, or change customer plans.
- This does **not** send notifications.
- This does **not** publish or enforce live overage fees.
- This does **not** change public pricing copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that plan-tier volume boundaries, Custom Review triggers, overage tracking rules, plan upgrade recommendation boundaries, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, billing, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MISSED_LEAD_RECOVERY_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

This packet relates to the Local E2E Fixture Runner dry-run layer and preserves the same fake-data-only boundary.

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_USAGE_VOLUME_PLAN_LIMIT_EXPANSION.md`
- `scripts/run-native-workflow-fixture-usage-volume-plan-limit-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `00c2448 test(workflow): expand native workflow fixture missed lead recovery`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `usage_volume_expansion_summary`, `usage_volume_items`
- `plan_limit_summary`, `starter_volume_summary`, `growth_volume_summary`, `elite_volume_summary`
- `custom_review_volume_summary`, `overage_tracking_summary`, `plan_upgrade_recommendation_summary`
- `usage_volume_reporting_summary`, `usage_volume_safety_assertions`
- per-scenario `usage_volume_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, post-inspection fields, feedback permission fields, manual outreach fields, missed lead recovery fields, and existing output fields remain intact.

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
- **no live billing**
- **no customer notifications**
- **no public pricing/legal/privacy/terms publication changes**

## 4. Plan Tier Boundaries

### Starter

- up to 100 leads/month
- simple/single-location
- basic reporting
- no advanced source ROI by default
- complex routing triggers review

### Growth

- up to 300 leads/month
- single location
- missed lead recovery
- source tracking
- appointment readiness
- booked inspection tracking
- post-inspection follow-up
- feedback capture
- weekly/monthly reporting
- CSV export

### Elite

- up to 500 leads/month
- single location unless custom approved
- advanced reporting
- deeper source segmentation
- larger review queue capacity
- priority setup/support
- detailed CSV/export

### Custom Review triggers

- 500+ leads/month
- 2+ locations
- multiple calendars
- multiple phone numbers
- multiple sales reps
- complex routing
- advanced custom reporting
- unusual integration needs
- multi-location operations

## 5. Overage Rules

- Track overage in fake data only.
- Do not bill.
- Do not auto-upgrade.
- Do not change plan automatically.
- Do not send notifications.
- Do not publish or enforce a live overage fee.
- If the possible $100 per additional 50 leads concept appears, mark it draft/internal/not approved for billing or publication.

## 6. Plan Upgrade Recommendation

- `plan_upgrade_recommended` may be true in fake data when usage exceeds included volume.
- Recommendations are manual review only.
- `automatic_plan_change_allowed: "no"` for all items.
- `billing_action_allowed: "no"` for all items.
- `live_billing_action_performed: "no"` for all items.

## 7. Reporting and CSV Compatibility

Reporting summaries include plan profile and usage volume context. CSV export preserves:

- `plan_profile`
- `included_lead_volume`
- `current_period_lead_count`
- `usage_over_limit`
- `plan_limit_status`

Fixture sample rows include a growth-plan over-limit example (`usage_over_limit: yes`) for fake-data tracking only.

## 8. No Production Data / No External Calls / No Live Billing / No Notifications

- Usage volume items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live billing actions are performed.
- No customer notifications are sent.
- No public pricing copy is changed without approval.

## 9. Future Native Workflow Engine Support

This packet models usage volume and plan-limit behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- usage volume item field contracts
- plan-tier included volume boundaries
- Custom Review trigger rules
- overage tracking expectations (fake data only)
- plan upgrade recommendation boundaries
- reporting and CSV field compatibility
- safety assertions

It does **not** implement schema, persistence, billing, or production workflow behavior.

## 10. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents usage volume and plan-limit boundaries. Founder-operated manual communication command packets and bridge packets remain independent operational layers.

## 11. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All usage volume output is fake-data fixture only. Live automation and live billing remain disabled unless Jason explicitly approves activation.

## Required Usage Volume Item Fields

Each usage volume item includes: `usage_volume_item_id`, `scenario_id`, `roofer_account_id`, `plan_profile`, `report_period`, `included_lead_volume`, `current_period_lead_count`, `prior_period_lead_count`, `projected_period_lead_count`, `volume_band`, `plan_limit_status`, `usage_over_limit`, `overage_count`, `overage_block_count_if_applicable`, `plan_upgrade_recommended`, `custom_review_required`, `custom_review_reason`, `billing_action_allowed`, `automatic_plan_change_allowed`, `live_billing_action_performed`, `production_data_touched`, `external_services_called` (all safety fields `"no"` where applicable).

## Scenario Coverage

All 25 existing scenarios are preserved with usage volume items:

1. normal_lead_to_appointment_readiness
2. missing_information_path
3. duplicate_review_path (complex routing → Custom Review)
4. bad_fit_excluded_path
5. stopped_do_not_contact_path
6. missed_lead_recovery_path
7. roofer_review_needed_path (multiple phone numbers → Custom Review)
8. roofleadhq_system_review_needed_path
9. appointment_booked_path (multiple calendars → Custom Review)
10. inspection_completed_path (multiple sales reps → Custom Review)
11. inspection_missed_reschedule_path
12. post_inspection_still_open_path (Growth overage fake tracking)
13. estimate_needed_estimate_sent_tracking_path
14. homeowner_follow_up_needed_path
15. roofer_follow_up_needed_path
16. feedback_permission_yes_path
17. feedback_permission_no_path
18. feedback_permission_not_asked_path
19. csv_report_snapshot_fake_data_path (advanced custom reporting → Custom Review)
20. starter_plan_profile_path (80 leads within 100 limit)
21. growth_plan_profile_path (250 leads within 300 limit)
22. elite_plan_profile_path (450 leads within 500 limit)
23. custom_review_500_plus_leads_path (520 leads → Custom Review)
24. custom_review_two_plus_locations_path (2 locations → Custom Review)
25. activation_flag_false_blocks_live_action_path

## Safety Assertions

The verifier enforces deterministic read-only assertions including plan limit boundaries, Custom Review routing, overage fake-data-only rules, billing/plan-change blockers, reporting compatibility, and safety assertions. The verifier fails closed if required fields, plan boundaries, Custom Review triggers, or safety assertions are missing.

## Dry-Run Command

```bash
bash scripts/run-native-workflow-fixture-usage-volume-plan-limit-expansion-dry-run.sh
```

## Read-Only Verifier Command

```bash
node backend/scripts/verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js
```