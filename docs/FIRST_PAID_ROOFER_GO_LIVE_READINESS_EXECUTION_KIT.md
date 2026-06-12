# First Paid Roofer Go-Live Readiness Execution Kit

Date: 2026-06-12

## Purpose

This is the practical manual execution system Jason (founder/operator) can use after Guided Setup is complete but before RoofLeadHQ AI setup goes live and before the 14-day trial begins. The kit confirms setup completeness, lead source readiness, response/follow-up readiness, booking/calendar readiness, reporting readiness, approved trial/payment language, data protection checkpoint, blocker status, and PASS/HOLD/BLOCKED go-live readiness. It hands off cleanly into the First Paid Roofer Launch System Packet and trial day-one operations.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, and evidence logs are internal-only / dry-run / founder-operator-only. This is manual readiness review only, not automation. No public founder-led/manual babysitting positioning is used for customers or prospects.

This kit is product-moving and operationally usable: it contains the concrete setup completion review checklist, lead source readiness checklist, response and follow-up readiness checklist, booking and calendar readiness checklist, reporting readiness checklist, trial/payment language confirmation checklist, data protection and tenant isolation checkpoint (cross-reference to WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md), go-live blocker register with explicit PASS/HOLD/BLOCKED rules, go-live decision gate, setup-to-trial handoff artifact, trial day-one readiness handoff, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer go-live readiness review using only this document + the referenced FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md + FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-Guided-Setup / pre-live readiness review layer for the first paid roofer. It complements (does not replace) the Guided Setup Execution Kit (which produces the filled worksheets and initial go-live checklist) and feeds directly into the Launch System Packet for trial start and day-one operations. It focuses on final confirmation of completeness, language, data protection, blockers, and clean handoff artifacts. Jason (founder/operator) uses this kit after Guided Setup worksheets and handoff artifact are complete to run the readiness review, gate the go-live decision, and hand off into Launch + trial day-one.

This kit file: `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js`

## Scope

- First paid roofer Go-Live Readiness (the first real contractor who will pay after the 14-day trial).
- All stages after Guided Setup completion: setup completeness review, lead source readiness confirmation, response/follow-up readiness, booking/calendar readiness, reporting readiness, trial/payment language confirmation using exact approved strings, data protection/tenant isolation checkpoint, blocker register maintenance, PASS/HOLD/BLOCKED go-live decision gate, setup-to-trial handoff artifact production, trial day-one readiness handoff.
- Internal founder/operator worksheets, decision trees, logs, blocker register, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 15) that must be re-confirmed before every readiness review, decision, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (trial day-one, 14-day trial operating, pre-billing, etc.) and the operator day-one artifacts. References upstream Guided Setup, Demo Close, Prospect Pipeline, and Data Protection/Tenant Isolation packets + Website Trial Direction Regression for context and language enforcement only.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in section 15/16 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, manual readiness review, note-taking, worksheet filling, decision logging, and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live trial ops, first payment, or automation. Those are covered in the Launch System Packet after handoff. This is readiness gating only.
- No customer-facing or public copy may use internal-only language (see section 16). Internal founder/operator/manual/dry-run language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate Guided Setup worksheets/content (see Guided Setup Execution Kit) or full launch operating (see Launch System Packet). It is the explicit go-live gate between them.
- No changes to backend or src directories, Migration files, schema, auth/RLS/security, env, secrets, production routes, or any activation of live systems.

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, customer-facing, handoff artifacts shared with the roofer, trial day-one communications, and any customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 15 and 16.

