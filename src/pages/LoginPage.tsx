import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowRight, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore, type UserRole } from '../store/authStore';

export const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Le rôle voulu est transmis par la HomePage (bouton "Marchand" ou "Client").
  // Par défaut on considère un accès client.
  const role: UserRole = (location.state as { role?: UserRole } | null)?.role ?? 'customer';

  const handleSendOTP = () => {
    if (!phone || phone.length < 9) {
      toast.error('Numéro de téléphone invalide');
      return;
    }
    toast.success(`Code OTP envoyé au ${phone}`);
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Code OTP invalide');
      return;
    }

    login({
      phone,
      name: role === 'merchant' ? 'Compte Marchand' : 'Compte Client',
      role,
    });

    toast.success('Connexion réussie !');
    navigate(role === 'merchant' ? '/merchant/dashboard' : '/customer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0a1a] text-slate-100 font-sans antialiased p-4">
      <div className="bg-[#1a142e]/70 backdrop-blur-md rounded-3xl border border-[#4c1d95]/40 p-8 w-full max-w-md shadow-[0_10px_50px_rgba(15,10,26,0.8)] relative overflow-hidden">
        
        {/* Lueur d'ambiance Néon Cyber */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-[#ec4899]/10 via-[#8b5cf6]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Bouton Retour (uniquement à l'étape OTP) */}
        {step === 'otp' && (
          <button 
            onClick={() => setStep('phone')}
            className="absolute top-6 left-6 p-2 text-slate-400 hover:text-[#ff6ef7] bg-[#4c1d95]/20 rounded-xl border border-[#6366f1]/10 hover:border-[#ff6ef7]/30 transition-all"
          >
            <ArrowLeft size={16} />
          </button>
        )}

        {/* Header de la carte */}
        <div className="text-center mb-6">
          <div className="bg-[#ec4899]/10 border border-[#ec4899]/30 inline-block p-3 rounded-2xl mb-4 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <ShieldCheck className="text-[#ff6ef7] drop-shadow-[0_0_8px_rgba(255,110,247,0.4)]" size={26} />
          </div>
          <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#ff6ef7] bg-clip-text text-transparent">
            PAYMARKET
          </h1>
          <p className="text-slate-400 mt-2 text-xs max-w-xs mx-auto leading-relaxed">
            {step === 'phone' ? `Identifiez votre compte ${role === 'merchant' ? 'marchand' : 'client'} pour recevoir vos accès temporaires.` : 'Un code de sécurité à 6 chiffres vous a été transmis.'}
          </p>
        </div>

        {/* Indicateur visuel d'étapes (Stepper alternatif) */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 'phone' ? 'w-8 bg-[#ff6ef7]' : 'w-2 bg-[#4c1d95]/40'}`} />
          <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 'otp' ? 'w-8 bg-[#ff6ef7]' : 'w-2 bg-[#4c1d95]/40'}`} />
        </div>

        {/* Étape 1 : Saisie du Téléphone */}
        {step === 'phone' ? (
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Numéro de terminal
              </label>
              <div className="flex items-center bg-[#0f0a1a] border border-[#4c1d95]/50 rounded-xl px-3.5 py-3 focus-within:border-[#ff6ef7] focus-within:shadow-[0_0_10px_rgba(255,110,247,0.1)] transition-all">
                <Phone className="text-slate-500 mr-3" size={18} />
                <input
                  type="tel"
                  placeholder="034 12 345 67"
                  className="flex-1 bg-transparent outline-none text-white placeholder-slate-600 font-mono text-base"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-2">Index réseaux attendus : Orange, Mvola, Airtel</p>
            </div>

            <button
              onClick={handleSendOTP}
              className="w-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(236,72,153,0.2)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              Demander l'accès OTP
            </button>
          </div>
        ) : (
          /* Étape 2 : Vérification OTP */
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Clé d'authentification unique
              </label>
              <div className="flex items-center bg-[#0f0a1a] border border-[#4c1d95]/50 rounded-xl px-3.5 py-3 focus-within:border-[#ff6ef7] focus-within:shadow-[0_0_10px_rgba(255,110,247,0.1)] transition-all">
                <Lock className="text-slate-500 mr-3" size={18} />
                <input
                  type="text"
                  placeholder="••••••"
                  maxLength={6}
                  className="flex-1 bg-transparent outline-none text-center text-lg font-black tracking-widest text-white placeholder-slate-700 font-mono"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={handleSendOTP}
                  className="text-[11px] text-[#ff6ef7] mt-2 hover:text-[#ec4899] transition-colors font-bold flex items-center gap-1"
                >
                  <RefreshCw size={10} /> Renvoyer le jeton SMS
                </button>
              </div>
            </div>

            <button
              onClick={handleVerifyOTP}
              className="w-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(236,72,153,0.2)] hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
            >
              Valider le protocole
              <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* Footer d'inscription / Passerelle alternative */}
        <div className="mt-6 pt-4 border-t border-[#4c1d95]/20 text-center">
          <p className="text-xs text-slate-400">
            Nouveau sur la plateforme ?{' '}
            <button 
              onClick={() => navigate('/register')}
              className="text-[#ff6ef7] font-black hover:text-[#ec4899] transition-colors ml-1 hover:underline"
            >
              Rejoindre le réseau
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};