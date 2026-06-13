# First Paid Roofer Trial Day-One Operating Kit

Date: 2026-06-13

## Purpose

This is the practical manual operating system Jason (founder/operator) can use on Trial Day One after Go-Live Readiness has passed (from the First Paid Roofer Go-Live Readiness Execution Kit) and after RoofLeadHQ AI setup goes live. The kit guides manual day-one monitoring, first lead handling, response/follow-up review, booked homeowner appointment readiness, missed-lead recovery review, blocker handling, daily reporting, trial health status, and handoff into ongoing 14-day trial operations.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, and evidence logs are internal-only / dry-run / founder-operator-only. This is manual trial day-one operations only, not automation. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this kit.

This kit is product-moving and operationally usable: it contains the concrete trial day-one command center, first lead intake review process, response and follow-up monitoring, missed-lead recovery review, booked homeowner appointment readiness review, contractor/roofer communication readiness, homeowner communication draft-review checklist, day-one blocker and escalation register with explicit PASS/HOLD/BLOCKED rules, trial health PASS/HOLD/BLOCKED gate, day-one reporting snapshot, end-of-day handoff into 14-day trial operations, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer trial day-one operations using only this document + the referenced FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md + FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md + FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-go-live / trial-day-one manual operations layer for the first paid roofer. It receives the handoff from Go-Live Readiness Execution Kit (via Launch System Packet), operates alongside FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md for execution detail, and hands off into ongoing 14-day trial operations documented in the Launch System Packet. It focuses on manual day-one monitoring and review only. Jason (founder/operator) uses this kit on the first calendar day after "RoofLeadHQ AI setup goes live" to run the day-one rhythm, confirm trial health, and produce the end-of-day handoff.

This kit file: `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js`

## Scope

