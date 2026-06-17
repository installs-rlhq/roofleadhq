# Native Workflow Fixture Sandbox/Test-Mode Approval Runbook Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data sandbox/test-mode approval runbook coverage so RoofLeadHQ can model what Jason would need to review and approve before any future test-mode channel activation — without activating sandbox credentials, live sends, external calls, production persistence, public routes, cron jobs, schedulers, dispatchers, or customer-facing automation.

It deepens the fixture approval-readiness modeling layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only sandbox/test-mode approval runbook expansion
- fake data only
- deterministic `sandbox_test_mode_approval_runbook_items` and channel approval summaries
- explicit approval-runbook modeling across Twilio, Vapi, Resend, Google Calendar, Lindy bridge, CSV delivery, CRM handoff, scheduler/cron, dispatcher, public route/webhook, Supabase persistence, and billing/payment/invoice/estimate/quote automation
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** sandbox credential activation.
- This is **not** test-mode send activation.
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

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that future test-mode channel activation approval prerequisites can be modeled safely before any schema, persistence, auth/RLS, sandbox credential reads, or live integration work.

### Connected launch packets

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_E2E_ACCEPTANCE_REHEARSAL_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_EXPANSION.md`
- `scripts/run-native-workflow-fixture-sandbox-test-mode-approval-runbook-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-runbook-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `0070f0e test(workflow): add sandbox test mode readiness gate`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `sandbox_test_mode_approval_runbook_expansion_summary`, `sandbox_test_mode_approval_runbook_items`
- `approval_step_summary`, `channel_approval_summary`, `pre_approval_blocker_summary`
- `explicit_approval_evidence_summary`, `credential_boundary_approval_summary`
- `public_route_approval_summary`, `scheduler_dispatcher_approval_summary`
- `data_boundary_approval_summary`, `security_tenant_isolation_approval_summary`
- `rollback_plan_summary`, `post_approval_test_plan_summary`, `approval_audit_summary`
- `sandbox_test_mode_approval_safety_assertions`
- per-scenario `sandbox_test_mode_approval_runbook_items`

All 25 scenarios, transition logs, guard assertions, prior expansion output fields, and sandbox/test-mode integration readiness gate output remain intact.

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

## 4. Channels and Integrations

| Channel / integration | Approval runbook focus |
| --- | --- |
| Twilio SMS | Approval runbook blocked without explicit approval |
| Vapi calls | Approval runbook blocked without explicit approval |
| Resend email | Approval runbook blocked without explicit approval |
| Google Calendar booking | Approval runbook blocked without explicit approval |
| Lindy bridge | Safe fixture reference allowed; real Lindy client/API/webhook/live workflow activation forbidden |
| CSV delivery | Approval runbook blocked without explicit approval |
| CRM handoff/export | Approval runbook blocked without explicit approval |
| scheduler/cron | Scheduler approval runbook blocked |
| dispatcher | Dispatcher approval runbook blocked |
| public route/webhook | Public route approval runbook blocked |
| Supabase persistence | Persistence blocked until security/tenant isolation review |
| billing/payment/invoice/estimate/quote automation | Billing automation approval runbook blocked |

## 5. Approval Runbook Item Fields

Each `sandbox_test_mode_approval_runbook_item` includes:

