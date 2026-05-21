import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SecurityPage({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '10263066') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setCode('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ willChange: 'opacity' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(244,63,94,0.1)_0%,_transparent_100%)] pointer-events-none" />
      
      {/* Floating particles for aesthetics */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.form 
        exit={{ opacity: 0, scale: 1.15, y: -20 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        style={{ willChange: 'transform, opacity' }}
        onSubmit={handleSubmit} 
        className="relative z-10 flex flex-col items-center gap-8 p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-[0.2em] mb-2 uppercase text-white/90">Restricted</h1>
          <p className="text-white/40 text-sm tracking-wide">Enter the security code to unlock this website</p>
        </div>

        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full relative"
        >
          <input
            type="text"
            style={{ WebkitTextSecurity: showCode ? 'none' : 'disc' }}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            data-form-type="other"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••••••"
            className={`w-full pl-12 pr-12 py-4 text-center text-xl tracking-[0.4em] bg-black/40 border rounded-2xl text-white outline-none focus:ring-4 transition-all placeholder:text-white/20 ${
              error ? 'border-red-500/50 focus:ring-red-500/20 text-red-400' : 'border-white/10 focus:border-white/30 focus:ring-white/10'
            }`}
            autoFocus
          />
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            onClick={() => setShowCode(!showCode)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-2"
            title={showCode ? "Hide code" : "Show code"}
          >
            {showCode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        </motion.div>

        <button
          type="submit"
          className="w-full py-4 bg-white/90 text-black font-semibold tracking-widest uppercase rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Unlock
        </button>
      </motion.form>
    </motion.div>
  );
}
