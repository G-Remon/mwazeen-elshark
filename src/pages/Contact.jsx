import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      title: "اتصل بنا",
      description: "تواصل مباشرة مع فريقنا لمناقشة مشروعك القادم وتحويل رؤيتك إلى واقع.",
      contactInfo: "معلومات التواصل",
      offices: "مكاتبنا",
      workingHours: "ساعات العمل",
      directCall: "اتصال مباشر",
      whatsapp: "مراسلة",
      phone: "هاتف",
      email: "بريد إلكتروني",
      mainOffice: "المقر الرئيسي",
      workDays: {
        sunThu: "الأحد - الخميس",
        friday: "الجمعة",
        saturday: "السبت"
      },
      hours: {
        sunThu: "8:00 ص - 5:00 م",
        friday: "مغلق",
        saturday: "10:00 ص - 2:00 م"
      },
      saudiArabia: "المملكة العربية السعودية"
    },
    en: {
      title: "Contact Us",
      description: "Connect directly with our team to discuss your next project and turn your vision into reality.",
      contactInfo: "Contact Information",
      offices: "Our Offices",
      workingHours: "Working Hours",
      directCall: "Direct Call",
      whatsapp: "Message",
      phone: "Phone",
      email: "Email",
      mainOffice: "Headquarters",
      workDays: {
        sunThu: "Sunday - Thursday",
        friday: "Friday",
        saturday: "Saturday"
      },
      hours: {
        sunThu: "8:00 AM - 5:00 PM",
        friday: "Closed",
        saturday: "10:00 AM - 2:00 PM"
      },
      saudiArabia: "Saudi Arabia"
    }
  };

  // معلومات الاتصال متعددة اللغات
  const contactInfoData = [
    {
      title: {
        ar: 'الرئيس التنفيذي',
        en: 'CEO'
      },
      name: {
        ar: 'عمرو محمد هندي',
        en: 'Amr Mohamed Hendy'
      },
      phone: '0540800700',
      email: 'amrmohamedhendy@gmail.com',
      description: {
        ar: 'للشؤون الإدارية والاستراتيجية',
        en: 'For administrative and strategic affairs'
      }
    },
    {
      title: {
        ar: 'مدير المشاريع',
        en: 'Project Manager'
      },
      name: {
        ar: 'فريق المشاريع',
        en: 'Projects Team'
      },
      phone: '0545977701',
      email: 'projects@mawazeen.com',
      description: {
        ar: 'لمناقشة تفاصيل المشاريع والمتطلبات الفنية',
        en: 'For project details and technical requirements discussion'
      }
    },
    {
      title: {
        ar: 'خدمة العملاء',
        en: 'Customer Service'
      },
      name: {
        ar: 'فريق الدعم',
        en: 'Support Team'
      },
      phone: '0558002061',
      email: 'info@mawazeen.com',
      description: {
        ar: 'لاستفسارات العملاء والمتابعة اليومية',
        en: 'For customer inquiries and daily follow-up'
      }
    }
  ];

  // المكاتب متعددة اللغات
  const officesData = [
    {
      city: {
        ar: 'الرياض',
        en: 'Riyadh'
      },
      address: {
        ar: 'مقر الشركة الرئيسي',
        en: 'Main Company Headquarters'
      },
      phone: '0540800700',
      email: 'amrmohamedhendy@gmail.com'
    },
    {
      city: {
        ar: 'الخبر',
        en: 'Al Khobar'
      },
      address: {
        ar: 'فرع المنطقة الشرقية',
        en: 'Eastern Region Branch'
      },
      phone: '0558002061',
      email: 'info@mawazeen.com'
    },
    {
      city: {
        ar: 'الجسر',
        en: 'Al Jisr'
      },
      address: {
        ar: 'فرع المشاريع',
        en: 'Projects Branch'
      },
      phone: '0545977701',
      email: 'projects@mawazeen.com'
    }
  ];

  const currentContent = content[language];
  
  // تحويل البيانات إلى اللغة الحالية
  const contactInfo = contactInfoData.map(contact => ({
    ...contact,
    title: contact.title[language],
    name: contact.name[language],
    description: contact.description[language]
  }));

  const offices = officesData.map(office => ({
    ...office,
    city: office.city[language],
    address: office.address[language]
  }));

  const handleContactClick = (phone, email, type) => {
    if (type === 'call') {
      window.open(`tel:${phone}`, '_self');
    } else if (type === 'whatsapp') {
      const message = language === 'ar' 
        ? 'مرحباً، أريد الاستفسار عن خدماتكم' 
        : 'Hello, I would like to inquire about your services';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (type === 'email') {
      window.open(`mailto:${email}`, '_self');
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
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        {/* بطاقات الاتصال المباشر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-primary mb-2">{contact.title}</h3>
                <p className="text-gray-700 font-medium">{contact.name}</p>
                <p className="text-gray-500 text-sm mt-2">{contact.description}</p>
              </div>
              
              <div className="space-y-4 mt-6">
                {/* زر الاتصال المباشر */}
                <div 
                  className={`flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => handleContactClick(contact.phone, contact.email, 'call')}
                >
                  <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`bg-primary bg-opacity-10 p-2 rounded-lg ${isArabic ? 'ml-3' : 'mr-3'}`}>
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{contact.phone}</span>
                  </div>
                  <span className="text-primary text-sm font-medium">
                    {currentContent.directCall}
                  </span>
                </div>
                
                {/* زر واتساب */}
                <div 
                  className={`flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => handleContactClick(contact.phone, contact.email, 'whatsapp')}
                >
                  <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`bg-green-500 bg-opacity-10 p-2 rounded-lg ${isArabic ? 'ml-3' : 'mr-3'}`}>
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                    </span>
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    {currentContent.whatsapp}
                  </span>
                </div>
                
                {/* زر البريد الإلكتروني */}
                <div 
                  className={`flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => handleContactClick(contact.phone, contact.email, 'email')}
                >
                  <div className={`bg-gray-500 bg-opacity-10 p-2 rounded-lg ${isArabic ? 'ml-3' : 'mr-3'}`}>
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm truncate">{contact.email}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* معلومات التواصل */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentContent.contactInfo}
              </h2>
              
              <div className="space-y-6">
                {/* الهاتف */}
                <div className={`flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`bg-primary bg-opacity-10 p-3 rounded-lg ${isArabic ? 'ml-4' : 'mr-4'}`}>
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentContent.phone}</h3>
                    <p className="text-gray-600">0540800700</p>
                    <p className="text-gray-600">0558002061</p>
                    <p className="text-gray-600">0545977701</p>
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className={`flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`bg-primary bg-opacity-10 p-3 rounded-lg ${isArabic ? 'ml-4' : 'mr-4'}`}>
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentContent.email}</h3>
                    <p className="text-gray-600">amrmohamedhendy@gmail.com</p>
                    <p className="text-gray-600">info@mawazeen.com</p>
                    <p className="text-gray-600">projects@mawazeen.com</p>
                  </div>
                </div>

                {/* الموقع */}
                <div className={`flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`bg-primary bg-opacity-10 p-3 rounded-lg ${isArabic ? 'ml-4' : 'mr-4'}`}>
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentContent.mainOffice}</h3>
                    <p className="text-gray-600">
                      {language === 'ar' ? 'الرياض - الخبر - الجسر' : 'Riyadh - Al Khobar - Al Jisr'}<br />
                      {currentContent.saudiArabia}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ساعات العمل */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentContent.workingHours}
              </h2>
              <div className="space-y-4">
                <div className={`flex justify-between items-center py-2 border-b border-gray-100 ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}>
                  <span className="text-gray-600">{currentContent.workDays.sunThu}</span>
                  <span className="font-semibold text-gray-900">{currentContent.hours.sunThu}</span>
                </div>
                <div className={`flex justify-between items-center py-2 border-b border-gray-100 ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}>
                  <span className="text-gray-600">{currentContent.workDays.friday}</span>
                  <span className="font-semibold text-gray-900">{currentContent.hours.friday}</span>
                </div>
                <div className={`flex justify-between items-center py-2 ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}>
                  <span className="text-gray-600">{currentContent.workDays.saturday}</span>
                  <span className="font-semibold text-gray-900">{currentContent.hours.saturday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* المكاتب */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentContent.offices}
            </h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                >
                  <div className={`flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`bg-primary bg-opacity-10 p-2 rounded-lg ${isArabic ? 'ml-4' : 'mr-4'}`}>
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900">{office.city}</h4>
                      <p className="text-gray-600 mt-1">{office.address}</p>
                      <div className={`mt-3 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 ${
                        isArabic ? 'sm:flex-row-reverse sm:space-x-reverse sm:space-x-4' : 'sm:space-x-4'
                      }`}>
                        <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <svg className={`h-4 w-4 text-gray-500 ${isArabic ? 'ml-1' : 'mr-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-700">{office.phone}</span>
                        </div>
                        <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <svg className={`h-4 w-4 text-gray-500 ${isArabic ? 'ml-1' : 'mr-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{office.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;