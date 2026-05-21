name: Qualification & Routing
description: Score, qualify, and intelligently route leads to the right roofer or automation flow
version: 0.1.0
triggers:
  - pipeline: lead-intake
  - manual

steps:
  - name: Load Lead
    type: supabase
    action: get
    table: leads
    id: "{{ input.lead_id }}"

  - name: Load Client Config
    type: config
    action: get_client
    input:
      client_id: "{{ input.client_id }}"

  - name: Apply Qualification Rules
    type: rules_engine
    action: evaluate
    input:
      lead: "{{ steps.load_lead }}"
      client_rules: "{{ steps.load_client_config.qualification_rules }}"
      defaults: "{{ master_config.defaults }}"
    output:
      qualification:
        score: "{{ rules.score }}"
        status: "{{ rules.status }}"  # hot, warm, cold, unqualified
        reason: "{{ rules.reason }}"
        priority: "{{ rules.priority }}"

  - name: Update Lead Status
    type: supabase
    action: update
    table: leads
    id: "{{ steps.load_lead.id }}"
    input:
      qualification_score: "{{ steps.apply_qualification_rules.qualification.score }}"
      status: "{{ steps.apply_qualification_rules.qualification.status }}"
      routed_at: "{{ now() }}"

  - name: Route Decision
    type: conditional
    condition: "{{ steps.apply_qualification_rules.qualification.status }}"
    hot:
      - name: Immediate SMS + Voice
        type: pipeline
        action: invoke
        target: "pipelines/follow-up.lobster"
        input:
          lead_id: "{{ steps.load_lead.id }}"
          urgency: "immediate"
    warm:
      - name: Standard Follow-up Sequence
        type: pipeline
        action: invoke
        target: "pipelines/follow-up.lobster"
        input:
          lead_id: "{{ steps.load_lead.id }}"
          urgency: "standard"
    cold:
      - name: Nurture Sequence
        type: pipeline
        action: invoke
        target: "pipelines/follow-up.lobster"
        input:
          lead_id: "{{ steps.load_lead.id }}"
          urgency: "nurture"
    unqualified:
      - name: Archive Lead
        type: supabase
        action: update
        table: leads
        id: "{{ steps.load_lead.id }}"
        input:
          status: "unqualified"
          archived_at: "{{ now() }}"

  - name: Log Routing Event
    type: logging
    action: record
    input:
      event: "lead_routed"
      lead_id: "{{ steps.load_lead.id }}"
      qualification: "{{ steps.apply_qualification_rules.qualification }}"
      timestamp: "{{ now() }}"

outputs:
  success: true
  lead_id: "{{ steps.load_lead.id }}"
  qualification: "{{ steps.apply_qualification_rules.qualification }}"