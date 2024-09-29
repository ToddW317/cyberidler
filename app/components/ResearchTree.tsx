import React from 'react';
import { useGameStore, useTheme } from '../../game/store';

export const ResearchTree: React.FC = () => {
  const { theme } = useTheme();
  const research = useGameStore((state) => state.research);
  const availableResearch = useGameStore((state) => state.availableResearch);
  const completeResearch = useGameStore((state) => state.completeResearch);
  const getResearchProgress = useGameStore((state) => state.getResearchProgress);

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Research Tree</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {research.map((item) => (
          <div key={item.name} className={`border p-4 rounded-lg ${item.completed ? 'bg-green-200' : availableResearch.includes(item.name) ? 'bg-blue-200' : 'bg-gray-200'}`}>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <ul className="list-disc list-inside">
              {item.effects.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
            {item.requirements && (
              <div className="mt-2">
                <h4 className="font-semibold">Requirements:</h4>
                <ul className="list-disc list-inside">
                  {item.requirements.map((req) => (
                    <li key={req} className={research.find(r => r.name === req)?.completed ? 'text-green-600' : 'text-red-600'}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!item.completed && (
              <>
                <div className="mt-2">
                  <div className="bg-gray-300 h-2 rounded-full">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${getResearchProgress(item.name) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() => completeResearch(item.name)}
                  disabled={!availableResearch.includes(item.name)}
                  className={`mt-2 px-4 py-2 rounded ${
                    availableResearch.includes(item.name)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Research
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};