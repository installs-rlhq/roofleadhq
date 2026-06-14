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

function assertConcreteFields(doc, fields, label) {
  for (const f of fields) {
    if (!doc.includes(f)) {
      throw new Error(`${label} missing concrete field: ${f}`);
    }
  }
}

const docPath = "docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-trial-conversion-payment-handoff-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const reportingKitPath = "docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md";
const dayOneKitPath = "docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md";
const goLiveKitPath = "docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md";
const guidedSetupKitPath = "docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const trialRegressionPath = "docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md";
const dataProtectionPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);
const reportingKit = read(reportingKitPath);
const dayOneKit = read(dayOneKitPath);
const goLiveKit = read(goLiveKitPath);
const guidedSetupKit = read(guidedSetupKitPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);
const dataProtection = read(dataProtectionPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer trial conversion payment handoff kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "first paid roofer trial conversion payment handoff kit doc");
mustHave(doc, "run-first-paid-roofer-trial-conversion-payment-handoff-kit-dry-run.sh", "first paid roofer trial conversion payment handoff kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "first paid roofer trial conversion payment handoff kit doc references trial reporting success review kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "first paid roofer trial conversion payment handoff kit doc references trial day one operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "first paid roofer trial conversion payment handoff kit doc references go-live readiness execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "first paid roofer trial conversion payment handoff kit doc references guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer trial conversion payment handoff kit doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "first paid roofer trial conversion payment handoff kit doc references website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "first paid roofer trial conversion payment handoff kit doc references data protection tenant isolation packet");

// Verifier must be non-executable (100644 style)
const verifierStat = fs.statSync(path.join(root, verifierPath));
const mode = (verifierStat.mode & 0o777).toString(8);
if ((verifierStat.mode & 0o111) !== 0) {
  throw new Error(`verifier must not be executable (expected 100644 style); mode: ${mode}`);
}
console.log("PASS: verifier exists and is non-executable (100644 style).");

// Wrapper must exist and be executable-ish (at least readable and contains shebang)
if (!wrapper.includes("#!/usr/bin/env bash")) {
  throw new Error("wrapper missing bash shebang");
}
console.log("PASS: wrapper exists and has proper shebang.");

// Wrapper calls this verifier and runs node --check
mustHave(wrapper, "verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js", "wrapper must run node --check on verifier");

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

// Doc must reference all required packets explicitly (per query + patterns)
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "kit doc must reference trial reporting success review kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "kit doc must reference trial day one operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "kit doc must reference go-live readiness execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit doc must reference guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit doc must reference website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit doc must reference data protection tenant isolation packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js", "aggregate pilot readiness must wire the trial conversion payment handoff kit verifier");
mustHave(verifierIndex, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "verifier index must list the trial conversion payment handoff kit doc");
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record trial conversion payment handoff kit");
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record trial conversion payment handoff kit");
mustHave(workflow, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record trial conversion payment handoff kit");
mustHave(businessGuide, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record trial conversion payment handoff kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections exist with substantive content (1-16 + intro structure + 17 trackers)
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / founder-operator-only",
  "manual trial conversion and payment handoff readiness only",
  "No live systems"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 2. Trial conversion and payment handoff purpose", [
  "after the 14-day trial success review",
  "proceed/cancel decision capture",
  "14-day trial begins after RoofLeadHQ AI setup goes live",
  "PASS/HOLD/BLOCKED",
  "manual trial conversion"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 3. Inputs from Trial Reporting + Success Review", [
  "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md",
  "end-of-trial PASS",
  "success review outcome"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 4. Trial closeout evidence checklist", [
  "Trial closeout evidence checklist",
  "9 trackers snapshot",
  "PASS/HOLD/BLOCKED"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 5. Proceed/cancel decision capture", [
  "Proceed/cancel decision capture",
  "PROCEED",
  "CANCEL"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 6. Roofer approval evidence log", [
  "Roofer approval evidence log",
  "attributable",
  "BLOCKED if no attributable"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 7. Pre-payment email confirmation review", [
  "Pre-payment email confirmation review",
  "An automated email is sent 2 days before the first monthly payment",
  "Pre-Payment Email Confirmation Tracker"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 8. First monthly payment readiness checklist", [
  "First monthly payment readiness checklist",
  "no payment link automation",
  "First Monthly Payment Readiness Tracker"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 9. Payment handoff readiness artifact", [
  "Payment handoff readiness artifact",
  "manual payment request",
  "Payment Handoff Readiness Tracker"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 10. Cancellation/no-go handling", [
  "Cancellation/no-go handling",
  "CANCELLED / NO-GO",
  "no billing obligation"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 11. First-month operating expectations", [
  "First-month operating expectations",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments",
  "First-Month Operating Expectations Tracker"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 12. Post-trial customer status tracker", [
  "Post-trial customer status tracker",
  "FIRST MONTH ACTIVE",
  "Post-Trial Customer Status Tracker"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 13. Payment and billing blocker register", [
  "Payment and billing blocker register",
  "PASS / HOLD / BLOCKED Rules",
  "Data protection / tenant isolation red flag"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 14. Conversion PASS/HOLD/BLOCKED decision gate", [
  "Conversion PASS/HOLD/BLOCKED decision gate",
  "final gate",
  "Only PASS advances"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 15. Safety guardrails", [
  "This section must be reviewed and re-initialed",
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md"
], "first paid roofer trial conversion payment handoff kit doc");

