# Native Workflow Fixture Reporting Snapshot Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data reporting snapshots, CSV snapshots, plan-tier reporting differences, source summaries, appointment/inspection outcomes, post-inspection status, feedback permission status, and source ROI boundaries. It deepens the fixture reporting/export layer without adding production behavior, persistence, or live automation.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### What this packet is

- local fixture-only reporting snapshot expansion
- fake data only
- weekly/monthly reporting snapshot summaries
- plan-tier reporting profile definitions
- lead source summary with ROI boundaries
- CSV export snapshot with one-directional export boundaries
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production reporting engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that reporting snapshots, CSV export boundaries, plan-tier reporting differences, and ROI rules are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`
- `docs/CSV_EXPORT_READINESS_PACKET.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `scripts/run-native-workflow-fixture-reporting-snapshot-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `1b68a5d test(workflow): expand native workflow fixture guard assertions`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run (`docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`) and guard assertions expansion (`docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`) without replacing them. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `reporting_snapshot_summary`, `report_periods`, `plan_reporting_profiles`
- `lead_source_summary`, `appointment_inspection_summary`, `post_inspection_summary`, `feedback_permission_summary`
- `csv_export_snapshot_summary`, `roi_boundary_summary`, `reporting_safety_assertions`
- per-scenario `reporting_impact` and `reporting_snapshot` on relevant paths

All 25 scenarios, transition logs, guard assertions, and existing output fields remain intact.

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
- **no live CSV generation or delivery**
- **no payment/deposit/invoice/estimate automation**
- no env/credential changes
- read-only verifier only
- dry-run wrapper only
- Live automation remains disabled unless Jason explicitly approves activation.

## 4. Fake-Data Reporting Snapshot Principles

Every reporting/export output must be fake-data only and preserve:

- `live_actions_performed: no`
- `production_data_touched: no`
- `external_services_called: no`

Reporting snapshots include `generated_from: fixture_runner_fake_data` and `fake_data_only: true`. No production records, no Supabase queries, no external service calls.

## 5. Weekly/Monthly Report Snapshot Expectations

Required report periods:

- **weekly** — snapshot keyed to a fixture week (e.g. `2026-W24`)
- **monthly** — snapshot keyed to a fixture month (e.g. `2026-06`)

Each snapshot includes lead counts, workflow state tallies, appointment/inspection outcomes, post-inspection status, feedback permission counts, and CSV export state. Live delivery is blocked when activation flags are false.

## 6. Plan-Tier Reporting Profile Expectations

### Starter reporting profile

- basic lead count
- basic response/follow-up summary
- basic appointment booked status
- basic weekly/monthly summary
- limited/basic CSV summary if included
- no advanced source ROI by default
- no complex routing summary by default

### Growth reporting profile

- lead source tracking
- missed-lead recovery tracking
- appointment readiness tracking
- booked inspection tracking
- post-inspection follow-up tracking
- feedback capture tracking
- weekly/monthly reporting
- CSV export

### Elite reporting profile

- deeper source segmentation
- advanced reporting
- larger review queue visibility
- detailed CSV/export
- source conversion summaries
- campaign/ad source if provided
- ROI fields only when customer-provided spend/source data exists

### Custom Review reporting profile

- 500+ leads/month
- 2+ locations
- multiple calendars
- multiple phone numbers
- multiple sales reps
- complex routing
- advanced reporting
- unusual integration needs
- custom reporting fields
- requires review before self-serve/native default

## 7. Lead Source Summary Expectations

Fake lead source rows for at least:

- Website form
- Google Ads
- Google Business Profile
- Google Local Services Ads
- Facebook Lead Ads
- Angi / HomeAdvisor
- Thumbtack
- Referrals
- Manual outreach list
- Other

Each source row includes: `lead_source`, `total_count`, `appointment_booked_count`, `inspection_completed_count`, `won_count`, `lost_count`, `still_open_count`, `missed_lead_recovery_count`, `feedback_captured_count`, `ad_spend_if_provided`, `cost_per_lead_if_provided`, `cost_per_booked_inspection_if_provided`, `roi_notes`, `data_quality_note`.

## 8. Appointment/Inspection Summary Expectations

The appointment/inspection summary tracks:

- appointment_readiness_pending
- appointment_ready
- appointment_booked (booked homeowner appointments / booked inspections)
- inspection_completed
- inspection_missed_or_reschedule_needed

All counts are fixture fake-data only.

## 9. Post-Inspection Summary Expectations

The post-inspection summary tracks:

- post_inspection_follow_up_needed
- estimate_needed / estimate_sent (tracking only — no document generation)
- homeowner_follow_up_needed
- roofer_follow_up_needed
- still_open, won, lost

## 10. Feedback Permission Summary Expectations

The feedback permission summary tracks:

- feedback_requested, feedback_captured, feedback_issue_flagged
- permission_to_use_publicly_yes / no / not_asked

Valid values are **yes**, **no**, and **not_asked** only. The field name `permissiontousepublicly` must not appear.

## 11. CSV Snapshot Expectations

The fake CSV snapshot includes:

- `header_row` with required export columns
- `sample_rows` with fictional homeowner data
- `row_count`, `report_period`, `generated_from`, `fake_data_only`
- boundary booleans (see section 12)

Sample rows use generic roofer-owned calendars such as **Main Sales Calendar** or **Acme Roofing Calendar** — not Jason-RLHQ.

## 12. CSV One-Directional / No Native CRM Sync Boundaries

CSV export is **one-directional reporting only**:

- `one_directional_export: true`
- `native_crm_sync: false`
- `pushes_data_back_to_roofleadhq: false`
- `auto_updates_from_downloaded_file: false`
- `fake_data_only: true`

CSV is not bidirectional CRM integration. Downloaded exports do not sync back to RoofLeadHQ or auto-update from downloaded files.

## 13. Source ROI Boundary Rules

- ROI fields must be null, `not_provided`, or clearly marked unavailable unless fake customer-provided spend/source data is present.
- RoofLeadHQ does **not** promise exact ROI.
- ROI depends on customer-provided spend/source data.
- When spend data is present in fixtures, values are indicative only.

## 14. Homeowner Personal Information / Downloaded Export Responsibility Notes

- `contains_homeowner_personal_information: true` — CSV exports include homeowner PII.
- `customer_responsible_for_downloaded_exported_data: true` — the roofer/customer is responsible for securing downloaded/exported data.
- Fixture snapshots document these boundaries; no live CSV delivery occurs while activation flags are false.

## 15. Reporting Guard Assertions

Explicit reporting guard assertions verified by the read-only verifier:

- reporting_snapshot_uses_fake_data_only
- reporting_snapshot_does_not_touch_production_data
- weekly_report_snapshot_present / monthly_report_snapshot_present
- lead_source_summary_present
- appointment_inspection_summary_present
- post_inspection_summary_present
- feedback_permission_summary_present
- csv_snapshot_present
- csv_header_contains_required_fields
- csv_sample_rows_are_fictional
- csv_calendar_owner_not_jason_rlhq
- permission_to_use_publicly_values_are_valid
- permissiontousepublicly_absent
- csv_export_is_one_directional
- csv_not_native_crm_sync
- csv_does_not_push_data_back
- csv_does_not_auto_update_from_downloaded_file
- csv_contains_homeowner_personal_information_warning
- customer_responsible_for_downloaded_exported_data
- source_roi_depends_on_customer_provided_spend_source_data
- no_exact_roi_promise_without_customer_data
- starter_reporting_limited_to_basic_summary
- growth_reporting_includes_source_tracking_and_csv
- elite_reporting_includes_advanced_segmentation_if_provided
- custom_reporting_requires_review_for_complex_scope
- live_csv_delivery_blocked_when_flag_false
- live_reporting_delivery_blocked_when_flag_false
- reporting_does_not_call_external_services

## 16. Local E2E Runner Relationship

This packet connects to the Local E2E Fixture Runner (`docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`). The fixture state model dry-run runner provides deterministic stdout JSON that the local E2E runner can consume in staged E2E testing. Reporting snapshot expansion adds verifiable reporting/export shape without activating live routes or external services.

## 17. First Paid Roofer Relationship

The first paid roofer launch uses manual bridge and guided setup paths. This reporting snapshot expansion defines what weekly/monthly reporting, CSV export, and plan-tier reporting differences should look like in fixture form before native workflow implementation. The first paid roofer does not receive live CSV delivery or live reporting until Jason explicitly approves activation.

## 18. Future Implementation Sequence

1. Fixture state model dry-run (complete)
2. Guard assertions expansion (complete)
3. Reporting snapshot expansion (this packet)
4. Future: native workflow entity state implementation with Supabase source of truth
5. Future: auth/RLS and schema work
6. Future: staged E2E with approved activation flags
7. Future: live CSV export and reporting delivery with explicit activation

## 19. Forbidden/Preferred Language Guardrails

### Avoid

- language that implies booking or closing roofing jobs for the roofer
- hard revenue outcome promises or guaranteed job counts
- hard appointment outcome promises
- unattended document generation for estimates, quotes, invoices, or payments
- two-way CRM integration claims
- fabricated endorsements or pressured public praise campaigns
- unattended no-human-oversight claims

### Use

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
- roofer review / contractor review
- guided setup
- fixture state model
- reporting snapshot
- fake data
- native workflow engine
- Supabase source of truth
- plan configuration profiles
- staged E2E testing
- manual bridge
- dry-run only