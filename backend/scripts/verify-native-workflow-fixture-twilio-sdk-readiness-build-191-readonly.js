#!/usr/bin/env node
/**
 * Build 191 Read-Only Verifier — Twilio SDK Readiness (local-only dependency/readiness correction).
 *
 * Read-only. Node built-ins only (fs, path, module) plus the existing pilot readiness helper. No
 * network, no process.env secret-value access, no credentials, no secret VALUES, no production data,
 * no live activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke
 * the live execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The Twilio SDK dependency is declared in the correct backend manifest, present in the lockfile,
 *    installed, and RESOLVABLE/IMPORTABLE from the live SMS runner's own directory (the same require
 *    the runner performs) — correcting the Build 190 not-armable reason
 *    `twilio_sdk_not_installed_in_build_environment`.
 *  - The Build 191 readiness artifact records twilio_sdk_dependency_present=true, no_live_action=true,
 *    no_network_call=true, no_sms_sent=true, send_attempt_count=0.
 *  - Build 191 does NOT consume the still-pending approved Build 190 one-message attempt, because no
 *    send attempt occurred (Build 190 evidence: send_attempt_count=0, sms_was_sent=false).
 *  - The local-only SDK readiness check helper and dry-run wrapper run the verifier/check only and
 *    never arm or run a live send.
 *  - Names/metadata/booleans/version only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const Module = require('module');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const readinessPath = `${FIXTURE_DIR}/twilio-sdk-readiness-build-191.json`;
const manifestPath = 'backend/package.json';
const lockfilePath = 'backend/package-lock.json';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const checkScriptPath = 'backend/scripts/check-twilio-sdk-readiness-build-191.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-twilio-sdk-readiness-build-191-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_TWILIO_SDK_READINESS_BUILD_191.md';
const build190EvidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence-build-190.json`;

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function fullPath(rel) { return path.join(root, rel); }
function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}
function readJson(rel) { return JSON.parse(read(rel)); }
function isExecutable(rel) {
  try { fs.accessSync(fullPath(rel), fs.constants.X_OK); return true; } catch { return false; }
}

console.log('== Build 191 Twilio SDK Readiness Verification (local-only) ==');

const readiness = readJson(readinessPath);
const manifest = readJson(manifestPath);
const lockfileText = read(lockfilePath);
const runnerSrc = read(runnerPath);
const checkSrc = read(checkScriptPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
const build190 = readJson(build190EvidencePath);

// --- Dependency is declared in the correct manifest and present in the lockfile ---
if (readiness.build !== 191) fail('readiness build must be 191');
if (!manifest.dependencies || typeof manifest.dependencies.twilio !== 'string') fail('twilio must be declared in backend/package.json dependencies');
if (manifest.dependencies.twilio !== readiness.dependency_version_range_declared) {
  fail('readiness declared range must match manifest: ' + manifest.dependencies.twilio);
}
if (!lockfileText.includes('"node_modules/twilio"')) fail('lockfile must contain a twilio entry');
if (readiness.dependency_manifest_path !== manifestPath) fail('readiness manifest path must be backend/package.json');
if (readiness.lockfile_path !== lockfilePath) fail('readiness lockfile path must be backend/package-lock.json');
if (readiness.dependency_declared_in_manifest !== true || readiness.dependency_present_in_lockfile !== true) {
  fail('readiness must record dependency declared and locked');
}
pass('build_191_twilio_dependency_declared_in_correct_manifest_and_present_in_lockfile');

// --- The runner actually requires the SDK, and it RESOLVES/IMPORTS from the runner's directory ---
if (!/require\(\s*['"]twilio['"]\s*\)/.test(runnerSrc)) fail('runner must contain require("twilio")');
if (readiness.runner_path_that_requires_sdk !== runnerPath) fail('readiness runner path must match the live SMS runner');
if (readiness.runner_require_statement_present !== true) fail('readiness must record runner require statement present');

const runnerDir = path.join(root, path.dirname(runnerPath));
const runnerRequire = Module.createRequire(path.join(runnerDir, 'noop.js'));
let resolvedFromRunner = null;
try { resolvedFromRunner = runnerRequire.resolve('twilio'); }
catch (e) { fail('twilio is NOT resolvable from the runner directory (' + (e && e.code) + ') — run npm install --prefix backend'); }
if (!resolvedFromRunner || !resolvedFromRunner.includes(`${path.sep}twilio${path.sep}`)) fail('resolved twilio path looks wrong: ' + resolvedFromRunner);

// Load (import) the module only — never construct a client, never touch the network.
const twilioExport = runnerRequire('twilio');
if (typeof twilioExport !== 'function') fail('twilio module export must be a constructible function');
const installedVersion = JSON.parse(fs.readFileSync(runnerRequire.resolve('twilio/package.json'), 'utf8')).version;
if (installedVersion !== readiness.locked_version_names_only) {
  fail('installed twilio version (' + installedVersion + ') must match readiness locked_version_names_only (' + readiness.locked_version_names_only + ')');
}
if (readiness.resolvable_from_runner_directory !== true || readiness.module_loads_without_constructing_client !== true) {
  fail('readiness must record resolvable from runner directory and module loads without constructing a client');
}
if (readiness.twilio_sdk_dependency_present !== true) fail('readiness twilio_sdk_dependency_present must be true');
pass('build_191_twilio_sdk_resolves_and_imports_from_runner_directory_version_' + installedVersion);

// --- Required local-only no-action booleans ---
if (readiness.no_live_action !== true) fail('readiness no_live_action must be true');
if (readiness.no_network_call !== true) fail('readiness no_network_call must be true');
if (readiness.no_sms_sent !== true) fail('readiness no_sms_sent must be true');
if (readiness.send_attempt_count !== 0) fail('readiness send_attempt_count must be 0');
const method = readiness.readiness_check_method_names_only || {};
for (const k of ['require_resolve_twilio_from_runner_directory', 'require_load_twilio_module_export_is_function']) {
  if (method[k] !== true) fail('readiness check method must record true: ' + k);
}
for (const k of ['twilio_client_constructed', 'messages_create_called', 'process_env_secret_values_read',
  'network_socket_opened', 'confirm_token_set']) {
  if (method[k] !== false) fail('readiness check method must record false: ' + k);
}
for (const k of ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'recipient_number_recorded',
  'production_data_used', 'used_production_supabase', 'real_homeowner_contact', 'channel_expanded_beyond_sms',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'schema_auth_rls_security_changes',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created']) {
  if (readiness[k] !== false) fail('readiness safety attestation must be false: ' + k);
}
if (readiness.other_live_automation_remains_disabled !== true) fail('readiness other_live_automation_remains_disabled must be true');
pass('build_191_readiness_records_no_live_action_no_network_no_sms_zero_attempts');

// --- Build 191 does NOT consume the pending approved Build 190 attempt (no send occurred) ---
if (build190.send_attempt_count !== 0 || build190.sms_was_sent !== false) {
  fail('Build 190 evidence must still record zero attempts / not sent for the no-consumption claim to hold');
}
const rel = readiness.build_190_relationship || {};
if (rel.build_191_consumes_build_190_approval !== false) fail('readiness must record Build 191 does NOT consume Build 190 approval');
if (rel.build_190_approval_still_pending_unconsumed !== true) fail('readiness must record Build 190 approval still pending/unconsumed');
if (rel.build_190_send_attempt_count !== 0 || rel.build_190_sms_was_sent !== false) fail('readiness must mirror Build 190 zero attempts / not sent');
if (rel.corrects_build_190_not_armable_reason !== 'twilio_sdk_not_installed_in_build_environment') {
  fail('readiness must record it corrects the Build 190 twilio_sdk_not_installed not-armable reason');
}
pass('build_191_does_not_consume_pending_build_190_approval_no_send_attempt_occurred');

// --- Check helper script is read-only by construction: no client, no messages.create, no secret reads ---
if (/twilio\s*\(\s*process\.env/.test(checkSrc)) fail('check script must NOT construct a Twilio client from env secrets');
if (/\.messages\.create\s*\(/.test(checkSrc)) fail('check script must NOT call messages.create');
if (/CONTROLLED_LIVE_SMS_CONFIRM/.test(checkSrc)) fail('check script must NOT reference the live confirm token');
if (!/require\.resolve\(\s*['"]twilio['"]\s*\)|resolve\(['"]twilio['"]\)/.test(checkSrc)) fail('check script must resolve twilio');
pass('build_191_check_helper_is_read_only_resolves_sdk_without_client_or_send');

// --- No secret values / phone numbers anywhere in Build 191 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(readiness), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(dataArtifactText.replace(/"(?:code|status|build)"\s*:\s*\d+/g, ''))) {
  fail('a phone-number-shaped digit run appears in artifacts');
}
pass('no_secret_values_or_phone_numbers_present_in_any_build_191_artifact');

// --- No false "sms sent" / "armed" / "live action" claims anywhere ---
const forbiddenClaims = [
  '"sms_was_sent": true', '"no_sms_sent": false', '"no_live_action": false', '"no_network_call": false',
  '"messages_create_called": true', '"twilio_client_constructed": true', '"send_attempt_count": 1',
  '"build_191_consumes_build_190_approval": true'
];
const combined = dataArtifactText + '\n' + wrapper + '\n' + checkSrc;
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden send/live-action/consumption claim present: ' + claim);
}
pass('no_false_sms_sent_armed_live_action_or_approval_consumption_claims_anywhere');

// --- Dry-run wrapper: local-only; runs verifier + check; never runs the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM')) fail('wrapper must NOT set the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-twilio-sdk-readiness-build-191-readonly.js')) fail('wrapper must run the Build 191 verifier');
if (!wrapper.includes('check-twilio-sdk-readiness-build-191.js')) fail('wrapper must run the Build 191 SDK readiness check');
pass('build_191_dry_run_wrapper_runs_verifier_and_check_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 191', 'Twilio SDK', 'no_network_call', 'send_attempt_count', 'Build 190', 'does not consume', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_191_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifact + pilot readiness helper) ---
if (readiness.safety_status !== 'demo_ready_with_live_automation_disabled') fail('readiness safety_status must be demo_ready_with_live_automation_disabled');
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Twilio SDK dependency declared in backend/package.json, present in lockfile, installed, and importable by the live SMS runner.');
console.log('PASS: SDK resolves/imports from the runner directory (twilio ' + installedVersion + ') with no client construction, no network, no SMS.');
console.log('PASS: Build 191 is local-only — no live action, no network call, no SMS; send_attempt_count=0.');
console.log('PASS: Build 191 does NOT consume the still-pending approved Build 190 one-message attempt (no send attempt occurred).');
console.log('PASS: names/metadata/booleans/version only; no secret values or phone numbers; safety_status preserved.');
console.log('PASS: Build 191 verifier passed (' + passCount + ' assertions).');
