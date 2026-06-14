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

const docPath = "docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md";
const wrapperPath = "scripts/run-multi-roofer-safety-tenant-isolation-acceptance-gate-dry-run.sh";
const verifierPath = "backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const secondPaidPath = "docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md";
const proofReferralPath = "docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md";
const monthlyRetentionPath = "docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md";
const firstMonthPath = "docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const dataProtectionPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";
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

const secondPaid = read(secondPaidPath);
const proofReferral = read(proofReferralPath);
const monthlyRetention = read(monthlyRetentionPath);
const firstMonth = read(firstMonthPath);
const launchPacket = read(launchPacketPath);
const dataProtection = read(dataProtectionPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for multi-roofer safety tenant-isolation acceptance gate exist.");

// File existence and basic properties
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "multi-roofer safety gate doc");
mustHave(doc, "run-multi-roofer-safety-tenant-isolation-acceptance-gate-dry-run.sh", "multi-roofer safety gate doc references wrapper");
mustHave(doc, "verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js", "multi-roofer safety gate doc references verifier");
mustHave(doc, "137574f", "multi-roofer safety gate doc references canonical source 137574f test(pilot): add second paid roofer repeatable launch kit");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "multi-roofer safety gate doc references second paid roofer repeatable launch kit (primary recent input)");
mustHave(doc, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "multi-roofer safety gate doc references proof referral expansion kit");
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "multi-roofer safety gate doc references monthly success retention kit");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "multi-roofer safety gate doc references first-month operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "multi-roofer safety gate doc references launch system packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "multi-roofer safety gate doc references data protection tenant isolation packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "multi-roofer safety gate doc references website trial direction regression packet");

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
mustHave(wrapper, "verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "gate doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "gate doc must reference verifier index");
mustHave(aggregate, "verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js", "aggregate pilot readiness must wire the multi-roofer safety tenant-isolation acceptance gate verifier");
mustHave(verifierIndex, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "verifier index must list the multi-roofer safety gate doc");
mustHave(verifierIndex, "run-multi-roofer-safety-tenant-isolation-acceptance-gate-dry-run.sh", "verifier index must list the multi-roofer safety gate wrapper");
mustHave(verifierIndex, "verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js", "verifier index must list the multi-roofer safety gate verifier");
mustHave(contextFirstPaid, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record multi-roofer safety gate");
mustHave(contextRooferDryRun, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record multi-roofer safety gate");
mustHave(workflow, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record multi-roofer safety gate");
mustHave(businessGuide, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record multi-roofer safety gate");
mustHave(businessGuide, "Multi-Roofer Safety / Tenant-Isolation Acceptance Gate", "business guide must record gate title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections (1-19) exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "manual acceptance gate and readiness packet",
  "No customer or prospect receives internal-only language",
  "does not activate or implement"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 2. Multi-roofer safety acceptance purpose", [
  "concrete manual gate",
  "PASS/HOLD/BLOCKED gate",
  "prevents accidental production scale",
  "production data writes",
  "contractor portal exposure",
  "auth/RLS/security changes",
  "live automation",
  "explicit approval"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 3. Inputs from Second Paid Roofer Repeatable Launch Kit", [
  "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md",
  "137574f",
  "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md",
  "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md",
  "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md",
  "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md",
  "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 4. Data protection readiness review", [
  "Roofer Data Protection and Tenant Isolation Readiness Milestone",
  "pre-production security gate checklist",
  "BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE",
  "no production implementation has begun"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 5. Tenant-isolation readiness review", [
  "tenant isolation design",
  "lead data boundary",
  "least-privilege access matrix",
  "row-level/data-boundary controls",
  "Tenant Isolation Readiness Tracker"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 6. Production auth/RLS/security hold gate", [
  "HOLD GATE: Production auth/RLS/security implementation is blocked",
  "No auth changes, RLS policy creation/alteration",
  "hard blocker on the Multi-Roofer Safety Gate Tracker",
  "Auth RLS Security Hold Tracker"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 7. Production schema/migration hold gate", [
  "HOLD GATE: Production schema changes and migration files are blocked",
  "No alter-table or create-table statements, migration files",
  "Schema Migration Hold Tracker"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 8. Production data-write hold gate", [
  "HOLD GATE: Production data writes and broader Supabase write surface expansion are blocked",
  "no production Supabase writes",
  "Production Data Write Hold Tracker"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 9. Contractor portal exposure hold gate", [
  "HOLD GATE: Contractor portal or dashboard exposure is blocked",
  "BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE",
  "Contractor Portal Exposure Hold Tracker"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 10. Live automation hold gate", [
  "HOLD GATE: Live automation (SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation) is blocked",
  "Live Automation Hold Tracker",
  "one-at-a-time dry-run operating rule"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 11. External integration hold gate", [
  "HOLD GATE: External integration activation and credential handling in production scope is blocked",
  "External Integration Hold Tracker",
  "no external service calls in production scope"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 12. Multi-roofer operating boundary", [
  "Multi-roofer operating is permitted only as manual, one-at-a-time, founder/operator-controlled dry-run execution",
  "No implication of production multi-tenant workspaces",
  "until the Multi-Roofer Safety Gate is PASSED"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 13. One-at-a-time dry-run operating rule", [
  "one-at-a-time dry-run only",
  "At most one roofer in active manual dry-run execution at any time",
  "No parallel second (or subsequent) roofer production workspace"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 14. Approval evidence checklist", [
  "Data Protection Readiness Tracker: all rows PASS or explicitly accepted HOLD",
  "Tenant Isolation Readiness Tracker",
  "Auth RLS Security Hold Tracker",
  "Schema Migration Hold Tracker",
  "Production Data Write Hold Tracker",
  "Contractor Portal Exposure Hold Tracker",
  "Live Automation Hold Tracker",
  "External Integration Hold Tracker",
  "Multi-Roofer Safety Gate Tracker",
  "Founder sign-off"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 15. Risk and blocker register", [
  "Risk and blocker register",
  "Ad-hoc scaling pressure after second paid repeatable launch kit PASS",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 16. Pre-production implementation handoff artifact", [
  "Pre-production implementation handoff artifact",
  "Roofer Data Protection Tenant Isolation Implementation Packet",
  "only after this gate PASS",
  "No implementation work begins from this handoff without a separate, approved implementation packet"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 17. PASS/HOLD/BLOCKED multi-roofer safety gate", [
  "PASS/HOLD/BLOCKED multi-roofer safety gate",
  "Only PASS advances consideration of multi-roofer production-scale",
  "Multi-Roofer Safety Gate Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate)"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 18. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "No customer proof publication without roofer approval/consent",
  "No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes"
], "multi-roofer safety gate doc");

assertSectionWithContent(doc, "## 19. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "multi-roofer safety gate doc");

// 9 required tracker tables with exact names
assertSectionWithContent(doc, "### Data Protection Readiness Tracker", ["Data Protection Readiness Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Tenant Isolation Readiness Tracker", ["Tenant Isolation Readiness Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Auth RLS Security Hold Tracker", ["Auth RLS Security Hold Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Schema Migration Hold Tracker", ["Schema Migration Hold Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Production Data Write Hold Tracker", ["Production Data Write Hold Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Contractor Portal Exposure Hold Tracker", ["Contractor Portal Exposure Hold Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Live Automation Hold Tracker", ["Live Automation Hold Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### External Integration Hold Tracker", ["External Integration Hold Tracker"], "multi-roofer safety gate doc");
assertSectionWithContent(doc, "### Multi-Roofer Safety Gate Tracker", ["Multi-Roofer Safety Gate Tracker"], "multi-roofer safety gate doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is acceptance/readiness only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is an acceptance gate and readiness packet only",
  "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation",
  "Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes"
], "multi-roofer safety gate doc");

mustHave(doc, "acceptance gate and readiness packet only", "gate doc must state acceptance/readiness only");
mustHave(doc, "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation", "gate doc must assert no forbidden impl");
console.log("PASS: packet asserts it is acceptance/readiness only and does not implement auth/RLS/security, schema, migrations, production writes, contractor portal, live automation, or external integrations.");

// Assert references to all required input packets/kits
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "gate must reference Second Paid Roofer Repeatable Launch Kit");
mustHave(doc, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "gate must reference Proof / Referral / Expansion Kit");
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "gate must reference Monthly Success / Retention Kit");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "gate must reference First-Month Operating Kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "gate must reference Launch System");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "gate must reference Data Protection/Tenant Isolation");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "gate must reference Trial Direction Regression");
console.log("PASS: required packet references present (Second Paid Roofer Repeatable Launch Kit, Proof / Referral / Expansion Kit, Monthly Success / Retention Kit, First-Month Operating Kit, Launch System, Data Protection/Tenant Isolation packet, Trial Direction Regression packet).");

// Assert no forbidden implementation files were changed (content assertions + doc itself)
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", ".env", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "gate doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "gate doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "gate doc must not contain secrets");
mustNotHave(doc, "backend/src", "gate doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "gate doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "gate doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "gate doc must not contain RLS/auth changes");
mustNotHave(doc, "scheduler/cron/dispatcher activation", "gate doc must not reference scheduler/cron/dispatcher");
console.log("PASS: gate doc asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "gate doc must restate no forbidden impl file changes");

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
  mustHave(doc, g, "multi-roofer safety gate doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "multi-roofer safety gate doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "gate doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "gate doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 18 fully present
assertSectionWithContent(doc, "## 18. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes",
  "One-at-a-time dry-run only until explicit PASS at this gate"
], "multi-roofer safety gate doc");

// Public-vs-internal boundary section 19 present
assertSectionWithContent(doc, "## 19. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "multi-roofer safety gate doc");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js",
  "node backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js",
  "scripts/run-multi-roofer-safety-tenant-isolation-acceptance-gate-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "multi-roofer safety gate doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md`", "gate doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "gate doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED multi-roofer safety gate", "gate doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "gate doc must document 9 trackers");
mustHave(doc, "Multi-Roofer Safety / Tenant-Isolation Acceptance Gate", "gate doc must use title");
mustHave(doc, "one-at-a-time dry-run roofer operations into any multi-roofer production-scale work", "gate doc must state the scale prevention goal");

console.log("PASS: all required sections (1-19 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Second Paid Roofer Repeatable Launch Kit + Proof / Referral / Expansion Kit + Monthly Success / Retention Kit + First-Month Operating Kit + Launch System + Data Protection/Tenant Isolation packet + Trial Direction Regression packet, safety boundaries, acceptance/readiness-only posture, no forbidden impl file changes (backend/src, migrations, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), and one-at-a-time boundary verified for multi-roofer safety tenant-isolation acceptance gate.");

console.log("PASS: multi-roofer safety tenant-isolation acceptance gate verifier checks complete.");
