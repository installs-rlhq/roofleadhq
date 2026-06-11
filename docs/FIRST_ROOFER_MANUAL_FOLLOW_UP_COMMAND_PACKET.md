# First Roofer Manual Follow-Up Command Packet

## Purpose and safety posture

This packet creates the First Roofer Manual Follow-Up Command Packet for the Founder-Led Launch Program.

It provides the founder/operator with a self-contained, fillable operational packet to manually prepare, approve, track, and report follow-up after appointment/inspection outcomes have been captured using the Appointment Outcome Command Packet. It builds directly on the First Roofer Day-One Command Center, the First Roofer Manual Communication Command Packet, the First Roofer Inspection Coordination Command Packet, the First Roofer Appointment Readiness Command Packet, the First Roofer Appointment Outcome Command Packet, the First Roofer Lead-to-Inspection Ops Pack, the First Roofer Execution Day Runbook, the First Paid Launch Follow-Up Cadence Packet, the First Paid Launch Appointment Outcome Packet, the First Paid Launch Booking Preferences Packet, the First Paid Launch Reporting Preferences Packet, and the Agent Product Quality Gate.

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no sends, no calendar booking, no notifications, no production system writes, no automated follow-up, and no booking. It supports manual founder/operator review and manual coordination only. The packet helps the founder/operator manually prepare follow-up drafts, assign ownership, classify follow-up needs, apply HOLD/BLOCKED rules, track status, produce reports, and hand off — all without sending follow-ups, booking anything live, creating calendar events, writing production data, or activating any production system. All follow-up preparation remains internal until a founder/operator explicitly approves and performs any real-world manual follow-up steps outside the system after explicit approval. The packet itself must never send, book, notify, calendar, or touch production systems.

Explicit no-live-send / no-live-booking / no-live-automation / no production activation confirmation:
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
- No automated follow-up.
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually prepare to book inspections and book appointments and then manually capture outcomes and prepare manual follow-up. It does not send follow-ups, does not book anything live, does not create calendar events, does not write production data, and does not activate any production system.

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

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, no automated follow-up, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path. It follows the Agent Product Quality Gate. It consumes outputs from the Appointment Outcome Command Packet and supports preparation for manual follow-up using the Follow-Up Cadence Packet, Appointment Outcome Packet, Booking Preferences Packet, and Reporting Preferences Packet while remaining fully dry-run.

## Manual follow-up command overview

The Manual Follow-Up Command Packet gives the founder/operator one place to manually prepare, approve, track, and report follow-up after appointment/inspection outcomes have been captured:

- Confirm inputs from the Appointment Outcome Command Packet (and prior packets in the chain).
- Perform lead manual follow-up intake checklist.
- Complete follow-up ownership worksheet.
- Complete homeowner manual follow-up preparation worksheet.
- Complete contractor manual follow-up preparation worksheet.
- Complete reschedule follow-up preparation worksheet.
- Complete estimate / next-step follow-up preparation worksheet.
- Complete no-show / unable-to-access follow-up preparation worksheet.
- Complete completed inspection follow-up preparation worksheet.
- Complete cancelled / hold / blocked follow-up worksheet.
- Apply the manual follow-up approval decision worksheet.
- Apply explicit HOLD / BLOCKED rules for missing follow-up owner, incomplete outcome details, conflicting next steps, consent/safety, or production activation risk.
- Log founder/operator decisions in the founder/operator follow-up decision log with PASS / HOLD / BLOCKED and APPROVED FOR MANUAL FOLLOW-UP states.
- Track every lead in the manual follow-up tracker with approval state, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.
- Produce an end-of-day manual follow-up report.
- Leave handoff notes for the next operator session.

All steps use "book inspections" / "book appointments" language only. The goal is to manually prepare follow-up after appointment/inspection outcomes and manual coordination so that the founder/operator can later perform any needed manual follow-up and prepare to book inspections and prepare to book appointments. Every worksheet and decision carries the explicit note that it is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never send, book, notify, or activate anything.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable packet that can be printed or used in a working session to manually prepare, approve, track, and report follow-up after appointment/inspection outcomes (follow-up ownership, homeowner/contractor follow-up preparation, reschedule and estimate/next-step follow-up, no-show/unable-to-access follow-up, completed/cancelled/hold/blocked handling, HOLD/BLOCKED decisions, reporting, and handoff) for multiple leads without any production systems, live sends, live booking, live notifications, or automated actions.

