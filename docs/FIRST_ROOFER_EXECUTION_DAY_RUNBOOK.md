# First Roofer Execution Day Runbook

## Purpose

This runbook guides the first roofer execution day as a dry-run/internal-only/founder-operator-only operating procedure.

The goal is to move from setup planning into a practical day-of workflow: review the first lead, confirm missing information, make a manual founder/operator decision, prepare manual communication, track whether an inspection or appointment should be booked, capture the outcome, and log next actions.

This runbook does not activate production, create production records, mutate Supabase, send SMS, send emails, place calls, notify contractors, notify homeowners, enable Calendar booking, enable Vapi production ingestion, enable Lindy external sends, enable cron/scheduler/dispatcher flows, enable public routes, expose secrets, or run destructive actions.

## Safety Posture

- dry-run/internal-only/founder-operator-only
- no live SMS/Twilio
- no live Vapi calls
- no Calendar activation
- no Resend production sends
- no Lindy external sends
- no cron/scheduler/dispatcher activation
- no public route activation
- no production Supabase writes
- no external notifications
- no production credentials exposed to agents

Required dry-run flags:

- WORKSPACE_MODE=dry-run
- SMS_ACTIVATION=false
- CALENDAR_ACTIVATION=false
- VAPI_ACTIVATION=false
- SUPABASE_WRITES=false
- CONTRACTOR_NOTIFICATION=false
- HOMEOWNER_NOTIFICATION=false
- CRON_ACTIVATION=false
- SCHEDULER_ACTIVATION=false
- DISPATCHER_ACTIVATION=false
- PUBLIC_ROUTE_ACTIVATION=false

## Pre-Day Source-of-Truth Check

Before any execution-day work, the founder/operator confirms Terminal 1 is still the source of truth.

Required checks:

1. Run `scripts/verify-source-of-truth.sh`.
2. Confirm `HEAD` and `origin/main` match before pulling this packet into main.
3. Confirm the worktree branch is not `main`.
4. Confirm no production credentials are exposed.
5. Confirm this runbook is being used only for dry-run execution-day rehearsal.

PASS condition:

- Source of truth is clean and verified.
- The execution-day packet is reviewed from the approved worktree or source-confirmed main after merge.
- No live automation has been enabled.

HOLD condition:

- Source of truth is unclear.
- Work is happening in the wrong repo.
- Unreviewed changes exist outside the packet scope.

BLOCKED condition:

- Any production send/write/route/credential path is active or exposed.

## Workspace and Readiness Confirmation

The founder/operator confirms the dry-run workspace is ready before reviewing the first roofer lead.

Checklist:

1. Confirm the first roofer workspace packet exists.
2. Confirm first roofer manual setup planning, readiness, handoff, and founder decision artifacts are available.
3. Confirm production gates pass.
4. Confirm safe readiness passes.
5. Confirm the first-roofer execution-day dry-run wrapper passes.
6. Confirm the aggregate first-paid readiness verifier is run from canonical `/root/roofleadhq` main only after final merge/review.

Execution-day readiness note:

- Workspace:
- Source of truth commit:
- Readiness status: PASS / HOLD / BLOCKED
- Blocking issue, if any:
- Next action:

## First Lead Intake Review

The founder/operator reviews the first lead manually. This runbook does not send, notify, dispatch, or write to production.

Review fields:

- Lead source:
- Homeowner name or placeholder:
- Phone/email present: yes / no / unknown
- Property address present: yes / no / unknown
- Roof issue summary:
- Urgency:
- Insurance/storm context:
- Photos available: yes / no / unknown
- Appointment preference:
- Missing information:
- Safety or service-area concern:
- Recommended manual next step:

Founder/operator decision questions:

1. Is this lead complete enough for manual review?
2. Is this lead inside the roofer’s intended service area?
3. Is there enough information to prepare a manual appointment or inspection recommendation?
4. Should the founder/operator manually request missing information before any next step?
5. Should this be held for review rather than moving forward?

## Missing-Information Handling

If key details are missing, the founder/operator logs the gap and prepares a manual follow-up plan. No automated messages are sent.

Missing-information categories:

- missing homeowner contact information
- missing property address
- missing roof issue details
- missing urgency/timing
- missing inspection availability
- missing contractor fit/service-area confirmation
- unclear lead source
- unclear consent or communication context

Manual handling options:

1. HOLD: wait for more information.
2. MANUAL REVIEW: founder/operator reviews source details and decides whether to proceed.
3. MANUAL FOLLOW-UP PREP: draft a message or call note, but do not send through production systems.
4. BLOCKED: stop if consent, source, service area, or production safety is unclear.

Required log:

- Missing field:
- Why it matters:
- Manual recovery action:
- Owner:
- Status: HOLD / MANUAL REVIEW / BLOCKED
- Recheck needed:

## Founder/Operator Manual Decision

The founder/operator makes a manual decision before any appointment or inspection tracking step.

