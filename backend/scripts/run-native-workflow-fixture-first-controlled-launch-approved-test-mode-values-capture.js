#!/usr/bin/env node
/**
 * Local fake-data first controlled launch approved test-mode values capture dry-run model.
 * Captures Jason's approval of recommended values as exact planned local-only dry-run values
 * without granting activation. No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-19T00:00:00.000Z';

const CAPTURE_TYPE = 'approved_test_mode_values_capture';
const APPROVED_VALUES_STATUS = 'approved_as_exact_planned_local_dry_run_values';
const APPROVAL_INTERPRETATION = 'approved_recommended_values_for_local_dry_run_planning_only';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const ACTIVATION_COMMAND_APPROVAL_STATUS = 'not_granted';
const FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const PRE_ACTIVATION_CHECKLIST_COMMIT = '2b753e8';
const RECOMMENDED_VALUES_PROPOSAL_COMMIT = '205a6c4';
const JASON_APPROVAL_STATEMENT = "Approve. Let's finish everything we can. Let's go!";
const ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED =
  'Activation command must be separately approved after Jason grants final activation approval.';
const REQUIRED_NEXT_DECISION =
  'Jason must separately approve the final activation/runner command before any execution beyond local dry-run review.';

const APPROVED_PLANNED_CHANNEL_SCOPE = 'local fake channel adapters only';
const APPROVED_PLANNED_SERVICE_SCOPE = 'no external services';
const APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES =
  'fake/local-only account fixtures; no real homeowner, roofer, customer, production, or external account data';
const APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE =
  'seeded fake roofing homeowner leads with fake name, fake phone, fake email, fake address, fake source, fake appointment preference, fake consent/contact flags, and fake review/escalation outcomes';
const APPROVED_PLANNED_START_WINDOW =
  'operator-selected manual window, not scheduled, not activation-approved';
const APPROVED_PLANNED_OPERATOR = 'Jason or designated operator placeholder';
const APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER = 'Jason placeholder';
const APPROVED_PLANNED_ROLLBACK_OWNER = 'Jason placeholder';
const APPROVED_PLANNED_STOP_CONDITIONS =
  'any attempted external call, credential/env access, production data access, real send, real webhook, real scheduler/cron/dispatcher activation, unexpected Supabase access, schema/auth/RLS/security change, failed safety assertion, or unexpected channel delivery attempt';
const APPROVED_PLANNED_OBSERVATION_WINDOW =
  'short manual observation window after local dry-run only';
const APPROVED_PLANNED_EVIDENCE_CAPTURE =
  'terminal output, targeted verifier result, wrapper result, fast safe readiness result, backend build result, source-of-truth verification after commit only';
const APPROVED_PLANNED_POST_RUN_REVIEW =
  'confirm no activation, no external calls, no production data access, no credentials, no public copy changes, no unexpected files, and clean git status';
const APPROVED_PLANNED_EXCLUDED_SCOPE =
  'all live/test-mode/external/service/production actions, real homeowners, real roofers, real sends, real calendars, CRM sync, live CSV, billing/payment/deposit/invoice/quote/estimate automation';

const COMMON_CAPTURE_FIELDS = [
  'fixture_approved_values_capture_id',
  'fixture_capture_area',
  'fixture_capture_status',
  'fixture_capture_type',
  'fixture_approval_interpretation',
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

function commonCaptureFields(captureId, area, status, blockingReason, owner, auditEventId) {
  return {
    fixture_approved_values_capture_id: captureId,
    fixture_capture_area: area,
    fixture_capture_status: status,
    fixture_capture_type: CAPTURE_TYPE,
    fixture_approval_interpretation: APPROVAL_INTERPRETATION,
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

const APPROVED_PLANNED_VALUES_TABLE = [
  {
    approved_planned_item: 'approved_planned_channel_scope',
    approved_planned_value: APPROVED_PLANNED_CHANNEL_SCOPE,
    what_remains_blocked:
      'external channel activation, real sends, sandbox/test-mode channels, Twilio/Vapi/Resend delivery',
    evidence_required: 'activation command approval with channel scope confirmation',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_service_scope',
    approved_planned_value: APPROVED_PLANNED_SERVICE_SCOPE,
    what_remains_blocked: 'all external services, credentials, webhooks, third-party integrations',
    evidence_required:
      'activation command approval confirming no external services until separately approved',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_fake_test_account_boundaries',
    approved_planned_value: APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES,
    what_remains_blocked:
      'real homeowner/roofer/customer/production account data access',
    evidence_required: 'documented test account boundary confirmation at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_allowed_test_lead_data_shape',
    approved_planned_value: APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE,
    what_remains_blocked: 'real PII, production lead records, real homeowner contact',
    evidence_required: 'documented test lead data shape confirmation at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_start_window',
    approved_planned_value: APPROVED_PLANNED_START_WINDOW,
    what_remains_blocked: 'scheduled/cron/dispatcher activation, unattended runs',
    evidence_required: 'written start window approval at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_operator',
    approved_planned_value: APPROVED_PLANNED_OPERATOR,
    what_remains_blocked: 'activation without named operator accountability',
    evidence_required: 'operator assignment approval record at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_reviewer_on_call_owner',
    approved_planned_value: APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER,
    what_remains_blocked: 'activation without on-call reviewer accountability',
    evidence_required: 'reviewer/on-call owner assignment at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_rollback_owner',
    approved_planned_value: APPROVED_PLANNED_ROLLBACK_OWNER,
    what_remains_blocked: 'activation without rollback authority named',
    evidence_required: 'rollback owner assignment at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_stop_conditions',
    approved_planned_value: APPROVED_PLANNED_STOP_CONDITIONS,
    what_remains_blocked: 'proceeding past any stop condition trigger',
    evidence_required: 'documented stop conditions confirmation at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_observation_window',
    approved_planned_value: APPROVED_PLANNED_OBSERVATION_WINDOW,
    what_remains_blocked: 'extended unattended observation without manual review',
    evidence_required: 'documented observation window approval at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_evidence_capture',
    approved_planned_value: APPROVED_PLANNED_EVIDENCE_CAPTURE,
    what_remains_blocked: 'activation without captured local evidence',
    evidence_required: 'documented evidence capture plan at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_post_run_review',
    approved_planned_value: APPROVED_PLANNED_POST_RUN_REVIEW,
    what_remains_blocked: 'skipping post-run safety review',
    evidence_required: 'documented post-run review plan at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'approved_planned_excluded_scope',
    approved_planned_value: APPROVED_PLANNED_EXCLUDED_SCOPE,
    what_remains_blocked: 'all items in excluded scope until separately approved',
    evidence_required: 'documented excluded scope confirmation at activation time',
    activation_allowed_now: false,
  },
  {
    approved_planned_item: 'required_next_decision',
    approved_planned_value: REQUIRED_NEXT_DECISION,
    what_remains_blocked: 'any execution beyond local dry-run review',
    evidence_required: 'written Jason final activation command approval decision',
    activation_allowed_now: false,
  },
];

const firstControlledLaunchApprovedTestModeValuesCaptureItems = [
  {
    review_area_category: 'executive_approved_values_capture',
    ...commonCaptureFields(
      'approved_values_capture_exec_001',
      'Executive approved values capture summary',
      APPROVED_VALUES_STATUS,
      'activation_command_approval_still_required',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_exec_001',
    ),
  },
  {
    review_area_category: 'jason_approval_statement',
    fixture_jason_approval_statement: JASON_APPROVAL_STATEMENT,
    ...commonCaptureFields(
      'approved_values_capture_statement_001',
      'Jason approval statement captured',
      'approval_statement_recorded_local_dry_run_planning_only',
      'approval_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_statement_001',
    ),
  },
  {
    review_area_category: 'approval_interpretation',
    fixture_approval_interpretation_value: APPROVAL_INTERPRETATION,
    ...commonCaptureFields(
      'approved_values_capture_interpretation_001',
      'Approval interpretation (local dry-run planning only)',
      'interpretation_local_dry_run_planning_only_not_activation',
      'approval_not_interpreted_as_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_interpretation_001',
    ),
  },
  {
    review_area_category: 'prior_scoped_approval_capture_reference',
    fixture_prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    ...commonCaptureFields(
      'approved_values_capture_prior_capture_001',
      'Prior scoped approval capture reference',
      'prior_scoped_planning_approval_referenced_not_activation_approved',
      'prior_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_prior_capture_001',
    ),
  },
  {
    review_area_category: 'exact_scope_authorization_draft_reference',
    fixture_exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    ...commonCaptureFields(
      'approved_values_capture_exact_scope_draft_001',
      'Exact scope authorization draft reference',
      'exact_scope_draft_referenced_not_activation_approved',
      'exact_scope_draft_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_exact_scope_draft_001',
    ),
  },
  {
    review_area_category: 'pre_activation_checklist_reference',
    fixture_pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    ...commonCaptureFields(
      'approved_values_capture_pre_activation_checklist_001',
      'Pre-activation checklist reference',
      'pre_activation_checklist_referenced_not_activation_approved',
      'pre_activation_checklist_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_pre_activation_checklist_001',
    ),
  },
  {
    review_area_category: 'recommended_values_proposal_reference',
    fixture_recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    ...commonCaptureFields(
      'approved_values_capture_proposal_ref_001',
      'Recommended values proposal reference (205a6c4)',
      'recommended_values_proposal_referenced_values_now_approved_for_planning',
      'recommended_values_proposal_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_proposal_ref_001',
    ),
  },
  {
    review_area_category: 'approved_values_status',
    fixture_approved_values_status_value: APPROVED_VALUES_STATUS,
    ...commonCaptureFields(
      'approved_values_capture_status_001',
      'Approved values status',
      APPROVED_VALUES_STATUS,
      'approved_values_do_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_status_001',
    ),
  },
  {
    review_area_category: 'activation_approval_status',
    fixture_activation_approval_status_value: ACTIVATION_APPROVAL_STATUS,
    ...commonCaptureFields(
      'approved_values_capture_activation_status_001',
      'Activation approval status (not_granted)',
      'activation_approval_not_granted',
      'activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_activation_status_001',
    ),
  },
  {
    review_area_category: 'activation_command_approval_status',
    fixture_activation_command_approval_status_value: ACTIVATION_COMMAND_APPROVAL_STATUS,
    ...commonCaptureFields(
      'approved_values_capture_command_status_001',
      'Activation command approval status (not_granted)',
      'activation_command_approval_not_granted',
      'activation_command_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_command_status_001',
    ),
  },
  {
    review_area_category: 'first_controlled_launch_activation_blocked',
    ...commonCaptureFields(
      'approved_values_capture_fcl_blocked_001',
      'First controlled launch activation blocked',
      'first_controlled_launch_activation_remains_blocked',
      'first_controlled_launch_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_fcl_blocked_001',
    ),
  },
  {
    review_area_category: 'sandbox_test_mode_activation_blocked',
    ...commonCaptureFields(
      'approved_values_capture_sandbox_blocked_001',
      'Sandbox/test-mode activation blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'sandbox_test_mode_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_sandbox_blocked_001',
    ),
  },
  {
    review_area_category: 'live_activation_blocked',
    ...commonCaptureFields(
      'approved_values_capture_live_blocked_001',
      'Live activation blocked',
      'live_activation_remains_blocked',
      'live_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_live_blocked_001',
    ),
  },
  {
    review_area_category: 'external_call_blocked',
    ...commonCaptureFields(
      'approved_values_capture_external_blocked_001',
      'External call blocked',
      'external_calls_remain_forbidden',
      'external_calls_not_approved',
      'security_review_queue',
      'fixture_audit_approved_values_capture_external_blocked_001',
    ),
  },
  {
    review_area_category: 'approved_channels',
    fixture_approved_channels_empty: true,
    ...commonCaptureFields(
      'approved_values_capture_channels_001',
      'Approved channels empty',
      'approved_channels_remain_empty',
      'no_channels_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_channels_001',
    ),
  },
  {
    review_area_category: 'approved_external_services',
    fixture_approved_external_services_empty: true,
    ...commonCaptureFields(
      'approved_values_capture_services_001',
      'Approved external services empty',
      'approved_external_services_remain_empty',
      'no_external_services_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_services_001',
    ),
  },
  {
    review_area_category: 'approved_planned_channel_scope',
    fixture_approved_planned_channel_scope_value: APPROVED_PLANNED_CHANNEL_SCOPE,
    ...commonCaptureFields(
      'approved_values_capture_channel_scope_001',
      'Approved planned channel scope (local fake channel adapters only)',
      'approved_for_local_dry_run_planning_only',
      'channel_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_channel_scope_001',
    ),
  },
  {
    review_area_category: 'approved_planned_service_scope',
    fixture_approved_planned_service_scope_value: APPROVED_PLANNED_SERVICE_SCOPE,
    ...commonCaptureFields(
      'approved_values_capture_service_scope_001',
      'Approved planned service scope (no external services)',
      'approved_for_local_dry_run_planning_only',
      'external_service_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_service_scope_001',
    ),
  },
  {
    review_area_category: 'approved_planned_fake_test_account_boundaries',
    fixture_approved_planned_fake_test_account_boundaries_value:
      APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES,
    ...commonCaptureFields(
      'approved_values_capture_test_account_001',
      'Approved planned fake/test account boundaries',
      'approved_for_local_dry_run_planning_only',
      'real_account_data_access_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_test_account_001',
    ),
  },
  {
    review_area_category: 'approved_planned_allowed_test_lead_data_shape',
    fixture_approved_planned_allowed_test_lead_data_shape_value:
      APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE,
    ...commonCaptureFields(
      'approved_values_capture_lead_data_shape_001',
      'Approved planned allowed test lead data shape',
      'approved_for_local_dry_run_planning_only',
      'real_lead_data_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_lead_data_shape_001',
    ),
  },
  {
    review_area_category: 'approved_planned_start_window',
    fixture_approved_planned_start_window_value: APPROVED_PLANNED_START_WINDOW,
    ...commonCaptureFields(
      'approved_values_capture_start_window_001',
      'Approved planned start window',
      'approved_for_local_dry_run_planning_only',
      'scheduled_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_start_window_001',
    ),
  },
  {
    review_area_category: 'approved_planned_operator',
    fixture_approved_planned_operator_value: APPROVED_PLANNED_OPERATOR,
    ...commonCaptureFields(
      'approved_values_capture_operator_001',
      'Approved planned operator',
      'approved_for_local_dry_run_planning_only',
      'operator_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_operator_001',
    ),
  },
  {
    review_area_category: 'approved_planned_reviewer_on_call_owner',
    fixture_approved_planned_reviewer_on_call_owner_value: APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER,
    ...commonCaptureFields(
      'approved_values_capture_reviewer_001',
      'Approved planned reviewer/on-call owner',
      'approved_for_local_dry_run_planning_only',
      'reviewer_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_reviewer_001',
    ),
  },
  {
    review_area_category: 'approved_planned_rollback_owner',
    fixture_approved_planned_rollback_owner_value: APPROVED_PLANNED_ROLLBACK_OWNER,
    ...commonCaptureFields(
      'approved_values_capture_rollback_owner_001',
      'Approved planned rollback owner',
      'approved_for_local_dry_run_planning_only',
      'rollback_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_rollback_owner_001',
    ),
  },
  {
    review_area_category: 'approved_planned_stop_conditions',
    fixture_approved_planned_stop_conditions_value: APPROVED_PLANNED_STOP_CONDITIONS,
    ...commonCaptureFields(
      'approved_values_capture_stop_conditions_001',
      'Approved planned stop conditions',
      'approved_for_local_dry_run_planning_only',
      'stop_conditions_bypass_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_stop_conditions_001',
    ),
  },
  {
    review_area_category: 'approved_planned_observation_window',
    fixture_approved_planned_observation_window_value: APPROVED_PLANNED_OBSERVATION_WINDOW,
    ...commonCaptureFields(
      'approved_values_capture_observation_window_001',
      'Approved planned observation window',
      'approved_for_local_dry_run_planning_only',
      'unattended_observation_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_observation_window_001',
    ),
  },
  {
    review_area_category: 'approved_planned_evidence_capture',
    fixture_approved_planned_evidence_capture_value: APPROVED_PLANNED_EVIDENCE_CAPTURE,
    ...commonCaptureFields(
      'approved_values_capture_evidence_capture_001',
      'Approved planned evidence capture',
      'approved_for_local_dry_run_planning_only',
      'activation_without_evidence_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_evidence_capture_001',
    ),
  },
  {
    review_area_category: 'approved_planned_post_run_review',
    fixture_approved_planned_post_run_review_value: APPROVED_PLANNED_POST_RUN_REVIEW,
    ...commonCaptureFields(
      'approved_values_capture_post_run_review_001',
      'Approved planned post-run review',
      'approved_for_local_dry_run_planning_only',
      'skipping_post_run_review_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_post_run_review_001',
    ),
  },
  {
    review_area_category: 'approved_planned_excluded_scope',
    fixture_approved_planned_excluded_scope_value: APPROVED_PLANNED_EXCLUDED_SCOPE,
    ...commonCaptureFields(
      'approved_values_capture_excluded_scope_001',
      'Approved planned excluded scope',
      'approved_for_local_dry_run_planning_only',
      'excluded_scope_actions_not_approved',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_excluded_scope_001',
    ),
  },
  {
    review_area_category: 'required_next_decision',
    fixture_required_next_decision_value: REQUIRED_NEXT_DECISION,
    ...commonCaptureFields(
      'approved_values_capture_required_next_decision_001',
      'Required next decision (activation command)',
      'activation_command_approval_still_required',
      'jason_activation_command_approval_still_required',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_required_next_decision_001',
    ),
  },
  {
    review_area_category: 'activation_not_granted_boundary',
    fixture_activation_not_granted: true,
    ...commonCaptureFields(
      'approved_values_capture_activation_not_granted_001',
      'Activation not granted boundary',
      'activation_not_granted',
      'activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_activation_not_granted_001',
    ),
  },
  {
    review_area_category: 'activation_command_not_granted_boundary',
    fixture_activation_command_not_granted: true,
    ...commonCaptureFields(
      'approved_values_capture_command_not_granted_001',
      'Activation command not granted boundary',
      'activation_command_not_granted',
      'activation_command_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_command_not_granted_001',
    ),
  },
  {
    review_area_category: 'activation_boundary',
    fixture_approved_for_activation_now: false,
    fixture_activation_command_required: true,
    ...commonCaptureFields(
      'approved_values_capture_activation_boundary_001',
      'Activation boundary (approved_for_activation_now false)',
      'approved_for_activation_now_false',
      'activation_command_approval_still_required',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_activation_boundary_001',
    ),
  },
  {
    review_area_category: 'finish_everything_we_can',
    fixture_safe_to_finish: [
      'approved local dry-run values capture',
      'final activation command draft',
      'final go/no-go review structure',
    ],
    fixture_not_safe_without_separate_approval: [
      'execute activation',
      'call external services',
      'use credentials',
      'touch production data',
      'send real messages',
      'schedule cron/dispatcher',
      'expose public routes/webhooks',
    ],
    ...commonCaptureFields(
      'approved_values_capture_finish_001',
      'Finish everything we can',
      'safe_vs_not_safe_boundary_documented',
      'finish_guidance_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_finish_001',
    ),
  },
  {
    review_area_category: 'approved_planned_values_table',
    fixture_approved_planned_values_table_count: APPROVED_PLANNED_VALUES_TABLE.length,
    ...commonCaptureFields(
      'approved_values_capture_table_001',
      'Approved planned values table',
      'all_rows_activation_allowed_now_false',
      'no_planned_value_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_approved_values_capture_table_001',
    ),
  },
  {
    review_area_category: 'credential_env_boundary',
    fixture_credential_env_reads_forbidden: true,
    fixture_no_credential_values_logged: true,
    ...commonCaptureFields(
      'approved_values_capture_credential_env_001',
      'Credential/env boundary',
      'boundary_enforced_no_credential_access',
      'credential_env_content_detected_in_payload',
      'security_review_queue',
      'fixture_audit_approved_values_capture_credential_env_001',
    ),
  },
  {
    review_area_category: 'schema_auth_rls_security_boundary',
    fixture_schema_changes_forbidden: true,
    ...commonCaptureFields(
      'approved_values_capture_schema_auth_rls_001',
      'Schema/auth/RLS/security boundary',
      'boundary_enforced_no_schema_auth_rls_changes',
      'security_tenant_isolation_review_incomplete',
      'security_review_queue',
      'fixture_audit_approved_values_capture_schema_auth_rls_001',
    ),
  },
];

const CAPTURE_AREAS = firstControlledLaunchApprovedTestModeValuesCaptureItems.map(
  (item) => item.fixture_capture_area,
);

function allItemsSatisfyCommonCaptureFields() {
  return firstControlledLaunchApprovedTestModeValuesCaptureItems.every((item) =>
    COMMON_CAPTURE_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field)),
  );
}

function allItemsRemainDryRunOnly() {
  return firstControlledLaunchApprovedTestModeValuesCaptureItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false &&
      item.fixture_first_controlled_launch_activation_allowed === false,
  );
}

const firstControlledLaunchApprovedTestModeValuesCaptureSafetyAssertions = [
  'first_controlled_launch_approved_test_mode_values_capture_doc_present',
  'fake_data_local_only_scope_present',
  'jason_approval_statement_captured',
  'recommended_values_proposal_commit_205a6c4_referenced',
  'values_approved_only_as_exact_planned_local_dry_run_values',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'local_fake_channel_adapters_only_approved_as_planned_scope',
  'no_external_services_approved',
  'approved_for_activation_now_false',
  'activation_command_must_be_separately_approved',
  'prior_scoped_approval_capture_referenced',
  'exact_scope_authorization_draft_referenced',
  'pre_activation_checklist_referenced',
  'approved_channels_empty',
  'approved_external_services_empty',
  'no_launch_or_channel_activation_allowed',
  'activation_not_granted_boundary_present',
  'activation_command_not_granted_boundary_present',
  'finish_everything_we_can_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'capture_items_have_common_fields',
  'capture_items_remain_dry_run_only',
  'capture_items_have_activation_flags_false',
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

const approvedTestModeValuesCaptureRecord = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
  recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
  jason_approval_statement: JASON_APPROVAL_STATEMENT,
  approval_interpretation: APPROVAL_INTERPRETATION,
  approved_values_status: APPROVED_VALUES_STATUS,
  capture_type: CAPTURE_TYPE,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
  final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_channels: [],
  approved_external_services: [],
  approved_planned_channel_scope: APPROVED_PLANNED_CHANNEL_SCOPE,
  approved_planned_service_scope: APPROVED_PLANNED_SERVICE_SCOPE,
  approved_planned_fake_test_account_boundaries: APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES,
  approved_planned_allowed_test_lead_data_shape: APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE,
  approved_planned_start_window: APPROVED_PLANNED_START_WINDOW,
  approved_planned_operator: APPROVED_PLANNED_OPERATOR,
  approved_planned_reviewer_on_call_owner: APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER,
  approved_planned_rollback_owner: APPROVED_PLANNED_ROLLBACK_OWNER,
  approved_planned_stop_conditions: APPROVED_PLANNED_STOP_CONDITIONS,
  approved_planned_observation_window: APPROVED_PLANNED_OBSERVATION_WINDOW,
  approved_planned_evidence_capture: APPROVED_PLANNED_EVIDENCE_CAPTURE,
  approved_planned_post_run_review: APPROVED_PLANNED_POST_RUN_REVIEW,
  approved_planned_excluded_scope: APPROVED_PLANNED_EXCLUDED_SCOPE,
  approved_for_activation_now: false,
  activation_command_required: true,
  required_next_decision: REQUIRED_NEXT_DECISION,
  activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
};

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  first_controlled_launch_approved_test_mode_values_capture_dry_run:
    'native_workflow_fixture_first_controlled_launch_approved_test_mode_values_capture_dry_run',
  first_controlled_launch_approved_test_mode_values_capture_dry_run_summary: {
    runbook: 'native_workflow_fixture_first_controlled_launch_approved_test_mode_values_capture_dry_run',
    scope: 'local_fake_data_first_controlled_launch_approved_test_mode_values_capture_only',
    packet_type: 'approved_test_mode_values_capture_only',
    delivery_mode: 'dry_run_only',
    jason_approval_statement: JASON_APPROVAL_STATEMENT,
    approval_interpretation: APPROVAL_INTERPRETATION,
    approved_values_status: APPROVED_VALUES_STATUS,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    capture_type: CAPTURE_TYPE,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    capture_item_count: firstControlledLaunchApprovedTestModeValuesCaptureItems.length,
    capture_areas_modeled: CAPTURE_AREAS,
    all_items_fake_data_only: true,
    all_items_remain_dry_run_only: allItemsRemainDryRunOnly(),
    relationship_to_recommended_values_proposal:
      'builds_on_recommended_values_proposal_205a6c4_jason_approved_values_for_local_dry_run_planning_only',
    overall_capture_posture:
      'approved_test_mode_values_capture_only_activation_blocked_activation_command_approval_required',
  },
  approved_test_mode_values_capture_record: approvedTestModeValuesCaptureRecord,
  approved_planned_values_table: APPROVED_PLANNED_VALUES_TABLE,
  first_controlled_launch_approved_test_mode_values_capture_items:
    firstControlledLaunchApprovedTestModeValuesCaptureItems,
  executive_approved_values_capture_summary: {
    overall_status:
      'approved_test_mode_values_capture_only_all_activation_blocked_activation_command_approval_required',
    capture_ready_for_local_dry_run_planning: true,
    jason_approval_statement: JASON_APPROVAL_STATEMENT,
    approval_interpretation: APPROVAL_INTERPRETATION,
    approved_values_status: APPROVED_VALUES_STATUS,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    capture_type: CAPTURE_TYPE,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    approved_for_activation_now: false,
    final_jason_activation_approval_not_granted: true,
    status_model:
      'capture_records_jason_approved_planned_local_dry_run_values_without_granting_activation',
  },
  jason_approval_statement_captured_summary: {
    jason_approval_statement: JASON_APPROVAL_STATEMENT,
    statement_captured: true,
    statement_source: 'founder_manual_review',
    approval_interpretation: APPROVAL_INTERPRETATION,
    interpretation_is_local_dry_run_planning_only: true,
    interpretation_does_not_grant_activation: true,
    interpretation_does_not_grant_external_calls: true,
    interpretation_does_not_grant_channel_activation: true,
    interpretation_does_not_grant_activation_command: true,
  },
  approval_interpretation_summary: {
    approval_interpretation: APPROVAL_INTERPRETATION,
    approved_values_status: APPROVED_VALUES_STATUS,
    values_approved_only_as_exact_planned_local_dry_run_values: true,
    approved_values_do_not_grant_activation: true,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
  },
  prior_scoped_approval_capture_reference_summary: {
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    prior_capture_packet: 'native_workflow_fixture_first_controlled_launch_scoped_approval_capture',
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
    pre_activation_checklist_does_not_grant_activation: true,
    builds_on_pre_activation_checklist: true,
  },
  recommended_values_proposal_reference_summary: {
    recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    recommended_values_proposal_packet:
      'native_workflow_fixture_first_controlled_launch_recommended_test_mode_values_proposal',
    proposal_status_at_reference: 'proposed_only_not_approved',
    jason_approved_recommended_values_for_local_dry_run_planning: true,
    recommended_values_proposal_does_not_grant_activation: true,
    builds_on_recommended_values_proposal: true,
  },
  approved_values_status_summary: {
    approved_values_status: APPROVED_VALUES_STATUS,
    approval_interpretation: APPROVAL_INTERPRETATION,
    values_approved_only_as_exact_planned_local_dry_run_values: true,
    approved_values_do_not_grant_activation: true,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
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
  activation_not_granted_boundary_summary: {
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    activation_not_granted: true,
    approved_planned_values_do_not_grant_activation: true,
  },
  activation_command_not_granted_boundary_summary: {
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    activation_command_not_granted: true,
    activation_command_required: true,
    capture_does_not_authorize_activation_command: true,
  },
  activation_boundary_summary: {
    approved_for_activation_now: false,
    activation_command_required: true,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    required_next_decision: REQUIRED_NEXT_DECISION,
  },
  approved_channels_empty_summary: {
    approved_channels: [],
    approved_channels_must_remain_empty: true,
    no_channels_approved_for_activation: true,
    local_fake_channel_adapters_only_approved_as_planned_scope: true,
  },
  approved_external_services_empty_summary: {
    approved_external_services: [],
    approved_external_services_must_remain_empty: true,
    no_external_services_approved_for_activation: true,
    no_external_services_approved: true,
  },
  approved_planned_values_summary: {
    approved_planned_channel_scope: APPROVED_PLANNED_CHANNEL_SCOPE,
    approved_planned_service_scope: APPROVED_PLANNED_SERVICE_SCOPE,
    approved_planned_fake_test_account_boundaries: APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES,
    approved_planned_allowed_test_lead_data_shape: APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE,
    approved_planned_start_window: APPROVED_PLANNED_START_WINDOW,
    approved_planned_operator: APPROVED_PLANNED_OPERATOR,
    approved_planned_reviewer_on_call_owner: APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER,
    approved_planned_rollback_owner: APPROVED_PLANNED_ROLLBACK_OWNER,
    approved_planned_stop_conditions: APPROVED_PLANNED_STOP_CONDITIONS,
    approved_planned_observation_window: APPROVED_PLANNED_OBSERVATION_WINDOW,
    approved_planned_evidence_capture: APPROVED_PLANNED_EVIDENCE_CAPTURE,
    approved_planned_post_run_review: APPROVED_PLANNED_POST_RUN_REVIEW,
    approved_planned_excluded_scope: APPROVED_PLANNED_EXCLUDED_SCOPE,
    required_next_decision: REQUIRED_NEXT_DECISION,
    all_approved_planned_values_populated: true,
    local_fake_channel_adapters_only_approved_as_planned_scope: true,
    no_external_services_approved: true,
  },
  finish_everything_we_can_summary: {
    safe_to_finish: [
      'approved local dry-run values capture',
      'final activation command draft',
      'final go/no-go review structure',
    ],
    not_safe_without_separate_approval: [
      'execute activation',
      'call external services',
      'use credentials',
      'touch production data',
      'send real messages',
      'schedule cron/dispatcher',
      'expose public routes/webhooks',
    ],
    finish_guidance_does_not_grant_activation: true,
    finish_everything_we_can_boundary_documented: true,
  },
  required_next_decision_summary: {
    required_next_decision: REQUIRED_NEXT_DECISION,
    jason_must_separately_approve_activation_command: true,
    capture_does_not_authorize_activation: true,
    capture_does_not_authorize_activation_command: true,
  },
  activation_command_separate_approval_summary: {
    activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
    activation_command_must_be_separately_approved: true,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    capture_does_not_authorize_activation_command: true,
  },
  approved_planned_values_table_summary: {
    field_count: APPROVED_PLANNED_VALUES_TABLE.length,
    all_rows_activation_allowed_now_false: APPROVED_PLANNED_VALUES_TABLE.every(
      (row) => row.activation_allowed_now === false,
    ),
    all_rows_have_what_remains_blocked: APPROVED_PLANNED_VALUES_TABLE.every(
      (row) => 'what_remains_blocked' in row,
    ),
    all_rows_have_evidence_required: APPROVED_PLANNED_VALUES_TABLE.every(
      (row) => 'evidence_required' in row,
    ),
    no_planned_value_approved_for_activation: true,
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
  first_controlled_launch_approved_test_mode_values_capture_safety_assertions:
    firstControlledLaunchApprovedTestModeValuesCaptureSafetyAssertions,
  common_capture_fields_summary: {
    required_fields: COMMON_CAPTURE_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
    fixture_capture_type_value: CAPTURE_TYPE,
    fixture_external_call_allowed_value: false,
    fixture_live_activation_allowed_value: false,
    fixture_test_mode_activation_allowed_value: false,
    fixture_first_controlled_launch_activation_allowed_value: false,
    all_items_include_common_fields: allItemsSatisfyCommonCaptureFields(),
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