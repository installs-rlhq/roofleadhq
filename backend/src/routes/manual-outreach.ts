import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

const router = Router();

// Service role client for server-side writes (dry-run endpoint only)
if (!config.supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for manual outreach dry-run endpoint');
}

const supabaseService = createClient(
  config.supabaseUrl,
  config.supabaseServiceRoleKey
);

const VALID_SOURCE_DETAILS = ['angi', 'thumbtack', 'referral', 'homeadvisor', 'other', 'unknown'] as const;
type SourceDetail = typeof VALID_SOURCE_DETAILS[number];

interface ManualOutreachRequest {
  roofer_id: string;
  homeowner_phone: string;
  homeowner_name?: string;
  source_detail?: string;
  issue_description?: string;
  dry_run: boolean;
}

function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{1,14}$/.test(phone);
}

router.post('/test', async (req: Request, res: Response) => {
  const body = req.body as ManualOutreachRequest;

  // Safety guard
  if (!body.dry_run) {
    return res.status(400).json({
      success: false,
      dry_run: false,
      error: 'This endpoint only accepts dry_run: true'
    });
  }

  // Validation
  if (!body.roofer_id) {
    return res.status(400).json({ success: false, dry_run: true, error: 'roofer_id is required' });
  }

  if (!body.homeowner_phone || !isValidE164(body.homeowner_phone)) {
    return res.status(400).json({ success: false, dry_run: true, error: 'homeowner_phone must be valid E.164 format' });
  }

  let sourceDetail: SourceDetail = 'unknown';
  if (body.source_detail) {
    if (VALID_SOURCE_DETAILS.includes(body.source_detail as SourceDetail)) {
      sourceDetail = body.source_detail as SourceDetail;
    } else {
      return res.status(400).json({ success: false, dry_run: true, error: 'Invalid source_detail' });
    }
  }

  try {
    // 1. Verify roofer exists
    const { data: roofer, error: rooferError } = await supabaseService
      .from('roofers')
      .select('id')
      .eq('id', body.roofer_id)
      .single();

    if (rooferError || !roofer) {
      return res.status(404).json({ success: false, dry_run: true, error: 'Roofer not found' });
    }

    // 2. Insert lead
    const { data: lead, error: leadError } = await supabaseService
      .from('leads')
      .insert({
        roofer_id: body.roofer_id,
        source_path: 'manual',
        source_detail: sourceDetail,
        homeowner_name: body.homeowner_name || null,
        phone: body.homeowner_phone,
        issue_description: body.issue_description || null,
        status: 'new',
        is_eligible: true,
        service_area_match: true
      })
      .select()
      .single();

    if (leadError || !lead) {
      return res.status(500).json({ success: false, dry_run: true, error: leadError?.message || 'Failed to create lead' });
    }

    const leadId = lead.id;

    // 3. Insert workflow_events
    const workflowEvents = [
      { roofer_id: body.roofer_id, lead_id: leadId, event_type: 'manual_outreach_received' },
      { roofer_id: body.roofer_id, lead_id: leadId, event_type: 'lead_created' },
      { roofer_id: body.roofer_id, lead_id: leadId, event_type: 'followup_scheduled' }
    ];

    const { error: eventsError } = await supabaseService
      .from('workflow_events')
      .insert(workflowEvents);

    if (eventsError) {
      return res.status(500).json({ success: false, dry_run: true, error: 'Failed to create workflow events' });
    }

    // 4. Insert follow_ups
    const now = new Date();
    const followUps = [
      { roofer_id: body.roofer_id, lead_id: leadId, followup_type: 'initial', scheduled_for: now.toISOString() },
      { roofer_id: body.roofer_id, lead_id: leadId, followup_type: '2h', scheduled_for: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString() },
      { roofer_id: body.roofer_id, lead_id: leadId, followup_type: '12h', scheduled_for: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString() },
      { roofer_id: body.roofer_id, lead_id: leadId, followup_type: '24h', scheduled_for: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString() }
    ];

    const { error: followUpError } = await supabaseService
      .from('follow_ups')
      .insert(followUps);

    if (followUpError) {
      return res.status(500).json({ success: false, dry_run: true, error: 'Failed to create follow-ups' });
    }

    // Success response
    return res.json({
      success: true,
      dry_run: true,
      lead_id: leadId,
      follow_up_count: 4,
      workflow_event_count: 3
    });

  } catch (err: any) {
    return res.status(500).json({ success: false, dry_run: true, error: err.message || 'Unexpected error' });
  }
});

export default router;
