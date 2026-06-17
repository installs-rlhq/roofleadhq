# Native Workflow Fixture Manual-to-Native Handoff Rehearsal Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data manual-to-native handoff rehearsal coverage so RoofLeadHQ can model how first-roofer manual/founder-operated workflow records eventually map into native workflow state without activating production persistence, schema, live sends, integrations, or customer-facing automation.

It deepens the fixture manual bridge handoff layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only manual-to-native handoff rehearsal expansion
- fake data only
- deterministic `manual_handoff_items` and handoff summaries
- explicit manual record source to native entity/state mapping rehearsal
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production handoff engine.
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

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that manual workflow records can be rehearsed into future native workflow state mappings safely before any schema, persistence, auth/RLS, or live integration work.

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
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md`
- `scripts/run-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `5c47fab test(workflow): expand native workflow fixture review aging`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `manual_to_native_handoff_expansion_summary`, `manual_handoff_items`, `manual_record_mapping_summary`
- `native_state_mapping_summary`, `handoff_gap_summary`, `handoff_review_summary`
- `handoff_blocker_summary`, `handoff_owner_summary`, `handoff_audit_summary`
- `handoff_reporting_summary`, `manual_to_native_handoff_safety_assertions`
- per-scenario `manual_handoff_items`

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

## 4. Manual Record Sources

| Manual record source | Typical manual workflow use |
| --- | --- |
| founder manual tracker | Founder/Jason manual operating log |
| guided setup intake worksheet | First-roofer guided setup intake |
| lead source setup worksheet | Lead source and attribution setup |
| response/follow-up preferences worksheet | Response and follow-up preference capture |
| booking/calendar preferences worksheet | Calendar owner and booking preferences |
| review queue tracker | Manual review queue tracking |
| missed lead recovery tracker | Missed lead recovery tracking |
| manual outreach tracker | Manual outreach tracking |
| appointment readiness tracker | Appointment readiness tracking |
| booked inspection tracker | Booked inspection tracking |
| post-inspection follow-up tracker | Post-inspection follow-up tracking |
| feedback capture tracker | Feedback and permission capture |
| reporting snapshot tracker | Reporting snapshot tracking |
| CSV export snapshot tracker | CSV export snapshot tracking |

## 5. Native Entity Targets

| Native entity target | Rehearsal purpose |
| --- | --- |
| roofer_account | Future roofer account state |
| plan_profile | Future plan profile state |
| lead_record | Future lead record state |
| lead_source | Future lead source state |
| homeowner_contact | Future homeowner contact state |
| message_thread | Future message thread state |
| follow_up_state | Future follow-up state |
| manual_outreach_record | Future manual outreach record |
| missed_lead_recovery_state | Future missed lead recovery state |
| appointment_readiness_record | Future appointment readiness record |
| booked_inspection_record | Future booked inspection record |
| post_inspection_record | Future post-inspection record |
| feedback_record | Future feedback record |
| review_queue_item | Future review queue item |
| report_snapshot | Future report snapshot |
| csv_export_snapshot | Future CSV export snapshot |
| usage_volume_record | Future usage volume record |
| safety_gate_record | Future safety gate record |
| audit_event | Future audit event |

## 6. Handoff Coverage Areas

| Coverage area | Rehearsal focus |
| --- | --- |
| setup preference handoff | Setup worksheets to roofer/plan preferences |
| lead intake handoff | Manual intake to lead/homeowner records |
| contact permission handoff | Permission uncertainty blocks messaging |
| follow-up state handoff | Follow-up preferences to follow-up state |
| missed lead recovery handoff | Recovery tracker to recovery state |
| manual outreach handoff | Outreach tracker to outreach record |
| appointment readiness handoff | Readiness tracker with calendar owner/preferences |
| review queue handoff | Review tracker to review queue item |
| post-inspection handoff | Post-inspection tracking without estimate automation |
| feedback permission handoff | Permission yes/no/not_asked preservation |
| reporting snapshot handoff | Reporting snapshot to report snapshot |
| CSV export snapshot handoff | One-directional CSV export rehearsal |
| usage volume handoff | Volume tracking without live billing |
| lead source / ROI handoff | Attribution without exact ROI or ad-platform calls |
| audit event timeline handoff | Manual audit to audit event |
| data boundary / PII minimization handoff | Boundary checks to safety gate |
| review aging / SLA handoff | Review aging to review queue escalation |

## 7. Manual Handoff Item Fields

Each `manual_handoff_item` includes:

