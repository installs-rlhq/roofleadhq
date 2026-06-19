# Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Design

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only/design-only/not-built/not-approved/non-executing** actual external/sandbox 30-scenario validation runner design packet. It documents the gap between the prior refreshed approved command (which ran only a local wrapper/completeness check) and the different actual external/sandbox 30-scenario validation runner that would be required to capture real sandbox/live validation evidence. This packet defines proposed future runner requirements only. It does **not** build, approve, or run any actual external/sandbox runner. It does **not** activate sandbox/test-mode, activate live automation, make external calls, access credentials, access production data, or contact any real roofer or homeowner.

### What this packet is

- actual external/sandbox 30-scenario validation runner design packet only
- source_of_truth_commit: `0150699`
- prior_refreshed_command_run_status: `completed_local_review_only_wrapper_passed`
- current_runner_gap_status: `existing_wrapper_is_local_only_not_actual_external_sandbox_runner`
- different_runner_required: `true`
- proposed_runner_status: `design_only_not_built_not_approved_not_run`
- read-only verifier input
- packet_status is `review_only`
- review_status is `actual_external_sandbox_30_scenario_runner_design_review_only`

### What this packet is not

- This packet **does not** build the proposed future actual external/sandbox 30-scenario validation runner.
- This packet **does not** approve the proposed future runner.
- This packet **does not** approve any command execution.
- This packet **does not** claim full 30-scenario external/sandbox validation has passed.
- This packet **does not** claim live/sandbox external testing has completed.
- This packet **does not** capture actual external/live/sandbox channel validation evidence.
- This packet **does not** execute sandbox/test-mode as an external or live run.
- This packet **does not** activate sandbox/test-mode by itself.
- This packet **does not** approve live activation.
- This packet **does not** approve real homeowner contact.
- This packet **does not** approve real roofer contact unless separately approved.
- This packet **does not** approve production data access.
- This packet **does not** approve production Supabase writes.
- This packet **does not** approve schema/auth/RLS/security changes.
- This packet **does not** approve billing/payment/deposit/invoice/quote/estimate automation.
- This packet **does not** make external calls.
- This packet **does not** access credentials.
- This packet **does not** contact any real roofer or homeowner.
- This packet **does not** send SMS/email/calls or create calendar bookings.
- Runner design capture does **not** itself equal new approval.
- This is **not** approval to activate anything now.

### Critical interpretation

- The prior refreshed approved command (`bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh`) proved only a local wrapper/completeness check.
- Actual 30-scenario external/live sandbox validation remains **0 captured / 0 passed / 30 missing / not_captured_by_this_run**.
- A **different** actual external/sandbox 30-scenario validation runner is required.
- This packet documents the proposed future runner design only.
- A **new exact approval** will be required before building or running any different actual external/sandbox runner.
- Any future runner must **fail closed** if any stop condition appears.

**Explicit note:** future_command_status is `blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes`.

**Explicit note:** approved_for_activation_now is `false`.

**Explicit note:** command_execution_status is `not_run_by_this_packet`.

**Explicit note:** actual_30_scenario_external_validation_status is `not_captured_by_this_run`.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain local-only, fake-data-only, read-only, dry-run-only, review-only. Standing local build approval allows this runner design packet. It does **not** by itself build, approve, or execute any actual external/sandbox runner or activate sandbox/test-mode.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | 0150699 |
| source_of_truth_label | test(workflow): capture refreshed actual 30 scenario command run evidence |

### Upstream refreshed command run evidence packet (referenced, verified)

| Field | Value |
| --- | --- |
| refreshed_command_run_evidence_packet_status | completed_upstream |
| reviewed_upstream_command_run_fixture | backend/fixtures/native-workflow-demo-roofer/refreshed-actual-30-scenario-command-run-evidence.json |
| prior_packet_reference | refreshed-actual-30-scenario-command-run-evidence |

Upstream command run evidence doc: `docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE.md`

### Prior refreshed command run baseline (observed — local wrapper only)

| Field | Value |
| --- | --- |
| prior_refreshed_command_run_status | completed_local_review_only_wrapper_passed |
| prior_exact_approved_command | bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh |
| prior_exact_approved_working_directory | /root/roofleadhq |
| prior_command_execution_status | refreshed_exact_approved_command_ran_local_review_only |
| prior_wrapper_pass_status | passed |
| prior_actual_30_scenario_external_validation_captured_count | 0 |
| prior_actual_30_scenario_external_validation_passed_count | 0 |
| prior_actual_30_scenario_external_validation_missing_count | 30 |
| prior_actual_30_scenario_external_validation_status | not_captured_by_this_run |

