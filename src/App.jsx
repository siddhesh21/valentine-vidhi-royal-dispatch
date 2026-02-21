import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Star, Moon } from 'lucide-react';

const START_DATE_MS = new Date('2025-10-26T00:00:00+05:30').getTime();
const TARGET_DATE_MS = new Date('2026-03-14T00:00:00+05:30').getTime();
const TOTAL_DURATION_MS = TARGET_DATE_MS - START_DATE_MS;

const RoyalLetter = () => {
  const [stage, setStage] = useState('journey');
  const [page, setPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [daysPast, setDaysPast] = useState(0);
  const [stars, setStars] = useState([]);
  const [progress, setProgress] = useState(0);

  const pages = [
    {
      title: "Part I: Gravity",
      icon: "🌌",
      content: `My love for you feels like standing beneath a sky full of galaxies — aware of how small I am, yet certain of what I am drawn toward.

In a universe filled with wandering planets and silent vacuum, you are the gravity that steadies me. Not a black hole that consumes, but a sun that gives direction.

I have always admired the cosmos — its event horizons, its dwarf planets, its mysteries that refuse to be rushed. And loving you feels similar. 
Not something to conquer, but something to approach with respect, curiosity, and patience.`
    },
    {
      title: "Part II: Principle",
      icon: "🪐",
      content: `With you, I am not lost in space. I am anchored. I want to be the kind of man whose presence feels like home — strong without arrogance, gentle without weakness, a gentleman not by performance, but by principle.

I want to nurture what we build the way astronomers study distant exoplanets — carefully, attentively, always in awe of what is possible. 

To communicate openly, like light traveling across years just to reach its destination. To stand beside you with pride, not possession. To admire you without diminishing myself.`
    },
    {
      title: "Part III: The Orbit",
      icon: "🌓",
      content: `You deserve a love that is expansive yet steady — one that dreams of galaxies but still remembers to hold your hand on earth.

If life is a vast, unknown universe, then let us become our own small solar system — balanced, warm, and alive with movement. Not perfect. Not dramatic. But real.

And I would be honored to call you my wife — to orbit each other not out of obligation, but by choice, every single day.`
    },
    {
      title: "Yours Infinite Gentleman",
      icon: "✨",
      content: `My heart is a telescope,
Fixed only on your light,
A gentleman's devotion,
Through the vacuum of the night.

No vacuum can extinguish,
The warmth you bring to me,
My love is not a theory,
It's our soul's discovery.

To the edges of the universe,
And the simple path we tread,
I'll be the home you return to,
In the cosmic years ahead.`
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const nowMs = Date.now();
      const difference = TARGET_DATE_MS - nowMs;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
      const timeSinceStart = nowMs - START_DATE_MS;
      setDaysPast(Math.floor(timeSinceStart / (1000 * 60 * 60 * 24)));
      setProgress(Math.min(100, Math.max(0, (timeSinceStart / TOTAL_DURATION_MS) * 100)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === 'journey') {
      const timer = setTimeout(() => setStage('arrived'), 11000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const triggerStarPulse = () => {
    const newStars = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 1.2 + Math.random() * 1.5,
      delay: Math.random() * 0.3,
      char: ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)]
    }));
    setStars(prev => [...prev, ...newStars]);
    setTimeout(() => setStars(prev => prev.filter(s => s.id < Date.now())), 3000);
  };

  const nextPage = () => { setPage(prev => prev + 1); triggerStarPulse(); };
  const prevPage = () => setPage(prev => prev - 1);

  const theme = {
    bg: "bg-[#050510]",
    card: "bg-[#0b0c16]/90 backdrop-blur-xl",
    border: "border-[#d4af37]/40",
    goldText: "text-[#d4af37]",
    silverText: "text-[#e2e8f0]",
    accent: "text-[#8b9bb4]"
  };

  const currentRadius = 130 - (progress * 1.3);
  const currentRotation = progress * 14.4;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${theme.bg} overflow-hidden relative star-bg font-sans text-white`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050510]/95 to-[#050510] pointer-events-none z-0"></div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[60]">
        {stars.map(star => (
          <div key={star.id} className="absolute text-xl animate-star-pulse" style={{ left: `${star.left}%`, top: `${star.top}%`, animationDuration: `${star.animationDuration}s`, animationDelay: `${star.delay}s` }}>{star.char}</div>
        ))}
      </div>

      {stage === 'journey' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-3xl p-6 z-10">
          <h2 className={`${theme.silverText} text-xl mb-24 tracking-[0.4em] uppercase font-light text-center`}>Orbiting Towards You</h2>
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_90s_linear_infinite]"></div>
            <div className="absolute inset-12 border border-white/10 rounded-full border-dashed animate-[spin_60s_linear_infinite_reverse]"></div>
            <div className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle,_rgba(147,51,234,0.45)_0%,_rgba(76,29,149,0.15)_40%,_rgba(0,0,0,0)_75%)] animate-pulse"></div>
            <div className="absolute w-14 h-14 rounded-full border-2 border-[#d4af37]/70 animate-[spin_6s_linear_infinite]"></div>
            <div className="absolute w-8 h-8 rounded-full border border-white/50 animate-[spin_3s_linear_infinite_reverse]"></div>
            <div className="z-10 text-[10px] tracking-[0.2em] uppercase text-[#d4af37]">Wormhole</div>
            <div className="absolute transition-all duration-[7000ms] ease-out z-20" style={{ transform: `rotate(${currentRotation}deg) translateX(${currentRadius}px) rotate(-${currentRotation}deg)` }}>
              <div className="relative">
                <div className="text-3xl">🚀</div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 border border-[#d4af37]/40 text-[#d4af37] text-[9px] px-3 py-1 rounded-full whitespace-nowrap tracking-widest">Day {daysPast}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4 flex flex-col items-center" onClick={() => setStage('sealed')}>
          <div className={`w-64 h-40 ${theme.card} border ${theme.border} flex items-center justify-center relative rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.1)]`}>
            <span className={`${theme.goldText} font-light tracking-[0.3em] text-[11px] text-center px-6`}>A TRANSMISSION FROM THE STARS</span>
          </div>
          <p className={`mt-8 ${theme.accent} text-[10px] uppercase tracking-[0.4em] animate-pulse`}>Tap to Receive</p>
        </div>
      )}

      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up flex flex-col items-center z-10">
          <div className="mb-12 text-center">
            <p className={`text-2xl text-[#f8fafc] font-cursive mb-4 tracking-wide`}>Counting heartbeats across lightyears...</p>
            <div className={`flex gap-6 ${theme.goldText} font-light text-3xl tracking-widest`}>
              <span>{timeLeft.days}d</span><span className="opacity-40">:</span><span>{timeLeft.hours}h</span><span className="opacity-40">:</span><span>{timeLeft.minutes}m</span><span className="opacity-40">:</span><span>{timeLeft.seconds}s</span>
            </div>
          </div>
          <div className={`w-80 h-52 ${theme.card} flex items-center justify-center relative border-t border-[#d4af37]/40 rounded-b-xl`}>
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[100px] border-t-[#161826] border-r-[160px] border-r-transparent"></div>
            <button onClick={() => setStage('reading')} className={`z-20 w-14 h-14 rounded-full bg-[#050510] border border-[#d4af37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] transform hover:scale-110 transition-all duration-300 group`}>
              <Moon className="text-[#d4af37] w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {stage === 'reading' && (
        <div className="relative w-full max-w-lg p-4 z-10">
          <div className={`${theme.card} relative shadow-[0_0_60px_rgba(0,0,0,0.8)] mx-auto border ${theme.border} rounded-2xl h-[640px] flex flex-col overflow-hidden`}>

            {/* FRONT COVER */}
            {page === 0 && (
              <div className="p-10 flex-grow flex flex-col animate-fade-in">
                <div className="text-center my-auto">
                  <Star fill="#d4af37" size={40} className="mx-auto mb-10 text-[#d4af37] animate-pulse" />
                  <h1 className={`text-4xl md:text-5xl ${theme.silverText} font-cursive mb-6 tracking-wide`}>To My Future Wife</h1>
                  <p className="font-light text-[#94a3b8] mb-12 px-6 text-[11px] tracking-[0.3em] uppercase leading-relaxed">A message of love <br /> across our little solar system</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-3 border-2 border-[#d4af37] px-8 py-3 text-[#d4af37] text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]">Enter Orbit <ChevronRight size={16} /></button>
                </div>
              </div>
            )}

            {/* PAGES WITH TOP NAVIGATION */}
            {page > 0 && page <= pages.length && (
              <div className="flex-grow flex flex-col animate-fade-in relative">

                {/* TOP NAVIGATION BAR */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 z-20 bg-white/5 backdrop-blur-sm">
                  <button
                    onClick={prevPage}
                    className="flex items-center gap-1 px-3 py-1.5 border border-white/10 rounded-full text-[#8b9bb4] text-[9px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
                  >
                    <ChevronLeft size={12} /> Back
                  </button>

                  <div className="flex flex-col items-center">
                    <span className={`${theme.goldText} text-[10px] font-bold tracking-[0.3em] uppercase`}>{pages[page - 1].title}</span>
                    <span className="text-[8px] text-[#4a5568] tracking-[0.2em]">{page} / {pages.length}</span>
                  </div>

                  <button
                    onClick={nextPage}
                    className="flex items-center gap-1 px-4 py-1.5 border-2 border-[#d4af37] rounded-full text-[#d4af37] text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all active:scale-95 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                  >
                    {page === pages.length ? "Finish" : "Next"} <ChevronRight size={12} />
                  </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto custom-scrollbar relative px-8 py-4">
                  <div className="mt-4 flex flex-col items-center pb-12">
                    <div className="text-3xl mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{pages[page - 1].icon}</div>
                    <p className="text-[12px] md:text-[18px] leading-[1.7] font-cursive text-center text-[#f1f5f9] whitespace-pre-line tracking-wide">
                      {pages[page - 1].content}
                    </p>
                  </div>
                </div>

                {/* Subtle Progress Bar at Bottom */}
                <div className="h-1 w-full bg-white/5">
                  <div className="h-full bg-[#d4af37]/40 transition-all duration-500" style={{ width: `${(page / pages.length) * 100}%` }}></div>
                </div>
              </div>
            )}

            {/* END CREDITS */}
            {page > pages.length && (
              <div className="p-10 flex-grow flex flex-col relative overflow-hidden">
                <div className="animate-fade-in text-center my-auto flex flex-col items-center z-10">
                  <Sparkles size={35} className="text-[#d4af37] mb-8 animate-pulse" />
                  <h2 className={`text-4xl ${theme.silverText} font-cursive mb-6 tracking-wide`}>The Universe is Ours</h2>
                  <p className="text-[#94a3b8] font-light text-[15px] leading-relaxed mb-10 px-6 tracking-wide italic">
                    "Every star in the sky is a testament to the time I am willing to wait, and the love I am ready to give."
                  </p>
                  <div className={`w-20 h-[1px] bg-[#d4af37]/40 mb-8`}></div>
                  <p className={`${theme.goldText} tracking-[0.5em] uppercase text-[9px]`}>See you in our orbit</p>
                  <button onClick={() => setPage(1)} className="mt-12 px-8 py-2.5 border border-[#d4af37] text-[#d4af37] text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-[#d4af37] hover:text-black transition-all font-bold">
                    Restart Journey
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .star-bg {
          background-image: radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 150px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 80px 230px, #d4af37, rgba(0,0,0,0));
          background-repeat: repeat; background-size: 300px 300px;
        }
        @keyframes starPulse { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
        .animate-star-pulse { animation: starPulse ease-in-out forwards; }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default RoyalLetter;
