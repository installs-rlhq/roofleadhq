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

const docPath = "docs/FILLOUT_IMPLEMENTATION_CHECKLIST_PACKET.md";
const wrapperPath = "scripts/run-fillout-implementation-checklist-dry-run.sh";
const verifierPath = "backend/scripts/verify-fillout-implementation-checklist-readonly.js";
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
assertSectionWithContent(doc, "## 1. Purpose and Scope", [
  "manual implementation checklist",
  "Guided Setup",
  "plan-fit routing",
  "custom-review routing",
  "future native workflow configuration",
], "packet doc");
console.log("PASS: purpose/scope is documented.");

// 4. No live Fillout publication / no Fillout API boundary documented
mustHave(doc, "not** a live form publication", "packet doc Fillout publication boundary");
mustHave(doc, "does **not** call the Fillout API", "packet doc Fillout API boundary");
mustHave(doc, "no live Fillout form publication", "packet doc safety");
mustHave(doc, "no Fillout API calls", "packet doc safety");
console.log("PASS: no live Fillout publication / no Fillout API boundary is documented.");

// 5. All 16 Fillout sections are documented
const formSections = [
  "Form Section 1: Company / Contact Basics",
  "Form Section 2: Monthly Lead Volume",
  "Form Section 3: Lead Sources",
  "Form Section 4: Current Lead Handling",
  "Form Section 5: CRM & Reporting",
  "Form Section 6: Locations, Service Areas & Routing Complexity",
  "Form Section 7: Phone & Calendar Setup",
  "Form Section 8: Human Review / Escalation",
  "Form Section 9: Post-Inspection Follow-Up",
  "Form Section 10: Post-Inspection Homeowner Feedback",
  "Form Section 11: Photo Handling",
  "Form Section 12: Unsupported or Later-Only Requests",
  "Form Section 13: Messaging Compliance",
  "Form Section 14: Exclusions & Routing Rules",
  "Form Section 15: Report Recipients",
  "Form Section 16: Final Plan-Fit Summary / Internal Routing",
];
for (const s of formSections) {
  mustHave(doc, s, "packet doc 16 form sections");
}
console.log("PASS: all 16 Fillout sections are documented.");

// 6. Recommended question sets are included
mustHave(doc, "### Recommended question set", "packet doc recommended question sets");
mustHave(doc, "Company legal or public name", "packet doc question set content");
mustHave(doc, "Estimated monthly inbound leads", "packet doc question set content");
mustHave(doc, "All lead sources you receive today", "packet doc question set content");
mustHave(doc, "What CRM or job management system do you use?", "packet doc question set content");
console.log("PASS: recommended question sets are included.");

// 7. Plan-fit routing logic is documented
assertSectionWithContent(doc, "## 3. Plan-Fit Routing Logic", [
  "### Starter candidate",
  "### Growth candidate",
  "### Elite candidate",
  "### Custom Review",
], "packet doc");
console.log("PASS: plan-fit routing logic is documented.");

// 8. 2+ locations triggers Custom Review
mustHave(doc, "2+ locations must trigger Custom Review", "packet doc 2+ locations custom review");
mustHave(doc, "**2+ locations**", "packet doc 2+ locations trigger");
console.log("PASS: 2+ locations triggers Custom Review.");

// 9. 500+ leads/month triggers Custom Review
mustHave(doc, "500+ triggers Custom Review", "packet doc 500+ custom review");
mustHave(doc, "**500+ leads/month**", "packet doc 500+ trigger");
console.log("PASS: 500+ leads/month triggers Custom Review.");

// 10. Multiple calendars/phone numbers/sales reps triggers Custom Review
mustHave(doc, "**Multiple calendars** triggers Custom Review", "packet doc multiple calendars");
mustHave(doc, "**Multiple phone numbers** triggers Custom Review", "packet doc multiple phone numbers");
mustHave(doc, "**Multiple sales reps** triggers Custom Review", "packet doc multiple sales reps");
console.log("PASS: multiple calendars/phone numbers/sales reps triggers Custom Review.");

// 11. Monthly lead volume options are documented
const volumeOptions = ["0–50", "51–100", "101–300", "301–500", "500+", "Not sure"];
for (const v of volumeOptions) {
  mustHave(doc, v, "packet doc monthly lead volume options");
}
console.log("PASS: monthly lead volume options are documented.");

// 12. Lead source questions/options are documented
const leadSources = [
  "Website form",
  "Phone calls",
  "Google Ads",
  "Google Business Profile",
  "Google Local Services Ads",
  "Facebook Lead Ads",
  "Facebook messages",
  "Angi / HomeAdvisor",
  "Thumbtack",
  "Referrals",
  "Email",
  "Manual outreach list",
  "Other",
  "Not sure",
];
for (const s of leadSources) {
  mustHave(doc, s, "packet doc lead source options");
}
mustHave(doc, "highest-priority lead sources", "packet doc lead source questions");
mustHave(doc, "top priority source for first launch", "packet doc lead source questions");
console.log("PASS: lead source questions/options are documented.");

