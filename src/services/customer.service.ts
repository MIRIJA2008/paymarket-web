import toast from 'react-hot-toast';

export interface PaymentRequest {
  merchantId: string;
  merchantName: string;
  amount: number;
  paymentMethod: 'mvola' | 'orange' | 'airtel';
  customerPhone: string;
  productName?: string;
}

export interface PaymentReceipt {
  id: string;
  merchantName: string;
  amount: number;
  networkFees: number; // AJOUT : Frais de transaction réseau
  totalDebited: number; // AJOUT : Montant total prélevé (Montant + Frais)
  date: Date;
  paymentMethod: string;
  transactionId: string;
  status: 'success' | 'pending' | 'failed';
}

export interface PaymentHistory {
  id: string;
  merchantName: string;
  amount: number;
  date: Date;
  paymentMethod: string;
  status: string;
  receiptUrl?: string;
}

// AJOUT : Interface pour les demandes de rétrofacturation
export interface RefundRequest {
  transactionId: string;
  reason: string;
  approverId: string;
}

export class CustomerService {
  
  /**
   * Valider le format du numéro selon l'opérateur choisi à Madagascar
   */
  private static validateLocalPhone(phone: string, method: string): boolean {
    const cleanPhone = phone.replace(/\s/g, '');
    // Regex globale pour les préfixes de Madagascar (032, 033, 034, 037, 038)
    const mgRegex = /^(032|033|034|037|038)\d{7}$/;
    
    if (!mgRegex.test(cleanPhone)) return false;
    
    // Validation croisée optionnelle spécifique
    if (method === 'mvola' && !cleanPhone.startsWith('034')) return true; // Notification de tolérance inter-opérateur
    return true;
  }

  /**
   * Calculer les frais de réseau mobiles applicables (Simulation taux fixe de 1.5%)
   */
  public static calculateNetworkFees(amount: number): number {
    return Math.round(amount * 0.015);
  }

