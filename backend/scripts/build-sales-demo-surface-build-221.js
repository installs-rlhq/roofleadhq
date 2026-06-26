#!/usr/bin/env node
/**
 * Build 221 — Sanitized Sales-Demo Surface Generator.
 *
 * LOCAL-ONLY, DETERMINISTIC, SYNTHETIC-DATA-ONLY. This generator EXERCISES the native RoofLeadHQ
 * workflow modules (it compiles the production TypeScript service modules and calls them) to produce a
 * usable sanitized sales-demo surface Jason can open locally and screenshot/share in manual roofer
 * selling conversations. The M1 alert, M2 follow-up, daily recap, recognition/source/routing labels,
 * and the homeowner-consent block shown on the surface are ALL produced by the native modules at build
 * time, not hand-typed into the page.
 *
 * It makes NO network call, sends NO SMS or email, constructs NO provider client, calls NO
 * messages.create, loads NO credentials, records NO raw phone number / email address / SID /
 * destination value, creates NO production record, and activates NO automation. The guarded future
 * M1/M2 live-send support is exercised in permission-only mode and is asserted to FAIL CLOSED (it never
 * sends). Synthetic lead data only. Launch remains pilot-gated, NOT unrestricted.
 * demo_ready_with_live_automation_disabled preserved.
 *
 * Native modules exercised:
 *   - lead-intake-recognition.service  (roof-inspection recognition + source/routing label)
 *   - roofer-alert-binding.service     (exact M1/M2 binding, M3 recap, homeowner-consent block, guarded future send)
 *
 * Outputs (deterministic):
 *   - website/demo/sales-demo.html                                                  (the demo surface)
 *   - backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-state-build-221.json   (native output state)
 *   - backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-readiness-build-221.json (readiness artifact)
 *
 * Exit code: 0 when the native-produced surface is built and self-consistent; nonzero otherwise.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const backendRoot = path.join(repoRoot, 'backend');
const FIXTURE_DIR = path.join(backendRoot, 'fixtures/native-workflow-demo-roofer');
const HTML_PATH = path.join(repoRoot, 'website/demo/sales-demo.html');
const CONTENT_PATH = path.join(FIXTURE_DIR, 'sales-demo-surface-content-build-221.json');
const STATE_PATH = path.join(FIXTURE_DIR, 'sales-demo-surface-state-build-221.json');
const READINESS_PATH = path.join(FIXTURE_DIR, 'sales-demo-surface-readiness-build-221.json');

// Objective-mandated exact approved copy (independent restatement; cross-checked against native module).
const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';

function loadNativeModules() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b221-native');
  fs.mkdirSync(outDir, { recursive: true });
  const serviceFiles = [
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
    binding: require(path.join(outDir, 'roofer-alert-binding.service.js'))
  };
}

function fail(msg) {
  console.error('FAIL: ' + msg);
  process.exit(1);
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function main() {
  const native = loadNativeModules();

  // ---------------------------------------------------------------------------------------------
  // Synthetic, label-only demo lead. No raw phone/email anywhere. Contact fields are label-only.
  // ---------------------------------------------------------------------------------------------
  const syntheticLead = {
    homeowner_label: 'Demo Homeowner',
    property_area: 'Demo Service Area',
    lead_source_display: 'Website form',
    request_type: 'Roof inspection',
    status: 'New / awaiting first reply',
    follow_up_status: 'Follow-up recommended',
    contact_phone_display: 'hidden (label-only placeholder)',
    contact_email_display: 'hidden (label-only placeholder)'
  };

  // Native recognition input (source label normalized to the native vocabulary; display stays "Website form").
  const recognitionInput = {
    issueText: 'New roof inspection request from the website form; homeowner reports a possible roof leak after a storm.',
    sourceLabel: 'website_form',
    serviceAreaMatch: true
  };

  // ---- Exercise native modules (this is the "native workflow logic used" guarantee) ------------
  const recognition = native.recognition.recognizeLeadIntake(recognitionInput);
  const m1 = native.binding.bindRooferAlert('new_roof_inspection_lead_alert');
  const m2 = native.binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge');
  const recap = native.binding.buildDailyOpenLeadRecap(3);
  const homeowner = native.binding.prepareHomeownerOutreach();
  // Guarded future live send must FAIL CLOSED (permission-only; no approval supplied; never sends).
  const guardedM1 = native.binding.prepareGuardedFutureSend('new_roof_inspection_lead_alert', null);
  const guardedM2 = native.binding.prepareGuardedFutureSend('missed_or_slow_lead_follow_up_nudge', null);

  // ---- Self-consistency assertions (native output must match objective-mandated exact copy) -----
  if (!m1.ok || m1.boundBody !== EXACT_M1) fail('native M1 binding did not match exact approved copy');
  if (!m2.ok || m2.boundBody !== EXACT_M2) fail('native M2 binding did not match exact approved copy');
  if (m1.messageId !== 'M1') fail('native M1 messageId mismatch');
  if (m2.messageId !== 'M2') fail('native M2 messageId mismatch');
  if (!recognition.isRoofInspectionRequest) fail('native recognition failed to classify roof inspection request');
  if (recognition.recognizedType !== 'roof_inspection_request') fail('native recognizedType mismatch');
  if (recognition.normalizedSourceLabel !== 'website_form') fail('native source label normalization mismatch');
  if (!recognition.sourceLabelRecognized) fail('native source label not recognized');
  if (recognition.routedFor !== 'roof_inspection_follow_up') fail('native routing target mismatch');
  if (homeowner.status !== 'blocked_approval_required') fail('homeowner outreach is not blocked');
  if (homeowner.homeownerContactAuthorized !== false) fail('homeowner contact must not be authorized');
  if (guardedM1.permitted !== false || guardedM2.permitted !== false) fail('guarded future send must fail closed');
  if (recap.messageId !== 'M3' || recap.channel !== 'internal') fail('recap binding mismatch');

  // ---------------------------------------------------------------------------------------------
  // Native-produced demo state (labels/booleans/sanitized prose only).
  // ---------------------------------------------------------------------------------------------
  const state = {
    state_name: 'sales_demo_surface_state_build_221',
    build: 221,
    data_classification:
      'sanitized_synthetic_demo_state_labels_booleans_and_native_produced_copy_only_no_secret_values_no_phone_numbers_no_email_addresses_no_raw_sids_no_destination_values_no_production_data',
    generated_from_native_modules: ['lead-intake-recognition.service', 'roofer-alert-binding.service'],
    synthetic_lead: syntheticLead,
    native_recognition: {
      is_roof_inspection_request: recognition.isRoofInspectionRequest,
      recognized_type: recognition.recognizedType,
      matched_keywords: recognition.matchedKeywords,
      normalized_source_label: recognition.normalizedSourceLabel,
      source_label_recognized: recognition.sourceLabelRecognized,
      routed_for: recognition.routedFor,
      is_eligible: recognition.isEligible
    },
    native_m1_alert: { ok: m1.ok, message_id: m1.messageId, channel: m1.channel, bound_body: m1.boundBody },
    native_m2_follow_up: { ok: m2.ok, message_id: m2.messageId, channel: m2.channel, bound_body: m2.boundBody },
    native_daily_recap: { message_id: recap.messageId, channel: recap.channel, open_lead_count: recap.openLeadCount, body: recap.body },
    native_homeowner_block: {
      homeowner_contact_authorized: homeowner.homeownerContactAuthorized,
      status: homeowner.status,
      draft_only: homeowner.draftOnly,
      prepared_send: homeowner.preparedSend,
      reason: homeowner.reason
    },
    native_guarded_future_send_fail_closed: {
      m1_permitted: guardedM1.permitted,
      m1_blocked_reasons: guardedM1.blockedReasons,
      m2_permitted: guardedM2.permitted,
      m2_blocked_reasons: guardedM2.blockedReasons,
      no_send_performed: guardedM1.noSendPerformed && guardedM2.noSendPerformed
    },
    safety_attestations: {
      phone_number_recorded: false,
      email_address_recorded: false,
      secret_values_recorded: false,
      raw_sid_recorded: false,
      destination_value_recorded: false,
      production_data_used: false,
      synthetic_data_only: true,
      no_send_performed: true,
      no_provider_client_constructed: true,
      no_credential_read: true
    }
  };

  // ---------------------------------------------------------------------------------------------
  // Render the demo surface from the native-produced state. Sanitized display content (proof
  // bullets) is loaded from the content fixture so this generator stays free of brand/partner
  // literals; the bullets are still sanitized, labels-only prose.
  // ---------------------------------------------------------------------------------------------
  const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'));
  if (!Array.isArray(content.proof_bullets) || content.proof_bullets.length === 0) {
    fail('content fixture missing proof_bullets');
  }
  const html = renderHtml({ syntheticLead, recognition, m1, m2, recap, homeowner, proofBullets: content.proof_bullets });
  fs.writeFileSync(HTML_PATH, html, 'utf8');
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8');

  // ---------------------------------------------------------------------------------------------
  // Readiness artifact.
  // ---------------------------------------------------------------------------------------------
  const readiness = {
    artifact_name: 'sales_demo_surface_readiness_build_221',
    build: 221,
    source_of_truth_commit: '1a8c700',
    demo_surface_created: true,
    demo_surface_type: 'static_html_demo_surface_generated_from_native_workflow_modules_on_synthetic_data',
    demo_surface_path_or_route: 'website/demo/sales-demo.html',
    is_real_app_ui: false,
    is_static_demo_ui: true,
    is_report_only: false,
    synthetic_data_only: true,
    native_workflow_logic_used: true,
    native_modules_used: ['lead-intake-recognition.service', 'roofer-alert-binding.service'],
    m1_m2_proof_summarized: true,
    no_sensitive_values: true,
    sales_demo_ready: true,
    remaining_blocker: null,
    decision: 'SANITIZED_SALES_DEMO_SURFACE_READY_FOR_MANUAL_ROOFER_OUTREACH',
    recommended_next_option: 'prepare_roofer_outreach_list_and_start_manual_sales_conversations',
    authorizes_send_now: false,
    homeowner_contact_authorized: false,
    real_roofer_contact_authorized: false,
    unrestricted_launch: false,
    live_automation_remains_disabled: true,
    sales_demo_surface_ready: true,
    m1_m2_live_validation_complete: true,
    launch_status: 'pilot_gated_not_unrestricted',
    safety_posture: 'demo_ready_with_live_automation_disabled',
    safety_status: 'demo_ready_with_live_automation_disabled'
  };
  fs.writeFileSync(READINESS_PATH, JSON.stringify(readiness, null, 2) + '\n', 'utf8');

  console.log('PASS: native modules exercised; M1/M2/recap/recognition/homeowner-block all native-produced.');
  console.log('PASS: guarded future M1/M2 live send fail-closed (permission-only; no send performed).');
  console.log('Wrote: ' + path.relative(repoRoot, HTML_PATH));
  console.log('Wrote: ' + path.relative(repoRoot, STATE_PATH));
  console.log('Wrote: ' + path.relative(repoRoot, READINESS_PATH));
  console.log('Build 221 sales-demo surface generated (synthetic data only; no send; no secrets).');
}

function renderHtml(ctx) {
  const { syntheticLead, recognition, m1, m2, recap, homeowner, proofBullets } = ctx;
  const m1Body = esc(m1.boundBody);
  const m2Body = esc(m2.boundBody);
  const recapBody = esc(recap.body);
  const proofItems = proofBullets
    .map((b) => {
      const mark = b.kind === 'ok'
        ? '<span class="ok">&#10003;</span>'
        : '<span class="block">&#9679;</span>';
      return `          <li>${mark} ${esc(b.text)}</li>`;
    })
    .join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RoofLeadHQ • Sales Demo Surface (Sample / Demo)</title>
  <link rel="stylesheet" href="demo.css">
  <style>
    .sd-hero { background: linear-gradient(90deg, #0f172a, #1e293b); color: #fff; padding: 28px 0; }
    .sd-hero-inner { max-width: 980px; margin: 0 auto; padding: 0 20px; }
    .sd-hero h1 { margin: 0 0 6px; font-size: 26px; }
    .sd-hero p { margin: 0; color: #cbd5e1; font-size: 15px; max-width: 760px; }
    .sd-step { display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #e2e8f0; }
    .sd-step:last-child { border-bottom: 0; }
    .sd-num { flex: 0 0 30px; height: 30px; width: 30px; border-radius: 9999px; background: #0284c8; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 14px; }
    .sd-step-body h3 { margin: 2px 0 4px; font-size: 15px; }
    .sd-step-body p { margin: 0; color: #475569; font-size: 14px; }
    .sd-msg { background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0284c8; border-radius: 8px; padding: 10px 12px; margin-top: 8px; font-size: 14px; color: #0f172a; }
    .sd-msg .tag { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .5px; color: #0284c8; margin-bottom: 4px; }
    .sd-blocked { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 10px 12px; margin-top: 8px; font-size: 14px; color: #92400e; }
    .sd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 720px) { .sd-grid { grid-template-columns: 1fr; } }
    .sd-kv { font-size: 14px; }
    .sd-kv div { padding: 5px 0; border-bottom: 1px dashed #e2e8f0; display: flex; justify-content: space-between; gap: 12px; }
    .sd-kv div:last-child { border-bottom: 0; }
    .sd-kv .k { color: #64748b; }
    .sd-kv .v { font-weight: 600; text-align: right; }
    .sd-proof li { margin-bottom: 6px; font-size: 14px; }
    .sd-offer { font-size: 15px; }
    .sd-offer .price { font-size: 22px; font-weight: 800; color: #0f172a; }
    .muted { color: #94a3b8; font-style: italic; }
    .ok { color: #166534; font-weight: 700; }
    .block { color: #b45309; font-weight: 700; }
  </style>
</head>
<body class="bg-slate-100">
  <!-- Demo Banner -->
  <div class="demo-banner">
    <div class="flex items-center gap-3" style="display:flex;align-items:center;gap:12px;">
      <span class="demo-badge">SAMPLE / DEMO</span>
      <span>RoofLeadHQ Sales Demo Surface — synthetic data only. Not a live production automation screen.</span>
    </div>
    <span class="demo-label">Manual approval pilot first. No autonomous customer contact.</span>
  </div>

  <!-- Hero -->
  <div class="sd-hero">
    <div class="sd-hero-inner">
      <h1>RoofLeadHQ</h1>
      <p>RoofLeadHQ helps roofing contractors respond faster to roof inspection leads and avoid letting open leads sit without follow-up.</p>
    </div>
  </div>

  <div class="demo-container" style="max-width:980px;margin:0 auto;padding:24px 20px;">

    <!-- The story -->
    <div class="demo-card">
      <div class="demo-section-title">How it works — a roof inspection lead, end to end</div>

      <div class="sd-step">
        <div class="sd-num">1</div>
        <div class="sd-step-body">
          <h3>A new roof inspection lead arrives</h3>
          <p>A homeowner submits a request through the contractor's intake. <span class="muted">Synthetic example: "${esc(syntheticLead.homeowner_label)}", ${esc(syntheticLead.property_area)}.</span></p>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">2</div>
        <div class="sd-step-body">
          <h3>RoofLeadHQ recognizes and organizes it</h3>
          <p>The native intake logic classifies it as a <strong>${esc(recognition.recognizedType.replace(/_/g, ' '))}</strong> and routes it for <strong>${esc(recognition.routedFor.replace(/_/g, ' '))}</strong>. Source label: <strong>${esc(syntheticLead.lead_source_display)}</strong> (recognized: ${recognition.sourceLabelRecognized ? 'yes' : 'no'}).</p>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">3</div>
        <div class="sd-step-body">
          <h3>An M1 alert is prepared from native workflow logic</h3>
          <p>The contractor gets a fast first-reply nudge. This exact copy is produced by the native roofer-alert binding and was validated live (exact-copy match).</p>
          <div class="sd-msg"><span class="tag">M1 • ROOFER ALERT (SMS)</span><br>${m1Body}</div>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">4</div>
        <div class="sd-step-body">
          <h3>If unanswered, an M2 follow-up is prepared from native workflow logic</h3>
          <p>When the lead is still awaiting a first reply, RoofLeadHQ prepares a follow-up nudge. This exact copy is produced by the native logic and was validated live (exact-copy match).</p>
          <div class="sd-msg"><span class="tag">M2 • FOLLOW-UP NUDGE (SMS)</span><br>${m2Body}</div>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">5</div>
        <div class="sd-step-body">
          <h3>Open leads appear in a simple recap</h3>
          <p>An internal daily recap keeps open leads from sitting. Produced by native logic (count is synthetic):</p>
          <div class="sd-msg"><span class="tag">M3 • DAILY RECAP (INTERNAL)</span><br>${recapBody}</div>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">6</div>
        <div class="sd-step-body">
          <h3>Source &amp; routing stay visible</h3>
          <p>Every lead carries its source and routing label so the contractor always knows where it came from and what happens next.</p>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">7</div>
        <div class="sd-step-body">
          <h3>Homeowner outreach is blocked pending consent and separate approval</h3>
          <p>RoofLeadHQ never contacts a homeowner on its own. <strong>No homeowner outreach without consent and separate approval.</strong></p>
          <div class="sd-blocked"><strong>Homeowner outreach: ${esc(homeowner.status.replace(/_/g, ' '))}</strong> — draft only, no send prepared. Reason: ${esc(homeowner.reason.replace(/_/g, ' '))}.</div>
        </div>
      </div>

      <div class="sd-step">
        <div class="sd-num">8</div>
        <div class="sd-step-body">
          <h3>Manual approval pilot, always</h3>
          <p><strong>Manual approval pilot first. No autonomous customer contact.</strong> A person approves before anything goes out.</p>
        </div>
      </div>
    </div>

    <div class="sd-grid" style="margin-top:18px;">
      <!-- Synthetic lead card -->
      <div class="demo-card">
        <div class="demo-section-title">Sample lead (synthetic)</div>
        <div class="sd-kv">
          <div><span class="k">Homeowner</span><span class="v">${esc(syntheticLead.homeowner_label)}</span></div>
          <div><span class="k">Property area</span><span class="v">${esc(syntheticLead.property_area)}</span></div>
          <div><span class="k">Lead source</span><span class="v">${esc(syntheticLead.lead_source_display)}</span></div>
          <div><span class="k">Request type</span><span class="v">${esc(syntheticLead.request_type)}</span></div>
          <div><span class="k">Status</span><span class="v">${esc(syntheticLead.status)}</span></div>
          <div><span class="k">Follow-up</span><span class="v">${esc(syntheticLead.follow_up_status)}</span></div>
          <div><span class="k">Phone</span><span class="v muted">${esc(syntheticLead.contact_phone_display)}</span></div>
          <div><span class="k">Email</span><span class="v muted">${esc(syntheticLead.contact_email_display)}</span></div>
        </div>
      </div>

      <!-- Proof card -->
      <div class="demo-card">
        <div class="demo-section-title">What's proven (sanitized)</div>
        <ul class="sd-proof" style="margin:0;padding-left:18px;">
${proofItems}
        </ul>
      </div>
    </div>

    <!-- Offer -->
    <div class="demo-card" style="margin-top:18px;">
      <div class="demo-section-title">The offer</div>
      <div class="sd-offer">
        <div class="price">$399-$799/mo + $499 setup</div>
        <p style="margin:6px 0 0;color:#475569;">14-day trial after go-live. Manual approval pilot first.</p>
        <p style="margin:10px 0 0;font-weight:600;">"I can test this with your inbound leads under manual approval first."</p>
      </div>
    </div>

    <div class="demo-footer" style="margin-top:18px;color:#64748b;font-size:12px;">
      Sample / demo surface. Synthetic data only. Generated from RoofLeadHQ native workflow logic
      (lead-intake-recognition + roofer-alert-binding). Not a live production automation screen.
      No autonomous customer contact. No homeowner outreach without consent and separate approval.
    </div>
  </div>
</body>
</html>
`;
}

main();
