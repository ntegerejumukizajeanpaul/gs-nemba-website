import { getPool } from '../config/db.js';

export async function getNews(req, res) {
  const pool = getPool();
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const search = req.query.search || '';
  const offset = (page - 1) * limit;

  if (req.query.limit || req.query.page || req.query.search) {
    const [rows] = await pool.query('SELECT * FROM news WHERE title LIKE ? OR excerpt LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [`%${search}%`, `%${search}%`, limit, offset]);
    const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM news WHERE title LIKE ? OR excerpt LIKE ?', [`%${search}%`, `%${search}%`]);
    const total = countRows[0]?.total || 0;
    res.json({ items: rows, total });
    return;
  }

  const [rows] = await pool.query('SELECT * FROM news ORDER BY created_at DESC LIMIT ?', [limit]);
  res.json(rows);
}

export async function createNews(req, res) {
  const pool = getPool();
  const { title, excerpt, body, category, image } = req.body;
  const [result] = await pool.query('INSERT INTO news (title, excerpt, body, category, image) VALUES (?, ?, ?, ?, ?)', [title, excerpt, body, category, image]);
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [result.insertId]);
  res.json(rows[0]);
}

export async function updateNews(req, res) {
  const pool = getPool();
  const { id } = req.params;
  const { title, excerpt, body, category, image } = req.body;
  await pool.query('UPDATE news SET title = ?, excerpt = ?, body = ?, category = ?, image = ? WHERE id = ?', [title, excerpt, body, category, image, id]);
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
  res.json(rows[0]);
}

export async function deleteNews(req, res) {
  const pool = getPool();
  const { id } = req.params;
  await pool.query('DELETE FROM news WHERE id = ?', [id]);
  res.json({ success: true });
}
