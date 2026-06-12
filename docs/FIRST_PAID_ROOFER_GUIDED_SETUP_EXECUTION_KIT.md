# First Paid Roofer Guided Setup Execution Kit

Date: 2026-06-11

## Purpose

This is the practical manual execution system Jason (founder/operator) can use after the first paid roofer says yes: collect setup information, confirm lead sources, define response/follow-up preferences, capture booking/calendar preferences, confirm reporting expectations, identify go-live blockers, and hand off into the existing First Paid Roofer Launch System Packet for RoofLeadHQ.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, and evidence logs are internal-only / dry-run / founder-operator-only. This is a manual setup execution kit, not automation. No public founder-led/manual babysitting positioning is used for customers or prospects.

This kit is product-moving and operationally usable: it contains the concrete Guided Setup intake checklist, roofer business profile worksheet, lead source setup worksheet, response and follow-up preferences worksheet, booking and calendar preferences worksheet, reporting preferences worksheet, setup risk and blocker register with explicit PASS/HOLD/BLOCKED rules, Guided Setup call agenda, full Guided Setup script using only allowed customer-facing language, go-live readiness checklist, setup-to-launch handoff artifact, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer Guided Setup using only this document + the referenced Demo Close Execution Kit + Launch System Packet + Prospect Pipeline Tracker Packet + Data Protection/Tenant Isolation Plan Placement Packet + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-yes / post-close manual execution layer for Guided Setup. It complements (does not replace) the handoff from Demo Close Execution Kit and feeds directly into the Launch System Packet. It focuses on setup information collection, confirmation of preferences, blocker identification, and clean handoff artifacts. Jason (founder/operator) uses this kit after a confirmed close/yes to run the Guided Setup session(s), capture details safely, gate go-live readiness, and hand off.

This kit file: `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js`

## Scope

