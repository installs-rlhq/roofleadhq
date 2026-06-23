#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const expectedRoot =
  '/root/roofleadhq';
const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_DECISION_AFTER_BUILD_169_CORRECTION.md';
const approvalTemplatePath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_DECISION_AFTER_BUILD_169_CORRECTION_APPROVAL_TEMPLATE.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-after-build-169-correction.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-fresh-runner-decision-after-build-169-correction-dry-run.sh';
const priorBuild169FixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-state-correction-after-build-168-stale-evidence.json';
const forbiddenRunnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const verifierCommand =
  'node backend/scripts/verify-native-workflow-fixture-fresh-runner-decision-after-build-169-correction-readonly.js';

const expectedValues = {
  build_number: 170,
  source_of_truth_commit: '06ae3ce',
  prior_runner_state_correction_commit: '06ae3ce',
  prior_post_build_167_stale_evidence_commit: 'd43cf77',
  prior_build_167_fresh_guard_commit: 'e0be19f',
  prior_build_166_cleanup_commit: 'bc7ea24',
  prior_premature_runner_blocked_evidence_commit: '69fe9db',
  prior_invalid_guard_draft_commit_removed_by_cleanup: '44ccf16',
  prior_signed_approval_capture_commit: '50d66cc',
  prior_decision_template_commit: 'dfb932f',
  prior_runner_recognition_correction_commit: 'cf6d8c4',
  prior_post_build_161_blocked_evidence_commit: '3f97a7f',
  fresh_runner_execution_decision_status: 'created_review_only',
  fresh_runner_execution_approval_template_status: 'created_review_only_unsigned',
  fresh_runner_execution_approval_capture_status: 'not_captured',
  fresh_runner_execution_jason_signed_approval_status: 'not_signed',
  fresh_runner_execution_approval_status: 'not_granted',
  fresh_pre_run_guard_status: 'not_created_not_passed',
  runner_command_attempt_status: 'not_attempted_by_this_packet',
  runner_command_invoked_by_this_packet: false,
  runner_execution_status: 'not_run_by_this_packet',
  command_execution_status: 'not_run_by_this_packet',
  build_167_guard_reusable_after_build_168_stale_evidence: false,
  fresh_decision_required_after_build_169_correction: true,
  fresh_approval_capture_required_after_build_169_correction: true,
  fresh_pre_run_guard_required_after_build_169_correction: true,
  future_command_status:
    'blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_170_decision',
  runner_direct_invocation_status_after_decision_template: 'blocked_nonzero_expected',
  actual_30_scenario_external_validation_captured_count: 0,
  actual_30_scenario_external_validation_passed_count: 0,
  actual_30_scenario_external_validation_missing_count: 30,
  actual_30_scenario_external_validation_status: 'not_captured_by_this_run',
  safety_status: 'demo_ready_with_live_automation_disabled',
  controlled_test_roofer_e2e_status: 'review_only_not_approved_not_run',
  controlled_real_roofer_validation_allowed: false,
  approved_for_activation_now: false,
  exact_working_directory: '/root/roofleadhq',
  exact_command:
    'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_runner_path:
    'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_manifest_path:
    'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  exact_scenario_count: 30,
  approval_scope:
    'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_169_correction_decision_and_future_fresh_guard'
};

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

function slug(value) {
  return String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 100);
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) fail(label + ' missing: ' + needle);
  pass(slug(label) + '_contains_' + slug(needle));
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) fail(label + ' must not contain: ' + needle);
  pass(slug(label) + '_omits_' + slug(needle));
}

