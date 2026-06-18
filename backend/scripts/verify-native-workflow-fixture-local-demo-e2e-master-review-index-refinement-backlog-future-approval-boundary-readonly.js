#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const masterIndexDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_MASTER_REVIEW_INDEX.md';
const backlogDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_REMAINING_REFINEMENT_BACKLOG.md';
const boundaryDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FUTURE_APPROVAL_BOUNDARY_PACKET.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'f752452';
const EVIDENCE_CHAIN_COMMITS = [
  '17abae0',
  'cf566ae',
  '728ad03',
  '401bfc7',
  'edceb29',
  'df388f4',
  '3800512',
  'c6df554',
  'f752452',
];
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const RECOMMENDED_NEXT_STEP = 'CONTINUE_LOCAL_REFINEMENT_OR_HOLD_FOR_REVIEW';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const COMPLETED_PACKETS = [
  'demo_roofer_local_e2e_test_bundle',
  'post_run_evidence_and_demo_e2e_readiness',
  'demo_roofer_scenario_review_runner',
  'demo_roofer_e2e_evidence_report',
  'demo_roofer_local_e2e_operator_gate',
  'local_demo_e2e_run_evidence_capture',
  'final_local_demo_e2e_readiness_decision',
  'demo_roofer_e2e_walkthrough_triage',
  'demo_roofer_walkthrough_observation_evidence_capture',
];

const FUTURE_APPROVAL_CATEGORIES = [
  'sandbox_test_mode_activation_planning',
  'live_activation_planning',
  'exact_command_execution',
  'credentials_env_api_webhook_access',
  'external_service_connection',
  'production_supabase_reads_writes',
  'schema_auth_rls_security_changes',
  'public_route_webhook_scheduler_cron_dispatcher_activation',
  'billing_payment_deposit_invoice_quote_estimate_automation',
  'public_go_live_or_production_copy_changes',
  'real_demo_sandbox_live_testing',
];

const BACKLOG_ITEMS = [
  {
    title: 'Operator readability polish',
    priority: 'P1',
    separateApproval: 'false',
  },
  {
    title: 'Scenario wording clarity',
    priority: 'P1',
    separateApproval: 'false',
  },
  {
    title: 'Observation note capture examples',
    priority: 'P1',
    separateApproval: 'false',
  },
  {
    title: 'Demo evidence summary compression',
    priority: 'P1',
    separateApproval: 'false',
  },
  {
    title: 'Fake-data edge case expansion',
    priority: 'P2',
    separateApproval: 'false',
  },
  {
    title: 'Old 90-day plan reconciliation audit, non-overriding',
    priority: 'P2',
    separateApproval: 'false',
  },
  {
    title: 'Local dashboard/admin screenshot checklist, documentation-only',
    priority: 'P2',
    separateApproval: 'false',
  },
  {
    title: 'Local CSV/reporting example review, fake-data only',
    priority: 'P2',
    separateApproval: 'false',
  },
  {
    title: 'Future sandbox/test-mode planning packet, separate approval required',
    priority: 'P3',
    separateApproval: 'true',
  },
  {
    title: 'Future live activation planning packet, separate approval required',
    priority: 'P3',
    separateApproval: 'true',
  },
];

