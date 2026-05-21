import supabase from '../integrations/supabase';

interface FollowUp {
  leadId: string;
  type: 'sms' | 'email' | 'call';
  message: string;
  scheduledAt?: Date;
}

class FollowUpService {
  async scheduleFollowUp(followUp: FollowUp) {
    const { data, error } = await supabase
      .from('follow_ups')
      .insert([followUp])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPendingFollowUps() {
    const { data, error } = await supabase
      .from('follow_ups')
      .select('*')
      .eq('status', 'pending');

    if (error) throw error;
    return data;
  }
}

export default new FollowUpService();