// 13. CRM/reporting questions are documented
const crmOptions = [
  "No CRM",
  "JobNimbus",
  "AccuLynx",
  "Jobber",
  "ServiceTitan",
  "HubSpot",
  "Other",
  "Not sure",
];
for (const c of crmOptions) {
  mustHave(doc, c, "packet doc CRM options");
}
mustHave(doc, "Do you need weekly/monthly CSV exports?", "packet doc CRM/reporting questions");
console.log("PASS: CRM/reporting questions are documented.");

// 14. CSV not native CRM sync boundary is documented
mustHave(doc, "CSV is **one-directional reporting/manual CRM/reference use**", "packet doc CSV boundary");
mustHave(doc, "CSV is **not** bidirectional CRM integration", "packet doc CSV boundary");
mustHave(doc, "Bidirectional CRM integration is **later only**", "packet doc CSV boundary");
console.log("PASS: CSV not native CRM sync boundary is documented.");

// 15. Phone/calendar setup guidance is documented
mustHave(doc, "Calendar booking workflow must be clarified before go-live", "packet doc phone/calendar guidance");
mustHave(doc, "RoofLeadHQ AI can book inspections/appointments only after booking/calendar preferences are known and approved", "packet doc phone/calendar guidance");
mustHave(doc, "No live Google Calendar creation is activated by this packet", "packet doc phone/calendar guidance");
console.log("PASS: phone/calendar setup guidance is documented.");

// 16. RoofLeadHQ-provided phone number guidance is documented
mustHave(doc, "RoofLeadHQ-provided phone number", "packet doc RoofLeadHQ phone guidance");
mustHave(doc, "clear instructions on using the RoofLeadHQ-provided phone number where applicable", "packet doc RoofLeadHQ phone guidance");
console.log("PASS: RoofLeadHQ-provided phone number guidance is documented.");

// 17. Human review/escalation model is documented
assertSectionWithContent(doc, "Form Section 8: Human Review / Escalation", [
  "Roofer/contractor review for",
  "RoofLeadHQ/Jason review only for",
], "packet doc");
console.log("PASS: human review/escalation model is documented.");

// 18. Roofer-first escalation is documented
mustHave(doc, "Roofer-first escalation is default", "packet doc roofer-first escalation");
mustHave(doc, "pricing question", "packet doc roofer escalation topics");
mustHave(doc, "upset homeowner", "packet doc roofer escalation topics");
console.log("PASS: roofer-first escalation is documented.");

// 19. RoofLeadHQ/Jason system-quality limitation is documented
mustHave(doc, "bad or unclear AI response", "packet doc RoofLeadHQ/Jason review scope");
mustHave(doc, "quality-control concern", "packet doc RoofLeadHQ/Jason review scope");
mustHave(doc, "RoofLeadHQ/Jason does not override roofer homeowner decisions", "packet doc system-quality limitation");
console.log("PASS: RoofLeadHQ/Jason system-quality limitation is documented.");

// 20. Post-inspection follow-up and feedback questions are documented
mustHave(doc, "Do you want post-inspection follow-up?", "packet doc post-inspection follow-up");
mustHave(doc, "Do you want simple post-inspection homeowner feedback?", "packet doc post-inspection feedback");
console.log("PASS: post-inspection follow-up and feedback questions are documented.");

// 21. permission_to_use_publicly yes/no/not_asked is documented
mustHave(doc, "permission_to_use_publicly", "packet doc permission field");
mustHave(doc, "**yes**", "packet doc permission yes value");
mustHave(doc, "**no**", "packet doc permission no value");
mustHave(doc, "**not_asked**", "packet doc permission not_asked value");
console.log("PASS: permission_to_use_publicly yes/no/not_asked is documented.");

// 22. Photo handling future/optional boundary is documented
mustHave(doc, "Photos are **future/optional only**", "packet doc photos boundary");
mustHave(doc, "photos_available", "packet doc photos status fields");
mustHave(doc, "photos_received", "packet doc photos status fields");
mustHave(doc, "No photo upload feature is activated by this packet", "packet doc photos boundary");
console.log("PASS: photo handling future/optional boundary is documented.");

// 23. Unsupported/later-only requests are documented
mustHave(doc, "generate quotes, estimates, invoices, or collect payments", "packet doc unsupported requests");
mustHave(doc, "HOLD / Review", "packet doc unsupported routing");
mustHave(doc, "aggressive photo collection", "packet doc later-only list");
console.log("PASS: unsupported/later-only requests are documented.");

