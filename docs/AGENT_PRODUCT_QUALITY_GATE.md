# Agent Product Quality Gate

## Purpose

This packet adds a reusable, repo-controlled product-depth and quality standard plus read-only verifier for RoofLeadHQ agent and Grok Build tasks.

The goal is to improve future Grok/agent builds by preventing shallow verifier-satisfying artifacts. Future agent tasks can (and must) use this gate before final review on any product-moving work.

This packet is docs/scripts/read-only only. It does not activate any automation.

## Why This Gate Exists (Lesson from First Grok Build Run)

The first Grok Build run produced a shallow verifier-satisfying artifact. The initial implementation only performed surface-level string-presence checks (e.g., confirming that a heading existed in a file) until the verifier was strengthened with deeper operational, field, workflow, decision-log, template, wiring, safety, and forbidden-language assertions.

Without this gate, agent output could pass mechanical checks while delivering incomplete, non-operational, or preservation-only layers that still required heavy manual babysitting and rewriting by the founder/operator.

This gate exists to make the quality bar explicit, machine-enforceable, and reusable so that product-moving tasks deliver real operational usefulness on the first pass.

## Product-Depth Rule

Product-moving tasks must verify operational usefulness, not just string presence.

- "Product-moving" means any task whose objective is to add, change, or complete a launch packet, workflow, operator tool, decision gate, template, or capability that humans (founder, operator, contractor) will rely on to perform real work.
- Shallow string presence (heading exists, a keyword appears) is necessary but never sufficient.
- The output must contain the actual required sections, data fields under those sections, decision logs with PASS/HOLD/BLOCKED tied to the product outcome, templates that are usable, wiring that is complete, and explicit safety boundaries.
- If the delivered artifact only documents or preserves prior state without advancing the product outcome in a usable way, it does not satisfy the product-depth rule.

## Reusable Product Quality Checklist for Future Agent Tasks

Every product-moving agent task must satisfy these categories. The read-only verifier and manual review will check for them.

- **Product outcome**: Clear statement of the operational result the change enables. Includes success criteria or measurable usefulness for the operator/user (not just "added a doc").
- **Required operator/user workflow sections**: Full, step-by-step sections describing exactly how a human uses the new capability end-to-end. Includes prerequisites, exact commands or UI steps, decision points, and handoff points.
- **Required data fields**: Concrete fields, values, or structures that must exist under the relevant sections (e.g., specific keys in a packet, required columns, exact env flags and their meanings). Mere heading presence is not enough.
- **Required decision logs**: Explicit PASS / HOLD / BLOCKED (or equivalent) language with justification tied to the product outcome, safety posture, and completeness of the preceding chain. Decision language must be findable, consistent, and actionable.
- **Required templates**: Any reusable templates, sample files, fixtures, or copyable structures that the operator will actually use or instantiate. Templates must be present and referenced by the workflows.
- **Required PASS/HOLD/BLOCKED language**: The exact decision vocabulary used by the packet must appear in the expected locations with surrounding context (not just floating anywhere).
- **Required safety boundaries**: Explicit statements of what the artifact does NOT do (no live activation, no production writes, no external sends, etc.). Safety language must be consistent with the repo-wide posture.
- **Required forbidden language checks**: The artifact must not contain prohibited business or guarantee language (legacy pilot promises, quota-based appointment counts, job-booking or revenue guarantees, etc.). This check must be present in the verifier or wrapper for the artifact. The product quality gate verifier actively asserts their absence.
- **Required wiring checks**: The new artifact (doc + any wrapper + verifier) must be referenced from the aggregate readiness verifier, the verifier index, the next-chat context package(s), and any relevant agent contract/template. Cross-references must be bidirectional where applicable.
- **Required diff proof**: Before the task can be considered complete, `git diff --stat`, `git diff`, targeted greps, verifier output, and build output must be shown.
- **Required final Terminal 1 source-of-truth verification**: After all local checks, the final review must include explicit Terminal 1 verification (fetch, status, log, and confirmation that the delivered state matches the intended handoff baseline).

## Shallow Checks to Avoid (Examples)

These patterns produce verifier-satisfying but shallow artifacts and must be rejected:

- Only checking that a heading exists: `if (content.includes('# Product Outcome')) { pass(); }` — without requiring any substantive paragraphs, fields, or success criteria under that heading.
- Example of shallow check to avoid: only checking that a heading exists (instead of requiring fields under sections).
- Only checking keyword presence for decisions: confirming "PASS" or "BLOCKED" appears anywhere in the file, without requiring the decision to be inside the correct section with justification and tied to the actual product outcome.
- Only confirming file existence for templates without validating that the template contains the required operational sections and safety flags.
- Accepting an "archive" or "preservation" document as completion for a task whose request was to deliver a new operational workflow or packet.
- Counting the number of sections or links without verifying that the linked or subsection content actually implements the required operator workflow or data contract.

## Stronger Checks (Examples)

Preferred patterns that the product quality gate and future verifiers should use:

- Under the "Required Data Fields" section (or equivalent), assert that specific named fields exist with descriptions: e.g., `SMS_ACTIVATION=false`, `WORKSPACE_MODE=dry-run`, and the full list of production-disabled flags.
- Example of stronger check: requiring fields under sections (instead of only checking that a heading exists).
- Require that a "Decision Log" or "PASS/HOLD/BLOCKED" subsection contains at least one of the three tokens AND a justification sentence that references the product outcome and at least two other checklist items (e.g., "safety boundaries" and "wiring").
- For a workflow section, require not only the heading but also numbered steps that include at least one exact command/script path that the operator would run.
- For a packet, require that both the wrapper script and the readonly verifier are listed under "Wiring" and that the aggregate script actually invokes the new verifier.
- Combine file-existence asserts with content asserts that look for child fields under parent sections (e.g., use line-aware or section-scoped greps/asserts in the verifier).

