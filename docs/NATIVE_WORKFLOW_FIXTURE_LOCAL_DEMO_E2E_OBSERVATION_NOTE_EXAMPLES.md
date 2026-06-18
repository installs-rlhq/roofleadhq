# Native Workflow Fixture Local Demo E2E Observation Note Examples

## 1. Purpose and Scope

**Source-of-truth commit:** `0d7ae0d`

Fake-data observation note examples for all 25 Summit Peak Roofing Demo LLC local demo E2E scenarios. Examples support operator note capture during walkthrough review. **No example implies real homeowner, real roofer, or real external service activity.**

- packet_status: `review_only`
- activation_approval_status: `not_granted`
- All examples use fixture IDs and fake demo data only.

## 2. Observation Status Examples

### PASS example

| Field | Value |
| --- | --- |
| Scenario ID | scenario-001-new-paid-lead-qualified-appointment-ready |
| Status | PASS |
| Severity | INFO |
| Owner | Jason |
| Issue Category | fake data clarity |
| Note | Fake lead fixture-lead-001-qualified-appointment-ready reads clearly; appointment readiness review wording is acceptable for local demo review. No live booking implied. |

### PASS_WITH_NOTE example

| Field | Value |
| --- | --- |
| Scenario ID | scenario-007-appointment-scheduled-placeholder |
| Status | PASS_WITH_NOTE |
| Severity | LOW |
| Owner | Product |
| Issue Category | scenario wording |
| Note | Title could lead with "fake calendar placeholder only" earlier; fixture state is correct and no live calendar sync occurred. |

### REVIEW_NEEDED example

| Field | Value |
| --- | --- |
| Scenario ID | scenario-017-messaging-compliance-contact-permission |
| Status | REVIEW_NEEDED |
| Severity | MEDIUM |
| Owner | Legal/Compliance |
| Issue Category | compliance/messaging concern |
| Note | Fixture permission needs_review state is clear, but operator runbook could add one more sentence distinguishing compliance hold from live messaging approval. |

### FAIL_NO_GO example

| Field | Value |
| --- | --- |
| Scenario ID | scenario-025-stop-condition-boundary |
| Status | FAIL_NO_GO |
| Severity | BLOCKER |
| Owner | Engineering |
| Issue Category | safety boundary concern |
| Note | If any doc wording implied stop condition already fired against production, that would block walkthrough acceptance. Current fixture shows local boundary only — example kept as FAIL_NO_GO template for unsafe wording detection. |

## 3. Severity Examples

| Severity | Example note |
| --- | --- |
| INFO | Scenario-015 fixture attribution labels are easy to skim during local review. |
| LOW | Scenario-006 title could say "readiness review" instead of "ready" for minor clarity. |
| MEDIUM | Scenario-011 "estimate sent" phrasing needs stronger "tracking only" qualifier in walkthrough section. |
| HIGH | Scenario-023 wording must never imply partial quote automation is live — operator trust risk. |
| BLOCKER | Any doc that approves external_calls_allowed true would block acceptance before future sandbox planning. |

## 4. Owner Examples

| Owner | Example assignment |
| --- | --- |
| Jason | Review scenario-022 RoofLeadHQ escalation scope for operator narrative clarity. |
| Roofer | Review scenario-021 roofer judgment path reads naturally for demo roofer workflow. |
| Engineering | Confirm scenario-025 stop-condition fixture matches verifier assertions. |
| Product | Polish scenario-007 placeholder calendar wording in walkthrough section. |
| Legal/Compliance | Review scenario-003 permission_denied messaging hold language. |
| Hold | Defer scenario-016 plan-limit boundary copy until P2 edge-case expansion is reviewed. |

## 5. Issue Category Examples

Categories from master review backlog (`0d7ae0d`):

| Category | Example |
| --- | --- |
| fake data clarity | Fixture-lead-018 fake PII fields are labeled demo-only in observation table. |
| scenario wording | Scenario-010 title should say "tracking only" for estimate pending. |
| expected outcome mismatch | (none in current chain — example: if scenario-004 outcome text disagreed with fixture final_state, flag here) |
| review queue ambiguity | Scenario-002 review queue hold purpose is clear after P1 wording polish. |
| escalation ambiguity | Scenario-021 vs 022 escalation routing distinction documented in operator readability doc. |
| compliance/messaging concern | Scenario-003 outbound hold aligns with permission_denied fixture. |
| post-inspection concern | Scenario-010/011 distinguish pending vs sent tracking without live quote delivery. |
| feedback permission concern | Scenario-012/013/014 public-use boundaries are explicit in wording review. |
| reporting/CSV concern | Scenario-015 ROI attribution stays fixture-only with no live CSV delivery implied. |
| source ROI concern | Scenario-015 source tag review is fake-data attribution only. |
| safety boundary concern | Scenario-024 lists all external services as blocked with empty approved_external_services. |
| old 90-day plan reconciliation candidate | No scenario overrides 0d7ae0d source-of-truth direction — note for future P2 audit only. |
| other | Scenario-019 audit timeline section could add one cross-link to compressed evidence summary. |

