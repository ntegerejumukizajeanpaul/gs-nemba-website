import { motion } from 'framer-motion';

function GalleryCard({ item }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <img src={item.image} alt={item.title} loading="lazy" className="h-56 w-full object-cover" />
      <div className="p-5">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
      </div>
    </motion.div>
  );
}

export default GalleryCard;
