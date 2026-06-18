# Native Workflow Fixture Demo Roofer Local E2E Operator Runbook

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only operator runbook** that guides Jason and the operator through a structured local fake-data demo roofer E2E review using committed fixtures, scenario review runner output, E2E evidence report output, pilot readiness status, safe readiness fast lane, and backend build checks.

### What this packet is

- local fake-data demo roofer E2E operator runbook
- operator-facing step-by-step local review guide
- required pre-run state checklist
- required fake fixture inventory
- exact local review commands
- operator checklist steps
- stop conditions
- pass/fail evidence capture requirements
- read-only verifier
- dry-run wrapper using verifier + backend build only
- **demo roofer local E2E operator runbook review-only** — guides local fake-data review without granting activation or command execution approval
- packet type is `demo_roofer_local_e2e_operator_runbook_review_only`

### What this packet is not

- This is **not** approval to activate anything.
- This is **not** approval to approve live activation.
- This does **not** approve live activation.
- This is **not** approval to approve sandbox/test-mode activation.
- This does **not** approve sandbox/test-mode activation.
- This is **not** approval to approve external services.
- This does **not** approve external services.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This is **not** schema, auth, RLS, or security work.
- This does **not** add public routes, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** implement external service integration behavior.
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.
- This does **not** run any approved local fake-data dry-run command.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, Jason and the operator have a structured operator runbook for reviewing the demo roofer local E2E flow — without activation approval, command execution approval, external calls, credentials, production data access, or schema/auth/RLS/security changes.

### Connected launch packets

