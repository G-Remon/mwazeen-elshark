import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// تحميل كسول مع prefetching
const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import(/* webpackPreload: true */ './pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const PriceRequest = lazy(() => import('./pages/PriceRequest'));
const Services = lazy(() => import('./pages/Services'));

// مكون لتحسين تجربة التحميل
const OptimizedSuspense = ({ children }) => (
  <Suspense 
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
        <span className="mr-2">جاري التحميل...</span>
      </div>
    }
  >
    {children}
  </Suspense>
);

function App() {
  useEffect(() => {
    // Prefetch للصفحات المتوقعة
    const prefetchPages = async () => {
      if (window.location.pathname === '/') {
        // Prefetch للصفحات الرئيسية عند تحميل الصفحة الرئيسية
        const modules = [
          import('./pages/Projects'),
          import('./pages/Services')
        ];
        await Promise.all(modules);
      }
    };
    
    prefetchPages();
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-light flex flex-col">
          <NavBar />
          <main className="flex-grow ">
            <OptimizedSuspense>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/price-request" element={<PriceRequest />} />
                <Route path="/services" element={<Services />} />
              </Routes>
            </OptimizedSuspense>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;