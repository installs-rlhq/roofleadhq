interface CallData {
  callId: string;
  phone: string;
  duration?: number;
  status?: string;
  transcript?: string;
}

class CallService {
  async logCall(callData: CallData) {
    console.log('Logging call:', callData);
    return { ...callData, loggedAt: new Date() };
  }

  async getCalls() {
    return [];
  }
}

export default new CallService();
