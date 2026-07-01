#!/usr/bin/env node
/**
 * Build 267 Read-Only Verifier — Production EOCR-404 Route & Deployment Diagnosis (repo-only).
 *
 * Proves the Build 267 diagnosis packet is internally consistent AND grounded in the REAL repo:
 *  - the expected route POST /webhooks/vapi/call-completed is registered at HEAD (index.ts mount +
 *    route file), unconditionally, in the same app/file as /health;
 *  - the backend build->start artifact chain is internally consistent (build=tsc src->dist,
 *    start=node dist/index.js, dist gitignored) => no repo bug;
 *  - there is NO deployment descriptor in the repo (no Dockerfile, Procfile, railway.json/toml,
 *    nixpacks.toml, .buildpacks,
 *    no root package.json) => Railway build/start/root/deployed-commit are dashboard-only and the repo
 *    cannot pin what production runs;
 *  - therefore the packet's decision is Path B (read-only Railway inspection), with NO repo bug, NO
 *    deploy approval, NO call approval, and NO backend source/config change.
 *
 * Read-only. No network, no Supabase, no secret/credential access, no provider client, no SMS, no
 * Twilio, no Retell, no call, no phone dialed, no Vapi Test/Talk/webCall, no live webhook, no curl,
 * no env mutation, no deploy, no build. Checks `git status` before/after to prove non-mutation.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }

function gitStatus() {
  return execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
}
function read(rel) {
  const p = path.join(repoRoot, rel);
  assert(fs.existsSync(p), `expected file missing: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}
function exists(rel) {
  return fs.existsSync(path.join(repoRoot, rel));
}
function commitPresent(sha) {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${sha}^{commit}`],
      { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) {
    return false;
  }
}
function tracked(rel) {
  const out = execFileSync('git', ['ls-files', rel], { cwd: repoRoot, encoding: 'utf8' });
  return out.trim().length > 0;
}

const DOC = 'docs/PRODUCTION_EOCR_ROUTE_DEPLOYMENT_DIAGNOSIS_BUILD_267.md';
const B266_DOC = 'docs/CLEAN_VAPI_PSTN_EOCR_404_BUILD_266.md';
const VERIFIER = 'backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js';
const B266_VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js';
const DRY_RUN = 'scripts/run-production-eocr-route-diagnosis-build-267-dry-run.sh';
const INDEX_FILE = 'backend/src/index.ts';
const ROUTE_FILE = 'backend/src/routes/vapi-webhooks.ts';
const PKG = 'backend/package.json';
const TSCONFIG = 'backend/tsconfig.json';

(function main() {
  const before = gitStatus();

  const doc = read(DOC);

  // 1. Prerequisite Build 266 commit + doc present.
  assert(commitPresent('9c637ed'), 'Build 266 prerequisite commit 9c637ed present in git history');
  assert(exists(B266_DOC), 'Build 266 EOCR-404 doc present (predecessor)');
  pass('Build 266 prerequisite commit 9c637ed present and predecessor EOCR-404 doc exists');

  // 2. GROUND-TRUTH: expected route registered at HEAD, unconditionally, alongside /health.
  const indexSrc = read(INDEX_FILE);
  assert(/import\s+vapiWebhooksRouter\s+from\s+['"]\.\/routes\/vapi-webhooks['"]/.test(indexSrc),
    'index.ts imports the vapi-webhooks router');
  assert(/app\.use\(\s*['"]\/webhooks\/vapi['"]\s*,\s*vapiWebhooksRouter\s*\)/.test(indexSrc),
    'index.ts mounts vapiWebhooksRouter at /webhooks/vapi (unconditional)');
  assert(/app\.get\(\s*['"]\/health['"]/.test(indexSrc),
    'index.ts registers /health in the same app/file');
  // Unconditional: the mount is a top-level statement, not inside an if/flag block.
  assert(!/if\s*\([^)]*\)\s*\{[^}]*app\.use\(\s*['"]\/webhooks\/vapi['"]/.test(indexSrc),
    'the /webhooks/vapi mount is not wrapped in a conditional/feature-flag block');
  const routeSrc = read(ROUTE_FILE);
  assert(/router\.post\(\s*['"]\/call-completed['"]/.test(routeSrc),
    'vapi-webhooks.ts registers POST /call-completed');
  pass('Ground truth: POST /webhooks/vapi/call-completed is registered at HEAD, unconditionally, in the same app/file as /health');

  // 3. GROUND-TRUTH: single express app / single listen / single entrypoint.
  const appMatches = (indexSrc.match(/express\(\)/g) || []).length;
  const listenMatches = (indexSrc.match(/\.listen\(/g) || []).length;
  assert(appMatches === 1 && listenMatches === 1,
    `index.ts should be the single express app+listen (found express()=${appMatches}, listen=${listenMatches})`);
  pass('Ground truth: single Express app, single .listen, single entrypoint (backend/src/index.ts)');

  // 4. GROUND-TRUTH: build->start artifact chain internally consistent (no repo bug).
  const pkg = JSON.parse(read(PKG));
  assert(pkg.scripts && pkg.scripts.build === 'tsc', 'backend build script is `tsc`');
  assert(pkg.scripts.start === 'node dist/index.js', 'backend start script is `node dist/index.js`');
  const tsconfig = JSON.parse(read(TSCONFIG));
  assert(tsconfig.compilerOptions.rootDir === './src', 'tsconfig rootDir is ./src');
  assert(tsconfig.compilerOptions.outDir === './dist', 'tsconfig outDir is ./dist');
  pass('Ground truth: build=tsc (src->dist) + start=node dist/index.js — build->start chain internally consistent');

  // 5. GROUND-TRUTH: dist is gitignored and not committed (prod must build from source).
  const backendIgnore = read('backend/.gitignore');
  assert(/(^|\n)\s*dist\/?\s*(\n|$)/.test(backendIgnore) || /backend\/dist\/?/.test(backendIgnore),
    'dist/ is gitignored (backend/.gitignore)');
  assert(!tracked('backend/dist'), 'no compiled backend/dist is committed');
  pass('Ground truth: dist/ is gitignored and no compiled dist is committed — production must run tsc to build dist/index.js');

  // 6. GROUND-TRUTH: NO deployment descriptor in repo (dashboard-only config).
  const deployDescriptors = [
    'Dockerfile', 'backend/Dockerfile',
    'Procfile', 'backend/Procfile',
    'railway.json', 'railway.toml', 'backend/railway.json', 'backend/railway.toml',
    'nixpacks.toml', 'backend/nixpacks.toml', '.buildpacks', 'backend/.buildpacks',
    'package.json', // root package.json specifically
  ];
  for (const d of deployDescriptors) {
    assert(!exists(d), `deployment descriptor must be absent (dashboard-only config): ${d}`);
  }
  assert(exists(PKG), 'backend/package.json exists (the only package.json)');
  pass('Ground truth: no repo deployment descriptor (no Dockerfile/Procfile/railway.*/nixpacks/.buildpacks/root package.json) — Railway build/start/root/commit are dashboard-only');

  // 7. Doc records the no-repo-config crux + dashboard-only implication.
  assert(/repo_deploy_config_present=false_dashboard_only/.test(doc),
    'doc records repo_deploy_config_present=false_dashboard_only');
  assert(/dashboard, not in the repo/i.test(doc), 'doc states config is dashboard-only, not in repo');
  pass('Doc records the crux: no repo deploy config; Railway build/start/root/commit are dashboard-only');

  // 8. Doc records the decisive deduction: /health 200 + webhook 404 same app => not current HEAD.
  assert(/production_not_current_head_deduction=health_200_plus_webhook_404_same_app_impossible_under_correct_head_build/.test(doc),
    'doc records the health-200 + webhook-404 same-app deduction token');
  assert(/not\*\* serving current-HEAD/i.test(doc), 'doc states production is not serving current-HEAD index.ts');
  assert(/repo_bug_found=false/.test(doc), 'doc records repo_bug_found=false');
  assert(/repo_build_start_chain_status=internally_consistent_no_repo_bug/.test(doc),
    'doc records build/start chain internally consistent, no repo bug');
  pass('Doc records the decisive deduction (health 200 + webhook 404 in same app => production != current HEAD) and repo_bug_found=false');

  // 9. Doc records the route-added timeline anchor (2026-05-30 commits).
  assert(doc.includes('cd3a9d5') && doc.includes('7d380e9') && doc.includes('2026-05-30'),
    'doc anchors the route to its 2026-05-30 commits (cd3a9d5 / 7d380e9)');
  pass('Doc anchors the route history to 2026-05-30 (mount cd3a9d5 + route file 7d380e9)');

  // 10. Decision routing: Path A not triggered, Path B recommended, Path C only after B; no approvals.
  assert(/Path A[\s\S]{0,80}NOT triggered/i.test(doc), 'doc: Path A (repo fix) NOT triggered');
  assert(/decision_path=B_readonly_railway_inspection/.test(doc), 'doc: decision path B (read-only Railway inspection)');
  assert(/Only after\*\* Path B/i.test(doc), 'doc: Path C only after Path B confirms stale runtime');
  assert(/deploy_approval_status=not_requested/.test(doc), 'doc: deploy approval not requested');
  assert(/retry_call_approval_status=not_requested/.test(doc), 'doc: retry-call approval not requested');
  pass('Doc decision routing correct: Path A not triggered, Path B recommended, Path C gated on B; no deploy/call approval created');

  // 11. Read-only Railway inspection checklist present (commit SHA / build log / start / root / domain).
  const checklist = [
    /Deployed commit SHA/i,
    /Build command/i,
    /tsc[\s\S]*ran[\s\S]*emitted[\s\S]*dist\/index\.js/i,
    /Start command/i,
    /Service root/i,
    /Healthcheck/i,
    /Domain .* service mapping/i,
  ];
  for (const re of checklist) assert(re.test(doc), `doc missing Railway inspection checklist item: ${re}`);
  assert(/No live webhook POST/i.test(doc), 'doc: read-only checklist forbids live webhook POST/curl');
  pass('Doc includes the read-only Railway inspection checklist (commit SHA / build log / start / root / domain) and forbids live POST/curl');

  // 12. No-mutation self-claim + status fields consistency.
  assert(/backend_source_or_config_touched=false/.test(doc), 'doc records no backend source/config touched');
  assert(/no_backend_deploy=true/.test(doc), 'doc records no backend deploy');
  assert(/production_runtime_status=unknown_requires_readonly_railway_inspection/.test(doc),
    'doc records production_runtime_status=unknown_requires_readonly_railway_inspection');
  assert(/eocr_404_status=diagnosis_packet_captured/.test(doc), 'doc records eocr_404_status=diagnosis_packet_captured');
  pass('Doc status block consistent (no source/config touched, no deploy, production runtime unknown pending read-only inspection)');

  // 13. Safety invariants stated.
  const gates = [
    /No call placed/i,
    /No SMS/i,
    /No Twilio API\/CLI/i,
    /No Retell API/i,
    /No live webhook POST\/curl/i,
    /No deploy \/ redeploy \/ restart/i,
    /No secret read or printed/i,
    /No backend source or config file changed/i,
  ];
  for (const re of gates) assert(re.test(doc), `doc missing safety invariant: ${re}`);
  pass('Doc states the full Build 267 safety-invariant block (no call/SMS/Twilio/Retell/live-POST/deploy/secret; no backend source/config change)');

  // 14. No secret / raw PII / SIP URI leaked.
  const leaks = [
    /VAPI_WEBHOOK_SECRET\s*=\s*\S+/i,
    /Bearer\s+[A-Za-z0-9._-]{12,}/,
    /sk-[A-Za-z0-9]{12,}/,
    /sip:[^\s]+@[^\s]+/i,
    /\+1\d{10}\b/,
  ];
  for (const re of leaks) assert(!re.test(doc), `doc must not leak secret/PII pattern: ${re}`);
  pass('Doc leaks no secret, bearer token, raw phone number, or SIP URI');

  // 15. Dry-run wrapper exists and wires this verifier + B266 verifier + smoke.
  assert(exists(VERIFIER), 'B267 verifier file exists');
  assert(exists(B266_VERIFIER), 'B266 predecessor verifier exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-production-eocr-route-diagnosis-build-267-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-pstn-eocr-404-build-266-readonly.js'),
    'dry-run wrapper runs the Build 266 EOCR-404 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B267 verifier present and dry-run wrapper wires this verifier + B266 verifier + Vapi smoke regression');

  // 16. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 267 production EOCR-404 route & deployment diagnosis packet verified (${passCount} checks).`);
  console.log('build_mode=production_eocr_route_deployment_diagnosis_repo_only  runtime_action_performed_by_build_267=false  fix_or_config_change_performed_by_build_267=false  backend_source_or_config_touched=false  build_266_prerequisite_commit=9c637ed  build_266_prerequisite_status=validated  eocr_404_status=diagnosis_packet_captured  pstn_to_clean_vapi_status=passed  vapi_eocr_delivery_status=passed_to_expected_path  backend_eocr_response_status=404  repo_route_registration_status=expected_route_present_at_head  expected_route=POST_/webhooks/vapi/call-completed  route_mount_conditional=false_unconditional  health_and_webhook_same_app=true  repo_deploy_config_present=false_dashboard_only  repo_build_start_chain_status=internally_consistent_no_repo_bug  repo_bug_found=false  production_not_current_head_deduction=health_200_plus_webhook_404_same_app_impossible_under_correct_head_build  production_runtime_status=unknown_requires_readonly_railway_inspection  decision_path=B_readonly_railway_inspection  deploy_approval_status=not_requested  retry_call_approval_status=not_requested  next_step=separate_readonly_railway_deployment_inspection_confirm_deployed_commit_build_log_start_root  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  live_webhook_called=false  curl_used=false  deploy=false  secret_file_read=false  repo_unchanged=true');
})();
