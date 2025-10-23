// projectsData.js

// Simple image path helper for Vercel deployment
const getImagePath = (filename) => {
  // Remove any leading/trailing whitespace
  const cleaned = filename.trim();
  // Ensure path starts with / and return
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
};

export const projectsData = [
  {
    id: 1,
    title: {
      ar: 'معارض العجلان',
      en: 'Al-Ajlan Exhibitions'
    },
    value: '3,500,000',
    description: {
      ar: 'تحفة معمارية تجارية تعيد تعريف مفهوم صالات العرض المتطورة',
      en: 'An architectural commercial masterpiece redefining the concept of advanced exhibition halls'
    },
    fullDescription: {
      ar: `معارض العجلان تمثل قفزة نوعية في عالم التصميم التجاري، حيث تجمع بين الأناقة المعمارية والوظائف الذكية. تم تنفيذ المشروع بأعلى معايير الجودة العالمية، مع استخدام أحدث التقنيات في أنظمة العرض والإضاءة والتحكم البيئي.`,
      en: `Al-Ajlan Exhibitions represent a qualitative leap in commercial design, combining architectural elegance with smart functionality. The project was executed with the highest global quality standards, using the latest technologies in display systems, lighting, and environmental control.`
    },
    location: {
      ar: 'الرياض',
      en: 'Riyadh'
    },
    type: {
      ar: 'تجاري',
      en: 'Commercial'
    },
    timeline: {
      ar: '15 شهر',
      en: '15 months'
    },
    status: {
      ar: 'مكتمل',
      en: 'Completed'
    },
    scope: {
      ar: [
        'التصميم المعماري المتكامل',
        'الهيكل الإنشائي المتطور',
        'أنظمة العرض الذكية',
        'التشطيبات الفاخرة',
        'أنظمة الأمن والسلامة',
        'البنية التحتية التكنولوجية'
      ],
      en: [
        'Integrated architectural design',
        'Advanced structural system',
        'Smart display systems',
        'Luxury finishing works',
        'Security and safety systems',
        'Technological infrastructure'
      ]
    },
    achievements: {
      ar: [
        'تحقيق أعلى معايير الجودة العالمية',
        'تسليم المشروع قبل الموعد المحدد',
        'تصميم مبتكر يحصل على إشادة الخبراء',
        'كفاءة طاقة عالية بتقنيات مستدامة'
      ],
      en: [
        'Achieving highest global quality standards',
        'Project delivery ahead of schedule',
        'Innovative design praised by experts',
        'High energy efficiency with sustainable technologies'
      ]
    },
    images: [
      {
        src: getImagePath('/assets/Projects/مشروع معارض العجلان/1.webp'),
        alt: {
          ar: 'الواجهة الرئيسية لمعارض العجلان',
          en: 'Main facade of Al-Ajlan Exhibitions'
        }
      },
      {
        src: getImagePath('/assets/Projects/مشروع معارض العجلان/2.webp'),
        alt: {
          ar: 'صالة العرض الرئيسية',
          en: 'Main exhibition hall'
        }
      },
      {
        src: getImagePath('/assets/Projects/مشروع معارض العجلان/3.webp'),
        alt: {
          ar: 'منطقة الاستقبال واللوبي',
          en: 'Reception and lobby area'
        }
      },
      {
        src: getImagePath('/assets/Projects/مشروع معارض العجلان/4.webp'),
        alt: {
          ar: 'التفاصيل المعمارية الخارجية',
          en: 'External architectural details'
        }
      }
    ]
  },
  {
    id: 2,
    title: {
      ar: 'رسن فليج فرسان 2',
      en: 'Rasan Village Fursan 2'
    },
    value: '5,000,000',
    description: {
      ar: 'واحة سكنية استثنائية تقدم أنماط حياة راقية في قلب الرياض',
      en: 'An exceptional residential oasis offering luxurious lifestyles in the heart of Riyadh'
    },
    fullDescription: {
      ar: `رسن فليج فرسان 2 ليس مجرد مشروع سكني، بل هو مجتمع متكامل يُعيد تعريف مفهوم الحياة العصرية. تم تصميم المشروع ليوفر تجربة سكنية فريدة تجمع بين الخصوصية والرفاهية والاستدامة.`,
      en: `Rasan Village Fursan 2 is not just a residential project, but an integrated community redefining the concept of modern living. The project is designed to provide a unique residential experience combining privacy, luxury, and sustainability.`
    },
    location: {
      ar: 'الرياض',
      en: 'Riyadh'
    },
    type: {
      ar: 'سكني',
      en: 'Residential'
    },
    timeline: {
      ar: '24 شهر',
      en: '24 months'
    },
    status: {
      ar: 'تحت الإنشاء',
      en: 'Under Construction'
    },
    scope: {
      ar: [
        'التصميم والتخطيط المتكامل',
        'الهيكل الإنشائي المتطور',
        'البنية التحتية الذكية',
        'أنظمة الاستدامة والطاقة',
        'التشطيبات العالية الجودة',
        'المرافق والخدمات المشتركة'
      ],
      en: [
        'Integrated design and planning',
        'Advanced structural system',
        'Smart infrastructure',
        'Sustainability and energy systems',
        'High-quality finishing works',
        'Common facilities and services'
      ]
    },
    achievements: {
      ar: [
        'تصميم حائز على جوائز معمارية',
        'التزام تام بجدول التنفيذ',
        'استخدام مواد بناء مستدامة',
        'دمج التقنيات الذكية في التصميم'
      ],
      en: [
        'Award-winning architectural design',
        'Full commitment to implementation schedule',
        'Use of sustainable building materials',
        'Integration of smart technologies in design'
      ]
    },
    images: [
      {
        src: getImagePath('/assets/Projects/rasan-faleg-2/1.webp'),
        alt: {
          ar: 'نموذج المشروع والتصميم العام',
          en: 'Project model and overall design'
        }
      },
      {
        src: getImagePath('/assets/Projects/rasan-faleg-2/2.webp'),
        alt: {
          ar: 'مراحل البناء والإنشاء',
          en: 'Construction and building phases'
        }
      },
      {
        src: getImagePath('/assets/Projects/rasan-faleg-2/3.webp'),
        alt: {
          ar: 'الهيكل الإنشائي المتطور',
          en: 'Advanced structural framework'
        }
      },
      {
        src: getImagePath('/assets/Projects/rasan-faleg-2/4.webp'),
        alt: {
          ar: 'البنية التحتية والمرافق',
          en: 'Infrastructure and facilities'
        }
      }
    ]
  },
  {
    id: 3,
    title: {
      ar: 'العماير مرسية',
      en: 'Al-Amayer Murcia'
    },
    value: '4,200,000',
    description: {
      ar: 'تحفة معمارية سكنية تواكب طموحات المملكة 2030',
      en: 'A residential architectural masterpiece aligning with Saudi Vision 2030 ambitions'
    },
    fullDescription: {
      ar: `العماير مرسية يمثل نقلة نوعية في مفهوم السكن العمودي، حيث يجمع بين الكفاءة والجمال والاستدامة. تم تصميم المشروع ليواكب التطور العمراني المتسارع في الرياض مع الحفاظ على الهوية المحلية.`,
      en: `Al-Amayer Murcia represents a qualitative shift in the concept of vertical living, combining efficiency, beauty, and sustainability. The project is designed to keep pace with rapid urban development in Riyadh while preserving local identity.`
    },
    location: {
      ar: 'الرياض',
      en: 'Riyadh'
    },
    type: {
      ar: 'سكني',
      en: 'Residential'
    },
    timeline: {
      ar: '20 شهر',
      en: '20 months'
    },
    status: {
      ar: 'تحت الإنشاء',
      en: 'Under Construction'
    },
    scope: {
      ar: [
        'الهيكل الإنشائي المتطور',
        'أنظمة الطاقة الذكية',
        'التصميم الداخلي المتميز',
        'أنظمة الأمن والمراقبة',
        'المرافق الترفيهية المتكاملة',
        'التشطيبات المستدامة'
      ],
      en: [
        'Advanced structural system',
        'Smart energy systems',
        'Distinguished interior design',
        'Security and surveillance systems',
        'Integrated recreational facilities',
        'Sustainable finishing works'
      ]
    },
    achievements: {
      ar: [
        'تصميم مستدام يحقق شهادات الطاقة',
        'تقدم ملحوظ في مراحل التنفيذ',
        'استخدام تقنيات البناء الحديثة',
        'التزام بمعايير الجودة العالمية'
      ],
      en: [
        'Sustainable design achieving energy certifications',
        'Remarkable progress in implementation phases',
        'Use of modern construction technologies',
        'Commitment to global quality standards'
      ]
    },
    images: [
      {
        src: getImagePath('/assets/Projects/amayer-murcia/1.webp'),
        alt: {
          ar: 'التصميم المعماري الخارجي',
          en: 'External architectural design'
        }
      },
      {
        src: getImagePath('/assets/Projects/amayer-murcia/2.webp'),
        alt: {
          ar: 'الأعمال الإنشائية',
          en: 'Structural works'
        }
      },
      {
        src: getImagePath('/assets/Projects/amayer-murcia/3.webp'),
        alt: {
          ar: 'تخطيط الوحدات السكنية',
          en: 'Residential units planning'
        }
      },
      {
        src: getImagePath('/assets/Projects/amayer-murcia/4.webp'),
        alt: {
          ar: 'المرافق والخدمات المشتركة',
          en: 'Common facilities and services'
        }
      }
    ]
  },
  {
    id: 4,
    title: {
      ar: 'العمارية',
      en: 'Al-Amariyah'
    },
    value: '3,800,000',
    description: {
      ar: 'بيئة سكنية مستدامة تدمج الرفاهية مع المسؤولية البيئية',
      en: 'A sustainable residential environment integrating luxury with environmental responsibility'
    },
    fullDescription: {
      ar: `العمارية ليس مجرد مكان للسكن، بل هو نموذج للعيش المستدام الذي يحترم البيئة ويوفر أعلى مستويات الراحة. المشروع صُمم ليكون قدوة في مجال البناء الأخضر مع عدم المساس بالفخامة والجمال.`,
      en: `Al-Amariyah is not just a place to live, but a model of sustainable living that respects the environment while providing the highest levels of comfort. The project is designed to be exemplary in green building without compromising luxury and beauty.`
    },
    location: {
      ar: 'الرياض',
      en: 'Riyadh'
    },
    type: {
      ar: 'سكني',
      en: 'Residential'
    },
    timeline: {
      ar: '18 شهر',
      en: '18 months'
    },
    status: {
      ar: 'تحت الإنشاء',
      en: 'Under Construction'
    },
    scope: {
      ar: [
        'أنظمة الاستدامة المتكاملة',
        'الهيكل الإنشائي المبتكر',
        'أنظمة الطاقة المتجددة',
        'التصميم البيئي المتكامل',
        'التشطيبات الخضراء',
        'البنية التحتية المستدامة'
      ],
      en: [
        'Integrated sustainability systems',
        'Innovative structural system',
        'Renewable energy systems',
        'Integrated environmental design',
        'Green finishing works',
        'Sustainable infrastructure'
      ]
    },
    achievements: {
      ar: [
        'تصميم بيئي رائد في المنطقة',
        'تطبيق معايير البناء الأخضر',
        'كفاءة طاقة تتجاوز التوقعات',
        'مشروع نموذجي للاستدامة'
      ],
      en: [
        'Pioneering environmental design in the region',
        'Application of green building standards',
        'Energy efficiency exceeding expectations',
        'Exemplary sustainability project'
      ]
    },
    images: [
      {
        src: getImagePath('/assets/Projects/amariyah/1.webp'),
        alt: {
          ar: 'التصميم المستدام والمساحات الخضراء',
          en: 'Sustainable design and green spaces'
        }
      },
      {
        src: getImagePath('assets/projects/amariyah/2.webp'),
        alt: {
          ar: 'أنظمة الطاقة الشمسية',
          en: 'Solar energy systems'
        }
      },
      {
        src: getImagePath('assets/projects/amariyah/3.webp'),
        alt: {
          ar: 'أعمال البناء المستدام',
          en: 'Sustainable construction works'
        }
      },
      {
        src: getImagePath('assets/projects/amariyah/4.webp'),
        alt: {
          ar: 'التفاصيل المعمارية الخضراء',
          en: 'Green architectural details'
        }
      }
    ]
  },
  {
    id: 5,
    title: {
      ar: 'فرسان 1 - 24 فيلا',
      en: 'Fursan 1 - 24 Villas'
    },
    value: '4,500,000',
    description: {
      ar: 'تحفة سكنية تجسد فن العيش الراقي في مجتمع متكامل الخدمات',
      en: 'A residential masterpiece embodying the art of luxurious living in an integrated services community'
    },
    fullDescription: {
      ar: `فرسان 1 يمثل ذروة التميز في مجال الفلل السكنية، حيث تم تصميم 24 فيلا بتصاميم فريدة تجمع بين الأصالة العربية واللمسات العصرية. كل فيلا هي تحفة معمارية قائمة بذاتها ضمن مجتمع متكامل.`,
      en: `Fursan 1 represents the pinnacle of excellence in residential villas, with 24 villas designed with unique designs blending Arabic authenticity with contemporary touches. Each villa is an architectural masterpiece within an integrated community.`
    },
    location: {
      ar: 'الرياض',
      en: 'Riyadh'
    },
    type: {
      ar: 'سكني',
      en: 'Residential'
    },
    timeline: {
      ar: '22 شهر',
      en: '22 months'
    },
    status: {
      ar: 'مكتمل',
      en: 'Completed'
    },
    scope: {
      ar: [
        'تصميم وتنفيذ 24 فيلا',
        'البنية التحتية المتكاملة',
        'المرافق والخدمات المشتركة',
        'أنظمة الأمن والسلامة',
        'التشطيبات الفاخرة',
        'المناظر الطبيعية والمساحات الخضراء'
      ],
      en: [
        'Design and implementation of 24 villas',
        'Integrated infrastructure',
        'Common facilities and services',
        'Security and safety systems',
        'Luxury finishing works',
        'Landscaping and green spaces'
      ]
    },
    achievements: {
      ar: [
        'تسليم المشروع قبل الموعد المحدد',
        'جودة تنفيذ تتجاوز التوقعات',
        'رضا العملاء بنسبة 100%',
        'تصميم حائز على إشادات محلية ودولية',
        'استخدام مواد بناء عالية الجودة'
      ],
      en: [
        'Project delivery ahead of schedule',
        'Execution quality exceeding expectations',
        '100% customer satisfaction',
        'Design receiving local and international acclaim',
        'Use of high-quality building materials'
      ]
    },
    images: [
      {
        src: getImagePath('/assets/Projects/fursan-1/1.webp'),
        alt: {
          ar: 'الواجهة الرئيسية للفلل',
          en: 'Main villas facade'
        }
      },
      {
        src: getImagePath('/assets/Projects/fursan-1/2.webp'),
        alt: {
          ar: 'التصميم الداخلي الفاخر',
          en: 'Luxurious interior design'
        }
      },
      {
        src: getImagePath('/assets/Projects/fursan-1/3.webp'),
        alt: {
          ar: 'المساحات الخضراء والحدائق',
          en: 'Green spaces and gardens'
        }
      },
      {
        src: getImagePath('/assets/Projects/fursan-1/4.webp'),
        alt: {
          ar: 'المرافق الترفيهية المتكاملة',
          en: 'Integrated recreational facilities'
        }
      }
    ]
  }
];