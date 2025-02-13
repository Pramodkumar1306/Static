import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  icon: LucideIcon;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({
  icon: Icon,
  text,
  isActive,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {text}
      </div>
    </button>
  );
}; 