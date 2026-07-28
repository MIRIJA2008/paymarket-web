import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogOut, 
  QrCode, 
  FileText, 
  BarChart3, 
  Settings,
  Bell,
  ShieldCheck,
  Calendar,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Target,
  Store
} from 'lucide-react';
import { StatisticsCards } from '../components/merchant/StatisticsCards';
import { SalesChart } from '../components/merchant/SalesChart';
import { RecentTransactions } from '../components/merchant/RecentTransactions';
import { QRCodeGenerator } from '../components/merchant/QRCodeGenerator';
import { ExportButton } from '../components/merchant/ExportButton';
import toast from 'react-hot-toast';

const mockStats = {
  dailyRevenue: 245000,
  monthlyRevenue: 3450000,
  todayTransactions: 12,
  monthlyTransactions: 156,
  averageTicket: 18500,
  rating: 4.8
};

const mockChartData = [
  { date: '2026-06-03', amount: 125000, transactions: 8 },
  { date: '2026-06-04', amount: 89000, transactions: 6 },
  { date: '2026-06-05', amount: 210000, transactions: 14 },
  { date: '2026-06-06', amount: 156000, transactions: 10 },
  { date: '2026-06-07', amount: 98000, transactions: 7 },
  { date: '2026-06-08', amount: 245000, transactions: 12 },
  { date: '2026-06-09', amount: 187000, transactions: 11 }
];

const mockTransactions = [
  { id: 'TRX001', customerName: 'Rakoto Jean', amount: 12500, status: 'completed' as const, paymentMethod: 'MVola', createdAt: '2026-06-09T10:30:00' },
  { id: 'TRX002', customerName: 'Rabe Marie', amount: 35000, status: 'completed' as const, paymentMethod: 'Orange Money', createdAt: '2026-06-09T09:15:00' },
  { id: 'TRX003', customerName: 'Andrianajina', amount: 8900, status: 'pending' as const, paymentMethod: 'Airtel Money', createdAt: '2026-06-09T08:45:00' },
  { id: 'TRX004', customerName: 'Razafy Paul', amount: 25000, status: 'completed' as const, paymentMethod: 'MVola', createdAt: '2026-06-08T16:20:00' },
  { id: 'TRX005', customerName: 'Nomenjanahary', amount: 12000, status: 'failed' as const, paymentMethod: 'Orange Money', createdAt: '2026-06-08T14:10:00' }
];

