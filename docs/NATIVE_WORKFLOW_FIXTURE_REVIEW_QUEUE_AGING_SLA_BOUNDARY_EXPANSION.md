# Native Workflow Fixture Review Queue Aging / SLA Boundary Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data review queue aging and SLA-boundary coverage so RoofLeadHQ can track review item age, manual next-step ownership, stale holds, blocked states, and escalation readiness without sending live notifications or changing production data.

It deepens the fixture review queue aging layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only review queue aging / SLA boundary expansion
- fake data only
- deterministic `review_queue_aging_items` and aging summaries
- explicit age buckets, stale review flags, hold/blocked states, and manual next-step ownership
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production review queue aging engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live review notifications, SMS, email, calls, or calendar events.
- This does **not** change public website/pricing/legal/privacy/terms or public SLA/support copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that review queue aging, SLA boundaries, stale holds, blocked states, manual next-step ownership, and escalation readiness are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

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
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_AGING_SLA_BOUNDARY_EXPANSION.md`
- `scripts/run-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `6e3f68f test(workflow): expand native workflow fixture data boundary`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `review_queue_aging_sla_expansion_summary`, `review_queue_aging_items`, `review_age_bucket_summary`
- `stale_review_summary`, `blocked_review_summary`, `hold_state_summary`
- `manual_next_step_owner_summary`, `roofer_review_aging_summary`, `roofleadhq_review_aging_summary`
- `review_sla_boundary_summary`, `review_queue_aging_safety_assertions`
- per-scenario `review_queue_aging_items`

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

## 4. Review Aging Coverage

| Coverage area | Review type / scenario |
| --- | --- |
| pricing / estimate / quote / insurance / payment / contract | roofer business-judgment routing types |
| homeowner asks for roofer directly | `homeowner_asks_for_roofer_directly` |
| upset homeowner | `upset_homeowner` |
| bad or unclear AI response | `bad_or_unclear_ai_response` |
| missed data capture | `missed_data_capture` |
| broken routing | `broken_routing` |
| source attribution issue | `source_attribution_issue` |
| dashboard/report discrepancy | `dashboard_report_discrepancy` |
| workflow state confusion | `workflow_state_confusion` |
| setup issue | `setup_issue` |
| feedback permission mismatch | `feedback_permission_mismatch` |
| missed lead recovery blocked | `missed_lead_recovery_blocked` |
| appointment readiness blocked | `appointment_readiness_blocked` |
| post-inspection follow-up blocked | `post_inspection_follow_up_blocked` |
| usage volume/custom review | `volume_exceeds_500`, `multi_location` |
| data boundary/PII issue | `data_boundary_pii_issue` |

## 5. Review Queue Aging Item Fields

Each `review_queue_aging_item` includes:

- `review_queue_aging_item_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`
- `review_item_id`, `review_type`, `review_owner`, `review_reason`
- `source_state`, `target_state`, `current_state`
- `created_at_fixture`, `last_updated_at_fixture`, `age_hours`, `age_bucket`
- `stale_review`, `blocked_state`, `hold_state`, `hold_reason`
- `required_manual_next_step`, `next_step_owner`, `next_step_due_date_fixture`, `next_step_overdue`
- `roofer_review_required`, `roofleadhq_review_required`
- `business_judgment_required`, `system_quality_issue`
- `escalation_ready_for_manual_review`
- `notification_allowed: no`, `live_notification_sent: no`
- `production_data_touched: no`, `external_services_called: no`
- `audit_event_id`

## 6. Review Aging Rules

- Review queue aging is fake-data/local-only.
- Aging buckets are deterministic: `0-4h`, `4-24h`, `24-48h`, `48h+`.
- Stale review is flagged when fake age crosses the fixture threshold (24 hours).
- Blocked and hold states preserve the reason and required manual next step.
- Roofer review owns business judgment items.
- RoofLeadHQ/Jason review remains limited to system/workflow/data/routing/quality issues.
- Stale review may be marked `escalation_ready_for_manual_review` but must not send notifications.
- No live SMS, email, call, notification, calendar event, CRM sync, or external service call may occur.
- No production data may be touched.

## 7. Verifier Assertions

The read-only verifier enforces:

- `review_queue_aging_sla_expansion_summary_present`
- `review_queue_aging_items_present`
- `review_queue_aging_item_required_fields_present`
- `review_age_bucket_summary_present`
- `stale_review_summary_present`
- `blocked_review_summary_present`
- `hold_state_summary_present`
- `manual_next_step_owner_summary_present`
- `roofer_review_aging_summary_present`
- `roofleadhq_review_aging_summary_present`
- `review_sla_boundary_summary_present`
- `age_bucket_is_deterministic`
- `stale_review_flag_uses_fixture_threshold`
- `blocked_state_has_hold_reason`
- `hold_state_has_required_manual_next_step`
- `next_step_owner_present_for_all_review_items`
- `next_step_due_date_fixture_present_for_all_review_items`
- `overdue_review_does_not_send_notification`
- `escalation_ready_does_not_send_notification`
- `roofer_review_owns_business_judgment_items`
- `roofleadhq_review_limited_to_system_quality_items`
- `notification_allowed_is_no_for_all_items`
- `live_notification_sent_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `review_queue_aging_is_fake_data_only`
- `review_queue_aging_is_audited`
- `reporting_summary_includes_review_queue_aging`
- `public_sla_or_support_copy_not_changed_without_approval`

## 8. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 9. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence that review queue aging, SLA boundaries, stale holds, blocked states, and escalation readiness are tracked safely before any production persistence. It is internal-only and must not be copied into public sales copy or public SLA/support copy without approval.