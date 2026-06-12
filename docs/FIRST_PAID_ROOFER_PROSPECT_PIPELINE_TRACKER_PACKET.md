# First Paid Roofer Prospect Pipeline / Tracker Packet

Date: 2026-06-09

## Purpose

This is the internal-only First Paid Roofer Prospect Pipeline / Tracker Packet for RoofLeadHQ. Jason (founder/operator) uses this packet to identify, score, contact, follow up with, demo, qualify, and hand off the first paid roofer prospect into the First Paid Roofer Sales Outreach System Packet and First Paid Roofer Launch System Packet.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup is onboarding/configuration only (lead sources, service area, qualification, follow-up preferences, calendar connection, reporting).
- 14-day trial begins after Guided Setup go-live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal scorecards, trackers, and evidence logs are internal-only. No public founder-led/manual babysitting positioning is used for prospects.

This packet is product-moving and operationally usable: it contains a prospect source list template, ideal fit filters, bad-fit/disqualifier filters, a concrete prospect tracker table with copyable columns, defined outreach/follow-up/demo status stages, fit scorecard summary fields, evidence log template, next action queue, handoff readiness checklist to the Sales Outreach System Packet, no-go/not-now/nurture handling, weekly pipeline review checklist, founder/operator daily pipeline command center, and full safety guardrails (section 15). It is designed so a founder or trained operator can execute first paid roofer prospecting and early qualification using only this document + referenced packets + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

## Scope

- First paid roofer prospecting and early pipeline (the first real contractor who will pay after the 14-day trial).
- All stages from source list through identification, scoring, initial contact/follow-up, early demo qualification, and clean handoff to the Sales Outreach System Packet for full outreach/demo execution and then to Launch System Packet for Guided Setup.
- Internal founder/operator prospect tracker, evidence logging, status stages, next action queue, and decision gates.
- Explicit, machine-enforceable safety guardrails (section 15) that must be re-confirmed at every gate.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below for the exact list of banned phrases).
- No activation of live SMS, Vapi, Calendar booking, Resend, Lindy, cron, production Supabase writes, production data mutation, public routes, contractor portal exposure.
- No auth/RLS/security implementation or payment automation in this packet (planning, messaging, trackers, and checklists only).
- All work remains read-only verification, dry-run, internal founder/operator planning, rehearsal, and outreach copy only. No live sends or CRM automation activated.
- This packet stops at handoff to the First Paid Roofer Sales Outreach System Packet (for detailed outreach/demo execution) and the First Paid Roofer Launch System Packet (for Guided Setup onward). Detailed sales scripts, full demo call checklist, objection handling, and launch execution are covered in the downstream packets.

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

This packet file: `docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md`
Wrapper: `scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js`

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js
node backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js
scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this packet)
- Handoff target: `docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md` + its wrapper and verifier (primary); also `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md`
- Related: FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, FIRST_PAID_PILOT_LAUNCH_PACKET.md, FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md, MANUAL_OUTREACH_OPERATIONAL_QA_CHECKLIST.md
- Wrapper: `scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh`
- This packet's verifier: `backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js`

---

## 1. Prospect Source List Template

Use this template to build and maintain a living list of channels for sourcing the first paid roofer. Update weekly. All entries are internal planning only.

### Recommended Source Channels (Prioritized for First Paid)
- Warm referrals (peer roofers, past contacts, mutual connections in roofing or home services)
- LinkedIn (search "roofing contractor owner [city]", comment on posts, direct outreach to decision makers)
- Local roofing associations / trade groups (directory listings, event attendees)
- Google / web searches for "roofing [city]" + "roofing company [zip]" (filter for those with websites + contact forms or phone visible)
- Home service directories / lead portals (public business listings showing active companies)
- Website inbound (forms or "request demo" that signal interest in automation/response tools)
- Past pilot or early conversation threads (re-open only if fit signals improved and no hard DQ)
- Contractor forums / Facebook groups (non-spam, value-first engagement only)
- Chamber of commerce or local business networking lists (roofing members)

