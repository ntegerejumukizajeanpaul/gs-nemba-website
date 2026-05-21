import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { initDb, getPool } from '../config/db.js';

dotenv.config();

async function seed() {
  await initDb();
  const pool = getPool();
  // New default credentials (can be overridden with env vars)
  const email = process.env.SEED_ADMIN_EMAIL || 'nemba@nesa.rw';
  const name = process.env.SEED_ADMIN_NAME || 'Administrator';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Nemba@2026';

  // Find any existing admin record. If one exists, update it to these credentials.
  const [rows] = await pool.query('SELECT * FROM admins');
  const hash = await bcrypt.hash(password, 10);

  if (rows && rows.length > 0) {
    const adminId = rows[0].id;
    await pool.query('UPDATE admins SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, hash, adminId]);
    console.log('Updated existing admin id', adminId, 'to email:', email, 'password:', password);
    process.exit(0);
  }

  const [result] = await pool.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
  console.log('Seeded admin with id', result.insertId, 'email:', email, 'password:', password);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
