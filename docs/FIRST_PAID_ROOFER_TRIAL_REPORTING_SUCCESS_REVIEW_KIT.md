# First Paid Roofer Trial Reporting + Success Review Kit

Date: 2026-06-14

## Purpose

This is the practical manual reporting and success review system Jason (founder/operator) can use during and at the end of the 14-day trial after Trial Day One. The kit guides manual trial reporting, lead/appointment outcome tracking, missed-lead recovery review, booked homeowner appointment tracking, trial health scoring, blocker review, pre-payment email readiness, cancellation/no-go handling, first monthly payment handoff readiness, and success review with the roofer.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, scorecards, and evidence logs are internal-only / dry-run / founder-operator-only. This is manual trial reporting and success review only, not automation. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this kit.

This kit is product-moving and operationally usable: it contains the concrete daily trial reporting rhythm, lead intake and source performance review process, response and follow-up outcome review, missed-lead recovery outcome review, booked homeowner appointment tracking, roofer communication and feedback review, trial health scorecard with explicit scoring, blocker and risk review, pre-payment email readiness checklist, cancellation/no-go handling, first monthly payment handoff readiness, success review call agenda and script, end-of-trial PASS/HOLD/BLOCKED decision gate, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer trial reporting and success review using only this document + the referenced FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md + FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md + FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md + FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the during-trial and end-of-trial manual reporting + success review layer for the first paid roofer. It receives the handoff from Trial Day One Operating Kit (via Launch System Packet), operates alongside the Launch System Packet 14-day trial operating checklist, and produces the end-of-trial decision + first monthly payment handoff readiness or cancellation/no-go. It focuses on manual reporting, outcome tracking, scoring, and success review only. Jason (founder/operator) uses this kit throughout the 14-day trial (daily/periodic reporting rhythm) and at the end (success review call prep, end-of-trial gate, payment handoff or no-go). The 14-day trial clock runs from the go-live date established in Go-Live Readiness and Day One Operating Kit.

This kit file: `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-trial-reporting-success-review-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js`

## Scope

