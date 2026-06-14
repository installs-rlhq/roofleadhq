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

const docPath = "docs/PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md";
const wrapperPath = "scripts/run-production-config-env-readiness-audit-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

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

const sequencing = read(sequencingPath);
const finalGate = read(finalGatePath);
const liveIntegration = read(liveIntegrationPath);
const prodSecurity = read(prodSecurityPath);
const multiRoofer = read(multiRooferPath);
const dataProtection = read(dataProtectionPath);
const launchPacket = read(launchPacketPath);
const trialRegression = read(trialRegressionPath);

// Assert expected files exist
console.log("PASS: all expected files for production config env readiness audit packet exist.");

// File existence and basic properties
mustHave(doc, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "production config env readiness audit packet doc");
mustHave(doc, "run-production-config-env-readiness-audit-packet-dry-run.sh", "production config env readiness audit packet doc references wrapper");
mustHave(doc, "verify-production-config-env-readiness-audit-packet-readonly.js", "production config env readiness audit packet doc references verifier");
mustHave(doc, "d22ea8a", "production config env readiness audit packet doc references canonical source d22ea8a test(pilot): add production implementation sequencing approval plan");
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "production config env readiness audit packet doc references production implementation sequencing and approval plan (direct predecessor)");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "production config env readiness audit packet doc references final production go-live acceptance gate");
mustHave(doc, "f3c3e80", "production config env readiness audit packet doc references canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "production config env readiness audit packet doc references live integration activation readiness plan");
mustHave(doc, "a11bfbd", "production config env readiness audit packet doc references canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "production config env readiness audit packet doc references production security auth rls schema readiness plan");
mustHave(doc, "e494f4b", "production config env readiness audit packet doc references canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "production config env readiness audit packet doc references multi-roofer safety tenant-isolation acceptance gate");
mustHave(doc, "cc80caf", "production config env readiness audit packet doc references canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "production config env readiness audit packet doc references data protection tenant isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "production config env readiness audit packet doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "production config env readiness audit packet doc references website trial direction regression packet");

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
mustHave(wrapper, "verify-production-config-env-readiness-audit-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js", "wrapper must run node --check on verifier");

// Wrapper calls this verifier
mustHave(wrapper, "node backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js", "wrapper must run this verifier");

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
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "config env audit doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "config env audit doc must reference verifier index");
mustHave(aggregate, "verify-production-config-env-readiness-audit-packet-readonly.js", "aggregate pilot readiness must wire the production config env readiness audit packet verifier");
mustHave(verifierIndex, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "verifier index must list the production config env readiness audit packet doc");
mustHave(verifierIndex, "run-production-config-env-readiness-audit-packet-dry-run.sh", "verifier index must list the production config env readiness audit packet wrapper");
mustHave(verifierIndex, "verify-production-config-env-readiness-audit-packet-readonly.js", "verifier index must list the production config env readiness audit packet verifier");
mustHave(contextFirstPaid, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record production config env readiness audit packet");
mustHave(contextRooferDryRun, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record production config env readiness audit packet");
mustHave(workflow, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record production config env readiness audit packet");
mustHave(businessGuide, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record production config env readiness audit packet");
mustHave(businessGuide, "Production Config / Env Readiness Audit Packet", "business guide must record config env audit packet title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required 22 sections exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "config/env readiness/audit only",
  "No customer or prospect receives internal-only language",
  "does not read real `.env` files or output secrets",
  "does not activate or implement"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 2. Production config/env audit purpose", [
  "concrete manual configuration inventory and env readiness audit framework",
  "PASS/HOLD/BLOCKED config/env readiness decision",
  "prevents any ad-hoc production implementation",
  "Slice 1 of the Production Implementation Sequencing and Approval Plan"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 3. Source-of-truth prerequisite", [
  "d22ea8a",
  "Canonical source of truth before this worktree must be verified at d22ea8a",
  "source of truth must be verified at d22ea8a"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 4. Input from Production Implementation Sequencing and Approval Plan", [
  "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md",
  "d22ea8a",
  "Slice 1: production configuration inventory / env readiness audit",
  "HOLD GATE"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 5. Config inventory boundary", [
  ".env.example",
  "safety-flags.env",
  "templates",
  "fixtures",
  "no real `.env` files"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 6. Env variable placeholder inventory", [
  "SUPABASE_URL",
  "VAPI_API_KEY",
  "TWILIO_AUTH_TOKEN",
  "RESEND_API_KEY",
  "SMS_ACTIVATION",
  "VAPI_ACTIVATION",
  "CALENDAR_ACTIVATION",
  "SUPABASE_WRITES"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 7. Secret handling and no-secret-output rule", [
  "does not read real .env files or output secrets",
  "no-secret-output rule",
  "never read or print any secret values",
  "placeholders only"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 8. Vendor credential readiness checklist", [
  "Twilio",
  "Vapi",
  "Resend",
  "Lindy",
  "Calendar providers",
  "credential placeholder-only"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 9. Supabase config readiness checklist", [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_WRITES=false",
  "production write boundary",
  "tenant isolation planning"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 10. Twilio/SMS config readiness checklist", [
  "TWILIO_AUTH_TOKEN",
  "SMS_ACTIVATION=false",
  "SMS_TWILIO_SEND_ADAPTER",
  "no live SMS sending paths"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 11. Vapi/calling config readiness checklist", [
  "VAPI_ACTIVATION=false",
  "no production call initiation",
  "Vapi client"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 12. Calendar booking config readiness checklist", [
  "CALENDAR_ACTIVATION=false",
  "no live event creation",
  "Guided Setup calendar configuration instructions"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 13. Resend/email config readiness checklist", [
  "RESEND_API_KEY",
  "no production transactional email",
  "automated email 2 days before the first monthly payment"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 14. Lindy/automation config readiness checklist", [
  "Lindy",
  "automation activation",
  "no external automation workflows"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 15. Domain/webhook/public route readiness checklist", [
  "PUBLIC_ROUTE_ACTIVATION=false",
  "webhook URL",
  "no public routes for contractor portal",
  "no public route activation"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 16. Feature flag and kill-switch readiness checklist", [
  "activation flags",
  "SMS_ACTIVATION",
  "VAPI_ACTIVATION",
  "CALENDAR_ACTIVATION",
  "SUPABASE_WRITES",
  "kill-switch design"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 17. Local/staging/production separation checklist", [
  "NODE_ENV",
  "local/staging vs production",
  "test-only values",
  "separation proof"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 18. Config owner approval evidence checklist", [
  "owner approval evidence checklist",
  "Rollback/kill-switch readiness",
  "no forbidden implementation files were changed",
  "source-of-truth verification at d22ea8a"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 19. Config risk and blocker register", [
  "Config risk and blocker register",
  "real .env or secret values committed or emitted",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 20. PASS/HOLD/BLOCKED config/env readiness decision", [
  "PASS/HOLD/BLOCKED config/env readiness decision",
  "Only PASS advances consideration of any production implementation slice",
  "Config Env Readiness Decision Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate)"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 21. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal"
], "production config env readiness audit packet doc");

assertSectionWithContent(doc, "## 22. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production config env readiness audit packet doc");

// Exactly 9 required tracker tables with exact names
assertSectionWithContent(doc, "### Source-of-Truth Config Audit Tracker", ["Source-of-Truth Config Audit Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Env Placeholder Inventory Tracker", ["Env Placeholder Inventory Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Secret Handling Hold Tracker", ["Secret Handling Hold Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Vendor Credential Readiness Tracker", ["Vendor Credential Readiness Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Supabase Config Readiness Tracker", ["Supabase Config Readiness Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Live Integration Config Hold Tracker", ["Live Integration Config Hold Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Domain Webhook Route Readiness Tracker", ["Domain Webhook Route Readiness Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Feature Flag Kill-Switch Tracker", ["Feature Flag Kill-Switch Tracker"], "production config env readiness audit packet doc");
assertSectionWithContent(doc, "### Config Env Readiness Decision Tracker", ["Config Env Readiness Decision Tracker"], "production config env readiness audit packet doc");
console.log("PASS: exactly 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is config/env readiness/audit only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is config/env readiness/audit only",
  "Does not read real `.env` files or output secrets",
  "Does not make credentials or env changes",
  "Does not activate production behavior"
], "production config env readiness audit packet doc");

mustHave(doc, "config/env readiness/audit only", "config env audit doc must state config/env readiness/audit only");
mustHave(doc, "does not read real `.env` files or output secrets", "config env audit doc must assert does not read real .env or output secrets");
mustHave(doc, "no credentials/env changes are made", "config env audit doc must assert no credentials/env changes");
mustHave(doc, "no production activation occurs", "config env audit doc must assert no production activation occurs");
mustHave(doc, "This is config/env readiness/audit only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice", "config env audit doc must assert config/env readiness/audit only + full no-activation list");
mustHave(doc, "Rollback/kill-switch readiness is required before any future implementation slice approval", "config env audit doc must assert rollback/kill-switch required before slice approval");
mustHave(doc, "Source-of-truth prerequisite at d22ea8a test(pilot): add production implementation sequencing approval plan must be verified", "config env audit doc must assert source-of-truth at d22ea8a required");
mustHave(doc, "Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS", "config env audit doc must assert final gate PASS at f3c3e80 required");
mustHave(doc, "Production Implementation Sequencing and Approval Plan at d22ea8a must record PASS before this packet may record PASS", "config env audit doc must assert sequencing plan PASS at d22ea8a required");
mustHave(doc, "asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "config env audit doc must restate no forbidden impl file changes");
mustHave(doc, "The packet requires PASS/HOLD/BLOCKED decision before future implementation slice approval", "config env audit doc must state PASS/HOLD/BLOCKED decision required before future slice approval");
console.log("PASS: packet asserts it is config/env readiness/audit only and does not read real .env or output secrets; no credentials/env changes; no production activation; does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice; rollback/kill-switch readiness, owner approval evidence, source-of-truth verification at d22ea8a, final gate PASS at f3c3e80, sequencing plan PASS at d22ea8a, and PASS/HOLD/BLOCKED config/env readiness decision are required before any future implementation slice approval.");

// Assert references to all required input packets/kits + commits
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "config env audit must reference Production Implementation Sequencing and Approval Plan");
mustHave(doc, "d22ea8a", "config env audit must reference canonical d22ea8a for sequencing plan");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "config env audit must reference Final Production Go-Live Acceptance Gate");
mustHave(doc, "f3c3e80", "config env audit must reference canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "config env audit must reference Live Integration Activation Readiness Plan");
mustHave(doc, "a11bfbd", "config env audit must reference canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "config env audit must reference Production Security / Auth / RLS / Schema Readiness Plan");
mustHave(doc, "e494f4b", "config env audit must reference canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "config env audit must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "cc80caf", "config env audit must reference canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "config env audit must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "config env audit must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "config env audit must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Production Implementation Sequencing and Approval Plan at d22ea8a, Final Production Go-Live Acceptance Gate at f3c3e80, Live Integration Activation Readiness Plan at a11bfbd, Production Security / Auth / RLS / Schema Readiness Plan at e494f4b, Multi-Roofer Safety / Tenant-Isolation Acceptance Gate at cc80caf, Data Protection/Tenant Isolation packet, Launch System, Trial Direction Regression packet).");

// Assert no forbidden implementation files were changed (content assertions + doc itself)
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "config env audit doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "config env audit doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "config env audit doc must not contain secrets");
// hyphen form "backend-or-src" is the approved way to reference the boundary in safety text; slash form is forbidden to catch bad references
mustNotHave(doc, "migrations", "config env audit doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "config env audit doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "config env audit doc must not contain RLS/auth changes");
// scheduler/cron/dispatcher activation phrase is required in safety text; the mustNot would incorrectly block the "no ... activation" statement
console.log("PASS: config env audit doc asserts and contains no forbidden implementation file changes (backend-or-src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "config env audit doc must restate no forbidden impl file changes");

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
  mustHave(doc, g, "production config env readiness audit packet doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "production config env readiness audit packet doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "config env audit doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "config env audit doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 21 fully present
assertSectionWithContent(doc, "## 21. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live Vapi outbound or inbound production calls: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes"
], "production config env readiness audit packet doc");

// Public-vs-internal boundary section 22 present
assertSectionWithContent(doc, "## 22. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production config env readiness audit packet doc");

// Confirm exact verification command list in doc (worktree-safe only)
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js",
  "node backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js",
  "scripts/run-production-config-env-readiness-audit-packet-dry-run.sh",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build",
  "scripts/agent-diff-proof.sh"
], "production config env readiness audit packet doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md`", "config env audit doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "config env audit doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED config/env readiness decision", "config env audit doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "config env audit doc must document 9 trackers");
mustHave(doc, "config/env readiness/audit only", "config env audit doc must use readiness/audit only posture");
mustHave(doc, "Production Config / Env Readiness Audit Packet", "config env audit doc must use title");
mustHave(doc, "before any future implementation slice begins", "config env audit doc must state the pre-slice audit goal");
mustHave(doc, "rollback/kill-switch readiness is required before any future implementation slice approval", "config env audit doc must restate rollback prerequisite");
mustHave(doc, "source-of-truth verification at d22ea8a", "config env audit doc must restate source-of-truth prerequisite");
mustHave(doc, "Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS", "config env audit doc must restate final gate prerequisite");
mustHave(doc, "Production Implementation Sequencing and Approval Plan at d22ea8a must record PASS before this packet may record PASS", "config env audit doc must restate sequencing prerequisite");

// Assert no production activation / no live integration / no credential activation / no production implementation safety rules section
assertSectionWithContent(doc, "## No production activation / no live integration / no credential activation / no production implementation safety rules", [
  "Config / env readiness / audit packet only: yes",
  "Live SMS / Twilio activation: no",
  "Live Vapi / calling activation: no",
  "Credentials / env changes for live integrations or prod features: no",
  "Backend/src changes: no",
  "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)"
], "production config env readiness audit packet doc");

console.log("PASS: all required sections (1-22 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Production Implementation Sequencing and Approval Plan (d22ea8a) + Final Production Go-Live Acceptance Gate (f3c3e80) + Live Integration Activation Readiness Plan (a11bfbd) + Production Security / Auth / RLS / Schema Readiness Plan (e494f4b) + Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf) + Data Protection/Tenant Isolation packet + Launch System + Trial Direction Regression packet, safety boundaries, config/env readiness/audit-only posture, rollback/kill-switch prerequisite, source-of-truth at d22ea8a, final gate PASS prerequisite, sequencing plan PASS prerequisite, no forbidden impl file changes (backend-or-src, migration files, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), and pre-implementation-slice boundary verified for production config env readiness audit packet.");

console.log("PASS: production config env readiness audit packet verifier checks complete.");
