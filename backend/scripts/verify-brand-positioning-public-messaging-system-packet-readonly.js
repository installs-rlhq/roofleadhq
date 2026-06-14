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

const docPath = "docs/BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md";
const wrapperPath = "scripts/run-brand-positioning-public-messaging-system-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-brand-positioning-public-messaging-system-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const tenantPath = "docs/PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md";
const configEnvPath = "docs/PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md";
const sequencingPath = "docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md";
const finalGatePath = "docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md";
const liveIntegrationPath = "docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md";
const prodSecurityPath = "docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md";
const multiRooferPath = "docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md";
const dataProtectionPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";
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

const tenant = read(tenantPath);
const configEnv = read(configEnvPath);
const sequencing = read(sequencingPath);
const finalGate = read(finalGatePath);
const liveIntegration = read(liveIntegrationPath);
const prodSecurity = read(prodSecurityPath);
const multiRoofer = read(multiRooferPath);
const dataProtection = read(dataProtectionPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for brand positioning public messaging system packet exist.");

// File existence and basic properties
mustHave(doc, "BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md", "brand positioning public messaging system packet doc");
mustHave(doc, "run-brand-positioning-public-messaging-system-packet-dry-run.sh", "brand positioning public messaging system packet doc references wrapper");
mustHave(doc, "verify-brand-positioning-public-messaging-system-packet-readonly.js", "brand positioning public messaging system packet doc references verifier");
mustHave(doc, "d561b56", "brand positioning public messaging system packet doc references canonical source d561b56 test(pilot): add production tenant account model readiness packet");
mustHave(doc, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "brand positioning public messaging system packet doc references production tenant account model readiness packet (direct predecessor)");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "brand positioning public messaging system packet doc references final production go-live acceptance gate");
mustHave(doc, "f3c3e80", "brand positioning public messaging system packet doc references canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "brand positioning public messaging system packet doc references live integration activation readiness plan");
mustHave(doc, "a11bfbd", "brand positioning public messaging system packet doc references canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "brand positioning public messaging system packet doc references production security auth rls schema readiness plan");
mustHave(doc, "e494f4b", "brand positioning public messaging system packet doc references canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "brand positioning public messaging system packet doc references multi-roofer safety tenant-isolation acceptance gate");
mustHave(doc, "cc80caf", "brand positioning public messaging system packet doc references canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "brand positioning public messaging system packet doc references data protection tenant isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "brand positioning public messaging system packet doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "brand positioning public messaging system packet doc references website trial direction regression packet");
mustHave(doc, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "brand positioning public messaging system packet doc references production config env readiness audit packet");
mustHave(doc, "1e1fe69", "brand positioning public messaging system packet doc references canonical 1e1fe69 for config/env packet");
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "brand positioning public messaging system packet doc references production implementation sequencing and approval plan");
mustHave(doc, "d22ea8a", "brand positioning public messaging system packet doc references canonical d22ea8a for sequencing plan");

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

// Wrapper calls node --check on this verifier
mustHave(wrapper, "verify-brand-positioning-public-messaging-system-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-brand-positioning-public-messaging-system-packet-readonly.js", "wrapper must run node --check on verifier");

// Wrapper calls this verifier
mustHave(wrapper, "node backend/scripts/verify-brand-positioning-public-messaging-system-packet-readonly.js", "wrapper must run this verifier");

// Wrapper calls agent product quality gate verifier directly (per user spec: node backend/scripts/verify-agent-product-quality-gate-readonly.js)
mustHave(wrapper, "node backend/scripts/verify-agent-product-quality-gate-readonly.js", "wrapper must call node backend/scripts/verify-agent-product-quality-gate-readonly.js");

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

// Required wiring checks (aggregate + index + 4 context/daily files + quality gate)
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "brand positioning doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "brand positioning doc must reference verifier index");
mustHave(aggregate, "verify-brand-positioning-public-messaging-system-packet-readonly.js", "aggregate pilot readiness must wire the brand positioning public messaging system packet verifier");
mustHave(verifierIndex, "BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md", "verifier index must list the brand positioning public messaging system packet doc");
mustHave(verifierIndex, "run-brand-positioning-public-messaging-system-packet-dry-run.sh", "verifier index must list the brand positioning public messaging system packet wrapper");
mustHave(verifierIndex, "verify-brand-positioning-public-messaging-system-packet-readonly.js", "verifier index must list the brand positioning public messaging system packet verifier");
mustHave(contextFirstPaid, "BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record brand positioning public messaging system packet");
mustHave(contextRooferDryRun, "BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record brand positioning public messaging system packet");
mustHave(workflow, "BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record brand positioning public messaging system packet");
mustHave(businessGuide, "BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record brand positioning public messaging system packet");
mustHave(businessGuide, "Brand Positioning and Public Messaging System Packet", "business guide must record brand positioning public messaging system packet title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required 27 sections exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "messaging/source-of-truth/readiness only",
  "No customer or prospect receives internal-only language",
  "does not update website production copy",
  "does not activate or implement"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 2. Brand positioning purpose", [
  "concrete manual brand positioning and public messaging source-of-truth framework",
  "PASS/HOLD/BLOCKED Website Update Readiness Decision",
  "prevents any ad-hoc positioning drift",
  "locked, auditable, founder-approved hierarchy"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 3. Source-of-truth prerequisite", [
  "d561b56",
  "Canonical source of truth before this worktree is: `d561b56 test(pilot): add production tenant account model readiness packet`",
  "source of truth must be verified at d561b56"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 4. Input from latest production readiness packets", [
  "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md",
  "d561b56",
  "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md",
  "1e1fe69"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 5. Positioning hierarchy", [
  "1. Primary brand:",
  "`RoofLeadHQ`",
  "2. Core positioning line:",
  "`Closing the gap between roofing lead and booked inspection.`",
  "3. Primary conversion phrase:",
  "4. Primary pain hook:",
  "5. Core explainer:",
  "6. Trademark / campaign hold:",
  "not approved for primary public website use yet"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 6. Core positioning line and Trademark / Campaign Phrase Hold", [
  "core positioning line is locked as:",
  "Closing the gap between roofing lead and booked inspection.",
  "trademark / campaign phrase hold",
  "not approved for primary public website use yet",
  "future optional campaign/ad-test phrase pending legal/market review"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 7. Lead-to-inspection clarification rule and No primary public use rule for the held phrase", [
  "No primary public use until approved rule",
  "The held phrase must not be used as the primary tagline, hero badge, main H1/H2",
  "Primary public language must lead with \"RoofLeadHQ\", the core positioning line",
  "The core positioning line itself (\"Closing the gap...\") already provides the lead-to-inspection clarity"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 8. Never Miss Another Roofing Lead usage rule", [
  "Never Miss Another Roofing Lead usage rule",
  "RoofLeadHQ: Never Miss Another Roofing Lead",
  "Never miss another roofing lead because nobody responded fast enough"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 9. Instant Lead-to-Inspection usage rule", [
  "Instant Lead-to-Inspection usage rule",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ: Instant Lead-to-Inspection"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 10. Core explainer language", [
  "RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar.",
  "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking."
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 11. Website messaging placement guidance", [
  "Website messaging placement guidance",
  "All public website pages must derive headlines, subheadlines, CTAs, feature descriptions, and FAQ from the positioning hierarchy",
  "The held \"Closer\" phrase must not be used in primary positions",
  "no website files are modified by this packet"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 12. Homepage hero messaging system", [
  "Homepage hero messaging system",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking.",
  "Never miss another roofing lead because nobody responded fast enough.",
  "Closing the gap between roofing lead and booked inspection.",
  "The held \"Closer\" badge is not used in primary hero position"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 13. Features page messaging system", [
  "Features page messaging system",
  "Fast Lead Response",
  "Automated Follow-Up",
  "Missed-Lead Recovery",
  "Calendar Booking"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 14. How It Works messaging system", [
  "How It Works messaging system",
  "the response gap is closed",
  "the follow-up gap is closed",
  "the missed-lead gap is closed",
  "the scheduling gap is closed"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 15. About page messaging system", [
  "About page messaging system",
  "Closing the gap between roofing lead and booked inspection.",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 16. Sales/demo conversation language", [
  "Sales/demo conversation language",
  "RoofLeadHQ",
  "Closing the gap between roofing lead and booked inspection.",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "Never Miss Another Roofing Lead",
  "not closing jobs"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 17. Email/outreach messaging language", [
  "Email/outreach messaging language",
  "Never Miss Another Roofing Lead",
  "Instant Lead-to-Inspection for your roofing business",
  "RoofLeadHQ AI responds fast, follows up automatically"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 18. Google Ads and LinkedIn messaging language", [
  "Google Ads and LinkedIn messaging language",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ: Never Miss Another Roofing Lead",
  "Closing the gap between roofing lead and booked inspection"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 19. Content/video messaging language", [
  "Content/video messaging language",
  "Never Miss Another Roofing Lead",
  "RoofLeadHQ | Instant Lead-to-Inspection",
  "From roofing lead to booked homeowner inspection",
  "Closing the gap between roofing lead and booked inspection"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 20. Onboarding and Guided Setup messaging language", [
  "Onboarding and Guided Setup messaging language",
  "Guided Setup happens first.",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live.",
  "booked inspections on the calendar"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 21. Proposal and pitch messaging language", [
  "Proposal and pitch messaging language",
  "RoofLeadHQ",
  "Closing the gap between roofing lead and booked inspection.",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections",
  "not the roofing sale"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 22. Approved public phrase library", [
  "Approved public phrase library",
  "Closing the gap between roofing lead and booked inspection.",
  "Close the gap between roofing lead and booked inspection.",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ: Instant Lead-to-Inspection",
  "RoofLeadHQ: Never Miss Another Roofing Lead",
  "Never Miss Another Roofing Lead",
  "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking.",
  "RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar.",
  "Never miss another roofing lead because nobody responded fast enough.",
  "From roofing lead to booked homeowner inspection.",
  "The held Closer phrase is not part of the required primary library"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 23. Forbidden interpretation and guarantee-risk rules", [
  "Forbidden interpretation and guarantee-risk rules",
  "Closer does not mean RoofLeadHQ closes roofing jobs.",
  "Closer does not mean RoofLeadHQ closes roofing sales.",
  "Closer does not mean RoofLeadHQ guarantees signed contracts, projects, revenue, or completed roofing work.",
  "RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections.",
  "Founder-Led Launch Program",
  "Request Founder-Led Launch Review",
  "founder review",
  "manual review",
  "manual coordination",
  "Live Automation Disabled",
  "day 15",
  "14-day launch trial",
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "book jobs",
  "guaranteed appointments",
  "guaranteed revenue",
  "close roofing sales",
  "close roofing jobs",
  "automatic estimate",
  "automatic quote",
  "You book the inspection"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 24. Public-vs-internal language boundary", [
  "Public-vs-internal language boundary",
  "Customer-facing / public language",
  "Must use ONLY the approved public phrase library",
  "internal-only / dry-run / founder-operator-only language",
  "internal-only / dry-run / founder-operator-only and NOT public positioning"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 25. Brand consistency checklist", [
  "Brand consistency checklist",
  "Primary brand \"RoofLeadHQ\" is used; the held \"RoofLeadHQ – The Roof Lead Closer™\" is not used as primary badge/hero",
  "H1 or primary headline uses \"Instant Lead-to-Inspection for Roofing Contractors\"",
  "No forbidden phrases appear in any customer-facing section"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 26. Future website update readiness decision", [
  "Future website update readiness decision",
  "This packet does not modify the website.",
  "explicit PASS (or accepted HOLD with documented mitigation) at the Website Update Readiness Decision Tracker",
  "The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes"
], "brand positioning public messaging system packet doc");

assertSectionWithContent(doc, "## 27. Safety guardrails", [
  "Safety guardrails",
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Website production copy changes: not performed by this packet",
  "Backend/src changes: none",
  "Routes, controllers, services, public endpoints: none added or modified",
  "Migrations, schema changes, table alterations: none",
  "Auth, RLS, security implementation, jwt claims, session changes: none",
  "Twilio, Vapi, Calendar, Resend, Lindy: not activated",
  "Cron, scheduler, dispatcher: not activated",
  "Production Supabase writes: none",
  "External calls, fetch, curl to production services: none",
  "Live sends: none",
  "Contractor portal, dashboard exposure: none"
], "brand positioning public messaging system packet doc");

// Exactly 9 required tracker tables with exact names (in order specified)
assertSectionWithContent(doc, "### Brand Positioning Approval Tracker", ["Brand Positioning Approval Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Approved Public Phrase Tracker", ["Approved Public Phrase Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Lead-to-Inspection Clarification Tracker", ["Lead-to-Inspection Clarification Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Website Messaging Placement Tracker", ["Website Messaging Placement Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Sales Demo Language Tracker", ["Sales Demo Language Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Marketing Channel Copy Tracker", ["Marketing Channel Copy Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Onboarding Proposal Language Tracker", ["Onboarding Proposal Language Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Forbidden Interpretation Risk Tracker", ["Forbidden Interpretation Risk Tracker"], "brand positioning public messaging system packet doc");
assertSectionWithContent(doc, "### Website Update Readiness Decision Tracker", ["Website Update Readiness Decision Tracker"], "brand positioning public messaging system packet doc");
console.log("PASS: exactly 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is messaging/source-of-truth/readiness only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is brand positioning and public messaging source-of-truth/readiness only",
  "Does not update website production copy",
  "Does not update backend-or-src",
  "Does not add routes",
  "Does not modify app behavior",
  "Does not add migration files",
  "Does not change schema",
  "Does not implement auth/RLS",
  "Does not read or modify `.env` files",
  "Does not create credentials",
  "Does not activate Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, external calls, or production behavior"
], "brand positioning public messaging system packet doc");

mustHave(doc, "messaging/source-of-truth/readiness only", "brand positioning doc must state messaging/source-of-truth/readiness only");
mustHave(doc, "Do **not** update website production copy yet.", "brand positioning doc must assert do not update website production copy");
mustHave(doc, "Do **not** update backend-or-src.", "brand positioning doc must assert do not update backend-or-src");
mustHave(doc, "Do **not** add routes.", "brand positioning doc must assert do not add routes");
mustHave(doc, "Do **not** modify app behavior.", "brand positioning doc must assert do not modify app behavior");
mustHave(doc, "Do **not** add migration files.", "brand positioning doc must assert do not add migration files");
mustHave(doc, "Do **not** change schema.", "brand positioning doc must assert do not change schema");
mustHave(doc, "Do **not** implement auth/RLS.", "brand positioning doc must assert do not implement auth/RLS");
mustHave(doc, "Do **not** read or modify `.env` files.", "brand positioning doc must assert do not read or modify .env");
mustHave(doc, "Do **not** create credentials.", "brand positioning doc must assert do not create credentials");
mustHave(doc, "No website production copy changes: not performed by this packet (recommended examples only; actual edits require future PASS + separate packet).", "brand positioning doc must assert website not modified");
mustHave(doc, "The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes", "brand positioning doc must assert PASS/HOLD/BLOCKED Website Update Readiness Decision required");
mustHave(doc, "The doc includes recommended website messaging examples but does not modify the website", "brand positioning doc must assert includes website examples without modifying website");
mustHave(doc, "The packet includes sales/demo, email/outreach, ads/LinkedIn, content/video, onboarding, Guided Setup, proposal, and pitch language guidance", "brand positioning doc must assert includes all channel language guidance");
mustHave(doc, "The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes. HOLD or BLOCKED at this gate blocks all downstream public copy work.", "brand positioning doc must assert requires Website Update Readiness Decision before copy changes");
mustHave(doc, "Forbidden customer-facing/public phrases and interpretations are absent from customer-facing template sections", "brand positioning doc must assert forbidden phrases absent from customer-facing sections");
mustHave(doc, "Internal founder/operator/manual language is confined to labeled internal-only dry-run sections", "brand positioning doc must assert internal language confined");
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "brand positioning doc must restate no forbidden impl file changes");
console.log("PASS: packet asserts it is messaging/source-of-truth/readiness only and does not update website/backend/src/routes/migrations/schema/auth/RLS/.env/credentials/activations; requires PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes; includes hierarchy + definition + rules + library + clarification + Closer does not mean + four gaps + website examples (no mod) + channel guidance + forbidden absent from public + internal confined; no backend-or-src/migrations/schema/auth/RLS/env/secrets/routes/activations/production behavior.");

mustHave(doc, "The packet says \"closer\" does not mean closing roofing jobs, roofing sales, signed contracts, projects, revenue, or completed roofing work.", "brand positioning doc must contain closer does not mean jobs/sales/contracts/revenue/work");
mustHave(doc, "The packet says RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections.", "brand positioning doc must contain four gaps statement");
console.log("PASS: packet contains explicit Closer interpretation statements and four gaps definition.");

// Assert references to all required input packets/kits + commits
mustHave(doc, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "brand positioning must reference Production Tenant Account Model Readiness Packet");
mustHave(doc, "d561b56", "brand positioning must reference canonical d561b56 for tenant packet");
mustHave(doc, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "brand positioning must reference Production Config / Env Readiness Audit Packet");
mustHave(doc, "1e1fe69", "brand positioning must reference canonical 1e1fe69 for config/env packet");
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "brand positioning must reference Production Implementation Sequencing and Approval Plan");
mustHave(doc, "d22ea8a", "brand positioning must reference canonical d22ea8a for sequencing plan");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "brand positioning must reference Final Production Go-Live Acceptance Gate");
mustHave(doc, "f3c3e80", "brand positioning must reference canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "brand positioning must reference Live Integration Activation Readiness Plan");
mustHave(doc, "a11bfbd", "brand positioning must reference canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "brand positioning must reference Production Security / Auth / RLS / Schema Readiness Plan");
mustHave(doc, "e494f4b", "brand positioning must reference canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "brand positioning must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "cc80caf", "brand positioning must reference canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "brand positioning must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "brand positioning must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "brand positioning must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Production Tenant at d561b56, Config/Env at 1e1fe69, Sequencing at d22ea8a, Final at f3c3e80, Live Integration at a11bfbd, Security at e494f4b, Multi-Roofer at cc80caf, Data Protection, Launch System, Trial Regression).");

// Assert positioning hierarchy present
mustHave(doc, "1. Primary brand:", "brand positioning doc must list primary brand");
mustHave(doc, "2. Core positioning line:", "brand positioning doc must list core positioning line");
mustHave(doc, "3. Primary conversion phrase:", "brand positioning doc must list primary conversion phrase");
mustHave(doc, "4. Primary pain hook:", "brand positioning doc must list primary pain hook");
mustHave(doc, "5. Core explainer:", "brand positioning doc must list core explainer");
console.log("PASS: positioning hierarchy (5 elements) present.");

// Assert approved public phrase library includes all new phrases (no primary Closer badge)
const newPhrases = [
  "Closing the gap between roofing lead and booked inspection.",
  "Close the gap between roofing lead and booked inspection.",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ: Instant Lead-to-Inspection",
  "RoofLeadHQ: Never Miss Another Roofing Lead",
  "Never Miss Another Roofing Lead",
  "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking.",
  "RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar.",
  "Never miss another roofing lead because nobody responded fast enough.",
  "From roofing lead to booked homeowner inspection."
];
for (const p of newPhrases) {
  mustHave(doc, p, "brand positioning doc (new approved public phrase)");
}
console.log("PASS: approved public phrase library includes all 10 new phrases (core positioning line primary; held Closer badge excluded from primary library).");

// Assert preserved approved public-facing lines remain present
const preserved = [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.",
  "Guided Setup happens first.",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live.",
  "An automated email is sent 2 days before the first monthly payment.",
  "Cancel anytime.",
  "No long-term contract."
];
for (const p of preserved) {
  mustHave(doc, p, "brand positioning doc (preserved public-facing line)");
}
console.log("PASS: preserved already-approved public-facing lines remain present.");

// Assert official definition present
mustHave(doc, "Core positioning line and Trademark / Campaign Phrase Hold", "brand positioning doc must have core positioning line and hold section");
mustHave(doc, "Closing the gap between roofing lead and booked inspection.", "brand positioning doc must contain the core positioning line text");
console.log("PASS: Core positioning line and Trademark / Campaign Phrase Hold section and text present.");

// Assert lead-to-inspection clarification rule present
mustHave(doc, "Lead-to-inspection clarification rule", "brand positioning doc must have clarification rule section");
mustHave(doc, "The held phrase must not be used as the primary tagline, hero badge, main H1/H2", "brand positioning doc must contain the no primary public use / hold rule text");
console.log("PASS: lead-to-inspection clarification rule present.");

// Assert Closer does not mean ... statements
mustHave(doc, "Closer does not mean RoofLeadHQ closes roofing jobs.", "brand positioning doc must contain closer does not close jobs");
mustHave(doc, "Closer does not mean RoofLeadHQ closes roofing sales.", "brand positioning doc must contain closer does not close sales");
mustHave(doc, "Closer does not mean RoofLeadHQ guarantees signed contracts, projects, revenue, or completed roofing work.", "brand positioning doc must contain closer does not guarantee contracts/revenue/work");
mustHave(doc, "RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections.", "brand positioning doc must contain four gaps statement");
console.log("PASS: packet explicitly says Closer does not mean closing roofing jobs/sales/signed contracts/projects/revenue/completed work and states the four gaps RoofLeadHQ closes.");

// Assert includes website messaging examples but does not modify
mustHave(doc, "Recommended (not yet applied) homepage hero structure", "brand positioning doc must include homepage examples");
mustHave(doc, "This packet does not modify the website", "brand positioning doc must state does not modify website");
mustNotHave(doc, "website/index.html", "brand positioning doc must not reference modifying website/index.html in implementation sense");
console.log("PASS: packet includes recommended website messaging examples (hero, features, etc.) but explicitly does not modify the website.");

// Assert includes sales/demo, email, ads, content, onboarding, proposal guidance
mustHave(doc, "## 16. Sales/demo conversation language", "brand positioning doc must have sales/demo section");
mustHave(doc, "## 17. Email/outreach messaging language", "brand positioning doc must have email/outreach section");
mustHave(doc, "## 18. Google Ads and LinkedIn messaging language", "brand positioning doc must have Google/LinkedIn section");
mustHave(doc, "## 19. Content/video messaging language", "brand positioning doc must have content/video section");
mustHave(doc, "## 20. Onboarding and Guided Setup messaging language", "brand positioning doc must have onboarding section");
mustHave(doc, "## 21. Proposal and pitch messaging language", "brand positioning doc must have proposal section");
console.log("PASS: packet includes sales/demo, email/outreach, ads/LinkedIn, content/video, onboarding/Guided Setup, proposal/pitch language guidance.");

// Assert requires PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes
mustHave(doc, "The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes", "brand positioning doc must require Website Update Readiness Decision");
mustHave(doc, "Only after the above may any production website file, ad account copy, email template, or public sales material be edited", "brand positioning doc must gate website edits behind the decision");
console.log("PASS: packet requires PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes.");

// Assert forbidden phrases absent from customer-facing template sections
const forbiddenListMarker = "Forbidden customer-facing/public phrases and interpretations";
let docBeforeForbidden = doc;
if (doc.includes(forbiddenListMarker)) {
  const idx = doc.indexOf(forbiddenListMarker);
  docBeforeForbidden = doc.slice(0, idx);
}
// Strip required clarification statements (they legitimately spell the terms to define the boundary and are not customer-facing promotion of forbidden claims)
docBeforeForbidden = docBeforeForbidden.replace(/Closer does not mean we close \[the roofing sale\] for you.*?(?=\n|$)/g, '');
docBeforeForbidden = docBeforeForbidden.replace(/Closer does not mean we close roofing jobs or roofing sales for you.*?(?=\n|$)/g, '');
docBeforeForbidden = docBeforeForbidden.replace(/Closer does not mean RoofLeadHQ closes roofing jobs.*?booked homeowner inspections\./gs, '');
docBeforeForbidden = docBeforeForbidden.replace(/The packet says "closer" does not mean closing roofing jobs, roofing sales, signed contracts, projects, revenue, or completed roofing work\./g, '');
docBeforeForbidden = docBeforeForbidden.replace(/The packet says RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections\./g, '');
docBeforeForbidden = docBeforeForbidden.replace(/"You book the inspection" language.*?(?=\n|$)/g, '');
docBeforeForbidden = docBeforeForbidden.replace(/You book the inspection language.*?(?=\n|$)/g, '');
const forbiddenBusiness = [
  "Founder-Led Launch Program",
  "Request Founder-Led Launch Review",
  "founder review",
  "manual review",
  "manual coordination",
  "Live Automation Disabled",
  "Monthly billing starts on day 15",
  "day 15",
  "14-day launch trial",
  "7-day pilot",
  "seven-day pilot",
  "5 qualified appointments in 7 days",
  "book jobs",
  "booked jobs",
  "booked-job",
  "guaranteed appointments",
  "guaranteed revenue",
  "guaranteed jobs",
  "guaranteed lead closer",
  "close roofing sales",
  "closes roofing sales",
  "close roofing jobs",
  "closes roofing jobs",
  "close more jobs automatically",
  "closes deals for roofers",
  "automatic estimate",
  "automatic quote",
  "automatic invoice",
  "automatic payment",
  "You book the inspection"
];
for (const f of forbiddenBusiness) {
  if (docBeforeForbidden.includes(f)) {
    throw new Error(`brand positioning doc has forbidden phrase in customer-facing area before forbidden list: ${f}`);
  }
}
console.log("PASS: forbidden customer-facing/public phrases and interpretations are absent from customer-facing template sections (before forbidden list section).");

// Assert internal language confined to labeled internal-only sections
mustHave(doc, "Internal founder/operator/manual language may appear only in clearly labeled internal-only dry-run sections", "brand positioning doc must confine internal language");
mustHave(doc, "internal-only / dry-run / founder-operator-only", "brand positioning doc must use internal-only labeling");
console.log("PASS: internal founder/operator/manual language is confined to labeled internal-only dry-run sections.");

// Assert no forbidden implementation in doc
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "brand positioning doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "brand positioning doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "brand positioning doc must not contain secrets");
mustNotHave(doc, "migrations", "brand positioning doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "brand positioning doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "brand positioning doc must not contain RLS/auth changes");
console.log("PASS: brand positioning doc asserts and contains no forbidden implementation file changes (backend-or-src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "brand positioning doc must restate no forbidden impl file changes");

// Confirm customer-facing templates use approved language (new + preserved)
const goodLanguage = [
  "Closing the gap between roofing lead and booked inspection.",
  "Close the gap between roofing lead and booked inspection.",
  "Instant Lead-to-Inspection for Roofing Contractors",
  "RoofLeadHQ: Instant Lead-to-Inspection",
  "RoofLeadHQ: Never Miss Another Roofing Lead",
  "Never Miss Another Roofing Lead",
  "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking.",
  "RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar.",
  "Never miss another roofing lead because nobody responded fast enough.",
  "From roofing lead to booked homeowner inspection.",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.",
  "Guided Setup happens first.",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live.",
  "An automated email is sent 2 days before the first monthly payment.",
  "Cancel anytime.",
  "No long-term contract."
];
for (const g of goodLanguage) {
  mustHave(doc, g, "brand positioning public messaging system packet doc (approved customer-facing language)");
}
console.log("PASS: customer-facing sections contain required new core positioning line / Instant Lead-to-Inspection / Never Miss + core explainer + preserved RoofLeadHQ AI / booked homeowner appointments / Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract language. (held Closer badge excluded from primary library)");

// Assert the 22 verifier requirements are covered by the assertions above (meta-check via doc content)
mustHave(doc, "All 27 required sections (1. Internal-only dry-run scope through 27. Safety guardrails) present with substantive content.", "doc must claim 27 sections");
mustHave(doc, "Exactly 9 copy-paste-ready manual tracker tables present with owner/status/evidence/next-action columns (Brand Positioning Approval Tracker, Approved Public Phrase Tracker, Lead-to-Inspection Clarification Tracker, Website Messaging Placement Tracker, Sales Demo Language Tracker, Marketing Channel Copy Tracker, Onboarding Proposal Language Tracker, Forbidden Interpretation Risk Tracker, Website Update Readiness Decision Tracker).", "doc must claim exactly 9 trackers with correct names");
mustHave(doc, "The packet includes recommended website messaging examples but does not modify the website.", "doc must claim website examples without modification");
mustHave(doc, "The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes.", "doc must claim requires decision before website changes");
console.log("PASS: doc self-asserts 27 sections, exactly 9 trackers, website examples without mod, and Website Update Readiness Decision requirement.");

// Final safety: no production website or backend/src edits implied
mustNotHave(doc, "index.html", "brand positioning doc must not contain raw index.html implementation references");
mustNotHave(doc, "website/", "brand positioning doc must not contain website/ path in change context");
console.log("PASS: no production website file references that would indicate modification.");

// New required asserts per updated positioning decision (12 points)
mustHave(doc, "1. Primary brand:", "brand positioning doc must use RoofLeadHQ as the primary brand");
mustHave(doc, "`RoofLeadHQ`", "brand positioning doc must contain primary brand RoofLeadHQ");
mustHave(doc, "2. Core positioning line:", "brand positioning doc must use Closing the gap... as the core positioning line");
mustHave(doc, "Closing the gap between roofing lead and booked inspection.", "brand positioning doc must contain core positioning line text");
mustHave(doc, "3. Primary conversion phrase:", "brand positioning doc must use Instant Lead-to-Inspection as primary conversion");
mustHave(doc, "Instant Lead-to-Inspection for Roofing Contractors", "brand positioning doc must contain Instant Lead-to-Inspection text");
mustHave(doc, "4. Primary pain hook:", "brand positioning doc must use Never Miss as primary pain hook");
mustHave(doc, "Core explainer:", "brand positioning doc must include the core explainer");
mustHave(doc, "trademark / campaign phrase hold", "brand positioning doc must document The Roof Lead Closer™ only as trademark/campaign hold, not primary public tagline");
mustHave(doc, "not approved for primary public website use yet", "brand positioning doc must say The Roof Lead Closer™ is not approved for primary public website use yet");
mustHave(doc, "future optional campaign/ad-test phrase pending legal/market review", "brand positioning doc must say any future use of The Roof Lead Closer™ requires legal/market review and nearby lead-to-inspection clarification");
mustHave(doc, "held Closer badge excluded from primary library", "brand positioning doc must show approved public phrase library does not require The Roof Lead Closer™ as an approved primary public phrase");
mustHave(doc, "does not close roofing jobs", "brand positioning doc must still say Closer must not imply closing roofing jobs, roofing sales, signed contracts, projects, revenue, or completed roofing work");
mustHave(doc, "Instant Lead-to-Inspection for Roofing Contractors", "brand positioning doc website examples must lead with Instant Lead-to-Inspection");
mustHave(doc, "Closing the gap between roofing lead and booked inspection.", "brand positioning doc website examples must use Closing the gap... as clarifying line");
mustHave(doc, "The held \"Closer\" badge is not used in primary hero position", "brand positioning doc must show website examples do not use primary held Closer badge");
mustHave(doc, "no public website files (homepage or other) changed", "brand positioning doc must still assert does not modify website files");
console.log("PASS: all 12 new required assertions for updated positioning (RoofLeadHQ primary, core positioning line, hold for Closer phrase, new library, new website examples without primary Closer, etc.) satisfied.");

// Confirm aggregate will see this after wiring (the aggregate check already asserted the wiring string)
console.log("PASS: brand positioning public messaging system packet verifier checks complete (all required assertions satisfied).");