- First paid roofer 14-day trial reporting and end-of-trial success review (the first real contractor who will pay after the 14-day trial).
- All manual operations during the 14 calendar days after "RoofLeadHQ AI setup goes live" (trial Day 1 = go-live date per prior kits) and at the explicit end-of-trial gate (target review window ~Day 12-14): daily trial reporting rhythm, lead intake/source performance review, response and follow-up outcome review, missed-lead recovery outcome review, booked homeowner appointment tracking, roofer communication and feedback review, trial health scoring at key checkpoints (e.g. mid-trial, pre-prepay, end), blocker/risk review, pre-payment email readiness, cancellation/no-go handling, first monthly payment handoff readiness, success review call agenda/script prep, end-of-trial PASS/HOLD/BLOCKED decision gate with handoff to payment or no-go.
- Internal founder/operator worksheets, decision trees, logs, blocker/risk register, scorecards, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 17) that must be re-confirmed before every reporting cycle, scorecard, success review prep, gate, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (14-day trial operating, pre-billing, first payment handoff, cancellation sections) and prospect tracker. References upstream Trial Day One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, First Roofer Day-One Command Center, Lead-to-Inspection Ops Pack, Website Trial Direction Regression, and Data Protection/Tenant Isolation packets for context, language enforcement, and checkpoint only.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in sections 17/18 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, note-taking, worksheet filling, decision logging, draft preparation (never sent), scorecard compilation, and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live trial automation, first payment, or production behavior. Those remain covered in the Launch System Packet. This is manual trial reporting, outcome tracking, success review, and decision gating only.
- No customer-facing or public copy may use internal-only language (see section 18). Internal founder/operator/manual/dry-run language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate Trial Day One Operating Kit content, full 14-day trial operating checklist (Launch System Packet), or the full First Roofer Day-One Command Center / Lead-to-Inspection Ops Pack (it complements them for the reporting + success review overlay).
- No changes to backend or src directories, Migration files, schema, auth/RLS/security, env, secrets, production routes, or any activation of live systems.

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, customer-facing, handoff artifacts shared with the roofer, trial communications, success review call scripts/quotes, pre-payment materials, and any customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 17 and 18.

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

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). References FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md (day-one baseline + handoff source), FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md (preconditions), FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md (upstream), FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container and handoff target), FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md (execution detail patterns), WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for trial direction language enforcement, and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md for the tenant isolation checkpoint. Cross-references Go-Live Readiness, Guided Setup, and Launch System packets.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js
scripts/run-first-paid-roofer-trial-reporting-success-review-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Trial Day One Operating Kit (primary day-one baseline / handoff source): `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md` + its wrapper and verifier (provides day-one snapshot, end-of-day handoff artifact, 9 trackers baseline, trial health at day 1, safety log; this kit continues the rhythm and adds periodic/end scoring + success review)
- Go-Live Readiness (upstream precondition source): `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md` + its wrapper and verifier (provides PASS go-live decision, setup-to-trial handoff, trial terms verbatim, data protection checkpoint)
- Guided Setup (upstream source): `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` + its wrapper and verifier (worksheets and setup confirmation referenced in trial context)
- Launch system (primary container + handoff target for 14-day trial ops, pre-billing, payment, cancel): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier (receives daily/periodic reporting snapshots + end-of-trial decision handoff; contains the 14-day trial operating checklist, pre-billing, first payment, cancellation sections that this kit feeds)
- First Roofer Day-One Command Center (execution detail complement): `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md` + its wrapper and verifier (triage board, lead-to-inspection detail, appointment readiness worksheets for manual use during trial)
- Lead-to-Inspection Ops Pack (workflow complement): `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md` + its wrapper and verifier (lead completeness, missing-info recovery, communication prep, inspection/appointment readiness patterns used in outcome tracking)
- Website trial direction regression (language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md, FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md, and the full suite of first-roofer manual command packets for execution detail during trial.
- This kit's wrapper: `scripts/run-first-paid-roofer-trial-reporting-success-review-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js`

---

## 1. Internal-only dry-run scope

**Internal-only / founder-operator-only. This entire kit is manual trial reporting and success review only.**

- All steps are founder/operator manual review, outcome tracking, scorecard compilation, draft preparation, decision logging, success review call agenda/script prep, and handoff during the 14-day trial and at end-of-trial only.
- No live systems, no external calls, no production data access, no automation activation of any kind. All communication drafts, scorecards, and review notes remain local/internal; nothing is sent from this kit.
- Use only after Trial Day One Operating Kit has produced the end-of-day handoff (or equivalent daily rhythm established) and after the explicit "RoofLeadHQ AI setup goes live" moment has occurred (trial clock started on that calendar day per Go-Live Readiness + Day One).
- Copy-paste trackers locally; do not store in production systems. All lead/appointment data handled as sanitized notes or local copies only.
- Re-confirm every safety item in section 17 before starting any daily reporting cycle, before any scorecard gate, before success review prep, before end-of-trial decision, and before any handoff.
- This kit operates in parallel with FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md, FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md, and the Launch System Packet 14-day trial operating checklist for detailed lead handling and execution; it provides the reporting, scoring, outcome tracking, and end-of-trial success review overlay.

## 2. Trial reporting and success review purpose

**Internal-only / founder-operator-only.**

During the 14-day trial (Day 1 = go-live date through Day 14) and at the explicit end-of-trial gate (typically targeted review on or before Day 14, allowing pre-billing email ~2 days before first monthly payment per public language):

- Establish and maintain the manual daily trial reporting rhythm (morning lead review, mid-day outcome capture, EOD snapshot compilation) using handoff from Trial Day One Operating Kit + Launch System Packet.
- Perform ongoing lead intake and source performance review (volume, quality, completeness signals across sources).
- Review response and follow-up outcome tracking (manual draft effectiveness, cadence adherence, stop/opt-out compliance, escalation handling).
- Review missed-lead recovery outcome tracking (recovery success rate, paths used, gaps closed).
- Track booked homeowner appointments (manual coordination status, proposed/confirmed/completed/no-show, homeowner info completeness, roofer confirm steps).
- Capture roofer communication and feedback review (manual updates delivered per cadence, roofer input on what is working, adjustment requests, tone/volume notes).
- Run trial health scorecard at key checkpoints (e.g., mid-trial ~Day 7, pre-prepay ~Day 12, end-of-trial) with explicit criteria and PASS/HOLD/BLOCKED.
- Maintain blocker and risk review register with owners/dates/escalation.
- Execute pre-payment email readiness checklist (rehearse content/timing per Launch System section 7; manual only).
- Prepare cancellation/no-go handling (review triggers, archive steps, final metrics, per Launch System section 9).
- Prepare first monthly payment handoff readiness (trial summary, feedback capture, payment details, per Launch System section 8).
- Prepare success review call agenda and script (end-of-trial conversation with roofer using only approved public language; review outcomes, decide continue or not).
- Execute end-of-trial PASS/HOLD/BLOCKED decision gate and produce handoff (to payment handoff readiness or cancellation/no-go path).
- All reporting snapshots, scorecards, and success review prep are manual compilation from local logs + trackers only.

This kit does not advance the trial clock or trigger billing. The 14-day trial began on the go-live date. All manual activity here confirms operating health, surfaces outcomes for review, and produces a clean success review + decision at trial end.

Trial Day N = N calendar days from the go-live date (Day 1) established in Go-Live Readiness and recorded in Trial Day One Operating Kit handoff.

## 3. Inputs from Trial Day One and Launch System

**Internal-only / founder-operator-only. Required before this kit can be used for ongoing trial reporting and success review.**

From `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md` outputs (plus Launch System Packet):

- End-of-Day Trial Handoff Tracker entry from Day One (or subsequent daily handoff notes) with trial health at EOD Day 1, day-one reporting snapshot, all 9 Day One trackers, open blockers carried forward, verifiers green, safety confirmation.
- Trial health status at Day 1 (PASS/HOLD/BLOCKED) + evidence log.
- Day-one reporting snapshot (13+ fields: leads, sources, response/follow-up, missed recovery, appts, blockers, etc.).
- Go-Live Readiness handoff artifact (still referenced; Setup-to-Trial Handoff Artifact from Go-Live): roofer/contact, trial terms verbatim (exact 6 approved strings), lead source summary, response/follow-up/booking/reporting prefs, data protection refs, open blockers (none for initial PASS), go-live target window, evidence.
- Launch System Packet 14-day trial operating checklist current state (daily rhythm notes, trial day count, pre-billing target ~Day 12-13, first payment target, command center snapshot).
- Guided Setup worksheets (business profile, sources, response/follow-up prefs, booking prefs, reporting prefs) for reference during outcome review.
- Prospect tracker entry for this roofer with current stage "14-Day Trial Day X".
- Aggregate verifiers (day-one kit + go-live + guided + launch + pilot + quality gate) all green at handoff from Day One.
- Explicit confirmation in handoff: manual review window secured for full 14d; samples/fixtures available for rehearsal; decision maker available; no live automation.

From ongoing Launch System Packet during trial: daily operating notes, any mid-trial health checks (Day 7/12), pre-billing draft rehearsal location, payment details captured internally, cancellation triggers logged if any.

If any critical input is missing or Day One was not healthy (BLOCKED without resolution), mark this kit HOLD immediately and route back to Launch System Packet owner + Day One Operating Kit owner with owner/date. Re-confirm trial terms with roofer if >48h since last contact: use only the exact approved public strings listed in section 2.

Cross-reference: Launch System Packet sections 6 (14-day trial operating), 7 (pre-billing), 8 (first payment), 9 (cancellation), and Trial Day One sections 13-14.

## 4. Daily trial reporting rhythm

**Internal-only / founder-operator-only. Start-of-day / EOD gates: re-confirm safety and update trackers before advancing.**

Maintain the manual reporting rhythm during the 14-day trial (continuing from Day One Operating Kit handoff + Launch System Packet daily rhythm):

Morning (per command center / lead-to-inspection):
- Review overnight / new leads since last snapshot (use sanitized local copies or fixture for rehearsal).
- Apply lead completeness + source classification.
- Update Lead Source Performance Tracker and Daily Trial Reporting Tracker.
- Flag any immediate missed-lead recovery candidates.

Mid-day:
- Capture response/follow-up draft outcomes (manual use only).
- Capture missed-lead recovery actions and results.
- Update booked homeowner appointment status as manual coordination progresses (proposed slots, replies, roofer confirms).
- Log any roofer communication received or manual update sent (per agreed cadence).
- Update Response Follow-Up Outcome Tracker, Missed-Lead Recovery Outcome Tracker, Booked Homeowner Appointment Tracker.

End-of-day (EOD snapshot):
- Compile manual daily/periodic reporting snapshot (leads handled, sources, outcomes, appts, recovery, comms sent, blockers).
- Update all active trackers.
- Run quick trial health pulse (PASS/HOLD provisional) if checkpoint day.
- Record in Daily Trial Reporting Tracker.
- Re-confirm section 17 Safety Guardrails and log "Safety guardrails re-read and all OFF at [timestamp] before EOD reporting close for Trial Day N".
- Data protection / tenant isolation checkpoint re-confirmed (single-tenant manual controls only; refs logged).
- Prepare any manual contractor update (if cadence includes daily/every-other-day; use approved language only in customer-facing excerpts).

Record gate decision + 1-line rationale + timestamp in Daily Trial Reporting Tracker.

Re-confirm section 17 Safety Guardrails before any EOD handoff note into Launch System Packet evidence log.

## 5. Lead intake and source performance review

**Internal-only / founder-operator-only. Gate after daily rhythm start.**

For every lead batch during trial (ongoing from Day One intake):

- Apply lead completeness checklist (expanded from FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md): Lead ID, homeowner name, property address, lead source + detail, service type, urgency, roof age/damage, photos status, insurance, contact permission, consent flags.
- Classify by source (Google LSA, Angi, HomeAdvisor, organic/web, referral, storm event, etc.) and record volume/quality signal.
- Confirm lead is within roofer service area and accepted lead types per Guided Setup / Go-Live handoff.
- Confirm no do-not-contact or prior opt-out match.
- Flag missing fields explicitly; route to missed-lead recovery path if needed (update Missed-Lead Recovery Outcome Tracker).
- Capture source performance signals: lead-to-complete rate, time-to-first-manual-response (from notes), conversion to appointment-proposed, storm vs standard mix.
- Record source volume vs expected (from Guided Setup prefs).
- Confirm data boundary: lead details captured only in local sanitized notes / trackers; no production tenant write.
- Update Lead Source Performance Tracker with per-source PASS/HOLD/BLOCKED for the period (PASS/HOLD/BLOCKED per source).
- Aggregate into Daily Trial Reporting Tracker.

HOLD if critical fields missing with no recovery path for >N leads. BLOCKED if consent/red-flag or tenant boundary violation or source delivering only bad-fit leads repeatedly.

Update trial health inputs from this review.

## 6. Response and follow-up outcome review

**Internal-only / founder-operator-only.**

Review response and follow-up language prepared/used for manual coordination on trial leads (drafts only; this kit never sends; outcomes from manual use logged):

- Confirm drafts/outcomes match tone, urgency, and approved language from Guided Setup response/follow-up worksheet (captured in Go-Live handoff + Day One baseline). drafts match tone, urgency, and approved language.
- Verify stop conditions are stated or implied (reply, book, stop, opt-out) and respected in manual follow-up cadence.
- Confirm escalation triggers noted and actioned (storm, 3+ prior touches, high-value, keyword).
- Confirm owner review / draft approval status per early-trial plan (first N responses reviewed by founder/operator).
- Confirm no guarantee, booked-jobs, auto-estimate, or forbidden phrasing slipped into drafts or manual notes.
- Confirm all drafts are labeled "DRAFT — MANUAL USE ONLY — NOT SENT BY SYSTEM".
- Log review outcome (approved for manual use outside system / needs revision / HOLD) per lead/batch in Response Follow-Up Outcome Tracker.
- Re-state explicitly: all response/follow-up during 14-day trial remains manual review/coordination only; no live automation.
- Track outcome metrics manually: response time (rough), follow-up count to next stage, recovery from no-reply, stop/opt-out rate.

PASS/HOLD/BLOCKED response and follow-up outcome status per period or lead batch. BLOCKED if pattern of forbidden phrasing or violated stop rules.

## 7. Missed-lead recovery outcome review

**Internal-only / founder-operator-only.**

Review leads flagged as missed, stalled, or requiring recovery during trial:

- Confirm recovery candidates surfaced from intake review, source performance, or prior-day carry-forward in Launch System / Day One notes.
- Apply missing-information recovery checklist (from FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md patterns + Launch missing-information recovery packet reference): identify exact gaps, manual recovery action taken (e.g., manual clarification call prep, source owner ping, re-contact via allowed channel), outcome recorded.
- Confirm consent/safety boundary still holds for recovery attempt.
- Confirm no production system or live send was used or expected for recovery (manual only).
- Log each recovery item with owner, due, evidence, planned manual next step, actual outcome (recovered / still open / lost) in Missed-Lead Recovery Outcome Tracker.
- Escalate to Blocker and Risk Register if recovery path unclear or blocked repeatedly.
- Compute rough manual recovery rate for scorecard input.

PASS/HOLD/BLOCKED missed-lead recovery outcome status. BLOCKED if recovery would require live automation or violated data boundary. BLOCKED if recovery would require live automation.

## 8. Booked homeowner appointment tracking

**Internal-only / founder-operator-only.**

For leads that have advanced to appointment proposal or confirmation stage during trial:

- Confirm inspection goal and windows match roofer prefs from Go-Live handoff (M-F hours, travel max, next-day standard, weather policy).
- Confirm required homeowner info captured before proposing slot (full address + phone + rough scope).
- Confirm contractor/scheduler confirmation path is manual only (read-only calendar view or manual export; no write access or auto events).
- Confirm no auto-booking or "You book the inspection" expectation was set with roofer (re-state from approved public language: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery).
- Confirm manual coordination steps logged (proposed slot, homeowner reply captured, contractor confirm step, status: proposed / confirmed / completed / no-show / rescheduled / cancelled).
- Confirm appointment status categories used are manual-only.
- Record status + evidence per lead in Booked Homeowner Appointment Tracker.
- Explicit: all booking coordination is manual copy into calendar or phone coordination; no API writes, no live Vapi voice booking, no auto events during trial.
- Track conversion: leads -> appt proposed -> confirmed -> completed. Feed into trial health scorecard.
- Note any "booked homeowner appointments" achieved via the defined flow only.

BLOCKED if roofer expectation for live auto-booking surfaced during trial without separate explicit founder approval outside this kit.

## 9. Roofer communication and feedback review

**Internal-only / founder-operator-only.**

Review manual communication channel, cadence, and feedback received from the paying roofer during trial:

- Primary contact channel (phone/email/text per Guided Setup prefs) confirmed and used for manual updates.
- Reporting cadence from Go-Live handoff / Day One matched (e.g., EOD Day 1, then every 3 days, weekly, or per prefs; pre-pay review at ~Day 12).
- Manual update format used: leads handled, source performance, response/follow-up outcomes, missed recovery, appointments (proposed/confirmed), blockers (sanitized), next steps. manual update channel.
- All customer-facing excerpts in manual updates use only the 6 exact approved public strings.
- Decision-maker availability re-confirmed for trial clarifications and success review call.
- No production dashboard or portal exposure to roofer (read-only internal artifacts only; no login or live view).
- Log status + any manual notes sent (or planned) + roofer feedback received (what is working, volume/quality notes, setup adjustments requested, tone feedback) in Roofer Feedback Review Tracker.
- Capture explicit roofer sentiment and any requests for the success review call agenda.

PASS/HOLD/BLOCKED roofer communication and feedback review. HOLD if contact channel unconfirmed or feedback indicates repeated expectation mismatch on manual-only nature.

## 10. Trial health scorecard

**Internal-only / founder-operator-only. Key periodic gate (mid-trial Day ~7, pre-prepay ~Day 12, end-of-trial). All prior sections must support the status. This is manual operations review only.**

### Trial Health Scorecard Criteria (all must be true or assigned for PASS at checkpoint)

- Daily Trial Reporting Rhythm: consistent EOD snapshots logged; Daily Trial Reporting Tracker up to date with no overdue items.
- Lead Intake and Source Performance: PASS or HOLD with clear owners/dates (no BLOCKED sources; completeness rate acceptable per prefs).
- Response and Follow-Up Outcome: PASS (outcomes logged; drafts approved or under revision; no forbidden language; cadence followed).
- Missed-Lead Recovery Outcome: PASS or HOLD with recovery paths assigned and outcomes logged (no BLOCKED recoveries).
- Booked Homeowner Appointment Tracker: PASS or HOLD with manual coordination steps logged and statuses current (no auto-booking expectation; conversion signals visible).
- Roofer Feedback Review: PASS (channel + cadence confirmed; feedback captured; no unresolved expectation mismatch).
- Trial Health Scorecard Tracker: prior checkpoints green or carried with owners; current inputs complete.
- Blocker and Risk Register: no OPEN BLOCKED items; any HOLD items have owner + due date < 24-48h and documented acceptance.
- Pre-Payment Email Readiness (if at/after ~Day 12 checkpoint): checklist items met or on track.
- All safety guardrails (section 17) re-read and logged within last 12h.
- Aggregate verifiers (this kit + day-one + go-live + launch + pilot + quality gate) remain green.
- No production automation enabled or scheduled (re-confirm all guardrails).
- Trial day count accurate; reporting rhythm executed through current day.

### Decision at Each Checkpoint (including end-of-trial)

Status: [ ] PASS (trial healthy; continue rhythm or proceed to end-of-trial success review) [ ] HOLD (gaps with owners/dates; re-review after clear) [ ] BLOCKED (critical issues; escalate per Launch System Packet no-go path immediately)

Evidence Log entry required with:
- Timestamp + Trial Day N
- Operator/founder
- Verifier run outputs (paste key PASS lines)
- Safety guardrails re-confirmation quote
- Full blocker/risk register snapshot
- Lead/source/appointment/recovery counts and rates (from trackers)
- Roofer feedback summary (sanitized)
- Link/reference to all 9 trackers + current reporting snapshot + prior Day One handoff + Launch System Packet entry
- Next manual action owner/date

Only PASS advances full rhythm or to success review call + end-of-trial gate. HOLD or BLOCKED requires immediate escalation note into Launch System Packet and prospect tracker. Re-confirm safety before any handoff.

Update Trial Health Scorecard Tracker at every checkpoint.

## 11. Blocker and risk review

**Internal-only / founder-operator-only. Maintain live during trial. Every item triggers explicit gate at scorecard checkpoints and before success review.**

Use PASS / HOLD / BLOCKED rules. Update after every major review section and before trial health scorecard and end-of-trial gate.

### PASS / HOLD / BLOCKED Rules (enforced, extending Day One rules)
### PASS / HOLD / BLOCKED Rules (enforced)

- Daily reporting rhythm incomplete or EOD snapshots missing >1 day: HOLD until caught up.
- Lead intake critical fields missing with no recovery path for multiple leads: HOLD (flag in missed recovery); BLOCKED if consent or service-area violation or source is consistently bad-fit.
- Response/follow-up outcomes contain forbidden phrasing or violate stop rules repeatedly: HOLD until revised pattern; BLOCKED if pattern persists after coaching.
- Missed-lead recovery requires live send/automation or crosses tenant boundary: BLOCKED.
- Booked homeowner appointment tracking shows auto-booking expectation or contradicts manual-only from Go-Live: BLOCKED.
- Roofer communication channel unconfirmed or decision-maker unavailable for success review: HOLD.
- Roofer feedback indicates strong expectation of live automation, guarantees, or "day 15" billing without 14-day trial framing: BLOCKED (re-state allowed public strings only).
- Data protection / tenant isolation red flag during trial (e.g., production write suspicion, cross-roofer leak risk, PII mishandling in notes): BLOCKED (cross-ref ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md).
- Wants live automation activated during trial: BLOCKED (this kit and prior kits are manual review only; live behavior requires separate explicit founder approval after full trial validation).
- Pre-payment email draft contains forbidden phrasing or timing violates "2 days before first monthly payment" + 14-day trial framing: HOLD until fixed.
- Unresolved prior blocker from Day One or prior checkpoint without owner/due in 48h: HOLD.
- Trial health scorecard criteria not met at checkpoint: HOLD or BLOCKED per section 10.
- Success review call prep surfaces roofer intent to cancel or no-go: route to section 13 handling.

Record every blocker with date, owner, due, evidence, resolution plan, manual next action. Re-evaluate at every scorecard checkpoint and end-of-trial gate.

## 12. Pre-payment email readiness checklist

**Internal-only / founder-operator-only. Run at ~trial Day 12-13 per Launch System Packet target (to arrive ~2 days before first monthly payment). Manual rehearsal only.**

### Pre-Payment Email Content Requirements (Allowed Language Only)

Subject / body must contain / reference:
- 14-day trial completion reference.
- Reminder that first monthly payment is upcoming (after the automated email).
- Clear "cancel anytime" and "no long-term contract".
- Offer of support for any setup adjustments.
- Reference to how to manage subscription (manual for first roofer).
- No guarantee language, no "you will get X appointments", no auto-booking claims, no "monthly billing on day 15" or "day 15" phrasing.
- Exact approved public strings integrated naturally.

### Readiness Checklist

- [ ] Draft email text captured in internal notes or FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md style location (updated for pre-billing / trial completion).
- [ ] Draft reviewed against forbidden phrases list (verifier enforces absence in customer-facing sections).
- [ ] Contractor contact details confirmed for manual delivery rehearsal (no automation).
- [ ] Timing rule documented and calculated: send on trial day 12 or 13 depending on go-live date so that it arrives ~2 days before first monthly payment per public positioning ("An automated email is sent 2 days before the first monthly payment").
- [ ] Cancellation instructions included and tested internally (what happens on cancel per section 13).
- [ ] Safety guardrail re-confirmation: no actual automated email system (Resend or otherwise) is wired or triggered.
- [ ] Backup manual send plan documented (founder/operator will handle first instance manually if needed).
- [ ] Success review call timing coordinated so roofer has context before or with email arrival.
- [ ] Pre-Payment Email Readiness Tracker updated with status + evidence.

### Pre-Payment Go/No-Go (at checkpoint)

Status: [ ] READY FOR MANUAL REHEARSAL SEND [ ] HOLD [ ] BLOCKED

Evidence:
- Draft location and version:
- Forbidden phrase scan: pass
- Timing calculation (go-live +14 -2):
- Safety: all guardrails OFF
- Roofer feedback incorporated:
- Next: section 14 if continuing to payment handoff, or section 13 if no-go/cancel.

Update Pre-Payment Email Readiness Tracker. Re-confirm safety before any rehearsal delivery.

Cross-ref Launch System Packet section 7 for full pre-billing context.

## 13. Cancellation/no-go handling

**Internal-only / founder-operator-only. Covers prospect no-go before go-live (already handled), during-trial cancel, or decision at end-of-trial no-go. All paths manual and founder/operator owned. Per Launch System Packet section 9.**

### During 14-Day Trial Cancel / No-Go Triggers

- Contractor requests cancel (explicit email/text timestamp captured).
- End-of-trial success review results in no-go decision (roofer elects not to proceed, or internal BLOCKED gate).
- Trial health remains HOLD/BLOCKED after multiple checkpoints with no resolution path.
- Critical safety / data protection / consent / compliance red flag.
- Roofer feedback indicates fundamental mismatch (e.g., expects guarantees or live automation that cannot be met under current manual posture).

### Actions (Manual Only)

- Log reason + evidence + classification (during-trial cancel / end-of-trial no-go / other) in this kit's End-of-Trial Decision Handoff Tracker + Roofer Feedback Review Tracker.
- Capture explicit cancel request if from roofer.
- Stop all manual review activity for this roofer immediately.
- Log final trial metrics (from all 9 trackers + scorecards + snapshots): leads, sources, response/follow-up outcomes, missed recovery outcomes, booked homeowner appointments, roofer comms/feedback, blockers closed.
- Deliver any final manual report or close note if agreed (use approved public language only; no internal-only phrasing).
- Confirm no further billing obligation (per "Cancel anytime. No long-term contract.").
- Archive all artifacts with preservation snapshot per first-roofer manual session patterns (ref ROOFER_DRY_RUN... patterns if applicable).
- Update Launch System Packet evidence log + prospect tracker status with "CANCELLED / NO-GO — [date] — [reason class] — final metrics ref — safety confirmed no prod writes".
- Re-confirm data protection / tenant isolation for archival (no cross-roofer exposure).

### Cancellation / No-Go Go/No-Go Record (Always Required at Trigger or End-of-Trial)

Status for this roofer: [ ] CANCELLED / NO-GO [ ] ACTIVE / PROCEED TO PAYMENT

Evidence (in End-of-Trial Decision Handoff Tracker):
- Trigger date/time + Trial Day:
- Reason classification (during-trial cancel / end-of-trial no-go / roofer request / internal BLOCKED / other):
- Final metrics summary (leads / appts / recovery rate / feedback summary):
- Communications log (last manual update + success review notes if held):
- Data archival location + preservation ref:
- Safety: no production writes occurred (re-confirmed)
- Founder/operator sign-off + timestamp:

All cancellation paths must leave the system in a clean, auditable, non-production state. No live sends for close.

Cross-ref Launch System Packet section 9.

## 14. First monthly payment handoff readiness

**Internal-only / founder-operator-only. Run after successful end-of-trial PASS (or after pre-pay email acknowledged) and before any manual payment request. Per Launch System Packet section 8. All payment collection for the first roofer is manual/internal handoff — no automation.**

### Pre-Payment Actions (Complete Before Handoff)

- [ ] Pre-billing email sent (or manual equivalent delivered) and acknowledged (log date/method).
- [ ] Trial outcomes summarized internally (from trackers + scorecards: leads handled by source, response/follow-up outcomes, missed-lead recovery outcomes, booked homeowner appointments (proposed/confirmed/completed), manual comms delivered, roofer feedback summary, blockers resolved).
- [ ] Contractor / roofer feedback on full 14 days captured via success review call or equivalent (what worked, what to adjust in Guided Setup / response prefs / sources, volume reality, next steps).
- [ ] Any open gaps or configuration changes logged and planned (or noted as post-payment adjustments).
- [ ] Billing amount confirmed (per published pricing for the tier chosen during Guided Setup).
- [ ] Payment method / invoice details captured internally (manual only).
- [ ] Safety: no payment link automation, no invoice generation in system, no Supabase billing record writes.
- [ ] Success review call completed with decision recorded as PASS to proceed.
- [ ] End-of-Trial Decision Handoff Tracker shows PASS with evidence.

### Payment Handoff Steps (Founder/Operator Manual — Rehearsal Only in This Kit)

1. Deliver invoice or payment request using manual channel (email or agreed method per Guided Setup prefs).
2. Confirm receipt of first monthly payment (log date, amount, method, reference in internal evidence log only).
3. Update internal status to "paying customer — 14-day trial complete — first payment received".
4. Schedule first monthly review / reporting handoff (post-payment cadence).
5. Re-confirm ongoing cancel-anytime terms using approved language.
6. Hand off to steady-state manual support rhythm using existing first-roofer packets + Launch System Packet ongoing sections.

### First Payment Go/No-Go (at handoff time)

Status: [ ] PAYMENT RECEIVED — FIRST MONTH ACTIVE [ ] PENDING [ ] FAILED / NO-GO (escalate to section 13)

Evidence Log (required, record in End-of-Trial Decision Handoff Tracker + Launch System):
- Invoice/reference id (internal):
- Amount:
- Date received:
- Method / notes:
- Contractor / roofer confirmation (manual):
- Safety guardrails: re-confirmed
- Updated command center / prospect tracker status:
- Success review call summary ref:
- Operator: ____ Date: ____

Handoff: Update all operator notes, close trial tracking in this kit, move to steady-state manual support rhythm using existing first-roofer packets. Record "First monthly payment handoff complete" in Launch System Packet.

Cross-ref Launch System Packet section 8.

## 15. Success review call agenda and script

**Internal-only / founder-operator-only. Prep for end-of-trial conversation (typically ~Day 13-14). Use only approved public language in any quoted or paraphrased content shared with roofer. All notes, agenda, script drafts internal-only.**

### Agenda (Manual Call Prep — Copy-Paste Structure)

1. Opening (1 min): Re-state trial framing and purpose.
   - "The 14-day trial period is completing. RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
   - "Guided Setup happened first. The 14-day trial began after RoofLeadHQ AI setup went live."
   - "An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."

2. Trial Outcomes Review (5-7 min): Share sanitized summary from trackers (never raw PII).
   - Leads received by source + performance notes.
   - Response and follow-up: volume, manual cadence followed, sample outcomes (what worked).
   - Missed-lead recovery: examples of gaps closed and rate.
   - Booked homeowner appointments: count of proposed/confirmed/completed via the flow (use "booked homeowner appointments" term only).
   - Any standout leads or issues handled manually.

3. Roofer Feedback (5 min): Ask and capture.
   - What is working / not working with lead quality, response speed, follow-up, recovery, appointment coordination.
   - Volume reality vs expectations.
   - Setup adjustments needed (sources, prefs, service area, bad-fit scenarios).
   - Communication cadence feedback.

4. Pre-Payment and Next Steps (3 min):
   - "An automated email is sent 2 days before the first monthly payment." (rehearse timing).
   - Review any pre-billing draft language (if sharing).
   - Billing amount / tier confirmation.
   - "Cancel anytime. No long-term contract."

5. Decision / Close (2 min):
   - Ask: Do you want to proceed to monthly after the trial?
   - Record explicit yes / no / hold for internal decision.
   - If yes: walk through manual payment handoff steps (section 14).
   - If no / hold: walk through cancellation path (section 13), no further obligation.
   - Thank and confirm manual support continues either way.

6. Post-Call (internal): Update Roofer Feedback Review Tracker, End-of-Trial Decision Handoff Tracker, trial health scorecard, Launch System Packet. Run end-of-trial gate (section 16).

### Script Notes (Internal-Only Draft Prep)

- Never promise specific numbers of booked homeowner appointments or revenue.
- Never use forbidden phrases (guaranteed, automatic estimate/quote/invoice/payment, you book the inspection, day 15, 14-day launch trial, etc.).
- Use concrete facts only from sanitized logs.
- Label all script drafts: "INTERNAL DRAFT — MANUAL SUCCESS REVIEW CALL PREP ONLY — NOT SENT BY SYSTEM — USE APPROVED PUBLIC STRINGS ONLY".
- If roofer raises guarantee or auto-booking: re-state the approved public positioning and note internally for blocker review (BLOCKED if persistent mismatch).
- Record call outcome timestamp + decision + key quotes (sanitized) in Roofer Feedback Review Tracker and End-of-Trial Decision Handoff Tracker.

Success review call is manual only (phone or agreed channel). No calendar invite automation, no recording upload, no CRM write.

## 16. End-of-trial PASS/HOLD/BLOCKED decision gate

**Internal-only / founder-operator-only. Final gate at end of 14-day trial (after success review call and all checkpoints). Only PASS with full evidence advances to first monthly payment handoff readiness. This is manual decision gating only.**
final gate at end of 14-day trial.

### End-of-Trial Decision Criteria (all must support PASS)

- All daily/periodic reporting rhythm executed and logged through Day 14 (or agreed end day) in Daily Trial Reporting Tracker.
- Lead Source Performance Tracker: no open BLOCKED sources; performance data sufficient for roofer discussion.
- Response Follow-Up Outcome Tracker + Missed-Lead Recovery Outcome Tracker + Booked Homeowner Appointment Tracker: complete with outcomes and no BLOCKED items unresolved.
- Roofer Feedback Review Tracker: feedback captured (including from success review call); any expectation mismatches resolved or explicitly accepted in internal log.
- Trial Health Scorecard Tracker: final checkpoint PASS (or HOLD resolved with documented acceptance); all prior checkpoints accounted.
- Blocker and Risk Register: no OPEN BLOCKED items; HOLD items closed or carried with owner/due into post-trial if proceeding.
- Pre-Payment Email Readiness Tracker: checklist PASS or manual equivalent ready (if proceeding).
- Success review call completed (or explicit roofer decision recorded); decision captured.
- Safety guardrails (section 17) re-read and logged within last 12h; all OFF.
- Aggregate verifiers green.
- No production automation of any kind.
- Explicit roofer decision (proceed / cancel / hold) logged with timestamp and evidence.
- End-of-Trial Decision Handoff Tracker fully populated.

### Decision

Status: [ ] PASS (trial complete and healthy; proceed to first monthly payment handoff readiness per section 14) [ ] HOLD (gaps with owners/dates; re-review after clear or extend trial window with explicit roofer agreement) [ ] BLOCKED (critical issues or no-go; escalate per section 13 cancellation/no-go handling immediately)

Evidence Log entry required (paste into End-of-Trial Decision Handoff Tracker + Launch System Packet):
- Timestamp + final Trial Day
- Operator/founder
- Verifier run outputs (this kit + day-one + go-live + launch + pilot + quality gate)
- Safety guardrails re-confirmation quote
- Full final blocker/risk register snapshot
- All 9 trackers snapshot summary (counts, key rates, feedback highlights)
- Success review call outcome + roofer decision quote (sanitized)
- Pre-payment status
- Link/reference to reporting snapshots, scorecards, prior Day One handoff, Launch System Packet entries
- Next manual action: (payment handoff rehearsal / cancel handling / hold follow-up) + owner + due

Only PASS advances to section 14 first monthly payment handoff readiness. HOLD requires documented re-review plan + roofer communication. BLOCKED routes directly to section 13.

Update End-of-Trial Decision Handoff Tracker with decision + evidence. Insert summary into Launch System Packet 14-day trial operating evidence log + prospect tracker.

## 17. Safety guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before daily reporting start, before trial health scorecard checkpoints, before pre-payment rehearsal, before success review call, before end-of-trial decision, before any handoff. All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer trial reporting and success review operations unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only trial reporting and success review: YES (this kit produces review checklists, trackers, outcome logs, scorecards, draft reviews, call agendas, and handoff artifacts only)
- Draft-only readiness notes and script prep: YES (all reviews captured as internal drafts for manual coordination planning)
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
- References FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md (day-one baseline + handoff), FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md (preconditions), FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md (upstream), FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary handoff target), FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md and FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md (execution detail).

