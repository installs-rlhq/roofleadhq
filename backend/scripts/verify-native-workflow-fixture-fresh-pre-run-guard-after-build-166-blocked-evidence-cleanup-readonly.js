#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_PRE_RUN_GUARD_AFTER_BUILD_166_BLOCKED_EVIDENCE_CLEANUP.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-pre-run-guard-after-build-166-blocked-evidence-cleanup.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-fresh-pre-run-guard-after-build-166-blocked-evidence-cleanup-dry-run.sh';
const manifestPath = 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const approvalFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-164.json';
const blockedEvidenceFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-premature-runner-command-blocked-before-guard-closeout.json';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const title = 'Native Workflow Fixture Fresh Pre-Run Guard After Build 166 Blocked Evidence Cleanup';
const normalizedTitle = 'native workflow fixture fresh pre run guard after build 166 blocked evidence cleanup';
const verifierCommand = 'node backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-166-blocked-evidence-cleanup-readonly.js';
const exactCommand = 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';

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

console.log('== Build 167 Fresh Pre-Run Guard After Build 166 Blocked Evidence Cleanup Verification ==');

const doc = read(packetDocPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const manifest = readJson(manifestPath);
read(runnerPath);
const approval = readJson(approvalFixturePath);
readJson(blockedEvidenceFixturePath);
const aggregate = read(aggregateReadinessPath);
const index = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgent = read(contextAgentPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'build_number | 167', 'packet doc');
mustHave(doc, 'source_of_truth_commit | bc7ea24', 'packet doc');
mustHave(doc, 'prior_build_166_cleanup_commit | bc7ea24', 'packet doc');
mustHave(doc, 'prior_premature_runner_blocked_evidence_commit | 69fe9db', 'packet doc');
mustHave(doc, 'prior_invalid_guard_draft_commit_removed_by_cleanup | 44ccf16', 'packet doc');
mustHave(doc, 'prior_signed_approval_capture_commit | 50d66cc', 'packet doc');
mustHave(doc, 'approval_scope | fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_164_signed_approval_and_fresh_guard', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_status | passed', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(doc, 'runner_command_attempt_status | not_attempted_by_this_packet', 'packet doc');
mustHave(doc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(doc, 'future_command_status | ready_for_exact_approved_runner_execution_command_after_build_167_guard_source_of_truth_closeout', 'packet doc');
mustHave(doc, 'Only after Build 167 is committed, pushed, fetched, source-of-truth verified, and final git status is blank', 'packet doc');
mustHave(doc, 'If the future command blocks, exits nonzero, or reports stale state, stop and do not rerun.', 'packet doc');
mustHave(doc, 'If the future command succeeds, stop and capture validation evidence.', 'packet doc');

expectEq(fixture, 'packet_name', title);
expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'packet_type', 'fresh_pre_run_guard');
expectEq(fixture, 'build_number', 167);
expectEq(fixture, 'source_of_truth_commit', 'bc7ea24');
expectEq(fixture, 'prior_build_166_cleanup_commit', 'bc7ea24');
expectEq(fixture, 'prior_premature_runner_blocked_evidence_commit', '69fe9db');
expectEq(fixture, 'prior_invalid_guard_draft_commit_removed_by_cleanup', '44ccf16');
expectEq(fixture, 'prior_signed_approval_capture_commit', '50d66cc');
expectEq(fixture, 'prior_decision_template_commit', 'dfb932f');
expectEq(fixture, 'prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'approval_scope', 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_164_signed_approval_and_fresh_guard');
expectEq(fixture, 'approval_capture_status', 'captured_signed');
expectEq(fixture, 'jason_signed_approval_status', 'signed');
expectEq(fixture, 'approval_signed_by', 'Jason Lohse');
expectEq(fixture, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');
expectEq(fixture, 'fresh_execution_pre_run_guard_status', 'passed');
expectEq(fixture, 'fresh_execution_pre_run_guard_checks_required_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_checks_passed_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_failed_count', 0);
expectEq(fixture, 'runner_command_attempt_status', 'not_attempted_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectFalse(fixture, 'runner_command_invoked_by_this_packet');
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'future_command_status', 'ready_for_exact_approved_runner_execution_command_after_build_167_guard_source_of_truth_closeout');
expectFalse(fixture, 'runner_command_rerun_allowed_before_attempt');
expectTrue(fixture, 'one_time_runner_attempt_allowed_after_source_of_truth_closeout');
expectTrue(fixture, 'source_of_truth_closeout_required_before_runner_attempt');
expectTrue(fixture, 'ready_only_after_build_167_committed_pushed_fetched_source_of_truth_verified_and_final_git_status_blank');
expectTrue(fixture, 'if_future_command_blocks_nonzero_or_stale_stop_and_do_not_rerun');
expectTrue(fixture, 'if_future_command_succeeds_stop_and_capture_validation_evidence');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');
expectEq(fixture, 'controlled_test_roofer_e2e_status', 'review_only_not_approved_not_run');
expectFalse(fixture, 'controlled_test_roofer_e2e_approved');
expectFalse(fixture, 'controlled_test_roofer_e2e_run_by_this_packet');
expectEq(fixture, 'exact_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command', exactCommand);
expectEq(fixture, 'exact_runner_path', runnerPath);
expectEq(fixture, 'exact_manifest_path', manifestPath);
expectEq(fixture, 'exact_scenario_count', 30);
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

expectEq(approval, 'approval_capture_status', 'captured_signed');
expectEq(approval, 'jason_signed_approval_status', 'signed');
expectEq(approval, 'approval_signed_by', 'Jason Lohse');
expectEq(approval, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');

if (!Array.isArray(fixture.fresh_execution_pre_run_guard_checks) || fixture.fresh_execution_pre_run_guard_checks.length !== 30) {
  fail('fresh_execution_pre_run_guard_checks must contain 30 entries');
}
pass('fresh_execution_pre_run_guard_checks_array_30');
for (let i = 1; i <= 30; i++) {
  expectEq(fixture, 'fresh_execution_pre_run_guard_check_' + String(i).padStart(2, '0') + '_status', 'passed');
}

if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length !== 30) {
  fail('manifest scenarios must contain 30 entries');
}
pass('manifest_scenarios_array_30');

mustHave(wrapper, 'Fresh pre-run guard only. This wrapper does not run the actual runner.', 'wrapper');
mustHave(wrapper, verifierCommand, 'wrapper');
mustNotHave(wrapper, exactCommand, 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes(title) || !text.includes(normalizedTitle)) {
    fail('docs/context wiring missing Build 167 title or normalized title');
  }
}
pass('docs_and_context_wiring_present');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
const forbidden = [
  '"runner_command_invoked_by_this_packet": true',
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
  '| actual_30_scenario_external_validation_captured_count | 30 |',
  '| actual_30_scenario_external_validation_passed_count | 30 |',
  '| actual_30_scenario_external_validation_missing_count | 0 |'
];
for (const pattern of forbidden) {
  mustNotHave(combined, pattern, 'fresh pre-run guard packet');
}
pass('no_live_external_production_activation_flags_detected');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Native Workflow Fixture Fresh Pre-Run Guard After Build 166 Blocked Evidence Cleanup verified (' + passCount + ' assertions).');

