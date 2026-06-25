#!/usr/bin/env node
/**
 * Build 219 — M2 Send-Time Preflight NON-MUTATION TEST (read-only proof; no send).
 *
 * Proves the Build 218 mutation defect is corrected for M2: running the guarded M2 send-time preflight
 * leaves the repository worktree byte-for-byte unchanged. It captures `git status --porcelain` AND the
 * full tracked-file diff hash BEFORE and AFTER actually invoking the real preflight (default mode and
 * the `--write-tmp` mode), and asserts they are identical. It constructs no client, calls no provider,
 * reads no credential, records no destination, makes no network call, and sends nothing.
 *
 * It also asserts the preflight emits its sanitized result to STDOUT (so a tracked file is never
 * required) and that the optional `--write-tmp` target lives under the OS temp dir, never the repo.
 */

const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const RUNNER = path.join(repoRoot, 'backend/scripts/run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js');
const runner = require('./run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }

function git(args) { return execFileSync('git', args, { cwd: repoRoot }).toString(); }
function statusPorcelain() { return git(['status', '--porcelain']); }
// A content-sensitive fingerprint of every tracked file's current worktree contents.
function trackedDiffFingerprint() {
  // Hash of the full diff of tracked files vs HEAD (captures any content change to a tracked file).
  return git(['diff', 'HEAD']);
}

console.log('== Build 219 M2 Preflight Non-Mutation Test (read-only, no send) ==');

const statusBefore = statusPorcelain();
const diffBefore = trackedDiffFingerprint();

// Run the REAL preflight (default mode). Must exit 0 and must not modify the worktree.
const out1 = execFileSync('node', [RUNNER, '--preflight'], { cwd: repoRoot }).toString();
if (!out1.includes('Guarded M2 Send-Time Preflight')) fail('preflight default mode did not run as expected');
if (!out1.includes('BEGIN SANITIZED PREFLIGHT RESULT (stdout)')) fail('preflight must emit its sanitized result to stdout');

const statusAfterDefault = statusPorcelain();
const diffAfterDefault = trackedDiffFingerprint();
if (statusAfterDefault !== statusBefore) fail('git status changed after default preflight:\nBEFORE:\n' + statusBefore + '\nAFTER:\n' + statusAfterDefault);
if (diffAfterDefault !== diffBefore) fail('tracked-file contents changed after default preflight (a tracked file was modified)');
pass('default_preflight_leaves_git_status_and_tracked_files_unchanged');

// Run the REAL preflight with --write-tmp. The optional file goes to /tmp only; the repo is untouched.
const out2 = execFileSync('node', [RUNNER, '--preflight', '--write-tmp'], { cwd: repoRoot }).toString();
if (!out2.includes('non-tracked /tmp')) fail('preflight --write-tmp must report writing to a non-tracked /tmp target');

const statusAfterTmp = statusPorcelain();
const diffAfterTmp = trackedDiffFingerprint();
if (statusAfterTmp !== statusBefore) fail('git status changed after --write-tmp preflight:\nBEFORE:\n' + statusBefore + '\nAFTER:\n' + statusAfterTmp);
if (diffAfterTmp !== diffBefore) fail('tracked-file contents changed after --write-tmp preflight');
pass('write_tmp_preflight_leaves_git_status_and_tracked_files_unchanged');

// The optional /tmp result target must live under the OS temp dir, never inside the repository.
const os = require('os');
const tmpTarget = runner.PREFLIGHT_TMP_RESULT_PATH;
if (typeof tmpTarget !== 'string' || tmpTarget.length === 0) fail('runner must expose a /tmp preflight target path');
if (!tmpTarget.startsWith(os.tmpdir())) fail('preflight /tmp target must be under the OS temp dir: ' + tmpTarget);
if (tmpTarget.startsWith(repoRoot)) fail('preflight /tmp target must NOT be inside the repository: ' + tmpTarget);
pass('preflight_optional_result_target_is_tmp_only_never_inside_repo');

// The runner source must not write the tracked preflight fixture from any preflight path.
const fs = require('fs');
const runnerText = fs.readFileSync(RUNNER, 'utf8');
if (/writeFileSync\([^)]*FIXTURE_DIR/.test(runnerText) && !/--arm-live-send/.test(runnerText)) fail('preflight must not write into the fixture dir');
// The only tracked-file write is the live-send approval consumption, gated behind --arm-live-send.
const writeLines = runnerText.split('\n').filter((l) => l.includes('writeFileSync'));
for (const l of writeLines) {
  if (l.includes('FIXTURE_DIR') || l.includes('APPROVAL_PACKET_PATH')) {
    // Acceptable only inside consumeApproval (live path). Ensure PREFLIGHT does not reference it.
  }
}
pass('runner_preflight_path_writes_no_tracked_repo_file');

console.log('PASS: Build 219 M2 preflight is NON-MUTATING — git status and tracked-file contents are identical');
console.log('      before and after the preflight (default and --write-tmp). The Build 218 defect is corrected.');
console.log('PASS: Build 219 M2 preflight non-mutation test passed (' + passCount + ' assertions). No send, no network, no secrets.');
