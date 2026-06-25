#!/usr/bin/env node
/**
 * Build 191 — Local-Only Twilio SDK Readiness Check.
 *
 * Proves the existing fail-closed one-message live SMS runner can RESOLVE and IMPORT the Twilio SDK
 * locally, correcting the Build 190 not-armable reason `twilio_sdk_not_installed_in_build_environment`.
 *
 * This script performs NO live action of any kind:
 *   - It resolves and loads the `twilio` module ONLY (the same require the runner performs).
 *   - It NEVER constructs a Twilio client (no `twilio(sid, token)`).
 *   - It NEVER calls messages.create / makes any network or external Twilio call.
 *   - It NEVER reads any secret env VALUE, recipient number, token, SID, or credential.
 *   - It NEVER sets the live confirm token and NEVER sends an SMS.
 *
 * Module resolution is done from the live SMS runner's own directory so the proof matches exactly
 * how the runner resolves `require('twilio')` at send time. Loading a CommonJS module executes its
 * top-level code but opens no socket; the Twilio SDK only contacts the network when a client method
 * (e.g. messages.create) is invoked — which this script never does.
 *
 * Output is names/booleans/version only — no secret values. Exit 0 = SDK readiness confirmed.
 */

const fs = require('fs');
const path = require('path');
const Module = require('module');

const root = path.resolve(__dirname, '..', '..');
const RUNNER_REL = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const MANIFEST_REL = 'backend/package.json';
const LOCKFILE_REL = 'backend/package-lock.json';

const result = {
  check: 'twilio_sdk_readiness_build_191',
  build: 191,
  twilio_sdk_dependency_present: false,
  dependency_declared_in_manifest: false,
  dependency_present_in_lockfile: false,
  resolvable_from_runner_directory: false,
  module_export_is_function: false,
  installed_version_names_only: null,
  twilio_client_constructed: false,
  messages_create_called: false,
  process_env_secret_values_read: false,
  network_call_made: false,
  no_live_action: true,
  no_network_call: true,
  no_sms_sent: true,
  send_attempt_count: 0
};

function fail(msg) {
  console.error('FAIL: ' + msg);
  process.exit(1);
}

// 1) Manifest declares twilio in dependencies (names only).
const manifest = JSON.parse(fs.readFileSync(path.join(root, MANIFEST_REL), 'utf8'));
if (manifest.dependencies && typeof manifest.dependencies.twilio === 'string') {
  result.dependency_declared_in_manifest = true;
} else {
  fail('twilio is not declared in ' + MANIFEST_REL + ' dependencies');
}

// 2) Lockfile contains a twilio entry (presence only).
const lockfileText = fs.readFileSync(path.join(root, LOCKFILE_REL), 'utf8');
if (lockfileText.includes('"node_modules/twilio"')) {
  result.dependency_present_in_lockfile = true;
} else {
  fail('twilio entry not present in ' + LOCKFILE_REL);
}

// 3) Resolve `twilio` exactly as the runner would: from the runner's own directory.
const runnerDir = path.join(root, path.dirname(RUNNER_REL));
let resolvedPath;
try {
  resolvedPath = Module.createRequire(path.join(runnerDir, 'noop.js')).resolve('twilio');
  result.resolvable_from_runner_directory = true;
} catch (e) {
  result.no_network_call = result.no_network_call && true;
  fail('twilio is NOT resolvable from the runner directory (' + (e && e.code) + ') — run `npm install --prefix backend`');
}

// 4) Load (import) the module — no client construction, no network.
let twilioExport;
try {
  twilioExport = require(resolvedPath);
  result.module_export_is_function = typeof twilioExport === 'function';
} catch (e) {
  fail('twilio module failed to load: ' + (e && e.message ? e.message : 'unknown'));
}
if (!result.module_export_is_function) fail('twilio export is not a constructible function');

// 5) Record the installed version (names/version only — never a secret).
try {
  const pkgPath = Module.createRequire(path.join(runnerDir, 'noop.js')).resolve('twilio/package.json');
  result.installed_version_names_only = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version || null;
} catch (e) {
  result.installed_version_names_only = null;
}

result.twilio_sdk_dependency_present =
  result.dependency_declared_in_manifest &&
  result.dependency_present_in_lockfile &&
  result.resolvable_from_runner_directory &&
  result.module_export_is_function;

if (!result.twilio_sdk_dependency_present) fail('twilio SDK readiness incomplete');

// Deliberately NO client construction, NO messages.create, NO secret env reads, NO send.
console.log(JSON.stringify(result, null, 2));
console.log('PASS: Twilio SDK dependency present and importable by the live SMS runner (no client, no network, no SMS).');
