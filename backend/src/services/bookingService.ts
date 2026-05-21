interface Booking {
  leadId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

class BookingService {
  async createBooking(booking: Booking) {
    console.log('Creating booking:', booking);
    return { ...booking, id: 'temp-booking-id', status: 'pending' };
  }

  async confirmBooking(bookingId: string) {
    console.log('Confirming booking:', bookingId);
    return { success: true, status: 'confirmed' };
  }
}

export default new BookingService();