Re-confirm by logging "Safety guardrails re-read and all OFF at [timestamp] before [action]" in Evidence Log before every reporting cycle, scorecard, pre-pay, success review prep, end-of-trial gate, or handoff.

## 18. Public-vs-internal language boundary

**Customer-facing trial communications, any manual email or note that could reach the paying roofer (including success review call prep, pre-payment email drafts, reporting snapshot excerpts shared with roofer, payment handoff notes, and close notes), and any end-of-trial decision handoff excerpts must not use founder-led/manual babysitting/public founder-review framing.**

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
- Section 2 Trial reporting and success review purpose (full)
- Section 3 Inputs from Trial Day One and Launch System (full)
- Section 4 Daily trial reporting rhythm (full)
- Section 5 Lead intake and source performance review (full)
- Section 6 Response and follow-up outcome review (full)
- Section 7 Missed-lead recovery outcome review (full)
- Section 8 Booked homeowner appointment tracking (full)
- Section 9 Roofer communication and feedback review (full)
- Section 10 Trial health scorecard (full)
- Section 11 Blocker and risk review (full)
- Section 12 Pre-payment email readiness checklist (full)
- Section 13 Cancellation/no-go handling (full)
- Section 14 First monthly payment handoff readiness (full)
- Section 15 Success review call agenda and script (full)
- Section 16 End-of-trial PASS/HOLD/BLOCKED decision gate (full)
- Section 17 Safety guardrails (full)
- All 9 Manual Tracker Templates (section 19; all contain internal data only)
- All "Internal only:" callouts and Evidence Log instructions

