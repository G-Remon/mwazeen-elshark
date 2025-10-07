import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      title: "مشاريعنا",
      description: "استكشف محفظة مشاريعنا الاستثنائية التي تعكس التزامنا بالجودة والابتكار ورضا العملاء.",
      noProjects: "لا توجد مشاريع",
      noProjectsDesc: "لا توجد مشاريع في هذا القسم في الوقت الحالي.",
      stats: {
        completed: "مشروع مكتمل",
        units: "وحدة سكنية",
        cities: "مدن",
        delivery: "تسليم في الوقت"
      },
      filters: [
        { key: 'all', label: 'جميع المشاريع' },
        { key: 'مساجد', label: 'المساجد' },
        { key: 'سكني', label: 'سكني' },
        { key: 'تجاري', label: 'تجاري' }
      ]
    },
    en: {
      title: "Our Projects",
      description: "Explore our exceptional project portfolio that reflects our commitment to quality, innovation, and customer satisfaction.",
      noProjects: "No Projects",
      noProjectsDesc: "There are no projects in this category at the moment.",
      stats: {
        completed: "Completed Projects",
        units: "Residential Units",
        cities: "Cities",
        delivery: "On-Time Delivery"
      },
      filters: [
        { key: 'all', label: 'All Projects' },
        { key: 'مساجد', label: 'Mosques' },
        { key: 'سكني', label: 'Residential' },
        { key: 'تجاري', label: 'Commercial' }
      ]
    }
  };

  // مشاريع متعددة اللغات
  const projects = [
    {
      id: 1,
      title: {
        ar: 'مسجد خادم الحرمين الشريفين الملك عبدالله',
        en: 'Custodian of the Two Holy Mosques King Abdullah Mosque'
      },
      value: '1.5M',
      description: {
        ar: 'أعمال مدنية وتشطيبات بقيمة 1.5 مليون ريال',
        en: 'Civil works and finishing works worth 1.5 million Riyals'
      },
      location: {
        ar: 'الرياض',
        en: 'Riyadh'
      },
      type: 'مساجد',
      image: '/assets/projects/mosque1.jpg'
    },
    {
      id: 2,
      title: {
        ar: 'مسجد الجوهرة – البابطين',
        en: 'Al-Jawhara Mosque - Al-Babtain'
      },
      value: '950K',
      description: {
        ar: 'أعمال الكتروميكانيك بقيمة 950 الف ريال',
        en: 'Electromechanical works worth 950 thousand Riyals'
      },
      location: {
        ar: 'الرياض - طريق الملك فهد',
        en: 'Riyadh - King Fahd Road'
      },
      type: 'مساجد',
      image: '/assets/projects/mosque2.jpg'
    },
    {
      id: 3,
      title: {
        ar: 'تأهيل مسجد الكلية التقنية',
        en: 'Technical College Mosque Renovation'
      },
      value: '900K',
      description: {
        ar: 'أعمال مدنية وتشطيبات ورخام بقيمة 900 الف ريال',
        en: 'Civil works, finishing works and marble worth 900 thousand Riyals'
      },
      location: {
        ar: 'الرياض',
        en: 'Riyadh'
      },
      type: 'مساجد',
      image: '/assets/projects/mosque3.jpg'
    },
    {
      id: 4,
      title: {
        ar: 'عمائر سكنية 7 أدوار – مرسية',
        en: '7-Story Residential Buildings - Murcia'
      },
      value: '6M',
      description: {
        ar: 'أعمال عظم بقيمة 6 مليون ريال',
        en: 'Structural works worth 6 million Riyals'
      },
      location: {
        ar: 'شمال الرياض',
        en: 'North Riyadh'
      },
      type: 'سكني',
      image: '/assets/projects/residential1.jpg'
    },
    {
      id: 5,
      title: {
        ar: 'معارض المجلان جنوب الرياض',
        en: 'Al-Majlan Exhibitions - South Riyadh'
      },
      value: '2.5M',
      description: {
        ar: 'أعمال عظم بقيمة 2.5 مليون ريال',
        en: 'Structural works worth 2.5 million Riyals'
      },
      location: {
        ar: 'جنوب الرياض',
        en: 'South Riyadh'
      },
      type: 'تجاري',
      image: '/assets/projects/commercial1.jpg'
    },
    {
      id: 6,
      title: {
        ar: 'إسواز في مجمع المشرقية',
        en: 'Swiss Complex in Al-Mashreqiya'
      },
      value: '3M',
      description: {
        ar: 'تسليم مفتاح بقيمة 3 مليون ريال',
        en: 'Turnkey delivery worth 3 million Riyals'
      },
      location: {
        ar: 'شرق الرياض',
        en: 'East Riyadh'
      },
      type: 'سكني',
      image: '/assets/projects/residential2.jpg'
    },
    {
      id: 7,
      title: {
        ar: 'ضاحية الفرسان 24 فيلا',
        en: 'Al-Fursan Suburb - 24 Villas'
      },
      value: '4.6M',
      description: {
        ar: 'أعمال عظم بالمواد بقيمة 4.6 مليون ريال',
        en: 'Structural works with materials worth 4.6 million Riyals'
      },
      location: {
        ar: 'الرياض',
        en: 'Riyadh'
      },
      type: 'سكني',
      image: '/assets/projects/villas1.jpg'
    },
    {
      id: 8,
      title: {
        ar: 'مشروع التعاون 5 فيلا',
        en: 'Al-Taawun Project - 5 Villas'
      },
      value: '2M',
      description: {
        ar: 'إنشاء 5 فيلات سكنية',
        en: 'Construction of 5 residential villas'
      },
      location: {
        ar: 'الرياض',
        en: 'Riyadh'
      },
      type: 'سكني',
      image: '/assets/projects/villas2.jpg'
    }
  ];

  const currentContent = content[language];

  // تحويل المشاريع إلى اللغة الحالية
  const localizedProjects = projects.map(project => ({
    ...project,
    title: project.title[language],
    description: project.description[language],
    location: project.location[language]
  }));

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return localizedProjects;
    return localizedProjects.filter(project => project.type === filter);
  }, [filter, localizedProjects]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {currentContent.filters.map((filterItem) => (
            <button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filter === filterItem.key
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <ProjectCard 
                project={project} 
                currency={isArabic ? 'ريال' : 'SAR'}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {currentContent.noProjects}
            </h3>
            <p className="text-gray-600">
              {currentContent.noProjectsDesc}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-light rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {projects.length}+
              </div>
              <div className="text-gray-600">{currentContent.stats.completed}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                50+
              </div>
              <div className="text-gray-600">{currentContent.stats.units}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                3+
              </div>
              <div className="text-gray-600">{currentContent.stats.cities}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                100%
              </div>
              <div className="text-gray-600">{currentContent.stats.delivery}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;