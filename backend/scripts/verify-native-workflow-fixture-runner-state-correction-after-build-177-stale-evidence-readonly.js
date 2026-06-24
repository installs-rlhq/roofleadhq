#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_STATE_CORRECTION_AFTER_BUILD_177_STALE_EVIDENCE.md');
const fixturePath = path.join(root, 'backend/fixtures/native-workflow-demo-roofer/runner-state-correction-after-build-177-stale-evidence.json');
const runnerPath = path.join(root, 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

assert(root === '/root/roofleadhq', 'running from Terminal 1 source-of-truth root');
assert(fs.existsSync(docPath), 'Build 178 correction doc exists');
assert(fs.existsSync(fixturePath), 'Build 178 correction fixture exists');
assert(fs.existsSync(runnerPath), 'actual runner path exists');

const doc = fs.readFileSync(docPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const runner = fs.readFileSync(runnerPath, 'utf8');

assert(fixture.build_number === 178, 'fixture records Build 178');
assert(fixture.source_of_truth_commit_before_packet === '084f039', 'fixture records source-of-truth commit');
assert(fixture.stale_runner_reported_source_of_truth_commit === 'cf6d8c4', 'fixture records stale reported commit');
assert(fixture.runner_stale_build_164_state_status === 'historical_only_not_current', 'fixture makes Build 164 stale state historical only');
assert(fixture.runner_recognizes_build_174_ambiguous_attempt_capture === true, 'fixture recognizes Build 174');
assert(fixture.runner_recognizes_build_175_fresh_signed_approval_capture === true, 'fixture recognizes Build 175');
assert(fixture.runner_recognizes_build_176_fresh_pre_run_guard === true, 'fixture recognizes Build 176');
assert(fixture.runner_recognizes_build_177_post_run_blocked_stale_evidence === true, 'fixture recognizes Build 177');
assert(fixture.runner_command_attempt_status === 'not_attempted_by_this_packet', 'fixture confirms no runner attempt in packet');
assert(fixture.runner_execution_status === 'not_run_by_this_packet', 'fixture confirms runner not run by packet');
assert(fixture.actual_30_scenario_external_validation_captured_count === 0, 'fixture preserves 0 captured');
assert(fixture.actual_30_scenario_external_validation_passed_count === 0, 'fixture preserves 0 passed');
assert(fixture.actual_30_scenario_external_validation_missing_count === 30, 'fixture preserves 30 missing');
assert(fixture.safety_status === 'demo_ready_with_live_automation_disabled', 'fixture preserves safety status');

assert(doc.includes('runner_stale_build_164_state_status: historical_only_not_current'), 'doc marks stale Build 164 state historical');
assert(doc.includes('runner_recognizes_build_177_post_run_blocked_stale_evidence: true'), 'doc recognizes Build 177');
assert(doc.includes('blocked_until_fresh_decision_approval_capture_and_fresh_pre_run_guard_after_build_178'), 'doc blocks future command until fresh chain');

assert(runner.includes('source_of_truth_commit: 084f039'), 'runner reports corrected source-of-truth state');
assert(runner.includes('runner_stale_build_164_state_status: historical_only_not_current'), 'runner marks Build 164 stale state historical');
assert(runner.includes('runner_recognizes_build_177_post_run_blocked_stale_evidence: true'), 'runner recognizes Build 177 stale evidence');
assert(runner.includes('future_command_status: blocked_until_fresh_decision_approval_capture_and_fresh_pre_run_guard_after_build_178'), 'runner blocks future command until fresh chain');
assert(runner.includes('actual_30_scenario_external_validation_captured_count: 0'), 'runner preserves 0 captured');
assert(runner.includes('actual_30_scenario_external_validation_passed_count: 0'), 'runner preserves 0 passed');
assert(runner.includes('actual_30_scenario_external_validation_missing_count: 30'), 'runner preserves 30 missing');
assert(runner.includes('exit 1'), 'runner remains fail-closed nonzero');

console.log('PASS: Build 178 runner state correction verifier passed.');
