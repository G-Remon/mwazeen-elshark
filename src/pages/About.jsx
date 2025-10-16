import React, { useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
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
    }
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
    }
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
    icon: '🏆'
  },
  {
    title: { ar: 'المصداقية', en: 'Credibility' },
    description: {
      ar: 'الشفافية والنزاهة في جميع تعاملاتنا وعلاقاتنا',
      en: 'Transparency and integrity in all our dealings and relationships'
    },
    icon: '🤝'
  },
  {
    title: { ar: 'الالتزام', en: 'Commitment' },
    description: {
      ar: 'التسليم في الوقت المحدد مع الحفاظ على أعلى معايير الجودة والسلامة',
      en: 'On-time delivery while maintaining the highest standards of quality and safety'
    },
    icon: '⏱️'
  },
  {
    title: { ar: 'التطوير المستمر', en: 'Continuous Development' },
    description: {
      ar: 'نسعى دائمًا للتطوير والابتكار في حلولنا الإنشائية',
      en: 'We always strive for development and innovation in our construction solutions'
    },
    icon: '🚀'
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

// Loading component للـ Suspense
const SectionPlaceholder = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-16 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
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
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* الهيدر الرئيسي */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 md:mb-20 pt-4 md:pt-8"
          role="banner"
          aria-labelledby="about-title"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4"
            itemProp="legalName"
          >
            {currentContent.subtitle}
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
            id="about-title"
            itemProp="name"
          >
            {currentContent.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            itemProp="description"
          >
            {currentContent.description}
          </motion.p>
        </motion.section>

        {/* قصة الشركة */}
        <section className="mb-16 md:mb-24" aria-labelledby="story-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`${isArabic ? 'lg:order-2' : ''}`}
            >
              <div className="mb-6 md:mb-8">
                <span className="text-blue-600 font-semibold text-base md:text-lg">{currentContent.story}</span>
                <h2 id="story-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 md:mb-6">
                  {language === 'ar' ? 'ثقة تدوم منذ 2014' : 'Trust Since 2014'}
                </h2>
              </div>
              <div className="space-y-4 md:space-y-6 text-gray-700 text-base md:text-lg leading-7 md:leading-8">
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
                className="mt-8 md:mt-10 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-md border border-gray-100"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                    <span className="text-xl md:text-2xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1 md:mb-2">
                      {language === 'ar' ? 'خبرة ممتدة' : 'Extensive Experience'}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
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
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-64 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl animate-pulse flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl md:text-6xl mb-4">🏗️</div>
                    <div className="h-4 bg-blue-500 rounded w-32 mx-auto"></div>
                  </div>
                </div>
              }>
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-64 md:h-96 lg:h-[500px] flex items-center justify-center">
                    <div className="text-center p-6 md:p-8 text-white">
                      <div className="text-6xl md:text-8xl mb-4 md:mb-6">🏗️</div>
                      <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4" itemProp="name">
                        {language === 'ar' ? 'شركة موازين الشرق للمقاولات' : 'Mawazin Al-Sharq Contracting Co.'}
                      </h3>
                      <p className="text-blue-100 text-sm md:text-lg" itemProp="address">
                        {language === 'ar' ? 'الرياض - المملكة العربية السعودية' : 'Riyadh - Saudi Arabia'}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                    <div className="text-white">
                      <p className="text-lg md:text-xl font-bold">150+</p>
                      <p className="text-blue-200 text-sm md:text-base">
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
        <section className="mb-16 md:mb-24" aria-labelledby="vision-mission-heading">
          <h2 id="vision-mission-heading" className="sr-only">
            {language === 'ar' ? 'الرؤية والرسالة' : 'Vision and Mission'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-100"
              tabIndex={0}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="bg-blue-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                  <span className="text-xl md:text-2xl text-blue-600">🎯</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {currentContent.vision}
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-7 md:leading-8" itemProp="description">
                {visionContent[language]}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-green-100"
              tabIndex={0}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="bg-green-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                  <span className="text-xl md:text-2xl text-green-600">🚀</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {currentContent.mission}
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-7 md:leading-8" itemProp="description">
                {missionContent[language]}
              </p>
            </motion.div>
          </div>
        </section>

        {/* القيم */}
        <section className="mb-16 md:mb-24" aria-labelledby="values-heading">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 id="values-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              {currentContent.values}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.valuesDesc}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white p-6 rounded-xl md:rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group focus-within:ring-4 focus-within:ring-blue-100"
                tabIndex={0}
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 md:p-4 rounded-xl md:rounded-2xl inline-flex mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-300">
                  <ValueIcon icon={value.icon} className="text-3xl md:text-4xl" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
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
          className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          aria-labelledby="stats-heading"
        >
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 md:w-80 md:h-80 bg-white/5 rounded-full translate-y-32 md:translate-y-40 -translate-x-32 md:-translate-x-40"></div>

          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2 id="stats-heading" className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                {language === 'ar' ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
              </h2>
              <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'أكثر من عقد من البناء والتطوير في المملكة العربية السعودية'
                  : 'Over a decade of building and development in Saudi Arabia'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 text-center">
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
                  className="p-3 md:p-4"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2" aria-label={stat.value}>
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm md:text-base lg:text-lg font-medium">{stat.label}</div>
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
          className="mt-12 md:mt-20 text-center"
          aria-labelledby="vision-2030-heading"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 md:p-12 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h3 id="vision-2030-heading" className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
                {language === 'ar' ? 'رؤية المملكة 2030' : 'Kingdom Vision 2030'}
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-7 md:leading-8 text-green-100 mb-6 md:mb-8">
                {language === 'ar'
                  ? 'نفخر بأن نكون جزءًا من نهضة العمران في المملكة، ونسهم في تحقيق مستهدفات رؤية 2030 عبر تقديم حلول إنشائية مبتكرة تسهم في تحسين جودة الحياة، وبناء مستقبل أكثر استدامة وجمالًا.'
                  : 'We are proud to be part of the urban renaissance in the Kingdom, contributing to the achievement of Vision 2030 goals by providing innovative construction solutions that improve quality of life and build a more sustainable and beautiful future.'}
              </p>
              <div className="inline-flex items-center bg-white/20 px-3 md:px-4 py-1 md:py-2 rounded-full">
                <span className="text-green-200 font-medium text-sm md:text-base">
                  {language === 'ar' ? 'شركاء في النجاح' : 'Partners in Success'}
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default memo(About);