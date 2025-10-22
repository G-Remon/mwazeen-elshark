import React, { useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Lazy load components
const OptimizedImage = lazy(() => import('../components/OptimizedImage'));
const LoadingSpinner = lazy(() => import('../components/LoadingSpinner'));

// Memoized SVG Icons - محسنة للأداء
const ValueIcon = memo(({ icon, className }) => (
  <span className={className} role="img" aria-hidden="true">
    {icon}
  </span>
));

// محتوى متعدد اللغات - محسن للذاكرة
const content = {
  ar: {
    title: "من نحن",
    subtitle: "شركة موازين الشرق للمقاولات",
    description: "نبني أكثر من مجرد مشاريع… نحن نبني ثقة تدوم منذ عام 2014",
    story: "قصتنا",
    vision: "رؤيتنا",
    mission: "رسالتنا",
    values: "قيمنا",
    valuesDesc: "الركيزة الأساسية لنجاحنا",
    stats: {
      projects: "وحدة سكنية ومشاريع متكاملة",
      experience: "سنة من الخبرة",
      since: "منذ التأسيس",
      contribution: "مساهمة في رؤية 2030"
    },
    badge: "مؤسسة رائدة منذ 2014",
    discoverProjects: "اكتشف مشاريعنا",
    contactUs: "اتصل بنا",
    scrollDown: "مرر للأسفل"
  },
  en: {
    title: "About Us",
    subtitle: "Mawazin Al-Sharq Contracting Company",
    description: "We build more than just projects... we build lasting trust since 2014",
    story: "Our Story",
    vision: "Our Vision",
    mission: "Our Mission",
    values: "Our Values",
    valuesDesc: "The foundation of our success",
    stats: {
      projects: "Residential Units & Integrated Projects",
      experience: "Years of Experience",
      since: "Since Establishment",
      contribution: "Contribution to Vision 2030"
    },
    badge: "Leading Establishment Since 2014",
    discoverProjects: "Discover Our Projects",
    contactUs: "Contact Us",
    scrollDown: "Scroll Down"
  }
};

// القيم متعددة اللغات - محسنة للذاكرة
const valuesData = [
  {
    title: { ar: 'الجودة', en: 'Quality' },
    description: {
      ar: 'معايير الجودة والإتقان في كل تفصيلة من مشاريعنا',
      en: 'Quality standards and mastery in every detail of our projects'
    },
    icon: '🏆',
    color: 'from-blue-700 to-blue-800'
  },
  {
    title: { ar: 'المصداقية', en: 'Credibility' },
    description: {
      ar: 'الشفافية والنزاهة في جميع تعاملاتنا وعلاقاتنا',
      en: 'Transparency and integrity in all our dealings and relationships'
    },
    icon: '🤝',
    color: 'from-amber-600 to-amber-700'
  },
  {
    title: { ar: 'الالتزام', en: 'Commitment' },
    description: {
      ar: 'التسليم في الوقت المحدد مع الحفاظ على أعلى معايير الجودة والسلامة',
      en: 'On-time delivery while maintaining the highest standards of quality and safety'
    },
    icon: '⏱️',
    color: 'from-blue-700 to-blue-800'
  },
  {
    title: { ar: 'التطوير المستمر', en: 'Continuous Development' },
    description: {
      ar: 'نسعى دائمًا للتطوير والابتكار في حلولنا الإنشائية',
      en: 'We always strive for development and innovation in our construction solutions'
    },
    icon: '🚀',
    color: 'from-amber-600 to-amber-700'
  }
];

// تأثيرات الحركة - محسنة للأداء
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

// تأثيرات الحركة للهيدر المحسن - أكثر هدوءاً
const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 1.5
    }
  }
};

const headerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Loading component للـ Suspense
const SectionPlaceholder = () => (
  <div className="min-h-screen bg-slate-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-16 bg-slate-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
);

