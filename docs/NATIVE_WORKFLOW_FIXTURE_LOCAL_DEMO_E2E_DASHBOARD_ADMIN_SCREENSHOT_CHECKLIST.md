# Native Workflow Fixture Local Demo E2E Dashboard/Admin Screenshot Checklist

## 1. Purpose and Scope

**Source-of-truth commit:** `5ef9ef5` — `test(workflow): add local demo e2e p1 polish batch`

**Purpose:** Documentation-only checklist for local dashboard/admin screenshot review. Use this checklist during fake-data review sessions to confirm operator-facing UI clarity without accessing production data.

### What this packet is

- **documentation-only checklist unless existing files are present** — no new screenshot assets required unless local files already exist
- local-only review checklist for dashboard/admin views
- read-only verifier input
- fake-data/local-only/read-only/dry-run-only/review-only
- packet type is `local_demo_e2e_dashboard_admin_screenshot_checklist`
- p2_items_completed includes `local_dashboard_admin_screenshot_checklist_documentation_only`
- packet_status is `review_only`
- dashboard_admin_checklist_items_count is `11`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation or sandbox/test-mode activation.
- This does **not** require production dashboard access.
- This does **not** change public website, go-live, or production copy.
- This does **not** run the final activation command.

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

- Website demo screenshot assets: `docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md` (if present)
- Structured P2 refinement fixture: `backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-p2-refinement-batch.json`

**No-production-data reminder:** All screenshot review must use Summit Peak Roofing Demo LLC fake data only. Never capture or reference real homeowner PII, production roofer accounts, or live service activity.

## 2. Dashboard/Admin Screenshot Checklist (11 items)

---

### Checklist Item 1: Dashboard lead list

| Field | Value |
| --- | --- |
| **What to look for** | Lead list shows fake Summit Peak Roofing Demo LLC leads with clear status badges, source labels, and contact permission indicators. List is sortable/filterable without exposing real PII. |
| **Fake-data requirement** | All visible leads must be fake demo leads (e.g., FAKE-EDGE-001 through FAKE-EDGE-015). Demo roofer name: Summit Peak Roofing Demo LLC. |
| **Concern flag** | Real homeowner names, real phone numbers, or production roofer data visible |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/dashboard-lead-list-fake-data.png` |
| **No-production-data reminder** | Do not screenshot production lead lists. Use local fake-data fixtures only. |

---

### Checklist Item 2: Lead detail

| Field | Value |
| --- | --- |
| **What to look for** | Lead detail view shows fake contact info, roof issue summary, source attribution, contact permission fields, and review queue status. No live send buttons active. |
| **Fake-data requirement** | Lead detail must reference fake lead IDs and @example.test email addresses only. |
| **Concern flag** | Live SMS/email send buttons enabled; real contact data displayed |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/lead-detail-fake-data.png` |
| **No-production-data reminder** | Never capture production lead detail views. |

---

### Checklist Item 3: Review queue

| Field | Value |
| --- | --- |
| **What to look for** | Review queue shows held fake leads with clear reason codes (duplicate, missing contact, ambiguous issue, etc.). Operator can see escalation owner assignment. |
| **Fake-data requirement** | Queue entries must map to documented edge-case categories from fake-data expansion doc. |
| **Concern flag** | Auto-resolved items without human review indicator; real leads in queue |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/review-queue-fake-data.png` |
| **No-production-data reminder** | Review queue screenshots must use fake-data review states only. |

---

### Checklist Item 4: Appointment readiness

| Field | Value |
| --- | --- |
| **What to look for** | Appointment readiness panel shows fake lead appointment state, contact permission check, and service-area match. Calendar sync remains disabled. |
| **Fake-data requirement** | Appointment data must reference fake scheduling states (scheduled, reschedule_requested, no_show). |
| **Concern flag** | Live calendar integration active; real appointment data |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/appointment-readiness-fake-data.png` |
| **No-production-data reminder** | No production calendar or real homeowner appointment data. |

---

### Checklist Item 5: Missed lead recovery

