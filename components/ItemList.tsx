import React from 'react';
import { Item } from '../types';
import { TranslationKey } from '../utils/translations';

interface ItemListProps {
  items: Item[];
  onDeleteItem: (id: string) => void;
  onClearItems: () => void;
  formatCurrency: (amount: number) => string;
  totalCost: number;
  userName: string;
  profilePic: string | null;
  jobTitle: string;
  institutionName: string;
  idNumber: string;
  address: string;
  t: (key: TranslationKey) => string;
  language: 'id' | 'en';
}

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteItem, onClearItems, formatCurrency, totalCost, userName, profilePic, jobTitle, institutionName, idNumber, address, t, language }) => {

  const formatDate = (dateString: string) => {
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleExportPDF = () => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
    let startY = 15;

    // Add profile picture if it exists
    if (profilePic) {
      try {
        doc.addImage(profilePic, 'PNG', 170, startY, 25, 25);
      } catch (e) {
        console.error("Could not add image to PDF:", e);
      }
    }

    // Add title
    doc.setFontSize(18);
    doc.text(t('pdfTitle'), 14, startY + 7);
    startY += 15;
    
    // Add Profile Details
    doc.setFontSize(10);
    doc.setTextColor(100); // Muted color
    
    const profileDetails = [
      `${t('pdfName')}: ${userName}`,
      `${t('pdfJobTitle')}: ${jobTitle}`,
      `${t('pdfInstitution')}: ${institutionName}`,
      `${t('pdfIdNumber')}: ${idNumber}`,
      `${t('pdfAddress')}: ${address}`
    ].filter(detail => detail.split(': ')[1]); // Filter out empty details

    if (profileDetails.length > 0) {
        profileDetails.forEach(detail => {
            doc.text(detail, 14, startY);
            startY += 6;
        });
    }
    
    startY += 5; // Add some space before the table

    const tableColumns = [t('tableDate'), t('tableItem'), t('tableQuantity'), t('tableUnitPrice'), t('tableTotal')];
    const tableRows = items.map(item => [
      formatDate(item.date),
      item.name,
      `${item.quantity} ${item.unit}`,
      formatCurrency(item.price),
      formatCurrency(item.total)
    ]);

    (doc as any).autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: startY,
      theme: 'striped',
      headStyles: { fillColor: [29, 78, 216] }, // Corresponds to primary-700
      foot: [
        [{
          content: t('grandTotal'),
          colSpan: 4,
          styles: { halign: 'right', fontStyle: 'bold' }
        }, {
          content: formatCurrency(totalCost),
          styles: { fontStyle: 'bold' }
        }]
      ],
      footStyles: {
        fontStyle: 'bold',
        fillColor: [241, 245, 249] // slate-100
      }
    });

    doc.save("daftar-belanja.pdf");
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-3">
        <h2 className="text-2xl font-bold">{t('shoppingList')}</h2>
        {items.length > 0 && (
          <button
            onClick={onClearItems}
            className="text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition"
          >
            {t('clearAllButton')}
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-10">
          {t('emptyListMessage')}
        </p>
      ) : (
        <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white sm:pl-0">{t('tableDate')}</th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white sm:pl-0">{t('tableItem')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">{t('tableQuantity')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">{t('tableUnitPrice')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">{t('tableTotal')}</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">{t('deleteAction')}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-500 dark:text-slate-300 sm:pl-0">{formatDate(item.date)}</td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 dark:text-white sm:pl-0">{item.name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">{item.quantity} {item.unit}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-300">{formatCurrency(item.price)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{formatCurrency(item.total)}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button onClick={() => onDeleteItem(item.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400">
                                    {t('deleteAction')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>{t('grandTotal')}</span>
            <span className="text-primary-600 dark:text-primary-400">{formatCurrency(totalCost)}</span>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleExportPDF}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {t('exportButton')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;