# Native Workflow Fixture Audit Event / Timeline Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data audit event and state-transition timeline coverage so every important workflow decision has a traceable audit trail before any future schema or persistence work.

It deepens the local fixture audit layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only audit event / timeline expansion
- fake data only
- deterministic audit event items and state-transition timeline items
- guard decision trace, review routing trace, activation flag audit, manual next-step audit, and data boundary audit summaries
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production audit persistence system.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** log secrets, credentials, env values, or real homeowner data.
- This does **not** trigger live notifications, sends, production writes, external calls, or CRM sync.
- This does **not** change public website/pricing/legal/privacy/terms copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that workflow decisions, guard outcomes, review routing, activation-flag blocks, manual next steps, and data boundaries are auditable and verified before any schema, persistence, auth/RLS, or live integration work.

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
- `docs/NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MESSAGING_COMPLIANCE_CONTACT_PERMISSION_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_AUDIT_EVENT_TIMELINE_EXPANSION.md`
- `scripts/run-native-workflow-fixture-audit-event-timeline-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `aec097a test(workflow): expand native workflow fixture messaging compliance`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `audit_event_timeline_expansion_summary`, `audit_event_items`, `state_transition_timeline_items`
- `guard_decision_trace_summary`, `review_routing_trace_summary`, `activation_flag_audit_summary`
- `manual_next_step_audit_summary`, `data_boundary_audit_summary`, `timeline_reporting_summary`
- `audit_event_safety_assertions`
- per-scenario `audit_event_timeline_items` and `state_transition_timeline_items`

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

## 4. Audit Coverage Areas

| Coverage area | Purpose |
| --- | --- |
| lead_intake_state_decision | Lead intake and early state progression |
| missing_information_routing | Missing contact/service data routes to MISSING_INFO or HOLD |
| duplicate_review_routing | Duplicate lead routes to review |
| bad_fit_excluded_routing | Excluded service area routes to BAD_FIT_OR_EXCLUDED |
| do_not_contact_blocking | Do-not-contact blocks outreach and progression |
| messaging_compliance_contact_permission_decision | Contact permission and channel eligibility |
| follow_up_missed_lead_recovery_decision | Follow-up and missed-lead recovery routing |
| manual_outreach_decision | Manual outreach ownership and boundaries |
| appointment_readiness_decision | Appointment readiness prerequisites and blocks |
| review_queue_ownership_decision | Roofer vs RoofLeadHQ review ownership |
| post_inspection_decision | Post-inspection tracking and follow-up routing |
| feedback_permission_decision | Feedback capture and public-use permission |
| reporting_csv_boundary_decision | Reporting/CSV one-directional export boundaries |
| usage_volume_plan_limit_decision | Starter/Growth/Elite/Custom plan volume limits |
| lead_source_roi_boundary_decision | Lead source attribution and ROI boundaries |
| activation_flag_blocking_decision | Activation flags block live actions |

## 5. Audit Event Item Fields

Each `audit_event_item` includes:

- `audit_event_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`
- `event_timestamp_fixture`, `event_sequence`, `event_type`, `coverage_area`
- `source_state`, `target_state`, `decision_reason`
- `guard_assertion_refs`, `review_owner`, `review_reason`, `required_manual_next_step`
- `activation_flag_checked`, `live_action_blocked`, `data_boundary_checked`
- `homeowner_personal_information_minimized`
- `secret_or_credential_logged: no`
- `live_action_performed: no`
- `production_data_touched: no`
- `external_services_called: no`

## 6. State Transition Timeline Item Fields

Each `state_transition_timeline_item` includes:

- `timeline_item_id`, `scenario_id`, `lead_id`, `event_sequence`
- `from_state`, `to_state`, `transition_reason`
- `guard_result`, `blocked_reason_if_any`
- `review_required`, `review_owner`, `audit_event_id`
- `live_action_allowed: no`
- `production_data_touched: no`
- `external_services_called: no`

## 7. Audit Rules

- Every transition has a traceable fake audit event linked by `audit_event_id`.
- Every blocked live action has an activation-flag audit event.
- Every review routing decision identifies roofer review vs RoofLeadHQ system-quality review.
- Business judgment remains with roofer/contractor review.
- RoofLeadHQ/Jason review remains limited to system/workflow/data/routing/quality issues.
- Audit events must not log secrets, credentials, env values, production data, or real homeowner data.
- Audit events may use fictional/fake homeowner identifiers only.
- Audit events must not trigger live notifications, live sends, production writes, external calls, or CRM sync.

## 8. Verifier Assertions

The read-only verifier enforces:

- `audit_event_timeline_expansion_summary_present`
- `audit_event_items_present`
- `audit_event_item_required_fields_present`
- `state_transition_timeline_items_present`
- `state_transition_timeline_item_required_fields_present`
- `every_transition_has_audit_event_id`
- `every_blocked_live_action_has_activation_flag_audit_event`
- `every_review_routing_decision_has_review_owner`
- `roofer_review_owns_business_judgment_events`
- `roofleadhq_review_limited_to_system_quality_events`
- `guard_decision_trace_summary_present`
- `activation_flag_audit_summary_present`
- `data_boundary_audit_summary_present`
- `manual_next_step_audit_summary_present`
- `no_secret_or_credential_logged`
- `homeowner_personal_information_minimized`
- `live_action_performed_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`, `no_lindy_live_workflow_execution`
- `no_google_calendar_calls`, `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `audit_timeline_is_fake_data_only`
- `audit_timeline_is_deterministic`
- `reporting_summary_includes_audit_timeline`
- `public_legal_or_privacy_copy_not_changed_without_approval`

## 9. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-audit-event-timeline-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 10. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data audit evidence that workflow decisions are traceable before any production persistence. It is internal-only and must not be copied into public sales copy.