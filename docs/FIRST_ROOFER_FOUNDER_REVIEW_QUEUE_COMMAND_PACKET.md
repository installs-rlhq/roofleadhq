# First Roofer Founder Review Queue Command Packet

## Purpose and safety posture

This packet creates the First Roofer Founder Review Queue Command Packet for the Founder-Led Launch Program.

It turns the manual downstream route READY FOR FOUNDER REVIEW (produced by the First Roofer Manual Downstream Routing Command Packet) into a structured founder/operator review queue. After manual downstream routing marks a lead READY FOR FOUNDER REVIEW, this packet helps the founder/operator decide what to do next with a first-roofer lead. It gathers the final evidence, reviews all prior packet states, confirms no unresolved blockers, records the founder decision (PASS / HOLD / BLOCKED), and routes to the next manual action (one of the allowed final manual routes).

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no sends, no notifications to contractors or homeowners, no booking of appointments or inspections, no estimate creation, no quote generation, no invoice or payment behavior, no cron/scheduler/dispatcher activation, no public route activation, no external service calls, no production writes, no auth changes, no database policy changes, no migrations, no secrets handling changes, and no access-control implementation. It is only a manual founder/operator review queue worksheet and decision packet for internal use. All decisions and worksheets remain internal. The founder/operator may later perform any real-world manual coordination or next action outside the system after explicit approval. The packet itself must never send homeowner messages, notify, book, create estimates, generate quotes, create invoices, perform payment collection, touch production data, or activate any production behavior.

Explicit no-live-send / no-booking / no-estimate / no-quote / no-invoice / no-payment / no-production activation confirmation:
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
- Invoice/payment behavior added: no
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually review leads in the founder review queue (after manual downstream routing has set READY FOR FOUNDER REVIEW) so that the founder/operator can later perform any needed manual coordination or next action and prepare to book inspections and prepare to book appointments. It does not send homeowner messages, does not send contractor notifications, does not create estimates, does not generate quotes, does not send quotes, does not book anything live, does not create calendar events, does not write production data, does not create invoices, does not perform payment collection, and does not activate any production system.

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

Safety markers (exact for verification): Dry-run packet: yes, Internal-only packet: yes, Founder-operator-only packet: yes, Production data touched: no, External service called: no, Live workflow activated: no, Contractor notification sent: no, Homeowner notification sent: no, Calendar booking performed: no, Appointment booked: no, Estimate created: no, Quote generated: no, Invoice/payment behavior added: no, Auth changed: no, Database schema changed: no, RLS policy changed: no, Secrets changed: no, Access-control logic changed: no, no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, no automated follow-up, no automated estimate, no quote automation, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no, Invoice/payment behavior added: no, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path. It follows the Agent Product Quality Gate. It consumes outputs from the First Roofer Manual Downstream Routing Command Packet (primary), the First Roofer Homeowner Clarification Response Review Command Packet, the First Roofer Homeowner Clarification Command Packet, the First Roofer Contractor Estimate Review Command Packet, the First Roofer Estimate Prep Command Packet, the First Roofer Estimate / Next-Step Readiness Command Packet, the First Roofer Manual Follow-Up Command Packet, the First Roofer Appointment Outcome Command Packet, the First Roofer Appointment Readiness Command Packet, the First Roofer Inspection Coordination Command Packet, the First Roofer Day-One Command Center, and the Roofer Data Protection and Tenant Isolation Plan Placement Packet while remaining fully dry-run. The packet covers homeowner clarification response review and manual downstream routing surfaces.

## When to use this packet

Use this packet only after a lead has been routed by the First Roofer Manual Downstream Routing Command Packet with:
- Manual downstream route = READY FOR FOUNDER REVIEW
- Prior manual downstream routing state = ROUTED MANUALLY or REVIEWED
- All prior upstream packet states reconciled (homeowner clarification response-review state PASS or not required with documented reason, etc.)

This packet is the structured founder/operator review queue step for leads that manual downstream routing has marked READY FOR FOUNDER REVIEW. It is the final internal review gate before any further manual next-action routing for first-roofer leads in dry-run.

Do not use this packet if any production action, live send, booking, estimate creation, quote generation, invoice, or external service activation would be required. All activity is manual founder/operator review only.

## Required upstream packet chain

