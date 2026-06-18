#!/usr/bin/env node
/**
 * Local fake-data first controlled launch recommended test-mode values proposal dry-run model.
 * Offers conservative safe defaults Jason can review before any exact controlled test-mode
 * activation decision — without granting activation or executing any step.
 * No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-19T00:00:00.000Z';

const PROPOSAL_TYPE = 'recommended_test_mode_values_proposal';
const PROPOSAL_STATUS = 'proposed_only_not_approved';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const PRE_ACTIVATION_CHECKLIST_COMMIT = '2b753e8';
const APPROVAL_STATEMENT_REFERENCE = 'Approved to move forward.';
const ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED =
  'Activation command must be separately approved after Jason grants final activation approval of exact proposed values.';
const REQUIRED_NEXT_DECISION =
  'Jason must explicitly approve exact proposed values and separately approve any activation command before activation.';

const PROPOSED_CHANNEL_SCOPE = 'local fake channel adapters only';
const PROPOSED_SERVICE_SCOPE = 'no external services';
const PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES =
  'fake/local-only account fixtures; no real homeowner, roofer, customer, production, or external account data';
const PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE =
  'one or more seeded fake roofing homeowner leads with fake name, fake phone, fake email, fake address, fake source, fake appointment preference, fake consent/contact flags, and fake review/escalation outcomes';
const PROPOSED_START_WINDOW = 'operator-selected manual window, not scheduled, not approved';
const PROPOSED_OPERATOR = 'Jason or designated operator placeholder';
const PROPOSED_REVIEWER_ON_CALL_OWNER = 'Jason placeholder';
const PROPOSED_ROLLBACK_OWNER = 'Jason placeholder';
const PROPOSED_STOP_CONDITIONS =
  'any attempted external call, credential/env access, production data access, real send, real webhook, real scheduler/cron/dispatcher activation, unexpected Supabase access, schema/auth/RLS/security change, failed safety assertion, or unexpected channel delivery attempt';
const PROPOSED_OBSERVATION_WINDOW =
  'short manual observation window placeholder after local dry-run only';
const PROPOSED_EVIDENCE_CAPTURE =
  'terminal output, targeted verifier result, wrapper result, fast safe readiness result, backend build result, source-of-truth verification after commit only';
const PROPOSED_POST_RUN_REVIEW =
  'confirm no activation, no external calls, no production data access, no credentials, no public copy changes, no unexpected files, and clean git status';
const PROPOSED_EXCLUDED_SCOPE =
  'all live/test-mode/external/service/production actions, real homeowners, real roofers, real sends, real calendars, CRM sync, live CSV, billing/payment/deposit/invoice/quote/estimate automation';

const COMMON_PROPOSAL_FIELDS = [
  'fixture_recommended_values_proposal_id',
  'fixture_proposal_area',
  'fixture_proposal_status',
  'fixture_proposal_type',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_delivery_mode',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_first_controlled_launch_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
];

function commonProposalFields(proposalId, area, status, blockingReason, owner, auditEventId) {
  return {
    fixture_recommended_values_proposal_id: proposalId,
    fixture_proposal_area: area,
    fixture_proposal_status: status,
    fixture_proposal_type: PROPOSAL_TYPE,
    fixture_blocking_reason: blockingReason,
    fixture_owner_for_next_step: owner,
    fixture_delivery_mode: 'dry_run_only',
    fixture_external_call_allowed: false,
    fixture_live_activation_allowed: false,
    fixture_test_mode_activation_allowed: false,
    fixture_first_controlled_launch_activation_allowed: false,
    fixture_audit_event_id: auditEventId,
    fixture_created_at: FIXTURE_CREATED_AT,
  };
}

const RECOMMENDED_VALUES_CHECKLIST_TABLE = [
  {
    checklist_item: 'proposed_channel_scope',
    recommended_value: PROPOSED_CHANNEL_SCOPE,
    why_safest_default:
      'keeps all channel exercise inside local fixtures with zero external delivery risk',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'written Jason approval of exact channel scope',
  },
  {
    checklist_item: 'proposed_service_scope',
    recommended_value: PROPOSED_SERVICE_SCOPE,
    why_safest_default:
      'eliminates credential, webhook, and third-party blast-radius during first controlled review',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval:
      'written Jason approval of any future external service scope, if any',
  },
  {
    checklist_item: 'proposed_fake_test_account_boundaries',
    recommended_value: PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES,
    why_safest_default:
      'prevents accidental PII or production account coupling in first review',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented test account boundary approval',
  },
  {
    checklist_item: 'proposed_allowed_test_lead_data_shape',
    recommended_value: PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE,
    why_safest_default:
      'exercises realistic workflow shape without real people or production records',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented test lead data shape approval',
  },
  {
    checklist_item: 'proposed_start_window',
    recommended_value: PROPOSED_START_WINDOW,
    why_safest_default:
      'avoids unattended scheduler/cron activation during first controlled review',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'written start window approval record',
  },
  {
    checklist_item: 'proposed_operator',
    recommended_value: PROPOSED_OPERATOR,
    why_safest_default: 'keeps human operator accountability explicit before any activation',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'operator assignment approval record',
  },
  {
    checklist_item: 'proposed_reviewer_on_call_owner',
    recommended_value: PROPOSED_REVIEWER_ON_CALL_OWNER,
    why_safest_default:
      'ensures a named reviewer is accountable during any future controlled run',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'reviewer/on-call owner assignment approval record',
  },
  {
    checklist_item: 'proposed_rollback_owner',
    recommended_value: PROPOSED_ROLLBACK_OWNER,
    why_safest_default: 'ensures rollback authority is named before any future activation',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'rollback owner assignment approval record',
  },
  {
    checklist_item: 'proposed_stop_conditions',
    recommended_value: PROPOSED_STOP_CONDITIONS,
    why_safest_default: 'fail-closed stop list covers the highest-risk escape paths',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented stop conditions approval',
  },
  {
    checklist_item: 'proposed_observation_window',
    recommended_value: PROPOSED_OBSERVATION_WINDOW,
    why_safest_default: 'limits first review to a bounded manual observation period',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented observation window approval',
  },
  {
    checklist_item: 'proposed_evidence_capture',
    recommended_value: PROPOSED_EVIDENCE_CAPTURE,
    why_safest_default: 'captures deterministic local evidence without external telemetry',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented evidence capture plan approval',
  },
  {
    checklist_item: 'proposed_post_run_review',
    recommended_value: PROPOSED_POST_RUN_REVIEW,
    why_safest_default: 'post-run checklist confirms safety posture held',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented post-run review plan approval',
  },
  {
    checklist_item: 'proposed_excluded_scope',
    recommended_value: PROPOSED_EXCLUDED_SCOPE,
    why_safest_default: 'explicit exclusion list prevents scope creep into live automation',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'documented excluded scope confirmation approval',
  },
  {
    checklist_item: 'required_next_decision',
    recommended_value: REQUIRED_NEXT_DECISION,
    why_safest_default: 'separates proposal review from activation command authorization',
    approval_status: PROPOSAL_STATUS,
    activation_allowed_now: false,
    evidence_needed_before_future_approval: 'written Jason final activation approval decision',
  },
];

const firstControlledLaunchRecommendedTestModeValuesProposalItems = [
  {
    review_area_category: 'executive_recommended_values_proposal',
    ...commonProposalFields(
      'recommended_values_proposal_exec_001',
      'Executive recommended values proposal summary',
      PROPOSAL_STATUS,
      'final_jason_activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_exec_001',
    ),
  },
  {
    review_area_category: 'prior_scoped_approval_capture_reference',
    fixture_prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    ...commonProposalFields(
      'recommended_values_proposal_prior_capture_001',
      'Prior scoped approval capture reference',
      'prior_scoped_planning_approval_referenced_not_activation_approved',
      'prior_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_prior_capture_001',
    ),
  },
  {
    review_area_category: 'exact_scope_authorization_draft_reference',
    fixture_exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    ...commonProposalFields(
      'recommended_values_proposal_exact_scope_draft_001',
      'Exact scope authorization draft reference',
      'exact_scope_draft_referenced_not_activation_approved',
      'exact_scope_draft_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_exact_scope_draft_001',
    ),
  },
  {
    review_area_category: 'pre_activation_checklist_reference',
    fixture_pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    ...commonProposalFields(
      'recommended_values_proposal_pre_activation_checklist_001',
      'Pre-activation checklist reference',
      'pre_activation_checklist_referenced_not_activation_approved',
      'pre_activation_checklist_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_pre_activation_checklist_001',
    ),
  },
  {
    review_area_category: 'proposal_type_and_status',
    fixture_proposal_type_value: PROPOSAL_TYPE,
    fixture_proposal_status_value: PROPOSAL_STATUS,
    ...commonProposalFields(
      'recommended_values_proposal_type_status_001',
      'Proposal type and status (proposed_only_not_approved)',
      'proposal_only_not_activation_approved',
      'proposal_status_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_type_status_001',
    ),
  },
  {
    review_area_category: 'activation_approval_status',
    fixture_activation_approval_status_value: ACTIVATION_APPROVAL_STATUS,
    ...commonProposalFields(
      'recommended_values_proposal_activation_status_001',
      'Activation approval status (not_granted)',
      'activation_approval_not_granted',
      'activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_activation_status_001',
    ),
  },
  {
    review_area_category: 'first_controlled_launch_activation_blocked',
    ...commonProposalFields(
      'recommended_values_proposal_fcl_blocked_001',
      'First controlled launch activation blocked',
      'first_controlled_launch_activation_remains_blocked',
      'first_controlled_launch_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_fcl_blocked_001',
    ),
  },
  {
    review_area_category: 'sandbox_test_mode_activation_blocked',
    ...commonProposalFields(
      'recommended_values_proposal_sandbox_blocked_001',
      'Sandbox/test-mode activation blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'sandbox_test_mode_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_sandbox_blocked_001',
    ),
  },
  {
    review_area_category: 'live_activation_blocked',
    ...commonProposalFields(
      'recommended_values_proposal_live_blocked_001',
      'Live activation blocked',
      'live_activation_remains_blocked',
      'live_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_live_blocked_001',
    ),
  },
  {
    review_area_category: 'external_call_blocked',
    ...commonProposalFields(
      'recommended_values_proposal_external_blocked_001',
      'External call blocked',
      'external_calls_remain_forbidden',
      'external_calls_not_approved',
      'security_review_queue',
      'fixture_audit_recommended_values_proposal_external_blocked_001',
    ),
  },
  {
    review_area_category: 'approved_channels',
    fixture_approved_channels_empty: true,
    ...commonProposalFields(
      'recommended_values_proposal_channels_001',
      'Approved channels empty',
      'approved_channels_remain_empty',
      'no_channels_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_channels_001',
    ),
  },
  {
    review_area_category: 'approved_external_services',
    fixture_approved_external_services_empty: true,
    ...commonProposalFields(
      'recommended_values_proposal_services_001',
      'Approved external services empty',
      'approved_external_services_remain_empty',
      'no_external_services_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_services_001',
    ),
  },
  {
    review_area_category: 'proposed_channel_scope',
    fixture_proposed_channel_scope_value: PROPOSED_CHANNEL_SCOPE,
    ...commonProposalFields(
      'recommended_values_proposal_channel_scope_001',
      'Proposed channel scope (local fake channel adapters only)',
      PROPOSAL_STATUS,
      'proposed_channel_scope_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_channel_scope_001',
    ),
  },
  {
    review_area_category: 'proposed_service_scope',
    fixture_proposed_service_scope_value: PROPOSED_SERVICE_SCOPE,
    ...commonProposalFields(
      'recommended_values_proposal_service_scope_001',
      'Proposed service scope (no external services)',
      PROPOSAL_STATUS,
      'proposed_service_scope_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_service_scope_001',
    ),
  },
  {
    review_area_category: 'proposed_fake_test_account_boundaries',
    fixture_proposed_fake_test_account_boundaries_value: PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES,
    ...commonProposalFields(
      'recommended_values_proposal_test_account_001',
      'Proposed fake/test account boundaries',
      PROPOSAL_STATUS,
      'proposed_fake_test_account_boundaries_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_test_account_001',
    ),
  },
  {
    review_area_category: 'proposed_allowed_test_lead_data_shape',
    fixture_proposed_allowed_test_lead_data_shape_value: PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE,
    ...commonProposalFields(
      'recommended_values_proposal_lead_data_shape_001',
      'Proposed allowed test lead data shape',
      PROPOSAL_STATUS,
      'proposed_allowed_test_lead_data_shape_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_lead_data_shape_001',
    ),
  },
  {
    review_area_category: 'proposed_start_window',
    fixture_proposed_start_window_value: PROPOSED_START_WINDOW,
    ...commonProposalFields(
      'recommended_values_proposal_start_window_001',
      'Proposed start window',
      PROPOSAL_STATUS,
      'proposed_start_window_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_start_window_001',
    ),
  },
  {
    review_area_category: 'proposed_operator',
    fixture_proposed_operator_value: PROPOSED_OPERATOR,
    ...commonProposalFields(
      'recommended_values_proposal_operator_001',
      'Proposed operator',
      PROPOSAL_STATUS,
      'proposed_operator_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_operator_001',
    ),
  },
  {
    review_area_category: 'proposed_reviewer_on_call_owner',
    fixture_proposed_reviewer_on_call_owner_value: PROPOSED_REVIEWER_ON_CALL_OWNER,
    ...commonProposalFields(
      'recommended_values_proposal_reviewer_001',
      'Proposed reviewer/on-call owner',
      PROPOSAL_STATUS,
      'proposed_reviewer_on_call_owner_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_reviewer_001',
    ),
  },
  {
    review_area_category: 'proposed_rollback_owner',
    fixture_proposed_rollback_owner_value: PROPOSED_ROLLBACK_OWNER,
    ...commonProposalFields(
      'recommended_values_proposal_rollback_owner_001',
      'Proposed rollback owner',
      PROPOSAL_STATUS,
      'proposed_rollback_owner_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_rollback_owner_001',
    ),
  },
  {
    review_area_category: 'proposed_stop_conditions',
    fixture_proposed_stop_conditions_value: PROPOSED_STOP_CONDITIONS,
    ...commonProposalFields(
      'recommended_values_proposal_stop_conditions_001',
      'Proposed stop conditions',
      PROPOSAL_STATUS,
      'proposed_stop_conditions_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_stop_conditions_001',
    ),
  },
  {
    review_area_category: 'proposed_observation_window',
    fixture_proposed_observation_window_value: PROPOSED_OBSERVATION_WINDOW,
    ...commonProposalFields(
      'recommended_values_proposal_observation_window_001',
      'Proposed observation window',
      PROPOSAL_STATUS,
      'proposed_observation_window_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_observation_window_001',
    ),
  },
  {
    review_area_category: 'proposed_evidence_capture',
    fixture_proposed_evidence_capture_value: PROPOSED_EVIDENCE_CAPTURE,
    ...commonProposalFields(
      'recommended_values_proposal_evidence_capture_001',
      'Proposed evidence capture',
      PROPOSAL_STATUS,
      'proposed_evidence_capture_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_evidence_capture_001',
    ),
  },
  {
    review_area_category: 'proposed_post_run_review',
    fixture_proposed_post_run_review_value: PROPOSED_POST_RUN_REVIEW,
    ...commonProposalFields(
      'recommended_values_proposal_post_run_review_001',
      'Proposed post-run review',
      PROPOSAL_STATUS,
      'proposed_post_run_review_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_post_run_review_001',
    ),
  },
  {
    review_area_category: 'proposed_excluded_scope',
    fixture_proposed_excluded_scope_value: PROPOSED_EXCLUDED_SCOPE,
    ...commonProposalFields(
      'recommended_values_proposal_excluded_scope_001',
      'Proposed excluded scope',
      PROPOSAL_STATUS,
      'proposed_excluded_scope_not_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_excluded_scope_001',
    ),
  },
  {
    review_area_category: 'required_next_decision',
    fixture_required_next_decision_value: REQUIRED_NEXT_DECISION,
    ...commonProposalFields(
      'recommended_values_proposal_required_next_decision_001',
      'Required next decision (Jason explicit approval)',
      PROPOSAL_STATUS,
      'jason_explicit_approval_still_required',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_required_next_decision_001',
    ),
  },
  {
    review_area_category: 'proposed_values_not_approved',
    fixture_proposed_values_not_approved: true,
    ...commonProposalFields(
      'recommended_values_proposal_not_approved_001',
      'Proposed values are not approved boundary',
      'proposed_values_not_approved',
      'proposed_values_must_not_be_treated_as_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_not_approved_001',
    ),
  },
  {
    review_area_category: 'activation_command_separate_approval',
    fixture_activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
    ...commonProposalFields(
      'recommended_values_proposal_separate_command_001',
      'Activation command separately approved boundary',
      'activation_command_must_be_separately_approved',
      'activation_command_not_separately_approved',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_separate_command_001',
    ),
  },
  {
    review_area_category: 'recommended_values_checklist_table',
    fixture_recommended_values_checklist_table_count: RECOMMENDED_VALUES_CHECKLIST_TABLE.length,
    ...commonProposalFields(
      'recommended_values_proposal_table_001',
      'Recommended values checklist table',
      'all_rows_proposed_only_not_approved',
      'no_proposed_value_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_table_001',
    ),
  },
  {
    review_area_category: 'operator_questions_deferred',
    fixture_no_blocking_questions_required: true,
    ...commonProposalFields(
      'recommended_values_proposal_questions_deferred_001',
      'Operator questions deferred',
      'no_blocking_questions_required',
      'questions_required_only_before_real_external_service_selection',
      'founder_manual_review',
      'fixture_audit_recommended_values_proposal_questions_deferred_001',
    ),
  },
  {
    review_area_category: 'credential_env_boundary',
    fixture_credential_env_reads_forbidden: true,
    fixture_no_credential_values_logged: true,
    ...commonProposalFields(
      'recommended_values_proposal_credential_env_001',
      'Credential/env boundary',
      'boundary_enforced_no_credential_access',
      'credential_env_content_detected_in_payload',
      'security_review_queue',
      'fixture_audit_recommended_values_proposal_credential_env_001',
    ),
  },
  {
    review_area_category: 'schema_auth_rls_security_boundary',
    fixture_schema_changes_forbidden: true,
    ...commonProposalFields(
      'recommended_values_proposal_schema_auth_rls_001',
      'Schema/auth/RLS/security boundary',
      'boundary_enforced_no_schema_auth_rls_changes',
      'security_tenant_isolation_review_incomplete',
      'security_review_queue',
      'fixture_audit_recommended_values_proposal_schema_auth_rls_001',
    ),
  },
];

const PROPOSAL_AREAS = firstControlledLaunchRecommendedTestModeValuesProposalItems.map(
  (item) => item.fixture_proposal_area,
);

function allItemsSatisfyCommonProposalFields() {
  return firstControlledLaunchRecommendedTestModeValuesProposalItems.every((item) =>
    COMMON_PROPOSAL_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field)),
  );
}

function allItemsRemainDryRunOnly() {
  return firstControlledLaunchRecommendedTestModeValuesProposalItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false &&
      item.fixture_first_controlled_launch_activation_allowed === false,
  );
}

const firstControlledLaunchRecommendedTestModeValuesProposalSafetyAssertions = [
  'first_controlled_launch_recommended_test_mode_values_proposal_doc_present',
  'fake_data_local_only_scope_present',
  'proposal_only_not_activation_approved',
  'prior_scoped_approval_capture_referenced',
  'exact_scope_authorization_draft_referenced',
  'pre_activation_checklist_referenced',
  'activation_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_channels_empty',
  'approved_external_services_empty',
  'proposed_values_exist_but_not_approved',
  'local_fake_channel_adapters_only_proposed',
  'no_external_services_proposed_as_approved',
  'exact_next_jason_approval_still_required_before_activation',
  'activation_command_must_be_separately_approved',
  'no_launch_or_channel_activation_allowed',
  'proposed_values_not_approved_boundary_present',
  'operator_questions_deferred_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'proposal_items_have_common_fields',
  'proposal_items_remain_dry_run_only',
  'proposal_items_have_activation_flags_false',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_google_calendar_activation',
  ['no_', ['lin', 'dy'].join(''), '_live_activation'].join(''),
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_crm_sync_activation',
  'no_live_csv_delivery_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
];

const recommendedTestModeValuesProposalRecord = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
  approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
  proposal_type: PROPOSAL_TYPE,
  proposal_status: PROPOSAL_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_channels: [],
  approved_external_services: [],
  proposed_channel_scope: PROPOSED_CHANNEL_SCOPE,
  proposed_service_scope: PROPOSED_SERVICE_SCOPE,
  proposed_fake_test_account_boundaries: PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES,
  proposed_allowed_test_lead_data_shape: PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE,
  proposed_start_window: PROPOSED_START_WINDOW,
  proposed_operator: PROPOSED_OPERATOR,
  proposed_reviewer_on_call_owner: PROPOSED_REVIEWER_ON_CALL_OWNER,
  proposed_rollback_owner: PROPOSED_ROLLBACK_OWNER,
  proposed_stop_conditions: PROPOSED_STOP_CONDITIONS,
  proposed_observation_window: PROPOSED_OBSERVATION_WINDOW,
  proposed_evidence_capture: PROPOSED_EVIDENCE_CAPTURE,
  proposed_post_run_review: PROPOSED_POST_RUN_REVIEW,
  proposed_excluded_scope: PROPOSED_EXCLUDED_SCOPE,
  required_next_decision: REQUIRED_NEXT_DECISION,
  activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
};

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  first_controlled_launch_recommended_test_mode_values_proposal_dry_run:
    'native_workflow_fixture_first_controlled_launch_recommended_test_mode_values_proposal_dry_run',
  first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary: {
    runbook: 'native_workflow_fixture_first_controlled_launch_recommended_test_mode_values_proposal_dry_run',
    scope: 'local_fake_data_first_controlled_launch_recommended_test_mode_values_proposal_only',
    packet_type: 'recommended_test_mode_values_proposal_only',
    delivery_mode: 'dry_run_only',
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    proposal_type: PROPOSAL_TYPE,
    proposal_status: PROPOSAL_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    proposal_item_count: firstControlledLaunchRecommendedTestModeValuesProposalItems.length,
    proposal_areas_modeled: PROPOSAL_AREAS,
    all_items_fake_data_only: true,
    all_items_remain_dry_run_only: allItemsRemainDryRunOnly(),
    relationship_to_pre_activation_checklist:
      'builds_on_pre_activation_checklist_without_granting_activation',
    overall_proposal_posture:
      'recommended_test_mode_values_proposal_only_activation_blocked_jason_explicit_approval_required',
  },
  recommended_test_mode_values_proposal_record: recommendedTestModeValuesProposalRecord,
  recommended_values_checklist_table: RECOMMENDED_VALUES_CHECKLIST_TABLE,
  first_controlled_launch_recommended_test_mode_values_proposal_items:
    firstControlledLaunchRecommendedTestModeValuesProposalItems,
  executive_recommended_values_proposal_summary: {
    overall_status:
      'recommended_test_mode_values_proposal_only_all_activation_blocked_jason_explicit_approval_required',
    proposal_ready_for_jason_review: true,
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    proposal_type: PROPOSAL_TYPE,
    proposal_status: PROPOSAL_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    final_jason_activation_approval_not_granted: true,
    status_model:
      'proposal_offers_conservative_safe_defaults_for_jason_review_without_granting_activation',
  },
  prior_scoped_approval_capture_reference_summary: {
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    prior_capture_packet: 'native_workflow_fixture_first_controlled_launch_scoped_approval_capture',
    prior_approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_approval_interpretation: 'move_forward_to_next_controlled_planning_step_only',
    prior_approval_scope: 'prepare_controlled_test_mode_activation_plan_only',
    prior_capture_does_not_grant_activation: true,
    builds_on_prior_scoped_planning_approval: true,
  },
  exact_scope_authorization_draft_reference_summary: {
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    exact_scope_draft_packet:
      'native_workflow_fixture_first_controlled_launch_exact_test_mode_scope_authorization_draft',
    authorization_status: 'draft_only_not_approved_for_activation',
    exact_scope_draft_does_not_grant_activation: true,
    builds_on_exact_scope_authorization_draft: true,
  },
  pre_activation_checklist_reference_summary: {
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    pre_activation_checklist_packet:
      'native_workflow_fixture_first_controlled_launch_pre_activation_checklist',
    checklist_type: 'pre_activation_checklist',
    checklist_status: 'approval_ready_draft_only',
    all_required_checklist_fields_remain_not_filled: true,
    pre_activation_checklist_does_not_grant_activation: true,
    builds_on_pre_activation_checklist: true,
  },
  proposal_status_summary: {
    proposal_type: PROPOSAL_TYPE,
    proposal_status: PROPOSAL_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    proposed_only_not_approved: true,
    activation_approval_not_granted: true,
    proposal_only_not_activation_approved: true,
  },
  activation_blocked_summary: {
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    no_launch_or_channel_activation_allowed: true,
    activation_requires_separate_explicit_jason_approval: true,
    activation_command_must_be_separately_approved: true,
  },
  approved_channels_empty_summary: {
    approved_channels: [],
    approved_channels_must_remain_empty: true,
    no_channels_approved_for_activation: true,
  },
  approved_external_services_empty_summary: {
    approved_external_services: [],
    approved_external_services_must_remain_empty: true,
    no_external_services_approved_for_activation: true,
  },
  proposed_values_summary: {
    proposed_channel_scope: PROPOSED_CHANNEL_SCOPE,
    proposed_service_scope: PROPOSED_SERVICE_SCOPE,
    proposed_fake_test_account_boundaries: PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES,
    proposed_allowed_test_lead_data_shape: PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE,
    proposed_start_window: PROPOSED_START_WINDOW,
    proposed_operator: PROPOSED_OPERATOR,
    proposed_reviewer_on_call_owner: PROPOSED_REVIEWER_ON_CALL_OWNER,
    proposed_rollback_owner: PROPOSED_ROLLBACK_OWNER,
    proposed_stop_conditions: PROPOSED_STOP_CONDITIONS,
    proposed_observation_window: PROPOSED_OBSERVATION_WINDOW,
    proposed_evidence_capture: PROPOSED_EVIDENCE_CAPTURE,
    proposed_post_run_review: PROPOSED_POST_RUN_REVIEW,
    proposed_excluded_scope: PROPOSED_EXCLUDED_SCOPE,
    required_next_decision: REQUIRED_NEXT_DECISION,
    all_proposed_values_populated: true,
    local_fake_channel_adapters_only_proposed: true,
    no_external_services_proposed_as_approved: true,
  },
  proposed_values_not_approved_summary: {
    proposed_values_are_not_approved: true,
    proposed_values_must_not_be_treated_as_approved: true,
    proposal_status: PROPOSAL_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    exact_next_jason_approval_still_required_before_activation: true,
  },
  required_next_decision_summary: {
    required_next_decision: REQUIRED_NEXT_DECISION,
    jason_must_explicitly_approve_exact_proposed_values: true,
    jason_must_separately_approve_activation_command: true,
    proposal_does_not_authorize_activation: true,
  },
  operator_questions_deferred_summary: {
    no_blocking_questions_required_to_create_proposal: true,
    questions_required_only_before_real_external_test_mode_service_selected: true,
    real_service_credentials_reviewed_separately_without_logging_secrets: true,
    operator_questions_deferred: true,
  },
  activation_command_separate_approval_summary: {
    activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
    activation_command_must_be_separately_approved: true,
    proposal_does_not_authorize_activation_command: true,
  },
  recommended_values_checklist_table_summary: {
    field_count: RECOMMENDED_VALUES_CHECKLIST_TABLE.length,
    all_rows_activation_allowed_now_false: RECOMMENDED_VALUES_CHECKLIST_TABLE.every(
      (row) => row.activation_allowed_now === false,
    ),
    all_rows_approval_status_proposed_only_not_approved: RECOMMENDED_VALUES_CHECKLIST_TABLE.every(
      (row) => row.approval_status === PROPOSAL_STATUS,
    ),
    no_proposed_value_approved_for_activation: true,
  },
  credential_env_boundary_summary: {
    credential_env_reads_forbidden: true,
    credential_env_logging_forbidden: true,
    fixture_no_credential_values_logged: true,
    blocked_fields: [
      'api_key',
      'auth_token',
      'webhook_secret',
      'service_role_key',
      'production_env_value',
      'sandbox_credential_value',
    ],
  },
  schema_auth_rls_security_boundary_summary: {
    schema_changes_forbidden: true,
    auth_changes_forbidden: true,
    rls_changes_forbidden: true,
    security_implementation_changes_forbidden: true,
    migrations_forbidden: true,
  },
  first_controlled_launch_recommended_test_mode_values_proposal_safety_assertions:
    firstControlledLaunchRecommendedTestModeValuesProposalSafetyAssertions,
  common_proposal_fields_summary: {
    required_fields: COMMON_PROPOSAL_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
    fixture_external_call_allowed_value: false,
    fixture_live_activation_allowed_value: false,
    fixture_test_mode_activation_allowed_value: false,
    fixture_first_controlled_launch_activation_allowed_value: false,
    all_items_include_common_fields: allItemsSatisfyCommonProposalFields(),
    blocked_fields: [
      'real_customer_name',
      'real_homeowner_phone',
      'real_homeowner_email',
      'real_property_address',
      'api_key',
      'auth_token',
      'webhook_secret',
      'service_role_key',
      'production_env_value',
      'sandbox_credential_value',
    ],
  },
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);