## 6. Per-Scenario Sample Observation Notes (25 scenarios)

| # | Scenario ID | Sample observation note (fake data only) |
| --- | --- | --- |
| 1 | scenario-001-new-paid-lead-qualified-appointment-ready | PASS — fixture-lead-001 path to appointment_readiness_review is clear; no notification_sent; roofer review step obvious. |
| 2 | scenario-002-new-lead-missing-contact-review-queue | PASS_WITH_NOTE — review queue hold for missing fake phone/email is clear; minor polish on "operator completes missing contact review" label. |
| 3 | scenario-003-new-lead-no-contact-permission | PASS — permission_denied fixture correctly blocks outbound; no live messaging implied. |
| 4 | scenario-004-missed-lead-recovery | PASS — fake prior unanswered lead routes to manual recovery review; no automated campaign language. |
| 5 | scenario-005-manual-outreach | PASS — manual outreach stays roofer-controlled draft-only; external_services_called false. |
| 6 | scenario-006-appointment-readiness | PASS_WITH_NOTE — preference captured in fixture; recommend "readiness review" phrasing over "ready" in walkthrough. |
| 7 | scenario-007-appointment-scheduled-placeholder | PASS — fake_calendar_placeholder_only flag visible; no live Google Calendar sync implied. |
| 8 | scenario-008-appointment-reschedule-request | PASS — fixture reschedule request routes to manual review; no calendar API call. |
| 9 | scenario-009-missed-appointment-no-show | PASS — fake no-show state triggers manual follow-up review only. |
| 10 | scenario-010-post-inspection-estimate-pending | PASS_WITH_NOTE — estimate pending tracking clear; add "no auto-quote" in section header for operators. |
| 11 | scenario-011-post-inspection-estimate-sent | PASS — estimate-sent is tracking state only; quote_sent false at automation layer documented. |
| 12 | scenario-012-feedback-permission-not-asked | PASS — permission_to_use_publicly not_asked state clear; no public testimonial implied. |
| 13 | scenario-013-feedback-permission-yes | PASS — internal-only permission yes; no public publish approval in this packet. |
| 14 | scenario-014-feedback-permission-no | PASS — public use blocked state matches fixture; internal review still allowed. |
| 15 | scenario-015-lead-source-roi-attribution | PASS — fake source ROI attribution review only; no ad platform or CRM sync. |
| 16 | scenario-016-usage-volume-plan-limit-boundary | PASS — plan limit boundary review documented; no billing or payment automation. |
| 17 | scenario-017-messaging-compliance-contact-permission | REVIEW_NEEDED — compliance hold clear but runbook could add one clarifying sentence (Legal/Compliance owner). |
| 18 | scenario-018-data-minimization-pii-boundary | PASS — fake PII minimization boundary review; production_data_touched false. |
| 19 | scenario-019-audit-timeline-event-expectation | PASS — fixture audit timeline expectations documented; not a production audit log. |
| 20 | scenario-020-review-queue-aging-sla-boundary | PASS — aged review queue SLA boundary review; no automated alert sent. |
| 21 | scenario-021-human-escalation-roofer-judgment | PASS — roofer judgment escalation routing clear; review_owner roofer correct. |
| 22 | scenario-022-roofleadhq-escalation-system-review | PASS — RoofLeadHQ escalation scoped to system/QC/routing review only. |
| 23 | scenario-023-unsupported-automation-blocked | PASS — quote/estimate/invoice/payment automation blocked; manual roofer path required. |
| 24 | scenario-024-external-service-boundary-blocked | PASS — Twilio/Vapi/Resend/Calendar/Lindy/CRM all blocked; approved_external_services []. |
| 25 | scenario-025-stop-condition-boundary | PASS — stop-condition boundary documented as fixture review; fail-closed guard clear. |

## 7. Safety Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| public_website_go_live_copy_changed | false |

No observation note in this packet approves activation, live/sandbox/test-mode activation, external services, or final activation command execution.

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.