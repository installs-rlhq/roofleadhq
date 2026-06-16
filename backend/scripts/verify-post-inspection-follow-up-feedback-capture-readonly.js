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

function extractBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) return "";
  const from = start + startMarker.length;
  const end = text.indexOf(endMarker, from);
  if (end === -1) return text.slice(from);
  return text.slice(from, end);
}

const docPath = "docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md";
const wrapperPath = "scripts/run-post-inspection-follow-up-feedback-capture-dry-run.sh";
const verifierPath = "backend/scripts/verify-post-inspection-follow-up-feedback-capture-readonly.js";
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

// 3. Workflow stage path is documented
mustHave(doc, "Inspection Booked → Reminder Sent → Inspection Completed?", "packet doc workflow path");
mustHave(doc, "Estimate Needed?", "packet doc workflow path");
mustHave(doc, "Homeowner Follow-Up Needed / Roofer Follow-Up Needed", "packet doc workflow path");
mustHave(doc, "Won / Lost / Still Open / Needs Review", "packet doc workflow path");
assertSectionWithContent(doc, "## 2. Status / Stage Table", [
  "Inspection Booked",
  "Inspection Reminder Ready / Reminder Sent",
  "Inspection Completed?",
  "Missed / Rescheduled",
  "Appointment Issue",
  "Estimate Needed?",
  "Estimate Sent?",
  "Homeowner Follow-Up Needed",
  "Roofer Follow-Up Needed",
  "Won",
  "Lost",
  "Still Open",
  "Needs Review",
], "packet doc");
console.log("PASS: workflow stage path is documented.");

// 4. Missed/rescheduled and appointment issue treatment are documented
assertSectionWithContent(doc, "## 2. Status / Stage Table", [
  "Missed / Rescheduled",
  "Appointment Issue",
  "Roofer reports missed",
  "Access, weather, wrong address",
], "packet doc");
assertSectionWithContent(doc, "## 3. Trigger Rules (Planned / Sandbox-Only)", [
  "Missed/rescheduled appointment",
  "Route to Missed / Rescheduled",
], "packet doc");
console.log("PASS: missed/rescheduled and appointment issue treatment are documented.");

// 5. Sandbox-only timing/reminder boundary is documented
mustHave(doc, "planned/sandbox-only", "packet doc sandbox boundary");
mustHave(doc, "All timing/reminder logic remains planned/sandbox-only until live activation is explicitly approved by Jason", "packet doc sandbox boundary");
assertSectionWithContent(doc, "## 3. Trigger Rules (Planned / Sandbox-Only)", [
  "still open after 7+ days",
  "Needs review aging after 48+ hours",
  "Pre-appointment reminder",
], "packet doc");
console.log("PASS: sandbox-only timing/reminder boundary is documented.");

// 6. Roofer-facing prompts are documented
assertSectionWithContent(doc, "## 4. Roofer-Facing Check-In Prompts (Draft Only)", [
  "Did the inspection happen?",
  "Was it missed or rescheduled?",
  "Was there an appointment issue?",
  "Was an estimate or next step needed?",
  "Has the estimate been sent?",
  "Does homeowner follow-up need to happen?",
  "Does roofer follow-up need to happen?",
  "Should this be marked Won / Lost / Still Open / Needs Review?",
  "draft prompts only",
], "packet doc");
console.log("PASS: roofer-facing prompts are documented.");

// 7. Homeowner-facing drafts are documented
assertSectionWithContent(doc, "## 5. Homeowner-Facing Message Drafts (Draft Only — Not Activated, Not Sent)", [
  "Appointment reminder (draft)",
  "Post-inspection check-in (draft)",
  "Follow-up needed check-in (draft)",
  "Feedback capture (draft)",
  "No-response follow-up (draft)",
  "not activated and not sent",
], "packet doc");
console.log("PASS: homeowner-facing drafts are documented.");

// 8. Homeowner reminder uses "is scheduled to be there"
const reminderSection = extractBetween(doc, "### Appointment reminder (draft)", "### Post-inspection check-in (draft)");
mustHave(reminderSection, "is scheduled to be there", "homeowner appointment reminder draft");
console.log("PASS: homeowner reminder uses \"is scheduled to be there\".");

// 9. Forbidden "will be there" phrase is absent from homeowner reminder copy
mustNotHave(reminderSection, "will be there", "homeowner appointment reminder draft");
console.log("PASS: forbidden \"will be there\" phrase is absent from homeowner reminder copy.");

// 10. Feedback capture 3-question flow is documented
assertSectionWithContent(doc, "## 6. Feedback Capture Flow", [
  "Did the roofer show up as expected?",
  "Was the roofer helpful and professional?",
  "Would you like the roofer to follow up with next steps?",
  "Anything you would like us to pass along?",
], "packet doc");
console.log("PASS: feedback capture 3-question flow is documented.");

// 11. permission_to_use_publicly yes/no/not_asked is documented
mustHave(doc, "permission_to_use_publicly", "packet doc permission field");
mustHave(doc, "yes / no / not_asked", "packet doc permission field");
assertSectionWithContent(doc, "## 7. Permission Field", [
  "permission_to_use_publicly",
  "yes / no / not_asked",
  "dashboard/reporting",
  "CSV export",
], "packet doc");
console.log("PASS: permission_to_use_publicly yes/no/not_asked is documented.");

// 12. Internal-only feedback boundary is documented
assertSectionWithContent(doc, "## 6. Feedback Capture Flow", [
  "Internal only unless permission is obtained",
  "Shared with roofer",
], "packet doc");
console.log("PASS: internal-only feedback boundary is documented.");

