// controllers/webhook.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendNotification } from '../services/notification.service';

const prisma = new PrismaClient();

export class WebhookController {
  async handlePaymentCallback(req: Request, res: Response) {
    const { provider } = req.params;
    const signature = req.headers['x-webhook-signature'];
    
    // Vérification signature
    if (!this.verifySignature(req.body, signature, provider)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { transactionRef, status, mtnRef } = req.body;

    // Mise à jour transaction
    const transaction = await prisma.transaction.update({
      where: { transactionRef },
      data: {
        status: status === 'SUCCESS' ? 'COMPLETED' : 'FAILED',
        mtnRef,
        completedAt: status === 'SUCCESS' ? new Date() : undefined
      },
      include: { merchant: { include: { user: true } } }
    });

    if (status === 'SUCCESS') {
      // Notification au marchand (WebSocket)
      await sendNotification(transaction.merchant.userId, {
        type: 'PAYMENT_RECEIVED',
        data: {
          amount: transaction.amount,
          customerPhone: transaction.customerId,
          reference: transaction.transactionRef
        }
      });

      // Génération reçu numérique
      await this.generateReceipt(transaction);
    }

    res.status(200).json({ status: 'ok' });
  }

  private verifySignature(body: any, signature: any, provider: string): boolean {
    // Implémentation selon le provider
    return true;
  }

  private async generateReceipt(transaction: any) {
    // Génération PDF reçu
    // Envoi par SMS/Email
  }
}