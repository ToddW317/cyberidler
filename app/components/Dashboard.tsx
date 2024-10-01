import React from 'react';
import { useGameStore, useTheme } from '../../game/store';
import { ProductionNode } from './ProductionNode';
import { ResourceDisplay } from './ResourceDisplay';

export const Dashboard: React.FC = () => {
  const resources = useGameStore((state) => state.resources);
  const productionNodes = useGameStore((state) => state.productionNodes);
  const productionChains = useGameStore((state) => state.productionChains);
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  const sortedProductionNodes = Object.values(productionNodes).sort((a, b) => a.tier - b.tier);

  return (
    <div className={`${bgColor} ${textColor} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Resources and Quick Actions */}
          <div className="space-y-6">
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg shadow-md p-6`}>
              <h2 className="text-xl font-semibold mb-4">Resources</h2>
              <ResourceDisplay resources={resources} />
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg shadow-md p-6`}>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 transition duration-200">
                Collect All Resources
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                Upgrade All Nodes
              </button>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg shadow-md p-6`}>
              <h2 className="text-xl font-semibold mb-4">Advanced Production Chains</h2>
              {productionChains && Object.values(productionChains).map((chain) => (
                <div key={chain.id} className="mb-2">
                  <p>{chain.name} - Automation Level: {chain.automationLevel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Production Nodes */}
          <div className="space-y-4">
            {sortedProductionNodes.map((node) => (
              <ProductionNode key={node.name} node={node} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};