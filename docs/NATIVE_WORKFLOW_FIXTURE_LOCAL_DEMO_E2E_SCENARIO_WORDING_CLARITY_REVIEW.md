# Native Workflow Fixture Local Demo E2E Scenario Wording Clarity Review

## 1. Purpose and Scope

**Source-of-truth commit:** `0d7ae0d`

This packet clarifies scenario titles, expected outcomes, and operator notes for all 25 Summit Peak Roofing Demo LLC fake-data E2E scenarios.

### Scope guardrails

- **No scenario creates a public/customer-facing promise.** All scenarios document local fake-data review paths only.
- **All scenarios remain fake-data/local-only.** No real homeowners, real roofers, or real external service activity are implied.
- packet_status is `review_only`
- activation_approval_status is `not_granted`

### Evidence chain commits

`17abae0`, `cf566ae`, `728ad03`, `401bfc7`, `edceb29`, `df388f4`, `3800512`, `c6df554`, `f752452`, `0d7ae0d`

## 2. Scenario Wording Review (25 scenarios)

---

### scenario-001-new-paid-lead-qualified-appointment-ready

- **Operator-friendly title:** New qualified fake lead ready for appointment review
- **What this scenario proves:** A complete fake paid lead with confirmed contact permission routes to appointment readiness review without live booking.
- **Expected outcome (plain English):** Lead stays in local review; roofer reviews appointment readiness; no notification sent; no external call.
- **Possible confusion point:** “Appointment-ready” may sound like a booked appointment.
- **Safer wording recommendation:** Use “appointment readiness review” instead of “appointment ready” in operator notes.

---

### scenario-002-new-lead-missing-contact-review-queue

- **Operator-friendly title:** New fake lead missing contact info — review queue
- **What this scenario proves:** Incomplete fake contact data forces review queue hold before any outreach planning.
- **Expected outcome (plain English):** Lead enters review queue; operator completes missing contact review; no outbound messaging.
- **Possible confusion point:** Review queue may look like an automated CRM task.
- **Safer wording recommendation:** Say “operator review hold for missing fake contact fields” rather than “CRM queue task.”

---

### scenario-003-new-lead-no-contact-permission

- **Operator-friendly title:** New fake lead — contact permission denied
- **What this scenario proves:** Denied contact permission blocks outbound messaging in local review.
- **Expected outcome (plain English):** Messaging hold; outbound blocked until permission clarified; no live send.
- **Possible confusion point:** “No contact permission” may imply a real compliance violation occurred.
- **Safer wording recommendation:** Label as “fake-data permission_denied fixture state” in operator notes.

---

### scenario-004-missed-lead-recovery

- **Operator-friendly title:** Missed fake lead recovery review
- **What this scenario proves:** A prior unanswered fake lead routes to manual recovery review without automated outreach.
- **Expected outcome (plain English):** Missed lead recovery review; roofer manual follow-up required; no notification sent.
- **Possible confusion point:** “Recovery” may imply a live re-engagement campaign ran.
- **Safer wording recommendation:** Use “manual recovery review path (fake prior lead)” not “recovery campaign executed.”

---

### scenario-005-manual-outreach

- **Operator-friendly title:** Manual outreach — roofer-controlled only
- **What this scenario proves:** Outreach stays roofer-controlled and draft-only in local review.
- **Expected outcome (plain English):** Manual outreach roofer-controlled state; roofer prepares draft only; no live send.
- **Possible confusion point:** “Manual outreach” may sound like a message was sent.
- **Safer wording recommendation:** Always pair with “draft-only, no live send, fake-data review.”

---

### scenario-006-appointment-readiness

- **Operator-friendly title:** Appointment readiness — fake homeowner preference captured
- **What this scenario proves:** Qualified fake lead with preference data reaches appointment readiness review state.
- **Expected outcome (plain English):** Appointment readiness ready; roofer reviews; no calendar booking; no external call.
- **Possible confusion point:** “Readiness” may be read as “scheduled.”
- **Safer wording recommendation:** Distinguish “readiness review” from “scheduled appointment.”

---

### scenario-007-appointment-scheduled-placeholder

- **Operator-friendly title:** Fake calendar placeholder only — not a live booking
- **What this scenario proves:** A scheduled state exists only as a local fake calendar placeholder.
- **Expected outcome (plain English):** Appointment scheduled placeholder only; fake_calendar_placeholder_only true; no live calendar sync.
- **Possible confusion point:** “Scheduled” strongly implies a real calendar event.
- **Safer wording recommendation:** Lead with “fake calendar placeholder only” in titles and notes.

