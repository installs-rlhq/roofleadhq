# Native Workflow Fixture Demo Roofer Local E2E Test Bundle

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only demo roofer local E2E test bundle** that prepares RoofLeadHQ for a future explicitly approved local fake-data dry-run as a demo roofer.

### What this packet is

- local fake-data demo roofer profile fixture
- fake homeowner lead dataset
- local E2E scenario matrix (25 scenarios)
- expected outcome fixtures
- demo operator checklist
- review-only documentation packet
- read-only verifier
- dry-run wrapper using targeted verifier + backend build only
- **demo roofer local E2E test bundle review-only** — prepares future local dry-run review without granting activation or command execution approval
- packet type is `demo_roofer_local_e2e_test_bundle_review_only`

### What this packet is not

- This is **not** approval to activate anything.
- This is **not** approval to run the final activation command draft.
- This is **not** approval to approve sandbox/test-mode activation.
- This is **not** approval to approve live activation.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This is **not** schema, auth, RLS, or security work.
- This does **not** add public routes, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** implement external service integration behavior.
- This does **not** execute any activation step or proposed command.
- This does **not** run any approved local fake-data dry-run command.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, Jason and the operator have a comprehensive fake demo roofer local E2E test bundle for future local dry-run review — without activation approval, command execution approval, external calls, credentials, production data access, or schema/auth/RLS/security changes.

### Connected launch packets

This bundle builds on the complete first-controlled-launch evidence chain:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_GO_NO_GO_REVIEW_PACKET.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVED_TEST_MODE_VALUES_CAPTURE.md`

Fixture directory:

- `backend/fixtures/native-workflow-demo-roofer/demo-roofer-profile.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-homeowner-leads.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-e2e-scenarios.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-expected-outcomes.json`
- `backend/fixtures/native-workflow-demo-roofer/demo-operator-checklist.json`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md`
- `scripts/run-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-dry-run.sh`
- `backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `7894948 test(workflow): add first controlled launch post run review template`

## 2. Current State

| Field | Value |
| --- | --- |
| latest_source_of_truth_commit | 7894948 |
| final_go_no_go_review_packet_status | complete |
| post_run_review_template_status | complete |
| evidence_chain_status | complete_for_human_review |
| final_activation_command_draft_status | exists |
| approved_values_status | approved_as_exact_planned_local_dry_run_values |
| command_execution_status | not_run_in_this_packet |
| activation_approval_status | not_granted |
| activation_command_approval_status | not_granted |
| final_jason_activation_approval | not_granted |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| safety_posture | demo_ready_with_live_automation_disabled |
| packet_delivery_mode | review_only |
| packet_external_call_allowed | false |
| packet_live_activation_allowed | false |
| packet_test_mode_activation_allowed | false |
| packet_command_execution_allowed | false |

### Current state summary

- Latest source-of-truth commit before this packet is `7894948`.
- final go/no-go review packet is complete.
- post-run review template is complete.
- First-controlled-launch evidence chain is complete for human review.
- final activation command draft exists.
- approved local dry-run values exist only as planned local fake-data values.
- activation approval is not granted.
- activation command approval is not granted.
- final Jason activation approval is not granted.
- `approved_for_activation_now` is `false`.
- `approved_channels` is `[]`.
- `approved_external_services` is `[]`.
- Safety remains `demo_ready_with_live_automation_disabled`.
- Command execution status in this packet is `not_run_in_this_packet`.

## 3. Demo Roofer Profile Fixture

| Field | Value |
| --- | --- |
| roofer_account_id | fixture-demo-roofer-summit-peak-001 |
| company_name | Summit Peak Roofing Demo LLC |
| company_name_is_fake | true |
| plan_profile | growth |
| owner_email | jordan.demo.operator@example.com |
| owner_phone | +15550101001 |
| office_address | 9000 Summit Peak Demo Parkway, Demo Ridge City, DR 00001 |
| calendar_sync_enabled | false |
| sms_confirmation_enabled | false |
| live_automation_enabled | false |

The demo roofer is obviously fake. No real roofer data is used.

## 4. Fake Homeowner Lead Dataset

All homeowner leads use:

- fake names (e.g., Morgan Demo Homeowner)
- fake phone numbers in safe placeholder range (+15550102xxx)
- fake emails at example.com domains
- fake addresses in Demo Ridge City, DR
- fake lead sources (fake_website_form, fake_google_ads_placeholder, etc.)
- fake appointment preferences
- fake consent/contact flags
- fake outcomes and review/escalation outcomes
- no real homeowner data
- no production data

Lead count: 25 fake homeowner leads mapped to 25 local E2E scenarios.

## 5. Local E2E Scenario Matrix

| # | Scenario ID | Category |
| --- | --- | --- |
| 1 | scenario-001-new-paid-lead-qualified-appointment-ready | new_lead |
| 2 | scenario-002-new-lead-missing-contact-review-queue | new_lead |
| 3 | scenario-003-new-lead-no-contact-permission | new_lead |
| 4 | scenario-004-missed-lead-recovery | missed_lead_recovery |
| 5 | scenario-005-manual-outreach | manual_outreach |
| 6 | scenario-006-appointment-readiness | appointment_readiness |
| 7 | scenario-007-appointment-scheduled-placeholder | appointment_readiness |
| 8 | scenario-008-appointment-reschedule-request | appointment_reschedule |
| 9 | scenario-009-missed-appointment-no-show | appointment_no_show |
| 10 | scenario-010-post-inspection-estimate-pending | post_inspection |
| 11 | scenario-011-post-inspection-estimate-sent | post_inspection |
| 12 | scenario-012-feedback-permission-not-asked | feedback_permission |
| 13 | scenario-013-feedback-permission-yes | feedback_permission |
| 14 | scenario-014-feedback-permission-no | feedback_permission |
| 15 | scenario-015-lead-source-roi-attribution | source_roi |
| 16 | scenario-016-usage-volume-plan-limit-boundary | usage_volume |
| 17 | scenario-017-messaging-compliance-contact-permission | messaging_compliance |
| 18 | scenario-018-data-minimization-pii-boundary | data_minimization |
| 19 | scenario-019-audit-timeline-event-expectation | audit_timeline |
| 20 | scenario-020-review-queue-aging-sla-boundary | review_aging |
| 21 | scenario-021-human-escalation-roofer-judgment | human_escalation |
| 22 | scenario-022-roofleadhq-escalation-system-review | human_escalation |
| 23 | scenario-023-unsupported-automation-blocked | unsupported_automation_block |
| 24 | scenario-024-external-service-boundary-blocked | external_service_block |
| 25 | scenario-025-stop-condition-boundary | stop_condition |

Every scenario has matching expected outcome data in `demo-expected-outcomes.json`.

## 6. Expected Outcome Fixtures

Expected outcomes preserve:

- local-only/fake-data-only behavior
- `live_action_allowed: false` for all scenarios
- `notification_sent: false` for all scenarios
- `production_data_touched: false` for all scenarios
- `external_services_called: false` for all scenarios
- `activation_approval_status: not_granted` for all scenarios
- `activation_command_approval_status: not_granted` for all scenarios
- `approves_activation: false` for all scenarios
- `approves_command_execution: false` for all scenarios

No scenario approves activation or command execution.

## 7. Demo Operator Checklist

See `backend/fixtures/native-workflow-demo-roofer/demo-operator-checklist.json` for:

- pre-run safety checks
- scenario review steps
- dry-run execution checks
- post-run review requirements
- stop conditions
- forbidden actions

## 8. Final Activation Command Reference

The final activation command draft exists at:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md`

