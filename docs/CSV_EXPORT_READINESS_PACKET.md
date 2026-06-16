# CSV Export Readiness Packet

Date: 2026-06-16

Canonical source of truth before this worktree: `ae709cb test(pilot): add Lindy bridge native workflow migration plan`

This packet defines RoofLeadHQ’s native reporting/export readiness path for CSV export. CSV/reporting is framed as part of RoofLeadHQ’s native reporting/export readiness — ultimately owned by RoofLeadHQ backend + Supabase source-of-truth workflow state. Lindy may temporarily assist as a low-volume bridge, but Lindy must not be the long-term reporting authority, export authority, source of truth, dashboard authority, or workflow brain.

**This is planning/readiness/placement only.**

Do **not** generate live CSV from production data.
Do **not** connect to a CRM.
Do not implement two-way CRM integration or sync.
Do **not** read production data.
Do **not** change customer data handling.
Do **not** activate backend live behavior.
Do **not** activate integrations.
Do **not** send externally.
Do **not** write production Supabase data.
Do **not** change auth/RLS/schema/security.
Do **not** change env/credentials.
Do **not** activate public routes.
Do **not** activate Lindy live behavior.

All work remains dry-run/internal-only/founder-operator-only. Read-only verifier only. Dry-run wrapper only.

This packet file: `docs/CSV_EXPORT_READINESS_PACKET.md`
Wrapper: `scripts/run-csv-export-readiness-dry-run.sh`
Verifier: `backend/scripts/verify-csv-export-readiness-readonly.js`
Wired into: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md` + aggregate pilot readiness verifier (`verify-first-paid-pilot-readiness-readonly.js`) + 3 `NEXT_CHAT_CONTEXT_PACKAGE_*.md` + `ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`

## Safety Posture

- planning/readiness/placement packet only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no live CSV generation from production data
- no CRM connection
- no two-way CRM integration
- no production data reads
- no customer data handling changes
- no backend live activation
- no integrations activated
- no external sends
- no production Supabase writes
- no auth/RLS/schema/security changes
- no env/credential changes
- no public route activation
- no Lindy live activation
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

## Connected Launch Packets

This packet connects:

- `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

## 1. CSV Purpose and Scope

The RoofLeadHQ CSV export is a **one-directional reporting and operational review artifact**. It supports:

- weekly/monthly RoofLeadHQ reporting
- lead source tracking and visibility
- inspection outcome visibility
- post-inspection follow-up tracking
- post-inspection feedback visibility
- manual CRM import or reference use (roofer downloads and imports on their side — RoofLeadHQ does not push back)
- operational review and business planning
- future native RoofLeadHQ/Supabase reporting readiness

### What the CSV is

- A one-directional data extract for reporting and review
- An operational review artifact for roofers and founder/operator planning
- A readiness definition for future native export from RoofLeadHQ/Supabase source-of-truth records after approved implementation

### What the CSV is not

- **Not** a two-way CRM integration or sync
- **Not** a production-data export feature yet
- **Not** a customer-facing live export activation
- Does not replace the roofer's CRM
- Does not push data back to RoofLeadHQ
- Does not auto-update when changes are made to the exported file
- Not owned long-term by Lindy
- Should ultimately be generated from RoofLeadHQ/Supabase source-of-truth records after approved implementation

Lindy may temporarily assist low-volume early workflows, but CSV/reporting authority belongs to RoofLeadHQ backend + Supabase over time.

## 2. Core Lead Fields

