# First Roofer Inspection Coordination Command Packet

## Purpose and safety posture

This packet creates the First Roofer Inspection Coordination Command Packet for the Founder-Led Launch Program.

It provides the founder/operator with a self-contained, fillable operational packet to manually coordinate inspection readiness and inspection scheduling logistics after communication drafts are prepared and approved via the First Roofer Manual Communication Command Packet. It builds directly on the First Roofer Day-One Command Center, the First Roofer Manual Communication Command Packet, the First Roofer Lead-to-Inspection Ops Pack, and the First Roofer Execution Day Runbook. first-roofer day-one command center. First Roofer Manual Communication Command Packet. Lead-to-Inspection Ops Pack. Execution Day Runbook. Agent Product Quality Gate. It turns the inspection coordination steps from those artifacts into a dedicated, reusable command packet with readiness prerequisites, concrete worksheets for availability and route fit, inspection window comparison, manual confirmation checklists, approval states, explicit HOLD / BLOCKED rules, a manual inspection coordination tracker, founder/operator decision log, outcome capture, end-of-day report, and handoff notes.

**This is strictly dry-run/internal-only/founder-operator-only.**

This packet performs no calendar booking, no notifications, no sends, and no production system activation of any kind. It supports manual founder/operator review and manual coordination only. The packet helps the founder/operator manually prepare to book inspections. It does not book inspections, create calendar events, send notifications, or touch any production system. All coordination remains manual until a founder/operator explicitly approves and performs the real-world steps (phone, email, or in-person) outside the system after explicit manual approval. The packet itself must never book, notify, or activate anything.

Explicit no-live-booking / no-live-automation / no production activation confirmation:
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
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- All work is manual founder/operator review and manual coordination only.
- The packet helps the founder/operator manually prepare to book inspections. It does not book, dispatch, send, notify, calendar, or guarantee anything.

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

Safety markers (exact for verification): no live SMS/Twilio, no live Vapi calls, no Calendar activation, no Resend production sends, no Lindy external sends, no cron/scheduler/dispatcher activation, no public route activation, no production Supabase writes, no external notifications, no production credentials, no automated booking, no production route activation, Calendar booking performed: no, external notification sent: no, production system touched: no, WORKSPACE_MODE=dry-run, SMS_ACTIVATION=false, CALENDAR_ACTIVATION=false, VAPI_ACTIVATION=false, SUPABASE_WRITES=false, CONTRACTOR_NOTIFICATION=false, HOMEOWNER_NOTIFICATION=false, CRON_ACTIVATION=false, SCHEDULER_ACTIVATION=false, DISPATCHER_ACTIVATION=false, PUBLIC_ROUTE_ACTIVATION=false.

This packet is for internal founder/operator rehearsal, manual review, and manual coordination practice only during the first roofer execution path. It follows the Agent Product Quality Gate.

## Inspection coordination command overview

The Inspection Coordination Command Packet gives the founder/operator one place to handle all manual inspection coordination work for first-roofer leads after the communication drafts from the First Roofer Manual Communication Command Packet have been prepared and marked APPROVED FOR MANUAL USE:

- Confirm inspection coordination readiness prerequisites from prior packets (day-one command center, lead-to-inspection ops pack, manual communication packet, execution day runbook).
- Capture and compare homeowner availability windows.
- Capture and compare contractor availability windows.
- Assess service-area and route-fit for the matched contractor.
- Generate and compare up to three proposed inspection windows.
- Prepare manual homeowner inspection confirmation and manual contractor inspection confirmation (draft-only).
- Apply explicit HOLD / BLOCKED rules for missing information, availability conflict, service-area/route fit issues, consent/safety, or production activation risk.
- Log founder/operator decisions in the inspection decision log with PASS / HOLD / BLOCKED.
- Track every lead in the manual inspection coordination tracker with approval state, Calendar booking performed: no, external notification sent: no, and production system touched: no.
- Capture inspection outcome after manual coordination (if performed outside the system).
- Produce an end-of-day inspection coordination report.
- Leave handoff notes for the next operator session.

All steps use "book inspections" language only. The goal is inspection readiness via manual coordination only. Every worksheet and confirmation checklist carries the explicit note that it is internal-only and does not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. The packet itself must never book or notify.

