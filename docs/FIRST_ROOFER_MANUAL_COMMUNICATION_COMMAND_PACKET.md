# First Roofer Manual Communication Command Packet

## Purpose and safety posture

This packet creates the First Roofer Manual Communication Command Packet for the Founder-Led Launch Program.

It provides the founder/operator with a self-contained, fillable operational packet to manually prepare, review, approve, and track all homeowner and contractor communications during the first roofer execution path. It builds directly on the First Roofer Day-One Command Center (first-roofer day-one command center), the Lead-to-Inspection Ops Pack, and the Execution Day Runbook. It turns the communication prep steps from those artifacts into a dedicated, reusable command packet with approval states, concrete checklists, reusable internal-only draft templates, consent and capacity HOLD rules, a manual communication tracker, founder/operator approval log, escalation rules, outcome capture, end-of-day communication report, and handoff notes.

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no sends. It does not activate Twilio, Resend, Lindy, Vapi, Calendar, cron, scheduler, dispatcher, public routes, or any production system. All communication remains draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send.

Explicit no-live-send / no-live-automation confirmation:
- No live SMS/Twilio activation or sends.
- No live Vapi calls.
- No Calendar booking activation.
- No Resend production sends.
- No Lindy external sends.
- No cron/scheduler/dispatcher activation.
- No public route activation.
- No production Supabase writes.
- No external notifications.
- No production credentials.
- No automated booking.
- No production route activation.
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually prepare to book inspections and book appointments. It does not book, dispatch, send, or guarantee anything.

Required dry-run flags (confirmed before use):
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

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path.

## Manual communication command overview

The Manual Communication Command Packet gives the founder/operator one place to handle all manual communication work for first-roofer leads:

- Intake homeowner communication details and contact permission status.
- Prepare, review, and approve homeowner message drafts (missing-information request, inspection readiness confirmation, appointment readiness confirmation, HOLD / follow-up).
- Prepare, review, and approve contractor message drafts (lead briefing, inspection coordination, appointment coordination, HOLD / capacity check).
- Apply explicit no-contact / consent HOLD rules and contractor capacity / service-area HOLD rules before any draft is marked APPROVED FOR MANUAL USE.
- Log founder/operator approvals in the approval log.
- Track every communication in the manual communication tracker with approval state, sender, external send performed: no, and production system touched: no.
- Escalate HOLD or BLOCKED cases using defined rules.
- Capture communication outcomes.
- Produce an end-of-day communication report.
- Leave handoff notes for the next operator session.

All steps use "book inspections" / "book appointments" language only. The goal is inspection readiness and appointment readiness via manual coordination only. Every template carries the explicit note that it is draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable packet that can be printed or used in a working session to manually prepare, review, approve, and track homeowner and contractor communication for multiple leads without any production systems, live sends, or automated actions.

## Communication approval states

All homeowner and contractor drafts and coordination items use one of these manual approval states. States are recorded by the founder/operator only. No automation changes state.

- DRAFT: initial internal draft prepared by founder/operator. Not reviewed. Not ready for any external action.
- REVIEWED: founder/operator has reviewed for completeness, consent, service-area fit, and safety. Draft is internally consistent but not yet approved for external use.
- APPROVED FOR MANUAL USE: founder/operator has explicitly approved the draft for manual use outside the system (e.g., copy/paste to phone or email client by the human operator only). Still requires external send performed: no and production system touched: no until the human actually sends.
- HOLD: blocked by consent, contact permission, service-area, capacity, missing information, or founder review requirement. No external use permitted.
- BLOCKED: safety, consent violation, spam risk, production activation risk, credential exposure, or forbidden language detected. Immediate stop. Requires production gates + safe readiness re-run and explicit founder clearance.

Manual approval state: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED

Manual sender: founder/operator (name recorded)

External send performed: no

Production system touched: no

Inspection readiness decision: PASS / HOLD / BLOCKED (when communication advances inspection readiness)

Appointment readiness decision: PASS / HOLD / BLOCKED (when communication advances appointment readiness)

## Homeowner communication intake checklist

Use this checklist for every lead before preparing any homeowner message. Mark explicitly.

