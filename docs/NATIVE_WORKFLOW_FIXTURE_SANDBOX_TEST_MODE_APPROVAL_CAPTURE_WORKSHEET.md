# Native Workflow Fixture Sandbox/Test-Mode Approval Capture Worksheet

## 1. Purpose

This worksheet is the **fake-data/local-only/read-only/review-only/planning-only/not-approved/non-executing** future capture form where Jason can later paste or record an exact signed sandbox/test-mode approval statement. **Every field defaults blank or not_captured.** This worksheet does **not** equal approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | 878fc77 |
| approval_request_ready_status | completed |
| approval_capture_status | not_captured |
| jason_signed_approval_status | not_signed |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| approval_status | not_granted |
| completeness_status | incomplete |
| exact_values_required_count | 19 |
| accepted_exact_values_count | 0 |
| approved_exact_values_filled_count | 0 |
| default_sandbox_test_mode_decision | HOLD |
| approval_capture_worksheet_does_not_equal_approval | true |
| approval_request_ready_packet_does_not_equal_approval | true |
| final_jason_approval_statement_template_does_not_equal_approval | true |
| recommended_defaults_are_not_approval | true |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| command_execution_status | not_run_by_this_packet |
| safety_status | demo_ready_with_live_automation_disabled |

**Explicit note:** Approval capture worksheet does **not** equal approval.

**Explicit note:** Approval request ready packet does **not** equal approval.

**Explicit note:** Final Jason approval statement template does **not** equal approval.

**Explicit note:** Recommended defaults are **not** approval.

**Explicit note:** Completing this worksheet does **not** grant sandbox/test-mode activation, live activation, or command execution.

## 2. Future Jason Approval Capture Worksheet (all fields blank / not_captured)

| # | Capture field | Status | Jason capture value |
| --- | --- | --- | --- |
| 1 | exact_approval_text | not_captured |  |
| 2 | approval_timestamp | not_captured |  |
| 3 | scope | not_captured |  |
| 4 | services | not_captured |  |
| 5 | environment | not_captured |  |
| 6 | command | not_captured |  |
| 7 | stop_conditions | not_captured |  |
| 8 | rollback_owner | not_captured |  |
| 9 | evidence_owner | not_captured |  |
| 10 | expiry | not_captured |  |
| 11 | one_time_use_limitation | not_captured |  |

| Field | Value |
| --- | --- |
| approval_capture_status | not_captured |
| jason_signed_approval_status | not_signed |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| approval_status | not_granted |
| approved_for_activation_now | false |
| command_execution_status | not_run_by_this_packet |

## 3. Jason Capture Instructions

1. Review the upstream approval request ready packet and final Jason approval statement template.
2. Accept, edit, or replace each of the 19 exact values as needed.
3. Copy the signed approval statement text into `exact_approval_text`.
4. Record `approval_timestamp` in ISO-8601 format at time of signing.
5. Fill each remaining capture field with the exact scoped values Jason approves.
6. Record captured values in a separate future signed-capture packet — not by editing this blank worksheet alone.
7. Live activation still requires separate later approval after sandbox/test-mode evidence.

## 4. Completion Rules

- All capture fields remain blank or `not_captured` until Jason explicitly records a signed approval statement.
- `approval_capture_status` remains `not_captured` until Jason separately records signed approval.
- `jason_signed_approval_status` remains `not_signed` until Jason separately signs.
- `sandbox_test_mode_approval_status` remains `not_granted` until separate explicit Jason approval is recorded.
- `live_activation_approval_status` remains `not_granted` until separate later approval.
- `completeness_status` remains `incomplete` until all 19 exact values are accepted/edited and approved separately.
- Default sandbox/test-mode decision remains **HOLD** until separate Jason approval with all exact values.

## 5. Connected Artifacts

- Jason approval capture packet: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_JASON_APPROVAL_CAPTURE_PACKET.md`
- Approval request ready packet: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_READY_PACKET.md`
- Final Jason approval statement template: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_FINAL_JASON_APPROVAL_STATEMENT_TEMPLATE.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-jason-approval-capture-packet.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-readonly.js`
- Dry-run wrapper: `scripts/run-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-dry-run.sh`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only, not-approved, non-executing.