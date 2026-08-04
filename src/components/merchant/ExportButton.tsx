import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, FileCode, Calendar } from 'lucide-react';
import { ExportService, TransactionData } from '../../services/export.service';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  transactions: TransactionData[];
  merchantName: string;
}

export const ExportButton = ({ transactions, merchantName }: ExportButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [showDateFilter, setShowDateFilter] = useState(false);

  const filterTransactionsByDate = (transactions: TransactionData[], range: string): TransactionData[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    switch (range) {
      case 'today':
        return transactions.filter(t => t.date >= today);
      case 'week':
        return transactions.filter(t => t.date >= weekAgo);
      case 'month':
        return transactions.filter(t => t.date >= monthAgo);
      default:
        return transactions;
    }
  };

  const handleExport = async (format: 'excel' | 'pdf' | 'csv') => {
    try {
      const filteredTransactions = filterTransactionsByDate(transactions, dateRange);
      
      if (filteredTransactions.length === 0) {
        toast.error('Aucune transaction à exporter pour cette période');
        return;
      }
      
      const periodText = {
        all: 'Toutes les transactions',
        today: "Transactions d'aujourd'hui",
        week: 'Transactions des 7 jours',
        month: 'Transactions du mois'
      }[dateRange];
      
      
      switch (format) {
        case 'excel':
          ExportService.exportToExcel(filteredTransactions, merchantName);
          toast.success(`Export Excel réussi: ${filteredTransactions.length} transactions`);
          break;
        case 'pdf':
          ExportService.exportToPDF(filteredTransactions, merchantName, periodText);
          toast.success(`Export PDF réussi: ${filteredTransactions.length} transactions`);
          break;
        case 'csv':
          ExportService.exportToCSV(filteredTransactions, merchantName);
          toast.success(`Export CSV réussi: ${filteredTransactions.length} transactions`);
          break;
      }
      
      setShowMenu(false);
      setShowDateFilter(false);
    } catch (error) {
      toast.error('Erreur lors de l\'export');
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        <Download size={18} />
        Exporter
      </button>
      
      {/* Menu déroulant */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
          <div className="p-2">
            {/* Filtre date */}
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <Calendar size={16} />
              Période: {
                {
                  all: 'Toutes',
                  today: "Aujourd'hui",
                  week: '7 jours',
                  month: '30 jours'
                }[dateRange]
              }
            </button>
            
            {showDateFilter && (
              <div className="ml-4 mt-1 mb-2 space-y-1">
                <button
                  onClick={() => { setDateRange('all'); setShowDateFilter(false); }}
                  className="w-full px-4 py-1 text-sm text-left hover:bg-gray-100 rounded"
                >
                  Toutes les transactions
                </button>
                <button
                  onClick={() => { setDateRange('today'); setShowDateFilter(false); }}
                  className="w-full px-4 py-1 text-sm text-left hover:bg-gray-100 rounded"
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => { setDateRange('week'); setShowDateFilter(false); }}
                  className="w-full px-4 py-1 text-sm text-left hover:bg-gray-100 rounded"
                >
                  ‎7 derniers jours
                </button>
                <button
                  onClick={() => { setDateRange('month'); setShowDateFilter(false); }}
                  className="w-full px-4 py-1 text-sm text-left hover:bg-gray-100 rounded"
                >
                  ‎30 derniers jours
                </button>
              </div>
            )}
            
            <div className="border-t my-2"></div>
            
            {/* Options d'export */}
            <button
              onClick={() => handleExport('excel')}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FileSpreadsheet size={16} className="text-green-600" />
              Excel (.xlsx)
            </button>
            
            <button
              onClick={() => handleExport('pdf')}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FileText size={16} className="text-red-600" />
              PDF (.pdf)
            </button>
            
            <button
              onClick={() => handleExport('csv')}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FileCode size={16} className="text-blue-600" />
              CSV (.csv)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