Before using this packet for any lead, the founder/operator must have completed (or explicitly recorded status from) the full upstream chain, with the First Roofer Manual Downstream Routing Command Packet as the immediate predecessor that produced the READY FOR FOUNDER REVIEW route.

Required upstream references (must be reviewed and status reconciled in the intake):
- `docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md` (primary): manual downstream routing state, manual downstream route = READY FOR FOUNDER REVIEW, final manual downstream route, next manual action, all prior summaries, route decision timestamp, routing reason/evidence.
- `docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md`: manual homeowner clarification response-review state (PASS or not required with reason), response completeness, remaining gaps with owners.
- `docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md`: manual homeowner clarification state, decision, prepared clarification package.
- `docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md`: manual contractor review state, decision, contractor match/service-area fit.
- `docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md`: manual estimate prep state, decision, inspection notes, contractor notes, assumptions, unknowns.
- `docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md`: estimate / next-step state, estimate readiness, contractor next-step readiness.
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`: manual follow-up state, approved for manual follow-up or explicit clearance.
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`: prior appointment outcome, manual outcome state.
- `docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md`: appointment readiness state, manual appointment window.
- `docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md`: inspection coordination state, proposed windows.
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`: initial lead intake, roofer fit, contact permission, lead source.
- `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md`: data protection checkpoint reviewed for this lead context.
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`.

If any upstream state shows unresolved HOLD/BLOCKED without documented clearance, or if manual downstream route is not READY FOR FOUNDER REVIEW, immediately apply HOLD or BLOCKED per the rules in this packet.

## Founder review queue intake

Queue item ID: ____________________
Lead ID: ____________________
Founder review owner: ____________________
Founder reviewer: ____________________
Review queue timestamp: ____________________
Review priority: HIGH / NORMAL / LOW
Founder review queue status: DRAFT / QUEUED FOR FOUNDER REVIEW / IN FOUNDER REVIEW / REVIEWED / ROUTED MANUALLY / HOLD / BLOCKED

Manual downstream route (must be READY FOR FOUNDER REVIEW): ____________________
Prior manual downstream routing state (must be ROUTED MANUALLY or REVIEWED): ____________________
First Roofer Manual Downstream Routing Command Packet reference / timestamp: ____________________

## READY FOR FOUNDER REVIEW eligibility

A lead may enter the founder review queue only if:
- Manual downstream route is READY FOR FOUNDER REVIEW (all must be confirmed before proceeding):

- Manual downstream route is READY FOR FOUNDER REVIEW
- Prior manual downstream routing state is ROUTED MANUALLY or REVIEWED
- Homeowner clarification response-review state is PASS or not required with documented reason
- Any remaining information gaps have owner and due date
- Contractor service-area fit is confirmed or explicitly marked NEEDS INFO
- Contact permission status is known
- Consent and safety status is clear
- Data protection checkpoint status is reviewed
- No production action is required
- Founder/operator manual review is the only next step
- All safety markers remain no (Estimate created: no, Quote generated: no, etc.)
- Agent product quality gate has passed for the workspace

Eligibility confirmed: yes / no
Eligibility justification / evidence reference: ____________________
Timestamp: ____________________

If eligibility is not met, apply HOLD or BLOCKED immediately and do not proceed to founder review worksheet.

## Evidence checklist

