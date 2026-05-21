import bcrypt from 'bcrypt';
import { initDb, getPool } from '../config/db.js';

async function verify() {
  await initDb();
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', ['nemba@nesa.rw']);
  if (!rows || rows.length === 0) {
    console.log('Admin not found for email nemba@nesa.rw');
    process.exit(1);
  }

  const admin = rows[0];
  const ok = await bcrypt.compare('Nemba@2026', admin.password);
  console.log('Verification for', admin.email, ':', ok ? 'SUCCESS' : 'FAIL');
  process.exit(ok ? 0 : 2);
}

verify().catch(err => { console.error(err); process.exit(1); });