  /**
   * Effectuer un paiement (Simulation API Passerelle)
   */
  static async processPayment(paymentData: PaymentRequest): Promise<PaymentReceipt> {
    return new Promise((resolve, reject) => {
      // ÉLÉMENT AJOUTÉ : Validation du numéro de téléphone en amont
      if (!this.validateLocalPhone(paymentData.customerPhone, paymentData.paymentMethod)) {
        toast.error('Format du numéro de téléphone invalide pour ce canal monétique.');
        reject(new Error('Invalid phone format'));
        return;
      }

      const fees = this.calculateNetworkFees(paymentData.amount);

      setTimeout(() => {
        const receipt: PaymentReceipt = {
          id: `PAY_${Date.now()}`,
          merchantName: paymentData.merchantName,
          amount: paymentData.amount,
          networkFees: fees,
          totalDebited: paymentData.amount + fees,
          date: new Date(),
          paymentMethod: paymentData.paymentMethod,
          transactionId: `TRX_${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
          status: 'success'
        };
        toast.success('Paiement validé par la passerelle !');
        resolve(receipt);
      }, 2000);
    });
  }

  /**
   * ÉLÉMENT AJOUTÉ : Demande de remboursement / Annulation de transaction
   */
  static async initiateRefund(refundData: RefundRequest): Promise<{ success: boolean; reference: string }> {
    console.debug(`Initiating refund protocol for transaction: ${refundData.transactionId}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success('Demande de remboursement transmise à l\'opérateur.');
        resolve({
          success: true,
          reference: `REF_${Math.random().toString(36).substring(2, 7).toUpperCase()}`
        });
      }, 1500);
    });
  }

  /**
   * Récupérer l'historique des paiements du client
   */
  static async getPaymentHistory(customerId: string): Promise<PaymentHistory[]> {
    console.debug(`Fetching payment history for customer: ${customerId}`);
    
    return [
      { id: '1', merchantName: 'Boutique Express', amount: 12500, date: new Date('2026-06-09T10:30:00'), paymentMethod: 'MVola', status: 'success' },
      { id: '2', merchantName: 'Resto Chez nous', amount: 35000, date: new Date('2026-06-08T19:15:00'), paymentMethod: 'Orange Money', status: 'success' },
      { id: '3', merchantName: 'Super Marché Tana', amount: 8900, date: new Date('2026-06-07T14:45:00'), paymentMethod: 'Airtel Money', status: 'success' },
      { id: '4', merchantName: 'Pharmacie Centrale', amount: 25000, date: new Date('2026-06-06T11:20:00'), paymentMethod: 'MVola', status: 'failed' },
      { id: '5', merchantName: 'Service Taxi', amount: 12000, date: new Date('2026-06-05T08:30:00'), paymentMethod: 'Orange Money', status: 'success' }
    ];
  }

  /**
   * Télécharger un reçu au format HTML/Blob réadapté à la charte Angular (Light/Modern de angular.dev)
   */
  static async downloadReceipt(receipt: PaymentReceipt): Promise<Blob> {
    const formatCurrency = (val: number) => new Intl.NumberFormat('fr-FR').format(val) + ' Ar';
    
    const formattedAmount = formatCurrency(receipt.amount);
    const formattedFees = formatCurrency(receipt.networkFees ?? 0);
    const formattedTotal = formatCurrency(receipt.totalDebited ?? receipt.amount);

    const receiptHtml = `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              background-color: #f8fafc; 
              color: #1e293b; 
              font-family: 'Inter', system-ui, -apple-system, sans-serif; 
              padding: 40px 20px;
              display: flex;
              justify-content: center;
            }
            .container {
              background-color: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 20px;
              padding: 36px;
              width: 100%;
              max-width: 420px;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
            }
            .header { 
              text-align: center; 
              margin-bottom: 28px; 
              padding-bottom: 24px;
              border-bottom: 1px solid #f1f5f9;
            }
            .logo { 
              font-size: 32px; 
              font-weight: 800;
              letter-spacing: -0.04em;
              background: linear-gradient(135deg, #e52055 0%, #bb2649 30%, #6924df 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 6px;
            }
            h2 {
              font-size: 14px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: 600;
              letter-spacing: 0.05em;
              margin: 0;
            }
            .row { 
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 14px 0; 
              font-size: 14px;
            }
            .label { 
              color: #64748b; 
              font-weight: 500;
            }
            .value { 
              color: #0f172a; 
              font-weight: 600; 
            }
            .divider {
              border-top: 1px dashed #e2e8f0;
              margin: 18px 0;
            }
            .amount-box {
              background: linear-gradient(135deg, rgba(229, 32, 85, 0.04) 0%, rgba(105, 36, 223, 0.04) 100%);
              border: 1px solid rgba(105, 36, 223, 0.08);
              border-radius: 14px;
              padding: 20px;
              text-align: center;
              margin-top: 24px;
            }
            .amount-label { 
              font-size: 11px; 
              color: #6924df; 
              text-transform: uppercase; 
              font-weight: 700;
              letter-spacing: 0.05em;
            }
            .amount-value { 
              font-size: 28px; 
              font-weight: 800; 
              color: #0f172a; 
              margin-top: 6px; 
            }
            .status-badge {
              background-color: #e6f4ea;
              color: #137333;
              padding: 6px 12px;
              border-radius: 100px;
              font-size: 12px;
              font-weight: 600;
            }
            .legal-mention {
              font-size: 10px;
              color: #94a3b8;
              text-align: center;
              margin-top: 24px;
              line-height: 1.4;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AngularPay</div>
              <h2>Reçu d'Opération Électronique</h2>
            </div>
            <div>
              <div class="row">
                <span class="label">Raison Sociale</span>
                <span class="value">${receipt.merchantName}</span>
              </div>
              <div class="row">
                <span class="label">ID Unique</span>
                <span class="value" style="font-family: monospace; font-size: 13px;">${receipt.transactionId}</span>
              </div>
              <div class="row">
                <span class="label">Date & Heure</span>
                <span class="value">${receipt.date.toLocaleString('fr-FR')}</span>
              </div>
              <div class="row">
                <span class="label">Réseau Émetteur</span>
                <span class="value" style="text-transform: uppercase;">${receipt.paymentMethod}</span>
              </div>
              <div class="row">
                <span class="label">Statut Validation</span>
                <span class="status-badge">Confirmé</span>
              </div>

              <div class="divider"></div>

              <div class="row" style="font-size: 13px;">
                <span class="label">Montant Net Net</span>
                <span class="value" style="color: #475569;">${formattedAmount}</span>
              </div>
              <div class="row" style="font-size: 13px;">
                <span class="label">Frais de Routage Extérieur</span>
                <span class="value" style="color: #475569;">${formattedFees}</span>
              </div>
            </div>
            
            <div class="amount-box">
              <div class="amount-label">Volume Total Débité</div>
              <div class="amount-value">${formattedTotal}</div>
            </div>

            <div class="legal-mention">
              Ce document fait office de preuve de transfert de fonds électronique. Pour toute réclamation, veuillez contacter le support PayMarket muni de l'ID unique ci-dessus.
            </div>
          </div>
        </body>
      </html>
    `;
    
    return new Blob([receiptHtml], { type: 'text/html' });
  }
}