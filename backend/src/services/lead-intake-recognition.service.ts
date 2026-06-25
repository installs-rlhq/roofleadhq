/**
 * Lead Intake Recognition Service — native, pure, production-aligned.
 *
 * Pure module. No network clients, no environment access, no secret handling, no external calls,
 * no database access. Given a synthetic or real inbound lead, it recognizes whether the inbound is a
 * roof-inspection request, normalizes the lead source label, and decides how the lead routes for
 * follow-up. This is the recognition + source/routing step that sits in front of the SMS dispatcher
 * planner and follow-up state.
 *
 * It records LABELS and BOOLEANS only — it never reads, stores, or echoes raw phone numbers, email
 * addresses, secret values, or production data.
 */

// Source labels recognized by the native intake path (superset aligned with manual outreach vocab).
export const RECOGNIZED_SOURCE_LABELS = [
  'website_form',
  'paid_lead_marketplace',
  'phone_summary',
  'angi',
  'thumbtack',
  'referral',
  'homeadvisor',
  'manual',
  'other',
  'unknown'
] as const;

export type RecognizedSourceLabel = typeof RECOGNIZED_SOURCE_LABELS[number];

// Keywords that mark an inbound as a roof-inspection request.
const ROOF_INSPECTION_KEYWORDS = [
  'roof',
  'inspection',
  'inspect',
  'leak',
  'shingle',
  'hail',
  'storm',
  'gutter',
  'flashing'
];

export type LeadRoutingTarget = 'roof_inspection_follow_up' | 'manual_operator_review' | 'unrouted';

export interface LeadIntakeRecognitionInput {
  /** Free-text description of the inbound request (synthetic in local validation). */
  issueText?: string;
  /** Raw source label as received; normalized against RECOGNIZED_SOURCE_LABELS. */
  sourceLabel?: string;
  /** Whether the inbound falls inside the roofer service area (defaults to true when omitted). */
  serviceAreaMatch?: boolean;
}

export interface LeadIntakeRecognitionResult {
  /** True when the inbound text is recognized as a roof-inspection request. */
  isRoofInspectionRequest: boolean;
  /** Recognized inbound type label. */
  recognizedType: 'roof_inspection_request' | 'unrecognized_inbound';
  /** Keywords that triggered recognition (deduped, ordered). */
  matchedKeywords: string[];
  /** Normalized source label (falls back to 'unknown'). */
  normalizedSourceLabel: RecognizedSourceLabel;
  /** True when the raw source label was a recognized value (not coerced to 'unknown'). */
  sourceLabelRecognized: boolean;
  /** Where this lead routes next. */
  routedFor: LeadRoutingTarget;
  /** Whether the lead is eligible to proceed toward a roofer notification. */
  isEligible: boolean;
}

export function normalizeSourceLabel(sourceLabel?: string): {
  normalizedSourceLabel: RecognizedSourceLabel;
  sourceLabelRecognized: boolean;
} {
  if (!sourceLabel) {
    return { normalizedSourceLabel: 'unknown', sourceLabelRecognized: false };
  }
  const lowered = sourceLabel.trim().toLowerCase();
  const match = RECOGNIZED_SOURCE_LABELS.find((label) => label === lowered);
  if (match) {
    return { normalizedSourceLabel: match, sourceLabelRecognized: true };
  }
  return { normalizedSourceLabel: 'unknown', sourceLabelRecognized: false };
}

export function recognizeRoofInspectionRequest(issueText?: string): {
  isRoofInspectionRequest: boolean;
  matchedKeywords: string[];
} {
  if (!issueText || typeof issueText !== 'string') {
    return { isRoofInspectionRequest: false, matchedKeywords: [] };
  }
  const lowered = issueText.toLowerCase();
  const matched: string[] = [];
  for (const keyword of ROOF_INSPECTION_KEYWORDS) {
    if (lowered.includes(keyword) && !matched.includes(keyword)) {
      matched.push(keyword);
    }
  }
  return { isRoofInspectionRequest: matched.length > 0, matchedKeywords: matched };
}

export function recognizeLeadIntake(
  input: LeadIntakeRecognitionInput
): LeadIntakeRecognitionResult {
  const { isRoofInspectionRequest, matchedKeywords } = recognizeRoofInspectionRequest(input.issueText);
  const { normalizedSourceLabel, sourceLabelRecognized } = normalizeSourceLabel(input.sourceLabel);
  const serviceAreaMatch = input.serviceAreaMatch !== false;

  let routedFor: LeadRoutingTarget = 'unrouted';
  if (isRoofInspectionRequest && serviceAreaMatch) {
    routedFor = 'roof_inspection_follow_up';
  } else if (isRoofInspectionRequest && !serviceAreaMatch) {
    routedFor = 'manual_operator_review';
  }

  return {
    isRoofInspectionRequest,
    recognizedType: isRoofInspectionRequest ? 'roof_inspection_request' : 'unrecognized_inbound',
    matchedKeywords,
    normalizedSourceLabel,
    sourceLabelRecognized,
    routedFor,
    isEligible: isRoofInspectionRequest && serviceAreaMatch
  };
}
