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

  // --- THE TWO PAGES ---
  const pages = [
    {
      title: "The Poem",
      icon: "✍️",
      content: `I love you in a way that would worry a therapist
and thrill a poet

you’re the person I want to have a million adventures with
dance in the kitchen with
kiss in the rain
make breakfast in bed for

care for you when you’re sick
rush home to have pillow fights with
chase up the stairs
laugh with
cry with

the fall in love over and over again
type of relationship

you’re my person`
    },
    {
      title: "The Declaration",
      icon: "💍",
      content: `I want you... 
I wish to be with you, every single day,
I dream of cherishing you every moment,
I couldn't have known how much it meant to be loving towards a person unconditionally until you,
I have been taking care of myself independently with a protective bubble, since the touch of you now, I know true meaning and depth of experiencing entirety of human emotion, leaning on someone you love dearly,
I can't think of anyone else but you taking care of me and making my life, a home;
I do have appreciation of everything you are, you do, and never ever make you feel unwanted or under appreciate,
I want to take care of you in your sickness and illness,
I want to be a part of your journey of your self growth,
I look forward to a lot of things with you, but one I need the most is your presence and love;
I hold you dear to my heart and no one else could take your place,
I have been waiting for you, just you, and your soul;
I respect, understand, and admire you and will continue to do so,
I love your beauty uncontrollably, utter admiration in my heart that pounds out of your sudden movements by your hair, your smile, your curves, your eyes and smile.
I am so happy to start my life with you and grateful to universe that we found each other, not just that we were single and looking for it but it was something gentle about it,
I am curious about you and how you love me,
I'll be in such awe at the same time it makes sense that we get to be together to live our life fullest,
I with you get to dream our life, create our lifestyle, make our freedom, believe in our goals, chase our goals, share mindset on things that are foundation of successful and fulfilling life that are pillars of a healthy home,
I imagine, and imagine and imagine all things and our minds wander sometimes it feels like "Is this going to happen" and then quickly at times it goes to 'Of course, we are going to make it work, because we are not dreaming we are visioning it' and no one can stop US,
I want to say lastly that... I get to do this with you, as my best friend and my wife for a lifetime.`
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
      char: ['❤️', '💍', '✨', '🌸'][Math.floor(Math.random() * 4)]
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
          <div className={`bg-[#fdf6e3] relative shadow-2xl mx-auto border ${theme.gold}/30 min-h-[600px] flex flex-col`}>
            <div className="p-8 md:p-10 flex-grow flex flex-col">

              {page === 0 && (
                <div className="animate-fade-in text-center my-auto">
                  <Heart fill="#722f37" size={50} className="mx-auto mb-6 text-[#722f37] animate-pulse" />
                  <h1 className={`text-4xl md:text-5xl ${theme.wineText} font-script mb-4`}>To My Future Wife</h1>
                  <p className="italic text-gray-600 mb-8 px-4">"Words from the heart of a man waiting for his home."</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-2 border px-6 py-2 border-[#722f37] text-[#722f37] font-bold hover:bg-[#722f37] hover:text-white transition-all">Begin Reading <ChevronRight size={18} /></button>
                </div>
              )}

              {page > 0 && page <= pages.length && (
                <div className="animate-fade-in h-full flex flex-col h-[500px]">
                  <div className={`flex justify-between ${theme.wineText} text-[10px] uppercase tracking-widest mb-6 border-b ${theme.gold} pb-2 font-bold`}>
                    <span>{pages[page - 1].title}</span><span>{page} / {pages.length}</span>
                  </div>

                  {/* PRETTIFIED CONTENT AREA */}
                  <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
                    <div className="text-3xl mb-6 text-center">{pages[page - 1].icon}</div>

                    {pages[page - 1].title === "The Declaration" ? (
                      // STRUCTURED BULLET POINT LAYOUT FOR DECLARATION
                      <div className="space-y-6">
                        {pages[page - 1].content.split('\n').filter(line => line.trim() !== "").map((line, index) => (
                          <div key={index} className="flex gap-4 group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <span className={`${theme.goldText} text-lg font-bold mt-0.5 transform group-hover:translate-x-1 transition-transform`}>→</span>
                            <p className={`text-base md:text-[17px] leading-relaxed font-serif tracking-wide text-[#4a4a4a]`}>
                              {line.trim()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // POEM LAYOUT
                      <p className={`text-lg md:text-xl leading-relaxed font-script text-center ${theme.wineText} whitespace-pre-line`}>
                        {pages[page - 1].content}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between mt-6 pt-4 border-t border-[#d4af37]/20">
                    <button onClick={prevPage} className="text-[#d4af37] text-xs uppercase tracking-widest flex items-center"><ChevronLeft size={14} /> Back</button>
                    <button onClick={nextPage} className="text-[#722f37] font-bold text-sm underline">{page === pages.length ? "Finish" : "Next Page"}</button>
                  </div>
                </div>
              )}

              {page > pages.length && (
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
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-walk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-walk { animation: bounce-walk 1s infinite ease-in-out; }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        .animate-fall { animation: fall linear forwards; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
        .font-script { font-family: 'Great Vibes', cursive; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; }
        p { text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05); }
      `}</style>
    </div>
  );
};

export default RoyalLetter;