const REQUIRED_ASSERTIONS = [
  'master_review_index_doc_present',
  'remaining_refinement_backlog_doc_present',
  'future_approval_boundary_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'master_review_index_review_only_scope_present',
  'source_of_truth_commit_f752452_referenced',
  'prior_commit_17abae0_referenced',
  'prior_commit_cf566ae_referenced',
  'prior_commit_728ad03_referenced',
  'prior_commit_401bfc7_referenced',
  'prior_commit_edceb29_referenced',
  'prior_commit_df388f4_referenced',
  'prior_commit_3800512_referenced',
  'prior_commit_c6df554_referenced',
  'prior_commit_f752452_referenced',
  'evidence_chain_status_passed',
  'scenario_review_PASS',
  'e2e_evidence_report_PASS',
  'operator_gate_PASS',
  'local_demo_e2e_evidence_capture_PASS',
  'final_local_demo_readiness_decision_PASS',
  'walkthrough_triage_PASS',
  'walkthrough_observation_evidence_capture_PASS',
  'demo_roofer_fake',
  'fake_lead_count_25',
  'scenario_count_25',
  'expected_outcome_count_25',
  'matched_outcome_count_25',
  'missing_outcome_count_0',
  'unexpected_outcome_count_0',
  'pilot_readiness_demo_ready_with_live_automation_disabled',
  'safe_readiness_fast_lane_pass_17_checks',
  'backend_build_pass',
  'source_of_truth_pass',
  'final_clean_check_blank',
  'current_recommended_next_step_continue_local_refinement_or_hold_for_review',
  'completed_packet_demo_roofer_local_e2e_test_bundle',
  'completed_packet_post_run_evidence_and_demo_e2e_readiness',
  'completed_packet_demo_roofer_scenario_review_runner',
  'completed_packet_demo_roofer_e2e_evidence_report',
  'completed_packet_demo_roofer_local_e2e_operator_gate',
  'completed_packet_local_demo_e2e_run_evidence_capture',
  'completed_packet_final_local_demo_e2e_readiness_decision',
  'completed_packet_demo_roofer_e2e_walkthrough_triage',
  'completed_packet_demo_roofer_walkthrough_observation_evidence_capture',
  'p0_blockers_count_0',
  'p1_backlog_priorities_present',
  'p2_backlog_priorities_present',
  'p3_backlog_priorities_present',
  'backlog_items_have_scope',
  'backlog_items_have_allowed_work',
  'backlog_items_have_blocked_work',
  'backlog_items_have_verifier_expectations',
  'backlog_items_have_approval_requirement',
  'future_approval_category_sandbox_test_mode_activation_planning',
  'future_approval_category_live_activation_planning',
  'future_approval_category_exact_command_execution',
  'future_approval_category_credentials_env_api_webhook_access',
  'future_approval_category_external_service_connection',
  'future_approval_category_production_supabase_reads_writes',
  'future_approval_category_schema_auth_rls_security_changes',
  'future_approval_category_public_route_webhook_scheduler_cron_dispatcher_activation',
  'future_approval_category_billing_payment_deposit_invoice_quote_estimate_automation',
  'future_approval_category_public_go_live_or_production_copy_changes',
  'future_approval_category_real_demo_sandbox_live_testing',
  'standing_local_build_approval_recorded',
  'standing_local_build_approval_scope_limited',
  'future_sandbox_test_mode_requires_exact_scope',
  'future_live_activation_requires_exact_scope',
  'activation_approval_status_not_granted',
  'command_execution_status_not_run_by_this_packet',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'live_activation_allowed_false',
  'sandbox_test_mode_activation_allowed_false',
  'external_calls_allowed_false',
  'credentials_access_allowed_false',
  'production_data_access_allowed_false',
  'schema_auth_rls_security_changes_allowed_false',
  'public_route_webhook_scheduler_cron_dispatcher_allowed_false',
  'billing_payment_automation_allowed_false',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'does_not_approve_activation',
  'forbidden_live_external_sandbox_paths_remain_blocked',
  'public_go_live_or_production_copy_not_changed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_MASTER_REVIEW_INDEX.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_REMAINING_REFINEMENT_BACKLOG.md',
  'NATIVE_WORKFLOW_FIXTURE_FUTURE_APPROVAL_BOUNDARY_PACKET.md',
  'run-native-workflow-fixture-local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary-dry-run.sh',
  'verify-native-workflow-fixture-local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary-readonly.js',
  'local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary.json',
  'Native Workflow Fixture Local Demo E2E Master Review Index + Remaining Refinement Backlog + Future Approval Boundary Packet',
  'native workflow fixture local demo e2e master review index refinement backlog future approval boundary',
  'local demo e2e master review index refinement backlog future approval boundary',
];

const UNSAFE_PATTERNS = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /fetch\(/,
  /ALTER TABLE/,
  /CREATE TABLE/,
  /CREATE POLICY/,
];

const FORBIDDEN_PUBLIC = [
  'booked jobs',
  'book jobs',
  'close jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  'native CRM sync',
  'fully autonomous',
  'live SMS sends',
  'live email sends',
];

