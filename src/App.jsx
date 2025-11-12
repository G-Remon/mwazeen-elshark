import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Eagerly load Home component - it's the LCP candidate and must render immediately
import Home from './pages/Home';

// Lazy load other pages - not critical for initial render
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const PriceRequest = lazy(() => import('./pages/PriceRequest'));
const Services = lazy(() => import('./pages/Services'));
const ClientsSection = lazy(() => import('./components/ClientsSection'));

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
    // Prefetch non-critical pages after initial render - doesn't block LCP
    const prefetchPages = () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduler = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
      
      scheduler(() => {
        if (window.location.pathname === '/') {
          // Prefetch popular pages after initial render
          Promise.all([
            import('./pages/Projects'),
            import('./pages/Services')
          ]).catch(() => {}); // Silently fail if prefetch fails
        }
      });
    };
    
    prefetchPages();
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-light flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              {/* Home is eagerly loaded - no Suspense needed */}
              <Route path="/" element={<Home />} />
              {/* Other routes use lazy loading */}
              <Route path="/about" element={
                <OptimizedSuspense>
                  <About />
                </OptimizedSuspense>
              } />
              <Route path="/projects" element={
                <OptimizedSuspense>
                  <Projects />
                </OptimizedSuspense>
              } />
              <Route path="/projects/:id" element={
                <OptimizedSuspense>
                  <ProjectDetail />
                </OptimizedSuspense>
              } />
              <Route path="/contact" element={
                <OptimizedSuspense>
                  <Contact />
                </OptimizedSuspense>
              } />
              <Route path="/ClientsSection" element={
                <OptimizedSuspense>
                  <ClientsSection />
                </OptimizedSuspense>
              } />
              <Route path="/price-request" element={
                <OptimizedSuspense>
                  <PriceRequest />
                </OptimizedSuspense>
              } />
              <Route path="/services" element={
                <OptimizedSuspense>
                  <Services />
                </OptimizedSuspense>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;