Proposed command (not approved for execution):

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

- `proposed_command_approval_status`: not_granted
- `proposed_command_execution_allowed_now`: false
- `proposed_command_requires_separate_jason_approval`: true

This packet does **not** approve or execute the final activation command.

## 9. Post-Run Review Template Requirement

After any future explicitly approved local fake-data dry-run, the operator must complete:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md`

The post-run review template remains the required review artifact. This packet does not execute or approve any dry-run command.

## 10. Old 90-Day Plan Boundary

- The old 90-day plan is not imported into this demo roofer local E2E path.
- Current source-of-truth direction wins.
- Any old-plan review must remain a later narrow reconciliation audit.
- The old 90-day plan cannot override current source-of-truth direction.
- The old 90-day plan cannot override current stack, functionality, native workflow fixture path, fake-data E2E path, or safety posture.

## 11. Delivery and Execution Posture

| Mode | Value |
| --- | --- |
| delivery_mode | local-only |
| data_mode | fake-data-only |
| access_mode | read-only |
| execution_mode | dry-run-only |
| review_mode | review-only |

## 12. Forbidden Actions

- activate sandbox/test-mode services
- activate live services
- make external calls
- access credentials, env, API, or webhooks
- touch production Supabase data
- make schema/auth/RLS/security changes
- add public routes/webhooks, schedulers, cron, or dispatchers
- enable live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation
- approve activation
- approve command execution
- execute the final activation command

## 13. Safety Rules

### No Command Execution In This Packet Rule

This packet does not execute the final activation command or any approved local dry-run command.

### No Safety Weakening Rule

Safety posture remains `demo_ready_with_live_automation_disabled`.

### No Live Activation Rule

No live SMS, Twilio, Vapi, Resend, Google Calendar, Lindy, CRM sync, or live CSV delivery.

### No Test-Mode Activation Rule

No sandbox/test-mode service activation.

### No Credential/Env Logging Rule

No credential, env, API, or webhook access.

### No Production Data Rule

No production Supabase reads or writes.

### No Schema/Auth/RLS/Security Implementation Rule

No schema, auth, RLS, or security changes.

## 14. Verification Commands

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js
```

Dry-run wrapper:

```bash
bash scripts/run-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-dry-run.sh
```

Full safe readiness (preserved for milestones):

```bash
bash scripts/verify-safe-readiness.sh
```

## 15. Stop Conditions

Stop the run if any of the following are attempted:

- external call
- credential/env access
- production data access
- schema/auth/RLS/security change
- scheduler/cron/dispatcher enablement
- webhook/public route addition
- sandbox/test-mode activation
- live service activation
- failed safety assertion