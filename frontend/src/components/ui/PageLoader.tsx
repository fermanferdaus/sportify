import React from 'react';
import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading content..." }) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-blue-500 animate-in fade-in duration-500">
      <div className="relative">
        <Loader2 className="h-14 w-14 animate-spin stroke-[1.5]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
        </div>
      </div>
      <p className="mt-8 text-slate-400 font-medium tracking-wide animate-pulse uppercase text-xs">
        {message}
      </p>
    </div>
  );
};

export default PageLoader;