export const MerchantDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<'dashboard' | 'qrcode' | 'history' | 'settings'>('dashboard');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '24h'>('7d');
  const [stats] = useState(mockStats);
  const [chartData] = useState(mockChartData);
  const [transactions] = useState(mockTransactions);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  const handleViewReceipt = (transactionId: string) => {
    toast.success(`Affichage du reçu ${transactionId}`);
  };

  const handleExportTransactions = () => {
    toast.success('Export des transactions en cours...');
  };

  const handleTestNotification = () => {
    toast.success('Test notification réussi !');
  };

  const menuItems = [
    { icon: BarChart3, label: 'Tableau de bord', id: 'dashboard' as const },
    { icon: QrCode, label: 'QR Code Écran', id: 'qrcode' as const },
    { icon: FileText, label: 'Grand Livre / Journal', id: 'history' as const },
    { icon: Settings, label: 'Configuration Passerelle', id: 'settings' as const }
  ];

  const apiStatuses = [
    { name: 'API MVola', value: '99.8%', status: 'optimal' },
    { name: 'API Orange', value: '100%', status: 'optimal' },
    { name: 'API Airtel', value: 'Ralenti', status: 'warning' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased selection:bg-[#ec4899] flex flex-col">
      
      {/* --- HEADER GLOBAL --- */}
      <header className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/20 sticky top-0 z-40 shadow-md lg:hidden">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0f0a1a] border border-[#4c1d95]/40 transition-all"
            >
              <Menu size={18} />
            </button>
            <h1 className="text-sm font-black tracking-wider bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent">
              PAYMARKET
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Bouton de notification — déplacé ici, dans le header */}
            <button
              onClick={handleTestNotification}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0f0a1a] border border-[#4c1d95]/40 transition-all"
              title="Tester les notifications"
            >
              <Bell size={16} />
            </button>

            <button className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0f0a1a] border border-[#4c1d95]/40 relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#ec4899] rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex flex-1 w-full relative">
        
        {/* --- SIDEBAR --- */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#110c24] border-r border-[#4c1d95]/20 flex flex-col justify-between p-5 transition-transform duration-300 shrink-0
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div>
            {/* Logo */}
            <div className="mb-8 px-2 flex justify-between items-center">
              <div>
                <span className="text-xs font-black tracking-widest text-[#ec4899] block uppercase">
                  PAYMARKET
                </span>
                <h2 className="text-md font-extrabold text-white tracking-tight">
                  Console Marchand
                </h2>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="lg:hidden p-1.5 text-slate-400 hover:text-white bg-[#0f0a1a] border border-[#4c1d95]/30 rounded-lg"
              >
                <X size={14} />
              </button>
            </div>

            {/* Badge Marchand */}
            <div className="flex items-center gap-3 bg-[#1a142e] border border-[#4c1d95]/30 p-3 rounded-xl mb-8">
              <div className="bg-[#8b5cf6]/20 p-2 rounded-lg text-[#8b5cf6]">
                <Store size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 leading-tight flex items-center gap-1">
                  Boutique Express <ShieldCheck size={12} className="text-emerald-400 inline" />
                </h4>
                <span className="text-[10px] font-mono text-slate-400">ID: M-001</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-xl transition-all group tracking-wide ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white shadow-[0_4px_15px_rgba(236,72,153,0.15)]'
                        : 'text-slate-400 hover:text-white hover:bg-[#8b5cf6]/10'
                    }`}
                  >
                    <Icon size={16} className={isSelected ? 'text-white' : 'text-[#8b5cf6] group-hover:text-[#ff6ef7]'} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Section basse : statuts API + déconnexion */}
          <div className="border-t border-[#4c1d95]/20 pt-5 mt-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3 px-2">
              État des Passerelles
            </span>
            
            <div className="space-y-2">
              {apiStatuses.map((api) => (
                <div 
                  key={api.name} 
                  className="bg-[#1a142e]/50 border border-[#4c1d95]/20 rounded-xl p-2.5 flex items-center justify-between transition-all hover:border-[#4c1d95]/40"
                >
                  <span className="text-[11px] font-medium text-slate-300">{api.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold font-mono ${
                      api.status === 'optimal' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {api.value}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                      api.status === 'optimal' 
                        ? 'bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse' 
                        : 'bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse'
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all font-bold text-[11px] uppercase tracking-wider mt-5"
            >
              <LogOut size={14} />
              Fermer la Session
            </button>
          </div>
        </aside>

        {/* --- CONTENU PRINCIPAL --- */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-[1344px]">
          
          {activePage === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#4c1d95]/10 pb-4">
                <div>
                  <h2 className="text-xl font-black text-white tracking-wide uppercase">Tableau de Bord Analytique</h2>
                  <p className="text-xs text-slate-400 mt-1">Données synchronisées en temps réel avec la chambre de compensation.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex bg-[#0f0a1a] border border-[#4c1d95]/40 rounded-xl p-1 text-[11px] font-bold uppercase tracking-wider">
                    <button onClick={() => setTimeRange('24h')} className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '24h' ? 'bg-[#8b5cf6]/20 text-white' : 'text-slate-400'}`}>24h</button>
                    <button onClick={() => setTimeRange('7d')} className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '7d' ? 'bg-[#8b5cf6]/20 text-white' : 'text-slate-400'}`}>7j</button>
                    <button onClick={() => setTimeRange('30d')} className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '30d' ? 'bg-[#8b5cf6]/20 text-white' : 'text-slate-400'}`}>30j</button>
                  </div>

                  <ExportButton 
                    transactions={transactions.map(t => ({
                      ...t,
                      date: new Date(t.createdAt),
                      customerName: t.customerName,
                      reference: t.id,
                      status: t.status === 'completed' ? 'COMPLETED' : t.status === 'pending' ? 'PENDING' : 'FAILED'
                    }))}
                    merchantName="Boutique Express"
                  />
                </div>
              </div>

              <StatisticsCards stats={stats} />
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <TrendingUp size={14} className="text-[#ff6ef7]" /> Courbe de Croissance Volumétrique
                      </p>
                      <span className="text-[10px] font-mono text-slate-500 items-center gap-1 hidden sm:flex">
                        <Calendar size={10} /> Dernière mise à jour il y a 2 min
                      </span>
                    </div>
                    <div className="bg-[#0f0a1a]/50 p-2 rounded-xl border border-[#4c1d95]/10">
                      <SalesChart data={chartData} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ec4899]/5 rounded-full blur-xl pointer-events-none" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-4">
                      <Target size={14} className="text-[#8b5cf6]" /> Seuil d'activité du mois
                    </p>
                    <div className="space-y-1.5">
                      <p className="text-3xl font-black text-white font-mono">3,450,000 <span className="text-xs text-slate-400 font-sans">Ar</span></p>
                      <p className="text-[11px] text-slate-400">Atteint sur un objectif cible fixé à <span className="text-white font-bold">5,000,000 Ar</span></p>
                    </div>
                    
                    <div className="w-full bg-[#0f0a1a] h-2.5 rounded-full mt-6 overflow-hidden border border-[#4c1d95]/30">
                      <div className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] h-full rounded-full shadow-[0_0_8px_#ec4899]" style={{ width: '69%' }} />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#4c1d95]/20 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Taux d'achèvement :</span>
                    <span className="font-mono text-[#ff6ef7] font-black flex items-center gap-0.5">69% <ArrowUpRight size={12} /></span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-2xl shadow-xl overflow-hidden p-1">
                <div className="p-4 border-b border-[#4c1d95]/20">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Flux d'écritures en direct</p>
                </div>
                <RecentTransactions
                  transactions={transactions}
                  onViewReceipt={handleViewReceipt}
                  onExport={handleExportTransactions}
                />
              </div>
            </div>
          )}
          
          {activePage === 'qrcode' && (
            <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-3xl p-6 shadow-xl max-w-xl mx-auto mt-4 backdrop-blur-sm">
              <QRCodeGenerator merchantId="MERCHANT_001" merchantName="Boutique Express" />
            </div>
          )}
          
          {activePage === 'history' && (
            <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <h2 className="text-lg font-black text-white tracking-wide uppercase">Grand Livre Comptable</h2>
                <p className="text-xs text-slate-400">Audit de l'intégralité des règlements émis sur vos terminaux de paiement.</p>
              </div>
              <div className="p-1 bg-[#0f0a1a]/30 border border-[#4c1d95]/20 rounded-2xl overflow-hidden">
                <RecentTransactions transactions={transactions} onViewReceipt={handleViewReceipt} onExport={handleExportTransactions} />
              </div>
            </div>
          )}

          {activePage === 'settings' && (
            <div className="bg-[#1a142e]/60 border border-[#4c1d95]/30 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto">
              <h2 className="text-lg font-black text-white tracking-wide uppercase mb-2">Configurations Métier</h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">Ajustez les préférences de routage de vos flux financiers inter-opérateurs et gérez vos clés d'intégration API.</p>
              
              <div className="p-4 rounded-2xl bg-[#0f0a1a]/60 border border-[#4c1d95]/20 text-center font-mono text-xs text-slate-500 py-12">
                <Settings size={28} className="mx-auto text-[#8b5cf6] mb-3 animate-spin [animation-duration:8s]" />
                Composants SecOps Avancés (v17.4.0) <br />
                <span className="text-[#ff6ef7] text-[10px] uppercase font-bold tracking-widest mt-2 block">Accès restreint en cours de déploiement</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};