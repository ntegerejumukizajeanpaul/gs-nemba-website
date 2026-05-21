import { getPool } from '../config/db.js';

export async function getSchoolInfo(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY id ASC');
  res.json({ slides: rows });
}

export async function updateSchoolInfo(req, res) {
  const pool = getPool();
  // Accept an array of slides, and clear/replace hero slides
  const slides = req.body.slides || [];
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query('TRUNCATE TABLE hero_slides');
    for (const s of slides) {
      await conn.query('INSERT INTO hero_slides (title, subtitle, description, image) VALUES (?, ?, ?, ?)', [s.title, s.subtitle, s.description, s.image]);
    }
    await conn.commit();
    res.json({ success: true });
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
