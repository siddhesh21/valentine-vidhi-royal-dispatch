import React, { useEffect, useRef, useState } from 'react';
import { Clover, Sparkles } from 'lucide-react';
import './App.css';

const INDIA_TIMEZONE = 'Asia/Kolkata';
const MEETING_DAY_KEY = '2026-05-03';

// Kept the favorite things to maintain the beautiful floating physics effect
const favoriteThings = [
  'Trekking', 'Hiking', 'Nature', 'Archaeologist', 'Book Nook',
  'Vintage Stamps', 'Cute Stickers', 'Peach Ice Tea', 'Sushi',
  'Truffle Pasta', 'Kheema Pav', 'Mom\'s Medu Wada Sambar',
  'Sabudana Vada', 'Kolambi Fry', 'Strawberry Cheesecake',
  'Tiramisu', 'Biscoff', 'Salted Caramel', 'Vanilla Ice Cream',
  'Roasted Almond', 'Sunny Side Eggs', 'Avocado Toast + Chilli',
  'Cornflakes + Cold Milk', 'Cosmo', 'Long Island',
  'Whiskey + Warm Water', 'Sex on the Beach', 'Strawberry Body Butter',
  'Candles', 'Skincare', 'Plum Face Wash', 'Soft Days', 'Comfort',
  'Warmth', 'Party Monster', 'Die With A Smile', 'Maula Maula',
  'KK', 'HER', 'Anime', 'One Piece', 'Naruto', 'Studio Ghibli',
  'Onsen', 'Japan', 'Don Quijote', 'Kolambi shakha', 'Icy glow Divine'
];

// Colors pulled directly from the bouquet image (Sky Blue, Soft Pink, Peach)
const floralAuraRings = [
  { size: 460, opacity: 0.35, duration: 25, delay: 0, colors: 'rgba(137,207,240,0.5), rgba(255,182,193,0.15), transparent' },
  { size: 360, opacity: 0.45, duration: 18, delay: -5, colors: 'rgba(255,229,180,0.5), rgba(137,207,240,0.2), transparent' },
  { size: 280, opacity: 0.55, duration: 12, delay: -2, colors: 'rgba(255,182,193,0.6), rgba(255,229,180,0.25), transparent' },
];

