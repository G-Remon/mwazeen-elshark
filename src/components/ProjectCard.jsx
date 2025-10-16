import React, { memo, useCallback, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Lazy load components
const OptimizedImage = lazy(() => import('./OptimizedImage'));

// Loading placeholder للصورة
const ImagePlaceholder = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
    <div className="text-gray-400 text-center">
      <div className="text-2xl mb-2">🏗️</div>
      <div className="text-sm">جاري التحميل...</div>
    </div>
  </div>
);

const ProjectCard = memo(({ project, currency = 'ريال', loading = 'lazy' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // استخدام useCallback لمعالجة الأحداث
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    setImageError(true);
    e.target.src = '/assets/projects/default.webp';
    // منع التكرار في حالة فشل الصورة الافتراضية أيضاً
    e.target.onerror = null;
  }, []);

  // تنسيق القيمة المالية
  const formatValue = useCallback((value) => {
    if (!value) return '';
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return value;

    return new Intl.NumberFormat('ar-SA').format(numericValue);
  }, []);

  // الحصول على لون الحالة بناءً على حالة المشروع
  const getStatusColor = useCallback((status) => {
    const statusLower = status?.toLowerCase() || '';

    if (statusLower.includes('مكتمل') || statusLower.includes('completed')) {
      return 'bg-green-500';
    } else if (statusLower.includes('تحت') || statusLower.includes('under') || statusLower.includes('ongoing')) {
      return 'bg-yellow-500';
    } else if (statusLower.includes('مستقبلي') || statusLower.includes('future')) {
      return 'bg-blue-500';
    }
    return 'bg-gray-500';
  }, []);

  // الحصول على نص الحالة
  const getStatusText = useCallback((status) => {
    const statusLower = status?.toLowerCase() || '';

    if (statusLower.includes('مكتمل') || statusLower.includes('completed')) {
      return 'مكتمل';
    } else if (statusLower.includes('تحت') || statusLower.includes('under') || statusLower.includes('ongoing')) {
      return 'تحت الإنشاء';
    } else if (statusLower.includes('مستقبلي') || statusLower.includes('future')) {
      return 'مستقبلي';
    }
    return status || 'قيد التخطيط';
  }, []);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    location: project.location
  };

  return (
    <motion.article
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group focus-within:ring-4 focus-within:ring-blue-200 focus-within:ring-opacity-50"
      whileHover={{
        y: -8,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      itemScope
      itemType="https://schema.org/CreativeWork"
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Suspense fallback={<ImagePlaceholder />}>
          <OptimizedImage
            src={project.image || '/assets/projects/default.webp'}
            alt={`صورة مشروع ${project.title}`}
            width={400}
            height={300}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            loading={loading}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Suspense>

        {!imageLoaded && !imageError && (
          <ImagePlaceholder />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {project.value && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
            >
              {formatValue(project.value)} {currency}
            </motion.span>
          )}

          {project.type && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium border border-white/20"
            >
              {project.type}
            </motion.span>
          )}
        </div>

        {/* Status Badge */}
        {project.status && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4"
          >
            <span className={`${getStatusColor(project.status)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-md`}>
              {getStatusText(project.status)}
            </span>
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <header className="mb-4">
          <h3
            id={`project-title-${project.id}`}
            className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
            itemProp="name"
          >
            {project.title}
          </h3>
          <p
            className="text-gray-600 leading-relaxed line-clamp-3 text-sm md:text-base"
            itemProp="description"
          >
            {project.description}
          </p>
        </header>

        <div className="space-y-3 mb-6">
          {project.location && (
            <div className="flex items-center text-gray-500 text-sm">
              <span className="w-5 h-5 mr-2" role="img" aria-label="الموقع">📍</span>
              <span itemProp="location" className="truncate">{project.location}</span>
            </div>
          )}

          {project.area && (
            <div className="flex items-center text-gray-500 text-sm">
              <span className="w-5 h-5 mr-2" role="img" aria-label="المساحة">📐</span>
              <span>{project.area}</span>
            </div>
          )}

          {project.duration && (
            <div className="flex items-center text-gray-500 text-sm">
              <span className="w-5 h-5 mr-2" role="img" aria-label="المدة">⏱️</span>
              <span>{project.duration}</span>
            </div>
          )}
        </div>

        <footer className="flex justify-between items-center pt-4 border-t border-gray-100">
          {project.client && (
            <div className="text-xs text-gray-500 truncate flex-1 mr-3">
              <span className="font-medium">العميل:</span> {project.client}
            </div>
          )}

          <Link
            to={`/projects/${project.id}`}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50 flex items-center justify-center min-w-[120px] group/btn"
            aria-label={`عرض تفاصيل مشروع ${project.title}`}
            prefetch="intent"
          >
            <span>عرض التفاصيل</span>
            <motion.span
              className="mr-2 group-hover/btn:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            >
              →
            </motion.span>
          </Link>
        </footer>
      </div>
    </motion.article>
  );
});

// Default props للسلامة
ProjectCard.defaultProps = {
  project: {
    id: '',
    title: 'بدون عنوان',
    description: 'لا يوجد وصف',
    image: '/assets/projects/default.webp',
    value: '',
    type: '',
    status: '',
    location: '',
    area: '',
    duration: '',
    client: ''
  },
  currency: 'ريال',
  loading: 'lazy'
};

export default ProjectCard;