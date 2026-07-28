import { useState } from 'react';
import { ShieldCheck, Phone, Key, Smartphone, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [operator, setOperator] = useState<'mvola' | 'orange' | 'airtel' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !pin || !operator) {
      toast.error('Veuillez remplir tous les champs et choisir votre opérateur');
      return;
    }
    toast.success('Authentification réussie, redirection...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0a1a] text-slate-100 font-sans antialiased p-4">
      
      {/* Conteneur principal de la carte d'authentification */}
      <div className="bg-[#1a142e]/70 backdrop-blur-md p-8 rounded-3xl border border-[#4c1d95]/40 w-full max-w-md shadow-[0_10px_50px_rgba(15,10,26,0.8)] relative overflow-hidden">
        
        {/* Effet de lueur en arrière-plan Néon Cyber */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-[#ec4899]/20 via-[#8b5cf6]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-gradient-to-tr from-[#6366f1]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* En-tête de la carte */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#ff6ef7] bg-clip-text text-transparent tracking-wider">
            PAYMARKET
          </h1>
          <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            <ShieldCheck size={12} className="text-[#ff6ef7]" /> Passerelle Authentifiée
          </div>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* ÉLÉMENT AJOUTÉ : Sélection de l'opérateur monétique */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
              1. Choisir le réseau monétique
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOperator('mvola')}
                className={`py-2 px-1 text-center font-mono font-bold text-xs rounded-xl border transition-all ${
                  operator === 'mvola'
                    ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                    : 'bg-[#0f0a1a] border-[#4c1d95]/30 text-slate-400 hover:border-[#8b5cf6]/40'
                }`}
              >
                MVOLA
              </button>
              <button
                type="button"
                onClick={() => setOperator('orange')}
                className={`py-2 px-1 text-center font-mono font-bold text-xs rounded-xl border transition-all ${
                  operator === 'orange'
                    ? 'bg-[#ec4899]/20 border-[#ec4899] text-white shadow-[0_0_10px_rgba(236,72,153,0.2)]'
                    : 'bg-[#0f0a1a] border-[#4c1d95]/30 text-slate-400 hover:border-[#ec4899]/40'
                }`}
              >
                ORANGE
              </button>
              <button
                type="button"
                onClick={() => setOperator('airtel')}
                className={`py-2 px-1 text-center font-mono font-bold text-xs rounded-xl border transition-all ${
                  operator === 'airtel'
                    ? 'bg-[#6366f1]/20 border-[#6366f1] text-white shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                    : 'bg-[#0f0a1a] border-[#4c1d95]/30 text-slate-400 hover:border-[#6366f1]/40'
                }`}
              >
                AIRTEL
              </button>
            </div>
          </div>

          {/* Numéro de téléphone */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              2. Numéro de compte mobile
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone size={16} className="text-[#8b5cf6]" />
              </div>
              <input
                type="tel"
                placeholder="034 12 345 67"
                className="w-full bg-[#0f0a1a] border border-[#4c1d95]/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6ef7] focus:shadow-[0_0_12px_rgba(255,110,247,0.15)] transition-all font-mono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          
          {/* ÉLÉMENT AJOUTÉ : Clé PIN / Code de Sécurité */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              3. Code secret ou OTP
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Key size={16} className="text-[#ec4899]" />
              </div>
              <input
                type="password"
                maxLength={6}
                placeholder="••••••"
                className="w-full bg-[#0f0a1a] border border-[#4c1d95]/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 tracking-widest focus:outline-none focus:border-[#ff6ef7] focus:shadow-[0_0_12px_rgba(255,110,247,0.15)] transition-all font-mono"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          {/* ÉLÉMENT AJOUTÉ : Petite note d'information de sécurité */}
          <div className="flex items-start gap-2 bg-[#0f0a1a]/50 border border-[#4c1d95]/20 p-3 rounded-xl text-[11px] text-slate-400 leading-normal">
            <Info size={14} className="text-[#6366f1] shrink-0 mt-0.5" />
            <p>Une notification push de confirmation réseau sera envoyée sur votre terminal <span className="text-white font-medium">SIM</span> après validation.</p>
          </div>
          
          {/* Bouton de soumission */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(236,72,153,0.25)] hover:opacity-95 hover:shadow-[0_4px_25px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Smartphone size={14} /> Initialiser la session
          </button>
        </form>

        {/* Note de pied de page */}
        <div className="mt-8 pt-4 border-t border-[#4c1d95]/10 text-center text-[10px] text-slate-500 tracking-wider uppercase font-mono">
          AES-256 Chiffrement Militaire
        </div>
      </div>
    </div>
  );
};