import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface LeaguesSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const LeaguesSearch: React.FC<LeaguesSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-2xl mx-auto px-4 z-30 group animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
      <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none z-10 flex items-center justify-center">
        <SearchIcon size={22} strokeWidth={2.5} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for your favorite league..."
        className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl py-5 pl-14 pr-14 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-2xl hover:bg-slate-900/80"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-2"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default LeaguesSearch;
