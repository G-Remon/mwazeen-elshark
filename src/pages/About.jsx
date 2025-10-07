import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      title: "عن موازين الشرق",
      description: "نبني المستقبل بأكثر من عقدين من التميز في البناء والابتكار.",
      story: "قصتنا",
      vision: "رؤيتنا",
      mission: "رسالتنا",
      values: "قيمنا",
      valuesDesc: "المبادئ التي توجه كل قرار وإجراء نتخذه",
      stats: {
        projects: "مشروع مكتمل",
        experience: "سنة خبرة",
        units: "وحدة سكنية",
        satisfaction: "رضا العملاء"
      }
    },
    en: {
      title: "About Mawazin Al-Sharq",
      description: "Building the future with over two decades of excellence in construction and innovation.",
      story: "Our Story",
      vision: "Our Vision",
      mission: "Our Mission",
      values: "Our Values",
      valuesDesc: "The principles that guide every decision and action we take",
      stats: {
        projects: "Completed Projects",
        experience: "Years Experience",
        units: "Residential Units",
        satisfaction: "Customer Satisfaction"
      }
    }
  };

  // القيم متعددة اللغات
  const valuesData = [
    {
      title: {
        ar: 'الشفافية',
        en: 'Transparency'
      },
      description: {
        ar: 'تتحقيق الشفافية في جميع مراحل إجراءات العمل لتحقيق أقصى درجات الكفاءة',
        en: 'Achieving transparency in all work procedures to achieve maximum efficiency'
      },
      icon: '🔒'
    },
    {
      title: {
        ar: 'المسؤولية',
        en: 'Responsibility'
      },
      description: {
        ar: 'اللوة في تحمل مسئولية القرارات والأفعال الصادرة عنا',
        en: 'The ability to take responsibility for our decisions and actions'
      },
      icon: '⭐'
    },
    {
      title: {
        ar: 'المصداقية',
        en: 'Credibility'
      },
      description: {
        ar: 'الشجاعة على الوفاء بالإثراماتنا دون إستثناء',
        en: 'The courage to fulfill our commitments without exception'
      },
      icon: '💡'
    },
    {
      title: {
        ar: 'النزاهة',
        en: 'Integrity'
      },
      description: {
        ar: 'توفير معاملة عادلة بونمع الموظفين والشركات المحلية والعالمية',
        en: 'Providing fair treatment to employees and local and international companies'
      },
      icon: '🛡️'
    }
  ];

  // النصوص متعددة اللغات
  const storyContent = {
    ar: [
      "نحن في شركة موازين الشرق العقارية تنطلق جميع أعمالنا في مجالات المقاوالت العامة والمباني السكنية واعهال التشطيب من منطلق الجودة في التنفيذ والدقة في المواعيد.",
      "تشرك على هذه المنظومة نخبه شابه سعودية يمتد عملنا بإنشاء أكثر من 50 وحدة سكنيه تم تنفيذها ونتطلع على أن تحوز خدماتنا على رضكم.",
      "ننطلق في جميع أعمالنا من منطلق الجودة في التنفيذ والدقة في المواعيد، ويمتد عملنا بإنشاء أكثر من 50 وحدة سكنية تم تنفيذها."
    ],
    en: [
      "At Mawazin Al-Sharq Real Estate Company, all our work in the fields of general contracting, residential buildings, and finishing works is based on quality in execution and accuracy in timing.",
      "This system relies on a select group of young Saudi professionals. Our work extends to creating more than 50 residential units that have been implemented, and we look forward to earning your satisfaction with our services.",
      "We approach all our work from the standpoint of quality in execution and accuracy in timing, and our work extends to creating more than 50 residential units that have been implemented."
    ]
  };

  const visionContent = {
    ar: "تهدف المجموعة إلى أن تصبح الشركة الرائدة على مستوي شركات قطاع المقاولات في المملكة العربية السعودية.",
    en: "The group aims to become the leading company in the contracting sector in the Kingdom of Saudi Arabia."
  };

  const missionContent = {
    ar: "تسخير مواردنا البشرية والثقنية والماليه وكفائتنا المتخصصة وشراكتنا المحلية لتقديم خدمات ذات جودة وكفاءة عالية في الوقت المحدد.",
    en: "To harness our human, technical, and financial resources, our specialized competencies, and our local partnerships to provide high-quality and efficient services on time."
  };

  const currentContent = content[language];
  const values = valuesData.map(value => ({
    ...value,
    title: value.title[language],
    description: value.description[language]
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        {/* قصة الشركة */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={isArabic ? 'lg:order-2' : ''}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {currentContent.story}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                {storyContent[language].map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`relative ${isArabic ? 'lg:order-1' : ''}`}
            >
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">
                  {language === 'ar' ? 'صورة الشركة' : 'Company Image'}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentContent.vision}
              </h3>
              <p className="text-gray-700">
                {visionContent[language]}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentContent.mission}
              </h3>
              <p className="text-gray-700">
                {missionContent[language]}
              </p>
            </motion.div>
          </div>
        </section>

        {/* القيم */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.values}
            </h2>
            <p className="text-xl text-gray-600">
              {currentContent.valuesDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* الإحصائيات */}
        <section className="bg-primary text-white rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">{currentContent.stats.projects}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-blue-100">{currentContent.stats.experience}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">{currentContent.stats.units}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">{currentContent.stats.satisfaction}</div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default About;