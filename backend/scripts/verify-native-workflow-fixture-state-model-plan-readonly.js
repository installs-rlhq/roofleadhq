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

const docPath = "docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md";
const wrapperPath = "scripts/run-native-workflow-fixture-state-model-plan-dry-run.sh";
const verifierPath = "backend/scripts/verify-native-workflow-fixture-state-model-plan-readonly.js";
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
  "fixture-only fake-data state model plan",
  "future native workflow implementation",
], "packet doc");
console.log("PASS: purpose/scope is documented.");

// 4. Fixture-only principles are documented
assertSectionWithContent(doc, "## 2. Fixture-Only Principles", [
  "Fake data only",
  "No Supabase reads/writes",
  "No live sends",
  "No external service calls",
  "No scheduler/cron/dispatcher",
  "No live Lindy workflow execution",
  "No bidirectional CRM integration",
  "Every fixture path must produce deterministic expected states",
  "Every unsafe action must fail closed",
  "Activation flags must default false",
], "packet doc");
console.log("PASS: fixture-only principles are documented.");

// 5. Planning/readiness only and no implementation boundary is documented
mustHave(doc, "planning/readiness/fixture-plan packet only", "packet doc planning boundary");
mustHave(doc, "does **not** implement the state model", "packet doc no state model implementation");
mustHave(doc, "does **not** implement the workflow engine", "packet doc no workflow engine");
mustHave(doc, "does **not** create or modify database schema", "packet doc no schema");
mustHave(doc, "does **not** change auth, RLS, tenant isolation, or security controls", "packet doc no auth");
mustHave(doc, "does **not** activate live automation", "packet doc no live activation");
mustHave(doc, "does **not** read/write production data", "packet doc no production data");
console.log("PASS: planning/readiness only and no implementation boundary is documented.");

// 6. No production data/no Supabase/no external calls boundary is documented
mustHave(doc, "no production Supabase reads or writes", "packet doc no supabase");
mustHave(doc, "no external service calls", "packet doc no external calls");
mustHave(doc, "No homeowner/customer production data", "packet doc no production homeowner data");
console.log("PASS: no production data/no Supabase/no external calls boundary is documented.");

// 7. Fixture data model is documented
assertSectionWithContent(doc, "## 3. Fixture Data Model", [
  "conceptual fake fixture objects",
  "No objects are implemented by this packet",
], "packet doc");
console.log("PASS: fixture data model is documented.");

// 8. Required fixture objects are documented
const fixtureObjects = [
  "fixture_roofer_account",
  "fixture_plan_profile",
  "fixture_lead_record",
  "fixture_lead_source",
  "fixture_homeowner_contact",
  "fixture_message_thread",
  "fixture_follow_up_state",
  "fixture_review_queue_item",
  "fixture_appointment_readiness_record",
  "fixture_booked_inspection_record",
  "fixture_post_inspection_record",
  "fixture_feedback_record",
  "fixture_report_snapshot",
  "fixture_csv_export_snapshot",
  "fixture_usage_volume_record",
  "fixture_activation_flags",
  "fixture_audit_event",
];
for (const o of fixtureObjects) {
  mustHave(doc, `### ${o}`, `packet doc fixture object ${o}`);
}
console.log("PASS: required fixture objects are documented.");

// 9. Required fixture scenarios are documented
assertSectionWithContent(doc, "## 4. Required Fixture Scenarios", [
  "Fake input summary",
  "Expected state path",
  "Expected final state",
  "Required guard checks",
  "Safety assertion",
], "packet doc");
console.log("PASS: required fixture scenarios are documented.");

