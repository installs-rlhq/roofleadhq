# Native Workflow Fixture First Controlled Launch Pre-Activation Checklist

## 1. Purpose and Scope

This packet defines and verifies a **fake-data/local-only pre-activation checklist** that consolidates the final approval-ready checklist Jason would review before any exact controlled test-mode activation approval — **without** granting activation approval, activating channels, or executing any step.

### What this packet is

- local fake-data first controlled launch pre-activation checklist
- deterministic `pre_activation_checklist_record` with all required fields set to `not_filled` or `not_granted`
- explicit prior scoped approval capture reference (`287627f`) and exact scope authorization draft reference (`d7506bf`)
- checklist type `pre_activation_checklist`, status `approval_ready_draft_only`, activation approval status `not_granted`
- all activation flags remain `false`; approved channels and external services remain empty
- all required checklist fields remain `not_filled`; final Jason activation approval remains `not_granted`
- final approval checklist table with item, current value, required value before approval, owner, status, evidence needed, activation allowed now: false
- approval cannot be inferred boundary — checklist completion is not approval
- activation command must be separately approved
- read-only verifier
- dry-run wrapper using targeted verifier only
- **pre-activation checklist dry-run only** — consolidates required fields for Jason review without granting activation or execution
- packet type is `pre_activation_checklist_only`

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
- This does **not** mistake checklist completion for a granted activation approval record.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a deterministic fake-data pre-activation checklist documenting the exact fields Jason must fill and explicitly approve before any controlled test-mode activation — without schema, persistence, auth/RLS, sandbox credential reads, live integration work, activation approval, or execution. Actual activation still requires a separate explicit Jason approval after all checklist fields are filled and the activation command is separately approved.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_DECISION_LEDGER_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_PRE_ACTIVATION_CHECKLIST.md`
- `scripts/run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist.js`
- `backend/scripts/verify-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `d7506bf test(workflow): add first controlled launch exact test mode scope draft`

## 2. Fake-Data / Local-Only Pre-Activation Checklist

