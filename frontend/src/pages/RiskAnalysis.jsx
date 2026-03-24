import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { endpoints } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { LoadingSkeleton, ErrorState } from '../components/UiStates';

function Indicator({ label, value }) {
  const color = value > 70 ? 'bg-rose-500' : value > 40 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
    </div>
  );
}

export default function RiskAnalysis() {
  const { data, loading, error } = useAsync(endpoints.risk, []);
  if (loading) return <LoadingSkeleton rows={4} />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="glass rounded-2xl p-5 lg:col-span-2 space-y-4">
        <h3 className="font-medium">Risk Indicators ({data.level})</h3>
        <Indicator label="Income-Expense Ratio Risk" value={data.indicators.ratio} />
        <Indicator label="Volatility Risk" value={data.indicators.volatility} />
        <Indicator label="Liquidity Risk" value={data.indicators.liquidity} />
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-medium">Composite Risk Score</h3>
        <div className="mt-3 text-4xl font-semibold">{data.score}</div>
      </div>
      <div className="glass rounded-2xl p-5 lg:col-span-3">
        <h3 className="mb-3 font-medium">Monthly Risk Components</h3>
        <div className="h-72"><ResponsiveContainer><BarChart data={data.monthly_breakdown}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="ratio" stackId="a" fill="#5b7cfa" /><Bar dataKey="volatility" stackId="a" fill="#f59e0b" /><Bar dataKey="liquidity" stackId="a" fill="#ef4444" /></BarChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}
