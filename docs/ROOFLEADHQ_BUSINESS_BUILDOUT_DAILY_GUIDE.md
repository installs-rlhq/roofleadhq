# RoofLeadHQ Business Buildout Daily Guide
Version: June 6, 2026 — Current state override applied after Vapi dry-run readiness fix
Owner: Jason Lohse
Purpose: A practical day-by-day guide for building RoofLeadHQ from current state to launch, first clients, and early scaling.

---

## June 6, 2026 Current State Override

RoofLeadHQ has moved beyond several earlier guide assumptions. This guide still provides the overall build roadmap, but the current source-of-truth state below overrides older daily-plan references.

### Current tooling reality

- Codex is currently out of tokens.
- Current working setup is Telegram OpenClaw + VPS Terminal.
- Grok Build is available, but setup has been challenging. Use only when clearly helpful and setup-safe.
- VPS Terminal / Terminal 1 in `/root/roofleadhq` remains the source of truth for git state, verification, commits, pushes, builds, and production checks.
- Telegram OpenClaw should be used for short prompts, targeted edits, and checklists.
- Do not rely on Codex until tokens are available again.

### Latest verified source-of-truth commit

Latest verified commit:

`24cc864 fix(pilot): exclude vapi dry-run from lindy live trigger scan`

Terminal verified:
- `HEAD -> main`
- `origin/main -> main`

Latest verified history:
- `24cc864 fix(pilot): exclude vapi dry-run from lindy live trigger scan`
- `aad2fd1 docs(pilot): record vapi ingestion dry-run milestone`
- `e1a0f45 test(vapi): add gated payload ingestion dry-run`
- `a9fdbe5 docs(pilot): fully update next-chat context package with Vapi ingestion plan + incident note`
- `9a26ff5 docs(vapi): fix test payload ingestion verifier language`
- `3a4d7a3 docs(vapi): add test payload ingestion plan`
- `198b412 docs(pilot): record aggregate vapi readiness wiring`
- `b7e6498 test(pilot): require vapi readiness verifiers in aggregate`

Latest verification passed before commit `24cc864`:
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `npm --prefix backend run build`

### Current safety posture

- Demo ready with live automation disabled.
- Homeowner SMS is not live.
- Roofer reply SMS is not live.
- Twilio sending is not live.
- Vapi/Calendar/Resend/Lindy production triggers are not live.
- Lindy internal alerts exist, but Lindy is not customer-facing production automation.
- Manual Outreach remains dry-run/test-safe unless separately approved.
- No live Vapi webhook route exists.
- No Vapi calls from code.
- No Supabase writes from Vapi flows.
- No SMS/Twilio sends from Vapi flows.
- No Calendar/Resend/Lindy production activation.
- No cron/scheduler/dispatcher activation.
- Retell remains deprecated/disabled.

### Completed SMS/Lindy updates

The earlier SMS section is stale where it says the test-only message insert and follow-up update had not yet happened. Current state:

- Gated test-only SMS DB write completed successfully.
- One test-only `messages` row was inserted.
- One `follow_ups` row was updated and verified.
- No SMS was sent.
- No Twilio call was made.
- No route/cron/scheduler/production dispatcher activation occurred.
- Operator alert bridge was built and verified.
- Lindy SMS DB Write Test internal alert was verified end-to-end.
- Lindy remains internal/back-office only.
- Retell remains deprecated/disabled.

### Completed Vapi readiness updates

The earlier Vapi roadmap sections are stale because the Vapi readiness sequence has advanced. Completed Vapi work:

1. Vapi post-call payload discovery package.
2. Vapi raw payload capture plan.
3. Vapi sample payload mapping package.
4. Vapi missing-fields readiness gate.
5. Vapi real payload collection runbook.
6. Vapi operator payload review checklist.
7. Vapi test payload ingestion plan.
8. Gated test-only Vapi payload ingestion dry-run script.
9. Dry-run verifier wired into aggregate readiness.
10. Next-chat context package updated.
11. Lindy false-positive readiness scan fixed.

Current Vapi ingestion status:
- Planning doc exists.
- Read-only plan verifier exists and passes.
- Test-only dry-run ingestion script exists.
- Dry-run verifier exists and passes.
- Aggregate readiness includes the dry-run verifier.
- No live route exists.
- No Vapi calls.
- No Supabase writes.
- No SMS/Twilio/Calendar/Resend/Lindy activation.
- No cron/scheduler/dispatcher activation.
- Future real sanitized payload ingestion requires explicit founder approval.

Vapi dry-run script:
- `backend/scripts/vapi-test-payload-ingestion-dry-run.js`

Vapi dry-run verifier:
- `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`

Dry-run gates:
- `VAPI_INGESTION_TEST_MODE=1`
- `--allow-vapi-test-ingestion`

### Vapi Dry-Run Scenario Hardening Milestone

- Commit `7e30d9b test(vapi): harden dry-run scenario coverage`
- Commit `d2ca159 docs(pilot): record vapi dry-run scenario hardening`
- Six fake/sanitized Vapi scenario payloads added (booked inspection, unbooked follow-up, missing address, missing phone, emergency leak, insurance/storm damage)
- Dry-run script now supports `--scenario`
- Verifier executes all six valid scenarios, invalid scenario, and missing-gates cases
- Verification passed: dry-run verifier, aggregate readiness, next-chat context, backend build
- Safety preserved: no live Vapi/Supabase/SMS/Twilio/Calendar/Resend/Lindy, no routes/cron/scheduler/dispatcher

### Important verification incidents

1. Commit `3a4d7a3` was accidentally pushed while the Vapi test payload ingestion plan verifier was failing.
   - Commit `9a26ff5` fixed the verifier language.
   - Rule: never commit/push if any verifier fails.

2. Commit `aad2fd1` was pushed after the aggregate readiness verifier failed.
   - Failure was a false positive: Lindy was detected as live automation because a safe Vapi dry-run safety comment mentioned “Lindy.”
   - Commit `24cc864` fixed the scan exclusion in `backend/scripts/show-pilot-readiness-status.js`.
   - Rule: if a verifier fails, stop and fix before further build work.

### Updated next build direction

The old next SMS database-write batch is mostly completed/stale. Current best next safe build options:

1. Vapi dry-run normalized payload mapper hardening
   - Add more fake/sanitized sample scenarios.
   - Add missing-field cases.
   - Add verifier coverage.
   - No writes, no routes, no live calls.

2. Vapi ingestion preview report
   - Generate an operator-readable dry-run report from fake payloads.
   - Show what lead/call/booking/follow_up records would be created.
   - No writes.

3. Vapi real sanitized payload readiness gate
   - Docs + verifier only.
   - Requires explicit founder approval before any real sanitized payload is used.

Default build rule remains:
- Build bigger.
- Verify harder.
- Ship faster.
- No live production activation without explicit approval.

---

## Core Strategy

RoofLeadHQ should be built as a **founder-led managed service with SaaS infrastructure**.

The immediate goal is not to build the perfect fully autonomous AI company. The immediate goal is to get a reliable, professional, sellable system live for the first paying roofer.

### Current Direction

- Supabase becomes the source of truth.
- Custom/Vercel code owns the branded dashboard and customer-facing experience.
- Twilio owns SMS send/receive and Manual Outreach triggers.
- Vapi owns phone call handling and call summaries.
- Resend owns transactional emails and reports.
- Google Calendar owns booking.
- Lindy stays temporarily for internal alerts, summaries, booking-failed notices, and manual review reminders.
- Use Telegram OpenClaw + VPS Terminal for current implementation flow. Grok Build is available but setup-challenging; Codex can be used again later when tokens are available.
- Terminal 1 remains the source of truth for verification, git state, commits, pushes, builds, and production checks.
- VPS OpenClaw should not be used unless explicitly requested.
- Telegram OpenClaw may be used for short prompts, summaries, and mobile-friendly checklists.
- Agents should still make reviewable changes, but the default should no longer be overly tiny incremental steps.

### New Marketing Direction

Replace the old hard guarantee:

> old quota-based appointment promise or first month free.

With the new manageable offer:

> Founder-Led Launch Program  
> We set up and monitor your roofing lead response system during launch, so every eligible lead is answered, followed up with, tracked, and reported clearly.

Use the First-Month Confidence Promise:

> If RoofLeadHQ does not make your lead response faster, cleaner, and easier to manage in your first month after go-live, we will credit your next month or waive your first monthly payment.

### Core Website Message

> RoofLeadHQ is a done-for-you missed lead recovery and appointment booking system for roofing contractors.  
> Founder-led during launch. System-led after setup.

---

# How To Use This Guide

Each day has:

1. **Goal**
2. **Main tasks**
3. **Done when**
4. **Agent prompt to use if needed**

This guide is not meant to slow the build down into tiny one-step tasks. RoofLeadHQ should now move in larger, safer build batches.

Default rhythm:

- Bundle related implementation work when the risk is manageable.
- Use Telegram OpenClaw for prompts/checklists and VPS Terminal for verification/builds. Use Grok Build only when clearly helpful and setup-safe. Use Codex again later when tokens are available.
- Include implementation, verifier scripts, docs/checklist updates, and safety checks in the same build batch when practical.
- Use Terminal 1 as the source of truth for final verification, git status, build/test output, commits, pushes, and production checks.
- Do not run live SMS, Twilio, cron, Calendar, Vapi, Resend, Lindy production automations, or broad Supabase writes without explicit approval.

The updated rule is:

> Build bigger, verify harder, ship faster.

---

# Agent Roles

## Lindy Builder Agent

Use for:
- Internal alert workflows
- Daily summaries
- Booking failed alerts
- Unclassified lead alerts
- Manual review reminders
- Temporary no-code glue

Do not use for:
- Main homeowner SMS experience
- Core lead database
- Main dashboard data
- Long-term booking logic
- Multi-client source of truth

## Lindy Chat Agent

Use for:
- Drafting operational messages
- Summarizing workflows
- Reviewing lead notes
- Creating internal alert text
- Helping you think through workflows

Do not use for:
- Owning customer-facing SMS conversations long-term
- Making irreversible architecture decisions

## Telegram OpenClaw / VPS Terminal Build Flow

Use Telegram OpenClaw + VPS Terminal for:
- Larger backend implementation batches
- Supabase integration planning and implementation
- SMS dispatcher/database-write layer
- Twilio/Vapi webhook work when explicitly approved
- Verifier scripts
- Docs/checklist updates tied to code changes
- Code-heavy planning where implementation should move quickly

Rules:
- Work only in `/root/roofleadhq`.
- Never use `/root/.openclaw/workspace`.
- Do not commit or push.
- Do not change production flags.
- Do not expose secrets.
- Do not enable live SMS, Twilio sends, Calendar, Vapi, Resend, Lindy, cron, or public routes without explicit approval.
- Return files changed, full diff, verification output, and commands Terminal 1 should run.
- Prefer larger safe build batches over tiny one-file steps when the risk is manageable.

## Telegram OpenClaw Chat Agent

Use for:
- Quick mobile instructions
- Status summaries
- Small debugging questions
- Prompt relay to VPS agent
- Daily checklists
- Reviewing what changed

Do not use for:
- Complex multi-file changes without a written plan.

## Execution Rhythm Update

RoofLeadHQ will now move in larger build batches instead of overly small incremental steps.

Each build batch should include:
- implementation
- safety gates
- verification scripts
- documentation/checklist updates
- Terminal 1 validation before commit/push

The goal is to increase build velocity while preserving safety around live SMS, Twilio, Supabase writes, Calendar, Vapi, cron jobs, and production behavior. If any verifier fails, stop and fix the source of truth before committing or pushing.

We will still require explicit approval before:
- sending live SMS
- enabling Twilio outbound calls/messages
- activating cron/scheduled dispatcher jobs
- exposing public production routes
- writing production message/follow_up records outside approved gated tests
- enabling Calendar/Vapi/Resend/Lindy production triggers
- destructive cleanup/delete operations
- secrets exposure

Default approach:

> Build bigger, verify harder, ship faster.

## Current SMS Build Status Update

As of latest verified commit:

- Latest verified commit: `24cc864 fix(pilot): exclude vapi dry-run from lindy live trigger scan`
- SMS duplicate-send detection exists and is verified read-only.
- SMS dispatcher dry-run executor exists and is verified read-only.
- Pure write-plan builder exists.
- Mock write executor exists.
- Fake-only workflow_events audit writer exists.
- Gated workflow_events live test write verifier exists.
- One real test-only workflow_events row was inserted successfully.
- Duplicate protection was verified.
- No SMS has been sent.
- No Twilio call/import has been enabled for outbound sending.
- Test-only `messages` insert has been completed and verified; no live dispatcher SMS path has been enabled.
- Test-only `follow_ups` update has been completed and verified; no live dispatcher SMS path has been enabled.

Next larger build batch:

- Vapi dry-run normalized payload mapper hardening.
- Vapi ingestion preview report from fake/sanitized payloads.
- Real sanitized payload readiness gate as docs + verifier only.
- No writes, routes, live calls, SMS/Twilio, Calendar, Resend, Lindy production activation, cron, scheduler, or dispatcher activation without explicit approval.

---

# Universal Agent Safety Prompt

Use this before any code-related work:

```text
We are building RoofLeadHQ faster using larger, safer build batches.

Correct repo:
- /root/roofleadhq

Wrong repo:
- /root/.openclaw/workspace

Build rhythm:
- Do not split safe related work into tiny unnecessary steps.
- Prefer one larger build batch that includes implementation, verifier scripts, docs/checklist updates, and safety checks.
- Do not commit or push.
- Terminal 1 will verify before commit/push.

Safety rules:
1. Do not enable live SMS.
2. Do not call/import Twilio unless explicitly approved.
3. Do not write production messages or update follow_ups unless explicitly approved.
4. Do not add cron, routes, schedulers, or production flags unless explicitly approved.
5. Do not trigger Vapi, Calendar, Resend, Lindy, or other production automations unless explicitly approved.
6. Do not expose or print secrets.
7. Use Supabase as the source of truth.
8. Keep customer-facing SMS and booking language controlled by RoofLeadHQ, not Lindy.
9. Keep changes reviewable.
10. Return files changed, full diff, verification results, and remaining risks.

Task:
[INSERT SPECIFIC TASK HERE]
```

---

# Phase 1: Foundation and Website Repositioning
## Days 1–7

## Day 1 — Lock the New Business Direction

### Goal
Stop strategy drift and define the launch model.

### Tasks
- Confirm the new offer:
  - Founder-Led Launch Program
  - First-Month Confidence Promise
  - No hard 5-appointments-in-7-days guarantee
