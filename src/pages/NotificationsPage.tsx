import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Trash2,
  CheckCircle2,
  AlertOctagon,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore, type NotificationType } from '../store/notificationStore';

const ICONS: Record<NotificationType, React.ReactElement> = {
  success: <CheckCircle2 size={18} className="text-emerald-400" />,
  error: <AlertOctagon size={18} className="text-rose-400" />,
  warning: <AlertTriangle size={18} className="text-amber-400" />,
  info: <Info size={18} className="text-sky-400" />,
};

const BORDER: Record<NotificationType, string> = {
  success: 'border-emerald-500/20',
  error: 'border-rose-500/20',
  warning: 'border-amber-500/20',
  info: 'border-sky-500/20',
};

function timeAgo(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();

  const backTo = user?.role === 'merchant' ? '/merchant/dashboard' : '/customer';

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-slate-100 font-sans antialiased pb-12">
      {/* Header collant, cohérent avec le reste du site */}
      <div className="bg-[#1a142e]/80 backdrop-blur-md border-b border-[#4c1d95]/40 p-4 sticky top-0 z-50 shadow-[0_4px_20px_rgba(15,10,26,0.5)]">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(backTo)}
              className="p-2 text-slate-400 hover:text-[#ff6ef7] bg-[#4c1d95]/20 rounded-xl border border-[#6366f1]/20 hover:border-[#ff6ef7]/40 transition-all duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent tracking-tight">
              Notifications
            </h1>
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                title="Tout marquer comme lu"
                className="p-2 text-slate-400 hover:text-[#8b5cf6] bg-[#0f0a1a] rounded-xl border border-[#4c1d95]/40 hover:border-[#8b5cf6]/40 transition-all"
              >
                <CheckCheck size={18} />
              </button>
              <button
                onClick={clearAll}
                title="Tout effacer"
                className="p-2 text-slate-400 hover:text-[#ec4899] bg-[#0f0a1a] rounded-xl border border-[#4c1d95]/40 hover:border-[#ec4899]/40 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto mt-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 px-6">
            <div className="bg-[#1a142e] border border-[#4c1d95]/40 rounded-2xl p-5 mb-4">
              <Bell size={32} className="text-slate-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-200 mb-1">Aucune notification</h2>
            <p className="text-sm text-slate-500 max-w-xs">
              Tes notifications (paiements, transactions, alertes système) apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`w-full text-left bg-[#1a142e]/70 backdrop-blur-md rounded-2xl border ${BORDER[n.type]} p-4 flex gap-3 items-start transition-all hover:border-opacity-60 ${
                  n.read ? 'opacity-60' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0">{ICONS[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-slate-100 truncate">{n.title}</p>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#ec4899] shrink-0 shadow-[0_0_6px_#ec4899]" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-slate-600 mt-1.5 font-mono">{timeAgo(n.createdAt)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
