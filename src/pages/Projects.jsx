import React, { useState, useMemo, useCallback, memo, lazy, Suspense, useEffect } from 'react';
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

// Enhanced Simple Title Card Component for new categories
const SimpleProjectCard = memo(({ title, isArabic, index }) => (
  <div 
    className="
      bg-white
      rounded-xl shadow-md hover:shadow-lg 
      border border-gray-200
      p-6 text-center 
      hover:scale-105 transition-transform duration-300 
      opacity-0 translate-y-6 animate-fade-in-up
      cursor-pointer
    "
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <h3 className={`text-lg font-semibold text-gray-800 ${isArabic ? 'text-right' : 'text-left'}`}>
      {title}
    </h3>
  </div>
));

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { language, isArabic, setLanguage } = useLanguage();

  // Language switch handler with localStorage persistence
  const handleLanguageToggle = useCallback(() => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  }, [language, setLanguage]);

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
        { key: 'ديني', label: 'ديني' },
        { key: 'التطوير العقاري', label: 'التطوير العقاري' },
        { key: 'المقاولات', label: 'المقاولات' }
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
        { key: 'ديني', label: 'Religious' },
        { key: 'التطوير العقاري', label: 'Real Estate Development' },
        { key: 'المقاولات', label: 'Contracting' }
      ]
    }
  }), []);

  const currentContent = content[language];

  // استخدام useCallback لمعالجة تغيير الفلتر
  const handleFilterChange = useCallback((filterKey) => {
    setFilter(filterKey);
  }, []);

  // Static projects for the new categories (title only)
  const newCategoryProjects = useMemo(() => [
    // التطوير العقاري - Real Estate Development
    {
      id: 100,
      title: {
        ar: 'مشروع فلل بحيرة النورس',
        en: 'Falell Lake Seagull Project'
      },
      type: {
        ar: 'التطوير العقاري',
        en: 'Real Estate Development'
      },
      isSimpleCard: true
    },
    {
      id: 101,
      title: {
        ar: 'مشروع فلل حي الجسر',
        en: 'Al-Jisr District Villas Project'
      },
      type: {
        ar: 'التطوير العقاري',
        en: 'Real Estate Development'
      },
      isSimpleCard: true
    },
    {
      id: 102,
      title: {
        ar: 'مشروع فلل حي العزيزية',
        en: 'Al-Aziziyah District Villas Project'
      },
      type: {
        ar: 'التطوير العقاري',
        en: 'Real Estate Development'
      },
      isSimpleCard: true
    },
    {
      id: 103,
      title: {
        ar: 'مشروع فلل حي التحلية',
        en: 'Al-Tahliyah District Villas Project'
      },
      type: {
        ar: 'التطوير العقاري',
        en: 'Real Estate Development'
      },
      isSimpleCard: true
    },
    // المقاولات - Contracting
    {
      id: 200,
      title: {
        ar: 'مشروع انشاء قصر حي الحزام الذهبي',
        en: 'Golden Belt District Palace Construction Project'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    },
    {
      id: 201,
      title: {
        ar: 'مشروع انشاء مجالس حي الراكة',
        en: 'Al-Rakah District Majlis Construction Project'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    },
    {
      id: 202,
      title: {
        ar: 'مشروع عمارة تجارية بالرحبة الخبر',
        en: 'Commercial Building Project in Al-Rahba, Khobar'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    },
    {
      id: 203,
      title: {
        ar: 'مشروع الحمد بالعزيزية',
        en: 'Al-Hamad Project in Al-Aziziyah'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    },
    {
      id: 204,
      title: {
        ar: 'مشروع انشاء فلل حي البحيرة النورس',
        en: 'Villas Construction Project in Al-Buhaira Al-Nours District'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    },
    {
      id: 205,
      title: {
        ar: 'مشروع العتيبي الصواري',
        en: 'Al-Otaibi Al-Sawari Project'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    },
    {
      id: 206,
      title: {
        ar: 'مشروع 2 فيلا حي العقربية',
        en: '2 Villas Project in Al-Uqrabiyah District'
      },
      type: {
        ar: 'المقاولات',
        en: 'Contracting'
      },
      isSimpleCard: true
    }
  ], []);

  // Dynamic import للمشاريع - يتم تحميلها فقط عند الحاجة
  const [localizedProjects, setLocalizedProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  React.useEffect(() => {
    // تحميل بيانات المشاريع بشكل غير متزامن
    import('../data/ProjectData.js')
      .then(({ projectsData }) => {
        const allProjects = [...projectsData, ...newCategoryProjects];
        const processedProjects = allProjects.map(project => {
          if (project.isSimpleCard) {
            // For simple title cards, only process title and type
            return {
              ...project,
              title: project.title[language],
              type: project.type[language]
            };
          } else {
            // For existing projects, process all fields
            return {
              ...project,
              title: project.title[language],
              description: project.description[language],
              location: project.location[language],
              type: project.type[language],
              status: project.status[language],
              image: project.images?.[0]?.src || '/assets/projects/default.webp'
            };
          }
        });
        setLocalizedProjects(processedProjects);
        setProjectsLoaded(true);
      })
      .catch(() => {
        // If import fails, use new category projects only
        const processedProjects = newCategoryProjects.map(project => ({
          ...project,
          title: project.title[language],
          type: project.type[language]
        }));
        setLocalizedProjects(processedProjects);
        setProjectsLoaded(true);
      });
  }, [language, newCategoryProjects]);

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

  // Enhanced Clients data with improved styling
  const clientsData = useMemo(() => [
    {
      name: {
        ar: 'شركة المعمار العربي للمقاولات',
        en: 'Al-Memar Al-Arabi Contracting Company'
      }
    },
    {
      name: {
        ar: 'شركة باني للمقاولات',
        en: 'Bani Contracting Company'
      }
    },
    {
      name: {
        ar: 'شركة بني الخليج',
        en: 'Bani Al-Khaleej Company'
      }
    },
    {
      name: {
        ar: 'شركة عبر للمقاولات',
        en: 'Abir Contracting Company'
      }
    },
    {
      name: {
        ar: 'شركة المحيط الذهبي',
        en: 'Al-Mohit Al-Thahabi Company'
      }
    }
  ], []);

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
      className="min-h-screen bg-white py-8 md:py-12"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(12px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Language Switch Button */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={handleLanguageToggle}
            className="px-3 py-1 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition-colors duration-200 font-medium text-gray-700"
            aria-label={language === 'ar' ? 'Switch to English' : 'التغيير إلى العربية'}
          >
            {language === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>

        {/* Enhanced الهيدر الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
          role="banner"
          aria-labelledby="projects-title"
        >
          <h1
            id="projects-title"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6"
            itemProp="name"
          >
            {currentContent.title}
            <div className="after:block after:w-16 after:h-[3px] after:bg-blue-600 after:mt-2 after:mx-auto"></div>
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
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16"
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

        {/* Enhanced شبكة المشاريع */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24"
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
                {project.isSimpleCard ? (
                  // Enhanced simple title-only card for new categories
                  <SimpleProjectCard 
                    title={project.title} 
                    isArabic={isArabic}
                    index={index}
                  />
                ) : (
                  // Existing detailed project card with link
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
                )}
              </motion.div>
            ))}
          </Suspense>
        </motion.div>

        {/* حالة عدم وجود مشاريع */}
        {projectsLoaded && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 md:py-24"
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


        {/* Enhanced دعوة للاتصال */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16 md:mt-24"
          role="complementary"
          aria-labelledby="cta-heading"
        >
          <h3 id="cta-heading" className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-3 md:mb-4">
            {language === 'ar' ? 'هل لديك مشروع في mind؟' : 'Have a project in mind?'}
            <div className="after:block after:w-16 after:h-[3px] after:bg-blue-600 after:mt-2 after:mx-auto"></div>
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