- Confirm the launch operating model:
  - Founder-led during launch
  - System-led after setup
- Confirm the first version of the product:
  - Fast response
  - Follow-up
  - Manual Outreach
  - Vapi phone lead handling
  - Dashboard
  - Weekly report

### Done when
You have one written paragraph describing what RoofLeadHQ is and what it promises.

### Lindy Chat Agent Prompt
```text
Help me summarize the new RoofLeadHQ launch direction in plain English for internal use.

Use this direction:
- Founder-Led Launch Program
- First-Month Confidence Promise
- No hard old quota-based appointment promise guarantee
- RoofLeadHQ is a done-for-you missed lead recovery and appointment booking system for roofers
- Founder-led during launch, system-led after setup

Return:
1. One internal positioning paragraph
2. One customer-facing paragraph
3. Three short CTA options
```

---

## Day 2 — Website Copy Inventory

### Goal
Find every place on roofleadhq.com that still uses the old guarantee or old positioning.

### Tasks
- Search website files for:
  - 5 qualified appointments
  - old pilot wording
  - first month free
  - book inspections
  - fully automated
  - free pilot
- Make a list of sections needing edits:
  - hero
  - pricing
  - FAQ
  - final CTA
  - trust sections
  - how it works
  - manual outreach
  - Vapi/phone section

### Done when
You have a list of every file/section that needs a wording update.

### Telegram OpenClaw / VPS Terminal Prompt
```text
We need to update roofleadhq.com messaging.

Do not modify files yet.

Search the website codebase for old offer language:
- "5 qualified appointments"
- "old pilot wording"
- "first month free"
- "free pilot"
- "book inspections"
- "fully automated"
- "guarantee"

Return:
1. Exact files where these appear
2. Exact line/context if possible
3. Recommended replacement category
4. Any sections that need rewriting
Do not make changes yet.
```

---

## Day 3 — Update Hero and CTA

### Goal
Update the top of the website to the new positioning.

### Tasks
Replace hero with:

Headline:
> Stop Missing Roofing Leads. Book More Inspections.

Subheadline:
> RoofLeadHQ is a done-for-you lead response system for roofing contractors. We answer calls, texts, forms, and emails, follow up automatically, and help get qualified homeowners onto your calendar.

Primary CTA:
> Book a Founder-Led Setup Call

Secondary CTA:
> See How It Works

Trust line:
> Founder-led setup. No tech skills needed. First-month confidence promise.

### Done when
Hero and top CTAs reflect the new offer.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update only the website hero section and top CTA language.

Use:
Headline: Stop Missing Roofing Leads. Book More Inspections.
Subheadline: RoofLeadHQ is a done-for-you lead response system for roofing contractors. We answer calls, texts, forms, and emails, follow up automatically, and help get qualified homeowners onto your calendar.
Primary CTA: Book a Founder-Led Setup Call
Secondary CTA: See How It Works
Trust line: Founder-led setup. No tech skills needed. First-month confidence promise.

Rules:
- Modify only the necessary website file(s).
- Do not change layout unless required.
- Do not commit or push.
- After changes, summarize exact files changed.
```

---

## Day 4 — Update Offer and Pricing

### Goal
Replace old pilot/guarantee pricing language with Founder-Led Launch.

### Tasks
- Remove “old quota-based appointment promise.”
- Add Founder-Led Launch Program section.
- Keep pricing:
  - $499 setup
  - $399 Starter
  - $599 Growth
  - $799 Elite
- Add usage note for call/SMS/automation volume.

### Done when
Pricing no longer implies a free pilot or hard appointment guarantee.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update the pricing and offer sections on roofleadhq.com.

Remove old hard guarantee wording:
- old quota-based appointment promise
- free old pilot wording

Add:
Founder-Led Launch Program
We personally help set up your RoofLeadHQ system, connect your lead sources, configure your response flow, and monitor your launch after go-live.

First-Month Confidence Promise:
If RoofLeadHQ does not make your lead response faster, cleaner, and easier to manage in your first month after go-live, we will credit your next month or waive your first monthly payment.

Pricing:
Founder-Led Setup: $499 one-time
Starter: $399/mo up to 100 leads/mo
Growth: $599/mo up to 300 leads/mo
Elite: $799/mo up to 500 leads/mo

Add usage note:
Standard plans include normal call, SMS, and automation usage for the listed lead volume. Very high call volume, unusually long calls, or custom workflows may require a usage adjustment.

Do not change unrelated sections.
```

---

## Day 5 — Strengthen Manual Outreach Section

### Goal
Make Manual Outreach a clear differentiator.

### Tasks
Add/strengthen section:

Headline:
> Turn Outside Leads Into Follow-Up Sequences

Copy:
> Got a lead from Angi, Thumbtack, a referral, or a homeowner text while you are on a roof? Send the homeowner’s number to your RoofLeadHQ-connected number, and we will start the follow-up flow from your business number.

Bullets:
- No need to log into another lead portal right away
- Helps prevent outside leads from going cold
- Tracks manual outreach leads in your dashboard
- Uses the same follow-up system as your inbound leads

### Done when
Manual Outreach is visible and easy to understand.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Add or strengthen a Manual Outreach section on roofleadhq.com.

Headline:
Turn Outside Leads Into Follow-Up Sequences

Copy:
Got a lead from Angi, Thumbtack, a referral, or a homeowner text while you are on a roof? Send the homeowner’s number to your RoofLeadHQ-connected number, and we will start the follow-up flow from your business number.

Bullets:
- No need to log into another lead portal right away
- Helps prevent outside leads from going cold
- Tracks manual outreach leads in your dashboard
- Uses the same follow-up system as your inbound leads

Keep styling consistent with the current site. Do not change unrelated files.
```

---

## Day 6 — Add/Update Phone/Vapi Section

### Goal
Explain Vapi phone lead handling without making Vapi the whole product.

### Tasks
Add/strengthen section:

Headline:
> Calls Answered When You Cannot Pick Up

Copy:
> When a homeowner calls, RoofLeadHQ can use your connected AI phone agent to capture the lead details, summarize the call, and move the homeowner toward an inspection when appropriate.

Bullets:
- Captures name, phone, address, issue, urgency, and preferred time
- Creates or updates the lead record
- Sends call summaries to the dashboard
- Starts follow-up if the lead is not booked

### Done when
Phone lead handling is clearly presented as one part of RoofLeadHQ.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Add or update a Phone Leads / Vapi section.

Headline:
Calls Answered When You Cannot Pick Up

Copy:
When a homeowner calls, RoofLeadHQ can use your connected AI phone agent to capture the lead details, summarize the call, and move the homeowner toward an inspection when appropriate.

Bullets:
- Captures name, phone, address, issue, urgency, and preferred time
- Creates or updates the lead record
- Sends call summaries to the dashboard
- Starts follow-up if the lead is not booked

Important:
Do not position Vapi as the whole product. RoofLeadHQ is the operating layer; Vapi is one tool inside the phone lead path.
```

---

## Day 7 — Website QA and Publish

### Goal
Make sure the website is clean, consistent, and deployable.

### Tasks
- Search again for old guarantee language.
- Check mobile layout.
- Check CTA links.
- Confirm pricing is clear.
- Confirm no “jobs” overpromising where “inspections” is more accurate.
- Deploy through GitHub/Vercel after review.

### Done when
The live site reflects the new offer.

### Telegram OpenClaw Prompt
```text
Run a website QA checklist for the new RoofLeadHQ positioning.

Check:
1. No old old quota-based appointment promise guarantee remains.
2. CTA says Book a Founder-Led Setup Call or similar.
3. Pricing is clear.
4. Founder-Led Launch Program is clear.
5. Manual Outreach is visible.
6. Phone/Vapi lead path is clear.
7. Mobile layout looks good.
8. No broken buttons or links.
9. No overpromising “book inspections” language where “book inspections” is better.

Return a concise pass/fail list and any fixes needed.
```

---

# Phase 2: Supabase Source of Truth
## Days 8–14

## Day 8 — Schema Plan Only

### Goal
Generate a Supabase schema plan without executing anything.

### Tasks
- Generate table plan for:
  - roofers
  - roofer_onboarding
  - leads
  - messages
  - calls
  - bookings
  - follow_ups
  - workflow_events
  - reports
  - prospects
  - sales_activities
- Review relationships.
- Review RLS approach.
- Do not execute SQL yet.

### Done when
You have a schema plan and draft SQL.

### Telegram OpenClaw / VPS Terminal Prompt
```text
We are designing the Supabase schema for RoofLeadHQ.

Do not modify project files.
Do not execute SQL.
Do not create migrations yet.
Return a schema plan and SQL draft for review only.

RoofLeadHQ is a multi-tenant lead response system for roofing contractors.

Required tables:
- roofers
- roofer_onboarding
- leads
- messages
- calls
- bookings
- follow_ups
- workflow_events
- reports
- prospects
- sales_activities

Design rules:
1. Use clean snake_case names.
2. Supabase is the source of truth.
3. Use roofer_id foreign keys.
4. Keep current state in leads.
5. Store history in workflow_events.
6. Store SMS/email in messages.
7. Store Vapi calls in calls.
8. Store appointments in bookings.
9. Store scheduled follow-ups in follow_ups.
10. Use source_path and source_detail.
11. Include created_at and updated_at.
12. Include indexes for dashboard queries.
13. Include RLS policies so each authenticated roofer only sees their own data.
14. Include realtime recommendations.
15. Include assumptions and risks.

Output:
1. Architecture explanation
2. Table-by-table schema
3. Relationships
4. Status/source values
5. Indexes
6. RLS approach
7. SQL draft
8. Questions before execution
```

---

## Day 9 — Review Schema

### Goal
Simplify and validate the schema before running SQL.

### Tasks
Review:
- Are there too many columns?
- Are tables cleanly separated?
- Are RLS policies understandable?
- Are statuses simple?
- Are dashboard indexes included?
- Does Manual Outreach fit?
- Does Vapi fit?
- Does website/signup fit?

### Done when
You have an approved version of the schema.

### Lindy Chat Agent Prompt
```text
Review this proposed Supabase schema for RoofLeadHQ from a business operations perspective.

Look for:
- unnecessary complexity
- missing fields for client onboarding
- missing fields for lead tracking
- missing fields for Manual Outreach
- missing fields for Vapi phone calls
- missing fields for reports
- unclear statuses
- anything that could make daily operations harder

Return:
1. What looks good
2. What is missing
3. What should be simplified
4. Questions before implementation

Schema:
[PASTE SCHEMA HERE]
```

---

## Day 10 — Execute Clean Schema

### Goal
Create the Supabase tables after review.

### Tasks
- Run approved SQL in Supabase SQL editor.
- Confirm tables exist.
- Confirm RLS is enabled.
- Confirm indexes exist.
- Add one test roofer.
- Add sample lead data.

### Done when
Supabase has the first working data structure.

### Telegram OpenClaw / VPS Terminal Prompt
```text
We are ready to implement the approved Supabase schema.

Before doing anything:
1. Confirm this SQL only creates/updates the intended RoofLeadHQ tables.
2. Confirm RLS is included.
3. Confirm no destructive commands are present.
4. Confirm indexes are included.
5. Confirm realtime recommendations are included.

Then provide final execution notes for pasting into Supabase SQL editor.

Approved SQL:
[PASTE SQL HERE]
```

---

## Day 11 — Add Test Data

### Goal
Create realistic test records.

### Tasks
Add:
- 1 test roofer
- 5 digital leads
- 3 phone/Vapi leads
- 3 manual outreach leads
- 3 bookings
- 10 messages
- 3 follow-ups
- 5 workflow events

### Done when
Dashboard/report logic has realistic test data to use.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Create safe Supabase seed SQL for RoofLeadHQ test data.

Include:
- 1 test roofer
- 5 digital leads
- 3 phone leads
- 3 manual outreach leads
- 3 bookings
- 10 messages
- 3 follow_ups
- 5 workflow_events

Rules:
- Use realistic but fake roofing data.
- Do not include real customer info.
- Do not use destructive commands.
- Return SQL only after explaining what it will create.
```

---

## Day 12 — Define Lead Status Rules

### Goal
Make statuses consistent before workflows depend on them.

### Tasks
Approve statuses:
- new
- contacted
- responded
- qualifying
- booked
- needs_attention
- unresponsive
- lost
- cancelled

Define what moves a lead from one status to another.

### Done when
You have a written status rule sheet.

### Lindy Chat Agent Prompt
```text
Create a simple RoofLeadHQ lead status rule sheet.

Use these statuses:
- new
- contacted
- responded
- qualifying
- booked
- needs_attention
- unresponsive
- lost
- cancelled

For each status, define:
1. What it means
2. What triggers it
3. What the next likely status is
4. Whether it should appear in Leads Needing Attention
5. Whether follow-ups should continue
```

---

## Day 13 — Define Event Logging Rules

### Goal
Make every important workflow auditable.

### Tasks
Define when to create workflow_events:
- lead_created
- message_sent
- message_received
- message_failed
- call_completed
- booking_created
- booking_failed
- followup_scheduled
- followup_sent
- followup_skipped
- owner_notified
- report_sent
- workflow_error

### Done when
Every workflow has a logging expectation.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Create a workflow event logging plan for RoofLeadHQ.

For each event type:
- lead_created
- message_sent
- message_received
- message_failed
- call_completed
- booking_created
- booking_failed
- followup_scheduled
- followup_sent
- followup_skipped
- owner_notified
- report_sent
- workflow_error

Define:
1. When it should be created
2. Which table/action triggers it
3. Required metadata
4. Whether it affects dashboard metrics
5. Whether it should alert Jason
```

---

## Day 14 — Supabase QA

### Goal
Make sure the database is ready for workflows.

### Tasks
- Confirm test data inserts.
- Confirm RLS behavior.
- Confirm dashboard queries are possible.
- Confirm relationships are clean.
- Confirm no old Google Sheet dependency is required for core data.

### Done when
Supabase is ready to receive live workflow data.

### Telegram OpenClaw Prompt
```text
Run a Supabase readiness QA checklist for RoofLeadHQ.

Check:
1. Required tables exist.
2. RLS is enabled.
3. Test roofer exists.
4. Test leads exist.
5. Messages/calls/bookings/follow_ups link to leads.
6. Dashboard metrics can be queried.
7. Manual Outreach can be represented.
8. Vapi calls can be represented.
9. Reports can be represented.
10. No obvious schema blockers remain.

Return pass/fail and the top 5 risks.
```

---

# Phase 3: Manual Outreach MVP
## Days 15–21

