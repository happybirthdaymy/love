import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function Reveal() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const hasFired = useRef(false);

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // Glow background reveal
      gsap.to(".glow-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
          onEnter: () => {
            if (!hasFired.current) {
              hasFired.current = true;
              fireConfetti();
            }
          }
        },
        opacity: 1,
        scale: 1.5,
        duration: 2
      });

      // Typewriter Effect tied to scroll - stretched out for a slower reveal
      const typeTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 1.5,
        }
      });

      typeTl.to(".type-char", {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        duration: 2
      })
      .to(".button-reveal", {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const typewriterText = "Haa chaliye abb in dono me se kisi ek pe click kariye aur galti se bhi no click mat kariyega...";

  return (
    <section ref={containerRef} className="relative flex flex-col items-center justify-center min-h-screen pt-20 md:pt-32 pb-[50vh] px-4 md:px-12 overflow-hidden z-10">
      <div className="glow-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gold/20 blur-[100px] md:blur-[150px] rounded-full opacity-0 pointer-events-none" />

      <div ref={textContainerRef} className="flex flex-col items-center justify-center relative z-10 w-full max-w-4xl px-2">
        <div className="flex flex-wrap justify-center mb-10 md:mb-12 text-center">
          <p className="text-xl sm:text-2xl md:text-4xl font-semibold text-gold tracking-wide leading-relaxed">
            {typewriterText.split(' ').map((word, wi, arr) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split('').map((char, ci) => (
                  <span key={ci} className="type-char opacity-0 inline-block will-change-transform">
                    {char}
                  </span>
                ))}
                {wi < arr.length - 1 && (
                  <span className="type-char opacity-0 inline-block will-change-transform">&nbsp;</span>
                )}
              </span>
            ))}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center button-reveal opacity-0 scale-90 translate-y-8 w-full sm:w-auto">
          <button 
            onClick={fireConfetti}
            className="w-full sm:w-auto px-10 py-3 md:px-12 md:py-4 bg-gradient-to-r from-gold to-primary text-black rounded-full font-bold text-lg md:text-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            Yes
          </button>
          
          <button 
            className="w-full sm:w-auto px-10 py-3 md:px-12 md:py-4 bg-gradient-to-r from-gold to-primary text-black rounded-full font-bold text-lg md:text-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}
