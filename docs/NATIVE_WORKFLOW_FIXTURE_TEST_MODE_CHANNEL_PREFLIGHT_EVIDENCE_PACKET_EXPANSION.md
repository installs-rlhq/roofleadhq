# Native Workflow Fixture Test-Mode Channel Preflight Evidence Packet Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data test-mode channel preflight evidence packet coverage so RoofLeadHQ can model the exact evidence Jason would need to see before approving any future sandbox/test-mode activation — without activating sandbox credentials, live sends, external calls, production persistence, public routes, cron jobs, schedulers, dispatchers, or customer-facing automation.

It deepens the fixture preflight evidence modeling layer after the readiness gate, approval runbook, and channel sequence plan without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only test-mode channel preflight evidence packet expansion
- fake data only
- deterministic `test_mode_channel_preflight_evidence_items` and preflight evidence summaries
- explicit preflight evidence modeling across fixture-only preflight evidence packet, messaging compliance prerequisite evidence, Twilio SMS, Resend email, Vapi calls, Google Calendar booking, CSV delivery, CRM handoff/export, Lindy bridge, scheduler/cron, dispatcher, public route/webhook, Supabase persistence, and billing/payment/invoice/estimate/quote automation
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

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence of exactly what Jason would need to review before approving any future test-mode channel activation — without schema, persistence, auth/RLS, sandbox credential reads, or live integration work.

### Connected launch packets

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_E2E_ACCEPTANCE_REHEARSAL_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_DRY_RUN_CHANNEL_SEQUENCE_PLAN_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_CHANNEL_PREFLIGHT_EVIDENCE_PACKET_EXPANSION.md`
- `scripts/run-native-workflow-fixture-test-mode-channel-preflight-evidence-packet-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-test-mode-channel-preflight-evidence-packet-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `e97a635 test(workflow): add test mode channel sequence plan`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `test_mode_channel_preflight_evidence_expansion_summary`, `test_mode_channel_preflight_evidence_items`
- `preflight_evidence_packet_summary`, `approval_evidence_packet_summary`
- `credential_evidence_boundary_summary`, `env_boundary_evidence_summary`
- `channel_payload_evidence_summary`, `dry_run_payload_contract_summary`
- `channel_isolation_evidence_summary`, `data_boundary_evidence_summary`
- `messaging_compliance_evidence_summary`, `calendar_booking_evidence_summary`
- `reporting_csv_evidence_summary`, `crm_handoff_evidence_summary`
- `scheduler_dispatcher_evidence_summary`, `public_route_evidence_summary`
- `supabase_persistence_evidence_summary`, `billing_payment_quote_evidence_summary`
- `rollback_evidence_summary`, `post_approval_test_evidence_summary`
- `preflight_audit_summary`, `test_mode_channel_preflight_safety_assertions`
- per-scenario `test_mode_channel_preflight_evidence_items`

All 25 scenarios, transition logs, guard assertions, prior expansion output fields, sandbox/test-mode integration readiness gate output, sandbox/test-mode approval runbook output, and test-mode dry-run channel sequence plan output remain intact.

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

## 4. Preflight Evidence Order

| Sequence order | Channel / integration | Preflight focus |
| --- | --- | --- |
| 1 | Internal fixture-only preflight evidence packet | Local dry-run evidence packet without external calls |
| 2 | Messaging compliance prerequisite evidence | Prerequisite evidence before messaging channels |
| 3 | Twilio SMS | Test-mode preflight blocked without explicit approval |
| 4 | Resend email | Test-mode preflight blocked without explicit approval |
| 5 | Vapi calls | Test-mode preflight blocked without explicit approval |
| 6 | Google Calendar booking | Test-mode preflight blocked without calendar preferences review |
| 7 | CSV delivery | Test-mode preflight blocked without data boundary review |
| 8 | CRM handoff/export | Test-mode preflight blocked; one-directional export only |
| 9 | Lindy bridge | Temporary/bridge-only; real Lindy activation forbidden |
| 10 | scheduler/cron | Scheduler preflight blocked |
| 11 | dispatcher | Dispatcher preflight blocked |
| 12 | public route/webhook | Public route preflight blocked |
| 13 | Supabase persistence | Persistence blocked until security/tenant isolation review |
| 14 | billing/payment/invoice/estimate/quote automation | Billing automation blocked |

## 5. Preflight Evidence Item Fields

Each `test_mode_channel_preflight_evidence_item` includes:

- `preflight_evidence_item_id`, `sequence_order`, `scenario_id`, `roofer_account_id`, `plan_profile`
- `channel`, `integration_name`, `preflight_stage`, `evidence_packet_status`
- `approval_required: yes`, `explicit_approval_present: no`, `approval_evidence_present: no`
- `approval_evidence_reference`
- `sandbox_credentials_required`, `sandbox_credentials_present: no`, `sandbox_credentials_value_logged: no`
- `production_credentials_present: no`, `production_credentials_value_logged: no`, `env_values_logged: no`
- `credential_review_status`
- `fixture_payload_defined`, `fixture_payload_contains_real_pii: no`, `fixture_payload_contains_credentials: no`
- `dry_run_payload_contract_present`, `dry_run_payload_contract_external_call_allowed: no`
- `public_route_required`, `public_route_enabled: no`
- `scheduler_required`, `scheduler_enabled: no`
- `dispatcher_required`, `dispatcher_enabled: no`
- `data_boundary_review_required`, `data_boundary_review_status`
- `messaging_compliance_review_required`, `messaging_compliance_review_status`
- `calendar_preferences_required`, `calendar_preferences_status`
- `security_tenant_isolation_review_required`, `security_tenant_isolation_review_status`
- `rollback_plan_required`, `rollback_plan_present`
- `post_approval_test_plan_required`, `post_approval_test_plan_present`
- `live_activation_flag_name`, `live_activation_flag_value: false`
- `test_mode_activation_allowed: no`, `live_activation_allowed: no`, `external_call_allowed: no`
- `preflight_status`, `blocker_reason`, `required_manual_next_step`, `next_step_owner`
- `audit_event_id`
- `production_data_touched: no`, `external_services_called: no`
- `notification_sent: no`, `live_action_performed: no`

