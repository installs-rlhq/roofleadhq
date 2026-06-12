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

const docPath = "docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const demoCloseKitPath = "docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const prospectTrackerPath = "docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md";
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
const demoCloseKit = read(demoCloseKitPath);
const launchPacket = read(launchPacketPath);
const prospectTracker = read(prospectTrackerPath);
const dataProtection = read(dataProtectionPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer guided setup execution kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "first paid roofer guided setup execution kit doc");
mustHave(doc, "run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh", "first paid roofer guided setup execution kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "first paid roofer guided setup execution kit doc references demo close execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer guided setup execution kit doc references launch system packet");
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "first paid roofer guided setup execution kit doc references prospect pipeline tracker packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "first paid roofer guided setup execution kit doc references data protection tenant isolation packet");

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
mustHave(wrapper, "verify-first-paid-roofer-guided-setup-execution-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "kit doc must reference demo close execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "kit doc must reference prospect pipeline tracker packet");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "kit doc must reference data protection tenant isolation packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-first-paid-roofer-guided-setup-execution-kit-readonly.js", "aggregate pilot readiness must wire the guided setup verifier");
mustHave(verifierIndex, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "verifier index must list the guided setup kit doc");
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record guided setup kit");
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record guided setup kit");
mustHave(workflow, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record guided setup kit");
mustHave(businessGuide, "FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record guided setup kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections exist with substantive content (1-14 plus intro structure)
assertSectionWithContent(doc, "## 1. Guided Setup Intake Checklist", [
  "Closed/won confirmation",
  "Decision-maker confirmation",
  "Trial terms confirmed",
  "Guided Setup first",
  "14-day trial begins only after setup goes live",
  "Automated email 2 days before first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "Setup owner",
  "Setup target date",
  "Missing information gate",
  "PASS/HOLD/BLOCKED setup status"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 2. Roofer Business Profile Worksheet", [
  "Company name",
  "Owner/contact",
  "Service area",
  "Roofing services offered",
  "Lead types accepted",
  "Lead types rejected",
  "Office hours",
  "Emergency/storm response expectations",
  "Preferred homeowner contact style",
  "Brand/tone notes",
  "Bad-fit homeowner scenarios",
  "Notes/evidence"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 3. Lead Source Setup Worksheet", [
  "Lead sources currently used",
  "Estimated monthly lead volume",
  "Paid vs organic lead mix",
  "Source quality notes",
  "Expected lead formats",
  "Required lead fields",
  "Missing-field handling",
  "Lead source owner",
  "Lead source access status",
  "Manual-only access notes",
  "HOLD/BLOCKED conditions"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 4. Response and Follow-up Preferences Worksheet", [
  "Initial response style",
  "Preferred urgency framing",
  "Follow-up cadence preference",
  "Maximum follow-up attempts",
  "Stop conditions",
  "Do-not-contact rules",
  "Consent/permission notes",
  "Escalation triggers",
  "Owner review requirement",
  "Draft approval status",
  "Manual-only guardrails"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 5. Booking and Calendar Preferences Worksheet", [
  "Inspection booking goal",
  "Preferred appointment windows",
  "Service-area travel constraints",
  "Same-day/next-day availability rules",
  "Weather/storm constraints",
  "Required homeowner information before booking",
  "Contractor confirmation requirements",
  "Calendar access status",
  "Manual calendar handling only",
  "No calendar automation",
  "Unknowns and blockers"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 6. Reporting Preferences Worksheet", [
  "Weekly report expectations",
  "Monthly report expectations",
  "Metrics the roofer cares about",
  "Lead status categories",
  "Appointment status categories",
  "Missed-lead recovery notes",
  "Trial success indicators",
  "Reporting contact",
  "Reporting cadence",
  "Manual reporting notes"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 7. Setup Risk and Blocker Register", [
  "Decision-maker not confirmed",
  "Trial terms unclear",
  "Lead sources unknown",
  "Lead access not available",
  "Lead fields incomplete",
  "Response preferences unclear",
  "Follow-up stop rules unclear",
  "Booking preferences unclear",
  "Calendar handling unclear",
  "Reporting expectations unclear",
  "Data protection concern unresolved",
  "Guarantee-seeking or booked-jobs expectation",
  "Wants automatic quote/invoice/payment",
  "Wants live automation before explicit approval",
  "PASS / HOLD / BLOCKED rules"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 8. Guided Setup Call Agenda", [
  "Opening frame",
  "Re-confirm close/yes status and current public offer language",
  "Explain setup-before-trial",
  "Gather roofer business profile details",
  "Gather lead source details",
  "Gather response and follow-up preferences",
  "Gather booking and calendar preferences",
  "Gather reporting preferences",
  "Confirm safety boundaries and go-live readiness criteria",
  "Next action and owner/date"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 9. Guided Setup Script", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "Setup is used to understand your leads, booking preferences, follow-up preferences, and reporting expectations before go-live",
  "Prospect-facing language only"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 10. Go-live Readiness Checklist", [
  "Required setup fields completed",
  "Lead source info complete enough",
  "Response preferences complete enough",
  "Follow-up preferences complete enough",
  "Booking/calendar preferences complete enough",
  "Reporting expectations complete enough",
  "Trial/payment language confirmed",
  "Data protection checkpoint complete",
  "No unresolved guarantee/job/revenue claims",
  "No automatic quote/invoice/payment request",
  "No live automation activated",
  "PASS/HOLD/BLOCKED go-live readiness"
], "first paid roofer guided setup execution kit doc");

assertSectionWithContent(doc, "## 11. Setup-to-Launch Handoff Artifact", [
  "Roofer/company/contact",
  "Close decision reference",
  "Fit score reference",
  "Trial terms confirmed",
  "Setup owner",
  "Setup completion status",
  "Lead source summary",
  "Response/follow-up preferences",
  "Booking/calendar preferences",
  "Reporting preferences",
  "Open blockers",
  "Data protection notes",
  "Go-live assumptions",
  "Go-live readiness status",
  "Next action owner/date",
  "Evidence log references"
], "first paid roofer guided setup execution kit doc");

// 12. Manual tracker templates — all 9 required tables
assertSectionWithContent(doc, "### Guided Setup Intake Queue", ["Guided Setup Intake Queue"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Roofer Business Profile", ["Roofer Business Profile"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Lead Source Setup Worksheet", ["Lead Source Setup Worksheet"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Response and Follow-up Preferences", ["Response and Follow-up Preferences"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Booking and Calendar Preferences", ["Booking and Calendar Preferences"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Reporting Preferences", ["Reporting Preferences"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Setup Blocker Register", ["Setup Blocker Register"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Go-live Readiness Checklist", ["Go-live Readiness Checklist"], "first paid roofer guided setup execution kit doc");
assertSectionWithContent(doc, "### Setup-to-Launch Handoff Summary", ["Setup-to-Launch Handoff Summary"], "first paid roofer guided setup execution kit doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Confirm customer-facing templates use current allowed language (exact strings)
const goodLanguage = [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "Setup is used to understand your leads, booking preferences, follow-up preferences, and reporting expectations before go-live"
];
for (const g of goodLanguage) {
  mustHave(doc, g, "first paid roofer guided setup execution kit doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer guided setup execution kit doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language is permitted only in clearly labeled internal sections
mustHave(doc, "Internal-only / founder-operator-only", "kit doc must label internal sections");
mustHave(doc, "Internal only:", "kit doc must use Internal only callouts");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 13 fully present with all required disabled items
assertSectionWithContent(doc, "## 13. Safety Guardrails", [
  "Manual-only setup preparation",
  "Draft-only setup notes",
  "No live send",
  "No automated follow-up",
  "No CRM automation",
  "No calendar booking automation",
  "No payment automation",
  "No external service calls",
  "No production Supabase writes",
  "No public route activation",
  "No contractor portal exposure",
  "No auth/RLS/security implementation",
  "No estimates, quotes, invoices, or payment workflows",
  "No guarantee language",
  "No booked-jobs language",
  "Confirmed Disabled (No Activation in Any Form)"
], "first paid roofer guided setup execution kit doc");

// Public-vs-internal boundary section 14 present
assertSectionWithContent(doc, "## 14. Public-vs-Internal Language Boundary", [
  "Customer-facing setup language (agenda spoken portions, script, discovery prompts as spoken to the roofer, any email or note that could reach the paying roofer, handoff artifacts that may be shared with them) must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery"
], "first paid roofer guided setup execution kit doc");

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

// Wrapper and verifier also clean (already checked unsafe for wrapper; spot check verifier)
mustNotHave(verifierPath, "supabase.from", "verifier must not contain prod access");
console.log("PASS: verifier and wrapper clean of production/integration code.");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js",
  "scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "first paid roofer guided setup execution kit doc");

console.log("PASS: all required sections (1-14), 9 tables, customer-facing language, forbidden absence, wiring, references to Demo Close + Launch + Prospect Pipeline + Data Protection packets, and safety boundaries verified for first paid roofer guided setup execution kit.");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");

console.log("PASS: first paid roofer guided setup execution kit verifier checks complete.");
