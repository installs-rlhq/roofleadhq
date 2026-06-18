# Native Workflow Fixture First Controlled Launch Final Activation Command Draft

## 1. Purpose and Scope

This packet defines and verifies a **fake-data/local-only/read-only/dry-run-only final activation command draft** that documents the exact local-only dry-run command Jason could review and separately approve later — **without** approving the command, granting activation approval, activating channels, or executing any step.

### What this packet is

- local fake-data first controlled launch final activation command draft
- deterministic `final_activation_command_draft_record` with proposed exact command string documented
- explicit command-draft-only interpretation: `review_only_not_approved_for_execution`
- command draft type: `final_activation_command_draft`; command draft status: `review_only_not_approved_for_execution`
- activation approval status: `not_granted`; activation command approval status: `not_granted`
- all activation flags remain `false`; approved channels and external services remain empty
- proposed exact command documented but not approved for execution
- before-this-command-can-be-run checklist with all items unconfirmed or not_granted
- stop conditions and post-run review template
- finish everything we can section documenting safe vs not-safe next steps
- read-only verifier
- dry-run wrapper using targeted verifier only
- **final activation command draft dry-run only** — documents proposed exact command for Jason review without granting activation or execution
- packet type is `final_activation_command_draft_only`

### What this packet is not

- This is **not** approval to run the proposed command.
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
- This does **not** mistake command draft documentation for activation or command execution approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a deterministic fake-data final activation command draft documenting the exact local-only dry-run command Jason could separately approve later — without schema, persistence, auth/RLS, sandbox credential reads, live integration work, activation approval, or command execution approval. Actual command execution still requires Jason to explicitly approve this exact command string.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_PRE_ACTIVATION_CHECKLIST.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_RECOMMENDED_TEST_MODE_VALUES_PROPOSAL.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVED_TEST_MODE_VALUES_CAPTURE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_DECISION_LEDGER_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md`
- `scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft.js`
- `backend/scripts/verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `75f24e5 test(workflow): add first controlled launch approved test mode values capture`

## 2. Fake-Data / Local-Only Final Activation Command Draft

