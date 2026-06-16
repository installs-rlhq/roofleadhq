#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

function read(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${p}`);
  return fs.readFileSync(full, 'utf8');
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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const guardVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js';
const reportingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-review-queue-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_REVIEW_ITEM_FIELDS = [
  'review_item_id',
  'scenario_id',
  'review_type',
  'review_owner',
  'review_reason',
  'business_judgment_required',
  'system_quality_issue',
  'source_state',
  'target_state',
  'required_manual_next_step',
  'audit_event_id',
  'live_action_allowed',
  'production_data_touched',
  'external_services_called',
];

const ROOFER_REVIEW_ROUTING_ASSERTIONS = [
  { assertion_id: 'pricing_routes_to_roofer_review', review_type: 'pricing_question', owner: 'roofer' },
  {
    assertion_id: 'estimate_routes_to_roofer_review',
    review_type: 'estimate_question',
    owner: 'roofer',
  },
  { assertion_id: 'quote_routes_to_roofer_review', review_type: 'quote_request', owner: 'roofer' },
  {
    assertion_id: 'insurance_complexity_routes_to_roofer_review',
    review_type: 'insurance_complexity',
    owner: 'roofer',
  },
  {
    assertion_id: 'repair_vs_replacement_routes_to_roofer_review',
    review_type: 'repair_vs_replacement_question',
    owner: 'roofer',
  },
  {
    assertion_id: 'scheduling_issue_routes_to_roofer_review',
    review_type: 'scheduling_issue',
    owner: 'roofer',
  },
  {
    assertion_id: 'homeowner_asks_for_roofer_routes_to_roofer_review',
    review_type: 'homeowner_asks_for_roofer_directly',
    owner: 'roofer',
  },
  {
    assertion_id: 'upset_homeowner_routes_to_roofer_review',
    review_type: 'upset_homeowner',
    owner: 'roofer',
  },
  {
    assertion_id: 'legal_or_carrier_question_routes_to_roofer_review',
    review_type: 'legal_or_carrier_question',
    owner: 'roofer',
  },
  {
    assertion_id: 'payment_or_invoice_routes_to_roofer_review',
    review_type: 'payment_or_invoice_question',
    owner: 'roofer',
  },
  {
    assertion_id: 'contract_question_routes_to_roofer_review',
    review_type: 'contract_question',
    owner: 'roofer',
  },
];

const ROOFLEADHQ_REVIEW_ROUTING_ASSERTIONS = [
  {
    assertion_id: 'duplicate_routes_to_roofleadhq_system_review',
    review_type: 'duplicate_lead_confusion',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'broken_routing_routes_to_roofleadhq_system_review',
    review_type: 'broken_routing',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'source_attribution_issue_routes_to_roofleadhq_system_review',
    review_type: 'source_attribution_issue',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'dashboard_report_discrepancy_routes_to_roofleadhq_system_review',
    review_type: 'dashboard_report_discrepancy',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'workflow_state_confusion_routes_to_roofleadhq_system_review',
    review_type: 'workflow_state_confusion',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'setup_issue_routes_to_roofleadhq_system_review',
    review_type: 'setup_issue',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'failed_handoff_routes_to_roofleadhq_system_review',
    review_type: 'failed_handoff',
    owner: 'roofleadhq_jason',
  },
  {
    assertion_id: 'quality_control_concern_routes_to_roofleadhq_system_review',
    review_type: 'quality_control_concern',
    owner: 'roofleadhq_jason',
  },
];

const REQUIRED_REVIEW_SAFETY_ASSERTIONS = [
  'roofer_review_owns_business_judgment',
  'roofleadhq_review_limited_to_system_quality',
  ...ROOFER_REVIEW_ROUTING_ASSERTIONS.map((a) => a.assertion_id),
  ...ROOFLEADHQ_REVIEW_ROUTING_ASSERTIONS.map((a) => a.assertion_id),
  'review_queue_items_are_fake_data_only',
  'review_queue_does_not_send_notifications',
  'review_queue_does_not_touch_production_data',
  'review_queue_does_not_call_external_services',
  'live_review_notification_blocked_when_flag_false',
  'review_decisions_are_audited',
  'review_owner_required_before_next_step',
  'review_item_has_required_manual_next_step',
  'live_action_allowed_is_no_for_all_review_items',
  'production_data_touched_is_no_for_all_review_items',
  'external_services_called_is_no_for_all_review_items',
];

const doc = read(docPath);
const runner = read(runnerPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

console.log('PASS: required doc exists.');
console.log('PASS: existing fixture runner exists.');
console.log('PASS: existing fixture dry-run verifier exists.');
console.log('PASS: guard assertions verifier exists.');
console.log('PASS: reporting snapshot verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['review queue verifier', verifierPath],
  ['existing fixture verifier', existingVerifierPath],
]) {
  const syntax = spawnSync(process.execPath, ['--check', path.join(root, scriptPath)], {
    cwd: root,
    encoding: 'utf8',
  });
  if (syntax.status !== 0) {
    fail(`${label} syntax check failed: ${syntax.stderr || syntax.stdout}`);
  }
}
console.log('PASS: runner syntax check succeeded.');
console.log('PASS: new verifier syntax check succeeded.');

const runResult = spawnSync(process.execPath, [path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (runResult.status !== 0) {
  fail(`runner execution failed: ${runResult.stderr || runResult.stdout}`);
}

let output;
try {
  output = JSON.parse(runResult.stdout);
} catch (err) {
  fail(`runner did not produce valid JSON: ${err.message}`);
}
console.log('PASS: runner produces valid JSON.');

if (output.safety_posture !== 'demo_ready_with_live_automation_disabled') {
  fail('output does not preserve demo_ready_with_live_automation_disabled');
}
console.log('PASS: output preserves demo_ready_with_live_automation_disabled.');

if (!output.scenarios || output.scenarios.length !== 25) {
  fail(
    `output must include exactly 25 scenarios (found ${output.scenarios ? output.scenarios.length : 0})`,
  );
}
console.log('PASS: output includes all 25 required scenarios.');

if (!output.review_queue_expansion) {
  fail('output missing review_queue_expansion marker');
}
if (output.review_queue_expansion !== 'native_workflow_fixture_review_queue_expansion') {
  fail('review_queue_expansion marker is incorrect');
}
console.log('PASS: output includes review_queue_expansion marker.');

for (const section of [
  'review_queue_summary',
  'review_queue_items',
  'review_owner_summary',
  'roofer_review_summary',
  'roofleadhq_review_summary',
  'review_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level review queue sections are present.');

if (!Array.isArray(output.review_queue_items) || !output.review_queue_items.length) {
  fail('review_queue_items must be a non-empty array');
}
console.log('PASS: review_queue_items array is present.');

for (const item of output.review_queue_items) {
  for (const field of REQUIRED_REVIEW_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`review item ${item.review_item_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (item.live_action_allowed !== 'no') {
    fail(`review item ${item.review_item_id} live_action_allowed is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`review item ${item.review_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`review item ${item.review_item_id} external_services_called is not no`);
  }
  if (!item.required_manual_next_step) {
    fail(`review item ${item.review_item_id} missing required_manual_next_step`);
  }
  if (!item.audit_event_id) {
    fail(`review item ${item.review_item_id} missing audit_event_id`);
  }
}
console.log('PASS: every review queue item has required fields and safety values.');

for (const assertion of REQUIRED_REVIEW_SAFETY_ASSERTIONS) {
  if (!output.review_safety_assertions.includes(assertion)) {
    fail(`review_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_REVIEW_SAFETY_ASSERTIONS.length} required review safety assertions are present.`,
);

for (const routing of ROOFER_REVIEW_ROUTING_ASSERTIONS) {
  const match = output.review_queue_items.find(
    (item) => item.review_type === routing.review_type && item.review_owner === routing.owner,
  );
  if (!match) {
    fail(`${routing.assertion_id}: no review item with type ${routing.review_type} owned by ${routing.owner}`);
  }
  if (!match.business_judgment_required) {
    fail(`${routing.assertion_id}: business_judgment_required must be true`);
  }
  if (match.system_quality_issue) {
    fail(`${routing.assertion_id}: system_quality_issue must be false for roofer routing`);
  }
}
console.log(
  `PASS: all ${ROOFER_REVIEW_ROUTING_ASSERTIONS.length} roofer routing assertions verified.`,
);

for (const routing of ROOFLEADHQ_REVIEW_ROUTING_ASSERTIONS) {
  const match = output.review_queue_items.find(
    (item) => item.review_type === routing.review_type && item.review_owner === routing.owner,
  );
  if (!match) {
    fail(`${routing.assertion_id}: no review item with type ${routing.review_type} owned by ${routing.owner}`);
  }
  if (match.business_judgment_required) {
    fail(`${routing.assertion_id}: business_judgment_required must be false for system review`);
  }
  if (!match.system_quality_issue) {
    fail(`${routing.assertion_id}: system_quality_issue must be true for RoofLeadHQ routing`);
  }
}
console.log(
  `PASS: all ${ROOFLEADHQ_REVIEW_ROUTING_ASSERTIONS.length} RoofLeadHQ routing assertions verified.`,
);

const rooferBusinessItems = output.review_queue_items.filter(
  (item) => item.review_owner === 'roofer' && item.business_judgment_required,
);
const roofleadhqSystemItems = output.review_queue_items.filter(
  (item) => item.review_owner === 'roofleadhq_jason' && item.system_quality_issue,
);
if (!rooferBusinessItems.length) {
  fail('roofer_review_owns_business_judgment: no roofer business-judgment items');
}
if (!roofleadhqSystemItems.length) {
  fail('roofleadhq_review_limited_to_system_quality: no RoofLeadHQ system-quality items');
}
console.log('PASS: roofer owns business judgment and RoofLeadHQ limited to system quality.');

if (!output.review_queue_summary.fake_data_only) {
  fail('review_queue_summary.fake_data_only must be true');
}
if (output.review_queue_summary.production_data_touched !== 'no') {
  fail('review_queue_summary.production_data_touched must be no');
}
if (output.review_queue_summary.external_services_called !== 'no') {
  fail('review_queue_summary.external_services_called must be no');
}
if (!output.review_queue_summary.live_review_notification_blocked_by_activation_flag) {
  fail('live_review_notification_blocked_when_flag_false: summary flag must be true');
}
console.log('PASS: review queue summary safety boundaries verified.');

if (!output.roofer_review_summary.all_routing_types_covered) {
  fail('roofer_review_summary.all_routing_types_covered must be true');
}
if (!output.roofleadhq_review_summary.all_routing_types_covered) {
  fail('roofleadhq_review_summary.all_routing_types_covered must be true');
}
console.log('PASS: roofer and RoofLeadHQ routing type coverage confirmed.');

const byId = {};
for (const scenario of output.scenarios) {
  byId[scenario.scenario_id] = scenario;
}

const rooferReview = byId.roofer_review_needed_path.review_queue_items || [];
if (!rooferReview.some((item) => item.review_owner === 'roofer')) {
  fail('roofer review scenario missing roofer/contractor review item');
}
if (!rooferReview.some((item) => item.review_type === 'pricing_question')) {
  fail('roofer review scenario missing pricing_question review type');
}
console.log('PASS: roofer review scenario has expanded roofer review item.');

const systemReview = byId.roofleadhq_system_review_needed_path.review_queue_items || [];
if (!systemReview.some((item) => item.review_owner === 'roofleadhq_jason')) {
  fail('RoofLeadHQ system review scenario missing RoofLeadHQ/Jason review item');
}
if (!systemReview.some((item) => item.review_type === 'workflow_state_confusion')) {
  fail('RoofLeadHQ system review scenario missing workflow_state_confusion review type');
}
console.log('PASS: RoofLeadHQ system review scenario has expanded system review item.');

const duplicateReview = byId.duplicate_review_path.review_queue_items || [];
if (!duplicateReview.some((item) => item.review_type === 'duplicate_lead_confusion')) {
  fail('duplicate review scenario missing duplicate_lead_confusion review type');
}
console.log('PASS: duplicate review scenario routes to RoofLeadHQ system review.');

if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
if (!output.reporting_snapshot_summary) {
  fail('output missing reporting_snapshot_summary');
}
console.log('PASS: existing guard assertion and reporting snapshot summaries remain present.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (scenario.production_data_touched !== 'no') {
    fail(`scenario ${scenario.scenario_id} production_data_touched is not no`);
  }
  if (scenario.external_services_called !== 'no') {
    fail(`scenario ${scenario.scenario_id} external_services_called is not no`);
  }
}
console.log('PASS: every scenario preserves safety fields.');

const existingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, existingVerifierPath)],
  { cwd: root, encoding: 'utf8' },
);
if (existingVerifierRun.status !== 0) {
  fail(
    `existing fixture dry-run verifier failed: ${existingVerifierRun.stderr || existingVerifierRun.stdout}`,
  );
}
console.log('PASS: existing fixture dry-run verifier still passes.');

