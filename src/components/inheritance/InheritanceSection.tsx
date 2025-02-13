import React, { useState } from 'react';
import { GitBranch, GitCommit, GitFork, GitMerge, GitPullRequest } from 'lucide-react';
import { InheritanceNav } from './InheritanceNav';
import { InheritanceContent } from './InheritanceContent';

export interface InheritanceType {
  title: string;
  description: string;
  example: string;
  diagram: string;
  icon: any;
}

export const inheritanceTypes: Record<string, InheritanceType> = {
  single: {
    title: 'Single Inheritance',
    description: 'A class inherits properties and methods from a single parent class.',
    example: `class Animal {
  void eat() { ... }
}

class Dog extends Animal {
  void bark() { ... }
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
    description: 'A class inherits from a derived class, forming a chain of inheritance.',
    example: `class Animal {
  void eat() { ... }
}

class Mammal extends Animal {
  void walk() { ... }
}

class Dog extends Mammal {
  void bark() { ... }
}`,
    diagram: '🦁 → 🐕 → 🐕‍🦺',
    icon: GitCommit
  },
  hierarchical: {
    title: 'Hierarchical Inheritance',
    description: 'Multiple classes inherit from a single base class.',
    example: `class Animal {
  void eat() { ... }
}

class Dog extends Animal {
  void bark() { ... }
}

class Cat extends Animal {
  void meow() { ... }
}`,
    diagram: '🐈 ← 🦁 → 🐕',
    icon: GitFork
  },
  hybrid: {
    title: 'Hybrid Inheritance',
    description: 'Combination of multiple inheritance types.',
    example: `interface Flyable {
  void fly();
}

class Animal {
  void eat() { ... }
}

class Bird extends Animal implements Flyable {
  public void fly() { ... }
}`,
    diagram: '🦇 ← (🦁 + ✈️)',
    icon: GitMerge
  }
};

export const InheritanceSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState('single');
  const selectedData = inheritanceTypes[selectedType];

  return (
    <div className="flex min-h-screen">
      <InheritanceNav
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
      />
      <InheritanceContent data={selectedData} />
    </div>
  );
}; 