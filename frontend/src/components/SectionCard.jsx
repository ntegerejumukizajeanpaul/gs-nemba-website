function SectionCard({ title, children, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">{icon}</div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="mt-4 text-slate-600 dark:text-slate-300">{children}</div>
    </div>
  );
}

export default SectionCard;
