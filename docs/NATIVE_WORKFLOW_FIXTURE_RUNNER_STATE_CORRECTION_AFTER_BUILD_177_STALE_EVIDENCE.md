# Native Workflow Fixture — Runner State Correction After Build 177 Stale Evidence

## Build 178 correction packet

source_of_truth_commit_before_packet: 084f039
prior_post_build_176_runner_stale_evidence_commit: 084f039
prior_build_176_fresh_guard_commit: cc6d827
prior_build_175_signed_approval_capture_commit: 5ed0089
prior_build_174_ambiguous_attempt_capture_commit: a67205c
prior_build_170_template_commit: 932b7a4
stale_runner_reported_source_of_truth_commit: cf6d8c4

## Purpose

Correct the actual external/sandbox 30-scenario runner's fail-closed state messaging after Build 177 captured a consumed runner attempt that still reported stale Build 164 / `cf6d8c4` state.

This packet corrects recognition state only.

It does not approve another runner attempt.
It does not create or capture a fresh approval.
It does not create or pass a fresh pre-run guard.
It does not run or invoke the actual runner.
It does not mark actual validation captured or passed.

## Corrected recognition state

runner_stale_build_164_state_status: historical_only_not_current
runner_recognizes_build_174_ambiguous_attempt_capture: true
runner_recognizes_build_175_fresh_signed_approval_capture: true
runner_recognizes_build_176_fresh_pre_run_guard: true
runner_recognizes_build_177_post_run_blocked_stale_evidence: true
runner_direct_invocation_status_after_build_177: blocked_nonzero_expected
future_command_status: blocked_until_fresh_decision_approval_capture_and_fresh_pre_run_guard_after_build_178

## Preserved validation and safety status

actual_30_scenario_external_validation_captured_count: 0
actual_30_scenario_external_validation_passed_count: 0
actual_30_scenario_external_validation_missing_count: 30
actual_30_scenario_external_validation_status: not_captured_by_this_run
safety_status: demo_ready_with_live_automation_disabled

## Next safe step

Create a fresh runner decision / approval template after this correction.

Only after a new explicit Jason approval is captured and a separate fresh pre-run guard passes may another one-time corrected runner attempt be considered.
