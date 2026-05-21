export interface Lead {
  id?: string;
  name: string;
  phone: string;
  address?: string;
  source?: string;
  status?: string;
  createdAt?: Date;
}

export interface Call {
  callId: string;
  phone: string;
  duration?: number;
  status?: string;
  transcript?: string;
}

export interface Booking {
  leadId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}
