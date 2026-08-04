import { Smartphone, Mail, Monitor } from 'lucide-react';
import { NotificationService } from '../../services/notification.service';

export const TestNotificationButton = () => {
  const testDesktopNotification = async () => {
    const granted = await NotificationService.requestDesktopPermission();
    if (granted) {
      NotificationService.showDesktopNotification(
        '🧪 Test de notification',
        'Si vous voyez ce message, les notifications fonctionnent !',
        '/logo192.png'
      );
    }
  };

  const testSMS = () => {
    NotificationService.sendSMS('0341234567', 'Test PayMarket: Vos notifications fonctionnent!');
  };

  const testEmail = () => {
    NotificationService.sendEmail('test@paymarket.mg', 'Test PayMarket', 'Ceci est un test d\'email');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">🧪 Test des notifications</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={testDesktopNotification}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Monitor size={18} />
          Tester Desktop
        </button>
        <button
          onClick={testSMS}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Smartphone size={18} />
          Tester SMS
        </button>
        <button
          onClick={testEmail}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Mail size={18} />
          Tester Email
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        💡 Note: Pour les vraies notifications SMS/Email, configurez les API correspondantes
      </p>
    </div>
  );
};