Customer-facing sections (reporting snapshot excerpts shared with roofer, pre-payment email drafts, success review call scripts/quotes, payment handoff notes, any direct quotes or handoff excerpts to the roofer) use only the allowed public language.

*End of First Paid Roofer Trial Reporting + Success Review Kit. Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.*

---

## 19. Manual Tracker Templates

**Copy-paste-ready tables. Use in local spreadsheet, notes app, or printed. 9 tables as required. Update at every daily EOD, after every lead batch, at every scorecard checkpoint, before/after success review, and at end-of-trial gate. Internal-only data. Columns emphasize owner/status/evidence/next-action.**

### Daily Trial Reporting Tracker
```
| Date | Company | Trial Day | Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------|------|-------|----------------------------|----------|-------------|----------|
| 2026-06-14 | ABC Roofing | Day 2 | EOD snapshot + safety re-read | J (op) | PASS | Day 1 handoff + 4 leads reviewed; safety logged | Update Lead Source + Response trackers | 2026-06-14 |
| 2026-06-20 | ABC Roofing | Day 8 | Mid-trial scorecard prep | J (op) | PASS | Trackers current; 12 leads, 4 appts proposed | Run section 10 gate | 2026-06-20 |
```

### Lead Source Performance Tracker
```
| Date | Company | Source / Period | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-14 | ABC Roofing | Google LSA / Day 2 | J (op) | PASS | 3 leads, 2 complete fields, service area match, 1 recovery flagged | Flag L-002 to Missed-Lead Recovery | 2026-06-14 EOD |
| 2026-06-20 | ABC Roofing | Angi / Week 1 | J (op) | HOLD | Lower complete rate (60%); 2 bad-fit | Discuss source owner + roofer feedback at success review | 2026-06-22 |
```

