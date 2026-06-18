# Native Workflow Fixture Local Demo E2E Fake-Data Edge Case Expansion

## 1. Purpose and Scope

**Source-of-truth commit:** `5ef9ef5` — `test(workflow): add local demo e2e p1 polish batch`

**Purpose:** Expand local fake-data edge-case coverage for Summit Peak Roofing Demo LLC review sessions. This packet documents optional edge-case handling expectations without adding live routes, services, or dispatch behavior.

### What this packet is

- fake-data edge case expansion for local demo E2E review
- documentation-only edge-case handling expectations per category
- read-only verifier input
- **local fake-data only scope** — fake-data/local-only/read-only/dry-run-only/review-only
- packet type is `local_demo_e2e_fake_data_edge_case_expansion`
- p2_items_completed includes `fake_data_edge_case_expansion`
- packet_status is `review_only`
- p2_edge_case_categories_count is `15`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation.
- This does **not** approve sandbox/test-mode activation.
- This does **not** approve external calls, credentials access, production data access, or billing automation.
- This does **not** run the final activation command.
- This does **not** change public website, go-live, or production copy.
- No new live routes/services/dispatch behavior.

### Evidence chain commit references

- `17abae0` — demo roofer local E2E test bundle
- `cf566ae` — post-run evidence and demo E2E readiness
- `728ad03` — demo roofer scenario review runner
- `401bfc7` — demo roofer E2E evidence report
- `edceb29` — demo roofer local E2E operator gate
- `df388f4` — local demo E2E run evidence capture
- `3800512` — final local demo E2E readiness decision
- `c6df554` — demo roofer E2E walkthrough triage
- `f752452` — demo roofer walkthrough observation evidence capture
- `0d7ae0d` — local demo E2E master review backlog boundary
- `5ef9ef5` — local demo E2E P1 polish batch

### Connected packets

- P1 polish batch: `docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OPERATOR_READABILITY_POLISH.md`
- Old 90-day plan reconciliation audit: `docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OLD_90_DAY_PLAN_RECONCILIATION_AUDIT.md`
- Dashboard/admin screenshot checklist: `docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_DASHBOARD_ADMIN_SCREENSHOT_CHECKLIST.md`
- CSV/reporting example review: `docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_CSV_REPORTING_EXAMPLE_REVIEW.md`
- Remaining refinement backlog: `docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_REMAINING_REFINEMENT_BACKLOG.md`
- Structured P2 refinement fixture: `backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-p2-refinement-batch.json`

## 2. Edge Case Categories (15)

All examples use fake Summit Peak Roofing Demo LLC data only. No real homeowner PII. No outbound messaging in this packet.

---

### Edge Case 1: Duplicate homeowner lead

**Category:** duplicate homeowner lead

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-001`, `name: "Alex Morgan"`, `phone: 555-0101`, `email: alex.morgan.fake@example.test`, duplicate submission 12 minutes later with same phone and address `742 Demo Ridge Ln, Summit CO` |
| **Expected local handling** | Flag as duplicate candidate; link to prior fake lead record; hold new submission in review queue until operator confirms same homeowner vs. household member |
| **Review/escalation owner** | Roofer (primary) → RoofLeadHQ system review if dedup logic ambiguous |
| **Blocked actions** | Auto-merge without review; live SMS/email to either record; CRM sync |
| **Verifier expectation** | Assert duplicate flagged in local fixture; review queue state documented; no live send paths activated |

---

### Edge Case 2: Missing phone but email present

**Category:** missing phone but email present

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-002`, `name: "Jordan Lee"`, `phone: null`, `email: jordan.lee.fake@example.test`, `roof_issue: "shingle damage after wind"` |
| **Expected local handling** | Accept lead into review queue; mark SMS channel unavailable; document email-only contact path for operator review |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | SMS send attempt; auto-qualify as appointment-ready without contact path confirmation |
| **Verifier expectation** | Assert phone-missing state in fixture; contact permission fields reflect email-only; SMS paths remain blocked |

---

### Edge Case 3: Phone present but no SMS permission

