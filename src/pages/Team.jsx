import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Team = () => {
  const { language, isArabic } = useLanguage();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      title: "فريق العمل",
      description: "تعرف على المحترفين المتفانين الذين يجلبون الخبرة والابتكار والالتزام إلى كل مشروع من مشاريع موازين الشرق.",
      organizational: "الهيكل التنظيمي",
      meetExperts: "تعرف على خبرائنا",
      noMembers: "لا يوجد أعضاء في الفريق",
      noMembersDesc: "لا يوجد أعضاء في هذا القسم.",
      joinTeam: {
        title: "انضم إلى فريقنا",
        description: "نحن نبحث دائمًا عن محترفين موهوبين يشاركوننا شغفنا بالتميز في البناء والتطوير العقاري.",
        button: "عرض فرص العمل"
      },
      departments: [
        { key: 'all', label: 'جميع الفريق' },
        { key: 'الإدارة', label: 'الإدارة' },
        { key: 'المالية', label: 'المالية' },
        { key: 'العمليات', label: 'العمليات' },
        { key: 'المشاريع', label: 'المشاريع' },
        { key: 'التسويق', label: 'التسويق' }
      ]
    },
    en: {
      title: "Our Team",
      description: "Meet the dedicated professionals who bring expertise, innovation, and commitment to every Mawazin Al-Sharq project.",
      organizational: "Organizational Structure",
      meetExperts: "Meet Our Experts",
      noMembers: "No Team Members",
      noMembersDesc: "There are no members in this department.",
      joinTeam: {
        title: "Join Our Team",
        description: "We're always looking for talented professionals who share our passion for excellence in construction and real estate development.",
        button: "View Job Opportunities"
      },
      departments: [
        { key: 'all', label: 'All Team' },
        { key: 'الإدارة', label: 'Management' },
        { key: 'المالية', label: 'Finance' },
        { key: 'العمليات', label: 'Operations' },
        { key: 'المشاريع', label: 'Projects' },
        { key: 'التسويق', label: 'Marketing' }
      ]
    }
  };

  // فريق العمل متعدد اللغات
  const teamMembersData = [
    {
      name: {
        ar: 'عبدالله سعود القحطاني',
        en: 'Abdullah Saud Al-Qahtani'
      },
      position: {
        ar: 'الرئيس',
        en: 'President'
      },
      department: 'الإدارة',
      email: 'abdulla@mawazeen.com',
      phone: '+966540800700',
      bio: {
        ar: 'يقود شركتنا برؤية واستراتيجية واضحة مع أكثر من 25 سنة خبرة في التطوير العقاري.',
        en: 'Leads our company with clear vision and strategy with over 25 years of experience in real estate development.'
      },
      image: '/assets/team/ceo.jpg'
    },
    {
      name: {
        ar: 'محمود شهاب',
        en: 'Mahmoud Shehab'
      },
      position: {
        ar: 'المدير المالي',
        en: 'Financial Manager'
      },
      department: 'المالية',
      email: 'mahmmoud@mawazeen.com',
      phone: '+966558002061',
      bio: {
        ar: 'يتمتع بخبرة 15 سنة في المجال المالي، ويضمن الصحة المالية والنمو الاستراتيجي لمشاريعنا.',
        en: '15 years of experience in finance, ensuring financial health and strategic growth of our projects.'
      },
      image: '/assets/team/finance.jpg'
    },
    {
      name: {
        ar: 'ياسر خليفة',
        en: 'Yasser Khalifa'
      },
      position: {
        ar: 'مدير العمليات',
        en: 'Operations Manager'
      },
      department: 'العمليات',
      email: 'yasser@mawazeen.com',
      phone: '+966545977701',
      bio: {
        ar: 'يشرف على جميع عمليات البناء مع 20 سنة خبرة عملية في إدارة المشاريع.',
        en: 'Oversees all construction operations with 20 years of practical experience in project management.'
      },
      image: '/assets/team/operations.jpg'
    },
    {
      name: {
        ar: 'عمرو الهندي',
        en: 'Amro Al-Hindi'
      },
      position: {
        ar: 'مدير المشاريع',
        en: 'Project Manager'
      },
      department: 'المشاريع',
      email: 'amro@mawazeen.com',
      phone: '+966545977701',
      bio: {
        ar: 'يدير المشاريع المعقدة بدقة واهتمام بالتفاصيل.',
        en: 'Manages complex projects with precision and attention to detail.'
      },
      image: '/assets/team/project-manager.jpg'
    },
    {
      name: {
        ar: 'د. نعيمة',
        en: 'Dr. Naema'
      },
      position: {
        ar: 'مدير العقود والتسويق',
        en: 'Contracts & Marketing Manager'
      },
      department: 'التسويق',
      email: 'naema@mawazeen.com',
      phone: '+966540800700',
      bio: {
        ar: 'تجمع بين الابتكار في التصميم والحلول العملية للبناء.',
        en: 'Combines innovation in design with practical construction solutions.'
      },
      image: '/assets/team/marketing.jpg'
    },
    {
      name: {
        ar: 'ياسر الفرت',
        en: 'Yasser Al-Fart'
      },
      position: {
        ar: 'مساعد المدير المالي',
        en: 'Assistant Financial Manager'
      },
      department: 'المالية',
      email: 'yasser.fert@mawazeen.com',
      phone: '+966558002061',
      bio: {
        ar: 'يدير ميزانيات المشاريع والتقارير المالية بدقة استثنائية.',
        en: 'Manages project budgets and financial reports with exceptional accuracy.'
      },
      image: '/assets/team/assistant-finance.jpg'
    }
  ];

  const currentContent = content[language];
  const [selectedDepartment, setSelectedDepartment] = React.useState('all');

  // تحويل فريق العمل إلى اللغة الحالية
  const teamMembers = teamMembersData.map(member => ({
    ...member,
    name: member.name[language],
    position: member.position[language],
    bio: member.bio[language]
  }));

  // حساب عدد الأعضاء في كل قسم
  const departments = currentContent.departments.map(dept => ({
    ...dept,
    count: dept.key === 'all' 
      ? teamMembers.length 
      : teamMembers.filter(m => m.department === dept.key).length
  }));

  const filteredMembers = selectedDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

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

        {/* أزرار التصفية */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {departments.map((dept) => (
            <button
              key={dept.key}
              onClick={() => setSelectedDepartment(dept.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedDepartment === dept.key
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              } ${isArabic ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <span>{dept.label}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                selectedDepartment === dept.key
                  ? 'bg-white text-primary'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {dept.count}
              </span>
            </button>
          ))}
        </div>

        {/* الهيكل التنظيمي */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {currentContent.organizational}
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="mb-12 text-center">
                <div className="bg-primary text-white p-6 rounded-2xl shadow-lg inline-block">
                  <h3 className="text-xl font-bold">
                    {teamMembers[0].name}
                  </h3>
                  <p className="text-blue-100">
                    {teamMembers[0].position}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full max-w-4xl">
                <div className="text-center">
                  <div className="bg-accent text-primary p-4 rounded-xl shadow-md">
                    <h4 className="font-semibold">
                      {teamMembers[1].name}
                    </h4>
                    <p className="text-sm">
                      {teamMembers[1].position}
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="bg-light p-3 rounded-lg">
                      <p className="font-medium text-sm">
                        {teamMembers[5].name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {teamMembers[5].position}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-accent text-primary p-4 rounded-xl shadow-md">
                    <h4 className="font-semibold">
                      {teamMembers[2].name}
                    </h4>
                    <p className="text-sm">
                      {teamMembers[2].position}
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="bg-light p-3 rounded-lg">
                      <p className="font-medium text-sm">
                        {teamMembers[3].name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {teamMembers[3].position}
                      </p>
                    </div>
                    <div className="bg-light p-3 rounded-lg">
                      <p className="font-medium text-sm">
                        {teamMembers[4].name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {teamMembers[4].position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* أعضاء الفريق */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.meetExperts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 bg-gray-200 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-primary`}>
                    {currentContent.departments.find(dept => dept.key === member.department)?.label}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-accent font-semibold mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <svg 
                        className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'} text-primary`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {member.email}
                    </div>
                    <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <svg 
                        className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'} text-primary`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {member.phone}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentContent.noMembers}
              </h3>
              <p className="text-gray-600">
                {currentContent.noMembersDesc}
              </p>
            </motion.div>
          )}
        </section>

        {/* قسم الانضمام للفريق */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-primary text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            {currentContent.joinTeam.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {currentContent.joinTeam.description}
          </p>
          <button className="bg-accent text-primary px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 text-lg">
            {currentContent.joinTeam.button}
          </button>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Team;