import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore, useTheme } from '../../game/store';
import { ProductionChain, ProductionStage, AutomationUpgrade, Blueprint, Worker } from '../../types/game';

const ProductionStageDisplay: React.FC<{ stage: ProductionStage; theme: string }> = ({ stage, theme }) => (
  <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded mb-2`}>
    <h5 className="font-semibold">Stage: {stage.requiredNode}</h5>
    <p>Duration: {stage.duration} seconds</p>
    <p>Inputs: {Object.entries(stage.inputs).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
    <p>Outputs: {Object.entries(stage.outputs).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
  </div>
);

const AutomationUpgradeButton: React.FC<{ 
  upgrade: AutomationUpgrade, 
  chainId: string, 
  onUpgrade: (chainId: string, upgradeId: string) => void 
}> = ({ upgrade, chainId, onUpgrade }) => (
  <button
    onClick={() => onUpgrade(chainId, upgrade.id)}
    className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2 hover:bg-green-600 transition-colors"
  >
    {upgrade.name} (Cost: {Object.entries(upgrade.cost).map(([key, value]) => `${key}: ${value}`).join(', ')})
  </button>
);

const BlueprintUnlockButton: React.FC<{ 
  blueprint: Blueprint, 
  onUnlock: (blueprintId: string) => void 
}> = ({ blueprint, onUnlock }) => (
  <button
    onClick={() => onUnlock(blueprint.id)}
    className="bg-purple-500 text-white px-4 py-2 rounded mt-2 hover:bg-purple-600 transition-colors"
  >
    Unlock {blueprint.name} (Cost: {Object.entries(blueprint.unlockCost).map(([key, value]) => `${key}: ${value}`).join(', ')})
  </button>
);

const WorkerAssignment: React.FC<{ 
  chainId: string, 
  workers: Worker[], 
  onAssign: (workerId: string, chainId: string) => void,
  theme: string
}> = ({ chainId, workers, onAssign, theme }) => (
  <div className="mt-4">
    <h4 className="font-semibold">Assign Worker:</h4>
    <select 
      onChange={(e) => onAssign(e.target.value, chainId)}
      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <option value="">Select a worker</option>
      {workers.map((worker) => (
        <option key={worker.id} value={worker.id}>{worker.name}</option>
      ))}
    </select>
  </div>
);

const ProductionProgress: React.FC<{ chain: ProductionChain }> = ({ chain }) => {
  const currentStage = chain.stages[chain.currentStage];
  return (
    <div className="mt-4">
      <h4 className="font-semibold">Production Progress:</h4>
      <p>Current Stage: {currentStage.name}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${chain.progress}%` }}></div>
      </div>
      <p>{chain.progress.toFixed(2)}% Complete</p>
    </div>
  );
};

const ProductionChainCard: React.FC<{ 
  chain: ProductionChain, 
  automationUpgrades: AutomationUpgrade[], 
  blueprints: Blueprint[],
  workers: Worker[],
  onStart: (chainId: string) => void,
  onUpgrade: (chainId: string, upgradeId: string) => void,
  onUnlock: (blueprintId: string) => void,
  onAssign: (workerId: string, chainId: string) => void,
  theme: string
}> = ({ chain, automationUpgrades, blueprints, workers, onStart, onUpgrade, onUnlock, onAssign, theme }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`border p-4 rounded mb-4 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h3 className="text-xl font-semibold mb-2">{chain.name}</h3>
      <p>Automation Level: {chain.automationLevel}</p>
      <p>Blueprint Unlocked: {chain.blueprintUnlocked ? 'Yes' : 'No'}</p>
      <button
        onClick={() => onStart(chain.id)}
        className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2 hover:bg-blue-600 transition-colors ${chain.status === 'producing' ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={chain.status === 'producing'}
      >
        {chain.status === 'producing' ? 'Producing...' : 'Start Production'}
      </button>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-2 hover:bg-gray-600 transition-colors"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {chain.status === 'producing' && <ProductionProgress chain={chain} />}
      
      {showDetails && (
        <div className="mt-4">
          <h4 className="font-semibold">Production Stages:</h4>
          {chain.stages.map((stage, index) => (
            <ProductionStageDisplay key={index} stage={stage} theme={theme} />
          ))}
          
          <h4 className="font-semibold mt-4">Final Output:</h4>
          <p>{Object.entries(chain.finalOutput).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
          
          {automationUpgrades.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Automation Upgrades:</h4>
              {automationUpgrades.map((upgrade) => (
                <AutomationUpgradeButton key={upgrade.id} upgrade={upgrade} chainId={chain.id} onUpgrade={onUpgrade} />
              ))}
            </div>
          )}
          
          {!chain.blueprintUnlocked && blueprints.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Available Blueprints:</h4>
              {blueprints
                .filter((bp) => bp.productionChainId === chain.id)
                .map((blueprint) => (
                  <BlueprintUnlockButton key={blueprint.id} blueprint={blueprint} onUnlock={onUnlock} />
                ))}
            </div>
          )}
          
          <WorkerAssignment chainId={chain.id} workers={workers} onAssign={onAssign} theme={theme} />
        </div>
      )}
    </div>
  );
};

export const AdvancedProduction: React.FC = () => {
  const gameState = useGameStore();
  const { theme } = useTheme();
  const productionChains = gameState.productionChains || {};
  const automationUpgrades = gameState.automationUpgrades || [];
  const blueprints = gameState.blueprints || [];
  const workers = gameState.workers || [];
  const startProductionChain = gameState.startProductionChain;
  const upgradeAutomation = gameState.upgradeAutomation;
  const unlockBlueprint = gameState.unlockBlueprint;
  const assignWorker = gameState.assignWorker;
  const updateProductionProgress = gameState.updateProductionProgress;

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  // Wrap the functions in useCallback to prevent unnecessary re-renders
  const handleStartProduction = useCallback((chainId: string) => {
    if (startProductionChain) {
      startProductionChain(chainId);
    }
  }, [startProductionChain]);

  const handleUpgradeAutomation = useCallback((chainId: string, upgradeId: string) => {
    if (upgradeAutomation) {
      upgradeAutomation(chainId, upgradeId);
    }
  }, [upgradeAutomation]);

  const handleUnlockBlueprint = useCallback((blueprintId: string) => {
    if (unlockBlueprint) {
      unlockBlueprint(blueprintId);
    }
  }, [unlockBlueprint]);

  const handleAssignWorker = useCallback((workerId: string, chainId: string) => {
    if (assignWorker) {
      assignWorker(workerId, chainId);
    }
  }, [assignWorker]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (updateProductionProgress) {
        updateProductionProgress(1); // Update production every second
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [updateProductionProgress]);

  return (
    <div className={`${bgColor} ${textColor} min-h-screen p-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Advanced Production</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(productionChains).map((chain) => (
            <ProductionChainCard
              key={chain.id}
              chain={chain}
              automationUpgrades={automationUpgrades}
              blueprints={blueprints}
              workers={workers}
              onStart={handleStartProduction}
              onUpgrade={handleUpgradeAutomation}
              onUnlock={handleUnlockBlueprint}
              onAssign={handleAssignWorker}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};