- [ ] Lead ID recorded
- [ ] Homeowner name present
- [ ] Property address present (full or partial)
- [ ] Lead source + source detail credible
- [ ] Service type identified (inspection, repair, storm response, etc.)
- [ ] Urgency stated or reasonably inferred (emergency / high / standard / low)
- [ ] Damage description present and actionable
- [ ] Photos present: yes / no / unknown
- [ ] Insurance involvement: yes / no / unknown
- [ ] Contact permission status: granted / pending / unknown / do-not-contact
- [ ] Homeowner preferred channel: SMS / phone / email / unknown
- [ ] Homeowner message type decided: missing-information request / inspection readiness confirmation / appointment readiness confirmation / HOLD / follow-up needed
- [ ] No safety, spam, or consent flags
- [ ] Homeowner message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- [ ] Manual sender (founder/operator) recorded
- [ ] External send performed: no
- [ ] Production system touched: no

If contact permission status is not "granted" or is "do-not-contact", immediately apply Homeowner no-contact / consent HOLD rules and move to HOLD state. Do not prepare or approve any outbound message.

## Homeowner missing-information request template

**Safety note: This is a draft-only template. It is draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send. External send performed: no. Production system touched: no.**

Homeowner Missing-Information Request (internal draft)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Contact permission status: ____________________
- Homeowner preferred channel: ____________________
- Information still needed (explicit list): ____________________
- Proposed manual next step (e.g., "call to confirm roof access and photos"): ____________________
- Draft text (copy/paste outside system only after APPROVED FOR MANUAL USE):
  ```
  Hi [Homeowner name], this is [founder/operator name] with the Founder-Led Launch Program helping your roofer. To book your inspection we need a few quick details: [list missing items]. Can you reply with those or suggest a good time for a short call? Thank you.
  ```
- Homeowner message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- External send performed: no
- Production system touched: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________

## Homeowner inspection readiness confirmation template

**Safety note: This is a draft-only template. It is draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send. External send performed: no. Production system touched: no.**

Homeowner Inspection Readiness Confirmation (internal draft)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Contact permission status: ____________________
- Homeowner preferred channel: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Contractor availability status: ____________________
- Proposed inspection window (for manual coordination to book inspections): ____________________
- Draft text (copy/paste outside system only after APPROVED FOR MANUAL USE):
  ```
  Hi [Homeowner name], this is [founder/operator name] with the Founder-Led Launch Program. Your roofer [contractor match] is available to book an inspection at [proposed window]. Please confirm a time that works or let us know if you need to adjust. We will coordinate manually.
  ```
- Homeowner message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- External send performed: no
- Production system touched: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________

## Homeowner appointment readiness confirmation template

**Safety note: This is a draft-only template. It is draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send. External send performed: no. Production system touched: no.**

Homeowner Appointment Readiness Confirmation (internal draft)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Contact permission status: ____________________
- Homeowner preferred channel: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Contractor availability status: ____________________
- Preferred appointment window (for manual coordination to book appointments): ____________________
- Pre-appointment requirements (photos, claim info, access): ____________________
- Draft text (copy/paste outside system only after APPROVED FOR MANUAL USE):
  ```
  Hi [Homeowner name], this is [founder/operator name] with the Founder-Led Launch Program. Your roofer [contractor match] is ready to book the appointment at [preferred window]. Please confirm or suggest an alternative. We will handle coordination manually.
  ```
- Homeowner message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- External send performed: no
- Production system touched: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________

## Homeowner no-contact / consent HOLD rules

Apply these rules before any homeowner draft leaves DRAFT or REVIEWED state. These are manual founder/operator rules only.

- If contact permission status is "do-not-contact" or "pending" with no explicit grant recorded: set state to HOLD. Record "Homeowner no-contact / consent HOLD". Do not prepare or approve any message that implies outreach.
- If homeowner preferred channel is unknown and no prior successful contact record exists: set state to HOLD. Record "Missing preferred channel confirmation".
- If any prior note or source indicates spam complaint, opt-out language, or legal hold: set state to BLOCKED immediately. Log in approval log and escalation section.
- If lead source is cold or unclear on consent context: require explicit founder/operator review and set state to REVIEWED at best until consent is confirmed.
- HOLD for consent or no-contact must be reviewed at every end-of-day communication report and handoff. It does not auto-clear.
- Only when contact permission status = "granted" and no flags exist may a draft advance to APPROVED FOR MANUAL USE.

Homeowner no-contact / consent HOLD entry (required when triggered):
- Lead ID:
- Homeowner name:
- Reason (exact rule above):
- State forced to: HOLD / BLOCKED
- Manual review required: yes
- Founder/operator notes:
- Timestamp:

