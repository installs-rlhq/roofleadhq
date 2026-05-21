import supabase from '../integrations/supabase';

interface Booking {
  leadId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

class BookingService {
  async createBooking(booking: Booking) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async confirmBooking(bookingId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export default new BookingService();
