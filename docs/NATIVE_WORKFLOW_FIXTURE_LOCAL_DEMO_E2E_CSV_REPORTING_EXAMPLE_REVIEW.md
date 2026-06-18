# Native Workflow Fixture Local Demo E2E CSV/Reporting Example Review

## 1. Purpose and Scope

**Source-of-truth commit:** `5ef9ef5` — `test(workflow): add local demo e2e p1 polish batch`

**Purpose:** Review fake-data CSV/reporting examples for operator clarity. CSV/reporting remains one-directional reporting/reference, not CRM sync.

### What this packet is

- **fake-data only** CSV/reporting example review
- documentation-only reporting field review groups
- read-only verifier input
- fake-data/local-only/read-only/dry-run-only/review-only
- packet type is `local_demo_e2e_csv_reporting_example_review`
- p2_items_completed includes `local_csv_reporting_example_review_fake_data_only`
- packet_status is `review_only`
- csv_reporting_review_groups_count is `10`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation or sandbox/test-mode activation.
- **No live CSV delivery** — export remains local/reference only.
- **No external CRM sync** — RoofLeadHQ does not push data back to external CRMs.
- **No production export** — production_data_access_allowed false.
- This does **not** run the final activation command.

### CSV/reporting posture

CSV/reporting remains **one-directional reporting/reference, not CRM sync**. Roofer may manually download and import on their side; RoofLeadHQ does not implement two-way CRM integration.

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

- CSV export readiness: `docs/CSV_EXPORT_READINESS_PACKET.md`
- Structured P2 refinement fixture: `backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-p2-refinement-batch.json`

## 2. Review Field Groups (10)

All example rows use Summit Peak Roofing Demo LLC fake data. Sample fake lead: `FAKE-EDGE-001`, `Alex Morgan`, `alex.morgan.fake@example.test`.

---

### Group 1: Lead identity fields

| Field | Example value | Review note |
| --- | --- | --- |
| lead_id | FAKE-EDGE-001 | Fake ID prefix required; no production UUIDs |
| name | Alex Morgan | Fake name only |
| phone | 555-0101 | Fake 555 prefix; no real numbers |
| email | alex.morgan.fake@example.test | @example.test domain required |
| address | 742 Demo Ridge Ln, Summit CO | Fake address only |
| property_role | owner | Document owner/renter/unknown |

**Verifier expectation:** All identity fields use fake data; no production PII.

---

### Group 2: Contact permission fields

| Field | Example value | Review note |
| --- | --- | --- |
| sms_permission | false | Must reflect actual permission state |
| email_permission | true | Separate from SMS permission |
| call_permission | not_asked | Document if not collected |
| contact_method_preferred | email | Operator-reviewable preference |

**Verifier expectation:** Permission fields preserved; no assumption that phone = SMS consent.

---

### Group 3: Source attribution fields

| Field | Example value | Review note |
| --- | --- | --- |
| lead_source | google_ads | Or null for unknown-source edge case |
| utm_source | google | Fake UTM values only |
| utm_medium | cpc | |
| utm_campaign | summit-demo-spring | |
| referrer | unknown | Valid for FAKE-EDGE-013 |

**Verifier expectation:** Null source preserved for edge cases; no auto-assign ROI credit.

---

### Group 4: Appointment/inspection fields

| Field | Example value | Review note |
| --- | --- | --- |
| appointment_status | scheduled | Fake scheduling state |
| inspection_status | completed | Post-inspection scenarios |
| service_area_match | true | false for out-of-area edge case |
| reschedule_count | 0 | Track repeated reschedules |
| no_show_count | 0 | Track repeated no-shows |

**Verifier expectation:** Appointment fields reflect fake states; no live calendar sync.

---

### Group 5: Review queue/escalation fields

| Field | Example value | Review note |
| --- | --- | --- |
| review_queue_status | held | held / cleared / escalated |
| review_reason | duplicate_candidate | Maps to edge-case categories |
| escalation_owner | Roofer | Roofer-first human escalation |
| escalation_level | roofer_judgment | Or roofleadhq_system_review |

**Verifier expectation:** Review queue fields documented; human escalation required.

---

### Group 6: Post-inspection fields

