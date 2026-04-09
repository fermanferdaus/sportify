import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

interface TeamCardProps {
  team: any;
  index: number;
  leagueName: string;
}

const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center">
    <Trophy size={24} className="text-slate-700 opacity-20" />
  </div>
);

const TeamCard: React.FC<TeamCardProps> = ({ team, index, leagueName }) => {
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
        navigate(`/teams/${team.idTeam}/${encodeURIComponent(leagueName)}`)
      }
      style={{
        animationDelay: `${(index % 8) * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? "perspective(1000px) rotateX(0) scale(1) translateY(0)"
          : "perspective(1000px) rotateX(15deg) scale(0.9) translateY(40px)",
        filter: inView ? "blur(0)" : "blur(8px)",
        transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className={`glass-card group p-4 sm:p-8 cursor-pointer rounded-[2rem] text-center relative overflow-hidden active:scale-95 transition-all duration-500`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Background glow shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="relative z-10 space-y-6">
        <div className="relative mx-auto">
          <div className="relative h-28 w-28 mx-auto flex items-center justify-center rounded-[1.8rem] bg-slate-800 border-2 border-slate-700/50 group-hover:border-blue-500/50 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-xl group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden">
            {!imgLoaded && <ImageSkeleton />}
            <img
              src={team.strBadge}
              alt={team.strTeam}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`h-20 w-20 object-contain transition-all duration-700 ${
                imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tight">
            {team.strTeam}
          </h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1 line-clamp-1">
            {team.strStadium || "Elite Stadium"}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/50 text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] group-hover:text-slate-400 transition-colors">
          Since {team.intFormedYear || "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
