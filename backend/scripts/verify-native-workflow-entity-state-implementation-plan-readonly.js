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

const docPath = "docs/NATIVE_WORKFLOW_ENTITY_STATE_IMPLEMENTATION_PLAN.md";
const wrapperPath = "scripts/run-native-workflow-entity-state-implementation-plan-dry-run.sh";
const verifierPath = "backend/scripts/verify-native-workflow-entity-state-implementation-plan-readonly.js";
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
  "concrete **implementation plan**",
  "future implementation modules, entity groups, state-transition phases",
  "security blockers, and launch sequencing",
], "packet doc");
console.log("PASS: purpose/scope is documented.");

// 4. Planning/readiness only and no implementation boundary is documented
mustHave(doc, "planning/readiness/implementation-plan packet only", "packet doc planning boundary");
mustHave(doc, "does **not** implement the workflow engine", "packet doc no implementation");
mustHave(doc, "does **not** create or modify database schema", "packet doc no schema");
mustHave(doc, "does **not** change auth, RLS, tenant isolation, or security controls", "packet doc no auth");
mustHave(doc, "does **not** activate live automation", "packet doc no live activation");
mustHave(doc, "does **not** read/write production data", "packet doc no production data");
console.log("PASS: planning/readiness only and no implementation boundary is documented.");

// 5. Implementation principles are documented
assertSectionWithContent(doc, "## 2. Implementation Principles", [
  "Supabase will become the source of truth",
  "RoofLeadHQ backend will become the workflow decision layer",
  "Lindy remains temporary bridge only",
  "One core workflow engine",
  "Live channel execution must be behind explicit activation flags",
  "Fixture/dry-run behavior must precede sandbox/test-mode and live activation",
  "Security/tenant isolation review must precede schema/RLS implementation",
  "No bidirectional CRM integration",
  "Roofer review owns business judgment",
], "packet doc");
console.log("PASS: implementation principles are documented.");

// 6. Supabase source of truth is documented
mustHave(doc, "Supabase source of truth", "packet doc Supabase source of truth");
mustHave(doc, "Supabase will become the source of truth for native records and workflow state", "packet doc Supabase role");
console.log("PASS: Supabase source of truth is documented.");

// 7. RoofLeadHQ backend decision layer is documented
mustHave(doc, "RoofLeadHQ backend", "packet doc backend");
mustHave(doc, "workflow decision layer", "packet doc workflow decision layer");
console.log("PASS: RoofLeadHQ backend decision layer is documented.");

// 8. Lindy temporary bridge only is documented
mustHave(doc, "Lindy", "packet doc Lindy");
mustHave(doc, "temporary bridge only", "packet doc Lindy temporary bridge");
console.log("PASS: Lindy temporary bridge only is documented.");

// 9. Future module map is documented
assertSectionWithContent(doc, "## 3. Future Module Map", [
  "conceptual future backend/module areas",
  "No modules are created by this packet",
], "packet doc");
console.log("PASS: future module map is documented.");

// 10. Required future modules are documented
const modules = [
  "workflow/entities",
  "workflow/states",
  "workflow/transitions",
  "workflow/guards",
  "workflow/planProfiles",
  "workflow/reviewQueues",
  "workflow/appointmentReadiness",
  "workflow/postInspection",
  "workflow/feedback",
  "workflow/reporting",
  "workflow/csvExport",
  "workflow/usageVolume",
  "workflow/activationFlags",
  "workflow/audit",
  "workflow/fixtures",
  "workflow/lindyBridgeAdapter",
  "workflow/integrationAdapters",
];
for (const m of modules) {
  mustHave(doc, `### ${m}`, `packet doc module ${m}`);
}
console.log("PASS: required future modules are documented.");

// 11. Entity implementation readiness table exists
mustHave(doc, "## 4. Entity Implementation Readiness Table", "packet doc entity table");
mustHave(doc, "| Entity | Purpose | First priority |", "packet doc entity table columns");
console.log("PASS: entity implementation readiness table exists.");

// 12. Required conceptual entities are documented
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
  mustHave(doc, `| ${e} |`, `packet doc entity ${e}`);
}
console.log("PASS: required conceptual entities are documented.");

// 13. State implementation phases are documented
assertSectionWithContent(doc, "## 5. State Implementation Phases", [
  "Phase 0",
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4",
  "Phase 5",
], "packet doc");
console.log("PASS: state implementation phases are documented.");

