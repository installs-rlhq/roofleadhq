#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_PREMATURE_RUNNER_COMMAND_BLOCKED_BEFORE_GUARD_CLOSEOUT.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-premature-runner-command-blocked-before-guard-closeout.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-capture-premature-runner-command-blocked-before-guard-closeout-dry-run.sh';
const oldGuardPaths = [
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_PRE_RUN_GUARD_AFTER_BUILD_165_SIGNED_APPROVAL.md',
  'backend/fixtures/native-workflow-demo-roofer/fresh-pre-run-guard-after-build-165-signed-approval.json',
  'backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-165-signed-approval-readonly.js',
  'scripts/run-native-workflow-fixture-fresh-pre-run-guard-after-build-165-signed-approval-dry-run.sh'
];
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

const title = 'Native Workflow Fixture Capture Premature Runner Command Blocked Before Guard Closeout';
const normalizedTitle = 'native workflow fixture capture premature runner command blocked before guard closeout';
const exactAttemptedCommand = 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
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

console.log('== Build 166 Premature Runner Command Blocked Before Guard Closeout Verification ==');

const doc = read(packetDocPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const approval = readJson(approvalFixturePath);
read(decisionFixturePath);
read(recognitionFixturePath);
read(blockedEvidenceFixturePath);
const aggregate = read(aggregateReadinessPath);
const index = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgent = read(contextAgentPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'build_number | 166', 'packet doc');
mustHave(doc, 'source_of_truth_commit_before_attempt | 50d66cc', 'packet doc');
mustHave(doc, 'latest_closed_commit_before_attempt | 50d66cc', 'packet doc');
mustHave(doc, 'prior_signed_approval_capture_commit | 50d66cc', 'packet doc');
mustHave(doc, 'prior_decision_template_commit | dfb932f', 'packet doc');
mustHave(doc, 'prior_runner_recognition_correction_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'prior_post_build_161_blocked_evidence_commit | 3f97a7f', 'packet doc');
mustHave(doc, 'premature_runner_command_attempt_status | attempted_blocked_nonzero_before_guard_closeout', 'packet doc');
mustHave(doc, 'runner_command_exit_status | nonzero_blocked', 'packet doc');
mustHave(doc, 'runner_reported_source_of_truth_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'runner_reported_jason_signed_approval_status | not_signed', 'packet doc');
mustHave(doc, 'runner_reported_approval_capture_status | not_captured', 'packet doc');
mustHave(doc, 'runner_reported_fresh_pre_run_guard_status | not_created_not_passed', 'packet doc');
mustHave(doc, `runner_reported_future_command_status | ${staleFutureCommand}`, 'packet doc');
mustHave(doc, 'draft_guard_source_of_truth_closeout_status | not_committed_not_pushed_not_fetched_not_source_of_truth_verified', 'packet doc');
mustHave(doc, 'draft_guard_valid_for_runner_execution | false', 'packet doc');
mustHave(doc, 'approval_capture_status_in_repo_before_attempt | captured_signed', 'packet doc');
mustHave(doc, 'runner_command_rerun_allowed | false', 'packet doc');
mustHave(doc, 'fresh_pre_run_guard_required_after_build_166_blocked_evidence | true', 'packet doc');
mustHave(doc, 'runner_execution_status | not_run_validation_blocked_nonzero', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(doc, 'safety_status | demo_ready_with_live_automation_disabled', 'packet doc');
mustHave(doc, 'After this Build 166 blocked-evidence packet is committed, pushed, fetched, and source-of-truth verified, create a new fresh pre-run guard packet.', 'packet doc');

expectEq(fixture, 'packet_name', title);
expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'capture_premature_runner_command_blocked_before_guard_closeout_review_only');
expectEq(fixture, 'packet_type', 'blocked_evidence_capture');
expectFalse(fixture, 'is_guard_packet');
expectEq(fixture, 'build_number', 166);
expectEq(fixture, 'source_of_truth_commit_before_attempt', '50d66cc');
expectEq(fixture, 'latest_closed_commit_before_attempt', '50d66cc');
expectEq(fixture, 'prior_signed_approval_capture_commit', '50d66cc');
expectEq(fixture, 'prior_decision_template_commit', 'dfb932f');
expectEq(fixture, 'prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectTrue(fixture, 'build_165_approval_capture_closed');
expectEq(fixture, 'approval_capture_status_in_repo_before_attempt', 'captured_signed');
expectEq(fixture, 'approval_signed_by', 'Jason Lohse');
expectEq(fixture, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');
expectTrue(fixture, 'draft_guard_existed_before_attempt');
expectEq(fixture, 'draft_guard_source_of_truth_closeout_status', 'not_committed_not_pushed_not_fetched_not_source_of_truth_verified');
expectFalse(fixture, 'draft_guard_valid_for_runner_execution');
expectEq(fixture, 'draft_guard_execution_authorization_status', 'invalid_not_source_of_truth_closed');
expectEq(fixture, 'premature_runner_command_attempt_status', 'attempted_blocked_nonzero_before_guard_closeout');
expectEq(fixture, 'runner_command_exit_status', 'nonzero_blocked');
expectEq(fixture, 'attempted_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command_attempted', exactAttemptedCommand);
expectEq(fixture, 'runner_reported_source_of_truth_commit', 'cf6d8c4');
expectEq(fixture, 'runner_reported_prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'runner_reported_prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectTrue(fixture, 'runner_recognized_build_158_159_160_161_162_chain');
expectEq(fixture, 'runner_reported_build_164_status', 'decision_template_status_only');
expectEq(fixture, 'runner_reported_jason_signed_approval_status', 'not_signed');
expectEq(fixture, 'runner_reported_approval_capture_status', 'not_captured');
expectEq(fixture, 'runner_reported_fresh_pre_run_guard_status', 'not_created_not_passed');
expectEq(fixture, 'runner_reported_future_command_status', staleFutureCommand);
expectEq(fixture, 'runner_reported_current_mismatch_status', 'stale_current_mismatch_build_164_cf6d8c4_not_build_165_50d66cc');
expectFalse(fixture, 'runner_recognized_build_165_signed_approval');
expectFalse(fixture, 'runner_recognized_uncommitted_build_166_guard_draft');
expectFalse(fixture, 'runner_command_rerun_allowed');
expectTrue(fixture, 'fresh_pre_run_guard_required_after_build_166_blocked_evidence');
expectTrue(fixture, 'new_fresh_pre_run_guard_required_after_source_of_truth_closeout');
expectEq(fixture, 'runner_execution_status', 'not_run_validation_blocked_nonzero');
expectEq(fixture, 'command_execution_status', 'blocked_nonzero_no_validation_performed');
expectEq(fixture, 'command_attempt_count', 1);
expectTrue(fixture, 'command_attempt_captured_by_this_packet');
expectFalse(fixture, 'runner_command_invoked_by_this_packet');
expectFalse(fixture, 'runner_command_rerun_by_this_packet');
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

expectEq(approval, 'approval_capture_status', 'captured_signed');
expectEq(approval, 'jason_signed_approval_status', 'signed');
expectEq(approval, 'approval_signed_by', 'Jason Lohse');
expectEq(approval, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');
pass('approval_capture_exists_in_repo_at_50d66cc_but_attempt_still_blocked');

if (!Array.isArray(fixture.blocked_evidence_assertions) || fixture.blocked_evidence_assertions.length !== 30) {
  fail('blocked_evidence_assertions must contain 30 entries');
}
pass('blocked_evidence_assertions_array_30');
for (const assertion of fixture.blocked_evidence_assertions) {
  if (assertion.includes('guard_passed') || assertion.includes('future_command_ready')) {
    fail('blocked evidence assertion must not claim guard passed or future command ready');
  }
  pass('blocked_evidence_assertion_' + assertion);
}

for (const oldPath of oldGuardPaths) {
  if (fs.existsSync(fullPath(oldPath))) fail('old guard artifact still present: ' + oldPath);
  pass('old_guard_artifact_removed_' + path.basename(oldPath).replace(/[^a-z0-9]+/gi, '_'));
}

mustHave(wrapper, 'does not run the actual runner', 'wrapper');
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-capture-premature-runner-command-blocked-before-guard-closeout-readonly.js', 'wrapper');
mustNotHave(wrapper, exactAttemptedCommand, 'wrapper');
mustNotHave(wrapper, 'actual-external-sandbox-30-scenario-validation.sh', 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes(title) || !text.includes(normalizedTitle)) {
    fail('docs/context wiring missing blocked-evidence title or normalized title');
  }
  if (text.includes('Native Workflow Fixture Fresh Pre-Run Guard After Build 165 Signed Approval') ||
      text.includes('fresh-pre-run-guard-after-build-165-signed-approval') ||
      text.includes('ready_for_exact_approved_runner_execution_command_after_build_166_guard_review_only') ||
      text.includes('guard passed 30/30')) {
    fail('docs/context wiring still claims Build 166 guard passed or ready');
  }
}
pass('docs_and_context_wiring_present_without_guard_ready_claims');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
const forbidden = [
  '"is_guard_packet": true',
  '"draft_guard_valid_for_runner_execution": true',
  '"runner_command_rerun_allowed": true',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
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
  '| draft_guard_valid_for_runner_execution | true |',
  '| runner_command_rerun_allowed | true |',
  '| actual_30_scenario_external_validation_captured_count | 30 |',
  '| actual_30_scenario_external_validation_passed_count | 30 |',
  '| actual_30_scenario_external_validation_missing_count | 0 |'
];
for (const pattern of forbidden) {
  mustNotHave(combined, pattern, 'blocked evidence packet');
}
pass('no_live_external_production_activation_flags_detected');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Native Workflow Fixture Capture Premature Runner Command Blocked Before Guard Closeout verified (' + passCount + ' assertions).');
