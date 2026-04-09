import React from 'react';
import { Heart } from 'lucide-react';

const FavoriteHeader: React.FC = () => {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-900/30 text-rose-500 border border-rose-800/30 font-bold shadow-lg shadow-rose-500/10">
        <Heart size={32} fill="currentColor" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        My Favorite Teams
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">
        Your personally curated list of football clubs.
      </p>
    </div>
  );
};

export default FavoriteHeader;
