# First Roofer Contractor Estimate Review Command Packet

## Purpose and safety posture

This packet creates the First Roofer Contractor Estimate Review Command Packet for the Founder-Led Launch Program.

It provides the founder/operator with a self-contained, fillable operational packet to manually package and review the outputs of the First Roofer Estimate Prep Command Packet (and the upstream Estimate / Next-Step Readiness Command Packet, Appointment Outcome Command Packet, and Manual Follow-Up Command Packet) into a structured manual contractor estimate-review workspace. This packet helps the founder/operator prepare estimate-prep inputs for manual contractor review, check readiness for contractor-facing materials, clarify contractor and homeowner questions, identify missing notes or documentation, confirm contractor match and service-area fit, and decide PASS / HOLD / BLOCKED — all without sending anything, creating estimates, generating quotes, sending quotes, notifying contractors or homeowners, booking appointments, creating calendar events, writing production data, or activating any production system. All contractor estimate review decisions and worksheets remain internal until a founder/operator explicitly approves and performs any real-world manual coordination or review outside the system after explicit approval. The packet itself must never send contractor notifications, send homeowner follow-ups, create estimates, generate quotes, book appointments, notify, calendar, or touch production systems.

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no estimate creation, no quote generation, no quote sending, no contractor notification, no follow-up sending, no calendar booking, no notifications, no production system writes, no automated estimate, no quote automation, and no booking. It supports manual founder/operator review and manual coordination only. The packet helps the founder/operator manually convert "READY FOR MANUAL CONTRACTOR REVIEW" (from the Estimate Prep Command Packet) into a structured, fillable, internal-only contractor estimate-review workspace: contractor review package, scope summary, photos / documentation review, insurance context review, contractor questions, founder/operator questions, homeowner clarification, manual contractor review owner, review readiness, PASS/HOLD/BLOCKED decisions, reporting, and handoff — all without creating estimates, generating quotes, sending quotes, sending notifications or follow-ups, booking anything live, creating calendar events, writing production data, or activating any production system. All contractor estimate review decisions and worksheets remain internal until a founder/operator explicitly approves and performs any real-world manual contractor review or coordination outside the system after explicit approval. The packet itself must never create estimates, generate quotes, send quotes, send notifications, send follow-ups, book, notify, calendar, or touch production systems.

Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation confirmation:
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
- No contractor notification sent.
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually prepare to book inspections and book appointments and then manually capture outcomes, prepare manual follow-up, determine estimate / next-step readiness, manually prepare estimate inputs, and manually package for contractor estimate review. It does not create estimates, does not generate quotes, does not send quotes, does not send contractor notifications, does not send follow-ups, does not book anything live, does not create calendar events, does not write production data, and does not activate any production system.

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

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, no automated follow-up, no automated estimate, no quote automation, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path. It follows the Agent Product Quality Gate. It consumes outputs from the First Roofer Estimate Prep Command Packet (and the Estimate / Next-Step Readiness Command Packet, the Appointment Outcome Command Packet, and the Manual Follow-Up Command Packet) and supports preparation for manual contractor estimate review using the Follow-Up Cadence Packet, Appointment Outcome Packet, Booking Preferences Packet, Reporting Preferences Packet, Contractor Notification Packet, Manual Review Queue Packet, and the Day-One Command Center while remaining fully dry-run.

## Contractor estimate review command overview

The Contractor Estimate Review Command Packet gives the founder/operator one place to manually package estimate-prep inputs for manual contractor review after a lead has reached the appropriate state from the Estimate Prep Command Packet (READY FOR MANUAL CONTRACTOR REVIEW or equivalent from prior readiness):

- Confirm inputs from the First Roofer Estimate Prep Command Packet, the Estimate / Next-Step Readiness Command Packet, the Appointment Outcome Command Packet, and the Manual Follow-Up Command Packet (and prior packets in the chain).
- Perform lead contractor-review intake checklist.
- Complete contractor review package worksheet.
- Complete scope summary worksheet.
- Complete photos / documentation review worksheet.
- Complete insurance context review worksheet.
- Complete contractor questions worksheet.
- Complete founder/operator questions worksheet.
- Complete homeowner clarification worksheet.
- Complete manual contractor review readiness worksheet.
- Apply the manual contractor review approval decision worksheet.
- Apply explicit HOLD / BLOCKED rules for missing contractor review owner, missing estimate prep state, unresolved estimate / next-step readiness state, missing inspection notes, missing contractor notes, incomplete roof/damage/service-scope details, incomplete homeowner constraints, incomplete photos/documentation review, incomplete insurance context review, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent/safety, or production activation risk.
- Log founder/operator decisions in the founder/operator contractor review decision log with PASS / HOLD / BLOCKED and DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED states.
- Track every lead in the contractor estimate review tracker with approval state, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.
- Produce an end-of-day contractor review report.
- Leave handoff notes for the next operator session.

All steps use "book inspections" / "book appointments" language only. The goal is to manually package and review estimate-prep inputs after estimate prep so that the founder/operator can later perform any needed manual contractor review or coordination and prepare to book inspections and prepare to book appointments. Every worksheet and decision carries the explicit note that it is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable packet that can be printed or used in a working session to manually package and review estimate-prep inputs for contractor estimate review (contractor review package, scope summary, photos/documentation review, insurance context review, contractor/founder/homeowner questions and clarifications, review readiness, HOLD/BLOCKED decisions, reporting, and handoff) for multiple leads without any production systems, live sends, live booking, live notifications, live estimate creation, live quote generation/sends, or automated actions.