### Source List Entry Template (Copy for Each Channel)
- Channel: [e.g. Warm referral from John D]
- Target volume this week: [e.g. 3-5 new names]
- Research method: [LinkedIn search + company site review]
- Initial filter applied: [Lead volume visible on site? Decision maker phone/email?]
- Owner: Jason
- Notes / last refresh: ____

Record every sourced name into the master Prospect Tracker (section 4) with Source column populated. No automation of sourcing or scraping.

Go/No-Go for Source List Health: [ ] PASS (at least 8-10 active channels refreshed in last 7 days with 15+ raw names in pipeline) [ ] HOLD [ ] BLOCKED

---

## 2. Ideal First Roofer Fit Filters

Use these filters to score and prioritize every prospect before any outreach. Only advance strong fits.

### Core Fit Filters (All Must Be True to Enter Active Pipeline)
- Active roofing company (not handyman, general contractor, or multi-trade without clear roofing focus) with visible online presence (website, Google Business, or directory listing).
- Decision-maker (owner or operations lead) contact info discoverable (phone and/or email) and reachable via at least one channel (LinkedIn, phone, email, form).
- Generates leads today via at least one channel: phone calls, web forms, paid ads, or lead portals. Evidence of volume or response process visible or stated.
- Lead volume estimate >= 10-20 leads per month (phone + forms + portals) or clear signal of missed leads / slow follow-up pain (e.g. public complaints, "we're swamped", "calls go to voicemail").
- Operates in a defined service area (one or more cities/zips) with residential or light commercial roofing focus.
- Appears open to or currently uses a calendar/scheduling tool (Google Calendar, Calendly, JobNimbus, ServiceTitan, or similar) or has expressed frustration with manual coordination.
- No obvious red flags on scale (not a 50+ person corporate with heavy procurement layers that block fast decisions).

### Strong Positive Signals (Raise Fit Score)
- Recent activity indicating growth or hiring (job postings, new reviews, "expanding team").
- Owner personally answers phone or responds to inquiries today.
- Has tried other tools or manual processes and shows frustration with leads going cold.
- Warm channel or direct referral.
- Visible service area + pricing transparency or lead form on site (signals marketing investment).

### Fit Filter Application Gate
Before first contact or after discovery: apply filters above.
Status: [ ] CLEAR FIT (all core true + 2+ bonus) [ ] HOLD [ ] BLOCKED
Status: [ ] CLEAR FIT (all core true + 2+ bonus) [ ] HOLD (needs more research) [ ] BLOCKED (one or more hard disqualifiers from section 3)

Record decision + evidence link in tracker (section 4) and Evidence Log (section 9).

---

## 3. Bad-Fit / Disqualifier Filters

Hard disqualifiers trigger immediate BLOCKED. Soft triggers go to HOLD or nurture.

### Hard Disqualifiers (BLOCKED — Do Not Contact or Advance)
- Not primarily a roofing contractor (handyman, GC, siding-only, solar-only, etc.).
- Explicitly demands outcome guarantees ("how many jobs will this book?", "what is your close rate guarantee?") even after 14-day trial framing is explained.
- Currently locked into a long-term contract with a competing automation/lead-response platform and unwilling to run parallel trial.
- No decision-maker authority (pure admin, receptionist gatekeeper with no owner access path, or heavy corporate layers).
- Lead volume appears <5/month with no paid ads or growth signals and no visible pain.
- Owner states "we don't follow up on leads" or "we only do referrals" with zero interest in changing.
- Red flags on payment history, prior churn, or extreme price sensitivity that would prevent clean handoff to sales/launch packets.

### Soft Disqualifiers / HOLD Triggers
- Very small volume today but growing fast and willing to discuss.
- Owner extremely time-poor (next 4+ weeks blocked) but interested for later.
- Multiple decision-makers or spouse/business partner involvement required (needs more discovery).
- Location outside primary target geography but otherwise strong fit (nurture for future).
- Currently using a tool that partially overlaps but open to comparison during 14-day trial.

