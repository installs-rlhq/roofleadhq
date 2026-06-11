# First Roofer Estimate Prep Command Packet

## Purpose and safety posture

This packet creates the First Roofer Estimate Prep Command Packet for the Founder-Led Launch Program.

It provides the founder/operator with a self-contained, fillable operational packet to manually prepare estimate inputs after a lead has reached estimate / next-step readiness using the Estimate / Next-Step Readiness Command Packet (and prior packets in the chain: Appointment Outcome Command Packet and Manual Follow-Up Command Packet). It builds directly on the First Roofer Day-One Command Center, the First Roofer Manual Communication Command Packet, the First Roofer Inspection Coordination Command Packet, the First Roofer Appointment Readiness Command Packet, the First Roofer Appointment Outcome Command Packet, the First Roofer Manual Follow-Up Command Packet, the First Roofer Estimate / Next-Step Readiness Command Packet, the First Roofer Lead-to-Inspection Ops Pack, the First Roofer Execution Day Runbook, the First Paid Launch Follow-Up Cadence Packet, the First Paid Launch Appointment Outcome Packet, the First Paid Launch Booking Preferences Packet, the First Paid Launch Reporting Preferences Packet, the First Paid Launch Contractor Notification Packet, the First Paid Launch Manual Review Queue Packet, and the Agent Product Quality Gate.

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no estimate creation, no quote generation, no quote sending, no follow-up sending, no calendar booking, no notifications, no production system writes, no automated estimate, no quote automation, and no booking. It supports manual founder/operator review and manual coordination only. The packet helps the founder/operator manually convert "READY FOR MANUAL ESTIMATE PREP" or "READY FOR MANUAL NEXT STEP" into a structured, fillable, internal-only estimate-prep workspace: inspection notes, contractor notes, homeowner constraints, roof/damage details, photos, insurance context, scope assumptions, questions for contractor/homeowner, manual estimate prep owner, review status, HOLD/BLOCKED rules, reporting, and handoff — all without creating estimates, generating quotes, sending quotes, sending follow-ups, booking anything live, creating calendar events, writing production data, or activating any production system. All estimate prep decisions and worksheets remain internal until a founder/operator explicitly approves and performs any real-world manual estimate preparation, manual next-step coordination, or manual follow-up outside the system after explicit approval. The packet itself must never create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems.

Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation confirmation:
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
- No automated estimate preparation.
- No quote automation.
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually prepare to book inspections and book appointments and then manually capture outcomes, prepare manual follow-up, determine estimate / next-step readiness, and manually prepare estimate inputs. It does not create estimates, does not generate quotes, does not send quotes, does not send follow-ups, does not book anything live, does not create calendar events, does not write production data, and does not activate any production system.

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

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, no automated follow-up, no automated estimate, no quote automation, Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path. It follows the Agent Product Quality Gate. It consumes outputs from the Estimate / Next-Step Readiness Command Packet (and the Appointment Outcome Command Packet and the Manual Follow-Up Command Packet) and supports preparation for manual estimate prep and manual next-step coordination using the Follow-Up Cadence Packet, Appointment Outcome Packet, Booking Preferences Packet, Reporting Preferences Packet, Contractor Notification Packet, Manual Review Queue Packet, and the Day-One Command Center while remaining fully dry-run.

## Estimate prep command overview

The Estimate Prep Command Packet gives the founder/operator one place to manually prepare estimate inputs after a lead has reached estimate / next-step readiness (READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP):

- Confirm inputs from the Estimate / Next-Step Readiness Command Packet, the Appointment Outcome Command Packet, and the Manual Follow-Up Command Packet (and prior packets in the chain).
- Perform lead estimate prep intake checklist.
- Complete inspection notes capture worksheet.
- Complete contractor estimate-input worksheet.
- Complete homeowner constraints and preferences worksheet.
- Complete roof / damage / service-scope worksheet.
- Complete photos / insurance / documentation worksheet.
- Complete estimate assumptions and unknowns worksheet.
- Complete contractor questions worksheet.
- Complete homeowner questions worksheet.
- Complete manual estimate prep readiness worksheet.
- Apply the manual estimate prep approval decision worksheet.
- Apply explicit HOLD / BLOCKED rules for missing estimate prep owner, missing inspection notes, missing contractor notes, incomplete homeowner constraints, incomplete roof/damage/service-scope details, incomplete photos/insurance/documentation, unresolved estimate / next-step readiness state, unresolved contractor or homeowner questions, consent/safety, or production activation risk.
- Log founder/operator decisions in the founder/operator estimate prep decision log with PASS / HOLD / BLOCKED and DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW states.
- Track every lead in the estimate prep tracker with approval state, Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.
- Produce an end-of-day estimate prep report.
- Leave handoff notes for the next operator session.

All steps use "book inspections" / "book appointments" language only. The goal is to manually prepare estimate inputs after estimate / next-step readiness so that the founder/operator can later perform any needed manual estimate preparation, manual next-step coordination, or manual follow-up and prepare to book inspections and prepare to book appointments. Every worksheet and decision carries the explicit note that it is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable packet that can be printed or used in a working session to manually prepare estimate inputs (inspection notes, contractor notes, homeowner constraints, roof/damage/service-scope details, photos/insurance/documentation, estimate assumptions/unknowns, contractor/homeowner questions, estimate prep owner, review states, HOLD/BLOCKED decisions, reporting, and handoff) for multiple leads without any production systems, live sends, live booking, live notifications, live estimate creation, live quote generation/sends, or automated actions.

