# Next Chat Context Package — Agent Grok Build Workflow

## Current Source of Truth

Latest verified source-of-truth commit:

- `5b5e769 test(agent): harden agent branch finalize script`

Terminal 1 verification confirmed:

- `HEAD -> main`
- `origin/main`
- `HEAD and origin/main match at 5b5e769`

Canonical repo:

- `/root/roofleadhq`

Agent worktree root:

- `/root/roofleadhq-worktrees`

## Safety Posture

RoofLeadHQ remains dry-run/internal-only/founder-operator-only.

No live production activation is allowed without explicit approval.

Do not activate live SMS/Twilio, Vapi calls, Calendar booking, Resend production sends, Lindy external sends, cron/scheduler/dispatcher, public routes, production Supabase writes, external notifications, or production credentials.

Use only:

- Founder-Led Launch Program
- book inspections
- book appointments

Avoid:

- 7-day pilot
- 5 qualified appointments in 7 days
- book jobs
- booked jobs
- guaranteed jobs
- guaranteed revenue
- guarantee jobs
- guarantee revenue

## Grok Build Verdict

The decisive Grok Build trial was positive, but not frictionless.

Grok successfully produced a larger product-moving packet:

- Commit: `92a0b81 test(pilot): add first roofer lead to inspection ops pack`
- Files changed: 7
- Insertions/deletions: 818 insertions, 53 deletions
- Product result: First Roofer Lead-to-Inspection Ops Pack
- Final verification passed after push:
  - first-paid pilot readiness aggregate
  - backend build
  - source-of-truth verification

This proved Grok can be useful for larger safe product-moving packets when given a strong verifier-first/product-depth prompt.

## Decisive Trial Artifact

The successful Grok product-moving packet added:

- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh`
- `backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js`

It wired the packet into:

- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`

The ops pack includes lead intake workflow, completeness checklist, missing-information recovery workflow, founder/operator decision log, homeowner communication prep template, contractor communication prep template, inspection/appointment tracker, readiness decision, outcome capture, end-of-day reporting template, and PASS / HOLD / BLOCKED criteria.

## Product Quality Gate Finding

The earlier weak Grok run produced a shallow verifier-satisfying artifact. The later decisive trial improved after the repo gained:

- `docs/AGENT_PRODUCT_QUALITY_GATE.md`
- `scripts/check-agent-product-quality-gate.sh`
- `backend/scripts/verify-agent-product-quality-gate-readonly.js`

Future Grok tasks must reference and satisfy the Agent Product Quality Gate.

A Grok task should fail if it produces heading-only docs, keyword-only docs, archive-only packets, lock-only packets, preservation-only packets, or generic content that does not help the founder/operator run the business.

A Grok task should pass only when it produces operational workflow, concrete fields, decision logs, templates, PASS/HOLD/BLOCKED criteria, verifier assertions for product depth, aggregate/context/index wiring, dry-run/internal-only safety language, and forbidden language checks.

## Finalize Script Finding and Fix

During the successful Grok trial, `scripts/agent-finalize-branch.sh` appeared to run gates and diff proof but did not create a commit.

The fix was committed at:

- `5b5e769 test(agent): harden agent branch finalize script`

The hardened finalize script now includes explicit finalize markers, repo/PWD/branch/HEAD proof, refusal on `main`, refusal on non-`agent/*` branches, refusal outside `/root/roofleadhq-worktrees/*`, status before staging, staged diff summary, fail-closed staged-diff check, commit creation, HEAD-changed verification, clean-worktree post-commit check, and optional push only with `AGENT_FINALIZE_PUSH=1`.

Default behavior:

- commit agent branch locally
- do not push unless `AGENT_FINALIZE_PUSH=1`

## Standard Future Grok Workflow

1. From Terminal 1 main, verify source of truth.
2. Create an agent worktree with `scripts/agent-create-worktree.sh <task-name>`.
3. Start Grok inside `/root/roofleadhq-worktrees/<task-name>`.
4. Prompt Grok with the exact worktree path, product-moving goal, required files, required wiring, required sections, required operational fields/templates, verifier assertions, safety restrictions, forbidden language, product-quality-gate requirement, and instruction to stop after gates and diff proof.
5. After Grok exits, independently inspect `git status --short`, `git diff --stat`, and `git diff --summary`.
6. Remove irrelevant mode-only changes when needed.
7. Run worktree gates and `scripts/agent-diff-proof.sh`.
8. Inspect product content and context diffs before finalizing.
9. Finalize the branch with `scripts/agent-finalize-branch.sh "<commit message>"`.
10. Merge from Terminal 1 main only with `git merge --ff-only agent/<task-name>`.
11. Run local main verification.
12. Push main.
13. Fetch and verify source of truth.
14. Run final post-push aggregate/build/source verification.

## Known Pitfalls

### Mode-only file changes

Grok may accidentally chmod existing files. Inspect with:

`git diff --summary`

Revert unrelated mode changes before commit.

### Context wording rewrites

Grok may replace phrases globally and create awkward wording. Inspect context diffs before finalizing.

### Aggregate source-of-truth failures before push

After merging locally, `main` is ahead of `origin/main`.

Some verifiers fail until push because they require `HEAD == origin/main`.

If product verifiers pass and the only error is source-of-truth mismatch, push main, fetch, and rerun final verification.

### Finalize script proof

Do not assume finalize committed unless `HEAD after` changes and status is clean.

If finalizing fails, look for repo path, branch name, HEAD before, staged diff summary, HEAD after, and clean status after commit.

## Recommended Next Build Direction

Next best larger product-moving build should continue toward first real roofer execution, not meta/harness work unless friction appears again.

Good candidates:

- first-roofer live-lead manual intake rehearsal packet
- first-roofer inspection coordination worksheet
- first-roofer founder/operator day-one command center
- first-roofer homeowner/contractor manual communication packet
- first-roofer outcome and reporting packet

This session delivered the first-roofer founder/operator day-one command center packet (docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It follows the product quality gate and the dry-run/internal-only/founder-operator-only posture. See NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md and ROOFER_DRY_RUN_ONBOARDING.md for the full milestone record.

Default approach:

- biggest safe product-moving packet
- dry-run/internal-only
- verifier-first
- product-quality-gate enforced
- Terminal 1 final validation/merge/push only

## New Chat Startup Instruction

In the next chat, start from this package plus the canonical source-of-truth package.

Use Terminal 1 only for final verification, merge, commit, push, and source-of-truth confirmation.

Continue with the biggest safe product-moving packet unless the harness or Grok workflow needs another repair.