// 14. Phase 0 through Phase 5 are documented
mustHave(doc, "### Phase 0 — planning/dry-run only", "packet doc Phase 0");
mustHave(doc, "### Phase 1 — fixture state model", "packet doc Phase 1");
mustHave(doc, "### Phase 2 — schema/security readiness", "packet doc Phase 2");
mustHave(doc, "### Phase 3 — native state persistence", "packet doc Phase 3");
mustHave(doc, "### Phase 4 — manual first-roofer native bridge", "packet doc Phase 4");
mustHave(doc, "### Phase 5 — selective live activation", "packet doc Phase 5");
console.log("PASS: Phase 0 through Phase 5 are documented.");

// 15. Transition guard implementation plan is documented
assertSectionWithContent(doc, "## 6. Transition Guard Implementation Plan", [
  "Transition guards enforce safe advancement",
  "not live enforcement by this packet",
], "packet doc");
console.log("PASS: transition guard implementation plan is documented.");

// 16. Required transition categories are documented
const transitionCategories = [
  "intake transitions",
  "response/follow-up transitions",
  "missed-lead recovery transitions",
  "review queue transitions",
  "appointment readiness transitions",
  "booked inspection transitions",
  "post-inspection transitions",
  "feedback transitions",
  "reporting/CSV transitions",
  "custom-review/plan upgrade transitions",
  "HOLD/BLOCKED transitions",
];
for (const c of transitionCategories) {
  mustHave(doc, `### ${c}`, `packet doc transition category ${c}`);
}
console.log("PASS: required transition categories are documented.");

// 17. Required guard checks are documented
const guardChecks = [
  "contact permission known or reviewed",
  "do-not-contact respected",
  "service area checked",
  "lead source captured or marked unknown",
  "required homeowner contact data present",
  "plan profile known",
  "custom-review triggers checked",
  "appointment/calendar preferences known before appointment-ready status",
  "roofer review completed before business-judgment decisions",
  "RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality issues",
  "feedback public-use permission checked before public use",
  "CSV/reporting generated only from approved native records after implementation",
  "live sends blocked unless activation flags explicitly approved",
];
for (const g of guardChecks) {
  mustHave(doc, g, "packet doc guard checks");
}
console.log("PASS: required guard checks are documented.");

// 18. HOLD/BLOCKED handling is documented
mustHave(doc, "Failure/HOLD/BLOCKED handling", "packet doc HOLD/BLOCKED handling");
mustHave(doc, "### HOLD/BLOCKED transitions", "packet doc HOLD/BLOCKED transitions");
console.log("PASS: HOLD/BLOCKED handling is documented.");

// 19. Plan profile implementation plan is documented
assertSectionWithContent(doc, "## 7. Plan Profile Implementation Plan", [
  "configuration profiles on one core workflow engine",
  "monthly lead volume limit",
  "missed-lead recovery enabled",
  "post-inspection follow-up enabled",
  "feedback capture enabled",
  "CSV field availability",
  "custom-review triggers",
  "live integration eligibility",
], "packet doc");
console.log("PASS: plan profile implementation plan is documented.");

// 20. One core workflow engine / no separate tier engines is documented
mustHave(doc, "One core workflow engine", "packet doc one core engine");
mustHave(doc, "No separate workflow engines per tier", "packet doc no separate engines");
console.log("PASS: one core workflow engine / no separate tier engines is documented.");

// 21. Fillout / Guided Setup to native config mapping is documented
assertSectionWithContent(doc, "## 8. Fillout / Guided Setup to Native Config Mapping", [
  "Fillout should not become the workflow brain",
  "monthly lead volume",
  "company/contact basics",
  "lead sources",
  "CRM/reporting needs",
  "locations/service areas",
  "phone/calendar setup",
  "human review/escalation owner",
  "post-inspection preference",
  "feedback preference",
  "photo handling preference",
  "unsupported/later-only requests",
  "messaging compliance",
  "report recipients",
  "final plan-fit summary",
], "packet doc");
console.log("PASS: Fillout / Guided Setup to native config mapping is documented.");

