import db from '../database/database.js';

export function createProjectForClient(clientId) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO projects (client_id, status) VALUES (?, ?)';
    db.run(sql, [clientId, '访谈安排'], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, client_id: clientId, status: '访谈安排', assigned_writer: null, delivery_date: null });
    });
  });
}

export async function getProjectByClientId(req, res) {
  const { clientId } = req.params;
  try {
    db.get('SELECT * FROM projects WHERE client_id = ?', [clientId], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(row);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
