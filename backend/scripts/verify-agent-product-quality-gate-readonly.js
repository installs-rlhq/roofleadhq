#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '../..');

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function assertIncludes(relativePath, expected) {
  const content = read(relativePath);
  if (!content.includes(expected)) {
    throw new Error(`Expected ${relativePath} to include: ${expected}`);
  }
}

function assertNotIncludes(relativePath, blocked) {
  const content = read(relativePath);
  for (const phrase of blocked) {
    if (content.includes(phrase)) {
      throw new Error(`Blocked phrase found in ${relativePath}: ${phrase}`);
    }
  }
}

function assertWrapperCallsVerifier(wrapperPath, verifierRef) {
  const content = read(wrapperPath);
  if (!content.includes(verifierRef)) {
    throw new Error(`Wrapper ${wrapperPath} must invoke the product quality verifier: ${verifierRef}`);
  }
}

function assertAggregateIncludes(aggregatePath, verifierRef) {
  const content = read(aggregatePath);
  if (!content.includes(verifierRef)) {
    throw new Error(`Aggregate readiness ${aggregatePath} must include the product quality verifier: ${verifierRef}`);
  }
}

function assertIndexReferences(indexPath, docRef, wrapperRef, verifierRef) {
  const content = read(indexPath);
  if (!content.includes(docRef) || !content.includes(wrapperRef) || !content.includes(verifierRef)) {
    throw new Error(`Verifier index ${indexPath} must reference doc (${docRef}), wrapper (${wrapperRef}), and verifier (${verifierRef})`);
  }
}

function assertAgentDocsReference(workflowPath, taskPath, gateRef) {
  const workflow = read(workflowPath);
  const task = read(taskPath);
  if (!workflow.includes(gateRef)) {
    throw new Error(`AGENT_WORKFLOW_CONTRACT.md must reference the product quality gate: ${gateRef}`);
  }
  if (!task.includes(gateRef)) {
    throw new Error(`AGENT_TASK_TEMPLATE.md must reference the product quality gate: ${gateRef}`);
  }
}

function assertNextChatReferences(nextChatPath, gateRef, docRef, wrapperRef, verifierRef) {
  const content = read(nextChatPath);
  const required = [gateRef, docRef, wrapperRef, verifierRef];
  for (const r of required) {
    if (!content.includes(r)) {
      throw new Error(`NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md must reference: ${r}`);
    }
  }
}

function assertDocContainsChecklistCategories(docPath) {
  const content = read(docPath);
  const categories = [
    'product outcome',
    'required operator/user workflow sections',
    'required data fields',
    'required decision logs',
    'required templates',
    'required PASS/HOLD/BLOCKED language',
    'required safety boundaries',
    'required forbidden language checks',
    'required wiring checks',
    'required diff proof',
    'required final Terminal 1 source-of-truth verification'
  ];
  for (const cat of categories) {
    // case-insensitive loose match on the category concept
    const lower = content.toLowerCase();
    if (!lower.includes(cat.toLowerCase())) {
      throw new Error(`AGENT_PRODUCT_QUALITY_GATE.md must contain checklist category: ${cat}`);
    }
  }
}

function assertDocContainsLesson(docPath) {
  const content = read(docPath);
  if (!content.includes('first Grok Build run') && !content.includes('shallow verifier-satisfying artifact')) {
    throw new Error('AGENT_PRODUCT_QUALITY_GATE.md must contain the lesson from the first Grok Build run (shallow verifier-satisfying artifact)');
  }
}

function assertDocContainsShallowAndStrongerExamples(docPath) {
  const content = read(docPath);
  if (!content.includes('Shallow Checks to Avoid') || !content.includes('only checking that a heading exists')) {
    throw new Error('AGENT_PRODUCT_QUALITY_GATE.md must include shallow-check examples (e.g., only checking that a heading exists)');
  }
  if (!content.includes('Stronger Checks') || !content.includes('requiring fields under sections')) {
    throw new Error('AGENT_PRODUCT_QUALITY_GATE.md must include stronger-check examples (e.g., requiring fields under sections)');
  }
}

function assertDocContainsArchiveWarning(docPath) {
  const content = read(docPath);
  if (!content.includes('archive/lock-only') && !content.includes('Archive / Lock / Preservation Layer Rule') && !content.includes('only archive/lock/preservation layers')) {
    throw new Error('AGENT_PRODUCT_QUALITY_GATE.md must include the archive/lock-only warning (agents must not pass product-moving tasks via only archive/lock/preservation layers)');
  }
}

function assertDocContainsRequiredSafety(docPath) {
  const content = read(docPath);
  const safetyMarkers = [
    'no live SMS/Twilio',
    'no Vapi live calls',
    'no Calendar activation',
    'no Resend production sends',
    'no Lindy external sends',
    'no cron/scheduler/dispatcher activation',
    'no public route activation',
    'no production Supabase writes',
    'no external notifications',
    'no production credentials',
    'dry-run/internal-only'
  ];
  for (const m of safetyMarkers) {
    if (!content.includes(m)) {
      throw new Error(`AGENT_PRODUCT_QUALITY_GATE.md must include required safety language: ${m}`);
    }
  }
}

