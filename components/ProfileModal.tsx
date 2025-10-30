import React, { useState, useEffect } from 'react';
import { TranslationKey } from '../utils/translations';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, pic: string | null, jobTitle: string, institutionName: string, idNumber: string, address: string) => void;
  currentName: string;
  currentPic: string | null;
  currentJobTitle: string;
  currentInstitutionName: string;
  currentIdNumber: string;
  currentAddress: string;
  t: (key: TranslationKey) => string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentName, 
  currentPic, 
  currentJobTitle, 
  currentInstitutionName,
  currentIdNumber, 
  currentAddress,
  t
}) => {
  const [name, setName] = useState(currentName);
  const [pic, setPic] = useState(currentPic);
  const [jobTitle, setJobTitle] = useState(currentJobTitle);
  const [institutionName, setInstitutionName] = useState(currentInstitutionName);
  const [idNumber, setIdNumber] = useState(currentIdNumber);
  const [address, setAddress] = useState(currentAddress);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setPic(currentPic);
      setJobTitle(currentJobTitle);
      setInstitutionName(currentInstitutionName);
      setIdNumber(currentIdNumber);
      setAddress(currentAddress);
    }
  }, [isOpen, currentName, currentPic, currentJobTitle, currentInstitutionName, currentIdNumber, currentAddress]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(name, pic, jobTitle, institutionName, idNumber, address);
  };

  const DefaultAvatar: React.FC = () => (
    <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
      <svg className="w-16 h-16 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">{t('editProfileTitle')}</h2>
        
        <div className="flex flex-col items-center gap-4 mb-6">
          {pic ? (
            <img src={pic} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <DefaultAvatar />
          )}
          <label htmlFor="profilePicInput" className="cursor-pointer text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold">
            {t('changePhotoButton')}
          </label>
          <input id="profilePicInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('nameLabel')}</label>
            <input
              id="userName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('jobTitleLabel')}</label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder={t('jobTitlePlaceholder')}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="institutionName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('institutionLabel')}</label>
            <input
              id="institutionName"
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder={t('institutionPlaceholder')}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('idNumberLabel')}</label>
            <input
              id="idNumber"
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder={t('idNumberPlaceholder')}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('addressLabel')}</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('addressPlaceholder')}
              rows={3}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold transition">
            {t('cancelButton')}
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold transition shadow-md">
            {t('saveButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;