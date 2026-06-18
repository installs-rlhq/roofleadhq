# Native Workflow Fixture P3 Future Sandbox/Test-Mode Approval Request Draft

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only future sandbox/test-mode approval request draft** — a request template Jason would review before any separate sandbox/test-mode activation approval — **without** granting sandbox/test-mode activation, live activation, or command execution.

### What this packet is

- future sandbox/test-mode approval request template only
- explicit pre-approval requirements checklist
- source-of-truth and evidence chain references
- read-only verifier input for P3 planning packet
- packet_status is `review_only`
- purpose is `request template only`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve sandbox/test-mode activation.
- This does **not** approve live activation.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This does **not** add public routes, webhooks, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain:

- local-only
- fake-data-only
- read-only
- dry-run-only
- review-only

| Field | Value |
| --- | --- |
| standing_local_build_approval_recorded | true |
| standing_local_build_approval_scope | local-only fake-data read-only dry-run review-only larger batches |

Standing local build approval allows larger local fake-data review builds like this P3 planning packet. It does **not** by itself grant sandbox/test-mode activation approval.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | db9ece3 |
| source_of_truth_label | test(workflow): add local demo e2e p2 refinement batch |

### Evidence chain commits (all must remain referenced)

- `17abae0` — demo roofer local E2E test bundle
- `cf566ae` — post-run evidence and demo E2E readiness
- `728ad03` — demo roofer scenario review runner
- `401bfc7` — demo roofer E2E evidence report
- `edceb29` — demo roofer local E2E operator gate
- `df388f4` — local demo E2E run evidence capture
- `3800512` — final local demo E2E readiness decision
- `c6df554` — demo roofer E2E walkthrough triage
- `f752452` — demo roofer walkthrough observation evidence capture
- `0d7ae0d` — local demo E2E master review backlog boundary
- `5ef9ef5` — local demo E2E P1 polish batch
- `db9ece3` — local demo E2E P2 refinement batch

| Field | Value |
| --- | --- |
| p3_planning_status | completed |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| p0_blockers_count | 0 |
| current_recommended_next_step | HOLD_FOR_JASON_REVIEW_OR_PREPARE_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST |

### P3 items completed

- future_sandbox_test_mode_approval_request_draft
- future_live_activation_approval_request_draft
- exact_command_execution_approval_template
- credential_service_environment_stop_condition_matrix
- rollback_and_evidence_capture_checklist

## 3. Sandbox/Test-Mode Approval Request Status

| Field | Value |
| --- | --- |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| purpose | request template only |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |

**Explicit note:** This draft does **not** approve sandbox/test-mode activation. Filling this template does not grant any sandbox/test-mode activation approval.

## 4. Required Named Details Before Any Future Approval

Before Jason can consider a separate sandbox/test-mode approval request, **all** of the following must be named explicitly in the request — no placeholders, no TBD:

| Requirement | Named before approval |
| --- | --- |
| Exact services | must be named before approval |
| Exact test accounts | must be named before approval |
| Exact environment | must be named before approval |
| Exact command | must be named before approval |
| Exact stop conditions | must be named before approval |
| Exact rollback owner | must be named before approval |
| Exact evidence required | must be named before approval |

### 4.1 Exact services (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_services_named | false |
| exact_services_placeholder | `[NAMED_SERVICE_LIST_REQUIRED_BEFORE_APPROVAL]` |

### 4.2 Exact test accounts (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_test_accounts_named | false |
| exact_test_accounts_placeholder | `[NAMED_TEST_ACCOUNT_LIST_REQUIRED_BEFORE_APPROVAL]` |

### 4.3 Exact environment (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_environment_named | false |
| exact_environment_placeholder | `[NAMED_ENVIRONMENT_REQUIRED_BEFORE_APPROVAL]` |

### 4.4 Exact command (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_command_named | false |
| exact_command_placeholder | `[NAMED_EXACT_COMMAND_REQUIRED_BEFORE_APPROVAL]` |

This packet does **not** run the final activation command:

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

### 4.5 Exact stop conditions (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_stop_conditions_named | false |
| exact_stop_conditions_placeholder | `[NAMED_STOP_CONDITIONS_REQUIRED_BEFORE_APPROVAL]` |

### 4.6 Exact rollback owner (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_rollback_owner_named | false |
| exact_rollback_owner_placeholder | `[NAMED_ROLLBACK_OWNER_REQUIRED_BEFORE_APPROVAL]` |

### 4.7 Exact evidence required (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_evidence_required_named | false |
| exact_evidence_required_placeholder | `[NAMED_EVIDENCE_REQUIREMENTS_REQUIRED_BEFORE_APPROVAL]` |

## 5. Current Activation Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| live_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| real_demo_sandbox_live_testing_allowed | false |
| public_website_go_live_copy_changed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |

## 6. Connected P3 Planning Packet Artifacts

- Live activation request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_LIVE_ACTIVATION_APPROVAL_REQUEST_DRAFT.md`
- Exact command execution approval template: `docs/NATIVE_WORKFLOW_FIXTURE_P3_EXACT_COMMAND_EXECUTION_APPROVAL_TEMPLATE.md`
- Credential/service/environment/stop-condition matrix: `docs/NATIVE_WORKFLOW_FIXTURE_P3_CREDENTIAL_SERVICE_ENVIRONMENT_STOP_CONDITION_MATRIX.md`
- Rollback and evidence capture checklist: `docs/NATIVE_WORKFLOW_FIXTURE_P3_ROLLBACK_AND_EVIDENCE_CAPTURE_CHECKLIST.md`
- Structured P3 planning fixture: `backend/fixtures/native-workflow-demo-roofer/p3-future-approval-planning-packet.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-p3-future-approval-planning-packet-readonly.js`
- Dry-run wrapper: `scripts/run-native-workflow-fixture-p3-future-approval-planning-packet-dry-run.sh`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.