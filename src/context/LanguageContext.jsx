import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  // تحميل اللغة المحفوظة عند التحميل الأول
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      applyLanguageSettings(savedLanguage);
    }
  }, []);

  const applyLanguageSettings = (lang) => {
    // تغيير اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // إضافة كلاس للغة للتحكم في الخطوط والأنماط
    document.documentElement.classList.remove('lang-ar', 'lang-en');
    document.documentElement.classList.add(`lang-${lang}`);
  };

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('app-language', newLang);
    applyLanguageSettings(newLang);
  };

  const setLanguageDirectly = (lang) => {
    if (['ar', 'en'].includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('app-language', lang);
      applyLanguageSettings(lang);
    }
  };

  const value = {
    language,
    toggleLanguage,
    setLanguage: setLanguageDirectly,
    isArabic: language === 'ar',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};