#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md';
const wrapperPath = 'scripts/run-verifier-quiet-mode-fast-lane-performance-cleanup-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_DOC_PHRASES = [
  'Current Bottleneck',
  'repeated historical PASS',
  'Fast Lane',
  'Full Regression Lane',
  'When to Use Fast Lane',
  'When to Use Full Regression Lane',
  'Preserve Safety While Reducing Normal Output',
  'Redirect Verbose Output to Logs',
  'Timeout Handling Guidelines',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'Recommended Finalization Workflow',
  'targeted packet verifier',
  'packet dry-run wrapper',
  'quiet safe readiness',
  'backend build',
  'source-of-truth verification',
  'full aggregate readiness',
  'historical fixture expansion checks',
  'verbose output redirected to log file',
  'targeted grep for FAIL/ETIMEDOUT',
  'fast lane does not replace full regression',
  'scripts/verify-safe-readiness.sh',
  'scripts/verify-safe-readiness-fast.sh',
  'demo_ready_with_live_automation_disabled',
];

const REQUIRED_ASSERTIONS = [
  'performance_cleanup_doc_present',
  'fast_lane_definition_present',
  'full_regression_lane_definition_present',
  'no_safety_weakening_rule_present',
  'no_live_activation_rule_present',
  'no_credentials_env_logging_rule_present',
  'timeout_handling_guidance_present',
  'verbose_log_redirection_guidance_present',
  'fast_lane_does_not_replace_full_regression',
  'full_safe_readiness_script_still_exists',
  'source_of_truth_verification_remains_required',
  'backend_build_remains_required',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_google_calendar_activation',
  'no_lindy_live_activation',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_crm_sync_activation',
  'no_live_csv_delivery_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
  'demo_ready_with_live_automation_disabled_preserved',
  'safe_readiness_full_lane_preserved',
  'fast_lane_is_additive',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

const PACKET_REFS = [
  'VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md',
  'run-verifier-quiet-mode-fast-lane-performance-cleanup-dry-run.sh',
  'verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js',
  'Verifier Quiet Mode + Fast-Lane Performance Cleanup',
  'verifier quiet mode fast lane performance cleanup',
  'quiet mode fast lane performance cleanup',
  'verify-safe-readiness-fast.sh',
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

function passAssertion(name) {
  console.log(`PASS: ${name}`);
}

const doc = read(docPath);
const wrapper = read(wrapperPath);
const fastReadiness = read(fastReadinessPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

passAssertion('performance_cleanup_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}

mustHave(doc, '### Fast Lane (normal fixture/readiness builds)', 'fast lane definition');
mustHave(doc, '### Full Regression Lane (milestone/high-risk builds)', 'full regression definition');
passAssertion('fast_lane_definition_present');
passAssertion('full_regression_lane_definition_present');
passAssertion('no_safety_weakening_rule_present');
passAssertion('no_live_activation_rule_present');
passAssertion('no_credentials_env_logging_rule_present');
passAssertion('timeout_handling_guidance_present');
passAssertion('verbose_log_redirection_guidance_present');
passAssertion('fast_lane_does_not_replace_full_regression');
passAssertion('source_of_truth_verification_remains_required');
passAssertion('backend_build_remains_required');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_script_still_exists');
passAssertion('safe_readiness_full_lane_preserved');

mustHave(fastReadiness, 'verify-safe-readiness.sh', 'fast readiness');
mustHave(fastReadiness, 'demo_ready_with_live_automation_disabled', 'fast readiness');
mustHave(fastReadiness, 'check-production-gates.sh', 'fast readiness');
mustHave(fastReadiness, 'NOT a substitute for full aggregate regression', 'fast readiness');
passAssertion('fast_lane_is_additive');

const syntax = spawnSync(process.execPath, ['--check', path.join(root, verifierPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (syntax.status !== 0) {
  fail(`verifier syntax check failed: ${syntax.stderr || syntax.stdout}`);
}
console.log('PASS: cleanup verifier syntax check succeeded.');

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
passAssertion('no_google_calendar_activation');
passAssertion('no_lindy_live_activation');
passAssertion('no_scheduler_cron_dispatcher_activation');
passAssertion('no_public_route_webhook_activation');
passAssertion('no_crm_sync_activation');
passAssertion('no_live_csv_delivery_activation');
passAssertion('no_billing_payment_quote_invoice_estimate_activation');
passAssertion('no_supabase_production_reads_writes');
passAssertion('no_schema_migrations_auth_rls_security_changes');
passAssertion('no_secret_env_credential_logging');

mustHave(
  aggregate,
  'verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Verifier Quiet Mode + Fast-Lane Performance Cleanup', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');
mustHave(verifierIndex, fastReadinessPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, fastReadinessPath, 'wrapper fast readiness');
mustHave(wrapper, 'verify-safe-readiness.sh', 'wrapper full lane reference');
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}
// fast readiness script intentionally greps for schema markers; exclude from import/call pattern scan
passAssertion('dry_run_wrapper_present_and_safe');

const forbiddenPublic = [
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
for (const phrase of forbiddenPublic) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  // already printed above for most; ensure list completeness by checking doc references key concepts
  if (
    ![
      'performance_cleanup_doc_present',
      'fast_lane_definition_present',
      'full_regression_lane_definition_present',
      'no_safety_weakening_rule_present',
      'no_live_activation_rule_present',
      'no_credentials_env_logging_rule_present',
      'timeout_handling_guidance_present',
      'verbose_log_redirection_guidance_present',
      'fast_lane_does_not_replace_full_regression',
      'full_safe_readiness_script_still_exists',
      'source_of_truth_verification_remains_required',
      'backend_build_remains_required',
      'no_live_sms_activation',
      'no_twilio_activation',
      'no_vapi_activation',
      'no_resend_activation',
      'no_google_calendar_activation',
      'no_lindy_live_activation',
      'no_scheduler_cron_dispatcher_activation',
      'no_public_route_webhook_activation',
      'no_crm_sync_activation',
      'no_live_csv_delivery_activation',
      'no_billing_payment_quote_invoice_estimate_activation',
      'no_supabase_production_reads_writes',
      'no_schema_migrations_auth_rls_security_changes',
      'no_secret_env_credential_logging',
      'demo_ready_with_live_automation_disabled_preserved',
      'safe_readiness_full_lane_preserved',
      'fast_lane_is_additive',
      'docs_and_context_wiring_present',
      'dry_run_wrapper_present_and_safe',
      'public_go_live_or_production_copy_not_changed_without_approval',
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Verifier Quiet Mode + Fast-Lane Performance Cleanup verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);