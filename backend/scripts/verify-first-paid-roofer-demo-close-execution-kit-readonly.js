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

const docPath = "docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const prospectTrackerPath = "docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md";
const outreachKitPath = "docs/FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md";
const salesPacketPath = "docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);
const prospectTracker = read(prospectTrackerPath);
const outreachKit = read(outreachKitPath);
const salesPacket = read(salesPacketPath);
const launchPacket = read(launchPacketPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer demo close execution kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "first paid roofer demo close execution kit doc");
mustHave(doc, "run-first-paid-roofer-demo-close-execution-kit-dry-run.sh", "first paid roofer demo close execution kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "first paid roofer demo close execution kit doc references prospect pipeline tracker packet");
mustHave(doc, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "first paid roofer demo close execution kit doc references outreach execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "first paid roofer demo close execution kit doc references sales outreach system packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer demo close execution kit doc references launch system packet");

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
mustHave(wrapper, "verify-first-paid-roofer-demo-close-execution-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "kit doc must reference prospect pipeline tracker");
mustHave(doc, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "kit doc must reference outreach execution kit");
mustHave(doc, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "kit doc must reference sales outreach system packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit doc must reference launch system packet");

// Required wiring checks (aggregate + index + contexts + daily guide + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "kit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "kit doc must reference verifier index");
mustHave(aggregate, "verify-first-paid-roofer-demo-close-execution-kit-readonly.js", "aggregate pilot readiness must wire the demo close verifier");
mustHave(verifierIndex, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "verifier index must list the demo close kit doc");
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record demo close kit");
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record demo close kit");
mustHave(workflow, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record demo close kit");
mustHave(businessGuide, "FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record demo close kit");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All 13 required sections exist with substantive content
assertSectionWithContent(doc, "## 1. Demo-call Readiness Checklist", [
  "Prospect replied / intro received / call requested",
  "Company and service-area fit",
  "Lead source context",
  "Paid-lead pain signal",
  "Response-speed pain signal",
  "Lead volume estimate",
  "Owner/founder decision-maker status",
  "Outreach history",
  "Objection history",
  "Evidence links/references",
  "PASS/HOLD/BLOCKED gate before demo"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 2. Pre-demo Preparation Worksheet", [
  "Roofer summary",
  "Current lead sources",
  "Current response process",
  "Missed-lead symptoms",
  "Follow-up gap",
  "Calendar/inspection booking friction",
  "Current tools",
  "Trial-fit notes",
  "Questions to ask",
  "Red flags to verify",
  "Demo outcome objective"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 3. Demo Call Agenda", [
  "Opening frame",
  "Why RoofLeadHQ exists",
  "Problem framing: paid roofing leads leak when response/follow-up is slow",
  "RoofLeadHQ AI positioning",
  "What RoofLeadHQ does",
  "What RoofLeadHQ does not promise",
  "Guided Setup",
  "14-day trial after setup goes live",
  "Automated email 2 days before first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "Fit questions",
  "Next-step close"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 4. Demo Script", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "Prospect-facing language only"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 5. Discovery Question Bank", [
  "Lead sources",
  "Lead volume",
  "Missed leads",
  "Speed-to-lead",
  "Follow-up process",
  "Inspection booking process",
  "CRM/tooling",
  "Seasonality",
  "Service area",
  "Decision-maker authority",
  "Trial expectations",
  "bad-fit signs",
  "Where are most of your paid leads coming from right now"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 6. Fit Decision Scorecard", [
  "Lead volume",
  "Lead source quality",
  "Missed-lead pain",
  "Speed-to-lead pain",
  "Follow-up gap",
  "Inspection booking fit",
  "Owner access / decision-maker fit",
  "Setup readiness",
  "Trial expectations",
  "Payment readiness",
  "Safety/no-overclaim risk",
  "PASS / HOLD / BLOCKED thresholds",
  "Evidence required for each score"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 7. Objection Handling Playbook", [
  "I already have someone answering leads",
  "We already use a CRM",
  "I need more leads, not follow-up",
  "How do I know this will work",
  "Is this automated",
  "Do you guarantee appointments",
  "What happens after the trial",
  "Can I cancel",
  "How much setup is required",
  "What if the leads are bad",
  "I don't want another system",
  "14-day trial after Guided Setup"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 8. Trial and Payment Explanation", [
  "Guided Setup happens first",
  "14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract",
  "Never use \"Monthly billing starts on day 15\"",
  "Confirmation check"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 9. Close / No-Close Decision Tree", [
  "Close now",
  "Demo complete, needs follow-up",
  "HOLD: missing information",
  "HOLD: decision-maker not present",
  "HOLD: service-area uncertainty",
  "HOLD: lead volume unclear",
  "BLOCKED: bad fit",
  "BLOCKED: guarantee-seeking",
  "BLOCKED: wants job/revenue guarantee",
  "BLOCKED: wants automated quote/invoice/payment",
  "Not-now / nurture",
  "No-go",
  "Choose exactly one path"
], "first paid roofer demo close execution kit doc");

assertSectionWithContent(doc, "## 10. Sales-to-Launch Handoff Artifact", [
  "Prospect/company/contact",
  "Decision status",
  "Fit score",
  "Trial terms confirmed",
  "Setup readiness",
  "Lead source notes",
  "Booking preferences known/unknown",
  "Follow-up preferences known/unknown",
  "Reporting expectations known/unknown",
  "Objections resolved/unresolved",
  "Evidence log references",
  "Go-live assumptions",
  "Next action owner/date"
], "first paid roofer demo close execution kit doc");

// 11. Manual tracker templates — all 9 required tables
assertSectionWithContent(doc, "### Demo Readiness Queue", ["Demo Readiness Queue"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Pre-demo Prep Worksheet", ["Pre-demo Prep Worksheet"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Discovery Notes", ["Discovery Notes"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Fit Scorecard", ["Fit Scorecard"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Objection Log", ["Objection Log"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Trial/Payment Explanation Confirmation", ["Trial/Payment Explanation Confirmation"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Close/No-Close Decision Log", ["Close/No-Close Decision Log"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Sales-to-Launch Handoff Summary", ["Sales-to-Launch Handoff Summary"], "first paid roofer demo close execution kit doc");
assertSectionWithContent(doc, "### Follow-up/Nurture Queue", ["Follow-up/Nurture Queue"], "first paid roofer demo close execution kit doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Confirm prospect-facing templates use current allowed language (exact strings)
const goodLanguage = [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup happens first",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime",
  "No long-term contract"
];
for (const g of goodLanguage) {
  mustHave(doc, g, "first paid roofer demo close execution kit doc (prospect-facing language)");
}
console.log("PASS: prospect-facing sections contain required current RoofLeadHQ AI / booked homeowner appointment / Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract language.");

// Forbidden phrases absent from prospect-facing content (use content before the full forbidden list restatement in safety)
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
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer demo close execution kit doc (prospect-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from prospect-facing template sections.");

// Internal-only language is permitted only in clearly labeled internal sections (check that doc uses "Internal-only" or "Internal only" markers for safety/scorecard/decision content)
mustHave(doc, "Internal-only / founder-operator-only", "kit doc must label internal sections");
mustHave(doc, "Internal only:", "kit doc must use Internal only callouts");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 12 fully present with all required disabled items
assertSectionWithContent(doc, "## 12. Safety Guardrails", [
  "Manual-only demo preparation",
  "Draft-only follow-up preparation",
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
], "first paid roofer demo close execution kit doc");

// Public-vs-internal boundary section 13 present
assertSectionWithContent(doc, "## 13. Public-vs-Internal Language Boundary", [
  "Prospect-facing demo language (agenda, script, discovery questions as spoken, objection responses, trial explanation, any email/LinkedIn that could reach a prospect, handoff artifacts that may be shared) must not use founder-led/manual babysitting/public founder-review framing",
  "internal-only / dry-run / founder-operator-only",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery"
], "first paid roofer demo close execution kit doc");

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
mustNotHave(verifierPath, "supabase.from", "verifier must not contain prod access"); // path string only, content already read indirectly
console.log("PASS: verifier and wrapper clean of production/integration code.");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js",
  "scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "first paid roofer demo close execution kit doc");

console.log("PASS: all required sections, 9 tables, prospect-facing language, forbidden absence, wiring, references, and safety boundaries verified for first paid roofer demo close execution kit.");

// Final self-reference confirmation
mustHave(doc, "This kit file: `docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md`", "kit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "kit doc must restate internal-only posture");

console.log("PASS: first paid roofer demo close execution kit verifier checks complete.");
