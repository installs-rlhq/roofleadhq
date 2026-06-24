#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_DECISION_AFTER_BUILD_178_CORRECTION.md');
const fixturePath = path.join(root, 'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-after-build-178-correction.json');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

assert(root === '/root/roofleadhq', 'running from Terminal 1 source-of-truth root');
assert(fs.existsSync(docPath), 'Build 179 decision doc exists');
assert(fs.existsSync(fixturePath), 'Build 179 decision fixture exists');

const doc = fs.readFileSync(docPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

assert(fixture.build_number === 179, 'fixture records Build 179');
assert(fixture.source_of_truth_commit_before_packet === 'dc7d570', 'fixture records source-of-truth commit');
assert(fixture.prior_runner_state_correction_commit === 'dc7d570', 'fixture records Build 178 correction');
assert(fixture.approval_template_status === 'template_only_not_signed_not_captured_not_granted', 'fixture keeps approval template unsigned');
assert(fixture.jason_signed_approval_status === 'not_signed', 'fixture keeps Jason approval unsigned');
assert(fixture.approval_capture_status === 'not_captured', 'fixture confirms approval not captured');
assert(fixture.fresh_pre_run_guard_status === 'not_created_not_passed', 'fixture confirms no guard');
assert(fixture.runner_command_attempt_status === 'not_attempted_by_this_packet', 'fixture confirms runner not attempted');
assert(fixture.runner_execution_status === 'not_run_by_this_packet', 'fixture confirms runner not run');
assert(fixture.actual_30_scenario_external_validation_captured_count === 0, 'fixture preserves 0 captured');
assert(fixture.actual_30_scenario_external_validation_passed_count === 0, 'fixture preserves 0 passed');
assert(fixture.actual_30_scenario_external_validation_missing_count === 30, 'fixture preserves 30 missing');
assert(fixture.safety_status === 'demo_ready_with_live_automation_disabled', 'fixture preserves safety status');

assert(doc.includes('Build 179 decision / approval template packet'), 'doc records Build 179');
assert(doc.includes('review_only_no_go_until_signed_approval_and_guard'), 'doc records review-only NO-GO');
assert(doc.includes('template_only_not_signed_not_captured_not_granted'), 'doc keeps approval unsigned');
assert(doc.includes('fresh_pre_run_guard_status: not_created_not_passed'), 'doc confirms no guard');
assert(doc.includes('runner_command_attempt_status: not_attempted_by_this_packet'), 'doc confirms runner not attempted');
assert(doc.includes('Corrected execution wrapper requirement'), 'doc includes corrected wrapper requirement');
assert(doc.includes('Signed date/time:\n<current chat date/time MST>'), 'doc includes unsigned approval placeholder');

console.log('PASS: Build 179 fresh runner decision after Build 178 correction verifier passed.');
