import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import api from '../services/api';
import NewsCard from '../components/NewsCard';

function News() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 6;

  useSeo({
    title: 'News / Groupe Scolaire Nemba',
    description: 'Read the latest news, announcements and school updates from Groupe Scolaire Nemba.'
  });

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const response = await api.get(`/news?limit=${limit}&page=${page}&search=${encodeURIComponent(query)}`);
        setNews(response.data.items || []);
        setTotal(response.data.total || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [page, query]);

  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">News</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">School articles, updates and announcements.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Search our latest stories and browse news organized for families, learners and staff.</p>
      </section>
      <section className="mt-12 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <FiSearch className="text-slate-500 dark:text-slate-400" />
            <input placeholder="Search news" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="w-full bg-transparent text-slate-900 outline-none dark:text-slate-100" />
          </div>
        </div>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-3">
          <button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm transition hover:border-primary dark:border-slate-700 dark:bg-slate-900">Previous</button>
          <span className="text-sm text-slate-600 dark:text-slate-300">Page {page} of {pages}</span>
          <button disabled={page === pages} onClick={() => setPage((prev) => Math.min(prev + 1, pages))} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm transition hover:border-primary dark:border-slate-700 dark:bg-slate-900">Next</button>
        </div>
      </section>
    </main>
  );
}

export default News;
