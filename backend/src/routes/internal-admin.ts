import { Router, Request, Response } from 'express';
import childProcess from 'child_process';
import path from 'path';
import { getInternalAdminErrors } from '../services/internal-admin-errors.service';

const router = Router();

const repoRoot = path.join(__dirname, '..', '..', '..');
const readinessStatus = require('../../scripts/show-pilot-readiness-status.js');

const smokeChecks = [
  {
    key: 'dashboard',
    script: 'backend/scripts/verify-pilot-dashboard-smoke-readonly.js',
  },
  {
    key: 'manualOutreach',
    script: 'backend/scripts/verify-manual-outreach-smoke-readonly.js',
  },
  {
    key: 'phoneLead',
    script: 'backend/scripts/verify-vapi-phone-lead-smoke-readonly.js',
  },
  {
    key: 'reporting',
    script: 'backend/scripts/verify-reporting-smoke-readonly.js',
  },
];

function getInternalAdminToken(req: Request): string {
  return typeof req.headers['x-internal-admin-token'] === 'string'
    ? req.headers['x-internal-admin-token']
    : typeof req.query.token === 'string'
      ? req.query.token
      : '';
}

function authorizeInternalAdmin(req: Request, res: Response): boolean {
  const expectedToken = process.env.INTERNAL_ADMIN_TOKEN;

  if (!expectedToken) {
    console.error('Internal admin token is not configured');
    res.status(500).json({
      error: 'Internal admin access is not configured',
    });
    return false;
  }

  if (getInternalAdminToken(req) !== expectedToken) {
    res.status(401).json({
      error: 'Unauthorized',
    });
    return false;
  }

  return true;
}

function runSmokeCheck(script: string): { status: 'ok' | 'attention'; exitCode: number | null } {
  const result = childProcess.spawnSync(process.execPath, [script], {
    cwd: repoRoot,
    stdio: 'ignore',
    timeout: 120000,
  });

  return {
    status: result.status === 0 && !result.error ? 'ok' : 'attention',
    exitCode: typeof result.status === 'number' ? result.status : null,
  };
}

router.get('/pilot-readiness-status', (req: Request, res: Response) => {
  try {
    if (!authorizeInternalAdmin(req, res)) return;

    const readiness = readinessStatus.buildStatus();
    const smoke = smokeChecks.reduce((acc, check) => {
      acc[check.key] = runSmokeCheck(check.script);
      return acc;
    }, {} as Record<string, { status: 'ok' | 'attention'; exitCode: number | null }>);

    return res.json({
      generated_at: new Date().toISOString(),
      readiness: {
        summary: readiness.summary,
        source_of_truth_commit: readiness.source_of_truth_commit,
      },
      smoke,
      live_automation: readiness.live_automation,
      read_only: true,
      actions_available: false,
    });
  } catch (error: any) {
    console.error('Pilot readiness status endpoint failed:', error.message);
    return res.status(500).json({
      error: 'Failed to load pilot readiness status',
    });
  }
});

router.get('/admin-errors', async (req: Request, res: Response) => {
  try {
    if (!authorizeInternalAdmin(req, res)) return;

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
