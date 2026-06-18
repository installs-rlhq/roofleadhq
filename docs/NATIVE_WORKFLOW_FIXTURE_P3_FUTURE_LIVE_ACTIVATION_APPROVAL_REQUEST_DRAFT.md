# Native Workflow Fixture P3 Future Live Activation Approval Request Draft

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only future live activation approval request draft** — a request template Jason would review before any separate live activation approval — **without** granting live activation, sandbox/test-mode activation, or command execution.

### What this packet is

- future live activation approval request template only
- explicit prerequisite: successful sandbox/test-mode evidence first
- explicit pre-approval requirements checklist for live services, credentials, and production boundaries
- read-only verifier input for P3 planning packet
- packet_status is `review_only`
- purpose is `request template only`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation.
- This does **not** approve sandbox/test-mode activation.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This does **not** add public routes, webhooks, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.

**Explicit note:** This draft does **not** approve live activation. Filling this template does not grant any live activation approval.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | db9ece3 |
| source_of_truth_label | test(workflow): add local demo e2e p2 refinement batch |

### Evidence chain commits

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
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| p0_blockers_count | 0 |

## 3. Live Activation Approval Request Status

| Field | Value |
| --- | --- |
| approval_status | not_granted |
| live_activation_approval_status | not_granted |
| purpose | request template only |
| approved_for_activation_now | false |
| live_activation_allowed | false |

## 4. Prerequisite: Successful Sandbox/Test-Mode Evidence First

Before any live activation approval request can be considered, the requester must provide **successful sandbox/test-mode evidence first**.

| Field | Value |
| --- | --- |
| sandbox_test_mode_evidence_required_first | true |
| sandbox_test_mode_evidence_status | not_provided |
| prerequisite_note | must require successful sandbox/test-mode evidence first |

Required sandbox/test-mode evidence includes (at minimum):

1. Completed sandbox/test-mode run with named services and test accounts
2. Stop-condition compliance confirmation
3. Rollback confirmation from named rollback owner
4. External call evidence captured (test-mode only)
5. No production data access evidence
6. Post-run pilot readiness pass
7. Separate sandbox/test-mode approval request approved by Jason (not this draft)

## 5. Required Named Details Before Any Future Live Approval

Before Jason can consider a separate live activation approval request, **all** of the following must be named explicitly:

| Requirement | Named before approval |
| --- | --- |
| Named live services | must require named live services |
| Named credentials/env vars | must require named credentials/env vars |
| Named production data boundary | must require named production data boundary |
| Named live command | must require named live command |
| Named stop conditions | must require named stop conditions |
| Named rollback owner | must require named rollback owner |
| Named monitoring/evidence owner | must require named monitoring/evidence owner |

### 5.1 Named live services (placeholder — not named)

| Field | Value |
| --- | --- |
| named_live_services_required | true |
| named_live_services_named | false |
| named_live_services_placeholder | `[NAMED_LIVE_SERVICE_LIST_REQUIRED_BEFORE_APPROVAL]` |

### 5.2 Named credentials/env vars (placeholder — not named)

| Field | Value |
| --- | --- |
| named_credentials_env_vars_required | true |
| named_credentials_env_vars_named | false |
| named_credentials_env_vars_placeholder | `[NAMED_CREDENTIALS_ENV_VARS_REQUIRED_BEFORE_APPROVAL]` |

### 5.3 Named production data boundary (placeholder — not named)

| Field | Value |
| --- | --- |
| named_production_data_boundary_required | true |
| named_production_data_boundary_named | false |
| named_production_data_boundary_placeholder | `[NAMED_PRODUCTION_DATA_BOUNDARY_REQUIRED_BEFORE_APPROVAL]` |

### 5.4 Named live command (placeholder — not named)

| Field | Value |
| --- | --- |
| named_live_command_required | true |
| named_live_command_named | false |
| named_live_command_placeholder | `[NAMED_LIVE_COMMAND_REQUIRED_BEFORE_APPROVAL]` |

### 5.5 Named stop conditions (placeholder — not named)

| Field | Value |
| --- | --- |
| named_stop_conditions_required | true |
| named_stop_conditions_named | false |
| named_stop_conditions_placeholder | `[NAMED_STOP_CONDITIONS_REQUIRED_BEFORE_APPROVAL]` |

### 5.6 Named rollback owner (placeholder — not named)

| Field | Value |
| --- | --- |
| named_rollback_owner_required | true |
| named_rollback_owner_named | false |
| named_rollback_owner_placeholder | `[NAMED_ROLLBACK_OWNER_REQUIRED_BEFORE_APPROVAL]` |

### 5.7 Named monitoring/evidence owner (placeholder — not named)

| Field | Value |
| --- | --- |
| named_monitoring_evidence_owner_required | true |
| named_monitoring_evidence_owner_named | false |
| named_monitoring_evidence_owner_placeholder | `[NAMED_MONITORING_EVIDENCE_OWNER_REQUIRED_BEFORE_APPROVAL]` |

## 6. Current Activation Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
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

## 7. Connected P3 Planning Packet Artifacts

- Sandbox/test-mode approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_DRAFT.md`
- Exact command execution approval template: `docs/NATIVE_WORKFLOW_FIXTURE_P3_EXACT_COMMAND_EXECUTION_APPROVAL_TEMPLATE.md`
- Credential/service/environment/stop-condition matrix: `docs/NATIVE_WORKFLOW_FIXTURE_P3_CREDENTIAL_SERVICE_ENVIRONMENT_STOP_CONDITION_MATRIX.md`
- Rollback and evidence capture checklist: `docs/NATIVE_WORKFLOW_FIXTURE_P3_ROLLBACK_AND_EVIDENCE_CAPTURE_CHECKLIST.md`
- Structured P3 planning fixture: `backend/fixtures/native-workflow-demo-roofer/p3-future-approval-planning-packet.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.