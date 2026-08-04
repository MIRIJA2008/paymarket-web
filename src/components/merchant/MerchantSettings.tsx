import { useState } from 'react';
import { NotificationService } from '../../services/notification.service';
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Save,
  Key,
  Download,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface MerchantProfile {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  businessType: string;
  registrationNumber: string;
}

interface PaymentSettings {
  mvolaEnabled: boolean;
  orangeEnabled: boolean;
  airtelEnabled: boolean;
  mvolaPhone: string;
  orangePhone: string;
  airtelPhone: string;
  defaultPaymentMethod: string;
}

interface NotificationSettings {
  emailOnPayment: boolean;
  smsOnPayment: boolean;
  emailOnDailyReport: boolean;
  emailOnWeeklyReport: boolean;
  pushOnPayment: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  pinCode: string;
  pinEnabled: boolean;
}

// ==========================================
// COMPOSANT : PARAMÈTRES (MerchantSettings)
// ==========================================
export const MerchantSettings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'payment' | 'notifications' | 'security' | 'appearance'>('profile');
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<MerchantProfile>({
    businessName: 'Boutique Express',
    ownerName: 'Jean Rakoto',
    phone: '034 12 345 67',
    email: 'boutique.express@paymarket.mg',
    address: 'Antananarivo, Madagascar',
    businessType: 'Commerce de détail',
    registrationNumber: 'STAT-2024-001234'
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    mvolaEnabled: true,
    orangeEnabled: true,
    airtelEnabled: false,
    mvolaPhone: '034 12 345 67',
    orangePhone: '032 12 345 67',
    airtelPhone: '033 12 345 67',
    defaultPaymentMethod: 'mvola'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailOnPayment: true,
    smsOnPayment: true,
    emailOnDailyReport: true,
    emailOnWeeklyReport: false,
    pushOnPayment: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    pinCode: '',
    pinEnabled: false
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [language, setLanguage] = useState<'fr' | 'mg' | 'en'>('fr');

  const handleSaveProfile = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Profil mis à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleSavePaymentSettings = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Paramètres de paiement sauvegardés');
      setLoading(false);
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Préférences de notification sauvegardées');
      setLoading(false);
    }, 1000);
  };

  const handleSaveSecurity = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Paramètres de sécurité mis à jour');
      setLoading(false);
    }, 1000);
  };

  const handleExportData = () => {
    const data = {
      profile,
      paymentSettings,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paymarket_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Données exportées avec succès');
  };

  const handleActivateDesktopNotifications = async () => {
    const granted = await NotificationService.requestDesktopPermission();
    if (granted) {
      NotificationService.showDesktopNotification(
        '✅ Notifications activées',
        'Vous recevrez désormais les alertes en temps réel',
        '/logo192.png'
      );
      toast.success('Notifications desktop activées');
    } else {
      toast.error('Permission refusée pour les notifications');
    }
  };

  const handleTestDesktopNotification = async () => {
    const granted = await NotificationService.requestDesktopPermission();
    if (granted) {
      NotificationService.showDesktopNotification('Test PayMarket', 'Les notifications desktop fonctionnent !');
    } else {
      toast.error('Activez d\'abord les notifications desktop');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: Palette }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-[#161b26] rounded-2xl border border-zinc-800 shadow-xl overflow-hidden text-gray-100">
      {/* Header */}
      <div className="border-b border-zinc-800 p-6">
        <h2 className="text-2xl font-black text-white tracking-tight">Paramètres</h2>
        <p className="text-zinc-400 text-sm mt-1">Gérez votre compte et vos préférences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800 px-6 bg-[#0c101b]">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#e32a5d] text-[#ff5e62]'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* ── Profil ── */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Informations du commerce</h3>
                <p className="text-sm text-zinc-500 font-mono">Modifiez les informations de votre boutique</p>
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#e32a5d] to-[#dd0031] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-red-500/10 hover:opacity-95 transition"
              >
                <Save size={16} />
                Enregistrer
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Nom du commerce</label>
                <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-zinc-700 transition">
                  <Building2 size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    className="flex-1 bg-transparent outline-none text-white placeholder-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Propriétaire</label>
                <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-zinc-700 transition">
                  <User size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    value={profile.ownerName}
                    onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                    className="flex-1 bg-transparent outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Téléphone</label>
                <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-zinc-700 transition">
                  <Phone size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Email</label>
                <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-zinc-700 transition">
                  <Mail size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="flex-1 bg-transparent outline-none text-white"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Adresse</label>
                <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-zinc-700 transition">
                  <MapPin size={18} className="text-zinc-500 mr-2" />
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="flex-1 bg-transparent outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Type de commerce</label>
                <select
                  value={profile.businessType}
                  onChange={(e) => setProfile({ ...profile, businessType: e.target.value })}
                  className="w-full bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-zinc-700"
                >
                  <option className="bg-[#161b26]">Commerce de détail</option>
                  <option className="bg-[#161b26]">Restauration</option>
                  <option className="bg-[#161b26]">Service</option>
                  <option className="bg-[#161b26]">Artisanat</option>
                  <option className="bg-[#161b26]">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">N° Statistique</label>
                <div className="flex items-center bg-[#0b0f19]/40 border border-zinc-800/80 rounded-xl px-3 py-2.5 text-zinc-500">
                  <Key size={18} className="text-zinc-600 mr-2" />
                  <input
                    type="text"
                    value={profile.registrationNumber}
                    disabled
                    className="flex-1 bg-transparent outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Paiement ── */}
        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Moyens de paiement</h3>
                <p className="text-sm text-zinc-500 font-mono">Configurez vos méthodes de paiement Mobile Money</p>
              </div>
              <button
                onClick={handleSavePaymentSettings}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#e32a5d] to-[#dd0031] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md"
              >
                <Save size={16} />
                Enregistrer
              </button>
            </div>

            <div className="space-y-4">
              {/* MVola */}
              <div className="border border-zinc-800 bg-[#0b0f19]/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="font-bold text-white">MVola</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.mvolaEnabled}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, mvolaEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 after:peer-checked:bg-white"></div>
                  </label>
                </div>
                {paymentSettings.mvolaEnabled && (
                  <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2 text-sm max-w-md">
                    <Phone size={16} className="text-zinc-500 mr-2" />
                    <input
                      type="tel"
                      value={paymentSettings.mvolaPhone}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, mvolaPhone: e.target.value })}
                      className="flex-1 bg-transparent outline-none text-white font-mono"
                      placeholder="Numéro MVola"
                    />
                  </div>
                )}
              </div>

              {/* Orange Money */}
              <div className="border border-zinc-800 bg-[#0b0f19]/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="font-bold text-white">Orange Money</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.orangeEnabled}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, orangeEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 after:peer-checked:bg-white"></div>
                  </label>
                </div>
                {paymentSettings.orangeEnabled && (
                  <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2 text-sm max-w-md">
                    <Phone size={16} className="text-zinc-500 mr-2" />
                    <input
                      type="tel"
                      value={paymentSettings.orangePhone}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, orangePhone: e.target.value })}
                      className="flex-1 bg-transparent outline-none text-white font-mono"
                      placeholder="Numéro Orange Money"
                    />
                  </div>
                )}
              </div>

              {/* Airtel Money */}
              <div className="border border-zinc-800 bg-[#0b0f19]/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="font-bold text-white">Airtel Money</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.airtelEnabled}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, airtelEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500 after:peer-checked:bg-white"></div>
                  </label>
                </div>
                {paymentSettings.airtelEnabled && (
                  <div className="flex items-center bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2 text-sm max-w-md">
                    <Phone size={16} className="text-zinc-500 mr-2" />
                    <input
                      type="tel"
                      value={paymentSettings.airtelPhone}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, airtelPhone: e.target.value })}
                      className="flex-1 bg-transparent outline-none text-white font-mono"
                      placeholder="Numéro Airtel Money"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-5">
              <h4 className="font-bold text-white mb-3 text-sm uppercase font-mono tracking-wider text-zinc-400">Autres options</h4>
              <div className="max-w-xs">
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Méthode par défaut</label>
                <select
                  value={paymentSettings.defaultPaymentMethod}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, defaultPaymentMethod: e.target.value })}
                  className="w-full bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-zinc-700"
                >
                  <option className="bg-[#161b26]" value="mvola">MVola</option>
                  <option className="bg-[#161b26]" value="orange">Orange Money</option>
                  <option className="bg-[#161b26]" value="airtel">Airtel Money</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── Notifications ── */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Alertes et notifications</h3>
                <p className="text-sm text-zinc-500 font-mono">Choisissez comment être notifié</p>
              </div>
              <button
                onClick={handleSaveNotifications}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#e32a5d] to-[#dd0031] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md"
              >
                <Save size={16} />
                Enregistrer
              </button>
            </div>

            <div className="space-y-1 divide-y divide-zinc-800/60">
              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white text-sm">Notification par email pour les paiements</p>
                  <p className="text-xs text-zinc-500">Recevez un email pour chaque transaction</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailOnPayment}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailOnPayment: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e32a5d] after:peer-checked:bg-white"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white text-sm">Notification par SMS pour les paiements</p>
                  <p className="text-xs text-zinc-500">Recevez un SMS pour chaque transaction</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.smsOnPayment}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, smsOnPayment: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e32a5d] after:peer-checked:bg-white"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white text-sm">Rapport quotidien par email</p>
                  <p className="text-xs text-zinc-500">Récapitulatif complet des ventes du jour</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailOnDailyReport}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailOnDailyReport: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e32a5d] after:peer-checked:bg-white"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white text-sm">Notifications push</p>
                  <p className="text-xs text-zinc-500">Alertes instantanées sur votre appareil mobile connecté</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushOnPayment}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, pushOnPayment: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e32a5d] after:peer-checked:bg-white"></div>
                </label>
              </div>

              {/* Notifications Desktop — déplacé ici, dans l'onglet Notifications */}
              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white text-sm">Notifications Desktop</p>
                  <p className="text-xs text-zinc-500">Recevez des alertes même quand l'application est en arrière-plan</p>
                </div>
                <button
                  onClick={handleActivateDesktopNotifications}
                  className="px-4 py-2 bg-[#0b0f19] border border-zinc-700 text-zinc-200 text-xs font-bold rounded-xl hover:bg-zinc-800 transition"
                >
                  Activer
                </button>
              </div>
            </div>

            {/* Test des notifications — déplacé ici, dans l'onglet Notifications */}
            <div className="border-t border-zinc-800 pt-5">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Test des notifications</h4>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => toast.success('Ceci est un test de notification Toast !')}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold rounded-xl hover:bg-zinc-700 transition"
                >
                  Tester Toast
                </button>
                <button
                  onClick={handleTestDesktopNotification}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0b0f19] border border-zinc-800 text-zinc-400 text-xs font-bold rounded-xl hover:text-zinc-200 transition"
                >
                  Tester Desktop
                </button>
              </div>
              <p className="text-xs text-zinc-600 mt-2">
                💡 Les notifications Toast apparaissent en bas à droite de l'écran
              </p>
            </div>
          </div>
        )}

        {/* ── Sécurité ── */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Sécurité du compte</h3>
                <p className="text-sm text-zinc-500 font-mono">Protégez votre espace de vente marchand</p>
              </div>
              <button
                onClick={handleSaveSecurity}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#e32a5d] to-[#dd0031] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md"
              >
                <Save size={16} />
                Enregistrer
              </button>
            </div>

            <div className="space-y-4 divide-y divide-zinc-800/60">
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-white text-sm">Authentification à deux facteurs (2FA)</p>
                  <p className="text-xs text-zinc-500">Sécurisez l'accès à la connexion avec un code OTP temporaire</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorEnabled}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e32a5d] after:peer-checked:bg-white"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white text-sm">PIN de sécurité transactionnel</p>
                  <p className="text-xs text-zinc-500">Exiger un code pour valider les remboursements ou exports de données</p>
                </div>
                <button
                  onClick={() => toast.success('Module cryptographique bientôt disponible')}
                  className="text-xs font-bold text-[#ff5e62] bg-[#e32a5d]/10 border border-[#e32a5d]/20 px-3 py-1.5 rounded-lg hover:bg-[#e32a5d]/20 transition"
                >
                  Configurer
                </button>
              </div>

              <div className="py-4">
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Déconnexion automatique</label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                  className="bg-[#0b0f19] border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white outline-none w-44"
                >
                  <option className="bg-[#161b26]" value="15">15 minutes</option>
                  <option className="bg-[#161b26]" value="30">30 minutes</option>
                  <option className="bg-[#161b26]" value="60">1 heure</option>
                  <option className="bg-[#161b26]" value="120">2 heures</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── Apparence ── */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Personnalisation du système</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Thème de l'application</label>
                  <div className="flex gap-2 flex-wrap">
                    {['light', 'dark', 'system'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                          theme === t
                            ? 'border-[#e32a5d] bg-[#e32a5d]/10 text-[#ff5e62]'
                            : 'border-zinc-800 bg-[#0b0f19] text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {t === 'light' ? 'Clair' : t === 'dark' ? 'Sombre' : 'Système'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Langue d'affichage</label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'fr', name: 'Français' },
                      { id: 'mg', name: 'Malagasy' },
                      { id: 'en', name: 'English' }
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLanguage(l.id as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                          language === l.id
                            ? 'border-[#e32a5d] bg-[#e32a5d]/10 text-[#ff5e62]'
                            : 'border-zinc-800 bg-[#0b0f19] text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-zinc-400 mb-3">Sauvegarde et Restauration</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold rounded-xl hover:bg-zinc-700 transition"
                >
                  <Download size={14} />
                  Exporter mes données (.json)
                </button>
                <button
                  onClick={() => toast.success('Module d\'import sécurisé bientôt actif')}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-800 bg-[#0b0f19] text-zinc-500 text-xs font-bold rounded-xl transition"
                >
                  <Upload size={14} />
                  Importer un fichier de sauvegarde
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
