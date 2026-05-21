import useSeo from '../hooks/useSeo';
import { useEffect, useMemo, useState } from 'react';
import AnnouncementsPanel from '../components/AnnouncementsPanel';
import classRoster from '../data/classRoster.json';
import timetableBg from '../assets/timetable-bg.png';

const daySlots = [
  { key: 'etude', label: 'Etude', start: '06:00', end: '07:30' },
  { key: 'breakfast', label: 'Breakfast & drink', start: '07:30', end: '08:00' },
  { key: 'hygiene', label: 'Hygiene (dining)', start: '08:00', end: '08:30' },
  { key: 'assemble', label: 'Assemble', start: '08:30', end: '08:35' },
  { key: 'get_ready', label: 'Get ready for class', start: '08:35', end: '08:50' },
  { key: 'p1', label: '1st period', start: '08:50', end: '09:30' },
  { key: 'snack1', label: 'Snack & drink', start: '09:30', end: '09:40' },
  { key: 'p2', label: '2nd period', start: '09:40', end: '10:10' },
  { key: 'break1', label: 'Break & hydration', start: '10:10', end: '10:25' },
  { key: 'p3', label: '3rd period', start: '10:25', end: '11:05' },
  { key: 'snack2', label: 'Snack & drink', start: '11:05', end: '11:15' },
  { key: 'p4', label: '4th period', start: '11:15', end: '11:45' },
  { key: 'p5', label: '5th period', start: '11:45', end: '12:25' },
  { key: 'lunch', label: 'Lunch & hydration', start: '12:25', end: '13:30' },
  { key: 'p6', label: '6th period', start: '13:30', end: '14:10' },
  { key: 'snack3', label: 'Snack & drink', start: '14:10', end: '14:20' },
  { key: 'p7', label: '7th period', start: '14:20', end: '14:50' },
  { key: 'p8', label: '8th period', start: '14:50', end: '15:30' },
  { key: 'break2', label: 'Break & hydration', start: '15:30', end: '15:40' },
  { key: 'p9', label: '9th period', start: '15:40', end: '16:20' },
  { key: 'p10', label: '10th period', start: '16:20', end: '17:00' },
  { key: 'home', label: 'Home / families', start: '17:00', end: '06:00' }
];

const fallbackSubjects = {
  oLevel: {
    Mathematics: 'mariage',
    English: 'jean',
    Kinyarwanda: 'nyiramana',
    Biology: 'maria',
    Chemistry: 'pual',
    Physics: 'peter',
    History: 'hohn',
    Geography: 'mike',
    French: 'iyve',
    ICT: 'justin',
    CRE: 'felex',
    'Life Skills': 'police',
    PE: 'evelyne'
  },
  elfk: {
    'English Literature': 'jean',
    French: 'iyve',
    Kinyarwanda: 'nyiramana',
    History: 'hohn',
    Economics: 'mike',
    Geography: 'maria',
    ICT: 'justin',
    Entrepreneurship: 'police',
    PE: 'evelyne'
  },
  hehl: {
    History: 'hohn',
    Economics: 'mike',
    'Home Economics': 'maria',
    'English Literature': 'jean',
    Geography: 'peter',
    ICT: 'justin',
    Entrepreneurship: 'police',
    CRE: 'felex',
    PE: 'evelyne'
  },
  mpc: {
    'Pure Mathematics': 'mariage',
    'Further Mathematics': 'pual',
    Physics: 'peter',
    Chemistry: 'pual',
    Biology: 'maria',
    ICT: 'justin',
    English: 'jean',
    Entrepreneurship: 'police',
    PE: 'evelyne'
  }
};

function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function getFallbackSubjects(classKey, level) {
  if (level.startsWith("O'Level")) return fallbackSubjects.oLevel;
  if (classKey.startsWith('elfk')) return fallbackSubjects.elfk;
  if (classKey.startsWith('hehl')) return fallbackSubjects.hehl;
  if (classKey.startsWith('mpc')) return fallbackSubjects.mpc;
  return {};
}

