import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyFavorites: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-24 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800/50 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
      <div className="relative mx-auto w-24 h-24 mb-6">
        <Heart size={64} className="text-slate-800 absolute inset-0 m-auto" />
        <Heart size={48} className="text-slate-700 absolute inset-0 m-auto opacity-50" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No Favorites Yet</h3>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        You haven't added any favorite teams yet. Start exploring leagues to build your list.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
      >
        Browse Leagues
      </button>
    </div>
  );
};

export default EmptyFavorites;
