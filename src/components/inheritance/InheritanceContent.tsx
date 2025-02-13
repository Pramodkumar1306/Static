import React from 'react';
import { InheritanceType } from './InheritanceSection';

interface Props {
  data: InheritanceType;
}

export const InheritanceContent: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">{data.title}</h1>
          <p className="text-gray-600 mb-8 text-lg">{data.description}</p>

          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Visual Representation</h3>
            <div className="flex justify-center items-center text-4xl">{data.diagram}</div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gray-700 px-4 py-2">
              <h3 className="text-white font-semibold">Code Example</h3>
            </div>
            <pre className="p-4 text-green-400 font-mono text-sm overflow-x-auto">{data.example}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}; 