function getActiveSlot(now) {
  const minutes = now.getHours() * 60 + now.getMinutes();

  for (const slot of daySlots) {
    const start = toMinutes(slot.start);
    let end = toMinutes(slot.end);
    if (end <= start) end += 24 * 60;

    let current = minutes;
    if (current < start) current += 24 * 60;
    if (current >= start && current < end) return slot;
  }

  return null;
}

const allClassKeys = [
  's1A', 's1B', 's1C', 's1D', 's1E',
  's2A', 's2B', 's2C', 's2D',
  's3A', 's3B',
  'elfk_s4', 'elfk_s5', 'elfk_s6',
  'hehl_s4', 'hehl_s5', 'hehl_s6',
  'mpc_s4', 'mpc_s5', 'mpc_s6'
];

const oLevelSubjects = [
  'Mathematics', 'English', 'Kinyarwanda', 'Biology', 'Chemistry', 'Physics',
  'History', 'Geography', 'French', 'ICT', 'CRE', 'Life Skills', 'PE'
];
const oLevelTeachers = [
  'mariage', 'jean', 'nyiramana', 'maria', 'pual', 'peter',
  'hohn', 'mike', 'iyve', 'justin', 'felex', 'police', 'evelyne'
];

const aLevelStreams = {
  elfk: {
    subjects: ['English Literature', 'French', 'Kinyarwanda', 'History', 'Economics', 'Geography', 'ICT', 'Entrepreneurship', 'PE'],
    teachers: ['jean', 'iyve', 'nyiramana', 'hohn', 'mike', 'maria', 'justin', 'police', 'evelyne']
  },
  hehl: {
    subjects: ['History', 'Economics', 'Home Economics', 'English Literature', 'Geography', 'ICT', 'Entrepreneurship', 'CRE', 'PE'],
    teachers: ['hohn', 'mike', 'maria', 'jean', 'peter', 'justin', 'police', 'felex', 'evelyne']
  },
  mpc: {
    subjects: ['Pure Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT', 'English', 'Entrepreneurship', 'PE'],
    teachers: ['mariage', 'pual', 'peter', 'pual', 'maria', 'justin', 'jean', 'police', 'evelyne']
  }
};

function getClassIndex(classKey) {
  return allClassKeys.indexOf(classKey);
}

function getUniqueLessonForClass(classItem, slot) {
  if (!slot || !slot.key || !slot.key.startsWith('p')) return null;

  const classIndex = getClassIndex(classItem.key);
  if (classIndex < 0) return null;
  const periodIndex = Number(slot.key.replace('p', '')) - 1;

  if (classItem.school === "O'Level") {
    const subject = oLevelSubjects[(periodIndex + classIndex) % oLevelSubjects.length];
    const teacher = oLevelTeachers[(periodIndex * 3 + classIndex) % oLevelTeachers.length];
    return [subject, teacher];
  }

  const streamKey = classItem.key.split('_')[0];
  const stream = aLevelStreams[streamKey];
  if (!stream) return null;

  const subject = stream.subjects[(periodIndex + classIndex) % stream.subjects.length];
  const teacher = stream.teachers[(periodIndex * 2 + classIndex) % stream.teachers.length];
  return [subject, teacher];
}

function getCurrentLesson(classItem, slot) {
  return slot && slot.key && slot.key.startsWith('p')
    ? getUniqueLessonForClass(classItem, slot)
    : null;
}

