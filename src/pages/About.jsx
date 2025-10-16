import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
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

  // القيم متعددة اللغات
  const valuesData = [
    {
      title: {
        ar: 'الجودة',
        en: 'Quality'
      },
      description: {
        ar: 'معايير الجودة والإتقان في كل تفصيلة من مشاريعنا',
        en: 'Quality standards and mastery in every detail of our projects'
      },
      icon: '🏆'
    },
    {
      title: {
        ar: 'المصداقية',
        en: 'Credibility'
      },
      description: {
        ar: 'الشفافية والنزاهة في جميع تعاملاتنا وعلاقاتنا',
        en: 'Transparency and integrity in all our dealings and relationships'
      },
      icon: '🤝'
    },
    {
      title: {
        ar: 'الالتزام',
        en: 'Commitment'
      },
      description: {
        ar: 'التسليم في الوقت المحدد مع الحفاظ على أعلى معايير الجودة والسلامة',
        en: 'On-time delivery while maintaining the highest standards of quality and safety'
      },
      icon: '⏱️'
    },
    {
      title: {
        ar: 'التطوير المستمر',
        en: 'Continuous Development'
      },
      description: {
        ar: 'نسعى دائمًا للتطوير والابتكار في حلولنا الإنشائية',
        en: 'We always strive for development and innovation in our construction solutions'
      },
      icon: '🚀'
    }
  ];

  // النصوص متعددة اللغات
  const storyContent = {
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
  };

  const visionContent = {
    ar: "أن نكون من أبرز شركات المقاولات في المملكة، من خلال الجمع بين الخبرة الهندسية والابتكار في التنفيذ.",
    en: "To be one of the most prominent contracting companies in the Kingdom, by combining engineering expertise and innovation in execution."
  };

  const missionContent = {
    ar: "تحويل الطموحات إلى واقع ملموس عبر العمل باحترافية عالية، وتسليم المشاريع في الوقت المحدد، مع الحفاظ على أعلى معايير الجودة والسلامة.",
    en: "Transforming ambitions into tangible reality through high professionalism, delivering projects on time, while maintaining the highest standards of quality and safety."
  };

  const currentContent = content[language];
  const values = valuesData.map(value => ({
    ...value,
    title: value.title[language],
    description: value.description[language]
  }));

  // تأثيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الهيدر الرئيسي */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20 pt-8"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4"
          >
            {currentContent.subtitle}
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {currentContent.title}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {currentContent.description}
          </motion.p>
        </motion.section>

        {/* قصة الشركة */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`${isArabic ? 'lg:order-2' : ''}`}
            >
              <div className="mb-8">
                <span className="text-blue-600 font-semibold text-lg">{currentContent.story}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                  {language === 'ar' ? 'ثقة تدوم منذ 2014' : 'Trust Since 2014'}
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 text-lg leading-8">
                {storyContent[language].map((paragraph, index) => (
                  <p key={index} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                      {language === 'ar' ? 'خبرة ممتدة' : 'Extensive Experience'}
                    </h4>
                    <p className="text-gray-600">
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
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`relative ${isArabic ? 'lg:order-1' : ''}`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-96 md:h-[500px] flex items-center justify-center">
                  <div className="text-center p-8 text-white">
                    <div className="text-8xl mb-6">🏗️</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {language === 'ar' ? 'شركة موازين الشرق للمقاولات' : 'Mawazin Al-Sharq Contracting Co.'}
                    </h3>
                    <p className="text-blue-100 text-lg">
                      {language === 'ar' ? 'الرياض - المملكة العربية السعودية' : 'Riyadh - Saudi Arabia'}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <p className="text-xl font-bold">150+</p>
                    <p className="text-blue-200">
                      {language === 'ar' ? 'مشروع مكتمل' : 'Completed Projects'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <span className="text-2xl text-blue-600">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentContent.vision}
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-8">
                {visionContent[language]}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <span className="text-2xl text-green-600">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentContent.mission}
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-8">
                {missionContent[language]}
              </p>
            </motion.div>
          </div>
        </section>

        {/* القيم */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.values}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.valuesDesc}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-2xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-7">
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
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'أكثر من عقد من البناء والتطوير في المملكة العربية السعودية' 
                  : 'Over a decade of building and development in Saudi Arabia'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
                <div className="text-blue-200 text-lg font-medium">{currentContent.stats.projects}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
                <div className="text-blue-200 text-lg font-medium">{currentContent.stats.experience}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">2014</div>
                <div className="text-blue-200 text-lg font-medium">{currentContent.stats.since}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">2030</div>
                <div className="text-blue-200 text-lg font-medium">{currentContent.stats.contribution}</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* قسم رؤية 2030 */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-3xl p-10 md:p-12 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                {language === 'ar' ? 'رؤية المملكة 2030' : 'Kingdom Vision 2030'}
              </h3>
              <p className="text-lg md:text-xl leading-8 text-green-100 mb-8">
                {language === 'ar' 
                  ? 'نفخر بأن نكون جزءًا من نهضة العمران في المملكة، ونسهم في تحقيق مستهدفات رؤية 2030 عبر تقديم حلول إنشائية مبتكرة تسهم في تحسين جودة الحياة، وبناء مستقبل أكثر استدامة وجمالًا.'
                  : 'We are proud to be part of the urban renaissance in the Kingdom, contributing to the achievement of Vision 2030 goals by providing innovative construction solutions that improve quality of life and build a more sustainable and beautiful future.'}
              </p>
              <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                <span className="text-green-200 font-medium">
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

export default About;