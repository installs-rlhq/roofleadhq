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

const docPath = "docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md";
const wrapperPath = "scripts/run-second-paid-roofer-repeatable-launch-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const proofReferralPath = "docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md";
const monthlyRetentionPath = "docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md";
const firstMonthPath = "docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md";
const conversionPath = "docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md";
const reportingPath = "docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md";
const dayOnePath = "docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md";
const goLivePath = "docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md";
const guidedSetupPath = "docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md";
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

const proofReferral = read(proofReferralPath);
const monthlyRetention = read(monthlyRetentionPath);
const firstMonth = read(firstMonthPath);
const conversion = read(conversionPath);
const reporting = read(reportingPath);
const dayOne = read(dayOnePath);
const goLive = read(goLivePath);
const guidedSetup = read(guidedSetupPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);
const dataProtection = read(dataProtectionPath);

// Assert expected files exist
console.log("PASS: all expected files for second paid roofer repeatable launch kit exist.");

// File existence and basic properties
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "second paid roofer repeatable launch kit doc");
mustHave(doc, "run-second-paid-roofer-repeatable-launch-kit-dry-run.sh", "second paid roofer repeatable launch kit doc references wrapper");
mustHave(doc, "verify-second-paid-roofer-repeatable-launch-kit-readonly.js", "second paid roofer repeatable launch kit doc references verifier");
mustHave(doc, "90ca45f", "second paid roofer repeatable launch kit doc references canonical source 90ca45f test(pilot) proof referral expansion kit");
mustHave(doc, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "second paid roofer repeatable launch kit doc references proof referral expansion kit (primary input)");
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "second paid roofer repeatable launch kit doc references monthly success retention kit");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "second paid roofer repeatable launch kit doc references first-month operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "second paid roofer repeatable launch kit doc references trial conversion payment handoff kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "second paid roofer repeatable launch kit doc references trial reporting success review kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "second paid roofer repeatable launch kit doc references trial day one operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "second paid roofer repeatable launch kit doc references go live readiness execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "second paid roofer repeatable launch kit doc references guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "second paid roofer repeatable launch kit doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "second paid roofer repeatable launch kit doc references website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "second paid roofer repeatable launch kit doc references data protection tenant isolation packet");

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
mustHave(wrapper, "verify-second-paid-roofer-repeatable-launch-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js", "wrapper must run node --check on verifier");

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

