import React, { useState } from 'react';
import { useGameStore, useTheme } from '../../game/store';

export const OrgManagement: React.FC = () => {
  const { theme } = useTheme();
  const org = useGameStore(state => state.org);
  const createOrg = useGameStore(state => state.createOrg);
  const joinOrg = useGameStore(state => state.joinOrg);
  const contributeToOrg = useGameStore(state => state.contributeToOrg);
  const upgradeOrg = useGameStore(state => state.upgradeOrg);
  const startOrgMission = useGameStore(state => state.startOrgMission);
  const completeOrgMission = useGameStore(state => state.completeOrgMission);
  const resources = useGameStore(state => state.resources);

  const [newOrgName, setNewOrgName] = useState('');
  const [contributionResource, setContributionResource] = useState('');
  const [contributionAmount, setContributionAmount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const handleCreateOrg = () => {
    if (newOrgName) {
      createOrg(newOrgName);
      setNewOrgName('');
    }
  };

  const handleJoinOrg = () => {
    if (newOrgName) {
      joinOrg(newOrgName);
      setNewOrgName('');
    }
  };

  const handleContribute = () => {
    if (contributionResource && contributionAmount > 0) {
      contributeToOrg(contributionResource, contributionAmount);
      setContributionResource('');
      setContributionAmount(0);
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';

  if (!org) {
    return (
      <div className={`${bgColor} ${textColor} p-8 rounded-lg shadow-lg`}>
        <h2 className="text-3xl font-bold mb-6">Create or Join an Organization</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            placeholder="Organization Name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <button 
              onClick={handleCreateOrg} 
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Create Org
            </button>
            <button 
              onClick={handleJoinOrg} 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Join Org
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgColor} ${textColor} p-8 rounded-lg shadow-lg`}>
      <h2 className="text-3xl font-bold mb-6">Organization: {org.name}</h2>
      
      <div className="flex mb-6 space-x-4">
        {['overview', 'upgrades', 'missions', 'contribute'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              activeTab === tab 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${cardBg} p-6 rounded-lg shadow`}>
            <h3 className="text-xl font-semibold mb-4">Organization Stats</h3>
            <p>Level: {org.level}</p>
            <p>Experience: {org.experience}</p>
            <p>Members: {org.members.length}</p>
          </div>
          <div className={`${cardBg} p-6 rounded-lg shadow`}>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(org.resources).map(([resource, amount]) => (
                <p key={resource}>{resource}: {amount}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'upgrades' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {org.upgrades.map(upgrade => (
            <div key={upgrade.name} className={`${cardBg} p-6 rounded-lg shadow`}>
              <h3 className="text-xl font-semibold mb-2">{upgrade.name}</h3>
              <p className="mb-4">Level: {upgrade.level}</p>
              <button
                onClick={() => upgradeOrg(upgrade.name)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
              >
                ↑ Upgrade
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'missions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {org.missions.map(mission => (
            <div key={mission.name} className={`${cardBg} p-6 rounded-lg shadow`}>
              <h3 className="text-xl font-semibold mb-2">{mission.name}</h3>
              <p className="mb-4">{mission.description}</p>
              <div className="flex justify-between items-center">
                {mission.completed ? (
                  <span className="text-green-500 flex items-center">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="text-yellow-500 flex items-center">
                    ⧖ In Progress
                  </span>
                )}
                {!mission.completed ? (
                  <button
                    onClick={() => startOrgMission(mission.name)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center"
                  >
                    ⚡ Start
                  </button>
                ) : (
                  <button
                    onClick={() => completeOrgMission(mission.name)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center"
                  >
                    ✓ Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contribute' && (
        <div className={`${cardBg} p-6 rounded-lg shadow`}>
          <h3 className="text-xl font-semibold mb-4">Contribute Resources</h3>
          <div className="flex flex-col space-y-4">
            <select
              value={contributionResource}
              onChange={(e) => setContributionResource(e.target.value)}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Resource</option>
              {Object.keys(resources).map(resource => (
                <option key={resource} value={resource}>{resource}</option>
              ))}
            </select>
            <input
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(Number(e.target.value))}
              placeholder="Amount"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleContribute} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Contribute
            </button>
          </div>
        </div>
      )}
    </div>
  );
};