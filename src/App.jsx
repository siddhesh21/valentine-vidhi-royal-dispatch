import React, { useState, useEffect } from 'react';
import { ChevronRight, Flame, Heart, Home } from 'lucide-react';

const CozyLifetimeLetter = () => {
  const [stage, setStage] = useState('journey');
  const [page, setPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [promiseDays, setPromiseDays] = useState(0);
  const [embers, setEmbers] = useState([]);

  const promiseDate = new Date('2025-11-07T00:00:00+05:30');
  const targetDate = new Date('2026-03-14T00:00:00+05:30');

  const pages = [
    {
      title: "Cat Woman Energy",
      subtitle: "1% husband, 99% staff",
      icon: "🐾",
      color: "rgba(139, 69, 19, 0.8)", // Warm Terracotta
      border: "border-[#d27d2d]",
      content: `You’ve basically been trained by Susie & Mew your whole life… which explains why you expect royal treatment.

Don’t worry.
When we live together, we’ll adopt a cat.

And I fully accept that I’ll be:
1% husband
99% staff.

But that’s okay.

Because if loving you means loving cats,
then consider me permanently paws-itively committed.`
    },
    {
      title: "Sushi & Sips",
      subtitle: "Delicate & Dangerous",
      icon: "🍣",
      color: "rgba(184, 115, 51, 0.8)", // Rich Copper
      border: "border-[#cd7f32]",
      content: `You love sushi.
Delicate. Precise. A little addictive.

You love Cosmos.
Pretty. Dangerous. Misleadingly strong.

Honestly?
That checks out.

You look sweet,
but you hit like a double shot.

From now on, I volunteer as:
• Your sushi date partner
• Your official Cosmo taste tester
• And the man who makes sure you get home safely after “just one more”`
    },
    {
      title: "Bodycare Queen",
      subtitle: "Strawberries & Softness",
      icon: "🍓",
      color: "rgba(148, 56, 85, 0.8)", // Berry Pink
      border: "border-[#c85a7c]",
      content: `Strawberry body butter.
Glycolic acid for rough corners.
Under-eye care. Hair rituals.

You don’t “get ready.”
You curate yourself.

And I love that you take care of your skin the way I plan to take care of you — consistently, attentively, intentionally.

Also, let’s be honest…
If you smell like strawberries and softness,
I will absolutely pretend I need “moisturizer advice” just to get closer.`
    },
    {
      title: "Books & Brushstrokes",
      subtitle: "Building Worlds",
      icon: "📚🎨",
      color: "rgba(31, 61, 43, 0.8)", // Deep Forest Green
      border: "border-[#4f7942]",
      content: `You read stories that make your cheeks warm.

You paint stories that make rooms quiet.

One feeds your imagination.
The other feeds your soul.

And me?

I plan to:
• Let you experience the fantasies you underline.
• Stand in the back of your exhibitions watching people admire your work.
• And quietly admire the artist even more.

You create worlds on canvas.
I just want to build one with you.`
    },
    {
      title: "Miniature Magic",
      subtitle: "Tiny Kingdoms",
      icon: "🏠✨",
      color: "rgba(139, 101, 8, 0.8)", // Warm Amber
      border: "border-[#daa520]",
      content: `You don’t just build DIY book nooks.

You build tiny universes.

Little windows.
Little lights.
Little doors to imaginary places.

Which makes sense…

Because you walked into my life and turned it into a carefully crafted scene too.

When we live together,
I expect at least one shelf dedicated to your tiny kingdoms.

And I’ll help you glue the roof — badly — but enthusiastically.`
    },
    {
      title: "Dessert Diplomacy",
      subtitle: "Sweet meets Deep",
      icon: "🍰",
      color: "rgba(92, 64, 51, 0.8)", // Dark Chocolate
      border: "border-[#8b5a2b]",
      content: `You: Tiramisu, vanilla, roasted almond, Biscoff, salted caramel.
Me: Dark chocolate. Belgian. Madagascar. Intense.

We are literally a dessert metaphor.

Soft meets bold.
Sweet meets deep.

From now on, every city we visit, we rate Tiramisu.

Scorecard. Photos. Debate.

Because loving you means committing to a lifetime of “just one more bite.”`
    },
    {
      title: "Stickers & Archaeology",
      subtitle: "Discovering Stories",
      icon: "🧸📜",
      color: "rgba(160, 120, 90, 0.8)", // Warm Parchment/Clay
      border: "border-[#c29b78]",
      content: `You collect cute stickers like artifacts.

You’d probably enjoy brushing dust off a 3,000-year-old vase.

Which means one thing:

You love discovering stories.

And one day, when someone asks how we started,
you’ll smile and say,

“Oh, that one?
That was my favorite excavation.”`
    },
    {
      title: "Massage Policy",
      subtitle: "Lifelong Subscription",
      icon: "💆🏻‍♀️",
      color: "rgba(74, 21, 75, 0.8)", // Deep Plum
      border: "border-[#800020]",
      content: `You love massages.

Lower back.
Scalp.
Feet.
Hands.

Consider this a lifelong subscription.

No booking required.
No time limit.
Unlimited refills.

And I take my job very seriously.`
    },
    {
      title: "French Beading & Preserved Flowers",
      subtitle: "Gathering Reminders",
      icon: "🌸",
      color: "rgba(180, 100, 130, 0.8)", // Rose Mauve
      border: "border-[#d88ba6]",
      content: `You turn flowers into art that never fades.

So I’m collecting stems now — small ones — to preserve.

Because if you can freeze beauty in beads,
I can preserve pieces of places I go…
and bring them back to you.

Little reminders that even when I travel,
I am always gathering things with you in mind.`
    },
    {
      title: "Accessories & That Look",
      subtitle: "Weaponized Elegance",
      icon: "💍",
      color: "rgba(26, 43, 76, 0.8)", // Deep Navy
      border: "border-[#4682b4]",
      content: `Thin necklaces.
Elegant rings.
Personalised anklet with my initial.

Tattoos that mean something.

And Jhumkas?

I lose focus every single time.

You don’t just wear accessories.
You weaponize elegance.

Winter version of you — layered, chic, holding my arm —
is going to be unfair to the rest of the world.`
    },
    {
      title: "Perfume, Silk & That Walk",
      subtitle: "Leaving a Memory",
      icon: "🌺",
      color: "rgba(96, 16, 16, 0.8)", // Rich Crimson
      border: "border-[#b22222]",
      content: `You love perfumes that are intense and summery.

Which means you like leaving a memory before you leave a room.

I’m bringing one I chose for you.

Something that makes me think:
“This is hers.”

Sundresses in summer.
Layers in winter.
Coach bag.
Victoria’s Secret surprises waiting.

You look dreamy in soft light.
You look powerful in structured outfits.

But my favorite look?

You walking toward me.`
    }
  ];

  // Icons used for the "pulling into the hearth" animation
  const floatingIcons = ['🐾', '🍣', '🍓', '📚', '🏠', '🍰', '🧸', '💆🏻‍♀️', '🌸', '💍', '🌺'];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      // Target countdown
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }

      // Promise Ring Days
      const promiseDiff = now - promiseDate;
      if (promiseDiff > 0) {
        setPromiseDays(Math.floor(promiseDiff / (1000 * 60 * 60 * 24)));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set journey stage to last a bit longer (12 seconds) so she can admire the orbits
  useEffect(() => {
    if (stage === 'journey') {
      const timer = setTimeout(() => setStage('arrived'), 12000);
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

      {/* STAGE 1: THE JOURNEY HOME (ORBITS) */}
      {stage === 'journey' && (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full h-full absolute inset-0 z-10 overflow-hidden">

          <h2 className="absolute top-20 text-[#fcdbb6] text-xl tracking-[0.4em] uppercase font-light text-center z-30">Gravity of Us</h2>

          {/* THE LDR COMET (Crossing over the screen) */}
          <div className="absolute top-1/3 left-0 w-full h-10 z-40 pointer-events-none rotate-12">
            <div className="animate-comet flex items-center gap-2 absolute left-[-20%]">
              <span className="text-3xl filter drop-shadow-[0_0_15px_rgba(255,255,255,1)]">💍</span>
              <div className="h-1 w-32 bg-gradient-to-r from-white via-white/50 to-transparent blur-[2px]"></div>
              <span className="text-[#ffb05c] text-[10px] uppercase tracking-widest blur-[0.5px] whitespace-nowrap drop-shadow-md">LDR Ring Incoming...</span>
            </div>
          </div>

          <div className="relative w-full h-full flex items-center justify-center mt-10">

            {/* THE HEARTH (Center) */}
            <div className="absolute w-24 h-24 bg-[#ff8c00] rounded-full blur-[50px] opacity-60 animate-pulse z-20"></div>
            <Flame size={40} className="absolute z-30 text-[#ffb05c] drop-shadow-[0_0_15px_rgba(255,176,92,0.8)]" />

            {/* ORBIT 1: Promise Ring Days (Inner) */}
            <div className="absolute w-[200px] h-[200px] border border-[#ffb05c]/20 rounded-full animate-[spin_12s_linear_infinite]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#15100c] px-3 py-1 rounded-full text-[9px] text-[#ffb05c] border border-[#ffb05c]/40 tracking-widest uppercase shadow-[0_0_10px_rgba(255,176,92,0.2)]">
                Promise Ring: {promiseDays} Days
              </div>
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#ffb05c] rounded-full shadow-[0_0_10px_rgba(255,176,92,0.8)]"></div>
            </div>

            {/* ORBIT 2: LDR Journey (Middle) */}
            <div className="absolute w-[320px] h-[320px] border border-[#d27d2d]/20 rounded-full animate-[spin_20s_linear_infinite_reverse]">
              <div className="absolute bottom-4 left-4 bg-[#15100c] px-3 py-1 rounded-full text-[9px] text-[#d27d2d] border border-[#d27d2d]/40 tracking-widest uppercase rotate-45 shadow-[0_0_10px_rgba(210,125,45,0.2)]">
                Closing the Distance
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-xl drop-shadow-[0_0_5px_rgba(210,125,45,0.8)] rotate-180">✈️</div>
            </div>

            {/* ORBIT 3: The Countdown (Outer) */}
            <div className="absolute w-[460px] h-[460px] border border-white/10 rounded-full animate-[spin_30s_linear_infinite]">
              <div className="absolute top-1/2 -left-16 -translate-y-1/2 bg-[#15100c] px-3 py-1 rounded-full text-[10px] text-white/80 border border-white/20 tracking-widest uppercase -rotate-90 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {timeLeft.days} Days to March 14
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">⏳</div>
            </div>

            {/* ITEMS PULLING INTO CENTER */}
            {floatingIcons.map((icon, index) => {
              // Calculate random starting points on the outer edges
              const angle = (index / floatingIcons.length) * (2 * Math.PI);
              const startX = Math.cos(angle) * 350; // 350px radius
              const startY = Math.sin(angle) * 350;
              const delay = index * 0.8; // Stagger the animations

              return (
                <div
                  key={index}
                  className="absolute text-2xl z-20 animate-pull-to-center drop-shadow-md"
                  style={{
                    '--startX': `${startX}px`,
                    '--startY': `${startY}px`,
                    animationDelay: `${delay}s`,
                    opacity: 0 // hidden initially
                  }}
                >
                  {icon}
                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* STAGE 2: ARRIVED */}
      {stage === 'arrived' && (
        <div className="z-50 animate-bounce cursor-pointer p-4 flex flex-col items-center" onClick={() => setStage('sealed')}>
          <div className="w-64 h-40 bg-[#1e1410]/90 backdrop-blur-xl border border-[#d27d2d]/50 flex items-center justify-center relative rounded-lg shadow-[0_0_50px_rgba(210,125,45,0.2)] hover:bg-[#2a1c16] transition-colors">
            <span className="text-[#fcdbb6] font-light tracking-[0.3em] text-[11px] text-center px-6 uppercase">Open Your Universe</span>
          </div>
        </div>
      )}

      {/* STAGE 3: SEALED (Home Hub) */}
      {stage === 'sealed' && (
        <div className="relative animate-fade-in-up flex flex-col items-center z-10">
          <div className="mb-12 text-center">
            <p className="text-4xl text-[#fdfbf7] font-cursive mb-4 tracking-wide drop-shadow-md">Everything We Are</p>
            <div className="flex gap-6 text-[#d27d2d] font-light text-3xl tracking-widest">
              <span>{timeLeft.days}d</span><span className="opacity-30">:</span><span>{timeLeft.hours}h</span><span className="opacity-30">:</span><span>{timeLeft.minutes}m</span> <span className="opacity-30">:</span><span>{timeLeft.seconds}s</span>
            </div>
          </div>
          <div className="w-80 h-52 bg-[#1e1410]/90 backdrop-blur-xl flex items-center justify-center relative border-t border-[#d27d2d]/40 rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <button onClick={() => { setStage('reading'); triggerEmberPulse(); }} className="z-20 w-16 h-16 rounded-full bg-[#15100c] border border-[#d27d2d] flex items-center justify-center shadow-[0_0_30px_rgba(210,125,45,0.5)] transform hover:scale-110 transition-all duration-500">
              <Home className="text-[#d27d2d] w-6 h-6" />
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
                  <h1 className="text-5xl text-[#fdfbf7] font-cursive mb-6 tracking-wide drop-shadow-md">The Little Things</h1>
                  <p className="font-light text-[#dcb897] mb-12 px-6 text-[11px] tracking-[0.3em] uppercase leading-relaxed">A study of everything you are</p>
                  <button onClick={nextPage} className="mx-auto flex items-center gap-3 border-2 border-[#ffb05c] px-8 py-3 text-[#ffb05c] text-[11px] font-bold uppercase tracking-[0.4em] rounded-full shadow-[0_0_20px_rgba(255,176,92,0.2)] hover:bg-[#ffb05c] hover:text-[#15100c] transition-all duration-300">Begin <ChevronRight size={16} /></button>
                </div>
              </div>
            )}

            {/* THE CONTENT PAGES */}
            {page > 0 && page <= pages.length && (
              <div className="flex-grow min-h-0 flex flex-col animate-fade-in relative">
                {/* TOP NAVIGATION */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 z-20 bg-black/20">
                  <button onClick={prevPage} className="px-4 py-1.5 border border-white/20 rounded-full text-[#dcb897] text-[9px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Back</button>
                  <div className="flex flex-col items-center">
                    <span className="text-[#ffb05c] text-[11px] font-bold tracking-[0.2em] uppercase">{page} / {pages.length}</span>
                    <span className="text-[8px] text-white/50 tracking-[0.2em] uppercase mt-1">{pages[page - 1].title}</span>
                  </div>
                  <button onClick={nextPage} className="px-5 py-1.5 border-2 border-[#ffb05c] rounded-full text-[#ffb05c] text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,176,92,0.2)] hover:bg-[#ffb05c] hover:text-[#15100c] transition-all">
                    {page === pages.length ? "Finish" : "Next"}
                  </button>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar relative px-8 py-6">
                  <div className="mt-2 flex flex-col pb-12 items-center">
                    <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center">{pages[page - 1].icon}</div>
                    <h2 className="text-2xl font-bold tracking-widest text-[#fcdbb6] mb-2 text-center uppercase text-[12px] opacity-80">{pages[page - 1].title}</h2>
                    <div className="w-12 h-[1px] bg-[#d27d2d]/50 mb-8"></div>
                    <p className="text-[21px] md:text-[23px] leading-[1.8] font-cursive text-[#fdfbf7] whitespace-pre-line tracking-wide drop-shadow-md text-center w-full">
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
                  <Heart size={40} fill="#ffb05c" className="text-[#ffb05c] mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(255,176,92,0.8)]" />
                  <h2 className="text-4xl text-[#fdfbf7] font-cursive mb-6 tracking-wide drop-shadow-md">All of You. Always.</h2>
                  <p className="text-[#dcb897] font-light text-[15px] leading-relaxed mb-10 px-6 tracking-wide italic">"I just want to build a world with you."</p>
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
        
        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 0.8; } 100% { transform: translateY(-200px) scale(0.5); opacity: 0; } }
        .animate-float-up { animation: floatUp ease-in forwards; }
        
        .animate-fade-in { animation: fadeIn 1.2s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out both; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes cometFlight {
          0% { transform: translateX(-20vw) translateY(20vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(-20vh); opacity: 0; }
        }
        .animate-comet { animation: cometFlight 8s linear forwards; animation-delay: 2s; }
        
        @keyframes pullToCenter {
          0% { transform: translate(var(--startX), var(--startY)) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(0, 0) scale(0.2); opacity: 0; }
        }
        .animate-pull-to-center { animation: pullToCenter 5s ease-in forwards; }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 176, 92, 0.4); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CozyLifetimeLetter;
