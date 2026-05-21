import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nemba@nesa.rw', password: 'Nemba@2026' })
  });
  const body = await res.json().catch(() => null);
  console.log('Status:', res.status);
  console.log('Body:', body);
}

test().catch(err => { console.error(err); process.exit(1); });
