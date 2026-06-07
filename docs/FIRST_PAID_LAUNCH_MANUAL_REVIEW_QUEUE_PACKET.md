# RoofLeadHQ — First Paid Launch Manual Review Queue Packet

This packet connects emergency escalation, contractor notification, appointment outcomes, lead source quality, missing information recovery, Lindy internal lead review summary, follow-up cadence, and reporting into a single founder/operator manual review queue during the founder-led first-paid launch.

Safety posture:

- Safety remains demo-ready with live automation disabled.
- No live SMS/Twilio sends.
- No production Supabase writes.
- No Vapi production webhook ingestion.
- No live Vapi webhook route.
- No Calendar booking activation.
- No Resend production activation.
- No Lindy production activation.
- No cron activation.
- No scheduler activation.
- No dispatcher activation.
- No public production route activation.
- No secrets exposure.
- No destructive operations.

## Manual Review Queue

The manual review queue is an internal queue used by the founder/operator to review leads that require manual attention before any contractor notification, follow-up, or reporting action is prepared.

## Founder/Operator Review

All leads in the manual review queue are reviewed by the founder or designated operator. No automation is used to prioritize, route, or act on queue items.

## Emergency Escalation Review

Leads flagged with emergency escalation are placed at the top of the manual review queue for immediate founder/operator review.

## Contractor Notification Review

Leads that have passed emergency escalation review are reviewed for contractor notification readiness before any manual notification summary is prepared.

## Appointment Outcome Review

Leads with recorded appointment outcomes are reviewed for consistency with lead source quality and missing information recovery status.

## Lead Source Quality Review

Leads are reviewed for source confidence, lead quality category (high-intent, medium-intent, low-intent, spam / bad-fit, duplicate), and source detail completeness.

## Missing Information Recovery Review

Incomplete leads are reviewed for missing information categories and recovery status before being cleared from the manual review queue.

## Lindy Internal Lead Review Summary Tie-In

The manual review queue incorporates Lindy internal lead review summary data for operator visibility during founder-led first-paid launch. No Lindy production automation is activated.

## Follow-Up Cadence Review

Leads are reviewed for follow-up cadence status and any required pauses due to missing information or emergency escalation.

## Reporting Review

Leads in the manual review queue are tracked for weekly leads report and monthly leads report under recommended actions.

## Incomplete Lead Review

Leads classified as incomplete are held in the manual review queue until minimum information is recovered or the lead is marked for manual review.

## High-Intent Lead Review

High-intent leads are reviewed for priority handling and recommended actions (book inspections, book appointments).

## Emergency Lead Review

Emergency leads receive immediate founder/operator review and are tracked separately in reporting.

## Duplicate Lead Review

Duplicate leads are reviewed for deduplication before any contractor notification or follow-up action.

## Spam / Bad-Fit Lead Review

Spam / bad-fit leads are reviewed and marked for exclusion from contractor notification and follow-up.

## Source Confidence Review

Leads with low source confidence are reviewed for additional source detail recovery.

## Recommended Actions

- book inspections
- book appointments
- manual review
- follow-up needed

## Explicit Approval Gates

No lead leaves the manual review queue without explicit founder/operator approval. All safety rules remain enforced.

## No Live Automation

The manual review queue is a documentation and planning construct only. No live queue, scheduler, dispatcher, cron, or public route is activated.

PASS: First Paid Launch manual review queue packet completed successfully