This packet references and builds on:
- `docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

References for verification: First Roofer Estimate Prep Command Packet, First Roofer Estimate / Next-Step Readiness Command Packet, First Roofer Appointment Outcome Command Packet, First Roofer Manual Follow-Up Command Packet, first-roofer day-one command center, First Roofer Manual Communication Command Packet, First Roofer Inspection Coordination Command Packet, First Roofer Appointment Readiness Command Packet, Lead-to-Inspection Ops Pack, Execution Day Runbook, Follow-Up Cadence Packet, Appointment Outcome Packet, Booking Preferences Packet, Reporting Preferences Packet, Contractor Notification Packet, Manual Review Queue Packet, and Agent Product Quality Gate.

## Inputs from First Roofer Estimate Prep Command Packet

This packet is the direct successor step after estimate prep. Before using this packet for any lead, the founder/operator must have completed (or explicitly recorded status from) the First Roofer Estimate Prep Command Packet for the lead.

Required inputs consumed from First Roofer Estimate Prep Command Packet:
- Lead ID, homeowner name, property address, lead source, source detail, service type, urgency, damage description, photos present: yes/no/unknown, insurance involvement: yes/no/unknown.
- Contact permission status and homeowner preferred channel.
- Contractor match and contractor service-area fit.
- Prior appointment outcome (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED).
- Manual outcome classification and manual outcome state.
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED.
- Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED.
- Estimate readiness: READY / NEEDS INFO / HOLD / BLOCKED.
- Contractor next-step readiness: READY / NEEDS INFO / HOLD / BLOCKED.
- Manual estimate prep owner, manual contractor next-step owner, manual homeowner info owner.
- Inspection notes present: yes / no / unknown.
- Contractor notes present: yes / no / unknown.
- Homeowner constraints captured: yes / no / unknown.
- Roof/damage details complete: yes / no / unknown.
- Photos reviewed: yes / no / unknown.
- Insurance context reviewed: yes / no / unknown.
- Documentation complete: yes / no / unknown.
- Estimate assumptions listed: yes / no.
- Estimate unknowns listed: yes / no.
- Contractor questions listed: yes / no.
- Homeowner questions listed: yes / no.
- Manual estimate prep decision: PASS / HOLD / BLOCKED.
- Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED.
- Any noted manual next action or contractor review notes from prior packet.
- Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no recorded in prior packet.

If the prior estimate prep state is not at a state indicating readiness for contractor review (or cleared), or if any prior HOLD/BLOCKED without documented clearance exists, immediately apply contractor review HOLD or BLOCKED rules.

Lead contractor-review intake from estimate prep template:
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
- Manual estimate prep decision (from prior): PASS / HOLD / BLOCKED
- Manual estimate prep state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Estimate prep packet reference / timestamp: ____________________
- Inputs from estimate prep status: READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from Estimate / Next-Step Readiness Command Packet

Required inputs consumed from Estimate / Next-Step Readiness Command Packet (via the estimate prep packet or direct reference):
- Lead ID, homeowner name, property address, lead source, source detail, service type, urgency, damage description, photos present: yes/no/unknown, insurance involvement: yes/no/unknown.
- Contact permission status and homeowner preferred channel.
- Contractor match and contractor service-area fit.
- Prior appointment outcome.
- Manual outcome classification and state.
- Manual follow-up state.
- Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED.
- Estimate readiness and contractor next-step readiness.
- Manual estimate prep owner, manual contractor next-step owner, manual homeowner info owner.
- Reschedule needed, estimate requested, next-step needed.
- Insurance / photos / damage details complete status.
- Any noted manual next action from prior packet.
- Estimate created: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

Lead contractor-review intake from estimate / next-step readiness template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Estimate / next-step state (from prior): DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Estimate readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- Contractor next-step readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- Manual estimate prep owner (from prior): ____________________
- Estimate / next-step readiness packet reference / timestamp: ____________________
- Inputs from estimate / next-step readiness status: READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from Manual Follow-Up and Appointment Outcome packets

Required inputs consumed from Manual Follow-Up Command Packet and Appointment Outcome Command Packet (via the estimate prep / estimate next-step readiness packets or direct reference):

Inputs from Manual Follow-Up Command Packet:
Inputs from Appointment Outcome Command Packet:
- Lead ID, homeowner name, property address.
- Prior appointment outcome (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED).
- Manual outcome classification and manual outcome state (including OUTCOME READY FOR MANUAL FOLLOW-UP).
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED.
- Homeowner and contractor follow-up status.
- Reschedule needed, estimate requested, next-step needed.
- Inspection completed, homeowner present, contractor present, access issue, damage/roof condition observed, photos taken during visit, insurance claim details.
- Follow-up owner, follow-up type, manual follow-up draft/reviewed/approved status.
- Any noted conflicts, missing info, or escalation items.
- Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no from prior packets.

Lead contractor-review intake from manual follow-up / appointment outcome template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Manual outcome state: DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Reschedule needed: yes / no / unknown
- Estimate requested: yes / no / unknown
- Next-step needed: yes / no / unknown
- Inspection completed: yes / no / unknown
- Homeowner present: yes / no / unknown
- Contractor present: yes / no / unknown
- Access issue: yes / no / unknown
- Damage / roof condition observed (from prior): ____________________
- Photos taken during visit: yes / no / unknown
- Insurance claim details captured (from prior): ____________________
- Manual follow-up packet reference / timestamp: ____________________
- Appointment outcome packet reference / timestamp: ____________________
- Inputs from manual follow-up status: APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Inputs from appointment outcome status: OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Contractor review prerequisites

Before using this packet for any lead, the founder/operator must confirm the following prerequisites from prior packets (mark explicitly). This packet does not replace those; it consumes their outputs for contractor estimate review.

- [ ] First Roofer Day-One Command Center has been reviewed for the lead.
- [ ] Lead-to-Inspection Ops Pack intake and decision log completed for the lead (or explicit reason recorded).
- [ ] First Roofer Execution Day Runbook followed for the execution day.
- [ ] First Roofer Manual Communication Command Packet: homeowner and contractor message drafts prepared, reviewed, and at least one marked APPROVED FOR MANUAL USE (or HOLD/BLOCKED status recorded with justification).
- [ ] First Roofer Inspection Coordination Command Packet: inspection coordination decision and inspection readiness decision reviewed; proposed inspection windows captured; homeowner and contractor confirmation status recorded.
- [ ] First Roofer Appointment Readiness Command Packet: appointment readiness decision PASS; selected manual appointment window recorded; homeowner and contractor window confirmed status recorded.
- [ ] First Roofer Appointment Outcome Command Packet: outcome classification completed; manual outcome state OUTCOME READY FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); homeowner/contractor follow-up status worksheets from outcome captured; reschedule/estimate/next-step flags recorded.
- [ ] First Roofer Manual Follow-Up Command Packet: follow-up ownership completed; homeowner/contractor/reschedule/estimate/next-step/no-show/completed/cancelled follow-up preparation worksheets completed; manual follow-up state APPROVED FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); follow-up decision logged.
- [ ] First Roofer Estimate / Next-Step Readiness Command Packet: estimate / next-step readiness determination completed; estimate / next-step state READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (or explicit HOLD/BLOCKED with clearance); estimate readiness, contractor next-step readiness, manual estimate prep owner, manual contractor next-step owner, manual homeowner info owner, and insurance/photos/damage details worksheets captured.
- [ ] First Roofer Estimate Prep Command Packet: estimate prep completed; inspection notes, contractor notes, homeowner constraints, roof/damage/service-scope, photos/insurance/documentation, assumptions/unknowns, contractor/homeowner questions worksheets captured; manual estimate prep decision PASS and manual estimate prep state indicating readiness for contractor review (or explicit HOLD/BLOCKED with clearance); manual estimate prep owner recorded.
- [ ] Follow-Up Cadence Packet reviewed for the manual follow-up status definitions and channel rules that will be used.
- [ ] Appointment Outcome Packet (paid launch) reviewed for the outcome categories and follow-up tie-in fields that align with this roofer packet.
- [ ] Booking Preferences Packet reviewed for any manual constraints relevant to contractor review timing or next-step coordination.
- [ ] Reporting Preferences Packet reviewed for the end-of-day and handoff reporting expectations.
- [ ] Contractor Notification Packet reviewed for any manual contractor coordination expectations relevant to contractor estimate review.
- [ ] Manual Review Queue Packet reviewed for any manual review expectations that intersect with contractor estimate review decisions.
- [ ] Contact permission status: granted (or explicit handling for pending/unknown recorded under HOLD rules).
- [ ] Contractor match identified and service-area fit assessed (from lead-to-inspection, manual comm, inspection coordination, appointment readiness, appointment outcome, manual follow-up, estimate / next-step readiness, or estimate prep packets).
- [ ] Manual estimate prep state from prior packet supports contractor review packaging (READY FOR MANUAL CONTRACTOR REVIEW or equivalent cleared state).
- [ ] Manual contractor review owner assigned or explicitly noted as missing (from estimate prep or assignable now).
- [ ] Inspection notes, contractor notes, homeowner constraints, roof/damage details, photos, insurance context, documentation, assumptions, unknowns, contractor questions, and homeowner questions status confirmed from estimate prep (or to be reviewed in this packet's worksheets).
- [ ] No production activation flags are true; all dry-run flags confirmed.
- [ ] Agent product quality gate has been run for the current workspace.
- [ ] This packet is being used only for manual founder/operator review and manual coordination rehearsal.

Lead contractor review prerequisites template:
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
- Contact permission status: granted / pending / unknown / do-not-contact
- Homeowner preferred channel: SMS / phone / email / unknown
- Contractor match (from prior packet): ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Prior manual outcome state (from appointment outcome packet): DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Prior manual follow-up state (from manual follow-up packet): DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Prior estimate / next-step state (from estimate / next-step readiness packet): DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Prior manual estimate prep state (from estimate prep packet): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual estimate prep decision (from estimate prep): PASS / HOLD / BLOCKED
- Estimate readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- Contractor next-step readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- Manual estimate prep owner (from prior): ____________________
- Manual contractor review owner (from prior or assigned now): ____________________
- Contractor review owner: ____________________
- Inspection notes present (from prior): yes / no / unknown
- Contractor notes present (from prior): yes / no / unknown
- Homeowner constraints captured (from prior): yes / no / unknown
- Roof/damage details complete (from prior): yes / no / unknown
- Photos reviewed (from prior): yes / no / unknown
- Insurance context reviewed (from prior): yes / no / unknown
- Documentation complete (from prior): yes / no / unknown
- Estimate assumptions listed (from prior): yes / no
- Estimate unknowns listed (from prior): yes / no
- Contractor questions listed (from prior): yes / no
- Homeowner questions listed (from prior): yes / no
- Estimate prep packet reference / timestamp: ____________________
- Estimate / next-step readiness packet reference / timestamp: ____________________
- Manual follow-up packet reference / timestamp: ____________________
- Appointment outcome packet reference / timestamp: ____________________
- Follow-up cadence packet reviewed for manual follow-up status: yes / no
- Appointment outcome packet (paid) reviewed for alignment: yes / no
- Booking preferences reviewed for this lead: yes / no
- Reporting preferences packet reviewed for end-of-day: yes / no
- Contractor notification packet reviewed: yes / no
- Manual review queue packet reviewed: yes / no
- Contractor review prerequisites status: PASS / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

If any prerequisite is not met or prior packet shows HOLD/BLOCKED without clearance, apply HOLD rules immediately and do not proceed to contractor estimate review.

## Lead contractor-review intake checklist

Use this checklist for every lead entering contractor estimate review. Mark explicitly. This is the entry gate after estimate prep.

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
- [ ] Prior manual estimate prep state: indicates readiness for contractor review (or HOLD/BLOCKED cleared)
- [ ] Manual estimate prep decision: PASS (or HOLD/BLOCKED cleared)
- [ ] Estimate readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Contractor next-step readiness (from prior): READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Reschedule needed: yes / no / unknown
- [ ] Estimate requested: yes / no / unknown
- [ ] Next-step needed: yes / no / unknown
- [ ] Follow-up needed: yes / no / unknown
- [ ] Manual estimate prep owner assigned
- [ ] Manual contractor review owner assigned or explicitly noted as missing
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
- [ ] Contractor review package worksheet completed
- [ ] Scope summary worksheet completed
- [ ] Photos / documentation review worksheet completed
- [ ] Insurance context review worksheet completed
- [ ] Contractor questions worksheet completed
- [ ] Founder/operator questions worksheet completed
- [ ] Homeowner clarification worksheet completed
- [ ] Manual contractor review readiness worksheet completed
- [ ] Manual contractor review readiness: READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Manual contractor review decision: PASS / HOLD / BLOCKED
- [ ] Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- [ ] Estimate created: no
- [ ] Quote generated: no
- [ ] Quote sent: no
- [ ] Contractor notification sent: no
- [ ] Follow-up sent: no
- [ ] Calendar booking performed: no
- [ ] External notification sent: no
- [ ] Production system touched: no
- [ ] Founder/operator notes: ____________________
- [ ] Next manual action: ____________________

If contact permission status is not "granted" or is "do-not-contact", immediately apply HOLD / BLOCKED rules. Do not advance review that would imply contact or coordination without explicit consent clearance.

If contractor match is not confirmed or contractor service-area fit is not yes, apply HOLD / BLOCKED rules immediately.

## Contractor review package worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Contractor Review Package Worksheet (internal worksheet only)

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
- Prior appointment outcome: ____________________
- Manual outcome classification (from prior): ____________________
- Manual outcome state (from prior): ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Estimate readiness (from prior): ____________________
- Contractor next-step readiness (from prior): ____________________
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- Manual estimate prep state (from prior): ____________________
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
- Contractor review package complete: yes / no
- Manual contractor review readiness (link to readiness worksheet): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Scope summary worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Scope Summary Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- Roof/damage details complete (from prior or reviewed here): yes / no / unknown
- Roof type / age / condition (internal note): ____________________
- Damage description / extent (internal note, e.g., "hail impact on north slope, 12 squares"): ____________________
- Service type (inspection / repair / replacement / storm response / other): ____________________
- Scope assumptions (internal only, reviewed from estimate prep): ____________________
- Service-scope unknowns (internal only): ____________________
- Access / safety notes (internal only): ____________________
- Measurements / counts (internal only, e.g., squares, layers, penetrations): ____________________
- Scope summary complete: yes / no
- Manual contractor review readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Photos / documentation review worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Photos / Documentation Review Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- Photos reviewed: yes / no / unknown
- Documentation complete: yes / no / unknown
- Photos present: yes / no / unknown
- Key photo descriptions / refs (internal only, never embedded as production data): ____________________
- Additional documentation reviewed / still needed (internal list): ____________________
- Photos / documentation review complete: yes / no
- Manual contractor review readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Insurance context review worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Insurance Context Review Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Prior appointment outcome: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- Insurance context reviewed: yes / no / unknown
- Insurance involvement: yes / no / unknown
- Insurance claim number / carrier / status (internal note only): ____________________
- Insurance context notes / gaps (internal only): ____________________
- Insurance context review complete: yes / no
- Manual contractor review readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Contractor questions worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Contractor Questions Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- Contractor questions listed: yes / no
- List of questions for contractor (internal only, reviewed from estimate prep and clarified here, e.g., "preferred underlayment brand? lead time on architectural shingles?"): ____________________
- Proposed manual contact method for questions (phone / email / text outside system): ____________________
- Proposed timing for questions: ____________________
- Contractor questions complete / clarified: yes / no
- Manual contractor review readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Founder/operator questions worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Founder/Operator Questions Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual contractor review owner: ____________________
- Founder/operator questions listed: yes / no
- List of internal questions / clarifications for founder/operator review (internal only, e.g., "confirm scope boundaries before any contractor discussion", "verify insurance claim status manually"): ____________________
- Proposed internal review steps (manual only): ____________________
- Founder/operator questions complete / resolved: yes / no
- Manual contractor review readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Homeowner clarification worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Homeowner Clarification Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- Homeowner questions listed: yes / no
- List of questions / clarifications for homeowner (internal only, reviewed from estimate prep, e.g., "confirm insurance claim number? preferred start window? any HOA restrictions?"): ____________________
- Proposed manual contact method for clarifications (phone / email / text outside system): ____________________
- Proposed timing for clarifications: ____________________
- Homeowner clarification complete: yes / no
- Manual contractor review readiness (link): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual contractor review readiness worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Manual Contractor Review Readiness Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Manual estimate prep owner: ____________________
- Manual contractor review owner: ____________________
- All prior review worksheets completed (contractor review package, scope summary, photos/documentation review, insurance context review, contractor questions, founder/operator questions, homeowner clarification): yes / no
- Inspection notes present: yes / no / unknown
- Contractor notes present: yes / no / unknown
- Homeowner constraints captured: yes / no / unknown
- Roof/damage details complete: yes / no / unknown
- Photos reviewed: yes / no / unknown
- Insurance context reviewed: yes / no / unknown
- Documentation complete: yes / no / unknown
- Estimate assumptions listed: yes / no
- Estimate unknowns listed: yes / no
- Contractor questions listed / clarified: yes / no
- Homeowner questions / clarifications listed: yes / no
- Contractor match confirmed: yes / no
- Contractor service-area fit confirmed: yes / no
- Prior manual estimate prep state (from estimate prep packet): READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED (or equivalent)
- Manual contractor review readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Contractor review readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Manual contractor review decision: PASS / HOLD / BLOCKED
- Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Reason / evidence (one sentence minimum, referencing all completed worksheets, intake checklist, and HOLD/BLOCKED rules):
- Proposed manual next step (e.g., "founder to perform internal contractor estimate review package handoff outside system", "operator to prepare clarified questions list for manual contractor discussion outside system"):
- Manual next action (explicit):
- Owner: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Contractor review approval states

All contractor estimate review items use one of these manual approval states. States are recorded by the founder/operator only. No automation changes state.

- DRAFT: initial internal contractor review notes and worksheets captured by founder/operator. Not reviewed. Not ready for any external action.
- REVIEWED: founder/operator has reviewed for completeness, consent, ownership clarity (manual contractor review owner), contractor match/service-area fit, and safety. Contractor review package is internally consistent but not yet approved for manual contractor review.
- READY FOR MANUAL CONTRACTOR REVIEW: founder/operator has explicitly approved the contractor review package for manual contractor review / input outside the system (e.g., share clarified scope, questions, or notes via manual channel only). Still requires Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, and production system touched: no until the human actually performs the coordination.
- HOLD: blocked by missing contractor review owner, missing estimate prep state, unresolved estimate / next-step readiness state, missing inspection notes, missing contractor notes, incomplete roof/damage/service-scope details, incomplete homeowner constraints, incomplete photos/documentation review, incomplete insurance context review, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent, or founder review requirement. No external use permitted.
- BLOCKED: safety, consent violation, spam risk, production activation risk, credential exposure, or forbidden language detected. Immediate stop. Requires production gates + safe readiness re-run and explicit founder clearance.

Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED

Manual owner: founder/operator (name recorded)

Estimate created: no

Quote generated: no

Quote sent: no

Contractor notification sent: no

Follow-up sent: no

Calendar booking performed: no

External notification sent: no

Production system touched: no

## HOLD / BLOCKED rules

Apply these rules manually before any contractor review leaves DRAFT or REVIEWED state.

### HOLD due to missing contractor review owner

- If the manual contractor review readiness worksheet does not show a clear manual contractor review owner (founder/operator name): set state to HOLD. Record "HOLD due to missing contractor review owner".
- If prior estimate prep indicates readiness for contractor review but no contractor review owner assigned: set state to HOLD. Record "HOLD due to missing contractor review owner".
- HOLD for missing contractor review owner must be reviewed at every end-of-day contractor review report. It does not auto-clear.
- Only when a contractor review owner is explicitly recorded may the preparation advance to READY FOR MANUAL CONTRACTOR REVIEW.

### HOLD due to missing estimate prep state

- If prior manual estimate prep state from the Estimate Prep Command Packet is not at a state supporting contractor review packaging (without explicit clearance documented): set state to HOLD. Record "HOLD due to missing estimate prep state".
- HOLD for missing estimate prep state must be reviewed before advancing.

### HOLD due to unresolved estimate / next-step readiness state

- If prior estimate / next-step state is not READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (without explicit clearance documented): set state to HOLD. Record "HOLD due to unresolved estimate / next-step readiness state".
- If any prior HOLD/BLOCKED from estimate / next-step readiness, manual follow-up, appointment outcome, or estimate prep packets remains uncleared: set state to HOLD. Record "HOLD due to unresolved estimate / next-step readiness state".
- HOLD for unresolved prior state must be reviewed before advancing.

### HOLD due to missing inspection notes

- If contractor review package worksheet or prior estimate prep shows inspection notes present = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to missing inspection notes".
- If inspection completed = yes but no inspection notes captured from prior: set state to HOLD. Record "HOLD due to missing inspection notes".
- HOLD for missing inspection notes must be reviewed before advancing to READY states.

### HOLD due to missing contractor notes

- If contractor review package worksheet or prior shows contractor notes present = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to missing contractor notes".
- HOLD for missing contractor notes must be reviewed before advancing to READY states.

### HOLD due to incomplete roof/damage/service-scope details

- If scope summary worksheet shows roof/damage details complete = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete roof/damage/service-scope details".
- If damage description or service type is missing or inconsistent with prior packets: set state to HOLD. Record "HOLD due to incomplete roof/damage/service-scope details".
- HOLD for incomplete roof/damage/service-scope details must be reviewed before advancing to READY states.

### HOLD due to incomplete homeowner constraints

- If contractor review package worksheet shows homeowner constraints captured = no or unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete homeowner constraints".
- If contact permission or preferred channel is missing or inconsistent with prior packets: set state to HOLD. Record "HOLD due to incomplete homeowner constraints".
- HOLD for incomplete homeowner constraints must be reviewed before advancing to READY states.

### HOLD due to incomplete photos/documentation review

- If photos / documentation review worksheet shows photos reviewed = no/unknown or documentation complete = no with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete photos/documentation review".
- If photos present = yes/unknown with no review captured: set state to HOLD. Record "HOLD due to incomplete photos/documentation review".
- HOLD for incomplete photos/documentation review must be reviewed before advancing to READY states.

### HOLD due to incomplete insurance context review

- If insurance context review worksheet shows insurance context reviewed = no/unknown with no plan or owner noted: set state to HOLD. Record "HOLD due to incomplete insurance context review".
- If insurance involvement = yes with no details captured: set state to HOLD. Record "HOLD due to incomplete insurance context review".
- HOLD for incomplete insurance context review must be reviewed before advancing to READY states.

### HOLD due to unresolved estimate assumptions

- If scope summary or contractor review package shows estimate assumptions listed = yes but no review or resolution plan noted: set state to HOLD. Record "HOLD due to unresolved estimate assumptions".
- HOLD for unresolved estimate assumptions must be reviewed before advancing to READY states.

### HOLD due to unresolved estimate unknowns

- If scope summary or contractor review package shows estimate unknowns listed = yes but no review or resolution plan noted: set state to HOLD. Record "HOLD due to unresolved estimate unknowns".
- HOLD for unresolved estimate unknowns must be reviewed before advancing to READY states.

### HOLD due to unresolved contractor questions

- If contractor questions worksheet shows questions listed = yes but no clarification or resolution plan or owner noted: set state to HOLD. Record "HOLD due to unresolved contractor questions".
- If questions are material to contractor review and remain open: set state to HOLD. Record "HOLD due to unresolved contractor questions".
- HOLD for unresolved contractor questions must be reviewed before advancing to READY states.

### HOLD due to unresolved homeowner questions

- If homeowner clarification worksheet shows questions / clarifications listed = yes but no plan or owner noted: set state to HOLD. Record "HOLD due to unresolved homeowner questions".
- HOLD for unresolved homeowner questions must be reviewed before advancing to READY states.

### HOLD due to contractor match not confirmed

- If contractor match is not recorded or not confirmed as a specific contractor: set state to HOLD. Record "HOLD due to contractor match not confirmed".
- Contractor match must be explicitly confirmed before advancing to READY FOR MANUAL CONTRACTOR REVIEW.

### HOLD due to contractor service-area fit not confirmed

- If contractor service-area fit is not yes (or is hold/no): set state to HOLD. Record "HOLD due to contractor service-area fit not confirmed".
- Contractor service-area fit must be explicitly confirmed as yes before advancing to READY FOR MANUAL CONTRACTOR REVIEW.

### BLOCKED due to consent/safety/production activation risk

- If contact permission status is "do-not-contact" or "pending" with no explicit grant and contractor review would trigger contact or coordination: set state to BLOCKED immediately. Record "BLOCKED due to consent/safety/production activation risk".
- If any prior note or source indicates spam complaint, opt-out, legal hold, or safety incident at the property: set state to BLOCKED. Log in decision log and escalation section.
- If any sign of production system activation, live flag change, credential exposure, or external send/estimate/quote/contractor notification attempt during the session: set state to BLOCKED. Full stop. Re-run production gates and safe readiness. Escalate to founder.
- BLOCKED items are reviewed at end-of-day escalation slot; they do not advance to READY states.

## No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules

- This packet records Estimate created: no on every worksheet, tracker, and report.
- This packet records Quote generated: no on every worksheet, tracker, and report.
- This packet records Quote sent: no on every worksheet, tracker, and report.
- This packet records Contractor notification sent: no on every worksheet, tracker, and report.
- This packet records Follow-up sent: no on every worksheet, tracker, and report.
- This packet records Calendar booking performed: no on every worksheet, tracker, and report.
- This packet records External notification sent: no on every worksheet, tracker, and report.
- This packet records Production system touched: no on every worksheet, tracker, and report.
- The packet contains no code, no routes, no send functions, no calendar functions, no estimate creation functions, no quote functions, no automation, no notification functions.
- The packet must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- The packet helps the founder/operator manually package estimate-prep inputs for manual contractor review after estimate prep (after READY FOR MANUAL CONTRACTOR REVIEW or equivalent from prior) so the founder/operator can later manually perform contractor estimate review, estimate prep follow-up, next-step coordination, follow-up, and prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.
- Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, reschedule, or booking must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no automated follow-up, no automated estimate preparation, no quote automation, no contractor notification, and no production route activation are permitted or performed by this packet.

## Contractor estimate review tracker

Maintain a simple manual tracker (notes, spreadsheet, or printed table) for all leads with contractor estimate review this session. Update after every classification or state change.

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
- Manual contractor review owner
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
- Contractor match confirmed: yes/no
- Contractor service-area fit confirmed: yes/no
- Manual contractor review readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Contractor review readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Manual contractor review decision: PASS / HOLD / BLOCKED
- Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Contractor review notes
- Next manual action
- Last updated timestamp

The tracker is updated manually only. It feeds the end-of-day contractor review report and handoff notes.

## Founder/operator contractor review decision log

Every lead must have an explicit manual contractor review decision logged before the review is considered complete for the session.

Decision options (tied to Founder-Led Launch Program):
- PASS — READY FOR MANUAL CONTRACTOR REVIEW: contractor review package complete; ownership (manual contractor review owner) clear; worksheets reviewed; contractor match and service-area fit confirmed; ready for founder/operator to perform manual contractor estimate review / coordination outside the system.
- HOLD FOR MISSING CONTRACTOR REVIEW OWNER: contractor review owner not recorded; assign owner before advancing.
- HOLD FOR MISSING ESTIMATE PREP STATE: prior estimate prep state not at required readiness for contractor review; clear before advancing.
- HOLD FOR UNRESOLVED ESTIMATE / NEXT-STEP READINESS STATE: prior packet not at required ready state; clear before advancing.
- HOLD FOR MISSING INSPECTION NOTES: inspection notes not captured; complete before advancing.
- HOLD FOR MISSING CONTRACTOR NOTES: contractor notes not captured; complete before advancing.
- HOLD FOR INCOMPLETE ROOF/DAMAGE/SERVICE-SCOPE DETAILS: roof/damage/service-scope details incomplete; complete before advancing.
- HOLD FOR INCOMPLETE HOMEOWNER CONSTRAINTS: homeowner constraints incomplete; complete before advancing.
- HOLD FOR INCOMPLETE PHOTOS/DOCUMENTATION REVIEW: photos/documentation review incomplete; complete before advancing.
- HOLD FOR INCOMPLETE INSURANCE CONTEXT REVIEW: insurance context review incomplete; complete before advancing.
- HOLD FOR UNRESOLVED ESTIMATE ASSUMPTIONS: estimate assumptions unresolved; resolve before advancing.
- HOLD FOR UNRESOLVED ESTIMATE UNKNOWNS: estimate unknowns unresolved; resolve before advancing.
- HOLD FOR UNRESOLVED CONTRACTOR QUESTIONS: open contractor questions without plan; resolve before advancing.
- HOLD FOR UNRESOLVED HOMEOWNER QUESTIONS: open homeowner clarifications without plan; resolve before advancing.
- HOLD FOR CONTRACTOR MATCH NOT CONFIRMED: contractor match not explicitly confirmed; confirm before advancing.
- HOLD FOR CONTRACTOR SERVICE-AREA FIT NOT CONFIRMED: contractor service-area fit not explicitly yes; confirm before advancing.
- BLOCKED FOR CONSENT / SAFETY / PRODUCTION RISK: consent, safety, or production activation issue detected; do not proceed with contractor estimate review.
- CANCELLED / NO FURTHER ACTION: lead cancelled or explicitly no contractor review needed; log and remove from active tracker.

Founder/Operator Contractor Review Decision Log entry (required fields):
- Lead ID:
- Homeowner name:
- Property address:
- Decision: (exact option above)
- Reason: (references worksheets, intake checklist, HOLD/BLOCKED rules, completeness, prior estimate prep state)
- Manual contractor review decision: PASS / HOLD / BLOCKED
- Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Evidence reviewed (worksheets + prior packet decisions + estimate prep state + outcome + follow-up + estimate/next-step readiness classification):
- Open questions:
- Founder/operator notes:
- Manual next action:
- Owner:
- Timestamp:
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

This log is the source for the contractor estimate review tracker updates and end-of-day report.

## End-of-day contractor review report

Fill this at close of day. Save alongside filled decision logs, tracker, and worksheets.

End-of-Day Contractor Review Report — First Roofer Contractor Estimate Review Command Packet

- Source of truth commit: e13fb55 (or current worktree note)
- Execution day / session date:
- Founder/operator:
- Total leads with contractor estimate review:
- Leads with PASS — READY FOR MANUAL CONTRACTOR REVIEW:
- Leads with HOLD (by category: missing contractor review owner / missing estimate prep state / unresolved estimate / next-step readiness state / missing inspection notes / missing contractor notes / incomplete roof/damage/service-scope details / incomplete homeowner constraints / incomplete photos/documentation review / incomplete insurance context review / unresolved estimate assumptions / unresolved estimate unknowns / unresolved contractor questions / unresolved homeowner questions / contractor match not confirmed / contractor service-area fit not confirmed):
- Leads BLOCKED (by reason):
- Leads with contractor review package completed:
- Leads with scope summary completed:
- Leads with photos / documentation review completed:
- Leads with insurance context review completed:
- Leads with contractor questions clarified:
- Leads with founder/operator questions resolved:
- Leads with homeowner clarification completed:
- Manual contractor review owners assigned (count and names):
- Manual contractor review states at close (DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED counts):
- Production sends/writes/routes activated: no
- External notifications sent: no
- Estimate created across all: no
- Quote generated across all: no
- Quote sent across all: no
- Contractor notification sent across all: no
- Follow-up sent across all: no
- Calendar booking performed across all: no
- External notification sent across all: no
- Production system touched across all: no
- Safety posture confirmed: dry-run/internal-only/founder-operator-only
- Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation: yes (see Purpose section)
- Contractor estimate review themes (summary, e.g., repeated missing photo review patterns, common contractor question gaps, scope assumption issues):
- Recommended next manual action or build improvement:
- Handoff notes location:

Next-action categories (use these):
1. Improve lead contractor-review intake checklist or contractor review package worksheet.
2. Improve scope summary or photos / documentation review worksheets.
3. Improve insurance context review or contractor / founder / homeowner clarification worksheets.
4. Improve manual contractor review readiness decision worksheet or approval states.
5. Improve HOLD / BLOCKED rules or decision log.
6. Improve contractor estimate review tracker or end-of-day report.
7. Escalate safety blocker before any further execution.

## Next-operator handoff

At end of day, leave these notes for the next founder/operator session (internal only).

Handoff Notes — First Roofer Contractor Estimate Review Command Packet

- Date / session:
- Owner completing handoff:
- Tracker status (summary of active leads and states):
- Leads still in DRAFT or REVIEWED contractor review state (Lead IDs + review type):
- Leads with READY FOR MANUAL CONTRACTOR REVIEW but manual contractor review not yet performed outside system (Lead IDs + next manual step):
- Leads on HOLD (missing contractor review owner / missing estimate prep state / unresolved estimate / next-step readiness state / missing inspection notes / missing contractor notes / incomplete roof/damage/service-scope details / incomplete homeowner constraints / incomplete photos/documentation review / incomplete insurance context review / unresolved estimate assumptions / unresolved estimate unknowns / unresolved contractor questions / unresolved homeowner questions / contractor match not confirmed / contractor service-area fit not confirmed) with owner/timestamp and reason:
- BLOCKED leads and escalation status:
- Key themes or repeated questions from the day (contractor review patterns, ownership gaps, photo/doc/insurance blockers, scope assumption gaps, contractor/homeowner clarification gaps):
- Any open same-day escalation items:
- Files / notes location for filled logs, tracker, and worksheets:
- Dry-run flag confirmation at close: all false, no production activation, Estimate created: no for all, Quote generated: no for all, Quote sent: no for all, Contractor notification sent: no for all, Follow-up sent: no for all, Calendar booking performed: no for all, external notification sent: no for all, production system touched: no for all
- dry-run flag confirmation: confirmed (WORKSPACE_MODE=dry-run and all activation flags false)
- Recommended first action for next session:
- Timestamp:

## Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation

This packet:
- Is internal-only for all worksheets and templates.
- Records Estimate created: no on every review worksheet, tracker, and report.
- Records Quote generated: no on every review worksheet, tracker, and report.
- Records Quote sent: no on every review worksheet, tracker, and report.
- Records Contractor notification sent: no on every review worksheet, tracker, and report.
- Records Follow-up sent: no on every review worksheet, tracker, and report.
- Records Calendar booking performed: no on every review worksheet, tracker, and report.
- Records External notification sent: no on every review worksheet, tracker, and report.
- Records Production system touched: no on every review worksheet, tracker, and report.
- Contains no code, no routes, no send functions, no calendar functions, no estimate creation functions, no quote functions, no automation, no notification functions.
- Must be used only with WORKSPACE_MODE=dry-run and all activation flags false.
- Helps the founder/operator manually package estimate-prep inputs for manual contractor review after estimate prep (after readiness for contractor review from prior packet) so the founder/operator can later manually perform contractor estimate review, estimate prep follow-up, next-step coordination, follow-up, and prepare to book inspections and book appointments via the Founder-Led Launch Program using manual founder/operator review and manual coordination only.

No live SMS/Twilio, no live Vapi calls, no Calendar booking activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no automated follow-up, no automated estimate preparation, no quote automation, no contractor notification, and no production route activation are permitted or performed by this packet.

## Referenced Artifacts for Verification

- `docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md` (this document)
- `docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`
- `scripts/run-first-roofer-contractor-estimate-review-command-packet-dry-run.sh`
- `backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`
- `docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md`
- `scripts/check-agent-product-quality-gate.sh`
- `backend/scripts/verify-agent-product-quality-gate-readonly.js`
- `scripts/check-production-gates.sh`
- `scripts/verify-safe-readiness.sh`
- `scripts/agent-run-gates.sh`
- `scripts/agent-diff-proof.sh`

All references and safety boundaries are enforced by the dedicated read-only verifier and the aggregate first-paid pilot readiness verifier.

No production activation, no external sends, no data mutation, no calendar, no booking, no estimate creation, no quote generation, no contractor notification, no follow-up automation. Manual founder/operator review and manual coordination only. Helps the founder/operator manually package and review estimate-prep inputs for contractor estimate review after the Estimate Prep Command Packet to prepare to book inspections and book appointments via the Founder-Led Launch Program.

## PASS / HOLD / BLOCKED Summary (Packet Level)

Use the criteria in the dedicated sections above. The packet is PASS only when the full contractor estimate review command packet is operationally usable for manual founder/operator packaging and review of estimate-prep inputs for contractor estimate review after the Estimate Prep Command Packet for the first roofer execution path (after estimate prep), with all required sections, concrete fillable fields, worksheets/templates (contractor review package, scope summary, photos/documentation review, insurance context review, contractor questions, founder/operator questions, homeowner clarification, manual contractor review readiness), approval states (including READY FOR MANUAL CONTRACTOR REVIEW), HOLD/BLOCKED rules (missing contractor review owner, missing estimate prep state, unresolved estimate / next-step readiness state, missing inspection notes, missing contractor notes, incomplete roof/damage/service-scope details, incomplete homeowner constraints, incomplete photos/documentation review, incomplete insurance context review, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent/safety, prod risk), no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules, tracker, decision log, end-of-day report, handoff, required business phrases present (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, appointment outcome, manual follow-up, estimate readiness, next-step readiness, manual estimate prep, contractor estimate review, draft-only, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no), forbidden phrases absent, explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language, and complete wiring into aggregate, index, and both next-chat contexts (and grok workflow context for history).

## Required Business Language Confirmation

This packet uses only:
- Founder-Led Launch Program
- book inspections
- book appointments
- manual founder/operator review
- manual coordination only
- appointment outcome
- manual follow-up
- estimate readiness
- next-step readiness
- manual estimate prep
- contractor estimate review
- draft-only
- READY FOR FOUNDER REVIEW
- READY FOR CONTRACTOR REVIEW
- READY FOR MANUAL CONTRACTOR REVIEW
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- external notification sent: no
- production system touched: no

The list of prohibited legacy pilot/quota-style, job/revenue guarantee, production activation, and estimate/quote automation language phrases (as defined in the quality gate and packet verifiers) is verified absent by the dedicated read-only verifier.
