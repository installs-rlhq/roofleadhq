# RoofLeadHQ — Next Chat Context Package Safe Build Snapshot

Use this package to start the next ChatGPT/Codex session safely and quickly.

## Current Verified Source of Truth

Latest verified source-of-truth commit:

- `d953701 test(pilot): record safe build snapshot milestone`
- `7fc4f1a docs(pilot): add safe build context snapshot`
- `b978eab test(pilot): record source of truth baseline guard milestone`

Final source-of-truth confirmation from Terminal 1:

- `d953701 (HEAD -> main, origin/main)`
- `PASS: HEAD and origin/main match at d953701`

## Repository Rule

Work only in Terminal 1:

- `/root/roofleadhq`

Do not use:

- `/root/.openclaw/workspace`

Before any build work, verify with:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

Terminal 1 is the source of truth. OpenClaw summaries alone are not trusted.

## Current Commit Chain

Latest safe build chain:

- `b978eab test(pilot): record source of truth baseline guard milestone`
- `d74f311 test(pilot): guard recorded source of truth baseline`
- `919eee6 test(pilot): record operating workflow guard suite milestone`
- `162bb6b test(pilot): add operating workflow guard suite`
- `07f331f test(pilot): record workflow cross reference guard milestone`
- `9059c67 test(pilot): guard operating workflow cross references`
- `e08bb86 test(pilot): record workflow guard discoverability milestone`
- `6375675 docs(pilot): document operating workflow guard`
- `e6ba4b8 test(pilot): record operating workflow guard milestone`
- `700b5ab test(pilot): guard next safe build operating workflow`

## Current Guard Stack

The current workflow guard stack includes:

- `backend/scripts/verify-next-safe-build-operating-workflow-readonly.js`
- `backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js`
- `backend/scripts/verify-operating-workflow-guard-suite-readonly.js`
- `backend/scripts/verify-next-chat-context-recorded-source-of-truth-readonly.js`
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`
- `backend/scripts/verify-latest-milestone-self-check-readonly.js`
- `backend/scripts/verify-launch-safety-meta-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

## Required Safe Build Workflow

For safe doc/test/read-only verifier work:

1. Verify Terminal 1 source of truth.
2. Make the smallest complete safe build chunk that advances launch readiness.
3. Review actual diff with `git diff --stat` and `git diff`.
4. Run targeted greps/assertions.
5. Run syntax checks for changed scripts with `node --check`.
6. Run relevant read-only verifiers.
7. Run aggregate readiness with `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`.
8. Run backend build with `npm --prefix backend run build`.
9. Stage only intended files.
10. Review staged diff with `git diff --cached --stat` and `git diff --cached --name-status`.
11. Commit and push safe verified doc/test/read-only verifier changes without repeated confirmation.
12. Fetch and confirm `HEAD` and `origin/main` match.

## Approval Gates

Safe to commit/push without repeated confirmation after verification:

- docs
- tests
- read-only verifiers
- context packages
- verifier index updates
- business guide updates

Require explicit approval before:

- live SMS/Twilio sends
- production Supabase writes
- Vapi production webhook ingestion
- Calendar booking activation
- Resend/Lindy production activation
- public routes
- cron/scheduler/dispatcher activation
- secrets exposure
- destructive operations
- risky production behavior changes

## Business Context

RoofLeadHQ is a founder-led lead response, follow-up, booking, and reporting system for roofing contractors.

Current positioning:

- Founder-led during launch.
- System-led after setup.
- Launch offer: Founder-Led Launch Program.
- Supabase is the source of truth.
- Vapi is the future phone lead source.
- Retell is deprecated/disabled.
- Lindy is internal/back-office only.

Use:

- “book inspections”
- “book appointments”

Avoid:

- “7-day pilot”
- “5 qualified appointments in 7 days”
- guaranteed jobs
- guaranteed revenue
- “book jobs”

## Safety Posture

Safety remains demo-ready with live automation disabled.

No live Vapi webhook route, no Vapi calls from code, no Supabase writes, no SMS/Twilio sends, no Calendar booking activation, no Resend/Lindy production activation, no cron/scheduler/dispatcher activation unless explicitly approved.

## Next Best Safe Build

Default next build:

- Choose the next biggest safe build that improves first-paid launch readiness.
- Prefer one complete guard/doc/test/read-only verifier layer at a time.
- Keep Terminal 1 verification strict.
- Do not ask before committing safe verified doc/test/read-only verifier work.
- Stop if diff is too small, incomplete, unsafe, or does not match stated intent.
