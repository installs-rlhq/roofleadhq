import { Router } from 'express';
import { logCall, getCalls } from '../controllers/callController';

const router = Router();

router.get('/', getCalls);
router.post('/webhook', logCall);

export default router;
