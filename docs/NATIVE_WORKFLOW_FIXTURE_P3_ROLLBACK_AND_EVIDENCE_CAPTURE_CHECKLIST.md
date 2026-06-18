# Native Workflow Fixture P3 Rollback and Evidence Capture Checklist

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only rollback and evidence capture checklist** for any future approved command execution — **without** executing any command, granting activation, or capturing live evidence.

### What this packet is

- pre-run, run, and post-run evidence capture checklist
- rollback confirmation steps
- final decision options: pass / pass with notes / hold / no-go
- read-only verifier input for P3 planning packet
- packet_status is `review_only`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation.
- This does **not** approve sandbox/test-mode activation.
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | db9ece3 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| p0_blockers_count | 0 |

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

## 3. Rollback and Evidence Capture Checklist

Use this checklist for any future separately approved command execution. All items below are checklist definitions only — none are executed by this P3 planning packet.

### Pre-Run Items

| # | Checklist item | Status |
| --- | --- | --- |
| 1 | pre-run source-of-truth check | not_run |
| 2 | pre-run clean git status | not_run |
| 3 | pre-run pilot readiness | not_run |
| 4 | pre-run safe readiness fast lane | not_run |
| 5 | pre-run backend build | not_run |

### Run Items

| # | Checklist item | Status |
| --- | --- | --- |
| 6 | exact command echo | not_run |
| 7 | log file path | not_captured |
| 8 | run timestamp | not_captured |
| 9 | service status before/after | not_captured |
| 10 | external call evidence | not_captured |
| 11 | production data evidence | not_captured |
| 12 | credential access evidence | not_captured |
| 13 | stop-condition check | not_run |
| 14 | rollback confirmation | not_run |

### Post-Run Items

| # | Checklist item | Status |
| --- | --- | --- |
| 15 | post-run pilot readiness | not_run |
| 16 | post-run safe readiness | not_run |
| 17 | post-run backend build | not_run |
| 18 | post-run source-of-truth check | not_run |
| 19 | final clean status | not_run |

### Final Decision

| # | Checklist item | Options |
| --- | --- | --- |
| 20 | decision: pass / pass with notes / hold / no-go | hold |

**Current decision for this P3 planning packet:** hold (planning only — no command executed)

## 4. Checklist Detail Definitions

### 4.1 Pre-run source-of-truth check

Verify the expected source-of-truth commit is current before any approved run. For this packet: `db9ece3`.

### 4.2 Pre-run clean git status

Confirm working tree is clean or document intentional uncommitted changes before any approved run.

### 4.3 Pre-run pilot readiness

Run pilot readiness status check; expect `demo_ready_with_live_automation_disabled`.

### 4.4 Pre-run safe readiness fast lane

Run `scripts/verify-safe-readiness-fast.sh` or equivalent fast lane before any approved run.

### 4.5 Pre-run backend build

Run `npm --prefix backend run build` before any approved run.

### 4.6 Exact command echo

Echo the exact approved command string to log before execution.

### 4.7 Log file path

Capture output to a named log file path (placeholder: `[LOG_PATH_PLACEHOLDER]`).

### 4.8 Run timestamp

Record ISO-8601 run timestamp in evidence.

### 4.9 Service status before/after

Document each named service status before and after the run.

### 4.10 External call evidence

Capture evidence of any external calls made (test-mode only if separately approved).

### 4.11 Production data evidence

Confirm no production data was read or written; capture negative evidence.

### 4.12 Credential access evidence

Confirm credentials were accessed only within approved scope; no credential values in logs.

### 4.13 Stop-condition check

Verify all stop conditions remained satisfied throughout the run.

### 4.14 Rollback confirmation

Named rollback owner confirms rollback steps completed or not needed.

### 4.15 Post-run pilot readiness

Re-run pilot readiness; confirm `demo_ready_with_live_automation_disabled` preserved.

### 4.16 Post-run safe readiness

Re-run safe readiness fast lane or full lane as specified in approval.

### 4.17 Post-run backend build

Re-run `npm --prefix backend run build` after any approved run.

### 4.18 Post-run source-of-truth check

Verify source-of-truth commit unchanged or document intentional advance.

### 4.19 Final clean status

Confirm final git status clean or document intentional changes.

### 4.20 Decision

Record one of: **pass**, **pass with notes**, **hold**, **no-go**.

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
| safety_status | demo_ready_with_live_automation_disabled |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |
| public_website_go_live_copy_changed | false |

## 6. Connected P3 Planning Packet Artifacts

- Sandbox/test-mode approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_DRAFT.md`
- Live activation approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_LIVE_ACTIVATION_APPROVAL_REQUEST_DRAFT.md`
- Exact command execution approval template: `docs/NATIVE_WORKFLOW_FIXTURE_P3_EXACT_COMMAND_EXECUTION_APPROVAL_TEMPLATE.md`
- Credential/service/environment/stop-condition matrix: `docs/NATIVE_WORKFLOW_FIXTURE_P3_CREDENTIAL_SERVICE_ENVIRONMENT_STOP_CONDITION_MATRIX.md`
- Structured P3 planning fixture: `backend/fixtures/native-workflow-demo-roofer/p3-future-approval-planning-packet.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.