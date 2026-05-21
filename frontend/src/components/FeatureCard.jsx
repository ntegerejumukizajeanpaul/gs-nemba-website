function FeatureCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h4>
      <p className="mt-3 text-slate-600 dark:text-slate-400">{text}</p>
    </div>
  );
}

export default FeatureCard;
