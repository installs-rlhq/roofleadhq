# Native Workflow Fixture First Controlled Launch Scoped Approval Capture

## 1. Purpose and Scope

This packet defines and verifies a **fake-data/local-only scoped approval capture** that records Jason's human-review approval to move forward into the next controlled planning step — **without** granting activation, activating channels, or executing any step.

### What this packet is

- local fake-data first controlled launch scoped approval capture
- deterministic `scoped_approval_capture_record` with Jason's approval statement captured
- explicit planning-only interpretation: `move_forward_to_next_controlled_planning_step_only`
- scoped planning approval status: `scoped_planning_approved`
- approval scope limited to: `prepare_controlled_test_mode_activation_plan_only`
- all activation flags remain `false`; approved channels and external services remain empty
- start/operator/rollback fields remain `blank_placeholder`
- required next decision documented: exact controlled test-mode channel/start/operator/rollback approval
- read-only verifier
- dry-run wrapper using targeted verifier only
- **scoped approval capture dry-run only** — records Jason's planning-only move-forward approval without granting activation or execution
- packet type is `scoped_approval_capture_only`

### What this packet is not

- This is **not** approval to activate SMS, Twilio, Vapi, Resend, Google Calendar, Lindy, CRM sync, CSV delivery, scheduler/cron/dispatcher, public routes/webhooks, Supabase production reads/writes, billing, payment, deposit, invoice, quote, or estimate automation.
- This is **not** approval to send external calls.
- This is **not** approval to launch live.
- This is **not** approval to execute sandbox/test-mode channels yet.
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
- This does **not** grant first controlled launch, sandbox/test-mode, or live activation approval.
- This does **not** execute any activation step.
- This does **not** mistake scoped planning approval for activation approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a deterministic fake-data scoped approval capture documenting Jason's planning-only move-forward approval — without schema, persistence, auth/RLS, sandbox credential reads, live integration work, activation, or execution. Actual activation still requires a separate exact scope/start/operator/rollback approval.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_DECISION_LEDGER_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md`
- `scripts/run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture.js`
- `backend/scripts/verify-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `003d287 test(workflow): add first controlled launch approval decision draft`

## 2. Fake-Data / Local-Only Scoped Approval Capture

This section defines the **fake-data/local-only scoped approval capture** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture.js`) emits stdout JSON only. All capture items use fixture identifiers, planning-only interpretation, and blocked activation flags. No external service calls occur.

Top-level output fields:

- `first_controlled_launch_scoped_approval_capture_dry_run_summary`
- `scoped_approval_capture_record`
- `first_controlled_launch_scoped_approval_capture_items`
- `executive_scoped_approval_capture_summary`
- `jason_approval_statement_captured_summary`
- `planning_only_interpretation_summary`
- `activation_blocked_summary`
- `approved_channels_empty_summary`
- `approved_external_services_empty_summary`
- `placeholder_fields_summary`
- `required_next_decision_summary`
- `forbidden_scope_summary`
- `not_activation_approval_boundary_summary`
- `approval_decision_draft_relationship_summary`
- `credential_env_boundary_summary`
- `schema_auth_rls_security_boundary_summary`
- `first_controlled_launch_scoped_approval_capture_safety_assertions`

Safety posture preserved: `demo_ready_with_live_automation_disabled`

## 3. Jason Approval Statement Captured

Jason's approval statement has been received and captured:

> Approved to move forward.

- `approval_statement_received`: `Approved to move forward.`
- `statement_captured`: `true`
- `statement_source`: `founder_manual_review`

This statement is captured for scoped planning authorization only. It does not grant activation approval.

## 4. Planning-Only Interpretation

The captured approval is interpreted strictly as:

- `approval_interpretation`: `move_forward_to_next_controlled_planning_step_only`
- `interpretation_is_planning_only`: `true`
- `interpretation_is_next_step_only`: `true`
- `interpretation_does_not_grant_activation`: `true`
- `interpretation_does_not_grant_external_calls`: `true`
- `interpretation_does_not_grant_channel_activation`: `true`

## 5. Approval Scope and Decision Status

| Field | Value |
| --- | --- |
| approval_scope | prepare_controlled_test_mode_activation_plan_only |
| approval_decision_status | scoped_planning_approved |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |

Scoped planning is approved. Activation is not approved.

## 6. Scoped Approval Capture Record

The `scoped_approval_capture_record` captures Jason's planning-only approval:

| Field | Value |
| --- | --- |
| approval_statement_received | Approved to move forward. |
| approval_interpretation | move_forward_to_next_controlled_planning_step_only |
| approval_scope | prepare_controlled_test_mode_activation_plan_only |
| approval_decision_status | scoped_planning_approved |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |
| approved_channels | [] |
| approved_external_services | [] |
| approved_start_time | blank_placeholder |
| approved_operator | blank_placeholder |
| rollback_owner | blank_placeholder |
| required_next_decision | exact controlled test-mode channel/start/operator/rollback approval |
| forbidden_scope | all live/test-mode/external/service/production actions until separately approved |

