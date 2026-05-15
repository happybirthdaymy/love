import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function NoPage({ onYes, onNo }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // Set everything invisible to start
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, btnRef.current], {
      opacity: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Add each typing animation directly to the timeline so it waits for completion
    tl.add(typewriterAnimate(line1Ref.current), '+=0.4')
      .add(typewriterAnimate(line2Ref.current), '+=0.3')
      .add(typewriterAnimate(line3Ref.current), '+=0.3')
      // Buttons pop in 0.5s AFTER the last line finishes typing
      .to(btnRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '+=0.5');
  }, []);

  function typewriterAnimate(el) {
    if (!el) return gsap.timeline(); // return empty timeline if ref not found
    const chars = el.querySelectorAll('.tw-char');
    gsap.set(el, { opacity: 1 });
    // Return the tween so the main timeline knows how long it takes
    return gsap.fromTo(chars,
      { opacity: 0 },
      { opacity: 1, stagger: 0.04, duration: 0.01, ease: 'none' }
    );
  }

  function toChars(text, extraClass = '') {
    return text.split(' ').map((word, wordIdx, arr) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap">
        {[...word].map((ch, chIdx) => (
          <span key={chIdx} className={`tw-char inline-block ${extraClass}`}>
            {ch}
          </span>
        ))}
        {wordIdx < arr.length - 1 && (
          <span className={`tw-char inline-block ${extraClass}`}>&nbsp;</span>
        )}
      </span>
    ));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // Full-screen, no background — 3D scene fixed in App shows through
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 md:px-12"
    >
      {/* Very subtle dark veil — same darkness as main page sections */}
      <div className="absolute inset-0 bg-[#050505]/60 pointer-events-none" />

      {/* Ambient glow — same gold/pink as main page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gold/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 md:gap-10 max-w-3xl w-full">

        {/* Line 1 */}
        <p ref={line1Ref} className="text-2xl sm:text-3xl md:text-5xl font-medium text-white/80 leading-snug tracking-tight opacity-0">
          {toChars('Bola tha na nhi click karne ispe?? 😒')}
        </p>

        {/* Line 2 */}
        <p ref={line2Ref} className="text-xl sm:text-2xl md:text-4xl font-medium text-white/70 leading-snug opacity-0">
          {toChars('Nhi maana na baat?? 😒')}
        </p>

        {/* Gold divider */}
        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Line 3 */}
        <p ref={line3Ref} className="text-base sm:text-lg md:text-2xl text-white/60 font-light leading-relaxed opacity-0">
          {toChars('Chalo abb ')}
          <span className="text-gold font-medium">
            {toChars("Let's Celebrate")}
          </span>
          {toChars(' pe click karo aur ')}
          <span className="text-primary font-medium">
            {toChars('No Celebration')}
          </span>
          {toChars(' pe nahi karna 😒')}
        </p>

        {/* Buttons */}
        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto opacity-0 translate-y-4 scale-90"
        >
          <button
            onClick={onYes}
            className="w-full sm:w-auto px-10 py-3 md:px-12 md:py-4 bg-gradient-to-r from-gold to-primary text-black rounded-full font-bold text-lg md:text-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            Let's Celebrate 😁
          </button>

          <button
            onClick={onNo}
            className="w-full sm:w-auto px-10 py-3 md:px-12 md:py-4 bg-gradient-to-r from-gold to-primary text-black rounded-full font-bold text-lg md:text-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            No Celebration 🙂
          </button>
        </div>
      </div>
    </motion.div>
  );
}
