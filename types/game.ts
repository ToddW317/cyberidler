export interface Resource {
    [key: string]: number;
  }
  
  export interface Skill {
    level: number;
    experience: number;
    nextLevelCost: number;
  }
  
  export interface ProductionNode {
    name: string;
    tier: number;
    inputs: { [key: string]: number };
    outputs: { [key: string]: number };
    baseRate: number;
    unlocked: boolean;
    level: number;
    upgradeCost: { [key: string]: number };
    purchaseCost?: { [key: string]: number };
  }
  
  export interface Research {
    name: string;
    cost: { [key: string]: number };
    unlocks: string[];
    completed: boolean;
    description: string;
    effects: string[];
    requirements?: string[];
  }
  
  export interface ClanUpgrade {
    name: string;
    level: number;
    cost: { [key: string]: number };
    effect: (clan: Clan) => void;
  }
  
  export interface ClanMission {
    name: string;
    description: string;
    requirements: { [key: string]: number };
    rewards: { [key: string]: number };
    completed: boolean;
  }
  
  export interface Clan {
    name: string;
    level: number;
    experience: number;
    members: string[];
    resources: { [key: string]: number };
    upgrades: ClanUpgrade[];
    missions: ClanMission[];
  }
  
  export interface MarketItem {
    name: string;
    basePrice: number;
    currentPrice: number;
    volatility: number;
    available: number;
  }
  
  export interface MarketOrder {
    id: string;
    sellerId: string;
    resourceType: string;
    quantity: number;
    pricePerUnit: number;
    timestamp: number;
  }
  
  export interface MarketEvent {
    id: string;
    type: 'boom' | 'crash' | 'shortage' | 'surplus';
    resourceType: string;
    magnitude: number;
    duration: number;
    startTime: number;
  }
  
  export interface AutomatedTrade {
    resource: string;
    buyPrice: number;
    sellPrice: number;
    quantity: number;
  }
  
  export interface GameState {
    resources: Resource;
    skills: { [key: string]: Skill };
    productionNodes: { [key: string]: ProductionNode };
    research: Research[];
    availableResearch: string[];
    clan: Clan | null;
    market: {
      orders: MarketOrder[];
      events: MarketEvent[];
      // ... (other market-related properties)
    };
    automatedTrades: AutomatedTrade[];
    lastUpdate: number;
    // ... (other new properties)
  }
  
  export interface OrgUpgrade {
    name: string;
    level: number;
    cost: { [key: string]: number };
    effect: (org: Org) => void;
  }
  
  export interface OrgMission {
    name: string;
    description: string;
    requirements: { [key: string]: number };
    rewards: { [key: string]: number };
    completed: boolean;
  }
  
  export interface Org {
    name: string;
    level: number;
    experience: number;
    members: string[];
    resources: { [key: string]: number };
    upgrades: OrgUpgrade[];
    missions: OrgMission[];
  }
  
  export interface GameState {
    // ... (previous state properties)
    org: Org | null;
    // ... (other properties)
  }