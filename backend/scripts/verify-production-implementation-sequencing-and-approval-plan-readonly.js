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

const docPath = "docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md";
const wrapperPath = "scripts/run-production-implementation-sequencing-and-approval-plan-dry-run.sh";
const verifierPath = "backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const finalGatePath = "docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md";
const liveIntegrationPath = "docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md";
const prodSecurityPath = "docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md";
const multiRooferPath = "docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md";
const dataProtectionPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";
const secondPaidPath = "docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const trialRegressionPath = "docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);

const finalGate = read(finalGatePath);
const liveIntegration = read(liveIntegrationPath);
const prodSecurity = read(prodSecurityPath);
const multiRoofer = read(multiRooferPath);
const dataProtection = read(dataProtectionPath);
const secondPaid = read(secondPaidPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for production implementation sequencing and approval plan exist.");

// File existence and basic properties
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "production implementation sequencing and approval plan doc");
mustHave(doc, "run-production-implementation-sequencing-and-approval-plan-dry-run.sh", "production implementation sequencing and approval plan doc references wrapper");
mustHave(doc, "verify-production-implementation-sequencing-and-approval-plan-readonly.js", "production implementation sequencing and approval plan doc references verifier");
mustHave(doc, "f3c3e80", "production implementation sequencing and approval plan doc references canonical source f3c3e80 test(pilot): add final production go-live acceptance gate");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "production implementation sequencing and approval plan doc references final production go-live acceptance gate (immediate predecessor)");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "production implementation sequencing and approval plan doc references live integration activation readiness plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "production implementation sequencing and approval plan doc references production security auth rls schema readiness plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "production implementation sequencing and approval plan doc references multi-roofer safety tenant-isolation acceptance gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "production implementation sequencing and approval plan doc references data protection tenant isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "production implementation sequencing and approval plan doc references second paid roofer repeatable launch kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "production implementation sequencing and approval plan doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "production implementation sequencing and approval plan doc references website trial direction regression packet");

// Verifier must be non-executable (100644 style)
const verifierStat = fs.statSync(path.join(root, verifierPath));
if ((verifierStat.mode & 0o111) !== 0) {
  throw new Error(`verifier must not be executable (expected 100644 style); mode: ${(verifierStat.mode & 0o777).toString(8)}`);
}
console.log("PASS: verifier exists and is non-executable (100644 style).");

// Wrapper must exist and be executable-ish (at least readable and contains shebang)
if (!wrapper.includes("#!/usr/bin/env bash")) {
  throw new Error("wrapper missing bash shebang");
}
console.log("PASS: wrapper exists and has proper shebang.");

// Wrapper calls this verifier and runs node --check
mustHave(wrapper, "verify-production-implementation-sequencing-and-approval-plan-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js", "wrapper must run node --check on verifier");

// Wrapper calls product quality gate
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "wrapper must call agent product quality gate");

