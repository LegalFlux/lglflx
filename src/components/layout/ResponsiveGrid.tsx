import React from 'react';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = '1rem',
}) => {
  const isMobile = useMobile();
  
  const getGridTemplateColumns = () => {
    if (isMobile) {
      return `repeat(${columns.mobile}, 1fr)`;
    } else if (window.innerWidth < 1024) {
      return `repeat(${columns.tablet}, 1fr)`;
    } else {
      return `repeat(${columns.desktop}, 1fr)`;
    }
  };
  
  return (
    <div 
      className={cn('responsive-grid', className)}
      style={{ 
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns(),
        gap: gap
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
