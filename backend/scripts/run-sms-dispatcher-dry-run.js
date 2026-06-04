#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const repoRoot = path.join(__dirname, '..', '..');
const sourceFiles = [
  {
    source: path.join(repoRoot, 'backend/src/services/sms-safety.service.ts'),
    output: '/tmp/sms-safety.dry-run.js'
  },
  {
    source: path.join(repoRoot, 'backend/src/services/sms-dispatcher-planner.service.ts'),
    output: '/tmp/sms-dispatcher-planner.dry-run.js'
  },
  {
    source: path.join(repoRoot, 'backend/src/services/sms-duplicate-send-detector.service.ts'),
    output: '/tmp/sms-duplicate-send-detector.dry-run.js'
  },
  {
    source: path.join(repoRoot, 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts'),
    output: '/tmp/sms-dispatcher-dry-run-executor.js'
  }
];

console.log('=== RoofLeadHQ SMS Dispatcher Dry Run ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('FAIL: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

function compile(sourcePath, outputPath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  fs.writeFileSync(outputPath, output);
}

for (const file of sourceFiles) {
  compile(file.source, file.output);
}

const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-safety.service') {
    return require('/tmp/sms-safety.dry-run.js');
  }
  if (request === './sms-dispatcher-planner.service') {
    return require('/tmp/sms-dispatcher-planner.dry-run.js');
  }
  if (request === './sms-duplicate-send-detector.service') {
    return require('/tmp/sms-duplicate-send-detector.dry-run.js');
  }

  return originalLoad(request, parent, isMain);
};

const { executeSmsDispatcherDryRun } = require('/tmp/sms-dispatcher-dry-run-executor.js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  const result = await executeSmsDispatcherDryRun({
    supabase,
    dryRun: true,
    limit: 10
  });

  for (const plan of result.plans) {
    console.log(plan);
  }

  console.log('=== DRY RUN SUMMARY ===');
  console.log(`send: ${result.counts.send}`);
  console.log(`skip: ${result.counts.skip}`);
  console.log(`reschedule: ${result.counts.reschedule}`);
  console.log(`fail_closed: ${result.counts.failClosed}`);
  console.log(`failed_closed: ${result.failedClosed}`);

  if (result.lookupError) {
    console.error(`FAIL: ${result.lookupError}`);
  }

  console.log('No writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio calls made.');

  if (result.failedClosed && result.plans.length === 0) {
    process.exit(1);
  }
})();
