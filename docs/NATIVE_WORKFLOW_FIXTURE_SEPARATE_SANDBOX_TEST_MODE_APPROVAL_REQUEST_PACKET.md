# Native Workflow Fixture Separate Sandbox/Test-Mode Approval Request Packet

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only separate sandbox/test-mode approval request packet** — the exact scope Jason would review before any future sandbox/test-mode activation — **without** granting sandbox/test-mode activation, live activation, or command execution.

### What this packet is

- separate future sandbox/test-mode approval request packet
- explicit scope checklist for Jason review
- no-go/stop-condition guardrails
- evidence requirements for any future activation attempt
- source-of-truth and evidence chain references
- read-only verifier input
- packet_status is `review_only`
- purpose is `separate future sandbox/test-mode approval request packet`

### What this packet is not

- This is **not** approval to activate anything.
- This packet does **not** approve sandbox/test-mode activation.
- Live activation remains **not granted**.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This does **not** add public routes, webhooks, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.

**Explicit note:** This packet does **not** approve sandbox/test-mode activation. Completing this packet does not grant any sandbox/test-mode activation approval.

**Explicit note:** Live activation remains **not granted**. No live activation approval is implied by this packet.

**Explicit note:** If approved later, approval must be **exact and scoped** — no blanket approval, no implied approval, no partial approval by category.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain:

- local-only
- fake-data-only
- read-only
- dry-run-only
- review-only

Standing local build approval allows larger local fake-data review builds like this separate sandbox/test-mode approval request packet. It does **not** by itself grant sandbox/test-mode activation approval.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | 04e0de6 |
| source_of_truth_label | test(workflow): add p3 future approval planning packet |

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
- `04e0de6` — P3 future approval planning packet

| Field | Value |
| --- | --- |
| request_status | draft_only |
| approval_status | not_granted |
| local_evidence_chain_status | passed |
| p0_blockers_count | 0 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| p3_planning_status | completed |
| current_recommended_next_step | JASON_REVIEW_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST |

### Local planning backlog completed

- P0 blockers: 0 — completed
- P1 polish: completed
- P2 refinement: completed
- P3 future approval planning: completed

## 3. Sandbox/Test-Mode Approval Request Status

| Field | Value |
| --- | --- |
| request_status | draft_only |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| purpose | separate future sandbox/test-mode approval request packet |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |
| command_execution_status | not_run_by_this_packet |

**Explicit note:** This packet does **not** approve sandbox/test-mode activation.

**Explicit note:** Live activation remains **not granted**.

**Explicit note:** If approved later, approval must be **exact and scoped**.

## 4. Required Exact Placeholders Before Any Future Approval

Before Jason can grant a separate sandbox/test-mode approval, **all** of the following must be completed explicitly — no placeholders, no TBD:

| Requirement | Status |
| --- | --- |
| exact_approval_statement_required | true |
| exact_services_required | true |
| exact_test_accounts_required | true |
| exact_environment_required | true |
| exact_command_required | true |
| exact_credentials_boundary_required | true |
| exact_external_call_boundary_required | true |
| exact_production_data_boundary_required | true |
| exact_schema_auth_rls_security_boundary_required | true |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required | true |
| exact_stop_conditions_required | true |
| rollback_owner_required | true |
| evidence_owner_required | true |
| log_path_required | true |
| approval_expiry_required | true |

### 4.1 Exact approval statement (placeholder — not granted)

| Field | Value |
| --- | --- |
| exact_approval_statement_named | false |
| exact_approval_statement_placeholder | `[JASON_EXACT_APPROVAL_STATEMENT_REQUIRED_BEFORE_APPROVAL]` |

### 4.2 Exact services to approve (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_services_named | false |
| exact_services_placeholder | `[NAMED_SERVICE_LIST_REQUIRED_BEFORE_APPROVAL]` |

### 4.3 Exact test accounts (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_test_accounts_named | false |
| exact_test_accounts_placeholder | `[NAMED_TEST_ACCOUNT_LIST_REQUIRED_BEFORE_APPROVAL]` |

### 4.4 Exact environment (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_environment_named | false |
| exact_environment_placeholder | `[NAMED_ENVIRONMENT_REQUIRED_BEFORE_APPROVAL]` |

### 4.5 Exact command (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_command_named | false |
| exact_command_placeholder | `[NAMED_EXACT_COMMAND_REQUIRED_BEFORE_APPROVAL]` |

This packet does **not** run the final activation command:

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

### 4.6 Exact credentials/env/API/webhook boundary (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_credentials_boundary_named | false |
| exact_credentials_boundary_placeholder | `[NAMED_CREDENTIALS_ENV_API_WEBHOOK_BOUNDARY_REQUIRED_BEFORE_APPROVAL]` |

### 4.7 Exact external call boundary (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_external_call_boundary_named | false |
| exact_external_call_boundary_placeholder | `[NAMED_EXTERNAL_CALL_BOUNDARY_REQUIRED_BEFORE_APPROVAL]` |

### 4.8 Exact production data boundary (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_production_data_boundary_named | false |
| exact_production_data_boundary_placeholder | `[NAMED_PRODUCTION_DATA_BOUNDARY_REQUIRED_BEFORE_APPROVAL]` |

### 4.9 Exact schema/auth/RLS/security boundary (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_schema_auth_rls_security_boundary_named | false |
| exact_schema_auth_rls_security_boundary_placeholder | `[NAMED_SCHEMA_AUTH_RLS_SECURITY_BOUNDARY_REQUIRED_BEFORE_APPROVAL]` |

### 4.10 Exact public route/webhook/scheduler/cron/dispatcher boundary (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary_named | false |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary_placeholder | `[NAMED_PUBLIC_ROUTE_WEBHOOK_SCHEDULER_CRON_DISPATCHER_BOUNDARY_REQUIRED_BEFORE_APPROVAL]` |

### 4.11 Exact stop conditions (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_stop_conditions_named | false |
| exact_stop_conditions_placeholder | `[NAMED_STOP_CONDITIONS_REQUIRED_BEFORE_APPROVAL]` |

### 4.12 Exact rollback owner (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_rollback_owner_named | false |
| exact_rollback_owner_placeholder | `[NAMED_ROLLBACK_OWNER_REQUIRED_BEFORE_APPROVAL]` |

### 4.13 Exact evidence owner (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_evidence_owner_named | false |
| exact_evidence_owner_placeholder | `[NAMED_EVIDENCE_OWNER_REQUIRED_BEFORE_APPROVAL]` |

### 4.14 Exact log path (placeholder — not named)

| Field | Value |
| --- | --- |
| exact_log_path_named | false |
| exact_log_path_placeholder | `[NAMED_LOG_PATH_REQUIRED_BEFORE_APPROVAL]` |

### 4.15 Approval expiration / one-time-use (placeholder — not named)

| Field | Value |
| --- | --- |
| approval_expiry_named | false |
| approval_expiry_placeholder | `[APPROVAL_EXPIRATION_OR_ONE_TIME_USE_REQUIRED_BEFORE_APPROVAL]` |

## 5. Current Activation Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
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

## 6. Connected Separate Sandbox/Test-Mode Approval Request Packet Artifacts

- Scope checklist: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_SCOPE_CHECKLIST.md`
- No-go and stop-condition checklist: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md`
- Evidence requirements: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EVIDENCE_REQUIREMENTS.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/separate-sandbox-test-mode-approval-request-packet.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-readonly.js`
- Dry-run wrapper: `scripts/run-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-dry-run.sh`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.