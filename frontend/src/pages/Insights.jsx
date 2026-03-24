import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { endpoints } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { LoadingSkeleton, ErrorState } from '../components/UiStates';

export default function Insights() {
  const { data, loading, error } = useAsync(endpoints.insights, []);
  if (loading) return <LoadingSkeleton rows={3} />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass rounded-2xl p-5">
        <h3 className="mb-3 font-medium">Monthly Comparison</h3>
        <div className="h-64"><ResponsiveContainer><BarChart data={data.monthly_comparison}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="spend" fill="#5b7cfa" /></BarChart></ResponsiveContainer></div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="mb-3 font-medium">Volatility Trend</h3>
        <div className="h-64"><ResponsiveContainer><LineChart data={data.volatility}><XAxis dataKey="month" /><YAxis /><Tooltip /><Line dataKey="index" stroke="#f59e0b" /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="glass rounded-2xl p-5 lg:col-span-2">
        <h3 className="font-medium">Trend Insights</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-500">{data.notes.map((n) => <li key={n}>{n}</li>)}</ul>
      </div>
    </div>
  );
}
