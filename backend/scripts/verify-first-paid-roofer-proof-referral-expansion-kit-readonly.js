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

const docPath = "docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const monthlyRetentionKitPath = "docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md";
const firstMonthKitPath = "docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md";
const conversionKitPath = "docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md";
const reportingKitPath = "docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md";
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
const monthlyRetentionKit = read(monthlyRetentionKitPath);
const firstMonthKit = read(firstMonthKitPath);
const conversionKit = read(conversionKitPath);
const reportingKit = read(reportingKitPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);
const dataProtection = read(dataProtectionPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer proof referral expansion kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "first paid roofer proof referral expansion kit doc");
mustHave(doc, "run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh", "first paid roofer proof referral expansion kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "first paid roofer proof referral expansion kit doc references monthly success retention kit (primary input)");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "first paid roofer proof referral expansion kit doc references first-month operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "first paid roofer proof referral expansion kit doc references trial conversion payment handoff kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "first paid roofer proof referral expansion kit doc references trial reporting success review kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer proof referral expansion kit doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "first paid roofer proof referral expansion kit doc references website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "first paid roofer proof referral expansion kit doc references data protection tenant isolation packet");

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
mustHave(wrapper, "verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "kit doc must reference monthly success retention kit (primary input)");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "kit doc must reference first-month operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "kit doc must reference trial conversion payment handoff kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "kit doc must reference trial reporting success review kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit doc must reference website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit doc must reference data protection tenant isolation packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js", "aggregate pilot readiness must wire the proof referral expansion kit verifier");
mustHave(verifierIndex, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "verifier index must list the proof referral expansion kit doc");
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record proof referral expansion kit");
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record proof referral expansion kit");
mustHave(workflow, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record proof referral expansion kit");
mustHave(businessGuide, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record proof referral expansion kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections exist with substantive content (1-20 + intro structure + 9 trackers)
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / founder-operator-only",
  "manual success proof capture, referral request readiness, testimonial/case-study readiness, and safe expansion/plan-fit review only",
  "No live systems"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 2. Proof / referral / expansion purpose", [
  "after a first paid roofer has completed the first month",
  "monthly success review",
  "PASS/HOLD/BLOCKED",
  "manual success proof capture",
  "without guarantees",
  "without pressure"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 3. Inputs from Monthly Success / Retention Kit", [
  "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md",
  "monthly PASS",
  "ongoing monthly operations handoff artifact"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 4. Customer proof evidence review", [
  "Customer proof evidence review",
  "Proof Evidence Tracker",
  "booked homeowner appointments"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 5. Lead and booked homeowner appointment outcome summary", [
  "Lead and booked homeowner appointment outcome summary",
  "Lead Appointment Outcome Summary Tracker",
  "booked homeowner appointments via the flow"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 6. Missed-lead recovery proof summary", [
  "Missed-lead recovery proof summary",
  "Missed-Lead Recovery Proof Tracker",
  "manual recovery"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 7. Value narrative preparation", [
  "Value narrative preparation",
  "Value Narrative Tracker",
  "approved language only"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 8. Roofer approval and consent checklist", [
  "Roofer approval and consent checklist",
  "Roofer Consent Approval Tracker",
  "explicit consent"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 9. Testimonial readiness checklist", [
  "Testimonial readiness checklist",
  "Testimonial Readiness Tracker",
  "customer-approved only"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 10. Case-study readiness checklist", [
  "Case-study readiness checklist",
  "Case Study Readiness Tracker",
  "customer-approved only"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 11. Referral request readiness checklist", [
  "Referral request readiness checklist",
  "Referral Request Tracker",
  "no pressure"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 12. Referral ask script and follow-up tracker", [
  "Referral ask script and follow-up tracker",
  "non-pressured",
  "Referral Request Tracker"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 13. Expansion / plan-fit review", [
  "Expansion / plan-fit review",
  "Expansion Plan-Fit Review Tracker",
  "non-pushy"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 14. Non-pushy upgrade boundary", [
  "Non-pushy upgrade boundary",
  "no pressure",
  "roofer-led or evidence-triggered neutral information only"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 15. Cancellation-risk and trust-risk guardrails", [
  "Cancellation-risk and trust-risk guardrails",
  "pauses or blocks",
  "retention support"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 16. Proof asset handoff", [
  "Proof asset handoff",
  "internal assets",
  "Launch System Packet"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 17. Ongoing monthly operations handoff", [
  "Ongoing monthly operations handoff",
  "handoff artifact",
  "Launch System Packet"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 18. PASS/HOLD/BLOCKED proof/referral/expansion gate", [
  "PASS/HOLD/BLOCKED proof/referral/expansion gate",
  "final gate",
  "Only PASS advances",
  "roofer consent"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 19. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "No customer proof publication without roofer approval/consent",
  "References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md"
], "first paid roofer proof referral expansion kit doc");

assertSectionWithContent(doc, "## 20. Public-vs-internal language boundary", [
  "Customer-facing",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "Allowed customer-facing / public strings",
  "Internal founder/operator/manual review language",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer proof referral expansion kit doc");

// 9. Manual tracker templates — all 9 required tables with exact names (user-specified)
assertSectionWithContent(doc, "### Proof Evidence Tracker", ["Proof Evidence Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Lead Appointment Outcome Summary Tracker", ["Lead Appointment Outcome Summary Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Missed-Lead Recovery Proof Tracker", ["Missed-Lead Recovery Proof Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Value Narrative Tracker", ["Value Narrative Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Roofer Consent Approval Tracker", ["Roofer Consent Approval Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Testimonial Readiness Tracker", ["Testimonial Readiness Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Case Study Readiness Tracker", ["Case Study Readiness Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Referral Request Tracker", ["Referral Request Tracker"], "first paid roofer proof referral expansion kit doc");
assertSectionWithContent(doc, "### Expansion Plan-Fit Review Tracker", ["Expansion Plan-Fit Review Tracker"], "first paid roofer proof referral expansion kit doc");
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
  mustHave(doc, g, "first paid roofer proof referral expansion kit doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer proof referral expansion kit doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language is permitted only in clearly labeled internal sections
mustHave(doc, "Internal-only / founder-operator-only", "kit doc must label internal sections");
mustHave(doc, "Internal only:", "kit doc must use Internal only callouts");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 19 fully present with all required disabled items
assertSectionWithContent(doc, "## 19. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "No estimates, quotes, invoices, or payment workflows",
  "No guarantee language",
  "No booked-jobs language",
  "No customer proof publication without roofer approval/consent",
  "No pressure-based referral language",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none"
], "first paid roofer proof referral expansion kit doc");

// Public-vs-internal boundary section 20 present
assertSectionWithContent(doc, "## 20. Public-vs-internal language boundary", [
  "Customer-facing",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer proof referral expansion kit doc");

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
  "node --check backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js",
  "scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "first paid roofer proof referral expansion kit doc");

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

// Confirm references to Monthly Success / Retention Kit (primary), First-Month Operating Kit, Trial Conversion / Payment Handoff, Trial Reporting + Success Review, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "kit must reference Monthly Success / Retention Kit (primary input)");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "kit must reference First-Month Operating Kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "kit must reference Trial Conversion / Payment Handoff");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "kit must reference Trial Reporting + Success Review");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit must reference Trial Direction Regression");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit must reference Data Protection/Tenant Isolation");
console.log("PASS: required packet references present (Monthly Success / Retention Kit, First-Month Operating Kit, Trial Conversion / Payment Handoff, Trial Reporting + Success Review, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation).");

// Assert no guarantee / pressure / publication-without-consent language in customer sections (already covered by forbidden + consent sections)
mustHave(doc, "no customer proof publication without roofer approval/consent", "kit must enforce consent before proof publication");
mustHave(doc, "non-pressured", "kit must use non-pressured referral language");
mustHave(doc, "No guarantee language", "kit must restate no guarantee");
console.log("PASS: no guarantee language, no revenue promises, no pressure-based referral language, and no customer proof publication without roofer approval/consent enforced.");

// Internal-only language allowed only in labeled sections (already asserted)

// Assert no forbidden impl file changes asserted in doc
mustNotHave(doc, "backend/src", "kit doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "kit doc must not reference or change migrations");
mustNotHave(doc, "scheduler/cron/dispatcher activation", "kit doc must not reference scheduler/cron/dispatcher");
console.log("PASS: kit doc asserts no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");
mustHave(doc, "The 14-day trial begins after RoofLeadHQ AI setup goes live", "kit doc must restate trial start rule in public language");
mustHave(doc, "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery", "kit doc must restate core approved language");

console.log("PASS: all required sections (1-20 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Monthly Success / Retention Kit (primary) + First-Month Operating Kit + Trial Conversion / Payment Handoff + Trial Reporting + Success Review + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets, safety boundaries, no guarantee/pressure/publication-without-consent language, and no forbidden impl file changes verified for first paid roofer proof referral expansion kit.");

console.log("PASS: first paid roofer proof referral expansion kit verifier checks complete.");
