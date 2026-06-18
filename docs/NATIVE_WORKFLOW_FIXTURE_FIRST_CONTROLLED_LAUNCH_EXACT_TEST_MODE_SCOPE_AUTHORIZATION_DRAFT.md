# Native Workflow Fixture First Controlled Launch Exact Test-Mode Scope Authorization Draft

## 1. Purpose and Scope

This packet defines and verifies a **fake-data/local-only exact test-mode scope authorization draft** that structures the formal exact-scope authorization artifact Jason would review before any controlled test-mode activation — **without** granting activation approval, activating channels, or executing any step.

### What this packet is

- local fake-data first controlled launch exact test-mode scope authorization draft
- deterministic `exact_test_mode_scope_authorization_draft_record` with all required fields set to draft-only/placeholder/blocked values
- explicit prior scoped approval capture reference (`287627f`) and Jason approval statement reference
- authorization type `exact_test_mode_scope_authorization_draft`, status `draft_only_not_approved_for_activation`, activation approval status `not_granted`
- approval scope limited to `exact_scope_review_only`
- all activation flags remain `false`; approved channels and external services remain empty
- channel/start/operator/rollback/stop-condition fields remain placeholders only
- Jason approval fields table with all fields unapproved
- required next decision documented: Jason must explicitly approve exact channel/start/operator/rollback/stop-condition details before any activation
- read-only verifier
- dry-run wrapper using targeted verifier only
- **exact test-mode scope authorization draft dry-run only** — structures the future exact-scope authorization record for Jason review without granting activation or execution
- packet type is `exact_test_mode_scope_authorization_draft_only`

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
- This does **not** mistake the authorization draft structure for a granted activation approval record.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a deterministic fake-data exact test-mode scope authorization draft documenting the formal exact-scope authorization record structure Jason would review before any controlled test-mode activation — without schema, persistence, auth/RLS, sandbox credential reads, live integration work, activation approval, or execution. Actual activation still requires a separate explicit Jason approval after exact channel scope, start window, operator, rollback owner, and stop conditions are filled.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_DECISION_LEDGER_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md`
- `scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft.js`
- `backend/scripts/verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `287627f test(workflow): add first controlled launch scoped approval capture`

## 2. Fake-Data / Local-Only Exact Test-Mode Scope Authorization Draft

