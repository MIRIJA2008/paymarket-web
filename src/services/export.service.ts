import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface TransactionData {
  id: string;
  date: Date;
  customerName: string;
  amount: number;
  paymentMethod: string;
  status: string;
  reference: string;
}

export class ExportService {
  
  /**
   * Méthode utilitaire interne pour télécharger un fichier sans file-saver
   */
  private static triggerDownload(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  /**
   * Export vers Excel enrichi avec types de données natifs et formatage monétaire
   */
  static exportToExcel(transactions: TransactionData[], merchantName: string) {
    // Préparation des lignes avec des données typées proprement pour Excel
    const data = transactions.map(t => ({
      'Date': t.date.toLocaleDateString('fr-FR'),
      'Heure': t.date.toLocaleTimeString('fr-FR'),
      'Client': t.customerName,
      'Montant': t.amount, // Nombre brut ici, formaté ci-dessous
      'Méthode': t.paymentMethod.toUpperCase(),
      'Statut': t.status.toUpperCase(),
      'Référence': t.reference
    }));
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    
    // CORRECTION ICI : Remplacement de XXLSX par XLSX
    XLSX.utils.book_append_sheet(wb, ws, 'Journal de Caisse');
    
    // Application d'un format monétaire natif Excel sur la colonne D (Montant)
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:A1');
    for (let r = range.s.r + 1; r <= range.e.r; ++r) {
      const cellRef = XLSX.utils.encode_cell({ r, c: 3 }); // Colonne index 3 = Montant
      if (ws[cellRef]) {
        ws[cellRef].t = 'n'; // Format Nombre
        ws[cellRef].z = '#,##0" Ar"'; // Format monétaire Madagascar
      }
    }

    // Ajuster la largeur des colonnes
    const colWidths = [
      { wch: 13 }, // Date
      { wch: 10 }, // Heure
      { wch: 24 }, // Client
      { wch: 16 }, // Montant
      { wch: 14 }, // Méthode
      { wch: 12 }, // Statut
      { wch: 18 }  // Référence
    ];
    ws['!cols'] = colWidths;
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    this.triggerDownload(blob, `audits_${merchantName}_${new Date().toISOString().split('T')[0]}.xlsx`);
  }
  
  /**
   * Export vers PDF avec rapports analytiques avancés intégrés
   */
  static exportToPDF(transactions: TransactionData[], merchantName: string, period: string) {
    const doc = new jsPDF();
    const todayStr = new Date().toLocaleDateString('fr-FR');
    
    // --- DESIGN EN-TÊTE ---
    doc.setFontSize(22);
    doc.setTextColor(229, 32, 85); // Angular Crimson (#e52055)
    doc.text('PAYMARKET FINANCIAL REPORT', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate Gray
    doc.text(`Identifiant Marchand : ${merchantName}`, 14, 32);
    doc.text(`Période consolidée : ${period}`, 14, 38);
    doc.text(`Généré le : ${todayStr} à ${new Date().toLocaleTimeString('fr-FR')}`, 14, 44);
    
    // --- CALCULS STATISTIQUES FINANCIÈRES ---
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const completedTx = transactions.filter(t => ['SUCCESS', 'COMPLETED'].includes(t.status.toUpperCase()));
    const failedTx = transactions.filter(t => ['FAILED', 'ECHEC'].includes(t.status.toUpperCase()));
    
    const totalSuccessAmount = completedTx.reduce((sum, t) => sum + t.amount, 0);
    const successRate = transactions.length > 0 ? ((completedTx.length / transactions.length) * 100).toFixed(1) : '0.0';

    // Analyse de performance par opérateur monétique
    const operators = ['MVOLA', 'ORANGE MONEY', 'AIRTEL MONEY'];
    const operatorStats = operators.map(op => {
      const opTx = transactions.filter(t => t.paymentMethod.toUpperCase() === op || t.paymentMethod.toUpperCase().includes(op.split(' ')[0]));
      const opVol = opTx.filter(t => ['SUCCESS', 'COMPLETED'].includes(t.status.toUpperCase())).reduce((sum, t) => sum + t.amount, 0);
      return { name: op, count: opTx.length, volume: opVol };
    });
    
    // --- BLOC DE METRICS (KPIs) ---
    doc.setFillColor(248, 250, 252); 
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, 50, 182, 38, 'FD');
    
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.setFont('Helvetica', 'bold');
    doc.text('Indicateurs Clés de Performance (KPI)', 20, 58);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Volume Brut Traité : ${totalAmount.toLocaleString()} Ar (${transactions.length} ordonnancements)`, 20, 66);
    doc.text(`Volume Liquidé (Succès) : ${totalSuccessAmount.toLocaleString()} Ar`, 20, 72);
    doc.text(`Échecs / Rejets Systèmes : ${failedTx.length} transactions abandonnées`, 20, 78);
    
    // Highlight Taux de conversion
    doc.setTextColor(105, 36, 223); // Angular Violet
    doc.setFont('Helvetica', 'bold');
    doc.text(`Taux de succès de la passerelle : ${successRate}%`, 20, 84);
    
    // --- COMPOSANT TABLEAU INTERNE (RÉPARTITION OPÉRATEURS) ---
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('Analyse comparative par canal Mobile Money', 14, 100);
    
    autoTable(doc, {
      startY: 104,
      head: [['Opérateur Réseau', 'Nombre de requêtes', 'Volume d\'affaires encaissé (Ar)']],
      body: operatorStats.map(o => [o.name, o.count.toString(), `${o.volume.toLocaleString()} Ar`]),
      theme: 'plain',
      headStyles: { fillColor: [241, 245, 249], textColor: [71, 85, 105], fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { fontSize: 8.5, textColor: [15, 23, 42] },
      margin: { left: 14, right: 14 }
    });

    // --- TABLEAU PRINCIPAL : HISTORIQUE DES ÉCRITURES ---
    const nextStartY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('Registre chronologique des mouvements', 14, nextStartY);
    
    const tableData = transactions.map(t => [
      t.date.toLocaleDateString('fr-FR'),
      t.date.toLocaleTimeString('fr-FR'),
      t.customerName,
      `${t.amount.toLocaleString()} Ar`,
      t.paymentMethod.toUpperCase(),
      t.status.toUpperCase(),
      t.reference
    ]);
    
    autoTable(doc, {
      startY: nextStartY + 4,
      head: [['Date', 'Heure', 'Client / Titulaire', 'Montant Réglé', 'Canal', 'Statut', 'Référence Interne']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [105, 36, 223], 
        textColor: 255,
        fontSize: 8.5,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 5) {
          const statusText = data.cell.raw as string;
          if (['SUCCESS', 'COMPLETED'].includes(statusText)) {
            data.cell.styles.textColor = [22, 163, 74]; 
            data.cell.styles.fontStyle = 'bold';
          } else if (['FAILED', 'ECHEC'].includes(statusText)) {
            data.cell.styles.textColor = [220, 38, 38]; 
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });
    
    // --- PIED DE PAGE DYNAMIQUE ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `PayMarket Core Ledger v17.4 - Document de compensation chiffré - Page ${i}/${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`audit_financier_${merchantName}_${new Date().toISOString().split('T')[0]}.pdf`);
  }
  
  /**
   * Export CSV avec injection du BOM UTF-8 pour la prise en charge correcte d'Excel
   */
  static exportToCSV(transactions: TransactionData[], merchantName: string) {
    const headers = ['Date', 'Heure', 'Client', 'Montant (Ar)', 'Méthode', 'Statut', 'Référence'];
    const rows = transactions.map(t => [
      t.date.toLocaleDateString('fr-FR'),
      t.date.toLocaleTimeString('fr-FR'),
      t.customerName,
      t.amount,
      t.paymentMethod.toUpperCase(),
      t.status.toUpperCase(),
      t.reference
    ]);
    
    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    this.triggerDownload(blob, `extraction_${merchantName}_${new Date().toISOString().split('T')[0]}.csv`);
  }
}