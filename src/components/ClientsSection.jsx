import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ClientsSection = memo(() => {
  const { language } = useLanguage();

  // Clients data with bilingual support
  const clientsData = useMemo(() => [
    {
      id: 1,
      name: {
        ar: 'شركة المعمار العربي للمقاولات',
        en: 'Al-Memar Al-Arabi Contracting Company'
      },
      logo: '🏢',
      sector: {
        ar: 'المقاولات العامة',
        en: 'General Contracting'
      }
    },
    {
      id: 2,
      name: {
        ar: 'شركة باني للمقاولات',
        en: 'Bani Contracting Company'
      },
      logo: '🏗️',
      sector: {
        ar: 'المقاولات المتخصصة',
        en: 'Specialized Contracting'
      }
    },
    {
      id: 3,
      name: {
        ar: 'شركة بني الخليج',
        en: 'Bani Al-Khaleej Company'
      },
      logo: '🌊',
      sector: {
        ar: 'التطوير العقاري',
        en: 'Real Estate Development'
      }
    },
    {
      id: 4,
      name: {
        ar: 'شركة عبر للمقاولات',
        en: 'Abir Contracting Company'
      },
      logo: '⚡',
      sector: {
        ar: 'مقاولات البنية التحتية',
        en: 'Infrastructure Contracting'
      }
    },
    {
      id: 5,
      name: {
        ar: 'شركة المحيط الذهبي',
        en: 'Al-Mohit Al-Thahabi Company'
      },
      logo: '💰',
      sector: {
        ar: 'الاستثمار والتطوير',
        en: 'Investment & Development'
      }
    }
  ], []);

  // Content with bilingual support
  const content = useMemo(() => ({
    ar: {
      title: "عملاؤنا",
      subtitle: "شركاء النجاح",
      description: "نفتخر بثقة كبرى الشركات والمؤسسات التي تعاملت معنا ووضعت ثقتها في خدماتنا",
      trustedBy: "يثق بنا كبار العملاء",
      yearsOfTrust: "سنوات من الثقة المتبادلة",
      projectsCompleted: "مشروع مشترك",
      satisfactionRate: "معدل رضا العملاء"
    },
    en: {
      title: "Our Clients",
      subtitle: "Success Partners",
      description: "We take pride in the trust of major companies and institutions that have worked with us and placed their confidence in our services",
      trustedBy: "Trusted by Major Clients",
      yearsOfTrust: "Years of Mutual Trust",
      projectsCompleted: "Joint Projects",
      satisfactionRate: "Client Satisfaction Rate"
    }
  }), []);

  const currentContent = content[language];

  // Animation variants
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

  const cardHover = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Statistics data
  const stats = useMemo(() => [
    { value: "5+", label: currentContent.yearsOfTrust },
    { value: "50+", label: currentContent.projectsCompleted },
    { value: "98%", label: currentContent.satisfactionRate }
  ], [currentContent]);

  return (
    <section 
      className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="clients-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm md:text-base mb-4"
          >
            {currentContent.subtitle}
          </motion.span>
          
          <h2 
            id="clients-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            {currentContent.title}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clients Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {clientsData.map((client) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHover}
                className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-300 h-full flex flex-col items-center justify-center"
              >
                {/* Client Logo/Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl md:text-3xl text-white">
                    {client.logo}
                  </span>
                </div>

                {/* Client Name */}
                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {client.name[language]}
                </h3>

                {/* Client Sector */}
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {client.sector[language]}
                </p>

                {/* Hover Effect Indicator */}
                <div className="mt-4 w-8 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3 border border-gray-300">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-700 font-medium text-sm md:text-base">
              {currentContent.trustedBy}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

ClientsSection.displayName = 'ClientsSection';

export default ClientsSection;