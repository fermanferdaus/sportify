import React from 'react';

interface LeagueCategoryProps {
  sport: string;
  children: React.ReactNode;
}

const LeagueCategory: React.FC<LeagueCategoryProps> = ({ sport, children }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Category Header */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
        <h2 className="text-2xl font-black text-white tracking-widest uppercase text-sm flex items-center gap-3">
          {sport} <span className="text-slate-700">/ Registry</span>
        </h2>
        <div className="flex-1 h-px bg-slate-800/50" />
      </div>

      {/* Grid for this category */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  );
};

export default LeagueCategory;
