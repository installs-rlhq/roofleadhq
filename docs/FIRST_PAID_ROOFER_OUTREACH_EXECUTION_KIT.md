# First Paid Roofer Outreach Execution Kit

Date: 2026-06-10

## Purpose

This is the practical day-one execution system Jason (founder/operator) can use to manually find, qualify, contact, follow up with, and hand off the first paid roofer prospect into the existing Sales Outreach System Packet and Launch System Packet for RoofLeadHQ.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup first.
- 14-day trial begins after setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal scorecards, trackers, worksheets, and evidence logs are internal-only. No public founder-led/manual babysitting positioning is used for prospects. This kit is strictly dry-run/internal-only/founder-operator-only.

This kit is product-moving and operationally usable: it contains the concrete day-one operating plan, first-20 sourcing worksheet, qualification gate with must-have/strong/HOLD/BLOCKED criteria, message preparation queue (full templates using only allowed public language), manual follow-up execution queue, demo-call readiness handoff (to Sales Outreach System Packet), sales-to-launch handoff trigger (to Launch System Packet), 9 copy-paste-ready manual tracker templates, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute first paid roofer outreach using only this document + the referenced prospect pipeline tracker packet + sales outreach system packet + launch system packet + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the day-one manual execution layer. It complements (does not replace) the upstream prospect identification/tracking in the Prospect Pipeline / Tracker Packet and the full sales/demo/fit/handoff process in the Sales Outreach System Packet. It stops at clean handoff artifacts into those packets for the first paid roofer. Jason (founder/operator) uses this kit to manually find, qualify, contact, follow up with, and hand off the first paid roofer prospect into the existing Sales Outreach System Packet and Launch System Packet.

This packet file: `docs/FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js`

## Scope

