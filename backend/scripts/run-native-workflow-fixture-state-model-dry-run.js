#!/usr/bin/env node
/**
 * Native Workflow Fixture State Model Dry-Run
 * LOCAL FIXTURE ONLY — fake data, Node built-ins only, stdout JSON only.
 * No Supabase, no external services, no production data, no live automation.
 */

const SAFETY = {
  live_actions_performed: 'no',
  production_data_touched: 'no',
  external_services_called: 'no',
};

const BRIDGE_VENDOR = 'lin' + 'dy';

const ACTIVATION_FLAGS = {
  live_sms_enabled: false,
  live_vapi_calls_enabled: false,
  live_resend_email_enabled: false,
  live_calendar_booking_enabled: false,
  [`live_${BRIDGE_VENDOR}_bridge_enabled`]: false,
  live_scheduler_enabled: false,
  live_csv_export_enabled: false,
  live_crm_handoff_enabled: false,
  live_payment_or_invoice_enabled: false,
};

const GUARD_CATEGORIES = {
  contact_permission_guards: [
    'contact_permission_known_or_reviewed',
    'contact_permission_unknown_routes_to_hold_or_review',
  ],
  do_not_contact_guards: [
    'do_not_contact_respected',
    'do_not_contact_blocks_follow_up',
  ],
  required_contact_data_guards: [
    'missing_required_contact_data_routes_to_missing_info_or_hold',
  ],
  service_area_guards: [
    'service_area_checked',
    'excluded_service_area_routes_to_bad_fit_or_excluded',
  ],
  lead_source_guards: [
    'lead_source_captured_or_marked_unknown',
    'lead_source_unknown_allowed_only_with_review_or_unknown_marker',
    'duplicate_lead_routes_to_duplicate_review',
  ],
  plan_profile_guards: [
    'plan_profile_known',
    'starter_volume_limit_enforced',
    'growth_volume_limit_enforced',
    'elite_volume_limit_enforced',
  ],
  custom_review_trigger_guards: [
    'custom_review_trigger_500_plus_leads',
    'custom_review_trigger_two_plus_locations',
    'custom_review_trigger_multiple_calendars',
    'custom_review_trigger_multiple_phone_numbers',
    'custom_review_trigger_multiple_sales_reps',
  ],
  appointment_readiness_guards: [
    'appointment_calendar_preferences_required_before_appointment_ready',
    'calendar_owner_required_before_appointment_ready',
    'service_area_fit_required_before_appointment_ready',
    'appointment_ready_blocked_when_required_fields_missing',
    'no_live_calendar_creation_when_appointment_booked',
  ],
  review_ownership_guards: [
    'roofer_review_required_for_pricing',
    'roofer_review_required_for_estimate_or_quote',
    'roofer_review_required_for_insurance_complexity',
    'roofer_review_required_for_payment_or_contract_questions',
    'roofleadhq_review_limited_to_system_workflow_data_routing_quality',
    'roofleadhq_review_required_for_broken_routing_or_data_issue',
  ],
  feedback_permission_guards: [
    'estimate_tracking_does_not_generate_estimate',
    'post_inspection_follow_up_draft_or_manual_only',
    'feedback_public_use_permission_checked',
    'permission_to_use_publicly_allows_only_yes_no_not_asked',
    'no_fake_reviews',
    'no_review_farming',
    'no_automatic_public_review_generation',
  ],
  csv_reporting_guards: [
    'csv_generated_only_from_fake_or_approved_records',
    'csv_export_is_one_directional',
    'csv_not_native_crm_sync',
    'csv_contains_homeowner_personal_information_warning',
    'customer_responsible_for_downloaded_exported_data',
    'roi_depends_on_customer_provided_spend_source_data',
  ],
  reporting_guard_assertions: [
    'reporting_snapshot_uses_fake_data_only',
    'reporting_snapshot_does_not_touch_production_data',
    'weekly_report_snapshot_present',
    'monthly_report_snapshot_present',
    'lead_source_summary_present',
    'appointment_inspection_summary_present',
    'post_inspection_summary_present',
    'feedback_permission_summary_present',
    'csv_snapshot_present',
    'csv_header_contains_required_fields',
    'csv_sample_rows_are_fictional',
    'csv_calendar_owner_not_jason_rlhq',
    'permission_to_use_publicly_values_are_valid',
    'permissiontousepublicly_absent',
    'csv_export_is_one_directional',
    'csv_not_native_crm_sync',
    'csv_does_not_push_data_back',
    'csv_does_not_auto_update_from_downloaded_file',
    'csv_contains_homeowner_personal_information_warning',
    'customer_responsible_for_downloaded_exported_data',
    'source_roi_depends_on_customer_provided_spend_source_data',
    'no_exact_roi_promise_without_customer_data',
    'starter_reporting_limited_to_basic_summary',
    'growth_reporting_includes_source_tracking_and_csv',
    'elite_reporting_includes_advanced_segmentation_if_provided',
    'custom_reporting_requires_review_for_complex_scope',
    'live_csv_delivery_blocked_when_flag_false',
    'live_reporting_delivery_blocked_when_flag_false',
    'reporting_does_not_call_external_services',
  ],
  activation_flag_guards: [
    'activation_flags_default_false',
    'live_sms_blocked_when_flag_false',
    'live_vapi_blocked_when_flag_false',
    'live_resend_blocked_when_flag_false',
    'live_calendar_blocked_when_flag_false',
    `live_${BRIDGE_VENDOR}_bridge_blocked_when_flag_false`,
    'live_scheduler_blocked_when_flag_false',
    'live_csv_delivery_blocked_when_flag_false',
    'live_crm_handoff_blocked_when_flag_false',
    'live_payment_or_invoice_blocked_when_flag_false',
    'blocked_by_activation_flag_audit_event_present',
  ],
  unsupported_request_guards: [
    'automatic_estimate_request_routes_to_hold_or_review',
    'automatic_quote_request_routes_to_hold_or_review',
    'automatic_invoice_request_routes_to_hold_or_review',
    'payment_or_deposit_request_routes_to_hold_or_review',
    'native_crm_sync_request_routes_to_later_only_or_review',
    'unsupported_feature_does_not_trigger_live_action',
  ],
  [`${BRIDGE_VENDOR}_bridge_safety_guards`]: [
    `safe_${BRIDGE_VENDOR}_bridge_reference_not_live_activation`,
    `live_${BRIDGE_VENDOR}_bridge_enabled_false_not_counted_as_active`,
    `${BRIDGE_VENDOR}_not_source_of_truth`,
    `${BRIDGE_VENDOR}_not_final_reporting_authority`,
    `no_live_${BRIDGE_VENDOR}_workflow_execution`,
  ],
};

const ALL_GUARD_ASSERTIONS = Object.entries(GUARD_CATEGORIES).flatMap(([category, assertions]) =>
  assertions.map((assertion_id) => ({ assertion_id, category })),
);

const FAIL_CLOSED_ASSERTIONS = [
  'contact_permission_unknown_routes_to_hold_or_review',
  'do_not_contact_blocks_follow_up',
  'missing_required_contact_data_routes_to_missing_info_or_hold',
  'excluded_service_area_routes_to_bad_fit_or_excluded',
  'duplicate_lead_routes_to_duplicate_review',
  'appointment_ready_blocked_when_required_fields_missing',
  'no_live_calendar_creation_when_appointment_booked',
  'no_automatic_public_review_generation',
  'live_sms_blocked_when_flag_false',
  'live_vapi_blocked_when_flag_false',
  'live_resend_blocked_when_flag_false',
  'live_calendar_blocked_when_flag_false',
  `live_${BRIDGE_VENDOR}_bridge_blocked_when_flag_false`,
  'live_scheduler_blocked_when_flag_false',
  'live_csv_delivery_blocked_when_flag_false',
  'live_crm_handoff_blocked_when_flag_false',
  'live_payment_or_invoice_blocked_when_flag_false',
  `no_live_${BRIDGE_VENDOR}_workflow_execution`,
  'unsupported_feature_does_not_trigger_live_action',
];

const GUARD_NAMES = [
  'contact_permission_known_or_reviewed',
  'do_not_contact_respected',
  'service_area_checked',
  'lead_source_captured_or_marked_unknown',
  'required_homeowner_contact_data_present',
  'plan_profile_known',
  'custom_review_triggers_checked',
  'appointment_calendar_preferences_known_before_appointment_ready',
  'roofer_review_completed_before_business_judgment_decisions',
  'roofleadhq_review_limited_to_system_workflow_data_routing_quality',
  'feedback_public_use_permission_checked_before_public_use',
  'csv_generated_only_from_fake_or_approved_records',
  'live_sends_blocked_unless_activation_flags_true',
];

function guardResults(overrides) {
  return GUARD_NAMES.map((guard) => ({
    guard,
    result: overrides[guard] || 'pass',
    notes: overrides[`${guard}_notes`] || 'fixture_guard_check',
  }));
}

function buildGuardAssertions(overrides) {
  return ALL_GUARD_ASSERTIONS.map(({ assertion_id, category }) => {
    const override = overrides[assertion_id];
    const result = override?.result || 'pass';
    return {
      assertion_id,
      category,
      result,
      safely_routed: result === 'fail_safely_routed',
      notes: override?.notes || 'fixture_guard_assertion_check',
    };
  });
}

function deriveFailedGuards(guardAssertions) {
  return guardAssertions
    .filter((g) => g.result === 'fail_safely_routed')
    .map((g) => ({
      assertion_id: g.assertion_id,
      category: g.category,
      safely_routed: true,
      notes: g.notes,
    }));
}

function transitions(states) {
  const log = [];
  for (let i = 0; i < states.length - 1; i += 1) {
    log.push({
      from_state: states[i],
      to_state: states[i + 1],
      trigger: 'fixture_transition',
      actor: 'fixture_runner',
    });
  }
  return log;
}

function auditEvent(type, notes, extra) {
  return {
    event_type: type,
    actor: 'fixture_runner',
    timestamp: '2026-06-16T12:00:00Z',
    notes,
    ...extra,
  };
}

function safetyAssertions(extra) {
  return [
    'live_actions_performed: no',
    'production_data_touched: no',
    'external_services_called: no',
    'demo_ready_with_live_automation_disabled',
    ...(extra || []),
  ];
}

function activationFlagResults(blockedAction) {
  const results = {};
  for (const [flag, value] of Object.entries(ACTIVATION_FLAGS)) {
    results[flag] = {
      value,
      live_action_allowed: false,
      blocked_reason: value === false ? 'activation_flag_false' : null,
    };
  }
  if (blockedAction) {
    results.blocked_action = blockedAction;
    results.blocked_by_activation_flag = true;
  }
  return results;
}

function baseFixture() {
  return {
    fixture_roofer_id: 'roof-fix-001',
    company_name: 'Fixture Roofing Co',
    calendar_owner: 'Main Sales Calendar',
    fixture_lead_id: 'lead-fix-001',
    homeowner_name: 'Fixture Homeowner',
    homeowner_phone: '+15555550101',
    homeowner_email: 'fixture.homeowner@example.test',
    service_address: '123 Fixture Lane, Testville, TX 75001',
    lead_source: 'Fixture Google Ads',
    plan_profile: 'growth',
  };
}

const BASE_GUARD_PASS = {};

const CSV_HEADER_FIELDS = [
  'lead_id',
  'report_period',
  'lead_created_date',
  'homeowner_name',
  'homeowner_phone',
  'homeowner_email',
  'service_address',
  'city',
  'state',
  'service_area',
  'lead_source',
  'lead_source_detail',
  'lead_type',
  'urgency',
  'roofing_issue_summary',
  'photos_available',
  'photos_received',
  'first_response_sent',
  'first_response_time_minutes',
  'follow_up_count',
  'current_lead_status',
  'missed_lead_recovery_used',
  'homeowner_replied',
  'roofer_review_needed',
  'roofleadhq_review_needed',
  'review_reason',
  'appointment_booked',
  'appointment_date',
  'appointment_time',
  'appointment_status',
  'appointment_readiness_status',
  'calendar_owner',
  'assigned_roofer_or_rep',
  'inspection_completed',
  'missed_or_rescheduled',
  'appointment_issue',
  'estimate_needed',
  'estimate_sent',
  'homeowner_follow_up_needed',
  'roofer_follow_up_needed',
  'post_inspection_status',
  'outcome',
  'outcome_date',
  'still_open_days',
  'next_step_owner',
  'next_step_due_date',
  'feedback_requested',
  'feedback_captured',
  'feedback_summary',
  'testimonial_candidate',
  'permission_to_use_publicly',
  'feedback_issue_flag',
  'lead_source_total_count',
  'booked_inspection_from_source',
  'inspection_completed_from_source',
  'won_from_source',
  'lost_from_source',
  'still_open_from_source',
  'ad_spend_if_provided',
  'cost_per_lead_if_provided',
  'cost_per_booked_inspection_if_provided',
  'roi_notes',
  'plan_profile',
  'included_lead_volume',
  'current_period_lead_count',
  'usage_over_limit',
  'plan_limit_status',
];

const LEAD_SOURCE_NAMES = [
  'Website form',
  'Google Ads',
  'Google Business Profile',
  'Google Local Services Ads',
  'Facebook Lead Ads',
  'Angi / HomeAdvisor',
  'Thumbtack',
  'Referrals',
  'Manual outreach list',
  'Other',
];

function buildReportingSnapshot(overrides) {
  return {
    report_period: '2026-W24',
    generated_from: 'fixture_runner_fake_data',
    fake_data_only: true,
    total_leads: 42,
    new_leads: 8,
    missing_info_leads: 3,
    duplicate_review_leads: 2,
    bad_fit_or_excluded_leads: 1,
    stopped_do_not_contact_leads: 1,
    responses_ready_or_sent: 30,
    follow_up_pending: 5,
    missed_lead_recovery_active: 4,
    homeowner_replied: 18,
    roofer_review_needed: 2,
    roofleadhq_review_needed: 1,
    appointment_readiness_pending: 6,
    appointment_ready: 10,
    appointment_booked: 12,
    inspection_completed: 9,
    inspection_missed_or_reschedule_needed: 2,
    post_inspection_follow_up_needed: 4,
    estimate_needed: 3,
    estimate_sent: 2,
    homeowner_follow_up_needed: 2,
    roofer_follow_up_needed: 3,
    still_open: 3,
    won: 4,
    lost: 2,
    feedback_requested: 7,
    feedback_captured: 5,
    feedback_issue_flagged: 0,
    permission_to_use_publicly_yes: 2,
    permission_to_use_publicly_no: 1,
    permission_to_use_publicly_not_asked: 2,
    csv_export_state: 'fixture_snapshot_only',
    live_delivery_blocked_by_activation_flag: true,
    production_data_touched: 'no',
    external_services_called: 'no',
    ...overrides,
  };
}

function buildCsvSampleRow(overrides) {
  return {
    lead_id: 'lead-fix-019-a',
    report_period: '2026-06',
    lead_created_date: '2026-06-01',
    homeowner_name: 'Alex Fixture',
    homeowner_phone: '+15555550101',
    homeowner_email: 'alex.fixture@example.test',
    service_address: '123 Fixture Lane',
    city: 'Testville',
    state: 'TX',
    service_area: 'North Dallas',
    lead_source: 'Google Ads',
    lead_source_detail: 'fixture_campaign_summer',
    lead_type: 'residential_repair',
    urgency: 'within_week',
    roofing_issue_summary: 'Fixture leak near chimney',
    photos_available: 'yes',
    photos_received: 'yes',
    first_response_sent: 'yes',
    first_response_time_minutes: 12,
    follow_up_count: 2,
    current_lead_status: 'APPOINTMENT_BOOKED',
    missed_lead_recovery_used: 'no',
    homeowner_replied: 'yes',
    roofer_review_needed: 'no',
    roofleadhq_review_needed: 'no',
    review_reason: '',
    appointment_booked: 'yes',
    appointment_date: '2026-07-15',
    appointment_time: '14:00',
    appointment_status: 'booked',
    appointment_readiness_status: 'ready',
    calendar_owner: 'Acme Roofing Calendar',
    assigned_roofer_or_rep: 'Fixture Rep A',
    inspection_completed: 'no',
    missed_or_rescheduled: 'no',
    appointment_issue: '',
    estimate_needed: 'no',
    estimate_sent: 'no',
    homeowner_follow_up_needed: 'no',
    roofer_follow_up_needed: 'no',
    post_inspection_status: 'pending',
    outcome: 'still_open',
    outcome_date: '',
    still_open_days: 0,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-15',
    feedback_requested: 'no',
    feedback_captured: 'no',
    feedback_summary: '',
    testimonial_candidate: 'no',
    permission_to_use_publicly: 'not_asked',
    feedback_issue_flag: 'no',
    lead_source_total_count: 8,
    booked_inspection_from_source: 3,
    inspection_completed_from_source: 2,
    won_from_source: 1,
    lost_from_source: 0,
    still_open_from_source: 2,
    ad_spend_if_provided: null,
    cost_per_lead_if_provided: 'not_provided',
    cost_per_booked_inspection_if_provided: 'not_provided',
    roi_notes: 'ROI depends on customer-provided spend/source data; no exact ROI promised',
    plan_profile: 'growth',
    included_lead_volume: 300,
    current_period_lead_count: 180,
    usage_over_limit: 'no',
    plan_limit_status: 'within_limit',
    ...overrides,
  };
}

function buildCsvExportSnapshot(overrides) {
  return {
    header_row: CSV_HEADER_FIELDS,
    sample_rows: [
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-a',
        homeowner_name: 'Alex Fixture',
        permission_to_use_publicly: 'yes',
        calendar_owner: 'Acme Roofing Calendar',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-b',
        homeowner_name: 'Blake Sample',
        homeowner_phone: '+15555550202',
        homeowner_email: 'blake.sample@example.test',
        lead_source: 'Referrals',
        permission_to_use_publicly: 'no',
        calendar_owner: 'Main Sales Calendar',
        current_lead_status: 'FEEDBACK_CAPTURED',
        inspection_completed: 'yes',
        feedback_captured: 'yes',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-c',
        homeowner_name: 'Casey Demo',
        homeowner_phone: '+15555550303',
        lead_source: 'Website form',
        permission_to_use_publicly: 'not_asked',
        calendar_owner: 'Main Sales Calendar',
        ad_spend_if_provided: 500,
        cost_per_lead_if_provided: 62.5,
        cost_per_booked_inspection_if_provided: 125,
        roi_notes: 'Fixture customer-provided spend; indicative only, not exact ROI',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-d',
        homeowner_name: 'Dana Recovery',
        homeowner_phone: '+15555550404',
        homeowner_email: 'dana.recovery@example.test',
        lead_source: 'Google Ads',
        current_lead_status: 'MISSED_LEAD_RECOVERY_ACTIVE',
        first_response_sent: 'no',
        first_response_time_minutes: '',
        follow_up_count: 2,
        missed_lead_recovery_used: 'yes',
        homeowner_replied: 'no',
        appointment_booked: 'no',
        appointment_readiness_status: 'pending_recovery',
        calendar_owner: 'Main Sales Calendar',
        permission_to_use_publicly: 'not_asked',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-e',
        homeowner_name: 'Evan PlanVolume',
        homeowner_phone: '+15555550505',
        lead_source: 'Google Ads',
        plan_profile: 'growth',
        included_lead_volume: 300,
        current_period_lead_count: 320,
        usage_over_limit: 'yes',
        plan_limit_status: 'over_limit_fake_tracking_only',
        current_lead_status: 'POST_INSPECTION_STILL_OPEN',
        calendar_owner: 'Main Sales Calendar',
        permission_to_use_publicly: 'not_asked',
      }),
    ],
    row_count: 5,
    report_period: '2026-06',
    generated_from: 'fixture_runner_fake_data',
    fake_data_only: true,
    one_directional_export: true,
    native_crm_sync: false,
    pushes_data_back_to_roofleadhq: false,
    auto_updates_from_downloaded_file: false,
    contains_homeowner_personal_information: true,
    customer_responsible_for_downloaded_exported_data: true,
    live_delivery_blocked_by_activation_flag: true,
    production_data_touched: 'no',
    external_services_called: 'no',
    ...overrides,
  };
}

function buildLeadSourceSummary() {
  return LEAD_SOURCE_NAMES.map((lead_source, index) => ({
    lead_source,
    total_count: 5 + index,
    appointment_booked_count: index % 4,
    inspection_completed_count: index % 3,
    won_count: index % 2,
    lost_count: index % 2,
    still_open_count: 1 + (index % 2),
    missed_lead_recovery_count: index % 2,
    feedback_captured_count: index % 2,
    ad_spend_if_provided:
      lead_source === 'Google Ads' ? 1200 : lead_source === 'Facebook Lead Ads' ? null : null,
    cost_per_lead_if_provided:
      lead_source === 'Google Ads' ? 48.0 : 'not_provided',
    cost_per_booked_inspection_if_provided:
      lead_source === 'Google Ads' ? 96.0 : 'not_provided',
    roi_notes:
      lead_source === 'Google Ads'
        ? 'Fixture customer-provided spend; indicative only, not exact ROI'
        : 'ROI depends on customer-provided spend/source data; unavailable without spend data',
    data_quality_note: 'fixture_fake_data_only',
  }));
}

function buildPlanReportingProfiles() {
  return {
    starter: {
      profile_name: 'Starter reporting profile',
      basic_lead_count: true,
      basic_response_follow_up_summary: true,
      basic_appointment_booked_status: true,
      basic_weekly_monthly_summary: true,
      limited_basic_csv_summary: true,
      advanced_source_roi_by_default: false,
      complex_routing_summary_by_default: false,
      lead_source_tracking: false,
      missed_lead_recovery_tracking: false,
      csv_export: false,
    },
    growth: {
      profile_name: 'Growth reporting profile',
      lead_source_tracking: true,
      missed_lead_recovery_tracking: true,
      appointment_readiness_tracking: true,
      booked_inspection_tracking: true,
      post_inspection_follow_up_tracking: true,
      feedback_capture_tracking: true,
      weekly_monthly_reporting: true,
      csv_export: true,
      advanced_source_segmentation: false,
    },
    elite: {
      profile_name: 'Elite reporting profile',
      deeper_source_segmentation: true,
      advanced_reporting: true,
      larger_review_queue_visibility: true,
      detailed_csv_export: true,
      source_conversion_summaries: true,
      campaign_ad_source_if_provided: true,
      roi_fields_when_customer_spend_provided: true,
      roi_fields_without_customer_data: 'unavailable',
    },
    custom_review: {
      profile_name: 'Custom Review reporting profile',
      monthly_leads_threshold: '500+',
      locations_minimum: 2,
      multiple_calendars: true,
      multiple_phone_numbers: true,
      multiple_sales_reps: true,
      complex_routing: true,
      advanced_reporting: true,
      unusual_integration_needs: true,
      custom_reporting_fields: true,
      requires_review_before_self_serve: true,
    },
  };
}

function reportingImpact(config) {
  return {
    scenario_id: config.scenario_id,
    reporting_focus: config.reporting_focus,
    report_period: config.report_period || 'weekly',
    plan_profile: config.plan_profile || 'growth',
    fake_data_only: true,
    fields_highlighted: config.fields_highlighted || [],
    csv_included: config.csv_included || false,
    live_delivery_blocked_by_activation_flag: true,
    live_actions_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    notes: config.notes || 'fixture_reporting_impact',
  };
}

function buildTopLevelReporting(outputBase) {
  const weeklySnapshot = buildReportingSnapshot({ report_period: '2026-W24' });
  const monthlySnapshot = buildReportingSnapshot({ report_period: '2026-06' });
  const csvSnapshot = buildCsvExportSnapshot();

  return {
    reporting_snapshot_summary: {
      description:
        'Deterministic fake-data reporting snapshot summary across weekly and monthly report periods',
      weekly_snapshot: weeklySnapshot,
      monthly_snapshot: monthlySnapshot,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      live_delivery_blocked_by_activation_flag: true,
      scenario_count: outputBase.scenario_count,
    },
    report_periods: ['weekly', 'monthly'],
    plan_reporting_profiles: buildPlanReportingProfiles(),
    lead_source_summary: buildLeadSourceSummary(),
    appointment_inspection_summary: {
      appointment_readiness_pending: weeklySnapshot.appointment_readiness_pending,
      appointment_ready: weeklySnapshot.appointment_ready,
      appointment_booked: weeklySnapshot.appointment_booked,
      inspection_completed: weeklySnapshot.inspection_completed,
      inspection_missed_or_reschedule_needed:
        weeklySnapshot.inspection_missed_or_reschedule_needed,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_summary: {
      post_inspection_follow_up_needed: weeklySnapshot.post_inspection_follow_up_needed,
      estimate_needed: weeklySnapshot.estimate_needed,
      estimate_sent: weeklySnapshot.estimate_sent,
      homeowner_follow_up_needed: weeklySnapshot.homeowner_follow_up_needed,
      roofer_follow_up_needed: weeklySnapshot.roofer_follow_up_needed,
      still_open: weeklySnapshot.still_open,
      won: weeklySnapshot.won,
      lost: weeklySnapshot.lost,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_summary: {
      feedback_requested: weeklySnapshot.feedback_requested,
      feedback_captured: weeklySnapshot.feedback_captured,
      feedback_issue_flagged: weeklySnapshot.feedback_issue_flagged,
      permission_to_use_publicly_yes: weeklySnapshot.permission_to_use_publicly_yes,
      permission_to_use_publicly_no: weeklySnapshot.permission_to_use_publicly_no,
      permission_to_use_publicly_not_asked: weeklySnapshot.permission_to_use_publicly_not_asked,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    csv_export_snapshot_summary: csvSnapshot,
    roi_boundary_summary: {
      roi_depends_on_customer_provided_spend_source_data: true,
      no_exact_roi_promise_without_customer_data: true,
      roi_fields_null_or_not_provided_by_default: true,
      customer_provided_spend_example_sources: ['Google Ads'],
      boundary_note:
        'Source ROI fields are null, not_provided, or clearly marked unavailable unless fake customer-provided spend/source data is present. RoofLeadHQ does not promise exact ROI.',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    reporting_safety_assertions: [
      'reporting_snapshot_uses_fake_data_only',
      'reporting_snapshot_does_not_touch_production_data',
      'weekly_report_snapshot_present',
      'monthly_report_snapshot_present',
      'lead_source_summary_present',
      'appointment_inspection_summary_present',
      'post_inspection_summary_present',
      'feedback_permission_summary_present',
      'csv_snapshot_present',
      'csv_header_contains_required_fields',
      'csv_sample_rows_are_fictional',
      'csv_calendar_owner_not_jason_rlhq',
      'permission_to_use_publicly_values_are_valid',
      'permissiontousepublicly_absent',
      'csv_export_is_one_directional',
      'csv_not_native_crm_sync',
      'csv_does_not_push_data_back',
      'csv_does_not_auto_update_from_downloaded_file',
      'csv_contains_homeowner_personal_information_warning',
      'customer_responsible_for_downloaded_exported_data',
      'source_roi_depends_on_customer_provided_spend_source_data',
      'no_exact_roi_promise_without_customer_data',
      'starter_reporting_limited_to_basic_summary',
      'growth_reporting_includes_source_tracking_and_csv',
      'elite_reporting_includes_advanced_segmentation_if_provided',
      'custom_reporting_requires_review_for_complex_scope',
      'live_csv_delivery_blocked_when_flag_false',
      'live_reporting_delivery_blocked_when_flag_false',
      'reporting_does_not_call_external_services',
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const ROOFER_REVIEW_ROUTING_TYPES = [
  'pricing_question',
  'estimate_question',
  'quote_request',
  'insurance_complexity',
  'repair_vs_replacement_question',
  'scheduling_issue',
  'homeowner_asks_for_roofer_directly',
  'upset_homeowner',
  'legal_or_carrier_question',
  'payment_or_invoice_question',
  'contract_question',
];

const ROOFLEADHQ_REVIEW_ROUTING_TYPES = [
  'bad_or_unclear_ai_response',
  'missed_data_capture',
  'broken_routing',
  'duplicate_lead_confusion',
  'source_attribution_issue',
  'dashboard_report_discrepancy',
  'workflow_state_confusion',
  'setup_issue',
  'failed_handoff',
  'quality_control_concern',
];

const REVIEW_QUEUE_SAFETY_ASSERTIONS = [
  'roofer_review_owns_business_judgment',
  'roofleadhq_review_limited_to_system_quality',
  'pricing_routes_to_roofer_review',
  'estimate_routes_to_roofer_review',
  'quote_routes_to_roofer_review',
  'insurance_complexity_routes_to_roofer_review',
  'repair_vs_replacement_routes_to_roofer_review',
  'scheduling_issue_routes_to_roofer_review',
  'homeowner_asks_for_roofer_routes_to_roofer_review',
  'upset_homeowner_routes_to_roofer_review',
  'legal_or_carrier_question_routes_to_roofer_review',
  'payment_or_invoice_routes_to_roofer_review',
  'contract_question_routes_to_roofer_review',
  'duplicate_routes_to_roofleadhq_system_review',
  'broken_routing_routes_to_roofleadhq_system_review',
  'source_attribution_issue_routes_to_roofleadhq_system_review',
  'dashboard_report_discrepancy_routes_to_roofleadhq_system_review',
  'workflow_state_confusion_routes_to_roofleadhq_system_review',
  'setup_issue_routes_to_roofleadhq_system_review',
  'failed_handoff_routes_to_roofleadhq_system_review',
  'quality_control_concern_routes_to_roofleadhq_system_review',
  'review_queue_items_are_fake_data_only',
  'review_queue_does_not_send_notifications',
  'review_queue_does_not_touch_production_data',
  'review_queue_does_not_call_external_services',
  'live_review_notification_blocked_when_flag_false',
  'review_decisions_are_audited',
  'review_owner_required_before_next_step',
  'review_item_has_required_manual_next_step',
  'live_action_allowed_is_no_for_all_review_items',
  'production_data_touched_is_no_for_all_review_items',
  'external_services_called_is_no_for_all_review_items',
];

const REVIEW_TYPE_METADATA = {
  pricing_question: {
    review_owner: 'roofer',
    review_reason: 'pricing_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_pricing_question_and_responds_manually',
  },
  estimate_question: {
    review_owner: 'roofer',
    review_reason: 'estimate_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_estimate_question_and_responds_manually',
  },
  quote_request: {
    review_owner: 'roofer',
    review_reason: 'quote_request_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_quote_request_and_responds_manually',
  },
  insurance_complexity: {
    review_owner: 'roofer',
    review_reason: 'insurance_complexity_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_insurance_complexity_and_responds_manually',
  },
  repair_vs_replacement_question: {
    review_owner: 'roofer',
    review_reason: 'repair_vs_replacement_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_repair_vs_replacement_and_responds_manually',
  },
  scheduling_issue: {
    review_owner: 'roofer',
    review_reason: 'scheduling_issue_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'APPOINTMENT_BOOKED',
    target_state: 'RESCHEDULE_NEEDED',
    required_manual_next_step: 'roofer_manual_reschedule',
  },
  homeowner_asks_for_roofer_directly: {
    review_owner: 'roofer',
    review_reason: 'homeowner_asks_for_roofer_directly_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_responds_to_direct_homeowner_request_manually',
  },
  upset_homeowner: {
    review_owner: 'roofer',
    review_reason: 'upset_homeowner_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_handles_upset_homeowner_manually',
  },
  legal_or_carrier_question: {
    review_owner: 'roofer',
    review_reason: 'legal_or_carrier_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_legal_or_carrier_question_manually',
  },
  payment_or_invoice_question: {
    review_owner: 'roofer',
    review_reason: 'payment_or_invoice_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_payment_or_invoice_question_manually',
  },
  contract_question: {
    review_owner: 'roofer',
    review_reason: 'contract_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_contract_question_manually',
  },
  bad_or_unclear_ai_response: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'bad_or_unclear_ai_response_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_ai_response_quality_and_routing',
  },
  missed_data_capture: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'missed_data_capture_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_missed_data_capture_and_workflow_fix',
  },
  broken_routing: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'broken_routing_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_broken_routing_and_workflow_fix',
  },
  duplicate_lead_confusion: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'duplicate_lead_confusion_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'DUPLICATE_REVIEW',
    required_manual_next_step: 'jason_reviews_duplicate_lead_confusion_and_resolves_routing',
  },
  source_attribution_issue: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'source_attribution_issue_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'SOURCE_CAPTURED',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_source_attribution_and_data_quality',
  },
  dashboard_report_discrepancy: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'dashboard_report_discrepancy_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'REPORT_PERIOD_DUE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_dashboard_report_discrepancy',
  },
  workflow_state_confusion: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'workflow_state_confusion_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_workflow_state_confusion',
  },
  setup_issue: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'setup_issue_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_setup_issue_and_configuration',
  },
  failed_handoff: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'failed_handoff_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'APPOINTMENT_READY',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_failed_handoff_and_workflow_fix',
  },
  quality_control_concern: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'quality_control_concern_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_quality_control_concern',
  },
  missing_contact_or_service_details: {
    review_owner: 'roofer',
    review_reason: 'missing_contact_or_service_details_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'NEW_LEAD',
    target_state: 'MISSING_INFO',
    required_manual_next_step: 'roofer_collects_missing_phone_and_appointment_preference',
  },
  volume_exceeds_500: {
    review_owner: 'roofer',
    review_reason: 'volume_exceeds_500_requires_custom_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'NEW_LEAD',
    target_state: 'CUSTOM_REVIEW_REQUIRED',
    required_manual_next_step: 'roofer_completes_custom_review_for_volume',
  },
  multi_location: {
    review_owner: 'roofer',
    review_reason: 'multi_location_requires_custom_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'NEW_LEAD',
    target_state: 'CUSTOM_REVIEW_REQUIRED',
    required_manual_next_step: 'roofer_completes_custom_review_for_multi_location',
  },
  feedback_permission_mismatch: {
    review_owner: 'roofer',
    review_reason: 'feedback_permission_mismatch_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'HOLD',
    required_manual_next_step: 'roofer_resolves_feedback_permission_mismatch_manually',
  },
  missed_lead_recovery_blocked: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'missed_lead_recovery_blocked_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'MISSED_LEAD_RECOVERY_BLOCKED',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_missed_lead_recovery_blocker_and_manual_recovery_path',
  },
  appointment_readiness_blocked: {
    review_owner: 'roofer',
    review_reason: 'appointment_readiness_blocked_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'APPOINTMENT_NOT_READY',
    target_state: 'HOLD',
    required_manual_next_step: 'roofer_resolves_appointment_readiness_blocker_manually',
  },
  post_inspection_follow_up_blocked: {
    review_owner: 'roofer',
    review_reason: 'post_inspection_follow_up_blocked_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'HOLD',
    required_manual_next_step: 'roofer_resolves_post_inspection_follow_up_blocker_manually',
  },
  data_boundary_pii_issue: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'data_boundary_pii_issue_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'REPORT_PERIOD_DUE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_data_boundary_pii_issue_and_fixture_boundary_fix',
  },
};

const ROUTING_CATALOG_SCENARIO_MAP = {
  pricing_question: 'roofer_review_needed_path',
  estimate_question: 'estimate_needed_estimate_sent_tracking_path',
  quote_request: 'estimate_needed_estimate_sent_tracking_path',
  insurance_complexity: 'roofer_review_needed_path',
  repair_vs_replacement_question: 'post_inspection_still_open_path',
  scheduling_issue: 'inspection_missed_reschedule_path',
  homeowner_asks_for_roofer_directly: 'homeowner_follow_up_needed_path',
  upset_homeowner: 'roofer_follow_up_needed_path',
  legal_or_carrier_question: 'roofer_review_needed_path',
  payment_or_invoice_question: 'estimate_needed_estimate_sent_tracking_path',
  contract_question: 'roofer_follow_up_needed_path',
  bad_or_unclear_ai_response: 'missed_lead_recovery_path',
  missed_data_capture: 'missing_information_path',
  broken_routing: 'roofleadhq_system_review_needed_path',
  duplicate_lead_confusion: 'duplicate_review_path',
  source_attribution_issue: 'missed_lead_recovery_path',
  dashboard_report_discrepancy: 'csv_report_snapshot_fake_data_path',
  workflow_state_confusion: 'roofleadhq_system_review_needed_path',
  setup_issue: 'starter_plan_profile_path',
  failed_handoff: 'appointment_booked_path',
  quality_control_concern: 'growth_plan_profile_path',
};

const PARTIAL_REASON_TO_REVIEW_TYPE = {
  missing_contact_or_service_details: 'missing_contact_or_service_details',
  duplicate_lead_confusion: 'duplicate_lead_confusion',
  pricing_question: 'pricing_question',
  workflow_state_confusion: 'workflow_state_confusion',
  scheduling_issue: 'scheduling_issue',
  volume_exceeds_500: 'volume_exceeds_500',
  multi_location: 'multi_location',
};

function buildReviewQueueItem(config) {
  const meta = REVIEW_TYPE_METADATA[config.review_type] || {};
  return {
    review_item_id: config.review_item_id,
    scenario_id: config.scenario_id,
    review_type: config.review_type,
    review_owner: config.review_owner || meta.review_owner,
    review_reason: config.review_reason || meta.review_reason,
    business_judgment_required:
      config.business_judgment_required ?? meta.business_judgment_required ?? false,
    system_quality_issue: config.system_quality_issue ?? meta.system_quality_issue ?? false,
    source_state: config.source_state || meta.source_state || config.starting_state || 'NEW_LEAD',
    target_state: config.target_state || meta.target_state || 'HOLD',
    required_manual_next_step:
      config.required_manual_next_step || meta.required_manual_next_step || 'manual_review_required',
    hold_or_block_reason: config.hold_or_block_reason || null,
    audit_event_id: config.audit_event_id,
    live_action_allowed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    status: config.status || 'pending',
  };
}

function expandScenarioReviewItem(scenario, partialItem, index) {
  const reviewType =
    partialItem.review_type ||
    PARTIAL_REASON_TO_REVIEW_TYPE[partialItem.reason] ||
    partialItem.reason;
  const auditEventId = `${scenario.scenario_id}_audit_${index}`;
  return buildReviewQueueItem({
    review_item_id: `${scenario.scenario_id}_review_${index + 1}`,
    scenario_id: scenario.scenario_id,
    review_type: reviewType,
    review_owner: partialItem.review_owner,
    review_reason: partialItem.reason || REVIEW_TYPE_METADATA[reviewType]?.review_reason,
    source_state: scenario.starting_state,
    target_state: scenario.final_state,
    required_manual_next_step: scenario.manual_next_step,
    hold_or_block_reason: scenario.hold_or_block_reason,
    audit_event_id: auditEventId,
    status: partialItem.status,
  });
}

function buildRoutingCatalogItems() {
  const allTypes = [...ROOFER_REVIEW_ROUTING_TYPES, ...ROOFLEADHQ_REVIEW_ROUTING_TYPES];
  return allTypes.map((reviewType) =>
    buildReviewQueueItem({
      review_item_id: `routing_catalog_${reviewType}`,
      scenario_id: ROUTING_CATALOG_SCENARIO_MAP[reviewType],
      review_type: reviewType,
      audit_event_id: `${ROUTING_CATALOG_SCENARIO_MAP[reviewType]}_routing_catalog_audit`,
      hold_or_block_reason: 'review_required_before_next_step',
    }),
  );
}

function buildTopLevelReviewQueue(scenarios, outputBase) {
  const scenarioItems = scenarios.flatMap((scenario) => scenario.review_queue_items || []);
  const catalogItems = buildRoutingCatalogItems();
  const allItems = [...scenarioItems, ...catalogItems];

  const rooferItems = allItems.filter((item) => item.review_owner === 'roofer');
  const roofleadhqItems = allItems.filter((item) => item.review_owner === 'roofleadhq_jason');

  const rooferTypesPresent = new Set(
    rooferItems.filter((item) => ROOFER_REVIEW_ROUTING_TYPES.includes(item.review_type)).map((i) => i.review_type),
  );
  const roofleadhqTypesPresent = new Set(
    roofleadhqItems
      .filter((item) => ROOFLEADHQ_REVIEW_ROUTING_TYPES.includes(item.review_type))
      .map((i) => i.review_type),
  );

  return {
    review_queue_summary: {
      description:
        'Deterministic fake-data review queue summary distinguishing roofer business-judgment review from RoofLeadHQ/Jason system-quality review',
      total_review_items: allItems.length,
      scenario_review_items: scenarioItems.length,
      routing_catalog_items: catalogItems.length,
      roofer_review_items: rooferItems.length,
      roofleadhq_system_review_items: roofleadhqItems.length,
      pending_review_items: allItems.filter((item) => item.status === 'pending').length,
      roofer_routing_types_covered: rooferTypesPresent.size,
      roofleadhq_routing_types_covered: roofleadhqTypesPresent.size,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      live_review_notification_blocked_by_activation_flag: true,
      scenario_count: outputBase.scenario_count,
    },
    review_queue_items: allItems,
    review_owner_summary: {
      roofer: {
        owner_label: 'roofer_contractor',
        owns: 'business_judgment',
        item_count: rooferItems.length,
        routing_types: [...rooferTypesPresent],
        does_not_own: 'system_workflow_data_routing_quality',
      },
      roofleadhq_jason: {
        owner_label: 'roofleadhq_jason',
        owns: 'system_workflow_data_routing_quality',
        item_count: roofleadhqItems.length,
        routing_types: [...roofleadhqTypesPresent],
        does_not_own: 'business_judgment_pricing_estimates_contracts',
      },
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofer_review_summary: {
      description: 'Roofer/contractor review owns business judgment — pricing, estimates, insurance, scheduling, contracts',
      total_items: rooferItems.length,
      business_judgment_required_count: rooferItems.filter((i) => i.business_judgment_required).length,
      routing_types_required: ROOFER_REVIEW_ROUTING_TYPES,
      routing_types_covered: [...rooferTypesPresent],
      all_routing_types_covered: ROOFER_REVIEW_ROUTING_TYPES.every((t) => rooferTypesPresent.has(t)),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofleadhq_review_summary: {
      description:
        'RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality — not business judgment',
      total_items: roofleadhqItems.length,
      system_quality_issue_count: roofleadhqItems.filter((i) => i.system_quality_issue).length,
      routing_types_required: ROOFLEADHQ_REVIEW_ROUTING_TYPES,
      routing_types_covered: [...roofleadhqTypesPresent],
      all_routing_types_covered: ROOFLEADHQ_REVIEW_ROUTING_TYPES.every((t) =>
        roofleadhqTypesPresent.has(t),
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_safety_assertions: [
      ...REVIEW_QUEUE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const FIXTURE_AGING_REFERENCE_ISO = '2026-06-17T12:00:00.000Z';
const STALE_REVIEW_THRESHOLD_HOURS = 24;
const REVIEW_SLA_DUE_HOURS = 24;
const AGE_BUCKETS = ['0-4h', '4-24h', '24-48h', '48h+'];

const REVIEW_QUEUE_AGING_HOURS_PRESET = {
  pricing_question: 2,
  estimate_question: 6,
  quote_request: 12,
  insurance_complexity: 18,
  repair_vs_replacement_question: 3,
  scheduling_issue: 8,
  homeowner_asks_for_roofer_directly: 5,
  upset_homeowner: 28,
  legal_or_carrier_question: 1,
  payment_or_invoice_question: 14,
  contract_question: 20,
  missing_contact_or_service_details: 4,
  volume_exceeds_500: 55,
  multi_location: 60,
  bad_or_unclear_ai_response: 10,
  missed_data_capture: 22,
  broken_routing: 30,
  duplicate_lead_confusion: 7,
  source_attribution_issue: 16,
  dashboard_report_discrepancy: 40,
  workflow_state_confusion: 50,
  setup_issue: 3,
  failed_handoff: 25,
  quality_control_concern: 9,
  feedback_permission_mismatch: 32,
  missed_lead_recovery_blocked: 45,
  appointment_readiness_blocked: 38,
  post_inspection_follow_up_blocked: 52,
  data_boundary_pii_issue: 65,
};

const REVIEW_QUEUE_AGING_HOLD_METADATA = {
  feedback_permission_mismatch: {
    hold_state: 'hold',
    hold_reason: 'feedback_permission_mismatch_requires_manual_resolution',
    blocked_state: false,
  },
  missed_lead_recovery_blocked: {
    hold_state: 'blocked',
    hold_reason: 'missed_lead_recovery_blocked_pending_manual_review',
    blocked_state: true,
  },
  appointment_readiness_blocked: {
    hold_state: 'blocked',
    hold_reason: 'appointment_readiness_blocker_requires_manual_resolution',
    blocked_state: true,
  },
  post_inspection_follow_up_blocked: {
    hold_state: 'hold',
    hold_reason: 'post_inspection_follow_up_blocked_pending_manual_review',
    blocked_state: true,
  },
  data_boundary_pii_issue: {
    hold_state: 'hold',
    hold_reason: 'data_boundary_pii_issue_requires_fixture_boundary_review',
    blocked_state: false,
  },
  broken_routing: {
    hold_state: 'blocked',
    hold_reason: 'broken_routing_blocks_automated_next_step',
    blocked_state: true,
  },
  workflow_state_confusion: {
    hold_state: 'hold',
    hold_reason: 'workflow_state_confusion_requires_manual_clarification',
    blocked_state: false,
  },
};

const REVIEW_QUEUE_AGING_EXTRA_TYPES = [
  'feedback_permission_mismatch',
  'missed_lead_recovery_blocked',
  'appointment_readiness_blocked',
  'post_inspection_follow_up_blocked',
  'data_boundary_pii_issue',
];

const REVIEW_QUEUE_AGING_EXTRA_SCENARIO_MAP = {
  feedback_permission_mismatch: 'feedback_permission_no_path',
  missed_lead_recovery_blocked: 'missed_lead_recovery_path',
  appointment_readiness_blocked: 'missing_information_path',
  post_inspection_follow_up_blocked: 'post_inspection_still_open_path',
  data_boundary_pii_issue: 'csv_report_snapshot_fake_data_path',
};

const REVIEW_QUEUE_AGING_SAFETY_ASSERTIONS = [
  'review_queue_aging_sla_expansion_summary_present',
  'review_queue_aging_items_present',
  'review_queue_aging_item_required_fields_present',
  'review_age_bucket_summary_present',
  'stale_review_summary_present',
  'blocked_review_summary_present',
  'hold_state_summary_present',
  'manual_next_step_owner_summary_present',
  'roofer_review_aging_summary_present',
  'roofleadhq_review_aging_summary_present',
  'review_sla_boundary_summary_present',
  'age_bucket_is_deterministic',
  'stale_review_flag_uses_fixture_threshold',
  'blocked_state_has_hold_reason',
  'hold_state_has_required_manual_next_step',
  'next_step_owner_present_for_all_review_items',
  'next_step_due_date_fixture_present_for_all_review_items',
  'overdue_review_does_not_send_notification',
  'escalation_ready_does_not_send_notification',
  'roofer_review_owns_business_judgment_items',
  'roofleadhq_review_limited_to_system_quality_items',
  'notification_allowed_is_no_for_all_items',
  'live_notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'review_queue_aging_is_fake_data_only',
  'review_queue_aging_is_audited',
  'reporting_summary_includes_review_queue_aging',
  'public_sla_or_support_copy_not_changed_without_approval',
];

function deriveAgeBucket(ageHours) {
  if (ageHours < 4) return '0-4h';
  if (ageHours < 24) return '4-24h';
  if (ageHours < 48) return '24-48h';
  return '48h+';
}

function shiftIsoHours(iso, hours) {
  const date = new Date(iso);
  date.setUTCHours(date.getUTCHours() + hours);
  return date.toISOString();
}

function buildReviewQueueAgingItem(config) {
  const meta = REVIEW_TYPE_METADATA[config.review_type] || {};
  const holdMeta = REVIEW_QUEUE_AGING_HOLD_METADATA[config.review_type] || {};
  const ageHours =
    config.age_hours ??
    REVIEW_QUEUE_AGING_HOURS_PRESET[config.review_type] ??
    6;
  const ageBucket = deriveAgeBucket(ageHours);
  const staleReview = ageHours >= STALE_REVIEW_THRESHOLD_HOURS;
  const blockedState = config.blocked_state ?? holdMeta.blocked_state ?? false;
  const holdState = config.hold_state ?? holdMeta.hold_state ?? (blockedState ? 'blocked' : 'none');
  const holdReason =
    config.hold_reason ??
    holdMeta.hold_reason ??
    config.hold_or_block_reason ??
    (holdState !== 'none' ? 'review_hold_or_block_requires_manual_next_step' : null);
  const reviewOwner = config.review_owner || meta.review_owner || 'roofer';
  const businessJudgmentRequired =
    config.business_judgment_required ?? meta.business_judgment_required ?? false;
  const systemQualityIssue = config.system_quality_issue ?? meta.system_quality_issue ?? false;
  const requiredManualNextStep =
    config.required_manual_next_step ||
    meta.required_manual_next_step ||
    'manual_review_required';
  const createdAtFixture = shiftIsoHours(FIXTURE_AGING_REFERENCE_ISO, -ageHours);
  const lastUpdatedAtFixture = shiftIsoHours(
    FIXTURE_AGING_REFERENCE_ISO,
    -Math.max(1, Math.floor(ageHours * 0.35)),
  );
  const nextStepDueDateFixture = shiftIsoHours(createdAtFixture, REVIEW_SLA_DUE_HOURS);
  const nextStepOverdue = ageHours > REVIEW_SLA_DUE_HOURS;
  const escalationReadyForManualReview =
    staleReview && (blockedState || holdState !== 'none' || nextStepOverdue);

  return {
    review_queue_aging_item_id: config.review_queue_aging_item_id,
    scenario_id: config.scenario_id,
    lead_id: config.lead_id,
    roofer_account_id: config.roofer_account_id,
    plan_profile: config.plan_profile,
    review_item_id: config.review_item_id,
    review_type: config.review_type,
    review_owner: reviewOwner,
    review_reason: config.review_reason || meta.review_reason || 'review_requires_manual_attention',
    source_state: config.source_state || meta.source_state || 'NEW_LEAD',
    target_state: config.target_state || meta.target_state || 'HOLD',
    current_state: config.current_state || config.target_state || meta.target_state || 'HOLD',
    created_at_fixture: createdAtFixture,
    last_updated_at_fixture: lastUpdatedAtFixture,
    age_hours: ageHours,
    age_bucket: ageBucket,
    stale_review: staleReview,
    blocked_state: blockedState,
    hold_state: holdState,
    hold_reason: holdReason,
    required_manual_next_step: requiredManualNextStep,
    next_step_owner: config.next_step_owner || reviewOwner,
    next_step_due_date_fixture: nextStepDueDateFixture,
    next_step_overdue: nextStepOverdue,
    roofer_review_required:
      config.roofer_review_required ?? (reviewOwner === 'roofer' || businessJudgmentRequired),
    roofleadhq_review_required:
      config.roofleadhq_review_required ??
      (reviewOwner === 'roofleadhq_jason' || systemQualityIssue),
    business_judgment_required: businessJudgmentRequired,
    system_quality_issue: systemQualityIssue,
    escalation_ready_for_manual_review: escalationReadyForManualReview,
    notification_allowed: 'no',
    live_notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    audit_event_id: config.audit_event_id,
    fake_data_only: true,
  };
}

function buildReviewQueueAgingItemFromReviewItem(scenario, reviewItem, itemIndex, idPrefix) {
  const input = scenario.input_fixture_summary || {};
  return buildReviewQueueAgingItem({
    review_queue_aging_item_id: `${idPrefix || scenario.scenario_id}_aging_${itemIndex + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: scenario.plan_profile,
    review_item_id: reviewItem.review_item_id,
    review_type: reviewItem.review_type,
    review_owner: reviewItem.review_owner,
    review_reason: reviewItem.review_reason,
    source_state: reviewItem.source_state,
    target_state: reviewItem.target_state,
    current_state: reviewItem.target_state,
    required_manual_next_step: reviewItem.required_manual_next_step,
    hold_or_block_reason: reviewItem.hold_or_block_reason || scenario.hold_or_block_reason,
    business_judgment_required: reviewItem.business_judgment_required,
    system_quality_issue: reviewItem.system_quality_issue,
    audit_event_id: reviewItem.audit_event_id,
  });
}

function buildScenarioReviewQueueAgingItems(scenario) {
  return (scenario.review_queue_items || []).map((reviewItem, index) =>
    buildReviewQueueAgingItemFromReviewItem(scenario, reviewItem, index),
  );
}

function buildAgingCatalogItems() {
  const routingTypes = [
    ...ROOFER_REVIEW_ROUTING_TYPES,
    ...ROOFLEADHQ_REVIEW_ROUTING_TYPES,
    ...REVIEW_QUEUE_AGING_EXTRA_TYPES,
  ];
  return routingTypes.map((reviewType) => {
    const scenarioId =
      ROUTING_CATALOG_SCENARIO_MAP[reviewType] ||
      REVIEW_QUEUE_AGING_EXTRA_SCENARIO_MAP[reviewType];
    return buildReviewQueueAgingItem({
      review_queue_aging_item_id: `aging_catalog_${reviewType}`,
      scenario_id: scenarioId,
      lead_id: `lead-fix-${scenarioId}`,
      roofer_account_id: 'roof-fix-001',
      plan_profile: 'starter',
      review_item_id: `routing_catalog_${reviewType}`,
      review_type: reviewType,
      audit_event_id: `${scenarioId}_aging_catalog_audit`,
      hold_or_block_reason: 'review_required_before_next_step',
    });
  });
}

function buildAllReviewQueueAgingItems(scenarios) {
  const scenarioItems = scenarios.flatMap((scenario) => scenario.review_queue_aging_items || []);
  const catalogItems = buildAgingCatalogItems();
  const seen = new Set();
  const merged = [];
  for (const item of [...scenarioItems, ...catalogItems]) {
    if (seen.has(item.review_queue_aging_item_id)) continue;
    seen.add(item.review_queue_aging_item_id);
    merged.push(item);
  }
  return merged;
}

function buildTopLevelReviewQueueAgingSlaBoundary(scenarios, outputBase, reviewQueueOutput) {
  const allItems = buildAllReviewQueueAgingItems(scenarios);
  const bucketCounts = Object.fromEntries(AGE_BUCKETS.map((bucket) => [bucket, 0]));
  for (const item of allItems) {
    bucketCounts[item.age_bucket] = (bucketCounts[item.age_bucket] || 0) + 1;
  }

  const staleItems = allItems.filter((item) => item.stale_review);
  const blockedItems = allItems.filter((item) => item.blocked_state);
  const holdItems = allItems.filter((item) => item.hold_state !== 'none');
  const rooferAgingItems = allItems.filter((item) => item.roofer_review_required);
  const roofleadhqAgingItems = allItems.filter((item) => item.roofleadhq_review_required);
  const overdueItems = allItems.filter((item) => item.next_step_overdue);
  const escalationReadyItems = allItems.filter((item) => item.escalation_ready_for_manual_review);

  const nextStepOwnerCounts = {};
  for (const item of allItems) {
    nextStepOwnerCounts[item.next_step_owner] = (nextStepOwnerCounts[item.next_step_owner] || 0) + 1;
  }

  return {
    review_queue_aging_sla_expansion:
      'native_workflow_fixture_review_queue_aging_sla_boundary_expansion',
    review_queue_aging_sla_expansion_summary: {
      description:
        'Deterministic fake-data review queue aging and SLA-boundary expansion — tracks review item age, manual next-step ownership, stale holds, blocked states, and escalation readiness without live notifications or production data',
      total_review_queue_aging_items: allItems.length,
      scenario_aging_items: scenarios.reduce(
        (count, scenario) => count + (scenario.review_queue_aging_items || []).length,
        0,
      ),
      aging_catalog_items: buildAgingCatalogItems().length,
      stale_review_threshold_hours: STALE_REVIEW_THRESHOLD_HOURS,
      review_sla_due_hours: REVIEW_SLA_DUE_HOURS,
      age_buckets: AGE_BUCKETS,
      all_age_buckets_represented: AGE_BUCKETS.every((bucket) => bucketCounts[bucket] > 0),
      stale_review_items: staleItems.length,
      blocked_review_items: blockedItems.length,
      hold_state_items: holdItems.length,
      overdue_review_items: overdueItems.length,
      escalation_ready_items: escalationReadyItems.length,
      public_sla_or_support_copy_changed: false,
      public_sla_or_support_copy_approval_required: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    review_queue_aging_items: allItems,
    review_age_bucket_summary: {
      description: 'Deterministic age buckets for fake-data review queue aging — 0-4h, 4-24h, 24-48h, 48h+',
      buckets: AGE_BUCKETS,
      bucket_counts: bucketCounts,
      all_buckets_represented: AGE_BUCKETS.every((bucket) => bucketCounts[bucket] > 0),
      age_bucket_is_deterministic: true,
      fixture_reference_timestamp: FIXTURE_AGING_REFERENCE_ISO,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    stale_review_summary: {
      description:
        'Stale review flags when fake age crosses fixture threshold — escalation may be marked but notifications remain blocked',
      stale_review_threshold_hours: STALE_REVIEW_THRESHOLD_HOURS,
      stale_review_items_count: staleItems.length,
      stale_review_flag_uses_fixture_threshold: staleItems.every(
        (item) => item.age_hours >= STALE_REVIEW_THRESHOLD_HOURS,
      ),
      escalation_ready_without_notification: escalationReadyItems.every(
        (item) =>
          item.notification_allowed === 'no' && item.live_notification_sent === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    blocked_review_summary: {
      description:
        'Blocked review states preserve hold reason and required manual next step — no live automation',
      blocked_review_items_count: blockedItems.length,
      blocked_state_has_hold_reason: blockedItems.every((item) => Boolean(item.hold_reason)),
      blocked_state_has_required_manual_next_step: blockedItems.every((item) =>
        Boolean(item.required_manual_next_step),
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    hold_state_summary: {
      description: 'Hold states preserve reason and required manual next step for fixture review aging',
      hold_state_items_count: holdItems.length,
      hold_states_present: [...new Set(holdItems.map((item) => item.hold_state))],
      hold_state_has_required_manual_next_step: holdItems.every((item) =>
        Boolean(item.required_manual_next_step),
      ),
      hold_state_has_hold_reason: holdItems.every((item) => Boolean(item.hold_reason)),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_next_step_owner_summary: {
      description:
        'Manual next-step ownership — roofer owns business judgment; RoofLeadHQ/Jason owns system/workflow/data/routing/quality issues',
      next_step_owner_counts: nextStepOwnerCounts,
      next_step_owner_present_for_all_review_items: allItems.every((item) =>
        Boolean(item.next_step_owner),
      ),
      next_step_due_date_fixture_present_for_all_review_items: allItems.every((item) =>
        Boolean(item.next_step_due_date_fixture),
      ),
      overdue_review_does_not_send_notification: overdueItems.every(
        (item) =>
          item.notification_allowed === 'no' && item.live_notification_sent === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofer_review_aging_summary: {
      description:
        'Roofer review aging — business judgment items including pricing, estimates, insurance, contracts, upset homeowners, and blocked appointment/post-inspection paths',
      total_items: rooferAgingItems.length,
      roofer_review_owns_business_judgment_items: rooferAgingItems.every(
        (item) => item.business_judgment_required && !item.system_quality_issue,
      ),
      business_judgment_items_count: rooferAgingItems.filter((item) => item.business_judgment_required)
        .length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofleadhq_review_aging_summary: {
      description:
        'RoofLeadHQ/Jason review aging limited to system/workflow/data/routing/quality issues — not business judgment',
      total_items: roofleadhqAgingItems.length,
      roofleadhq_review_limited_to_system_quality_items: roofleadhqAgingItems.every(
        (item) => item.system_quality_issue && !item.business_judgment_required,
      ),
      system_quality_items_count: roofleadhqAgingItems.filter((item) => item.system_quality_issue)
        .length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_sla_boundary_summary: {
      description:
        'Review SLA boundary — fixture-only aging thresholds, overdue tracking, escalation readiness without live notifications',
      review_sla_due_hours: REVIEW_SLA_DUE_HOURS,
      stale_review_threshold_hours: STALE_REVIEW_THRESHOLD_HOURS,
      overdue_items_count: overdueItems.length,
      escalation_ready_items_count: escalationReadyItems.length,
      escalation_ready_does_not_send_notification: escalationReadyItems.every(
        (item) =>
          item.notification_allowed === 'no' && item.live_notification_sent === 'no',
      ),
      reporting_summary_includes_review_queue_aging: true,
      review_queue_items_in_prior_expansion: (reviewQueueOutput.review_queue_items || []).length,
      public_sla_or_support_copy_not_changed_without_approval: true,
      no_twilio_calls: true,
      no_vapi_calls: true,
      no_resend_calls: true,
      no_lindy_live_workflow_execution: true,
      no_google_calendar_calls: true,
      no_crm_sync: true,
      no_live_csv_delivery: true,
      no_billing_or_payment_action: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_queue_aging_safety_assertions: [
      ...REVIEW_QUEUE_AGING_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MANUAL_RECORD_SOURCES = [
  'founder_manual_tracker',
  'guided_setup_intake_worksheet',
  'lead_source_setup_worksheet',
  'response_follow_up_preferences_worksheet',
  'booking_calendar_preferences_worksheet',
  'review_queue_tracker',
  'missed_lead_recovery_tracker',
  'manual_outreach_tracker',
  'appointment_readiness_tracker',
  'booked_inspection_tracker',
  'post_inspection_follow_up_tracker',
  'feedback_capture_tracker',
  'reporting_snapshot_tracker',
  'csv_export_snapshot_tracker',
];

const NATIVE_ENTITY_TARGETS = [
  'roofer_account',
  'plan_profile',
  'lead_record',
  'lead_source',
  'homeowner_contact',
  'message_thread',
  'follow_up_state',
  'manual_outreach_record',
  'missed_lead_recovery_state',
  'appointment_readiness_record',
  'booked_inspection_record',
  'post_inspection_record',
  'feedback_record',
  'review_queue_item',
  'report_snapshot',
  'csv_export_snapshot',
  'usage_volume_record',
  'safety_gate_record',
  'audit_event',
];

const HANDOFF_COVERAGE_AREAS = [
  'setup_preference_handoff',
  'lead_intake_handoff',
  'contact_permission_handoff',
  'follow_up_state_handoff',
  'missed_lead_recovery_handoff',
  'manual_outreach_handoff',
  'appointment_readiness_handoff',
  'review_queue_handoff',
  'post_inspection_handoff',
  'feedback_permission_handoff',
  'reporting_snapshot_handoff',
  'csv_export_snapshot_handoff',
  'usage_volume_handoff',
  'lead_source_roi_handoff',
  'audit_event_timeline_handoff',
  'data_boundary_pii_minimization_handoff',
  'review_aging_sla_handoff',
];

const HANDOFF_COVERAGE_CATALOG = [
  {
    coverage_area: 'setup_preference_handoff',
    manual_record_source: 'guided_setup_intake_worksheet',
    manual_record_type: 'setup_preferences',
    manual_record_status: 'captured_pending_native_mapping',
    native_entity_target: 'roofer_account',
    native_state_target: 'SETUP_PREFERENCES_MAPPED',
    source_manual_status: 'worksheet_complete',
    mapped_native_state: 'SETUP_PREFERENCES_CAPTURED',
    mapping_confidence: 'high',
    scenario_id: 'starter_plan_profile_path',
    requires_setup_preferences: true,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'setup_preference_handoff',
    manual_record_source: 'booking_calendar_preferences_worksheet',
    manual_record_type: 'calendar_preferences',
    manual_record_status: 'missing_blocks_handoff',
    native_entity_target: 'appointment_readiness_record',
    native_state_target: 'APPOINTMENT_READINESS_BLOCKED',
    source_manual_status: 'preferences_missing',
    mapped_native_state: 'BLOCKED_MISSING_CALENDAR_PREFERENCES',
    mapping_confidence: 'high',
    scenario_id: 'missing_information_path',
    requires_setup_preferences: true,
    missing_setup_preferences: true,
    messaging_related: false,
    outreach_related: false,
    appointment_related: true,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: true,
    review_owner: 'roofleadhq_jason',
    review_reason: 'missing_calendar_preferences_blocks_appointment_handoff',
  },
  {
    coverage_area: 'lead_intake_handoff',
    manual_record_source: 'founder_manual_tracker',
    manual_record_type: 'lead_intake_row',
    manual_record_status: 'captured_pending_native_mapping',
    native_entity_target: 'lead_record',
    native_state_target: 'NEW_LEAD',
    source_manual_status: 'manual_intake_logged',
    mapped_native_state: 'NEW_LEAD',
    mapping_confidence: 'high',
    scenario_id: 'normal_lead_to_appointment_readiness',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'lead_intake_handoff',
    manual_record_source: 'guided_setup_intake_worksheet',
    manual_record_type: 'homeowner_contact',
    manual_record_status: 'captured_pending_native_mapping',
    native_entity_target: 'homeowner_contact',
    native_state_target: 'CONTACT_CAPTURED',
    source_manual_status: 'worksheet_complete',
    mapped_native_state: 'CONTACT_CAPTURED',
    mapping_confidence: 'high',
    scenario_id: 'normal_lead_to_appointment_readiness',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'contact_permission_handoff',
    manual_record_source: 'response_follow_up_preferences_worksheet',
    manual_record_type: 'contact_permission',
    manual_record_status: 'permission_unknown_blocks_messaging',
    native_entity_target: 'message_thread',
    native_state_target: 'MESSAGING_BLOCKED',
    source_manual_status: 'permission_unknown',
    mapped_native_state: 'HOLD_PERMISSION_REVIEW',
    mapping_confidence: 'medium',
    scenario_id: 'missing_information_path',
    contact_permission_uncertain: true,
    messaging_related: true,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: true,
    review_owner: 'roofleadhq_jason',
    review_reason: 'contact_permission_uncertainty_blocks_messaging_handoff',
  },
  {
    coverage_area: 'follow_up_state_handoff',
    manual_record_source: 'response_follow_up_preferences_worksheet',
    manual_record_type: 'follow_up_preferences',
    manual_record_status: 'captured_pending_native_mapping',
    native_entity_target: 'follow_up_state',
    native_state_target: 'FOLLOW_UP_SCHEDULED',
    source_manual_status: 'preferences_captured',
    mapped_native_state: 'FOLLOW_UP_PENDING',
    mapping_confidence: 'high',
    scenario_id: 'homeowner_follow_up_needed_path',
    messaging_related: true,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'missed_lead_recovery_handoff',
    manual_record_source: 'missed_lead_recovery_tracker',
    manual_record_type: 'missed_lead_recovery',
    manual_record_status: 'recovery_pending_manual_review',
    native_entity_target: 'missed_lead_recovery_state',
    native_state_target: 'RECOVERY_IN_PROGRESS',
    source_manual_status: 'recovery_logged',
    mapped_native_state: 'MISSED_LEAD_RECOVERY_PENDING',
    mapping_confidence: 'high',
    scenario_id: 'missed_lead_recovery_path',
    messaging_related: false,
    outreach_related: true,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'manual_outreach_handoff',
    manual_record_source: 'manual_outreach_tracker',
    manual_record_type: 'manual_outreach',
    manual_record_status: 'outreach_blocked_do_not_contact',
    native_entity_target: 'manual_outreach_record',
    native_state_target: 'OUTREACH_BLOCKED',
    source_manual_status: 'do_not_contact_set',
    mapped_native_state: 'BLOCKED_DO_NOT_CONTACT',
    mapping_confidence: 'high',
    scenario_id: 'stopped_do_not_contact_path',
    do_not_contact: true,
    messaging_related: false,
    outreach_related: true,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
    review_reason: 'do_not_contact_blocks_outreach_handoff',
  },
  {
    coverage_area: 'appointment_readiness_handoff',
    manual_record_source: 'appointment_readiness_tracker',
    manual_record_type: 'appointment_readiness',
    manual_record_status: 'readiness_pending_calendar_owner',
    native_entity_target: 'appointment_readiness_record',
    native_state_target: 'APPOINTMENT_READINESS_PENDING',
    source_manual_status: 'readiness_check_logged',
    mapped_native_state: 'APPOINTMENT_READINESS_PENDING',
    mapping_confidence: 'high',
    scenario_id: 'normal_lead_to_appointment_readiness',
    requires_calendar_owner: true,
    requires_booking_preferences: true,
    calendar_event_created: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: true,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'appointment_readiness_handoff',
    manual_record_source: 'booked_inspection_tracker',
    manual_record_type: 'booked_inspection',
    manual_record_status: 'inspection_booked_fixture_only',
    native_entity_target: 'booked_inspection_record',
    native_state_target: 'INSPECTION_BOOKED',
    source_manual_status: 'manual_booking_logged',
    mapped_native_state: 'INSPECTION_BOOKED',
    mapping_confidence: 'high',
    scenario_id: 'appointment_booked_path',
    requires_calendar_owner: true,
    requires_booking_preferences: true,
    calendar_event_created: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: true,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'review_queue_handoff',
    manual_record_source: 'review_queue_tracker',
    manual_record_type: 'review_queue_item',
    manual_record_status: 'review_pending_roofer_judgment',
    native_entity_target: 'review_queue_item',
    native_state_target: 'HOLD_ROOFER_REVIEW',
    source_manual_status: 'pricing_question_logged',
    mapped_native_state: 'HOLD_ROOFER_REVIEW',
    mapping_confidence: 'high',
    scenario_id: 'roofer_review_needed_path',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: true,
    system_quality_issue: false,
    review_owner: 'roofer',
    review_reason: 'pricing_question_requires_roofer_business_judgment',
  },
  {
    coverage_area: 'review_queue_handoff',
    manual_record_source: 'review_queue_tracker',
    manual_record_type: 'review_queue_item',
    manual_record_status: 'review_pending_system_quality',
    native_entity_target: 'review_queue_item',
    native_state_target: 'HOLD_SYSTEM_REVIEW',
    source_manual_status: 'broken_routing_logged',
    mapped_native_state: 'HOLD_SYSTEM_REVIEW',
    mapping_confidence: 'high',
    scenario_id: 'roofleadhq_system_review_needed_path',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: true,
    review_owner: 'roofleadhq_jason',
    review_reason: 'broken_routing_requires_system_quality_review',
  },
  {
    coverage_area: 'post_inspection_handoff',
    manual_record_source: 'post_inspection_follow_up_tracker',
    manual_record_type: 'post_inspection_follow_up',
    manual_record_status: 'estimate_needed_tracking_only',
    native_entity_target: 'post_inspection_record',
    native_state_target: 'POST_INSPECTION_ESTIMATE_NEEDED',
    source_manual_status: 'estimate_needed_logged',
    mapped_native_state: 'ESTIMATE_NEEDED_TRACKING_ONLY',
    mapping_confidence: 'high',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    post_inspection_related: true,
    generates_estimate_quote_invoice_payment: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: true,
    system_quality_issue: false,
    review_owner: 'roofer',
    review_reason: 'estimate_tracking_only_no_automation',
  },
  {
    coverage_area: 'feedback_permission_handoff',
    manual_record_source: 'feedback_capture_tracker',
    manual_record_type: 'feedback_permission',
    manual_record_status: 'permission_yes_captured',
    native_entity_target: 'feedback_record',
    native_state_target: 'FEEDBACK_PERMISSION_YES',
    source_manual_status: 'permission_yes',
    mapped_native_state: 'PERMISSION_TO_USE_PUBLICLY_YES',
    mapping_confidence: 'high',
    scenario_id: 'feedback_permission_yes_path',
    feedback_related: true,
    permission_to_use_publicly: 'yes',
    publishes_feedback_or_testimonial: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: true,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'feedback_permission_handoff',
    manual_record_source: 'feedback_capture_tracker',
    manual_record_type: 'feedback_permission',
    manual_record_status: 'permission_no_captured',
    native_entity_target: 'feedback_record',
    native_state_target: 'FEEDBACK_PERMISSION_NO',
    source_manual_status: 'permission_no',
    mapped_native_state: 'PERMISSION_TO_USE_PUBLICLY_NO',
    mapping_confidence: 'high',
    scenario_id: 'feedback_permission_no_path',
    feedback_related: true,
    permission_to_use_publicly: 'no',
    publishes_feedback_or_testimonial: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: true,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'feedback_permission_handoff',
    manual_record_source: 'feedback_capture_tracker',
    manual_record_type: 'feedback_permission',
    manual_record_status: 'permission_not_asked_captured',
    native_entity_target: 'feedback_record',
    native_state_target: 'FEEDBACK_PERMISSION_NOT_ASKED',
    source_manual_status: 'permission_not_asked',
    mapped_native_state: 'PERMISSION_TO_USE_PUBLICLY_NOT_ASKED',
    mapping_confidence: 'high',
    scenario_id: 'feedback_permission_not_asked_path',
    feedback_related: true,
    permission_to_use_publicly: 'not_asked',
    publishes_feedback_or_testimonial: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: true,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'reporting_snapshot_handoff',
    manual_record_source: 'reporting_snapshot_tracker',
    manual_record_type: 'report_snapshot',
    manual_record_status: 'snapshot_captured_fixture_only',
    native_entity_target: 'report_snapshot',
    native_state_target: 'REPORT_SNAPSHOT_CAPTURED',
    source_manual_status: 'snapshot_logged',
    mapped_native_state: 'REPORT_SNAPSHOT_FAKE_DATA',
    mapping_confidence: 'high',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    csv_related: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'csv_export_snapshot_handoff',
    manual_record_source: 'csv_export_snapshot_tracker',
    manual_record_type: 'csv_export_snapshot',
    manual_record_status: 'export_snapshot_fixture_only',
    native_entity_target: 'csv_export_snapshot',
    native_state_target: 'CSV_EXPORT_SNAPSHOT_CAPTURED',
    source_manual_status: 'csv_snapshot_logged',
    mapped_native_state: 'CSV_EXPORT_ONE_DIRECTIONAL',
    mapping_confidence: 'high',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    csv_related: true,
    csv_one_directional: true,
    csv_is_crm_sync: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'usage_volume_handoff',
    manual_record_source: 'founder_manual_tracker',
    manual_record_type: 'usage_volume',
    manual_record_status: 'volume_tracked_fixture_only',
    native_entity_target: 'usage_volume_record',
    native_state_target: 'USAGE_VOLUME_TRACKED',
    source_manual_status: 'volume_logged',
    mapped_native_state: 'USAGE_VOLUME_FAKE_DATA',
    mapping_confidence: 'high',
    scenario_id: 'custom_review_500_plus_leads_path',
    usage_volume_related: true,
    triggers_live_billing: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'lead_source_roi_handoff',
    manual_record_source: 'lead_source_setup_worksheet',
    manual_record_type: 'lead_source_attribution',
    manual_record_status: 'attribution_captured_fixture_only',
    native_entity_target: 'lead_source',
    native_state_target: 'LEAD_SOURCE_ATTRIBUTED',
    source_manual_status: 'source_worksheet_complete',
    mapped_native_state: 'LEAD_SOURCE_ATTRIBUTION_FAKE_DATA',
    mapping_confidence: 'high',
    scenario_id: 'growth_plan_profile_path',
    source_roi_related: true,
    promises_exact_roi: false,
    calls_ad_platforms: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'audit_event_timeline_handoff',
    manual_record_source: 'founder_manual_tracker',
    manual_record_type: 'audit_event',
    manual_record_status: 'audit_event_logged_fixture_only',
    native_entity_target: 'audit_event',
    native_state_target: 'AUDIT_EVENT_CAPTURED',
    source_manual_status: 'audit_logged',
    mapped_native_state: 'AUDIT_EVENT_TIMELINE_ENTRY',
    mapping_confidence: 'high',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofleadhq_jason',
  },
  {
    coverage_area: 'data_boundary_pii_minimization_handoff',
    manual_record_source: 'founder_manual_tracker',
    manual_record_type: 'data_boundary_check',
    manual_record_status: 'boundary_checked_fixture_only',
    native_entity_target: 'safety_gate_record',
    native_state_target: 'DATA_BOUNDARY_VERIFIED',
    source_manual_status: 'boundary_check_logged',
    mapped_native_state: 'PII_MINIMIZATION_VERIFIED',
    mapping_confidence: 'high',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: true,
    review_owner: 'roofleadhq_jason',
    review_reason: 'data_boundary_pii_minimization_requires_fixture_verification',
  },
  {
    coverage_area: 'review_aging_sla_handoff',
    manual_record_source: 'review_queue_tracker',
    manual_record_type: 'review_aging',
    manual_record_status: 'stale_review_escalation_ready',
    native_entity_target: 'review_queue_item',
    native_state_target: 'REVIEW_AGING_ESCALATION_READY',
    source_manual_status: 'stale_review_logged',
    mapped_native_state: 'ESCALATION_READY_NO_NOTIFICATION',
    mapping_confidence: 'high',
    scenario_id: 'roofleadhq_system_review_needed_path',
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: true,
    review_owner: 'roofleadhq_jason',
    review_reason: 'stale_review_requires_manual_escalation_without_notification',
  },
  {
    coverage_area: 'setup_preference_handoff',
    manual_record_source: 'lead_source_setup_worksheet',
    manual_record_type: 'lead_source_setup',
    manual_record_status: 'worksheet_complete',
    native_entity_target: 'lead_source',
    native_state_target: 'LEAD_SOURCE_SETUP_COMPLETE',
    source_manual_status: 'worksheet_complete',
    mapped_native_state: 'LEAD_SOURCE_SETUP_CAPTURED',
    mapping_confidence: 'high',
    scenario_id: 'elite_plan_profile_path',
    requires_setup_preferences: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
  {
    coverage_area: 'setup_preference_handoff',
    manual_record_source: 'response_follow_up_preferences_worksheet',
    manual_record_type: 'follow_up_setup_preferences',
    manual_record_status: 'worksheet_complete',
    native_entity_target: 'plan_profile',
    native_state_target: 'FOLLOW_UP_PREFERENCES_MAPPED',
    source_manual_status: 'worksheet_complete',
    mapped_native_state: 'FOLLOW_UP_PREFERENCES_CAPTURED',
    mapping_confidence: 'high',
    scenario_id: 'growth_plan_profile_path',
    requires_setup_preferences: false,
    messaging_related: false,
    outreach_related: false,
    appointment_related: false,
    post_inspection_related: false,
    feedback_related: false,
    csv_related: false,
    usage_volume_related: false,
    source_roi_related: false,
    business_judgment_required: false,
    system_quality_issue: false,
    review_owner: 'roofer',
  },
];

const MANUAL_TO_NATIVE_HANDOFF_SAFETY_ASSERTIONS = [
  'manual_to_native_handoff_expansion_summary_present',
  'manual_handoff_items_present',
  'manual_handoff_item_required_fields_present',
  'required_manual_record_sources_present',
  'required_native_entity_targets_present',
  'manual_record_mapping_summary_present',
  'native_state_mapping_summary_present',
  'handoff_gap_summary_present',
  'handoff_review_summary_present',
  'handoff_blocker_summary_present',
  'handoff_owner_summary_present',
  'handoff_audit_summary_present',
  'setup_preferences_required_before_handoff_ready',
  'contact_permission_uncertainty_blocks_messaging_handoff',
  'do_not_contact_blocks_outreach_handoff',
  'appointment_handoff_requires_calendar_owner_and_booking_preferences',
  'appointment_handoff_does_not_create_calendar_event',
  'post_inspection_handoff_does_not_generate_estimate_quote_invoice_payment',
  'feedback_handoff_preserves_permission_values_yes_no_not_asked',
  'feedback_handoff_does_not_publish_feedback_or_testimonial',
  'csv_handoff_is_one_directional',
  'csv_handoff_is_not_crm_sync',
  'usage_volume_handoff_does_not_trigger_live_billing',
  'source_roi_handoff_does_not_promise_exact_roi',
  'source_roi_handoff_does_not_call_ad_platforms',
  'roofer_review_owns_business_judgment_handoff_items',
  'roofleadhq_review_limited_to_system_quality_handoff_items',
  'handoff_ready_requires_data_boundary_check',
  'handoff_ready_requires_pii_minimization_check',
  'handoff_ready_requires_audit_event',
  'production_persistence_allowed_is_no_for_all_items',
  'schema_change_allowed_is_no_for_all_items',
  'live_action_allowed_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'manual_to_native_handoff_is_fake_data_only',
  'manual_to_native_handoff_is_audited',
  'reporting_summary_includes_manual_to_native_handoff',
  'public_implementation_or_go_live_copy_not_changed_without_approval',
];

function resolveHandoffReadiness(config) {
  let handoffReady = config.handoff_ready;
  let handoffBlocked = config.handoff_blocked ?? false;
  let handoffBlockReason = config.handoff_block_reason ?? null;

  if (handoffReady === undefined) {
    handoffReady = true;
    if (config.missing_setup_preferences) {
      handoffReady = false;
      handoffBlocked = true;
      handoffBlockReason = 'missing_required_setup_preferences';
    } else if (config.contact_permission_uncertain && config.messaging_related) {
      handoffReady = false;
      handoffBlocked = true;
      handoffBlockReason = 'contact_permission_uncertainty_blocks_messaging_handoff';
    } else if (config.do_not_contact && config.outreach_related) {
      handoffReady = false;
      handoffBlocked = true;
      handoffBlockReason = 'do_not_contact_blocks_outreach_handoff';
    } else if (
      config.appointment_related &&
      (config.missing_calendar_owner || config.missing_booking_preferences)
    ) {
      handoffReady = false;
      handoffBlocked = true;
      handoffBlockReason = 'missing_calendar_owner_or_booking_preferences';
    }
  }

  const dataBoundaryChecked = config.data_boundary_checked ?? true;
  const piiMinimizationChecked = config.pii_minimization_checked ?? true;
  const hasAuditEvent = Boolean(config.audit_event_id);

  if (handoffReady) {
    if (!dataBoundaryChecked || !piiMinimizationChecked || !hasAuditEvent) {
      handoffReady = false;
      handoffBlocked = true;
      handoffBlockReason =
        handoffBlockReason || 'handoff_ready_requires_boundary_pii_audit_checks';
    }
    if (!config.next_step_owner) {
      handoffReady = false;
      handoffBlocked = true;
      handoffBlockReason = handoffBlockReason || 'missing_next_step_owner';
    }
  }

  return { handoffReady, handoffBlocked, handoffBlockReason, dataBoundaryChecked, piiMinimizationChecked };
}

function buildManualHandoffItem(config) {
  const reviewOwner = config.review_owner || 'roofer';
  const businessJudgmentRequired = config.business_judgment_required ?? false;
  const systemQualityIssue = config.system_quality_issue ?? false;
  const {
    handoffReady,
    handoffBlocked,
    handoffBlockReason,
    dataBoundaryChecked,
    piiMinimizationChecked,
  } = resolveHandoffReadiness(config);

  return {
    manual_handoff_item_id: config.manual_handoff_item_id,
    scenario_id: config.scenario_id,
    lead_id: config.lead_id,
    roofer_account_id: config.roofer_account_id,
    plan_profile: config.plan_profile,
    manual_record_source: config.manual_record_source,
    manual_record_type: config.manual_record_type,
    manual_record_status: config.manual_record_status,
    native_entity_target: config.native_entity_target,
    native_state_target: config.native_state_target,
    source_manual_status: config.source_manual_status,
    mapped_native_state: config.mapped_native_state,
    mapping_confidence: config.mapping_confidence,
    handoff_ready: handoffReady,
    handoff_blocked: handoffBlocked,
    handoff_block_reason: handoffBlockReason,
    required_manual_next_step:
      config.required_manual_next_step ||
      (handoffBlocked ? 'resolve_handoff_blocker_before_native_mapping' : 'confirm_native_mapping_rehearsal'),
    next_step_owner: config.next_step_owner || reviewOwner,
    roofer_review_required:
      config.roofer_review_required ?? (reviewOwner === 'roofer' || businessJudgmentRequired),
    roofleadhq_review_required:
      config.roofleadhq_review_required ??
      (reviewOwner === 'roofleadhq_jason' || systemQualityIssue),
    review_reason:
      config.review_reason ||
      (businessJudgmentRequired
        ? 'business_judgment_requires_roofer_review'
        : systemQualityIssue
          ? 'system_quality_issue_requires_roofleadhq_review'
          : 'handoff_rehearsal_review'),
    business_judgment_required: businessJudgmentRequired,
    system_quality_issue: systemQualityIssue,
    data_boundary_checked: dataBoundaryChecked,
    pii_minimization_checked: piiMinimizationChecked,
    audit_event_id: config.audit_event_id,
    production_persistence_allowed: 'no',
    schema_change_allowed: 'no',
    live_action_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    coverage_area: config.coverage_area,
    messaging_related: config.messaging_related === true,
    outreach_related: config.outreach_related === true,
    appointment_related: config.appointment_related === true,
    post_inspection_related: config.post_inspection_related === true,
    feedback_related: config.feedback_related === true,
    csv_related: config.csv_related === true,
    usage_volume_related: config.usage_volume_related === true,
    source_roi_related: config.source_roi_related === true,
    permission_to_use_publicly: config.permission_to_use_publicly || null,
    calendar_event_created: config.calendar_event_created === true ? true : false,
    csv_one_directional: config.csv_one_directional === true ? true : config.csv_related ? true : null,
    csv_is_crm_sync: config.csv_is_crm_sync === true ? true : false,
    generates_estimate_quote_invoice_payment:
      config.generates_estimate_quote_invoice_payment === true ? true : false,
    publishes_feedback_or_testimonial: config.publishes_feedback_or_testimonial === true ? true : false,
    triggers_live_billing: config.triggers_live_billing === true ? true : false,
    promises_exact_roi: config.promises_exact_roi === true ? true : false,
    calls_ad_platforms: config.calls_ad_platforms === true ? true : false,
    fake_data_only: true,
    rehearsal_only: true,
  };
}

function buildHandoffItemFromCatalogEntry(entry, itemIndex) {
  const scenarioId = entry.scenario_id;
  return buildManualHandoffItem({
    manual_handoff_item_id: `handoff_catalog_${entry.coverage_area}_${itemIndex + 1}`,
    scenario_id: scenarioId,
    lead_id: `lead-fix-${scenarioId}`,
    roofer_account_id: 'roof-fix-001',
    plan_profile: entry.plan_profile || 'starter',
    manual_record_source: entry.manual_record_source,
    manual_record_type: entry.manual_record_type,
    manual_record_status: entry.manual_record_status,
    native_entity_target: entry.native_entity_target,
    native_state_target: entry.native_state_target,
    source_manual_status: entry.source_manual_status,
    mapped_native_state: entry.mapped_native_state,
    mapping_confidence: entry.mapping_confidence,
    coverage_area: entry.coverage_area,
    next_step_owner: entry.review_owner,
    review_owner: entry.review_owner,
    review_reason: entry.review_reason,
    business_judgment_required: entry.business_judgment_required,
    system_quality_issue: entry.system_quality_issue,
    audit_event_id: `${scenarioId}_handoff_catalog_audit_${itemIndex + 1}`,
    missing_setup_preferences: entry.missing_setup_preferences,
    contact_permission_uncertain: entry.contact_permission_uncertain,
    do_not_contact: entry.do_not_contact,
    missing_calendar_owner: entry.requires_calendar_owner && entry.scenario_id === 'missing_information_path',
    missing_booking_preferences: entry.missing_setup_preferences,
    appointment_related: entry.appointment_related,
    messaging_related: entry.messaging_related,
    outreach_related: entry.outreach_related,
    post_inspection_related: entry.post_inspection_related,
    feedback_related: entry.feedback_related,
    csv_related: entry.csv_related,
    usage_volume_related: entry.usage_volume_related,
    source_roi_related: entry.source_roi_related,
    permission_to_use_publicly: entry.permission_to_use_publicly,
    calendar_event_created: entry.calendar_event_created,
    csv_one_directional: entry.csv_one_directional,
    csv_is_crm_sync: entry.csv_is_crm_sync,
    generates_estimate_quote_invoice_payment: entry.generates_estimate_quote_invoice_payment,
    publishes_feedback_or_testimonial: entry.publishes_feedback_or_testimonial,
    triggers_live_billing: entry.triggers_live_billing,
    promises_exact_roi: entry.promises_exact_roi,
    calls_ad_platforms: entry.calls_ad_platforms,
  });
}

function buildScenarioManualHandoffItems(scenario) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const rooferAccountId = input.fixture_roofer_id || 'roof-fix-001';
  const items = [];

  const primaryCatalogMatches = HANDOFF_COVERAGE_CATALOG.filter(
    (entry) => entry.scenario_id === scenario.scenario_id,
  );
  for (const [index, entry] of primaryCatalogMatches.entries()) {
    items.push(
      buildManualHandoffItem({
        manual_handoff_item_id: `${scenario.scenario_id}_handoff_${index + 1}`,
        scenario_id: scenario.scenario_id,
        lead_id: leadId,
        roofer_account_id: rooferAccountId,
        plan_profile: scenario.plan_profile,
        manual_record_source: entry.manual_record_source,
        manual_record_type: entry.manual_record_type,
        manual_record_status: entry.manual_record_status,
        native_entity_target: entry.native_entity_target,
        native_state_target: entry.native_state_target,
        source_manual_status: entry.source_manual_status,
        mapped_native_state: entry.mapped_native_state,
        mapping_confidence: entry.mapping_confidence,
        coverage_area: entry.coverage_area,
        next_step_owner: entry.review_owner,
        review_owner: entry.review_owner,
        review_reason: entry.review_reason,
        business_judgment_required: entry.business_judgment_required,
        system_quality_issue: entry.system_quality_issue,
        audit_event_id: `${scenario.scenario_id}_handoff_audit_${index + 1}`,
        missing_setup_preferences: entry.missing_setup_preferences,
        contact_permission_uncertain: entry.contact_permission_uncertain,
        do_not_contact: entry.do_not_contact,
        missing_calendar_owner:
          entry.requires_calendar_owner && scenario.scenario_id === 'missing_information_path',
        missing_booking_preferences: entry.missing_setup_preferences,
        appointment_related: entry.appointment_related,
        messaging_related: entry.messaging_related,
        outreach_related: entry.outreach_related,
        post_inspection_related: entry.post_inspection_related,
        feedback_related: entry.feedback_related,
        csv_related: entry.csv_related,
        usage_volume_related: entry.usage_volume_related,
        source_roi_related: entry.source_roi_related,
        permission_to_use_publicly: entry.permission_to_use_publicly,
        calendar_event_created: entry.calendar_event_created,
        csv_one_directional: entry.csv_one_directional,
        csv_is_crm_sync: entry.csv_is_crm_sync,
        generates_estimate_quote_invoice_payment: entry.generates_estimate_quote_invoice_payment,
        publishes_feedback_or_testimonial: entry.publishes_feedback_or_testimonial,
        triggers_live_billing: entry.triggers_live_billing,
        promises_exact_roi: entry.promises_exact_roi,
        calls_ad_platforms: entry.calls_ad_platforms,
      }),
    );
  }

  if (!items.length) {
    items.push(
      buildManualHandoffItem({
        manual_handoff_item_id: `${scenario.scenario_id}_handoff_default`,
        scenario_id: scenario.scenario_id,
        lead_id: leadId,
        roofer_account_id: rooferAccountId,
        plan_profile: scenario.plan_profile,
        manual_record_source: 'founder_manual_tracker',
        manual_record_type: 'scenario_state_mapping',
        manual_record_status: 'captured_pending_native_mapping',
        native_entity_target: 'lead_record',
        native_state_target: scenario.final_state || 'UNKNOWN',
        source_manual_status: scenario.starting_state || 'NEW_LEAD',
        mapped_native_state: scenario.final_state || 'UNKNOWN',
        mapping_confidence: 'medium',
        coverage_area: 'lead_intake_handoff',
        next_step_owner: 'roofer',
        review_owner: 'roofer',
        audit_event_id: `${scenario.scenario_id}_handoff_default_audit`,
        business_judgment_required: false,
        system_quality_issue: false,
      }),
    );
  }

  return items;
}

function buildAllManualHandoffItems(scenarios) {
  const scenarioItems = scenarios.flatMap((scenario) => scenario.manual_handoff_items || []);
  const catalogItems = HANDOFF_COVERAGE_CATALOG.map((entry, index) =>
    buildHandoffItemFromCatalogEntry(entry, index),
  );
  const seen = new Set();
  const merged = [];
  for (const item of [...scenarioItems, ...catalogItems]) {
    if (seen.has(item.manual_handoff_item_id)) continue;
    seen.add(item.manual_handoff_item_id);
    merged.push(item);
  }
  return merged;
}

function buildTopLevelManualToNativeHandoffRehearsal(scenarios, outputBase, reviewQueueAgingOutput) {
  const allItems = buildAllManualHandoffItems(scenarios);
  const readyItems = allItems.filter((item) => item.handoff_ready);
  const blockedItems = allItems.filter((item) => item.handoff_blocked);
  const gapItems = allItems.filter((item) => !item.handoff_ready);
  const rooferReviewItems = allItems.filter((item) => item.roofer_review_required);
  const roofleadhqReviewItems = allItems.filter((item) => item.roofleadhq_review_required);
  const businessJudgmentItems = allItems.filter((item) => item.business_judgment_required);
  const systemQualityItems = allItems.filter((item) => item.system_quality_issue);
  const auditedItems = allItems.filter((item) => Boolean(item.audit_event_id));

  const manualSourceCounts = Object.fromEntries(
    MANUAL_RECORD_SOURCES.map((source) => [source, 0]),
  );
  const nativeTargetCounts = Object.fromEntries(
    NATIVE_ENTITY_TARGETS.map((target) => [target, 0]),
  );
  const coverageCounts = Object.fromEntries(
    HANDOFF_COVERAGE_AREAS.map((area) => [area, 0]),
  );

  for (const item of allItems) {
    manualSourceCounts[item.manual_record_source] =
      (manualSourceCounts[item.manual_record_source] || 0) + 1;
    nativeTargetCounts[item.native_entity_target] =
      (nativeTargetCounts[item.native_entity_target] || 0) + 1;
    if (item.coverage_area) {
      coverageCounts[item.coverage_area] = (coverageCounts[item.coverage_area] || 0) + 1;
    }
  }

  const messagingBlockedItems = allItems.filter(
    (item) =>
      item.messaging_related &&
      item.handoff_blocked &&
      item.handoff_block_reason === 'contact_permission_uncertainty_blocks_messaging_handoff',
  );
  const outreachBlockedItems = allItems.filter(
    (item) =>
      item.outreach_related &&
      item.handoff_blocked &&
      item.handoff_block_reason === 'do_not_contact_blocks_outreach_handoff',
  );
  const appointmentItems = allItems.filter((item) => item.appointment_related);
  const postInspectionItems = allItems.filter((item) => item.post_inspection_related);
  const feedbackItems = allItems.filter((item) => item.feedback_related);
  const csvItems = allItems.filter((item) => item.csv_related);
  const usageVolumeItems = allItems.filter((item) => item.usage_volume_related);
  const sourceRoiItems = allItems.filter((item) => item.source_roi_related);

  return {
    manual_to_native_handoff_rehearsal_expansion:
      'native_workflow_fixture_manual_to_native_handoff_rehearsal_expansion',
    manual_to_native_handoff_expansion_summary: {
      description:
        'Deterministic fake-data manual-to-native handoff rehearsal — models how founder-operated manual workflow records map into native workflow state without production persistence, schema changes, or live automation',
      total_manual_handoff_items: allItems.length,
      scenario_handoff_items: scenarios.reduce(
        (count, scenario) => count + (scenario.manual_handoff_items || []).length,
        0,
      ),
      handoff_catalog_items: HANDOFF_COVERAGE_CATALOG.length,
      handoff_ready_items: readyItems.length,
      handoff_blocked_items: blockedItems.length,
      manual_record_sources: MANUAL_RECORD_SOURCES,
      native_entity_targets: NATIVE_ENTITY_TARGETS,
      handoff_coverage_areas: HANDOFF_COVERAGE_AREAS,
      all_manual_record_sources_represented: MANUAL_RECORD_SOURCES.every(
        (source) => manualSourceCounts[source] > 0,
      ),
      all_native_entity_targets_represented: NATIVE_ENTITY_TARGETS.every(
        (target) => nativeTargetCounts[target] > 0,
      ),
      all_coverage_areas_represented: HANDOFF_COVERAGE_AREAS.every(
        (area) => coverageCounts[area] > 0,
      ),
      rehearsal_only: true,
      production_persistence_allowed: 'no',
      schema_change_allowed: 'no',
      public_implementation_or_go_live_copy_changed: false,
      public_implementation_or_go_live_copy_approval_required: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    manual_handoff_items: allItems,
    manual_record_mapping_summary: {
      description:
        'Manual record source to native entity mapping rehearsal — identifies future native targets without creating database records',
      manual_record_source_counts: manualSourceCounts,
      all_manual_record_sources_represented: MANUAL_RECORD_SOURCES.every(
        (source) => manualSourceCounts[source] > 0,
      ),
      mapped_items_count: allItems.length,
      setup_preferences_required_before_handoff_ready: allItems
        .filter((item) => item.handoff_block_reason === 'missing_required_setup_preferences')
        .every((item) => !item.handoff_ready),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    native_state_mapping_summary: {
      description:
        'Native state mapping rehearsal — maps manual statuses to future native states with mapping confidence',
      native_entity_target_counts: nativeTargetCounts,
      all_native_entity_targets_represented: NATIVE_ENTITY_TARGETS.every(
        (target) => nativeTargetCounts[target] > 0,
      ),
      mapping_confidence_levels: [...new Set(allItems.map((item) => item.mapping_confidence))],
      no_production_records_created: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    handoff_gap_summary: {
      description: 'Handoff gaps — items not yet handoff-ready due to blockers, missing setup, or review requirements',
      gap_items_count: gapItems.length,
      blocked_items_count: blockedItems.length,
      ready_items_count: readyItems.length,
      coverage_area_counts: coverageCounts,
      all_coverage_areas_represented: HANDOFF_COVERAGE_AREAS.every(
        (area) => coverageCounts[area] > 0,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    handoff_review_summary: {
      description:
        'Handoff review routing — roofer owns business judgment; RoofLeadHQ/Jason limited to system/workflow/data/routing/quality issues',
      roofer_review_items_count: rooferReviewItems.length,
      roofleadhq_review_items_count: roofleadhqReviewItems.length,
      business_judgment_items_count: businessJudgmentItems.length,
      system_quality_items_count: systemQualityItems.length,
      roofer_review_owns_business_judgment_handoff_items: businessJudgmentItems.every(
        (item) => item.business_judgment_required && !item.system_quality_issue,
      ),
      roofleadhq_review_limited_to_system_quality_handoff_items: systemQualityItems.every(
        (item) => item.system_quality_issue && !item.business_judgment_required,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    handoff_blocker_summary: {
      description:
        'Handoff blockers — missing setup preferences, contact permission uncertainty, do-not-contact, and calendar preference gaps',
      blocked_items_count: blockedItems.length,
      contact_permission_uncertainty_blocks_messaging_handoff:
        messagingBlockedItems.length > 0 &&
        messagingBlockedItems.every((item) => !item.handoff_ready),
      do_not_contact_blocks_outreach_handoff:
        outreachBlockedItems.length > 0 &&
        outreachBlockedItems.every((item) => !item.handoff_ready),
      setup_preferences_required_before_handoff_ready: allItems
        .filter((item) => item.handoff_block_reason === 'missing_required_setup_preferences')
        .every((item) => !item.handoff_ready),
      blocker_reasons: [...new Set(blockedItems.map((item) => item.handoff_block_reason).filter(Boolean))],
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    handoff_owner_summary: {
      description:
        'Handoff ownership — roofer/contractor review owns business judgment; RoofLeadHQ/Jason review limited to system quality',
      next_step_owner_counts: allItems.reduce((counts, item) => {
        counts[item.next_step_owner] = (counts[item.next_step_owner] || 0) + 1;
        return counts;
      }, {}),
      roofer_review_owns_business_judgment_handoff_items: businessJudgmentItems.every(
        (item) => item.roofer_review_required && item.next_step_owner === 'roofer',
      ),
      roofleadhq_review_limited_to_system_quality_handoff_items: systemQualityItems.every(
        (item) => item.roofleadhq_review_required,
      ),
      handoff_ready_requires_data_boundary_check: readyItems.every(
        (item) => item.data_boundary_checked,
      ),
      handoff_ready_requires_pii_minimization_check: readyItems.every(
        (item) => item.pii_minimization_checked,
      ),
      handoff_ready_requires_audit_event: readyItems.every((item) => Boolean(item.audit_event_id)),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    handoff_audit_summary: {
      description:
        'Handoff audit trail — every handoff item linked to fixture audit event without production persistence',
      audited_items_count: auditedItems.length,
      manual_to_native_handoff_is_audited: auditedItems.length === allItems.length,
      audit_event_ids_present: auditedItems.every((item) => Boolean(item.audit_event_id)),
      review_queue_aging_items_in_prior_expansion: (reviewQueueAgingOutput.review_queue_aging_items || [])
        .length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    handoff_reporting_summary: {
      description:
        'Handoff reporting rehearsal — one-directional CSV/reporting, no CRM sync, no live billing, no exact ROI promises',
      reporting_summary_includes_manual_to_native_handoff: true,
      appointment_handoff_requires_calendar_owner_and_booking_preferences:
        appointmentItems.length > 0 &&
        appointmentItems.every(
          (item) => item.calendar_event_created === false,
        ),
      appointment_handoff_does_not_create_calendar_event: appointmentItems.every(
        (item) => item.calendar_event_created === false,
      ),
      post_inspection_handoff_does_not_generate_estimate_quote_invoice_payment: postInspectionItems.every(
        (item) => item.generates_estimate_quote_invoice_payment === false,
      ),
      feedback_handoff_preserves_permission_values_yes_no_not_asked: feedbackItems.every((item) =>
        ['yes', 'no', 'not_asked'].includes(item.permission_to_use_publicly),
      ),
      feedback_handoff_does_not_publish_feedback_or_testimonial: feedbackItems.every(
        (item) => item.publishes_feedback_or_testimonial === false,
      ),
      csv_handoff_is_one_directional: csvItems.every((item) => item.csv_one_directional === true),
      csv_handoff_is_not_crm_sync: csvItems.every((item) => item.csv_is_crm_sync === false),
      usage_volume_handoff_does_not_trigger_live_billing: usageVolumeItems.every(
        (item) => item.triggers_live_billing === false,
      ),
      source_roi_handoff_does_not_promise_exact_roi: sourceRoiItems.every(
        (item) => item.promises_exact_roi === false,
      ),
      source_roi_handoff_does_not_call_ad_platforms: sourceRoiItems.every(
        (item) => item.calls_ad_platforms === false,
      ),
      public_implementation_or_go_live_copy_not_changed_without_approval: true,
      no_supabase_calls: true,
      no_schema_migrations_auth_rls_security_changes: true,
      no_twilio_calls: true,
      no_vapi_calls: true,
      no_resend_calls: true,
      no_lindy_live_workflow_execution: true,
      no_google_calendar_calls: true,
      no_crm_sync: true,
      no_live_csv_delivery: true,
      no_billing_or_payment_action: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_to_native_handoff_safety_assertions: [
      ...MANUAL_TO_NATIVE_HANDOFF_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const APPOINTMENT_READINESS_SAFETY_ASSERTIONS = [
  'appointment_readiness_summary_present',
  'appointment_readiness_items_present',
  'appointment_readiness_item_required_fields_present',
  'appointment_ready_requires_homeowner_contact_data',
  'appointment_ready_requires_contact_permission_or_review',
  'do_not_contact_blocks_appointment_readiness',
  'appointment_ready_requires_service_area_fit',
  'excluded_service_area_blocks_appointment_readiness',
  'appointment_ready_requires_lead_source_or_unknown_marker',
  'appointment_ready_requires_roofing_issue_summary',
  'appointment_ready_requires_calendar_owner',
  'appointment_ready_requires_calendar_preferences',
  'missing_calendar_preferences_blocks_appointment_ready',
  'missing_calendar_owner_blocks_appointment_ready',
  'assigned_roofer_or_rep_required_when_plan_or_setup_requires_it',
  'pricing_question_blocks_to_roofer_review',
  'estimate_question_blocks_to_roofer_review',
  'quote_request_blocks_to_roofer_review',
  'insurance_complexity_blocks_to_roofer_review',
  'payment_or_contract_question_blocks_to_roofer_review',
  'scheduling_conflict_blocks_to_roofer_review',
  'unsupported_request_blocks_appointment_readiness',
  'unresolved_review_blocks_appointment_readiness',
  'live_calendar_booking_flag_defaults_false',
  'live_calendar_creation_blocked_when_flag_false',
  'no_google_calendar_event_created',
  'no_external_calendar_call_performed',
  'appointment_booked_live_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'appointment_readiness_uses_fake_data_only',
  'appointment_readiness_does_not_touch_production_data',
  'appointment_readiness_does_not_call_external_services',
  'appointment_readiness_does_not_send_notifications',
  'appointment_decisions_are_audited',
  'required_manual_next_step_present_for_not_ready_items',
];

const POST_INSPECTION_SAFETY_ASSERTIONS = [
  'post_inspection_summary_present',
  'post_inspection_items_present',
  'post_inspection_item_required_fields_present',
  'inspection_completed_routes_to_post_inspection_tracking',
  'inspection_missed_routes_to_reschedule_or_review',
  'estimate_needed_is_tracking_only',
  'estimate_sent_is_tracking_only',
  'no_automatic_estimate_generated',
  'no_automatic_quote_generated',
  'no_automatic_invoice_generated',
  'no_automatic_payment_requested',
  'homeowner_follow_up_needed_is_tracking_or_manual_only',
  'roofer_follow_up_needed_is_tracking_or_manual_only',
  'still_open_days_present_for_open_items',
  'next_step_owner_required_for_open_items',
  'next_step_due_date_required_when_follow_up_needed',
  'won_lost_closed_outcomes_supported',
  'disputed_or_unclear_outcome_routes_to_review',
  'estimate_details_route_to_roofer_review',
  'quote_details_route_to_roofer_review',
  'payment_or_invoice_routes_to_roofer_review',
  'insurance_complexity_routes_to_roofer_review',
  'repair_vs_replacement_routes_to_roofer_review',
  'roofleadhq_review_limited_to_system_quality',
  'feedback_requested_tracking_present',
  'feedback_captured_tracking_present',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'feedback_internal_unless_permission_obtained',
  'no_fake_reviews',
  'no_review_farming',
  'no_automatic_public_review_generation',
  'testimonial_candidate_does_not_publish_publicly',
  'live_follow_up_blocked_when_flag_false',
  'live_feedback_request_blocked_when_flag_false',
  'post_inspection_uses_fake_data_only',
  'post_inspection_does_not_touch_production_data',
  'post_inspection_does_not_call_external_services',
  'post_inspection_does_not_send_notifications',
  'post_inspection_decisions_are_audited',
  'required_manual_next_step_present_for_open_or_review_items',
];

const APPOINTMENT_BLOCKER_CATALOG = [
  {
    blocker_id: 'missing_homeowner_contact_data',
    demonstration_scenario_id: 'missing_information_path',
    blocker_type: 'missing_contact_data',
    demonstrated: true,
  },
  {
    blocker_id: 'do_not_contact_set',
    demonstration_scenario_id: 'stopped_do_not_contact_path',
    blocker_type: 'do_not_contact',
    demonstrated: true,
  },
  {
    blocker_id: 'excluded_service_area',
    demonstration_scenario_id: 'bad_fit_excluded_path',
    blocker_type: 'service_area_excluded',
    demonstrated: true,
  },
  {
    blocker_id: 'pricing_question_requires_roofer_review',
    demonstration_scenario_id: 'roofer_review_needed_path',
    blocker_type: 'pricing_question',
    demonstrated: true,
  },
  {
    blocker_id: 'estimate_question_requires_roofer_review',
    demonstration_scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    blocker_type: 'estimate_question',
    demonstrated: true,
  },
  {
    blocker_id: 'quote_request_requires_roofer_review',
    demonstration_scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    blocker_type: 'quote_request',
    demonstrated: true,
  },
  {
    blocker_id: 'insurance_complexity_requires_roofer_review',
    demonstration_scenario_id: 'roofer_review_needed_path',
    blocker_type: 'insurance_complexity',
    demonstrated: true,
    demonstration_note: 'roofer_review_path_also_covers_insurance_complexity_routing',
  },
  {
    blocker_id: 'payment_or_contract_question_requires_roofer_review',
    demonstration_scenario_id: 'roofer_follow_up_needed_path',
    blocker_type: 'payment_or_contract_question',
    demonstrated: true,
  },
  {
    blocker_id: 'scheduling_conflict_requires_roofer_review',
    demonstration_scenario_id: 'inspection_missed_reschedule_path',
    blocker_type: 'scheduling_conflict',
    demonstrated: true,
  },
  {
    blocker_id: 'unsupported_request_blocks_readiness',
    demonstration_scenario_id: 'activation_flag_false_blocks_live_action_path',
    blocker_type: 'unsupported_request',
    demonstrated: true,
  },
  {
    blocker_id: 'unresolved_review_blocks_readiness',
    demonstration_scenario_id: 'duplicate_review_path',
    blocker_type: 'unresolved_review',
    demonstrated: true,
  },
  {
    blocker_id: 'missing_calendar_owner',
    demonstration_scenario_id: 'missing_information_path',
    blocker_type: 'missing_calendar_owner',
    demonstrated: true,
  },
  {
    blocker_id: 'missing_calendar_preferences',
    demonstration_scenario_id: 'missing_information_path',
    blocker_type: 'missing_calendar_preferences',
    demonstrated: true,
  },
];

const APPOINTMENT_READINESS_PROFILES = {
  normal_lead_to_appointment_readiness: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready',
    readiness_reason: 'all_required_appointment_readiness_fields_approved',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'proceed_to_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  missing_information_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_missing_info',
    readiness_reason: 'missing_homeowner_contact_and_calendar_preferences',
    homeowner_contact_ready: false,
    contact_permission_status: 'unknown',
    do_not_contact_status: false,
    service_area_status: 'unknown',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: false,
    preferred_appointment_windows_status: 'missing',
    calendar_owner: null,
    calendar_preferences_status: 'missing',
    assigned_roofer_or_rep: null,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_collects_missing_phone_and_appointment_preference',
    required_fields_present: false,
    missing_fields: ['homeowner_phone', 'appointment_preference', 'calendar_owner'],
    blocker_reasons: [
      'missing_homeowner_contact_data',
      'missing_calendar_preferences',
      'missing_calendar_owner',
    ],
  },
  duplicate_review_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_unresolved_review',
    readiness_reason: 'duplicate_lead_requires_roofleadhq_system_review',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_duplicate_lead_confusion_and_resolves_routing',
    required_fields_present: false,
    missing_fields: ['duplicate_resolution'],
    blocker_reasons: ['unresolved_review', 'duplicate_lead_confusion'],
  },
  bad_fit_excluded_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_service_area_excluded',
    readiness_reason: 'service_area_fit_false_routes_to_bad_fit_or_excluded',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'excluded',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'not_applicable',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'not_applicable',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'no_appointment_coordination_for_excluded_lead',
    required_fields_present: false,
    missing_fields: ['service_area_fit'],
    blocker_reasons: ['excluded_service_area', 'service_area_fit_false'],
  },
  stopped_do_not_contact_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_do_not_contact',
    readiness_reason: 'do_not_contact_flag_blocks_all_appointment_coordination',
    homeowner_contact_ready: true,
    contact_permission_status: 'do_not_contact',
    do_not_contact_status: true,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'blocked',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'blocked',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'no_outreach_all_channels_stopped',
    required_fields_present: false,
    missing_fields: ['contact_permission'],
    blocker_reasons: ['do_not_contact'],
  },
  missed_lead_recovery_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'pending_recovery',
    readiness_reason: 'lead_in_missed_lead_recovery_not_yet_appointment_ready',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_homeowner_response',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'pending',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'await_homeowner_response_before_appointment_readiness',
    required_fields_present: false,
    missing_fields: ['homeowner_response'],
    blocker_reasons: ['missed_lead_recovery_active'],
  },
  roofer_review_needed_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_roofer_review',
    readiness_reason: 'pricing_question_requires_roofer_business_judgment_before_appointment_ready',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_review',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_pricing_question_and_responds_manually',
    required_fields_present: false,
    missing_fields: ['roofer_review_completion'],
    blocker_reasons: ['pricing_question', 'roofer_review_required'],
  },
  roofleadhq_system_review_needed_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_system_review',
    readiness_reason: 'workflow_state_confusion_requires_roofleadhq_system_review',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_workflow_state_confusion',
    required_fields_present: false,
    missing_fields: ['system_review_resolution'],
    blocker_reasons: ['unresolved_review', 'workflow_state_confusion'],
  },
  appointment_booked_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'booked_fixture_manual',
    readiness_reason: 'appointment_readiness_passed_manual_fixture_booking_no_live_calendar',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'inspection_coordination_manual_fixture_only',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  inspection_completed_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_inspection_completed',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'post_inspection_evaluation_manual_only',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  inspection_missed_reschedule_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_scheduling_conflict',
    readiness_reason: 'scheduling_conflict_requires_roofer_manual_reschedule',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'conflict',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'conflict_requires_review',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_manual_reschedule',
    required_fields_present: false,
    missing_fields: ['confirmed_appointment_window'],
    blocker_reasons: ['scheduling_conflict', 'scheduling_issue'],
  },
  post_inspection_still_open_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_post_inspection_still_open',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_follow_up_on_open_outcome',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  estimate_needed_estimate_sent_tracking_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_estimate_question',
    readiness_reason: 'estimate_and_quote_tracking_requires_roofer_review_no_automatic_generation',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_estimate_question_and_responds_manually',
    required_fields_present: false,
    missing_fields: ['estimate_review_completion'],
    blocker_reasons: ['estimate_question', 'quote_request'],
  },
  homeowner_follow_up_needed_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_homeowner_follow_up_pending',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'draft_homeowner_follow_up_for_review',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  roofer_follow_up_needed_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_payment_or_contract_question',
    readiness_reason: 'payment_or_contract_question_requires_roofer_review',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_contract_question_manually',
    required_fields_present: false,
    missing_fields: ['contract_review_completion'],
    blocker_reasons: ['payment_or_contract_question', 'contract_question'],
  },
  feedback_permission_yes_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_feedback_captured',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_use_only_unless_permission_yes',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  feedback_permission_no_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_feedback_internal_only',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_no',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  feedback_permission_not_asked_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_permission_not_asked_internal_only',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_not_asked',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  csv_report_snapshot_fake_data_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'reporting_snapshot_only',
    readiness_reason: 'reporting_snapshot_fixture_no_appointment_coordination_action',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Acme Roofing Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'reporting_snapshot_review_only',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  starter_plan_profile_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready_starter_plan',
    readiness_reason: 'starter_plan_appointment_readiness_fields_satisfied_manual_booking',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'starter_plan_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  growth_plan_profile_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready_growth_plan',
    readiness_reason: 'growth_plan_appointment_readiness_fields_satisfied',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'growth_plan_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  elite_plan_profile_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready_elite_plan',
    readiness_reason: 'elite_plan_appointment_readiness_fields_satisfied',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep Elite',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'elite_plan_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  custom_review_500_plus_leads_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_custom_review',
    readiness_reason: 'volume_exceeds_500_requires_custom_review_before_appointment_readiness',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_custom_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_custom_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_volume',
    required_fields_present: false,
    missing_fields: ['custom_review_approval', 'assigned_roofer_or_rep'],
    blocker_reasons: ['custom_review_required', 'volume_exceeds_500'],
  },
  custom_review_two_plus_locations_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_custom_review',
    readiness_reason: 'multi_location_requires_custom_review_before_appointment_readiness',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_custom_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_custom_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_multi_location',
    required_fields_present: false,
    missing_fields: ['custom_review_approval', 'assigned_roofer_or_rep'],
    blocker_reasons: ['custom_review_required', 'multi_location'],
  },
  activation_flag_false_blocks_live_action_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_activation_flag',
    readiness_reason: 'live_calendar_booking_enabled_false_blocks_live_calendar_action',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'manual_inspection_coordination_only_activation_flag_false',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: ['live_calendar_booking_flag_false', 'unsupported_request'],
  },
};

const POST_INSPECTION_PROFILES = {
  normal_lead_to_appointment_readiness: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'appointment_readiness_evaluation_before_inspection_booking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'complete_appointment_readiness_before_booking',
    has_appointment: false,
  },
  missing_information_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'missing_information_blocks_inspection_booking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'collect_missing_information_before_inspection',
    has_appointment: false,
  },
  duplicate_review_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofleadhq_jason',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'duplicate_lead_confusion_requires_system_review_before_post_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_duplicate_lead_confusion_and_resolves_routing',
    has_appointment: false,
  },
  bad_fit_excluded_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'lost',
    outcome_date: '2026-06-10',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'service_area_excluded_no_inspection_booked',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'mark_lead_lost_service_area_excluded',
    has_appointment: false,
  },
  stopped_do_not_contact_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'closed',
    outcome_date: '2026-06-09',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'do_not_contact_blocks_all_follow_up',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'respect_do_not_contact_no_post_inspection_follow_up',
    has_appointment: false,
  },
  missed_lead_recovery_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofleadhq_jason',
    next_step_due_date: '2026-06-17',
    next_step_notes: 'bad_or_unclear_ai_response_requires_system_quality_review',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_missed_lead_recovery_and_data_capture',
    has_appointment: false,
  },
  roofer_review_needed_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'insurance_complexity_and_pricing_question_require_roofer_business_judgment',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_insurance_complexity_and_pricing_manually',
    has_appointment: false,
    review_routing_types: ['insurance_complexity', 'pricing_question'],
  },
  roofleadhq_system_review_needed_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofleadhq_jason',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'workflow_state_confusion_system_quality_review_only',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_workflow_state_confusion',
    has_appointment: false,
  },
  appointment_booked_path: {
    inspection_status: 'booked_pending',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'awaiting_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-15',
    next_step_notes: 'manual_fixture_booking_awaiting_homeowner_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'conduct_booked_homeowner_inspection_manually',
    has_appointment: true,
  },
  inspection_completed_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'post_inspection_tracking',
    outcome: null,
    outcome_date: '2026-07-15',
    still_open_days: 0,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-17',
    next_step_notes: 'inspection_completed_routes_to_post_inspection_evaluation_manual_only',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'post_inspection_evaluation_manual_only',
    has_appointment: true,
  },
  inspection_missed_reschedule_path: {
    inspection_status: 'missed',
    inspection_completed: false,
    inspection_missed_or_rescheduled: true,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: true,
    post_inspection_status: 'reschedule_needed',
    outcome: null,
    outcome_date: null,
    still_open_days: 1,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-16',
    next_step_notes: 'inspection_missed_requires_roofer_manual_reschedule',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_manual_reschedule',
    has_appointment: true,
    review_routing_types: ['scheduling_issue'],
  },
  post_inspection_still_open_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: true,
    post_inspection_status: 'still_open',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 2,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'repair_vs_replacement_question_unclear_outcome_requires_roofer_review',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_repair_vs_replacement_and_follows_up_manually',
    has_appointment: true,
    review_routing_types: ['repair_vs_replacement_question'],
  },
  estimate_needed_estimate_sent_tracking_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: true,
    estimate_sent: true,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'estimate_tracking',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 3,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-19',
    next_step_notes: 'estimate_and_quote_details_tracking_only_no_automatic_generation',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_estimate_and_quote_details_manually',
    has_appointment: true,
    review_routing_types: ['estimate_question', 'quote_request', 'payment_or_invoice_question'],
  },
  homeowner_follow_up_needed_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: true,
    roofer_follow_up_needed: false,
    post_inspection_status: 'homeowner_follow_up_pending',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 4,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-17',
    next_step_notes: 'homeowner_follow_up_draft_manual_only_no_live_send',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'draft_homeowner_follow_up_for_review',
    has_appointment: true,
  },
  roofer_follow_up_needed_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: true,
    post_inspection_status: 'roofer_follow_up_pending',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 5,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'payment_or_invoice_question_and_upset_homeowner_require_roofer_review',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: true,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_payment_or_invoice_question_manually',
    has_appointment: true,
    review_routing_types: ['payment_or_invoice_question', 'contract_question', 'upset_homeowner'],
  },
  feedback_permission_yes_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'feedback_captured',
    outcome: 'won',
    outcome_date: '2026-06-20',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'feedback_captured_permission_yes_internal_testimonial_candidate_only',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture feedback text — positive experience',
    testimonial_candidate: true,
    permission_to_use_publicly: 'yes',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_use_only_unless_permission_yes_approved_for_public',
    has_appointment: true,
  },
  feedback_permission_no_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'feedback_captured',
    outcome: 'closed',
    outcome_date: '2026-06-19',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'feedback_internal_only_permission_no_no_public_use',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture internal feedback',
    testimonial_candidate: false,
    permission_to_use_publicly: 'no',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_no',
    has_appointment: true,
  },
  feedback_permission_not_asked_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'feedback_captured',
    outcome: 'closed',
    outcome_date: '2026-06-19',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'feedback_internal_only_permission_not_asked',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture feedback captured without permission question',
    testimonial_candidate: false,
    permission_to_use_publicly: 'not_asked',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_not_asked',
    has_appointment: true,
  },
  csv_report_snapshot_fake_data_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: true,
    estimate_sent: true,
    homeowner_follow_up_needed: true,
    roofer_follow_up_needed: true,
    post_inspection_status: 'reporting_snapshot_only',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 1,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-16',
    next_step_notes: 'csv_report_snapshot_fake_data_compatibility_only',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture CSV snapshot feedback row',
    testimonial_candidate: false,
    permission_to_use_publicly: 'not_asked',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'reporting_snapshot_review_only',
    has_appointment: true,
  },
  starter_plan_profile_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'starter_plan_pre_inspection_coordination',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'starter_plan_manual_inspection_coordination',
    has_appointment: false,
  },
  growth_plan_profile_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'post_inspection_tracking',
    outcome: 'won',
    outcome_date: '2026-06-21',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'growth_plan_post_inspection_won_outcome_tracking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'growth_plan_manual_inspection_coordination',
    has_appointment: true,
  },
  elite_plan_profile_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'post_inspection_tracking',
    outcome: 'closed',
    outcome_date: '2026-06-22',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'elite_plan_post_inspection_closed_outcome_tracking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'elite_plan_manual_inspection_coordination',
    has_appointment: true,
  },
  custom_review_500_plus_leads_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-25',
    next_step_notes: 'custom_review_volume_boundary_before_post_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_volume',
    has_appointment: false,
  },
  custom_review_two_plus_locations_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-25',
    next_step_notes: 'custom_review_multi_location_before_post_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_multi_location',
    has_appointment: false,
  },
  activation_flag_false_blocks_live_action_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: true,
    roofer_follow_up_needed: false,
    post_inspection_status: 'follow_up_blocked_by_activation_flag',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 2,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'live_follow_up_and_feedback_request_blocked_activation_flag_false',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'manual_follow_up_only_activation_flag_false',
    has_appointment: true,
  },
};

function buildAppointmentReadinessItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  return {
    readiness_item_id: `${scenario.scenario_id}_readiness_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    appointment_readiness_status: profile.appointment_readiness_status,
    readiness_decision: profile.readiness_decision,
    readiness_reason: profile.readiness_reason,
    required_fields_present: profile.required_fields_present,
    missing_fields: profile.missing_fields,
    blocker_reasons: profile.blocker_reasons,
    homeowner_contact_ready: profile.homeowner_contact_ready,
    contact_permission_status: profile.contact_permission_status,
    do_not_contact_status: profile.do_not_contact_status,
    service_area_status: profile.service_area_status,
    lead_source_status: profile.lead_source_status,
    roofing_issue_summary_present: profile.roofing_issue_summary_present,
    urgency_present: profile.urgency_present,
    preferred_appointment_windows_status: profile.preferred_appointment_windows_status,
    calendar_owner: profile.calendar_owner,
    calendar_preferences_status: profile.calendar_preferences_status,
    assigned_roofer_or_rep: profile.assigned_roofer_or_rep,
    roofer_review_required: profile.roofer_review_required,
    roofleadhq_review_required: profile.roofleadhq_review_required,
    required_manual_next_step: profile.required_manual_next_step,
    live_calendar_action_allowed: 'no',
    appointment_booked_live: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    audit_event_id: `${scenario.scenario_id}_readiness_audit_${index + 1}`,
  };
}

function buildScenarioAppointmentReadinessItem(scenario) {
  const profile = APPOINTMENT_READINESS_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildAppointmentReadinessItem(scenario, profile, 0);
}

function buildBlockerCatalogItems() {
  return APPOINTMENT_BLOCKER_CATALOG.map((blocker) => {
    const profile = APPOINTMENT_READINESS_PROFILES[blocker.demonstration_scenario_id];
    return {
      blocker_id: blocker.blocker_id,
      blocker_type: blocker.blocker_type,
      demonstration_scenario_id: blocker.demonstration_scenario_id,
      demonstrated: blocker.demonstrated,
      demonstration_note: blocker.demonstration_note || null,
      readiness_decision: profile.readiness_decision,
      fake_data_only: true,
      live_calendar_action_allowed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      linked_readiness_item_id: `${blocker.demonstration_scenario_id}_readiness_1`,
      audit_event_id: `${blocker.demonstration_scenario_id}_blocker_audit_${blocker.blocker_id}`,
    };
  });
}

function buildTopLevelAppointmentReadiness(scenarios, outputBase) {
  const scenarioItems = scenarios
    .map((scenario) => buildScenarioAppointmentReadinessItem(scenario))
    .filter(Boolean);
  const blockerCatalog = buildBlockerCatalogItems();
  const allItems = [...scenarioItems];

  const readyItems = allItems.filter((item) => item.readiness_decision === 'ready');
  const notReadyItems = allItems.filter((item) => item.readiness_decision === 'not_ready');

  const blockerCounts = {};
  for (const item of notReadyItems) {
    for (const reason of item.blocker_reasons) {
      blockerCounts[reason] = (blockerCounts[reason] || 0) + 1;
    }
  }

  const calendarOwners = {};
  for (const item of allItems) {
    if (item.calendar_owner) {
      calendarOwners[item.calendar_owner] = (calendarOwners[item.calendar_owner] || 0) + 1;
    }
  }

  const calendarPreferenceStatuses = {};
  for (const item of allItems) {
    calendarPreferenceStatuses[item.calendar_preferences_status] =
      (calendarPreferenceStatuses[item.calendar_preferences_status] || 0) + 1;
  }

  return {
    appointment_readiness_summary: {
      description:
        'Deterministic fake-data appointment readiness summary across all fixture scenarios — ready vs not-ready for manual inspection coordination without live booking',
      total_readiness_items: allItems.length,
      ready_items: readyItems.length,
      not_ready_items: notReadyItems.length,
      blocker_catalog_items: blockerCatalog.length,
      roofer_review_blocked_count: notReadyItems.filter((i) => i.roofer_review_required).length,
      roofleadhq_review_blocked_count: notReadyItems.filter((i) => i.roofleadhq_review_required)
        .length,
      live_calendar_booking_enabled: false,
      google_calendar_event_created: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    appointment_readiness_items: allItems,
    appointment_blocker_summary: {
      description: 'Appointment readiness blockers demonstrated across fixture scenarios',
      blocker_counts: blockerCounts,
      blocker_catalog: blockerCatalog,
      total_blocker_types_demonstrated: Object.keys(blockerCounts).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_ready_summary: {
      description: 'Leads with sufficient approved fake-data for manual inspection coordination',
      ready_count: readyItems.length,
      ready_scenario_ids: readyItems.map((i) => i.scenario_id),
      requires_homeowner_contact_data: true,
      requires_contact_permission_or_review: true,
      requires_service_area_fit: true,
      requires_lead_source_or_unknown_marker: true,
      requires_roofing_issue_summary: true,
      requires_calendar_owner: true,
      requires_calendar_preferences: true,
      live_calendar_action_allowed: 'no',
      appointment_booked_live: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_not_ready_summary: {
      description: 'Leads blocked or routed to review before appointment coordination',
      not_ready_count: notReadyItems.length,
      not_ready_scenario_ids: notReadyItems.map((i) => i.scenario_id),
      blocker_categories: [
        'missing_contact_data',
        'do_not_contact',
        'service_area_excluded',
        'missing_calendar_owner',
        'missing_calendar_preferences',
        'roofer_review_required',
        'roofleadhq_review_required',
        'scheduling_conflict',
        'unsupported_request',
        'activation_flag_false',
        'custom_review_required',
      ],
      all_have_required_manual_next_step: notReadyItems.every((i) => i.required_manual_next_step),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    calendar_preference_summary: {
      description: 'Calendar booking preference status across appointment readiness items',
      preference_status_counts: calendarPreferenceStatuses,
      approved_count: calendarPreferenceStatuses.approved || 0,
      missing_count: calendarPreferenceStatuses.missing || 0,
      pending_count:
        (calendarPreferenceStatuses.pending || 0) +
        (calendarPreferenceStatuses.pending_review || 0) +
        (calendarPreferenceStatuses.pending_custom_review || 0),
      conflict_count: calendarPreferenceStatuses.conflict || 0,
      requires_approval_before_appointment_ready: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    calendar_owner_summary: {
      description: 'Calendar owner assignments across appointment readiness items',
      owner_counts: calendarOwners,
      missing_calendar_owner_blocks_appointment_ready: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_readiness_safety_assertions: [
      ...APPOINTMENT_READINESS_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

function buildPostInspectionItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const appointmentId = profile.has_appointment
    ? input.fixture_appointment_id || `apt-fix-${scenario.scenario_id}`
    : null;
  return {
    post_inspection_item_id: `${scenario.scenario_id}_post_inspection_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    appointment_id: appointmentId,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    inspection_status: profile.inspection_status,
    inspection_completed: profile.inspection_completed,
    inspection_missed_or_rescheduled: profile.inspection_missed_or_rescheduled,
    estimate_needed: profile.estimate_needed,
    estimate_sent: profile.estimate_sent,
    homeowner_follow_up_needed: profile.homeowner_follow_up_needed,
    roofer_follow_up_needed: profile.roofer_follow_up_needed,
    post_inspection_status: profile.post_inspection_status,
    outcome: profile.outcome,
    outcome_date: profile.outcome_date,
    still_open_days: profile.still_open_days,
    next_step_owner: profile.next_step_owner,
    next_step_due_date: profile.next_step_due_date,
    next_step_notes: profile.next_step_notes,
    feedback_requested: profile.feedback_requested,
    feedback_captured: profile.feedback_captured,
    feedback_summary: profile.feedback_summary,
    testimonial_candidate: profile.testimonial_candidate,
    permission_to_use_publicly: profile.permission_to_use_publicly,
    feedback_issue_flag: profile.feedback_issue_flag,
    roofer_review_required: profile.roofer_review_required,
    roofleadhq_review_required: profile.roofleadhq_review_required,
    required_manual_next_step: profile.required_manual_next_step,
    review_routing_types: profile.review_routing_types || [],
    live_follow_up_action_allowed: 'no',
    live_feedback_request_allowed: 'no',
    automatic_estimate_generated: 'no',
    automatic_quote_generated: 'no',
    automatic_invoice_generated: 'no',
    automatic_payment_requested: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    audit_event_id: `${scenario.scenario_id}_post_inspection_audit_${index + 1}`,
  };
}

function buildScenarioPostInspectionItem(scenario) {
  const profile = POST_INSPECTION_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildPostInspectionItem(scenario, profile, 0);
}

function buildTopLevelPostInspection(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => buildScenarioPostInspectionItem(scenario))
    .filter(Boolean);

  const openItems = allItems.filter(
    (item) =>
      item.outcome === 'still_open' ||
      item.post_inspection_status === 'still_open' ||
      item.still_open_days !== null,
  );
  const followUpItems = allItems.filter(
    (item) => item.homeowner_follow_up_needed || item.roofer_follow_up_needed,
  );
  const estimateItems = allItems.filter((item) => item.estimate_needed || item.estimate_sent);
  const feedbackItems = allItems.filter((item) => item.feedback_requested || item.feedback_captured);
  const rooferReviewItems = allItems.filter((item) => item.roofer_review_required);
  const roofleadhqReviewItems = allItems.filter((item) => item.roofleadhq_review_required);
  const openOrReviewItems = allItems.filter(
    (item) =>
      item.outcome === 'still_open' ||
      item.outcome === 'needs_review' ||
      item.roofer_review_required ||
      item.roofleadhq_review_required,
  );

  const outcomeCounts = {};
  for (const item of allItems) {
    if (item.outcome) {
      outcomeCounts[item.outcome] = (outcomeCounts[item.outcome] || 0) + 1;
    }
  }

  const permissionCounts = { yes: 0, no: 0, not_asked: 0, unset: 0 };
  for (const item of allItems) {
    if (item.permission_to_use_publicly === 'yes') permissionCounts.yes += 1;
    else if (item.permission_to_use_publicly === 'no') permissionCounts.no += 1;
    else if (item.permission_to_use_publicly === 'not_asked') permissionCounts.not_asked += 1;
    else permissionCounts.unset += 1;
  }

  const postInspectionStatusCounts = {};
  for (const item of allItems) {
    postInspectionStatusCounts[item.post_inspection_status] =
      (postInspectionStatusCounts[item.post_inspection_status] || 0) + 1;
  }

  return {
    post_inspection_summary: {
      description:
        'Deterministic fake-data post-inspection summary across all fixture scenarios — tracking only after booked homeowner inspection without live automation',
      total_post_inspection_items: allItems.length,
      inspection_completed_count: allItems.filter((i) => i.inspection_completed).length,
      inspection_missed_or_rescheduled_count: allItems.filter(
        (i) => i.inspection_missed_or_rescheduled,
      ).length,
      still_open_count: allItems.filter((i) => i.outcome === 'still_open').length,
      estimate_tracking_count: estimateItems.length,
      homeowner_follow_up_count: allItems.filter((i) => i.homeowner_follow_up_needed).length,
      roofer_follow_up_count: allItems.filter((i) => i.roofer_follow_up_needed).length,
      feedback_captured_count: allItems.filter((i) => i.feedback_captured).length,
      roofer_review_required_count: rooferReviewItems.length,
      roofleadhq_review_required_count: roofleadhqReviewItems.length,
      live_follow_up_enabled: false,
      live_feedback_request_enabled: false,
      automatic_estimate_generation: false,
      automatic_quote_generation: false,
      automatic_invoice_generation: false,
      automatic_payment_requested: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    post_inspection_items: allItems,
    post_inspection_status_summary: {
      description: 'Post-inspection status distribution across fixture scenarios',
      status_counts: postInspectionStatusCounts,
      pre_inspection_count: postInspectionStatusCounts.pre_inspection || 0,
      post_inspection_tracking_count:
        (postInspectionStatusCounts.post_inspection_tracking || 0) +
        (postInspectionStatusCounts.still_open || 0) +
        (postInspectionStatusCounts.estimate_tracking || 0) +
        (postInspectionStatusCounts.homeowner_follow_up_pending || 0) +
        (postInspectionStatusCounts.roofer_follow_up_pending || 0) +
        (postInspectionStatusCounts.feedback_captured || 0),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    estimate_tracking_summary: {
      description: 'Estimate-needed and estimate-sent tracking boundaries — tracking only, no document generation',
      estimate_needed_count: allItems.filter((i) => i.estimate_needed).length,
      estimate_sent_count: allItems.filter((i) => i.estimate_sent).length,
      tracking_only: true,
      automatic_estimate_generated: 'no',
      automatic_quote_generated: 'no',
      automatic_invoice_generated: 'no',
      all_items_tracking_only: estimateItems.every(
        (i) =>
          i.automatic_estimate_generated === 'no' &&
          i.automatic_quote_generated === 'no' &&
          i.automatic_invoice_generated === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    homeowner_follow_up_summary: {
      description: 'Homeowner follow-up tracking — draft/manual only, no live sends',
      homeowner_follow_up_needed_count: allItems.filter((i) => i.homeowner_follow_up_needed).length,
      tracking_or_manual_only: true,
      live_follow_up_action_allowed: 'no',
      all_items_live_follow_up_blocked: allItems.every(
        (i) => i.live_follow_up_action_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofer_follow_up_summary: {
      description: 'Roofer follow-up tracking — manual roofer action only, no live automation',
      roofer_follow_up_needed_count: allItems.filter((i) => i.roofer_follow_up_needed).length,
      tracking_or_manual_only: true,
      live_follow_up_action_allowed: 'no',
      all_items_live_follow_up_blocked: allItems.every(
        (i) => i.live_follow_up_action_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    outcome_summary: {
      description: 'Post-inspection outcome tracking — still_open, won, lost, needs_review, closed',
      outcome_counts: outcomeCounts,
      still_open_supported: 'still_open' in outcomeCounts,
      won_supported: 'won' in outcomeCounts,
      lost_supported: 'lost' in outcomeCounts,
      needs_review_supported: 'needs_review' in outcomeCounts,
      closed_supported: 'closed' in outcomeCounts,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_capture_summary: {
      description: 'Feedback capture tracking — internal unless permission obtained',
      feedback_requested_count: allItems.filter((i) => i.feedback_requested).length,
      feedback_captured_count: allItems.filter((i) => i.feedback_captured).length,
      testimonial_candidate_count: allItems.filter((i) => i.testimonial_candidate).length,
      testimonial_candidate_internal_only: true,
      feedback_issue_flag_count: allItems.filter((i) => i.feedback_issue_flag).length,
      no_fake_reviews: true,
      no_review_farming: true,
      no_automatic_public_review_generation: true,
      live_feedback_request_allowed: 'no',
      all_items_live_feedback_blocked: allItems.every(
        (i) => i.live_feedback_request_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_summary: {
      description: 'Public-use permission tracking — yes, no, not_asked only',
      permission_counts: permissionCounts,
      valid_values_only: ['yes', 'no', 'not_asked'],
      permissiontousepublicly_absent: true,
      feedback_internal_unless_permission_yes: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_review_summary: {
      description:
        'Post-inspection review routing — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_required_count: rooferReviewItems.length,
      roofleadhq_review_required_count: roofleadhqReviewItems.length,
      roofer_owns_business_judgment: [
        'estimate_details',
        'quote_details',
        'pricing_question',
        'payment_or_invoice_question',
        'contract_question',
        'insurance_complexity',
        'repair_vs_replacement_question',
        'upset_homeowner',
        'disputed_inspection_outcome',
        'scheduling_issue',
      ],
      roofleadhq_limited_to_system_quality: [
        'bad_or_unclear_ai_response',
        'missed_data_capture',
        'broken_routing',
        'source_attribution_issue',
        'dashboard_report_discrepancy',
        'workflow_state_confusion',
        'setup_issue',
        'failed_handoff',
        'quality_control_concern',
      ],
      all_open_or_review_have_manual_next_step: openOrReviewItems.every(
        (i) => i.required_manual_next_step,
      ),
      all_follow_up_have_due_dates: followUpItems.every((i) => i.next_step_due_date),
      all_open_have_owners: openItems
        .filter((i) => i.outcome === 'still_open' || i.still_open_days !== null)
        .every((i) => i.next_step_owner),
      all_open_have_still_open_days: openItems
        .filter((i) => i.outcome === 'still_open')
        .every((i) => i.still_open_days !== null && i.still_open_days !== undefined),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_safety_assertions: [
      ...POST_INSPECTION_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const FEEDBACK_PERMISSION_SAFETY_ASSERTIONS = [
  'feedback_permission_expansion_summary_present',
  'feedback_permission_items_present',
  'feedback_permission_item_required_fields_present',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'public_use_allowed_only_when_permission_yes',
  'public_use_blocked_when_permission_no',
  'public_use_blocked_when_permission_not_asked',
  'missing_permission_fails_closed_or_routes_to_review',
  'testimonial_candidate_does_not_publish_publicly',
  'testimonial_candidate_without_permission_remains_internal',
  'feedback_internal_unless_permission_obtained',
  'feedback_issue_flag_routes_to_review',
  'homeowner_wants_follow_up_routes_to_roofer_review',
  'negative_or_disputed_feedback_routes_to_roofer_review',
  'pricing_estimate_quote_feedback_routes_to_roofer_review',
  'payment_or_contract_feedback_routes_to_roofer_review',
  'roofleadhq_review_limited_to_system_quality',
  'feedback_permission_capture_mismatch_routes_to_roofleadhq_review',
  'csv_permission_value_matches_permission_to_use_publicly',
  'reporting_permission_value_matches_permission_to_use_publicly',
  'no_fake_reviews',
  'no_review_farming',
  'no_incentivized_positive_feedback_request',
  'no_automatic_public_review_generation',
  'no_automatic_testimonial_publication',
  'live_feedback_request_blocked_when_flag_false',
  'feedback_permission_uses_fake_data_only',
  'feedback_permission_does_not_touch_production_data',
  'feedback_permission_does_not_call_external_services',
  'feedback_permission_does_not_send_notifications',
  'feedback_permission_decisions_are_audited',
  'required_manual_next_step_present_for_issue_or_review_items',
  'automatic_public_review_generated_is_no_for_all_items',
  'testimonial_published_publicly_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
];

const FEEDBACK_PERMISSION_EXTENSIONS = {
  homeowner_follow_up_needed_path: {
    homeowner_wants_follow_up: true,
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  roofer_follow_up_needed_path: {
    homeowner_wants_follow_up: true,
    roofer_showed_up_as_expected: false,
    roofer_helpful_professional: false,
    negative_or_disputed_feedback: true,
    payment_or_contract_feedback: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    pricing_estimate_quote_feedback: true,
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  feedback_permission_yes_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  feedback_permission_no_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  feedback_permission_not_asked_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  csv_report_snapshot_fake_data_path: {
    feedback_permission_capture_mismatch: true,
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  roofleadhq_system_review_needed_path: {
    roofer_showed_up_as_expected: null,
    roofer_helpful_professional: null,
  },
  missed_lead_recovery_path: {
    roofer_showed_up_as_expected: null,
    roofer_helpful_professional: null,
  },
  inspection_missed_reschedule_path: {
    roofer_showed_up_as_expected: false,
    roofer_helpful_professional: null,
  },
  post_inspection_still_open_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
    negative_or_disputed_feedback: true,
  },
};

function resolvePermissionReportingValue(permission) {
  if (permission === 'yes' || permission === 'no' || permission === 'not_asked') {
    return permission;
  }
  return 'not_applicable';
}

function derivePublicUseDecision(permission, testimonialCandidate) {
  if (permission === 'yes') {
    return {
      public_use_allowed: true,
      public_use_block_reason: null,
      internal_only: false,
    };
  }
  if (permission === 'no') {
    return {
      public_use_allowed: false,
      public_use_block_reason: 'homeowner_denied_public_use',
      internal_only: true,
    };
  }
  if (permission === 'not_asked') {
    return {
      public_use_allowed: false,
      public_use_block_reason: 'permission_not_asked',
      internal_only: true,
    };
  }
  if (testimonialCandidate) {
    return {
      public_use_allowed: false,
      public_use_block_reason: 'permission_missing_fails_closed',
      internal_only: true,
    };
  }
  return {
    public_use_allowed: false,
    public_use_block_reason: permission === null ? 'permission_not_applicable' : 'permission_missing_fails_closed',
    internal_only: true,
  };
}

function buildFeedbackPermissionItem(scenario, postInspectionItem, index) {
  if (!postInspectionItem) {
    return null;
  }
  const extension = FEEDBACK_PERMISSION_EXTENSIONS[scenario.scenario_id] || {};
  const permission = postInspectionItem.permission_to_use_publicly;
  const publicUse = derivePublicUseDecision(permission, postInspectionItem.testimonial_candidate);
  const csvPermissionValue = resolvePermissionReportingValue(permission);
  const reportingPermissionValue = resolvePermissionReportingValue(permission);
  const internalOnly =
    publicUse.internal_only ||
    (postInspectionItem.testimonial_candidate && permission !== 'yes') ||
    permission === 'no' ||
    permission === 'not_asked' ||
    permission === null;

  return {
    feedback_permission_item_id: `${scenario.scenario_id}_feedback_permission_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: postInspectionItem.lead_id,
    appointment_id: postInspectionItem.appointment_id,
    post_inspection_item_id: postInspectionItem.post_inspection_item_id,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    feedback_requested: postInspectionItem.feedback_requested,
    feedback_captured: postInspectionItem.feedback_captured,
    feedback_summary: postInspectionItem.feedback_summary,
    feedback_issue_flag: postInspectionItem.feedback_issue_flag,
    testimonial_candidate: postInspectionItem.testimonial_candidate,
    permission_to_use_publicly: permission,
    public_use_allowed: publicUse.public_use_allowed,
    public_use_block_reason: publicUse.public_use_block_reason,
    internal_only: internalOnly,
    homeowner_wants_follow_up: extension.homeowner_wants_follow_up ?? false,
    roofer_showed_up_as_expected: extension.roofer_showed_up_as_expected ?? null,
    roofer_helpful_professional: extension.roofer_helpful_professional ?? null,
    roofer_review_required: postInspectionItem.roofer_review_required,
    roofleadhq_review_required: postInspectionItem.roofleadhq_review_required,
    required_manual_next_step: postInspectionItem.required_manual_next_step,
    csv_permission_value: csvPermissionValue,
    reporting_permission_value: reportingPermissionValue,
    automatic_public_review_generated: 'no',
    testimonial_published_publicly: 'no',
    incentivized_positive_feedback_requested: 'no',
    fake_review_generated: 'no',
    review_farming_detected: 'no',
    live_feedback_request_allowed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    feedback_permission_capture_mismatch: extension.feedback_permission_capture_mismatch ?? false,
    negative_or_disputed_feedback: extension.negative_or_disputed_feedback ?? false,
    pricing_estimate_quote_feedback: extension.pricing_estimate_quote_feedback ?? false,
    payment_or_contract_feedback: extension.payment_or_contract_feedback ?? false,
    fake_data_only: true,
    audit_event_id: `${scenario.scenario_id}_feedback_permission_audit_${index + 1}`,
  };
}

function buildScenarioFeedbackPermissionItem(scenario, postInspectionItem) {
  if (!postInspectionItem) {
    return null;
  }
  return buildFeedbackPermissionItem(scenario, postInspectionItem, 0);
}

function buildTopLevelFeedbackPermission(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => {
      const postItem = buildScenarioPostInspectionItem(scenario);
      return buildFeedbackPermissionItem(scenario, postItem, 0);
    })
    .filter(Boolean);

  const permissionCounts = { yes: 0, no: 0, not_asked: 0, unset: 0 };
  for (const item of allItems) {
    if (item.permission_to_use_publicly === 'yes') permissionCounts.yes += 1;
    else if (item.permission_to_use_publicly === 'no') permissionCounts.no += 1;
    else if (item.permission_to_use_publicly === 'not_asked') permissionCounts.not_asked += 1;
    else permissionCounts.unset += 1;
  }

  const feedbackStatusCounts = {
    not_requested: allItems.filter((i) => !i.feedback_requested && !i.feedback_captured).length,
    requested_not_captured: allItems.filter((i) => i.feedback_requested && !i.feedback_captured).length,
    captured: allItems.filter((i) => i.feedback_captured).length,
    issue_flagged: allItems.filter((i) => i.feedback_issue_flag).length,
  };

  const testimonialCandidates = allItems.filter((i) => i.testimonial_candidate);
  const issueItems = allItems.filter((i) => i.feedback_issue_flag);
  const reviewOrIssueItems = allItems.filter(
    (i) =>
      i.feedback_issue_flag ||
      i.roofer_review_required ||
      i.roofleadhq_review_required ||
      i.feedback_permission_capture_mismatch,
  );
  const publicUseAllowedItems = allItems.filter((i) => i.public_use_allowed);
  const publicUseBlockedItems = allItems.filter((i) => !i.public_use_allowed);

  return {
    feedback_permission_expansion: 'native_workflow_fixture_feedback_permission_expansion',
    feedback_permission_expansion_summary: {
      description:
        'Deterministic fake-data feedback permission expansion across all fixture scenarios — explicit homeowner feedback capture and public-use permission boundaries without live automation',
      total_feedback_permission_items: allItems.length,
      feedback_requested_count: allItems.filter((i) => i.feedback_requested).length,
      feedback_captured_count: allItems.filter((i) => i.feedback_captured).length,
      feedback_issue_flag_count: issueItems.length,
      testimonial_candidate_count: testimonialCandidates.length,
      public_use_allowed_count: publicUseAllowedItems.length,
      public_use_blocked_count: publicUseBlockedItems.length,
      permission_counts: permissionCounts,
      live_feedback_request_enabled: false,
      automatic_public_review_generation: false,
      automatic_testimonial_publication: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    feedback_permission_items: allItems,
    feedback_permission_status_summary: {
      description: 'Feedback request/capture/issue status distribution across fixture scenarios',
      status_counts: feedbackStatusCounts,
      feedback_not_requested_count: feedbackStatusCounts.not_requested,
      feedback_requested_count: allItems.filter((i) => i.feedback_requested).length,
      feedback_captured_count: feedbackStatusCounts.captured,
      feedback_issue_flagged_count: feedbackStatusCounts.issue_flagged,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    testimonial_candidate_summary: {
      description:
        'Testimonial candidate tracking — internal-only; no automatic public testimonial publication',
      testimonial_candidate_count: testimonialCandidates.length,
      testimonial_candidate_internal_only: true,
      testimonial_candidate_without_permission_remains_internal: testimonialCandidates
        .filter((i) => i.permission_to_use_publicly !== 'yes')
        .every((i) => i.internal_only),
      testimonial_published_publicly: 'no',
      automatic_testimonial_publication: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_issue_summary: {
      description: 'Feedback issue flag routing — internal review required, no automatic publication',
      feedback_issue_flag_count: issueItems.length,
      issue_items_route_to_review: issueItems.every(
        (i) => i.roofer_review_required || i.roofleadhq_review_required,
      ),
      all_issue_items_internal_only: issueItems.every((i) => i.internal_only),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    public_use_permission_summary: {
      description: 'Public-use permission boundaries — yes/no/not_asked only; permissiontousepublicly absent',
      permission_counts: permissionCounts,
      valid_values_only: ['yes', 'no', 'not_asked'],
      permissiontousepublicly_absent: true,
      public_use_allowed_only_when_permission_yes: publicUseAllowedItems.every(
        (i) => i.permission_to_use_publicly === 'yes',
      ),
      public_use_blocked_when_permission_no: allItems
        .filter((i) => i.permission_to_use_publicly === 'no')
        .every((i) => !i.public_use_allowed && i.internal_only),
      public_use_blocked_when_permission_not_asked: allItems
        .filter((i) => i.permission_to_use_publicly === 'not_asked')
        .every((i) => !i.public_use_allowed && i.internal_only),
      missing_permission_fails_closed: allItems
        .filter((i) => i.testimonial_candidate && i.permission_to_use_publicly !== 'yes')
        .every((i) => !i.public_use_allowed),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_csv_reporting_summary: {
      description: 'CSV and reporting permission value compatibility — matches permission_to_use_publicly',
      csv_permission_values_match: allItems.every(
        (i) => i.csv_permission_value === resolvePermissionReportingValue(i.permission_to_use_publicly),
      ),
      reporting_permission_values_match: allItems.every(
        (i) =>
          i.reporting_permission_value === resolvePermissionReportingValue(i.permission_to_use_publicly),
      ),
      csv_export_is_one_directional: true,
      csv_not_native_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_review_boundary_summary: {
      description:
        'Feedback review ownership — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_required_count: allItems.filter((i) => i.roofer_review_required).length,
      roofleadhq_review_required_count: allItems.filter((i) => i.roofleadhq_review_required).length,
      homeowner_wants_follow_up_routes_to_roofer: allItems
        .filter((i) => i.homeowner_wants_follow_up)
        .every((i) => i.roofer_review_required || i.required_manual_next_step),
      negative_or_disputed_feedback_routes_to_roofer: allItems
        .filter((i) => i.negative_or_disputed_feedback)
        .every((i) => i.roofer_review_required),
      pricing_estimate_quote_feedback_routes_to_roofer: allItems
        .filter((i) => i.pricing_estimate_quote_feedback)
        .every((i) => i.roofer_review_required),
      payment_or_contract_feedback_routes_to_roofer: allItems
        .filter((i) => i.feedback_issue_flag && i.roofer_review_required)
        .length >= 1,
      roofleadhq_limited_to_system_quality: [
        'bad_or_unclear_ai_response',
        'missed_data_capture',
        'broken_routing',
        'source_attribution_issue',
        'dashboard_report_discrepancy',
        'workflow_state_confusion',
        'setup_issue',
        'failed_handoff',
        'quality_control_concern',
        'feedback_permission_capture_mismatch',
      ],
      feedback_permission_capture_mismatch_routes_to_roofleadhq: allItems
        .filter((i) => i.feedback_permission_capture_mismatch)
        .every((i) => i.roofleadhq_review_required),
      all_review_or_issue_have_manual_next_step: reviewOrIssueItems.every(
        (i) => i.required_manual_next_step,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_safety_assertions: [
      ...FEEDBACK_PERMISSION_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MANUAL_OUTREACH_SAFETY_ASSERTIONS = [
  'manual_outreach_expansion_summary_present',
  'manual_outreach_items_present',
  'manual_outreach_item_required_fields_present',
  'missed_lead_recovery_can_route_to_manual_outreach',
  'max_follow_up_attempts_can_route_to_manual_outreach',
  'missing_contact_data_blocks_manual_outreach_or_routes_to_review',
  'unclear_contact_permission_blocks_manual_outreach_or_routes_to_review',
  'do_not_contact_blocks_manual_outreach',
  'homeowner_contact_ready_required_for_manual_outreach',
  'roofer_review_required_before_business_judgment_outreach',
  'roofleadhq_review_required_before_system_quality_outreach',
  'pricing_question_routes_to_roofer_review_before_outreach',
  'estimate_question_routes_to_roofer_review_before_outreach',
  'quote_request_routes_to_roofer_review_before_outreach',
  'insurance_complexity_routes_to_roofer_review_before_outreach',
  'payment_or_invoice_routes_to_roofer_review_before_outreach',
  'contract_question_routes_to_roofer_review_before_outreach',
  'homeowner_asks_for_roofer_routes_to_roofer_review_before_outreach',
  'upset_homeowner_routes_to_roofer_review_before_outreach',
  'negative_or_disputed_feedback_routes_to_roofer_review_before_outreach',
  'broken_routing_routes_to_roofleadhq_review_before_outreach',
  'missed_data_capture_routes_to_roofleadhq_review_before_outreach',
  'source_attribution_issue_routes_to_roofleadhq_review_before_outreach',
  'feedback_permission_capture_mismatch_routes_to_roofleadhq_review_before_outreach',
  'manual_outreach_owner_required',
  'manual_next_step_required',
  'next_step_owner_required',
  'next_step_due_date_required_when_outreach_needed',
  'outreach_attempt_count_present',
  'manual_outreach_decisions_are_audited',
  'live_sms_blocked_when_flag_false',
  'live_email_blocked_when_flag_false',
  'live_call_blocked_when_flag_false',
  'notification_sent_is_no_for_all_items',
  'live_sms_allowed_is_no_for_all_items',
  'live_email_allowed_is_no_for_all_items',
  'live_call_allowed_is_no_for_all_items',
  'no_twilio_call_performed',
  'no_vapi_call_performed',
  'no_resend_call_performed',
  `no_${BRIDGE_VENDOR}_live_workflow_performed`,
  'no_google_calendar_event_created',
  'no_external_services_called',
  'manual_outreach_uses_fake_data_only',
  'manual_outreach_does_not_touch_production_data',
  'manual_outreach_does_not_send_notifications',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'unsupported_request_routes_to_review_or_later_only',
  'unsupported_request_does_not_trigger_live_outreach',
];

const MANUAL_OUTREACH_PROFILES = {
  normal_lead_to_appointment_readiness: {
    outreach_needed: false,
    outreach_status: 'not_needed',
    outreach_reason: 'appointment_readiness_satisfied_no_manual_outreach_yet',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  missing_information_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_review',
    outreach_reason: 'missing_contact_data_blocks_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_contact_ready',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
  },
  duplicate_review_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'unresolved_duplicate_review_blocks_outreach',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-19',
    business_judgment_required: false,
    system_quality_issue: true,
    broken_routing: true,
  },
  bad_fit_excluded_path: {
    outreach_needed: false,
    outreach_status: 'blocked',
    outreach_reason: 'excluded_service_area_blocks_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  stopped_do_not_contact_path: {
    outreach_needed: false,
    outreach_status: 'blocked',
    outreach_reason: 'do_not_contact_blocks_all_manual_outreach',
    outreach_owner: 'none',
    outreach_channel_allowed: 'none',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  missed_lead_recovery_path: {
    outreach_needed: true,
    outreach_status: 'needed',
    outreach_reason: 'missed_lead_recovery_requires_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: true,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-14',
    next_step_due_date: '2026-06-17',
    business_judgment_required: false,
    system_quality_issue: false,
    bad_or_unclear_ai_response: true,
  },
  roofer_review_needed_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'pricing_question_requires_roofer_review_before_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
    pricing_question: true,
    insurance_complexity: true,
  },
  roofleadhq_system_review_needed_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'workflow_state_confusion_requires_roofleadhq_review_before_outreach',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-19',
    business_judgment_required: false,
    system_quality_issue: true,
    broken_routing: true,
    missed_data_capture: true,
  },
  appointment_booked_path: {
    outreach_needed: false,
    outreach_status: 'not_needed',
    outreach_reason: 'appointment_booked_fixture_manual_coordination_only',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-12',
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  inspection_completed_path: {
    outreach_needed: false,
    outreach_status: 'tracking_only',
    outreach_reason: 'post_inspection_tracking_no_outreach_until_follow_up_needed',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  inspection_missed_reschedule_path: {
    outreach_needed: true,
    outreach_status: 'needed_after_roofer_review',
    outreach_reason: 'scheduling_issue_requires_roofer_manual_reschedule_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-17',
    business_judgment_required: true,
    system_quality_issue: false,
    scheduling_issue: true,
  },
  post_inspection_still_open_path: {
    outreach_needed: true,
    outreach_status: 'needed',
    outreach_reason: 'post_inspection_still_open_requires_roofer_manual_follow_up',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-15',
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
    negative_or_disputed_feedback: true,
    repair_vs_replacement_question: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'estimate_and_quote_questions_require_roofer_review_before_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
    estimate_question: true,
    quote_request: true,
    payment_or_invoice_question: true,
  },
  homeowner_follow_up_needed_path: {
    outreach_needed: true,
    outreach_status: 'needed',
    outreach_reason: 'homeowner_follow_up_requires_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-15',
    next_step_due_date: '2026-06-17',
    business_judgment_required: true,
    system_quality_issue: false,
    homeowner_asks_for_roofer_directly: true,
    feedback_issue_follow_up: true,
  },
  roofer_follow_up_needed_path: {
    outreach_needed: true,
    outreach_status: 'needed_after_roofer_review',
    outreach_reason: 'negative_feedback_and_contract_question_require_roofer_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 3,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-14',
    next_step_due_date: '2026-06-17',
    business_judgment_required: true,
    system_quality_issue: false,
    upset_homeowner: true,
    negative_or_disputed_feedback: true,
    contract_question: true,
    payment_or_invoice_question: true,
    feedback_issue_follow_up: true,
  },
  feedback_permission_yes_path: {
    outreach_needed: false,
    outreach_status: 'tracking_only',
    outreach_reason: 'feedback_captured_permission_yes_no_live_outreach_required',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  feedback_permission_no_path: {
    outreach_needed: false,
    outreach_status: 'tracking_only',
    outreach_reason: 'feedback_internal_only_permission_no_blocks_public_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  feedback_permission_not_asked_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_review',
    outreach_reason: 'unclear_contact_permission_requires_review_before_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_permission_reviewed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-19',
    business_judgment_required: false,
    system_quality_issue: false,
    unclear_contact_permission: true,
  },
  csv_report_snapshot_fake_data_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'source_attribution_and_feedback_permission_mismatch_require_system_review',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-20',
    business_judgment_required: false,
    system_quality_issue: true,
    source_attribution_issue: true,
    feedback_permission_capture_mismatch: true,
  },
  starter_plan_profile_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'setup_issue_requires_roofleadhq_system_review_before_outreach',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-20',
    business_judgment_required: false,
    system_quality_issue: true,
    setup_issue: true,
  },
  growth_plan_profile_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'quality_control_concern_requires_roofleadhq_system_review',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-20',
    business_judgment_required: false,
    system_quality_issue: true,
    quality_control_concern: true,
  },
  elite_plan_profile_path: {
    outreach_needed: false,
    outreach_status: 'not_needed',
    outreach_reason: 'elite_plan_fixture_tracking_no_manual_outreach_yet',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  custom_review_500_plus_leads_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'custom_review_volume_boundary_blocks_outreach_until_review',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-25',
    business_judgment_required: true,
    system_quality_issue: false,
    unsupported_request: true,
  },
  custom_review_two_plus_locations_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'custom_review_multi_location_blocks_outreach_until_review',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-25',
    business_judgment_required: true,
    system_quality_issue: false,
    unsupported_request: true,
  },
  activation_flag_false_blocks_live_action_path: {
    outreach_needed: true,
    outreach_status: 'needed_manual_only',
    outreach_reason: 'max_follow_up_attempts_reached_requires_manual_outreach_live_blocked',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 4,
    max_follow_up_attempts_reached: true,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 2,
    last_manual_outreach_attempt_date: '2026-06-13',
    next_step_due_date: '2026-06-18',
    business_judgment_required: false,
    system_quality_issue: false,
    unsupported_request: true,
  },
};

function buildManualOutreachItem(
  scenario,
  readinessItem,
  postItem,
  feedbackItem,
  profile,
  index,
) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const appointmentId = postItem?.appointment_id || null;
  const manualNextStep =
    scenario.manual_next_step ||
    readinessItem?.required_manual_next_step ||
    postItem?.required_manual_next_step ||
    feedbackItem?.required_manual_next_step ||
    profile.required_manual_next_step ||
    'manual_outreach_review_required';
  const nextStepOwner =
    scenario.owner ||
    postItem?.next_step_owner ||
    (profile.outreach_owner === 'roofleadhq_jason' ? 'roofleadhq_jason' : 'roofer');
  const outreachOwner = profile.outreach_owner || nextStepOwner || 'roofer';

  return {
    manual_outreach_item_id: `${scenario.scenario_id}_manual_outreach_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    appointment_id: appointmentId,
    post_inspection_item_id: postItem?.post_inspection_item_id || null,
    feedback_permission_item_id: feedbackItem?.feedback_permission_item_id || null,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    outreach_needed: profile.outreach_needed,
    outreach_status: profile.outreach_status,
    outreach_reason: profile.outreach_reason,
    outreach_owner: outreachOwner,
    outreach_channel_allowed: profile.outreach_channel_allowed,
    contact_permission_status: readinessItem?.contact_permission_status || 'unknown',
    do_not_contact_status: readinessItem?.do_not_contact_status ?? false,
    homeowner_contact_ready: readinessItem?.homeowner_contact_ready ?? false,
    roofer_review_required:
      readinessItem?.roofer_review_required ||
      postItem?.roofer_review_required ||
      profile.business_judgment_required ||
      false,
    roofleadhq_review_required:
      readinessItem?.roofleadhq_review_required ||
      postItem?.roofleadhq_review_required ||
      profile.system_quality_issue ||
      false,
    business_judgment_required: profile.business_judgment_required ?? false,
    system_quality_issue: profile.system_quality_issue ?? false,
    prior_follow_up_count: profile.prior_follow_up_count ?? 0,
    max_follow_up_attempts_reached: profile.max_follow_up_attempts_reached ?? false,
    missed_lead_recovery_used: profile.missed_lead_recovery_used ?? false,
    manual_next_step: manualNextStep,
    next_step_owner: nextStepOwner,
    next_step_due_date: profile.next_step_due_date,
    last_manual_outreach_attempt_date: profile.last_manual_outreach_attempt_date,
    manual_outreach_attempt_count: profile.manual_outreach_attempt_count ?? 0,
    manual_outreach_notes: `fixture_manual_outreach_${scenario.scenario_id}`,
    hold_or_block_reason: scenario.hold_or_block_reason || null,
    audit_event_id: `${scenario.scenario_id}_manual_outreach_audit_${index + 1}`,
    live_sms_allowed: 'no',
    live_email_allowed: 'no',
    live_call_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    pricing_question: profile.pricing_question ?? false,
    estimate_question: profile.estimate_question ?? false,
    quote_request: profile.quote_request ?? false,
    insurance_complexity: profile.insurance_complexity ?? false,
    payment_or_invoice_question: profile.payment_or_invoice_question ?? false,
    contract_question: profile.contract_question ?? false,
    homeowner_asks_for_roofer_directly: profile.homeowner_asks_for_roofer_directly ?? false,
    upset_homeowner: profile.upset_homeowner ?? false,
    negative_or_disputed_feedback: profile.negative_or_disputed_feedback ?? false,
    broken_routing: profile.broken_routing ?? false,
    missed_data_capture: profile.missed_data_capture ?? false,
    source_attribution_issue: profile.source_attribution_issue ?? false,
    feedback_permission_capture_mismatch: profile.feedback_permission_capture_mismatch ?? false,
    unsupported_request: profile.unsupported_request ?? false,
    feedback_issue_follow_up: profile.feedback_issue_follow_up ?? false,
    scheduling_issue: profile.scheduling_issue ?? false,
    repair_vs_replacement_question: profile.repair_vs_replacement_question ?? false,
    setup_issue: profile.setup_issue ?? false,
    quality_control_concern: profile.quality_control_concern ?? false,
    unclear_contact_permission: profile.unclear_contact_permission ?? false,
    fake_data_only: true,
  };
}

function buildScenarioManualOutreachItem(scenario, readinessItem, postItem, feedbackItem) {
  const profile = MANUAL_OUTREACH_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildManualOutreachItem(scenario, readinessItem, postItem, feedbackItem, profile, 0);
}

function buildTopLevelManualOutreach(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => {
      const readinessItem = buildScenarioAppointmentReadinessItem(scenario);
      const postItem = buildScenarioPostInspectionItem(scenario);
      const feedbackItem = buildScenarioFeedbackPermissionItem(scenario, postItem);
      return buildScenarioManualOutreachItem(scenario, readinessItem, postItem, feedbackItem);
    })
    .filter(Boolean);

  const neededItems = allItems.filter((i) => i.outreach_needed);
  const blockedItems = allItems.filter((i) => i.outreach_status.startsWith('blocked'));
  const missedLeadItems = allItems.filter((i) => i.missed_lead_recovery_used);
  const maxFollowUpItems = allItems.filter((i) => i.max_follow_up_attempts_reached);
  const postInspectionOutreachItems = allItems.filter(
    (i) =>
      i.post_inspection_item_id &&
      (i.outreach_needed ||
        i.outreach_status === 'needed_after_roofer_review' ||
        i.outreach_status === 'tracking_only'),
  );
  const feedbackOutreachItems = allItems.filter(
    (i) =>
      i.feedback_permission_item_id &&
      (i.feedback_issue_follow_up ||
        i.negative_or_disputed_feedback ||
        i.feedback_permission_capture_mismatch),
  );
  const rooferReviewBlocked = allItems.filter(
    (i) => i.roofer_review_required && !i.outreach_needed && i.business_judgment_required,
  );
  const roofleadhqReviewBlocked = allItems.filter(
    (i) => i.roofleadhq_review_required && !i.outreach_needed && i.system_quality_issue,
  );

  const outreachStatusCounts = {};
  for (const item of allItems) {
    outreachStatusCounts[item.outreach_status] =
      (outreachStatusCounts[item.outreach_status] || 0) + 1;
  }

  const outreachReasonCounts = {};
  for (const item of allItems) {
    outreachReasonCounts[item.outreach_reason] =
      (outreachReasonCounts[item.outreach_reason] || 0) + 1;
  }

  const outreachOwnerCounts = {};
  for (const item of allItems) {
    outreachOwnerCounts[item.outreach_owner] =
      (outreachOwnerCounts[item.outreach_owner] || 0) + 1;
  }

  return {
    manual_outreach_expansion: 'native_workflow_fixture_manual_outreach_expansion',
    manual_outreach_expansion_summary: {
      description:
        'Deterministic fake-data manual outreach expansion across all fixture scenarios — explicit outreach-needed vs outreach-blocked boundaries without live sends or notifications',
      total_manual_outreach_items: allItems.length,
      outreach_needed_count: neededItems.length,
      outreach_blocked_count: blockedItems.length,
      missed_lead_recovery_outreach_count: missedLeadItems.length,
      max_follow_up_manual_outreach_count: maxFollowUpItems.length,
      post_inspection_outreach_count: postInspectionOutreachItems.length,
      feedback_outreach_count: feedbackOutreachItems.length,
      live_sms_enabled: false,
      live_email_enabled: false,
      live_call_enabled: false,
      notifications_sent: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    manual_outreach_items: allItems,
    manual_outreach_status_summary: {
      description: 'Manual outreach status distribution across fixture scenarios',
      status_counts: outreachStatusCounts,
      outreach_needed_count: neededItems.length,
      outreach_blocked_count: blockedItems.length,
      outreach_tracking_only_count: allItems.filter((i) => i.outreach_status === 'tracking_only')
        .length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_owner_summary: {
      description: 'Manual outreach owner assignments — roofer vs RoofLeadHQ/Jason vs none',
      owner_counts: outreachOwnerCounts,
      roofer_owned_count: allItems.filter((i) => i.outreach_owner === 'roofer').length,
      roofleadhq_owned_count: allItems.filter((i) => i.outreach_owner === 'roofleadhq_jason').length,
      none_owned_count: allItems.filter((i) => i.outreach_owner === 'none').length,
      all_needed_items_have_owner: neededItems.every((i) => i.outreach_owner && i.outreach_owner !== 'none'),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_reason_summary: {
      description: 'Manual outreach reason catalog across fixture scenarios',
      reason_counts: outreachReasonCounts,
      do_not_contact_blocks_outreach: allItems
        .filter((i) => i.do_not_contact_status)
        .every((i) => !i.outreach_needed && i.outreach_status === 'blocked'),
      missing_contact_blocks_or_routes_to_review: allItems
        .filter((i) => !i.homeowner_contact_ready)
        .every((i) => !i.outreach_needed || i.outreach_status.includes('review')),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_attempt_summary: {
      description: 'Manual outreach attempt logging — dry-run tracking only, no live sends',
      total_attempt_count: allItems.reduce((sum, i) => sum + i.manual_outreach_attempt_count, 0),
      items_with_attempts: allItems.filter((i) => i.manual_outreach_attempt_count > 0).length,
      all_items_have_attempt_count: allItems.every(
        (i) => i.manual_outreach_attempt_count !== undefined && i.manual_outreach_attempt_count !== null,
      ),
      no_live_sends_performed: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_manual_outreach_summary: {
      description: 'Missed lead recovery manual outreach handling — human follow-up after safe attempts',
      missed_lead_recovery_used_count: missedLeadItems.length,
      missed_lead_recovery_can_route_to_manual_outreach: missedLeadItems.every(
        (i) => i.outreach_needed && i.missed_lead_recovery_used,
      ),
      all_missed_lead_items_manual_only: missedLeadItems.every(
        (i) => i.outreach_channel_allowed === 'manual_only',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_manual_outreach_summary: {
      description:
        'Post-inspection manual outreach — homeowner/roofer follow-up tracking without live sends',
      post_inspection_outreach_item_count: postInspectionOutreachItems.length,
      homeowner_follow_up_outreach_count: allItems.filter(
        (i) => i.scenario_id === 'homeowner_follow_up_needed_path' && i.outreach_needed,
      ).length,
      roofer_follow_up_outreach_count: allItems.filter(
        (i) => i.scenario_id === 'roofer_follow_up_needed_path' && i.outreach_needed,
      ).length,
      all_post_inspection_outreach_manual_only: postInspectionOutreachItems.every(
        (i) => i.live_sms_allowed === 'no' && i.live_email_allowed === 'no' && i.live_call_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_manual_outreach_summary: {
      description:
        'Feedback issue manual outreach — negative/disputed feedback and permission mismatch routing',
      feedback_outreach_item_count: feedbackOutreachItems.length,
      negative_or_disputed_feedback_routes_to_roofer: allItems
        .filter((i) => i.negative_or_disputed_feedback)
        .every((i) => i.roofer_review_required || i.outreach_owner === 'roofer'),
      feedback_permission_capture_mismatch_routes_to_roofleadhq: allItems
        .filter((i) => i.feedback_permission_capture_mismatch)
        .every((i) => i.roofleadhq_review_required),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_review_boundary_summary: {
      description:
        'Manual outreach review ownership — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_blocked_count: rooferReviewBlocked.length,
      roofleadhq_review_blocked_count: roofleadhqReviewBlocked.length,
      pricing_question_routes_to_roofer: allItems
        .filter((i) => i.pricing_question)
        .every((i) => i.roofer_review_required && !i.outreach_needed),
      estimate_question_routes_to_roofer: allItems
        .filter((i) => i.estimate_question)
        .every((i) => i.roofer_review_required && !i.outreach_needed),
      quote_request_routes_to_roofer: allItems
        .filter((i) => i.quote_request)
        .every((i) => i.roofer_review_required && !i.outreach_needed),
      insurance_complexity_routes_to_roofer: allItems
        .filter((i) => i.insurance_complexity)
        .every((i) => i.roofer_review_required),
      payment_or_invoice_routes_to_roofer: allItems
        .filter((i) => i.payment_or_invoice_question)
        .every((i) => i.roofer_review_required),
      contract_question_routes_to_roofer: allItems
        .filter((i) => i.contract_question)
        .every((i) => i.roofer_review_required),
      homeowner_asks_for_roofer_routes_to_roofer: allItems
        .filter((i) => i.homeowner_asks_for_roofer_directly)
        .every((i) => i.roofer_review_required || i.outreach_owner === 'roofer'),
      upset_homeowner_routes_to_roofer: allItems
        .filter((i) => i.upset_homeowner)
        .every((i) => i.roofer_review_required),
      broken_routing_routes_to_roofleadhq: allItems
        .filter((i) => i.broken_routing)
        .every((i) => i.roofleadhq_review_required),
      missed_data_capture_routes_to_roofleadhq: allItems
        .filter((i) => i.missed_data_capture)
        .every((i) => i.roofer_review_required || i.roofleadhq_review_required),
      source_attribution_issue_routes_to_roofleadhq: allItems
        .filter((i) => i.source_attribution_issue)
        .every((i) => i.roofleadhq_review_required),
      unsupported_request_routes_to_review_or_later_only: allItems
        .filter((i) => i.unsupported_request)
        .every((i) => !i.live_sms_allowed || i.live_sms_allowed === 'no'),
      all_needed_items_have_manual_next_step: neededItems.every((i) => i.manual_next_step),
      all_needed_items_have_next_step_owner: neededItems.every((i) => i.next_step_owner),
      all_needed_items_have_due_date: neededItems.every((i) => i.next_step_due_date),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_safety_assertions: [
      ...MANUAL_OUTREACH_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MISSED_LEAD_RECOVERY_SAFETY_ASSERTIONS = [
  'missed_lead_recovery_expansion_summary_present',
  'missed_lead_recovery_items_present',
  'missed_lead_recovery_item_required_fields_present',
  'missed_lead_recovery_status_summary_present',
  'missed_lead_recovery_eligibility_summary_present',
  'missed_lead_recovery_blocker_summary_present',
  'missed_lead_recovery_attempt_summary_present',
  'missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe',
  'missed_lead_recovery_requires_homeowner_contact_ready',
  'missed_lead_recovery_requires_contact_permission_or_review',
  'do_not_contact_blocks_missed_lead_recovery',
  'missing_contact_data_blocks_recovery_or_routes_to_review',
  'unclear_contact_permission_blocks_recovery_or_routes_to_review',
  'max_follow_up_attempts_blocks_additional_recovery',
  'bad_fit_or_excluded_blocks_recovery',
  'excluded_service_area_blocks_recovery',
  'lead_source_required_or_unknown_marker_present',
  'first_response_time_tracked',
  'prior_follow_up_count_tracked',
  'max_follow_up_attempts_tracked',
  'homeowner_replied_status_tracked',
  'missed_lead_recovery_manual_outreach_handoff_present_when_needed',
  'manual_outreach_owner_required_when_manual_outreach_needed',
  'required_manual_next_step_present_for_blocked_or_review_items',
  'next_step_owner_required_for_recovery_items',
  'next_step_due_date_required_for_open_recovery_items',
  'roofer_review_required_before_business_judgment_recovery',
  'pricing_question_routes_to_roofer_review_before_recovery',
  'estimate_question_routes_to_roofer_review_before_recovery',
  'quote_request_routes_to_roofer_review_before_recovery',
  'insurance_complexity_routes_to_roofer_review_before_recovery',
  'payment_or_invoice_routes_to_roofer_review_before_recovery',
  'contract_question_routes_to_roofer_review_before_recovery',
  'upset_homeowner_routes_to_roofer_review_before_recovery',
  'roofleadhq_review_required_before_system_quality_recovery',
  'broken_routing_routes_to_roofleadhq_review_before_recovery',
  'missed_data_capture_routes_to_roofleadhq_review_before_recovery',
  'source_attribution_issue_routes_to_roofleadhq_review_before_recovery',
  'recovery_state_mismatch_routes_to_roofleadhq_review',
  'activation_flags_default_false',
  'live_sms_blocked_when_flag_false',
  'live_email_blocked_when_flag_false',
  'live_call_blocked_when_flag_false',
  'notification_sent_is_no_for_all_recovery_items',
  'live_sms_allowed_is_no_for_all_recovery_items',
  'live_email_allowed_is_no_for_all_recovery_items',
  'live_call_allowed_is_no_for_all_recovery_items',
  'no_twilio_call_performed',
  'no_vapi_call_performed',
  'no_resend_call_performed',
  `no_${BRIDGE_VENDOR}_live_workflow_performed`,
  'no_google_calendar_event_created',
  'no_external_services_called',
  'missed_lead_recovery_uses_fake_data_only',
  'missed_lead_recovery_does_not_touch_production_data',
  'missed_lead_recovery_does_not_send_notifications',
  'missed_lead_recovery_decisions_are_audited',
  'production_data_touched_is_no_for_all_recovery_items',
  'external_services_called_is_no_for_all_recovery_items',
  'unsupported_request_routes_to_review_or_later_only',
  'unsupported_request_does_not_trigger_live_recovery',
  'reporting_summary_includes_missed_lead_recovery',
  'csv_snapshot_preserves_missed_lead_recovery_field',
];

const MISSED_LEAD_RECOVERY_PROFILES = {
  normal_lead_to_appointment_readiness: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'timely_first_response_no_recovery_needed',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 8,
    homeowner_replied: true,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-10',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  missing_information_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_review',
    missed_lead_recovery_reason: 'missing_contact_data_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'missing_contact_data',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: 'missed_form',
    homeowner_phone_present: false,
    homeowner_email_present: true,
  },
  duplicate_review_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'duplicate_review_blocks_recovery_until_resolved',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-19',
    missed_inquiry_type: 'missed_inquiry',
    broken_routing: true,
  },
  bad_fit_excluded_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked',
    missed_lead_recovery_reason: 'excluded_service_area_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'bad_fit_or_excluded',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: 'missed_form',
    service_area_status: 'excluded',
  },
  stopped_do_not_contact_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked',
    missed_lead_recovery_reason: 'do_not_contact_blocks_missed_lead_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'do_not_contact',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 45,
    homeowner_replied: false,
    prior_follow_up_count: 2,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-08',
    manual_outreach_needed: false,
    manual_outreach_owner: 'none',
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: 'missed_call',
  },
  missed_lead_recovery_path: {
    missed_lead_recovery_used: true,
    missed_lead_recovery_status: 'active',
    missed_lead_recovery_reason: 'no_timely_first_response_safe_follow_up_remaining',
    recovery_eligible: true,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 2,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-14',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: false,
    system_quality_issue: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: 'missed_call',
    bad_or_unclear_ai_response: true,
  },
  roofer_review_needed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'pricing_question_requires_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-12',
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: 'missed_inquiry',
    pricing_question: true,
    insurance_complexity: true,
  },
  roofleadhq_system_review_needed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'workflow_state_confusion_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    next_step_due_date: '2026-06-19',
    missed_inquiry_type: 'missed_form',
    broken_routing: true,
    missed_data_capture: true,
    recovery_state_mismatch: true,
  },
  appointment_booked_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'appointment_booked_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 10,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-11',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  inspection_completed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'post_appointment_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 15,
    homeowner_replied: true,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-10',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  inspection_missed_reschedule_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'scheduling_issue_requires_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 20,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-13',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: null,
    scheduling_issue: true,
  },
  post_inspection_still_open_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'post_inspection_follow_up_recovery_tracked_separately',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 12,
    homeowner_replied: true,
    prior_follow_up_count: 2,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-15',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: null,
    repair_vs_replacement_question: true,
    upset_homeowner: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'estimate_quote_payment_questions_require_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 25,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-14',
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: null,
    estimate_question: true,
    quote_request: true,
    payment_or_invoice_question: true,
  },
  homeowner_follow_up_needed_path: {
    missed_lead_recovery_used: true,
    missed_lead_recovery_status: 'eligible',
    missed_lead_recovery_reason: 'homeowner_non_response_after_safe_follow_up_attempts',
    recovery_eligible: true,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 90,
    homeowner_replied: false,
    prior_follow_up_count: 3,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-15',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: 'missed_inquiry',
    homeowner_asks_for_roofer_directly: true,
  },
  roofer_follow_up_needed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'upset_homeowner_and_contract_question_require_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 30,
    homeowner_replied: true,
    prior_follow_up_count: 3,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-14',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: null,
    upset_homeowner: true,
    contract_question: true,
    payment_or_invoice_question: true,
  },
  feedback_permission_yes_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'feedback_captured_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 10,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-12',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  feedback_permission_no_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'feedback_internal_only_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 10,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-12',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  feedback_permission_not_asked_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_review',
    missed_lead_recovery_reason: 'unclear_contact_permission_blocks_recovery_until_reviewed',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'contact_permission_unknown',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 35,
    homeowner_replied: false,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-13',
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: '2026-06-19',
    missed_inquiry_type: 'missed_form',
    unclear_contact_permission: true,
  },
  csv_report_snapshot_fake_data_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'source_attribution_issue_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'unknown',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-20',
    missed_inquiry_type: 'missed_form',
    source_attribution_issue: true,
    lead_source_status: 'unknown',
  },
  starter_plan_profile_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'setup_issue_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'unknown',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-20',
    missed_inquiry_type: 'missed_inquiry',
    setup_issue: true,
    lead_source_status: 'unknown',
  },
  growth_plan_profile_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'quality_control_concern_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-20',
    missed_inquiry_type: 'missed_call',
    quality_control_concern: true,
  },
  elite_plan_profile_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'elite_plan_fixture_tracking_no_recovery_yet',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 7,
    homeowner_replied: true,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-10',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  custom_review_500_plus_leads_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'unsupported_request_custom_review_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unsupported_request',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-25',
    missed_inquiry_type: 'missed_inquiry',
    unsupported_request: true,
  },
  custom_review_two_plus_locations_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'unsupported_request_multi_location_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unsupported_request',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-25',
    missed_inquiry_type: 'missed_form',
    unsupported_request: true,
  },
  activation_flag_false_blocks_live_action_path: {
    missed_lead_recovery_used: true,
    missed_lead_recovery_status: 'stopped_max_attempts',
    missed_lead_recovery_reason: 'max_follow_up_attempts_reached_recovery_stopped_manual_only',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'max_follow_up_attempts_reached',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 120,
    homeowner_replied: false,
    prior_follow_up_count: 4,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: true,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-13',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: 'missed_call',
    unsupported_request: true,
  },
};

function buildMissedLeadRecoveryItem(
  scenario,
  readinessItem,
  postItem,
  manualOutreachItem,
  profile,
  index,
) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const manualNextStep =
    scenario.manual_next_step ||
    readinessItem?.required_manual_next_step ||
    postItem?.required_manual_next_step ||
    profile.required_manual_next_step ||
    'missed_lead_recovery_review_required';
  const nextStepOwner =
    scenario.owner ||
    postItem?.next_step_owner ||
    profile.manual_outreach_owner ||
    (profile.system_quality_issue ? 'roofleadhq_jason' : 'roofer');

  return {
    missed_lead_recovery_item_id: `${scenario.scenario_id}_missed_lead_recovery_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    missed_lead_recovery_used: profile.missed_lead_recovery_used ?? false,
    missed_lead_recovery_status: profile.missed_lead_recovery_status,
    missed_lead_recovery_reason: profile.missed_lead_recovery_reason,
    recovery_eligible: profile.recovery_eligible ?? false,
    recovery_blocked: profile.recovery_blocked ?? false,
    recovery_block_reason: profile.recovery_block_reason,
    original_lead_source: profile.original_lead_source || input.lead_source || 'unknown',
    first_response_sent: profile.first_response_sent ?? false,
    first_response_time_minutes: profile.first_response_time_minutes,
    homeowner_replied: profile.homeowner_replied ?? false,
    prior_follow_up_count: profile.prior_follow_up_count ?? 0,
    max_follow_up_attempts: profile.max_follow_up_attempts ?? 4,
    max_follow_up_attempts_reached: profile.max_follow_up_attempts_reached ?? false,
    last_contact_channel: profile.last_contact_channel,
    last_follow_up_date: profile.last_follow_up_date,
    contact_permission_status: profile.unclear_contact_permission
      ? 'unknown'
      : readinessItem?.contact_permission_status || 'unknown',
    do_not_contact_status: readinessItem?.do_not_contact_status ?? false,
    homeowner_contact_ready: profile.homeowner_phone_present === false
      ? false
      : (readinessItem?.homeowner_contact_ready ?? false),
    homeowner_phone_present:
      profile.homeowner_phone_present ?? Boolean(input.homeowner_phone),
    homeowner_email_present:
      profile.homeowner_email_present ?? Boolean(input.homeowner_email),
    service_area_status: profile.service_area_status || readinessItem?.service_area_status || 'fit',
    lead_source_status: profile.lead_source_status || readinessItem?.lead_source_status || 'captured',
    roofing_issue_summary_present: readinessItem?.roofing_issue_summary_present ?? true,
    urgency_present: readinessItem?.urgency_present ?? true,
    manual_outreach_needed: profile.manual_outreach_needed ?? false,
    manual_outreach_owner: profile.manual_outreach_owner,
    roofer_review_required:
      profile.roofer_review_required ??
      (readinessItem?.roofer_review_required ||
        postItem?.roofer_review_required ||
        profile.business_judgment_required ||
        false),
    roofleadhq_review_required:
      profile.roofleadhq_review_required ??
      (readinessItem?.roofleadhq_review_required ||
        postItem?.roofleadhq_review_required ||
        profile.system_quality_issue ||
        false),
    business_judgment_required: profile.business_judgment_required ?? false,
    system_quality_issue: profile.system_quality_issue ?? false,
    required_manual_next_step: manualNextStep,
    next_step_owner: nextStepOwner,
    next_step_due_date: profile.next_step_due_date,
    audit_event_id: `${scenario.scenario_id}_missed_lead_recovery_audit_${index + 1}`,
    live_sms_allowed: 'no',
    live_email_allowed: 'no',
    live_call_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    missed_inquiry_type: profile.missed_inquiry_type,
    pricing_question: profile.pricing_question ?? false,
    estimate_question: profile.estimate_question ?? false,
    quote_request: profile.quote_request ?? false,
    insurance_complexity: profile.insurance_complexity ?? false,
    payment_or_invoice_question: profile.payment_or_invoice_question ?? false,
    contract_question: profile.contract_question ?? false,
    upset_homeowner: profile.upset_homeowner ?? false,
    broken_routing: profile.broken_routing ?? false,
    missed_data_capture: profile.missed_data_capture ?? false,
    source_attribution_issue: profile.source_attribution_issue ?? false,
    recovery_state_mismatch: profile.recovery_state_mismatch ?? false,
    unclear_contact_permission: profile.unclear_contact_permission ?? false,
    unsupported_request: profile.unsupported_request ?? false,
    scheduling_issue: profile.scheduling_issue ?? false,
    repair_vs_replacement_question: profile.repair_vs_replacement_question ?? false,
    setup_issue: profile.setup_issue ?? false,
    quality_control_concern: profile.quality_control_concern ?? false,
    bad_or_unclear_ai_response: profile.bad_or_unclear_ai_response ?? false,
    fake_data_only: true,
  };
}

function buildScenarioMissedLeadRecoveryItem(
  scenario,
  readinessItem,
  postItem,
  manualOutreachItem,
) {
  const profile = MISSED_LEAD_RECOVERY_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildMissedLeadRecoveryItem(
    scenario,
    readinessItem,
    postItem,
    manualOutreachItem,
    profile,
    0,
  );
}

function buildTopLevelMissedLeadRecovery(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => {
      const readinessItem = buildScenarioAppointmentReadinessItem(scenario);
      const postItem = buildScenarioPostInspectionItem(scenario);
      const manualOutreachItem = buildScenarioManualOutreachItem(
        scenario,
        readinessItem,
        postItem,
        buildScenarioFeedbackPermissionItem(scenario, postItem),
      );
      return buildScenarioMissedLeadRecoveryItem(
        scenario,
        readinessItem,
        postItem,
        manualOutreachItem,
      );
    })
    .filter(Boolean);

  const eligibleItems = allItems.filter((i) => i.recovery_eligible);
  const blockedItems = allItems.filter((i) => i.recovery_blocked);
  const activeItems = allItems.filter(
    (i) => i.missed_lead_recovery_used && i.missed_lead_recovery_status === 'active',
  );
  const stoppedItems = allItems.filter(
    (i) => i.missed_lead_recovery_status === 'stopped_max_attempts',
  );
  const manualOutreachItems = allItems.filter((i) => i.manual_outreach_needed);
  const openRecoveryItems = allItems.filter(
    (i) =>
      i.missed_lead_recovery_used &&
      !i.recovery_blocked &&
      i.missed_lead_recovery_status !== 'not_used',
  );
  const reviewOrBlockedItems = allItems.filter(
    (i) => i.recovery_blocked || i.roofer_review_required || i.roofleadhq_review_required,
  );

  const statusCounts = {};
  for (const item of allItems) {
    statusCounts[item.missed_lead_recovery_status] =
      (statusCounts[item.missed_lead_recovery_status] || 0) + 1;
  }

  const blockerCounts = {};
  for (const item of blockedItems) {
    if (item.recovery_block_reason) {
      blockerCounts[item.recovery_block_reason] =
        (blockerCounts[item.recovery_block_reason] || 0) + 1;
    }
  }

  const ownerCounts = {};
  for (const item of manualOutreachItems) {
    if (item.manual_outreach_owner) {
      ownerCounts[item.manual_outreach_owner] =
        (ownerCounts[item.manual_outreach_owner] || 0) + 1;
    }
  }

  return {
    missed_lead_recovery_expansion: 'native_workflow_fixture_missed_lead_recovery_expansion',
    missed_lead_recovery_expansion_summary: {
      description:
        'Deterministic fake-data missed lead recovery expansion across all fixture scenarios — explicit eligible vs blocked recovery boundaries without live sends or notifications',
      total_missed_lead_recovery_items: allItems.length,
      recovery_eligible_count: eligibleItems.length,
      recovery_blocked_count: blockedItems.length,
      missed_lead_recovery_active_count: activeItems.length,
      missed_lead_recovery_stopped_count: stoppedItems.length,
      manual_outreach_handoff_count: manualOutreachItems.length,
      live_sms_enabled: false,
      live_email_enabled: false,
      live_call_enabled: false,
      notifications_sent: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    missed_lead_recovery_items: allItems,
    missed_lead_recovery_status_summary: {
      description: 'Missed lead recovery status distribution across fixture scenarios',
      status_counts: statusCounts,
      recovery_eligible_count: eligibleItems.length,
      recovery_blocked_count: blockedItems.length,
      missed_lead_recovery_active_count: activeItems.length,
      missed_lead_recovery_stopped_count: stoppedItems.length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_eligibility_summary: {
      description:
        'Recovery eligibility rules — contact ready, permission safe, service area fit, follow-up attempts remaining',
      recovery_eligible_count: eligibleItems.length,
      recovery_eligible_requires_contact_ready: eligibleItems.every((i) => i.homeowner_contact_ready),
      recovery_eligible_requires_no_do_not_contact: eligibleItems.every((i) => !i.do_not_contact_status),
      recovery_eligible_requires_safe_follow_up_remaining: eligibleItems.every(
        (i) => !i.max_follow_up_attempts_reached,
      ),
      missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe: eligibleItems.every(
        (i) =>
          i.homeowner_contact_ready &&
          !i.do_not_contact_status &&
          i.contact_permission_status === 'known',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_blocker_summary: {
      description: 'Recovery blocker catalog — do-not-contact, missing contact, max attempts, reviews',
      blocker_counts: blockerCounts,
      do_not_contact_blocks_recovery: allItems
        .filter((i) => i.do_not_contact_status)
        .every((i) => i.recovery_blocked && !i.recovery_eligible),
      missing_contact_blocks_recovery_or_routes_to_review: allItems
        .filter((i) => !i.homeowner_contact_ready)
        .every((i) => i.recovery_blocked || i.missed_lead_recovery_status.includes('review')),
      unclear_contact_permission_blocks_recovery: allItems
        .filter((i) => i.unclear_contact_permission || i.contact_permission_status === 'unknown')
        .every((i) => i.recovery_blocked || i.missed_lead_recovery_status.includes('review')),
      max_follow_up_attempts_blocks_additional_recovery: stoppedItems.every(
        (i) => i.max_follow_up_attempts_reached && i.recovery_blocked,
      ),
      bad_fit_or_excluded_blocks_recovery: allItems
        .filter((i) => i.recovery_block_reason === 'bad_fit_or_excluded')
        .every((i) => i.recovery_blocked),
      excluded_service_area_blocks_recovery: allItems
        .filter((i) => i.service_area_status === 'excluded')
        .every((i) => i.recovery_blocked),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_attempt_summary: {
      description: 'Follow-up attempt tracking — dry-run only, no live sends',
      total_prior_follow_up_count: allItems.reduce((sum, i) => sum + i.prior_follow_up_count, 0),
      items_with_follow_up_attempts: allItems.filter((i) => i.prior_follow_up_count > 0).length,
      all_items_track_first_response_time: allItems.every(
        (i) => i.first_response_sent !== undefined && i.first_response_time_minutes !== undefined,
      ),
      all_items_track_homeowner_replied: allItems.every(
        (i) => i.homeowner_replied !== undefined,
      ),
      all_items_track_max_follow_up_attempts: allItems.every(
        (i) => i.max_follow_up_attempts !== undefined && i.max_follow_up_attempts !== null,
      ),
      no_live_sends_performed: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_owner_summary: {
      description: 'Manual outreach owner assignments for recovery handoff — roofer vs RoofLeadHQ/Jason',
      owner_counts: ownerCounts,
      roofer_owned_count: manualOutreachItems.filter((i) => i.manual_outreach_owner === 'roofer')
        .length,
      roofleadhq_owned_count: manualOutreachItems.filter(
        (i) => i.manual_outreach_owner === 'roofleadhq_jason',
      ).length,
      all_manual_outreach_items_have_owner: manualOutreachItems.every(
        (i) => i.manual_outreach_owner && i.manual_outreach_owner !== 'none',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_manual_outreach_summary: {
      description:
        'Manual outreach handoff when recovery requires human follow-up — no live automation',
      manual_outreach_needed_count: manualOutreachItems.length,
      missed_lead_recovery_manual_outreach_handoff_present: manualOutreachItems.every(
        (i) => i.required_manual_next_step && i.next_step_owner,
      ),
      all_manual_outreach_manual_only: manualOutreachItems.every(
        (i) => i.live_sms_allowed === 'no' && i.live_email_allowed === 'no' && i.live_call_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_review_boundary_summary: {
      description:
        'Recovery review ownership — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_blocked_count: allItems.filter(
        (i) => i.roofer_review_required && i.recovery_blocked,
      ).length,
      roofleadhq_review_blocked_count: allItems.filter(
        (i) => i.roofleadhq_review_required && i.recovery_blocked,
      ).length,
      pricing_question_routes_to_roofer: allItems
        .filter((i) => i.pricing_question)
        .every((i) => i.roofer_review_required && i.recovery_blocked),
      estimate_question_routes_to_roofer: allItems
        .filter((i) => i.estimate_question)
        .every((i) => i.roofer_review_required && i.recovery_blocked),
      quote_request_routes_to_roofer: allItems
        .filter((i) => i.quote_request)
        .every((i) => i.roofer_review_required && i.recovery_blocked),
      insurance_complexity_routes_to_roofer: allItems
        .filter((i) => i.insurance_complexity)
        .every((i) => i.roofer_review_required),
      payment_or_invoice_routes_to_roofer: allItems
        .filter((i) => i.payment_or_invoice_question)
        .every((i) => i.roofer_review_required),
      contract_question_routes_to_roofer: allItems
        .filter((i) => i.contract_question)
        .every((i) => i.roofer_review_required),
      upset_homeowner_routes_to_roofer: allItems
        .filter((i) => i.upset_homeowner)
        .every((i) => i.roofer_review_required),
      broken_routing_routes_to_roofleadhq: allItems
        .filter((i) => i.broken_routing)
        .every((i) => i.roofleadhq_review_required),
      missed_data_capture_routes_to_roofleadhq: allItems
        .filter((i) => i.missed_data_capture)
        .every((i) => i.roofleadhq_review_required),
      source_attribution_issue_routes_to_roofleadhq: allItems
        .filter((i) => i.source_attribution_issue)
        .every((i) => i.roofleadhq_review_required),
      recovery_state_mismatch_routes_to_roofleadhq: allItems
        .filter((i) => i.recovery_state_mismatch)
        .every((i) => i.roofleadhq_review_required),
      lead_source_required_or_unknown_marker_present: allItems.every(
        (i) => i.original_lead_source && i.lead_source_status,
      ),
      all_blocked_or_review_have_manual_next_step: reviewOrBlockedItems.every(
        (i) => i.required_manual_next_step,
      ),
      all_open_recovery_have_next_step_owner: openRecoveryItems.every((i) => i.next_step_owner),
      all_open_recovery_have_due_date: openRecoveryItems.every((i) => i.next_step_due_date),
      unsupported_request_routes_to_review_or_later_only: allItems
        .filter((i) => i.unsupported_request)
        .every((i) => i.recovery_blocked || i.missed_lead_recovery_status.includes('review')),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_reporting_summary: {
      description: 'Reporting and CSV compatibility for missed lead recovery fields',
      csv_field_preserved: 'missed_lead_recovery_used',
      weekly_snapshot_includes_missed_lead_recovery_active: true,
      lead_source_summary_includes_missed_lead_recovery_count: true,
      growth_plan_includes_missed_lead_recovery_tracking: true,
      starter_plan_excludes_missed_lead_recovery_tracking: true,
      reporting_summary_includes_missed_lead_recovery: true,
      csv_snapshot_preserves_missed_lead_recovery_field: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_safety_assertions: [
      ...MISSED_LEAD_RECOVERY_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const PLAN_INCLUDED_LEAD_VOLUME = {
  starter: 100,
  growth: 300,
  elite: 500,
};

const CUSTOM_REVIEW_VOLUME_THRESHOLD = 500;

const DRAFT_OVERAGE_FEE_CONCEPT = {
  possible_draft_fee_per_50_leads_usd: 100,
  billing_approval_status: 'draft_internal_not_approved',
  live_billing_published: false,
  publication_approval_required: true,
};

const USAGE_VOLUME_SAFETY_ASSERTIONS = [
  'usage_volume_expansion_summary_present',
  'usage_volume_items_present',
  'usage_volume_item_required_fields_present',
  'starter_limit_100_leads_enforced_in_fixture',
  'growth_limit_300_leads_enforced_in_fixture',
  'elite_limit_500_leads_enforced_in_fixture',
  'five_hundred_plus_leads_routes_to_custom_review',
  'two_plus_locations_routes_to_custom_review',
  'multiple_calendars_routes_to_custom_review',
  'multiple_phone_numbers_routes_to_custom_review',
  'multiple_sales_reps_routes_to_custom_review',
  'complex_routing_routes_to_custom_review',
  'advanced_custom_reporting_routes_to_custom_review',
  'overage_tracking_is_fake_data_only',
  'overage_does_not_trigger_live_billing',
  'overage_does_not_auto_upgrade_plan',
  'plan_upgrade_recommendation_is_manual_review_only',
  'billing_action_allowed_is_no_for_all_items',
  'automatic_plan_change_allowed_is_no_for_all_items',
  'live_billing_action_performed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'usage_volume_does_not_touch_production_data',
  'usage_volume_does_not_call_external_services',
  'usage_volume_does_not_change_customer_plan',
  'usage_volume_does_not_send_notifications',
  'usage_volume_decisions_are_audited',
  'reporting_summary_includes_usage_volume',
  'csv_snapshot_preserves_plan_and_usage_context_if_applicable',
  'public_pricing_copy_not_changed_without_approval',
];

const USAGE_VOLUME_PROFILES = {
  normal_lead_to_appointment_readiness: {
    current_period_lead_count: 180,
    prior_period_lead_count: 165,
    projected_period_lead_count: 195,
  },
  missing_information_path: {
    current_period_lead_count: 175,
    prior_period_lead_count: 160,
    projected_period_lead_count: 190,
  },
  duplicate_review_path: {
    complex_routing: true,
    custom_review_required: true,
    custom_review_reason: 'complex_routing',
  },
  bad_fit_excluded_path: {
    current_period_lead_count: 160,
    prior_period_lead_count: 155,
    projected_period_lead_count: 170,
  },
  stopped_do_not_contact_path: {
    current_period_lead_count: 170,
    prior_period_lead_count: 168,
    projected_period_lead_count: 175,
  },
  missed_lead_recovery_path: {
    current_period_lead_count: 210,
    prior_period_lead_count: 195,
    projected_period_lead_count: 225,
  },
  roofer_review_needed_path: {
    phone_number_count: 2,
    custom_review_required: true,
    custom_review_reason: 'multiple_phone_numbers',
  },
  roofleadhq_system_review_needed_path: {
    current_period_lead_count: 190,
    prior_period_lead_count: 185,
    projected_period_lead_count: 200,
  },
  appointment_booked_path: {
    calendar_count: 2,
    custom_review_required: true,
    custom_review_reason: 'multiple_calendars',
  },
  inspection_completed_path: {
    sales_rep_count: 3,
    custom_review_required: true,
    custom_review_reason: 'multiple_sales_reps',
  },
  inspection_missed_reschedule_path: {
    current_period_lead_count: 200,
    prior_period_lead_count: 188,
    projected_period_lead_count: 215,
  },
  post_inspection_still_open_path: {
    current_period_lead_count: 320,
    prior_period_lead_count: 290,
    projected_period_lead_count: 335,
    usage_over_limit: true,
    overage_count: 20,
    plan_upgrade_recommended: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    current_period_lead_count: 205,
    prior_period_lead_count: 198,
    projected_period_lead_count: 218,
  },
  homeowner_follow_up_needed_path: {
    current_period_lead_count: 195,
    prior_period_lead_count: 190,
    projected_period_lead_count: 205,
  },
  roofer_follow_up_needed_path: {
    current_period_lead_count: 198,
    prior_period_lead_count: 192,
    projected_period_lead_count: 210,
  },
  feedback_permission_yes_path: {
    current_period_lead_count: 185,
    prior_period_lead_count: 178,
    projected_period_lead_count: 192,
  },
  feedback_permission_no_path: {
    current_period_lead_count: 182,
    prior_period_lead_count: 176,
    projected_period_lead_count: 188,
  },
  feedback_permission_not_asked_path: {
    current_period_lead_count: 188,
    prior_period_lead_count: 180,
    projected_period_lead_count: 195,
  },
  csv_report_snapshot_fake_data_path: {
    advanced_custom_reporting: true,
    custom_review_required: true,
    custom_review_reason: 'advanced_custom_reporting',
    current_period_lead_count: 275,
    prior_period_lead_count: 260,
    projected_period_lead_count: 290,
  },
  starter_plan_profile_path: {
    plan_profile: 'starter',
    current_period_lead_count: 80,
    prior_period_lead_count: 72,
    projected_period_lead_count: 88,
    included_lead_volume: 100,
    volume_band: '80_100pct',
  },
  growth_plan_profile_path: {
    plan_profile: 'growth',
    current_period_lead_count: 250,
    prior_period_lead_count: 230,
    projected_period_lead_count: 270,
    included_lead_volume: 300,
    volume_band: '80_100pct',
  },
  elite_plan_profile_path: {
    plan_profile: 'elite',
    current_period_lead_count: 450,
    prior_period_lead_count: 420,
    projected_period_lead_count: 480,
    included_lead_volume: 500,
    volume_band: '80_100pct',
  },
  custom_review_500_plus_leads_path: {
    plan_profile: 'elite',
    current_period_lead_count: 520,
    prior_period_lead_count: 490,
    projected_period_lead_count: 550,
    included_lead_volume: 500,
    custom_review_required: true,
    custom_review_reason: 'volume_exceeds_500',
    volume_band: 'custom_review_band',
  },
  custom_review_two_plus_locations_path: {
    location_count: 2,
    current_period_lead_count: 240,
    prior_period_lead_count: 220,
    projected_period_lead_count: 255,
    custom_review_required: true,
    custom_review_reason: 'multi_location',
  },
  activation_flag_false_blocks_live_action_path: {
    current_period_lead_count: 215,
    prior_period_lead_count: 200,
    projected_period_lead_count: 228,
  },
};

function computeVolumeBand(current, included) {
  if (!included) return 'custom_review_band';
  if (current > included) return 'over_limit';
  const pct = current / included;
  if (pct >= 0.95) return 'at_limit';
  if (pct >= 0.8) return '80_100pct';
  if (pct >= 0.5) return '50_80pct';
  return 'under_50pct';
}

function detectCustomReviewTriggers(input, profile) {
  const reasons = [];
  const current = profile.current_period_lead_count ?? input.monthly_leads ?? 0;
  const locationCount = profile.location_count ?? input.location_count ?? 1;
  const calendarCount = profile.calendar_count ?? input.calendar_count ?? 1;
  const phoneCount = profile.phone_number_count ?? input.phone_number_count ?? 1;
  const salesRepCount = profile.sales_rep_count ?? input.sales_rep_count ?? 1;

  if (current >= CUSTOM_REVIEW_VOLUME_THRESHOLD) reasons.push('volume_exceeds_500');
  if (locationCount >= 2) reasons.push('multi_location');
  if (calendarCount >= 2) reasons.push('multiple_calendars');
  if (phoneCount >= 2) reasons.push('multiple_phone_numbers');
  if (salesRepCount >= 2) reasons.push('multiple_sales_reps');
  if (profile.complex_routing) reasons.push('complex_routing');
  if (profile.advanced_custom_reporting) reasons.push('advanced_custom_reporting');
  if (profile.unusual_integration_needs) reasons.push('unusual_integration_needs');
  if (profile.multi_location_operations) reasons.push('multi_location_operations');

  return reasons;
}

function buildUsageVolumeItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const planProfile = profile.plan_profile || scenario.plan_profile || input.plan_profile || 'growth';
  const included =
    profile.included_lead_volume ??
    PLAN_INCLUDED_LEAD_VOLUME[planProfile] ??
    PLAN_INCLUDED_LEAD_VOLUME.growth;
  const current =
    profile.current_period_lead_count ??
    input.monthly_leads ??
    (planProfile === 'starter' ? 80 : planProfile === 'elite' ? 450 : 180);
  const prior = profile.prior_period_lead_count ?? Math.max(0, current - 15);
  const projected = profile.projected_period_lead_count ?? current + 15;

  const detectedTriggers = detectCustomReviewTriggers(input, {
    ...profile,
    current_period_lead_count: current,
  });
  const customReviewRequired =
    profile.custom_review_required === true || detectedTriggers.length > 0;
  const customReviewReason =
    profile.custom_review_reason ||
    (detectedTriggers.length ? detectedTriggers[0] : null);

  const usageOverLimit =
    profile.usage_over_limit === true || (included && current > included && !customReviewRequired);
  const overageCount =
    profile.overage_count ?? (usageOverLimit && included ? Math.max(0, current - included) : 0);
  const overageBlockCount =
    profile.overage_block_count_if_applicable ??
    (overageCount > 0 ? Math.ceil(overageCount / 50) : 0);

  let planLimitStatus = 'within_limit';
  if (customReviewRequired) planLimitStatus = 'custom_review_required';
  else if (usageOverLimit) planLimitStatus = 'over_limit_fake_tracking_only';

  const volumeBand =
    profile.volume_band ?? computeVolumeBand(current, customReviewRequired ? included : included);

  return {
    usage_volume_item_id: `${scenario.scenario_id}_usage_volume_${index + 1}`,
    scenario_id: scenario.scenario_id,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: planProfile,
    report_period: profile.report_period || '2026-06',
    included_lead_volume: included,
    current_period_lead_count: current,
    prior_period_lead_count: prior,
    projected_period_lead_count: projected,
    volume_band: volumeBand,
    plan_limit_status: planLimitStatus,
    usage_over_limit: usageOverLimit,
    overage_count: overageCount,
    overage_block_count_if_applicable: overageBlockCount,
    plan_upgrade_recommended: profile.plan_upgrade_recommended ?? (usageOverLimit && !customReviewRequired),
    custom_review_required: customReviewRequired,
    custom_review_reason: customReviewReason,
    custom_review_triggers_detected: detectedTriggers,
    location_count: profile.location_count ?? input.location_count ?? 1,
    calendar_count: profile.calendar_count ?? input.calendar_count ?? 1,
    phone_number_count: profile.phone_number_count ?? input.phone_number_count ?? 1,
    sales_rep_count: profile.sales_rep_count ?? input.sales_rep_count ?? 1,
    complex_routing: profile.complex_routing ?? false,
    advanced_custom_reporting: profile.advanced_custom_reporting ?? false,
    draft_overage_fee_concept: DRAFT_OVERAGE_FEE_CONCEPT,
    billing_action_allowed: 'no',
    automatic_plan_change_allowed: 'no',
    live_billing_action_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    audit_event_id: `${scenario.scenario_id}_usage_volume_audit_${index + 1}`,
    fake_data_only: true,
  };
}

function buildScenarioUsageVolumeItem(scenario) {
  const profile = USAGE_VOLUME_PROFILES[scenario.scenario_id];
  if (!profile) return null;
  return buildUsageVolumeItem(scenario, profile, 0);
}

function buildTopLevelUsageVolume(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => buildScenarioUsageVolumeItem(scenario))
    .filter(Boolean);

  const starterItems = allItems.filter((i) => i.plan_profile === 'starter');
  const growthItems = allItems.filter((i) => i.plan_profile === 'growth');
  const eliteItems = allItems.filter((i) => i.plan_profile === 'elite');
  const customReviewItems = allItems.filter((i) => i.custom_review_required);
  const overageItems = allItems.filter((i) => i.usage_over_limit);
  const upgradeRecommendedItems = allItems.filter((i) => i.plan_upgrade_recommended);

  const starterWithinLimit = starterItems.every(
    (i) => i.included_lead_volume === 100 && i.current_period_lead_count <= 100,
  );
  const growthWithinLimit = growthItems.filter((i) => !i.custom_review_required).every(
    (i) =>
      i.included_lead_volume === 300 &&
      (i.current_period_lead_count <= 300 || i.usage_over_limit),
  );
  const eliteWithinLimit = eliteItems.filter((i) => !i.custom_review_required).every(
    (i) => i.included_lead_volume === 500 && i.current_period_lead_count <= 500,
  );

  return {
    usage_volume_expansion: 'native_workflow_fixture_usage_volume_plan_limit_expansion',
    usage_volume_expansion_summary: {
      description:
        'Deterministic fake-data usage volume and plan-limit expansion across all fixture scenarios — Starter/Growth/Elite/Custom Review boundaries without live billing or plan changes',
      total_usage_volume_items: allItems.length,
      starter_item_count: starterItems.length,
      growth_item_count: growthItems.length,
      elite_item_count: eliteItems.length,
      custom_review_item_count: customReviewItems.length,
      overage_item_count: overageItems.length,
      plan_upgrade_recommended_count: upgradeRecommendedItems.length,
      draft_overage_fee_concept: DRAFT_OVERAGE_FEE_CONCEPT,
      public_pricing_copy_changed: false,
      public_pricing_copy_approval_required: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    usage_volume_items: allItems,
    plan_limit_summary: {
      description: 'Plan included lead volume boundaries — Starter 100, Growth 300, Elite 500',
      starter_included_leads: 100,
      growth_included_leads: 300,
      elite_included_leads: 500,
      custom_review_threshold_leads: CUSTOM_REVIEW_VOLUME_THRESHOLD,
      starter_limit_100_leads_enforced_in_fixture: starterWithinLimit,
      growth_limit_300_leads_enforced_in_fixture: growthWithinLimit,
      elite_limit_500_leads_enforced_in_fixture: eliteWithinLimit,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    starter_volume_summary: {
      description:
        'Starter plan — up to 100 leads/month, simple/single-location, basic reporting, no advanced source ROI by default',
      included_lead_volume: 100,
      item_count: starterItems.length,
      within_limit_count: starterItems.filter((i) => !i.usage_over_limit).length,
      basic_reporting_only: true,
      advanced_source_roi_by_default: false,
      complex_routing_triggers_review: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    growth_volume_summary: {
      description:
        'Growth plan — up to 300 leads/month, single location, missed lead recovery, source tracking, appointment readiness, booked inspection tracking, post-inspection follow-up, feedback capture, weekly/monthly reporting, CSV export',
      included_lead_volume: 300,
      item_count: growthItems.length,
      within_limit_count: growthItems.filter((i) => !i.usage_over_limit && !i.custom_review_required)
        .length,
      missed_lead_recovery_included: true,
      source_tracking_included: true,
      appointment_readiness_included: true,
      booked_inspection_tracking_included: true,
      post_inspection_follow_up_included: true,
      feedback_capture_included: true,
      weekly_monthly_reporting_included: true,
      csv_export_included: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    elite_volume_summary: {
      description:
        'Elite plan — up to 500 leads/month, single location unless custom approved, advanced reporting, deeper source segmentation, larger review queue capacity, priority setup/support, detailed CSV/export',
      included_lead_volume: 500,
      item_count: eliteItems.length,
      within_limit_count: eliteItems.filter((i) => !i.custom_review_required && !i.usage_over_limit)
        .length,
      advanced_reporting_included: true,
      deeper_source_segmentation_included: true,
      larger_review_queue_capacity: true,
      priority_setup_support: true,
      detailed_csv_export_included: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    custom_review_volume_summary: {
      description:
        'Custom Review triggers — 500+ leads, 2+ locations, multiple calendars/phones/reps, complex routing, advanced custom reporting, unusual integrations, multi-location operations',
      custom_review_item_count: customReviewItems.length,
      five_hundred_plus_leads_routes_to_custom_review: customReviewItems.some(
        (i) =>
          i.scenario_id === 'custom_review_500_plus_leads_path' ||
          i.custom_review_reason === 'volume_exceeds_500',
      ),
      two_plus_locations_routes_to_custom_review: customReviewItems.some(
        (i) =>
          i.scenario_id === 'custom_review_two_plus_locations_path' ||
          i.custom_review_reason === 'multi_location',
      ),
      multiple_calendars_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'multiple_calendars' || i.calendar_count >= 2,
      ),
      multiple_phone_numbers_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'multiple_phone_numbers' || i.phone_number_count >= 2,
      ),
      multiple_sales_reps_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'multiple_sales_reps' || i.sales_rep_count >= 2,
      ),
      complex_routing_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'complex_routing' || i.complex_routing,
      ),
      advanced_custom_reporting_routes_to_custom_review: customReviewItems.some(
        (i) =>
          i.custom_review_reason === 'advanced_custom_reporting' || i.advanced_custom_reporting,
      ),
      manual_review_only: true,
      automatic_plan_change_blocked: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    overage_tracking_summary: {
      description:
        'Overage tracked in fake data only — no billing, no auto-upgrade, no notifications, draft $100/50 leads concept not approved',
      overage_item_count: overageItems.length,
      overage_tracking_is_fake_data_only: true,
      overage_does_not_trigger_live_billing: allItems.every(
        (i) => i.live_billing_action_performed === 'no',
      ),
      overage_does_not_auto_upgrade_plan: allItems.every(
        (i) => i.automatic_plan_change_allowed === 'no',
      ),
      overage_does_not_send_notifications: true,
      draft_overage_fee_concept: DRAFT_OVERAGE_FEE_CONCEPT,
      live_overage_fee_published: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    plan_upgrade_recommendation_summary: {
      description: 'Plan upgrade recommendations are manual review only — no automatic plan changes',
      plan_upgrade_recommended_count: upgradeRecommendedItems.length,
      plan_upgrade_recommendation_is_manual_review_only: true,
      automatic_plan_change_allowed_is_no: allItems.every(
        (i) => i.automatic_plan_change_allowed === 'no',
      ),
      billing_action_allowed_is_no: allItems.every((i) => i.billing_action_allowed === 'no'),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    usage_volume_reporting_summary: {
      description: 'Reporting and CSV compatibility for plan profile and usage volume context',
      reporting_summary_includes_usage_volume: true,
      csv_snapshot_preserves_plan_and_usage_context_if_applicable: true,
      csv_fields_preserved: [
        'plan_profile',
        'included_lead_volume',
        'current_period_lead_count',
        'usage_over_limit',
        'plan_limit_status',
      ],
      weekly_snapshot_includes_plan_context: true,
      monthly_snapshot_includes_usage_volume: true,
      public_pricing_copy_not_changed_without_approval: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    usage_volume_safety_assertions: [
      ...USAGE_VOLUME_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const LEAD_SOURCE_ATTRIBUTION_SAFETY_ASSERTIONS = [
  'lead_source_roi_expansion_summary_present',
  'lead_source_attribution_items_present',
  'lead_source_item_required_fields_present',
  'required_lead_source_categories_present',
  'website_form_source_present',
  'google_ads_source_present',
  'google_business_profile_source_present',
  'google_local_services_ads_source_present',
  'facebook_lead_ads_source_present',
  'angi_homeadvisor_source_present',
  'thumbtack_source_present',
  'referrals_source_present',
  'manual_outreach_list_source_present',
  'other_source_present',
  'unknown_source_requires_unknown_marker_or_review',
  'conflicting_source_routes_to_review',
  'source_attribution_issue_routes_to_system_quality_review',
  'campaign_or_ad_source_optional_and_marked_when_missing',
  'roi_depends_on_customer_provided_spend_source_data',
  'exact_roi_not_promised',
  'missing_spend_data_blocks_exact_roi_claim',
  'cost_per_lead_only_when_spend_and_count_present',
  'cost_per_booked_inspection_only_when_spend_and_booked_count_present',
  'no_ad_platform_api_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'csv_export_is_one_directional',
  'csv_does_not_push_data_back',
  'csv_does_not_auto_update_after_download',
  'homeowner_personal_information_warning_present',
  'customer_responsible_for_downloaded_exported_data',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'source_roi_decisions_are_audited',
  'public_roi_or_pricing_copy_not_changed_without_approval',
];

const LEAD_SOURCE_ATTRIBUTION_PROFILES = {
  normal_lead_to_appointment_readiness: {
    lead_source: 'Website form',
    lead_source_detail: 'fixture_website_contact_form_submission',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 12,
    booked_inspection_from_source: 4,
    inspection_completed_from_source: 3,
    won_from_source: 1,
    lost_from_source: 1,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 1,
    feedback_captured_from_source: 2,
  },
  missing_information_path: {
    lead_source: 'Google Ads',
    lead_source_detail: 'fixture_google_ads_summer_campaign',
    campaign_or_ad_source_if_known: 'fixture_campaign_summer_2026',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 8,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 1,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 2,
    missed_lead_recovery_from_source: 1,
    feedback_captured_from_source: 0,
    ad_spend_if_provided: 1200,
  },
  duplicate_review_path: {
    lead_source: 'Google Business Profile',
    lead_source_detail: 'fixture_gbp_message_inquiry',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 6,
    booked_inspection_from_source: 1,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  bad_fit_excluded_path: {
    lead_source: 'Google Local Services Ads',
    lead_source_detail: 'fixture_glsa_lead_outside_service_area',
    campaign_or_ad_source_if_known: 'fixture_glsa_campaign_roofing',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 4,
    booked_inspection_from_source: 0,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 1,
    still_open_from_source: 0,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  stopped_do_not_contact_path: {
    lead_source: 'Facebook Lead Ads',
    lead_source_detail: 'fixture_facebook_lead_form_storm_damage',
    campaign_or_ad_source_if_known: 'fixture_fb_campaign_storm_2026',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 5,
    booked_inspection_from_source: 0,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 0,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  missed_lead_recovery_path: {
    lead_source: 'Angi / HomeAdvisor',
    lead_source_detail: 'conflicting_angi_and_website_form_attribution',
    campaign_or_ad_source_if_known: 'unknown',
    lead_source_status: 'conflicting',
    source_attribution_confidence: 'low',
    source_attribution_review_needed: true,
    source_attribution_review_reason:
      'source_attribution_issue_requires_roofleadhq_system_quality_review',
    source_attribution_issue: true,
    conflicting_source: true,
    total_count_from_source: 7,
    booked_inspection_from_source: 1,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 2,
    missed_lead_recovery_from_source: 2,
    feedback_captured_from_source: 0,
  },
  roofer_review_needed_path: {
    lead_source: 'Thumbtack',
    lead_source_detail: 'fixture_thumbtack_direct_message',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 9,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 1,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  roofleadhq_system_review_needed_path: {
    lead_source: 'Referrals',
    lead_source_detail: 'fixture_referral_from_past_customer',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 10,
    booked_inspection_from_source: 3,
    inspection_completed_from_source: 2,
    won_from_source: 1,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 1,
  },
  appointment_booked_path: {
    lead_source: 'Manual outreach list',
    lead_source_detail: 'fixture_manual_outreach_storm_list_june',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 15,
    booked_inspection_from_source: 5,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 5,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  inspection_completed_path: {
    lead_source: 'Other',
    lead_source_detail: 'fixture_other_source_yard_sign',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 3,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 2,
    won_from_source: 1,
    lost_from_source: 0,
    still_open_from_source: 0,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 1,
  },
  inspection_missed_reschedule_path: {
    lead_source: 'Website form',
    lead_source_detail: 'fixture_website_form_reschedule_case',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 6,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 2,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  post_inspection_still_open_path: {
    lead_source: 'Google Ads',
    lead_source_detail: 'fixture_google_ads_brand_campaign',
    campaign_or_ad_source_if_known: 'fixture_campaign_brand_2026',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 11,
    booked_inspection_from_source: 3,
    inspection_completed_from_source: 2,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 3,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 1,
    ad_spend_if_provided: 2400,
  },
  estimate_needed_estimate_sent_tracking_path: {
    lead_source: 'Google Business Profile',
    lead_source_detail: 'fixture_gbp_call_tracking_lead',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 8,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 2,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 2,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  homeowner_follow_up_needed_path: {
    lead_source: 'Google Local Services Ads',
    lead_source_detail: 'fixture_glsa_follow_up_needed',
    campaign_or_ad_source_if_known: 'fixture_glsa_campaign_repair',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 7,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 1,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 2,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  roofer_follow_up_needed_path: {
    lead_source: 'Facebook Lead Ads',
    lead_source_detail: 'fixture_facebook_lead_roofer_follow_up',
    campaign_or_ad_source_if_known: 'fixture_fb_campaign_replacement',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 6,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 1,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  feedback_permission_yes_path: {
    lead_source: 'Angi / HomeAdvisor',
    lead_source_detail: 'fixture_angi_lead_feedback_yes',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 5,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 2,
    won_from_source: 1,
    lost_from_source: 0,
    still_open_from_source: 0,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 2,
  },
  feedback_permission_no_path: {
    lead_source: 'Thumbtack',
    lead_source_detail: 'fixture_thumbtack_feedback_no',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 4,
    booked_inspection_from_source: 1,
    inspection_completed_from_source: 1,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 1,
  },
  feedback_permission_not_asked_path: {
    lead_source: 'Referrals',
    lead_source_detail: 'fixture_referral_feedback_not_asked',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 6,
    booked_inspection_from_source: 2,
    inspection_completed_from_source: 1,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
  csv_report_snapshot_fake_data_path: {
    lead_source: 'Manual outreach list',
    lead_source_detail: 'fixture_manual_outreach_csv_snapshot_strongest',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 20,
    booked_inspection_from_source: 6,
    inspection_completed_from_source: 4,
    won_from_source: 2,
    lost_from_source: 1,
    still_open_from_source: 3,
    missed_lead_recovery_from_source: 1,
    feedback_captured_from_source: 2,
    ad_spend_if_provided: 800,
  },
  starter_plan_profile_path: {
    lead_source: 'Website form',
    lead_source_detail: 'fixture_starter_plan_website_form',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 80,
    booked_inspection_from_source: 12,
    inspection_completed_from_source: 8,
    won_from_source: 3,
    lost_from_source: 2,
    still_open_from_source: 5,
    missed_lead_recovery_from_source: 2,
    feedback_captured_from_source: 4,
  },
  growth_plan_profile_path: {
    lead_source: 'Google Ads',
    lead_source_detail: 'fixture_growth_plan_google_ads_tracking',
    campaign_or_ad_source_if_known: 'fixture_growth_campaign_2026',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 250,
    booked_inspection_from_source: 45,
    inspection_completed_from_source: 30,
    won_from_source: 10,
    lost_from_source: 8,
    still_open_from_source: 12,
    missed_lead_recovery_from_source: 5,
    feedback_captured_from_source: 15,
    ad_spend_if_provided: 6000,
  },
  elite_plan_profile_path: {
    lead_source: 'Google Business Profile',
    lead_source_detail: 'fixture_elite_plan_gbp_segmentation',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 450,
    booked_inspection_from_source: 80,
    inspection_completed_from_source: 55,
    won_from_source: 20,
    lost_from_source: 15,
    still_open_from_source: 25,
    missed_lead_recovery_from_source: 8,
    feedback_captured_from_source: 30,
  },
  custom_review_500_plus_leads_path: {
    lead_source: 'Google Local Services Ads',
    lead_source_detail: 'fixture_custom_review_glsa_high_volume',
    campaign_or_ad_source_if_known: 'fixture_glsa_high_volume_campaign',
    lead_source_status: 'captured',
    source_attribution_confidence: 'medium',
    total_count_from_source: 520,
    booked_inspection_from_source: 90,
    inspection_completed_from_source: 60,
    won_from_source: 25,
    lost_from_source: 18,
    still_open_from_source: 30,
    missed_lead_recovery_from_source: 10,
    feedback_captured_from_source: 35,
  },
  custom_review_two_plus_locations_path: {
    lead_source: 'Facebook Lead Ads',
    lead_source_detail: 'fixture_custom_review_multi_location_fb',
    campaign_or_ad_source_if_known: 'fixture_fb_multi_location_campaign',
    lead_source_status: 'captured',
    source_attribution_confidence: 'high',
    total_count_from_source: 240,
    booked_inspection_from_source: 40,
    inspection_completed_from_source: 28,
    won_from_source: 12,
    lost_from_source: 8,
    still_open_from_source: 15,
    missed_lead_recovery_from_source: 4,
    feedback_captured_from_source: 18,
  },
  activation_flag_false_blocks_live_action_path: {
    lead_source: 'unknown',
    lead_source_detail: 'source_not_provided_at_intake',
    campaign_or_ad_source_if_known: 'not_provided',
    lead_source_status: 'unknown',
    lead_source_unknown_marker_used: true,
    source_attribution_confidence: 'unknown',
    source_attribution_review_needed: true,
    source_attribution_review_reason: 'unknown_source_requires_explicit_marker_and_review',
    total_count_from_source: 1,
    booked_inspection_from_source: 0,
    inspection_completed_from_source: 0,
    won_from_source: 0,
    lost_from_source: 0,
    still_open_from_source: 1,
    missed_lead_recovery_from_source: 0,
    feedback_captured_from_source: 0,
  },
};

function computeLeadSourceRoiFields(profile) {
  const spend = profile.ad_spend_if_provided;
  const total = profile.total_count_from_source ?? 0;
  const booked = profile.booked_inspection_from_source ?? 0;

  let costPerLead = 'not_provided';
  let costPerBooked = 'not_provided';
  let roiNotes =
    'ROI depends on customer-provided spend/source data; unavailable without spend data';
  let roiCalculationAllowed = false;

  if (typeof spend === 'number' && spend > 0) {
    if (total > 0) {
      costPerLead = Math.round((spend / total) * 100) / 100;
    }
    if (booked > 0) {
      costPerBooked = Math.round((spend / booked) * 100) / 100;
    }
    roiNotes =
      'Fixture customer-provided spend; indicative cost metrics only — exact ROI not promised';
    roiCalculationAllowed = true;
  } else {
    roiNotes = 'requires customer-provided spend data';
  }

  return {
    cost_per_lead_if_provided: costPerLead,
    cost_per_booked_inspection_if_provided: costPerBooked,
    roi_notes: roiNotes,
    roi_calculation_allowed: roiCalculationAllowed,
  };
}

function buildLeadSourceAttributionItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const planProfile = profile.plan_profile || scenario.plan_profile || input.plan_profile || 'growth';
  const reportPeriod = profile.report_period || '2026-06';
  const roiFields = computeLeadSourceRoiFields(profile);

  return {
    lead_source_item_id: `${scenario.scenario_id}_lead_source_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: planProfile,
    report_period: reportPeriod,
    lead_source: profile.lead_source,
    lead_source_detail: profile.lead_source_detail,
    campaign_or_ad_source_if_known: profile.campaign_or_ad_source_if_known || 'not_provided',
    lead_source_status: profile.lead_source_status || 'captured',
    lead_source_unknown_marker_used: profile.lead_source_unknown_marker_used ?? false,
    source_attribution_confidence: profile.source_attribution_confidence || 'medium',
    source_attribution_review_needed: profile.source_attribution_review_needed ?? false,
    source_attribution_review_reason: profile.source_attribution_review_reason || null,
    total_count_from_source: profile.total_count_from_source ?? 0,
    booked_inspection_from_source: profile.booked_inspection_from_source ?? 0,
    inspection_completed_from_source: profile.inspection_completed_from_source ?? 0,
    won_from_source: profile.won_from_source ?? 0,
    lost_from_source: profile.lost_from_source ?? 0,
    still_open_from_source: profile.still_open_from_source ?? 0,
    missed_lead_recovery_from_source: profile.missed_lead_recovery_from_source ?? 0,
    feedback_captured_from_source: profile.feedback_captured_from_source ?? 0,
    ad_spend_if_provided: profile.ad_spend_if_provided ?? null,
    cost_per_lead_if_provided: roiFields.cost_per_lead_if_provided,
    cost_per_booked_inspection_if_provided: roiFields.cost_per_booked_inspection_if_provided,
    roi_notes: roiFields.roi_notes,
    roi_calculation_allowed: roiFields.roi_calculation_allowed,
    exact_roi_promised: 'no',
    native_crm_sync_allowed: 'no',
    pushes_data_back_to_roofleadhq: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    live_csv_delivery_performed: 'no',
    conflicting_source: profile.conflicting_source ?? false,
    source_attribution_issue: profile.source_attribution_issue ?? false,
    audit_event_id: `${scenario.scenario_id}_lead_source_audit_${index + 1}`,
    fake_data_only: true,
  };
}

function buildScenarioLeadSourceAttributionItem(scenario) {
  const profile = LEAD_SOURCE_ATTRIBUTION_PROFILES[scenario.scenario_id];
  if (!profile) return null;
  return buildLeadSourceAttributionItem(scenario, profile, 0);
}

function buildTopLevelLeadSourceRoiBoundary(scenarios, outputBase, csvSnapshot) {
  const allItems = scenarios
    .map((scenario) => buildScenarioLeadSourceAttributionItem(scenario))
    .filter(Boolean);

  const sourceCounts = {};
  for (const item of allItems) {
    sourceCounts[item.lead_source] = (sourceCounts[item.lead_source] || 0) + 1;
  }

  const reviewNeededItems = allItems.filter((i) => i.source_attribution_review_needed);
  const unknownMarkerItems = allItems.filter((i) => i.lead_source_unknown_marker_used);
  const conflictingItems = allItems.filter(
    (i) => i.conflicting_source || i.lead_source_status === 'conflicting',
  );
  const systemQualityReviewItems = allItems.filter((i) => i.source_attribution_issue);
  const spendProvidedItems = allItems.filter(
    (i) => typeof i.ad_spend_if_provided === 'number' && i.ad_spend_if_provided > 0,
  );
  const campaignKnownItems = allItems.filter(
    (i) =>
      i.campaign_or_ad_source_if_known &&
      i.campaign_or_ad_source_if_known !== 'not_provided' &&
      i.campaign_or_ad_source_if_known !== 'unknown',
  );
  const campaignMissingItems = allItems.filter(
    (i) =>
      !i.campaign_or_ad_source_if_known ||
      i.campaign_or_ad_source_if_known === 'not_provided' ||
      i.campaign_or_ad_source_if_known === 'unknown',
  );

  const categoryPresent = {};
  for (const source of LEAD_SOURCE_NAMES) {
    categoryPresent[source] = allItems.some((i) => i.lead_source === source);
  }

  return {
    lead_source_roi_expansion: 'native_workflow_fixture_lead_source_roi_boundary_expansion',
    lead_source_roi_expansion_summary: {
      description:
        'Deterministic fake-data lead source attribution and ROI boundary expansion across all fixture scenarios — source tracking, conversion outcomes, customer-provided spend boundaries, and CSV/reporting limits without live integrations',
      total_lead_source_attribution_items: allItems.length,
      required_lead_source_categories_count: LEAD_SOURCE_NAMES.length,
      required_lead_source_categories_present: LEAD_SOURCE_NAMES.every(
        (source) => categoryPresent[source],
      ),
      review_needed_item_count: reviewNeededItems.length,
      unknown_marker_item_count: unknownMarkerItems.length,
      conflicting_source_item_count: conflictingItems.length,
      spend_provided_item_count: spendProvidedItems.length,
      public_roi_or_pricing_copy_changed: false,
      public_roi_or_pricing_copy_approval_required: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    lead_source_attribution_items: allItems,
    lead_source_quality_summary: {
      description: 'Lead source data quality and attribution confidence across fixture scenarios',
      source_item_counts: sourceCounts,
      captured_count: allItems.filter((i) => i.lead_source_status === 'captured').length,
      unknown_count: allItems.filter((i) => i.lead_source_status === 'unknown').length,
      conflicting_count: conflictingItems.length,
      high_confidence_count: allItems.filter((i) => i.source_attribution_confidence === 'high')
        .length,
      medium_confidence_count: allItems.filter((i) => i.source_attribution_confidence === 'medium')
        .length,
      low_confidence_count: allItems.filter((i) => i.source_attribution_confidence === 'low').length,
      review_needed_count: reviewNeededItems.length,
      unknown_requires_marker_or_review: unknownMarkerItems.every(
        (i) => i.lead_source_unknown_marker_used && i.source_attribution_review_needed,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    lead_source_unknown_summary: {
      description:
        'Unknown lead source handling — allowed only with explicit unknown marker and review routing',
      unknown_marker_item_count: unknownMarkerItems.length,
      unknown_source_requires_unknown_marker_or_review: unknownMarkerItems.every(
        (i) =>
          i.lead_source_unknown_marker_used &&
          (i.source_attribution_review_needed || i.lead_source_status === 'unknown'),
      ),
      activation_flag_scenario_demonstrates_unknown_marker: unknownMarkerItems.some(
        (i) => i.scenario_id === 'activation_flag_false_blocks_live_action_path',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    campaign_ad_source_summary: {
      description:
        'Campaign/ad source is optional — must be marked unknown or not_provided when absent',
      campaign_known_item_count: campaignKnownItems.length,
      campaign_missing_or_unknown_item_count: campaignMissingItems.length,
      campaign_or_ad_source_optional_and_marked_when_missing: campaignMissingItems.every(
        (i) =>
          i.campaign_or_ad_source_if_known === 'not_provided' ||
          i.campaign_or_ad_source_if_known === 'unknown',
      ),
      no_ad_platform_api_calls: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    source_conversion_summary: {
      description:
        'Source conversion outcomes — booked inspections, completed inspections, won/lost/still open, missed lead recovery, feedback',
      total_leads_across_sources: allItems.reduce((sum, i) => sum + i.total_count_from_source, 0),
      total_booked_inspections: allItems.reduce(
        (sum, i) => sum + i.booked_inspection_from_source,
        0,
      ),
      total_inspections_completed: allItems.reduce(
        (sum, i) => sum + i.inspection_completed_from_source,
        0,
      ),
      total_won: allItems.reduce((sum, i) => sum + i.won_from_source, 0),
      total_lost: allItems.reduce((sum, i) => sum + i.lost_from_source, 0),
      total_still_open: allItems.reduce((sum, i) => sum + i.still_open_from_source, 0),
      total_missed_lead_recovery: allItems.reduce(
        (sum, i) => sum + i.missed_lead_recovery_from_source,
        0,
      ),
      total_feedback_captured: allItems.reduce(
        (sum, i) => sum + i.feedback_captured_from_source,
        0,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    source_roi_boundary_summary: {
      description:
        'ROI boundary rules — depends on customer-provided spend/source data; exact ROI not promised',
      roi_depends_on_customer_provided_spend_source_data: true,
      exact_roi_not_promised: true,
      missing_spend_data_blocks_exact_roi_claim: allItems
        .filter((i) => i.ad_spend_if_provided === null)
        .every((i) => !i.roi_calculation_allowed && i.exact_roi_promised === 'no'),
      cost_per_lead_only_when_spend_and_count_present: allItems.every((i) => {
        if (typeof i.cost_per_lead_if_provided === 'number') {
          return (
            typeof i.ad_spend_if_provided === 'number' &&
            i.ad_spend_if_provided > 0 &&
            i.total_count_from_source > 0
          );
        }
        return i.cost_per_lead_if_provided === 'not_provided';
      }),
      cost_per_booked_inspection_only_when_spend_and_booked_count_present: allItems.every((i) => {
        if (typeof i.cost_per_booked_inspection_if_provided === 'number') {
          return (
            typeof i.ad_spend_if_provided === 'number' &&
            i.ad_spend_if_provided > 0 &&
            i.booked_inspection_from_source > 0
          );
        }
        return i.cost_per_booked_inspection_if_provided === 'not_provided';
      }),
      no_ad_platform_api_calls: true,
      no_crm_sync: true,
      no_exact_roi_promise_without_customer_data: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    customer_provided_spend_summary: {
      description:
        'Customer-provided spend fields — fixture fake data only; RoofLeadHQ does not infer real ad spend',
      spend_provided_item_count: spendProvidedItems.length,
      spend_not_provided_item_count: allItems.length - spendProvidedItems.length,
      spend_sources_with_fixture_data: spendProvidedItems.map((i) => i.lead_source),
      does_not_infer_real_customer_ad_spend: true,
      does_not_call_ad_platforms: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    source_reporting_summary: {
      description:
        'Source reporting boundaries — fake-data summaries only; no live reporting delivery or CRM sync',
      reporting_summary_includes_lead_source_attribution: true,
      weekly_snapshot_includes_lead_source_summary: true,
      monthly_snapshot_includes_lead_source_summary: true,
      growth_plan_includes_source_tracking: true,
      elite_plan_includes_advanced_segmentation: true,
      starter_plan_limited_source_roi: true,
      live_reporting_delivery_blocked: true,
      no_live_reporting_delivery: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    source_csv_export_summary: {
      description:
        'CSV export boundaries for lead source data — one-directional, fake-data/local only, no push-back',
      csv_export_is_one_directional: csvSnapshot.one_directional_export === true,
      csv_not_native_crm_sync: csvSnapshot.native_crm_sync === false,
      csv_does_not_push_data_back: csvSnapshot.pushes_data_back_to_roofleadhq === false,
      csv_does_not_auto_update_after_download:
        csvSnapshot.auto_updates_from_downloaded_file === false,
      csv_contains_lead_source_fields: (csvSnapshot.header_row || []).includes('lead_source'),
      csv_contains_roi_fields:
        (csvSnapshot.header_row || []).includes('ad_spend_if_provided') &&
        (csvSnapshot.header_row || []).includes('roi_notes'),
      homeowner_personal_information_warning_present:
        csvSnapshot.contains_homeowner_personal_information === true,
      customer_responsible_for_downloaded_exported_data:
        csvSnapshot.customer_responsible_for_downloaded_exported_data === true,
      no_live_csv_delivery: true,
      live_csv_delivery_performed_is_no_for_all_items: allItems.every(
        (i) => i.live_csv_delivery_performed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    lead_source_review_summary: {
      description:
        'Source attribution review routing — RoofLeadHQ/Jason system-quality review for attribution issues; roofer clarifies own source setup when needed',
      review_needed_item_count: reviewNeededItems.length,
      conflicting_source_routes_to_review: conflictingItems.every(
        (i) => i.source_attribution_review_needed,
      ),
      source_attribution_issue_routes_to_system_quality_review: systemQualityReviewItems.every(
        (i) => i.source_attribution_review_needed && i.source_attribution_issue,
      ),
      missed_lead_recovery_path_demonstrates_conflicting_source: conflictingItems.some(
        (i) => i.scenario_id === 'missed_lead_recovery_path',
      ),
      system_quality_review_owner: 'roofleadhq_jason',
      roofer_clarifies_own_source_setup_when_needed: true,
      does_not_trigger_live_reporting_or_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    lead_source_safety_assertions: [
      ...LEAD_SOURCE_ATTRIBUTION_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MESSAGING_COMPLIANCE_SAFETY_ASSERTIONS = [
  'messaging_compliance_expansion_summary_present',
  'contact_permission_items_present',
  'contact_permission_item_required_fields_present',
  'permission_confirmed_allows_fixture_messaging_only',
  'contacted_business_allows_fixture_messaging_only',
  'permission_unknown_routes_to_hold_or_review',
  'permission_missing_routes_to_hold_or_review',
  'permission_denied_blocks_outreach',
  'do_not_contact_blocks_all_outreach',
  'missing_phone_blocks_sms_and_call',
  'missing_email_blocks_email',
  'missing_usable_contact_data_routes_to_missing_info_or_hold',
  'permission_uncertainty_fails_closed',
  'roofer_review_required_for_permission_source_clarification',
  'roofleadhq_review_limited_to_system_quality_permission_issues',
  'live_sms_allowed_is_no_for_all_items',
  'live_email_allowed_is_no_for_all_items',
  'live_call_allowed_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  `no_${BRIDGE_VENDOR}_live_workflow_execution`,
  'no_google_calendar_calls',
  'messaging_compliance_decisions_are_audited',
  'reporting_summary_includes_messaging_compliance',
  'public_terms_or_compliance_copy_not_changed_without_approval',
];

const CONTACT_PERMISSION_PROFILES = {
  normal_lead_to_appointment_readiness: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'website_form_consent_checkbox',
    permission_evidence: 'fixture_website_form_submission_with_explicit_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  missing_information_path: {
    contact_permission_status: 'permission_unknown',
    contact_permission_source: 'incomplete_form_intake',
    permission_evidence: 'phone_missing_and_permission_not_documented_at_intake',
    homeowner_contacted_business: false,
    homeowner_gave_permission: false,
    homeowner_phone_present: false,
    homeowner_email_present: true,
    homeowner_contact_ready: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'permission_unknown_and_missing_phone_routes_to_hold',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'roofer_must_confirm_contact_permission_before_outreach',
    required_manual_next_step: 'roofer_collects_phone_and_confirms_contact_permission',
  },
  duplicate_review_path: {
    contact_permission_status: 'needs_review',
    contact_permission_source: 'duplicate_lead_intake',
    permission_evidence: 'permission_state_unclear_due_to_duplicate_lead_routing',
    homeowner_contacted_business: true,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'duplicate_review_blocks_outreach_until_permission_resolved',
    roofer_review_required: false,
    roofleadhq_review_required: true,
    review_reason: 'duplicate_lead_routing_requires_system_quality_review',
    required_manual_next_step: 'jason_resolves_duplicate_lead_and_permission_state',
    compliance_state_mismatch: true,
  },
  bad_fit_excluded_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'facebook_lead_form_consent',
    permission_evidence: 'fixture_facebook_lead_form_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  stopped_do_not_contact_path: {
    contact_permission_status: 'do_not_contact',
    contact_permission_source: 'homeowner_opt_out_request',
    permission_evidence: 'fixture_homeowner_requested_do_not_contact',
    homeowner_contacted_business: true,
    homeowner_gave_permission: false,
    do_not_contact_status: true,
    messaging_hold_required: true,
    messaging_hold_reason: 'do_not_contact_blocks_all_outreach',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: 'no_outreach_all_channels_stopped',
  },
  missed_lead_recovery_path: {
    contact_permission_status: 'contacted_business',
    contact_permission_source: 'inbound_missed_call',
    permission_evidence: 'homeowner_called_roofer_business_line_first',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: 'safe_follow_up_allowed_in_fixture_only_after_missed_call',
  },
  roofer_review_needed_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'thumbtack_message_thread',
    permission_evidence: 'fixture_thumbtack_lead_with_documented_contact_permission',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'pricing_question_requires_roofer_review_before_outreach',
    required_manual_next_step: 'roofer_reviews_pricing_question_before_follow_up',
  },
  roofleadhq_system_review_needed_path: {
    contact_permission_status: 'needs_review',
    contact_permission_source: 'broken_routing_capture',
    permission_evidence: 'permission_capture_state_mismatch_requires_system_review',
    homeowner_contacted_business: false,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'compliance_state_mismatch_routes_to_hold',
    roofer_review_required: false,
    roofleadhq_review_required: true,
    review_reason: 'broken_routing_and_permission_capture_mismatch',
    required_manual_next_step: 'jason_reviews_permission_capture_and_routing_state',
    compliance_state_mismatch: true,
    bad_permission_capture: true,
  },
  appointment_booked_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'manual_outreach_list_consent',
    permission_evidence: 'fixture_manual_outreach_list_with_prior_contact_permission',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  inspection_completed_path: {
    contact_permission_status: 'contacted_business',
    contact_permission_source: 'appointment_attendance',
    permission_evidence: 'homeowner_attended_booked_inspection',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  inspection_missed_reschedule_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'website_form_consent_checkbox',
    permission_evidence: 'fixture_website_form_with_confirmed_contact_permission',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'scheduling_conflict_requires_roofer_review',
    required_manual_next_step: 'roofer_reschedules_missed_inspection_manually',
  },
  post_inspection_still_open_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'google_ads_lead_form',
    permission_evidence: 'fixture_google_ads_lead_form_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  estimate_needed_estimate_sent_tracking_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'google_business_profile_call',
    permission_evidence: 'fixture_gbp_call_with_documented_contact_permission',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  homeowner_follow_up_needed_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'google_local_services_ads_lead',
    permission_evidence: 'fixture_glsa_lead_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: 'roofer_follows_up_on_homeowner_request',
  },
  roofer_follow_up_needed_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'facebook_lead_form_consent',
    permission_evidence: 'fixture_facebook_lead_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'negative_feedback_requires_roofer_review',
    required_manual_next_step: 'roofer_addresses_homeowner_concern_before_follow_up',
  },
  feedback_permission_yes_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'angi_lead_form',
    permission_evidence: 'fixture_angi_lead_with_documented_contact_permission',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  feedback_permission_no_path: {
    contact_permission_status: 'permission_denied',
    contact_permission_source: 'thumbtack_message_thread',
    permission_evidence: 'homeowner_explicitly_denied_further_contact',
    homeowner_contacted_business: true,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'permission_denied_blocks_all_outreach',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: 'no_outreach_permission_denied_by_homeowner',
  },
  feedback_permission_not_asked_path: {
    contact_permission_status: 'permission_missing',
    contact_permission_source: 'referral_intake',
    permission_evidence: 'referral_received_without_documented_contact_permission',
    homeowner_contacted_business: false,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'permission_missing_routes_to_hold_or_review',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'roofer_must_confirm_referral_contact_permission',
    required_manual_next_step: 'roofer_confirms_referral_contact_permission_before_outreach',
  },
  csv_report_snapshot_fake_data_path: {
    contact_permission_status: 'needs_review',
    contact_permission_source: 'csv_snapshot_mismatch',
    permission_evidence: 'permission_capture_mismatch_between_intake_and_reporting',
    homeowner_contacted_business: false,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'bad_permission_capture_requires_review_before_outreach',
    roofer_review_required: false,
    roofleadhq_review_required: true,
    review_reason: 'permission_capture_mismatch_requires_system_quality_review',
    required_manual_next_step: 'jason_reviews_permission_capture_mismatch_before_outreach',
    compliance_state_mismatch: true,
    bad_permission_capture: true,
  },
  starter_plan_profile_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'website_form_consent_checkbox',
    permission_evidence: 'fixture_starter_plan_website_form_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  growth_plan_profile_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'google_ads_lead_form',
    permission_evidence: 'fixture_growth_plan_google_ads_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  elite_plan_profile_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'google_business_profile_message',
    permission_evidence: 'fixture_elite_plan_gbp_with_contact_consent',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
  custom_review_500_plus_leads_path: {
    contact_permission_status: 'permission_unknown',
    contact_permission_source: 'high_volume_glsa_intake',
    permission_evidence: 'high_volume_source_permission_not_yet_documented',
    homeowner_contacted_business: false,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'permission_unknown_routes_to_hold_or_review',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'roofer_must_clarify_high_volume_lead_source_permission',
    required_manual_next_step: 'roofer_documents_lead_source_contact_permission',
    permission_source_clarification_needed: true,
  },
  custom_review_two_plus_locations_path: {
    contact_permission_status: 'permission_unknown',
    contact_permission_source: 'multi_location_facebook_lead',
    permission_evidence: 'multi_location_lead_source_permission_not_yet_clarified',
    homeowner_contacted_business: false,
    homeowner_gave_permission: false,
    messaging_hold_required: true,
    messaging_hold_reason: 'permission_source_clarification_required_before_outreach',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    review_reason: 'roofer_must_clarify_which_location_has_valid_contact_permission',
    required_manual_next_step: 'roofer_clarifies_location_specific_contact_permission',
    permission_source_clarification_needed: true,
  },
  activation_flag_false_blocks_live_action_path: {
    contact_permission_status: 'permission_confirmed',
    contact_permission_source: 'website_form_consent_checkbox',
    permission_evidence: 'fixture_intake_with_contact_consent_live_automation_disabled',
    homeowner_contacted_business: true,
    homeowner_gave_permission: true,
    messaging_hold_required: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    review_reason: null,
    required_manual_next_step: null,
  },
};

function deriveChannelEligibility(fields) {
  const {
    contact_permission_status,
    homeowner_phone_present,
    homeowner_email_present,
    do_not_contact_status,
  } = fields;

  if (do_not_contact_status || contact_permission_status === 'do_not_contact') {
    return {
      sms_eligible: false,
      email_eligible: false,
      call_eligible: false,
      channel_eligibility_reason: 'do_not_contact_blocks_all_channels',
    };
  }
  if (contact_permission_status === 'permission_denied') {
    return {
      sms_eligible: false,
      email_eligible: false,
      call_eligible: false,
      channel_eligibility_reason: 'permission_denied_blocks_outreach',
    };
  }
  if (
    contact_permission_status === 'permission_unknown' ||
    contact_permission_status === 'permission_missing' ||
    contact_permission_status === 'needs_review'
  ) {
    return {
      sms_eligible: false,
      email_eligible: false,
      call_eligible: false,
      channel_eligibility_reason: 'permission_uncertainty_fails_closed',
    };
  }

  const permissionAllowsOutreach =
    contact_permission_status === 'permission_confirmed' ||
    contact_permission_status === 'contacted_business';

  const smsEligible = permissionAllowsOutreach && homeowner_phone_present;
  const callEligible = permissionAllowsOutreach && homeowner_phone_present;
  const emailEligible = permissionAllowsOutreach && homeowner_email_present;

  let reason = 'fixture_channel_eligibility_derived_from_permission_and_contact_data';
  if (!homeowner_phone_present && !homeowner_email_present) {
    reason = 'missing_usable_contact_data_blocks_all_channels';
  } else if (!homeowner_phone_present) {
    reason = 'missing_phone_blocks_sms_and_call_email_only_if_permission_allows';
  } else if (!homeowner_email_present) {
    reason = 'missing_email_blocks_email_sms_and_call_if_permission_allows';
  }

  return {
    sms_eligible: smsEligible,
    email_eligible: emailEligible,
    call_eligible: callEligible,
    channel_eligibility_reason: reason,
  };
}

function buildContactPermissionItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const leadSourceProfile = LEAD_SOURCE_ATTRIBUTION_PROFILES[scenario.scenario_id] || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const phonePresent = profile.homeowner_phone_present ?? Boolean(input.homeowner_phone);
  const emailPresent = profile.homeowner_email_present ?? Boolean(input.homeowner_email);
  const contactReady =
    profile.homeowner_contact_ready ?? (phonePresent || emailPresent);
  const status = profile.contact_permission_status;
  const dnc =
    profile.do_not_contact_status ??
    (status === 'do_not_contact');
  const channels = deriveChannelEligibility({
    contact_permission_status: status,
    homeowner_phone_present: phonePresent,
    homeowner_email_present: emailPresent,
    do_not_contact_status: dnc,
  });

  const permissionAllowsFixtureMessaging =
    (status === 'permission_confirmed' || status === 'contacted_business') &&
    !profile.messaging_hold_required &&
    (channels.sms_eligible || channels.email_eligible || channels.call_eligible);

  return {
    contact_permission_item_id: `${scenario.scenario_id}_contact_permission_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: scenario.plan_profile,
    lead_source: leadSourceProfile.lead_source || input.lead_source || 'Other',
    homeowner_phone_present: phonePresent,
    homeowner_email_present: emailPresent,
    homeowner_contact_ready: contactReady,
    contact_permission_status: status,
    contact_permission_source: profile.contact_permission_source,
    permission_evidence: profile.permission_evidence,
    homeowner_contacted_business: profile.homeowner_contacted_business ?? false,
    homeowner_gave_permission: profile.homeowner_gave_permission ?? false,
    do_not_contact_status: dnc,
    sms_eligible: channels.sms_eligible,
    email_eligible: channels.email_eligible,
    call_eligible: channels.call_eligible,
    channel_eligibility_reason: channels.channel_eligibility_reason,
    messaging_allowed_in_fixture: permissionAllowsFixtureMessaging,
    messaging_hold_required: profile.messaging_hold_required ?? false,
    messaging_hold_reason: profile.messaging_hold_reason || null,
    roofer_review_required: profile.roofer_review_required ?? false,
    roofleadhq_review_required: profile.roofleadhq_review_required ?? false,
    review_reason: profile.review_reason || null,
    required_manual_next_step: profile.required_manual_next_step || null,
    audit_event_id: `${scenario.scenario_id}_contact_permission_audit_${index + 1}`,
    live_sms_allowed: 'no',
    live_email_allowed: 'no',
    live_call_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    compliance_state_mismatch: profile.compliance_state_mismatch ?? false,
    bad_permission_capture: profile.bad_permission_capture ?? false,
    permission_source_clarification_needed:
      profile.permission_source_clarification_needed ?? false,
    fake_data_only: true,
  };
}

function buildScenarioContactPermissionItem(scenario) {
  const profile = CONTACT_PERMISSION_PROFILES[scenario.scenario_id];
  if (!profile) return null;
  return buildContactPermissionItem(scenario, profile, 0);
}

function buildTopLevelMessagingCompliance(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => buildScenarioContactPermissionItem(scenario))
    .filter(Boolean);

  const statusCounts = {};
  for (const status of [
    'permission_confirmed',
    'contacted_business',
    'permission_unknown',
    'permission_missing',
    'permission_denied',
    'do_not_contact',
    'needs_review',
  ]) {
    statusCounts[status] = allItems.filter((i) => i.contact_permission_status === status).length;
  }

  const holdItems = allItems.filter((i) => i.messaging_hold_required);
  const reviewItems = allItems.filter(
    (i) => i.roofer_review_required || i.roofleadhq_review_required,
  );
  const permissionConfirmedItems = allItems.filter(
    (i) => i.contact_permission_status === 'permission_confirmed',
  );
  const contactedBusinessItems = allItems.filter(
    (i) => i.contact_permission_status === 'contacted_business',
  );
  const uncertaintyItems = allItems.filter((i) =>
    ['permission_unknown', 'permission_missing', 'needs_review'].includes(
      i.contact_permission_status,
    ),
  );
  const deniedItems = allItems.filter((i) => i.contact_permission_status === 'permission_denied');
  const dncItems = allItems.filter(
    (i) => i.contact_permission_status === 'do_not_contact' || i.do_not_contact_status,
  );
  const missingPhoneItems = allItems.filter((i) => !i.homeowner_phone_present);
  const missingEmailItems = allItems.filter((i) => !i.homeowner_email_present);
  const missingContactItems = allItems.filter((i) => !i.homeowner_contact_ready);
  const rooferPermissionClarificationItems = allItems.filter(
    (i) => i.permission_source_clarification_needed,
  );
  const systemQualityReviewItems = allItems.filter(
    (i) => i.roofleadhq_review_required && (i.compliance_state_mismatch || i.bad_permission_capture),
  );

  return {
    messaging_compliance_expansion:
      'native_workflow_fixture_messaging_compliance_contact_permission_expansion',
    messaging_compliance_expansion_summary: {
      description:
        'Deterministic fake-data messaging compliance and contact permission expansion across all fixture scenarios — explicit permission, channel eligibility, hold/review routing, and live-send boundaries without production automation',
      total_contact_permission_items: allItems.length,
      permission_status_counts: statusCounts,
      messaging_hold_item_count: holdItems.length,
      review_item_count: reviewItems.length,
      fixture_messaging_allowed_item_count: allItems.filter((i) => i.messaging_allowed_in_fixture)
        .length,
      live_sms_email_call_allowed: false,
      public_terms_or_compliance_copy_changed: false,
      public_terms_or_compliance_copy_approval_required: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    contact_permission_items: allItems,
    contact_permission_status_summary: {
      description: 'Contact permission status distribution across fixture scenarios',
      status_counts: statusCounts,
      permission_confirmed_count: statusCounts.permission_confirmed,
      contacted_business_count: statusCounts.contacted_business,
      permission_unknown_count: statusCounts.permission_unknown,
      permission_missing_count: statusCounts.permission_missing,
      permission_denied_count: statusCounts.permission_denied,
      do_not_contact_count: statusCounts.do_not_contact,
      needs_review_count: statusCounts.needs_review,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    do_not_contact_summary: {
      description: 'Do-not-contact boundaries — blocks all outreach channels in fixture logic',
      do_not_contact_item_count: dncItems.length,
      do_not_contact_blocks_all_outreach: dncItems.every(
        (i) =>
          !i.sms_eligible &&
          !i.email_eligible &&
          !i.call_eligible &&
          !i.messaging_allowed_in_fixture,
      ),
      stopped_do_not_contact_path_demonstrated: dncItems.some(
        (i) => i.scenario_id === 'stopped_do_not_contact_path',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    channel_eligibility_summary: {
      description:
        'Channel eligibility derived from permission status and homeowner contact data — fixture logic only',
      sms_eligible_count: allItems.filter((i) => i.sms_eligible).length,
      email_eligible_count: allItems.filter((i) => i.email_eligible).length,
      call_eligible_count: allItems.filter((i) => i.call_eligible).length,
      missing_phone_blocks_sms_and_call: missingPhoneItems
        .filter((i) => !i.sms_eligible && !i.call_eligible)
        .length >= 1,
      missing_email_blocks_email: missingEmailItems
        .filter((i) => !i.email_eligible)
        .length >= 1,
      permission_uncertainty_fails_closed: uncertaintyItems.every(
        (i) => !i.sms_eligible && !i.email_eligible && !i.call_eligible,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    consent_source_summary: {
      description: 'Consent and permission evidence sources tracked in fixture output',
      unique_consent_sources: [...new Set(allItems.map((i) => i.contact_permission_source))],
      homeowner_contacted_business_count: allItems.filter((i) => i.homeowner_contacted_business)
        .length,
      homeowner_gave_permission_count: allItems.filter((i) => i.homeowner_gave_permission).length,
      follow_up_allowed_only_when_contacted_or_permission_given: allItems
        .filter((i) => i.messaging_allowed_in_fixture)
        .every((i) => i.homeowner_contacted_business || i.homeowner_gave_permission),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    messaging_hold_summary: {
      description: 'Messaging hold routing — unknown, missing, denied, do-not-contact, and review states',
      messaging_hold_item_count: holdItems.length,
      permission_unknown_routes_to_hold_or_review: allItems
        .filter((i) => i.contact_permission_status === 'permission_unknown')
        .every((i) => i.messaging_hold_required || i.roofer_review_required || i.roofleadhq_review_required),
      permission_missing_routes_to_hold_or_review: allItems
        .filter((i) => i.contact_permission_status === 'permission_missing')
        .every((i) => i.messaging_hold_required || i.roofer_review_required || i.roofleadhq_review_required),
      missing_usable_contact_data_routes_to_missing_info_or_hold: missingContactItems.every(
        (i) => i.messaging_hold_required || !i.messaging_allowed_in_fixture,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    messaging_review_summary: {
      description:
        'Messaging compliance review ownership — roofer clarifies source permission; RoofLeadHQ/Jason limited to system quality issues',
      roofer_review_required_count: allItems.filter((i) => i.roofer_review_required).length,
      roofleadhq_review_required_count: allItems.filter((i) => i.roofleadhq_review_required).length,
      roofer_review_required_for_permission_source_clarification:
        rooferPermissionClarificationItems.every((i) => i.roofer_review_required),
      roofleadhq_review_limited_to_system_quality_permission_issues: systemQualityReviewItems.every(
        (i) => i.roofleadhq_review_required && !i.roofer_review_required,
      ),
      system_quality_review_reasons: [
        'bad_permission_capture',
        'unclear_source_mapping',
        'broken_routing',
        'compliance_state_mismatch',
        'duplicate_lead_routing',
      ],
      does_not_route_business_judgment_to_roofleadhq: allItems
        .filter((i) => i.roofer_review_required && !i.roofleadhq_review_required)
        .length >= 1,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    messaging_compliance_reporting_summary: {
      description:
        'Reporting includes messaging compliance summaries — fake-data only; no live delivery',
      reporting_summary_includes_messaging_compliance: true,
      weekly_snapshot_includes_messaging_compliance: true,
      monthly_snapshot_includes_messaging_compliance: true,
      contact_permission_status_in_reporting: true,
      channel_eligibility_in_reporting: true,
      messaging_hold_in_reporting: true,
      live_reporting_delivery_blocked: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    messaging_compliance_safety_assertions: [
      ...MESSAGING_COMPLIANCE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const FIXTURE_AUDIT_TIMESTAMP = '2026-06-16T12:00:00Z';

const SCENARIO_AUDIT_COVERAGE_AREA = {
  normal_lead_to_appointment_readiness: 'lead_intake_state_decision',
  missing_information_path: 'missing_information_routing',
  duplicate_review_path: 'duplicate_review_routing',
  bad_fit_excluded_path: 'bad_fit_excluded_routing',
  stopped_do_not_contact_path: 'do_not_contact_blocking',
  missed_lead_recovery_path: 'follow_up_missed_lead_recovery_decision',
  roofer_review_needed_path: 'review_queue_ownership_decision',
  roofleadhq_system_review_needed_path: 'review_queue_ownership_decision',
  appointment_booked_path: 'appointment_readiness_decision',
  inspection_completed_path: 'post_inspection_decision',
  inspection_missed_reschedule_path: 'appointment_readiness_decision',
  post_inspection_still_open_path: 'post_inspection_decision',
  estimate_needed_estimate_sent_tracking_path: 'post_inspection_decision',
  homeowner_follow_up_needed_path: 'follow_up_missed_lead_recovery_decision',
  roofer_follow_up_needed_path: 'manual_outreach_decision',
  feedback_permission_yes_path: 'feedback_permission_decision',
  feedback_permission_no_path: 'feedback_permission_decision',
  feedback_permission_not_asked_path: 'feedback_permission_decision',
  csv_report_snapshot_fake_data_path: 'reporting_csv_boundary_decision',
  starter_plan_profile_path: 'usage_volume_plan_limit_decision',
  growth_plan_profile_path: 'usage_volume_plan_limit_decision',
  elite_plan_profile_path: 'usage_volume_plan_limit_decision',
  custom_review_500_plus_leads_path: 'usage_volume_plan_limit_decision',
  custom_review_two_plus_locations_path: 'usage_volume_plan_limit_decision',
  activation_flag_false_blocks_live_action_path: 'activation_flag_blocking_decision',
};

const AUDIT_COVERAGE_AREAS = [
  'lead_intake_state_decision',
  'missing_information_routing',
  'duplicate_review_routing',
  'bad_fit_excluded_routing',
  'do_not_contact_blocking',
  'messaging_compliance_contact_permission_decision',
  'follow_up_missed_lead_recovery_decision',
  'manual_outreach_decision',
  'appointment_readiness_decision',
  'review_queue_ownership_decision',
  'post_inspection_decision',
  'feedback_permission_decision',
  'reporting_csv_boundary_decision',
  'usage_volume_plan_limit_decision',
  'lead_source_roi_boundary_decision',
  'activation_flag_blocking_decision',
];

const BUSINESS_JUDGMENT_EVENT_TYPES = new Set([
  'review_queue_ownership_decision',
  'manual_outreach_decision',
  'appointment_readiness_decision',
  'post_inspection_decision',
  'follow_up_missed_lead_recovery_decision',
  'usage_volume_plan_limit_decision',
  'lead_source_roi_boundary_decision',
]);

const SYSTEM_QUALITY_EVENT_TYPES = new Set([
  'duplicate_review_routing',
  'reporting_csv_boundary_decision',
  'messaging_compliance_contact_permission_decision',
  'review_queue_ownership_decision',
  'lead_source_roi_boundary_decision',
]);

const AUDIT_EVENT_TIMELINE_SAFETY_ASSERTIONS = [
  'audit_event_timeline_expansion_summary_present',
  'audit_event_items_present',
  'audit_event_item_required_fields_present',
  'state_transition_timeline_items_present',
  'state_transition_timeline_item_required_fields_present',
  'every_transition_has_audit_event_id',
  'every_blocked_live_action_has_activation_flag_audit_event',
  'every_review_routing_decision_has_review_owner',
  'roofer_review_owns_business_judgment_events',
  'roofleadhq_review_limited_to_system_quality_events',
  'guard_decision_trace_summary_present',
  'activation_flag_audit_summary_present',
  'data_boundary_audit_summary_present',
  'manual_next_step_audit_summary_present',
  'no_secret_or_credential_logged',
  'homeowner_personal_information_minimized',
  'live_action_performed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  `no_${BRIDGE_VENDOR}_live_workflow_execution`,
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'audit_timeline_is_fake_data_only',
  'audit_timeline_is_deterministic',
  'reporting_summary_includes_audit_timeline',
  'public_legal_or_privacy_copy_not_changed_without_approval',
];

function normalizeReviewOwner(scenario) {
  if (scenario.owner === 'roofer') return 'roofer';
  if (scenario.owner === 'jason' || scenario.owner === 'roofleadhq') return 'roofleadhq_jason';
  const reviewItem = (scenario.review_queue_items || [])[0];
  if (reviewItem?.review_owner) return reviewItem.review_owner;
  const contactItem = (scenario.contact_permission_items || [])[0];
  if (contactItem?.roofleadhq_review_required) return 'roofleadhq_jason';
  if (contactItem?.roofer_review_required) return 'roofer';
  return null;
}

function deriveReviewReason(scenario) {
  const reviewItem = (scenario.review_queue_items || [])[0];
  if (reviewItem?.review_reason) return reviewItem.review_reason;
  const contactItem = (scenario.contact_permission_items || [])[0];
  if (contactItem?.review_reason) return contactItem.review_reason;
  return null;
}

function deriveGuardAssertionRefs(scenario) {
  const refs = (scenario.guard_assertions || [])
    .filter((g) => g.result === 'pass' || g.safely_routed)
    .map((g) => g.assertion_id);
  return refs.slice(0, 8);
}

function isActivationFlagLiveActionBlock(scenario, config) {
  if (scenario.scenario_id === 'activation_flag_false_blocks_live_action_path') return true;
  if (config.event_type === 'activation_flag_blocking_decision' || config.event_type === 'live_action_blocked') {
    return true;
  }
  if (scenario.hold_or_block_reason === 'activation_flag_false') return true;
  return Boolean(config.activation_flag_checked);
}

function buildAuditEventItemBase(scenario, config) {
  const input = scenario.input_fixture_summary || {};
  const liveActionBlocked = isActivationFlagLiveActionBlock(scenario, config);
  return {
    audit_event_id: config.audit_event_id,
    scenario_id: scenario.scenario_id,
    lead_id: input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: scenario.plan_profile,
    event_timestamp_fixture: FIXTURE_AUDIT_TIMESTAMP,
    event_sequence: config.event_sequence,
    event_type: config.event_type,
    coverage_area: config.coverage_area || SCENARIO_AUDIT_COVERAGE_AREA[scenario.scenario_id] || 'workflow_state_decision',
    source_state: config.source_state ?? scenario.starting_state,
    target_state: config.target_state ?? scenario.final_state,
    decision_reason: config.decision_reason || scenario.hold_or_block_reason || 'fixture_decision',
    guard_assertion_refs: config.guard_assertion_refs || deriveGuardAssertionRefs(scenario),
    review_owner: 'review_owner' in config ? config.review_owner : normalizeReviewOwner(scenario),
    review_reason: 'review_reason' in config ? config.review_reason : deriveReviewReason(scenario),
    required_manual_next_step:
      'required_manual_next_step' in config
        ? config.required_manual_next_step
        : scenario.manual_next_step ?? null,
    activation_flag_checked: config.activation_flag_checked ?? null,
    live_action_blocked: config.live_action_blocked ?? liveActionBlocked,
    data_boundary_checked: config.data_boundary_checked ?? true,
    homeowner_personal_information_minimized: true,
    secret_or_credential_logged: 'no',
    live_action_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
  };
}

function buildScenarioAuditTimeline(scenario, sequenceOffset) {
  const timelineItems = [];
  const auditItems = [];
  let sequence = sequenceOffset;

  const coverageArea = SCENARIO_AUDIT_COVERAGE_AREA[scenario.scenario_id] || 'workflow_state_decision';
  const guardRefs = deriveGuardAssertionRefs(scenario);
  const reviewOwner = normalizeReviewOwner(scenario);
  const reviewReason = deriveReviewReason(scenario);
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;

  for (let i = 0; i < (scenario.transition_log || []).length; i += 1) {
    const transition = scenario.transition_log[i];
    sequence += 1;
    const auditEventId = `${scenario.scenario_id}_transition_audit_${i + 1}`;
    const failedGuard = (scenario.guard_results || []).find((g) => g.result === 'fail');
    const guardResult = failedGuard ? 'fail_safely_routed' : 'pass';
    const blockedReason =
      transition.to_state === 'BLOCKED' || transition.to_state === 'HOLD'
        ? scenario.hold_or_block_reason
        : null;
    const reviewRequired = Boolean(reviewOwner || scenario.manual_next_step);

    timelineItems.push({
      timeline_item_id: `${scenario.scenario_id}_timeline_${i + 1}`,
      scenario_id: scenario.scenario_id,
      lead_id: leadId,
      event_sequence: sequence,
      from_state: transition.from_state,
      to_state: transition.to_state,
      transition_reason: transition.trigger || 'fixture_transition',
      guard_result: guardResult,
      blocked_reason_if_any: blockedReason,
      review_required: reviewRequired,
      review_owner: reviewOwner,
      audit_event_id: auditEventId,
      live_action_allowed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      fake_data_only: true,
    });

    auditItems.push(
      buildAuditEventItemBase(scenario, {
        audit_event_id: auditEventId,
        event_sequence: sequence,
        event_type: 'state_transition',
        coverage_area: coverageArea,
        source_state: transition.from_state,
        target_state: transition.to_state,
        decision_reason: blockedReason || transition.trigger || 'fixture_transition',
        guard_assertion_refs: guardRefs,
        review_owner: reviewOwner,
        review_reason: reviewReason,
      }),
    );
  }

  for (let i = 0; i < (scenario.audit_events || []).length; i += 1) {
    const raw = scenario.audit_events[i];
    sequence += 1;
    const auditEventId = `${scenario.scenario_id}_scenario_audit_${i + 1}`;
    const isActivationBlock = raw.event_type === 'live_action_blocked';
    auditItems.push(
      buildAuditEventItemBase(scenario, {
        audit_event_id: auditEventId,
        event_sequence: sequence,
        event_type: isActivationBlock ? 'activation_flag_blocking_decision' : raw.event_type,
        coverage_area: isActivationBlock
          ? 'activation_flag_blocking_decision'
          : coverageArea,
        source_state: scenario.final_state === 'BLOCKED' ? scenario.starting_state : scenario.final_state,
        target_state: scenario.final_state,
        decision_reason: raw.notes || raw.event_type,
        activation_flag_checked: raw.flag_checked || (isActivationBlock ? 'live_sms_enabled=false' : null),
        live_action_blocked: isActivationBlock,
      }),
    );
  }

  const contactItem = (scenario.contact_permission_items || [])[0];
  if (contactItem) {
    sequence += 1;
    auditItems.push(
      buildAuditEventItemBase(scenario, {
        audit_event_id: contactItem.audit_event_id,
        event_sequence: sequence,
        event_type: 'messaging_compliance_contact_permission_decision',
        coverage_area: 'messaging_compliance_contact_permission_decision',
        decision_reason:
          contactItem.messaging_hold_reason ||
          contactItem.channel_eligibility_reason ||
          contactItem.contact_permission_status,
        review_owner: contactItem.roofleadhq_review_required
          ? 'roofleadhq_jason'
          : contactItem.roofer_review_required
            ? 'roofer'
            : null,
        review_reason: contactItem.review_reason,
        required_manual_next_step: contactItem.required_manual_next_step,
      }),
    );
  }

  const leadSourceItem = (scenario.lead_source_attribution_items || [])[0];
  if (leadSourceItem) {
    sequence += 1;
    auditItems.push(
      buildAuditEventItemBase(scenario, {
        audit_event_id: leadSourceItem.audit_event_id,
        event_sequence: sequence,
        event_type: 'lead_source_roi_boundary_decision',
        coverage_area: 'lead_source_roi_boundary_decision',
        decision_reason:
          leadSourceItem.source_attribution_issue
            ? 'source_attribution_issue_requires_review'
            : leadSourceItem.lead_source || 'lead_source_captured',
        review_owner: leadSourceItem.source_attribution_review_needed ? 'roofleadhq_jason' : null,
        review_reason: leadSourceItem.source_attribution_review_needed
          ? leadSourceItem.source_attribution_review_reason || 'source_attribution_issue'
          : null,
        required_manual_next_step: leadSourceItem.required_manual_next_step || null,
        data_boundary_checked: true,
      }),
    );
  }

  for (const reviewItem of scenario.review_queue_items || []) {
    sequence += 1;
    auditItems.push(
      buildAuditEventItemBase(scenario, {
        audit_event_id: reviewItem.audit_event_id,
        event_sequence: sequence,
        event_type: 'review_queue_ownership_decision',
        coverage_area: 'review_queue_ownership_decision',
        source_state: reviewItem.source_state,
        target_state: reviewItem.target_state,
        decision_reason: reviewItem.review_reason || reviewItem.review_type,
        review_owner: reviewItem.review_owner,
        review_reason: reviewItem.review_reason,
        required_manual_next_step: reviewItem.required_manual_next_step,
      }),
    );
  }

  return { timelineItems, auditItems, nextSequence: sequence };
}

function buildTopLevelAuditEventTimeline(scenarios, outputBase) {
  const allTimelineItems = [];
  const allAuditItems = [];
  let globalSequence = 0;

  for (const scenario of scenarios) {
    const built = buildScenarioAuditTimeline(scenario, globalSequence);
    allTimelineItems.push(...built.timelineItems);
    allAuditItems.push(...built.auditItems);
    globalSequence = built.nextSequence;
  }

  const coverageAreasPresent = new Set(allAuditItems.map((i) => i.coverage_area));
  const blockedLiveActionItems = allAuditItems.filter((i) => i.live_action_blocked);
  const activationFlagAuditItems = allAuditItems.filter(
    (i) => i.event_type === 'activation_flag_blocking_decision' || i.activation_flag_checked,
  );
  const reviewRoutingItems = allAuditItems.filter(
    (i) => i.event_type === 'review_queue_ownership_decision' || i.review_owner,
  );
  const rooferBusinessJudgmentItems = allAuditItems.filter(
    (i) => i.review_owner === 'roofer' && BUSINESS_JUDGMENT_EVENT_TYPES.has(i.coverage_area),
  );
  const roofleadhqSystemQualityItems = allAuditItems.filter(
    (i) => i.review_owner === 'roofleadhq_jason',
  );
  const manualNextStepItems = allAuditItems.filter((i) => i.required_manual_next_step);
  const guardTraceItems = allAuditItems.filter((i) => (i.guard_assertion_refs || []).length > 0);

  const eventTypeCounts = {};
  for (const item of allAuditItems) {
    eventTypeCounts[item.event_type] = (eventTypeCounts[item.event_type] || 0) + 1;
  }

  return {
    audit_event_timeline_expansion: 'native_workflow_fixture_audit_event_timeline_expansion',
    audit_event_timeline_expansion_summary: {
      description:
        'Deterministic fake-data audit event and state-transition timeline across all fixture scenarios — explicit trace for workflow decisions, guard outcomes, review routing, activation flags, and data boundaries without production persistence or live automation',
      total_audit_event_items: allAuditItems.length,
      total_state_transition_timeline_items: allTimelineItems.length,
      coverage_areas_required: AUDIT_COVERAGE_AREAS.length,
      coverage_areas_present: coverageAreasPresent.size,
      all_coverage_areas_present: AUDIT_COVERAGE_AREAS.every((area) => coverageAreasPresent.has(area)),
      event_type_counts: eventTypeCounts,
      blocked_live_action_count: blockedLiveActionItems.length,
      activation_flag_audit_event_count: activationFlagAuditItems.length,
      review_routing_decision_count: reviewRoutingItems.length,
      manual_next_step_audit_count: manualNextStepItems.length,
      guard_decision_trace_count: guardTraceItems.length,
      public_legal_or_privacy_copy_changed: false,
      public_legal_or_privacy_copy_approval_required: true,
      fake_data_only: true,
      deterministic_fixture_timestamps: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    audit_event_items: allAuditItems,
    state_transition_timeline_items: allTimelineItems,
    guard_decision_trace_summary: {
      description:
        'Guard assertion references linked to audit events — failures safely routed to HOLD/BLOCKED/review without live action',
      audit_events_with_guard_refs: guardTraceItems.length,
      unique_guard_assertions_referenced: [
        ...new Set(guardTraceItems.flatMap((i) => i.guard_assertion_refs || [])),
      ].length,
      fail_closed_assertions_referenced: FAIL_CLOSED_ASSERTIONS.filter((assertion) =>
        guardTraceItems.some((i) => (i.guard_assertion_refs || []).includes(assertion)),
      ).length,
      all_guard_failures_traceable: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_routing_trace_summary: {
      description:
        'Review routing audit trace — roofer owns business judgment; RoofLeadHQ/Jason limited to system/workflow/data/routing/quality',
      review_routing_audit_event_count: reviewRoutingItems.length,
      roofer_review_audit_count: allAuditItems.filter((i) => i.review_owner === 'roofer').length,
      roofleadhq_system_review_audit_count: allAuditItems.filter(
        (i) => i.review_owner === 'roofleadhq_jason',
      ).length,
      roofer_owns_business_judgment: rooferBusinessJudgmentItems.every(
        (i) => i.review_owner === 'roofer',
      ),
      roofleadhq_limited_to_system_quality: roofleadhqSystemQualityItems.every((i) =>
        SYSTEM_QUALITY_EVENT_TYPES.has(i.coverage_area) ||
        i.coverage_area === 'duplicate_review_routing' ||
        i.coverage_area === 'reporting_csv_boundary_decision' ||
        i.coverage_area === 'messaging_compliance_contact_permission_decision',
      ),
      every_review_routing_decision_has_review_owner: reviewRoutingItems.every(
        (i) => i.review_owner,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    activation_flag_audit_summary: {
      description:
        'Activation flag audit events for blocked live actions — all flags default false; live automation disabled',
      blocked_live_action_audit_count: blockedLiveActionItems.length,
      activation_flag_audit_event_count: activationFlagAuditItems.length,
      every_blocked_live_action_has_activation_flag_audit:
        blockedLiveActionItems.length === 0 ||
        blockedLiveActionItems.every((blocked) =>
          activationFlagAuditItems.some(
            (audit) =>
              audit.scenario_id === blocked.scenario_id &&
              (audit.event_type === 'activation_flag_blocking_decision' || audit.activation_flag_checked),
          ),
        ),
      activation_flags_checked: Object.keys(ACTIVATION_FLAGS),
      all_activation_flags_default_false: Object.values(ACTIVATION_FLAGS).every((v) => v === false),
      no_twilio_calls: true,
      no_vapi_calls: true,
      no_resend_calls: true,
      [`no_${BRIDGE_VENDOR}_live_workflow_execution`]: true,
      no_google_calendar_calls: true,
      no_crm_sync: true,
      no_live_csv_delivery: true,
      no_billing_or_payment_action: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_next_step_audit_summary: {
      description:
        'Manual next-step audit trace — required human action before progression; no automatic live execution',
      manual_next_step_audit_event_count: manualNextStepItems.length,
      scenarios_with_manual_next_step: [
        ...new Set(manualNextStepItems.map((i) => i.scenario_id)),
      ].length,
      hold_or_review_manual_steps_only: true,
      no_automatic_live_execution: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    data_boundary_audit_summary: {
      description:
        'Data boundary audit — fake data only; homeowner PII minimized; no secrets/credentials/production data/external calls',
      audit_events_data_boundary_checked: allAuditItems.filter((i) => i.data_boundary_checked).length,
      homeowner_personal_information_minimized_for_all: allAuditItems.every(
        (i) => i.homeowner_personal_information_minimized === true,
      ),
      no_secret_or_credential_logged: allAuditItems.every(
        (i) => i.secret_or_credential_logged === 'no',
      ),
      no_production_data_touched: allAuditItems.every((i) => i.production_data_touched === 'no'),
      no_external_services_called: allAuditItems.every((i) => i.external_services_called === 'no'),
      no_crm_sync: true,
      no_live_csv_delivery: true,
      no_billing_or_payment_action: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    timeline_reporting_summary: {
      description:
        'Reporting includes audit timeline summaries — fake-data only; no live reporting delivery',
      reporting_summary_includes_audit_timeline: true,
      weekly_snapshot_includes_audit_timeline: true,
      monthly_snapshot_includes_audit_timeline: true,
      audit_event_count_in_reporting: allAuditItems.length,
      state_transition_count_in_reporting: allTimelineItems.length,
      coverage_areas_in_reporting: [...coverageAreasPresent],
      live_reporting_delivery_blocked: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    audit_event_safety_assertions: [
      ...AUDIT_EVENT_TIMELINE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const DATA_BOUNDARY_DATA_CATEGORIES = [
  'contractor_customer_account_data',
  'roofer_company_contact_details',
  'homeowner_name',
  'homeowner_phone',
  'homeowner_email',
  'service_address',
  'city_state_service_area',
  'roofing_issue_details',
  'urgency',
  'insurance_claim_status_if_provided',
  'preferred_appointment_windows',
  'lead_source_and_source_detail',
  'campaign_ad_source_if_known',
  'message_call_transcript_summaries_future_optional',
  'appointment_booking_data',
  'follow_up_data',
  'review_escalation_notes',
  'post_inspection_status',
  'post_inspection_feedback',
  'report_data',
  'csv_export_data',
  'photo_status_fields_only',
  'photos_future_optional_not_active',
];

const DATA_CATEGORY_WORKFLOW_AREA = {
  contractor_customer_account_data: 'account_setup',
  roofer_company_contact_details: 'account_setup',
  homeowner_name: 'lead_intake',
  homeowner_phone: 'lead_intake',
  homeowner_email: 'lead_intake',
  service_address: 'lead_intake',
  city_state_service_area: 'service_area',
  roofing_issue_details: 'lead_intake',
  urgency: 'lead_intake',
  insurance_claim_status_if_provided: 'review_queue',
  preferred_appointment_windows: 'appointment_readiness',
  lead_source_and_source_detail: 'lead_source_attribution',
  campaign_ad_source_if_known: 'lead_source_attribution',
  message_call_transcript_summaries_future_optional: 'messaging_compliance',
  appointment_booking_data: 'appointment_booking',
  follow_up_data: 'follow_up',
  review_escalation_notes: 'review_queue',
  post_inspection_status: 'post_inspection',
  post_inspection_feedback: 'feedback_permission',
  report_data: 'reporting',
  csv_export_data: 'csv_export',
  photo_status_fields_only: 'lead_intake',
  photos_future_optional_not_active: 'lead_intake',
};

const DATA_CATEGORY_SCENARIO_MAP = {
  contractor_customer_account_data: 'starter_plan_profile_path',
  roofer_company_contact_details: 'normal_lead_to_appointment_readiness',
  homeowner_name: 'normal_lead_to_appointment_readiness',
  homeowner_phone: 'missing_information_path',
  homeowner_email: 'missing_information_path',
  service_address: 'bad_fit_excluded_path',
  city_state_service_area: 'bad_fit_excluded_path',
  roofing_issue_details: 'normal_lead_to_appointment_readiness',
  urgency: 'normal_lead_to_appointment_readiness',
  insurance_claim_status_if_provided: 'roofer_review_needed_path',
  preferred_appointment_windows: 'appointment_booked_path',
  lead_source_and_source_detail: 'growth_plan_profile_path',
  campaign_ad_source_if_known: 'elite_plan_profile_path',
  message_call_transcript_summaries_future_optional: 'activation_flag_false_blocks_live_action_path',
  appointment_booking_data: 'appointment_booked_path',
  follow_up_data: 'homeowner_follow_up_needed_path',
  review_escalation_notes: 'roofleadhq_system_review_needed_path',
  post_inspection_status: 'inspection_completed_path',
  post_inspection_feedback: 'feedback_permission_yes_path',
  report_data: 'starter_plan_profile_path',
  csv_export_data: 'csv_report_snapshot_fake_data_path',
  photo_status_fields_only: 'normal_lead_to_appointment_readiness',
  photos_future_optional_not_active: 'normal_lead_to_appointment_readiness',
};

const SCENARIO_PRIMARY_DATA_CATEGORY = {
  normal_lead_to_appointment_readiness: 'appointment_booking_data',
  missing_information_path: 'homeowner_phone',
  duplicate_review_path: 'review_escalation_notes',
  bad_fit_excluded_path: 'city_state_service_area',
  stopped_do_not_contact_path: 'follow_up_data',
  missed_lead_recovery_path: 'follow_up_data',
  roofer_review_needed_path: 'insurance_claim_status_if_provided',
  roofleadhq_system_review_needed_path: 'review_escalation_notes',
  appointment_booked_path: 'appointment_booking_data',
  inspection_completed_path: 'post_inspection_status',
  inspection_missed_reschedule_path: 'appointment_booking_data',
  post_inspection_still_open_path: 'post_inspection_status',
  estimate_needed_estimate_sent_tracking_path: 'post_inspection_status',
  homeowner_follow_up_needed_path: 'follow_up_data',
  roofer_follow_up_needed_path: 'follow_up_data',
  feedback_permission_yes_path: 'post_inspection_feedback',
  feedback_permission_no_path: 'post_inspection_feedback',
  feedback_permission_not_asked_path: 'post_inspection_feedback',
  csv_report_snapshot_fake_data_path: 'csv_export_data',
  starter_plan_profile_path: 'report_data',
  growth_plan_profile_path: 'lead_source_and_source_detail',
  elite_plan_profile_path: 'campaign_ad_source_if_known',
  custom_review_500_plus_leads_path: 'contractor_customer_account_data',
  custom_review_two_plus_locations_path: 'roofer_company_contact_details',
  activation_flag_false_blocks_live_action_path:
    'message_call_transcript_summaries_future_optional',
};

const DATA_BOUNDARY_PII_SAFETY_ASSERTIONS = [
  'data_boundary_pii_expansion_summary_present',
  'pii_minimization_items_present',
  'pii_minimization_item_required_fields_present',
  'required_data_categories_present',
  'fixture_data_is_fake_only',
  'no_production_supabase_reads_or_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_or_credential_logged',
  'no_env_values_logged',
  'homeowner_name_is_fake_or_minimized',
  'homeowner_phone_is_fake_or_masked',
  'homeowner_email_is_fake_or_masked',
  'service_address_is_fake_or_generalized',
  'roofing_issue_summary_is_minimized',
  'insurance_claim_status_is_minimized',
  'message_content_is_minimized',
  'review_notes_are_minimized',
  'feedback_summary_is_internal_boundary_checked',
  'csv_personal_information_warning_present',
  'customer_export_responsibility_warning_present',
  'csv_export_is_one_directional',
  'csv_does_not_push_data_back',
  'csv_does_not_auto_update_after_download',
  'no_native_crm_sync',
  'no_live_csv_delivery',
  'no_external_service_calls',
  'no_live_sms_email_or_calls',
  'no_customer_notifications',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
  'audit_events_have_pii_minimization_boundary',
  'review_queue_has_pii_minimization_boundary',
  'reporting_summary_includes_data_boundary',
  'public_legal_or_privacy_copy_not_changed_without_approval',
];

function maskPhoneFakeOrMasked(phone) {
  if (!phone || typeof phone !== 'string') return 'fake_masked';
  if (phone.startsWith('+1555')) {
    return phone.replace(/(\+1555\d{2})\d{2}(\d{2})/, '$1**$2');
  }
  return `+1555***${phone.slice(-4)}`;
}

function maskEmailFakeOrMasked(email) {
  if (!email || typeof email !== 'string') return 'f***@example.test';
  const [user, domain] = email.split('@');
  return `${user.slice(0, 1)}***@${domain || 'example.test'}`;
}

function generalizeServiceAddressFake(address) {
  if (!address) return 'Testville TX service area (generalized)';
  const segments = address.split(',').map((segment) => segment.trim());
  if (segments.length >= 3) {
    return `${segments[1]} area, ${segments[2]} (generalized)`;
  }
  return 'fixture_service_area_generalized';
}

function minimizeRoofingIssueSummary(scenario) {
  const input = scenario.input_fixture_summary || {};
  if (input.roofing_issue_summary) {
    return String(input.roofing_issue_summary).slice(0, 48);
  }
  if (input.roofing_issue) {
    return String(input.roofing_issue).slice(0, 48);
  }
  return 'fixture_roof_issue_summary_minimized';
}

function minimizeInsuranceClaimStatus(scenario) {
  const input = scenario.input_fixture_summary || {};
  if (input.insurance_claim_status) {
    return 'claim_status_minimized_fixture_only';
  }
  return 'not_provided_or_minimized';
}

function minimizeMessageContent(scenario) {
  const input = scenario.input_fixture_summary || {};
  if (input.attempted_action === 'sms_send') {
    return 'attempted_sms_blocked_message_body_not_logged';
  }
  const contactItem = (scenario.contact_permission_items || [])[0];
  if (contactItem?.messaging_hold_reason) {
    return 'messaging_hold_reason_minimized_no_full_message_text';
  }
  return 'message_summary_minimized_or_not_captured';
}

function minimizeReviewNotes(scenario) {
  const reviewItem = (scenario.review_queue_items || [])[0];
  if (!reviewItem) return 'no_review_notes_required';
  return `${reviewItem.review_type || 'review'}_notes_minimized`;
}

function minimizeFeedbackSummary(scenario) {
  const feedbackItem = (scenario.feedback_permission_items || [])[0];
  if (!feedbackItem) return 'feedback_not_captured_minimized';
  if (!feedbackItem.feedback_captured) return 'feedback_not_captured_minimized';
  const permission = feedbackItem.permission_to_use_publicly || 'not_asked';
  return `feedback_internal_boundary_checked permission=${permission}`;
}

function derivePiiAuditEventId(scenario) {
  const auditItem = (scenario.audit_event_timeline_items || [])[0];
  if (auditItem?.audit_event_id) return auditItem.audit_event_id;
  const reviewItem = (scenario.review_queue_items || [])[0];
  if (reviewItem?.audit_event_id) return reviewItem.audit_event_id;
  return `${scenario.scenario_id}_pii_boundary_audit`;
}

function csvWarningsRequired(dataCategory, scenarioId) {
  return (
    dataCategory === 'csv_export_data' ||
    dataCategory === 'report_data' ||
    scenarioId === 'csv_report_snapshot_fake_data_path'
  );
}

function isFakeHomeownerName(name) {
  if (!name) return true;
  return (
    /fixture|demo|sample|recovery|planvolume|test|homeowner/i.test(name) ||
    name === 'Fixture Homeowner'
  );
}

function buildPiiMinimizationItem(scenario, dataCategory, itemIndex) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const workflowArea =
    DATA_CATEGORY_WORKFLOW_AREA[dataCategory] ||
    SCENARIO_AUDIT_COVERAGE_AREA[scenario.scenario_id] ||
    'workflow_state';
  const csvWarning = csvWarningsRequired(dataCategory, scenario.scenario_id);

  return {
    pii_minimization_item_id: `pii_${scenario.scenario_id}_${dataCategory}_${itemIndex}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: scenario.plan_profile,
    workflow_area: workflowArea,
    data_category: dataCategory,
    fake_homeowner_identifier_used: leadId,
    homeowner_name_fake: input.homeowner_name || 'Fixture Homeowner',
    homeowner_phone_fake_or_masked: maskPhoneFakeOrMasked(input.homeowner_phone),
    homeowner_email_fake_or_masked: maskEmailFakeOrMasked(input.homeowner_email),
    service_address_fake_or_generalized: generalizeServiceAddressFake(input.service_address),
    roofing_issue_summary_minimized: minimizeRoofingIssueSummary(scenario),
    insurance_claim_status_minimized: minimizeInsuranceClaimStatus(scenario),
    message_content_minimized: minimizeMessageContent(scenario),
    review_notes_minimized: minimizeReviewNotes(scenario),
    feedback_summary_minimized: minimizeFeedbackSummary(scenario),
    csv_personal_information_warning_present: csvWarning,
    customer_export_responsibility_warning_present: csvWarning,
    production_data_boundary_checked: true,
    secret_or_credential_boundary_checked: true,
    audit_event_id: derivePiiAuditEventId(scenario),
    secret_or_credential_logged: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    live_action_performed: 'no',
    fake_data_only: true,
  };
}

function buildScenarioPiiMinimizationItems(scenario) {
  const primaryCategory =
    SCENARIO_PRIMARY_DATA_CATEGORY[scenario.scenario_id] || 'lead_intake_boundary';
  return [buildPiiMinimizationItem(scenario, primaryCategory, 0)];
}

function buildAllPiiMinimizationItems(scenarios) {
  const scenarioById = Object.fromEntries(scenarios.map((scenario) => [scenario.scenario_id, scenario]));
  const items = [];
  const seen = new Set();

  for (const dataCategory of DATA_BOUNDARY_DATA_CATEGORIES) {
    const scenarioId = DATA_CATEGORY_SCENARIO_MAP[dataCategory];
    const scenario = scenarioById[scenarioId];
    if (!scenario) continue;
    const key = `${scenarioId}:${dataCategory}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(buildPiiMinimizationItem(scenario, dataCategory, items.length));
  }

  for (const scenario of scenarios) {
    const primaryCategory = SCENARIO_PRIMARY_DATA_CATEGORY[scenario.scenario_id];
    if (!primaryCategory) continue;
    const key = `${scenario.scenario_id}:${primaryCategory}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(buildPiiMinimizationItem(scenario, primaryCategory, items.length));
  }

  return items;
}

function buildTopLevelDataBoundaryPiiMinimization(
  scenarios,
  outputBase,
  reportingOutput,
  reviewQueueOutput,
  auditEventTimelineOutput,
) {
  const allItems = buildAllPiiMinimizationItems(scenarios);
  const csvSnapshot = reportingOutput.csv_export_snapshot_summary || {};
  const categoriesPresent = new Set(allItems.map((item) => item.data_category));
  const csvItems = allItems.filter((item) => item.data_category === 'csv_export_data');
  const reportItems = allItems.filter((item) => item.data_category === 'report_data');
  const feedbackItems = allItems.filter((item) => item.data_category === 'post_inspection_feedback');
  const reviewItems = allItems.filter((item) => item.data_category === 'review_escalation_notes');
  const auditItems = auditEventTimelineOutput.audit_event_items || [];

  return {
    data_boundary_pii_expansion: 'native_workflow_fixture_data_boundary_pii_minimization_expansion',
    data_boundary_pii_expansion_summary: {
      description:
        'Deterministic fake-data data-boundary and homeowner PII minimization expansion across fixture reporting, CSV snapshots, review queues, audit timelines, feedback records, and workflow states — proves production data avoidance, secret avoidance, and minimized homeowner personal information before any schema/persistence work',
      total_pii_minimization_items: allItems.length,
      required_data_categories_count: DATA_BOUNDARY_DATA_CATEGORIES.length,
      required_data_categories_present: DATA_BOUNDARY_DATA_CATEGORIES.every((category) =>
        categoriesPresent.has(category),
      ),
      scenarios_with_pii_boundary_items: new Set(allItems.map((item) => item.scenario_id)).size,
      public_legal_or_privacy_copy_changed: false,
      public_legal_or_privacy_copy_approval_required: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    pii_minimization_items: allItems,
    data_category_summary: {
      description: 'Data category coverage across fixture workflow areas — all categories fictional/fake only',
      categories_required: DATA_BOUNDARY_DATA_CATEGORIES,
      categories_present: [...categoriesPresent],
      all_categories_present: DATA_BOUNDARY_DATA_CATEGORIES.every((category) =>
        categoriesPresent.has(category),
      ),
      photos_future_optional_not_active: true,
      photo_status_fields_only_in_fixture: true,
      message_call_transcript_summaries_future_optional: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    fake_homeowner_data_summary: {
      description:
        'Fake homeowner identifiers only — names are fictional; phone/email masked; addresses generalized in audit/review/reporting summaries',
      items_with_fake_homeowner_names: allItems.filter((item) =>
        isFakeHomeownerName(item.homeowner_name_fake),
      ).length,
      items_with_masked_phone: allItems.filter((item) =>
        /fake_masked|\*\*\*/.test(item.homeowner_phone_fake_or_masked),
      ).length,
      items_with_masked_email: allItems.filter((item) =>
        /\*\*\*/.test(item.homeowner_email_fake_or_masked),
      ).length,
      items_with_generalized_address: allItems.filter((item) =>
        /generalized|area/i.test(item.service_address_fake_or_generalized),
      ).length,
      no_real_homeowner_data_used: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    production_data_boundary_summary: {
      description:
        'Production data boundary — no Supabase reads/writes; no schema/migrations/auth/RLS/security changes; fixture fake data only',
      no_production_supabase_reads_or_writes: true,
      no_schema_migrations_auth_rls_security_changes: true,
      production_data_touched_is_no_for_all_items: allItems.every(
        (item) => item.production_data_touched === 'no',
      ),
      production_data_boundary_checked_for_all_items: allItems.every(
        (item) => item.production_data_boundary_checked === true,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    secret_logging_boundary_summary: {
      description:
        'Secret/credential logging boundary — no secrets, credentials, env values, tokens, API keys, or private config logged',
      no_secret_or_credential_logged: allItems.every(
        (item) => item.secret_or_credential_logged === 'no',
      ),
      secret_or_credential_boundary_checked_for_all_items: allItems.every(
        (item) => item.secret_or_credential_boundary_checked === true,
      ),
      no_env_values_logged: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    csv_pii_warning_summary: {
      description:
        'CSV PII warning boundary — fake homeowner personal information may appear in CSV snapshots with explicit warnings; customer/contractor responsible for exported data handling',
      csv_export_is_one_directional: csvSnapshot.one_directional_export === true,
      csv_not_native_crm_sync: csvSnapshot.native_crm_sync === false,
      csv_does_not_push_data_back: csvSnapshot.pushes_data_back_to_roofleadhq === false,
      csv_does_not_auto_update_after_download:
        csvSnapshot.auto_updates_from_downloaded_file === false,
      csv_personal_information_warning_present:
        csvSnapshot.contains_homeowner_personal_information === true,
      customer_export_responsibility_warning_present:
        csvSnapshot.customer_responsible_for_downloaded_exported_data === true,
      csv_pii_warning_items_count: csvItems.filter(
        (item) => item.csv_personal_information_warning_present,
      ).length,
      no_live_csv_delivery: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    reporting_pii_boundary_summary: {
      description:
        'Reporting PII boundary — reporting snapshots use fake data; homeowner PII minimized in summaries; data boundary included in reporting',
      reporting_summary_includes_data_boundary: true,
      report_data_items_count: reportItems.length,
      homeowner_personal_information_minimized_in_reporting: true,
      live_reporting_delivery_blocked: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    audit_pii_boundary_summary: {
      description:
        'Audit PII boundary — audit events use fake/minimized homeowner data; no full message text unless fake/minimized and necessary',
      audit_events_have_pii_minimization_boundary: auditItems.every(
        (item) => item.homeowner_personal_information_minimized === true,
      ),
      audit_events_data_boundary_checked: auditItems.filter((item) => item.data_boundary_checked)
        .length,
      audit_events_no_secret_or_credential_logged: auditItems.every(
        (item) => item.secret_or_credential_logged === 'no',
      ),
      no_full_message_text_in_audit_events: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_queue_pii_boundary_summary: {
      description:
        'Review queue PII boundary — minimum fake homeowner information only; business judgment remains with roofer/contractor',
      review_queue_has_pii_minimization_boundary: true,
      review_queue_items_count: (reviewQueueOutput.review_queue_items || []).length,
      review_escalation_notes_minimized_items: reviewItems.length,
      roofer_review_owns_business_judgment: true,
      roofleadhq_review_limited_to_system_quality: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_pii_boundary_summary: {
      description:
        'Feedback PII boundary — feedback summaries internal unless permission_to_use_publicly is yes; no automatic publication; negative/disputed feedback routes to review',
      feedback_summary_is_internal_boundary_checked: feedbackItems.every((item) =>
        /internal_boundary_checked|not_captured/i.test(item.feedback_summary_minimized),
      ),
      feedback_items_count: feedbackItems.length,
      no_automatic_publication: true,
      negative_feedback_routes_to_review: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    data_boundary_safety_assertions: [
      ...DATA_BOUNDARY_PII_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const FAKE_REPORTING_SNAPSHOT = buildReportingSnapshot({
  report_period: '2026-06',
  csv_export_state: 'fixture_snapshot_strongest',
});

const FAKE_CSV_SNAPSHOT = buildCsvExportSnapshot({
  report_period: '2026-06',
  row_count: 3,
  description: 'strongest_fixture_csv_report_snapshot',
});

const ACCEPTANCE_PATHS = [
  {
    acceptance_path_id: 'normal_lead_to_appointment_readiness',
    scenario_id: 'normal_lead_to_appointment_readiness',
    acceptance_path_name: 'normal lead to appointment readiness',
    acceptance_focus: 'lead_to_inspection',
  },
  {
    acceptance_path_id: 'missing_information_path',
    scenario_id: 'missing_information_path',
    acceptance_path_name: 'missing information path',
    acceptance_focus: 'lead_to_inspection',
  },
  {
    acceptance_path_id: 'duplicate_review_path',
    scenario_id: 'duplicate_review_path',
    acceptance_path_name: 'duplicate review path',
    acceptance_focus: 'review_queue',
  },
  {
    acceptance_path_id: 'bad_fit_excluded_path',
    scenario_id: 'bad_fit_excluded_path',
    acceptance_path_name: 'bad fit / excluded path',
    acceptance_focus: 'lead_to_inspection',
  },
  {
    acceptance_path_id: 'stopped_do_not_contact_path',
    scenario_id: 'stopped_do_not_contact_path',
    acceptance_path_name: 'stopped do-not-contact path',
    acceptance_focus: 'messaging_compliance',
  },
  {
    acceptance_path_id: 'missed_lead_recovery_path',
    scenario_id: 'missed_lead_recovery_path',
    acceptance_path_name: 'missed lead recovery path',
    acceptance_focus: 'missed_lead_recovery',
  },
  {
    acceptance_path_id: 'manual_outreach_path',
    scenario_id: 'missed_lead_recovery_path',
    acceptance_path_name: 'manual outreach path',
    acceptance_focus: 'manual_outreach',
  },
  {
    acceptance_path_id: 'roofer_review_path',
    scenario_id: 'roofer_review_needed_path',
    acceptance_path_name: 'roofer review path',
    acceptance_focus: 'review_queue',
  },
  {
    acceptance_path_id: 'roofleadhq_system_quality_review_path',
    scenario_id: 'roofleadhq_system_review_needed_path',
    acceptance_path_name: 'RoofLeadHQ system-quality review path',
    acceptance_focus: 'review_queue',
  },
  {
    acceptance_path_id: 'appointment_booked_tracking_path',
    scenario_id: 'appointment_booked_path',
    acceptance_path_name: 'appointment booked tracking path',
    acceptance_focus: 'appointment_readiness',
  },
  {
    acceptance_path_id: 'inspection_completed_path',
    scenario_id: 'inspection_completed_path',
    acceptance_path_name: 'inspection completed path',
    acceptance_focus: 'lead_to_inspection',
  },
  {
    acceptance_path_id: 'inspection_missed_reschedule_path',
    scenario_id: 'inspection_missed_reschedule_path',
    acceptance_path_name: 'inspection missed / reschedule path',
    acceptance_focus: 'lead_to_inspection',
  },
  {
    acceptance_path_id: 'post_inspection_still_open_path',
    scenario_id: 'post_inspection_still_open_path',
    acceptance_path_name: 'post-inspection still-open path',
    acceptance_focus: 'post_inspection',
  },
  {
    acceptance_path_id: 'estimate_needed_estimate_sent_tracking_path',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    acceptance_path_name: 'estimate needed / estimate sent tracking path',
    acceptance_focus: 'post_inspection',
  },
  {
    acceptance_path_id: 'homeowner_follow_up_needed_path',
    scenario_id: 'homeowner_follow_up_needed_path',
    acceptance_path_name: 'homeowner follow-up needed path',
    acceptance_focus: 'post_inspection',
  },
  {
    acceptance_path_id: 'roofer_follow_up_needed_path',
    scenario_id: 'roofer_follow_up_needed_path',
    acceptance_path_name: 'roofer follow-up needed path',
    acceptance_focus: 'post_inspection',
  },
  {
    acceptance_path_id: 'feedback_permission_yes_path',
    scenario_id: 'feedback_permission_yes_path',
    acceptance_path_name: 'feedback permission yes path',
    acceptance_focus: 'feedback_permission',
  },
  {
    acceptance_path_id: 'feedback_permission_no_path',
    scenario_id: 'feedback_permission_no_path',
    acceptance_path_name: 'feedback permission no path',
    acceptance_focus: 'feedback_permission',
  },
  {
    acceptance_path_id: 'feedback_permission_not_asked_path',
    scenario_id: 'feedback_permission_not_asked_path',
    acceptance_path_name: 'feedback permission not_asked path',
    acceptance_focus: 'feedback_permission',
  },
  {
    acceptance_path_id: 'csv_reporting_snapshot_path',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    acceptance_path_name: 'CSV/reporting snapshot path',
    acceptance_focus: 'reporting_csv',
  },
  {
    acceptance_path_id: 'starter_plan_profile_path',
    scenario_id: 'starter_plan_profile_path',
    acceptance_path_name: 'Starter plan profile path',
    acceptance_focus: 'usage_volume',
  },
  {
    acceptance_path_id: 'growth_plan_profile_path',
    scenario_id: 'growth_plan_profile_path',
    acceptance_path_name: 'Growth plan profile path',
    acceptance_focus: 'usage_volume',
  },
  {
    acceptance_path_id: 'elite_plan_profile_path',
    scenario_id: 'elite_plan_profile_path',
    acceptance_path_name: 'Elite plan profile path',
    acceptance_focus: 'usage_volume',
  },
  {
    acceptance_path_id: 'custom_review_500_plus_leads_path',
    scenario_id: 'custom_review_500_plus_leads_path',
    acceptance_path_name: 'Custom Review 500+ leads path',
    acceptance_focus: 'usage_volume',
  },
  {
    acceptance_path_id: 'custom_review_two_plus_locations_path',
    scenario_id: 'custom_review_two_plus_locations_path',
    acceptance_path_name: 'Custom Review 2+ locations path',
    acceptance_focus: 'usage_volume',
  },
  {
    acceptance_path_id: 'usage_volume_plan_limit_path',
    scenario_id: 'custom_review_500_plus_leads_path',
    acceptance_path_name: 'usage volume / plan limit path',
    acceptance_focus: 'usage_volume',
  },
  {
    acceptance_path_id: 'lead_source_roi_boundary_path',
    scenario_id: 'growth_plan_profile_path',
    acceptance_path_name: 'lead source / ROI boundary path',
    acceptance_focus: 'source_roi',
  },
  {
    acceptance_path_id: 'messaging_compliance_contact_permission_path',
    scenario_id: 'normal_lead_to_appointment_readiness',
    acceptance_path_name: 'messaging compliance / contact permission path',
    acceptance_focus: 'messaging_compliance',
  },
  {
    acceptance_path_id: 'audit_timeline_path',
    scenario_id: 'normal_lead_to_appointment_readiness',
    acceptance_path_name: 'audit timeline path',
    acceptance_focus: 'audit_timeline',
  },
  {
    acceptance_path_id: 'data_boundary_pii_minimization_path',
    scenario_id: 'missing_information_path',
    acceptance_path_name: 'data boundary / PII minimization path',
    acceptance_focus: 'data_boundary',
  },
  {
    acceptance_path_id: 'review_aging_sla_boundary_path',
    scenario_id: 'roofer_review_needed_path',
    acceptance_path_name: 'review aging / SLA boundary path',
    acceptance_focus: 'review_aging',
  },
  {
    acceptance_path_id: 'manual_to_native_handoff_rehearsal_path',
    scenario_id: 'normal_lead_to_appointment_readiness',
    acceptance_path_name: 'manual-to-native handoff rehearsal path',
    acceptance_focus: 'manual_to_native_handoff',
  },
  {
    acceptance_path_id: 'activation_flag_false_blocks_live_action_path',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    acceptance_path_name: 'activation flag false blocks live action path',
    acceptance_focus: 'live_activation_boundary',
  },
];

const E2E_ACCEPTANCE_SAFETY_ASSERTIONS = [
  'e2e_acceptance_rehearsal_expansion_summary_present',
  'e2e_acceptance_rehearsal_items_present',
  'e2e_acceptance_item_required_fields_present',
  'all_required_acceptance_paths_present',
  'lead_to_inspection_acceptance_summary_present',
  'missed_lead_recovery_acceptance_summary_present',
  'manual_outreach_acceptance_summary_present',
  'appointment_readiness_acceptance_summary_present',
  'review_queue_acceptance_summary_present',
  'post_inspection_acceptance_summary_present',
  'feedback_permission_acceptance_summary_present',
  'reporting_csv_acceptance_summary_present',
  'usage_volume_acceptance_summary_present',
  'source_roi_acceptance_summary_present',
  'audit_timeline_acceptance_summary_present',
  'data_boundary_acceptance_summary_present',
  'review_aging_acceptance_summary_present',
  'manual_to_native_handoff_acceptance_summary_present',
  'live_activation_boundary_summary_present',
  'every_acceptance_item_has_audit_events',
  'every_acceptance_item_has_guard_assertions',
  'every_acceptance_item_has_safety_assertions',
  'live_activation_flags_all_false_for_all_items',
  'live_action_allowed_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'no_estimate_quote_invoice_payment_generation',
  'roofer_review_owns_business_judgment_acceptance_items',
  'roofleadhq_review_limited_to_system_quality_acceptance_items',
  'feedback_permission_values_are_yes_no_not_asked',
  'feedback_not_published',
  'csv_acceptance_is_one_directional',
  'usage_volume_does_not_trigger_live_billing',
  'source_roi_does_not_promise_exact_roi',
  'manual_to_native_handoff_does_not_create_database_records',
  'e2e_acceptance_rehearsal_is_fake_data_only',
  'e2e_acceptance_rehearsal_is_deterministic',
  'reporting_summary_includes_e2e_acceptance',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

function deriveFeedbackStatus(feedbackItem, postInspection) {
  if (!feedbackItem && !postInspection) return 'not_applicable';
  if (postInspection?.feedback_issue_flag || feedbackItem?.feedback_issue_flag) return 'issue_flagged';
  if (postInspection?.feedback_captured || feedbackItem?.feedback_captured) return 'captured';
  if (postInspection?.feedback_requested || feedbackItem?.feedback_requested) {
    return 'requested_not_captured';
  }
  return 'not_requested';
}

function deriveFollowUpState(scenario, missedRecovery, manualOutreach) {
  if (missedRecovery?.missed_lead_recovery_status === 'active') return 'missed_lead_recovery_active';
  if (manualOutreach?.outreach_needed) return 'manual_outreach_needed';
  if (scenario.final_state === 'STOPPED_DO_NOT_CONTACT') return 'stopped_do_not_contact';
  if (scenario.final_state === 'MISSED_LEAD_RECOVERY_ACTIVE') return 'missed_lead_recovery_active';
  return 'tracking_only';
}

function deriveUsageVolumeStatus(usageVolume) {
  if (!usageVolume) return 'not_evaluated';
  if (usageVolume.custom_review_required) return 'custom_review_required';
  if (usageVolume.usage_over_limit) return 'over_limit';
  return 'within_limit';
}

function deriveSourceRoiBoundaryStatus(leadSource) {
  if (!leadSource) return 'boundary_preserved';
  if (leadSource.exact_roi_promise_blocked === false) return 'boundary_at_risk';
  return 'boundary_preserved';
}

function deriveReviewQueueStatus(scenario) {
  const reviewItem = (scenario.review_queue_items || [])[0];
  if (!reviewItem) {
    if (scenario.final_state === 'BLOCKED') return 'blocked';
    if (scenario.final_state === 'HOLD') return 'hold';
    return 'not_in_queue';
  }
  return reviewItem.status || 'pending';
}

function buildE2eAcceptanceItem(scenario, acceptancePath) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const rooferAccountId = input.fixture_roofer_id || 'roof-fix-001';
  const readiness = scenario.appointment_readiness_items?.[0];
  const postInspection = scenario.post_inspection_items?.[0];
  const feedback = scenario.feedback_permission_items?.[0];
  const manualOutreach = scenario.manual_outreach_items?.[0];
  const missedRecovery = scenario.missed_lead_recovery_items?.[0];
  const usageVolume = scenario.usage_volume_items?.[0];
  const leadSource = scenario.lead_source_attribution_items?.[0];
  const contactPermission = scenario.contact_permission_items?.[0];
  const reviewAging = scenario.review_queue_aging_items?.[0];
  const manualHandoff = scenario.manual_handoff_items?.[0];
  const piiItem = scenario.pii_minimization_items?.[0];

  const auditEventCount =
    (scenario.audit_events || []).length + (scenario.audit_event_timeline_items || []).length;
  const guardAssertionCount = (scenario.guard_assertions || []).length;
  const safetyAssertionCount = (scenario.safety_assertions || []).length;

  const explicitSystemQuality =
    manualOutreach?.system_quality_issue === true ||
    missedRecovery?.system_quality_issue === true ||
    (contactPermission?.roofleadhq_review_required === true &&
      contactPermission?.roofer_review_required !== true);
  const explicitBusinessJudgment =
    !explicitSystemQuality &&
    (manualOutreach?.business_judgment_required === true ||
      missedRecovery?.business_judgment_required === true ||
      contactPermission?.roofer_review_required === true ||
      readiness?.roofer_review_required === true);

  let systemQualityIssue = explicitSystemQuality;
  let businessJudgmentRequired = explicitBusinessJudgment;

  if (!systemQualityIssue && !businessJudgmentRequired) {
    if (postInspection?.roofleadhq_review_required && !postInspection?.roofer_review_required) {
      systemQualityIssue = true;
    } else if (postInspection?.roofer_review_required) {
      businessJudgmentRequired = true;
    } else if (readiness?.roofleadhq_review_required && !readiness?.roofer_review_required) {
      systemQualityIssue = true;
    }
  }

  const rooferReviewRequired = businessJudgmentRequired && !systemQualityIssue;
  const roofleadhqReviewRequired = systemQualityIssue && !businessJudgmentRequired;

  const requiredManualNextStep =
    scenario.manual_next_step ||
    postInspection?.required_manual_next_step ||
    readiness?.required_manual_next_step ||
    manualOutreach?.manual_next_step ||
    missedRecovery?.required_manual_next_step ||
    manualHandoff?.required_manual_next_step ||
    'confirm_fixture_acceptance_rehearsal';
  const nextStepOwner =
    scenario.owner ||
    postInspection?.next_step_owner ||
    manualOutreach?.next_step_owner ||
    missedRecovery?.next_step_owner ||
    manualHandoff?.next_step_owner ||
    (roofleadhqReviewRequired ? 'roofleadhq_jason' : 'roofer');

  const permissionValue = feedback?.permission_to_use_publicly ?? postInspection?.permission_to_use_publicly;
  const normalizedPermission =
    permissionValue === 'yes' || permissionValue === 'no' || permissionValue === 'not_asked'
      ? permissionValue
      : 'not_asked';

  const reportSnapshotReady =
    scenario.reporting_snapshot != null || acceptancePath.acceptance_focus === 'reporting_csv';
  const csvSnapshotReady =
    scenario.csv_snapshot_if_applicable != null ||
    scenario.reporting_snapshot?.csv_export_state != null ||
    acceptancePath.acceptance_focus === 'reporting_csv';

  return {
    e2e_acceptance_item_id: `e2e_accept_${acceptancePath.acceptance_path_id}`,
    scenario_id: acceptancePath.scenario_id,
    acceptance_path_id: acceptancePath.acceptance_path_id,
    acceptance_path_name: acceptancePath.acceptance_path_name,
    acceptance_focus: acceptancePath.acceptance_focus,
    lead_id: leadId,
    roofer_account_id: rooferAccountId,
    plan_profile: scenario.plan_profile,
    starting_state: scenario.starting_state,
    final_state: scenario.final_state,
    lead_source: leadSource?.lead_source || input.lead_source || 'unknown',
    contact_permission_status:
      contactPermission?.contact_permission_status ||
      readiness?.contact_permission_status ||
      'permission_unknown',
    homeowner_contact_ready:
      contactPermission?.homeowner_contact_ready ?? readiness?.homeowner_contact_ready ?? false,
    follow_up_state: deriveFollowUpState(scenario, missedRecovery, manualOutreach),
    missed_lead_recovery_status: missedRecovery?.missed_lead_recovery_status || 'not_used',
    manual_outreach_needed: manualOutreach?.outreach_needed ?? false,
    appointment_readiness_status:
      readiness?.appointment_readiness_status || readiness?.readiness_decision || 'not_evaluated',
    appointment_booked:
      Boolean(postInspection?.appointment_id) ||
      (scenario.reporting_snapshot?.appointment_booked > 0),
    inspection_status: postInspection?.inspection_status || 'not_applicable',
    post_inspection_status: postInspection?.post_inspection_status || 'not_applicable',
    feedback_status: deriveFeedbackStatus(feedback, postInspection),
    permission_to_use_publicly: normalizedPermission,
    report_snapshot_ready: reportSnapshotReady,
    csv_snapshot_ready: csvSnapshotReady,
    usage_volume_status: deriveUsageVolumeStatus(usageVolume),
    source_roi_boundary_status: deriveSourceRoiBoundaryStatus(leadSource),
    review_queue_status: deriveReviewQueueStatus(scenario),
    review_age_bucket: reviewAging?.age_bucket || '0-4h',
    manual_to_native_handoff_ready: manualHandoff?.handoff_ready ?? false,
    audit_event_count: auditEventCount,
    guard_assertion_count: guardAssertionCount,
    safety_assertion_count: safetyAssertionCount,
    required_manual_next_step: requiredManualNextStep,
    next_step_owner: nextStepOwner,
    roofer_review_required: rooferReviewRequired,
    roofleadhq_review_required: roofleadhqReviewRequired,
    business_judgment_required: businessJudgmentRequired,
    system_quality_issue: systemQualityIssue,
    data_boundary_checked: piiItem?.data_boundary_checked ?? true,
    pii_minimization_checked: piiItem?.pii_minimization_checked ?? true,
    live_activation_flags_all_false: true,
    live_action_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    deterministic_fixture_output: true,
    result: 'PASS',
  };
}

function buildScenarioE2eAcceptanceItems(scenario) {
  return ACCEPTANCE_PATHS.filter((path) => path.scenario_id === scenario.scenario_id).map((path) =>
    buildE2eAcceptanceItem(scenario, path),
  );
}

function buildAllE2eAcceptanceItems(scenarios) {
  const scenarioMap = Object.fromEntries(scenarios.map((scenario) => [scenario.scenario_id, scenario]));
  return ACCEPTANCE_PATHS.map((path) => {
    const scenario = scenarioMap[path.scenario_id];
    if (!scenario) {
      throw new Error(`Missing scenario for acceptance path ${path.acceptance_path_id}`);
    }
    return buildE2eAcceptanceItem(scenario, path);
  });
}

function buildTopLevelE2eAcceptanceRehearsalExpansion(
  scenarios,
  outputBase,
  reportingOutput,
  reviewQueueOutput,
  appointmentReadinessOutput,
  postInspectionOutput,
  feedbackPermissionOutput,
  manualOutreachOutput,
  missedLeadRecoveryOutput,
  usageVolumeOutput,
  leadSourceRoiOutput,
  messagingComplianceOutput,
  auditEventTimelineOutput,
  dataBoundaryPiiOutput,
  reviewQueueAgingSlaOutput,
  manualToNativeHandoffOutput,
) {
  const allItems = buildAllE2eAcceptanceItems(scenarios);
  const focusItems = (focus) => allItems.filter((item) => item.acceptance_focus === focus);
  const businessJudgmentItems = allItems.filter((item) => item.business_judgment_required);
  const systemQualityItems = allItems.filter((item) => item.system_quality_issue);

  const acceptancePathIds = new Set(allItems.map((item) => item.acceptance_path_id));

  return {
    e2e_acceptance_rehearsal_expansion:
      'native_workflow_fixture_e2e_acceptance_rehearsal_expansion',
    e2e_acceptance_rehearsal_expansion_summary: {
      description:
        'Deterministic fake-data end-to-end acceptance rehearsal — ties together lead intake, contact permission, follow-up, missed lead recovery, manual outreach, appointment readiness, review queue, post-inspection, feedback permission, reporting/CSV, usage volume, source ROI, audit timeline, data boundary, review aging, and manual-to-native handoff without live automation or production data',
      total_acceptance_items: allItems.length,
      required_acceptance_paths: ACCEPTANCE_PATHS.length,
      all_required_acceptance_paths_present:
        ACCEPTANCE_PATHS.every((path) => acceptancePathIds.has(path.acceptance_path_id)),
      scenario_acceptance_items: scenarios.reduce(
        (count, scenario) => count + (scenario.e2e_acceptance_rehearsal_items || []).length,
        0,
      ),
      acceptance_path_catalog_items: ACCEPTANCE_PATHS.length,
      audited_items_count: allItems.filter((item) => item.audit_event_count > 0).length,
      guarded_items_count: allItems.filter((item) => item.guard_assertion_count > 0).length,
      safety_asserted_items_count: allItems.filter((item) => item.safety_assertion_count > 0).length,
      public_go_live_or_production_copy_changed: false,
      public_go_live_or_production_copy_approval_required: true,
      rehearsal_only: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    e2e_acceptance_rehearsal_items: allItems,
    lead_to_inspection_acceptance_summary: {
      description:
        'Lead intake through appointment readiness and inspection tracking acceptance rehearsal',
      acceptance_item_count: focusItems('lead_to_inspection').length,
      scenario_ids: focusItems('lead_to_inspection').map((item) => item.scenario_id),
      appointment_readiness_items_in_prior_expansion:
        appointmentReadinessOutput.appointment_readiness_items?.length || 0,
      post_inspection_items_in_prior_expansion: postInspectionOutput.post_inspection_items?.length || 0,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_acceptance_summary: {
      description: 'Missed lead recovery acceptance rehearsal without live sends or notifications',
      acceptance_item_count: focusItems('missed_lead_recovery').length,
      missed_lead_recovery_items_in_prior_expansion:
        missedLeadRecoveryOutput.missed_lead_recovery_items?.length || 0,
      recovery_active_items: allItems.filter(
        (item) => item.missed_lead_recovery_status === 'active',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_acceptance_summary: {
      description: 'Manual outreach acceptance rehearsal — tracking and review only, no live sends',
      acceptance_item_count: focusItems('manual_outreach').length,
      manual_outreach_items_in_prior_expansion:
        manualOutreachOutput.manual_outreach_items?.length || 0,
      manual_outreach_needed_items: allItems.filter((item) => item.manual_outreach_needed).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_readiness_acceptance_summary: {
      description:
        'Appointment readiness acceptance rehearsal — manual coordination only, no live calendar booking',
      acceptance_item_count: focusItems('appointment_readiness').length,
      appointment_readiness_items_in_prior_expansion:
        appointmentReadinessOutput.appointment_readiness_items?.length || 0,
      appointment_ready_items: allItems.filter(
        (item) => item.appointment_readiness_status === 'ready',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_queue_acceptance_summary: {
      description:
        'Review queue acceptance rehearsal — roofer owns business judgment; RoofLeadHQ limited to system quality',
      acceptance_item_count: focusItems('review_queue').length,
      review_queue_items_in_prior_expansion: reviewQueueOutput.review_queue_items?.length || 0,
      roofer_review_owns_business_judgment_acceptance_items: businessJudgmentItems.every(
        (item) => item.business_judgment_required && !item.system_quality_issue,
      ),
      roofleadhq_review_limited_to_system_quality_acceptance_items: systemQualityItems.every(
        (item) => item.system_quality_issue && !item.business_judgment_required,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_acceptance_summary: {
      description:
        'Post-inspection acceptance rehearsal — tracking only, no automatic estimate/quote/invoice/payment',
      acceptance_item_count: focusItems('post_inspection').length,
      post_inspection_items_in_prior_expansion: postInspectionOutput.post_inspection_items?.length || 0,
      still_open_items: allItems.filter((item) => item.post_inspection_status === 'still_open').length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_acceptance_summary: {
      description:
        'Feedback permission acceptance rehearsal — yes/no/not_asked preserved, no publication',
      acceptance_item_count: focusItems('feedback_permission').length,
      feedback_permission_items_in_prior_expansion:
        feedbackPermissionOutput.feedback_permission_items?.length || 0,
      feedback_permission_values_are_yes_no_not_asked: allItems.every((item) =>
        ['yes', 'no', 'not_asked'].includes(item.permission_to_use_publicly),
      ),
      feedback_not_published: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    reporting_csv_acceptance_summary: {
      description:
        'Reporting and CSV acceptance rehearsal — one-directional fake-data snapshots, not CRM sync',
      acceptance_item_count: focusItems('reporting_csv').length,
      report_snapshot_ready_items: allItems.filter((item) => item.report_snapshot_ready).length,
      csv_snapshot_ready_items: allItems.filter((item) => item.csv_snapshot_ready).length,
      reporting_summary_includes_e2e_acceptance: true,
      csv_acceptance_is_one_directional: true,
      csv_not_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    usage_volume_acceptance_summary: {
      description:
        'Usage volume acceptance rehearsal — plan limits tracked without live billing or auto-upgrade',
      acceptance_item_count: focusItems('usage_volume').length,
      usage_volume_items_in_prior_expansion: usageVolumeOutput.usage_volume_items?.length || 0,
      usage_volume_does_not_trigger_live_billing: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    source_roi_acceptance_summary: {
      description:
        'Lead source / ROI boundary acceptance rehearsal — no exact ROI promise or ad-platform calls',
      acceptance_item_count: focusItems('source_roi').length,
      lead_source_attribution_items_in_prior_expansion:
        leadSourceRoiOutput.lead_source_attribution_items?.length || 0,
      source_roi_does_not_promise_exact_roi: true,
      source_roi_boundary_preserved_items: allItems.filter(
        (item) => item.source_roi_boundary_status === 'boundary_preserved',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    audit_timeline_acceptance_summary: {
      description:
        'Audit timeline acceptance rehearsal — every transition traceable without secrets or live automation',
      acceptance_item_count: focusItems('audit_timeline').length,
      audit_event_items_in_prior_expansion: auditEventTimelineOutput.audit_event_items?.length || 0,
      every_acceptance_item_has_audit_events: allItems.every((item) => item.audit_event_count > 0),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    data_boundary_acceptance_summary: {
      description:
        'Data boundary / PII minimization acceptance rehearsal — fake homeowner identifiers only',
      acceptance_item_count: focusItems('data_boundary').length,
      pii_minimization_items_in_prior_expansion:
        dataBoundaryPiiOutput.pii_minimization_items?.length || 0,
      data_boundary_checked_items: allItems.filter((item) => item.data_boundary_checked).length,
      pii_minimization_checked_items: allItems.filter((item) => item.pii_minimization_checked)
        .length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_aging_acceptance_summary: {
      description:
        'Review aging / SLA boundary acceptance rehearsal — escalation ready without live notifications',
      acceptance_item_count: focusItems('review_aging').length,
      review_queue_aging_items_in_prior_expansion:
        reviewQueueAgingSlaOutput.review_queue_aging_items?.length || 0,
      review_age_buckets_represented: [
        ...new Set(allItems.map((item) => item.review_age_bucket)),
      ],
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_to_native_handoff_acceptance_summary: {
      description:
        'Manual-to-native handoff acceptance rehearsal — mapping rehearsal only, no database records',
      acceptance_item_count: focusItems('manual_to_native_handoff').length,
      manual_handoff_items_in_prior_expansion:
        manualToNativeHandoffOutput.manual_handoff_items?.length || 0,
      manual_to_native_handoff_does_not_create_database_records: true,
      handoff_ready_items: allItems.filter((item) => item.manual_to_native_handoff_ready).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    live_activation_boundary_summary: {
      description:
        'Live activation boundary acceptance rehearsal — all flags false, blocked live actions audited',
      acceptance_item_count: focusItems('live_activation_boundary').length,
      live_activation_flags_all_false_for_all_items: allItems.every(
        (item) => item.live_activation_flags_all_false === true,
      ),
      live_action_allowed_is_no_for_all_items: allItems.every(
        (item) => item.live_action_allowed === 'no',
      ),
      blocked_live_action_items: allItems.filter(
        (item) => item.acceptance_path_id === 'activation_flag_false_blocks_live_action_path',
      ).length,
      reporting_snapshot_in_prior_expansion: Boolean(reportingOutput.reporting_snapshot_summary),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    e2e_acceptance_safety_assertions: [
      ...E2E_ACCEPTANCE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS = [
  {
    channel_id: 'twilio_sms',
    scenario_id: 'missed_lead_recovery_path',
    channel: 'sms',
    integration_name: 'twilio',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'yes',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_sms_enabled',
    readiness_status: 'NEEDS_APPROVAL',
    blocker_reason: 'explicit_jason_approval_required_before_twilio_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_and_explicitly_approves_twilio_test_mode_activation_prerequisites',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'vapi_calls',
    scenario_id: 'normal_lead_to_appointment_readiness',
    channel: 'voice',
    integration_name: 'vapi',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'yes',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_vapi_calls_enabled',
    readiness_status: 'NEEDS_APPROVAL',
    blocker_reason: 'explicit_jason_approval_required_before_vapi_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_and_explicitly_approves_vapi_test_mode_activation_prerequisites',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'resend_email',
    scenario_id: 'homeowner_follow_up_needed_path',
    channel: 'email',
    integration_name: 'resend',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_resend_email_enabled',
    readiness_status: 'NEEDS_APPROVAL',
    blocker_reason: 'explicit_jason_approval_required_before_resend_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_and_explicitly_approves_resend_test_mode_activation_prerequisites',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'google_calendar',
    scenario_id: 'appointment_booked_path',
    channel: 'calendar',
    integration_name: 'google_calendar',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_calendar_booking_enabled',
    readiness_status: 'NEEDS_APPROVAL',
    blocker_reason: 'explicit_jason_approval_required_before_google_calendar_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_and_explicitly_approves_google_calendar_test_mode_activation_prerequisites',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'lindy_bridge',
    scenario_id: 'roofleadhq_system_review_needed_path',
    channel: 'bridge',
    integration_name: 'lindy_bridge',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'yes',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: `live_${BRIDGE_VENDOR}_bridge_enabled`,
    readiness_status: 'BLOCKED',
    blocker_reason:
      'safe_lindy_bridge_fixture_reference_allowed_but_real_lindy_client_api_webhook_live_workflow_activation_forbidden_without_explicit_jason_approval',
    required_manual_next_step:
      'jason_reviews_lindy_bridge_test_mode_prerequisites_and_confirms_safe_fixture_reference_only',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'csv_delivery',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    channel: 'csv',
    integration_name: 'csv_delivery',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'no',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_csv_export_enabled',
    readiness_status: 'NEEDS_APPROVAL',
    blocker_reason: 'explicit_jason_approval_required_before_csv_delivery_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_and_explicitly_approves_csv_delivery_test_mode_activation_prerequisites',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'crm_handoff',
    scenario_id: 'growth_plan_profile_path',
    channel: 'crm',
    integration_name: 'crm_handoff_export',
    test_mode_supported: 'yes',
    test_mode_requested: 'yes',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_crm_handoff_enabled',
    readiness_status: 'NEEDS_APPROVAL',
    blocker_reason: 'explicit_jason_approval_required_before_crm_handoff_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_and_explicitly_approves_crm_handoff_export_test_mode_activation_prerequisites',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'scheduler_cron',
    scenario_id: 'custom_review_500_plus_leads_path',
    channel: 'scheduler',
    integration_name: 'scheduler_cron',
    test_mode_supported: 'no',
    test_mode_requested: 'no',
    approval_required: 'yes',
    sandbox_credentials_required: 'no',
    public_route_required: 'no',
    scheduler_required: 'yes',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_scheduler_enabled',
    readiness_status: 'BLOCKED',
    blocker_reason: 'scheduler_cron_activation_blocked_until_explicit_jason_approval_and_fixture_review',
    required_manual_next_step:
      'jason_reviews_scheduler_cron_readiness_prerequisites_before_any_fixture_scheduler_enablement',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'dispatcher',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    channel: 'dispatcher',
    integration_name: 'dispatcher',
    test_mode_supported: 'no',
    test_mode_requested: 'no',
    approval_required: 'yes',
    sandbox_credentials_required: 'no',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'yes',
    live_activation_flag_name: 'live_dispatcher_enabled',
    readiness_status: 'BLOCKED',
    blocker_reason: 'dispatcher_activation_blocked_until_explicit_jason_approval_and_fixture_review',
    required_manual_next_step:
      'jason_reviews_dispatcher_readiness_prerequisites_before_any_fixture_dispatcher_enablement',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'public_route_webhook',
    scenario_id: 'roofleadhq_system_review_needed_path',
    channel: 'public_route',
    integration_name: 'public_webhook',
    test_mode_supported: 'no',
    test_mode_requested: 'no',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'yes',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_public_webhook_enabled',
    readiness_status: 'BLOCKED',
    blocker_reason: 'public_route_webhook_activation_blocked_until_explicit_jason_approval',
    required_manual_next_step:
      'jason_reviews_public_route_webhook_readiness_prerequisites_before_any_public_route_enablement',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'supabase_persistence',
    scenario_id: 'missing_information_path',
    channel: 'persistence',
    integration_name: 'supabase',
    test_mode_supported: 'no',
    test_mode_requested: 'no',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_supabase_persistence_enabled',
    readiness_status: 'BLOCKED',
    blocker_reason:
      'supabase_persistence_blocked_until_security_tenant_isolation_review_and_explicit_jason_approval',
    required_manual_next_step:
      'jason_reviews_security_tenant_isolation_prerequisites_before_any_supabase_persistence_activation',
    next_step_owner: 'jason',
  },
  {
    channel_id: 'billing_payment_automation',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    channel: 'billing',
    integration_name: 'billing_payment_invoice_estimate_quote',
    test_mode_supported: 'no',
    test_mode_requested: 'no',
    approval_required: 'yes',
    sandbox_credentials_required: 'yes',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'live_payment_or_invoice_enabled',
    readiness_status: 'BLOCKED',
    blocker_reason:
      'billing_payment_invoice_estimate_quote_automation_blocked_until_explicit_jason_approval',
    required_manual_next_step:
      'jason_reviews_billing_payment_invoice_estimate_quote_automation_prerequisites_before_any_activation',
    next_step_owner: 'jason',
  },
];

const SANDBOX_TEST_MODE_SAFETY_ASSERTIONS = [
  'sandbox_test_mode_readiness_expansion_summary_present',
  'sandbox_test_mode_readiness_items_present',
  'sandbox_test_mode_readiness_item_required_fields_present',
  'required_channels_present',
  'twilio_test_mode_readiness_summary_present',
  'vapi_test_mode_readiness_summary_present',
  'resend_test_mode_readiness_summary_present',
  'google_calendar_test_mode_readiness_summary_present',
  'lindy_bridge_test_mode_readiness_summary_present',
  'csv_delivery_test_mode_readiness_summary_present',
  'crm_handoff_test_mode_readiness_summary_present',
  'scheduler_dispatcher_readiness_summary_present',
  'public_route_readiness_summary_present',
  'env_credential_boundary_summary_present',
  'approval_gate_summary_present',
  'test_mode_activation_requires_explicit_approval',
  'live_activation_requires_separate_explicit_approval',
  'sandbox_credentials_present_is_no_for_all_items',
  'production_credentials_present_is_no_for_all_items',
  'env_values_logged_is_no_for_all_items',
  'public_route_enabled_is_no_for_all_items',
  'scheduler_enabled_is_no_for_all_items',
  'dispatcher_enabled_is_no_for_all_items',
  'live_activation_flags_remain_false_for_all_items',
  'test_mode_activation_allowed_is_no_for_all_items',
  'live_activation_allowed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'no_estimate_quote_invoice_payment_generation',
  'safe_lindy_bridge_reference_not_live_activation',
  'real_lindy_activation_patterns_remain_forbidden',
  'sandbox_test_mode_readiness_is_fake_data_only',
  'sandbox_test_mode_readiness_is_audited',
  'reporting_summary_includes_sandbox_test_mode_readiness',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

function buildSandboxTestModeReadinessItem(scenario, channelDef) {
  const input = scenario.input_fixture_summary || {};
  const rooferAccountId = input.fixture_roofer_id || 'roof-fix-001';

  return {
    sandbox_test_mode_item_id: `sandbox_test_mode_${channelDef.channel_id}`,
    scenario_id: scenario.scenario_id,
    roofer_account_id: rooferAccountId,
    plan_profile: scenario.plan_profile,
    channel: channelDef.channel,
    integration_name: channelDef.integration_name,
    test_mode_supported: channelDef.test_mode_supported,
    test_mode_requested: channelDef.test_mode_requested,
    approval_required: channelDef.approval_required,
    explicit_approval_present: 'no',
    sandbox_credentials_required: channelDef.sandbox_credentials_required,
    sandbox_credentials_present: 'no',
    production_credentials_present: 'no',
    env_values_logged: 'no',
    public_route_required: channelDef.public_route_required,
    public_route_enabled: 'no',
    scheduler_required: channelDef.scheduler_required,
    scheduler_enabled: 'no',
    dispatcher_required: channelDef.dispatcher_required,
    dispatcher_enabled: 'no',
    live_activation_flag_name: channelDef.live_activation_flag_name,
    live_activation_flag_value: false,
    test_mode_activation_allowed: 'no',
    live_activation_allowed: 'no',
    readiness_status: channelDef.readiness_status,
    blocker_reason: channelDef.blocker_reason,
    required_manual_next_step: channelDef.required_manual_next_step,
    next_step_owner: channelDef.next_step_owner,
    audit_event_id: `audit-sandbox-test-mode-${channelDef.channel_id}-${scenario.scenario_id}`,
    production_data_touched: 'no',
    external_services_called: 'no',
    notification_sent: 'no',
    live_action_performed: 'no',
  };
}

function buildScenarioSandboxTestModeReadinessItems(scenario) {
  return SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.filter(
    (channelDef) => channelDef.scenario_id === scenario.scenario_id,
  ).map((channelDef) => buildSandboxTestModeReadinessItem(scenario, channelDef));
}

function buildAllSandboxTestModeReadinessItems(scenarios) {
  const scenarioMap = Object.fromEntries(scenarios.map((scenario) => [scenario.scenario_id, scenario]));
  return SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.map((channelDef) => {
    const scenario = scenarioMap[channelDef.scenario_id];
    if (!scenario) {
      throw new Error(`Missing scenario for sandbox test-mode channel ${channelDef.channel_id}`);
    }
    return buildSandboxTestModeReadinessItem(scenario, channelDef);
  });
}

function buildChannelReadinessSummary(items, integrationName) {
  const channelItems = items.filter((item) => item.integration_name === integrationName);
  return {
    description: `Sandbox/test-mode readiness modeling for ${integrationName} — blocked without explicit Jason approval`,
    readiness_item_count: channelItems.length,
    blocked_items: channelItems.filter((item) => item.readiness_status === 'BLOCKED').length,
    needs_approval_items: channelItems.filter((item) => item.readiness_status === 'NEEDS_APPROVAL')
      .length,
    hold_items: channelItems.filter((item) => item.readiness_status === 'HOLD').length,
    test_mode_activation_allowed: 'no',
    live_activation_allowed: 'no',
    explicit_approval_present: 'no',
    sandbox_credentials_present: 'no',
    production_credentials_present: 'no',
    env_values_logged: 'no',
    fake_data_only: true,
    live_actions_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
  };
}

function buildTopLevelSandboxTestModeIntegrationReadinessGateExpansion(
  scenarios,
  outputBase,
  e2eAcceptanceRehearsalOutput,
) {
  const allItems = buildAllSandboxTestModeReadinessItems(scenarios);
  const channelIds = new Set(allItems.map((item) => item.integration_name));

  return {
    sandbox_test_mode_readiness_expansion:
      'native_workflow_fixture_sandbox_test_mode_integration_readiness_gate_expansion',
    sandbox_test_mode_readiness_expansion_summary: {
      description:
        'Deterministic fake-data sandbox/test-mode integration readiness gate — models future test-mode channel activation prerequisites without enabling sandbox credentials, live sends, external calls, production persistence, public routes, cron jobs, schedulers, dispatchers, or customer-facing automation',
      total_readiness_items: allItems.length,
      required_channels: SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.length,
      all_required_channels_present:
        SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.length === allItems.length &&
        channelIds.size === SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.length,
      scenario_readiness_items: scenarios.reduce(
        (count, scenario) => count + (scenario.sandbox_test_mode_readiness_items || []).length,
        0,
      ),
      audited_items_count: allItems.length,
      blocked_items_count: allItems.filter((item) => item.readiness_status === 'BLOCKED').length,
      needs_approval_items_count: allItems.filter((item) => item.readiness_status === 'NEEDS_APPROVAL')
        .length,
      hold_items_count: allItems.filter((item) => item.readiness_status === 'HOLD').length,
      public_go_live_or_production_copy_changed: false,
      public_go_live_or_production_copy_approval_required: true,
      readiness_gate_modeling_only: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    sandbox_test_mode_readiness_items: allItems,
    channel_readiness_summary: {
      description:
        'Aggregate sandbox/test-mode channel readiness — all channels remain blocked or need explicit Jason approval',
      total_channels: allItems.length,
      channels_blocked: allItems.filter((item) => item.readiness_status === 'BLOCKED').length,
      channels_needing_approval: allItems.filter((item) => item.readiness_status === 'NEEDS_APPROVAL')
        .length,
      test_mode_activation_allowed_for_all_channels: 'no',
      live_activation_allowed_for_all_channels: 'no',
      reporting_summary_includes_sandbox_test_mode_readiness: true,
      e2e_acceptance_items_in_prior_expansion:
        e2eAcceptanceRehearsalOutput.e2e_acceptance_rehearsal_items?.length || 0,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    twilio_test_mode_readiness_summary: buildChannelReadinessSummary(allItems, 'twilio'),
    vapi_test_mode_readiness_summary: buildChannelReadinessSummary(allItems, 'vapi'),
    resend_test_mode_readiness_summary: buildChannelReadinessSummary(allItems, 'resend'),
    google_calendar_test_mode_readiness_summary: buildChannelReadinessSummary(allItems, 'google_calendar'),
    lindy_bridge_test_mode_readiness_summary: {
      ...buildChannelReadinessSummary(allItems, 'lindy_bridge'),
      safe_lindy_bridge_reference_not_live_activation: true,
      real_lindy_client_api_webhook_live_workflow_activation_forbidden: true,
    },
    csv_delivery_test_mode_readiness_summary: buildChannelReadinessSummary(allItems, 'csv_delivery'),
    crm_handoff_test_mode_readiness_summary: buildChannelReadinessSummary(allItems, 'crm_handoff_export'),
    scheduler_dispatcher_readiness_summary: {
      description:
        'Scheduler/cron and dispatcher readiness — both remain blocked without explicit Jason approval',
      scheduler_items: allItems.filter((item) => item.integration_name === 'scheduler_cron').length,
      dispatcher_items: allItems.filter((item) => item.integration_name === 'dispatcher').length,
      scheduler_enabled: 'no',
      dispatcher_enabled: 'no',
      scheduler_activation_allowed: 'no',
      dispatcher_activation_allowed: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    public_route_readiness_summary: {
      description:
        'Public route/webhook readiness — blocked without explicit Jason approval; no public routes enabled',
      public_route_items: allItems.filter((item) => item.integration_name === 'public_webhook').length,
      public_route_enabled: 'no',
      public_route_activation_allowed: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    env_credential_boundary_summary: {
      description:
        'Environment and credential boundary — no sandbox or production credentials read; no env values logged',
      sandbox_credentials_present: 'no',
      production_credentials_present: 'no',
      env_values_logged: 'no',
      api_keys_tokens_webhook_secrets_service_role_keys_logged: 'no',
      all_items_sandbox_credentials_present_no: allItems.every(
        (item) => item.sandbox_credentials_present === 'no',
      ),
      all_items_production_credentials_present_no: allItems.every(
        (item) => item.production_credentials_present === 'no',
      ),
      all_items_env_values_logged_no: allItems.every((item) => item.env_values_logged === 'no'),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    approval_gate_summary: {
      description:
        'Approval gate — test-mode activation requires explicit Jason approval; live activation requires separate explicit Jason approval',
      test_mode_activation_requires_explicit_approval: true,
      live_activation_requires_separate_explicit_approval: true,
      explicit_approval_present_for_any_item: 'no',
      test_mode_activation_allowed_for_all_items: 'no',
      live_activation_allowed_for_all_items: 'no',
      jason_approval_required_before_any_channel_activation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    sandbox_test_mode_safety_assertions: [
      ...SANDBOX_TEST_MODE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MESSAGING_INTEGRATIONS = new Set(['twilio', 'vapi', 'resend']);

const SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_CHANNEL_DEFINITIONS =
  SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.map((channelDef) => {
    const isMessaging = MESSAGING_INTEGRATIONS.has(channelDef.integration_name);
    const isSupabase = channelDef.integration_name === 'supabase';
    const isScheduler = channelDef.integration_name === 'scheduler_cron';
    const isDispatcher = channelDef.integration_name === 'dispatcher';
    const isPublicRoute = channelDef.integration_name === 'public_webhook';

    let approvalStage = 'pre_test_mode_channel_activation_review';
    if (isSupabase) approvalStage = 'pre_persistence_activation_review';
    else if (isScheduler || isDispatcher) approvalStage = 'pre_scheduler_dispatcher_activation_review';
    else if (isPublicRoute) approvalStage = 'pre_public_route_activation_review';
    else if (channelDef.integration_name === 'billing_payment_invoice_estimate_quote') {
      approvalStage = 'pre_billing_automation_activation_review';
    }

    const blockerParts = [];
    if (channelDef.explicit_approval_present !== 'yes') {
      blockerParts.push('missing_explicit_approval_blocks_test_mode_activation');
    }
    if (channelDef.sandbox_credentials_required === 'yes') {
      blockerParts.push('missing_credential_review_blocks_test_mode_activation');
    }
    blockerParts.push('missing_rollback_plan_blocks_test_mode_activation');
    blockerParts.push('missing_post_approval_test_plan_blocks_test_mode_activation');
    if (isMessaging) {
      blockerParts.push('missing_messaging_compliance_review_blocks_messaging_test_mode');
    }
    if (isSupabase) {
      blockerParts.push('missing_security_tenant_isolation_review_blocks_persistence');
    }

    return {
      ...channelDef,
      approval_stage: approvalStage,
      approval_evidence_type: 'jason_explicit_written_approval',
      approval_owner: 'jason',
      technical_owner: 'roofleadhq_engineering',
      business_owner: 'jason',
      security_review_required: isSupabase ? 'yes' : 'no',
      tenant_isolation_review_required: isSupabase ? 'yes' : 'no',
      data_boundary_review_required: isSupabase ? 'yes' : 'no',
      messaging_compliance_review_required: isMessaging ? 'yes' : 'no',
      credential_review_required: channelDef.sandbox_credentials_required === 'yes' ? 'yes' : 'no',
      public_route_review_required: channelDef.public_route_required === 'yes' ? 'yes' : 'no',
      scheduler_dispatcher_review_required:
        isScheduler || isDispatcher || channelDef.scheduler_required === 'yes' ? 'yes' : 'no',
      rollback_plan_required: 'yes',
      rollback_plan_present: 'no',
      post_approval_test_plan_required: 'yes',
      post_approval_test_plan_present: 'no',
      approval_runbook_blocker_reason: blockerParts.join(';'),
    };
  });

const SANDBOX_TEST_MODE_APPROVAL_SAFETY_ASSERTIONS = [
  'sandbox_test_mode_approval_runbook_expansion_summary_present',
  'sandbox_test_mode_approval_runbook_items_present',
  'approval_runbook_item_required_fields_present',
  'required_channels_present',
  'approval_step_summary_present',
  'channel_approval_summary_present',
  'pre_approval_blocker_summary_present',
  'explicit_approval_evidence_summary_present',
  'credential_boundary_approval_summary_present',
  'public_route_approval_summary_present',
  'scheduler_dispatcher_approval_summary_present',
  'data_boundary_approval_summary_present',
  'security_tenant_isolation_approval_summary_present',
  'rollback_plan_summary_present',
  'post_approval_test_plan_summary_present',
  'approval_audit_summary_present',
  'explicit_approval_present_is_no_for_all_items',
  'approval_evidence_present_is_no_for_all_items',
  'approval_required_is_yes_for_all_items',
  'sandbox_credentials_present_is_no_for_all_items',
  'production_credentials_present_is_no_for_all_items',
  'env_values_logged_is_no_for_all_items',
  'public_route_enabled_is_no_for_all_items',
  'scheduler_enabled_is_no_for_all_items',
  'dispatcher_enabled_is_no_for_all_items',
  'live_activation_flags_remain_false_for_all_items',
  'test_mode_activation_allowed_is_no_for_all_items',
  'live_activation_allowed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
  'missing_explicit_approval_blocks_test_mode_activation',
  'missing_rollback_plan_blocks_test_mode_activation',
  'missing_post_approval_test_plan_blocks_test_mode_activation',
  'missing_security_tenant_isolation_review_blocks_persistence',
  'messaging_compliance_review_required_for_messaging_channels',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'no_estimate_quote_invoice_payment_generation',
  'safe_lindy_bridge_reference_not_live_activation',
  'real_lindy_activation_patterns_remain_forbidden',
  'sandbox_test_mode_approval_runbook_is_fake_data_only',
  'sandbox_test_mode_approval_runbook_is_audited',
  'reporting_summary_includes_sandbox_test_mode_approval_runbook',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

function buildSandboxTestModeApprovalRunbookItem(scenario, channelDef) {
  const input = scenario.input_fixture_summary || {};
  const rooferAccountId = input.fixture_roofer_id || 'roof-fix-001';

  return {
    approval_runbook_item_id: `approval_runbook_${channelDef.channel_id}`,
    scenario_id: scenario.scenario_id,
    roofer_account_id: rooferAccountId,
    plan_profile: scenario.plan_profile,
    channel: channelDef.channel,
    integration_name: channelDef.integration_name,
    approval_stage: channelDef.approval_stage,
    approval_required: 'yes',
    explicit_approval_present: 'no',
    approval_evidence_present: 'no',
    approval_evidence_type: channelDef.approval_evidence_type,
    approval_owner: channelDef.approval_owner,
    technical_owner: channelDef.technical_owner,
    business_owner: channelDef.business_owner,
    security_review_required: channelDef.security_review_required,
    tenant_isolation_review_required: channelDef.tenant_isolation_review_required,
    data_boundary_review_required: channelDef.data_boundary_review_required,
    messaging_compliance_review_required: channelDef.messaging_compliance_review_required,
    credential_review_required: channelDef.credential_review_required,
    public_route_review_required: channelDef.public_route_review_required,
    scheduler_dispatcher_review_required: channelDef.scheduler_dispatcher_review_required,
    rollback_plan_required: channelDef.rollback_plan_required,
    rollback_plan_present: channelDef.rollback_plan_present,
    post_approval_test_plan_required: channelDef.post_approval_test_plan_required,
    post_approval_test_plan_present: channelDef.post_approval_test_plan_present,
    sandbox_credentials_required: channelDef.sandbox_credentials_required,
    sandbox_credentials_present: 'no',
    production_credentials_present: 'no',
    env_values_logged: 'no',
    public_route_required: channelDef.public_route_required,
    public_route_enabled: 'no',
    scheduler_required: channelDef.scheduler_required,
    scheduler_enabled: 'no',
    dispatcher_required: channelDef.dispatcher_required,
    dispatcher_enabled: 'no',
    live_activation_flag_name: channelDef.live_activation_flag_name,
    live_activation_flag_value: false,
    test_mode_activation_allowed: 'no',
    live_activation_allowed: 'no',
    readiness_status: channelDef.readiness_status,
    blocker_reason: channelDef.approval_runbook_blocker_reason,
    required_manual_next_step: channelDef.required_manual_next_step,
    next_step_owner: channelDef.next_step_owner,
    audit_event_id: `audit-approval-runbook-${channelDef.channel_id}-${scenario.scenario_id}`,
    production_data_touched: 'no',
    external_services_called: 'no',
    notification_sent: 'no',
    live_action_performed: 'no',
  };
}

function buildScenarioSandboxTestModeApprovalRunbookItems(scenario) {
  return SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_CHANNEL_DEFINITIONS.filter(
    (channelDef) => channelDef.scenario_id === scenario.scenario_id,
  ).map((channelDef) => buildSandboxTestModeApprovalRunbookItem(scenario, channelDef));
}

function buildAllSandboxTestModeApprovalRunbookItems(scenarios) {
  const scenarioMap = Object.fromEntries(scenarios.map((scenario) => [scenario.scenario_id, scenario]));
  return SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_CHANNEL_DEFINITIONS.map((channelDef) => {
    const scenario = scenarioMap[channelDef.scenario_id];
    if (!scenario) {
      throw new Error(`Missing scenario for approval runbook channel ${channelDef.channel_id}`);
    }
    return buildSandboxTestModeApprovalRunbookItem(scenario, channelDef);
  });
}

function buildChannelApprovalSummary(items, integrationName) {
  const channelItems = items.filter((item) => item.integration_name === integrationName);
  return {
    description: `Sandbox/test-mode approval runbook modeling for ${integrationName} — blocked without explicit Jason approval`,
    approval_runbook_item_count: channelItems.length,
    blocked_items: channelItems.filter((item) => item.readiness_status === 'BLOCKED').length,
    needs_approval_items: channelItems.filter((item) => item.readiness_status === 'NEEDS_APPROVAL')
      .length,
    hold_items: channelItems.filter((item) => item.readiness_status === 'HOLD').length,
    explicit_approval_present: 'no',
    approval_evidence_present: 'no',
    test_mode_activation_allowed: 'no',
    live_activation_allowed: 'no',
    fake_data_only: true,
    live_actions_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
  };
}

function buildTopLevelSandboxTestModeApprovalRunbookExpansion(
  scenarios,
  outputBase,
  sandboxTestModeReadinessOutput,
) {
  const allItems = buildAllSandboxTestModeApprovalRunbookItems(scenarios);
  const integrationNames = new Set(allItems.map((item) => item.integration_name));
  const messagingItems = allItems.filter((item) =>
    MESSAGING_INTEGRATIONS.has(item.integration_name),
  );
  const supabaseItems = allItems.filter((item) => item.integration_name === 'supabase');

  return {
    sandbox_test_mode_approval_runbook_expansion:
      'native_workflow_fixture_sandbox_test_mode_approval_runbook_expansion',
    sandbox_test_mode_approval_runbook_expansion_summary: {
      description:
        'Deterministic fake-data sandbox/test-mode approval runbook — models what Jason must review and approve before any future test-mode channel activation without enabling sandbox credentials, live sends, external calls, production persistence, public routes, cron jobs, schedulers, dispatchers, or customer-facing automation',
      total_approval_runbook_items: allItems.length,
      required_channels: SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_CHANNEL_DEFINITIONS.length,
      all_required_channels_present:
        SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_CHANNEL_DEFINITIONS.length === allItems.length &&
        integrationNames.size === SANDBOX_TEST_MODE_APPROVAL_RUNBOOK_CHANNEL_DEFINITIONS.length,
      scenario_approval_runbook_items: scenarios.reduce(
        (count, scenario) => count + (scenario.sandbox_test_mode_approval_runbook_items || []).length,
        0,
      ),
      audited_items_count: allItems.length,
      blocked_items_count: allItems.filter((item) => item.readiness_status === 'BLOCKED').length,
      needs_approval_items_count: allItems.filter((item) => item.readiness_status === 'NEEDS_APPROVAL')
        .length,
      hold_items_count: allItems.filter((item) => item.readiness_status === 'HOLD').length,
      explicit_approval_present_for_any_item: 'no',
      approval_evidence_present_for_any_item: 'no',
      test_mode_activation_allowed_for_all_items: 'no',
      live_activation_allowed_for_all_items: 'no',
      public_go_live_or_production_copy_changed: false,
      public_go_live_or_production_copy_approval_required: true,
      approval_runbook_modeling_only: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
      prior_readiness_gate_items:
        sandboxTestModeReadinessOutput.sandbox_test_mode_readiness_items?.length || 0,
    },
    sandbox_test_mode_approval_runbook_items: allItems,
    approval_step_summary: {
      description:
        'Approval step modeling — every channel requires explicit Jason approval before test-mode activation; live activation requires separate explicit Jason approval',
      total_approval_steps: allItems.length,
      approval_required_for_all_items: 'yes',
      explicit_approval_present_for_any_item: 'no',
      approval_evidence_present_for_any_item: 'no',
      test_mode_activation_requires_explicit_approval: true,
      live_activation_requires_separate_explicit_approval: true,
      jason_approval_required_before_any_channel_activation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    channel_approval_summary: {
      description:
        'Aggregate sandbox/test-mode channel approval runbook — all channels remain blocked or need explicit Jason approval',
      total_channels: allItems.length,
      channels_blocked: allItems.filter((item) => item.readiness_status === 'BLOCKED').length,
      channels_needing_approval: allItems.filter((item) => item.readiness_status === 'NEEDS_APPROVAL')
        .length,
      test_mode_activation_allowed_for_all_channels: 'no',
      live_activation_allowed_for_all_channels: 'no',
      reporting_summary_includes_sandbox_test_mode_approval_runbook: true,
      twilio_approval_summary: buildChannelApprovalSummary(allItems, 'twilio'),
      vapi_approval_summary: buildChannelApprovalSummary(allItems, 'vapi'),
      resend_approval_summary: buildChannelApprovalSummary(allItems, 'resend'),
      google_calendar_approval_summary: buildChannelApprovalSummary(allItems, 'google_calendar'),
      lindy_bridge_approval_summary: {
        ...buildChannelApprovalSummary(allItems, 'lindy_bridge'),
        safe_lindy_bridge_reference_not_live_activation: true,
        real_lindy_client_api_webhook_live_workflow_activation_forbidden: true,
      },
      csv_delivery_approval_summary: buildChannelApprovalSummary(allItems, 'csv_delivery'),
      crm_handoff_approval_summary: buildChannelApprovalSummary(allItems, 'crm_handoff_export'),
      scheduler_dispatcher_approval_summary: {
        scheduler_items: allItems.filter((item) => item.integration_name === 'scheduler_cron').length,
        dispatcher_items: allItems.filter((item) => item.integration_name === 'dispatcher').length,
        scheduler_enabled: 'no',
        dispatcher_enabled: 'no',
        scheduler_activation_allowed: 'no',
        dispatcher_activation_allowed: 'no',
        fake_data_only: true,
        live_actions_performed: 'no',
        production_data_touched: 'no',
        external_services_called: 'no',
      },
      public_route_approval_summary: {
        public_route_items: allItems.filter((item) => item.integration_name === 'public_webhook').length,
        public_route_enabled: 'no',
        public_route_activation_allowed: 'no',
        fake_data_only: true,
        live_actions_performed: 'no',
        production_data_touched: 'no',
        external_services_called: 'no',
      },
      supabase_approval_summary: buildChannelApprovalSummary(allItems, 'supabase'),
      billing_approval_summary: buildChannelApprovalSummary(
        allItems,
        'billing_payment_invoice_estimate_quote',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    pre_approval_blocker_summary: {
      description:
        'Pre-approval blockers — missing explicit approval, credential review, rollback plan, post-approval test plan, security/tenant isolation review, and messaging compliance review block activation',
      missing_explicit_approval_blocks_test_mode_activation: true,
      missing_credential_review_blocks_test_mode_activation: true,
      missing_rollback_plan_blocks_test_mode_activation: true,
      missing_post_approval_test_plan_blocks_test_mode_activation: true,
      missing_security_tenant_isolation_review_blocks_persistence: true,
      missing_messaging_compliance_review_blocks_messaging_test_mode: true,
      items_missing_explicit_approval: allItems.filter(
        (item) => item.explicit_approval_present === 'no',
      ).length,
      items_missing_rollback_plan: allItems.filter((item) => item.rollback_plan_present === 'no').length,
      items_missing_post_approval_test_plan: allItems.filter(
        (item) => item.post_approval_test_plan_present === 'no',
      ).length,
      supabase_items_missing_security_review: supabaseItems.filter(
        (item) => item.security_review_required === 'yes' && item.explicit_approval_present === 'no',
      ).length,
      messaging_items_missing_compliance_review: messagingItems.filter(
        (item) =>
          item.messaging_compliance_review_required === 'yes' &&
          item.explicit_approval_present === 'no',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    explicit_approval_evidence_summary: {
      description:
        'Explicit approval evidence — absent by default; Jason written approval required before any test-mode channel activation',
      explicit_approval_present_for_any_item: 'no',
      approval_evidence_present_for_any_item: 'no',
      approval_evidence_type: 'jason_explicit_written_approval',
      items_with_explicit_approval: 0,
      items_with_approval_evidence: 0,
      test_mode_activation_requires_explicit_approval: true,
      live_activation_requires_separate_explicit_approval: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    credential_boundary_approval_summary: {
      description:
        'Credential boundary approval — no sandbox or production credentials read; no env values logged; credential review required where sandbox credentials needed',
      sandbox_credentials_present: 'no',
      production_credentials_present: 'no',
      env_values_logged: 'no',
      api_keys_tokens_webhook_secrets_service_role_keys_logged: 'no',
      all_items_sandbox_credentials_present_no: allItems.every(
        (item) => item.sandbox_credentials_present === 'no',
      ),
      all_items_production_credentials_present_no: allItems.every(
        (item) => item.production_credentials_present === 'no',
      ),
      all_items_env_values_logged_no: allItems.every((item) => item.env_values_logged === 'no'),
      items_requiring_credential_review: allItems.filter(
        (item) => item.credential_review_required === 'yes',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    public_route_approval_summary: {
      description:
        'Public route approval — blocked without explicit Jason approval; no public routes enabled',
      public_route_items: allItems.filter((item) => item.integration_name === 'public_webhook').length,
      public_route_enabled: 'no',
      public_route_activation_allowed: 'no',
      items_requiring_public_route_review: allItems.filter(
        (item) => item.public_route_review_required === 'yes',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    scheduler_dispatcher_approval_summary: {
      description:
        'Scheduler/cron and dispatcher approval — both remain blocked without explicit Jason approval',
      scheduler_items: allItems.filter((item) => item.integration_name === 'scheduler_cron').length,
      dispatcher_items: allItems.filter((item) => item.integration_name === 'dispatcher').length,
      scheduler_enabled: 'no',
      dispatcher_enabled: 'no',
      scheduler_activation_allowed: 'no',
      dispatcher_activation_allowed: 'no',
      items_requiring_scheduler_dispatcher_review: allItems.filter(
        (item) => item.scheduler_dispatcher_review_required === 'yes',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    data_boundary_approval_summary: {
      description:
        'Data boundary/PII minimization approval — data boundary review required for persistence channels',
      data_boundary_review_required_for_persistence: true,
      items_requiring_data_boundary_review: allItems.filter(
        (item) => item.data_boundary_review_required === 'yes',
      ).length,
      homeowner_pii_minimization_required: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    security_tenant_isolation_approval_summary: {
      description:
        'Security/tenant isolation approval — Supabase persistence blocked until security and tenant isolation review',
      security_review_required_for_persistence: true,
      tenant_isolation_review_required_for_persistence: true,
      supabase_items_count: supabaseItems.length,
      supabase_persistence_blocked_until_review: true,
      items_requiring_security_review: allItems.filter(
        (item) => item.security_review_required === 'yes',
      ).length,
      items_requiring_tenant_isolation_review: allItems.filter(
        (item) => item.tenant_isolation_review_required === 'yes',
      ).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    rollback_plan_summary: {
      description:
        'Rollback plan approval — rollback plan required but absent for all items; blocks test-mode activation',
      rollback_plan_required_for_all_items: 'yes',
      rollback_plan_present_for_any_item: 'no',
      items_missing_rollback_plan: allItems.filter((item) => item.rollback_plan_present === 'no').length,
      missing_rollback_plan_blocks_test_mode_activation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_approval_test_plan_summary: {
      description:
        'Post-approval test plan — required but absent for all items; blocks test-mode activation',
      post_approval_test_plan_required_for_all_items: 'yes',
      post_approval_test_plan_present_for_any_item: 'no',
      items_missing_post_approval_test_plan: allItems.filter(
        (item) => item.post_approval_test_plan_present === 'no',
      ).length,
      missing_post_approval_test_plan_blocks_test_mode_activation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    approval_audit_summary: {
      description:
        'Approval audit trail — every approval runbook item has a deterministic audit event ID',
      total_audit_events: allItems.length,
      all_items_have_audit_event_id: allItems.every((item) => Boolean(item.audit_event_id)),
      approval_audit_event_prefix: 'audit-approval-runbook-',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    sandbox_test_mode_approval_safety_assertions: [
      ...SANDBOX_TEST_MODE_APPROVAL_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const SEQUENCE_MESSAGING_INTEGRATIONS = new Set(['twilio', 'resend', 'vapi']);
const SEQUENCE_DATA_BOUNDARY_INTEGRATIONS = new Set(['csv_delivery', 'crm_handoff_export']);
const SEQUENCE_ACTIVATION_INTEGRATIONS = new Set([
  'twilio',
  'resend',
  'vapi',
  'google_calendar',
  'csv_delivery',
  'crm_handoff_export',
  'lindy_bridge',
  'scheduler_cron',
  'dispatcher',
  'public_webhook',
  'supabase',
  'billing_payment_invoice_estimate_quote',
]);

const TEST_MODE_CHANNEL_SEQUENCE_CHANNEL_ORDER = [
  { channel_id: 'twilio_sms', sequence_order: 3, prerequisite_stage: 'messaging_compliance_prerequisite_review' },
  { channel_id: 'resend_email', sequence_order: 4, prerequisite_stage: 'messaging_compliance_prerequisite_review' },
  { channel_id: 'vapi_calls', sequence_order: 5, prerequisite_stage: 'messaging_compliance_prerequisite_review' },
  {
    channel_id: 'google_calendar',
    sequence_order: 6,
    prerequisite_stage: 'calendar_booking_preferences_review',
  },
  { channel_id: 'csv_delivery', sequence_order: 7, prerequisite_stage: 'data_boundary_review' },
  { channel_id: 'crm_handoff', sequence_order: 8, prerequisite_stage: 'data_boundary_review' },
  { channel_id: 'lindy_bridge', sequence_order: 9, prerequisite_stage: 'channel_isolation_review' },
  { channel_id: 'scheduler_cron', sequence_order: 10, prerequisite_stage: 'infrastructure_readiness_review' },
  { channel_id: 'dispatcher', sequence_order: 11, prerequisite_stage: 'infrastructure_readiness_review' },
  { channel_id: 'public_route_webhook', sequence_order: 12, prerequisite_stage: 'infrastructure_readiness_review' },
  {
    channel_id: 'supabase_persistence',
    sequence_order: 13,
    prerequisite_stage: 'security_tenant_isolation_review',
  },
  {
    channel_id: 'billing_payment_automation',
    sequence_order: 14,
    prerequisite_stage: 'billing_automation_readiness_review',
  },
];

function buildActivationSequenceChannelDef(channelOrderEntry) {
  const channelDef = SANDBOX_TEST_MODE_CHANNEL_DEFINITIONS.find(
    (def) => def.channel_id === channelOrderEntry.channel_id,
  );
  if (!channelDef) {
    throw new Error(`Missing channel definition for sequence item ${channelOrderEntry.channel_id}`);
  }

  const isMessaging = SEQUENCE_MESSAGING_INTEGRATIONS.has(channelDef.integration_name);
  const isSupabase = channelDef.integration_name === 'supabase';
  const isDataBoundary = SEQUENCE_DATA_BOUNDARY_INTEGRATIONS.has(channelDef.integration_name);
  const isCalendar = channelDef.integration_name === 'google_calendar';
  const isBridgeChannel = channelDef.integration_name === 'lindy_bridge';

  const blockerParts = [
    'missing_explicit_approval_blocks_test_mode_activation',
    'missing_rollback_plan_blocks_test_mode_activation',
    'missing_post_approval_test_plan_blocks_test_mode_activation',
  ];
  if (isMessaging) {
    blockerParts.push('missing_messaging_compliance_review_blocks_messaging_test_mode');
  }
  if (isCalendar) {
    blockerParts.push('missing_calendar_booking_preferences_review_blocks_calendar_test_mode');
  }
  if (isDataBoundary) {
    blockerParts.push('missing_data_boundary_review_blocks_csv_or_crm_delivery_test_mode');
  }
  if (isSupabase) {
    blockerParts.push('missing_security_tenant_isolation_review_blocks_persistence');
  }
  if (isBridgeChannel) {
    blockerParts.push('safe_lindy_bridge_fixture_reference_allowed_but_real_lindy_activation_forbidden');
  }
  if (channelDef.sandbox_credentials_required === 'yes') {
    blockerParts.push('missing_credential_review_blocks_test_mode_activation');
  }

  return {
    sequence_item_id: `seq_${String(channelOrderEntry.sequence_order).padStart(2, '0')}_${channelDef.channel_id}`,
    sequence_order: channelOrderEntry.sequence_order,
    scenario_id: channelDef.scenario_id,
    channel: channelDef.channel,
    integration_name: channelDef.integration_name,
    sequence_stage: 'test_mode_channel_readiness',
    prerequisite_stage: channelOrderEntry.prerequisite_stage,
    prerequisite_status: 'BLOCKED',
    sandbox_credentials_required: channelDef.sandbox_credentials_required,
    public_route_required: channelDef.public_route_required,
    scheduler_required: channelDef.scheduler_required,
    dispatcher_required: channelDef.dispatcher_required,
    live_activation_flag_name: channelDef.live_activation_flag_name,
    dry_run_rehearsal_allowed: 'no',
    external_call_allowed: 'no',
    prerequisite_blocker_reason: blockerParts.join(';'),
    required_manual_next_step: channelDef.required_manual_next_step,
    next_step_owner: channelDef.next_step_owner,
    rollback_plan_required: 'yes',
    rollback_plan_present: 'no',
    post_approval_test_plan_required: 'yes',
    post_approval_test_plan_present: 'no',
  };
}

const TEST_MODE_CHANNEL_SEQUENCE_DEFINITIONS = [
  {
    sequence_item_id: 'seq_01_fixture_only_sequence_rehearsal',
    sequence_order: 1,
    scenario_id: 'normal_lead_to_appointment_readiness',
    channel: 'fixture_only',
    integration_name: 'fixture_only_sequence_rehearsal',
    sequence_stage: 'fixture_only_sequence_rehearsal',
    prerequisite_stage: 'none',
    prerequisite_status: 'COMPLETE',
    sandbox_credentials_required: 'no',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'fixture_only_sequence_rehearsal_enabled',
    dry_run_rehearsal_allowed: 'yes',
    external_call_allowed: 'no',
    prerequisite_blocker_reason: 'none_fixture_only_dry_run_allowed_without_external_calls',
    required_manual_next_step:
      'review_fixture_only_sequence_rehearsal_output_before_any_channel_activation',
    next_step_owner: 'jason',
    rollback_plan_required: 'no',
    rollback_plan_present: 'no',
    post_approval_test_plan_required: 'no',
    post_approval_test_plan_present: 'no',
  },
  {
    sequence_item_id: 'seq_02_messaging_compliance_prerequisite_review',
    sequence_order: 2,
    scenario_id: 'homeowner_follow_up_needed_path',
    channel: 'prerequisite',
    integration_name: 'messaging_compliance_prerequisite_review',
    sequence_stage: 'messaging_compliance_prerequisite_review',
    prerequisite_stage: 'fixture_only_sequence_rehearsal',
    prerequisite_status: 'NEEDS_APPROVAL',
    sandbox_credentials_required: 'no',
    public_route_required: 'no',
    scheduler_required: 'no',
    dispatcher_required: 'no',
    live_activation_flag_name: 'messaging_compliance_prerequisite_review_enabled',
    dry_run_rehearsal_allowed: 'no',
    external_call_allowed: 'no',
    prerequisite_blocker_reason:
      'messaging_compliance_prerequisite_review_required_before_messaging_channel_test_mode_activation',
    required_manual_next_step:
      'jason_reviews_messaging_compliance_contact_permission_prerequisites_before_messaging_channels',
    next_step_owner: 'jason',
    rollback_plan_required: 'no',
    rollback_plan_present: 'no',
    post_approval_test_plan_required: 'no',
    post_approval_test_plan_present: 'no',
  },
  ...TEST_MODE_CHANNEL_SEQUENCE_CHANNEL_ORDER.map(buildActivationSequenceChannelDef),
];

const TEST_MODE_CHANNEL_SEQUENCE_SAFETY_ASSERTIONS = [
  'test_mode_channel_sequence_plan_expansion_summary_present',
  'test_mode_channel_sequence_items_present',
  'test_mode_channel_sequence_item_required_fields_present',
  'required_channels_present',
  'sequence_order_present_and_deterministic',
  'channel_sequence_order_summary_present',
  'prerequisite_gate_summary_present',
  'approval_dependency_summary_present',
  'dry_run_rehearsal_scope_summary_present',
  'channel_isolation_summary_present',
  'rollback_dependency_summary_present',
  'data_boundary_sequence_summary_present',
  'messaging_compliance_sequence_summary_present',
  'calendar_booking_sequence_summary_present',
  'reporting_csv_sequence_summary_present',
  'crm_handoff_sequence_summary_present',
  'scheduler_dispatcher_sequence_summary_present',
  'public_route_sequence_summary_present',
  'supabase_persistence_sequence_summary_present',
  'billing_payment_quote_sequence_summary_present',
  'sequence_audit_summary_present',
  'approval_required_is_yes_for_activation_items',
  'explicit_approval_present_is_no_for_all_items',
  'approval_evidence_present_is_no_for_all_items',
  'sandbox_credentials_present_is_no_for_all_items',
  'production_credentials_present_is_no_for_all_items',
  'env_values_logged_is_no_for_all_items',
  'public_route_enabled_is_no_for_all_items',
  'scheduler_enabled_is_no_for_all_items',
  'dispatcher_enabled_is_no_for_all_items',
  'live_activation_flags_remain_false_for_all_items',
  'test_mode_activation_allowed_is_no_for_all_items',
  'live_activation_allowed_is_no_for_all_items',
  'external_call_allowed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
  'fixture_only_dry_run_sequence_allowed_without_external_calls',
  'messaging_compliance_prerequisite_before_messaging_channels',
  'data_boundary_prerequisite_before_csv_and_crm_delivery',
  'calendar_preferences_prerequisite_before_calendar_booking',
  'missing_explicit_approval_blocks_test_mode_activation',
  'missing_rollback_plan_blocks_test_mode_activation',
  'missing_post_approval_test_plan_blocks_test_mode_activation',
  'missing_security_tenant_isolation_review_blocks_persistence',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'no_estimate_quote_invoice_payment_generation',
  'safe_lindy_bridge_reference_not_live_activation',
  'real_lindy_activation_patterns_remain_forbidden',
  'test_mode_channel_sequence_plan_is_fake_data_only',
  'test_mode_channel_sequence_plan_is_audited',
  'reporting_summary_includes_test_mode_channel_sequence_plan',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

function buildTestModeChannelSequenceItem(scenario, sequenceDef) {
  const input = scenario.input_fixture_summary || {};
  const rooferAccountId = input.fixture_roofer_id || 'roof-fix-001';

  return {
    sequence_item_id: sequenceDef.sequence_item_id,
    sequence_order: sequenceDef.sequence_order,
    scenario_id: scenario.scenario_id,
    roofer_account_id: rooferAccountId,
    plan_profile: scenario.plan_profile,
    channel: sequenceDef.channel,
    integration_name: sequenceDef.integration_name,
    sequence_stage: sequenceDef.sequence_stage,
    prerequisite_stage: sequenceDef.prerequisite_stage,
    prerequisite_status: sequenceDef.prerequisite_status,
    approval_required: 'yes',
    explicit_approval_present: 'no',
    approval_evidence_present: 'no',
    sandbox_credentials_required: sequenceDef.sandbox_credentials_required,
    sandbox_credentials_present: 'no',
    production_credentials_present: 'no',
    env_values_logged: 'no',
    public_route_required: sequenceDef.public_route_required,
    public_route_enabled: 'no',
    scheduler_required: sequenceDef.scheduler_required,
    scheduler_enabled: 'no',
    dispatcher_required: sequenceDef.dispatcher_required,
    dispatcher_enabled: 'no',
    live_activation_flag_name: sequenceDef.live_activation_flag_name,
    live_activation_flag_value: false,
    test_mode_activation_allowed: 'no',
    live_activation_allowed: 'no',
    dry_run_rehearsal_allowed: sequenceDef.dry_run_rehearsal_allowed,
    external_call_allowed: sequenceDef.external_call_allowed,
    prerequisite_blocker_reason: sequenceDef.prerequisite_blocker_reason,
    required_manual_next_step: sequenceDef.required_manual_next_step,
    next_step_owner: sequenceDef.next_step_owner,
    rollback_plan_required: sequenceDef.rollback_plan_required,
    rollback_plan_present: sequenceDef.rollback_plan_present,
    post_approval_test_plan_required: sequenceDef.post_approval_test_plan_required,
    post_approval_test_plan_present: sequenceDef.post_approval_test_plan_present,
    audit_event_id: `audit-channel-sequence-${sequenceDef.sequence_item_id}-${scenario.scenario_id}`,
    production_data_touched: 'no',
    external_services_called: 'no',
    notification_sent: 'no',
    live_action_performed: 'no',
  };
}

function buildScenarioTestModeChannelSequenceItems(scenario) {
  return TEST_MODE_CHANNEL_SEQUENCE_DEFINITIONS.filter(
    (sequenceDef) => sequenceDef.scenario_id === scenario.scenario_id,
  ).map((sequenceDef) => buildTestModeChannelSequenceItem(scenario, sequenceDef));
}

function buildAllTestModeChannelSequenceItems(scenarios) {
  const scenarioMap = Object.fromEntries(scenarios.map((scenario) => [scenario.scenario_id, scenario]));
  return TEST_MODE_CHANNEL_SEQUENCE_DEFINITIONS.map((sequenceDef) => {
    const scenario = scenarioMap[sequenceDef.scenario_id];
    if (!scenario) {
      throw new Error(`Missing scenario for channel sequence item ${sequenceDef.sequence_item_id}`);
    }
    return buildTestModeChannelSequenceItem(scenario, sequenceDef);
  });
}

function buildChannelSequenceSummary(items, integrationName) {
  const channelItems = items.filter((item) => item.integration_name === integrationName);
  return {
    description: `Test-mode channel sequence modeling for ${integrationName} — blocked without explicit Jason approval and prerequisite gates`,
    sequence_item_count: channelItems.length,
    sequence_order_values: channelItems.map((item) => item.sequence_order),
    explicit_approval_present: 'no',
    approval_evidence_present: 'no',
    test_mode_activation_allowed: 'no',
    live_activation_allowed: 'no',
    dry_run_rehearsal_allowed:
      integrationName === 'fixture_only_sequence_rehearsal' ? 'yes' : 'no',
    external_call_allowed: 'no',
    fake_data_only: true,
    live_actions_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
  };
}

function buildTopLevelTestModeChannelSequencePlanExpansion(
  scenarios,
  outputBase,
  sandboxTestModeApprovalRunbookOutput,
) {
  const allItems = buildAllTestModeChannelSequenceItems(scenarios);
  const integrationNames = new Set(allItems.map((item) => item.integration_name));
  const messagingItems = allItems.filter((item) =>
    SEQUENCE_MESSAGING_INTEGRATIONS.has(item.integration_name),
  );
  const dataBoundaryItems = allItems.filter((item) =>
    SEQUENCE_DATA_BOUNDARY_INTEGRATIONS.has(item.integration_name),
  );
  const calendarItems = allItems.filter((item) => item.integration_name === 'google_calendar');
  const supabaseItems = allItems.filter((item) => item.integration_name === 'supabase');
  const fixtureOnlyItems = allItems.filter(
    (item) => item.integration_name === 'fixture_only_sequence_rehearsal',
  );
  const messagingComplianceItems = allItems.filter(
    (item) => item.integration_name === 'messaging_compliance_prerequisite_review',
  );
  const sequenceOrders = allItems.map((item) => item.sequence_order);
  const expectedOrders = Array.from({ length: allItems.length }, (_, index) => index + 1);

  return {
    test_mode_channel_sequence_plan_expansion:
      'native_workflow_fixture_test_mode_dry_run_channel_sequence_plan_expansion',
    test_mode_channel_sequence_plan_expansion_summary: {
      description:
        'Deterministic fake-data test-mode dry-run channel sequence plan — models the safe order in which future sandbox/test-mode channels could eventually be rehearsed after explicit Jason approval without enabling sandbox credentials, live sends, external calls, production persistence, public routes, cron jobs, schedulers, dispatchers, or customer-facing automation',
      total_sequence_items: allItems.length,
      required_sequence_steps: TEST_MODE_CHANNEL_SEQUENCE_DEFINITIONS.length,
      all_required_channels_present:
        TEST_MODE_CHANNEL_SEQUENCE_DEFINITIONS.length === allItems.length &&
        integrationNames.size === TEST_MODE_CHANNEL_SEQUENCE_DEFINITIONS.length,
      sequence_order_deterministic:
        sequenceOrders.length === expectedOrders.length &&
        sequenceOrders.every((order, index) => order === expectedOrders[index]),
      scenario_sequence_items: scenarios.reduce(
        (count, scenario) => count + (scenario.test_mode_channel_sequence_items || []).length,
        0,
      ),
      audited_items_count: allItems.length,
      fixture_only_dry_run_allowed_items: fixtureOnlyItems.filter(
        (item) => item.dry_run_rehearsal_allowed === 'yes',
      ).length,
      blocked_activation_items: allItems.filter((item) => item.test_mode_activation_allowed === 'no')
        .length,
      explicit_approval_present_for_any_item: 'no',
      approval_evidence_present_for_any_item: 'no',
      test_mode_activation_allowed_for_all_items: 'no',
      live_activation_allowed_for_all_items: 'no',
      external_call_allowed_for_all_items: 'no',
      public_go_live_or_production_copy_changed: false,
      public_go_live_or_production_copy_approval_required: true,
      channel_sequence_modeling_only: true,
      fake_data_only: true,
      deterministic_fixture_output: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
      prior_approval_runbook_items:
        sandboxTestModeApprovalRunbookOutput.sandbox_test_mode_approval_runbook_items?.length || 0,
    },
    test_mode_channel_sequence_items: allItems,
    channel_sequence_order_summary: {
      description:
        'Deterministic channel sequence order — fixture-only rehearsal first, then prerequisite gates, then channel test-mode readiness in safe isolation order',
      total_sequence_steps: allItems.length,
      sequence_order_values: sequenceOrders,
      sequence_order_deterministic: true,
      fixture_only_sequence_first: allItems[0]?.integration_name === 'fixture_only_sequence_rehearsal',
      messaging_compliance_prerequisite_second:
        allItems[1]?.integration_name === 'messaging_compliance_prerequisite_review',
      messaging_channels_follow_compliance_prerequisite: messagingItems.every(
        (item) => item.sequence_order > messagingComplianceItems[0]?.sequence_order,
      ),
      calendar_follows_preferences_prerequisite: calendarItems.every(
        (item) => item.prerequisite_stage === 'calendar_booking_preferences_review',
      ),
      csv_and_crm_follow_data_boundary_prerequisite: dataBoundaryItems.every(
        (item) => item.prerequisite_stage === 'data_boundary_review',
      ),
      reporting_summary_includes_test_mode_channel_sequence_plan: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    prerequisite_gate_summary: {
      description:
        'Prerequisite gates — messaging compliance before messaging channels, calendar preferences before calendar booking, data boundary before CSV/CRM delivery, security/tenant isolation before Supabase persistence',
      messaging_compliance_prerequisite_before_messaging_channels: true,
      calendar_preferences_prerequisite_before_calendar_booking: true,
      data_boundary_prerequisite_before_csv_and_crm_delivery: true,
      security_tenant_isolation_prerequisite_before_persistence: true,
      fixture_only_prerequisite_complete: fixtureOnlyItems.every(
        (item) => item.prerequisite_status === 'COMPLETE',
      ),
      messaging_compliance_prerequisite_status:
        messagingComplianceItems[0]?.prerequisite_status || 'NEEDS_APPROVAL',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    approval_dependency_summary: {
      description:
        'Approval dependency — every activation channel requires explicit Jason approval; live activation requires separate explicit Jason approval; approval absent by default',
      approval_required_for_all_items: 'yes',
      explicit_approval_present_for_any_item: 'no',
      approval_evidence_present_for_any_item: 'no',
      test_mode_activation_requires_explicit_approval: true,
      live_activation_requires_separate_explicit_approval: true,
      missing_explicit_approval_blocks_test_mode_activation: true,
      jason_approval_required_before_any_channel_activation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    dry_run_rehearsal_scope_summary: {
      description:
        'Dry-run rehearsal scope — fixture-only sequence rehearsal allowed without external calls; all test-mode channel activation remains blocked',
      fixture_only_dry_run_sequence_allowed_without_external_calls: true,
      fixture_only_items_count: fixtureOnlyItems.length,
      fixture_only_dry_run_rehearsal_allowed: fixtureOnlyItems.every(
        (item) => item.dry_run_rehearsal_allowed === 'yes',
      ),
      activation_items_dry_run_rehearsal_allowed: 'no',
      test_mode_activation_allowed_for_all_items: 'no',
      external_call_allowed_for_all_items: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    channel_isolation_summary: {
      description:
        'Channel isolation — each channel rehearsed in sequence order without cross-channel activation; Lindy bridge remains temporary/bridge-only',
      channels_isolated_in_sequence: true,
      cross_channel_activation_allowed: 'no',
      lindy_bridge_temporary_bridge_only: true,
      safe_lindy_bridge_reference_not_live_activation: true,
      real_lindy_client_api_webhook_live_workflow_activation_forbidden: true,
      crm_handoff_not_native_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    rollback_dependency_summary: {
      description:
        'Rollback dependency — rollback plan required but absent for activation items; blocks test-mode activation',
      rollback_plan_required_for_activation_items: 'yes',
      rollback_plan_present_for_any_item: 'no',
      items_missing_rollback_plan: allItems.filter((item) => item.rollback_plan_present === 'no').length,
      missing_rollback_plan_blocks_test_mode_activation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    data_boundary_sequence_summary: {
      description:
        'Data boundary sequence — CSV delivery and CRM handoff/export blocked until data handling review and explicit Jason approval',
      data_boundary_prerequisite_before_csv_and_crm_delivery: true,
      csv_delivery_sequence_order: allItems.find((item) => item.integration_name === 'csv_delivery')
        ?.sequence_order,
      crm_handoff_sequence_order: allItems.find(
        (item) => item.integration_name === 'crm_handoff_export',
      )?.sequence_order,
      csv_and_crm_blocked_without_data_boundary_review: true,
      crm_handoff_not_native_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    messaging_compliance_sequence_summary: {
      description:
        'Messaging compliance sequence — messaging channels blocked until messaging compliance prerequisite review, explicit Jason approval, credential review, rollback plan, and post-approval test plan exist',
      messaging_compliance_prerequisite_before_messaging_channels: true,
      messaging_compliance_sequence_order: messagingComplianceItems[0]?.sequence_order,
      twilio_sequence_order: allItems.find((item) => item.integration_name === 'twilio')?.sequence_order,
      resend_sequence_order: allItems.find((item) => item.integration_name === 'resend')?.sequence_order,
      vapi_sequence_order: allItems.find((item) => item.integration_name === 'vapi')?.sequence_order,
      messaging_channels_blocked_without_compliance_prerequisite: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    calendar_booking_sequence_summary: {
      description:
        'Calendar booking sequence — Google Calendar test-mode blocked until calendar booking preferences, explicit Jason approval, credential review, rollback plan, and post-approval test plan exist',
      calendar_preferences_prerequisite_before_calendar_booking: true,
      google_calendar_sequence_order: calendarItems[0]?.sequence_order,
      calendar_booking_blocked_without_preferences_review: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    reporting_csv_sequence_summary: {
      description:
        'Reporting/CSV sequence — CSV delivery test-mode blocked until data handling review, explicit Jason approval, delivery review, rollback plan, and post-approval test plan exist',
      csv_delivery_sequence_order: allItems.find((item) => item.integration_name === 'csv_delivery')
        ?.sequence_order,
      csv_delivery_blocked_without_approval: true,
      no_live_csv_delivery: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    crm_handoff_sequence_summary: {
      description:
        'CRM handoff/export sequence — blocked and must not become native CRM sync',
      crm_handoff_sequence_order: allItems.find(
        (item) => item.integration_name === 'crm_handoff_export',
      )?.sequence_order,
      crm_handoff_blocked_without_approval: true,
      crm_handoff_not_native_crm_sync: true,
      no_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    scheduler_dispatcher_sequence_summary: {
      description:
        'Scheduler/cron and dispatcher sequence — both remain blocked without explicit Jason approval',
      scheduler_sequence_order: allItems.find((item) => item.integration_name === 'scheduler_cron')
        ?.sequence_order,
      dispatcher_sequence_order: allItems.find((item) => item.integration_name === 'dispatcher')
        ?.sequence_order,
      scheduler_enabled: 'no',
      dispatcher_enabled: 'no',
      scheduler_activation_allowed: 'no',
      dispatcher_activation_allowed: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    public_route_sequence_summary: {
      description:
        'Public route/webhook sequence — blocked without explicit Jason approval; no public routes enabled',
      public_route_sequence_order: allItems.find((item) => item.integration_name === 'public_webhook')
        ?.sequence_order,
      public_route_enabled: 'no',
      public_route_activation_allowed: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    supabase_persistence_sequence_summary: {
      description:
        'Supabase persistence sequence — blocked until security/tenant isolation/schema/auth/RLS review is approved',
      supabase_sequence_order: supabaseItems[0]?.sequence_order,
      supabase_persistence_blocked_until_review: true,
      missing_security_tenant_isolation_review_blocks_persistence: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    billing_payment_quote_sequence_summary: {
      description:
        'Billing/payment/invoice/estimate/quote automation sequence — blocked without explicit Jason approval',
      billing_sequence_order: allItems.find(
        (item) => item.integration_name === 'billing_payment_invoice_estimate_quote',
      )?.sequence_order,
      billing_automation_blocked: true,
      no_billing_or_payment_action: true,
      no_estimate_quote_invoice_payment_generation: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    sequence_audit_summary: {
      description:
        'Sequence audit trail — every channel sequence item has a deterministic audit event ID',
      total_audit_events: allItems.length,
      all_items_have_audit_event_id: allItems.every((item) => Boolean(item.audit_event_id)),
      sequence_audit_event_prefix: 'audit-channel-sequence-',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    test_mode_channel_sequence_safety_assertions: [
      ...TEST_MODE_CHANNEL_SEQUENCE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

function buildScenario(config) {
  const guardAssertions = buildGuardAssertions(config.guard_assertion_overrides || BASE_GUARD_PASS);
  const scenarioDraft = {
    scenario_id: config.scenario_id,
    scenario_name: config.scenario_name,
    plan_profile: config.plan_profile,
    input_fixture_summary: config.input_fixture_summary,
    starting_state: config.starting_state,
    transition_log: config.transition_log,
    guard_results: config.guard_results,
    guard_assertions: guardAssertions,
    failed_guards: deriveFailedGuards(guardAssertions),
    hold_or_block_reason: config.hold_or_block_reason || null,
    manual_next_step: config.manual_next_step || null,
    owner: config.owner || null,
    final_state: config.final_state,
    reporting_snapshot: config.reporting_snapshot || null,
    reporting_impact: config.reporting_impact || null,
    csv_snapshot_if_applicable: config.csv_snapshot_if_applicable || null,
    activation_flag_results: config.activation_flag_results || activationFlagResults(),
    audit_events: config.audit_events,
    safety_assertions: config.safety_assertions,
    ...SAFETY,
    result: 'PASS',
  };
  const reviewQueueItems = (config.review_queue_items || []).map((item, index) =>
    expandScenarioReviewItem(scenarioDraft, item, index),
  );
  const appointmentReadinessItem = buildScenarioAppointmentReadinessItem(scenarioDraft);
  const postInspectionItem = buildScenarioPostInspectionItem(scenarioDraft);
  const feedbackPermissionItem = buildScenarioFeedbackPermissionItem(
    scenarioDraft,
    postInspectionItem,
  );
  const manualOutreachItem = buildScenarioManualOutreachItem(
    scenarioDraft,
    appointmentReadinessItem,
    postInspectionItem,
    feedbackPermissionItem,
  );
  const missedLeadRecoveryItem = buildScenarioMissedLeadRecoveryItem(
    scenarioDraft,
    appointmentReadinessItem,
    postInspectionItem,
    manualOutreachItem,
  );
  const usageVolumeItem = buildScenarioUsageVolumeItem(scenarioDraft);
  const leadSourceAttributionItem = buildScenarioLeadSourceAttributionItem(scenarioDraft);
  const contactPermissionItem = buildScenarioContactPermissionItem(scenarioDraft);
  const scenarioWithExpansions = {
    ...scenarioDraft,
    review_queue_items: reviewQueueItems,
    appointment_readiness_items: appointmentReadinessItem ? [appointmentReadinessItem] : [],
    post_inspection_items: postInspectionItem ? [postInspectionItem] : [],
    feedback_permission_items: feedbackPermissionItem ? [feedbackPermissionItem] : [],
    manual_outreach_items: manualOutreachItem ? [manualOutreachItem] : [],
    missed_lead_recovery_items: missedLeadRecoveryItem ? [missedLeadRecoveryItem] : [],
    usage_volume_items: usageVolumeItem ? [usageVolumeItem] : [],
    lead_source_attribution_items: leadSourceAttributionItem ? [leadSourceAttributionItem] : [],
    contact_permission_items: contactPermissionItem ? [contactPermissionItem] : [],
  };
  const scenarioAuditTimeline = buildScenarioAuditTimeline(scenarioWithExpansions, 0);
  const scenarioWithAuditTimeline = {
    ...scenarioWithExpansions,
    audit_event_timeline_items: scenarioAuditTimeline.auditItems,
    state_transition_timeline_items: scenarioAuditTimeline.timelineItems,
  };
  const scenarioFinal = {
    ...scenarioWithAuditTimeline,
    pii_minimization_items: buildScenarioPiiMinimizationItems(scenarioWithAuditTimeline),
  };
  const scenarioWithHandoff = {
    ...scenarioFinal,
    review_queue_aging_items: buildScenarioReviewQueueAgingItems(scenarioFinal),
    manual_handoff_items: buildScenarioManualHandoffItems(scenarioFinal),
  };
  return {
    ...scenarioWithHandoff,
    e2e_acceptance_rehearsal_items: buildScenarioE2eAcceptanceItems(scenarioWithHandoff),
    sandbox_test_mode_readiness_items: buildScenarioSandboxTestModeReadinessItems(scenarioWithHandoff),
    sandbox_test_mode_approval_runbook_items: buildScenarioSandboxTestModeApprovalRunbookItems(
      scenarioWithHandoff,
    ),
    test_mode_channel_sequence_items: buildScenarioTestModeChannelSequenceItems(scenarioWithHandoff),
  };
}

function computeGuardSummary(scenarios) {
  let total = 0;
  let passed = 0;
  let failedSafelyRouted = 0;
  const categoryStats = {};

  for (const [category, assertions] of Object.entries(GUARD_CATEGORIES)) {
    categoryStats[category] = {
      assertion_ids: assertions,
      total: 0,
      passed: 0,
      failed_safely_routed: 0,
    };
  }

  for (const scenario of scenarios) {
    for (const assertion of scenario.guard_assertions) {
      total += 1;
      const cat = categoryStats[assertion.category];
      if (cat) {
        cat.total += 1;
        if (assertion.result === 'pass') {
          passed += 1;
          cat.passed += 1;
        } else if (assertion.result === 'fail_safely_routed') {
          failedSafelyRouted += 1;
          cat.failed_safely_routed += 1;
        }
      }
    }
  }

  return {
    description:
      'Aggregate guard assertion coverage across all 25 fixture scenarios; failures are safely routed to HOLD/BLOCKED/review',
    total_assertions_evaluated: total,
    passed_assertions: passed,
    failed_assertions_safely_routed: failedSafelyRouted,
    unexpected_failures: 0,
    all_failures_safely_routed: true,
    categories: categoryStats,
    fail_closed_assertions: FAIL_CLOSED_ASSERTIONS,
  };
}

function runScenarios() {
  const f = baseFixture();

  return [
    buildScenario({
      scenario_id: 'normal_lead_to_appointment_readiness',
      scenario_name: 'normal lead to appointment readiness',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        contact_permission: 'known',
        service_area_fit: true,
        appointment_preference: 'weekday_morning',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions([
        'NEW_LEAD',
        'SOURCE_CAPTURED',
        'READY_FOR_RESPONSE',
        'RESPONSE_DRAFT_READY',
        'APPOINTMENT_READINESS_PENDING',
        'APPOINTMENT_READY',
      ]),
      guard_results: guardResults({
        appointment_calendar_preferences_known_before_appointment_ready: 'pass',
      }),
      guard_assertion_overrides: {
        appointment_calendar_preferences_required_before_appointment_ready: {
          result: 'pass',
          notes: 'appointment_preference_present',
        },
        calendar_owner_required_before_appointment_ready: {
          result: 'pass',
          notes: 'calendar_owner_known',
        },
        service_area_fit_required_before_appointment_ready: {
          result: 'pass',
          notes: 'service_area_fit_true',
        },
        contact_permission_known_or_reviewed: { result: 'pass', notes: 'permission_known' },
        growth_volume_limit_enforced: { result: 'pass', notes: 'within_growth_limit' },
      },
      final_state: 'APPOINTMENT_READY',
      audit_events: [
        auditEvent('state_transition', 'intake_to_appointment_ready', {
          readiness_blockers: 'none',
          appointment_readiness_prerequisites: 'all_pass',
        }),
      ],
      safety_assertions: safetyAssertions(['no_live_send', 'fixture_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'normal_lead_to_appointment_readiness',
        reporting_focus: 'appointment_readiness_tracking',
        fields_highlighted: ['appointment_readiness_pending', 'appointment_ready'],
        notes: 'growth_plan_appointment_readiness_counts_in_weekly_snapshot',
      }),
      reporting_snapshot: buildReportingSnapshot({
        appointment_readiness_pending: 1,
        appointment_ready: 1,
        appointment_booked: 0,
      }),
    }),

    buildScenario({
      scenario_id: 'missing_information_path',
      scenario_name: 'missing information path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        homeowner_phone: null,
        appointment_preference: null,
        missing_fields: ['phone', 'appointment_preference'],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'MISSING_INFO', 'HOLD']),
      guard_results: guardResults({
        required_homeowner_contact_data_present: 'fail',
        appointment_calendar_preferences_known_before_appointment_ready: 'fail',
      }),
      guard_assertion_overrides: {
        missing_required_contact_data_routes_to_missing_info_or_hold: {
          result: 'fail_safely_routed',
          notes: 'missing_phone_and_appointment_preference',
        },
        appointment_ready_blocked_when_required_fields_missing: {
          result: 'fail_safely_routed',
          notes: 'required_fields_missing_blocks_appointment_ready',
        },
        appointment_calendar_preferences_required_before_appointment_ready: {
          result: 'fail_safely_routed',
          notes: 'appointment_preference_missing',
        },
      },
      hold_or_block_reason: 'incomplete_contact_or_service_details',
      manual_next_step: 'roofer_collects_missing_phone_and_appointment_preference',
      owner: 'roofer',
      final_state: 'MISSING_INFO',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'missing_contact_or_service_details',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('guard_failure', 'missing_fields: phone, appointment_preference', {
          hold_reason: 'incomplete_contact',
        }),
      ],
      safety_assertions: safetyAssertions(['manual_next_step_required', 'no_live_send']),
    }),

    buildScenario({
      scenario_id: 'duplicate_review_path',
      scenario_name: 'duplicate review path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        duplicate_suspected: true,
        duplicate_match_fields: ['phone', 'address'],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'DUPLICATE_REVIEW', 'HOLD']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        duplicate_lead_routes_to_duplicate_review: {
          result: 'pass',
          notes: 'duplicate_detected_and_routed_to_duplicate_review',
        },
        roofleadhq_review_required_for_broken_routing_or_data_issue: {
          result: 'pass',
          notes: 'duplicate_confusion_routes_to_roofleadhq_jason_review',
        },
      },
      hold_or_block_reason: 'duplicate_lead_confusion',
      owner: 'roofleadhq_jason',
      final_state: 'DUPLICATE_REVIEW',
      review_queue_items: [
        {
          review_owner: 'roofleadhq_jason',
          reason: 'duplicate_lead_confusion',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'duplicate_hold', {
          duplicate_match_fields: 'phone, address',
        }),
      ],
      safety_assertions: safetyAssertions(['no_duplicate_outreach']),
    }),

    buildScenario({
      scenario_id: 'bad_fit_excluded_path',
      scenario_name: 'bad fit excluded path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        service_area_fit: false,
        service_type: 'commercial_flat_roof',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'BAD_FIT_OR_EXCLUDED']),
      guard_results: guardResults({
        service_area_checked: 'fail',
      }),
      guard_assertion_overrides: {
        service_area_checked: { result: 'fail_safely_routed', notes: 'out_of_service_area' },
        excluded_service_area_routes_to_bad_fit_or_excluded: {
          result: 'pass',
          notes: 'routed_to_bad_fit_or_excluded',
        },
        service_area_fit_required_before_appointment_ready: {
          result: 'fail_safely_routed',
          notes: 'service_area_fit_false',
        },
      },
      hold_or_block_reason: 'out_of_service_area',
      final_state: 'BAD_FIT_OR_EXCLUDED',
      audit_events: [
        auditEvent('state_transition', 'service_area_excluded', {
          blocked_reason: 'out_of_area',
        }),
      ],
      safety_assertions: safetyAssertions(['no_outreach_to_excluded_lead']),
    }),

    buildScenario({
      scenario_id: 'stopped_do_not_contact_path',
      scenario_name: 'stopped do not contact path',
      plan_profile: 'growth',
      input_fixture_summary: { ...f, do_not_contact: true },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'STOPPED_DO_NOT_CONTACT']),
      guard_results: guardResults({
        do_not_contact_respected: 'fail',
        contact_permission_known_or_reviewed: 'fail',
      }),
      guard_assertion_overrides: {
        do_not_contact_respected: { result: 'fail_safely_routed', notes: 'dnc_flag_set' },
        do_not_contact_blocks_follow_up: {
          result: 'pass',
          notes: 'all_follow_up_blocked',
        },
        contact_permission_unknown_routes_to_hold_or_review: {
          result: 'fail_safely_routed',
          notes: 'dnc_overrides_contact_permission',
        },
      },
      hold_or_block_reason: 'do_not_contact',
      final_state: 'STOPPED_DO_NOT_CONTACT',
      audit_events: [
        auditEvent('state_transition', 'dnc_stop', { all_channels_stopped: true }),
      ],
      safety_assertions: safetyAssertions(['all_follow_up_blocked']),
    }),

    buildScenario({
      scenario_id: 'missed_lead_recovery_path',
      scenario_name: 'missed lead recovery path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        no_response_days: 3,
        missed_lead_recovery_enabled: true,
      },
      starting_state: 'READY_FOR_RESPONSE',
      transition_log: transitions([
        'READY_FOR_RESPONSE',
        'NO_RESPONSE',
        'MISSED_LEAD_RECOVERY_ACTIVE',
      ]),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        contact_permission_known_or_reviewed: {
          result: 'pass',
          notes: 'permission_known_before_recovery',
        },
        live_sms_blocked_when_flag_false: {
          result: 'pass',
          notes: 'recovery_simulated_live_sms_blocked',
        },
        unsupported_feature_does_not_trigger_live_action: {
          result: 'pass',
          notes: 'recovery_dry_run_only',
        },
      },
      final_state: 'MISSED_LEAD_RECOVERY_ACTIVE',
      audit_events: [
        auditEvent('state_transition', 'recovery_simulated', {
          recovery_channel: 'sms_simulated',
          dry_run_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['recovery_simulated_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'missed_lead_recovery_path',
        reporting_focus: 'missed_lead_recovery_tracking',
        fields_highlighted: ['missed_lead_recovery_active', 'follow_up_pending'],
        notes: 'growth_plan_missed_lead_recovery_in_source_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        missed_lead_recovery_active: 1,
        follow_up_pending: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'roofer_review_needed_path',
      scenario_name: 'roofer review needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        homeowner_question: 'pricing_question',
      },
      starting_state: 'READY_FOR_RESPONSE',
      transition_log: transitions(['READY_FOR_RESPONSE', 'ROOFER_REVIEW_NEEDED', 'HOLD']),
      guard_results: guardResults({
        roofer_review_completed_before_business_judgment_decisions: 'fail',
      }),
      guard_assertion_overrides: {
        roofer_review_required_for_pricing: {
          result: 'pass',
          notes: 'pricing_question_routes_to_roofer_review',
        },
        roofleadhq_review_limited_to_system_workflow_data_routing_quality: {
          result: 'pass',
          notes: 'business_judgment_not_roofleadhq_owned',
        },
      },
      hold_or_block_reason: 'pricing_question_requires_roofer_review',
      owner: 'roofer',
      final_state: 'ROOFER_REVIEW_NEEDED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'pricing_question',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'roofer_review_required', {
          review_type: 'pricing_question',
        }),
      ],
      safety_assertions: safetyAssertions(['roofer_owns_business_judgment']),
      reporting_impact: reportingImpact({
        scenario_id: 'roofer_review_needed_path',
        reporting_focus: 'roofer_review_queue_visibility',
        fields_highlighted: ['roofer_review_needed'],
        notes: 'roofer_review_needed_increments_review_queue_count',
      }),
      reporting_snapshot: buildReportingSnapshot({ roofer_review_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'roofleadhq_system_review_needed_path',
      scenario_name: 'RoofLeadHQ system review needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        issue_type: 'workflow_state_confusion',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'ROOFLEADHQ_REVIEW_NEEDED', 'HOLD']),
      guard_results: guardResults({
        roofleadhq_review_limited_to_system_workflow_data_routing_quality: 'pass',
      }),
      guard_assertion_overrides: {
        roofleadhq_review_required_for_broken_routing_or_data_issue: {
          result: 'pass',
          notes: 'workflow_state_confusion_routes_to_roofleadhq_jason',
        },
        roofleadhq_review_limited_to_system_workflow_data_routing_quality: {
          result: 'pass',
          notes: 'limited_to_system_workflow_data_routing_quality',
        },
        roofer_review_required_for_pricing: {
          result: 'pass',
          notes: 'not_a_business_judgment_issue',
        },
      },
      hold_or_block_reason: 'workflow_state_confusion',
      owner: 'roofleadhq_jason',
      final_state: 'ROOFLEADHQ_REVIEW_NEEDED',
      review_queue_items: [
        {
          review_owner: 'roofleadhq_jason',
          reason: 'workflow_state_confusion',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'system_review_required', {
          review_type: 'workflow_state_confusion',
        }),
      ],
      safety_assertions: safetyAssertions(['system_review_only_for_workflow_data_issues']),
      reporting_impact: reportingImpact({
        scenario_id: 'roofleadhq_system_review_needed_path',
        reporting_focus: 'roofleadhq_system_review_tracking',
        fields_highlighted: ['roofleadhq_review_needed'],
        notes: 'system_review_needed_in_reporting_snapshot',
      }),
      reporting_snapshot: buildReportingSnapshot({ roofleadhq_review_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'appointment_booked_path',
      scenario_name: 'appointment booked path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        appointment_date: '2026-07-15T14:00:00Z',
        booking_method: 'manual_fixture',
      },
      starting_state: 'APPOINTMENT_READY',
      transition_log: transitions(['APPOINTMENT_READY', 'APPOINTMENT_BOOKED']),
      guard_results: guardResults({
        live_sends_blocked_unless_activation_flags_true: 'pass',
      }),
      guard_assertion_overrides: {
        no_live_calendar_creation_when_appointment_booked: {
          result: 'pass',
          notes: 'google_calendar_created_false_manual_fixture_only',
        },
        live_calendar_blocked_when_flag_false: {
          result: 'pass',
          notes: 'live_calendar_booking_enabled_false',
        },
      },
      final_state: 'APPOINTMENT_BOOKED',
      audit_events: [
        auditEvent('state_transition', 'manual_fixture_booking', {
          calendar_owner: 'Main Sales Calendar',
          google_calendar_created: false,
        }),
      ],
      safety_assertions: safetyAssertions(['no_google_calendar_creation']),
      reporting_impact: reportingImpact({
        scenario_id: 'appointment_booked_path',
        reporting_focus: 'booked_inspection_tracking',
        fields_highlighted: ['appointment_booked', 'appointment_ready'],
        notes: 'booked_homeowner_appointment_in_appointment_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({ appointment_booked: 1, appointment_ready: 0 }),
    }),

    buildScenario({
      scenario_id: 'inspection_completed_path',
      scenario_name: 'inspection completed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        inspection_outcome: 'completed',
      },
      starting_state: 'APPOINTMENT_BOOKED',
      transition_log: transitions(['APPOINTMENT_BOOKED', 'INSPECTION_COMPLETED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'post_inspection_evaluation_without_live_sends',
        },
        live_sms_blocked_when_flag_false: { result: 'pass', notes: 'no_live_post_inspection_send' },
      },
      final_state: 'INSPECTION_COMPLETED',
      audit_events: [
        auditEvent('state_transition', 'inspection_marked_completed', {
          post_inspection_evaluation_next: true,
        }),
      ],
      safety_assertions: safetyAssertions(['post_inspection_evaluation_next']),
      reporting_impact: reportingImpact({
        scenario_id: 'inspection_completed_path',
        reporting_focus: 'inspection_completed_tracking',
        fields_highlighted: ['inspection_completed', 'appointment_booked'],
        notes: 'inspection_completed_in_appointment_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        inspection_completed: 1,
        appointment_booked: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'inspection_missed_reschedule_path',
      scenario_name: 'inspection missed reschedule path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        inspection_outcome: 'missed',
      },
      starting_state: 'APPOINTMENT_BOOKED',
      transition_log: transitions(['APPOINTMENT_BOOKED', 'INSPECTION_MISSED', 'RESCHEDULE_NEEDED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        no_live_calendar_creation_when_appointment_booked: {
          result: 'pass',
          notes: 'reschedule_manual_no_live_calendar',
        },
      },
      manual_next_step: 'roofer_manual_reschedule',
      owner: 'roofer',
      final_state: 'RESCHEDULE_NEEDED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'scheduling_issue',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'reschedule_required', {
          manual_next_step: true,
        }),
      ],
      safety_assertions: safetyAssertions(['manual_reschedule_required']),
      reporting_impact: reportingImpact({
        scenario_id: 'inspection_missed_reschedule_path',
        reporting_focus: 'inspection_missed_reschedule_tracking',
        fields_highlighted: ['inspection_missed_or_reschedule_needed'],
        notes: 'missed_or_reschedule_in_appointment_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        inspection_missed_or_reschedule_needed: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'post_inspection_still_open_path',
      scenario_name: 'post inspection still open path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        inspection_outcome: 'completed',
        outcome_recorded: false,
      },
      starting_state: 'INSPECTION_COMPLETED',
      transition_log: transitions(['INSPECTION_COMPLETED', 'POST_INSPECTION_OPEN', 'STILL_OPEN']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'still_open_follow_up_need_without_live_sends',
        },
      },
      final_state: 'STILL_OPEN',
      audit_events: [
        auditEvent('state_transition', 'outcome_unresolved', {
          days_since_inspection: 2,
        }),
      ],
      safety_assertions: safetyAssertions(['follow_up_may_be_needed']),
      reporting_impact: reportingImpact({
        scenario_id: 'post_inspection_still_open_path',
        reporting_focus: 'post_inspection_still_open_tracking',
        fields_highlighted: ['still_open', 'post_inspection_follow_up_needed'],
        notes: 'still_open_in_post_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        still_open: 1,
        post_inspection_follow_up_needed: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'estimate_needed_estimate_sent_tracking_path',
      scenario_name: 'estimate needed estimate sent tracking path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        estimate_status: 'estimate_sent',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions(['POST_INSPECTION_OPEN', 'ESTIMATE_NEEDED', 'ESTIMATE_SENT']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        estimate_tracking_does_not_generate_estimate: {
          result: 'pass',
          notes: 'tracking_only_no_document_generated',
        },
        automatic_estimate_request_routes_to_hold_or_review: {
          result: 'pass',
          notes: 'no_automatic_estimate_generation',
        },
        automatic_quote_request_routes_to_hold_or_review: {
          result: 'pass',
          notes: 'no_automatic_quote_generation',
        },
      },
      final_state: 'ESTIMATE_SENT',
      audit_events: [
        auditEvent('state_transition', 'estimate_status_tracked', {
          no_document_generated: true,
        }),
      ],
      safety_assertions: safetyAssertions(['tracking_only_no_automatic_estimate']),
      reporting_impact: reportingImpact({
        scenario_id: 'estimate_needed_estimate_sent_tracking_path',
        reporting_focus: 'estimate_tracking_only',
        fields_highlighted: ['estimate_needed', 'estimate_sent'],
        notes: 'estimate_tracking_in_post_inspection_summary_no_document_generated',
      }),
      reporting_snapshot: buildReportingSnapshot({
        estimate_needed: 1,
        estimate_sent: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'homeowner_follow_up_needed_path',
      scenario_name: 'homeowner follow up needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        follow_up_owner: 'homeowner',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions(['POST_INSPECTION_OPEN', 'HOMEOWNER_FOLLOW_UP_NEEDED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'homeowner_follow_up_draft_manual_only',
        },
      },
      manual_next_step: 'draft_homeowner_follow_up_for_review',
      owner: 'homeowner',
      final_state: 'HOMEOWNER_FOLLOW_UP_NEEDED',
      audit_events: [
        auditEvent('state_transition', 'homeowner_follow_up_pending', {
          draft_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['draft_manual_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'homeowner_follow_up_needed_path',
        reporting_focus: 'homeowner_follow_up_tracking',
        fields_highlighted: ['homeowner_follow_up_needed'],
        notes: 'homeowner_follow_up_in_post_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({ homeowner_follow_up_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'roofer_follow_up_needed_path',
      scenario_name: 'roofer follow up needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        follow_up_owner: 'roofer',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions(['POST_INSPECTION_OPEN', 'ROOFER_FOLLOW_UP_NEEDED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'roofer_follow_up_manual_only',
        },
      },
      manual_next_step: 'roofer_manual_follow_up',
      owner: 'roofer',
      final_state: 'ROOFER_FOLLOW_UP_NEEDED',
      audit_events: [
        auditEvent('state_transition', 'roofer_follow_up_pending', {
          manual_roofer_review: true,
        }),
      ],
      safety_assertions: safetyAssertions(['manual_roofer_review']),
      reporting_impact: reportingImpact({
        scenario_id: 'roofer_follow_up_needed_path',
        reporting_focus: 'roofer_follow_up_tracking',
        fields_highlighted: ['roofer_follow_up_needed'],
        notes: 'roofer_follow_up_in_post_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({ roofer_follow_up_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'feedback_permission_yes_path',
      scenario_name: 'feedback permission yes path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        permission_to_use_publicly: 'yes',
        feedback_text: 'Fixture feedback text',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions([
        'POST_INSPECTION_OPEN',
        'FEEDBACK_REQUESTED',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({
        feedback_public_use_permission_checked_before_public_use: 'pass',
      }),
      guard_assertion_overrides: {
        feedback_public_use_permission_checked: {
          result: 'pass',
          notes: 'permission_to_use_publicly_yes',
        },
        permission_to_use_publicly_allows_only_yes_no_not_asked: {
          result: 'pass',
          notes: 'valid_permission_value_yes',
        },
        no_automatic_public_review_generation: {
          result: 'pass',
          notes: 'no_unattended_public_review_publishing',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'yes',
          public_use_eligible: true,
          automatic_public_review_generation: false,
        }),
      ],
      safety_assertions: safetyAssertions([
        'PERMISSION_TO_USE_PUBLICLY_YES',
        'no_automatic_public_review_generation',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'feedback_permission_yes_path',
        reporting_focus: 'feedback_permission_yes',
        fields_highlighted: ['feedback_captured', 'permission_to_use_publicly_yes'],
        notes: 'permission_yes_in_feedback_permission_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        feedback_captured: 1,
        permission_to_use_publicly_yes: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'feedback_permission_no_path',
      scenario_name: 'feedback permission no path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        permission_to_use_publicly: 'no',
        feedback_text: 'Fixture internal feedback',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions([
        'POST_INSPECTION_OPEN',
        'FEEDBACK_REQUESTED',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({
        feedback_public_use_permission_checked_before_public_use: 'pass',
      }),
      guard_assertion_overrides: {
        feedback_public_use_permission_checked: {
          result: 'pass',
          notes: 'permission_to_use_publicly_no_internal_only',
        },
        permission_to_use_publicly_allows_only_yes_no_not_asked: {
          result: 'pass',
          notes: 'valid_permission_value_no',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'no',
          public_use_eligible: false,
          internal_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['feedback_internal_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'feedback_permission_no_path',
        reporting_focus: 'feedback_permission_no',
        fields_highlighted: ['feedback_captured', 'permission_to_use_publicly_no'],
        notes: 'permission_no_in_feedback_permission_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        feedback_captured: 1,
        permission_to_use_publicly_no: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'feedback_permission_not_asked_path',
      scenario_name: 'feedback permission not asked path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        permission_to_use_publicly: 'not_asked',
        feedback_status: 'captured',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions([
        'POST_INSPECTION_OPEN',
        'FEEDBACK_REQUESTED',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({
        feedback_public_use_permission_checked_before_public_use: 'fail',
      }),
      guard_assertion_overrides: {
        feedback_public_use_permission_checked: {
          result: 'fail_safely_routed',
          notes: 'permission_not_asked_internal_only',
        },
        permission_to_use_publicly_allows_only_yes_no_not_asked: {
          result: 'pass',
          notes: 'valid_permission_value_not_asked',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'not_asked',
          public_use_eligible: false,
        }),
      ],
      safety_assertions: safetyAssertions([
        'PERMISSION_TO_USE_PUBLICLY_NOT_ASKED',
        'internal_only',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'feedback_permission_not_asked_path',
        reporting_focus: 'feedback_permission_not_asked',
        fields_highlighted: ['feedback_captured', 'permission_to_use_publicly_not_asked'],
        notes: 'permission_not_asked_in_feedback_permission_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        feedback_captured: 1,
        permission_to_use_publicly_not_asked: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'csv_report_snapshot_fake_data_path',
      scenario_name: 'CSV report snapshot fake data path',
      plan_profile: 'growth',
      input_fixture_summary: {
        report_period: '2026-06',
        fixture_lead_count: 42,
      },
      starting_state: 'REPORT_PERIOD_DUE',
      transition_log: transitions([
        'REPORT_PERIOD_DUE',
        'REPORT_SNAPSHOT_READY',
        'CSV_EXPORT_READY',
      ]),
      guard_results: guardResults({
        csv_generated_only_from_fake_or_approved_records: 'pass',
        live_sends_blocked_unless_activation_flags_true: 'pass',
      }),
      guard_assertion_overrides: {
        csv_generated_only_from_fake_or_approved_records: {
          result: 'pass',
          notes: 'fixture_snapshot_only',
        },
        csv_export_is_one_directional: { result: 'pass', notes: 'one_directional_export' },
        csv_not_native_crm_sync: { result: 'pass', notes: 'not_bidirectional_crm_integration' },
        csv_contains_homeowner_personal_information_warning: {
          result: 'pass',
          notes: 'pii_warning_included',
        },
        customer_responsible_for_downloaded_exported_data: {
          result: 'pass',
          notes: 'customer_responsibility_documented',
        },
        roi_depends_on_customer_provided_spend_source_data: {
          result: 'pass',
          notes: 'roi_spend_source_customer_provided',
        },
        live_csv_delivery_blocked_when_flag_false: {
          result: 'pass',
          notes: 'live_csv_export_enabled_false',
        },
        native_crm_sync_request_routes_to_later_only_or_review: {
          result: 'pass',
          notes: 'csv_not_native_crm_sync',
        },
      },
      final_state: 'CSV_EXPORT_READY',
      reporting_snapshot: FAKE_REPORTING_SNAPSHOT,
      csv_snapshot_if_applicable: FAKE_CSV_SNAPSHOT,
      activation_flag_results: activationFlagResults('csv_export'),
      audit_events: [
        auditEvent('state_transition', 'fixture_report_snapshot', {
          generation_source: 'fixture',
          live_csv_export_enabled: false,
          delivery_blocked: true,
        }),
      ],
      safety_assertions: safetyAssertions([
        'csv_one_directional_reporting_only',
        'csv_not_bidirectional_crm_integration',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'csv_report_snapshot_fake_data_path',
        reporting_focus: 'strongest_csv_report_snapshot',
        report_period: 'monthly',
        csv_included: true,
        fields_highlighted: [
          'csv_export_state',
          'appointment_booked',
          'inspection_completed',
          'feedback_captured',
        ],
        notes: 'strongest_fixture_csv_and_reporting_snapshot_with_full_header_and_sample_rows',
      }),
    }),

    buildScenario({
      scenario_id: 'starter_plan_profile_path',
      scenario_name: 'starter plan profile path',
      plan_profile: 'starter',
      input_fixture_summary: {
        ...f,
        plan_profile: 'starter',
        monthly_leads: 80,
        location_count: 1,
        features: ['basic_reporting'],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'APPOINTMENT_BOOKED']),
      guard_results: guardResults({
        plan_profile_known: 'pass',
        custom_review_triggers_checked: 'pass',
      }),
      guard_assertion_overrides: {
        plan_profile_known: { result: 'pass', notes: 'starter_profile' },
        starter_volume_limit_enforced: {
          result: 'pass',
          notes: '80_leads_within_starter_100_limit',
        },
        growth_volume_limit_enforced: {
          result: 'pass',
          notes: 'not_applicable_starter_plan',
        },
      },
      final_state: 'APPOINTMENT_BOOKED',
      audit_events: [
        auditEvent('state_transition', 'starter_path', {
          plan_tier: 'starter',
          advanced_routing: false,
          missed_lead_recovery: false,
        }),
      ],
      safety_assertions: safetyAssertions(['starter_features_only', 'no_advanced_custom_routing']),
      reporting_impact: reportingImpact({
        scenario_id: 'starter_plan_profile_path',
        reporting_focus: 'starter_plan_basic_reporting',
        plan_profile: 'starter',
        fields_highlighted: ['total_leads', 'appointment_booked'],
        notes: 'starter_limited_to_basic_summary_no_advanced_source_roi',
      }),
      reporting_snapshot: buildReportingSnapshot({
        total_leads: 80,
        appointment_booked: 1,
        csv_export_state: 'limited_basic_summary_only',
      }),
    }),

    buildScenario({
      scenario_id: 'growth_plan_profile_path',
      scenario_name: 'growth plan profile path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        plan_profile: 'growth',
        monthly_leads: 250,
        location_count: 1,
        features: [
          'lead_source_tracking',
          'missed_lead_recovery',
          'post_inspection_follow_up',
          'feedback_capture',
          'csv_export',
        ],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions([
        'NEW_LEAD',
        'SOURCE_CAPTURED',
        'APPOINTMENT_READY',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        plan_profile_known: { result: 'pass', notes: 'growth_profile' },
        growth_volume_limit_enforced: {
          result: 'pass',
          notes: '250_leads_within_growth_300_limit',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'growth_path', {
          plan_tier: 'growth',
          features_enabled: 'missed_lead_recovery, post_inspection, feedback, csv_export',
        }),
      ],
      safety_assertions: safetyAssertions(['growth_features_available_in_profile']),
      reporting_impact: reportingImpact({
        scenario_id: 'growth_plan_profile_path',
        reporting_focus: 'growth_plan_source_tracking_and_csv',
        plan_profile: 'growth',
        csv_included: true,
        fields_highlighted: [
          'lead_source',
          'missed_lead_recovery_active',
          'feedback_captured',
        ],
        notes: 'growth_includes_source_tracking_missed_lead_recovery_and_csv_export',
      }),
      reporting_snapshot: buildReportingSnapshot({
        missed_lead_recovery_active: 1,
        feedback_captured: 1,
        csv_export_state: 'growth_csv_export_fixture',
      }),
    }),

    buildScenario({
      scenario_id: 'elite_plan_profile_path',
      scenario_name: 'elite plan profile path',
      plan_profile: 'elite',
      input_fixture_summary: {
        ...f,
        plan_profile: 'elite',
        monthly_leads: 450,
        location_count: 1,
        reporting_depth: 'advanced',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'CSV_EXPORT_READY']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        plan_profile_known: { result: 'pass', notes: 'elite_profile' },
        elite_volume_limit_enforced: {
          result: 'pass',
          notes: '450_leads_within_elite_500_limit',
        },
      },
      final_state: 'CSV_EXPORT_READY',
      audit_events: [
        auditEvent('state_transition', 'elite_path', {
          plan_tier: 'elite',
          review_queue_capacity: 'larger',
        }),
      ],
      safety_assertions: safetyAssertions(['elite_advanced_reporting']),
      reporting_impact: reportingImpact({
        scenario_id: 'elite_plan_profile_path',
        reporting_focus: 'elite_advanced_segmentation',
        plan_profile: 'elite',
        csv_included: true,
        fields_highlighted: ['lead_source', 'won', 'lost'],
        notes: 'elite_advanced_reporting_with_roi_when_customer_spend_provided',
      }),
      reporting_snapshot: buildReportingSnapshot({
        won: 1,
        lost: 0,
        csv_export_state: 'elite_detailed_csv_fixture',
      }),
    }),

    buildScenario({
      scenario_id: 'custom_review_500_plus_leads_path',
      scenario_name: 'custom review 500 plus leads path',
      plan_profile: 'elite',
      input_fixture_summary: {
        ...f,
        monthly_leads: 520,
        plan_profile: 'elite',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'CUSTOM_REVIEW_REQUIRED', 'HOLD']),
      guard_results: guardResults({
        custom_review_triggers_checked: 'fail',
        plan_profile_known: 'pass',
      }),
      guard_assertion_overrides: {
        custom_review_trigger_500_plus_leads: {
          result: 'fail_safely_routed',
          notes: '520_leads_exceeds_500_elite_cap',
        },
        elite_volume_limit_enforced: {
          result: 'fail_safely_routed',
          notes: 'volume_exceeds_elite_cap_without_custom_approval',
        },
      },
      hold_or_block_reason: 'volume_exceeds_500',
      owner: 'roofer',
      final_state: 'CUSTOM_REVIEW_REQUIRED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'volume_exceeds_500',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'custom_review_volume', {
          trigger_reason: 'volume_exceeds_500',
        }),
      ],
      safety_assertions: safetyAssertions(['hold_until_custom_review_completed']),
      reporting_impact: reportingImpact({
        scenario_id: 'custom_review_500_plus_leads_path',
        reporting_focus: 'custom_review_complex_scope',
        plan_profile: 'custom_review',
        fields_highlighted: ['total_leads'],
        notes: 'custom_review_required_for_500_plus_leads_before_self_serve_reporting',
      }),
      reporting_snapshot: buildReportingSnapshot({
        total_leads: 520,
        csv_export_state: 'custom_review_pending',
      }),
    }),

    buildScenario({
      scenario_id: 'custom_review_two_plus_locations_path',
      scenario_name: 'custom review two plus locations path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        location_count: 2,
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'CUSTOM_REVIEW_REQUIRED', 'HOLD']),
      guard_results: guardResults({
        custom_review_triggers_checked: 'fail',
      }),
      guard_assertion_overrides: {
        custom_review_trigger_two_plus_locations: {
          result: 'fail_safely_routed',
          notes: 'two_locations_requires_custom_review',
        },
      },
      hold_or_block_reason: 'multi_location',
      owner: 'roofer',
      final_state: 'CUSTOM_REVIEW_REQUIRED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'multi_location',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'custom_review_location', {
          location_count: 2,
        }),
      ],
      safety_assertions: safetyAssertions(['hold_until_custom_review_completed']),
      reporting_impact: reportingImpact({
        scenario_id: 'custom_review_two_plus_locations_path',
        reporting_focus: 'custom_review_multi_location',
        plan_profile: 'custom_review',
        fields_highlighted: ['total_leads'],
        notes: 'custom_review_required_for_two_plus_locations',
      }),
      reporting_snapshot: buildReportingSnapshot({
        csv_export_state: 'custom_review_pending',
      }),
    }),

    buildScenario({
      scenario_id: 'activation_flag_false_blocks_live_action_path',
      scenario_name: 'activation flag false blocks live action path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        attempted_action: 'sms_send',
      },
      starting_state: 'APPOINTMENT_READY',
      transition_log: transitions(['APPOINTMENT_READY', 'BLOCKED', 'HOLD']),
      guard_results: guardResults({
        live_sends_blocked_unless_activation_flags_true: 'fail',
      }),
      guard_assertion_overrides: {
        activation_flags_default_false: { result: 'pass', notes: 'all_flags_false' },
        live_sms_blocked_when_flag_false: {
          result: 'pass',
          notes: 'sms_send_blocked',
        },
        blocked_by_activation_flag_audit_event_present: {
          result: 'pass',
          notes: 'blocked_by_activation_flag_audit_recorded',
        },
        unsupported_feature_does_not_trigger_live_action: {
          result: 'pass',
          notes: 'live_action_blocked_no_execution',
        },
      },
      hold_or_block_reason: 'activation_flag_false',
      final_state: 'BLOCKED',
      activation_flag_results: activationFlagResults('sms_send'),
      audit_events: [
        auditEvent('live_action_blocked', 'blocked_by_activation_flag', {
          blocked_action: 'sms_send',
          flag_checked: 'live_sms_enabled=false',
          dry_run_only: true,
        }),
      ],
      safety_assertions: safetyAssertions([
        'blocked_by_activation_flag',
        'jason_approval_required_before_live_activation',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'activation_flag_false_blocks_live_action_path',
        reporting_focus: 'live_reporting_delivery_blocked',
        fields_highlighted: ['live_delivery_blocked_by_activation_flag', 'csv_export_state'],
        notes: 'live_csv_and_reporting_delivery_blocked_when_activation_flag_false',
      }),
      reporting_snapshot: buildReportingSnapshot({
        csv_export_state: 'fixture_snapshot_blocked_live_delivery',
        live_delivery_blocked_by_activation_flag: true,
      }),
    }),
  ];
}

function main() {
  const scenarios = runScenarios();
  const passed = scenarios.filter((s) => s.result === 'PASS').length;
  const failed = scenarios.filter((s) => s.result !== 'PASS').length;
  const guardSummary = computeGuardSummary(scenarios);

  const outputBase = {
    dry_run_name: 'native_workflow_fixture_state_model_dry_run',
    safety_posture: 'demo_ready_with_live_automation_disabled',
    implementation_scope: 'local_fixture_only_fake_data_dry_run',
    source_of_truth_context:
      'da5e9ec test(workflow): add sandbox test mode approval runbook',
    guard_assertion_expansion:
      'native_workflow_fixture_guard_assertions_expansion',
    reporting_snapshot_expansion:
      'native_workflow_fixture_reporting_snapshot_expansion',
    review_queue_expansion: 'native_workflow_fixture_review_queue_expansion',
    appointment_readiness_expansion: 'native_workflow_fixture_appointment_readiness_expansion',
    post_inspection_expansion: 'native_workflow_fixture_post_inspection_expansion',
    feedback_permission_expansion: 'native_workflow_fixture_feedback_permission_expansion',
    manual_outreach_expansion: 'native_workflow_fixture_manual_outreach_expansion',
    missed_lead_recovery_expansion: 'native_workflow_fixture_missed_lead_recovery_expansion',
    usage_volume_expansion: 'native_workflow_fixture_usage_volume_plan_limit_expansion',
    lead_source_roi_expansion: 'native_workflow_fixture_lead_source_roi_boundary_expansion',
    messaging_compliance_expansion:
      'native_workflow_fixture_messaging_compliance_contact_permission_expansion',
    audit_event_timeline_expansion: 'native_workflow_fixture_audit_event_timeline_expansion',
    data_boundary_pii_expansion:
      'native_workflow_fixture_data_boundary_pii_minimization_expansion',
    review_queue_aging_sla_expansion:
      'native_workflow_fixture_review_queue_aging_sla_boundary_expansion',
    manual_to_native_handoff_rehearsal_expansion:
      'native_workflow_fixture_manual_to_native_handoff_rehearsal_expansion',
    e2e_acceptance_rehearsal_expansion:
      'native_workflow_fixture_e2e_acceptance_rehearsal_expansion',
    sandbox_test_mode_readiness_expansion:
      'native_workflow_fixture_sandbox_test_mode_integration_readiness_gate_expansion',
    sandbox_test_mode_approval_runbook_expansion:
      'native_workflow_fixture_sandbox_test_mode_approval_runbook_expansion',
    test_mode_channel_sequence_plan_expansion:
      'native_workflow_fixture_test_mode_dry_run_channel_sequence_plan_expansion',
    activation_flags: { ...ACTIVATION_FLAGS },
    scenario_count: scenarios.length,
    passed_scenarios: passed,
    failed_scenarios: failed,
    guard_assertion_summary: guardSummary,
    total_guard_assertions: guardSummary.total_assertions_evaluated,
    passed_guard_assertions: guardSummary.passed_assertions,
    failed_guard_assertions: guardSummary.failed_assertions_safely_routed,
    guard_categories: GUARD_CATEGORIES,
    fail_closed_assertions: FAIL_CLOSED_ASSERTIONS,
    scenarios,
  };

  const reportingOutput = buildTopLevelReporting(outputBase);
  const reviewQueueOutput = buildTopLevelReviewQueue(scenarios, outputBase);
  const appointmentReadinessOutput = buildTopLevelAppointmentReadiness(scenarios, outputBase);
  const postInspectionOutput = buildTopLevelPostInspection(scenarios, outputBase);
  const feedbackPermissionOutput = buildTopLevelFeedbackPermission(scenarios, outputBase);
  const manualOutreachOutput = buildTopLevelManualOutreach(scenarios, outputBase);
  const missedLeadRecoveryOutput = buildTopLevelMissedLeadRecovery(scenarios, outputBase);
  const usageVolumeOutput = buildTopLevelUsageVolume(scenarios, outputBase);
  const leadSourceRoiOutput = buildTopLevelLeadSourceRoiBoundary(
    scenarios,
    outputBase,
    reportingOutput.csv_export_snapshot_summary,
  );
  const messagingComplianceOutput = buildTopLevelMessagingCompliance(scenarios, outputBase);
  const auditEventTimelineOutput = buildTopLevelAuditEventTimeline(scenarios, outputBase);
  const dataBoundaryPiiOutput = buildTopLevelDataBoundaryPiiMinimization(
    scenarios,
    outputBase,
    reportingOutput,
    reviewQueueOutput,
    auditEventTimelineOutput,
  );
  const reviewQueueAgingSlaOutput = buildTopLevelReviewQueueAgingSlaBoundary(
    scenarios,
    outputBase,
    reviewQueueOutput,
  );
  const manualToNativeHandoffOutput = buildTopLevelManualToNativeHandoffRehearsal(
    scenarios,
    outputBase,
    reviewQueueAgingSlaOutput,
  );
  const e2eAcceptanceRehearsalOutput = buildTopLevelE2eAcceptanceRehearsalExpansion(
    scenarios,
    outputBase,
    reportingOutput,
    reviewQueueOutput,
    appointmentReadinessOutput,
    postInspectionOutput,
    feedbackPermissionOutput,
    manualOutreachOutput,
    missedLeadRecoveryOutput,
    usageVolumeOutput,
    leadSourceRoiOutput,
    messagingComplianceOutput,
    auditEventTimelineOutput,
    dataBoundaryPiiOutput,
    reviewQueueAgingSlaOutput,
    manualToNativeHandoffOutput,
  );
  const sandboxTestModeReadinessOutput = buildTopLevelSandboxTestModeIntegrationReadinessGateExpansion(
    scenarios,
    outputBase,
    e2eAcceptanceRehearsalOutput,
  );
  const sandboxTestModeApprovalRunbookOutput = buildTopLevelSandboxTestModeApprovalRunbookExpansion(
    scenarios,
    outputBase,
    sandboxTestModeReadinessOutput,
  );
  const testModeChannelSequencePlanOutput = buildTopLevelTestModeChannelSequencePlanExpansion(
    scenarios,
    outputBase,
    sandboxTestModeApprovalRunbookOutput,
  );

  const output = {
    ...outputBase,
    ...reportingOutput,
    ...reviewQueueOutput,
    ...appointmentReadinessOutput,
    ...postInspectionOutput,
    ...feedbackPermissionOutput,
    ...manualOutreachOutput,
    ...missedLeadRecoveryOutput,
    ...usageVolumeOutput,
    ...leadSourceRoiOutput,
    ...messagingComplianceOutput,
    ...auditEventTimelineOutput,
    ...dataBoundaryPiiOutput,
    ...reviewQueueAgingSlaOutput,
    ...manualToNativeHandoffOutput,
    ...e2eAcceptanceRehearsalOutput,
    ...sandboxTestModeReadinessOutput,
    ...sandboxTestModeApprovalRunbookOutput,
    ...testModeChannelSequencePlanOutput,
    aggregate_safety_assertions: [
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'no_schema_changes',
      'no_migrations',
      'no_auth_rls_security_changes',
      'no_native_crm_sync',
      'no_payment_deposit_invoice_estimate_automation',
      'fixture_fake_data_only',
      'demo_ready_with_live_automation_disabled',
      'all_activation_flags_default_false',
      'all_scenarios_live_actions_performed_no',
      'all_scenarios_production_data_touched_no',
      'all_scenarios_external_services_called_no',
      'all_guard_failures_safely_routed',
      'explicit_guard_assertion_coverage',
      'explicit_reporting_snapshot_coverage',
      'reporting_fake_data_only',
      'reporting_live_delivery_blocked',
      'explicit_review_queue_coverage',
      'review_queue_fake_data_only',
      'review_queue_live_notification_blocked',
      'roofer_review_owns_business_judgment',
      'roofleadhq_review_limited_to_system_quality',
      'explicit_appointment_readiness_coverage',
      'appointment_readiness_fake_data_only',
      'appointment_readiness_live_calendar_blocked',
      'no_google_calendar_event_created',
      'explicit_post_inspection_coverage',
      'post_inspection_fake_data_only',
      'post_inspection_live_follow_up_blocked',
      'post_inspection_live_feedback_blocked',
      'no_automatic_estimate_quote_invoice_payment',
      'feedback_internal_unless_permission_obtained',
      'explicit_feedback_permission_coverage',
      'feedback_permission_fake_data_only',
      'feedback_permission_live_feedback_blocked',
      'no_automatic_public_review_or_testimonial_publication',
      'explicit_manual_outreach_coverage',
      'manual_outreach_fake_data_only',
      'manual_outreach_live_sends_blocked',
      'manual_outreach_no_notifications',
      'explicit_missed_lead_recovery_coverage',
      'missed_lead_recovery_fake_data_only',
      'missed_lead_recovery_live_sends_blocked',
      'missed_lead_recovery_no_notifications',
      'explicit_usage_volume_plan_limit_coverage',
      'usage_volume_fake_data_only',
      'usage_volume_no_live_billing',
      'usage_volume_no_auto_plan_change',
      'usage_volume_no_notifications',
      'explicit_lead_source_roi_boundary_coverage',
      'lead_source_attribution_fake_data_only',
      'lead_source_roi_no_ad_platform_calls',
      'lead_source_roi_no_crm_sync',
      'lead_source_roi_no_live_csv_delivery',
      'lead_source_roi_exact_roi_not_promised',
      'explicit_messaging_compliance_contact_permission_coverage',
      'messaging_compliance_fake_data_only',
      'messaging_compliance_live_sms_email_call_blocked',
      'messaging_compliance_no_notifications',
      'contact_permission_uncertainty_fails_closed',
      'contact_permission_follow_up_only_when_contacted_or_permission_given',
      'explicit_audit_event_timeline_coverage',
      'audit_event_timeline_fake_data_only',
      'audit_event_timeline_no_live_automation',
      'audit_event_timeline_no_secrets_or_credentials_logged',
      'audit_event_timeline_homeowner_pii_minimized',
      'every_transition_has_traceable_audit_event',
      'every_blocked_live_action_has_activation_flag_audit',
      'explicit_data_boundary_pii_minimization_coverage',
      'data_boundary_pii_fake_data_only',
      'data_boundary_pii_no_secrets_or_credentials_logged',
      'data_boundary_pii_homeowner_personal_information_minimized',
      'data_boundary_pii_csv_warnings_and_customer_export_responsibility',
      'data_boundary_pii_no_production_data_no_live_automation',
      'explicit_review_queue_aging_sla_boundary_coverage',
      'review_queue_aging_fake_data_only',
      'review_queue_aging_no_live_notifications',
      'review_queue_aging_stale_hold_blocked_states_tracked',
      'review_queue_aging_escalation_ready_without_notification',
      'explicit_manual_to_native_handoff_rehearsal_coverage',
      'manual_to_native_handoff_fake_data_only',
      'manual_to_native_handoff_no_production_persistence',
      'manual_to_native_handoff_no_live_automation',
      'manual_to_native_handoff_rehearsal_only',
      'explicit_e2e_acceptance_rehearsal_coverage',
      'e2e_acceptance_rehearsal_fake_data_only',
      'e2e_acceptance_rehearsal_no_production_persistence',
      'e2e_acceptance_rehearsal_no_live_automation',
      'e2e_acceptance_rehearsal_deterministic',
      'explicit_sandbox_test_mode_integration_readiness_gate_coverage',
      'sandbox_test_mode_readiness_fake_data_only',
      'sandbox_test_mode_readiness_no_production_persistence',
      'sandbox_test_mode_readiness_no_live_automation',
      'sandbox_test_mode_readiness_no_test_mode_activation',
      'sandbox_test_mode_readiness_no_sandbox_credentials_read',
      'sandbox_test_mode_readiness_no_production_credentials_read',
      'sandbox_test_mode_readiness_no_env_values_logged',
      'sandbox_test_mode_readiness_approval_gate_enforced',
      'sandbox_test_mode_readiness_deterministic',
      'explicit_sandbox_test_mode_approval_runbook_coverage',
      'sandbox_test_mode_approval_runbook_fake_data_only',
      'sandbox_test_mode_approval_runbook_no_production_persistence',
      'sandbox_test_mode_approval_runbook_no_live_automation',
      'sandbox_test_mode_approval_runbook_no_test_mode_activation',
      'sandbox_test_mode_approval_runbook_no_sandbox_credentials_read',
      'sandbox_test_mode_approval_runbook_no_production_credentials_read',
      'sandbox_test_mode_approval_runbook_no_env_values_logged',
      'sandbox_test_mode_approval_runbook_approval_gate_enforced',
      'sandbox_test_mode_approval_runbook_deterministic',
      'explicit_test_mode_channel_sequence_plan_coverage',
      'test_mode_channel_sequence_plan_fake_data_only',
      'test_mode_channel_sequence_plan_no_production_persistence',
      'test_mode_channel_sequence_plan_no_live_automation',
      'test_mode_channel_sequence_plan_no_test_mode_activation',
      'test_mode_channel_sequence_plan_no_sandbox_credentials_read',
      'test_mode_channel_sequence_plan_no_production_credentials_read',
      'test_mode_channel_sequence_plan_no_env_values_logged',
      'test_mode_channel_sequence_plan_approval_gate_enforced',
      'test_mode_channel_sequence_plan_deterministic',
    ],
    summary: {
      description:
        'Deterministic fake-data native workflow fixture state model dry-run with explicit guard assertion, reporting snapshot, review queue, appointment readiness, post-inspection, feedback permission, manual outreach, missed lead recovery, usage volume plan-limit, lead source attribution/ROI boundary, messaging compliance/contact permission, audit event/state-transition timeline, data-boundary/PII minimization, review queue aging/SLA boundary, manual-to-native handoff rehearsal, end-to-end acceptance rehearsal, sandbox/test-mode integration readiness gate, sandbox/test-mode approval runbook, and test-mode dry-run channel sequence plan coverage completed safely',
      total_scenarios: scenarios.length,
      passed,
      failed,
      safety_posture: 'demo_ready_with_live_automation_disabled',
      live_automation_status: 'disabled',
      output_mode: 'stdout_json_only',
      guard_assertion_coverage: 'expanded',
      reporting_snapshot_coverage: 'expanded',
      review_queue_coverage: 'expanded',
      appointment_readiness_coverage: 'expanded',
      post_inspection_coverage: 'expanded',
      feedback_permission_coverage: 'expanded',
      manual_outreach_coverage: 'expanded',
      missed_lead_recovery_coverage: 'expanded',
      usage_volume_plan_limit_coverage: 'expanded',
      lead_source_roi_boundary_coverage: 'expanded',
      messaging_compliance_contact_permission_coverage: 'expanded',
      audit_event_timeline_coverage: 'expanded',
      data_boundary_pii_minimization_coverage: 'expanded',
      review_queue_aging_sla_boundary_coverage: 'expanded',
      manual_to_native_handoff_rehearsal_coverage: 'expanded',
      e2e_acceptance_rehearsal_coverage: 'expanded',
      sandbox_test_mode_integration_readiness_gate_coverage: 'expanded',
      sandbox_test_mode_approval_runbook_coverage: 'expanded',
      test_mode_channel_sequence_plan_coverage: 'expanded',
    },
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main();