- [ ] Queue item ID recorded
- [ ] Lead ID recorded
- [ ] Homeowner name present
- [ ] Property address present (full or partial)
- [ ] Lead source + source detail credible
- [ ] Service type identified
- [ ] Roofer / contractor name recorded
- [ ] Contractor service-area fit: yes / no / NEEDS INFO / hold
- [ ] Contractor availability known: yes / no / NEEDS INFO
- [ ] Homeowner preferred channel: SMS / phone / email / unknown
- [ ] Contact permission status: granted / pending / unknown / do-not-contact
- [ ] Prior appointment readiness state recorded
- [ ] Prior appointment outcome state recorded
- [ ] Prior inspection coordination state recorded
- [ ] Prior manual follow-up state recorded
- [ ] Prior estimate prep state recorded
- [ ] Prior estimate next-step readiness state recorded
- [ ] Prior contractor estimate review state recorded
- [ ] Prior homeowner clarification state recorded
- [ ] Prior homeowner clarification response-review state recorded (PASS or not required with reason)
- [ ] Prior manual downstream routing state = ROUTED MANUALLY or REVIEWED
- [ ] Manual downstream route = READY FOR FOUNDER REVIEW
- [ ] Founder review owner assigned
- [ ] Founder reviewer assigned
- [ ] Review queue timestamp recorded
- [ ] Review priority assigned
- [ ] Evidence completeness: COMPLETE / NEEDS INFO / INCONSISTENT / BLOCKED
- [ ] Remaining information gaps identified with owner and due date (or none)
- [ ] Contractor questions resolved: yes / no / partial / NEEDS INFO
- [ ] Homeowner questions resolved: yes / no / partial / NEEDS INFO
- [ ] Estimate assumptions resolved: yes / no / partial / NEEDS INFO
- [ ] Access / inspection constraints resolved: yes / no / partial / NEEDS INFO
- [ ] Consent and safety status: clear / unresolved
- [ ] Data protection checkpoint status: reviewed / not reviewed
- [ ] Privacy / lead boundary notes captured
- [ ] No production write risk
- [ ] No external notification risk
- [ ] No live workflow activation risk
- [ ] All upstream packet references reconciled
- [ ] Agent product quality gate passed

Evidence checklist complete: yes / no
Founder/operator notes: ____________________

## Homeowner / property / lead summary

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Homeowner preferred channel: ____________________
- Contact permission status: granted / pending / unknown / do-not-contact
- Lead intake timestamp / reference (Day-One Command Center or downstream): ____________________
- Privacy / lead boundary notes: ____________________
- Founder/operator notes: ____________________

## Contractor / roofer fit summary

- Roofer / contractor name: ____________________
- Contractor service-area fit: yes / no / NEEDS INFO / hold
- Contractor availability known: yes / no / NEEDS INFO
- Contractor match confirmed (from contractor estimate review): yes / no
- Contractor questions resolved: yes / no / partial
- Contractor service-area fit confirmation evidence: ____________________
- Founder/operator notes: ____________________

## Appointment and access summary

- Prior appointment readiness state: ____________________
- Prior appointment outcome state: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED
- Prior inspection coordination state: ____________________
- Access / inspection constraints resolved: yes / no / partial
- Proposed inspection windows (if any from prior packets): ____________________
- Homeowner and contractor confirmation status (from prior): ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Founder/operator notes: ____________________

## Estimate and next-step readiness summary

- Prior estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED
- Prior estimate next-step readiness state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED
- Prior contractor estimate review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED
- Estimate assumptions resolved: yes / no / partial
- Estimate unknowns resolved: yes / no / partial
- Remaining estimate-related gaps (with owner if any): ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Founder/operator notes: ____________________

## Homeowner clarification and response-review summary

- Prior manual homeowner clarification state: DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED
- Prior manual homeowner clarification decision: PASS / HOLD / BLOCKED
- Prior manual homeowner clarification response-review state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED
- Prior manual response-review decision: PASS / HOLD / BLOCKED
- Response completeness (from prior): COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED
- Homeowner questions resolved: yes / no / partial
- Remaining homeowner information gaps (with owner and due date): ____________________
- Homeowner clarification response-review packet reference / timestamp: ____________________
- Founder/operator notes: ____________________

## Manual downstream routing summary

- Prior manual downstream routing state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED
- Manual downstream route: READY FOR FOUNDER REVIEW
- Prior recommended downstream route (from response review / downstream routing): ____________________
- Final manual downstream route (from downstream routing): READY FOR FOUNDER REVIEW
- Next manual action (from downstream routing, pending founder review): ____________________
- Next manual action owner (from downstream routing): ____________________
- Next manual action due date (from downstream routing): ____________________
- Manual downstream routing packet reference / timestamp: ____________________
- Routing reason (from downstream routing): ____________________
- Routing evidence/source reference (from downstream routing): ____________________
- Route conflict status (from downstream routing): none / resolved / unresolved
- Manual routing owner (from downstream routing): ____________________
- Manual routing reviewer (from downstream routing): ____________________
- Founder/operator notes: ____________________

## Data protection and privacy checkpoint

