import { motion } from 'framer-motion';

function NewsCard({ news }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition dark:border-slate-700 dark:bg-slate-900">
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }} />
      <div className="p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">{news.category || 'Announcement'}</p>
        <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{news.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{news.excerpt}</p>
      </div>
    </motion.article>
  );
}

export default NewsCard;
