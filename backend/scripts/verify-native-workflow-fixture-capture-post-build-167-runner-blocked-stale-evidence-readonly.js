#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_167_RUNNER_BLOCKED_STALE_EVIDENCE.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-post-build-167-runner-blocked-stale-evidence.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-capture-post-build-167-runner-blocked-stale-evidence-dry-run.sh';
const build167GuardFixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-pre-run-guard-after-build-166-blocked-evidence-cleanup.json';
const build166BlockedFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-premature-runner-command-blocked-before-guard-closeout.json';
const approvalFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-164.json';
const decisionFixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-and-approval-template-after-build-163-correction.json';
const recognitionFixturePath = 'backend/fixtures/native-workflow-demo-roofer/correct-current-runner-recognition-and-test-roofer-e2e-readiness.json';
const blockedEvidenceFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-post-build-161-runner-command-blocked-evidence.json';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const title = 'Native Workflow Fixture Capture Post Build 167 Runner Blocked Stale Evidence';
const normalizedTitle = 'native workflow fixture capture post build 167 runner blocked stale evidence';
const verifierCommand = 'node backend/scripts/verify-native-workflow-fixture-capture-post-build-167-runner-blocked-stale-evidence-readonly.js';
const exactAttemptedCommand = 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const exactRunnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const staleFutureCommand = 'blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_164';

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
  if (!fs.existsSync(fullPath(rel))) fail('missing file: ' + rel);
  return fs.readFileSync(fullPath(rel), 'utf8');
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

console.log('== Build 168 Post Build 167 Runner Blocked Stale Evidence Verification ==');

