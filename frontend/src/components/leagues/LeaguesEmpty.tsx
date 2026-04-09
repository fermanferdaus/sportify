import React from 'react';
import { Info, Globe } from 'lucide-react';

interface LeaguesEmptyProps {
  type: 'search' | 'database';
  onClear?: () => void;
}

const LeaguesEmpty: React.FC<LeaguesEmptyProps> = ({ type, onClear }) => {
  if (type === 'search') {
    return (
      <div className="col-span-full py-20 text-center glass-card rounded-[2.5rem] border-dashed border-slate-800 px-4 animate-in fade-in zoom-in duration-500">
        <Info
          size={48}
          className="mx-auto text-slate-700 mb-4 animate-pulse"
        />
        <p className="text-xl text-slate-300 font-bold uppercase tracking-widest">
          No leagues match your search
        </p>
        <p className="text-slate-500 mt-2">
          Try searching for a different league or dynamic sport.
        </p>
        {onClear && (
          <button
            onClick={onClear}
            className="mt-6 text-blue-500 font-bold hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="col-span-full py-20 text-center animate-in fade-in zoom-in duration-500">
      <Globe size={48} className="mx-auto text-slate-700 mb-4" />
      <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">
        No leagues available in database.
      </p>
    </div>
  );
};

export default LeaguesEmpty;
