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
  });
}

export default db;