## Day 15 — Manual Outreach Flow Design

### Goal
Design the exact flow before building.

### Tasks
Define:
- What roofer texts
- How phone number is parsed
- What message homeowner receives
- What lead status is created
- What follow-ups are scheduled
- What gets logged

### Done when
You have a complete Manual Outreach spec.

### Lindy Chat Agent Prompt
```text
Design the Manual Outreach workflow for RoofLeadHQ.

Scenario:
A roofer receives an external lead from Angi, Thumbtack, referral, HomeAdvisor, or another source. The roofer texts the homeowner’s phone number to their RoofLeadHQ-connected number. RoofLeadHQ creates a lead and starts follow-up from the roofer’s business number.

Return:
1. Step-by-step workflow
2. Required fields
3. SMS parsing rules
4. Homeowner first message template
5. Follow-up schedule
6. Supabase records created
7. Error cases
8. Internal alerts needed
```

---

## Day 16 — Manual Outreach Twilio Webhook Plan

### Goal
Prepare the technical route.

### Tasks
Plan:
- inbound SMS webhook
- roofer identification by Twilio number
- homeowner phone extraction
- create lead
- create message/workflow_event
- send first SMS

### Done when
Implementation plan is approved.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Plan the Manual Outreach Twilio inbound SMS webhook.

Do not modify files yet.

Flow:
1. Roofer texts a homeowner phone number to their RoofLeadHQ-connected number.
2. Twilio sends inbound SMS webhook to RoofLeadHQ.
3. System identifies the roofer by the receiving Twilio number.
4. System extracts and normalizes the homeowner phone number.
5. System creates a Supabase lead:
   source_path = manual
   source_detail = unknown unless included
   status = new/contacted
6. System sends first homeowner outreach SMS.
7. System creates messages, follow_ups, and workflow_events records.
8. System alerts Jason if parsing fails.

Return:
1. Existing files/routes related to Twilio
2. Proposed implementation plan
3. Exact files to change
4. Environment variables needed
5. Risks
6. Test plan
Implement the full gated test-only batch, including verifier scripts and docs, but do not run live production actions or commit until Terminal 1 verification passes.
```

---

## Day 17 — Build Manual Outreach Webhook

### Goal
Implement the MVP.

### Tasks
- Add route.
- Parse inbound SMS.
- Normalize number.
- Create lead.
- Send first SMS.
- Log messages/events.
- Schedule follow-ups.

### Done when
You can text a number and see the lead appear in Supabase.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Implement the approved Manual Outreach Twilio webhook MVP.

Scope:
- Only implement the Manual Outreach inbound SMS flow.
- Do not alter unrelated files.
- Do not commit or push.

Required:
1. Identify roofer by inbound Twilio number.
2. Extract homeowner phone number from SMS body.
3. Normalize to E.164 if possible.
4. Create Supabase lead with source_path = manual.
5. Create message record for inbound roofer request.
6. Send first homeowner SMS through Twilio.
7. Create outbound message record.
8. Create workflow_events.
9. Create follow_ups for 2h, 12h, and 24h.
10. Return errors safely and log workflow_error.

After implementation:
- Summarize files changed.
- Give local/test instructions.
- List remaining risks.
```

---

## Day 18 — Manual Outreach Message Templates

### Goal
Make homeowner-facing SMS professional.

### Tasks
Create templates for:
- first outreach
- 2h follow-up
- 12h follow-up
- 24h follow-up
- wrong number
- opt-out respect
- booked confirmation

### Done when
Templates are approved and stored where the system can use them.

### Lindy Chat Agent Prompt
```text
Create professional SMS templates for RoofLeadHQ Manual Outreach.

Context:
A roofer sent us a homeowner phone number from Angi, Thumbtack, referral, HomeAdvisor, or another external source. RoofLeadHQ is reaching out from the roofer’s connected number.

Requirements:
- Short, human, professional
- No weird AI phrasing
- No overpromising
- Ask one simple question at a time
- Mention the roofing company if available
- Respect opt-out language where appropriate

Create:
1. First outreach SMS
2. 2-hour follow-up
3. 12-hour follow-up
4. 24-hour follow-up
5. Wrong number response
6. Booking confirmation
7. Reminder SMS
```

---

## Day 19 — Manual Outreach Testing

### Goal
Test the workflow end-to-end.

### Tasks
- Send test SMS as roofer.
- Confirm Supabase lead.
- Confirm homeowner SMS.
- Confirm follow_ups created.
- Confirm dashboard can show manual lead.
- Confirm error handling for bad number.

### Done when
Manual Outreach works in a controlled test.

### Telegram OpenClaw Prompt
```text
Help me run a Manual Outreach test checklist.

Test cases:
1. Roofer texts a valid homeowner number.
2. Roofer texts a number with dashes/spaces.
3. Roofer texts a bad number.
4. Roofer includes source, like “Angi 5125551234”.
5. Duplicate number is submitted.
6. Homeowner replies.
7. Homeowner opts out.

For each test, tell me:
- Expected Supabase records
- Expected Twilio action
- Expected dashboard result
- Expected internal alert if failure occurs
```

---

## Day 20 — Manual Outreach Dashboard Fields

### Goal
Make Manual Outreach visible in dashboard.

### Tasks
- Add or confirm Manual Outreach KPI.
- Add Manual Outreach source filter.
- Add Manual Outreach row labels.
- Add recommended actions for manual leads.

### Done when
Manual Outreach is visible to roofer and Jason.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update the dashboard to clearly show Manual Outreach leads.

Scope:
- Use Supabase data.
- Do not change unrelated dashboard sections.

Add/confirm:
1. Manual Outreach Leads KPI
2. Manual Outreach source filter or label
3. Leads Needing Attention includes manual leads
4. Recommended Actions can reference manual leads
5. Manual leads show source_path = manual and source_detail where available

Return files changed and test steps.
```

---

## Day 21 — Manual Outreach Stabilization

### Goal
Prepare Manual Outreach for pilot use.

### Tasks
- Fix issues from testing.
- Add internal alert for failures.
- Document instructions for roofer.
- Create short demo copy.

### Done when
Manual Outreach is ready for a pilot roofer.

### Lindy Builder Prompt
```text
Create an internal alert workflow for Manual Outreach failures.

Trigger:
A workflow_error or failed Manual Outreach event is logged in Supabase or sent to Lindy.

Alert Jason with:
- Roofer/business name
- Submitted phone number/message
- Error reason
- Lead ID if created
- Recommended next step

This is internal only. Do not send customer-facing SMS from Lindy.
```

---

# Phase 4: Vapi Phone Lead Path
## Days 22–28

> Current-state note: Vapi live webhook/route work remains future work only. The gated test-only Vapi payload ingestion dry-run already exists and is verified. Real sanitized payload ingestion requires explicit founder approval. No live Vapi calls, routes, Supabase writes, SMS/Twilio, Calendar, Resend, Lindy production activation, cron, scheduler, or dispatcher activation.


## Day 22 — Vapi Flow Spec

### Goal
Define what Vapi must capture and send to Supabase.

### Tasks
Capture:
- caller phone
- homeowner name
- address
- issue
- urgency
- preferred time
- transcript
- summary
- outcome
- booked or not booked

### Done when
Vapi call output schema is clear.

### Lindy Chat Agent Prompt
```text
Create a Vapi phone lead capture specification for RoofLeadHQ.

The phone agent should capture:
- homeowner name
- phone
- address
- roofing issue
- urgency
- insurance claim if mentioned
- preferred appointment time
- whether appointment was requested
- whether appointment was booked
- call summary
- next action

Return:
1. Call goals
2. Required fields
3. Optional fields
4. Post-call summary format
5. Lead status mapping
6. What should trigger follow-up
7. What should trigger Jason alert
```

---

## Day 23 — Vapi Webhook Plan

### Goal
Plan the post-call webhook.

### Tasks
- Receive call completion payload.
- Match existing lead by phone if possible.
- Create lead if not found.
- Create call record.
- Create booking if booked.
- Schedule follow-up if not booked.

### Done when
Implementation plan is approved.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Plan the Vapi post-call webhook for RoofLeadHQ.

Do not modify files yet.

Flow:
1. Vapi call completes.
2. Vapi sends webhook payload to RoofLeadHQ.
3. System identifies roofer.
4. System matches lead by caller phone or creates a new lead.
5. System creates calls record with transcript, summary, outcome, duration, provider_call_id, raw_payload.
6. If appointment booked, create booking and calendar event if applicable.
7. If not booked, create follow_ups.
8. Create workflow_events.
9. Alert Jason if required fields are missing.

Return:
1. Existing files/routes related to Vapi
2. Proposed route
3. Exact files to change
4. Supabase tables affected
5. Risks
6. Test plan
Implement the full gated test-only batch, including verifier scripts and docs, but do not run live production actions or commit until Terminal 1 verification passes.
```

---

## Day 24 — Build Vapi Webhook

### Goal
Connect Vapi call output to Supabase.

### Tasks
- Implement route.
- Create/update lead.
- Create call record.
- Handle booking/follow-up logic.
- Log events.

### Done when
A test Vapi call creates/updates Supabase records.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Implement the approved Vapi post-call webhook MVP.

Scope:
- Only Vapi post-call webhook.
- Do not modify unrelated files.
- Do not commit or push.

Required:
1. Receive Vapi payload.
2. Identify roofer.
3. Match or create lead.
4. Create calls record.
5. Store transcript, summary, outcome, raw_payload.
6. If booked, create booking record.
7. If not booked, schedule follow_ups.
8. Create workflow_events.
9. Log workflow_error for missing critical data.

After implementation:
- Summarize files changed.
- Provide test instructions.
- List risks.
```

---

## Day 25 — Vapi Prompt Review

### Goal
Make Vapi sound professional and collect clean data.

### Tasks
- Review Vapi agent prompt.
- Make sure it does not speak numbers awkwardly.
- Make sure it captures structured info.
- Make sure it ends calls cleanly.
- Make sure it does not overpromise.

### Done when
Vapi prompt is stable enough for test calls.

### Lindy Chat Agent Prompt
```text
Review and improve this Vapi roofing phone agent prompt.

Goals:
- Sound professional and human
- Answer on behalf of the roofing company
- Capture name, phone, address, roofing issue, urgency, insurance claim if relevant, preferred appointment time
- Avoid robotic number reading
- Do not overpromise
- If booking is possible, move toward inspection scheduling
- If booking fails, summarize next action
- End with a professional closing

Return:
1. Improved prompt
2. Shorter version if needed
3. Data extraction checklist
4. Failure handling instructions

Current prompt:
[PASTE PROMPT HERE]
```

---

## Day 26 — Vapi Testing

### Goal
Run controlled calls.

### Tasks
Test:
- emergency leak
- standard estimate
- insurance claim
- bad address
- wants callback
- booking request
- no booking

### Done when
Vapi creates reliable call summaries and Supabase records.

### Telegram OpenClaw Prompt
```text
Help me test the Vapi phone lead path.

Test scenarios:
1. Emergency leak
2. Standard roof estimate
3. Insurance claim/storm damage
4. Homeowner wants callback
5. Homeowner provides incomplete address
6. Homeowner books inspection
7. Homeowner does not book

For each scenario, list:
- What Vapi should capture
- Expected lead status
- Expected calls record
- Expected booking/follow-up outcome
- What should appear on dashboard
```

---

## Day 27 — Vapi Dashboard Fields

### Goal
Make phone leads useful in the dashboard.

### Tasks
Add/confirm:
- Phone Leads KPI
- call summary in lead row/detail
- call outcome
- missed/unbooked phone leads needing attention
- upcoming booked inspections

### Done when
Phone leads are visible and actionable.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update the dashboard to clearly show Vapi phone leads.

Add/confirm:
1. Phone Leads KPI
2. Call summary display
3. Call outcome display
4. Phone leads needing attention
5. Booked phone leads in Upcoming Booked Inspections
6. Source labels source_path = phone, source_detail = vapi

Use Supabase data. Do not modify unrelated sections.
```

---

## Day 28 — Vapi Stabilization

### Goal
Prepare Vapi for pilot use.

### Tasks
- Fix testing issues.
- Add alerts for missing call details.
- Document phone lead process.
- Confirm fallback if booking fails.

### Done when
Phone lead path is pilot-ready.

### Lindy Builder Prompt
```text
Create an internal alert workflow for Vapi call issues.

Trigger:
A Vapi call completed but the Supabase workflow_event indicates missing required fields, booking_failed, or workflow_error.

Alert Jason with:
- Roofer/business name
- Caller phone
- Call summary if available
- Missing fields
- Outcome
- Recommended next step

Internal alert only. Do not send homeowner SMS from Lindy.
```

---

# Phase 5: Digital Intake and Follow-Up Dispatcher
## Days 29–42

## Day 29 — Digital Intake Spec

### Goal
Define the digital lead path.

### Tasks
Sources:
- website
- Google Business
- Facebook/Instagram
- email
- text

Define:
- required fields
- source mapping
- first response
- follow-up schedule
- error handling

### Done when
You know what every digital lead should create in Supabase.

### Lindy Chat Agent Prompt
```text
Create a Digital Lead Intake spec for RoofLeadHQ.

Sources:
- website forms
- Google Business Profile
- Facebook/Instagram
- email
- inbound text

For each source, define:
1. Required fields
2. Optional fields
3. Supabase lead fields
4. Source_path/source_detail
5. First response message
6. Follow-up schedule
7. Error cases
8. Internal alerts
```

---

## Day 30 — Website/Form Intake

### Goal
Connect website/form submissions to Supabase.

### Tasks
- Determine current form source.
- Map fields.
- Create lead.
- Send response.
- Log events.

### Done when
A form submission creates a Supabase lead.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Plan website/form lead intake into Supabase.

Do not modify files yet.

Flow:
1. Website/form submission occurs.
2. System creates lead in Supabase.
3. source_path = digital
4. source_detail = website_form
5. First response is sent if phone/email is available.
6. follow_ups are created.
7. workflow_events are logged.

Return:
1. Current form handling location
2. Recommended implementation
3. Exact files/routes to change
4. Data mapping
5. Risks
6. Test plan
```

---

## Day 31 — Email Intake

### Goal
Move email leads toward Supabase-first.

### Tasks
- Identify current Lindy email intake.
- Decide short-term bridge:
  - Lindy receives email and writes to Supabase
  - or custom email parser route
- Keep internal alert in Lindy if helpful.

### Done when
Email leads can create Supabase records.

### Lindy Builder Prompt
```text
Update the existing email lead intake workflow so Supabase is the source of truth.

