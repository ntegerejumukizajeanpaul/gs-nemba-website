import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: '', excerpt: '', body: '', category: '', image: '' });
  const [editing, setEditing] = useState(null);

  useSeo({ title: 'Admin News / GS Nemba', description: 'Manage news and articles from the admin panel.' });

  useEffect(() => {
    async function loadNews() {
      const response = await api.get('/news?limit=50');
      setNews(response.data.items || response.data);
    }
    loadNews().catch(console.error);
  }, []);

  const submitNews = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await api.put(`/news/${editing}`, form);
        setNews((prev) => prev.map((item) => (item.id === editing ? response.data : item)));
      } else {
        const response = await api.post('/news', form);
        setNews((prev) => [response.data, ...prev]);
      }
      setForm({ title: '', excerpt: '', body: '', category: '', image: '' });
      setEditing(null);
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = (item) => {
    setEditing(item.id);
    setForm({ title: item.title, excerpt: item.excerpt, body: item.body, category: item.category, image: item.image });
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this news item?')) return;
    await api.delete(`/news/${id}`);
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar />
        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">News manager</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Create and manage news stories that appear on the public website.</p>
              </div>
              <button onClick={() => setEditing(null) || setForm({ title: '', excerpt: '', body: '', category: '', image: '' })} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
                <FiPlus /> New story
              </button>
            </div>
          </div>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Published news</h2>
              <div className="mt-6 space-y-4">
                {news.map((item) => (
                  <article key={item.id} className="rounded-3xl border border-slate-200 p-6 dark:border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">{item.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => editItem(item)} className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"> <FiEdit2 /> </button>
                        <button onClick={() => deleteItem(item.id)} className="rounded-full border border-slate-300 p-2 text-rose-500 transition hover:border-rose-500 dark:border-slate-700"> <FiTrash2 /> </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{editing ? 'Edit news' : 'Add news'}</h2>
              <form onSubmit={submitNews} className="mt-6 space-y-5">
                {[
                  { label: 'Title', name: 'title' },
                  { label: 'Excerpt', name: 'excerpt' },
                  { label: 'Category', name: 'category' },
                  { label: 'Image URL', name: 'image' }
                ].map((field) => (
                  <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {field.label}
                    <input value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                  </label>
                ))}
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Body
                  <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required rows="6" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">{editing ? 'Update news' : 'Publish news'}</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminNews;
