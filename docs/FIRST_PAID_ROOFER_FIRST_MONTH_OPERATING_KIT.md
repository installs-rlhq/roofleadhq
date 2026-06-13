# First Paid Roofer First-Month Operating Kit

Date: 2026-06-15

## Purpose

This is the practical manual first-month operating system Jason (founder/operator) can use after the first paid roofer converts from trial into paid status via the Trial Conversion / Payment Handoff Kit. The kit guides first-month kickoff, ongoing lead/appointment tracking, missed-lead recovery review, weekly value reporting, roofer feedback, blocker handling, cancellation-risk monitoring, support boundaries, monthly success review, and handoff into ongoing monthly operations.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, risk registers, feedback logs, value reports, and evidence logs are internal-only / dry-run / founder-operator-only. This is manual first-month operating readiness and customer success tracking only, not automation. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this kit. Dry-run / internal-only / founder-operator-only.

This kit is product-moving and operationally usable: it contains the concrete first-month kickoff checklist, paid customer status confirmation, lead intake operating rhythm, response and follow-up monitoring rhythm, missed-lead recovery review rhythm, booked homeowner appointment tracking, weekly value report preparation, roofer feedback and support review, cancellation-risk and blocker review, first-month issue escalation register, monthly success review agenda and script, ongoing monthly operations handoff, First-Month PASS/HOLD/BLOCKED decision gate, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer first-month operating using only this document + the referenced FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md (primary input) + FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md + FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md + FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md + FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-payment-handoff manual first-month operating and customer success tracking layer for the first paid roofer. It receives the handoff from Trial Conversion / Payment Handoff Kit (payment received + first-month expectations + post-trial status), operates alongside the Launch System Packet ongoing customer sections, and produces the first-month success review outcome + handoff into ongoing monthly operations (or cancellation). It focuses on manual tracking, value demonstration, feedback, risk monitoring, and clean handoff only. Jason (founder/operator) uses this kit after the first monthly payment is confirmed to run the first-month rhythm, prepare weekly value reports, conduct the monthly success review, and gate the transition to steady-state operations inside the Launch System Packet.

This kit file: `docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-first-month-operating-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js`

## Scope

