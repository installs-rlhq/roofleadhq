# First Paid Roofer Demo + Close Execution Kit

Date: 2026-06-11

## Purpose

This is the practical manual execution system Jason (founder/operator) can use after a roofer replies or agrees to talk: prepare for the demo call, run the demo, qualify fit, explain the offer/trial clearly, handle objections, decide PASS/HOLD/BLOCKED, close the first paid roofer or route to no-go/not-now, and hand off into the existing First Paid Roofer Launch System Packet for RoofLeadHQ.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal scorecards, worksheets, decision logs, objection logs, and evidence logs are internal-only / dry-run / founder-operator-only. This is a manual execution kit, not automation. No public founder-led/manual babysitting positioning is used for prospects.

This kit is product-moving and operationally usable: it contains the concrete demo-call readiness checklist, pre-demo preparation worksheet, demo call agenda, full demo script using only allowed prospect-facing language, 20+ discovery question bank, fit decision scorecard with PASS/HOLD/BLOCKED thresholds and evidence requirements, objection handling playbook with safe responses, trial and payment explanation framing, close / no-close decision tree with required next actions per path, sales-to-launch handoff artifact template, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer demo and close using only this document + the referenced prospect pipeline tracker packet + outreach execution kit + sales outreach system packet + launch system packet + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-reply / post-agree-to-talk manual execution layer. It complements (does not replace) the upstream prospect identification/tracking in the Prospect Pipeline / Tracker Packet, the day-one execution in the Outreach Execution Kit, and the full sales/outreach/demo process in the Sales Outreach System Packet. It focuses on the demo + close phase and stops at clean handoff artifacts into the Launch System Packet for the first paid roofer. Jason (founder/operator) uses this kit after a reply or "yes to talk" to prepare, run, decide, and hand off.

This kit file: `docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js`

## Scope

