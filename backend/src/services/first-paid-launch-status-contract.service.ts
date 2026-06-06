export interface FirstPaidLaunchStatusContract {
  status: string;
  sourceOfTruthCommit: string;
  liveAutomation: {
    sms: boolean;
    twilio: boolean;
    calendar: boolean;
    vapiOutbound: boolean;
    resend: boolean;
    lindy: boolean;
  };
  safetyStatements: string[];
  businessLanguage: {
    offerName: string;
    appointmentLanguage: string;
  };
  operatorNextActions: string[];
}

export function getFirstPaidLaunchStatusContract(): FirstPaidLaunchStatusContract {
  return {
    status: 'demo_ready_with_live_automation_disabled',
    sourceOfTruthCommit: '19d0272 docs(pilot): add launch control center',
    liveAutomation: {
      sms: false,
      twilio: false,
      calendar: false,
      vapiOutbound: false,
      resend: false,
      lindy: false
    },
    safetyStatements: [
      'Homeowner SMS is not live',
      'Roofer reply SMS is not live',
      'Twilio sending is not live',
      'Live SMS approval package is stale',
      'Step 66 production send intent bridge is fake-only',
      'Manual Outreach Path C is dry-run/test-safe unless separately approved',
      'No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval'
    ],
    businessLanguage: {
      offerName: 'Founder-Led Launch Program',
      appointmentLanguage: 'book inspections / book appointments'
    },
    operatorNextActions: [
      'confirm contractor setup',
      'run demo flow',
      'verify manual outreach path remains dry-run/test-safe',
      'confirm explicit approval before any live automation'
    ]
  };
}