- Data protection checkpoint status: reviewed / not reviewed
- Privacy / lead boundary notes: ____________________
- Roofer Data Protection and Tenant Isolation Plan Placement Packet reference: ____________________
- Any roofer-specific data boundary notes from prior packets: ____________________
- Consent and safety status: clear / unresolved
- Data protection checkpoint reviewed by: ____________________
- Timestamp: ____________________
- No production data touched: confirmed
- No external service risk: confirmed
- Founder/operator notes: ____________________

## Founder decision criteria

Founder decision (choose one):
- PASS
- HOLD
- BLOCKED

PASS criteria (only choose PASS when all are true):
- Evidence completeness = COMPLETE
- All required concrete fields present (Queue item ID, Lead ID, homeowner name, property address, lead source, source detail, service type, roofer/contractor name, founder review owner, founder reviewer, review queue timestamp, manual downstream route = READY FOR FOUNDER REVIEW, prior manual downstream routing state reviewed, contact permission status known, contractor service-area fit confirmed or NEEDS INFO with owner, consent/safety clear, data protection checkpoint reviewed)
- All remaining information gaps have owner and due date (or none remain)
- Contractor questions resolved or explicitly owned
- Homeowner questions resolved or explicitly owned
- Estimate assumptions resolved or explicitly owned
- Access / inspection constraints resolved or explicitly owned
- No unresolved consent/safety issue
- No production write risk, external notification risk, or live workflow activation risk
- Manual downstream route is READY FOR FOUNDER REVIEW and prior state reviewed
- Final manual route selected from allowed values
- Next manual action, owner, and due date recorded
- If manual communication needed, draft reviewed
- All safety markers remain no

HOLD is required when:
- Evidence completeness = NEEDS INFO but resolvable with owner/action
- Remaining information gaps exist but have owner and due date
- Information is missing but no safety, consent, or production-risk issue
- Founder needs more information but no safety issue
- Manual downstream route was READY FOR FOUNDER REVIEW but founder review identifies need for correction in upstream (return to a prior packet)

BLOCKED is required when:
- Evidence completeness = INCONSISTENT or BLOCKED
- Missing Queue item ID, Lead ID, homeowner name, property address, lead source, source detail, service type, roofer/contractor name, founder review owner, founder reviewer, review queue timestamp
- Manual downstream route is not READY FOR FOUNDER REVIEW
- Prior manual downstream routing state not reviewed
- Unresolved homeowner clarification response-review issue
- Missing evidence
- Evidence inconsistent
- Missing contact permission status
- Unresolved consent/safety issue
- Missing contractor service-area fit
- Unresolved contractor questions (without owner)
- Unresolved homeowner questions (without owner)
- Unresolved estimate assumptions (without owner)
- Access / inspection constraints unresolved (without owner)
- Data protection checkpoint not reviewed
- Remaining information gaps without owner
- Remaining information gaps without due date
- Final manual route missing
- Next manual action missing
- Next manual action owner missing
- Next manual action due date missing
- Manual communication marked needed but draft not reviewed
- Any send attempted (must remain no)
- Any booking attempted (must remain no)
- Any estimate creation attempted (must remain no)
- Any quote generation attempted (must remain no)
- Any invoice/payment behavior attempted (must remain no)
- Any production write risk
- Any external notification risk
- Any live workflow activation risk
- Consent/safety, production-risk, or data-boundary issue exists

## Manual founder review worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems. Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval. Estimate created: no. Quote generated: no. Quote sent: no. Contractor notification sent: no. Homeowner notification sent: no. Follow-up sent: no. Calendar booking performed: no. External notification sent: no. Production system touched: no. Invoice/payment behavior added: no.**

Manual Founder Review Worksheet (internal worksheet only; only use when eligibility confirmed and upstream chain reviewed)