Goal:
When a roofing lead email is received, create a lead record in Supabase before downstream actions.

Required:
- source_path = digital
- source_detail = email
- homeowner_name if available
- phone if available
- email if available
- address if available
- issue_description
- urgency if available
- status = new
- workflow_event = lead_created

Then trigger internal notification if needed.

Do not make Lindy the long-term source of truth.
```

---

## Day 32 — Inbound Text Intake

### Goal
Handle homeowner text replies and new text leads.

### Tasks
- Twilio inbound SMS route.
- Distinguish roofer Manual Outreach command vs homeowner reply.
- Match lead by phone.
- Create message record.
- Update lead status to responded.

### Done when
Homeowner replies are logged and visible.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Plan inbound Twilio SMS handling for RoofLeadHQ.

Do not modify files yet.

Need to distinguish:
1. Roofer texting a homeowner number to trigger Manual Outreach
2. Homeowner replying to an outreach/follow-up
3. New unknown inbound text lead

Required:
- Match by phone number and roofer Twilio number
- Create messages record
- Update lead status when homeowner replies
- Cancel or skip pending follow-ups if appropriate
- Create workflow_events
- Alert Jason if message cannot be matched

Return plan, files, risks, and test cases.
```

---

## Day 33 — Build/Refine Inbound Text Handling

### Goal
Implement homeowner replies.

### Tasks
- Log inbound messages.
- Update lead statuses.
- Pause follow-ups where needed.
- Alert if needs attention.

### Done when
Homeowner replies behave correctly.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Implement approved inbound Twilio SMS handling.

Scope:
- Homeowner replies
- Unknown inbound text leads
- Manual Outreach command detection if already approved

Required:
1. Create inbound message record.
2. Match lead by phone.
3. Update lead status to responded or needs_attention.
4. Create workflow_event.
5. Cancel/skip scheduled follow-ups if homeowner replied.
6. Alert Jason if unmatched.

Do not modify unrelated files.
```

---

## Day 34 — Follow-Up Dispatcher Database-Write Batch Spec

> Current-state note: the gated test-only `messages` insert and `follow_ups` update have already been completed and verified. Keep this section as historical roadmap context only; do not redo completed work unless a verifier or source-of-truth check requires it.

### Goal
Define the safe database-write layer before any SMS is sent.

### Tasks
- Use `follow_ups`, `messages`, and `workflow_events` tables.
- Build and verify gated test-only message insert behavior.
- Build and verify gated test-only follow_ups update behavior if schema/risk is clear.
- Keep Twilio and actual SMS sending disabled.
- Add duplicate protection.
- Add post-write verification.
- Add static checks proving no Twilio, no SMS send, no route, no cron, and no production dispatcher activation.

### Done when
The database-write path is proven in gated test-only mode without sending SMS or enabling Twilio.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Create the next Follow-Up Dispatcher database-write build batch for RoofLeadHQ.

Current latest verified commit:
24cc864 fix(pilot): exclude vapi dry-run from lindy live trigger scan

Goal:
Move faster by implementing the full gated test-only database-write layer if schema/risk is clear.

Bundle together if safe:
1. Gated test-only messages insert verifier.
2. Gated test-only follow_ups update verifier.
3. Duplicate protection.
4. Post-write verification.
5. Static checks proving:
   - no Twilio import/call
   - no SMS send
   - no route
   - no cron
   - no production dispatcher activation
6. Docs/checklist updates.

Forbidden unless explicitly approved:
- Actual SMS send
- Twilio import/call
- Production cron/scheduler
- Public route
- Production dispatcher activation
- Broad production writes
- Destructive cleanup/delete operations

Rules:
- Work only in /root/roofleadhq.
- Do not use /root/.openclaw/workspace.
- Do not commit or push.
- Do not run live database writes until Terminal 1 verifies safe/default mode and Jason approves.
- Return files changed, full diff, build output, verifier output, and remaining risks.
```

---

## Day 35 — Build Follow-Up Dispatcher Database-Write Layer

### Goal
Implement the next approved gated database-write batch without sending SMS.

### Tasks
- Implement test-only `messages` insert verifier.
- Implement test-only `follow_ups` update verifier if schema/risk is clear.
- Add duplicate protection.
- Add workflow_events audit logging.
- Add post-write verification.
- Keep Twilio and SMS disabled.

### Done when
A gated test-only database-write batch is verified and documented, with no SMS or Twilio enabled.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Implement the next approved Follow-Up Dispatcher build batch.

Scope:
- Build the database-write layer first.
- Include gated test-only messages insert verifier.
- Include gated test-only follow_ups update verifier if schema/risk is clear.
- Include workflow_events audit logging.
- Include duplicate protection.
- Include post-write verification.
- Include static checks proving no Twilio, no SMS send, no route, no cron, and no production dispatcher activation.
- Update docs/checklists.

Forbidden unless explicitly approved:
- Actual SMS send
- Twilio import/call
- Production cron/scheduler
- Public route
- Production dispatcher activation

After implementation:
- List files changed
- Provide full diff
- Provide verification commands
- Confirm no SMS/Twilio/cron/route was enabled
- Do not commit or push
```

---

## Day 36 — No-Contact Window Testing

### Goal
Avoid sending messages at bad times.

### Tasks
- Test before 8 AM.
- Test after 9 PM.
- Test timezone setting.
- Confirm reschedule logic.

### Done when
No-contact behavior is safe.

### Telegram OpenClaw Prompt
```text
Help me test RoofLeadHQ no-contact window logic.

Rules:
- Do not send homeowner SMS between 9 PM and 8 AM local roofer/homeowner time.
- If a follow-up is due during quiet hours, reschedule it to the next allowed window.
- Log skipped/rescheduled reason.

Create test cases and expected results.
```

---

## Day 37 — Message Template Review

### Goal
Finalize SMS tone.

### Tasks
Create templates for:
- digital first response
- phone call follow-up
- manual outreach
- booking confirmation
- reminder
- no response follow-ups
- needs human attention

### Done when
Templates are short, professional, and consistent.

### Lindy Chat Agent Prompt
```text
Create final RoofLeadHQ SMS templates.

Requirements:
- Professional and human
- Short
- Clear
- Roofing-specific
- No weird AI wording
- Ask one question at a time
- Do not overpromise
- Include roofer business name placeholder

Create templates for:
1. Digital lead first response
2. Manual Outreach first response
3. Vapi call follow-up
4. 2-hour follow-up
5. 12-hour follow-up
6. 24-hour follow-up
7. Booking confirmation
8. Appointment reminder
9. Needs human attention/internal note
```

---

## Day 38 — Digital Intake Testing

### Goal
Test form/email/text sources.

### Tasks
- Submit test form.
- Send test email.
- Send test text.
- Confirm Supabase records.
- Confirm first response.
- Confirm follow-ups.

### Done when
Digital path works end-to-end.

### Telegram OpenClaw Prompt
```text
Create a Digital Intake QA checklist.

Test:
1. Website form lead
2. Email lead
3. Inbound text lead
4. Missing phone
5. Missing email
6. Duplicate lead
7. Bad phone number
8. Lead outside service area

For each:
- Expected Supabase lead
- Expected message/follow-up behavior
- Expected dashboard state
- Expected internal alert
```

---

## Day 39 — Lindy Internal Alerts Cleanup

### Goal
Keep Lindy useful but not central.

### Tasks
Create/confirm Lindy alerts:
- workflow_error
- booking_failed
- unclassified lead
- missing phone/email
- daily unresolved leads
- manual outreach failure
- Vapi missing fields

### Done when
Lindy is only back-office support.

### Lindy Builder Prompt
```text
Create or update Lindy internal alert workflows for RoofLeadHQ.

Lindy should only handle internal/back-office alerts, not homeowner-facing SMS.

Alert types:
1. workflow_error
2. booking_failed
3. unclassified lead
4. missing phone/email
5. daily unresolved leads
6. manual outreach failure
7. Vapi missing fields

Each alert should include:
- roofer/business name
- lead ID
- homeowner name/phone if available
- issue summary
- recommended next action
```

---

## Day 40 — Workflow Event Dashboard

### Goal
Give yourself visibility into failures.

### Tasks
- Add internal event/error view.
- Show recent workflow_errors.
- Show failed messages.
- Show failed follow-ups.
- Show booking failures.

### Done when
Jason can see what broke.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Create an internal admin/error view for RoofLeadHQ.

Use Supabase workflow_events, messages, follow_ups, and bookings.

Show:
1. Recent workflow_errors
2. Failed messages
3. Failed follow-ups
4. Booking failures
5. Unmatched inbound messages
6. Vapi calls with missing fields

This can be simple and internal only. Do not overbuild.
```

---

## Day 41 — End-to-End Workflow Test

### Goal
Test all three paths.

### Tasks
- Manual Outreach test
- Vapi call test
- Digital form/email/text test
- Follow-up test
- Booking test
- Report data test

### Done when
All paths create data in Supabase and dashboard.

### Telegram OpenClaw Prompt
```text
Guide me through an end-to-end RoofLeadHQ workflow test.

Test all three paths:
1. Digital lead
2. Vapi phone lead
3. Manual Outreach lead

For each, verify:
- lead created
- first response sent
- messages logged
- follow-ups scheduled
- booking can be created
- workflow_events logged
- dashboard updates
- internal alerts fire on errors
```

---

## Day 42 — Stabilization Day

### Goal
Fix what broke.

### Tasks
- Fix top bugs only.
- Do not add features.
- Document known issues.
- Decide what is pilot-ready.

### Done when
You have a launch readiness list.

### Lindy Chat Agent Prompt
```text
Help me create a RoofLeadHQ launch readiness list.

Based on these test notes:
[PASTE NOTES]

Return:
1. Ready for pilot
2. Needs fixing before pilot
3. Can be manually handled during pilot
4. Should wait until later
5. Top 5 risks
```

---

# Phase 6: Dashboard and Reports
## Days 43–56

## Day 43 — Dashboard KPI Query Plan

### Goal
Define dashboard metrics from Supabase.

### Tasks
KPIs:
- New Leads
- Booked Inspections
- Booking Rate
- Average Response Time
- Leads Needing Attention
- Follow-Ups Sent
- Phone Leads
- Manual Outreach Leads

### Done when
Every KPI has a Supabase query definition.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Create a Supabase query plan for RoofLeadHQ dashboard KPIs.

KPIs:
1. New Leads
2. Booked Inspections
3. Booking Rate
4. Average Response Time
5. Leads Needing Attention
6. Follow-Ups Sent
7. Phone Leads
8. Manual Outreach Leads

For each:
- Tables used
- Filter logic
- Date range logic
- SQL or Supabase query
- Edge cases
Do not modify files yet.
```

---

## Day 44 — Build Dashboard Supabase Connection

### Goal
Dashboard reads real data.

### Tasks
- Connect dashboard to Supabase.
- Use test roofer.
- Populate KPI cards.

### Done when
Dashboard shows real Supabase data.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Connect the RoofLeadHQ dashboard to Supabase for KPI data.

Scope:
- Use existing dashboard design.
- Replace demo/static KPI values with Supabase data where safe.
- Do not redesign the dashboard.
- Use test roofer data first.

KPIs:
- New Leads
- Booked Inspections
- Booking Rate
- Average Response Time
- Leads Needing Attention
- Follow-Ups Sent
- Phone Leads
- Manual Outreach Leads

Return files changed and test steps.
```

---

## Day 45 — Leads Needing Attention

### Goal
Make dashboard operationally useful.

### Tasks
Define lead attention logic:
- no reply after 24h
- failed message
- booking failed
- missing address
- Vapi missing fields
- homeowner replied but not booked
- urgent issue not booked

### Done when
Table shows real action items.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Build or refine the Leads Needing Attention section.

Use Supabase data.

Include leads where:
- status = needs_attention
- homeowner replied but not booked
- urgent issue not booked
- failed message exists
- booking_failed event exists
- Vapi call missing required fields
- no reply after final follow-up

Columns:
- homeowner name
- phone
- source
- last contact
- status
- recommended next action
- call/text action link if available

Do not redesign unrelated dashboard sections.
```

---

## Day 46 — Upcoming Booked Inspections

### Goal
Show booked appointments clearly.

### Tasks
- Pull bookings.
- Show homeowner/date/time/address/source.
- Sort upcoming first.

### Done when
Booked inspections section works.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update Upcoming Booked Inspections section to use Supabase bookings data.

Show:
- homeowner name
- booked time
- address
- source
- confirmation/reminder status

Sort upcoming first.
Do not change unrelated sections.
```

---

## Day 47 — Source Performance

### Goal
Show which sources are working.

### Tasks
- Group by source_path/source_detail.
- Show leads/bookings/booking rate.
- Include Manual Outreach and Phone.

### Done when
Source performance section shows real data.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update Top Lead Sources section to use Supabase data.

Group by:
- source_path
- source_detail

Show:
- lead count
- booked inspections
- booking rate

Include:
- digital sources
- phone/Vapi
- manual outreach
```

---

## Day 48 — Recommended Actions

### Goal
Make dashboard feel smart without risky AI.

### Tasks
Start with rules-based recommendations:
- many leads needing attention
- slow response time
- manual leads underperforming
- phone leads not booking
- missed follow-ups
- source with low booking rate

### Done when
Recommendations are generated from data.

### Lindy Chat Agent Prompt
```text
Create rule-based Recommended Actions for a roofing lead dashboard.

Use these data signals:
- leads needing attention
- slow response time
- low booking rate by source
- high manual outreach volume
- phone leads not booking
- missed/failed follow-ups
- urgent leads not booked

Return:
1. Rule condition
2. Plain-English recommendation
3. Priority level
4. Whether Jason should be alerted
```

---

## Day 49 — Report Structure

### Goal
Define weekly/monthly report format.

### Tasks
Create sections:
- summary
- leads
- bookings
- response time
- follow-ups
- source performance
- leads needing attention
- recommended actions

### Done when
Report template is approved.

### Lindy Chat Agent Prompt
```text
Create a weekly RoofLeadHQ report template.

Audience:
Roofing contractor client.

Tone:
Plain-English, helpful, not too technical.

Sections:
1. Weekly summary
2. New leads
3. Booked inspections
4. Booking rate
5. Average response time
6. Follow-up performance
7. Top lead sources
8. Leads needing attention
9. Recommended actions
10. Manual Outreach activity
11. Phone/Vapi call activity

