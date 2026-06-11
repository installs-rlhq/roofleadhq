# Next Chat Context Package — Agent Grok Build Workflow

## Current Source of Truth

Latest verified source-of-truth commit:

- `8e174db test(pilot): add first roofer day-one command center`

Terminal 1 verification confirmed (before this worktree):

- `HEAD and origin/main match at 8e174db`

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

Important lesson to preserve: two distinct failure classes must be distinguished. Product/build failures must be fixed before push (verifier assertion failures, forbidden language, unsafe strings, broken build, product-quality-gate failures, missing wrapper/verifier/context wiring, or shallow docs). Expected pre-push source-of-truth failures can occur after local main is ahead of origin but before push. Only proceed when individual diagnostics prove the only substantive error is HEAD does not match origin/main and all product-specific gates/build passed. Future workflow should run product-specific verifier/wrapper, product-quality gate, production/safe readiness, backend build, and clean status before push; then push/fetch and run source-of-truth-sensitive aggregate/meta checks after HEAD == origin/main. Never broadly ignore aggregate failures.

### Finalize script proof

Do not assume finalize committed unless `HEAD after` changes and status is clean.

If finalizing fails, look for repo path, branch name, HEAD before, staged diff summary, HEAD after, and clean status after commit.

Important finalize-script lesson to preserve: scripts/agent-finalize-branch.sh remains unresolved friction. In the 8e174db build it again ran gates/diff proof but did not create the commit. Future builds must distrust finalize unless output explicitly shows HEAD before, staged diff summary, Creating commit, HEAD after, clean git status --short, and the new commit in git log. If proof is missing, immediately run git log --oneline -3, git status --short, and git rev-parse HEAD. Manually commit only after gates and diff proof already passed.

## Recommended Next Build Direction

Next best larger product-moving build should continue toward first real roofer execution, not meta/harness work unless friction appears again.

Good candidates:

- first-roofer live-lead manual intake rehearsal packet
- first-roofer inspection coordination worksheet (delivered in subsequent build)
- first-roofer founder/operator day-one command center (delivered 8e174db)
- first-roofer homeowner/contractor manual communication packet (delivered in this build)
- first-roofer inspection coordination command packet (delivered after manual communication packet)
- first-roofer outcome and reporting packet

This session delivered the first-roofer manual communication command packet (docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + workflow context for the two lessons + quality gate enforced). It builds on the day-one command center and continues the first-roofer execution path with the biggest safe product-moving packet. It follows the product quality gate and the dry-run/internal-only/founder-operator-only posture. See NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md and ROOFER_DRY_RUN_ONBOARDING.md for the full milestone record. The agent workflow context was updated minimally to preserve the pre-push failure-class lesson and the finalize-script lesson from the 8e174db build.