### Key upstream commits (referenced)

| Field | Value |
| --- | --- |
| refreshed_command_run_evidence_commit | 0150699 |
| refreshed_command_run_evidence_label | test(workflow): capture refreshed actual 30 scenario command run evidence |
| refreshed_pre_run_guard_pass_commit | 0da2457 |
| capture_refreshed_exact_approval_commit | fbdc9d6 |

## 3. Runner Gap Status Summary

| Field | Value |
| --- | --- |
| pilot_readiness_summary | demo_ready_with_live_automation_disabled |
| pilot_readiness_master_gate_decision | NO_GO |
| prior_refreshed_command_run_status | completed_local_review_only_wrapper_passed |
| current_runner_gap_status | existing_wrapper_is_local_only_not_actual_external_sandbox_runner |
| different_runner_required | true |
| proposed_runner_status | design_only_not_built_not_approved_not_run |
| actual_30_scenario_external_validation_captured_count | 0 |
| actual_30_scenario_external_validation_passed_count | 0 |
| actual_30_scenario_external_validation_missing_count | 30 |
| actual_30_scenario_external_validation_status | not_captured_by_this_run |
| live_activation_approval_status | not_granted |
| controlled_real_roofer_validation_approval_status | not_granted |
| real_homeowner_contact_approval_status | not_granted |
| real_roofer_contact_approval_status | not_granted |
| production_supabase_write_approval_status | not_granted |
| schema_auth_rls_security_change_approval_status | not_granted |
| billing_payment_automation_approval_status | not_granted |
| external_calls_made | false |
| credentials_accessed | false |
| production_data_accessed | false |
| sms_email_calls_calendar_booking_performed | false |
| public_route_webhook_scheduler_cron_dispatcher_activated | false |
| demo_ready_with_live_automation_disabled | preserved |
| future_command_status | blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes |
| approved_for_activation_now | false |
| command_execution_status | not_run_by_this_packet |

## 4. Proposed Future Runner Requirements (Design Only — Not Built)

**PROPOSED ONLY — NOT BUILT — NOT APPROVED — DO NOT EXECUTE FROM THIS PACKET**

| Field | Value | Status |
| --- | --- | --- |
| proposed_future_command | bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh | PROPOSED_ONLY |
| proposed_working_directory | /root/roofleadhq | PROPOSED_ONLY |
| proposed_evidence_log_path | logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log | PROPOSED_ONLY |
| proposed_structured_evidence_output_path | backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json | PROPOSED_ONLY |

### Proposed future runner behavior (requirements only)

1. Must run only after separate exact approval is captured and a dedicated pre-run guard passes.
2. Must execute all 30 scenarios across 8 scenario groups against approved sandbox/test-mode boundaries only.
3. Must capture per-scenario evidence with all required evidence fields.
4. Must emit aggregate counters after the run.
5. Must fail closed on any stop condition (credential exposure, production data touch, real contact, live activation, schema change, billing automation, or boundary violation).
6. Must not log credential values (`credential_values_logged_count` must remain 0).
7. Must not touch production data (`production_data_touches_count` must remain 0).
8. Must not contact real homeowners or roofers (`real_contact_touches_count` must remain 0).
9. Must record `external_calls_count_by_service` per approved sandbox service only.
10. Must halt immediately and record `stop_condition_triggered` when any stop condition appears.

### Proposed 30 scenario groups (design specification)

| # | scenario_group | scenario_count | scenario_ids (proposed) |
| --- | --- | --- | --- |
| 1 | SMS sandbox validation | 5 | SMS-01 through SMS-05 |
| 2 | Vapi test assistant validation | 3 | VAPI-01 through VAPI-03 |
| 3 | Lead intake validation | 5 | LEAD-01 through LEAD-05 |
| 4 | Manual review/escalation validation | 4 | REVIEW-01 through REVIEW-04 |
| 5 | Calendar/appointment sandbox validation | 4 | CAL-01 through CAL-04 |
| 6 | Reporting/admin visibility validation | 3 | REPORT-01 through REPORT-03 |
| 7 | Audit log evidence validation | 3 | AUDIT-01 through AUDIT-03 |
| 8 | STOP/rollback validation | 3 | STOP-01 through STOP-03 |
| | **total_scenarios_count** | **30** | |

