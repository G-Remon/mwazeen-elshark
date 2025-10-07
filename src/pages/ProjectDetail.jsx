import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      breadcrumb: {
        home: "الرئيسية",
        projects: "المشاريع"
      },
      status: {
        completed: "مكتمل"
      },
      overview: "نظرة عامة على المشروع",
      scope: "نطاق العمل",
      gallery: "معرض الصور",
      achievements: "إنجازات المشروع",
      interested: "مهتم بمشاريع مماثلة؟",
      contactDesc: "دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع.",
      contactBtn: "ابدأ المحادثة",
      view: "منظر"
    },
    en: {
      breadcrumb: {
        home: "Home",
        projects: "Projects"
      },
      status: {
        completed: "Completed"
      },
      overview: "Project Overview",
      scope: "Scope of Work",
      gallery: "Photo Gallery",
      achievements: "Project Achievements",
      interested: "Interested in Similar Projects?",
      contactDesc: "Let's discuss how we can turn your vision into reality.",
      contactBtn: "Start Conversation",
      view: "View"
    }
  };

  // بيانات المشروع متعددة اللغات
  const projectData = {
    id: 1,
    title: {
      ar: 'مسجد خادم الحرمين الشريفين الملك عبدالله بن عبدالعزيز آل سعود',
      en: 'Custodian of the Two Holy Mosques King Abdullah bin Abdulaziz Al Saud Mosque'
    },
    value: '1,500,000',
    description: {
      ar: 'أعمال مدنية وتشطيبات بقيمة 1.5 مليون ريال',
      en: 'Civil works and finishing works worth 1.5 million Riyals'
    },
    fullDescription: {
      ar: `مشروع مسجد خادم الحرمين الشريفين يمثل إنجازًا بارزًا في مجال بناء المساجد، حيث تم تنفيذ أعمال مدنية متكاملة وتشطيبات عالية الجودة.

يشمل المشروع:
- أعمال الهيكل الخرساني المتكامل
- تشطيبات الرخام والجرانيت
- أعمال الكهرباء والإنارة المتطورة
- نظام تكييف مركزي
- أعمال السباكة والصرف الصحي
- تشطيبات الخشب والألمنيوم

تم الانتهاء من المشروع ضمن الجدول الزمني المحدد وبأعلى معايير الجودة.`,
      en: `The Custodian of the Two Holy Mosques Mosque project represents an outstanding achievement in mosque construction, with comprehensive civil works and high-quality finishes.

The project includes:
- Integrated concrete structure works
- Marble and granite finishes
- Advanced electrical and lighting works
- Central air conditioning system
- Plumbing and sanitary works
- Wood and aluminum finishes

The project was completed within the specified timeline and with the highest quality standards.`
    },
    location: {
      ar: 'الرياض، المملكة العربية السعودية',
      en: 'Riyadh, Saudi Arabia'
    },
    type: {
      ar: 'مساجد',
      en: 'Mosques'
    },
    timeline: {
      ar: '12 شهر',
      en: '12 months'
    },
    status: {
      ar: 'مكتمل',
      en: 'Completed'
    },
    scope: {
      ar: [
        'أعمال الحفر والتأسيس',
        'الهيكل الخرساني المسلح',
        'أعمال البناء والطوب',
        'أعمال التشطيبات الداخلية',
        'أعمال الكهرباء والإنارة',
        'أعمال السباكة والصرف الصحي',
        'أعمال التكييف المركزي',
        'أعمال الرخام والجرانيت'
      ],
      en: [
        'Excavation and foundation works',
        'Reinforced concrete structure',
        'Construction and masonry works',
        'Internal finishing works',
        'Electrical and lighting works',
        'Plumbing and sanitary works',
        'Central air conditioning works',
        'Marble and granite works'
      ]
    },
    achievements: {
      ar: [
        'التسليم قبل الموعد المحدد',
        'تحقيق أعلى معايير الجودة',
        'الالتزام الكامل بالمواصفات',
        'تفوق في الأداء والتنفيذ'
      ],
      en: [
        'Delivery ahead of schedule',
        'Achieving highest quality standards',
        'Full compliance with specifications',
        'Excellence in performance and execution'
      ]
    },
    images: [
      '/assets/projects/mosque1-1.jpg',
      '/assets/projects/mosque1-2.jpg',
      '/assets/projects/mosque1-3.jpg'
    ]
  };

  const currentContent = content[language];
  const project = {
    ...projectData,
    title: projectData.title[language],
    description: projectData.description[language],
    fullDescription: projectData.fullDescription[language],
    location: projectData.location[language],
    type: projectData.type[language],
    timeline: projectData.timeline[language],
    status: projectData.status[language],
    scope: projectData.scope[language],
    achievements: projectData.achievements[language]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* مسار التنقل */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className={`flex items-center space-x-4 ${isArabic ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                {currentContent.breadcrumb.home}
              </Link>
            </li>
            <li>
              <svg 
                className={`flex-shrink-0 h-5 w-5 text-gray-400 ${isArabic ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link to="/projects" className="text-gray-500 hover:text-gray-700">
                {currentContent.breadcrumb.projects}
              </Link>
            </li>
            <li>
              <svg 
                className={`flex-shrink-0 h-5 w-5 text-gray-400 ${isArabic ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-gray-700 font-medium line-clamp-1 max-w-xs">
                {project.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* قسم الصورة الرئيسية والمعلومات */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-6 ${isArabic ? 'left-6' : 'right-6'} bg-accent text-primary px-4 py-2 rounded-full font-bold text-lg`}>
                {project.value} {isArabic ? 'ريال' : 'SAR'}
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {project.type}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {project.status}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {project.timeline}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {project.description}
              </p>
              <div className={`flex items-center text-gray-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <svg 
                  className={`h-5 w-5 ${isArabic ? 'ml-2' : 'mr-2'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </div>
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* نظرة عامة */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentContent.overview}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {project.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* نطاق العمل */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentContent.scope}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.scope.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start p-4 bg-white rounded-lg shadow-sm border-r-4 border-primary ${isArabic ? 'border-r-0 border-l-4' : ''}`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1"
                         style={{ marginRight: isArabic ? '0.75rem' : '0', marginLeft: isArabic ? '0' : '0.75rem' }}>
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* معرض الصور */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentContent.gallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gray-200 h-64 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${project.title} - ${currentContent.view} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* إنجازات المشروع */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {currentContent.achievements}
              </h3>
              <div className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className={`h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 ${isArabic ? 'ml-2' : 'mr-2'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* دعوة للاتصال */}
            <div className="bg-primary text-white rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-3">
                {currentContent.interested}
              </h3>
              <p className="text-blue-100 mb-4 text-sm">
                {currentContent.contactDesc}
              </p>
              <Link
                to="/contact"
                className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 inline-block"
              >
                {currentContent.contactBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;