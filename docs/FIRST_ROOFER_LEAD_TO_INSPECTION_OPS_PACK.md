# First Roofer Lead-to-Inspection Ops Pack

## Purpose

This packet turns the first-roofer execution-day runbook into a practical founder/operator workflow for taking a first roofer lead from intake review through manual inspection/appointment coordination, outcome logging, and end-of-day reporting.

It provides the founder/operator with concrete templates, checklists, decision logs, and tracking structures to handle the first real lead manually in a dry-run/internal-only/founder-operator-only environment.

This packet builds directly on `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md` and follows the standards in `docs/AGENT_PRODUCT_QUALITY_GATE.md`. It references the Agent Product Quality Gate. It does not replace the runbook; it operationalizes it for repeatable lead-to-inspection handling.

This is a product-moving operational packet. It enables the founder/operator to execute a full lead review cycle manually without any production activation.

## Product Outcome

The operational result is a usable, repeatable workflow that lets the founder or operator:

- Review an incoming first-roofer lead for completeness.
- Identify and recover missing information manually.
- Make and log explicit founder/operator decisions.
- Prepare manual communication drafts for homeowner and contractor.
- Track inspection readiness and appointment readiness using "book inspections" / "book appointments" language only.
- Capture outcome and next action with owner and timestamp.
- Produce a clear end-of-day report.

Success criteria: after running the dry-run wrapper and passing the verifier, the founder/operator has a self-contained packet that can be printed or copied into a working session and used end-to-end on a sample lead without requiring production systems, live sends, or automated booking.

All work remains manual founder/operator review and manual coordination only.

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
- no production credentials
- no automated booking
- no production route activation

Required dry-run flags (must be confirmed before use):

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

This packet performs no writes, sends, calls, or activations of any kind. It is strictly for manual rehearsal and founder/operator coordination practice.

## Source-of-Truth and Workspace Preconditions

Before using this ops pack:

1. Confirm the worktree is the approved agent worktree for this task (not /root/roofleadhq main).
2. Run production gates and safe readiness via the provided wrapper (the wrapper intentionally skips source-of-truth because worktrees may be ahead or behind during branch review).
3. Confirm the first-roofer execution-day runbook artifacts exist and the execution day dry-run wrapper has passed in the current workspace.
4. Confirm `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md` and `docs/AGENT_PRODUCT_QUALITY_GATE.md` are present and the quality gate has been run.
5. Confirm no production credentials, live flags, or external service tokens are present in the working environment.
6. Confirm this is being used only for dry-run rehearsal of the first lead-to-inspection flow.

Workspace confirmation template:

- Workspace path:
- Current branch:
- Execution day runbook status: PASS / HOLD / BLOCKED
- Agent product quality gate status: PASS / HOLD / BLOCKED
- First Roofer Lead-to-Inspection Ops Pack status: PASS / HOLD / BLOCKED
- Blocking issue (if any):
- Owner:
- Timestamp:

PASS condition: all preconditions met, dry-run flags confirmed, no production paths active.

HOLD condition: missing runbook artifacts, quality gate not run, or workspace flags unclear.

BLOCKED condition: any production activation, credential exposure, or live automation risk detected.

## Lead Intake Review Workflow

The founder/operator begins every lead-to-inspection cycle with a structured manual intake review. No automation is used.

Steps:

1. Capture the raw lead details (from email, form, call note, or fixture) into the Lead Intake Review Template.
2. Apply the Lead Completeness Checklist.
3. If any required items are missing or unclear, immediately move to the Missing-Information Recovery Workflow.
4. If complete enough, proceed to Founder/Operator Decision Log.
5. Record owner and timestamp on every step.

This workflow uses only manual founder/operator review. No system ingestion, no dispatcher, no route.

## Lead Completeness Checklist

Use this checklist on every lead. Mark each item explicitly.

Required operational fields (all must be reviewed):

- lead source
- homeowner name or placeholder
- homeowner phone/email status
- property address status
- roof issue summary
- urgency
- insurance/storm context
- photos status
- appointment preference
- service area fit
- contractor availability
- missing information
- manual next action
- owner
- timestamp
- inspection readiness status
- appointment readiness status
- outcome
- next action

Lead Completeness Checklist items:

- [ ] Lead source recorded and credible
- [ ] Homeowner name or clear placeholder present
- [ ] Homeowner phone or email status known (present / missing / unknown)
- [ ] Property address status known (full / partial / missing)
- [ ] Roof issue summary present and actionable
- [ ] Urgency stated or reasonably inferred
- [ ] Insurance/storm context captured (yes / no / unknown / claim number if any)
- [ ] Photos status recorded (available / link / none / unknown)
- [ ] Appointment preference or availability window noted
- [ ] Service area fit confirmed against roofer's documented area
- [ ] Contractor availability window known or explicitly marked unknown
- [ ] No safety, consent, or spam flags

