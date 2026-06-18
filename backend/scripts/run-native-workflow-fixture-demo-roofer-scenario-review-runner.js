#!/usr/bin/env node
/**
 * Native Workflow Fixture Demo Roofer Scenario Review Runner
 * LOCAL FIXTURE ONLY — fake data, Node built-ins only, stdout JSON only.
 * No Supabase, no external services, no production data, no live automation.
 * Does not approve activation. Does not run commands. Does not mutate fixtures.
 */

const fs = require('fs');
const path = require('path');

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

const SOURCE_OF_TRUTH_COMMIT = 'cf566ae';
const DEMO_ROOFER_BUNDLE_COMMIT = '17abae0';
const FAKE_COMPANY_NAME = 'Summit Peak Roofing Demo LLC';
const RUNNER_NAME = 'native_workflow_fixture_demo_roofer_scenario_review_runner';
const FINAL_DECISION = 'PASS LOCAL DEMO ROOFER SCENARIO REVIEW';

const ROOFLEADHQ_ESCALATION_ALLOWED_STARTING_STATES = new Set([
  'system_quality_issue',
  'ambiguous_routing',
  'bad_data_detected',
  'quality_control_issue',
  'broken_routing',
  'system_review_needed',
]);

const UNSAFE_FIXTURE_PATTERNS = [
  /process\.env/i,
  /SUPABASE_SERVICE_ROLE/i,
  /SUPABASE_URL/i,
  /sk_live_/i,
  /api\.twilio\.com/i,
  /hooks\.slack\.com/i,
  /ngrok\.io/i,
];

