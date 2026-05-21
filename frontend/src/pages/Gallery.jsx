import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import GalleryCard from '../components/GalleryCard';
import api from '../services/api';
import { galleryPreview } from '../data/siteData';

const categories = ['All', 'Classes', 'Events', 'Activities'];

function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useSeo({
    title: 'Gallery / Groupe Scolaire Nemba',
    description: 'Explore photos and videos from school events, classroom life, and community activities at GS Nemba.'
  });

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await api.get('/gallery');
        setItems(response.data);
      } catch (error) {
        setItems(galleryPreview);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filtered = items.filter((item) => {
    const categoryMatch = filter === 'All' || item.category === filter;
    const queryMatch = item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Gallery</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Photos and videos from school life.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Filter our gallery by category, search for events, and see the culture that makes GS Nemba unique.</p>
      </section>
      <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.4fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
              <FiSearch className="text-slate-500 dark:text-slate-300" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search gallery" className="w-full bg-transparent text-slate-900 outline-none dark:text-slate-100" />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button key={category} onClick={() => setFilter(category)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === category ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />)
            ) : filtered.length ? (
              filtered.map((item) => <GalleryCard key={item.id || item.title} item={item} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-600 dark:border-slate-700 dark:text-slate-300">No gallery items match your search.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
