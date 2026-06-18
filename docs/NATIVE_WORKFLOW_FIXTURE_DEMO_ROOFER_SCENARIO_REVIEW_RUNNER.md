# Native Workflow Fixture Demo Roofer Scenario Review Runner

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only demo roofer scenario review runner** that reads committed demo roofer fixtures, walks all 25 demo roofer E2E scenarios against the 25 expected outcomes, prints a structured review summary, and verifies that all scenario outcomes remain local-only, fake-data-only, read-only, dry-run-only, review-only.

### What this packet is

- local fake-data scenario review runner
- read-only fixture validation across demo roofer profile, fake leads, scenarios, expected outcomes, operator checklist, and post-run evidence
- structured JSON review summary to stdout
- optional static expected summary fixture for verification
- read-only verifier
- dry-run wrapper using runner + verifier + backend build only
- **demo roofer scenario review runner review-only** — reviews fake-data scenarios without granting activation or command execution approval
- packet type is `demo_roofer_scenario_review_runner_review_only`

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

After this packet passes its read-only verifier and dry-run wrapper, Jason and the operator have a completed local fake-data scenario review across all 25 demo roofer E2E scenarios — without activation approval, command execution approval, external calls, credentials, production data access, or schema/auth/RLS/security changes.

### Connected launch packets