const REAL_SERVICE_ID_PATTERNS = [
  /AC[a-f0-9]{32}/i,
  /sk_live_[a-zA-Z0-9]+/,
  /re_[a-zA-Z0-9]{20,}/,
  /api\.twilio\.com/i,
  /api\.vapi\.ai/i,
  /api\.resend\.com/i,
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

function validateLeadIsFake(lead) {
  if (lead.is_fake_data !== true) {
    fail(`lead ${lead.lead_id} must have is_fake_data true`);
  }
  if (!lead.homeowner_name.includes('Demo')) {
    fail(`lead ${lead.lead_id} homeowner name must be obviously fake`);
  }
  if (lead.email && !lead.email.endsWith('@example.com')) {
    fail(`lead ${lead.lead_id} email must use example.com domain`);
  }
  if (lead.phone && !lead.phone.startsWith('+1555010')) {
    fail(`lead ${lead.lead_id} phone must use safe placeholder range +1555010xxxx`);
  }
}

function validateScenarioSafety(scenario) {
  if (scenario.approves_activation !== false) {
    fail(`scenario ${scenario.scenario_id} must not approve activation`);
  }
  if (scenario.approves_command_execution !== false) {
    fail(`scenario ${scenario.scenario_id} must not approve command execution`);
  }
  if (scenario.live_action_allowed !== false) {
    fail(`scenario ${scenario.scenario_id} live_action_allowed must be false`);
  }
  if (scenario.production_data_touched !== false) {
    fail(`scenario ${scenario.scenario_id} production_data_touched must be false`);
  }
  if (scenario.external_services_called !== false) {
    fail(`scenario ${scenario.scenario_id} external_services_called must be false`);
  }
}

function validateOutcomeSafety(outcome) {
  if (outcome.live_action_allowed !== false) {
    fail(`outcome ${outcome.scenario_id} live_action_allowed must be false`);
  }
  if (outcome.production_data_touched !== false) {
    fail(`outcome ${outcome.scenario_id} production_data_touched must be false`);
  }
  if (outcome.external_services_called !== false) {
    fail(`outcome ${outcome.scenario_id} external_services_called must be false`);
  }
  if (outcome.approves_activation !== false) {
    fail(`outcome ${outcome.scenario_id} must not approve activation`);
  }
  if (outcome.approves_command_execution !== false) {
    fail(`outcome ${outcome.scenario_id} must not approve command execution`);
  }
  if (outcome.activation_approval_status !== 'not_granted') {
    fail(`outcome ${outcome.scenario_id} activation_approval_status must be not_granted`);
  }
  if (outcome.activation_command_approval_status !== 'not_granted') {
    fail(`outcome ${outcome.scenario_id} activation_command_approval_status must be not_granted`);
  }
}

function validateBundleSafety(bundle, label) {
  if (bundle.safety_posture !== 'demo_ready_with_live_automation_disabled') {
    fail(`${label} safety_posture must be demo_ready_with_live_automation_disabled`);
  }
  if (bundle.activation_approval_status !== 'not_granted') {
    fail(`${label} activation_approval_status must be not_granted`);
  }
  if (bundle.activation_command_approval_status !== 'not_granted') {
    fail(`${label} activation_command_approval_status must be not_granted`);
  }
  if (bundle.final_jason_activation_approval !== 'not_granted') {
    fail(`${label} final_jason_activation_approval must be not_granted`);
  }
  if (bundle.approved_for_activation_now !== false) {
    fail(`${label} approved_for_activation_now must be false`);
  }
  if (!Array.isArray(bundle.approved_channels) || bundle.approved_channels.length !== 0) {
    fail(`${label} approved_channels must be empty array`);
  }
  if (!Array.isArray(bundle.approved_external_services) || bundle.approved_external_services.length !== 0) {
    fail(`${label} approved_external_services must be empty array`);
  }
}

function validateHumanEscalation(scenario) {
  if (scenario.scenario_id === 'scenario-021-human-escalation-roofer-judgment') {
    if (scenario.review_owner !== 'roofer') {
      fail('human escalation scenario-021 must route to roofer for judgment');
    }
    if (scenario.category !== 'human_escalation') {
      fail('scenario-021 must be human_escalation category');
    }
    return;
  }

  if (scenario.scenario_id === 'scenario-022-roofleadhq-escalation-system-review') {
    if (scenario.review_owner !== 'roofleadhq') {
      fail('roofleadhq escalation scenario-022 must route to roofleadhq');
    }
    if (!ROOFLEADHQ_ESCALATION_ALLOWED_STARTING_STATES.has(scenario.starting_state)) {
      fail(
        'roofleadhq escalation scenario-022 must be limited to ambiguity, bad data, quality-control issue, broken routing, or system review',
      );
    }
    return;
  }
}

function validateStopCondition(scenario, outcome) {
  if (scenario.category !== 'stop_condition') return;
  if (scenario.target_state !== 'stop_condition_triggered_fixture_review') {
    fail('stop-condition scenario must target stop_condition_triggered_fixture_review');
  }
  if (outcome.final_state !== 'stop_condition_triggered_fixture_review') {
    fail('stop-condition outcome must remain blocked at stop_condition_triggered_fixture_review');
  }
  if (!Array.isArray(outcome.stop_condition_examples) || outcome.stop_condition_examples.length === 0) {
    fail('stop-condition outcome must include stop_condition_examples');
  }
}

function validateUnsupportedAutomation(scenario, outcome) {
  if (scenario.category !== 'unsupported_automation_block') return;
  if (scenario.target_state !== 'unsupported_automation_blocked') {
    fail('unsupported automation scenario must target unsupported_automation_blocked');
  }
  if (outcome.final_state !== 'unsupported_automation_blocked') {
    fail('unsupported automation outcome must remain blocked');
  }
  if (outcome.estimate_created !== false || outcome.quote_sent !== false) {
    fail('unsupported automation outcome must block estimate/quote automation');
  }
  if (outcome.invoice_sent !== false || outcome.payment_collected !== false) {
    fail('unsupported automation outcome must block invoice/payment automation');
  }
}

function validateExternalServiceBlock(scenario, outcome) {
  if (scenario.category !== 'external_service_block') return;
  if (scenario.target_state !== 'external_service_calls_blocked') {
    fail('external service block scenario must target external_service_calls_blocked');
  }
  if (outcome.final_state !== 'external_service_calls_blocked') {
    fail('external service block outcome must remain blocked');
  }
  const blockedFlags = [
    'twilio_called',
    'vapi_called',
    'resend_called',
    'google_calendar_called',
    'lindy_called',
    'crm_sync_called',
    'live_csv_delivery_called',
  ];
  for (const flag of blockedFlags) {
    if (outcome[flag] !== false) {
      fail(`external service block outcome ${flag} must be false`);
    }
  }
}

const profile = readJson(FIXTURE_FILES.profile);
const leads = readJson(FIXTURE_FILES.leads);
const scenarios = readJson(FIXTURE_FILES.scenarios);
const outcomes = readJson(FIXTURE_FILES.outcomes);
const checklist = readJson(FIXTURE_FILES.checklist);
const evidence = readJson(FIXTURE_FILES.evidence);

if (profile.demo_roofer_profile.company_name !== FAKE_COMPANY_NAME) {
  fail(`demo roofer company name must be ${FAKE_COMPANY_NAME}`);
}
if (profile.demo_roofer_profile.company_name_is_fake !== true) {
  fail('demo roofer must be marked company_name_is_fake true');
}
if (profile.demo_roofer_profile.business_type !== 'demo_roofer_fixture') {
  fail('demo roofer business_type must be demo_roofer_fixture');
}

if (!leads.fake_homeowner_leads || leads.fake_homeowner_leads.length !== 25) {
  fail(`expected exactly 25 fake homeowner leads, found ${leads.fake_homeowner_leads ? leads.fake_homeowner_leads.length : 0}`);
}
for (const lead of leads.fake_homeowner_leads) {
  validateLeadIsFake(lead);
}

if (!scenarios.scenarios || scenarios.scenarios.length !== 25) {
  fail(`expected exactly 25 E2E scenarios, found ${scenarios.scenarios ? scenarios.scenarios.length : 0}`);
}
if (scenarios.scenario_count !== 25) {
  fail('scenario_count must be exactly 25');
}

if (!outcomes.expected_outcomes || outcomes.expected_outcomes.length !== 25) {
  fail(
    `expected exactly 25 expected outcomes, found ${outcomes.expected_outcomes ? outcomes.expected_outcomes.length : 0}`,
  );
}
if (outcomes.outcome_count !== 25) {
  fail('outcome_count must be exactly 25');
}

const scenarioIds = scenarios.scenarios.map((s) => s.scenario_id);
const outcomeIds = outcomes.expected_outcomes.map((o) => o.scenario_id);
const scenarioIdSet = new Set(scenarioIds);
const outcomeIdSet = new Set(outcomeIds);

const missingExpectedOutcomes = scenarioIds.filter((id) => !outcomeIdSet.has(id));
const unexpectedExpectedOutcomes = outcomeIds.filter((id) => !scenarioIdSet.has(id));

if (missingExpectedOutcomes.length > 0) {
  fail(`missing expected outcomes for scenarios: ${missingExpectedOutcomes.join(', ')}`);
}
if (unexpectedExpectedOutcomes.length > 0) {
  fail(`unexpected expected outcomes without matching scenarios: ${unexpectedExpectedOutcomes.join(', ')}`);
}

const outcomeByScenarioId = new Map(outcomes.expected_outcomes.map((o) => [o.scenario_id, o]));

for (const scenario of scenarios.scenarios) {
  validateScenarioSafety(scenario);
  validateHumanEscalation(scenario);
  const outcome = outcomeByScenarioId.get(scenario.scenario_id);
  validateStopCondition(scenario, outcome);
  validateUnsupportedAutomation(scenario, outcome);
  validateExternalServiceBlock(scenario, outcome);
}

for (const outcome of outcomes.expected_outcomes) {
  validateOutcomeSafety(outcome);
}

for (const [label, bundle] of [
  ['profile', profile],
  ['leads', leads],
  ['scenarios', scenarios],
  ['outcomes', outcomes],
  ['checklist', checklist],
  ['evidence', evidence],
]) {
  validateBundleSafety(bundle, label);
}

if (profile.production_data_touched !== false) fail('profile production_data_touched must be false');
if (leads.production_data_touched !== false) fail('leads production_data_touched must be false');
if (evidence.production_data_touched !== false) fail('evidence production_data_touched must be false');
if (evidence.external_services_called !== false) fail('evidence external_services_called must be false');
if (evidence.decision.decision !== 'PASS LOCAL DRY-RUN REVIEW') {
  fail('post-run evidence decision must be PASS LOCAL DRY-RUN REVIEW');
}
if (evidence.demo_roofer_bundle_reference.source_of_truth_commit !== DEMO_ROOFER_BUNDLE_COMMIT) {
  fail(`post-run evidence demo_roofer_bundle_reference must reference commit ${DEMO_ROOFER_BUNDLE_COMMIT}`);
}

const fixtureBundleText = JSON.stringify({ profile, leads, scenarios, outcomes, checklist, evidence });
for (const pattern of REAL_SERVICE_ID_PATTERNS) {
  if (pattern.test(fixtureBundleText)) {
    fail(`fixture bundle contains real external service identifier pattern: ${pattern}`);
  }
}
for (const pattern of UNSAFE_FIXTURE_PATTERNS) {
  if (pattern.test(fixtureBundleText)) {
    fail(`fixture bundle contains unsafe reference: ${pattern}`);
  }
}

if (checklist.forbidden_actions.includes('execute_final_activation_command') !== true) {
  fail('operator checklist must forbid execute_final_activation_command');
}

const blockedExternalServiceScenarios = scenarios.scenarios
  .filter((s) => s.category === 'external_service_block')
  .map((s) => s.scenario_id);
const blockedUnsupportedAutomationScenarios = scenarios.scenarios
  .filter((s) => s.category === 'unsupported_automation_block')
  .map((s) => s.scenario_id);
const reviewQueueScenarios = scenarios.scenarios
  .filter((s) => s.review_queue_required === true)
  .map((s) => s.scenario_id);
const humanEscalationScenarios = scenarios.scenarios
  .filter((s) => s.category === 'human_escalation')
  .map((s) => s.scenario_id);
const postInspectionScenarios = scenarios.scenarios
  .filter((s) => s.category === 'post_inspection')
  .map((s) => s.scenario_id);
const feedbackPermissionScenarios = scenarios.scenarios
  .filter((s) => s.category === 'feedback_permission')
  .map((s) => s.scenario_id);

const summary = {
  runner_name: RUNNER_NAME,
  source_of_truth_commit: SOURCE_OF_TRUTH_COMMIT,
  demo_roofer_bundle_commit: DEMO_ROOFER_BUNDLE_COMMIT,
  post_run_evidence_readiness_commit: SOURCE_OF_TRUTH_COMMIT,
  demo_roofer_name: FAKE_COMPANY_NAME,
  fake_lead_count: leads.fake_homeowner_leads.length,
  scenario_count: scenarios.scenarios.length,
  expected_outcome_count: outcomes.expected_outcomes.length,
  matched_expected_outcomes: scenarioIds.length,
  missing_expected_outcomes: [],
  unexpected_expected_outcomes: [],
  blocked_external_service_scenarios: blockedExternalServiceScenarios,
  blocked_unsupported_automation_scenarios: blockedUnsupportedAutomationScenarios,
  review_queue_scenarios: reviewQueueScenarios,
  human_escalation_scenarios: humanEscalationScenarios,
  post_inspection_scenarios: postInspectionScenarios,
  feedback_permission_scenarios: feedbackPermissionScenarios,
  safety_status: 'demo_ready_with_live_automation_disabled',
  activation_approval_status: 'not_granted',
  command_execution_status: 'not_run_by_this_runner',
  approved_for_activation_now: false,
  approved_channels: [],
  approved_external_services: [],
  delivery_posture: {
    delivery_mode: 'local-only',
    data_mode: 'fake-data-only',
    access_mode: 'read-only',
    execution_mode: 'dry-run-only',
    review_mode: 'review-only',
  },
  external_calls_made: false,
  credentials_env_api_webhook_references_used: false,
  production_supabase_data_path_used: false,
  schema_auth_rls_security_migration_required: false,
  old_90_day_plan_boundary: 'old 90-day plan cannot override current source-of-truth direction',
  final_decision: FINAL_DECISION,
};

console.log(JSON.stringify(summary, null, 2));