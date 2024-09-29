import React, { useState, useMemo } from 'react';
import { useGameStore } from '../../game/store';

export const GlobalMarket: React.FC = () => {
  const { orders, fulfillOrder } = useGameStore((state) => state.market);
  const playerCredits = useGameStore((state) => state.resources.credits);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(0);

  const resourceTypes = useMemo(() => {
    return Array.from(new Set(orders.map((order) => order.resourceType)));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return selectedResource
      ? orders.filter((order) => order.resourceType === selectedResource)
      : orders;
  }, [orders, selectedResource]);

  const handlePurchase = (orderId: string) => {
    if (purchaseQuantity <= 0) return;
    fulfillOrder(orderId, purchaseQuantity);
    setPurchaseQuantity(0);
  };

  const calculateTotalCost = (order: typeof orders[0]) => {
    return order.pricePerUnit * purchaseQuantity;
  };

  return (
    <div>
      <h2>Global Market</h2>
      <div>
        <label htmlFor="resourceFilter">Filter by resource: </label>
        <select
          id="resourceFilter"
          value={selectedResource || ''}
          onChange={(e) => setSelectedResource(e.target.value || null)}
        >
          <option value="">All Resources</option>
          {resourceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.resourceType}</td>
              <td>{order.quantity}</td>
              <td>{order.pricePerUnit}</td>
              <td>{calculateTotalCost(order)}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max={order.quantity}
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                />
                <button
                  onClick={() => handlePurchase(order.id)}
                  disabled={purchaseQuantity <= 0 || calculateTotalCost(order) > playerCredits}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Your Credits: {playerCredits}</p>
    </div>
  );
};