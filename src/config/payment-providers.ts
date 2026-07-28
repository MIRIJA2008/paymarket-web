// config/payment-providers.ts
export interface PaymentProviderConfig {
  name: string;
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
  webhookSecret: string;
}

export const providerConfigs: Record<string, PaymentProviderConfig> = {
  MVOLA: {
    name: 'MVola',
    apiKey: process.env.MVOLA_API_KEY!,
    apiSecret: process.env.MVOLA_API_SECRET!,
    baseUrl: process.env.MVOLA_BASE_URL!,
    webhookSecret: process.env.MVOLA_WEBHOOK_SECRET!
  },
  ORANGE: {
    name: 'Orange Money',
    apiKey: process.env.ORANGE_API_KEY!,
    apiSecret: process.env.ORANGE_API_SECRET!,
    baseUrl: process.env.ORANGE_BASE_URL!,
    webhookSecret: process.env.ORANGE_WEBHOOK_SECRET!
  },
  AIRTEL: {
    name: 'Airtel Money',
    apiKey: process.env.AIRTEL_API_KEY!,
    apiSecret: process.env.AIRTEL_API_SECRET!,
    baseUrl: process.env.AIRTEL_BASE_URL!,
    webhookSecret: process.env.AIRTEL_WEBHOOK_SECRET!
  }
};