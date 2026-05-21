import { getPool } from '../config/db.js';

export async function getAnnouncements(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
  res.json(rows);
}

export async function createAnnouncement(req, res) {
  const pool = getPool();
  const { title, summary, type = 'announcement' } = req.body;
  const [result] = await pool.query('INSERT INTO announcements (title, summary, type) VALUES (?, ?, ?)', [title, summary, type]);
  const [rows] = await pool.query('SELECT * FROM announcements WHERE id = ?', [result.insertId]);
  res.json(rows[0]);
}

export async function updateAnnouncement(req, res) {
  const pool = getPool();
  const { id } = req.params;
  const { title, summary, type = 'announcement' } = req.body;
  await pool.query('UPDATE announcements SET title = ?, summary = ?, type = ? WHERE id = ?', [title, summary, type, id]);
  const [rows] = await pool.query('SELECT * FROM announcements WHERE id = ?', [id]);
  res.json(rows[0]);
}

export async function deleteAnnouncement(req, res) {
  const pool = getPool();
  const { id } = req.params;
  await pool.query('DELETE FROM announcements WHERE id = ?', [id]);
  res.json({ success: true });
}
