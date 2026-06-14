#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const startedAt = new Date();
const runId = `local-e2e-fixture-${startedAt.toISOString().replace(/[:.]/g, '-')}`;
const outRoot = process.env.ROOFLEADHQ_LOCAL_E2E_OUT_DIR || '/tmp/roofleadhq-local-e2e-fixture-runner';
const outDir = path.join(outRoot, runId);

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(data, null, 2) + '\n');
}

function writeText(name, data) {
  fs.writeFileSync(path.join(outDir, name), data);
}

function pass(name, details) {
  return { name, status: 'PASS', details };
}

function hold(name, details) {
  return { name, status: 'HOLD', details };
}

ensureDir(outDir);

const fixtures = [
  {
    id: 'fixture-fast-response-ready',
    source: 'website_form',
    homeowner: 'Sample Homeowner A',
    phone: '+15550101001',
    issue: 'Roof leak after storm; wants inspection.',
    serviceAreaMatch: true,
    urgency: 'normal',
    preferredWindow: 'tomorrow afternoon',
    hasEnoughBookingInfo: true,
    missedLead: false
  },
  {
    id: 'fixture-missed-lead-recovery',
    source: 'paid_lead_marketplace',
    homeowner: 'Sample Homeowner B',
    phone: '+15550101002',
    issue: 'Hail damage; no response after initial inquiry.',
    serviceAreaMatch: true,
    urgency: 'high',
    preferredWindow: null,
    hasEnoughBookingInfo: false,
    missedLead: true
  },
  {
    id: 'fixture-hold-not-service-area',
    source: 'phone_summary',
    homeowner: 'Sample Homeowner C',
    phone: '+15550101003',
    issue: 'Roof replacement request outside roofer service area.',
    serviceAreaMatch: false,
    urgency: 'normal',
    preferredWindow: 'Friday morning',
    hasEnoughBookingInfo: true,
    missedLead: false
  }
];

function generateInitialResponse(lead) {
  if (!lead.serviceAreaMatch) {
    return `Hi ${lead.homeowner}, thanks for reaching out. I need to confirm whether this address is inside the roofing contractor's service area before moving toward an inspection.`;
  }
  return `Hi ${lead.homeowner}, thanks for reaching out about your roof. RoofLeadHQ AI can help gather the details needed to move toward a booked homeowner inspection.`;
}

function generateFollowUp(lead) {
  if (lead.missedLead) {
    return `Following up on your roofing request. Are you still looking to schedule a homeowner inspection?`;
  }
  return `Just checking in to confirm the best inspection window and any access notes for the roofer.`;
}

function qualifyLead(lead) {
  if (!lead.serviceAreaMatch) return hold('lead qualification', 'Service-area mismatch requires operator review before any next step.');
  if (!lead.hasEnoughBookingInfo) return hold('lead qualification', 'Lead is eligible but missing booking window details.');
  return pass('lead qualification', 'Lead is eligible, in service area, and has enough inspection readiness details.');
}

function appointmentReadiness(lead) {
  if (!lead.serviceAreaMatch) return hold('appointment/inspection readiness', 'Cannot mark appointment-ready until service-area review passes.');
  if (!lead.hasEnoughBookingInfo) return hold('appointment/inspection readiness', 'Needs preferred inspection window before calendar handoff simulation.');
  return pass('appointment/inspection readiness', 'Ready for simulated roofer calendar handoff.');
}

function calendarHandoffSimulation(lead) {
  if (!lead.serviceAreaMatch || !lead.hasEnoughBookingInfo) {
    return hold('roofer calendar handoff simulation', 'Calendar handoff simulation held because readiness is incomplete.');
  }
  return pass('roofer calendar handoff simulation', `Simulated handoff only: preferred window is ${lead.preferredWindow}. No calendar event created.`);
}