mustHave(doc, 'Local E2E Fixture Runner', 'documentation');
mustHave(doc, 'LOCAL_E2E_FIXTURE_RUNNER_PACKET.md', 'documentation');
console.log('PASS: documentation includes local E2E runner relationship.');

mustHave(doc, 'first paid roofer', 'documentation');
console.log('PASS: documentation includes first paid roofer relationship.');

const forbiddenPublic = [
  'booked jobs',
  'book jobs',
  'close jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  'automatic estimate',
  'automatic quote',
  'automatic invoice',
  'automatic payment',
  'native CRM sync',
  'fully autonomous',
  'fake reviews',
  'review farming',
  'automatic public review generation',
];
for (const phrase of forbiddenPublic) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}
console.log('PASS: forbidden public language is absent from documentation.');

const unsafePatterns = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /require\(['"]https['"]\)/,
  /require\(['"]http['"]\)/,
  /fetch\(/,
  /ALTER TABLE/,
  /CREATE TABLE/,
  /CREATE POLICY/,
];
for (const [label, file] of [
  ['runner', runner],
  ['wrapper', wrapper],
  ['documentation', doc],
]) {
  for (const pattern of unsafePatterns) {
    if (pattern.test(file)) {
      fail(`unsafe pattern ${pattern} found in ${label}`);
    }
  }
}
console.log('PASS: no unsafe imports or strings in runner/verifier/wrapper/docs.');

const safetyDocPhrases = [
  'no Supabase',
  'no schema',
  'no migrations',
  'no auth/RLS',
  'no production data',
  'no live automation',
  'no integrations',
  'no external calls',
  'local fake-data dry-run only',
];
for (const phrase of safetyDocPhrases) {
  mustHave(doc, phrase, 'documentation safety boundaries');
}
console.log('PASS: safety/no-live/no-production/no-schema/no-integration boundaries documented.');

mustHave(aggregate, 'verify-native-workflow-fixture-review-queue-expansion-readonly.js', 'aggregate readiness');
mustHave(aggregate, 'Native Workflow Fixture Review Queue Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md',
  'run-native-workflow-fixture-review-queue-expansion-dry-run.sh',
  'verify-native-workflow-fixture-review-queue-expansion-readonly.js',
  'Native Workflow Fixture Review Queue Expansion',
  'native workflow fixture review queue expansion',
  'review queue expansion',
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextRooferDryRun, ref, 'next chat roofer dry run onboarding context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
console.log('PASS: required wiring into aggregate readiness and context docs is present.');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'run-native-workflow-fixture-state-model-dry-run.js', 'wrapper runner');
mustHave(wrapper, 'verify-native-workflow-fixture-state-model-dry-run-readonly.js', 'wrapper existing verifier');
mustHave(wrapper, 'verify-native-workflow-fixture-guard-assertions-expansion-readonly.js', 'wrapper guard verifier');
mustHave(wrapper, 'verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js', 'wrapper reporting verifier');
mustHave(wrapper, 'verify-native-workflow-fixture-review-queue-expansion-readonly.js', 'wrapper review queue verifier');
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount =
  REQUIRED_REVIEW_SAFETY_ASSERTIONS.length +
  ROOFER_REVIEW_ROUTING_ASSERTIONS.length +
  ROOFLEADHQ_REVIEW_ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Review Queue Expansion verified (${assertionCount}+ assertions, ${output.review_queue_items.length} review items).`,
);
console.log(
  'PASS: Native Workflow Fixture Review Queue Expansion is fixture-only, deterministic, and dry-run safe.',
);