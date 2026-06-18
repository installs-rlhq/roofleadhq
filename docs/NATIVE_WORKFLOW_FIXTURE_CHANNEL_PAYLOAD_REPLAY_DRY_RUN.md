# Native Workflow Fixture Channel Payload Replay Dry Run

## 1. Purpose and Scope

This packet defines and verifies **fake channel payload replay** through validation, blocked delivery, audit expectations, and safe failure routing. It replays fixture payloads locally against channel adapter contract patterns without activating Twilio, Resend, Vapi, Google Calendar, Lindy, CRM sync, CSV delivery, scheduler/cron, dispatcher, public routes/webhooks, Supabase persistence, or billing/payment/quote/estimate/invoice automation.

### What this packet is

- local fake-data channel payload replay dry-run
- deterministic `channel_payload_replay_items` and replay summaries
- explicit replay coverage across SMS, email, call, calendar, CSV/reporting, CRM handoff, Lindy bridge, scheduler/dispatcher, public route/webhook, Supabase persistence, billing/payment/quote blocked boundary, malformed payloads, activation violations, credential leakage, and unsupported channels
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

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data channel payload replay evidence that contract shapes can be validated and blocked locally — without schema, persistence, auth/RLS, sandbox credential reads, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_DRY_RUN_CHANNEL_SEQUENCE_PLAN_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_CHANNEL_PREFLIGHT_EVIDENCE_PACKET_EXPANSION.md`
- `docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md`
- `scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-channel-payload-replay-dry-run-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `scripts/verify-safe-readiness-fast.sh` (additive fast lane)

### Source-of-truth workflow

Canonical source of truth before this worktree: `3d68069 test(workflow): add channel adapter contract dry run`

## 2. Fake-Data / Local-Only Channel Payload Replay

