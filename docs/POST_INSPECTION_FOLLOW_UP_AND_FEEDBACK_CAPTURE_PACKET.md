# Post-Inspection Follow-Up + Feedback Capture Packet

## Purpose

This packet documents RoofLeadHQ’s post-inspection follow-up and feedback capture workflow for booked homeowner inspections. It is a planning/readiness/placement artifact only — not live automation, not sends, not CRM connection, and not production behavior.

RoofLeadHQ is the roofing lead-to-inspection operating layer. After a homeowner inspection is booked, this packet defines how RoofLeadHQ helps:

- keep next steps and outcomes visible
- help prevent booked inspections from falling through the cracks
- track whether the inspection happened
- track whether an estimate or next step is needed
- track whether homeowner or roofer follow-up is still open

This packet is not a job-closing tool. It does not guarantee conversion, generate estimates, collect payments, or publish testimonials without permission.

## Product Outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a single artifact that:

- Documents the post-inspection stage path from Inspection Booked through outcome tracking.
- Defines roofer-facing check-in prompts and homeowner-facing message drafts (draft-only, not activated).
- Captures the approved 3-question feedback flow plus optional fourth question.
- Locks feedback handling rules, `permission_to_use_publicly`, escalation boundaries, dashboard/report fields, and CSV export fields.
- Marks all timing/reminder logic as planned/sandbox-only until live activation is explicitly approved.

Success criteria: a founder/operator can review post-inspection follow-through, feedback capture, and reporting scope without activating any live system.

## Connected Launch Packets

This packet connects:

- `docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md`
- `docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

Verifier and wrapper references:

- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `scripts/run-post-inspection-follow-up-feedback-capture-dry-run.sh`
- `backend/scripts/verify-post-inspection-follow-up-feedback-capture-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

## Safety Posture

- planning/readiness/placement packet only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no live automations
- no sends
- no CRM connection
- no production behavior changes
- no customer data handling changes
- no backend live activation
- no integrations activated
- no external sends
- no production Supabase writes
- no auth/RLS/schema/security changes
- no env/credential changes
- no public route activation
- read-only verifier only
- dry-run wrapper only
- Live automation remains disabled unless Jason explicitly approves activation.

Required dry-run flags (confirm before use):

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

## Source-of-Truth Workflow

Canonical source of truth before this worktree: `06d4c95 test(website): add pricing volume guardrail copy`

Before using or editing this packet, verify Terminal 1 source of truth:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

Required state:

- Work only in `/root/roofleadhq` or an approved agent worktree created from it.
- Do not use `/root/.openclaw/workspace`.
- OpenClaw summaries alone are not trusted.
- This packet does not authorize activation from an agent worktree.

## 1. Workflow Overview

Post-inspection follow-up is RoofLeadHQ’s follow-through layer for booked inspections. It begins after a homeowner inspection is booked on the roofer’s calendar and continues until next steps and outcomes are visible or explicitly closed.

Primary workflow path:

**Inspection Booked → Reminder Sent → Inspection Completed? → Missed/Rescheduled/Appointment Issue if needed → Estimate Needed? → Estimate Sent? → Homeowner Follow-Up Needed / Roofer Follow-Up Needed → Won / Lost / Still Open / Needs Review**

RoofLeadHQ’s role in this layer:

- Help prevent booked inspections from falling through the cracks by tracking stage movement and open follow-ups.
- Keep next steps and outcomes visible for the roofer and founder/operator review.
- Track whether the inspection happened, whether an estimate or next step is needed, and whether homeowner or roofer follow-up is still open.
- Capture optional homeowner feedback for internal review and roofer service improvement.

RoofLeadHQ does not:

- Close roofing jobs or guarantee signed contracts.
- Generate estimates, quotes, invoices, or payments.
- Send live messages from this packet.
- Publish public reviews or testimonials without explicit permission.

All timing, reminder, and follow-up automation described in this packet is **planned/sandbox-only** until Jason explicitly approves live activation.

## 2. Status / Stage Table

