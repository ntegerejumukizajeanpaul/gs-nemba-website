function Spinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-7 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading content...</p>
      </div>
    </div>
  );
}

export default Spinner;
