import express from 'express';
import cors from 'cors';
import { initDb } from './database/database.js';
import clientRoutes from './routes/clientRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

initDb();

app.get('/', (req, res) => {
  res.json({ message: 'Backend for Memoir Management System is running.' });
});

app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/interviews', interviewRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
