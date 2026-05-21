import supabase from '../integrations/supabase';
import { Lead } from '../types';

class LeadService {
  async createLead(leadData: Lead) {
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default new LeadService();