Decision options:

- PASS TO MANUAL COMMUNICATION PREP: lead is complete enough for founder/operator-prepared communication.
- HOLD FOR MISSING INFO: lead requires more information before next action.
- HOLD FOR CONTRACTOR FIT: roofer/service-area/availability fit needs manual confirmation.
- BLOCKED FOR SAFETY: production activation, consent, credential, route, or external notification risk exists.
- NO ACTION: lead is not suitable for this first-roofer execution-day dry run.

Decision log:

- Decision:
- Reason:
- Evidence reviewed:
- Open questions:
- Manual next action:
- Owner:
- Timestamp:

## Manual Communication Preparation

The founder/operator may prepare manual communication language, but this runbook does not send anything.

Allowed:

- prepare internal notes
- draft manual homeowner follow-up text outside production systems
- draft manual contractor briefing notes
- prepare an inspection or appointment recommendation for human review
- record what information is needed before communication

Disallowed:

- sending live SMS/Twilio
- sending Resend production emails
- notifying contractors through Lindy or external workflow
- placing Vapi calls
- writing to production Supabase
- activating Calendar booking
- enabling dispatcher/scheduler/cron routes

Manual homeowner note template:

- Purpose of note:
- Missing information requested:
- Proposed inspection or appointment timing:
- Human sender:
- Approval status: DRAFT ONLY / APPROVED FOR MANUAL SEND OUTSIDE SYSTEM / HOLD

Manual contractor note template:

- Lead summary:
- Property area:
- Roof issue:
- Urgency:
- Proposed inspection or appointment:
- Missing information:
- Founder/operator recommendation:
- Approval status: DRAFT ONLY / HOLD

## Appointment or Inspection Tracking

Use “book inspections” or “book appointments” language. Do not use job-booking language.

The founder/operator tracks whether the lead is ready for a manual inspection or appointment step.

Tracking fields:

- Ready to book inspection: yes / no / hold
- Ready to book appointment: yes / no / hold
- Preferred appointment window:
- Contractor availability known: yes / no / unknown
- Homeowner availability known: yes / no / unknown
- Manual confirmation needed:
- Calendar activation required: no
- Production booking enabled: no
- Next manual action:

PASS condition:

- Founder/operator has enough information to manually coordinate an inspection or appointment outside automated production systems.

HOLD condition:

- Missing homeowner availability, property details, contractor fit, or source/consent details.

BLOCKED condition:

- Any workflow attempts to automate booking, notify external parties, or write to production.

## Outcome Capture

At the end of the lead review, the founder/operator captures the outcome.

Outcome options:

- PASS: ready for manual inspection or appointment coordination
- HOLD: waiting on missing information
- HOLD: waiting on contractor fit confirmation
- HOLD: waiting on founder review
- BLOCKED: safety, consent, route, credential, or production activation risk
- NO ACTION: not suitable for this execution-day dry run

Outcome log:

- Outcome:
- Reason:
- Lead readiness:
- Missing information:
- Manual communication prepared: yes / no / hold
- Inspection/appointment status:
- Production systems touched: no
- External notifications sent: no
- Supabase writes performed: no
- Next action:
- Owner:

## End-of-Day Recap and Next Actions

The founder/operator closes the execution day with a written recap.

Required recap:

- Source of truth commit:
- Execution-day date:
- Leads reviewed:
- Leads ready to book inspections:
- Leads ready to book appointments:
- Leads on HOLD:
- Leads BLOCKED:
- Missing-info themes:
- Contractor-fit questions:
- Manual communication drafts prepared:
- Production sends/writes/routes activated: no
- External notifications sent: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Recommended next build:

Next-action categories:

1. Improve intake completeness.
2. Improve missing-information recovery.
3. Improve contractor-fit review.
4. Improve manual communication templates.
5. Improve appointment or inspection tracking.
6. Improve end-of-day reporting.
7. Escalate safety blocker before any further execution.

## PASS / HOLD / BLOCKED Language

FIRST ROOFER EXECUTION DAY RUNBOOK PASS: the first-roofer execution day can be conducted internally by the founder/operator in dry-run mode only, with production activation still disabled.

FIRST ROOFER EXECUTION DAY RUNBOOK HOLD: missing prerequisites, missing lead details, missing contractor fit, missing manual decision, missing notes, or unclear inspection/appointment readiness must be fixed before continuing.

FIRST ROOFER EXECUTION DAY RUNBOOK BLOCKED: production activation, data mutation, automated booking, external notification, route activation, credential exposure, destructive action, or live-send risk must be resolved before continuing.

## Referenced Artifacts for Verification

- docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md
- scripts/run-first-roofer-execution-day-dry-run.sh
- backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js
- scripts/verify-source-of-truth.sh
- scripts/check-production-gates.sh
- scripts/verify-safe-readiness.sh
- No production activation, no external sends, no data mutation.
