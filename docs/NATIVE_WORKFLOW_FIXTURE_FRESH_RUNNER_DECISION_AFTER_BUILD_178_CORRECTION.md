# Native Workflow Fixture — Fresh Runner Decision After Build 178 Correction

## Build 179 decision / approval template packet

source_of_truth_commit_before_packet: dc7d570
prior_runner_state_correction_commit: dc7d570
prior_post_build_176_runner_stale_evidence_commit: 084f039
prior_build_176_fresh_guard_commit: cc6d827
prior_build_175_signed_approval_capture_commit: 5ed0089
prior_build_174_ambiguous_attempt_capture_commit: a67205c

## Purpose

Create a fresh runner-execution decision / approval template after Build 178 corrected the runner state following Build 177 stale evidence.

This packet is review-only.

It does not capture Jason approval.
It does not create or pass a fresh pre-run guard.
It does not run or invoke the actual external/sandbox 30-scenario runner.
It does not mark actual validation captured or passed.

## Decision status

fresh_runner_execution_decision_after_build_178_correction_status: review_only_no_go_until_signed_approval_and_guard
approval_template_status: template_only_not_signed_not_captured_not_granted
jason_signed_approval_status: not_signed
approval_capture_status: not_captured
fresh_pre_run_guard_status: not_created_not_passed
runner_command_attempt_status: not_attempted_by_this_packet
runner_execution_status: not_run_by_this_packet

## Proposed approval scope

approval_scope: fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_178_runner_state_correction_and_future_fresh_guard

## Exact proposed values

exact_working_directory: /root/roofleadhq
exact_command: bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh
corrected_execution_wrapper_requirement: no terminal-closing exit statement; shell must remain open after runner exits so output and exit status can be captured
exact_runner_path: scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh
exact_manifest_path: backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json
exact_scenario_count: 30

## Preserved validation and safety status

actual_30_scenario_external_validation_captured_count: 0
actual_30_scenario_external_validation_passed_count: 0
actual_30_scenario_external_validation_missing_count: 30
actual_30_scenario_external_validation_status: not_captured_by_this_run
safety_status: demo_ready_with_live_automation_disabled

## Approval text Jason may sign after Build 179 closes

I, Jason Lohse, approve one fresh sandbox/test-mode runner command attempt for RoofLeadHQ after Build 178 runner state correction, subject to a separate fresh pre-run guard passing first.

Approval scope:
fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_178_runner_state_correction_and_future_fresh_guard

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

Approval limits:
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

Signed:
Jason Lohse

Signed date/time:
<current chat date/time MST>

## Next safe step

After Build 179 is committed, pushed, fetched, source-of-truth verified, and final `git status --short` is blank, Jason may sign the approval text above.

If Jason signs, the next build is approval capture only.
