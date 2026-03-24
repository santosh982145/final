export function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}
    </div>
  );
}

export function ErrorState({ message }) {
  return <div className="glass rounded-xl p-6 text-rose-400">{message || 'Could not load data.'}</div>;
}

export function EmptyState({ message }) {
  return <div className="glass rounded-xl p-6 text-slate-500">{message || 'No records available.'}</div>;
}