function expectEq(obj, key, value) {
  if (obj[key] !== value) {
    fail('fixture ' + key + ' expected ' + value + ' got ' + obj[key]);
  }
  pass(key + '_' + slug(value));
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

console.log('== Build 170 Fresh Runner Decision After Build 169 Correction Verification ==');

if (root !== expectedRoot) fail('repo root mismatch: ' + root);
pass('expected_worktree_root_' + slug(expectedRoot));

const packetDoc = read(packetDocPath);
const approvalTemplate = read(approvalTemplatePath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const priorBuild169 = readJson(priorBuild169FixturePath);

mustHave(packetDoc, 'Native Workflow Fixture Fresh Runner Decision After Build 169 Correction', 'packet doc');
mustHave(packetDoc, 'build_number | 170', 'packet doc');
mustHave(packetDoc, 'source_of_truth_commit | 06ae3ce', 'packet doc');
mustHave(packetDoc, 'test(workflow): add build 169 runner state correction packet', 'packet doc');
mustHave(packetDoc, 'No approval is captured by this packet.', 'packet doc');
mustHave(packetDoc, 'No fresh guard is created or passed by this packet.', 'packet doc');
mustHave(packetDoc, 'The actual runner is not run or invoked by this packet.', 'packet doc');
mustHave(packetDoc, 'Build 167 guard is not reusable after Build 168 stale evidence', 'packet doc');
mustHave(packetDoc, 'Jason must separately sign the exact approval values before any future fresh guard.', 'packet doc');
mustHave(packetDoc, 'A future fresh guard must be created and passed after signed approval before one future exact runner attempt.', 'packet doc');
mustHave(packetDoc, 'Actual validation remains `0 captured / 0 passed / 30 missing`.', 'packet doc');
mustHave(packetDoc, 'safety_status | demo_ready_with_live_automation_disabled', 'packet doc');
mustHave(packetDoc, 'future_command_status | blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_170_decision', 'packet doc');

mustHave(approvalTemplate, 'Signature Block', 'approval template');
mustHave(approvalTemplate, 'Jason signature: ______________________________', 'approval template');
mustHave(approvalTemplate, 'This signature block is intentionally blank.', 'approval template');
mustHave(approvalTemplate, 'fresh_runner_execution_approval_capture_status | not_captured', 'approval template');
mustHave(approvalTemplate, 'fresh_runner_execution_jason_signed_approval_status | not_signed', 'approval template');
mustHave(approvalTemplate, 'fresh_runner_execution_approval_status | not_granted', 'approval template');
mustHave(approvalTemplate, 'runner_command_invoked_by_this_packet | false', 'approval template');

for (const [key, value] of Object.entries(expectedValues)) expectEq(fixture, key, value);

expectEq(fixture, 'packet_name', 'Native Workflow Fixture Fresh Runner Decision After Build 169 Correction');
expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'fresh_runner_decision_after_build_169_correction_review_only');
expectEq(fixture, 'packet_type', 'fresh_runner_execution_decision_approval_template_after_build_169_correction');
expectFalse(fixture, 'is_guard_packet');
expectFalse(fixture, 'fresh_pre_run_guard_created_by_this_packet');
expectFalse(fixture, 'fresh_pre_run_guard_passed_by_this_packet');
expectFalse(fixture, 'actual_external_sandbox_30_scenario_validation_invoked_by_this_packet');
expectTrue(fixture, 'approval_template_unsigned');
expectFalse(fixture, 'approval_capture_by_this_packet');
expectFalse(fixture, 'jason_signed_approval_captured_by_this_packet');
expectFalse(fixture, 'controlled_test_roofer_e2e_approved');
expectFalse(fixture, 'controlled_test_roofer_e2e_run_by_this_packet');
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

expectEq(priorBuild169, 'build_number', 169);
expectEq(priorBuild169, 'source_of_truth_commit', 'd43cf77');
expectEq(priorBuild169, 'runner_state_correction_status', 'corrected_review_only');
expectEq(priorBuild169, 'runner_execution_status', 'not_run_by_this_packet');
expectFalse(priorBuild169, 'runner_command_invoked_by_this_packet');
expectEq(priorBuild169, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(priorBuild169, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(priorBuild169, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(priorBuild169, 'safety_status', 'demo_ready_with_live_automation_disabled');
pass('build_169_correction_recognized_as_prior_source_of_truth_commit_06ae3ce_by_build_170_fixture');

for (const [key, value] of Object.entries({
  exact_working_directory: expectedValues.exact_working_directory,
  exact_command: expectedValues.exact_command,
  exact_runner_path: expectedValues.exact_runner_path,
  exact_manifest_path: expectedValues.exact_manifest_path,
  exact_scenario_count: expectedValues.exact_scenario_count,
  approval_scope: expectedValues.approval_scope
})) {
  mustHave(packetDoc, key + ' | ' + value, 'packet doc');
  mustHave(approvalTemplate, key + ' | ' + value, 'approval template');
}

if (!Array.isArray(fixture.build_170_assertions) || fixture.build_170_assertions.length !== 21) {
  fail('build_170_assertions must contain 21 entries');
}
for (const assertion of fixture.build_170_assertions) pass('build_170_assertion_' + assertion);

if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');
mustHave(wrapper, 'Build 170 review-only decision/template; this wrapper does not run the actual runner, capture approval, or create a guard.', 'wrapper');
mustHave(wrapper, verifierCommand, 'wrapper');
mustNotHave(wrapper, 'bash ' + forbiddenRunnerPath, 'wrapper');

const combined = [
  packetDoc,
  approvalTemplate,
  JSON.stringify(fixture, null, 2)
].join('\n');
const forbidden = [
  '"is_guard_packet": true',
  '"approval_capture_by_this_packet": true',
  '"jason_signed_approval_captured_by_this_packet": true',
  '"fresh_pre_run_guard_created_by_this_packet": true',
  '"fresh_pre_run_guard_passed_by_this_packet": true',
  '"runner_command_invoked_by_this_packet": true',
  '"actual_external_sandbox_30_scenario_validation_invoked_by_this_packet": true',
  '"actual_30_scenario_external_validation_captured_count": 30',
  '"actual_30_scenario_external_validation_passed_count": 30',
  '"actual_30_scenario_external_validation_missing_count": 0',
  '"controlled_real_roofer_validation_allowed": true',
  '"external_calls_made_by_this_packet": true',
  '"credentials_accessed_by_this_packet": true',
  '"production_data_accessed_by_this_packet": true',
  '"production_supabase_data_written_by_this_packet": true',
  '"schema_auth_rls_security_modified_by_this_packet": true',
  '"live_automation_enabled_by_this_packet": true',
  '"real_homeowner_contact_made_by_this_packet": true',
  '"real_roofer_contact_made_by_this_packet": true',
  '"sms_email_calls_calendar_booking_performed_by_this_packet": true',
  '"billing_payment_deposit_quote_estimate_invoice_automation_performed_by_this_packet": true',
  '"public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet": true',
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
  '| runner_command_invoked_by_this_packet | true |',
  '| actual_30_scenario_external_validation_captured_count | 30 |',
  '| actual_30_scenario_external_validation_passed_count | 30 |',
  '| actual_30_scenario_external_validation_missing_count | 0 |'
];
for (const pattern of forbidden) mustNotHave(combined, pattern, 'Build 170 packet');
pass('no_live_external_production_activation_flags_detected');

mustHave(packetDoc, 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_DECISION_AFTER_BUILD_169_CORRECTION_APPROVAL_TEMPLATE.md', 'packet doc');
mustHave(packetDoc, 'No live/external/production behavior is activated.', 'packet doc');
mustHave(approvalTemplate, 'Approval is not captured by this template.', 'approval template');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log(
  'PASS: Native Workflow Fixture Fresh Runner Decision After Build 169 Correction verified (' +
    passCount +
    ' assertions).'
);
