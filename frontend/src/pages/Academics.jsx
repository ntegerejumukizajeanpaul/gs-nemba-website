import useSeo from '../hooks/useSeo';
import FeatureCard from '../components/FeatureCard';

const subjects = ['Mathematics', 'Kinyarwanda', 'English', 'Science', 'Social Studies', 'ICT', 'French', 'Art'];
const departments = ['Science & Technology', 'Humanities', 'Languages', 'Sport & Wellness'];

function Academics() {
  useSeo({
    title: 'Academics / Groupe Scolaire Nemba',
    description: 'Discover academic programs, subjects and learning departments at Groupe Scolaire Nemba.'
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Academic programs</p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Programs for nursery, primary and secondary students.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Our curriculum combines knowledge, creativity and practical skills to support strong outcomes.</p>
      </section>
      <section className="mt-16 grid gap-8 lg:grid-cols-3">
        <FeatureCard title="Nursery" text="Early childhood education with compassionate teachers, language play and a balanced learning rhythm." />
        <FeatureCard title="Primary" text="Structured lessons that build reading, mathematics and science habits in an engaging way." />
        <FeatureCard title="Secondary" text="Advanced courses, exam preparation and career guidance for strong national performance." />
      </section>
      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Subjects offered</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <div key={subject} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">{subject}</div>
          ))}
        </div>
      </section>
      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Departments</h2>
          <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            {departments.map((dept) => (
              <li key={dept} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">{dept}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-primary/5 p-10 text-slate-900 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          <h2 className="text-2xl font-semibold">Academic calendar</h2>
          <p className="mt-5 text-slate-700 dark:text-slate-300">School terms run across first, second and third semesters with holidays that balance study and rest.</p>
          <ul className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
            <li>Term 1: January - April</li>
            <li>Term 2: May - August</li>
            <li>Term 3: September - December</li>
          </ul>
        </div>
      </section>
      <section className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center shadow-soft dark:border-slate-700 dark:bg-slate-950">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Download materials</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Access the latest curriculum guides, examination tips, and syllabus downloads for every class.</p>
        <a href="/files/admission-brochure.pdf" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Download PDF</a>
      </section>
    </main>
  );
}

export default Academics;
