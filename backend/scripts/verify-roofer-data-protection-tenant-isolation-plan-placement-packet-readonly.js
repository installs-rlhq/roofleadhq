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

const docPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";
const wrapperPath = "scripts/run-roofer-data-protection-tenant-isolation-plan-placement-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for roofer data protection tenant isolation plan placement packet exist.");

// File existence and basic properties
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "roofer data protection packet doc");
mustHave(doc, "run-roofer-data-protection-tenant-isolation-plan-placement-packet-dry-run.sh", "roofer data protection packet doc references wrapper");

// Verifier must be 100644 (not executable) — we check mode on disk
const verifierStat = fs.statSync(path.join(root, verifierPath));
const mode = (verifierStat.mode & 0o777).toString(8);
if (mode !== "644" && mode !== "664") {
  // Accept common non-exec; strict check prefers 644
  if ((verifierStat.mode & 0o111) !== 0) {
    throw new Error(`verifier must not be executable (expected 100644); mode: ${mode}`);
  }
}
console.log("PASS: verifier exists and is non-executable (100644 style).");

// Wrapper calls this verifier
mustHave(wrapper, "verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js", "wrapper must run node --check on verifier");

// Wrapper calls product quality gate
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "wrapper must call agent product quality gate");

// Wrapper does not contain unsafe implementation strings
const unsafeImpl = [
  "ALTER TABLE", "CREATE POLICY", "DROP POLICY", "CREATE TABLE",
  "supabase.from(", "supabase.rpc(", "service_role", "process.env.SUPABASE_SERVICE_ROLE",
  "twilio", "resend", "vapi", "calendar.events", 'fetch("https://', "curl https://"
];
for (const s of unsafeImpl) {
  mustNotHave(wrapper, s, "wrapper");
}

