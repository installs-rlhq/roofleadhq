import supabase from '../integrations/supabase';

interface CallData {
  callId: string;
  phone: string;
  duration?: number;
  status?: string;
  transcript?: string;
}

class CallService {
  async logCall(callData: CallData) {
    const { data, error } = await supabase
      .from('calls')
      .insert([callData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCalls() {
    const { data, error } = await supabase
      .from('calls')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default new CallService();