| Stage | Description | Trigger | Assigned Owner | Allowed Next Statuses | Safety Note |
| --- | --- | --- | --- | --- | --- |
| Inspection Booked | A homeowner inspection is booked on the roofer’s calendar. | Manual or approved booking handoff from lead-to-inspection workflow. | Roofer / founder-operator | Inspection Reminder Ready / Reminder Sent, Missed / Rescheduled, Appointment Issue, Needs Review | No live reminder send from this packet. |
| Inspection Reminder Ready / Reminder Sent | A pre-appointment reminder draft is ready or marked sent manually outside the system. | Appointment date/time confirmed; reminder draft approved for manual send. | Founder-operator (manual send only) | Inspection Completed?, Missed / Rescheduled, Appointment Issue, Needs Review | Reminder logic is planned/sandbox-only until live activation approved. |
| Inspection Completed? | System or operator is determining whether the inspection occurred. | Scheduled appointment time passes; roofer marks completed; homeowner confirms; or no outcome known after appointment window. | Roofer (primary), founder-operator (reconcile) | Estimate Needed?, Missed / Rescheduled, Appointment Issue, Homeowner Follow-Up Needed, Roofer Follow-Up Needed, Won, Lost, Still Open, Needs Review | Outcome unknown triggers review — not auto-close. |
| Missed / Rescheduled | Appointment did not happen as planned or was moved. | Roofer reports missed; homeowner reports missed; or reschedule confirmed manually. | Roofer | Inspection Booked, Inspection Reminder Ready / Reminder Sent, Appointment Issue, Still Open, Needs Review | No blame language in homeowner drafts. |
| Appointment Issue | Access, weather, wrong address, no-show, or coordination problem blocked the visit. | Roofer or homeowner reports issue; operator flags from check-in. | Roofer | Missed / Rescheduled, Inspection Booked, Roofer Follow-Up Needed, Homeowner Follow-Up Needed, Needs Review | Escalate pricing/estimate questions to roofer. |
| Estimate Needed? | Post-inspection review determines whether an estimate or next step is required. | Inspection marked completed; roofer indicates estimate needed; homeowner asks for quote (escalate to roofer). | Roofer | Estimate Sent?, Roofer Follow-Up Needed, Homeowner Follow-Up Needed, Still Open, Needs Review | RoofLeadHQ does not generate estimates. |
| Estimate Sent? | Roofer has sent or committed to send an estimate/next step. | Roofer marks estimate sent manually. | Roofer | Homeowner Follow-Up Needed, Roofer Follow-Up Needed, Won, Lost, Still Open, Needs Review | Track visibility only — not quote delivery automation. |
| Homeowner Follow-Up Needed | Homeowner-side next step is open (info request, reschedule, feedback, clarification). | Post-inspection check-in; missing homeowner response; feedback flow incomplete. | Roofer (default), founder-operator (draft prep) | Estimate Sent?, Roofer Follow-Up Needed, Won, Lost, Still Open, Needs Review | Drafts only — no live send from packet. |
| Roofer Follow-Up Needed | Roofer-side next step is open (estimate prep, callback, site revisit). | Inspection completed with open roofer action; homeowner requests roofer follow-up. | Roofer | Estimate Sent?, Homeowner Follow-Up Needed, Won, Lost, Still Open, Needs Review | Roofer-first escalation default. |
| Won | Homeowner and roofer indicate the lead progressed to a positive outcome per roofer’s definition. | Roofer marks won manually after their own sales process. | Roofer | Still Open (if reopened), Needs Review | Not a revenue guarantee — roofer’s outcome label only. |
| Lost | Homeowner declined or became inactive per roofer judgment. | Roofer marks lost manually. | Roofer | Still Open (if reopened), Needs Review | No pressure follow-up in drafts. |
| Still Open | Next step or outcome remains unresolved beyond normal window. | No outcome known after appointment window; still open after 7+ days. | Roofer / founder-operator | All active follow-up stages, Won, Lost, Needs Review | Aging tracked in reporting. |
| Needs Review | Operator review required due to missing data, conflict, or aging. | Needs review aging after 48+ hours; conflicting roofer/homeowner reports; workflow confusion. | Founder-operator | Any prior stage after reconciliation | RoofLeadHQ/Jason reviews system-quality issues only. |

## 3. Trigger Rules (Planned / Sandbox-Only)

All triggers below are **planned/sandbox-only**. They document intended logic for founder/operator rehearsal and future implementation review. No cron, scheduler, dispatcher, SMS, or external send is activated by this packet.

