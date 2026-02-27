import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Clock, Key } from 'lucide-react';

const VidhisUniverse = () => {
  const [now, setNow] = useState(new Date());
  const [stage, setStage] = useState('welcome'); // welcome -> countdown -> stack
  const [viewingDay, setViewingDay] = useState(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [petals, setPetals] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const [toastBurst, setToastBurst] = useState([]);

  const TARGET_DATE = new Date('2026-03-14T11:00:00+05:30');
  const LETTER_UNLOCK_TIME = new Date('2026-03-14T10:59:00+05:30');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeRemaining = () => {
    const diff = TARGET_DATE - now;
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / 1000 / 60) % 60),
      secs: Math.floor((diff / 1000) % 60)
    };
  };

  const timeLeft = calculateTimeRemaining();
  const daysUntil = timeLeft.days;
  const daysLeft = daysUntil;

  const handleUnlock = () => {
    setPetals(
      Array.from({ length: 20 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        backgroundColor: i % 2 === 0 ? '#d4af37' : '#ffd700',
      }))
    );
    setIsUnlocking(true);
    setTimeout(() => setStage('countdown'), 1500);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastKey((prev) => prev + 1);
    setToastBurst(
      Array.from({ length: 16 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        icon: i % 2 === 0 ? '💛' : '🌻',
        x: -80 + Math.random() * 160,
        y: -40 - Math.random() * 90,
        delay: Math.random() * 0.25,
        duration: 0.9 + Math.random() * 0.8,
      }))
    );
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (toastBurst.length === 0) return;
    const timer = setTimeout(() => setToastBurst([]), 1800);
    return () => clearTimeout(timer);
  }, [toastBurst]);

  const handleBackgroundClick = () => {
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const hours = istTime.getHours();
    // Heartbeat Mode: 10 PM to 6 AM
    if (hours >= 22 || hours < 6) {
      showToast(`Can't sleep? I'm ${daysLeft} days closer.`);
    }
  };

  const handleDayClick = (dayNum) => {
    if (dayNum < daysLeft) {
      showToast("Patience. The best things are arriving properly.");
      // Trigger a small wiggle effect on the lock icon via standard DOM if needed, 
      // but the toast handles the communication perfectly.
    } else {
      setViewingDay(dayNum === viewingDay ? null : dayNum);
    }
  };

  const messages = [
    { day: 14, text: `14 days.\nSome things are already packed.\nSome are already chosen.\nSome are already thinking of you.` },
    { day: 13, text: `13 days.\nThere is something soft waiting to be held.\nIt is not me.\nBut it smells familiar.` },
    { day: 12, text: `12 days.\nA certain bag is not empty.\nIt carries secrets.` },
    { day: 11, text: `11 days.\nSomething delicate will rest against your skin.\nIt chose you before you saw it.` },
    { day: 10, text: `10 days.\nThere’s a scent that reminded me of the way you look at me.\nI kept it.` },
    { day: 9, text: `9 days.\nThere is fabric involved.\nThat’s all I’ll say.` },
    { day: 8, text: `8 days.\nYour name is about to leave a mark — quietly, permanently.` },
    { day: 7, text: `7 days.\nThere is something structured, ivory, and radiant.\nIt’s not the moon.` },
    { day: 6, text: `6 days.\nA book will soon recognize its owner properly.` },
    { day: 5, text: `5 days.\nThere are canvases waiting to witness your hands.` },
    { day: 4, text: `4 days.\nSome things are meant for daylight.\nSome are meant for when the lights go off.` },
    { day: 3, text: `3 days.\nI’ve prepared for your comfort.\nFor your smile.\nFor your “oh my God.”` },
    { day: 2, text: `2 days.\nThere is something unbelievably soft.\nIt already belongs to you.` },
    { day: 1, text: `1 day.\nNo more hints.\nTomorrow, you find out.\n\nSleep well.` }
  ];

  // --- WELCOME SCREEN ---
  if (stage === 'welcome') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1a0101] overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 silk-texture"></div>

        <div className={`z-10 text-center transition-all duration-1000 ${isUnlocking ? 'scale-150 opacity-0 blur-xl' : 'scale-100 opacity-100'}`}>
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-20 animate-pulse"></div>
            <Key size={50} className="text-[#d4af37] mx-auto relative z-10 rotate-45 animate-bounce" />
          </div>
          <h2 className="text-[#d4af37] font-cursive text-4xl md:text-5xl mb-4">A Space for Vidhi</h2>
          <p className="text-[#fdfbf7]/70 font-cursive text-2xl mb-12 italic">Everything is prepared...</p>

          <button
            onClick={handleUnlock}
            className="group relative px-12 py-4 border border-[#d4af37]/30 overflow-hidden rounded-full transition-all hover:border-[#d4af37]"
          >
            <span className="relative z-10 text-[#d4af37] text-2xl font-cursive">Turn the Key</span>
            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10"></div>
          </button>
        </div>

        {/* Petal Layer that triggers on unlock */}
        {isUnlocking && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            {petals.map((petal) => (
              <div key={petal.id} className="petal animate-fall" style={{
                left: petal.left,
                animationDelay: petal.animationDelay,
                backgroundColor: petal.backgroundColor,
              }}></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- COUNTDOWN SCREEN ---
  if (stage === 'countdown') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#2d0202] text-[#d4af37] p-6 animate-fade-in">
        <div className="text-center space-y-12">
          <Clock size={30} className="mx-auto opacity-40 animate-pulse" />
          <div className="space-y-2">
            <h1 className="font-cursive text-4xl text-[#fdfbf7]">The Distance is Closing</h1>
            <p className="text-[9px] tracking-[0.5em] uppercase opacity-50">March 14, 2026 • 11:00 AM</p>
          </div>

          <div className="flex gap-6 md:gap-10 justify-center">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hrs', val: timeLeft.hours },
              { label: 'Min', val: timeLeft.mins },
              { label: 'Sec', val: timeLeft.secs }
            ].map((unit, idx, arr) => (
              <div key={unit.label} className="flex items-start gap-3 md:gap-4">
                <div className="text-center">
                  <span className="text-4xl md:text-6xl font-light block tabular-nums">{unit.val}</span>
                  <p className="text-[8px] uppercase tracking-widest mt-2 opacity-60">{unit.label}</p>
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-3xl md:text-5xl font-light opacity-50 mt-1 md:mt-2">:</span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStage('stack')}
            className="px-8 py-3 bg-[#d4af37] text-[#2d0202] text-[10px] font-bold tracking-[0.3em] uppercase rounded-sm hover:bg-[#fdfbf7] transition-colors"
          >
            Open Preparation Log
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN STACK UI (Same as before but with Wine/Gold tweaks) ---
  return (
    <div
      className="min-h-screen w-full bg-[#1a0101] text-[#fdfbf7] font-serif flex flex-col items-center overflow-x-hidden relative animate-fade-in"
      onClick={handleBackgroundClick}
    >
      {/* Background & Grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a0303] to-[#1a0101]"></div>
      <div className="absolute inset-0 opacity-10 silk-texture pointer-events-none"></div>

      <div className="z-10 mt-16 mb-12 text-center animate-fade-in-up">
        <p className="text-[#d4af37] tracking-[0.4em] uppercase text-[9px] mb-4">Private Archives</p>
        <h1 className="text-3xl font-cursive text-[#fdfbf7]">"Some things bloom for a lifetime"</h1>
      </div>

      <div className="z-10 w-full max-w-2xl px-6 md:px-10 flex flex-col gap-5 pb-24">
        {messages.map((msg) => {
          const isUnlocked = msg.day >= daysUntil;
          const isViewing = viewingDay === msg.day;
          return (
            <div key={msg.day} className={`transition-all duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  handleDayClick(msg.day);
                }}
                className={`cursor-pointer border border-[#d4af37]/20 rounded-sm overflow-hidden transition-all ${isViewing ? 'bg-[#3a0303] border-[#d4af37]/60 shadow-xl' : 'bg-[#1a0101]/40 hover:border-[#d4af37]/40'}`}
              >
                <div className="p-6 md:p-7 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold text-[#d4af37]/40">0{15 - msg.day}</span>
                    <span className="text-sm tracking-[0.2em] uppercase text-[#d4af37]">Night {msg.day}</span>
                  </div>
                  {isUnlocked ? <Unlock size={14} className="text-[#d4af37]" /> : <Lock size={14} className="text-[#d4af37]/20" />}
                </div>
                {isViewing && (
                  <div className="px-8 md:px-12 pb-10 text-center animate-fade-in">
                    <div className="w-8 h-[1px] bg-[#d4af37]/30 mx-auto mb-6"></div>
                    <p className="text-2xl md:text-[28px] font-cursive leading-relaxed whitespace-pre-line text-[#fdfbf7]">{msg.text}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {toastMessage && (
        <div
          key={toastKey}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full border border-[#fff2c2]/60 bg-[#d4af37] text-[#3f2203] text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,215,90,0.55)] animate-fade-in"
        >
          {toastMessage}
        </div>
      )}

      {toastBurst.length > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[99] pointer-events-none">
          {toastBurst.map((piece) => (
            <span
              key={piece.id}
              className="absolute text-xl animate-toast-burst"
              style={{
                '--burst-x': `${piece.x}px`,
                '--burst-y': `${piece.y}px`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
              }}
            >
              {piece.icon}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .silk-texture { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.5'/%3E%3C/svg%3E"); }
        
        .petal { position: absolute; width: 10px; height: 10px; border-radius: 0 50% 0 50%; opacity: 0.8; }
        .animate-fall { animation: fall 3s linear infinite; }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-fade-in { animation: fadeIn 1.5s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        .animate-toast-burst { animation: toastBurst ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastBurst {
          0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--burst-x), var(--burst-y)) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default VidhisUniverse;
