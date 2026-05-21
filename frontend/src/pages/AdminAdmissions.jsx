import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

function AdminAdmissions() {
  const [info, setInfo] = useState({ requirements: '', documents: '', fees: '' });

  useSeo({ title: 'Admin Admissions / GS Nemba', description: 'Manage admission details, requirements and fee information.' });

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/admissions');
      setInfo(response.data[0] || { requirements: '', documents: '', fees: '' });
    }
    loadData().catch(console.error);
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    await api.put('/admissions', info);
    alert('Admission information updated successfully.');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar />
        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Admissions content</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Update school admission details and help families find exact requirements.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <form onSubmit={handleSave} className="space-y-6">
              {[
                { label: 'Requirements', name: 'requirements' },
                { label: 'Required documents', name: 'documents' },
                { label: 'Fee information', name: 'fees' }
              ].map((field) => (
                <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {field.label}
                  <textarea value={info[field.name]} onChange={(e) => setInfo({ ...info, [field.name]: e.target.value })} rows="5" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </label>
              ))}
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"><FiSave /> Save details</button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminAdmissions;
