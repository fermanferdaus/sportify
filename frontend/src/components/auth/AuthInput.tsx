import React from "react";
import type { LucideIcon } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  icon: Icon,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
          <Icon size={18} />
        </div>
        <input
          {...props}
          className={`block w-full rounded-xl border bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:opacity-50 transition-colors ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-slate-800"
          } ${className}`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