Include placeholder variables from Supabase.
```

---

## Day 50 — Build Report Generator Plan

### Goal
Plan report generation from Supabase.

### Tasks
- Query metrics.
- Generate HTML.
- Send with Resend.
- Log report.

### Done when
Technical plan exists.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Plan a RoofLeadHQ weekly report generator.

Do not modify files yet.

Flow:
1. Scheduled trigger.
2. Query Supabase metrics for each roofer.
3. Generate HTML email.
4. Send with Resend.
5. Create reports record.
6. Create workflow_event report_sent.
7. Alert Jason on failure.

Return:
- recommended implementation
- files/routes/jobs needed
- Supabase queries
- email structure
- risks
- test plan
```

---

## Day 51 — Build Weekly Report MVP

### Goal
Send one test report.

### Tasks
- Generate report for test roofer.
- Send to your email.
- Confirm report record.
- Confirm event log.

### Done when
You receive a clean weekly report.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Implement Weekly Report MVP for RoofLeadHQ.

Scope:
- One test roofer first
- Query Supabase data
- Generate HTML report
- Send with Resend
- Log reports record
- Log workflow_event

Do not implement monthly reports yet.
Do not modify unrelated files.

After implementation:
- files changed
- test instructions
- risks
```

---

## Day 52 — Dashboard QA

### Goal
Make dashboard reliable enough for screenshots and pilot.

### Tasks
- Check every section.
- Check mobile.
- Check empty states.
- Check fake vs real data.
- Check no broken buttons.

### Done when
Dashboard is screenshot-ready.

### Telegram OpenClaw Prompt
```text
Run a RoofLeadHQ dashboard QA checklist.

Check:
1. KPI cards show real Supabase data.
2. Leads Needing Attention works.
3. Upcoming Booked Inspections works.
4. Top Lead Sources works.
5. Follow-Up Performance works.
6. Recommended Actions work.
7. Manual Outreach is visible.
8. Phone/Vapi leads are visible.
9. Empty states look professional.
10. Mobile layout works.
11. No demo data appears where live data should appear.
```

---

## Day 53 — Website Screenshot Refresh

### Goal
Update marketing screenshots.

### Tasks
- Capture dashboard screenshot.
- Capture confirmation/reminder examples.
- Capture manual outreach flow.
- Capture weekly report preview.
- Replace old website screenshots if needed.

### Done when
Website visuals match new positioning.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Update website screenshot references if needed.

Current screenshots may include:
- dashboard
- homeowner confirmation
- reminder
- roofer alert
- manual outreach
- weekly report

Do not redesign sections. Only update image references and alt text as needed.

Alt text should reflect:
- roofing lead dashboard
- manual outreach
- booked inspection confirmation
- weekly report
```

---

## Day 54 — Report QA

### Goal
Make report accurate and readable.

### Tasks
- Verify numbers match dashboard.
- Verify wording is clear.
- Verify email deliverability.
- Verify report logged.

### Done when
Report is pilot-ready.

### Lindy Chat Agent Prompt
```text
Review this RoofLeadHQ weekly report for clarity and contractor usefulness.

Check:
1. Is it plain-English?
2. Does it avoid jargon?
3. Are the recommendations useful?
4. Does it overpromise?
5. Are any numbers confusing?
6. What would a roofer care about most?

Report:
[PASTE REPORT TEXT]
```

---

## Day 55 — Internal Admin Checklist

### Goal
Document what Jason checks daily.

### Tasks
Create daily review:
- failed messages
- workflow errors
- leads needing attention
- Vapi missing fields
- booking failures
- unclassified leads
- upcoming inspections

### Done when
You have a 10-minute daily ops checklist.

### Lindy Chat Agent Prompt
```text
Create a 10-minute daily operations checklist for Jason to monitor RoofLeadHQ during pilot clients.

Include:
- failed workflows
- failed SMS
- Vapi call issues
- leads needing attention
- booking failures
- manual outreach failures
- unclassified leads
- upcoming booked inspections
- report status

Make it simple and repeatable.
```

---

## Day 56 — Stabilization Day

### Goal
Fix dashboard/report issues.

### Tasks
- Fix only launch blockers.
- Do not add major features.
- Update documentation.

### Done when
Dashboard and report are pilot-ready.

---

# Phase 7: Sales and First Pilot Client
## Days 57–70

## Day 57 — Sales Offer Finalization

### Goal
Finalize what you are selling.

### Tasks
Offer:
- Founder-Led Launch Program
- $499 setup
- monthly plan after go-live
- First-Month Confidence Promise
- no tech skills needed
- built for roofers

### Done when
Sales script matches website.

### Lindy Chat Agent Prompt
```text
Create a concise sales script for RoofLeadHQ.

Offer:
Founder-Led Launch Program for roofing contractors.

Core promise:
We help stop missed leads by responding fast, following up automatically, helping book inspections, and showing what needs attention.

Pricing:
$499 setup.
Monthly plans start after go-live.

Confidence promise:
If RoofLeadHQ does not make lead response faster, cleaner, and easier to manage in the first month after go-live, we credit next month or waive first monthly payment.

Return:
1. 30-second pitch
2. 2-minute pitch
3. Discovery questions
4. Objection responses
5. Closing question
```

---

## Day 58 — Prospect List Build

### Goal
Create first outreach list.

### Tasks
Find 50 roofers:
- local area
- storm-prone states
- poor response speed
- no dedicated office staff signs
- active ads or lead spend

### Done when
50 prospects are in prospects table/sheet.

### Telegram OpenClaw Prompt
```text
Help me create criteria for a first RoofLeadHQ prospect list.

Target:
Independent roofing contractors and small roofing companies.

Prioritize:
- likely lead volume
- slow response signs
- storm restoration
- insurance claims
- active ads
- weak follow-up process
- no dedicated receptionist

Return:
1. Prospect scoring criteria
2. Fields to collect
3. Outreach priority levels
4. Red flags to avoid
```

---

## Day 59 — Outreach Messages

### Goal
Create phone/DM/email scripts.

### Tasks
Create:
- cold call opener
- voicemail
- LinkedIn DM
- Facebook DM
- email
- follow-up message

### Done when
You can start outreach.

### Lindy Chat Agent Prompt
```text
Create outbound outreach messages for RoofLeadHQ.

Audience:
Roofing contractors.

Core pain:
They may be losing jobs because calls, forms, texts, or lead portal inquiries are not answered or followed up fast enough.

Offer:
Founder-Led Launch Program.

CTA:
Book a quick setup/discovery call.

Create:
1. Cold call opener
2. Voicemail
3. LinkedIn DM
4. Facebook DM
5. Email
6. Follow-up message
7. Referral ask

Tone:
Direct, helpful, not spammy.
```

---

## Day 60 — Outreach Day 1

### Goal
Start selling.

### Tasks
- 5–10 calls/DMs.
- Log every attempt.
- Record objections.
- Book calls.

### Done when
You have actual market feedback.

### Lindy Chat Agent Prompt
```text
Help me review today's RoofLeadHQ outreach results.

I contacted:
[PASTE LIST]

Results:
[PASTE RESULTS]

Return:
1. What messaging worked
2. What objections appeared
3. How to improve tomorrow's outreach
4. Follow-up messages for each prospect type
```

---

## Day 61 — Outreach Day 2

### Goal
Continue outreach and refine.

### Tasks
- 5–10 more attempts.
- Follow up with previous contacts.
- Test different hook:
  “You do not need more leads. You need to stop losing the ones you already paid for.”

### Done when
You have response data.

---

## Day 62 — Outreach Day 3

### Goal
Book first discovery calls.

### Tasks
- Call/DM more prospects.
- Ask about lead response process.
- Offer founder-led launch.

### Done when
At least 1–2 calls are booked or strong prospects identified.

---

## Day 63 — Discovery Call Prep

### Goal
Prepare for sales calls.

### Tasks
Create call flow:
- current lead sources
- lead volume
- missed calls
- who responds
- average response time
- what happens after no reply
- inspection booking process
- calendar setup
- pain level
- pricing fit

### Done when
You have a repeatable call checklist.

### Lindy Chat Agent Prompt
```text
Create a RoofLeadHQ discovery call checklist.

Goal:
Determine whether a roofer is a good fit for the Founder-Led Launch Program.

Include questions about:
- lead sources
- monthly lead volume
- missed calls
- response time
- current follow-up process
- office staff
- Angi/Thumbtack/referrals
- phone call handling
- calendar/booking
- pain level
- budget fit
- go-live readiness

Return a call script and qualification scoring.
```

---

## Day 64 — Sales Call / Demo Day

### Goal
Run calls and show demo.

### Tasks
- Use dashboard screenshots.
- Explain three lead paths.
- Explain founder-led launch.
- Explain confidence promise.
- Ask for setup fee.

### Done when
You have one serious pilot candidate.

---

## Day 65 — Follow-Up Sales

### Goal
Move prospect to signup.

### Tasks
- Send recap.
- Send setup link.
- Answer objections.
- Ask for decision.

### Done when
Prospect signs up or gives clear next step.

### Lindy Chat Agent Prompt
```text
Write a follow-up email after a RoofLeadHQ discovery call.

Include:
- thank you
- summary of their lead response problem
- how RoofLeadHQ helps
- Founder-Led Launch Program
- setup fee and monthly plan
- First-Month Confidence Promise
- next step to sign up

Call notes:
[PASTE NOTES]
```

---

## Day 66 — Onboarding Form Review

### Goal
Make sure signup/onboarding captures all needed data.

### Tasks
Fields:
- owner info
- business info
- phone
- lead sources
- service area
- plan
- current calendar
- preferred booking times
- SMS tone preferences
- emergency handling
- insurance claim handling
- notes

### Done when
Onboarding form supports system setup.

### Lindy Chat Agent Prompt
```text
Review the RoofLeadHQ onboarding form fields.

Need to collect:
- owner contact
- business name
- business phone
- city/state/service area
- monthly lead volume
- plan
- lead sources
- calendar info
- booking availability
- preferred response tone
- emergency/storm damage handling
- insurance claim handling
- manual outreach needs
- special requests

Return:
1. Required fields
2. Optional fields
3. Fields needed for Supabase
4. Fields needed for Vapi
5. Fields needed for Twilio
6. Fields needed for dashboard/reporting
```

---

## Day 67 — Client Setup Checklist

### Goal
Create go-live checklist.

### Tasks
Checklist:
- payment received
- roofer record created
- Twilio number ready
- Vapi agent ready
- calendar connected
- lead sources connected
- SMS templates configured
- dashboard live
- report recipient set
- test lead complete

### Done when
You can onboard without guessing.

### Lindy Chat Agent Prompt
```text
Create a RoofLeadHQ client setup checklist.

Stages:
1. Signup/payment
2. Client profile
3. Twilio number
4. Vapi phone agent
5. Calendar
6. Lead sources
7. SMS templates
8. Dashboard
9. Reports
10. Test lead
11. Go-live approval

Include:
- task
- owner
- status
- notes
- required before go-live?
```

---

## Day 68 — Pilot Client Technical Setup

### Goal
Set up first real client carefully.

### Tasks
- Create roofer in Supabase.
- Configure Twilio.
- Configure Vapi.
- Configure dashboard.
- Confirm report email.
- Run test lead.

### Done when
Client is ready for go-live.

### Telegram OpenClaw / VPS Terminal Prompt
```text
Prepare technical setup steps for first RoofLeadHQ pilot client.

Do not modify files yet.

Need:
- create roofer record
- configure Twilio number
- configure Vapi agent/webhook
- connect calendar
- configure dashboard access
- configure report recipient
- run test Manual Outreach
- run test Vapi call
- run test digital lead

Return:
1. Checklist
2. Required env vars/config
3. Supabase records needed
4. Test plan
5. Rollback plan
```

---

## Day 69 — Go-Live

### Goal
Launch first client.

### Tasks
- Confirm all integrations.
- Send welcome/go-live message.
- Monitor first leads.
- Check daily.
- Log issues.

### Done when
Client is live and first test/real lead is processed.

### Lindy Builder Prompt
```text
Create a go-live internal monitoring reminder for a RoofLeadHQ client.

For the first 14 days after go-live, remind Jason daily to check:
- new leads
- failed SMS
- Vapi call issues
- follow-ups
- bookings
- leads needing attention
- dashboard accuracy
- report readiness

Internal reminder only.
```

---

## Day 70 — First Client Review

### Goal
Evaluate first 24–48 hours.

### Tasks
- Check lead flow.
- Check errors.
- Check dashboard.
- Ask client for feedback.
- Fix blockers.

### Done when
You know if launch is stable.

### Lindy Chat Agent Prompt
```text
Help me review the first 48 hours of a RoofLeadHQ client launch.

Data:
[PASTE DATA]

Return:
1. What worked
2. What broke
3. What needs immediate fixing
4. What can be manually handled
5. What to tell the client
6. What to improve before the next client
```

---

# Phase 8: Improve, Repeat, and Scale
## Days 71–90

## Day 71 — Client Feedback

### Goal
Collect practical feedback.

### Tasks
Ask:
- Were leads responded to fast enough?
- Was dashboard helpful?
- Were alerts useful?
- Were messages appropriate?
- What confused you?
- What would make this more valuable?

### Done when
You have improvement notes.

---

## Day 72 — Fix Launch Bugs

### Goal
Fix only high-impact issues.

### Tasks
- SMS failures
- dashboard mismatch
- Vapi missing fields
- booking errors
- follow-up timing

### Done when
Client is stable.

---

## Day 73 — Improve Dashboard Recommendations

### Goal
Make dashboard more useful.

### Tasks
- Add better recommendations.
- Use simple rules.
- Avoid AI hallucinations.

### Done when
Recommendations are helpful and safe.

---

## Day 74 — Improve Weekly Report

### Goal
Make report retention-worthy.

### Tasks
- Add concise summary.
- Add top actions.
- Add source performance.
- Add Manual Outreach and Phone sections.

### Done when
Client understands value.

---

## Day 75 — Create Case Study Draft

### Goal
Prepare proof for selling.

### Tasks
Capture:
- response time
- leads followed up
- booked inspections
- missed opportunities recovered
- client quote if possible

### Done when
You have a case study draft.

### Lindy Chat Agent Prompt
```text
Create a RoofLeadHQ case study draft.

Use:
- client type
- problem before RoofLeadHQ
- what was set up
- first 14 days data
- response time improvement
- follow-ups sent
- booked inspections
- client feedback
- next steps

Avoid overclaiming. Keep it honest.
Data:
[PASTE DATA]
```

---

## Day 76 — Sales Message Update

### Goal
Use real data to improve pitch.

### Tasks
Update:
- website claims
- outreach scripts
- demo talking points
- FAQ

### Done when
Sales copy reflects real proof.

---