This section defines the **fake-data/local-only final activation command draft** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft.js`) emits stdout JSON only. All command draft items use fixture identifiers, review-only statuses, and blocked activation flags. No external service calls occur.

Top-level output fields:

- `first_controlled_launch_final_activation_command_draft_dry_run_summary`
- `final_activation_command_draft_record`
- `proposed_command_record`
- `before_command_can_run_checklist`
- `stop_conditions`
- `post_run_review_template`
- `first_controlled_launch_final_activation_command_draft_items`
- `executive_command_draft_summary`
- `prior_scoped_approval_capture_reference_summary`
- `exact_scope_authorization_draft_reference_summary`
- `pre_activation_checklist_reference_summary`
- `recommended_values_proposal_reference_summary`
- `approved_test_mode_values_capture_reference_summary`
- `command_draft_status_summary`
- `activation_blocked_summary`
- `activation_not_granted_boundary_summary`
- `activation_command_not_granted_boundary_summary`
- `activation_boundary_summary`
- `approved_channels_empty_summary`
- `approved_external_services_empty_summary`
- `proposed_command_summary`
- `before_command_can_run_checklist_summary`
- `stop_conditions_summary`
- `finish_everything_we_can_summary`
- `post_run_review_template_summary`
- `required_next_decision_summary`
- `credential_env_boundary_summary`
- `schema_auth_rls_security_boundary_summary`
- `first_controlled_launch_final_activation_command_draft_safety_assertions`

Safety posture preserved: `demo_ready_with_live_automation_disabled`

## 3. Prior Packet References

### Prior scoped approval capture (`287627f`)

Reference phrase: first controlled launch scoped approval capture

- `prior_scoped_approval_capture_commit`: `287627f`
- Prior interpretation: `move_forward_to_next_controlled_planning_step_only`
- Prior scope: `prepare_controlled_test_mode_activation_plan_only`
- Prior capture does not grant activation approval.

### Exact scope authorization draft (`d7506bf`)

Reference phrase: exact test-mode scope authorization draft

- `exact_scope_authorization_draft_commit`: `d7506bf`
- `authorization_status`: `draft_only_not_approved_for_activation`
- Exact scope draft does not grant activation approval.

### Pre-activation checklist (`2b753e8`)

Reference phrase: pre-activation checklist

- `pre_activation_checklist_commit`: `2b753e8`
- `checklist_type`: `pre_activation_checklist`
- `checklist_status`: `approval_ready_draft_only`
- Pre-activation checklist does not grant activation approval.

### Recommended values proposal (`205a6c4`)

Reference phrase: recommended test-mode values proposal

- `recommended_values_proposal_commit`: `205a6c4`
- `proposal_status_at_reference`: `proposed_only_not_approved`
- Recommended values proposal does not grant activation approval.

### Approved test-mode values capture (`75f24e5`)

Reference phrase: approved test-mode values capture

- `approved_test_mode_values_capture_commit`: `75f24e5`
- `approved_values_status`: `approved_as_exact_planned_local_dry_run_values`
- Approved values capture does not grant activation approval or command execution approval.

## 4. Command Draft Type and Status

| Field | Value |
| --- | --- |
| command_draft_type | final_activation_command_draft |
| command_draft_status | review_only_not_approved_for_execution |
| activation_approval_status | not_granted |
| activation_command_approval_status | not_granted |
| final_jason_activation_approval | not_granted |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |

Command draft only. Activation and command execution are not approved.

## 5. Final Activation Command Draft Record

The `final_activation_command_draft_record` consolidates the proposed exact command and blocked activation state:

| Field | Value |
| --- | --- |
| prior_scoped_approval_capture_commit | 287627f |
| exact_scope_authorization_draft_commit | d7506bf |
| pre_activation_checklist_commit | 2b753e8 |
| recommended_values_proposal_commit | 205a6c4 |
| approved_test_mode_values_capture_commit | 75f24e5 |
| approved_values_status | approved_as_exact_planned_local_dry_run_values |
| command_draft_type | final_activation_command_draft |
| command_draft_status | review_only_not_approved_for_execution |
| activation_approval_status | not_granted |
| activation_command_approval_status | not_granted |
| final_jason_activation_approval | not_granted |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |
| approved_channels | [] |
| approved_external_services | [] |
| approved_for_activation_now | false |
| activation_command_required | true |
| proposed_command_label | first controlled launch local dry-run only |
| proposed_command | bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh |
| proposed_command_approval_status | not_granted |
| proposed_command_execution_allowed_now | false |
| proposed_command_requires_separate_jason_approval | true |
| proposed_command_mode | local_fake_data_review_only |
| proposed_command_external_calls_allowed | false |
| proposed_command_production_data_allowed | false |
| proposed_command_credentials_allowed | false |
| required_next_decision | Jason must separately approve this exact proposed command string before any execution beyond local dry-run review. |

## 6. Proposed Exact Command

The proposed exact command is documented for Jason review only. It is **not** approved for execution.

| Field | Value |
| --- | --- |
| proposed_command_label | first controlled launch local dry-run only |
| proposed_command | bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh |
| proposed_command_approval_status | not_granted |
| proposed_command_execution_allowed_now | false |
| proposed_command_requires_separate_jason_approval | true |
| proposed_command_mode | local_fake_data_review_only |
| proposed_command_external_calls_allowed | false |
| proposed_command_production_data_allowed | false |
| proposed_command_credentials_allowed | false |

This command draft documents a local-only dry-run verifier smoke wrapper. Running it now is draft review only and does not constitute activation approval.

## 7. Before This Command Can Be Run

Jason and the operator must satisfy every item below before this exact command may be run as anything beyond draft review:

| Checklist Item | Description | Status | Owner | Activation Allowed Now |
| --- | --- | --- | --- | --- |
| jason_explicitly_approves_exact_command_string | Jason explicitly approves this exact command string | not_granted | Jason | false |
| operator_confirms_canonical_repo_head_equals_origin_main | operator confirms canonical repo HEAD == origin/main | not_confirmed | operator | false |
| git_status_is_clean | git status is clean | not_confirmed | operator | false |
| targeted_verifier_passes | targeted verifier passes | not_confirmed | operator | false |
| wrapper_passes | wrapper passes | not_confirmed | operator | false |
| fast_safe_readiness_passes | fast safe readiness passes | not_confirmed | operator | false |
| backend_build_passes | backend build passes | not_confirmed | operator | false |
| no_credentials_env_api_webhook_production_schema_auth_rls_security_changes | no credentials/env/API/webhook/production/schema/auth/RLS/security changes | not_confirmed | operator | false |
| no_public_go_live_production_copy_changes | no public go-live/production copy changes | not_confirmed | operator | false |
| activation_remains_local_fake_data_only | activation remains local fake-data only | not_confirmed | operator | false |
| stop_conditions_are_accepted | stop conditions are accepted | not_confirmed | Jason | false |

## 8. Stop Conditions

Stop immediately if any of the following occur during any future approved run:

- any external call attempt
- any credential/env access attempt
- any production data access attempt
- any real SMS/email/call/calendar/CSV/CRM/webhook attempt
- any scheduler/cron/dispatcher activation
- any schema/auth/RLS/security change
- any failed safety assertion
- any unexpected Supabase production access
- any public route/webhook exposure

## 9. Activation Remains Blocked

All activation remains blocked until separate explicit Jason approval of the exact command string:

- First controlled launch activation: blocked
- Sandbox/test-mode activation: blocked
- Live activation: blocked
- External calls: blocked
- Channel activation: blocked (approved_channels empty)
- External service activation: blocked (approved_external_services empty)
- Activation command: not approved (`activation_command_approval_status: not_granted`)
- Proposed command: not approved (`proposed_command_approval_status: not_granted`)

## 10. Activation Boundary

Until separate command string approval:

- `approved_for_activation_now`: `false`
- `activation_command_required`: `true`
- `activation_command_approval_status`: `not_granted`
- `activation_approval_status`: `not_granted`
- `final_jason_activation_approval`: `not_granted`
- `proposed_command_execution_allowed_now`: `false`

Command draft documentation does not authorize activation or command execution.

## 11. Finish Everything We Can

Jason's "finish everything we can" guidance is interpreted within the local dry-run planning boundary:

### Safe to finish now

- command draft
- final no-go/go review packet
- post-run review template

### Not safe without separate explicit approval

- run command as activation
- call external services
- use credentials
- touch production data
- send real messages
- schedule cron/dispatcher
- expose public routes/webhooks

## 12. Post-Run Review Template

After any future separately approved run, confirm:

- confirm no activation occurred
- confirm no external calls were attempted
- confirm no production data was accessed
- confirm no credentials or env values were read or logged
- confirm no public copy changes were made
- confirm no unexpected files were created or modified
- confirm git status is clean after review
- confirm all stop conditions remained respected
- confirm proposed command was run only as draft verifier smoke if run at all
- confirm activation approval and activation command approval remain not_granted

## 13. Required Next Decision

Jason must separately approve this exact proposed command string before any execution beyond local dry-run review. This command draft does not authorize any command execution.

## 14. Command Draft Areas

| Order | Area | Status |
| --- | --- | --- |
| 1 | Executive final activation command draft summary | review_only_not_approved_for_execution |
| 2 | Prior scoped approval capture reference | prior_scoped_planning_approval_referenced |
| 3 | Exact scope authorization draft reference | exact_scope_draft_referenced_not_activation_approved |
| 4 | Pre-activation checklist reference | pre_activation_checklist_referenced_not_activation_approved |
| 5 | Recommended values proposal reference (205a6c4) | recommended_values_proposal_referenced_not_activation_approved |
| 6 | Approved test-mode values capture reference (75f24e5) | approved_values_capture_referenced_not_activation_approved |
| 7 | Command draft type and status | command_draft_review_only_not_approved_for_execution |
| 8 | Activation approval status (not_granted) | activation_approval_not_granted |
| 9 | Activation command approval status (not_granted) | activation_command_approval_not_granted |
| 10 | First controlled launch activation blocked | activation_blocked |
| 11 | Sandbox/test-mode activation blocked | activation_blocked |
| 12 | Live activation blocked | activation_blocked |
| 13 | External call blocked | external_calls_forbidden |
| 14 | Approved channels empty | channels_empty |
| 15 | Approved external services empty | services_empty |
| 16 | Proposed command documented | proposed_command_documented_not_approved_for_execution |
| 17 | Proposed command not approved for execution | proposed_command_approval_not_granted |
| 18 | Proposed command requires separate Jason approval | proposed_command_requires_separate_jason_approval |
| 19 | Proposed command local fake-data review-only | proposed_command_local_fake_data_review_only |
| 20 | Before this command can be run checklist | before_command_can_run_checklist_documented |
| 21 | Stop conditions | stop_conditions_documented |
| 22 | Activation not granted boundary | activation_not_granted |
| 23 | Activation command not granted boundary | activation_command_not_granted |
| 24 | Activation boundary (approved_for_activation_now false) | approved_for_activation_now_false |
| 25 | Finish everything we can | safe_vs_not_safe_boundary_documented |
| 26 | Post-run review template | post_run_review_template_documented |
| 27 | Credential/env boundary | boundary_enforced |
| 28 | Schema/auth/RLS/security boundary | boundary_enforced |

## 15. Required Common Fields Across All Command Draft Items

Every `first_controlled_launch_final_activation_command_draft_item` includes:

- `fixture_command_draft_id`
- `fixture_command_draft_area`
- `fixture_command_draft_status`
- `fixture_command_draft_type` — must be `final_activation_command_draft`
- `fixture_blocking_reason`
- `fixture_owner_for_next_step`
- `fixture_delivery_mode` — must be `dry_run_only`
- `fixture_external_call_allowed` — must be `false`
- `fixture_live_activation_allowed` — must be `false`
- `fixture_test_mode_activation_allowed` — must be `false`
- `fixture_first_controlled_launch_activation_allowed` — must be `false`
- `fixture_audit_event_id`
- `fixture_created_at`

## 16. Dry-Run Commands

```bash
node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

