# First Roofer Manual Downstream Routing Command Packet

## Purpose and safety posture

This packet creates the First Roofer Manual Downstream Routing Command Packet for the Founder-Led Launch Program.

It provides the founder/operator with a self-contained, fillable operational packet that takes the reviewed result of the First Roofer Homeowner Clarification Response Review Command Packet and gives the founder/operator a structured manual routing process for deciding where the lead goes next: RETURN TO CONTRACTOR ESTIMATE REVIEW, RETURN TO MANUAL ESTIMATE PREP, RETURN TO ESTIMATE NEXT-STEP READINESS, RETURN TO MANUAL FOLLOW-UP, RETURN TO APPOINTMENT OR ACCESS COORDINATION, READY FOR FOUNDER REVIEW, HOLD, or BLOCKED. This packet must not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, book appointments, create calendar events, write production data, or activate automation. It is only a manual founder/operator routing worksheet and decision packet.

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no estimate creation, no quote generation, no quote sending, no contractor notification, no homeowner notification, no follow-up sending, no calendar booking, no notifications, no production system writes, no automated estimate, no quote automation, and no booking. It supports manual founder/operator review and manual coordination only. The packet helps the founder/operator manually decide the next manual routing step after a homeowner clarification response has been reviewed and recorded as REVIEWED or READY TO ROUTE MANUALLY with a PASS decision (from the First Roofer Homeowner Clarification Response Review Command Packet), reconcile upstream states from the full prior chain, classify remaining gaps, apply strict route eligibility, assign owners, log decisions, track leads, produce end-of-day reports, and prepare next-operator handoff — all without sending homeowner messages, sending contractor notifications, creating estimates, generating quotes, sending quotes, booking appointments, creating calendar events, writing production data, or activating any production system. All routing decisions and worksheets remain internal until a founder/operator explicitly approves and performs any real-world manual routing or next action outside the system after explicit approval. The packet itself must never send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, book appointments, create calendar events, write production data, or activate automation.

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
- No homeowner notification sent.
- No follow-up sent.
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually route leads after homeowner clarification response review so that the founder/operator can later perform any needed manual coordination or next action and prepare to book inspections and prepare to book appointments. It does not send homeowner messages, does not send contractor notifications, does not create estimates, does not generate quotes, does not send quotes, does not book anything live, does not create calendar events, does not write production data, and does not activate any production system.

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

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, no automated follow-up, no automated estimate, no quote automation, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path. It follows the Agent Product Quality Gate. It consumes outputs from the First Roofer Homeowner Clarification Response Review Command Packet (primary), the First Roofer Homeowner Clarification Command Packet, the First Roofer Contractor Estimate Review Command Packet, the First Roofer Estimate Prep Command Packet, the First Roofer Estimate / Next-Step Readiness Command Packet, the First Roofer Manual Follow-Up Command Packet, the First Roofer Appointment Outcome Command Packet, the First Roofer Appointment Readiness Command Packet, the First Roofer Inspection Coordination Command Packet, and the First Roofer Day-One Command Center while remaining fully dry-run.

## Manual downstream routing command overview

The Manual Downstream Routing Command Packet gives the founder/operator one place to manually decide the next routing step after the First Roofer Homeowner Clarification Response Review Command Packet (and upstream packets) has produced a reviewed homeowner clarification response with a PASS decision and a prior recommended downstream route:

- Confirm inputs from the First Roofer Homeowner Clarification Response Review Command Packet (primary), the First Roofer Homeowner Clarification Command Packet, the First Roofer Contractor Estimate Review Command Packet, the First Roofer Estimate Prep Command Packet, the First Roofer Estimate / Next-Step Readiness Command Packet, the First Roofer Manual Follow-Up Command Packet, the First Roofer Appointment Outcome Command Packet, the First Roofer Appointment Readiness Command Packet, the First Roofer Inspection Coordination Command Packet, and the First Roofer Day-One Command Center (and prior packets in the chain).
- Perform lead routing intake checklist.
- Complete upstream state reconciliation worksheet.
- Complete homeowner clarification response review status worksheet.
- Complete remaining gap classification worksheet.
- Complete route eligibility matrix (with explicit rules per route).
- Complete RETURN TO CONTRACTOR ESTIMATE REVIEW route worksheet (only when eligible).
- Complete RETURN TO MANUAL ESTIMATE PREP route worksheet (only when eligible).
- Complete RETURN TO ESTIMATE NEXT-STEP READINESS route worksheet (only when eligible).
- Complete RETURN TO MANUAL FOLLOW-UP route worksheet (only when eligible).
- Complete RETURN TO APPOINTMENT OR ACCESS COORDINATION route worksheet (only when eligible).
- Complete READY FOR FOUNDER REVIEW route worksheet (only when eligible).
- Complete HOLD route worksheet (when information missing but resolvable manually with owner/action).
- Complete BLOCKED route worksheet (when consent/safety, production, live-send, live-booking, live-estimate/quote, payment/invoice, or do-not-contact risk exists).
- Complete route conflict resolution worksheet.
- Complete manual routing owner assignment worksheet.
- Complete manual next-action checklist.
- Apply explicit HOLD / BLOCKED rules for missing manual routing owner, missing manual routing reviewer, missing route decision timestamp, missing routing reason, missing routing evidence/source reference, missing contact permission status, do-not-contact or unclear permission, missing homeowner preferred channel, missing contractor match, contractor service-area fit not confirmed, missing prior appointment outcome, missing appointment readiness state, missing inspection coordination state, missing manual follow-up state, missing estimate / next-step state, missing manual estimate prep state, missing manual contractor review state, missing manual homeowner clarification state, missing manual homeowner clarification response-review state, response review decision not PASS, response completeness PARTIAL / NEEDS INFO without owner, remaining homeowner information gaps have no owner, remaining contractor-facing questions have no owner, remaining founder/operator questions have no owner, remaining photos/documentation gaps have no owner, remaining insurance context gaps have no owner, remaining roof/damage/service-scope gaps have no owner, remaining access gaps have no owner, remaining scheduling gaps have no owner, unresolved estimate assumptions, unresolved estimate unknowns, contractor questions unanswered, founder/operator questions unanswered, homeowner questions/concerns unresolved, prior recommended downstream route conflicts with current facts, final manual downstream route unclear, route conflict status unresolved, next manual action missing, next manual action owner missing, consent/safety concern unresolved, production activation risk, live send risk, live booking risk, live estimate or quote risk, or payment/invoice risk.
- Log founder/operator decisions in the founder/operator routing decision log with PASS / HOLD / BLOCKED and DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED states.
- Track every lead in the manual downstream routing tracker with approval state, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.
- Produce an end-of-day manual downstream routing report.
- Leave handoff notes for the next operator session.

