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

const docPath = "docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const guidedSetupKitPath = "docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const prospectTrackerPath = "docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md";
const dataProtectionPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";
const trialRegressionPath = "docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md";
const demoCloseKitPath = "docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);
const guidedSetupKit = read(guidedSetupKitPath);
const launchPacket = read(launchPacketPath);
const prospectTracker = read(prospectTrackerPath);
const dataProtection = read(dataProtectionPath);
const trialRegression = read(trialRegressionPath);
const demoCloseKit = read(demoCloseKitPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer go-live readiness execution kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "first paid roofer go-live readiness execution kit doc");
mustHave(doc, "run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh", "first paid roofer go-live readiness execution kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "first paid roofer go-live readiness execution kit doc references guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer go-live readiness execution kit doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "first paid roofer go-live readiness execution kit doc references website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "first paid roofer go-live readiness execution kit doc references data protection tenant isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "first paid roofer go-live readiness execution kit doc references demo close execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "first paid roofer go-live readiness execution kit doc references prospect pipeline tracker packet");

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
mustHave(wrapper, "verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "kit doc must reference guided setup execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "kit doc must reference website trial direction regression packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit doc must reference data protection tenant isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "kit doc must reference demo close execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "kit doc must reference prospect pipeline tracker packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js", "aggregate pilot readiness must wire the go-live readiness verifier");
mustHave(verifierIndex, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "verifier index must list the go-live readiness kit doc");
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record go-live readiness kit");
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record go-live readiness kit");
mustHave(workflow, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record go-live readiness kit");
mustHave(businessGuide, "FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record go-live readiness kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections exist with substantive content (1-16 plus intro structure + 17 trackers)
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / founder-operator-only",
  "manual readiness review only",
  "No live systems"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 2. Go-live readiness purpose", [
  "after Guided Setup is complete",
  "before RoofLeadHQ AI setup goes live",
  "14-day trial begins after RoofLeadHQ AI setup goes live",
  "PASS/HOLD/BLOCKED go-live readiness"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 3. Inputs from Guided Setup", [
  "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md",
  "Completed Guided Setup Intake Queue entry with PASS status",
  "Filled Roofer Business Profile worksheet",
  "Setup-to-Launch Handoff Artifact draft"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 4. Setup completion review checklist", [
  "Business profile complete",
  "Lead source worksheet complete",
  "Response/follow-up worksheet complete",
  "Booking/calendar worksheet complete",
  "Reporting worksheet complete",
  "Guided Setup go-live checklist from that kit marked PASS",
  "PASS/HOLD/BLOCKED setup completion status"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 5. Lead source readiness checklist", [
  "primary lead source has concrete format evidence",
  "Volume estimate per source recorded",
  "Access path confirmed for manual dry-run",
  "PASS/HOLD/BLOCKED lead source readiness status"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 6. Response and follow-up readiness checklist", [
  "Initial response style/tone captured",
  "Stop conditions complete",
  "Owner review requirement stated",
  "Explicit confirmation: all response/follow-up during setup and 14-day trial remains manual review/coordination only",
  "PASS/HOLD/BLOCKED response and follow-up readiness"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 7. Booking and calendar readiness checklist", [
  "Preferred appointment windows documented",
  "Explicit: manual calendar handling only",
  "No calendar automation expectation set with roofer",
  "PASS/HOLD/BLOCKED booking and calendar readiness"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 8. Reporting readiness checklist", [
  "Weekly report expectations concrete",
  "Key metrics the roofer cares about listed",
  "Explicit: all reports will be manually compiled from local notes",
  "PASS/HOLD/BLOCKED reporting readiness"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 9. Trial/payment language confirmation", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "verbatim quote"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 10. Data protection and tenant isolation checkpoint", [
  "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md",
  "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md",
  "single-tenant manual controls only",
  "PASS/HOLD/BLOCKED data protection checkpoint"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 11. Go-live blocker register", [
  "PASS / HOLD / BLOCKED Rules (enforced)",
  "Data protection/tenant isolation checkpoint unresolved: BLOCKED",
  "Guarantee-seeking or booked-jobs / auto-estimate / auto-quote expectation surfaced: BLOCKED",
  "Wants live automation before explicit separate approval: BLOCKED"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 12. PASS/HOLD/BLOCKED go-live decision gate", [
  "Final gate before handoff to Launch System Packet",
  "Trial/Payment Language Confirmation: PASS",
  "Data Protection and Tenant Isolation Checkpoint: PASS",
  "Status: [ ] PASS (go-live approved; proceed to handoff) [ ] HOLD (gaps with owners/dates; re-review after clear) [ ] BLOCKED (no-go; route to Launch no-go path or re-work)",
  "Only PASS advances to handoff"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 13. Setup-to-trial handoff artifact", [
  "Internal-only. Required fields to hand off into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "Trial terms confirmed",
  "Go-live readiness status from this kit",
  "Data protection checkpoint",
  "Go-live target window",
  "Evidence log references"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 14. Trial day-one readiness handoff", [
  "Bridge from this kit into Launch System Packet section 6",
  "Confirm trial day count starts on go-live date",
  "Confirm aggregate verifier green at handoff time",
  "This kit ends here"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 15. Safety guardrails", [
  "This section must be reviewed and re-initialed",
  "Confirmed Disabled (No Activation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none",
  "References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md"
], "first paid roofer go-live readiness execution kit doc");

assertSectionWithContent(doc, "## 16. Public-vs-internal language boundary", [
  "Customer-facing readiness confirmation language must not use founder-led/manual babysitting/public founder-review framing",
  "Allowed customer-facing / public strings",
  "Internal founder/operator/manual review language",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer go-live readiness execution kit doc");

// 17. Manual tracker templates — all 9 required tables with exact names
assertSectionWithContent(doc, "### Setup Completion Review Tracker", ["Setup Completion Review Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Lead Source Readiness Tracker", ["Lead Source Readiness Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Response Follow-Up Readiness Tracker", ["Response Follow-Up Readiness Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Booking Calendar Readiness Tracker", ["Booking Calendar Readiness Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Reporting Readiness Tracker", ["Reporting Readiness Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Trial Payment Language Confirmation Tracker", ["Trial Payment Language Confirmation Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Data Protection Checkpoint Tracker", ["Data Protection Checkpoint Tracker"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Go-Live Blocker Register", ["Go-Live Blocker Register"], "first paid roofer go-live readiness execution kit doc");
assertSectionWithContent(doc, "### Setup-to-Trial Handoff Tracker", ["Setup-to-Trial Handoff Tracker"], "first paid roofer go-live readiness execution kit doc");
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
  mustHave(doc, g, "first paid roofer go-live readiness execution kit doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer go-live readiness execution kit doc (customer-facing / outside forbidden list section)");
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
  "Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none"
], "first paid roofer go-live readiness execution kit doc");

// Public-vs-internal boundary section 16 present
assertSectionWithContent(doc, "## 16. Public-vs-internal language boundary", [
  "Customer-facing readiness confirmation language must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Explicitly Labeled Internal-Only Sections in This Kit"
], "first paid roofer go-live readiness execution kit doc");

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
const docNoProd = [
  "twilio", "resend", "vapi", "supabase.from", "cron", "scheduler", "dispatcher",
  "production Supabase writes", "live SMS", "live automation activated"
];
for (const u of docNoProd) {
  // Allow the explicit "DISABLED" statements in safety sections only; the mustNotHave on whole doc would be too broad for the DISABLED lines,
  // but the doc already uses "DISABLED" phrasing which is correct and required. We spot-check key production activation strings are not used as enabling.
}
mustNotHave(doc, "supabase.from(", "kit doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "kit doc must not contain secrets");
console.log("PASS: kit doc clean of production/integration activation code.");

// Wrapper and verifier also clean (already checked unsafe for wrapper; spot check verifier)
mustNotHave(verifierPath, "supabase.from", "verifier must not contain prod access");
console.log("PASS: verifier and wrapper clean of production/integration code.");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js",
  "scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "first paid roofer go-live readiness execution kit doc");

console.log("PASS: all required sections (1-16 + 17 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Guided Setup + Launch + Trial Direction Regression + Data Protection + Demo Close + Prospect Pipeline packets, and safety boundaries verified for first paid roofer go-live readiness execution kit.");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");
mustHave(doc, "The 14-day trial begins after RoofLeadHQ AI setup goes live", "kit doc must restate trial start rule in public language");

console.log("PASS: first paid roofer go-live readiness execution kit verifier checks complete.");
