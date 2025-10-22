import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '/assets/logo2.webp';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, isArabic } = useLanguage();

  const isHomePage = location.pathname === '/';

  // تأثير التمرير لتغيير مظهر الناف بار
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: { ar: 'الرئيسية', en: 'Home' },
      href: '/'
    },
    {
      name: { ar: 'عن الشركة', en: 'About' },
      href: '/about'
    },
    {
      name: { ar: 'خدماتنا', en: 'Services' },
      href: '/services'
    },
    {
      name: { ar: 'المشاريع', en: 'Projects' },
      href: '/projects'
    },
    {
      name: { ar: 'طلب عرض السعر', en: 'Get Quote' },
      href: '/price-request'
    },
    {
      name: { ar: 'اتصل بنا', en: 'Contact' },
      href: '/contact'
    },
  ];

  // تحديد أنماط الناف بار باللون الأبيض
  const navStyles = {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  };

  const textColor = 'text-gray-800';
  const hoverColor = 'hover:text-primary';
  const activeColor = 'text-primary';

  return (
    <>
      {/* عنصر وهمي لتعويض ارتفاع النافبار الثابت */}
      <div className="h-16 sm:h-20 lg:h-20" />
      
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={navStyles}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* اللوجو */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain flex-shrink-0"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className={`text-base sm:text-lg md:text-2xl font-bold leading-tight tracking-tight ${textColor}`}>
                    {isArabic ? 'موازين الشرق' : 'Mawazin Al-Sharq'}
                  </span>
                  <span className={`text-xs sm:text-sm font-medium text-gray-600`}>
                    {isArabic ? 'للمقاولات العامة' : 'General Contracting'}
                  </span>
                </div>
              </Link>
            </div>

            {/* القائمة الرئيسية - نسخة سطح المكتب */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    location.pathname === item.href
                      ? `${activeColor} border-b-2 border-accent`
                      : `${textColor} ${hoverColor}`
                  }`}
                >
                  {item.name[language]}
                </Link>
              ))}
            </div>

            {/* الجانب الأيمن - زر اللغة ومعلومات المستخدم */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
              {/* زر تبديل اللغة */}
              <motion.button
                onClick={toggleLanguage}
                className={`flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 border whitespace-nowrap text-gray-700 border-gray-200 hover:text-primary hover:bg-gray-100`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-4 h-4 xl:w-5 xl:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="font-medium">
                  {isArabic ? 'English' : 'العربية'}
                </span>
              </motion.button>
            </div>

            {/* نسخة الجوال والتابلت */}
            <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
              {/* زر تبديل اللغة للجوال */}
              <motion.button
                onClick={toggleLanguage}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 border shadow-sm overflow-hidden group text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:from-primary hover:to-blue-700 hover:text-white`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <svg
                  className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="relative z-10">
                  {isArabic ? 'EN' : 'AR'}
                </span>
              </motion.button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset text-gray-700 hover:text-primary hover:bg-gray-100 focus:ring-primary`}
                aria-expanded="false"
              >
                <span className="sr-only">
                  {isArabic ? 'فتح القائمة' : 'Open menu'}
                </span>
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span 
                    className={`block h-0.5 w-6 transform transition duration-300 ease-in-out bg-current ${
                      isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
                    }`}
                  ></span>
                  <span 
                    className={`block h-0.5 w-6 transition duration-300 ease-in-out bg-current ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span 
                    className={`block h-0.5 w-6 transform transition duration-300 ease-in-out bg-current ${
                      isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* القائمة المنزلقة للجوال والتابلت */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-primary bg-blue-50'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name[language]}
                  </Link>
                ))}

                {/* قسم تبديل اللغة في القائمة المنزلقة */}
                <div className="px-3 py-2 mt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className={`relative flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 border shadow-sm overflow-hidden group text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:from-primary hover:to-blue-700 hover:text-white`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <svg
                      className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    <span className="relative z-10">
                      {isArabic ? 'التغيير إلى الإنجليزية' : 'Switch to Arabic'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default NavBar;