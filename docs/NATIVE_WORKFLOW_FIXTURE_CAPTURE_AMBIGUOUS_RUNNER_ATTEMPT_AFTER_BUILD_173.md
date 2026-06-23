# Native Workflow Fixture — Capture Ambiguous Runner Attempt After Build 173

## Build 174 evidence packet

source_of_truth_commit_before_packet: 64faec4
prior_build_171_signed_approval_capture_commit: 46a704b
prior_build_172_fresh_guard_commit: e639d8e
prior_build_173_verifier_root_guard_fix_commit: 64faec4

## Purpose

Capture the ambiguous runner-attempt state after the approved one-time sandbox/test-mode runner command was issued through a bad interactive shell wrapper that ended the terminal session with `exit "$RUNNER_EXIT"`.

Because the terminal session closed, full runner output was not captured in chat. The reconnect diagnostic showed source-of-truth clean at 64faec4 and no obvious new runner-evidence files, but the command may have reached the actual runner before the shell exited.

## Decision

Treat the one-time approved attempt as ambiguous / possibly consumed.

Do not rerun the actual runner under the same approval and guard chain. A future runner attempt requires a fresh explicit approval and a fresh pre-run guard.

## Preserved status

attempt_capture_status: ambiguous_output_lost_due_to_terminal_exit_wrapper
runner_command_attempt_status: attempted_or_possibly_attempted_output_not_captured
runner_execution_status: unknown_output_not_captured
rerun_allowed_under_same_approval: false
actual_30_scenario_external_validation_captured_count: 0
actual_30_scenario_external_validation_passed_count: 0
actual_30_scenario_external_validation_missing_count: 30
actual_30_scenario_external_validation_status: not_captured_by_this_run
safety_status: demo_ready_with_live_automation_disabled

## Next safe step

Fresh approval capture, then fresh pre-run guard, then one corrected runner command attempt without terminal-closing `exit`.
