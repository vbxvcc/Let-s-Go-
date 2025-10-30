import React, { useState, useEffect } from 'react';
import { Item, Unit } from '../types';
import { TranslationKey } from '../utils/translations';

interface ItemFormProps {
  onAddItem: (item: Item) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  currencies: string[];
  formatCurrency: (amount: number) => string;
  t: (key: TranslationKey) => string;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, currency, setCurrency, currencies, formatCurrency, t }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState<Unit>(Unit.Piece);
  const [price, setPrice] = useState<number | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const qty = typeof quantity === 'number' ? quantity : 0;
    const prc = typeof price === 'number' ? price : 0;
    setTotal(qty * prc);
  }, [quantity, price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date || Number(quantity) <= 0 || Number(price) <= 0) {
      setError(t('formError'));
      return;
    }
    
    onAddItem({
      id: new Date().toISOString(),
      name: name.trim(),
      quantity: Number(quantity),
      unit,
      price: Number(price),
      total,
      date,
    });

    // Reset form
    setName('');
    setQuantity('');
    setUnit(Unit.Piece);
    setPrice('');
    setDate(new Date().toISOString().split('T')[0]);
    setError('');
  };

  const unitOptions = Object.values(Unit).map(u => (
    <option key={u} value={u}>{u}</option>
  ));
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sticky top-8">
      <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-3">{t('shoppingInput')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('itemNameLabel')}</label>
          <input
            id="itemName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('itemNamePlaceholder')}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          />
        </div>

        <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('shoppingDateLabel')}</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('quantityLabel')}</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="0"
              min="0"
              step="any"
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('unitLabel')}</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition appearance-none"
            >
              {unitOptions}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('unitPriceLabel')}</label>
          <div className="flex gap-2">
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="0"
              min="0"
              step="any"
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
             <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('totalPriceLabel')}</label>
          <div className="mt-1 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-lg font-bold text-slate-800 dark:text-slate-100">
            {formatCurrency(total)}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          {t('addButton')}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;