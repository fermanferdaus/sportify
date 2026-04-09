import React from "react";
import { Search } from "lucide-react";

interface TeamsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const TeamsSearch: React.FC<TeamsSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-80 group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
        size={18}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search club name..."
        className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-xl leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TeamsSearch;
