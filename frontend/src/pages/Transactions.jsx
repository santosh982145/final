import { useMemo, useState } from 'react';
import { endpoints } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { ErrorState, LoadingSkeleton, EmptyState } from '../components/UiStates';

export default function Transactions() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const { data, loading, error, setData } = useAsync(() => endpoints.transactions(), []);

  const filtered = useMemo(() => (data?.items || []).filter((t) =>
    (!query || t.description.toLowerCase().includes(query.toLowerCase())) &&
    (!category || t.category === category)
  ), [data, query, category]);

  const addMock = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());
    payload.amount = Number(payload.amount);
    const res = await endpoints.addTransaction(payload);
    setData({ items: [res.data, ...(data?.items || [])] });
    e.target.reset();
  };

  if (loading) return <LoadingSkeleton rows={5} />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="glass rounded-2xl p-5 lg:col-span-2">
        <div className="mb-3 flex flex-wrap gap-2">
          <input className="rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
          <select className="rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {[...new Set((data?.items || []).map((i) => i.category))].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {!filtered.length ? <EmptyState message="No transactions match current filters." /> : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-500"><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-t border-slate-200/60 dark:border-slate-700/60">
                    <td className="py-2">{t.date}</td><td>{t.description}</td><td>{t.category}</td>
                    <td className={t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>{t.type === 'income' ? '+' : '-'}${t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <form onSubmit={addMock} className="glass rounded-2xl p-5 space-y-2">
        <h3 className="font-medium">Add Transaction (Mock)</h3>
        <input required name="date" type="date" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" />
        <input required name="description" placeholder="Description" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" />
        <input required name="category" placeholder="Category" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" />
        <input required name="amount" type="number" step="0.01" placeholder="Amount" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" />
        <select name="type" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700"><option>expense</option><option>income</option></select>
        <button className="w-full rounded-lg bg-brand-500 p-2 text-white">Add</button>
      </form>
    </div>
  );
}
