import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle, icon: Icon }) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-3xl border border-blue-900/20 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <Icon size={32} />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
