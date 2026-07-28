// services/export.service.ts
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export class ExportService {
  async exportToExcel(transactions: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Montant (Ar)', key: 'amount', width: 15 },
      { header: 'Méthode', key: 'method', width: 15 },
      { header: 'Statut', key: 'status', width: 15 },
      { header: 'Référence', key: 'ref', width: 25 }
    ];

    transactions.forEach(t => {
      worksheet.addRow({
        date: new Date(t.createdAt).toLocaleDateString('fr-FR'),
        amount: t.amount,
        method: t.paymentMethod,
        status: t.status,
        ref: t.transactionRef
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async exportToPDF(merchantName: string, stats: any): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = [];
      const doc = new PDFDocument();
      const stream = new PassThrough();

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      doc.fontSize(20).text(`Rapport PayMarket - ${merchantName}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`Période: ${stats.period}`);
      doc.moveDown();
      doc.text(`CA Total: ${stats.totalRevenue.toLocaleString()} Ar`);
      doc.text(`Nombre transactions: ${stats.totalTransactions}`);
      doc.text(`Ticket moyen: ${stats.averageTicket.toLocaleString()} Ar`);
      
      doc.end();
    });
  }
}