import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/ProjectData.js';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';

const ProjectDetail = () => {
  const { id } = useParams();
  const { language, isArabic } = useLanguage();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // استخدام useRef للوصول إلى Swiper instance
  const mainSwiperRef = useRef(null);

  // محتوى متعدد اللغات
  const content = {
    ar: {
      breadcrumb: {
        home: "الرئيسية",
        projects: "المشاريع"
      },
      status: {
        completed: "مكتمل",
        underConstruction: "تحت الإنشاء"
      },
      overview: "نظرة عامة على المشروع",
      scope: "نطاق العمل",
      gallery: "معرض الصور",
      achievements: "إنجازات المشروع",
      interested: "مهتم بمشاريع مماثلة؟",
      contactDesc: "دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع.",
      contactBtn: "ابدأ المحادثة",
      view: "منظر",
      imageCount: "صورة {current} من {total}",
      notFound: "المشروع غير موجود",
      notFoundDesc: "عذراً، لم يتم العثور على المشروع المطلوب."
    },
    en: {
      breadcrumb: {
        home: "Home",
        projects: "Projects"
      },
      status: {
        completed: "Completed",
        underConstruction: "Under Construction"
      },
      overview: "Project Overview",
      scope: "Scope of Work",
      gallery: "Photo Gallery",
      achievements: "Project Achievements",
      interested: "Interested in Similar Projects?",
      contactDesc: "Let's discuss how we can turn your vision into reality.",
      contactBtn: "Start Conversation",
      view: "View",
      imageCount: "Image {current} of {total}",
      notFound: "Project Not Found",
      notFoundDesc: "Sorry, the requested project was not found."
    }
  };

  // البحث عن المشروع بناءً على الـ ID
  const projectData = projectsData.find(project => project.id === parseInt(id));

  const currentContent = content[language];

  // إذا لم يتم العثور على المشروع
  if (!projectData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-12 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🏗️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentContent.notFound}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {currentContent.notFoundDesc}
          </p>
          <Link
            to="/projects"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
          >
            {currentContent.breadcrumb.projects}
          </Link>
        </div>
      </motion.div>
    );
  }

  // تحويل بيانات المشروع إلى اللغة الحالية
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
    achievements: projectData.achievements[language],
    images: projectData.images.map(img => ({
      src: img.src,
      alt: img.alt[language]
    }))
  };

  // وظائف التنقل المخصصة
  const goNext = () => {
    if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
      mainSwiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
      mainSwiperRef.current.swiper.slidePrev();
    }
  };

  // Custom navigation buttons component
  const NavigationButtons = () => (
    <div className={`absolute inset-y-0 w-full flex items-center justify-between pointer-events-none z-10 px-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <button
        onClick={goPrev}
        className={`swiper-button-prev-custom bg-white/90 hover:bg-white text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 pointer-events-auto ${isArabic ? 'rotate-180' : ''}`}
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className={`swiper-button-next-custom bg-white/90 hover:bg-white text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 pointer-events-auto ${isArabic ? 'rotate-180' : ''}`}
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  // تحديد لون الحالة
  const getStatusColor = (status) => {
    if (status === currentContent.status.completed || status === 'مكتمل') {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-orange-100 text-orange-800';
    }
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
              <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
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
              <Link to="/projects" className="text-gray-500 hover:text-gray-700 transition-colors">
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

        {/* معرض الصور المحسن */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Main Image Slider */}
            <div className="relative">
              <Swiper
                ref={mainSwiperRef}
                modules={[Navigation, Thumbs, Autoplay]}
                thumbs={{ swiper: thumbsSwiper }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={600}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="project-main-swiper"
              >
                {project.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-96 md:h-[500px] lg:h-[600px] bg-gray-100">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      
                      {/* Image Counter */}
                      <div className={`absolute top-6 ${isArabic ? 'right-6' : 'left-6'} bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm`}>
                        {currentContent.imageCount
                          .replace('{current}', (activeIndex + 1).toString())
                          .replace('{total}', project.images.length.toString())}
                      </div>
                      
                      {/* Image Alt Text */}
                      <div className={`absolute bottom-6 ${isArabic ? 'right-6' : 'left-6'} bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm max-w-md`}>
                        <p className="text-sm font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <NavigationButtons />

              {/* Project Value Badge */}
              <div className={`absolute top-6 ${isArabic ? 'left-6' : 'right-6'} bg-accent text-primary px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10`}>
                {project.value} {isArabic ? 'ريال' : 'SAR'}
              </div>
            </div>

            {/* Thumbnail Slider */}
            {project.images.length > 1 && (
              <div className="p-4 border-t border-gray-100">
                <Swiper
                  modules={[Navigation, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  watchSlidesProgress
                  spaceBetween={12}
                  slidesPerView={4}
                  freeMode={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 3,
                      spaceBetween: 8,
                    },
                    640: {
                      slidesPerView: 4,
                      spaceBetween: 12,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 16,
                    },
                  }}
                  className="project-thumbs-swiper"
                >
                  {project.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          activeIndex === index ? 'border-primary scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        onClick={() => mainSwiperRef.current.swiper.slideTo(index)}
                      >
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        {activeIndex === index && (
                          <div className="absolute inset-0 bg-primary/20 rounded-lg"></div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Project Info Below Gallery */}
            <div className="p-8">
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
                  <p key={index} className="mb-4 leading-relaxed">
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
                    className={`flex items-start p-4 bg-white rounded-lg shadow-sm border-r-4 border-primary hover:shadow-md transition-shadow duration-300 ${isArabic ? 'border-r-0 border-l-4' : ''}`}
                  >
                    <div 
                      className={`flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1 ${
                        isArabic ? 'ml-3' : 'mr-3'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
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
                <ul className="space-y-3">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className={`h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 ${isArabic ? 'ml-3' : 'mr-3'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
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
              <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                {currentContent.contactDesc}
              </p>
              <Link
                to="/contact"
                className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 inline-block transform hover:scale-105"
              >
                {currentContent.contactBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .project-main-swiper {
          border-radius: 1rem 1rem 0 0;
        }
        .project-thumbs-swiper {
          padding: 0.5rem 0;
        }
        .swiper-slide-thumb-active {
          opacity: 1;
        }
        /* Custom navigation button hover effects */
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: white !important;
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectDetail;