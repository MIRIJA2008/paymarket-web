import { useState } from 'react';
import { QRService } from '../../services/qr.service';
import { Download, Printer, Copy, DollarSign, Package, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
interface QRCodeGeneratorProps {
  merchantId: string;
  merchantName: string;
}

type QRType = 'static' | 'dynamic' | 'product';

interface Product {
  id: string;
  name: string;
  price: number;
}

export const QRCodeGenerator = ({ merchantId, merchantName }: QRCodeGeneratorProps) => {
  const [qrType, setQrType] = useState<QRType>('static');
  const [amount, setAmount] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Produits mockés
  const products: Product[] = [
    { id: '1', name: 'Produit A', price: 5000 },
    { id: '2', name: 'Produit B', price: 10000 },
    { id: '3', name: 'Produit C', price: 25000 },
    { id: '4', name: 'Produit D', price: 50000 }
  ];

  const handleGenerateQR = async () => {
    setLoading(true);
    try {
      let qrUrl = '';
      
      switch (qrType) {
        case 'static':
          qrUrl = await QRService.generateStaticQR(merchantId, merchantName);
          toast.success('QR Code statique généré avec succès');
          break;
          
        case 'dynamic':
          if (!amount || parseFloat(amount) <= 0) {
            toast.error('Veuillez entrer un montant valide');
            setLoading(false);
            return;
          }
          qrUrl = await QRService.generateDynamicQR(merchantId, merchantName, parseFloat(amount));
          toast.success(`QR Code de ${parseFloat(amount).toLocaleString()} Ar généré`);
          break;
          
        case 'product':
          if (!selectedProduct) {
            toast.error('Veuillez sélectionner un produit');
            setLoading(false);
            return;
          }
          const product = products.find(p => p.id === selectedProduct);
          if (product) {
            qrUrl = await QRService.generateProductQR(
              merchantId, 
              merchantName, 
              product.id, 
              product.name, 
              product.price
            );
            toast.success(`QR Code pour ${product.name} généré`);
          }
          break;
      }
      
      setQrCodeUrl(qrUrl);
    } catch (error) {
      toast.error('Erreur lors de la génération du QR Code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      QRService.downloadQRCode(qrCodeUrl, `paymarket_qr_${Date.now()}.png`);
      toast.success('QR Code téléchargé');
    }
  };

  const handlePrint = () => {
    if (qrCodeUrl) {
      QRService.printQRCode(qrCodeUrl);
    }
  };

  const handleCopy = () => {
    if (qrCodeUrl) {
      navigator.clipboard.writeText(qrCodeUrl);
      toast.success('QR Code copié dans le presse-papier');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Générateur de QR Code</h2>
      
      {/* Type de QR Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de QR Code
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => { setQrType('static'); setQrCodeUrl(null); }}
            className={`p-3 rounded-lg border-2 transition ${
              qrType === 'static'
                ? 'border-green-600 bg-green-50 text-green-600'
                : 'border-gray-200 text-gray-500 hover:border-green-300 hover:text-gray-700'
            }`}
          >
            <CreditCard className="mx-auto mb-1" size={24} />
            <span className="text-sm font-medium">Statique</span>
            <p className="text-xs text-gray-500 mt-1">Pour affichage permanent</p>
          </button>
          
          <button
            onClick={() => { setQrType('dynamic'); setQrCodeUrl(null); }}
            className={`p-3 rounded-lg border-2 transition ${
              qrType === 'dynamic'
                ? 'border-green-600 bg-green-50 text-green-600'
                : 'border-gray-200 text-gray-500 hover:border-green-300 hover:text-gray-700'
            }`}
          >
            <DollarSign className="mx-auto mb-1" size={24} />
            <span className="text-sm font-medium">Dynamique</span>
            <p className="text-xs text-gray-500 mt-1">Avec montant spécifique</p>
          </button>
          
          <button
            onClick={() => { setQrType('product'); setQrCodeUrl(null); }}
            className={`p-3 rounded-lg border-2 transition ${
              qrType === 'product'
                ? 'border-green-600 bg-green-50 text-green-600'
                : 'border-gray-200 text-gray-500 hover:border-green-300 hover:text-gray-700'
            }`}
          >
            <Package className="mx-auto mb-1" size={24} />
            <span className="text-sm font-medium">Produit</span>
            <p className="text-xs text-gray-500 mt-1">Pour un produit spécifique</p>
          </button>
        </div>
      </div>

      {/* Champs spécifiques */}
      {qrType === 'dynamic' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant (Ar)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex: 15000"
            className="w-full p-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      )}

      {qrType === 'product' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner un produit
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Choisir un produit</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.price.toLocaleString()} Ar
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Bouton générer */}
      <button
        onClick={handleGenerateQR}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 mb-6"
      >
        {loading ? 'Génération en cours...' : 'Générer QR Code'}
      </button>

      {/* Affichage QR Code */}
      {qrCodeUrl && (
        <div className="border-t pt-6">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto" style={{ width: '250px', height: '250px' }} />
            </div>
            
            <div className="mt-4 flex gap-2 justify-center">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Download size={18} />
                Télécharger
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                <Printer size={18} />
                Imprimer
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Copy size={18} />
                Copier
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Ce QR Code expire le {new Date(Date.now() + (qrType === 'static' ? 365 : 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
