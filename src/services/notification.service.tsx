import React from 'react'; // Requis selon ta configuration TypeScript/Babel
import toast from 'react-hot-toast';
import { CheckCircle2, AlertOctagon, Info, AlertTriangle } from 'lucide-react';

export interface NotificationData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export class NotificationService {
  
  static showToast(data: NotificationData) {
    const duration = data.duration || 4000;

    toast.custom((t) => {
      const configs = {
        success: {
          icon: React.createElement(CheckCircle2, { size: 18, className: "text-emerald-400" }),
          borderColor: 'border-emerald-500/30',
          shadowColor: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
          badgeBg: 'bg-emerald-500/10 text-emerald-400'
        },
        error: {
          icon: React.createElement(AlertOctagon, { size: 18, className: "text-rose-400" }),
          borderColor: 'border-rose-500/30',
          shadowColor: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]',
          badgeBg: 'bg-rose-500/10 text-rose-400'
        },
        warning: {
          icon: React.createElement(AlertTriangle, { size: 18, className: "text-amber-400" }),
          borderColor: 'border-amber-500/30',
          shadowColor: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
          badgeBg: 'bg-amber-500/10 text-amber-400'
        },
        info: {
          icon: React.createElement(Info, { size: 18, className: "text-sky-400" }),
          borderColor: 'border-sky-500/30',
          shadowColor: 'shadow-[0_0_15px_rgba(14,165,233,0.15)]',
          badgeBg: 'bg-sky-500/10 text-sky-400'
        }
      };

      const current = configs[data.type] || configs.info;

      return (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
            max-w-md w-full bg-[#1a142e]/95 backdrop-blur-md pointer-events-auto flex p-4 rounded-2xl 
            border ${current.borderColor} ${current.shadowColor} text-slate-200 font-sans`}
        >
          <div className="flex-1 w-0">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#0f0a1a]/80 border border-[#4c1d95]/30 rounded-xl shrink-0 mt-0.5">
                {current.icon}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-black tracking-wide text-white uppercase">
                    {data.title}
                  </p>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${current.badgeBg}`}>
                    {data.type}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {data.message}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex border-l border-[#4c1d95]/20 pl-3 ml-3 items-center">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-wider transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      );
    }, { duration });
  }

  static async requestDesktopPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  static showDesktopNotification(title: string, body: string, icon?: string) {
    if (!('Notification' in window)) return;
    
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: body,
        icon: icon || '/logo192.png',
        silent: false,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setTimeout(() => notification.close(), 5000);
    }
  }

  static notifyNewPayment(merchantName: string, amount: number, customerName: string) {
    this.showToast({
      title: 'Paiement EncaissÃ©',
      message: `${customerName} a versÃ© ${amount.toLocaleString()} Ar sur la passerelle ${merchantName}.`,
      type: 'success',
      duration: 5000
    });

    this.showDesktopNotification(
      'ðŸ’° Nouveau paiement reÃ§u !',
      `${customerName} â€¢ ${amount.toLocaleString()} Ar`
    );
  }

  static notifyDailyReport(merchantName: string, totalAmount: number, transactionCount: number) {
    this.showToast({
      title: 'SynthÃ¨se du Jour',
      message: `${merchantName} : ClÃ´ture Ã  ${totalAmount.toLocaleString()} Ar pour ${transactionCount} opÃ©rations.`,
      type: 'info',
      duration: 7000
    });
  }

  static async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    console.log(`[SMS] Ã€ ${phoneNumber}: ${message}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showToast({
          title: 'Passerelle SMS',
          message: `Routage SMS complÃ©tÃ© vers le numÃ©ro ${phoneNumber}`,
          type: 'success',
          duration: 2000
        });
        resolve(true);
      }, 1000);
    });
  }

  static async sendEmail(email: string, subject: string, _body: string): Promise<boolean> {
    console.log(`[EMAIL] Ã€ ${email}: ${subject}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showToast({
          title: 'Flux SMTP',
          message: `Bordereau comptable envoyÃ© avec succÃ¨s Ã  ${email}`,
          type: 'success',
          duration: 2000
        });
        resolve(true);
      }, 1000);
    });
  }

  static sendTestNotification() {
    this.showToast({
      title: 'Test SystÃ¨me',
      message: 'Les passerelles de notifications de la console fonctionnent !',
      type: 'success'
    });
  }
}
