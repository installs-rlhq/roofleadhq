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

- forbidden pilot-duration promise language
- forbidden quota-style promise language
- forbidden outcome language
- forbidden outcome language
- forbidden guarantee language
- forbidden guarantee language
- forbidden guarantee language
- forbidden guarantee language

## Grok Build Verdict

The decisive Grok Build trial was positive, but not frictionless.

Grok successfully produced a larger product-moving packet:

## Website Positioning Recovery (public copy correction in agent worktree)
website positioning recovery
verify-website-positioning-recovery-readonly.js

- Worktree: agent/website-positioning-recovery
- Source: 029ed81 (Growth Tier screenshots placement)
- Changes: website/index.html public copy overhaul to RoofLeadHQ AI / Guided Setup / 14-day trial model (H1, core insight, CTAs, how it works, pricing, FAQ, footer, meta, schema). Forbidden public phrases removed. Three Growth Tier PNGs preserved.
- New: WEBSITE_POSITIONING_RECOVERY_PACKET.md + verifier script + dry-run wrapper.
- Updated: prior website verifiers (launch copy, conversion polish, screenshot placement) to require new positioning language; aggregate + verifier index + next-chat packages + business guide + this workflow doc wired.
- Verification: full list per packet (node --check, verifiers, dry-runs, build, show-diff-proof) executed inside worktree before commit.
- Commit: exact git add list from task + "test(website): recover rooflead ai positioning" (worktree only; do not push).
- Constraints: website/static copy + docs + read-only verifiers only. No backend/src, schema, auth, secrets, external calls, production, PNG edits. Safety posture preserved. Copy concise/direct/benefit-focused/roofer-facing. No guarantees or babysitting language in public.

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

Subsequent planning packet in the same first-roofer execution path context delivered the Roofer Data Protection and Tenant Isolation Plan Placement Packet (docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + grok workflow context + quality gate enforced + business buildout daily guide). It places the Roofer Data Protection and Tenant Isolation Readiness Milestone as a required future gated security/privacy milestone (BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE, BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE, BLOCKER BEFORE BROADER PRODUCTION LEAD DATA WRITES, BLOCKER BEFORE LIVE PRODUCTION WORKFLOWS) before any expansion. Planning-only, no implementation of controls, auth, schema, RLS, secrets, or access logic. Records all future scope, dependency map, checklists, safety markers (Planning-only packet: yes and all no-change markers), HOLD/BLOCKED cases, insertion tracker, and handoff. Preserves the corrected closeout lesson. Uses only approved business language. Verifier and quality gate satisfied. Safety: planning-only, dry-run/internal-only/founder-operator-only. No production data, no live behavior.

