import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Cake,
  Clover,
  Coffee,
  Download,
  HeartHandshake,
  Heart,
  Lock,
  Moon,
  Send,
  Sparkles,
  Sun,
  Unlock,
  Utensils,
  X,
} from 'lucide-react';
import './App.css';

const IS_TEST_MODE = false;
const INDIA_TIMEZONE = 'Asia/Kolkata';
const STORAGE_KEY = 'royal-dispatch-answers';
const NOTE_STORAGE_KEY = 'royal-dispatch-note-for-me';
const BIRTHDAY_KEY = '2026-04-02';
const TOGETHER_SINCE_KEY = '2025-11-07';
const MEETING_DAY_KEY = '2026-05-03';

const favoriteThings = [
  'Trekking',
  'Hiking',
  'Nature',
  'Archaeologist',
  'Book Nook',
  'Vintage Stamps',
  'Cute Stickers',
  'Peach Ice Tea',
  'Sushi',
  'Truffle Pasta',
  'Kheema Pav',
  'Mom\'s Medu Wada Sambar',
  'Sabudana Vada',
  'Kolambi Fry',
  'Strawberry Cheesecake',
  'Tiramisu',
  'Biscoff',
  'Salted Caramel',
  'Vanilla Ice Cream',
  'Roasted Almond',
  'Sunny Side Eggs',
  'Avocado Toast + Chilli',
  'Cornflakes + Cold Milk',
  'Cosmo',
  'Long Island',
  'Whiskey + Warm Water',
  'Sex on the Beach',
  'Strawberry Body Butter',
  'Candles',
  'Skincare',
  'Plum Face Wash',
  'Soft Days',
  'Comfort',
  'Warmth',
  'Party Monster (slowed)',
  'Die With A Smile',
  'Maula Maula',
  'KK',
  'HER',
  'Anime',
  'One Piece',
  'Naruto',
  'Studio Ghibli',
  'Onsen',
  'Japan',
  'Don Quijote',
  'Kolambi shakha',
  'Muzigae Mansion: Icy glow Divine'
];

const timeline = [
  { hr: 0, icon: <Moon size={18} />, q: "What's one thing you're secretly wishing for this year?", msg: "Happy Birthday, my favourite person.\nDifferent places, same moment, and somehow, you still feel right next to me." },
  { hr: 1, icon: <Moon size={18} />, q: 'If I was there right now, what would we be doing?', msg: "If I could be anywhere right now, it wouldn't be a place. It would just be next to you." },
  { hr: 2, icon: <Moon size={18} />, q: "What's something that instantly calms you?", msg: "You don't even realise how much peace you bring into my life." },
  { hr: 3, icon: <Moon size={18} />, q: 'When did you first feel comfortable with me?', msg: 'My favourite thing about you is how effortlessly you became important to me.' },
  { hr: 4, icon: <Moon size={18} />, q: 'Do you believe two people can feel close even in silence?', msg: 'Because with you, even silence feels like connection.' },
  { hr: 5, icon: <Moon size={18} />, q: 'One word to describe us?', msg: "You're not just someone I like. You're someone I choose." },
  { hr: 6, icon: <Sun size={18} />, q: "What's the first thing you're doing after waking up?", msg: 'Good morning, birthday girl.\nSame sun, different skies, still ours.' },
  { hr: 7, icon: <Coffee size={18} />, q: 'Be honest, am I cute annoying or just annoying?', msg: "If I was there, I'd already be annoying you, but in the way that makes you smile." },
  { hr: 8, icon: <Sun size={18} />, q: 'What outfit are you wearing today?', msg: "You look your best when you're just being you. No effort needed." },
  { hr: 9, icon: <Sun size={18} />, q: "What's one small thing you love about yourself?", msg: 'I notice the small things about you, and I like all of them.' },
  { hr: 10, icon: <Sun size={18} />, q: 'Do you feel special today?', msg: "You're not just special today. Today just finally caught up." },
  { hr: 11, icon: <Sun size={18} />, q: "How's your day feeling so far?", msg: 'I hope today feels soft, easy, and a little magical for you.' },
  { hr: 12, icon: <Utensils size={18} />, q: 'Are you hungry or just pretending to be productive?', msg: "Lunch is on me today, but soon, we're sharing a table instead of distance." },
  { hr: 13, icon: <Sun size={18} />, q: "What's something that reminded you of me recently?", msg: "You've become part of my routine without even trying." },
  { hr: 14, icon: <Heart size={18} />, q: 'Say it honestly, do you miss me sometimes?', msg: "I don't say this a lot, but I really, really like you." },
  { hr: 15, icon: <Sun size={18} />, q: 'Where should we go when we finally meet?', msg: 'Every time I imagine us meeting, it just feels right.' },
  { hr: 16, icon: <Sun size={18} />, q: "What's your perfect kind of chill evening?", msg: 'You make even ordinary days feel like something to look forward to.' },
  { hr: 17, icon: <Heart size={18} />, q: 'Send me a selfie?', msg: 'I knew it. You look really good today.' },
  { hr: 18, icon: <Sun size={18} />, q: 'Are you a sunset person or night person?', msg: 'Moments like this are meant to be shared. Remember that.' },
  { hr: 19, icon: <Moon size={18} />, q: 'Would you pick a ride or a long walk with me?', msg: "If I was there, we'd probably do both and not want it to end." },
  { hr: 20, icon: <Cake size={18} />, q: "What dessert are you craving right now?", msg: "Save some for me, or don't, I'll still steal a bite when I'm there." },
  { hr: 21, icon: <Heart size={18} />, q: "What's one thing you've started liking about me?", msg: "You're slowly becoming my favourite habit." },
  { hr: 22, icon: <Moon size={18} />, q: "Do you think we're a good story?", msg: "I don't know where this goes, but I know I want to keep going." },
  { hr: 23, icon: <Moon size={18} />, q: 'Did today feel a little different?', msg: "Next birthday, I'm not missing it. That's a promise." },
];

