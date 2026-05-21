import { getPool } from '../config/db.js';

export async function getGallery(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
  res.json(rows);
}

export async function createGalleryItem(req, res) {
  const pool = getPool();
  const { title, category, display_type = 'gallery', image } = req.body;
  const [result] = await pool.query('INSERT INTO gallery (title, category, display_type, image) VALUES (?, ?, ?, ?)', [title, category, display_type, image]);
  const [rows] = await pool.query('SELECT * FROM gallery WHERE id = ?', [result.insertId]);
  res.json(rows[0]);
}

export async function deleteGalleryItem(req, res) {
  const pool = getPool();
  const { id } = req.params;
  await pool.query('DELETE FROM gallery WHERE id = ?', [id]);
  res.json({ success: true });
}
