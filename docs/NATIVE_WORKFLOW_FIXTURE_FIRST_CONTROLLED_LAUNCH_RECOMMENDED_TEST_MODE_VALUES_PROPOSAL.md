# Native Workflow Fixture First Controlled Launch Recommended Test-Mode Values Proposal

## 1. Purpose and Scope

This packet defines and verifies a **fake-data/local-only/read-only/dry-run-only recommended test-mode values proposal** that offers conservative safe defaults Jason can review before any exact controlled test-mode activation decision — **without** granting activation approval, activating channels, or executing any step.

### What this packet is

- local fake-data first controlled launch recommended test-mode values proposal
- deterministic `recommended_test_mode_values_proposal_record` with conservative proposed values and all approval statuses set to `proposed_only_not_approved` or `not_granted`
- explicit prior scoped approval capture reference (`287627f`), exact scope authorization draft reference (`d7506bf`), and pre-activation checklist reference (`2b753e8`)
- proposal type `recommended_test_mode_values_proposal`, status `proposed_only_not_approved`, activation approval status `not_granted`
- all activation flags remain `false`; approved channels and external services remain empty
- proposed values are recommendations only — not approved values
- recommended values checklist table with checklist item, recommended value, why safest default, approval status, activation allowed now, evidence needed before future approval
- operator questions deferred section — no blocking questions required to create this proposal
- read-only verifier
- dry-run wrapper using targeted verifier only
- **recommended test-mode values proposal dry-run only** — helps Jason review safe defaults for a future exact controlled test-mode activation decision without granting activation or execution
- packet type is `recommended_test_mode_values_proposal_only`

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
- This does **not** treat proposed values as approved values.
- This does **not** mistake this proposal for a granted activation approval record.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a deterministic fake-data recommended test-mode values proposal documenting conservative safe defaults Jason can review before any exact controlled test-mode activation decision — without schema, persistence, auth/RLS, sandbox credential reads, live integration work, activation approval, or execution. Actual activation still requires Jason to explicitly approve exact proposed values and separately approve any activation command.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_PRE_ACTIVATION_CHECKLIST.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_DECISION_LEDGER_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_RECOMMENDED_TEST_MODE_VALUES_PROPOSAL.md`
- `scripts/run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal.js`
- `backend/scripts/verify-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `2b753e8 test(workflow): add first controlled launch pre activation checklist`

## 2. Fake-Data / Local-Only Recommended Test-Mode Values Proposal

