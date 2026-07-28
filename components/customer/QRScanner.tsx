// components/customer/QRScanner.tsx
import React, { useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { usePayment } from '../../hooks/usePayment';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const QRScanner: React.FC = () => {
  const [scanning, setScanning] = useState(true);
  const [merchantData, setMerchantData] = useState<any>(null);
  const [amount, setAmount] = useState<string>('');
  const { initiatePayment, loading, error } = usePayment();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    
    if (scanning) {
      codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
        if (result) {
          const text = result.getText();
          try {
            const data = JSON.parse(text);
            if (data.type === 'payment') {
              setMerchantData(data);
              setScanning(false);
              codeReader.reset();
            }
          } catch (e) {
            console.error('QR invalide');
          }
        }
      });
    }

    return () => {
      codeReader.reset();
    };
  }, [scanning]);

  const handlePayment = async () => {
    await initiatePayment({
      merchantId: merchantData.merchantId,
      amount: parseFloat(amount) || merchantData.amount,
      paymentMethod: 'MVOLA' // ou sélection utilisateur
    });
  };

  if (scanning) {
    return (
      <div className="relative h-screen">
        <video id="video" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-green-500 rounded-lg"></div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <p>Scannez le QR Code du marchand</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-2">{merchantData?.merchantName}</h2>
        <p className="text-gray-500 mb-4">Marchand PayMarket</p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Montant (Ar)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Saisir le montant"
            className="w-full border rounded-lg p-3 text-lg"
            autoFocus
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || (!amount && !merchantData?.amount)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? <LoadingSpinner /> : 'Payer avec Mobile Money'}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};