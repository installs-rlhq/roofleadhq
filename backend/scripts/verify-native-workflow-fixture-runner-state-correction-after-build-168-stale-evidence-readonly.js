#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const expectedRoot =
  '/root/roofleadhq-worktrees/native-workflow-fixture-runner-state-correction-after-build-168-stale-evidence';
const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_STATE_CORRECTION_AFTER_BUILD_168_STALE_EVIDENCE.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-state-correction-after-build-168-stale-evidence.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-runner-state-correction-after-build-168-stale-evidence-dry-run.sh';
const priorBuild168FixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-167-runner-blocked-stale-evidence.json';
const forbiddenRunnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const verifierCommand =
  'node backend/scripts/verify-native-workflow-fixture-runner-state-correction-after-build-168-stale-evidence-readonly.js';

let passCount = 0;

function pass(name) {
  passCount += 1;
  console.log('PASS: ' + name);
}

function fail(message) {
  console.error('FAIL: ' + message);
  process.exit(1);
}

function fullPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) fail(label + ' missing: ' + needle);
  pass(label.replace(/[^a-z0-9]+/gi, '_').toLowerCase() + '_contains_' + needle.replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 80));
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) fail(label + ' must not contain: ' + needle);
  pass(label.replace(/[^a-z0-9]+/gi, '_').toLowerCase() + '_omits_' + needle.replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 80));
}

