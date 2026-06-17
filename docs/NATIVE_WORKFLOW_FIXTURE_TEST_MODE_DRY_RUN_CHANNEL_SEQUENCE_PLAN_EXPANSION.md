# Native Workflow Fixture Test-Mode Dry-Run Channel Sequence Plan Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data test-mode dry-run channel sequence plan coverage so RoofLeadHQ can model the safe order in which future sandbox/test-mode channels could eventually be rehearsed after explicit Jason approval — without activating sandbox credentials, live sends, external calls, production persistence, public routes, cron jobs, schedulers, dispatchers, or customer-facing automation.

It deepens the fixture channel-sequencing readiness modeling layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only test-mode dry-run channel sequence plan expansion
- fake data only
- deterministic `test_mode_channel_sequence_items` and channel sequence summaries
- explicit sequence-order modeling across fixture-only rehearsal, messaging compliance prerequisite, Twilio SMS, Resend email, Vapi calls, Google Calendar booking, CSV delivery, CRM handoff/export, Lindy bridge, scheduler/cron, dispatcher, public route/webhook, Supabase persistence, and billing/payment/invoice/estimate/quote automation
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** test-mode activation.
- This is **not** sandbox credential activation.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** read sandbox or production credentials.
- This does **not** log env values, API keys, tokens, webhook secrets, or service-role keys.
- This does **not** send live SMS, email, calls, notifications, or calendar events.
- This does **not** generate estimates, quotes, invoices, payments, or deposits.
- This does **not** sync to CRM or deliver live CSV exports.
- This does **not** enable public routes, schedulers, cron jobs, or dispatchers.
- This does **not** change public website/pricing/legal/privacy/terms or public go-live copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that future test-mode channel activation can be rehearsed in a safe, explicit sequence order before any schema, persistence, auth/RLS, sandbox credential reads, or live integration work.

### Connected launch packets

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_E2E_ACCEPTANCE_REHEARSAL_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_DRY_RUN_CHANNEL_SEQUENCE_PLAN_EXPANSION.md`
- `scripts/run-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `da5e9ec test(workflow): add sandbox test mode approval runbook`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `test_mode_channel_sequence_plan_expansion_summary`, `test_mode_channel_sequence_items`
- `channel_sequence_order_summary`, `prerequisite_gate_summary`, `approval_dependency_summary`
- `dry_run_rehearsal_scope_summary`, `channel_isolation_summary`, `rollback_dependency_summary`
- `data_boundary_sequence_summary`, `messaging_compliance_sequence_summary`, `calendar_booking_sequence_summary`
- `reporting_csv_sequence_summary`, `crm_handoff_sequence_summary`, `scheduler_dispatcher_sequence_summary`
- `public_route_sequence_summary`, `supabase_persistence_sequence_summary`, `billing_payment_quote_sequence_summary`
- `sequence_audit_summary`, `test_mode_channel_sequence_safety_assertions`
- per-scenario `test_mode_channel_sequence_items`

All 25 scenarios, transition logs, guard assertions, prior expansion output fields, sandbox/test-mode integration readiness gate output, and sandbox/test-mode approval runbook output remain intact.

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
- **no sandbox credentials** reads or writes
- **no production credentials** reads or writes
- **no env values logged**
- **no live automation** activation
- **no test-mode automation** activation
- **no integrations**
- **no external calls**
- **no bidirectional CRM integration**
- **no payment/deposit/invoice/estimate automation**
- no env/credential changes
- read-only verifier only
- dry-run wrapper only
- Live automation remains disabled unless Jason explicitly approves activation.
- Test-mode activation remains disabled unless Jason explicitly approves activation.
- Live activation requires separate explicit Jason approval.

## 4. Channel Sequence Order

| Sequence order | Channel / integration | Sequence focus |
| --- | --- | --- |
| 1 | Internal fixture-only sequence rehearsal | Dry-run rehearsal allowed without external calls |
| 2 | Messaging compliance prerequisite review | Prerequisite gate before messaging channels |
| 3 | Twilio SMS | Test-mode readiness blocked without explicit approval |
| 4 | Resend email | Test-mode readiness blocked without explicit approval |
| 5 | Vapi calls | Test-mode readiness blocked without explicit approval |
| 6 | Google Calendar booking | Test-mode readiness blocked without calendar preferences review |
| 7 | CSV delivery | Test-mode readiness blocked without data boundary review |
| 8 | CRM handoff/export | Test-mode readiness blocked; one-directional export only |
| 9 | Lindy bridge | Temporary/bridge-only; real Lindy activation forbidden |
| 10 | scheduler/cron | Scheduler readiness blocked |
| 11 | dispatcher | Dispatcher readiness blocked |
| 12 | public route/webhook | Public route readiness blocked |
| 13 | Supabase persistence | Persistence blocked until security/tenant isolation review |
| 14 | billing/payment/invoice/estimate/quote automation | Billing automation blocked |

## 5. Channel Sequence Item Fields

Each `test_mode_channel_sequence_item` includes:

- `sequence_item_id`, `sequence_order`, `scenario_id`, `roofer_account_id`, `plan_profile`
- `channel`, `integration_name`, `sequence_stage`, `prerequisite_stage`, `prerequisite_status`
- `approval_required: yes`, `explicit_approval_present: no`, `approval_evidence_present: no`
- `sandbox_credentials_required`, `sandbox_credentials_present: no`
- `production_credentials_present: no`, `env_values_logged: no`
- `public_route_required`, `public_route_enabled: no`
- `scheduler_required`, `scheduler_enabled: no`
- `dispatcher_required`, `dispatcher_enabled: no`
- `live_activation_flag_name`, `live_activation_flag_value: false`
- `test_mode_activation_allowed: no`, `live_activation_allowed: no`
- `dry_run_rehearsal_allowed` (yes only for fixture-only rehearsal)
- `external_call_allowed: no`
- `prerequisite_blocker_reason`, `required_manual_next_step`, `next_step_owner`
- `rollback_plan_required`, `rollback_plan_present`
- `post_approval_test_plan_required`, `post_approval_test_plan_present`
- `audit_event_id`
- `production_data_touched: no`, `external_services_called: no`
- `notification_sent: no`, `live_action_performed: no`