### Disqualifier Decision Gate (After Research or First Touch)
Status for current prospect: [ ] CLEAR FIT [ ] HOLD [ ] BLOCKED

If BLOCKED: log reason + evidence in tracker Notes + Evidence Log. Close thread. No further contact unless prospect re-initiates with changed circumstances.

If HOLD: move to nurture list (section 12) with next touch date 30-60 days out.

---

## 4. Prospect Tracker Table

Maintain one master tracker (internal spreadsheet, Notion table, or markdown file — never in production systems). Update after every research step, touch, status change, or decision.

Copy this exact column list into your tool. These are the minimum required columns Jason can paste directly.

### Required Tracker Columns (Copy-Paste Ready)
| Prospect name | Company | Location | Website | Source | Contact name | Contact channel | Lead volume estimate | Fit score | Pain signal | Outreach status | Follow-up count | Demo status | Objection | Decision status | Handoff status | Next action | Next action date | Owner | Notes | Evidence link/reference |
|---------------|---------|----------|---------|--------|--------------|-----------------|----------------------|-----------|-------------|-----------------|-----------------|-------------|-----------|-----------------|----------------|-------------|------------------|-------|-------|-------------------------|

### Sample Rows (Internal Planning Only — Replace with Real)
| Prospect name | Company | Location | Website | Source | Contact name | Contact channel | Lead volume estimate | Fit score | Pain signal | Outreach status | Follow-up count | Demo status | Objection | Decision status | Handoff status | Next action | Next action date | Owner | Notes | Evidence link/reference |
|---------------|---------|----------|---------|--------|--------------|-----------------|----------------------|-----------|-------------|-----------------|-----------------|-------------|-----------|-----------------|----------------|-------------|------------------|-------|-------|-------------------------|
| Alex Rivera | Rivera Roofing LLC | Denver, CO (80202 cluster) | riveraroofing.com | Warm referral - peer roofer | Alex Rivera (owner) | LinkedIn + phone | 25-35/mo (forms + Google ads) | 42/50 | "Leads sit for hours after hours, we lose 30%"; slow texts | OUTREACH SENT (warm intro) | 1 | NOT SCHEDULED | None yet | FIT REVIEW PENDING | NOT READY | Schedule discovery call this week | 2026-06-11 | Jason | Good volume + pain. Site shows lead form + "call today". Warm. | LinkedIn thread 2026-06-08 + company site screenshot |
| Jordan Hale | Summit Peak Roofing | Boulder, CO | summitroofco.com | Cold LinkedIn search | Jordan (owner) | Email via site | ~15/mo (mostly phone) | 28/50 | "We miss calls when on jobs" | NOT CONTACTED | 0 | NOT SCHEDULED | N/A | RESEARCH ONLY | NOT READY | Research decision maker phone + recent reviews | 2026-06-10 | Jason | Site good, volume borderline. Check Google reviews for response complaints. | N/A |

Update rules:
- After every research, outreach, reply, demo, or status change: fill or update row.
- Fit score from section 8 (or early proxy 0-50).
- Always record last safety re-confirmation in Notes or separate log before any contact.
- Export/snapshot the table before handoff.

Prospect Tracker Health Gate: [ ] PASS (all active prospects have complete columns + current Next action date within 7 days) [ ] HOLD [ ] BLOCKED

---

## 5. Outreach Status Stages

Defined stages for the Outreach status column in the tracker. Use exactly these values. Update immediately after action.

### Allowed Outreach Status Values
- NOT CONTACTED: researched, in tracker, no outreach sent yet. Default for new entries after fit filter CLEAR.
- OUTREACH SENT (warm): warm channel (referral/intro) first message sent.
- OUTREACH SENT (cold): cold LinkedIn/email first message sent.
- REPLIED / INTERESTED: prospect replied positively or asked for more info/demo.
- REPLIED / NEEDS INFO: replied but asked questions or needs time/research.
- REPLIED / NOT NOW: replied but timing off (move to nurture per section 12).
- NO REPLY (follow-up due): sent + follow-up count threshold reached per cadence.
- CLOSED / NO RESPONSE: after final touch, no reply, log and move to nurture or archive.
- INVALID / BOUNCED: bad contact info, update or drop.