### Response Follow-Up Outcome Tracker
```
| Date | Company | Lead ID / Outcome Type | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|------------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-14 | ABC Roofing | L-20260613-001 / First response + follow-up 1 outcome | J (op) | PASS | Matches prefs; stop conditions respected; no forbidden; manual use logged | Close lead or advance to appt | 2026-06-14 |
| 2026-06-18 | ABC Roofing | L-20260615-003 / Follow-up 2 (3+ touches) | J (op) | HOLD | Escalation trigger hit; recovery in progress | Manual source ping + log outcome | 2026-06-19 |
```

### Missed-Lead Recovery Outcome Tracker
```
| Date | Company | Lead ID / Gap / Outcome | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-------------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-14 | ABC Roofing | L-20260613-002 / phone + zip / recovered | J (op) + source | PASS | Manual ping to source owner; fields supplied; re-ingested | Route to response | 2026-06-14 |
| 2026-06-19 | ABC Roofing | L-20260617-007 / address incomplete / open | J (op) | HOLD | Two manual attempts; no reply | Add to blocker register; escalate to roofer if needed | 2026-06-20 |
```

### Booked Homeowner Appointment Tracker
```
| Date | Company | Lead ID / Appt Status | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-15 | ABC Roofing | L-20260613-001 / confirmed manual | J (op) + john@abc | PASS | Proposed 2026-06-17 10am; homeowner reply captured; roofer manual confirm logged | Mark completed post-inspection | 2026-06-17 |
| 2026-06-18 | ABC Roofing | L-20260616-004 / proposed | J (op) | PASS | Homeowner info complete; slot proposed via manual channel; awaiting reply | Follow up per prefs | 2026-06-19 |
```