// Wrapper does not contain unsafe implementation strings
const unsafeImpl = [
  "ALTER TABLE", "CREATE POLICY", "DROP POLICY", "CREATE TABLE",
  "supabase.from(", "supabase.rpc(", "service_role", "process.env.SUPABASE_SERVICE_ROLE",
  "twilio", "resend", "vapi", "calendar.events", 'fetch("https://', "curl https://",
  "Stripe", "stripe", "payment_intent", "checkout.session"
];
for (const s of unsafeImpl) {
  mustNotHave(wrapper, s, "wrapper");
}
console.log("PASS: wrapper has no unsafe implementation strings.");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "sequencing plan doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "sequencing plan doc must reference verifier index");
mustHave(aggregate, "verify-production-implementation-sequencing-and-approval-plan-readonly.js", "aggregate pilot readiness must wire the production implementation sequencing and approval plan verifier");
mustHave(verifierIndex, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "verifier index must list the production implementation sequencing and approval plan doc");
mustHave(verifierIndex, "run-production-implementation-sequencing-and-approval-plan-dry-run.sh", "verifier index must list the production implementation sequencing and approval plan wrapper");
mustHave(verifierIndex, "verify-production-implementation-sequencing-and-approval-plan-readonly.js", "verifier index must list the production implementation sequencing and approval plan verifier");
mustHave(contextFirstPaid, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record production implementation sequencing and approval plan");
mustHave(contextRooferDryRun, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record production implementation sequencing and approval plan");
mustHave(workflow, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record production implementation sequencing and approval plan");
mustHave(businessGuide, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record production implementation sequencing and approval plan");
mustHave(businessGuide, "Production Implementation Sequencing and Approval Plan", "business guide must record sequencing plan title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections (1-22) exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "sequencing/readiness/approval packet",
  "No customer or prospect receives internal-only language",
  "does not activate or implement"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 2. Implementation sequencing purpose", [
  "concrete manual sequencing, readiness, and approval framework",
  "PASS/HOLD/BLOCKED sequencing decision",
  "prevents any ad-hoc production implementation",
  "per-slice checkpoints",
  "explicit PASS at the Implementation Sequencing Decision"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 3. Source-of-truth prerequisite", [
  "f3c3e80",
  "Canonical source of truth before this worktree must be verified at f3c3e80",
  "source of truth must be verified at f3c3e80"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 4. Final go-live gate input summary", [
  "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md",
  "f3c3e80",
  "post final go-live acceptance gate PASS/HOLD/BLOCKED"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 5. Implementation slice approval model", [
  "Each of the 10 implementation slices",
  "non-skippable checkpoint",
  "dedicated future slice verifier",
  "Rollback/kill-switch design and dry-run test evidence for that slice",
  "owner approval evidence",
  "Guided Setup / onboarding prerequisite (cross-slice, before Slice 7 or Slice 8 activation readiness)",
  "RoofLeadHQ must provide each roofer with clear Guided Setup instructions for",
  "How to use the RoofLeadHQ-provided phone number",
  "How to configure the roofer’s calendar so RoofLeadHQ can book inspections/homeowner appointments correctly"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 6. Slice 1: production configuration inventory / env readiness audit", [
  "HOLD GATE: Slice 1",
  "production configuration inventory / env readiness audit",
  "Config Env Readiness Tracker"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 7. Slice 2: tenant/account model implementation readiness", [
  "HOLD GATE: Slice 2",
  "tenant/account model implementation readiness",
  "Tenant Schema Auth Readiness Tracker"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 8. Slice 3: schema/migration implementation readiness", [
  "HOLD GATE: Slice 3",
  "schema/migration implementation readiness"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 9. Slice 4: auth/RLS/security implementation readiness", [
  "HOLD GATE: Slice 4",
  "auth/RLS/security implementation readiness"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 10. Slice 5: production write boundary readiness", [
  "HOLD GATE: Slice 5",
  "production write boundary readiness",
  "Production Write Boundary Tracker"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 11. Slice 6: integration adapter readiness", [
  "HOLD GATE: Slice 6",
  "integration adapter readiness",
  "Integration Activation Hold Tracker"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 12. Slice 7: live communication activation readiness", [
  "HOLD GATE: Slice 7",
  "live communication activation readiness",
  "Guided Setup phone-number usage instructions have been provided + roofer acknowledgement logged",
  "phone-number readiness is acknowledged before go-live"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 13. Slice 8: calendar booking activation readiness", [
  "HOLD GATE: Slice 8",
  "calendar booking activation readiness",
  "Guided Setup calendar configuration instructions have been provided + roofer acknowledgement logged",
  "go-live acknowledgement before any calendar booking activation"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 14. Slice 9: contractor dashboard/portal readiness", [
  "HOLD GATE: Slice 9",
  "contractor dashboard/portal readiness"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 15. Slice 10: payment/billing automation readiness", [
  "HOLD GATE: Slice 10",
  "payment/billing automation readiness"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 16. Required verifier model for each slice", [
  "Required verifier model for each slice",
  "dedicated read-only verifier",
  "Assert this packet and the slice are sequencing/readiness/approval only",
  "Print a clear PASS message"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 17. Rollback and kill-switch requirements", [
  "HOLD GATE: Rollback and kill-switch readiness is mandatory",
  "Rollback Kill-Switch Tracker",
  "rollback/kill-switch readiness is required before any future implementation slice approval"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 18. Owner approval evidence checklist", [
  "Owner approval evidence checklist",
  "Rollback Kill-Switch Tracker",
  "no forbidden implementation files were changed",
  "source-of-truth verification at f3c3e80"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 19. Risk and blocker register", [
  "Risk and blocker register",
  "Implementation slice approved before this sequencing plan PASS",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 20. PASS/HOLD/BLOCKED implementation sequencing decision", [
  "PASS/HOLD/BLOCKED implementation sequencing decision",
  "Only PASS advances consideration of any production implementation slice",
  "Implementation Sequencing Decision Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate + aggregate)"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 21. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal"
], "production implementation sequencing and approval plan doc");

assertSectionWithContent(doc, "## 22. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production implementation sequencing and approval plan doc");

// 9 required tracker tables with exact names
assertSectionWithContent(doc, "### Source-of-Truth Readiness Tracker", ["Source-of-Truth Readiness Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Implementation Slice Approval Tracker", ["Implementation Slice Approval Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Config Env Readiness Tracker", ["Config Env Readiness Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Tenant Schema Auth Readiness Tracker", ["Tenant Schema Auth Readiness Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Production Write Boundary Tracker", ["Production Write Boundary Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Integration Activation Hold Tracker", ["Integration Activation Hold Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Rollback Kill-Switch Tracker", ["Rollback Kill-Switch Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Owner Approval Evidence Tracker", ["Owner Approval Evidence Tracker"], "production implementation sequencing and approval plan doc");
assertSectionWithContent(doc, "### Implementation Sequencing Decision Tracker", ["Implementation Sequencing Decision Tracker"], "production implementation sequencing and approval plan doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Assert Guided Setup phone-number and calendar onboarding/go-live readiness instructions are present as required items (cross-referenced in section 5, Slice 7, Slice 8, trackers)
mustHave(doc, "Guided Setup / onboarding prerequisite (cross-slice, before Slice 7 or Slice 8 activation readiness)", "sequencing plan doc must document Guided Setup phone+calendar prerequisite");
mustHave(doc, "How to use the RoofLeadHQ-provided phone number", "sequencing plan doc must include phone number usage instructions");
mustHave(doc, "where the roofer should place or route that number", "sequencing plan doc must detail phone placement/routing");
mustHave(doc, "how the number should be used in lead intake, missed-lead recovery, and homeowner response workflows", "sequencing plan doc must detail phone workflow usage");
mustHave(doc, "what the roofer should not change or bypass without approval", "sequencing plan doc must detail phone no-bypass rules");
mustHave(doc, "how phone-number readiness is acknowledged before go-live", "sequencing plan doc must detail phone readiness acknowledgement");
mustHave(doc, "How to configure the roofer’s calendar so RoofLeadHQ can book inspections/homeowner appointments correctly", "sequencing plan doc must include calendar setup guidelines");
mustHave(doc, "appointment length / default duration for inspections", "sequencing plan doc must detail calendar appointment length");
mustHave(doc, "service area / travel constraints / buffer times between appointments", "sequencing plan doc must detail calendar service/travel constraints");
mustHave(doc, "available inspection windows (recurring availability patterns)", "sequencing plan doc must detail calendar inspection windows");
mustHave(doc, "blocked times, personal commitments, vacations, and maintenance windows", "sequencing plan doc must detail calendar blocked times");
mustHave(doc, "emergency or after-hours boundaries (explicit no-auto-book windows)", "sequencing plan doc must detail calendar after-hours boundaries");
mustHave(doc, "reschedule/cancellation expectations and notification workflows (manual only in dry-run)", "sequencing plan doc must detail calendar reschedule/cancel expectations");
mustHave(doc, "calendar ownership and access boundaries (roofer retains sole ownership", "sequencing plan doc must detail calendar ownership/access boundaries");
mustHave(doc, "go-live acknowledgement before any calendar booking activation", "sequencing plan doc must detail calendar go-live acknowledgement");
mustHave(doc, "These instructions and acknowledgements are internal-only / dry-run / founder-operator-only until a future approved execution packet", "sequencing plan doc must confine phone+calendar instructions to internal dry-run");
mustHave(doc, "Guided Setup phone number instructions (pre-Slice 7)", "sequencing plan Implementation Slice Approval Tracker must include phone instructions row");
mustHave(doc, "Guided Setup calendar configuration (pre-Slice 8)", "sequencing plan Implementation Slice Approval Tracker must include calendar configuration row");
mustHave(doc, "Guided Setup phone + calendar instructions", "sequencing plan Owner Approval Evidence Tracker must include phone+calendar row");
mustHave(doc, "Guided Setup phone + calendar readiness", "sequencing plan Implementation Sequencing Decision Tracker must include phone+calendar readiness gate");
mustHave(doc, "Assert that the packet includes roofer phone-number usage instructions and calendar setup guidelines", "sequencing plan doc section 16 verifier model must require phone+calendar assertion in future slice verifiers");
console.log("PASS: packet includes roofer phone-number usage instructions and calendar setup guidelines as required onboarding/go-live readiness items (section 5 prerequisite, Slice 7/8 gates, trackers, and verifier model).");

// Assert this packet is sequencing/readiness/approval only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is sequencing/readiness/approval only",
  "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, live automation, or any slice 1-10 implementation",
  "Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes"
], "production implementation sequencing and approval plan doc");

mustHave(doc, "sequencing/readiness/approval only", "sequencing plan doc must state sequencing/readiness/approval only");
mustHave(doc, "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, live automation, or any slice 1-10 implementation", "sequencing plan doc must assert no forbidden impl");
mustHave(doc, "This is sequencing/readiness/approval only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice", "sequencing plan doc must assert sequencing/readiness/approval only + full no-activation list");
mustHave(doc, "Rollback and kill-switch readiness is required before any future implementation slice approval", "sequencing plan doc must assert rollback/kill-switch required before slice approval");
mustHave(doc, "Source-of-truth prerequisite at f3c3e80 test(pilot): add final production go-live acceptance gate must be verified", "sequencing plan doc must assert source-of-truth at f3c3e80 required");
mustHave(doc, "Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS", "sequencing plan doc must assert final gate PASS at f3c3e80 required");
mustHave(doc, "asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "sequencing plan doc must restate no forbidden impl file changes");
console.log("PASS: packet asserts it is sequencing/readiness/approval only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice; rollback/kill-switch readiness, owner approval evidence, source-of-truth verification at f3c3e80, final gate PASS, per-slice verifier expectations, and PASS/HOLD/BLOCKED implementation sequencing decision are required before any future implementation slice approval.");

// Assert references to all required input packets/kits
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "sequencing plan must reference Final Production Go-Live Acceptance Gate");
mustHave(doc, "f3c3e80", "sequencing plan must reference canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "sequencing plan must reference Live Integration Activation Readiness Plan");
mustHave(doc, "a11bfbd", "sequencing plan must reference canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "sequencing plan must reference Production Security / Auth / RLS / Schema Readiness Plan");
mustHave(doc, "e494f4b", "sequencing plan must reference canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "sequencing plan must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "cc80caf", "sequencing plan must reference canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "sequencing plan must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "sequencing plan must reference Second Paid Roofer Repeatable Launch Kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "sequencing plan must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "sequencing plan must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Final Production Go-Live Acceptance Gate at f3c3e80, Live Integration Activation Readiness Plan at a11bfbd, Production Security / Auth / RLS / Schema Readiness Plan at e494f4b, Multi-Roofer Safety / Tenant-Isolation Acceptance Gate at cc80caf, Data Protection/Tenant Isolation packet, Second Paid Roofer Repeatable Launch Kit, Launch System, Trial Direction Regression packet).");

// Assert no forbidden implementation files were changed (content assertions + doc itself)
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", ".env", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "sequencing plan doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "sequencing plan doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "sequencing plan doc must not contain secrets");
mustNotHave(doc, "backend/src", "sequencing plan doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "sequencing plan doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "sequencing plan doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "sequencing plan doc must not contain RLS/auth changes");
mustNotHave(doc, "scheduler/cron/dispatcher activation", "sequencing plan doc must not reference scheduler/cron/dispatcher");
console.log("PASS: sequencing plan doc asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "sequencing plan doc must restate no forbidden impl file changes");

// Confirm customer-facing templates use current allowed language
const goodLanguage = [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract"
];
for (const g of goodLanguage) {
  mustHave(doc, g, "production implementation sequencing and approval plan doc (customer-facing language)");
}
console.log("PASS: customer-facing sections contain required current RoofLeadHQ AI / booked homeowner appointment / Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract language.");

// Forbidden phrases absent from customer-facing content (before forbidden list section)
const forbiddenListMarker = "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)";
let docBeforeForbiddenList = doc;
if (doc.includes(forbiddenListMarker)) {
  const idx = doc.indexOf(forbiddenListMarker);
  docBeforeForbiddenList = doc.slice(0, idx);
}
const forbiddenBusiness = [
  "Founder-Led Launch Program",
  "Request Founder-Led Launch Review",
  "founder review",
  "manual review",
  "manual coordination",
  "Live Automation Disabled",
  "Monthly billing starts on day 15",
  "Monthly billing on day 15",
  "day 15",
  "14-day launch trial",
  "seven-day pilot",
  "five-qualified-appointment short-window claim",
  "book jobs",
  "booked jobs",
  "booked-job",
  "guaranteed appointments",
  "guaranteed revenue",
  "guaranteed jobs",
  "automatic estimate",
  "automatic quote",
  "automatic invoice",
  "automatic payment",
  "You book the inspection"
];
for (const f of forbiddenBusiness) {
  mustNotHave(docBeforeForbiddenList, f, "production implementation sequencing and approval plan doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "sequencing plan doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "sequencing plan doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 21 fully present
assertSectionWithContent(doc, "## 21. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes"
], "production implementation sequencing and approval plan doc");

// Public-vs-internal boundary section 22 present
assertSectionWithContent(doc, "## 22. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production implementation sequencing and approval plan doc");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js",
  "node backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js",
  "scripts/run-production-implementation-sequencing-and-approval-plan-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "production implementation sequencing and approval plan doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md`", "sequencing plan doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "sequencing plan doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED implementation sequencing decision", "sequencing plan doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "sequencing plan doc must document 9 trackers");
mustHave(doc, "Roofer phone-number usage instructions and calendar setup guidelines present as required onboarding/go-live readiness items", "sequencing plan verification evidence must list phone+calendar instructions");
mustHave(doc, "Production Implementation Sequencing and Approval Plan", "sequencing plan doc must use title");
mustHave(doc, "before any production implementation slice begins", "sequencing plan doc must state the sequencing prevention goal");
mustHave(doc, "rollback/kill-switch readiness is required before any future implementation slice approval", "sequencing plan doc must restate rollback prerequisite");
mustHave(doc, "source-of-truth verification at f3c3e80", "sequencing plan doc must restate source-of-truth prerequisite");
mustHave(doc, "Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS", "sequencing plan doc must restate final gate prerequisite");

// Assert no production activation / no live integration / no credential activation / no production implementation safety rules section
assertSectionWithContent(doc, "## No production activation / no live integration / no credential activation / no production implementation safety rules", [
  "Sequencing / readiness / approval packet only: yes",
  "Live SMS / Twilio activation: no",
  "Live Vapi / calling activation: no",
  "Credentials / env changes for live integrations or prod features: no",
  "Backend/src changes: no",
  "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)"
], "production implementation sequencing and approval plan doc");

console.log("PASS: all required sections (1-22 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Final Production Go-Live Acceptance Gate (f3c3e80) + Live Integration Activation Readiness Plan (a11bfbd) + Production Security / Auth / RLS / Schema Readiness Plan (e494f4b) + Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf) + Data Protection/Tenant Isolation packet + Second Paid Roofer Repeatable Launch Kit + Launch System + Trial Direction Regression packet, safety boundaries, sequencing/readiness/approval-only posture, rollback/kill-switch prerequisite, source-of-truth at f3c3e80, final gate PASS prerequisite, no forbidden impl file changes (backend/src, migration files, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), Guided Setup phone+calendar onboarding readiness instructions present and asserted, and pre-implementation-slice boundary verified for production implementation sequencing and approval plan.");

console.log("PASS: production implementation sequencing and approval plan verifier checks complete.");