Full regression (milestones only — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```

## 17. Safety Rules

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

## 18. Verifier Assertions

The read-only verifier enforces:

- `first_controlled_launch_final_activation_command_draft_doc_present`
- `fake_data_local_only_scope_present`
- `command_draft_only_packet`
- `approved_test_mode_values_capture_commit_75f24e5_referenced`
- `activation_approval_not_granted`
- `activation_command_approval_not_granted`
- `final_jason_activation_approval_not_granted`
- `approved_for_activation_now_false`
- `proposed_command_documented_not_approved_for_execution`
- `proposed_command_requires_separate_jason_approval`
- `proposed_command_local_fake_data_review_only`
- `no_external_services_approved`
- `approved_channels_empty`
- `approved_external_services_empty`
- `first_controlled_launch_activation_remains_blocked`
- `sandbox_test_mode_activation_remains_blocked`
- `live_activation_remains_blocked`
- `external_call_remains_blocked`
- `before_command_can_run_checklist_present`
- `stop_conditions_present`
- `finish_everything_we_can_boundary_present`
- `no_credentials_env_api_webhook_production_schema_auth_rls_security_changes`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`
- `runner_outputs_valid_json`
- `command_draft_items_have_common_fields`
- `command_draft_items_remain_dry_run_only`
- `command_draft_items_have_activation_flags_false`
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