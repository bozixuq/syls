import db from '../database/database.js';

export async function getAllInterviews(req, res) {
  const { projectId } = req.params;
  try {
    db.all('SELECT * FROM interviews WHERE project_id = ?', [projectId], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getInterviewById(req, res) {
  const { projectId, id } = req.params;
  try {
    db.get('SELECT * FROM interviews WHERE project_id = ? AND id = ?', [projectId, id], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Interview not found' });
      }
      res.json(row);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createInterview(req, res) {
  const { projectId } = req.params;
  const { interview_date, notes, audio_file_path, tags } = req.body;
  const sql = `INSERT INTO interviews (project_id, interview_date, notes, audio_file_path, tags)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [projectId, interview_date, notes, audio_file_path, tags];
  try {
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      db.get('SELECT * FROM interviews WHERE id = ?', [this.lastID], (err2, row) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json(row);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateInterview(req, res) {
  const { projectId, id } = req.params;
  const { interview_date, notes, audio_file_path, tags } = req.body;
  const sql = `UPDATE interviews SET interview_date = ?, notes = ?, audio_file_path = ?, tags = ? WHERE id = ? AND project_id = ?`;
  const params = [interview_date, notes, audio_file_path, tags, id, projectId];
  try {
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      db.get('SELECT * FROM interviews WHERE id = ?', [id], (err2, row) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ error: 'Database error' });
        }
        res.json(row);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteInterview(req, res) {
  const { projectId, id } = req.params;
  try {
    db.run('DELETE FROM interviews WHERE id = ? AND project_id = ?', [id, projectId], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(204).end();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
