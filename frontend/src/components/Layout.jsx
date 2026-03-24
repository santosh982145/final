import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  ['/', 'Dashboard'],
  ['/transactions', 'Transactions'],
  ['/insights', 'Insights'],
  ['/risk', 'Risk Analysis'],
  ['/recommendations', 'Recommendations'],
  ['/settings', 'Settings']
];

export default function Layout({ children, user, setUser }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-[240px_1fr]">
        <aside className="glass rounded-2xl p-4">
          <Link to="/" className="text-xl font-semibold text-brand-500">StabilityIQ</Link>
          <p className="mt-1 text-sm text-slate-500">Financial Health Intelligence</p>
          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `rounded-xl px-3 py-2 text-sm transition ${isActive ? 'bg-brand-500 text-white shadow-glow' : 'hover:bg-slate-200/70 dark:hover:bg-slate-800/80'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 space-y-2 border-t border-slate-300/40 pt-4 dark:border-slate-700/50">
            <button className="w-full rounded-xl bg-slate-200 px-3 py-2 text-sm dark:bg-slate-800" onClick={toggleTheme}>
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
            <button className="w-full rounded-xl bg-rose-500/90 px-3 py-2 text-sm text-white" onClick={logout}>Logout</button>
          </div>
        </aside>

        <main>
          <motion.header initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass mb-4 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Welcome back, {user?.name || 'User'}</h1>
              <span className="text-sm text-slate-500">Portfolio Health • Demo Mode</span>
            </div>
          </motion.header>
          {children}
        </main>
      </div>
    </div>
  );
}