// 24. Messaging compliance question and routing are documented
mustHave(doc, "Will RoofLeadHQ only be following up with homeowners or leads who contacted your business or gave permission to be contacted?", "packet doc messaging compliance");
mustHave(doc, "Messaging compliance review needed before setup", "packet doc messaging compliance routing");
mustHave(doc, "We can only follow up with leads who contacted your business or gave permission to be contacted.", "packet doc prospect-facing wording");
console.log("PASS: messaging compliance question and routing are documented.");

// 25. Report recipients section is documented
mustHave(doc, "Report recipient names and emails", "packet doc report recipients");
mustHave(doc, "blocker/escalation summaries", "packet doc report recipients");
console.log("PASS: report recipients section is documented.");

// 26. Final plan-fit/internal routing summary is documented
mustHave(doc, "Likely plan fit", "packet doc final routing summary");
mustHave(doc, "HOLD/BLOCKED items", "packet doc final routing summary");
mustHave(doc, "recommended next action", "packet doc final routing summary");
console.log("PASS: final plan-fit/internal routing summary is documented.");

// 27. Native workflow configuration relationship is documented
assertSectionWithContent(doc, "## 4. Native Workflow Configuration Relationship", [
  "plan tier",
  "lead volume limit",
  "lead source settings",
  "Fillout should not become the workflow brain",
  "intake/setup data that informs native configuration",
], "packet doc");
console.log("PASS: native workflow configuration relationship is documented.");

// 28. Lindy bridge relationship is documented
assertSectionWithContent(doc, "## 5. Lindy Bridge Relationship", [
  "Existing Lindy workflows may temporarily assist low-volume early flows",
  "should **not** make Lindy the long-term source of truth",
  "Native RoofLeadHQ/Supabase should own the long-term workflow state/configuration",
  "LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md",
], "packet doc");
console.log("PASS: Lindy bridge relationship is documented.");

// 29. Forbidden public language is absent
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
  "native CRM sync",
  "fully autonomous",
  "no human oversight",
  "fake reviews",
  "review farming",
  "automatic public review generation",
];
for (const f of forbidden) {
  mustNotHave(doc, f, "packet doc forbidden language");
}
mustHave(doc, "Forbidden public language", "packet doc forbidden language section");
console.log("PASS: forbidden public language is absent from packet doc body.");

// 30. Safety/no-live-activation/no-production-data/no-integration boundaries are documented
const safetyMarkers = [
  "planning/readiness/placement packet only",
  "no live Fillout form publication",
  "no Fillout API calls",
  "no production customer data collection",
  "no production data reads",
  "no customer data handling changes",
  "no backend live activation",
  "no integrations activated",
  "no external sends",
  "no production Supabase writes",
  "no auth/RLS/schema/security changes",
  "no env/credential changes",
  "no public route activation",
  "no live SMS/Twilio/Vapi/Resend/Calendar/Lindy activation",
  "read-only verifier only",
  "dry-run wrapper only",
  "demo_ready_with_live_automation_disabled",
  "Live automation remains disabled unless Jason explicitly approves activation",
  "WORKSPACE_MODE=dry-run",
  "SMS_ACTIVATION=false",
  "CALENDAR_ACTIVATION=false",
  "VAPI_ACTIVATION=false",
  "SUPABASE_WRITES=false",
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "packet doc safety");
}
console.log("PASS: safety/no-live-activation/no-production-data/no-integration boundaries are documented.");

// Wrapper safety
mustHave(wrapper, "verify-fillout-implementation-checklist-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-fillout-implementation-checklist-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node backend/scripts/verify-fillout-implementation-checklist-readonly.js", "dry-run wrapper");

const unsafeImpl = [
  "twilio.messages.create",
  "supabase.from(",
  "resend.emails.send",
  "calendar.events.insert",
  "vapi.calls.create",
  "curl -X POST https://",
  'fetch("https://',
  "ALTER TABLE",
  "CREATE POLICY",
  "CREATE TABLE",
  "service_role",
  "process.env.SUPABASE_SERVICE_ROLE",
];
for (const s of unsafeImpl) {
  mustNotHave(wrapper, s, "dry-run wrapper");
}
console.log("PASS: dry-run wrapper invokes verifier and has no unsafe implementation strings.");

// 31. Required wiring into aggregate readiness and context docs is present
mustHave(aggregate, "verify-fillout-implementation-checklist-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Fillout Implementation Checklist Packet", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "FILLOUT_IMPLEMENTATION_CHECKLIST_PACKET.md",
  "run-fillout-implementation-checklist-dry-run.sh",
  "verify-fillout-implementation-checklist-readonly.js",
  "Fillout Implementation Checklist",
  "fillout implementation checklist",
  "plan-fit routing",
  "16-section",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference Fillout implementation checklist packet.");

console.log("PASS: Fillout implementation checklist packet is planning-only, product-moving, and dry-run safe.");