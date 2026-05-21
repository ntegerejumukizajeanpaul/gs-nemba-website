import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import { useAuth } from '../context/AuthContext';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useSeo({ title: 'Admin Login / GS Nemba', description: 'Admin login for school dashboard access.' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError('Incorrect email or password.');
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-20 dark:bg-slate-950 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Admin login</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Secure access to announcements, news, gallery and website settings.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </label>
          {error && <p className="rounded-3xl bg-rose-100 p-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-200">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;