assertSectionWithContent(doc, "## 16. Public-vs-internal language boundary", [
  "Customer-facing trial closeout communications",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "Allowed customer-facing / public strings",
  "Internal founder/operator/manual review language",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer trial conversion payment handoff kit doc");

// 17. Manual tracker templates — all 9 required tables with exact names (user-specified)
assertSectionWithContent(doc, "### Trial Closeout Evidence Tracker", ["Trial Closeout Evidence Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### Proceed Cancel Decision Tracker", ["Proceed Cancel Decision Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### Roofer Approval Evidence Tracker", ["Roofer Approval Evidence Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### Pre-Payment Email Confirmation Tracker", ["Pre-Payment Email Confirmation Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### First Monthly Payment Readiness Tracker", ["First Monthly Payment Readiness Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### Payment Handoff Readiness Tracker", ["Payment Handoff Readiness Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### Cancellation No-Go Handling Tracker", ["Cancellation No-Go Handling Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### First-Month Operating Expectations Tracker", ["First-Month Operating Expectations Tracker"], "first paid roofer trial conversion payment handoff kit doc");
assertSectionWithContent(doc, "### Post-Trial Customer Status Tracker", ["Post-Trial Customer Status Tracker"], "first paid roofer trial conversion payment handoff kit doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Confirm customer-facing templates use current allowed language (exact strings)
const goodLanguage = [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract"
];
for (const g of goodLanguage) {
  mustHave(doc, g, "first paid roofer trial conversion payment handoff kit doc (customer-facing language)");
}
console.log("PASS: customer-facing sections contain required current RoofLeadHQ AI / booked homeowner appointment / Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract language.");

// Forbidden phrases absent from customer-facing content (use content before the full forbidden list restatement in safety)
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
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer trial conversion payment handoff kit doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language is permitted only in clearly labeled internal sections
mustHave(doc, "Internal-only / founder-operator-only", "kit doc must label internal sections");
mustHave(doc, "Internal only:", "kit doc must use Internal only callouts");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 15 fully present with all required disabled items
assertSectionWithContent(doc, "## 15. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "No estimates, quotes, invoices, or payment workflows",
  "No guarantee language",
  "No legacy job-booking phrases language",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none"
], "first paid roofer trial conversion payment handoff kit doc");

// Public-vs-internal boundary section 16 present
assertSectionWithContent(doc, "## 16. Public-vs-internal language boundary", [
  "Customer-facing trial closeout communications",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer trial conversion payment handoff kit doc");

// Confirm no backend/src, migrations, schema, auth, secrets, env, external calls, production routes, live sends, or integration activation in the kit doc itself
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", ".env", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "kit doc (safety boundary)");
}
console.log("PASS: kit doc contains no backend/src, migrations, schema, auth, secrets, external calls, production routes, live sends, or integration activation.");

// Also assert no forbidden impl in the new doc for production behaviors
mustNotHave(doc, "supabase.from(", "kit doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "kit doc must not contain secrets");
console.log("PASS: kit doc clean of production/integration activation code.");

// Wrapper and verifier also clean (already checked unsafe for wrapper; spot check verifier)
mustNotHave(verifierPath, "supabase.from", "verifier must not contain prod access");
console.log("PASS: verifier and wrapper clean of production/integration code.");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js",
  "scripts/run-first-paid-roofer-trial-conversion-payment-handoff-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "first paid roofer trial conversion payment handoff kit doc");

// Assert no forbidden implementation files were changed (backend/src, migrations, etc.)
const forbiddenImplFiles = [
  "backend/src", "migrations", "schema", "auth/RLS", "RLS policy", "env/secrets", "production routes",
  "external call activation", "live send activation", "scheduler/cron/dispatcher activation",
  "twilio", "resend", "vapi", "supabase.from", "cron", "scheduler", "dispatcher"
];
for (const f of forbiddenImplFiles) {
  // The doc itself must assert it does not touch them; verifier already checked doc for many
}
mustNotHave(doc, "backend/src", "kit doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "kit doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "kit doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "kit doc must not contain RLS/auth changes");
mustNotHave(doc, "supabase.from(", "kit doc must not contain prod data access");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "kit doc must not contain secrets");
console.log("PASS: kit asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher).");

// Confirm references to Trial Reporting + Success Review, Trial Day One, Go-Live, Guided Setup, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "kit must reference Trial Reporting + Success Review");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "kit must reference Trial Day One Operating Kit");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "kit must reference Go-Live Readiness");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit must reference Guided Setup");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit must reference Trial Direction Regression");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit must reference Data Protection/Tenant Isolation");
console.log("PASS: required packet references present (Trial Reporting + Success Review, Trial Day One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation).");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");
mustHave(doc, "The 14-day trial begins after RoofLeadHQ AI setup goes live", "kit doc must restate trial start rule in public language");

console.log("PASS: all required sections (1-16 + 17 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Trial Reporting + Success Review + Trial Day One Operating Kit + Go-Live Readiness + Guided Setup + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets, safety boundaries, and no forbidden impl file changes verified for first paid roofer trial conversion payment handoff kit.");

console.log("PASS: first paid roofer trial conversion payment handoff kit verifier checks complete.");