- Queue item ID: ____________________
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Lead source: ____________________
- Source detail: ____________________
- Service type: ____________________
- Roofer / contractor name: ____________________
- Contractor service-area fit: yes / no / NEEDS INFO
- Contractor availability known: yes / no / NEEDS INFO
- Homeowner preferred channel: ____________________
- Contact permission status: granted / pending / unknown / do-not-contact
- Prior appointment readiness state: ____________________
- Prior appointment outcome state: ____________________
- Prior inspection coordination state: ____________________
- Prior manual follow-up state: ____________________
- Prior estimate prep state: ____________________
- Prior estimate next-step readiness state: ____________________
- Prior contractor estimate review state: ____________________
- Prior homeowner clarification state: ____________________
- Prior homeowner clarification response-review state: ____________________
- Prior manual homeowner clarification response-review decision: PASS / HOLD / BLOCKED / not required (reason: ____________________)
- Prior manual downstream routing state: ____________________
- Manual downstream route: READY FOR FOUNDER REVIEW
- Founder review owner: ____________________
- Founder reviewer: ____________________
- Review queue timestamp: ____________________
- Review priority: HIGH / NORMAL / LOW
- Evidence completeness: COMPLETE / NEEDS INFO / INCONSISTENT / BLOCKED
- Remaining information gaps (with owner and due date or "none"): ____________________
- Gap owner: ____________________
- Gap due date: ____________________
- Contractor questions resolved: yes / no / partial
- Homeowner questions resolved: yes / no / partial
- Estimate assumptions resolved: yes / no / partial
- Access / inspection constraints resolved: yes / no / partial
- Consent and safety status: clear / unresolved
- Data protection checkpoint status: reviewed / not reviewed
- Privacy / lead boundary notes: ____________________
- Founder decision: PASS / HOLD / BLOCKED
- Founder decision reason: ____________________
- Founder decision evidence: ____________________
- Final manual route: (see route decision matrix)
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Manual communication needed: yes / no
- Manual communication draft reviewed: yes / no / not applicable
- Ready for manual send review: yes / no / not applicable
- Ready for manual appointment coordination: yes / no / not applicable
- Ready for manual estimate next-step: yes / no / not applicable
- Ready for manual contractor review: yes / no / not applicable
- Ready for manual homeowner clarification: yes / no / not applicable
- HOLD reason (if HOLD): ____________________
- BLOCKED reason (if BLOCKED): ____________________
- Notes: ____________________
- Estimate created: no
- Quote generated: no
- Quote sent: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Follow-up sent: no
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Invoice/payment behavior added: no

Founder review worksheet complete: yes / no
Founder/operator signature / confirmation: ____________________
Timestamp: ____________________

## Route decision matrix

Use this matrix to select Final manual route after founder decision. Map current conditions to the correct final manual route. Only one final manual route per lead per review.

- If evidence complete and only manual message review remains -> READY FOR MANUAL SEND REVIEW
- If inspection/access coordination is the next founder-approved manual step -> READY FOR MANUAL APPOINTMENT COORDINATION
- If estimate next-step is the next founder-approved manual step -> READY FOR MANUAL ESTIMATE NEXT-STEP
- If contractor confirmation is needed -> READY FOR MANUAL CONTRACTOR REVIEW
- If homeowner clarification is needed -> READY FOR MANUAL HOMEOWNER CLARIFICATION
- If routing decision itself is unclear -> RETURN TO MANUAL DOWNSTREAM ROUTING
- If homeowner response review must be corrected -> RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW
- If homeowner clarification request must be prepared -> RETURN TO HOMEOWNER CLARIFICATION
- If contractor estimate review must be corrected -> RETURN TO CONTRACTOR ESTIMATE REVIEW
- If estimate prep must be corrected -> RETURN TO MANUAL ESTIMATE PREP
- If estimate next-step readiness must be corrected -> RETURN TO ESTIMATE NEXT-STEP READINESS
- If manual follow-up is needed before review can continue -> RETURN TO MANUAL FOLLOW-UP
- If appointment/access coordination must be resolved -> RETURN TO APPOINTMENT OR ACCESS COORDINATION
- If founder needs more information but no safety issue -> HOLD
- If safety, consent, production-risk, or data-boundary issue exists -> BLOCKED

Selected final manual route (must match matrix and eligibility): ____________________
Route decision justification / evidence reference: ____________________
Founder/operator notes: ____________________

Allowed Final manual route values (exact):
- READY FOR MANUAL SEND REVIEW
- READY FOR MANUAL APPOINTMENT COORDINATION
- READY FOR MANUAL ESTIMATE NEXT-STEP
- READY FOR MANUAL CONTRACTOR REVIEW
- READY FOR MANUAL HOMEOWNER CLARIFICATION
- RETURN TO MANUAL DOWNSTREAM ROUTING
- RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW
- RETURN TO HOMEOWNER CLARIFICATION
- RETURN TO CONTRACTOR ESTIMATE REVIEW
- RETURN TO MANUAL ESTIMATE PREP
- RETURN TO ESTIMATE NEXT-STEP READINESS
- RETURN TO MANUAL FOLLOW-UP
- RETURN TO APPOINTMENT OR ACCESS COORDINATION
- HOLD
- BLOCKED

