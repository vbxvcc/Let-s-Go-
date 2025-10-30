import React, { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import ProfileModal from './components/ProfileModal';
import { Item } from './types';
import { translations, TranslationKey } from './utils/translations';

const currencies = ['IDR', 'USD', 'EUR', 'JPY', 'GBP'];

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const savedItems = localStorage.getItem('shoppingItems');
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Could not parse items from localStorage", error);
      return [];
    }
  });
  const [currency, setCurrency] = useState<string>('IDR');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>(() => (localStorage.getItem('language') as 'id' | 'en') || 'id');
  
  const t = (key: TranslationKey) => translations[key][language];

  // Profile State
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || t('user'));
  const [profilePic, setProfilePic] = useState<string | null>(() => localStorage.getItem('profilePic'));
  const [jobTitle, setJobTitle] = useState<string>(() => localStorage.getItem('jobTitle') || t('jobTitleDefault'));
  const [institutionName, setInstitutionName] = useState<string>(() => localStorage.getItem('institutionName') || t('institutionDefault'));
  const [idNumber, setIdNumber] = useState<string>(() => localStorage.getItem('idNumber') || '');
  const [address, setAddress] = useState<string>(() => localStorage.getItem('address') || '');

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
  }, [items]);

  // Profile Persistence Effects
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    if (profilePic) {
      localStorage.setItem('profilePic', profilePic);
    } else {
      localStorage.removeItem('profilePic');
    }
  }, [profilePic]);

  useEffect(() => {
    localStorage.setItem('jobTitle', jobTitle);
  }, [jobTitle]);
  
  useEffect(() => {
    localStorage.setItem('institutionName', institutionName);
  }, [institutionName]);

  useEffect(() => {
    localStorage.setItem('idNumber', idNumber);
  }, [idNumber]);
  
  useEffect(() => {
    localStorage.setItem('address', address);
  }, [address]);


  const handleAddItem = (item: Item) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleClearItems = () => {
    setItems([]);
  };

  const handleProfileSave = (newName: string, newPic: string | null, newJob: string, newInstitution: string, newId: string, newAddr: string) => {
    setUserName(newName);
    setProfilePic(newPic);
    setJobTitle(newJob);
    setInstitutionName(newInstitution);
    setIdNumber(newId);
    setAddress(newAddr);
    setProfileModalOpen(false);
  };

  const formatCurrency = (amount: number) => {
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'id' ? 'en' : 'id');
  };

  const totalCost = items.reduce((sum, item) => sum + item.total, 0);

  const DefaultAvatar: React.FC = () => (
    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
      <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
    </div>
  );

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="flex justify-between items-center mb-8">
            <div onClick={() => setProfileModalOpen(true)} className="flex items-center gap-4 cursor-pointer group">
              {profilePic ? (
                 <img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary-500 group-hover:opacity-80 transition-opacity" />
              ) : (
                <DefaultAvatar />
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{userName}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-primary-500 transition-colors">{jobTitle}</p>
                 <p className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-primary-400 transition-colors">{institutionName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={toggleLanguage} className="p-2 h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition font-bold text-sm">
                    {language.toUpperCase()}
                </button>
                <button onClick={toggleDarkMode} className="p-2 h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                    {darkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ItemForm 
              onAddItem={handleAddItem} 
              currency={currency} 
              setCurrency={setCurrency} 
              currencies={currencies}
              formatCurrency={formatCurrency}
              t={t}
            />
          </div>
          <div className="lg:col-span-2">
            <ItemList 
              items={items} 
              onDeleteItem={handleDeleteItem} 
              onClearItems={handleClearItems}
              formatCurrency={formatCurrency} 
              totalCost={totalCost}
              userName={userName}
              profilePic={profilePic}
              jobTitle={jobTitle}
              institutionName={institutionName}
              idNumber={idNumber}
              address={address}
              t={t}
              language={language}
            />
          </div>
        </main>
      </div>
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSave={handleProfileSave}
        currentName={userName}
        currentPic={profilePic}
        currentJobTitle={jobTitle}
        currentInstitutionName={institutionName}
        currentIdNumber={idNumber}
        currentAddress={address}
        t={t}
      />
    </div>
  );
};

export default App;