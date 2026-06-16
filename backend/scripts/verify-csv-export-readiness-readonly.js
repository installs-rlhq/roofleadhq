#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");

function read(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${p}`);
  return fs.readFileSync(full, "utf8");
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) throw new Error(`${label} missing: ${needle}`);
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) throw new Error(`${label} has unsafe text: ${needle}`);
}

function assertSectionWithContent(doc, sectionHeading, requiredSubstrings, label) {
  if (!doc.includes(sectionHeading)) {
    throw new Error(`${label} missing required section: ${sectionHeading}`);
  }
  for (const s of requiredSubstrings) {
    if (!doc.includes(s)) {
      throw new Error(`${label} section ${sectionHeading} missing substantive content: ${s}`);
    }
  }
}

const docPath = "docs/CSV_EXPORT_READINESS_PACKET.md";
const wrapperPath = "scripts/run-csv-export-readiness-dry-run.sh";
const verifierPath = "backend/scripts/verify-csv-export-readiness-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const contextAgentGrokPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

// 1. Required packet doc exists
console.log("PASS: required packet doc exists.");

// 2. Dry-run wrapper exists
mustHave(wrapper, "#!/usr/bin/env bash", "dry-run wrapper");
console.log("PASS: dry-run wrapper exists.");

// 3. CSV purpose/scope is documented
assertSectionWithContent(doc, "## 1. CSV Purpose and Scope", [
  "weekly/monthly RoofLeadHQ reporting",
  "lead source tracking and visibility",
  "inspection outcome visibility",
  "post-inspection follow-up tracking",
  "post-inspection feedback visibility",
  "manual CRM import or reference use",
  "operational review and business planning",
  "future native RoofLeadHQ/Supabase reporting readiness",
], "packet doc");
console.log("PASS: CSV purpose/scope is documented.");

// 4. One-way export / not two-way CRM sync boundary is documented
mustHave(doc, "one-directional", "packet doc one-way export boundary");
mustHave(doc, "two-way CRM integration", "packet doc CRM sync boundary");
mustHave(doc, "Does not replace the roofer's CRM", "packet doc CRM boundary");
mustHave(doc, "Does not push data back to RoofLeadHQ", "packet doc one-way boundary");
console.log("PASS: one-way export / not two-way CRM sync boundary is documented.");

// 5. Not owned long-term by Lindy is documented
mustHave(doc, "Not owned long-term by Lindy", "packet doc Lindy ownership boundary");
mustHave(doc, "Lindy should not be the long-term CSV/reporting source of truth", "packet doc Lindy reporting boundary");
console.log("PASS: not owned long-term by Lindy is documented.");

// 6. Future native RoofLeadHQ/Supabase reporting readiness is documented
mustHave(doc, "RoofLeadHQ/Supabase source-of-truth records", "packet doc native reporting readiness");
mustHave(doc, "native reporting readiness", "packet doc native reporting readiness");
mustHave(doc, "Supabase source of truth", "packet doc Supabase source of truth");
console.log("PASS: future native RoofLeadHQ/Supabase reporting readiness is documented.");

// 7. Core lead fields are documented
const coreLeadFields = [
  "lead_id",
  "report_period",
  "lead_created_date",
  "homeowner_name",
  "homeowner_phone",
  "homeowner_email",
  "service_address",
  "city",
  "state",
  "service_area",
  "lead_source",
  "lead_source_detail",
  "campaign_or_ad_source_if_known",
  "lead_type",
  "urgency",
  "roofing_issue_summary",
  "insurance_claim_status_if_provided",
  "photos_available",
  "photos_received",
];
for (const f of coreLeadFields) {
  mustHave(doc, f, "packet doc core lead fields");
}
console.log("PASS: core lead fields are documented.");

// 8. Response/follow-up fields are documented
const responseFields = [
  "first_response_sent",
  "first_response_time_minutes",
  "follow_up_count",
  "last_follow_up_date",
  "last_contact_channel",
  "current_lead_status",
  "missed_lead_recovery_used",
  "manual_outreach_used",
  "homeowner_replied",
  "roofer_review_needed",
  "roofleadhq_review_needed",
  "review_reason",
];
for (const f of responseFields) {
  mustHave(doc, f, "packet doc response/follow-up fields");
}
console.log("PASS: response/follow-up fields are documented.");

// 9. Appointment/inspection fields are documented
const appointmentFields = [
  "appointment_booked",
  "appointment_date",
  "appointment_time",
  "appointment_status",
  "appointment_readiness_status",
  "calendar_owner",
  "assigned_roofer_or_rep",
  "inspection_completed",
  "missed_or_rescheduled",
  "appointment_issue",
  "appointment_notes",
];
for (const f of appointmentFields) {
  mustHave(doc, f, "packet doc appointment/inspection fields");
}
console.log("PASS: appointment/inspection fields are documented.");

// 10. Post-inspection fields are documented
const postInspectionFields = [
  "estimate_needed",
  "estimate_sent",
  "homeowner_follow_up_needed",
  "roofer_follow_up_needed",
  "post_inspection_status",
  "outcome",
  "outcome_date",
  "still_open_days",
  "needs_review_age_hours",
  "next_step_owner",
  "next_step_due_date",
  "next_step_notes",
];
for (const f of postInspectionFields) {
  mustHave(doc, f, "packet doc post-inspection fields");
}
console.log("PASS: post-inspection fields are documented.");

// 11. Feedback fields are documented
const feedbackFields = [
  "feedback_requested",
  "feedback_captured",
  "roofer_showed_up_as_expected",
  "roofer_helpful_professional",
  "homeowner_wants_follow_up",
  "feedback_summary",
  "testimonial_candidate",
  "permission_to_use_publicly",
  "feedback_issue_flag",
];
for (const f of feedbackFields) {
  mustHave(doc, f, "packet doc feedback fields");
}
console.log("PASS: feedback fields are documented.");

// 12. permission_to_use_publicly yes/no/not_asked is documented
mustHave(doc, "permission_to_use_publicly", "packet doc permission field");
mustHave(doc, "**yes**", "packet doc permission yes value");
mustHave(doc, "**no**", "packet doc permission no value");
mustHave(doc, "**not_asked**", "packet doc permission not_asked value");
console.log("PASS: permission_to_use_publicly yes/no/not_asked is documented.");

// 13. permissiontousepublicly is absent
mustNotHave(doc, "permissiontousepublicly", "packet doc");
console.log("PASS: permissiontousepublicly is absent.");

// 14. Source ROI fields are documented
const roiFields = [
  "lead_source_total_count",
  "booked_inspection_from_source",
  "inspection_completed_from_source",
  "won_from_source",
  "lost_from_source",
  "still_open_from_source",
  "source_conversion_notes",
  "ad_spend_if_provided",
  "cost_per_lead_if_provided",
  "cost_per_booked_inspection_if_provided",
  "roi_notes",
];
for (const f of roiFields) {
  mustHave(doc, f, "packet doc source ROI fields");
}
console.log("PASS: source ROI fields are documented.");

// 15. ROI dependency on customer-provided data is documented
mustHave(doc, "ROI fields depend on customer-provided spend and source data", "packet doc ROI dependency");
mustHave(doc, "Do not promise exact ROI unless the customer provides accurate spend/source data", "packet doc ROI dependency");
console.log("PASS: ROI dependency on customer-provided data is documented.");

// 16. Plan-tier availability is documented
mustHave(doc, "### Starter", "packet doc Starter tier");
mustHave(doc, "### Growth", "packet doc Growth tier");
mustHave(doc, "### Elite", "packet doc Elite tier");
mustHave(doc, "### Custom", "packet doc Custom tier");
mustHave(doc, "core lead fields", "packet doc Starter tier fields");
mustHave(doc, "missed lead recovery tracking", "packet doc Growth tier fields");
mustHave(doc, "campaign/ad source", "packet doc Elite tier fields");
mustHave(doc, "500+ leads/month", "packet doc Custom tier fields");
console.log("PASS: plan-tier availability is documented.");

// 17. Plan tiers as native configuration/profile logic is documented
mustHave(doc, "native workflow engine's plan configuration/profile logic", "packet doc native plan configuration");
mustHave(doc, "not separate workflow engines per tier", "packet doc native plan configuration");
console.log("PASS: plan tiers as native configuration/profile logic is documented.");

// 18. Example header row exists
mustHave(doc, "## 9. Example Header Row", "packet doc example header section");
mustHave(doc, "lead_id,report_period,lead_created_date", "packet doc example header row");
mustHave(doc, "permission_to_use_publicly,feedback_issue_flag", "packet doc example header row");
mustHave(doc, "roi_notes", "packet doc example header row");
console.log("PASS: example header row exists.");

// 19. Fictional sample row exists
mustHave(doc, "## 10. Example Sample Row", "packet doc example sample section");
mustHave(doc, "Fictional data only", "packet doc fictional sample boundary");
mustHave(doc, "RLHQ-SAMPLE-00042", "packet doc fictional sample row");
console.log("PASS: fictional sample row exists.");

// 20. Sample row does not use Jason-RLHQ as calendar_owner
mustNotHave(doc, "Jason-RLHQ", "packet doc sample row calendar_owner");
mustHave(doc, "Main Sales Calendar", "packet doc roofer-owned calendar example");
console.log("PASS: sample row does not use Jason-RLHQ as calendar_owner.");

// 21. Data handling notes are documented
assertSectionWithContent(doc, "## 11. Data Handling Notes", [
  "homeowner personal information",
  "roofer/customer is responsible",
  "does not replace the roofer's CRM",
  "Data accuracy depends on lead source data",
  "Feedback is internal unless permission is obtained",
  "photos_available",
  "photos_received",
  "No production data",
  "approved native records",
  "Lindy should not be the long-term CSV/reporting source of truth",
], "packet doc");
console.log("PASS: data handling notes are documented.");

// 22. Homeowner personal information warning is documented
mustHave(doc, "homeowner personal information", "packet doc homeowner PII warning");
console.log("PASS: homeowner personal information warning is documented.");

// 23. Customer responsibility for downloaded/exported data is documented
mustHave(doc, "roofer/customer is responsible", "packet doc customer data responsibility");
mustHave(doc, "downloaded/exported data handling", "packet doc customer data responsibility");
console.log("PASS: customer responsibility for downloaded/exported data is documented.");

// 24. Photos future/optional status-only boundary is documented
mustHave(doc, "Photos are **future/optional**", "packet doc photos boundary");
mustHave(doc, "status fields for now", "packet doc photos boundary");
console.log("PASS: photos future/optional status-only boundary is documented.");

// 25. Feedback internal unless permission obtained is documented
mustHave(doc, "Feedback is **internal unless permission is obtained**", "packet doc feedback internal boundary");
console.log("PASS: feedback internal unless permission obtained is documented.");

// 26. Lindy bridge/native workflow relationship is documented
assertSectionWithContent(doc, "## 13. Lindy Bridge / Native Workflow Relationship", [
  "Existing Lindy workflows may temporarily assist low-volume early workflows",
  "Lindy should not own CSV/reporting long term",
  "eventual native generation from RoofLeadHQ/Supabase records",
  "LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md",
  "native workflow engine migration",
], "packet doc");
console.log("PASS: Lindy bridge/native workflow relationship is documented.");

// 27. Forbidden public language is absent
const forbidden = [
  "book jobs",
  "booked jobs",
  "close jobs",
  "guaranteed jobs",
  "guaranteed revenue",
  "guaranteed appointments",
  "automatic estimate",
  "automatic quote",
  "automatic invoice",
  "automatic payment",
  "native CRM sync",
  "fully autonomous",
  "no human oversight",
  "fake reviews",
  "review farming",
  "automatic public review generation",
  "will be there",
  "5 qualified appointments in 7 days",
  "7-day pilot guarantee",
];
for (const f of forbidden) {
  mustNotHave(doc, f, "packet doc forbidden language");
}
mustHave(doc, "Forbidden public language", "packet doc forbidden language section");
console.log("PASS: forbidden public language is absent from packet doc body.");

// 28. Safety/no-live-activation/no-production-data/no-CRM-connection boundaries are documented
const safetyMarkers = [
  "planning/readiness/placement packet only",
  "no live CSV generation from production data",
  "no CRM connection",
  "no production data reads",
  "no customer data handling changes",
  "no backend live activation",
  "no integrations activated",
  "no external sends",
  "no production Supabase writes",
  "no auth/RLS/schema/security changes",
  "no env/credential changes",
  "no public route activation",
  "no Lindy live activation",
  "read-only verifier only",
  "dry-run wrapper only",
  "demo_ready_with_live_automation_disabled",
  "Live automation remains disabled unless Jason explicitly approves activation",
  "WORKSPACE_MODE=dry-run",
  "SMS_ACTIVATION=false",
  "CALENDAR_ACTIVATION=false",
  "VAPI_ACTIVATION=false",
  "SUPABASE_WRITES=false",
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "packet doc safety");
}
mustHave(doc, "Does not perform production Supabase writes", "packet doc no-production boundary");
mustHave(doc, "Does not change env/credentials", "packet doc no-production boundary");
mustHave(doc, "Does not change auth/RLS/schema/security", "packet doc no-production boundary");
mustHave(doc, "Does not activate external sends, public routes, cron, scheduler, or dispatcher", "packet doc no-production boundary");
console.log("PASS: safety/no-live-activation/no-production-data/no-CRM-connection boundaries are documented.");

// Wrapper safety
mustHave(wrapper, "verify-csv-export-readiness-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-csv-export-readiness-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node backend/scripts/verify-csv-export-readiness-readonly.js", "dry-run wrapper");

const unsafeImpl = [
  "twilio.messages.create",
  "supabase.from(",
  "resend.emails.send",
  "calendar.events.insert",
  "vapi.calls.create",
  "curl -X POST https://",
  'fetch("https://',
  "ALTER TABLE",
  "CREATE POLICY",
  "CREATE TABLE",
  "service_role",
  "process.env.SUPABASE_SERVICE_ROLE",
];
for (const s of unsafeImpl) {
  mustNotHave(wrapper, s, "dry-run wrapper");
}
console.log("PASS: dry-run wrapper invokes verifier and has no unsafe implementation strings.");

// Aggregate and index wiring
mustHave(aggregate, "verify-csv-export-readiness-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "CSV Export Readiness Packet", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "CSV_EXPORT_READINESS_PACKET.md",
  "run-csv-export-readiness-dry-run.sh",
  "verify-csv-export-readiness-readonly.js",
  "CSV Export Readiness",
  "csv export readiness",
  "permission_to_use_publicly",
  "native reporting readiness",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference CSV export readiness packet.");

console.log("PASS: CSV export readiness packet is planning-only, product-moving, and dry-run safe.");