- `approval_runbook_item_id`, `scenario_id`, `roofer_account_id`, `plan_profile`
- `channel`, `integration_name`, `approval_stage`
- `approval_required: yes`, `explicit_approval_present: no`, `approval_evidence_present: no`
- `approval_evidence_type`, `approval_owner`, `technical_owner`, `business_owner`
- `security_review_required`, `tenant_isolation_review_required`, `data_boundary_review_required`
- `messaging_compliance_review_required`, `credential_review_required`
- `public_route_review_required`, `scheduler_dispatcher_review_required`
- `rollback_plan_required`, `rollback_plan_present: no`
- `post_approval_test_plan_required`, `post_approval_test_plan_present: no`
- `sandbox_credentials_required`, `sandbox_credentials_present: no`
- `production_credentials_present: no`, `env_values_logged: no`
- `public_route_required`, `public_route_enabled: no`
- `scheduler_required`, `scheduler_enabled: no`
- `dispatcher_required`, `dispatcher_enabled: no`
- `live_activation_flag_name`, `live_activation_flag_value: false`
- `test_mode_activation_allowed: no`, `live_activation_allowed: no`
- `readiness_status`, `blocker_reason`
- `required_manual_next_step`, `next_step_owner`
- `audit_event_id`
- `production_data_touched: no`, `external_services_called: no`
- `notification_sent: no`, `live_action_performed: no`

## 6. Approval Runbook Rules

- This is internal approval-runbook modeling only.
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
- Missing credential review must block test-mode activation.
- Missing rollback plan must block test-mode activation.
- Missing post-approval test plan must block test-mode activation.
- Missing security/tenant isolation review must block Supabase persistence.
- Missing messaging compliance review must block messaging-related test-mode activation.
- Test-mode readiness may be marked BLOCKED, HOLD, or NEEDS_APPROVAL, but must not activate anything.
- Lindy safe fixture references must not be treated as live Lindy activation, but real Lindy client/API/webhook/live workflow activation must remain forbidden.

## 7. Verifier Assertions

The read-only verifier enforces:

- `sandbox_test_mode_approval_runbook_expansion_summary_present`
- `sandbox_test_mode_approval_runbook_items_present`
- `approval_runbook_item_required_fields_present`
- `required_channels_present`
- `approval_step_summary_present`
- `channel_approval_summary_present`
- `pre_approval_blocker_summary_present`
- `explicit_approval_evidence_summary_present`
- `credential_boundary_approval_summary_present`
- `public_route_approval_summary_present`
- `scheduler_dispatcher_approval_summary_present`
- `data_boundary_approval_summary_present`
- `security_tenant_isolation_approval_summary_present`
- `rollback_plan_summary_present`
- `post_approval_test_plan_summary_present`
- `approval_audit_summary_present`
- `explicit_approval_present_is_no_for_all_items`
- `approval_evidence_present_is_no_for_all_items`
- `approval_required_is_yes_for_all_items`
- `sandbox_credentials_present_is_no_for_all_items`
- `production_credentials_present_is_no_for_all_items`
- `env_values_logged_is_no_for_all_items`
- `public_route_enabled_is_no_for_all_items`
- `scheduler_enabled_is_no_for_all_items`
- `dispatcher_enabled_is_no_for_all_items`
- `live_activation_flags_remain_false_for_all_items`
- `test_mode_activation_allowed_is_no_for_all_items`
- `live_activation_allowed_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `notification_sent_is_no_for_all_items`
- `live_action_performed_is_no_for_all_items`
- `missing_explicit_approval_blocks_test_mode_activation`
- `missing_rollback_plan_blocks_test_mode_activation`
- `missing_post_approval_test_plan_blocks_test_mode_activation`
- `missing_security_tenant_isolation_review_blocks_persistence`
- `messaging_compliance_review_required_for_messaging_channels`
- `no_supabase_calls`, `no_schema_migrations_auth_rls_security_changes`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `no_estimate_quote_invoice_payment_generation`
- `safe_lindy_bridge_reference_not_live_activation`
- `real_lindy_activation_patterns_remain_forbidden`
- `sandbox_test_mode_approval_runbook_is_fake_data_only`
- `sandbox_test_mode_approval_runbook_is_audited`
- `reporting_summary_includes_sandbox_test_mode_approval_runbook`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 8. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-sandbox-test-mode-approval-runbook-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-runbook-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 9. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence that future test-mode channel activation approval prerequisites can be modeled safely before any production persistence or live integration work. It is internal-only and must not be copied into public sales copy or public go-live copy without approval.