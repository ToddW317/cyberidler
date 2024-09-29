import React, { useState, useEffect } from 'react';
import { useGameStore, useTheme } from '../../game/store';
import { FuturesTrading } from './FuturesTrading';

const resourceIcons: { [key: string]: string } = {
  credits: '💰',
  data: '💾',
  energy: '⚡',
  rawMaterials: '🧱',
  components: '🔧',
  advancedComponents: '🔬',
  qubits: '🔮',
  nanomaterials: '🔬',
  syntheticNeurons: '🧠',
  darkMatter: '🌑',
  antimatter: '☄️',
  exoticAlloys: '🌈',
  biochips: '🧬',
  plasma: '🔥',
};

export const Market: React.FC = () => {
  const { theme } = useTheme();
  const { orders, addOrder, fulfillOrder, cancelOrder } = useGameStore((state) => state.market);
  const resources = useGameStore((state) => state.resources);
  const [activeTab, setActiveTab] = useState('market');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [showAutomatedTrading, setShowAutomatedTrading] = useState(false);

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';

  const playerOrders = orders.filter(order => order.sellerId === 'player');
  const marketOrders = selectedResource 
    ? orders.filter(order => order.resourceType === selectedResource && order.sellerId !== 'player')
    : [];

  const handleBuy = (orderId: string) => {
    if (buyQuantity > 0) {
      fulfillOrder(orderId, buyQuantity);
      setBuyQuantity(0);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
  };

  const renderResourceCards = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Object.entries(resources).map(([resource, amount]) => (
        <div 
          key={resource}
          className={`${cardBg} p-4 rounded-lg cursor-pointer flex flex-col items-center ${selectedResource === resource ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedResource(resource)}
        >
          <span className="text-4xl mb-2">{resourceIcons[resource] || '🔹'}</span>
          <h3 className="font-bold text-center mb-1">{resource}</h3>
          <p className="text-sm">{amount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );

  const renderMarketOrders = () => (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Market Orders</h3>
      {marketOrders.length === 0 ? (
        <p>No orders available for this resource.</p>
      ) : (
        <div className="space-y-4">
          {marketOrders.map(order => (
            <div key={order.id} className={`${cardBg} p-4 rounded-lg flex justify-between items-center`}>
              <div className="flex items-center">
                <span className="text-2xl mr-2">{resourceIcons[order.resourceType] || '🔹'}</span>
                <div>
                  <p className="font-bold">{order.sellerId}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Price: {order.pricePerUnit.toFixed(2)} credits/unit</p>
                </div>
              </div>
              <div>
                <input
                  type="number"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(Number(e.target.value))}
                  className="p-2 border rounded mr-2"
                  placeholder="Quantity"
                />
                <button
                  onClick={() => handleBuy(order.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMyOrders = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">My Orders</h3>
      {playerOrders.length === 0 ? (
        <p>You have no active orders.</p>
      ) : (
        <div className="space-y-4">
          {playerOrders.map(order => (
            <div key={order.id} className={`${cardBg} p-4 rounded-lg flex justify-between items-center`}>
              <div>
                <span className="text-2xl mr-2">{resourceIcons[order.resourceType] || '🔹'}</span>
                <span>{order.resourceType}</span>
                <p>Quantity: {order.quantity}</p>
                <p>Price: {order.pricePerUnit.toFixed(2)} credits/unit</p>
              </div>
              <div>
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-3xl font-bold mb-6">Market</h2>
      
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('market')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'market' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Market
        </button>
        <button
          onClick={() => setActiveTab('myOrders')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'myOrders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          My Orders
        </button>
        <button
          onClick={() => setShowAutomatedTrading(!showAutomatedTrading)}
          className={`px-4 py-2 rounded-lg ${showAutomatedTrading ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {showAutomatedTrading ? 'Hide Automated Trading' : 'Show Automated Trading'}
        </button>
        <button
          onClick={() => setActiveTab('futures')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'futures' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Futures Trading
        </button>
      </div>

      {activeTab === 'market' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {renderResourceCards()}
          </div>
          <div className="md:col-span-2">
            {selectedResource && renderMarketOrders()}
          </div>
        </div>
      )}

      {activeTab === 'myOrders' && renderMyOrders()}
      {activeTab === 'futures' && <FuturesTrading />}

      {showAutomatedTrading && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Automated Trading</h3>
          {/* Add your AutomatedTrading component here */}
        </div>
      )}
    </div>
  );
};