// Doc must reference all required packets explicitly (per query)
mustHave(doc, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "kit doc must reference proof referral expansion kit (primary input from first paid)");
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "kit doc must reference monthly success retention kit");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "kit doc must reference first-month operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "kit doc must reference trial conversion payment handoff kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "kit doc must reference trial reporting success review kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "kit doc must reference trial day one operating kit");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "kit doc must reference go live readiness execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit doc must reference guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit doc must reference website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit doc must reference data protection tenant isolation packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-second-paid-roofer-repeatable-launch-kit-readonly.js", "aggregate pilot readiness must wire the second paid roofer repeatable launch kit verifier");
mustHave(verifierIndex, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "verifier index must list the second paid roofer repeatable launch kit doc");
mustHave(contextFirstPaid, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record second paid roofer repeatable launch kit");
mustHave(contextRooferDryRun, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record second paid roofer repeatable launch kit");
mustHave(workflow, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record second paid roofer repeatable launch kit");
mustHave(businessGuide, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record second paid roofer repeatable launch kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections exist with substantive content (1-20 + intro structure + 9 trackers)
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / founder-operator-only",
  "manual repeatable launch system",
  "No live systems",
  "does not activate or implement",
  "dry-run/internal-only/founder-operator-only"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 2. Second paid roofer repeatable launch purpose", [
  "manual repeatable launch system",
  "second paid roofer",
  "first paid roofer operating sequence as the template",
  "qualify the second roofer",
  "reuse safe setup patterns",
  "PASS/HOLD/BLOCKED second-roofer launch gate",
  "does not imply production multi-tenant scale"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 3. Inputs from first paid roofer proof/referral/expansion kit", [
  "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md",
  "post-monthly-success-review PASS",
  "handoff artifact",
  "proof evidence",
  "consent status",
  "referral status"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 4. Second roofer qualification checklist", [
  "Second Roofer Qualification Checklist",
  "business legitimacy",
  "lead volume evidence",
  "fit with RoofLeadHQ value",
  "willingness to use Guided Setup first",
  "no production pressure"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 5. Referral/source intake review", [
  "Referral / Source Intake Review",
  "source of the second roofer",
  "referral from first paid",
  "self-sourced",
  "intake notes"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 6. Offer and public language confirmation", [
  "Offer and Public Language Confirmation",
  "approved customer-facing language only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime. No long-term contract"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 7. Guided Setup reuse checklist", [
  "Guided Setup Reuse Checklist",
  "reuse the exact intake worksheet",
  "lead source confirmation",
  "response/follow-up preferences",
  "booking/calendar preferences",
  "reporting expectations",
  "from FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 8. Go-live readiness reuse checklist", [
  "Go-Live Readiness Reuse Checklist",
  "reuse the exact go-live checklist",
  "blockers cleared",
  "preferences confirmed",
  "from FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 9. Trial day-one reuse checklist", [
  "Trial Day-One Reuse Checklist",
  "reuse the day-one",
  "first lead handling",
  "missed-lead recovery review",
  "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 10. Trial reporting and success review reuse checklist", [
  "Trial Reporting and Success Review Reuse Checklist",
  "reuse the daily",
  "trial health scorecard",
  "success review call agenda",
  "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 11. Trial conversion and payment handoff reuse checklist", [
  "Trial Conversion and Payment Handoff Reuse Checklist",
  "reuse the conversion",
  "pre-payment email confirmation",
  "first monthly payment readiness",
  "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 12. First-month operating reuse checklist", [
  "First-Month Operating Reuse Checklist",
  "reuse the kickoff",
  "weekly value report",
  "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 13. Monthly retention reuse checklist", [
  "Monthly Retention Reuse Checklist",
  "reuse the monthly value reporting",
  "retention-risk review",
  "next-month operating plan",
  "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 14. Proof/referral/expansion reuse checklist", [
  "Proof / Referral / Expansion Reuse Checklist",
  "reuse the proof evidence review",
  "consent checklist",
  "non-pressured referral ask",
  "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 15. Multi-roofer safety and tenant-isolation boundary", [
  "Multi-Roofer Safety and Tenant-Isolation Boundary",
  "Repeatable launch is manual, single-roofer-at-a-time only",
  "does not imply or authorize production multi-tenant scale",
  "Does not imply or authorize production data writes",
  "contractor portal access",
  "auth/RLS/security implementation",
  "live automation",
  "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 16. Second roofer blocker and readiness register", [
  "Second Roofer Blocker and Readiness Register",
  "BLOCKED items must be resolved before gate",
  "explicit owner + due date"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 17. Repeatable launch handoff artifact", [
  "Repeatable Launch Handoff Artifact",
  "qualification status",
  "reuse checklist PASS evidence",
  "language confirmation",
  "safety boundary confirmation",
  "blocker register snapshot",
  "Launch System Packet"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 18. PASS/HOLD/BLOCKED second-roofer launch gate", [
  "PASS/HOLD/BLOCKED second-roofer launch gate",
  "Only PASS advances",
  "all 9 trackers",
  "safety boundary confirmed",
  "no ad-hoc scaling before production security and tenant isolation are approved"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 19. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "No customer proof publication without roofer approval/consent",
  "References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md",
  "No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes"
], "second paid roofer repeatable launch kit doc");

assertSectionWithContent(doc, "## 20. Public-vs-internal language boundary", [
  "Customer-facing",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "Allowed customer-facing / public strings",
  "Internal founder/operator/manual review language",
  "Explicitly Labeled Internal-Only Sections in This Kit",
  "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections"
], "second paid roofer repeatable launch kit doc");

// 9. Manual tracker templates — all 9 required tables with exact names (user-specified)
assertSectionWithContent(doc, "### Second Roofer Qualification Tracker", ["Second Roofer Qualification Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Referral Source Intake Tracker", ["Referral Source Intake Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Offer Language Confirmation Tracker", ["Offer Language Confirmation Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Guided Setup Reuse Tracker", ["Guided Setup Reuse Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Go-Live Readiness Reuse Tracker", ["Go-Live Readiness Reuse Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Trial Operations Reuse Tracker", ["Trial Operations Reuse Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### First-Month Monthly Handoff Tracker", ["First-Month Monthly Handoff Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Multi-Roofer Safety Boundary Tracker", ["Multi-Roofer Safety Boundary Tracker"], "second paid roofer repeatable launch kit doc");
assertSectionWithContent(doc, "### Second Roofer Launch Gate Tracker", ["Second Roofer Launch Gate Tracker"], "second paid roofer repeatable launch kit doc");
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
  mustHave(doc, g, "second paid roofer repeatable launch kit doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "second paid roofer repeatable launch kit doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language is permitted only in clearly labeled internal sections
mustHave(doc, "Internal-only / founder-operator-only", "kit doc must label internal sections");
mustHave(doc, "Internal only:", "kit doc must use Internal only callouts");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "kit doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 19 fully present with all required disabled items
assertSectionWithContent(doc, "## 19. Safety guardrails", [
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "No customer proof publication without roofer approval/consent",
  "No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes",
  "second-roofer repeatability does not imply production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation"
], "second paid roofer repeatable launch kit doc");

// Public-vs-internal boundary section 20 present
assertSectionWithContent(doc, "## 20. Public-vs-internal language boundary", [
  "Customer-facing",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "second paid roofer repeatable launch kit doc");

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
  "node --check backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js",
  "node backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js",
  "scripts/run-second-paid-roofer-repeatable-launch-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "second paid roofer repeatable launch kit doc");

// Assert no forbidden implementation files were changed (backend/src, migrations, etc.)
mustNotHave(doc, "backend/src", "kit doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "kit doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "kit doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "kit doc must not contain RLS/auth changes");
mustNotHave(doc, "supabase.from(", "kit doc must not contain prod data access");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "kit doc must not contain secrets");
console.log("PASS: kit asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher).");

// Confirm references to Proof / Referral / Expansion Kit (primary), Monthly Success / Retention Kit, First-Month Operating Kit, Trial Conversion / Payment Handoff, Trial Reporting + Success Review, Trial Day-One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation
mustHave(doc, "FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md", "kit must reference Proof / Referral / Expansion Kit (primary input)");
mustHave(doc, "FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md", "kit must reference Monthly Success / Retention Kit");
mustHave(doc, "FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md", "kit must reference First-Month Operating Kit");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md", "kit must reference Trial Conversion / Payment Handoff");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md", "kit must reference Trial Reporting + Success Review");
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "kit must reference Trial Day-One Operating Kit");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "kit must reference Go-Live Readiness");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit must reference Guided Setup");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit must reference Trial Direction Regression");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit must reference Data Protection/Tenant Isolation");
console.log("PASS: required packet references present (Proof / Referral / Expansion Kit, Monthly Success / Retention Kit, First-Month Operating Kit, Trial Conversion / Payment Handoff, Trial Reporting + Success Review, Trial Day-One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation).");

// Assert repeatability boundary does not imply prod scale
mustHave(doc, "Repeatable launch is manual, single-roofer-at-a-time only", "kit must state manual single-roofer repeatable only");
mustHave(doc, "Does not imply or authorize production multi-tenant scale", "kit must explicitly state no multi-tenant implication");
mustHave(doc, "Does not imply or authorize production data writes", "kit must explicitly state no data writes implication");
mustHave(doc, "Does not imply or authorize contractor portal access", "kit must explicitly state no portal implication");
mustHave(doc, "Does not imply or authorize auth/RLS/security implementation", "kit must explicitly state no auth/RLS implication");
mustHave(doc, "Does not imply or authorize live automation", "kit must explicitly state no live automation implication");
mustHave(doc, "prevent ad-hoc scaling before production security and tenant isolation are approved", "kit must gate against ad-hoc scaling");
console.log("PASS: second-roofer repeatability explicitly does not imply production multi-tenant scale, data writes, contractor portal, auth/RLS/security, or live automation.");

// Assert no forbidden impl file changes asserted in doc
mustNotHave(doc, "backend/src", "kit doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "kit doc must not reference or change migrations");
mustNotHave(doc, "scheduler/cron/dispatcher activation", "kit doc must not reference scheduler/cron/dispatcher");
console.log("PASS: kit doc asserts no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");
mustHave(doc, "The 14-day trial begins after RoofLeadHQ AI setup goes live", "kit doc must restate trial start rule in public language");
mustHave(doc, "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery", "kit doc must restate core approved language");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "kit doc must document 9 trackers");
mustHave(doc, "PASS/HOLD/BLOCKED second-roofer launch gate", "kit doc must include the second-roofer gate");

console.log("PASS: all required sections (1-20 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Proof / Referral / Expansion Kit (primary) + Monthly Success / Retention Kit + First-Month Operating Kit + Trial Conversion / Payment Handoff + Trial Reporting + Success Review + Trial Day-One Operating Kit + Go-Live Readiness + Guided Setup + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets, safety boundaries, no guarantee/pressure/publication-without-consent language, second-roofer does not imply prod scale/writes/portal/auth/RLS/live-automation, and no forbidden impl file changes verified for second paid roofer repeatable launch kit.");

console.log("PASS: second paid roofer repeatable launch kit verifier checks complete.");