### Roofer Feedback Review Tracker
```
| Date | Company | Feedback Item / Channel | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-------------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-14 | ABC Roofing | Day 2 manual update (email) + reply | J (op) + john@abc | PASS | Leads handled + appt proposed noted; "volume good so far, follow-ups feel fast" | Log for mid-trial scorecard | 2026-06-20 |
| 2026-06-21 | ABC Roofing | Success review call notes | J (op) | PASS | "Recovery on missed leads helped; want to keep source mix; no auto needed" | Update End-of-Trial Decision + payment handoff | 2026-06-21 |
```

### Trial Health Scorecard Tracker
```
| Date | Company | Trial Day / Checkpoint | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|------------------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-20 | ABC Roofing | Day 8 / Mid-trial | J (op) | PASS | All 9 trackers current; 18 leads / 7 appts proposed / 5 confirmed; 2 blockers HOLD with owners; safety + verifiers green | Continue rhythm; prep pre-pay at Day 12 | 2026-06-25 |
| 2026-06-27 | ABC Roofing | Day 15 / End-of-trial (post success review) | J (op) | PASS | Final: 31 leads, 12 booked homeowner appointments via flow, recovery 70%, roofer PASS to proceed, pre-pay ready | Section 14 payment handoff | 2026-06-27 |
```

