import { motion } from 'framer-motion';

export default function RiskGauge({ score }) {
  const clamped = Math.max(0, Math.min(100, score || 0));
  const color = clamped < 35 ? 'bg-emerald-500' : clamped < 70 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="mb-4 text-sm font-medium text-slate-500">Risk Score</h3>
      <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800">
        <motion.div initial={{ width: 0 }} animate={{ width: `${clamped}%` }} transition={{ duration: 1.1 }} className={`h-3 rounded-full ${color}`} />
      </div>
      <div className="mt-3 text-2xl font-semibold">{clamped}</div>
    </div>
  );
}
