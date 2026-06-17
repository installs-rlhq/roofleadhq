# Native Workflow Fixture End-to-End Acceptance Rehearsal Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data end-to-end acceptance rehearsal coverage that ties together lead intake, contact permission, follow-up, missed lead recovery, manual outreach, appointment readiness, review queue, post-inspection, feedback permission, reporting/CSV, usage volume, source ROI, audit timeline, data boundary, review aging, and manual-to-native handoff without activating production persistence, schema, live sends, integrations, or customer-facing automation.

It deepens the fixture acceptance rehearsal layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only end-to-end acceptance rehearsal expansion
- fake data only
- deterministic `e2e_acceptance_rehearsal_items` and acceptance summaries
- explicit cross-cutting acceptance path rehearsal across all prior fixture expansions
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production acceptance test suite.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live SMS, email, calls, notifications, or calendar events.
- This does **not** generate estimates, quotes, invoices, payments, or deposits.
- This does **not** publish feedback or testimonials.
- This does **not** sync to CRM or deliver live CSV exports.
- This does **not** change public website/pricing/legal/privacy/terms or public go-live copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that the full native workflow fixture acceptance paths can be rehearsed safely end-to-end before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

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
- `docs/NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MESSAGING_COMPLIANCE_CONTACT_PERMISSION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_AUDIT_EVENT_TIMELINE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_DATA_BOUNDARY_PII_MINIMIZATION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_AGING_SLA_BOUNDARY_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_E2E_ACCEPTANCE_REHEARSAL_EXPANSION.md`
- `scripts/run-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `d50d86e test(workflow): rehearse native workflow handoff`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `e2e_acceptance_rehearsal_expansion_summary`, `e2e_acceptance_rehearsal_items`
- `lead_to_inspection_acceptance_summary`, `missed_lead_recovery_acceptance_summary`
- `manual_outreach_acceptance_summary`, `appointment_readiness_acceptance_summary`
- `review_queue_acceptance_summary`, `post_inspection_acceptance_summary`
- `feedback_permission_acceptance_summary`, `reporting_csv_acceptance_summary`
- `usage_volume_acceptance_summary`, `source_roi_acceptance_summary`
- `audit_timeline_acceptance_summary`, `data_boundary_acceptance_summary`
- `review_aging_acceptance_summary`, `manual_to_native_handoff_acceptance_summary`
- `live_activation_boundary_summary`, `e2e_acceptance_safety_assertions`
- per-scenario `e2e_acceptance_rehearsal_items`

All 25 scenarios, transition logs, guard assertions, and prior expansion output fields remain intact.

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

## 4. Acceptance Paths

| Acceptance path | Rehearsal focus |
| --- | --- |
| normal lead to appointment readiness | Lead intake through appointment readiness |
| missing information path | Missing required contact data routing |
| duplicate review path | Duplicate lead review routing |
| bad fit / excluded path | Service area exclusion |
| stopped do-not-contact path | Do-not-contact enforcement |
| missed lead recovery path | Missed lead recovery without live sends |
| manual outreach path | Manual outreach tracking only |
| roofer review path | Roofer business judgment review |
| RoofLeadHQ system-quality review path | System/workflow/data/routing/quality review |
| appointment booked tracking path | Appointment booked fixture tracking |
| inspection completed path | Completed inspection tracking |
| inspection missed / reschedule path | Missed inspection reschedule routing |
| post-inspection still-open path | Still-open post-inspection tracking |
| estimate needed / estimate sent tracking path | Estimate tracking only, no generation |
| homeowner follow-up needed path | Homeowner follow-up tracking |
| roofer follow-up needed path | Roofer follow-up tracking |
| feedback permission yes path | Public-use permission yes |
| feedback permission no path | Public-use permission no |
| feedback permission not_asked path | Public-use permission not_asked |
| CSV/reporting snapshot path | Fake-data reporting and CSV snapshot |
| Starter plan profile path | Starter plan boundary |
| Growth plan profile path | Growth plan boundary |
| Elite plan profile path | Elite plan boundary |
| Custom Review 500+ leads path | Custom review volume trigger |
| Custom Review 2+ locations path | Custom review multi-location trigger |
| usage volume / plan limit path | Usage volume without live billing |
| lead source / ROI boundary path | Source attribution without exact ROI |
| messaging compliance / contact permission path | Contact permission and channel eligibility |
| audit timeline path | Traceable audit events |
| data boundary / PII minimization path | Data boundary and PII minimization |
| review aging / SLA boundary path | Review aging without live notifications |
| manual-to-native handoff rehearsal path | Handoff mapping rehearsal only |
| activation flag false blocks live action path | Live activation boundary enforcement |

## 5. E2E Acceptance Item Fields

Each `e2e_acceptance_rehearsal_item` includes:

- `e2e_acceptance_item_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`
- `starting_state`, `final_state`, `lead_source`, `contact_permission_status`
- `homeowner_contact_ready`, `follow_up_state`, `missed_lead_recovery_status`
- `manual_outreach_needed`, `appointment_readiness_status`, `appointment_booked`
- `inspection_status`, `post_inspection_status`, `feedback_status`
- `permission_to_use_publicly`, `report_snapshot_ready`, `csv_snapshot_ready`
- `usage_volume_status`, `source_roi_boundary_status`, `review_queue_status`
- `review_age_bucket`, `manual_to_native_handoff_ready`
- `audit_event_count`, `guard_assertion_count`, `safety_assertion_count`
- `required_manual_next_step`, `next_step_owner`
- `roofer_review_required`, `roofleadhq_review_required`
- `business_judgment_required`, `system_quality_issue`
- `data_boundary_checked`, `pii_minimization_checked`
- `live_activation_flags_all_false: true`
- `live_action_allowed: no`, `notification_sent: no`
- `production_data_touched: no`, `external_services_called: no`
- `result`

## 6. Acceptance Rules

- Every acceptance item must be fake-data/local-only.
- Every acceptance item must include audit events and guard assertions.
- Every live activation flag must remain false.
- Every blocked live action must remain blocked and audited.
- No acceptance item may send SMS, email, calls, notifications, calendar events, CSV deliveries, billing actions, CRM syncs, or external calls.
- No acceptance item may touch production data.
- No acceptance item may create schema, migrations, auth, RLS, security, or Supabase persistence.
- Roofer review owns business judgment.
- RoofLeadHQ/Jason review remains limited to system/workflow/data/routing/quality issues.
- Feedback public-use permission must remain exactly yes/no/not_asked.
- Feedback or testimonials must not be published.
- CSV must remain one-directional, fake-data-only, and not CRM sync.
- Usage volume must not trigger live billing or auto-upgrade.
- Source ROI must not promise exact ROI or call ad platforms.
- Manual-to-native handoff must not create database records or activate persistence.

## 7. Verifier Assertions

The read-only verifier enforces:

- `e2e_acceptance_rehearsal_expansion_summary_present`
- `e2e_acceptance_rehearsal_items_present`
- `e2e_acceptance_item_required_fields_present`
- `all_required_acceptance_paths_present`
- `lead_to_inspection_acceptance_summary_present`
- `missed_lead_recovery_acceptance_summary_present`
- `manual_outreach_acceptance_summary_present`
- `appointment_readiness_acceptance_summary_present`
- `review_queue_acceptance_summary_present`
- `post_inspection_acceptance_summary_present`
- `feedback_permission_acceptance_summary_present`
- `reporting_csv_acceptance_summary_present`
- `usage_volume_acceptance_summary_present`
- `source_roi_acceptance_summary_present`
- `audit_timeline_acceptance_summary_present`
- `data_boundary_acceptance_summary_present`
- `review_aging_acceptance_summary_present`
- `manual_to_native_handoff_acceptance_summary_present`
- `live_activation_boundary_summary_present`
- `every_acceptance_item_has_audit_events`
- `every_acceptance_item_has_guard_assertions`
- `every_acceptance_item_has_safety_assertions`
- `live_activation_flags_all_false_for_all_items`
- `live_action_allowed_is_no_for_all_items`
- `notification_sent_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `no_supabase_calls`, `no_schema_migrations_auth_rls_security_changes`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `no_estimate_quote_invoice_payment_generation`
- `roofer_review_owns_business_judgment_acceptance_items`
- `roofleadhq_review_limited_to_system_quality_acceptance_items`
- `feedback_permission_values_are_yes_no_not_asked`
- `feedback_not_published`
- `csv_acceptance_is_one_directional`
- `usage_volume_does_not_trigger_live_billing`
- `source_roi_does_not_promise_exact_roi`
- `manual_to_native_handoff_does_not_create_database_records`
- `e2e_acceptance_rehearsal_is_fake_data_only`
- `e2e_acceptance_rehearsal_is_deterministic`
- `reporting_summary_includes_e2e_acceptance`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 8. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 9. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence that the full native workflow fixture acceptance paths can be rehearsed end-to-end safely before any production persistence. It is internal-only and must not be copied into public sales copy or public go-live copy without approval.