Subsequent build in the same first-roofer execution path delivered the First Roofer Inspection Coordination Command Packet (docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It continues after the manual communication packet with inspection readiness coordination, availability/route worksheets, no-booking safety rules, and manual-only decision tracking. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Appointment Readiness Command Packet (docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It continues after the inspection coordination packet with post-inspection manual appointment readiness review (homeowner/contractor confirmation review, window readiness comparison, HOLD/BLOCKED rules, outcome prep), using required business language and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Appointment Outcome Command Packet (docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It continues after the appointment readiness packet with manual post-appointment outcome capture/classification (completed/not completed/reschedule/no-show/unable-to-access paths, homeowner/contractor follow-up status, estimate/next-step prep, HOLD/BLOCKED rules, tracker/decision log/report/handoff), using required business language and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Manual Follow-Up Command Packet (docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It continues after the appointment outcome packet with manual follow-up preparation/approval/tracking/reporting after outcomes (follow-up ownership, homeowner/contractor prep worksheets, reschedule/estimate/next-step/no-show/completed/cancelled/hold/blocked handling, HOLD/BLOCKED for missing owner/incomplete details/conflicting steps/consent/safety/prod risk, APPROVED FOR MANUAL FOLLOW-UP, tracker/decision log/report/handoff), using required business language and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Estimate / Next-Step Readiness Command Packet (docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It continues after the manual follow-up packet with manual estimate / next-step readiness decision after appointment outcomes and manual follow-up preparation (estimate readiness, contractor next-step coordination, homeowner additional-information, reschedule, insurance/photos/damage-detail, completed/no-show/cancelled/hold/blocked next-step handling, HOLD/BLOCKED for missing estimate prep owner/missing contractor next-step owner/incomplete homeowner info/incomplete photos/insurance/damage/unresolved prior state/conflicting steps/consent/safety/prod risk, READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP, tracker/decision log/report/handoff, no-estimate/quote/send/calendar/booking safety), using required business language and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Estimate Prep Command Packet (docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + quality gate enforced). It continues after the estimate / next-step readiness packet with manual estimate prep after readiness (inspection notes, contractor notes, homeowner constraints, roof/damage/service-scope, photos/insurance/documentation, assumptions/unknowns, contractor/homeowner questions, review states including READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW, HOLD/BLOCKED for listed missing/incomplete items, tracker/decision log/report/handoff, no-estimate-create/no-quote-send/no-calendar/no-booking safety), using required business language and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Contractor Estimate Review Command Packet (docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + grok workflow context + quality gate enforced). It continues after the estimate prep packet with manual packaging and review of estimate-prep inputs for contractor estimate review (contractor review package, scope summary, photos/documentation review, insurance context review, contractor/founder/homeowner clarification worksheets, review states including READY FOR MANUAL CONTRACTOR REVIEW, HOLD/BLOCKED for missing contractor review owner/missing estimate prep state/unresolved estimate/next-step/missing inspection notes/missing contractor notes/incomplete roof/damage/service-scope/incomplete homeowner constraints/incomplete photos/doc review/incomplete insurance/unresolved assumptions/unresolved unknowns/unresolved contractor questions/unresolved homeowner questions/contractor match not confirmed/contractor service-area fit not confirmed/consent/safety/prod risk, tracker/decision log/report/handoff, no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety with Contractor notification sent: no), using required business language (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, estimate readiness, next-step readiness, manual estimate prep, contractor estimate review, draft-only, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW) and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Homeowner Clarification Command Packet (docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + grok workflow context + quality gate enforced). It continues after the contractor estimate review packet with manual packaging and review of unresolved homeowner-facing gaps into a structured manual homeowner clarification workspace (homeowner clarification package worksheet, missing homeowner constraints worksheet, photos/documentation request-prep worksheet, insurance context clarification worksheet, roof/damage/service-scope clarification worksheet, access and scheduling clarification worksheet, contractor question translation worksheet, founder/operator clarification questions worksheet, homeowner clarification readiness worksheet, manual clarification draft-prep worksheet, review states including READY FOR MANUAL HOMEOWNER CLARIFICATION, HOLD/BLOCKED for missing homeowner clarification owner/missing contact permission status/do-not-contact or unclear permission/missing homeowner preferred channel/missing contractor review state/unresolved contractor estimate review state/missing estimate prep state/unresolved estimate / next-step readiness state/incomplete homeowner constraints/incomplete photos/documentation request-prep/incomplete insurance context clarification/incomplete roof/damage/service-scope clarification/unresolved access issue/unresolved scheduling constraint/unresolved estimate assumptions/unresolved estimate unknowns/unresolved contractor questions/unresolved founder/operator questions/unresolved homeowner questions/contractor match not confirmed/contractor service-area fit not confirmed/consent/safety/prod risk, tracker/decision log/report/handoff, no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety with Contractor notification sent: no, Homeowner notification sent: no), using required business language (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, estimate readiness, next-step readiness, manual estimate prep, contractor estimate review, homeowner clarification, draft-only, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW, READY FOR MANUAL HOMEOWNER CLARIFICATION) and preserving dry-run/internal-only/founder-operator-only posture. Minimal workflow context update only for recent history mention.

Subsequent build in the same first-roofer execution path delivered the First Roofer Homeowner Clarification Response Review Command Packet (docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + grok workflow context + quality gate enforced). It continues after the homeowner clarification command packet with manual review of a homeowner clarification response captured manually outside the system (response capture summary, completeness review, constraints/photos/insurance/roof/scope/access/scheduling/question/assumption/unknown resolution worksheets, downstream routing to RETURN TO CONTRACTOR ESTIMATE REVIEW / RETURN TO MANUAL ESTIMATE PREP / RETURN TO ESTIMATE NEXT-STEP READINESS / RETURN TO MANUAL FOLLOW-UP / RETURN TO APPOINTMENT OR ACCESS COORDINATION / READY FOR FOUNDER REVIEW / HOLD / BLOCKED, review states including READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY, HOLD/BLOCKED for missing response-review owner/response not captured outside system/missing captured by/timestamp/source/channel/missing prior packet reference/prior state/decision/unresolved prior states/response completeness PARTIAL/NEEDS INFO without owner/still-incomplete gaps/contractor match not confirmed/recommended route unclear/consent/safety/prod risk, tracker/decision log/report/handoff, no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety with all Contractor/Homeowner notification sent: no), using required business language (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, estimate readiness, next-step readiness, manual estimate prep, contractor estimate review, homeowner clarification, homeowner clarification response review, draft-only, approved for manual follow-up, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW, READY FOR MANUAL HOMEOWNER CLARIFICATION, READY TO ROUTE MANUALLY) and preserving dry-run/internal-only/founder-operator-only posture. Workflow context update preserves the closeout lesson.

Subsequent build in the same first-roofer execution path delivered the First Roofer Manual Downstream Routing Command Packet (docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + grok workflow context + quality gate enforced). It continues after the homeowner clarification response review packet with a dry-run/internal-only/founder-operator-only manual downstream routing worksheet and decision packet that takes the reviewed result of the First Roofer Homeowner Clarification Response Review Command Packet and gives the founder/operator a structured manual routing process for deciding where the lead goes next: RETURN TO CONTRACTOR ESTIMATE REVIEW, RETURN TO MANUAL ESTIMATE PREP, RETURN TO ESTIMATE NEXT-STEP READINESS, RETURN TO MANUAL FOLLOW-UP, RETURN TO APPOINTMENT OR ACCESS COORDINATION, READY FOR FOUNDER REVIEW, HOLD, or BLOCKED. Includes all required operational sections, concrete fields (Lead ID, homeowner name, property address, lead source, source detail, service type, homeowner preferred channel, contact permission status, contractor match, contractor service-area fit, prior appointment outcome, appointment readiness state, inspection coordination state, manual follow-up state, estimate / next-step state, manual estimate prep state, manual contractor review state, manual homeowner clarification state, manual homeowner clarification response-review state, manual response-review decision, response completeness, all remaining gap types with owners, estimate assumptions/unknowns resolved, contractor/founder/homeowner questions answered, consent/safety, prior recommended and final manual downstream route, manual routing owner/reviewer, route decision timestamp, routing reason/evidence, next manual action/owner/due, readiness/decision/state, route conflict, HOLD/BLOCKED reason, notes), required route values (RETURN TO CONTRACTOR ESTIMATE REVIEW etc.), required readiness/decision/state values (READY / NEEDS INFO / HOLD / BLOCKED, PASS / HOLD / BLOCKED, DRAFT / REVIEWED / ... / ROUTED MANUALLY / HOLD / BLOCKED), required safety markers (Estimate created: no and all others no), required route eligibility rules, required HOLD/BLOCKED cases (missing owner/reviewer/timestamp/reason/evidence, contact/permission/channel/contractor issues, prior states, response review not PASS, gaps without owner, unresolved items, conflicts, consent/safety/prod/live risks, payment/invoice risk), tracker/decision log/report/handoff, references to the full prior packet chain (response review primary + homeowner clarification + contractor estimate review + estimate prep + estimate/next-step + manual follow-up + appointment outcome/readiness + inspection coordination + day-one + quality gate), using required business language (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, estimate readiness, next-step readiness, manual estimate prep, contractor estimate review, homeowner clarification, homeowner clarification response review, manual downstream routing, draft-only, approved for manual follow-up, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW, READY FOR MANUAL HOMEOWNER CLARIFICATION, READY TO ROUTE MANUALLY, ROUTED MANUALLY) and preserving dry-run/internal-only/founder-operator-only posture with no live sends, no estimate create, no quote generate, no booking, no calendar, no production writes. Quality gate and product verifier satisfied. This records the manual downstream routing command packet milestone.

After fast-forward merging an agent branch into canonical main while local HEAD is ahead of origin/main, do not run wrappers or scripts/check-agent-product-quality-gate.sh as canonical pre-push blockers because they can invoke safe readiness / aggregate and hit source-of-truth-sensitive legacy failures before push. Canonical pre-push should use only direct read-only checks that do not invoke aggregate: node --check for the packet verifier, the packet verifier directly, node backend/scripts/verify-agent-product-quality-gate-readonly.js directly, backend build, and clean git status; then push/fetch/source-of-truth; then run wrappers/full aggregate/backend build/source-of-truth. Cleanup should be idempotent.

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
