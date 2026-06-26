/**
 * Human Takeover / Escalation routes (Build 225).
 *
 * Thin HTTP mapper over lead-takeover.service. Uses the SAME dashboard-token auth pattern as
 * routes/dashboard.ts (hashed token -> roofers.dashboard_access_token_hash, access enabled) and
 * scopes every action to the authenticated roofer. Verifies lead ownership before any mutation
 * (404 for non-owned), 401 for a bad/missing token.
 *
 * Runtime safety: all state changes flow through the service's schema-readiness gate. Until the
 * Build 225 migration is applied AND HUMAN_TAKEOVER_SCHEMA_READY=true, the mutating endpoints return
 * a documented 503 schema_not_applied WITHOUT querying any not-yet-existing column, and pending-review
 * returns an empty, schema-not-ready placeholder with 200. No SMS, no provider call, no credential use.
 */

import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import config from '../config/config';
import {
  takeOverLead,
  releaseLead,
  markHandled,
  getPendingReview,
  isHumanTakeoverSchemaReady
} from '../services/lead-takeover.service';

const router = Router();

const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

function getDashboardToken(req: Request): string {
  return typeof req.headers['x-dashboard-access-token'] === 'string'
    ? (req.headers['x-dashboard-access-token'] as string).trim()
    : typeof req.query.token === 'string'
      ? req.query.token.trim()
      : '';
}

function hashDashboardToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function resolveDashboardRooferId(req: Request, res: Response): Promise<string | null> {
  const providedToken = getDashboardToken(req);

  if (!providedToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  const tokenHash = hashDashboardToken(providedToken);

  const { data, error } = await supabase
    .from('roofers')
    .select('id')
    .eq('dashboard_access_token_hash', tokenHash)
    .eq('dashboard_access_enabled', true)
    .single();

  if (error || !data?.id) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  return data.id;
}

// GET /api/leads/pending-review — leads currently flagged for human takeover (newest first, masked).
router.get('/pending-review', async (req: Request, res: Response) => {
  try {
    const rooferId = await resolveDashboardRooferId(req, res);
    if (!rooferId) return;

    const result = await getPendingReview({
      supabase,
      schemaReady: isHumanTakeoverSchemaReady(),
      rooferId
    });

    return res.status(result.httpStatus).json({
      schemaReady: result.schemaReady,
      count: result.count,
      pendingReview: result.pendingReview
    });
  } catch (error: any) {
    console.error('Pending review error:', error.message);
    return res.status(500).json({ error: 'Failed to load pending review' });
  }
});

// POST /api/leads/:id/takeover — pause automation for this lead and assign it to the roofer.
router.post('/:id/takeover', async (req: Request, res: Response) => {
  try {
    const rooferId = await resolveDashboardRooferId(req, res);
    if (!rooferId) return;

    const result = await takeOverLead({
      supabase,
      schemaReady: isHumanTakeoverSchemaReady(),
      rooferId,
      leadId: req.params.id,
      notes: typeof req.body?.notes === 'string' ? req.body.notes : null
    });

    return res.status(result.httpStatus).json({
      ok: result.ok,
      reason: result.reason,
      schemaReady: result.schemaReady,
      lead: result.lead
    });
  } catch (error: any) {
    console.error('Lead takeover error:', error.message);
    return res.status(500).json({ error: 'Failed to take over lead' });
  }
});

// POST /api/leads/:id/release — resume automation, or mark handled when resolution=resolved.
router.post('/:id/release', async (req: Request, res: Response) => {
  try {
    const rooferId = await resolveDashboardRooferId(req, res);
    if (!rooferId) return;

    const resolution = req.body?.resolution === 'resolved' ? 'resolved' : 'released';
    const notes = typeof req.body?.notes === 'string' ? req.body.notes : null;
    const args = {
      supabase,
      schemaReady: isHumanTakeoverSchemaReady(),
      rooferId,
      leadId: req.params.id,
      notes
    };

    const result =
      resolution === 'resolved' ? await markHandled(args) : await releaseLead(args);

    return res.status(result.httpStatus).json({
      ok: result.ok,
      reason: result.reason,
      schemaReady: result.schemaReady,
      resolution,
      lead: result.lead
    });
  } catch (error: any) {
    console.error('Lead release error:', error.message);
    return res.status(500).json({ error: 'Failed to release lead' });
  }
});

export default router;