This operator runbook builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md` (`17abae0`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md` (`cf566ae`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EXECUTION_READINESS_PACKET.md` (`cf566ae`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_SCENARIO_REVIEW_RUNNER.md` (`728ad03`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EVIDENCE_REPORT.md` (`401bfc7`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md`

Fixture directory:

- `backend/fixtures/native-workflow-demo-roofer/demo-roofer-profile.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-homeowner-leads.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-e2e-scenarios.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-expected-outcomes.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-operator-checklist.json`
- `backend/fixtures/native-workflow-demo-roofer/post-run-evidence-capture.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-scenario-review-expected-summary.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-e2e-evidence-report-summary.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-go-no-go-gate.json`

Operator runbook, verifier, and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OPERATOR_RUNBOOK.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md`
- `backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-readonly.js`
- `scripts/run-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-dry-run.sh`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this packet: `401bfc7 test(workflow): add demo roofer e2e evidence report`

- demo roofer local E2E test bundle exists from 17abae0
- post-run evidence and demo E2E readiness exists from cf566ae
- demo roofer scenario review runner exists from 728ad03
- demo roofer E2E evidence report exists from 401bfc7
- scenario runner passed 25/25 fake scenarios
- expected outcomes matched 25/25
- evidence conclusion is PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT
- pilot readiness remains demo_ready_with_live_automation_disabled

## 2. Required Pre-Run State

Before starting the local demo roofer E2E operator review, confirm:

| Check | Requirement |
| --- | --- |
| HEAD == origin/main | Repository HEAD matches origin/main |
| git status blank | Working tree is clean (no uncommitted changes) |
| pilot readiness summary | `demo_ready_with_live_automation_disabled` |
| safe readiness fast lane | `bash scripts/verify-safe-readiness-fast.sh` passes |
| backend build | `npm --prefix backend run build` passes |

### Pre-run state summary

- Confirm HEAD == origin/main before review.
- Confirm git status is blank before review.
- Confirm pilot readiness summary is `demo_ready_with_live_automation_disabled`.
- Confirm safe readiness fast lane passes.
- Confirm backend build passes.
- Activation approval is not granted.
- Activation command approval is not granted.
- Final Jason activation approval is not granted.
- `approved_for_activation_now` is `false`.
- `approved_channels` is `[]`.
- `approved_external_services` is `[]`.

## 3. Required Fake Fixtures

All review work uses committed fake-data fixtures only:

| Fixture | Path | Count / Status |
| --- | --- | --- |
| demo roofer profile | `backend/fixtures/native-workflow-demo-roofer/demo-roofer-profile.json` | Summit Peak Roofing Demo LLC (fake) |
| fake homeowner leads | `backend/fixtures/native-workflow-demo-roofer/demo-homeowner-leads.json` | 25 fake leads |
| demo E2E scenarios | `backend/fixtures/native-workflow-demo-roofer/demo-e2e-scenarios.json` | 25 scenarios |
| expected outcomes | `backend/fixtures/native-workflow-demo-roofer/demo-expected-outcomes.json` | 25 expected outcomes |
| operator checklist | `backend/fixtures/native-workflow-demo-roofer/demo-operator-checklist.json` | committed checklist |
| post-run evidence capture | `backend/fixtures/native-workflow-demo-roofer/post-run-evidence-capture.json` | committed evidence template |
| scenario review expected summary | `backend/fixtures/native-workflow-demo-roofer/demo-scenario-review-expected-summary.json` | committed summary |
| E2E evidence report summary | `backend/fixtures/native-workflow-demo-roofer/demo-e2e-evidence-report-summary.json` | committed summary |
| go/no-go evidence gate | `backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-go-no-go-gate.json` | committed gate fixture |

## 4. Exact Local Review Commands

Run these commands in order during the local demo roofer E2E operator review:

### Step 1: Scenario review runner

```bash
node backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js
```

### Step 2: E2E evidence report generator

```bash
node backend/scripts/generate-native-workflow-fixture-demo-roofer-e2e-evidence-report.js
```

### Step 3: E2E evidence report dry-run wrapper

```bash
bash scripts/run-native-workflow-fixture-demo-roofer-e2e-evidence-report-dry-run.sh
```

### Step 4: Pilot readiness status

```bash
node backend/scripts/show-pilot-readiness-status.js
```

### Step 5: Safe readiness fast lane

```bash
bash scripts/verify-safe-readiness-fast.sh
```

### Step 6: Backend build

```bash
npm --prefix backend run build
```

## 5. Operator Checklist Steps

1. Confirm HEAD == origin/main and git status is blank.
2. Confirm pilot readiness summary is `demo_ready_with_live_automation_disabled`.
3. Confirm all required fake fixtures exist and use obviously fake demo data.
4. Run the scenario review runner and confirm 25/25 scenarios pass.
5. Run the E2E evidence report generator and confirm evidence conclusion PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT.
6. Run the E2E evidence report dry-run wrapper and confirm it passes.
7. Run pilot readiness status and confirm `demo_ready_with_live_automation_disabled`.
8. Run safe readiness fast lane and confirm it passes.
9. Run backend build and confirm it passes.
10. Review the go/no-go evidence gate doc and structured gate fixture.
11. Confirm no external calls, credentials, production data, or schema/auth/RLS/security changes occurred.
12. Confirm activation approval remains not granted.
13. Confirm this runbook does not run the final activation command.
14. Capture pass/fail evidence per section 7.
15. After any future local demo E2E run, complete post-run review/evidence capture per the post-run review template.

## 6. Stop Conditions

Stop the operator review immediately if any of the following occur:

- Any attempted external call
- Any credential/env/API/webhook access
- Any production Supabase data access
- Any schema/auth/RLS/security change
- Any scheduler/cron/dispatcher/public route/webhook activation
- Any billing/payment/deposit/invoice/quote/estimate automation
- Any live SMS/Twilio/Vapi/Resend/Google Calendar/Lindy/CRM/live CSV behavior
- Any real homeowner or roofer data encountered
- Any failed verifier, wrapper, build, or safety check
- Any activation approval implied by artifact
- Any final activation command execution
- Pilot readiness summary is not `demo_ready_with_live_automation_disabled`
- Scenario review runner reports missing or unexpected outcomes
- E2E evidence report conclusion is not PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT

## 7. Pass/Fail Evidence Capture Requirements

### Pass evidence requirements

Capture the following when the local demo roofer E2E operator review passes:

- scenario review runner JSON output showing 25/25 matched outcomes
- E2E evidence report generator JSON output with evidence_conclusion PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT
- E2E evidence report dry-run wrapper PASS output
- pilot readiness status showing `demo_ready_with_live_automation_disabled`
- safe readiness fast lane PASS output
- backend build PASS output
- go/no-go gate fixture showing `current_recommended_decision: GO_LOCAL_DEMO_E2E_REVIEW_ONLY`
- confirmation that activation_approval_status remains `not_granted`
- confirmation that command_execution_status remains `not_run_by_this_gate`
- confirmation that approved_for_activation_now remains `false`

### Fail evidence requirements

Capture the following when the local demo roofer E2E operator review fails:

- exact command that failed
- exact error output
- which stop condition triggered
- whether any external call, credential access, production data access, or schema/auth/RLS/security change was attempted
- whether any activation approval was implied
- whether the final activation command was executed (must be no)

## 8. Post-Run Review Requirement

After any future local demo E2E run, the operator must complete post-run review and evidence capture using:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md`
- `backend/fixtures/native-workflow-demo-roofer/post-run-evidence-capture.json`

This operator runbook does not substitute for post-run review after a future live local demo E2E execution.

## 9. Safety Reminders

| Reminder | Status |
| --- | --- |
| This does not run the final activation command | enforced |
| This does not approve live activation | enforced |
| This does not approve sandbox/test-mode activation | enforced |
| This does not approve external services | enforced |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_gate |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| safety_posture | demo_ready_with_live_automation_disabled |
| public_website_go_live_copy_changed | false |

### Delivery posture

| Field | Value |
| --- | --- |
| delivery_mode | local-only |
| data_mode | fake-data-only |
| access_mode | read-only |
| execution_mode | dry-run-only |
| review_mode | review-only |

### Old 90-day plan boundary

The old 90-day plan cannot override current source-of-truth direction. Any old-plan review must be a later narrow reconciliation audit only and must not override the current launch safety posture.

## 10. Related Go/No-Go Evidence Gate

After completing this operator runbook review, proceed to the go/no-go evidence gate:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md`
- `backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-go-no-go-gate.json`

The go/no-go gate provides explicit GO / NO-GO / HOLD decision options for local demo E2E review only. It does not grant activation approval or run the final activation command.