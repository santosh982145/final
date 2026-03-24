import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { endpoints } from '../services/api';

export default function AuthPage({ mode = 'login', onAuth }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password || (!isLogin && !form.name)) return setError('Please fill all required fields.');
    const fn = isLogin ? endpoints.login : endpoints.signup;
    try {
      const { data } = await fn(form);
      onAuth(data.user);
    } catch {
      setError('Authentication failed.');
    }
  };

  const demoLogin = async () => {
    const { data } = await endpoints.login({ email: 'demo@stabilityiq.com', password: 'demo123' });
    onAuth(data.user);
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">{isLogin ? 'Welcome back' : 'Create account'}</h1>
        <p className="text-sm text-slate-500">StabilityIQ – Your financial stability copilot.</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <AnimatePresence>
            {!isLogin && (
              <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} placeholder="Full name" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
          </AnimatePresence>
          <input placeholder="Email" type="email" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" className="w-full rounded-lg border border-slate-300 bg-transparent p-2 dark:border-slate-700" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button className="w-full rounded-lg bg-brand-500 p-2 text-white">{isLogin ? 'Login' : 'Sign Up'}</button>
          <button type="button" onClick={demoLogin} className="w-full rounded-lg bg-slate-700 p-2 text-white">Demo Login</button>
          <button type="button" className="text-xs text-slate-500">Forgot password? (mock)</button>
        </form>
        <button onClick={() => setIsLogin((s) => !s)} className="mt-4 text-sm text-brand-500">
          {isLogin ? 'Need an account? Sign up' : 'Already registered? Login'}
        </button>
      </motion.div>
    </div>
  );
}