**Category:** phone present but no SMS permission

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-003`, `name: "Casey Brooks"`, `phone: 555-0103`, `sms_permission: false`, `email: casey.brooks.fake@example.test` |
| **Expected local handling** | Store phone for operator reference only; route to review queue for compliant contact method selection; document no-SMS posture |
| **Review/escalation owner** | Roofer → Legal/Compliance if permission wording unclear |
| **Blocked actions** | SMS send; treating phone presence as SMS consent |
| **Verifier expectation** | Assert sms_permission false preserved; messaging compliance boundary documented; no Twilio activation |

---

### Edge Case 4: Ambiguous roof issue

**Category:** ambiguous roof issue

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-004`, `name: "Riley Stone"`, `roof_issue: "something wrong with the roof, not sure what"` |
| **Expected local handling** | Hold in review queue; request operator clarification notes; do not auto-classify severity or scope |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Auto-quote; auto-estimate; emergency dispatch without human review |
| **Verifier expectation** | Assert ambiguous issue flagged; review queue state present; quote/estimate automation blocked |

---

### Edge Case 5: Emergency/unsafe request

**Category:** emergency/unsafe request

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-005`, `name: "Morgan Hale"`, `roof_issue: "active ceiling leak, water pooling near electrical panel"`, `urgency: emergency` |
| **Expected local handling** | Flag high-priority review; document human escalation to roofer judgment immediately; no automated emergency dispatch |
| **Review/escalation owner** | Roofer (immediate) |
| **Blocked actions** | Automated emergency routing; live outbound calls; external service dispatch |
| **Verifier expectation** | Assert emergency flag in fixture; human escalation documented; no dispatcher/scheduler activation |

---

### Edge Case 6: Renter/non-owner ambiguity

**Category:** renter/non-owner ambiguity

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-006`, `name: "Taylor Quinn"`, `property_role: renter`, `owner_contact: unknown`, `roof_issue: "landlord asked me to get an estimate"` |
| **Expected local handling** | Hold in review queue; document owner-authorization gap; require roofer judgment before inspection scheduling |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Schedule inspection without owner confirmation; auto-approve estimate authority |
| **Verifier expectation** | Assert renter ambiguity flagged; appointment readiness not auto-granted |

---

### Edge Case 7: Out-of-service-area lead

**Category:** out-of-service-area lead

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-007`, `name: "Drew Nolan"`, `address: "901 Far Valley Rd, Outside Summit CO 80999"`, `service_area_match: false` |
| **Expected local handling** | Mark out-of-area; route to review queue or polite decline template for operator review; no auto-booking |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Auto-schedule inspection; CRM sync to partner roofer without review |
| **Verifier expectation** | Assert service_area_match false; blocked scheduling path documented |

---

### Edge Case 8: Already has contractor

**Category:** already has contractor

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-008`, `name: "Jamie Ortiz"`, `notes: "already working with ABC Roofing, just comparing quotes"` |
| **Expected local handling** | Flag competitive-context lead; hold for roofer judgment on whether to pursue; document no-pressure posture |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Aggressive follow-up automation; instant quote/estimate |
| **Verifier expectation** | Assert contractor-exists note preserved; quote/estimate automation blocked |

---

### Edge Case 9: Reschedule repeated

**Category:** reschedule repeated

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-009`, `name: "Avery Kim"`, `appointment_status: reschedule_requested`, `reschedule_count: 3`, `last_reason: "weather"` |
| **Expected local handling** | Escalate to roofer judgment after repeated reschedules; document pattern in review notes; no auto-rebook without confirmation |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Auto-rebook; calendar sync; live notification sends |
| **Verifier expectation** | Assert reschedule_count tracked; human escalation documented; calendar activation blocked |

---

### Edge Case 10: No-show repeated

**Category:** no-show repeated

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-010`, `name: "Quinn Patel"`, `appointment_status: no_show`, `no_show_count: 2` |
| **Expected local handling** | Route to missed-lead recovery review; require roofer decision on follow-up vs. close; document pattern |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Auto-close without review; punitive automated messaging |
| **Verifier expectation** | Assert no_show_count tracked; missed-lead recovery path documented |

---

### Edge Case 11: Post-inspection stalled

