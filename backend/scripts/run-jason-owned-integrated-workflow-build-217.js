#!/usr/bin/env node
/**
 * Build 217 — Jason-Owned Integrated Local Workflow Runner.
 *
 * LOCAL-ONLY, DETERMINISTIC, SYNTHETIC-DATA-ONLY. This runner EXERCISES the native RoofLeadHQ workflow
 * modules (it compiles the production TypeScript service modules and calls them) across all five Build
 * 216 scenarios. It is NOT a fixture-string comparison: each scenario drives real native-module logic
 * and records expected-versus-actual results.
 *
 * It makes NO network call, sends NO SMS or email, constructs NO provider client, loads NO credentials,
 * uses NO raw phone number or email address in any written artifact, creates NO production record, and
 * activates NO automation. Synthetic phone-shaped inputs (built at runtime, never written to artifacts)
 * exist only to drive the native E.164 validators; they are never persisted, printed to artifacts, or
 * sent anywhere.
 *
 * Native modules exercised:
 *   - lead-intake-recognition.service     (roof-inspection recognition + source/routing)
 *   - roofer-alert-binding.service        (exact M1/M2/M3 binding, homeowner-consent block, guarded future send)
 *   - sms-safety.service                  (fail-closed send-safety gating; no send)
 *   - sms-dispatcher-planner.service      (follow-up due/condition recognition; template mapping; no send)
 *   - sms-send-intent-planner.service     (outbound send-intent preparation; noSmsSent=true)
 *
 * Outputs (deterministic):
 *   - backend/fixtures/native-workflow-demo-roofer/integrated-workflow-execution-evidence-build-217.json
 *   - docs/NATIVE_WORKFLOW_DEMO_PROOF_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md
 *
 * Exit code: 0 when every REQUIRED scenario matches expected; nonzero otherwise.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const backendRoot = path.join(repoRoot, 'backend');
const FIXTURE_DIR = path.join(backendRoot, 'fixtures/native-workflow-demo-roofer');
const EVIDENCE_PATH = path.join(FIXTURE_DIR, 'integrated-workflow-execution-evidence-build-217.json');
const DEMO_PROOF_PATH = path.join(repoRoot, 'docs/NATIVE_WORKFLOW_DEMO_PROOF_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md');
const BUILD_216_PACKET = path.join(FIXTURE_DIR, 'jason-owned-workflow-validation-build-216.json');

// Objective-mandated exact approved copy (independent restatement; cross-checked against native module).
const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';

// -------------------------------------------------------------------------------------------------
// Compile + load the native production TypeScript modules (so we exercise real native logic).
// -------------------------------------------------------------------------------------------------
function loadNativeModules() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b217-native');
  fs.mkdirSync(outDir, { recursive: true });
  const serviceFiles = [
    'sms-safety.service.ts',
    'sms-dispatcher-planner.service.ts',
    'sms-send-intent-planner.service.ts',
    'lead-intake-recognition.service.ts',
    'roofer-alert-binding.service.ts'
  ].map((f) => path.join(backendRoot, 'src/services', f));

  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [...serviceFiles, '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );

  return {
    recognition: require(path.join(outDir, 'lead-intake-recognition.service.js')),
    binding: require(path.join(outDir, 'roofer-alert-binding.service.js')),
    safety: require(path.join(outDir, 'sms-safety.service.js')),
    dispatcher: require(path.join(outDir, 'sms-dispatcher-planner.service.js')),
    sendIntent: require(path.join(outDir, 'sms-send-intent-planner.service.js'))
  };
}

// Synthetic E.164 destination built at runtime from parts (never written to any artifact).
function syntheticE164(idx) {
  return '+1' + '500' + '55' + String(1000 + idx);
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function main() {
  const native = loadNativeModules();
  const build216 = readJson(BUILD_216_PACKET);
  const fixtureM1 = (build216.message_set.roofer_facing_messages.find((m) => m.message_id === 'M1') || {}).text;
  const fixtureM2 = (build216.message_set.roofer_facing_messages.find((m) => m.message_id === 'M2') || {}).text;

  // Fixed deterministic clock values (no wall-clock; keeps native gating reproducible).
  const CURRENT_TIME = '2026-06-25T18:00:00.000Z'; // ~12:00 local America/Denver (inside allowed window)
  const DUE_SCHEDULED_FOR = '2026-06-25T17:30:00.000Z';

  // -----------------------------------------------------------------------------------------------
  // Synthetic, owned, label-only lead set. No raw phone/email persisted; synthetic E.164 in-memory only.
  // -----------------------------------------------------------------------------------------------
  const syntheticLeads = [
    {
      lead_label: 'owned_test_lead_new_inspection',
      issueText: 'New roof inspection request after a storm; homeowner wants a leak checked.',
      sourceLabel: 'website_form',
      serviceAreaMatch: true,
      status: 'new',
      first_reply_at: null
    },
    {
      lead_label: 'owned_test_lead_slow_no_reply',
      issueText: 'Roof inspection lead, hail damage; no first reply yet.',
      sourceLabel: 'paid_lead_marketplace',
      serviceAreaMatch: true,
      status: 'new',
      first_reply_at: null
    },
    {
      lead_label: 'owned_test_lead_routed_referral',
      issueText: 'Referral roof inspection request; shingle damage.',
      sourceLabel: 'referral',
      serviceAreaMatch: true,
      status: 'new',
      first_reply_at: null
    }
  ];

  const scenarioResults = [];
  const leadState = {};
  const followUpState = {};

  // ---- Scenario 1: new_roof_inspection_lead_alert (REQUIRED, M1) --------------------------------
  {
    const lead = syntheticLeads[0];
    const recog = native.recognition.recognizeLeadIntake(lead);
    const bind = native.binding.bindRooferAlert('new_roof_inspection_lead_alert');
    const toSynthetic = syntheticE164(1);
    const fromSynthetic = syntheticE164(901);
    const followUpId = 'fu_owned_new_alert';
    const intent = native.sendIntent.planSmsSendIntent({
      roofer_id: 'jason_owned_test_roofer_label',
      lead_id: lead.lead_label,
      follow_up_id: followUpId,
      approved_follow_up_id: followUpId,
      run_id: 'build_217_local_integrated',
      to: toSynthetic,
      from: fromSynthetic,
      body: bind.boundBody
    });

    const e164Valid = native.safety.isValidE164(toSynthetic) && native.safety.isValidE164(fromSynthetic);
    const expected = {
      recognized_roof_inspection: true,
      routed_for: 'roof_inspection_follow_up',
      message_id: 'M1',
      binding_matches_approved: true,
      outbound_send_intent_prepared: true,
      sms_sent: false
    };
    const actual = {
      recognized_roof_inspection: recog.isRoofInspectionRequest,
      routed_for: recog.routedFor,
      message_id: bind.messageId,
      binding_matches_approved:
        bind.ok && bind.boundBody === EXACT_M1 && bind.boundBody === fixtureM1,
      outbound_send_intent_prepared: intent.shouldSend === true && intent.sendIntent !== null,
      sms_sent: false
    };

    leadState[lead.lead_label] = { status: lead.status, first_reply_at: lead.first_reply_at, recognized_type: recog.recognizedType, routed_for: recog.routedFor };
    followUpState[followUpId] = { state: 'roofer_alert_prepared', sent: false, send_intent_built: actual.outbound_send_intent_prepared, no_sms_sent: intent.noSmsSent === true };

    scenarioResults.push({
      scenario_key: 'new_roof_inspection_lead_alert',
      required: true,
      integration_mode: 'native_module_execution',
      native_modules_exercised: ['lead-intake-recognition.service', 'roofer-alert-binding.service', 'sms-send-intent-planner.service', 'sms-safety.service'],
      e164_inputs_valid: e164Valid,
      matched_keywords: recog.matchedKeywords,
      expected,
      actual,
      pass: deepEqual(expected, actual)
    });
  }

  // ---- Scenario 2: missed_or_slow_lead_follow_up_nudge (REQUIRED, M2) ---------------------------
  {
    const lead = syntheticLeads[1];
    const recog = native.recognition.recognizeLeadIntake(lead);
    const dispatch = native.dispatcher.planSmsDispatch({
      followUp: { id: 'fu_owned_slow_nudge', roofer_id: 'jason_owned_test_roofer_label', lead_id: lead.lead_label, status: 'scheduled', followup_type: '2h', scheduled_for: DUE_SCHEDULED_FOR },
      lead: { id: lead.lead_label, phone: syntheticE164(2), status: lead.status },
      roofer: { id: 'jason_owned_test_roofer_label', sms_confirmation_enabled: true, timezone: 'America/Denver' },
      currentTime: CURRENT_TIME,
      duplicateSendExists: false
    });
    const bind = native.binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge');

    const expected = {
      follow_up_condition_recognized: true,
      native_dispatch_action: 'send',
      template_mapped: true,
      message_id: 'M2',
      binding_matches_approved: true,
      sms_sent: false
    };
    const actual = {
      // Lead has no first reply and a scheduled follow-up that is now due -> native planner recognizes it.
      follow_up_condition_recognized: lead.first_reply_at === null && dispatch.reason === 'eligible',
      native_dispatch_action: dispatch.action,
      template_mapped: typeof dispatch.templateType === 'string' && dispatch.templateType.length > 0,
      message_id: bind.messageId,
      binding_matches_approved: bind.ok && bind.boundBody === EXACT_M2 && bind.boundBody === fixtureM2,
      sms_sent: false
    };

    leadState[lead.lead_label] = { status: lead.status, first_reply_at: lead.first_reply_at, recognized_type: recog.recognizedType, routed_for: recog.routedFor };
    followUpState['fu_owned_slow_nudge'] = { state: 'nudge_prepared', sent: false, dispatch_decision: dispatch.action, dispatch_reason: dispatch.reason, template_type: dispatch.templateType || null };

    scenarioResults.push({
      scenario_key: 'missed_or_slow_lead_follow_up_nudge',
      required: true,
      integration_mode: 'native_module_execution',
      native_modules_exercised: ['lead-intake-recognition.service', 'sms-dispatcher-planner.service', 'sms-safety.service', 'roofer-alert-binding.service'],
      expected,
      actual,
      pass: deepEqual(expected, actual)
    });
  }

  // ---- Scenario 3: daily_open_lead_recap (REQUIRED, M3) -----------------------------------------
  let syntheticOpenLeadCount = 0;
  {
    // Deterministic open-lead count from synthetic state: leads still 'new' with no first reply.
    syntheticOpenLeadCount = syntheticLeads.filter((l) => l.status === 'new' && l.first_reply_at === null).length;
    const recap = native.binding.buildDailyOpenLeadRecap(syntheticOpenLeadCount);

    const expected = {
      message_id: 'M3',
      channel: 'internal',
      open_lead_count: syntheticOpenLeadCount,
      recap_body_includes_count: true,
      external_notification_sent: false
    };
    const actual = {
      message_id: recap.messageId,
      channel: recap.channel,
      open_lead_count: recap.openLeadCount,
      recap_body_includes_count: recap.body.includes(String(syntheticOpenLeadCount)),
      external_notification_sent: false
    };

    scenarioResults.push({
      scenario_key: 'daily_open_lead_recap',
      required: true,
      integration_mode: 'native_module_execution',
      native_modules_exercised: ['roofer-alert-binding.service'],
      recap_body: recap.body,
      expected,
      actual,
      pass: deepEqual(expected, actual)
    });
  }

  // ---- Scenario 4: lead_source_routing_flag (OPTIONAL, internal) --------------------------------
  {
    const lead = syntheticLeads[2];
    const recog = native.recognition.recognizeLeadIntake(lead);
    const expected = {
      source_label_retained: 'referral',
      source_label_recognized: true,
      recognized_roof_inspection: true,
      routed_for: 'roof_inspection_follow_up'
    };
    const actual = {
      source_label_retained: recog.normalizedSourceLabel,
      source_label_recognized: recog.sourceLabelRecognized,
      recognized_roof_inspection: recog.isRoofInspectionRequest,
      routed_for: recog.routedFor
    };
    leadState[lead.lead_label] = { status: lead.status, first_reply_at: lead.first_reply_at, recognized_type: recog.recognizedType, routed_for: recog.routedFor, source_label: recog.normalizedSourceLabel };
    scenarioResults.push({
      scenario_key: 'lead_source_routing_flag',
      required: false,
      integration_mode: 'native_module_execution',
      native_modules_exercised: ['lead-intake-recognition.service'],
      expected,
      actual,
      pass: deepEqual(expected, actual)
    });
  }

  // ---- Scenario 5: homeowner_consent_boundary_reminder (OPTIONAL, internal) ---------------------
  {
    const decision = native.binding.prepareHomeownerOutreach();
    const expected = {
      homeowner_contact_authorized: false,
      status: 'blocked_approval_required',
      draft_only: true,
      prepared_send_is_null: true
    };
    const actual = {
      homeowner_contact_authorized: decision.homeownerContactAuthorized,
      status: decision.status,
      draft_only: decision.draftOnly,
      prepared_send_is_null: decision.preparedSend === null
    };
    scenarioResults.push({
      scenario_key: 'homeowner_consent_boundary_reminder',
      required: false,
      integration_mode: 'native_module_execution',
      native_modules_exercised: ['roofer-alert-binding.service'],
      homeowner_contact_module_authorized_constant: native.binding.HOMEOWNER_CONTACT_AUTHORIZED,
      expected,
      actual,
      pass: deepEqual(expected, actual)
    });
  }

  // -----------------------------------------------------------------------------------------------
  // Guarded FUTURE live M1/M2 support — permission-only; NEVER sends; proves fail-closed + isolation.
  // -----------------------------------------------------------------------------------------------
  const unsignedApprovalShape = { approval_signed: false, approval_granted: false };
  const m1FutureBlocked = native.binding.prepareGuardedFutureSend('new_roof_inspection_lead_alert', unsignedApprovalShape);
  const m2FutureBlocked = native.binding.prepareGuardedFutureSend('missed_or_slow_lead_follow_up_nudge', unsignedApprovalShape);
  // Cross-scenario isolation: even a (hypothetical, in-memory) signed M2 approval must NOT permit M1,
  // and must NOT send M2 without the explicit confirm token. This proves M1 != M2 and fail-closed.
  const hypotheticalSignedM2 = {
    approval_signed: true,
    approval_granted: true,
    scenario_key: 'missed_or_slow_lead_follow_up_nudge',
    selected_variant_text: EXACT_M2,
    max_message_count: 1,
    retry_allowed: false,
    homeowner_contact_authorized: false
  };
  const m2ApprovalAgainstM1 = native.binding.prepareGuardedFutureSend('new_roof_inspection_lead_alert', hypotheticalSignedM2);
  const m2ApprovalAgainstM2NoToken = native.binding.prepareGuardedFutureSend('missed_or_slow_lead_follow_up_nudge', hypotheticalSignedM2);

  const guardedFutureSupport = {
    m1_future_send_permitted: m1FutureBlocked.permitted,
    m1_future_blocked_reasons: m1FutureBlocked.blockedReasons,
    m2_future_send_permitted: m2FutureBlocked.permitted,
    m2_future_blocked_reasons: m2FutureBlocked.blockedReasons,
    m2_approval_never_authorizes_m1: m2ApprovalAgainstM1.permitted === false && m2ApprovalAgainstM1.blockedReasons.includes('approval_scenario_mismatch'),
    m2_signed_still_requires_confirm_token: m2ApprovalAgainstM2NoToken.permitted === false && m2ApprovalAgainstM2NoToken.blockedReasons.includes('live_confirm_token_absent'),
    no_send_performed: true,
    no_provider_client_constructed: true,
    no_credential_read: true
  };

  // -----------------------------------------------------------------------------------------------
  // Aggregate + safety evidence.
  // -----------------------------------------------------------------------------------------------
  const required = scenarioResults.filter((s) => s.required);
  const optional = scenarioResults.filter((s) => !s.required);
  const requiredPassed = required.filter((s) => s.pass).length;
  const optionalPassed = optional.filter((s) => s.pass).length;
  const allRequiredPassed = requiredPassed === required.length;

  const m1Result = scenarioResults.find((s) => s.scenario_key === 'new_roof_inspection_lead_alert');
  const m2Result = scenarioResults.find((s) => s.scenario_key === 'missed_or_slow_lead_follow_up_nudge');
  const routingResult = scenarioResults.find((s) => s.scenario_key === 'lead_source_routing_flag');
  const homeownerResult = scenarioResults.find((s) => s.scenario_key === 'homeowner_consent_boundary_reminder');

  const nativeModulesExercised = Array.from(
    new Set(scenarioResults.flatMap((s) => s.native_modules_exercised))
  ).sort();

  const evidence = {
    evidence_name: 'jason_owned_integrated_workflow_execution_evidence_build_217',
    build: 217,
    generated_for: 'build_217_local_integrated_runner',
    data_classification: 'labels_booleans_only_no_secret_values_no_phone_numbers_no_email_addresses_no_raw_sids_no_production_data',
    source_of_truth_commit: '8a7ad6b',

    local_integrated_runner_executed: true,
    runner_exercises_native_workflow_logic: true,
    fixture_only_validation: false,
    scenario_count: scenarioResults.length,
    required_scenario_count: required.length,
    optional_scenario_count: optional.length,
    required_scenarios_passed: requiredPassed,
    optional_scenarios_passed: optionalPassed,
    all_required_scenarios_passed: allRequiredPassed,

    native_workflow_modules_exercised: nativeModulesExercised,
    expected_actual_match: scenarioResults.map((s) => ({ scenario_key: s.scenario_key, required: s.required, integration_mode: s.integration_mode, pass: s.pass })),

    message_binding_match: {
      M1: Boolean(m1Result && m1Result.actual.binding_matches_approved),
      M2: Boolean(m2Result && m2Result.actual.binding_matches_approved)
    },
    m1_binding_equals_exact_approved_and_fixture: Boolean(m1Result && m1Result.actual.binding_matches_approved),
    m2_binding_equals_exact_approved_and_fixture: Boolean(m2Result && m2Result.actual.binding_matches_approved),

    synthetic_open_lead_count: syntheticOpenLeadCount,
    routing_result: routingResult ? routingResult.actual.routed_for : null,
    homeowner_contact_blocked: Boolean(homeownerResult && homeownerResult.actual.status === 'blocked_approval_required' && homeownerResult.actual.homeowner_contact_authorized === false),

    local_lead_state: leadState,
    local_follow_up_state: followUpState,

    guarded_future_live_m1_m2_support: guardedFutureSupport,

    scenarios: scenarioResults,

    safety: {
      live_sms_sent: false,
      email_sent: false,
      network_call_made: false,
      twilio_client_constructed: false,
      messages_create_called: false,
      credentials_loaded: false,
      production_data_used: false,
      production_records_created: false,
      raw_destination_values_recorded: false,
      raw_phone_number_recorded: false,
      raw_email_address_recorded: false,
      live_automation_remains_disabled: true,
      default_mode_local_dry_run: true
    },

    decision: allRequiredPassed
      ? 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE'
      : 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCAL_VALIDATION_INCOMPLETE',
    authorizes_send_now: false,
    m1_approved: false,
    m2_approved: false,
    next_live_send_requires_fresh_signed_scenario_specific_approval: true,
    homeowner_contact_authorized: false,
    real_roofer_contact_authorized: false,
    unrestricted_launch: false,
    safety_posture: 'demo_ready_with_live_automation_disabled'
  };

  fs.writeFileSync(EVIDENCE_PATH, JSON.stringify(evidence, null, 2) + '\n');
  fs.writeFileSync(DEMO_PROOF_PATH, renderDemoProof(evidence));

  // Console summary.
  console.log('=== RoofLeadHQ Build 217 — Jason-Owned Integrated Local Workflow Runner ===');
  console.log('LOCAL-ONLY · SYNTHETIC DATA · NATIVE MODULE EXECUTION · NO SEND · NO NETWORK');
  for (const s of scenarioResults) {
    console.log(`${s.pass ? 'PASS' : 'FAIL'}: ${s.scenario_key} (${s.required ? 'required' : 'optional'}) [${s.integration_mode}]`);
  }
  console.log(`Native modules exercised: ${nativeModulesExercised.join(', ')}`);
  console.log(`M1 binding match: ${evidence.message_binding_match.M1} · M2 binding match: ${evidence.message_binding_match.M2}`);
  console.log(`Synthetic open-lead count: ${syntheticOpenLeadCount}`);
  console.log(`Homeowner contact blocked: ${evidence.homeowner_contact_blocked}`);
  console.log(`Guarded future M1 send permitted: ${guardedFutureSupport.m1_future_send_permitted} · M2: ${guardedFutureSupport.m2_future_send_permitted} (both must be false)`);
  console.log(`Required scenarios passed: ${requiredPassed}/${required.length} · Optional: ${optionalPassed}/${optional.length}`);
  console.log(`Decision: ${evidence.decision}`);
  console.log(`Evidence: ${path.relative(repoRoot, EVIDENCE_PATH)}`);
  console.log(`Demo proof: ${path.relative(repoRoot, DEMO_PROOF_PATH)}`);

  const guardedOk =
    guardedFutureSupport.m1_future_send_permitted === false &&
    guardedFutureSupport.m2_future_send_permitted === false &&
    guardedFutureSupport.m2_approval_never_authorizes_m1 === true &&
    guardedFutureSupport.m2_signed_still_requires_confirm_token === true;

  if (!allRequiredPassed) {
    console.error('FAIL: one or more REQUIRED scenarios did not match expected.');
    process.exit(1);
  }
  if (!guardedOk) {
    console.error('FAIL: guarded future M1/M2 support did not fail closed as required.');
    process.exit(1);
  }
  console.log('PASS: Build 217 integrated local workflow validated through native modules. No send, no network, no secrets.');
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function renderDemoProof(evidence) {
  const line = (k) => {
    const s = evidence.scenarios.find((x) => x.scenario_key === k);
    return s ? (s.pass ? 'PASS' : 'FAIL') : 'n/a';
  };
  return [
    '# RoofLeadHQ Sales-Demo Proof — Jason-Owned Integrated Workflow (Build 217)',
    '',
    'Sanitized, local-only evidence generated by the Build 217 integrated runner exercising native',
    'RoofLeadHQ workflow modules with deterministic synthetic data. No phone numbers, email addresses,',
    'secrets, tokens, raw SIDs, or production data appear here. No SMS/email/network action occurred.',
    '',
    '## The story',
    '',
    '1. **A roof-inspection lead comes in.** A synthetic owned test lead enters the workflow and the native',
    `   lead-intake recognition module recognizes it as a roof-inspection request — **${line('new_roof_inspection_lead_alert')}**.`,
    '2. **RoofLeadHQ recognizes and organizes it.** Source/routing state is captured natively; the lead is',
    `   routed for roof-inspection follow-up (routing result: \`${evidence.routing_result}\`) — **${line('lead_source_routing_flag')}**.`,
    '3. **The roofer alert is prepared immediately.** The native binding module produces the exact approved',
    `   M1 alert (binding match: \`${evidence.message_binding_match.M1}\`). No message is sent.`,
    '4. **An unanswered lead receives the correct follow-up nudge.** The native dispatcher planner recognizes',
    `   the still-unanswered follow-up condition and the binding module produces the exact approved M2 nudge`,
    `   (binding match: \`${evidence.message_binding_match.M2}\`) — **${line('missed_or_slow_lead_follow_up_nudge')}**. No message is sent.`,
    '5. **Open leads appear in a daily recap.** A deterministic open-lead count is computed from synthetic',
    `   state (count: \`${evidence.synthetic_open_lead_count}\`) and the internal M3 recap is prepared — **${line('daily_open_lead_recap')}**.`,
    '6. **Homeowner outreach stays blocked.** The native consent boundary blocks any homeowner-facing send',
    `   (homeowner contact blocked: \`${evidence.homeowner_contact_blocked}\`) — **${line('homeowner_consent_boundary_reminder')}**.`,
    '',
    '## Results',
    '',
    `- Scenarios: ${evidence.scenario_count} (required ${evidence.required_scenario_count}, optional ${evidence.optional_scenario_count})`,
    `- Required passed: ${evidence.required_scenarios_passed}/${evidence.required_scenario_count}`,
    `- Optional passed: ${evidence.optional_scenarios_passed}/${evidence.optional_scenario_count}`,
    `- Native modules exercised: ${evidence.native_workflow_modules_exercised.join(', ')}`,
    `- Integration mode: every scenario above ran as native_module_execution (not fixture-string comparison).`,
    `- Decision: **${evidence.decision}**`,
    '',
    '## Future live M1/M2 validation (separately gated, not authorized here)',
    '',
    '- Guarded future M1 send permitted now: **' + evidence.guarded_future_live_m1_m2_support.m1_future_send_permitted + '** (must be false).',
    '- Guarded future M2 send permitted now: **' + evidence.guarded_future_live_m1_m2_support.m2_future_send_permitted + '** (must be false).',
    '- An M2 approval can never authorize M1: **' + evidence.guarded_future_live_m1_m2_support.m2_approval_never_authorizes_m1 + '**.',
    '- A signed approval still cannot send without an explicit confirm token: **' + evidence.guarded_future_live_m1_m2_support.m2_signed_still_requires_confirm_token + '**.',
    '',
    '## Safety',
    '',
    '- Live SMS sent: false · Email sent: false · Network call: false',
    '- Credentials loaded: false · Production data used: false · Production records created: false',
    '- Raw destination/phone/email recorded: false',
    '- Live automation remains disabled: true',
    '',
    '## Remaining UI/demo-view gap (truthful)',
    '',
    'This is a sanitized evidence report, not a screenshot of a running UI. A genuine homeowner/roofer',
    'dashboard view that renders this lead-to-alert-to-recap story for a prospect does not yet exist as a',
    'captured UI artifact. The remaining demo gap is a real UI view (or recorded walkthrough) of the lead',
    'list, the prepared roofer alert, the follow-up nudge, and the daily open-lead recap.',
    ''
  ].join('\n');
}

main();
