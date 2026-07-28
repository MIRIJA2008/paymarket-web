import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useState } from 'react';

interface SalesChartProps {
  data: Array<{
    date: string;
    amount: number;
    transactions: number;
  }>;
}

type ChartType = 'line' | 'area' | 'bar';

export const SalesChart = ({ data }: SalesChartProps) => {
  const [chartType, setChartType] = useState<ChartType>('line');

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-green-600">
            CA: {payload[0].value.toLocaleString()} Ar
          </p>
          {payload[1] && (
            <p className="text-blue-600">
              Transactions: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis yAxisId="left" tickFormatter={(value) => `${value.toLocaleString()} Ar`} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              strokeWidth={2}
              name="Chiffre d'affaires (Ar)"
              dot={{ fill: '#10B981' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="transactions"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Nombre de transactions"
              dot={{ fill: '#3B82F6' }}
            />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
              name="Chiffre d'affaires (Ar)"
            />
            <Area
              type="monotone"
              dataKey="transactions"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              name="Transactions"
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="amount"
              fill="#10B981"
              name="Chiffre d'affaires (Ar)"
            />
            <Bar
              yAxisId="right"
              dataKey="transactions"
              fill="#3B82F6"
              name="Transactions"
            />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Évolution des ventes</h3>
          <p className="text-sm text-gray-500">7 derniers jours</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              chartType === 'line'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ligne
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              chartType === 'area'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Aire
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              chartType === 'bar'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Barres
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};