If any item is incomplete, the lead does not pass completeness and must enter Missing-Information Recovery Workflow.

## Missing-Information Recovery Workflow

When the completeness checklist fails, the founder/operator uses the Missing-Information Recovery Template to log the gap and decide the manual recovery action.

Missing information categories (from execution day runbook, expanded):

- missing homeowner contact information
- missing property address
- missing roof issue details
- missing urgency/timing
- missing inspection availability
- missing contractor fit/service-area confirmation
- unclear lead source
- unclear consent or communication context
- missing photos or visual evidence
- missing insurance/storm claim details

Manual handling options (only these):

1. HOLD: wait for more information (log owner and recheck timestamp).
2. MANUAL REVIEW: founder/operator reviews source details and decides whether to proceed with partial data.
3. MANUAL FOLLOW-UP PREP: draft a message or call note outside production systems (never send via Twilio/Resend/Lindy).
4. BLOCKED: stop if consent, source, service area, or production safety is unclear.

After recovery decision, return to Lead Intake Review Workflow or move to Founder/Operator Decision Log with updated fields.

## Founder/Operator Decision Log

Every lead must have an explicit manual decision before any communication prep or tracking step.

Decision options (tied to product outcome):

- PASS TO MANUAL COMMUNICATION PREP: lead is complete enough for founder/operator-prepared communication and inspection/appointment tracking using manual coordination only.
- HOLD FOR MISSING INFO: lead requires more information before next action (use missing-information recovery template).
- HOLD FOR CONTRACTOR FIT: roofer/service-area/availability fit needs manual confirmation.
- HOLD FOR FOUNDER REVIEW: additional internal review required before proceeding.
- BLOCKED FOR SAFETY: production activation, consent, credential, route, or external notification risk exists.
- NO ACTION: lead is not suitable for this first-roofer dry-run execution.

Founder/Operator Decision Log template (required fields):

- Decision: [one of the options above]
- Reason: (one sentence minimum, referencing completeness checklist or missing info)
- Evidence reviewed: (lead source, key fields checked)
- Inspection readiness status: ready / not ready / hold
- Appointment readiness status: ready / not ready / hold
- Open questions:
- Manual next action:
- Owner:
- Timestamp:

This log must be filled before moving to communication prep or coordination tracker.

## Manual Homeowner Communication Prep

The founder/operator may prepare manual communication language for the homeowner. This packet never sends.

Allowed:

- prepare internal notes
- draft manual homeowner follow-up text outside production systems (copy/paste to phone only if explicitly approved outside this packet)
- record what information is needed before any real contact

Disallowed (enforced by safety posture and verifier):

- sending live SMS/Twilio
- sending Resend production emails
- placing Vapi calls
- writing to production Supabase
- activating Calendar booking
- enabling dispatcher/scheduler/cron routes

Manual Homeowner Communication Prep Template:

- Lead identifier / homeowner name or placeholder:
- Purpose of note:
- Key facts to convey (roof issue summary, urgency, insurance/storm context):
- Missing information requested:
- Proposed inspection or appointment timing (if any):
- Appointment preference noted:
- Human sender (founder/operator name):
- Approval status: DRAFT ONLY / APPROVED FOR MANUAL SEND OUTSIDE SYSTEM / HOLD
- Owner:
- Timestamp:

All drafts remain internal to the packet. No external delivery.

## Manual Contractor Communication Prep

The founder/operator may prepare manual briefing notes for the contractor. This packet never notifies.

Manual Contractor Communication Prep Template:

- Lead identifier:
- Property area / address status:
- Roof issue summary:
- Urgency:
- Insurance/storm context:
- Photos status:
- Proposed inspection or appointment (book inspections / book appointments language only):
- Service area fit:
- Contractor availability known:
- Missing information:
- Founder/operator recommendation:
- Manual coordination only: yes
- Approval status: DRAFT ONLY / HOLD
- Owner:
- Timestamp:

## Inspection or Appointment Coordination Tracker

Use “book inspections” or “book appointments” language only. Do not use job-booking language.

The founder/operator tracks whether the lead is ready for a manual inspection or appointment step using the tracker template. All coordination is manual founder/operator only.

Inspection/Appointment Coordination Tracker Template (required operational fields):

- Lead identifier:
- Inspection readiness status: ready / not ready / hold
- Appointment readiness status: ready / not ready / hold
- Preferred appointment window:
- Contractor availability known: yes / no / unknown
- Homeowner availability known: yes / no / unknown
- Service area fit confirmed: yes / no / hold
- Photos available for review: yes / no / hold
- Manual confirmation needed: (list any remaining)
- Calendar activation required: no
- Production booking enabled: no
- Manual next action:
- Owner:
- Timestamp:

PASS condition for this tracker:

- Founder/operator has enough information to manually coordinate an inspection or appointment outside automated production systems.

HOLD condition:

- Missing homeowner availability, property details, contractor fit, or source/consent details.

BLOCKED condition:

- Any workflow attempts to automate booking, notify external parties, or write to production.

## Inspection Readiness Decision

Before any coordination step, the founder/operator makes an explicit Inspection Readiness Decision using the decision log fields.

- inspection readiness status
- appointment readiness status

If both are "hold" or "not ready", the lead stays in HOLD and loops back to missing-information or decision log.

Only when at least one is "ready" may the lead move to Outcome Capture with a positive manual coordination recommendation.

All decisions are manual founder/operator review only. No automated readiness scoring.

## Outcome Capture

At the end of the lead review cycle, the founder/operator captures the outcome using the Outcome Capture Template. This closes the loop for the lead.

Outcome options (must use exact decision language):

- PASS: ready for manual inspection or appointment coordination (inspection readiness or appointment readiness achieved via manual review)
- HOLD: waiting on missing information
- HOLD: waiting on contractor fit confirmation
- HOLD: waiting on founder review
- BLOCKED: safety, consent, route, credential, or production activation risk
- NO ACTION: not suitable for this first-roofer lead-to-inspection dry run

Outcome Capture Template (required fields):

- Outcome: [exact PASS / HOLD / BLOCKED language]
- Reason: (ties back to completeness checklist, decision log, and readiness status)
- Lead readiness:
- Missing information:
- Manual communication prepared: yes / no / hold
- Inspection readiness status:
- Appointment readiness status:
- Production systems touched: no
- External notifications sent: no
- Supabase writes performed: no
- Manual next action:
- Owner:
- Timestamp:

Every outcome must reference at least one required operational field and confirm zero production touches.

## End-of-Day Reporting Template

The founder/operator closes the execution day (or session) with a written recap using this template.

End-of-Day Report Template:

- Source of truth commit (or worktree note):
- Execution-day / session date:
- Leads reviewed:
- Leads ready to book inspections:
- Leads ready to book appointments:
- Leads on HOLD:
- Leads BLOCKED:
- Missing-info themes (summary):
- Contractor-fit questions (summary):
- Manual communication drafts prepared:
- Inspection readiness decisions logged:
- Appointment readiness decisions logged:
- Production sends/writes/routes activated: no
- External notifications sent: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Recommended next build:

Next-action categories (use these):

1. Improve intake completeness.
2. Improve missing-information recovery.
3. Improve contractor-fit review.
4. Improve manual communication templates.
5. Improve inspection or appointment tracking.
6. Improve end-of-day reporting.
7. Escalate safety blocker before any further execution.

The report must be saved alongside the filled decision logs and trackers for the day.

## PASS / HOLD / BLOCKED Criteria

FIRST ROOFER LEAD-TO-INSPECTION OPS PACK PASS: the first-roofer lead-to-inspection workflow can be conducted internally by the founder/operator in dry-run mode only, with production activation still disabled. All required sections, operational fields, templates, decision logs, safety language, and cross-references are present and substantive. The packet is product-moving and usable for manual coordination of inspections and appointments.

FIRST ROOFER LEAD-TO-INSPECTION OPS PACK HOLD: missing prerequisites, incomplete lead details, missing contractor fit, missing manual decision log entries, missing templates, or unclear inspection/appointment readiness must be fixed before continuing. Run the dry-run wrapper and verifier again after corrections.

FIRST ROOFER LEAD-TO-INSPECTION OPS PACK BLOCKED: production activation, data mutation, automated booking, external notification, route activation, credential exposure, destructive action, or live-send risk must be resolved before continuing. Stop all use until the blocking condition is cleared and verified by production gates and safe readiness.

## Next Build Recommendations

After a successful PASS on this packet:

1. exercise the full packet end-to-end on at least two distinct sample leads (one complete, one with missing information) and record the filled templates as evidence.
2. Strengthen any gaps found in the Lead Completeness Checklist or readiness decision language.
3. Consider adding a simple local fixture lead sample under docs/samples/ that the dry-run wrapper can optionally load for repeatable rehearsal (still read-only, no writes).
4. Update the execution day runbook if this ops pack reveals missing steps that should be promoted back into the base runbook.
5. Ensure future agent tasks that touch lead handling reference this ops pack and run the dedicated verifier + quality gate.

## Referenced Artifacts for Verification

- docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md (this document)
- docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md (source runbook this packet builds on)
- docs/AGENT_PRODUCT_QUALITY_GATE.md (quality standard this packet satisfies)
- scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh (wrapper)
- backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js (verifier)
- scripts/check-agent-product-quality-gate.sh
- backend/scripts/verify-agent-product-quality-gate-readonly.js
- scripts/check-production-gates.sh
- scripts/verify-safe-readiness.sh
- scripts/agent-run-gates.sh
- scripts/agent-diff-proof.sh

All references and safety boundaries must be enforced by the dedicated read-only verifier and the aggregate first-paid pilot readiness verifier.

No production activation, no external sends, no data mutation, manual founder/operator review and manual coordination only.
