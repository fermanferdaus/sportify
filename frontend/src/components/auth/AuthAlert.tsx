import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface AuthAlertProps {
  type: 'success' | 'error';
  title?: string;
  message: string;
}

const AuthAlert: React.FC<AuthAlertProps> = ({ type, title, message }) => {
  if (type === 'success') {
    return (
      <div className="rounded-xl border border-green-900/50 bg-green-950/20 p-4 text-sm text-green-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 flex-shrink-0">
          <Check size={18} />
        </div>
        <div>
          {title && <p className="font-bold">{title}</p>}
          <p className={title ? "text-xs opacity-80" : ""}>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-400 flex items-center gap-3 animate-in shake duration-300">
      <div className="flex-shrink-0">
        <AlertCircle className="h-4 w-4" />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default AuthAlert;