function ClassCurrentLessonCard({ classItem, activeSlot }) {
  const currentLesson = classItem.currentLesson ?? getCurrentLesson(classItem, activeSlot);
  const isInClassPeriod = currentLesson !== null;
  const isBreakSlot = activeSlot && !activeSlot.key.startsWith('p');

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{classItem.school}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{classItem.level}</h3>
      </div>

      <div className="flex flex-1 flex-col justify-between px-4 py-4 text-sm">
        <div className="grid gap-3">
          <div className="grid grid-cols-[1fr_minmax(9rem,0.9fr)] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs uppercase tracking-[0.15em] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <span className="font-semibold">Activity now</span>
            <span className="text-right font-semibold">Teacher</span>
          </div>

          {isInClassPeriod ? (
            <div className="grid grid-cols-[1fr_minmax(9rem,0.9fr)] items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-900">
              <span>{currentLesson[0]}</span>
              <span className="text-right">{currentLesson[1]}</span>
            </div>
          ) : isBreakSlot ? (
            <div className="grid grid-cols-[1fr_minmax(9rem,0.9fr)] items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-900">
              <span>Eating and drinking</span>
              <span className="text-right">Campus staff</span>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 px-3 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              {activeSlot ? 'No class activity during this timeslot.' : 'No active timetable period.'}
            </div>
          )}
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-400">
          {activeSlot ? `${activeSlot.label} — ${activeSlot.start} to ${activeSlot.end}` : 'Outside timetable hours'}
        </div>
      </div>
    </article>
  );
}

function Timetable() {
  useSeo({
    title: 'Timetable / Groupe Scolaire Nemba',
    description: "All O'Level and A'Level class subjects with the teacher assigned to each class."
  });

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const classes = useMemo(() => {
    return Object.entries(classRoster.classes).map(([key, item]) => {
      const subjects = Object.keys(item.subjects || {}).length > 0
        ? item.subjects
        : getFallbackSubjects(key, item.level);

      return {
        key,
        level: item.level,
        school: item.level.startsWith("A'Level") ? "A'Level" : "O'Level",
        subjects: Object.entries(subjects)
      };
    });
  }, []);

  const activeSlot = getActiveSlot(now);
  const classCards = classes.map((classItem) => ({
    ...classItem,
    currentLesson: getCurrentLesson(classItem, activeSlot)
  }));

  const sections = [
    { title: "O'Level Classes", items: classCards.filter((item) => item.school === "O'Level") },
    { title: "A'Level Classes", items: classCards.filter((item) => item.school === "A'Level") }
  ];

  const totalSubjects = classes.reduce((total, item) => total + item.subjects.length, 0);

  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-36 pt-20 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-slate-900/30"
        style={{
          backgroundImage: `url(${timetableBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 rounded-3xl bg-slate-50/95 p-6 shadow-xl dark:bg-slate-900/95 sm:p-10">
        <section className="space-y-5 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">School timetable</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Current lessons in progress</h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            See the teacher currently teaching each class and the subject they are teaching right now.
          </p>
        </section>

      <header className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Groupe Scolaire Nemba</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {classes.length} classes, {totalSubjects} subject assignments across O'Level and A'Level.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <div className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
            {activeSlot ? `${activeSlot.label} (${activeSlot.start} - ${activeSlot.end})` : 'No active period'}
          </div>
          <div className="text-left md:text-right">
            <div className="font-mono text-lg">{now.toLocaleTimeString()}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{section.title}</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Current lesson and teacher for each class right now.
                  </p>
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {section.items.length} classes
                </span>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {section.items.map((classItem) => (
                  <ClassCurrentLessonCard key={classItem.key} classItem={classItem} activeSlot={activeSlot} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <AnnouncementsPanel className="lg:sticky lg:top-24 lg:self-start" />
      </section>
    </div>

      <section className="fixed bottom-6 left-0 right-0 mx-auto max-w-7xl px-4">
        <div className="flex gap-3 overflow-x-auto rounded-full border border-slate-200 bg-white/90 p-3 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          {daySlots.map((slot) => {
            const isActive = activeSlot && activeSlot.key === slot.key;
            return (
              <div
                key={slot.key}
                className={`min-w-[120px] flex-shrink-0 rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold">{slot.label}</div>
                <div className="text-[11px] opacity-80">{slot.start} - {slot.end}</div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Timetable;
