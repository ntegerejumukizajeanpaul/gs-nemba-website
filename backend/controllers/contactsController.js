import { getPool } from '../config/db.js';

export async function getContacts(req, res) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM contacts LIMIT 1');
  res.json(rows[0] || {});
}

export async function updateContacts(req, res) {
  const pool = getPool();
  const { phone, email, address } = req.body;
  const [rows] = await pool.query('SELECT * FROM contacts LIMIT 1');
  if (rows.length) {
    await pool.query('UPDATE contacts SET phone = ?, email = ?, address = ? WHERE id = ?', [phone, email, address, rows[0].id]);
    const [updated] = await pool.query('SELECT * FROM contacts WHERE id = ?', [rows[0].id]);
    res.json(updated[0]);
  } else {
    const [result] = await pool.query('INSERT INTO contacts (phone, email, address) VALUES (?, ?, ?)', [phone, email, address]);
    const [newRow] = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    res.json(newRow[0]);
  }
}
