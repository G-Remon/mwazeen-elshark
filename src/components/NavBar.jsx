import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo2.png';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, isArabic } = useLanguage();

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
      name: { ar: 'المشاريع', en: 'Projects' },
      href: '/projects'
    },
    {
      name: { ar: 'فريق العمل', en: 'Team' },
      href: '/team'
    },
    {
      name: { ar: 'اتصل بنا', en: 'Contact' },
      href: '/contact'
    },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* اللوجو */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <motion.img
                src={logo}
                alt="Company Logo"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-sm sm:text-base md:text-xl font-bold text-primary tracking-wide truncate">
                {isArabic ? 'موازين الشرق' : 'Mawazin Al-Sharq'}
              </span>
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
                    ? 'text-primary border-b-2 border-accent'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name[language]}
              </Link>
            ))}
          </div>

          {/* الجانب الأيمن - زر اللغة */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
            {/* زر تبديل اللغة */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200 border border-gray-200 whitespace-nowrap"
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
          <div className="lg:hidden flex items-center space-x-2 flex-shrink-0">
            {/* زر تبديل اللغة للجوال */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
              <span className="text-xs sm:text-sm font-medium">
                {isArabic ? 'EN' : 'AR'}
              </span>
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">
                {isArabic ? 'فتح القائمة' : 'Open menu'}
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-5 sm:w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block h-0.5 w-5 sm:w-6 bg-current transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-5 sm:w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-sm sm:text-base font-medium ${
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
              <div className="px-3 py-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
                  <span>
                    {isArabic ? 'التغيير إلى الإنجليزية' : 'Switch to Arabic'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;