const wormholeAuraRings = [
  { size: 460, opacity: 0.2, duration: 20, delay: 0, colors: 'rgba(255,149,76,0.5), rgba(255,80,124,0.08), transparent' },
  { size: 360, opacity: 0.24, duration: 15, delay: -5, colors: 'rgba(255,220,150,0.5), rgba(234,88,174,0.12), transparent' },
  { size: 280, opacity: 0.35, duration: 10, delay: -2, colors: 'rgba(255,132,63,0.7), rgba(255,195,113,0.16), transparent' },
];

const pinkMolecules = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 82)}%`,
  top: `${6 + ((index * 29) % 80)}%`,
  size: 8 + (index % 5) * 5,
  duration: 4.2 + (index % 6) * 0.55,
  delay: (index % 7) * -0.7,
  driftX: -36 + (index % 9) * 9,
  driftY: -28 + (index % 8) * 7,
  blur: index % 3 === 0 ? 10 : 4,
  opacity: 0.35 + (index % 4) * 0.12,
}));

function getIndiaTimeParts(date) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: INDIA_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  );

  return {
    dayKey: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function getAppPhase(dayKey) {
  if (dayKey < BIRTHDAY_KEY) return 'pre_birthday';
  return 'birthday';
}

function getDaysTogether(dayKey) {
  const start = new Date(`${TOGETHER_SINCE_KEY}T00:00:00Z`);
  const today = new Date(`${dayKey}T00:00:00Z`);
  const diff = today.getTime() - start.getTime();
  const rawDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.max(1, rawDays + 1);
}

function getDaysUntilMeeting(now = new Date()) {
  const today = new Date(now);
  const meetingDay = new Date(`${MEETING_DAY_KEY}T00:00:00`);
  const diff = meetingDay.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function createAnswerExport(answersMap, noteForMe) {
  const answeredHours = Object.keys(answersMap)
    .map(Number)
    .sort((a, b) => a - b);

  const body =
    answeredHours.length === 0
      ? 'No answers were saved.'
      : answeredHours
        .map((hour) => {
          const item = timeline.find((entry) => entry.hr === hour);
          return [`${String(hour).padStart(2, '0')}:00`, `Question: ${item?.q ?? 'Unknown'}`, `Answer: ${answersMap[hour]}`].join('\n');
        })
        .join('\n\n');

  const noteSection = noteForMe.trim()
    ? `\n\nNote for me\n${noteForMe.trim()}\n`
    : '\n\nNote for me\nNo note was saved.\n';

  return `Royal Dispatch Answers\nTimezone: ${INDIA_TIMEZONE}\nDate: ${BIRTHDAY_KEY}\n\n${body}${noteSection}`;
}

function App() {
  const [realTime, setRealTime] = useState(() => new Date());
  const [testStage, setTestStage] = useState('wormhole');
  const [testHour, setTestHour] = useState(0);
  const [stage, setStage] = useState('wormhole');
  const [answers, setAnswers] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [noteForMe, setNoteForMe] = useState(() => {
    try {
      return window.localStorage.getItem(NOTE_STORAGE_KEY) ?? '';
    } catch {
      return '';
    }
  });
  const [input, setInput] = useState('');
  const [activeHour, setActiveHour] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const itemsRef = useRef([]);
  const requestRef = useRef();

  const indiaTime = getIndiaTimeParts(realTime);
  const appPhase = IS_TEST_MODE ? 'birthday' : getAppPhase(indiaTime.dayKey);
  const currentHour = IS_TEST_MODE ? testHour : indiaTime.hour;
  const currentStage = IS_TEST_MODE
    ? testStage
    : appPhase === 'final'
      ? 'final'
      : stage;
  const activeItem = activeHour === null ? null : timeline.find((item) => item.hr === activeHour);
  const answeredCount = Object.keys(answers).length;
  const exportReady = true;
  const allMomentsUnlocked = !IS_TEST_MODE && appPhase === 'birthday';
  const daysTogether = getDaysTogether(indiaTime.dayKey);
  const daysUntilMeeting = getDaysUntilMeeting(realTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRealTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // Ignore storage failures and keep the in-memory answers.
    }
  }, [answers]);

  useEffect(() => {
    try {
      window.localStorage.setItem(NOTE_STORAGE_KEY, noteForMe);
    } catch {
      // Ignore storage failures and keep the in-memory note.
    }
  }, [noteForMe]);

  useEffect(() => {
    if (currentStage !== 'wormhole') {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return undefined;
    }

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

    const bodies = favoriteThings.slice(0, 15).map((text, id) => createBody(id, text));

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

        if (distCenter < 110) {
          scale = distCenter / 110;
          opacity = distCenter / 110;

          if (distCenter < 24) {
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
  }, [currentStage]);

  const handleStartJourney = () => {
    if (IS_TEST_MODE) {
      setTestStage('grid');
      return;
    }

    if (appPhase !== 'birthday') return;
    setStage('grid');
  };

  const handleHourUnlock = (hour) => {
    if (!IS_TEST_MODE && appPhase !== 'birthday') {
      window.alert('The archive only opens on April 2 in India.');
      return;
    }

    if (!allMomentsUnlocked && currentHour < hour) {
      window.alert(`Not yet. This box opens at ${String(hour).padStart(2, '0')}:00 IST.`);
      return;
    }

    const previousAnswer = answers[hour] ?? '';
    setActiveHour(hour);
    setInput(previousAnswer);
    setShowMessage(Boolean(previousAnswer));
  };

  const closePortal = () => {
    setActiveHour(null);
    setInput('');
    setShowMessage(false);
  };

  const submitAnswer = () => {
    if (!activeItem) return;

    const trimmed = input.trim();
    if (trimmed.length < 2) return;

    setAnswers((prev) => ({ ...prev, [activeItem.hr]: trimmed }));
    setShowMessage(true);
  };

  const exportAnswers = () => {
    const exportText = createAnswerExport(answers, noteForMe);
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'royal-dispatch-answers.txt';
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#05070b] text-white">
      {currentStage === 'wormhole' && (
        <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,144,72,0.14),_transparent_35%),linear-gradient(180deg,_#23140f_0%,_#0d1117_45%,_#06080d_100%)] px-6 py-10">
          <div className="paper-texture absolute inset-0 opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(221,153,81,0.18),_transparent_18%)]" />

          <div className="pointer-events-none absolute inset-0">
            {favoriteThings.slice(0, 15).map((thing, index) => (
              <div
                key={thing}
                ref={(element) => {
                  itemsRef.current[index] = element;
                }}
                className="absolute left-0 top-0 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-[#f3d9b2] backdrop-blur-md"
                style={{ transform: 'translate(-120px, -120px)' }}
              >
                {thing}
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-6xl">
            <div className="flex w-full items-start justify-start text-[10px] uppercase tracking-[0.4em] text-white/55">
              <div className="title-glow relative inline-flex items-center gap-3 rounded-full border border-[#c99a2b]/35 bg-[#8b6a15]/10 px-5 py-3 text-[#f6d06f]">
                <Sparkles size={14} className="sparkle-orbit shrink-0 text-[#ffe8a8]" />
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.38em]">Royal Dispatch to my wife to be</span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffe9bd]">
                    {`${daysUntilMeeting} ${daysUntilMeeting === 1 ? 'day' : 'days'}... until this distance disappears.`}
                  </span>
                </div>
                <Clover size={14} className="shrink-0 text-[#c8ff9c]" />
                <Sparkles size={14} className="sparkle-orbit sparkle-delay shrink-0 text-[#ffe8a8]" />
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[48%] w-full max-w-[44rem] -translate-x-1/2 -translate-y-1/2 px-4">
              <div className="relative min-h-[22rem] overflow-hidden rounded-[40px] border border-white/8 bg-[radial-gradient(circle_at_center,_rgba(255,170,80,0.14),_transparent_22%),linear-gradient(180deg,_rgba(11,16,25,0.7),_rgba(5,8,14,0.35))] md:min-h-[30rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,_rgba(255,126,73,0.22),_transparent_16%),radial-gradient(circle_at_50%_58%,_rgba(41,93,255,0.12),_transparent_28%)]" />
                <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06),_transparent_58%)] blur-2xl md:h-[32rem] md:w-[32rem]" />

                {wormholeAuraRings.map((ring, index) => (
                  <div
                    key={ring.size}
                    className="wormhole-accretion absolute left-1/2 top-1/2 rounded-full"
                    style={{
                      width: `min(${ring.size}px, 92vw)`,
                      height: `min(${Math.round(ring.size * 0.26)}px, 24vw)`,
                      '--base-rotate': `${index * 22}deg`,
                      opacity: ring.opacity,
                      animationDuration: `${ring.duration}s`,
                      animationDelay: `${ring.delay}s`,
                      background: `conic-gradient(from ${index * 50}deg, transparent, ${ring.colors})`,
                      filter: 'blur(10px)',
                    }}
                  />
                ))}

                <div className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,_rgba(255,255,255,0.18)_0%,_rgba(255,179,97,0.12)_26%,_rgba(14,16,20,0.95)_31%,_rgba(1,1,2,1)_46%,_transparent_47%)] shadow-[0_0_80px_rgba(255,145,72,0.22)] md:h-[24rem] md:w-[24rem]" />
                <div className="absolute left-1/2 top-1/2 h-[5rem] w-[5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[0_0_80px_rgba(0,0,0,0.9)] md:h-[8rem] md:w-[8rem]" />
                <div className="wormhole-lens absolute left-1/2 top-1/2 h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 md:h-[20rem] md:w-[20rem]" />
                <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <p className="mt-2 font-ink text-4xl leading-none text-[#ffe2bf] drop-shadow-[0_0_18px_rgba(255,180,122,0.35)] md:text-6xl">
                    {daysTogether}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-6 px-4 pb-4 md:pb-8">
              <div>
                <button
                  type="button"
                  onClick={handleStartJourney}
                  disabled={!IS_TEST_MODE && appPhase !== 'birthday'}
                  className={`cursor-pointer group flex items-center justify-center gap-3 rounded-full border px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.45em] transition-all ${!IS_TEST_MODE && appPhase !== 'birthday'
                    ? 'cursor-not-allowed border-white/10 bg-white/[0.04] text-white/35'
                    : 'border-[#f3bf79] bg-[#f3bf79]/8 text-[#fff1dd] hover:bg-[#f3bf79] hover:text-[#2a1405]'
                    }`}
                >
                  Start Journey
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentStage === 'grid' && (
        <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(209,81,92,0.18),_transparent_20%),linear-gradient(180deg,_#101521_0%,_#090d14_52%,_#05070b_100%)] px-5 py-10 md:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
            <header className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#f29ba8]">The Birthday Archives</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">24 hours, 24 locked messages.</h1>
              </div>
            </header>

            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
              <Heart size={14} className="text-[#ffbf9b]" />
              <span>{answeredCount}/24 answered</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {timeline.map((item) => {
                const isReady = allMomentsUnlocked || currentHour >= item.hr;
                const isDone = Boolean(answers[item.hr]);

                return (
                  <button
                    key={item.hr}
                    type="button"
                    onClick={() => handleHourUnlock(item.hr)}
                    className={`group aspect-square rounded-[28px] border p-4 text-left transition-all duration-300 ${isDone
                      ? 'border-[#ef8b96] bg-[linear-gradient(180deg,_rgba(239,139,150,0.24),_rgba(239,139,150,0.12))] shadow-[0_12px_40px_rgba(239,139,150,0.18)]'
                      : isReady
                        ? 'border-white/12 bg-white/[0.05] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]'
                        : 'border-white/8 bg-black/25 hover:border-[#f2a35e]/50'
                      }`}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-white/45">{String(item.hr).padStart(2, '0')}:00</span>
                        <span className={`${isDone ? 'text-white' : isReady ? 'text-[#ffc18e]' : 'text-white/30'}`}>
                          {isDone ? <Heart size={16} fill="currentColor" /> : isReady ? <Unlock size={16} /> : <Lock size={16} />}
                        </span>
                      </div>
                      <div>
                        <div className={`mb-3 ${isDone ? 'text-white' : isReady ? 'text-[#ffc18e]' : 'text-white/35'}`}>{item.icon}</div>
                        <p className="text-sm leading-6 text-white/78">
                          {isDone ? 'Saved and unlocked.' : isReady ? 'Open this hour now.' : 'Locked until its hour arrives.'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#f29ba8]">When the birthday settles</p>
              <button
                type="button"
                onClick={() => setStage('final')}
                className="cursor-pointer mt-5 inline-flex items-center gap-3 rounded-full border border-[#ef8b96]/40 bg-[#ef8b96]/10 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#ffd8dd] transition hover:bg-[#ef8b96]/20"
              >
                Read My Last Note
                <HeartHandshake size={15} />
              </button>
            </div>
          </div>

          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020305]/88 p-5 backdrop-blur-xl animate-fade-in">
              <div className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,_rgba(19,24,36,0.98),_rgba(8,10,15,0.98))] shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,139,150,0.18),_transparent_30%)]" />
                <button
                  type="button"
                  onClick={closePortal}
                  className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-white/[0.05] p-2 text-white/70 transition hover:bg-white/[0.12] hover:text-white"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10 grid min-h-[560px] md:grid-cols-[0.92fr_1.08fr]">
                  <div className="flex flex-col justify-between border-b border-white/10 p-8 md:border-b-0 md:border-r">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.45em] text-[#ef8b96]">Portal {String(activeItem.hr).padStart(2, '0')}:00</p>
                      <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-3 text-[#ffc18e]">{activeItem.icon}</div>
                      <h2 className="mt-6 max-w-sm text-3xl font-semibold leading-tight text-white">{activeItem.q}</h2>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">Saved answer</p>
                      <p className="mt-3 text-sm leading-6 text-white/72">{answers[activeItem.hr] || 'Nothing saved for this hour yet.'}</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col justify-center overflow-hidden p-8">
                    {showMessage && (
                      <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,112,196,0.22),_transparent_35%)]" />
                        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff74c8]/15 blur-3xl" />
                        {pinkMolecules.map((particle) => (
                          <span
                            key={particle.id}
                            className="astrophage-particle absolute rounded-full"
                            style={{
                              left: particle.left,
                              top: particle.top,
                              width: `${particle.size}px`,
                              height: `${particle.size}px`,
                              opacity: particle.opacity,
                              filter: `blur(${particle.blur}px)`,
                              animationDuration: `${particle.duration}s`,
                              animationDelay: `${particle.delay}s`,
                              '--drift-x': `${particle.driftX}px`,
                              '--drift-y': `${particle.driftY}px`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {!showMessage ? (
                      <div className="animate-fade-in-up">
                        <p className="text-[10px] uppercase tracking-[0.45em] text-white/45">Her reply</p>
                        <textarea
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                          placeholder="Write here..."
                          className="mt-5 h-56 w-full rounded-[28px] border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white outline-none transition focus:border-[#ef8b96] focus:bg-black/35"
                        />
                        <button
                          type="button"
                          onClick={submitAnswer}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#ef8b96] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#2f0d14] transition hover:bg-[#f5a6af]"
                        >
                          Save and Reveal
                          <Send size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="animate-bloom relative z-10 text-center">
                        <Sparkles className="mx-auto text-[#ef8b96]" size={24} />
                        <p className="mt-6 text-[10px] uppercase tracking-[0.45em] text-[#ef8b96]">Unlocked message</p>
                        <p className="mt-8 whitespace-pre-line text-2xl leading-relaxed text-white md:text-3xl">{activeItem.msg}</p>
                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                          <button
                            type="button"
                            onClick={() => setShowMessage(false)}
                            className="rounded-full border border-white/12 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/72 transition hover:border-white/30 hover:text-white"
                          >
                            Edit answer
                          </button>
                          <button
                            type="button"
                            onClick={closePortal}
                            className="rounded-full border border-[#ef8b96]/35 bg-[#ef8b96]/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#ffd8dd] transition hover:bg-[#ef8b96]/20"
                          >
                            Close portal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {currentStage === 'final' && (
        <section className="final-letter relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(234,111,121,0.14),_transparent_24%),linear-gradient(180deg,_#160d0f_0%,_#090507_58%,_#040304_100%)] px-6 py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_50%)]" />
          <div className="relative z-10 mx-auto max-w-3xl rounded-[40px] border border-white/10 bg-black/30 p-8 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.5)] md:p-12">
            <p className="animate-fade-in-slow font-ink text-center text-2xl text-[#ef8b96] md:text-3xl">After the final hour</p>
            <div className="mt-10 space-y-6 text-2xl leading-relaxed text-white/82 md:text-[2rem]">
              <p>And just like that… your birthday comes to a close.</p>
              <p>I’ve been sitting here thinking about your day… and honestly, I just feel grateful.</p>
              <p>Grateful that you smiled, that you felt loved, and that in some small way, I got to be a part of it.</p>
              <p>I really hope you enjoyed everything I put together for you. It may have been simple, but it came from a place that’s full of you.</p>
              <p>Even my family being a small part of it… meant a lot to me.</p>
              <p>I don’t just want to celebrate you on days like this.</p>
              <p>I want to make you happy in the everyday moments too… in the little things, the small gestures, the quiet effort.</p>
              <p>Because having you in my life isn’t something I take lightly.</p>
              <p>And if this is what “us” feels like… then I want to keep building on it, step by step, day by day.</p>
              <p>Yesterday was about celebrating you…</p>
              <p>But for me, it’s always going to be about us.</p>
              <p>And now that your birthday is over…</p>
              <p>I keep thinking about your smile, your day, and how you experienced all of this.</p>
              <p>And honestly, I just feel… full. In a quiet, happy way.</p>
              <p>I’m really grateful that you enjoyed what I put together for you.</p>
              <p>It may have been something small from my side… but it carried a lot of you in it.</p>
              <p>Even my family being a small part of it… meant more to me than you probably realise.</p>
              <p>I don’t just want to show up like this on special days.</p>
              <p>I want to keep making you smile in the little moments too… the random days, the quiet ones, the in-between.</p>
              <p>Because having you in my life… isn’t something I take lightly.</p>
              <p>And now… there’s something even more real to look forward to.</p>
              <p>Not just messages… not just calls…</p>
              <p>But you.</p>
              <p>In a few days… I don’t have to imagine us anymore.</p>
              <p>I actually get to be there with you.</p>
              <p>And that…</p>
              <p>I think I’m looking forward to the most.</p>
            </div>

            <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-center text-2xl text-[#ffd6dd] md:text-3xl">Note for me</p>
              <textarea
                value={noteForMe}
                onChange={(event) => setNoteForMe(event.target.value)}
                placeholder="If you want, leave me one last note here..."
                className="mt-5 h-44 w-full rounded-[26px] border border-white/10 bg-black/20 p-5 text-xl leading-relaxed text-white/85 outline-none transition placeholder:text-white/25 focus:border-[#ef8b96] focus:bg-black/30 md:text-2xl"
              />
            </div>

            <div className="closing-sequence relative mt-12 overflow-hidden rounded-[34px] border border-[#ffd09b]/20 bg-[linear-gradient(180deg,_rgba(41,24,14,0.55),_rgba(8,6,7,0.72))] p-8 text-center">
              <div className="sequence-glow absolute inset-0" />
              <div className="relative z-10">
                <p className="sequence-echo text-2xl text-white/68 md:text-3xl">But for me, it’s always going to be about us.</p>
                <p className="sequence-days-us text-4xl text-[#ffe0be] md:text-6xl">{daysTogether} days of us…</p>
                <p className="sequence-and-now mt-6 text-3xl text-white md:text-5xl">And now…</p>
                <p className="sequence-distance mt-5 text-xl text-white/72 md:text-3xl">
                  {daysUntilMeeting} {daysUntilMeeting === 1 ? 'day' : 'days'}… until this distance disappears.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 border-t border-white/10 pt-8 text-center">
              <button
                type="button"
                onClick={() => setStage('grid')}
                className="inline-flex items-center gap-3 text-2xl text-white/70 transition hover:text-white"
              >
                Back to the archive
              </button>
              <button
                type="button"
                onClick={exportReady ? exportAnswers : undefined}
                className={`cursor-pointer inline-flex items-center gap-3 text-2xl transition ${exportReady ? 'text-[#ef8b96] hover:text-[#ffd0d6]' : 'cursor-default text-white/28'
                  }`}
              >
                {`Yours soon to be husband in ${daysUntilMeeting} ${daysUntilMeeting === 1 ? 'day' : 'days'}`}
                {exportReady && <Download size={14} />}
              </button>
            </div>
          </div>
        </section>
      )}

      {IS_TEST_MODE && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col items-center justify-between gap-4 border-t border-green-500/30 bg-black/90 p-4 font-mono text-xs text-green-400 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="rounded border border-green-500/40 bg-green-900/40 px-2 py-1 font-bold">TEST MODE</span>
            <div className="flex overflow-hidden rounded border border-green-500/30">
              <button onClick={() => setTestStage('wormhole')} className={`px-3 py-1 ${testStage === 'wormhole' ? 'bg-green-600 text-black' : 'hover:bg-green-900/50'}`}>Wormhole</button>
              <button onClick={() => setTestStage('grid')} className={`px-3 py-1 ${testStage === 'grid' ? 'bg-green-600 text-black' : 'hover:bg-green-900/50'}`}>Grid</button>
              <button onClick={() => setTestStage('final')} className={`px-3 py-1 ${testStage === 'final' ? 'bg-green-600 text-black' : 'hover:bg-green-900/50'}`}>Final</button>
            </div>
          </div>

          {testStage === 'grid' && (
            <div className="flex items-center gap-3">
              <span>Simulate hour: {testHour}:00</span>
              <input
                type="range"
                min="0"
                max="23"
                value={testHour}
                onChange={(event) => setTestHour(Number(event.target.value))}
                className="w-40 accent-green-500"
              />
            </div>
          )}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=Parisienne&display=swap');

        :root {
          font-family: 'Manrope', sans-serif;
        }

        h1, h2, h3 {
          font-family: 'Instrument Serif', serif;
          font-weight: 400;
        }

        .font-ink {
          font-family: 'Parisienne', cursive;
          letter-spacing: 0.02em;
        }

        .final-letter,
        .final-letter h1,
        .final-letter h2,
        .final-letter h3,
        .final-letter p,
        .final-letter button {
          font-family: 'Parisienne', cursive;
          letter-spacing: 0.02em;
        }

        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E");
        }

        .wormhole-accretion {
          transform-origin: center;
          mix-blend-mode: screen;
          animation: accretionSpin linear infinite;
        }

        .title-glow {
          box-shadow:
            0 0 24px rgba(240, 190, 74, 0.2),
            inset 0 0 18px rgba(240, 190, 74, 0.06);
        }

        .sparkle-orbit {
          animation: sparkleTwinkle 2.4s ease-in-out infinite;
        }

        .sparkle-delay {
          animation-delay: 1.1s;
        }

        .closing-sequence {
          box-shadow:
            0 0 50px rgba(255, 178, 111, 0.08),
            inset 0 0 30px rgba(255, 211, 154, 0.04);
          animation: sequenceWarmZoom 10s ease-in-out infinite;
        }

        .sequence-glow {
          background:
            radial-gradient(circle at 50% 30%, rgba(255, 170, 104, 0.2), transparent 34%),
            radial-gradient(circle at 50% 70%, rgba(255, 111, 174, 0.12), transparent 45%);
          animation: sequenceGlow 9s ease-in-out infinite;
        }

        .sequence-echo,
        .sequence-days-us,
        .sequence-and-now,
        .sequence-see-you,
        .sequence-distance {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          animation-fill-mode: forwards;
        }

        .sequence-echo {
          animation: sequenceEcho 3s ease forwards;
        }

        .sequence-days-us {
          animation: sequenceReveal 1.2s ease 2.4s forwards;
        }

        .sequence-and-now {
          animation: sequenceReveal 1s ease 4.9s forwards;
        }

        .sequence-see-you {
          animation: sequenceRevealStrong 1.4s ease 6.2s forwards;
        }

        .sequence-distance {
          animation: sequenceReveal 1.2s ease 7.4s forwards;
        }

        .wormhole-lens {
          box-shadow:
            0 0 0 10px rgba(255, 255, 255, 0.02),
            0 0 90px rgba(255, 141, 74, 0.2),
            inset 0 0 40px rgba(255, 207, 145, 0.08);
          animation: lensPulse 6s ease-in-out infinite;
        }

        .astrophage-particle {
          background:
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,173,226,0.95) 26%, rgba(255,105,180,0.75) 55%, rgba(255,105,180,0) 72%);
          box-shadow:
            0 0 12px rgba(255, 132, 207, 0.45),
            0 0 28px rgba(255, 99, 193, 0.22);
          animation: astrophageFloat ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-fade-in-slow {
          animation: fadeIn 1.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.35s ease-out forwards;
        }

        .animate-bloom {
          animation: bloom 0.45s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bloom {
          from {
            opacity: 0;
            transform: scale(0.97);
            filter: blur(12px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
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

        @keyframes astrophageFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(0.92);
          }
          35% {
            transform: translate3d(var(--drift-x), calc(var(--drift-y) * -0.55), 0) scale(1.16);
          }
          70% {
            transform: translate3d(calc(var(--drift-x) * -0.45), var(--drift-y), 0) scale(0.98);
          }
        }

        @keyframes sparkleTwinkle {
          0%, 100% {
            transform: scale(0.9) rotate(0deg);
            opacity: 0.65;
            filter: drop-shadow(0 0 0 rgba(255, 232, 168, 0));
          }
          50% {
            transform: scale(1.18) rotate(12deg);
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255, 232, 168, 0.75));
          }
        }

        @keyframes sequenceEcho {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          22%,
          58% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
        }

        @keyframes sequenceReveal {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sequenceRevealStrong {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.94);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1.02);
            filter: blur(0);
          }
        }

        @keyframes sequenceWarmZoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.018);
          }
        }

        @keyframes sequenceGlow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
