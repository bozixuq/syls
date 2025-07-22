import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all clients' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create a client' });
});

export default router;
