interface FollowUp {
  leadId: string;
  type: 'sms' | 'email' | 'call';
  message: string;
  scheduledAt?: Date;
}

class FollowUpService {
  async scheduleFollowUp(followUp: FollowUp) {
    console.log('Scheduling follow-up:', followUp);
    return { ...followUp, status: 'scheduled' };
  }

  async sendFollowUp(followUpId: string) {
    console.log('Sending follow-up:', followUpId);
    return { success: true };
  }
}

export default new FollowUpService();
