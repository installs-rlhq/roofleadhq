name: Lead Intake
description: Handle inbound leads from Facebook, website forms, and call transcriptions
version: 0.1.0
triggers:
  - webhook: facebook_lead_ads
  - webhook: website_form
  - webhook: retell_transcription
  - webhook: vapi_transcription

steps:
  - name: Receive Webhook
    type: webhook
    action: parse
    input:
      source: "{{ trigger.source }}"
      payload: "{{ trigger.payload }}"

  - name: Normalize Lead Data
    type: transform
    action: normalize
    input:
      source: "{{ steps.receive_webhook.source }}"
      raw_data: "{{ steps.receive_webhook.payload }}"
    output:
      lead:
        id: "{{ generate_uuid() }}"
        source: "{{ steps.receive_webhook.source }}"
        name: "{{ normalized.name }}"
        phone: "{{ normalized.phone }}"
        email: "{{ normalized.email }}"
        address: "{{ normalized.address }}"
        project_type: "{{ normalized.project_type }}"
        urgency: "{{ normalized.urgency | default('standard') }}"
        notes: "{{ normalized.notes }}"
        received_at: "{{ now() }}"

  - name: Deduplicate Lead
    type: supabase
    action: query
    table: leads
    filters:
      phone: "{{ steps.normalize_lead_data.lead.phone }}"
      created_at: "gte:{{ now() - 48h }}"
    output:
      existing: "{{ query_result }}"
    on_error:
      - name: Log Dedup Error
        type: logging
        action: record
        input:
          event: "lead_dedup_failed"
          error: "{{ error }}"
          lead_phone: "{{ steps.normalize_lead_data.lead.phone }}"

  - name: Check Duplicate
    type: conditional
    condition: "{{ steps.deduplicate_lead.existing | length > 0 }}"
    if_true:
      - name: Mark as Duplicate
        type: supabase
        action: update
        table: leads
        id: "{{ steps.deduplicate_lead.existing[0].id }}"
        input:
          duplicate_count: "{{ existing.duplicate_count + 1 }}"
          last_seen_at: "{{ now() }}"
      - name: Skip Processing
        type: exit
        output: { duplicate: true }

  - name: Enrich Lead
    type: enrichment
    action: lookup
    input:
      lead: "{{ steps.normalize_lead_data.lead }}"
      services: "{{ master_config.clients[client_id].services }}"
    output:
      enriched_lead:
        score: "{{ enrichment.score }}"
        tags: "{{ enrichment.tags }}"
        suggested_roofer: "{{ enrichment.best_match }}"

  - name: Store Lead
    type: supabase
    action: insert
    table: leads
    input:
      lead_data: "{{ steps.normalize_lead_data.lead }}"
      enriched_score: "{{ steps.enrich_lead.enriched_lead.score }}"
      tags: "{{ steps.enrich_lead.enriched_lead.tags }}"
      status: "new"

  - name: Trigger Qualification
    type: pipeline
    action: invoke
    target: "pipelines/qualification-routing.lobster"
    input:
      lead_id: "{{ steps.store_lead.id }}"
      client_id: "{{ trigger.client_id }}"

outputs:
  success: true
  lead_id: "{{ steps.store_lead.id }}"
  duplicate: false