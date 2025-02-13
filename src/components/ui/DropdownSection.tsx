import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
}

export const DropdownSection: React.FC<DropdownSectionProps> = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  bgColor = "bg-blue-50",
  borderColor = "border-blue-100"
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-4 ${bgColor} rounded-lg hover:bg-opacity-80 transition-colors duration-300`}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-opacity-90 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-lg font-semibold">{title}</span>
      </div>
      <ChevronDown 
        className={`w-6 h-6 transition-transform duration-300 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      />
    </button>

    {isOpen && (
      <div className={`mt-4 p-6 border-2 ${borderColor} rounded-lg animate-fade-in space-y-8`}>
        {children}
      </div>
    )}
  </div>
); 