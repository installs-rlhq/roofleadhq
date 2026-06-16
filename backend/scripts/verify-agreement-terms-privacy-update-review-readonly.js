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

const docPath = "docs/AGREEMENT_TERMS_PRIVACY_UPDATE_REVIEW_PACKET.md";
const wrapperPath = "scripts/run-agreement-terms-privacy-update-review-dry-run.sh";
const verifierPath = "backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js";
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
  "internal review/readiness packet",
  "Agreement, Terms of Service, and Privacy Policy update areas",
  "before stronger sales, onboarding, customer setup, paid trial operation, or live workflow activation",
], "packet doc");
console.log("PASS: purpose/scope is documented.");

// 4. Not legal advice / attorney-review boundary is documented
mustHave(doc, "not** legal advice", "packet doc legal advice boundary");
mustHave(doc, "not** attorney-reviewed language", "packet doc attorney-review boundary");
mustHave(doc, "not** a substitute for attorney review", "packet doc attorney-review boundary");
console.log("PASS: not legal advice / attorney-review boundary is documented.");

// 5. No legal/public publication boundary is documented
mustHave(doc, "does **not** publish or modify public legal terms", "packet doc publication boundary");
mustHave(doc, "no legal publication", "packet doc safety");
mustHave(doc, "no website publication", "packet doc safety");
mustHave(doc, "no agreement/terms/privacy page changes", "packet doc safety");
mustHave(doc, "no customer-facing legal terms activated", "packet doc safety");
console.log("PASS: no legal/public publication boundary is documented.");

// 6. Agreement update checklist is documented
assertSectionWithContent(doc, "## 3. Agreement Update Checklist", [
  "Plan tiers and monthly pricing",
  "Overage handling",
  "Post-inspection follow-up scope",
  "CSV export/reporting scope",
  "Roofer-first escalation",
  "bidirectional CRM integration unless separately approved",
], "packet doc");
console.log("PASS: Agreement update checklist is documented.");

// 7. Terms of Service update checklist is documented
assertSectionWithContent(doc, "## 4. Terms of Service Update Checklist", [
  "Define lead volume",
  "Define overages and upgrade/custom plan process",
  "Define AI-assisted communications and customer responsibility",
  "Define human review boundaries",
  "Define CSV export/data download responsibility",
], "packet doc");
console.log("PASS: Terms of Service update checklist is documented.");

// 8. Privacy Policy update checklist is documented
assertSectionWithContent(doc, "## 5. Privacy Policy Update Checklist", [
  "homeowner names",
  "homeowner phone numbers",
  "homeowner emails",
  "Third-party processors/vendors to review may include",
  "No sale of homeowner data",
], "packet doc");
console.log("PASS: Privacy Policy update checklist is documented.");

// 9. Pricing/volume/overage review is documented
assertSectionWithContent(doc, "## 6. Pricing / Volume / Overage Review Section", [
  "### Starter",
  "### Growth",
  "### Elite",
  "### Custom",
  "### Overage concept",
], "packet doc");
console.log("PASS: pricing/volume/overage review is documented.");

// 10. Plan prices and setup fees are documented
mustHave(doc, "$399/mo", "packet doc Starter price");
mustHave(doc, "$699/mo", "packet doc Growth price");
mustHave(doc, "$999/mo", "packet doc Elite price");
mustHave(doc, "$499 setup", "packet doc setup fee");
mustHave(doc, "$799 setup", "packet doc Elite setup fee");
console.log("PASS: plan prices and setup fees are documented.");

// 11. Starter/Growth/Elite/Custom volume limits are documented
mustHave(doc, "up to 100 leads/month", "packet doc Starter volume");
mustHave(doc, "up to 300 leads/month", "packet doc Growth volume");
mustHave(doc, "up to 500 leads/month", "packet doc Elite volume");
mustHave(doc, "500+ leads/month", "packet doc Custom volume");
console.log("PASS: Starter/Growth/Elite/Custom volume limits are documented.");

// 12. Custom Review triggers are documented
assertSectionWithContent(doc, "### Custom Review triggers", [
  "Multiple calendars/phone numbers/sales reps triggers Custom Review",
  "Complex routing triggers Custom Review",
], "packet doc");
console.log("PASS: Custom Review triggers are documented.");

// 13. 2+ locations trigger Custom Review
mustHave(doc, "**2+ locations** triggers Custom Review", "packet doc 2+ locations custom review");
console.log("PASS: 2+ locations triggers Custom Review.");

// 14. 500+ leads/month triggers Custom Review
mustHave(doc, "**500+ leads/month** triggers Custom Review", "packet doc 500+ custom review");
console.log("PASS: 500+ leads/month triggers Custom Review.");

// 15. Overage/upgrade concept is documented
mustHave(doc, "recommend or require a plan upgrade before the next billing cycle", "packet doc overage upgrade");
mustHave(doc, "additional lead-volume blocks", "packet doc overage blocks");
console.log("PASS: overage/upgrade concept is documented.");

// 16. Working overage number is marked not final
mustHave(doc, "$100 per additional 50 leads", "packet doc working overage number");
mustHave(doc, "must be finalized before publication or legal/billing use", "packet doc overage not final");
console.log("PASS: working overage number is marked not final.");

