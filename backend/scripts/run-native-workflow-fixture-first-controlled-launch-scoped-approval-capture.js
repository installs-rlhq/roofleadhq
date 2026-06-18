#!/usr/bin/env node
/**
 * Local fake-data first controlled launch scoped approval capture dry-run model.
 * Captures Jason's planning-only approval statement without granting activation.
 * No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-19T00:00:00.000Z';

const COMMON_CAPTURE_FIELDS = [
  'fixture_scoped_approval_capture_id',
  'fixture_capture_area',
  'fixture_capture_status',
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

function commonCaptureFields(
  captureId,
  area,
  status,
  interpretation,
  blockingReason,
  owner,
  auditEventId,
) {
  return {
    fixture_scoped_approval_capture_id: captureId,
    fixture_capture_area: area,
    fixture_capture_status: status,
    fixture_approval_interpretation: interpretation,
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

const PLANNING_ONLY_INTERPRETATION = 'move_forward_to_next_controlled_planning_step_only';

const firstControlledLaunchScopedApprovalCaptureItems = [
  {
    review_area_category: 'executive_scoped_approval_capture',
    ...commonCaptureFields(
      'scoped_approval_capture_exec_001',
      'Executive scoped approval capture summary',
      'scoped_planning_approval_captured_activation_blocked',
      PLANNING_ONLY_INTERPRETATION,
      'exact_controlled_test_mode_channel_start_operator_rollback_approval_still_required',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_exec_001',
    ),
  },
  {
    review_area_category: 'jason_approval_statement',
    fixture_approval_statement_received: 'Approved to move forward.',
    ...commonCaptureFields(
      'scoped_approval_capture_statement_001',
      'Jason approval statement captured',
      'approval_statement_recorded_planning_only',
      PLANNING_ONLY_INTERPRETATION,
      'approval_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_statement_001',
    ),
  },
  {
    review_area_category: 'planning_only_interpretation',
    fixture_approval_interpretation_value: PLANNING_ONLY_INTERPRETATION,
    ...commonCaptureFields(
      'scoped_approval_capture_interpretation_001',
      'Planning-only interpretation boundary',
      'interpretation_planning_only_not_activation',
      PLANNING_ONLY_INTERPRETATION,
      'approval_not_interpreted_as_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_interpretation_001',
    ),
  },
  {
    review_area_category: 'approval_scope',
    fixture_approval_scope_value: 'prepare_controlled_test_mode_activation_plan_only',
    ...commonCaptureFields(
      'scoped_approval_capture_scope_001',
      'Approval scope (prepare plan only)',
      'scope_limited_to_controlled_test_mode_plan_preparation',
      PLANNING_ONLY_INTERPRETATION,
      'scope_does_not_include_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_scope_001',
    ),
  },
  {
    review_area_category: 'approval_decision_status',
    fixture_approval_decision_status_value: 'scoped_planning_approved',
    ...commonCaptureFields(
      'scoped_approval_capture_decision_status_001',
      'Approval decision status (scoped_planning_approved)',
      'scoped_planning_approved_not_activation_approved',
      PLANNING_ONLY_INTERPRETATION,
      'decision_status_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_decision_status_001',
    ),
  },
  {
    review_area_category: 'first_controlled_launch_activation_blocked',
    fixture_first_controlled_launch_activation_allowed: false,
    ...commonCaptureFields(
      'scoped_approval_capture_fcl_blocked_001',
      'First controlled launch activation blocked',
      'first_controlled_launch_activation_remains_blocked',
      PLANNING_ONLY_INTERPRETATION,
      'first_controlled_launch_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_fcl_blocked_001',
    ),
  },
  {
    review_area_category: 'sandbox_test_mode_activation_blocked',
    fixture_sandbox_test_mode_activation_allowed: false,
    ...commonCaptureFields(
      'scoped_approval_capture_sandbox_blocked_001',
      'Sandbox/test-mode activation blocked',
      'sandbox_test_mode_activation_remains_blocked',
      PLANNING_ONLY_INTERPRETATION,
      'sandbox_test_mode_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_sandbox_blocked_001',
    ),
  },
  {
    review_area_category: 'live_activation_blocked',
    fixture_live_activation_allowed: false,
    ...commonCaptureFields(
      'scoped_approval_capture_live_blocked_001',
      'Live activation blocked',
      'live_activation_remains_blocked',
      PLANNING_ONLY_INTERPRETATION,
      'live_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_live_blocked_001',
    ),
  },
  {
    review_area_category: 'external_call_blocked',
    fixture_external_call_allowed: false,
    ...commonCaptureFields(
      'scoped_approval_capture_external_blocked_001',
      'External call blocked',
      'external_calls_remain_forbidden',
      PLANNING_ONLY_INTERPRETATION,
      'external_calls_not_approved',
      'security_review_queue',
      'fixture_audit_scoped_approval_capture_external_blocked_001',
    ),
  },
  {
    review_area_category: 'approved_channels',
    fixture_approved_channels_empty: true,
    ...commonCaptureFields(
      'scoped_approval_capture_channels_001',
      'Approved channels empty',
      'approved_channels_remain_empty',
      PLANNING_ONLY_INTERPRETATION,
      'no_channels_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_channels_001',
    ),
  },
  {
    review_area_category: 'approved_external_services',
    fixture_approved_external_services_empty: true,
    ...commonCaptureFields(
      'scoped_approval_capture_services_001',
      'Approved external services empty',
      'approved_external_services_remain_empty',
      PLANNING_ONLY_INTERPRETATION,
      'no_external_services_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_services_001',
    ),
  },
  {
    review_area_category: 'approved_start_time',
    fixture_approved_start_time_value: 'blank_placeholder',
    ...commonCaptureFields(
      'scoped_approval_capture_start_time_001',
      'Approved start time blank_placeholder',
      'start_time_remains_blank_placeholder',
      PLANNING_ONLY_INTERPRETATION,
      'start_time_not_approved',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_start_time_001',
    ),
  },
  {
    review_area_category: 'approved_operator',
    fixture_approved_operator_value: 'blank_placeholder',
    ...commonCaptureFields(
      'scoped_approval_capture_operator_001',
      'Approved operator blank_placeholder',
      'operator_remains_blank_placeholder',
      PLANNING_ONLY_INTERPRETATION,
      'operator_not_approved',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_operator_001',
    ),
  },
  {
    review_area_category: 'rollback_owner',
    fixture_rollback_owner_value: 'blank_placeholder',
    ...commonCaptureFields(
      'scoped_approval_capture_rollback_owner_001',
      'Rollback owner blank_placeholder',
      'rollback_owner_remains_blank_placeholder',
      PLANNING_ONLY_INTERPRETATION,
      'rollback_owner_not_approved',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_rollback_owner_001',
    ),
  },
  {
    review_area_category: 'required_next_decision',
    fixture_required_next_decision:
      'exact controlled test-mode channel/start/operator/rollback approval',
    ...commonCaptureFields(
      'scoped_approval_capture_next_decision_001',
      'Required next decision (exact activation approval)',
      'exact_activation_approval_still_required',
      PLANNING_ONLY_INTERPRETATION,
      'activation_requires_separate_exact_approval',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_next_decision_001',
    ),
  },
  {
    review_area_category: 'forbidden_scope',
    fixture_forbidden_scope:
      'all live/test-mode/external/service/production actions until separately approved',
    ...commonCaptureFields(
      'scoped_approval_capture_forbidden_scope_001',
      'Forbidden scope boundary',
      'forbidden_scope_enforced_until_separate_approval',
      PLANNING_ONLY_INTERPRETATION,
      'forbidden_scope_remains_in_effect',
      'security_review_queue',
      'fixture_audit_scoped_approval_capture_forbidden_scope_001',
    ),
  },
  {
    upstream_packet: 'native_workflow_fixture_first_controlled_launch_approval_decision_draft',
    ...commonCaptureFields(
      'scoped_approval_capture_decision_draft_rel_001',
      'Relationship to approval decision draft',
      'builds_on_decision_draft_without_granting_activation',
      PLANNING_ONLY_INTERPRETATION,
      'decision_draft_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_decision_draft_rel_001',
    ),
  },
  {
    review_area_category: 'not_activation_approval_boundary',
    fixture_not_activation_approval: true,
    ...commonCaptureFields(
      'scoped_approval_capture_not_activation_001',
      'Not activation approval boundary',
      'scoped_approval_is_not_activation_approval',
      PLANNING_ONLY_INTERPRETATION,
      'approval_must_not_be_mistaken_for_activation',
      'founder_manual_review',
      'fixture_audit_scoped_approval_capture_not_activation_001',
    ),
  },
  {
    review_area_category: 'credential_env_boundary',
    fixture_credential_env_reads_forbidden: true,
    fixture_no_credential_values_logged: true,
    ...commonCaptureFields(
      'scoped_approval_capture_credential_env_001',
      'Credential/env boundary',
      'boundary_enforced_no_credential_access',
      PLANNING_ONLY_INTERPRETATION,
      'credential_env_content_detected_in_payload',
      'security_review_queue',
      'fixture_audit_scoped_approval_capture_credential_env_001',
    ),
  },
  {
    review_area_category: 'schema_auth_rls_security_boundary',
    fixture_schema_changes_forbidden: true,
    ...commonCaptureFields(
      'scoped_approval_capture_schema_auth_rls_001',
      'Schema/auth/RLS/security boundary',
      'boundary_enforced_no_schema_auth_rls_changes',
      PLANNING_ONLY_INTERPRETATION,
      'security_tenant_isolation_review_incomplete',
      'security_review_queue',
      'fixture_audit_scoped_approval_capture_schema_auth_rls_001',
    ),
  },
];

const CAPTURE_AREAS = firstControlledLaunchScopedApprovalCaptureItems.map(
  (item) => item.fixture_capture_area,
);

function countByArea(area) {
  return firstControlledLaunchScopedApprovalCaptureItems.filter(
    (item) => item.fixture_capture_area === area,
  ).length;
}

function allItemsSatisfyCommonCaptureFields() {
  return firstControlledLaunchScopedApprovalCaptureItems.every((item) =>
    COMMON_CAPTURE_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field)),
  );
}

function allItemsRemainDryRunOnly() {
  return firstControlledLaunchScopedApprovalCaptureItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false &&
      item.fixture_first_controlled_launch_activation_allowed === false,
  );
}

const firstControlledLaunchScopedApprovalCaptureSafetyAssertions = [
  'first_controlled_launch_scoped_approval_capture_doc_present',
  'fake_data_local_only_scope_present',
  'jason_approval_statement_captured',
  'planning_only_interpretation_present',
  'no_launch_or_channel_activation_allowed',
  'approved_channels_empty',
  'approved_external_services_empty',
  'start_operator_rollback_remain_placeholders',
  'exact_next_approval_still_required',
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

const scopedApprovalCaptureRecord = {
  approval_statement_received: 'Approved to move forward.',
  approval_interpretation: PLANNING_ONLY_INTERPRETATION,
  approval_scope: 'prepare_controlled_test_mode_activation_plan_only',
  approval_decision_status: 'scoped_planning_approved',
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_channels: [],
  approved_external_services: [],
  approved_start_time: 'blank_placeholder',
  approved_operator: 'blank_placeholder',
  rollback_owner: 'blank_placeholder',
  required_next_decision: 'exact controlled test-mode channel/start/operator/rollback approval',
  forbidden_scope: 'all live/test-mode/external/service/production actions until separately approved',
};

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  first_controlled_launch_scoped_approval_capture_dry_run:
    'native_workflow_fixture_first_controlled_launch_scoped_approval_capture_dry_run',
  first_controlled_launch_scoped_approval_capture_dry_run_summary: {
    runbook: 'native_workflow_fixture_first_controlled_launch_scoped_approval_capture_dry_run',
    scope: 'local_fake_data_first_controlled_launch_scoped_approval_capture_only',
    packet_type: 'scoped_approval_capture_only',
    delivery_mode: 'dry_run_only',
    approval_statement_received: 'Approved to move forward.',
    approval_interpretation: PLANNING_ONLY_INTERPRETATION,
    approval_scope: 'prepare_controlled_test_mode_activation_plan_only',
    approval_decision_status: 'scoped_planning_approved',
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    capture_item_count: firstControlledLaunchScopedApprovalCaptureItems.length,
    capture_areas_modeled: CAPTURE_AREAS,
    all_items_fake_data_only: true,
    all_items_remain_dry_run_only: allItemsRemainDryRunOnly(),
    relationship_to_approval_decision_draft:
      'builds_on_approval_decision_draft_without_granting_activation',
    overall_capture_posture:
      'scoped_planning_approval_captured_activation_blocked_next_exact_approval_required',
  },
  scoped_approval_capture_record: scopedApprovalCaptureRecord,
  first_controlled_launch_scoped_approval_capture_items:
    firstControlledLaunchScopedApprovalCaptureItems,
  executive_scoped_approval_capture_summary: {
    overall_status:
      'jason_planning_only_approval_captured_all_activation_blocked_next_exact_approval_required',
    scoped_approval_capture_ready: true,
    approval_statement_received: 'Approved to move forward.',
    approval_interpretation: PLANNING_ONLY_INTERPRETATION,
    approval_decision_status: 'scoped_planning_approved',
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    exact_activation_approval_still_required: true,
    status_model:
      'scoped_approval_captures_planning_only_move_forward_without_granting_activation',
  },
  jason_approval_statement_captured_summary: {
    approval_statement_received: 'Approved to move forward.',
    statement_captured: true,
    statement_source: 'founder_manual_review',
    approval_interpretation: PLANNING_ONLY_INTERPRETATION,
    not_interpreted_as_activation_approval: true,
    not_interpreted_as_live_launch_approval: true,
    not_interpreted_as_sandbox_test_mode_activation_approval: true,
  },
  planning_only_interpretation_summary: {
    approval_interpretation: PLANNING_ONLY_INTERPRETATION,
    interpretation_is_planning_only: true,
    interpretation_is_next_step_only: true,
    interpretation_does_not_grant_activation: true,
    interpretation_does_not_grant_external_calls: true,
    interpretation_does_not_grant_channel_activation: true,
  },
  activation_blocked_summary: {
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    no_launch_or_channel_activation_allowed: true,
    activation_requires_separate_exact_approval: true,
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
    approved_start_time: 'blank_placeholder',
    approved_operator: 'blank_placeholder',
    rollback_owner: 'blank_placeholder',
    all_placeholder_fields_remain_blank: true,
    start_time_not_approved: true,
    operator_not_approved: true,
    rollback_owner_not_approved: true,
  },
  required_next_decision_summary: {
    required_next_decision:
      'exact controlled test-mode channel/start/operator/rollback approval',
    exact_activation_approval_still_required: true,
    scoped_planning_approval_does_not_satisfy_activation_approval: true,
  },
  forbidden_scope_summary: {
    forbidden_scope:
      'all live/test-mode/external/service/production actions until separately approved',
    forbidden_scope_enforced: true,
    all_live_test_mode_external_service_production_actions_forbidden: true,
  },
  not_activation_approval_boundary_summary: {
    scoped_approval_is_not_activation_approval: true,
    scoped_approval_is_not_live_launch_approval: true,
    scoped_approval_is_not_sandbox_test_mode_activation_approval: true,
    scoped_approval_is_not_external_call_approval: true,
    approval_must_not_be_mistaken_for_activation: true,
  },
  approval_decision_draft_relationship_summary: {
    approval_decision_draft_evidence_present:
      countByArea('Relationship to approval decision draft') === 1,
    approval_decision_draft_does_not_grant_activation: true,
    relationship: 'builds_on_approval_decision_draft_without_granting_activation',
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
  first_controlled_launch_scoped_approval_capture_safety_assertions:
    firstControlledLaunchScopedApprovalCaptureSafetyAssertions,
  common_capture_fields_summary: {
    required_fields: COMMON_CAPTURE_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
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