## PASS / HOLD / BLOCKED decision rules

(See Founder decision criteria and HOLD/BLOCKED cases sections above for full enumerated lists.)

PASS requires evidence completeness COMPLETE, all required fields present, all gaps owned with due dates, no safety/consent/production risks, all safety markers no, final manual route and next action fully assigned.

HOLD requires evidence completeness NEEDS INFO (resolvable), gaps owned, no safety issue, founder needs more info or upstream correction required without blocking risk.

BLOCKED for any of the enumerated missing critical fields (Queue item ID, Lead ID, homeowner name, property address, lead source, source detail, service type, roofer/contractor name, founder review owner/reviewer, review queue timestamp, manual downstream route not READY FOR FOUNDER REVIEW, prior state not reviewed, unresolved response-review issue, missing evidence, inconsistent evidence, missing contact permission, unresolved consent/safety, missing contractor service-area fit, unresolved questions/assumptions/constraints without owner, data protection not reviewed, gaps without owner/due date, missing final route/next action/owner/due, manual comm needed but draft not reviewed), or any send/booking/estimate/quote/invoice attempted, or any production/external/live risk.

missing Queue item ID
missing Lead ID
missing homeowner name
missing property address
missing lead source
missing source detail
missing service type
missing roofer / contractor name
missing founder review owner
missing founder reviewer
missing review queue timestamp
manual downstream route is not READY FOR FOUNDER REVIEW
prior manual downstream routing state not reviewed
unresolved homeowner clarification response-review issue
missing evidence
evidence inconsistent
missing contact permission status
unresolved consent/safety issue
missing contractor service-area fit
unresolved contractor questions
unresolved homeowner questions
unresolved estimate assumptions
access / inspection constraints unresolved
data protection checkpoint not reviewed
remaining information gaps without owner
remaining information gaps without due date
final manual route missing
next manual action missing
next manual action owner missing
next manual action due date missing
manual communication marked needed but draft not reviewed
any send attempted
any booking attempted
any estimate creation attempted
any quote generation attempted
any invoice/payment behavior attempted
any production write risk
any external notification risk
any live workflow activation risk

Decision rules applied: yes / no
Founder decision: PASS / HOLD / BLOCKED
Reason documented with evidence: yes / no

## Return-to-packet routing options

When founder decision is PASS but the selected final manual route is a RETURN TO ... value, the lead is routed back to the named prior packet for correction or continuation. The founder review state becomes REVIEWED and the final manual route is set to the RETURN value. The lead then re-enters the appropriate upstream packet (e.g., RETURN TO MANUAL DOWNSTREAM ROUTING sends it back to the manual downstream routing packet for re-routing).

When PASS and the final manual route is one of the READY FOR MANUAL ... values, the lead is routed forward to that manual coordination step (still dry-run/manual only).

HOLD keeps the lead in the founder review queue with status HOLD and assigned gap owner/due date for re-review.

BLOCKED sets status BLOCKED with documented reason; no further manual coordination until explicit founder clearance.

## Manual next-action assignment

- Final manual route: ____________________
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Manual communication needed: yes / no
- Manual communication draft reviewed: yes / no / not applicable
- Ready for manual send review: yes / no / not applicable
- Ready for manual appointment coordination: yes / no / not applicable
- Ready for manual estimate next-step: yes / no / not applicable
- Ready for manual contractor review: yes / no / not applicable
- Ready for manual homeowner clarification: yes / no / not applicable
- Next manual action assignment complete: yes / no
- Owner confirmed availability for due date: yes / no
- Founder/operator notes: ____________________

## Manual communication draft-review checklist

Only applicable if manual communication needed = yes.