- First paid roofer first-month operating after conversion to paying customer (the first real contractor who has completed the 14-day trial and made the first monthly payment).
- All manual operations during the first calendar month after first monthly payment confirmation (or equivalent post-conversion start): first-month kickoff checklist, paid customer status confirmation, lead intake operating rhythm (weekly), response and follow-up monitoring rhythm, missed-lead recovery review rhythm, booked homeowner appointment tracking, weekly value report preparation (manual), roofer feedback and support review, cancellation-risk and blocker review, first-month issue escalation register, monthly success review agenda/script, ongoing monthly operations handoff, First-Month PASS/HOLD/BLOCKED decision gate with handoff to steady-state or cancel.
- Internal founder/operator worksheets, decision trees, logs, blocker/risk/cancellation-risk registers, value report templates, feedback logs, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 17) that must be re-confirmed before every kickoff step, weekly review cycle, value report, feedback session, risk review, success review, gate, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (ongoing customer success / monthly operations sections) and prospect tracker / customer status. References upstream Trial Conversion / Payment Handoff Kit (primary input source), Trial Reporting + Success Review, Trial Day One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Website Trial Direction Regression, and Data Protection/Tenant Isolation packets for context, language enforcement, and checkpoint only.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in sections 17/18 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, note-taking, worksheet filling, decision logging, draft preparation (never sent), value report compilation, feedback capture, risk review, and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live first-month automation, ongoing billing, or production behavior. Those remain covered in the Launch System Packet. This is manual first-month operating readiness, lead/appointment tracking, value reporting, feedback, blocker/risk monitoring, success review, and handoff only.
- No customer-facing or public copy may use internal-only language (see section 18). Internal founder/operator/manual/dry-run language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate Trial Conversion / Payment Handoff content (it receives the post-payment handoff from it), full 14-day trial reporting (prior kits), or full ongoing monthly operating checklist (Launch System Packet). It is the focused first-month customer success overlay.
- No changes to backend or src directories, Migration files, schema, auth/RLS/security, env, secrets, production routes, or any activation of live systems.

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, customer-facing, handoff artifacts shared with the roofer, first-month communications, weekly value reports, success review call scripts/quotes, feedback notes shared externally, status updates shared externally, and any customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 17 and 18.

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

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). References FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md (primary input: payment confirmation + first-month expectations + post-trial status + safety), FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md (prior reporting patterns), FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md (day-one baseline patterns), FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md (preconditions), FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md (upstream), FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container and handoff target), WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for trial direction language enforcement, and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md for the tenant isolation checkpoint. Cross-references Trial Conversion, Trial Reporting + Success Review, Trial Day One, Go-Live Readiness, Guided Setup, and Launch System packets.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js
scripts/run-first-paid-roofer-first-month-operating-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Trial Conversion / Payment Handoff Kit (primary input source / handoff): `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md` + its wrapper and verifier (provides first monthly payment confirmation, roofer approval evidence, first-month operating expectations, post-trial customer status tracker, payment handoff artifact, Conversion gate PASS, safety + verifier evidence at gate)
- Trial Reporting + Success Review Kit (prior reporting patterns / baseline): `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md` + its wrapper and verifier (provides reporting rhythm, trackers, success review patterns, health scorecard approach that this kit adapts for first-month value reporting)
- Trial Day One Operating Kit (day-one baseline patterns): `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md` + its wrapper and verifier (provides lead intake / response / missed-lead / appointment tracking patterns)
- Go-Live Readiness (upstream precondition source): `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md` + its wrapper and verifier (provides PASS go-live decision, setup-to-trial handoff, trial terms verbatim, data protection checkpoint)
- Guided Setup (upstream source): `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` + its wrapper and verifier (worksheets referenced for contact prefs, reporting expectations, and first-month support boundaries)
- Launch system (primary container + handoff target for first-month operating, weekly value reports, success review outcome, ongoing monthly): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier (receives first-month success review outcome + handoff artifact + updated customer status + weekly value snapshots; contains the ongoing customer success / monthly operations sections that this kit feeds)
- Website trial direction regression (language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md, FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md, and the full suite of first-roofer manual command packets for any execution detail during first-month reviews.
- This kit's wrapper: `scripts/run-first-paid-roofer-first-month-operating-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js`

---

## 1. Internal-only dry-run scope

**Internal-only / founder-operator-only. This entire kit is manual first-month operating readiness and customer success tracking only.** Internal only: founder-operator manual steps only.

- All steps are founder/operator manual kickoff execution, paid customer status confirmation, lead intake / response / missed-lead / appointment tracking reviews (weekly rhythm), weekly value report preparation (manual compilation of sanitized metrics), roofer feedback and support review, cancellation-risk and blocker review, first-month issue escalation register maintenance, monthly success review agenda/script execution, ongoing monthly operations handoff artifact production, First-Month PASS/HOLD/BLOCKED decision gate.
- No live systems, no external calls, no production data access, no automation activation of any kind. All evidence, trackers, drafts, value report notes, feedback notes, and status notes remain local/internal; nothing is sent from this kit.
- Use only after Trial Conversion / Payment Handoff Kit has produced a Conversion PASS + first monthly payment confirmation (or equivalent post-payment start) and all prior gates (Day One + Go-Live + Reporting + Conversion) are green.
- Copy-paste trackers locally; do not store in production systems. All first-month operating data handled as sanitized notes or local copies only.
- Re-confirm every safety item in section 17 before starting kickoff, before each weekly cycle, before value report prep, before feedback review, before risk review, before success review, before handoff, and before decision gate.
- This kit receives handoff from Trial Conversion / Payment Handoff Kit and feeds the Launch System Packet ongoing monthly / customer success sections. It does not duplicate full Launch System operating content.
- Data protection / tenant isolation checkpoint re-confirmed at every gate (single-tenant manual controls only; refs logged).

## 2. First-month operating purpose

**Internal-only / founder-operator-only.**

After the first monthly payment confirmation (per Trial Conversion / Payment Handoff Kit) and clean post-trial status handoff, execute the manual first-month operating system that demonstrates value to the roofer, maintains lead/appointment health, surfaces feedback and risks early, prepares weekly value reports, runs a structured monthly success review, and produces a clean handoff into ongoing monthly operations (or cancellation if risks materialize). The first month begins after the first monthly payment confirmation.

- Run first-month kickoff checklist (section 4) to align on cadence, reporting, support boundaries, and success criteria using only approved public language.
- Confirm paid customer status (section 5) in Launch System / prospect tracker / internal status (payment received, first-month start date locked, billing tier active, contact channels confirmed).
- Execute lead intake operating rhythm (section 6): weekly manual review of new leads captured via the flow, source performance, completeness.
- Execute response and follow-up monitoring rhythm (section 7): review drafts/outcomes against roofer prefs (manual only), flag gaps.
- Execute missed-lead recovery review rhythm (section 8): identify candidates, manual recovery paths, outcome logging.
- Track booked homeowner appointments (section 9): proposed/confirmed/completed via the defined flow (sanitized; "booked homeowner appointments" term only).
- Prepare weekly value reports (section 10): manual compilation of leads, recovery rate, booked homeowner appointments, response metrics, value highlights; prepare for delivery to roofer.
- Run roofer feedback and support review (section 11): capture what is working, friction points, support needs; update boundaries.
- Run cancellation-risk and blocker review (section 12): monitor health signals, payment issues, usage drop-off, explicit risk register.
- Maintain first-month issue escalation register (section 13): concrete issues, owners, due dates, resolution paths.
- Execute monthly success review (section 14): agenda + script using approved public language only; capture outcome.
- Produce ongoing monthly operations handoff (section 15): artifact with trackers snapshot, value summary, open items, support cadence for steady-state.
- Execute First-Month PASS/HOLD/BLOCKED decision gate (section 16) with full evidence and handoff to Launch System (or cancel path).
- All steps are manual compilation, logging, review, and rehearsal only. No live automation, no production writes. first-month kickoff checklist. manual first-month operating. PASS/HOLD/BLOCKED. The 14-day trial begins after RoofLeadHQ AI setup goes live.

The first month begins on the date the first monthly payment is confirmed (or agreed post-conversion start date from Trial Conversion handoff). This kit activates only on post-payment path. It produces the first-month health record and handoff so ongoing support can shift from first-month intensity to steady-state monthly rhythm inside the Launch System Packet.

## 3. Inputs from Trial Conversion / Payment Handoff

**Internal-only / founder-operator-only. Required before this kit can be used for first-month operating.**

From `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md` outputs (plus Launch System Packet):

- Conversion PASS decision from Trial Conversion / Payment Handoff Kit section 14 (or explicit payment confirmation logged).
- First monthly payment confirmation evidence (date, method, amount, receipt ref — sanitized; manual channel only).
- First-month operating expectations (cadence, reporting rhythm, support boundaries, escalation contacts) from section 11 of conversion kit.
- Post-trial customer status tracker entry (status "FIRST MONTH ACTIVE", payment date, first review scheduled, open items carried forward).
- Final snapshot of relevant trackers from conversion kit (Post-Trial Customer Status Tracker, First-Month Operating Expectations Tracker, Payment Handoff Readiness Tracker) + prior 9 from reporting kit as baseline.
- Roofer approval evidence snapshot (re-stated for context).
- Payment and billing blocker register final snapshot (no OPEN BLOCKED at payment; any carried items).
- Safety guardrails re-confirmation logged at conversion gate.
- Aggregate verifier outputs (conversion kit + reporting + day-one + go-live + launch + pilot + quality gate) at conversion gate.
- Go-Live handoff artifact and prior trial artifacts referenced for continuity (terms, data protection, prefs).
- Launch System Packet first monthly payment handoff checklist state + section 8/9/ongoing customer notes.
- Guided Setup worksheets for billing tier confirmation, contact prefs, reporting expectations.
- Prospect tracker entry for this roofer currently at "Paying — First Month" or equivalent post-conversion.
- Explicit confirmation: manual first-month operating window secured; decision maker available; no live automation.

If any critical input is missing or conversion was not PASS (or payment not confirmed), mark this kit HOLD immediately and route back to Trial Conversion / Payment Handoff Kit owner + Launch System Packet owner with owner/date.

Cross-reference: Trial Conversion / Payment Handoff Kit section 11/12/14, Launch System Packet sections 8/9/ongoing.

## 4. First-month kickoff checklist

**Internal-only / founder-operator-only. Gate after inputs confirmed and before first weekly rhythm begins.**

Collect and log the minimum kickoff evidence from the Trial Conversion / Payment Handoff handoff + payment confirmation:

- [ ] First monthly payment confirmation logged (date, amount, method, receipt/manual confirmation ref).
- [ ] First-month operating expectations from conversion kit reviewed and acknowledged with roofer (cadence, weekly value reports, support boundaries, cancel reminder).
- [ ] Paid customer status confirmed in internal systems / Launch System / prospect tracker ("Paying — First Month", billing tier, start date, next billing reminder date).
- [ ] Contact channels and response preferences re-confirmed (from Guided Setup + trial).
- [ ] Reporting expectations aligned (what weekly value report will contain; frequency; delivery method — manual).
- [ ] Success criteria for first month defined and shared (leads volume signals, booked homeowner appointment health, response time adherence, feedback loop; no guarantees).
- [ ] Cancellation-risk signals defined (usage drop, complaint volume, payment issues, missed follow-ups) and review rhythm set.
- [ ] First-Month Kickoff Tracker populated with all items.
- [ ] Safety guardrails re-confirmation quote logged at first-month kickoff.
- [ ] Aggregate verifier outputs (this kit + conversion + reporting + day-one + go-live + launch + pilot + quality gate) pasted with PASS lines.
- [ ] Data protection / tenant isolation checkpoint re-confirmed for first-month artifact handling.
- [ ] Launch System Packet / prospect tracker entry ready for update post-kickoff.

Update First-Month Kickoff Tracker with status + evidence for each item.

HOLD if any critical evidence missing with no 24h resolution path. BLOCKED if payment confirmation missing or safety re-confirmation missing.

## 5. Paid customer status confirmation

**Internal-only / founder-operator-only. Explicit paid status required before any first-month operating rhythm or value reporting.**

Confirm and log the roofer's paid customer status post first monthly payment:

- Record date/time of payment confirmation + method (manual channel per prior agreement).
- Billing tier and amount confirmed (per published pricing; internal record only).
- Next billing reminder / automated email timing noted (per "An automated email is sent 2 days before the first monthly payment" rule from prior; manual rehearsal only).
- "Cancel anytime. No long-term contract." re-stated and logged (in kickoff notes or first value report cover).
- Status classification: PAYING — FIRST MONTH / PAYMENT CONFIRMED / HOLD (payment pending clarification) / CANCELLED (if retroactive no-go).
- Update Launch System Packet customer status + prospect tracker (sanitized).
- Re-confirm safety guardrails before recording status.
- Log in Paid Customer Status Tracker + cross-ref First-Month Kickoff Tracker.

Status for gate: only PAYING — FIRST MONTH with full evidence advances to lead intake rhythm. HOLD requires documented follow-up plan + re-contact within 48h. Any cancel routes to cancellation handling (section 12/16).

## 6. Lead intake operating rhythm

**Internal-only / founder-operator-only. Weekly manual review of leads captured via the defined flow (fast response + automated follow-up + missed-lead recovery).**

Rhythm (repeat weekly during first month; start after kickoff):

- Morning of review day: pull sanitized lead list / source breakdown for the week (local notes only; no prod access).
- Review per-source: volume, format completeness, missing-field rate, source quality signals.
- Flag any intake gaps vs. Guided Setup expectations (e.g., missing contact info, bad source mix).
- Log outcomes in Lead Intake Operating Tracker.
- Prepare summary for weekly value report (sanitized numbers + qualitative notes only).
- Re-confirm no live intake automation or external calls.

Update Lead Intake Operating Tracker with owner/status/evidence/next-action for each review cycle.

HOLD if intake volume drops >50% week-over-week with no roofer explanation. BLOCKED if data protection boundary crossed or forbidden language appears in any notes.

## 7. Response and follow-up monitoring rhythm

**Internal-only / founder-operator-only. Weekly manual review of response/follow-up against roofer prefs (manual drafts only; no live dispatch).**

Rhythm (aligned with lead intake):

- Review sample of recent leads: initial response draft quality/timing vs. roofer prefs captured in Guided Setup / trial.
- Review follow-up cadence adherence (manual touches only; max attempts, stop conditions).
- Flag any deviation or homeowner friction in follow-up path.
- Confirm all homeowner comms used only approved language (RoofLeadHQ AI turns roofing leads into booked homeowner appointments...).
- Log draft review notes (never sent) and outcome signals.
- Log in Response Follow-Up Monitoring Tracker.
- Re-confirm: no live SMS, no Resend, no automation of follow-up.

Update Response Follow-Up Monitoring Tracker. Any BLOCKED (e.g., roofer reports live sends happened outside this kit) escalates immediately per section 13.

## 8. Missed-lead recovery review rhythm

**Internal-only / founder-operator-only. Weekly manual review of missed-lead candidates and recovery paths (manual only).**

Rhythm:

- Identify leads that did not receive timely response or follow-up per prefs (from local tracking).
- Log manual recovery actions taken (or planned) by founder/operator or roofer.
- Capture outcome: recovered to booked homeowner appointment / still open / lost.
- Note root causes (source quality, timing, prefs mismatch) for weekly value report.
- Log in Missed-Lead Recovery Review Tracker.
- Re-confirm: recovery is manual review + manual outreach only; no cron, no Lindy, no dispatcher.

Update Missed-Lead Recovery Review Tracker each cycle. Target: demonstrate improvement trend or clear plan.

## 9. Booked homeowner appointment tracking

**Internal-only / founder-operator-only. Weekly manual tracking of homeowner appointments booked via the defined flow (fast response, automated follow-up, missed-lead recovery).**

Rhythm:

- Log each booked homeowner appointment candidate: lead source, response time, follow-up count, recovery step (if any), confirmation status (proposed / confirmed / completed / no-show / cancelled by homeowner).
- Use exact term "booked homeowner appointments" in all logs and reports.
- Never use "book jobs", "booked jobs", "guaranteed appointments", "You book the inspection".
- Cross-reference to roofer feedback (did the appointment happen? quality?).
- Sanitize all PII; local notes only.
- Summarize for weekly value report: total proposed, confirmed, completed via flow.
- Update Booked Homeowner Appointment Tracker.
- Re-confirm manual-only; no calendar automation, no external booking system activation.

Update Booked Homeowner Appointment Tracker. PASS trend supports first-month success; sustained zero or drop is HOLD/BLOCKED signal.

## 10. Weekly value report preparation

**Internal-only / founder-operator-only. Manual preparation of weekly value report for roofer (never auto-sent).**

Preparation steps (end of each week):

- Compile sanitized metrics from sections 6-9: leads by source, response/follow-up adherence, missed-lead recovery rate, booked homeowner appointments (proposed/confirmed/completed), qualitative wins (e.g., "fast response on high-intent lead from website").
- Include first-month context vs. trial baseline where relevant.
- Draft cover note using only approved public language: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Reference Guided Setup, 14-day trial (completed), ongoing value, Cancel anytime. No long-term contract.
- Prepare 1-2 concrete examples (anonymized) of value delivered.
- Flag any open issues from escalation register for discussion.
- Rehearse delivery method (manual email / call / shared note).
- Log draft location, version, metrics snapshot in Weekly Value Report Tracker.
- Safety: no Resend, no automation; this is manual prep + manual delivery planning only.

Update Weekly Value Report Tracker. Report is rehearsal artifact only until manually delivered.

## 11. Roofer feedback and support review

**Internal-only / founder-operator-only. Structured capture of roofer feedback during first month (manual channels only).**

Rhythm (at least weekly in value report cycle + ad-hoc):

- Capture: what is working (response speed, follow-up quality, missed-lead recovery impact), friction points (lead quality, timing, volume, reporting), requested adjustments (within manual bounds), support needs.
- Record method (email/text/call note — sanitized) + date + key quotes.
- Map feedback to action: update expectations, escalate blocker, adjust review cadence, or note for success review.
- Confirm no founder-led/manual babysitting claims in any response to roofer.
- Log in Roofer Feedback Support Tracker + cross-ref relevant weekly value report.
- Re-confirm support boundaries: founder/operator manual review only during this first-month window; no promises of ongoing founder review in customer language.

Update Roofer Feedback Support Tracker. Positive trend or actionable feedback supports PASS path; unresolved complaints or expectation mismatches are HOLD/BLOCKED signals.

## 12. Cancellation-risk and blocker review

**Internal-only / founder-operator-only. Weekly explicit risk scan for cancellation signals or blockers during first month.**

Rhythm:

- Scan signals: drop in lead volume/usage, slow response to value reports, payment issues (late or dispute), negative feedback volume, missed appointments, roofer non-responsiveness, external complaints.
- Maintain Cancellation-Risk Register (separate from general blockers): date, signal, severity (HIGH/MED/LOW), owner, mitigation plan, due.
- Review general blocker register from prior kits + new first-month issues.
- Any HIGH risk triggers immediate escalation (section 13) and success review prep.
- Log in Cancellation-Risk and Blocker Review (or dedicated tracker fields).
- Re-confirm: no payment automation or billing changes; any billing concern routes to manual handoff notes only.
- Update relevant trackers (Roofer Feedback Support Tracker, First-Month Issue Escalation Register).

Sustained HIGH cancellation-risk without mitigation is BLOCKED at first-month gate.

## 13. First-month issue escalation register

**Internal-only / founder-operator-only. Living register for concrete first-month issues requiring founder/operator attention or roofer action.**

- Every issue: date logged, description (sanitized), category (lead quality / response friction / feedback / billing / usage / other), owner (founder/operator or roofer), due date, evidence ref, resolution plan, current status (OPEN / IN PROGRESS / RESOLVED / ESCALATED), next action.
- Re-evaluate at every weekly cycle and before success review.
- Any issue touching live automation, secrets, or forbidden language: immediate BLOCKED + safety re-confirm.
- Cross-ref to cancellation-risk if relevant.
- Update First-Month Issue Escalation Register (use or extend the escalation tracker below; log in main register).

HOLD any first-month gate until critical issues have clear owners/dates. BLOCKED if data protection or safety boundary violated.

## 14. Monthly success review agenda and script

**Internal-only / founder-operator-only. Structured end-of-first-month review call (or equivalent) with the roofer. Uses approved public language only in spoken/written portions shared with roofer.**

### Agenda (30-45 min target)

1. Welcome + re-state purpose (value demonstration + first-month health check).
2. Review weekly value highlights (from reports): leads, booked homeowner appointments via the flow, recovery impact (sanitized).
3. Roofer feedback: what worked, what to adjust (capture in tracker).
4. Health check: response/follow-up adherence, missed-lead recovery, appointment outcomes.
5. Support boundaries + cadence for ongoing (if continuing).
6. Cancellation-risk / blocker review (if any open).
7. Explicit decision: continue to ongoing monthly operations (PASS) / needs more time/adjustment (HOLD) / stop (CANCEL).
8. Next steps + handoff summary.

### Script excerpts (use verbatim in customer-facing portions; approved language only)

- "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
- "Guided Setup happened first. The 14-day trial began after RoofLeadHQ AI setup went live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."
- "This first-month review looks at how the system performed for your leads and appointments. Here are the numbers we tracked manually..."
- "What feedback do you have on the leads, response quality, or follow-up?"
- "If we continue, the ongoing rhythm will be [cadence per first-month expectations]."
- "If you'd like to stop at any time, just let us know — cancel anytime, no long-term contract."

### Outcome Capture
- Record date, attendees, key quotes (sanitized), roofer decision (CONTINUE / MORE TIME / STOP).
- Update First-Month Success Review Tracker + all prior trackers snapshot.
- Re-confirm safety + language before closing call.
- Decision feeds section 16 gate.

## 15. Ongoing monthly operations handoff

**Internal-only / founder-operator-only. Produce clean handoff artifact after successful first-month review (or on gate PASS).**

Handoff artifact contents (insert into Launch System Packet ongoing sections + prospect/customer status):

- Timestamp + context (end of first month).
- First-month success review outcome + roofer decision quote (sanitized).
- Snapshot of all 9 first-month trackers + weekly value report summaries.
- Open items / blockers / cancellation-risk status (with owners/due).
- Ongoing cadence: weekly value report rhythm (manual), monthly health check, escalation path, support boundaries.
- First-month metrics summary (leads, booked homeowner appointments via flow, recovery rate, feedback themes).
- Payment / billing status note (manual; next automated email reminder timing noted).
- Data protection / tenant isolation checkpoint confirmation.
- Verifier run outputs (this kit + conversion + reporting + day-one + go-live + launch + pilot + quality gate).
- Safety guardrails re-confirmation quote.
- Next manual action: (transition to steady-state monthly in Launch System / schedule next review / archive on cancel) + owner + due.

Update Launch System Packet and internal customer status. Only clean PASS handoff advances to ongoing monthly operations.

## 16. First-month PASS/HOLD/BLOCKED decision gate

**Internal-only / founder-operator-only. Final gate for first-month to ongoing monthly transition. Only PASS with full evidence advances to ongoing monthly operations handoff and steady-state status in Launch System Packet.** final gate. Only PASS advances.

### First-Month Decision Criteria (all must support PASS)

- First-month kickoff checklist complete (section 4) with all items logged and paid status confirmed.
- Paid customer status: PAYING — FIRST MONTH confirmed with evidence (section 5).
- Lead intake, response/follow-up, missed-lead recovery, and booked homeowner appointment trackers show consistent review cycles with evidence (sections 6-9).
- At least 4 weekly value reports prepared (or prorated per first-month length) with sanitized metrics and approved language (section 10).
- Roofer feedback and support review complete with actionable log (section 11).
- Cancellation-risk and blocker review: no active HIGH risk without mitigation; general blockers have owners/due (section 12).
- First-month issue escalation register: no OPEN BLOCKED items; any HOLD have clear owners/due (section 13).
- Monthly success review executed with explicit roofer decision captured (section 14).
- Ongoing monthly operations handoff artifact fully populated (section 15).
- Safety guardrails (section 17) re-read and logged within last 12h; all OFF.
- Aggregate verifiers (this kit + conversion + reporting + day-one + go-live + launch + pilot + quality gate) green.
- No production automation of any kind.
- Explicit roofer continue decision (or equivalent) + no unresolved high-risk signals.
- First-Month Success Review Tracker + handoff log fully populated.

### Decision

Status: [ ] PASS (first-month healthy; handoff artifact ready; proceed to ongoing monthly operations per Launch System Packet) [ ] HOLD (gaps with owners/dates; re-review after clear; may extend first-month intensity) [ ] BLOCKED (critical issues, sustained cancellation-risk, missing feedback loop, or roofer elects to stop; escalate per cancellation path immediately)

Evidence Log entry required (paste into First-Month Success Review Tracker + Ongoing Monthly Handoff + Launch System Packet + prospect tracker):

- Timestamp + context (end of first month / post success review)
- Operator/founder
- Verifier run outputs (this kit + conversion + reporting + day-one + go-live + launch + pilot + quality gate)
- Safety guardrails re-confirmation quote
- Full blocker + cancellation-risk register snapshot
- Roofer decision quote (sanitized) + feedback summary ref
- 9 trackers + weekly value report summaries + first-month metrics
- Ongoing monthly operations handoff artifact version + location
- Next manual action: (transition to steady-state / schedule ongoing reviews / cancel archive) + owner + due

Only PASS advances to ongoing monthly operations inside the Launch System Packet. HOLD requires documented re-review plan + roofer communication within 48h. BLOCKED routes to cancellation handling (adapt section 10 from conversion kit or Launch System cancellation section) + archive.

Update paid customer status and insert summary into Launch System Packet ongoing sections + prospect tracker.

## 17. Safety guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before first-month kickoff, before each weekly cycle (lead intake/response/recovery/appointment/value report), before feedback review, before cancellation-risk review, before issue escalation, before monthly success review, before ongoing handoff, before First-Month gate, and before any handoff to Launch System. All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer first-month operating unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only first-month operating readiness and customer success tracking: YES (this kit produces checklists, trackers, evidence logs, decision logs, value report drafts, feedback logs, risk registers, escalation notes, success review notes, handoff artifacts, and status updates only)
- Draft-only readiness notes, value reports, and artifact prep: YES (all reviews captured as internal drafts for manual coordination planning)
- No live send: YES (no Twilio, Resend, or any production message dispatch)
- No automated follow-up: YES
- No CRM automation: YES
- No calendar booking automation: YES (explicit manual handling only)
- No payment automation: YES (manual status tracking and reminder notes only; no billing engine)
- No external service calls: YES (no Twilio, Vapi, Resend, Lindy, Stripe, Google Calendar API writes, or any live integrations)
- No production Supabase writes: YES
- No public route activation: YES
- No contractor portal exposure: YES
- No auth/RLS/security implementation: YES (zero schema, zero policies, zero secrets, zero auth code)
- No estimates, quotes, invoices, or payment workflows: YES (this kit never touches or claims any of these; manual status notes only)
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
- Payment automation (billing engine, invoice generation, or first-month/ongoing payment collection automation): NONE (manual status tracking only)
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
- Live SMS / Twilio / Vapi / Calendar / Resend / Lindy / cron / scheduler / dispatcher: no
- References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md at every gate
- Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none.

Re-initial safety markers in Evidence Log before each weekly cycle and gate.

## 18. Public-vs-internal language boundary

**Customer-facing first-month communications, weekly value report excerpts shared with the roofer, success review script portions spoken/written to the roofer, feedback responses, handoff notes shared with roofer, and any status updates shared externally must use ONLY the approved public/business language. Internal founder/operator/manual/dry-run language is confined to explicitly labeled sections and never appears in customer-facing content.** Customer-facing language must not use founder-led/manual babysitting/public founder-review framing.

### Allowed customer-facing / public strings (exact match required in all customer-facing sections, reports, scripts, and handoff excerpts)
- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All value report covers, success review spoken portions, and roofer-shared notes must restate the core framing above and avoid any implication of founder babysitting, manual review as a selling point, guarantees, auto-booking, or day-15 billing.

### Internal founder/operator/manual review language (allowed ONLY inside explicitly labeled internal-only sections)
Examples of permitted internal-only phrasing (confined to sections 1, 2, 4-17, trackers internal notes, evidence logs, blocker registers): "founder/operator manual review", "dry-run internal planning", "manual coordination for this first-month window", "Live Automation Disabled (internal posture only)", "internal founder review queue notes", "manual first-month operating readiness". These must never be copied into customer communications, value reports delivered to roofer, success review scripts, Launch System customer-facing sections, website, or any public/prospect material.

### Explicitly Labeled Internal-Only Sections in This Kit
- All sections 1-17 (except approved strings embedded in customer-facing examples)
- All 9 tracker tables (owner/status/evidence/next-action fields are internal execution tools)
- Evidence Log entries, blocker/risk registers, escalation register
- Safety guardrails (section 17)
- Any "Internal-only / founder-operator-only" callouts
- Cross-reference notes to other internal packets

Customer-facing trial closeout communications, payment handoff notes, first-month expectations excerpts, weekly value reports delivered, success review call scripts, feedback responses, and ongoing handoff notes shared with the roofer must be scanned for forbidden phrases before use. The verifier enforces the boundary on this kit's customer-facing content. Internal language stays in dry-run safety artifacts only.

If any customer-facing excerpt accidentally includes forbidden phrasing, mark BLOCKED, correct using only the approved list above, re-log, and re-run verifiers before any manual delivery.

---

## 9 Copy-Paste-Ready Manual Tracker Tables

Copy the tables below into a local spreadsheet, notes doc, or whiteboard. Do not store production data. All fields: Owner (founder/Jason or specific operator), Status (PASS/HOLD/BLOCKED/OPEN/IN PROGRESS/RESOLVED/CONFIRMED/READY/etc.), Evidence (local ref, quote, date, link to screenshot/note), Next Action (concrete step + due date).

### First-Month Kickoff Tracker

| Item | Owner | Status | Evidence | Next Action |
|------|-------|--------|----------|-------------|
| First monthly payment confirmation logged | | | | |
| First-month operating expectations reviewed/acked | | | | |
| Paid customer status updated in Launch/prospect tracker | | | | |
| Contact channels + prefs re-confirmed | | | | |
| Reporting expectations aligned | | | | |
| Success criteria defined and shared (no guarantees) | | | | |
| Cancellation-risk signals defined + review rhythm set | | | | |
| Safety guardrails re-confirmation logged | | | | |
| Aggregate verifiers green at kickoff | | | | |
| Data protection / tenant isolation checkpoint logged | | | | |

### Paid Customer Status Tracker

| Roofer | Payment Date/Method/Amount (sanitized) | Status | Billing Tier | Next Billing Reminder Note | Owner | Evidence | Next Action |
|--------|---------------------------------------|--------|--------------|----------------------------|-------|----------|-------------|
| | | PAYING — FIRST MONTH | | | | | |
| | | | | | | | |

### Lead Intake Operating Tracker

| Week | Review Date | Leads by Source (sanitized) | Completeness / Missing-Field Rate | Source Quality Notes | Owner | Status | Evidence | Next Action |
|------|-------------|-----------------------------|-----------------------------------|----------------------|-------|--------|----------|-------------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |

### Response Follow-Up Monitoring Tracker

| Week | Sample Leads Reviewed | Response Time vs Prefs | Follow-Up Adherence (manual only) | Friction / Deviation Notes | Approved Language Confirmed | Owner | Status | Evidence | Next Action |
|------|-----------------------|------------------------|-----------------------------------|----------------------------|-----------------------------|-------|--------|----------|-------------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |

### Missed-Lead Recovery Review Tracker

| Week | Missed-Lead Candidates Identified | Manual Recovery Actions | Outcomes (recovered / open / lost) | Root Cause Notes | Recovery Rate Trend | Owner | Status | Evidence | Next Action |
|------|-----------------------------------|-------------------------|------------------------------------|------------------|---------------------|-------|--------|----------|-------------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |

### Booked Homeowner Appointment Tracker

| Week | Booked Homeowner Appointments Proposed | Confirmed | Completed via Flow | No-Show / Cancelled | Lead Source + Recovery Step (if any) | Owner | Status | Evidence | Next Action |
|------|----------------------------------------|-----------|--------------------|---------------------|--------------------------------------|-------|--------|----------|-------------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |

### Weekly Value Report Tracker

| Week Ending | Report Version / Draft Location | Key Metrics (leads, recovery rate, booked homeowner appointments) | Value Highlights (sanitized, approved language only) | Delivery Method Planned | Owner | Status | Evidence | Next Action |
|-------------|---------------------------------|-------------------------------------------------------------------|------------------------------------------------------|-------------------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

### Roofer Feedback Support Tracker

| Date | Feedback Channel | Key Quotes / Themes (sanitized) | What Worked | Friction / Requests | Action Taken / Owner / Due | Status | Evidence | Next Action |
|------|------------------|---------------------------------|-------------|---------------------|----------------------------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

### First-Month Success Review Tracker

| Review Date | Attendees | Roofer Decision (CONTINUE / MORE TIME / STOP) | Key Metrics Snapshot | Feedback Summary | Open Blockers / Risks | Handoff Artifact Ref | Owner | Status | Evidence | Next Action |
|-------------|-----------|-----------------------------------------------|----------------------|------------------|-----------------------|----------------------|-------|--------|----------|-------------|
| | | | | | | | | | | |

---

**End of FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md**

All content above is concrete, operational, product-moving, and confined to dry-run/internal-only/founder-operator-only use. No production activation. Verifier will enforce all requirements.