// 13. No fake reviews / no review farming / no public testimonial without permission is documented
assertSectionWithContent(doc, "## 6. Feedback Capture Flow", [
  "Do not fabricate endorsements",
  "Do not pressure for public praise",
  "No incentivized positive feedback",
  "No public testimonial use without explicit permission",
], "packet doc");
mustHave(doc, "Review manipulation", "packet doc feedback safety");
mustHave(doc, "fabricated endorsements", "packet doc feedback safety");
console.log("PASS: no fake reviews / no review farming / no public testimonial without permission is documented.");

// 14. Roofer-first escalation model is documented
assertSectionWithContent(doc, "## 8. Escalation Decision Tree", [
  "Default escalation to roofer/contractor",
  "pricing questions",
  "estimate questions",
  "quote requests",
  "insurance complexity",
  "repair vs replacement questions",
  "upset homeowner",
  "scheduling issue",
  "homeowner asks for roofer directly",
  "legal/insurance/carrier-specific questions",
  "payment or invoice question",
  "contract question",
], "packet doc");
console.log("PASS: roofer-first escalation model is documented.");

// 15. RoofLeadHQ/Jason system-quality-only review boundary is documented
assertSectionWithContent(doc, "## 8. Escalation Decision Tree", [
  "Escalate to RoofLeadHQ/Jason only for system-quality issues",
  "bad or unclear AI response",
  "missed data capture",
  "broken routing",
  "duplicate lead confusion",
  "source attribution issue",
  "dashboard/report discrepancy",
  "workflow state confusion",
  "setup issue",
  "failed handoff",
  "quality-control concern",
], "packet doc");
console.log("PASS: RoofLeadHQ/Jason system-quality-only review boundary is documented.");

// 16. Dashboard/report fields are documented
assertSectionWithContent(doc, "## 9. Dashboard / Report Fields", [
  "active post-inspection leads",
  "inspections completed",
  "inspections with unknown outcome",
  "missed/rescheduled appointments",
  "appointment issues",
  "estimates needed",
  "estimates sent",
  "homeowner follow-ups needed",
  "roofer follow-ups needed",
  "feedback requested",
  "feedback captured",
  "permission_to_use_publicly",
  "won",
  "lost",
  "still open",
  "needs review aging",
], "packet doc");
console.log("PASS: dashboard/report fields are documented.");

// 17. CSV export fields are documented
const csvFields = [
  "lead_id",
  "homeowner_name",
  "homeowner_phone",
  "homeowner_email",
  "service_address",
  "lead_source",
  "appointment_date",
  "appointment_time",
  "appointment_status",
  "missed_or_rescheduled",
  "appointment_issue",
  "inspection_completed",
  "reminder_ready_or_sent",
  "estimate_needed",
  "estimate_sent",
  "homeowner_follow_up_needed",
  "roofer_follow_up_needed",
  "feedback_requested",
  "feedback_captured",
  "feedback_summary",
  "testimonial_candidate",
  "permission_to_use_publicly",
  "outcome",
  "outcome_date",
  "notes",
];
for (const f of csvFields) {
  mustHave(doc, f, "packet doc CSV export fields");
}
console.log("PASS: CSV export fields are documented.");

// 18. Forbidden public language is absent
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
  "will be there",
  "5 qualified appointments in 7 days",
  "7-day pilot guarantee",
];
for (const f of forbidden) {
  mustNotHave(doc, f, "packet doc forbidden language");
}
mustHave(doc, "Forbidden public language", "packet doc forbidden language section");
console.log("PASS: forbidden public language is absent from packet doc body.");

// 19. Safety/no-live-activation boundaries are documented
const safetyMarkers = [
  "planning/readiness/placement packet only",
  "no live automations",
  "no sends",
  "no CRM connection",
  "no production behavior changes",
  "no customer data handling changes",
  "no backend live activation",
  "no integrations activated",
  "no external sends",
  "no production Supabase writes",
  "no auth/RLS/schema/security changes",
  "no env/credential changes",
  "no public route activation",
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
console.log("PASS: safety/no-live-activation boundaries are documented.");

// 20. No production writes, env changes, auth/RLS/schema changes, external sends, or public route activation are introduced
mustHave(doc, "Does not perform production Supabase writes", "packet doc no-production boundary");
mustHave(doc, "Does not change env/credentials", "packet doc no-production boundary");
mustHave(doc, "Does not change auth/RLS/schema/security", "packet doc no-production boundary");
mustHave(doc, "Does not activate external sends, public routes, cron, scheduler, or dispatcher", "packet doc no-production boundary");

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
console.log("PASS: no production writes, env changes, auth/RLS/schema changes, external sends, or public route activation are introduced in wrapper.");

// Wrapper wiring
mustHave(wrapper, "verify-post-inspection-follow-up-feedback-capture-readonly.js", "dry-run wrapper");
mustHave(wrapper, "node --check backend/scripts/verify-post-inspection-follow-up-feedback-capture-readonly.js", "dry-run wrapper");
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "dry-run wrapper");
console.log("PASS: dry-run wrapper invokes verifier and quality gate.");

// Aggregate and index wiring
mustHave(aggregate, "verify-post-inspection-follow-up-feedback-capture-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Post-Inspection Follow-Up", "aggregate first-paid pilot readiness");
mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, verifierPath, "verifier index");

const packetRefs = [
  "POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md",
  "run-post-inspection-follow-up-feedback-capture-dry-run.sh",
  "verify-post-inspection-follow-up-feedback-capture-readonly.js",
  "Post-Inspection Follow-Up",
  "post-inspection follow-up",
  "post-inspection feedback capture",
  "permission_to_use_publicly",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: aggregate, verifier index, and context packages reference post-inspection follow-up packet.");

console.log("PASS: post-inspection follow-up and feedback capture packet is planning-only, product-moving, and dry-run safe.");