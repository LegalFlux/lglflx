import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`p-6 border border-gray-200 rounded-xl bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;