function expectEq(obj, key, value) {
  if (obj[key] !== value) fail('fixture ' + key + ' expected ' + value + ' got ' + obj[key]);
  pass(key + '_' + String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}

function expectFalse(obj, key) {
  expectEq(obj, key, false);
}

function expectTrue(obj, key) {
  expectEq(obj, key, true);
}

function isExecutable(rel) {
  try {
    fs.accessSync(fullPath(rel), fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

console.log('== Build 169 Runner State Correction After Build 168 Stale Evidence Verification ==');

if (root !== expectedRoot) fail('repo root mismatch: ' + root);
pass('expected_worktree_root_' + expectedRoot.replace(/[^a-z0-9]+/gi, '_').toLowerCase());

const doc = read(packetDocPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const priorBuild168 = readJson(priorBuild168FixturePath);

mustHave(doc, 'Native Workflow Fixture Runner State Correction After Build 168 Stale Evidence', 'packet doc');
mustHave(doc, 'build_number | 169', 'packet doc');
mustHave(doc, 'source_of_truth_commit | d43cf77', 'packet doc');
mustHave(doc, 'test(workflow): capture build 168 post guard stale runner evidence', 'packet doc');
mustHave(doc, 'Review-only correction.', 'packet doc');
mustHave(doc, 'No approval capture.', 'packet doc');
mustHave(doc, 'No fresh guard.', 'packet doc');
mustHave(doc, 'No runner execution.', 'packet doc');
mustHave(doc, 'Actual validation remains `0 captured / 0 passed / 30 missing`.', 'packet doc');
mustHave(doc, 'safety_status | demo_ready_with_live_automation_disabled', 'packet doc');
mustHave(doc, 'runner_command_invoked_by_this_packet | false', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(doc, 'This packet does not authorize or prepare an immediate runner rerun.', 'packet doc');

expectEq(fixture, 'packet_name', 'Native Workflow Fixture Runner State Correction After Build 168 Stale Evidence');
expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'runner_state_correction_after_build_168_stale_evidence_review_only');
expectEq(fixture, 'packet_type', 'runner_state_correction_after_build_168_stale_evidence');
expectFalse(fixture, 'is_guard_packet');
expectEq(fixture, 'build_number', 169);
expectEq(fixture, 'source_of_truth_commit', 'd43cf77');
expectEq(fixture, 'source_of_truth_label', 'test(workflow): capture build 168 post guard stale runner evidence');
expectEq(fixture, 'prior_build_168_stale_evidence_commit', 'd43cf77');
expectEq(fixture, 'runner_state_correction_status', 'corrected_review_only');
expectEq(fixture, 'runner_state_correction_scope', 'review_only_correction_after_build_168_stale_evidence');
expectEq(fixture, 'approval_capture_status', 'not_captured_by_this_packet');
expectFalse(fixture, 'approval_capture_by_this_packet');
expectEq(fixture, 'fresh_guard_status', 'not_created_not_passed_by_this_packet');
expectFalse(fixture, 'fresh_guard_created_by_this_packet');
expectFalse(fixture, 'fresh_guard_passed_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectFalse(fixture, 'runner_command_invoked_by_this_packet');
expectFalse(fixture, 'runner_command_rerun_by_this_packet');
expectFalse(fixture, 'actual_external_sandbox_30_scenario_validation_invoked_by_this_packet');
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectTrue(fixture, 'prior_build_168_runner_output_stale');
expectEq(fixture, 'prior_build_168_runner_command_exit_status', 'nonzero_blocked');
expectFalse(fixture, 'prior_build_168_runner_recognized_build_165_signed_approval_capture');
expectFalse(fixture, 'prior_build_168_runner_recognized_build_167_fresh_guard');
expectTrue(fixture, 'consumed_stale_attempt_remains_historical_evidence_only');
expectEq(fixture, 'future_runner_attempt_status', 'blocked_until_future_valid_approval_capture_and_fresh_guard_if_requested');
expectEq(fixture, 'controlled_test_roofer_e2e_status', 'review_only_not_approved_not_run');
expectFalse(fixture, 'controlled_test_roofer_e2e_approved');
expectFalse(fixture, 'controlled_test_roofer_e2e_run_by_this_packet');
expectFalse(fixture, 'controlled_real_roofer_validation_allowed');
expectFalse(fixture, 'external_calls_made_by_this_packet');
expectFalse(fixture, 'credentials_accessed_by_this_packet');
expectFalse(fixture, 'secret_values_logged_by_this_packet');
expectFalse(fixture, 'production_data_accessed_by_this_packet');
expectFalse(fixture, 'production_supabase_data_written_by_this_packet');
expectFalse(fixture, 'schema_auth_rls_security_modified_by_this_packet');
expectFalse(fixture, 'live_automation_enabled_by_this_packet');
expectFalse(fixture, 'real_homeowner_contact_made_by_this_packet');
expectFalse(fixture, 'real_roofer_contact_made_by_this_packet');
expectFalse(fixture, 'sms_email_calls_calendar_booking_performed_by_this_packet');
expectFalse(fixture, 'billing_payment_deposit_quote_estimate_invoice_automation_performed_by_this_packet');
expectFalse(fixture, 'public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet');
expectEq(fixture, 'production_data_access_approval_status', 'not_granted');
expectEq(fixture, 'production_supabase_write_approval_status', 'not_granted');
expectEq(fixture, 'schema_auth_rls_security_change_approval_status', 'not_granted');
expectEq(fixture, 'live_activation_approval_status', 'not_granted');
expectEq(fixture, 'real_homeowner_contact_approval_status', 'not_granted');
expectEq(fixture, 'real_roofer_contact_approval_status', 'not_granted');
expectEq(fixture, 'sms_email_calls_calendar_booking_approval_status', 'not_granted');
expectEq(fixture, 'billing_payment_automation_approval_status', 'not_granted');
expectEq(fixture, 'public_live_automation_approval_status', 'not_granted');
expectFalse(fixture, 'approved_for_activation_now');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');

expectEq(priorBuild168, 'build_number', 168);
expectEq(priorBuild168, 'source_of_truth_commit_before_attempt', 'e0be19f');
expectTrue(priorBuild168, 'runner_output_stale_after_build_167_guard');
expectEq(priorBuild168, 'runner_command_exit_status', 'nonzero_blocked');
expectFalse(priorBuild168, 'runner_recognized_build_165_signed_approval_capture');
expectFalse(priorBuild168, 'runner_recognized_build_167_fresh_guard');
expectEq(priorBuild168, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(priorBuild168, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(priorBuild168, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(priorBuild168, 'safety_status', 'demo_ready_with_live_automation_disabled');
pass('prior_build_168_stale_evidence_source_of_truth_read');

if (!Array.isArray(fixture.build_169_assertions) || fixture.build_169_assertions.length !== 10) {
  fail('build_169_assertions must contain 10 entries');
}
for (const assertion of fixture.build_169_assertions) pass('build_169_assertion_' + assertion);

if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');
mustHave(wrapper, 'Build 169 runner-state correction only; this wrapper does not run the actual runner, capture approval, or create a guard.', 'wrapper');
mustHave(wrapper, verifierCommand, 'wrapper');
mustNotHave(wrapper, 'bash ' + forbiddenRunnerPath, 'wrapper');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
const forbidden = [
  '"is_guard_packet": true',
  '"approval_capture_by_this_packet": true',
  '"fresh_guard_created_by_this_packet": true',
  '"fresh_guard_passed_by_this_packet": true',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"actual_external_sandbox_30_scenario_validation_invoked_by_this_packet": true',
  '"actual_30_scenario_external_validation_captured_count": 30',
  '"actual_30_scenario_external_validation_passed_count": 30',
  '"actual_30_scenario_external_validation_missing_count": 0',
  '"production_data_access_approval_status": "granted"',
  '"production_supabase_write_approval_status": "granted"',
  '"schema_auth_rls_security_change_approval_status": "granted"',
  '"live_activation_approval_status": "granted"',
  '"real_homeowner_contact_approval_status": "granted"',
  '"real_roofer_contact_approval_status": "granted"',
  '"sms_email_calls_calendar_booking_approval_status": "granted"',
  '"billing_payment_automation_approval_status": "granted"',
  '"public_live_automation_approval_status": "granted"',
  '"approved_for_activation_now": true',
  '| is_guard_packet | true |',
  '| runner_command_invoked_by_this_packet | true |',
  '| actual_30_scenario_external_validation_captured_count | 30 |',
  '| actual_30_scenario_external_validation_passed_count | 30 |',
  '| actual_30_scenario_external_validation_missing_count | 0 |'
];
for (const pattern of forbidden) mustNotHave(combined, pattern, 'Build 169 packet');
pass('no_approval_guard_runner_execution_or_activation_flags_detected');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Native Workflow Fixture Runner State Correction After Build 168 Stale Evidence verified (' + passCount + ' assertions).');