This packet references and builds on:
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

References for verification: first-roofer day-one command center, First Roofer Manual Communication Command Packet, First Roofer Inspection Coordination Command Packet, First Roofer Appointment Readiness Command Packet, First Roofer Appointment Outcome Command Packet, Lead-to-Inspection Ops Pack, Execution Day Runbook, Follow-Up Cadence Packet, Appointment Outcome Packet, Booking Preferences Packet, Reporting Preferences Packet, and Agent Product Quality Gate.

## Inputs from the Appointment Outcome Command Packet

This packet is the direct successor step after appointment outcome capture. Before using this packet for any lead, the founder/operator must have completed (or explicitly recorded status from) the Appointment Outcome Command Packet for the lead.

Required inputs consumed from Appointment Outcome Command Packet:
- Lead ID, homeowner name, property address, lead source, source detail, service type, urgency, damage description, photos present: yes/no/unknown, insurance involvement: yes/no/unknown.
- Contact permission status and homeowner preferred channel.
- Contractor match and contractor service-area fit.
- Prior appointment outcome (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED).
- Manual outcome classification and manual outcome state (including OUTCOME READY FOR MANUAL FOLLOW-UP).
- Homeowner follow-up status and contractor follow-up status from prior worksheets.
- Reschedule needed: yes/no/unknown, estimate requested: yes/no/unknown, next-step needed: yes/no/unknown.
- Selected manual appointment window and confirmation flags from prior.
- Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no recorded in prior packet.
- Any noted manual next action or follow-up preparation notes from prior packet.

If the prior outcome state is not OUTCOME READY FOR MANUAL FOLLOW-UP, or if any prior HOLD/BLOCKED without documented clearance exists, immediately apply manual follow-up HOLD or BLOCKED rules.

Lead manual follow-up intake from appointment outcome template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Photos present: yes/no/unknown
- Insurance involvement: yes / no / unknown
- Insurance involvement: yes/no/unknown
- Contact permission status: granted / pending / unknown / do-not-contact
- Homeowner preferred channel: SMS / phone / email / unknown
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Manual outcome state: DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Reschedule needed: yes / no / unknown
- Estimate requested: yes / no / unknown
- Next-step needed: yes / no / unknown
- Follow-up needed: yes / no / unknown
- Homeowner follow-up status (from prior): ____________________
- Contractor follow-up status (from prior): ____________________
- Selected manual appointment window: ____________________
- Homeowner window confirmed: yes / no
- Contractor window confirmed: yes / no
- Prior packet reference / timestamp: ____________________
- Inputs from appointment outcome status: OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Manual follow-up prerequisites

Before using this packet for any lead, the founder/operator must confirm the following prerequisites from prior packets (mark explicitly). This packet does not replace those; it consumes their outputs for follow-up preparation.

- [ ] First Roofer Day-One Command Center has been reviewed for the lead.
- [ ] Lead-to-Inspection Ops Pack intake and decision log completed for the lead (or explicit reason recorded).
- [ ] First Roofer Execution Day Runbook followed for the execution day.
- [ ] First Roofer Manual Communication Command Packet: homeowner and contractor message drafts prepared, reviewed, and at least one marked APPROVED FOR MANUAL USE (or HOLD/BLOCKED status recorded with justification).
- [ ] First Roofer Inspection Coordination Command Packet: inspection coordination decision and inspection readiness decision reviewed; proposed inspection windows 1-3 captured; homeowner and contractor confirmation status recorded.
- [ ] First Roofer Appointment Readiness Command Packet: appointment readiness decision PASS; selected manual appointment window recorded; homeowner and contractor window confirmed status recorded.
- [ ] First Roofer Appointment Outcome Command Packet: outcome classification completed; manual outcome state OUTCOME READY FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); homeowner/contractor follow-up status worksheets from outcome captured; reschedule/estimate/next-step flags recorded.
- [ ] Follow-Up Cadence Packet reviewed for the manual follow-up status definitions and channel rules that will be used.
- [ ] Appointment Outcome Packet (paid launch) reviewed for the outcome categories and follow-up tie-in fields that align with this roofer packet.
- [ ] Booking Preferences Packet reviewed for any manual constraints relevant to follow-up type or timing.
- [ ] Reporting Preferences Packet reviewed for the end-of-day and handoff reporting expectations.
- [ ] Contact permission status: granted (or explicit handling for pending/unknown recorded under HOLD rules).
- [ ] Contractor match identified and service-area fit assessed (from lead-to-inspection, manual comm, inspection coordination, appointment readiness, or appointment outcome packets).
- [ ] Follow-up owner identified or assignable for this lead.
- [ ] No production activation flags are true; all dry-run flags confirmed.
- [ ] Agent product quality gate has been run for the current workspace.
- [ ] This packet is being used only for manual founder/operator review and manual coordination rehearsal.

