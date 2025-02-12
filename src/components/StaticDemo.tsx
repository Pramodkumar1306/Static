import React, { useState } from 'react';
import { Code, Play, RefreshCw, Box, Database, Layers, Terminal } from 'lucide-react';

// Add this type and examples outside the component
type CodeExample = {
  label: string;
  code: string;
  description: string;
};

const codeExamples: CodeExample[] = [
  {
    label: "Static Memory Example",
    description: "Complete example demonstrating static and instance members, blocks, and methods",
    code: `package store;

public class staticExplain {
  static int x, y;
  static {
    System.out.println("inside static block");
    x = 10;
    y = 20;
  }
  
  static void display() {
    System.out.println("Inside static method ");
    System.out.println(x);
    System.out.println(y);
  }
  
  int p, q;
  {
    System.out.println("Inside non static block");
    x = 111;
    y = 222;
    p = 333;
    q = 444;
  }
  
  void display1() {
    System.out.println("Non staic method");
    System.out.println(x);
    System.out.println(y);
    System.out.println(p);
    System.out.println(q);
  }
  
  public static void main(String[] args) {
    staticExplain.display();
    staticExplain p = new staticExplain();
    p.display1();
  }
}`
  }
];

const StaticDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState('');
  const [showExecution, setShowExecution] = useState(false);
  const [analysis, setAnalysis] = useState<{
    explanation: string[];
    output: string[];
  } | null>(null);
  const [outputStep, setOutputStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const steps = [
    {
      title: "Class Loading",
      description: "JVM starts and loads the staticExplain class",
      output: [
        "Starting JVM...",
        "Loading staticExplain.class",
        "Scanning for static members..."
      ],
      memory: {
        static: [],
        stack: [
          {
            frame: "Class Loading",
            variables: ["staticExplain.class"],
            status: "active"
          }
        ],
        heap: []
      }
    },
    {
      title: "Static Initialization",
      description: "Static variables are allocated and static block executes",
      output: [
        "Allocating static variables x, y",
        "Executing static block:",
        "inside static block",
        "x = 10",
        "y = 20"
      ],
      memory: {
        static: [
          'x = 10',
          'y = 20',
          'display()',
          'main()'
        ],
        stack: [
          {
            frame: "Static Initialization",
            variables: ["<clinit>"],
            status: "active"
          }
        ],
        heap: []
      }
    },
    {
      title: "Main Method Start",
      description: "Execution enters main method and calls static display()",
      output: [
        "Entering main method",
        "Calling static method display()",
        "Inside static method",
        "10",
        "20"
      ],
      memory: {
        static: [
          'x = 10',
          'y = 20',
          'display()',
          'main()'
        ],
        stack: [
          {
            frame: "main(String[] args)",
            variables: ["args = []"],
            status: "active"
          },
          {
            frame: "display()",
            variables: ["x = 10", "y = 20"],
            status: "executing"
          }
        ],
        heap: []
      }
    },
    {
      title: "Object Creation",
      description: "New object created and non-static block executes",
      output: [
        "Creating new staticExplain object",
        "Executing non-static block:",
        "Inside non static block",
        "Updating static x = 111",
        "Updating static y = 222",
        "Setting p = 333",
        "Setting q = 444"
      ],
      memory: {
        static: [
          'x = 111',
          'y = 222',
          'display()',
          'main()'
        ],
        stack: [
          {
            frame: "main(String[] args)",
            variables: ["args = []", "p = staticExplain@0x1234"],
            status: "active"
          }
        ],
        heap: [
          'staticExplain@0x1234',
          'p = 333',
          'q = 444',
          'display1()'
        ]
      }
    },
    {
      title: "Non-Static Method Call",
      description: "Calling display1() on the created object",
      output: [
        "Calling instance method display1()",
        "Non static method",
        "111",
        "222",
        "333",
        "444"
      ],
      memory: {
        static: [
          'x = 111',
          'y = 222',
          'display()',
          'main()'
        ],
        stack: [
          {
            frame: "main(String[] args)",
            variables: ["args = []", "p = staticExplain@0x1234"],
            status: "active"
          },
          {
            frame: "p.display1()",
            variables: [
              "this = staticExplain@0x1234",
              "x = 111",
              "y = 222",
              "p = 333",
              "q = 444"
            ],
            status: "executing"
          }
        ],
        heap: [
          'staticExplain@0x1234',
          'p = 333',
          'q = 444',
          'display1()'
        ]
      }
    }
  ];

  const handleCodeSubmit = () => {
    const codeAnalysis = analyzeCode(code);
    setAnalysis(codeAnalysis);
    setShowExecution(true);
    setStep(0);
  };

  const executeStepByStep = async () => {
    setIsExecuting(true);
    setOutputStep(0);
    
    const selectedExample = codeExamples.find(ex => ex.code === code);
    if (!selectedExample) return;

    const outputs = generateStepOutput(selectedExample.code, step);
    
    for (let i = 0; i < outputs.length; i++) {
      setOutputStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsExecuting(false);
  };

  const generateStepOutput = (code: string, currentStep: number) => {
    if (!code.includes('static {')) {
      // For examples without static block
      return currentStep >= 3 ? [
        "333"  // x + y (111 + 222)
      ] : [];
    }

    // For the complete example with static block
    switch (currentStep) {
      case 2: // After static block initialization
        return [
          "inside static block"
        ];
      case 3: // After static method call
        return [
          "inside static block",
          "Inside static method",
          "10",
          "20"
        ];
      case 4: // After instance method call
        return [
          "inside static block",
          "Inside static method",
          "10",
          "20",
          "Inside non static block",
          "Non static method",
          "111",
          "222",
          "333",
          "444"
        ];
      default:
        return [];
    }
  };

  const analyzeCode = (code: string) => {
    return {
      explanation: [
        "Class structure analysis:",
        "- Found static variables: x, y",
        "- Found static method: display1()",
        "- Found instance variables: b, c",
        "- Found instance method: display2()",
        "Memory allocation analysis:",
        "- Static members will be loaded during class initialization",
        "- Instance members will be created when object is instantiated"
      ],
      output: generateStepOutput(code, step)
    };
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      const nextStepIndex = step + 1;
      setStep(nextStepIndex);
      if (analysis) {
        setAnalysis({
          ...analysis,
          output: generateStepOutput(code, nextStepIndex)
        });
      }
    }
  };

  const resetDemo = () => {
    setStep(0);
    setShowExecution(false);
    setCode('');
    setAnalysis(null);
    setIsExecuting(false);
    setOutputStep(0);
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedExample = codeExamples.find(ex => ex.label === e.target.value);
    if (selectedExample) {
      setCode(selectedExample.code);
      setAnalysis(null);
      setShowExecution(false);
    }
  };

  const getStepExplanation = (currentStep: number) => {
    const explanations = {
      0: [
        "Step 1: JVM Initialization",
        "- JVM starts execution of the program",
        "- Class Loader loads the staticExplain class into memory",
        "- JVM scans for static variables (x, y), static blocks, and static methods",
        "- Static members are allocated in static memory segment"
      ],
      1: [
        "Step 2: Static Block Execution",
        "- Static block is executed during class loading",
        "- System.out.println(\"inside static block\") is executed",
        "- Static variables are initialized: x = 10, y = 20",
        "- Static block execution completes"
      ],
      2: [
        "Step 3: Main Method Execution",
        "- Execution enters main() method",
        "- staticExplain.display() is called",
        "- display() method prints values of x and y",
        "- Current values: x = 10, y = 20"
      ],
      3: [
        "Step 4: Object Creation & Non-static Block",
        "- new staticExplain() creates object in heap",
        "- Non-static block executes before constructor",
        "- Static variables updated: x = 111, y = 222",
        "- Instance variables initialized: p = 333, q = 444"
      ],
      4: [
        "Step 5: Non-static Method Call",
        "- p.display1() is called on the object",
        "- Method accesses both static and instance variables",
        "- Prints current values of all variables",
        "- Shows final state of x, y, p, and q"
      ]
    };

    return explanations[currentStep as keyof typeof explanations] || [];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="text-blue-600" />
            Static Memory Allocation Demo
          </h1>

          {/* Code Display Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Java Code:
            </label>
            <div className="w-full p-4 border rounded-lg font-mono text-sm bg-gray-50">
              <pre className="whitespace-pre-wrap">
                {codeExamples[0].code}
              </pre>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setCode(codeExamples[0].code);
                  handleCodeSubmit();
                }}
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

          {/* Add this new section after the code input and before the execution visualization */}
          {analysis && (
            <div className="mb-6">
              {/* Code Analysis Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Code className="text-purple-600" />
                  Step-by-Step Explanation
                </h3>
                <div className="space-y-4">
                  {getStepExplanation(step).map((line, i) => (
                    <div key={i} className={`text-sm ${
                      line.startsWith('Step') 
                        ? 'font-bold text-blue-600' 
                        : 'text-gray-700 ml-4'
                    }`}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showExecution && (
            <>
              {/* Output Section - Split into two parts */}
              <div className="mb-6 grid grid-cols-2 gap-6">
                {/* Execution Steps */}
                <div>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <Terminal className="text-gray-600" />
                    <span>Execution Steps</span>
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

                {/* Program Output */}
                <div>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <Terminal className="text-green-600" />
                    <span>Program Output</span>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-40 overflow-y-auto">
                    {/* Show output in exact sequence */}
                    <div className="space-y-1">
                      {step >= 1 && (
                        <div className="border-l-2 border-transparent">
                          inside static block
                        </div>
                      )}
                      {step >= 2 && (
                        <>
                          <div className="border-l-2 border-transparent">Inside static method</div>
                          <div className="border-l-2 border-transparent">10</div>
                          <div className="border-l-2 border-transparent">20</div>
                        </>
                      )}
                      {step >= 3 && (
                        <div className="border-l-2 border-transparent">
                          Inside non static block
                        </div>
                      )}
                      {step >= 4 && (
                        <>
                          <div className="border-l-2 border-transparent">Non staic method</div>
                          <div className="border-l-2 border-transparent">111</div>
                          <div className="border-l-2 border-transparent">222</div>
                          <div className="border-l-2 border-transparent">333</div>
                          <div className="border-l-2 border-transparent">444</div>
                        </>
                      )}
                    </div>
                  </div>
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
                    {steps[step].memory.stack.map((frame, i) => (
                      <div 
                        key={i} 
                        className={`p-3 rounded ${
                          frame.status === 'active' 
                            ? 'bg-yellow-100 border-l-4 border-yellow-500'
                            : 'bg-yellow-50'
                        }`}
                      >
                        <div className="font-medium text-yellow-800 mb-1">
                          {frame.frame}
                        </div>
                        <div className="space-y-1">
                          {frame.variables.map((variable, j) => (
                            <div 
                              key={j} 
                              className="text-sm text-yellow-700 font-mono pl-4"
                            >
                              {variable}
                            </div>
                          ))}
                        </div>
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