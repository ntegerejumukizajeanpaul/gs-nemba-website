import { useEffect, useState } from 'react';
import { FiArchive, FiBell, FiImage, FiUsers } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({ announcements: 0, news: 0, gallery: 0, messages: 0 });

  useSeo({ title: 'Admin Dashboard / GS Nemba', description: 'Admin management dashboard for GS Nemba website content.' });

  useEffect(() => {
    async function loadStats() {
      const [ann, news, gal, msg] = await Promise.all([
        api.get('/announcements'),
        api.get('/news?limit=1&page=1'),
        api.get('/gallery'),
        api.get('/messages')
      ]);
      setStats({ announcements: ann.data.length, news: news.data.total || news.data.length || 0, gallery: gal.data.length, messages: msg.data.length });
    }
    loadStats().catch(console.error);
  }, []);

  const cards = [
    { label: 'Announcements', value: stats.announcements, icon: <FiBell className="h-6 w-6" /> },
    { label: 'News articles', value: stats.news, icon: <FiArchive className="h-6 w-6" /> },
    { label: 'Gallery items', value: stats.gallery, icon: <FiImage className="h-6 w-6" /> },
    { label: 'Messages', value: stats.messages, icon: <FiUsers className="h-6 w-6" /> }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar />
        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Admin dashboard</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Manage news, gallery, announcements, admissions and website content with secure access.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">{card.icon}</div>
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