This section defines the **fake-data/local-only channel payload replay** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.js`) emits stdout JSON only. All payloads use fixture identifiers, fake phone numbers (`+1555…`), fake emails (`*.test`), and blocked activation flags. No external service calls occur.

Top-level output fields:

- `channel_payload_replay_dry_run_summary`
- `channel_payload_replay_items`
- `replay_scenario_matrix_summary`
- `sms_replay_summary`
- `email_replay_summary`
- `call_replay_summary`
- `calendar_replay_summary`
- `csv_reporting_replay_summary`
- `crm_handoff_replay_summary`
- `lindy_bridge_replay_summary`
- `scheduler_dispatcher_replay_summary`
- `public_route_webhook_replay_summary`
- `supabase_persistence_replay_summary`
- `billing_payment_quote_replay_summary`
- `malformed_payload_replay_summary`
- `activation_violation_replay_summary`
- `credential_leakage_replay_summary`
- `audit_event_replay_summary`
- `owner_routing_summary`
- `channel_payload_replay_safety_assertions`

## 3. Relationship to Channel Adapter Contract Dry Run

The channel adapter contract dry run (`docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md`) defines **pre-activation payload contract shapes**. This packet **replays** those shapes through:

1. **Validation** — common fields, activation flags, credential/env boundary checks
2. **Blocked delivery** — all outbound sends and external calls remain blocked
3. **Audit expectations** — every replay item records `fixture_audit_event_id` and replay status
4. **Safe failure routing** — malformed payloads, activation violations, credential leakage, and unsupported channels route to safe owners

Contract shapes define what payloads look like; replay dry-run proves they can be checked locally without activation.

## 4. Replay Scenario Matrix

| Replay scenario | Category | Integration | Direction | Replay status |
| --- | --- | --- | --- | --- |
| SMS outbound draft replay | sms_outbound | Twilio | outbound | validated_blocked_delivery |
| SMS outbound blocked-send replay | sms_outbound | Twilio | outbound | blocked_delivery_no_approval |
| SMS inbound reply replay | sms_inbound | Twilio | inbound | replay_validated_manual_review |
| Email outbound draft replay | email_outbound | Resend | outbound | validated_blocked_delivery |
| Email outbound blocked-send replay | email_outbound | Resend | outbound | blocked_delivery_no_approval |
| Call intent replay | call | Vapi | outbound | validated_blocked_delivery |
| Call result replay | call | Vapi | bidirectional model | replay_validated_no_execution |
| Calendar appointment request replay | calendar | Google Calendar | outbound | validated_blocked_delivery |
| Calendar appointment result replay | calendar | Google Calendar | inbound model | replay_validated_not_booked |
| CSV/reporting export replay | csv_reporting | csv_delivery | outbound handoff | validated_blocked_delivery |
| CRM handoff/export replay | crm_handoff | crm_handoff_export | outbound handoff | validated_blocked_delivery |
| Lindy bridge handoff replay | lindy_bridge | lindy_bridge | bridge handoff | validated_blocked_delivery |
| Scheduler/dispatcher queued action replay | scheduler_dispatcher | scheduler_cron | internal queue | validated_blocked_delivery |
| Public route/webhook received-event replay | public_route_webhook | public_webhook | inbound | validated_blocked_delivery |
| Supabase persistence handoff replay | supabase_persistence | supabase | persistence handoff | validated_blocked_delivery |
| Billing/payment/quote/estimate/invoice blocked replay | billing_payment_quote | billing | blocked request | blocked_delivery_automation_forbidden |
| Malformed missing-common-field replay | malformed_payload | validation_layer | validation failure | blocked_malformed_payload |
| Activation flag violation replay | activation_violation | validation_layer | validation failure | blocked_activation_flag_violation |
| Credential/env leakage blocked replay | credential_leakage | validation_layer | validation failure | blocked_credential_env_leakage |
| Unsupported channel replay | unsupported_channel | validation_layer | validation failure | blocked_unsupported_channel |

## 5. Required Common Fields Across All Replay Items

Every `channel_payload_replay_item` includes:

- `fixture_replay_id`
- `fixture_roofer_account_id`
- `fixture_lead_id`
- `fixture_channel`
- `fixture_event_type`
- `fixture_payload_version`
- `fixture_replay_status`
- `fixture_delivery_mode` — must be `dry_run_only`
- `fixture_approval_status` — must be `not_approved`
- `fixture_external_call_attempted` — must be `false`
- `fixture_external_call_allowed` — must be `false`
- `fixture_live_activation_allowed` — must be `false`
- `fixture_test_mode_activation_allowed` — must be `false`
- `fixture_blocked_delivery_reason`
- `fixture_owner_for_next_step`
- `fixture_audit_event_id`
- `fixture_created_at`

## 6. Replay Scenarios (Fake Data Examples)

### 6.1 Valid Outbound SMS Replay

```json
{
  "fixture_replay_id": "replay_sms_outbound_draft_001",
  "fixture_channel": "sms",
  "fixture_event_type": "outbound_draft_send_intent",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_delivery_mode": "dry_run_only",
  "fixture_external_call_attempted": false,
  "fixture_blocked_delivery_reason": "explicit_approval_missing",
  "fixture_owner_for_next_step": "founder_manual_review"
}
```

### 6.2 Blocked Outbound SMS Replay Without Approval

```json
{
  "fixture_replay_id": "replay_sms_outbound_blocked_001",
  "fixture_channel": "sms",
  "fixture_event_type": "outbound_send_attempt_blocked",
  "fixture_replay_status": "blocked_delivery_no_approval",
  "fixture_blocked_delivery_reason": "explicit_approval_missing",
  "fixture_send_attempt_blocked": true
}
```

### 6.3 Inbound SMS Reply Replay

```json
{
  "fixture_replay_id": "replay_sms_inbound_reply_001",
  "fixture_channel": "sms",
  "fixture_event_type": "inbound_reply_received",
  "fixture_replay_status": "replay_validated_manual_review",
  "fixture_reply_body": "Fixture reply: yes, that window works for review.",
  "fixture_reply_routing_status": "queued_for_manual_review_only"
}
```

### 6.4 Valid Outbound Email Replay

```json
{
  "fixture_replay_id": "replay_email_outbound_draft_001",
  "fixture_channel": "email",
  "fixture_event_type": "outbound_draft_send_intent",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_to_email": "fixture.contractor@example.test",
  "fixture_from_email": "fixture.ops@roofleadhq.test"
}
```

### 6.5 Blocked Email Replay Without Approval

```json
{
  "fixture_replay_id": "replay_email_outbound_blocked_001",
  "fixture_channel": "email",
  "fixture_event_type": "outbound_send_attempt_blocked",
  "fixture_replay_status": "blocked_delivery_no_approval",
  "fixture_send_attempt_blocked": true
}
```

### 6.6 Call Intent Replay

```json
{
  "fixture_replay_id": "replay_call_intent_001",
  "fixture_channel": "call",
  "fixture_event_type": "outbound_call_intent",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_call_intent": "confirm_fixture_inspection_window",
  "fixture_call_execution_status": "not_executed_blocked"
}
```

### 6.7 Call Result Replay

```json
{
  "fixture_replay_id": "replay_call_result_001",
  "fixture_channel": "call",
  "fixture_event_type": "call_result_received",
  "fixture_replay_status": "replay_validated_no_execution",
  "fixture_call_result_status": "not_executed_blocked",
  "fixture_call_duration_seconds": 0
}
```

### 6.8 Calendar Appointment Request Replay

```json
{
  "fixture_replay_id": "replay_calendar_request_001",
  "fixture_channel": "calendar",
  "fixture_event_type": "appointment_request",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_appointment_request_status": "draft_request_only",
  "fixture_appointment_window": "2026-06-20T14:00:00.000Z/2026-06-20T16:00:00.000Z"
}
```

### 6.9 Calendar Appointment Result Replay

```json
{
  "fixture_replay_id": "replay_calendar_result_001",
  "fixture_channel": "calendar",
  "fixture_event_type": "appointment_result",
  "fixture_replay_status": "replay_validated_not_booked",
  "fixture_appointment_result_status": "not_booked_blocked",
  "fixture_calendar_event_id": null
}
```

### 6.10 CSV/Reporting Export Replay

```json
{
  "fixture_replay_id": "replay_csv_export_001",
  "fixture_channel": "csv_reporting",
  "fixture_event_type": "export_handoff",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_export_format": "csv",
  "fixture_export_delivery_status": "blocked_pending_data_boundary_review"
}
```

### 6.11 CRM Handoff/Export Replay

```json
{
  "fixture_replay_id": "replay_crm_handoff_001",
  "fixture_channel": "crm",
  "fixture_event_type": "handoff_export",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_crm_sync_status": "blocked_not_bidirectional_sync"
}
```

### 6.12 Lindy Bridge Handoff Replay

```json
{
  "fixture_replay_id": "replay_lindy_bridge_001",
  "fixture_channel": "lindy_bridge",
  "fixture_event_type": "bridge_handoff",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_bridge_mode": "temporary_reference_only",
  "live_lindy_bridge_enabled": false
}
```

### 6.13 Scheduler/Dispatcher Queued Action Replay

```json
{
  "fixture_replay_id": "replay_scheduler_dispatcher_001",
  "fixture_channel": "scheduler_dispatcher",
  "fixture_event_type": "queued_action_handoff",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_scheduler_enabled": false,
  "fixture_dispatcher_enabled": false
}
```

### 6.14 Public Route/Webhook Received-Event Replay

```json
{
  "fixture_replay_id": "replay_public_webhook_001",
  "fixture_channel": "public_route_webhook",
  "fixture_event_type": "webhook_received_event",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_public_route_enabled": false,
  "fixture_webhook_verification_status": "blocked_public_route_disabled"
}
```

### 6.15 Supabase Persistence Handoff Replay

```json
{
  "fixture_replay_id": "replay_supabase_persistence_001",
  "fixture_channel": "supabase",
  "fixture_event_type": "persistence_handoff",
  "fixture_replay_status": "validated_blocked_delivery",
  "fixture_persistence_mode": "dry_run_shape_only",
  "fixture_production_read_write_allowed": false
}
```

### 6.16 Billing/Payment/Quote/Estimate/Invoice Blocked Replay

```json
{
  "fixture_replay_id": "replay_billing_blocked_001",
  "fixture_channel": "billing_payment_quote",
  "fixture_event_type": "blocked_automation_request",
  "fixture_replay_status": "blocked_delivery_automation_forbidden",
  "fixture_billing_automation_allowed": false
}
```

### 6.17 Malformed Payload Replay

```json
{
  "fixture_replay_id": "replay_malformed_001",
  "fixture_replay_status": "blocked_malformed_payload",
  "fixture_blocked_delivery_reason": "missing_common_fields_detected",
  "fixture_validation_errors": [
    "missing_fixture_roofer_account_id_in_source_payload",
    "missing_fixture_lead_id_in_source_payload"
  ],
  "fixture_source_payload_replayable": false
}
```

### 6.18 Missing Common Fields Replay

Malformed replay documents missing `fixture_roofer_account_id` and `fixture_lead_id` in the **source** payload. The replay result item itself includes all common fields; validation errors reference what was missing from the source.

### 6.19 Activation Flag Violation Replay

```json
{
  "fixture_replay_id": "replay_activation_violation_001",
  "fixture_replay_status": "blocked_activation_flag_violation",
  "fixture_blocked_delivery_reason": "activation_flags_must_remain_false",
  "fixture_detected_violations": [
    "source_payload_attempted_live_activation_true",
    "source_payload_attempted_test_mode_activation_true"
  ],
  "fixture_violation_remediated": true
}
```

### 6.20 Credential/Env Leakage Replay

```json
{
  "fixture_replay_id": "replay_credential_leakage_001",
  "fixture_replay_status": "blocked_credential_env_leakage",
  "fixture_blocked_delivery_reason": "credential_env_content_detected_in_payload",
  "fixture_detected_leakage_patterns": [
    "api_key_pattern_detected",
    "webhook_secret_pattern_detected"
  ],
  "fixture_no_credential_values_logged": true
}
```

### 6.21 Unsupported Channel Replay

```json
{
  "fixture_replay_id": "replay_unsupported_channel_001",
  "fixture_channel": "fixture_unknown_channel_xyz",
  "fixture_replay_status": "blocked_unsupported_channel",
  "fixture_blocked_delivery_reason": "channel_not_in_replay_matrix"
}
```

## 7. Replay Result Statuses

- `validated_blocked_delivery` — payload validated; delivery blocked by policy
- `blocked_delivery_no_approval` — send attempted without approval; blocked
- `replay_validated_manual_review` — inbound replay validated; routed to manual review
- `replay_validated_no_execution` — call result replay validated; no execution
- `replay_validated_not_booked` — calendar result replay validated; not booked
- `blocked_delivery_automation_forbidden` — billing/payment automation blocked
- `blocked_malformed_payload` — source payload missing required fields
- `blocked_activation_flag_violation` — activation flags violated policy
- `blocked_credential_env_leakage` — credential/env content detected and blocked
- `blocked_unsupported_channel` — channel not in replay matrix

## 8. Blocked Delivery Reason Taxonomy

- `explicit_approval_missing`
- `inbound_routing_manual_review_only`
- `vapi_test_mode_not_approved`
- `calendar_preferences_review_incomplete`
- `data_boundary_review_incomplete`
- `crm_sync_not_approved`
- `scheduler_dispatcher_disabled`
- `public_route_disabled`
- `security_tenant_isolation_review_incomplete`
- `billing_payment_quote_automation_remains_blocked`
- `missing_common_fields_detected`
- `activation_flags_must_remain_false`
- `credential_env_content_detected_in_payload`
- `channel_not_in_replay_matrix`

## 9. Owner Routing for Failures

| Failure type | Owner |
| --- | --- |
| approval_missing | founder_manual_review |
| malformed_payload | founder_manual_review |
| activation_violation | security_review_queue |
| credential_leakage | security_review_queue |
| public_route_webhook | security_review_queue |
| supabase_persistence | security_review_queue |
| unsupported_channel | founder_manual_review |

## 10. Audit Event Replay Expectations

Every replay item must include `fixture_audit_event_id`. Audit expectations:

- `fixture_audit_event_id_present`
- `fixture_channel_recorded`
- `fixture_event_type_recorded`
- `fixture_replay_status_recorded`
- `fixture_delivery_mode_recorded`
- `fixture_approval_status_recorded`
- `fixture_blocked_delivery_reason_recorded`
- `fixture_owner_for_next_step_recorded`
- `activation_blocked_reason_recorded_when_blocked`

## 11. Fast-Lane Verification Usage

For normal fixture/readiness builds in agent worktrees:

1. `node backend/scripts/verify-native-workflow-fixture-channel-payload-replay-dry-run-readonly.js`
2. `bash scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.sh` (includes fast-lane smoke via `scripts/verify-safe-readiness-fast.sh`)
3. `npm --prefix backend run build`

Full aggregate regression via `scripts/verify-safe-readiness.sh` remains required for milestone/high-risk builds. Fast lane is additive and does not replace full regression.

## 12. Safety Rules

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

## 13. Verifier Assertions

The read-only verifier enforces:

- `channel_payload_replay_doc_present`
- `fake_data_local_only_scope_present`
- `relationship_to_channel_adapter_contract_present`
- `replay_scenario_matrix_present`
- `sms_replay_present`
- `email_replay_present`
- `call_replay_present`
- `calendar_replay_present`
- `csv_reporting_replay_present`
- `crm_handoff_replay_present`
- `lindy_bridge_replay_present`
- `scheduler_dispatcher_replay_present`
- `public_route_webhook_replay_present`
- `supabase_persistence_replay_present`
- `billing_payment_quote_replay_blocked`
- `malformed_payload_replay_present`
- `activation_violation_replay_present`
- `credential_leakage_replay_present`
- `audit_event_replay_present`
- `owner_routing_present`
- `fast_lane_reference_present`
- `runner_outputs_valid_json`
- `replay_items_have_common_fields`
- `replay_items_remain_dry_run_only`
- `replay_items_have_external_call_attempted_false`
- `replay_items_have_activation_flags_false`
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
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 14. Dry-Run Commands

```bash
node backend/scripts/verify-native-workflow-fixture-channel-payload-replay-dry-run-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.sh
```

```bash
bash scripts/verify-safe-readiness-fast.sh
```

Full regression (milestones only — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```