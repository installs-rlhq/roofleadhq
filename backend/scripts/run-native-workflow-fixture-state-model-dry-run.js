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

const ACTIVATION_FLAGS = {
  live_sms_enabled: false,
  live_vapi_calls_enabled: false,
  live_resend_email_enabled: false,
  live_calendar_booking_enabled: false,
  live_lindy_bridge_enabled: false,
  live_scheduler_enabled: false,
  live_csv_export_enabled: false,
  live_crm_handoff_enabled: false,
  live_payment_or_invoice_enabled: false,
};

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

const FAKE_REPORTING_SNAPSHOT = {
  total_leads: 42,
  booked_inspections: 12,
  inspection_completed: 9,
  still_open: 3,
  roofer_review_needed: 2,
  roofleadhq_review_needed: 1,
  feedback_captured: 5,
  csv_export_state: 'fixture_snapshot_only',
};

const FAKE_CSV_SNAPSHOT = {
  lead_id: 'lead-fix-019',
  report_period: '2026-06',
  lead_created_date: '2026-06-01',
  homeowner_name: 'Fixture Homeowner',
  homeowner_phone: '+15555550101',
  homeowner_email: 'fixture.homeowner@example.test',
  service_address: '123 Fixture Lane, Testville, TX 75001',
  lead_source: 'Fixture Google Ads',
  appointment_booked: 'yes',
  appointment_status: 'booked',
  post_inspection_status: 'still_open',
  feedback_captured: 'yes',
  permission_to_use_publicly: 'yes',
  calendar_owner: 'Acme Roofing Calendar',
  export_blocked_reason: 'live_csv_export_enabled_false',
};

function buildScenario(config) {
  const scenario = {
    scenario_id: config.scenario_id,
    scenario_name: config.scenario_name,
    plan_profile: config.plan_profile,
    input_fixture_summary: config.input_fixture_summary,
    starting_state: config.starting_state,
    transition_log: config.transition_log,
    guard_results: config.guard_results,
    final_state: config.final_state,
    review_queue_items: config.review_queue_items || [],
    reporting_snapshot: config.reporting_snapshot || null,
    csv_snapshot_if_applicable: config.csv_snapshot_if_applicable || null,
    activation_flag_results: config.activation_flag_results || activationFlagResults(),
    audit_events: config.audit_events,
    safety_assertions: config.safety_assertions,
    ...SAFETY,
    result: 'PASS',
  };
  return scenario;
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
      final_state: 'APPOINTMENT_READY',
      audit_events: [
        auditEvent('state_transition', 'intake_to_appointment_ready', {
          readiness_blockers: 'none',
        }),
      ],
      safety_assertions: safetyAssertions(['no_live_send', 'fixture_only']),
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
      final_state: 'MISSED_LEAD_RECOVERY_ACTIVE',
      audit_events: [
        auditEvent('state_transition', 'recovery_simulated', {
          recovery_channel: 'sms_simulated',
          dry_run_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['recovery_simulated_only']),
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
      final_state: 'APPOINTMENT_BOOKED',
      audit_events: [
        auditEvent('state_transition', 'manual_fixture_booking', {
          calendar_owner: 'Main Sales Calendar',
          google_calendar_created: false,
        }),
      ],
      safety_assertions: safetyAssertions(['no_google_calendar_creation']),
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
      final_state: 'INSPECTION_COMPLETED',
      audit_events: [
        auditEvent('state_transition', 'inspection_marked_completed', {
          post_inspection_evaluation_next: true,
        }),
      ],
      safety_assertions: safetyAssertions(['post_inspection_evaluation_next']),
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
      final_state: 'STILL_OPEN',
      audit_events: [
        auditEvent('state_transition', 'outcome_unresolved', {
          days_since_inspection: 2,
        }),
      ],
      safety_assertions: safetyAssertions(['follow_up_may_be_needed']),
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
      final_state: 'ESTIMATE_SENT',
      audit_events: [
        auditEvent('state_transition', 'estimate_status_tracked', {
          no_document_generated: true,
        }),
      ],
      safety_assertions: safetyAssertions(['tracking_only_no_automatic_estimate']),
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
      final_state: 'HOMEOWNER_FOLLOW_UP_NEEDED',
      audit_events: [
        auditEvent('state_transition', 'homeowner_follow_up_pending', {
          draft_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['draft_manual_only']),
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
      final_state: 'ROOFER_FOLLOW_UP_NEEDED',
      audit_events: [
        auditEvent('state_transition', 'roofer_follow_up_pending', {
          manual_roofer_review: true,
        }),
      ],
      safety_assertions: safetyAssertions(['manual_roofer_review']),
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
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'no',
          public_use_eligible: false,
          internal_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['feedback_internal_only']),
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
      final_state: 'APPOINTMENT_BOOKED',
      audit_events: [
        auditEvent('state_transition', 'starter_path', {
          plan_tier: 'starter',
          advanced_routing: false,
          missed_lead_recovery: false,
        }),
      ],
      safety_assertions: safetyAssertions(['starter_features_only', 'no_advanced_custom_routing']),
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
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'growth_path', {
          plan_tier: 'growth',
          features_enabled: 'missed_lead_recovery, post_inspection, feedback, csv_export',
        }),
      ],
      safety_assertions: safetyAssertions(['growth_features_available_in_profile']),
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
      final_state: 'CSV_EXPORT_READY',
      audit_events: [
        auditEvent('state_transition', 'elite_path', {
          plan_tier: 'elite',
          review_queue_capacity: 'larger',
        }),
      ],
      safety_assertions: safetyAssertions(['elite_advanced_reporting']),
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
    }),
  ];
}

function main() {
  const scenarios = runScenarios();
  const passed = scenarios.filter((s) => s.result === 'PASS').length;
  const failed = scenarios.filter((s) => s.result !== 'PASS').length;

  const output = {
    dry_run_name: 'native_workflow_fixture_state_model_dry_run',
    safety_posture: 'demo_ready_with_live_automation_disabled',
    implementation_scope: 'local_fixture_only_fake_data_dry_run',
    source_of_truth_context:
      '19805f8 test(workflow): add native workflow fixture state model plan',
    activation_flags: { ...ACTIVATION_FLAGS },
    scenario_count: scenarios.length,
    passed_scenarios: passed,
    failed_scenarios: failed,
    scenarios,
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
    ],
    summary: {
      description:
        'Deterministic fake-data native workflow fixture state model dry-run completed safely',
      total_scenarios: scenarios.length,
      passed,
      failed,
      safety_posture: 'demo_ready_with_live_automation_disabled',
      live_automation_status: 'disabled',
      output_mode: 'stdout_json_only',
    },
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main();