Status transition rule: Never skip from NOT CONTACTED directly to REPLIED. Always record the send first.

Outreach Gate after first send: [ ] PASS (status moved to OUTREACH SENT and evidence logged) [ ] HOLD [ ] BLOCKED (safety or DQ hit)

---

## 6. Follow-Up Status Stages

Track follow-up activity via Follow-up count column + notes. Use a simple cadence (max 3-4 manual touches total, no automation).

### Follow-Up Cadence (Manual Only)
- Touch 1 = first outreach (recorded in Outreach status).
- Touch 2: 3-4 days later if no reply and still CLEAR FIT. "Following up on my note about RoofLeadHQ AI turning your roofing leads into booked homeowner appointments via fast response and automated follow-up..."
- Touch 3: 3-4 days after Touch 2 if still no reply. Value-add note on missed leads + 14-day trial framing. Final unless re-engaged.
- After Touch 3: if no reply, update Outreach status to CLOSED / NO RESPONSE or NO REPLY (follow-up due), log in Evidence Log, move to nurture list with 45-day recheck unless strong prior signal.

Follow-up count column: integer (0,1,2,3). Increment on each manual send. Never auto-increment.

Never use cron, Lindy, or any external scheduler for follow-ups. All manual.

Follow-Up Gate: [ ] PASS (count updated, next action date set, no more than 3 total touches per prospect in active window) [ ] HOLD [ ] BLOCKED

---

## 7. Demo Status Stages

Early qualification demo / discovery calls (15-25 min) used to validate fit before handing to full Sales Outreach System Packet. Not the full sales demo.

### Allowed Demo Status Values
- NOT SCHEDULED: default until reply or proactive booking.
- SCHEDULED: date/time set, pre-call prep done (verifier run, safety re-confirm, research printed).
- COMPLETED - STRONG FIT: call done, core filters confirmed, pain validated, interest in next steps (Guided Setup path) expressed.
- COMPLETED - HOLD: call done, needs more info/time/decision-maker, schedule follow-up discovery.
- COMPLETED - NOT FIT: call done, hard DQ surfaced or weak fit confirmed (update Decision status + handoff not ready).
- NO-SHOW / RESCHEDULED: log and reset.
- CANCELLED (prospect): log reason.

Demo Gate (post-call): [ ] PASS (status COMPLETED - STRONG FIT + evidence + fit score update) [ ] HOLD [ ] BLOCKED

Pre-demo checklist (internal):
- [ ] Run this packet's verifier + aggregate (or confirm last run green within 24h).
- [ ] Safety guardrails section 15 re-read and logged.
- [ ] Tracker row complete up to current status.
- [ ] Research notes + lead volume/pain evidence ready.
- [ ] Use only public language: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup + 14-day trial. Cancel anytime. No long-term contract.
- Never say "Monthly billing starts on day 15", "guarantee", "booked jobs", or quota language.

Post-demo: update tracker Demo status, Fit score, Decision status, Next action, and append Evidence Log entry. Decide: advance to handoff readiness or HOLD/NOT FIT.

---

## 8. Fit Scorecard Summary Fields

Early pipeline fit scoring (0-50 scale) to decide pipeline priority and handoff readiness. Record in Fit score column + Notes.

