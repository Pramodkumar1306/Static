import React, { useState } from 'react';
import { GitMerge } from 'lucide-react';
import { NavBar } from './navigation/NavBar';
import StaticDemo from './StaticDemo';
import OOPSDemo from './OOPSDemo';
import { InheritanceSection } from './inheritance/InheritanceSection';

const MainPage: React.FC = () => {
  const [showStaticDemo, setShowStaticDemo] = useState(false);
  const [showOOPSDemo, setShowOOPSDemo] = useState(true);
  const [isPillarsOpen, setIsPillarsOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const navigateToStaticDemo = () => {
    setShowStaticDemo(true);
    setShowOOPSDemo(false);
    setActivePillar(null);
  };

  const navigateToOOPS = () => {
    setShowStaticDemo(false);
    setShowOOPSDemo(true);
    setActivePillar(null);
  };

  const handlePillarSelect = (pillar: string) => {
    setShowStaticDemo(false);
    setShowOOPSDemo(false);
    setActivePillar(pillar);
    setIsPillarsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar
        showOOPSDemo={showOOPSDemo}
        showStaticDemo={showStaticDemo}
        activePillar={activePillar}
        isPillarsOpen={isPillarsOpen}
        onOOPSClick={navigateToOOPS}
        onStaticClick={navigateToStaticDemo}
        onPillarSelect={handlePillarSelect}
        onPillarsToggle={() => setIsPillarsOpen(!isPillarsOpen)}
      />

      <div className="container mx-auto px-4 py-8">
        {showStaticDemo && <StaticDemo />}
        {showOOPSDemo && <OOPSDemo />}
        {activePillar === 'inheritance' && <InheritanceSection />}
        {activePillar === 'polymorphism' && (
          <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <GitMerge className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-purple-600">Polymorphism</h1>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Coming soon... This section will cover different types of Polymorphism in Java.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage; 