// components/PriceRequestForm.jsx
import React, { useState, useEffect } from 'react'; // تم إضافة useEffect
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const PriceRequestForm = () => {
    const { language, isArabic } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        projectType: '',
        address: '',
        details: ''
    });

    // إضافة useEffect لإدارة مؤقت إخفاء الرسالة
    useEffect(() => {
        let timer;
        if (submitStatus) {
            timer = setTimeout(() => {
                setSubmitStatus(null);
            }, 10000); // 10 ثواني
        }
        
        // تنظيف المؤقت عند إلغاء تحميل المكون
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [submitStatus]); // يعتمد على حالة submitStatus

    // باقي الكود يبقى كما هو...
    const content = {
        ar: {
            title: "طلب عرض السعر",
            description: "املأ النموذج أدناه وسنقوم بالاتصال بك خلال 24 ساعة",
            fullName: "الاسم الكامل",
            phone: "رقم الهاتف",
            email: "البريد الإلكتروني",
            projectType: "نوع المشروع",
            address: "المدينة / العنوان",
            projectDetails: "تفاصيل المشروع",
            submit: "إرسال الطلب",
            submitting: "جاري الإرسال...",
            success: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً.",
            error: "حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.",
            selectOption: "اختر نوع المشروع",
            residential: "سكني",
            commercial: "تجاري",
            industrial: "صناعي",
            maintenance: "صيانة",
            other: "أخرى"
        },
        en: {
            title: "Request a Quote",
            description: "Fill out the form below and we'll contact you within 24 hours",
            fullName: "Full Name",
            phone: "Phone Number",
            email: "Email Address",
            projectType: "Project Type",
            address: "City / Address",
            projectDetails: "Project Details",
            submit: "Submit Request",
            submitting: "Submitting...",
            success: "Your request has been submitted successfully! We'll contact you soon.",
            error: "An error occurred while submitting. Please try again.",
            selectOption: "Select Project Type",
            residential: "Residential",
            commercial: "Commercial",
            industrial: "Industrial",
            maintenance: "Maintenance",
            other: "Other"
        }
    };

    const currentContent = content[language];

    const projectTypes = [
        { value: 'residential', label: currentContent.residential },
        { value: 'commercial', label: currentContent.commercial },
        { value: 'industrial', label: currentContent.industrial },
        { value: 'maintenance', label: currentContent.maintenance },
        { value: 'other', label: currentContent.other }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return false;
        if (!formData.phone.trim()) return false;
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return false;
        if (!formData.projectType) return false;
        return true;
    };

    // حل JSONP لتجنب مشكلة CORS
    const submitToGoogleSheet = (data) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

            const url = new URL('https://script.google.com/macros/s/AKfycbyrhJt3P1GU8NqwWisqccQWQb2sV_HArb_WRLdzVWJTGGfFBrAfOURSlejcYp2xy_aDqA/exec');

            // إضافة البيانات كمعلمات query
            Object.keys(data).forEach(key => {
                url.searchParams.append(key, data[key]);
            });

            url.searchParams.append('callback', callbackName);

            window[callbackName] = function (response) {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(response);
            };

            script.src = url;
            document.body.appendChild(script);

            // وقت الاستجابة
            setTimeout(() => {
                if (window[callbackName]) {
                    delete window[callbackName];
                    document.body.removeChild(script);
                    reject(new Error('Timeout'));
                }
            }, 10000);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus({ type: 'error', message: currentContent.error });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // البحث عن التسمية العربية لنوع المشروع
            const arabicProjectType = projectTypes.find(
                type => type.value === formData.projectType
            )?.label || formData.projectType;

            const submissionData = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                projectType: isArabic ? arabicProjectType : formData.projectType,
                address: formData.address,
                details: formData.details,
                source: 'website'
            };

            await submitToGoogleSheet(submissionData);

            setSubmitStatus({ type: 'success', message: currentContent.success });
            setFormData({
                name: '',
                phone: '',
                email: '',
                projectType: '',
                address: '',
                details: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus({ type: 'error', message: currentContent.error });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClassName = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${isArabic ? 'text-right' : 'text-left'
        }`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-700 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    {currentContent.title}
                </h2>
                <p className="text-blue-100 text-center">
                    {currentContent.description}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {currentContent.fullName}
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder={currentContent.fullName}
                            dir={isArabic ? 'rtl' : 'ltr'}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {currentContent.phone}
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder={currentContent.phone}
                            dir={isArabic ? 'rtl' : 'ltr'}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {currentContent.email}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder={currentContent.email}
                            dir={isArabic ? 'rtl' : 'ltr'}
                            required
                        />
                    </div>

                    {/* Project Type */}
                    <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {currentContent.projectType}
                        </label>
                        <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className={inputClassName}
                            dir={isArabic ? 'rtl' : 'ltr'}
                            required
                        >
                            <option value="">{currentContent.selectOption}</option>
                            {projectTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {currentContent.address}
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder={currentContent.address}
                            dir={isArabic ? 'rtl' : 'ltr'}
                        />
                    </div>

                    {/* Project Details */}
                    <div className="md:col-span-2">
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {currentContent.projectDetails}
                        </label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows={4}
                            className={inputClassName}
                            placeholder={currentContent.projectDetails}
                            dir={isArabic ? 'rtl' : 'ltr'}
                        />
                    </div>
                </div>

                {/* Status Message */}
                {submitStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }} // إضافة خروج سلس
                        className={`mt-6 p-4 rounded-lg text-center ${submitStatus.type === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-red-100 text-red-700 border border-red-200'
                            }`}
                    >
                        {submitStatus.message}
                    </motion.div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-primary to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                {currentContent.submitting}
                            </>
                        ) : (
                            currentContent.submit
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default PriceRequestForm;