This runner builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md` (`17abae0`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md` (`cf566ae`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EXECUTION_READINESS_PACKET.md` (`cf566ae`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md`

Fixture directory:

- `backend/fixtures/native-workflow-demo-roofer/demo-roofer-profile.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-homeowner-leads.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-e2e-scenarios.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-expected-outcomes.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-operator-checklist.json`
- `backend/fixtures/native-workflow-demo-roofer/post-run-evidence-capture.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-scenario-review-expected-summary.json`

Runner and verifier references:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_SCENARIO_REVIEW_RUNNER.md`
- `backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js`
- `scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner-dry-run.sh`
- `backend/scripts/verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this packet: `cf566ae test(workflow): add post run evidence and demo e2e readiness`

- demo roofer E2E bundle exists from 17abae0
- post-run evidence and demo E2E readiness exists from cf566ae

## 2. Current State

| Field | Value |
| --- | --- |
| latest_source_of_truth_commit | cf566ae |
| demo_roofer_bundle_commit | 17abae0 |
| post_run_evidence_readiness_commit | cf566ae |
| local_dry_run_post_run_evidence_status | complete |
| local_dry_run_decision | PASS LOCAL DRY-RUN REVIEW |
| demo_roofer_bundle_status | complete |
| fake_homeowner_lead_count | 25 |
| e2e_scenario_count | 25 |
| expected_outcome_count | 25 |
| fake_company_name | Summit Peak Roofing Demo LLC |
| company_name_is_fake | true |
| command_execution_status | not_run_by_this_runner |
| activation_approval_status | not_granted |
| activation_command_approval_status | not_granted |
| final_jason_activation_approval | not_granted |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| safety_posture | demo_ready_with_live_automation_disabled |
| final_decision | PASS LOCAL DEMO ROOFER SCENARIO REVIEW |
| packet_delivery_mode | review_only |
| packet_external_call_allowed | false |
| packet_live_activation_allowed | false |
| packet_test_mode_activation_allowed | false |
| packet_command_execution_allowed | false |
| public_website_go_live_copy_changed | false |

### Current state summary

- Latest source-of-truth commit before this packet is `cf566ae`.
- Demo roofer fixture bundle was committed in `17abae0`.
- Post-run evidence and demo E2E readiness was committed in `cf566ae`.
- Terminal 1 local dry-run completed with decision **PASS LOCAL DRY-RUN REVIEW**.
- This runner reviews all 25 E2E scenarios against 25 expected outcomes.
- Summit Peak Roofing Demo LLC is obviously fake.
- Activation approval is not granted.
- Activation command approval is not granted.
- Final Jason activation approval is not granted.
- `approved_for_activation_now` is `false`.
- `approved_channels` is `[]`.
- `approved_external_services` is `[]`.
- Safety remains `demo_ready_with_live_automation_disabled`.
- Command execution status in this packet is `not_run_by_this_runner`.

## 3. Scenario Review Runner

The runner reads all committed demo roofer fixtures and validates:

- exactly 25 fake homeowner leads
- exactly 25 E2E scenarios
- exactly 25 expected outcomes
- Summit Peak Roofing Demo LLC is fake
- every scenario has a matching expected outcome
- every expected outcome maps to a scenario
- every scenario remains local-only/fake-data-only/review-only
- no scenario approves activation
- no scenario approves command execution
- no scenario triggers external services
- no scenario uses real homeowner or roofer data
- no credential/env/API/webhook references exist
- no production Supabase path exists
- no schema/auth/RLS/security migration is required
- stop-condition scenarios remain blocked
- unsupported automation scenarios remain blocked
- human escalation routes to roofer for judgment
- Jason/RoofLeadHQ escalation is limited to ambiguity, bad data, quality-control issue, broken routing, or system review

The runner prints a structured JSON summary to stdout. It does not write runtime files, mutate fixtures, make network calls, or call external services.

### Runner summary fields

| Field | Description |
| --- | --- |
| runner_name | native_workflow_fixture_demo_roofer_scenario_review_runner |
| source_of_truth_commit | cf566ae |
| demo_roofer_name | Summit Peak Roofing Demo LLC |
| fake_lead_count | 25 |
| scenario_count | 25 |
| expected_outcome_count | 25 |
| matched_expected_outcomes | 25 |
| missing_expected_outcomes | [] |
| unexpected_expected_outcomes | [] |
| blocked_external_service_scenarios | external service block scenario IDs |
| blocked_unsupported_automation_scenarios | unsupported automation block scenario IDs |
| review_queue_scenarios | scenarios requiring review queue |
| human_escalation_scenarios | human escalation scenario IDs |
| post_inspection_scenarios | post-inspection scenario IDs |
| feedback_permission_scenarios | feedback permission scenario IDs |
| safety_status | demo_ready_with_live_automation_disabled |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_runner |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| final_decision | PASS LOCAL DEMO ROOFER SCENARIO REVIEW |

## 4. Activation and External Service Blockers (Remain Intact)

| Blocker | Status |
| --- | --- |
| live activation | blocked |
| sandbox/test-mode activation | blocked |
| sandbox/test-mode services | blocked |
| external calls | blocked |
| credentials/env/API/webhook access | blocked |
| production Supabase data | blocked |
| schema/auth/RLS/security changes | blocked |
| public routes/webhooks | blocked |
| scheduler/cron/dispatcher | blocked |
| billing/payment/deposit/invoice/quote/estimate automation | blocked |
| Twilio | blocked |
| Vapi | blocked |
| Resend | blocked |
| Google Calendar | blocked |
| Lindy | blocked |
| CRM sync | blocked |
| live CSV delivery | blocked |

## 5. Delivery and Execution Posture

| Field | Value |
| --- | --- |
| delivery_mode | local-only |
| data_mode | fake-data-only |
| access_mode | read-only |
| execution_mode | dry-run-only |
| review_mode | review-only |

## 6. Forbidden Actions

This packet must not:

- activate anything
- approve activation
- approve live activation
- approve sandbox/test-mode activation
- make external calls
- access credentials/env/API/webhooks
- touch production Supabase data
- make schema/auth/RLS/security changes
- add public routes, webhooks, schedulers, cron, dispatchers
- enable live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation
- run the final activation command
- change public website/go-live/production copy

## 7. No Command Execution In This Packet Rule

Command execution status in this packet is `not_run_by_this_runner`. This runner does not execute the final activation command draft or any approved local fake-data dry-run command. The final activation command draft is not approved for execution.

## 8. No Safety Weakening Rule

Safety posture remains `demo_ready_with_live_automation_disabled`. All live automation flags remain false.

## 9. No Live Activation Rule

This packet does not approve live activation. `approved_for_activation_now` remains `false`.

## 10. No Test-Mode Activation Rule

This packet does not approve sandbox/test-mode activation.

## 11. No Credential/Env Logging Rule

This packet does not access credentials, env, API, or webhooks.

## 12. No Production Data Rule

This packet does not touch production Supabase data.

## 13. No Schema/Auth/RLS/Security Implementation Rule

This packet does not require schema, auth, RLS, or security migration work.

## 14. Post-Run Review Requirement

Post-run review/evidence capture remains required after any future local demo E2E run using:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md` (as model)

## 15. Old 90-Day Plan Boundary

old 90-day plan cannot override current source-of-truth direction. Later narrow reconciliation audit must not override current launch safety posture.

## 16. Verification Commands

Runner:

```bash
node backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js
```

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js
```

Dry-run wrapper:

```bash
bash scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner-dry-run.sh
```

Full aggregate regression (milestones/high-risk — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```