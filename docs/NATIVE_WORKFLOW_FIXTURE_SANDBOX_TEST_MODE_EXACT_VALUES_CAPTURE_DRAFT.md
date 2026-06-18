# Native Workflow Fixture Sandbox/Test-Mode Exact Values Capture Draft

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only sandbox/test-mode exact values capture draft** — the structured worksheet Jason must complete with named exact values before any future sandbox/test-mode activation can be considered — **without** granting sandbox/test-mode activation, live activation, or command execution.

### What this packet is

- sandbox/test-mode exact values capture draft only
- structured capture of 19 exact values (all blank by default)
- exact values worksheet and completeness review companion docs
- source-of-truth and evidence chain references from commit `ae9154b`
- read-only verifier input
- packet_status is `review_only`
- capture_status is `blank_draft_only`
- purpose is `sandbox/test-mode exact values capture draft`

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

**Explicit note:** Blank placeholders are **not** approval. Leaving any exact value blank does not grant sandbox/test-mode activation, live activation, or command execution.

**Explicit note:** "All approved" is **insufficient** for execution without exact values. Category-level or blanket approval cannot substitute for all 19 named exact values.

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

Standing local build approval allows larger local fake-data review builds like this exact values capture draft. It does **not** by itself grant sandbox/test-mode activation approval.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | ae9154b |
| source_of_truth_label | test(workflow): add separate sandbox test mode approval request |

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
- `ae9154b` — separate sandbox/test-mode approval request packet

| Field | Value |
| --- | --- |
| capture_status | blank_draft_only |
| approval_status | not_granted |
| local_evidence_chain_status | passed |
| p0_blockers_count | 0 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| p3_planning_status | completed |
| current_recommended_next_step | JASON_REVIEW_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT |

### Local planning backlog completed

- P0 blockers: 0 — completed
- P1 polish: completed
- P2 refinement: completed
- P3 future approval planning: completed
- Separate sandbox/test-mode approval request: completed (`ae9154b`)

## 3. Sandbox/Test-Mode Exact Values Capture Status

| Field | Value |
| --- | --- |
| capture_status | blank_draft_only |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| purpose | sandbox/test-mode exact values capture draft |
| exact_values_required_count | 19 |
| exact_values_filled_count | 0 |
| all_exact_values_filled | false |
| blank_placeholders_are_not_approval | true |
| all_approved_insufficient_without_exact_values | true |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |
| command_execution_status | not_run_by_this_packet |

**Explicit note:** Blank placeholders are **not** approval.

**Explicit note:** "All approved" is **insufficient** for execution without exact values.

**Explicit note:** This packet does **not** approve sandbox/test-mode activation.

**Explicit note:** Live activation remains **not granted**.

**Explicit note:** If approved later, approval must be **exact and scoped**.

## 4. Required Exact Values (all blank by default)

Before Jason can grant a separate sandbox/test-mode approval, **all 19** of the following must be completed explicitly — no blanks, no TBD, no placeholders:

| # | Requirement | Status |
| --- | --- | --- |
| 1 | exact_services_required | true |
| 2 | exact_test_accounts_required | true |
| 3 | exact_environment_required | true |
| 4 | exact_command_required | true |
| 5 | exact_working_directory_required | true |
| 6 | exact_credentials_env_api_webhook_boundary_required | true |
| 7 | exact_external_call_boundary_required | true |
| 8 | exact_production_data_boundary_required | true |
| 9 | exact_schema_auth_rls_security_boundary_required | true |
| 10 | exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required | true |
| 11 | exact_messaging_contact_permission_boundary_required | true |
| 12 | exact_calendar_appointment_boundary_required | true |
| 13 | exact_reporting_csv_boundary_required | true |
| 14 | exact_stop_conditions_required | true |
| 15 | exact_rollback_owner_required | true |
| 16 | exact_evidence_owner_required | true |
| 17 | exact_log_path_required | true |
| 18 | exact_approval_expiration_required | true |
| 19 | exact_one_time_use_limitation_required | true |

