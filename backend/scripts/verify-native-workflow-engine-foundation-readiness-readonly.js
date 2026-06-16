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

const docPath = "docs/NATIVE_WORKFLOW_ENGINE_FOUNDATION_READINESS_PACKET.md";
const wrapperPath = "scripts/run-native-workflow-engine-foundation-readiness-dry-run.sh";
const verifierPath = "backend/scripts/verify-native-workflow-engine-foundation-readiness-readonly.js";
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

// 3. Purpose/scope is documented
assertSectionWithContent(doc, "## 1. Purpose and Scope", [
  "foundation for a future native RoofLeadHQ workflow engine",
  "conceptual entities, states, plan configuration profiles",
  "migration boundaries before implementation",
], "packet doc");
console.log("PASS: purpose/scope is documented.");

// 4. Planning/readiness only and no implementation boundary is documented
mustHave(doc, "planning/readiness/foundation packet only", "packet doc planning boundary");
mustHave(doc, "does **not** implement the workflow engine", "packet doc no implementation");
mustHave(doc, "does **not** change database schema", "packet doc no schema");
mustHave(doc, "does **not** activate live automation", "packet doc no live activation");
mustHave(doc, "does **not** replace attorney/security review", "packet doc no attorney replacement");
console.log("PASS: planning/readiness only and no implementation boundary is documented.");

// 5. Native architecture direction is documented
assertSectionWithContent(doc, "## 2. Native Architecture Direction", [
  "native workflow state machine",
  "plan-tier configuration profiles",
  "direct integrations only after explicit approval",
], "packet doc");
console.log("PASS: native architecture direction is documented.");

// 6. Supabase source of truth is documented
mustHave(doc, "Supabase source of truth", "packet doc Supabase source of truth");
mustHave(doc, "Source of truth for records and workflow state", "packet doc Supabase role");
console.log("PASS: Supabase source of truth is documented.");

// 7. RoofLeadHQ backend workflow decision layer is documented
mustHave(doc, "RoofLeadHQ backend", "packet doc backend");
mustHave(doc, "Workflow decision layer", "packet doc workflow decision layer");
console.log("PASS: RoofLeadHQ backend workflow decision layer is documented.");

// 8. Lindy temporary bridge only is documented
mustHave(doc, "Lindy", "packet doc Lindy");
mustHave(doc, "Temporary bridge only", "packet doc Lindy temporary bridge");
console.log("PASS: Lindy temporary bridge only is documented.");

// 9. n8n/Make not required unless narrow bridge is documented
mustHave(doc, "n8n/Make are not required unless a narrow temporary bridge is needed", "packet doc n8n/Make boundary");
console.log("PASS: n8n/Make not required unless narrow bridge is documented.");

// 10. Core entities/readiness map is documented
assertSectionWithContent(doc, "## 3. Core Entities / Records Readiness Map", [
  "conceptual native entities",
  "No schema is created by this packet",
], "packet doc");
console.log("PASS: core entities/readiness map is documented.");

// 11. Required conceptual entities are documented
const entities = [
  "roofer_account",
  "plan_profile",
  "lead_record",
  "lead_source",
  "homeowner_contact",
  "message_thread",
  "follow_up_state",
  "manual_outreach_record",
  "missed_lead_recovery_state",
  "appointment_readiness_record",
  "booked_inspection_record",
  "post_inspection_record",
  "feedback_record",
  "review_queue_item",
  "report_snapshot",
  "csv_export_snapshot",
  "usage_volume_record",
  "integration_activation_flag",
  "safety_gate_record",
  "audit_event",
];
for (const e of entities) {
  mustHave(doc, `### ${e}`, `packet doc entity ${e}`);
}
console.log("PASS: required conceptual entities are documented.");

// 12. Workflow state machine foundation is documented
assertSectionWithContent(doc, "## 4. Workflow State Machine Foundation", [
  "conceptual states",
  "No live state machine is implemented by this packet",
  "No production records are created or changed",
], "packet doc");
console.log("PASS: workflow state machine foundation is documented.");

