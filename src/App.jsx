import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

const TARGET_DATE_MS = new Date('2026-03-14T00:00:00+05:30').getTime();

const RoyalLetter = () => {
  const [stage, setStage] = useState('flying');
  const [page, setPage] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = TARGET_DATE_MS - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else { clearInterval(timer); }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === 'flying') {
      const timer = setTimeout(() => setStage('arrived'), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'unrolling') {
      const timer = setTimeout(() => setStage('reading'), 250);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const theme = {
    bg: "bg-[#fdf6e3]",
    gold: "border-[#d4af37]",
    goldText: "text-[#d4af37]",
    wine: "bg-[#722f37]",
    wineText: "text-[#722f37]",
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${theme.bg} overflow-hidden relative selection:bg-[#722f37] selection:text-white font-serif`}>

      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      {/* STAGE: FLYING */}
      {stage === 'flying' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-4xl p-4">
          <h2 className={`text-xl md:text-2xl ${theme.goldText} mb-8 tracking-widest uppercase text-center font-bold`}>
            Special Dispatch: 100 Days of Us
          </h2>
          <div className={`relative w-full h-48 md:h-64 border-t border-b ${theme.gold}/30 flex items-center justify-between px-4 md:px-10`}>
            <div className="z-10 flex flex-col items-center">
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]`}></div>
              <span className={`mt-2 ${theme.goldText} text-xs md:text-sm tracking-widest`}>IRELAND</span>
            </div>
            <div className="absolute z-20 animate-fly-across">
              <div className={`w-10 h-7 md:w-12 md:h-8 bg-[#f3e5ab] border ${theme.gold} shadow-lg flex items-center justify-center transform -rotate-12`}>
                <span className={`text-[8px] ${theme.goldText}`}>✉</span>
              </div>
            </div>
            <div className="z-10 flex flex-col items-center">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#d4af37] animate-pulse"></div>
              <span className={`mt-2 ${theme.goldText} text-xs md:text-sm tracking-widest`}>INDIA</span>
            </div>
          </div>
          <p className={`mt-8 ${theme.goldText} animate-pulse italic`}>A century of days, a lifetime to go... </p>
        </div>
      )}

      {/* STAGE: ARRIVED */}
      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4 flex flex-col items-center" onClick={() => setStage('sealed')}>
          <div className={`w-64 h-40 bg-[#f3e5ab] border-2 ${theme.gold} shadow-2xl flex items-center justify-center relative transform hover:scale-105 transition-transform duration-500`}>
            <span className={`${theme.goldText} font-bold tracking-widest`}>A ROYAL MILESTONE</span>
          </div>
          <p className={`text-center mt-6 ${theme.wineText} text-sm tracking-widest uppercase`}>Click to Open</p>
        </div>
      )}

      {/* STAGE: SEALED */}
      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up p-4 flex flex-col items-center">
          <div className="mb-10 text-center animate-fade-in">
            <p className={`text-xl ${theme.wineText} font-script mb-2`}>Counting the seconds until I can hold you...</p>
            <div className={`flex gap-4 md:gap-6 ${theme.wineText} items-end justify-center`}>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Days</span>
              </div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Hrs</span>
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

          <div className="w-80 h-56 bg-[#f3e5ab] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center relative border-t-2 border-[#e6d0a1]">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-[#ebdcb2] border-r-[160px] border-r-transparent"></div>
            <button
              onClick={() => setStage('unrolling')}
              className={`z-20 w-16 h-16 rounded-full ${theme.wine} border-4 border-[#5e2129] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer`}
            >
              <span className={`text-[#d4af37] text-2xl font-bold italic`}>SV</span>
            </button>
          </div>
          <p className="text-center mt-8 text-[#2c2c2c] italic font-light">"Break the seal to hear my heart"</p>
        </div>
      )}

      {/* STAGE: READING (Two Pages) */}
      {(stage === 'unrolling' || stage === 'reading') && (
        <div className="relative w-full max-w-lg p-4">
          <div className={`bg-[#fdf6e3] relative shadow-2xl mx-auto overflow-hidden transition-all duration-[1000ms] border ${theme.gold}/30 ${stage === 'unrolling' ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>

            <div className="p-8 md:p-12">
              {/* PAGE 1: The Care Message */}
              {/* PAGE 1: The Milestone Headline */}
              {page === 1 && (
                <div className="animate-fade-in text-center py-10">
                  <div className={`mb-6 flex justify-center ${theme.wineText}`}>
                    <Heart fill="#722f37" size={48} className="animate-pulse" />
                  </div>
                  <h1 className={`text-4xl md:text-5xl ${theme.wineText} font-script mb-4`}>100 Days of Promise</h1>
                  <p className={`text-xs uppercase tracking-[0.3em] ${theme.goldText} mb-8`}>A Century of Shared Moments</p>
                  <div className={`w-24 h-px ${theme.gold} mx-auto mb-8`}></div>
                  <p className="italic text-gray-600 mb-10">"A promise made in the heart is a compass that always points in loving you."</p>

                  <button onClick={() => setPage(2)} className={`mx-auto flex items-center gap-2 ${theme.wineText} font-bold hover:underline`}>
                    Open the Message <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {page === 2 && (
                <div className="animate-fade-in">
                  <div className={`flex justify-between ${theme.wineText} text-[10px] uppercase tracking-widest mb-8 border-b ${theme.gold} pb-4 font-bold`}>
                    <span>Day 100: A Vow Reaffirmed</span>
                    <span>Mumbai & Dublin</span>
                  </div>
                  <div className="font-script text-2xl md:text-3xl leading-relaxed text-[#2c2c2c] text-left">
                    <p className="mb-6"><span className={`text-5xl ${theme.wineText} font-serif font-bold`}>M</span>y Darling,</p>
                    <p className="mb-4">As we mark our 100th day of this beautiful promise, my thoughts are only of your recovery. I wish I could be there to ease your pain and hold you close while you heal.</p>
                    <p className="mb-4">I miss your face more than words can say.</p>
                    <p className="mb-6">I love you dearly, I miss you, and I am counting every second until March 14th.</p>
                    <p className="text-right">Yours Forever,<br /><span className={`${theme.wineText} font-bold`}>Siddhesh</span></p>
                  </div>
                  <button onClick={() => setPage(1)} className={`mt-8 flex items-center gap-2 ${theme.goldText} text-xs uppercase tracking-widest hover:text-[#722f37]`}>
                    <ChevronLeft size={14} /> Back to Page 1
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fly-across {
          0% { left: 10%; top: 50%; transform: translate(-50%, -50%) rotate(-5deg) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 90%; top: 50%; transform: translate(-50%, -50%) rotate(5deg) scale(1); }
        }
        .animate-fly-across { position: absolute; animation: fly-across 4s ease-in-out forwards; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
        .font-script { font-family: 'Great Vibes', cursive; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default RoyalLetter;