This packet references and builds on:
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

References for verification: first-roofer day-one command center, First Roofer Manual Communication Command Packet, First Roofer Inspection Coordination Command Packet, First Roofer Appointment Readiness Command Packet, First Roofer Appointment Outcome Command Packet, First Roofer Manual Follow-Up Command Packet, First Roofer Estimate / Next-Step Readiness Command Packet, Lead-to-Inspection Ops Pack, Execution Day Runbook, Follow-Up Cadence Packet, Appointment Outcome Packet, Booking Preferences Packet, Reporting Preferences Packet, Contractor Notification Packet, Manual Review Queue Packet, and Agent Product Quality Gate.

## Inputs from the Estimate / Next-Step Readiness Command Packet

This packet is the direct successor step after estimate / next-step readiness determination. Before using this packet for any lead, the founder/operator must have completed (or explicitly recorded status from) the Estimate / Next-Step Readiness Command Packet for the lead.

Required inputs consumed from Estimate / Next-Step Readiness Command Packet:
- Lead ID, homeowner name, property address, lead source, source detail, service type, urgency, damage description, photos present: yes/no/unknown, insurance involvement: yes/no/unknown.
- Contact permission status and homeowner preferred channel.
- Contractor match and contractor service-area fit.
- Prior appointment outcome (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED).
- Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED.
- Manual outcome state: DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED.
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED.
- Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED.
- Estimate readiness: READY / NEEDS INFO / HOLD / BLOCKED.
- Contractor next-step readiness: READY / NEEDS INFO / HOLD / BLOCKED.
- Manual estimate prep owner, manual contractor next-step owner, manual homeowner info owner.
- Reschedule needed: yes/no/unknown, estimate requested: yes/no/unknown, next-step needed: yes/no/unknown.
- Insurance / photos / damage details complete status from prior worksheets.
- Any noted manual next action or estimate prep notes from prior packet.
- Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no recorded in prior packet.

If the prior estimate / next-step state is not READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (or cleared), or if any prior HOLD/BLOCKED without documented clearance exists, immediately apply estimate prep HOLD or BLOCKED rules.

Lead estimate prep intake from estimate / next-step readiness template:
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
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Estimate readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Contractor next-step readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Manual estimate prep owner (from prior): ____________________
- Manual contractor next-step owner (from prior): ____________________
- Manual homeowner info owner (from prior): ____________________
- Reschedule needed: yes / no / unknown
- Estimate requested: yes / no / unknown
- Next-step needed: yes / no / unknown
- Insurance / photos / damage details complete (from prior): yes / no / unknown
- Prior packet reference / timestamp: ____________________
- Inputs from estimate / next-step readiness status: READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from the Appointment Outcome Command Packet

Required inputs consumed from Appointment Outcome Command Packet (via the estimate / next-step readiness packet or direct reference):
- Lead ID, homeowner name, property address, lead source, source detail, service type, urgency, damage description, photos present: yes/no/unknown, insurance involvement: yes/no/unknown.
- Contact permission status and homeowner preferred channel.
- Contractor match and contractor service-area fit.
- Prior appointment outcome (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED).
- Manual outcome classification and manual outcome state (including OUTCOME READY FOR MANUAL FOLLOW-UP).
- Homeowner follow-up status and contractor follow-up status from prior worksheets.
- Reschedule needed: yes/no/unknown, estimate requested: yes/no/unknown, next-step needed: yes/no/unknown.
- Selected manual appointment window and confirmation flags from prior.
- Inspection completed: yes / no / unknown
- Inspection completed: yes/no/unknown.
- Homeowner present: yes / no / unknown.
- Contractor present: yes / no / unknown.
- Access issue: yes / no / unknown.
- Damage / roof condition observed (manual summary from outside system notes).
- Photos taken during visit: yes / no / unknown.
- Insurance claim details captured (if applicable).
- Estimate amount discussed (if known, internal note only).
- Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no recorded in prior packet.
- Any noted manual next action or estimate prep notes from prior packet.

Lead estimate prep intake from appointment outcome template:
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
- Inspection completed: yes / no / unknown
- Inspection completed: yes/no/unknown
- Homeowner present: yes / no / unknown
- Contractor present: yes / no / unknown
- Access issue: yes / no / unknown
- Damage / roof condition observed (from prior): ____________________
- Photos taken during visit: yes / no / unknown
- Insurance claim details captured (from prior): ____________________
- Estimate requested: yes / no / unknown
- Estimate amount discussed (if known): ____________________
- Appointment outcome packet reference / timestamp: ____________________
- Inputs from appointment outcome status: OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from the Manual Follow-Up Command Packet

Required inputs consumed from Manual Follow-Up Command Packet (via the estimate / next-step readiness packet or direct reference):
- Lead ID, homeowner name, property address (reconfirmed).
- Follow-up needed: yes/no/unknown, follow-up owner, follow-up type.
- Manual follow-up draft prepared: yes/no, reviewed: yes/no, approved: yes/no.
- Manual follow-up decision: PASS/HOLD/BLOCKED.
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED.
- Reschedule follow-up preparation status (if applicable).
- Estimate / next-step follow-up preparation status (if applicable).
- No-show / unable-to-access follow-up preparation status (if applicable).
- Completed inspection follow-up preparation status (if applicable).
- Cancelled / hold / blocked follow-up handling status (if applicable).
- Homeowner and contractor follow-up preparation summaries and proposed manual channels/timing.
- Any noted conflicts, missing info, or escalation items from follow-up worksheets.
- Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no from follow-up packet.
- Follow-up owner and any re-assignment notes.
- Founder/operator notes and next manual action from follow-up decision log.