// 13. Required lead intake states are documented
const leadIntakeStates = [
  "NEW_LEAD",
  "SOURCE_CAPTURED",
  "MISSING_INFO",
  "DUPLICATE_REVIEW",
  "BAD_FIT_OR_EXCLUDED",
  "STOPPED_DO_NOT_CONTACT",
  "READY_FOR_RESPONSE",
];
for (const s of leadIntakeStates) {
  mustHave(doc, s, "packet doc lead intake states");
}
console.log("PASS: required lead intake states are documented.");

// 14. Required response/follow-up states are documented
const responseStates = [
  "RESPONSE_DRAFT_READY",
  "RESPONSE_SENT_OR_MANUAL_SENT",
  "FOLLOW_UP_PENDING",
  "FOLLOW_UP_DUE",
  "HOMEOWNER_REPLIED",
  "NO_RESPONSE",
  "MISSED_LEAD_RECOVERY_NEEDED",
  "MISSED_LEAD_RECOVERY_ACTIVE",
  "STOPPED_AFTER_MAX_ATTEMPTS",
];
for (const s of responseStates) {
  mustHave(doc, s, "packet doc response/follow-up states");
}
console.log("PASS: required response/follow-up states are documented.");

// 15. Required review states are documented
const reviewStates = [
  "ROOFER_REVIEW_NEEDED",
  "ROOFER_REVIEW_PENDING",
  "ROOFER_REVIEW_COMPLETE",
  "ROOFLEADHQ_REVIEW_NEEDED",
  "ROOFLEADHQ_REVIEW_PENDING",
  "ROOFLEADHQ_REVIEW_COMPLETE",
  "HOLD",
  "BLOCKED",
];
for (const s of reviewStates) {
  mustHave(doc, s, "packet doc review states");
}
console.log("PASS: required review states are documented.");

// 16. Required appointment/inspection states are documented
const appointmentStates = [
  "APPOINTMENT_READINESS_PENDING",
  "APPOINTMENT_READY",
  "APPOINTMENT_NOT_READY",
  "APPOINTMENT_BOOKED",
  "INSPECTION_REMINDER_READY",
  "INSPECTION_COMPLETED",
  "INSPECTION_MISSED",
  "RESCHEDULE_NEEDED",
  "APPOINTMENT_ISSUE",
];
for (const s of appointmentStates) {
  mustHave(doc, s, "packet doc appointment/inspection states");
}
console.log("PASS: required appointment/inspection states are documented.");

// 17. Required post-inspection states are documented
const postInspectionStates = [
  "POST_INSPECTION_FOLLOW_UP_NEEDED",
  "ESTIMATE_NEEDED",
  "ESTIMATE_SENT",
  "HOMEOWNER_FOLLOW_UP_NEEDED",
  "ROOFER_FOLLOW_UP_NEEDED",
  "STILL_OPEN",
  "WON",
  "LOST",
  "NEEDS_REVIEW",
  "CLOSED",
];
for (const s of postInspectionStates) {
  mustHave(doc, s, "packet doc post-inspection states");
}
console.log("PASS: required post-inspection states are documented.");

// 18. Required feedback states are documented
const feedbackStates = [
  "FEEDBACK_NOT_REQUESTED",
  "FEEDBACK_REQUESTED",
  "FEEDBACK_CAPTURED",
  "FEEDBACK_ISSUE_FLAGGED",
  "PERMISSION_TO_USE_PUBLICLY_YES",
  "PERMISSION_TO_USE_PUBLICLY_NO",
  "PERMISSION_TO_USE_PUBLICLY_NOT_ASKED",
];
for (const s of feedbackStates) {
  mustHave(doc, s, "packet doc feedback states");
}
console.log("PASS: required feedback states are documented.");

// 19. Required reporting/export states are documented
const reportingStates = [
  "REPORTING_PENDING",
  "REPORT_SNAPSHOT_READY",
  "CSV_EXPORT_READY",
  "CSV_EXPORT_DELIVERED_OR_MANUAL_SENT",
  "EXPORT_HOLD",
];
for (const s of reportingStates) {
  mustHave(doc, s, "packet doc reporting/export states");
}
console.log("PASS: required reporting/export states are documented.");