// 22. Lindy bridge implementation boundary is documented
assertSectionWithContent(doc, "## 9. Lindy Bridge Implementation Boundary", [
  "Lindy may temporarily help with low-volume early workflows",
  "Existing Lindy workflows may remain while native engine is built",
  "Major new workflow logic should not be built in Lindy",
  "Lindy should never be the authoritative record store",
  "Lindy should not own final CSV/reporting",
  "Lindy should not own multi-roofer routing",
  "Lindy should not own live-send authority long term",
  "Lindy bridge outputs should be treated as inputs/notes",
], "packet doc");
console.log("PASS: Lindy bridge implementation boundary is documented.");

// 23. n8n/Make not required unless narrow bridge is documented
mustHave(doc, "n8n/Make are not required unless a narrow temporary bridge is needed", "packet doc n8n/Make boundary");
console.log("PASS: n8n/Make not required unless narrow bridge is documented.");

// 24. Activation flag implementation plan is documented
assertSectionWithContent(doc, "## 10. Activation Flag Implementation Plan", [
  "default false",
  "explicit Jason approval required",
  "audit event required for any change",
  "rollback plan required",
  "fixture/sandbox tests required before live use",
  "live sends must fail closed if flag is false",
], "packet doc");
console.log("PASS: activation flag implementation plan is documented.");

// 25. Required activation flags are documented
const activationFlags = [
  "live_sms_enabled",
  "live_vapi_calls_enabled",
  "live_resend_email_enabled",
  "live_calendar_booking_enabled",
  "live_lindy_bridge_enabled",
  "live_scheduler_enabled",
  "live_csv_export_enabled",
  "live_crm_handoff_enabled",
  "live_payment_or_invoice_enabled",
];
for (const f of activationFlags) {
  mustHave(doc, f, "packet doc activation flags");
}
console.log("PASS: required activation flags are documented.");

// 26. Fixture test implementation plan is documented
assertSectionWithContent(doc, "## 11. Fixture Test Implementation Plan", [
  "fake-data fixture tests",
  "fake data only",
  "No production reads/writes",
], "packet doc");
console.log("PASS: fixture test implementation plan is documented.");

// 27. Required fixture paths are documented
const fixturePaths = [
  "normal lead intake to appointment readiness",
  "missing info path",
  "duplicate review path",
  "bad-fit/excluded path",
  "stopped/do-not-contact path",
  "missed-lead recovery path",
  "roofer-review-needed path",
  "RoofLeadHQ system-review-needed path",
  "appointment booked path",
  "inspection completed path",
  "inspection missed/reschedule path",
  "post-inspection still-open path",
  "estimate-needed / estimate-sent tracking path",
  "homeowner follow-up needed path",
  "roofer follow-up needed path",
  "feedback captured with permission_to_use_publicly yes",
  "feedback captured with permission_to_use_publicly no",
  "feedback captured with permission_to_use_publicly not_asked",
  "CSV/report snapshot with fake data",
  "Starter plan profile path",
  "Growth plan profile path",
  "Elite plan profile path",
  "Custom Review trigger for 500+ leads",
  "Custom Review trigger for 2+ locations",
  "activation flag false blocks live action",
];
for (const f of fixturePaths) {
  mustHave(doc, f, "packet doc fixture paths");
}
console.log("PASS: required fixture paths are documented.");

// 28. Security/schema/RLS blockers are documented
assertSectionWithContent(doc, "## 12. Security / Schema / RLS Blockers Before Implementation", [
  "tenant isolation design",
  "row-level security policy design",
  "contractor/customer account boundary",
  "homeowner personal information classification",
  "audit trail design",
  "review queue access boundaries",
  "report/CSV access boundaries",
  "retention/deletion/export process",
  "secrets/env review",
  "vendor/processor review",
  "auth/session model",
  "least-privilege access model",
  "multi-roofer scale blocker",
  "production lead data write approval gate",
], "packet doc");
console.log("PASS: security/schema/RLS blockers are documented.");

// 29. No schema/migrations/auth/RLS implementation before review is documented
mustHave(doc, "No schema, migrations, auth, RLS, or security implementation should happen until these are reviewed", "packet doc no schema before review");
console.log("PASS: no schema/migrations/auth/RLS implementation before review is documented.");