- First paid roofer Trial Day One (the first real contractor who will pay after the 14-day trial).
- All manual operations on the calendar day that RoofLeadHQ AI setup goes live (trial Day 1): command center setup, first lead intake review, response/follow-up monitoring (drafts only), missed-lead recovery review, booked homeowner appointment readiness review, contractor/roofer communication readiness, homeowner draft review, blocker/escalation handling, trial health gate, day-one reporting snapshot, end-of-day handoff into 14-day trial ops.
- Internal founder/operator worksheets, decision trees, logs, blocker register, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 15) that must be re-confirmed before every day-one review step, gate, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (14-day trial operating sections) and ongoing trial rhythm. References upstream Go-Live Readiness, Guided Setup, Launch System, First Roofer Day-One Command Center, Lead-to-Inspection Ops Pack, Website Trial Direction Regression, and Data Protection/Tenant Isolation packets for context, language enforcement, and checkpoint only.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in sections 15/16 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, note-taking, worksheet filling, decision logging, draft preparation (never sent), and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live trial automation, first payment, or production behavior. Those remain covered in the Launch System Packet. This is manual day-one operations gating and handoff only.
- No customer-facing or public copy may use internal-only language (see section 16). Internal founder/operator/manual/dry-run language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate Go-Live Readiness content, Guided Setup worksheets, full Launch System operating, or the full First Roofer Day-One Command Center / Lead-to-Inspection Ops Pack (it complements them for the paid trial day-one layer).
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

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). References FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md for preconditions, FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md for execution detail patterns, WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for trial direction language enforcement, and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md for the tenant isolation checkpoint. Cross-references Guided Setup and Launch System packets.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js
scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Go-Live Readiness (primary input / precondition source): `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md` + its wrapper and verifier (provides PASS go-live decision, setup-to-trial handoff artifact, trial day-one readiness handoff, safety log)
- Guided Setup (upstream source): `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` + its wrapper and verifier (worksheets and setup confirmation referenced in day-one context)
- Launch system (primary handoff target + ongoing 14-day trial container): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier (receives day-one report snapshot + end-of-day handoff; contains the 14-day trial operating checklist)
- First Roofer Day-One Command Center (execution detail complement): `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md` + its wrapper and verifier (triage board, lead-to-inspection detail, appointment readiness worksheets for manual use)
- Lead-to-Inspection Ops Pack (workflow complement): `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md` + its wrapper and verifier (lead completeness, missing-info recovery, communication prep, inspection/appointment readiness patterns)
- Website trial direction regression (language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md, FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md, and the full suite of first-roofer manual command packets for execution detail during trial.
- This kit's wrapper: `scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js`

---

## 1. Internal-only dry-run scope

**Internal-only / founder-operator-only. This entire kit is manual trial day-one operations review and coordination only.**

- All steps are founder/operator manual review, monitoring, draft preparation, decision logging, and handoff on Trial Day One only.
- No live systems, no external calls, no production data access, no automation activation of any kind. All communication drafts remain local/internal; nothing is sent from this kit.
- Use only after Go-Live Readiness Execution Kit has produced a confirmed PASS decision + setup-to-trial handoff artifact + trial day-one readiness handoff, and after the explicit "RoofLeadHQ AI setup goes live" moment has occurred (trial clock starts on that calendar day).
- Copy-paste trackers locally; do not store in production systems. All lead data handled as sanitized notes or local copies only.
- Re-confirm every safety item in section 15 before starting day-one work, before any gate, and before end-of-day handoff.
- This kit operates in parallel with FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md for detailed lead handling worksheets; it provides the paid-trial day-one overlay and health gate.

## 2. Trial day-one purpose

**Internal-only / founder-operator-only.**

On the first calendar day after RoofLeadHQ AI setup goes live (trial Day 1):

- Establish the manual day-one command center using the handoff artifact from Go-Live Readiness.
- Perform first lead intake review on any leads that arrived post go-live (or sample/fixture leads for rehearsal).
- Monitor and review response/follow-up drafts prepared for manual use (never sent by this kit).
- Review missed-lead recovery candidates surfaced from intake or prior day notes.
- Review booked homeowner appointment readiness (manual coordination status only).
- Confirm contractor/roofer communication readiness (manual update channel and timing).
- Run homeowner communication draft-review checklist on any prepared language.
- Maintain day-one blocker and escalation register with explicit owner/due.
- Execute the trial health PASS/HOLD/BLOCKED gate at key points and EOD.
- Produce the day-one reporting snapshot (manual compilation from local logs).
- Execute end-of-day handoff into ongoing 14-day trial operations (Launch System Packet).

This kit does not advance the trial clock or trigger billing. The 14-day trial began on the go-live date. All manual activity here confirms the operating rhythm is working on Day One and surfaces any early blockers before they compound.

Trial Day 1 = the calendar date when "RoofLeadHQ AI setup goes live" (per Go-Live Readiness handoff target window).

## 3. Preconditions from Go-Live Readiness

**Internal-only / founder-operator-only. Required before this kit can be used on Trial Day One.**

From `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md` outputs (plus Launch System Packet):

- Confirmed PASS go-live decision gate with evidence log entry.
- Setup-to-Trial Handoff Artifact (all 16+ fields populated: roofer/contact, trial terms verbatim using the 6 exact approved strings, lead source summary, response/follow-up prefs, booking prefs, reporting prefs, data protection checkpoint refs, open blockers (none for PASS), go-live target window, evidence refs, verifier timestamps).
- Trial Day-One Readiness Handoff (operator has Launch System Packet + handoff artifact + Guided Setup worksheets + prospect tracker entry + data protection notes).
- Safety guardrails re-confirmation log from go-live gate (within last 24-48h).
- Go-live target date/time window recorded; Day 1 = that date.
- Aggregate verifiers (go-live kit + guided + launch + pilot + quality gate) all green at handoff.
- Explicit confirmation in handoff: manual review window secured for 14d trial; samples re-confirmed day-of; decision maker available; no live automation.

If any critical precondition is missing or the go-live decision was not PASS, mark this kit HOLD immediately and route back to Go-Live Readiness owner + Launch System Packet with owner/date. Re-confirm trial terms with roofer if >48h have passed: use only the exact approved public strings listed in section 2.

Cross-reference: Go-Live Readiness sections 12-14 and Launch System Packet 14-day trial operating checklist.

## 4. Trial day-one command center

**Internal-only / founder-operator-only. Start-of-day gate: must be PASS before advancing to lead intake.**

Establish the manual command center on Trial Day One using the Go-Live handoff artifact + references to FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md.

- [ ] Go-Live Readiness PASS handoff artifact + Launch System Packet + Guided Setup worksheets physically or digitally available.
- [ ] FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md reviewed for execution detail (triage board columns, lead completeness checklist, missing-info queue, communication prep, inspection/appointment readiness worksheets).
- [ ] Local scratch space / printed trackers / notes app ready for day-one entries (copy-paste the 9 tables from section 17).
- [ ] Sample or real post-go-live lead data available in sanitized form only (no production access; fixture or forwarded sample for rehearsal).
- [ ] Current time window confirmed inside manual review hours per roofer prefs from Guided Setup / Go-Live handoff.
- [ ] Trial health initial status: PASS (provisional) / HOLD / BLOCKED recorded in Trial Day-One Command Center Tracker.
- [ ] All section 15 Safety Guardrails re-read and logged "Safety guardrails re-read and all OFF at [timestamp] before Trial Day One command center start".
- [ ] Data protection / tenant isolation checkpoint re-confirmed (single-tenant manual controls only; refs to WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md logged).
- [ ] No production credentials, live tokens, or external service clients visible or used.
- [ ] Explicit: everything today is manual review, manual draft prep, manual logging only. No sends, no writes, no external calls.

Record gate decision + 1-line rationale + timestamp in Trial Day-One Command Center Tracker.

Re-confirm section 15 Safety Guardrails before advancing to first lead intake.

## 5. First lead intake review

**Internal-only / founder-operator-only. Gate after command center PASS.**

For every lead that has arrived since go-live (or rehearsal samples):

- Apply lead completeness checklist (expanded from FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md): Lead ID, homeowner name, property address, lead source + detail, service type, urgency, roof age/damage, photos status, insurance, contact permission, consent flags.
- Confirm lead is within roofer service area and accepted lead types per Guided Setup / Go-Live handoff.
- Confirm no do-not-contact or prior opt-out match (per response prefs).
- Flag missing fields explicitly; route to missing-info recovery path (section 7) if needed.
- Capture initial urgency and storm vs standard classification.
- Record source volume signal (first-of-day, expected vs surprise).
- Confirm data boundary: lead details captured only in local sanitized notes / trackers; no production tenant write.
- PASS/HOLD/BLOCKED per lead in First Lead Intake Review Tracker.

HOLD if critical fields (phone, address, source) missing with no recovery path. BLOCKED if consent/red-flag or tenant boundary violation.

Update the Trial Day-One Command Center Tracker with aggregate intake count and status.

## 6. Response and follow-up monitoring

**Internal-only / founder-operator-only.**

Review any response or follow-up language prepared for manual use on Day One leads (drafts only; this kit never sends):

- Confirm drafts match tone, urgency, and approved language from Guided Setup response/follow-up worksheet (captured in Go-Live handoff).
- Verify stop conditions are stated or implied in draft context (reply, book, stop, opt-out).
- Confirm escalation triggers noted (storm, 3+ prior touches, high-value, keyword).
- Confirm owner review / draft approval status per early-trial plan (e.g., first N responses reviewed by founder/operator).
- Confirm no guarantee, booked-jobs, auto-estimate, or forbidden phrasing slipped into drafts.
- Confirm all drafts are labeled "DRAFT — MANUAL USE ONLY — NOT SENT BY SYSTEM".
- Log review outcome (approved for manual use outside system / needs revision / HOLD) in Response Follow-Up Monitoring Tracker.
- Re-state explicitly: all response/follow-up on Trial Day One and during 14-day trial remains manual review/coordination only; no live automation.

PASS/HOLD/BLOCKED response and follow-up monitoring status per lead or batch.

## 7. Missed-lead recovery review

**Internal-only / founder-operator-only.**

Review any leads flagged as missed, stalled, or requiring recovery on Day One:

- Confirm recovery candidates surfaced from intake review or prior-day carry-forward in Launch System / Go-Live notes.
- Apply missing-information recovery checklist (from FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md patterns + Launch missing-information recovery packet reference): identify exact gaps, decide manual recovery action (e.g., manual clarification call prep, source owner ping, re-contact via allowed channel).
- Confirm consent/safety boundary still holds for recovery attempt.
- Confirm no production system or live send is used or expected for recovery on Day One.
- Log each recovery item with owner, due, evidence, planned manual next step in Missed-Lead Recovery Tracker.
- Escalate to Day-One Blocker Register if recovery path unclear or blocked.

PASS/HOLD/BLOCKED missed-lead recovery status. BLOCKED if recovery would require live automation or violate data boundary.

## 8. Booked homeowner appointment readiness review

**Internal-only / founder-operator-only.**

For leads that have advanced to appointment proposal stage on Day One:

- Confirm inspection goal and windows match roofer prefs from Go-Live handoff (M-F hours, travel max, next-day standard, weather policy).
- Confirm required homeowner info captured before proposing slot (full address + phone + rough scope).
- Confirm contractor/scheduler confirmation path is manual only (read-only calendar view or manual export; no write access or auto events).
- Confirm no auto-booking or "You book the inspection" expectation was set with roofer (re-state from approved public language: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery).
- Confirm manual coordination steps logged (proposed slot, homeowner reply captured, contractor confirm step).
- Confirm appointment status categories used: proposed, confirmed, completed, no-show, etc. (manual only).
- Record readiness decision + evidence in Booked Homeowner Appointment Readiness Tracker.
- Explicit: all booking coordination is manual copy into calendar or phone coordination; no API writes, no live Vapi voice booking, no auto events on Day One or during trial.

BLOCKED if roofer expectation for live auto-booking surfaced on Day One without separate explicit founder approval outside this kit.

## 9. Contractor/roofer communication readiness

**Internal-only / founder-operator-only.**

Confirm manual communication channel and cadence to the paying roofer on Trial Day One:

- Primary contact channel (phone/email/text per Guided Setup prefs) confirmed and tested for manual use.
- Reporting cadence from Go-Live handoff matched (e.g., EOD Day 1 snapshot if agreed, or weekly).
- Manual update format prepared (leads handled, response times, follow-ups, appointments proposed, missed recovery, blockers).
- Decision-maker availability re-confirmed for Day One clarifications.
- No production dashboard or portal exposure to roofer on Day One (read-only internal artifacts only).
- Log status + any ad-hoc manual notes sent (or planned) in Contractor Roofer Communication Tracker.

PASS/HOLD/BLOCKED contractor/roofer communication readiness. HOLD if contact channel unconfirmed for manual use.

## 10. Homeowner communication draft-review checklist

**Internal-only / founder-operator-only.**

For any homeowner communication drafts prepared on Day One (response, follow-up, clarification, appointment proposal, recovery):

- [ ] Matches approved public language: "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery." (used in context only; not over-claimed).
- [ ] Uses only concrete facts from the lead (address, issue, urgency) + roofer service area / windows from setup.
- [ ] Stop / opt-out language or implication present and clear.
- [ ] No guarantee, booked jobs, automatic estimate/quote/invoice/payment, "You book the inspection", or day-15 / 7-day pilot language.
- [ ] Tone matches roofer brand/tone notes from Guided Setup worksheet.
- [ ] Questions to ask homeowner listed (for manual call or reply).
- [ ] Proposed next manual step explicit (e.g., "call to confirm inspection slot availability").
- [ ] Labeled internally: "DRAFT ONLY — PREPARED FOR MANUAL REVIEW/USE OUTSIDE SYSTEM — NOT SENT BY ROOFLEADHQ".
- [ ] Data protection: no unnecessary PII beyond what's needed for manual coordination; notes sanitized where possible.
- [ ] Approval status: DRAFT / APPROVED FOR MANUAL USE / NEEDS REVISION / HOLD.
- [ ] Owner + timestamp recorded.

Update Homeowner Communication Draft Review Tracker for each draft. Any draft failing checklist returns to revision before manual use.

## 11. Day-one blocker and escalation register

**Internal-only / founder-operator-only. Maintain live during Trial Day One. Every item triggers explicit gate.**

Use PASS / HOLD / BLOCKED rules. Update after every major section (intake, response review, missed recovery, appt readiness, comms, drafts) and before trial health gate.

### PASS / HOLD / BLOCKED Rules (enforced)

- Command center or preconditions incomplete: HOLD until Go-Live handoff artifact + safety log + Launch Packet confirmed; BLOCKED if no go-live PASS evidence.
- Lead intake critical fields missing with no recovery path: HOLD (flag in missed recovery); BLOCKED if consent or service-area violation.
- Response/follow-up draft contains forbidden phrasing or violates stop rules: HOLD until revised; BLOCKED if pattern persists.
- Missed-lead recovery requires live send/automation or crosses tenant boundary: BLOCKED.
- Booked homeowner appointment readiness expects auto-booking or contradicts manual-only confirmation from Go-Live: BLOCKED.
- Contractor/roofer communication channel unconfirmed or decision-maker unavailable: HOLD.
- Homeowner draft fails review checklist: HOLD until fixed.
- Data protection / tenant isolation red flag on Day One (e.g., production write suspicion, cross-roofer leak risk): BLOCKED (cross-ref ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md).
- Guarantee-seeking / booked-jobs / auto-estimate / auto-quote / "day 15" language from roofer on Day One: BLOCKED (re-state allowed public strings only).
- Wants live automation activated on Day One: BLOCKED (this kit and prior kits are manual review only; live behavior requires separate explicit founder approval after full trial validation).
- Unresolved prior blocker from Go-Live handoff without owner/due in 24h: HOLD.
- Trial health gate criteria not met at EOD: HOLD or BLOCKED per section 12.

Record every blocker with date, owner, due, evidence, resolution plan, manual next action. Re-evaluate at trial health gate (section 12) and EOD handoff.

## 12. Trial health PASS/HOLD/BLOCKED gate

**Internal-only / founder-operator-only. Key gate on Trial Day One (mid-day and EOD). All prior sections must support the status. This is manual operations review only.**

### Trial Health Decision Criteria (all must be true for PASS on Day One)

- Trial Day-One Command Center: PASS with evidence (preconditions + safety + data protection checkpoint re-confirmed).
- First Lead Intake Review: PASS or HOLD with clear owners/dates (no BLOCKED leads).
- Response and Follow-Up Monitoring: PASS (drafts approved or under revision with plan; no forbidden language).
- Missed-Lead Recovery Review: PASS or HOLD with recovery paths assigned (no BLOCKED recoveries).
- Booked Homeowner Appointment Readiness Review: PASS or HOLD with manual coordination steps logged (no auto-booking expectation).
- Contractor/Roofer Communication Readiness: PASS (channel + cadence confirmed for manual use).
- Homeowner Communication Draft Review: all active drafts PASS checklist or under explicit revision.
- Day-One Blocker Register: no OPEN BLOCKED items; any HOLD items have owner + due date < 24h and documented acceptance by decision-maker.
- All safety guardrails (section 15) re-read and logged within last 12h.
- Aggregate verifiers (this kit + go-live + launch + pilot + quality gate) remain green.
- No production automation enabled or scheduled (re-confirm all guardrails).
- Day-one manual rhythm executed (intake through handoff prep); reporting snapshot prepared.

### Decision

Status: [ ] PASS (Day One healthy; proceed to EOD handoff into 14-day trial ops) [ ] HOLD (gaps with owners/dates; re-review after clear) [ ] BLOCKED (critical issues; escalate per Launch System Packet no-go path)

Evidence Log entry required with:
- Timestamp
- Operator/founder
- Verifier run outputs (paste key PASS lines)
- Safety guardrails re-confirmation quote
- Full blocker register snapshot at gate time
- Lead counts (intake / in review / missed-recovery / appt-proposed / HOLD / BLOCKED)
- Draft review counts
- Link/reference to Go-Live handoff artifact + this kit's 9 trackers + day-one reporting snapshot
- Next manual action owner/date

Only PASS advances to full EOD handoff (section 14). HOLD or BLOCKED requires immediate escalation note into Launch System Packet and prospect tracker. Re-confirm safety before any handoff.

## 13. Day-one reporting snapshot

**Internal-only / founder-operator-only. Manual compilation only. Use local notes + trackers.**

Compile a one-page Day-One Reporting Snapshot for internal use and for manual delivery to roofer per agreed cadence:

- Date / Trial Day: [YYYY-MM-DD — Day 1]
- Roofer / Company: [from Go-Live handoff]
- Leads received since go-live (Day 1 count + source breakdown)
- Leads reviewed (intake complete / completeness %)
- Leads in response/follow-up prep (drafts approved count)
- Missed leads flagged + recovery actions assigned
- Appointments proposed (manual coordination count)
- Appointments confirmed (manual)
- Homeowner replies captured (manual log)
- Avg manual response time (from notes, rough)
- Key issues / quality notes surfaced
- Blockers open (count + top item with owner/due)
- Trial health gate status at snapshot time (PASS/HOLD/BLOCKED)
- Safety / data protection confirmation (re-stated)
- Manual next 24h actions (owner + due)
- Evidence refs: this kit trackers, Go-Live handoff artifact, Launch System Packet entry, sanitized lead notes

Format: simple text or table suitable for manual email or shared doc. No automated dashboard. Update Launch System Packet evidence log with snapshot.

Record snapshot location + timestamp in End-of-Day Trial Handoff Tracker.

## 14. End-of-day handoff into 14-day trial operations

**Internal-only. Bridge from this kit into Launch System Packet 14-day trial operating checklist + ongoing FIRST_ROOFER_DAY_ONE_COMMAND_CENTER / command packet rhythm for remaining trial days.**

- Confirm operator has: Launch System Packet (with day-one snapshot inserted), this handoff artifact, Go-Live handoff + Guided Setup worksheets, current prospect tracker entry, data protection notes, all 9 trackers from this kit.
- Confirm trial day count continues (Day 2 = tomorrow; 14-day trial runs full 14 calendar days from go-live date).
- Confirm manual daily rhythm handed off: morning lead review (per command center), mid-day monitoring, EOD outcome logging + internal snapshot.
- Confirm manual contractor update cadence continues per reporting prefs.
- Confirm first manual report target (e.g., end of week 1) still on track.
- Confirm pre-billing email draft rehearsal window (target ~trial day 12-13 per Launch Packet) noted.
- Confirm no-go / cancel path reviewed (Launch Packet section 9).
- Confirm aggregate verifier green at EOD handoff time.
- Record: handoff timestamp, recipient operator/founder, artifact locations, safety initials, open blockers carried forward with owners/dates.
- Update Launch System Packet evidence log + prospect tracker status with "Trial Day One complete — [PASS/HOLD/BLOCKED] — handoff to ongoing 14-day trial ops".

This hands off execution of the remainder of the 14-day trial to the Launch System Packet and day-one command artifacts. This kit ends here on Day One. Subsequent days use the Launch System 14-day trial operating checklist + command packets with this kit's Day One snapshot as baseline.

## 15. Safety guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before Trial Day One command center start, before trial health gate, before EOD handoff. All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer trial day-one operations unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only trial day-one operations: YES (this kit produces review checklists, trackers, draft reviews, and handoff artifacts only)
- Draft-only readiness notes: YES (all reviews captured as internal drafts for manual coordination planning)
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
- References FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md (preconditions), FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md (execution detail), FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (handoff target).

Re-confirm by logging "Safety guardrails re-read and all OFF at [timestamp] before [action]" in Evidence Log before every command center start, trial health gate, or handoff.

## 16. Public-vs-internal language boundary

**Customer-facing trial day-one communications, any email or note that could reach the paying roofer, handoff artifacts that may be shared with them, and the day-one reporting snapshot must not use founder-led/manual babysitting/public founder-review framing.**

Customer-facing language must not use founder-led/manual babysitting/public founder-review framing.

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
- Section 2 Trial day-one purpose (full)
- Section 3 Preconditions from Go-Live Readiness (full)
- Section 4 Trial day-one command center (full)
- Section 5 First lead intake review (full)
- Section 6 Response and follow-up monitoring (full)
- Section 7 Missed-lead recovery review (full)
- Section 8 Booked homeowner appointment readiness review (full)
- Section 9 Contractor/roofer communication readiness (full)
- Section 10 Homeowner communication draft-review checklist (full)
- Section 11 Day-one blocker and escalation register (full)
- Section 12 Trial health PASS/HOLD/BLOCKED gate (full)
- Section 13 Day-one reporting snapshot (full)
- Section 14 End-of-day handoff into 14-day trial operations (full)
- Section 15 Safety guardrails (full)
- All 9 Manual Tracker Templates (section 17; all contain internal data only)
- All "Internal only:" callouts and Evidence Log instructions

Customer-facing sections (day-one reporting snapshot excerpts shared with roofer, any direct quotes or handoff excerpts to the roofer) use only the allowed public language.

*End of First Paid Roofer Trial Day-One Operating Kit. Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.*

---

## 17. Manual Tracker Templates

**Copy-paste-ready tables. Use in local spreadsheet, notes app, or printed. 9 tables as required. Update at every gate and after every lead batch. Internal-only data. Columns emphasize owner/status/evidence/next-action.**

### Trial Day-One Command Center Tracker
```
| Date | Company | Item Reviewed | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | Go-Live handoff artifact + Launch Packet + safety log | J (op) | PASS | Go-Live kit gate 2026-06-12 + handoff artifact v1 | Record in this tracker + start lead intake | 2026-06-13 |
| 2026-06-13 | ABC Roofing | All 9 trackers ready + sample leads sanitized | J (op) | PASS | Local notes + Go-Live refs + FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md | Proceed to first lead intake | 2026-06-13 |
```

### First Lead Intake Review Tracker
```
| Date | Company | Lead ID / Source | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | L-20260613-001 / Google LSA | J (op) | PASS | Sanitized sample post-go-live; all required fields present; service area match | Route to response review | 2026-06-13 |
| 2026-06-13 | ABC Roofing | L-20260613-002 / Angi | J (op) | HOLD | Phone + zip missing | Flag to Missed-Lead Recovery Tracker | 2026-06-13 EOD |
```

### Response Follow-Up Monitoring Tracker
```
| Date | Company | Lead ID / Draft Type | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|----------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | L-20260613-001 / First response draft | J (op) | PASS | Matches Guided Setup tone; stop conditions noted; no forbidden phrases; labeled DRAFT ONLY | Approved for manual use outside system | 2026-06-13 |
| 2026-06-13 | ABC Roofing | L-20260613-002 / Follow-up 1 | J (op) | HOLD | Escalation trigger unclear | Revise per response prefs worksheet | 2026-06-13 |
```

### Missed-Lead Recovery Tracker
```
| Date | Company | Lead ID / Gap | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | L-20260613-002 / phone + zip | J (op) + source owner | HOLD | Intake flagged; manual clarification path via source owner agreed in Guided Setup | Manual ping source owner for fields; re-ingest | 2026-06-13 EOD |
```

### Booked Homeowner Appointment Readiness Tracker
```
| Date | Company | Lead ID / Appt Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | L-20260613-001 / Windows + manual confirm | J (op) | PASS | M-F 9-4; read-only calendar confirmed; homeowner info complete; manual confirm step logged | Propose slot via manual channel | 2026-06-13 |
```

### Contractor Roofer Communication Tracker
```
| Date | Company | Comms Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | Day 1 manual update channel + cadence | J (op) + john@abc.com | PASS | Primary email confirmed; EOD Day 1 snapshot format agreed in Go-Live handoff | Send manual Day 1 snapshot (if cadence includes it) | 2026-06-13 EOD |
```

### Homeowner Communication Draft Review Tracker
```
| Date | Company | Lead ID / Draft Purpose | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-------------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | L-20260613-001 / Appointment proposal | J (op) | PASS | Concrete facts only; approved public language context; stop/opt-out clear; no guarantees; labeled DRAFT | Approved for manual use | 2026-06-13 |
```

### Day-One Blocker Register
```
| Date | Company | Blocker Category | Description | Rule Triggered | Owner | Due Date | Status | Evidence | Resolution / Next |
|------|---------|------------------|-------------|----------------|-------|----------|--------|----------|-------------------|
| 2026-06-13 | ABC Roofing | None | All day-one areas PASS or HOLD with owners; data prot checkpoint passed; language clean | N/A | J (op) | N/A | RESOLVED | All 9 trackers + Go-Live handoff + verifiers | Proceed to PASS trial health gate + EOD handoff |
| 2026-06-13 | ABC Roofing | (flagged) | Missing phone on L-002 | Lead intake critical fields missing | J (op) | 2026-06-13 EOD | HOLD | Intake tracker entry | Recovery action assigned |
```

### End-of-Day Trial Handoff Tracker
```
| Date | Company | Handoff Field | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-13 | ABC Roofing | Trial health gate at EOD | J (op) | PASS | Section 12 log + all prior trackers + Day 1 reporting snapshot | Insert into Launch System Packet 14-day trial operating + prospect tracker | 2026-06-13 EOD |
| 2026-06-13 | ABC Roofing | Day-one reporting snapshot | J (op) | PASS | 13 fields compiled from local logs + trackers | Hand off to ongoing 14-day trial ops | 2026-06-13 |
| 2026-06-13 | ABC Roofing | Verifiers green at EOD | J (op) | PASS | This kit + go-live + launch + pilot + quality gate + build all PASS | Record timestamps in handoff | 2026-06-13 |
```

---

**Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.**