// 20. State transition guardrails are documented
assertSectionWithContent(doc, "## 5. State Transition Guardrails", [
  "lead source known or marked unknown",
  "contact permission status checked",
  "required homeowner contact data captured",
  "service area fit reviewed",
  "plan profile known",
  "appointment/calendar preferences known before appointment-ready status",
  "roofer review completed before business-judgment decisions",
  "RoofLeadHQ review limited to system/workflow/data/routing/quality issues",
  "feedback public-use permission captured before any testimonial/case-study/public use",
  "CSV/export generated only from approved native records after implementation",
  "live send actions blocked unless activation flags are explicitly approved",
], "packet doc");
console.log("PASS: state transition guardrails are documented.");

// 21. HOLD/BLOCKED examples are documented
assertSectionWithContent(doc, "### HOLD/BLOCKED examples", [
  "unclear contact permission",
  "do-not-contact request",
  "missing phone/email where required",
  "unsupported request for estimate/quote/invoice/payment",
  "multi-location complexity without Custom Review",
  "500+ lead volume without Custom Review",
  "multiple calendars/phones/sales reps without Custom Review",
  "production safety risk",
  "integration not approved",
  "unclear owner for follow-up or review",
], "packet doc");
console.log("PASS: HOLD/BLOCKED examples are documented.");

// 22. Plan-tier configuration profiles are documented
assertSectionWithContent(doc, "## 6. Plan-Tier Configuration Profiles", [
  "configuration profiles on one core native workflow engine",
  "not separate workflow engines per tier",
  "feature flags",
  "usage thresholds",
  "reporting depth",
  "CSV field availability",
  "review queue depth",
  "post-inspection/feedback availability",
  "upgrade/custom-review triggers",
], "packet doc");
console.log("PASS: plan-tier configuration profiles are documented.");

// 23. Starter/Growth/Elite/Custom profiles are documented
mustHave(doc, "### Starter profile", "packet doc Starter profile");
mustHave(doc, "up to 100 leads/month", "packet doc Starter volume");
mustHave(doc, "### Growth profile", "packet doc Growth profile");
mustHave(doc, "up to 300 leads/month", "packet doc Growth volume");
mustHave(doc, "### Elite profile", "packet doc Elite profile");
mustHave(doc, "up to 500 leads/month", "packet doc Elite volume");
mustHave(doc, "### Custom Review profile/triggers", "packet doc Custom profile");
console.log("PASS: Starter/Growth/Elite/Custom profiles are documented.");

// 24. Custom Review triggers are documented
mustHave(doc, "500+ leads/month", "packet doc Custom Review 500+");
mustHave(doc, "2+ locations", "packet doc Custom Review 2+ locations");
mustHave(doc, "3+ service areas", "packet doc Custom Review 3+ service areas");
mustHave(doc, "multiple calendars", "packet doc Custom Review multiple calendars");
mustHave(doc, "multiple phone numbers", "packet doc Custom Review multiple phones");
mustHave(doc, "multiple sales reps", "packet doc Custom Review multiple sales reps");
mustHave(doc, "complex service-area routing", "packet doc Custom Review complex routing");
mustHave(doc, "unusual integration needs", "packet doc Custom Review unusual integration");
mustHave(doc, "multi-location operations", "packet doc Custom Review multi-location");
console.log("PASS: Custom Review triggers are documented.");

// 25. Native workflow configuration inputs from Fillout/Guided Setup are documented
assertSectionWithContent(doc, "## 7. Native Workflow Configuration Inputs", [
  "Fillout / Guided Setup intake",
  "Fillout is intake/setup data, not the workflow brain",
  "company/contact basics",
  "monthly lead volume",
  "lead sources",
  "CRM/reporting needs",
  "locations/service areas",
  "phone/calendar setup",
  "review/escalation owner",
  "post-inspection follow-up preference",
  "feedback capture preference",
  "photo handling preference",
  "unsupported/later-only request flags",
  "messaging compliance status",
  "exclusions/routing rules",
  "report recipients",
  "final plan-fit summary",
], "packet doc");
console.log("PASS: native workflow configuration inputs from Fillout/Guided Setup are documented.");

