# Native Workflow Fixture Channel Adapter Contract Dry Run

## 1. Purpose and Scope

This packet defines and verifies **fake outbound/inbound channel adapter contract shapes** RoofLeadHQ will need before any future sandbox/test-mode channel approval. It models payload contracts locally without activating Twilio, Resend, Vapi, Google Calendar, Lindy, CRM sync, CSV delivery, scheduler/cron, dispatcher, public routes/webhooks, Supabase persistence, or billing/payment/quote/estimate/invoice automation.

### What this packet is

- local fake-data channel adapter contract dry-run
- deterministic `channel_adapter_contract_items` and contract summaries
- explicit contract modeling across SMS, email, call, calendar, CSV/reporting, CRM handoff, Lindy bridge, scheduler/dispatcher, public route/webhook, Supabase persistence, and billing/payment/quote blocked boundary
- read-only verifier
- dry-run wrapper using the additive fast-lane verification approach where appropriate

### What this packet is not

- This is **not** live channel activation.
- This is **not** sandbox/test-mode channel activation.
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

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data channel adapter contract shapes that define what future controlled test-mode readiness would require — without schema, persistence, auth/RLS, sandbox credential reads, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_DRY_RUN_CHANNEL_SEQUENCE_PLAN_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_CHANNEL_PREFLIGHT_EVIDENCE_PACKET_EXPANSION.md`
- `docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md`
- `scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-channel-adapter-contract-dry-run-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `scripts/verify-safe-readiness-fast.sh` (additive fast lane)

### Source-of-truth workflow

Canonical source of truth before this worktree: `1f863d3 test(readiness): add verifier quiet mode fast lane cleanup`

## 2. Fake-Data / Local-Only Channel Adapter Contract Dry-Run

