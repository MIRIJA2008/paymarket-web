import { TrendingUp, ShoppingBag, Users, Award } from 'lucide-react';

interface StatisticsCardsProps {
  stats: {
    dailyRevenue: number;
    monthlyRevenue: number;
    todayTransactions: number;
    monthlyTransactions: number;
    averageTicket: number;
    rating: number;
  };
}

export const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  const cards = [
    {
      title: 'CA Journalier',
      value: `${stats.dailyRevenue.toLocaleString()} Ar`,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'CA Mensuel',
      value: `${stats.monthlyRevenue.toLocaleString()} Ar`,
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Transactions Aujourd\'hui',
      value: stats.todayTransactions.toString(),
      icon: ShoppingBag,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Transactions Mois',
      value: stats.monthlyTransactions.toString(),
      icon: ShoppingBag,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      title: 'Ticket Moyen',
      value: `${stats.averageTicket.toLocaleString()} Ar`,
      icon: Users,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      title: 'Note Client',
      value: `${stats.rating}/5.0`,
      icon: Award,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon className={card.textColor} size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};