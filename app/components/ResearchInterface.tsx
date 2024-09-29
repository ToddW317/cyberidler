import React, { useState } from 'react';
import { useGameStore } from '@/game/store';
import ResearchTree from './ResearchTree';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ResearchInterface() {
  const { research, availableResearch, resources, completeResearch } = useGameStore();
  const [showTree, setShowTree] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Research</CardTitle>
        <Button
          variant="outline"
          onClick={() => setShowTree(!showTree)}
        >
          {showTree ? 'Hide Research Tree' : 'Show Research Tree'}
        </Button>
      </CardHeader>
      <CardContent>
        {showTree && (
          <ScrollArea className="h-[500px] mb-4">
            <ResearchTree />
          </ScrollArea>
        )}

        <h3 className="text-lg font-semibold mb-2">Available Research</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableResearch.map((researchName) => {
            const researchItem = research.find(r => r.name === researchName);
            if (!researchItem) return null;

            const canAfford = Object.entries(researchItem.cost).every(
              ([resource, cost]) => resources[resource] >= cost
            );

            const requirementsMet = researchItem.requirements ? 
              researchItem.requirements.every(req => 
                research.find(r => r.name === req)?.completed
              ) : true;

            return (
              <Card key={researchName}>
                <CardHeader>
                  <CardTitle>{researchName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Cost: {Object.entries(researchItem.cost).map(([resource, cost]) => 
                    `${cost} ${resource}`
                  ).join(', ')}</p>
                  {researchItem.requirements && (
                    <p className="mb-2">Requires: {researchItem.requirements.join(', ')}</p>
                  )}
                  <p className="mb-4">Unlocks: {researchItem.unlocks.join(', ')}</p>
                  <Button
                    className="w-full"
                    onClick={() => completeResearch(researchName)}
                    disabled={!canAfford || !requirementsMet}
                  >
                    Research
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}