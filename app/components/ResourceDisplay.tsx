import React from 'react';
import { useTheme } from '../../game/store';

interface ResourceDisplayProps {
  resources: {
    [key: string]: number;
  };
}

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  const { theme } = useTheme();

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
      {Object.entries(resources).map(([resource, amount]) => (
        <div key={resource} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
          <span className="font-medium text-sm">{resource}</span>
          <p className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            {amount.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};