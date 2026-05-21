interface Lead {
  id?: string;
  name: string;
  phone: string;
  address?: string;
  source?: string;
  status?: string;
}

class LeadService {
  async createLead(leadData: Lead) {
    // TODO: Add Supabase logic later
    console.log('Creating lead:', leadData);
    return { ...leadData, id: 'temp-id', status: 'new' };
  }

  async getLeads() {
    // TODO: Add Supabase logic later
    return [];
  }
}

export default new LeadService();
