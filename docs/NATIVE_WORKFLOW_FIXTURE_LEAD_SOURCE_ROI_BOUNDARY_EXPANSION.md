# Native Workflow Fixture Lead Source Attribution / ROI Boundary Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data lead source attribution and ROI boundary coverage so RoofLeadHQ can track lead sources, booked inspections, inspection outcomes, and customer-provided spend fields without promising exact ROI, syncing to CRMs, touching production data, or triggering live reporting/export behavior.

It deepens the local fixture lead source layer without adding production behavior, persistence, schema, live ad platform integrations, or live automation.

### What this packet is

- local fixture-only lead source attribution / ROI boundary expansion
- fake data only
- deterministic lead source attribution summaries and items
- required lead source categories (Website form, Google Ads, Google Business Profile, Google Local Services Ads, Facebook Lead Ads, Angi / HomeAdvisor, Thumbtack, Referrals, Manual outreach list, Other)
- unknown-source and conflicting-source review routing
- customer-provided spend and indicative cost-per-lead / cost-per-booked-inspection boundaries
- CSV/reporting one-directional export boundaries
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production lead source attribution engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** promise exact ROI.
- This does **not** call Google Ads, Facebook, Angi, Thumbtack, or any ad platform API.
- This does **not** sync with CRM.
- This does **not** push CSV/report data anywhere live.
- This does **not** change public website/pricing/legal/privacy/terms copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that lead source attribution rules, ROI boundaries, CSV/reporting limits, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, ad platform integration, or live integration work.

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
- `docs/NATIVE_WORKFLOW_FIXTURE_USAGE_VOLUME_PLAN_LIMIT_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md`
- `scripts/run-native-workflow-fixture-lead-source-roi-boundary-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `9e84029 test(workflow): expand native workflow fixture usage volume`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `lead_source_roi_expansion_summary`, `lead_source_attribution_items`
- `lead_source_quality_summary`, `lead_source_unknown_summary`
- `campaign_ad_source_summary`, `source_conversion_summary`
- `source_roi_boundary_summary`, `customer_provided_spend_summary`
- `source_reporting_summary`, `source_csv_export_summary`
- `lead_source_review_summary`, `lead_source_safety_assertions`
- per-scenario `lead_source_attribution_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, post-inspection fields, feedback permission fields, manual outreach fields, missed lead recovery fields, usage volume fields, and existing output fields remain intact.

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
- **no ad platform API calls**
- **no bidirectional CRM integration**
- **no live CSV generation or delivery**
- **no customer notifications**
- **no public website/pricing/legal/privacy/terms publication changes**

## 4. Lead Source Attribution Model

Lead source should be captured when available. Required categories in fixture coverage:

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

Unknown lead source is allowed only when explicitly marked unknown (`lead_source_unknown_marker_used: true`). Unknown or conflicting attribution routes to review or carries a data quality note. Campaign/ad source is optional and must be marked `unknown` or `not_provided` when absent.

Source attribution issues route to RoofLeadHQ/Jason system-quality review, not roofer business judgment, unless the roofer must clarify their own source setup. No source attribution should trigger live reporting, CRM sync, production writes, or notifications.

## 5. ROI Boundary Model

ROI fields depend on customer-provided spend/source data. RoofLeadHQ does not promise exact ROI unless accurate customer-provided spend/source data exists. Missing spend data produces notes such as "not provided" or "requires customer-provided spend data."

Cost per lead and cost per booked inspection may be represented only in fake data where spend and counts are present. RoofLeadHQ does not infer real customer ad spend and does not call ad platforms.

Every attribution item preserves:

- `exact_roi_promised: no`
- `native_crm_sync_allowed: no`
- `pushes_data_back_to_roofleadhq: no`
- `production_data_touched: no`
- `external_services_called: no`
- `live_csv_delivery_performed: no`

## 6. CSV / Reporting Boundaries

CSV remains one-directional. CSV is fake-data/local only. CSV does not push data back to RoofLeadHQ. CSV does not auto-update after download. CSV is not bidirectional CRM integration. CSV may contain homeowner personal information warnings. Contractor/customer remains responsible for downloaded/exported data handling.

## 7. Required Attribution Item Fields

Each `lead_source_attribution_item` includes:

- `lead_source_item_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`, `report_period`
- `lead_source`, `lead_source_detail`, `campaign_or_ad_source_if_known`
- `lead_source_status`, `lead_source_unknown_marker_used`
- `source_attribution_confidence`, `source_attribution_review_needed`, `source_attribution_review_reason`
- `total_count_from_source`, `booked_inspection_from_source`, `inspection_completed_from_source`
- `won_from_source`, `lost_from_source`, `still_open_from_source`
- `missed_lead_recovery_from_source`, `feedback_captured_from_source`
- `ad_spend_if_provided`, `cost_per_lead_if_provided`, `cost_per_booked_inspection_if_provided`, `roi_notes`
- `roi_calculation_allowed`, `exact_roi_promised`, `native_crm_sync_allowed`
- `pushes_data_back_to_roofleadhq`, `production_data_touched`, `external_services_called`, `live_csv_delivery_performed`

## 8. Safety Assertions

Required safety assertions include:

- `lead_source_roi_expansion_summary_present`
- `lead_source_attribution_items_present`
- `lead_source_item_required_fields_present`
- `required_lead_source_categories_present`
- per-category source presence assertions
- `unknown_source_requires_unknown_marker_or_review`
- `conflicting_source_routes_to_review`
- `source_attribution_issue_routes_to_system_quality_review`
- `campaign_or_ad_source_optional_and_marked_when_missing`
- ROI and CSV boundary assertions
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `source_roi_decisions_are_audited`
- `public_roi_or_pricing_copy_not_changed_without_approval`

## 9. Verification Commands

Dry-run wrapper:

```bash
bash scripts/run-native-workflow-fixture-lead-source-roi-boundary-expansion-dry-run.sh
```

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js
```

## 10. First Paid Roofer Relationship

This packet supports first paid roofer dry-run onboarding by providing deterministic fake-data evidence that lead source tracking, conversion outcomes, and ROI boundaries are explicit before any live reporting, ad platform connection, or CRM sync work.