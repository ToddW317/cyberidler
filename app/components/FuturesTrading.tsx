import React, { useState } from 'react';
import { useGameStore, useTheme } from '../../game/store';

export const FuturesTrading: React.FC = () => {
  const { theme } = useTheme();
  const resources = useGameStore(state => state.resources);
  const futuresContracts = useGameStore(state => state.futuresContracts);
  const createFuturesContract = useGameStore(state => state.createFuturesContract);
  const settleFuturesContract = useGameStore(state => state.settleFuturesContract);
  const market = useGameStore(state => state.market);

  const [resourceType, setResourceType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(1); // in days

  const handleCreateContract = () => {
    if (resourceType && quantity > 0 && price > 0) {
      createFuturesContract({
        resourceType,
        quantity,
        price,
        expirationDate: Date.now() + duration * 24 * 60 * 60 * 1000,
        buyerId: 'player'
      });
      setResourceType('');
      setQuantity(0);
      setPrice(0);
      setDuration(1);
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const inputBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  return (
    <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-3xl font-bold mb-6">Futures Trading</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Create Futures Contract</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="resourceType" className="block text-sm font-medium mb-1">Resource Type</label>
            <select
              id="resourceType"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className={`w-full p-2 ${inputBgColor} border ${borderColor} rounded-md focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Resource</option>
              {Object.keys(resources).map(resource => (
                <option key={resource} value={resource}>{resource}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              className={`w-full p-2 ${inputBgColor} border ${borderColor} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">Price per Unit</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter price per unit"
              className={`w-full p-2 ${inputBgColor} border ${borderColor} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (days)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="Enter duration in days"
              className={`w-full p-2 ${inputBgColor} border ${borderColor} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        <button
          onClick={handleCreateContract}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Create Contract
        </button>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Active Futures Contracts</h3>
        <div className="space-y-4">
          {futuresContracts.map(contract => {
            const currentPrice = market.orders.find(o => o.resourceType === contract.resourceType)?.pricePerUnit || 0;
            const profit = (currentPrice - contract.price) * contract.quantity;
            const isExpired = contract.expirationDate <= Date.now();

            return (
              <div key={contract.id} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg shadow`}>
                <div className="grid grid-cols-2 gap-2">
                  <p><span className="font-medium">Resource:</span> {contract.resourceType}</p>
                  <p><span className="font-medium">Quantity:</span> {contract.quantity}</p>
                  <p><span className="font-medium">Contract Price:</span> {contract.price.toFixed(2)}</p>
                  <p><span className="font-medium">Current Price:</span> {currentPrice.toFixed(2)}</p>
                  <p><span className="font-medium">Profit/Loss:</span> <span className={profit >= 0 ? 'text-green-500' : 'text-red-500'}>{profit.toFixed(2)}</span></p>
                  <p><span className="font-medium">Expires:</span> {new Date(contract.expirationDate).toLocaleString()}</p>
                </div>
                {isExpired && (
                  <button
                    onClick={() => settleFuturesContract(contract.id)}
                    className="mt-2 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                  >
                    Settle Contract
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};