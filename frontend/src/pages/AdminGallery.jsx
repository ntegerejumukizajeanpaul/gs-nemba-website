import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

function AdminGallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', display_type: 'gallery', image: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useSeo({ title: 'Admin Gallery / GS Nemba', description: 'Manage gallery images and photos through the admin panel.' });

  useEffect(() => {
    async function loadGallery() {
      const response = await api.get('/gallery');
      setItems(response.data);
    }
    loadGallery().catch(console.error);
  }, []);

  const heroItems = items.filter((item) => item.display_type === 'hero');

  const submitGallery = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/gallery', form);
      setItems((prev) => [response.data, ...prev]);
      setForm({ title: '', category: '', display_type: 'gallery', image: '' });
      setUploadPreview('');
      setSuccessMessage(response.data.display_type === 'hero'
        ? 'Photo uploaded successfully and will appear in the homepage slideshow.'
        : 'Photo uploaded successfully. Choose Homepage slideshow to add it to the home slider.');
      window.setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Remove this gallery image?')) return;
    await api.delete(`/gallery/${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm((prev) => ({ ...prev, image: response.data.url }));
      setUploadPreview(response.data.url);
    } catch (error) {
      console.error(error);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar />
        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Gallery manager</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Upload new images, update captions and remove old gallery items as needed.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-500">
                  View homepage slideshow
                </a>
                <button onClick={() => { setForm({ title: '', category: '', display_type: 'gallery', image: '' }); setUploadPreview(''); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
                  <FiPlus /> Add photo
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_0.8fr]">
            <div className="grid gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Current homepage slideshow</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">These images are currently configured to appear in the home page slider.</p>
                <div className="mt-6 grid gap-4">
                  {heroItems.length ? heroItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
                      <img src={item.image} alt={item.title} className="h-20 w-20 rounded-3xl object-cover" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.title || 'Untitled'}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.category || 'No category'}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-slate-600 dark:border-slate-700 dark:text-slate-300">No homepage slideshow images yet. Upload one and choose Homepage slideshow.</div>
                  )}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Gallery collection</h2>
                <div className="mt-6 grid gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
                      </div>
                      <button onClick={() => deleteItem(item.id)} className="rounded-full border border-slate-300 p-2 text-rose-500 transition hover:border-rose-500 dark:border-slate-700"> <FiTrash2 /> </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add gallery item</h2>
              {successMessage && (
                <div className="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">
                  {successMessage}
                </div>
              )}
              <form onSubmit={submitGallery} className="mt-6 space-y-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Title
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Events, Sports, Classroom" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Display location
                  <select value={form.display_type} onChange={(e) => setForm({ ...form, display_type: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                    <option value="gallery">Gallery page</option>
                    <option value="home_preview">Homepage preview</option>
                    <option value="hero">Homepage slideshow</option>
                  </select>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Choose "Homepage slideshow" to add this photo to the homepage hero carousel.</p>
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Image file
                  <input type="file" accept="image/*" onChange={handleUpload} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                {uploadPreview && (
                  <img src={uploadPreview} alt="Preview" className="h-40 w-full rounded-3xl object-cover" />
                )}
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Image URL (if not uploading)
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/uploads/example.jpg or https://..." className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
                <button type="submit" disabled={!form.image || uploading} className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">{uploading ? 'Uploading...' : 'Upload photo'}</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminGallery;
