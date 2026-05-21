name: Follow-up Sequences
description: Multi-channel automated SMS + voice follow-ups with configurable cadences
version: 0.1.0
triggers:
  - pipeline: qualification-routing
  - scheduler: daily

steps:
  - name: Load Lead & Client
    type: parallel
    actions:
      - supabase: get lead
      - config: get_client

  - name: Determine Cadence
    type: config
    action: resolve_cadence
    input:
      urgency: "{{ input.urgency }}"
      client_cadence: "{{ client.follow_up_cadence }}"
      defaults: "{{ master_config.defaults.follow_up_cadence }}"

  - name: Send SMS Sequence
    type: twilio
    action: send_sms
    input:
      to: "{{ lead.phone }}"
      messages:
        - delay_minutes: "{{ cadence.sms[0] }}"
          template: "sms_initial"
        - delay_minutes: "{{ cadence.sms[1] }}"
          template: "sms_followup_1"
        - delay_minutes: "{{ cadence.sms[2] }}"
          template: "sms_followup_2"
        - delay_minutes: "{{ cadence.sms[3] }}"
          template: "sms_stale"

  - name: Schedule Voice Follow-ups
    type: retell
    action: schedule_call
    input:
      lead_id: "{{ lead.id }}"
      phone: "{{ lead.phone }}"
      delays: "{{ cadence.voice }}"
      prompt_version: "{{ client.retell.prompt_version }}"

  - name: Update Lead Timeline
    type: supabase
    action: update
    table: leads
    input:
      follow_up_status: "in_progress"
      next_action_at: "{{ calculate_next_action(cadence) }}"

outputs:
  success: true
  lead_id: "{{ lead.id }}"
  cadence_used: "{{ cadence }}"