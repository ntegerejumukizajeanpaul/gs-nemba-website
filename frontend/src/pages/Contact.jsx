import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import useSeo from '../hooks/useSeo';
import api from '../services/api';

function Contact() {
  const [message, setMessage] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  useSeo({
    title: 'Contact / Groupe Scolaire Nemba',
    description: 'Contact Groupe Scolaire Nemba for admission support, school inquiries and community partnerships.'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    try {
      await api.post('/messages', message);
      setStatus('success');
      setMessage({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Contact</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Get in touch with Groupe Scolaire Nemba.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Contact us about admission, events, partnerships and general inquiries. Our team is happy to help.</p>
      </section>
      <section className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">School location</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Nemba Sector, Gakenke District, Northern Province, Rwanda.</p>
          <div className="mt-8 space-y-5 text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-3"><FiMapPin className="text-primary" /> Nemba Sector, Gakenke District</div>
            <div className="flex items-center gap-3"><FiPhone className="text-primary" /> +250 78 000 0000</div>
            <div className="flex items-center gap-3"><FiMail className="text-primary" /> info@gsnemba.rw</div>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
            <iframe title="GS Nemba location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0000000000005!2d29.5667!3d1.4139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d9ea0000000001%3A0x0000000000000000!2sGakenke%20District!5e0!3m2!1sen!2srw!4v1700000000000!5m2!1sen!2srw" className="h-72 w-full border-0" loading="lazy"></iframe>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Send us a message</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {['name', 'email', 'subject'].map((field) => (
              <label key={field} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {field === 'name' ? 'Full name' : field.charAt(0).toUpperCase() + field.slice(1)}
                <input
                  value={message[field]}
                  onChange={(event) => setMessage({ ...message, [field]: event.target.value })}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  type={field === 'email' ? 'email' : 'text'}
                />
              </label>
            ))}
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Message
              <textarea
                value={message.message}
                onChange={(event) => setMessage({ ...message, message: event.target.value })}
                required
                rows="5"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Send message</button>
          </form>
          {status === 'success' && <p className="mt-4 rounded-3xl bg-emerald-100 p-4 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">Message sent successfully.</p>}
          {status === 'error' && <p className="mt-4 rounded-3xl bg-rose-100 p-4 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-200">There was a problem sending the message. Please try again.</p>}
        </div>
      </section>
    </main>
  );
}

export default Contact;
