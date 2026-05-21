import { getPool } from '../config/db.js';

export async function createMessage(req, res) {
  const pool = getPool();
  const { name, email, subject, message } = req.body;
  const [result] = await pool.query('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)', [name, email, subject, message]);
  const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [result.insertId]);
  res.json(rows[0]);
}

export async function getMessages(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  res.json(rows);
}