## 6. Preflight Evidence Rules

- This is fixture-only preflight evidence modeling.
- Fixture-only preflight may be modeled as a local dry-run evidence packet.
- All actual test-mode activation remains blocked.
- All live activation remains blocked.
- Missing explicit Jason approval blocks test-mode activation.
- Missing approval evidence blocks test-mode activation.
- Missing credential review blocks test-mode activation.
- Missing rollback plan blocks test-mode activation.
- Missing post-approval test plan blocks test-mode activation.
- Missing messaging compliance review blocks messaging-related test-mode activation.
- Missing calendar preferences block Calendar booking test-mode activation.
- Missing data boundary review blocks CSV/CRM/reporting delivery activation.
- Missing security/tenant isolation review blocks Supabase persistence activation.
- CRM handoff/export must remain one-directional/manual reference and must not become bidirectional CRM integration.
- Billing/payment/invoice/estimate/quote automation must remain blocked.
- Lindy bridge must remain temporary/bridge-only and blocked without explicit approval.
- Scheduler/cron/dispatcher/public route/webhook readiness must remain blocked.
- No sandbox credentials should be added, read, or logged.
- No production credentials should be added, read, or logged.
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
- Lindy safe fixture references must not be treated as live Lindy activation, but real Lindy client/API/webhook/live workflow activation must remain forbidden.

## 7. Verifier Assertions

The read-only verifier enforces:

- `test_mode_channel_preflight_evidence_expansion_summary_present`
- `test_mode_channel_preflight_evidence_items_present`
- `test_mode_channel_preflight_evidence_item_required_fields_present`
- `required_channels_present`
- `sequence_order_present_and_deterministic`
- `preflight_evidence_packet_summary_present`
- `approval_evidence_packet_summary_present`
- `credential_evidence_boundary_summary_present`
- `env_boundary_evidence_summary_present`
- `channel_payload_evidence_summary_present`
- `dry_run_payload_contract_summary_present`
- `channel_isolation_evidence_summary_present`
- `data_boundary_evidence_summary_present`
- `messaging_compliance_evidence_summary_present`
- `calendar_booking_evidence_summary_present`
- `reporting_csv_evidence_summary_present`
- `crm_handoff_evidence_summary_present`
- `scheduler_dispatcher_evidence_summary_present`
- `public_route_evidence_summary_present`
- `supabase_persistence_evidence_summary_present`
- `billing_payment_quote_evidence_summary_present`
- `rollback_evidence_summary_present`
- `post_approval_test_evidence_summary_present`
- `preflight_audit_summary_present`
- `approval_required_is_yes_for_activation_items`
- `explicit_approval_present_is_no_for_all_items`
- `approval_evidence_present_is_no_for_all_items`
- `sandbox_credentials_present_is_no_for_all_items`
- `sandbox_credentials_value_logged_is_no_for_all_items`
- `production_credentials_present_is_no_for_all_items`
- `production_credentials_value_logged_is_no_for_all_items`
- `env_values_logged_is_no_for_all_items`
- `fixture_payload_contains_real_pii_is_no_for_all_items`
- `fixture_payload_contains_credentials_is_no_for_all_items`
- `dry_run_payload_contract_external_call_allowed_is_no_for_all_items`
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
- `fixture_only_preflight_evidence_packet_created_without_external_calls`
- `missing_explicit_approval_blocks_test_mode_activation`
- `missing_approval_evidence_blocks_test_mode_activation`
- `missing_credential_review_blocks_test_mode_activation`
- `missing_rollback_plan_blocks_test_mode_activation`
- `missing_post_approval_test_plan_blocks_test_mode_activation`
- `messaging_compliance_prerequisite_before_messaging_channels`
- `calendar_preferences_prerequisite_before_calendar_booking`
- `data_boundary_prerequisite_before_csv_and_crm_delivery`
- `missing_security_tenant_isolation_review_blocks_persistence`
- `crm_handoff_remains_not_native_crm_sync`
- `billing_payment_quote_automation_remains_blocked`
- `no_supabase_calls`, `no_schema_migrations_auth_rls_security_changes`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `no_crm_sync`, `no_live_csv_delivery`, `no_billing_or_payment_action`
- `no_estimate_quote_invoice_payment_generation`
- `safe_lindy_bridge_reference_not_live_activation`
- `real_lindy_activation_patterns_remain_forbidden`
- `test_mode_channel_preflight_evidence_packet_is_fake_data_only`
- `test_mode_channel_preflight_evidence_packet_is_audited`
- `reporting_summary_includes_test_mode_channel_preflight_evidence_packet`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 8. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-test-mode-channel-preflight-evidence-packet-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-test-mode-channel-preflight-evidence-packet-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 9. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence of exactly what Jason would need to review before approving any future test-mode channel activation. It is internal-only and must not be copied into public sales copy or public go-live copy without approval.