## Contractor briefing checklist

Use this checklist for every lead before preparing any contractor message. Mark explicitly.

- [ ] Lead ID recorded
- [ ] Homeowner name + property address present
- [ ] Lead source + source detail credible
- [ ] Service type identified
- [ ] Urgency stated
- [ ] Damage description present
- [ ] Photos present: yes / no / unknown
- [ ] Insurance involvement: yes / no / unknown
- [ ] Contractor match identified
- [ ] Contractor service-area fit: yes / no / hold
- [ ] Contractor availability status: available / limited / unknown / HOLD for capacity check
- [ ] Contractor message type decided: lead briefing / inspection coordination / appointment coordination / HOLD / capacity check
- [ ] No safety, service-area, or capacity flags that would make briefing inaccurate
- [ ] Contractor message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- [ ] Manual sender (founder/operator) recorded
- [ ] External send performed: no
- [ ] Production system touched: no

If contractor service-area fit is "no" or "hold", or availability status indicates capacity issue, immediately apply Contractor capacity / service-area HOLD rules.

## Contractor inspection coordination template

**Safety note: This is a draft-only template. It is draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send. External send performed: no. Production system touched: no.**

Contractor Inspection Coordination (internal draft)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Contractor availability status: ____________________
- Proposed inspection window (for manual coordination to book inspections): ____________________
- Draft text (copy/paste outside system only after APPROVED FOR MANUAL USE):
  ```
  Hi [Contractor name], founder/operator here with the Founder-Led Launch Program. We have a lead for [homeowner name] at [property address]. Details: [urgency + damage]. Photos: [yes/no]. Insurance: [yes/no]. Ready to book an inspection in [proposed window]? Please confirm availability for manual coordination.
  ```
- Contractor message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- External send performed: no
- Production system touched: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________

## Contractor appointment coordination template

**Safety note: This is a draft-only template. It is draft-only until a founder/operator manually approves and sends it outside the system. The packet itself must never send. External send performed: no. Production system touched: no.**

Contractor Appointment Coordination (internal draft)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Contractor availability status: ____________________
- Preferred appointment window (for manual coordination to book appointments): ____________________
- Pre-appointment requirements noted: ____________________
- Draft text (copy/paste outside system only after APPROVED FOR MANUAL USE):
  ```
  Hi [Contractor name], founder/operator here with the Founder-Led Launch Program. Lead [homeowner name] at [property address] is past inspection readiness. Ready to book the appointment in [preferred window]? Please confirm slot for manual coordination. Pre-reqs: [list].
  ```
- Contractor message draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- External send performed: no
- Production system touched: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________

## Contractor capacity / service-area HOLD rules

Apply these rules before any contractor draft leaves DRAFT or REVIEWED state.

- If contractor service-area fit is "no" after manual check against roofer documented area: set state to HOLD. Record "Contractor service-area HOLD". Update triage board and decision log. Do not approve a briefing that implies coverage.
- If contractor availability status is "unknown" or indicates capacity issue (overbooked, weather hold, etc.): set state to HOLD. Record "Contractor capacity / service-area HOLD". Require manual capacity check before advancing.
- If contractor match is unclear or no contractor has been identified for the lead: set state to HOLD. Record "Missing contractor match".
- If any prior note indicates the roofer has paused new inspections or appointments in the area: set state to HOLD or BLOCKED as appropriate and log.
- HOLD for capacity or service-area must be reviewed at every end-of-day communication report. It does not auto-clear.
- Only when service-area fit = "yes" and availability status supports the proposed window may a draft advance to APPROVED FOR MANUAL USE.

Contractor capacity / service-area HOLD entry (required when triggered):
- Lead ID:
- Contractor match:
- Reason (exact rule above):
- State forced to: HOLD / BLOCKED
- Manual capacity / area re-check required: yes
- Founder/operator notes:
- Timestamp:

## Founder/operator approval log

Every homeowner or contractor communication item that advances past DRAFT must have an entry here. This is the source of truth for manual approvals.