### 4.1 Exact services (blank — not named)

| Field | Value |
| --- | --- |
| exact_services_filled | false |
| exact_services |  |

### 4.2 Exact test accounts (blank — not named)

| Field | Value |
| --- | --- |
| exact_test_accounts_filled | false |
| exact_test_accounts |  |

### 4.3 Exact environment (blank — not named)

| Field | Value |
| --- | --- |
| exact_environment_filled | false |
| exact_environment |  |

### 4.4 Exact command (blank — not named)

| Field | Value |
| --- | --- |
| exact_command_filled | false |
| exact_command |  |

This packet does **not** run the final activation command:

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

### 4.5 Exact working directory (blank — not named)

| Field | Value |
| --- | --- |
| exact_working_directory_filled | false |
| exact_working_directory |  |

### 4.6 Exact credentials/env/API/webhook boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_credentials_env_api_webhook_boundary_filled | false |
| exact_credentials_env_api_webhook_boundary |  |

### 4.7 Exact external call boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_external_call_boundary_filled | false |
| exact_external_call_boundary |  |

### 4.8 Exact production data boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_production_data_boundary_filled | false |
| exact_production_data_boundary |  |

### 4.9 Exact schema/auth/RLS/security boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_schema_auth_rls_security_boundary_filled | false |
| exact_schema_auth_rls_security_boundary |  |

### 4.10 Exact public route/webhook/scheduler/cron/dispatcher boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary_filled | false |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary |  |

### 4.11 Exact messaging/contact permission boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_messaging_contact_permission_boundary_filled | false |
| exact_messaging_contact_permission_boundary |  |

### 4.12 Exact calendar/appointment boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_calendar_appointment_boundary_filled | false |
| exact_calendar_appointment_boundary |  |

### 4.13 Exact reporting/CSV boundary (blank — not named)

| Field | Value |
| --- | --- |
| exact_reporting_csv_boundary_filled | false |
| exact_reporting_csv_boundary |  |

### 4.14 Exact stop conditions (blank — not named)

| Field | Value |
| --- | --- |
| exact_stop_conditions_filled | false |
| exact_stop_conditions |  |

### 4.15 Exact rollback owner (blank — not named)

| Field | Value |
| --- | --- |
| exact_rollback_owner_filled | false |
| exact_rollback_owner |  |

### 4.16 Exact evidence owner (blank — not named)

| Field | Value |
| --- | --- |
| exact_evidence_owner_filled | false |
| exact_evidence_owner |  |

### 4.17 Exact log path (blank — not named)

| Field | Value |
| --- | --- |
| exact_log_path_filled | false |
| exact_log_path |  |

### 4.18 Exact approval expiration (blank — not named)

| Field | Value |
| --- | --- |
| exact_approval_expiration_filled | false |
| exact_approval_expiration |  |

### 4.19 Exact one-time-use limitation (blank — not named)

| Field | Value |
| --- | --- |
| exact_one_time_use_limitation_filled | false |
| exact_one_time_use_limitation |  |

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

## 6. Connected Prior Packet

This exact values capture draft builds on the separate sandbox/test-mode approval request packet (`ae9154b`):

- Approval request: `docs/NATIVE_WORKFLOW_FIXTURE_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_PACKET.md`
- Scope checklist: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_SCOPE_CHECKLIST.md`
- No-go and stop-condition checklist: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md`
- Evidence requirements: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EVIDENCE_REQUIREMENTS.md`

## 7. Connected Exact Values Capture Draft Artifacts

- Exact values worksheet: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_WORKSHEET.md`
- Exact values completeness review: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_COMPLETENESS_REVIEW.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-capture-draft.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-readonly.js`
- Dry-run wrapper: `scripts/run-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-dry-run.sh`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.