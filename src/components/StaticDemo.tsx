import React, { useState } from 'react';
import { Code, Play, RefreshCw, Box, Database, Layers, Terminal } from 'lucide-react';

const StaticDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState('');
  const [showExecution, setShowExecution] = useState(false);

  const steps = [
    {
      title: "OS → JVM",
      description: "Operating System allocates memory and gives control to JVM",
      output: [
        "Starting JVM...",
        "Allocating memory regions...",
        "Initializing runtime environment..."
      ],
      memory: {
        static: [],
        stack: [],
        heap: []
      }
    },
    {
      title: "JVM → ClassLoader",
      description: "JVM initializes ClassLoader to load the Program class",
      output: [
        "Loading Program.class...",
        "Verifying bytecode...",
        "Preparing class structure..."
      ],
      memory: {
        static: [],
        stack: [],
        heap: []
      }
    },
    {
      title: "Static Loading",
      description: "ClassLoader identifies and loads static members",
      output: [
        "Found static variables: x, y",
        "Found static method: display1()",
        "Initializing x = 111",
        "Initializing y = 222",
        "Loading display1() method..."
      ],
      memory: {
        static: ['x = 111', 'y = 222', 'display1()'],
        stack: [],
        heap: []
      }
    },
    {
      title: "Main Method",
      description: "Execution starts from main method",
      output: [
        "Locating main method...",
        "Creating stack frame for main()",
        "Executing main method...",
        "Found static method call: display1()"
      ],
      memory: {
        static: ['x = 111', 'y = 222', 'display1()', 'main()'],
        stack: ['main()'],
        heap: []
      }
    },
    {
      title: "Object Creation",
      description: "New Program object created in heap",
      output: [
        "new Program() called",
        "Allocating heap memory",
        "Initializing instance variables:",
        "  b = 333",
        "  c = 444",
        "Loading instance method: display2()",
        "Object created at memory address: 0x1234"
      ],
      memory: {
        static: ['x = 111', 'y = 222', 'display1()', 'main()'],
        stack: ['main()', 'new Program()'],
        heap: ['Program Object', 'b = 333', 'c = 444', 'display2()']
      }
    }
  ];

  const handleCodeSubmit = () => {
    setShowExecution(true);
    setStep(0);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const resetDemo = () => {
    setStep(0);
    setShowExecution(false);
    setCode('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="text-blue-600" />
            Static Memory Allocation Demo
          </h1>

          {/* Code Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Java code:
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 p-4 border rounded-lg font-mono text-sm"
              placeholder="class Program {
  static int x, y;
  static void display1() {
    System.out.println(x + y);
  }
  // ... more code
}"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCodeSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Play className="w-4 h-4" />
                Run Code
              </button>
              <button
                onClick={resetDemo}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {showExecution && (
            <>
              {/* Output Console */}
              <div className="mb-6">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <Terminal className="text-gray-600" />
                  <span>Console Output</span>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-40 overflow-y-auto">
                  {steps.slice(0, step + 1).map((s, i) => (
                    <div key={i} className="mb-4">
                      <div className="text-blue-400">// Step {i + 1}: {s.title}</div>
                      {s.output.map((line, j) => (
                        <div key={j} className="ml-2">{`${line}`}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Visualization */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Static Memory */}
                <div className="border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 font-bold mb-4">
                    <Database className="text-blue-600" />
                    Static Memory
                  </div>
                  <div className="space-y-2">
                    {steps[step].memory.static.map((item, i) => (
                      <div key={i} className="p-2 bg-blue-50 rounded animate-fade-in">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack Memory */}
                <div className="border-2 border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 font-bold mb-4">
                    <Layers className="text-yellow-600" />
                    Stack Memory
                  </div>
                  <div className="space-y-2">
                    {steps[step].memory.stack.map((item, i) => (
                      <div key={i} className="p-2 bg-yellow-50 rounded animate-fade-in">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heap Memory */}
                <div className="border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 font-bold mb-4">
                    <Box className="text-green-600" />
                    Heap Memory
                  </div>
                  <div className="space-y-2">
                    {steps[step].memory.heap.map((item, i) => (
                      <div key={i} className="p-2 bg-green-50 rounded animate-fade-in">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{steps[step].title}</h3>
                  <button
                    onClick={nextStep}
                    disabled={step === steps.length - 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Next Step
                  </button>
                </div>
                <p className="text-gray-600">{steps[step].description}</p>
              </div>
            </>
          )}

          {/* Explanation */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">How Static Memory Works</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600">1. Class Loading Process</h3>
                <p className="mt-1">
                  - OS allocates memory and gives control to JVM
                  <br />
                  - JVM initializes ClassLoader
                  <br />
                  - ClassLoader loads the class and identifies static members
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600">2. Static Memory Allocation</h3>
                <p className="mt-1">
                  - Static variables and methods are loaded first
                  <br />
                  - Memory is allocated in static area
                  <br />
                  - Static blocks are executed in order
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-green-600">3. Program Execution</h3>
                <p className="mt-1">
                  - Main method is located and execution begins
                  <br />
                  - Objects are created in heap memory
                  <br />
                  - Method calls are managed through stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticDemo;