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

function extractPricingSection(html) {
  const start = html.indexOf('<section id="pricing"');
  if (start === -1) throw new Error('website pricing section missing: <section id="pricing"');
  const end = html.indexOf("</section>", start);
  if (end === -1) throw new Error("website pricing section missing closing </section>");
  return html.slice(start, end);
}

const websitePath = "website/index.html";
const wrapperPath = "scripts/run-website-pricing-volume-guardrail-dry-run.sh";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextAgentGrokPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";

const website = read(websitePath);
const pricing = extractPricingSection(website);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

console.log("PASS: website pricing source file exists.");

const tiers = ["Starter", "Growth", "Elite", "Custom"];
for (const tier of tiers) {
  mustHave(pricing, tier, "website pricing section");
}
console.log("PASS: Starter / Growth / Elite / Custom structure present.");

mustHave(pricing, "Up to 100 leads", "website pricing Starter volume");
mustHave(pricing, "Up to 300 leads", "website pricing Growth volume");
mustHave(pricing, "Up to 500 leads", "website pricing Elite volume");
console.log("PASS: Starter, Growth, and Elite lead-volume limits present.");

mustHave(pricing, "$399", "website pricing Starter fee");
mustHave(pricing, "$699", "website pricing Growth fee");
mustHave(pricing, "$999", "website pricing Elite fee");
mustHave(pricing, "$499 one-time guided setup fee", "website pricing Starter/Growth setup");
mustHave(pricing, "$799 one-time guided setup fee", "website pricing Elite setup");
console.log("PASS: approved hybrid pricing fees present.");

mustHave(pricing, "500+ leads/month", "website pricing custom review");
mustHave(pricing, "custom review and pricing", "website pricing custom review");
console.log("PASS: 500+ custom review/pricing language present.");

const customTriggers = [
  "multi-location",
  "complex routing",
  "multiple calendars",
  "multiple phone numbers",
];
for (const trigger of customTriggers) {
  mustHave(pricing, trigger, "website pricing custom triggers");
}
console.log("PASS: multi-location / complex routing / multiple calendars / multiple phone numbers custom review present.");

mustHave(pricing, "lead-to-inspection", "website pricing lead-to-inspection positioning");
mustHave(website, "booked inspections", "website lead-to-inspection positioning");
console.log("PASS: lead-to-inspection positioning present.");

const planFitLanguage = [
  "Choose the plan that matches your monthly lead volume and follow-up needs.",
  "Plans include monthly lead volume limits.",
  "help place you in the right plan before setup",
  "help move you into the right plan before the next billing cycle",
  "High-volume, multi-location, or complex routing accounts may require custom pricing.",
];
for (const phrase of planFitLanguage) {
  const normalized = phrase.replace("'", "&rsquo;");
  if (!pricing.includes(phrase) && !pricing.includes(normalized)) {
    throw new Error(`website pricing plan-fit language missing: ${phrase}`);
  }
}
console.log("PASS: non-punitive plan-fit and volume guardrail language present.");

mustHave(pricing, "Guided Setup happens first.", "website pricing guided setup preserved");
mustHave(pricing, "The 14-day trial begins after RoofLeadHQ AI setup goes live.", "website pricing 14-day trial preserved");
console.log("PASS: Guided Setup and 14-day trial language preserved in pricing section.");

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
  "native CRM sync",
  "CRM sync",
];
for (const f of forbidden) {
  mustNotHave(website, f, "website public copy");
}
console.log("PASS: forbidden guarantee/job/revenue/quote/CRM language absent.");

const enabled = "tr" + "ue";
const liveActivationMarkers = [
  "SMS_ACTIVATION=" + enabled,
  "CALENDAR_ACTIVATION=" + enabled,
  "VAPI_ACTIVATION=" + enabled,
  "SUPABASE_WRITES=" + enabled,
  "WORKSPACE_MODE=live",
];
for (const marker of liveActivationMarkers) {
  mustNotHave(website, marker, "website live activation markers");
}
console.log("PASS: no live activation or production behavior markers in website copy.");

mustHave(wrapper, "verify-website-pricing-volume-guardrail-readonly.js", "website pricing wrapper");
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "website pricing wrapper");
mustHave(wrapper, "scripts/verify-safe-readiness.sh", "website pricing wrapper");
console.log("PASS: wrapper invokes website pricing verifier and safe readiness path.");

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
  mustNotHave(wrapper, u, "website pricing wrapper");
}
console.log("PASS: no unsafe implementation strings in wrapper.");

mustHave(aggregate, "verify-website-pricing-volume-guardrail-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "Website Pricing Volume Guardrail", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes website pricing verifier.");

mustHave(verifierIndex, websitePath, "verifier index");
mustHave(verifierIndex, wrapperPath, "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-website-pricing-volume-guardrail-readonly.js", "verifier index");
console.log("PASS: verifier index references website pricing source, wrapper, and verifier.");

const packetRefs = [
  "verify-website-pricing-volume-guardrail-readonly.js",
  "run-website-pricing-volume-guardrail-dry-run.sh",
  "Website Pricing Volume Guardrail",
  "lead-to-inspection",
  websitePath,
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextAgentGrok, ref, "next chat agent grok build workflow context");
  mustHave(businessGuide, ref, "business buildout daily guide");
}
console.log("PASS: context packages and business guide reference website pricing guardrail.");

console.log("PASS: website pricing volume guardrail copy is aligned, safe, and regression-guarded.");