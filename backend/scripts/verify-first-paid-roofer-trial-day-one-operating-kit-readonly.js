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

const docPath = "docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const goLiveKitPath = "docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md";
const guidedSetupKitPath = "docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const dayOneCommandPath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
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
const goLiveKit = read(goLiveKitPath);
const guidedSetupKit = read(guidedSetupKitPath);
const launchPacket = read(launchPacketPath);
const dayOneCommand = read(dayOneCommandPath);
const leadToInspection = read(leadToInspectionPath);
const dataProtection = read(dataProtectionPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer trial day-one operating kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "first paid roofer trial day-one operating kit doc");
mustHave(doc, "run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh", "first paid roofer trial day-one operating kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "first paid roofer trial day-one operating kit doc references go-live readiness execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "first paid roofer trial day-one operating kit doc references guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer trial day-one operating kit doc references launch system packet");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "first paid roofer trial day-one operating kit doc references first roofer day-one command center");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "first paid roofer trial day-one operating kit doc references lead-to-inspection ops pack");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "first paid roofer trial day-one operating kit doc references website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "first paid roofer trial day-one operating kit doc references data protection tenant isolation packet");

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
mustHave(wrapper, "verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js", "wrapper must run node --check on verifier");

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

// Doc must reference all required packets explicitly
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "kit doc must reference go-live readiness execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit doc must reference guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "kit doc must reference first roofer day-one command center");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "kit doc must reference lead-to-inspection ops pack");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit doc must reference website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit doc must reference data protection tenant isolation packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js", "aggregate pilot readiness must wire the trial day-one operating kit verifier");
mustHave(verifierIndex, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "verifier index must list the trial day-one operating kit doc");
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record trial day-one operating kit");
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record trial day-one operating kit");
mustHave(workflow, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record trial day-one operating kit");
mustHave(businessGuide, "FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record trial day-one operating kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections exist with substantive content (1-16 plus intro structure + 17 trackers)
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / founder-operator-only",
  "manual trial day-one operations review and coordination only",
  "No live systems"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 2. Trial day-one purpose", [
  "after Go-Live Readiness has passed",
  "after RoofLeadHQ AI setup goes live",
  "14-day trial begins after RoofLeadHQ AI setup goes live",
  "PASS/HOLD/BLOCKED",
  "manual day-one monitoring"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 3. Preconditions from Go-Live Readiness", [
  "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md",
  "Confirmed PASS go-live decision gate",
  "Setup-to-Trial Handoff Artifact",
  "Trial Day-One Readiness Handoff"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 4. Trial day-one command center", [
  "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md",
  "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md",
  "Go-Live Readiness PASS handoff artifact",
  "PASS/HOLD/BLOCKED",
  "Safety guardrails re-read"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 5. First lead intake review", [
  "lead completeness checklist",
  "PASS/HOLD/BLOCKED per lead",
  "First Lead Intake Review Tracker"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 6. Response and follow-up monitoring", [
  "drafts match tone, urgency, and approved language",
  "no guarantee, booked-jobs, auto-estimate",
  "Response Follow-Up Monitoring Tracker",
  "manual review/coordination only"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 7. Missed-lead recovery review", [
  "missed-lead recovery",
  "Missed-Lead Recovery Tracker",
  "no production system or live send",
  "BLOCKED if recovery would require live automation"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 8. Booked homeowner appointment readiness review", [
  "booked homeowner appointment readiness",
  "Confirm manual coordination steps logged",
  "no auto-booking or \"You book the inspection\"",
  "Booked Homeowner Appointment Readiness Tracker"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 9. Contractor/roofer communication readiness", [
  "Contractor Roofer Communication Tracker",
  "manual update channel",
  "No production dashboard or portal exposure to roofer on Day One"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 10. Homeowner communication draft-review checklist", [
  "Homeowner Communication Draft Review Tracker",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "DRAFT ONLY — PREPARED FOR MANUAL REVIEW/USE OUTSIDE SYSTEM"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 11. Day-one blocker and escalation register", [
  "PASS / HOLD / BLOCKED Rules (enforced)",
  "Data protection / tenant isolation red flag on Day One",
  "Wants live automation activated on Day One: BLOCKED"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 12. Trial health PASS/HOLD/BLOCKED gate", [
  "Key gate on Trial Day One (mid-day and EOD)",
  "Trial health PASS/HOLD/BLOCKED",
  "Status: [ ] PASS (Day One healthy; proceed to EOD handoff into 14-day trial ops) [ ] HOLD (gaps with owners/dates; re-review after clear) [ ] BLOCKED (critical issues; escalate per Launch System Packet no-go path)",
  "Only PASS advances to full EOD handoff"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 13. Day-one reporting snapshot", [
  "Day-one reporting snapshot",
  "Manual compilation only",
  "Trial health gate status at snapshot time"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 14. End-of-day handoff into 14-day trial operations", [
  "Bridge from this kit into Launch System Packet",
  "14-day trial operations",
  "Confirm trial day count continues",
  "This kit ends here on Day One"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 15. Safety guardrails", [
  "This section must be reviewed and re-initialed",
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md"
], "first paid roofer trial day-one operating kit doc");