This section defines the **fake-data/local-only recommended test-mode values proposal** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal.js`) emits stdout JSON only. All proposal items use fixture identifiers, proposed-only statuses, and blocked activation flags. No external service calls occur.

Top-level output fields:

- `first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary`
- `recommended_test_mode_values_proposal_record`
- `recommended_values_checklist_table`
- `first_controlled_launch_recommended_test_mode_values_proposal_items`
- `executive_recommended_values_proposal_summary`
- `prior_scoped_approval_capture_reference_summary`
- `exact_scope_authorization_draft_reference_summary`
- `pre_activation_checklist_reference_summary`
- `proposal_status_summary`
- `activation_blocked_summary`
- `approved_channels_empty_summary`
- `approved_external_services_empty_summary`
- `proposed_values_summary`
- `proposed_values_not_approved_summary`
- `required_next_decision_summary`
- `operator_questions_deferred_summary`
- `activation_command_separate_approval_summary`
- `recommended_values_checklist_table_summary`
- `credential_env_boundary_summary`
- `schema_auth_rls_security_boundary_summary`
- `first_controlled_launch_recommended_test_mode_values_proposal_safety_assertions`

Safety posture preserved: `demo_ready_with_live_automation_disabled`

## 3. Prior Scoped Approval Capture Reference

This proposal builds on the prior scoped approval capture at commit `287627f`:

- `prior_scoped_approval_capture_commit`: `287627f`
- `approval_statement_reference`: `Approved to move forward.`
- Prior interpretation: `move_forward_to_next_controlled_planning_step_only`
- Prior scope: `prepare_controlled_test_mode_activation_plan_only`

The prior scoped planning approval does not grant activation approval.

Reference phrase: first controlled launch scoped approval capture

## 4. Exact Scope Authorization Draft Reference

This proposal builds on the exact test-mode scope authorization draft at commit `d7506bf`:

- `exact_scope_authorization_draft_commit`: `d7506bf`
- `authorization_status`: `draft_only_not_approved_for_activation`
- Draft type: `exact_test_mode_scope_authorization_draft`

The exact scope authorization draft does not grant activation approval.

## 5. Pre-Activation Checklist Reference

This proposal builds on the pre-activation checklist at commit `2b753e8`:

- `pre_activation_checklist_commit`: `2b753e8`
- `checklist_type`: `pre_activation_checklist`
- `checklist_status`: `approval_ready_draft_only`
- All required checklist fields remain `not_filled` in the prior checklist

The pre-activation checklist does not grant activation approval.

## 6. Proposal Type and Status

| Field | Value |
| --- | --- |
| proposal_type | recommended_test_mode_values_proposal |
| proposal_status | proposed_only_not_approved |
| activation_approval_status | not_granted |
| final_jason_activation_approval | not_granted |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |

Proposal only. Activation is not approved.

## 7. Recommended Test-Mode Values Proposal Record

The `recommended_test_mode_values_proposal_record` consolidates conservative proposed values for Jason review:

| Field | Value |
| --- | --- |
| prior_scoped_approval_capture_commit | 287627f |
| exact_scope_authorization_draft_commit | d7506bf |
| pre_activation_checklist_commit | 2b753e8 |
| proposal_type | recommended_test_mode_values_proposal |
| proposal_status | proposed_only_not_approved |
| activation_approval_status | not_granted |
| final_jason_activation_approval | not_granted |
| first_controlled_launch_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_call_allowed | false |
| approved_channels | [] |
| approved_external_services | [] |
| proposed_channel_scope | local fake channel adapters only |
| proposed_service_scope | no external services |
| proposed_fake_test_account_boundaries | fake/local-only account fixtures; no real homeowner, roofer, customer, production, or external account data |
| proposed_allowed_test_lead_data_shape | one or more seeded fake roofing homeowner leads with fake name, fake phone, fake email, fake address, fake source, fake appointment preference, fake consent/contact flags, and fake review/escalation outcomes |
| proposed_start_window | operator-selected manual window, not scheduled, not approved |
| proposed_operator | Jason or designated operator placeholder |
| proposed_reviewer_on_call_owner | Jason placeholder |
| proposed_rollback_owner | Jason placeholder |
| proposed_stop_conditions | any attempted external call, credential/env access, production data access, real send, real webhook, real scheduler/cron/dispatcher activation, unexpected Supabase access, schema/auth/RLS/security change, failed safety assertion, or unexpected channel delivery attempt |
| proposed_observation_window | short manual observation window placeholder after local dry-run only |
| proposed_evidence_capture | terminal output, targeted verifier result, wrapper result, fast safe readiness result, backend build result, source-of-truth verification after commit only |
| proposed_post_run_review | confirm no activation, no external calls, no production data access, no credentials, no public copy changes, no unexpected files, and clean git status |
| proposed_excluded_scope | all live/test-mode/external/service/production actions, real homeowners, real roofers, real sends, real calendars, CRM sync, live CSV, billing/payment/deposit/invoice/quote/estimate automation |
| required_next_decision | Jason must explicitly approve exact proposed values and separately approve any activation command before activation. |

## 8. Recommended Values Checklist Table

Jason must explicitly approve each proposed value before any controlled test-mode activation. Each row includes checklist item, recommended value, why this is the safest default, approval status, activation allowed now, and evidence needed before future approval. All rows include `approval_status: proposed_only_not_approved`, `activation_allowed_now: false`, and evidence needed before future approval:

| Checklist Item | Recommended Value | Why This Is the Safest Default | Approval Status | Activation Allowed Now | Evidence Needed Before Future Approval |
| --- | --- | --- | --- | --- | --- |
| proposed_channel_scope | local fake channel adapters only | keeps all channel exercise inside local fixtures with zero external delivery risk | proposed_only_not_approved | false | written Jason approval of exact channel scope |
| proposed_service_scope | no external services | eliminates credential, webhook, and third-party blast-radius during first controlled review | proposed_only_not_approved | false | written Jason approval of any future external service scope, if any |
| proposed_fake_test_account_boundaries | fake/local-only account fixtures; no real homeowner, roofer, customer, production, or external account data | prevents accidental PII or production account coupling in first review | proposed_only_not_approved | false | documented test account boundary approval |
| proposed_allowed_test_lead_data_shape | one or more seeded fake roofing homeowner leads with fake name, fake phone, fake email, fake address, fake source, fake appointment preference, fake consent/contact flags, and fake review/escalation outcomes | exercises realistic workflow shape without real people or production records | proposed_only_not_approved | false | documented test lead data shape approval |
| proposed_start_window | operator-selected manual window, not scheduled, not approved | avoids unattended scheduler/cron activation during first controlled review | proposed_only_not_approved | false | written start window approval record |
| proposed_operator | Jason or designated operator placeholder | keeps human operator accountability explicit before any activation | proposed_only_not_approved | false | operator assignment approval record |
| proposed_reviewer_on_call_owner | Jason placeholder | ensures a named reviewer is accountable during any future controlled run | proposed_only_not_approved | false | reviewer/on-call owner assignment approval record |
| proposed_rollback_owner | Jason placeholder | ensures rollback authority is named before any future activation | proposed_only_not_approved | false | rollback owner assignment approval record |
| proposed_stop_conditions | any attempted external call, credential/env access, production data access, real send, real webhook, real scheduler/cron/dispatcher activation, unexpected Supabase access, schema/auth/RLS/security change, failed safety assertion, or unexpected channel delivery attempt | fail-closed stop list covers the highest-risk escape paths | proposed_only_not_approved | false | documented stop conditions approval |
| proposed_observation_window | short manual observation window placeholder after local dry-run only | limits first review to a bounded manual observation period | proposed_only_not_approved | false | documented observation window approval |
| proposed_evidence_capture | terminal output, targeted verifier result, wrapper result, fast safe readiness result, backend build result, source-of-truth verification after commit only | captures deterministic local evidence without external telemetry | proposed_only_not_approved | false | documented evidence capture plan approval |
| proposed_post_run_review | confirm no activation, no external calls, no production data access, no credentials, no public copy changes, no unexpected files, and clean git status | post-run checklist confirms safety posture held | proposed_only_not_approved | false | documented post-run review plan approval |
| proposed_excluded_scope | all live/test-mode/external/service/production actions, real homeowners, real roofers, real sends, real calendars, CRM sync, live CSV, billing/payment/deposit/invoice/quote/estimate automation | explicit exclusion list prevents scope creep into live automation | proposed_only_not_approved | false | documented excluded scope confirmation approval |
| required_next_decision | Jason must explicitly approve exact proposed values and separately approve any activation command before activation. | separates proposal review from activation command authorization | proposed_only_not_approved | false | written Jason final activation approval decision |

## 9. Activation Remains Blocked

All activation remains blocked until separate explicit Jason approval:

- First controlled launch activation: blocked
- Sandbox/test-mode activation: blocked
- Live activation: blocked
- External calls: blocked
- Channel activation: blocked (approved_channels empty)
- External service activation: blocked (approved_external_services empty)
- Proposed values: not approved

## 10. Proposed Values Are Not Approved

Until separate exact activation approval:

- All proposed values remain `proposed_only_not_approved`
- `approved_channels`: `[]`
- `approved_external_services`: `[]`
- `activation_approval_status`: `not_granted`
- `final_jason_activation_approval`: `not_granted`

## 11. Operator Questions Deferred

No blocking questions are required to create this proposal:

- no blocking questions are required to create this proposal
- questions become required only before a real external/test-mode service is selected
- if Jason later wants real Twilio/Resend/Vapi/Calendar/Lindy sandbox/test-mode, exact credentials/account/service boundaries must be reviewed separately without logging secrets

## 12. Required Next Decision

Jason must explicitly approve exact proposed values and separately approve any activation command before activation. This proposal does not authorize any activation command.

## 13. Activation Command Separately Approved

The activation command must be separately approved after Jason grants final activation approval of exact proposed values. This proposal does not authorize any activation command.

## 14. Proposal Areas

| Order | Area | Status |
| --- | --- | --- |
| 1 | Executive recommended values proposal summary | proposed_only_not_approved |
| 2 | Prior scoped approval capture reference | prior_scoped_planning_approval_referenced |
| 3 | Exact scope authorization draft reference | exact_scope_draft_referenced_not_activation_approved |
| 4 | Pre-activation checklist reference | pre_activation_checklist_referenced_not_activation_approved |
| 5 | Proposal type and status (proposed_only_not_approved) | proposal_only_not_activation_approved |
| 6 | Activation approval status (not_granted) | activation_approval_not_granted |
| 7 | First controlled launch activation blocked | activation_blocked |
| 8 | Sandbox/test-mode activation blocked | activation_blocked |
| 9 | Live activation blocked | activation_blocked |
| 10 | External call blocked | external_calls_forbidden |
| 11 | Approved channels empty | channels_empty |
| 12 | Approved external services empty | services_empty |
| 13 | Proposed channel scope (local fake channel adapters only) | proposed_only_not_approved |
| 14 | Proposed service scope (no external services) | proposed_only_not_approved |
| 15 | Proposed fake/test account boundaries | proposed_only_not_approved |
| 16 | Proposed allowed test lead data shape | proposed_only_not_approved |
| 17 | Proposed start window | proposed_only_not_approved |
| 18 | Proposed operator | proposed_only_not_approved |
| 19 | Proposed reviewer/on-call owner | proposed_only_not_approved |
| 20 | Proposed rollback owner | proposed_only_not_approved |
| 21 | Proposed stop conditions | proposed_only_not_approved |
| 22 | Proposed observation window | proposed_only_not_approved |
| 23 | Proposed evidence capture | proposed_only_not_approved |
| 24 | Proposed post-run review | proposed_only_not_approved |
| 25 | Proposed excluded scope | proposed_only_not_approved |
| 26 | Required next decision (Jason explicit approval) | proposed_only_not_approved |
| 27 | Proposed values are not approved boundary | proposed_values_not_approved |
| 28 | Activation command separately approved boundary | activation_command_not_separately_approved |
| 29 | Recommended values checklist table | all_rows_proposed_only_not_approved |
| 30 | Operator questions deferred | no_blocking_questions_required |
| 31 | Credential/env boundary | boundary_enforced |
| 32 | Schema/auth/RLS/security boundary | boundary_enforced |

## 15. Required Common Fields Across All Proposal Items

Every `first_controlled_launch_recommended_test_mode_values_proposal_item` includes:

- `fixture_recommended_values_proposal_id`
- `fixture_proposal_area`
- `fixture_proposal_status`
- `fixture_proposal_type` — must be `recommended_test_mode_values_proposal`
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
node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-dry-run.sh
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

- `first_controlled_launch_recommended_test_mode_values_proposal_doc_present`
- `fake_data_local_only_scope_present`
- `proposal_only_not_activation_approved`
- `prior_scoped_approval_capture_referenced`
- `exact_scope_authorization_draft_referenced`
- `pre_activation_checklist_referenced`
- `activation_approval_not_granted`
- `final_jason_activation_approval_not_granted`
- `approved_channels_empty`
- `approved_external_services_empty`
- `proposed_values_exist_but_not_approved`
- `local_fake_channel_adapters_only_proposed`
- `no_external_services_proposed_as_approved`
- `exact_next_jason_approval_still_required_before_activation`
- `activation_command_must_be_separately_approved`
- `no_launch_or_channel_activation_allowed`
- `proposed_values_not_approved_boundary_present`
- `operator_questions_deferred_boundary_present`
- `no_credentials_env_api_webhook_production_schema_auth_rls_security_changes`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`
- `runner_outputs_valid_json`
- `proposal_items_have_common_fields`
- `proposal_items_remain_dry_run_only`
- `proposal_items_have_activation_flags_false`
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