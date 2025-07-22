import { Router } from 'express';
import { getProjectByClientId } from '../controllers/projectController.js';

const router = Router();

router.get('/by-client/:clientId', getProjectByClientId);

export default router;
