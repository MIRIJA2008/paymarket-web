// services/websocket.service.ts
import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    this.socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connecté');
    });

    return this.socket;
  }

  subscribeToPayments(callback: (data: any) => void) {
    this.socket?.on('new-payment', callback);
  }

  subscribeToMerchantStats(merchantId: string, callback: (stats: any) => void) {
    this.socket?.emit('subscribe-merchant', merchantId);
    this.socket?.on(`merchant-${merchantId}-stats`, callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export const wsService = new WebSocketService();