## Archive / Lock / Preservation Layer Rule

Agents must not pass product-moving tasks by creating only archive/lock/preservation layers.

- If the requested task is to advance a product capability (new packet for launch use, new operator workflow, new decision gate, new intake/execution artifact), the primary deliverables must be the operational content, not merely a new preservation snapshot or completion-lock document.
- Archive/lock/preservation documents are valuable as part of a complete chain, but they are the final step after the operational content exists and has been accepted.
- A task that only emits new `...-archive.md`, `...-completion-lock.md`, `...-preservation-snapshot.md` files (and their wrappers/verifiers) for a product-moving objective fails the product-depth rule unless the task description explicitly scoped the work as "archive-only extension of an already-accepted operational packet."
- When in doubt, the agent must deliver the operator/user-facing operational sections first, then the archive layers as follow-on artifacts.

## Dry-Run / Internal-Only Safety Posture

All work governed by this gate remains strictly dry-run and internal-only unless explicit founder approval is given for a narrowly scoped exception.
dry-run/internal-only

Required safety language (must be present and accurate in relevant artifacts):

- dry-run only by default
- no production writes
- no SMS sends
- no calls
- no emails
- no contractor/homeowner notifications
- no cron/scheduler/dispatcher activation
- no public route enablement
- no credential/secret exposure

Explicitly prohibited (no live activation allowed by artifacts created under this gate):

- no live SMS/Twilio
- no Vapi live calls
- no Calendar activation
- no Resend production sends
- no Lindy external sends
- no cron/scheduler/dispatcher activation
- no public route activation
- no production Supabase writes
- no external notifications
- no production credentials

The gate itself and every artifact it protects must preserve the global posture: "demo ready with live automation disabled".

## Forbidden Business / Guarantee Language

Product artifacts, context packages, verifiers, and related docs must not contain prohibited business or guarantee language (legacy pilot promises, quota-based appointment counts, job-booking guarantees, revenue guarantees, or similar hard outcome claims).

The reusable checklist requires "required forbidden language checks". Verifiers under this gate (including the product quality gate verifier and production gate checks) must actively assert absence of the current list of forbidden strings in the protected surfaces. The exact current list lives in the verifier implementation so that the rule can be updated without polluting documentation files.

Unless the task is explicitly to remove or deprecate legacy language (narrowly scoped and approved), these phrases must remain absent.

## How To Use This Gate (Future Agent Tasks)

1. When a task is product-moving, include `docs/AGENT_PRODUCT_QUALITY_GATE.md` in the allowed files and reference the checklist in your plan.
2. Before claiming completion:
   - Run `scripts/check-agent-product-quality-gate.sh`
   - Run `node backend/scripts/verify-agent-product-quality-gate-readonly.js`
   - Include the output in your final handoff.
3. The aggregate `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js` will invoke the dedicated product-quality verifier.
4. Always finish with `scripts/agent-diff-proof.sh` (or the commands it runs) plus Terminal 1 source-of-truth confirmation.

## Packet Contents (This Gate)

- `docs/AGENT_PRODUCT_QUALITY_GATE.md` — this standard and checklist.
- `scripts/check-agent-product-quality-gate.sh` — read-only wrapper that runs node --check on the verifier, runs the verifier, production gates, and safe readiness. Prints clear PASS. Contains no source-of-truth check (worktrees may be ahead/behind).
- `backend/scripts/verify-agent-product-quality-gate-readonly.js` — the enforcing read-only verifier. Asserts file presence, wiring, doc content categories, lesson, examples, archive warning, safety language, forbidden business language absence, and absence of unsafe implementation strings in the wrapper.

## Wiring Requirements Enforced by the Verifier

The product quality gate verifier asserts:

- Expected files exist (doc, wrapper, verifier).
- Wrapper (`check-*.sh`) invokes the verifier via `node ...verify-agent-product-quality-gate-readonly.js`.
- Aggregate readiness (`verify-first-paid-pilot-readiness-readonly.js`) includes the new verifier.
- Verifier index references the doc, wrapper, and verifier.
- `AGENT_WORKFLOW_CONTRACT.md` and `AGENT_TASK_TEMPLATE.md` reference the product quality gate.
- `NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md` references the product quality gate.
- The doc contains the product-depth checklist categories, the first-Grok-Build lesson, shallow-check examples, stronger-check examples, the archive/lock-only warning, and the required safety language.
- Forbidden business language is absent from protected files.
- No unsafe implementation strings appear in the wrapper script:
  - twilio.messages.create
  - supabase.from(
  - resend.emails.send
  - calendar.events.insert
  - vapi.calls.create
  - retell.call
  - curl -X POST https://
  - fetch("https://
  - fetch('https://

All of the above must pass for the gate to report success.

## Current Status

This gate was introduced on the agent-product-quality-gate worktree to raise the floor for all subsequent agent-driven product work.

Safety: read-only verification and internal planning only. No live SMS/Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, public routes, Supabase writes, or external notifications. All work stays within approved worktree boundaries and stops after gates + diff proof.

PASS criteria for this gate itself: the delivered doc + wrapper + verifier form a coherent, reusable quality standard that will measurably reduce future manual babysitting of shallow artifacts.