## Day 77 — Prospect Outreach Round 2

### Goal
Use improved proof.

### Tasks
- 10–15 outreach attempts.
- Mention founder-led launch.
- Offer discovery call.

### Done when
More calls are booked.

---

## Day 78 — Standardize Onboarding

### Goal
Make second client easier.

### Tasks
- Create reusable checklist.
- Create default settings.
- Create template records.
- Create setup email.

### Done when
Second client onboarding is faster.

---

## Day 79 — Create Client Welcome Email

### Goal
Professionalize onboarding.

### Tasks
Write:
- welcome
- what happens next
- what you need from them
- timeline
- support expectations

### Lindy Chat Agent Prompt
```text
Write a RoofLeadHQ client welcome email after signup.

Include:
- thank you
- confirmation of Founder-Led Launch
- what we will set up
- what we need from them
- expected go-live timing
- what they should expect during launch
- how to contact Jason
```

---

## Day 80 — Prepare Second Client Setup

### Goal
Repeat process with less stress.

### Tasks
- Use checklist.
- Create roofer record.
- Configure Twilio/Vapi/dashboard.
- Test.

### Done when
Second client is ready.

---

## Day 81 — Build Prospect Tracker

### Goal
Manage sales pipeline.

### Tasks
- Use Supabase prospects/sales_activities or simple sheet.
- Track outreach attempts.
- Track follow-up dates.

### Done when
You know who to follow up with.

---

## Day 82 — Add Basic Billing Process

### Goal
Make payment repeatable.

### Tasks
- Setup fee payment
- monthly plan payment
- billing start date
- paid status
- reminder process

### Done when
You can collect money without confusion.

---

## Day 83 — Create SOP: Manual Outreach

### Goal
Document for clients.

### Tasks
Explain:
- how to send homeowner number
- what happens next
- what not to send
- how to check dashboard

### Done when
Client can use it easily.

### Lindy Chat Agent Prompt
```text
Create a one-page client SOP for RoofLeadHQ Manual Outreach.

Audience:
Roofing contractor.

Explain:
- when to use it
- how to text the homeowner number
- examples
- what happens next
- what appears in the dashboard
- common mistakes
- who to contact for help
```

---

## Day 84 — Create SOP: Daily Roofer Dashboard Review

### Goal
Teach clients how to use dashboard.

### Tasks
Explain:
- daily review
- leads needing attention
- upcoming inspections
- recommended actions
- manual outreach

### Done when
Client understands dashboard.

---

## Day 85 — Create Internal SOP: Go-Live

### Goal
Make your process repeatable.

### Tasks
Document every go-live step.

### Done when
You can reuse for every client.

---

## Day 86 — Decide Lindy Reduction Plan

### Goal
Start reducing dependency.

### Tasks
List Lindy workflows:
- keep
- move
- kill
- later

### Done when
Lindy is clearly temporary/internal.

### Lindy Chat Agent Prompt
```text
Help me categorize current Lindy workflows for RoofLeadHQ.

Categories:
1. Keep temporarily
2. Move to Supabase/custom workflow
3. Replace with Make/n8n
4. Remove
5. Review later

Criteria:
- customer-facing vs internal
- mission-critical vs nice-to-have
- cost
- reliability
- maintenance burden
- whether Supabase should own the state
```

---

## Day 87 — Cost Review

### Goal
Avoid API burn surprises.

### Tasks
Review:
- Twilio costs
- Vapi minutes
- Resend
- Supabase
- Vercel
- Lindy
- Make/n8n
- AI/coding agents

### Done when
You know per-client cost.

### Lindy Chat Agent Prompt
```text
Create a monthly cost review template for RoofLeadHQ.

Track:
- Twilio SMS
- Twilio phone numbers
- Vapi minutes
- Resend emails
- Supabase
- Vercel
- Lindy
- Make/n8n
- AI/coding agents
- support time

Return:
1. Cost categories
2. Per-client cost estimate fields
3. Warning thresholds
4. Actions if costs spike
```

---

## Day 88 — Client Success Review

### Goal
Make sure clients stay.

### Tasks
Define:
- weekly report
- monthly review
- next actions
- referral ask
- upsell path

### Done when
Retention process is clear.

---

## Day 89 — Referral System

### Goal
Turn clients into leads.

### Tasks
Create:
- referral ask email
- referral reward
- when to ask
- tracking method

### Lindy Chat Agent Prompt
```text
Create a RoofLeadHQ referral ask message.

Audience:
Happy roofing contractor client.

Offer:
Referral credit or cash bonus for any referred roofer who signs up.

Tone:
Appreciative, simple, not pushy.

Create:
1. Email version
2. SMS version
3. Call script version
```

---

## Day 90 — 90-Day Review and Next Plan

### Goal
Decide next stage.

### Tasks
Review:
- clients signed
- revenue
- system stability
- support burden
- costs
- best lead sources
- biggest workflow issues
- what to automate next

### Done when
You have the next 30-day plan.

### Lindy Chat Agent Prompt
```text
Help me run a 90-day RoofLeadHQ review.

Inputs:
- clients signed
- revenue
- churn/cancellations
- outreach attempts
- booked sales calls
- system issues
- support time
- Twilio/Vapi/Supabase costs
- client feedback
- dashboard/report performance

Return:
1. What worked
2. What failed
3. What to stop doing
4. What to keep doing
5. What to automate next
6. What to sell next
7. Next 30-day plan
```

---

# Ongoing Daily Operating Checklist

Use this every workday once the system is live.

## 10-Minute Daily Ops Check

1. Check workflow_errors.
2. Check failed SMS.
3. Check Vapi calls with missing fields.
4. Check leads needing attention.
5. Check booking failures.
6. Check Manual Outreach failures.
7. Check upcoming inspections.
8. Check unresponsive urgent leads.
9. Check dashboard accuracy.
10. Check any client messages.

## 30-Minute Sales Block

1. Add 3–5 prospects.
2. Make 5–10 outreach attempts.
3. Follow up with old prospects.
4. Log outcomes.
5. Book discovery calls.

## 30–90 Minute Build Block

1. Pick one meaningful build batch, not one tiny task.
2. Ask Codex to implement the full gated/test-only batch when safe.
3. Require verifier scripts and docs/checklist updates in the same batch.
4. Run Terminal 1 verification.
5. Review diff/build/test output.
6. Commit/push the full safe batch if verification passes.
7. Do not run production actions without explicit approval.

---

# Final Rule

Do not chase a more advanced system until the simple system produces revenue.

But do not move so slowly that the product never reaches pilot readiness.

The operating rule is:

> Build bigger, verify harder, ship faster.

The first successful version of RoofLeadHQ is:

> New lead comes in → fast response → follow-up sequence → booking support → dashboard update → weekly report.

Everything else is secondary until paying clients are live.


---

# RoofLeadHQ Agent Prompt Library
Version: May 26, 2026
Purpose: Reusable prompts for Lindy Builder Agent, Lindy Chat Agent, Codex / Terminal Build Agent, and Telegram OpenClaw Chat Agent.

---

# 1. Master Context Prompt for All Agents

```text
You are helping build RoofLeadHQ.

RoofLeadHQ is a done-for-you missed lead recovery and appointment booking system for roofing contractors.

Current business direction:
- Founder-Led Launch Program
- First-Month Confidence Promise
- No hard “old quota-based appointment promise” guarantee
- Founder-led during launch
- System-led after setup

Core tech direction:
- Supabase is the source of truth
- Vercel/custom code owns branded dashboard and customer-facing experience
- Twilio owns SMS sending/receiving and Manual Outreach triggers
- Vapi owns phone lead handling and call summaries
- Resend owns reports and transactional emails
- Google Calendar owns appointment booking
- Lindy is temporary internal/back-office support only
- Codex should handle larger code-heavy build batches when the risk is manageable
- Terminal 1 is the source of truth for verification, git state, commits, pushes, builds, and production checks
- VPS OpenClaw should not be used unless explicitly requested
- Build bigger, verify harder, ship faster

Build rhythm:
- Prefer larger safe build batches over tiny unnecessary steps.
- Include implementation, verifier scripts, docs/checklist updates, and safety checks when practical.
- Do not commit/push until Terminal 1 verifies.
- Do not run live SMS/Twilio/cron/production actions without explicit approval.

Do not overbuild. The launch goal is:
New lead comes in → fast response → follow-up sequence → booking support → dashboard update → weekly report.

Always prioritize:
1. Reliability
2. Clear data in Supabase
3. Professional homeowner/roofer experience
4. Low cost
5. Easy maintenance for a non-coder founder
```

---

# 2. Codex / Terminal Build Safety Prompt

```text
We are building RoofLeadHQ faster using larger, safer build batches.

Correct repo:
- /root/roofleadhq

Wrong repo:
- /root/.openclaw/workspace

Build rhythm:
- Do not split safe related work into tiny unnecessary steps.
- Prefer one larger build batch that includes implementation, verifier scripts, docs/checklist updates, and safety checks.
- Do not commit or push.
- Terminal 1 will verify before commit/push.

Safety rules:
1. Do not enable live SMS.
2. Do not call/import Twilio unless explicitly approved.
3. Do not write production messages or update follow_ups unless explicitly approved.
4. Do not add cron, routes, schedulers, or production flags unless explicitly approved.
5. Do not trigger Vapi, Calendar, Resend, Lindy, or other production automations unless explicitly approved.
6. Do not expose or print secrets.
7. Use Supabase as the source of truth.
8. Keep customer-facing SMS and booking language controlled by RoofLeadHQ, not Lindy.
9. Keep changes reviewable.
10. Return files changed, full diff, verification results, and remaining risks.

Task:
[INSERT TASK]
```

---

# 3. Lindy Builder Guardrail Prompt

```text
You are helping with RoofLeadHQ internal/back-office workflows.

Important:
Lindy should not own the main customer-facing homeowner SMS experience, core database, lead status source of truth, dashboard data, or long-term booking logic.

Lindy may help with:
- internal alerts
- daily summaries
- booking failed alerts
- unclassified lead alerts
- manual review reminders
- temporary workflow monitoring

Every important action should be logged to Supabase or triggered by Supabase whenever possible.

Task:
[INSERT TASK]
```

---

# 4. Lindy Chat Agent Strategy Prompt

```text
Help me think through this RoofLeadHQ decision from a practical business and workflow perspective.

Assume:
- I am not a coder
- I have a full-time job
- I need to launch soon
- I need to avoid overbuilding
- Supabase is the source of truth
- Lindy is temporary internal support
- Customer-facing SMS should be controlled outside Lindy
- The offer is Founder-Led Launch Program, not a hard 5-appointments guarantee

Question/task:
[INSERT QUESTION]
```

---

# 5. Telegram OpenClaw Quick Check Prompt

```text
Give me a quick checklist for this RoofLeadHQ task.

Context:
- Supabase is source of truth
- Do not overbuild
- Keep changes narrow
- Protect the live deployment
- Avoid broad autonomous code changes

Task:
[INSERT TASK]

Return:
1. Checklist
2. Risks
3. What to test
4. What not to touch
```

---

# 6. Website Update Prompt

```text
Update roofleadhq.com messaging to match the new offer.

Remove:
- old quota-based appointment promise
- free old pilot wording
- hard appointment guarantee
- overpromising “book inspections” language

Use:
- Founder-Led Launch Program
- First-Month Confidence Promise
- Stop Missing Roofing Leads. Book More Inspections.
- Founder-led during launch. System-led after setup.
- Book a Founder-Led Setup Call

Do not redesign the entire site.
Only update copy and related sections unless layout changes are necessary.
```

---

# 7. Supabase Schema Prompt

```text
Design the Supabase schema for RoofLeadHQ.

Do not execute SQL.
Do not modify files.
Return plan and SQL draft for review only.

Tables:
- roofers
- roofer_onboarding
- leads
- messages
- calls
- bookings
- follow_ups
- workflow_events
- reports
- prospects
- sales_activities

Requirements:
- Multi-tenant by roofer_id
- RLS policies
- dashboard indexes
- source_path/source_detail
- clean lead statuses
- created_at/updated_at
- realtime recommendations
- Supabase is source of truth
- workflow_events audit trail

Return:
1. Table plan
2. Relationships
3. Indexes
4. RLS approach
5. SQL draft
6. Risks/questions
```

---

# 8. Manual Outreach Build Prompt

```text
Build/plan the Manual Outreach workflow.

Flow:
1. Roofer texts homeowner number to RoofLeadHQ-connected number.
2. Twilio inbound SMS webhook receives it.
3. System identifies roofer by receiving Twilio number.
4. System extracts/normalizes homeowner phone number.
5. Create Supabase lead:
   source_path = manual
   source_detail = unknown or provided source
6. Send first homeowner SMS.
7. Create messages, follow_ups, and workflow_events.
8. Alert Jason on errors.

Rules:
- Do not use Lindy for customer-facing SMS.
- Supabase first.
- Log every action.
- Do not modify unrelated files.
```

---

# 9. Vapi Webhook Prompt

```text
Build/plan the Vapi post-call webhook.

Flow:
1. Vapi call completes.
2. Webhook sends payload to RoofLeadHQ.
3. Identify roofer.
4. Match/create lead by phone.
5. Create calls record.
6. Store transcript, summary, outcome, duration, provider_call_id, raw_payload.
7. If booked, create booking record.
8. If not booked, create follow_ups.
9. Create workflow_events.
10. Alert Jason if required fields are missing.

Do not position Vapi as the whole product. RoofLeadHQ is the operating layer.
```

---

# 10. Follow-Up Dispatcher Prompt

```text
Design/build the RoofLeadHQ follow-up dispatcher.

Requirements:
- Read scheduled follow_ups from Supabase.
- Send due SMS through Twilio.
- Respect no-contact window: 9 PM–8 AM local time.
- Skip if lead is booked, lost, cancelled, opted out, or already responded.
- Log outbound message.
- Update follow_up status.
- Create workflow_event.
- Alert Jason on failures.

Start with MVP. Do not overbuild.
```

---

# 11. Dashboard Prompt

```text
Update the RoofLeadHQ dashboard to use Supabase data.

Keep the existing design unless necessary.

Sections:
- New Leads
- Booked Inspections
- Booking Rate
- Average Response Time
- Leads Needing Attention
- Follow-Ups Sent
- Phone Leads
- Manual Outreach Leads
- Upcoming Booked Inspections
- Top Lead Sources
- Follow-Up Performance
- Recommended Actions

Use Supabase as the data source.
Do not show demo data where live data should appear.
```

---

# 12. Weekly Report Prompt

