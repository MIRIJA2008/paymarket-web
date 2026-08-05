import { useNavigate } from 'react-router-dom';
import { QrCode, Store, User, Shield, ArrowRight, Zap, RefreshCw, Layers, TrendingUp, CheckCircle, HelpCircle } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleMerchantClick = () => {
    navigate('/login', { state: { role: 'merchant' } });
  };

  const handleCustomerClick = () => {
    navigate('/login', { state: { role: 'customer' } });
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased selection:bg-[#ec4899] selection:text-white pb-16">
      
      {/* --- HEADER GLOW --- */}
      <div className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/40 p-5 sticky top-0 z-50 shadow-[0_4px_30px_rgba(15,10,26,0.6)]">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#ff6ef7] bg-clip-text text-transparent">
              PAYMARKET
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block mt-0.5">
              Hub Interopérable Multi-Opérateurs
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Indicateur de statut des passerelles API */}
            <div className="hidden md:flex items-center gap-3 bg-[#0f0a1a] border border-[#4c1d95]/40 px-3 py-1.5 rounded-xl text-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400 font-medium">Réseaux : <span className="text-emerald-400 font-bold font-mono">100% Opérationnels</span></span>
            </div>
            
            <div className="p-2.5 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ff6ef7] shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <Shield size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 mt-8">
        
        {/* --- SECTION HERO & BANDEAU INFO --- */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#ff6ef7] text-[10px] font-black uppercase tracking-widest rounded-full">
            Nouveau standard financier à Madagascar
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4 leading-none">
            Rapprocher vos solutions de <span className="bg-gradient-to-r from-[#ff6ef7] to-[#ec4899] bg-clip-text text-transparent">Mobile Money</span>
          </h2>
          <p className="text-slate-400 text-sm mt-4 leading-relaxed">
            Payer instantanément vos achats chez n'importe quel marchand de la grande île. Une passerelle unique, chiffrée, sans frais masqués pour MVola, Orange Money et Airtel Money.
          </p>
          
          {/* Compteurs statistiques */}
          <div className="grid grid-cols-3 gap-2 bg-[#1a142e]/40 border border-[#4c1d95]/20 rounded-2xl p-4 mt-8 max-w-lg mx-auto backdrop-blur-sm">
            <div className="text-center">
              <p className="text-lg font-black text-white font-mono">99.9%</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Uptime API</p>
            </div>
            <div className="text-center border-x border-[#4c1d95]/20">
              <p className="text-lg font-black text-[#ff6ef7] font-mono">&lt; 2s</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Vitesse Débit</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-black text-white font-mono">0 Ar</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Frais Client</p>
            </div>
          </div>
        </div>

        {/* --- ACTIONS CENTRALES (CARDS RE-DESIGNÉES) --- */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Espace Marchand Card */}
          <div 
            onClick={handleMerchantClick}
            className="group relative bg-[#1a142e]/60 backdrop-blur-sm rounded-3xl border border-[#4c1d95]/30 p-8 cursor-pointer transition-all duration-300 hover:border-[#ec4899]/60 hover:shadow-[0_0_40px_rgba(236,72,153,0.12)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ec4899]/5 rounded-full blur-2xl group-hover:bg-[#ec4899]/10 transition-colors" />
            <div className="flex flex-col h-full justify-between items-center sm:items-start text-center sm:text-left">
              <div>
                <div className="bg-[#ec4899]/10 rounded-2xl p-4 mb-6 border border-[#ec4899]/20 group-hover:bg-[#ec4899]/20 group-hover:border-[#ff6ef7]/40 inline-block transition-all shadow-inner">
                  <Store size={36} className="text-[#ff6ef7] drop-shadow-[0_0_8px_rgba(255,110,247,0.4)]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Espace Professionnel</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Générez vos QR Codes uniques, encaissez les clients de tous les réseaux et exportez vos écritures comptables sans complexité.
                </p>
              </div>
              <button className="w-full bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(236,72,153,0.2)] group-hover:shadow-[0_4px_20px_rgba(236,72,153,0.35)] transition-all flex items-center justify-center gap-2">
                Console Marchand <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Espace Client Card */}
          <div 
            onClick={handleCustomerClick}
            className="group relative bg-[#1a142e]/60 backdrop-blur-sm rounded-3xl border border-[#4c1d95]/30 p-8 cursor-pointer transition-all duration-300 hover:border-[#6366f1]/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/5 rounded-full blur-2xl group-hover:bg-[#6366f1]/10 transition-colors" />
            <div className="flex flex-col h-full justify-between items-center sm:items-start text-center sm:text-left">
              <div>
                <div className="bg-[#6366f1]/10 rounded-2xl p-4 mb-6 border border-[#6366f1]/20 group-hover:bg-[#6366f1]/20 group-hover:border-[#6366f1]/50 inline-block transition-all shadow-inner">
                  <User size={36} className="text-[#6366f1] drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Espace Particulier</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Scannez les terminaux de vente physiques ou factures numériques, validez par code USSD sécurisé et gérez votre budget consolidé.
                </p>
              </div>
              <button className="w-full bg-[#0f0a1a] text-slate-200 border border-[#4c1d95]/60 group-hover:border-[#6366f1] group-hover:text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                Accéder au Scanner <QrCode size={14} className="text-[#6366f1]" />
              </button>
            </div>
          </div>
          
        </div>

        {/* --- NOUVEAU CONTENU : SUIVI EN DIRECT DES TRANSACTIONS SIMULÉES --- */}
        <div className="mt-12 bg-[#1a142e]/30 border border-[#4c1d95]/20 rounded-3xl p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#4c1d95]/10 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <TrendingUp size={14} className="text-[#ff6ef7]" /> Flux Réseau Récent
            </div>
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <RefreshCw size={10} className="animate-spin text-[#8b5cf6]" /> Live Feed
            </span>
          </div>
          
          <div className="space-y-2.5">
            <div className="flex justify-between items-center bg-[#0f0a1a]/40 border border-[#4c1d95]/20 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#8b5cf6]/10 text-[#8b5cf6] font-mono">MVOLA</span>
                <span className="text-slate-300 font-medium">Boutique Tsena-Glow</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-white">45,000 Ar</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle size={10} /> Validé</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-[#0f0a1a]/40 border border-[#4c1d95]/20 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#ec4899]/10 text-[#ec4899] font-mono">ORANGE</span>
                <span className="text-slate-300 font-medium">Cyber-Market Analakely</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-white">12,500 Ar</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle size={10} /> Validé</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION DES VALEURS / CARACTÉRISTIQUES --- */}
        <div className="mt-16 bg-[#1a142e]/40 backdrop-blur-sm rounded-3xl border border-[#4c1d95]/30 p-8 max-w-4xl mx-auto">
          <h3 className="text-lg font-black text-center text-white mb-8 uppercase tracking-widest text-[#8b5cf6]">
            Infrastructure Technologique
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center sm:text-left p-2">
              <div className="bg-[#4c1d95]/30 text-[#ff6ef7] rounded-xl p-3 inline-block mb-3 border border-[#6366f1]/20 shadow-md">
                <QrCode size={20} />
              </div>
              <p className="font-bold text-white text-sm">Décodage Instantané</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Lecture matricielle haute vitesse, même sur écrans basse luminosité.</p>
            </div>
            
            <div className="text-center sm:text-left p-2">
              <div className="bg-[#4c1d95]/30 text-[#8b5cf6] rounded-xl p-3 inline-block mb-3 border border-[#6366f1]/20 shadow-md">
                <Layers size={20} />
              </div>
              <p className="font-bold text-white text-sm">Multi-Réseaux</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Agrégation intelligente des protocoles de routage USSD locaux.</p>
            </div>

            <div className="text-center sm:text-left p-2">
              <div className="bg-[#4c1d95]/30 text-[#ec4899] rounded-xl p-3 inline-block mb-3 border border-[#6366f1]/20 shadow-md">
                <Zap size={20} />
              </div>
              <p className="font-bold text-white text-sm">Frais Nuls</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Aucun coût d'infrastructure additionnel imputé au payeur final.</p>
            </div>

            <div className="text-center sm:text-left p-2">
              <div className="bg-[#4c1d95]/30 text-emerald-400 rounded-xl p-3 inline-block mb-3 border border-[#6366f1]/20 shadow-md">
                <Shield size={20} />
              </div>
              <p className="font-bold text-white text-sm">Chiffrement AES</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Jetons d'authentification éphémères pour empêcher les fraudes.</p>
            </div>
            
          </div>
        </div>

        {/* --- NOUVEAU FOOTER COMPACT INTELLIGENT --- */}
        <footer className="mt-16 text-center text-xs text-slate-500 border-t border-[#4c1d95]/10 pt-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 PayMarket Technologies. Tous droits réservés.</p>
          <div className="flex gap-4 text-[11px]">
            <a href="#help" className="hover:text-[#ff6ef7] flex items-center gap-1"><HelpCircle size={12} /> Centre de support</a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-mono">v2.4.0-Stable</span>
          </div>
        </footer>

      </div>
    </div>
  );
};