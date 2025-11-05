import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Defer Web Vitals reporting - doesn't block initial render
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function && typeof window !== 'undefined') {
    // Load web-vitals asynchronously after initial render
    requestIdleCallback(() => {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      }).catch(() => {}); // Silently fail in production
    }, { timeout: 5000 });
  }
};

// Polyfill for requestIdleCallback
if (typeof window !== 'undefined' && !window.requestIdleCallback) {
  window.requestIdleCallback = (cb, options) => {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, options?.timeout || 1);
  };
  window.cancelIdleCallback = (id) => clearTimeout(id);
}

// Initialize React immediately - no blocking code before this
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Render immediately - no error handling that delays render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Error boundary will handle errors in production

// Report Web Vitals - deferred to not block initial render
if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV === 'development') {
    // Only log in development
    reportWebVitals((metric) => {
      // eslint-disable-next-line no-console
      if (console && console.log) console.log(metric);
    });
  } else {
    // In production, send to analytics after page load
    reportWebVitals((metric) => {
      const body = JSON.stringify(metric);
      const url = '/api/web-vitals';
      
      // Use sendBeacon for non-blocking analytics
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
      } else {
        fetch(url, { body, method: 'POST', keepalive: true }).catch(() => {});
      }
    });
  }

  // Register service worker after page load - doesn't block LCP
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      requestIdleCallback(() => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      }, { timeout: 5000 });
    });
  }
}

export { reportWebVitals };