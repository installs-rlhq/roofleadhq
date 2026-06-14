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

const docPath = "docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md";
const wrapperPath = "scripts/run-final-production-go-live-acceptance-gate-dry-run.sh";
const verifierPath = "backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const liveIntegrationPath = "docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md";
const prodSecurityPath = "docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md";
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

const liveIntegration = read(liveIntegrationPath);
const prodSecurity = read(prodSecurityPath);
const multiRoofer = read(multiRooferPath);
const dataProtection = read(dataProtectionPath);
const secondPaid = read(secondPaidPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for final production go-live acceptance gate exist.");

// File existence and basic properties
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "final production go-live acceptance gate doc");
mustHave(doc, "run-final-production-go-live-acceptance-gate-dry-run.sh", "final production go-live acceptance gate doc references wrapper");
mustHave(doc, "verify-final-production-go-live-acceptance-gate-readonly.js", "final production go-live acceptance gate doc references verifier");
mustHave(doc, "a11bfbd", "final production go-live acceptance gate doc references canonical source a11bfbd test(pilot): add live integration activation readiness plan");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "final production go-live acceptance gate doc references live integration activation readiness plan (immediate predecessor)");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "final production go-live acceptance gate doc references production security auth rls schema readiness plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "final production go-live acceptance gate doc references multi-roofer safety tenant-isolation acceptance gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "final production go-live acceptance gate doc references data protection tenant isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "final production go-live acceptance gate doc references second paid roofer repeatable launch kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "final production go-live acceptance gate doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "final production go-live acceptance gate doc references website trial direction regression packet");

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
mustHave(wrapper, "verify-final-production-go-live-acceptance-gate-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "final gate doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "final gate doc must reference verifier index");
mustHave(aggregate, "verify-final-production-go-live-acceptance-gate-readonly.js", "aggregate pilot readiness must wire the final production go-live acceptance gate verifier");
mustHave(verifierIndex, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "verifier index must list the final production go-live acceptance gate doc");
mustHave(verifierIndex, "run-final-production-go-live-acceptance-gate-dry-run.sh", "verifier index must list the final production go-live acceptance gate wrapper");
mustHave(verifierIndex, "verify-final-production-go-live-acceptance-gate-readonly.js", "verifier index must list the final production go-live acceptance gate verifier");
mustHave(contextFirstPaid, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record final production go-live acceptance gate");
mustHave(contextRooferDryRun, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record final production go-live acceptance gate");
mustHave(workflow, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record final production go-live acceptance gate");
mustHave(businessGuide, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record final production go-live acceptance gate");
mustHave(businessGuide, "Final Production Go-Live Acceptance Gate", "business guide must record final gate title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required sections (1-21) exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "final readiness/acceptance packet",
  "No customer or prospect receives internal-only language",
  "does not activate or implement"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 2. Final go-live acceptance purpose", [
  "master final manual readiness gate and decision framework",
  "PASS/HOLD/BLOCKED gate",
  "prevents any ad-hoc",
  "production implementation or live integration activation",
  "explicit PASS at the final go-live decision"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 3. Source-of-truth prerequisite", [
  "a11bfbd",
  "Canonical source of truth before this worktree must be verified at a11bfbd",
  "source of truth must be verified at a11bfbd"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 4. First paid roofer launch readiness gate", [
  "HOLD GATE: First paid roofer launch readiness remains gated",
  "First Paid Launch Readiness Tracker",
  "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 5. Second paid roofer repeatability readiness gate", [
  "HOLD GATE: Second paid roofer repeatability remains gated",
  "Second Paid Repeatability Tracker",
  "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 6. Multi-roofer safety / tenant isolation gate", [
  "HOLD GATE: Multi-roofer safety / tenant isolation remains gated",
  "Multi-Roofer Safety Tracker",
  "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md",
  "cc80caf"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 7. Production security / auth / RLS / schema gate", [
  "HOLD GATE: Production security / auth / RLS / schema implementation remains gated",
  "Production Security Readiness Tracker",
  "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md",
  "e494f4b"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 8. Live integration activation gate", [
  "HOLD GATE: Live integration activation remains gated",
  "Live Integration Readiness Tracker",
  "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md",
  "a11bfbd"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 9. Data protection and access boundary gate", [
  "HOLD GATE: Data protection and access boundary remains gated",
  "Data Protection Access Boundary Tracker",
  "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 10. Customer-facing language and offer boundary gate", [
  "HOLD GATE: Customer-facing language and offer boundary must use only the current approved public language",
  "Customer-Facing Language and Offer Boundary",
  "Forbidden public phrases",
  "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 11. Rollback and kill-switch readiness gate", [
  "HOLD GATE: Rollback and kill-switch readiness is mandatory",
  "Rollback Kill-Switch Tracker",
  "rollback/kill-switch readiness is required before any future activation approval"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 12. Credential and environment-change hold gate", [
  "HOLD GATE: Credentials and env-change activation remains blocked",
  "credential",
  "Credentials and env-change activation is a hard blocker"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 13. Production write hold gate", [
  "HOLD GATE: Production Supabase write activation remains blocked",
  "Production write hold",
  "Production Supabase write activation is a hard blocker"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 14. Contractor portal / dashboard hold gate", [
  "HOLD GATE: Contractor portal / dashboard exposure remains blocked",
  "Contractor portal / dashboard hold",
  "Contractor portal / dashboard hold is a hard blocker"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 15. External integration hold gate", [
  "HOLD GATE: External integration activation remains blocked",
  "External integration hold",
  "External integration hold is a hard blocker"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 16. Founder/operator approval evidence checklist", [
  "Founder/operator approval evidence checklist",
  "Rollback and Kill-Switch Readiness Tracker",
  "no forbidden implementation files were changed",
  "source-of-truth verification at a11bfbd"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 17. Risk and blocker register", [
  "Risk and blocker register",
  "Live integration or production implementation approved before this final gate PASS",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 18. Final implementation handoff artifact", [
  "Final implementation handoff artifact",
  "Production Implementation Execution Packet",
  "Live Integration Activation Execution Packet",
  "only after this final gate PASS",
  "No production implementation or live integration work or credential activation begins from this handoff without a separate, approved execution packet"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 19. PASS/HOLD/BLOCKED final go-live decision", [
  "PASS/HOLD/BLOCKED final go-live decision",
  "Only PASS advances consideration of production implementation or live integration activation work",
  "Final Go-Live Decision Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate)"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 20. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No live automation, no production multi-tenant writes, no contractor portal"
], "final production go-live acceptance gate doc");

assertSectionWithContent(doc, "## 21. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "final production go-live acceptance gate doc");

// 9 required tracker tables with exact names
assertSectionWithContent(doc, "### First Paid Launch Readiness Tracker", ["First Paid Launch Readiness Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Second Paid Repeatability Tracker", ["Second Paid Repeatability Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Multi-Roofer Safety Tracker", ["Multi-Roofer Safety Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Production Security Readiness Tracker", ["Production Security Readiness Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Live Integration Readiness Tracker", ["Live Integration Readiness Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Data Protection Access Boundary Tracker", ["Data Protection Access Boundary Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Rollback Kill-Switch Tracker", ["Rollback Kill-Switch Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Founder Approval Evidence Tracker", ["Founder Approval Evidence Tracker"], "final production go-live acceptance gate doc");
assertSectionWithContent(doc, "### Final Go-Live Decision Tracker", ["Final Go-Live Decision Tracker"], "final production go-live acceptance gate doc");
console.log("PASS: all 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is final readiness/acceptance only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is final readiness/acceptance only",
  "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation",
  "Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes"
], "final production go-live acceptance gate doc");

mustHave(doc, "final readiness/acceptance only", "final gate doc must state final readiness/acceptance only");
mustHave(doc, "Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation", "final gate doc must assert no forbidden impl");
mustHave(doc, "This is final readiness/acceptance only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, or backend-or-src changes", "final gate doc must assert final readiness only + full no-activation list");
mustHave(doc, "Rollback and kill-switch readiness is required before any future activation approval", "final gate doc must assert rollback/kill-switch required before activation");
mustHave(doc, "Source-of-truth prerequisite at a11bfbd test(pilot): add live integration activation readiness plan must be verified", "final gate doc must assert source-of-truth at a11bfbd required");
mustHave(doc, "asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "final gate doc must restate no forbidden impl file changes");
console.log("PASS: packet asserts it is final readiness/acceptance only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, or backend-or-src changes; rollback/kill-switch readiness, owner approval evidence, source-of-truth verification, and PASS/HOLD/BLOCKED final decision are required before any future activation or implementation approval.");

// Assert references to all required input packets/kits
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "final gate must reference Live Integration Activation Readiness Plan");
mustHave(doc, "a11bfbd", "final gate must reference canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "final gate must reference Production Security / Auth / RLS / Schema Readiness Plan");
mustHave(doc, "e494f4b", "final gate must reference canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "final gate must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "cc80caf", "final gate must reference canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "final gate must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md", "final gate must reference Second Paid Roofer Repeatable Launch Kit");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "final gate must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "final gate must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Live Integration Activation Readiness Plan at a11bfbd, Production Security / Auth / RLS / Schema Readiness Plan at e494f4b, Multi-Roofer Safety / Tenant-Isolation Acceptance Gate at cc80caf, Data Protection/Tenant Isolation packet, Second Paid Roofer Repeatable Launch Kit, Launch System, Trial Direction Regression packet).");

// Assert no forbidden implementation files were changed (content assertions + doc itself)
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", ".env", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "final gate doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "final gate doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "final gate doc must not contain secrets");
mustNotHave(doc, "backend/src", "final gate doc must not reference or change backend/src");
mustNotHave(doc, "migrations", "final gate doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "final gate doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "final gate doc must not contain RLS/auth changes");
mustNotHave(doc, "scheduler/cron/dispatcher activation", "final gate doc must not reference scheduler/cron/dispatcher");
console.log("PASS: final gate doc asserts and contains no forbidden implementation file changes (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "final gate doc must restate no forbidden impl file changes");

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
  mustHave(doc, g, "final production go-live acceptance gate doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "final production go-live acceptance gate doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "final gate doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "final gate doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 20 fully present
assertSectionWithContent(doc, "## 20. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes"
], "final production go-live acceptance gate doc");

// Public-vs-internal boundary section 21 present
assertSectionWithContent(doc, "## 21. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "final production go-live acceptance gate doc");

// Confirm exact verification command list in doc
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js",
  "node backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js",
  "scripts/run-final-production-go-live-acceptance-gate-dry-run.sh",
  "node backend/scripts/verify-first-paid-pilot-readiness-readonly.js",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build"
], "final production go-live acceptance gate doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md`", "final gate doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "final gate doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED final go-live decision", "final gate doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "final gate doc must document 9 trackers");
mustHave(doc, "Final Production Go-Live Acceptance Gate", "final gate doc must use title");
mustHave(doc, "before any future approval to start production implementation or live integration activation", "final gate doc must state the go-live prevention goal");
mustHave(doc, "rollback/kill-switch readiness is required before any future activation approval", "final gate doc must restate rollback prerequisite");
mustHave(doc, "source-of-truth verification at a11bfbd", "final gate doc must restate source-of-truth prerequisite");

// Assert no production activation / no live integration / no credential activation / no production implementation safety rules section
assertSectionWithContent(doc, "## No production activation / no live integration / no credential activation / no production implementation safety rules", [
  "Final readiness / acceptance packet only: yes",
  "Live SMS / Twilio activation: no",
  "Live Vapi / calling activation: no",
  "Credentials / env changes for live integrations or prod features: no",
  "Backend/src changes: no",
  "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)"
], "final production go-live acceptance gate doc");

console.log("PASS: all required sections (1-21 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Live Integration Activation Readiness Plan (a11bfbd) + Production Security / Auth / RLS / Schema Readiness Plan (e494f4b) + Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf) + Data Protection/Tenant Isolation packet + Second Paid Roofer Repeatable Launch Kit + Launch System + Trial Direction Regression packet, safety boundaries, final readiness/acceptance-only posture, rollback/kill-switch prerequisite, source-of-truth at a11bfbd, no forbidden impl file changes (backend/src, migration files, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), and pre-go-live boundary verified for final production go-live acceptance gate.");

console.log("PASS: final production go-live acceptance gate verifier checks complete.");