- First paid roofer demo and close (the first real contractor who will pay after the 14-day trial).
- All stages after prospect reply or "agrees to talk": readiness, pre-demo prep, running the demo, discovery, fit scoring, objection handling, trial explanation, PASS/HOLD/BLOCKED decision, close or route, and handoff to Launch System Packet.
- Internal founder/operator worksheets, decision trees, logs, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 12) that must be re-confirmed before every demo prep, call, decision, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (Guided Setup onward). References upstream packets for context only.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in section 12/13 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, manual prep, manual call execution (phone/video), note-taking, decision logging, and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of Guided Setup, go-live, trial ops, or first payment. Those are covered in the Launch System Packet after handoff.
- No prospect-facing or public copy may use internal-only language (see section 13). Internal founder/operator/manual language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate full outreach message templates or early pipeline sourcing (see Outreach Execution Kit and Sales Outreach System Packet).

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, prospect-facing, demo script, agenda, discovery, objection responses, trial explanation, handoff artifacts that touch prospects, and any customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 12 and 13.

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
node --check backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js
scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Prospect identification/tracking base: `docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md` + its wrapper and verifier
- Day-one outreach execution: `docs/FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md` + its wrapper and verifier
- Full sales/demo/fit/handoff: `docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md` + its wrapper and verifier
- Guided Setup + launch: `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_PILOT_LAUNCH_PACKET.md, FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md, FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md, FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md, MANUAL_OUTREACH_OPERATIONAL_QA_CHECKLIST.md
- This kit's wrapper: `scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js`

---

## 1. Demo-call Readiness Checklist

**Internal-only / founder-operator-only. Complete this before any demo prep or scheduling. Gate: must be PASS before proceeding to section 2.**

Use after reply received, intro received, or call requested.

- [ ] Prospect replied / intro received / call requested (capture verbatim reply or note in Evidence Log)
- [ ] Company and service-area fit (roofer operates in residential/commercial roofing within target geography; confirm no obvious mismatch)
- [ ] Lead source context (paid leads? which platforms? volume signals from initial notes)
- [ ] Paid-lead pain signal (explicit or strong inference that they pay for leads and feel leakage)
- [ ] Response-speed pain signal (mentions slow reply, missed leads, follow-up gaps, or "we lose leads")
- [ ] Lead volume estimate (minimum viable for trial value: at least 10-20 leads/month target; record source of estimate)
- [ ] Owner/founder decision-maker status (confirmed owner, founder, or authorized payer/decision maker on call or in thread)
- [ ] Outreach history (prior touches, channel, dates, replies — reference tracker)
- [ ] Objection history (any prior "not now", price, "we already have...", guarantee asks — record verbatim)
- [ ] Evidence links/references (email threads, LinkedIn messages, notes, screenshots — store locally only, no prod)
- [ ] PASS/HOLD/BLOCKED gate before demo: 
  - PASS: all core signals present, decision maker confirmed or scheduled, no hard disqualifiers
  - HOLD: missing key signals (e.g. lead volume unclear) but promising — schedule research or short discovery call first
  - BLOCKED: hard disqualifier (guarantee seeker, non-roofer, payment red flags, extreme skepticism requiring founder babysitting framing)

Record gate decision + 1-line rationale + timestamp in Demo Readiness Queue (section 11) and Evidence Log.

Re-confirm section 12 Safety Guardrails before advancing.

## 2. Pre-demo Preparation Worksheet

**Internal-only / founder-operator-only. Fill before every scheduled demo call. Do not bring into prospect view.**

- Roofer summary (name, company, location/service area, role, contact channel used)
- Current lead sources (list all known: Google, HomeAdvisor/Angi, Thumbtack, Facebook/IG ads, website forms, referral, other paid, organic)
- Current response process (who replies to leads? how fast? email/SMS/phone? any automation today?)
- Missed-lead symptoms (what they report or infer: leads going cold, slow follow-up, "we get leads but don't convert", no-show inspections)
- Follow-up gap (do they have systematic 2nd/3rd touch? manual only today? any CRM follow-up rules?)
- Calendar/inspection booking friction (how do they book inspections today? phone tag? back-and-forth? double-booking risk? no shared calendar?)
- Current tools (CRM name/version if any, calendar, email, spreadsheets, other automation; note integration friction)
- Trial-fit notes (why this roofer is likely to see value in 14-day trial after Guided Setup; what pain RoofLeadHQ AI directly addresses)
- Questions to ask (pull top 5-8 from section 5 bank; customize to known gaps)
- Red flags to verify (guarantee language, "I only pay after close", "we need auto quotes", non-decision-maker on call, tiny volume, outside service area)
- Demo outcome objective (what must be true by end of call to reach PASS vs HOLD vs BLOCKED; target: enough data for clean fit score + trial language confirmation or clean no-go)

Print or copy this worksheet locally. Update live during call in section 11 Discovery Notes table. Re-confirm safety before call.

## 3. Demo Call Agenda

**Prospect-facing language only in spoken/demo portions. Internal notes labeled.**

Use this agenda for every demo call. Keep calls 15-25 minutes. Goal: surface fit data, confirm trial understanding, reach clear PASS/HOLD/BLOCKED.

1. Opening frame (2 min)
2. Why RoofLeadHQ exists (1 min)
3. Problem framing: paid roofing leads leak when response/follow-up is slow (2-3 min)
4. RoofLeadHQ AI positioning (1 min)
5. What RoofLeadHQ does (2 min)
6. What RoofLeadHQ does not promise (1 min)
7. Guided Setup (2 min)
8. 14-day trial after setup goes live (1 min)
9. Automated email 2 days before first monthly payment (30s)
10. Cancel anytime (30s)
11. No long-term contract (30s)
12. Fit questions / discovery (5-8 min — use section 5 bank)
13. Next-step close (2 min)

Stay on script for framing and trial explanation. Use discovery questions naturally. Do not improvise guarantees or day-15 language.

Internal only: After agenda item 6, mentally note red flags. Pause for decision-maker confirmation if needed. If on call with non-decision-maker, treat as HOLD path unless owner joins.

## 4. Demo Script

**Prospect-facing language only. Use or close paraphrase. Never deviate into forbidden phrases or guarantees.**

**Opening frame:**
"Hi [Name], thanks for replying / taking the call. I'm [Jason/Operator]. RoofLeadHQ helps roofers turn the leads they're already paying for into booked homeowner appointments. The short version is fast response plus automated follow-up so leads don't go cold. Before we dive in, quick context: this is a demo of how it would work on your leads and calendar. No production connection yet."

**Why RoofLeadHQ exists:**
"Roofers spend real money on paid leads from Google, Angi, and others. The problem isn't getting the leads — it's what happens in the first minutes and hours after they come in. Slow reply or missed follow-up turns paid leads into nothing."

**Problem framing:**
"Paid roofing leads leak when response and follow-up are slow. A lead that sits for 30 minutes or gets one touch and goes dark rarely books. Most roofers we talk to know they lose leads this way but don't have a reliable system for fast first response plus the next 2-3 touches without someone babysitting the inbox all day."

**RoofLeadHQ AI positioning:**
"RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. It is not a lead gen tool — it works on the leads you already have or buy."

**What RoofLeadHQ does:**
"It watches your lead sources, replies fast with the right first message using your rules, follows up on the ones that don't reply, recovers the ones that went quiet, and books the inspection into your calendar when the homeowner is ready. You and your team focus on the inspections, estimates, and closing. Guided Setup happens first so it knows your service area, qualification rules, follow-up preferences, and calendar."

**What RoofLeadHQ does not promise:**
"I won't promise specific numbers of jobs or appointments — that depends on your lead volume, service area, pricing, how your team closes, and the quality of the leads you bring in. What we can show is exactly how the response and follow-up flow would work on your actual lead types. The 14-day trial after Guided Setup lets you see it live on your leads with zero risk."

**Guided Setup:**
"First step is always Guided Setup — we walk through connecting your lead sources, setting your service area and rules, telling it your follow-up style, and linking your calendar. This is configuration, not magic. Once setup goes live, the system starts handling the repetitive parts. No long setup project."

**14-day trial after setup goes live:**
"The 14-day trial begins after RoofLeadHQ AI setup goes live. You see it working on your real leads and calendar for 14 days before any payment."

**Automated email 2 days before first monthly payment:**
"An automated email is sent 2 days before the first monthly payment so there are no surprises."

**Cancel anytime:**
"Cancel anytime. No long-term contract."

**Fit questions (transition):**
"Before we talk next steps, I have a few questions so I can show you the right example and we can both decide if this is a fit. [Use discovery questions from section 5.]"

**Next-step close:**
"Based on what we covered, two paths:
- If this looks like it would help with the leads you're already paying for and you want to see it on your actual setup, the next step is Guided Setup (we can book a 30-45 min working session). Then the 14-day trial starts after go-live.
- If timing is off, lead volume is too low right now, or it's not the right fit, we can close the loop cleanly and I can note a follow-up in 60-90 days.

What feels right to you?"

Internal only: Log exact answers, red flags surfaced, and decision in section 11 tables. Never say "you book the inspection" or imply automatic jobs.

## 5. Discovery Question Bank

**At least 20 specific questions. Use during agenda item 12 and pre-demo prep. Record answers in Discovery Notes table (section 11). Grouped for flow.**

**Lead sources**
1. Where are most of your paid leads coming from right now (Google Local Services, Angi/HomeAdvisor, Thumbtack, Facebook/IG, website forms, others)?
2. Which of those are you actively paying for today, and roughly how much per lead or per month?
3. Do you have a website form or landing page that also feeds leads directly to you?

**Lead volume**
4. Ballpark, how many leads (paid + organic) do you get in a typical month right now?
5. Has that volume been steady, growing, or dropping over the last 3-6 months?
6. What percentage of leads turn into booked inspections today (your best estimate)?

**Missed leads**
7. When you look back at the last month, how many leads do you think went cold or got no follow-up?
8. Do you have a sense of how many homeowners called or submitted but never heard back in time?

**Speed-to-lead**
9. On average, how fast does your team (or you) reply to a new lead that comes in during business hours? After hours?
10. Have you noticed a drop-off when reply time is over 10-15 minutes?

**Follow-up process**
11. After the first reply, what does the next follow-up look like for leads that don't respond right away?
12. Do you have any system or habit for 2nd and 3rd touches, or does it depend on someone remembering to check the inbox?

**Inspection booking process**
13. Once a homeowner is interested, how do you get them on the calendar for an inspection? Phone tag, texts back and forth, shared calendar?
14. What friction do you or your team feel when trying to book inspections from leads?

**CRM/tooling**
15. What tools or CRM are you using today to track leads and follow-ups (JobNimbus, ServiceTitan, spreadsheets, nothing)?
16. If you have a CRM, how much of the follow-up is still manual?

**Seasonality**
17. How does lead volume and close rate change by season in your area? Any slow months where a trial would be hard to evaluate?

**Service area**
18. What are your main service areas or zip codes right now? Any plans to expand or pull back?

**Decision-maker authority**
19. For the business side (tools, subscriptions, paying for leads), are you the decision maker or is there a partner/spouse/team member who also needs to weigh in before a 14-day trial?

**Trial expectations + bad-fit signs**
20. What would "this is working" look like for you after 14 days of seeing it on your leads?
21. Are there any must-haves or deal-breakers for you on a new tool that handles lead response and booking (for example, guarantees on results, specific integrations, or payment terms)?
22. Have you tried other automation or follow-up tools before? What worked or didn't?

Internal only: Mark any answer that surfaces a red flag (guarantee demand, "only pay after the job", "we need it to write estimates automatically", volume under 8-10/month with no growth plan, non-roofing business, etc.). Add custom questions as gaps appear.

## 6. Fit Decision Scorecard

**Internal-only. Complete immediately after every demo (or after sufficient discovery data). Score 1-5 where 5 = excellent fit for first paid slot. Total range 12-60. Use with evidence.**

Rate each item. Record score + 1-line evidence/quote.

- Lead volume (1-5): 5 = 30+ leads/month clear signal; 3 = 10-20; 1 = <8 with no plan
- Lead source quality (1-5): 5 = mostly paid sources with documented cost; 3 = mix paid + organic; 1 = all organic/low intent or unknown
- Missed-lead pain (1-5): 5 = explicit "we lose leads" or "follow-up is our biggest hole"; 3 = admits inconsistency; 1 = "we reply pretty fast, no problem"
- Speed-to-lead pain (1-5): 5 = acknowledges 30min+ gaps or after-hours failure; 3 = some delay admitted; 1 = claims instant reply always
- Follow-up gap (1-5): 5 = no systematic 2nd/3rd touch today; 3 = occasional manual; 1 = robust process already
- Inspection booking fit (1-5): 5 = clear phone tag / back-and-forth friction + willingness to let AI propose slots; 3 = some friction; 1 = already smooth shared calendar with no pain
- Owner access / decision-maker fit (1-5): 5 = owner/founder on call + confirmed budget authority; 3 = owner reachable soon; 1 = salesperson or assistant only, owner unreachable
- Setup readiness (1-5): 5 = has lead source logins ready or easy to get, calendar they can share; 3 = some access hurdles but solvable; 1 = "our IT guy handles that" or no clear owner of accounts
- Trial expectations (1-5): 5 = "I want to see it on my leads for 14 days and decide"; 3 = reasonable but wants to see X first; 1 = "prove it will get me X jobs in first month"
- Payment readiness (1-5): 5 = clear "we pay for tools that save time/leads" and no "pay after close" stance; 3 = budget exists but cautious; 1 = extreme payment red flags or "we only pay when we close a job"
- Safety/no-overclaim risk (1-5): 5 = accepts "no guarantees, depends on your leads and close rate"; 3 = mild skepticism but listens; 1 = demands job/revenue guarantees or "how many will you book for me?"
- Setup / go-live friction (1-5, optional tiebreaker): 5 = low friction signals; 1 = major account/IT blockers

**PASS / HOLD / BLOCKED thresholds (internal only):**
- PASS (advance to handoff to Launch System Packet): Total >= 42 AND no item scored 1 AND decision-maker confirmed AND trial language ("14-day trial after setup goes live", "automated email 2 days before first monthly payment", "cancel anytime", "no long-term contract") explicitly confirmed by prospect without pushback.
- HOLD (missing information or timing): Total 32-41 OR one key item 1-2 (e.g. volume unclear, decision maker not present) OR trial expectations not yet confirmed. Requires specific next action (research, owner join call, more discovery) with date.
- BLOCKED (bad fit): Total <32 OR any hard disqualifier (guarantee-seeking after explanation, wants automated quote/invoice/payment, non-roofing business, service area mismatch that can't be fixed, payment red flag like "pay only after close the job", extreme volume too low with no plan).

Evidence required for each score: verbatim quote or observed behavior logged in Evidence Log + Discovery Notes table. Do not advance on scores alone — evidence must support.

Internal only: Re-score after any follow-up call. Update tracker.

## 7. Objection Handling Playbook

**Prospect-facing responses only. Concise, calm, use allowed framing. Never guarantee, never day-15, never "we'll babysit it for you". Log every objection + response used + prospect reaction in Objection Log (section 11).**

**"I already have someone answering leads."**
"Most roofers we talk to already have someone (or you) replying to leads. The gap that shows up is the second and third touches plus the leads that come in after hours or get buried. RoofLeadHQ AI turns the leads you already get into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. The 14-day trial after Guided Setup lets you see exactly how the full flow would run on your actual leads. Cancel anytime."

**"We already use a CRM."**
"Most serious roofers do. RoofLeadHQ AI works alongside your CRM — it handles the fast first response and the follow-ups that often fall through in a busy inbox or CRM task list, then pushes the booked inspection into your calendar. During Guided Setup we look at what you already have so we don't duplicate work. The 14-day trial shows you the difference on your real leads."

**"I need more leads, not follow-up."**
"More leads only helps if the ones you already pay for are turning into appointments. A lot of roofers see the same or better results from tightening response and follow-up on existing paid volume before spending more on new leads. RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup + 14-day trial after it goes live lets you measure the difference with zero risk. Cancel anytime."

**"How do I know this will work?"**
"You won't know until you see it on your own leads and calendar. That's exactly why we do Guided Setup first, then the 14-day trial begins after setup goes live. An automated email goes out 2 days before the first monthly payment. If it doesn't feel valuable, cancel anytime. No long-term contract."

**"Is this automated?"**
"Yes — after Guided Setup, the fast replies and follow-ups run automatically using the rules and templates you set. You and your team still handle the inspections, estimates, and conversations that require a human. The goal is to remove the repetitive inbox and follow-up work so you can focus on the jobs."

**"Do you guarantee appointments?"**
"I can't and won't guarantee a specific number of appointments or jobs — that depends on your lead volume, service area, pricing, and how your team closes once the homeowner is on the calendar. What RoofLeadHQ AI does is turn the leads you already get into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. The 14-day trial after Guided Setup lets you watch it work on your actual leads with zero risk. Cancel anytime."

**"What happens after the trial?"**
"If it is working for you, the first monthly payment happens after the 14-day trial. An automated email is sent 2 days before that payment. If it is not a fit, you cancel — no long-term contract, no surprise charges."

**"Can I cancel?"**
"Yes, cancel anytime. No long-term contract. The 14-day trial after Guided Setup go-live gives you a full window to evaluate on your real leads before the first monthly payment."

**"How much setup is required?"**
"Guided Setup is the first step — typically 30-45 minutes of focused work connecting your lead sources, setting your service area and qualification rules, choosing follow-up preferences, and linking your calendar. It's configuration, not a long project. After that, the 14-day trial begins once setup goes live."

**"What if the leads are bad?"**
"If the leads coming in are low-intent or outside your area, fast response and follow-up won't create appointments that weren't there. During Guided Setup we set qualification rules so the system only spends time on leads that match your criteria. The 14-day trial shows you exactly how it behaves on your real lead mix. You decide if the volume and quality you already have is worth the follow-up automation."

**"I don't want another system."**
"Fair. Most roofers already have a CRM or inbox they live in. RoofLeadHQ AI sits on top of the leads you already receive and handles only the repetitive response and follow-up work, then books the inspection into the calendar you already use. Guided Setup takes 30-45 minutes and the 14-day trial after go-live shows you whether it saves time or not. Cancel anytime if it adds friction instead of removing it."

Internal only: If prospect keeps circling back to guarantees after two clear explanations, route to BLOCKED. Record verbatim.

## 8. Trial and Payment Explanation

**Prospect-facing only. Use exact framing every time. No deviations. Confirm understanding before any close attempt.**

Use this script (or close paraphrase) on every demo call and in follow-up materials. Never use "Monthly billing starts on day 15", "day 15", "14-day launch trial", or any 7-day/5-qualified variant.

"Guided Setup happens first. We connect your lead sources, service area, rules, follow-up style, and calendar. This is the configuration step.

Once Guided Setup goes live, the 14-day trial begins. You see RoofLeadHQ AI working on your real leads and calendar for a full 14 days.

An automated email is sent 2 days before the first monthly payment — so you have clear notice.

After the trial, if you continue, the first monthly payment processes. Cancel anytime. No long-term contract."

**Confirmation check (ask explicitly):**
"Just to make sure we're on the same page: Guided Setup first, then 14-day trial after it goes live, automated email 2 days before the first monthly payment, cancel anytime, no long-term contract. Sound right?"

Internal only: Record confirmation (yes / questions / pushback) + exact words used in Trial/Payment Explanation Confirmation table (section 11) and Evidence Log. Do not proceed to close or handoff without affirmative confirmation.

## 9. Close / No-Close Decision Tree

**Internal-only. Use after demo + scorecard + objection handling + trial confirmation. Choose exactly one path. Record in Close/No-Close Decision Log (section 11) with timestamp + owner + next action.**

- **Close now (PASS to handoff):** Fit scorecard >=42 with no 1s, decision-maker authority confirmed, trial language explicitly confirmed ("Guided Setup first, 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract"), no unresolved hard objections. 
  - Required next action: Complete Sales-to-Launch Handoff Summary (section 10 + section 11 table). Update upstream tracker. Schedule Guided Setup session. Hand off to Launch System Packet owner (Jason or designated). Mark prospect "HANDED OFF TO LAUNCH" in all queues.

- **Demo complete, needs follow-up (soft close):** Good signals (score 38+) but one minor gap (e.g. wants partner to hear the trial explanation, needs to check calendar access). 
  - Required next action: Schedule specific follow-up call or async confirmation within 3-5 business days. Add to Follow-up/Nurture Queue (section 11). Send only manual summary email using allowed language. Do not hand off yet.

- **HOLD: missing information:** Key data still unclear (lead volume estimate weak, service area fuzzy, current process details missing).
  - Required next action: Specific research task or short discovery question list sent manually. Due date in tracker. Re-score after new info. Do not schedule Guided Setup.

- **HOLD: decision-maker not present:** Spouse/partner or owner not on the call and must approve.
  - Required next action: Request intro or joint call. Do not assume "they'll be fine with it." Add to Follow-up/Nurture Queue with owner-join target date.

- **HOLD: service-area uncertainty:** Roofer serves areas outside clear target or is testing expansion with unclear volume.
  - Required next action: Clarify exact zips + volume per area. HOLD until mapped to realistic lead flow.

- **HOLD: lead volume unclear:** Prospect cannot estimate or gives <8-10/month with no paid sources.
  - Required next action: Ask for last 30-60 day lead count (screenshots or CRM export, local only). Re-evaluate only with data.

- **BLOCKED: bad fit:** Score <32 or clear mismatch (non-roofing, wrong geography, no paid leads and no plan, tiny operation with no growth intent).
  - Required next action: Close thread cleanly with short manual note using allowed language ("If your lead volume grows or timing changes, feel free to reply in 60-90 days"). Mark BLOCKED in tracker. Move to nurture only if they explicitly ask. No further investment.

- **BLOCKED: guarantee-seeking:** After two clear explanations still demands "how many jobs/appointments will I get?" or "guarantee X in the trial."
  - Required next action: Final polite close using the "I can't guarantee specific numbers..." language from section 7. Log verbatim. Mark BLOCKED. Do not hand off or nurture aggressively.

- **BLOCKED: wants job/revenue guarantee:** Explicit "I need this to guarantee revenue/jobs" or "pay only if I close X jobs."
  - Required next action: Immediate BLOCKED. Use the no-guarantee language once more, then close loop. No future nurture unless they retract.

- **BLOCKED: wants automated quote/invoice/payment:** "Does it write estimates automatically?" "Will it send invoices and collect payment?"
  - Required next action: Clarify once: "RoofLeadHQ AI handles fast response, automated follow-up, and missed-lead recovery into booked appointments. Estimating, quoting, invoicing, and payment collection remain with you and your current tools." If they require auto-estimate/quote/invoice/payment as condition, BLOCKED. Close cleanly.

- **Not-now / nurture:** Timing issue (slow season, busy with other projects, "maybe in 2-3 months"), no hard BLOCKED signals, positive relationship.
  - Required next action: Add to Follow-up/Nurture Queue with 60-90 day manual touch date. Send one manual close-the-loop note using allowed language. Log for future pipeline review.

- **No-go:** Clear negative (hostile, scam-adjacent, wrong business model, explicit "never going to pay for this").
  - Required next action: Immediate close. One-sentence manual note if appropriate ("Thanks for your time — if your situation changes, you have our contact"). Mark NO-GO. Remove from all active queues. No nurture.

Every path must have a recorded next action owner + due date in the decision log and tracker. No open loops.

## 10. Sales-to-Launch Handoff Artifact

**Required template. Complete this only on PASS path. This is the formal transition point into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md. Sales/demo/close work ends here.**

Copy the filled artifact into the Launch System Packet evidence log / intake section and update the upstream tracker.

**Handoff Fields (all required):**

- Prospect/company/contact: [Full name, Company, Phone, Email, Preferred channel, Location/service area]
- Decision status: PASS (or HOLD/BLOCKED with reason if not clean handoff)
- Fit score: [Total /60] + key high/low items noted
- Trial terms confirmed: [Yes — verbatim confirmation quote or "Confirmed: Guided Setup first, 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract"]
- Setup readiness: [Lead source access known? Calendar ready? Qualification rules discussed? Owner of accounts identified?]
- Lead source notes: [List of sources + any volume/cost signals from discovery]
- Booking preferences known/unknown: [How they currently book; any preferences on how AI should propose slots; known/unknown]
- Follow-up preferences known/unknown: [Tone, number of touches, when to stop; known/unknown]
- Reporting expectations known/unknown: [What they want to see weekly/monthly; known/unknown]
- Objections resolved/unresolved: [List with resolution status; any open must be noted as HOLD]
- Evidence log references: [Dates + key verbatim quotes + local file refs for replies, discovery answers, scorecard]
- Go-live assumptions: [What must be true for Guided Setup session (e.g. lead source credentials available day-of, calendar share permission, 30-45 min focused window)]
- Next action owner/date: [Who owns scheduling Guided Setup session; target date; confirmation method]

Internal only: Do not hand off on HOLD or BLOCKED. Handoff only on confirmed PASS + all fields populated with evidence. After handoff, mark all queues "HANDED OFF TO LAUNCH — [date]".

## 11. Manual Tracker Templates

**Copy-paste-ready tables. Use in local spreadsheet, notes app, or printed. 9 tables as required. Update at every gate. Internal-only data.**

### Demo Readiness Queue
```
| Date Added | Company | Contact | Source/Reply Channel | Lead Vol Est | Pain Signals | DM Status | Outreach History | Objection History | Gate (PASS/HOLD/BLOCKED) | Gate Rationale | Next Action | Next Date | Evidence Ref |
|------------|---------|---------|----------------------|--------------|--------------|-----------|------------------|-------------------|--------------------------|----------------|-------------|-----------|--------------|
| 2026-06-11 | ABC Roofing | John D | LinkedIn reply "yes demo" | 25/mo | Slow reply, missed after hours | Owner on thread | 2 prior touches | None | PASS | All core signals + DM confirmed | Prep worksheet + schedule | 2026-06-12 | Thread #42 |
```

### Pre-demo Prep Worksheet
```
| Company | Roofer Summary | Lead Sources | Current Response | Missed-Lead Symptoms | Follow-up Gap | Calendar/Booking Friction | Current Tools | Trial-Fit Notes | Questions to Ask | Red Flags to Verify | Demo Outcome Objective |
|---------|----------------|--------------|------------------|----------------------|---------------|---------------------------|---------------|-----------------|------------------|---------------------|------------------------|
| ABC Roofing | John D, owner, 15y roofing, Metro area | Google LSA + Angi + website | 1-4 hrs during day, none after hours | "Leads go dark after first message" | No 2nd/3rd touch system | Phone tag 50% of time | None (spreadsheet) | High paid volume + explicit pain = good trial candidate | Q4, Q9, Q13, Q19 | Guarantee ask? DM confirm? | PASS if score >=42 + trial lang confirmed |
```

### Discovery Notes
```
| Company | Q# | Question | Prospect Answer (verbatim) | Red Flag? | Notes |
|---------|----|----------|----------------------------|-----------|-------|
| ABC Roofing | 1 | Where are most paid leads from? | "Google LSA and Angi, about $80-120/lead" | No | Good paid signal |
| ABC Roofing | 9 | Avg reply speed? | "I try to reply in 15-30 min but after 5pm nothing until next day" | No | Clear speed pain |
```

### Fit Scorecard
```
| Company | Lead Vol (1-5) | Lead Src Q (1-5) | Missed Pain (1-5) | Speed Pain (1-5) | Follow-up Gap (1-5) | Booking Fit (1-5) | DM Fit (1-5) | Setup Ready (1-5) | Trial Exp (1-5) | Payment Ready (1-5) | Safety Risk (1-5) | Total | Gate | Evidence Summary |
|---------|----------------|------------------|-------------------|------------------|---------------------|-------------------|--------------|-------------------|-----------------|---------------------|-------------------|-------|------|------------------|
| ABC Roofing | 4 | 5 | 5 | 4 | 5 | 4 | 5 | 3 | 5 | 5 | 5 | 50 | PASS | Strong paid + pain + DM; setup access needs confirm in Guided Setup session |
```

### Objection Log
```
| Date | Company | Objection (verbatim) | Response Used (key phrase) | Prospect Reaction | Resolved? | Next Step | Evidence |
|------|---------|----------------------|----------------------------|-------------------|-----------|-----------|----------|
| 2026-06-11 | ABC Roofing | "I already have someone answering leads" | "gap is second/third touches... 14-day trial after Guided Setup" | "Yeah the after hours ones slip" | Yes | Continue demo | Call notes 2026-06-11 |
```

### Trial/Payment Explanation Confirmation
```
| Date | Company | Confirmation Quote (verbatim or "yes") | Any Pushback? | Confirmed by Prospect? | Logged By | Notes |
|------|---------|----------------------------------------|---------------|------------------------|-----------|-------|
| 2026-06-11 | ABC Roofing | "Guided Setup first, 14 days after it goes live, email 2 days before payment, cancel anytime, no contract — got it" | None | Yes | J | Clear affirmative |
```

### Close/No-Close Decision Log
```
| Date/Time | Company | Decision Path | Fit Score | Trial Confirmed? | Key Rationale | Required Next Action | Owner | Due Date | Status |
|-----------|---------|---------------|-----------|------------------|---------------|--------------------|-------|----------|--------|
| 2026-06-11 14:30 | ABC Roofing | Close now (PASS to handoff) | 50 | Yes | All thresholds met, no flags | Complete handoff summary + schedule Guided Setup | J | 2026-06-12 | Done - handed to Launch |
```

### Sales-to-Launch Handoff Summary
```
| Field | Value |
|-------|-------|
| Prospect/Company/Contact | John D, ABC Roofing, 555-123-4567, john@abcroofing.com, Metro + 3 zips |
| Decision Status | PASS |
| Fit Score | 50/60 |
| Trial Terms Confirmed | Yes — "Guided Setup first, 14 days after it goes live, email 2 days before payment, cancel anytime, no contract" |
| Setup Readiness | Lead sources (Google + Angi) logins available; calendar Google; 45 min window next Tue |
| Lead Source Notes | Google LSA (~15/mo), Angi (~10/mo), website forms (~5/mo); ~$100 CPL blended |
| Booking Preferences Known/Unknown | Phone tag today; wants AI to propose 2 slots and confirm; known |
| Follow-up Preferences Known/Unknown | 3 touches max, stop on "stop" or no reply 14d; tone professional but direct; known |
| Reporting Expectations Known/Unknown | Weekly email summary of leads handled + booked; unknown detail level — capture in Guided Setup |
| Objections Resolved/Unresolved | "Already have someone" resolved; no others |
| Evidence Log References | Call notes 2026-06-11, reply thread 2026-06-10, scorecard 2026-06-11 |
| Go-Live Assumptions | Credentials day-of, decision maker present for full session, 30-45 min focused |
| Next Action Owner/Date | J to confirm Tue 10am Guided Setup slot by EOD today |
```

### Follow-up/Nurture Queue
```
| Company | Contact | Last Touch Date | Next Touch Type | Next Due | Reason / Context | Manual Message Draft (use only allowed language) | Status |
|---------|---------|-----------------|-----------------|----------|------------------|--------------------------------------------------|--------|
| XYZ Roofing | Mike S | 2026-06-05 | Nurture 60d | 2026-08-05 | "Not now, slow season" | "Hi Mike, following up on our note about RoofLeadHQ AI turning roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup first, 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract. Still open to a short demo if timing improves?" | Pending |
```

## 12. Safety Guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before demo prep, before call, before decision, before handoff. All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer demo/close unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only demo preparation: YES (this kit produces prep notes and scripts only)
- Draft-only follow-up preparation: YES (all messages are manual copy-paste drafts; no automation)
- No live send: YES (no Twilio, Resend, or any production message dispatch)
- No automated follow-up: YES
- No CRM automation: YES
- No calendar booking automation: YES
- No payment automation: YES
- No external service calls: YES (no Twilio, Vapi, Resend, Lindy, Stripe, Google Calendar API writes, or any live integrations)
- No production Supabase writes: YES
- No public route activation: YES
- No contractor portal exposure: YES
- No auth/RLS/security implementation: YES (zero schema, zero policies, zero secrets, zero auth code)
- No estimates, quotes, invoices, or payment workflows: YES (this kit never touches or claims any of these)
- No guarantee language: YES (all prospect-facing text and internal decisions enforce this)
- No booked-jobs language: YES (prospect-facing uses only "booked homeowner appointments" via the defined flow; never "book jobs" or "you book the inspection")

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
- Public demo or marketing asset updated with this kit's internal language: no (prospect-facing sections use only approved public strings)

Re-confirm by logging "Safety guardrails re-read and all OFF at [timestamp] before [action]" in Evidence Log before every demo-related action.

## 13. Public-vs-Internal Language Boundary

**Prospect-facing demo language (agenda, script, discovery questions as spoken, objection responses, trial explanation, any email/LinkedIn that could reach a prospect, handoff artifacts that may be shared) must not use founder-led/manual babysitting/public founder-review framing.**

Allowed prospect-facing / public strings (must appear in all such sections):
- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime.
- No long-term contract.

Internal founder/operator/manual review language (founder review, manual review, manual coordination, Live Automation Disabled notes, rehearsal details, command packet references, dry-run workspace notes, operator runbooks, session notes, approval checklists, "Jason will babysit", etc.) may remain in dry-run safety artifacts, internal packets, this kit's internal-only labeled sections, context docs, verifier index, and daily guide — but EVERY such artifact must explicitly state it is internal-only / dry-run / founder-operator-only and NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into website/index.html or outward-facing scripts.

This kit clearly labels internal-only sections (headers and callouts). Verifier enforces that forbidden phrases are absent from all prospect-facing template sections.

### Explicitly Labeled Internal-Only Sections in This Kit
- Section 1 Demo-call Readiness Checklist (full)
- Section 2 Pre-demo Preparation Worksheet (full)
- Section 6 Fit Decision Scorecard (full scoring + thresholds)
- Section 9 Close / No-Close Decision Tree (full paths + required actions)
- Section 10 Sales-to-Launch Handoff Artifact (template + fields)
- Section 11 Manual Tracker Templates (all 9 tables contain internal data only)
- Section 12 Safety Guardrails (full)
- All "Internal only:" callouts and Evidence Log instructions

Prospect-facing sections (3, 4, 5 spoken form, 7, 8) use only the allowed public language.

*End of First Paid Roofer Demo + Close Execution Kit. Use only with full verifier green. Dry-run / internal-only / founder-operator-only. No live activation of any kind.*