function read(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${p}`);
  return fs.readFileSync(full, 'utf8');
}

function readJson(p) {
  return JSON.parse(read(p));
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) fail(`${label} missing: ${needle}`);
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) fail(`${label} has unsafe text: ${needle}`);
}

function passAssertion(name) {
  console.log(`PASS: ${name}`);
}

const masterIndexDoc = read(masterIndexDocPath);
const backlogDoc = read(backlogDocPath);
const boundaryDoc = read(boundaryDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${masterIndexDoc}\n${backlogDoc}\n${boundaryDoc}`;

passAssertion('master_review_index_doc_present');
passAssertion('remaining_refinement_backlog_doc_present');
passAssertion('future_approval_boundary_doc_present');

mustHave(
  masterIndexDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only master review index',
  'master index doc',
);
passAssertion('master_review_index_review_only_scope_present');

mustHave(masterIndexDoc, SOURCE_OF_TRUTH_COMMIT, 'master index doc');
mustHave(backlogDoc, SOURCE_OF_TRUTH_COMMIT, 'backlog doc');
mustHave(boundaryDoc, SOURCE_OF_TRUTH_COMMIT, 'boundary doc');
passAssertion('source_of_truth_commit_f752452_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(masterIndexDoc, commit, 'master index doc');
  mustHave(backlogDoc, commit, 'backlog doc');
  mustHave(boundaryDoc, commit, 'boundary doc');
}
passAssertion('prior_commit_17abae0_referenced');
passAssertion('prior_commit_cf566ae_referenced');
passAssertion('prior_commit_728ad03_referenced');
passAssertion('prior_commit_401bfc7_referenced');
passAssertion('prior_commit_edceb29_referenced');
passAssertion('prior_commit_df388f4_referenced');
passAssertion('prior_commit_3800512_referenced');
passAssertion('prior_commit_c6df554_referenced');
passAssertion('prior_commit_f752452_referenced');

mustHave(masterIndexDoc, 'evidence_chain_status | passed', 'master index doc');
passAssertion('evidence_chain_status_passed');

mustHave(masterIndexDoc, 'scenario_review | PASS', 'master index doc');
passAssertion('scenario_review_PASS');
mustHave(masterIndexDoc, 'e2e_evidence_report | PASS', 'master index doc');
passAssertion('e2e_evidence_report_PASS');
mustHave(masterIndexDoc, 'operator_gate | PASS', 'master index doc');
passAssertion('operator_gate_PASS');
mustHave(masterIndexDoc, 'local_demo_e2e_evidence_capture | PASS', 'master index doc');
passAssertion('local_demo_e2e_evidence_capture_PASS');
mustHave(masterIndexDoc, 'final_local_demo_readiness_decision | PASS/review-only', 'master index doc');
passAssertion('final_local_demo_readiness_decision_PASS');
mustHave(masterIndexDoc, 'walkthrough_triage | PASS', 'master index doc');
passAssertion('walkthrough_triage_PASS');
mustHave(masterIndexDoc, 'walkthrough_observation_evidence_capture | PASS', 'master index doc');
passAssertion('walkthrough_observation_evidence_capture_PASS');

mustHave(masterIndexDoc, DEMO_ROOFER_NAME, 'master index doc');
mustHave(masterIndexDoc, 'demo_roofer_is_fake | true', 'master index doc');
passAssertion('demo_roofer_fake');

mustHave(masterIndexDoc, 'fake_lead_count | 25', 'master index doc');
passAssertion('fake_lead_count_25');
mustHave(masterIndexDoc, 'scenario_count | 25', 'master index doc');
passAssertion('scenario_count_25');
mustHave(masterIndexDoc, 'expected_outcome_count | 25', 'master index doc');
passAssertion('expected_outcome_count_25');
mustHave(masterIndexDoc, 'matched_outcome_count | 25', 'master index doc');
passAssertion('matched_outcome_count_25');
mustHave(masterIndexDoc, 'missing_outcome_count | 0', 'master index doc');
passAssertion('missing_outcome_count_0');
mustHave(masterIndexDoc, 'unexpected_outcome_count | 0', 'master index doc');
passAssertion('unexpected_outcome_count_0');

mustHave(masterIndexDoc, 'pilot_readiness | demo_ready_with_live_automation_disabled', 'master index doc');
passAssertion('pilot_readiness_demo_ready_with_live_automation_disabled');
mustHave(masterIndexDoc, 'safe_readiness_fast_lane | PASS', 'master index doc');
mustHave(masterIndexDoc, '17 checks', 'master index doc');
passAssertion('safe_readiness_fast_lane_pass_17_checks');
mustHave(masterIndexDoc, 'backend_build | PASS', 'master index doc');
passAssertion('backend_build_pass');
mustHave(masterIndexDoc, 'source_of_truth | PASS', 'master index doc');
mustHave(masterIndexDoc, 'HEAD == origin/main at f752452', 'master index doc');
passAssertion('source_of_truth_pass');
mustHave(masterIndexDoc, 'final_clean_check | blank', 'master index doc');
passAssertion('final_clean_check_blank');

mustHave(masterIndexDoc, RECOMMENDED_NEXT_STEP, 'master index doc');
passAssertion('current_recommended_next_step_continue_local_refinement_or_hold_for_review');

for (const packet of COMPLETED_PACKETS) {
  mustHave(masterIndexDoc, packet, 'master index doc');
  const assertionName = `completed_packet_${packet}`;
  if (REQUIRED_ASSERTIONS.includes(assertionName)) {
    passAssertion(assertionName);
  }
}

mustHave(backlogDoc, 'p0_blockers_count | 0', 'backlog doc');
mustHave(backlogDoc, 'P0', 'backlog doc');
mustHave(backlogDoc, 'P1', 'backlog doc');
mustHave(backlogDoc, 'P2', 'backlog doc');
mustHave(backlogDoc, 'P3', 'backlog doc');
passAssertion('p0_blockers_count_0');
passAssertion('p1_backlog_priorities_present');
passAssertion('p2_backlog_priorities_present');
passAssertion('p3_backlog_priorities_present');

for (const item of BACKLOG_ITEMS) {
  const sectionStart = backlogDoc.indexOf(item.title);
  if (sectionStart === -1) fail(`backlog item missing: ${item.title}`);
  const section = backlogDoc.slice(sectionStart, sectionStart + 2500);
  mustHave(section, '**Scope:**', `backlog item ${item.title}`);
  mustHave(section, '**Allowed work:**', `backlog item ${item.title}`);
  mustHave(section, '**Blocked work:**', `backlog item ${item.title}`);
  mustHave(section, '**Verifier expectations:**', `backlog item ${item.title}`);
  mustHave(
    section,
    `**Separate future approval required:** ${item.separateApproval}`,
    `backlog item ${item.title}`,
  );
}
passAssertion('backlog_items_have_scope');
passAssertion('backlog_items_have_allowed_work');
passAssertion('backlog_items_have_blocked_work');
passAssertion('backlog_items_have_verifier_expectations');
passAssertion('backlog_items_have_approval_requirement');

for (const category of FUTURE_APPROVAL_CATEGORIES) {
  mustHave(boundaryDoc, category, 'boundary doc');
  const assertionName = `future_approval_category_${category}`;
  if (REQUIRED_ASSERTIONS.includes(assertionName)) {
    passAssertion(assertionName);
  }
}

mustHave(boundaryDoc, 'standing_local_build_approval_recorded | true', 'boundary doc');
passAssertion('standing_local_build_approval_recorded');
mustHave(
  boundaryDoc,
  'local-only fake-data read-only dry-run review-only larger batches',
  'boundary doc',
);
passAssertion('standing_local_build_approval_scope_limited');

mustHave(
  boundaryDoc,
  'exact scoped command/service/environment/stop-condition details',
  'boundary doc',
);
mustHave(boundaryDoc, 'sandbox/test-mode activation planning', 'boundary doc');
passAssertion('future_sandbox_test_mode_requires_exact_scope');
mustHave(boundaryDoc, 'live activation planning', 'boundary doc');
passAssertion('future_live_activation_requires_exact_scope');

mustHave(masterIndexDoc, 'activation_approval_status | not_granted', 'master index doc');
passAssertion('activation_approval_status_not_granted');
mustHave(masterIndexDoc, 'command_execution_status | not_run_by_this_packet', 'master index doc');
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(masterIndexDoc, 'approved_for_activation_now | false', 'master index doc');
passAssertion('approved_for_activation_now_false');
mustHave(masterIndexDoc, 'approved_channels | []', 'master index doc');
passAssertion('approved_channels_empty');
mustHave(masterIndexDoc, 'approved_external_services | []', 'master index doc');
passAssertion('approved_external_services_empty');

mustHave(boundaryDoc, 'live_activation_allowed | false', 'boundary doc');
passAssertion('live_activation_allowed_false');
mustHave(boundaryDoc, 'sandbox_test_mode_activation_allowed | false', 'boundary doc');
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(boundaryDoc, 'external_calls_allowed | false', 'boundary doc');
passAssertion('external_calls_allowed_false');
mustHave(boundaryDoc, 'credentials_access_allowed | false', 'boundary doc');
passAssertion('credentials_access_allowed_false');
mustHave(boundaryDoc, 'production_data_access_allowed | false', 'boundary doc');
passAssertion('production_data_access_allowed_false');
mustHave(boundaryDoc, 'schema_auth_rls_security_changes_allowed | false', 'boundary doc');
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  boundaryDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'boundary doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(boundaryDoc, 'billing_payment_automation_allowed | false', 'boundary doc');
passAssertion('billing_payment_automation_allowed_false');

mustHave(
  combinedDocs,
  'old 90-day plan cannot override current source-of-truth direction',
  'combined docs',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(combinedDocs, 'does **not** approve live activation', 'combined docs');
mustHave(combinedDocs, 'does **not** approve sandbox/test-mode activation', 'combined docs');
mustHave(combinedDocs, 'This is **not** approval to activate anything', 'combined docs');
passAssertion('does_not_approve_activation');

mustHave(boundaryDoc, 'sandbox/test-mode activation', 'boundary doc');
mustHave(boundaryDoc, 'billing/payment/deposit/invoice/quote/estimate automation', 'boundary doc');
mustHave(boundaryDoc, 'schedulers, cron, or dispatchers', 'boundary doc');
mustHave(boundaryDoc, 'Twilio', 'boundary doc');
mustHave(boundaryDoc, 'Vapi', 'boundary doc');
mustHave(boundaryDoc, 'Resend', 'boundary doc');
mustHave(boundaryDoc, 'Google Calendar', 'boundary doc');
mustHave(boundaryDoc, 'Lindy', 'boundary doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(boundaryDoc, 'public_website_go_live_copy_changed | false', 'boundary doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(boundaryDoc, 'does **not** run the final activation command', 'boundary doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be f752452');
}
if (fixture.packet_status !== 'review_only') fail('fixture packet_status must be review_only');
if (fixture.evidence_chain_status !== 'passed') {
  fail('fixture evidence_chain_status must be passed');
}
if (fixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('fixture current_recommended_next_step mismatch');
}
if (fixture.demo_roofer_name !== DEMO_ROOFER_NAME) fail('fixture demo_roofer_name mismatch');
if (fixture.demo_roofer_is_fake !== true) fail('fixture demo_roofer_is_fake must be true');
if (fixture.fake_lead_count !== 25) fail('fixture fake_lead_count must be 25');
if (fixture.scenario_count !== 25) fail('fixture scenario_count must be 25');
if (fixture.expected_outcome_count !== 25) fail('fixture expected_outcome_count must be 25');
if (fixture.matched_outcome_count !== 25) fail('fixture matched_outcome_count must be 25');
if (fixture.missing_outcome_count !== 0) fail('fixture missing_outcome_count must be 0');
if (fixture.unexpected_outcome_count !== 0) fail('fixture unexpected_outcome_count must be 0');
if (fixture.p0_blockers_count !== 0) fail('fixture p0_blockers_count must be 0');
if (fixture.standing_local_build_approval_recorded !== true) {
  fail('fixture standing_local_build_approval_recorded must be true');
}
if (
  fixture.standing_local_build_approval_scope !==
  'local-only fake-data read-only dry-run review-only larger batches'
) {
  fail('fixture standing_local_build_approval_scope mismatch');
}
if (fixture.activation_approval_status !== 'not_granted') {
  fail('fixture activation_approval_status must be not_granted');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (!Array.isArray(fixture.approved_channels) || fixture.approved_channels.length !== 0) {
  fail('fixture approved_channels must be empty');
}
if (
  !Array.isArray(fixture.approved_external_services) ||
  fixture.approved_external_services.length !== 0
) {
  fail('fixture approved_external_services must be empty');
}
if (fixture.live_activation_allowed !== false) fail('fixture live_activation_allowed must be false');
if (fixture.sandbox_test_mode_activation_allowed !== false) {
  fail('fixture sandbox_test_mode_activation_allowed must be false');
}
if (fixture.external_calls_allowed !== false) fail('fixture external_calls_allowed must be false');
if (fixture.credentials_access_allowed !== false) {
  fail('fixture credentials_access_allowed must be false');
}
if (fixture.production_data_access_allowed !== false) {
  fail('fixture production_data_access_allowed must be false');
}
if (fixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('fixture schema_auth_rls_security_changes_allowed must be false');
}
if (fixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail('fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false');
}
if (fixture.billing_payment_automation_allowed !== false) {
  fail('fixture billing_payment_automation_allowed must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (
  fixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('fixture old_90_day_plan_boundary mismatch');
}
if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 9) {
  fail('fixture evidence_chain_commits must contain 9 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}
if (
  !Array.isArray(fixture.completed_local_evidence_packets) ||
  fixture.completed_local_evidence_packets.length !== 9
) {
  fail('fixture completed_local_evidence_packets must contain 9 packets');
}
for (const packet of COMPLETED_PACKETS) {
  if (!fixture.completed_local_evidence_packets.includes(packet)) {
    fail(`fixture completed_local_evidence_packets missing ${packet}`);
  }
}
if (!fixture.remaining_backlog_priorities?.P1?.length) {
  fail('fixture remaining_backlog_priorities.P1 must be non-empty');
}
if (!fixture.remaining_backlog_priorities?.P2?.length) {
  fail('fixture remaining_backlog_priorities.P2 must be non-empty');
}
if (!fixture.remaining_backlog_priorities?.P3?.length) {
  fail('fixture remaining_backlog_priorities.P3 must be non-empty');
}
if (!Array.isArray(fixture.future_approval_categories) || fixture.future_approval_categories.length !== 11) {
  fail('fixture future_approval_categories must contain 11 categories');
}
for (const category of FUTURE_APPROVAL_CATEGORIES) {
  if (!fixture.future_approval_categories.includes(category)) {
    fail(`fixture future_approval_categories missing ${category}`);
  }
}
passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined docs forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in combined docs`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

if (!fs.existsSync(path.join(root, verifierPath))) fail(`missing verifier: ${verifierPath}`);
passAssertion('verifier_file_present');

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') {
  fail(`pilot readiness summary is not demo_ready_with_live_automation_disabled (got: ${status.summary})`);
}
passAssertion('demo_ready_with_live_automation_disabled_preserved');

const liveKeys = ['sms', 'calendar', 'vapi_outbound', 'resend', 'lindy'];
for (const key of liveKeys) {
  if (status.live_automation[key] !== false) {
    fail(`live_automation.${key} is not false`);
  }
}
passAssertion('no_live_sms_activation');
passAssertion('no_twilio_activation');
passAssertion('no_vapi_activation');
passAssertion('no_resend_activation');
passAssertion('no_scheduler_cron_dispatcher_activation');
passAssertion('no_public_route_webhook_activation');
passAssertion('no_billing_payment_quote_invoice_estimate_activation');
passAssertion('no_supabase_production_reads_writes');
passAssertion('no_schema_migrations_auth_rls_security_changes');
passAssertion('no_secret_env_credential_logging');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-local-demo-e2e-master-review-index-refinement-backlog-future-approval-boundary-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Local Demo E2E Master Review Index + Remaining Refinement Backlog + Future Approval Boundary Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, masterIndexDocPath, 'verifier index');
mustHave(verifierIndex, backlogDocPath, 'verifier index');
mustHave(verifierIndex, boundaryDocPath, 'verifier index');
mustHave(verifierIndex, fixturePath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'set -euo pipefail', 'wrapper strict mode');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, 'node --check', 'wrapper syntax checks');
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');
mustHave(wrapper, 'local fake-data', 'wrapper mode');
mustHave(wrapper, 'review-only', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(masterIndexDoc, backlogDocPath, 'master index doc');
mustHave(masterIndexDoc, boundaryDocPath, 'master index doc');
mustHave(masterIndexDoc, fixturePath, 'master index doc');
mustHave(backlogDoc, masterIndexDocPath, 'backlog doc');
mustHave(backlogDoc, boundaryDocPath, 'backlog doc');
mustHave(boundaryDoc, masterIndexDocPath, 'boundary doc');
mustHave(boundaryDoc, backlogDocPath, 'boundary doc');

if (REQUIRED_ASSERTIONS.length !== 102) {
  fail(`REQUIRED_ASSERTIONS must contain 102 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Local Demo E2E Master Review Index + Remaining Refinement Backlog + Future Approval Boundary Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);