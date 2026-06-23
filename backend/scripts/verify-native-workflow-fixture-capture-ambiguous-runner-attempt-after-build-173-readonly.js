#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_AMBIGUOUS_RUNNER_ATTEMPT_AFTER_BUILD_173.md');
const fixturePath = path.join(root, 'backend/fixtures/native-workflow-demo-roofer/capture-ambiguous-runner-attempt-after-build-173.json');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

assert(root === '/root/roofleadhq', 'running from Terminal 1 source-of-truth root');
assert(fs.existsSync(docPath), 'Build 174 doc exists');
assert(fs.existsSync(fixturePath), 'Build 174 fixture exists');

const doc = fs.readFileSync(docPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

assert(doc.includes('Build 174 evidence packet'), 'doc records Build 174');
assert(doc.includes('ambiguous_output_lost_due_to_terminal_exit_wrapper'), 'doc records ambiguous terminal-exit wrapper state');
assert(doc.includes('rerun_allowed_under_same_approval: false'), 'doc blocks rerun under same approval');
assert(doc.includes('actual_30_scenario_external_validation_captured_count: 0'), 'doc preserves 0 captured');
assert(doc.includes('actual_30_scenario_external_validation_passed_count: 0'), 'doc preserves 0 passed');
assert(doc.includes('actual_30_scenario_external_validation_missing_count: 30'), 'doc preserves 30 missing');
assert(doc.includes('demo_ready_with_live_automation_disabled'), 'doc preserves safety status');

assert(fixture.build_number === 174, 'fixture records Build 174');
assert(fixture.source_of_truth_commit_before_packet === '64faec4', 'fixture records source-of-truth commit');
assert(fixture.rerun_allowed_under_same_approval === false, 'fixture blocks rerun under same approval');
assert(fixture.actual_30_scenario_external_validation_captured_count === 0, 'fixture preserves 0 captured');
assert(fixture.actual_30_scenario_external_validation_passed_count === 0, 'fixture preserves 0 passed');
assert(fixture.actual_30_scenario_external_validation_missing_count === 30, 'fixture preserves 30 missing');
assert(fixture.safety_status === 'demo_ready_with_live_automation_disabled', 'fixture preserves safety status');

console.log('PASS: Build 174 ambiguous runner attempt evidence verifier passed.');