| Field | Description |
| --- | --- |
| `lead_id` | Unique lead identifier in RoofLeadHQ (future native record ID) |
| `report_period` | Reporting window (e.g. `2026-06-week-2`, `2026-06`) |
| `lead_created_date` | Date lead entered RoofLeadHQ workflow |
| `homeowner_name` | Homeowner full name |
| `homeowner_phone` | Homeowner phone |
| `homeowner_email` | Homeowner email (if provided) |
| `service_address` | Service/street address |
| `city` | City |
| `state` | State |
| `service_area` | Roofer service area label |
| `lead_source` | Primary lead source (e.g. Google Ads, Website Form, Referral) |
| `lead_source_detail` | Additional source detail |
| `campaign_or_ad_source_if_known` | Campaign or ad source when known (Elite/Custom tier) |
| `lead_type` | Lead type (e.g. repair, replacement, inspection request) |
| `urgency` | Urgency indicator if captured |
| `roofing_issue_summary` | Brief issue summary |
| `insurance_claim_status_if_provided` | Insurance claim status if homeowner provided |
| `photos_available` | Whether photos are available (status field only — future/optional) |
| `photos_received` | Whether photos were received (status field only — future/optional) |

## 3. Response and Follow-Up Fields

| Field | Description |
| --- | --- |
| `first_response_sent` | Whether first response was sent (yes/no) |
| `first_response_time_minutes` | Minutes from lead creation to first response |
| `follow_up_count` | Number of follow-up touches |
| `last_follow_up_date` | Date of most recent follow-up |
| `last_contact_channel` | Last channel used (SMS, call, email, manual) |
| `current_lead_status` | Current workflow status |
| `missed_lead_recovery_used` | Whether missed-lead recovery path was used |
| `manual_outreach_used` | Whether manual outreach was used |
| `homeowner_replied` | Whether homeowner replied (yes/no/unknown) |
| `roofer_review_needed` | Whether roofer review is needed |
| `roofleadhq_review_needed` | Whether RoofLeadHQ/founder review is needed (system-quality only) |
| `review_reason` | Reason for review flag |

## 4. Appointment / Inspection Fields

| Field | Description |
| --- | --- |
| `appointment_booked` | Whether a homeowner inspection was booked (yes/no) |
| `appointment_date` | Booked inspection date |
| `appointment_time` | Booked inspection time |
| `appointment_status` | Appointment status (booked, completed, missed, rescheduled, issue) |
| `appointment_readiness_status` | Appointment readiness stage |
| `calendar_owner` | Roofer-owned calendar label (e.g. Main Sales Calendar, Acme Roofing Calendar) |
| `assigned_roofer_or_rep` | Assigned roofer or rep name |
| `inspection_completed` | Whether inspection was completed (yes/no/unknown) |
| `missed_or_rescheduled` | Whether appointment was missed or rescheduled |
| `appointment_issue` | Appointment issue flag or summary |
| `appointment_notes` | Appointment coordination notes |

## 5. Post-Inspection Follow-Up Fields

| Field | Description |
| --- | --- |
| `estimate_needed` | Whether estimate or next step is needed |
| `estimate_sent` | Whether estimate was sent (roofer-marked) |
| `homeowner_follow_up_needed` | Homeowner-side follow-up still open |
| `roofer_follow_up_needed` | Roofer-side follow-up still open |
| `post_inspection_status` | Post-inspection workflow status |
| `outcome` | Outcome label (won, lost, still_open, needs_review) |
| `outcome_date` | Date outcome was recorded |
| `still_open_days` | Days lead has been still open |
| `needs_review_age_hours` | Hours in needs-review state |
| `next_step_owner` | Owner of next step (roofer, homeowner, founder-operator) |
| `next_step_due_date` | Due date for next step |
| `next_step_notes` | Next step notes |

## 6. Feedback Capture Fields

| Field | Description |
| --- | --- |
| `feedback_requested` | Whether feedback was requested |
| `feedback_captured` | Whether feedback was captured |
| `roofer_showed_up_as_expected` | Homeowner response: roofer showed up as expected |
| `roofer_helpful_professional` | Homeowner response: roofer helpful and professional |
| `homeowner_wants_follow_up` | Homeowner wants roofer follow-up |
| `feedback_summary` | Internal feedback summary |
| `testimonial_candidate` | Whether lead is a testimonial candidate (internal) |
| `permission_to_use_publicly` | Permission to use feedback publicly: **yes**, **no**, or **not_asked** |
| `feedback_issue_flag` | Internal flag for feedback-related issue |

### `permission_to_use_publicly` values