### Fit Scorecard Summary Fields (Rate + Note for Each)
- Lead volume & source diversity (0-10): 10 = 25+/mo + 2+ channels; 5 = 10-15/mo single channel; 0 = <5 or unclear.
- Visible response/follow-up pain (0-10): 10 = explicit "miss calls", "leads go cold", "slow after hours"; 5 = implied by volume + "busy"; 0 = "we handle it fine".
- Decision maker access (0-5): 5 = direct owner phone/email + confirmed; 3 = form or gatekeeper path; 0 = unknown or blocked.
- Service area definition (0-5): 5 = clear city/zip + residential focus; 0 = vague or multi-state without local ops.
- Calendar / scheduling tool openness (0-5): 5 = already uses + mentioned; 3 = open to; 0 = paper-only + resistant.
- Warmth / referral signal (0-5): 5 = direct warm intro; 3 = peer mention; 0 = pure cold.
- Growth / marketing investment signal (0-5): 5 = ads + reviews + site form active; 0 = static site, no recent signals.
- Red flag absence (0-5): 5 = clean; subtract for any soft DQ signals.

Total: ___ / 50

Early Fit Thresholds for Pipeline Action:
- 35+ and no hard DQ: CLEAR FIT — prioritize outreach and early demo.
- 25-34: HOLD — research more before first contact or nurture lightly.
- <25 or hard DQ: BLOCKED — do not contact, log and drop from active.

Full handoff to Sales Outreach System Packet requires 35+ early score + strong demo signal (or equivalent in later detailed scorecard) + no DQ + trial language confirmation captured.

Record all 8 scores + notes + total in Evidence Log and tracker Notes when scored.

---

## 9. Evidence Log

Append-only log for every material event. Store alongside tracker (separate file or bottom of same doc). Reference from tracker Evidence link/reference column.

### Evidence Log Entry Template (Per Major Event)
```
Date: ____ Time: ____ Operator: ____
Prospect: [Name] @ [Company]
Event type: [RESEARCH / SOURCE ADD / OUTREACH TOUCH 1/2/3 / REPLY / DEMO SCHEDULED / DEMO COMPLETED / FIT SCORE / DECISION / HANDOFF READY / NO-GO / SAFETY RECHECK / WEEKLY REVIEW]
Details:
- Source / channel:
- Messages sent (exact text or summary if long):
- Call / reply notes / discovery answers (verbatim key quotes):
- Fit score or filters applied + rationale:
- Prospect quotes (verbatim where possible):
- Tracker row updated? (Y/N + key fields):
- Decision (PASS / HOLD / BLOCKED):
- Safety guardrails section 15 re-read: YES. All OFF. Initials: ____
- Evidence link/reference (screenshots, email threads, notes file):
Next action from this event:
```

Every outreach send, reply, demo, score change, or decision must have an entry with safety re-confirmation.

Evidence Log Gate before any contact or handoff: [ ] PASS (entry exists with safety line for this action) [ ] HOLD [ ] BLOCKED

---

## 10. Next Action Queue

Maintain a simple prioritized queue of next actions drawn from the tracker (Next action + Next action date columns). Review daily.

### Next Action Queue Template (Daily Snapshot)
Priority | Prospect | Next action | Due date | Owner | Status link (tracker row)
---|---|---|---|---|---
1 | Alex Rivera | Schedule discovery call this week | 2026-06-11 | Jason | Tracker row 1 - Outreach status REPLIED
2 | Jordan Hale | Research decision maker phone + recent reviews | 2026-06-10 | Jason | Tracker row 2

Rules:
- Only one owner per action (usually Jason for first paid).
- Due dates realistic (never more than 7 days out for active pipeline).
- When action completed: update tracker, append Evidence Log, pull next from tracker.
- At end of day: move any overdue to top of next day's queue + note in log.

Queue Health: [ ] PASS (all items have due date <=7 days, owner assigned, <=15 active items) [ ] HOLD [ ] BLOCKED

---

## 11. Handoff Readiness Checklist

Use this checklist to decide when a prospect is ready for clean handoff to First Paid Roofer Sales Outreach System Packet (primary) and/or Launch System Packet.

