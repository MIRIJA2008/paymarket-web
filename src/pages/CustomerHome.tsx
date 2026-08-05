import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, History, User, CreditCard, Bell, ArrowRight, Star, Clock, Zap, TrendingUp, Sparkles, Smartphone } from 'lucide-react';
import { MerchantRating } from '../components/customer/MerchantRating';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

export const CustomerHome = () => {
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState(false);
  const user = useAuthStore((state) => state.user);
  const unread = useNotificationStore((state) => state.unreadCount());
  
  const recentTransactions = [
    { id: 1, merchant: 'Boutique Express', amount: 12500, date: "Aujourd'hui", time: '10:30' },
    { id: 2, merchant: 'Resto Chez nous', amount: 35000, date: 'Hier', time: '19:15' },
    { id: 3, merchant: 'Super Marché Tana', amount: 8900, date: 'Hier', time: '14:45' }
  ];

  // Contenu ajouté : Offres promotionnelles du moment
  const neonOffers = [
    { id: 1, tag: 'Cashback', text: '10% de retour chez Resto Chez nous', code: 'SUNSET10', color: 'from-[#ec4899] to-[#ff6ef7]' },
    { id: 2, tag: 'Partenaire', text: 'Frais offerts via MVola ce weekend', code: 'FREEVOLA', color: 'from-[#6366f1] to-[#8b5cf6]' }
  ];

  const quickActions = [
    {
      icon: Scan,
      label: 'Scanner',
      description: 'Payer avec QR Code',
      color: 'bg-gradient-to-br from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]',
      onClick: () => navigate('/customer/scan')
    },
    {
      icon: History,
      label: 'Historique',
      description: 'Voir mes paiements',
      color: 'bg-[#1a142e] text-[#6366f1] border border-[#6366f1]/30 hover:border-[#6366f1]/80',
      onClick: () => navigate('/customer/history')
    },
    {
      icon: Star,
      label: 'Évaluer',
      description: 'Noter un commerçant',
      color: 'bg-[#1a142e] text-[#ff6ef7] border border-[#ff6ef7]/30 hover:border-[#ff6ef7]/80',
      onClick: () => setShowRating(true)
    },
    {
      icon: User,
      label: 'Profil',
      description: 'Mes informations',
      color: 'bg-[#1a142e] text-[#8b5cf6] border border-[#8b5cf6]/30 hover:border-[#8b5cf6]/80',
      onClick: () => navigate('/customer/profile')
    }
  ];

  if (showRating) {
    return (
      <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased">
        <div className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/40 p-4 sticky top-0 z-50">
          <button onClick={() => setShowRating(false)} className="mb-2 text-slate-400 hover:text-[#ff6ef7] transition-colors flex items-center gap-1 text-sm">
            ← Retour
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#ec4899] to-[#ff6ef7] bg-clip-text text-transparent">Évaluer un commerçant</h1>
        </div>
        <div className="p-4 max-w-xl mx-auto">
          <div className="bg-[#1a142e]/60 rounded-2xl border border-[#4c1d95]/40 p-6 shadow-[0_0_25px_rgba(76,29,149,0.2)]">
            <MerchantRating 
              merchantId="MERCHANT_001" 
              merchantName="Boutique Express"
              onRated={() => setShowRating(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased pb-12">
      
      {/* Header & Solde Card */}
      <div className="bg-gradient-to-b from-[#1a142e] to-[#0f0a1a] border-b border-[#4c1d95]/30">
        <div className="max-w-2xl mx-auto px-4 pt-8 pb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xs font-semibold tracking-widest text-[#6366f1] uppercase">Tableau de bord</h1>
              <p className="text-2xl font-black tracking-tight text-white mt-0.5 flex items-center gap-2">
                {user?.name ?? 'Client PayMarket'} <Sparkles size={18} className="text-[#ff6ef7] animate-pulse" />
              </p>
            </div>
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2.5 bg-[#1a142e] rounded-xl border border-[#4c1d95]/40 hover:border-[#ec4899]/60 transition-colors shadow-lg"
            >
              <Bell size={20} className="text-slate-300" />
              {unread > 0 && (
                <>
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#ec4899] rounded-full animate-ping"></span>
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#ff6ef7] rounded-full shadow-[0_0_8px_#ff6ef7]"></span>
                </>
              )}
            </button>
          </div>
          
          {/* Carte Solde Cyber-Glow */}
          <div className="relative bg-[#1a142e]/80 backdrop-blur-md rounded-2xl p-6 border border-[#8b5cf6]/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden group">
            {/* Effets lumineux d'arrière-plan */}
            <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-gradient-to-br from-[#ec4899]/20 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-gradient-to-br from-[#6366f1]/10 to-transparent rounded-full blur-xl" />
            
            <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <p className="text-[#8b5cf6] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Zap size={12} className="text-[#ff6ef7]" /> Solde disponible
                </p>
                <p className="text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#ff6ef7] bg-clip-text text-transparent">
                  125 000 Ar
                </p>
                <div className="pt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Smartphone size={12} className="text-[#6366f1]" />
                  <span className="font-mono bg-[#0f0a1a]/80 px-2 py-0.5 rounded border border-[#4c1d95]/40">
                    MVola • Orange • Airtel
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#ec4899]/10 to-[#6366f1]/10 rounded-2xl border border-[#4c1d95]/30">
                <CreditCard size={36} className="text-[#ff6ef7] drop-shadow-[0_0_10px_rgba(255,110,247,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        
        {/* Actions rapides */}
        <div className="-mt-6 mb-8">
          <div className="bg-[#1a142e]/90 backdrop-blur-md rounded-2xl border border-[#4c1d95]/40 shadow-2xl p-4 grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="text-center group flex flex-col items-center justify-between transition-all"
                >
                  <div className={`${action.color} rounded-xl p-3 mb-2 w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-300 group-hover:text-[#ff6ef7] transition-colors">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu ajouté : Mini Graphique / Analytics d'activité */}
        <div className="bg-[#1a142e]/40 border border-[#4c1d95]/20 rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#6366f1]" /> Aperçu mensuel
            </h3>
            <span className="text-[10px] text-[#ff6ef7] font-mono bg-[#ff6ef7]/10 px-2 py-0.5 rounded">Frais réduits</span>
          </div>
          <div className="flex items-end justify-between h-12 pt-2 px-4 gap-2">
            {[40, 70, 55, 90, 35, 60, 80].map((val, i) => (
              <div key={i} className="w-full bg-[#0f0a1a] rounded-t h-full flex items-end">
                <div 
                  style={{ height: `${val}%` }} 
                  className={`w-full rounded-t bg-gradient-to-t ${i === 3 ? 'from-[#ec4899] to-[#ff6ef7] shadow-[0_0_10px_#ff6ef7]' : 'from-[#4c1d95] to-[#6366f1]'} transition-all duration-500`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Transactions récentes */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold tracking-tight text-white uppercase tracking-wider">Transactions récentes</h2>
            <button 
              onClick={() => navigate('/customer/history')}
              className="text-[#ff6ef7] hover:text-[#ec4899] text-xs font-bold flex items-center gap-1 transition-all group"
            >
              Voir tout
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-[#1a142e]/50 rounded-xl p-4 border border-[#4c1d95]/20 hover:border-[#6366f1]/40 flex justify-between items-center transition-all duration-300 hover:translate-x-0.5">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0f0a1a] border border-[#4c1d95]/40 text-[#6366f1] rounded-xl p-2.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-100 text-sm">{transaction.merchant}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{transaction.date} à {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-slate-100 text-sm">{transaction.amount.toLocaleString()} Ar</p>
                  <span className="inline-block text-[9px] font-black tracking-widest text-[#ff6ef7] bg-[#ec4899]/10 px-2 py-0.5 rounded border border-[#ec4899]/20 mt-1 uppercase">
                    Payé
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contenu ajouté : Section Bons Plans Néon */}
        <div className="mb-8">
          <h2 className="text-base font-bold tracking-tight text-white uppercase tracking-wider mb-4">Offres Néon Sunset</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {neonOffers.map((offer) => (
              <div key={offer.id} className="bg-[#1a142e]/40 border border-[#4c1d95]/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-gradient-to-r ${offer.color} text-white`}>
                    {offer.tag}
                  </span>
                  <p className="text-xs text-slate-300 font-semibold mt-2">{offer.text}</p>
                </div>
                <div className="flex justify-between items-center bg-[#0f0a1a]/60 p-2 rounded-lg border border-[#4c1d95]/30">
                  <span className="font-mono text-[10px] tracking-wider text-slate-400">Code: <strong className="text-white">{offer.code}</strong></span>
                  <span className="text-[10px] text-[#ff6ef7] font-bold cursor-pointer hover:underline">Copier</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Fidélité Cyberpunk */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#1a142e] via-[#4c1d95]/20 to-[#1a142e] rounded-2xl p-5 border border-[#ec4899]/30 shadow-lg">
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#ff6ef7]/5 to-transparent pointer-events-none" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <p className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-[#ff6ef7] animate-bounce">🎁</span> PROGRAMME FIDÉLITÉ
              </p>
              <p className="text-xs text-slate-400 mt-1">Gagnez des points exclusifs à chaque transaction payée et convertissez-les en bonus.</p>
            </div>
            <button className="bg-gradient-to-r from-[#4c1d95] to-[#6366f1] hover:from-[#6366f1] hover:to-[#8b5cf6] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all w-full sm:w-auto text-center shadow-md">
              Rejoindre
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};