import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Download, Eye, Calendar, CreditCard } from 'lucide-react';
import { CustomerService, PaymentHistory as PaymentHistoryType } from '../../services/customer.service';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PaymentHistoryProps {
  customerId: string;
}

export const PaymentHistory = ({ customerId }: PaymentHistoryProps) => {
  const [history, setHistory] = useState<PaymentHistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentHistoryType | null>(null);

  useEffect(() => {
    loadHistory();
  }, [customerId]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await CustomerService.getPaymentHistory(customerId);
      setHistory(data);
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'historique');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = async (transaction: PaymentHistoryType) => {
    try {
      toast.loading('Génération du reçu...');
      const receipt = await CustomerService.downloadReceipt(transaction.id);
      const url = URL.createObjectURL(receipt);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reçu_${transaction.id}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success('Reçu téléchargé avec succès');
    } catch (error) {
      toast.dismiss();
      toast.error('Erreur lors du téléchargement');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Réussi';
      case 'failed':
        return 'Échoué';
      default:
        return 'En attente';
    }
  };

  const filteredHistory = history.filter(h => 
    filter === 'all' ? true : h.status === filter
  );

  const totalSpent = filteredHistory
    .filter(h => h.status === 'success')
    .reduce((sum, h) => sum + h.amount, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Total dépensé</p>
          <p className="text-3xl font-bold mt-2">{totalSpent.toLocaleString()} Ar</p>
          <p className="text-xs mt-2 opacity-75">sur {filteredHistory.filter(h => h.status === 'success').length} transactions</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Transactions réussies</p>
              <p className="text-2xl font-bold text-gray-800">
                {history.filter(h => h.status === 'success').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Moyenne par transaction</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(totalSpent / (history.filter(h => h.status === 'success').length || 1)).toLocaleString()} Ar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('success')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Réussies
        </button>
        <button
          onClick={() => setFilter('failed')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'failed'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Échouées
        </button>
      </div>

      {/* Liste des transactions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucune transaction trouvée
            </div>
          ) : (
            filteredHistory.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(transaction.status)}
                      <span className={`text-sm font-medium ${
                        transaction.status === 'success' ? 'text-green-600' :
                        transaction.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800">{transaction.merchantName}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>{transaction.amount.toLocaleString()} Ar</span>
                      <span>•</span>
                      <span>{transaction.paymentMethod}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{format(transaction.date, 'dd MMM yyyy HH:mm', { locale: fr })}</span>
                      </div>
                    </div>
                  </div>
                  
                  {transaction.status === 'success' && (
                    <button
                      onClick={() => handleDownloadReceipt(transaction)}
                      className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Download size={16} />
                      <span className="text-sm">Reçu</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};