import { Router, Request, Response } from 'express';
import { getInternalAdminErrors } from '../services/internal-admin-errors.service';

const router = Router();

router.get('/admin-errors', async (req: Request, res: Response) => {
  try {
    const expectedToken = process.env.INTERNAL_ADMIN_TOKEN;

    if (!expectedToken) {
      console.error('Internal admin token is not configured');
      return res.status(500).json({
        error: 'Internal admin access is not configured',
      });
    }

    const providedToken =
      typeof req.headers['x-internal-admin-token'] === 'string'
        ? req.headers['x-internal-admin-token']
        : typeof req.query.token === 'string'
          ? req.query.token
          : '';

    if (providedToken !== expectedToken) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const rooferId =
      typeof req.query.roofer_id === 'string' && req.query.roofer_id.trim().length > 0
        ? req.query.roofer_id.trim()
        : null;

    const limit =
      typeof req.query.limit === 'string'
        ? Number(req.query.limit)
        : undefined;

    const since =
      typeof req.query.since === 'string' && req.query.since.trim().length > 0
        ? req.query.since.trim()
        : null;

    const result = await getInternalAdminErrors({
      rooferId,
      limit,
      since,
    });

    return res.json(result);
  } catch (error: any) {
    console.error('Internal admin errors endpoint failed:', error.message);
    return res.status(500).json({
      error: 'Failed to load internal admin errors',
    });
  }
});

export default router;
