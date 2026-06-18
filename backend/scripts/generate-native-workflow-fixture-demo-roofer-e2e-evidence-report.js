#!/usr/bin/env node
/**
 * Native Workflow Fixture Demo Roofer E2E Evidence Report Generator
 * LOCAL FIXTURE ONLY — fake data, Node built-ins only, stdout JSON only.
 * No Supabase, no external services, no production data, no live automation.
 * Does not approve activation. Does not run commands. Does not mutate fixtures.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '../..');

const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const FIXTURE_FILES = {
  profile: `${FIXTURE_DIR}/demo-roofer-profile.json`,
  leads: `${FIXTURE_DIR}/demo-homeowner-leads.json`,
  scenarios: `${FIXTURE_DIR}/demo-e2e-scenarios.json`,
  outcomes: `${FIXTURE_DIR}/demo-expected-outcomes.json`,
  checklist: `${FIXTURE_DIR}/demo-operator-checklist.json`,
  evidence: `${FIXTURE_DIR}/post-run-evidence-capture.json`,
};

const RUNNER_PATH = 'backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js';

const SOURCE_OF_TRUTH_COMMIT = '728ad03';
const SCENARIO_REVIEW_RUNNER_COMMIT = '728ad03';
const FAKE_COMPANY_NAME = 'Summit Peak Roofing Demo LLC';
const REPORT_NAME = 'native_workflow_fixture_demo_roofer_e2e_evidence_report';
const FINAL_DECISION = 'PASS LOCAL DEMO ROOFER SCENARIO REVIEW';
const EVIDENCE_CONCLUSION = 'PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT';

const CATEGORY_TO_GROUP = {
  new_lead: 'new_lead',
  missed_lead_recovery: 'missed_lead_recovery',
  manual_outreach: 'manual_outreach',
  appointment_readiness: 'appointment_readiness',
  appointment_reschedule: 'reschedule',
  appointment_no_show: 'no_show',
  post_inspection: 'post_inspection',
  feedback_permission: 'feedback_permission',
  source_roi: 'source_roi',
  usage_volume: 'usage_volume',
  messaging_compliance: 'messaging_compliance',
  data_minimization: 'data_minimization',
  audit_timeline: 'audit_timeline',
  review_aging: 'review_aging',
  human_escalation: 'human_escalation',
  unsupported_automation_block: 'unsupported_automation_blocked',
  external_service_block: 'external_service_blocked',
  stop_condition: 'stop_condition_boundary',
};

const REQUIRED_SCENARIO_GROUPS = [
  'new_lead',
  'missed_lead_recovery',
  'manual_outreach',
  'appointment_readiness',
  'reschedule',
  'no_show',
  'post_inspection',
  'feedback_permission',
  'source_roi',
  'usage_volume',
  'messaging_compliance',
  'data_minimization',
  'audit_timeline',
  'review_aging',
  'human_escalation',
  'unsupported_automation_blocked',
  'external_service_blocked',
  'stop_condition_boundary',
];

function readJson(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required fixture: ${relativePath}`);
  }
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function buildScenarioGroups(scenarios) {
  const groups = Object.fromEntries(REQUIRED_SCENARIO_GROUPS.map((g) => [g, []]));
  for (const scenario of scenarios.scenarios) {
    const groupKey = CATEGORY_TO_GROUP[scenario.category];
    if (!groupKey) {
      fail(`unknown scenario category: ${scenario.category}`);
    }
    groups[groupKey].push(scenario.scenario_id);
  }
  for (const groupKey of REQUIRED_SCENARIO_GROUPS) {
    if (groups[groupKey].length === 0) {
      fail(`scenario group ${groupKey} has no scenarios`);
    }
  }
  return groups;
}

const profile = readJson(FIXTURE_FILES.profile);
const leads = readJson(FIXTURE_FILES.leads);
const scenarios = readJson(FIXTURE_FILES.scenarios);
const outcomes = readJson(FIXTURE_FILES.outcomes);

if (profile.demo_roofer_profile.company_name !== FAKE_COMPANY_NAME) {
  fail(`demo roofer company name must be ${FAKE_COMPANY_NAME}`);
}
if (profile.demo_roofer_profile.company_name_is_fake !== true) {
  fail('demo roofer must be marked company_name_is_fake true');
}

const runnerResult = spawnSync(process.execPath, [path.join(root, RUNNER_PATH)], {
  cwd: root,
  encoding: 'utf8',
});
if (runnerResult.status !== 0) {
  fail(`scenario review runner failed: ${runnerResult.stderr || runnerResult.stdout}`);
}

let runnerSummary;
try {
  runnerSummary = JSON.parse(runnerResult.stdout);
} catch (err) {
  fail(`scenario review runner did not output valid JSON: ${err.message}`);
}

if (runnerSummary.final_decision !== FINAL_DECISION) {
  fail(`scenario review runner final_decision must be ${FINAL_DECISION}`);
}
if (runnerSummary.fake_lead_count !== 25) fail('runner fake_lead_count must be 25');
if (runnerSummary.scenario_count !== 25) fail('runner scenario_count must be 25');
if (runnerSummary.expected_outcome_count !== 25) fail('runner expected_outcome_count must be 25');
if (runnerSummary.matched_expected_outcomes !== 25) {
  fail('runner matched_expected_outcomes must be 25');
}

const scenarioGroups = buildScenarioGroups(scenarios);

const summary = {
  report_name: REPORT_NAME,
  source_of_truth_commit: SOURCE_OF_TRUTH_COMMIT,
  scenario_review_runner_commit: SCENARIO_REVIEW_RUNNER_COMMIT,
  demo_roofer_name: FAKE_COMPANY_NAME,
  demo_roofer_is_fake: true,
  fake_lead_count: leads.fake_homeowner_leads.length,
  scenario_count: scenarios.scenarios.length,
  expected_outcome_count: outcomes.expected_outcomes.length,
  matched_expected_outcomes: runnerSummary.matched_expected_outcomes,
  missing_expected_outcomes: runnerSummary.missing_expected_outcomes,
  unexpected_expected_outcomes: runnerSummary.unexpected_expected_outcomes,
  final_decision: FINAL_DECISION,
  activation_approval_status: 'not_granted',
  command_execution_status: 'not_run_by_this_report',
  approved_for_activation_now: false,
  approved_channels: [],
  approved_external_services: [],
  external_calls_made: false,
  credentials_env_api_webhook_references_used: false,
  production_supabase_data_path_used: false,
  schema_auth_rls_security_migration_required: false,
  public_route_webhook_scheduler_cron_dispatcher_changes: false,
  billing_payment_deposit_invoice_quote_estimate_automation: false,
  safety_status: 'demo_ready_with_live_automation_disabled',
  scenario_groups: scenarioGroups,
  blocked_external_service_scenarios: runnerSummary.blocked_external_service_scenarios,
  blocked_unsupported_automation_scenarios: runnerSummary.blocked_unsupported_automation_scenarios,
  review_queue_scenarios: runnerSummary.review_queue_scenarios,
  human_escalation_scenarios: runnerSummary.human_escalation_scenarios,
  post_inspection_scenarios: runnerSummary.post_inspection_scenarios,
  feedback_permission_scenarios: runnerSummary.feedback_permission_scenarios,
  lindy_false_positive_fix_preserved: true,
  lindy_live_activation_enabled: false,
  old_90_day_plan_boundary: 'old 90-day plan cannot override current source-of-truth direction',
  delivery_posture: {
    delivery_mode: 'local-only',
    data_mode: 'fake-data-only',
    access_mode: 'read-only',
    execution_mode: 'dry-run-only',
    review_mode: 'review-only',
  },
  evidence_conclusion: EVIDENCE_CONCLUSION,
};

console.log(JSON.stringify(summary, null, 2));