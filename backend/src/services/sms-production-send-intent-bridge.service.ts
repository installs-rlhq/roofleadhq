import {
  planSmsSendIntent,
  type SmsSendIntentPlannerResult
} from './sms-send-intent-planner.service';

export interface SmsProductionSendIntentBridgeApplication {
  follow_up_id?: string;
  roofer_id?: string;
  lead_id?: string;
  action: string;
  reason: string;
}

export interface SmsProductionSendIntentBridgeWritePlan {
  messageInsertPlan?: {
    lead_id?: string | null;
    to_number?: string | null;
    from_number?: string | null;
    message_body?: string | null;
  } | null;
}

export interface SmsProductionSendIntentBridgeInput {
  application?: SmsProductionSendIntentBridgeApplication | null;
  writePlan?: SmsProductionSendIntentBridgeWritePlan | null;
  approved_follow_up_id?: string;
  run_id?: string;
}

export interface SmsProductionSendIntentBridgeResult extends SmsSendIntentPlannerResult {
  bridgedFromProductionRunner: true;
}

function isValidApplication(
  application?: SmsProductionSendIntentBridgeApplication | null
): application is SmsProductionSendIntentBridgeApplication {
  return Boolean(application);
}

export function bridgeProductionRunnerToSmsSendIntent(
  input: SmsProductionSendIntentBridgeInput
): SmsProductionSendIntentBridgeResult {
  const application = input.application;
  const writePlan = input.writePlan;
  const messageInsertPlan = writePlan?.messageInsertPlan || null;

  if (!isValidApplication(application)) {
    return {
      bridgedFromProductionRunner: true,
      shouldSend: false,
      reason: 'missing_required_field',
      sendIntent: null,
      noSmsSent: true,
      noTwilioCallsMade: true
    };
  }

  if (application.action !== 'send') {
    return {
      bridgedFromProductionRunner: true,
      shouldSend: false,
      reason: 'missing_required_field',
      sendIntent: null,
      noSmsSent: true,
      noTwilioCallsMade: true
    };
  }

  if (application.reason !== 'eligible') {
    return {
      bridgedFromProductionRunner: true,
      shouldSend: false,
      reason: 'missing_required_field',
      sendIntent: null,
      noSmsSent: true,
      noTwilioCallsMade: true
    };
  }

  const result = planSmsSendIntent({
    roofer_id: application.roofer_id,
    lead_id: application.lead_id || messageInsertPlan?.lead_id || undefined,
    follow_up_id: application.follow_up_id,
    to: messageInsertPlan?.to_number || undefined,
    from: messageInsertPlan?.from_number || undefined,
    body: messageInsertPlan?.message_body || undefined,
    approved_follow_up_id: input.approved_follow_up_id,
    run_id: input.run_id
  });

  return {
    ...result,
    bridgedFromProductionRunner: true
  };
}
