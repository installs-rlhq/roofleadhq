# Native Workflow Fixture P3 Exact Command Execution Approval Template

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only exact command execution approval template** — the formal structure Jason would sign before any separate command execution approval — **without** approving any command, granting activation, or executing any step.

### What this packet is

- exact command execution approval template only
- placeholder fields for command, working directory, environment, and side effects
- pre-run and post-run checklists
- stop conditions and rollback steps
- Jason approval signature/date placeholder
- read-only verifier input for P3 planning packet
- packet_status is `review_only`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation.
- This does **not** approve sandbox/test-mode activation.
- **No command is approved by this template.**
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.

**Explicit note:** No command is approved by this template. Filling placeholders does not grant command execution approval.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | db9ece3 |

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

## 3. Command Approval Status

| Field | Value |
| --- | --- |
| command_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |

## 4. Command Execution Fields (placeholders only)

| Field | Placeholder |
| --- | --- |
| command text | `[COMMAND_TEXT_PLACEHOLDER]` |
| working directory | `[WORKING_DIRECTORY_PLACEHOLDER]` |
| environment | `[ENVIRONMENT_PLACEHOLDER]` |
| allowed side effects | `[ALLOWED_SIDE_EFFECTS_PLACEHOLDER]` |
| forbidden side effects | `[FORBIDDEN_SIDE_EFFECTS_PLACEHOLDER]` |
| log path | `[LOG_PATH_PLACEHOLDER]` |

### 4.1 Command text placeholder

```bash
[COMMAND_TEXT_PLACEHOLDER]
```

### 4.2 Working directory placeholder

```
[WORKING_DIRECTORY_PLACEHOLDER]
```

### 4.3 Environment placeholder

```
[ENVIRONMENT_PLACEHOLDER]
```

### 4.4 Allowed side effects placeholder

```
[ALLOWED_SIDE_EFFECTS_PLACEHOLDER]
```

### 4.5 Forbidden side effects placeholder

```
[FORBIDDEN_SIDE_EFFECTS_PLACEHOLDER]
```

Forbidden side effects always include (non-exhaustive):

- production Supabase reads/writes
- live SMS/email/call sends
- CRM sync
- billing/payment/quote/estimate/invoice automation
- public route/webhook/scheduler/cron/dispatcher activation
- schema/auth/RLS/security changes
- public go-live or production copy changes

## 5. Pre-Run Checks

All pre-run checks must pass before any approved command execution (none approved by this template):

| # | Pre-run check | Status |
| --- | --- | --- |
| 1 | Source-of-truth commit verified | not_confirmed |
| 2 | Clean git status | not_confirmed |
| 3 | Pilot readiness pass | not_confirmed |
| 4 | Safe readiness fast lane pass | not_confirmed |
| 5 | Backend build pass | not_confirmed |
| 6 | Named services confirmed | not_confirmed |
| 7 | Named environment confirmed | not_confirmed |
| 8 | Named stop conditions confirmed | not_confirmed |
| 9 | Named rollback owner confirmed | not_confirmed |
| 10 | Jason explicit command approval recorded | not_granted |

## 6. Post-Run Checks

| # | Post-run check | Status |
| --- | --- | --- |
| 1 | Log file captured at log path | not_confirmed |
| 2 | Stop conditions checked | not_confirmed |
| 3 | Rollback confirmation recorded | not_confirmed |
| 4 | Post-run pilot readiness pass | not_confirmed |
| 5 | Post-run safe readiness pass | not_confirmed |
| 6 | Post-run backend build pass | not_confirmed |
| 7 | Post-run source-of-truth check | not_confirmed |
| 8 | Final clean git status | not_confirmed |

## 7. Stop Conditions

| # | Stop condition | Status |
| --- | --- | --- |
| 1 | Any external call to non-approved service | halt_immediately |
| 2 | Any production data read/write | halt_immediately |
| 3 | Any credential/env access beyond approved scope | halt_immediately |
| 4 | Any schema/auth/RLS/security change | halt_immediately |
| 5 | Any billing/payment/quote/estimate/invoice action | halt_immediately |
| 6 | Any public route/webhook/scheduler/cron/dispatcher activation | halt_immediately |
| 7 | Operator abort signal from named rollback owner | halt_immediately |
| 8 | Unexpected error or non-zero exit | halt_and_review |

## 8. Rollback Steps

| # | Rollback step | Owner |
| --- | --- | --- |
| 1 | Halt command execution immediately | named rollback owner |
| 2 | Capture log file at log path | named rollback owner |
| 3 | Revert any test-mode side effects within approved scope | named rollback owner |
| 4 | Confirm no production data touched | named rollback owner |
| 5 | Confirm no credential leakage in logs | named rollback owner |
| 6 | Run post-run pilot readiness | named rollback owner |
| 7 | Document rollback confirmation | named rollback owner |
| 8 | Escalate to Jason for hold/no-go decision | named rollback owner |

## 9. Jason Approval Signature/Date Placeholder

| Field | Value |
| --- | --- |
| jason_approval_signature | `[JASON_APPROVAL_SIGNATURE_PLACEHOLDER]` |
| jason_approval_date | `[JASON_APPROVAL_DATE_PLACEHOLDER]` |
| jason_command_approval_status | not_granted |

Jason must explicitly sign and date a **separate** command execution approval record with all placeholders filled before any command is approved for execution.

## 10. Current Activation Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |
| public_website_go_live_copy_changed | false |

## 11. Connected P3 Planning Packet Artifacts

- Sandbox/test-mode approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_DRAFT.md`
- Live activation approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_LIVE_ACTIVATION_APPROVAL_REQUEST_DRAFT.md`
- Credential/service/environment/stop-condition matrix: `docs/NATIVE_WORKFLOW_FIXTURE_P3_CREDENTIAL_SERVICE_ENVIRONMENT_STOP_CONDITION_MATRIX.md`
- Rollback and evidence capture checklist: `docs/NATIVE_WORKFLOW_FIXTURE_P3_ROLLBACK_AND_EVIDENCE_CAPTURE_CHECKLIST.md`
- Structured P3 planning fixture: `backend/fixtures/native-workflow-demo-roofer/p3-future-approval-planning-packet.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.