Lead manual follow-up prerequisites template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Photos present: yes/no/unknown
- Insurance involvement: yes / no / unknown
- Insurance involvement: yes/no/unknown
- Contact permission status: granted / pending / unknown / do-not-contact
- Homeowner preferred channel: SMS / phone / email / unknown
- Contractor match (from prior packet): ____________________
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Prior manual outcome state (from appointment outcome packet): DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Reschedule needed (from prior): yes / no / unknown
- Estimate requested (from prior): yes / no / unknown
- Next-step needed (from prior): yes / no / unknown
- Follow-up needed (from prior): yes / no / unknown
- Follow-up owner assignable: yes / no
- Appointment outcome packet reference / timestamp: ____________________
- Follow-up cadence packet reviewed for manual follow-up status: yes / no
- Appointment outcome packet (paid) reviewed for alignment: yes / no
- Booking preferences reviewed for this lead: yes / no
- Reporting preferences packet reviewed for end-of-day: yes / no
- Manual follow-up prerequisites status: PASS / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

If any prerequisite is not met or prior packet shows HOLD/BLOCKED without clearance, apply HOLD rules immediately and do not proceed to follow-up preparation.

## Lead manual follow-up intake checklist

Use this checklist for every lead entering manual follow-up preparation. Mark explicitly. This is the entry gate after appointment outcome.

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
- [ ] Contractor match recorded
- [ ] Contractor service-area fit: yes / no / hold
- [ ] Prior appointment outcome recorded (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED)
- [ ] Prior manual outcome state: OUTCOME READY FOR MANUAL FOLLOW-UP (or HOLD/BLOCKED cleared)
- [ ] Reschedule needed: yes / no / unknown
- [ ] Estimate requested: yes / no / unknown
- [ ] Next-step needed: yes / no / unknown
- [ ] Follow-up needed: yes / no / unknown
- [ ] Follow-up owner assigned
- [ ] Follow-up type identified (reschedule / estimate / next-step / recovery / other)
- [ ] Homeowner manual follow-up preparation worksheet completed
- [ ] Contractor manual follow-up preparation worksheet completed
- [ ] Reschedule follow-up preparation worksheet completed (if applicable)
- [ ] Estimate / next-step follow-up preparation worksheet completed (if applicable)
- [ ] No-show / unable-to-access follow-up preparation worksheet completed (if applicable)
- [ ] Completed inspection follow-up preparation worksheet completed (if applicable)
- [ ] Cancelled / hold / blocked follow-up worksheet completed (if applicable)
- [ ] Manual follow-up draft prepared: yes / no
- [ ] Manual follow-up reviewed: yes / no
- [ ] Manual follow-up approved: yes / no
- [ ] Manual follow-up decision: PASS / HOLD / BLOCKED
- [ ] Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- [ ] Calendar booking performed: no
- [ ] External notification sent: no
- [ ] Production system touched: no
- [ ] Follow-up sent: no
- [ ] Founder/operator notes: ____________________
- [ ] Next manual action: ____________________

If contact permission status is not "granted" or is "do-not-contact", immediately apply HOLD / BLOCKED rules. Do not prepare follow-up that would imply contact without explicit consent clearance.

