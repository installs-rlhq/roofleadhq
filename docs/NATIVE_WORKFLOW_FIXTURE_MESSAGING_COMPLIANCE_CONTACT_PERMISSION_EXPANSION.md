# Native Workflow Fixture Messaging Compliance / Contact Permission Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data messaging compliance and contact permission coverage so RoofLeadHQ can safely distinguish leads who contacted the roofer or gave permission from leads that must be held, reviewed, or blocked.

It deepens the local fixture messaging compliance layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only messaging compliance / contact permission expansion
- fake data only
- deterministic contact permission summaries and items
- explicit permission status tracking (`permission_confirmed`, `contacted_business`, `permission_unknown`, `permission_missing`, `permission_denied`, `do_not_contact`, `needs_review`)
- channel eligibility boundaries (SMS, email, call)
- do-not-contact and messaging hold/review routing
- roofer vs RoofLeadHQ review ownership for permission issues
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production messaging compliance engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live SMS, email, or calls.
- This does **not** send customer notifications.
- This does **not** change public website/pricing/legal/privacy/terms copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that contact permission decision rules, channel eligibility boundaries, hold/review routing, review ownership boundaries, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MISSED_LEAD_RECOVERY_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_USAGE_VOLUME_PLAN_LIMIT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_MESSAGING_COMPLIANCE_CONTACT_PERMISSION_EXPANSION.md`
- `scripts/run-native-workflow-fixture-messaging-compliance-contact-permission-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `f4ae6c9 test(workflow): expand native workflow fixture source ROI`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `messaging_compliance_expansion_summary`, `contact_permission_items`
- `contact_permission_status_summary`, `do_not_contact_summary`
- `channel_eligibility_summary`, `consent_source_summary`
- `messaging_hold_summary`, `messaging_review_summary`
- `messaging_compliance_reporting_summary`, `messaging_compliance_safety_assertions`
- per-scenario `contact_permission_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, post-inspection fields, feedback permission fields, manual outreach fields, missed lead recovery fields, usage volume fields, lead source attribution fields, and existing output fields remain intact.

## 3. Fake-Data / Local-Only Boundary

- local fixture-only dry-run implementation
- local fake-data dry-run only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- **no Supabase** reads or writes
- **no schema** changes
- **no migrations**
- **no auth/RLS** changes
- **no production data**
- **no live automation**
- **no integrations**
- **no external calls**
- **no live SMS**
- **no live email**
- **no live calls**
- **no customer notifications**
- **no CRM sync**
- **no live CSV delivery**
- **no billing/payment/deposit/invoice/estimate/quote automation**
- **no public website/pricing/legal/privacy/terms publication changes**

## 4. Contact Permission Model

Follow-up is allowed in fixture logic only when the homeowner contacted the business or gave permission to be contacted.

Supported permission statuses:

- `permission_confirmed` — explicit consent documented at intake
- `contacted_business` — homeowner initiated contact (call, form, attendance)
- `permission_unknown` — permission not documented; routes to HOLD or review
- `permission_missing` — no permission evidence; routes to HOLD or review
- `permission_denied` — homeowner denied further contact; blocks outreach
- `do_not_contact` — homeowner opted out; blocks all outreach
- `needs_review` — compliance-state mismatch or system-quality issue; routes to HOLD or review

Contact permission rules:

- Unknown permission must route to HOLD or review.
- Missing permission must route to HOLD or review.
- Permission denied must block outreach.
- Do-not-contact must block all outreach.
- Missing homeowner phone should block SMS and calls.
- Missing homeowner email should block email.
- Missing usable contact data should route to MISSING_INFO or HOLD.
- Any contact permission uncertainty must fail closed.
- No live SMS/email/call should ever be sent.

## 5. Channel Eligibility Model

Channel eligibility is derived from permission status and homeowner contact data:

- SMS and call require `homeowner_phone_present` and permission that allows outreach.
- Email requires `homeowner_email_present` and permission that allows outreach.
- Do-not-contact, permission denied, and permission uncertainty block all channels.
- `messaging_allowed_in_fixture` is true only when permission allows outreach, hold is not required, and at least one channel is eligible.

Every contact permission item preserves:

- `live_sms_allowed: no`
- `live_email_allowed: no`
- `live_call_allowed: no`
- `notification_sent: no`
- `production_data_touched: no`
- `external_services_called: no`

## 6. Messaging Compliance Review Ownership

Roofer review is needed when the roofer must clarify whether a lead source has valid permission (e.g., referral intake, high-volume source, multi-location source).

RoofLeadHQ/Jason review is limited to system/workflow/data/routing/quality issues such as:

- bad permission capture
- unclear source mapping
- broken routing
- compliance-state mismatch
- duplicate lead routing confusion

RoofLeadHQ does not receive business judgment routing as if RoofLeadHQ is the roofer.

## 7. Required Contact Permission Item Fields

Each `contact_permission_item` includes:

- `contact_permission_item_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`, `lead_source`
- `homeowner_phone_present`, `homeowner_email_present`, `homeowner_contact_ready`
- `contact_permission_status`, `contact_permission_source`, `permission_evidence`
- `homeowner_contacted_business`, `homeowner_gave_permission`
- `do_not_contact_status`
- `sms_eligible`, `email_eligible`, `call_eligible`, `channel_eligibility_reason`
- `messaging_allowed_in_fixture`, `messaging_hold_required`, `messaging_hold_reason`
- `roofer_review_required`, `roofleadhq_review_required`, `review_reason`, `required_manual_next_step`
- `audit_event_id`
- `live_sms_allowed`, `live_email_allowed`, `live_call_allowed`
- `notification_sent`, `production_data_touched`, `external_services_called`

## 8. Safety Assertions

Required safety assertions include:

- `messaging_compliance_expansion_summary_present`
- `contact_permission_items_present`
- `contact_permission_item_required_fields_present`
- `permission_confirmed_allows_fixture_messaging_only`
- `contacted_business_allows_fixture_messaging_only`
- `permission_unknown_routes_to_hold_or_review`
- `permission_missing_routes_to_hold_or_review`
- `permission_denied_blocks_outreach`
- `do_not_contact_blocks_all_outreach`
- `missing_phone_blocks_sms_and_call`
- `missing_email_blocks_email`
- `missing_usable_contact_data_routes_to_missing_info_or_hold`
- `permission_uncertainty_fails_closed`
- `roofer_review_required_for_permission_source_clarification`
- `roofleadhq_review_limited_to_system_quality_permission_issues`
- `live_sms_allowed_is_no_for_all_items`
- `live_email_allowed_is_no_for_all_items`
- `live_call_allowed_is_no_for_all_items`
- `notification_sent_is_no_for_all_items`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `no_twilio_calls`, `no_vapi_calls`, `no_resend_calls`
- `no_lindy_live_workflow_execution`, `no_google_calendar_calls`
- `messaging_compliance_decisions_are_audited`
- `reporting_summary_includes_messaging_compliance`
- `public_terms_or_compliance_copy_not_changed_without_approval`

The verifier fails closed if required fields, required scenarios, ownership boundaries, channel eligibility boundaries, or safety assertions are missing.

## 9. Verification Commands

Dry-run wrapper:

```bash
bash scripts/run-native-workflow-fixture-messaging-compliance-contact-permission-expansion-dry-run.sh
```

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js
```

## 10. First Paid Roofer Relationship

This packet supports first paid roofer dry-run onboarding by providing deterministic fake-data evidence that contact permission tracking, channel eligibility, hold/review routing, and messaging compliance boundaries are explicit before any live SMS, email, call, or notification integration work.