// 30. First paid roofer launch relationship is documented
assertSectionWithContent(doc, "## 13. First Paid Roofer Launch Relationship", [
  "manual/founder-operated bridge path",
  "should not block first paid roofer outreach/onboarding unless safety requires it",
  "inform fixture cases and state-transition priorities",
  "Roofer review remains the default for business judgment",
  "RoofLeadHQ/Jason review remains system/workflow/data/routing/quality only",
  "Live automation remains disabled unless explicitly approved",
  "Lindy may assist only as temporary bridge where useful",
], "packet doc");
console.log("PASS: first paid roofer launch relationship is documented.");

// 31. Reporting/CSV implementation dependency is documented
assertSectionWithContent(doc, "## 14. Reporting / CSV Implementation Dependency", [
  "CSV export readiness already defines field groups and boundaries",
  "Reporting/CSV should eventually generate from native source-of-truth records",
  "CSV remains one-directional manual CRM/reference/reporting use",
  "No bidirectional CRM integration",
  "No production CSV generation by this packet",
  "Customer is responsible for downloaded/exported data",
  "ROI depends on customer-provided spend/source data",
], "packet doc");
console.log("PASS: reporting/CSV implementation dependency is documented.");

// 32. CSV not native CRM sync boundary is documented
mustHave(doc, "CSV export is not bidirectional CRM integration", "packet doc CSV CRM boundary");
mustHave(doc, "CSV does not replace the roofer's CRM", "packet doc CSV CRM boundary");
mustHave(doc, "CSV does not push data back to RoofLeadHQ", "packet doc CSV one-way boundary");
mustHave(doc, "CSV does not auto-update based on downloaded file changes", "packet doc CSV no auto-update");
mustHave(doc, "one-directional reporting/manual CRM/reference use", "packet doc CSV one-way boundary");
console.log("PASS: CSV not native CRM sync boundary is documented.");

// 33. Future implementation sequencing is documented
assertSectionWithContent(doc, "## 15. Future Implementation Sequencing", [
  "Resolve security/tenant isolation prerequisites before persistent native schema",
  "Create fixture-only state model using fake data",
  "Add plan profile fixture config",
  "Add transition guard fixture tests",
  "Add review queue fixture model",
  "Add appointment readiness fixture model",
  "Add post-inspection/feedback fixture model",
  "Add reporting/CSV fake-data snapshot fixture",
  "Prepare schema/RLS/security implementation review",
  "Implement approved native persistence only after review",
  "Rehearse first paid roofer manual-to-native handoff",
  "Consider sandbox/test-mode integrations one channel at a time",
  "Require explicit approval for any live activation",
], "packet doc");
console.log("PASS: future implementation sequencing is documented.");

// 34. demo_ready_with_live_automation_disabled is preserved
mustHave(doc, "demo_ready_with_live_automation_disabled", "packet doc safety posture");
mustHave(doc, "Live automation remains disabled unless Jason explicitly approves activation", "packet doc activation approval");
console.log("PASS: demo_ready_with_live_automation_disabled is preserved.");

// 35. Forbidden public language is absent
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
mustHave(doc, "### Forbidden public language", "packet doc forbidden language section");
console.log("PASS: forbidden public language is absent from packet doc body.");

// 36. Safety/no-live-activation/no-production-data/no-schema/no-integration boundaries are documented
const safetyMarkers = [
  "planning/readiness/implementation-plan packet only",
  "no database schema changes",
  "no migrations",
  "no auth/RLS/security implementation",
  "no production Supabase writes",
  "no production data reads",
  "no live automation activation",
  "no customer-facing workflow behavior changes",
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
mustHave(wrapper, "verify-native-workflow-entity-state-implementation-plan-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-native-workflow-entity-state-implementation-plan-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node backend/scripts/verify-native-workflow-entity-state-implementation-plan-readonly.js", "dry-run wrapper");

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

// 37. Required wiring into aggregate readiness and context docs is present
mustHave(aggregate, "verify-native-workflow-entity-state-implementation-plan-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Native Workflow Entity State Implementation Plan", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "NATIVE_WORKFLOW_ENTITY_STATE_IMPLEMENTATION_PLAN.md",
  "run-native-workflow-entity-state-implementation-plan-dry-run.sh",
  "verify-native-workflow-entity-state-implementation-plan-readonly.js",
  "Native Workflow Entity State Implementation Plan",
  "native workflow entity state implementation plan",
  "entity state implementation plan",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference native workflow entity state implementation plan.");

console.log("PASS: Native Workflow Entity State Implementation Plan is planning-only, product-moving, and dry-run safe.");