```text
Create/build the RoofLeadHQ weekly report.

Audience:
Roofing contractor.

Data source:
Supabase.

Sections:
1. Weekly summary
2. New leads
3. Booked inspections
4. Booking rate
5. Average response time
6. Follow-up performance
7. Top lead sources
8. Manual Outreach activity
9. Phone/Vapi activity
10. Leads needing attention
11. Recommended actions

Tone:
Plain-English, helpful, contractor-focused.

Send with Resend and log report_sent event.
```

---

# 13. Sales Script Prompt

```text
Create a sales script for RoofLeadHQ.

Offer:
Founder-Led Launch Program.

Core pain:
Roofers are losing jobs because leads are not answered or followed up fast enough.

Core message:
You do not always need more leads. You need to stop losing the ones you already paid for.

Promise:
Fast response, automatic follow-up, appointment booking support, dashboard, weekly report, founder-led launch.

Confidence promise:
If RoofLeadHQ does not make lead response faster, cleaner, and easier to manage in the first month after go-live, we credit next month or waive the first monthly payment.

Return:
1. Cold call opener
2. Discovery questions
3. Short pitch
4. Objection handling
5. Close
6. Follow-up email
```

---

# 14. Daily Review Prompt

```text
Help me run today’s RoofLeadHQ daily review.

Inputs:
- workflow errors:
- failed SMS:
- Vapi issues:
- leads needing attention:
- bookings:
- manual outreach activity:
- sales outreach:
- bugs/blockers:

Return:
1. What needs attention today
2. What can wait
3. What to ask an agent to do
4. What I should personally handle
5. One priority for tomorrow
```

## Vapi Normalized Dry-Run Contract Milestone

Commit:
- `63a1a25 test(vapi): document and verify normalized dry-run contract`

This milestone added `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md` and strengthened `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`.

The dry-run verifier now confirms all six fake/sanitized Vapi scenarios emit the required normalized internal object fields:
- `source`
- `call_id`
- `from`
- `to`
- `started_at`
- `ended_at`
- `homeowner_name`
- `email`
- `property_address`
- `roof_issue`
- `urgency`
- `insurance_claim`
- `outcome`
- `appointment_suggested`
- `summary`
- `has_transcript`
- `test_only`
- `ingested_at`

Nullable rules now documented:
- `from` may be null only for `missing-phone`.
- `property_address` may be null only for `missing-address`.
- `appointment_suggested` may be null for unbooked or missing-field scenarios.

Verification passed before commit `63a1a25`:
- `node backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`
- `node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `npm --prefix backend run build`

Safety remained unchanged:
- No live Vapi calls.
- No Supabase writes.
- No SMS/Twilio sends.
- No Calendar/Resend/Lindy activation.
- No routes.
- No cron/scheduler/dispatcher activation.
- Retell remains deprecated/disabled.

## Vapi Scenario-Specific Dry-Run Contract Enforcement Milestone

Commit:
- `9ddb8ec test(vapi): enforce scenario-specific dry-run contract`

Files changed:
- `backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`
- `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

What changed:
- Strengthened the Vapi dry-run verifier beyond field presence.
- The verifier now enforces scenario-specific normalized contract rules across all six fake/sanitized Vapi scenarios.

Scenario-specific checks now include:
- `source` must be `vapi`.
- `test_only` must be `true`.
- `has_transcript` must be boolean.
- `ingested_at` must parse as a valid date.
- `call_id` must be fake/test-safe.
- `from` may be null only for `missing-phone`.
- `property_address` may be null only for `missing-address`.
- `appointment_suggested` may be null only for `unbooked-followup`, `missing-address`, or `missing-phone`.
- `booked-inspection` must include a suggested appointment.
- `emergency-leak` must preserve emergency/high-urgency and leak semantics.
- `insurance-storm` must preserve insurance and storm/hail semantics.

Verification passed before commit `9ddb8ec`:
- `node backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js`
- `node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js`
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `npm --prefix backend run build`

Safety preserved:
- No live Vapi calls.
- No Supabase writes.
- No SMS/Twilio sends.
- No Calendar/Resend/Lindy activation.
- No routes.
- No cron/scheduler/dispatcher activation.
- Retell remains deprecated/disabled.

## Vapi normalized contract doc verification milestone

Added a read-only verifier for `docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md` so the documented Vapi normalized dry-run contract stays aligned with the implementation verifier.

This verifier guards:
- required normalized fields
- scenario-specific fake/sanitized payload coverage
- nullable rules for `missing-phone`, `missing-address`, and `appointment_suggested`
- emergency leak and insurance storm semantics
- safety posture preserving no live Vapi calls, Supabase writes, SMS/Twilio sends, Calendar/Resend/Lindy activation, routes, cron, scheduler, or dispatcher activation

## Vapi scenario sample files verification milestone

Added a read-only verifier for the six fake/sanitized Vapi scenario sample JSON files in `docs/samples`.

This verifier guards:
- booked inspection sample coverage
- unbooked follow-up sample coverage
- missing address sample coverage
- missing phone sample coverage
- emergency leak sample coverage
- insurance storm sample coverage
- fake/test/sanitized markers
- JSON parseability
- absence of production-looking secrets or live identifiers
- dry-run ingestion script scenario references

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Vapi dry-run output snapshot verification milestone

Added a read-only verifier that executes all six fake/sanitized Vapi dry-run scenarios and validates normalized output snapshots.

This verifier guards:
- normalized output field coverage
- fake/test-safe `call_id`
- `source = vapi`
- `test_only = true`
- valid `ingested_at`
- boolean `has_transcript`
- nullable rules for `missing-phone`, `missing-address`, and `appointment_suggested`
- booked inspection semantics
- unbooked follow-up semantics
- emergency leak semantics
- insurance storm semantics
- dry-run failure when required gates are missing
- equivalent normalized outputs for `--scenario=value` and `--scenario value`

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Vapi dry-run CLI contract verification milestone

Added a read-only verifier for the Vapi dry-run scenario CLI contract and updated the dry-run script to support both `--scenario=value` and `--scenario value`.

This verifier guards:
- all six fake/sanitized scenarios with both CLI forms
- scenario-specific sample loading without default fallback
- equal call ids between both CLI forms
- invalid scenario failure
- missing gate failure
- `source = vapi`
- `test_only = true`

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Vapi scenario registry consistency verification milestone

Added a read-only verifier that keeps the six Vapi fake/sanitized scenario names and sample files aligned across scripts, verifiers, docs, and next-chat context.

This verifier guards:
- exact six-file `docs/samples/vapi-scenario-*.fake.json` registry
- JSON parseability and fake/sanitized markers
- dry-run `scenarioMap` exact mappings
- complete scenario coverage in the dry-run verifier
- complete scenario coverage in the scenario samples verifier
- complete scenario coverage in the output snapshot verifier
- complete scenario coverage in the CLI contract verifier
- complete scenario coverage in the normalized contract doc, verifier index, business guide, and next-chat context

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Vapi aggregate verifier coverage milestone

Added a read-only verifier that makes aggregate first paid pilot readiness the enforced source for all Vapi verifier coverage.

This verifier guards:
- every expected `backend/scripts/verify-vapi-*-readonly.js` script exists
- every expected Vapi verifier is wired into aggregate readiness
- the expected Vapi verifier registry exactly matches actual `verify-vapi-*-readonly.js` files
- the verifier index documents every expected Vapi verifier
- next-chat context documents every expected Vapi verifier
- aggregate readiness includes expected Vapi command names
- safety markers remain documented

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation


## Vapi guard layer coverage milestone

Added a read-only guard-layer verifier that protects the Vapi guard verifiers themselves from wiring or documentation drift.

This verifier guards:
- aggregate coverage verifier wiring
- scenario registry verifier wiring
- dry-run output snapshot verifier wiring
- dry-run CLI contract verifier wiring
- next-chat context guard-layer markers
- next-chat verifier guard-layer requirements
- read-only safety markers across guard-layer scripts
- downstream Vapi verifier protection inside aggregate coverage

Safety preserved:
- no live Vapi calls
- no Supabase writes
- no SMS/Twilio sends
- no Calendar/Resend/Lindy activation
- no routes
- no cron/scheduler/dispatcher activation

## Critical file format integrity guard

Use `backend/scripts/verify-critical-file-format-integrity-readonly.js` before safe commit/push workflows when verifier or launch documentation files are edited.

The guard checks critical scripts and docs for literal backslash-n patch artifacts, collapsed low-line-count files, missing Node shebangs on JS verifier scripts, and missing protected files. It is read-only and keeps the launch posture at demo-ready with live automation disabled.

## Next-chat latest milestones context guard

Use `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js` to confirm the next-chat context package records the latest safe source-of-truth milestones before a handoff.

The verifier checks that the context package records `6048d21`, `9147664`, the critical file format integrity guard, and the live-automation-disabled safety posture.

## Latest milestones verifier integrity coverage

After commit `61c09b5`, the critical file format integrity guard should also protect `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`.

This keeps the newest context handoff verifier covered against malformed patch artifacts, collapsed files, missing Node shebangs, and suspiciously low line counts.

## Handoff integrity aggregate

Use `backend/scripts/verify-handoff-integrity-readonly.js` before handoff or context-package work.

It runs the critical file format integrity verifier, next-chat context package verifier, and latest milestones verifier together so the handoff package stays protected against format corruption, stale milestone context, and safety posture drift.

## Handoff integrity context guard

Use `backend/scripts/verify-handoff-integrity-context-readonly.js` to confirm the next-chat context package records the handoff integrity aggregate and preserves the live-automation-disabled safety posture.

The guard also blocks forbidden legacy/guarantee language.

## Handoff aggregate context coverage

After commit `133e5c0`, the handoff integrity aggregate should include `backend/scripts/verify-handoff-integrity-context-readonly.js`.

This keeps handoff verification bundled across file-format integrity, context package completeness, latest milestone context, and handoff context safety.

## Latest handoff aggregate milestone coverage

After commit `93bed54`, the latest milestones verifier should require the next-chat context package to record that the handoff aggregate includes the handoff context guard.

This keeps handoff context current before safe commit/push workflows.

## Source-of-truth commit chain guard

Use `backend/scripts/verify-source-of-truth-commit-chain-readonly.js` to confirm Terminal 1 source-of-truth history and next-chat context stay aligned.

The verifier checks the latest protected commit chain and confirms the context package preserves demo-ready with live automation disabled.

## Handoff aggregate source-of-truth coverage

After commit `8480581`, the handoff integrity aggregate should include `backend/scripts/verify-source-of-truth-commit-chain-readonly.js`.

This keeps handoff verification bundled across file-format integrity, context package completeness, latest milestones, handoff context safety, and Terminal 1 source-of-truth commit-chain alignment.

## Source-of-truth chain window alignment

After commit `2fc84a2`, the source-of-truth commit chain verifier matches the current top-8 Terminal 1 history window.

This prevents stale commit expectations after older commits age out of `git log --oneline -8`.

## Source-of-truth verifier process alignment

The source-of-truth commit chain verifier now checks Terminal 1 process alignment instead of hardcoding every commit in the top-8 window.

This avoids false failures when older commits naturally age out after new safe commits.

## Source-of-truth verifier process alignment

The source-of-truth commit chain verifier now checks Terminal 1 process alignment instead of hardcoding every commit in the top-8 window.

This avoids false failures when older commits naturally age out after new safe commits.

## Stabilized source-of-truth verifier milestone

After commit `befef91`, the source-of-truth verifier checks Terminal 1 process alignment, `HEAD`/`origin/main` alignment, context rules, and safety posture instead of hardcoding every top-8 commit.

This prevents false failures as new safe commits push older commits out of `git log --oneline -8`.

## Handoff context stabilized verifier coverage

After commit `3789630`, the handoff integrity context guard should require the stabilized source verifier milestone and process-alignment language.

This prevents handoff context drift back toward brittle hardcoded commit-window checks.

## Latest milestones stabilized context coverage

After commit `c1acc89`, the latest milestones verifier should require the handoff context milestone for the stabilized source verifier.

This keeps the context package aligned with the newest safe source-of-truth verifier design.

## Launch safety meta verifier

Use `backend/scripts/verify-launch-safety-meta-readonly.js` before safe handoff or context-package work.

It runs the critical file format, source-of-truth, handoff integrity, handoff context, latest milestones, and next-chat context package verifiers together while preserving demo-ready with live automation disabled.

## Launch safety meta verifier milestone

After commit `693aa0d`, the latest milestones and handoff context guards should require the launch safety meta verifier.

This keeps source-of-truth, handoff, context, and critical-file safety checks bundled before safe commit/push workflows.

## Source-of-truth process launch safety coverage

After commit `3ceb537`, the source-of-truth process verifier should require the launch safety meta verifier context.

This keeps Terminal 1 source-of-truth alignment tied to the newest top-level launch safety guard.

## Latest milestones launch safety source coverage

After commit `574a822`, the latest milestones verifier should require the source verifier’s launch safety meta context requirement.

This keeps the handoff chain aligned with the top-level launch safety meta verifier.

## Latest milestone self-check verifier

Use `backend/scripts/verify-latest-milestone-self-check-readonly.js` to confirm recent source-of-truth milestones are present in both verifier code and handoff documentation.

This prevents accidental doc-only drift when a verifier script update was expected.

## Latest milestone self-check committed

After commit `3c03c72`, the latest milestones verifier and self-check guard should require the latest milestone self-check milestone.

This protects the guard that prevents doc-only drift.

## Handoff context latest milestone self-check coverage

After commit `b31b00c`, the handoff integrity context guard should require the latest milestone self-check verifier and milestone commits.

This keeps handoff context aligned with the guard that prevents doc-only drift.

## Latest milestones self-check context coverage

After commit `17a300f`, the latest milestones verifier and self-check guard should require the latest milestone self-check context milestone.

This protects the handoff context guard for doc-only drift prevention.

## Operating Workflow Guard Reference

The safe build workflow is protected by:

- `backend/scripts/verify-next-safe-build-operating-workflow-readonly.js`

This verifier ensures the daily build process keeps the current rules visible:

- Work only in Terminal 1 at `/root/roofleadhq`.
- Do not use `/root/.openclaw/workspace`.
- Do not trust OpenClaw summaries alone.
- Safe verified doc/test/read-only verifier changes may be committed and pushed without repeated approval.
- Explicit approval remains required for live SMS/Twilio, production Supabase writes, Vapi production webhook ingestion, Calendar booking activation, Resend/Lindy production activation, public routes, cron/schedulers/dispatchers, secrets exposure, destructive operations, or anything outside the named safe scope.
- The required workflow remains: fetch/status/log, targeted greps/assertions, syntax checks, relevant read-only verifiers, aggregate readiness, backend build, actual diff review, staged diff review, commit, push, final fetch/status/log confirmation.