This section defines the **fake-data/local-only pre-activation checklist** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist.js`) emits stdout JSON only. All checklist items use fixture identifiers, draft-only statuses, and blocked activation flags. No external service calls occur.

Top-level output fields:

- `first_controlled_launch_pre_activation_checklist_dry_run_summary`
- `pre_activation_checklist_record`
- `final_approval_checklist_table`
- `first_controlled_launch_pre_activation_checklist_items`
- `executive_pre_activation_checklist_summary`
- `prior_scoped_approval_capture_reference_summary`
- `exact_scope_authorization_draft_reference_summary`
- `checklist_status_summary`
- `activation_blocked_summary`
- `approved_channels_empty_summary`
- `approved_external_services_empty_summary`
- `required_checklist_fields_summary`
- `approval_cannot_be_inferred_summary`
- `activation_command_separate_approval_summary`
- `final_approval_checklist_table_summary`
- `credential_env_boundary_summary`
- `schema_auth_rls_security_boundary_summary`
- `first_controlled_launch_pre_activation_checklist_safety_assertions`

Safety posture preserved: `demo_ready_with_live_automation_disabled`

## 3. Prior Scoped Approval Capture Reference

This checklist builds on the prior scoped approval capture at commit `287627f`:

- `prior_scoped_approval_capture_commit`: `287627f`
- `approval_statement_reference`: `Approved to move forward.`
- Prior interpretation: `move_forward_to_next_controlled_planning_step_only`
- Prior scope: `prepare_controlled_test_mode_activation_plan_only`

The prior scoped planning approval does not grant activation approval.

Reference phrase: first controlled launch scoped approval capture

## 4. Exact Scope Authorization Draft Reference

This checklist builds on the exact test-mode scope authorization draft at commit `d7506bf`:

- `exact_scope_authorization_draft_commit`: `d7506bf`
- `authorization_status`: `draft_only_not_approved_for_activation`
- Draft type: `exact_test_mode_scope_authorization_draft`

The exact scope authorization draft does not grant activation approval.

## 5. Checklist Type and Status

| Field | Value |
| --- | --- |
| checklist_type | pre_activation_checklist |
| checklist_status | approval_ready_draft_only |
| activation_approval_status | not_granted |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |

Checklist only. Activation is not approved.

## 6. Pre-Activation Checklist Record

The `pre_activation_checklist_record` consolidates all required fields Jason must fill and approve:

| Field | Value |
| --- | --- |
| prior_scoped_approval_capture_commit | 287627f |
| exact_scope_authorization_draft_commit | d7506bf |
| checklist_type | pre_activation_checklist |
| checklist_status | approval_ready_draft_only |
| activation_approval_status | not_granted |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |
| approved_channels | [] |
| approved_external_services | [] |
| required_channel_scope | not_filled |
| required_service_scope | not_filled |
| required_fake_test_account_boundaries | not_filled |
| required_allowed_test_lead_data_shape | not_filled |
| required_start_window | not_filled |
| required_operator | not_filled |
| required_reviewer_on_call_owner | not_filled |
| required_rollback_owner | not_filled |
| required_stop_conditions | not_filled |
| required_observation_window | not_filled |
| required_evidence_capture | not_filled |
| required_post_run_review | not_filled |
| required_excluded_scope_confirmation | not_filled |
| required_final_jason_activation_approval | not_granted |

## 7. Final Approval Checklist Table

Jason must explicitly approve each item below before any controlled test-mode activation. All values remain `not_filled` or `not_granted` in this checklist. Each row includes `required_value_before_approval`, evidence needed (`evidence_needed`), and activation allowed now (`activation_allowed_now: false`):

| Item | Current Value | Required Value Before Approval | Owner | Status | Evidence Needed | Activation Allowed Now |
| --- | --- | --- | --- | --- | --- | --- |
| required_channel_scope | not_filled | explicit approved channel scope | Jason | not_filled | written channel scope approval record | false |
| required_service_scope | not_filled | explicit approved external service scope, if any | Jason | not_filled | written service scope approval record | false |
| required_fake_test_account_boundaries | not_filled | explicit fake/test account boundaries | Jason | not_filled | documented test account boundary approval | false |
| required_allowed_test_lead_data_shape | not_filled | explicit allowed test lead data shape | Jason | not_filled | documented test lead data shape approval | false |
| required_start_window | not_filled | explicit approved start window | Jason | not_filled | written start window approval record | false |
| required_operator | not_filled | named approved operator | Jason | not_filled | operator assignment approval record | false |
| required_reviewer_on_call_owner | not_filled | named reviewer/on-call owner | Jason | not_filled | reviewer/on-call owner assignment approval record | false |
| required_rollback_owner | not_filled | named rollback owner | Jason | not_filled | rollback owner assignment approval record | false |
| required_stop_conditions | not_filled | explicit stop conditions | Jason | not_filled | documented stop conditions approval | false |
| required_observation_window | not_filled | explicit observation window | Jason | not_filled | documented observation window approval | false |
| required_evidence_capture | not_filled | explicit evidence capture requirements | Jason | not_filled | documented evidence capture plan approval | false |
| required_post_run_review | not_filled | explicit post-run review requirements | Jason | not_filled | documented post-run review plan approval | false |
| required_excluded_scope_confirmation | not_filled | explicit excluded scope confirmation | Jason | not_filled | documented excluded scope confirmation approval | false |
| required_final_jason_activation_approval | not_granted | explicit Jason final activation approval granted | Jason | not_granted | written Jason final activation approval decision | false |

## 8. Activation Remains Blocked

All activation remains blocked until separate explicit Jason approval:

- First controlled launch activation: blocked
- Sandbox/test-mode activation: blocked
- Live activation: blocked
- External calls: blocked
- Channel activation: blocked (approved_channels empty)
- External service activation: blocked (approved_external_services empty)

## 9. Required Checklist Fields Remain Not Filled

Until separate exact activation approval:

- `required_channel_scope`: `not_filled`
- `required_service_scope`: `not_filled`
- `required_fake_test_account_boundaries`: `not_filled`
- `required_allowed_test_lead_data_shape`: `not_filled`
- `required_start_window`: `not_filled`
- `required_operator`: `not_filled`
- `required_reviewer_on_call_owner`: `not_filled`
- `required_rollback_owner`: `not_filled`
- `required_stop_conditions`: `not_filled`
- `required_observation_window`: `not_filled`
- `required_evidence_capture`: `not_filled`
- `required_post_run_review`: `not_filled`
- `required_excluded_scope_confirmation`: `not_filled`
- `required_final_jason_activation_approval`: `not_granted`

## 10. Approval Cannot Be Inferred

Completion of this checklist packet is not approval:

- completion of this checklist packet is not approval
- exact values must be filled before any activation
- Jason must explicitly approve the final activation decision
- Activation command must be separately approved
- rollback/stop conditions must be ready before any activation

## 11. Activation Command Separately Approved

The activation command must be separately approved after all checklist fields are filled and Jason grants final activation approval. This checklist does not authorize any activation command.

## 12. Checklist Areas

| Order | Area | Status |
| --- | --- | --- |
| 1 | Executive pre-activation checklist summary | approval_ready_draft_only |
| 2 | Prior scoped approval capture reference | prior_scoped_planning_approval_referenced |
| 3 | Exact scope authorization draft reference | exact_scope_draft_referenced_not_activation_approved |
| 4 | Checklist type and status (approval_ready_draft_only) | checklist_only_not_activation_approved |
| 5 | Activation approval status (not_granted) | activation_approval_not_granted |
| 6 | First controlled launch activation blocked | activation_blocked |
| 7 | Sandbox/test-mode activation blocked | activation_blocked |
| 8 | Live activation blocked | activation_blocked |
| 9 | External call blocked | external_calls_forbidden |
| 10 | Approved channels empty | channels_empty |
| 11 | Approved external services empty | services_empty |
| 12 | Required channel scope not_filled | not_filled |
| 13 | Required service scope not_filled | not_filled |
| 14 | Required fake/test account boundaries not_filled | not_filled |
| 15 | Required allowed test lead data shape not_filled | not_filled |
| 16 | Required start window not_filled | not_filled |
| 17 | Required operator not_filled | not_filled |
| 18 | Required reviewer/on-call owner not_filled | not_filled |
| 19 | Required rollback owner not_filled | not_filled |
| 20 | Required stop conditions not_filled | not_filled |
| 21 | Required observation window not_filled | not_filled |
| 22 | Required evidence capture not_filled | not_filled |
| 23 | Required post-run review not_filled | not_filled |
| 24 | Required excluded scope confirmation not_filled | not_filled |
| 25 | Required final Jason activation approval not_granted | not_granted |
| 26 | Approval cannot be inferred boundary | approval_cannot_be_inferred |
| 27 | Activation command separately approved boundary | activation_command_not_separately_approved |
| 28 | Final approval checklist table (all not_filled) | all_fields_unapproved |
| 29 | Credential/env boundary | boundary_enforced |
| 30 | Schema/auth/RLS/security boundary | boundary_enforced |

## 13. Required Common Fields Across All Checklist Items

Every `first_controlled_launch_pre_activation_checklist_item` includes:

- `fixture_pre_activation_checklist_id`
- `fixture_checklist_area`
- `fixture_checklist_status`
- `fixture_checklist_type` — must be `pre_activation_checklist`
- `fixture_blocking_reason`
- `fixture_owner_for_next_step`
- `fixture_delivery_mode` — must be `dry_run_only`
- `fixture_external_call_allowed` — must be `false`
- `fixture_live_activation_allowed` — must be `false`
- `fixture_test_mode_activation_allowed` — must be `false`
- `fixture_first_controlled_launch_activation_allowed` — must be `false`
- `fixture_audit_event_id`
- `fixture_created_at`

## 14. Dry-Run Commands

```bash
node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-dry-run.sh
```

Full regression (milestones only — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```

## 15. Safety Rules

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

## 16. Verifier Assertions

The read-only verifier enforces:

- `first_controlled_launch_pre_activation_checklist_doc_present`
- `fake_data_local_only_scope_present`
- `checklist_only_not_activation_approved`
- `prior_scoped_approval_capture_referenced`
- `exact_scope_authorization_draft_referenced`
- `activation_approval_not_granted`
- `approved_channels_empty`
- `approved_external_services_empty`
- `all_required_checklist_fields_remain_not_filled`
- `final_jason_activation_approval_not_granted`
- `activation_command_must_be_separately_approved`
- `no_launch_or_channel_activation_allowed`
- `approval_cannot_be_inferred_boundary_present`
- `no_credentials_env_api_webhook_production_schema_auth_rls_security_changes`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`
- `runner_outputs_valid_json`
- `checklist_items_have_common_fields`
- `checklist_items_remain_dry_run_only`
- `checklist_items_have_activation_flags_false`
- `first_controlled_launch_activation_remains_blocked`
- `sandbox_test_mode_activation_remains_blocked`
- `live_activation_remains_blocked`
- `external_call_remains_blocked`
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