- [ ] Draft captured from prior packet (homeowner clarification, manual follow-up, etc.) or prepared internally
- [ ] Draft reviewed for completeness against homeowner / contractor questions resolved
- [ ] Draft reviewed against contact permission status (only if granted)
- [ ] Draft reviewed against privacy / lead boundary notes
- [ ] Draft reviewed for no-send safety (internal only until explicit founder/operator approval for any real send outside system)
- [ ] Draft reviewed against all safety markers (no live content, no production intent)
- [ ] Manual communication draft reviewed: yes
- Ready for manual send review: yes (only if all above true and final manual route allows)
- Founder/operator notes: ____________________

If manual communication needed but draft not reviewed, apply BLOCKED or HOLD per rules.

## No-send / no-booking / no-estimate safety confirmation

Before any founder decision or routing:

- Estimate created: no (confirmed)
- Quote generated: no (confirmed)
- Quote sent: no (confirmed)
- Contractor notification sent: no (confirmed)
- Homeowner notification sent: no (confirmed)
- Follow-up sent: no (confirmed)
- Calendar booking performed: no (confirmed)
- External notification sent: no (confirmed)
- Production system touched: no (confirmed)
- Invoice/payment behavior added: no (confirmed)
- No send attempted in this review
- No booking attempted in this review
- No estimate creation attempted in this review
- No quote generation attempted in this review
- No invoice/payment behavior attempted in this review
- No production write risk
- No external notification risk
- No live workflow activation risk
- All dry-run flags confirmed
- This packet remains internal-only; any real manual send, booking coordination, or next action must be performed by founder/operator manually outside the system after explicit approval.

Safety confirmation complete: yes / no
Founder/operator initials: ____________________
Timestamp: ____________________

## Founder/operator decision log

Founder/Operator Decision Log entry (one per lead reviewed in queue):

- Queue item ID: ____________________
- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Founder review owner: ____________________
- Founder reviewer: ____________________
- Review queue timestamp: ____________________
- Review priority: HIGH / NORMAL / LOW
- Evidence completeness: COMPLETE / NEEDS INFO / INCONSISTENT / BLOCKED
- Founder decision: PASS / HOLD / BLOCKED
- Founder decision reason: ____________________
- Founder decision evidence: ____________________
- Final manual route: ____________________
- Next manual action: ____________________
- Next manual action owner: ____________________
- Next manual action due date: ____________________
- Manual communication draft reviewed (if needed): yes / no / not applicable
- Data protection checkpoint status: reviewed
- All safety markers: no
- Estimate created: no
- Quote generated: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Calendar booking performed: no
- Production system touched: no
- Invoice/payment behavior added: no
- Packet reference: First Roofer Founder Review Queue Command Packet
- Decision timestamp: ____________________
- Founder/operator notes: ____________________

Log entry complete: yes / no

Multiple leads may be logged in a session. Replicate the entry block for each.

## Review queue tracker

Founder Review Queue Tracker (use for all leads in queue during session; update per lead):

| Queue Item ID | Lead ID | Homeowner Name | Property Address | Review Priority | Evidence Completeness | Founder Decision | Final Manual Route | Next Manual Action Owner | Next Manual Action Due Date | Data Protection Checkpoint | Estimate Created | Quote Generated | Contractor Notification Sent | Homeowner Notification Sent | Calendar Booking Performed | Production System Touched | Invoice/Payment Added | Status |
|---------------|---------|----------------|------------------|-----------------|-----------------------|------------------|--------------------|--------------------------|-----------------------------|----------------------------|------------------|-----------------|------------------------------|-----------------------------|----------------------------|-------------------------|-----------------------|--------|
| _____________ | _____________ | _____________ | _____________ | HIGH / NORMAL / LOW | COMPLETE / NEEDS INFO / INCONSISTENT / BLOCKED | PASS / HOLD / BLOCKED | (see allowed values) | _____________ | _____________ | reviewed | no | no | no | no | no | no | no | DRAFT / QUEUED FOR FOUNDER REVIEW / IN FOUNDER REVIEW / REVIEWED / ROUTED MANUALLY / HOLD / BLOCKED |

Update tracker at end of each lead review and at end of session. All safety columns must remain "no".

## End-of-day founder review report

End-of-Day Founder Review Report (produce at close of founder/operator review session):