function assertNoForbiddenBusinessLanguage(targetPaths) {
  const forbidden = [
    '7-day pilot',
    '5 qualified appointments in 7 days',
    'book jobs',
    'booked jobs',
    'guaranteed jobs',
    'guaranteed revenue',
    'guarantee jobs',
    'guarantee revenue'
  ];
  for (const p of targetPaths) {
    const content = read(p);
    for (const f of forbidden) {
      if (content.includes(f)) {
        throw new Error(`Forbidden business language "${f}" found in ${p}`);
      }
    }
  }
}

function assertNoUnsafeImplementationStringsInWrapper(wrapperPath) {
  const unsafe = [
    'twilio.messages.create',
    'supabase.from(',
    'resend.emails.send',
    'calendar.events.insert',
    'vapi.calls.create',
    'retell.call',
    'curl -X POST https://',
    'fetch("https://',
    "fetch('https://"
  ];
  const content = read(wrapperPath);
  for (const u of unsafe) {
    if (content.includes(u)) {
      throw new Error(`Unsafe implementation string "${u}" found in wrapper ${wrapperPath}`);
    }
  }
}

const doc = 'docs/AGENT_PRODUCT_QUALITY_GATE.md';
const wrapper = 'scripts/check-agent-product-quality-gate.sh';
const verifier = 'backend/scripts/verify-agent-product-quality-gate-readonly.js';
const aggregate = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const index = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const nextChat = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const workflowContract = 'docs/AGENT_WORKFLOW_CONTRACT.md';
const taskTemplate = 'docs/AGENT_TASK_TEMPLATE.md';

console.log('=== RoofLeadHQ Agent Product Quality Gate Read-Only Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

// Assert all expected files exist (will throw via read if missing)
[doc, wrapper, verifier, aggregate, index, nextChat, workflowContract, taskTemplate].forEach(read);
console.log('PASS: all expected files for agent product quality gate exist.');

// Assert wrapper calls the new verifier
assertWrapperCallsVerifier(wrapper, 'verify-agent-product-quality-gate-readonly.js');
console.log('PASS: wrapper invokes the product quality verifier.');

// Assert aggregate readiness includes the new verifier
assertAggregateIncludes(aggregate, 'verify-agent-product-quality-gate-readonly.js');
console.log('PASS: aggregate readiness includes the product quality verifier.');

// Assert verifier index references doc/wrapper/verifier
assertIndexReferences(
  index,
  'docs/AGENT_PRODUCT_QUALITY_GATE.md',
  'scripts/check-agent-product-quality-gate.sh',
  'backend/scripts/verify-agent-product-quality-gate-readonly.js'
);
console.log('PASS: verifier index references doc, wrapper, and verifier.');

// Assert AGENT_WORKFLOW_CONTRACT.md and AGENT_TASK_TEMPLATE.md reference the gate
assertAgentDocsReference(workflowContract, taskTemplate, 'AGENT_PRODUCT_QUALITY_GATE');
console.log('PASS: AGENT_WORKFLOW_CONTRACT.md and AGENT_TASK_TEMPLATE.md reference the product quality gate.');

// Assert NEXT_CHAT references the gate
assertNextChatReferences(
  nextChat,
  'Agent Product Quality Gate',
  'docs/AGENT_PRODUCT_QUALITY_GATE.md',
  'scripts/check-agent-product-quality-gate.sh',
  'backend/scripts/verify-agent-product-quality-gate-readonly.js'
);
console.log('PASS: NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md references the product quality gate.');

// Assert the doc contains the product-depth checklist categories
assertDocContainsChecklistCategories(doc);
console.log('PASS: doc contains the product-depth checklist categories.');

// Assert the doc contains the lesson from the first Grok Build run
assertDocContainsLesson(doc);
console.log('PASS: doc contains the lesson from the first Grok Build run (shallow verifier-satisfying artifact).');

// Assert the doc includes shallow-check examples and stronger-check examples
assertDocContainsShallowAndStrongerExamples(doc);
console.log('PASS: doc includes shallow-check examples and stronger-check examples.');

// Assert the doc includes the archive/lock-only warning
assertDocContainsArchiveWarning(doc);
console.log('PASS: doc includes the archive/lock-only warning.');

// Assert the doc includes the required safety language
assertDocContainsRequiredSafety(doc);
console.log('PASS: doc includes the required dry-run/internal-only safety language.');

// Assert forbidden business language is absent from key protected files (verifier code itself contains the enforcement list and is excluded)
const protectedForLang = [doc, wrapper, index, nextChat, workflowContract, taskTemplate];
assertNoForbiddenBusinessLanguage(protectedForLang);
console.log('PASS: forbidden business language (7-day pilot, book jobs, guarantees, etc.) is absent.');

// Assert no unsafe implementation strings are present in the wrapper
assertNoUnsafeImplementationStringsInWrapper(wrapper);
console.log('PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.');

console.log('PASS: Agent product quality gate read-only verification passed.');
