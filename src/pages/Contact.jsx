import React, { useMemo, useCallback, memo, lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Lazy load existing components only
const LoadingSpinner = lazy(() => import('../components/LoadingSpinner'));

// Premium SVG Icons with enhanced design
const PremiumIcons = {
  Phone: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )),
  Email: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )),
  Location: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )),
  Clock: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )),
  Building: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )),
  Globe: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )),
  WhatsApp: memo(({ className, ...props }) => (
    <svg {...props} className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.189-1.248-6.189-3.515-8.464" />
    </svg>
  )),
  Chevron: memo(({ className, ...props }) => (
    <svg {...props} className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ))
};

// Premium loading components
const GlassMapPlaceholder = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-80 bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.02, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-center"
    >
      <div className="text-3xl mb-3">🏢</div>
      <div className="text-gray-600 font-light">جاري تحميل الخريطة...</div>
    </motion.div>
  </motion.div>
);

const Contact = () => {
  const { language, isArabic } = useLanguage();
  const [activeCard, setActiveCard] = useState(null);

  // Premium content with enhanced copy
  const content = useMemo(() => ({
    ar: {
      title: "تواصل معنا",
      subtitle: "التميز في كل تفصيل",
      description: "نحن هنا لتحويل رؤيتك العقارية إلى واقع ملموس. فريقنا من الخبراء يستمع بعناية ويقدم حلولاً استثنائية تلبي تطلعاتك.",
      contactInfo: "معلومات التواصل",
      offices: "مقراتنا",
      workingHours: "أوقات العمل",
      workingAreas: "نطاق التغطية",
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
      coverage: "نقدم خدماتنا الفاخرة في جميع أنحاء المملكة العربية السعودية، من الرياض إلى جدة والخبر والدمام",
      socialMedia: "وسائل التواصل الاجتماعي",
      getInTouch: "تواصل مع فريق الخبراء",
      quickResponse: "نرد على استفساراتك في غضون ساعات",
      readyToServe: "مستعدون لخدمتك",
      expertTeam: "فريقنا من الخبراء مستعد لتحويل رؤيتك إلى واقع استثنائي",
      startProject: "ابدأ مشروعك الفاخر اليوم",
      contactNow: "اتصل بنا الآن",
      riyadh: "الرياض",
      khobar: "الخبر",
      excellence: "التميز في الخدمة",
      trusted: "موثوق من قبل العملاء",
      since: "منذ 2014"
    },
    en: {
      title: "Contact Us",
      subtitle: "Excellence in Every Detail",
      description: "We're here to transform your real estate vision into tangible reality. Our expert team listens carefully and delivers exceptional solutions that meet your aspirations.",
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
      coverage: "We deliver luxury services across Saudi Arabia, from Riyadh to Jeddah, Al Khobar, and Dammam",
      socialMedia: "Social Media",
      getInTouch: "Connect with Our Experts",
      quickResponse: "We respond to your inquiries within hours",
      readyToServe: "Ready to Serve You",
      expertTeam: "Our expert team is ready to turn your vision into exceptional reality",
      startProject: "Start Your Luxury Project Today",
      contactNow: "Contact Us Now",
      riyadh: "Riyadh",
      khobar: "Al Khobar",
      excellence: "Service Excellence",
      trusted: "Trusted by Clients",
      since: "Since 2014"
    }
  }), []);

  const currentContent = content[language];

  // Enhanced contact handlers with premium feedback
  const handleContactClick = useCallback((type) => {
    const phoneNumber = '+966558002061';
    const email = 'gm@mawazin-alsharq.com';

    switch (type) {
      case 'call':
        window.open(`tel:${phoneNumber}`, '_self');
        break;
      case 'whatsapp':
        const message = language === 'ar'
          ? 'مرحباً، أريد الاستفسار عن خدمات موازين الشرق العقارية الفاخرة'
          : 'Hello, I would like to inquire about Mawazin Al-Sharq Luxury Real Estate services';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${email}?subject=${encodeURIComponent('Luxury Real Estate Inquiry')}`, '_self');
        break;
      default:
        break;
    }
  }, [language]);

  // Premium social media with enhanced data
  const socialMedia = useMemo(() => [
    {
      name: 'LinkedIn',
      url: '#',
      color: 'hover:bg-blue-600/20 hover:border-blue-400',
      icon: '💼',
      followers: '5K+'
    },
    {
      name: 'Instagram',
      url: '#',
      color: 'hover:bg-pink-600/20 hover:border-pink-400',
      icon: '📷',
      followers: '12K+'
    },
    {
      name: 'Twitter',
      url: '#',
      color: 'hover:bg-sky-500/20 hover:border-sky-400',
      icon: '🐦',
      followers: '8K+'
    },
    {
      name: 'Facebook',
      url: '#',
      color: 'hover:bg-blue-500/20 hover:border-blue-400',
      icon: '📘',
      followers: '15K+'
    }
  ], []);

  // Premium animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  };

  const premiumCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const shimmerAnimation = {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Enhanced structured data
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'موازين الشرق للمقاولات العامة',
    description: currentContent.description,
    telephone: '+966-55-800-2061',
    email: 'gm@mawazin-alsharq.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
      addressCountry: 'SA'
    },
    areaServed: 'Saudi Arabia',
    serviceType: 'Luxury Real Estate Development',
    foundingDate: '2010'
  }), [currentContent]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-200/5 rounded-full blur-3xl"></div>
      </div>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Premium Header Section */}
      <section className="relative py-20 md:py-28 overflow-hidden" role="banner">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-slate-900/95"></div>
        
        {/* Animated background elements */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"
        />
        <motion.div
          animate={floatingAnimation}
          transition={{ delay: 1 }}
          className="absolute top-40 right-20 w-6 h-6 bg-white/10 rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 mb-8"
            >
              <span className="text-white/80 text-sm font-light">{currentContent.trusted}</span>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <span className="text-white/60 text-sm font-light">{currentContent.since}</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {currentContent.title}
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-white/30"></div>
              <p className="text-xl md:text-2xl text-blue-200 font-light">
                {currentContent.subtitle}
              </p>
              <div className="w-12 h-px bg-white/30"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-light"
            >
              {currentContent.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Asymmetric Main Content */}
      <section className="relative py-16 md:py-24 -mt-12 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 xl:grid-cols-12 gap-8"
          >

            {/* Left Column - Enhanced Contact Cards (7/12) */}
            <div className="xl:col-span-7 space-y-8">

              {/* Premium Contact Card with Glass Morphism */}
              <motion.div
                variants={premiumCardVariants}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setActiveCard('contact')}
                onHoverEnd={() => setActiveCard(null)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-blue-500/10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
                        <PremiumIcons.Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {currentContent.getInTouch}
                        </h2>
                        <p className="text-slate-600 mt-1 font-light">
                          {currentContent.quickResponse}
                        </p>
                      </div>
                    </div>
                    
                    {/* Trust badge */}
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                      className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-emerald-700 text-sm font-medium">{currentContent.excellence}</span>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone Section */}
                    <motion.div 
                      className={`relative bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 p-6 group/phone ${
                        isArabic ? 'text-right' : 'text-left'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-green-100 rounded-xl">
                          <PremiumIcons.Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {currentContent.phone}
                        </h3>
                      </div>
                      
                      <p className="text-2xl font-bold text-slate-900 mb-6 font-mono">
                        +966 55 800 2061
                      </p>

                      <div className="flex flex-col gap-3">
                        <motion.button
                          whileHover={{ 
                            scale: 1.02,
                            background: "linear-gradient(135deg, #059669, #10b981)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleContactClick('call')}
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <PremiumIcons.Phone className="w-5 h-5" />
                          {currentContent.directCall}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ 
                            scale: 1.02,
                            background: "linear-gradient(135deg, #25D366, #128C7E)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleContactClick('whatsapp')}
                          className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <PremiumIcons.WhatsApp className="w-5 h-5" />
                          {currentContent.whatsapp}
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Email Section */}
                    <motion.div 
                      className={`relative bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 p-6 group/email ${
                        isArabic ? 'text-right' : 'text-left'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-blue-100 rounded-xl">
                          <PremiumIcons.Email className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {currentContent.email}
                        </h3>
                      </div>
                      
                      <p className="text-xl font-bold text-slate-900 mb-6 break-all">
                        gm@mawazin-alsharq.com
                      </p>

                      <motion.button
                        whileHover={{ 
                          scale: 1.02,
                          background: "linear-gradient(135deg, #2563eb, #3b82f6)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleContactClick('email')}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <PremiumIcons.Email className="w-5 h-5" />
                        {language === 'ar' ? 'إرسال بريد إلكتروني' : 'Send Email'}
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Offices & Hours Grid with Enhanced Design */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Offices Card */}
                <motion.div
                  variants={premiumCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-purple-500/10"></div>
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg">
                        <PremiumIcons.Building className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {currentContent.offices}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <motion.div 
                        className="p-4 bg-white/50 rounded-xl border border-white/60 backdrop-blur-sm"
                        whileHover={{ x: isArabic ? -4 : 4 }}
                      >
                        <h4 className="font-semibold text-slate-900 mb-2">
                          {currentContent.mainOffice}
                        </h4>
                        <p className="text-slate-600 font-light">{currentContent.riyadh}</p>
                      </motion.div>
                      <motion.div 
                        className="p-4 bg-white/50 rounded-xl border border-white/60 backdrop-blur-sm"
                        whileHover={{ x: isArabic ? -4 : 4 }}
                      >
                        <h4 className="font-semibold text-slate-900 mb-2">
                          {currentContent.branch}
                        </h4>
                        <p className="text-slate-600 font-light">{currentContent.khobar}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Working Hours Card */}
                <motion.div
                  variants={premiumCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-orange-500/10"></div>
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl shadow-lg">
                        <PremiumIcons.Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {currentContent.workingHours}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <motion.div 
                        className={`flex justify-between items-center p-4 bg-white/50 rounded-xl border border-white/60 backdrop-blur-sm ${
                          isArabic ? 'flex-row-reverse' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-slate-700 font-medium">
                          {currentContent.workDays.satThu}
                        </span>
                        <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                          {currentContent.hours.satThu}
                        </span>
                      </motion.div>
                      <motion.div 
                        className={`flex justify-between items-center p-4 bg-white/50 rounded-xl border border-white/60 backdrop-blur-sm ${
                          isArabic ? 'flex-row-reverse' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-slate-700 font-medium">
                          {currentContent.workDays.friday}
                        </span>
                        <span className="font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg text-sm">
                          {currentContent.hours.friday}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Coverage & Social Media Row */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Coverage Card */}
                <motion.div
                  variants={premiumCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-indigo-500/10"></div>
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg">
                        <PremiumIcons.Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {currentContent.workingAreas}
                      </h3>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-light mb-4">
                      {currentContent.coverage}
                    </p>

                    <motion.div
                      animate={shimmerAnimation}
                      style={{
                        background: "linear-gradient(90deg, #f0f9ff, #e0f2fe, #f0f9ff)",
                        backgroundSize: "200% 100%"
                      }}
                      className="h-2 rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Social Media Card */}
                <motion.div
                  variants={premiumCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-slate-500/10"></div>
                  <div className="relative p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                      {currentContent.socialMedia}
                    </h3>

                    <div className={`grid grid-cols-2 gap-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {socialMedia.map((social, index) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          variants={premiumCardVariants}
                          whileHover={{ 
                            scale: 1.05,
                            y: -4
                          }}
                          whileTap="tap"
                          className={`p-4 bg-white/50 rounded-xl border border-white/60 backdrop-blur-sm transition-all duration-300 ${social.color} group/social`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{social.icon}</span>
                            <span className="font-semibold text-slate-900 text-sm">
                              {social.name}
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs font-light">
                            {social.followers} {language === 'ar' ? 'متابع' : 'Followers'}
                          </p>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Maps & Premium Elements (5/12) */}
            <div className="xl:col-span-5 space-y-8">

              {/* Riyadh Map Card */}
              <motion.div
                variants={premiumCardVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-blue-500/20"></div>
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="p-6 border-b border-white/40">
                    <div className="flex items-center gap-3">
                      <PremiumIcons.Location className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-slate-900">
                        {currentContent.mainOffice} - {currentContent.riyadh}
                      </h3>
                    </div>
                  </div>
                  <div className="h-80 relative">
                    <Suspense fallback={<GlassMapPlaceholder />}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                      >
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.396332573926!2d46.67541527599728!3d24.713812277968392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-b-3xl"
                        />
                      </motion.div>
                    </Suspense>
                  </div>
                </div>
              </motion.div>

              {/* Khobar Map Card */}
              <motion.div
                variants={premiumCardVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-green-500/20"></div>
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="p-6 border-b border-white/40">
                    <div className="flex items-center gap-3">
                      <PremiumIcons.Location className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-slate-900">
                        {currentContent.branch} - {currentContent.khobar}
                      </h3>
                    </div>
                  </div>
                  <div className="h-80 relative">
                    <Suspense fallback={<GlassMapPlaceholder />}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                      >
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.934375058161!2d50.20818857599202!3d26.217271877023195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49f6bf6006e7e9%3A0x6b3e6cc6c7c7b1b1!2sAl%20Khobar%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-b-3xl"
                        />
                      </motion.div>
                    </Suspense>
                  </div>
                </div>
              </motion.div>

              {/* Premium CTA Card */}
              <motion.div
                variants={premiumCardVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 rounded-3xl shadow-2xl shadow-blue-500/30"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                
                <div className="relative p-8 text-center">
                  <motion.div
                    animate={floatingAnimation}
                    className="text-4xl mb-4"
                  >
                    🏢
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {currentContent.readyToServe}
                  </h3>
                  
                  <p className="text-blue-100/90 mb-6 leading-relaxed font-light">
                    {currentContent.expertTeam}
                  </p>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      background: "linear-gradient(135deg, #ffffff, #f0f9ff)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContactClick('call')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-3 mx-auto shadow-lg"
                  >
                    {currentContent.contactNow}
                    <PremiumIcons.Chevron className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
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