Safety remains demo-ready with live automation disabled.

## Operating Workflow Guard Cross-Reference Check

The operating workflow guard is also protected by:

- `backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js`

This read-only verifier confirms the operating workflow guard remains referenced in:

- next-chat context
- first paid launch verifier index
- business buildout daily guide
- launch safety meta verifier

This prevents the guard from silently drifting out of the daily operating surfaces while keeping live automation disabled.

## Operating Workflow Guard Suite

Use this read-only suite when checking that the operating workflow guard layer is intact:

- `backend/scripts/verify-operating-workflow-guard-suite-readonly.js`

The suite runs:

- `backend/scripts/verify-next-safe-build-operating-workflow-readonly.js`
- `backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js`
- `backend/scripts/verify-next-chat-context-latest-milestones-readonly.js`
- `backend/scripts/verify-latest-milestone-self-check-readonly.js`
- `backend/scripts/verify-launch-safety-meta-readonly.js`

This keeps the Terminal 1 source-of-truth workflow, cross-reference protection, milestone protection, and launch safety meta guard easy to verify without enabling live automation.

## Next-Chat Recorded Source-of-Truth Baseline Check

Use this read-only verifier after safe commits are pushed and the milestone is recorded:

- `backend/scripts/verify-next-chat-context-recorded-source-of-truth-readonly.js`

It confirms the latest required milestone recorded by the latest milestone self-check is also recorded in the next-chat context package so future chats do not start from stale guarded source-of-truth context.

This is a drift guard only. It does not enable live automation.

## Next-Chat Safe Build Snapshot

Use this copy/paste-ready handoff for the next safe build session:

- `docs/NEXT_CHAT_CONTEXT_PACKAGE_SAFE_BUILD_SNAPSHOT.md`

Protect it with:

- `backend/scripts/verify-next-chat-context-safe-build-snapshot-readonly.js`

This keeps the latest source-of-truth commit chain, guard stack, workflow rules, approval gates, business context, and safety posture available for the next chat.

## First Paid Launch Operator Day-One Checklist

The day-one checklist protects the first paid launch workflow before any live automation is enabled.

Use it to confirm:

- Terminal 1 source-of-truth verification.
- Demo-mode safety.
- First paid customer readiness.
- Roofer business information.
- Lead source intake.
- Calendar and booking preferences.
- Emergency/urgent lead policy.
- Follow-up cadence.
- Reporting expectations.
- Operator manual handoff.
- Explicit approval gates before live activation.

Safety remains demo-ready with live automation disabled.

## First Paid Launch Customer Intake Packet

The customer intake packet gives the operator a single onboarding package for the first paid roofing contractor.

It confirms:

- Business identity.
- Offer and language rules.
- Lead sources.
- Lead qualification fields.
- Emergency and urgent lead policy.
- Booking preferences.
- Follow-up preferences.
- Reporting preferences.
- Manual operator handoff.
- Explicit approval gates before live activation.

Safety remains demo-ready with live automation disabled.

## First Paid Launch Appointment Booking Preferences Packet

The booking preferences packet turns customer intake into appointment handling rules without enabling Calendar automation.

It confirms:

- Appointment language rules.
- Appointment types.
- Availability rules.
- Service area rules.
- Assignment rules.
- Buffer and capacity rules.
- Emergency booking rules.
- Confirmation and reminder rules.
- Calendar readiness without activation.
- Manual booking handoff.
- Explicit approval gates.

Safety remains demo-ready with live automation disabled.

## First Paid Launch Follow-Up Cadence Packet

The follow-up cadence packet turns customer intake and booking preferences into day-one homeowner follow-up rules without enabling SMS/Twilio automation.

It confirms:

- Follow-up language rules.
- Lead status definitions.
- Initial response rules.
- Missed-call recovery rules.
- Standard follow-up cadence.
- Appointment reminder rules.
- Emergency follow-up rules.
- Opt-out and do-not-contact rules.
- Channel rules.
- Reporting tie-in.
- Manual operator handoff.
- Explicit approval gates.

Safety remains demo-ready with live automation disabled.

## First Paid Launch Reporting Preferences Packet

The reporting preferences packet turns customer intake, booking preferences, and follow-up cadence into weekly and monthly reporting rules without enabling Resend or Lindy automation.

It confirms:

- Reporting language rules.
- Report recipients.
- Weekly report preferences.
- Monthly report preferences.
- KPI definitions.
- Lead source reporting.
- Appointment reporting.
- Follow-up reporting.
- Weather, trends, and recommended actions.
- Manual report assembly.
- Report delivery readiness.
- Explicit approval gates.

Safety remains demo-ready with live automation disabled.

## First Paid Launch Emergency Escalation Packet

The emergency escalation packet connects customer intake, booking preferences, follow-up cadence, and reporting preferences with operator stop conditions and founder-led manual review for active leaks, interior water intrusion, storm damage, tarp requests, unsafe roof access, elderly/vulnerable homeowners, after-hours emergencies, insurance claim deadlines, repeat urgent callers, and angry/escalated homeowners.

It confirms:

- Emergency escalation triggers
- Operator stop conditions
- Minimum emergency intake fields
- Manual escalation owner (founder)
- Contractor notification rules (manual only)
- Emergency follow-up tie-in (bypasses normal cadence)
- Reporting tie-in (flagged in weekly/monthly reporting)
- Founder-led launch rules
- Explicit approval gates
- Business language: book inspections, book appointments, founder-led launch, first-paid launch, emergency escalation, manual review, roofing contractors, weekly/monthly reporting, recommended actions

Safety remains demo-ready with live automation disabled.

## First Paid Launch Contractor Notification Packet

The contractor notification packet turns homeowner intake, booking preferences, follow-up cadence, reporting preferences, and emergency escalation details into a clean manual notification summary for roofing contractors.

It confirms:

- Contractor notification summary format
- Minimum contractor notification fields
- Manual notification rules (founder review only)
- Emergency tie-in
- Reporting tie-in (weekly/monthly reporting)
- Founder-led launch rules
- Explicit approval gates
- Business language: book inspection, book appointment, founder-led launch, first-paid launch, manual review, roofing contractors, weekly/monthly reporting, recommended actions

Safety remains demo-ready with live automation disabled.

## First Paid Launch Appointment Outcome Packet

The appointment outcome packet records what happened after an inspection or appointment is booked during founder-led first-paid launch.

It confirms:

- Appointment outcome categories (appointment completed, homeowner no-show, contractor no-show, rescheduled, canceled, inspection completed, estimate requested, estimate sent, job won, job lost, outcome unknown, follow-up needed, manual review required)
- Required outcome fields
- Manual review rules
- Follow-up rules
- Contractor notification tie-in
- Emergency escalation tie-in
- Weekly/monthly reporting tie-in (weekly leads report, monthly leads report)
- Recommended actions: book inspections, book appointments, manual review
- Business language: founder-led launch, first-paid launch, appointment outcome, inspection outcome

Safety remains demo-ready with live automation disabled.

## First Paid Launch Lead Source Quality Packet

The lead source quality packet classifies every lead by source, records source detail and source confidence, and maps quality categories to recommended actions during founder-led first-paid launch.

It confirms:

- Lead source categories (website leads, Google Business Profile / GBP leads, Angi leads, Thumbtack leads, Facebook leads, referral leads, manual entry leads, Vapi / phone leads, missed-call recovery leads, repeat caller leads, unknown source leads)
- Source detail rules
- Source confidence rules
- Lead quality categories (high-intent leads, medium-intent leads, low-intent leads, spam / bad-fit leads, duplicate leads, emergency source patterns)
- Manual review rules
- Contractor notification tie-in
- Appointment outcome tie-in
- Weekly/monthly reporting tie-in (weekly leads report, monthly leads report)
- Recommended actions: book inspections, book appointments, manual review
- Business language: founder-led launch, first-paid launch, lead source quality, source detail, source confidence

Safety remains demo-ready with live automation disabled.

## First Paid Launch Manual Review Queue Packet

The manual review queue packet connects emergency escalation, contractor notification, appointment outcomes, lead source quality, missing information recovery, Lindy internal lead review summary, follow-up cadence, and reporting into a single founder/operator manual review queue during founder-led first-paid launch.

It confirms:

- Manual review queue (internal only)
- Founder/operator review
- Emergency escalation review
- Contractor notification review
- Appointment outcome review
- Lead source quality review
- Missing information recovery review
- Lindy internal lead review summary tie-in
- Follow-up cadence review
- Reporting review (weekly leads report, monthly leads report)
- Incomplete lead review, high-intent lead review, emergency lead review, duplicate lead review, spam / bad-fit lead review, source confidence review
- Recommended actions: book inspections, book appointments, manual review
- Business language: first-paid launch, founder-led launch, manual review queue, founder/operator review, internal queue, review readiness
- Explicit: no live automation, no scheduler, no dispatcher, no cron, no public route

Safety remains demo-ready with live automation disabled.

## First Paid Launch Schema Blockers Packet

The schema blockers packet documents the opted_out and stopped_reason gaps in the leads table that block safe opt-out handling, stopped-lead handling, reporting, and manual review queue operations during founder-led first-paid launch.

It confirms:

- Current blocker (missing opted_out and stopped_reason)
- Why opted_out and stopped_reason are needed
- Expected field names (opted_out, stopped_reason) and types (boolean-like default false, nullable text)
- Suggested default values
- Safe migration notes (no mutation of existing rows, no lookup table yet)
- Read-only verification expectations
- Explicit approval gates
- What not to touch (leads.status enum, follow_ups table, existing data)
- Future operations support (opt-out handling, stopped-lead classification, improved reporting)
- Open questions (staging environment, controlled vocabulary later)
- Business language: first-paid launch, founder-led launch, book inspections, book appointments
- Full safety language preserved

Safety remains demo-ready with live automation disabled.

## First Paid Launch Stopped Lead Handling Packet

The stopped lead handling packet defines how RoofLeadHQ safely handles stopped leads during founder-led first-paid launch.

It confirms:

- Stopped lead definition (opted_out = true or non-null stopped_reason)
- opted_out tie-in (do-not-contact handling)
- stopped_reason tie-in (stopped follow-up handling)
- Manual review queue tie-in
- Follow-up cadence tie-in
- Missing information recovery tie-in
- Contractor notification readiness tie-in
- Reporting tie-in (weekly leads report, monthly leads report)
- Founder/operator review requirements
- Recommended actions: book inspections, book appointments, manual review
- Business language: stopped lead handling, opted_out, stopped_reason, do-not-contact, stopped follow-up, manual review queue, missing information recovery, reporting, safe manual review
- Explicit: no live automation, no Supabase mutation, no production writes

Safety remains demo-ready with live automation disabled.

## First Paid Launch Voice Path Cleanup Packet

- Packet: `docs/FIRST_PAID_LAUNCH_VOICE_PATH_CLEANUP_PACKET.md`
- Verifier: `backend/scripts/verify-first-paid-launch-voice-path-cleanup-packet-readonly.js`
- Purpose: document the first-paid launch voice path cleanup posture.
- Retell is deprecated/disabled.
- Vapi is the current phone/voice path.
- Vapi dry-run/read-only only.
- Guardrails include no Vapi production webhook ingestion, no live Vapi webhook route, no Vapi calls from code, no Retell route activation, no webhook activation, and no production ingestion.
- Safety remains demo-ready with live automation disabled.

## First Paid Launch Automation Foundation Packet

- Packet: `docs/FIRST_PAID_LAUNCH_AUTOMATION_FOUNDATION_PACKET.md`
- Verifier: `backend/scripts/verify-first-paid-launch-automation-foundation-packet-readonly.js`
- Scripts: `scripts/verify-source-of-truth.sh`, `scripts/verify-safe-readiness.sh`, `scripts/show-diff-proof.sh`, `scripts/record-milestone.sh`
- Purpose: shift RoofLeadHQ from agent improvisation to repeatable repo-controlled Terminal scripts.
- Terminal 1 in `/root/roofleadhq` remains the source of truth.
- Agent-reported commits, pushes, and completion claims are not trusted until Terminal 1 verifies them.
- Future direction includes roofer onboarding scripts, per-roofer readiness checks, production gate checks, and safe larger build flows.
- No production Calendar/SMS activation without explicit flag changes and Terminal 1 verification.
- Safety remains demo-ready with live automation disabled.

## First Paid Launch Roofer Onboarding Script Packet

- Packet: `docs/FIRST_PAID_LAUNCH_ROOFER_ONBOARDING_SCRIPT_PACKET.md`
- Verifier: `backend/scripts/verify-first-paid-launch-roofer-onboarding-script-packet-readonly.js`
- Scripts: `scripts/onboard-roofer.sh`, `scripts/verify-roofer-dry-run-onboarding-workspace.sh`
- Purpose: create a repeatable, repo-controlled roofer onboarding skeleton.
- Production flags remain disabled by default.
- No production SMS, Calendar booking, Vapi, Supabase write, contractor notification, homeowner notification, cron, scheduler, dispatcher, or public route activation.
- Future onboarding can support book inspections and book appointments after explicit activation gates are satisfied.
- Safety remains demo-ready with live automation disabled.

## Production Gate Check Script Packet

The founder-led launch now includes a repo-controlled production gate check script packet.

Use `scripts/check-production-gates.sh` before larger safe onboarding or launch-readiness builds to confirm disabled production gates remain disabled.

This protects the founder-led launch from hidden activation of live SMS, Calendar booking, Vapi production webhook ingestion, Supabase writes, contractor notifications, homeowner notifications, cron, scheduler, dispatcher, public routes, or Retell route activation.

The Step 66 production send intent bridge remains present and guarded, but it does not authorize live SMS sends.

## Roofer Dry-Run Intake Packet

Before creating a roofer dry-run onboarding workspace, collect the planning-only intake fields from `docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_INTAKE_PACKET.md`.

This keeps the founder-led launch repeatable while preserving production safety.

The intake packet supports service area, owner/operator contact, emergency leak handling, storm damage and insurance preferences, appointment booking preferences, lead source channels, manual review preferences, and reporting preferences.

No production systems are activated by this packet.

## Roofer Dry-Run Workspace Template Packet

Use the roofer dry-run workspace templates to standardize planning-only onboarding workspaces before any production activation.

Templates live in `templates/roofer-dry-run-workspace/` and include intake fields, disabled safety flags, and workspace safety notes.

No production systems are activated by this packet.
