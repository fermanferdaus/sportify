import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FavoriteItemProps {
  id: number;
  team_id: string;
  team_name: string;
  team_badge: string;
  league_name?: string;
  onRemove: (id: number, name: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ 
  id, 
  team_id, 
  team_name, 
  team_badge, 
  league_name, 
  onRemove 
}) => {
  const navigate = useNavigate();

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-blue-600/30 transition-all shadow-xl hover:shadow-blue-500/5">
      <div className="h-16 w-16 flex-shrink-0 bg-slate-950 p-2 rounded-xl border border-slate-800/50 group-hover:border-blue-500/30 transition-colors">
        <img
          src={team_badge}
          alt={team_name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
          {team_name}
        </h3>
        <button
          onClick={() => navigate(`/teams/${team_id}/${encodeURIComponent(league_name || "")}`)}
          className="mt-1 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 transition-colors font-medium"
        >
          View details <ArrowRight size={12} />
        </button>
      </div>
      <button
        onClick={() => onRemove(id, team_name)}
        className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-900/30 hover:text-rose-500 transition-all border border-slate-700/50 hover:border-rose-500/30"
        title="Remove from favorites"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default FavoriteItem;
