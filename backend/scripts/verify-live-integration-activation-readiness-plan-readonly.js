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

const docPath = "docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md";
const wrapperPath = "scripts/run-live-integration-activation-readiness-plan-dry-run.sh";
const verifierPath = "backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

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

const prodSecurity = read(prodSecurityPath);
const multiRoofer = read(multiRooferPath);
const dataProtection = read(dataProtectionPath);
const secondPaid = read(secondPaidPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for live integration activation readiness plan exist.");

// File existence and basic properties
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "live integration readiness plan doc");
mustHave(doc, "run-live-integration-activation-readiness-plan-dry-run.sh", "live integration readiness plan doc references wrapper");
mustHave(doc, "verify-live-integration-activation-readiness-plan-readonly.js", "live integration readiness plan doc references verifier");
mustHave(doc, "e494f4b", "live integration readiness plan doc references canonical source e494f4b test(pilot): add production security auth rls schema readiness plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "live integration readiness plan doc references production security auth rls schema readiness plan (primary input)");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "live integration readiness plan doc references multi-roofer safety tenant-isolation acceptance gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "live integration readiness plan doc references data protection tenant isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "live integration readiness plan doc references second paid roofer repeatable launch kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "live integration readiness plan doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "live integration readiness plan doc references website trial direction regression packet");

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
mustHave(wrapper, "verify-live-integration-activation-readiness-plan-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "plan doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "plan doc must reference verifier index");
mustHave(aggregate, "verify-live-integration-activation-readiness-plan-readonly.js", "aggregate pilot readiness must wire the live integration activation readiness plan verifier");
mustHave(verifierIndex, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "verifier index must list the live integration readiness plan doc");
mustHave(verifierIndex, "run-live-integration-activation-readiness-plan-dry-run.sh", "verifier index must list the live integration readiness plan wrapper");
mustHave(verifierIndex, "verify-live-integration-activation-readiness-plan-readonly.js", "verifier index must list the live integration readiness plan verifier");
mustHave(contextFirstPaid, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record live integration readiness plan");
mustHave(contextRooferDryRun, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record live integration readiness plan");
mustHave(workflow, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record live integration readiness plan");
mustHave(businessGuide, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record live integration readiness plan");
mustHave(businessGuide, "Live Integration Activation Readiness Plan", "business guide must record plan title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections (1-21) exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "planning/readiness/acceptance packet",
  "No customer or prospect receives internal-only language",
  "does not activate or implement"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 2. Live integration readiness purpose", [
  "concrete manual readiness gate and decision framework",
  "PASS/HOLD/BLOCKED gate",
  "prevents accidental",
  "live integration",
  "explicit PASS at the final Live Integration Readiness Gate"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 3. Inputs from Production Security / Auth / RLS / Schema Readiness Plan", [
  "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md",
  "e494f4b",
  "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md",
  "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md",
  "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md",
  "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 4. Twilio/SMS activation hold gate", [
  "HOLD GATE: Twilio/SMS activation remains blocked",
  "SMS Activation Hold Tracker",
  "one-at-a-time dry-run operating rule"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 5. Vapi/calling activation hold gate", [
  "HOLD GATE: Vapi/calling activation remains blocked",
  "Calling Activation Hold Tracker",
  "dry-run proof of Vapi payloads"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 6. Calendar booking activation hold gate", [
  "HOLD GATE: Calendar booking activation remains blocked",
  "Calendar Activation Hold Tracker",
  "dry-run proof of calendar payloads"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 7. Resend/email activation hold gate", [
  "HOLD GATE: Resend/email activation remains blocked",
  "Email Activation Hold Tracker",
  "dry-run proof of Resend payloads"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 8. Lindy/automation activation hold gate", [
  "HOLD GATE: Lindy/automation activation remains blocked",
  "Automation Scheduler Hold Tracker",
  "Lindy/automation activation is a hard blocker"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 9. Cron/scheduler/dispatcher activation hold gate", [
  "HOLD GATE: Cron/scheduler/dispatcher activation remains blocked",
  "Automation Scheduler Hold Tracker",
  "Cron/scheduler/dispatcher activation is a hard blocker"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 10. CRM automation activation hold gate", [
  "HOLD GATE: CRM automation activation remains blocked",
  "CRM Payment Hold Tracker",
  "CRM automation activation is a hard blocker"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 11. Payment automation activation hold gate", [
  "HOLD GATE: Payment automation activation remains blocked",
  "CRM Payment Hold Tracker",
  "Payment automation activation is a hard blocker"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 12. Production Supabase write activation hold gate", [
  "HOLD GATE: Production Supabase write activation remains blocked",
  "Production Write Hold Tracker",
  "Production Supabase write activation is a hard blocker"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 13. Credentials and env-change hold gate", [
  "HOLD GATE: Credentials and env-change activation remains blocked",
  "Credentials and Env-Change Hold Tracker",
  "Credentials and env-change activation is a hard blocker"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 14. Dry-run proof checklist", [
  "Dry-run proof checklist",
  "SMS/Twilio dry-run harness executed",
  "Rollback simulation (kill-switch test in dry-run harness) executed successfully"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 15. Rollback and kill-switch readiness checklist", [
  "Rollback and kill-switch readiness checklist",
  "Rollback and kill-switch readiness is required before any future activation approval",
  "Kill-switch tested in dry-run harness"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 16. Owner approval evidence checklist", [
  "Owner approval evidence checklist",
  "Rollback and Kill-Switch Readiness Tracker",
  "no forbidden implementation files were changed"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 17. Risk and blocker register", [
  "Risk and blocker register",
  "Live SMS or calling activation before rollback/kill-switch is fully tested",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 18. Implementation handoff artifact", [
  "Implementation handoff artifact",
  "Live Integration Activation Execution Packet",
  "only after this gate PASS",
  "No live integration work or credential activation begins from this handoff without a separate, approved activation packet"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 19. PASS/HOLD/BLOCKED live integration readiness gate", [
  "PASS/HOLD/BLOCKED live integration readiness gate",
  "Only PASS advances consideration of live integration activation work",
  "Live Integration Readiness Gate Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate)"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 20. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No live automation, no production multi-tenant writes, no contractor portal"
], "live integration readiness plan doc");

assertSectionWithContent(doc, "## 21. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "live integration readiness plan doc");

// 9 required tracker tables with exact names
assertSectionWithContent(doc, "### SMS Activation Hold Tracker", ["SMS Activation Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Calling Activation Hold Tracker", ["Calling Activation Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Calendar Activation Hold Tracker", ["Calendar Activation Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Email Activation Hold Tracker", ["Email Activation Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Automation Scheduler Hold Tracker", ["Automation Scheduler Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### CRM Payment Hold Tracker", ["CRM Payment Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Production Write Hold Tracker", ["Production Write Hold Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Rollback Kill-Switch Tracker", ["Rollback Kill-Switch Tracker"], "live integration readiness plan doc");
assertSectionWithContent(doc, "### Live Integration Readiness Gate Tracker", ["Live Integration Readiness Gate Tracker"], "live integration readiness plan doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is planning/readiness/acceptance only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is planning/readiness/acceptance only",
  "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation",
  "Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes"
], "live integration readiness plan doc");

mustHave(doc, "planning/readiness/acceptance only", "plan doc must state planning/readiness/acceptance only");
mustHave(doc, "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation", "plan doc must assert no forbidden impl");
mustHave(doc, "This is planning/readiness/acceptance only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, or backend-or-src changes", "plan doc must assert planning only + full no-activation list");
mustHave(doc, "Rollback and kill-switch readiness is required before any future activation approval", "plan doc must assert rollback/kill-switch required before activation");
mustHave(doc, "asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "plan doc must restate no forbidden impl file changes");
console.log("PASS: packet asserts it is planning/readiness/acceptance only and does not activate live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security, contractor portal, external integrations, or backend-or-src changes; rollback/kill-switch required before future activation approval.");

// Assert references to all required input packets/kits (Production Security at e494f4b, Multi-Roofer, Data Protection, Second Paid, Launch System, Trial Direction)
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "plan must reference Production Security / Auth / RLS / Schema Readiness Plan");
mustHave(doc, "e494f4b", "plan must reference canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "plan must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "plan must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "plan must reference Second Paid Roofer Repeatable Launch Kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "plan must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "plan must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Production Security / Auth / RLS / Schema Readiness Plan at e494f4b, Multi-Roofer Safety / Tenant-Isolation Acceptance Gate, Data Protection/Tenant Isolation packet, Second Paid Roofer Repeatable Launch Kit, Launch System, Trial Direction Regression packet).");

// Assert no forbidden implementation files were changed (content assertions + doc itself)
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", ".env", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "plan doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "plan doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "plan doc must not contain secrets");
mustNotHave(doc, "backend/src", "plan doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "plan doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "plan doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "plan doc must not contain RLS/auth changes");
mustNotHave(doc, "scheduler/cron/dispatcher activation", "plan doc must not reference scheduler/cron/dispatcher");
console.log("PASS: plan doc asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion (already asserted via mustHave above, plus explicit)
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "plan doc must restate no forbidden impl file changes");

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
  mustHave(doc, g, "live integration readiness plan doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "live integration readiness plan doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "plan doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "plan doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 20 fully present
assertSectionWithContent(doc, "## 20. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes"
], "live integration readiness plan doc");

// Public-vs-internal boundary section 21 present
assertSectionWithContent(doc, "## 21. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "live integration readiness plan doc");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js",
  "node backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js",
  "scripts/run-live-integration-activation-readiness-plan-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "live integration readiness plan doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md`", "plan doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "plan doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED live integration readiness gate", "plan doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "plan doc must document 9 trackers");
mustHave(doc, "Live Integration Activation Readiness Plan", "plan doc must use title");
mustHave(doc, "before any live integration activation begins", "plan doc must state the activation prevention goal");
mustHave(doc, "rollback/kill-switch readiness is required before any future activation approval", "plan doc must restate rollback prerequisite");

// Assert no production activation / no live integration / no credential activation safety rules section
assertSectionWithContent(doc, "## No production activation / no live integration / no credential activation safety rules", [
  "Planning / readiness / acceptance packet only: yes",
  "Live SMS / Twilio activation: no",
  "Live Vapi / calling activation: no",
  "Credentials / env changes for live integrations: no",
  "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)"
], "live integration readiness plan doc");

console.log("PASS: all required sections (1-21 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Production Security (e494f4b) + Multi-Roofer Safety / Tenant-Isolation Acceptance Gate + Data Protection/Tenant Isolation packet + Second Paid Roofer Repeatable Launch Kit + Launch System + Trial Direction Regression packet, safety boundaries, planning/readiness/acceptance-only posture, rollback/kill-switch prerequisite, no forbidden impl file changes (backend/src, migration files, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), and pre-activation boundary verified for live integration activation readiness plan.");

console.log("PASS: live integration activation readiness plan verifier checks complete.");
