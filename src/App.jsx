import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
import { AnimatePresence, motion } from 'framer-motion';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import Story from './components/Story';
import Reveal from './components/Reveal';
import NoPage from './components/NoPage';
import CelebratePage from './components/CelebratePage';
import SecurityPage from './components/SecurityPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize page from browser history, or default to security
  const [page, setPage] = useState(() => {
    return window.history.state?.page || 'security';
  });
  
  const [lenisInstance, setLenisInstance] = useState(null);

  // Handle browser back/forward buttons natively
  useEffect(() => {
    const handlePopState = (event) => {
      setPage(event.state?.page || 'main');
    };

    window.addEventListener('popstate', handlePopState);
    
    // Register the very first page load in history so 'back' works correctly
    if (!window.history.state) {
      window.history.replaceState({ page }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Use this custom function to change pages so it adds to browser history
  const navigateTo = (newPage) => {
    if (page !== newPage) {
      window.history.pushState({ page: newPage }, '');
      setPage(newPage);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isLoading]);
  // Lock/unlock scroll when page changes
  useEffect(() => {
    if (page === 'no') {
      if (lenisInstance) lenisInstance.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenisInstance) lenisInstance.start();
      document.body.style.overflow = '';
    }

    if (page === 'main') {
      // Refresh ScrollTrigger after the main page is set back to display: block
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [page, lenisInstance]);

  const handleNo = () => navigateTo('no');
  const handleYes = () => navigateTo('celebrate');

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-t-2 border-r-2 border-primary rounded-full animate-spin" />
              <div className="text-white/60 tracking-[0.2em] uppercase text-sm animate-pulse">
                Loading Experience
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        3D scene: fixed behind everything, with its own dark background.
        This is the background for BOTH the main page and NoPage.
      */}
      <div
        className="fixed top-0 left-0 w-full h-[100svh] z-0 pointer-events-none"
        style={{ background: '#050505' }}
      >
        <Scene3D />
      </div>

      {/* Main page — transparent background so 3D scene shows through */}
      <div
        className="relative text-white font-sans selection:bg-fuchsia-500/30"
        style={{
          display: page === 'main' ? 'block' : 'none',
          // No background color — the fixed Scene3D div above provides it
        }}
      >
        <main className="relative z-10 w-full">
          <Hero />
          <Story />
          <Reveal onNo={handleNo} onYes={handleYes} />
        </main>
      </div>

      {/* No Page */}
      <AnimatePresence>
        {page === 'no' && (
          <NoPage onYes={handleYes} onNo={handleNo} />
        )}
      </AnimatePresence>

      {/* Celebrate Page */}
      <AnimatePresence>
        {page === 'celebrate' && (
          <CelebratePage />
        )}
      </AnimatePresence>
      {/* Security Page */}
      <AnimatePresence>
        {page === 'security' && (
          <SecurityPage onUnlock={() => navigateTo('main')} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
