import { useEffect, useState } from 'react';
import { CustomerService, PaymentHistory, PaymentReceipt } from '../services/customer.service';
import { ExportService } from '../services/export.service';
import { Download, FileSpreadsheet, FileText, BarChart3, Activity, Wallet, Calendar } from 'lucide-react';

export default function CustomerSpace() {
  const [history, setHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await CustomerService.getPaymentHistory('client_123');
        setHistory(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique", error);
      } finally {
        // CORRECTION 1 : Correction de l'appel de la fonction d'état
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDownloadReceipt = async (item: PaymentHistory) => {
    // CORRECTION 2 : Structuration valide et complète pour correspondre à l'interface PaymentReceipt
    const calculatedFees = CustomerService.calculateNetworkFees(item.amount);

    const receiptData: PaymentReceipt = {
      id: item.id,
      merchantName: item.merchantName,
      amount: item.amount,
      networkFees: calculatedFees,
      totalDebited: item.amount + calculatedFees,
      date: item.date,
      paymentMethod: item.paymentMethod,
      transactionId: item.receiptUrl || `TRX_${item.id}_${Date.now()}`,
      status: (item.status.toLowerCase() === 'success' ? 'success' : 'failed') as 'success' | 'failed'
    };
    
    const blob = await CustomerService.downloadReceipt(receiptData);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recu_${item.merchantName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 p-4 sm:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#4c1d95]/30 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent mb-2">
              Tableau de bord
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Suivi en temps réel de vos flux Mobile Money
            </p>
          </div>

          {/* Boutons d'export globaux */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => ExportService.exportToExcel(history as any, 'Client_Général')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-300 bg-[#1a142e] border border-[#4c1d95]/40 hover:border-[#ec4899]/50 hover:text-white transition-all rounded-xl shadow-md"
            >
              <FileSpreadsheet size={14} className="text-[#8b5cf6]" />
              Exporter XLS
            </button>
            <button 
              onClick={() => ExportService.exportToPDF(history as any, 'Client_Général', 'Toutes périodes')}
              className="flex items-center gap-2 px-4 py-2.5 text-white bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] hover:opacity-95 shadow-[0_4px_15px_rgba(236,72,153,0.2)] transition-all rounded-xl text-xs font-bold"
            >
              <FileText size={14} />
              Rapport PDF
            </button>
          </div>
        </header>

        {/* --- STATISTIQUES CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a142e]/60 backdrop-blur-sm border border-[#4c1d95]/30 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Transactions</span>
              <div className="text-2xl font-black mt-1 text-white font-mono">{history.length}</div>
            </div>
            <div className="bg-[#6366f1]/10 p-3 rounded-xl border border-[#6366f1]/20">
              <BarChart3 size={20} className="text-[#6366f1]" />
            </div>
          </div>
          
          <div className="bg-[#1a142e]/60 backdrop-blur-sm border border-[#4c1d95]/30 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Volume Dépensé</span>
              <div className="text-2xl font-black mt-1 text-[#ff6ef7] drop-shadow-[0_0_10px_rgba(255,110,247,0.2)] font-mono">
                {history.reduce((sum, item) => sum + item.amount, 0).toLocaleString('fr-FR')} <span className="text-xs text-slate-400">Ar</span>
              </div>
            </div>
            <div className="bg-[#ec4899]/10 p-3 rounded-xl border border-[#ec4899]/20">
              <Wallet size={20} className="text-[#ec4899]" />
            </div>
          </div>

          <div className="bg-[#1a142e]/60 backdrop-blur-sm border border-[#4c1d95]/30 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">État du Terminal</span>
              <div className="text-sm font-bold mt-2 text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse shadow-[0_0_8px_#10b981]" /> 
                Chiffrement Actif
              </div>
            </div>
            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
              <Activity size={20} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* --- TABLEAU DE L'HISTORIQUE --- */}
        <div className="bg-[#1a142e]/40 backdrop-blur-sm border border-[#4c1d95]/30 rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 font-medium flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#8b5cf6]/30 border-t-[#ff6ef7] rounded-full animate-spin" />
              Récupération du registre sécurisé...
            </div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">
              Aucune écriture comptable enregistrée.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#4c1d95]/20 bg-[#0f0a1a]/60">
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Horodatage</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Marchand / Destinataire</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Réseau</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Débit</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Justificatif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4c1d95]/10">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-[#1a142e]/60 transition-colors group">
                      <td className="py-4 px-6 text-xs text-slate-300 font-mono">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Calendar size={12} className="text-[#8b5cf6]" />
                          {item.date ? item.date.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : 'Date inconnue'}
                        </div>
                      </td>
                      
                      <td className="py-4 px-6 text-sm text-white font-bold tracking-tight">
                        {item.merchantName}
                      </td>
                      
                      <td className="py-4 px-6">
                        {/* CORRECTION 3 : Sécurisation du formateur de chaînes avec fallback */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider font-mono ${
                          item.paymentMethod?.toLowerCase().includes('mvola') ? 'bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20' :
                          item.paymentMethod?.toLowerCase().includes('orange') ? 'bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20' :
                          'bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20'
                        }`}>
                          {item.paymentMethod || 'Inconnu'}
                        </span>
                      </td>
                      
                      <td className="py-4 px-6 text-sm text-white font-black font-mono">
                        {item.amount.toLocaleString('fr-FR')} Ar
                      </td>
                      
                      <td className="py-4 px-6">
                        {item.status?.toLowerCase() === 'success' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Succès
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20">
                            Échec
                          </span>
                        )}
                      </td>
                      
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => handleDownloadReceipt(item)}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-[11px] font-bold text-slate-300 bg-[#0f0a1a] border border-[#4c1d95]/60 hover:border-[#ff6ef7] hover:text-white transition-all rounded-lg shadow-sm"
                        >
                          <Download size={12} />
                          Reçu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}