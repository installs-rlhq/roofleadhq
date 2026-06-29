import { Router, Request, Response } from 'express';
import { processVapiCallCompleted } from '../services/vapi-webhook.service';
import { requireVapiWebhookSecret } from '../middleware/vapi-webhook-auth';

const router = Router();

// Build 232: fail-closed shared-secret guard runs BEFORE the handler, so unauthenticated traffic
// is rejected before any service/Supabase write path is reached.
router.post('/call-completed', requireVapiWebhookSecret, async (req: Request, res: Response) => {
  try {
    const result = await processVapiCallCompleted(req.body);

    if (!result.ok && result.error === 'missing_required_field') {
      return res.status(400).json(result);
    }

    if (!result.ok && result.error === 'unknown_roofer') {
      return res.status(404).json(result);
    }

    if (!result.ok) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Unexpected Vapi webhook error', error);

    return res.status(500).json({
      ok: false,
      dry_run: false,
      error: 'internal_server_error',
    });
  }
});

export default router;