function getTimeUntilMeeting(now) {
  // Parsing the target date as midnight IST
  const meetingDay = new Date(`${MEETING_DAY_KEY}T00:00:00+05:30`);
  const diff = meetingDay.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function App() {
  const [realTime, setRealTime] = useState(() => new Date());
  const itemsRef = useRef([]);
  const requestRef = useRef();

  const countdown = getTimeUntilMeeting(realTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRealTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    const createBody = (id, text) => ({
      id,
      text,
      x: width * 0.18 + Math.random() * width * 0.64,
      y: -80 - Math.random() * height * 0.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: 0.55 + Math.random() * 0.35,
      radius: 38,
    });

    const bodies = favoriteThings.slice(0, 20).map((text, id) => createBody(id, text));

    const updatePhysics = () => {
      bodies.forEach((body) => {
        body.x += body.vx;
        body.y += body.vy;

        const dxCenter = centerX - body.x;
        const dyCenter = centerY - body.y;
        const distCenter = Math.max(Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter), 1);

        body.vx += (dxCenter / distCenter) * 0.003;
        body.vy += (dyCenter / distCenter) * 0.003;

        if (body.x < width * 0.08) body.vx += 0.015;
        if (body.x > width * 0.92) body.vx -= 0.015;

        bodies.forEach((other) => {
          if (body.id === other.id) return;

          const dx = body.x - other.x;
          const dy = body.y - other.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const minDistance = body.radius + other.radius;

          if (distance < minDistance) {
            const force = (minDistance - distance) * 0.001;
            body.vx += (dx / distance) * force;
            body.vy += (dy / distance) * force;
          }
        });

        const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
        if (speed > 1) {
          body.vx *= 0.95;
          body.vy *= 0.95;
        }

        let scale = 1;
        let opacity = 1;

        if (distCenter < 120) {
          scale = distCenter / 120;
          opacity = distCenter / 120;

          if (distCenter < 30) {
            Object.assign(body, createBody(body.id, body.text));
          }
        }

        if (body.y > height + 120) {
          Object.assign(body, createBody(body.id, body.text));
        }

        const element = itemsRef.current[body.id];
        if (element) {
          element.style.transform = `translate(${body.x}px, ${body.y}px) scale(${scale})`;
          element.style.opacity = String(opacity);
        }
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0a1118] text-white">
      <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(137,207,240,0.12),_transparent_40%),linear-gradient(180deg,_#101c26_0%,_#0a1118_45%,_#060a0f_100%)] px-6 py-10">
        <div className="paper-texture absolute inset-0 opacity-20" />

        {/* Floral Color Gradients in the background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,182,193,0.08),_transparent_30%),radial-gradient(circle_at_80%_70%,_rgba(255,229,180,0.08),_transparent_30%)]" />

        <div className="pointer-events-none absolute inset-0">
          {favoriteThings.slice(0, 20).map((thing, index) => (
            <div
              key={thing}
              ref={(element) => {
                itemsRef.current[index] = element;
              }}
              className="absolute left-0 top-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-[#e6f4fa] backdrop-blur-md"
              style={{ transform: 'translate(-120px, -120px)' }}
            >
              {thing}
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-6xl">
          <div className="flex w-full items-start justify-center text-[10px] uppercase tracking-[0.4em] text-white/55 mt-4">
            <div className="title-glow relative inline-flex items-center gap-3 rounded-full border border-[#89cff0]/30 bg-[#89cff0]/10 px-5 py-3 text-[#ccebff]">
              <Sparkles size={14} className="sparkle-orbit shrink-0 text-[#ffb6c1]" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.38em]">Royal Dispatch</span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffe5b4]">
                  Counting down to you.
                </span>
              </div>
              <Clover size={14} className="shrink-0 text-[#a0c49d]" /> {/* Olive green hint */}
            </div>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[52%] w-full max-w-[44rem] -translate-x-1/2 -translate-y-1/2 px-4">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[40px] border border-white/5 bg-[radial-gradient(circle_at_center,_rgba(137,207,240,0.1),_transparent_25%),linear-gradient(180deg,_rgba(15,22,33,0.6),_rgba(8,12,18,0.4))] md:min-h-[34rem]">

              {/* Internal vibrant glow matching bouquet */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(255,182,193,0.15),_transparent_20%),radial-gradient(circle_at_60%_60%,_rgba(137,207,240,0.15),_transparent_25%)]" />
              <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.04),_transparent_60%)] blur-2xl md:h-[34rem] md:w-[34rem]" />

              {floralAuraRings.map((ring, index) => (
                <div
                  key={ring.size}
                  className="floral-accretion absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: `min(${ring.size}px, 92vw)`,
                    height: `min(${Math.round(ring.size * 0.26)}px, 24vw)`,
                    '--base-rotate': `${index * 35}deg`,
                    opacity: ring.opacity,
                    animationDuration: `${ring.duration}s`,
                    animationDelay: `${ring.delay}s`,
                    background: `conic-gradient(from ${index * 60}deg, transparent, ${ring.colors})`,
                    filter: 'blur(12px)',
                  }}
                />
              ))}

              <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_rgba(255,182,193,0.1)_26%,_rgba(10,17,26,0.95)_31%,_rgba(4,7,12,1)_46%,_transparent_47%)] shadow-[0_0_80px_rgba(137,207,240,0.15)] md:h-[26rem] md:w-[26rem]" />
              <div className="absolute left-1/2 top-1/2 h-[6rem] w-[6rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[0_0_80px_rgba(0,0,0,0.9)] md:h-[9rem] md:w-[9rem]" />
              <div className="floral-lens absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[22rem] md:w-[22rem]" />

              {/* The Live Countdown */}
              <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center w-full">
                <p className="font-ink text-5xl leading-none text-[#ffe5b4] drop-shadow-[0_0_18px_rgba(255,229,180,0.4)] md:text-7xl">
                  {countdown.days} <span className="text-2xl md:text-4xl text-[#ffb6c1]">days</span>
                </p>
                <div className="mt-3 md:mt-5 flex items-center justify-center gap-2 font-mono text-lg md:text-2xl tracking-[0.2em] text-[#89cff0]">
                  <div className="flex flex-col items-center">
                    <span>{String(countdown.hours).padStart(2, '0')}</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#89cff0]/60 mt-1">HRS</span>
                  </div>
                  <span className="mb-4 opacity-50">:</span>
                  <div className="flex flex-col items-center">
                    <span>{String(countdown.minutes).padStart(2, '0')}</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#89cff0]/60 mt-1">MIN</span>
                  </div>
                  <span className="mb-4 opacity-50">:</span>
                  <div className="flex flex-col items-center">
                    <span>{String(countdown.seconds).padStart(2, '0')}</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#89cff0]/60 mt-1">SEC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=Parisienne&display=swap');

        :root {
          font-family: 'Manrope', sans-serif;
        }

        .font-ink {
          font-family: 'Parisienne', cursive;
          letter-spacing: 0.02em;
        }

        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E");
        }

        .floral-accretion {
          transform-origin: center;
          mix-blend-mode: screen;
          animation: accretionSpin linear infinite;
        }

        .title-glow {
          box-shadow:
            0 0 24px rgba(137, 207, 240, 0.2),
            inset 0 0 18px rgba(137, 207, 240, 0.06);
        }

        .sparkle-orbit {
          animation: sparkleTwinkle 2.4s ease-in-out infinite;
        }

        .floral-lens {
          box-shadow:
            0 0 0 10px rgba(255, 255, 255, 0.01),
            0 0 90px rgba(137, 207, 240, 0.15),
            inset 0 0 40px rgba(255, 182, 193, 0.08);
          animation: lensPulse 6s ease-in-out infinite;
        }

        @keyframes accretionSpin {
          from {
            transform: translate(-50%, -50%) rotate(var(--base-rotate)) scale(0.98);
          }
          50% {
            transform: translate(-50%, -50%) rotate(calc(var(--base-rotate) + 180deg)) scale(1.04);
          }
          to {
            transform: translate(-50%, -50%) rotate(calc(var(--base-rotate) + 360deg)) scale(0.98);
          }
        }

        @keyframes lensPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.98);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.03);
            opacity: 1;
          }
        }

        @keyframes sparkleTwinkle {
          0%, 100% {
            transform: scale(0.9) rotate(0deg);
            opacity: 0.65;
            filter: drop-shadow(0 0 0 rgba(255, 182, 193, 0));
          }
          50% {
            transform: scale(1.18) rotate(12deg);
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255, 182, 193, 0.75));
          }
        }
      `}</style>
    </div>
  );
}

export default App;