All steps use "book inspections" / "book appointments" language only. The goal is to manually route leads after homeowner clarification response review (and upstream) so that the founder/operator can later perform any needed manual routing or coordination and prepare to book inspections and prepare to book appointments. Every worksheet and decision carries the explicit note that it is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, book, notify, calendar, or touch production systems. Follow-up status may reference approved for manual follow-up from upstream packets.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable packet that can be printed or used in a working session to manually route leads (intake, upstream reconciliation, response-review status, gap classification, route eligibility, per-route worksheets, conflict resolution, owner assignment, next-action checklist, HOLD/BLOCKED decisions, reporting, and handoff) for multiple leads without any production systems, live sends, live booking, live notifications, live estimate creation, live quote generation/sends, or automated actions.

This packet references and builds on:
- `docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

References for verification: First Roofer Homeowner Clarification Response Review Command Packet (primary), First Roofer Homeowner Clarification Command Packet, First Roofer Contractor Estimate Review Command Packet, First Roofer Estimate Prep Command Packet, First Roofer Estimate / Next-Step Readiness Command Packet, First Roofer Manual Follow-Up Command Packet, First Roofer Appointment Outcome Command Packet, First Roofer Appointment Readiness Command Packet, First Roofer Inspection Coordination Command Packet, first-roofer day-one command center, and Agent Product Quality Gate.

## Inputs from First Roofer Homeowner Clarification Response Review Command Packet

This packet is the direct successor step after the First Roofer Homeowner Clarification Response Review Command Packet for deciding manual downstream routing of a lead whose homeowner clarification response has been reviewed and marked REVIEWED or READY TO ROUTE MANUALLY with a PASS decision. Before using this packet for any lead, the founder/operator must have completed (or explicitly recorded status from) the First Roofer Homeowner Clarification Response Review Command Packet for the lead, especially the manual homeowner clarification response-review state, the manual response-review decision, the response completeness, all resolved gaps, remaining gaps with owners, recommended downstream route, and the READY TO ROUTE MANUALLY decision.

Required inputs consumed from First Roofer Homeowner Clarification Response Review Command Packet:
- Lead ID, homeowner name, property address, lead source, source detail, service type.
- Contact permission status and homeowner preferred channel.
- Contractor match and contractor service-area fit.
- Prior appointment outcome, appointment readiness state, inspection coordination state.
- Manual follow-up state, estimate / next-step state, manual estimate prep state, manual contractor review state, manual homeowner clarification state.
- Manual homeowner clarification response-review state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED.
- Manual response-review decision: PASS / HOLD / BLOCKED.
- Response completeness: COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED.
- Remaining homeowner information gaps, remaining contractor-facing questions, remaining founder/operator questions, remaining photos/documentation gaps, remaining insurance context gaps, remaining roof/damage/service-scope gaps, remaining access gaps, remaining scheduling gaps (all with owners assigned where gaps remain).
- Estimate assumptions resolved, estimate unknowns resolved, contractor questions answered, founder/operator questions answered, homeowner questions/concerns captured.
- Consent/safety concern status.
- Prior recommended downstream route.
- Any noted routing conflicts or open items from response review.
- Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no recorded in prior packet.

If the prior manual homeowner clarification response-review state is not REVIEWED or READY TO ROUTE MANUALLY, or if the prior decision was not PASS, or if any prior HOLD/BLOCKED without documented clearance exists, immediately apply manual downstream routing HOLD or BLOCKED rules.

Lead routing intake from homeowner clarification response review template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Contact permission status: granted / pending / unknown / do-not-contact
- Homeowner preferred channel: SMS / phone / email / unknown
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Appointment readiness state (from prior): ____________________
- Inspection coordination state (from prior): ____________________
- Manual follow-up state (from prior): DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Estimate / next-step state (from prior): DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Manual estimate prep state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual contractor review state (from prior): DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual homeowner clarification state (from prior): DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED
- Manual homeowner clarification response-review state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED
- Manual response-review decision (from prior): PASS / HOLD / BLOCKED
- Response completeness (from prior): COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED
- Remaining homeowner information gaps (from prior, with owner): ____________________
- Remaining contractor-facing questions (from prior, with owner): ____________________
- Remaining founder/operator questions (from prior, with owner): ____________________
- Remaining photos/documentation gaps (from prior, with owner): ____________________
- Remaining insurance context gaps (from prior, with owner): ____________________
- Remaining roof/damage/service-scope gaps (from prior, with owner): ____________________
- Remaining access gaps (from prior, with owner): ____________________
- Remaining scheduling gaps (from prior, with owner): ____________________
- Estimate assumptions resolved (from prior): yes / no / partial
- Estimate unknowns resolved (from prior): yes / no / partial
- Contractor questions answered (from prior): yes / no / partial
- Founder/operator questions answered (from prior): yes / no / partial
- Homeowner questions/concerns captured (from prior): yes / no / partial
- Consent/safety concern status (from prior): ____________________
- Prior recommended downstream route (from prior): RETURN TO CONTRACTOR ESTIMATE REVIEW / RETURN TO MANUAL ESTIMATE PREP / RETURN TO ESTIMATE NEXT-STEP READINESS / RETURN TO MANUAL FOLLOW-UP / RETURN TO APPOINTMENT OR ACCESS COORDINATION / READY FOR FOUNDER REVIEW / HOLD / BLOCKED
- First Roofer Homeowner Clarification Response Review Command Packet reference / timestamp: ____________________
- Inputs from homeowner clarification response review status: READY TO ROUTE MANUALLY / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from First Roofer Homeowner Clarification Command Packet

Required inputs consumed from First Roofer Homeowner Clarification Command Packet (via the response review packet or direct reference):
- Lead ID, homeowner name, property address.
- Manual homeowner clarification state: DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED.
- Homeowner clarification package, missing homeowner constraints, photos/documentation request-prep, insurance context clarification, roof/damage/service-scope clarification, access and scheduling clarification, contractor question translation, founder/operator clarification questions.
- Manual homeowner clarification decision: PASS / HOLD / BLOCKED.
- Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

Lead routing intake from homeowner clarification template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Manual homeowner clarification state (from prior): DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED
- Manual homeowner clarification decision (from prior): PASS / HOLD / BLOCKED
- Homeowner clarification packet reference / timestamp: ____________________
- Inputs from homeowner clarification status: READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from First Roofer Contractor Estimate Review Command Packet

Required inputs consumed from First Roofer Contractor Estimate Review Command Packet (via upstream packets or direct reference):
- Lead ID, homeowner name, property address.
- Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED.
- Contractor review decision: PASS / HOLD / BLOCKED.
- Contractor match and contractor service-area fit.
- Any noted homeowner clarification needs.
- Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

Lead routing intake from contractor estimate review template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Manual contractor review state (from prior): DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual contractor review decision (from prior): PASS / HOLD / BLOCKED
- Contractor estimate review packet reference / timestamp: ____________________
- Inputs from contractor estimate review status: READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from First Roofer Estimate Prep Command Packet

Required inputs consumed from First Roofer Estimate Prep Command Packet (via upstream packets or direct reference):
- Lead ID, homeowner name, property address.
- Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED.
- Inspection notes, contractor notes, homeowner constraints, roof/damage/service-scope, photos/insurance/documentation, assumptions/unknowns, contractor/homeowner questions status from prior.
- Manual estimate prep decision: PASS / HOLD / BLOCKED.
- Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

Lead routing intake from estimate prep template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Manual estimate prep state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual estimate prep decision (from prior): PASS / HOLD / BLOCKED
- Estimate prep packet reference / timestamp: ____________________
- Inputs from estimate prep status: READY FOR MANUAL ESTIMATE PREP / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from First Roofer Estimate / Next-Step Readiness Command Packet

Inputs from Estimate / Next-Step Readiness are consumed here for manual downstream routing decisions after response review. Required inputs consumed from First Roofer Estimate / Next-Step Readiness Command Packet (via upstream packets or direct reference):
- Lead ID, homeowner name, property address.
- Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED.
- Estimate readiness and contractor next-step readiness.
- Manual estimate prep owner, manual contractor next-step owner.
- Estimate created: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

Lead routing intake from estimate / next-step readiness template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Estimate / next-step state (from prior): DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Estimate / next-step readiness packet reference / timestamp: ____________________
- Inputs from estimate / next-step readiness status: READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from First Roofer Manual Follow-Up Command Packet

Inputs from Manual Follow-Up are consumed here for manual downstream routing decisions after response review. Required inputs consumed from First Roofer Manual Follow-Up Command Packet (via upstream packets or direct reference):
- Lead ID, homeowner name, property address.
- Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED.
- Reschedule needed, estimate requested, next-step needed.
- Any noted conflicts or escalation items.
- Follow-up sent: no, Estimate created: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

Lead routing intake from manual follow-up template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Manual follow-up state (from prior): DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Manual follow-up packet reference / timestamp: ____________________
- Inputs from manual follow-up status: APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

## Inputs from First Roofer Appointment Outcome / Appointment Readiness / Inspection Coordination packets

Required inputs consumed from First Roofer Appointment Outcome Command Packet, First Roofer Appointment Readiness Command Packet, and First Roofer Inspection Coordination Command Packet (via upstream packets or direct reference):

Inputs from Appointment Outcome Command Packet:
- Lead ID, homeowner name, property address.
- Prior appointment outcome (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED).
- Manual outcome classification and manual outcome state.
- Inspection completed, access issue, photos taken during visit, insurance claim details.
- Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no from prior packets.

Inputs from Appointment Readiness Command Packet:
- Appointment readiness state.
- Selected manual appointment window, homeowner and contractor window confirmed status.

Inputs from Inspection Coordination Command Packet:
- Inspection coordination state.
- Proposed inspection windows, homeowner and contractor confirmation status.

Lead routing intake from appointment outcome / readiness / inspection coordination template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Appointment readiness state (from prior): ____________________
- Inspection coordination state (from prior): ____________________
- Manual outcome classification (from prior): ____________________
- Manual outcome state (from prior): DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Appointment outcome packet reference / timestamp: ____________________
- Appointment readiness packet reference / timestamp: ____________________
- Inspection coordination packet reference / timestamp: ____________________
- Inputs from appointment outcome status: OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Inputs from appointment readiness status: ____________________
- Inputs from inspection coordination status: ____________________
- Owner: ____________________
- Timestamp: ____________________

## Manual downstream routing prerequisites

Before using this packet for any lead, the founder/operator must confirm the following prerequisites from prior packets including the homeowner clarification response review packet (mark explicitly). This packet does not replace those; it consumes their outputs for routing decisions.

- [ ] First Roofer Day-One Command Center has been reviewed for the lead.
- [ ] First Roofer Inspection Coordination Command Packet: inspection coordination decision and inspection readiness decision reviewed; proposed inspection windows captured; homeowner and contractor confirmation status recorded.
- [ ] First Roofer Appointment Readiness Command Packet: appointment readiness decision PASS; selected manual appointment window recorded; homeowner and contractor window confirmed status recorded.
- [ ] First Roofer Appointment Outcome Command Packet: outcome classification completed; manual outcome state OUTCOME READY FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); homeowner/contractor follow-up status worksheets from outcome captured; reschedule/estimate/next-step flags recorded.
- [ ] First Roofer Manual Follow-Up Command Packet: follow-up ownership completed; homeowner/contractor/reschedule/estimate/next-step/no-show/completed/cancelled follow-up preparation worksheets completed; manual follow-up state APPROVED FOR MANUAL FOLLOW-UP (or explicit HOLD/BLOCKED with clearance); follow-up decision logged.
- [ ] First Roofer Estimate / Next-Step Readiness Command Packet: estimate / next-step readiness determination completed; estimate / next-step state READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (or explicit HOLD/BLOCKED with clearance); estimate readiness, contractor next-step readiness, manual estimate prep owner, manual contractor next-step owner, manual homeowner info owner, and insurance/photos/damage details worksheets captured.
- [ ] First Roofer Estimate Prep Command Packet: estimate prep completed; inspection notes, contractor notes, homeowner constraints, roof/damage/service-scope, photos/insurance/documentation, assumptions/unknowns, contractor/homeowner questions worksheets captured; manual estimate prep decision PASS and manual estimate prep state indicating readiness for contractor review (or explicit HOLD/BLOCKED with clearance); manual estimate prep owner recorded.
- [ ] First Roofer Contractor Estimate Review Command Packet: contractor estimate review completed; contractor review package, scope summary, photos/documentation review, insurance context review, contractor/founder/homeowner clarification worksheets captured; manual contractor review decision PASS and manual contractor review state indicating completion or open homeowner clarification needs (or explicit HOLD/BLOCKED with clearance); manual contractor review owner recorded; any homeowner clarification needs explicitly flagged.
- [ ] First Roofer Homeowner Clarification Command Packet: homeowner clarification package, missing homeowner constraints, photos/documentation request-prep, insurance context clarification, roof/damage/service-scope clarification, access and scheduling clarification, contractor question translation, founder/operator clarification questions, and manual clarification draft-prep worksheets completed; manual homeowner clarification decision PASS and manual homeowner clarification state READY FOR MANUAL HOMEOWNER CLARIFICATION (or explicit HOLD/BLOCKED with clearance); manual homeowner clarification owner recorded; clarification reason and prepared questions/gaps captured.
- [ ] First Roofer Homeowner Clarification Response Review Command Packet: homeowner response capture summary, response completeness review, missing homeowner constraints resolution, photos/documentation received review, insurance context response review, roof/damage/service-scope response review, access and scheduling response review, contractor questions answered review, founder/operator questions answered review, homeowner questions and concerns review, estimate assumptions resolution, estimate unknowns resolution, downstream readiness routing worksheet, manual response-review decision worksheet completed; manual response-review decision PASS and manual homeowner clarification response-review state REVIEWED or READY TO ROUTE MANUALLY (or explicit HOLD/BLOCKED with clearance); manual response-review owner recorded; response completeness, remaining gaps with owners, and prior recommended downstream route captured.
- [ ] Contact permission status: granted (or explicit handling for pending/unknown recorded under HOLD rules).
- [ ] Contractor match identified and service-area fit assessed and confirmed yes.
- [ ] Manual homeowner clarification response-review state from prior packet is REVIEWED or READY TO ROUTE MANUALLY and manual response-review decision is PASS.
- [ ] No production activation flags are true; all dry-run flags confirmed.
- [ ] Agent product quality gate has been run for the current workspace.
- [ ] This packet is being used only for manual founder/operator review and manual coordination rehearsal.

Lead routing prerequisites template:
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Contact permission status: granted / pending / unknown / do-not-contact
- Homeowner preferred channel: SMS / phone / email / unknown
- Contractor match (from prior packet): ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Appointment readiness state (from prior): ____________________
- Inspection coordination state (from prior): ____________________
- Manual follow-up state (from prior): DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED
- Estimate / next-step state (from prior): DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Manual estimate prep state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual contractor review state (from prior): DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Manual homeowner clarification state (from prior): DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED
- Manual homeowner clarification decision (from prior): PASS / HOLD / BLOCKED
- Manual homeowner clarification response-review state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED
- Manual response-review decision (from prior): PASS / HOLD / BLOCKED
- Response completeness (from prior): COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED
- Prior recommended downstream route (from prior): ____________________
- Manual downstream routing owner (assign now if missing): ____________________
- First Roofer Homeowner Clarification Response Review Command Packet reference / timestamp: ____________________
- Manual downstream routing prerequisites status: PASS / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

If any prerequisite is not met or prior packet shows HOLD/BLOCKED without clearance, or if response review decision was not PASS, or if response-review state is not REVIEWED/READY TO ROUTE MANUALLY, apply HOLD or BLOCKED rules immediately and do not proceed to routing.

## Lead routing intake checklist

Use this checklist for every lead entering manual downstream routing. Mark explicitly. This is the entry gate after the Homeowner Clarification Response Review Command Packet (for leads with reviewed responses ready to route).

- [ ] Lead ID recorded
- [ ] Homeowner name present
- [ ] Property address present (full or partial)
- [ ] Lead source + source detail credible
- [ ] Service type identified (inspection, repair, storm response, etc.)
- [ ] Contact permission status: granted / pending / unknown / do-not-contact
- [ ] Homeowner preferred channel: SMS / phone / email / unknown
- [ ] Contractor match recorded
- [ ] Contractor service-area fit: yes / no / hold
- [ ] Prior appointment outcome recorded (COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED)
- [ ] Appointment readiness state recorded
- [ ] Inspection coordination state recorded
- [ ] Manual follow-up state: APPROVED FOR MANUAL FOLLOW-UP (or HOLD/BLOCKED cleared)
- [ ] Estimate / next-step state: READY FOR MANUAL ESTIMATE PREP or READY FOR MANUAL NEXT STEP (or HOLD/BLOCKED cleared)
- [ ] Manual estimate prep state: indicates readiness for contractor review or open gaps (or HOLD/BLOCKED cleared)
- [ ] Manual contractor review state: indicates completion or open homeowner clarification needs (or HOLD/BLOCKED cleared)
- [ ] Manual homeowner clarification state: READY FOR MANUAL HOMEOWNER CLARIFICATION (or HOLD/BLOCKED cleared)
- [ ] Manual homeowner clarification decision: PASS (or HOLD/BLOCKED cleared)
- [ ] Manual homeowner clarification response-review state: REVIEWED or READY TO ROUTE MANUALLY (or HOLD/BLOCKED cleared)
- [ ] Manual response-review decision: PASS (or HOLD/BLOCKED cleared)
- [ ] Response completeness: COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED
- [ ] Remaining homeowner information gaps identified and owned (or none)
- [ ] Remaining contractor-facing questions identified and owned (or none)
- [ ] Remaining founder/operator questions identified and owned (or none)
- [ ] Remaining photos/documentation gaps identified and owned (or none)
- [ ] Remaining insurance context gaps identified and owned (or none)
- [ ] Remaining roof/damage/service-scope gaps identified and owned (or none)
- [ ] Remaining access gaps identified and owned (or none)
- [ ] Remaining scheduling gaps identified and owned (or none)
- [ ] Estimate assumptions resolved (or owned)
- [ ] Estimate unknowns resolved (or owned)
- [ ] Contractor questions answered (or owned)
- [ ] Founder/operator questions answered (or owned)
- [ ] Homeowner questions/concerns captured (or owned)
- [ ] Consent/safety concern status: clear / unresolved
- [ ] Prior recommended downstream route recorded
- [ ] Manual downstream routing owner assigned
- [ ] Manual routing reviewer assigned
- [ ] Route decision timestamp recorded
- [ ] Routing reason recorded
- [ ] Routing evidence/source reference recorded
- [ ] Final manual downstream route recorded
- [ ] Route conflict status: none / resolved / unresolved
- [ ] Next manual action recorded
- [ ] Next manual action owner recorded
- [ ] Next manual action due date recorded
- [ ] Manual downstream routing readiness: READY / NEEDS INFO / HOLD / BLOCKED
- [ ] Manual downstream routing decision: PASS / HOLD / BLOCKED
- [ ] Manual downstream routing state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED
- [ ] Estimate created: no
- [ ] Quote generated: no
- [ ] Quote sent: no
- [ ] Contractor notification sent: no
- [ ] Homeowner notification sent: no
- [ ] Follow-up sent: no
- [ ] Calendar booking performed: no
- [ ] External notification sent: no
- [ ] Production system touched: no
- [ ] Founder/operator notes: ____________________
- [ ] Next manual action: ____________________

If contact permission status is not "granted" or is "do-not-contact", immediately apply HOLD / BLOCKED rules. Do not advance routing that would imply contact or coordination without explicit consent clearance.

If contractor match is not confirmed or contractor service-area fit is not yes, apply HOLD / BLOCKED rules immediately.

If manual response-review decision is not PASS or response-review state is not REVIEWED/READY TO ROUTE MANUALLY, apply HOLD / BLOCKED rules immediately.

## Upstream state reconciliation worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Upstream State Reconciliation Worksheet (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Contact permission status: ____________________
- Homeowner preferred channel: ____________________
- Contractor match: ____________________
- Contractor service-area fit: yes / no / hold
- Prior appointment outcome: ____________________
- Appointment readiness state: ____________________
- Inspection coordination state: ____________________
- Manual follow-up state (from prior): ____________________
- Estimate / next-step state (from prior): ____________________
- Manual estimate prep state (from prior): ____________________
- Manual contractor review state (from prior): ____________________
- Manual homeowner clarification state (from prior): ____________________
- Manual homeowner clarification decision (from prior): PASS / HOLD / BLOCKED
- Manual homeowner clarification response-review state (from prior): ____________________
- Manual response-review decision (from prior): PASS / HOLD / BLOCKED
- Response completeness (from prior): COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED
- Estimate assumptions resolved (from prior): yes / no / partial
- Estimate unknowns resolved (from prior): yes / no / partial
- Contractor questions answered (from prior): yes / no / partial
- Founder/operator questions answered (from prior): yes / no / partial
- Homeowner questions/concerns captured (from prior): yes / no / partial
- Consent/safety concern status: ____________________
- Prior recommended downstream route (from prior): ____________________
- First Roofer Homeowner Clarification Response Review Command Packet reference / timestamp: ____________________
- Upstream state reconciliation complete: yes / no
- Route eligibility check (link to eligibility matrix): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Homeowner clarification response review status worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Manual Homeowner Clarification Response Review Status Worksheet (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Manual homeowner clarification response-review state (from prior): DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED
- Manual response-review decision (from prior): PASS / HOLD / BLOCKED
- Response completeness (from prior): COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED
- Response captured outside system confirmed (from prior): yes / no
- Response captured by (from prior): ____________________
- Response captured timestamp (from prior): ____________________
- Response source / channel (from prior): ____________________
- First Roofer Homeowner Clarification Command Packet reference (from prior): ____________________
- First Roofer Homeowner Clarification Response Review Command Packet reference / timestamp: ____________________
- Response-review owner (from prior): ____________________
- Response-review reviewer (from prior): ____________________
- Response-review decision timestamp (from prior): ____________________
- Response completeness review notes (from prior): ____________________
- Remaining gaps carried forward with owners (summary): ____________________
- Consent/safety concern status (from response review): ____________________
- Homeowner clarification response review status worksheet complete: yes / no
- Downstream routing readiness (link to routing worksheet): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Remaining gap classification worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Remaining Gap Classification Worksheet (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Remaining homeowner information gaps: ____________________
- Remaining homeowner information gaps owner: ____________________
- Remaining contractor-facing questions: ____________________
- Remaining contractor-facing questions owner: ____________________
- Remaining founder/operator questions: ____________________
- Remaining founder/operator questions owner: ____________________
- Remaining photos/documentation gaps: ____________________
- Remaining photos/documentation gaps owner: ____________________
- Remaining insurance context gaps: ____________________
- Remaining insurance context gaps owner: ____________________
- Remaining roof/damage/service-scope gaps: ____________________
- Remaining roof/damage/service-scope gaps owner: ____________________
- Remaining access gaps: ____________________
- Remaining access gaps owner: ____________________
- Remaining scheduling gaps: ____________________
- Remaining scheduling gaps owner: ____________________
- Estimate assumptions resolved: yes / no / partial
- Estimate unknowns resolved: yes / no / partial
- Contractor questions answered: yes / no / partial
- Founder/operator questions answered: yes / no / partial
- Homeowner questions/concerns captured: yes / no / partial
- Consent/safety concern status: ____________________
- Gap classification complete: yes / no
- Route eligibility impact (link to eligibility matrix): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Route eligibility matrix

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Route Eligibility Matrix (internal worksheet only; routes may only be selected when all conditions are met)

RETURN TO CONTRACTOR ESTIMATE REVIEW is only allowed when:
- homeowner clarification response-review state is REVIEWED or READY TO ROUTE MANUALLY
- response-review decision is PASS
- contractor match is confirmed
- contractor service-area fit is confirmed
- remaining contractor-facing questions are identified and owned
- no live notification or send is triggered
- Estimate created: no
- Quote generated: no
- Contractor notification sent: no
- All other safety markers remain no

RETURN TO MANUAL ESTIMATE PREP is only allowed when:
- homeowner information, photos/documentation, insurance context, roof/damage/service-scope, access/scheduling, estimate assumptions, and estimate unknowns are sufficient or owned
- manual estimate prep owner is assigned
- Estimate created: no and Quote generated: no remain true
- All safety markers remain no

RETURN TO ESTIMATE NEXT-STEP READINESS is only allowed when:
- response review has resolved enough information to determine next-step readiness
- estimate / next-step owner is assigned
- no estimate or quote is created
- Estimate created: no
- Quote generated: no
- All safety markers remain no

RETURN TO MANUAL FOLLOW-UP is only allowed when:
- follow-up is draft-only
- follow-up owner is assigned
- Follow-up sent: no remains true
- All safety markers remain no

RETURN TO APPOINTMENT OR ACCESS COORDINATION is only allowed when:
- the issue is access/scheduling/appointment coordination
- inspection/appointment owner is assigned
- Calendar booking performed: no remains true
- All safety markers remain no

READY FOR FOUNDER REVIEW is only allowed when:
- route has been prepared but the founder/operator must approve before any manual next action
- all safety markers remain no
- Manual downstream routing state can be set to READY FOR FOUNDER REVIEW

HOLD is required when:
- information is missing but can be resolved manually
- owner and next manual action can be assigned
- Manual downstream routing readiness: HOLD
- Manual downstream routing decision: HOLD
- Manual downstream routing state: HOLD

BLOCKED is required when:
- BLOCKED due to consent/safety risk, production activation risk, live send risk, live booking risk, live estimate/quote risk, payment/invoice risk, or unresolved do-not-contact condition exists
- Manual downstream routing readiness: BLOCKED
- Manual downstream routing decision: BLOCKED
- Manual downstream routing state: BLOCKED

Route eligibility matrix complete: yes / no
Selected final manual downstream route (must satisfy eligibility): ____________________
Route eligibility justification / evidence reference: ____________________
Founder/operator notes: ____________________
Timestamp: ____________________
Estimate created: no
Quote generated: no
Quote sent: no
Contractor notification sent: no
Homeowner notification sent: no
Follow-up sent: no
Calendar booking performed: no
External notification sent: no
Production system touched: no

## RETURN TO CONTRACTOR ESTIMATE REVIEW route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

RETURN TO CONTRACTOR ESTIMATE REVIEW Route Worksheet (internal worksheet only; only use when eligibility confirmed)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: RETURN TO CONTRACTOR ESTIMATE REVIEW
- Eligibility confirmed (response-review state REVIEWED/READY TO ROUTE MANUALLY + PASS + contractor match yes + service-area fit yes + contractor-facing questions owned): yes / no
- Contractor match: ____________________
- Contractor service-area fit: yes
- Remaining contractor-facing questions (with owner): ____________________
- Manual contractor review owner (re-confirm or assign): ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route decision timestamp: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Final manual downstream route: RETURN TO CONTRACTOR ESTIMATE REVIEW
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## RETURN TO MANUAL ESTIMATE PREP route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

RETURN TO MANUAL ESTIMATE PREP Route Worksheet (internal worksheet only; only use when eligibility confirmed)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: RETURN TO MANUAL ESTIMATE PREP
- Eligibility confirmed (homeowner info / photos / insurance / roof/scope / access/scheduling / assumptions / unknowns sufficient or owned + manual estimate prep owner assigned + Estimate created: no + Quote generated: no): yes / no
- Remaining homeowner information gaps (with owner): ____________________
- Remaining photos/documentation gaps (with owner): ____________________
- Remaining insurance context gaps (with owner): ____________________
- Remaining roof/damage/service-scope gaps (with owner): ____________________
- Remaining access gaps (with owner): ____________________
- Remaining scheduling gaps (with owner): ____________________
- Estimate assumptions resolved: ____________________
- Estimate unknowns resolved: ____________________
- Manual estimate prep owner (re-confirm or assign): ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route decision timestamp: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Final manual downstream route: RETURN TO MANUAL ESTIMATE PREP
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## RETURN TO ESTIMATE NEXT-STEP READINESS route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

RETURN TO ESTIMATE NEXT-STEP READINESS Route Worksheet (internal worksheet only; only use when eligibility confirmed)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: RETURN TO ESTIMATE NEXT-STEP READINESS
- Eligibility confirmed (response review resolved enough for next-step readiness + estimate / next-step owner assigned + no estimate/quote created): yes / no
- Estimate / next-step state (from prior): ____________________
- Estimate readiness (from prior): ____________________
- Contractor next-step readiness (from prior): ____________________
- Manual estimate prep owner (re-confirm or assign): ____________________
- Manual contractor next-step owner (re-confirm or assign): ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route decision timestamp: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Final manual downstream route: RETURN TO ESTIMATE NEXT-STEP READINESS
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## RETURN TO MANUAL FOLLOW-UP route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

RETURN TO MANUAL FOLLOW-UP Route Worksheet (internal worksheet only; only use when eligibility confirmed)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: RETURN TO MANUAL FOLLOW-UP
- Eligibility confirmed (follow-up is draft-only + follow-up owner assigned + Follow-up sent: no): yes / no
- Manual follow-up state (from prior): ____________________
- Reschedule needed (from prior): yes / no / unknown
- Estimate requested (from prior): yes / no / unknown
- Next-step needed (from prior): yes / no / unknown
- Manual follow-up owner (re-confirm or assign): ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route decision timestamp: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Final manual downstream route: RETURN TO MANUAL FOLLOW-UP
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## RETURN TO APPOINTMENT OR ACCESS COORDINATION route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

RETURN TO APPOINTMENT OR ACCESS COORDINATION Route Worksheet (internal worksheet only; only use when eligibility confirmed)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: RETURN TO APPOINTMENT OR ACCESS COORDINATION
- Eligibility confirmed (issue is access/scheduling/appointment coordination + inspection/appointment owner assigned + Calendar booking performed: no): yes / no
- Prior appointment outcome: ____________________
- Appointment readiness state: ____________________
- Inspection coordination state: ____________________
- Remaining access gaps (with owner): ____________________
- Remaining scheduling gaps (with owner): ____________________
- Inspection/appointment owner (re-confirm or assign): ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route decision timestamp: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Final manual downstream route: RETURN TO APPOINTMENT OR ACCESS COORDINATION
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## READY FOR FOUNDER REVIEW route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

READY FOR FOUNDER REVIEW Route Worksheet (internal worksheet only; only use when eligibility confirmed)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: READY FOR FOUNDER REVIEW
- Eligibility confirmed (route prepared but founder/operator must approve before any manual next action + all safety markers no): yes / no
- All upstream states reconciled: yes / no
- All gaps classified with owners: yes / no
- Route eligibility matrix passed: yes / no
- Route conflict status: none / resolved
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route decision timestamp: ____________________
- Final manual downstream route: READY FOR FOUNDER REVIEW
- Next manual action (pending founder review): ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## HOLD route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

HOLD Route Worksheet (internal worksheet only; use when information missing but can be resolved manually)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: HOLD
- HOLD reason (one or more from HOLD/BLOCKED rules): ____________________
- Missing items (owner, reviewer, timestamp, reason, evidence, contact permission, channel, contractor match, prior states, gaps without owner, unresolved items, etc.): ____________________
- Owner assigned for resolution: ____________________
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Route decision timestamp: ____________________
- Routing evidence/source reference: ____________________
- Final manual downstream route: HOLD
- Re-check eligibility after resolution (link to prerequisites and eligibility matrix): ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## BLOCKED route worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

BLOCKED Route Worksheet (internal worksheet only; use when consent/safety, production, live-send, live-booking, live-estimate/quote, payment/invoice, or do-not-contact risk exists)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Route: BLOCKED
- BLOCKED reason (consent/safety concern unresolved, production activation risk, live send risk, live booking risk, live estimate or quote risk, payment/invoice risk, unresolved do-not-contact condition, or other unresolvable blocker per rules): ____________________
- Risk details: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Route decision timestamp: ____________________
- Routing evidence/source reference: ____________________
- Final manual downstream route: BLOCKED
- Escalation or founder review required: yes / no
- No further manual coordination or routing until explicit founder clearance and risk mitigation documented: ____________________
- Founder/operator notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Route conflict resolution worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Route Conflict Resolution Worksheet (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Prior recommended downstream route (from response review): ____________________
- Current facts summary (gaps, states, eligibility): ____________________
- Route conflict status: none / resolved / unresolved
- Conflict description (if any): ____________________
- Resolution (reconcile facts to one eligible route; update prior recommended if needed): ____________________
- Final manual downstream route after resolution: ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route conflict resolution complete: yes / no
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual routing owner assignment worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Manual Routing Owner Assignment Worksheet (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Route decision timestamp: ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Final manual downstream route: ____________________
- Route conflict status resolved: yes / no
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Owner assignment complete: yes / no
- Re-check against HOLD/BLOCKED rules (missing owner/reviewer/timestamp/reason/evidence triggers HOLD): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual next-action checklist

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Manual Next-Action Checklist (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Final manual downstream route: ____________________
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Route decision timestamp: ____________________
- All safety markers confirmed no: yes
- No live send / no estimate / no quote / no booking / no calendar / no production touch confirmed: yes
- Next-action checklist complete: yes / no
- Handoff to next operator (link to handoff section): ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual downstream routing approval states

Manual downstream routing readiness: READY / NEEDS INFO / HOLD / BLOCKED

Manual downstream routing decision: PASS / HOLD / BLOCKED

Manual downstream routing state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED

- DRAFT: initial capture of routing intake and worksheets.
- REVIEWED: all worksheets complete, gaps owned, eligibility checked, no conflicts.
- READY FOR FOUNDER REVIEW: routing prepared; founder/operator must approve before any manual next action.
- READY TO ROUTE MANUALLY: internal state after response review PASS; ready for this packet.
- ROUTED MANUALLY: final manual downstream route decided and logged; owners and next actions assigned (still dry-run; no production action taken).
- HOLD: information missing but resolvable manually with owner and next action assigned.
- BLOCKED: consent/safety risk, production activation risk, live send risk, live booking risk, live estimate/quote risk, payment/invoice risk, or unresolved do-not-contact condition exists.

All states carry repeated safety markers: Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, External notification sent: no, Production system touched: no.

## HOLD / BLOCKED rules

HOLD is required when any of the following (non-exhaustive) apply and can still be resolved manually:
- missing manual routing owner
- missing manual routing reviewer
- missing route decision timestamp
- missing routing reason
- missing routing evidence/source reference
- missing contact permission status
- do-not-contact or unclear permission
- missing homeowner preferred channel
- missing contractor match
- contractor service-area fit not confirmed
- missing prior appointment outcome
- missing appointment readiness state
- missing inspection coordination state
- missing manual follow-up state
- missing estimate / next-step state
- missing manual estimate prep state
- missing manual contractor review state
- missing manual homeowner clarification state
- missing manual homeowner clarification response-review state
- response review decision not PASS
- response completeness PARTIAL / NEEDS INFO without owner
- remaining homeowner information gaps have no owner
- remaining contractor-facing questions have no owner
- remaining founder/operator questions have no owner
- remaining photos/documentation gaps have no owner
- remaining insurance context gaps have no owner
- remaining roof/damage/service-scope gaps have no owner
- remaining access gaps have no owner
- remaining scheduling gaps have no owner
- unresolved estimate assumptions
- unresolved estimate unknowns
- contractor questions unanswered
- founder/operator questions unanswered
- homeowner questions/concerns unresolved
- prior recommended downstream route conflicts with current facts
- final manual downstream route unclear
- route conflict status unresolved
- next manual action missing
- next manual action owner missing
- consent/safety concern unresolved (but potentially resolvable)
- production activation risk (but potentially mitigable)
- live send risk (but potentially mitigable)
- live booking risk (but potentially mitigable)
- live estimate or quote risk (but potentially mitigable)
- payment/invoice risk (but potentially mitigable)

BLOCKED is required when any of the following (non-exhaustive) apply:
- consent/safety risk, production activation risk, live send risk, live booking risk, live estimate/quote risk, payment/invoice risk, or unresolved do-not-contact condition exists
- Any unresolvable blocker that would violate dry-run/internal-only/founder-operator-only posture or introduce production activation, live send, live booking, live estimate/quote, or payment/invoice exposure.

HOLD / BLOCKED rules must be re-checked on every use of this packet. If any HOLD or BLOCKED condition is present, the manual downstream routing decision must be HOLD or BLOCKED and the state must reflect it. No routing to an active next-step route is permitted while HOLD or BLOCKED conditions exist.

## No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules

This packet is strictly dry-run/internal-only/founder-operator-only. The following are forbidden and must remain false/no throughout:

- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

The packet itself must never send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, book appointments, create calendar events, write production data, or activate automation.

Any real-world manual routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval and only after all safety markers are confirmed no and the packet decision is PASS with a valid route.

Required dry-run flags must be confirmed before every session: WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

## Manual downstream routing tracker

Manual downstream routing tracker (one entry per lead; append-only for the session; all safety markers must remain no):

| Lead ID | Homeowner Name | Property Address | Final Manual Downstream Route | Manual Downstream Routing State | Manual Routing Owner | Manual Routing Reviewer | Route Decision Timestamp | Routing Reason / Evidence | Next Manual Action | Next Manual Action Owner | Next Manual Action Due | Estimate Created | Quote Generated | Contractor Notif Sent | Homeowner Notif Sent | Follow-up Sent | Calendar Booking Performed | External Notif Sent | Production Touched |
|---------|----------------|------------------|--------------------------------|---------------------------------|----------------------|-------------------------|--------------------------|---------------------------|--------------------|--------------------------|------------------------|------------------|-----------------|-----------------------|----------------------|--------------|----------------------------|---------------------|--------------------|
| ________ | ________ | ________ | RETURN TO ... / READY FOR FOUNDER REVIEW / HOLD / BLOCKED | DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED | ________ | ________ | ________ | ________ | ________ | ________ | ________ | no | no | no | no | no | no | no | no |

Manual downstream routing tracker complete for session: yes / no
All entries confirm Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.

## Founder/operator routing decision log

Founder/Operator Routing Decision Log entry (one per lead decision; append-only):

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Manual downstream routing readiness: READY / NEEDS INFO / HOLD / BLOCKED
- Manual downstream routing decision: PASS / HOLD / BLOCKED
- Manual downstream routing state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED
- Final manual downstream route: ____________________
- Routing reason: ____________________
- Routing evidence/source reference: ____________________
- Route conflict status: none / resolved / unresolved
- Manual routing owner: ____________________
- Manual routing reviewer: ____________________
- Route decision timestamp: ____________________
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Consent/safety concern status: ____________________
- All safety markers (Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no): confirmed
- Founder/operator notes: ____________________
- Log entry timestamp: ____________________

Founder/Operator Routing Decision Log complete for session: yes / no

## End-of-day manual downstream routing report

End-of-Day Manual Downstream Routing Report (internal only; summarize the session without any production impact):

- Date: ____________________
- Operator(s): ____________________
- Total leads routed this session: ____
- Routes selected:
  - RETURN TO CONTRACTOR ESTIMATE REVIEW: ____
  - RETURN TO MANUAL ESTIMATE PREP: ____
  - RETURN TO ESTIMATE NEXT-STEP READINESS: ____
  - RETURN TO MANUAL FOLLOW-UP: ____
  - RETURN TO APPOINTMENT OR ACCESS COORDINATION: ____
  - READY FOR FOUNDER REVIEW: ____
  - HOLD: ____
  - BLOCKED: ____
- Leads with Manual downstream routing decision PASS: ____
- Leads with Manual downstream routing decision HOLD: ____
- Leads with Manual downstream routing decision BLOCKED: ____
- Leads with route conflicts resolved: ____
- Leads escalated for founder review: ____
- All safety markers across all leads: Estimate created across all: no; Quote generated across all: no; Quote sent across all: no; Contractor notification sent across all: no; Homeowner notification sent across all: no; Follow-up sent across all: no; Calendar booking performed across all: no; External notification sent across all: no; Production system touched across all: no.
- Open items / unresolved gaps carried forward: ____________________
- Quality gate run: yes (node backend/scripts/verify-agent-product-quality-gate-readonly.js and scripts/check-agent-product-quality-gate.sh)
- Dry-run flags confirmed: yes (WORKSPACE_MODE=dry-run and all ACTIVATION=false)
- End-of-day report complete: yes / no
- Prepared by: ____________________
- Timestamp: ____________________

## Next-operator handoff

Handoff Notes (for next operator session; internal only; dry-run flag confirmation required):

- Session date: ____________________
- Leads in progress (Lead ID + final manual downstream route + state + next manual action + owner + due date): ____________________
- Leads in HOLD (Lead ID + HOLD reason + owner + next action + due): ____________________
- Leads in BLOCKED (Lead ID + BLOCKED reason + escalation notes): ____________________
- Leads ready for founder review (Lead ID + routing summary): ____________________
- Open gaps / items requiring follow-up before next routing: ____________________
- Dry-run flag confirmation for next session: WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.
- All safety markers remain no: Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no.
- Agent product quality gate passed in this session: yes / no
- Packet verifier passed: yes / no
- Notes for next operator: ____________________
- Handoff prepared by: ____________________
- Handoff timestamp: ____________________
- Next-operator notes: ____________________

## Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation

This packet creates only internal, dry-run, founder-operator-only worksheets and decision artifacts.

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
- No homeowner notification sent.
- No follow-up sent.
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

All work is manual founder/operator review and manual coordination only.

The packet helps the founder/operator manually route leads after the First Roofer Homeowner Clarification Response Review Command Packet (and upstream packets) and prepare to book inspections and prepare to book appointments. It does not send homeowner messages, does not send contractor notifications, does not create estimates, does not generate quotes, does not send quotes, does not book anything live, does not create calendar events, does not write production data, and does not activate any production system.

Any real-world manual routing or next action must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, book, notify, calendar, or touch production systems.

**End of First Roofer Manual Downstream Routing Command Packet.**
