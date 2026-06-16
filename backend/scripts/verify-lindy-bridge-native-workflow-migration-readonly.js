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

const docPath = "docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md";
const wrapperPath = "scripts/run-lindy-bridge-native-workflow-migration-dry-run.sh";
const verifierPath = "backend/scripts/verify-lindy-bridge-native-workflow-migration-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const contextAgentGrokPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

// 1. Required packet doc exists
console.log("PASS: required packet doc exists.");

// 2. Dry-run wrapper exists
mustHave(wrapper, "#!/usr/bin/env bash", "dry-run wrapper");
console.log("PASS: dry-run wrapper exists.");

// 3. Purpose/scope is documented
assertSectionWithContent(doc, "## Purpose and Scope", [
  "practical bridge strategy for Lindy",
  "Lindy is not being removed immediately",
  "RoofLeadHQ/Supabase should become the source of truth",
  "Native backend workflow logic should replace Lindy over time",
], "packet doc");
console.log("PASS: purpose/scope is documented.");

// 4. Lindy temporary bridge strategy is documented
mustHave(doc, "temporary bridge", "packet doc Lindy bridge strategy");
mustHave(doc, "Existing Lindy workflows may be preserved temporarily", "packet doc Lindy bridge strategy");
mustHave(doc, "Lindy can assist only where existing low-volume workflows are already useful", "packet doc Lindy bridge strategy");
console.log("PASS: Lindy temporary bridge strategy is documented.");

// 5. Lowest workable/free plan / cost-control concept is documented
mustHave(doc, "lowest workable/free plan", "packet doc cost control");
mustHave(doc, "limited/downgraded where possible to reduce cost", "packet doc cost control");
console.log("PASS: lowest workable/free plan / cost-control concept is documented.");

// 6. Major new business logic should not be built in Lindy
mustHave(doc, "Major new business logic should not be built in Lindy", "packet doc Lindy build boundary");
console.log("PASS: major new business logic should not be built in Lindy is documented.");

// 7. Lindy allowed temporary uses are documented
assertSectionWithContent(doc, "### Lindy may temporarily be used for", [
  "existing workflows already built",
  "light edits to current flows",
  "low-volume first-roofer bridge workflows",
  "internal/back-office support",
  "draft-only planning artifacts",
  "temporary manual/founder-assisted flows",
  "non-critical helper automations",
], "packet doc");
console.log("PASS: Lindy allowed temporary uses are documented.");

// 8. Lindy long-term prohibited ownership areas are documented
assertSectionWithContent(doc, "### Lindy should not own long term", [
  "homeowner SMS experience",
  "customer-facing booking flow",
  "lead status source of truth",
  "dashboard data",
  "production reports from live data",
  "Supabase source-of-truth logic",
  "production workflow timers",
  "live sends",
  "multi-roofer routing logic",
  "CRM sync",
  "payment, quote, estimate, invoice, or deposit workflows",
  "customer-facing workflow authority",
], "packet doc");
console.log("PASS: Lindy long-term prohibited ownership areas are documented.");

// 9. Native RoofLeadHQ/Supabase architecture is documented
assertSectionWithContent(doc, "## 3. Native Architecture Direction", [
  "RoofLeadHQ backend",
  "Supabase source of truth",
  "native workflow state machine",
  "direct integrations only after explicit approval",
  "Twilio for SMS",
  "Vapi for calls",
  "Resend for email",
  "Google Calendar for booking",
], "packet doc");
console.log("PASS: native RoofLeadHQ/Supabase architecture is documented.");

// 10. n8n/Make not required unless narrow bridge is documented
mustHave(doc, "n8n/Make are not required unless a narrow temporary bridge is needed", "packet doc n8n/Make boundary");
mustHave(doc, "Do not rebuild Lindy inside n8n or Make as the permanent system", "packet doc n8n/Make boundary");
console.log("PASS: n8n/Make not required unless narrow bridge is documented.");

// 11. Migration buckets are documented
const migrationBuckets = [
  "Preserve temporarily in Lindy",
  "Move into RoofLeadHQ backend workflow logic",
  "Move into Supabase data/state logic",
  "Keep manual/founder-operated for first paid roofer",
  "Remove or defer",
];
for (const b of migrationBuckets) {
  mustHave(doc, b, "packet doc migration buckets");
}
console.log("PASS: migration buckets are documented.");

