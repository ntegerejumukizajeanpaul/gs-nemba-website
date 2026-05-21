import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

function AdminSettings() {
  const [contact, setContact] = useState({ phone: '', email: '', address: '', hero_title: '', hero_subtitle: '' });

  useSeo({ title: 'Admin Settings / GS Nemba', description: 'Update contact information and homepage content from the admin settings.' });

  useEffect(() => {
    async function loadSettings() {
      const [contactRes, infoRes] = await Promise.all([api.get('/contacts'), api.get('/school-info')]);
      setContact({
        phone: contactRes.data.phone || '',
        email: contactRes.data.email || '',
        address: contactRes.data.address || '',
        hero_title: infoRes.data.hero_title || 'Groupe Scolaire Nemba',
        hero_subtitle: infoRes.data.hero_subtitle || 'Excellence in Education'
      });
    }
    loadSettings().catch(console.error);
  }, []);

  const saveSettings = async (event) => {
    event.preventDefault();
    await Promise.all([api.put('/contacts', contact), api.put('/school-info', contact)]);
    alert('Site settings saved successfully.');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar />
        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Site settings</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Update contact details and homepage hero messaging for the public website.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <form onSubmit={saveSettings} className="space-y-6">
              {[
                { label: 'School phone', name: 'phone' },
                { label: 'School email', name: 'email' },
                { label: 'School address', name: 'address' },
                { label: 'Hero title', name: 'hero_title' },
                { label: 'Hero subtitle', name: 'hero_subtitle' }
              ].map((field) => (
                <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {field.label}
                  <input value={contact[field.name]} onChange={(e) => setContact({ ...contact, [field.name]: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
              ))}
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"><FiSave /> Save settings</button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminSettings;
