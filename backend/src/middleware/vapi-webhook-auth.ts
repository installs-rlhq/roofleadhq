import { Request, Response, NextFunction } from 'express';
import { timingSafeEqual } from 'crypto';
import config from '../config/config';

/**
 * Build 232 — fail-closed shared-secret guard for the Vapi post-call webhook.
 *
 * Closes the Build 231 finding: `POST /webhooks/vapi/call-completed` performed mutating
 * Supabase writes (calls/leads/bookings) with NO signature/secret validation. This guard runs
 * BEFORE the route handler (and therefore before any service/Supabase access), so unauthenticated
 * traffic fails closed and never reaches a write path.
 *
 * The secret is read from the `VAPI_WEBHOOK_SECRET` env var (via config). It is never logged or
 * echoed in any response. Accepted request headers (either is sufficient):
 *   - `Authorization: Bearer <VAPI_WEBHOOK_SECRET>`
 *   - `x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>`
 *
 * Comparison is constant-time to avoid leaking the secret via timing.
 */

const BEARER_PREFIX = /^Bearer\s+/i;

/**
 * Extract the candidate shared secret a request presents, checking both accepted headers.
 * `Authorization: Bearer <secret>` takes precedence; falls back to `x-vapi-webhook-secret`.
 * Returns null when neither header carries a usable value.
 */
export function extractProvidedSecret(headers: {
  authorization?: string | string[] | undefined;
  'x-vapi-webhook-secret'?: string | string[] | undefined;
}): string | null {
  const single = (value: string | string[] | undefined): string | undefined =>
    Array.isArray(value) ? value[0] : value;

  const authHeader = single(headers.authorization);
  if (typeof authHeader === 'string' && BEARER_PREFIX.test(authHeader)) {
    const token = authHeader.replace(BEARER_PREFIX, '').trim();
    if (token) {
      return token;
    }
  }

  const sharedHeader = single(headers['x-vapi-webhook-secret']);
  if (typeof sharedHeader === 'string' && sharedHeader.trim()) {
    return sharedHeader.trim();
  }

  return null;
}

/**
 * Constant-time equality. Returns false unless both inputs are non-empty strings of equal length
 * with identical bytes. Never throws on length mismatch (timingSafeEqual would otherwise throw).
 */
export function secretsMatch(expected: string, provided: string): boolean {
  if (!expected || !provided) {
    return false;
  }

  const expectedBuf = Buffer.from(expected, 'utf8');
  const providedBuf = Buffer.from(provided, 'utf8');

  if (expectedBuf.length !== providedBuf.length) {
    return false;
  }

  return timingSafeEqual(expectedBuf, providedBuf);
}

/**
 * Decide authorization purely from the configured secret and the request headers. Fails closed:
 *   - 'missing_secret_config'  → VAPI_WEBHOOK_SECRET is not set in the runtime.
 *   - 'missing_request_secret' → request presented neither accepted header.
 *   - 'invalid_secret'         → request secret did not match.
 *   - null                     → authorized.
 */
export function evaluateVapiWebhookAuth(
  configuredSecret: string,
  headers: Parameters<typeof extractProvidedSecret>[0]
): 'missing_secret_config' | 'missing_request_secret' | 'invalid_secret' | null {
  if (!configuredSecret) {
    return 'missing_secret_config';
  }

  const provided = extractProvidedSecret(headers);
  if (!provided) {
    return 'missing_request_secret';
  }

  if (!secretsMatch(configuredSecret, provided)) {
    return 'invalid_secret';
  }

  return null;
}

/**
 * Express middleware. Rejects before the handler unless the configured secret is present in the
 * runtime AND the request supplies a matching secret via an accepted header. The secret value is
 * never logged or returned.
 */
export function requireVapiWebhookSecret(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reason = evaluateVapiWebhookAuth(config.vapiWebhookSecret, req.headers);

  if (reason === 'missing_secret_config') {
    console.error(
      'Vapi webhook rejected: VAPI_WEBHOOK_SECRET is not configured in this runtime'
    );
    return res.status(503).json({ ok: false, error: 'webhook_auth_not_configured' });
  }

  if (reason === 'missing_request_secret' || reason === 'invalid_secret') {
    console.warn('Vapi webhook rejected: unauthorized request (reason=' + reason + ')');
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  return next();
}
