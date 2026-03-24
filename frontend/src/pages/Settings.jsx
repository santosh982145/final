import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ConsentModal from '../components/ConsentModal';

export default function Settings({ user }) {
  const { theme, toggleTheme } = useTheme();
  const [consent, setConsent] = useState({ csv: true, sms: false, api: true });
  const [open, setOpen] = useState(false);

  const flip = (key) => setConsent((c) => ({ ...c, [key]: !c[key] }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass rounded-2xl p-5">
        <h3 className="font-medium">Profile</h3>
        <p className="mt-2 text-sm">{user?.name}</p>
        <p className="text-sm text-slate-500">{user?.email}</p>
        <button onClick={toggleTheme} className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-white">Theme: {theme}</button>
      </div>
      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="font-medium">Consent Management</h3>
        {[
          ['csv', 'CSV Upload Consent'],
          ['sms', 'SMS Parsing Access'],
          ['api', 'Bank API Connection']
        ].map(([k, label]) => (
          <label key={k} className="flex items-center justify-between rounded-lg bg-slate-200/60 p-2 dark:bg-slate-800/60">
            <span>{label}</span>
            <input checked={consent[k]} onChange={() => flip(k)} type="checkbox" className="h-4 w-4" />
          </label>
        ))}
        <button className="text-sm text-brand-500" onClick={() => setOpen(true)}>View privacy explanation</button>
      </div>
      <ConsentModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
