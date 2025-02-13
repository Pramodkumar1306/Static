import React from 'react';
import { inheritanceTypes } from './InheritanceSection';

interface Props {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const InheritanceNav: React.FC<Props> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="w-1/4 h-screen bg-white shadow-lg sticky top-0">
      <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-xl font-bold text-purple-600 mb-6">Types of Inheritance</h2>
        <nav className="space-y-4">
          {Object.entries(inheritanceTypes).map(([type, data]) => {
            const Icon = data.icon;
            return (
              <button
                key={type}
                onClick={() => onTypeSelect(type)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedType === type
                    ? 'bg-purple-50 text-purple-600 shadow-md'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${selectedType === type ? 'text-purple-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{data.title}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}; 