// 26. Lindy bridge migration boundaries are documented
assertSectionWithContent(doc, "## 8. Lindy Bridge Migration Boundaries", [
  "Lindy may temporarily assist low-volume early flows",
  "Existing Lindy workflows may be preserved temporarily",
  "Major new business logic should not be built in Lindy",
  "Lindy should not own source-of-truth records",
  "Lindy should not own final reports/CSV exports",
  "Lindy should not own live send authority long term",
  "Lindy should not own multi-roofer routing",
  "Native RoofLeadHQ/Supabase should become workflow authority over time",
  "n8n/Make are not required unless a narrow temporary bridge is needed",
], "packet doc");
console.log("PASS: Lindy bridge migration boundaries are documented.");

// 27. Integration activation flags are documented
assertSectionWithContent(doc, "## 9. Integration Activation Flags", [
  "live_sms_enabled",
  "live_vapi_calls_enabled",
  "live_resend_email_enabled",
  "live_calendar_booking_enabled",
  "live_lindy_bridge_enabled",
  "live_scheduler_enabled",
  "live_csv_export_enabled",
  "live_crm_handoff_enabled",
  "live_payment_or_invoice_enabled",
], "packet doc");
console.log("PASS: integration activation flags are documented.");

// 28. demo_ready_with_live_automation_disabled is preserved
mustHave(doc, "demo_ready_with_live_automation_disabled", "packet doc safety posture");
mustHave(doc, "Live automation remains disabled unless Jason explicitly approves activation", "packet doc activation approval");
console.log("PASS: demo_ready_with_live_automation_disabled is preserved.");

// 29. First paid roofer manual bridge path is documented
assertSectionWithContent(doc, "## 10. First Paid Roofer Manual Bridge Path", [
  "native records/states may be modeled in dry-run/manual artifacts first",
  "Jason/founder may manually operate first-roofer review and coordination",
  "roofer review owns business judgment",
  "RoofLeadHQ/Jason review handles system/workflow/data/routing/quality issues only",
  "Lindy may assist temporarily only where existing flows are useful",
  "no uncontrolled live sends",
  "no production automation until explicit approval",
  "first-roofer operation should generate learning for native state machine implementation",
], "packet doc");
console.log("PASS: first paid roofer manual bridge path is documented.");

// 30. Staged E2E testing relationship is documented
assertSectionWithContent(doc, "## 11. Staged E2E Testing Relationship", [
  "Stage 1",
  "local fixture-only",
  "fake data only",
  "no live sends",
  "no production reads/writes",
  "Stage 2",
  "sandbox/test-mode integration paths where available",
  "integration activation flags still default off",
  "Stage 3",
  "limited live activation only after explicit approval",
  "activate one channel or workflow at a time",
  "verify rollback/hold/block states",
], "packet doc");
console.log("PASS: staged E2E testing relationship is documented.");

// 31. Required fixture paths are documented
const fixturePaths = [
  "normal lead to appointment-ready path",
  "missed-lead recovery path",
  "roofer-review-needed path",
  "RoofLeadHQ system-review-needed path",
  "bad-fit/excluded path",
  "do-not-contact path",
  "appointment booked / inspection completed path",
  "post-inspection still-open path",
  "feedback captured with permission_to_use_publicly yes/no/not_asked",
  "CSV/report snapshot with fake data",
  "plan-tier configuration differences",
  "Custom Review trigger path",
];
for (const f of fixturePaths) {
  mustHave(doc, f, "packet doc fixture paths");
}
console.log("PASS: required fixture paths are documented.");

// 32. Reporting/CSV relationship is documented
assertSectionWithContent(doc, "## 12. Reporting / CSV Relationship", [
  "CSV/reporting should ultimately be generated from native source-of-truth records",
  "one-directional reporting/manual CRM/reference use",
  "CSV exports may contain homeowner personal information",
  "customer is responsible for downloaded/exported data handling",
  "ROI fields depend on customer-provided spend/source data",
], "packet doc");
console.log("PASS: reporting/CSV relationship is documented.");

