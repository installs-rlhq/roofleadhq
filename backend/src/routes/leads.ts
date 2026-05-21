import { Router, Request, Response } from 'express';

const router = Router();

// Get all leads
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all leads - placeholder' });
});

// Create a new lead
router.post('/', (req: Request, res: Response) => {
  const { name, phone, address, source } = req.body;
  
  res.status(201).json({
    message: 'Lead created successfully',
    lead: { name, phone, address, source }
  });
});

export default router;
