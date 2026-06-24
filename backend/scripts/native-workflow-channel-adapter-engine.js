/**
 * Native Workflow Channel-Adapter Execution Engine — LOCAL-ONLY, MOCK-BACKED (Build 182).
 *
 * Pure module. Node built-ins only at call sites (fs/path live in the runner, not here).
 * This module has NO network clients, NO environment-variable access, NO secret handling, and NO
 * live/sandbox external calls. It defines a channel-adapter interface, deterministic mock
 * adapters as the default transport, and a FAIL-CLOSED sandbox transport that — when
 * requested without provisioned config — returns the list of MISSING CONFIG NAMES ONLY
 * (never values) and never performs any external call.
 *
 * Sandbox transport is intentionally inert in Build 182: requesting it without provisioned
 * config yields a fail-closed descriptor the runner turns into a nonzero exit. No secret
 * value is ever read, printed, or logged here.
 */

// Ordered channel registry. Eight are exercised by the 30-scenario manifest; `email`
// is registered for future use (no manifest scenarios route to it yet).
const CHANNELS = ['sms', 'voice', 'email', 'lead', 'review', 'calendar', 'report', 'audit', 'stop'];

// Manifest scenario_group -> channel key.
const GROUP_TO_CHANNEL = {
  'SMS sandbox validation': 'sms',
  'Vapi test assistant validation': 'voice',
  'Lead intake validation': 'lead',
  'Manual review/escalation validation': 'review',
  'Calendar/appointment sandbox validation': 'calendar',
  'Reporting/admin visibility validation': 'report',
  'Audit log evidence validation': 'audit',
  'STOP/rollback validation': 'stop'
};

// Integration label per channel (for evidence only; NOT a client import).
const CHANNEL_INTEGRATION = {
  sms: 'twilio_test_mode',
  voice: 'vapi_test_assistant',
  email: 'resend_test_mode',
  lead: 'local_lead_intake',
  review: 'local_manual_review',
  calendar: 'google_calendar_test_mode',
  report: 'local_reporting',
  audit: 'local_audit_log',
  stop: 'local_stop_optout'
};

// Required SANDBOX config NAMES per channel (identifiers only — never values).
// Used solely to produce a fail-closed "missing config" descriptor for sandbox transport.
const REQUIRED_SANDBOX_CONFIG_NAMES = {
  sms: ['TWILIO_TEST_ACCOUNT_SID', 'TWILIO_TEST_AUTH_TOKEN', 'TWILIO_TEST_FROM_NUMBER'],
  voice: ['VAPI_TEST_API_KEY', 'VAPI_TEST_ASSISTANT_ID'],
  email: ['RESEND_TEST_API_KEY', 'RESEND_TEST_FROM_EMAIL'],
  lead: ['SANDBOX_SUPABASE_TEST_URL', 'SANDBOX_SUPABASE_TEST_ANON_KEY'],
  review: ['SANDBOX_SUPABASE_TEST_URL', 'SANDBOX_SUPABASE_TEST_ANON_KEY'],
  calendar: ['GOOGLE_CALENDAR_TEST_CLIENT_ID', 'GOOGLE_CALENDAR_TEST_CLIENT_SECRET'],
  report: ['SANDBOX_SUPABASE_TEST_URL', 'SANDBOX_SUPABASE_TEST_ANON_KEY'],
  audit: ['SANDBOX_SUPABASE_TEST_URL', 'SANDBOX_SUPABASE_TEST_ANON_KEY'],
  stop: ['SANDBOX_SUPABASE_TEST_URL', 'SANDBOX_SUPABASE_TEST_ANON_KEY']
};

const TRANSPORT_MOCK = 'mock_now';
const TRANSPORT_SANDBOX = 'sandbox';

function resolveChannelForScenario(scenario) {
  const channel = GROUP_TO_CHANNEL[scenario.scenario_group];
  if (!channel) return null;
  return channel;
}

/**
 * Deterministic mock adapter. Performs NO external call. It "executes" a scenario by
 * echoing the local fake input's simulated observed result — fully deterministic and
 * reproducible. Returns a normalized adapter response.
 */
function createMockAdapter(channel) {
  return {
    channel,
    integration: CHANNEL_INTEGRATION[channel],
    transport_mode: TRANSPORT_MOCK,
    external_call_made: false,
    execute(input) {
      return {
        observed_result: input.simulated_observed_result,
        stop_condition_triggered: input.simulated_stop_condition_triggered === true,
        transport_mode: TRANSPORT_MOCK,
        external_call_made: false,
        adapter_integration: CHANNEL_INTEGRATION[channel]
      };
    }
  };
}

