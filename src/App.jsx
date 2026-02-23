import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Flame, Heart, Home } from 'lucide-react';

const CozyLifetimeLetter = () => {
  const [stage, setStage] = useState('journey');
  const [page, setPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [embers, setEmbers] = useState([]);
  const [progress, setProgress] = useState(0);

  const startDate = new Date('2025-10-26T00:00:00+05:30');
  const targetDate = new Date('2026-03-14T00:00:00+05:30');
  const totalDuration = targetDate - startDate;

  const pages = [
    {
      title: "The Quiet Beginning",
      subtitle: "Not seizing, but keeping",
      icon: "🕯️",
      color: "rgba(139, 69, 19, 0.8)", // Warm Terracotta
      border: "border-[#d27d2d]",
      align: "center",
      content: `We did not fall in love loudly.
There were no violins,
no grand declarations echoing through marble halls.

It began with a look held a second too long.
A nervous laugh.
Two people pretending they were calmer than they were.

And somewhere between
first drives and unfinished conversations,
between shared meals and stolen glances,
we began building something
we did not yet have the courage to name.

We were young —
not reckless,
but brave enough.

Brave enough to choose
when distance stood waiting.
Brave enough to promise
before the world gave permission.

You handed me a painting once —
not just of a machine I used to ride,
but of who I was when I felt most free.
And I understood then:
love is when someone preserves
the parts of you you’re afraid of losing.

We have said goodbye already.
We have watched airports swallow hours.
We have learned how heavy a quiet room can feel
after laughter leaves it.

And still —
we remain.

Not because it is easy,
but because it is certain.

There is something sacred
about choosing the same person
again and again,
even when oceans sit between you.

In our late twenties,
we are not merely dreaming —
we are constructing.
Brick by careful brick.
Promise by promise.

One day we will wake in a house
that smells like coffee and paint,
with sunlight slipping across wooden floors,
and we will not remember
how strange it once felt
to sleep without each other.

And when we are old —
truly old —
when our hands are softer
and our steps slower,
I hope we look at each other
with the same quiet recognition:

We were brave enough.
We chose well.
We built something that lasted.

Carpe diem, they said.
Seize the day.

But with you,
I do not wish to seize anything.

I wish to hold it.
Steadily.
Gently.
For a lifetime.`
    },
    {
      title: "To Vidhi",
      subtitle: "17 Days",
      icon: "💌",
      color: "rgba(96, 16, 16, 0.8)", // Rich Crimson
      border: "border-[#b22222]",
      align: "left",
      content: `My love,

I know and understand what you’re going through. I can feel the emotional weight you’re carrying — the excitement of me coming to you in 17 days, and at the same time the tenderness and uncertainty your family is facing right now. That kind of emotional contrast can feel like a see-saw — joy pulling one way, worry pulling the other — and it can make everything inside you feel misaligned.

If your emotions feel scattered or distant at times, please know that I understand. Nothing about this is simple. You are allowed to feel both happiness and heartbreak in the same breath.

Keep your heart steady for your family, and for yourself. Gather your strength for your mom — my soon-to-be mother-in-law — and let yourself feel what needs to be felt. Don’t hold it in. Let the emotions pour out instead of sitting heavy inside you.

When I arrive, things may or may not look the way we imagined. The days may unfold differently than we planned. And that’s okay. I am content simply being in your presence. I don’t need perfection. I don’t need a perfect atmosphere. I just need you.

Please don’t exhaust yourself trying to manage every emotion at once. Focus on what is in front of you right now. One moment at a time. You are stronger than you realise, and I know you are doing the best you can.

Whatever comes, we will experience it as it is — together. No forcing, no resisting. Just being present in it.

I pray for your safety, for your heart to be protected, for healing in your toe, and for your family to be carried through this delicate time with peace and strength.

I love you. I miss you. I am here — not just for today, but for our lifetime.

Take care, Vidhi.

— Your soon-to-be husband`
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
      setProgress(Math.min(100, Math.max(0, (timeSinceStart / totalDuration) * 100)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === 'journey') {
      const timer = setTimeout(() => setStage('arrived'), 10000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const triggerEmberPulse = () => {
    const newEmbers = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: 100 + Math.random() * 20,
      size: 4 + Math.random() * 6,
      animationDuration: 3 + Math.random() * 4,
      delay: Math.random() * 0.5,
    }));
    setEmbers(prev => [...prev, ...newEmbers]);
    setTimeout(() => setEmbers(prev => prev.filter(e => e.id < Date.now())), 5000);
  };

  const nextPage = () => { setPage(prev => prev + 1); triggerEmberPulse(); };
  const prevPage = () => setPage(prev => prev - 1);

  const angle = progress * 0.1 * Math.PI * 4;
  const radius = 180 * (1 - progress / 100);
  const posX = Math.cos(angle) * radius;
  const posY = Math.sin(angle) * radius;

  const currentCardColor = page > 0 && page <= pages.length ? pages[page - 1].color : "rgba(30, 20, 15, 0.9)";
  const currentBorderColor = page > 0 && page <= pages.length ? pages[page - 1].border : "border-[#d4af37]/30";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#15100c] overflow-hidden relative font-sans text-white">

      {/* COZY GLOW GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3d2110_0%,_#15100c_80%)] opacity-80 pointer-events-none"></div>

      {/* FLOATING EMBERS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[60]">
        {embers.map(ember => (
          <div
            key={ember.id}
            className="absolute bg-[#ffb05c] rounded-full blur-[1px] animate-float-up"
            style={{
              left: `${ember.left}%`,
              top: `${ember.top}%`,
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              animationDuration: `${ember.animationDuration}s`,
              animationDelay: `${ember.delay}s`,
              boxShadow: '0 0 10px 2px rgba(255, 150, 50, 0.6)'
            }}
          />
        ))}
      </div>

      {/* STAGE 1: THE JOURNEY HOME */}
      {stage === 'journey' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-3xl p-6 z-10">
          <h2 className="text-[#fcdbb6] text-xl mb-32 tracking-[0.4em] uppercase font-light text-center">The Journey Home</h2>
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="absolute w-32 h-32 bg-[#ff8c00] rounded-full blur-[70px] opacity-40 animate-pulse"></div>
            <div className="hearth-ring w-64 h-64 border border-[#ffb05c]/20 rounded-full"></div>
            <div
              className="absolute transition-all duration-[10000ms] ease-linear z-20"
              style={{ transform: `translate(${posX}px, ${posY}px) rotate(${angle * 20}deg)` }}
            >
              <div className="relative">
                <div className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]">🏮</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: ARRIVED */}
      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4 flex flex-col items-center" onClick={() => setStage('sealed')}>
          <div className="w-64 h-40 bg-[#1e1410]/90 backdrop-blur-xl border border-[#d27d2d]/50 flex items-center justify-center relative rounded-lg shadow-[0_0_50px_rgba(210,125,45,0.2)]">
            <span className="text-[#fcdbb6] font-light tracking-[0.3em] text-[11px] text-center px-6 uppercase">You Have Arrived</span>
          </div>
        </div>
      )}

      {/* STAGE 3: SEALED */}
      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up flex flex-col items-center z-10">
          <div className="mb-12 text-center">
            <p className="text-3xl text-[#fdfbf7] font-cursive mb-4 tracking-wide">A Lifetime Together</p>
            <div className="flex gap-6 text-[#d27d2d] font-light text-3xl tracking-widest">
              <span>{timeLeft.days}d</span><span className="opacity-30">:</span><span>{timeLeft.hours}h</span><span className="opacity-30">:</span><span>{timeLeft.minutes}m</span><span className="opacity-30">:</span><span>{timeLeft.seconds}s</span>
            </div>
          </div>
          <div className="w-80 h-52 bg-[#1e1410]/90 backdrop-blur-xl flex items-center justify-center relative border-t border-[#d27d2d]/40 rounded-b-xl shadow-2xl">
            <button onClick={() => { setStage('reading'); triggerEmberPulse(); }} className="z-20 w-14 h-14 rounded-full bg-[#15100c] border border-[#d27d2d] flex items-center justify-center shadow-[0_0_30px_rgba(210,125,45,0.4)] transform hover:scale-110 transition-all duration-500">
              <Home className="text-[#d27d2d] w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: READING */}
      {stage === 'reading' && (
        <div className="relative w-full max-w-lg p-4 z-10">
          <div
            className={`backdrop-blur-2xl relative shadow-[0_0_80px_rgba(0,0,0,0.9)] mx-auto border ${currentBorderColor} rounded-2xl h-[640px] flex flex-col overflow-hidden transition-colors duration-1000`}
            style={{ backgroundColor: currentCardColor }}
          >

            {/* FRONT COVER */}
            {page === 0 && (
              <div className="p-10 flex-grow flex flex-col animate-fade-in">
                <div className="text-center my-auto">
                  <Flame size={45} className="mx-auto mb-10 text-[#ffb05c] animate-pulse drop-shadow-[0_0_15px_rgba(255,176,92,0.6)]" />
                  <h1 className="text-4xl md:text-5xl text-[#fdfbf7] font-cursive mb-6 tracking-wide">Steady & Gentle</h1>
                  <p className="font-light text-[#dcb897] mb-12 px-6 text-[11px] tracking-[0.3em] uppercase leading-relaxed">Not seizing, but keeping.</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-3 border-2 border-[#ffb05c] px-8 py-3 text-[#ffb05c] text-[11px] font-bold uppercase tracking-[0.4em] rounded-full shadow-[0_0_20px_rgba(255,176,92,0.2)] hover:bg-[#ffb05c] hover:text-[#15100c] transition-all duration-300">Open Door <ChevronRight size={16} /></button>
                </div>
              </div>
            )}

            {/* THE CONTENT */}
            {page > 0 && page <= pages.length && (
              <div className="flex-grow min-h-0 flex flex-col animate-fade-in relative">
                {/* TOP NAVIGATION */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 z-20 bg-black/20">
                  <button onClick={prevPage} className="px-4 py-1.5 border border-white/20 rounded-full text-[#dcb897] text-[9px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Back</button>
                  <div className="flex flex-col items-center">
                    <span className="text-[#ffb05c] text-[11px] font-bold tracking-[0.2em] uppercase">{pages[page - 1].title}</span>
                    <span className="text-[8px] text-white/50 tracking-[0.2em] uppercase mt-1">{pages[page - 1].subtitle}</span>
                  </div>
                  <button onClick={nextPage} className="px-5 py-1.5 border-2 border-[#ffb05c] rounded-full text-[#ffb05c] text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,176,92,0.2)] hover:bg-[#ffb05c] hover:text-[#15100c] transition-all">
                    {page === pages.length ? "Finish" : "Next"}
                  </button>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar relative px-8 py-6">
                  <div className="mt-2 flex flex-col pb-12 items-center">
                    <div className="text-4xl mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] text-center">{pages[page - 1].icon}</div>
                    <p className={`text-[21px] md:text-[24px] leading-[1.8] font-cursive text-[#fdfbf7] whitespace-pre-line tracking-wide drop-shadow-md w-full ${pages[page - 1].align === 'left' ? 'text-left' : 'text-center'}`}>
                      {pages[page - 1].content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* END CREDITS */}
            {page > pages.length && (
              <div className="p-10 flex-grow flex flex-col relative overflow-hidden animate-fade-in bg-[rgba(30,20,15,0.9)]">
                <div className="text-center my-auto flex flex-col items-center z-10">
                  <Heart size={35} fill="#ffb05c" className="text-[#ffb05c] mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(255,176,92,0.6)]" />
                  <h2 className="text-4xl text-[#fdfbf7] font-cursive mb-6 tracking-wide">End of Transmission</h2>
                  <p className="text-[#dcb897] font-light text-[15px] leading-relaxed mb-10 px-6 tracking-wide italic">"I will spend my life making sure you never feel cold."</p>
                  <div className="w-24 h-[1px] bg-[#ffb05c]/40 mb-8"></div>
                  <p className="text-[#ffb05c] tracking-[0.6em] uppercase text-[10px] font-bold">Forever Yours</p>
                  <button onClick={() => { setPage(1); triggerEmberPulse(); }} className="mt-12 px-8 py-2.5 border border-[#ffb05c]/50 text-[#ffb05c] text-[9px] uppercase tracking-[0.4em] rounded-full hover:bg-white/10 transition-all">Read Again</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .hearth-ring { position: absolute; border-radius: 50%; animation: hearthPulse 4s ease-in-out infinite; }
        @keyframes hearthPulse { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.05); opacity: 0.5; border-width: 2px; } }
        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 0.8; } 100% { transform: translateY(-200px) scale(0.5); opacity: 0; } }
        .animate-float-up { animation: floatUp ease-in forwards; }
        .animate-fade-in { animation: fadeIn 1.2s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 176, 92, 0.4); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CozyLifetimeLetter;
