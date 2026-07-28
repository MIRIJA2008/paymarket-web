import QRCode from 'qrcode';

export interface QRPayload {
  merchantId: string;
  merchantName: string;
  amount?: number;
  productId?: string;
  productName?: string;
  expiresAt?: number;
}

export class QRService {
  
  // Générer un QR code statique (Thème Angular Crimson)
  static async generateStaticQR(merchantId: string, merchantName: string): Promise<string> {
    const payload: QRPayload = {
      merchantId,
      merchantName,
      expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 an
    };
    
    return await QRCode.toDataURL(JSON.stringify(payload), {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
      color: {
        dark: '#e52055', // Angular Crimson
        light: '#FFFFFF'
      }
    });
  }

  // Générer un QR code dynamique (Thème Angular Violet)
  static async generateDynamicQR(
    merchantId: string, 
    merchantName: string, 
    amount: number,
    productName?: string
  ): Promise<string> {
    const payload: QRPayload = {
      merchantId,
      merchantName,
      amount,
      productName,
      expiresAt: Date.now() + 60 * 60 * 1000 // 1 heure
    };
    
    return await QRCode.toDataURL(JSON.stringify(payload), {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 350,
      color: {
        dark: '#6924df', // Angular Violet
        light: '#FFFFFF'
      }
    });
  }

  // Générer un QR code pour produit spécifique
  static async generateProductQR(
    merchantId: string,
    merchantName: string,
    productId: string,
    productName: string,
    price: number
  ): Promise<string> {
    const payload: QRPayload = {
      merchantId,
      merchantName,
      productId,
      productName,
      amount: price,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 jours
    };
    
    return await QRCode.toDataURL(JSON.stringify(payload), {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
      color: {
        dark: '#0f172a', // Ardoise foncé neutre
        light: '#FFFFFF'
      }
    });
  }

  // Télécharger le QR code
  static downloadQRCode(qrDataUrl: string, filename: string = 'qrcode.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = qrDataUrl;
    link.click();
  }

  // Imprimer le QR code
  static printQRCode(qrDataUrl: string) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Impression QR Code AngularPay</title>
            <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f8fafc; }
              img { max-width: 80%; height: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px; }
            </style>
          </head>
          <body>
            <img src="${qrDataUrl}" />
            <script>window.onload = () => { window.print(); window.close(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
}