- `manual_handoff_item_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`
- `manual_record_source`, `manual_record_type`, `manual_record_status`
- `native_entity_target`, `native_state_target`
- `source_manual_status`, `mapped_native_state`, `mapping_confidence`
- `handoff_ready`, `handoff_blocked`, `handoff_block_reason`
- `required_manual_next_step`, `next_step_owner`
- `roofer_review_required`, `roofleadhq_review_required`, `review_reason`
- `business_judgment_required`, `system_quality_issue`
- `data_boundary_checked`, `pii_minimization_checked`, `audit_event_id`
- `production_persistence_allowed: no`, `schema_change_allowed: no`, `live_action_allowed: no`
- `notification_sent: no`, `production_data_touched: no`, `external_services_called: no`

## 8. Handoff Rules

- Handoff mapping is rehearsal only — no Supabase persistence.
- Handoff readiness requires data boundary check, PII minimization check, audit event, review owner, and blocker checks.
- Missing required setup preferences must block handoff readiness.
- Contact permission uncertainty must block messaging-related handoff readiness.
- Do-not-contact must block outreach-related handoff readiness.
- Appointment readiness handoff must require calendar owner and booking preferences, but must not create calendar events.
- Post-inspection handoff may track estimate_needed or estimate_sent, but must not generate estimates, quotes, invoices, payments, or deposits.
- Feedback handoff must preserve permission_to_use_publicly values exactly as yes/no/not_asked and must not publish feedback or testimonials.
- CSV/reporting handoff must remain one-directional, fake-data-only, and not CRM sync.
- Usage volume and source ROI handoff must avoid live billing, exact ROI promises, or ad-platform calls.

### Review ownership rules

- Roofer/contractor review owns business judgment such as pricing, estimates, quotes, insurance, payment, invoice, contract, repair vs replacement, scheduling discretion, upset homeowner response, and public testimonial decisions.
- RoofLeadHQ/Jason review remains limited to system/workflow/data/routing/quality issues such as broken routing, bad/unclear AI response, missed data capture, source attribution issue, dashboard/report discrepancy, state mismatch, setup issue, failed handoff, or data boundary issue.
- Do not route business judgment to Jason/RoofLeadHQ as if RoofLeadHQ is the roofer.

## 9. Verifier Assertions

The read-only verifier enforces:

- `manual_to_native_handoff_expansion_summary_present`
- `manual_handoff_items_present`
- `manual_handoff_item_required_fields_present`
- `required_manual_record_sources_present`
- `required_native_entity_targets_present`
- `manual_record_mapping_summary_present`
- `native_state_mapping_summary_present`
- `handoff_gap_summary_present`
- `handoff_review_summary_present`
- `handoff_blocker_summary_present`
- `handoff_owner_summary_present`
- `handoff_audit_summary_present`
- `setup_preferences_required_before_handoff_ready`
- `contact_permission_uncertainty_blocks_messaging_handoff`
- `do_not_contact_blocks_outreach_handoff`
- `appointment_handoff_requires_calendar_owner_and_booking_preferences`
- `appointment_handoff_does_not_create_calendar_event`
- `post_inspection_handoff_does_not_generate_estimate_quote_invoice_payment`
- `feedback_handoff_preserves_permission_values_yes_no_not_asked`
- `feedback_handoff_does_not_publish_feedback_or_testimonial`
- `csv_handoff_is_one_directional`
- `csv_handoff_is_not_crm_sync`
- `usage_volume_handoff_does_not_trigger_live_billing`
- `source_roi_handoff_does_not_promise_exact_roi`
- `source_roi_handoff_does_not_call_ad_platforms`
- `roofer_review_owns_business_judgment_handoff_items`
- `roofleadhq_review_limited_to_system_quality_handoff_items`
- `handoff_ready_requires_data_boundary_check`
- `handoff_ready_requires_pii_minimization_check`
- `handoff_ready_requires_audit_event`
- `production_persistence_allowed_is_no_for_all_items`
- `schema_change_allowed_is_no_for_all_items`
- `live_action_allowed_is_no_for_all_items`
- `notification_sent_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `no_supabase_calls`, `no_schema_migrations_auth_rls_security_changes`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `manual_to_native_handoff_is_fake_data_only`
- `manual_to_native_handoff_is_audited`
- `reporting_summary_includes_manual_to_native_handoff`
- `public_implementation_or_go_live_copy_not_changed_without_approval`

## 10. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 11. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence that manual/founder-operated workflow records can be rehearsed into future native workflow state mappings safely before any production persistence. It is internal-only and must not be copied into public sales copy or public go-live copy without approval.