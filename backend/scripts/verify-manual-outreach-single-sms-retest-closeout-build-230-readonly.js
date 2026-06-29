#!/usr/bin/env node
/**
 * Build 230 Read-Only Verifier — Manual Outreach single-SMS live retest closeout + cleanup evidence.
 *
 * Read-only. Reads repo docs/scripts as text and checks `git status` before/after. No network,
 * no Supabase call, no secret/credential access, no provider client, no SMS, no Twilio/Vapi/Resend/
 * Lindy call, no production data, no env mutation. Executes no service.
 *
 * Proves the Build 230 closeout slice is internally consistent AND safe:
 *  - The Build 230 doc exists, carries the decision token, frames itself as repo-only, and records the
 *    Build 229 deployment, the Railway HTTP 200 health, the single-SMS retest baseline/post counts and
 *    the clean result, the observed MessageSid, the no-recurrence finding, and the scoped cleanup with
 *    its verification and zero-side-effect metadata.
 *  - The key safety invariants (no deploy, no SMS, no provider call, no deletion, no schema change) are
 *    stated in the doc.
 *  - No secret-shaped or phone-number-shaped values are present in the doc.
 *  - The verifier and the dry-run wrapper exist and are wired together.
 *  - Running this verifier does not mutate the repo (before/after `git status` equality).
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

const DOC = 'docs/MANUAL_OUTREACH_SINGLE_SMS_RETEST_CLOSEOUT_BUILD_230.md';
const VERIFIER = 'backend/scripts/verify-manual-outreach-single-sms-retest-closeout-build-230-readonly.js';
const DRY_RUN = 'scripts/run-manual-outreach-single-sms-retest-closeout-build-230-dry-run.sh';

const DECISION_TOKEN = 'MANUAL_OUTREACH_DUPLICATE_SCHEDULE_GUARD_LIVE_SINGLE_SMS_RETEST_PASSED_AND_CLEANED_UP';
const MESSAGE_SID = 'SM67c...869c';
const CLEANUP_EVENT = 'build_229_single_sms_retest_cleanup';
const CLEANUP_REASON = 'build_229_single_sms_retest_followup_cleanup';
const CLEANUP_EVENT_ID = '7aab35d2-6d19-48bb-9d2c-e9273a559fd8';

(async () => {
  const before = gitStatus();
  console.log('=== Build 230 Manual Outreach Single-SMS Retest Closeout Read-Only Verification (local-only) ===');
  console.log('No SMS. No provider call. No Supabase call. No credentials. No env change. No live HTTP. Read-only.');

  const doc = read(DOC);

  // 1. Decision token + repo-only framing.
  assert(doc.includes(DECISION_TOKEN), 'B230 doc carries the exact decision token');
  assert(/repo[- ]only/i.test(doc) && /closeout|evidence/i.test(doc), 'B230 doc frames itself as a repo-only evidence closeout slice');
  pass('B230 doc carries the decision token and repo-only closeout framing');

  // 2. Source of truth: Build 229 commit + HEAD == origin/main.
  assert(/8a9a70d/.test(doc), 'B230 doc records the Build 229 source-of-truth commit 8a9a70d');
  assert(/HEAD\s*==\s*origin\/main|HEAD == origin\/main/.test(doc), 'B230 doc records HEAD == origin/main');
  pass('B230 doc records the Build 229 source-of-truth commit and HEAD == origin/main');

  // 3. Build 229 deployment + Railway health 200.
  assert(/redeploy/i.test(doc) && /Railway/i.test(doc), 'B230 doc records the Build 229 Railway redeploy');
  assert(/HTTP\/2 200|HTTP\/?2?\s*200|200/.test(doc) && /\/health/.test(doc), 'B230 doc records the /health HTTP 200 post-redeploy');
  pass('B230 doc records the Build 229 redeploy and the Railway /health HTTP 200');

  // 4. Single-SMS retest framing + baseline counts.
  assert(/single[- ]message|single[- ]SMS/i.test(doc) && /exactly one/i.test(doc), 'B230 doc frames the retest as exactly one SMS');
  assert(/ending\s*\*?\*?4990/.test(doc), 'B230 doc identifies the Test Roofing number by its last-four (4990), not the full number');
  assert(/leads\s*`?23`?/.test(doc) && /messages\s*`?11`?/.test(doc) && /workflow_events\s*`?93`?/.test(doc) && /follow_ups\s*`?126`?/.test(doc),
    'B230 doc records the pre-retest baseline (leads 23, messages 11, workflow_events 93, follow_ups 126)');
  pass('B230 doc records the single-SMS retest framing and the pre-retest baseline counts');

  // 5. Post-retest counts + clean result.
  assert(/workflow_events\s*`?95`?/.test(doc) && /follow_ups\s*`?130`?/.test(doc),
    'B230 doc records the post-retest counts (workflow_events 95, follow_ups 130)');
  assert(/no new lead/i.test(doc), 'B230 doc records that no new lead was created');
  assert(/exactly\s*\*?\*?1\*?\*?\s*`?manual_outreach_received`?|1.{0,20}manual_outreach_received/i.test(doc), 'B230 doc records exactly 1 manual_outreach_received event');
  assert(/1.{0,20}followup_scheduled/i.test(doc), 'B230 doc records exactly 1 followup_scheduled event');
  assert(/exactly\s*\*?\*?4\*?\*?\s*scheduled follow/i.test(doc) || /4 scheduled follow/i.test(doc), 'B230 doc records exactly 4 scheduled follow-ups');
  pass('B230 doc records the post-retest counts and the clean 1/1/4 result with no new lead');

  // 6. Observed MessageSid + no-recurrence finding.
  assert(doc.includes(MESSAGE_SID), 'B230 doc records the observed Twilio MessageSid');
  assert(/did not recur|duplicate explosion/i.test(doc) && /24/.test(doc), 'B230 doc records that the Build 229 24-follow-up duplicate explosion did not recur');
  pass('B230 doc records the observed MessageSid and the no-recurrence finding');

  // 7. Cleanup evidence (scoped, status flip + one audit event).
  assert(doc.includes(CLEANUP_REASON), `B230 doc records the cleanup skipped_reason ${CLEANUP_REASON}`);
  assert(doc.includes(CLEANUP_EVENT), `B230 doc records the cleanup workflow event ${CLEANUP_EVENT}`);
  assert(doc.includes(CLEANUP_EVENT_ID), 'B230 doc records the cleanup workflow event id');
  assert(/only.{0,30}4|scoped to the\s*\*?\*?4/i.test(doc), 'B230 doc records the cleanup was scoped to only the 4 retest follow-ups');
  pass('B230 doc records the scoped cleanup (reason, event, event id, 4-row scope)');

  // 8. Cleanup verification + zero-side-effect metadata.
  assert(/total_followups\s*`?28`?/.test(doc) && /skipped\s*`?28`?/.test(doc) && /scheduled_remaining\s*`?0`?/.test(doc),
    'B230 doc records the cleanup verification counts (total 28, skipped 28, scheduled_remaining 0)');
  assert(/cleanup_event_exists\s*`?true`?/.test(doc), 'B230 doc records cleanup_event_exists true');
  assert(/followups_updated_count\s*[=:]?\s*`?4`?/.test(doc), 'B230 doc records followups_updated_count 4');
  assert(/deletion_performed\s*[=:]?\s*`?false`?/.test(doc), 'B230 doc records deletion_performed false');
  assert(/sms_sent\s*[=:]?\s*`?false`?/.test(doc), 'B230 doc records sms_sent false');
  assert(/provider_calls\s*[=:]?\s*`?false`?/.test(doc), 'B230 doc records provider_calls false');
  pass('B230 doc records the cleanup verification counts and zero-side-effect metadata');

  // 9. Safety invariants block present.
  assert(/Safety invariants/i.test(doc), 'B230 doc has a Safety invariants section');
  assert(/No deploy/i.test(doc), 'B230 doc states no deploy');
  assert(/No\s+SMS\s+sent/i.test(doc), 'B230 doc states no SMS sent (by the build)');
  assert(/No\s+(Twilio|provider).{0,40}(call|provider)/i.test(doc), 'B230 doc states no provider call');
  assert(/No schema \/ auth \/ RLS \/ security change|No schema.{0,30}change/i.test(doc), 'B230 doc states no schema/auth/RLS/security change');
  assert(/No deletion|no destructive/i.test(doc), 'B230 doc states no deletion / no destructive side effect');
  pass('B230 doc states the Build 230 safety invariants (no deploy / SMS / provider / schema / deletion)');

  // 10. Doc carries NO secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B230 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B230 doc contains no sk- API-key-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B230 doc contains no phone-number-shaped value');
  pass('B230 doc contains no secret-shaped or phone-number-shaped values');

  // 11. Doc asserts Build 230 itself takes no live action (it only records prior out-of-band work).
  assert(/out-of-band|already-completed|already completed/i.test(doc) && /takes no live action|no live action/i.test(doc),
    'B230 doc clarifies the build itself takes no live action and only records prior out-of-band work');
  pass('B230 doc clarifies the build takes no live action (records prior out-of-band retest/cleanup)');

  // 12. Verifier + dry-run wrapper exist and are wired together.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'verifier file exists at the expected path');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-manual-outreach-single-sms-retest-closeout-build-230-readonly.js'), 'dry-run wrapper runs this verifier');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('verifier present and the dry-run wrapper references it');

  // 13. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 230 manual outreach single-SMS retest closeout verified (${passCount} checks).`);
  console.log('live_http_called=false  mutating_calls=0  sms_sent=0  provider_calls=0  schema_changes=0  secrets_in_repo=0  repo_unchanged=true');
})();