- First paid roofer Guided Setup (the first real contractor who will pay after the 14-day trial).
- All stages after close/yes: intake confirmation, business profile capture, lead source setup, response/follow-up preferences, booking/calendar preferences, reporting preferences, risk/blocker register, call agenda and script execution, go-live readiness gating, and handoff to Launch System Packet.
- Internal founder/operator worksheets, decision trees, logs, blocker register, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 13) that must be re-confirmed before every setup prep, call, decision, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (go-live readiness, 14-day trial, first payment, etc.). References upstream packets for context only.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in section 13/14 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, manual prep, manual call execution (phone/video), note-taking, worksheet filling, decision logging, and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live trial ops, first payment, or automation. Those are covered in the Launch System Packet after handoff.
- No prospect/customer-facing or public copy may use internal-only language (see section 14). Internal founder/operator/manual language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate demo/close content (see Demo Close Execution Kit) or full launch operating (see Launch System Packet).

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, customer-facing, setup script, agenda, customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 13 and 14.

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

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety).

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js
scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Demo + close (upstream handoff source): `docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md` + its wrapper and verifier
- Launch system (primary handoff target): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier
- Prospect identification/tracking base: `docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md, FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md, ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_* packets (for execution detail patterns only)
- This kit's wrapper: `scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js`

---

## 1. Guided Setup Intake Checklist

**Internal-only / founder-operator-only. Complete this before and during the first Guided Setup session with the closed/won roofer. Gate: must be PASS before advancing past intake.**

Use after confirmed close/yes from Demo Close Execution Kit handoff.

- [ ] Closed/won confirmation (capture verbatim close language or decision log reference from Demo Close Execution Kit; confirm "yes, proceed to Guided Setup")
- [ ] Decision-maker confirmation (owner, authorized payer, or explicit delegate with budget authority present or on record)
- [ ] Trial terms confirmed (read back and get affirmative: Guided Setup happens first; 14-day trial begins after RoofLeadHQ AI setup goes live; automated email sent 2 days before first monthly payment; cancel anytime; no long-term contract)
- [ ] Guided Setup first (explicitly confirmed that setup collection and go-live configuration happens before any trial period begins)
- [ ] 14-day trial begins only after setup goes live (confirmed understanding — no trial clock starts on signature or "yes")
- [ ] Automated email 2 days before first monthly payment (confirmed understanding of pre-payment notice)
- [ ] Cancel anytime (confirmed)
- [ ] No long-term contract (confirmed)
- [ ] Setup owner (who inside roofer business owns providing lead source details, calendar access intent, preference answers; who is primary contact for setup session)
- [ ] Setup target date (agreed window for Guided Setup session(s) and target go-live)
- [ ] Missing information gate (any critical field unknown at end of intake session marked HOLD with owner + due date)
- [ ] PASS/HOLD/BLOCKED setup status (see rules in section 7)

Record gate decision + 1-line rationale + timestamp in Guided Setup Intake Queue (section 12) and Evidence Log.

Re-confirm section 13 Safety Guardrails before advancing.

## 2. Roofer Business Profile Worksheet

**Internal-only / founder-operator-only. Capture during Guided Setup intake session. Do not treat as public profile.**

- Company name (legal + DBA if different)
- Owner/contact (name, role, phone, email, preferred comms)
- Service area (primary zips/cities + radius or counties; note any travel limits)
- Roofing services offered (residential roof replacement, repair, storm, commercial, gutters, etc. — list explicitly)
- Lead types accepted (e.g. roof replacement inquiries, storm leads, repair only)
- Lead types rejected (e.g. commercial flat roof outside scope, out-of-area, price shoppers only)
- Office hours (days/times for lead handling expectations; after-hours policy)
- Emergency/storm response expectations (do they want fast after-hours handling for storm leads? typical SLA?)
- Preferred homeowner contact style (professional, direct, friendly, urgent, etc.)
- Brand/tone notes (voice, key phrases they use or avoid with homeowners)
- Bad-fit homeowner scenarios (examples of leads they do not want time spent on; e.g. "only wants price, not serious")
- Notes/evidence (any screenshots of current ads, website, CRM notes, prior conversation quotes)

Print or copy this worksheet locally. Fill live during session. Re-confirm safety before session.

## 3. Lead Source Setup Worksheet

**Internal-only / founder-operator-only.**

- Lead sources currently used (Google LSA, Angi/HomeAdvisor, Thumbtack, Facebook/IG ads, website forms, referrals, other — list each)
- Estimated monthly lead volume (per source + total; note how estimated)
- Paid vs organic lead mix (rough % or counts)
- Source quality notes (any known issues: duplicate leads, low intent, bad geography, high CPL)
- Expected lead formats (email, SMS, webhooks, manual forward, CSV export, phone call from platform)
- Required lead fields (name, phone, email, address, zip, source tag, notes, etc. — what arrives today)
- Missing-field handling (what to do if phone or zip missing; prefer manual review flag vs drop)
- Lead source owner (who at roofer business can grant access or provide sample leads)
- Lead source access status (credentials available for review? read-only export? manual forward only? screenshot examples captured?)
- Manual-only access notes (how we will receive sample leads during dry-run / setup only — e.g. forwarded emails, shared folder)
- HOLD/BLOCKED conditions (see section 7 for explicit rules; e.g. no access to any lead source data = BLOCKED for go-live)

Record unknowns as blockers immediately.

## 4. Response and Follow-up Preferences Worksheet

**Internal-only / founder-operator-only.**

- Initial response style (tone: professional/direct, friendly/warm, urgent, short; sample first-message language they like or use today)
- Preferred urgency framing (how quickly they want AI to reply on their behalf; any "within X min" target)
- Follow-up cadence preference (timing for touch 2, touch 3; e.g. +4h, +24h, +48h)
- Maximum follow-up attempts (e.g. 3 total including first; or stop after N days)
- Stop conditions (homeowner replies, books, says "stop", no reply after N days, wrong number, etc.)
- Do-not-contact rules (any lists, prior opt-outs, specific homeowners to exclude)
- Consent/permission notes (how they currently handle SMS consent; any TCPA notes or internal policy)
- Escalation triggers (when to surface to human: specific keywords, high-value zip, storm lead, multiple unanswered)
- Owner review requirement (do they want all first responses reviewed before send in early trial? or only exceptions?)
- Draft approval status (current drafts approved / need revision / examples captured)
- Manual-only guardrails (all follow-up during setup and early trial is manual review/coordination only; no live automation)

## 5. Booking and Calendar Preferences Worksheet

**Internal-only / founder-operator-only.**

- Inspection booking goal (target: how many inspections per week/month from leads during trial; what success looks like)
- Preferred appointment windows (days/times they typically offer inspections; e.g. M-F 8-5, Sat mornings)
- Service-area travel constraints (max drive time one way; any zip clusters they prefer to batch)
- Same-day/next-day availability rules (do they offer same-day for hot leads? next-day standard? weekend policy?)
- Weather/storm constraints (any blackouts for heavy rain, high wind; how they adjust scheduling in storm season)
- Required homeowner information before booking (must have full address + phone + rough scope before proposing slot?)
- Contractor confirmation requirements (do they or a scheduler need to confirm the slot before it's "booked", or can AI propose and confirm directly in dry-run notes)
- Calendar access status (Google/Outlook? read-only link available? can share specific calendar? manual export only for now)
- Manual calendar handling only (during this Guided Setup and initial trial: all booking coordination is manual copy into calendar; no API writes)
- No calendar automation (explicit confirmation: no live booking, no auto events, no Vapi voice booking)
- Unknowns and blockers (any open questions on availability rules, travel, confirmation flow)

## 6. Reporting Preferences Worksheet

**Internal-only / founder-operator-only.**

- Weekly report expectations (what metrics, format preference, delivery method during trial)
- Monthly report expectations (summary of trial performance; lead-to-appointment conversion view)
- Metrics the roofer cares about (leads handled, response time avg, follow-ups sent, appointments proposed/booked, missed-lead recovery count, homeowner reply rate)
- Lead status categories (new, responded, follow-up 1/2, qualified, booked, dead, wrong number, etc.)
- Appointment status categories (proposed, confirmed, completed, no-show, rescheduled, cancelled)
- Missed-lead recovery notes (how they want to see recovered leads surfaced; any special flags)
- Trial success indicators (what numbers or outcomes would make them continue past trial)
- Reporting contact (email(s) to receive manual reports during trial)
- Reporting cadence (weekly on X day; monthly summary on Y)
- Manual reporting notes (all reports will be manually compiled from local notes during setup/trial; no automated dashboard yet)

## 7. Setup Risk and Blocker Register

**Internal-only / founder-operator-only. Maintain live during setup. Every item below triggers explicit gate.**

Use PASS / HOLD / BLOCKED rules. Update at every session end and before go-live gate.

### PASS / HOLD / BLOCKED Rules (enforced)

- Decision-maker not confirmed: BLOCKED (cannot proceed without owner/payer authority on record)
- Trial terms unclear: HOLD (re-explain and re-confirm using exact language before PASS); BLOCKED if prospect pushes back on "setup first" or wants trial to start immediately
- Lead sources unknown: HOLD until at least primary source identified with volume estimate
- Lead access not available: BLOCKED for go-live (must have path to see real lead format/content for setup)
- Lead fields incomplete: HOLD (document what is missing + plan); BLOCKED if core contact fields (phone) never arrive
- Response preferences unclear: HOLD (insufficient for safe draft rules)
- Follow-up stop rules unclear: HOLD (risk of over-contact without clear stop)
- Booking preferences unclear: HOLD (cannot plan calendar handling without windows/rules)
- Calendar handling unclear: HOLD; BLOCKED if they insist on live auto-booking before explicit approval
- Reporting expectations unclear: HOLD (minor; can proceed with defaults if other areas PASS)
- Data protection concern unresolved: BLOCKED (must cross-reference ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md checkpoint; any privacy/red flag on lead handling stops)
- Guarantee-seeking or booked-jobs expectation: BLOCKED (re-state allowed language only; if persists, no-go)
- Wants automatic quote/invoice/payment: BLOCKED (this kit and all customer-facing never promise or discuss automation of estimates/quotes/invoices/payments)
- Wants live automation before explicit approval: BLOCKED (Guided Setup is configuration only; live behavior requires go-live gate after this kit)

Record every blocker with date, owner, due, evidence. Re-evaluate at go-live gate (section 10).

## 8. Guided Setup Call Agenda

**Prospect/customer-facing language only in spoken portions. Internal notes labeled as such.**

Use this agenda for the Guided Setup intake session (30-45 min recommended). Goal: capture complete worksheets (sections 2-6), confirm safety boundaries, reach clear PASS/HOLD/BLOCKED on go-live readiness or identify blockers.

1. Opening frame (1 min)
2. Re-confirm close/yes status and current public offer language (2 min)
3. Explain setup-before-trial (2 min)
4. Gather roofer business profile details (5 min — use section 2)
5. Gather lead source details (8 min — use section 3)
6. Gather response and follow-up preferences (6 min — use section 4)
7. Gather booking and calendar preferences (6 min — use section 5)
8. Gather reporting preferences (4 min — use section 6)
9. Confirm safety boundaries and go-live readiness criteria (3 min)
10. Next action and owner/date (2 min)

Internal only: Pause after agenda item 3 if trial terms pushback. Surface any guarantee language immediately as BLOCKED per section 7. After session, fill blocker register and update trackers before leaving call notes.

## 9. Guided Setup Script

**Prospect-facing language only. Use or close paraphrase. Never deviate into forbidden phrases or guarantees. Internal-only framing is for dry-run instructions only.**

**Opening frame:**
"Hi [Name], thanks for the yes on moving forward. I'm [Jason/Operator]. Before we get RoofLeadHQ AI running on your leads, we do Guided Setup first so it understands exactly how you work."

**Re-confirm close/yes and public offer:**
"Just to confirm: you said yes to proceeding. RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. This is configuration time — we collect the details today so the setup can go live cleanly."

**Explain setup-before-trial:**
"Guided Setup happens first. We walk through your company details, the lead sources you use, how you want responses and follow-ups to sound, your booking windows and calendar, and what reporting you want to see. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Setup is used to understand your leads, booking preferences, follow-up preferences, and reporting expectations before go-live."

**Gather business profile (transition):**
"Let's start with the basics about your business so we set the right rules. [Use section 2 worksheet prompts live.]"

**Gather lead sources:**
"Walk me through the lead sources you're using today and roughly how many per month. [Capture per source volume, format, access, quality notes — use section 3.] Any sources you want to turn on or pause during the trial?"

**Gather response/follow-up:**
"How do you like your team to sound when replying to homeowners? What's the ideal first reply timing and tone? How many follow-ups before you stop? Any hard stop rules like 'stop texting me'? [Capture tone, cadence, max attempts, escalation, consent notes — use section 4.]"

**Gather booking/calendar:**
"Once a homeowner is ready for an inspection, how do you typically get them on the calendar? What days/times work best? Any travel limits or weather rules? What info do you need from the homeowner before offering a slot? [Capture windows, constraints, confirmation flow, current calendar access — use section 5. Re-state: manual calendar handling only during setup.]"

**Gather reporting:**
"What would be most useful to see each week or at the end of the trial — number of leads handled, how many booked, response speed, anything else? Who should receive the updates? [Use section 6.]"

**Confirm safety boundaries:**
"Quick boundary check: this Guided Setup is configuration only. No live SMS or automated booking is turned on yet. Everything stays under manual review during the trial. No guarantees on jobs or revenue — this helps with the leads you're already getting. You can cancel anytime with no contract. Does that all sound right?"

**Confirm go-live readiness criteria:**
"Before we mark setup complete and go live for the 14-day trial, we'll need the lead source details solid, preferences captured, and any blockers cleared. We'll do a final go-live readiness checklist together. Target go-live window is [target date]."

**Next action close:**
"Here's what happens next: I'll compile these notes into our internal setup tracker. Any missing items we'll list with a clear owner and date. Once everything is PASS on the go-live checklist, we flip the switch for your 14-day trial period. The automated email will come 2 days before month one. I'll send a summary of today's notes and the next action owner/date by [EOD/tomorrow]. Any questions before we wrap?"

Internal only: Log exact answers, red flags surfaced, and decision in section 12 tables. Never say "you book the inspection", "book jobs", "guaranteed", "automatic quote", "day 15", or any forbidden phrasing. Re-confirm no automation activated.

## 10. Go-live Readiness Checklist

**Internal-only / founder-operator-only. Final gate before handoff to Launch System Packet for trial start. All prior sections must support PASS.**

- [ ] Required setup fields completed (business profile, lead sources with volume/access, response/follow-up prefs, booking/calendar prefs, reporting prefs)
- [ ] Lead source info complete enough (at least one primary source with format evidence and access path; volume estimate recorded)
- [ ] Response preferences complete enough (tone + cadence + stop conditions + escalation captured)
- [ ] Follow-up preferences complete enough (max attempts + do-not-contact + consent notes captured)
- [ ] Booking/calendar preferences complete enough (windows + constraints + confirmation rules + manual-only status confirmed)
- [ ] Reporting expectations complete enough (metrics + cadence + contact recorded)
- [ ] Trial/payment language confirmed (verbatim or affirmative quote matching exact allowed strings: Guided Setup first, 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract)
- [ ] Data protection checkpoint complete (cross-reference ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md; no unresolved tenant/lead boundary concerns)
- [ ] No unresolved guarantee/job/revenue claims (prospect has not pushed back on allowed language)
- [ ] No automatic quote/invoice/payment request (explicit: no such expectation set)
- [ ] No live automation activated (re-confirm all guardrails in section 13; manual-only confirmed for setup/trial period)
- [ ] PASS/HOLD/BLOCKED go-live readiness (see section 7 rules; only PASS advances to handoff)

Evidence Log entry required with timestamp, operator, founder sign-off if needed, and link to filled worksheets + blocker register snapshot.

## 11. Setup-to-Launch Handoff Artifact

**Internal-only. Required fields to hand off into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (Guided Setup Intake Packet / Go-Live Readiness sections).**

Copy the filled summary into the Launch System Packet evidence log / intake section. Update upstream tracker if any.

- Roofer/company/contact: [Company, Owner Name, Phone, Email, Primary contact channel]
- Close decision reference: [Date + reference to Demo Close Execution Kit decision log / handoff summary]
- Fit score reference: [If carried from demo close; or "N/A — post-close Guided Setup"]
- Trial terms confirmed: [Verbatim confirmation quote or "Confirmed: Guided Setup first, 14-day trial begins after RoofLeadHQ AI setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract"]
- Setup owner: [Name/role inside roofer + operator owner for this kit]
- Setup completion status: [PASS / HOLD with gaps / BLOCKED]
- Lead source summary: [List of sources + monthly vol est + format/access status + quality notes]
- Response/follow-up preferences: [Tone summary, cadence, max attempts, stop conditions, escalation triggers]
- Booking/calendar preferences: [Windows, travel/weather constraints, confirmation rules, manual-only status]
- Reporting preferences: [Metrics of interest, cadence, reporting contact]
- Open blockers: [List from section 7 register with owners/dates; empty if PASS]
- Data protection notes: [Checkpoint passed + any notes from ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md reference]
- Go-live assumptions: [Credentials/access available on target date; decision maker available for final confirmation; manual review window secured for trial period]
- Go-live readiness status: [PASS / HOLD / BLOCKED + 1-line rationale]
- Next action owner/date: [Who owns next step (e.g. clear final blocker, schedule go-live flip, compile first manual report); target date]
- Evidence log references: [Session notes date, filled worksheet local paths or copies, blocker register snapshot, prior demo close handoff ref]

Internal only: Do not hand off on HOLD or BLOCKED. Handoff only on confirmed PASS + all critical fields populated with evidence. After handoff, mark all queues "HANDED OFF TO LAUNCH — [date]". Re-confirm safety guardrails at handoff.

## 12. Manual Tracker Templates

**Copy-paste-ready tables. Use in local spreadsheet, notes app, or printed. 9 tables as required. Update at every gate. Internal-only data.**

### Guided Setup Intake Queue
```
| Date Added | Company | Contact | Close Ref | DM Status | Trial Terms Confirmed | Setup Owner | Target Date | Missing Info Gate | Status (PASS/HOLD/BLOCKED) | Status Rationale | Next Action | Next Date | Evidence Ref |
|------------|---------|---------|-----------|-----------|-----------------------|-------------|-------------|-------------------|----------------------------|------------------|-------------|-----------|--------------|
| 2026-06-11 | ABC Roofing | John D | Demo 2026-06-10 PASS | Owner confirmed | Yes — verbatim "setup first, 14d after live, email 2d before pay, cancel anytime" | J (op) + John | 2026-06-13 | None critical | PASS | All intake items covered | Fill worksheets + schedule session | 2026-06-12 | Demo log #42 + intake notes |
```

### Roofer Business Profile
```
| Company | Owner/Contact | Service Area | Services Offered | Lead Types Accepted | Lead Types Rejected | Office Hours | Emergency/Storm | Preferred Contact Style | Brand/Tone Notes | Bad-Fit Scenarios | Notes/Evidence |
|---------|---------------|--------------|------------------|---------------------|---------------------|--------------|-----------------|-------------------------|------------------|-------------------|---------------|
| ABC Roofing | John D, owner, 555-123-4567, john@abc.com | Metro + 3 zips (30mi) | Res rep, repair, storm | Roof replacement, storm | Commercial flat, out of area | M-F 7-6, Sat 8-12 | Yes for storm leads, 24h target | Direct, professional, solution-oriented | "We show up when we say" | Price-only tire-kickers, no address | Website: abcroofing.com; prior call notes |
```

### Lead Source Setup Worksheet
```
| Company | Lead Source | Est Monthly Vol | Paid/Organic | Quality Notes | Expected Format | Required Fields | Missing-Field Handling | Source Owner | Access Status | Manual Access Notes | HOLD/BLOCKED |
|---------|-------------|-----------------|--------------|---------------|-----------------|-----------------|------------------------|--------------|---------------|---------------------|--------------|
| ABC Roofing | Google LSA | 15 | Paid | Good intent, some dups | Email + SMS forward | name, phone, zip, message | Flag for review if no phone | John | Read-only export available | Forwarded emails for samples | None |
| ABC Roofing | Angi | 10 | Paid | Mixed, some low-intent | Web form export/CSV | name, phone, email, address | Drop if no phone after 1 try | John | CSV export weekly | Sample CSV captured 2026-06-11 | None |
```

### Response and Follow-up Preferences
```
| Company | Initial Response Style | Urgency Framing | Follow-up Cadence | Max Attempts | Stop Conditions | Do-Not-Contact | Consent Notes | Escalation Triggers | Owner Review Req | Draft Approval | Manual Guardrails |
|---------|------------------------|-----------------|-------------------|--------------|-----------------|----------------|---------------|---------------------|------------------|----------------|-------------------|
| ABC Roofing | Professional, direct, helpful | Reply same day during hours | Touch2 +4h, Touch3 +24h | 3 total | Reply, book, "stop", 7d no reply | Prior opt-outs list | SMS consent via first reply | Storm lead, 3+ touches no reply, high value zip | First 5 responses reviewed | Approved samples captured | All manual review/coordination only |
```

### Booking and Calendar Preferences
```
| Company | Inspection Goal | Preferred Windows | Travel Constraints | Same/Next Day Rules | Weather/Storm | Homeowner Info Req | Contractor Confirm Req | Calendar Access | Manual Handling Only | No Auto Booking | Unknowns/Blockers |
|---------|-----------------|-------------------|--------------------|---------------------|---------------|--------------------|------------------------|-----------------|----------------------|-----------------|-------------------|
| ABC Roofing | 8-12 inspections/mo from leads | M-F 9-4, Sat 9-12 | Max 35min one way | Next-day standard; same-day for hot storm | Pause heavy rain/wind days | Full address + phone + rough scope | Scheduler confirm before final | Google shared read-only link offered | Yes — manual add only | Confirmed: no live auto events | Weekend policy TBD |
```

### Reporting Preferences
```
| Company | Weekly Expectations | Monthly Expectations | Key Metrics | Lead Status Cats | Appt Status Cats | Missed Recovery Notes | Trial Success Indicators | Reporting Contact | Cadence | Manual Notes |
|---------|---------------------|----------------------|-------------|------------------|------------------|-----------------------|--------------------------|-------------------|---------|--------------|
| ABC Roofing | Leads handled count, booked count, avg reply time | Conversion summary, top sources | leads handled, booked, response time, recovery count | new/responded/fu1/fu2/qualified/booked/dead | proposed/confirmed/completed/no-show/cancelled | Flag recovered in weekly | 6+ booked inspections in 14d + positive feedback | john@abc.com | Weekly Fri EOD, monthly summary | All manual compile from notes; no auto dash |
```

### Setup Blocker Register
```
| Date | Company | Blocker Category | Description | Rule Triggered | Owner | Due Date | Status | Evidence | Resolution / Next |
|------|---------|------------------|-------------|----------------|-------|----------|--------|----------|-------------------|
| 2026-06-11 | ABC Roofing | Lead access not available | Angi CSV not yet exported for sample | Lead access not available | John | 2026-06-12 | OPEN | Call note 2026-06-11 | John to send sample CSV by EOD; re-eval PASS |
| 2026-06-11 | ABC Roofing | None | All other fields captured | N/A | J | N/A | RESOLVED | Worksheets filled | N/A |
```

### Go-live Readiness Checklist
```
| Date | Company | Fields Complete | Lead Src Info | Response Prefs | Follow-up Prefs | Booking Prefs | Reporting Exp | Trial Lang Confirmed | Data Prot Checkpoint | No Guarantee Claims | No Auto Quote/Inv/Pay | No Live Auto | Go-Live Status (PASS/HOLD/BLOCKED) | Rationale + Evidence Ref |
|------|---------|-----------------|---------------|----------------|-----------------|---------------|---------------|----------------------|----------------------|---------------------|-----------------------|--------------|------------------------------------|--------------------------|
| 2026-06-13 | ABC Roofing | Yes | Yes (Google+Angi) | Yes | Yes | Yes | Yes | Yes — verbatim quote | Yes — ref data prot packet | Yes | Yes | Yes | PASS | All critical complete; samples reviewed; handoff ready; evidence: worksheets + blocker log 2026-06-13 |
```

### Setup-to-Launch Handoff Summary
```
| Field | Value |
|-------|-------|
| Roofer/Company/Contact | John D, ABC Roofing, 555-123-4567, john@abc.com, Metro + 3 zips |
| Close Decision Reference | Demo Close 2026-06-10 PASS + handoff summary |
| Fit Score Reference | 50/60 (from demo close) |
| Trial Terms Confirmed | Yes — "Guided Setup first, 14 days after it goes live, email 2 days before payment, cancel anytime, no contract" |
| Setup Owner | J (op) + John (roofer) |
| Setup Completion Status | PASS |
| Lead Source Summary | Google LSA (~15/mo, email/SMS forward, good quality); Angi (~10/mo, CSV, mixed intent); samples captured |
| Response/Follow-up Preferences | Professional direct tone; +4h / +24h; max 3; stop on reply/book/stop/7d; storm escalation; first 5 reviewed |
| Booking/Calendar Preferences | M-F 9-4 Sat 9-12; 35min max; next-day standard; full addr+phone+scope req; manual add only; Google read-only offered |
| Reporting Preferences | Weekly: leads handled + booked + reply time; Fri EOD to john@abc.com; manual compile |
| Open Blockers | None (Angi sample resolved 2026-06-12) |
| Data Protection Notes | Checkpoint passed per ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md; leads handled under manual dry-run controls |
| Go-Live Assumptions | Samples re-confirmed day-of; 30min window for final confirm; manual review secured for 14d trial |
| Go-Live Readiness Status | PASS |
| Next Action Owner/Date | J to compile Launch handoff + confirm go-live window with John by 2026-06-14 EOD |
| Evidence Log References | Guided Setup session notes 2026-06-13, all 6 worksheets, blocker register 2026-06-13, demo close handoff 2026-06-10 |
```

## 13. Safety Guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before Guided Setup prep, before call/session, before go-live decision, before handoff. All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer Guided Setup unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only setup preparation: YES (this kit produces worksheets, notes, and scripts only)
- Draft-only setup notes: YES (all preferences captured as internal drafts for configuration planning)
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

Re-confirm by logging "Safety guardrails re-read and all OFF at [timestamp] before [action]" in Evidence Log before every Guided Setup-related action.

## 14. Public-vs-Internal Language Boundary

**Customer-facing setup language (agenda spoken portions, script, discovery prompts as spoken to the roofer, any email or note that could reach the paying roofer, handoff artifacts that may be shared with them) must not use founder-led/manual babysitting/public founder-review framing.**

Allowed customer-facing / public strings (must appear in all such sections):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime.
- No long-term contract.
- Setup is used to understand your leads, booking preferences, follow-up preferences, and reporting expectations before go-live.

Internal founder/operator/manual review language (founder review, manual review, manual coordination, Live Automation Disabled notes, rehearsal details, command packet references, dry-run workspace notes, operator runbooks, session notes, approval checklists, "Jason will babysit", etc.) may remain in dry-run safety artifacts, internal packets, this kit's internal-only labeled sections, context docs, verifier index, and daily guide — but EVERY such artifact must explicitly state it is internal-only / dry-run / founder-operator-only and NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into website/index.html or outward-facing scripts.

This kit clearly labels internal-only sections (headers and callouts). Verifier enforces that forbidden phrases are absent from all customer-facing template sections.

### Explicitly Labeled Internal-Only Sections in This Kit

- Section 1 Guided Setup Intake Checklist (full)
- Section 2 Roofer Business Profile Worksheet (full)
- Section 3 Lead Source Setup Worksheet (full)
- Section 4 Response and Follow-up Preferences Worksheet (full)
- Section 5 Booking and Calendar Preferences Worksheet (full)
- Section 6 Reporting Preferences Worksheet (full)
- Section 7 Setup Risk and Blocker Register (full)
- Section 10 Go-live Readiness Checklist (full)
- Section 11 Setup-to-Launch Handoff Artifact (full)
- Section 12 Manual Tracker Templates (all 9 tables contain internal data only)
- Section 13 Safety Guardrails (full)
- All "Internal only:" callouts and Evidence Log instructions

Customer-facing sections (8, 9 spoken form, and any direct quotes to the roofer) use only the allowed public language.

*End of First Paid Roofer Guided Setup Execution Kit. Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind.*