| Field | Example value | Review note |
| --- | --- | --- |
| post_inspection_status | estimate_pending | No auto-send |
| days_since_inspection | 14 | Stalled follow-up edge case |
| estimate_sent | false | Manual operator action only |
| inspection_notes | shingle damage north slope | Fake notes only |

**Verifier expectation:** Post-inspection fields present; billing_payment_automation_allowed false.

---

### Group 7: Feedback permission fields

| Field | Example value | Review note |
| --- | --- | --- |
| permission_to_use_publicly | not_asked | **yes / no / not_asked** enum preserved |
| feedback_text | great service | Fake feedback only |
| feedback_captured_at | 2026-06-01T10:00:00Z | Fake timestamp |
| public_use_approved | false | Requires explicit yes permission |

**Verifier expectation:** permission_to_use_publicly yes/no/not_asked preserved. No public use without explicit yes.

---

### Group 8: Source ROI fields

| Field | Example value | Review note |
| --- | --- | --- |
| source_conversion_rate | 0.12 | Fake metric for demo |
| source_lead_count | 8 | Per-source fake count |
| source_cost_per_lead | null | No real marketing spend |
| roi_status | tracking | Or unknown for null-source leads |

**Verifier expectation:** ROI fields use fake metrics; no production analytics integration.

---

### Group 9: Usage/plan fields

| Field | Example value | Review note |
| --- | --- | --- |
| plan_tier | starter | Fake plan for Summit Peak Roofing Demo LLC |
| monthly_lead_count | 49 | Near-limit edge case |
| plan_limit | 50 | Hybrid pricing guardrail |
| near_limit_warning | true | Operator awareness flag |

**Verifier expectation:** Plan fields reflect fake usage; no auto-upgrade billing.

---

### Group 10: Safety/status fields

| Field | Example value | Review note |
| --- | --- | --- |
| safety_status | demo_ready_with_live_automation_disabled | Must appear in reporting context |
| activation_approval_status | not_granted | Never show as granted in fake export |
| live_activation_allowed | false | |
| data_classification | fake_demo_data_only | Required label on all exports |
| export_mode | local_reference_only | Not live_delivery |

**Verifier expectation:** Safety fields present; no live CSV delivery, no external CRM sync, no production export.

---

## 3. Example Fake-Data CSV Row

```csv
lead_id,name,phone,email,lead_source,sms_permission,permission_to_use_publicly,review_queue_status,appointment_status,post_inspection_status,safety_status,data_classification
FAKE-EDGE-001,Alex Morgan,555-0101,alex.morgan.fake@example.test,google_ads,false,not_asked,held,new,null,demo_ready_with_live_automation_disabled,fake_demo_data_only
FAKE-EDGE-012,Jordan Ellis,555-0112,jordan.ellis.fake@example.test,referral,true,not_asked,cleared,scheduled,estimate_pending,demo_ready_with_live_automation_disabled,fake_demo_data_only
```

## 4. Boundaries

| Boundary | Status |
| --- | --- |
| CSV/reporting is one-directional reporting/reference, not CRM sync | Enforced |
| permission_to_use_publicly yes/no/not_asked preserved | Enforced |
| No live CSV delivery | Enforced |
| No external CRM sync | Enforced |
| No production export | Enforced |
| billing_payment_automation_allowed | false |
| production_data_access_allowed | false |

## 5. Safety Posture

| Field | Value |
| --- | --- |
| source_of_truth_commit | 5ef9ef5 |
| csv_reporting_review_groups_count | 10 |
| demo_roofer_name | Summit Peak Roofing Demo LLC |
| demo_roofer_is_fake | true |
| scenario_count | 25 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| safety_status | demo_ready_with_live_automation_disabled |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| live_activation_allowed | false |
| external_calls_allowed | false |
| production_data_access_allowed | false |
| billing_payment_automation_allowed | false |
| current_recommended_next_step | CONTINUE_LOCAL_REFINEMENT_OR_HOLD_FOR_REVIEW |
| standing_local_build_approval_recorded | true |
| standing_local_build_approval_scope | local-only fake-data read-only dry-run review-only larger batches |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |
| public_website_go_live_copy_changed | false |

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.