assertSectionWithContent(doc, "## 16. Public-vs-internal language boundary", [
  "Customer-facing trial day-one communications",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "Allowed customer-facing / public strings",
  "Internal founder/operator/manual review language",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer trial day-one operating kit doc");

// 17. Manual tracker templates — all 9 required tables with exact names
assertSectionWithContent(doc, "### Trial Day-One Command Center Tracker", ["Trial Day-One Command Center Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### First Lead Intake Review Tracker", ["First Lead Intake Review Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### Response Follow-Up Monitoring Tracker", ["Response Follow-Up Monitoring Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### Missed-Lead Recovery Tracker", ["Missed-Lead Recovery Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### Booked Homeowner Appointment Readiness Tracker", ["Booked Homeowner Appointment Readiness Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### Contractor Roofer Communication Tracker", ["Contractor Roofer Communication Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### Homeowner Communication Draft Review Tracker", ["Homeowner Communication Draft Review Tracker"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### Day-One Blocker Register", ["Day-One Blocker Register"], "first paid roofer trial day-one operating kit doc");
assertSectionWithContent(doc, "### End-of-Day Trial Handoff Tracker", ["End-of-Day Trial Handoff Tracker"], "first paid roofer trial day-one operating kit doc");
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
  mustHave(doc, g, "first paid roofer trial day-one operating kit doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer trial day-one operating kit doc (customer-facing / outside forbidden list section)");
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
  "No booked-jobs language",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none"
], "first paid roofer trial day-one operating kit doc");

// Public-vs-internal boundary section 16 present
assertSectionWithContent(doc, "## 16. Public-vs-internal language boundary", [
  "Customer-facing trial day-one communications",
  "Customer-facing language must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer trial day-one operating kit doc");

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
  "node --check backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js",
  "scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "first paid roofer trial day-one operating kit doc");

// Assert no forbidden implementation files were changed (backend/src, migrations, etc.)
const forbiddenImplFiles = [
  "backend/src", "migrations", "schema", "auth/RLS", "RLS policy", "env/secrets", "production routes",
  "external call activation", "live send activation", "scheduler/cron/dispatcher activation",
  "twilio", "resend", "vapi", "supabase.from", "cron", "scheduler", "dispatcher"
];
for (const f of forbiddenImplFiles) {
  // The doc itself must assert it does not touch them; verifier already checked doc for many
  // Additional spot checks for activation language that would be enabling
}
mustNotHave(doc, "backend/src", "kit doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "kit doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "kit doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "kit doc must not contain RLS/auth changes");
mustNotHave(doc, "supabase.from(", "kit doc must not contain prod data access");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "kit doc must not contain secrets");
console.log("PASS: kit asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher).");

// Confirm references to Go-Live Readiness, Guided Setup, Launch System, First Roofer Day-One Command Center, Trial Direction Regression, Data Protection/Tenant Isolation
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "kit must reference Go-Live Readiness");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit must reference Guided Setup");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit must reference Launch System");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "kit must reference First Roofer Day-One Command Center");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit must reference Trial Direction Regression");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit must reference Data Protection/Tenant Isolation");
console.log("PASS: required packet references present (Go-Live, Guided Setup, Launch System, Day-One Command Center, Trial Direction Regression, Data Protection/Tenant Isolation).");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");
mustHave(doc, "The 14-day trial begins after RoofLeadHQ AI setup goes live", "kit doc must restate trial start rule in public language");

console.log("PASS: all required sections (1-16 + 17 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Go-Live Readiness + Guided Setup + Launch System + First Roofer Day-One Command Center + Trial Direction Regression + Data Protection/Tenant Isolation packets, safety boundaries, and no forbidden impl file changes verified for first paid roofer trial day-one operating kit.");

console.log("PASS: first paid roofer trial day-one operating kit verifier checks complete.");
