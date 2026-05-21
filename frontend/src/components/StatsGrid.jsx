import { motion } from 'framer-motion';

function StatsGrid({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <p className="text-4xl font-semibold text-primary">{item.value}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsGrid;
