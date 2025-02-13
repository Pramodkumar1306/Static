import React, { useState, useCallback } from 'react';
import { Car, Home, Gamepad, Code, ArrowRight, Plus, RotateCw, Volume2, ChevronDown, Layers, Building, CheckCircle, Factory } from 'lucide-react';
import { Card } from './ui/Card';
import { DropdownSection } from './ui/DropdownSection';
import { REAL_WORLD_EXAMPLES, BENEFITS } from '../constants/oopsData';

const OOPSDemo: React.FC = () => {
  const [carInstances, setCarInstances] = useState<number[]>([]);
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);

  const createNewInstance = useCallback(() => {
    if (carInstances.length < 3) {
      setCarInstances(prev => [...prev, prev.length]);
    }
  }, [carInstances.length]);

  const playHonk = useCallback(() => {
    alert('Honk! Honk! 🚗📢');
  }, []);

  const resetInstances = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCarInstances([]);
      setIsRotating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Scene 1: Object's Concept */}
        <Card>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="text-blue-600" />
            Scene 1: An Object's Concept 🏠🚗🧸
          </h2>
          <p className="text-gray-600 mb-6">
            Real-world entities with attributes and behaviors are called objects.
            Each object has its own properties and actions!
          </p>

          <div className="grid grid-cols-3 gap-8">
            {/* Interactive Car */}
            <div 
              className="border-2 border-blue-200 rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHoveredCar(0)}
              onMouseLeave={() => setHoveredCar(null)}
              onClick={playHonk}
            >
              <div className="relative">
                <Car 
                  className={`w-24 h-24 text-blue-600 mx-auto transition-all duration-300 ${
                    hoveredCar === 0 ? 'translate-x-4' : ''
                  }`}
                />
                {hoveredCar === 0 && (
                  <Volume2 className="absolute top-0 right-0 w-6 h-6 text-blue-400 animate-pulse" />
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-bold text-lg mb-2">Car 🚗</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-2">Properties:</p>
                  <ul className="space-y-1 animate-fade-in-up">
                    <li>Brand: Tesla</li>
                    <li>Color: Blue</li>
                    <li>Speed: 200mph</li>
                  </ul>
                  <p className="font-semibold mt-3 mb-2">Actions:</p>
                  <ul className="space-y-1 animate-fade-in-up">
                    <li>Move (Hover)</li>
                    <li>Honk (Click)</li>
                    <li>Brake</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* House Object */}
            <div className="border-2 border-green-200 rounded-lg p-6 transform transition-all duration-300 hover:-translate-y-1">
              <Home className="w-24 h-24 text-green-600 mx-auto transition-transform hover:scale-110" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-lg mb-2">House 🏠</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-2">Properties:</p>
                  <ul className="space-y-1 animate-fade-in-up">
                    <li>Type: Villa</li>
                    <li>Rooms: 4</li>
                    <li>Area: 2000sqft</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Toy Object */}
            <div className="border-2 border-purple-200 rounded-lg p-6 transform transition-all duration-300 hover:-translate-y-1">
              <Gamepad className="w-24 h-24 text-purple-600 mx-auto transition-transform hover:rotate-12" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-lg mb-2">Toy 🧸</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-2">Properties:</p>
                  <ul className="space-y-1 animate-fade-in-up">
                    <li>Type: Robot</li>
                    <li>Age: 3+</li>
                    <li>Battery: Required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Scene 2: Class Blueprint */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Scene 2: Onboarding (According to a Plan) 🏗️</h2>
          <p className="text-gray-600 mb-6">
            Orientation is the process of making things in an organized manner.
            A blueprint helps create multiple objects with the same structure!
          </p>

          <div className="grid grid-cols-2 gap-8">
            {/* Blueprint Side */}
            <div className="border-2 border-blue-200 rounded-lg p-6">
              <h3 className="font-bold mb-4">Car Blueprint (Class) 📝</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <pre className="text-sm">
                  {`class Car {
  // Properties 📋
  String brand;
  String color;
  int speed;

  // Methods 🎮
  void move() { }
  void honk() { }
  void brake() { }
}`}
                </pre>
              </div>
              <button
                onClick={createNewInstance}
                disabled={carInstances.length >= 3}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Create New Car Object
              </button>
            </div>

            {/* Objects Side */}
            <div className="border-2 border-green-200 rounded-lg p-6">
              <h3 className="font-bold mb-4">Generated Cars 🚗</h3>
              <div className="space-y-4">
                {carInstances.map((id) => (
                  <div 
                    key={id}
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-lg animate-slide-in-right hover:shadow-md transition-all duration-300"
                  >
                    <Car className="w-12 h-12 text-green-600 animate-bounce" />
                    <div>
                      <p className="font-semibold">Car #{id + 1}</p>
                      <p className="text-sm text-gray-600">Created from Blueprint</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-600 ml-auto animate-pulse" />
                  </div>
                ))}
                {carInstances.length === 0 && (
                  <div className="text-center py-8 text-gray-500 animate-pulse">
                    Click the button to create car objects! 🚗
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Object Explanation */}
        <Card>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold">What is an Object? 🤔</span>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="mt-4 p-6 border-2 border-blue-100 rounded-lg animate-fade-in space-y-8">
              {/* Basic Explanation */}
              <div className="grid grid-cols-2 gap-8">
                {/* Animated Visualization */}
                <div className="relative h-64 bg-gray-50 rounded-lg p-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`transform transition-all duration-500 ${
                      hoveredPart === 'properties' ? 'scale-110' : 'scale-100'
                    }`}>
                      <Car 
                        className="w-32 h-32 text-blue-600"
                        onMouseEnter={() => setHoveredPart('properties')}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                    </div>
                  </div>
                  
                  {/* Animated Properties */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {hoveredPart === 'properties' && (
                      <>
                        <div className="flex items-center gap-2 animate-slide-in-right">
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                          <span className="text-sm">Brand: Tesla</span>
                        </div>
                        <div className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                          <span className="text-sm">Color: Blue</span>
                        </div>
                        <div className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                          <span className="text-sm">Speed: 200mph</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Animated Methods */}
                  <div className="absolute bottom-4 right-4 space-y-2 text-right">
                    {hoveredPart === 'methods' && (
                      <>
                        <div className="flex items-center gap-2 justify-end animate-slide-in-left">
                          <span className="text-sm">start()</span>
                          <div className="w-3 h-3 rounded-full bg-green-600" />
                        </div>
                        <div className="flex items-center gap-2 justify-end animate-slide-in-left" style={{ animationDelay: '100ms' }}>
                          <span className="text-sm">accelerate()</span>
                          <div className="w-3 h-3 rounded-full bg-green-600" />
                        </div>
                        <div className="flex items-center gap-2 justify-end animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                          <span className="text-sm">brake()</span>
                          <div className="w-3 h-3 rounded-full bg-green-600" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hover Areas */}
                  <div 
                    className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
                    onMouseEnter={() => setHoveredPart('properties')}
                    onMouseLeave={() => setHoveredPart(null)}
                  />
                  <div 
                    className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
                    onMouseEnter={() => setHoveredPart('methods')}
                    onMouseLeave={() => setHoveredPart(null)}
                  />
                </div>

                {/* Text Explanation */}
                <div className="space-y-4">
                  <p className="text-gray-600">
                    An object is a software bundle of related state and behavior. Objects are instances
                    of classes that have:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="font-semibold">Properties (State)</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">
                      Data stored inside the object (hover left side of car)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="font-semibold">Methods (Behavior)</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">
                      Actions that the object can perform (hover right side of car)
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-Life Examples Section */}
              <div className="border-t-2 border-blue-100 pt-8">
                <h3 className="text-xl font-bold mb-6">Real-Life Object Examples 🌟</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {REAL_WORLD_EXAMPLES.map((example) => (
                    <div 
                      key={example.title}
                      className={`border-2 border-${example.borderColor} rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-opacity-10 rounded-full flex items-center justify-center">
                          {example.icon}
                        </div>
                        {example.title}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-blue-600">Properties:</p>
                          <ul className="ml-4 space-y-1 text-gray-600">
                            {example.properties.map((property, index) => (
                              <li key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>{property}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-green-600">Methods:</p>
                          <ul className="ml-4 space-y-1 text-gray-600">
                            {example.methods.map((method, index) => (
                              <li key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100 + 200}ms` }}>{method}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real-world Connection */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">How Objects Mirror Real Life 🌍</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Just like real-world objects, software objects combine data (properties) and functionality (methods) 
                    into a single package. For example, an ATM machine has properties (available cash, location) and 
                    methods (withdraw money, check balance) - just like its software counterpart! This makes object-oriented 
                    programming intuitive as it mirrors how we think about real-world objects and their interactions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Orientation Explanation Dropdown */}
        <DropdownSection
          title={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center p-2 shadow-lg">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                      <Code className="w-6 h-6 text-white opacity-50" />
                    </div>
                    <div className="relative">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <span>Understanding Orientation</span>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
          }
          icon={<Layers className="w-6 h-6 text-white" />}
          isOpen={isOrientationOpen}
          onToggle={() => setIsOrientationOpen(!isOrientationOpen)}
          bgColor="bg-green-50"
          borderColor="border-green-100"
        >
          <div className="space-y-8">
            {/* Main Explanation */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  🎯
                </div>
                What is Orientation?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Orientation means viewing real-world things in the programming world. It helps represent real objects 
                as code, making them structured, reusable, and easier to manage in software development. 🚀
              </p>
            </div>

            {/* Real World to Code Transformation */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 bg-blue-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    🌍
                  </div>
                </div>
                <h4 className="text-center font-semibold mb-2">Real World</h4>
                <p className="text-sm text-gray-600 text-center">
                  Physical objects with properties and behaviors
                </p>
              </div>

              <div className="p-6 flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-green-600 animate-pulse" />
              </div>

              <div className="p-6 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    💻
                  </div>
                </div>
                <h4 className="text-center font-semibold mb-2">Code World</h4>
                <p className="text-sm text-gray-600 text-center">
                  Software objects with structured data and methods
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-3 gap-6">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-opacity-10 rounded-full flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <h4 className="font-semibold text-purple-600">{benefit.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Example Visualization */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Real-World to Code Example 📝</h3>
              <div className="flex items-center justify-between">
                <div className="text-center p-4">
                  <Car className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">Real Car</p>
                  <ul className="text-sm text-gray-600 mt-2">
                    <li>Color: Red</li>
                    <li>Speed: Fast</li>
                    <li>Can: Drive</li>
                  </ul>
                </div>
                <ArrowRight className="w-8 h-8 text-green-600" />
                <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm">
                  <pre>
                    {`class Car {
  String color;
  int speed;
  void drive() {
    // code
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </DropdownSection>

        {/* Key Concepts */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">Key OOP Concepts</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600">Objects</h3>
              <p className="text-gray-600">
                Objects are instances of classes that bundle data and behaviors together.
                They represent real-world entities in code.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-600">Class</h3>
              <p className="text-gray-600">
                A class is a blueprint or template that defines the properties and
                behaviors that all objects of that type will have.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600">Instantiation</h3>
              <p className="text-gray-600">
                The process of creating objects from a class is called instantiation.
                Each object is a unique instance with its own set of data.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(OOPSDemo); 