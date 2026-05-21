import { Router, Request, Response } from 'express';

const router = Router();

// Get call logs
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get call logs - placeholder' });
});

// Handle incoming call webhook (from Vapi/Retell)
router.post('/webhook', (req: Request, res: Response) => {
  const callData = req.body;
  
  res.status(200).json({
    message: 'Call webhook received',
    callData
  });
});

export default router;
