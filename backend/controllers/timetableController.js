import { getPool } from '../config/db.js';

// Get all timetable entries
export async function getTimetable(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM timetable ORDER BY class_key, period_key');
  res.json(rows);
}

// Create a new timetable entry
export async function createTimetableEntry(req, res) {
  const pool = getPool();
  const { class_key, period_key, subject, teacher } = req.body;
  const [result] = await pool.query(
    'INSERT INTO timetable (class_key, period_key, subject, teacher) VALUES (?, ?, ?, ?)',
    [class_key, period_key, subject, teacher]
  );
  const [rows] = await pool.query('SELECT * FROM timetable WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
}

// Update an existing timetable entry
export async function updateTimetableEntry(req, res) {
  const pool = getPool();
  const { id } = req.params;
  const { class_key, period_key, subject, teacher } = req.body;
  await pool.query(
    'UPDATE timetable SET class_key = ?, period_key = ?, subject = ?, teacher = ? WHERE id = ?',
    [class_key, period_key, subject, teacher, id]
  );
  const [rows] = await pool.query('SELECT * FROM timetable WHERE id = ?', [id]);
  res.json(rows[0]);
}

// Delete a timetable entry
export async function deleteTimetableEntry(req, res) {
  const pool = getPool();
  const { id } = req.params;
  await pool.query('DELETE FROM timetable WHERE id = ?', [id]);
  res.json({ success: true });
}
