import { Router, Request, Response } from 'express';
import { processVapiCallCompletedDryRun } from '../services/vapi-webhook.service';

const router = Router();

router.post('/call-completed', async (req: Request, res: Response) => {
  try {
    const result = await processVapiCallCompletedDryRun(req.body);

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
    console.error('Unexpected Vapi dry-run webhook error', error);

    return res.status(500).json({
      ok: false,
      dry_run: true,
      error: 'internal_server_error',
    });
  }
});

export default router;
