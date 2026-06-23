#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_FRESH_SIGNED_RUNNER_APPROVAL_AFTER_BUILD_174.md');
const fixturePath = path.join(root, 'backend/fixtures/native-workflow-demo-roofer/capture-fresh-signed-runner-approval-after-build-174.json');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

assert(root === '/root/roofleadhq', 'running from Terminal 1 source-of-truth root');
assert(fs.existsSync(docPath), 'Build 175 approval capture doc exists');
assert(fs.existsSync(fixturePath), 'Build 175 approval capture fixture exists');

const doc = fs.readFileSync(docPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

assert(doc.includes('Build 175 approval capture packet'), 'doc records Build 175');
assert(doc.includes('fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_174_ambiguous_attempt_capture_and_future_fresh_guard'), 'doc records fresh approval scope');
assert(doc.includes('Corrected execution wrapper requirement'), 'doc records corrected wrapper requirement');
assert(doc.includes('without any terminal-closing `exit` statement'), 'doc blocks terminal-closing exit');
assert(doc.includes('fresh_pre_run_guard_status: not_created_not_passed_by_this_packet'), 'doc confirms no guard in this packet');
assert(doc.includes('runner_command_attempt_status: not_attempted_by_this_packet'), 'doc confirms runner not attempted');
assert(doc.includes('actual_30_scenario_external_validation_captured_count: 0'), 'doc preserves 0 captured');
assert(doc.includes('actual_30_scenario_external_validation_passed_count: 0'), 'doc preserves 0 passed');
assert(doc.includes('actual_30_scenario_external_validation_missing_count: 30'), 'doc preserves 30 missing');
assert(doc.includes('demo_ready_with_live_automation_disabled'), 'doc preserves safety status');

assert(fixture.build_number === 175, 'fixture records Build 175');
assert(fixture.source_of_truth_commit_before_packet === 'a67205c', 'fixture records source-of-truth commit');
assert(fixture.approval_capture_status === 'captured_signed', 'fixture records captured signed approval');
assert(fixture.jason_signed_approval_status === 'signed', 'fixture records Jason signed');
assert(fixture.fresh_pre_run_guard_status === 'not_created_not_passed_by_this_packet', 'fixture confirms no guard');
assert(fixture.runner_command_attempt_status === 'not_attempted_by_this_packet', 'fixture confirms runner not attempted');
assert(fixture.runner_execution_status === 'not_run_by_this_packet', 'fixture confirms runner not run');
assert(fixture.actual_30_scenario_external_validation_captured_count === 0, 'fixture preserves 0 captured');
assert(fixture.actual_30_scenario_external_validation_passed_count === 0, 'fixture preserves 0 passed');
assert(fixture.actual_30_scenario_external_validation_missing_count === 30, 'fixture preserves 30 missing');
assert(fixture.safety_status === 'demo_ready_with_live_automation_disabled', 'fixture preserves safety status');
assert(fixture.future_command_status === 'blocked_until_fresh_pre_run_guard_after_build_175_signed_approval_capture', 'fixture blocks future command until guard');

console.log('PASS: Build 175 fresh signed approval capture verifier passed.');
