import express from 'express';
import cors from 'cors';
import { initDb } from './database/database.js';
import clientRoutes from './routes/clientRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

initDb();

app.get('/', (req, res) => {
  res.json({ message: 'Backend for Memoir Management System is running.' });
});

app.use('/api/clients', clientRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
