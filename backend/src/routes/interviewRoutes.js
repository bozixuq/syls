import { Router } from 'express';
import {
  getAllInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
} from '../controllers/interviewController.js';

const router = Router({ mergeParams: true });

router.get('/', getAllInterviews);
router.post('/', createInterview);
router.get('/:id', getInterviewById);
router.put('/:id', updateInterview);
router.delete('/:id', deleteInterview);

export default router;