- Founder-Led Launch Program
- Request Founder-Led Launch Review
- founder review
- manual review
- manual coordination
- Live Automation Disabled
- Monthly billing starts on day 15
- Monthly billing on day 15
- day 15
- 14-day launch trial
- seven-day pilot (or any 7-day pilot variant)
- five-qualified-appointment short-window claim (or 5 qualified appointments)
- book jobs
- booked jobs
- booked-job
- guaranteed appointments
- guaranteed revenue
- guaranteed jobs
- automatic estimate
- automatic quote
- automatic invoice
- automatic payment
- You book the inspection

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for trial direction language enforcement and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md for the tenant isolation checkpoint.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js
scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Guided Setup (primary input source): `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` + its wrapper and verifier (provides filled worksheets, initial go-live readiness checklist, setup-to-launch handoff draft)
- Launch system (primary handoff target): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier (receives go-live decision, setup-to-trial handoff artifact, trial day-one readiness)
- Website trial direction regression (language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Demo + close (upstream): `docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md` + its wrapper and verifier
- Prospect pipeline/tracking base: `docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md, FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md, FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md, and the full suite of first-roofer manual command packets for trial day-one execution detail.
- This kit's wrapper: `scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js`

---

## 1. Internal-only dry-run scope

**Internal-only / founder-operator-only. This entire kit is manual readiness review only.**

- All steps are founder/operator manual review of Guided Setup outputs.
- No live systems, no external calls, no production data access, no automation activation of any kind.
- Use only after Guided Setup Execution Kit has produced filled worksheets and a draft setup-to-launch handoff artifact marked PASS from that kit.
- Copy-paste trackers locally; do not store in production systems.
- Re-confirm every safety item in section 15 before starting review, before decision gate, and before handoff.

## 2. Go-live readiness purpose

**Internal-only / founder-operator-only.**

After Guided Setup is complete, before RoofLeadHQ AI setup goes live:

- Confirm every input from Guided Setup is complete and evidenced.
- Confirm lead sources are ready for manual dry-run handling (format, access path, volume, quality notes captured).
- Confirm response and follow-up preferences are captured with stop rules, escalation, and manual review gates.
- Confirm booking and calendar preferences support manual coordination (no auto-booking expectations).
- Confirm reporting expectations are concrete for manual compilation during trial.
- Re-confirm exact approved trial and payment language with the roofer (or via prior documented confirmation).
- Pass the data protection and tenant isolation checkpoint (cross-ref ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md).
- Surface and clear (or explicitly HOLD) all go-live blockers.
- Produce a definitive PASS/HOLD/BLOCKED go-live decision.
- If PASS, produce the Setup-to-Trial Handoff Artifact and Trial Day-One Readiness Handoff for the Launch System Packet and operator day-one use.

This kit does not start the 14-day trial clock. The 14-day trial begins after RoofLeadHQ AI setup goes live.

## 3. Inputs from Guided Setup

**Internal-only / founder-operator-only. Required inputs before this kit can begin review.**

From `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` outputs:

- Completed Guided Setup Intake Queue entry with PASS status.
- Filled Roofer Business Profile worksheet.
- Filled Lead Source Setup Worksheet (at least primary sources with samples/access).
- Filled Response and Follow-up Preferences worksheet.
- Filled Booking and Calendar Preferences worksheet.
- Filled Reporting Preferences worksheet.
- Setup Blocker Register (any open items must be resolved or explicitly carried as blockers here).
- Go-live Readiness Checklist from Guided Setup (initial self-assessment).
- Setup-to-Launch Handoff Artifact draft (16 fields).
- Evidence: session notes, sample lead exports (sanitized), calendar access confirmation (read-only/manual), reporting contact confirmation.
- Safety guardrails re-confirmation log from end of Guided Setup.

If any critical input is missing, mark this review HOLD immediately and route back to Guided Setup owner with owner/date.

Re-confirm trial terms with roofer if >48h have passed since Guided Setup close: Guided Setup happens first; The 14-day trial begins after RoofLeadHQ AI setup goes live; An automated email is sent 2 days before the first monthly payment; Cancel anytime; No long-term contract.

## 4. Setup completion review checklist

**Internal-only / founder-operator-only. Gate: must be PASS before advancing to lead source review.**

- [ ] Business profile complete (company, owner/contact, service area, services, lead types accepted/rejected, hours, storm policy, contact style, tone, bad-fit scenarios, notes/evidence all populated with source).
- [ ] Lead source worksheet complete (all sources listed with est volume, paid/organic, quality notes, format, required fields, missing-field handling, source owner, access status, manual access notes).
- [ ] Response/follow-up worksheet complete (initial style, urgency, cadence, max attempts, stop conditions, do-not-contact, consent notes, escalation, owner review req, draft approval, manual guardrails).
- [ ] Booking/calendar worksheet complete (inspection goal, windows, travel constraints, same/next-day rules, weather, homeowner info req, contractor confirm req, calendar access, manual handling only confirmed, no auto booking confirmed).
- [ ] Reporting worksheet complete (weekly/monthly expectations, key metrics, lead/appt status cats, missed recovery notes, trial success indicators, reporting contact, cadence, manual notes).
- [ ] Guided Setup go-live checklist from that kit marked PASS with evidence log entry.
- [ ] Setup-to-launch handoff draft from Guided Setup present and all 16 fields populated.
- [ ] All prior Guided Setup blockers either resolved (with date/evidence) or explicitly carried forward into section 11 Go-Live Blocker Register.
- [ ] Decision-maker authority re-confirmed within last 72h or documented in handoff.
- [ ] PASS/HOLD/BLOCKED setup completion status recorded in Setup Completion Review Tracker (section 17 trackers).

Record gate decision + 1-line rationale + timestamp in Go-Live Readiness Queue and Evidence Log.

Re-confirm section 15 Safety Guardrails before advancing.

## 5. Lead source readiness checklist

**Internal-only / founder-operator-only. Gate after setup completion PASS.**

- [ ] At least one primary lead source has concrete format evidence (sanitized sample email/CSV/webhook captured and reviewed).
- [ ] Volume estimate per source recorded and reasonable for trial monitoring (e.g., 10-30/mo total for first roofer).
- [ ] Access path confirmed for manual dry-run: forwarded samples, shared read-only export, CSV drop, or equivalent; no live credentials required for this kit.
- [ ] Missing-field handling rules documented (e.g., flag if no phone; drop vs review).
- [ ] Quality notes captured (dups, low-intent, geo issues, CPL signals).
- [ ] Paid vs organic mix noted for trial reporting baseline.
- [ ] Source owner at roofer business identified for any clarification during trial.
- [ ] No lead source requires live webhook or production integration for go-live (manual ingestion path only for first paid).
- [ ] Data protection boundary confirmed for these sources (cross-ref section 10).
- [ ] PASS/HOLD/BLOCKED lead source readiness status.

HOLD if volume unknown or primary format not evidenced. BLOCKED if no path to see real lead content/format for manual rehearsal.

## 6. Response and follow-up readiness checklist

**Internal-only / founder-operator-only.**

- [ ] Initial response style/tone captured and sample first-message language approved in worksheet.
- [ ] Urgency framing documented (same-day during hours target or equivalent).
- [ ] Follow-up cadence explicit (e.g., touch 2 at +4h, touch 3 at +24h) with max attempts.
- [ ] Stop conditions complete (homeowner reply, books, "stop", no reply after N days, wrong number, opt-out list).
- [ ] Do-not-contact / prior opt-outs list captured or "none provided" recorded.
- [ ] Consent/permission notes present (how consent is obtained or assumed per current process).
- [ ] Escalation triggers clear (storm lead, 3+ unanswered, high-value zip, keyword match).
- [ ] Owner review requirement stated (e.g., first 5 responses manually reviewed by founder/operator during early trial).
- [ ] Drafts for common scenarios captured and approved for manual use during trial.
- [ ] Explicit confirmation: all response/follow-up during setup and 14-day trial remains manual review/coordination only; no live automation.
- [ ] PASS/HOLD/BLOCKED response and follow-up readiness.

## 7. Booking and calendar readiness checklist

**Internal-only / founder-operator-only.**

- [ ] Inspection booking goal for trial recorded (e.g., target X inspections per week from leads).
- [ ] Preferred appointment windows documented (days/times, e.g., M-F 8-5, Sat mornings).
- [ ] Service-area travel constraints captured (max drive time, zip clusters).
- [ ] Same-day/next-day availability rules stated (next-day standard; same-day for hot storm leads; weekend policy).
- [ ] Weather/storm constraints noted (blackout days, adjustment rules).
- [ ] Required homeowner information before proposing slot (full address + phone + rough scope).
- [ ] Contractor/scheduler confirmation requirements stated (manual confirm before "booked" status in dry-run tracking).
- [ ] Calendar access status: read-only link or manual export confirmed; no write access granted or expected for this kit/trial start.
- [ ] Explicit: manual calendar handling only during Guided Setup and 14-day trial; all booking coordination is manual copy into calendar; no API writes, no live Vapi voice booking, no auto events.
- [ ] No calendar automation expectation set with roofer (re-state from Guided Setup script).
- [ ] PASS/HOLD/BLOCKED booking and calendar readiness.

BLOCKED if roofer insists on live auto-booking before explicit founder approval separate from this kit.

## 8. Reporting readiness checklist

**Internal-only / founder-operator-only.**

- [ ] Weekly report expectations concrete (metrics, format, delivery method during trial — manual email or shared doc).
- [ ] Monthly report expectations concrete (conversion summary, source performance, trial outcome view).
- [ ] Key metrics the roofer cares about listed (leads handled, avg response time, follow-ups sent, appointments proposed, missed-lead recovery count, homeowner reply rate, etc.).
- [ ] Lead status categories defined (new, responded, follow-up 1/2, qualified, booked, dead, wrong number...).
- [ ] Appointment status categories defined (proposed, confirmed, completed, no-show, rescheduled, cancelled).
- [ ] Missed-lead recovery notes captured (how recovered leads are flagged in manual reports).
- [ ] Trial success indicators recorded (e.g., 6+ booked inspections in 14d + positive feedback; or whatever the roofer stated).
- [ ] Reporting contact(s) confirmed (email(s) for manual reports).
- [ ] Reporting cadence agreed (weekly on X day EOD; monthly summary on Y).
- [ ] Explicit: all reports will be manually compiled from local notes/session logs during trial; no automated dashboard or production reporting yet.
- [ ] PASS/HOLD/BLOCKED reporting readiness.

## 9. Trial/payment language confirmation

**Customer-facing language confirmation only. Use exact approved strings. Internal notes labeled.**

Required affirmative confirmation (from Guided Setup or re-confirmed here):

- [ ] "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery." — confirmed understood.
- [ ] "Guided Setup happens first." — confirmed.
- [ ] "The 14-day trial begins after RoofLeadHQ AI setup goes live." — confirmed (trial clock does not start on yes/close or Guided Setup session).
- [ ] "An automated email is sent 2 days before the first monthly payment." — confirmed.
- [ ] "Cancel anytime." — confirmed.
- [ ] "No long-term contract." — confirmed.

Evidence: verbatim quote from roofer or prior Guided Setup evidence log reference. If any pushback or deviation requested, HOLD or BLOCKED per section 12.

Update Trial Payment Language Confirmation Tracker.

## 10. Data protection and tenant isolation checkpoint

**Internal-only / founder-operator-only. Cross-reference required packets. Gate: must be PASS.**

- [ ] Reviewed ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md tenant isolation principles and placement plan for first roofer (lead data boundary, least-privilege manual handling, audit notes, no cross-tenant exposure).
- [ ] Reviewed WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for current approved trial direction language (no regression to day-15, 7-day pilot, guarantees, founder babysitting in any customer-facing material).
- [ ] Lead data for this roofer will be handled under manual dry-run controls only (sanitized samples, local notes, no production Supabase tenant writes).
- [ ] No unresolved privacy/red-flag concerns on lead handling, homeowner contact info storage, or manual follow-up process.
- [ ] Tenant isolation assumption for first paid roofer: single-tenant manual ops; no shared dashboard exposure; no production contractor portal; data stays in founder/operator local artifacts until separate explicit approval for broader isolation implementation.
- [ ] Data protection checkpoint sign-off recorded (operator + date + packet version ref).
- [ ] PASS/HOLD/BLOCKED data protection checkpoint.

BLOCKED if any unresolved tenant/lead boundary concern or data protection red flag from the referenced packets.

## 11. Go-live blocker register

**Internal-only / founder-operator-only. Maintain live during readiness review. Every item triggers explicit gate.**

Use PASS / HOLD / BLOCKED rules. Update at every review step and before go-live gate. Copy from Guided Setup blocker register + surface new items.

### PASS / HOLD / BLOCKED Rules (enforced)

- Setup completion incomplete: HOLD until all 5 worksheets + handoff draft PASS from Guided Setup; BLOCKED if critical fields (lead access, stop conditions, manual-only confirmation) remain missing after re-work.
- Lead source format not evidenced: HOLD; BLOCKED for go-live if no sample/format path for manual rehearsal.
- Lead access path unclear: BLOCKED for go-live (must have repeatable manual ingestion path).
- Response/follow-up stop rules or escalation unclear: HOLD (risk of over-contact without clear manual stop).
- Booking/calendar manual-only not explicitly confirmed: HOLD; BLOCKED if auto-booking expectation persists.
- Reporting contact or success indicators missing: HOLD (minor; defaults ok if other areas PASS).
- Trial/payment language not re-confirmed or roofer pushes back on "setup first" or pre-payment email framing: HOLD then BLOCKED if unresolved.
- Data protection/tenant isolation checkpoint unresolved: BLOCKED (cross-ref ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md).
- Guarantee-seeking or booked-jobs / auto-estimate / auto-quote expectation surfaced: BLOCKED (re-state allowed language only; if persists, no-go).
- Wants live automation before explicit separate approval: BLOCKED (this kit and Guided Setup are configuration/manual review only; live behavior requires go-live gate + separate founder approval for any activation).
- Unresolved prior Guided Setup blocker carried forward without owner/date: HOLD until resolved or explicitly accepted.
- No decision-maker available for final go-live confirm: HOLD.

Record every blocker with date, owner, due, evidence, resolution plan. Re-evaluate at go-live decision gate (section 12).

## 12. PASS/HOLD/BLOCKED go-live decision gate

**Internal-only / founder-operator-only. Final gate before handoff to Launch System Packet for trial start. All prior sections must support PASS. This is manual readiness review only.**

### Go-Live Decision Criteria (all must be true for PASS)

- Setup Completion Review: PASS with evidence.
- Lead Source Readiness: PASS (format evidenced, access path for manual, volume noted).
- Response and Follow-Up Readiness: PASS (complete prefs + stop rules + manual review plan).
- Booking and Calendar Readiness: PASS (windows/rules captured + explicit manual-only + no auto expectation).
- Reporting Readiness: PASS (metrics + cadence + contact + manual compile confirmed).
- Trial/Payment Language Confirmation: PASS (verbatim or affirmative quote matching all 6 exact approved strings).
- Data Protection and Tenant Isolation Checkpoint: PASS (refs to ROOFER_DATA_PROTECTION... and WEBSITE_TRIAL... logged; no red flags).
- Go-Live Blocker Register: no OPEN BLOCKED items; any HOLD items have owner + due date < 48h and documented acceptance by decision-maker.
- All safety guardrails (section 15) re-read and logged within last 24h.
- Aggregate verifiers (this kit + guided setup + launch + pilot + quality gate) all green.
- No production automation enabled or scheduled (re-confirm all guardrails).
- Go-live target window recorded (date/time for "setup goes live" moment; trial day 1 = that date).

### Decision

Status: [ ] PASS (go-live approved; proceed to handoff) [ ] HOLD (gaps with owners/dates; re-review after clear) [ ] BLOCKED (no-go; route to Launch no-go path or re-work)

Evidence Log entry required with:
- Timestamp
- Operator/founder
- Verifier run outputs (paste key PASS lines)
- Safety guardrails re-confirmation quote
- Decision-maker final ack quote or ref (if separate confirm)
- Full blocker register snapshot at gate time
- Link/reference to filled Guided Setup worksheets + handoff draft + this kit trackers
- Go-live target date/time window

Only PASS advances to handoff (section 13). HOLD or BLOCKED stops here; update Launch System Packet queue and prospect tracker accordingly. Re-confirm safety before any handoff.

## 13. Setup-to-trial handoff artifact

**Internal-only. Required fields to hand off into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (Go-Live Readiness / Trial Day-One sections) and operator day-one command center.**

Copy the filled summary into the Launch System Packet evidence log / go-live section and trial day-one handoff note. Update upstream tracker if any. This is the definitive post-Guided-Setup / pre-live artifact.

- Roofer/company/contact: [Company, Owner Name, Phone, Email, Primary contact channel]
- Close/Setup decision reference: [Date + reference to Demo Close Execution Kit + Guided Setup Execution Kit session/hand off]
- Trial terms confirmed: [Verbatim or "Confirmed all six: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."]
- Setup completion status from Guided Setup: [PASS / HOLD with gaps / BLOCKED]
- Go-live readiness status from this kit: [PASS / HOLD / BLOCKED + 1-line rationale]
- Lead source summary: [List of sources + monthly vol est + format/access status + quality notes + sample evidence ref]
- Response/follow-up preferences summary: [Tone, cadence, max attempts, stop conditions, escalation triggers, owner review plan]
- Booking/calendar preferences summary: [Windows, travel/weather constraints, confirmation rules, manual-only status confirmed]
- Reporting preferences summary: [Metrics, cadence, reporting contact, manual compile note]
- Data protection checkpoint: [Passed per ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md refs; single-tenant manual controls only]
- Open blockers at gate: [List from section 11 with owners/dates; empty if PASS]
- Go-live assumptions: [Manual review window secured for 14d trial; samples re-confirmed day-of; decision maker available for any clarification; no live automation]
- Go-live target window: [YYYY-MM-DD HH:MM approx when "setup goes live" and trial day 1 begins]
- Next action owner/date: [Who owns next step (e.g. perform go-live flip in Launch Packet, start trial day-one tracking, compile first manual report); target date]
- Evidence log references: [Guided Setup session notes, all 5 worksheets, Guided Setup blocker register, this kit's 9 trackers at gate time, safety re-confirm log, prior demo close ref]
- Verifier timestamps: [This kit verifier + guided setup verifier + pilot + quality gate run times]

Internal only: Do not hand off on HOLD or BLOCKED. Handoff only on confirmed PASS + all critical fields populated with evidence + safety guardrails re-initialed. After handoff, mark all queues "HANDED OFF TO LAUNCH / TRIAL DAY-ONE — [date]". Re-confirm safety guardrails at handoff.

## 14. Trial day-one readiness handoff

**Internal-only. Bridge from this kit into Launch System Packet section 6 (14-Day Trial Operating Checklist) + FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and related operator day-one packets.**

- Confirm operator has: Launch System Packet, this handoff artifact, Guided Setup worksheets, current prospect tracker entry, data protection notes.
- Confirm trial day count starts on go-live date (Day 1 = setup goes live date).
- Confirm manual daily rhythm prepared: morning lead review, mid-day manual execution per command packets, EOD outcome logging + internal report snapshot.
- Confirm manual contractor update cadence matches reporting preferences (weekly or as agreed).
- Confirm first manual report target date (e.g., end of week 1).
- Confirm pre-billing email draft rehearsal window (target ~trial day 12-13 per Launch Packet).
- Confirm no-go / cancel path reviewed (Launch Packet section 9).
- Confirm aggregate verifier green at handoff time.
- Record: handoff timestamp, recipient operator/founder, artifact locations, safety initials.

This hands off execution of the 14-day trial to the Launch System Packet and day-one command artifacts. This kit ends here.

## 15. Safety guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before readiness review start, before go-live decision, before handoff. All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer go-live readiness and trial start unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only setup preparation: YES (this kit produces readiness review checklists, trackers, and handoff artifacts only)
- Draft-only readiness notes: YES (all reviews captured as internal drafts for configuration planning)
- No live send: YES (no Twilio, Resend, or any production message dispatch)
- No automated follow-up: YES
- No CRM automation: YES
- No calendar booking automation: YES (explicit manual handling only)
- No payment automation: YES
- No external service calls: YES (no Twilio, Vapi, Resend, Lindy, Stripe, Google Calendar API writes, or any live integrations)
- No production Supabase writes: YES
- No public route activation: YES
- No contractor portal exposure: YES
- No auth/RLS/security implementation: YES (zero schema, zero policies, zero secrets, zero auth code)
- No estimates, quotes, invoices, or payment workflows: YES (this kit never touches or claims any of these)
- No guarantee language: YES (all customer-facing text and internal decisions enforce this)
- No booked-jobs language: YES (customer-facing uses only "booked homeowner appointments" via the defined flow; never "book jobs" or "you book the inspection")
- Live homeowner SMS / Twilio sending: DISABLED
- Live roofer reply SMS: DISABLED
- Live Vapi outbound or inbound voice automation: DISABLED (test-only dry-run payloads and ingestion scripts only)
- Live Calendar booking / event creation for homeowners or contractors: DISABLED
- Live Resend production email sends (beyond any pre-approved internal test templates): DISABLED
- Live Lindy or external agent triggers: DISABLED
- Cron / scheduler / dispatcher production runs: DISABLED
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED
- Production data mutation of any roofer, lead, or customer records: DISABLED
- Public route activation (webhooks, APIs, status pages exposed beyond internal dashboard): DISABLED
- Contractor portal or dashboard exposure to real paying customers (read-only internal demo dashboards only): DISABLED
- Auth / RLS / security policy implementation or changes: NONE (this kit contains zero schema, zero policies, zero secrets handling code)
- Payment automation (billing engine, invoice generation, or first-month payment collection automation): NONE (manual handoff checklists only)
- Any public marketing or customer contract language claiming automatic booking, guaranteed results, or "monthly billing day-15 phrasing" without the required 14-day trial + automated pre-billing email framing: FORBIDDEN (enforced by verifiers on all public assets and this kit's customer-facing sections)
- Estimate/quote/invoice automation: NONE (this kit never claims or touches these)
- No estimates, quotes, invoices, or payment workflows
- No guarantee language
- No booked-jobs language

### Required Safety Markers (Must Appear in This Kit and All Related Artifacts)

- Planning-only / dry-run / internal-only / founder-operator-only: yes
- Auth changed: no
- Database schema changed: no
- Migration added: no
- RLS policy changed: no
- Production access logic changed: no
- Contractor portal permission changed: no
- Secrets changed: no
- Production data touched: no
- External service called (live): no
- Live workflow activation activated: no
- Contractor notification sent (production): no
- Homeowner notification sent (production): no
- Calendar booking performed: no
- Estimate created: no
- Quote generated: no
- Invoice created: no
- Payment collected or automated: no
- Live SMS sent: no
- Public demo or marketing asset updated with this kit's internal language: no (customer-facing sections use only approved public strings)
- References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md for language and tenant checkpoint enforcement.
- Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none (this kit is docs/scripts/verifier only; asserts no forbidden implementation files changed).

Re-confirm by logging "Safety guardrails re-read and all OFF at [timestamp] before [action]" in Evidence Log before every readiness review, decision, or handoff.

## 16. Public-vs-internal language boundary

**Customer-facing readiness confirmation language (trial language re-confirm, any email or note that could reach the paying roofer, handoff artifacts that may be shared with them, trial day-one communications) must not use founder-led/manual babysitting/public founder-review framing.**

Customer-facing readiness confirmation language must not use founder-led/manual babysitting/public founder-review framing.

Allowed customer-facing / public strings (must appear in all such sections; exact required):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime.
- No long-term contract.

Internal founder/operator/manual review language (founder review, manual review, manual coordination, Live Automation Disabled notes, rehearsal details, command packet references, dry-run workspace notes, operator runbooks, session notes, approval checklists, "Jason will babysit", etc.) may remain in dry-run safety artifacts, internal packets, this kit's internal-only labeled sections, context docs, verifier index, and daily guide — but EVERY such artifact must explicitly state it is internal-only / dry-run / founder-operator-only and NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into website/index.html or outward-facing scripts.

This kit clearly labels internal-only sections (headers and callouts). Verifier enforces that forbidden phrases are absent from all customer-facing template sections.

### Explicitly Labeled Internal-Only Sections in This Kit

- Section 1 Internal-only dry-run scope (full)
- Section 2 Go-live readiness purpose (full)
- Section 3 Inputs from Guided Setup (full)
- Section 4 Setup completion review checklist (full)
- Section 5 Lead source readiness checklist (full)
- Section 6 Response and follow-up readiness checklist (full)
- Section 7 Booking and calendar readiness checklist (full)
- Section 8 Reporting readiness checklist (full)
- Section 10 Data protection and tenant isolation checkpoint (full)
- Section 11 Go-live blocker register (full)
- Section 12 PASS/HOLD/BLOCKED go-live decision gate (full)
- Section 13 Setup-to-trial handoff artifact (full)
- Section 14 Trial day-one readiness handoff (full)
- Section 15 Safety guardrails (full)
- All 9 Manual Tracker Templates (section 17; all contain internal data only)
- All "Internal only:" callouts and Evidence Log instructions

Customer-facing sections (section 9 trial/payment language confirmation spoken/written form, and any direct quotes or handoff excerpts to the roofer) use only the allowed public language.

*End of First Paid Roofer Go-Live Readiness Execution Kit. Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind. The 14-day trial begins after RoofLeadHQ AI setup goes live.*

---

## 17. Manual Tracker Templates

**Copy-paste-ready tables. Use in local spreadsheet, notes app, or printed. 9 tables as required. Update at every gate. Internal-only data. Columns emphasize owner/status/evidence/next-action.**

### Setup Completion Review Tracker
```
| Date | Company | Item Reviewed | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | All 5 Guided Setup worksheets + handoff draft | J (op) + John | PASS | Guided Setup session 2026-06-11 notes + worksheets v1 + handoff draft | Record in this tracker + proceed to lead source | 2026-06-12 |
| 2026-06-12 | ABC Roofing | Business profile complete | John | PASS | Filled worksheet + website screenshot | None | N/A |
```

### Lead Source Readiness Tracker
```
| Date | Company | Lead Source | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | Google LSA | John | PASS | Sanitized sample email 2026-06-11; format name/phone/zip/msg; vol est 15/mo | None | N/A |
| 2026-06-12 | ABC Roofing | Angi | John | PASS | CSV sample captured; mixed quality noted; manual forward path | None | N/A |
```

### Response Follow-Up Readiness Tracker
```
| Date | Company | Preference Area | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | Stop conditions + escalation | J (op) | PASS | Worksheet: stop on reply/book/stop/7d no reply; storm lead + 3+ touches escalate | None | N/A |
| 2026-06-12 | ABC Roofing | Owner review plan | J (op) + John | PASS | First 5 responses manual review by founder/operator | Document in trial day-one handoff | 2026-06-13 |
```

### Booking Calendar Readiness Tracker
```
| Date | Company | Calendar Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | Manual handling confirmation | J (op) | PASS | Worksheet: "manual add only; no live auto events"; Google read-only offered | None | N/A |
| 2026-06-12 | ABC Roofing | Windows + constraints | John | PASS | M-F 9-4 Sat 9-12; 35min max; next-day standard; weather blackout | Confirm weekend policy if needed | 2026-06-13 |
```

### Reporting Readiness Tracker
```
| Date | Company | Reporting Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|----------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | Metrics + cadence + contact | J (op) + john@abc.com | PASS | Weekly: leads handled + booked + reply time + recovery; Fri EOD manual email | None | N/A |
| 2026-06-12 | ABC Roofing | Trial success indicators | John | PASS | 6+ booked inspections in 14d + positive feedback | Include in first manual report | 2026-06-19 |
```

### Trial Payment Language Confirmation Tracker
```
| Date | Company | Approved Phrase | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery | John | PASS | Guided Setup notes 2026-06-11 + re-confirm "yes that is what we discussed" | None | N/A |
| 2026-06-12 | ABC Roofing | Guided Setup happens first | John | PASS | Verbatim in session notes | None | N/A |
| 2026-06-12 | ABC Roofing | The 14-day trial begins after RoofLeadHQ AI setup goes live | John | PASS | Verbatim + "clock does not start until live" | None | N/A |
| 2026-06-12 | ABC Roofing | An automated email is sent 2 days before the first monthly payment | John | PASS | "yes the 2-day notice email" | None | N/A |
| 2026-06-12 | ABC Roofing | Cancel anytime | John | PASS | Confirmed | None | N/A |
| 2026-06-12 | ABC Roofing | No long-term contract | John | PASS | Confirmed | None | N/A |
```

### Data Protection Checkpoint Tracker
```
| Date | Company | Checkpoint Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md review + single-tenant manual controls | J (op) | PASS | Packet v baseline read; notes: leads in local sanitized artifacts only | Log in handoff | N/A |
| 2026-06-12 | ABC Roofing | WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md language alignment | J (op) | PASS | Approved strings only; no day-15 / 7d pilot / guarantees in any customer material | None | N/A |
| 2026-06-12 | ABC Roofing | No unresolved privacy / lead boundary red flags | J (op) | PASS | Samples sanitized; manual notes only; no prod tenant writes | None | N/A |
```

### Go-Live Blocker Register
```
| Date | Company | Blocker Category | Description | Rule Triggered | Owner | Due Date | Status | Evidence | Resolution / Next |
|------|---------|------------------|-------------|----------------|-------|----------|--------|----------|-------------------|
| 2026-06-12 | ABC Roofing | None | All readiness areas PASS; data prot checkpoint passed; language confirmed | N/A | J (op) | N/A | RESOLVED | All 9 trackers + Guided Setup outputs + verifiers | Proceed to PASS gate + handoff |
| 2026-06-11 | ABC Roofing | (carried from Guided) | Angi sample format | Lead source format not evidenced | John | 2026-06-11 EOD | RESOLVED | CSV received 2026-06-11 | Resolved pre this review |
```

### Setup-to-Trial Handoff Tracker
```
| Date | Company | Handoff Field | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-12 | ABC Roofing | Go-live readiness status | J (op) | PASS | This kit gate log + all prior trackers | Insert into Launch System Packet section 5/6 + day-one command center | 2026-06-12 EOD |
| 2026-06-12 | ABC Roofing | Trial day-one readiness handoff | J (op) + operator on Launch | PASS | 14 fields populated in artifact + safety initials + verifier timestamps | Update Launch Packet evidence log + prospect tracker status | 2026-06-12 |
| 2026-06-12 | ABC Roofing | Verifiers green at gate | J (op) | PASS | This kit + guided + pilot + quality gate + build all PASS | Record timestamps in handoff artifact | 2026-06-12 |
```

---

**Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.**