### Handoff Preconditions (All Must Be True for CLEAN HANDOFF)
- [ ] Prospect row complete in tracker (all 21 columns populated with current data).
- [ ] Early fit score 35+ /50 with no hard disqualifiers (section 2 + 3 + 8).
- [ ] At least one positive reply or completed early demo showing interest (Outreach status REPLIED / INTERESTED or Demo status COMPLETED - STRONG FIT).
- [ ] Evidence Log has entry for most recent touch/demo with safety re-confirmation.
- [ ] Prospect has heard and acknowledged (or explicitly confirmed in writing/verbally logged) the exact public language: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup (config only). 14-day trial after go-live. Automated email 2 days before first monthly payment. Cancel anytime. No long-term contract.
- [ ] No open objections that would block sales packet execution (or logged and acceptable).
- [ ] Decision status = FIT APPROVED FOR SALES HANDOFF.
- [ ] Weekly pipeline review (section 13) or daily command center (section 14) confirms no safety or data issues.
- [ ] Verifier for this packet + sales outreach packet + aggregate run green in last 24h (or re-run now).

### Handoff Artifact (Copy into Internal Notes + Link to Sales Packet)
```
FIRST PAID ROOFER PROSPECT PIPELINE HANDOFF
Date: ____
Prospect: [Name] @ [Company] | Location: ____ | Website: ____
Source: ____ | Contact: ____ | Est lead volume: ____ | Fit score: ____/50
Key pain signal (verbatim): ____
Tracker row reference: [row id or link]
Evidence Log latest entry date: ____ (includes safety re-confirm)
Trial language confirmation captured? (Y + quote or N)
Decision: FIT APPROVED FOR SALES HANDOFF
Next: Full outreach + demo execution per FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md sections 1-15
Handoff status: [ ] HANDED OFF CLEANLY TO SALES OUTREACH SYSTEM PACKET
Also reference: FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md for downstream Guided Setup
Safety: all guardrails section 15 re-confirmed. No live activation.
```

### Post-Handoff
- Update tracker Handoff status to HANDED OFF TO SALES OUTREACH.
- Move prospect from active pipeline tracker view to "Handed Off" tab or archive section.
- Sales Outreach Packet now owns detailed follow-up, full demo, objection handling, fit decision scorecard (detailed), and final handoff to Launch.
- This packet's role ends for this prospect unless re-engaged via nurture path.

Handoff Gate: [ ] PASS (all preconditions true + artifact created + tracker updated) [ ] HOLD [ ] BLOCKED

---

## 12. No-Go / Not-Now / Nurture Handling

### Pre-Contact / Early Research No-Go (Hard BLOCKED)
- Apply sections 2-3 filters. If hard DQ: do not contact. Log in Evidence Log + set Decision status BLOCKED + Handoff status NEVER. Close row or move to "Archived - DQ" view. No future outreach unless prospect re-initiates.

### After First Touch or Demo — Not a Fit (BLOCKED)
- Log verbatim reason + quotes.
- Send short close note only if appropriate (no pressure): "Thanks for the chat. If your needs change, the 14-day trial offer remains open. Best of luck."
- Update tracker: Decision status = BLOCKED, Handoff status = NEVER, Outreach status = CLOSED / NO RESPONSE or equivalent.
- No further manual touches. Archive.

### Not-Now / Timing Off (HOLD -> Nurture)
- Prospect says "not right now", "too busy", "call me in 3 months".
- Update Outreach status = REPLIED / NOT NOW.
- Move to Nurture list (separate tab or filter in tracker).
- Set Next action date 30-60 days out: "Light nurture touch: value note on missed leads + 14-day trial offer open."
- Max one light nurture touch per 45 days unless they re-engage.
- Re-score on re-engagement before re-activating to active pipeline.

### Nurture List Rules
- Separate view in tracker (filter Decision status = NURTURE or Handoff status = NURTURE).
- Quarterly review only (or via weekly pipeline review section 13).
- Never auto-email or auto-sequence.
- If prospect re-initiates: re-run fit filters (section 2), create new Evidence Log entry, decide re-activate or close.