Use exactly:

- `yes`
- `no`
- `not_asked`

Feedback is internal unless permission is obtained. Do not use alternate spellings or concatenated field names for this permission field.

## 7. Reporting / Source ROI Fields

| Field | Description |
| --- | --- |
| `lead_source_total_count` | Total leads from source in report period |
| `booked_inspection_from_source` | Booked inspections attributed to source |
| `inspection_completed_from_source` | Completed inspections from source |
| `won_from_source` | Won outcomes from source (roofer-defined) |
| `lost_from_source` | Lost outcomes from source |
| `still_open_from_source` | Still-open leads from source |
| `source_conversion_notes` | Notes on source conversion patterns |
| `ad_spend_if_provided` | Ad spend if customer provided |
| `cost_per_lead_if_provided` | Cost per lead if customer provided spend data |
| `cost_per_booked_inspection_if_provided` | Cost per booked inspection if customer provided spend data |
| `roi_notes` | ROI analysis notes |

**ROI dependency:** ROI fields depend on customer-provided spend and source data. Do not promise exact ROI unless the customer provides accurate spend/source data. RoofLeadHQ reports what is captured; roofer-supplied spend figures drive cost-per-lead and ROI calculations.

## 8. Plan-Tier Availability

Plan-tier field availability should eventually be controlled by the native workflow engine's plan configuration/profile logic, not separate workflow engines per tier.

### Starter

- core lead fields
- basic response/follow-up fields
- basic appointment booked status
- basic weekly/monthly summary CSV

### Growth

- missed lead recovery tracking
- lead source tracking
- appointment status/issues
- calendar owner tracking
- post-inspection follow-up fields
- post-inspection feedback capture
- detailed CSV export

### Elite

- campaign/ad source
- source conversion fields
- testimonial_candidate
- permission_to_use_publicly
- deeper source segmentation
- advanced reporting
- larger review queue capacity
- more detailed CSV export

### Custom

- 500+ leads/month
- multi-location
- multiple calendars/phone numbers
- complex routing
- advanced reporting
- ad spend / cost per lead / ROI fields
- custom reporting fields

## 9. Example Header Row

Clean snake_case header row (all defined fields):

```
lead_id,report_period,lead_created_date,homeowner_name,homeowner_phone,homeowner_email,service_address,city,state,service_area,lead_source,lead_source_detail,campaign_or_ad_source_if_known,lead_type,urgency,roofing_issue_summary,insurance_claim_status_if_provided,photos_available,photos_received,first_response_sent,first_response_time_minutes,follow_up_count,last_follow_up_date,last_contact_channel,current_lead_status,missed_lead_recovery_used,manual_outreach_used,homeowner_replied,roofer_review_needed,roofleadhq_review_needed,review_reason,appointment_booked,appointment_date,appointment_time,appointment_status,appointment_readiness_status,calendar_owner,assigned_roofer_or_rep,inspection_completed,missed_or_rescheduled,appointment_issue,appointment_notes,estimate_needed,estimate_sent,homeowner_follow_up_needed,roofer_follow_up_needed,post_inspection_status,outcome,outcome_date,still_open_days,needs_review_age_hours,next_step_owner,next_step_due_date,next_step_notes,feedback_requested,feedback_captured,roofer_showed_up_as_expected,roofer_helpful_professional,homeowner_wants_follow_up,feedback_summary,testimonial_candidate,permission_to_use_publicly,feedback_issue_flag,lead_source_total_count,booked_inspection_from_source,inspection_completed_from_source,won_from_source,lost_from_source,still_open_from_source,source_conversion_notes,ad_spend_if_provided,cost_per_lead_if_provided,cost_per_booked_inspection_if_provided,roi_notes
```

## 10. Example Sample Row

**Fictional data only.** No production data. No real homeowner PII from production systems.

