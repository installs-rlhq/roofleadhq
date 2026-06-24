# Native Workflow Fixture — Capture Post-Build-176 Runner Blocked/Stale Evidence

## Build 177 evidence packet

source_of_truth_commit_before_packet: cc6d827
prior_build_175_signed_approval_capture_commit: 5ed0089
prior_build_176_fresh_guard_commit: cc6d827
runner_log_path: backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-output-after-build-176-20260624T182946Z.log

## Result

runner_command_attempt_status: attempted_once_after_build_176
runner_exit_status: 1
runner_result: blocked_nonzero_stale_state
runner_reported_source_of_truth_commit: cf6d8c4
runner_reported_stale_build_state: build_164_decision_template_only
runner_rerun_allowed_under_same_approval: false

## Preserved validation and safety status

actual_30_scenario_external_validation_captured_count: 0
actual_30_scenario_external_validation_passed_count: 0
actual_30_scenario_external_validation_missing_count: 30
actual_30_scenario_external_validation_status: not_captured_by_this_run
safety_status: demo_ready_with_live_automation_disabled

## External action status

The runner output states it did not make external calls, access credentials, expose secrets, access production data, write production Supabase data, send SMS/email/calls, create calendar bookings, contact real homeowners or roofers, or execute actual 30-scenario validation.

## Next safe step

Create a runner state correction packet after this evidence capture so the runner recognizes the Build 174/175/176/177 chain correctly. Do not rerun the runner under the same approval/guard chain.