/**
 * FAIL-CLOSED sandbox adapter factory. Build 182 never provisions sandbox config, so this
 * always returns a fail-closed descriptor naming the MISSING config keys (names only).
 * It does not read environment variables, does not read secret values, and never makes a call.
 *
 * @param {string} channel
 * @param {object} provisionedConfigNames - an object whose KEYS are config names that are
 *        present (values are intentionally ignored and never read). In Build 182 this is {}.
 */
function createSandboxAdapterOrFailClosed(channel, provisionedConfigNames) {
  const provided = provisionedConfigNames && typeof provisionedConfigNames === 'object'
    ? provisionedConfigNames
    : {};
  const required = REQUIRED_SANDBOX_CONFIG_NAMES[channel] || [];
  const missing = required.filter((name) => !Object.prototype.hasOwnProperty.call(provided, name));
  if (missing.length > 0) {
    return {
      channel,
      transport_mode: TRANSPORT_SANDBOX,
      fail_closed: true,
      missing_config_names: missing, // names only, never values
      external_call_made: false
    };
  }
  // Even when names are present, Build 182 does NOT perform sandbox calls. Sandbox execution
  // is deferred to a future build under separate approval; this remains fail-closed here.
  return {
    channel,
    transport_mode: TRANSPORT_SANDBOX,
    fail_closed: true,
    missing_config_names: [],
    sandbox_execution_deferred_reason: 'sandbox_execution_not_enabled_in_build_182_requires_separate_approval',
    external_call_made: false
  };
}

/**
 * Build the adapter registry for a given transport mode.
 * mock_now -> all channels get deterministic mock adapters.
 * sandbox  -> all channels get fail-closed sandbox descriptors (no provisioned config).
 */
function buildAdapterRegistry(transportMode, provisionedConfigNames) {
  const registry = {};
  for (const channel of CHANNELS) {
    registry[channel] = transportMode === TRANSPORT_SANDBOX
      ? createSandboxAdapterOrFailClosed(channel, provisionedConfigNames)
      : createMockAdapter(channel);
  }
  return registry;
}

function isSandboxMode(mode) {
  if (typeof mode !== 'string') return false;
  const lowered = mode.toLowerCase();
  if (lowered.includes('live') || lowered.includes('production') || lowered.includes('prod')) return false;
  return lowered.includes('sandbox') || lowered.includes('test');
}

/**
 * Score one scenario through its channel mock adapter. Returns evidence + diagnostics.
 * Genuinely fails (diagnostics populated) on boundary or correctness mismatch.
 */
function scoreScenarioThroughAdapter({ scenario, input, expected, adapter }) {
  const diagnostics = [];

  if (!adapter) diagnostics.push('no adapter registered for channel of group: ' + scenario.scenario_group);
  if (adapter && adapter.external_call_made !== false) diagnostics.push('adapter must not make external calls in mock transport');

  // Safety boundary scoring.
  if (!isSandboxMode(input.service_mode)) diagnostics.push('service_mode not sandbox/test: ' + input.service_mode);
  if (input.approved_boundary_checked !== true) diagnostics.push('approved_boundary_checked must be true');
  if (input.external_services_called !== false) diagnostics.push('external_services_called must be false');
  if (input.production_data_touched !== false) diagnostics.push('production_data_touched must be false');
  if (input.live_action_allowed !== false) diagnostics.push('live_action_allowed must be false');

  // Execute through the (mock) adapter and compare to expected.
  const response = adapter && typeof adapter.execute === 'function' ? adapter.execute(input) : null;
  const observedResult = response ? response.observed_result : undefined;
  const observedStop = response ? response.stop_condition_triggered === true : false;
  const expectedStop = expected.expected_stop_condition_triggered === true;

  if (!response) diagnostics.push('adapter did not execute (no mock transport response)');
  if (response && response.external_call_made !== false) diagnostics.push('adapter response indicates external call');
  if (observedResult !== expected.expected_result) {
    diagnostics.push('observed_result "' + observedResult + '" != expected_result "' + expected.expected_result + '"');
  }
  if (observedStop !== expectedStop) {
    diagnostics.push('stop_condition_triggered ' + observedStop + ' != expected ' + expectedStop);
  }
  if (expected.expect_pass !== true) diagnostics.push('expected fixture expect_pass must be true');

  return { response, observedResult, observedStop, diagnostics };
}

module.exports = {
  CHANNELS,
  GROUP_TO_CHANNEL,
  CHANNEL_INTEGRATION,
  REQUIRED_SANDBOX_CONFIG_NAMES,
  TRANSPORT_MOCK,
  TRANSPORT_SANDBOX,
  resolveChannelForScenario,
  createMockAdapter,
  createSandboxAdapterOrFailClosed,
  buildAdapterRegistry,
  isSandboxMode,
  scoreScenarioThroughAdapter
};
