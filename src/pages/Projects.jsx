import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/ProjectData.js';

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
        ongoing: "مشروع تحت الإنشاء",
        total: "إجمالي المشاريع",
        delivery: "تسليم في الوقت"
      },
      filters: [
        { key: 'all', label: 'جميع المشاريع' },
        { key: 'سكني', label: 'سكني' },
        { key: 'تجاري', label: 'تجاري' },
        { key: 'ديني', label: 'ديني' }
      ]
    },
    en: {
      title: "Our Projects",
      description: "Explore our exceptional project portfolio that reflects our commitment to quality, innovation, and customer satisfaction.",
      noProjects: "No Projects",
      noProjectsDesc: "There are no projects in this category at the moment.",
      stats: {
        completed: "Completed Projects",
        ongoing: "Ongoing Projects",
        total: "Total Projects",
        delivery: "On-Time Delivery"
      },
      filters: [
        { key: 'all', label: 'All Projects' },
        { key: 'سكني', label: 'Residential' },
        { key: 'تجاري', label: 'Commercial' },
        { key: 'ديني', label: 'Religious' }
      ]
    }
  };

  const currentContent = content[language];

  // تحويل المشاريع إلى اللغة الحالية
  const localizedProjects = useMemo(() => {
    return projectsData.map(project => ({
      ...project,
      title: project.title[language],
      description: project.description[language],
      location: project.location[language],
      type: project.type[language],
      status: project.status[language],
      image: project.images?.[0]?.src || '/assets/projects/default.jpg'
    }));
  }, [projectsData, language]);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return localizedProjects;
    return localizedProjects.filter(project => {
      const projectType = project.type?.toLowerCase();
      const filterType = filter.toLowerCase();
      return projectType === filterType;
    });
  }, [filter, localizedProjects]);

  // إحصائيات المشاريع
  const projectStats = useMemo(() => {
    const completed = localizedProjects.filter(project => 
      project.status?.toLowerCase().includes('مكتمل') || 
      project.status?.toLowerCase().includes('completed')
    ).length;
    
    const ongoing = localizedProjects.filter(project => 
      project.status?.toLowerCase().includes('تحت') || 
      project.status?.toLowerCase().includes('under') ||
      project.status?.toLowerCase().includes('ongoing')
    ).length;

    return { completed, ongoing };
  }, [localizedProjects]);

  // تأثيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الهيدر الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>
        </motion.div>

        {/* عوامل التصفية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {currentContent.filters.map((filterItem) => (
            <motion.button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 border-2 ${
                filter === filterItem.key
                  ? 'bg-primary border-primary text-white shadow-lg'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-primary hover:text-primary shadow-md'
              }`}
            >
              {filterItem.label}
            </motion.button>
          ))}
        </motion.div>

        {/* شبكة المشاريع */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link 
                to={`/projects/${project.id}`}
                className="block transition-transform duration-300 hover:scale-105"
              >
                <ProjectCard 
                  project={project} 
                  currency={isArabic ? 'ريال' : 'SAR'}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* حالة عدم وجود مشاريع */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6 opacity-20">🏗️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.noProjects}
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              {currentContent.noProjectsDesc}
            </p>
          </motion.div>
        )}

        {/* إحصائيات المشاريع */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-primary to-blue-800 text-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {localizedProjects.length}
              </div>
              <div className="text-blue-100">{currentContent.stats.total}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {projectStats.completed}
              </div>
              <div className="text-blue-100">{currentContent.stats.completed}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {projectStats.ongoing}
              </div>
              <div className="text-blue-100">{currentContent.stats.ongoing}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                100%
              </div>
              <div className="text-blue-100">{currentContent.stats.delivery}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* دعوة للاتصال */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'هل لديك مشروع في mind؟' : 'Have a project in mind?'}
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            {language === 'ar' 
              ? 'دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع ملموس' 
              : "Let's discuss how we can turn your vision into tangible reality"}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            <span className={`ml-2 transform ${isArabic ? 'rotate-180' : ''}`}>→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;