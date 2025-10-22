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
      staggerChildren: 0.2,
      duration: 1.2
    }
  }
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
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
      className="min-h-screen bg-white"
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
        className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden"
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
              x: [0, 50, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
          ></motion.div>
          
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/5 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* البادج - الشارة */}
            <motion.div
              variants={headerItemVariants}
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 shadow-lg"
            >
              <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
              <span className="text-white/90 font-medium text-sm tracking-wider">
                {currentContent.badge}
              </span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <motion.h1
              variants={headerItemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              id="about-title"
            >
              <span className="block bg-gradient-to-r from-white via-slate-100 to-amber-100 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </motion.h1>

            {/* العنوان الفرعي */}
            <motion.div
              variants={headerItemVariants}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-200 mb-4">
                {currentContent.subtitle}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mx-auto"></div>
            </motion.div>

            {/* الوصف */}
            <motion.p
              variants={headerItemVariants}
              className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-8"
            >
              {currentContent.description}
            </motion.p>

            {/* أزرار التحريك */}
            <motion.div
              variants={headerItemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 border border-amber-400/30"
              >
                <Link to="/projects" className="flex items-center">
                  {currentContent.discoverProjects}
                </Link>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 shadow-lg transition-all duration-300"
              >
                <Link to="/contact" className="flex items-center">
                  {currentContent.contactUs}
                </Link>
              </motion.button>
            </motion.div>

            {/* مؤشر التمرير */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 cursor-pointer"
              onClick={scrollToNextSection}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/50 rounded-full mt-2"
                ></motion.div>
              </div>
              <p className="text-white/60 text-sm mt-2">
                {currentContent.scrollDown}
              </p>
            </motion.div>
          </div>
        </div>

        {/* زوايا زخرفية */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-amber-400/20"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-amber-400/20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-amber-400/20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-amber-400/20"></div>
      </motion.section>

      {/* بقية المحتوى */}
      <div className="bg-slate-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* قصة الشركة */}
          <section id="story-section" className="mb-20 md:mb-28" aria-labelledby="story-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${isArabic ? 'lg:order-2' : ''}`}
              >
                <div className="mb-8 md:mb-10">
                  <span className="text-blue-700 font-semibold text-base md:text-lg tracking-wider uppercase">{currentContent.story}</span>
                  <h2 id="story-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4 md:mb-6">
                    {language === 'ar' ? 'ثقة تدوم منذ 2014' : 'Trust Since 2014'}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full"></div>
                </div>
                <div className="space-y-5 md:space-y-6 text-slate-700 text-base md:text-lg leading-7 md:leading-8">
                  {storyContent[language].map((paragraph, index) => (
                    <p key={index} className="text-justify" itemProp="description">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mt-8 md:mt-10 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-blue-700 to-blue-800 p-3 md:p-4 rounded-xl text-white mr-4 md:mr-5">
                      <span className="text-xl md:text-2xl">🏆</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg md:text-xl mb-2 md:mb-3">
                        {language === 'ar' ? 'خبرة ممتدة' : 'Extensive Experience'}
                      </h4>
                      <p className="text-slate-600 text-base md:text-lg">
                        {language === 'ar'
                          ? 'أكثر من عقد من التميز في مجال المقاولات والتطوير العقاري'
                          : 'Over a decade of excellence in contracting and real estate development'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative ${isArabic ? 'lg:order-1' : ''}`}
              >
                <Suspense fallback={
                  <div className="bg-gradient-to-br from-blue-700 to-blue-800 h-64 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl animate-pulse flex items-center justify-center shadow-xl">
                    <div className="text-white text-center">
                      <div className="text-4xl md:text-6xl mb-4">🏗️</div>
                      <div className="h-4 bg-blue-600 rounded w-32 mx-auto"></div>
                    </div>
                  </div>
                }>
                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 h-64 md:h-96 lg:h-[500px] flex items-center justify-center relative overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                      </div>
                      
                      <div className="text-center p-6 md:p-8 text-white relative z-10">
                        <div className="text-6xl md:text-8xl mb-4 md:mb-6">🏗️</div>
                        <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4" itemProp="name">
                          {language === 'ar' ? 'شركة موازين الشرق للمقاولات' : 'Mawazin Al-Sharq Contracting Co.'}
                        </h3>
                        <p className="text-blue-200 text-base md:text-xl" itemProp="address">
                          {language === 'ar' ? 'الرياض - المملكة العربية السعودية' : 'Riyadh - Saudi Arabia'}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 md:p-8">
                      <div className="text-white">
                        <p className="text-2xl md:text-3xl font-bold">150+</p>
                        <p className="text-blue-200 text-base md:text-lg">
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
          <section className="mb-20 md:mb-28" aria-labelledby="vision-mission-heading">
            <h2 id="vision-mission-heading" className="sr-only">
              {language === 'ar' ? 'الرؤية والرسالة' : 'Vision and Mission'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
                tabIndex={0}
              >
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-3 md:p-4 rounded-xl text-white mr-4 md:mr-5 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl md:text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                    {currentContent.vision}
                  </h3>
                </div>
                <p className="text-slate-700 text-lg md:text-xl leading-8 md:leading-9 border-l-4 border-blue-700 pl-4 md:pl-6" itemProp="description">
                  {visionContent[language]}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
                tabIndex={0}
              >
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-3 md:p-4 rounded-xl text-white mr-4 md:mr-5 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl md:text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                    {currentContent.mission}
                  </h3>
                </div>
                <p className="text-slate-700 text-lg md:text-xl leading-8 md:leading-9 border-l-4 border-amber-600 pl-4 md:pl-6" itemProp="description">
                  {missionContent[language]}
                </p>
              </motion.div>
            </div>
          </section>

          {/* القيم */}
          <section className="mb-20 md:mb-28" aria-labelledby="values-heading">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-14 md:mb-16"
            >
              <h2 id="values-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-5">
                {currentContent.values}
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-6">
                {currentContent.valuesDesc}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full mx-auto"></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-slate-200 group"
                  tabIndex={0}
                >
                  <div className={`bg-gradient-to-br ${value.color} p-4 md:p-5 rounded-2xl inline-flex mb-5 md:mb-7 group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                    <ValueIcon icon={value.icon} className="text-3xl md:text-4xl text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-5">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg leading-7 md:leading-8">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* الإحصائيات */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden mb-20 md:mb-28"
            aria-labelledby="stats-heading"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 md:w-80 md:h-80 bg-white/5 rounded-full translate-y-32 md:translate-y-40 -translate-x-32 md:-translate-x-40"></div>

            <div className="relative z-10">
              <div className="text-center mb-10 md:mb-14">
                <h2 id="stats-heading" className="text-3xl md:text-4xl font-bold mb-4 md:mb-5">
                  {language === 'ar' ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
                  {language === 'ar'
                    ? 'أكثر من عقد من البناء والتطوير في المملكة العربية السعودية'
                    : 'Over a decade of building and development in Saudi Arabia'}
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 text-center">
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
                    className="p-4 md:p-5"
                  >
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 bg-gradient-to-br from-amber-400 to-amber-500 bg-clip-text text-transparent" aria-label={stat.value}>
                      {stat.value}
                    </div>
                    <div className="text-slate-300 text-base md:text-lg lg:text-xl font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* قسم رؤية 2030 */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16 md:mb-20"
            aria-labelledby="vision-2030-heading"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <h3 id="vision-2030-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
                  {language === 'ar' ? 'رؤية المملكة 2030' : 'Kingdom Vision 2030'}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl leading-8 md:leading-9 text-green-100 mb-8 md:mb-10">
                  {language === 'ar'
                    ? 'نفخر بأن نكون جزءًا من نهضة العمران في المملكة، ونسهم في تحقيق مستهدفات رؤية 2030 عبر تقديم حلول إنشائية مبتكرة تسهم في تحسين جودة الحياة، وبناء مستقبل أكثر استدامة وجمالًا.'
                    : 'We are proud to be part of the urban renaissance in the Kingdom, contributing to the achievement of Vision 2030 goals by providing innovative construction solutions that improve quality of life and build a more sustainable and beautiful future.'}
                </p>
                <div className="inline-flex items-center bg-white/20 px-4 md:px-5 py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/30">
                  <span className="text-green-100 font-semibold text-base md:text-lg">
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