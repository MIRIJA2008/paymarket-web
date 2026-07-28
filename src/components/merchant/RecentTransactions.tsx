import { Clock, Download, Eye, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  createdAt: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewReceipt?: (transactionId: string) => void;
  onExport?: () => void;
}

export const RecentTransactions = ({ transactions, onViewReceipt, onExport }: RecentTransactionsProps) => {
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
            <CheckCircle size={12} />
            Réussi
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs">
            <Clock size={12} />
            En attente
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">
            <XCircle size={12} />
            Échoué
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Transactions récentes</h3>
          <p className="text-sm text-gray-500">Les 10 dernières transactions</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition"
        >
          <Download size={16} />
          Exporter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-gray-600 text-sm">
              <th className="pb-3">Client</th>
              <th className="pb-3">Montant</th>
              <th className="pb-3">Méthode</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b last:border-0">
                <td className="py-3">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.customerName}</p>
                    <p className="text-xs text-gray-500">{transaction.id.slice(-8)}</p>
                  </div>
                </td>
                <td className="py-3">
                  <p className="font-semibold text-gray-800">
                    {transaction.amount.toLocaleString()} Ar
                  </p>
                </td>
                <td className="py-3">
                  <span className="text-sm text-gray-600">{transaction.paymentMethod}</span>
                </td>
                <td className="py-3">{getStatusBadge(transaction.status)}</td>
                <td className="py-3">
                  <p className="text-sm text-gray-600">
                    {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm', { locale: fr })}
                  </p>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => onViewReceipt?.(transaction.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucune transaction pour le moment
        </div>
      )}
    </div>
  );
};