Subsequent (and final) build in the same first-roofer execution path delivered the First Roofer Founder Review Queue Command Packet (docs/FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md + wrapper + verifier, wired into aggregate/index/both next-chat contexts + grok workflow context + business buildout daily guide + quality gate enforced). It continues after the manual downstream routing packet with a dry-run/internal-only/founder-operator-only structured founder/operator review queue for leads marked READY FOR FOUNDER REVIEW. The founder review queue command packet gathers final evidence, reviews all prior packet states, confirms no unresolved blockers, records founder decision (PASS / HOLD / BLOCKED), and routes to next manual action via route decision matrix. Includes all required operational sections (purpose/safety, when to use, upstream chain with manual downstream routing primary, queue intake, eligibility, evidence checklist, homeowner/property/lead summary, contractor/roofer fit summary, appointment/access summary, estimate/next-step readiness summary, homeowner clarification/response-review summary, manual downstream routing summary, data protection/privacy checkpoint, founder decision criteria, manual founder review worksheet, route decision matrix with all condition->READY FOR MANUAL ... / RETURN TO ... / HOLD / BLOCKED mappings, PASS/HOLD/BLOCKED rules, return-to-packet options, next-action assignment, manual comm draft-review checklist, no-send/no-booking/no-estimate safety, decision log, review queue tracker, EOD founder review report, next-chat handoff, explicit dry-run/internal-only/founder-operator-only confirmation), all required concrete fields (Queue item ID, Lead ID, homeowner name, property address, lead source, source detail, service type, roofer/contractor name, all prior * states, founder review owner/reviewer, review queue timestamp, review priority, evidence completeness, remaining gaps with owner/due, resolved questions/assumptions/constraints, consent/safety, data protection checkpoint, privacy/lead boundary notes, founder decision/reason/evidence, final manual route, next manual action/owner/due, comm draft reviewed, ready-for flags, HOLD/BLOCKED reason, notes), required values, eligibility rules, HOLD/BLOCKED cases (missing critical fields/IDs, incorrect prior route/state, unresolved response-review, missing/inconsistent evidence, missing contact/fit, unresolved gaps without owner/due, missing final/next/owner/due, comm needed but draft not reviewed, any send/booking/estimate/quote/invoice attempted, any prod/external/live risk), route decision matrix, all safety markers (Dry-run packet: yes etc., all no), decision log/tracker/EOD/handoff. Uses only approved business language (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, READY FOR FOUNDER REVIEW and all listed READY/RETURN routes, data protection checkpoint, privacy / lead boundary notes). Forbidden business language absent. Implementation-risk strings absent from doc/wrapper. This is the final build before a new chat (short milestone note also in daily guide for easy recovery). Preserves the corrected closeout lesson. Verifier and quality gate satisfied. Safety: dry-run/internal-only/founder-operator-only. No production data, no live behavior, no sends, no booking, no estimates/quotes/invoices/payments. Stop after implementation, gates, and diff proof. Do not commit. Do not push.

Website-only public copy safety build delivered the Website Founder-Led Launch Copy Cleanup Packet (docs/WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md + scripts/run-website-founder-led-launch-copy-dry-run.sh + backend/scripts/verify-website-founder-led-launch-copy-readonly.js). website copy cleanup. Public website/index.html (and public positioning) cleaned for Founder-Led Launch Program: required safe phrases asserted present in verifier (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination, Request Founder-Led Launch Review, See if RoofLeadHQ is a fit); forbidden/risky phrases asserted absent from website/index.html + packet; asserts no backend/src routes/controllers/services modified and no migration/schema/auth/secrets/env modified; wired into aggregate (verify-first-paid-pilot-readiness-readonly.js), FIRST_PAID_LAUNCH_VERIFIER_INDEX.md, next-chat contexts, this workflow context, business daily guide; wrapper updated to call verifier + direct verify-agent-product-quality-gate-readonly.js + check sh; verification commands documented (node --check verifier; node verifier; run wrapper; node verify-agent quality gate; npm backend build; scripts/show-diff-proof.sh). Website/copy/docs/read-only verifier changes only. No live activation/no production behavior/no writes/no integrations/no auth/schema/security impl. Positioning remains founder-led, manual-review-backed, manually coordinated. Quality gate + verifier enforced before commit. This packet makes the public site safer and ready to support first paid roofer outreach without overclaiming or implying automation. Commit inside worktree only: test(website): add founder-led launch copy cleanup. Do not push. verify-website-founder-led-launch-copy-readonly.js is the dedicated read-only verifier.