This section defines the **fake-data/local-only channel adapter contract dry-run** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.js`) emits stdout JSON only. All payloads use fixture identifiers, fake phone numbers (`+1555…`), fake emails (`*.test`), and blocked activation flags. No external service calls occur.

Top-level output fields:

- `channel_adapter_contract_dry_run_summary`
- `channel_adapter_contract_items`
- `common_payload_contract_summary`
- `sms_contract_summary`
- `email_contract_summary`
- `call_contract_summary`
- `calendar_contract_summary`
- `csv_reporting_contract_summary`
- `crm_handoff_contract_summary`
- `lindy_bridge_contract_summary`
- `scheduler_dispatcher_contract_summary`
- `public_route_webhook_contract_summary`
- `supabase_persistence_contract_summary`
- `billing_payment_quote_contract_summary`
- `channel_isolation_summary`
- `approval_gate_summary`
- `credential_env_boundary_summary`
- `audit_event_contract_summary`
- `rollback_post_approval_test_summary`
- `channel_adapter_contract_safety_assertions`

## 3. Channel Contract Matrix

| Contract category | Integration | Direction | Activation status |
| --- | --- | --- | --- |
| SMS outbound draft/send-intent | Twilio | outbound | blocked — not approved |
| SMS inbound reply | Twilio | inbound | blocked — manual review only |
| Email outbound draft/send-intent | Resend | outbound | blocked — not approved |
| Call intent/result | Vapi | bidirectional model | blocked — not executed |
| Calendar appointment request/result | Google Calendar | bidirectional model | blocked — not booked |
| CSV/reporting export handoff | csv_delivery | outbound handoff | blocked — data boundary review |
| CRM handoff/export | crm_handoff_export | outbound handoff | blocked — one-way export only |
| Lindy bridge handoff | lindy_bridge | bridge handoff | blocked — reference only |
| Scheduler/dispatcher queued-action | scheduler_cron | internal queue | blocked — scheduler/dispatcher disabled |
| Public route/webhook received-event | public_webhook | inbound | blocked — public route disabled |
| Supabase persistence handoff | supabase | persistence handoff | blocked — security review incomplete |
| Billing/payment/quote/estimate/invoice | billing_payment_invoice_estimate_quote | blocked request | blocked — automation forbidden |

## 4. Required Common Fields Across All Channel Payloads

Every `channel_adapter_contract_item` includes:

- `fixture_roofer_account_id`
- `fixture_lead_id`
- `fixture_channel`
- `fixture_event_type`
- `fixture_payload_version`
- `fixture_message_or_action_intent`
- `fixture_delivery_mode` — must be `dry_run_only`
- `fixture_approval_status` — must be `not_approved`
- `fixture_external_call_allowed` — must be `false`
- `fixture_live_activation_allowed` — must be `false`
- `fixture_test_mode_activation_allowed` — must be `false`
- `fixture_created_at`
- `fixture_audit_event_id`

## 5. Blocked Fields / Forbidden Payload Content

The following must never appear in contract payloads or verifier output:

- real customer or homeowner names
- real homeowner phone numbers or emails
- real property addresses
- API keys, auth tokens, webhook secrets, service-role keys
- production or sandbox credential values
- production env values
- live activation flags set to true
- test-mode activation flags set to true
- external call permission set to true

## 6. Channel Contract Shapes (Fake Data Examples)

### 6.1 Outbound SMS Contract Shape

```json
{
  "contract_item_id": "sms_outbound_draft_send_intent_001",
  "fixture_channel": "sms",
  "fixture_event_type": "outbound_draft_send_intent",
  "fixture_to_number": "+15550001001",
  "fixture_from_number": "+15550002001",
  "fixture_message_body": "Fixture reminder: inspection window review pending founder approval.",
  "fixture_delivery_mode": "dry_run_only",
  "fixture_send_blocked_reason": "explicit_approval_missing"
}
```

### 6.2 Inbound SMS Reply Contract Shape

```json
{
  "contract_item_id": "sms_inbound_reply_001",
  "fixture_channel": "sms",
  "fixture_event_type": "inbound_reply_received",
  "fixture_reply_body": "Fixture reply: yes, that window works for review.",
  "fixture_reply_routing_status": "queued_for_manual_review_only",
  "fixture_delivery_mode": "dry_run_only"
}
```

### 6.3 Outbound Email Contract Shape

```json
{
  "contract_item_id": "email_outbound_draft_send_intent_001",
  "fixture_channel": "email",
  "fixture_event_type": "outbound_draft_send_intent",
  "fixture_to_email": "fixture.contractor@example.test",
  "fixture_from_email": "fixture.ops@roofleadhq.test",
  "fixture_subject": "Fixture: estimate prep inputs ready for manual review",
  "fixture_delivery_mode": "dry_run_only",
  "fixture_send_blocked_reason": "explicit_approval_missing"
}
```

### 6.4 Inbound Email / Reply Contract Shape (if modeled)

Inbound email reply is **not modeled in this packet**; email contract summary records `inbound_items_modeled: false`. Future packets may add inbound email reply shapes using the same common fields and `dry_run_only` delivery mode.

### 6.5 Outbound Call Intent / Vapi Test Contract Shape

```json
{
  "contract_item_id": "call_intent_result_001",
  "fixture_channel": "call",
  "fixture_event_type": "outbound_call_intent_and_result",
  "fixture_call_intent": "confirm_fixture_inspection_window",
  "fixture_call_result_status": "not_executed_blocked",
  "fixture_call_blocked_reason": "vapi_test_mode_not_approved",
  "fixture_delivery_mode": "dry_run_only"
}
```

### 6.6 Call Result Contract Shape

Call result is modeled within the same item: `fixture_call_result_status: not_executed_blocked`, `fixture_call_duration_seconds: 0`, `fixture_call_transcript_reference: fixture_transcript_not_generated`.

### 6.7 Google Calendar Appointment Request Contract Shape

```json
{
  "contract_item_id": "calendar_appointment_request_result_001",
  "fixture_channel": "calendar",
  "fixture_event_type": "appointment_request_and_result",
  "fixture_appointment_request_status": "draft_request_only",
  "fixture_appointment_window": "2026-06-20T14:00:00.000Z/2026-06-20T16:00:00.000Z",
  "fixture_calendar_blocked_reason": "calendar_preferences_review_incomplete"
}
```

### 6.8 Google Calendar Appointment Result Contract Shape

Appointment result: `fixture_appointment_result_status: not_booked_blocked`, `fixture_calendar_event_id: null`.

### 6.9 CSV/Reporting Export Handoff Contract Shape

```json
{
  "contract_item_id": "csv_reporting_export_handoff_001",
  "fixture_channel": "csv_reporting",
  "fixture_event_type": "export_handoff",
  "fixture_export_format": "csv",
  "fixture_export_destination": "manual_download_review_only",
  "fixture_export_delivery_status": "blocked_pending_data_boundary_review"
}
```

### 6.10 CRM Handoff/Export Contract Shape

```json
{
  "contract_item_id": "crm_handoff_export_001",
  "fixture_channel": "crm",
  "fixture_event_type": "handoff_export",
  "fixture_crm_target": "manual_reference_only",
  "fixture_sync_direction": "one_way_export_only",
  "fixture_crm_sync_status": "blocked_not_bidirectional_sync"
}
```

### 6.11 Lindy Bridge Handoff Contract Shape

```json
{
  "contract_item_id": "lindy_bridge_handoff_001",
  "fixture_channel": "lindy_bridge",
  "fixture_event_type": "bridge_handoff",
  "fixture_bridge_mode": "temporary_reference_only",
  "fixture_lindy_workflow_execution_allowed": false
}
```

### 6.12 Scheduler/Dispatcher Handoff Contract Shape

```json
{
  "contract_item_id": "scheduler_dispatcher_queued_action_001",
  "fixture_channel": "scheduler_dispatcher",
  "fixture_event_type": "queued_action_handoff",
  "fixture_scheduler_enabled": false,
  "fixture_dispatcher_enabled": false,
  "fixture_queued_action_status": "blocked_scheduler_dispatcher_disabled"
}
```

### 6.13 Public Route/Webhook Contract Shape

```json
{
  "contract_item_id": "public_route_webhook_received_event_001",
  "fixture_channel": "public_route_webhook",
  "fixture_event_type": "webhook_received_event",
  "fixture_route_path": "/fixture-only/webhook/review-queue",
  "fixture_public_route_enabled": false,
  "fixture_webhook_verification_status": "blocked_public_route_disabled"
}
```

### 6.14 Supabase Persistence Handoff Contract Shape

```json
{
  "contract_item_id": "supabase_persistence_handoff_001",
  "fixture_channel": "supabase",
  "fixture_event_type": "persistence_handoff",
  "fixture_table_target": "fixture_review_queue_events",
  "fixture_persistence_mode": "dry_run_shape_only",
  "fixture_production_read_write_allowed": false
}
```

### 6.15 Billing/Payment/Quote/Estimate/Invoice Blocked Contract Boundary

```json
{
  "contract_item_id": "billing_payment_quote_blocked_request_001",
  "fixture_channel": "billing_payment_quote",
  "fixture_event_type": "blocked_automation_request",
  "fixture_request_type": "estimate_quote_invoice_payment",
  "fixture_billing_automation_allowed": false,
  "fixture_blocked_reason": "billing_payment_quote_automation_remains_blocked"
}
```

## 7. Channel Isolation Rules

- Each channel contract is isolated; cross-channel credential sharing is forbidden.
- Per-channel explicit Jason approval is required before any future test-mode activation.
- Live activation requires separate explicit Jason approval.
- Activation of one channel must not implicitly activate another.
- Lindy bridge references are temporary/bridge-only and must not be treated as live Lindy activation.

## 8. Approval Gate Requirements

- `fixture_approval_status` must remain `not_approved` in this dry-run.
- Missing explicit Jason approval blocks all test-mode channel activation.
- Missing rollback plan blocks activation.
- Missing post-approval test plan blocks activation.
- Missing credential review blocks activation.
- Missing messaging compliance review blocks messaging channel activation.
- Missing data boundary review blocks CSV/CRM delivery activation.
- Missing security/tenant isolation review blocks Supabase persistence activation.

## 9. Credential/Env Boundary Rules

- No sandbox credentials read, write, or log.
- No production credentials read, write, or log.
- No env values, API keys, tokens, webhook secrets, or service-role keys logged.
- Credential review is required before any future activation.
- Contract shapes may reference flag **names** only; never values.

## 10. Payload Audit Event Expectations

Every contract item must include `fixture_audit_event_id`. Audit expectations:

- `fixture_audit_event_id_present`
- `fixture_channel_recorded`
- `fixture_event_type_recorded`
- `fixture_delivery_mode_recorded`
- `fixture_approval_status_recorded`
- `activation_blocked_reason_recorded_when_blocked`

## 11. Rollback and Post-Approval Test Relationship

- Contract dry-run defines **pre-activation** payload shapes only.
- Rollback plan and post-approval test plan are required before any future activation.
- Post-approval tests would validate approved sandbox shapes only — not live production behavior.
- Current state: rollback plan not present; post-approval test plan not present; all activation blocked.

## 12. Fast-Lane Verification Usage

For normal fixture/readiness builds in agent worktrees:

1. `node backend/scripts/verify-native-workflow-fixture-channel-adapter-contract-dry-run-readonly.js`
2. `bash scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.sh` (includes fast-lane smoke via `scripts/verify-safe-readiness-fast.sh`)
3. `npm --prefix backend run build`

Full aggregate regression via `scripts/verify-safe-readiness.sh` remains required for milestone/high-risk builds. Fast lane is additive and does not replace full regression.

## 13. Safety Rules

### No Safety Weakening Rule

This packet must not remove or weaken existing safety checks or the full aggregate readiness path.

### No Live Activation Rule

No live SMS, email, call, calendar, CRM sync, CSV delivery, billing, public routes, scheduler/cron, dispatcher, or Lindy workflow execution.

### No Test-Mode Activation Rule

No sandbox/test-mode sends or sandbox/test-mode external calls.

### No Credential/Env Logging Rule

No secret, env, token, API key, or credential value logging.

### No Production Data Rule

No real customer/homeowner data; fake fixture identifiers only.

### No Schema/Auth/RLS/Security Implementation Rule

No schema, migrations, auth, RLS, or security implementation changes.

## 14. Verifier Assertions

The read-only verifier enforces:

- `channel_adapter_contract_doc_present`
- `fake_data_local_only_scope_present`
- `common_payload_contract_present`
- `channel_contract_matrix_present`
- `sms_contract_present`
- `email_contract_present`
- `call_contract_present`
- `calendar_contract_present`
- `csv_reporting_contract_present`
- `crm_handoff_contract_present`
- `lindy_bridge_contract_present`
- `scheduler_dispatcher_contract_present`
- `public_route_webhook_contract_present`
- `supabase_persistence_contract_present`
- `billing_payment_quote_contract_blocked`
- `approval_gate_required`
- `credential_env_boundary_present`
- `audit_event_contract_present`
- `rollback_post_approval_test_relationship_present`
- `no_live_sms_activation`
- `no_twilio_activation`
- `no_vapi_activation`
- `no_resend_activation`
- `no_google_calendar_activation`
- `no_lindy_live_activation`
- `no_scheduler_cron_dispatcher_activation`
- `no_public_route_webhook_activation`
- `no_crm_sync_activation`
- `no_live_csv_delivery_activation`
- `no_billing_payment_quote_invoice_estimate_activation`
- `no_supabase_production_reads_writes`
- `no_schema_migrations_auth_rls_security_changes`
- `no_secret_env_credential_logging`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `fast_lane_reference_present`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 15. Dry-Run Commands

```bash
node backend/scripts/verify-native-workflow-fixture-channel-adapter-contract-dry-run-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.sh
```

```bash
bash scripts/verify-safe-readiness-fast.sh
```

Full regression (milestones only — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```