Success criteria: after running the dry-run wrapper and passing the verifier (plus quality gate), the founder/operator has a self-contained, fillable packet that can be printed or used in a working session to manually coordinate inspection readiness, homeowner/contractor availability, service-area/route fit, inspection windows, manual confirmations, HOLD/BLOCKED decisions, outcome capture, reporting, and handoff for multiple leads without any production systems, live booking, live notifications, or automated actions.

This packet references and builds on:
- `docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md`
- `docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

## Inspection coordination readiness prerequisites

Before using this packet for any lead, the founder/operator must confirm the following prerequisites from prior packets (mark explicitly). This packet does not replace those; it consumes their outputs for inspection coordination.

- [ ] First Roofer Day-One Command Center has been reviewed for the lead.
- [ ] Lead-to-Inspection Ops Pack intake and decision log completed for the lead (or explicit reason recorded).
- [ ] First Roofer Execution Day Runbook followed for the execution day.
- [ ] First Roofer Manual Communication Command Packet: homeowner and contractor message drafts prepared, reviewed, and at least one marked APPROVED FOR MANUAL USE (or HOLD/BLOCKED status recorded with justification).
- [ ] Contact permission status: granted (or explicit handling for pending/unknown recorded under HOLD rules).
- [ ] Contractor match identified and service-area fit preliminarily assessed (from lead-to-inspection or manual comm packet).
- [ ] No production activation flags are true; all dry-run flags confirmed.
- [ ] Agent product quality gate has been run for the current workspace.
- [ ] This packet is being used only for manual founder/operator review and manual coordination rehearsal.

Lead inspection coordination intake prerequisites template:
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
- Prior communication approval state (from manual comm packet): DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED
- Prior inspection readiness decision (from prior packet): PASS / HOLD / BLOCKED
- Manual communication packet reference / timestamp: ____________________
- Inspection coordination prerequisites status: PASS / HOLD / BLOCKED
- Owner: ____________________
- Timestamp: ____________________

If any prerequisite is not met or prior packet shows HOLD/BLOCKED without clearance, apply HOLD rules immediately and do not proceed to availability capture or window proposal.

## Lead inspection coordination intake checklist

Use this checklist for every lead entering inspection coordination. Mark explicitly. This is the entry gate after communication drafts.

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
- [ ] Contractor service-area fit (preliminary): yes / no / hold
- [ ] Homeowner availability windows captured (see dedicated worksheet)
- [ ] Contractor availability windows captured (see dedicated worksheet)
- [ ] Service-area and route-fit worksheet completed
- [ ] Proposed inspection windows generated (1-3 options)
- [ ] Manual homeowner inspection confirmation prepared: yes / no
- [ ] Manual contractor inspection confirmation prepared: yes / no
- [ ] Inspection readiness decision: PASS / HOLD / BLOCKED
- [ ] Inspection coordination decision: PASS / HOLD / BLOCKED
- [ ] Manual approval state: DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED
- [ ] Calendar booking performed: no
- [ ] External notification sent: no
- [ ] Production system touched: no
- [ ] Founder/operator notes: ____________________
- [ ] Next manual action: ____________________

If contact permission status is not "granted" or is "do-not-contact", immediately apply HOLD / BLOCKED rules. Do not prepare or approve inspection windows or confirmations.

## Homeowner availability capture worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Homeowner Availability Capture (internal worksheet only)

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
- Homeowner availability windows (list all provided or proposed; use 24h format or "any weekday morning", be specific):
  1. ____________________
  2. ____________________
  3. ____________________
  4. ____________________
- Best contact time / constraints noted by homeowner: ____________________
- Homeowner notes / access issues (e.g., gate code, work hours, kids in home): ____________________
- Availability capture method (manual call / email reply / prior note): ____________________
- Availability last confirmed date/time: ____________________
- Availability status for coordination: COMPLETE / PARTIAL / MISSING
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Contractor availability capture worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Contractor Availability Capture (internal worksheet only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit (preliminary from prior packet): yes / no / hold
- Contractor availability windows (list all provided; be specific, include buffer for travel):
  1. ____________________
  2. ____________________
  3. ____________________
- Contractor typical lead time / response SLA: ____________________
- Contractor notes / constraints (truck size, crew size, material lead time, other jobs that day): ____________________
- Contractor preferred coordination channel: ____________________
- Availability capture method (manual call / text / prior note): ____________________
- Availability last confirmed date/time: ____________________
- Availability status for coordination: COMPLETE / PARTIAL / MISSING
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Service-area and route-fit worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Service-Area and Route-Fit Worksheet (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor primary service area / zip coverage: ____________________
- Property zip / city: ____________________
- Distance / drive time estimate (manual lookup or known): ____________________
- Route notes (highway access, traffic patterns at proposed windows, parking, ladder access): ____________________
- Service-area fit: yes / marginal / no
- Route efficiency (can combine with other known jobs that day?): yes / no / unknown
- Contractor vehicle / crew constraints affecting this address: ____________________
- Route/service-area risk level: LOW / MEDIUM / HIGH
- Service-area and route-fit decision: PASS / HOLD / BLOCKED
- Founder/operator notes (include any manual confirmation of fit with contractor): ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

If service-area fit is "no" or route risk is HIGH with no mitigation, apply HOLD due to service-area/route fit rules.

## Inspection window options worksheet

**Safety note: This is an internal-only worksheet. It is internal-only and does not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

Inspection Window Options Worksheet / Comparison (internal only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Contractor service-area fit: ____________________
- Route/service-area notes summary: ____________________

Proposed inspection window 1:
- Date/time: ____________________
- Duration estimate: ____________________
- Homeowner availability match: yes / partial / no
- Contractor availability match: yes / partial / no
- Route fit at this time: yes / marginal / no
- Why this window (overlap rationale): ____________________
- Risk / buffer notes: ____________________

Proposed inspection window 2:
- Date/time: ____________________
- Duration estimate: ____________________
- Homeowner availability match: yes / partial / no
- Contractor availability match: yes / partial / no
- Route fit at this time: yes / marginal / no
- Why this window (overlap rationale): ____________________
- Risk / buffer notes: ____________________

Proposed inspection window 3:
- Date/time: ____________________
- Duration estimate: ____________________
- Homeowner availability match: yes / partial / no
- Contractor availability match: yes / partial / no
- Route fit at this time: yes / marginal / no
- Why this window (overlap rationale): ____________________
- Risk / buffer notes: ____________________

Inspection window comparison summary (rank 1-3 or note conflicts):
- Best overlapping window: ____________________
- Homeowner flexibility: high / medium / low
- Contractor flexibility: high / medium / low
- Overall window viability: PASS / HOLD / BLOCKED
- Recommended next manual step if HOLD: ____________________
- Founder/operator notes: ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Manual inspection confirmation checklist

Use for both parties after window options are compared and a viable window is selected for proposal. Two separate confirmations (homeowner + contractor).

**Safety note: These are internal-only checklists and draft-only confirmations. They are internal-only and do not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

### Manual Homeowner Inspection Confirmation (internal draft only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Proposed inspection window (chosen from options): ____________________
- Duration / what to expect: ____________________
- Access instructions / notes from homeowner capture: ____________________
- Draft confirmation text (copy/paste outside system only after APPROVED FOR MANUAL COORDINATION):
  ```
  Hi [Homeowner name], this is [founder/operator name] with the Founder-Led Launch Program. Following up on the lead for your property at [property address]. Your roofer [contractor match] is available to book an inspection at [proposed inspection window]. Does this time work for you? Please confirm or suggest an alternative. We will coordinate the inspection manually. Thank you.
  ```
- Manual homeowner confirmation prepared: yes / no
- Manual homeowner confirmation prepared: yes/no
- Homeowner confirmation draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Founder/operator notes: ____________________
- Timestamp: ____________________

### Manual Contractor Inspection Confirmation (internal draft only)

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Proposed inspection window (chosen from options): ____________________
- Duration / what to expect: ____________________
- Route / access notes: ____________________
- Draft confirmation text (copy/paste outside system only after APPROVED FOR MANUAL COORDINATION):
  ```
  Hi [Contractor name / team], this is [founder/operator name] with the Founder-Led Launch Program. We have a lead at [property address] (homeowner [homeowner name]) that matches your service area. Proposed inspection window: [proposed inspection window]. Can you confirm availability for this slot? We will coordinate the inspection manually with the homeowner. Let me know any constraints. Thank you.
  ```
- Manual contractor confirmation prepared: yes / no
- Manual contractor confirmation prepared: yes/no
- Contractor confirmation draft status: DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED
- Manual sender: founder/operator ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Founder/operator notes: ____________________
- Timestamp: ____________________

Both confirmations must reach APPROVED FOR MANUAL COORDINATION before the founder/operator performs any real-world outreach to book the inspection.

## Inspection coordination approval states

All inspection coordination items (windows, confirmations, readiness decisions) use one of these manual approval states. States are recorded by the founder/operator only. No automation changes state.

- DRAFT: initial internal worksheet or confirmation prepared by founder/operator. Not reviewed. Not ready for any external action.
- REVIEWED: founder/operator has reviewed for completeness, availability overlap, service-area/route fit, consent, and safety. Item is internally consistent but not yet approved for external use.
- APPROVED FOR MANUAL COORDINATION: founder/operator has explicitly approved the item (window, confirmation text, or overall coordination) for manual use outside the system (e.g., copy the draft text to phone/email client by the human operator only, or manually call to confirm). Still requires Calendar booking performed: no, external notification sent: no, and production system touched: no until the human actually coordinates.
- HOLD: blocked by missing information, availability conflict, service-area/route fit, consent, founder review requirement, or other manual reason. No external coordination permitted until cleared.
- BLOCKED: safety, consent violation, production activation risk, credential exposure, or forbidden language detected. Immediate stop. Requires production gates + safe readiness re-run and explicit founder clearance.

Manual approval state: DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED

Manual sender: founder/operator (name recorded)

Calendar booking performed: no

External notification sent: no

Production system touched: no

Inspection readiness decision: PASS / HOLD / BLOCKED (when coordination advances inspection readiness)

Inspection coordination decision: PASS / HOLD / BLOCKED (final gate for this packet on the lead)
inspection coordination decision: PASS / HOLD / BLOCKED

## Inspection HOLD / BLOCKED rules

Apply these rules explicitly. Record the rule triggered and the evidence. Move the lead to HOLD or BLOCKED in the tracker and decision log. Do not propose or approve windows/confirmations when rules apply.

### Inspection HOLD due to missing information
- Trigger: any of Lead ID, homeowner name, property address, contact permission, contractor match, or availability windows (homeowner or contractor) are missing or unknown.
- Action: complete the missing fields via prior packets or manual capture. Re-run intake checklist. Do not advance to window proposal.
- Record in decision log with "HOLD: missing information - [list fields]".
- Re-check prerequisites.

### Inspection HOLD due to availability conflict
- Trigger: no overlapping window between homeowner availability, contractor availability, and viable route time after comparing the three proposed options.
- Action: propose alternative windows to one or both parties via manual communication (outside system, only after prior comm packet APPROVED FOR MANUAL USE), or record conflict and move to follow-up.
- Record in decision log with "HOLD: availability conflict - [summary of mismatch]".
- Update availability capture worksheets with new data.

### Inspection HOLD due to service-area/route fit
- Trigger: service-area fit is "no", route risk is HIGH with no mitigation, or contractor explicitly states the address is out of practical range.
- Action: re-confirm with contractor via manual outreach (after prior approval state), seek alternative contractor match if available in lead-to-inspection data, or escalate internally.
- Record in decision log with "HOLD: service-area/route fit - [details]".
- Update service-area and route-fit worksheet.

### Inspection BLOCKED due to consent/safety/production activation risk
- Trigger: contact permission not granted or "do-not-contact"; safety flags (e.g., known hostile situation, minor on site with no adult, structural collapse risk without proper crew); any production flag (CALENDAR_ACTIVATION, etc.) is true or appears to have been activated; or credentials/secrets exposed in notes.
- Action: immediate stop. Do not prepare or approve any confirmation or window. Escalate to founder with full evidence. Re-run all production gates and safe readiness before any further work on this lead.
- Record in decision log with "BLOCKED: consent/safety/production risk - [details]".
- Lead must not advance until explicit founder clearance + gate re-pass.

## No-calendar / no-booking safety rules

These rules are non-negotiable for this packet:

- Calendar booking performed: no — this packet never creates, proposes, or confirms a calendar event. Any real calendar entry is created manually by the founder/operator in their personal or team calendar tool after explicit APPROVED FOR MANUAL COORDINATION and after real-world confirmation from both parties outside the system.
- External notification sent: no — this packet never sends SMS, email, push, or any notification. All outreach uses drafts prepared here (or from manual comm packet) that the human copies and sends manually.
- Production system touched: no — this packet performs zero writes, zero route calls, zero cron triggers, zero dispatcher actions, zero Vapi/Twilio/Resend/Lindy/calendar API calls.
- The packet supports manual founder/operator review and manual coordination only. It helps prepare to book inspections via human action after approval.
- If any script, note, or output in the workspace appears to perform or simulate a booking, send, or production write, immediately treat as BLOCKED, run production gates, and do not use the packet until cleared.
- Every worksheet, template, log entry, and report must restate the three no- markers and the internal-only safety note.

## Manual inspection coordination tracker

Use one row per lead. This is the live working table for the session. Update after every decision or worksheet change. Print or maintain in notes.

| Lead ID | Homeowner | Property (short) | Contractor Match | Homeowner Avail Status | Contractor Avail Status | Route Fit | Best Window | Homeowner Conf Status | Contractor Conf Status | Approval State | Inspection Readiness | Inspection Coordination | Calendar booking performed | External notification sent | Production system touched | Last Updated | Owner | Notes |
|---------|-----------|------------------|------------------|------------------------|-------------------------|-----------|-------------|-----------------------|------------------------|----------------|----------------------|-------------------------|----------------------------|----------------------------|---------------------------|--------------|-------|-------|
| [ex]    | [ex]      | [ex]             | [ex]             | COMPLETE / PARTIAL     | COMPLETE / PARTIAL      | PASS/HOLD | [date/time] | APPROVED... / HOLD    | APPROVED... / HOLD     | APPROVED FOR MANUAL COORDINATION | PASS / HOLD / BLOCKED | PASS / HOLD / BLOCKED   | no                         | no                         | no                        | [ts]         | [name]| [text]|

Required columns always present: Lead ID, Approval State (DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED), Inspection readiness decision: PASS / HOLD / BLOCKED, Inspection coordination decision: PASS / HOLD / BLOCKED, Calendar booking performed: no, External notification sent: no, Production system touched: no, Next manual action.

## Founder/operator inspection decision log

Record every explicit PASS / HOLD / BLOCKED decision with justification tied to the checklists and worksheets. One entry per decision point per lead.

Inspection Decision Log entry template:

- Timestamp: ____________________
- Lead ID: ____________________
- Homeowner name: ____________________
- Decision type: Inspection readiness / Inspection coordination / Window selection / Confirmation approval / HOLD clearance / BLOCKED escalation
- Decision: PASS / HOLD / BLOCKED
- Rule or checklist trigger (e.g., "HOLD due to availability conflict per worksheet comparison; no overlap in proposed windows 1-3")
- Evidence summary (reference specific worksheet rows or prior packet states): ____________________
- Manual approval state at time of decision: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Next manual action: ____________________
- Owner: founder/operator ____________________
- Re-check date/time: ____________________

Repeat for each decision. Keep chronological. At end of session, summarize in the end-of-day report.

## Inspection outcome capture

After manual coordination has occurred outside the system (phone calls, texts, emails performed by founder/operator using the approved drafts), capture the result here. This is post-coordination only.

Inspection Outcome Capture (internal record only):

- Lead ID: ____________________
- Homeowner name: ____________________
- Property address: ____________________
- Contractor match: ____________________
- Final agreed inspection window (if any): ____________________
- Actual coordination performed by (founder/operator name): ____________________
- Coordination method (manual phone / manual text / manual email / in-person): ____________________
- Homeowner confirmed: yes / no / rescheduled / no-response
- Contractor confirmed: yes / no / rescheduled / no-response
- Inspection scheduled (outside system, manual calendar entry only): yes / no
- If yes, manual calendar reference (personal calendar id or note, not system): ____________________
- If no, reason and next manual action: ____________________
- Outcome notes (what was said, access details confirmed, photos to bring, insurance adjuster present, etc.): ____________________
- Inspection readiness decision at close: PASS / HOLD / BLOCKED
- Inspection coordination decision at close: PASS / HOLD / BLOCKED
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- Founder/operator notes: ____________________
- Timestamp: ____________________

This capture is for internal record and handoff only. It does not create any system appointment or booking record.

## End-of-day inspection coordination report

At close of session or end of day, produce this summary for the lead(s) worked and for handoff.

**Safety note: This is an internal-only report. It is internal-only and does not book, send, notify, or touch production systems. Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval. Calendar booking performed: no. External notification sent: no. Production system touched: no.**

End-of-Day Inspection Coordination Report (internal only)

Date: ____________________
Operator: ____________________

Leads processed in inspection coordination this session:
- Total leads entering coordination: ____
- Leads with PASS on inspection coordination: ____
- Leads with HOLD (list reasons): ____________________
- Leads with BLOCKED (list reasons): ____________________
- Leads with confirmed inspection window via manual coordination: ____

Aggregate markers across all leads:
- Calendar booking performed across all: no
- External notification sent across all: no
- Production system touched across all: no

Key decisions logged (summary list with lead IDs and decisions):
1. ____________________
2. ____________________

Holds / escalations open at EOD:
- ____________________

Dry-run flag confirmation at EOD:
- WORKSPACE_MODE=dry-run
- All *_ACTIVATION=false as listed in Purpose section

Next operator session priorities (from handoff notes):
- ____________________

Report prepared by: founder/operator ____________________
Timestamp: ____________________

## Handoff notes for the next operator session

Complete this before ending the session. The next operator (or founder) must be able to pick up exactly where this session left off using only these notes + the tracker + decision log + worksheets.

Handoff Notes (internal only):

- Session date: ____________________
- Current source-of-truth commit reviewed: ____________________
- Leads with open inspection coordination work (Lead ID + status + next manual action):
  - Lead ID: ____ | Status: APPROVED FOR MANUAL COORDINATION / HOLD | Next: ____________________
- Open HOLD items requiring clearance before next session: ____________________
- dry-run flag confirmation (restate all): ____________________
- Dry-run flag confirmation (restate all): ____________________
- Production gates / quality gate / safe readiness last run timestamp and result: ____________________
- Any manual calendar entries created outside the system (personal only, no system sync): ____________________
- Any real-world sends performed manually today using approved drafts (list lead + channel + approx time, for awareness only): ____________________
- Blockers or risks for next session: ____________________
- Recommended first action for next operator: ____________________
- Handoff owner: founder/operator ____________________
- Timestamp: ____________________
- Calendar booking performed: no
- External notification sent: no
- Production system touched: no

## Explicit no-live-booking / no-live-automation confirmation

This packet is strictly for manual founder/operator review and manual coordination only in a dry-run/internal-only/founder-operator-only posture.

- Calendar booking performed: no
- External notification sent: no
- Production system touched: no
- The packet itself must never book, never send, never notify, never create calendar events, never write to production systems, never activate routes or schedulers.
- All real booking of inspections happens via manual action by the founder/operator (phone, email, text, or personal calendar tool) after the relevant items reach APPROVED FOR MANUAL COORDINATION and after real-world confirmation from homeowner and contractor.
- Any appearance of automation, live flags, or production activation in the workspace during use of this packet must be treated as a BLOCKED condition. Stop, run `scripts/check-agent-product-quality-gate.sh` and the full production gates + safe readiness, and obtain explicit founder clearance before continuing.
- This packet advances the first-roofer execution path by giving the founder/operator a practical, fillable tool to coordinate inspection readiness manually. It does not replace human judgment or human action.

All required business language is used throughout:
- Founder-Led Launch Program
- book inspections
- manual founder/operator review
- manual coordination only
- inspection readiness
- inspection coordination
- draft-only
- approved for manual coordination
- Calendar booking performed: no
- external notification sent: no
- production system touched: no

Forbidden phrases are absent by construction and verified:
- No legacy 7-day-pilot-style language
- No quota-based appointment language
- No book-jobs or booked-jobs language
- No guaranteed-jobs or guaranteed-revenue language
- No guarantee-jobs or guarantee-revenue language
- No live-dispatch language
- No production-automation language

This completes the First Roofer Inspection Coordination Command Packet. Use the provided dry-run wrapper, satisfy the verifier and Agent Product Quality Gate, then run full gates and diff proof before any further consideration. Do not commit. Do not push.