// 10. All 25 required scenarios are documented
const scenarios = [
  "normal lead intake to appointment readiness",
  "missing information path",
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
for (const s of scenarios) {
  mustHave(doc, s, "packet doc fixture scenario");
}
console.log("PASS: all 25 required scenarios are documented.");

// 11. State transition expectation table exists
mustHave(doc, "## 5. State Transition Expectation Table", "packet doc transition table");
mustHave(doc, "| Scenario | Starting state | Trigger | Guard checks | Expected next state |", "packet doc transition table columns");
console.log("PASS: state transition expectation table exists.");

// 12. Live action allowed is no for fixture rows
mustHave(doc, "| Live action allowed? |", "packet doc live action column");
const liveActionNoCount = (doc.match(/\| no \|/g) || []).length;
if (liveActionNoCount < 20) {
  throw new Error(`packet doc transition table missing sufficient "no" live action rows (found ${liveActionNoCount})`);
}
console.log("PASS: live action allowed is no for fixture rows.");

// 13. Guard failure matrix is documented
assertSectionWithContent(doc, "## 6. Guard Failure Matrix", [
  "Expected HOLD/BLOCKED/review state",
  "Owner",
  "Manual next step",
  "Safety note",
], "packet doc");
console.log("PASS: guard failure matrix is documented.");

// 14. Required guard failure cases are documented
const guardFailures = [
  "contact permission unknown",
  "do-not-contact requested",
  "missing homeowner phone/email where required",
  "service area excluded",
  "lead source unknown but allowed to continue with review",
  "lead source unknown and blocked by setup rules",
  "duplicate lead suspected",
  "unsupported estimate/quote/invoice/payment request",
  "pricing question",
  "insurance complexity",
  "homeowner upset",
  "appointment preferences missing",
  "calendar owner unknown",
  "roofer review owner unknown",
  "RoofLeadHQ review needed for system/data issue",
  "public feedback permission not captured",
  "CSV/export requested from non-approved records",
  "plan volume exceeds limit",
  "500+ leads/month",
  "2+ locations",
  "multiple calendars",
  "multiple phone numbers",
  "multiple sales reps",
  "live activation flag false",
];
for (const g of guardFailures) {
  mustHave(doc, g, "packet doc guard failure case");
}
console.log("PASS: required guard failure cases are documented.");

// 15. Plan profile fixture expectations are documented
assertSectionWithContent(doc, "## 7. Plan Profile Fixture Expectations", [
  "configuration profiles, not separate workflow engines",
], "packet doc");
console.log("PASS: plan profile fixture expectations are documented.");

// 16. Starter/Growth/Elite/Custom fixture expectations are documented
mustHave(doc, "### Starter", "packet doc Starter profile");
mustHave(doc, "### Growth", "packet doc Growth profile");
mustHave(doc, "### Elite", "packet doc Elite profile");
mustHave(doc, "### Custom Review", "packet doc Custom Review profile");
mustHave(doc, "up to 100 leads/month", "packet doc Starter volume");
mustHave(doc, "up to 300 leads/month", "packet doc Growth volume");
mustHave(doc, "up to 500 leads/month", "packet doc Elite volume");
console.log("PASS: Starter/Growth/Elite/Custom fixture expectations are documented.");

// 17. Configuration profiles not separate engines is documented
mustHave(doc, "configuration profiles, not separate workflow engines", "packet doc config profiles not engines");
mustHave(doc, "One core workflow engine", "packet doc one core engine");
console.log("PASS: configuration profiles not separate engines is documented.");

// 18. Review queue fixture expectations are documented
assertSectionWithContent(doc, "## 8. Review Queue Fixture Expectations", [
  "Roofer/contractor review",
  "RoofLeadHQ/Jason system review",
], "packet doc");
console.log("PASS: review queue fixture expectations are documented.");

// 19. Roofer-first business judgment review is documented
mustHave(doc, "Roofer review owns business judgment", "packet doc roofer review ownership");
console.log("PASS: roofer-first business judgment review is documented.");

// 20. RoofLeadHQ/Jason system-quality review limitation is documented
mustHave(doc, "RoofLeadHQ/Jason review is limited to system/workflow/data/routing/quality issues", "packet doc system review limitation");
console.log("PASS: RoofLeadHQ/Jason system-quality review limitation is documented.");

// 21. Appointment readiness fixture expectations are documented
assertSectionWithContent(doc, "## 9. Appointment Readiness Fixture Expectations", [
  "APPOINTMENT_READINESS_PENDING",
  "APPOINTMENT_READY",
  "APPOINTMENT_NOT_READY",
  "APPOINTMENT_BOOKED",
  "APPOINTMENT_ISSUE",
  "RESCHEDULE_NEEDED",
  "No live Google Calendar event creation is allowed in this packet",
], "packet doc");
console.log("PASS: appointment readiness fixture expectations are documented.");

// 22. Post-inspection fixture expectations are documented
assertSectionWithContent(doc, "## 10. Post-Inspection Fixture Expectations", [
  "inspection completed",
  "inspection missed",
  "reschedule needed",
  "estimate needed",
  "estimate sent",
  "homeowner follow-up needed",
  "roofer follow-up needed",
  "still open",
  "won",
  "lost",
  "needs review",
], "packet doc");
console.log("PASS: post-inspection fixture expectations are documented.");

// 23. Feedback fixture expectations are documented
assertSectionWithContent(doc, "## 11. Feedback Fixture Expectations", [
  "feedback not requested",
  "feedback requested",
  "feedback captured",
  "feedback issue flagged",
], "packet doc");
console.log("PASS: feedback fixture expectations are documented.");

// 24. permission_to_use_publicly yes/no/not_asked is documented
mustHave(doc, "permission_to_use_publicly yes", "packet doc permission yes");
mustHave(doc, "permission_to_use_publicly no", "packet doc permission no");
mustHave(doc, "permission_to_use_publicly not_asked", "packet doc permission not_asked");
console.log("PASS: permission_to_use_publicly yes/no/not_asked is documented.");

// 25. Reporting/CSV fixture snapshot expectations are documented
assertSectionWithContent(doc, "## 12. Reporting / CSV Fixture Snapshot Expectations", [
  "weekly/monthly report snapshot",
  "lead source summary",
  "appointment/inspection status summary",
  "post-inspection status summary",
  "feedback summary",
  "CSV header verification",
  "fictional CSV sample row",
  "plan-tier CSV field availability",
  "source ROI fields",
], "packet doc");
console.log("PASS: reporting/CSV fixture snapshot expectations are documented.");

// 26. CSV not native CRM sync boundary is documented
mustHave(doc, "CSV export is not bidirectional CRM integration", "packet doc CSV CRM boundary");
mustHave(doc, "CSV does not replace the roofer's CRM", "packet doc CSV CRM boundary");
mustHave(doc, "CSV does not push data back to RoofLeadHQ", "packet doc CSV one-way boundary");
mustHave(doc, "one-directional reporting/manual CRM/reference use", "packet doc CSV one-way boundary");
console.log("PASS: CSV not native CRM sync boundary is documented.");

// 27. Activation flag fixture expectations are documented
assertSectionWithContent(doc, "## 13. Activation Flag Fixture Expectations", [
  "all default false",
  "live send/action blocked if false",
  "audit note created",
  "explicit Jason approval required before any future live activation",
], "packet doc");
console.log("PASS: activation flag fixture expectations are documented.");

// 28. Required activation flags are documented
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

// 29. Fixture output expectations are documented
assertSectionWithContent(doc, "## 14. Fixture Output Expectations", [
  "scenario_id",
  "scenario_name",
  "input_fixture_summary",
  "starting_state",
  "transition_log",
  "guard_results",
  "final_state",
  "review_queue_items",
  "reporting_snapshot",
  "csv_snapshot_if_applicable",
  "activation_flag_results",
  "audit_events",
  "safety_assertions",
], "packet doc");
console.log("PASS: fixture output expectations are documented.");

// 30. live_actions_performed: no is documented
mustHave(doc, '"live_actions_performed": "no"', "packet doc live_actions_performed");
console.log("PASS: live_actions_performed: no is documented.");

// 31. production_data_touched: no is documented
mustHave(doc, '"production_data_touched": "no"', "packet doc production_data_touched");
console.log("PASS: production_data_touched: no is documented.");

// 32. external_services_called: no is documented
mustHave(doc, '"external_services_called": "no"', "packet doc external_services_called");
console.log("PASS: external_services_called: no is documented.");

// 33. Local E2E runner relationship is documented
assertSectionWithContent(doc, "## 15. Local E2E Runner Relationship", [
  "guide future expansion of the local E2E fixture runner",
  "Fixture outputs should remain deterministic",
  "Tests should not require credentials",
  "Tests should not call Supabase or external services",
], "packet doc");
console.log("PASS: local E2E runner relationship is documented.");

// 34. First paid roofer relationship is documented
assertSectionWithContent(doc, "## 16. First Paid Roofer Relationship", [
  "first paid roofer manual operation can use these fixture paths as a reference",
  "fixture learning should inform native implementation priorities",
  "Live automation remains disabled unless explicitly approved",
  "Lindy may assist temporarily where existing workflows are useful",
  "Native records/states should become the long-term authority",
], "packet doc");
console.log("PASS: first paid roofer relationship is documented.");

// 35. Future implementation sequencing is documented
assertSectionWithContent(doc, "## 17. Future Implementation Sequencing", [
  "Create fake-data fixture state model implementation after this plan",
  "Add deterministic local fixture scenarios",
  "Add transition guard assertions",
  "Add plan profile fixture assertions",
  "Add review queue fixture assertions",
  "Add appointment readiness fixture assertions",
  "Add post-inspection/feedback fixture assertions",
  "Add reporting/CSV fake snapshot assertions",
  "Add activation-flag false blocking assertions",
  "Only after fixture model passes, consider schema/security/RLS readiness work",
  "Only after security review, consider native persistence",
  "Only after explicit approval, consider sandbox/test-mode integrations",
], "packet doc");
console.log("PASS: future implementation sequencing is documented.");

// 36. demo_ready_with_live_automation_disabled is preserved
mustHave(doc, "demo_ready_with_live_automation_disabled", "packet doc safety posture");
mustHave(doc, "Live automation remains disabled unless Jason explicitly approves activation", "packet doc activation approval");
console.log("PASS: demo_ready_with_live_automation_disabled is preserved.");

// 37. Forbidden public language is absent
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

// 38. Safety/no-live-activation/no-production-data/no-schema/no-integration boundaries are documented
const safetyMarkers = [
  "planning/readiness/fixture-plan packet only",
  "no database schema changes",
  "no migrations",
  "no auth/RLS/security implementation",
  "no production Supabase reads or writes",
  "no production data handling changes",
  "no live automation activation",
  "no customer-facing workflow behavior changes",
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
mustHave(wrapper, "verify-native-workflow-fixture-state-model-plan-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-native-workflow-fixture-state-model-plan-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node backend/scripts/verify-native-workflow-fixture-state-model-plan-readonly.js", "dry-run wrapper");

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

// 39. Required wiring into aggregate readiness and context docs is present
mustHave(aggregate, "verify-native-workflow-fixture-state-model-plan-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Native Workflow Fixture State Model Plan", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md",
  "run-native-workflow-fixture-state-model-plan-dry-run.sh",
  "verify-native-workflow-fixture-state-model-plan-readonly.js",
  "Native Workflow Fixture State Model Plan",
  "native workflow fixture state model plan",
  "fixture state model plan",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference native workflow fixture state model plan.");

console.log("PASS: Native Workflow Fixture State Model Plan is planning-only, product-moving, and dry-run safe.");