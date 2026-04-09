import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

const LeaguesHero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-12 pb-6 flex flex-col items-center text-center perspective-1000 overflow-visible"
    >
      <div
        className="relative z-10 flex flex-col items-center gap-6 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0) rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
        }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000 transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
          }}
        >
          <Trophy size={14} className="animate-bounce" />
          Leading Sports Destination
        </div>
        <h1
          className="text-4xl md:text-7xl font-extrabold tracking-tight sm:text-6xl text-gradient perspective-1000 animate-in fade-in zoom-in-95 duration-1000 delay-100 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0) rotateZ(${mousePos.x * 2}deg)`,
          }}
        >
          Global Sports <br />
          <span className="text-white">Leagues Worldwide</span>
        </h1>
        <p
          className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)`,
          }}
        >
          Experience the thrill of global football. Explore detailed team
          profiles, exclusive statistics, and upcoming clash schedules from
          the world's most prestigious leagues.
        </p>
      </div>

      {/* Background glow in hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -z-10 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 50}px, ${-mousePos.y * 50}px, 0) scale(${1 + Math.abs(mousePos.x) * 0.1})`,
        }}
      />
    </section>
  );
};

export default LeaguesHero;
