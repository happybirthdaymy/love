import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const messages = [
  { id: 1, text: "Another beautiful trip around the sun... ☀️", subtitle: "And what an amazing journey it has been.", align: "center", icon: <Sparkles className="text-gold w-5 h-5 md:w-6 md:h-6" /> },
  { id: 2, text: "You bring so much light into the world.", subtitle: "Every single day you make things brighter.", align: "center", icon: <Heart className="text-primary w-5 h-5 md:w-6 md:h-6" /> },
  { id: 3, text: "So today, we celebrate YOU.", subtitle: "Your energy, your smile, and everything that makes you unique.", align: "center", icon: <Sparkles className="text-gold w-5 h-5 md:w-6 md:h-6" /> },
  { id: 4, text: "May this year bring you closer to your dreams.", subtitle: "Because you truly deserve all the happiness.", align: "center", icon: <Heart className="text-primary w-5 h-5 md:w-6 md:h-6" /> },
  { id: 5, text: "HAPPYYY WALAAA BIRTHDAYYY BABUA✨️", subtitle: "Bhot angrezi bol diya na? Chaliye hindi me hi baat karte hai...", align: "center", icon: <Sparkles className="text-gold w-5 h-5 md:w-6 md:h-6" />, emphasis: true },
];

export default function Story() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Start fading in when the card reaches 90% down
            end: "bottom 10%", // Fade out when the card reaches 10% from the top
            scrub: 1.5,
          }
        });

        tl.fromTo(card, 
          { opacity: 0, y: 100, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" } // FADE IN
        )
        .to(card, 
          { opacity: 0, y: -100, scale: 0.9, duration: 1, ease: "power2.in" }, // FADE OUT
          "+=0.5" // Short pause at full opacity while scrolling
        );

      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 md:py-32 px-4 md:px-12 z-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-[80vh] py-[30vh]">
        {messages.map((msg, i) => (
          <div 
            key={msg.id} 
            className="flex w-full justify-center"
          >
            <div 
              ref={el => cardsRef.current[i] = el}
              className={`glass-card p-6 sm:p-10 md:p-14 rounded-3xl md:rounded-[2.5rem] transform-gpu will-change-transform flex flex-col items-center text-center gap-3 md:gap-4 relative group ${
                msg.emphasis ? 'max-w-[92%] w-full sm:max-w-lg md:max-w-3xl' : 'max-w-[90%] md:max-w-2xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl md:rounded-[2.5rem] pointer-events-none" />
              
              <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
                {msg.icon}
              </div>
              
              <h3
                className={`font-medium text-white/95 relative z-10 text-balance break-words hyphens-auto ${
                  msg.emphasis
                    ? 'text-lg leading-[1.3] tracking-tight sm:text-2xl sm:leading-snug md:text-4xl md:leading-tight lg:text-5xl'
                    : 'text-2xl sm:text-3xl md:text-5xl leading-snug md:leading-tight tracking-tight'
                }`}
              >
                {msg.text}
              </h3>
              
              <p className="text-base sm:text-lg md:text-2xl font-light text-white/60 relative z-10 mt-1 md:mt-2">
                {msg.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
