import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      hero: {
        title: "بناء التميز",
        subtitle: "في العقارات",
        description: "ننطلق في جميع أعمالنا من منطلق الجودة في التنفيذ والدقة في المواعيد، ويمتد عملنا بإنشاء أكثر من 50 وحدة سكنية تم تنفيذها.",
        projectsBtn: "مشاريعنا",
        contactBtn: "اتصل بنا"
      },
      whyChoose: {
        title: "لماذا تختار موازين الشرق",
        description: "نقدم خدمات بناء استثنائية بنزاهة وابتكار وخبرة لا مثيل لها."
      },
      highlights: [
        {
          title: 'خبرة 20+ سنة',
          description: 'خبرة موثوقة في التطوير العقاري والمقاولات',
          icon: '🏗️'
        },
        {
          title: 'ضمان الجودة',
          description: 'عمليات مراقبة جودة صارمة على جميع المشاريع',
          icon: '⭐'
        },
        {
          title: 'التسليم في الوقت',
          description: 'سجل حافل بتسليم المشاريع في الوقت المحدد',
          icon: '⏱️'
        },
        {
          title: 'مركزية العميل',
          description: 'ملتزمون بتجاوز توقعات العملاء',
          icon: '🤝'
        }
      ],
      featuredProjects: {
        title: "مشاريع مميزة",
        description: "نعرض أحدث وإنجازاتنا البناءة الأكثر روعة",
        viewAll: "عرض جميع المشاريع",
        learnMore: "تعرف أكثر ←"
      },
      projects: [
        {
          id: 1,
          title: 'مسجد خادم الحرمين الشريفين',
          value: '1.5M',
          description: 'أعمال مدنية وتشطيبات بقيمة 1.5 مليون ريال',
          image: '/assets/projects/mosque.jpg'
        },
        {
          id: 2,
          title: 'عمائر سكنية 7 أدوار - مرسية',
          value: '6M',
          description: 'أعمال عظم بقيمة 6 مليون ريال',
          image: '/assets/projects/residential.jpg'
        }
      ],
      cta: {
        title: "مستعد لبدء مشروعك؟",
        description: "دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع بخبرتنا في البناء والتزامنا بالتميز.",
        button: "اتصل بنا اليوم"
      }
    },
    en: {
      hero: {
        title: "Building Excellence",
        subtitle: "in Real Estate",
        description: "We approach all our work from the standpoint of quality in execution and accuracy in timing, and our work extends to creating more than 50 residential units that have been implemented.",
        projectsBtn: "Our Projects",
        contactBtn: "Contact Us"
      },
      whyChoose: {
        title: "Why Choose Mawazin Al-Sharq",
        description: "We provide exceptional construction services with integrity, innovation and unparalleled expertise."
      },
      highlights: [
        {
          title: '20+ Years Experience',
          description: 'Trusted experience in real estate development and contracting',
          icon: '🏗️'
        },
        {
          title: 'Quality Assurance',
          description: 'Strict quality control processes on all projects',
          icon: '⭐'
        },
        {
          title: 'On-Time Delivery',
          description: 'Proven track record of delivering projects on schedule',
          icon: '⏱️'
        },
        {
          title: 'Client-Centric',
          description: 'Committed to exceeding customer expectations',
          icon: '🤝'
        }
      ],
      featuredProjects: {
        title: "Featured Projects",
        description: "Showcasing our latest and most impressive construction achievements",
        viewAll: "View All Projects",
        learnMore: "Learn More →"
      },
      projects: [
        {
          id: 1,
          title: 'Custodian of the Two Holy Mosques Mosque',
          value: '1.5M',
          description: 'Civil works and finishing works worth 1.5 million Riyals',
          image: '/assets/projects/mosque.jpg'
        },
        {
          id: 2,
          title: '7-Story Residential Buildings - Murcia',
          value: '6M',
          description: 'Structural works worth 6 million Riyals',
          image: '/assets/projects/residential.jpg'
        }
      ],
      cta: {
        title: "Ready to Start Your Project?",
        description: "Let's discuss how we can turn your vision into reality with our construction expertise and commitment to excellence.",
        button: "Contact Us Today"
      }
    }
  };

  const currentContent = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* قسم الهيرو */}
      <section className="bg-gradient-to-l from-primary to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentContent.hero.title}
              <br />
              <span className="text-accent">{currentContent.hero.subtitle}</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentContent.hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/projects"
                className="bg-accent text-primary px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 text-lg"
              >
                {currentContent.hero.projectsBtn}
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200 text-lg"
              >
                {currentContent.hero.contactBtn}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* قسم لماذا تختارنا */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.whyChoose.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.whyChoose.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المشاريع المميزة */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.featuredProjects.title}
            </h2>
            <p className="text-xl text-gray-600">
              {currentContent.featuredProjects.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {currentContent.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gray-200 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} bg-accent text-primary px-3 py-1 rounded-full font-semibold`}>
                    {project.value} {isArabic ? 'ريال' : 'SAR'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-primary font-semibold hover:text-blue-800 transition-colors duration-200"
                  >
                    {currentContent.featuredProjects.learnMore}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/projects"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
            >
              {currentContent.featuredProjects.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            {currentContent.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {currentContent.cta.description}
          </p>
          <Link
            to="/contact"
            className="bg-accent text-primary px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 text-lg"
          >
            {currentContent.cta.button}
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;