This section defines the **fake-data/local-only exact test-mode scope authorization draft** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft.js`) emits stdout JSON only. All authorization draft items use fixture identifiers, draft-only statuses, and blocked activation flags. No external service calls occur.

Top-level output fields:

- `first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary`
- `exact_test_mode_scope_authorization_draft_record`
- `jason_approval_fields_table`
- `first_controlled_launch_exact_test_mode_scope_authorization_draft_items`
- `executive_exact_scope_authorization_draft_summary`
- `prior_scoped_approval_capture_reference_summary`
- `jason_approval_statement_reference_summary`
- `authorization_draft_status_summary`
- `activation_blocked_summary`
- `approved_channels_empty_summary`
- `approved_external_services_empty_summary`
- `placeholder_fields_summary`
- `required_next_decision_summary`
- `forbidden_scope_summary`
- `not_activation_approval_boundary_summary`
- `scoped_approval_capture_relationship_summary`
- `jason_approval_fields_table_summary`
- `credential_env_boundary_summary`
- `schema_auth_rls_security_boundary_summary`
- `first_controlled_launch_exact_test_mode_scope_authorization_draft_safety_assertions`

Safety posture preserved: `demo_ready_with_live_automation_disabled`

## 3. Prior Scoped Approval Capture Reference

This authorization draft builds on the prior scoped approval capture at commit `287627f`:

- `prior_capture_commit`: `287627f`
- `approval_statement_reference`: `Approved to move forward.`
- Prior interpretation: `move_forward_to_next_controlled_planning_step_only`
- Prior scope: `prepare_controlled_test_mode_activation_plan_only`

The prior scoped planning approval does not grant activation approval.

## 4. Authorization Type and Status

| Field | Value |
| --- | --- |
| authorization_type | exact_test_mode_scope_authorization_draft |
| authorization_status | draft_only_not_approved_for_activation |
| activation_approval_status | not_granted |
| approval_scope | exact_scope_review_only |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |

Authorization draft only. Activation is not approved.

## 5. Exact Test-Mode Scope Authorization Draft Record

The `exact_test_mode_scope_authorization_draft_record` structures the formal exact-scope authorization artifact:

| Field | Value |
| --- | --- |
| approval_statement_reference | Approved to move forward. |
| prior_capture_commit | 287627f |
| authorization_type | exact_test_mode_scope_authorization_draft |
| authorization_status | draft_only_not_approved_for_activation |
| activation_approval_status | not_granted |
| approval_scope | exact_scope_review_only |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |
| approved_channels | [] |
| approved_external_services | [] |
| candidate_channel_scope | placeholder_only |
| approved_start_window | blank_placeholder |
| approved_operator | blank_placeholder |
| rollback_owner | blank_placeholder |
| stop_conditions | placeholder_required_before_activation |
| observation_window | placeholder_required_before_activation |
| rollback_plan_status | placeholder_required_before_activation |
| required_next_decision | Jason must explicitly approve exact channel/start/operator/rollback/stop-condition details before any activation. |
| forbidden_scope | all live/test-mode/external/service/production actions until separately approved |

## 6. Jason Approval Fields Table

Jason must explicitly approve each field below before any controlled test-mode activation. All values remain placeholders in this draft:

| Field | Current Value | Approval Required |
| --- | --- | --- |
| exact test-mode channel or channels | placeholder_only | true |
| exact external service or sandbox/test-mode service, if any | placeholder_only | true |
| fake/test account boundaries | placeholder_only | true |
| allowed test lead data shape | placeholder_only | true |
| allowed start window | blank_placeholder | true |
| approved operator | blank_placeholder | true |
| reviewer/on-call owner | blank_placeholder | true |
| rollback owner | blank_placeholder | true |
| stop conditions | placeholder_required_before_activation | true |
| observation window | placeholder_required_before_activation | true |
| evidence capture requirements | placeholder_required_before_activation | true |
| post-run review requirements | placeholder_required_before_activation | true |
| explicit excluded scope | placeholder_required_before_activation | true |

## 7. Activation Remains Blocked

All activation remains blocked until separate explicit Jason approval:

- First controlled launch activation: blocked
- Sandbox/test-mode activation: blocked
- Live activation: blocked
- External calls: blocked
- Channel activation: blocked (approved_channels empty)
- External service activation: blocked (approved_external_services empty)

## 8. Placeholder Fields Remain Unapproved

Until separate exact activation approval:

- `candidate_channel_scope`: `placeholder_only`
- `approved_start_window`: `blank_placeholder`
- `approved_operator`: `blank_placeholder`
- `rollback_owner`: `blank_placeholder`
- `stop_conditions`: `placeholder_required_before_activation`
- `observation_window`: `placeholder_required_before_activation`
- `rollback_plan_status`: `placeholder_required_before_activation`

## 9. Required Next Decision

Actual activation still requires:

> Jason must explicitly approve exact channel/start/operator/rollback/stop-condition details before any activation.

The authorization draft does not satisfy activation approval requirements.

## 10. Forbidden Scope

Until separately approved, forbidden scope remains:

> all live/test-mode/external/service/production actions until separately approved

## 11. Not Activation Approval Boundary

This exact test-mode scope authorization draft is explicitly **not** activation approval:

- Not activation approval
- Not live launch approval
- Not sandbox/test-mode activation approval
- Not external call approval
- Draft must not be mistaken for activation

## 12. Relationship to Scoped Approval Capture

The first controlled launch scoped approval capture (`docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md`) records Jason's planning-only move-forward approval. This authorization draft **builds on** that scoped approval capture by structuring the formal exact-scope authorization artifact without granting activation.

Reference phrase: first controlled launch scoped approval capture

## 13. Authorization Draft Areas

| Order | Area | Status |
| --- | --- | --- |
| 1 | Executive exact scope authorization draft summary | draft_only_not_approved_for_activation |
| 2 | Prior scoped approval capture reference | prior_scoped_planning_approval_referenced |
| 3 | Jason approval statement reference | statement_referenced_not_activation_approved |
| 4 | Authorization type and status (draft_only) | authorization_draft_only_activation_not_granted |
| 5 | Approval scope (exact_scope_review_only) | scope_limited_to_exact_scope_review |
| 6 | First controlled launch activation blocked | activation_blocked |
| 7 | Sandbox/test-mode activation blocked | activation_blocked |
| 8 | Live activation blocked | activation_blocked |
| 9 | External call blocked | external_calls_forbidden |
| 10 | Approved channels empty | channels_empty |
| 11 | Approved external services empty | services_empty |
| 12 | Candidate channel scope placeholder_only | placeholder_only |
| 13 | Approved start window blank_placeholder | placeholder_only |
| 14 | Approved operator blank_placeholder | placeholder_only |
| 15 | Rollback owner blank_placeholder | placeholder_only |
| 16 | Stop conditions placeholder_required_before_activation | placeholder_only |
| 17 | Observation window placeholder_required_before_activation | placeholder_only |
| 18 | Rollback plan status placeholder_required_before_activation | placeholder_only |
| 19 | Required next decision (Jason explicit approval) | exact_jason_approval_still_required |
| 20 | Forbidden scope boundary | forbidden_scope_enforced |
| 21 | Relationship to scoped approval capture | builds_on_scoped_approval_capture |
| 22 | Not activation approval boundary | not_activation_approval |
| 23 | Jason approval fields table (all placeholders) | all_fields_unapproved |
| 24 | Credential/env boundary | boundary_enforced |
| 25 | Schema/auth/RLS/security boundary | boundary_enforced |

## 14. Required Common Fields Across All Authorization Draft Items

Every `first_controlled_launch_exact_test_mode_scope_authorization_draft_item` includes:

- `fixture_exact_scope_authorization_draft_id`
- `fixture_authorization_area`
- `fixture_authorization_status`
- `fixture_authorization_type` — must be `exact_test_mode_scope_authorization_draft`
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
node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-dry-run.sh
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

- `first_controlled_launch_exact_test_mode_scope_authorization_draft_doc_present`
- `fake_data_local_only_scope_present`
- `prior_scoped_approval_capture_referenced`
- `jason_approval_statement_reference_present`
- `authorization_draft_only_not_activation_approved`
- `no_launch_or_channel_activation_allowed`
- `approved_channels_empty`
- `approved_external_services_empty`
- `channel_start_operator_rollback_stop_condition_fields_remain_placeholders`
- `exact_jason_approval_still_required_before_activation`
- `no_credentials_env_api_webhook_production_schema_auth_rls_security_changes`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`
- `runner_outputs_valid_json`
- `authorization_draft_items_have_common_fields`
- `authorization_draft_items_remain_dry_run_only`
- `authorization_draft_items_have_activation_flags_false`
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