// 17. Messaging compliance review is documented
assertSectionWithContent(doc, "## 7. Messaging Compliance Review Section", [
  "only follow up with leads who contacted the business or gave permission to be contacted",
  "messaging compliance review",
  "We can only follow up with leads who contacted your business or gave permission to be contacted.",
], "packet doc");
console.log("PASS: messaging compliance review is documented.");

// 18. Post-inspection feedback/public use review is documented
assertSectionWithContent(doc, "## 8. Post-Inspection Feedback / Public Use Review Section", [
  "Feedback is internal unless permission is obtained",
  "permission_to_use_publicly",
], "packet doc");
console.log("PASS: post-inspection feedback/public use review is documented.");

// 19. permission_to_use_publicly yes/no/not_asked is documented
mustHave(doc, "**yes** / **no** / **not_asked**", "packet doc permission values");
console.log("PASS: permission_to_use_publicly yes/no/not_asked is documented.");

// 20. CSV/export/data handling review is documented
assertSectionWithContent(doc, "## 9. CSV / Export / Data Handling Review Section", [
  "one-directional reporting/manual CRM/reference use",
  "Contractor/customer is responsible for downloaded/exported data handling",
  "fictional data only",
], "packet doc");
console.log("PASS: CSV/export/data handling review is documented.");

// 21. CSV not native CRM sync boundary is documented
mustHave(doc, "CSV export is **not** bidirectional CRM integration", "packet doc CSV CRM boundary");
mustHave(doc, "CSV export does not replace roofer's CRM", "packet doc CSV CRM boundary");
console.log("PASS: CSV not native CRM sync boundary is documented.");

// 22. Native workflow / Lindy bridge legal review is documented
assertSectionWithContent(doc, "## 10. Native Workflow / Lindy Bridge Legal Review Section", [
  "Lindy may be a temporary low-volume bridge",
  "Native RoofLeadHQ/Supabase source-of-truth direction",
  "No live activation until explicit approval",
], "packet doc");
console.log("PASS: native workflow / Lindy bridge legal review is documented.");

// 23. Lindy not long-term source of truth is documented
mustHave(doc, "should **not** be described as long-term source of truth", "packet doc Lindy boundary");
console.log("PASS: Lindy not long-term source of truth is documented.");

// 24. Unsupported/later-only features are documented
assertSectionWithContent(doc, "## 11. Unsupported / Later-Only Features Section", [
  "unattended estimate generation",
  "payment/deposit collection",
  "bidirectional CRM integration",
  "unattended workflow with no roofer oversight",
], "packet doc");
console.log("PASS: unsupported/later-only features are documented.");

// 25. Final review tracker exists
mustHave(doc, "## 12. Final Review Tracker", "packet doc final review tracker");
mustHave(doc, "Agreement pricing/plan terms", "packet doc tracker row");
mustHave(doc, "Privacy processors/vendors", "packet doc tracker row");
mustHave(doc, "Security/tenant isolation references", "packet doc tracker row");
console.log("PASS: final review tracker exists.");

// 26. Homeowner personal information categories are documented
const homeownerPii = [
  "homeowner names",
  "homeowner phone numbers",
  "homeowner emails",
  "service addresses",
];
for (const p of homeownerPii) {
  mustHave(doc, p, "packet doc homeowner PII");
}
console.log("PASS: homeowner personal information categories are documented.");

// 27. Third-party processor/vendor review list is documented
const processors = ["Supabase", "Twilio", "Vapi", "Resend", "Google Calendar", "Fillout", "Lindy"];
for (const p of processors) {
  mustHave(doc, p, "packet doc processors");
}
console.log("PASS: third-party processor/vendor review list is documented.");

// 28. No sale of homeowner data is documented
mustHave(doc, "No sale of homeowner data", "packet doc no sale of homeowner data");
console.log("PASS: no sale of homeowner data is documented.");

// 29. Customer responsibility for downloaded/exported data is documented
mustHave(doc, "Contractor/customer is responsible for downloaded/exported data", "packet doc export responsibility");
console.log("PASS: customer responsibility for downloaded/exported data is documented.");

// 30. No guarantees language is documented
mustHave(doc, "No hard outcome guarantees", "packet doc no guarantees");
console.log("PASS: no guarantees language is documented.");

// 31. Forbidden public language is absent
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

// 32. Safety/no-live-activation/no-production-data/no-integration boundaries are documented
const safetyMarkers = [
  "planning/readiness/review packet only",
  "no legal publication",
  "no website publication",
  "no live automation activation",
  "no production data reads",
  "no production Supabase writes",
  "no customer data handling changes",
  "no backend live activation",
  "no integrations activated",
  "no external sends",
  "no Fillout publication",
  "no CRM connection",
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
mustHave(wrapper, "verify-agreement-terms-privacy-update-review-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js", "dry-run wrapper");

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

// 33. Required wiring into aggregate readiness and context docs is present
mustHave(aggregate, "verify-agreement-terms-privacy-update-review-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Agreement Terms Privacy Update Review Packet", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "AGREEMENT_TERMS_PRIVACY_UPDATE_REVIEW_PACKET.md",
  "run-agreement-terms-privacy-update-review-dry-run.sh",
  "verify-agreement-terms-privacy-update-review-readonly.js",
  "Agreement Terms Privacy Update Review",
  "agreement terms privacy update review",
  "legal review readiness",
  "policy review readiness",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference agreement terms privacy update review packet.");

console.log("PASS: Agreement / Terms / Privacy Update Review Packet is planning-only, product-moving, and dry-run safe.");