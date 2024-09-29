import React from 'react';
import { useGameStore } from '@/game/store';

export default function SkillDisplay() {
  const skills = useGameStore(state => state.skills);
  const upgradeSkill = useGameStore(state => state.upgradeSkill);
  const resources = useGameStore(state => state.resources);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-lg font-semibold mb-2">Skills</h2>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(skills).map(([skillName, skill]) => (
          <div key={skillName} className="bg-gray-700 p-2 rounded">
            <div className="flex justify-between items-center">
              <span className="capitalize">{skillName}</span>
              <span>Level: {skill.level}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{width: `${(skill.experience / skill.nextLevelCost) * 100}%`}}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>EXP: {skill.experience.toFixed(2)} / {skill.nextLevelCost}</span>
              <button 
                className={`px-2 py-1 rounded ${
                  resources.credits >= skill.nextLevelCost && skill.experience >= skill.nextLevelCost
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
                onClick={() => upgradeSkill(skillName)}
                disabled={resources.credits < skill.nextLevelCost || skill.experience < skill.nextLevelCost}
              >
                Upgrade ({skill.nextLevelCost} credits)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}