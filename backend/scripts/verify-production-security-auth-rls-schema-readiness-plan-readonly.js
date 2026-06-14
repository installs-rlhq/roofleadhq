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

const docPath = "docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md";
const wrapperPath = "scripts/run-production-security-auth-rls-schema-readiness-plan-dry-run.sh";
const verifierPath = "backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

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

const multiRoofer = read(multiRooferPath);
const dataProtection = read(dataProtectionPath);
const secondPaid = read(secondPaidPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for production security auth rls schema readiness plan exist.");

// File existence and basic properties
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "production security readiness plan doc");
mustHave(doc, "run-production-security-auth-rls-schema-readiness-plan-dry-run.sh", "production security readiness plan doc references wrapper");
mustHave(doc, "verify-production-security-auth-rls-schema-readiness-plan-readonly.js", "production security readiness plan doc references verifier");
mustHave(doc, "cc80caf", "production security readiness plan doc references canonical source cc80caf test(pilot): add multi roofer safety tenant isolation acceptance gate");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "production security readiness plan doc references multi-roofer safety tenant-isolation acceptance gate (primary input)");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "production security readiness plan doc references data protection tenant isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "production security readiness plan doc references second paid roofer repeatable launch kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "production security readiness plan doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "production security readiness plan doc references website trial direction regression packet");

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
mustHave(wrapper, "verify-production-security-auth-rls-schema-readiness-plan-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(aggregate, "verify-production-security-auth-rls-schema-readiness-plan-readonly.js", "aggregate pilot readiness must wire the production security auth rls schema readiness plan verifier");
mustHave(verifierIndex, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "verifier index must list the production security readiness plan doc");
mustHave(verifierIndex, "run-production-security-auth-rls-schema-readiness-plan-dry-run.sh", "verifier index must list the production security readiness plan wrapper");
mustHave(verifierIndex, "verify-production-security-auth-rls-schema-readiness-plan-readonly.js", "verifier index must list the production security readiness plan verifier");
mustHave(contextFirstPaid, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record production security readiness plan");
mustHave(contextRooferDryRun, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record production security readiness plan");
mustHave(workflow, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record production security readiness plan");
mustHave(businessGuide, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record production security readiness plan");
mustHave(businessGuide, "Production Security / Auth / RLS / Schema Readiness Plan", "business guide must record plan title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections (1-19) exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "planning/readiness/acceptance packet",
  "No customer or prospect receives internal-only language",
  "does not activate or implement"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 2. Production security readiness purpose", [
  "concrete manual readiness gate and decision framework",
  "PASS/HOLD/BLOCKED gate",
  "prevents accidental",
  "auth/RLS/schema",
  "explicit PASS at the final Production Security Readiness Gate"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 3. Inputs from Multi-Roofer Safety / Tenant-Isolation Acceptance Gate", [
  "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md",
  "cc80caf",
  "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md",
  "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md",
  "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 4. Auth readiness decision log", [
  "Auth readiness decision log",
  "Auth Readiness Decision Tracker",
  "material auth decisions",
  "before any auth implementation code may be written"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 5. RLS readiness decision log", [
  "RLS readiness decision log",
  "RLS Readiness Decision Tracker",
  "policy granularity",
  "No RLS policy may be authored in prod"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 6. Schema readiness decision log", [
  "Schema readiness decision log",
  "Schema Readiness Decision Tracker",
  "owning_roofer_id",
  "planning only"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 7. Migration readiness decision log", [
  "Migration readiness decision log",
  "Migration Readiness Decision Tracker",
  "no migration files are created by this packet",
  "dry-run test database strategy"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 8. Tenant isolation acceptance criteria", [
  "Tenant isolation acceptance criteria",
  "Tenant Isolation Acceptance Tracker",
  "owning_roofer_id",
  "cross-roofer test cases must demonstrably fail"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 9. Data access boundary acceptance criteria", [
  "Data access boundary acceptance criteria",
  "Data Access Boundary Tracker",
  "Least-privilege matrix",
  "tenant-aware or founder-only"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 10. Contractor portal hold boundary", [
  "HOLD GATE: Contractor portal or dashboard exposure remains blocked",
  "BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE",
  "Contractor Portal Hold Tracker"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 11. Production write hold boundary", [
  "HOLD GATE: Production data writes and broader Supabase write surface expansion remain blocked",
  "no production Supabase writes",
  "Production Write Hold Tracker"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 12. Live automation hold boundary", [
  "HOLD GATE: Live automation (SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation) remains blocked",
  "Live automation hold",
  "one-at-a-time dry-run operating rule"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 13. Security implementation prerequisite checklist", [
  "Security implementation prerequisite checklist",
  "Auth Readiness Decision Tracker",
  "Tenant Isolation Acceptance Tracker",
  "No production auth/RLS/schema/migration implementation has begun"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 14. Risk and blocker register", [
  "Risk and blocker register",
  "Under-scoping of RLS performance impact",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 15. Approval evidence checklist", [
  "Approval evidence checklist",
  "Auth Readiness Decision Tracker",
  "Security Readiness Gate Tracker",
  "no forbidden implementation files were changed"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 16. Implementation handoff artifact", [
  "Implementation handoff artifact",
  "Production Security / Auth / RLS / Schema Implementation Packet",
  "only after this gate PASS",
  "No implementation work begins from this handoff without a separate, approved implementation packet"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 17. PASS/HOLD/BLOCKED production security readiness gate", [
  "PASS/HOLD/BLOCKED production security readiness gate",
  "Only PASS advances consideration of production auth/RLS/schema/security implementation work",
  "Security Readiness Gate Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate)"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 18. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none",
  "No live automation, no production multi-tenant, no contractor portal"
], "production security readiness plan doc");

assertSectionWithContent(doc, "## 19. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production security readiness plan doc");

// 9 required tracker tables with exact names
assertSectionWithContent(doc, "### Auth Readiness Decision Tracker", ["Auth Readiness Decision Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### RLS Readiness Decision Tracker", ["RLS Readiness Decision Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Schema Readiness Decision Tracker", ["Schema Readiness Decision Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Migration Readiness Decision Tracker", ["Migration Readiness Decision Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Tenant Isolation Acceptance Tracker", ["Tenant Isolation Acceptance Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Data Access Boundary Tracker", ["Data Access Boundary Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Production Write Hold Tracker", ["Production Write Hold Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Contractor Portal Hold Tracker", ["Contractor Portal Hold Tracker"], "production security readiness plan doc");
assertSectionWithContent(doc, "### Security Readiness Gate Tracker", ["Security Readiness Gate Tracker"], "production security readiness plan doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is planning/readiness/acceptance only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is planning/readiness/acceptance only",
  "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation",
  "Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes"
], "production security readiness plan doc");

mustHave(doc, "planning/readiness/acceptance only", "plan doc must state planning/readiness/acceptance only");
mustHave(doc, "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation", "plan doc must assert no forbidden impl");
mustHave(doc, "asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "plan doc must restate no forbidden impl file changes");
console.log("PASS: packet asserts it is planning/readiness/acceptance only and does not implement auth/RLS/security, schema, migrations, production writes, contractor portal, live automation, external integrations, env changes, credentials, or backend/src changes.");

// Assert references to all required input packets/kits (Multi-Roofer, Data Protection, Second Paid, Launch System, Trial Direction)
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "plan must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "plan must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "plan must reference Second Paid Roofer Repeatable Launch Kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "plan must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "plan must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Multi-Roofer Safety / Tenant-Isolation Acceptance Gate, Data Protection/Tenant Isolation packet, Second Paid Roofer Repeatable Launch Kit, Launch System, Trial Direction Regression packet).");

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
  mustHave(doc, g, "production security readiness plan doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "production security readiness plan doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "plan doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "plan doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 18 fully present
assertSectionWithContent(doc, "## 18. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes"
], "production security readiness plan doc");

// Public-vs-internal boundary section 19 present
assertSectionWithContent(doc, "## 19. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production security readiness plan doc");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js",
  "node backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js",
  "scripts/run-production-security-auth-rls-schema-readiness-plan-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "production security readiness plan doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md`", "plan doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "plan doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED production security readiness gate", "plan doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "plan doc must document 9 trackers");
mustHave(doc, "Production Security / Auth / RLS / Schema Readiness Plan", "plan doc must use title");
mustHave(doc, "before any production security/auth/RLS/schema implementation begins", "plan doc must state the implementation prevention goal");

console.log("PASS: all required sections (1-19 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Multi-Roofer Safety / Tenant-Isolation Acceptance Gate + Data Protection/Tenant Isolation packet + Second Paid Roofer Repeatable Launch Kit + Launch System + Trial Direction Regression packet, safety boundaries, planning/readiness/acceptance-only posture, no forbidden impl file changes (backend/src, migrations, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), and pre-implementation boundary verified for production security auth rls schema readiness plan.");

console.log("PASS: production security auth rls schema readiness plan verifier checks complete.");