## Follow-up ownership worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Follow-Up Ownership Worksheet (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Urgency: ____________________
- Damage description: ____________________
- Photos present: yes / no / unknown
- Photos present: yes/no/unknown
- Insurance involvement: yes / no / unknown
- Insurance involvement: yes/no/unknown
- Contact permission status: ____________________
- Homeowner preferred channel: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Manual outcome classification (from prior): ____________________
- Manual outcome state (from prior): ____________________
- Follow-up needed: yes / no / unknown
- Follow-up owner (founder/operator name): ____________________
- Follow-up type: RESCHEDULE / ESTIMATE / NEXT-STEP / RECOVERY (NO-SHOW/ACCESS) / COMPLETED INSPECTION / CANCELLED / OTHER
- Proposed manual follow-up channel (phone / email / text outside system): ____________________
- Proposed manual follow-up timing (e.g., "within 24h" or "after estimate review"): ____________________
- Follow-up notes (specific questions or next steps for manual action): ____________________
- Homeowner follow-up status (link to preparation worksheet): ____________________
- Contractor follow-up status (link to preparation worksheet): ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Homeowner manual follow-up preparation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Homeowner Manual Follow-Up Preparation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Follow-up needed: yes / no / unknown
- Homeowner preferred channel: ____________________
- Contact permission status: ____________________
- Manual follow-up draft (internal text only, never sent by packet): ____________________
- Key points to cover in manual follow-up (e.g., reschedule options, estimate status, next steps): ____________________
- Proposed manual follow-up timing: ____________________
- Reschedule needed: yes / no / unknown
- Estimate requested: yes / no / unknown
- Next-step needed: yes / no / unknown
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Contractor manual follow-up preparation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Contractor Manual Follow-Up Preparation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: ____________________
- Follow-up needed: yes / no / unknown
- Contractor follow-up type: RESCHEDULE / ESTIMATE PREP / REPORT / OTHER
- Proposed manual follow-up channel (phone / email / text outside system): ____________________
- Proposed manual follow-up timing: ____________________
- Key points for contractor (e.g., reschedule availability, estimate details, access notes): ____________________
- Reschedule needed: yes / no / unknown
- Estimate requested: yes / no / unknown
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes (include any re-check of service-area fit): ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Reschedule follow-up preparation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Reschedule Follow-Up Preparation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: RESCHEDULE NEEDED
- Original selected manual appointment window: ____________________
- Reschedule reason (homeowner request / contractor request / access / weather / other): ____________________
- Proposed new manual appointment window options (1-3):
  1. ____________________
  2. ____________________
  3. ____________________
- Homeowner follow-up preparation status (link): ____________________
- Contractor follow-up preparation status (link): ____________________
- Follow-up owner: ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Estimate / next-step follow-up preparation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Estimate / Next-Step Follow-Up Preparation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Estimate requested: yes / no / unknown
- Estimate prepared (internal draft only, never sent by packet): yes / no
- Estimate draft location / notes (internal only): ____________________
- Next manual step for founder/operator (e.g., "call homeowner with estimate", "text contractor for material quote", "schedule site revisit"): ____________________
- Next-step needed: yes / no / unknown
- Homeowner follow-up preparation status (link): ____________________
- Contractor follow-up preparation status (link): ____________________
- Reporting tie-in notes (for use with Reporting Preferences Packet): ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## No-show / unable-to-access follow-up preparation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

No-show / Unable-to-Access Follow-Up Preparation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: NO-SHOW / UNABLE TO ACCESS
- No-show party (homeowner / contractor / both): ____________________
- Unable-to-access details (locked gate, no answer, safety concern, incorrect address, other): ____________________
- Reschedule needed: yes / no / unknown
- Proposed recovery steps (manual only): ____________________
- Homeowner follow-up preparation status (link): ____________________
- Contractor follow-up preparation status (link): ____________________
- Follow-up owner: ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Completed inspection follow-up preparation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Completed Inspection Follow-Up Preparation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: COMPLETED
- Inspection completed: yes
- Damage / roof condition observed (manual summary from outside system notes): ____________________
- Photos taken during visit: yes / no / unknown
- Insurance claim details captured (if applicable): ____________________
- Estimate requested: yes / no / unknown
- Estimate amount discussed (if known, internal note only): ____________________
- Next manual step (e.g., "prepare estimate draft for manual send" or "schedule follow-up call"): ____________________
- Homeowner follow-up preparation status (link): ____________________
- Contractor follow-up preparation status (link): ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Cancelled / hold / blocked follow-up worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send, book, notify, calendar, or touch production systems. Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Cancelled / Hold / Blocked Follow-Up Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: CANCELLED / HOLD / BLOCKED
- Cancellation / hold / blocked reason (explicit): ____________________
- Follow-up needed despite status: yes / no / unknown
- Recovery or escalation path (manual only): ____________________
- Homeowner follow-up preparation status (if applicable): ____________________
- Contractor follow-up preparation status (if applicable): ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Founder/operator notes (include escalation if BLOCKED): ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

