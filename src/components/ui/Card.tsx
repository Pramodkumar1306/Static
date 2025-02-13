import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <div 
    className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
); 