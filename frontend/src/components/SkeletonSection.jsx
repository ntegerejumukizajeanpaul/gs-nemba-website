function SkeletonSection() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonSection;