## Manual follow-up approval states

All follow-up preparation and classification items use one of these manual approval states. States are recorded by the founder/operator only. No automation changes state.

- DRAFT: initial internal follow-up notes and drafts captured by founder/operator. Not reviewed. Not ready for any external action.
- REVIEWED: founder/operator has reviewed for completeness, consent, follow-up ownership clarity, and safety. Follow-up prep is internally consistent but not yet approved for manual follow-up use.
- APPROVED FOR MANUAL FOLLOW-UP: founder/operator has explicitly approved the follow-up preparation for manual follow-up execution outside the system (e.g., copy details to phone or notes for a manual call by the human operator only). Still requires Follow-up sent: no and production system touched: no until the human actually performs the follow-up.
- HOLD: blocked by missing follow-up owner, incomplete outcome details, conflicting next steps, consent, or founder review requirement. No external use permitted.
- BLOCKED: safety, consent violation, spam risk, production activation risk, credential exposure, or forbidden language detected. Immediate stop. Requires production gates + safe readiness re-run and explicit founder clearance.

Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED

Manual owner: founder/operator (name recorded)

Calendar booking performed: no

External notification sent: no

Production system touched: no

Follow-up sent: no

## Manual follow-up HOLD / BLOCKED rules

Apply these rules manually before any follow-up preparation leaves DRAFT or REVIEWED state.

### Manual follow-up HOLD due to missing follow-up owner

- If the follow-up ownership worksheet does not show a clear follow-up owner (founder/operator name): set state to HOLD. Record "Manual follow-up HOLD due to missing follow-up owner".
- If follow-up needed = yes but no owner assigned on either homeowner or contractor preparation: set state to HOLD. Record "Manual follow-up HOLD due to missing follow-up owner".
- HOLD for missing follow-up owner must be reviewed at every end-of-day manual follow-up report. It does not auto-clear.
- Only when a follow-up owner is explicitly recorded may the preparation advance to APPROVED FOR MANUAL FOLLOW-UP.

### Manual follow-up HOLD due to incomplete outcome details

- If prior appointment outcome details (inspection completed, present flags, reschedule/estimate flags) are missing or inconsistent with the intake from the Appointment Outcome Command Packet: set state to HOLD. Record "Manual follow-up HOLD due to incomplete outcome details".
- If homeowner or contractor manual follow-up preparation worksheets are incomplete (no draft notes or no proposed manual channel): set state to HOLD. Record "Manual follow-up HOLD due to incomplete outcome details".
- HOLD for incomplete outcome details must be reviewed before advancing to APPROVED FOR MANUAL FOLLOW-UP.

### Manual follow-up HOLD due to conflicting next steps

- If reschedule needed = yes and estimate requested = yes with no priority or sequencing noted: set state to HOLD. Record "Manual follow-up HOLD due to conflicting next steps".
- If proposed new manual appointment windows conflict with other recorded next steps and no resolution is noted: set state to HOLD. Record "Manual follow-up HOLD due to conflicting next steps".
- HOLD for conflicting next steps must be reviewed before advancing to APPROVED FOR MANUAL FOLLOW-UP.

### Manual follow-up BLOCKED due to consent/safety/production activation risk

- If contact permission status is "do-not-contact" or "pending" with no explicit grant and follow-up preparation would trigger contact: set state to BLOCKED immediately. Record "Manual follow-up BLOCKED due to consent/safety/production activation risk".
- If any prior note or source indicates spam complaint, opt-out, legal hold, or safety incident at the property: set state to BLOCKED. Log in decision log and escalation section.
- If any sign of production system activation, live flag change, credential exposure, or external send attempt during the session: set state to BLOCKED. Full stop. Re-run production gates and safe readiness. Escalate to founder.
- BLOCKED items are reviewed at end-of-day escalation slot; they do not advance to APPROVED FOR MANUAL FOLLOW-UP.

## No-send / no-calendar / no-booking safety rules

- This packet records Calendar booking performed: no on every follow-up worksheet, tracker, and report.
- This packet records External notification sent: no on every follow-up worksheet, tracker, and report.
- This packet records Production system touched: no on every follow-up worksheet, tracker, and report.
- This packet records Follow-up sent: no on every follow-up worksheet, tracker, and report.
- The packet contains no code, no routes, no send functions, no calendar functions, no automation.
- The packet must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- The packet helps the founder/operator manually prepare follow-up after appointment/inspection outcomes and manual coordination so the founder/operator can later manually perform follow-up and prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.
- Any real-world follow-up, reschedule coordination, estimate delivery, or notification must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never send, book, notify, calendar, or touch production systems.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no automated follow-up, and no production route activation are permitted or performed by this packet.

