import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(textRef.current, 
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      )
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1"
      )
      .fromTo(".hero-element",
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "back.out(1.5)" },
        "-=0.8"
      );

      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-20 md:pb-32 z-10 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-background to-background pointer-events-none" />
      
      <div className="hero-content z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="hero-element mb-6 md:mb-8 glass px-6 py-2 md:px-8 md:py-3 rounded-full inline-flex items-center gap-2 md:gap-3">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold animate-pulse" />
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">A Day To Celebrate</span>
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
        </div>
        
        <h1 ref={textRef} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight md:leading-none mb-6 md:mb-8 will-change-transform">
          Happy <br />
          <span className="text-gradient">Birthday</span>
        </h1>
        
        <p ref={subtitleRef} className="text-base sm:text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed will-change-transform px-4">
          Idhal ni hai kuch baby  just scroll down
        </p>

        <div className="hero-element mt-16 md:mt-24 animate-bounce text-gold/60 flex flex-col items-center gap-3 md:gap-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">Begin</span>
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </section>
  );
}