### Required evidence fields per scenario (proposed)

Each of the 30 scenarios must capture all of the following fields:

- scenario_id
- scenario_group
- scenario_name
- approved_boundary_checked
- service_mode
- test_account_reference
- input_fixture
- action_taken
- expected_result
- observed_result
- pass_fail_status
- evidence_log_reference
- stop_condition_triggered
- reviewer_initials
- timestamp

### Required aggregate counters (proposed)

| Counter | Specification |
| --- | --- |
| total_scenarios_count | 30 (fixed) |
| captured_scenarios_count | count of scenarios with evidence captured |
| passed_scenarios_count | count of scenarios with pass_fail_status passed |
| failed_scenarios_count | count of scenarios with pass_fail_status failed |
| missing_scenarios_count | count of scenarios without evidence |
| stop_conditions_count | count of stop conditions triggered |
| external_calls_count_by_service | per-service external call counts (sandbox/test-mode only when approved) |
| credential_values_logged_count | must be 0 |
| production_data_touches_count | must be 0 |
| real_contact_touches_count | must be 0 |

## 5. Design Checks (10 — All Passed for Design Packet Completeness)

| # | Check | Status |
| --- | --- | --- |
| 1 | source_of_truth_commit 0150699 referenced | passed |
| 2 | prior refreshed command run local wrapper gap documented | passed |
| 3 | different actual external/sandbox runner required | passed |
| 4 | proposed runner status design_only_not_built_not_approved_not_run | passed |
| 5 | actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing | passed |
| 6 | all 8 scenario groups and 30 scenarios specified | passed |
| 7 | required evidence fields and aggregate counters specified | passed |
| 8 | proposed future paths documented as proposed only | passed |
| 9 | live activation and real contact blocks remain not_granted | passed |
| 10 | demo_ready_with_live_automation_disabled preserved | passed |

## 6. Why This Packet Does Not Approve Building or Running the Proposed Runner

| Reason | Current state |
| --- | --- |
| Design only | proposed_runner_status design_only_not_built_not_approved_not_run |
| Not built | proposed future command script does not exist in this packet |
| Not approved | no exact approval captured for different actual external/sandbox runner |
| Prior approval was local-only | prior refreshed command proved wrapper/completeness only |
| No external evidence captured | actual_30_scenario_external_validation_status not_captured_by_this_run |
| Missing validation evidence | actual_30_scenario_external_validation_missing_count 30 |
| No activation now | approved_for_activation_now false |
| Live activation not approved | live_activation_approval_status not_granted |
| Real homeowner contact not approved | real_homeowner_contact_approval_status not_granted |
| Real roofer contact not approved | real_roofer_contact_approval_status not_granted |
| Production Supabase writes not approved | production_supabase_write_approval_status not_granted |
| Schema/auth/RLS/security changes not approved | schema_auth_rls_security_change_approval_status not_granted |
| Billing/payment automation not approved | billing_payment_automation_approval_status not_granted |
| Future command blocked | future_command_status blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes |
| Pilot readiness preserved | demo_ready_with_live_automation_disabled preserved |

## 7. Packet Artifacts and Verification

| Artifact | Path |
| --- | --- |
| Runner design packet (this doc) | `docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN.md` |
| NO-GO review companion | `docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN_NO_GO_REVIEW.md` |
| Upstream refreshed command run evidence packet | `docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE.md` |
| Structured fixture | `backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-design.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-dry-run.sh` |

Dry-run command:

```bash
bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-dry-run.sh
```

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-readonly.js
```

## 8. Packet Safety Posture (unchanged by this packet)

| Field | Value |
| --- | --- |
| safety_status | demo_ready_with_live_automation_disabled |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| real_roofer_onboarding_contact_allowed | false |
| real_roofer_contact_allowed | false |
| real_homeowner_contact_allowed | false |
| controlled_real_roofer_validation_allowed | false |
| external_calls_allowed_by_this_packet | false |
| credentials_access_allowed_by_this_packet | false |
| production_data_access_allowed_by_this_packet | false |
| sms_email_calls_calendar_booking_allowed_by_this_packet | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_accessed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| real_demo_sandbox_live_testing_allowed | false |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |

Full aggregate regression lane remains preserved via `scripts/verify-safe-readiness.sh`.