// 33. CSV not native CRM sync boundary is documented
mustHave(doc, "CSV export is not bidirectional CRM integration", "packet doc CSV CRM boundary");
mustHave(doc, "CSV does not replace the roofer's CRM", "packet doc CSV CRM boundary");
mustHave(doc, "CSV does not push data back to RoofLeadHQ", "packet doc CSV one-way boundary");
mustHave(doc, "CSV does not auto-update based on downloaded file changes", "packet doc CSV no auto-update");
mustHave(doc, "one-directional reporting/manual CRM/reference use", "packet doc CSV one-way boundary");
console.log("PASS: CSV not native CRM sync boundary is documented.");

// 34. Data protection/privacy/audit readiness is documented
assertSectionWithContent(doc, "## 13. Data Protection / Privacy / Audit Readiness", [
  "tenant/customer data boundary",
  "least-privilege access",
  "data minimization",
  "homeowner personal information handling",
  "feedback public-use permission",
  "no sale of homeowner data",
  "audit trail for state transitions",
  "audit trail for human review decisions",
  "audit trail for live activation flag changes",
  "retention/deletion/export process to be defined",
  "security/tenant isolation review before multi-roofer production scale",
  "No implementation in this packet",
], "packet doc");
console.log("PASS: data protection/privacy/audit readiness is documented.");

// 35. Future implementation sequencing is documented
assertSectionWithContent(doc, "## 14. Future Implementation Sequencing", [
  "Native workflow entity/state implementation plan",
  "Supabase schema/RLS/security readiness review before schema work",
  "Fixture-based state machine dry-run implementation",
  "Plan profile configuration fixture tests",
  "Review queue native model",
  "Reporting/CSV fixture generator using fake data",
  "Integration activation flag implementation",
  "Sandbox/test-mode channel connector tests",
  "First paid roofer manual-to-native handoff rehearsal",
  "Limited live activation approval gate",
], "packet doc");
console.log("PASS: future implementation sequencing is documented.");

// 36. Forbidden public language is absent
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
];
for (const f of forbidden) {
  mustNotHave(doc, f, "packet doc forbidden language");
}
mustHave(doc, "Forbidden public language", "packet doc forbidden language section");
console.log("PASS: forbidden public language is absent from packet doc body.");

// 37. Safety/no-live-activation/no-production-data/no-schema/no-integration boundaries are documented
const safetyMarkers = [
  "planning/readiness/foundation packet only",
  "no database schema changes",
  "no migrations",
  "no auth/RLS/security implementation",
  "no production Supabase writes",
  "no production data reads",
  "no live automation activation",
  "no customer data handling changes",
  "no backend live behavior changes",
  "no external service calls",
  "no CRM connection",
  "no bidirectional CRM integration",
  "no env/credential changes",
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
console.log("PASS: safety/no-live-activation/no-production-data/no-schema/no-integration boundaries are documented.");

// Wrapper safety
mustHave(wrapper, "verify-native-workflow-engine-foundation-readiness-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-native-workflow-engine-foundation-readiness-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node backend/scripts/verify-native-workflow-engine-foundation-readiness-readonly.js", "dry-run wrapper");

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

// 38. Required wiring into aggregate readiness and context docs is present
mustHave(aggregate, "verify-native-workflow-engine-foundation-readiness-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Native Workflow Engine Foundation Readiness Packet", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "NATIVE_WORKFLOW_ENGINE_FOUNDATION_READINESS_PACKET.md",
  "run-native-workflow-engine-foundation-readiness-dry-run.sh",
  "verify-native-workflow-engine-foundation-readiness-readonly.js",
  "Native Workflow Engine Foundation Readiness",
  "native workflow engine foundation readiness",
  "workflow foundation readiness",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference native workflow engine foundation readiness packet.");

console.log("PASS: Native Workflow Engine Foundation Readiness Packet is planning-only, product-moving, and dry-run safe.");