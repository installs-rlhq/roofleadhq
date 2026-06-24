#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_176_RUNNER_BLOCKED_STALE_EVIDENCE.md');
const fixturePath = path.join(root, 'backend/fixtures/native-workflow-demo-roofer/capture-post-build-176-runner-blocked-stale-evidence.json');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

assert(root === '/root/roofleadhq', 'running from Terminal 1 source-of-truth root');
assert(fs.existsSync(docPath), 'Build 177 evidence doc exists');
assert(fs.existsSync(fixturePath), 'Build 177 evidence fixture exists');

const doc = fs.readFileSync(docPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const logPath = path.join(root, fixture.runner_log_path);

assert(fs.existsSync(logPath), 'captured runner log exists');

const log = fs.readFileSync(logPath, 'utf8');

assert(fixture.build_number === 177, 'fixture records Build 177');
assert(fixture.source_of_truth_commit_before_packet === 'cc6d827', 'fixture records Build 176 source-of-truth commit');
assert(fixture.runner_command_attempt_status === 'attempted_once_after_build_176', 'fixture records one attempt');
assert(fixture.runner_exit_status === 1, 'fixture records exit status 1');
assert(fixture.runner_result === 'blocked_nonzero_stale_state', 'fixture records blocked stale result');
assert(fixture.runner_reported_source_of_truth_commit === 'cf6d8c4', 'fixture records stale cf6d8c4 state');
assert(fixture.runner_rerun_allowed_under_same_approval === false, 'fixture blocks rerun under same approval');
assert(fixture.actual_30_scenario_external_validation_captured_count === 0, 'fixture preserves 0 captured');
assert(fixture.actual_30_scenario_external_validation_passed_count === 0, 'fixture preserves 0 passed');
assert(fixture.actual_30_scenario_external_validation_missing_count === 30, 'fixture preserves 30 missing');
assert(fixture.safety_status === 'demo_ready_with_live_automation_disabled', 'fixture preserves safety status');

assert(doc.includes('runner_result: blocked_nonzero_stale_state'), 'doc records blocked stale result');
assert(doc.includes('runner_rerun_allowed_under_same_approval: false'), 'doc blocks rerun');
assert(log.includes('source_of_truth_commit: cf6d8c4'), 'runner log captures stale cf6d8c4 output');
assert(log.includes('Build 164 decision/template status'), 'runner log captures stale Build 164 state');
assert(log.includes('EXIT: non-zero (blocked)'), 'runner log captures blocked nonzero exit');

console.log('PASS: Build 177 post-Build-176 runner blocked/stale evidence verifier passed.');