## 6. Channel Sequence Rules

- This is internal channel-sequencing readiness modeling only.
- Fixture-only sequence rehearsal may be modeled as `dry_run_rehearsal_allowed: yes` because it performs no external calls.
- All actual test-mode activation remains blocked.
- All live activation remains blocked.
- Messaging channels must remain blocked until messaging compliance review, explicit Jason approval, credential review, rollback plan, and post-approval test plan exist.
- Google Calendar booking must remain blocked until calendar booking preferences, explicit Jason approval, credential review, rollback plan, and post-approval test plan exist.
- CSV delivery must remain blocked until data handling review, explicit Jason approval, delivery review, rollback plan, and post-approval test plan exist.
- CRM handoff/export must remain blocked and must remain one-directional export only.
- Lindy bridge must remain temporary/bridge-only and blocked without explicit approval.
- Scheduler/cron/dispatcher/public route/webhook readiness must remain blocked.
- Supabase persistence must remain blocked until security/tenant isolation/schema/auth/RLS review is approved.
- Billing/payment/invoice/estimate/quote automation must remain blocked.
- No sandbox credentials should be added or read.
- No production credentials should be added or read.
- No env values, API keys, tokens, webhook secrets, service-role keys, or private config should be logged.
- No external service calls.
- No live sends.
- No test-mode sends.
- No public routes enabled.
- No scheduler, cron, or dispatcher enabled.
- No production Supabase reads or writes.
- No schema, migration, auth, RLS, or security implementation.
- Any future test-mode channel activation requires explicit Jason approval.
- Any future live activation requires separate explicit Jason approval.
- Approval must be modeled as absent by default.
- Missing explicit approval must block test-mode activation.
- Missing rollback plan must block test-mode activation.
- Missing post-approval test plan must block test-mode activation.
- Missing security/tenant isolation review must block Supabase persistence.
- Test-mode readiness may be marked BLOCKED, HOLD, or NEEDS_APPROVAL, but must not activate anything.
- Lindy safe fixture references must not be treated as live Lindy activation, but real Lindy client/API/webhook/live workflow activation must remain forbidden.

## 7. Verifier Assertions

The read-only verifier enforces:

- `test_mode_channel_sequence_plan_expansion_summary_present`
- `test_mode_channel_sequence_items_present`
- `test_mode_channel_sequence_item_required_fields_present`
- `required_channels_present`
- `sequence_order_present_and_deterministic`
- `channel_sequence_order_summary_present`
- `prerequisite_gate_summary_present`
- `approval_dependency_summary_present`
- `dry_run_rehearsal_scope_summary_present`
- `channel_isolation_summary_present`
- `rollback_dependency_summary_present`
- `data_boundary_sequence_summary_present`
- `messaging_compliance_sequence_summary_present`
- `calendar_booking_sequence_summary_present`
- `reporting_csv_sequence_summary_present`
- `crm_handoff_sequence_summary_present`
- `scheduler_dispatcher_sequence_summary_present`
- `public_route_sequence_summary_present`
- `supabase_persistence_sequence_summary_present`
- `billing_payment_quote_sequence_summary_present`
- `sequence_audit_summary_present`
- `approval_required_is_yes_for_activation_items`
- `explicit_approval_present_is_no_for_all_items`
- `approval_evidence_present_is_no_for_all_items`
- `sandbox_credentials_present_is_no_for_all_items`
- `production_credentials_present_is_no_for_all_items`
- `env_values_logged_is_no_for_all_items`
- `public_route_enabled_is_no_for_all_items`
- `scheduler_enabled_is_no_for_all_items`
- `dispatcher_enabled_is_no_for_all_items`
- `live_activation_flags_remain_false_for_all_items`
- `test_mode_activation_allowed_is_no_for_all_items`
- `live_activation_allowed_is_no_for_all_items`
- `external_call_allowed_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `notification_sent_is_no_for_all_items`
- `live_action_performed_is_no_for_all_items`
- `fixture_only_dry_run_sequence_allowed_without_external_calls`
- `messaging_compliance_prerequisite_before_messaging_channels`
- `data_boundary_prerequisite_before_csv_and_crm_delivery`
- `calendar_preferences_prerequisite_before_calendar_booking`
- `missing_explicit_approval_blocks_test_mode_activation`
- `missing_rollback_plan_blocks_test_mode_activation`
- `missing_post_approval_test_plan_blocks_test_mode_activation`
- `missing_security_tenant_isolation_review_blocks_persistence`
- `no_supabase_calls`, `no_schema_migrations_auth_rls_security_changes`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `no_estimate_quote_invoice_payment_generation`
- `safe_lindy_bridge_reference_not_live_activation`
- `real_lindy_activation_patterns_remain_forbidden`
- `test_mode_channel_sequence_plan_is_fake_data_only`
- `test_mode_channel_sequence_plan_is_audited`
- `reporting_summary_includes_test_mode_channel_sequence_plan`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 8. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 9. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence that future test-mode channel activation can be rehearsed in a safe, explicit sequence order before any production persistence or live integration work. It is internal-only and must not be copied into public sales copy or public go-live copy without approval.