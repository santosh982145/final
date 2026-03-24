import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import { endpoints } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { ErrorState, LoadingSkeleton } from '../components/UiStates';
import RiskGauge from '../components/RiskGauge';

const colors = ['#5b7cfa', '#31c48d', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const { data, loading, error } = useAsync(endpoints.summary, []);
  if (loading) return <LoadingSkeleton rows={4} />;
  if (error) return <ErrorState message={error} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 lg:grid-cols-3">
      <div className="glass rounded-2xl p-5 lg:col-span-2">
        <div className="text-sm text-slate-500">Total Balance</div>
        <div className="text-3xl font-semibold">${data.total_balance.toLocaleString()}</div>
      </div>
      <RiskGauge score={data.risk_score} />

      <div className="glass rounded-2xl p-5 lg:col-span-2">
        <h3 className="mb-4 font-medium">Income vs Expense</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={data.income_expense_trend}>
              <XAxis dataKey="month" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="income" stroke="#31c48d" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="mb-4 font-medium">Category Spend</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data.category_distribution} innerRadius={55} outerRadius={90} dataKey="value">
                {data.category_distribution.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 lg:col-span-3">
        <h3 className="font-medium">Insights</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-500">
          {data.insights.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </motion.div>
  );
}
