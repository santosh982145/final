import { motion } from 'framer-motion';

export default function ConsentModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass max-w-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold">Privacy & Consent Details</h3>
        <p className="mt-3 text-sm text-slate-500">
          StabilityIQ uses your explicitly consented data sources only. You can revoke consent any time. This demo stores all settings locally and uses mock APIs with no real financial data.
        </p>
        <button onClick={onClose} className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-white">Understood</button>
      </motion.div>
    </div>
  );
}
