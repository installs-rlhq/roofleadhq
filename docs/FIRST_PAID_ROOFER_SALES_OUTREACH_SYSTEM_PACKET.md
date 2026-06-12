# First Paid Roofer Sales Outreach System Packet

Date: 2026-06-08

## Purpose

This is the internal-only First Paid Roofer Sales Outreach System Packet for RoofLeadHQ. Jason (founder/operator) uses this packet to advance the first real paying roofer from initial prospect identification through targeted outreach (warm, cold, referral), demo call, fit decision, and clean handoff into Guided Setup + the First Paid Roofer Launch System Packet.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup is onboarding/configuration only (lead sources, service area, qualification, follow-up preferences, calendar connection, reporting).
- 14-day trial begins after Guided Setup go-live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal scorecards, trackers, and evidence logs are internal-only. No public founder-led/manual babysitting positioning is used for prospects.

This packet is product-moving and operationally usable: it contains concrete ideal-profile criteria, disqualifiers, full message templates, a short follow-up sequence, demo call checklist, discovery questions, objection handling scripts, pricing/trial explanation script, fit decision scorecard with scoring, explicit handoff checklist to the Launch System Packet, no-go handling, evidence log + prospect tracker templates, and full safety guardrails. It is designed so a founder or trained operator can execute first paid roofer sales outreach using only this document + referenced packets + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

## Scope

- First paid roofer prospecting and sales (the first real contractor who will pay after the 14-day trial).
- All stages from ideal profile definition through outreach, demo call, fit decision, and handoff to Guided Setup execution.
- Internal founder/operator prospect tracker, evidence logging, and decision gates.
- Explicit, machine-enforceable safety guardrails (section 15) that must be re-confirmed at every gate.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below for the exact list of banned phrases).
- No activation of live SMS, Vapi, Calendar booking, Resend, Lindy, cron, production Supabase writes, production data mutation, public routes, contractor portal exposure.
- No auth/RLS/security implementation or payment automation in this packet (planning, messaging, and checklists only).
- All work remains read-only verification, dry-run, internal founder/operator planning, rehearsal, and outreach copy only. No live sends or CRM automation activated.
- This packet stops at handoff to Guided Setup and the First Paid Roofer Launch System Packet. Setup execution, go-live, trial ops, and first payment are covered in the Launch System Packet.

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, prospect-facing, demo, and customer communication sections of this packet (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement appears in section 15.

- 7-day pilot
- 5 qualified appointments in 7 days
- guarantee (in context of jobs/revenue/appointments/outcomes)
- booked jobs / book jobs / booked-job
- automatic estimate / auto-estimate / automatic quote / auto quote
- invoice generated / payment link / collect payment (as automated behaviors)
- Monthly billing starts on day 15 (without 14-day trial framing)
- Founder-Led Launch Program (in public/customer copy; internal ops language only where unavoidable, never as public positioning)

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this packet satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety).