**Category:** post-inspection stalled

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-011`, `name: "Sam Rivera"`, `inspection_status: completed`, `post_inspection_status: estimate_pending`, `days_since_inspection: 14` |
| **Expected local handling** | Flag stalled post-inspection follow-up; route to roofer review queue; document estimate-pending state without auto-send |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Auto-send estimate; payment/deposit automation; invoice generation |
| **Verifier expectation** | Assert stalled state documented; billing_payment_automation_allowed false preserved |

---

### Edge Case 12: Feedback permission unclear

**Category:** feedback permission unclear

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-012`, `name: "Jordan Ellis"`, `permission_to_use_publicly: not_asked`, `feedback_text: "great service"` |
| **Expected local handling** | Preserve `permission_to_use_publicly: not_asked`; hold feedback for operator clarification before any public use |
| **Review/escalation owner** | Roofer → Legal/Compliance if public-use question arises |
| **Blocked actions** | Public testimonial use; marketing copy insertion; external publish |
| **Verifier expectation** | Assert permission_to_use_publicly not_asked preserved; yes/no/not_asked enum intact |

---

### Edge Case 13: Source attribution missing

**Category:** source attribution missing

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-013`, `name: "Casey Dunn"`, `lead_source: null`, `utm_source: null`, `referrer: unknown` |
| **Expected local handling** | Accept lead with unknown source; flag for operator source-assignment review; do not block lead intake |
| **Review/escalation owner** | Roofer → Product if source-tracking gap is systemic |
| **Blocked actions** | Auto-assign ROI credit; CRM source sync |
| **Verifier expectation** | Assert null source preserved; source ROI review path documented |

---

### Edge Case 14: Plan/usage boundary near limit

**Category:** plan/usage boundary near limit

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-014`, `roofer_id: FAKE-SUMMIT-PEAK`, `plan_tier: starter`, `monthly_lead_count: 49`, `plan_limit: 50` |
| **Expected local handling** | Flag near-limit warning in local review; document hybrid pricing/lead volume guardrail; require operator awareness before next intake |
| **Review/escalation owner** | Roofer → Jason if plan upgrade discussion needed |
| **Blocked actions** | Auto-upgrade billing; payment capture; over-limit auto-accept without review |
| **Verifier expectation** | Assert near-limit state in fixture; billing_payment_automation_allowed false preserved |

---

### Edge Case 15: Unsupported quote/estimate/payment request

**Category:** unsupported quote/estimate/payment request

| Field | Value |
| --- | --- |
| **Fake input example** | `lead_id: FAKE-EDGE-015`, `name: "Riley Fox"`, `request_type: instant_quote`, `message: "send me a price right now"` |
| **Expected local handling** | Block unsupported automation path; route to roofer human review; document polite hold response template for operator use |
| **Review/escalation owner** | Roofer |
| **Blocked actions** | Instant quote; instant estimate; payment/deposit/invoice automation |
| **Verifier expectation** | Assert blocked path documented; billing_payment_automation_allowed false; no quote/estimate automation activated |

---

## 3. Safety Posture

| Field | Value |
| --- | --- |
| source_of_truth_commit | 5ef9ef5 |
| demo_roofer_name | Summit Peak Roofing Demo LLC |
| demo_roofer_is_fake | true |
| p2_edge_case_categories_count | 15 |
| scenario_count | 25 |
| expected_outcome_count | 25 |
| matched_outcome_count | 25 |
| missing_outcome_count | 0 |
| unexpected_outcome_count | 0 |
| p0_blockers_count | 0 |
| expected_outcome_count | 25 |
| matched_outcome_count | 25 |
| missing_outcome_count | 0 |
| unexpected_outcome_count | 0 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| safety_status | demo_ready_with_live_automation_disabled |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| current_recommended_next_step | CONTINUE_LOCAL_REFINEMENT_OR_HOLD_FOR_REVIEW |
| standing_local_build_approval_recorded | true |
| standing_local_build_approval_scope | local-only fake-data read-only dry-run review-only larger batches |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |
| public_website_go_live_copy_changed | false |

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.

No new live routes/services/dispatch behavior.