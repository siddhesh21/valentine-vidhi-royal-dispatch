import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

// We inject the font styles directly here for the "One-File" demo to work instantly
const fontLink = document.createElement('link');
fontLink.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// Add Tailwind CDN for the demo if not present
if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
  const script = document.createElement('script');
  script.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(script);
}

const RoyalLetter = () => {
  // States: 'flying', 'arrived', 'sealed', 'unrolling', 'reading'
  const [stage, setStage] = useState('flying');
  const getTimeLeft = useCallback(() => {
    const targetDate = new Date('2026-03-14T00:00:00+05:30');
    const difference = targetDate.getTime() - Date.now();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  // Simulation of the flight duration
  useEffect(() => {
    if (stage === 'flying') {
      const timer = setTimeout(() => {
        setStage('arrived');
      }, 4000); // 4 seconds flight time
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeLeft]);

  // Bridgerton Theme Configuration
  const theme = {
    bg: "bg-[#fdf6e3]", // Ivory/Cream
    gold: "border-[#d4af37]", // Metallic Gold
    goldText: "text-[#d4af37]",
    wine: "bg-[#722f37]", // Red Wine
    wineText: "text-[#722f37]",
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${theme.bg} overflow-hidden relative font-['Cinzel']`}>
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      {/* --- STAGE 1: THE FLIGHT (Ireland to India) --- */}
      {stage === 'flying' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-4xl p-4">
          <h2 className={`text-xl md:text-2xl ${theme.goldText} mb-8 tracking-widest uppercase text-center font-bold`}>
            Dispatched: Ireland to India
          </h2>

          <div className={`relative w-full h-48 md:h-64 border-t border-b ${theme.gold}/30 flex items-center justify-between px-4 md:px-10`}>
            {/* Map Line SVG */}
            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
              <path
                d="M 50 128 Q 400 -50 900 128"
                fill="transparent"
                stroke="#d4af37"
                strokeWidth="2"
                strokeDasharray="10 10"
                className="opacity-50"
              />
            </svg>

            {/* Ireland Node */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]`}></div>
              <span className={`mt-2 ${theme.goldText} text-xs md:text-sm tracking-widest`}>IRELAND</span>
            </div>

            {/* Flying Envelope Icon */}
            <div className="absolute z-20 animate-fly-across">
              <div className={`w-10 h-7 md:w-12 md:h-8 bg-[#f3e5ab] border ${theme.gold} shadow-lg flex items-center justify-center transform -rotate-12`}>
                <span className={`text-[8px] ${theme.goldText}`}>✉</span>
              </div>
            </div>

            {/* India Node */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#d4af37] animate-pulse"></div>
              <span className={`mt-2 ${theme.goldText} text-xs md:text-sm tracking-widest`}>INDIA</span>
              <span className="text-[10px] text-gray-400">7,618 km</span>
            </div>
          </div>
          <p className={`mt-8 ${theme.goldText} animate-pulse italic`}>Traversing the distance...</p>
        </div>
      )}

      {/* --- STAGE 2: ARRIVED (Click to Pick Up) --- */}
      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4" onClick={() => setStage('sealed')}>
          <div className={`w-64 h-40 bg-[#f3e5ab] border-2 ${theme.gold} shadow-2xl flex items-center justify-center relative transform hover:scale-105 transition-transform duration-500`}>
            <span className={`${theme.goldText} font-bold tracking-widest`}>YOU HAVE MAIL</span>
            {/* Postage Stamp simulation */}
            <div className="absolute top-2 right-2 w-12 h-14 border border-gray-300 bg-white opacity-80 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-gray-400"></div>
            </div>
          </div>
          <p className={`text-center mt-4 ${theme.wineText} text-sm tracking-widest uppercase`}>Click to Retrieve</p>
        </div>
      )}

      {/* --- STAGE 3: THE SEALED ENVELOPE (With Timer) --- */}
      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up p-4 flex flex-col items-center">

          {/* --- ROMANTIC COUNTDOWN TIMER --- */}
          <div className="mb-10 text-center animate-fade-in">
            <p className={`text-xl ${theme.wineText} font-script mb-2`}>Until our stars align...</p>
            <div className={`flex gap-4 md:gap-6 ${theme.wineText} font-serif items-end justify-center`}>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Days</span>
              </div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Hours</span>
              </div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Mins</span>
              </div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold animate-pulse">{timeLeft.seconds}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Secs</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button onClick={() => setStage('flying')} className={`absolute top-0 right-0 md:-right-12 ${theme.goldText} hover:text-[#722f37] transition-colors`}>
            <X size={24} />
          </button>

          {/* The Envelope */}
          <div className="w-80 h-56 bg-[#f3e5ab] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center relative border-t-2 border-[#e6d0a1]">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-[#ebdcb2] border-r-[160px] border-r-transparent"></div>
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[112px] border-t-[#dcc694]/50 border-r-[160px] border-r-transparent transform rotate-180 origin-top z-10 filter drop-shadow-md"></div>

            {/* The Seal */}
            <button
              onClick={() => setStage('unrolling')}
              className={`z-20 w-16 h-16 rounded-full ${theme.wine} border-4 border-[#5e2129] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer`}
              style={{ boxShadow: 'inset 0 0 10px #3f1016, 0 4px 6px rgba(0,0,0,0.3)' }}
            >
              <span className={`text-[#d4af37] font-serif text-2xl font-bold italic`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>SV</span>
            </button>
          </div>
          <p className="text-center mt-8 text-[#2c2c2c] italic font-light font-serif">"Break the seal to reveal the message"</p>
        </div>
      )}

      {/* --- STAGE 4: THE SCROLL / LETTER --- */}
      {(stage === 'unrolling' || stage === 'reading') && (
        <div className="relative w-full max-w-lg perspective-1000 p-4">
          <div className={`bg-[#fdf6e3] relative shadow-2xl mx-auto overflow-hidden transition-all duration-[2000ms] ease-in-out border ${theme.gold}/30 ${stage === 'unrolling' ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'}`}
            onTransitionEnd={() => {
              if (stage === 'unrolling') setStage('reading');
            }}>

            {/* Paper Texture & Decorative Corners */}
            <div className={`absolute top-0 left-0 w-full h-2 ${theme.gold}/20`}></div>
            <div className={`absolute bottom-0 left-0 w-full h-2 ${theme.gold}/20`}></div>

            <div className="p-8 md:p-12 text-center">
              {/* Header Date/Place */}
              <div className={`flex justify-between ${theme.wineText} text-[10px] md:text-xs uppercase tracking-widest mb-8 border-b ${theme.gold} pb-4 font-bold`}>
                <span>Dublin, Ireland</span>
                <span>14th February, 2026</span>
                <span>Mumbai, India</span>
              </div>

              {/* The Body Text */}
              <div className="font-['Great_Vibes'] text-md md:text-xl leading-relaxed text-[#2c2c2c] space-y-6 text-left opacity-90">
                <p>
                  <span className={`text-4xl md:text-5xl float-left mr-2 ${theme.wineText} font-bold font-['Cinzel']`}>M</span>
                  y Dearest,
                </p>
                <p>If this letter has reached you,
                  I imagine you reading it with that familiar, gentle smile —
                  the one that appears before you realise it has.</p>
                <p>
                  There are moments of you I carry always:
                  the way you grow quiet when something truly matters,
                  the way your laughter lingers,
                  the way you pretend not to notice how deeply you are loved.
                </p>
                <p>
                  You are my calm in uncertainty,
                  my laughter in quiet moments,
                  and the warmth I carry even when nights feel long.
                </p>
                <p>I promise you not perfection,
                  but patience,
                  presence,
                  and a love that moves steadily toward you.
                </p>
                <p>
                  Until distance becomes only a memory,
                  let this remain where it belongs —
                  close, and certain.
                </p>
                <p className="mt-8 text-right">
                  Yours Love,<br />
                  <span className={`font-bold ${theme.wineText} text-2xl md:text-3xl`}>Siddhesh</span>
                </p>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setStage('flying')}
                className={`mt-12 text-xs uppercase tracking-widest ${theme.goldText} hover:text-[#722f37] transition-colors border-b border-transparent hover:border-[#722f37] font-['Cinzel']`}
              >
                Close & Restart
              </button>
            </div>
          </div>

          {/* Scroll Initial Trigger (only visible right before unwinding visually starts) */}
          {stage === 'unrolling' && (
            <div ref={(el) => { if (el) setTimeout(() => setStage('reading'), 100); }} className="hidden"></div>
          )}
        </div>
      )}

      {/* CSS for custom animations */}
      <style>{`
        @keyframes fly-across {
          0% { left: 10%; top: 50%; transform: translate(-50%, -50%) rotate(-5deg) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 90%; top: 50%; transform: translate(-50%, -50%) rotate(5deg) scale(1); }
        }
        .animate-fly-across {
          position: absolute;
          animation: fly-across 4s ease-in-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default RoyalLetter;
