// pages/Services.js
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// SVG Icons Component
const ServiceIcons = {
  Construction: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Design: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Architecture: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Structure: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Management: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Infrastructure: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Award: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Arrow: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
};

// Content object for translations
const servicesContent = {
  ar: {
    hero: {
      title: "خدماتنا",
      subtitle: "موازين الشرق للمقاولات",
      description: "في شركة موازين الشرق للمقاولات، نؤمن أن التميز يبدأ من التفاصيل، لذلك نُقدّم مجموعة من الخدمات المتكاملة التي تغطي كافة مراحل المشروع — من الفكرة حتى التسليم."
    },
    introduction: {
      title: "رؤيتنا في التميز",
      vision: "نسعى دائمًا لتوفير حلول إنشائية وهندسية تجمع بين الجودة العالية والالتزام بالمواعيد، بما يتماشى مع رؤية المملكة 2030 في تطوير البنية التحتية وتعزيز جودة الحياة.",
      mission: "هدفنا أن نكون الشريك الموثوق لكل من يسعى لبناء مشروعٍ يُعبّر عن الطموح والإتقان.",
      stats: {
        title: "سجل حافل بالإنجازات",
        projects: "150+",
        projectsLabel: "مشروع مكتمل",
        experience: "10+",
        experienceLabel: "سنة خبرة",
        satisfaction: "98%",
        satisfactionLabel: "رضا العملاء"
      }
    },
    services: {
      title: "مجالات تخصصنا",
      subtitle: "نقدم مجموعة متكاملة من الخدمات الهندسية والإنشائية",
      items: [
        {
          icon: 'Construction',
          title: 'المقاولات العامة',
          description: 'تنفيذ المشاريع السكنية والتجارية وفق أعلى معايير الجودة والسلامة، مع الالتزام بمواعيد التسليم المتفق عليها.'
        },
        {
          icon: 'Design',
          title: 'التشطيبات والتصميم الداخلي',
          description: 'نُحوّل المساحات إلى بيئات عصرية تجمع بين الجمال والوظيفة، باستخدام أحدث مواد التشطيب وأساليب التصميم.'
        },
        {
          icon: 'Architecture',
          title: 'التصميم المعماري',
          description: 'ابتكار تصاميم هندسية تجمع بين الإبداع والواقعية، مع مراعاة الاحتياجات العملية والجمالية للعملاء.'
        },
        {
          icon: 'Structure',
          title: 'التصميم الإنشائي',
          description: 'إعداد وتصميم الهياكل الإنشائية وفق أعلى المعايير الهندسية لضمان القوة والاستدامة والأمان.'
        },
        {
          icon: 'Management',
          title: 'إدارة المشاريع',
          description: 'الإشراف على جميع مراحل التنفيذ لضمان دقة الأداء والالتزام بالميزانية والوقت المحدد.'
        },
        {
          icon: 'Infrastructure',
          title: 'أعمال البنية التحتية',
          description: 'تنفيذ شبكات المياه والصرف والكهرباء والاتصالات بأعلى المواصفات الفنية والمعايير العالمية.'
        }
      ]
    },
    process: {
      title: "رحلة مشروعك معنا",
      steps: [
        {
          step: '١',
          title: 'التخطيط والتصميم',
          description: 'دراسة المشروع وتصميم الحلول المثلى'
        },
        {
          step: '٢',
          title: 'الموافقات والتراخيص',
          description: 'استخراج التراخيص والموافقات الرسمية'
        },
        {
          step: '٣',
          title: 'التنفيذ والبناء',
          description: 'تنفيذ المشروع بأعلى معايير الجودة'
        },
        {
          step: '٤',
          title: 'التسليم والدعم',
          description: 'تسليم المشروع مع خدمات ما بعد التسليم'
        }
      ]
    },
    cta: {
      title: 'مستعدون لبدء مشروعك القادم',
      description: 'لنتناقش حول كيفية تحويل رؤيتك إلى واقع ملموس بخبرتنا وابتكاراتنا.',
      button: 'اتصل بنا اليوم'
    }
  },
  en: {
    hero: {
      title: "Our Services",
      subtitle: "Mawazin Al-Sharq Contracting",
      description: "At Mawazin Al-Sharq Contracting, we believe excellence starts with details. That's why we offer integrated services covering all project stages — from idea to delivery."
    },
    introduction: {
      title: "Our Vision for Excellence",
      vision: "We always strive to provide construction and engineering solutions that combine high quality with timely delivery, in line with Saudi Vision 2030 for infrastructure development and quality of life enhancement.",
      mission: "Our goal is to be the trusted partner for everyone seeking to build a project that expresses ambition and mastery.",
      stats: {
        title: "Proven Track Record",
        projects: "150+",
        projectsLabel: "Projects Completed",
        experience: "10+",
        experienceLabel: "Years Experience",
        satisfaction: "98%",
        satisfactionLabel: "Client Satisfaction"
      }
    },
    services: {
      title: "Our Areas of Expertise",
      subtitle: "We offer a comprehensive range of engineering and construction services",
      items: [
        {
          icon: 'Construction',
          title: 'General Contracting',
          description: 'Execution of residential and commercial projects according to the highest quality and safety standards, while adhering to agreed delivery schedules.'
        },
        {
          icon: 'Design',
          title: 'Finishing & Interior Design',
          description: 'We transform spaces into modern environments that combine beauty and function, using the latest finishing materials and design methods.'
        },
        {
          icon: 'Architecture',
          title: 'Architectural Design',
          description: 'Creating engineering designs that combine creativity and realism, while considering the practical and aesthetic needs of clients.'
        },
        {
          icon: 'Structure',
          title: 'Structural Design',
          description: 'Preparation and design of structural systems according to the highest engineering standards to ensure strength, sustainability, and safety.'
        },
        {
          icon: 'Management',
          title: 'Project Management',
          description: 'Supervision of all implementation stages to ensure performance accuracy and adherence to budget and schedule.'
        },
        {
          icon: 'Infrastructure',
          title: 'Infrastructure Works',
          description: 'Implementation of water, sewage, electricity, and communication networks with the highest technical specifications and international standards.'
        }
      ]
    },
    process: {
      title: "Your Project Journey With Us",
      steps: [
        {
          step: '1',
          title: 'Planning & Design',
          description: 'Project study and optimal solution design'
        },
        {
          step: '2',
          title: 'Approvals & Permits',
          description: 'Obtaining official permits and approvals'
        },
        {
          step: '3',
          title: 'Execution & Construction',
          description: 'Project execution with highest quality standards'
        },
        {
          step: '4',
          title: 'Delivery & Support',
          description: 'Project delivery with post-delivery support'
        }
      ]
    },
    cta: {
      title: 'Ready to Start Your Next Project',
      description: "Let's discuss how to turn your vision into tangible reality with our expertise and innovations.",
      button: 'Contact Us Today'
    }
  }
};

const Services = () => {
  const { language, isArabic } = useLanguage();
  const content = servicesContent[language];

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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              {content.hero.subtitle}
            </p>
            <p className="text-lg text-blue-200 leading-8 max-w-3xl mx-auto">
              {content.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {content.introduction.title}
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-8">
                  {content.introduction.vision}
                </p>
                <p className="text-lg text-gray-700 leading-8">
                  {content.introduction.mission}
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                  <ServiceIcons.Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  {content.introduction.stats.title}
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: content.introduction.stats.projects, label: content.introduction.stats.projectsLabel },
                    { value: content.introduction.stats.experience, label: content.introduction.stats.experienceLabel },
                    { value: content.introduction.stats.satisfaction, label: content.introduction.stats.satisfactionLabel }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {content.services.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.services.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {content.services.items.map((service, index) => {
              const IconComponent = ServiceIcons[service.icon];
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover="hover"
                  className="group"
                >
                  <motion.div
                    variants={cardHover}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:border-blue-200"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-7">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.process.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.process.steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
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
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 text-lg shadow-lg"
              aria-label={content.cta.button}
            >
              {content.cta.button}
              <ServiceIcons.Arrow className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;