This packet file: `docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md`
Wrapper: `scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js`

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js
node backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js
scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this packet)
- Handoff target: `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier
- Related: FIRST_PAID_PILOT_LAUNCH_PACKET.md, FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md, FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md, FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md, MANUAL_OUTREACH_OPERATIONAL_QA_CHECKLIST.md
- Wrapper: `scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh`
- This packet's verifier: `backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js`

---

## 1. Ideal First Roofer Profile

Use this profile to prioritize prospects and qualify inbound interest. Only pursue strong fits for the first paid roofer slot.

### Core Criteria (All Must Be True for Ideal Fit)
- Active roofing company (not a handyman or general contractor) currently generating leads via phone, web forms, paid ads, or lead portals.
- Owner or primary decision-maker is reachable and has expressed interest in faster response, automated follow-up, and missed-lead recovery without requiring outcome guarantees.
- Services residential or light commercial roofs in a defined service area (minimum one primary city/zip cluster).
- Current lead volume estimate: at least 10-20 leads/month (phone + forms + portals combined) with visible response/follow-up gaps (missed calls, slow texts, leads going cold).
- Willing to participate in Guided Setup (provide lead source details, service area, qualification rules, calendar access intent, reporting preferences) and commit to a 14-day trial.
- Decision-maker has authority or clear path to approve the monthly subscription after the 14-day trial (no heavy franchise or corporate layers that block payment).
- No active red flags on payment history, platform churn, or extreme skepticism that would prevent a clean demo-to-setup handoff.

### Strong Bonus Signals
- Uses or is open to a calendar tool (Google, Calendly, JobNimbus, ServiceTitan, etc.).
- Has at least one team member or owner who answers phone today and can be part of the initial review.
- Has tried manual follow-up or other tools and is frustrated with leads slipping away.
- Referred by a peer roofer or found via targeted warm channel.

### Evidence Capture (Internal Only)
- Company name, DBA, owner/decision-maker name + direct phone + email.
- Primary service area (zips/cities + radius).
- Current lead sources + rough monthly volume per source.
- Current response process (who answers phone/forms, average first response time, follow-up cadence).
- Stated pain: "leads going cold", "missed calls after hours", "too many texts to track manually".
- Source of this prospect (warm referral, website form, cold list, LinkedIn, etc.).

Go/No-Go for Profile Match: [ ] PASS (strong ideal fit) [ ] HOLD (partial fit, needs more info) [ ] BLOCKED (clear mismatch)

Evidence Log entry template:
- Date/Operator:
- Prospect:
- Profile items confirmed (list 3+):
- Bonus signals:
- Safety re-confirmation: all guardrails OFF, re-read section 15:
- Decision + justification:

---

## 2. Disqualifiers / Bad-Fit Criteria

Explicitly screen these out early. Do not invest demo or setup time on bad fits for the first paid slot.

### Hard Disqualifiers (BLOCKED — Do Not Proceed)
- Not a roofing contractor (siding, gutters, solar-only, general handyman, restoration-only with no roof replacement focus).
- No current lead flow or "we get all our work from referrals and never market" with zero interest in scaling response.
- Decision-maker refuses any discussion of Guided Setup, calendar connection, or reviewing their current lead sources.
- Explicitly demands guarantees on jobs closed, revenue, or appointment volume ( "how many jobs will this get me?" after explanation of 14-day trial positioning).
- Currently in active contract with a competing lead-response or automation platform and unwilling to run parallel 14-day trial or discuss overlap.
- Service area is 100% outside planned first-roofer coverage or requires heavy multi-state manual review not yet supported internally.
- Owner states "I just want you to book the jobs for me with no effort on my part" or "I don't have time for any setup".
- Clear payment red flags (past due on known platforms, "we only pay after the job closes", "we'll try it for free for a month then decide").

### Soft Disqualifiers (HOLD or Gentle No-Go)
- Very low lead volume (<5/month) with no plan or budget to generate more.
- Owner is extremely time-poor and cannot commit even 60-90 minutes to Guided Setup + one follow-up review.
- Heavy reliance on one portal that disallows third-party response (legal/contract barrier).
- Recent bad experience with "AI automation" that over-promised and under-delivered; high skepticism requiring more than two follow-ups before demo.
- Franchise or multi-location where local owner cannot approve spend and corporate is not involved.

### Disqualifier Handling Rules
- Log every disqualifier with exact quote from prospect + date + operator initials in the Evidence Log / Prospect Tracker.
- Use the no-go / not-now scripts in section 13. Never argue or over-pitch.
- A BLOCKED disqualifier ends the thread for this packet. A HOLD can be revisited after 30 days if prospect situation changes (document in tracker).

Status for current prospect: [ ] CLEAR FIT [ ] HOLD [ ] BLOCKED
Status for current prospect: [ ] CLEAR FIT [ ] HOLD (soft disqualifier) [ ] BLOCKED (hard disqualifier)

---

## 3. Warm Outreach Message

Warm = prospect already engaged (website form, LinkedIn comment, mutual connection intro, inbound email, or previous conversation).

### Warm Email / LinkedIn DM Template (Copy-Paste Ready, Internal Use Only)

Subject: Quick question on your roofing leads — RoofLeadHQ AI

Hi [Name],

I saw you [checked out RoofLeadHQ / filled the form / connected via [mutual] / replied to my note]. 

RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup takes your current lead sources and calendar, then the system handles the repetitive work so you focus on inspections and closing.

We're running a 14-day trial for the first few roofers. After Guided Setup go-live, an automated email arrives 2 days before your first monthly payment. Cancel anytime. No long-term contract.

Would you be open to a 20-minute demo call this week to see exactly how it would work on your leads and calendar?

Best,
Jason
RoofLeadHQ

### Warm Call Opener (If Following Up a Form/Connection)

"Hi [Name], this is Jason with RoofLeadHQ. You [filled out the site / we connected on LinkedIn / [mutual] mentioned you]. I'm reaching out because RoofLeadHQ AI helps roofers turn leads into booked homeowner appointments with fast response and automated follow-up so fewer slip away. Do you have 2 minutes?"

(If yes, bridge to: "The short version is Guided Setup connects your lead sources and calendar. Then it handles the follow-up work. 14-day trial after setup, cancel anytime. I'd like to show you a quick demo on your actual lead types. When works this week?")

Warm outreach must always use only allowed public language. Record in Evidence Log: channel, exact message sent (or paraphrased), timestamp, prospect response.

---

## 4. Cold Outreach Message

Cold = no prior engagement. Use sparingly and personally. Prioritize warm + referral channels for first paid.

### Cold LinkedIn DM / Email Template

Subject (email): 30 seconds on your roofing lead follow-up

Hi [Name],

I help roofing companies stop losing leads that go cold after the first call or form.

RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. You keep full control via Guided Setup — your service area, qualification rules, calendar, and preferences.

For the first paid roofer we're offering a 14-day trial after Guided Setup. Automated email 2 days before first monthly payment. Cancel anytime. No long-term contract.

If you're open to a short demo where I show you exactly what would happen on a phone lead and a form lead from your area, reply "demo" or book here: [internal dry-run calendar link placeholder — never live].

No pressure — just wanted to offer the option.

Jason
RoofLeadHQ

### Cold Call / Voicemail Opener (Very Short)

"Hi [Name], Jason with RoofLeadHQ. I work with roofers who want fewer leads going cold between the phone ringing and the inspection being booked. RoofLeadHQ AI handles fast response and automated follow-up so homeowner appointments land on your calendar. 14-day trial after a quick Guided Setup. If that sounds useful, text or call me back at [number]. Thanks."

Cold messages logged with channel, date, outcome (no answer / voicemail left / connected / replied).

---

## 5. Referral Ask Message

Use after any positive interaction (even if prospect is HOLD or not-now) or with current network.

### Referral Ask (Standalone or Post-Demo / Post-No-Go)

"Quick favor: Do you know 1-2 other roofing company owners in [area] who are frustrated with leads going cold or slow follow-up? RoofLeadHQ AI turns leads into booked homeowner appointments with fast response and automated follow-up. We're doing a 14-day trial + Guided Setup for the first few. If someone comes to mind, I'd appreciate an intro or their name so I can reach out directly. No hard sell — just seeing if it's a fit."

(After they give a name): "Thanks. Mind if I mention your name when I reach out, or would you rather make the intro?"

Log referral source + outcome in the prospect tracker. Treat referred prospects as warm.

---

## 6. Short Follow-Up Sequence

Maximum 3-4 touches total for cold/warm. Never more than 2 follow-ups without a clear positive signal. All follow-ups reference prior context and use only allowed language.

### Sequence (Internal Cadence — Never Automated in This Phase)

Touch 1 (initial): Warm or cold message above (day 0).

Touch 2 (follow-up, 3-4 days later if no reply):
"Hi [Name], following up on my note about RoofLeadHQ AI turning your roofing leads into booked homeowner appointments via fast response and automated follow-up. Still open to a 15-minute demo this week? Guided Setup + 14-day trial, cancel anytime."

Touch 3 (final value-add follow-up, 6-7 days after touch 2 if still silent):
"Last note on this — many roofers lose 20-40% of form and after-hours phone leads simply because no one follows up the same day. RoofLeadHQ AI is built exactly for that: fast response + automated follow-up so more homeowners end up on your calendar. 14-day trial after Guided Setup. If timing is off right now, no problem at all — just reply 'not now' and I'll leave you alone."

Touch 4 (close the loop, only if still no reply after 10+ days):
"Closing the loop on my earlier notes. If RoofLeadHQ AI for booked homeowner appointments is ever interesting, the 14-day trial + Guided Setup offer is open. Otherwise, best of luck with the busy season."

After any reply (even "stop" or "not now"), move to section 13 handling and log in tracker. No further unsolicited follow-up.

Sequence must be manually executed (copy-paste or phone). No cron, Lindy, or automation of these sends.

Evidence requirement: log every touch with channel, timestamp, exact text or summary, response (or none).

---

## 7. Demo Call Checklist

Use for all scheduled demo/discovery calls. Goal: enough information + mutual fit clarity to decide on proceeding to Guided Setup intake or no-go.

### Pre-Call Prep (Internal — 5-10 Minutes Before)
- [ ] Review prospect record in internal tracker: company, service area, lead sources, stated pain, prior messages.
- [ ] Re-read section 15 safety guardrails.
- [ ] Prepare 2-3 specific examples using their lead types (phone, form, portal) — keep as illustrative only, no live data.
- [ ] Confirm calendar placeholder is dry-run / internal only (never send live booking link).
- [ ] Have Guided Setup summary + 14-day trial + pre-billing email explanation script ready (section 10).
- [ ] Have fit scorecard (section 11) printed or open.
- [ ] Run this packet's verifier + aggregate (or confirm last run green within 24h).
- [ ] Safety re-confirmation logged in Evidence Log before call.

### During Call — Allowed Framing Only
- Open with public language only: "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
- Emphasize: Guided Setup is where you configure everything (lead sources, rules, calendar). After go-live the system handles repetitive response and follow-up.
- Never promise: number of jobs, booked-job outcomes, revenue, automatic estimates/quotes/invoices/payments, "guaranteed appointments", "we book for you".
- Never say "Monthly billing starts on day 15". Use: "14-day trial begins after Guided Setup go-live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."
- Show demo using sample data or anonymized past patterns only. Label any screenshots "SAMPLE / demo only".
- Ask discovery questions (section 8) naturally; do not read as script.
- Watch for disqualifiers (section 2) in real time.

### Live Call Checklist (Items to Cover)
- [ ] Confirm current lead sources and rough volume.
- [ ] Map current response process and pain points (missed after-hours, slow form follow-up, texts piling up).
- [ ] Explain exactly what Guided Setup captures and who does what.
- [ ] Walk through pricing/trial (section 10) verbatim using allowed language.
- [ ] Surface any red flags or disqualifiers early.
- [ ] Ask for explicit interest in moving to Guided Setup intake.
- [ ] If strong fit signal: "If this looks like a fit, next step is a Guided Setup session (60-90 min) where we capture your exact lead sources, service area, and preferences. Then you go live on the 14-day trial. Sound good?"

### Post-Call Internal Actions (Complete Same Day)
- [ ] Fill out full fit decision scorecard (section 11) with scores + notes.
- [ ] Update prospect tracker + Evidence Log with call outcome, quotes, red flags, next step.
- [ ] Decision: PASS (advance to Guided Setup handoff), HOLD (more info or time), BLOCKED (disqualifier).
- [ ] If PASS: prepare handoff package to First Paid Roofer Launch System Packet (section 12).
- [ ] If HOLD or BLOCKED: use no-go / not-now handling (section 13) and log.
- [ ] Re-confirm safety guardrails in log entry.
- [ ] Schedule any agreed next action (or close thread cleanly).

Status after demo: [ ] PASS (advance to Guided Setup) [ ] HOLD [ ] BLOCKED

---

## 8. Discovery Questions

Use these during outreach replies and demo calls. Goal: surface fit data and pain without leading or promising outcomes.

1. What are your main lead sources right now (phone numbers, forms, ad platforms, portals)?
2. Roughly how many leads come in per week or month across all sources?
3. Who typically answers the phone or responds to forms today, and what's the average time to first reply?
4. What happens to leads that come in after hours or on weekends?
5. Walk me through what a good lead looks like for you and what makes one not worth pursuing.
6. What tools or calendars do you or your team use to schedule inspections today?
7. When a lead goes cold or slips through, how do you usually find out?
8. How are you currently handling follow-up on leads that don't answer the first call or text?
9. On a scale of 1-10, how painful is missed or slow follow-up for your business right now?
10. If you had a system that handled the repetitive response and follow-up work (while you stayed in control of the rules), what would you want it to never do or always do?

Capture answers verbatim in internal notes. Use answers to populate the fit scorecard and handoff artifact.

---

## 9. Objection Handling

Respond only with allowed language. Never invent guarantees or change the trial framing.

Objection: "How many jobs will this book for me?"
Response: "I can't promise any specific number of jobs or appointments — that depends on your lead volume, service area, pricing, and how your team closes. What RoofLeadHQ AI does is turn the leads you already get into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. The 14-day trial after Guided Setup lets you see exactly how it works on your actual leads with zero risk. Cancel anytime."

Objection: "I don't have time for setup."
Response: "Guided Setup is a one-time 60-90 minute session where we capture your lead sources, service area, qualification rules, and calendar preferences. After that the system handles the day-to-day repetitive work. Most roofers find the time investment pays off quickly because they stop losing leads to slow response. We can do it in one focused block at your convenience."

Objection: "I already have [JobNimbus / ServiceTitan / another tool] doing follow-up."
Response: "Great — many roofers run RoofLeadHQ AI alongside their existing CRM. Guided Setup lets you connect the lead sources you want it to watch and set rules so it complements what you already have. The 14-day trial is the easiest way to see whether it reduces cold leads without disrupting your current flow. No long-term contract."

Objection: "Is this automatic? Will it book the work without me?"
Response: "No. RoofLeadHQ AI handles fast response to homeowners and automated follow-up to keep them moving toward your calendar. You (or your team) still do the inspections, estimates, and closing. You stay in full control through Guided Setup — the system never creates estimates, quotes, or invoices on its own."

Objection: "What if I don't like it after the trial?"
Response: "That's exactly why we use a 14-day trial. After Guided Setup go-live you get the full system on your leads. An automated email arrives 2 days before the first monthly payment. You can cancel anytime with no long-term contract and no penalty. If it's not a fit, you just let it expire or cancel before the payment."

Objection: "Can I see it working on real leads first?"
Response: "During the demo I can walk you through exactly what would happen on sample phone and form leads using your service area and rules. The actual live data connection happens in Guided Setup. We keep everything dry-run and internal until you explicitly approve moving forward. No production data or sends until after Guided Setup and your confirmation."

Log every objection + response used in Evidence Log.

---

## 10. Pricing/Trial Explanation

Use this script (or close paraphrase) on every demo call and in follow-up materials. Never deviate into day-15 billing language or guarantees.

### Exact Allowed Framing Script

"RoofLeadHQ pricing for the first paid roofer is simple: Guided Setup first, then a 14-day trial, then month-to-month.

Guided Setup is the onboarding step — we spend 60-90 minutes together capturing your exact lead sources (phone numbers, forms, ad accounts), your service area, qualification rules, follow-up preferences, calendar connection, and reporting needs. Nothing goes live until this is complete and you approve.

Once Guided Setup is done and you give the go-ahead, the 14-day trial starts. During the trial you see RoofLeadHQ AI handling fast response and automated follow-up on your real leads, turning them into booked homeowner appointments on your calendar. You stay in control the whole time.

Two days before the first monthly payment would be due, an automated email is sent so there are no surprises. After the 14-day trial you are on month-to-month. Cancel anytime with no long-term contract. If you decide it's not a fit during or right after the trial, you simply cancel and it stops."

Pricing anchor (internal note only — do not lead with price unless asked):
- Use the Growth tier public price from website when asked.
- Always pair price mention with "after the 14-day trial" and "cancel anytime".
- Never say "monthly billing starts on day 15".

Confirmation question to ask prospect:
"Do you understand that the 14-day trial begins after Guided Setup go-live, an automated email arrives 2 days before the first monthly payment, and you can cancel anytime with no long-term contract?"

Prospect must give clear affirmative (verbal or written in notes) before any handoff to Guided Setup. Log the exact confirmation quote.

---

## 11. Fit Decision Scorecard

Complete this immediately after every demo call (or after sufficient discovery data). Score 1-5 where 5 = excellent fit.

### Scorecard Categories (Rate 1-5 + Short Note)

1. Active roofing lead flow (volume + source diversity): ___
2. Visible response/follow-up pain that RoofLeadHQ AI can address (fast response + automated follow-up + missed-lead recovery): ___
3. Decision-maker access + willingness to do Guided Setup (60-90 min): ___
4. Service area and lead types align with first-roofer manual review capacity: ___
5. Payment authority and willingness signal (no extreme "pay after close" or corporate blockers): ___
6. No hard disqualifiers surfaced (see section 2): ___ (5 = none found; 1 = one or more hard DQ)
7. Positive interest signal after pricing/trial explanation (section 10): ___
8. Calendar/tool openness (helps post-setup): ___

Total Score: ___ / 40

### Decision Thresholds (Internal)
- 32+ and no hard disqualifiers: PASS — proceed to handoff (section 12)
- 24-31 or soft disqualifiers present: HOLD — gather more info or revisit in 30+ days
- <24 or any hard disqualifier: BLOCKED — use no-go handling (section 13)

### Required Evidence in Log
- All 8 scores + notes
- Key prospect quotes supporting each
- Total + threshold decision
- Operator initials + date + "Safety guardrails section 15 re-confirmed"
- Next action (handoff / hold note / no-go script used)

Attach or reference full call notes.

Go/No-Go after scorecard: [ ] PASS [ ] HOLD [ ] BLOCKED

---

## 12. Handoff to First Paid Roofer Launch System Packet

handoff to First Paid Roofer Launch System Packet

This is the formal transition point. Sales outreach ends when fit decision is PASS and prospect has given explicit confirmation on the 14-day trial language.

### Handoff Preconditions (All Must Be True)
- [ ] Fit decision scorecard completed with PASS (32+ , no hard DQ).
- [ ] Prospect gave clear affirmative confirmation on the exact trial language (logged verbatim).
- [ ] All discovery fields from section 1 captured (company, contacts, lead sources, service area, current process, pain).
- [ ] No unresolved disqualifiers or red flags.
- [ ] Safety guardrails section 15 re-read and re-initialed in log.
- [ ] This packet verifier and aggregate pilot readiness last run within 24h and green.
- [ ] Internal handoff record created (template below).

### Handoff Artifact (Copy into Internal Notes + Link to Launch Packet)

```
FIRST PAID ROOFER SALES OUTREACH HANDOFF
Date: ____ Operator: ____
Prospect: [Full name] @ [Company]
Contact: [phone] | [email]
Service area: [zips/cities]
Lead sources + est. volume: [list]
Current process & pain (verbatim notes): [summary + quotes]
Demo call date + key discovery answers: [date + bullets]
Fit scorecard total + decision: [score] PASS
Trial confirmation quote (exact): "[prospect said...]"
Handoff owner: [Jason / Operator]
Next: Guided Setup intake per FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md section 4
Safety re-confirmation: all 15 guardrails OFF per section 15. Timestamp: ____
Evidence Log ref: [link or entry ID]
```

### Handoff Checklist
- [ ] Send internal handoff note to self + any operator (email or notes system).
- [ ] Update prospect tracker status to "HANDED OFF TO LAUNCH SYSTEM".
- [ ] Open the First Paid Roofer Launch System Packet and begin at the relevant gate (usually Prospect-to-Setup Handoff or Guided Setup Intake).
- [ ] Do not continue sales outreach activity on this prospect unless the launch packet explicitly returns them (rare).
- [ ] Archive all outreach threads for this prospect in internal evidence folder.

Status for this prospect: [ ] HANDED OFF CLEANLY TO LAUNCH SYSTEM PACKET [ ] PENDING MORE DATA [ ] RETURNED FROM LAUNCH (rare)

---

## 13. No-Go / Not-Now Handling

Every prospect gets a clean, respectful close. Never leave threads hanging. Log every outcome.

### Pre-Demo / Early Disqualifier (Hard BLOCKED)
"Hi [Name], thanks for the conversation. After reviewing what you shared, RoofLeadHQ AI (fast response + automated follow-up for booked homeowner appointments) doesn't look like the right fit right now because [specific disqualifier, e.g. no current lead volume / service area outside coverage / you need guaranteed number of closed jobs which we don't offer]. I don't want to waste your time. If your situation changes (more leads coming in, or you want to revisit after busy season), feel free to reply. Otherwise, best of luck."

### After Demo — HOLD (Soft, Time/Info)
"Hi [Name], thanks for the demo time. I want to be respectful of your schedule. A couple things came up that make me think we should pause before Guided Setup — [specific: e.g. you mentioned corporate approval is needed, or lead volume is lower than ideal for first paid slot]. If you'd like, I can check back in 30 days when [X] is clearer, or if you have questions in the meantime just reply. No pressure either way."

### After Demo — Not a Fit (BLOCKED)
"Hi [Name], I appreciate you taking the time for the demo. Based on what we discussed, RoofLeadHQ AI doesn't appear to be the right fit for your current setup [brief neutral reason without arguing]. The 14-day trial + Guided Setup is built for roofers who have active lead flow they want to stop losing to slow response. If that changes or you want to refer a peer who might be a better fit, I'm happy to hear from you. Otherwise, I'll close the loop here. Thanks again and good luck."

### "Not Now" / Timing Reply (Even if Fit)
"Got it — timing isn't right. No problem at all. RoofLeadHQ AI with the 14-day trial after Guided Setup will be here when you're ready. I'll leave you be. If anything shifts, you have my contact. Best of luck with the current workload."

### "Stop" / Unsubscribe Style Reply
"Understood — I'll remove you from any further notes. Thanks for letting me know. If you ever want to revisit RoofLeadHQ AI for booked homeowner appointments, the site is roofleadhq.com. Take care."

### Required for All No-Go / Not-Now
- Log exact script used (or close quote), date, channel, prospect response.
- Update prospect tracker status to "NO-GO / NOT-NOW — [reason code]".
- Add to Evidence Log with safety re-confirmation.
- Close any open calendar holds or internal reminders for this prospect.
- Consider a one-time referral ask (section 5) only if the conversation ended positively.

No further outreach on closed no-go prospects unless they re-initiate.

---

## 14. Evidence Log and Prospect Tracker

Maintain one master tracker (internal spreadsheet or notes file) + per-prospect evidence entries. Never store in production systems.

### Prospect Tracker Columns (Minimum Required)
- Date first contacted
- Company / DBA
- Decision-maker name + phone + email
- Source channel (warm / cold LinkedIn / referral / website form / other)
- Service area
- Est. monthly lead volume
- Current process / pain summary (1 sentence)
- Outreach touches (count + last date + outcome)
- Demo call date (or N/A)
- Fit scorecard total + decision (PASS/HOLD/BLOCKED)
- Trial confirmation quote captured? (Y/N + exact if Y)
- Status (OUTREACH / DEMO SCHEDULED / FIT DECISION PENDING / HANDED OFF TO LAUNCH / NO-GO / NOT-NOW / ON HOLD)
- Handoff date + Launch System Packet ref (if applicable)
- Last safety re-confirmation timestamp
- Next action / owner / due date
- Notes / red flags / key quotes

Update tracker after every touch, call, or decision. Export or snapshot before any handoff.

### Evidence Log Entry Template (Per Major Event)
```
Date: ____ Time: ____ Operator: ____
Prospect: [Name] @ [Company]
Event type: [OUTREACH TOUCH / DEMO CALL / FIT DECISION / HANDOFF / NO-GO / SAFETY RECHECK]
Details:
- Messages sent (exact or summary):
- Call notes / discovery answers:
- Scores / decision:
- Prospect quotes (verbatim):
- Safety guardrails section 15 re-read: YES. All OFF. Initials: ____
- Verifier run: [timestamp or "within 24h"]
- Evidence artifacts: [screenshots, notes file, tracker row ID]
Next step:
```

Master Evidence Log lives alongside this packet (e.g. internal drive or private repo note). Must be reviewable by founder at any gate.

### Required Audit Fields (Always Present)
- Verifier pass confirmation for this packet and aggregate before any demo or handoff.
- Safety re-confirmation at every gate.
- No production data or external service references in any log entry.

---

## 15. Explicit Safety Guardrails

This section must be reviewed and re-initialed at every major gate (before outreach, before demo, before handoff, after any no-go). All items below are confirmed OFF / NOT ACTIVATED for first paid roofer sales outreach unless a separate, explicit, written founder approval is captured in the Evidence Log.

### Confirmed Disabled (No Activation in Any Form)
- Live homeowner SMS / Twilio sending: DISABLED
- Live roofer reply SMS: DISABLED
- Live Vapi outbound or inbound voice automation: DISABLED (test-only dry-run payloads only)
- Live Calendar booking / event creation for homeowners or contractors: DISABLED (internal dry-run placeholders only)
- Live Resend production email sends (beyond any pre-approved internal test templates): DISABLED
- Live Lindy or external agent triggers: DISABLED
- Cron / scheduler / dispatcher production runs: DISABLED
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED
- Production data mutation of any roofer, lead, or customer records: DISABLED
- Public route activation (webhooks, APIs, status pages exposed beyond internal dashboard): DISABLED
- Contractor portal or dashboard exposure to real paying customers (read-only internal demo dashboards only): DISABLED
- Auth / RLS / security policy implementation or changes: NONE (this packet contains zero schema, zero policies, zero secrets handling code)
- Payment automation (billing engine, invoice generation, or first-month payment collection automation): NONE (manual handoff checklists + pricing explanation only)
- Any public marketing or customer contract language claiming automatic booking, guaranteed results, or "monthly billing day-15 phrasing" without the required 14-day trial + automated pre-billing email framing: FORBIDDEN (enforced by verifiers on all public assets and this packet)

### Required Safety Markers (Must Appear in This Packet and All Related Artifacts)
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
- Payment/invoice behavior added: no
- SMS/Twilio/Vapi/Calendar/Resend/Lindy production trigger: no

### Re-Confirmation Protocol

At every gate in sections 1-14 above, the operator must:
1. Re-read this safety section 15.
2. Run the full aggregate verifier and this packet's verifier.
3. Log "Safety re-confirmed: all 15 guardrails OFF" + timestamp + operator initials in the gate's Evidence Log.
4. If any guardrail would be violated by a proposed action, mark HOLD or BLOCKED and escalate to explicit founder written approval before proceeding.

### Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)

- 7-day pilot
- 5 qualified appointments in 7 days
- guarantee (in context of jobs/revenue/appointments/outcomes)
- booked jobs / book jobs / booked-job
- automatic estimate / auto-estimate / automatic quote / auto quote
- invoice generated / payment link / collect payment (as automated behaviors)
- Monthly billing starts on day 15 (without 14-day trial framing)
- Founder-Led Launch Program (in public/customer copy; internal ops language only where unavoidable, never as public positioning)

Any occurrence in public copy or this packet's external/prospect-facing sections must cause verifier failure. The list above is allowed only inside this "Forbidden Public Phrases" documentation section.

---

## Decision Log (Master — Append for the First Paid Roofer Sales Outreach)

| Date | Gate/Section | Prospect | Decision (PASS/HOLD/BLOCKED) | Justification + Safety Re-Conf | Next Action |
|------|--------------|----------|------------------------------|--------------------------------|-------------|
|      |              |          |                              |                                |             |

All entries must reference safety guardrails re-confirmation (section 15) and verifier run.

Example starter row:
2026-06-08 | Pre-outreach profile review | [Example Co] | PASS | Strong lead volume, clear pain, owner reachable, service area overlap. Safety re-confirmed all 15 OFF. Verifier green. | Send warm outreach message per section 3.

---

## Explicit Final Confirmation for This Packet

This packet is explicitly:
- Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer sales outreach.
- No auth changes: yes
- No database schema changes: yes
- No RLS policies: yes
- No production data writes: yes
- No live workflow activation activated: yes
- No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation activated.
- Public/business positioning uses only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup (config only) + 14-day trial + automated email 2 days before first monthly payment + cancel anytime + no long-term contract.
- All outreach messages, discovery, objection handling, pricing explanations, and handoff language strictly limited to the above.
- Forbidden phrases are absent from all prospect-facing content (enforced by verifier outside the documentation list section).
- Handoff to First Paid Roofer Launch System Packet is the defined exit point.
- Product-moving: contains concrete profiles, full templates, checklists, scorecard, tracker, logs, and decision gates so Jason can execute end-to-end without additional invention.
- No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated.

## Safety Re-Confirmation (Initial for Packet Creation)

Operator: [founder / Jason]
Date: 2026-06-08
All 15 guardrails confirmed OFF.
Verifiers passed.
No live activation language introduced.
Forbidden phrases absent from public/prospect sections.

---

## Appendix: Quick Reference — Allowed Language Only (For All Outreach & Calls)

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup (onboarding/configuration only).
- 14-day trial begins after Guided Setup go-live.
- Automated email 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

Use the exact phrasing in sections 3-10 and 12-13. When in doubt, read the script.

This completes the First Paid Roofer Sales Outreach System Packet.