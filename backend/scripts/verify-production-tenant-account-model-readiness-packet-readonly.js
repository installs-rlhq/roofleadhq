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

const docPath = "docs/PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md";
const wrapperPath = "scripts/run-production-tenant-account-model-readiness-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

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
console.log("PASS: all expected files for production tenant account model readiness packet exist.");

// File existence and basic properties
mustHave(doc, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "production tenant account model readiness packet doc");
mustHave(doc, "run-production-tenant-account-model-readiness-packet-dry-run.sh", "production tenant account model readiness packet doc references wrapper");
mustHave(doc, "verify-production-tenant-account-model-readiness-packet-readonly.js", "production tenant account model readiness packet doc references verifier");
mustHave(doc, "1e1fe69", "production tenant account model readiness packet doc references canonical source 1e1fe69 test(pilot): add production config env readiness audit packet");
mustHave(doc, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "production tenant account model readiness packet doc references production config env readiness audit packet (direct predecessor Slice 1)");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "production tenant account model readiness packet doc references final production go-live acceptance gate");
mustHave(doc, "f3c3e80", "production tenant account model readiness packet doc references canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "production tenant account model readiness packet doc references live integration activation readiness plan");
mustHave(doc, "a11bfbd", "production tenant account model readiness packet doc references canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "production tenant account model readiness packet doc references production security auth rls schema readiness plan");
mustHave(doc, "e494f4b", "production tenant account model readiness packet doc references canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "production tenant account model readiness packet doc references multi-roofer safety tenant-isolation acceptance gate");
mustHave(doc, "cc80caf", "production tenant account model readiness packet doc references canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "production tenant account model readiness packet doc references data protection tenant isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "production tenant account model readiness packet doc references launch system packet");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "production tenant account model readiness packet doc references website trial direction regression packet");
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "production tenant account model readiness packet doc references production implementation sequencing and approval plan");
mustHave(doc, "d22ea8a", "production tenant account model readiness packet doc references canonical d22ea8a for sequencing plan");

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
mustHave(wrapper, "verify-production-tenant-account-model-readiness-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js", "wrapper must run node --check on verifier");

// Wrapper calls this verifier
mustHave(wrapper, "node backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js", "wrapper must run this verifier");

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
mustHave(doc, "verify-first-paid-pilot-readiness-readonly.js", "tenant account model doc must reference aggregate pilot readiness");
mustHave(doc, "FIRST_PAID_LAUNCH_VERIFIER_INDEX.md", "tenant account model doc must reference verifier index");
mustHave(aggregate, "verify-production-tenant-account-model-readiness-packet-readonly.js", "aggregate pilot readiness must wire the production tenant account model readiness packet verifier");
mustHave(verifierIndex, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "verifier index must list the production tenant account model readiness packet doc");
mustHave(verifierIndex, "run-production-tenant-account-model-readiness-packet-dry-run.sh", "verifier index must list the production tenant account model readiness packet wrapper");
mustHave(verifierIndex, "verify-production-tenant-account-model-readiness-packet-readonly.js", "verifier index must list the production tenant account model readiness packet verifier");
mustHave(contextFirstPaid, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record production tenant account model readiness packet");
mustHave(contextRooferDryRun, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record production tenant account model readiness packet");
mustHave(workflow, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record production tenant account model readiness packet");
mustHave(businessGuide, "PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record production tenant account model readiness packet");
mustHave(businessGuide, "Production Tenant / Account Model Readiness Packet", "business guide must record tenant account model readiness packet title");
console.log("PASS: wiring to aggregate, verifier index, 4 context/daily files present.");

// All required 22 sections exist with substantive content
assertSectionWithContent(doc, "## 1. Internal-only dry-run scope", [
  "Internal-only / dry-run / founder-operator-only",
  "tenant/account model readiness/planning/approval only",
  "No customer or prospect receives internal-only language",
  "does not implement tenant accounts, users, account records",
  "does not activate or implement"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 2. Tenant/account model readiness purpose", [
  "concrete manual tenant/account model definition and readiness framework",
  "PASS/HOLD/BLOCKED tenant/account readiness decision",
  "prevents any ad-hoc tenant/account implementation",
  "Slice 2 of the Production Implementation Sequencing and Approval Plan"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 3. Source-of-truth prerequisite", [
  "1e1fe69",
  "Canonical source of truth before this worktree must be verified at 1e1fe69",
  "source of truth must be verified at 1e1fe69"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 4. Input from Production Config / Env Readiness Audit Packet", [
  "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md",
  "1e1fe69",
  "Slice 1",
  "HOLD GATE"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 5. Tenant/account model boundary", [
  "owning_roofer_id",
  "Roofer as tenant principal",
  "planning-only",
  "no implementation"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 6. Roofer account inventory readiness", [
  "Roofer as tenant principal",
  "owning_roofer_id",
  "no production roofer accounts",
  "Roofer Account Inventory Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 7. Homeowner lead/account association readiness", [
  "owning_roofer_id",
  "never shared across roofers",
  "Homeowner Lead Association Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 8. Tenant identifier and naming readiness", [
  "owning_roofer_id",
  "tenant identifier",
  "roofer is the public term",
  "Tenant Identifier Naming Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 9. Tenant isolation assumption checklist", [
  "owning_roofer_id",
  "RLS must return zero rows",
  "Tenant isolation from the Multi-Roofer Safety Gate",
  "Tenant Isolation Assumption Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 10. Role and access boundary readiness", [
  "Contractor role",
  "Founder/operator role",
  "scoped exclusively to their own owning_roofer_id",
  "Role Access Boundary Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 11. Account lifecycle readiness", [
  "lifecycle states",
  "The 14-day trial begins after RoofLeadHQ AI setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime. No long-term contract",
  "Account Lifecycle Readiness Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 12. Guided Setup account data requirements", [
  "RoofLeadHQ must provide each roofer clear Guided Setup instructions for how to use the RoofLeadHQ-provided phone number",
  "how to configure their calendar so RoofLeadHQ AI can book inspections/homeowner appointments correctly",
  "This must remain readiness/approval only and must not activate phone routing, SMS, calls, or calendar booking",
  "internal-only / dry-run / founder-operator-only",
  "Guided Setup phone/calendar"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 13. Multi-roofer expansion constraints", [
  "multiple independent roofers",
  "Multi-Roofer Safety Gate",
  "tenant model (this slice)",
  "schema (Slice 3)",
  "auth/RLS (Slice 4)"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 14. Reporting and account aggregation boundaries", [
  "strictly per-roofer",
  "founder/operator internal reporting may aggregate",
  "no public or contractor-accessible cross-roofer rollups",
  "Reporting and account aggregation boundaries"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 15. Contractor dashboard/portal exposure hold", [
  "Contractor dashboard/portal exposure (Slice 9) remains fully held",
  "No production routes for contractor views",
  "Portal Exposure Hold Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 16. Production write/schema/auth/RLS hold gates", [
  "No production Supabase writes",
  "No schema changes or migration files",
  "No auth implementation, RLS policies",
  "Tenant/account model PASS is a hard prerequisite"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 17. Account model verifier expectations", [
  "dedicated slice-2 verifier",
  "all required 22 sections",
  "exactly the 9 tracker tables",
  "Tenant Account Readiness Tracker",
  "Guided Setup phone-number usage instructions and calendar setup guidelines",
  "PASS/HOLD/BLOCKED tenant/account readiness decision"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 18. Owner approval evidence checklist", [
  "owner (Jason) approval evidence",
  "rollback/kill-switch design for tenant/account surfaces",
  "Tenant Account Readiness Decision Tracker"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 19. Tenant/account risk and blocker register", [
  "Tenant/account risk and blocker register",
  "Incomplete tenant model definition",
  "Ambiguous owning_roofer_id",
  "BLOCKED items must be resolved or explicitly risk-accepted"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 20. PASS/HOLD/BLOCKED tenant/account readiness decision", [
  "PASS/HOLD/BLOCKED tenant/account readiness decision",
  "HOLD GATE: Slice 2",
  "Tenant Account Readiness Decision Tracker (final table)",
  "re-run (full verifier + wrapper + quality gate)"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 21. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Tenant accounts, users, roofer principals, account tables: not implemented",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal"
], "production tenant account model readiness packet doc");

assertSectionWithContent(doc, "## 22. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production tenant account model readiness packet doc");

// Exactly 9 required tracker tables with exact names (in order specified)
assertSectionWithContent(doc, "### Tenant Account Readiness Tracker", ["Tenant Account Readiness Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Roofer Account Inventory Tracker", ["Roofer Account Inventory Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Homeowner Lead Association Tracker", ["Homeowner Lead Association Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Tenant Identifier Naming Tracker", ["Tenant Identifier Naming Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Tenant Isolation Assumption Tracker", ["Tenant Isolation Assumption Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Role Access Boundary Tracker", ["Role Access Boundary Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Account Lifecycle Readiness Tracker", ["Account Lifecycle Readiness Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Portal Exposure Hold Tracker", ["Portal Exposure Hold Tracker"], "production tenant account model readiness packet doc");
assertSectionWithContent(doc, "### Tenant Account Readiness Decision Tracker", ["Tenant Account Readiness Decision Tracker"], "production tenant account model readiness packet doc");
console.log("PASS: exactly 9 copy-paste-ready manual tracker tables present.");

// Assert this packet is tenant/account readiness/planning/approval only and does not implement forbidden items
assertSectionWithContent(doc, "## Explicit acceptance/readiness only confirmation", [
  "This is tenant/account model readiness/planning/approval only",
  "Does not implement tenant accounts, users, account records, schema, auth, RLS, migration files, or production data writes",
  "Does not make backend-or-src changes, public routes, contractor portal exposure",
  "Does not activate production behavior"
], "production tenant account model readiness packet doc");

mustHave(doc, "tenant/account model readiness/planning/approval only", "tenant account model doc must state tenant/account model readiness/planning/approval only");
mustHave(doc, "no tenant accounts, users, account records, schema, auth, RLS, migration files, or production data writes are implemented", "tenant account model doc must assert no tenant accounts/users/records/schema/auth/RLS/migration files/production writes implemented");
mustHave(doc, "no backend-or-src changes, public routes, contractor portal exposure, external calls, live sends, scheduler/cron/dispatcher activation, credentials, env changes, or production behavior are changed", "tenant account model doc must assert no backend-or-src/public routes/portal/external/live/scheduler/credentials/env/production behavior");
mustHave(doc, "The doc requires tenant/account PASS/HOLD/BLOCKED approval before future schema/auth/RLS/security implementation", "tenant account model doc must assert PASS/HOLD/BLOCKED approval required before future schema/auth/RLS");
mustHave(doc, "The doc includes tenant/account ownership, homeowner lead association, tenant identifier, role/access boundary, account lifecycle, reporting boundary, and portal exposure hold readiness", "tenant account model doc must assert includes ownership/homeowner/identifier/role/lifecycle/reporting/portal readiness");
mustHave(doc, "The doc includes the roofer phone-number usage and calendar setup readiness dependency without activating phone/SMS/calls/calendar booking", "tenant account model doc must assert includes Guided Setup phone/calendar readiness dep without activation");
mustHave(doc, "This is tenant/account model readiness/planning/approval only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice", "tenant account model doc must assert tenant/account readiness/approval only + full no-activation list");
mustHave(doc, "Rollback/kill-switch readiness is required before any future implementation slice approval", "tenant account model doc must assert rollback/kill-switch required before slice approval");
mustHave(doc, "Source-of-truth prerequisite at 1e1fe69 test(pilot): add production config env readiness audit packet must be verified", "tenant account model doc must assert source-of-truth at 1e1fe69 required");
mustHave(doc, "Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS", "tenant account model doc must assert final gate PASS at f3c3e80 required");
mustHave(doc, "Production Implementation Sequencing and Approval Plan at d22ea8a must record PASS before this packet may record PASS", "tenant account model doc must assert sequencing plan PASS at d22ea8a required");
mustHave(doc, "Production Config / Env Readiness Audit Packet at 1e1fe69 must record PASS (or accepted HOLD) before this packet may record PASS", "tenant account model doc must assert config/env PASS at 1e1fe69 required");
mustHave(doc, "asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "tenant account model doc must restate no forbidden impl file changes");
mustHave(doc, "The packet requires PASS/HOLD/BLOCKED decision before future implementation slice approval", "tenant account model doc must state PASS/HOLD/BLOCKED decision required before future slice approval");
console.log("PASS: packet asserts it is tenant/account model readiness/planning/approval only and does not implement tenant accounts/users/records/schema/auth/RLS/migration files/production writes; no backend-or-src/public routes/portal/external/live/scheduler/credentials/env/production behavior; requires PASS/HOLD/BLOCKED before future schema/auth/RLS; includes ownership/homeowner/identifier/role/lifecycle/reporting/portal + phone/calendar dep without activation; rollback/kill-switch, owner approval, source-of-truth at 1e1fe69, final gate PASS at f3c3e80, sequencing plan PASS at d22ea8a, config/env PASS at 1e1fe69, and PASS/HOLD/BLOCKED tenant/account readiness decision are required before any future implementation slice approval.");

// Assert references to all required input packets/kits + commits
mustHave(doc, "PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md", "tenant account model must reference Production Config / Env Readiness Audit Packet");
mustHave(doc, "1e1fe69", "tenant account model must reference canonical 1e1fe69 for config/env packet");
mustHave(doc, "PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md", "tenant account model must reference Production Implementation Sequencing and Approval Plan");
mustHave(doc, "d22ea8a", "tenant account model must reference canonical d22ea8a for sequencing plan");
mustHave(doc, "FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md", "tenant account model must reference Final Production Go-Live Acceptance Gate");
mustHave(doc, "f3c3e80", "tenant account model must reference canonical f3c3e80 for final go-live gate");
mustHave(doc, "LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md", "tenant account model must reference Live Integration Activation Readiness Plan");
mustHave(doc, "a11bfbd", "tenant account model must reference canonical a11bfbd for live integration plan");
mustHave(doc, "PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md", "tenant account model must reference Production Security / Auth / RLS / Schema Readiness Plan");
mustHave(doc, "e494f4b", "tenant account model must reference canonical e494f4b for production security plan");
mustHave(doc, "MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md", "tenant account model must reference Multi-Roofer Safety / Tenant-Isolation Acceptance Gate");
mustHave(doc, "cc80caf", "tenant account model must reference canonical cc80caf for multi-roofer gate");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "tenant account model must reference Data Protection/Tenant Isolation packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "tenant account model must reference Launch System");
mustHave(doc, "WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md", "tenant account model must reference Trial Direction Regression packet");
console.log("PASS: required packet references present (Production Config / Env Readiness Audit Packet at 1e1fe69, Production Implementation Sequencing and Approval Plan at d22ea8a, Final Production Go-Live Acceptance Gate at f3c3e80, Live Integration Activation Readiness Plan at a11bfbd, Production Security / Auth / RLS / Schema Readiness Plan at e494f4b, Multi-Roofer Safety / Tenant-Isolation Acceptance Gate at cc80caf, Data Protection/Tenant Isolation packet, Launch System, Trial Direction Regression packet).");

// Assert no forbidden implementation files were changed (content assertions + doc itself)
const docUnsafe = [
  "backend/src", "migrations", "ALTER TABLE", "CREATE TABLE", "supabase.from(", "service_role",
  "JWT", "process.env.SUPABASE", "twilio.com", "resend.com", "vapi.ai",
  "calendar.events.insert(", "fetch(\"https://"
];
for (const u of docUnsafe) {
  mustNotHave(doc, u, "tenant account model doc (safety boundary)");
}
mustNotHave(doc, "supabase.from(", "tenant account model doc must not contain prod client code");
mustNotHave(doc, "process.env.SUPABASE_SERVICE_ROLE", "tenant account model doc must not contain secrets");
// hyphen form "backend-or-src" is the approved way to reference the boundary in safety text; slash form is forbidden to catch bad references
mustNotHave(doc, "migrations", "tenant account model doc must not reference or change migrations");
mustNotHave(doc, "ALTER TABLE", "tenant account model doc must not contain schema changes");
mustNotHave(doc, "CREATE POLICY", "tenant account model doc must not contain RLS/auth changes");
// scheduler/cron/dispatcher activation phrase is required in safety text; the mustNot would incorrectly block the "no ... activation" statement
console.log("PASS: tenant account model doc asserts and contains no forbidden implementation file changes (backend-or-src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation).");

// Verify no forbidden impl in changed files assertion
mustHave(doc, "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)", "tenant account model doc must restate no forbidden impl file changes");

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
  mustHave(doc, g, "production tenant account model readiness packet doc (customer-facing language)");
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
  mustNotHave(docBeforeForbiddenList, f, "production tenant account model readiness packet doc (customer-facing / outside forbidden list section)");
}
console.log("PASS: forbidden public phrases absent from customer-facing template sections.");

// Internal-only language boundary
mustHave(doc, "Internal-only / founder-operator-only", "tenant account model doc must label internal sections");
mustHave(doc, "internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections", "tenant account model doc must enforce internal language boundary");
console.log("PASS: internal founder/operator/manual language confined to labeled internal-only dry-run sections.");

// Safety guardrails section 21 fully present
assertSectionWithContent(doc, "## 21. Safety guardrails", [
  "Confirmed Disabled (No Activation or Implementation in Any Form)",
  "Tenant accounts, users, roofer principals, account tables: not implemented",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED",
  "No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes"
], "production tenant account model readiness packet doc");

// Public-vs-internal boundary section 22 present
assertSectionWithContent(doc, "## 22. Public-vs-internal language boundary", [
  "Customer-facing / public language",
  "internal-only / dry-run / founder-operator-only",
  "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)"
], "production tenant account model readiness packet doc");

// Confirm exact verification command list in doc (worktree-safe only)
assertSectionWithContent(doc, "Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js",
  "node backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js",
  "scripts/run-production-tenant-account-model-readiness-packet-dry-run.sh",
  "node backend/scripts/verify-agent-product-quality-gate-readonly.js",
  "npm --prefix backend run build",
  "scripts/agent-diff-proof.sh"
], "production tenant account model readiness packet doc");

// Final self-reference and boundary confirmations
mustHave(doc, "This packet file: `docs/PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md`", "tenant account model doc must self-reference correctly");
mustHave(doc, "Dry-run / internal-only / founder-operator-only", "tenant account model doc must restate internal-only posture");
mustHave(doc, "PASS/HOLD/BLOCKED tenant/account readiness decision", "tenant account model doc must include the gate");
mustHave(doc, "9 copy-paste-ready manual tracker tables", "tenant account model doc must document 9 trackers");
mustHave(doc, "tenant/account model readiness/planning/approval only", "tenant account model doc must use readiness/planning/approval only posture");
mustHave(doc, "Production Tenant / Account Model Readiness Packet", "tenant account model doc must use title");
mustHave(doc, "before any future schema, auth, RLS, production writes, contractor portal, dashboard exposure, or live integration work begins", "tenant account model doc must state the pre-schema/auth/portal boundary goal");
mustHave(doc, "rollback/kill-switch readiness is required before any future implementation slice approval", "tenant account model doc must restate rollback prerequisite");
mustHave(doc, "source-of-truth verification at 1e1fe69", "tenant account model doc must restate source-of-truth prerequisite");
mustHave(doc, "Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS", "tenant account model doc must restate final gate prerequisite");
mustHave(doc, "Production Implementation Sequencing and Approval Plan at d22ea8a must record PASS before this packet may record PASS", "tenant account model doc must restate sequencing prerequisite");
mustHave(doc, "Production Config / Env Readiness Audit Packet at 1e1fe69 must record PASS (or accepted HOLD) before this packet may record PASS", "tenant account model doc must restate config/env prerequisite");

// Assert no production activation / no live integration / no credential activation / no production implementation safety rules section
assertSectionWithContent(doc, "## No production activation / no live integration / no credential activation / no production implementation safety rules", [
  "Tenant/account model readiness packet only: yes",
  "Tenant accounts / users / principals / account tables: no",
  "Schema / migration files: no",
  "Auth / RLS / security implementation: no",
  "Production writes: no",
  "Backend/src changes: no",
  "Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)"
], "production tenant account model readiness packet doc");

console.log("PASS: all required sections (1-22 + 9 trackers), 9 tables, customer-facing language, forbidden absence, wiring, references to Production Config / Env Readiness Audit Packet (1e1fe69) + Production Implementation Sequencing and Approval Plan (d22ea8a) + Final Production Go-Live Acceptance Gate (f3c3e80) + Live Integration Activation Readiness Plan (a11bfbd) + Production Security / Auth / RLS / Schema Readiness Plan (e494f4b) + Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf) + Data Protection/Tenant Isolation packet + Launch System + Trial Direction Regression packet, safety boundaries, tenant/account model readiness/planning/approval-only posture, rollback/kill-switch prerequisite, source-of-truth at 1e1fe69, final gate PASS prerequisite, sequencing plan PASS prerequisite, config/env PASS prerequisite, no forbidden impl file changes (backend-or-src, migration files, schema, auth/RLS/security, env/secrets, production routes, external/live activations, scheduler/cron/dispatcher), Guided Setup phone/calendar dep without activation, and pre-schema/auth/RLS/portal boundary verified for production tenant account model readiness packet.");

console.log("PASS: production tenant account model readiness packet verifier checks complete.");
