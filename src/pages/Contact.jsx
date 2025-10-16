import React, { useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Lazy load components
const OptimizedImage = lazy(() => import('../components/OptimizedImage'));
const LoadingSpinner = lazy(() => import('../components/LoadingSpinner'));

// Memoized SVG Icons - محسنة للأداء
const ContactIcons = {
  Phone: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )),
  Email: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )),
  Location: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )),
  Clock: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )),
  Building: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )),
  Globe: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )),
  WhatsApp: memo((props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.189-1.248-6.189-3.515-8.464" />
    </svg>
  )),
  Arrow: memo((props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ))
};

// Loading component للـ Suspense
const MapPlaceholder = () => (
  <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-400 text-center">
      <div className="text-2xl mb-2">🗺️</div>
      <div>جاري تحميل الخريطة...</div>
    </div>
  </div>
);

const Contact = () => {
  const { language, isArabic } = useLanguage();

  // Content in both languages - محسنة للذاكرة
  const content = useMemo(() => ({
    ar: {
      title: "تواصل معنا",
      description: "نحن هنا لمساعدتك في تحقيق رؤيتك العقارية. فريقنا من الخبراء جاهز للإجابة على استفساراتك.",
      contactInfo: "معلومات التواصل",
      offices: "مكاتبنا",
      workingHours: "ساعات العمل",
      workingAreas: "نطاق العمل",
      directCall: "اتصال مباشر",
      whatsapp: "مراسلة واتساب",
      phone: "هاتف",
      email: "بريد إلكتروني",
      mainOffice: "المقر الرئيسي",
      branch: "فرع الخبر",
      workDays: {
        satThu: "السبت - الخميس",
        friday: "الجمعة"
      },
      hours: {
        satThu: "8:00 ص - 6:00 م",
        friday: "مغلق"
      },
      coverage: "نقدم خدماتنا في جميع مناطق المملكة العربية السعودية",
      socialMedia: "وسائل التواصل الاجتماعي",
      getInTouch: "ابق على تواصل",
      quickResponse: "نرد على جميع الاستفسارات خلال 24 ساعة",
      readyToServe: "مستعدون لخدمتك",
      expertTeam: "فريقنا من الخبراء مستعد لتحويل رؤيتك إلى واقع ملموس",
      startProject: "ابدأ مشروعك اليوم",
      contactNow: "اتصل بنا الآن",
      riyadh: "الرياض",
      khobar: "الخبر"
    },
    en: {
      title: "Contact Us",
      description: "We're here to help you achieve your real estate vision. Our expert team is ready to answer your inquiries.",
      contactInfo: "Contact Information",
      offices: "Our Offices",
      workingHours: "Working Hours",
      workingAreas: "Coverage Areas",
      directCall: "Direct Call",
      whatsapp: "WhatsApp Message",
      phone: "Phone",
      email: "Email",
      mainOffice: "Headquarters",
      branch: "Al Khobar Branch",
      workDays: {
        satThu: "Saturday - Thursday",
        friday: "Friday"
      },
      hours: {
        satThu: "8:00 AM - 6:00 PM",
        friday: "Closed"
      },
      coverage: "We serve all regions across Saudi Arabia",
      socialMedia: "Social Media",
      getInTouch: "Get in Touch",
      quickResponse: "We respond to all inquiries within 24 hours",
      readyToServe: "Ready to Serve You",
      expertTeam: "Our expert team is ready to turn your vision into reality",
      startProject: "Start Your Project Today",
      contactNow: "Contact Us Now",
      riyadh: "Riyadh",
      khobar: "Al Khobar"
    }
  }), []);

  const currentContent = content[language];

  // استخدام useCallback لمعالجة الاتصالات
  const handleContactClick = useCallback((type) => {
    const phoneNumber = '+966558002061';
    const email = 'gm@mawazin-alsharq.com';

    switch (type) {
      case 'call':
        window.open(`tel:${phoneNumber}`, '_self');
        break;
      case 'whatsapp':
        const message = language === 'ar'
          ? 'مرحباً، أريد الاستفسار عن خدمات موازين الشرق العقارية'
          : 'Hello, I would like to inquire about Mawazin Al-Sharq Real Estate services';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${email}`, '_self');
        break;
      default:
        break;
    }
  }, [language]);

  // استخدام useMemo للوسائط الاجتماعية
  const socialMedia = useMemo(() => [
    {
      name: 'Facebook',
      url: '#',
      color: 'hover:bg-blue-600',
      icon: '📘',
      ariaLabel: { ar: 'تابعنا على فيسبوك', en: 'Follow us on Facebook' }
    },
    {
      name: 'Instagram',
      url: '#',
      color: 'hover:bg-pink-600',
      icon: '📷',
      ariaLabel: { ar: 'تابعنا على إنستغرام', en: 'Follow us on Instagram' }
    },
    {
      name: 'LinkedIn',
      url: '#',
      color: 'hover:bg-blue-800',
      icon: '💼',
      ariaLabel: { ar: 'تابعنا على لينكدإن', en: 'Follow us on LinkedIn' }
    },
    {
      name: 'Twitter',
      url: '#',
      color: 'hover:bg-sky-500',
      icon: '🐦',
      ariaLabel: { ar: 'تابعنا على تويتر', en: 'Follow us on Twitter' }
    }
  ], []);

  // تأثيرات الحركة - محسنة للأداء
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardHover = {
    hover: {
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Structured Data for SEO
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: currentContent.title,
    description: currentContent.description,
    mainEntity: {
      '@type': 'Organization',
      name: 'موازين الشرق للمقاولات العامة',
      telephone: '+966-55-800-2061',
      email: 'gm@mawazin-alsharq.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'الرياض',
        addressLocality: 'الرياض',
        addressCountry: 'SA'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia'
      }
    }
  }), [currentContent]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 md:py-20" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" itemProp="name">
              {currentContent.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed" itemProp="description">
              {currentContent.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20" aria-labelledby="contact-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
          >

            {/* Left Column - Contact Information */}
            <div className="space-y-6 md:space-y-8">

              {/* Primary Contact Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 focus-within:ring-4 focus-within:ring-blue-100"
                tabIndex={0}
              >
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="bg-blue-100 p-2 md:p-3 rounded-lg md:rounded-xl mr-3 md:mr-4">
                    <ContactIcons.Phone className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {currentContent.getInTouch}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      {currentContent.quickResponse}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {/* Phone Section */}
                  <div className={`flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`bg-green-50 p-2 md:p-3 rounded-lg ${isArabic ? 'ml-3 md:ml-4' : 'mr-3 md:mr-4'} flex-shrink-0`}>
                      <ContactIcons.Phone className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2">
                        {currentContent.phone}
                      </h3>
                      <p className="text-gray-800 text-lg md:text-xl font-bold mb-3 md:mb-4" itemProp="telephone">
                        +966 55 800 2061
                      </p>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleContactClick('call')}
                          className="bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center shadow-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-300"
                          aria-label={currentContent.directCall}
                        >
                          <ContactIcons.Phone className="h-4 md:h-5 w-4 md:w-5 mr-1 md:mr-2" />
                          {currentContent.directCall}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleContactClick('whatsapp')}
                          className="bg-[#25D366] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center shadow-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-300"
                          aria-label={currentContent.whatsapp}
                        >
                          <ContactIcons.WhatsApp className="h-4 md:h-5 w-4 md:w-5 mr-1 md:mr-2" />
                          {currentContent.whatsapp}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className={`flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`bg-blue-50 p-2 md:p-3 rounded-lg ${isArabic ? 'ml-3 md:ml-4' : 'mr-3 md:mr-4'} flex-shrink-0`}>
                      <ContactIcons.Email className="h-5 md:h-6 w-5 md:w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2">
                        {currentContent.email}
                      </h3>
                      <p className="text-gray-800 text-lg md:text-xl font-bold mb-3 md:mb-4" itemProp="email">
                        gm@mawazin-alsharq.com
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleContactClick('email')}
                        className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center shadow-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                        aria-label={language === 'ar' ? 'إرسال بريد إلكتروني' : 'Send Email'}
                      >
                        <ContactIcons.Email className="h-4 md:h-5 w-4 md:w-5 mr-1 md:mr-2" />
                        {language === 'ar' ? 'إرسال بريد' : 'Send Email'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Offices & Hours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                {/* Offices Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 focus-within:ring-4 focus-within:ring-purple-100"
                  tabIndex={0}
                >
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="bg-purple-100 p-1 md:p-2 rounded-lg mr-2 md:mr-3">
                      <ContactIcons.Building className="h-5 md:h-6 w-5 md:w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {currentContent.offices}
                    </h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="p-3 md:p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                        {currentContent.mainOffice}
                      </h4>
                      <p className="text-gray-600 text-sm md:text-base">{currentContent.riyadh}</p>
                    </div>
                    <div className="p-3 md:p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                        {currentContent.branch}
                      </h4>
                      <p className="text-gray-600 text-sm md:text-base">{currentContent.khobar}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Working Hours Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 focus-within:ring-4 focus-within:ring-orange-100"
                  tabIndex={0}
                >
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="bg-orange-100 p-1 md:p-2 rounded-lg mr-2 md:mr-3">
                      <ContactIcons.Clock className="h-5 md:h-6 w-5 md:w-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {currentContent.workingHours}
                    </h3>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-700 font-medium text-sm md:text-base">
                        {currentContent.workDays.satThu}
                      </span>
                      <span className="font-semibold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded text-sm md:text-base">
                        {currentContent.hours.satThu}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-700 font-medium text-sm md:text-base">
                        {currentContent.workDays.friday}
                      </span>
                      <span className="font-semibold text-gray-500 bg-gray-100 px-2 md:px-3 py-1 rounded text-sm md:text-base">
                        {currentContent.hours.friday}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Coverage Areas Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 focus-within:ring-4 focus-within:ring-indigo-100"
                tabIndex={0}
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="bg-indigo-100 p-1 md:p-2 rounded-lg mr-2 md:mr-3">
                    <ContactIcons.Globe className="h-5 md:h-6 w-5 md:w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {currentContent.workingAreas}
                  </h3>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {currentContent.coverage}
                </p>
              </motion.div>

              {/* Social Media Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 focus-within:ring-4 focus-within:ring-gray-100"
                tabIndex={0}
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                  {currentContent.socialMedia}
                </h3>

                <div className={`flex gap-3 md:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg ${social.color} text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-current`}
                      aria-label={social.ariaLabel[language]}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="text-base md:text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Maps & CTA */}
            <div className="space-y-6 md:space-y-8">

              {/* Riyadh Map Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden focus-within:ring-4 focus-within:ring-blue-100"
                tabIndex={0}
              >
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <ContactIcons.Location className="h-5 md:h-6 w-5 md:w-6 text-blue-600 mr-2 md:mr-3" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {currentContent.mainOffice} - {currentContent.riyadh}
                    </h3>
                  </div>
                </div>
                <div className="h-64 md:h-80 bg-gray-100">
                  <Suspense fallback={<MapPlaceholder />}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.396332573926!2d46.67541527599728!3d24.713812277968392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${currentContent.mainOffice} - ${currentContent.riyadh}`}
                      aria-label={`Map showing location of ${currentContent.mainOffice} in ${currentContent.riyadh}`}
                    />
                  </Suspense>
                </div>
              </motion.div>

              {/* Khobar Map Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden focus-within:ring-4 focus-within:ring-green-100"
                tabIndex={0}
              >
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <ContactIcons.Location className="h-5 md:h-6 w-5 md:w-6 text-green-600 mr-2 md:mr-3" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {currentContent.branch} - {currentContent.khobar}
                    </h3>
                  </div>
                </div>
                <div className="h-64 md:h-80 bg-gray-100">
                  <Suspense fallback={<MapPlaceholder />}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.934375058161!2d50.20818857599202!3d26.217271877023195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49f6bf6006e7e9%3A0x6b3e6cc6c7c7b1b1!2sAl%20Khobar%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${currentContent.branch} - ${currentContent.khobar}`}
                      aria-label={`Map showing location of ${currentContent.branch} in ${currentContent.khobar}`}
                    />
                  </Suspense>
                </div>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl focus-within:ring-4 focus-within:ring-blue-300"
                tabIndex={0}
              >
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                    {currentContent.readyToServe}
                  </h3>
                  <p className="text-blue-100 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {currentContent.expertTeam}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContactClick('call')}
                    className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center mx-auto shadow-lg text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                    aria-label={currentContent.contactNow}
                  >
                    {currentContent.contactNow}
                    <ContactIcons.Arrow className={`h-4 md:h-5 w-4 md:w-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default memo(Contact);