---

### scenario-008-appointment-reschedule-request

- **Operator-friendly title:** Reschedule request — manual review
- **What this scenario proves:** A fake reschedule request routes to manual review without automated rescheduling.
- **Expected outcome (plain English):** Reschedule review; roofer manual step required; no calendar API call.
- **Possible confusion point:** Request may sound like it came from a real homeowner.
- **Safer wording recommendation:** Prefix with “fixture reschedule request” in all operator copy.

---

### scenario-009-missed-appointment-no-show

- **Operator-friendly title:** No-show follow-up — manual review path
- **What this scenario proves:** A fake no-show routes to manual follow-up review without automated outreach.
- **Expected outcome (plain English):** No-show follow-up review; manual outreach required; no notification sent.
- **Possible confusion point:** “No-show” implies a real missed appointment occurred.
- **Safer wording recommendation:** Use “fake no-show fixture state” in observation notes.

---

### scenario-010-post-inspection-estimate-pending

- **Operator-friendly title:** Post-inspection — estimate pending (tracking only)
- **What this scenario proves:** After fake inspection, estimate remains pending with manual roofer follow-up — no auto-quote.
- **Expected outcome (plain English):** Estimate pending tracking; manual next step; estimate_created false; no billing automation.
- **Possible confusion point:** “Estimate pending” may imply a quote was being generated automatically.
- **Safer wording recommendation:** Say “estimate pending — manual roofer tracking only, no auto-quote.”

---

### scenario-011-post-inspection-estimate-sent

- **Operator-friendly title:** Post-inspection — estimate sent (fixture tracking only)
- **What this scenario proves:** Estimate-sent is a local tracking state only — not a live quote delivery.
- **Expected outcome (plain English):** Estimate sent tracking only; quote_sent false at automation layer; no external delivery.
- **Possible confusion point:** “Estimate sent” reads like a customer received a document.
- **Safer wording recommendation:** Use “estimate-sent tracking state (fixture only)” in operator docs.

---

### scenario-012-feedback-permission-not-asked

- **Operator-friendly title:** Feedback — public-use permission not asked
- **What this scenario proves:** Completed fake job with feedback permission not yet asked stays in internal review.
- **Expected outcome (plain English):** Feedback permission not asked state; no public use; no outbound messaging.
- **Possible confusion point:** May imply feedback collection is active.
- **Safer wording recommendation:** Clarify “permission status not_asked — no public testimonial use.”

---

### scenario-013-feedback-permission-yes

- **Operator-friendly title:** Feedback — permission yes (internal only)
- **What this scenario proves:** Permission yes allows internal review tracking only — not public marketing use in this packet.
- **Expected outcome (plain English):** Feedback permission yes internal only; no public posting; no live publish.
- **Possible confusion point:** “Permission yes” may sound like marketing approval to publish.
- **Safer wording recommendation:** Always add “internal-only fixture review, not public publish approval.”

---

### scenario-014-feedback-permission-no

- **Operator-friendly title:** Feedback — permission no (public use blocked)
- **What this scenario proves:** Explicit no blocks any public use of fake feedback in local review.
- **Expected outcome (plain English):** Public use blocked; internal record only; no outbound messaging.
- **Possible confusion point:** Operators may think internal use is also blocked.
- **Safer wording recommendation:** Distinguish “public use blocked” from “internal review allowed.”

---

### scenario-015-lead-source-roi-attribution

- **Operator-friendly title:** Lead source ROI — fake attribution review
- **What this scenario proves:** Fake lead source tags support local ROI attribution review without live ad platform sync.
- **Expected outcome (plain English):** Source ROI attribution review; no external ad API; no CRM sync.
- **Possible confusion point:** ROI numbers may look like live campaign performance.
- **Safer wording recommendation:** Label metrics as “fixture attribution review only.”

---

### scenario-016-usage-volume-plan-limit-boundary

- **Operator-friendly title:** Usage volume — plan limit boundary review
- **What this scenario proves:** Fake usage volume near plan limits triggers boundary review without billing automation.
- **Expected outcome (plain English):** Plan limit boundary review; no payment collected; no invoice sent.
- **Possible confusion point:** May imply a real billing charge or upgrade occurred.
- **Safer wording recommendation:** Use “fixture plan-limit boundary review — no billing action.”

---

### scenario-017-messaging-compliance-contact-permission

