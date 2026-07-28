import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { PaymentHistory } from '../components/customer/PaymentHistory';

export const CustomerHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased">
      {/* Header collant avec effet Glassmorphism */}
      <div className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/40 p-4 sticky top-0 z-10 shadow-[0_4px_20px_rgba(15,10,26,0.8)]">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          {/* Bouton retour stylisé */}
          <button 
            onClick={() => navigate('/customer')} 
            className="p-2 rounded-lg bg-[#4c1d95]/20 text-[#6366f1] hover:text-[#ff6ef7] hover:bg-[#4c1d95]/50 border border-[#6366f1]/20 hover:border-[#ff6ef7]/50 transition-all duration-200 active:scale-95"
            aria-label="Retour"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#ff6ef7] bg-clip-text text-transparent">
              Historique des paiements
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Suivi en temps réel de vos transactions PayMarket
            </p>
          </div>
        </div>
      </div>
      
      {/* Conteneur principal */}
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        
        {/* Grille de statistiques rapides (Nouveau Contenu) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Stat 1 - Total Dépensé */}
          <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-xl p-4 flex items-center space-x-4 shadow-[0_4px_15px_rgba(76,29,149,0.1)]">
            <div className="p-3 rounded-lg bg-[#6366f1]/10 text-[#6366f1]">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Dépensé</p>
              <p className="text-lg font-bold text-slate-100">1 245,50 €</p>
            </div>
          </div>

          {/* Stat 2 - Transactions Réussies */}
          <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-xl p-4 flex items-center space-x-4 shadow-[0_4px_15px_rgba(76,29,149,0.1)]">
            <div className="p-3 rounded-lg bg-[#ec4899]/10 text-[#ec4899]">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Complétées</p>
              <p className="text-lg font-bold text-slate-100">18 factures</p>
            </div>
          </div>

          {/* Stat 3 - En attente */}
          <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-xl p-4 flex items-center space-x-4 shadow-[0_4px_15px_rgba(76,29,149,0.1)]">
            <div className="p-3 rounded-lg bg-[#ff6ef7]/10 text-[#ff6ef7] animate-pulse">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">En attente</p>
              <p className="text-lg font-bold text-slate-100">1 paiement</p>
            </div>
          </div>
        </div>

        {/* Section de l'historique détaillé */}
        <div className="bg-[#1a142e]/40 rounded-xl border border-[#4c1d95]/20 p-4 shadow-inner">
          <div className="flex items-center justify-between mb-4 border-b border-[#4c1d95]/20 pb-3">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Détails des transactions
            </h2>
            <span className="text-xs px-2 py-1 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30">
              ID: CUSTOMER_001
            </span>
          </div>
          
          {/* Le composant de la liste */}
          <PaymentHistory customerId="CUSTOMER_001" />
        </div>

      </div>
    </div>
  );
};