import React, { useState, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Lazy load components
const ProjectCard = lazy(() => import('../components/ProjectCard'));
const LoadingSpinner = lazy(() => import('../components/LoadingSpinner'));
const OptimizedImage = lazy(() => import('../components/OptimizedImage.jsx'));

// Loading component للـ Suspense
const ProjectCardPlaceholder = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات - محسنة للذاكرة
  const content = useMemo(() => ({
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
  }), []);

  const currentContent = content[language];

  // استخدام useCallback لمعالجة تغيير الفلتر
  const handleFilterChange = useCallback((filterKey) => {
    setFilter(filterKey);
  }, []);

  // Dynamic import للمشاريع - يتم تحميلها فقط عند الحاجة
  const [localizedProjects, setLocalizedProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  React.useEffect(() => {
    // تحميل بيانات المشاريع بشكل غير متزامن
    import('../data/ProjectData.js')
      .then(({ projectsData }) => {
        const processedProjects = projectsData.map(project => ({
          ...project,
          title: project.title[language],
          description: project.description[language],
          location: project.location[language],
          type: project.type[language],
          status: project.status[language],
          image: project.images?.[0]?.src || '/assets/projects/default.webp'
        }));
        setLocalizedProjects(processedProjects);
        setProjectsLoaded(true);
      })
      .catch(() => {
        setProjectsLoaded(true);
      });
  }, [language]);

  // استخدام useMemo للفلترة
  const filteredProjects = useMemo(() => {
    if (!projectsLoaded) return [];

    if (filter === 'all') return localizedProjects;
    return localizedProjects.filter(project => {
      const projectType = project.type?.toLowerCase();
      const filterType = filter.toLowerCase();
      return projectType === filterType;
    });
  }, [filter, localizedProjects, projectsLoaded]);

  // إحصائيات المشاريع - محسنة للأداء
  const projectStats = useMemo(() => {
    if (!projectsLoaded) return { completed: 0, ongoing: 0 };

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
  }, [localizedProjects, projectsLoaded]);

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

  // Structured Data for SEO
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: currentContent.title,
    description: currentContent.description,
    numberOfItems: localizedProjects.length,
    itemListElement: localizedProjects.slice(0, 10).map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        location: project.location
      }
    }))
  }), [currentContent, localizedProjects]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* الهيدر الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
          role="banner"
          aria-labelledby="projects-title"
        >
          <h1
            id="projects-title"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6"
            itemProp="name"
          >
            {currentContent.title}
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            itemProp="description"
          >
            {currentContent.description}
          </p>
        </motion.div>

        {/* عوامل التصفية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
          role="navigation"
          aria-label={language === 'ar' ? 'تصفية المشاريع' : 'Projects Filter'}
        >
          {currentContent.filters.map((filterItem) => (
            <motion.button
              key={filterItem.key}
              onClick={() => handleFilterChange(filterItem.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-200 border-2 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-blue-200 ${filter === filterItem.key
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 shadow-md'
                }`}
              aria-pressed={filter === filterItem.key}
              aria-label={filterItem.label}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
          role="main"
          aria-label={language === 'ar' ? 'قائمة المشاريع' : 'Projects List'}
        >
          <Suspense fallback={
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardPlaceholder key={index} />
            ))
          }>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="block transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-2xl"
                  aria-label={`${language === 'ar' ? 'عرض تفاصيل' : 'View details for'} ${project.title}`}
                  prefetch="intent"
                >
                  <ProjectCard
                    project={project}
                    currency={isArabic ? 'ريال' : 'SAR'}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </Link>
              </motion.div>
            ))}
          </Suspense>
        </motion.div>

        {/* حالة عدم وجود مشاريع */}
        {projectsLoaded && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 md:py-16"
            role="status"
            aria-live="polite"
          >
            <div className="text-6xl md:text-8xl mb-4 md:mb-6 opacity-20">🏗️</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
              {currentContent.noProjects}
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto">
              {currentContent.noProjectsDesc}
            </p>
          </motion.div>
        )}

        {/* إحصائيات المشاريع */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl"
          aria-labelledby="projects-stats-heading"
        >
          <h2 id="projects-stats-heading" className="sr-only">
            {language === 'ar' ? 'إحصائيات المشاريع' : 'Projects Statistics'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            {[
              { value: localizedProjects.length, label: currentContent.stats.total },
              { value: projectStats.completed, label: currentContent.stats.completed },
              { value: projectStats.ongoing, label: currentContent.stats.ongoing },
              { value: "100%", label: currentContent.stats.delivery }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="p-3 md:p-4"
              >
                <div
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2"
                  aria-label={stat.value}
                >
                  {stat.value}
                </div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* دعوة للاتصال */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
          role="complementary"
          aria-labelledby="cta-heading"
        >
          <h3 id="cta-heading" className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {language === 'ar' ? 'هل لديك مشروع في mind؟' : 'Have a project in mind?'}
          </h3>
          <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">
            {language === 'ar'
              ? 'دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع ملموس'
              : "Let's discuss how we can turn your vision into tangible reality"}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm md:text-base"
            aria-label={language === 'ar' ? 'الاتصال بنا' : 'Contact Us'}
            prefetch="intent"
          >
            {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            <span className={`mr-2 transform ${isArabic ? 'rotate-180' : ''}`} aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(Projects);