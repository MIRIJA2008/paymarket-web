import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRScanner } from '../components/customer/QRScanner';
import { Smartphone, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface MerchantData {
  merchantId: string;
  merchantName: string;
  amount?: number;
  productName?: string;
}

export const CustomerPayment = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'mvola' | 'orange' | 'airtel'>('mvola');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleScanSuccess = (data: MerchantData) => {
    setMerchant(data);
    setShowScanner(false);
    if (data.amount) {
      setPaymentAmount(data.amount.toString());
    }
    toast.success(`Marchand: ${data.merchantName}`);
  };

  const handlePayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error('Montant invalide');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      toast.success('Paiement effectuÃ© avec succÃ¨s !');
      
      setTimeout(() => {
        setPaymentSuccess(false);
        setMerchant(null);
        setPaymentAmount('');
      }, 3000);
    }, 2000);
  };

  // 1. Ã‰CRAN DE SUCCÃˆS (REDESIGN NÃ‰ON SUNSET)
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0a1a] text-slate-100 p-4 font-sans antialiased">
        <div className="bg-[#1a142e]/80 backdrop-blur-md border border-[#4c1d95]/60 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_40px_rgba(236,72,153,0.15)] relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#ec4899]/10 rounded-full blur-2xl" />
          
          <div className="bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-2xl p-4 inline-block mb-5 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <CheckCircle size={44} className="text-[#ff6ef7] drop-shadow-[0_0_8px_#ff6ef7]" />
          </div>
          
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">Paiement rÃ©ussi !</h2>
          <p className="text-3xl font-black bg-gradient-to-r from-[#6366f1] via-[#ec4899] to-[#ff6ef7] bg-clip-text text-transparent mb-5 tracking-tight">
            {parseFloat(paymentAmount).toLocaleString()} Ar
          </p>
          
          <div className="bg-[#0f0a1a]/80 border border-[#4c1d95]/40 rounded-xl p-3 text-sm text-slate-300 mb-2">
            <span className="text-[#8b5cf6] block text-[10px] uppercase font-bold tracking-widest mb-1">Marchand certifiÃ©</span>
            <span className="font-semibold text-white">{merchant?.merchantName}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={12} className="text-[#6366f1]" /> ReÃ§u sÃ©curisÃ© envoyÃ© par SMS
          </p>
        </div>
      </div>
    );
  }

  if (showScanner) {
    return <QRScanner onScanSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />;
  }

  // 2. Ã‰CRAN PRINCIPAL (REDESIGN NÃ‰ON SUNSET)
  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased">
      {/* Header collant */}
      <div className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/40 p-4 sticky top-0 z-50 shadow-[0_4px_20px_rgba(15,10,26,0.5)]">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 text-slate-400 hover:text-[#ff6ef7] bg-[#4c1d95]/20 rounded-xl border border-[#6366f1]/20 hover:border-[#ff6ef7]/40 transition-all duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent tracking-tight">Paiement Express</h1>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto mt-4">
        {!merchant ? (
          /* ZONE DE SCAN CARD */
          <div className="text-center py-4">
            <div 
              onClick={() => setShowScanner(true)}
              className="group bg-[#1a142e]/60 backdrop-blur-md rounded-2xl border border-[#4c1d95]/30 p-8 cursor-pointer transition-all duration-300 hover:border-[#ec4899]/60 hover:shadow-[0_0_35px_rgba(236,72,153,0.1)]"
            >
              <div className="bg-[#ec4899]/10 border border-[#ec4899]/20 rounded-2xl p-5 inline-block mb-5 group-hover:bg-[#ec4899]/20 group-hover:border-[#ff6ef7]/40 transition-all duration-300 shadow-inner">
                <Smartphone size={44} className="text-[#ff6ef7] drop-shadow-[0_0_10px_rgba(255,110,247,0.3)]" />
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2 tracking-tight">Scanner un QR Code</h2>
              <p className="text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
                Positionnez le QR Code du marchand dans le cadre pour initier la transaction.
              </p>
              <button className="mt-8 w-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white px-6 py-3.5 rounded-xl font-bold shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:opacity-95 transition-all transform active:scale-[0.99]">
                Ouvrir l'appareil photo
              </button>
            </div>
          </div>
        ) : (
          /* FORMULAIRE DE PAIEMENT */
          <div className="bg-[#1a142e]/70 backdrop-blur-sm rounded-2xl border border-[#4c1d95]/40 p-6 shadow-xl">
            <div className="border-b border-[#4c1d95]/20 pb-3 mb-5 flex justify-between items-center">
              <h2 className="text-xs font-bold text-[#8b5cf6] tracking-widest uppercase">VÃ©rification de facture</h2>
              <span className="text-[10px] bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 px-2 py-0.5 rounded-md font-mono">ID: {merchant.merchantId}</span>
            </div>
            
            {/* Infos CommerÃ§ant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0f0a1a]/80 border border-[#4c1d95]/30 rounded-xl p-3.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BÃ©nÃ©ficiaire</p>
                <p className="font-extrabold text-white text-base mt-0.5">{merchant.merchantName}</p>
              </div>
              
              <div className="bg-[#0f0a1a]/80 border border-[#4c1d95]/30 rounded-xl p-3.5 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type de service</p>
                <p className="font-semibold text-slate-300 text-sm mt-0.5">{merchant.productName || 'Achat direct'}</p>
              </div>
            </div>
            
            {/* Input Montant NÃ©on */}
            <div className="mb-5 relative">
              <label className="block text-[10px] font-bold text-[#8b5cf6] uppercase tracking-widest mb-2">Montant du transfert (Ar)</label>
              <div className="relative">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0f0a1a] border border-[#4c1d95]/60 rounded-xl p-4 text-2xl font-black text-white placeholder-slate-700 focus:outline-none focus:border-[#ff6ef7] focus:shadow-[0_0_15px_rgba(255,110,247,0.1)] transition-all disabled:opacity-60 disabled:bg-[#1a142e]/50 disabled:text-slate-400 font-mono text-center sm:text-left"
                  disabled={!!merchant.amount}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-500 font-bold pointer-events-none">MGA</span>
              </div>
            </div>
            
            {/* SÃ©lection de l'opÃ©rateur mobile */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold text-[#8b5cf6] uppercase tracking-widest mb-2">Canal de dÃ©bit</label>
              <div className="grid grid-cols-3 gap-2">
                {/* MVOLA */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mvola')}
                  className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center bg-[#0f0a1a]/40 h-20 ${
                    paymentMethod === 'mvola'
                      ? 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                      : 'border-[#4c1d95]/30 text-slate-400 opacity-60 hover:opacity-100 hover:border-[#4c1d95]'
                  }`}
                >
                  <img src="/mvola-logo.png" alt="MVola" className="h-6 object-contain mb-1" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  <span className="text-xs font-black tracking-wide">MVOLA</span>
                </button>

                {/* ORANGE MONEY */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('orange')}
                  className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center bg-[#0f0a1a]/40 h-20 ${
                    paymentMethod === 'orange'
                      ? 'border-[#ec4899] bg-[#ec4899]/10 text-white shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                      : 'border-[#4c1d95]/30 text-slate-400 opacity-60 hover:opacity-100 hover:border-[#4c1d95]'
                  }`}
                >
                  <img src="/orange-logo.png" alt="Orange" className="h-6 object-contain mb-1" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  <span className="text-xs font-black tracking-wide">ORANGE</span>
                </button>

                {/* AIRTEL MONEY */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('airtel')}
                  className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center bg-[#0f0a1a]/40 h-20 ${
                    paymentMethod === 'airtel'
                      ? 'border-[#6366f1] bg-[#6366f1]/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                      : 'border-[#4c1d95]/30 text-slate-400 opacity-60 hover:opacity-100 hover:border-[#4c1d95]'
                  }`}
                >
                  <img src="/airtel-logo.png" alt="Airtel" className="h-6 object-contain mb-1" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  <span className="text-xs font-black tracking-wide">AIRTEL</span>
                </button>
              </div>
            </div>

            {/* Contenu ajoutÃ© : Recap des frais de transaction */}
            <div className="mb-6 bg-[#0f0a1a]/50 border border-[#4c1d95]/20 rounded-xl p-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Frais PayMarket</span>
                <span className="text-[#ff6ef7] font-bold">0 Ar (Gratuit)</span>
              </div>
              <div className="flex justify-between border-t border-[#4c1d95]/20 pt-1.5 text-slate-300 font-medium">
                <span>Total Ã  dÃ©biter</span>
                <span className="font-mono">{paymentAmount ? `${parseFloat(paymentAmount).toLocaleString()} Ar` : '0 Ar'}</span>
              </div>
            </div>
            
            {/* Bouton de confirmation de paiement */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(236,72,153,0.25)] hover:opacity-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authentification...
                </>
              ) : (
                `Confirmer le paiement`
              )}
            </button>
            
            <button
              onClick={() => setMerchant(null)}
              className="w-full mt-3 text-slate-500 hover:text-[#ff6ef7] text-xs font-semibold tracking-wide transition-colors py-2"
            >
              Annuler et rÃ©initialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