## Manual follow-up tracker

Maintain a simple manual tracker (notes, spreadsheet, or printed table) for all leads with follow-up preparation this session. Update after every classification or state change.

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
- Contractor match
- Contractor service-area fit
- Prior appointment outcome
- Reschedule needed: yes/no/unknown
- Estimate requested: yes/no/unknown
- Next-step needed: yes/no/unknown
- Follow-up needed: yes/no/unknown
- Follow-up owner
- Follow-up type
- Manual follow-up draft prepared: yes/no
- Manual follow-up reviewed: yes/no
- Manual follow-up approved: yes/no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Homeowner manual follow-up preparation summary
- Contractor manual follow-up preparation summary
- Manual owner: founder/operator
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no
- Follow-up notes
- Next manual action
- Last updated timestamp

The tracker is updated manually only. It feeds the end-of-day manual follow-up report and handoff notes.

## Founder/operator follow-up decision log

Every lead must have an explicit manual follow-up decision logged before the preparation is considered complete for the session.

Decision options (tied to Founder-Led Launch Program):
- PASS — APPROVED FOR MANUAL FOLLOW-UP: follow-up preparation complete; ownership clear; drafts reviewed; ready for founder/operator to perform manual follow-up outside the system.
- HOLD FOR MISSING FOLLOW-UP OWNER: follow-up owner not recorded; assign owner before advancing.
- HOLD FOR INCOMPLETE OUTCOME DETAILS: missing or inconsistent details from appointment outcome; complete before advancing.
- HOLD FOR CONFLICTING NEXT STEPS: reschedule + estimate or window conflicts without priority; resolve before advancing.
- BLOCKED FOR CONSENT / SAFETY / PRODUCTION RISK: consent, safety, or production activation issue detected; do not proceed with follow-up.
- CANCELLED / NO FURTHER FOLLOW-UP: lead cancelled or explicitly no follow-up needed; log and remove from active tracker.

Founder/Operator Follow-Up Decision Log entry (required fields):
- Lead ID:
- Homeowner name:
- Property address:
- Decision: (exact option above)
- Reason: (references worksheets, intake checklist, HOLD/BLOCKED rules, completeness)
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Evidence reviewed (worksheets + prior packet decisions + outcome classification):
- Open questions:
- Founder/operator notes:
- Manual next action:
- Owner:
- Timestamp:
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Follow-up sent: no

This log is the source for the manual follow-up tracker updates and end-of-day report.

## End-of-day manual follow-up report

Fill this at close of day. Save alongside filled decision logs, tracker, and worksheets.

End-of-Day Manual Follow-Up Report — First Roofer Manual Follow-Up Command Packet

- Source of truth commit: 324062c (or current worktree note)
- Execution day / session date:
- Founder/operator:
- Total leads with follow-up preparation:
- Leads with PASS — APPROVED FOR MANUAL FOLLOW-UP:
- Leads with HOLD (by category: missing follow-up owner / incomplete outcome details / conflicting next steps):
- Leads BLOCKED (by reason):
- Leads with reschedule follow-up prep:
- Leads with estimate / next-step follow-up prep:
- Leads with no-show / unable-to-access follow-up prep:
- Leads with completed inspection follow-up prep:
- Leads with cancelled / hold / blocked follow-up handling:
- Follow-up owners assigned (count and names):
- Manual follow-up states at close (DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED counts):
- Production sends/writes/routes activated: no
- External notifications sent: no
- Calendar booking performed across all: no
- External notification sent across all: no
- Production system touched across all: no
- Follow-up sent across all: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Explicit no-live-send / no-live-booking / no-live-automation confirmation: yes (see Purpose section)
- Follow-up themes (summary, e.g., repeated reschedule patterns, common estimate delays):
- Recommended next manual action or build improvement:
- Handoff notes location:

