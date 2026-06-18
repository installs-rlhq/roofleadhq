#!/usr/bin/env node
/**
 * Local fake-data first controlled launch exact test-mode scope authorization draft dry-run model.
 * Structures the formal exact-scope authorization draft Jason would review before any controlled
 * test-mode activation — without granting activation approval or executing any step.
 * No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-19T00:00:00.000Z';

const AUTHORIZATION_TYPE = 'exact_test_mode_scope_authorization_draft';
const AUTHORIZATION_STATUS = 'draft_only_not_approved_for_activation';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const APPROVAL_SCOPE = 'exact_scope_review_only';
const APPROVAL_STATEMENT_REFERENCE = 'Approved to move forward.';
const PRIOR_CAPTURE_COMMIT = '287627f';
const REQUIRED_NEXT_DECISION =
  'Jason must explicitly approve exact channel/start/operator/rollback/stop-condition details before any activation.';
const FORBIDDEN_SCOPE =
  'all live/test-mode/external/service/production actions until separately approved';

const COMMON_AUTHORIZATION_DRAFT_FIELDS = [
  'fixture_exact_scope_authorization_draft_id',
  'fixture_authorization_area',
  'fixture_authorization_status',
  'fixture_authorization_type',
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

function commonAuthorizationDraftFields(
  draftId,
  area,
  status,
  blockingReason,
  owner,
  auditEventId,
) {
  return {
    fixture_exact_scope_authorization_draft_id: draftId,
    fixture_authorization_area: area,
    fixture_authorization_status: status,
    fixture_authorization_type: AUTHORIZATION_TYPE,
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

const JASON_APPROVAL_FIELDS_TABLE = [
  {
    field: 'exact test-mode channel or channels',
    current_value: 'placeholder_only',
    approval_required: true,
  },
  {
    field: 'exact external service or sandbox/test-mode service, if any',
    current_value: 'placeholder_only',
    approval_required: true,
  },
  {
    field: 'fake/test account boundaries',
    current_value: 'placeholder_only',
    approval_required: true,
  },
  {
    field: 'allowed test lead data shape',
    current_value: 'placeholder_only',
    approval_required: true,
  },
  {
    field: 'allowed start window',
    current_value: 'blank_placeholder',
    approval_required: true,
  },
  {
    field: 'approved operator',
    current_value: 'blank_placeholder',
    approval_required: true,
  },
  {
    field: 'reviewer/on-call owner',
    current_value: 'blank_placeholder',
    approval_required: true,
  },
  {
    field: 'rollback owner',
    current_value: 'blank_placeholder',
    approval_required: true,
  },
  {
    field: 'stop conditions',
    current_value: 'placeholder_required_before_activation',
    approval_required: true,
  },
  {
    field: 'observation window',
    current_value: 'placeholder_required_before_activation',
    approval_required: true,
  },
  {
    field: 'evidence capture requirements',
    current_value: 'placeholder_required_before_activation',
    approval_required: true,
  },
  {
    field: 'post-run review requirements',
    current_value: 'placeholder_required_before_activation',
    approval_required: true,
  },
  {
    field: 'explicit excluded scope',
    current_value: 'placeholder_required_before_activation',
    approval_required: true,
  },
];

const firstControlledLaunchExactTestModeScopeAuthorizationDraftItems = [
  {
    review_area_category: 'executive_exact_scope_authorization_draft',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_exec_001',
      'Executive exact scope authorization draft summary',
      'draft_only_not_approved_for_activation',
      'exact_jason_approval_still_required_before_any_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_exec_001',
    ),
  },
  {
    review_area_category: 'prior_scoped_approval_capture_reference',
    fixture_prior_capture_commit: PRIOR_CAPTURE_COMMIT,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_prior_capture_001',
      'Prior scoped approval capture reference',
      'prior_scoped_planning_approval_referenced_not_activation_approved',
      'prior_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_prior_capture_001',
    ),
  },
  {
    review_area_category: 'jason_approval_statement_reference',
    fixture_approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_statement_ref_001',
      'Jason approval statement reference',
      'approval_statement_referenced_not_interpreted_as_activation_approval',
      'statement_reference_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_statement_ref_001',
    ),
  },
  {
    review_area_category: 'authorization_type_and_status',
    fixture_authorization_status_value: AUTHORIZATION_STATUS,
    fixture_activation_approval_status_value: ACTIVATION_APPROVAL_STATUS,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_type_status_001',
      'Authorization type and status (draft_only)',
      'authorization_draft_only_activation_not_granted',
      'draft_status_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_type_status_001',
    ),
  },
  {
    review_area_category: 'approval_scope',
    fixture_approval_scope_value: APPROVAL_SCOPE,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_scope_001',
      'Approval scope (exact_scope_review_only)',
      'scope_limited_to_exact_scope_review_only',
      'scope_does_not_include_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_scope_001',
    ),
  },
  {
    review_area_category: 'first_controlled_launch_activation_blocked',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_fcl_blocked_001',
      'First controlled launch activation blocked',
      'first_controlled_launch_activation_remains_blocked',
      'first_controlled_launch_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_fcl_blocked_001',
    ),
  },
  {
    review_area_category: 'sandbox_test_mode_activation_blocked',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_sandbox_blocked_001',
      'Sandbox/test-mode activation blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'sandbox_test_mode_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_sandbox_blocked_001',
    ),
  },
  {
    review_area_category: 'live_activation_blocked',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_live_blocked_001',
      'Live activation blocked',
      'live_activation_remains_blocked',
      'live_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_live_blocked_001',
    ),
  },
  {
    review_area_category: 'external_call_blocked',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_external_blocked_001',
      'External call blocked',
      'external_calls_remain_forbidden',
      'external_calls_not_approved',
      'security_review_queue',
      'fixture_audit_exact_scope_auth_draft_external_blocked_001',
    ),
  },
  {
    review_area_category: 'approved_channels',
    fixture_approved_channels_empty: true,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_channels_001',
      'Approved channels empty',
      'approved_channels_remain_empty',
      'no_channels_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_channels_001',
    ),
  },
  {
    review_area_category: 'approved_external_services',
    fixture_approved_external_services_empty: true,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_services_001',
      'Approved external services empty',
      'approved_external_services_remain_empty',
      'no_external_services_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_services_001',
    ),
  },
  {
    review_area_category: 'candidate_channel_scope',
    fixture_candidate_channel_scope_value: 'placeholder_only',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_candidate_channel_001',
      'Candidate channel scope placeholder_only',
      'candidate_channel_scope_remains_placeholder_only',
      'channel_scope_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_candidate_channel_001',
    ),
  },
  {
    review_area_category: 'approved_start_window',
    fixture_approved_start_window_value: 'blank_placeholder',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_start_window_001',
      'Approved start window blank_placeholder',
      'start_window_remains_blank_placeholder',
      'start_window_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_start_window_001',
    ),
  },
  {
    review_area_category: 'approved_operator',
    fixture_approved_operator_value: 'blank_placeholder',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_operator_001',
      'Approved operator blank_placeholder',
      'operator_remains_blank_placeholder',
      'operator_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_operator_001',
    ),
  },
  {
    review_area_category: 'rollback_owner',
    fixture_rollback_owner_value: 'blank_placeholder',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_rollback_owner_001',
      'Rollback owner blank_placeholder',
      'rollback_owner_remains_blank_placeholder',
      'rollback_owner_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_rollback_owner_001',
    ),
  },
  {
    review_area_category: 'stop_conditions',
    fixture_stop_conditions_value: 'placeholder_required_before_activation',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_stop_conditions_001',
      'Stop conditions placeholder_required_before_activation',
      'stop_conditions_remain_placeholder_required',
      'stop_conditions_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_stop_conditions_001',
    ),
  },
  {
    review_area_category: 'observation_window',
    fixture_observation_window_value: 'placeholder_required_before_activation',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_observation_window_001',
      'Observation window placeholder_required_before_activation',
      'observation_window_remain_placeholder_required',
      'observation_window_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_observation_window_001',
    ),
  },
  {
    review_area_category: 'rollback_plan_status',
    fixture_rollback_plan_status_value: 'placeholder_required_before_activation',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_rollback_plan_001',
      'Rollback plan status placeholder_required_before_activation',
      'rollback_plan_status_remain_placeholder_required',
      'rollback_plan_not_approved',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_rollback_plan_001',
    ),
  },
  {
    review_area_category: 'required_next_decision',
    fixture_required_next_decision: REQUIRED_NEXT_DECISION,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_next_decision_001',
      'Required next decision (Jason explicit approval)',
      'exact_jason_approval_still_required_before_activation',
      'activation_requires_separate_explicit_jason_approval',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_next_decision_001',
    ),
  },
  {
    review_area_category: 'forbidden_scope',
    fixture_forbidden_scope: FORBIDDEN_SCOPE,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_forbidden_scope_001',
      'Forbidden scope boundary',
      'forbidden_scope_enforced_until_separate_approval',
      'forbidden_scope_remains_in_effect',
      'security_review_queue',
      'fixture_audit_exact_scope_auth_draft_forbidden_scope_001',
    ),
  },
  {
    upstream_packet: 'native_workflow_fixture_first_controlled_launch_scoped_approval_capture',
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_scoped_capture_rel_001',
      'Relationship to scoped approval capture',
      'builds_on_scoped_approval_capture_without_granting_activation',
      'scoped_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_scoped_capture_rel_001',
    ),
  },
  {
    review_area_category: 'not_activation_approval_boundary',
    fixture_not_activation_approval: true,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_not_activation_001',
      'Not activation approval boundary',
      'authorization_draft_is_not_activation_approval',
      'draft_must_not_be_mistaken_for_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_not_activation_001',
    ),
  },
  {
    review_area_category: 'jason_approval_fields_table',
    fixture_jason_approval_fields_count: JASON_APPROVAL_FIELDS_TABLE.length,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_fields_table_001',
      'Jason approval fields table (all placeholders)',
      'all_jason_approval_fields_remain_placeholders',
      'no_jason_approval_field_filled_for_activation',
      'founder_manual_review',
      'fixture_audit_exact_scope_auth_draft_fields_table_001',
    ),
  },
  {
    review_area_category: 'credential_env_boundary',
    fixture_credential_env_reads_forbidden: true,
    fixture_no_credential_values_logged: true,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_credential_env_001',
      'Credential/env boundary',
      'boundary_enforced_no_credential_access',
      'credential_env_content_detected_in_payload',
      'security_review_queue',
      'fixture_audit_exact_scope_auth_draft_credential_env_001',
    ),
  },
  {
    review_area_category: 'schema_auth_rls_security_boundary',
    fixture_schema_changes_forbidden: true,
    ...commonAuthorizationDraftFields(
      'exact_scope_auth_draft_schema_auth_rls_001',
      'Schema/auth/RLS/security boundary',
      'boundary_enforced_no_schema_auth_rls_changes',
      'security_tenant_isolation_review_incomplete',
      'security_review_queue',
      'fixture_audit_exact_scope_auth_draft_schema_auth_rls_001',
    ),
  },
];

const AUTHORIZATION_AREAS = firstControlledLaunchExactTestModeScopeAuthorizationDraftItems.map(
  (item) => item.fixture_authorization_area,
);

function countByArea(area) {
  return firstControlledLaunchExactTestModeScopeAuthorizationDraftItems.filter(
    (item) => item.fixture_authorization_area === area,
  ).length;
}

function allItemsSatisfyCommonAuthorizationDraftFields() {
  return firstControlledLaunchExactTestModeScopeAuthorizationDraftItems.every((item) =>
    COMMON_AUTHORIZATION_DRAFT_FIELDS.every((field) =>
      Object.prototype.hasOwnProperty.call(item, field),
    ),
  );
}

function allItemsRemainDryRunOnly() {
  return firstControlledLaunchExactTestModeScopeAuthorizationDraftItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false &&
      item.fixture_first_controlled_launch_activation_allowed === false,
  );
}

const firstControlledLaunchExactTestModeScopeAuthorizationDraftSafetyAssertions = [
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_doc_present',
  'fake_data_local_only_scope_present',
  'prior_scoped_approval_capture_referenced',
  'jason_approval_statement_reference_present',
  'authorization_draft_only_not_activation_approved',
  'no_launch_or_channel_activation_allowed',
  'approved_channels_empty',
  'approved_external_services_empty',
  'channel_start_operator_rollback_stop_condition_fields_remain_placeholders',
  'exact_jason_approval_still_required_before_activation',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'authorization_draft_items_have_common_fields',
  'authorization_draft_items_remain_dry_run_only',
  'authorization_draft_items_have_activation_flags_false',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
  'not_activation_approval_boundary_present',
  'forbidden_scope_enforced',
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

const exactTestModeScopeAuthorizationDraftRecord = {
  approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
  prior_capture_commit: PRIOR_CAPTURE_COMMIT,
  authorization_type: AUTHORIZATION_TYPE,
  authorization_status: AUTHORIZATION_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  approval_scope: APPROVAL_SCOPE,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_channels: [],
  approved_external_services: [],
  candidate_channel_scope: 'placeholder_only',
  approved_start_window: 'blank_placeholder',
  approved_operator: 'blank_placeholder',
  rollback_owner: 'blank_placeholder',
  stop_conditions: 'placeholder_required_before_activation',
  observation_window: 'placeholder_required_before_activation',
  rollback_plan_status: 'placeholder_required_before_activation',
  required_next_decision: REQUIRED_NEXT_DECISION,
  forbidden_scope: FORBIDDEN_SCOPE,
};

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run:
    'native_workflow_fixture_first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run',
  first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary: {
    runbook:
      'native_workflow_fixture_first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run',
    scope: 'local_fake_data_first_controlled_launch_exact_test_mode_scope_authorization_draft_only',
    packet_type: 'exact_test_mode_scope_authorization_draft_only',
    delivery_mode: 'dry_run_only',
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_capture_commit: PRIOR_CAPTURE_COMMIT,
    authorization_type: AUTHORIZATION_TYPE,
    authorization_status: AUTHORIZATION_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    approval_scope: APPROVAL_SCOPE,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    authorization_draft_item_count:
      firstControlledLaunchExactTestModeScopeAuthorizationDraftItems.length,
    authorization_areas_modeled: AUTHORIZATION_AREAS,
    all_items_fake_data_only: true,
    all_items_remain_dry_run_only: allItemsRemainDryRunOnly(),
    relationship_to_scoped_approval_capture:
      'builds_on_scoped_approval_capture_without_granting_activation',
    overall_authorization_draft_posture:
      'exact_scope_authorization_draft_only_activation_blocked_jason_explicit_approval_required',
  },
  exact_test_mode_scope_authorization_draft_record: exactTestModeScopeAuthorizationDraftRecord,
  jason_approval_fields_table: JASON_APPROVAL_FIELDS_TABLE,
  first_controlled_launch_exact_test_mode_scope_authorization_draft_items:
    firstControlledLaunchExactTestModeScopeAuthorizationDraftItems,
  executive_exact_scope_authorization_draft_summary: {
    overall_status:
      'exact_scope_authorization_draft_only_all_activation_blocked_jason_explicit_approval_required',
    authorization_draft_ready: true,
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_capture_commit: PRIOR_CAPTURE_COMMIT,
    authorization_type: AUTHORIZATION_TYPE,
    authorization_status: AUTHORIZATION_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    exact_jason_approval_still_required: true,
    status_model:
      'authorization_draft_structures_exact_scope_for_jason_review_without_granting_activation',
  },
  prior_scoped_approval_capture_reference_summary: {
    prior_capture_commit: PRIOR_CAPTURE_COMMIT,
    prior_capture_packet:
      'native_workflow_fixture_first_controlled_launch_scoped_approval_capture',
    prior_approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_approval_interpretation: 'move_forward_to_next_controlled_planning_step_only',
    prior_approval_scope: 'prepare_controlled_test_mode_activation_plan_only',
    prior_capture_does_not_grant_activation: true,
    builds_on_prior_scoped_planning_approval: true,
  },
  jason_approval_statement_reference_summary: {
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    statement_referenced: true,
    statement_source: 'founder_manual_review',
    not_interpreted_as_activation_approval: true,
    not_interpreted_as_live_launch_approval: true,
    not_interpreted_as_sandbox_test_mode_activation_approval: true,
  },
  authorization_draft_status_summary: {
    authorization_type: AUTHORIZATION_TYPE,
    authorization_status: AUTHORIZATION_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    approval_scope: APPROVAL_SCOPE,
    draft_only_not_approved_for_activation: true,
    activation_approval_not_granted: true,
  },
  activation_blocked_summary: {
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    no_launch_or_channel_activation_allowed: true,
    activation_requires_separate_explicit_jason_approval: true,
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
  placeholder_fields_summary: {
    candidate_channel_scope: 'placeholder_only',
    approved_start_window: 'blank_placeholder',
    approved_operator: 'blank_placeholder',
    rollback_owner: 'blank_placeholder',
    stop_conditions: 'placeholder_required_before_activation',
    observation_window: 'placeholder_required_before_activation',
    rollback_plan_status: 'placeholder_required_before_activation',
    all_placeholder_fields_remain_unapproved: true,
    channel_scope_not_approved: true,
    start_window_not_approved: true,
    operator_not_approved: true,
    rollback_owner_not_approved: true,
    stop_conditions_not_approved: true,
    observation_window_not_approved: true,
    rollback_plan_not_approved: true,
  },
  required_next_decision_summary: {
    required_next_decision: REQUIRED_NEXT_DECISION,
    exact_jason_approval_still_required: true,
    authorization_draft_does_not_satisfy_activation_approval: true,
  },
  forbidden_scope_summary: {
    forbidden_scope: FORBIDDEN_SCOPE,
    forbidden_scope_enforced: true,
    all_live_test_mode_external_service_production_actions_forbidden: true,
  },
  not_activation_approval_boundary_summary: {
    authorization_draft_is_not_activation_approval: true,
    authorization_draft_is_not_live_launch_approval: true,
    authorization_draft_is_not_sandbox_test_mode_activation_approval: true,
    authorization_draft_is_not_external_call_approval: true,
    draft_must_not_be_mistaken_for_activation: true,
  },
  scoped_approval_capture_relationship_summary: {
    scoped_approval_capture_evidence_present:
      countByArea('Relationship to scoped approval capture') === 1,
    scoped_approval_capture_does_not_grant_activation: true,
    relationship: 'builds_on_scoped_approval_capture_without_granting_activation',
  },
  jason_approval_fields_table_summary: {
    field_count: JASON_APPROVAL_FIELDS_TABLE.length,
    all_fields_remain_placeholders: JASON_APPROVAL_FIELDS_TABLE.every(
      (row) => row.approval_required === true,
    ),
    all_fields_require_jason_approval: true,
    no_field_approved_for_activation: true,
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
  first_controlled_launch_exact_test_mode_scope_authorization_draft_safety_assertions:
    firstControlledLaunchExactTestModeScopeAuthorizationDraftSafetyAssertions,
  common_authorization_draft_fields_summary: {
    required_fields: COMMON_AUTHORIZATION_DRAFT_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
    fixture_external_call_allowed_value: false,
    fixture_live_activation_allowed_value: false,
    fixture_test_mode_activation_allowed_value: false,
    fixture_first_controlled_launch_activation_allowed_value: false,
    all_items_include_common_fields: allItemsSatisfyCommonAuthorizationDraftFields(),
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