- **Operator-friendly title:** Messaging compliance — contact permission needs review
- **What this scenario proves:** Ambiguous fake contact permission triggers compliance hold before any messaging planning.
- **Expected outcome (plain English):** Messaging compliance hold; review queue required; outbound blocked.
- **Possible confusion point:** “Compliance” may sound like Legal already ruled on a real case.
- **Safer wording recommendation:** Say “fixture permission needs_review — compliance hold for local review.”

---

### scenario-018-data-minimization-pii-boundary

- **Operator-friendly title:** Data minimization — fake PII boundary review
- **What this scenario proves:** Local review checks fake PII fields stay within minimization boundaries.
- **Expected outcome (plain English):** PII boundary review; no production data access; no external export.
- **Possible confusion point:** Fake PII labels may look like real homeowner data.
- **Safer wording recommendation:** Mark all fields as fixture/demo data in operator notes.

---

### scenario-019-audit-timeline-event-expectation

- **Operator-friendly title:** Audit timeline — expected fake events review
- **What this scenario proves:** Local audit timeline expectations are documented for fake lead events.
- **Expected outcome (plain English):** Audit timeline event expectation review; no production audit write; no external log sync.
- **Possible confusion point:** Timeline may appear to be a live system audit trail.
- **Safer wording recommendation:** Use “fixture audit timeline expectation” not “production audit log.”

---

### scenario-020-review-queue-aging-sla-boundary

- **Operator-friendly title:** Review queue aging — SLA boundary review
- **What this scenario proves:** An aged fake review-queue item triggers SLA boundary review without automated escalation sends.
- **Expected outcome (plain English):** Review queue aging SLA boundary; review queue required; no notification sent.
- **Possible confusion point:** SLA may imply automated alerts fired.
- **Safer wording recommendation:** Say “SLA boundary review record — no automated alert sent.”

---

### scenario-021-human-escalation-roofer-judgment

- **Operator-friendly title:** Escalation to roofer — business judgment needed
- **What this scenario proves:** Business judgment routes to roofer human escalation — not RoofLeadHQ by default.
- **Expected outcome (plain English):** Roofer human escalation review; review_owner roofer; manual outreach may be required; no live action.
- **Possible confusion point:** “Escalation” may sound urgent or customer-facing.
- **Safer wording recommendation:** Use “roofer judgment escalation (fake-data review)” not “urgent customer escalation.”

---

### scenario-022-roofleadhq-escalation-system-review

- **Operator-friendly title:** Escalation to RoofLeadHQ — system review only
- **What this scenario proves:** RoofLeadHQ escalation is limited to ambiguity, bad data, QC, broken routing, or system review.
- **Expected outcome (plain English):** RoofLeadHQ system escalation review; review_owner roofleadhq; no external service call.
- **Possible confusion point:** May imply Jason must intervene on every scenario.
- **Safer wording recommendation:** Scope to “system/QC/routing review only — not routine roofer workflow.”

---

### scenario-023-unsupported-automation-blocked

- **Operator-friendly title:** Unsupported automation blocked — no auto quote/invoice/payment
- **What this scenario proves:** Instant quote, estimate, invoice, and payment requests are blocked in local review.
- **Expected outcome (plain English):** Unsupported automation blocked; review queue required; estimate_created/quote_sent/invoice_sent/payment_collected all false.
- **Possible confusion point:** Wording may still imply partial automation exists.
- **Safer wording recommendation:** Lead with “blocked — manual roofer path only” in all operator summaries.

---

### scenario-024-external-service-boundary-blocked

- **Operator-friendly title:** External services blocked — no Twilio/Vapi/Resend/Calendar/Lindy/CRM
- **What this scenario proves:** All external service calls remain blocked in local fake-data review.
- **Expected outcome (plain English):** External service calls blocked; external_services_called false; approved_external_services empty.
- **Possible confusion point:** Listing services may imply some are approved elsewhere.
- **Safer wording recommendation:** State “all listed services blocked — approved_external_services [].”

---

### scenario-025-stop-condition-boundary

- **Operator-friendly title:** Stop condition — unsafe run attempts halt review
- **What this scenario proves:** Stop conditions fail-closed when unsafe activation or external paths are attempted.
- **Expected outcome (plain English):** Stop condition triggered fixture review; run halts; no activation; no command execution.
- **Possible confusion point:** “Stop condition” may sound like it already fired in production.
- **Safer wording recommendation:** Use “stop-condition boundary documented in fixture — not a live production halt event.”

---

## 3. Explicit Safety Notes

- **No scenario creates a public/customer-facing promise.**
- **All scenarios remain fake-data/local-only.**
- activation_approval_status: not_granted
- command_execution_status: not_run_by_this_packet
- public_website_go_live_copy_changed: false

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.