Lead estimate prep intake from manual follow-up template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Follow-up needed (from prior): yes / no / unknown
- Follow-up owner (from prior): ____________________
- Follow-up type (from prior): ____________________
- Manual follow-up draft prepared: yes / no
- Manual follow-up reviewed: yes / no
- Manual follow-up approved: yes / no
- Manual follow-up decision: PASS / HOLD / BLOCKED
- Manual follow-up decision: PASS/HOLD/BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Reschedule needed (from prior): yes / no / unknown
- Estimate requested (from prior): yes / no / unknown
- Next-step needed (from prior): yes / no / unknown
- Estimate / next-step follow-up prep summary (from prior): ____________________
- Homeowner follow-up prep summary (from prior): ____________________
- Contractor follow-up prep summary (from prior): ____________________
- Manual follow-up packet reference / timestamp: ____________________
- Inputs from manual follow-up status: APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Estimate prep prerequisites

Before using this packet for any lead, the founder/operator must confirm the following prerequisites from prior packets (mark explicitly). This packet does not replace those; it consumes their outputs for estimate prep.

- [ ] First Roofer Day-One Command Center has been reviewed for the lead.
- [ ] Lead-to-Inspection Ops Pack intake and decision log completed for the lead (or explicit reason recorded).
- [ ] First Roofer Execution Day Runbook followed for the execution day.
- [ ] First Roofer Manual Communication Command Packet: homeowner and contractor message drafts prepared, reviewed, and at least one marked APPROVED FOR MANUAL USE (or HOLD/BLOCKED status recorded with justification).
- [ ] First Roofer Inspection Coordination Command Packet: inspection coordination decision and inspection readiness decision reviewed; proposed inspection windows 1-3 captured; homeowner and contractor confirmation status recorded.
- [ ] First Roofer Appointment Readiness Command Packet: appointment readiness decision PASS; selected manual appointment window recorded; homeowner and contractor window confirmed status recorded.
- [ ] First Roofer Appointment Outcome Command Packet: outcome classification completed; manual outcome state OUTCOME READY FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); homeowner/contractor follow-up status worksheets from outcome captured; reschedule/estimate/next-step flags recorded.
- [ ] First Roofer Manual Follow-Up Command Packet: follow-up ownership completed; homeowner/contractor/reschedule/estimate/next-step/no-show/completed/cancelled follow-up preparation worksheets completed; manual follow-up state APPROVED FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); follow-up decision logged.
- [ ] First Roofer Estimate / Next-Step Readiness Command Packet: estimate / next-step readiness determination completed; estimate / next-step state READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (or explicit HOLD/BLOCKED with clearance); estimate readiness, contractor next-step readiness, manual estimate prep owner, manual contractor next-step owner, manual homeowner info owner, and insurance/photos/damage details worksheets captured.
- [ ] Follow-Up Cadence Packet reviewed for the manual follow-up status definitions and channel rules that will be used.
- [ ] Appointment Outcome Packet (paid launch) reviewed for the outcome categories and follow-up tie-in fields that align with this roofer packet.
- [ ] Booking Preferences Packet reviewed for any manual constraints relevant to estimate timing or next-step coordination.
- [ ] Reporting Preferences Packet reviewed for the end-of-day and handoff reporting expectations.
- [ ] Contractor Notification Packet reviewed for any manual contractor coordination expectations relevant to estimate prep.
- [ ] Manual Review Queue Packet reviewed for any manual review expectations that intersect with estimate prep decisions.
- [ ] Contact permission status: granted (or explicit handling for pending/unknown recorded under HOLD rules).
- [ ] Contractor match identified and service-area fit assessed (from lead-to-inspection, manual comm, inspection coordination, appointment readiness, appointment outcome, manual follow-up, or estimate / next-step readiness packets).
- [ ] Manual estimate prep owner assigned or explicitly noted as missing (from estimate / next-step readiness or assignable now).
- [ ] Inspection notes, contractor notes, homeowner constraints, roof/damage details, photos, insurance context, or documentation status confirmed from prior (or to be captured in this packet's worksheets).
- [ ] No production activation flags are true; all dry-run flags confirmed.
- [ ] Agent product quality gate has been run for the current workspace.
- [ ] This packet is being used only for manual founder/operator review and manual coordination rehearsal.

Lead estimate prep prerequisites template:
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
- Prior manual follow-up state (from manual follow-up packet): DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Prior estimate / next-step state (from estimate / next-step readiness packet): DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Estimate readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- Contractor next-step readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- Manual estimate prep owner (from prior or assigned now): ____________________
- Manual contractor next-step owner (from prior): ____________________
- Manual homeowner info owner (from prior): ____________________
- Reschedule needed (from prior): yes / no / unknown
- Estimate requested (from prior): yes / no / unknown
- Next-step needed (from prior): yes / no / unknown
- Inspection completed (from prior): yes / no / unknown
- Insurance / photos / damage details complete (from prior): yes / no / unknown
- Appointment outcome packet reference / timestamp: ____________________
- Manual follow-up packet reference / timestamp: ____________________
- Estimate / next-step readiness packet reference / timestamp: ____________________
- Follow-up cadence packet reviewed for manual follow-up status: yes / no
- Appointment outcome packet (paid) reviewed for alignment: yes / no
- Booking preferences reviewed for this lead: yes / no
- Reporting preferences packet reviewed for end-of-day: yes / no
- Contractor notification packet reviewed: yes / no
- Manual review queue packet reviewed: yes / no
- Estimate prep prerequisites status: PASS / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

If any prerequisite is not met or prior packet shows HOLD/BLOCKED without clearance, apply HOLD rules immediately and do not proceed to estimate prep.

## Lead estimate prep intake checklist

Use this checklist for every lead entering estimate prep. Mark explicitly. This is the entry gate after estimate / next-step readiness.

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
- [ ] Prior manual follow-up state: APPROVED FOR MANUAL FOLLOW-UP (or HOLD/BLOCKED cleared)
- [ ] Prior estimate / next-step state: READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (or HOLD/BLOCKED cleared)
- [ ] Estimate readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Contractor next-step readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Reschedule needed: yes / no / unknown
- [ ] Estimate requested: yes / no / unknown
- [ ] Next-step needed: yes / no / unknown
- [ ] Follow-up needed: yes / no / unknown
- [ ] Manual estimate prep owner assigned or explicitly noted as missing
- [ ] Manual contractor next-step owner assigned or explicitly noted as missing
- [ ] Manual homeowner info owner assigned or explicitly noted as missing
- [ ] Inspection completed: yes / no / unknown
- [ ] Inspection notes present: yes / no / unknown
- [ ] Contractor notes present: yes / no / unknown
- [ ] Homeowner constraints captured: yes / no / unknown
- [ ] Roof/damage details complete: yes / no / unknown
- [ ] Photos reviewed: yes / no / unknown
- [ ] Insurance context reviewed: yes / no / unknown
- [ ] Documentation complete: yes / no / unknown
- [ ] Estimate assumptions listed: yes / no
- [ ] Estimate unknowns listed: yes / no
- [ ] Contractor questions listed: yes / no
- [ ] Homeowner questions listed: yes / no
- [ ] Inspection notes capture worksheet completed
- [ ] Contractor estimate-input worksheet completed
- [ ] Homeowner constraints and preferences worksheet completed
- [ ] Roof / damage / service-scope worksheet completed
- [ ] Photos / insurance / documentation worksheet completed
- [ ] Estimate assumptions and unknowns worksheet completed
- [ ] Contractor questions worksheet completed
- [ ] Homeowner questions worksheet completed
- [ ] Manual estimate prep readiness worksheet completed
- [ ] Manual estimate prep readiness: READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Manual estimate prep decision: PASS/HOLD/BLOCKED
- [ ] Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- [ ] Estimate created: no
- [ ] Quote generated: no
- [ ] Quote sent: no
- [ ] Follow-up sent: no
- [ ] Calendar booking performed: no
- [ ] External notification sent: no
- [ ] Production system touched: no
- [ ] Founder/operator notes: ____________________
- [ ] Next manual action: ____________________

If contact permission status is not "granted" or is "do-not-contact", immediately apply HOLD / BLOCKED rules. Do not advance prep that would imply contact or coordination without explicit consent clearance.

## Inspection notes capture worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Inspection Notes Capture Worksheet (internal worksheet only)

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
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Estimate readiness (from prior): ____________________
- Contractor next-step readiness (from prior): ____________________
- Manual estimate prep owner: ____________________
- Inspection completed: yes / no / unknown
- Inspection completed: yes/no/unknown
- Inspection date / window (internal note): ____________________
- Inspector / attendee (founder/operator/contractor/homeowner): ____________________
- Key observations (roof condition, damage extent, access notes, measurements — internal only): ____________________
- Photos taken / referenced (list internal file refs or descriptions only): ____________________
- Additional inspection notes (internal only): ____________________
- Inspection notes present: yes / no / unknown
- Inspection notes capture complete: yes / no
- Manual estimate prep readiness (link to readiness worksheet): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Contractor estimate-input worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Contractor Estimate-Input Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Manual contractor next-step owner: ____________________
- Contractor notes present (from prior coordination or new capture): yes / no / unknown
- Contractor availability / capacity notes (internal only): ____________________
- Contractor material / scope preferences (internal only): ____________________
- Contractor pricing approach notes (internal only, never sent by packet): ____________________
- Contractor questions for clarification (link to contractor questions worksheet): ____________________
- Key points for estimate prep from contractor (e.g., scope assumptions, access constraints, material lead times): ____________________
- Contractor estimate-input complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes (include any re-check of service-area fit): ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Homeowner constraints and preferences worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Homeowner Constraints and Preferences Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Manual homeowner info owner: ____________________
- Homeowner constraints captured (from prior or new): yes / no / unknown
- Homeowner preferred channel: ____________________
- Contact permission status: ____________________
- Timing / access constraints (e.g., work hours, pets, neighbors, parking): ____________________
- Budget / insurance constraints (internal note only): ____________________
- Aesthetic / material preferences (internal note only): ____________________
- Decision-maker notes (who must approve, co-owner, etc.): ____________________
- Homeowner questions for clarification (link to homeowner questions worksheet): ____________________
- Key points for estimate prep from homeowner: ____________________
- Homeowner constraints and preferences complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Roof / damage / service-scope worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Roof / Damage / Service-Scope Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Roof/damage details complete (from prior or new): yes / no / unknown
- Roof type / age / condition (internal note): ____________________
- Damage description / extent (internal note, e.g., "hail impact on north slope, 12 squares"): ____________________
- Service type (inspection / repair / replacement / storm response / other): ____________________
- Scope assumptions (internal only): ____________________
- Service-scope unknowns (internal only): ____________________
- Access / safety notes (internal only): ____________________
- Measurements / counts (internal only, e.g., squares, layers, penetrations): ____________________
- Roof / damage / service-scope complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Photos / insurance / documentation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Photos / Insurance / Documentation Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Photos reviewed: yes / no / unknown
- Insurance context reviewed: yes / no / unknown
- Documentation complete: yes / no / unknown
- Photos present: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Insurance claim number / carrier / status (internal note only): ____________________
- Key photo descriptions / refs (internal only, never embedded as production data): ____________________
- Additional documentation needed (internal list): ____________________
- Photos / insurance / documentation complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Estimate assumptions and unknowns worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Estimate Assumptions and Unknowns Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual estimate prep owner: ____________________
- Estimate assumptions listed: yes / no
- Estimate unknowns listed: yes / no
- List of estimate assumptions (internal only, e.g., "assume 3-tab shingles, standard underlayment, no decking replacement"): ____________________
- List of estimate unknowns (internal only, e.g., "decking condition under existing layers unknown until tear-off"): ____________________
- Scope boundaries / exclusions (internal only): ____________________
- Risk / contingency notes (internal only): ____________________
- Estimate assumptions and unknowns complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Contractor questions worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Contractor Questions Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual estimate prep owner: ____________________
- Manual contractor next-step owner: ____________________
- Contractor questions listed: yes / no
- List of questions for contractor (internal only, e.g., "preferred underlayment brand? lead time on architectural shingles?"): ____________________
- Proposed manual contact method for questions (phone / email / text outside system): ____________________
- Proposed timing for questions: ____________________
- Contractor questions complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Homeowner questions worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Homeowner Questions Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual estimate prep owner: ____________________
- Manual homeowner info owner: ____________________
- Homeowner questions listed: yes / no
- List of questions for homeowner (internal only, e.g., "confirm insurance claim number? preferred start window? any HOA restrictions?"): ____________________
- Proposed manual contact method for questions (phone / email / text outside system): ____________________
- Proposed timing for questions: ____________________
- Homeowner questions complete: yes / no
- Manual estimate prep readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual estimate prep readiness worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Manual Estimate Prep Readiness Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual estimate prep owner: ____________________
- Manual contractor next-step owner: ____________________
- Manual homeowner info owner: ____________________
- All prior worksheets completed (inspection notes, contractor estimate-input, homeowner constraints, roof/damage/service-scope, photos/insurance/documentation, assumptions/unknowns, contractor questions, homeowner questions): yes / no
- Inspection notes present: yes / no / unknown
- Contractor notes present: yes / no / unknown
- Homeowner constraints captured: yes / no / unknown
- Roof/damage details complete: yes / no / unknown
- Photos reviewed: yes / no / unknown
- Insurance context reviewed: yes / no / unknown
- Documentation complete: yes / no / unknown
- Estimate assumptions listed: yes / no
- Estimate unknowns listed: yes / no
- Contractor questions listed: yes / no
- Homeowner questions listed: yes / no
- Estimate / next-step state (from prior): READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Manual estimate prep readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Manual estimate prep decision: PASS / HOLD / BLOCKED
- Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Reason / evidence (one sentence minimum, referencing all completed worksheets, intake checklist, and HOLD/BLOCKED rules):
- Proposed manual next step (e.g., "founder to prepare internal estimate draft from these notes for founder review", "operator to contact contractor with questions list", "prepare homeowner questions for manual call"):
- Manual next action (explicit):
- Owner: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual estimate prep approval states

All estimate prep items use one of these manual approval states. States are recorded by the founder/operator only. No automation changes state.

- DRAFT: initial internal estimate prep notes and worksheets captured by founder/operator. Not reviewed. Not ready for any external action.
- REVIEWED: founder/operator has reviewed for completeness, consent, ownership clarity (manual estimate prep owner), and safety. Estimate prep is internally consistent but not yet approved for founder or contractor review.
- READY FOR FOUNDER REVIEW: founder/operator has explicitly approved the estimate prep for manual founder review outside the system (e.g., copy worksheets to notes for founder to review the internal prep materials only). Still requires Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, and production system touched: no until the human actually performs any real-world estimate work.
- READY FOR CONTRACTOR REVIEW: founder/operator has explicitly approved the estimate prep for manual contractor review / input outside the system (e.g., share questions or scope notes via manual channel only). Still requires Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, and production system touched: no until the human actually performs the coordination.
- HOLD: blocked by missing estimate prep owner, missing inspection notes, missing contractor notes, incomplete homeowner constraints, incomplete roof/damage/service-scope details, incomplete photos/insurance/documentation, unresolved estimate / next-step readiness state, unresolved contractor or homeowner questions, consent, or founder review requirement. No external use permitted.
- BLOCKED: safety, consent violation, spam risk, production activation risk, credential exposure, or forbidden language detected. Immediate stop. Requires production gates + safe readiness re-run and explicit founder clearance.

Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED

Manual owner: founder/operator (name recorded)

Estimate created: no

Quote generated: no

Quote sent: no

Follow-up sent: no

Calendar booking performed: no

External notification sent: no

Production system touched: no

## Manual estimate prep HOLD / BLOCKED rules

Apply these rules manually before any estimate prep leaves DRAFT or REVIEWED state.

### HOLD due to missing estimate prep owner

- If the manual estimate prep readiness worksheet does not show a clear manual estimate prep owner (founder/operator name): set state to HOLD. Record "HOLD due to missing estimate prep owner".
- If estimate requested = yes (from prior) but no estimate prep owner assigned: set state to HOLD. Record "HOLD due to missing estimate prep owner".
- HOLD for missing estimate prep owner must be reviewed at every end-of-day estimate prep report. It does not auto-clear.
- Only when an estimate prep owner is explicitly recorded may the preparation advance to READY FOR FOUNDER REVIEW or READY FOR CONTRACTOR REVIEW.

### HOLD due to missing inspection notes

- If inspection notes capture worksheet shows inspection notes present = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to missing inspection notes".
- If inspection completed = yes but no inspection notes captured: set state to HOLD. Record "HOLD due to missing inspection notes".
- HOLD for missing inspection notes must be reviewed before advancing to READY states.

### HOLD due to missing contractor notes

- If contractor estimate-input worksheet shows contractor notes present = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to missing contractor notes".
- If contractor next-step readiness = READY but no contractor notes captured: set state to HOLD. Record "HOLD due to missing contractor notes".
- HOLD for missing contractor notes must be reviewed before advancing to READY states.

### HOLD due to incomplete homeowner constraints

- If homeowner constraints and preferences worksheet shows homeowner constraints captured = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete homeowner constraints".
- If contact permission or preferred channel is missing or inconsistent with prior packets: set state to HOLD. Record "HOLD due to incomplete homeowner constraints".
- HOLD for incomplete homeowner constraints must be reviewed before advancing to READY states.

### HOLD due to incomplete roof/damage/service-scope details

- If roof / damage / service-scope worksheet shows roof/damage details complete = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete roof/damage/service-scope details".
- If damage description or service type is missing or inconsistent with prior packets: set state to HOLD. Record "HOLD due to incomplete roof/damage/service-scope details".
- HOLD for incomplete roof/damage/service-scope details must be reviewed before advancing to READY states.

### HOLD due to incomplete photos/insurance/documentation

- If photos / insurance / documentation worksheet shows photos reviewed = no/unknown or insurance context reviewed = no/unknown or documentation complete = no with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete photos/insurance/documentation".
- If photos present = yes/unknown or insurance involvement = yes with no details captured: set state to HOLD. Record "HOLD due to incomplete photos/insurance/documentation".
- HOLD for incomplete photos/insurance/documentation must be reviewed before advancing to READY states.

### HOLD due to unresolved estimate / next-step readiness state

- If prior estimate / next-step state is not READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (without explicit clearance documented): set state to HOLD. Record "HOLD due to unresolved estimate / next-step readiness state".
- If any prior HOLD/BLOCKED from estimate / next-step readiness, manual follow-up, or appointment outcome packets remains uncleared: set state to HOLD. Record "HOLD due to unresolved estimate / next-step readiness state".
- HOLD for unresolved prior state must be reviewed before advancing.

### HOLD due to unresolved contractor or homeowner questions

- If contractor questions worksheet or homeowner questions worksheet shows questions listed = yes but no resolution plan or owner noted: set state to HOLD. Record "HOLD due to unresolved contractor or homeowner questions".
- If questions are material to estimate prep and remain open: set state to HOLD. Record "HOLD due to unresolved contractor or homeowner questions".
- HOLD for unresolved contractor or homeowner questions must be reviewed before advancing to READY states.

### BLOCKED due to consent/safety/production activation risk

- If contact permission status is "do-not-contact" or "pending" with no explicit grant and estimate prep would trigger contact or coordination: set state to BLOCKED immediately. Record "BLOCKED due to consent/safety/production activation risk".
- If any prior note or source indicates spam complaint, opt-out, legal hold, or safety incident at the property: set state to BLOCKED. Log in decision log and escalation section.
- If any sign of production system activation, live flag change, credential exposure, or external send/estimate/quote attempt during the session: set state to BLOCKED. Full stop. Re-run production gates and safe readiness. Escalate to founder.
- BLOCKED items are reviewed at end-of-day escalation slot; they do not advance to READY states.

## No-estimate-create / no-quote-send / no-calendar / no-booking safety rules

- This packet records Estimate created: no on every worksheet, tracker, and report.
- This packet records Quote generated: no on every worksheet, tracker, and report.
- This packet records Quote sent: no on every worksheet, tracker, and report.
- This packet records Follow-up sent: no on every worksheet, tracker, and report.
- This packet records Calendar booking performed: no on every worksheet, tracker, and report.
- This packet records External notification sent: no on every worksheet, tracker, and report.
- This packet records Production system touched: no on every worksheet, tracker, and report.
- The packet contains no code, no routes, no send functions, no calendar functions, no estimate creation functions, no quote functions, no automation.
- The packet must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- The packet helps the founder/operator manually prepare estimate inputs after estimate / next-step readiness (READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP) so the founder/operator can later manually perform estimate prep, next-step coordination, follow-up, and prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.
- Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, reschedule, or booking must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no automated follow-up, no automated estimate preparation, no quote automation, and no production route activation are permitted or performed by this packet.

## Estimate prep tracker

Maintain a simple manual tracker (notes, spreadsheet, or printed table) for all leads with estimate prep this session. Update after every classification or state change.

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
- Manual estimate prep owner
- Manual contractor next-step owner
- Manual homeowner info owner
- Inspection notes present: yes/no/unknown
- Contractor notes present: yes/no/unknown
- Homeowner constraints captured: yes/no/unknown
- Roof/damage details complete: yes/no/unknown
- Photos reviewed: yes/no/unknown
- Insurance context reviewed: yes/no/unknown
- Documentation complete: yes/no/unknown
- Estimate assumptions listed: yes/no
- Estimate unknowns listed: yes/no
- Contractor questions listed: yes/no
- Homeowner questions listed: yes/no
- Manual estimate prep readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Manual estimate prep decision: PASS / HOLD / BLOCKED
- Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Estimate prep notes
- Next manual action
- Last updated timestamp

The tracker is updated manually only. It feeds the end-of-day estimate prep report and handoff notes.

## Founder/operator estimate prep decision log

Every lead must have an explicit manual estimate prep decision logged before the prep is considered complete for the session.

Decision options (tied to Founder-Led Launch Program):
- PASS — READY FOR FOUNDER REVIEW: estimate prep complete; ownership (manual estimate prep owner) clear; worksheets reviewed; ready for founder to review the internal prep materials outside the system.
- PASS — READY FOR CONTRACTOR REVIEW: contractor/homeowner questions and inputs ready; ownership clear; ready for manual contractor review/input outside the system.
- HOLD FOR MISSING ESTIMATE PREP OWNER: estimate prep owner not recorded; assign owner before advancing.
- HOLD FOR MISSING INSPECTION NOTES: inspection notes not captured; complete before advancing.
- HOLD FOR MISSING CONTRACTOR NOTES: contractor notes not captured; complete before advancing.
- HOLD FOR INCOMPLETE HOMEOWNER CONSTRAINTS: homeowner constraints incomplete; complete before advancing.
- HOLD FOR INCOMPLETE ROOF/DAMAGE/SERVICE-SCOPE DETAILS: roof/damage/service-scope details incomplete; complete before advancing.
- HOLD FOR INCOMPLETE PHOTOS/INSURANCE/DOCUMENTATION: photos/insurance/documentation incomplete; complete before advancing.
- HOLD FOR UNRESOLVED ESTIMATE / NEXT-STEP READINESS STATE: prior packet not at required ready state; clear before advancing.
- HOLD FOR UNRESOLVED CONTRACTOR OR HOMEOWNER QUESTIONS: open questions without plan; resolve before advancing.
- BLOCKED FOR CONSENT / SAFETY / PRODUCTION RISK: consent, safety, or production activation issue detected; do not proceed with estimate prep.
- CANCELLED / NO FURTHER ACTION: lead cancelled or explicitly no estimate prep needed; log and remove from active tracker.

Founder/Operator Estimate Prep Decision Log entry (required fields):
- Lead ID:
- Homeowner name:
- Property address:
- Decision: (exact option above)
- Reason: (references worksheets, intake checklist, HOLD/BLOCKED rules, completeness)
- Manual estimate prep decision: PASS / HOLD / BLOCKED
- Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Evidence reviewed (worksheets + prior packet decisions + outcome + follow-up + estimate/next-step readiness classification):
- Open questions:
- Founder/operator notes:
- Manual next action:
- Owner:
- Timestamp:
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

This log is the source for the estimate prep tracker updates and end-of-day report.

## End-of-day estimate prep report

Fill this at close of day. Save alongside filled decision logs, tracker, and worksheets.

End-of-Day Estimate Prep Report — First Roofer Estimate Prep Command Packet

- Source of truth commit: 21e1e11 (or current worktree note)
- Execution day / session date:
- Founder/operator:
- Total leads with estimate prep:
- Leads with PASS — READY FOR FOUNDER REVIEW:
- Leads with PASS — READY FOR CONTRACTOR REVIEW:
- Leads with HOLD (by category: missing estimate prep owner / missing inspection notes / missing contractor notes / incomplete homeowner constraints / incomplete roof/damage/service-scope details / incomplete photos/insurance/documentation / unresolved estimate / next-step readiness state / unresolved contractor or homeowner questions):
- Leads BLOCKED (by reason):
- Leads with inspection notes captured:
- Leads with contractor estimate-input captured:
- Leads with homeowner constraints captured:
- Leads with roof/damage/service-scope captured:
- Leads with photos/insurance/documentation captured:
- Leads with assumptions/unknowns listed:
- Leads with contractor questions listed:
- Leads with homeowner questions listed:
- Manual estimate prep owners assigned (count and names):
- Manual estimate prep states at close (DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED counts):
- Production sends/writes/routes activated: no
- External notifications sent: no
- Estimate created across all: no
- Quote generated across all: no
- Quote sent across all: no
- Follow-up sent across all: no
- Calendar booking performed across all: no
- External notification sent across all: no
- Production system touched across all: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation: yes (see Purpose section)
- Estimate prep themes (summary, e.g., repeated missing photo patterns, common contractor note gaps):
- Recommended next manual action or build improvement:
- Handoff notes location:

Next-action categories (use these):
1. Improve lead estimate prep intake checklist or inspection notes capture worksheet.
2. Improve contractor estimate-input or homeowner constraints and preferences worksheets.
3. Improve roof / damage / service-scope or photos / insurance / documentation worksheets.
4. Improve estimate assumptions and unknowns, contractor questions, or homeowner questions worksheets.
5. Improve manual estimate prep readiness decision worksheet or approval states.
6. Improve HOLD / BLOCKED rules or decision log.
7. Improve estimate prep tracker or end-of-day report.
8. Escalate safety blocker before any further execution.

## Handoff notes for the next operator session

At end of day, leave these notes for the next founder/operator session (internal only).

Handoff Notes — First Roofer Estimate Prep Command Packet

- Date / session:
- Owner completing handoff:
- Tracker status (summary of active leads and states):
- Leads still in DRAFT or REVIEWED estimate prep state (Lead IDs + prep type):
- Leads with READY FOR FOUNDER REVIEW but founder review not yet performed outside system (Lead IDs + next manual step):
- Leads with READY FOR CONTRACTOR REVIEW but contractor review/input not yet performed outside system (Lead IDs + next manual step):
- Leads on HOLD (missing estimate prep owner / missing inspection notes / missing contractor notes / incomplete homeowner constraints / incomplete roof/damage/service-scope details / incomplete photos/insurance/documentation / unresolved estimate / next-step readiness state / unresolved contractor or homeowner questions) with owner/timestamp and reason:
- BLOCKED leads and escalation status:
- Key themes or repeated questions from the day (estimate prep patterns, ownership gaps, photo/insurance blockers, scope assumption gaps):
- Any open same-day escalation items:
- Files / notes location for filled logs, tracker, and worksheets:
- Dry-run flag confirmation at close: all false, no production activation, Estimate created: no for all, Quote generated: no for all, Quote sent: no for all, Follow-up sent: no for all, Calendar booking performed: no for all, external notification sent: no for all, production system touched: no for all
- dry-run flag confirmation: confirmed (WORKSPACE_MODE=dry-run and all activation flags false)
- Recommended first action for next session:
- Timestamp:

## Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation

This packet:
- Is internal-only for all worksheets and templates.
- Records Estimate created: no on every prep worksheet, tracker, and report.
- Records Quote generated: no on every prep worksheet, tracker, and report.
- Records Quote sent: no on every prep worksheet, tracker, and report.
- Records Follow-up sent: no on every prep worksheet, tracker, and report.
- Records Calendar booking performed: no on every prep worksheet, tracker, and report.
- Records External notification sent: no on every prep worksheet, tracker, and report.
- Records Production system touched: no on every prep worksheet, tracker, and report.
- Contains no code, no routes, no send functions, no calendar functions, no estimate creation functions, no quote functions, no automation.
- Must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- Helps the founder/operator manually prepare estimate inputs after estimate / next-step readiness (READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP) so the founder/operator can later manually perform estimate prep, next-step coordination, follow-up, and prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no automated follow-up, no automated estimate preparation, no quote automation, and no production route activation are permitted or performed by this packet.

## Referenced Artifacts for Verification

- `docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md` (this document)
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md` (Agent Product Quality Gate)
- `scripts/run-first-roofer-estimate-prep-command-packet-dry-run.sh`
- `backend/scripts/verify-first-roofer-estimate-prep-command-packet-readonly.js`
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

No production activation, no external sends, no data mutation, no calendar, no booking, no estimate creation, no quote generation, no quote sending, no follow-up automation. Manual founder/operator review and manual coordination only. Helps the founder/operator manually prepare estimate inputs after estimate / next-step readiness to prepare to book inspections and book appointments via the Founder-Led Launch Program.

## PASS / HOLD / BLOCKED Summary (Packet Level)

Use the criteria in the dedicated sections above. The packet is PASS only when the full estimate prep command packet is operationally usable for manual founder/operator preparation of estimate inputs after estimate / next-step readiness for the first roofer execution path (after estimate / next-step readiness), with all required sections, concrete fillable fields, worksheets/templates (inspection notes capture, contractor estimate-input, homeowner constraints and preferences, roof / damage / service-scope, photos / insurance / documentation, estimate assumptions and unknowns, contractor questions, homeowner questions, manual estimate prep readiness decision, HOLD templates for missing estimate prep owner / missing inspection notes / missing contractor notes / incomplete homeowner constraints / incomplete roof/damage/service-scope details / incomplete photos/insurance/documentation / unresolved estimate / next-step readiness state / unresolved contractor or homeowner questions, BLOCKED for consent/safety/prod risk), approval states (including READY FOR FOUNDER REVIEW and READY FOR CONTRACTOR REVIEW), HOLD/BLOCKED rules, no-estimate-create / no-quote-send / no-calendar / no-booking safety rules, tracker, decision log, end-of-day report, handoff, required business phrases present (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, draft-only, approved for manual follow-up, ready for manual estimate prep, ready for manual next step, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no), forbidden phrases absent, explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language, and complete wiring into aggregate, index, and both next-chat contexts.

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
- ready for manual estimate prep
- ready for manual next step
- READY FOR FOUNDER REVIEW
- READY FOR CONTRACTOR REVIEW
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Follow-up sent: no
- Calendar booking performed: no
- external notification sent: no
- production system touched: no

The list of prohibited legacy pilot/quota-style, job/revenue guarantee, production activation, and estimate/quote automation language phrases (as defined in the quality gate and packet verifiers) is verified absent by the dedicated read-only verifier.
