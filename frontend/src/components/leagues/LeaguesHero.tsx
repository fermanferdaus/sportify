import React from "react";
import { Trophy } from "lucide-react";
import DotGrid from "../ui/DotGrid";
import { useLanguage } from "../../i18n";

const LeaguesHero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative pb-38 min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-slate-950">
      <div className="relative z-20 flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-1000">
        {/* Antigravity Style Glassmorphism Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.1)] text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <Trophy size={14} className="text-blue-400" />
          {t("leagues.badge")}
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            <span className="block text-gradient-electric animate-in slide-in-from-top-8 duration-1000 delay-100 pb-2">
              {t("leagues.heroTitle1")}
            </span>
            <span className="block text-white animate-in slide-in-from-top-8 duration-1000 delay-200">
              {t("leagues.heroTitle2")}
            </span>
          </h1>
        </div>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {t("leagues.heroSubtitle")}
        </p>
      </div>

      {/* Hero-Restricted Oversized DotGrid Background - Negative inset to hide 'hard' edges */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "-150px",
          left: "-150px",
          right: "-150px",
          bottom: "-150px",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 100% at 50% 50%, black 10%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 100% 100% at 50% 50%, black 10%, transparent 90%)",
        }}
      >
        <DotGrid
          dotSize={4}
          gap={42}
          baseColor="#334155"
          activeColor="#3b82f6"
          proximity={200}
          shockStrength={2.5}
          className="opacity-100"
        />

        {/* Deep atmospheric blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
      </div>

      {/* Intensified Peripheral Blur Layer - Maximum Atmospheric Haze */}
      <div
        className="absolute inset-0 z-10 pointer-events-none backdrop-blur-[64px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, black 100%)",
          maskImage:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, black 100%)",
        }}
      />
    </section>
  );
};

export default LeaguesHero;
