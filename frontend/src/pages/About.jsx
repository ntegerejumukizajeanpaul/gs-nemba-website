import useSeo from '../hooks/useSeo';
import FeatureCard from '../components/FeatureCard';

const leadership = [
  { name: 'Mr. Jean Mukarubanda', title: 'Principal' },
  { name: 'Mrs. Aline Umutoni', title: 'Deputy Principal' },
  { name: 'Mr. Eric Habimana', title: 'Academic Coordinator' }
];

const values = ['Respect', 'Competence', 'Service', 'Integrity', 'Community'];

function About() {
  useSeo({
    title: 'About / Groupe Scolaire Nemba',
    description: 'Learn about GS Nemba history, mission, vision, leadership, values, and school achievements.'
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">About the school</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">History, vision and values powering our school.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Groupe Scolaire Nemba has grown into a respected education institution in Gakenke District by blending academic rigour with community engagement and ethical leadership.</p>
      </section>
      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Our story</h2>
          <p className="mt-5 text-slate-600 dark:text-slate-300">Founded to provide accessible and modern education in Nemba Sector, the school has nurtured generations of students who are academically prepared and socially responsible.</p>
          <p className="mt-5 text-slate-600 dark:text-slate-300">We continue to invest in technology, teacher development and facilities while maintaining strong ties with parents and the local community.</p>
        </div>
        <div className="space-y-6">
          <FeatureCard title="Mission" text="Empower learners with academic excellence, character, and service to community." />
          <FeatureCard title="Vision" text="Be a leading school in Rwanda known for innovation, civic-mindedness, and student success." />
          <FeatureCard title="Values" text="Cultivate respect, effort, honesty, teamwork and sustainable achievement." />
        </div>
      </section>
      <section className="mt-16 grid gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">School achievements</h2>
          <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <li>98% success rate in national exams</li>
            <li>Multiple students selected for district STEM competitions</li>
            <li>Modern ICT lab and learning resource center</li>
            <li>Strong community outreach and scholarship programs</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">School leadership</h2>
          <div className="mt-6 space-y-5">
            {leadership.map((person) => (
              <div key={person.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
                <p className="font-semibold text-slate-900 dark:text-white">{person.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Our timeline</h2>
        <div className="mt-8 space-y-8">
          <div className="flex items-start gap-4">
            <div className="mt-2 h-5 w-5 rounded-full bg-primary"></div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">2022</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">School launched upgraded classroom blocks and launched a parent support forum.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-2 h-5 w-5 rounded-full bg-primary"></div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">2023</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Expanded secondary programs with leadership and ICT training.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-2 h-5 w-5 rounded-full bg-primary"></div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">2024</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Celebrated improved exam results and stronger local partnerships.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-soft dark:border-slate-700 dark:bg-slate-950">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Join our learning community</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Find the school schedule, class times, and timetable details for all programs.</p>
        <a href="/timetable" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">View timetable</a>
      </section>
    </main>
  );
}

export default About;
