import React, { useState } from 'react';
import { useGameStore, useTheme } from '../../game/store';

export const AutomatedTrading: React.FC = () => {
  const { theme } = useTheme();
  const [resource, setResource] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const resources = useGameStore(state => state.resources);
  const addAutomatedTrade = useGameStore(state => state.addAutomatedTrade);
  const automatedTrades = useGameStore(state => state.automatedTrades);
  const removeAutomatedTrade = useGameStore(state => state.removeAutomatedTrade);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAutomatedTrade({ resource, buyPrice, sellPrice, quantity });
    setResource('');
    setBuyPrice(0);
    setSellPrice(0);
    setQuantity(0);
  };

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <label htmlFor="resource" className="block mb-1">Resource</label>
          <select
            id="resource"
            value={resource}
            onChange={e => setResource(e.target.value)}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
            required
          >
            <option value="">Select Resource</option>
            {Object.keys(resources).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="buyPrice" className="block mb-1">Buy Price</label>
          <input
            id="buyPrice"
            type="number"
            value={buyPrice}
            onChange={e => setBuyPrice(Number(e.target.value))}
            placeholder="Buy Price"
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="sellPrice" className="block mb-1">Sell Price</label>
          <input
            id="sellPrice"
            type="number"
            value={sellPrice}
            onChange={e => setSellPrice(Number(e.target.value))}
            placeholder="Sell Price"
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-1">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Automated Trade
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Active Automated Trades</h3>
      <ul className="space-y-2">
        {automatedTrades.map((trade, index) => (
          <li key={index} className={`flex justify-between items-center p-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <span>{trade.resource}: Buy at {trade.buyPrice}, Sell at {trade.sellPrice}, Quantity: {trade.quantity}</span>
            <button
              onClick={() => removeAutomatedTrade(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};