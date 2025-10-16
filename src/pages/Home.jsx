import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/ProjectData.js';

// SVG Icons Component
const HomeIcons = {
  Construction: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Quality: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Client: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Phone: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Arrow: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Location: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

// Content object for translations
const homeContent = {
  ar: {
    hero: {
      title: "بناء التميز",
      subtitle: "في العقارات",
      description: "نرحب بكم في شركة موازين الشرق للمقاولات، حيث تتحول الرؤية إلى واقع، والجودة إلى أسلوب حياة.",
      projectsBtn: "مشاريعنا",
      contactBtn: "اتصل بنا"
    },
    stats: {
      projects: "150+",
      projectsLabel: "مشروع مكتمل",
      experience: "10+",
      experienceLabel: "سنة خبرة",
      clients: "100%",
      clientsLabel: "رضا العملاء"
    },
    whyChoose: {
      title: "لماذا تختار موازين الشرق",
      description: "نقدم خدمات بناء استثنائية بنزاهة وابتكار وخبرة لا مثيل لها.",
      highlights: [
        {
          icon: 'Construction',
          title: 'خبرة 10+ سنة',
          description: 'خبرة موثوقة في التطوير العقاري والمقاولات'
        },
        {
          icon: 'Quality',
          title: 'ضمان الجودة',
          description: 'عمليات مراقبة جودة صارمة على جميع المشاريع'
        },
        {
          icon: 'Clock',
          title: 'التسليم في الوقت',
          description: 'سجل حافل بتسليم المشاريع في الوقت المحدد'
        },
        {
          icon: 'Client',
          title: 'مركزية العميل',
          description: 'ملتزمون بتجاوز توقعات العملاء'
        }
      ]
    },
    featuredProjects: {
      title: "مشاريع مميزة",
      description: "نعرض أحدث وإنجازاتنا البناءة الأكثر روعة",
      viewAll: "عرض جميع المشاريع",
      learnMore: "تعرف أكثر"
    },
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
      description: "Welcome to Mawazen Al-Sharq Contracting Company, where vision becomes reality and quality becomes a lifestyle.",
      projectsBtn: "Our Projects",
      contactBtn: "Contact Us"
    },
    stats: {
      projects: "150+",
      projectsLabel: "Projects Completed",
      experience: "10+",
      experienceLabel: "Years Experience",
      clients: "100%",
      clientsLabel: "Client Satisfaction"
    },
    whyChoose: {
      title: "Why Choose Mawazin Al-Sharq",
      description: "We provide exceptional construction services with integrity, innovation and unparalleled expertise.",
      highlights: [
        {
          icon: 'Construction',
          title: '10+ Years Experience',
          description: 'Trusted experience in real estate development and contracting'
        },
        {
          icon: 'Quality',
          title: 'Quality Assurance',
          description: 'Strict quality control processes on all projects'
        },
        {
          icon: 'Clock',
          title: 'On-Time Delivery',
          description: 'Proven track record of delivering projects on schedule'
        },
        {
          icon: 'Client',
          title: 'Client-Centric',
          description: 'Committed to exceeding customer expectations'
        }
      ]
    },
    featuredProjects: {
      title: "Featured Projects",
      description: "Showcasing our latest and most impressive construction achievements",
      viewAll: "View All Projects",
      learnMore: "Learn More"
    },
    cta: {
      title: "Ready to Start Your Project?",
      description: "Let's discuss how we can turn your vision into reality with our construction expertise and commitment to excellence.",
      button: "Contact Us Today"
    }
  }
};

const Home = () => {
  const { language, isArabic } = useLanguage();
  const content = homeContent[language];

  // Get featured projects
  const featuredProjects = projectsData
    .filter(project => project.featured)
    .slice(0, 2)
    .map(project => ({
      id: project.id,
      title: project.title[language],
      value: project.value[language],
      description: project.description[language],
      image: project.images[0]?.src || '/assets/projects/default.jpg',
      location: project.location[language],
      type: project.type[language],
      status: project.status[language]
    }));

  const fallbackProjects = projectsData.length > 0 
    ? projectsData.slice(0, 2).map(project => ({
        id: project.id,
        title: project.title[language],
        value: project.value[language],
        description: project.description[language],
        image: project.images[0]?.src || '/assets/projects/default.jpg',
        location: project.location[language],
        type: project.type[language],
        status: project.status[language]
      }))
    : [];

  const projectsToDisplay = featuredProjects.length > 0 ? featuredProjects : fallbackProjects;

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardHover = {
    hover: {
      y: -6,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {content.hero.title}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                {content.hero.subtitle}
              </span>
            </h1>
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {content.hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-colors duration-300 text-lg shadow-lg shadow-yellow-500/25 inline-flex items-center"
                >
                  {content.hero.projectsBtn}
                  <HomeIcons.Arrow className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="border-2 border-white/80 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-900 backdrop-blur-sm transition-all duration-300 text-lg inline-flex items-center"
                >
                  {content.hero.contactBtn}
                  <HomeIcons.Phone className={`w-5 h-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: content.stats.projects, label: content.stats.projectsLabel },
              { value: content.stats.experience, label: content.stats.experienceLabel },
              { value: content.stats.clients, label: content.stats.clientsLabel }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {content.whyChoose.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.whyChoose.description}
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {content.whyChoose.highlights.map((item, index) => {
              const IconComponent = HomeIcons[item.icon];
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover="hover"
                  className="group"
                >
                  <motion.div
                    variants={cardHover}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:border-blue-200 h-full"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {content.featuredProjects.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.featuredProjects.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {projectsToDisplay.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardHover}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/assets/projects/default.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="bg-blue-600/90 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                        {project.type}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-blue-100">
                        <HomeIcons.Location className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
                      aria-label={`Learn more about ${project.title}`}
                    >
                      {content.featuredProjects.learnMore}
                      <HomeIcons.Arrow className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'} transform group-hover:translate-x-1 transition-transform`} />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center shadow-lg"
                aria-label="View all projects"
              >
                {content.featuredProjects.viewAll}
                <HomeIcons.Arrow className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {content.cta.description}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-colors duration-300 text-lg inline-flex items-center shadow-lg shadow-yellow-500/25"
                aria-label="Contact us today"
              >
                {content.cta.button}
                <HomeIcons.Phone className={`w-5 h-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;