const doc = read(packetDocPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const build167Guard = readJson(build167GuardFixturePath);
readJson(build166BlockedFixturePath);
const approval = readJson(approvalFixturePath);
readJson(decisionFixturePath);
readJson(recognitionFixturePath);
readJson(blockedEvidenceFixturePath);
const aggregate = read(aggregateReadinessPath);
const index = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgent = read(contextAgentPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'build_number | 168', 'packet doc');
mustHave(doc, 'source_of_truth_commit_before_attempt | e0be19f', 'packet doc');
mustHave(doc, 'latest_closed_commit_before_attempt | e0be19f', 'packet doc');
mustHave(doc, 'prior_build_167_fresh_guard_commit | e0be19f', 'packet doc');
mustHave(doc, 'prior_build_166_cleanup_commit | bc7ea24', 'packet doc');
mustHave(doc, 'prior_premature_runner_blocked_evidence_commit | 69fe9db', 'packet doc');
mustHave(doc, 'prior_invalid_guard_draft_commit_removed_by_cleanup | 44ccf16', 'packet doc');
mustHave(doc, 'prior_signed_approval_capture_commit | 50d66cc', 'packet doc');
mustHave(doc, 'prior_decision_template_commit | dfb932f', 'packet doc');
mustHave(doc, 'prior_runner_recognition_correction_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'prior_post_build_161_blocked_evidence_commit | 3f97a7f', 'packet doc');
mustHave(doc, 'post_build_167_runner_command_attempt_status | attempted_blocked_nonzero_or_treated_as_consumed_from_pasted_log', 'packet doc');
mustHave(doc, 'runner_command_exit_status | nonzero_blocked', 'packet doc');
mustHave(doc, 'runner_reported_source_of_truth_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'runner_reported_prior_runner_recognition_correction_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'runner_reported_prior_post_build_161_blocked_evidence_commit | 3f97a7f', 'packet doc');
mustHave(doc, 'runner_reported_prior_fresh_execution_pre_run_guard_commit | dd05289', 'packet doc');
mustHave(doc, 'runner_reported_prior_approval_capture_commit | 46ca819', 'packet doc');
mustHave(doc, 'runner_reported_prior_fresh_decision_commit | 0eefaf3', 'packet doc');
mustHave(doc, 'runner_reported_prior_runner_execution_path_commit | 28b6413', 'packet doc');
mustHave(doc, 'runner_reported_jason_signed_approval_status | not_signed', 'packet doc');
mustHave(doc, 'runner_reported_approval_capture_status | not_captured', 'packet doc');
mustHave(doc, 'runner_reported_fresh_pre_run_guard_status | not_created_not_passed', 'packet doc');
mustHave(doc, `runner_reported_future_command_status | ${staleFutureCommand}`, 'packet doc');
mustHave(doc, 'runner_output_stale_after_build_167_guard | true', 'packet doc');
mustHave(doc, 'runner_recognized_build_165_signed_approval_capture | false', 'packet doc');
mustHave(doc, 'runner_recognized_build_167_fresh_guard | false', 'packet doc');
mustHave(doc, 'runner_command_rerun_allowed | false', 'packet doc');
mustHave(doc, 'fresh_correction_required_after_build_168_blocked_evidence | true', 'packet doc');
mustHave(doc, 'future_runner_attempt_status | blocked_until_runner_state_correction_and_new_approval_guard_chain', 'packet doc');
mustHave(doc, 'runner_execution_status | not_run_validation_blocked_nonzero', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_status | not_captured_by_this_run', 'packet doc');
mustHave(doc, 'safety_status | demo_ready_with_live_automation_disabled', 'packet doc');
mustHave(doc, 'controlled_test_roofer_e2e_status | review_only_not_approved_not_run', 'packet doc');
mustHave(doc, 'controlled_real_roofer_validation_allowed | false', 'packet doc');
mustHave(doc, 'Build 167 fresh guard closed at `e0be19f`', 'packet doc');
mustHave(doc, 'The runner output still reported stale `cf6d8c4` / Build 164 template-only state.', 'packet doc');
mustHave(doc, 'A new correction packet is required before any future approval, guard, or attempt chain.', 'packet doc');
mustHave(doc, 'does **not** create or pass a new guard', 'packet doc');

expectEq(fixture, 'packet_name', title);
expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'capture_post_build_167_runner_blocked_stale_evidence_review_only');
expectEq(fixture, 'packet_type', 'blocked_stale_runner_evidence_capture');
expectFalse(fixture, 'is_guard_packet');
expectEq(fixture, 'build_number', 168);
expectEq(fixture, 'source_of_truth_commit_before_attempt', 'e0be19f');
expectEq(fixture, 'latest_closed_commit_before_attempt', 'e0be19f');
expectEq(fixture, 'prior_build_167_fresh_guard_commit', 'e0be19f');
expectEq(fixture, 'prior_build_166_cleanup_commit', 'bc7ea24');
expectEq(fixture, 'prior_premature_runner_blocked_evidence_commit', '69fe9db');
expectEq(fixture, 'prior_invalid_guard_draft_commit_removed_by_cleanup', '44ccf16');
expectEq(fixture, 'prior_signed_approval_capture_commit', '50d66cc');
expectEq(fixture, 'prior_decision_template_commit', 'dfb932f');
expectEq(fixture, 'prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectTrue(fixture, 'build_167_fresh_guard_closed');
expectEq(fixture, 'build_167_fresh_guard_closed_commit', 'e0be19f');
expectEq(fixture, 'terminal_1_head_equals_origin_main_commit', 'e0be19f');
expectTrue(fixture, 'terminal_1_final_git_status_blank');
expectEq(fixture, 'post_build_167_runner_command_attempt_status', 'attempted_blocked_nonzero_or_treated_as_consumed_from_pasted_log');
expectEq(fixture, 'runner_command_exit_status', 'nonzero_blocked');
expectEq(fixture, 'attempted_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command_attempted', exactAttemptedCommand);
expectEq(fixture, 'runner_reported_source_of_truth_commit', 'cf6d8c4');
expectEq(fixture, 'runner_reported_prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'runner_reported_prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'runner_reported_prior_fresh_execution_pre_run_guard_commit', 'dd05289');
expectEq(fixture, 'runner_reported_prior_approval_capture_commit', '46ca819');
expectEq(fixture, 'runner_reported_prior_fresh_decision_commit', '0eefaf3');
expectEq(fixture, 'runner_reported_prior_runner_execution_path_commit', '28b6413');
expectEq(fixture, 'runner_reported_build_164_status', 'decision_template_status_only');
expectEq(fixture, 'runner_reported_jason_signed_approval_status', 'not_signed');
expectEq(fixture, 'runner_reported_approval_capture_status', 'not_captured');
expectEq(fixture, 'runner_reported_fresh_pre_run_guard_status', 'not_created_not_passed');
expectEq(fixture, 'runner_reported_future_command_status', staleFutureCommand);
expectTrue(fixture, 'runner_output_stale_after_build_167_guard');
expectEq(fixture, 'runner_reported_current_mismatch_status', 'stale_current_mismatch_build_164_cf6d8c4_not_build_167_e0be19f');
expectFalse(fixture, 'runner_recognized_build_165_signed_approval_capture');
expectFalse(fixture, 'runner_recognized_build_167_fresh_guard');
expectFalse(fixture, 'runner_command_rerun_allowed');
expectTrue(fixture, 'fresh_correction_required_after_build_168_blocked_evidence');
expectEq(fixture, 'future_runner_attempt_status', 'blocked_until_runner_state_correction_and_new_approval_guard_chain');
expectEq(fixture, 'runner_execution_status', 'not_run_validation_blocked_nonzero');
expectEq(fixture, 'command_execution_status', 'blocked_nonzero_no_validation_performed');
expectEq(fixture, 'command_attempt_count', 1);
expectTrue(fixture, 'command_attempt_captured_by_this_packet');
expectFalse(fixture, 'runner_command_invoked_by_this_packet');
expectFalse(fixture, 'runner_command_rerun_by_this_packet');
expectFalse(fixture, 'new_guard_created_by_this_packet');
expectFalse(fixture, 'fresh_guard_passed_by_this_packet');
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
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

expectEq(build167Guard, 'build_number', 167);
expectEq(build167Guard, 'packet_type', 'fresh_pre_run_guard');
expectEq(build167Guard, 'fresh_execution_pre_run_guard_status', 'passed');
expectEq(build167Guard, 'fresh_execution_pre_run_guard_checks_passed_count', 30);
expectEq(build167Guard, 'runner_execution_status', 'not_run_by_this_packet');
pass('build_167_guard_fixture_exists_and_passed_before_e0be19f_closeout');

expectEq(approval, 'approval_capture_status', 'captured_signed');
expectEq(approval, 'jason_signed_approval_status', 'signed');
expectEq(approval, 'approval_signed_by', 'Jason Lohse');
pass('build_165_approval_capture_exists_but_runner_output_did_not_recognize_it');

if (!Array.isArray(fixture.blocked_stale_evidence_assertions) || fixture.blocked_stale_evidence_assertions.length !== 32) {
  fail('blocked_stale_evidence_assertions must contain 32 entries');
}
pass('blocked_stale_evidence_assertions_array_32');
for (const assertion of fixture.blocked_stale_evidence_assertions) {
  if (assertion.includes('guard_passed_by_this_packet') || assertion.includes('future_command_ready')) {
    fail('blocked stale evidence assertion must not claim this packet passed a guard or made future command ready');
  }
  pass('blocked_stale_evidence_assertion_' + assertion);
}

mustHave(wrapper, 'Blocked/stale evidence capture only; this wrapper does not run the actual runner or create a new guard.', 'wrapper');
mustHave(wrapper, verifierCommand, 'wrapper');
mustNotHave(wrapper, exactAttemptedCommand, 'wrapper');
mustNotHave(wrapper, exactRunnerPath, 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes(title) || !text.includes(normalizedTitle)) {
    fail('docs/context wiring missing Build 168 title or normalized title');
  }
  if (!text.includes('blocked_until_runner_state_correction_and_new_approval_guard_chain')) {
    fail('docs/context wiring missing future correction block status');
  }
}
pass('docs_and_context_wiring_present');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
const forbidden = [
  '"is_guard_packet": true',
  '"runner_command_rerun_allowed": true',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"new_guard_created_by_this_packet": true',
  '"fresh_guard_passed_by_this_packet": true',
  '"runner_recognized_build_165_signed_approval_capture": true',
  '"runner_recognized_build_167_fresh_guard": true',
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
  '"controlled_test_roofer_e2e_approved": true',
  '"controlled_test_roofer_e2e_run_by_this_packet": true',
  '| runner_command_rerun_allowed | true |',
  '| runner_recognized_build_165_signed_approval_capture | true |',
  '| runner_recognized_build_167_fresh_guard | true |',
  '| actual_30_scenario_external_validation_captured_count | 30 |',
  '| actual_30_scenario_external_validation_passed_count | 30 |',
  '| actual_30_scenario_external_validation_missing_count | 0 |',
  '| new_guard_created_by_this_packet | true |',
  '| fresh_guard_passed_by_this_packet | true |'
];
for (const pattern of forbidden) {
  mustNotHave(combined, pattern, 'blocked stale evidence packet');
}
pass('no_live_external_production_activation_flags_detected');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Native Workflow Fixture Capture Post Build 167 Runner Blocked Stale Evidence verified (' + passCount + ' assertions).');
