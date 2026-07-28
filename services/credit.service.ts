// services/credit.service.ts
export class CreditScoringService {
  async calculateScore(merchantId: string): Promise<number> {
    const transactions = await prisma.transaction.findMany({
      where: {
        merchantId,
        status: 'COMPLETED',
        createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
      }
    });

    // Calcul du score basé sur:
    // - Volume transactionnel (40%)
    // - Régularité des ventes (30%)
    // - Ancienneté (20%)
    // - Note clients (10%)

    let score = 0;
    
    // Volume
    const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
    score += Math.min(totalVolume / 1000000, 40); // 40 pts max pour 1M Ar

    // Régularité
    const dailyTransactions = transactions.reduce((acc, t) => {
      const date = t.createdAt.toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const avgDaily = Object.values(dailyTransactions).reduce((a, b) => a + b, 0) / Object.keys(dailyTransactions).length;
    score += Math.min(avgDaily * 5, 30); // 30 pts max

    // Ancienneté
    const firstTransaction = transactions[0]?.createdAt;
    if (firstTransaction) {
      const daysActive = (Date.now() - firstTransaction.getTime()) / (1000 * 3600 * 24);
      score += Math.min(daysActive / 3, 20); // 20 pts max pour 60 jours
    }

    return Math.min(score, 100);
  }

  async requestMicroCredit(merchantId: string, amount: number): Promise<CreditRequest> {
    const score = await this.calculateScore(merchantId);
    const maxAmount = score * 10000; // 10 000 Ar par point
    
    if (amount > maxAmount) {
      throw new Error(`Montant maximum autorisé: ${maxAmount} Ar`);
    }

    // Création demande de crédit
    const creditRequest = await prisma.creditRequest.create({
      data: {
        merchantId,
        amount,
        status: 'PENDING',
        creditScore: score,
        requestedAt: new Date()
      }
    });

    // Notification aux partenaires financiers
    await this.notifyLenders(creditRequest);

    return creditRequest;
  }
}