| Trigger | Planned Behavior | Default Owner | Sandbox Boundary |
| --- | --- | --- | --- |
| Scheduled appointment time passes | Flag lead for Inspection Completed? review if no outcome recorded. | Founder-operator manual review | No automatic status write in production. |
| Roofer marks inspection completed | Move to Estimate Needed? or appropriate follow-up stage per roofer input. | Roofer | Manual entry only until approved. |
| Homeowner confirms inspection happened | Reconcile with roofer status; advance or hold for mismatch. | Founder-operator | Confirmation captured manually. |
| No outcome known after appointment window | Set Inspection Completed? with unknown outcome; consider Still Open. | Founder-operator | No auto-close to Lost. |
| Missed/rescheduled appointment | Route to Missed / Rescheduled; prompt roofer check-in. | Roofer | No automated blame messaging. |
| Still open after 7+ days | Flag Still Open; include in weekly/monthly aging counts. | Roofer / founder-operator | Aging is reporting-only in planning phase. |
| Needs review aging after 48+ hours | Flag Needs Review for founder-operator reconciliation. | Founder-operator | System-quality issues to RoofLeadHQ/Jason only. |

Reminder timing (planned/sandbox-only):

- Pre-appointment reminder: draft ready 24 hours before appointment (manual approval required).
- Post-inspection check-in: draft ready after appointment window ends (manual approval required).
- Follow-up needed check-in: draft ready when follow-up stage is open 48+ hours (manual approval required).
- No-response follow-up: draft ready after second manual attempt with no reply (manual approval required).

**Important:** All timing/reminder logic remains planned/sandbox-only until live activation is explicitly approved by Jason.

## 4. Roofer-Facing Check-In Prompts (Draft Only)

These prompts are for founder/operator or roofer manual check-in during dry-run rehearsal. They are **draft prompts only**. Do not wire sends.

1. **Did the inspection happen?** (yes / no / unknown)
2. **Was it missed or rescheduled?** (yes / no / not applicable)
3. **Was there an appointment issue?** (yes / no — describe: access, weather, address, no-show, other)
4. **Was an estimate or next step needed?** (yes / no / unknown)
5. **Has the estimate been sent?** (yes / no / not applicable / roofer will send)
6. **Does homeowner follow-up need to happen?** (yes / no — what topic)
7. **Does roofer follow-up need to happen?** (yes / no — what topic)
8. **Should this be marked Won / Lost / Still Open / Needs Review?** (single selection + notes)

Capture on each check-in:

- check_in_owner
- check_in_timestamp
- check_in_channel (call / text / email / in-app / other)
- check_in_notes
- next_manual_action

## 5. Homeowner-Facing Message Drafts (Draft Only — Not Activated, Not Sent)

All messages below are **draft-only**. They are not activated, not sent, and not wired to SMS, email, or any external channel from this packet.

### Appointment reminder (draft)

> Hi [Homeowner Name], this is a reminder that your roofing inspection with [Roofer Company] is scheduled for [Date] at [Time] at [Service Address]. [Roofer Name] is scheduled to be there for the visit. If you need to reschedule, please reply or call [Roofer Phone]. Reply STOP to opt out.

Safety: uses **"is scheduled to be there"** only — no arrival certainty promises in reminder copy.

### Post-inspection check-in (draft)

> Hi [Homeowner Name], we hope your inspection with [Roofer Company] went smoothly today. If anything did not go as expected or you need help with next steps, reply here and we will make sure your roofer follows up.

### Follow-up needed check-in (draft)

> Hi [Homeowner Name], we are checking in on your roofing inspection with [Roofer Company]. Your roofer may still have a next step open for you. If you would like a follow-up or have questions about estimates or scheduling, reply here and we will route it to your roofer.

### Feedback capture (draft)

> Hi [Homeowner Name], thank you for meeting with [Roofer Company]. We have three quick questions to help your roofer improve service (optional):
> 1. Did the roofer show up as expected?
> 2. Was the roofer helpful and professional?
> 3. Would you like the roofer to follow up with next steps?
> Optional: Anything you would like us to pass along?
> Your feedback is shared with your roofer for service improvement. We do not publish reviews without your permission.

