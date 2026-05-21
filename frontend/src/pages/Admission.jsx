import { useState } from 'react';
import useSeo from '../hooks/useSeo';
import FeatureCard from '../components/FeatureCard';

const requirements = ['Birth certificate', 'Previous school report', 'Passport photo', 'Parent/guardian ID copy'];
const documents = ['Completed application form', 'Recommendation letter', 'Medical form', 'Copy of immunization record'];

function Admission() {
  const [formData, setFormData] = useState({ name: '', classLevel: '', parent: '', phone: '', email: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  useSeo({
    title: 'Admission / Groupe Scolaire Nemba',
    description: 'Find admission requirements, fee information and apply online to join Groupe Scolaire Nemba.'
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Admissions</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Start your application to Groupe Scolaire Nemba.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Complete the online form and prepare the required documents for a smooth admission process.</p>
      </section>
      <section className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_0.7fr]">
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Admission requirements</h2>
            <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
              {requirements.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Required documents</h2>
            <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
              {documents.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 rounded-3xl border border-primary bg-primary/5 p-10 shadow-soft dark:border-primary/20 dark:bg-slate-900/80">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Fee information</h2>
            <p className="mt-5 text-slate-600 dark:text-slate-300">Our fee structure is transparent and designed to support families with flexible payment options for all grade levels.</p>
            <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
              <li>Nursery: RWF 75,000 / term</li>
              <li>Primary: RWF 95,000 / term</li>
              <li>Secondary: RWF 120,000 / term</li>
            </ul>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Online application</h2>
          {submitted ? (
            <div className="mt-6 rounded-3xl bg-primary/10 p-6 text-slate-900 dark:bg-primary/20 dark:text-white">
              <p className="font-semibold">Thank you!</p>
              <p className="mt-2">Your application request has been received. Our admissions team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {['name', 'classLevel', 'parent', 'phone', 'email'].map((field) => (
                <label key={field} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {field === 'classLevel' ? 'Class level' : field === 'parent' ? 'Parent / guardian' : field === 'phone' ? 'Phone' : field === 'email' ? 'Email' : 'Student full name'}
                  <input
                    required
                    value={formData[field]}
                    onChange={(event) => setFormData({ ...formData, [field]: event.target.value })}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                  />
                </label>
              ))}
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Additional details
                <textarea value={formData.comment} onChange={(event) => setFormData({ ...formData, comment: event.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" rows="4" />
              </label>
              <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Submit application</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Admission;
