import React, { useState, useEffect } from 'react';
import { Heart, Moon, Star, BookOpen, ShieldCheck, Flower } from 'lucide-react';

const SanctuaryForVidhi = () => {
  const [now, setNow] = useState(new Date());
  const [activeTab, setActiveTab] = useState('reassurance');
  const [viewingNote, setViewingNote] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // Only needs to update slowly now
    return () => clearInterval(timer);
  }, []);

  // Rotating Daily Messages Logic
  const dailyWisdom = [
    "Love is patient enough to wait.",
    "The story pauses, but the feeling does not.",
    "Some reunions become sweeter because we waited.",
    "A temporary distance is nothing to a lifetime love.",
    "The most beautiful flowers grow through the quietest winters.",
    "We are building a foundation that no circumstance can shake."
  ];

  const dailyMessage = dailyWisdom[new Date().getDay() % dailyWisdom.length];

  const hiddenReminders = [
    { title: "A Note on Patience", content: "I am not in a rush to get to a destination, because I am already home in you. Whether we meet today or months from now, my heart is already settled." },
    { title: "The Quiet Strength", content: "I see the way you are showing up for your mother and your family. That strength is one of the many reasons I love you. Take all the time you need." },
    { title: "A Promise", content: "The plans may have moved on the map, but they haven't moved in my mind. We will have our morning coffee and our soft light. It is a matter of 'when', never 'if'." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#1c1616] text-[#e5d5d5] font-serif relative overflow-hidden flex flex-col items-center px-6">
      {/* Soft Background Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2d1e1e_0%,_#1c1616_100%)]"></div>
      <div className="absolute inset-0 opacity-20 paper-texture pointer-events-none"></div>

      {/* Floating Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b0000] blur-[120px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#d4af37] blur-[120px] opacity-5 animate-pulse"></div>

      {/* Header Section */}
      <header className="z-10 mt-20 mb-16 text-center max-w-2xl animate-fade-in">
        <h2 className="text-[#d4af37] tracking-[0.4em] uppercase text-[10px] mb-6 opacity-60">Patience & Presence</h2>
        <h1 className="text-3xl md:text-4xl font-cursive text-[#f5e6e6] mb-8 leading-relaxed">
          Not a Goodbye to the Countdown — Just a Pause.
        </h1>
        <div className="w-16 h-[1px] bg-[#d4af37]/30 mx-auto"></div>
      </header>

      {/* Main Content Area */}
      <main className="z-10 w-full max-w-2xl space-y-12 pb-32">

        {/* Reassurance Message */}
        <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm animate-fade-in-up">
          <p className="text-[17px] leading-relaxed italic text-[#cec0c0]">
            "Sometimes life asks us to stand beside family first. It asks us to be the ground for those we love when their world feels shaky. Our time together will come when the hearts are lighter and the skies are clearer. Until then, I am right here—steady, certain, and holding you from across the miles."
          </p>
        </section>

        {/* When the Time is Right (Rotating Wisdom) */}
        <section className="text-center py-10">
          <Moon size={24} className="mx-auto mb-6 text-[#d4af37] opacity-40" />
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] mb-4">When the Time is Right</h3>
          <p className="text-2xl md:text-3xl font-cursive text-[#f5e6e6] transition-all duration-1000">
            {dailyMessage}
          </p>
        </section>

        {/* For Vidhi Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <Flower size={18} className="text-[#d4af37] opacity-60" />
            <h3 className="text-xl font-light tracking-widest text-[#f5e6e6]">For Vidhi</h3>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
          <p className="text-[16px] leading-relaxed text-[#cec0c0]">
            My heart is with you and your mother during this difficult time. There is no weight you carry that I am not willing to share. I admire the way you are honoring your grandfather’s memory and the love you have for your family. Focus on healing and being present for them. I am the safety net that will never let you fall.
          </p>
        </section>

        {/* Hidden Reminders (Small Gifts) */}
        <section className="pt-10">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] mb-8 text-center opacity-60">Small Reminders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hiddenReminders.map((note, i) => (
              <button
                key={i}
                onClick={() => setViewingNote(viewingNote === i ? null : i)}
                className={`p-6 border rounded-sm transition-all duration-500 text-left ${viewingNote === i ? 'bg-[#2d1e1e] border-[#d4af37]' : 'bg-transparent border-white/10 hover:border-white/30'}`}
              >
                <BookOpen size={16} className="mb-4 text-[#d4af37]" />
                <span className="text-[12px] uppercase tracking-widest block mb-2">{note.title}</span>
                {viewingNote === i && (
                  <p className="text-sm font-cursive text-[#cec0c0] mt-4 leading-relaxed animate-fade-in">
                    {note.content}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Closing Line */}
        <footer className="pt-20 pb-10 text-center animate-fade-in">
          <Heart size={20} className="mx-auto mb-6 text-[#8b0000] opacity-60" />
          <p className="text-xl font-cursive text-[#f5e6e6] leading-relaxed">
            “The calendar changed.<br />
            My love for you did not.”
          </p>
        </footer>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.1'/%3E%3C/svg%3E");
        }
        .animate-fade-in { animation: fadeIn 2s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default SanctuaryForVidhi;