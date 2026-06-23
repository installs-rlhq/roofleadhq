# Native Workflow Fixture — Capture Fresh Signed Runner Approval After Build 174

## Build 175 approval capture packet

source_of_truth_commit_before_packet: a67205c
prior_ambiguous_runner_attempt_capture_commit: a67205c
prior_verifier_root_guard_fix_commit: 64faec4
prior_fresh_pre_run_guard_commit: e639d8e
prior_signed_approval_capture_commit: 46a704b

## Purpose

Capture Jason Lohse's fresh signed approval after Build 174 ambiguous runner attempt capture.

This packet is approval capture only.

It does not create or pass a fresh pre-run guard.
It does not run or invoke the actual external/sandbox 30-scenario runner.
It does not mark the runner ready now.
It does not mark actual validation captured or passed.

## Signed approval

I, Jason Lohse, approve one fresh sandbox/test-mode runner command attempt for RoofLeadHQ after Build 174 ambiguous runner attempt capture, subject to a separate fresh pre-run guard passing first.

Approval scope:
fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_174_ambiguous_attempt_capture_and_future_fresh_guard

Exact working directory:
/root/roofleadhq

Exact command:
bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh

Corrected execution wrapper requirement:
The command must be run without any terminal-closing `exit` statement. The shell must remain open after the runner exits so full output and exit status can be captured.

Exact runner path:
scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh

Exact manifest path:
backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json

Exact scenario count:
30

Signed:
Jason Lohse

Signed date/time:
06/23/2026, current chat MST

## Approval limits

- Sandbox/test-mode only.
- One-time attempt only after a separate fresh pre-run guard passes.
- No live activation.
- No real homeowner contact.
- No real roofer contact unless separately approved.
- No production Supabase writes.
- No production data access.
- No schema/auth/RLS/security changes.
- No billing/payment/deposit/quote/estimate/invoice automation.
- No public/live automation.
- No credential or secret exposure.
- If the command blocks, exits nonzero, reports stale state, or output is incomplete, stop and do not rerun.
- If the command succeeds, stop and capture validation evidence before any next step.

## Preserved status

approval_capture_status: captured_signed
jason_signed_approval_status: signed
fresh_pre_run_guard_status: not_created_not_passed_by_this_packet
runner_command_attempt_status: not_attempted_by_this_packet
runner_execution_status: not_run_by_this_packet
actual_30_scenario_external_validation_captured_count: 0
actual_30_scenario_external_validation_passed_count: 0
actual_30_scenario_external_validation_missing_count: 30
actual_30_scenario_external_validation_status: not_captured_by_this_run
future_command_status: blocked_until_fresh_pre_run_guard_after_build_175_signed_approval_capture
safety_status: demo_ready_with_live_automation_disabled

## Next safe step

Build 176: fresh pre-run guard after Build 175 signed approval capture.

Only after Build 176 is committed, pushed, fetched, source-of-truth verified, and final `git status --short` is blank may the one corrected runner attempt be considered.
