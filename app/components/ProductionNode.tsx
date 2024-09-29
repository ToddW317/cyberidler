import React from 'react';
import { ProductionNode as ProductionNodeType } from '../../types/game';
import { useGameStore, useTheme } from '../../game/store';

interface ProductionNodeProps {
  node: ProductionNodeType;
}

export const ProductionNode: React.FC<ProductionNodeProps> = ({ node }) => {
  const { theme } = useTheme();
  const resources = useGameStore((state) => state.resources);
  const purchaseNode = useGameStore((state) => state.purchaseProductionNode);
  const upgradeNode = useGameStore((state) => state.upgradeProductionNode);

  const canPurchase = node.purchaseCost && Object.entries(node.purchaseCost).every(
    ([resource, cost]) => (resources as any)[resource] >= cost
  );

  const canUpgrade = node.unlocked && Object.entries(node.upgradeCost).every(
    ([resource, cost]) => (resources as any)[resource] >= cost * (node.level + 1)
  );

  // Only render the node if it's unlocked or can be purchased
  if (!node.unlocked && !canPurchase) {
    return null;
  }

  return (
    <div className={`border p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
      <h4 className="text-lg font-semibold mb-2">{node.name}</h4>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <p><span className="font-medium">Tier:</span> {node.tier}</p>
        <p><span className="font-medium">Level:</span> {node.level}</p>
        <p><span className="font-medium">Base Rate:</span> {node.baseRate.toFixed(2)}/s</p>
        <p><span className="font-medium">Unlocked:</span> {node.unlocked ? 'Yes' : 'No'}</p>
      </div>
      {!node.unlocked && node.purchaseCost && (
        <button
          onClick={() => purchaseNode(node.name)}
          disabled={!canPurchase}
          className={`w-full mt-2 px-4 py-2 rounded transition duration-200 ${
            canPurchase 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Purchase
        </button>
      )}
      {node.unlocked && (
        <button
          onClick={() => upgradeNode(node.name)}
          disabled={!canUpgrade}
          className={`w-full mt-2 px-4 py-2 rounded transition duration-200 ${
            canUpgrade 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Upgrade
        </button>
      )}
      <div className="mt-3">
        <h5 className="font-semibold mb-1">Production:</h5>
        {Object.entries(node.outputs).map(([resource, amount]) => (
          <p key={resource} className="text-sm">
            {resource}: +{(amount * node.baseRate * (node.level + 1)).toFixed(2)}/s
          </p>
        ))}
      </div>
      {Object.keys(node.inputs).length > 0 && (
        <div className="mt-2">
          <h5 className="font-semibold mb-1">Consumption:</h5>
          {Object.entries(node.inputs).map(([resource, amount]) => (
            <p key={resource} className="text-sm">
              {resource}: -{(amount * node.baseRate * (node.level + 1)).toFixed(2)}/s
            </p>
          ))}
        </div>
      )}
    </div>
  );
};