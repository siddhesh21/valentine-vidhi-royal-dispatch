import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Heart, Sparkles, PenTool } from 'lucide-react';

const RoyalLetter = () => {
  const [stage, setStage] = useState('journey');
  const [page, setPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [daysPast, setDaysPast] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [progress, setProgress] = useState(0);

  // --- DATES ---
  const startDate = new Date('2025-10-26T00:00:00+05:30');
  const promiseDate = new Date('2025-11-07T00:00:00+05:30');
  const targetDate = new Date('2026-03-14T00:00:00+05:30');
  const totalDuration = targetDate - startDate;
  const promisePosition = ((promiseDate - startDate) / totalDuration) * 100;

  // --- NEW POETIC CONTENT (8 Pages) ---
  const journal = [
    {
      title: "Page I — Missing You, Everywhere",
      icon: "💭",
      text: `I catch myself speaking your name more than I realise.
At work, in passing conversations, in moments meant for focus.
I tell them March is coming — but what I mean is you are.
Every memory finds its way back to you somehow.`
    },
    {
      title: "Page II — The Way I Imagine Us",
      icon: "✨",
      text: `Sometimes I picture us like strangers meeting again —
hearts cautious, smiles slow.
And sometimes I laugh at myself, knowing the truth:
I’m about to meet my favourite person in the world,
and everything will feel familiar instantly.`
    },
    {
      title: "Page III — Things I’m Quietly Making",
      icon: "🛠️",
      text: `There are little things scattered around my days now.
Pieces I’m shaping, arranging, hiding away with care.
Not because you asked —
but because loving you makes my hands restless to create.`
    },
    {
      title: "Page IV — Soft Reminders of You",
      icon: "🧣",
      text: `Certain colours pause me.
Certain songs stay longer than expected.
Even silence feels different —
as if it’s holding your name gently, waiting.`
    },
    {
      title: "Page V — Counting, Secretly",
      icon: "📝",
      text: `In spare moments between meetings,
I make quiet tallies — not of time,
but of closeness.
Each mark means one day less between us,
and one step closer to breathing the same air.`
    },
    {
      title: "Page VI — Dressing for the Moments Ahead",
      icon: "👔",
      text: `I find myself imagining what suits us.
Not trends. Not rules.
Just what feels right when I stand beside you —
comfortable, intentional, and a little undone.`
    },
    {
      title: "Page VII — Learning Your World",
      icon: "📺",
      text: `I’m watching a story you love now.
Seeing it through your eyes,
smiling at moments I know you’d wait for.
It feels like borrowing a piece of your joy
before I can hold your hand again.`
    },
    {
      title: "Page VIII — A Song Meant Only for Us",
      icon: "🎵",
      text: `I imagine the music playing softly.
Family nearby, the world continuing.
And yet — it’s only you and me.
Slow steps. Quiet laughter.
Listening not to the song,
but to each other’s hearts keeping time.`
    }
  ];

  // --- LOGIC ---
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
      const currentProgress = Math.min(100, Math.max(0, (timeSinceStart / totalDuration) * 100));
      setProgress(currentProgress);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === 'journey') {
      const timer = setTimeout(() => setStage('arrived'), 8000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const triggerConfetti = () => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      animationDuration: 1 + Math.random() * 2,
      delay: Math.random() * 0.5,
      char: ['❤️', '📝', '✨', '🎶'][Math.floor(Math.random() * 4)]
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id < Date.now())), 3000);
  };

  const nextPage = () => {
    setPage(prev => prev + 1);
    triggerConfetti();
  };
  const prevPage = () => setPage(prev => prev - 1);

  const theme = {
    bg: "bg-[#fdf6e3]",
    gold: "border-[#d4af37]",
    goldText: "text-[#d4af37]",
    wine: "bg-[#722f37]",
    wineText: "text-[#722f37]",
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${theme.bg} overflow-hidden relative font-serif selection:bg-[#722f37] selection:text-white`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      {/* CONFETTI LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 60 }}>
        {hearts.map(heart => (
          <div key={heart.id} className="absolute top-[-20px] text-2xl animate-fall" style={{ left: `${heart.left}%`, animationDuration: `${heart.animationDuration}s`, animationDelay: `${heart.delay}s` }}>{heart.char}</div>
        ))}
      </div>

      {/* STAGE 1: JOURNEY */}
      {stage === 'journey' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-5xl p-6">
          <h2 className={`text-xl md:text-3xl ${theme.wineText} mb-20 tracking-widest uppercase font-bold`}>My Journey to You</h2>
          <div className="relative w-full max-w-3xl h-1.5 bg-[#dcc694]/40 mb-4 rounded-full">
            <div className="absolute top-8 left-0 transform -translate-x-1/2 text-xs text-[#722f37] font-bold">Oct 26<br />First Date</div>
            <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4af37] z-10" style={{ left: `${promisePosition}%` }}></div>
            <div className="absolute -top-10 transform -translate-x-1/2 text-xl" style={{ left: `${promisePosition}%` }}>💍</div>
            <div className="absolute top-8 transform -translate-x-1/2 text-xs text-[#d4af37] font-bold" style={{ left: `${promisePosition}%` }}>Nov 7<br />Promise</div>
            <div className="absolute top-0 left-0 h-full bg-[#722f37] transition-all duration-[4000ms] ease-out rounded-full" style={{ width: `${progress}%` }}></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-[4000ms] ease-out z-20" style={{ left: `${progress}%` }}>
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#722f37] text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap shadow-lg">Day {daysPast} Missing You</div>
              <div className="text-5xl animate-bounce-walk">🤵</div>
            </div>
            <div className="absolute top-8 right-0 transform translate-x-1/2 text-xs text-[#722f37] font-bold">March 14<br />Reunion</div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 text-5xl opacity-40 grayscale">👰</div>
          </div>
          <p className={`mt-24 ${theme.goldText} text-[10px] tracking-[0.4em] uppercase animate-pulse`}>Crossing the miles, one day at a time</p>
        </div>
      )}

      {/* STAGE 2: ARRIVED */}
      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4 flex flex-col items-center" onClick={() => setStage('sealed')}>
          <div className={`w-64 h-40 bg-[#f3e5ab] border-2 ${theme.gold} shadow-2xl flex items-center justify-center relative`}>
            <span className={`${theme.goldText} font-bold tracking-widest text-center px-4`}>WHILE I WAIT FOR YOU</span>
          </div>
          <p className={`text-center mt-6 ${theme.wineText} text-sm tracking-widest uppercase`}>Click to Read</p>
        </div>
      )}

      {/* STAGE 3: SEALED */}
      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up p-4 flex flex-col items-center">
          <div className="mb-10 text-center animate-fade-in">
            <p className={`text-xl ${theme.wineText} font-script mb-2`}>Every second brings us closer...</p>
            <div className={`flex gap-4 md:gap-6 ${theme.wineText} items-end justify-center`}>
              <div className="flex flex-col items-center"><span className="text-3xl font-bold">{timeLeft.days}</span><span className="text-[10px] uppercase opacity-70">Days</span></div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center"><span className="text-3xl font-bold">{timeLeft.hours}</span><span className="text-[10px] uppercase opacity-70">Hrs</span></div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center"><span className="text-3xl font-bold">{timeLeft.minutes}</span><span className="text-[10px] uppercase opacity-70">Mins</span></div>
              <span className="text-2xl mb-4 opacity-50">:</span>
              <div className="flex flex-col items-center"><span className="text-3xl font-bold animate-pulse">{timeLeft.seconds}</span><span className="text-[10px] uppercase opacity-70">Secs</span></div>
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

      {/* STAGE 4: READING (UPDATED LAYOUT) */}
      {stage === 'reading' && (
        <div className="relative w-full max-w-lg p-4">
          <div className={`bg-[#fdf6e3] relative shadow-2xl mx-auto overflow-hidden transition-all duration-700 border ${theme.gold}/30 min-h-[550px] flex flex-col`}>
            <div className="p-8 md:p-12 flex-grow flex flex-col">

              {/* PAGE 0: COVER */}
              {page === 0 && (
                <div className="animate-fade-in text-center my-auto">
                  <Heart fill="#722f37" size={60} className="mx-auto mb-6 text-[#722f37] animate-pulse" />
                  <h1 className={`text-4xl md:text-5xl ${theme.wineText} font-script mb-6`}>While I Wait</h1>
                  <p className="italic text-gray-600 mb-8 px-4">"The things I do, think, and feel while the miles still separate us..."</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-2 border px-6 py-2 border-[#722f37] text-[#722f37] font-bold hover:bg-[#722f37] hover:text-white transition-all">Open Journal <ChevronRight size={18} /></button>
                </div>
              )}

              {/* PAGES 1-8: JOURNAL ENTRIES (New Single Page Layout) */}
              {page > 0 && page <= journal.length && (
                <div className="animate-fade-in h-full flex flex-col text-center">

                  {/* Title Header */}
                  <div className={`text-[10px] uppercase tracking-widest mb-10 border-b ${theme.gold} pb-4 font-bold ${theme.wineText}`}>
                    {journal[page - 1].title}
                  </div>

                  {/* Main Content */}
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="text-5xl mb-6 animate-pulse">{journal[page - 1].icon}</div>

                    {/* Pre-line style keeps your poetic line breaks */}
                    <p className={`text-lg md:text-xl leading-relaxed font-script ${theme.wineText} whitespace-pre-line`}>
                      "{journal[page - 1].text}"
                    </p>
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex justify-between mt-10 pt-4 border-t border-[#d4af37]/20">
                    <button onClick={prevPage} className="flex items-center gap-1 text-[#d4af37] text-xs uppercase tracking-widest hover:text-[#722f37]"><ChevronLeft size={14} /> Back</button>
                    <div className="text-[10px] text-[#d4af37] tracking-widest uppercase mt-1">Page {page} of {journal.length}</div>
                    <button onClick={nextPage} className="flex items-center gap-1 text-[#722f37] font-bold text-sm underline hover:text-[#d4af37]">{page === journal.length ? "Finish" : "Next"}</button>
                  </div>
                </div>
              )}

              {/* FINAL PAGE: END CREDITS */}
              {page > journal.length && (
                <div className="animate-fade-in text-center my-auto flex flex-col items-center">
                  <div className="flex gap-2 mb-6">
                    <PenTool size={24} className={theme.wineText} />
                    <Sparkles size={24} className="text-[#d4af37] animate-pulse" />
                  </div>
                  <h2 className={`text-3xl ${theme.wineText} font-script mb-4`}>An Author's Note</h2>
                  <div className="space-y-4 text-gray-700 italic text-lg leading-relaxed mb-8">
                    <p>"The ink of my heart never runs dry when I write for you."</p>
                    <p className="text-sm font-serif non-italic uppercase tracking-widest text-[#d4af37]">Important Notice</p>
                    <p className="not-italic text-base">Keep coming back daily to see the glitter of magic changes in my writing as I string along the literature of our coming days...</p>
                  </div>
                  <div className={`w-20 h-px ${theme.gold} mb-6`}></div>
                  <p className={`${theme.wineText} font-bold tracking-[.3em] uppercase text-xs`}>Until Tomorrow, My Love</p>
                  <button onClick={() => setPage(1)} className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest hover:text-[#722f37]">Re-read my thoughts</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-walk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-bounce-walk { animation: bounce-walk 0.8s infinite ease-in-out; }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        .animate-fall { animation: fall linear forwards; }
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