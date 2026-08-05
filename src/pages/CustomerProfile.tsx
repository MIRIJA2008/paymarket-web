import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Shield, Edit2, LogOut, Award, Key, Save, X, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export const CustomerProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name ?? 'Client PayMarket',
    phone: user?.phone ?? '',
    email: ''
  });

  const handleSave = () => {
    updateProfile({ name: profile.name, phone: profile.phone });
    setIsEditing(false);
    toast.success('Profil mis à jour');
  };

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  // Déconnecte le compte client actuel et renvoie vers le login marchand,
  // pour permettre de basculer facilement entre les deux espaces.
  const handleSwitchProfile = () => {
    logout();
    navigate('/login', { state: { role: 'merchant' } });
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased pb-12">
      {/* Header collant avec effet Glassmorphism */}
      <div className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/40 p-4 sticky top-0 z-50 shadow-[0_4px_20px_rgba(15,10,26,0.5)]">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/customer')} 
            className="p-2 text-slate-400 hover:text-[#ff6ef7] bg-[#4c1d95]/20 rounded-xl border border-[#6366f1]/20 hover:border-[#ff6ef7]/40 transition-all duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent tracking-tight">Espace Client</h1>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto mt-6">
        
        {/* Section Avatar & Statut Néon */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ec4899] via-[#8b5cf6] to-[#ff6ef7] rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
            <div className="relative bg-[#1a142e] border-2 border-[#4c1d95]/60 rounded-full p-1 w-28 h-28 flex items-center justify-center overflow-hidden">
              <div className="bg-[#0f0a1a] w-full h-full rounded-full flex items-center justify-center border border-[#6366f1]/30">
                <User size={44} className="text-[#ff6ef7] drop-shadow-[0_0_8px_rgba(255,110,247,0.5)]" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] rounded-xl p-2.5 text-white border border-[#0f0a1a] shadow-lg hover:scale-105 transition-transform">
              <Edit2 size={12} />
            </button>
          </div>
          
          {/* Contenu ajouté : Grade / Badge utilisateur */}
          <div className="mt-3 flex items-center gap-1.5 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-full px-3 py-0.5 text-xs font-bold text-[#ff6ef7] shadow-[0_0_10px_rgba(236,72,153,0.1)]">
            <Award size={12} /> Membre Privilège Gold
          </div>
        </div>

        {/* Formulaire de Profil Cyber-Design */}
        <div className="bg-[#1a142e]/70 backdrop-blur-sm rounded-2xl border border-[#4c1d95]/40 p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#4c1d95]/20 pb-2 flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#8b5cf6] tracking-widest uppercase">Données personnelles</h2>
            <span className="text-[10px] font-mono text-slate-500">ID: PAY-8942-MG</span>
          </div>

          {/* Nom complet */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Nom complet
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-[#0f0a1a] border border-[#4c1d95] rounded-xl p-3 text-white placeholder-slate-700 focus:outline-none focus:border-[#ff6ef7] focus:shadow-[0_0_10px_rgba(255,110,247,0.1)] transition-all font-medium"
              />
            ) : (
              <div className="flex justify-between items-center bg-[#0f0a1a]/60 border border-[#4c1d95]/20 rounded-xl p-3.5 hover:border-[#6366f1]/30 transition-colors">
                <span className="text-slate-100 font-semibold">{profile.name}</span>
                <User size={16} className="text-[#6366f1]" />
              </div>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Numéro de contact
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-[#0f0a1a] border border-[#4c1d95] rounded-xl p-3 text-white placeholder-slate-700 focus:outline-none focus:border-[#ff6ef7] focus:shadow-[0_0_10px_rgba(255,110,247,0.1)] transition-all font-mono"
              />
            ) : (
              <div className="flex justify-between items-center bg-[#0f0a1a]/60 border border-[#4c1d95]/20 rounded-xl p-3.5 hover:border-[#6366f1]/30 transition-colors">
                <span className="text-slate-100 font-mono">{profile.phone}</span>
                <Phone size={16} className="text-[#8b5cf6]" />
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Adresse de messagerie
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#0f0a1a] border border-[#4c1d95] rounded-xl p-3 text-white placeholder-slate-700 focus:outline-none focus:border-[#ff6ef7] focus:shadow-[0_0_10px_rgba(255,110,247,0.1)] transition-all"
              />
            ) : (
              <div className="flex justify-between items-center bg-[#0f0a1a]/60 border border-[#4c1d95]/20 rounded-xl p-3.5 hover:border-[#6366f1]/30 transition-colors">
                <span className="text-slate-100 font-medium">{profile.email}</span>
                <Mail size={16} className="text-[#ec4899]" />
              </div>
            )}
          </div>

          {/* Comptes Mobile Money liés */}
          <div className="border-t border-[#4c1d95]/20 pt-5 mt-3">
            <h3 className="text-xs font-bold text-[#8b5cf6] tracking-widest uppercase mb-3">Comptes monétiques liés</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-[#0f0a1a]/80 border border-[#4c1d95]/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src="/mvola-logo.png" alt="MVola" className="h-5 object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  <span className="text-slate-200 font-mono text-xs font-bold">MVOLA • {profile.phone}</span>
                </div>
                <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg p-1">
                  <Shield size={14} className="text-[#6366f1]" />
                </div>
              </div>
            </div>
          </div>

          {/* Contenu ajouté : Section Sécurité Avancée */}
          <div className="border-t border-[#4c1d95]/20 pt-5">
            <h3 className="text-xs font-bold text-[#8b5cf6] tracking-widest uppercase mb-3">Sécurité du compte</h3>
            <div className="flex items-center justify-between p-3 bg-[#0f0a1a]/40 border border-[#4c1d95]/20 rounded-xl text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Key size={14} className="text-[#ff6ef7]" />
                <div>
                  <p className="font-semibold text-slate-300">Double authentification (2FA)</p>
                  <p className="text-[10px] text-slate-500">Protection renforcée par code SMS</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold tracking-wider text-[#6366f1] bg-[#6366f1]/10 border border-[#6366f1]/20 px-2 py-0.5 rounded uppercase">
                Actif
              </span>
            </div>
          </div>
        </div>

        {/* Boutons d'action contextuels */}
        <div className="mt-6 space-y-3">
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-[#1a142e] hover:bg-[#4c1d95]/20 text-slate-400 hover:text-white border border-[#4c1d95]/40 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <X size={16} /> Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex-[2] bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(236,72,153,0.25)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Save size={16} /> Enregistrer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(236,72,153,0.25)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Edit2 size={16} /> Modifier le profil
            </button>
          )}
          
          <button
            onClick={handleSwitchProfile}
            className="w-full bg-[#1a142e]/40 hover:bg-[#6366f1]/10 border border-[#6366f1]/20 hover:border-[#6366f1]/40 text-[#8b5cf6] py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group"
          >
            <RefreshCw size={16} className="transform group-hover:rotate-180 transition-transform duration-300" /> Changer de profil (Espace Marchand)
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-[#1a142e]/40 hover:bg-[#ec4899]/5 border border-[#ec4899]/20 hover:border-[#ec4899]/40 text-[#ec4899] py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group"
          >
            <LogOut size={16} className="transform group-hover:-translate-x-0.5 transition-transform" /> Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};