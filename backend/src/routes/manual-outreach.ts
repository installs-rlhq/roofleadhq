import { Router, Request, Response } from 'express';
import { createManualOutreach } from '../services/manual-outreach.service';

const router = Router();

interface ManualOutreachRequest {
  roofer_id: string;
  homeowner_phone: string;
  homeowner_name?: string;
  source_detail?: string;
  issue_description?: string;
  dry_run: boolean;
}

router.post('/test', async (req: Request, res: Response) => {
  const body = req.body as ManualOutreachRequest;

  // Safety guard
  if (!body.dry_run) {
    return res.status(400).json({
      success: false,
      dry_run: false,
      error: 'This endpoint only accepts dry_run: true'
    });
  }

  try {
    const result = await createManualOutreach({
      roofer_id: body.roofer_id,
      homeowner_phone: body.homeowner_phone,
      homeowner_name: body.homeowner_name,
      source_detail: body.source_detail,
      issue_description: body.issue_description
    });

    return res.json({
      success: true,
      dry_run: true,
      lead_id: result.lead_id,
      follow_up_count: result.follow_up_count,
      workflow_event_count: result.workflow_event_count
    });

  } catch (err: any) {
    return res.status(400).json({
      success: false,
      dry_run: true,
      error: err.message || 'Request failed'
    });
  }
});

export default router;
