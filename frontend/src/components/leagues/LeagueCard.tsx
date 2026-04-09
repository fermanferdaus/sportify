import React, { useState } from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

interface LeagueCardProps {
  league: {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strBadge?: string;
  };
  index: number;
}

const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-2xl sm:rounded-3xl flex items-center justify-center">
    <Trophy size={20} className="text-slate-700 opacity-20" />
  </div>
);

const LeagueCard: React.FC<LeagueCardProps> = ({ league, index }) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() =>
        navigate(`/leagues/${encodeURIComponent(league.strLeague)}/teams`)
      }
      style={{ 
        animationDelay: `${(index % 6) * 120}ms`,
        opacity: inView ? 1 : 0,
        transform: inView 
          ? 'perspective(1000px) rotateX(0) scale(1) translateY(0)' 
          : 'perspective(1000px) rotateX(15deg) scale(0.9) translateY(40px)',
        filter: inView ? 'blur(0)' : 'blur(8px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className={`glass-card group relative p-5 sm:p-8 cursor-pointer rounded-[2rem] overflow-hidden hover:scale-[1.05] active:scale-[0.98] transition-all duration-500`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      {/* Background glow shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-6">
        <div className="relative h-16 w-16 sm:h-24 sm:w-24 flex items-center justify-center rounded-2xl sm:rounded-3xl bg-slate-800 border-2 border-slate-700/50 group-hover:border-blue-500/50 transition-all group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          {league.strBadge ? (
            <>
              {!imgLoaded && <ImageSkeleton />}
              <img
                src={league.strBadge}
                alt={league.strLeague}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                className={`h-10 w-10 sm:h-16 sm:w-16 object-contain group-hover:scale-110 transition-all duration-500 ${
                  imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </>
          ) : (
            <Trophy
              size={24}
              className="sm:size-[32px] text-slate-600 group-hover:text-blue-400 transition-colors"
            />
          )}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {league.strLeague}
          </h3>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-800/50 text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
            {league.strSport}
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-center gap-2 text-sm font-bold text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 mt-2">
          Explore Teams <ArrowRight size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;
