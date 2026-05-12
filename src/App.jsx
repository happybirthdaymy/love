import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import Story from './components/Story';
import Reveal from './components/Reveal';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-t-2 border-r-2 border-primary rounded-full animate-spin" />
              <div className="text-white/60 tracking-[0.2em] uppercase text-sm animate-pulse">Loading Experience</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full overflow-hidden bg-[#050505] text-white font-sans selection:bg-fuchsia-500/30">
        <div className="fixed top-0 left-0 w-full h-[100svh] z-0 pointer-events-none">
          <Scene3D />
        </div>
        
        <main className="relative z-10 w-full">
          <Hero />
          <Story />
          <Reveal />
        </main>
      </div>
    </>
  );
}

export default App;