| Field | Value |
| --- | --- |
| **What to look for** | Missed lead recovery section shows fake no-show and missed-contact leads with recovery status and roofer escalation path. No automated outbound messaging active. |
| **Fake-data requirement** | Recovery entries must use fake leads with documented no_show_count or missed-contact states. |
| **Concern flag** | Live recovery SMS/email sends enabled; real missed leads |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/missed-lead-recovery-fake-data.png` |
| **No-production-data reminder** | Recovery screenshots must not include real homeowner contact attempts. |

---

### Checklist Item 6: Post-inspection follow-up

| Field | Value |
| --- | --- |
| **What to look for** | Post-inspection panel shows fake inspection completion state, estimate-pending status, and follow-up timeline. No auto-send estimate or payment buttons. |
| **Fake-data requirement** | Post-inspection data must reference fake inspection_status and post_inspection_status fields. |
| **Concern flag** | Auto-estimate send active; payment/deposit automation visible |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/post-inspection-follow-up-fake-data.png` |
| **No-production-data reminder** | No real inspection outcomes or production estimate data. |

---

### Checklist Item 7: Feedback permission

| Field | Value |
| --- | --- |
| **What to look for** | Feedback permission panel shows `permission_to_use_publicly` as yes/no/not_asked. Unclear permissions held for operator review. No public testimonial publish path. |
| **Fake-data requirement** | Feedback examples must use fake homeowner names and preserve yes/no/not_asked enum. |
| **Concern flag** | Public testimonial auto-publish enabled; permission_to_use_publicly field missing |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/feedback-permission-fake-data.png` |
| **No-production-data reminder** | Never screenshot real homeowner feedback or testimonials. |

---

### Checklist Item 8: Reporting/CSV

| Field | Value |
| --- | --- |
| **What to look for** | Reporting section shows fake-data CSV preview or export reference. Export remains local/reference only. No live CSV delivery or CRM sync buttons. |
| **Fake-data requirement** | CSV preview must show fake lead rows with @example.test emails and FAKE lead IDs. |
| **Concern flag** | Live CSV delivery enabled; CRM sync button visible; production export path |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/reporting-csv-fake-data.png` |
| **No-production-data reminder** | No production CSV exports. One-directional reporting/reference only. |

---

### Checklist Item 9: Source ROI

| Field | Value |
| --- | --- |
| **What to look for** | Source ROI panel shows fake lead source attribution, conversion metrics, and unknown-source flags. No auto-assign ROI credit. |
| **Fake-data requirement** | Source data must include fake UTM values and null-source edge cases. |
| **Concern flag** | Real marketing spend data; production analytics integration |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/source-roi-fake-data.png` |
| **No-production-data reminder** | Source ROI screenshots must use fake attribution data only. |

---

### Checklist Item 10: Usage/plan boundary

| Field | Value |
| --- | --- |
| **What to look for** | Usage/plan panel shows fake plan tier, monthly lead count, and near-limit warning. No auto-upgrade billing or payment capture. |
| **Fake-data requirement** | Plan data must reference fake Summit Peak Roofing Demo LLC plan state (e.g., 49/50 leads). |
| **Concern flag** | Live billing integration; auto-upgrade without review |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/usage-plan-boundary-fake-data.png` |
| **No-production-data reminder** | No real billing or subscription data in screenshots. |

---

### Checklist Item 11: Safety/status banner

| Field | Value |
| --- | --- |
| **What to look for** | Safety/status banner shows `demo_ready_with_live_automation_disabled`, activation blocked posture, and clear local-only/fake-data mode indicator. |
| **Fake-data requirement** | Banner must reflect review-only mode with activation_approval_status not_granted. |
| **Concern flag** | "Live mode" or "Production" indicator; activation approval shown as granted |
| **Screenshot filename placeholder** | `screenshots/local-demo-e2e/safety-status-banner-fake-data.png` |
| **No-production-data reminder** | Banner must not imply live readiness or production activation approval. |

---

## 3. Safety Posture

| Field | Value |
| --- | --- |
| source_of_truth_commit | 5ef9ef5 |
| documentation_only_unless_existing_files_present | true |
| dashboard_admin_checklist_items_count | 11 |
| demo_roofer_name | Summit Peak Roofing Demo LLC |
| demo_roofer_is_fake | true |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| safety_status | demo_ready_with_live_automation_disabled |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| public_go_live_or_production_copy_changes_allowed | false |
| public_website_go_live_copy_changed | false |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.