Follow-on polish build delivered the Website Founder-Led Launch Conversion Polish Packet (docs/WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET.md + scripts/run-website-founder-led-conversion-polish-dry-run.sh + backend/scripts/verify-website-founder-led-conversion-polish-readonly.js). website copy polish. Public website/index.html polished for more natural/credible/conversion-oriented first-paid-roofer outreach after the cleanup (hero states respond-faster + organize leads + qualify + coordinate via founder-led manual review; FAQ explains current launch state plainly; awkward phrasing reduced including specific replacements for fast response support, manual repetition, prepared under..., comparison, section titles, popup aria-label, footer link). Required safe phrases kept present and asserted by verifier; 8 listed polish leftovers asserted absent from index.html (plus prior forbidden remain absent); no backend/src etc changes asserted. Wired into aggregate (verify-first-paid-pilot-readiness-readonly.js), FIRST_PAID_LAUNCH_VERIFIER_INDEX.md, next-chat contexts, this workflow context, business daily guide. Wrapper chains launch-copy verifier + new polish verifier + quality gate. Verification commands: node --check on both verifiers; run both; run launch + polish dry-run wrappers; node verify-agent quality gate; npm backend build; scripts/show-diff-proof.sh. Then exact git add (including new packet/verifier/wrapper + aggregate + index + contexts + daily guide) + commit "test(website): polish founder-led launch conversion copy" inside worktree only. Do not push. The new verify-*-conversion-polish-readonly.js is the dedicated read-only verifier for the polish step.

Website demo screenshot assets build (test(website): add demo screenshot assets) added three static demo pages under website/demo/ (dashboard-sample.html, weekly-report-sample.html, monthly-report-sample.html) plus shared demo.css for marketing screenshots. Uses "Front Range Roofing Co." fake roofer, visible SAMPLE DATA / DEMO PREVIEW on every page, first+last-initial fake names, 555 phones, city-level locations only. All language is Founder-Led Launch Program + manual founder/operator review + manual coordination + inspection coordination + live automation disabled. New packet + verifier + wrapper follow the exact website copy pattern. Verifier (backend/scripts/verify-website-demo-screenshot-assets-readonly.js) implements the full 11 requirements (existence, labeling, safe phrases per page type, forbidden phrases absent, no external calls in pages/scripts, git no-backend/src + no schema/auth/secrets, PASS summary). Wired into aggregate (verify-first-paid-pilot-readiness-readonly.js), FIRST_PAID_LAUNCH_VERIFIER_INDEX.md, all next-chats, this workflow context, and daily guide. Pre-commit verification, git add list, and commit inside worktree only (no push). Safety posture: static demo assets / docs / read-only verifier only. No production behavior of any kind. verify-website-demo-screenshot-assets-readonly.js is the dedicated read-only verifier.

Website homepage screenshot placement build (test(website): place homepage growth tier screenshots) placed the final uploaded Growth Tier screenshots (website/dashboard-sample.png, website/weekly-report-sample.png, website/monthly-report-sample.png) into the public homepage website/index.html. Targeted the INSIDE ROOFLEADHQ SCREENSHOTS section (dashboard/reporting cards): replaced placeholder/prior demo references with the three exact PNGs in desktop grid and mobile scroll; aligned headings to Dashboard / Weekly Reports / Monthly Reports (close equivalents preserved from site); set required alt texts ("Sample Growth Tier dashboard preview" etc.). Preserved all Founder-Led Launch Program copy, prior polish, and safety language. No bulky text or layout disruption. New packet + verifier + wrapper + wiring updates follow the exact prior website pattern. Verifier (backend/scripts/verify-website-homepage-screenshot-placement-readonly.js) implements the required confirms (3 PNG refs in index.html, PNG files exist, alt text includes descriptions, no backend/src, no schema/auth/secrets/env, no external calls added, clear PASS) plus aggregate/index/contexts/daily/workflow wiring checks. Wired into aggregate (verify-first-paid-pilot-readiness-readonly.js), FIRST_PAID_LAUNCH_VERIFIER_INDEX.md, all next-chats, this workflow context, and daily guide. Pre-commit verification, git add list (website/index.html + new docs/scripts + aggregate + index + next-chats + workflow + daily), and commit inside worktree only (no push). Safety posture: website/copy/static-asset/reference + docs/read-only verifier only. No production behavior, no backend/src, no schema/auth/secrets/external calls. Final screenshots now visible on public homepage for Growth Tier dashboard + reports.

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
