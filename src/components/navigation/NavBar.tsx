import React from 'react';
import { Code, BookOpen, ChevronDown, GitBranch, GitMerge } from 'lucide-react';
import { NavButton } from './NavButton';
import { PillarsDropdown } from './PillarsDropdown';

interface NavBarProps {
  showOOPSDemo: boolean;
  showStaticDemo: boolean;
  activePillar: string | null;
  isPillarsOpen: boolean;
  onOOPSClick: () => void;
  onStaticClick: () => void;
  onPillarSelect: (pillar: string) => void;
  onPillarsToggle: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  showOOPSDemo,
  showStaticDemo,
  activePillar,
  isPillarsOpen,
  onOOPSClick,
  onStaticClick,
  onPillarSelect,
  onPillarsToggle
}) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Java Learning</span>
          </div>
          <div className="flex space-x-4">
            <NavButton
              icon={BookOpen}
              text="OOP Concepts"
              isActive={showOOPSDemo}
              onClick={onOOPSClick}
            />
            <PillarsDropdown
              activePillar={activePillar}
              isPillarsOpen={isPillarsOpen}
              onPillarSelect={onPillarSelect}
              onToggle={onPillarsToggle}
            />
            <NavButton
              icon={Code}
              text="Static Memory"
              isActive={showStaticDemo}
              onClick={onStaticClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}; 