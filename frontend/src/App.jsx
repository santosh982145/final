import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import RiskAnalysis from './pages/RiskAnalysis';
import Recommendations from './pages/Recommendations';
import Settings from './pages/Settings';

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  if (!user && !['/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Routes location={location}>
          <Route path="/login" element={<AuthPage mode="login" onAuth={setUser} />} />
          <Route path="/signup" element={<AuthPage mode="signup" onAuth={setUser} />} />
          <Route path="/" element={<ProtectedRoute user={user}><Layout user={user} setUser={setUser}><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute user={user}><Layout user={user} setUser={setUser}><Transactions /></Layout></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute user={user}><Layout user={user} setUser={setUser}><Insights /></Layout></ProtectedRoute>} />
          <Route path="/risk" element={<ProtectedRoute user={user}><Layout user={user} setUser={setUser}><RiskAnalysis /></Layout></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute user={user}><Layout user={user} setUser={setUser}><Recommendations /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute user={user}><Layout user={user} setUser={setUser}><Settings user={user} /></Layout></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
