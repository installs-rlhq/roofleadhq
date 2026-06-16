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

const docPath = "docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md";
const wrapperPath = "scripts/run-pricing-volume-guardrail-and-intake-alignment-dry-run.sh";
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

console.log("PASS: all expected files for pricing volume guardrail and intake alignment packet exist.");

assertSectionWithContent(doc, "Hybrid Pricing Structure", [
  "Starter",
  "Growth",
  "Elite",
  "Custom",
  "$399/mo",
  "$499",
  "$699/mo",
  "$999/mo",
  "$799",
  "75–100 leads/month",
  "250–300 leads/month",
  "500 leads/month",
  "500+ leads/month",
], "alignment packet doc");
console.log("PASS: hybrid pricing structure documented with tier fees and volume bands.");

assertSectionWithContent(doc, "Lead Volume Limits and Plan-Fit Logic", [
  "estimated_monthly_lead_volume",
  "recommended_plan",
  "custom_review_required",
], "alignment packet doc");
console.log("PASS: lead volume limits and plan-fit logic documented.");

assertSectionWithContent(doc, "Custom Review and Pricing Triggers", [
  "Multi-location",
  "Complex routing",
  "Multiple calendars",
  "Multiple phone numbers",
  "Advanced reporting",
  "500+ leads/month",
], "alignment packet doc");
console.log("PASS: custom review and pricing triggers documented.");

assertSectionWithContent(doc, "Overage Protection", [
  "80% of tier band",
  "100% of tier band",
  "notify you and recommend an upgrade",
  "lead-to-inspection workflow",
], "alignment packet doc");
console.log("PASS: overage protection language and workflow documented.");

assertSectionWithContent(doc, "Fillout Intake Question List", [
  "Estimated monthly inbound leads",
  "post-inspection follow-up",
  "post-inspection feedback capture",
  "CSV export",
  "custom_review_required",
  "intake_review_status",
], "alignment packet doc");
console.log("PASS: Fillout intake question list documented.");

assertSectionWithContent(doc, "Agreement Update Checklist", [
  "lead-to-inspection operating layer",
  "Overage protection clause",
  "Roofer-first human review",
  "Photos marked future/optional",
], "alignment packet doc");
console.log("PASS: Agreement update checklist documented.");

assertSectionWithContent(doc, "Terms of Service Update Checklist", [
  "Lead-volume band and overage notice policy",
  "no guaranteed inspections",
  "roofer-first for homeowner issues",
], "alignment packet doc");
console.log("PASS: Terms of Service update checklist documented.");

assertSectionWithContent(doc, "Privacy Policy Update Checklist", [
  "Fillout intake data purpose",
  "CSV export handling",
  "post-inspection feedback",
  "Photos marked future/optional",
], "alignment packet doc");
console.log("PASS: Privacy Policy update checklist documented.");

assertSectionWithContent(doc, "CSV Export and Reporting Treatment", [
  "lead_source",
  "booked_inspection_status",
  "post_inspection_follow_up_status",
  "post_inspection_feedback_capture_status",
  "native CRM sync (later-only)",
], "alignment packet doc");
console.log("PASS: CSV export and reporting treatment documented.");

assertSectionWithContent(doc, "Lead Source Tracking and ROI Treatment", [
  "lead source on every lead",
  "not hard revenue attribution promises",
], "alignment packet doc");
console.log("PASS: lead source tracking and ROI treatment documented.");

assertSectionWithContent(doc, "Post-Inspection Follow-Up Treatment", [
  "post_inspection_follow_up_status",
  "roofer-first review",
  "RoofLeadHQ/Jason review",
], "alignment packet doc");
console.log("PASS: post-inspection follow-up treatment documented.");

assertSectionWithContent(doc, "Post-Inspection Feedback Capture Treatment", [
  "post_inspection_feedback_capture_status",
  "contractor review",
], "alignment packet doc");
console.log("PASS: post-inspection feedback capture treatment documented.");

