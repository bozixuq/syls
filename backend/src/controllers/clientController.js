import db from '../database/database.js';
import { createProjectForClient } from './projectController.js';

export async function getAllClients(req, res) {
  try {
    db.all('SELECT * FROM clients', [], (err, rows) => {
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

export async function getClientById(req, res) {
  const { id } = req.params;
  try {
    db.get('SELECT * FROM clients WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json(row);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createClient(req, res) {
  const {
    name,
    gender,
    birth_year,
    phone,
    address,
    family_contact_name,
    family_contact_phone,
  } = req.body;

  const sql = `INSERT INTO clients (name, gender, birth_year, phone, address, family_contact_name, family_contact_phone)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    name,
    gender,
    birth_year,
    phone,
    address,
    family_contact_name,
    family_contact_phone,
  ];

  try {
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      const clientId = this.lastID;
      createProjectForClient(clientId)
        .then(() => {
          db.get('SELECT * FROM clients WHERE id = ?', [clientId], (err2, row) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(row);
          });
        })
        .catch((e) => {
          console.error(e);
          res.status(500).json({ error: 'Database error' });
        });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateClient(req, res) {
  const { id } = req.params;
  const {
    name,
    gender,
    birth_year,
    phone,
    address,
    family_contact_name,
    family_contact_phone,
    status,
  } = req.body;

  const sql = `UPDATE clients SET
                 name = ?,
                 gender = ?,
                 birth_year = ?,
                 phone = ?,
                 address = ?,
                 family_contact_name = ?,
                 family_contact_phone = ?,
                 status = ?
               WHERE id = ?`;
  const params = [
    name,
    gender,
    birth_year,
    phone,
    address,
    family_contact_name,
    family_contact_phone,
    status,
    id,
  ];

  try {
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      db.get('SELECT * FROM clients WHERE id = ?', [id], (err2, row) => {
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

export async function deleteClient(req, res) {
  const { id } = req.params;
  try {
    db.run('DELETE FROM clients WHERE id = ?', [id], function (err) {
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