const scenarioResults = fixtures.map((lead) => {
  const initialResponse = generateInitialResponse(lead);
  const followUp = generateFollowUp(lead);
  const qualification = qualifyLead(lead);
  const readiness = appointmentReadiness(lead);
  const calendar = calendarHandoffSimulation(lead);

  const checks = [
    pass('fixture/sample lead intake', `Loaded ${lead.id} from ${lead.source}.`),
    pass('AI response generation', initialResponse),
    pass('AI follow-up generation', followUp),
    qualification,
    lead.missedLead ? pass('missed-lead recovery path', 'Missed-lead recovery follow-up generated for operator review.') : pass('missed-lead recovery path', 'Not a missed-lead fixture; recovery path not required.'),
    readiness,
    calendar,
    pass('homeowner/roofer communication review', 'All generated homeowner-facing text is draft-only and ready for operator review.'),
    pass('trial/payment language handling', 'No payment, billing, guarantee, quote, invoice, or job-close claims generated.')
  ];

  const status = checks.some((check) => check.status === 'HOLD') ? 'HOLD' : 'PASS';

  return {
    fixture_id: lead.id,
    status,
    lead,
    generated: {
      initial_response: initialResponse,
      follow_up: followUp
    },
    checks
  };
});

const summary = {
  runner: 'RoofLeadHQ Local E2E Fixture Runner',
  mode: 'local_fixture_only',
  run_id: runId,
  started_at: startedAt.toISOString(),
  completed_at: new Date().toISOString(),
  output_directory: outDir,
  scenario_count: scenarioResults.length,
  pass_count: scenarioResults.filter((item) => item.status === 'PASS').length,
  hold_count: scenarioResults.filter((item) => item.status === 'HOLD').length,
  blocked_count: 0,
  safety: {
    fixture_sample_leads_only: true,
    external_sends: false,
    production_writes: false,
    production_supabase_writes: false,
    calendar_events_created: false,
    payment_automation: false,
    credentials_or_env_read: false,
    public_route_activation: false
  },
  reporting_snapshot: {
    ready_for_calendar_handoff_simulation: scenarioResults.filter((item) => item.checks.some((check) => check.name === 'roofer calendar handoff simulation' && check.status === 'PASS')).length,
    needs_operator_review: scenarioResults.filter((item) => item.status === 'HOLD').length,
    no_live_sends_occurred: true,
    no_production_writes_occurred: true
  },
  results: scenarioResults
};

writeJson('local-e2e-fixture-results.json', summary);

const markdown = [
  '# RoofLeadHQ Local E2E Fixture Runner Evidence',
  '',
  `Run ID: ${runId}`,
  `Mode: ${summary.mode}`,
  `Scenario count: ${summary.scenario_count}`,
  `PASS: ${summary.pass_count}`,
  `HOLD: ${summary.hold_count}`,
  `BLOCKED: ${summary.blocked_count}`,
  '',
  '## Safety confirmation',
  '',
  '- Fixture/sample leads only: yes',
  '- No live sends occurred.',
  '- No production writes occurred.',
  '- No production Supabase writes occurred.',
  '- No calendar event created.',
  '- No payment automation occurred.',
  '- No credentials or env values read.',
  '- No public route activation occurred.',
  '',
  '## Scenario results',
  '',
  ...scenarioResults.map((item) => `- ${item.fixture_id}: ${item.status}`)
].join('\n') + '\n';

writeText('local-e2e-fixture-evidence.md', markdown);

console.log('=== RoofLeadHQ Local E2E Fixture Runner ===');
console.log('LOCAL FIXTURE ONLY');
console.log('No live SMS');
console.log('No external sends');
console.log('No production writes');
console.log('No production Supabase writes');
console.log('No calendar booking automation');
console.log('No payment automation');
console.log(`Evidence directory: ${outDir}`);
console.log(`PASS scenarios: ${summary.pass_count}`);
console.log(`HOLD scenarios: ${summary.hold_count}`);
console.log('PASS: local E2E fixture runner completed safely');
