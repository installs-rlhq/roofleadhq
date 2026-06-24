#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_PRE_RUN_GUARD_AFTER_BUILD_175_SIGNED_APPROVAL_CAPTURE.md');
const fixturePath = path.join(root, 'backend/fixtures/native-workflow-demo-roofer/fresh-pre-run-guard-after-build-175-signed-approval-capture.json');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

assert(root === '/root/roofleadhq', 'running from Terminal 1 source-of-truth root');
assert(fs.existsSync(docPath), 'Build 176 guard doc exists');
assert(fs.existsSync(fixturePath), 'Build 176 guard fixture exists');

const doc = fs.readFileSync(docPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

assert(doc.includes('Build 176 fresh pre-run guard packet'), 'doc records Build 176');
assert(doc.includes('fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_174_ambiguous_attempt_capture_and_future_fresh_guard'), 'doc records fresh approval scope');
assert(doc.includes('fresh_pre_run_guard_status: passed_by_this_packet'), 'doc records guard passed');
assert(doc.includes('runner_command_attempt_status: not_attempted_by_this_packet'), 'doc confirms runner not attempted');
assert(doc.includes('runner_execution_status: not_run_by_this_packet'), 'doc confirms runner not run');
assert(doc.includes('no terminal-closing exit statement'), 'doc records corrected wrapper requirement');
assert(doc.includes('actual_30_scenario_external_validation_captured_count: 0'), 'doc preserves 0 captured');
assert(doc.includes('actual_30_scenario_external_validation_passed_count: 0'), 'doc preserves 0 passed');
assert(doc.includes('actual_30_scenario_external_validation_missing_count: 30'), 'doc preserves 30 missing');
assert(doc.includes('demo_ready_with_live_automation_disabled'), 'doc preserves safety status');
assert(doc.includes('ready_only_after_build_176_committed_pushed_fetched_source_of_truth_verified_and_final_git_status_blank'), 'doc requires clean closeout before runner');

assert(fixture.build_number === 176, 'fixture records Build 176');
assert(fixture.source_of_truth_commit_before_packet === '5ed0089', 'fixture records source-of-truth commit');
assert(fixture.prior_signed_approval_capture_commit === '5ed0089', 'fixture records Build 175 commit');
assert(fixture.approval_capture_status === 'captured_signed', 'fixture records signed approval captured');
assert(fixture.fresh_pre_run_guard_status === 'passed_by_this_packet', 'fixture records guard passed');
assert(fixture.fresh_pre_run_guard_result === 'pass', 'fixture records guard result pass');
assert(fixture.runner_command_attempt_status === 'not_attempted_by_this_packet', 'fixture confirms runner not attempted');
assert(fixture.runner_execution_status === 'not_run_by_this_packet', 'fixture confirms runner not run');
assert(fixture.actual_30_scenario_external_validation_captured_count === 0, 'fixture preserves 0 captured');
assert(fixture.actual_30_scenario_external_validation_passed_count === 0, 'fixture preserves 0 passed');
assert(fixture.actual_30_scenario_external_validation_missing_count === 30, 'fixture preserves 30 missing');
assert(fixture.future_command_status === 'ready_only_after_build_176_committed_pushed_fetched_source_of_truth_verified_and_final_git_status_blank', 'fixture requires clean closeout before runner');
assert(fixture.safety_status === 'demo_ready_with_live_automation_disabled', 'fixture preserves safety status');

console.log('PASS: Build 176 fresh pre-run guard verifier passed.');
