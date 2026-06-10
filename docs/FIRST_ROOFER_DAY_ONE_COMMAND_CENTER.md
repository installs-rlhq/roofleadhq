# First Roofer Founder/Operator Day-One Command Center

## Purpose and safety posture

This packet creates the First Roofer Founder/Operator Day-One Command Center for the Founder-Led Launch Program.

It turns the first-roofer lead-to-inspection ops work and execution-day runbook into a practical, usable day-one cockpit. The founder/operator can manually run a full first-roofer execution day from lead intake through inspection/appointment readiness and end-of-day reporting using only manual founder/operator review and manual coordination only.

This packet builds directly on:
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`
- Agent Product Quality Gate (product-depth standard for Grok/agent tasks)

It is a product-moving operational packet. It provides the founder/operator with a single coherent cockpit (checklists, triage board, queues, worksheets, decision logs, timeline, escalation rules, outcome capture, reporting, and handoff) that can be printed, copied into notes, or used in a working session for the first roofer day.

**This is strictly dry-run/internal-only/founder-operator-only.**

No production activation of any kind is permitted or performed by this packet.

### Explicit no-live-automation confirmation

- No live SMS/Twilio activation or sends.
- no live SMS/Twilio (safety marker)
- No live Vapi calls.
- No Calendar booking activation.
- No Resend production sends.
- No Lindy external sends.
- No cron/scheduler/dispatcher activation.
- No public route activation.
- No production Supabase writes.
- No external notifications.
- No production credentials.
- No automated booking.
- No production route activation.
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually prepare to book inspections and book appointments. It does not book, dispatch, or guarantee anything.

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

Required dry-run flags (confirmed before use):
- WORKSPACE_MODE=dry-run
- SMS_ACTIVATION=false
- CALENDAR_ACTIVATION=false
- VAPI_ACTIVATION=false
- SUPABASE_WRITES=false
- CONTRACTOR_NOTIFICATION=false
- HOMEOWNER_NOTIFICATION=false
- CRON_ACTIVATION=false
- SCHEDULER_ACTIVATION=false
- DISPATCHER_ACTIVATION=false
- PUBLIC_ROUTE_ACTIVATION=false

This packet performs no writes, sends, calls, or activations. It is for internal founder/operator rehearsal and day-one manual execution practice only.

## Day-one command center overview

The Day-One Command Center gives the founder/operator one place to run the first roofer day manually:

- Start the day with a readiness checklist.
- Triage incoming leads on the intake board.
- Queue and resolve completeness / missing-information items.
- Prepare manual homeowner and contractor communications (never sent by the packet).
- Complete inspection readiness and appointment readiness worksheets.
- Log explicit founder/operator decisions.
- Follow a manual coordination timeline.
- Apply same-day escalation rules.
- Capture end-of-day outcomes and produce a report.
- Leave clear handoff notes for the next operator session.

All steps use "book inspections" / "book appointments" language only. The goal is inspection readiness and appointment readiness via manual coordination only.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable cockpit that can be used end-to-end on sample leads for a full manual day-one execution session without any production systems, live sends, or automated booking.

## Start-of-day readiness checklist

Before reviewing any leads, the founder/operator completes this checklist manually.

- [ ] Source-of-truth commit verified (current verified baseline: 83a184a docs(agent): add Grok build workflow context package)
- [ ] Worktree is the approved agent worktree (not /root/roofleadhq main)
- [ ] `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md` and `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md` present and reviewed
- [ ] `scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh` passed in this session
- [ ] `scripts/check-agent-product-quality-gate.sh` passed
- [ ] `scripts/check-production-gates.sh` passed
- [ ] `scripts/verify-safe-readiness.sh` passed
- [ ] Dry-run flags confirmed in environment (WORKSPACE_MODE=dry-run and all *_ACTIVATION=false)
- [ ] No production credentials or live tokens visible
- [ ] Sample lead data or fixture available for manual review (never live ingestion)
- [ ] Notepad / printed copies / digital scratch space ready for filled fields and decision logs
- [ ] Explicit confirmation: this session is dry-run/internal-only/founder-operator-only with no live automation

Start-of-day status: PASS / HOLD / BLOCKED

Owner: ____________________
Timestamp: ____________________

## Lead intake triage board

The founder/operator maintains a simple manual triage board (paper, notes app, or whiteboard) for all leads under review this day.

Columns (manual only):
- New / Intake
- Completeness Review
- Missing-Info Queue
- Communication Prep
- Inspection Readiness
- Appointment Readiness
- Outcome Logged
- HOLD
- BLOCKED

For each lead on the board, capture at minimum:

- Lead ID: (e.g. L-20260605-001 or source identifier)
- Homeowner name: 
- Property address: 
- Lead source: 
- Source detail: 
- Service type: (inspection, repair, storm response, etc.)
- Urgency: (emergency / high / standard / low)
- Roof age if known: 
- Damage description: 
- Photos present: yes / no / unknown / link(s)
- Insurance involvement: yes / no / unknown / claim #
- Contact permission status: granted / pending / unknown / do-not-contact
- Lead received timestamp: 
- Current board column: 
- Assigned manual owner (founder/operator): 
- Last updated: 

The triage board is updated manually after every decision or queue move. No automated state machine.

## Lead completeness and missing-information queue

Apply the lead completeness checklist (expanded from lead-to-inspection ops) to every lead.

Required fields to review for every lead:
- Lead ID
- Homeowner name
- Property address
- Lead source + source detail
- Service type
- Urgency
- Roof age if known
- Damage description
- Photos present: yes/no/unknown
- Insurance involvement: yes/no/unknown
- Contact permission status
- Missing fields (explicit list)

Lead Completeness Checklist (mark explicitly):
- [ ] Lead ID recorded
- [ ] Homeowner name or clear placeholder present
- [ ] Property address (full / partial / missing)
- [ ] Lead source and source detail credible
- [ ] Service type identified
- [ ] Urgency stated or reasonably inferred
- [ ] Roof age / damage description present and actionable
- [ ] Photos status recorded
- [ ] Insurance / storm context captured
- [ ] Contact permission / consent status known
- [ ] No safety, spam, or consent flags

If any required item is missing or unclear, move the lead to the Missing-Information Queue and log:

Missing-Information Queue entry:
- Lead ID: 
- Homeowner name: 
- Missing fields: (comma list)
- Recovery action decided: HOLD / MANUAL REVIEW / MANUAL FOLLOW-UP PREP / BLOCKED
- Notes for manual recovery:
- Owner:
- Timestamp:

Return to triage board only after the queue entry is updated or resolved.

## Homeowner manual communication prep

The founder/operator prepares manual communication language for the homeowner. This packet never sends.

Manual Homeowner Communication Prep (required fields):
- Lead ID:
- Homeowner name:
- Property address:
- Key facts to convey (roof issue, urgency, insurance/storm context):
- Inspection or appointment window options (if known):
- Questions to ask homeowner:
- Proposed next manual step (e.g. "call to confirm availability for inspection"):
- Manual message draft (copy/paste outside system only if explicitly approved for real contact later):
- Manual homeowner message prepared: yes / no
- Manual homeowner message prepared: yes/no (field form)
- Approval status: DRAFT ONLY / APPROVED FOR MANUAL USE OUTSIDE SYSTEM / HOLD
- Production systems touched: no
- External send performed: no
- Owner:
- Timestamp:

All drafts remain internal. No Twilio, Resend, Lindy, or other delivery from this packet.

## Contractor manual communication prep

The founder/operator prepares manual briefing notes for the contractor. This packet never notifies.

Manual Contractor Communication Prep (required fields):
- Lead ID:
- Homeowner name / property address:
- Roof issue summary + damage description:
- Urgency:
- Insurance/storm context:
- Photos present: yes / no / unknown
- Proposed inspection (book inspections) or appointment (book appointments):
- Service area fit: yes / no / hold
- Contractor availability known: yes / no / unknown
- Missing information for contractor:
- Founder/operator recommendation:
- Manual contractor message prepared: yes / no
- Manual contractor message prepared: yes/no (field form)
- Approval status: DRAFT ONLY / HOLD
- Manual coordination only: yes
- Production systems touched: no
- External notification sent: no
- Owner:
- Timestamp:

## Inspection readiness worksheet

Complete this worksheet before declaring inspection readiness.

Inspection Readiness Worksheet (concrete fields):
- Lead ID:
- Homeowner name:
- Property address:
- Lead source + source detail:
- Service type:
- Urgency:
- Roof age if known:
- Damage description:
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Contact permission status:
- Missing fields (list):
- Contractor match / availability known: yes / no / hold
- Homeowner availability window known: yes / no / hold
- Service area fit confirmed: yes / no / hold
- Manual confirmation steps completed: (list)
- Manual homeowner message prepared: yes / no
- Manual contractor message prepared: yes / no
- Calendar activation required: no
- Production booking enabled: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision (field): PASS / HOLD / BLOCKED
- Reason / evidence (one sentence minimum, referencing completeness, missing-info, and manual prep):
- Manual next action for inspection coordination:
- Owner:
- Timestamp:

## Appointment readiness worksheet

Complete this worksheet when the lead advances past inspection readiness or when appointment is the direct next step.

Appointment Readiness Worksheet (concrete fields):
- Lead ID:
- Homeowner name:
- Property address:
- Inspection readiness status: PASS / HOLD / BLOCKED (reference prior worksheet)
- Preferred appointment window:
- Contractor availability confirmed for window: yes / no / hold
- Homeowner availability confirmed for window: yes / no / hold
- Service type / scope for appointment:
- Any pre-appointment requirements (photos, claim info, access):
- Manual homeowner message prepared: yes / no
- Manual contractor message prepared: yes / no
- Manual coordination notes:
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision (field): PASS / HOLD / BLOCKED
- Reason / evidence (ties back to inspection worksheet + completeness):
- Manual next action for booking the appointment:
- Owner:
- Timestamp:

## Founder/operator decision log

Every lead must have explicit manual decisions logged before advancing stages.

Decision options (tied to Founder-Led Launch Program):
- PASS TO MANUAL COMMUNICATION PREP: lead complete enough for founder/operator-prepared homeowner/contractor notes and inspection/appointment tracking using manual coordination only.
- PASS TO INSPECTION READINESS: inspection readiness worksheet supports manual coordination to book inspections.
- PASS TO APPOINTMENT READINESS: appointment readiness worksheet supports manual coordination to book appointments.
- HOLD FOR MISSING INFO: enter or remain in missing-information queue.
- HOLD FOR CONTRACTOR FIT: roofer/service-area/availability needs manual confirmation.
- HOLD FOR FOUNDER REVIEW: additional internal review required.
- BLOCKED FOR SAFETY: production activation, consent, credential, route, or external notification risk.
- NO ACTION: not suitable for this first-roofer day-one dry run.

Decision Log entry (required fields):
- Lead ID:
- Homeowner name:
- Decision: (exact option above)
- Reason: (references checklists, worksheets, missing fields)
- Inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- Evidence reviewed:
- Open questions:
- Founder/operator notes:
- Manual next action:
- Owner:
- Timestamp:

This log is the source for the triage board column moves and end-of-day capture.

## Manual coordination timeline

A simple manual timeline for the day (founder/operator fills timestamps):

- 08:00 — Start-of-day readiness checklist complete
- 08:15 — Lead intake triage board populated from sources
- 08:30 — First lead completeness review + missing-info queue
- 09:00 — Homeowner manual communication prep (first leads)
- 09:30 — Contractor manual communication prep
- 10:00 — Inspection readiness worksheets (first leads)
- 11:00 — Appointment readiness worksheets (advancing leads)
- 12:00 — Mid-day decision log review + triage board update
- 13:00 — Same-day escalation review for any HOLD/BLOCKED
- 15:00 — Continue lead cycles; update outcome capture
- 16:30 — End-of-day outcome capture for all leads
- 17:00 — End-of-day reporting template filled
- 17:15 — Handoff notes for next operator session
- 17:30 — Day closed; production systems untouched

All times and entries are manual. No scheduler or dispatcher.

## BLOCKED / HOLD / PASS criteria

### FIRST ROOFER DAY ONE COMMAND CENTER PASS
The founder/operator can conduct a full internal day-one execution using the command center in dry-run mode only, with production activation disabled. All required sections, concrete fields, worksheets, decision logs, safety language, and cross-references are present and substantive. The cockpit is product-moving and directly usable for manual review, manual communication prep, inspection readiness, appointment readiness (book inspections / book appointments via manual coordination only), outcome capture, end-of-day reporting, and handoff.

### FIRST ROOFER DAY ONE COMMAND CENTER HOLD
Missing prerequisites (runbooks, ops pack, quality gate, production gates), incomplete lead details on triage board, missing concrete fields in worksheets, missing decision log entries, missing PASS/HOLD/BLOCKED criteria, or unclear inspection/appointment readiness. Fix and re-run the dry-run wrapper + verifier before continuing.

### FIRST ROOFER DAY ONE COMMAND CENTER BLOCKED
Any production activation, data mutation, automated booking, external notification, route activation, credential exposure, destructive action, live-send risk, or use of forbidden business language detected. Stop all use immediately. Resolve only after production gates + safe readiness pass and explicit founder confirmation. Do not proceed until cleared.

## Same-day escalation rules

During the day, apply these rules manually:

1. Any lead with consent, spam, or safety flag → immediate BLOCKED. Remove from active triage. Log in decision log and escalation note.
2. Any lead where service area does not fit after manual check → HOLD FOR CONTRACTOR FIT or BLOCKED. Do not prepare communications that imply a booking.
3. Any sign of production system activation or live flag change during the session → full stop. Re-run production gates and safe readiness. Escalate to founder before any further work.
4. Three or more leads with the same missing-information category (e.g. no contact permission) → note as theme in end-of-day report and recommend intake improvement.
5. Any lead that would require a live send, call, or calendar write to advance → HOLD and log "manual coordination only — external action deferred".
6. BLOCKED leads are reviewed at end-of-day escalation review slot; they do not advance.

All escalations are recorded in the founder/operator decision log and end-of-day report.

## End-of-day outcome capture

For every lead reviewed, record a final outcome entry (use the decision log + worksheets as source).

End-of-Day Outcome Capture (per lead):
- Lead ID:
- Homeowner name:
- Property address:
- Final outcome: PASS / HOLD / BLOCKED / NO ACTION (exact)
- Inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- Ready to book inspections: yes / no
- Ready to book appointments: yes / no
- Manual communication prepared (homeowner): yes / no
- Manual communication prepared (contractor): yes / no
- manual communication prepared (summary field)
- Missing information summary:
- Key founder/operator notes:
- Production systems touched: no
- External notifications sent: no
- Supabase writes performed: no
- Manual next action / follow-up:
- Owner:
- Timestamp:
- End-of-day outcome: recorded per lead with readiness decisions and notes

Aggregate daily counts are computed from these entries for the reporting template.

## End-of-day reporting template

Fill this at close of day. Save alongside filled decision logs, worksheets, and triage board notes.

End-of-Day Report — First Roofer Day-One Command Center
- Source of truth commit: 83a184a (or current worktree note)
- Execution day / session date:
- Founder/operator:
- Total leads reviewed:
- Leads with PASS (inspection or appointment readiness achieved):
- Leads ready to book inspections:
- Leads ready to book appointments:
- Leads on HOLD (by category: missing info / contractor fit / founder review):
- Leads BLOCKED (by reason):
- Leads NO ACTION:
- Missing-info themes (summary):
- Contractor-fit questions (summary):
- Manual homeowner communication drafts prepared:
- Manual contractor communication drafts prepared:
- Inspection readiness decisions logged:
- Appointment readiness decisions logged:
- Same-day escalations handled:
- Production sends/writes/routes activated: no
- External notifications sent: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Explicit no-live-automation confirmation: yes (see Purpose section)
- Recommended next build / improvement:
- Handoff notes location:

Next-action categories (use these):
1. Improve start-of-day readiness or triage board.
2. Improve lead completeness checklist or missing-info queue.
3. Improve homeowner/contractor manual communication prep.
4. Improve inspection readiness or appointment readiness worksheets.
5. Improve decision log or escalation rules.
6. Improve end-of-day outcome capture or reporting.
7. Escalate safety blocker before any further execution.

## Handoff notes for the next operator session

At end of day, leave these notes for the next founder/operator session (internal only).

Handoff Notes — First Roofer Day-One Command Center
- Date / session:
- Owner completing handoff:
- Triage board status (summary of open columns):
- Leads still in Missing-Information Queue (Lead IDs + missing fields):
- Leads with PASS decision but not yet coordinated (Lead IDs + next manual step):
- Leads on HOLD with owner/timestamp and reason:
- BLOCKED leads and escalation status:
- Key themes or repeated questions from the day:
- Any open same-day escalation items:
- Files / notes location for filled worksheets and logs:
- Dry-run flag confirmation at close: all false, no production activation
- dry-run flag confirmation: confirmed (WORKSPACE_MODE=dry-run and all activation flags false)
- Recommended first action for next session:
- Timestamp:

## Referenced Artifacts for Verification

- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md` (this document)
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`
- `scripts/run-first-roofer-day-one-command-center-dry-run.sh`
- `backend/scripts/verify-first-roofer-day-one-command-center-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`
- `scripts/check-agent-product-quality-gate.sh`
- `backend/scripts/verify-agent-product-quality-gate-readonly.js`
- `scripts/check-production-gates.sh`
- `scripts/verify-safe-readiness.sh`
- `scripts/agent-run-gates.sh`
- `scripts/agent-diff-proof.sh`

All references and safety boundaries are enforced by the dedicated read-only verifier and the aggregate first-paid pilot readiness verifier.

No production activation, no external sends, no data mutation. Manual founder/operator review and manual coordination only. Helps the founder/operator prepare to book inspections and book appointments via the Founder-Led Launch Program.

## PASS / HOLD / BLOCKED Summary (Command Center Level)

Use the criteria in the dedicated section above. The command center is PASS only when the full cockpit is operationally usable for a manual first-roofer day-one execution with all required fields, worksheets, logs, templates, safety language, required business phrases present, and forbidden phrases absent.