assertSectionWithContent(doc, "Roofer-First Human Escalation and Review Model", [
  "Roofer-first (default)",
  "RoofLeadHQ / Jason review (limited scope)",
  "workflow defects",
  "data quality issues",
  "system quality issues",
], "alignment packet doc");
console.log("PASS: roofer-first escalation and limited RoofLeadHQ/Jason review documented.");

assertSectionWithContent(doc, "Photos, Optional and Future-Only", [
  "future/optional only",
], "alignment packet doc");
console.log("PASS: photos marked future/optional.");

assertSectionWithContent(doc, "Later-Only / Not Near-Term Core Exclusions", [
  "instant quotes",
  "deposits",
  "payment collection",
  "native CRM sync",
  "multi-location automation",
  "market intel",
], "alignment packet doc");
console.log("PASS: later-only exclusions documented.");

assertSectionWithContent(doc, "Preferred Public Language", [
  "booked inspections",
  "booked homeowner appointments",
  "lead-to-inspection",
  "missed-lead recovery",
  "post-inspection follow-up",
  "post-inspection feedback capture",
  "guided setup",
], "alignment packet doc");
console.log("PASS: preferred public language documented.");

mustHave(doc, "Forbidden Public Language Guardrails", "alignment packet doc");
mustHave(doc, "job-closing outcome promises", "alignment packet doc");
mustHave(doc, "hard revenue outcome promises", "alignment packet doc");
mustHave(doc, "quota-based short-window pilot guarantees", "alignment packet doc");
console.log("PASS: forbidden public language guardrails documented.");

const safetyMarkers = [
  "planning/readiness/placement packet only",
  "no live website publication",
  "no live Fillout changes",
  "no legal publication",
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
  mustHave(doc, m, "alignment packet doc safety");
}
console.log("PASS: safety and no-live-activation boundaries documented.");

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
  "5 qualified appointments in 7 days",
  "7-day pilot guarantee",
];
for (const f of forbidden) {
  mustNotHave(doc, f, "alignment packet doc");
}
console.log("PASS: forbidden public language absent from alignment packet doc.");

mustHave(doc, "PRICING VOLUME GUARDRAIL AND INTAKE ALIGNMENT PACKET PASS", "alignment packet doc");
mustHave(doc, "PRICING VOLUME GUARDRAIL AND INTAKE ALIGNMENT PACKET HOLD", "alignment packet doc");
mustHave(doc, "PRICING VOLUME GUARDRAIL AND INTAKE ALIGNMENT PACKET BLOCKED", "alignment packet doc");
console.log("PASS: PASS / HOLD / BLOCKED decision language present.");

mustHave(wrapper, "verify-pricing-volume-guardrail-and-intake-alignment-readonly.js", "alignment packet wrapper");
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "alignment packet wrapper");
console.log("PASS: wrapper invokes alignment verifier and product quality gate.");

const unsafe = [
  "twilio.messages.create",
  "supabase.from(",
  "resend.emails.send",
  "calendar.events.insert",
  "vapi.calls.create",
  "retell.call",
  "curl -X POST https://",
  'fetch("https://',
  "fetch('https://",
];
for (const u of unsafe) {
  mustNotHave(wrapper, u, "alignment packet wrapper");
}
console.log("PASS: no unsafe implementation strings in wrapper.");

mustHave(aggregate, "verify-pricing-volume-guardrail-and-intake-alignment-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Pricing Volume Guardrail", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes alignment verifier.");

mustHave(verifierIndex, docPath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-pricing-volume-guardrail-and-intake-alignment-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

const packetRefs = [
  "PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md",
  "run-pricing-volume-guardrail-and-intake-alignment-dry-run.sh",
  "verify-pricing-volume-guardrail-and-intake-alignment-readonly.js",
  "Pricing Volume Guardrail",
  "lead-to-inspection",
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: context packages and business guide reference alignment packet.");

console.log("PASS: pricing volume guardrail and intake alignment packet is planning-only, product-moving, and dry-run safe.");