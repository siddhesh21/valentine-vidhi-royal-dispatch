import React, { useState, useEffect } from 'react';
import { Sun, Heart, Sparkles, ArrowRight } from 'lucide-react';

const GudiPadwaExperience = () => {
  const [page, setPage] = useState(1);
  const [blooms, setBlooms] = useState([]);

  // --- Calculate Days Together ---
  const startDate = new Date('2025-11-07');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const diffTime = Math.abs(tomorrow - startDate);
  const daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // --- Sunflower Interaction Logic ---
  const handleTouch = (e) => {
    if (page !== 2) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    const newBloom = { id: Date.now(), x, y };
    setBlooms((prev) => [...prev, newBloom]);

    // Remove bloom after animation
    setTimeout(() => {
      setBlooms((prev) => prev.filter(b => b.id !== newBloom.id));
    }, 2000);
  };

  return (
    <div
      className="min-h-screen w-full bg-[#fcd12a] relative overflow-hidden font-serif select-none"
      onMouseDown={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 opacity-10 paper-texture pointer-events-none"></div>

      {/* Shimmer Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="shimmer-dot" style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's'
          }}></div>
        ))}
      </div>

      {/* PAGE 1: THE LETTER */}
      {page === 1 && (
        <div className="relative z-10 flex items-center justify-center p-6 min-h-screen animate-fade-in">
          <div className="max-w-xl w-full bg-[#fffcf0] border-[16px] border-[#004d4d] p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#800020]"></div>

            <header className="text-center mb-8">
              <Sun className="mx-auto text-[#d4af37] mb-2 animate-spin-slow" size={40} />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#004d4d] font-bold">
                {daysTogether} Days of Us
              </p>
            </header>

            <div className="space-y-5 text-[#3a2e2e] leading-relaxed text-center">
              <h1 className="text-4xl font-cursive text-[#800020]">My Vidhi,</h1>
              <p className="italic">Our first Gudi Padwa together… even from a distance, it feels special because it’s ours.</p>
              <p>You walked into my life like sunlight — gently, but completely. Since then, everything has felt warmer and more certain.</p>
              <p>You are my sunflower — always finding light. I will always be there, making sure you never have to search for that light alone.</p>
              <p className="font-bold text-[#004d4d]">We are building something that lasts.</p>
              <p>Next year, we celebrate in our home, with sunlight pouring in and you exactly where you belong.</p>

              <footer className="pt-8">
                <button
                  onClick={() => setPage(2)}
                  className="flex items-center gap-2 mx-auto px-6 py-2 bg-[#800020] text-white rounded-full text-xs tracking-widest uppercase hover:bg-[#004d4d] transition-colors"
                >
                  Turn the Page <ArrowRight size={14} />
                </button>
              </footer>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 2: THE QUESTION */}
      {page === 2 && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in">
          <div className="max-w-lg space-y-8">
            <div className="space-y-2">
              <div className="w-20 h-1 bg-[#800020] mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-6xl font-cursive text-[#800020] leading-tight drop-shadow-sm">
                Will you be the <span className="text-[#ffffff] underline decoration-[#004d4d]">Shrikhand</span> to my <span className="text-[#004d4d]">Puri</span> this Padwa?
              </h2>
              <div className="w-20 h-1 bg-[#800020] mx-auto mt-4"></div>
            </div>

            <div className="space-y-4 pt-10">
              <p className="text-[11px] uppercase tracking-[0.5em] text-[#004d4d] font-bold">A promise kept</p>
              <p className="text-3xl font-cursive text-[#800020] animate-pulse">I'm coming soon.</p>
            </div>

            <p className="text-[10px] text-[#004d4d]/60 mt-20 italic">Touch the screen to let our love bloom...</p>
          </div>

          {/* Render Active Blooms */}
          {blooms.map(bloom => (
            <div
              key={bloom.id}
              className="absolute pointer-events-none animate-sunflower-bloom"
              style={{ left: bloom.x - 25, top: bloom.y - 25 }}
            >
              <Sun size={50} fill="#fcd12a" className="text-[#d4af37]" />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }

        .shimmer-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px #fff, 0 0 20px #d4af37;
          animation: shimmer-float 4s infinite ease-in-out;
        }

        @keyframes shimmer-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
        }

        .animate-sunflower-bloom {
          animation: bloom-out 2s ease-out forwards;
        }

        @keyframes bloom-out {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          30% { transform: scale(1.2) rotate(45deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(90deg); opacity: 0; }
        }

        .animate-fade-in { animation: fadeIn 1.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' opacity='0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default GudiPadwaExperience;