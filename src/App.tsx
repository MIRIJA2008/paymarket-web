import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { CustomerHome } from './pages/CustomerHome';
import { CustomerHistory } from './pages/CustomerHistory';
import { CustomerProfile } from './pages/CustomerProfile';
import { CustomerPayment } from './pages/CustomerPayment';

// Initialisation du client de requêtes pour TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-[#0f0a1a] text-slate-100">
          <Routes>
            {/* Routes Publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div className="p-8 text-center font-bold">Inscription (Module en cours de déploiement)</div>} />
            
            {/* Espace Marchand */}
            <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
            
            {/* Espace Client (Mobile Money) */}
            <Route path="/customer" element={<CustomerHome />} />
            <Route path="/customer/scan" element={<CustomerPayment />} />
            <Route path="/customer/history" element={<CustomerHistory />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
          </Routes>
        </div>
        
        {/* Configuration du composant de notifications globales */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#1a142e',
              color: '#f8fafc',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            },
          }} 
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;