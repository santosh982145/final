import { motion } from 'framer-motion';
import { endpoints } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/UiStates';

export default function Recommendations() {
  const { data, loading, error } = useAsync(endpoints.recommendations, []);
  if (loading) return <LoadingSkeleton rows={4} />;
  if (error) return <ErrorState message={error} />;
  if (!data.items.length) return <EmptyState message="No recommendations right now." />;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.items.map((item) => (
        <motion.div key={item.title} whileHover={{ y: -3 }} className="glass rounded-2xl p-5">
          <div className="text-2xl">{item.icon}</div>
          <h3 className="mt-2 font-medium">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
          <span className="mt-3 inline-block rounded-full bg-slate-200 px-2 py-1 text-xs dark:bg-slate-800">Priority: {item.priority}</span>
        </motion.div>
      ))}
    </div>
  );
}