// Doc includes all required sections (operational, not heading-only)
assertSectionWithContent(doc, "## Purpose and safety posture", ["Planning-only packet: yes", "Auth changed: no", "This is a planning/context placement packet only"], "roofer data protection doc");
assertSectionWithContent(doc, "## Founder requirement", ["Roofer Data Protection and Tenant Isolation Readiness Milestone", "Before RoofLeadHQ expands beyond founder/operator-controlled dry-run/manual execution"], "roofer data protection doc");
assertSectionWithContent(doc, "## 90-day build plan placement", ["90-day build plan", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md", "dedicated 90-day plan"], "roofer data protection doc");
assertSectionWithContent(doc, "## Required placement before multi-roofer scale", ["BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE", "Placement before multi-roofer onboarding: yes"], "roofer data protection doc");
assertSectionWithContent(doc, "## Required placement before contractor dashboard / portal exposure", ["BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE", "Placement before contractor dashboard/portal: yes"], "roofer data protection doc");
assertSectionWithContent(doc, "## Required placement before live production workflows", ["BLOCKER BEFORE LIVE PRODUCTION WORKFLOWS", "Placement before live production workflows: yes"], "roofer data protection doc");
assertSectionWithContent(doc, "## Required placement before broader production lead data writes", ["BLOCKER BEFORE BROADER PRODUCTION LEAD DATA WRITES", "Placement before production lead routing: yes", "Placement before broader production Supabase writes: yes"], "roofer data protection doc");
assertSectionWithContent(doc, "## Required placement before external contractor/homeowner notifications", ["Placement before external contractor/homeowner notifications: yes"], "roofer data protection doc");
assertSectionWithContent(doc, "## Planning-only non-implementation scope", ["auth changes", "database schema changes", "database migrations", "RLS policies", "production access logic", "contractor portal permissions", "secrets rotation", "encryption changes", "live monitoring", "incident response tooling", "production data writes"], "roofer data protection doc");
assertSectionWithContent(doc, "## Roofer data protection milestone overview", ["Milestone name:", "Milestone owner:", "Proposed 90-day phase:", "Recommended placement date/window:", "Current implementation status: NOT STARTED", "Planning status: DRAFT", "Founder decision: HOLD"], "roofer data protection doc");
assertSectionWithContent(doc, "## Tenant isolation future scope", ["Tenant isolation future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Lead data boundary future scope", ["Lead data boundary future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Least-privilege access future scope", ["Least-privilege access future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Row-level / data-boundary controls future scope", ["Row-level / data-boundary controls future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Secrets and credential handling future scope", ["Secrets and credential handling future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Encryption and data storage future scope", ["Encryption and data storage future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Audit logging future scope", ["Audit logging future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Data retention, deletion, and export future scope", ["Data retention, deletion, and export future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Backup and recovery future scope", ["Backup and recovery future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Breach-response runbook future scope", ["Breach-response runbook future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Access review and operator permission future scope", ["Access review and operator permission future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Contractor portal / dashboard security future scope", ["Contractor portal / dashboard security future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Vendor and integration data-sharing future scope", ["Vendor and integration data-sharing future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## Security/privacy readiness gate future scope", ["Security/privacy readiness gate future scope: Planned"], "roofer data protection doc");
assertSectionWithContent(doc, "## 90-day milestone dependency map", ["Roofer Data Protection and Tenant Isolation Readiness Milestone is a hard dependency", "BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE"], "roofer data protection doc");
assertSectionWithContent(doc, "## Pre-production security gate checklist", ["Future pre-production security gate", "Row-level / data-boundary controls implemented and verified"], "roofer data protection doc");
assertSectionWithContent(doc, "## Multi-roofer scale blocker checklist", ["missing milestone owner", "missing tenant isolation future scope", "auth/schema/RLS/secret/access-control change attempted", "live automation risk", "production data touch risk"], "roofer data protection doc");
assertSectionWithContent(doc, "## Future implementation packet candidates", ["Roofer Data Protection Tenant Isolation Implementation Packet", "Row-Level Security and Data-Boundary Controls Packet"], "roofer data protection doc");
assertSectionWithContent(doc, "## Out-of-scope for this packet", ["Implementing any security control", "Changing auth", "Altering database schema"], "roofer data protection doc");
assertSectionWithContent(doc, "## No production activation / no schema / no auth-change safety rules", ["Planning-only packet: yes", "Auth changed: no", "RLS policy changed: no", "Production data touched: no"], "roofer data protection doc");
assertSectionWithContent(doc, "## Founder/operator decision log", ["Founder/operator decision log", "PASS / HOLD / BLOCKED", "dry-run/internal-only"], "roofer data protection doc");
assertSectionWithContent(doc, "## 90-day plan insertion tracker", ["90-day plan insertion tracker", "Context file updated: yes", "90-day plan surface updated: yes", "ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md"], "roofer data protection doc");
assertSectionWithContent(doc, "## Next-operator handoff", ["Next-operator handoff", "Safety reminder", "dry-run/internal-only/founder-operator-only"], "roofer data protection doc");
assertSectionWithContent(doc, "## Explicit planning-only / no-live-workflow-activation confirmation", ["Planning-only packet: yes", "No auth changes: yes", "No database schema changes: yes", "No RLS policies: yes", "No production data writes: yes", "No live workflow activation activated: yes"], "roofer data protection doc");

// Doc includes all required concrete fields (key: value style)
const requiredConcrete = [
  "Milestone name: Roofer Data Protection and Tenant Isolation Readiness Milestone",
  "Milestone owner:",
  "Proposed 90-day phase:",
  "Recommended placement date/window:",
  "Placement before multi-roofer onboarding: yes",
  "Placement before contractor dashboard/portal: yes",
  "Placement before live production workflows: yes",
  "Placement before production lead routing: yes",
  "Placement before broader production Supabase writes: yes",
  "Placement before external contractor/homeowner notifications: yes",
  "Roofer information protected: planned",
  "Roofer lead data protected: planned",
  "Tenant isolation required: planned",
  "Row-level/data-boundary controls required: planned",
  "Least-privilege access required: planned",
  "Audit logging required: planned",
  "Encryption/secrets handling review required: planned",
  "Retention/deletion/export policy required: planned",
  "Backup/recovery review required: planned",
  "Breach-response runbook required: planned",
  "Contractor dashboard/portal security review required: planned",
  "Vendor/integration data-sharing review required: planned",
  "Security/privacy readiness gate required: planned",
  "Future implementation owner:",
  "Future review owner:",
  "Future approval owner:",
  "Dependency before scale: yes",
  "Dependency before production: yes",
  "Current implementation status: NOT STARTED",
  "Planning status: DRAFT",
  "Founder decision: HOLD",
  "Next manual planning action:",
  "Next manual planning action owner:",
  "Next manual planning action due date:",
  "Evidence/source reference:",
  "Context file updated: yes",
  "90-day plan surface updated: yes",
  "Notes:"
];
assertConcreteFields(doc, requiredConcrete, "roofer data protection doc");

// Required milestone placement language
mustHave(doc, "Roofer Data Protection and Tenant Isolation Readiness Milestone", "roofer data protection doc");
mustHave(doc, "Before RoofLeadHQ expands beyond founder/operator-controlled dry-run/manual execution into multi-roofer scale, contractor dashboards/portals, live production workflows, production lead routing, broader production Supabase writes, or external contractor/homeowner notifications, the build plan must include a security/privacy readiness milestone for protecting each roofer’s information and lead data as much as possible from data-breach concerns.", "roofer data protection doc");

// Required future gate blocker language (exact phrases)
mustHave(doc, "BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE", "roofer data protection doc");
mustHave(doc, "BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE", "roofer data protection doc");
mustHave(doc, "BLOCKER BEFORE BROADER PRODUCTION LEAD DATA WRITES", "roofer data protection doc");
mustHave(doc, "BLOCKER BEFORE LIVE PRODUCTION WORKFLOWS", "roofer data protection doc");

// Required non-goal language (does not implement)
mustHave(doc, "auth changes", "roofer data protection doc");
mustHave(doc, "database schema changes", "roofer data protection doc");
mustHave(doc, "database migrations", "roofer data protection doc");
mustHave(doc, "RLS policies", "roofer data protection doc");
mustHave(doc, "production access logic", "roofer data protection doc");
mustHave(doc, "contractor portal permissions", "roofer data protection doc");
mustHave(doc, "secrets rotation", "roofer data protection doc");
mustHave(doc, "encryption changes", "roofer data protection doc");
mustHave(doc, "live monitoring", "roofer data protection doc");
mustHave(doc, "incident response tooling", "roofer data protection doc");
mustHave(doc, "production data writes", "roofer data protection doc");

// All required safety markers present
const safetyMarkers = [
  "Planning-only packet: yes",
  "Auth changed: no",
  "Database schema changed: no",
  "Migration added: no",
  "RLS policy changed: no",
  "Production access logic changed: no",
  "Contractor portal permission changed: no",
  "Secrets changed: no",
  "Production data touched: no",
  "External service called: no",
  "Live workflow activation activated: no",
  "Contractor notification sent: no",
  "Homeowner notification sent: no",
  "Calendar booking performed: no",
  "Estimate created: no",
  "Quote generated: no",
  "Payment/invoice behavior added: no"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "roofer data protection doc safety markers");
}

// Required HOLD/BLOCKED cases listed
const holdCases = [
  "missing milestone owner",
  "missing future implementation owner",
  "missing future review owner",
  "missing future approval owner",
  "missing proposed 90-day phase",
  "missing recommended placement window",
  "milestone not placed before multi-roofer onboarding",
  "milestone not placed before contractor dashboard/portal exposure",
  "milestone not placed before live production workflows",
  "milestone not placed before production lead routing",
  "milestone not placed before broader production Supabase writes",
  "milestone not placed before external contractor/homeowner notifications",
  "missing tenant isolation future scope",
  "missing lead data boundary future scope",
  "missing least-privilege access future scope",
  "missing row-level/data-boundary controls future scope",
  "missing audit logging future scope",
  "missing retention/deletion/export future scope",
  "missing breach-response future scope",
  "missing backup/recovery future scope",
  "missing contractor portal/dashboard security future scope",
  "missing security/privacy readiness gate",
  "any production implementation attempted in this packet",
  "auth/schema/RLS/secret/access-control change attempted",
  "live automation risk",
  "production data touch risk"
];
for (const c of holdCases) {
  mustHave(doc, c, "roofer data protection doc HOLD/BLOCKED cases");
}

// Future implementation packet candidates present
mustHave(doc, "Roofer Data Protection Tenant Isolation Implementation Packet", "roofer data protection doc");
mustHave(doc, "Row-Level Security and Data-Boundary Controls Packet", "roofer data protection doc");

// 90-day milestone dependency map present
mustHave(doc, "90-day milestone dependency map", "roofer data protection doc");
mustHave(doc, "hard dependency for the following", "roofer data protection doc");

// Pre-production security gate checklist present
mustHave(doc, "Pre-production security gate checklist", "roofer data protection doc");

// Multi-roofer scale blocker checklist present
mustHave(doc, "Multi-roofer scale blocker checklist", "roofer data protection doc");

// Founder/operator decision log present
mustHave(doc, "Founder/operator decision log", "roofer data protection doc");

// 90-day plan insertion tracker present
mustHave(doc, "90-day plan insertion tracker", "roofer data protection doc");

// Next-operator handoff present
mustHave(doc, "Next-operator handoff", "roofer data protection doc");

// Explicit planning-only confirmation
mustHave(doc, "Explicit planning-only / no-live-workflow-activation confirmation", "roofer data protection doc");
mustHave(doc, "This packet is explicitly:", "roofer data protection doc");

// Doc says this is planning-only and does not implement auth/schema/RLS/secrets/access-control changes
mustHave(doc, "planning-only", "roofer data protection doc");
mustHave(doc, "does not implement", "roofer data protection doc");
mustHave(doc, "No security controls are implemented by this packet", "roofer data protection doc");

// Forbidden business phrases are absent from doc and wrapper
const forbiddenBusiness = [
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "book jobs",
  "booked jobs",
  "guaranteed jobs",
  "guaranteed revenue",
  "guarantee jobs",
  "guarantee revenue",
  "live dispatch",
  "auto-estimate",
  "automatic estimate",
  "auto quote",
  "automatic quote",
  "invoice generated",
  "payment link",
  "collect payment"
];
for (const f of forbiddenBusiness) {
  mustNotHave(doc, f, "roofer data protection doc");
  mustNotHave(wrapper, f, "roofer data protection wrapper");
}

// Implementation-risk strings absent from new doc and wrapper
for (const s of unsafeImpl) {
  mustNotHave(doc, s, "roofer data protection doc");
}

// Aggregate first-paid readiness includes this verifier
mustHave(aggregate, "verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js", "aggregate readiness must include the new verifier");
mustHave(aggregate, "Roofer Data Protection and Tenant Isolation Plan Placement Packet", "aggregate readiness must describe the new packet");

// Verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "verifier index");
mustHave(verifierIndex, "run-roofer-data-protection-tenant-isolation-plan-placement-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js", "verifier index");

// First-paid launch context references the new packet
mustHave(contextFirstPaid, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "first paid launch context");
mustHave(contextFirstPaid, "Roofer Data Protection and Tenant Isolation Plan Placement Packet", "first paid launch context");

// Roofer dry-run onboarding context references the new packet
mustHave(contextRooferDryRun, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "roofer dry-run onboarding context");
mustHave(contextRooferDryRun, "Roofer Data Protection and Tenant Isolation", "roofer dry-run onboarding context");

// Grok workflow context references the new packet and preserves the corrected closeout lesson
mustHave(workflow, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "grok workflow context");
mustHave(workflow, "Roofer Data Protection and Tenant Isolation Plan Placement Packet", "grok workflow context");
mustHave(workflow, "After fast-forward merging an agent branch into canonical main while local HEAD is ahead of origin/main, do not run wrappers or scripts/check-agent-product-quality-gate.sh as canonical pre-push blockers because they can invoke safe readiness / aggregate and hit source-of-truth-sensitive legacy failures before push. Canonical pre-push should use only direct read-only checks that do not invoke aggregate: node --check for the packet verifier, the packet verifier directly, node backend/scripts/verify-agent-product-quality-gate-readonly.js directly, backend build, and clean git status; then push/fetch/source-of-truth; then run wrappers/full aggregate/backend build/source-of-truth. Cleanup should be idempotent.", "grok workflow context closeout lesson");

// Relevant 90-day/business build plan surface references the milestone
mustHave(businessGuide, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "business buildout daily guide");
mustHave(businessGuide, "Roofer Data Protection and Tenant Isolation Readiness Milestone", "business buildout daily guide");
mustHave(businessGuide, "BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE", "business buildout daily guide");

// Quality gate is referenced (via wrapper and aggregate patterns)
mustHave(qualityGate, "product-quality-gate", "quality gate doc (cross reference)");

console.log("PASS: all required sections, concrete fields, milestone language, blocker phrases, non-goal language, safety markers, HOLD/BLOCKED cases, future packets, dependency map, checklists, logs, trackers, handoff, planning-only confirmation, and wiring assertions passed for roofer data protection tenant isolation plan placement packet.");

console.log("PASS: forbidden business phrases and implementation-risk strings absent from doc and wrapper.");

console.log("PASS: Roofer Data Protection and Tenant Isolation Plan Placement Packet read-only verifier passed.");