const About = () => {
  const { language, isArabic } = useLanguage();

  // استخدام useMemo لحساب المحتوى الحالي
  const currentContent = useMemo(() => content[language], [language]);

  // استخدام useMemo للقيم
  const values = useMemo(() =>
    valuesData.map(value => ({
      ...value,
      title: value.title[language],
      description: value.description[language]
    })), [language]
  );

  // استخدام useMemo للنصوص
  const storyContent = useMemo(() => ({
    ar: [
      "في شركة موازين الشرق للمقاولات، نبني أكثر من مجرد مشاريع… نحن نبني ثقة تدوم منذ عام 2014.",
      "على مدى أكثر من عقد من الزمن، نفخر بأننا طوّرنا أكثر من 150 وحدة سكنية ومشاريع متكاملة جسدت معايير الجودة والإتقان في كل تفصيلة.",
      "تأسست الشركة برؤية واضحة تهدف إلى أن تكون من أبرز شركات المقاولات في المملكة، من خلال الجمع بين الخبرة الهندسية والابتكار في التنفيذ."
    ],
    en: [
      "At Mawazin Al-Sharq Contracting Company, we build more than just projects... we build lasting trust since 2014.",
      "Over more than a decade, we are proud to have developed over 150 residential units and integrated projects that embody quality standards and mastery in every detail.",
      "The company was founded with a clear vision to be one of the most prominent contracting companies in the Kingdom, by combining engineering expertise and innovation in execution."
    ]
  }), []);

  const visionContent = useMemo(() => ({
    ar: "أن نكون من أبرز شركات المقاولات في المملكة، من خلال الجمع بين الخبرة الهندسية والابتكار في التنفيذ.",
    en: "To be one of the most prominent contracting companies in the Kingdom, by combining engineering expertise and innovation in execution."
  }), []);

  const missionContent = useMemo(() => ({
    ar: "تحويل الطموحات إلى واقع ملموس عبر العمل باحترافية عالية، وتسليم المشاريع في الوقت المحدد، مع الحفاظ على أعلى معايير الجودة والسلامة.",
    en: "Transforming ambitions into tangible reality through high professionalism, delivering projects on time, while maintaining the highest standards of quality and safety."
  }), []);

  // استخدام useCallback لمعالجة الأخطاء
  const handleImageError = useCallback((e) => {
    e.target.src = '/assets/about/placeholder.webp';
    e.target.onerror = null;
  }, []);

  // وظيفة التمرير للنزول للقسم التالي
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.getElementById('story-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Structured Data for SEO
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'موازين الشرق للمقاولات العامة',
    description: currentContent.description,
    url: window.location.origin,
    foundingDate: '2014',
    numberOfEmployees: '50-100',
    areaServed: 'Saudi Arabia',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressRegion: 'Riyadh'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+966-XXX-XXXX',
      contactType: 'customer service'
    },
    knowsAbout: [
      'Construction',
      'Real Estate Development',
      'Building Contracting'
    ]
  }), [currentContent.description]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white overflow-x-hidden"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* الهيدر الرئيسي المحسن */}
      <motion.section
        variants={headerContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative py-12 md:py-20 lg:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden w-full"
        role="banner"
        aria-labelledby="about-title"
      >
        {/* خلفية متحركة أكثر هدوءاً */}
        <div className="absolute inset-0">
          {/* نمط هندسي خلفي */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '400px 400px'
            }}></div>
          </div>

          {/* تأثيرات متحركة أكثر هدوءاً */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-amber-500/3 rounded-full blur-2xl"
          ></motion.div>
          
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 3
            }}
            className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-blue-400/3 rounded-full blur-2xl"
          ></motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 xl:px-8">
          <div className="text-center w-full">
            {/* البادج - الشارة */}
            <motion.div
              variants={headerItemVariants}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 md:mb-8 shadow-lg mx-auto"
            >
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
              <span className="text-white/90 font-medium text-xs md:text-sm tracking-wider">
                {currentContent.badge}
              </span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <motion.h1
              variants={headerItemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2"
              id="about-title"
            >
              <span className="block bg-gradient-to-r from-white via-slate-100 to-amber-100 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </motion.h1>

            {/* العنوان الفرعي */}
            <motion.div
              variants={headerItemVariants}
              className="mb-6 md:mb-8"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-200 mb-3 md:mb-4 px-2">
                {currentContent.subtitle}
              </h2>
              <div className="w-16 h-0.5 md:h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mx-auto"></div>
            </motion.div>

            {/* الوصف */}
            <motion.p
              variants={headerItemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light mb-6 md:mb-8 px-3"
            >
              {currentContent.description}
            </motion.p>

            {/* أزرار التحريك */}
            <motion.div
              variants={headerItemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mt-8 md:mt-10 w-full px-2"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg md:rounded-xl shadow-lg transition-all duration-300 border border-amber-400/30 w-full sm:w-auto text-sm md:text-base"
              >
                <Link to="/projects" className="flex items-center justify-center">
                  {currentContent.discoverProjects}
                </Link>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.12)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 md:px-8 md:py-3 bg-white/8 backdrop-blur-sm text-white font-semibold rounded-lg md:rounded-xl border border-white/20 shadow-lg transition-all duration-300 w-full sm:w-auto text-sm md:text-base"
              >
                <Link to="/contact" className="flex items-center justify-center">
                  {currentContent.contactUs}
                </Link>
              </motion.button>
            </motion.div>

            {/* مؤشر التمرير */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mt-10 md:mt-12 cursor-pointer"
              onClick={scrollToNextSection}
            >
              <div className="w-5 h-8 md:w-6 md:h-10 border border-white/30 rounded-full mx-auto flex justify-center">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="w-0.5 h-2 md:h-3 bg-white/50 rounded-full mt-2"
                ></motion.div>
              </div>
              <p className="text-white/60 text-xs md:text-sm mt-2">
                {currentContent.scrollDown}
              </p>
            </motion.div>
          </div>
        </div>

        {/* زوايا زخرفية - مخفية على الموبايل */}
        <div className="hidden md:block absolute top-0 left-0 w-16 h-16 lg:w-24 lg:h-24 border-t-2 border-l-2 border-amber-400/20"></div>
        <div className="hidden md:block absolute top-0 right-0 w-16 h-16 lg:w-24 lg:h-24 border-t-2 border-r-2 border-amber-400/20"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-16 h-16 lg:w-24 lg:h-24 border-b-2 border-l-2 border-amber-400/20"></div>
        <div className="hidden md:block absolute bottom-0 right-0 w-16 h-16 lg:w-24 lg:h-24 border-b-2 border-r-2 border-amber-400/20"></div>
      </motion.section>

      {/* بقية المحتوى */}
      <div className="bg-slate-50 py-6 md:py-8 lg:py-12 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 xl:px-8">

          {/* قصة الشركة */}
          <section id="story-section" className="mb-16 md:mb-20 lg:mb-28" aria-labelledby="story-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${isArabic ? 'lg:order-2' : ''}`}
              >
                <div className="mb-6 md:mb-8 lg:mb-10">
                  <span className="text-blue-700 font-semibold text-sm md:text-base lg:text-lg tracking-wider uppercase">{currentContent.story}</span>
                  <h2 id="story-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-3 md:mb-4 lg:mb-6">
                    {language === 'ar' ? 'ثقة تدوم منذ 2014' : 'Trust Since 2014'}
                  </h2>
                  <div className="w-16 h-0.5 md:h-1 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full"></div>
                </div>
                <div className="space-y-4 md:space-y-5 lg:space-y-6 text-slate-700 text-sm md:text-base lg:text-lg leading-6 md:leading-7 lg:leading-8">
                  {storyContent[language].map((paragraph, index) => (
                    <p key={index} className="text-justify md:text-left" itemProp="description">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mt-6 md:mt-8 lg:mt-10 bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-blue-700 to-blue-800 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl text-white mr-3 md:mr-4 lg:mr-5">
                      <span className="text-lg md:text-xl lg:text-2xl">🏆</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base md:text-lg lg:text-xl mb-1 md:mb-2 lg:mb-3">
                        {language === 'ar' ? 'خبرة ممتدة' : 'Extensive Experience'}
                      </h4>
                      <p className="text-slate-600 text-sm md:text-base lg:text-lg">
                        {language === 'ar'
                          ? 'أكثر من عقد من التميز في مجال المقاولات والتطوير العقاري'
                          : 'Over a decade of excellence in contracting and real estate development'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative ${isArabic ? 'lg:order-1' : ''}`}
              >
                <Suspense fallback={
                  <div className="bg-gradient-to-br from-blue-700 to-blue-800 h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-xl md:rounded-2xl lg:rounded-3xl animate-pulse flex items-center justify-center shadow-xl">
                    <div className="text-white text-center">
                      <div className="text-3xl md:text-4xl lg:text-6xl mb-3 md:mb-4">🏗️</div>
                      <div className="h-3 bg-blue-600 rounded w-24 md:w-32 mx-auto"></div>
                    </div>
                  </div>
                }>
                  <div className="relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
                    <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] flex items-center justify-center relative overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                      </div>
                      
                      <div className="text-center p-4 md:p-6 lg:p-8 text-white relative z-10">
                        <div className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl mb-3 md:mb-4 lg:mb-6">🏗️</div>
                        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold mb-2 md:mb-3 lg:mb-4" itemProp="name">
                          {language === 'ar' ? 'شركة موازين الشرق للمقاولات' : 'Mawazin Al-Sharq Contracting Co.'}
                        </h3>
                        <p className="text-blue-200 text-sm md:text-base lg:text-xl" itemProp="address">
                          {language === 'ar' ? 'الرياض - المملكة العربية السعودية' : 'Riyadh - Saudi Arabia'}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 md:p-6 lg:p-8">
                      <div className="text-white">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold">150+</p>
                        <p className="text-blue-200 text-sm md:text-base lg:text-lg">
                          {language === 'ar' ? 'مشروع مكتمل' : 'Completed Projects'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Suspense>
              </motion.div>
            </div>
          </section>

          {/* الرؤية والرسالة */}
          <section className="mb-16 md:mb-20 lg:mb-28" aria-labelledby="vision-mission-heading">
            <h2 id="vision-mission-heading" className="sr-only">
              {language === 'ar' ? 'الرؤية والرسالة' : 'Vision and Mission'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
                tabIndex={0}
              >
                <div className="flex items-center mb-4 md:mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl text-white mr-3 md:mr-4 lg:mr-5 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-lg md:text-xl lg:text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">
                    {currentContent.vision}
                  </h3>
                </div>
                <p className="text-slate-700 text-sm md:text-base lg:text-lg leading-6 md:leading-8 lg:leading-9 border-l-2 md:border-l-4 border-blue-700 pl-3 md:pl-4 lg:pl-6" itemProp="description">
                  {visionContent[language]}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
                tabIndex={0}
              >
                <div className="flex items-center mb-4 md:mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl text-white mr-3 md:mr-4 lg:mr-5 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-lg md:text-xl lg:text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">
                    {currentContent.mission}
                  </h3>
                </div>
                <p className="text-slate-700 text-sm md:text-base lg:text-lg leading-6 md:leading-8 lg:leading-9 border-l-2 md:border-l-4 border-amber-600 pl-3 md:pl-4 lg:pl-6" itemProp="description">
                  {missionContent[language]}
                </p>
              </motion.div>
            </div>
          </section>

          {/* القيم */}
          <section className="mb-16 md:mb-20 lg:mb-28" aria-labelledby="values-heading">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-10 md:mb-12 lg:mb-16"
            >
              <h2 id="values-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 md:mb-4 lg:mb-5">
                {currentContent.values}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl md:max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6 px-2">
                {currentContent.valuesDesc}
              </p>
              <div className="w-16 h-0.5 md:h-1 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full mx-auto"></div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                  className="bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-slate-200 group"
                  tabIndex={0}
                >
                  <div className={`bg-gradient-to-br ${value.color} p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl inline-flex mb-3 md:mb-5 lg:mb-7 group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                    <ValueIcon icon={value.icon} className="text-2xl md:text-3xl lg:text-4xl text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 mb-2 md:mb-3 lg:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm lg:text-base leading-5 md:leading-6 lg:leading-7">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* الإحصائيات */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl md:shadow-2xl relative overflow-hidden mb-16 md:mb-20 lg:mb-28 w-full"
            aria-labelledby="stats-heading"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-full -translate-y-12 md:-translate-y-16 translate-x-12 md:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 md:w-60 md:h-60 bg-white/5 rounded-full translate-y-20 md:translate-y-24 -translate-x-16 md:-translate-x-20"></div>

            <div className="relative z-10 w-full">
              <div className="text-center mb-8 md:mb-10 lg:mb-14">
                <h2 id="stats-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 lg:mb-5">
                  {language === 'ar' ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
                </h2>
                <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-2xl md:max-w-3xl mx-auto px-2">
                  {language === 'ar'
                    ? 'أكثر من عقد من البناء والتطوير في المملكة العربية السعودية'
                    : 'Over a decade of building and development in Saudi Arabia'}
                </p>
                <div className="w-16 h-0.5 md:h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mx-auto mt-3 md:mt-4"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-center w-full">
                {[
                  { value: "150+", label: currentContent.stats.projects },
                  { value: "10+", label: currentContent.stats.experience },
                  { value: "2014", label: currentContent.stats.since },
                  { value: "2030", label: currentContent.stats.contribution }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={statsVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="p-3 md:p-4 lg:p-5"
                  >
                    <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 lg:mb-3 bg-gradient-to-br from-amber-400 to-amber-500 bg-clip-text text-transparent" aria-label={stat.value}>
                      {stat.value}
                    </div>
                    <div className="text-slate-300 text-xs md:text-sm lg:text-base xl:text-lg font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* قسم رؤية 2030 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12 md:mb-16 lg:mb-20 w-full"
            aria-labelledby="vision-2030-heading"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl relative overflow-hidden w-full">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="max-w-3xl md:max-w-4xl mx-auto text-center relative z-10 w-full">
                <h3 id="vision-2030-heading" className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 md:mb-6 lg:mb-8">
                  {language === 'ar' ? 'رؤية المملكة 2030' : 'Kingdom Vision 2030'}
                </h3>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-6 md:leading-7 lg:leading-8 xl:leading-9 text-green-100 mb-6 md:mb-8 lg:mb-10 px-2">
                  {language === 'ar'
                    ? 'نفخر بأن نكون جزءًا من نهضة العمران في المملكة، ونسهم في تحقيق مستهدفات رؤية 2030 عبر تقديم حلول إنشائية مبتكرة تسهم في تحسين جودة الحياة، وبناء مستقبل أكثر استدامة وجمالًا.'
                    : 'We are proud to be part of the urban renaissance in the Kingdom, contributing to the achievement of Vision 2030 goals by providing innovative construction solutions that improve quality of life and build a more sustainable and beautiful future.'}
                </p>
                <div className="inline-flex items-center bg-white/20 px-3 md:px-4 lg:px-5 py-1 md:py-2 rounded-full backdrop-blur-sm border border-white/30">
                  <span className="text-green-100 font-semibold text-xs md:text-sm lg:text-base">
                    {language === 'ar' ? 'شركاء في النجاح' : 'Partners in Success'}
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(About);