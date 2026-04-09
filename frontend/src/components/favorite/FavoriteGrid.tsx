import React from 'react';

interface FavoriteGridProps {
  children: React.ReactNode;
}

const FavoriteGrid: React.FC<FavoriteGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default FavoriteGrid;
