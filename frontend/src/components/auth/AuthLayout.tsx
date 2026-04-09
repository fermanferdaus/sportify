import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in-95 duration-500">
      {children}
    </div>
  );
};

export default AuthLayout;