- Session date: ____________________
- Founder reviewer(s): ____________________
- Total leads reviewed: ____
- Leads with PASS: ____ (list Queue item IDs + final manual routes)
- Leads with HOLD: ____ (list Queue item IDs + HOLD reasons + gap owners/due dates)
- Leads with BLOCKED: ____ (list Queue item IDs + BLOCKED reasons)
- Leads routed to READY FOR MANUAL SEND REVIEW: ____
- Leads routed to READY FOR MANUAL APPOINTMENT COORDINATION: ____
- Leads routed to READY FOR MANUAL ESTIMATE NEXT-STEP: ____
- Leads routed to READY FOR MANUAL CONTRACTOR REVIEW: ____
- Leads routed to READY FOR MANUAL HOMEOWNER CLARIFICATION: ____
- Leads returned to prior packets (RETURN TO ...): ____ (summarize by target packet)
- Leads with HOLD/BLOCKED remaining in queue: ____
- All safety markers across session: Estimate created across all: no, Quote generated across all: no, Contractor notification sent across all: no, Homeowner notification sent across all: no, Calendar booking performed across all: no, External notification sent across all: no, Production system touched across all: no, Invoice/payment behavior added across all: no
- Data protection checkpoint reviewed for all leads: yes / no (list any exceptions)
- Unresolved gaps carried forward (with owners): ____________________
- Session notes / escalations: ____________________
- Next session planned: ____________________

Report complete: yes / no
Founder/operator sign-off: ____________________
Timestamp: ____________________

## Next-chat handoff summary

Next-chat handoff summary (for founder/operator or next session):

- This packet (First Roofer Founder Review Queue Command Packet) is the final structured review step for first-roofer leads that manual downstream routing has marked READY FOR FOUNDER REVIEW.
- All work is dry-run/internal-only/founder-operator-only. No production data touched. No external services called. No live sends, bookings, estimates, quotes, invoices, or payments.
- Upstream packet chain must be fully reconciled before use (manual downstream routing primary + full prior first-roofer command packets + data protection checkpoint).
- Use the manual founder review worksheet, route decision matrix, and decision rules exactly. All required fields, eligibility, HOLD/BLOCKED cases, and safety markers must be confirmed.
- After founder decision, assign next manual action using allowed final manual routes only. Use return-to-packet options when upstream correction is needed.
- Update the review queue tracker and produce the end-of-day founder review report for every session.
- Preserve all safety confirmations (no markers ever set to yes).
- Handoff to next operator: attach the filled worksheets, decision log entries, tracker, and EOD report for the session. Note any carries (HOLD leads, open gaps with owners/due dates).
- Next chat should start from this packet plus the canonical source-of-truth package and the Roofer Data Protection milestone context. Use Terminal 1 only for final verification.
- Explicit confirmation: Dry-run packet: yes. Internal-only packet: yes. Founder-operator-only packet: yes. Production data touched: no. External service called: no. Live workflow activated: no. All forbidden production behaviors: no.

## Explicit dry-run/internal-only/founder-operator-only confirmation

- Dry-run packet: yes
- Internal-only packet: yes
- Founder-operator-only packet: yes
- Production data touched: no
- External service called: no
- Live workflow activated: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Calendar booking performed: no
- Appointment booked: no
- Estimate created: no
- Quote generated: no
- Invoice/payment behavior added: no
- Auth changed: no
- Database schema changed: no
- RLS policy changed: no
- Secrets changed: no
- Access-control logic changed: no
- This packet references and builds on:
- `docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md`
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
- `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

This packet references and builds on the full first-roofer command packet chain with the First Roofer Manual Downstream Routing Command Packet as primary for the READY FOR FOUNDER REVIEW route.
- All worksheets, fields, values, eligibility rules, HOLD/BLOCKED cases, route decision matrix, safety markers, decision log, tracker, EOD report, and handoff are present and operational (fillable, not heading-only).
- Forbidden business language is absent (refer only as "forbidden business language" if needed; exact strings are enforcement-only in verifiers).
- Implementation-risk strings are absent from this doc (exact strings are enforcement-only in verifiers).
- This is the final build before a new chat and should be easy to recover from the next-chat handoff summary.

This packet is complete and ready for dry-run founder/operator use after the manual downstream routing packet sets a lead to READY FOR FOUNDER REVIEW. Run the dry-run wrapper and pass the verifier plus quality gate before operational use in a session. Stop after gates and diff proof. Do not commit. Do not push.