Required for All No-Go / Not-Now / Nurture:
- Update prospect tracker status columns.
- Append Evidence Log entry with safety re-confirmation.
- Decision status = NO-GO / NOT-NOW / NURTURE.
- No live system updates.

No-Go Gate: [ ] PASS (closed cleanly, logged, no future promise of activation) [ ] HOLD

---

## 13. Weekly Pipeline Review Checklist

Run every week (same day/time recommended). This is the formal checkpoint before any handoff or major outreach push.

### Weekly Pipeline Review Checklist (All Items)
- [ ] Re-run this packet's verifier + full aggregate (node backend/scripts/verify-first-paid-pilot-readiness-readonly.js) + quality gate. Confirm all PASS.
- [ ] Review master tracker: count active prospects, % with complete columns, % with current next action dates, fit score distribution.
- [ ] Check Evidence Log: every active prospect has entry in last 7 days if touched; all have safety line.
- [ ] Audit hard DQ list: any that should have been BLOCKED earlier? Clean up.
- [ ] Nurture list sweep: any ready for light touch or re-activation? Any stale >90 days to close?
- [ ] Next action queue: clear all overdue, re-prioritize top 5-7.
- [ ] Source list refresh: add 1-2 new channels or names if pipeline <15 active.
- [ ] Safety re-confirmation: re-read section 15 in full. Log "Weekly review safety: all 15 guardrails OFF. Initials: ____ Date: ____"
- [ ] Handoff candidates: run section 11 checklist on any 35+ fit score with reply/demo. Only hand off if clean.
- [ ] Decision Log update (see end of packet): append summary of week's PASS/HOLD/BLOCKED.
- [ ] Pipeline health gate: [ ] PASS (verifiers green, tracker maintained, safety logged, 0 unsafe actions) [ ] HOLD [ ] BLOCKED

Record full review in Evidence Log as "WEEKLY REVIEW" type. Snapshot tracker + log before/after.

Weekly review is required before any handoff to Sales Outreach System Packet.

---

## 14. Founder/Operator Daily Pipeline Command Center

This is the day-to-day operating view. Use every morning + EOD.

### Daily Snapshot (Fill at Start of Day)
Date: ____
Active prospects in tracker: ____ (NOT CONTACTED + OUTREACH SENT + REPLIED + SCHEDULED)
Nurture list size: ____
Overdue next actions: ____ (list briefly)
Top 3 priorities today (from queue):
1. ____
2. ____
3. ____
Safety last re-confirmed: ____ (must be today before any sends)

### Morning Routine (5-10 min)
- Open tracker + next action queue.
- Review any replies overnight (manual email/LinkedIn check only).
- Update any status changes + append Evidence Log if actioned.
- Confirm verifiers ran green in last 24h (or run now).
- Re-read safety section 15 before first outreach or call.
- Execute top priority action. Log immediately.

### End-of-Day Routine (5 min)
- Update tracker for all actions taken.
- Append Evidence Log for every material event.
- Refresh next action queue for tomorrow.
- Note any blockers or research needed.
- If any handoff candidate emerged: run full section 11 checklist (do not hand off without weekly review or equivalent gate).
- EOD report (optional short note in Evidence Log): "EOD [date]: X touches, Y demos, Z decisions. Safety: all OFF."

### Command Center Gates (Daily)
- Verifier + aggregate green: [ ] yes
- Safety re-read before contact: [ ] yes (log in every Evidence entry)
- Tracker updated for today's work: [ ] yes
- No production systems touched: [ ] confirmed
- Overall daily health: [ ] PASS [ ] HOLD [ ] BLOCKED

All daily work uses only the columns, stages, and templates in this packet. No shortcuts that bypass gates.

---

## 15. Explicit Safety Guardrails

