import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';
import { Camera, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface QRScannerProps {
  onScanSuccess: (data: any) => void;
  onClose: () => void;
}

export const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [hasCamera, setHasCamera] = useState(true);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;
        
        // Vérifier les caméras disponibles
        const videoInputDevices = await codeReader.listVideoInputDevices();
        
        if (videoInputDevices.length === 0) {
          setHasCamera(false);
          setError('Aucune caméra détectée sur cet appareil');
          return;
        }
        
        // Utiliser la caméra arrière si disponible
        const backCamera = videoInputDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('environment')
        );
        
        const selectedDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId;
        
        // Démarrer le scan
        if (videoRef.current) {
          await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
            if (result && scanning) {
              const text = result.getText();
              try {
                const data = JSON.parse(text);
                // Vérifier que le QR code est valide pour PayMarket
                if (data.merchantId && data.merchantName) {
                  setScanning(false);
                  onScanSuccess(data);
                  toast.success(`Marchand trouvé: ${data.merchantName}`);
                  stopScanner();
                } else {
                  toast.error('QR Code invalide pour PayMarket');
                }
              } catch (e) {
                toast.error('QR Code non reconnu');
              }
            }
            
            if (err && !(err instanceof NotFoundException || err instanceof ChecksumException || err instanceof FormatException)) {
              console.error(err);
            }
          });
        }
      } catch (err) {
        console.error('Erreur d\'initialisation du scanner:', err);
        setError('Impossible d\'accéder à la caméra');
        setHasCamera(false);
      }
    };
    
    initScanner();
    
    return () => {
      stopScanner();
    };
  }, [scanning, onScanSuccess]);
  
  const stopScanner = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
  };
  
  if (!hasCamera) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 max-w-md mx-4 text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Caméra non disponible</h3>
          <p className="text-gray-600 mb-4">{error || 'Veuillez vérifier que vous avez une caméra et les permissions nécessaires'}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold">Scannez le QR Code</h3>
          <button onClick={onClose} className="text-white p-2">
            <X size={24} />
          </button>
        </div>
      </div>
      
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      
      {/* Guide overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-2 border-green-500 rounded-lg shadow-lg">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-center z-10">
        <p className="text-white text-sm">Placez le QR Code dans le cadre</p>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 rounded-lg p-2">
        <Camera size={20} className="text-white" />
      </div>
    </div>
  );
};
