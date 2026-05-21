import { Router, Request, Response } from 'express';
import leadService from '../services/leadService';

const router = Router();

// Facebook / Google / Website form submissions
router.post('/forms', async (req: Request, res: Response) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ message: 'Lead created from form', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process form submission' });
  }
});

export default router;
