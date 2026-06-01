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
      .gte('created_at', firstOfMonth);

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


router.get('/overview', async (req: Request, res: Response) => {
  try {
    const requestedRooferId =
      typeof req.query.roofer_id === 'string' && req.query.roofer_id.trim().length > 0
        ? req.query.roofer_id.trim()
        : null;

    const rooferId = requestedRooferId || TEST_ROOFER_ID;
    const now = new Date().toISOString();
    const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

    const { count: leadsThisMonth, error: leadsError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .gte('created_at', firstOfMonth);
    if (leadsError) throw leadsError;

    const { count: bookedThisMonth, error: bookedError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .gte('created_at', firstOfMonth);
    if (bookedError) throw bookedError;

    const { count: needsAttentionCount, error: attentionCountError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .eq('status', 'needs_attention');
    if (attentionCountError) throw attentionCountError;

    const { count: scheduledFollowUps, error: scheduledFollowUpsError } = await supabase
      .from('follow_ups')
      .select('id', { count: 'exact', head: true })
      .eq('roofer_id', rooferId)
      .eq('status', 'scheduled');
    if (scheduledFollowUpsError) throw scheduledFollowUpsError;

    const { data: leadsNeedingAttentionRows, error: attentionRowsError } = await supabase
      .from('leads')
      .select('id,homeowner_name,phone,source_path,source_detail,issue_description,urgency,status,created_at,updated_at')
      .eq('roofer_id', rooferId)
      .eq('status', 'needs_attention')
      .order('updated_at', { ascending: false })
      .limit(8);
    if (attentionRowsError) throw attentionRowsError;

    const { data: upcomingRows, error: upcomingError } = await supabase
      .from('bookings')
      .select('id,lead_id,booked_time,status,sms_confirmation_status,reminder_sent_at,leads(homeowner_name,address,issue_description,source_path,source_detail)')
      .eq('roofer_id', rooferId)
      .eq('status', 'scheduled')
      .gte('booked_time', now)
      .order('booked_time', { ascending: true })
      .limit(8);
    if (upcomingError) throw upcomingError;

    const { data: sourceRows, error: sourceError } = await supabase
      .from('leads')
      .select('source_path,source_detail,status')
      .eq('roofer_id', rooferId);
    if (sourceError) throw sourceError;

    const { data: followUpRows, error: followUpError } = await supabase
      .from('follow_ups')
      .select('status')
      .eq('roofer_id', rooferId);
    if (followUpError) throw followUpError;

    const bookingRate = leadsThisMonth && leadsThisMonth > 0
      ? Math.round(((bookedThisMonth || 0) / leadsThisMonth) * 100)
      : 0;

    const sourceMap: Record<string, { sourcePath: string; sourceDetail: string; leads: number; booked: number; bookingRate: number }> = {};
    (sourceRows || []).forEach((row: any) => {
      const sourcePath = row.source_path || 'unknown';
      const sourceDetail = row.source_detail || 'unknown';
      const key = `${sourcePath}:${sourceDetail}`;
      if (!sourceMap[key]) sourceMap[key] = { sourcePath, sourceDetail, leads: 0, booked: 0, bookingRate: 0 };
      sourceMap[key].leads += 1;
      if (row.status === 'booked') sourceMap[key].booked += 1;
    });

    const topSources = Object.values(sourceMap)
      .map((source) => ({
        ...source,
        bookingRate: source.leads > 0 ? Math.round((source.booked / source.leads) * 100) : 0,
      }))
      .sort((a, b) => b.leads - a.leads)
      .slice(0, 8);

    const followUpPerformance = { scheduled: 0, sent: 0, skipped: 0, failed: 0 };
    (followUpRows || []).forEach((row: any) => {
      if (row.status in followUpPerformance) {
        followUpPerformance[row.status as keyof typeof followUpPerformance] += 1;
      }
    });

    const leadsNeedingAttention = (leadsNeedingAttentionRows || []).map((lead: any) => ({
      id: lead.id,
      homeownerName: lead.homeowner_name || 'Unknown homeowner',
      phone: maskPhone(lead.phone || null),
      sourcePath: lead.source_path || 'unknown',
      sourceDetail: lead.source_detail || 'unknown',
      issueDescription: lead.issue_description || '',
      urgency: lead.urgency || 'normal',
      status: lead.status,
      createdAt: lead.created_at,
      updatedAt: lead.updated_at,
    }));

    const upcomingInspections = (upcomingRows || []).map((booking: any) => {
      const lead = Array.isArray(booking.leads) ? booking.leads[0] : booking.leads;
      return {
        bookingId: booking.id,
        leadId: booking.lead_id,
        homeownerName: lead?.homeowner_name || 'Unknown homeowner',
        address: lead?.address || '',
        issueDescription: lead?.issue_description || '',
        bookedTime: booking.booked_time,
        sourcePath: lead?.source_path || 'unknown',
        sourceDetail: lead?.source_detail || 'unknown',
        confirmationStatus: booking.sms_confirmation_status || 'pending',
        reminderStatus: booking.reminder_sent_at ? 'sent' : 'pending',
      };
    });

    const recommendedActions: string[] = [];
    if ((needsAttentionCount || 0) > 0) recommendedActions.push('Review leads needing attention today.');
    if (topSources.some((source) => source.sourcePath === 'manual')) recommendedActions.push('Keep sending marketplace/referral leads into RoofLeadHQ.');
    if (leadsNeedingAttention.some((lead) => lead.sourcePath === 'phone')) recommendedActions.push('Review phone leads that requested callbacks.');
    if (followUpPerformance.failed > 0) recommendedActions.push('Review failed follow-ups.');
    if (recommendedActions.length === 0) recommendedActions.push('No urgent dashboard actions right now.');

    res.json({
      metrics: [
        { label: 'New Leads This Month', value: leadsThisMonth || 0 },
        { label: 'Booked Inspections This Month', value: bookedThisMonth || 0 },
        { label: 'Booking Rate', value: `${bookingRate}%` },
        { label: 'Leads Needing Attention', value: needsAttentionCount || 0 },
        { label: 'Follow-Ups Scheduled', value: scheduledFollowUps || 0 },
        { label: 'Phone Leads', value: topSources.filter((source) => source.sourcePath === 'phone').reduce((sum, source) => sum + source.leads, 0) },
        { label: 'Manual Outreach Leads', value: topSources.filter((source) => source.sourcePath === 'manual').reduce((sum, source) => sum + source.leads, 0) },
        { label: 'Digital Leads', value: topSources.filter((source) => source.sourcePath === 'digital').reduce((sum, source) => sum + source.leads, 0) },
      ],
      leadsNeedingAttention,
      upcomingInspections,
      topSources,
      followUpPerformance,
      recommendedActions,
    });
  } catch (error: any) {
    console.error('Dashboard overview error:', error.message);
    res.status(500).json({ error: 'Failed to load dashboard overview data' });
  }
});


export default router;
