// components/merchant/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Download,
  QrCode,
  Eye 
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { merchantApi } from '../../services/api';
import { QRCodeDisplay } from './QRCodeDisplay';
import { TransactionHistory } from './TransactionHistory';

interface DashboardStats {
  dailyRevenue: number;
  monthlyRevenue: number;
  todayTransactions: number;
  monthlyTransactions: number;
  averageTicket: number;
  rating: number;
}

export const MerchantDashboard: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['merchant-stats'],
    queryFn: () => merchantApi.getDashboardStats()
  });

  const { data: dailyData } = useQuery({
    queryKey: ['daily-transactions'],
    queryFn: () => merchantApi.getDailyTransactions()
  });

  const chartData = {
    labels: dailyData?.map(d => d.date) || [],
    datasets: [
      {
        label: 'Chiffre d\'affaires',
        data: dailyData?.map(d => d.amount) || [],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { 
        callbacks: {
          label: (context: any) => `${context.raw.toLocaleString()} Ar`
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">PayMarket</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowQR(true)}
              className="bg-white text-green-600 p-2 rounded-full"
            >
              <QrCode size={20} />
            </button>
            <button className="bg-white text-green-600 p-2 rounded-full">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQR && <QRCodeDisplay onClose={() => setShowQR(false)} />}

      {/* Stats Cards */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">CA Journalier</p>
              <p className="text-2xl font-bold text-green-600">
                {stats?.dailyRevenue.toLocaleString()} Ar
              </p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {stats?.todayTransactions} transactions
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">CA Mensuel</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats?.monthlyRevenue.toLocaleString()} Ar
              </p>
            </div>
            <ShoppingCart className="text-blue-500" size={24} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {stats?.monthlyTransactions} transactions
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Ticket moyen</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats?.averageTicket.toLocaleString()} Ar
              </p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Note</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats?.rating || 0}/5
              </p>
            </div>
            <div className="flex text-yellow-400">★★★★</div>
          </div>
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-white rounded-xl m-4 p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Évolution du CA (7 derniers jours)</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Actions rapides */}
      <div className="flex gap-3 px-4 mb-4">
        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold">
          Générer QR dynamique
        </button>
        <button className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg font-semibold">
          Exporter rapports
        </button>
      </div>

      {/* Historique récent */}
      <div className="bg-white rounded-xl m-4 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Transactions récentes</h3>
          <button className="text-green-600 text-sm">Voir tout</button>
        </div>
        <TransactionHistory limit={5} />
      </div>
    </div>
  );
};