// 12. Migration tracker table exists
mustHave(doc, "### Migration tracker table", "packet doc migration tracker");
mustHave(doc, "| Workflow area | Current/proposed Lindy role | Migration bucket | Future owner | First paid roofer approach | Safety boundary | Migration trigger | Notes |", "packet doc migration tracker");
mustHave(doc, "Lead intake capture", "packet doc migration tracker rows");
mustHave(doc, "Lead status", "packet doc migration tracker rows");
mustHave(doc, "Booked inspection tracking", "packet doc migration tracker rows");
console.log("PASS: migration tracker table exists.");

// 13. Native workflow engine ownership list is documented
assertSectionWithContent(doc, "## 5. Native Workflow Engine Ownership", [
  "lead intake records",
  "lead source tracking",
  "lead status",
  "response/follow-up state",
  "missed-lead recovery state",
  "manual outreach state",
  "roofer review queue",
  "RoofLeadHQ/Jason system review queue",
  "appointment readiness state",
  "booked inspection tracking",
  "post-inspection follow-up state",
  "post-inspection feedback capture state",
  "report/CSV export state",
  "usage/lead-volume tracking",
  "plan-tier feature flags",
  "upgrade/custom-review triggers",
  "safety/live-activation controls",
], "packet doc");
console.log("PASS: native workflow engine ownership list is documented.");

// 14. First paid roofer bridge plan is documented
assertSectionWithContent(doc, "## 6. First Paid Roofer Bridge Plan", [
  "Lindy can assist only where existing low-volume workflows are already useful",
  "Supabase/RoofLeadHQ should increasingly hold authoritative records and statuses",
  "Jason/founder operation may manually review sensitive states",
  "No uncontrolled live automation",
  "No homeowner/customer sends unless separately approved",
  "Existing Lindy flows must not become the permanent source of truth",
], "packet doc");
console.log("PASS: first paid roofer bridge plan is documented.");

// 15. Roofer-first escalation is documented
assertSectionWithContent(doc, "### Roofer-first escalation", [
  "Default escalation to roofer/contractor",
  "pricing questions",
  "estimate questions",
  "scheduling issue",
  "homeowner asks for roofer directly",
], "packet doc");
console.log("PASS: roofer-first escalation is documented.");

// 16. RoofLeadHQ/Jason system-quality review limitation is documented
assertSectionWithContent(doc, "### RoofLeadHQ/Jason system-quality review limitation", [
  "Escalate to RoofLeadHQ/Jason only for system-quality issues",
  "bad or unclear AI response",
  "broken routing",
  "dashboard/report discrepancy",
  "workflow state confusion",
], "packet doc");
console.log("PASS: RoofLeadHQ/Jason system-quality review limitation is documented.");

// 17. Subscription tiers as configuration profiles are documented
mustHave(doc, "Starter, Growth, Elite, and Custom should not be separate workflow engines", "packet doc tier configuration");
mustHave(doc, "one core workflow engine with plan-based configuration", "packet doc tier configuration");
console.log("PASS: subscription tiers as configuration profiles are documented.");

// 18. Starter/Growth/Elite/Custom configuration details are documented
assertSectionWithContent(doc, "### Starter configuration may include", [
  "up to 100 leads/month",
  "single location",
  "core lead response",
  "basic follow-up",
  "basic appointment booked status",
  "basic weekly/monthly summary",
], "packet doc");
assertSectionWithContent(doc, "### Growth configuration may include", [
  "up to 300 leads/month",
  "missed lead recovery",
  "lead source tracking",
  "appointment readiness workflow",
  "booked inspection tracking",
  "post-inspection follow-up",
  "post-inspection feedback capture",
  "CSV export",
], "packet doc");
assertSectionWithContent(doc, "### Elite configuration may include", [
  "up to 500 leads/month",
  "deeper source segmentation",
  "advanced reporting",
  "larger review queue capacity",
  "priority setup/support",
], "packet doc");
console.log("PASS: Starter/Growth/Elite/Custom configuration details are documented.");

