import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Heart, Sparkles, PenTool } from 'lucide-react';

const RoyalLetter = () => {
  const [stage, setStage] = useState('journey');
  const [page, setPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [daysPast, setDaysPast] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [progress, setProgress] = useState(0);

  const startDate = new Date('2025-10-26T00:00:00+05:30');
  const targetDate = new Date('2026-03-14T00:00:00+05:30');
  const totalDuration = targetDate - startDate;

  // --- NEW CONTENT ---
  const pages = [
    {
      title: "Our Echoes",
      type: "dialogue",
      content: `Hey soon to be wifey, 

It's so calming and grounded and majestic about the names you suggested for our kids and I couldn't agree more to it. 

I loved it instantly and solidified itself on how we could call them, how it would be heard, how the echos of their names will be resonating in our home. When I heard the Eraya name as you suggested for your brand I was like that should be our daughter's name and then before we could be discuss it was lovingly said and agreed by our heart. 

Tell me what was our son's name again...`
    },
    {
      title: "The Heart of Us",
      type: "heart-cloud",
      words: [
        "Love", "Affection", "Respect", "Understanding", "Communication", "Passion",
        "Companion", "Partner", "Attention", "Motivation", "Lover", "Supporter",
        "Cherisher", "Trust", "Faith", "Belief", "Honest", "Fruitful", "Horny",
        "Admirer", "Sculptor", "Comfort", "Nurturer", "Carer", "Home", "Safe",
        "Secure", "Honour", "Muse", "Melody", "Dreamer", "Soul", "Ambitions",
        "Achiever", "Growth", "Objectifier", "Universe", "Pride", "Joy"
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
      const timeSinceStart = now - startDate;
      setDaysPast(Math.floor(timeSinceStart / (1000 * 60 * 60 * 24)));
      setProgress(Math.min(100, Math.max(0, (timeSinceStart / totalDuration) * 100)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === 'journey') {
      const timer = setTimeout(() => setStage('arrived'), 7000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const triggerConfetti = () => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      animationDuration: 1.5 + Math.random() * 2,
      delay: Math.random() * 0.5,
      char: ['❤️', '✨', '🍼', '💍'][Math.floor(Math.random() * 4)]
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id < Date.now())), 3000);
  };

  const nextPage = () => { setPage(prev => prev + 1); triggerConfetti(); };
  const prevPage = () => setPage(prev => prev - 1);

  const theme = { bg: "bg-[#fdf6e3]", gold: "border-[#d4af37]", goldText: "text-[#d4af37]", wine: "bg-[#722f37]", wineText: "text-[#722f37]" };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${theme.bg} overflow-hidden relative font-serif`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      {/* CONFETTI */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 60 }}>
        {hearts.map(heart => (
          <div key={heart.id} className="absolute top-[-20px] text-2xl animate-fall" style={{ left: `${heart.left}%`, animationDuration: `${heart.animationDuration}s`, animationDelay: `${heart.delay}s` }}>{heart.char}</div>
        ))}
      </div>

      {/* STAGE 1: JOURNEY */}
      {stage === 'journey' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-3xl p-6">
          <h2 className={`${theme.wineText} text-2xl mb-16 tracking-widest uppercase font-bold text-center`}>The Path to Us</h2>
          <div className="relative w-full h-1 bg-[#dcc694]/40 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-[#722f37] transition-all duration-[4000ms]" style={{ width: `${progress}%` }}></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-[4000ms] z-20" style={{ left: `${progress}%` }}>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#722f37] text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap">Day {daysPast}</div>
              <div className="text-4xl animate-bounce-walk">🤵</div>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 text-4xl opacity-30">👰</div>
          </div>
        </div>
      )}

      {/* STAGE 2: ARRIVED */}
      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4 flex flex-col items-center" onClick={() => setStage('sealed')}>
          <div className={`w-64 h-40 bg-[#f3e5ab] border-2 ${theme.gold} shadow-2xl flex items-center justify-center relative`}>
            <span className={`${theme.goldText} font-bold tracking-widest`}>A MESSAGE FOR YOU</span>
          </div>
          <p className={`mt-6 ${theme.wineText} text-sm uppercase tracking-widest`}>Click to Open</p>
        </div>
      )}

      {/* STAGE 3: SEALED */}
      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up flex flex-col items-center">
          <div className="mb-8 text-center">
            <p className={`text-xl ${theme.wineText} font-script mb-2`}>Counting the heartbeats until we meet...</p>
            <div className={`flex gap-4 ${theme.wineText} font-bold text-3xl`}>
              <span>{timeLeft.days}d</span><span>:</span><span>{timeLeft.hours}h</span><span>:</span><span>{timeLeft.minutes}m</span><span>:</span><span>{timeLeft.seconds}s</span>
            </div>
          </div>
          <div className="w-80 h-56 bg-[#f3e5ab] shadow-2xl flex items-center justify-center relative border-t-2 border-[#e6d0a1]">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-[#ebdcb2] border-r-[160px] border-r-transparent"></div>
            <button onClick={() => setStage('reading')} className={`z-20 w-16 h-16 rounded-full ${theme.wine} border-4 border-[#5e2129] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
              <span className={`text-[#d4af37] text-2xl font-bold italic`}>SV</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: READING */}
      {stage === 'reading' && (
        <div className="relative w-full max-w-xl p-4">
          <div className={`bg-[#fdf6e3] relative shadow-2xl mx-auto border ${theme.gold}/30 h-[650px] flex flex-col`}>

            {/* FRONT COVER */}
            {page === 0 && (
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <div className="animate-fade-in text-center my-auto">
                  <Heart fill="#722f37" size={50} className="mx-auto mb-6 text-[#722f37] animate-pulse" />
                  <h1 className={`text-4xl md:text-5xl ${theme.wineText} font-script mb-4`}>To My Future Wife</h1>
                  <p className="italic text-gray-600 mb-8 px-4">"Words from the heart of a man waiting for his home."</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-2 border px-6 py-2 border-[#722f37] text-[#722f37] font-bold hover:bg-[#722f37] hover:text-white transition-all">Begin Reading <ChevronRight size={18} /></button>
                </div>
              </div>
            )}

            {/* PAGES */}
            {page > 0 && page <= pages.length && (
              <div className="p-8 md:p-10 flex-grow flex flex-col animate-fade-in relative">
                <div className={`flex justify-between ${theme.wineText} text-[10px] uppercase tracking-widest mb-4 border-b ${theme.gold} pb-2 font-bold z-10`}>
                  <span>{pages[page - 1].title}</span><span>{page} / {pages.length}</span>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar relative flex flex-col">

                  {/* PAGE 1: DIALOGUE */}
                  {pages[page - 1].type === "dialogue" && (
                    <div className="mt-4">
                      <p className={`text-lg md:text-[22px] leading-loose font-script text-left ${theme.wineText} whitespace-pre-line`}>
                        {pages[page - 1].content}
                      </p>
                    </div>
                  )}

                  {/* PAGE 2: NAME HEART CLOUD */}
                  {pages[page - 1].type === "heart-cloud" && (
                    <div className="w-full h-full flex items-center justify-center relative mt-4">
                      {/* SVG Heart Path Outline */}
                      <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full overflow-visible opacity-80" style={{ transform: 'scale(1.1)' }}>
                        <defs>
                          {/* Perfect Heart Path */}
                          <path id="heartPath" d="M 150 250 C 150 250 40 160 40 90 C 40 40 100 40 150 90 C 200 40 260 40 260 90 C 260 160 150 250 150 250 Z" />
                        </defs>
                        <text className="font-bold uppercase tracking-widest text-[11px]" fill="#d4af37">
                          <textPath href="#heartPath" startOffset="0%">
                            <animate attributeName="startOffset" from="0%" to="-100%" dur="25s" repeatCount="indefinite" />
                            SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI •
                          </textPath>
                          <textPath href="#heartPath" startOffset="100%">
                            <animate attributeName="startOffset" from="100%" to="0%" dur="25s" repeatCount="indefinite" />
                            SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI • SIDDHESH ♥ VIDHI •
                          </textPath>
                        </text>
                      </svg>

                      {/* Inner Word Cloud */}
                      <div className="relative z-10 w-[65%] h-[60%] flex flex-wrap justify-center items-center content-center text-center -mt-8">
                        {pages[page - 1].words.map((word, index) => {
                          const sizes = ['text-[10px]', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'];
                          const colors = ['text-[#722f37]', 'text-[#d4af37]', 'text-[#5e2129]', 'text-[#8a7243]'];
                          const randomSize = sizes[index % sizes.length];
                          const randomColor = colors[index % colors.length];

                          return (
                            <span
                              key={index}
                              className={`mx-1.5 my-1 ${randomSize} ${randomColor} font-serif transition-transform hover:scale-125 hover:z-20 cursor-default leading-tight drop-shadow-sm`}
                            >
                              {word}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-[#d4af37]/20 bg-[#fdf6e3] z-10">
                  <button onClick={prevPage} className="text-[#d4af37] text-xs uppercase tracking-widest flex items-center hover:text-[#722f37] transition-colors"><ChevronLeft size={14} /> Back</button>
                  <button onClick={nextPage} className="text-[#722f37] font-bold text-sm underline hover:text-[#d4af37] transition-colors">{page === pages.length ? "Finish" : "Next Page"}</button>
                </div>
              </div>
            )}

            {/* END CREDITS */}
            {page > pages.length && (
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <div className="animate-fade-in text-center my-auto flex flex-col items-center">
                  <Sparkles size={30} className="text-[#d4af37] mb-6 animate-pulse" />
                  <h2 className={`text-3xl ${theme.wineText} font-script mb-6`}>Our Story Continues...</h2>
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-8 px-4">
                    "I am stringing along the literature of our coming days. Keep coming back daily to see the glitter of magic changes in my writing..."
                  </p>
                  <div className={`w-20 h-px ${theme.gold} mb-6`}></div>
                  <p className={`${theme.wineText} font-bold tracking-[.3em] uppercase text-xs`}>Until Tomorrow, My Love</p>
                  <button onClick={() => setPage(1)} className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest hover:text-[#722f37]">Re-read from the heart</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-walk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-walk { animation: bounce-walk 1s infinite ease-in-out; }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        .animate-fall { animation: fall linear forwards; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }
        .font-script { font-family: 'Great Vibes', cursive; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(212, 175, 55, 0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default RoyalLetter;