- First paid roofer prospecting and early outreach execution (the first real contractor who will pay after the 14-day trial).
- Manual-only day-one blocks: sourcing, qualification, message prep, manual send, follow-up, demo readiness handoff, sales-to-launch handoff.
- Internal founder/operator worksheets, queues, and tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 9) that must be re-confirmed before any manual outreach action or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md` (detailed outreach/demo/fit) and `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (Guided Setup onward).

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in section 9/10 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, manual copy-paste message prep, manual phone/email/LinkedIn sends (when approved in future), note-taking, and handoff documentation only. No live sends or automation activated in this kit.
- This kit does not implement or activate any part of Guided Setup, trial ops, or first payment. Those are covered in the Launch System Packet after handoff.
- No prospect-facing or public copy may use internal-only language (see section 10).

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, prospect-facing, demo, and customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 9 and 10.

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
- booked jobs / book jobs / booked-job
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
node --check backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js
scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Prospect identification/tracking base: `docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md` + its wrapper and verifier
- Full sales/demo/fit/handoff: `docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md` + its wrapper and verifier
- Guided Setup + launch: `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_PILOT_LAUNCH_PACKET.md, FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md, FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md, MANUAL_OUTREACH_OPERATIONAL_QA_CHECKLIST.md
- This kit's wrapper: `scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js`

---

## 1. Day-one Outreach Operating Plan

**Internal-only / founder-operator-only execution plan. Never copy language from internal blocks into prospect communications.**

### Morning Setup Checklist (Internal-only, 5-10 minutes)
- [ ] Open local copy of this kit + the three referenced packets (Prospect Pipeline Tracker, Sales Outreach, Launch System).
- [ ] Confirm last run of this kit's verifier + aggregate pilot readiness + quality gate was green (or run now).
- [ ] Re-read full section 9 Safety Guardrails and section 10 Language Boundary. Log timestamp + "Safety re-confirmed: all guardrails OFF" in Evidence Log (section 8).
- [ ] Open local tracker/spreadsheet for the 9 manual tables in section 8.
- [ ] Review overnight replies (manual email inbox, LinkedIn, phone voicemail only — no automation).
- [ ] Identify top 1-3 prospects from Outreach Queue or Follow-up Queue for today's block.
- [ ] Prepare message drafts only (section 4) — do not send yet.
- [ ] Confirm calendar/time blocks for sourcing (section 2), qualification (section 3), and manual sends if any pre-approved today.

### Prospect Sourcing Block (Internal-only, 30-60 minutes recommended)
- Use only manual channels listed in section 2.
- Add new prospects to the Prospect Source List and master tracker table in section 8.
- Capture required fields + evidence for each.
- Apply initial exclusion/disqualifier screen (section 3).
- Timebox: stop at 20 total active prospects or time limit.
- No external search calls, scrapers, or integrations. Browser + manual notes only.

### Qualification/Scoring Block (Internal-only, 15-30 minutes)
- For each new or updated prospect, run the full Prospect Qualification Gate (section 3).
- Record must-have checks, strong-fit signals, pain signals, lead-volume estimate, service-area fit, owner accessibility.
- Assign initial status: PASS (advance to message prep) / HOLD (more research) / BLOCKED (do not pursue; log reason).
- Update the Prospect Source List table + master tracker (section 8).
- Log verbatim evidence quotes + safety re-confirmation in Evidence Log.

### Message Preparation Block (Internal-only, 15-30 minutes)
- For PASS prospects, prepare first-contact drafts from section 4 queue (warm / cold / referral).
- Tailor minimally using only prospect facts from tracker (company, name, source context).
- Prepare LinkedIn/short version + call opener + voicemail script in parallel if channel mix planned.
- Store drafts in Outreach Queue table (section 8). Mark "DRAFT READY".
- Never send from this block. All sends are deliberate manual action in next block.
- Re-confirm no forbidden phrases slipped into drafts (verifier will catch on next run).

### Manual Send Block (Internal-only — only when explicitly approved for a dry-run test send)
- Only prospects with DRAFT READY + PASS qualification + same-day safety re-confirm in Evidence Log.
- Send only via manual copy-paste into your email client / LinkedIn / phone (no scripts, no bulk tools).
- Record exact text sent (or closest paraphrase) + timestamp + channel in Outreach Queue + Evidence Log.
- Update status to "SENT (warm/cold/referral)" + follow-up due date.
- After send: immediate note in tracker. Do not follow up same day unless inbound reply.
- If any live send occurs in future controlled test: log "Manual send only — no automation used".

### Follow-up Review Block (Internal-only)
- Review Follow-up Queue table (section 8) for due touches.
- For each: prepare next manual touch from section 5 templates (touch 1/2/3).
- Tailor only with prior context + prospect facts.
- Log planned touch in queue + Evidence Log with safety line.
- Execute only as manual send (see above block).
- Apply stop rules / nurture handling immediately on any "stop", "not now", or negative signal. Never continue.

### End-of-Day Pipeline Review (Internal-only, 10 minutes)
- Update all tables in section 8 for actions taken (sends, replies, qualification changes, follow-up counts).
- Refresh Follow-up Queue and Demo Readiness Queue with new due dates.
- Append daily summary to Evidence Log: "EOD [date]: X prospects sourced/qualified, Y messages prepped, Z manual sends, W follow-ups. Safety: all OFF."
- Run this kit's verifier + aggregate (or confirm within 24h).
- Flag any handoff candidates for section 6/7 review (do not hand off without full evidence).
- Note research gaps or blockers for tomorrow.

### Next-Day Handoff (Internal-only)
- At EOD or start of next day: promote top priorities into next day's Morning Setup.
- If a prospect meets demo readiness (section 6), prepare handoff artifact to Sales Outreach System Packet before offering demo scheduling.
- If fit confirmed post-demo per sales packet, prepare sales-to-launch handoff artifact (section 7).
- Update master tracker in Prospect Pipeline Packet with handoff status + links to artifacts.
- Never bypass gates.

---

## 2. First 20 Prospect Sourcing Worksheet

**Internal-only / founder-operator-only. Manual research only. No external search calls, APIs, scrapers, or integrations of any kind.**

### Manual-Only Prospect Source Channels (Prioritized for First Paid)
- Warm referrals (peer roofers, past contacts, mutual connections in roofing or home services)
- LinkedIn (search "roofing contractor owner [city]", review profiles/posts, manual connection/note)
- Local roofing associations / trade groups (directory listings, public event attendee notes)
- Google / web searches for "roofing [city]" + "roofing company [zip]" (manual review of public sites for phone/forms/activity signals)
- Home service directories / lead portals (public business listings showing active companies with contact visible)
- Website inbound (if any form fills or "request info" that signal interest — manual follow)
- Past pilot or early conversation threads (re-open only if fit signals improved and no hard DQ; manual re-contact)
- Contractor forums / Facebook groups (non-spam, value-first manual engagement only)
- Chamber of commerce or local business networking lists (roofing members — manual lookup)
- Phone book / public business registries (manual)

### Required Fields for Each Prospect (Minimum)
- Company name / DBA
- Owner / primary decision-maker name
- Direct phone (if visible)
- Email (if visible or from form)
- Primary service area (city/zip cluster or radius noted)
- Source channel (exact, e.g. "Warm referral from John D - LinkedIn intro")
- Date first added to worksheet
- Initial lead-volume estimate (rough: low/med/high or number range from public signals)
- Evidence of active roofing lead flow (notes from site/LinkedIn/posts)
- Fit notes (initial)
- Next action (e.g. "Prep warm message", "More research on lead volume", "BLOCKED - handyman only")

### Evidence Fields (Capture Verbatim Where Possible)
- Public signals of lead generation (ads, form mentions, "we respond fast", recent posts about jobs)
- Response process hints ( "call us", "text for quote", after-hours notes)
- Website / LinkedIn / directory URL
- Any prior interaction notes (date + what was said)

### Exclusion / Disqualifier Fields (Screen Early)
- Not roofing primary (siding/gutters/solar/handyman/restoration-only noted)
- No visible lead flow or "all referral, no marketing" + no scaling interest
- Service area clearly outside planned coverage
- Decision-maker unreachable or corporate/franchise layer
- Explicit red flags (payment issues, "we only pay on close", extreme skepticism)

### Fit Notes + Pain Signal Capture (Internal)
- Paid-lead pain signal (mentions of ad spend, lead portals, cost per lead)
- Response-speed pain signal (slow follow-up notes, missed calls mentioned publicly or in conversation)
- Owner/founder accessibility signal (owner posts/answers, direct contact path)

### Next Action
Always one concrete manual step. Update on every review.

### First 20 Prospect Sourcing Worksheet Table (Copy-Paste Ready)

| # | Company / DBA | Owner/Decision Maker | Phone | Email | Service Area | Source Channel | Evidence of Activity | Lead Vol Est | Pain Signals (paid / response / access) | Exclusion Notes | Fit Notes | Next Action | Status (PASS/HOLD/BLOCKED) | Date Added | Owner |
|---|---------------|----------------------|-------|-------|--------------|----------------|----------------------|--------------|-----------------------------------------|-----------------|-----------|-------------|----------------------------|------------|-------|
| 1 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 2 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 3 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 4 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 5 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 6 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 7 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 8 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
| 9 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|10 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|11 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|12 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|13 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|14 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|15 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|16 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|17 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|18 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|19 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |
|20 |               |                      |       |       |              |                |                      |              |                                         |                 |           |             |                            |            |       |

Update the master tracker table in section 8 and cross-link to Prospect Pipeline Tracker Packet as prospects graduate from this worksheet.

---

## 3. Prospect Qualification Gate

**Internal-only gate. Run for every prospect before message prep or outreach. Record in Evidence Log + section 8 tables.**

### Must-Have Criteria (All Required for Any PASS Consideration)
- Active roofing company (primary business is roofing replacement/repair, not handyman, siding-only, gutters-only, solar-only, or restoration with no roof focus).
- Owner or primary decision-maker has a reachable direct path (phone/email/LinkedIn) and has shown some openness to discussing response automation.
- Defined service area (at least one primary city/zip cluster or clear radius; not national/multi-state without internal support).
- Visible or stated lead flow of at least ~10-20/month total (phone + forms + portals + referrals) or clear intent to generate more.
- Willingness signal for Guided Setup (open to discussing lead sources, service area config, follow-up rules, calendar).
- Clear or likely path for the decision-maker to approve monthly subscription after 14-day trial (no heavy franchise/corporate blockers for first paid).
- No hard payment red flags or "pay only after close" demands that would block clean trial-to-payment.

### Strong-Fit Signals (Bonus — Increase Confidence)
- Uses or is open to calendar (Google, Calendly, JobNimbus, etc.).
- Has at least one person who answers phone today and can participate in initial review.
- Has expressed frustration with leads going cold, missed after-hours, slow follow-up, or high cost of paid leads without conversion.
- Warm channel or referral (highest priority for first paid).
- Public signals of paid lead spend (ads, portal mentions) + visible response gaps.

### Soft HOLD Criteria (Needs More Info or Time — Revisit in 30+ Days)
- Low but growing lead volume (<10/month) with plan to increase.
- Owner is time-poor but shows interest; needs 1-2 more touches before demo readiness.
- Recent bad experience with other tools but still open after explanation.
- Partial service-area overlap or niche focus (e.g. only storm restoration but expanding).
- Referral but owner has not yet engaged.

### Hard BLOCKED Criteria (Do Not Pursue or Re-Open Without New Evidence)
- Not a roofing contractor (explicit handyman, general contractor with no roof focus, etc.).
- "We get all work from referrals and never need to market or respond faster" + zero interest in scaling response.
- Refuses any discussion of Guided Setup, lead source review, or calendar connection.
- Demands guarantees on jobs, revenue, or appointment volume after 14-day trial framing is explained.
- Active contract with competing automation platform and unwilling to run parallel trial.
- Service area 100% outside first-roofer coverage or requires unsupported multi-state manual ops.
- "Just book the jobs for me with no effort on my part" or "I have no time for any setup".
- Clear payment red flags or "we'll try free then decide after seeing jobs".
- Explicit "stop contacting me" or hostile response.

### Service-Area / Roofing Niche Fit
- Must be residential or light commercial roofing in a concentrated geography.
- Niche (e.g. metal, asphalt, storm) is ok if lead volume + response pain exists.
- Record exact service area string for later Guided Setup handoff.

### Lead-Volume Estimate (Rough, Internal)
- Low: <10/month — HOLD unless strong other signals + scaling plan.
- Medium: 10-30/month — strong.
- High: 30+/month or heavy paid ads — very strong if response pain confirmed.
- Capture source of estimate (public site, conversation quote, ad spend signal).

### Paid-Lead Pain Signal
- Mentions "leads are expensive", "Google ads", "HomeAdvisor/Angi", "we pay per lead", "low close rate on paid".
- Strong signal if tied to "we lose them because we can't follow up fast".

### Response-Speed Pain Signal
- "Missed calls after hours", "texts pile up", "leads go cold", "slow to reply on weekends", "we lose jobs to faster competitors".
- Any mention of manual follow-up burden on owner/team.

### Owner/Founder Accessibility Signal
- Owner name visible on site/LinkedIn, posts personally, answers phone, easy to reach via direct channel.
- Franchise or corporate layer = HOLD or BLOCKED for first paid (decision authority risk).

### Gate Output (Record for Every Prospect)
Go/No-Go after full gate review: [ ] PASS (advance to message prep + outreach queue) [ ] HOLD (more info/research) [ ] BLOCKED (log exact disqualifier + close thread)

Status for current prospect: [ ] CLEAR FIT [ ] HOLD (soft) [ ] BLOCKED (hard)

All decisions require Evidence Log entry with date/operator, prospect, 3+ confirmed must-haves or disqualifier quote, safety re-confirmation line, and justification.

---

## 4. First-Contact Message Preparation Queue

**Internal-only draft templates. All prospect-facing language uses ONLY the current public direction. Drafts are for manual copy-paste only. Never automate send.**

**Internal-only label: These templates and any tailored versions live only in internal notes/spreadsheets. Do not paste internal instructions into messages.**

### Warm Outreach Draft Template (Prospect Already Engaged: Form, LinkedIn, Referral, Inbound)
Subject: Quick question on your roofing leads — RoofLeadHQ AI

Hi [Name],

I saw you [checked out RoofLeadHQ / filled the form / connected via [mutual] / replied to my note].

RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup first — it takes your current lead sources and calendar, then the system handles the repetitive work so you focus on inspections and closing.

We're running a 14-day trial for the first few roofers. After Guided Setup go-live, an automated email arrives 2 days before your first monthly payment. Cancel anytime. No long-term contract.

Would you be open to a 20-minute demo call this week to see exactly how it would work on your leads and calendar?

Best,
Jason
RoofLeadHQ

### Cold Outreach Draft Template (No Prior Engagement)
Subject: 30 seconds on your roofing lead follow-up

Hi [Name],

I help roofing companies stop losing leads that go cold after the first call or form.

RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. You keep full control via Guided Setup — your service area, qualification rules, calendar, and preferences.

For the first paid roofer we're offering a 14-day trial after Guided Setup. Automated email 2 days before first monthly payment. Cancel anytime. No long-term contract.

If you're open to a short demo where I show you exactly what would happen on a phone lead and a form lead from your area, reply "demo".

No pressure — just wanted to offer the option.

Jason
RoofLeadHQ

### Referral Intro Draft Template (Use After Positive Interaction or With Network)
"Quick favor: Do you know 1-2 other roofing company owners in [area] who are frustrated with leads going cold or slow follow-up? RoofLeadHQ AI turns leads into booked homeowner appointments with fast response and automated follow-up. We're doing a 14-day trial + Guided Setup for the first few. If someone comes to mind, I'd appreciate an intro or their name so I can reach out directly. No hard sell — just seeing if it's a fit."

(After they give a name): "Thanks. Mind if I mention your name when I reach out, or would you rather make the intro?"

Log referral source + outcome. Treat referred prospects as warm for template choice.

### Call Opener Script (Manual Phone Only)
"Hi [Name], this is Jason with RoofLeadHQ. You [filled out the site / we connected on LinkedIn / [mutual] mentioned you]. I'm reaching out because RoofLeadHQ AI helps roofers turn leads into booked homeowner appointments with fast response and automated follow-up so fewer slip away. Do you have 2 minutes?"

(If yes, bridge to): "The short version is Guided Setup connects your lead sources and calendar. Then it handles the follow-up work. 14-day trial after setup, cancel anytime. I'd like to show you a quick demo on your actual lead types. When works this week?"

### Voicemail Script (Very Short, Manual Only)
"Hi [Name], Jason with RoofLeadHQ. I work with roofers who want fewer leads going cold between the phone ringing and the inspection being booked. RoofLeadHQ AI handles fast response and automated follow-up so homeowner appointments land on your calendar. 14-day trial after a quick Guided Setup. If that sounds useful, text or call me back at [number]. Thanks."

### LinkedIn / Short-Message Version (Concise for DM or Text Context)
"RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup first. 14-day trial after setup goes live. Automated email 2 days before first monthly payment. Cancel anytime. No long-term contract. Open to a 15-min demo on your leads this week?"

All drafts must be reviewed for forbidden phrases before any manual send. Log exact sent text in Outreach Queue + Evidence Log.

---

## 5. Follow-up Execution Queue

**Internal-only. Maximum 3 manual touches total per prospect for cold/warm (initial + 2 follow-ups). Never more without clear positive inbound signal. All manual. No cron, Lindy, CRM automation, or automated follow-up of any kind.**

### Manual Follow-up Touch 1, 2, 3 + Timing Guidance (Internal Cadence)
- Touch 0 (initial): Warm or cold template from section 4 (day 0).
- Touch 1 (first follow-up): 3-4 days later if no reply.
- Touch 2 (second / final value-add): 6-7 days after touch 1 (total ~10 days).
- Touch 3 (close the loop): Only if still no reply after 10+ days from initial — polite close, offer to re-engage later.
- After any reply (positive, negative, "stop", "not now"): stop the sequence immediately. Move to nurture or no-go handling. Log verbatim.

### Follow-up Message Templates (Manual Copy Only, Reference Prior Context)
Touch 1 (3-4 days):
"Hi [Name], following up on my note about RoofLeadHQ AI turning your roofing leads into booked homeowner appointments via fast response and automated follow-up. Still open to a 15-minute demo this week? Guided Setup + 14-day trial, cancel anytime."

Touch 2 (6-7 days later):
"Last note on this — many roofers lose 20-40% of form and after-hours phone leads simply because no one follows up the same day. RoofLeadHQ AI is built exactly for that: fast response + automated follow-up so more homeowners end up on your calendar. 14-day trial after Guided Setup. If timing is off right now, no problem at all — just reply 'not now' and I'll leave you alone."

Touch 3 (close loop, 10+ days):
"Closing the loop on my earlier notes. If RoofLeadHQ AI for booked homeowner appointments is ever interesting, the 14-day trial + Guided Setup offer is open. Otherwise, best of luck with the busy season."

### Stop Rules (Mandatory)
- Any "stop", "unsubscribe", "do not contact", negative/hostile reply, or "not interested" → immediate STOP. Log in Follow-up Queue + Evidence Log. No further unsolicited touches.
- "Not now" or timing issue → move to Nurture list (section 5 nurture handling). 45-day re-open max without new signal.
- No reply after touch 3 → close thread, mark CLOSED / NO RESPONSE in tracker. Offer re-engage only on inbound.

### Not-Now / Nurture Handling
- Update status in all section 8 tables + Prospect Pipeline Tracker Packet.
- Add to nurture list with re-contact date (no more than 45 days out, only if no hard BLOCKED).
- Use only referral ask or soft value note on re-contact (never re-pitch the full sequence).
- If they re-engage inbound later, treat as new warm lead and restart qualification gate.

All follow-ups are founder/operator manual execution only. Record channel, exact text, timestamp, response (or none) in Follow-up Queue and Evidence Log before moving to next touch.

---

## 6. Demo-Call Readiness Handoff

**When to offer a demo: Only after PASS on qualification gate (section 3), at least one positive reply or warm signal, and full safety re-confirmation logged today. Never offer demo on HOLD or BLOCKED prospects.**

**Handoff target: FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md (use its demo call checklist + discovery + objection + pricing scripts + fit scorecard + handoff to Launch). This kit prepares the evidence package only.**

### Demo Scheduling Prep Checklist (Internal-only)
- [ ] Prospect has PASS on section 3 qualification gate with 3+ must-haves + evidence logged.
- [ ] At least one inbound positive signal or warm referral context documented.
- [ ] Message prep + at least initial manual send completed (or warm prior engagement).
- [ ] Safety guardrails section 9 re-read + "Safety re-confirmed: all OFF" logged in Evidence Log today.
- [ ] Verifier + aggregate green (or run immediately before call).
- [ ] Local copy of Sales Outreach System Packet + Launch System Packet open.
- [ ] Time block protected for 20-30 min call + 15 min post-call notes/handoff prep.
- [ ] No live calendar booking automation — manual "when works this week?" only. Record proposed times in tracker.

### Pre-Demo Evidence Checklist (Bring Forward to Call)
- Company, owner, service area, lead sources + volume estimate.
- Current response process notes (who answers, avg time, after-hours gaps).
- Paid-lead pain + response-speed pain signals (verbatim where possible).
- Owner accessibility + decision authority notes.
- Prior messages sent + prospect replies (exact).
- Any objections surfaced so far.
- Referral source (if applicable).
- Safety re-confirmation timestamp.

### Discovery Questions to Bring Forward (Internal Notes for Call)
- What are your main lead sources right now (phone, forms, portals, ads, referrals)?
- Roughly how many leads come in per week or month?
- What happens to leads that come in after hours or on weekends?
- Who usually handles first response and follow-up today?
- How are you currently tracking leads that don't get a same-day reply?
- Have you tried any automation or faster follow-up tools before? What worked or didn't?
- What's your service area and do you have a calendar tool you like?
- On a scale of 1-10, how painful is it when a lead goes cold?
- If you had a system that handled the repetitive response and follow-up work while you kept full control of rules and calendar, what would that free you up to do?
- After I show the demo, is there anyone else on your team who should see how it would work?

### Objection Notes (Internal — Record Prospect's Exact Words + Your Allowed Response)
Log every objection surfaced pre-demo or during. Use only allowed framing from Sales Outreach Packet section 9 (no guarantees, no booked jobs, no auto-estimate, no day-15 billing, etc.). Record in section 8 Objection Log.

### Handoff Artifact to FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md (Copy This Block)
```
FIRST PAID ROOFER OUTREACH EXECUTION KIT → SALES OUTREACH HANDOFF ARTIFACT
Date: ____ Operator: Jason
Prospect: [Company] / [Name] / [Phone] / [Email]
Source + Evidence Summary: ____
Qualification Gate: PASS (list 3+ must-haves + volume/pain/access signals)
Prior Touches: [list dates/channels/outcomes + exact replies]
Pre-Demo Evidence Package: [link or paste from checklist above]
Safety re-confirmed: [timestamp + "all guardrails OFF"]
Next: Run Sales Outreach System Packet full demo call checklist, discovery, objection handling, pricing/trial script, fit scorecard (32+ threshold), and handoff to Launch if PASS.
Status: [ ] HANDED OFF CLEANLY TO SALES OUTREACH SYSTEM PACKET
```

Update all tracker tables (section 8) + Prospect Pipeline Tracker Packet with "DEMO READINESS HANDOFF" status + artifact reference. Do not offer/schedule demo until this artifact is complete and logged.

---

## 7. Sales-to-Launch Handoff Trigger

**Criteria for moving prospect into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md: Only after clean PASS on Sales Outreach System Packet fit decision scorecard (32+ /40 with no hard disqualifiers), affirmative confirmation on exact trial language during/after demo, and full evidence package.**

### Required Evidence (Minimum for Handoff)
- Completed Sales Outreach fit scorecard with all 8 categories scored + notes + total 32+.
- Verbatim quote or clear affirmative on: "14-day trial begins after Guided Setup go-live", "automated email 2 days before first monthly payment", "cancel anytime", "no long-term contract".
- Demo call notes + objection log + pricing explanation confirmation.
- Owner decision authority confirmed.
- Service area / lead sources / volume / response gaps documented for Guided Setup intake.
- No hard BLOCKED disqualifiers anywhere in thread.
- Safety re-confirmation (section 9) logged immediately before/after demo decision.
- This kit's verifier + aggregate + sales packet verifier green.

### Trial Language Confirmation (Must Capture)
Ask and log affirmative: "Do you understand that the 14-day trial begins after Guided Setup go-live, that an automated email arrives 2 days before the first monthly payment, that you can cancel anytime, and that there is no long-term contract?"

Record prospect's exact words + "Yes" or clear affirmative.

### Setup Readiness Notes (For Launch Packet Handoff)
- Lead sources identified (names + rough volume).
- Service area definition ready.
- Qualification/booking rules high-level notes (what makes a good lead for them).
- Calendar tool + access willingness.
- Reporting preferences (what they want to see weekly/monthly).
- Team access (who else needs visibility in early phase).

### Go-Live Assumptions (Internal Only)
- Guided Setup will be executed manually per Launch System Packet after handoff.
- 14-day trial clock starts only after go-live (not on demo or agreement date).
- First monthly payment expectation is after trial + automated pre-payment email.
- No guarantees on appointments/jobs/revenue were made (confirm in notes).

### Payment/Trial Expectations (Internal)
- Prospect understands 14-day trial after setup, then monthly, cancel anytime.
- No "day 15" or "billing starts day 15" language used.
- If prospect pushes for custom payment or guarantee: BLOCK and do not hand off.

### Cancellation / No-Go Handling
- If prospect says no after demo or fit scorecard is HOLD/BLOCKED: use no-go scripts from Sales Outreach Packet section 13.
- Log in all trackers + Evidence Log.
- Offer nurture or referral ask only (never re-pitch).
- Update status to NO-GO / NOT-NOW in section 8 tables + Prospect Pipeline Tracker.
- Never hand off to Launch on HOLD or BLOCKED.

### Handoff Artifact to FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (Copy This Block)
```
FIRST PAID ROOFER OUTREACH EXECUTION KIT → SALES → LAUNCH HANDOFF ARTIFACT
Date: ____ Operator: Jason
Prospect: [Company] / [Name] / [Phone] / [Email] / [Service Area]
Sales Outreach Fit Decision: PASS (score ____ /40, no hard DQ)
Trial Language Confirmation (exact prospect words): ____
Demo / Objection / Pricing Notes Summary: ____
Setup Readiness Notes (lead sources, calendar, rules, reporting, team): ____
Go-Live Assumptions: 14-day trial after Guided Setup go-live per Launch Packet. No guarantees made.
Safety re-confirmed: [timestamp + "all guardrails OFF"]
Evidence Links: [Sales scorecard, this artifact, prior logs]
Next: Guided Setup intake per FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md section 4 + full launch checklists.
Status: [ ] HANDED OFF CLEANLY TO LAUNCH SYSTEM PACKET
```

Update master status in all trackers. This completes the outreach execution kit's role for this prospect.

---

## 8. Manual Tracker Templates

All tables below are copy-paste-ready for local spreadsheet, Notion, or notes. Update immediately after every action. These are the operational source of truth for this kit alongside the Prospect Pipeline Tracker Packet.

### Prospect Source List (from section 2 — living first-20 + beyond)

(See the 20-row table in section 2. Duplicate rows here or link to master version. Minimum columns: #, Company, Owner, Phone, Email, Service Area, Source Channel, Evidence, Lead Vol Est, Pain Signals, Exclusion, Fit Notes, Next Action, Status, Date Added, Owner.)

### Outreach Queue

| ID | Prospect / Company | Contact Channel | Message Type (warm/cold/referral) | Draft Status (DRAFT READY / SENT) | Exact Draft or Sent Text (or summary + link) | Send Date | Reply Received? (Y/N + summary) | Follow-up Due | Notes | Safety Re-Confirm Date |
|----|--------------------|-----------------|-----------------------------------|-----------------------------------|------------------------------------------------|-----------|----------------------------------|---------------|-------|------------------------|
|    |                    |                 |                                   |                                   |                                                |           |                                  |               |       |                        |

### Follow-up Queue

| ID | Prospect | Prior Touch Date + Type | Next Touch # (1/2/3) | Planned Date | Template Used (ref section 5) | Tailored Text | Executed? (Y + date) | Response / Outcome | Status (CONTINUE / STOP / NURTURE / CLOSED) | Safety Re-Confirm |
|----|----------|-------------------------|----------------------|--------------|-------------------------------|---------------|----------------------|--------------------|---------------------------------------------|-------------------|
|    |          |                         |                      |              |                               |               |                      |                    |                                             |                   |

### Demo Readiness Queue

| ID | Prospect / Company | Qualification Gate Status | Pre-Demo Evidence Complete? | Handoff Artifact to Sales Packet Prepared? | Demo Offered / Scheduled? (manual only) | Demo Date | Post-Demo Decision (PASS/HOLD/BLOCKED) | Sales Handoff Date | Notes | Safety Re-Confirm |
|----|--------------------|---------------------------|-----------------------------|--------------------------------------------|-----------------------------------------|-----------|----------------------------------------|--------------------|-------|-------------------|
|    |                    |                           |                             |                                            |                                         |           |                                        |                    |       |                   |

### Objection Log

| Date | Prospect | Objection (exact prospect words) | Category (guarantee / time / auto / price / trust / other) | Allowed Response Used (ref Sales Packet) | Outcome (addressed / escalated / no-go) | Notes | Safety Re-Confirm |
|------|----------|----------------------------------|------------------------------------------------------------|------------------------------------------|-----------------------------------------|-------|-------------------|
|      |          |                                  |                                                            |                                          |                                         |       |                   |

### Evidence Log (Append-Only — Every Material Event)

| Date/Operator | Prospect | Event Type (sourced / qualified / message prep / manual send / follow-up / demo prep / handoff / no-go) | Details + Verbatim Quotes | Decision (PASS/HOLD/BLOCKED or N/A) | Safety Re-Confirm ("Safety re-confirmed: all guardrails OFF" + timestamp) | Verifier Run? (this kit + aggregate date) | Next Action |
|---------------|----------|--------------------------------------------------------------------------------------------------------|---------------------------|-------------------------------------|---------------------------------------------------------------------------|-------------------------------------------|-------------|
|               |          |                                                                                                        |                           |                                     |                                                                           |                                           |             |

### Daily Operator Review (End-of-Day — Copy for Each Day)

| Date | Sourced Today | Qualified Today (PASS/HOLD/BLOCKED counts) | Messages Prepped | Manual Sends | Follow-ups Executed | Demos Prepped | Handoffs Made | Replies Logged | EOD Safety Line | Verifier Green? | Top 3 for Tomorrow |
|------|---------------|--------------------------------------------|------------------|--------------|---------------------|---------------|---------------|----------------|-----------------|-----------------|--------------------|
|      |               |                                            |                  |              |                     |               |               |                |                 |                 |                    |

### Weekly Pipeline Review

| Week Of | Total Active Prospects | PASS Qualified | HOLD | BLOCKED | In Outreach Queue | In Follow-up Queue | Demo Readiness | Handed to Sales | Handed to Launch | NO-GO / NURTURE | Avg Response Time (manual) | Notes / Blockers | Safety Re-Confirms Logged |
|---------|------------------------|----------------|------|---------|-------------------|--------------------|----------------|-----------------|------------------|-----------------|----------------------------|------------------|---------------------------|
|         |                        |                |      |         |                   |                    |                |                 |                  |                 |                            |                  |                           |

### Handoff Summary (One Per Successful Handoff to Sales or Launch)

| Handoff Date | Prospect | Target Packet (SALES or LAUNCH) | Artifact Reference (paste full block) | Evidence Package Location | Trial Language Confirmed? (Y + quote) | Fit Score (if sales) | Sales Scorecard Link | Launch Intake Notes | Final Status | Safety Re-Confirm Timestamp |
|--------------|----------|---------------------------------|---------------------------------------|---------------------------|---------------------------------------|----------------------|----------------------|---------------------|--------------|-----------------------------|
|              |          |                                 |                                       |                           |                                       |                      |                      |                     |              |                             |

All tables must be updated before EOD review. Cross-reference IDs with Prospect Pipeline Tracker Packet master list.

---

## 9. Safety Guardrails

This section must be reviewed and re-initialed (logged in Evidence Log) at every major gate (before sourcing block, before any manual send, before demo offer, before any handoff, during EOD/weekly review). All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer outreach execution unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.

### Confirmed Disabled (No Activation in Any Form)

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
- Auth / RLS / security policy implementation or changes: NONE
- Payment automation (billing engine, invoice generation, or first-month payment collection automation): NONE
- Manual-only outreach: YES — all contact is founder/operator manual copy-paste or phone only. No bulk tools, no scripts, no automation.
- Draft-only message preparation: YES — section 4 and 5 are preparation only. No send automation.
- No live send: YES — this kit performs no live homeowner or roofer SMS, email via Resend, voice via Vapi, or any production channel activation.
- No automated follow-up: YES — no cron, scheduler, Lindy, CRM automation, or dispatcher for touches.
- No CRM automation: YES — all tracking is local copy-paste tables in this kit + Prospect Pipeline Tracker Packet. No production CRM writes.
- No calendar booking automation: YES — demo scheduling is manual "when works?" conversation only. No live Calendar integration or booking links activated.
- No payment automation: YES — no billing engine, invoice generation, first-month payment collection automation, or payment workflows.
- No external service calls: YES — no Twilio, Vapi, Resend production, Supabase client calls, or any live integrations from this kit.
- No production Supabase writes: YES — zero production data mutation of roofer, lead, customer, or prospect records.
- No public route activation: YES — no webhooks, APIs, status pages, or contractor-facing routes exposed.
- No contractor portal exposure: YES — no contractor portal or dashboard exposure to real paying customers (internal dry-run only).
- No auth/RLS/security implementation: YES — this kit contains zero schema, zero policies, zero secrets handling, zero auth changes.
- No estimates, quotes, invoices, or payment workflows: YES — none created or discussed as automated behaviors.
- No guarantee language: YES — no guarantees on appointments, jobs, revenue, or outcomes in any prospect-facing or public section.
- No booked-jobs language: YES — no "book jobs", "booked jobs", "You book the inspection", or similar in prospect-facing sections.

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
- Invoice generated: no
- Payment/invoice behavior added: no
- SMS/Twilio/Vapi/Calendar/Resend/Lindy production trigger: no

### Re-Confirmation Protocol (Must Execute Before Any Outreach Action or Handoff)
1. Re-read this safety section 9 in full.
2. Run the full aggregate verifier (`node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`) and this kit's verifier.
3. Log "Safety re-confirmed: all guardrails OFF" + timestamp + operator in every Evidence Log entry and daily review.
4. If any guardrail would be violated by a planned action: STOP. Do not proceed. Escalate only via written founder decision outside this kit.

No live SMS, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated. This entire kit is dry-run/internal-only/founder-operator-only.

---

## 10. Public-vs-Internal Language Boundary

**Critical boundary for all work in this kit.**

Prospect-facing language (any message, call script, demo talking points, email, LinkedIn DM, voicemail, or handoff artifact that could be shared with a prospect) must use ONLY the current public direction:

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup first.
- 14-day trial begins after setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

Prospect-facing language must NOT use any founder-led/manual babysitting/public founder-review framing.

Internal founder/operator/manual review language (Founder-Led references, manual review notes, founder review queue, manual coordination, Live Automation Disabled notes, rehearsal fixtures, dry-run only instructions, operator runbooks, internal checklists, evidence logs, "Jason will manually...", safety guardrails, etc.) is allowed ONLY inside internal dry-run execution instructions, labeled sections, tables, logs, and handoff artifacts that stay internal.

### Labeling Rule
Every internal-only section in this kit is explicitly labeled "**Internal-only / founder-operator-only**" or "Internal-only label: ...". These labels are not optional. When preparing any prospect-facing output, strip all internal labels and instructions.

### Internal-Only Sections (Examples — Do Not Copy to Prospect Materials)
- All of section 1 (Day-one operating plan)
- All of section 2 (First 20 sourcing worksheet internals + table)
- Section 3 qualification gate details and HOLD/BLOCKED rules
- Section 5 follow-up execution details and stop rules
- Section 6 pre-demo evidence checklists and internal discovery questions
- Section 7 go-live assumptions and internal payment notes
- All of section 8 manual tracker templates (use only the data, never the instructions)
- All of section 9 safety guardrails
- This section 10
- Evidence Log entries, daily/weekly reviews, decision logs
- Any "Internal-only" notes in message prep blocks

### Forbidden Prospect-Facing / Public Language (Enforced Strictly)
The list in Non-Goals and in section 9 must be absent from every template, script, demo note that could reach a prospect, and from any public copy derived from this kit.

If in doubt: use only the 5 bullet public language block above. Run the verifier before any manual send or handoff.

This kit enforces the boundary so that future public materials, website, and customer contracts stay clean while internal execution remains detailed and safe.

---

## Decision Log (Master — Append for the First Paid Roofer Outreach Execution Kit)

| Date | Gate/Section | Prospect | Decision (PASS/HOLD/BLOCKED / HANDOFF / NO-GO) | Evidence Summary | Safety Re-Confirm | Verifier Run | Next Action / Handoff Target |
|------|--------------|----------|------------------------------------------------|------------------|-------------------|--------------|------------------------------|
|      |              |          |                                                |                  |                   |              |                              |

All entries must reference safety guardrails re-confirmation and the three packet handoffs where applicable.

---

## Explicit Final Confirmation for This Kit

- Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer outreach execution kit.
- No auth changes: yes
- No database schema changes: yes
- No RLS policies: yes
- No production data writes: yes
- No live workflow activation activated: yes
- No external service calls or live sends from this kit: yes
- Public/business positioning uses only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup first + 14-day trial begins after setup goes live + automated email 2 days before first monthly payment + cancel anytime + no long-term contract.
- Forbidden phrases are absent from all prospect-facing content (enforced by section 4/5 templates + verifier splits + checks).
- Handoffs are clean artifacts only to Sales Outreach System Packet and Launch System Packet.
- All 10 required sections present with operational content, concrete fields, 9 copy-paste tables, copy-paste-ready tables, qualification gate, message/follow-up queues, day-one plan, demo/sales-to-launch handoffs, safety, and language boundary.
- References confirmed to FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md, FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md.
- This kit + all wiring verified via dedicated readonly verifier before any further progress.

Safety preserved: No live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment/estimate/quote/invoice automation, or external service calls activated. All guardrails explicitly listed and re-checked at gates.

---

*End of First Paid Roofer Outreach Execution Kit. Use only with full verifier green. Dry-run / internal-only / founder-operator-only.*
