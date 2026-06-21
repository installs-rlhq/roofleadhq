# Native Workflow Fixture Fresh Runner Decision After Build 169 Correction

This Build 170 packet is a local, read-only, review-only fresh runner-execution decision and approval-template packet after Build 169 corrected runner state/messaging.

Source-of-truth: `06ae3ce` (`test(workflow): add build 169 runner state correction packet`).

Approval template: `docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_DECISION_AFTER_BUILD_169_CORRECTION_APPROVAL_TEMPLATE.md`.

Build 169 states the Build 167 guard is not reusable after Build 168 stale evidence. This packet creates only a fresh decision and an unsigned approval template for Jason to review/sign later. It does not capture approval, does not create or pass a fresh guard, does not run or invoke the actual runner, and does not invoke `scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh`.

Actual validation remains `0 captured / 0 passed / 30 missing`. Safety remains `demo_ready_with_live_automation_disabled`.

## Evidence Summary

| Field | Value |
| --- | --- |
| build_number | 170 |
| source_of_truth_commit | 06ae3ce |
| source_of_truth_label | test(workflow): add build 169 runner state correction packet |
| prior_runner_state_correction_commit | 06ae3ce |
| prior_post_build_167_stale_evidence_commit | d43cf77 |
| prior_build_167_fresh_guard_commit | e0be19f |
| prior_build_166_cleanup_commit | bc7ea24 |
| prior_premature_runner_blocked_evidence_commit | 69fe9db |
| prior_invalid_guard_draft_commit_removed_by_cleanup | 44ccf16 |
| prior_signed_approval_capture_commit | 50d66cc |
| prior_decision_template_commit | dfb932f |
| prior_runner_recognition_correction_commit | cf6d8c4 |
| prior_post_build_161_blocked_evidence_commit | 3f97a7f |
| fresh_runner_execution_decision_status | created_review_only |
| fresh_runner_execution_approval_template_status | created_review_only_unsigned |
| fresh_runner_execution_approval_capture_status | not_captured |
| fresh_runner_execution_jason_signed_approval_status | not_signed |
| fresh_runner_execution_approval_status | not_granted |
| fresh_pre_run_guard_status | not_created_not_passed |
| runner_command_attempt_status | not_attempted_by_this_packet |
| runner_command_invoked_by_this_packet | false |
| runner_execution_status | not_run_by_this_packet |
| command_execution_status | not_run_by_this_packet |
| build_167_guard_reusable_after_build_168_stale_evidence | false |
| fresh_decision_required_after_build_169_correction | true |
| fresh_approval_capture_required_after_build_169_correction | true |
| fresh_pre_run_guard_required_after_build_169_correction | true |
| future_command_status | blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_170_decision |
| runner_direct_invocation_status_after_decision_template | blocked_nonzero_expected |
| actual_30_scenario_external_validation_captured_count | 0 |
| actual_30_scenario_external_validation_passed_count | 0 |
| actual_30_scenario_external_validation_missing_count | 30 |
| actual_30_scenario_external_validation_status | not_captured_by_this_run |
| safety_status | demo_ready_with_live_automation_disabled |
| controlled_test_roofer_e2e_status | review_only_not_approved_not_run |
| controlled_real_roofer_validation_allowed | false |
| approved_for_activation_now | false |

## Proposed Exact Approval Values

These exact values are proposed for Jason review only. They are not signed, not captured, and not granted by this packet.

| Field | Value |
| --- | --- |
| exact_working_directory | /root/roofleadhq |
| exact_command | bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh |
| exact_runner_path | scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh |
| exact_manifest_path | backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json |
| exact_scenario_count | 30 |
| approval_scope | fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_169_correction_decision_and_future_fresh_guard |

## Decision Boundary

- Review-only decision/template packet.
- No approval is captured by this packet.
- No Jason signed approval is captured by this packet.
- No fresh guard is created or passed by this packet.
- The actual runner is not run or invoked by this packet.
- The Build 167 guard is not reusable after Build 168 stale evidence.
- Jason must separately sign the exact approval values before any future fresh guard.
- A future fresh guard must be created and passed after signed approval before one future exact runner attempt.
- Direct runner invocation after this decision template remains blocked/nonzero expected.
- Actual validation remains `0 captured / 0 passed / 30 missing`.
- No live/external/production behavior is activated.
- No credentials, secrets, production data, production Supabase writes, schema/auth/RLS/security changes, SMS, email, calls, calendar booking, billing, payment, deposit, quote, estimate, invoice automation, public/live routes, webhooks, cron jobs, schedulers, or dispatchers are allowed.

## Next Required Chain

1. Jason separately reviews and signs the exact approval template after Build 170.
2. A separate packet captures that signed approval.
3. A separate fresh pre-run guard is created and passed after the signed approval capture.
4. Only then may one future exact runner command attempt be considered.

Until all of those steps happen, the future command remains blocked.
