import React, { useState } from 'react';
import { GitBranch, GitCommit, GitFork, GitMerge, GitPullRequest, LucideIcon } from 'lucide-react';

interface InheritanceType {
  title: string;
  description: string;
  example: string;
  diagram: string;
  icon: LucideIcon;
}

const inheritanceTypes: Record<string, InheritanceType> = {
  single: {
    title: 'Single Inheritance',
    description: 'A class inherits properties and methods from a single parent class.',
    example: `class Animal {
  void eat() { ... }
  void sleep() { ... }
}

class Dog extends Animal {
  void bark() { ... }
  void fetch() { ... }
}`,
    diagram: '🐕 → 🦮',
    icon: GitBranch
  },
  multiple: {
    title: 'Multiple Inheritance',
    description: 'A class inherits from multiple parent classes (Through interfaces in Java).',
    example: `interface Flyable {
  void fly();
}

interface Swimmable {
  void swim();
}

class Duck implements Flyable, Swimmable {
  public void fly() { ... }
  public void swim() { ... }
}`,
    diagram: '🦆 ← (🦅 + 🐠)',
    icon: GitPullRequest
  },
  multilevel: {
    title: 'Multilevel Inheritance',
    description: 'A class inherits from a derived class, forming a chain of inheritance (grandparent → parent → child).',
    example: `class Animal {
  void eat() { ... }
  void breathe() { ... }
}

class Mammal extends Animal {
  void walk() { ... }
  void nurse() { ... }
}

class Dog extends Mammal {
  void bark() { ... }
  void fetch() { ... }
}`,
    diagram: '🦁 → 🐕 → 🐕‍🦺',
    icon: GitCommit
  },
  hierarchical: {
    title: 'Hierarchical Inheritance',
    description: 'Multiple classes inherit from a single base class, forming a tree-like structure.',
    example: `class Animal {
  void eat() { ... }
  void sleep() { ... }
}

class Dog extends Animal {
  void bark() { ... }
}

class Cat extends Animal {
  void meow() { ... }
}

class Bird extends Animal {
  void fly() { ... }
}`,
    diagram: '🐈 ← 🦁 → 🐕',
    icon: GitFork
  },
  hybrid: {
    title: 'Hybrid Inheritance',
    description: 'Combination of multiple inheritance types, creating a complex inheritance structure.',
    example: `interface Flyable {
  void fly();
}

class Animal {
  void eat() { ... }
}

class Mammal extends Animal {
  void walk() { ... }
}

class Bird extends Animal implements Flyable {
  public void fly() { ... }
}

class Bat extends Mammal implements Flyable {
  public void fly() { ... }
}`,
    diagram: '🦇 ← (🦁 + ✈️)',
    icon: GitMerge
  }
};

const NavButton: React.FC<{
  type: string;
  selected: boolean;
  onClick: () => void;
  data: InheritanceType;
}> = ({ type, selected, onClick, data }) => {
  const Icon = data.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all ${
        selected
          ? 'bg-purple-50 text-purple-600 shadow-md'
          : 'hover:bg-gray-50 text-gray-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${selected ? 'text-purple-600' : 'text-gray-500'}`} />
        <span className="font-medium">{data.title}</span>
      </div>
    </button>
  );
};

const InheritancePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('single');
  const selectedData = inheritanceTypes[selectedType];

  return (
    <div className="flex min-h-screen">
      {/* Left Navigation */}
      <div className="w-1/4 min-h-screen bg-white shadow-lg fixed left-0 z-10 overflow-y-auto">
        <div className="p-6 sticky top-0">
          <h2 className="text-xl font-bold text-purple-600 mb-6">Types of Inheritance</h2>
          <nav className="space-y-4">
            {Object.entries(inheritanceTypes).map(([type, data]) => (
              <NavButton
                key={type}
                type={type}
                selected={selectedType === type}
                onClick={() => setSelectedType(type)}
                data={data}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[25%] bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-purple-600 mb-4">
              {selectedData.title}
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg">
              {selectedData.description}
            </p>

            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Visual Representation</h3>
              <div className="flex justify-center items-center text-4xl">
                {selectedData.diagram}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="bg-gray-700 px-4 py-2">
                <h3 className="text-white font-semibold">Code Example</h3>
              </div>
              <pre className="p-4 text-green-400 font-mono text-sm overflow-x-auto">
                {selectedData.example}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InheritancePage;
