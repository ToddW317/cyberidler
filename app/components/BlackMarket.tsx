import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../game/store';

export const BlackMarket: React.FC = () => {
  const gameState = useGameStore();
  const illegalGoodsRef = useRef(gameState.illegalGoods || []);
  const blackMarketRef = useRef(gameState.blackMarket);

  const [selectedGood, setSelectedGood] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [orders, setOrders] = useState(gameState.blackMarket?.orders || []);

  useEffect(() => {
    illegalGoodsRef.current = gameState.illegalGoods || [];
    blackMarketRef.current = gameState.blackMarket;
    setOrders(gameState.blackMarket?.orders || []);
  }, [gameState.illegalGoods, gameState.blackMarket]);

  const handleCreateOrder = useCallback(() => {
    if (selectedGood && quantity > 0 && price > 0) {
      const good = illegalGoodsRef.current.find(g => g.id === selectedGood);
      if (good) {
        gameState.createBlackMarketOrder({
          sellerId: 'player',
          resourceType: good.name,
          quantity,
          pricePerUnit: price,
          riskFactor: good.riskFactor,
        });
        setSelectedGood(null);
        setQuantity(0);
        setPrice(0);
      }
    }
  }, [selectedGood, quantity, price, gameState]);

  const handleFulfillOrder = useCallback((orderId: string) => {
    gameState.fulfillBlackMarketOrder(orderId);
  }, [gameState]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Black Market</h2>
      <p>Reputation: {blackMarketRef.current?.reputation.toFixed(2) || '0.00'}</p>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Create Order</h3>
        <div className="mb-4">
          <label htmlFor="illegalGood" className="block text-sm font-medium text-gray-700 mb-1">
            Illegal Good
          </label>
          <select
            id="illegalGood"
            value={selectedGood || ''}
            onChange={(e) => setSelectedGood(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select an illegal good</option>
            {illegalGoodsRef.current.map((good) => (
              <option key={good.id} value={good.id}>{good.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price per Unit
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price per unit"
            className="block w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleCreateOrder}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Create Black Market Order
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Active Orders</h3>
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4">
            <p><span className="font-semibold">Resource:</span> {order.resourceType}</p>
            <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
            <p><span className="font-semibold">Price per unit:</span> {order.pricePerUnit}</p>
            <p><span className="font-semibold">Risk factor:</span> {order.riskFactor}</p>
            <button
              onClick={() => handleFulfillOrder(order.id)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600 transition-colors"
            >
              Fulfill Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};