// 19. Custom Review triggers are documented
assertSectionWithContent(doc, "### Custom Review triggers must include", [
  "500+ leads/month",
  "2+ locations",
  "multiple calendars",
  "multiple phone numbers",
  "multiple sales reps",
  "complex service-area routing",
  "advanced reporting needs",
  "unusual integration needs",
  "multi-location operations",
], "packet doc");
console.log("PASS: Custom Review triggers are documented.");

// 20. Staged E2E relationship is documented
assertSectionWithContent(doc, "## 8. Staged E2E Testing Relationship", [
  "fixture-only first",
  "sandbox/test-mode next",
  "live activation only after explicit approval",
  "test Lindy-bridge assumptions without live sends",
  "test native workflow states before channel activation",
  "test plan-tier configuration before onboarding multiple roofers",
  "test CSV/reporting outputs with fake data only",
], "packet doc");
console.log("PASS: staged E2E relationship is documented.");

// 21. demo_ready_with_live_automation_disabled is preserved
mustHave(doc, "demo_ready_with_live_automation_disabled", "packet doc safety posture");
mustHave(doc, "Live automation remains disabled unless Jason explicitly approves activation", "packet doc safety posture");
console.log("PASS: demo_ready_with_live_automation_disabled is preserved.");

// 22. No-live-activation boundaries are documented
const safetyMarkers = [
  "planning/readiness/placement packet only",
  "no live Lindy workflows",
  "no live SMS",
  "no Twilio live sends",
  "no Vapi live calls",
  "no Resend live emails",
  "no Google Calendar event creation",
  "no scheduler/cron/dispatcher activation",
  "no public route activation",
  "no production Supabase writes",
  "no production customer data handling changes",
  "no auth/RLS/schema/security changes",
  "no env/credential changes",
  "no external service calls",
  "no homeowner/customer notifications",
  "no CRM sync",
  "no payment/deposit/invoice/estimate automation",
  "read-only verifier only",
  "dry-run wrapper only",
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "packet doc safety boundaries");
}
console.log("PASS: no-live-activation boundaries are documented.");

// 23. Forbidden public language is absent
const forbidden = [
  "book jobs",
  "booked jobs",
  "close jobs",
  "guaranteed jobs",
  "guaranteed revenue",
  "guaranteed appointments",
  "automatic estimate",
  "automatic quote",
  "automatic invoice",
  "automatic payment",
  "fully autonomous",
  "no human oversight",
  "fake reviews",
  "review farming",
  "automatic public review generation",
];
for (const f of forbidden) {
  mustNotHave(doc, f, "packet doc forbidden language");
}
mustHave(doc, "### Forbidden public language", "packet doc forbidden language section");
mustHave(doc, "booked inspections", "packet doc preferred language");
mustHave(doc, "native workflow engine", "packet doc preferred language");
mustHave(doc, "Supabase source of truth", "packet doc preferred language");
console.log("PASS: forbidden public language is absent from packet doc body.");

// 24. Required wiring into aggregate readiness and context docs is present
mustHave(aggregate, "verify-lindy-bridge-native-workflow-migration-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Lindy Bridge", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md",
  "run-lindy-bridge-native-workflow-migration-dry-run.sh",
  "verify-lindy-bridge-native-workflow-migration-readonly.js",
  "Lindy Bridge",
  "native workflow engine",
  "temporary bridge",
  "Supabase source of truth",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference Lindy bridge migration plan.");

// Wrapper wiring and safety
mustHave(wrapper, "verify-lindy-bridge-native-workflow-migration-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-lindy-bridge-native-workflow-migration-readonly.js", "dry-run wrapper");
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "dry-run wrapper");

const unsafeImpl = [
  "twilio.messages.create",
  "supabase.from(",
  "resend.emails.send",
  "calendar.events.insert",
  "vapi.calls.create",
  "retell.call",
  "curl -X POST https://",
  'fetch("https://',
  "fetch('https://",
  "ALTER TABLE",
  "CREATE POLICY",
  "DROP POLICY",
  "CREATE TABLE",
  "service_role",
  "process.env.SUPABASE_SERVICE_ROLE",
];
for (const s of unsafeImpl) {
  mustNotHave(wrapper, s, "dry-run wrapper");
}
console.log("PASS: dry-run wrapper invokes verifier and quality gate without unsafe implementation strings.");

console.log("PASS: Lindy bridge + native workflow migration plan is planning-only, product-moving, and dry-run safe.");