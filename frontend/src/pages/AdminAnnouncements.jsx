import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', type: 'announcement' });
  const [editing, setEditing] = useState(null);

  useSeo({ title: 'Admin Announcements / GS Nemba', description: 'Manage school announcements in the admin dashboard.' });

  useEffect(() => {
    async function loadAnnouncements() {
      const response = await api.get('/announcements');
      setAnnouncements(response.data);
    }
    loadAnnouncements().catch(console.error);
  }, []);

  const submitAnnouncement = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await api.put(`/announcements/${editing}`, form);
        setAnnouncements((prev) => prev.map((item) => (item.id === editing ? response.data : item)));
      } else {
        const response = await api.post('/announcements', form);
        setAnnouncements((prev) => [response.data, ...prev]);
      }
      setForm({ title: '', summary: '', type: 'announcement' });
      setEditing(null);
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ title: item.title, summary: item.summary, type: item.type || 'announcement' });
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    await api.delete(`/announcements/${id}`);
    setAnnouncements((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar />
        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Announcements</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Add, edit or remove announcements for the school community.</p>
              </div>
              <button onClick={() => { setEditing(null); setForm({ title: '', summary: '', type: 'announcement' }); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
                <FiPlus /> New Announcement
              </button>
            </div>
          </div>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Latest announcements</h2>
              <div className="mt-6 space-y-4">
                {announcements.map((item) => (
                  <article key={item.id} className="rounded-3xl border border-slate-200 p-6 dark:border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.type === 'home_ad' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                            {item.type === 'home_ad' ? 'Homepage ad' : 'Announcement'}
                          </span>
                        </div>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">{item.summary}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEdit(item)} className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"> <FiEdit2 /> </button>
                        <button onClick={() => deleteAnnouncement(item.id)} className="rounded-full border border-slate-300 p-2 text-rose-500 transition hover:border-rose-500 dark:border-slate-700"> <FiTrash2 /> </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{editing ? 'Edit announcement' : 'Add announcement'}</h2>
              <form onSubmit={submitAnnouncement} className="mt-6 space-y-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Title
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Summary
                  <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required rows="4" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Display type
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                    <option value="announcement">Announcement</option>
                    <option value="home_ad">Homepage ad</option>
                  </select>
                </label>
                <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">{editing ? 'Update announcement' : 'Publish announcement'}</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminAnnouncements;
