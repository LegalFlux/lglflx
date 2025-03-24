import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'default', 
  size = 'default', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseClass = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const sizeClass = 
    size === 'sm' ? 'h-9 px-3 text-sm' :
    size === 'lg' ? 'h-11 px-8 text-base' :
    'h-10 px-4 py-2 text-sm';
  
  const variantClass = 
    variant === 'outline' ? 'border border-gray-300 bg-transparent hover:bg-gray-100' :
    variant === 'ghost' ? 'bg-transparent hover:bg-gray-100' :
    'bg-blue-600 text-white hover:bg-blue-700';
  
  return (
    <button 
      className={`${baseClass} ${sizeClass} ${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