### No-response follow-up (draft)

> Hi [Homeowner Name], we tried to reach you about your roofing inspection with [Roofer Company]. If you still need help with next steps or scheduling, reply here. If you are all set, no reply needed.

Explicit boundary: **These drafts are not activated and not sent.**

## 6. Feedback Capture Flow

### Approved 3-question flow

1. **Did the roofer show up as expected?** (yes / no / partially / prefer not to say)
2. **Was the roofer helpful and professional?** (yes / no / partially / prefer not to say)
3. **Would you like the roofer to follow up with next steps?** (yes / no / not sure)

### Optional fourth question

4. **Anything you would like us to pass along?** (free text, optional)

### Feedback handling rules

- **Internal only unless permission is obtained:** feedback stays in RoofLeadHQ dashboard/export until `permission_to_use_publicly` is explicitly `yes`.
- **Shared with roofer:** summarized feedback is available for roofer review and service improvement.
- **Do not fabricate endorsements:** do not invent or imply homeowner endorsements that were not captured.
- **Do not pressure for public praise:** do not pressure homeowners for positive public reviews or star ratings.
- **No incentivized positive feedback:** no discounts, gifts, or rewards tied to feedback scores.
- **No public testimonial use without explicit permission:** `permission_to_use_publicly` must be `yes` before any external testimonial, case study, or marketing quote.

Track:

- feedback_requested (yes / no)
- feedback_captured (yes / no / partial)
- feedback_summary (internal text)
- testimonial_candidate (yes / no / not evaluated)
- permission_to_use_publicly (yes / no / not_asked)

## 7. Permission Field

Every lead with captured feedback must track:

| Field | Values | Description |
| --- | --- | --- |
| permission_to_use_publicly | yes / no / not_asked | Whether the homeowner granted permission to use their feedback in public marketing, testimonials, or case studies. |

Rules:

- Default: `not_asked` until explicitly collected.
- `yes` requires documented homeowner consent (channel, timestamp, owner).
- `no` blocks all public testimonial use for that feedback record.
- This field is required in dashboard/reporting counts and CSV export.

## 8. Escalation Decision Tree

### Default escalation to roofer/contractor

Route these topics to the roofer first:

- pricing questions
- estimate questions
- quote requests
- insurance complexity
- repair vs replacement questions
- upset homeowner
- scheduling issue
- homeowner asks for roofer directly
- legal/insurance/carrier-specific questions
- payment or invoice question
- contract question

### Escalate to RoofLeadHQ/Jason only for system-quality issues

Route these to RoofLeadHQ/Jason — not homeowner-facing sales or estimate work:

- bad or unclear AI response
- missed data capture
- broken routing
- duplicate lead confusion
- source attribution issue
- dashboard/report discrepancy
- workflow state confusion
- setup issue
- failed handoff
- quality-control concern

Decision log fields:

- escalation_topic
- escalation_owner (roofer / RoofLeadHQ-Jason)
- escalation_timestamp
- escalation_resolution
- escalation_notes

## 9. Dashboard / Report Fields

Include these fields in weekly and monthly reporting summaries:

| Field | Description |
| --- | --- |
| active post-inspection leads | Leads currently in any post-inspection stage after Inspection Booked. |
| inspections completed | Count where inspection_completed = yes. |
| inspections with unknown outcome | Count where inspection outcome is still unknown after appointment window. |
| missed/rescheduled appointments | Count in Missed / Rescheduled stage. |
| appointment issues | Count in Appointment Issue stage. |
| estimates needed | Count where estimate_needed = yes and estimate_sent = no. |
| estimates sent | Count where estimate_sent = yes. |
| homeowner follow-ups needed | Count where homeowner_follow_up_needed = yes. |
| roofer follow-ups needed | Count where roofer_follow_up_needed = yes. |
| feedback requested | Count where feedback_requested = yes. |
| feedback captured | Count where feedback_captured = yes. |
| permission_to_use_publicly | Breakdown: yes / no / not_asked counts. |
| won | Count where outcome = won. |
| lost | Count where outcome = lost. |
| still open | Count where outcome = still open or stage = Still Open. |
| needs review aging | Count in Needs Review stage beyond 48+ hours. |

Reporting notes:

- Weekly report: snapshot of open follow-ups, unknown outcomes, and needs review aging.
- Monthly report: trend lines for completed inspections, feedback capture rate, and outcome distribution.
- All counts are planning/readiness definitions until dashboard implementation is explicitly approved.

## 10. CSV Export Fields

| Field | Description |
| --- | --- |
| lead_id | Unique lead identifier in RoofLeadHQ. |
| homeowner_name | Homeowner full name. |
| homeowner_phone | Homeowner phone number. |
| homeowner_email | Homeowner email address. |
| service_address | Property address for the inspection. |
| lead_source | Original lead source attribution. |
| appointment_date | Booked inspection date. |
| appointment_time | Booked inspection time. |
| appointment_status | Current post-inspection stage (see status table). |
| missed_or_rescheduled | yes / no / unknown — whether appointment was missed or rescheduled. |
| appointment_issue | yes / no — whether an appointment issue was reported. |
| inspection_completed | yes / no / unknown — whether the inspection happened. |
| reminder_ready_or_sent | ready / sent / not applicable — reminder draft status (manual only). |
| estimate_needed | yes / no / unknown — whether an estimate or next step is needed. |
| estimate_sent | yes / no / unknown — whether roofer marked estimate sent. |
| homeowner_follow_up_needed | yes / no — whether homeowner follow-up is open. |
| roofer_follow_up_needed | yes / no — whether roofer follow-up is open. |
| feedback_requested | yes / no — whether feedback was requested. |
| feedback_captured | yes / no / partial — whether feedback was captured. |
| feedback_summary | Internal summary of homeowner feedback. |
| testimonial_candidate | yes / no / not evaluated — internal flag only; not public without permission. |
| permission_to_use_publicly | yes / no / not_asked — public use permission status. |
| outcome | won / lost / still open / needs review / in progress. |
| outcome_date | Date outcome or stage was last updated. |
| notes | Free-text operator/roofer notes. |

## 11. Safety and Positioning Notes

This packet is **not** a sales pipeline or deal-closing tool.

Explicit boundaries:

- This does not guarantee signed contracts, revenue, appointments, or jobs.
- This does not generate estimates or quotes.
- This does not collect payments.
- This does not create public reviews.
- This does not publish testimonials without permission.
- This remains planning/readiness-only until explicitly activated.

### Forbidden public language

Do not use in customer-facing copy, drafts intended for publication, or marketing. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | language that implies booking or closing roofing jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or guaranteed job counts |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| Review manipulation | fabricated endorsements, pressured public praise campaigns, incentivized positive feedback, or unattended public review publishing |
| Arrival certainty | arrival certainty phrasing that promises on-site attendance (use "is scheduled to be there" instead) |

### Preferred language

Use in post-inspection follow-up and feedback capture materials:

- booked inspections
- booked homeowner appointments
- lead-to-inspection
- post-inspection follow-up
- post-inspection feedback capture
- next-step tracking
- keep next steps and outcomes visible
- roofer follow-up
- homeowner follow-up
- still open
- needs review
- is scheduled to be there
- permission_to_use_publicly

## Decision Language

- **POST INSPECTION FOLLOW UP AND FEEDBACK CAPTURE PACKET PASS** — packet reviewed; stages, drafts, feedback rules, escalation, reporting, and CSV fields accepted for planning use.
- **POST INSPECTION FOLLOW UP AND FEEDBACK CAPTURE PACKET HOLD** — missing roofer alignment, incomplete feedback permission process, or unresolved escalation ambiguity.
- **POST INSPECTION FOLLOW UP AND FEEDBACK CAPTURE PACKET BLOCKED** — consent/safety risk, forbidden language detected, or live activation attempted without approval.

## Explicit No-Live-Activation Confirmation

This packet:

- Does not perform production Supabase writes.
- Does not change env/credentials.
- Does not change auth/RLS/schema/security.
- Does not activate external sends, public routes, cron, scheduler, or dispatcher.
- Does not connect to CRM.
- Does not send homeowner or roofer messages.

Any real-world follow-up, reminder, or feedback collection must be performed manually by a founder/operator or roofer outside automated activation until Jason explicitly approves live activation.

PASS: Post-Inspection Follow-Up + Feedback Capture Packet completed successfully