### Pre-Payment Email Readiness Tracker
```
| Date | Company | Trial Day | Item | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|-----------|------|-------|----------------------------|----------|-------------|----------|
| 2026-06-25 | ABC Roofing | Day 13 | Pre-billing draft review + timing calc | J (op) | PASS | Draft v2 in notes; no forbidden; "An automated email is sent 2 days before the first monthly payment" + 14d framing + cancel; calc: go-live +12 | Manual rehearsal delivery if roofer PASS at end | 2026-06-26 |
| 2026-06-26 | ABC Roofing | Day 14 | Pre-pay acknowledged (manual equiv) | J (op) | PASS | Email (manual) delivered; roofer ack in reply | Proceed to payment handoff gate | 2026-06-26 |
```

### End-of-Trial Decision Handoff Tracker
```
| Date | Company | Handoff Field | Owner | Status (PASS/HOLD/BLOCKED) | Evidence | Next Action | Due Date |
|------|---------|---------------|-------|----------------------------|----------|-------------|----------|
| 2026-06-27 | ABC Roofing | End-of-trial gate + success review outcome | J (op) | PASS | Section 16 log + all trackers + final scorecard + success review notes + roofer "yes proceed"; verifiers green | Section 14 first monthly payment handoff readiness | 2026-06-27 |
| 2026-06-27 | ABC Roofing | Pre-payment + payment handoff | J (op) | PASS | Pre-pay tracker PASS; billing amount confirmed; manual invoice details internal; safety re-confirmed | Deliver manual payment request; log receipt in Launch System | 2026-06-28 |
| 2026-06-27 | ABC Roofing | Verifiers + safety at end-of-trial | J (op) | PASS | This kit + day-one + go-live + launch + pilot + quality gate + build all PASS; safety logged | Record in Launch System Packet + prospect tracker "14-day trial complete — PASS — payment handoff" | 2026-06-27 |
```

---

**Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.**