```
RLHQ-SAMPLE-00042,2026-06-week-2,2026-06-10,Jordan Ellis,555-010-2244,jordan.ellis.sample@example-mail.test,742 Oak Ridge Lane,Austin,TX,Greater Austin Metro,Google Ads,Search - Roof Repair Q2,Brand Search - Roof Inspection,repair,medium,Wind damage to shingles reported after recent storm,not_provided,no,no,yes,18,3,2026-06-12,sms,inspection_booked,yes,no,yes,no,no,,yes,2026-06-14,10:00 AM,booked,ready_for_inspection,Main Sales Calendar,Sam Rivera,yes,no,,Homeowner confirmed access via side gate,yes,no,no,no,estimate_needed,still_open,,4,,roofer,2026-06-17,Send estimate follow-up draft for roofer review,yes,yes,yes,yes,yes,Helpful and on time for inspection,not_asked,not_asked,no,12,4,3,1,0,3,Strong Google Ads conversion to booked inspections this week,,,,"ROI notes pending customer-provided ad spend data"
```

Note: `calendar_owner` uses **Main Sales Calendar** (roofer-owned calendar label). Do not use founder-operator calendar identifiers in sample exports.

## 11. Data Handling Notes

- CSV exports may contain homeowner personal information (name, phone, email, address).
- The roofer/customer is responsible for downloaded/exported data handling, storage, retention, and compliance after download.
- CSV export does not replace the roofer's CRM — it is a reporting extract for review and optional manual import.
- Data accuracy depends on lead source data and customer-provided information.
- Feedback is **internal unless permission is obtained** (`permission_to_use_publicly` = yes).
- Photos are **future/optional** and should only be status fields for now (`photos_available`, `photos_received`).
- **No production data** should be used in sample exports or readiness rehearsals.
- Exported data should be generated only from **approved native records** after implementation.
- **Lindy should not be the long-term CSV/reporting source of truth** — native RoofLeadHQ/Supabase records own reporting long term.

## 12. Safety and Positioning Boundaries

### Forbidden public language

Do not use in customer-facing copy, sales materials, or export descriptions. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | language that implies booking or closing roofing jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or guaranteed job counts |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| CRM overreach | two-way CRM integration claims or language implying RoofLeadHQ replaces or syncs bidirectionally with the roofer’s CRM |
| Review manipulation | fabricated endorsements, pressured public praise campaigns, incentivized positive feedback, or unattended public review publishing |

### Preferred language

Use in CSV export readiness and reporting materials:

- booked inspections
- booked homeowner appointments
- lead-to-inspection
- missed-lead recovery
- automatic follow-up
- appointment readiness
- booked inspection tracking
- post-inspection follow-up
- post-inspection feedback capture
- weekly/monthly reporting
- CSV export
- roofer review
- contractor review
- guided setup
- native reporting readiness
- Supabase source of truth

## 13. Lindy Bridge / Native Workflow Relationship

### Temporary Lindy bridge role

- Existing Lindy workflows may temporarily assist low-volume early workflows.
- Lindy can help with light bridge operations while native workflow logic is built.
- Lindy should not own CSV/reporting long term.

### Native reporting direction

- CSV export should be prepared for **eventual native generation from RoofLeadHQ/Supabase records**.
- The **Lindy Bridge + Native Workflow Migration Plan** (`docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`) is the migration context for this readiness packet.
- CSV readiness supports the **native workflow engine migration** by defining reporting/export fields before live implementation.
- Reporting, dashboard data, and CSV export authority migrate to RoofLeadHQ backend + Supabase source-of-truth workflow state per the migration plan.

### Implementation hold

No live CSV generation, no production data reads, and no Lindy live activation occur from this packet. Jason must explicitly approve any future live export implementation.

## Verification Commands

```bash
node --check backend/scripts/verify-csv-export-readiness-readonly.js
node backend/scripts/verify-csv-export-readiness-readonly.js
bash scripts/run-csv-export-readiness-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
scripts/verify-safe-readiness.sh
npm --prefix backend run build
git diff --check
git status --short
git log --oneline -5
```

Does not perform production Supabase writes. Does not change env/credentials. Does not change auth/RLS/schema/security. Does not activate external sends, public routes, cron, scheduler, or dispatcher.