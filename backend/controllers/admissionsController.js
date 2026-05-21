import { getPool } from '../config/db.js';

export async function getAdmissions(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM admissions LIMIT 1');
  res.json(rows || []);
}

export async function updateAdmissions(req, res) {
  const pool = getPool();
  const { requirements, documents, fees } = req.body;
  const [rows] = await pool.query('SELECT * FROM admissions LIMIT 1');
  if (rows.length) {
    await pool.query('UPDATE admissions SET requirements = ?, documents = ?, fees = ? WHERE id = ?', [requirements, documents, fees, rows[0].id]);
    const [updated] = await pool.query('SELECT * FROM admissions WHERE id = ?', [rows[0].id]);
    res.json(updated[0]);
  } else {
    const [result] = await pool.query('INSERT INTO admissions (requirements, documents, fees) VALUES (?, ?, ?)', [requirements, documents, fees]);
    const [newRow] = await pool.query('SELECT * FROM admissions WHERE id = ?', [result.insertId]);
    res.json(newRow[0]);
  }
}
