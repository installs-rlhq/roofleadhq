import { Router, Request, Response } from 'express';

const router = Router();

// Facebook/Google form webhook
router.post('/forms', (req: Request, res: Response) => {
  console.log('Form submission received:', req.body);
  res.status(200).json({ received: true });
});

// General webhook endpoint
router.post('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Webhook received' });
});

export default router;
