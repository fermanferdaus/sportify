import React from "react";
import { Info, Trophy } from "lucide-react";

interface TeamsEmptyProps {
  type: 'search' | 'database';
  onClear?: () => void;
}

const TeamsEmpty: React.FC<TeamsEmptyProps> = ({ type, onClear }) => {
  if (type === 'search') {
    return (
      <div className="col-span-full py-24 text-center glass-card rounded-[2.5rem] border-dashed border-slate-800 px-4 animate-in fade-in zoom-in duration-500">
        <Info
          size={56}
          className="mx-auto text-slate-700 mb-6 animate-pulse"
        />
        <p className="text-xl text-slate-300 font-bold uppercase tracking-[0.2em]">
          No clubs match your search
        </p>
        <p className="text-slate-500 mt-2 font-medium">
          Try searching for a different club name or dynamic city.
        </p>
        {onClear && (
          <button
            onClick={onClear}
            className="mt-8 text-blue-500 font-black uppercase tracking-widest text-[10px] hover:text-blue-400 transition-colors"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="col-span-full py-24 text-center glass-card rounded-[2.5rem] bg-slate-900/20 border border-slate-800 animate-in fade-in zoom-in duration-500">
      <Trophy size={56} className="mx-auto text-slate-800 mb-6" />
      <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-lg">
        No teams found in this league.
      </p>
    </div>
  );
};

export default TeamsEmpty;