Approval Log entry (one per reviewed item):
- Lead ID:
- Homeowner name:
- Property address:
- Communication target: homeowner / contractor
- Message type: (missing-information request / inspection readiness confirmation / appointment readiness confirmation / lead briefing / inspection coordination / appointment coordination / HOLD / follow-up / capacity check)
- Manual approval state: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Reason / evidence (references intake checklist, HOLD rules, completeness, service-area fit):
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Manual sender (founder/operator name):
- External send performed: no
- Production system touched: no
- Open questions:
- Founder/operator notes:
- Timestamp:

The log must be updated before moving any item on the manual communication tracker or advancing readiness decisions.

## Manual communication tracker

Maintain a simple manual tracker (notes, spreadsheet, or printed table) for all active leads this session. Update after every approval state change or outcome.

Tracker columns / fields (per lead):
- Lead ID
- Homeowner name
- Property address
- Lead source / source detail
- Service type
- Urgency
- Photos present: yes/no/unknown
- Insurance involvement: yes/no/unknown
- Contact permission status
- Homeowner preferred channel
- Homeowner message type
- Homeowner message draft status (DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED)
- Contractor match
- Contractor service-area fit
- Contractor availability status
- Contractor message type
- Contractor message draft status (DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED)
- Manual approval state (overall for the lead's comms)
- Manual sender: founder/operator
- External send performed: no
- Production system touched: no
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Communication outcome (see Outcome capture)
- Founder/operator notes
- Next manual action
- Last updated timestamp

The tracker is updated manually only. It feeds the end-of-day communication report and handoff notes.

## Escalation and HOLD/BLOCKED rules

During the session, apply these rules manually:

1. Any lead with consent, no-contact, or do-not-contact flag on homeowner side → immediate HOLD (or BLOCKED if spam/legal). Record in approval log and tracker. Do not approve drafts.
2. Any lead where contractor service-area fit = no or capacity HOLD after manual check → HOLD. Update tracker and contractor briefing. Do not approve inaccurate coordination messages.
3. Any sign of production system activation, live flag change, or credential exposure during the session → full stop. Re-run production gates and safe readiness. Escalate to founder before any further work.
4. Three or more leads with the same missing-information or consent category → note as theme in end-of-day communication report.
5. Any draft that would require a live send, call, or calendar write to advance → HOLD and log "manual coordination only — external action deferred".
6. BLOCKED items are reviewed at end-of-day escalation slot; they do not advance to APPROVED FOR MANUAL USE.
7. Any draft containing forbidden business language (see below) → BLOCKED. Fix language before re-review.

All escalations are recorded in the founder/operator approval log, manual communication tracker, and end-of-day communication report.

## Outcome capture

For every lead's communication work, record a final outcome entry (use the approval log + tracker as source).

Communication Outcome (per lead):
- Lead ID:
- Homeowner name:
- Property address:
- Final communication outcome: PASS / HOLD / BLOCKED / NO ACTION (exact)
- Homeowner message draft status at close:
- Contractor message draft status at close:
- Manual approval state at close:
- Inspection readiness decision: PASS / HOLD / BLOCKED
- inspection readiness decision: PASS / HOLD / BLOCKED
- Appointment readiness decision: PASS / HOLD / BLOCKED
- appointment readiness decision: PASS / HOLD / BLOCKED
- Ready to book inspections via manual coordination: yes / no
- Ready to book appointments via manual coordination: yes / no
- Homeowner communication prepared (any type): yes / no
- Contractor communication prepared (any type): yes / no
- Consent / no-contact HOLDs logged: (count + summary)
- Capacity / service-area HOLDs logged: (count + summary)
- Manual sender: founder/operator
- External send performed: no
- Production system touched: no
- Communication outcome notes:
- Manual next action / follow-up:
- Timestamp:

Aggregate daily counts are computed from these entries for the end-of-day communication report.

## End-of-day communication report

Fill this at close of day. Save alongside filled approval logs, tracker, and templates.

End-of-Day Communication Report — First Roofer Manual Communication Command Packet

- Source of truth commit: 8e174db (or current worktree note)
- Execution day / session date:
- Founder/operator:
- Total leads with communication work:
- Leads with homeowner message prepared:
- Leads with contractor message prepared:
- Leads with at least one APPROVED FOR MANUAL USE draft:
- Leads ready to book inspections (inspection readiness decision PASS):
- Leads ready to book appointments (appointment readiness decision PASS):
- Leads on HOLD (homeowner consent / no-contact):
- Leads on HOLD (contractor capacity / service-area):
- Leads on HOLD (other):
- Leads BLOCKED (by reason):
- Leads NO ACTION:
- Homeowner missing-information requests drafted:
- Homeowner inspection readiness confirmations drafted:
- Homeowner appointment readiness confirmations drafted:
- Contractor lead briefings drafted:
- Contractor inspection coordination drafted:
- Contractor appointment coordination drafted:
- Total HOLD / BLOCKED escalations handled:
- Production sends/writes/routes activated: no
- External notifications sent: no
- External send performed across all: no
- Production system touched across all: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Explicit no-live-send / no-live-automation confirmation: yes (see Purpose section)
- Missing-info / consent themes (summary):
- Capacity / service-area themes (summary):
- Recommended next manual action or build improvement:
- Handoff notes location:

Next-action categories (use these):
1. Improve homeowner intake checklist or consent HOLD rules.
2. Improve contractor briefing checklist or capacity HOLD rules.
3. Improve homeowner or contractor draft templates.
4. Improve approval log or manual communication tracker.
5. Improve escalation rules or outcome capture.
6. Improve end-of-day communication report or handoff.
7. Escalate safety blocker before any further execution.

## Handoff notes for the next operator session

At end of day, leave these notes for the next founder/operator session (internal only).

Handoff Notes — First Roofer Manual Communication Command Packet

- Date / session:
- Owner completing handoff:
- Tracker status (summary of active leads and states):
- Leads still in homeowner missing-information queue (Lead IDs + missing fields):
- Leads with APPROVED FOR MANUAL USE drafts not yet externally sent (Lead IDs + next manual step):
- Leads on HOLD (homeowner consent / no-contact) with owner/timestamp and reason:
- Leads on HOLD (contractor capacity / service-area) with owner/timestamp and reason:
- BLOCKED leads and escalation status:
- Key themes or repeated questions from the day (consent, capacity, missing info):
- Any open same-day escalation items:
- Files / notes location for filled logs, tracker, and draft templates:
- Dry-run flag confirmation at close: all false, no production activation, external send performed: no for all, production system touched: no for all
- dry-run flag confirmation: confirmed (WORKSPACE_MODE=dry-run and all activation flags false)
- Recommended first action for next session:
- Timestamp:

## Explicit no-live-send / no-live-automation confirmation

This packet:
- Is draft-only for all templates.
- Records external send performed: no on every approval and outcome.
- Records production system touched: no on every approval and outcome.
- Contains no code, no routes, no send functions, no automation.
- Must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- Helps the founder/operator manually prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, and no production route activation are permitted or performed by this packet.

## Referenced Artifacts for Verification

- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md` (this document)
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md` (Agent Product Quality Gate)
- `scripts/run-first-roofer-manual-communication-command-packet-dry-run.sh`
- `backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`
- `scripts/check-agent-product-quality-gate.sh`
- `backend/scripts/verify-agent-product-quality-gate-readonly.js`
- `scripts/check-production-gates.sh`
- `scripts/verify-safe-readiness.sh`
- `scripts/agent-run-gates.sh`
- `scripts/agent-diff-proof.sh`

All references and safety boundaries are enforced by the dedicated read-only verifier and the aggregate first-paid pilot readiness verifier.

No production activation, no external sends, no data mutation. Manual founder/operator review and manual coordination only. Helps the founder/operator prepare to book inspections and book appointments via the Founder-Led Launch Program.

## PASS / HOLD / BLOCKED Summary (Packet Level)

Use the criteria in the dedicated sections above. The packet is PASS only when the full communication command packet is operationally usable for manual founder/operator preparation, review, approval, and tracking of homeowner and contractor communication for the first roofer execution path, with all required sections, concrete fillable fields, templates (homeowner + contractor), approval states, consent and capacity HOLD rules, tracker, approval log, inspection/appointment readiness language, end-of-day reporting, handoff, required business phrases present, forbidden phrases absent, explicit no-live-send / no-live-automation confirmation, and complete wiring into aggregate, index, and both next-chat contexts.

## Required Business Language Confirmation

This packet uses only:
- Founder-Led Launch Program
- book inspections
- book appointments
- manual founder/operator review
- manual coordination only
- inspection readiness
- appointment readiness
- draft-only
- approved for manual use
- external send performed: no
- production system touched: no

The list of prohibited legacy pilot/quota-style, job/revenue guarantee, and production activation language phrases (as defined in the quality gate and packet verifiers) is verified absent by the dedicated read-only verifier.
