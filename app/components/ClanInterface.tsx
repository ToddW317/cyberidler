import React from 'react';
import { useGameStore } from '@/game/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, Option } from "@/components/ui/select";

export default function ClanInterface() {
  const clan = useGameStore(state => state.clan);
  const createClan = useGameStore(state => state.createClan);
  const joinClan = useGameStore(state => state.joinClan);
  const contributeToClan = useGameStore(state => state.contributeToClan);
  const upgradeClan = useGameStore(state => state.upgradeClan);
  const startClanMission = useGameStore(state => state.startClanMission);
  const completeClanMission = useGameStore(state => state.completeClanMission);
  const resources = useGameStore(state => state.resources);

  const [newClanName, setNewClanName] = React.useState('');
  const [contributionAmount, setContributionAmount] = React.useState(0);
  const [contributionResource, setContributionResource] = React.useState('credits');

  if (!clan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create or Join a Clan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="clanName">Clan Name</Label>
              <Input
                id="clanName"
                type="text"
                value={newClanName}
                onChange={(e) => setNewClanName(e.target.value)}
                placeholder="Enter clan name"
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => createClan(newClanName)}>Create Clan</Button>
              <Button onClick={() => joinClan(newClanName)} variant="outline">Join Clan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{clan.name} (Level {clan.level})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Clan Info</h3>
            <p>Experience: {clan.experience}</p>
            <p>Members: {clan.members.join(', ')}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Clan Resources</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(clan.resources).map(([resource, amount]) => (
                <div key={resource} className="flex justify-between">
                  <span className="capitalize">{resource}:</span>
                  <span>{amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contribute Resources</h3>
            <div className="flex space-x-2">
              <Select
                value={contributionResource}
                onChange={(e) => setContributionResource(e.target.value)}
              >
                {Object.keys(resources).map((resource) => (
                  <Option key={resource} value={resource}>
                    {resource}
                  </Option>
                ))}
              </Select>
              <Input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(Number(e.target.value))}
                min="0"
                max={resources[contributionResource]}
              />
              <Button onClick={() => contributeToClan(contributionResource, contributionAmount)}>
                Contribute
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Clan Upgrades</h3>
            <div className="space-y-2">
              {clan.upgrades.map((upgrade) => (
                <div key={upgrade.name} className="flex justify-between items-center">
                  <span>{upgrade.name} (Level {upgrade.level})</span>
                  <Button onClick={() => upgradeClan(upgrade.name)} size="sm">
                    Upgrade
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Clan Missions</h3>
            <div className="space-y-2">
              {clan.missions.map((mission) => (
                <Card key={mission.name}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold">{mission.name}</h4>
                    <p className="text-sm">{mission.description}</p>
                    {!mission.completed ? (
                      <div className="mt-2 flex space-x-2">
                        <Button onClick={() => startClanMission(mission.name)} size="sm">Start Mission</Button>
                        <Button onClick={() => completeClanMission(mission.name)} size="sm" variant="outline">Complete Mission</Button>
                      </div>
                    ) : (
                      <p className="mt-2 text-green-500">Completed</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}