Next-action categories (use these):
1. Improve lead manual follow-up intake checklist or ownership worksheet.
2. Improve homeowner or contractor manual follow-up preparation worksheets.
3. Improve reschedule / estimate / next-step / no-show / completed / cancelled follow-up worksheets.
4. Improve manual follow-up approval decision worksheet or approval states.
5. Improve HOLD / BLOCKED rules or decision log.
6. Improve manual follow-up tracker or end-of-day report.
7. Escalate safety blocker before any further execution.

## Handoff notes for the next operator session

At end of day, leave these notes for the next founder/operator session (internal only).

Handoff Notes — First Roofer Manual Follow-Up Command Packet

- Date / session:
- Owner completing handoff:
- Tracker status (summary of active leads and states):
- Leads still in DRAFT or REVIEWED follow-up state (Lead IDs + follow-up type):
- Leads with APPROVED FOR MANUAL FOLLOW-UP but follow-up not yet performed outside system (Lead IDs + next manual step):
- Leads on HOLD (missing follow-up owner / incomplete outcome details / conflicting next steps) with owner/timestamp and reason:
- BLOCKED leads and escalation status:
- Key themes or repeated questions from the day (follow-up patterns, ownership, reschedule/estimate conflicts):
- Any open same-day escalation items:
- Files / notes location for filled logs, tracker, and worksheets:
- Dry-run flag confirmation at close: all false, no production activation, Calendar booking performed: no for all, external notification sent: no for all, production system touched: no for all, Follow-up sent: no for all
- dry-run flag confirmation: confirmed (WORKSPACE_MODE=dry-run and all activation flags false)
- Recommended first action for next session:
- Timestamp:

## Explicit no-live-send / no-live-booking / no-live-automation confirmation

This packet:
- Is internal-only for all worksheets and templates.
- Records Calendar booking performed: no on every follow-up, worksheet, and report.
- Records External notification sent: no on every follow-up, worksheet, and report.
- Records Production system touched: no on every follow-up, worksheet, and report.
- Records Follow-up sent: no on every follow-up, worksheet, and report.
- Contains no code, no routes, no send functions, no calendar functions, no automation.
- Must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- Helps the founder/operator manually prepare, approve, track, and report follow-up after appointment/inspection outcomes so the founder/operator can later manually perform follow-up and prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no automated follow-up, and no production route activation are permitted or performed by this packet.

## Referenced Artifacts for Verification

- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md` (this document)
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md` (Agent Product Quality Gate)
- `scripts/run-first-roofer-manual-follow-up-command-packet-dry-run.sh`
- `backend/scripts/verify-first-roofer-manual-follow-up-command-packet-readonly.js`
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

No production activation, no external sends, no data mutation, no calendar, no booking, no follow-up automation. Manual founder/operator review and manual coordination only. Helps the founder/operator manually prepare follow-up after appointment/inspection outcomes to prepare to book inspections and book appointments via the Founder-Led Launch Program.

## PASS / HOLD / BLOCKED Summary (Packet Level)

Use the criteria in the dedicated sections above. The packet is PASS only when the full manual follow-up command packet is operationally usable for manual founder/operator preparation, approval, tracking, and reporting of follow-up after appointment/inspection outcomes for the first roofer execution path (after appointment outcome), with all required sections, concrete fillable fields, worksheets/templates (follow-up ownership, homeowner/contractor preparation, reschedule, estimate/next-step, no-show/unable-to-access, completed inspection, cancelled/hold/blocked, manual follow-up approval decision, HOLD templates for missing owner/incomplete details/conflicting steps, BLOCKED for consent/safety/prod risk), approval states (including APPROVED FOR MANUAL FOLLOW-UP), HOLD/BLOCKED rules, no-send/no-calendar/no-booking safety rules, tracker, decision log, end-of-day report, handoff, required business phrases present (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, draft-only, approved for manual follow-up, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no), forbidden phrases absent, explicit no-live-send / no-live-booking / no-live-automation / no production activation language, and complete wiring into aggregate, index, and both next-chat contexts.

## Required Business Language Confirmation

This packet uses only:
- Founder-Led Launch Program
- book inspections
- book appointments
- manual founder/operator review
- manual coordination only
- appointment outcome
- manual follow-up
- draft-only
- approved for manual follow-up
- Follow-up sent: no
- Calendar booking performed: no
- external notification sent: no
- production system touched: no

The list of prohibited legacy pilot/quota-style, job/revenue guarantee, and production activation language phrases (as defined in the quality gate and packet verifiers) is verified absent by the dedicated read-only verifier.
