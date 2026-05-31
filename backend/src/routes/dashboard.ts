import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

const router = Router();

const TEST_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';

const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

function maskPhone(phone: string | null): string {
  if (!phone) return '(***) ***-0000';
  const digits = phone.replace(/\D/g, '');
  const last4 = digits.slice(-4) || '0000';
  return `(***) ***-${last4}`;
}

router.get('/manual-outreach', async (req: Request, res: Response) => {
  try {
    const requestedRooferId =
      typeof req.query.roofer_id === 'string' && req.query.roofer_id.trim().length > 0
        ? req.query.roofer_id.trim()
        : null;

    const rooferId = requestedRooferId || TEST_ROOFER_ID;
    const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

    const { count: kpiCount, error: kpiError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .eq('source_path', 'manual')
      .gte('date_received', firstOfMonth);

    if (kpiError) throw kpiError;

    const { data: recentData, error: recentError } = await supabase
      .from('workflow_events')
      .select('event_type, created_at, leads!inner(phone, source_detail)')
      .eq('roofer_id', rooferId)
      .eq('leads.source_path', 'manual')
      .in('event_type', ['manual_outreach_received', 'followup_paused', 'followup_stopped'])
      .order('created_at', { ascending: false })
      .limit(8);

    if (recentError) throw recentError;

    const recentActivity = (recentData || []).map((row: any) => ({
      phone: maskPhone(row.leads?.phone || null),
      source: row.leads?.source_detail || 'unknown',
      command:
        row.event_type === 'manual_outreach_received'
          ? 'start'
          : row.event_type === 'followup_paused'
            ? 'pause'
            : 'stop',
      date: new Date(row.created_at).toISOString().split('T')[0],
      status:
        row.event_type === 'followup_paused'
          ? 'paused'
          : row.event_type === 'followup_stopped'
            ? 'stopped'
            : 'active',
    }));

    const { count: paused, error: pausedError } = await supabase
      .from('follow_ups')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .eq('status', 'skipped')
      .is('stopped_reason', null);

    if (pausedError) throw pausedError;

    const { count: stopped, error: stoppedError } = await supabase
      .from('follow_ups')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .eq('status', 'skipped')
      .eq('stopped_reason', 'roofer_stopped');

    if (stoppedError) throw stoppedError;

    const { count: needsAttention, error: needsAttentionError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .eq('source_path', 'manual')
      .eq('status', 'needs_attention');

    if (needsAttentionError) throw needsAttentionError;

    const { data: sourceRows, error: sourceError } = await supabase
      .from('leads')
      .select('source_detail')
      .eq('roofer_id', rooferId)
      .eq('source_path', 'manual');

    if (sourceError) throw sourceError;

    const sources: Record<string, number> = {
      angi: 0,
      thumbtack: 0,
      homeadvisor: 0,
      referral: 0,
      other: 0,
      unknown: 0,
    };

    (sourceRows || []).forEach((row: any) => {
      const source = row.source_detail || 'unknown';
      if (source in sources) {
        sources[source] += 1;
      } else {
        sources.unknown += 1;
      }
    });

    res.json({
      kpi: {
        manualOutreachLeadsThisMonth: kpiCount || 0,
        trend: null,
      },
      recentActivity,
      needsAttention: {
        paused: paused || 0,
        stopped: stopped || 0,
        needingAttention: needsAttention || 0,
      },
      sources,
    });
  } catch (error: any) {
    console.error('Dashboard manual outreach error:', error.message);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

export default router;
