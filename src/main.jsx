import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// وظيفة لتحسين Web Vitals والتقارير
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// وظيفة لتحميل الخطوط بشكل غير متزامن
const loadFonts = () => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.gstatic.com';
  link.crossOrigin = 'true';
  document.head.appendChild(link);
};

// وظيفة لإدارة حالة التحميل
const setupPerformanceMonitoring = () => {
  // تتبع Largest Contentful Paint
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP candidate:', lastEntry.startTime, lastEntry);
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
};

// تهيئة الأداء قبل تحميل React
if (typeof window !== 'undefined') {
  // تحميل الخطوط بشكل غير متزامن
  loadFonts();

  // إعداد مراقبة الأداء
  setupPerformanceMonitoring();

  // إعداد تحميل أولي للمكونات الحرجة
  const prefetchCriticalComponents = () => {
    const criticalPaths = ['/assets/js/vendor-react.js', '/assets/js/vendor-router.js'];

    criticalPaths.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = path;
      link.as = 'script';
      document.head.appendChild(link);
    });
  };

  // تأخير prefetch حتى يصبح الخادم غير مشغول
  setTimeout(prefetchCriticalComponents, 1000);
}

// تهيئة التطبيق مع معالجة الأخطاء
const root = ReactDOM.createRoot(document.getElementById('root'));

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render App:', error);

  // عرض واجهة خطأ بديلة
  const ErrorFallback = () => (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl'
    }}>
      <h1>عذراً، حدث خطأ</h1>
      <p>جاري إصلاح المشكلة، يرجى المحاولة مرة أخرى لاحقاً.</p>
      <button onClick={() => window.location.reload()}>
        إعادة تحميل الصفحة
      </button>
    </div>
  );

  root.render(<ErrorFallback />);
}

// تقرير Web Vitals في بيئة التطوير
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
} else {
  // في الإنتاج، أرسل التقارير إلى خدمة التحليلات
  reportWebVitals((metric) => {
    // يمكنك إرسال metric إلى Google Analytics أو أي خدمة تحليلات
    const body = JSON.stringify(metric);
    const url = '/api/web-vitals';

    // استخدام navigator.sendBeacon إذا كان متاحاً
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  });
}

// إضافة تحسينات إضافية للأداء
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// تصدير للاختبارات إذا لزم الأمر
export { reportWebVitals };