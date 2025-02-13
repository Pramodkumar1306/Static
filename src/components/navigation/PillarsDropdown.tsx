import React from 'react';
import { GitBranch, GitMerge, ChevronDown } from 'lucide-react';

interface PillarsDropdownProps {
  activePillar: string | null;
  isPillarsOpen: boolean;
  onPillarSelect: (pillar: string) => void;
  onToggle: () => void;
}

export const PillarsDropdown: React.FC<PillarsDropdownProps> = ({
  activePillar,
  isPillarsOpen,
  onPillarSelect,
  onToggle
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
          activePillar 
            ? 'bg-purple-50 text-purple-600' 
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <GitBranch className="h-5 w-5" />
        <span>OOP Pillars</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
          isPillarsOpen ? 'transform rotate-180' : ''
        }`} />
      </button>

      {isPillarsOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
          <button
            onClick={() => onPillarSelect('inheritance')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Inheritance
          </button>
          <button
            onClick={() => onPillarSelect('polymorphism')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2"
          >
            <GitMerge className="h-4 w-4" />
            Polymorphism
          </button>
        </div>
      )}
    </div>
  );
}; 