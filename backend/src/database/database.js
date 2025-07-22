import sqlite3 from 'sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFolder = join(__dirname, '../../db');
const dbPath = join(dbFolder, 'database.db');

if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

export function initDb() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gender TEXT,
      birth_year INTEGER,
      phone TEXT,
      address TEXT,
      family_contact_name TEXT,
      family_contact_phone TEXT,
      status TEXT DEFAULT '初步接洽',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      status TEXT NOT NULL,
      assigned_writer TEXT,
      delivery_date DATE,
      FOREIGN KEY(client_id) REFERENCES clients(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS interviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      interview_date DATE NOT NULL,
      notes TEXT,
      audio_file_path TEXT,
      tags TEXT,
      FOREIGN KEY(project_id) REFERENCES projects(id)
    )`);
  });
}

// Initialize the database immediately so that any module importing
// `db` can use it without needing to call `initDb` again.
initDb();

export { db };
export default db;