This section must be reviewed and re-initialed at every major gate (before outreach, before demo, before handoff, during weekly review, daily command center). All items below are confirmed OFF / NOT ACTIVATED for the first paid roofer prospect pipeline unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.

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
- Auth / RLS / security policy implementation or changes: NONE (this packet contains zero schema, zero policies, zero secrets handling code)
- Payment automation (billing engine, invoice generation, or first-month payment collection automation): NONE (manual handoff checklists only)
- Any public marketing or customer contract language claiming automatic booking, guaranteed results, or "monthly billing day-15 phrasing" without the required 14-day trial + automated pre-billing email framing: FORBIDDEN (enforced by verifiers on all public assets)
- Any CRM, Notion automation, Make/Zapier, or external tool that writes prospect data to production systems: DISABLED (tracker is manual copy-paste or local spreadsheet only)

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

### Re-Confirmation Protocol (Required Before Every Outreach, Demo, Handoff, or Weekly Review)
1. Re-read this safety section 15 in full.
2. Run the full aggregate verifier and this packet's verifier (or confirm last run green <24h).
3. Confirm no live systems, no writes, no sends have been or will be activated by any step in this packet.
4. Log in Evidence Log: "Safety re-confirmed: all 15 guardrails OFF. Initials: ____ Date: ____ Time: ____"
Log "Safety re-confirmed: all 15 guardrails OFF" (see Evidence Log entries and weekly/daily routines)
5. Only then proceed with manual action.

If any guardrail cannot be confirmed OFF: STOP. HOLD the action. Escalate to founder decision log.

### Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)
- 7-day pilot
- 5 qualified appointments in 7 days
- guarantee (when describing jobs, revenue, appointments, or outcomes)
- booked jobs / book jobs / booked-job
- automatic estimate / auto-estimate / automatic quote / auto quote
- invoice generated / payment link / collect payment (as automated behaviors)
- Monthly billing starts on day 15 (without 14-day trial framing)
- Founder-Led Launch Program (as public/customer positioning)

Allowed only in this internal "Forbidden Public Phrases" documentation section for enforcement. Never in prospect messages, demo scripts, website copy, or customer emails.

### No-Activation Summary for This Packet
No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated. All prospect work is manual founder/operator planning, research, copy-paste outreach, note-taking, and internal spreadsheet/Notion tracking only. Handoff is a documented internal artifact only.

---

## Decision Log (Master — Append for the First Paid Roofer Prospect Pipeline)

| Date | Gate/Section | Prospect | Decision (PASS/HOLD/BLOCKED) | Safety re-confirmed? | Notes / Evidence ref |
|------|--------------|----------|------------------------------|----------------------|----------------------|
|      |              |          |                              |                      |                      |

All entries must reference safety guardrails re-confirmation and the specific section/gate (e.g. "section 11 handoff readiness").

## Explicit Final Confirmation for This Packet

- Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer prospect pipeline / tracker.
- No auth changes: yes
- No database schema changes: yes
- No RLS policies: yes
- No production data writes: yes
- No live workflow activation activated: yes
- Public/business positioning uses only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup (config only) + 14-day trial + automated email 2 days before first monthly payment + cancel anytime + no long-term contract.
- Forbidden phrases are absent from all prospect-facing content.
- All 15 required sections (prospect source list, ideal fit filters, bad-fit filters, prospect tracker table with exact columns, outreach/follow-up/demo status stages, fit scorecard, evidence log, next action queue, handoff readiness checklist, no-go/nurture handling, weekly review checklist, daily command center, safety guardrails) present with substantive operational content, concrete fields, templates, and PASS/HOLD/BLOCKED gates.
- Handoffs target the Sales Outreach System Packet and Launch System Packet cleanly.
- Verifier will fail if any required content, column, wiring, or safety language is missing or if forbidden/unsafe language is introduced.

This packet enables Jason to run a disciplined, gated, safe prospect pipeline for the first paid roofer without relying on ad-hoc notes.

---

## Verification Commands (Run in Order) — Repeated for Reference

```bash
node --check backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js
node backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js
scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

Safety remains demo ready with live automation disabled. Stop after gates and diff proof. Do not commit changes that fail verifiers. Do not push.