## 7. Activation Remains Blocked

All activation remains blocked until separate exact approval:

- First controlled launch activation: blocked
- Sandbox/test-mode activation: blocked
- Live activation: blocked
- External calls: blocked
- Channel activation: blocked (approved_channels empty)
- External service activation: blocked (approved_external_services empty)

## 8. Placeholder Fields Remain Blank

Until separate exact activation approval:

- `approved_start_time`: `blank_placeholder`
- `approved_operator`: `blank_placeholder`
- `rollback_owner`: `blank_placeholder`

## 9. Required Next Decision

Actual activation still requires:

> exact controlled test-mode channel/start/operator/rollback approval

Scoped planning approval does not satisfy activation approval requirements.

## 10. Forbidden Scope

Until separately approved, forbidden scope remains:

> all live/test-mode/external/service/production actions until separately approved

## 11. Not Activation Approval Boundary

This scoped approval capture is explicitly **not** activation approval:

- Not activation approval
- Not live launch approval
- Not sandbox/test-mode activation approval
- Not external call approval
- Approval must not be mistaken for activation

## 12. Relationship to Approval Decision Draft

The first controlled launch approval decision draft (`docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md`) structures the formal decision artifact. This scoped approval capture **builds on** that decision draft by recording Jason's planning-only move-forward approval without granting activation.

Reference phrase: first controlled launch approval decision draft

## 13. Capture Areas

| Order | Area | Status |
| --- | --- | --- |
| 1 | Executive scoped approval capture summary | scoped_planning_approval_captured |
| 2 | Jason approval statement captured | statement_recorded_planning_only |
| 3 | Planning-only interpretation boundary | interpretation_planning_only_not_activation |
| 4 | Approval scope (prepare plan only) | scope_limited_to_plan_preparation |
| 5 | Approval decision status (scoped_planning_approved) | scoped_planning_not_activation |
| 6 | First controlled launch activation blocked | activation_blocked |
| 7 | Sandbox/test-mode activation blocked | activation_blocked |
| 8 | Live activation blocked | activation_blocked |
| 9 | External call blocked | external_calls_forbidden |
| 10 | Approved channels empty | channels_empty |
| 11 | Approved external services empty | services_empty |
| 12 | Approved start time blank_placeholder | placeholder_only |
| 13 | Approved operator blank_placeholder | placeholder_only |
| 14 | Rollback owner blank_placeholder | placeholder_only |
| 15 | Required next decision (exact activation approval) | exact_approval_still_required |
| 16 | Forbidden scope boundary | forbidden_scope_enforced |
| 17 | Relationship to approval decision draft | builds_on_decision_draft |
| 18 | Not activation approval boundary | not_activation_approval |
| 19 | Credential/env boundary | boundary_enforced |
| 20 | Schema/auth/RLS/security boundary | boundary_enforced |

## 14. Required Common Fields Across All Capture Items

Every `first_controlled_launch_scoped_approval_capture_item` includes:

- `fixture_scoped_approval_capture_id`
- `fixture_capture_area`
- `fixture_capture_status`
- `fixture_approval_interpretation` — must be `move_forward_to_next_controlled_planning_step_only`
- `fixture_blocking_reason`
- `fixture_owner_for_next_step`
- `fixture_delivery_mode` — must be `dry_run_only`
- `fixture_external_call_allowed` — must be `false`
- `fixture_live_activation_allowed` — must be `false`
- `fixture_test_mode_activation_allowed` — must be `false`
- `fixture_first_controlled_launch_activation_allowed` — must be `false`
- `fixture_audit_event_id`
- `fixture_created_at`

## 15. Dry-Run Commands

```bash
node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-dry-run.sh
```

Full regression (milestones only — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```

## 16. Safety Rules

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

## 17. Verifier Assertions

The read-only verifier enforces:

- `first_controlled_launch_scoped_approval_capture_doc_present`
- `fake_data_local_only_scope_present`
- `jason_approval_statement_captured`
- `planning_only_interpretation_present`
- `no_launch_or_channel_activation_allowed`
- `approved_channels_empty`
- `approved_external_services_empty`
- `start_operator_rollback_remain_placeholders`
- `exact_next_approval_still_required`
- `no_credentials_env_api_webhook_production_schema_auth_rls_security_changes`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`
- `runner_outputs_valid_json`
- `capture_items_have_common_fields`
- `capture_items_remain_dry_run_only`
- `capture_items_have_activation_flags_false`
- `first_controlled_launch_activation_remains_blocked`
- `sandbox_test_mode_activation_remains_blocked`
- `live_activation_remains_blocked`
- `external_call_remains_blocked`
- `not_activation_approval_boundary_present`
- `forbidden_scope_enforced`
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