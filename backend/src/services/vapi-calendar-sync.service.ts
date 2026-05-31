import { createClient } from '@supabase/supabase-js';

export type VapiCalendarSyncResult = {
  dryRun: true;
  eligibleCount: number;
  reason: string;
};

export async function runVapiCalendarSyncDryRun(): Promise<VapiCalendarSyncResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      roofer_id,
      lead_id,
      booked_time,
      calendar_event_id,
      calendar_sync_status,
      roofers!inner (
        id,
        calendar_sync_enabled
      )
    `)
    .eq('status', 'scheduled')
    .is('calendar_event_id', null)
    .eq('calendar_sync_status', 'pending')
    .not('booked_time', 'is', null)
    .not('roofer_id', 'is', null)
    .not('lead_id', 'is', null)
    .eq('roofers.calendar_sync_enabled', true);

  if (error) {
    throw new Error(`Calendar sync eligibility query failed: ${error.message}`);
  }

  return {
    dryRun: true,
    eligibleCount: data?.length ?? 0,
    reason:
      (data?.length ?? 0) === 0
        ? 'No roofers have calendar_sync_enabled = true'
        : 'Eligible bookings found, but Google Calendar integration is not implemented yet',
  };
}
