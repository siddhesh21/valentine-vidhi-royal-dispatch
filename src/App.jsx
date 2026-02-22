import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Flame, Heart, Home, Lock } from 'lucide-react';

const CozyLifetimeLetter = () => {
  const [stage, setStage] = useState('journey');
  const [page, setPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [daysPast, setDaysPast] = useState(0);
  const [embers, setEmbers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const startDate = new Date('2025-10-26T00:00:00+05:30');
  const targetDate = new Date('2026-03-14T00:00:00+05:30');
  const totalDuration = targetDate - startDate;

  // --- TIME LOCK LOGIC (IST) ---
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hours = istTime.getHours();
      // Unlocks at or after 2 PM (14:00) IST
      if (hours >= 14) {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
      }
    };
    checkTime();
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const pages = [
    {
      title: "Our Late 20s",
      subtitle: "The Beginning of Home",
      icon: "🪴",
      color: "rgba(139, 69, 19, 0.8)", // Warm Terracotta
      border: "border-[#d27d2d]",
      content: `This is where we are brave enough to choose each other fully.

We found each other at the right time — not when life was easy, but when we were ready. We commit to our bond not because it is convenient, but because it feels steady. We get married not out of pressure, but out of certainty.

You move countries. You move your life. You trust me enough to build beside me.

We learn how to live together — not perfectly, but intentionally. We figure out where the mugs go. We argue over shelf space. We learn each other’s rhythms — your quiet mornings, my late nights. We become fluent in each other’s moods.

You build your brand with focus and courage. I watch you sit at a desk near the window, sketchbook open, ideas spilling out of you. Your name begins to mean something. Your art begins to travel further than we do.

I grow in my career, steady and disciplined. We motivate each other to stay sharp, to stay hungry.

We travel for our honeymoon — somewhere that feels like a dream we whispered about. Later, Japan. Later, under the northern lights, holding your gloved hands in mine. We get a small cat that rules the house like royalty.

We work out together. Not for vanity — but for longevity. For the promise of many decades ahead.

In these years, we are building. Learning. Becoming.`
    },
    {
      title: "Early to Mid 30s",
      subtitle: "Expansion",
      icon: "🖼️",
      color: "rgba(184, 115, 51, 0.8)", // Rich Copper
      border: "border-[#cd7f32]",
      content: `By now, We will enter our newly purchased house and start to make it our home and soon it will feel like US lived in. It smells like us.

Your exhibitions grow. Not small gallery corners — full rooms. Your paintings hang under proper lighting. People stand quietly in front of your work, studying it. I stand in the back, watching you more than the art.

You step onto bigger platforms. You own your voice.

We begin to talk seriously about welcoming someone new into our lives. A child. A heartbeat. A new laugh in our home. We prepare not just financially — but emotionally. We strengthen ourselves for it.

If we are blessed with children, we support each other relentlessly. Late nights become shared shifts. Stress becomes shared responsibility. We protect each other’s mental health fiercely.

We still walk in the evenings. Still hold hands. Still choose each other.`
    },
    {
      title: "Late 30s",
      subtitle: "Rooted and Rising",
      icon: "🌳",
      color: "rgba(31, 61, 43, 0.8)", // Deep Forest Green
      border: "border-[#4f7942]",
      content: `By now, your exhibitions feel prestigious. Invitations come without you chasing them. Your name carries weight.

We are more established — in business, in career, in identity.

The children grow. We grow with them.

We stay disciplined about our health. We refuse to let exhaustion swallow us whole. We lift weights. We stretch. We remind each other to drink water and sleep.

We travel more intentionally now. Not rushed. Not chaotic. We savor places.

And even with full schedules and growing responsibilities, we still look at each other across the room and feel that same pull from our first years.`
    },
    {
      title: "Our 40s",
      subtitle: "Reflection and Strength",
      icon: "🍷",
      color: "rgba(74, 21, 75, 0.8)", // Deep Plum
      border: "border-[#800020]",
      content: `We celebrate 15 years together with children who know what steady love looks like.

We take care of our health seriously. We check in with each other — physically and emotionally. We understand that longevity is a gift we must protect.

We go on date nights because we want to — not because we need to fix something.

We look back at what we built from nothing. The business. The art. The home. The family.

We admire each other more than we did when we were young — because now admiration is earned daily.

We teach our children values not just through words, but through example: discipline, loyalty, kindness, strength.`
    },
    {
      title: "Our 50s",
      subtitle: "A Softer Season",
      icon: "🍂",
      color: "rgba(139, 101, 8, 0.8)", // Warm Amber
      border: "border-[#daa520]",
      content: `Some of the children begin to leave the nest. The house grows quieter again.

We allow ourselves to be selfish in the sweetest way. More travel. More long mornings. More spontaneous drives.

We settle closer to nature. The house we dreamed of becomes real — open land, animals, a garden we pretend we fully understand.

There’s a garage with vintage cars and motorcycles. You shake your head at me, but you smile every time.

We built this. Slowly. Together.`
    },
    {
      title: "Our 60s",
      subtitle: "Legacy and Guidance",
      icon: "🕰️",
      color: "rgba(26, 43, 76, 0.8)", // Deep Navy
      border: "border-[#4682b4]",
      content: `Now we guide more than we build.

Our children come to us for advice — not because they have to, but because they trust us. We help them through their life decisions without controlling them.

We stay fit. We stay active. We lift our grandchildren into the air. We play with them. We tell them stories — stories we documented. Stories from the beginning.

We travel as a big family sometimes. We sit at the head of the table, not out of authority — but out of years earned.`
    },
    {
      title: "Our 70s",
      subtitle: "Back to Us",
      icon: "☕",
      color: "rgba(47, 79, 79, 0.8)", // Slate Gray/Blue
      border: "border-[#708090]",
      content: `Life slows again.

We travel simply because we can. We revisit places that meant something. We sit quietly in parks, on benches, in small cafés.

Sometimes we laugh remembering how young and serious we were when we first started dating. How intense everything felt. How dramatic distance once seemed.

We hold hands not out of habit — but out of preference.`
    },
    {
      title: "Our 80s, 90s, 100s",
      subtitle: "The Two of Us",
      icon: "🕯️",
      color: "rgba(96, 16, 16, 0.8)", // Rich Crimson
      border: "border-[#b22222]",
      content: `At some point, it becomes just us again.

Generations gather around us. Children. Grandchildren. Their children.

They look at us and see what endurance looks like. What health looks like. What love maintained with discipline looks like.

We are proud — not of wealth, not of status — but of the way we treated each other.

In the end, it was always simple.

We chose each other.
We protected each other.
We grew beside each other.
We never stopped walking next to one another.

And even after all the decades, when the house is quiet and the lights are low, it is still just two people who once met in their late 20s — brave enough to say yes.`
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
      const timer = setTimeout(() => setStage('arrived'), 10000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const triggerEmberPulse = () => {
    const newEmbers = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: 100 + Math.random() * 20, // Start from bottom
      size: 4 + Math.random() * 6,
      animationDuration: 3 + Math.random() * 4,
      delay: Math.random() * 0.5,
    }));
    setEmbers(prev => [...prev, ...newEmbers]);
    setTimeout(() => setEmbers(prev => prev.filter(e => e.id < Date.now())), 5000);
  };

  const nextPage = () => { setPage(prev => prev + 1); triggerEmberPulse(); };
  const prevPage = () => setPage(prev => prev - 1);

  // Math for the cozy spiral toward the hearth
  const angle = progress * 0.1 * Math.PI * 4;
  const radius = 180 * (1 - progress / 100);
  const posX = Math.cos(angle) * radius;
  const posY = Math.sin(angle) * radius;

  // Determine dynamic background color for reading stage
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
            {/* The Hearth / Home Glow */}
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
                  <h1 className="text-4xl md:text-5xl text-[#fdfbf7] font-cursive mb-6 tracking-wide">The Life We Will Build</h1>
                  <p className="font-light text-[#dcb897] mb-12 px-6 text-[11px] tracking-[0.3em] uppercase leading-relaxed">A promise of the years ahead</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-3 border-2 border-[#ffb05c] px-8 py-3 text-[#ffb05c] text-[11px] font-bold uppercase tracking-[0.4em] rounded-full shadow-[0_0_20px_rgba(255,176,92,0.2)] hover:bg-[#ffb05c] hover:text-[#15100c] transition-all duration-300">Open Door <ChevronRight size={16} /></button>
                </div>
              </div>
            )}

            {/* THE DECADES */}
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
                  {/* TIME LOCK LOGIC ON FINAL PAGE */}
                  {(page === pages.length && !isUnlocked) ? (
                    <div className="mt-12 flex flex-col items-center justify-center animate-pulse">
                      <Lock className="text-[#ffb05c] mb-6 opacity-60" size={40} />
                      <p className="text-[#dcb897] text-center text-[12px] uppercase tracking-[0.3em] mb-10">Future Encrypted</p>
                      <p className="text-[20px] md:text-[23px] leading-[1.8] font-cursive text-center text-[#fdfbf7] blur-md select-none">
                        {pages[page - 1].content}
                      </p>
                      <div className="mt-10 p-4 border border-[#ffb05c]/30 rounded-lg bg-black/30">
                        <p className="text-[10px] text-[#ffb05c] tracking-widest uppercase text-center">This chapter unlocks at 14:00 IST</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-col items-center pb-12">
                      <div className="text-4xl mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{pages[page - 1].icon}</div>
                      <p className="text-[21px] md:text-[24px] leading-[1.8] font-cursive text-center text-[#fdfbf7] whitespace-pre-line tracking-wide drop-shadow-md">
                        {pages[page - 1].content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* END CREDITS */}
            {page > pages.length && (
              <div className="p-10 flex-grow flex flex-col relative overflow-hidden animate-fade-in bg-[rgba(30,20,15,0.9)]">
                <div className="text-center my-auto flex flex-col items-center z-10">
                  <Heart size={35} fill="#ffb05c" className="text-[#ffb05c] mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(255,176,92,0.6)]" />
                  <h2 className="text-4xl text-[#fdfbf7] font-cursive mb-6 tracking-wide">Welcome Home</h2>
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
