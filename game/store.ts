import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, ClanUpgrade, ClanMission, ProductionNode, Research, Skill, MarketItem, ProductionChain, AutomationUpgrade, Blueprint, IllegalGood, BlackMarketOrder, ProductionChain, AutomationUpgrade, Blueprint, Worker, ProductionEvent, ProductionQuota } from '../types/game';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';
import { differenceInSeconds } from 'date-fns';

const calculateSkillBonus = (skillLevel: number) => 1 + skillLevel * 0.1;
const calculateNextLevelCost = (currentLevel: number) => Math.floor(100 * Math.pow(1.5, currentLevel));

const CLAN_UPGRADES: ClanUpgrade[] = [
  {
    name: "Production Boost",
    level: 0,
    cost: {
      credits: 1000,
      data: 500
    },
    effect: (clan) => {
      clan.level += 1;
    }
  },
  // Add more clan upgrades here
];


const CLAN_MISSIONS: ClanMission[] = [
  // Add clan missions here
];



const productionNodes: { [key: string]: ProductionNode } = {
  'Credit Miner': {
    name: 'Credit Miner',
    tier: 1,
    inputs: {},
    outputs: { credits: 1 },
    baseRate: 1,
    unlocked: true,
    level: 1,
    upgradeCost: { credits: 100 }
  },
  'Data Harvester': {
    name: 'Data Harvester',
    tier: 1,
    inputs: { energy: 1 },
    outputs: { data: 1 },
    baseRate: 0.5,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 200, energy: 50 },
    purchaseCost: { credits: 500 }
  },
  'Energy Generator': {
    name: 'Energy Generator',
    tier: 1,
    inputs: {},
    outputs: { energy: 1 },
    baseRate: 1,
    unlocked: true,
    level: 0,
    upgradeCost: { credits: 100, data: 50 },
    purchaseCost: { credits: 500, data: 250 }
  },
  'Raw Material Extractor': {
    name: 'Raw Material Extractor',
    tier: 2,
    inputs: { energy: 2 },
    outputs: { rawMaterials: 1 },
    baseRate: 0.5,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 100, data: 50 },
    purchaseCost: { credits: 500, data: 250 }
  },
  'Component Fabricator': {
    name: 'Component Fabricator',
    tier: 3,
    inputs: { rawMaterials: 2, energy: 1 },
    outputs: { components: 1 },
    baseRate: 0.25,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 100, data: 50 },
    purchaseCost: { credits: 500, data: 250 }
  },
  'Advanced Component Assembler': {
    name: 'Advanced Component Assembler',
    tier: 4,
    inputs: { components: 2, energy: 2 },
    outputs: { advancedComponents: 1 },
    baseRate: 0.1,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 100, data: 50 },
    purchaseCost: { credits: 500, data: 250 }
  },
  'Quantum Computer': {
    name: 'Quantum Computer',
    tier: 5,
    inputs: { energy: 5, components: 2 },
    outputs: { qubits: 1 },
    baseRate: 0.05,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 1000, advancedComponents: 10 },
    purchaseCost: { credits: 5000, advancedComponents: 50 }
  },
  'Nanoforge': {
    name: 'Nanoforge',
    tier: 5,
    inputs: { energy: 3, rawMaterials: 5 },
    outputs: { nanomaterials: 1 },
    baseRate: 0.1,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 800, components: 15 },
    purchaseCost: { credits: 4000, components: 75 }
  },
  'Neurosynth Lab': {
    name: 'Neurosynth Lab',
    tier: 6,
    inputs: { energy: 4, data: 10, components: 1 },
    outputs: { syntheticNeurons: 1 },
    baseRate: 0.02,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 2000, advancedComponents: 20 },
    purchaseCost: { credits: 10000, advancedComponents: 100 }
  },
  'Dark Matter Collector': {
    name: 'Dark Matter Collector',
    tier: 7,
    inputs: { energy: 20, advancedComponents: 1 },
    outputs: { darkMatter: 1 },
    baseRate: 0.01,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 5000, qubits: 10 },
    purchaseCost: { credits: 25000, qubits: 50 }
  },
  'Antimatter Synthesizer': {
    name: 'Antimatter Synthesizer',
    tier: 8,
    inputs: { energy: 50, darkMatter: 1 },
    outputs: { antimatter: 1 },
    baseRate: 0.005,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 10000, syntheticNeurons: 20 },
    purchaseCost: { credits: 50000, syntheticNeurons: 100 }
  },
  'Exotic Alloy Foundry': {
    name: 'Exotic Alloy Foundry',
    tier: 6,
    inputs: { energy: 10, rawMaterials: 10, nanomaterials: 1 },
    outputs: { exoticAlloys: 1 },
    baseRate: 0.05,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 3000, advancedComponents: 25 },
    purchaseCost: { credits: 15000, advancedComponents: 125 }
  },
  'Biochip Implanter': {
    name: 'Biochip Implanter',
    tier: 7,
    inputs: { energy: 5, components: 2, syntheticNeurons: 1 },
    outputs: { biochips: 1 },
    baseRate: 0.02,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 7500, exoticAlloys: 10 },
    purchaseCost: { credits: 37500, exoticAlloys: 50 }
  },
  'Plasma Containment Unit': {
    name: 'Plasma Containment Unit',
    tier: 8,
    inputs: { energy: 100, antimatter: 1 },
    outputs: { plasma: 1 },
    baseRate: 0.01,
    unlocked: false,
    level: 0,
    upgradeCost: { credits: 15000, darkMatter: 5 },
    purchaseCost: { credits: 75000, darkMatter: 25 }
  }
};


interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user: User | null) => set({ user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

interface GameSettings {
  volume: number;
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
}

interface MarketOrder {
  id: string;
  sellerId: string;
  resourceType: string;
  quantity: number;
  pricePerUnit: number;
  timestamp: number;
}

interface MarketEvent {
  id: string;
  type: 'boom' | 'crash' | 'shortage' | 'surplus';
  resourceType: string;
  magnitude: number;
  duration: number;
  startTime: number;
}

interface MarketState {
  orders: MarketOrder[];
  events: MarketEvent[];
  addOrder: (order: Omit<MarketOrder, 'id' | 'timestamp'>) => void;
  removeOrder: (orderId: string) => void;
  fulfillOrder: (orderId: string, quantity: number) => void;
  generateMarketEvent: () => void;
  updatePrices: () => void;
  cancelOrder: (orderId: string) => void;
  getMarketHistory: () => MarketHistoryEntry[];
}

interface MarketHistoryEntry {
  id: string;
  type: 'buy' | 'sell';
  resourceType: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: number;
}

interface FuturesContract {
  id: string;
  resourceType: string;
  quantity: number;
  price: number;
  expirationDate: number;
  buyerId: string;
}

interface ResourceBundle {
  id: string;
  name: string;
  contents: { [resource: string]: number };
  price: number;
}

interface Auction {
  id: string;
  itemName: string;
  startingPrice: number;
  currentBid: number;
  highestBidder: string | null;
  endTime: number;
}

interface MarketNews {
  id: string;
  headline: string;
  content: string;
  affectedResources: string[];
  impact: number; // -1 to 1, negative for bad news, positive for good news
  timestamp: number;
}

interface AutomatedTrade {
  resource: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
}

interface GameState {
  resources: {
    credits: number;
    data: number;
    energy: number;
    rawMaterials: number;
    components: number;
    advancedComponents: number;
    qubits: number;
    nanomaterials: number;
    syntheticNeurons: number;
    darkMatter: number;
    antimatter: number;
    exoticAlloys: number;
    biochips: number;
    plasma: number;
  };
  skills: {
    hacking: { level: number; experience: number; nextLevelCost: number };
    engineering: { level: number; experience: number; nextLevelCost: number };
    networking: { level: number; experience: number; nextLevelCost: number };
  };
  productionNodes: { [key: string]: ProductionNode };
  clan: null | {
    name: string;
    level: number;
    experience: number;
    members: string[];
    resources: {};
    upgrades: ClanUpgrade[];
    missions: ClanMission[];
  };
  research: Research[];
  availableResearch: string[];
  market: MarketState;
  marketHistory: MarketHistoryEntry[];
  futuresContracts: FuturesContract[];
  createFuturesContract: (contract: Omit<FuturesContract, 'id'>) => void;
  settleFuturesContract: (contractId: string) => void;
  tick: () => void;
  upgradeSkill: (skillName: string) => void;
  completeResearch: (researchName: string) => void;
  createClan: (name: string) => void;
  joinClan: (clanName: string) => void;
  contributeToClan: (resource: string, amount: number) => void;
  upgradeClan: (upgradeName: string) => void;
  startClanMission: (missionName: string) => void;
  completeClanMission: (missionName: string) => void;
  buyFromMarket: (itemName: string, amount: number) => void;
  sellToMarket: (itemName: string, amount: number) => void;
  updateMarketPrices: () => void;
  settings: GameSettings;
  setVolume: (volume: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  setDifficulty: (difficulty: 'easy' | 'normal' | 'hard') => void;
  purchaseProductionNode: (nodeName: string) => void;
  upgradeProductionNode: (nodeName: string) => void;
  getResearchProgress: (researchName: string) => number;
  addToMarketHistory: (entry: Omit<MarketHistoryEntry, 'id' | 'timestamp'>) => void;
  resourceBundles: ResourceBundle[];
  createResourceBundle: (bundle: Omit<ResourceBundle, 'id'>) => void;
  buyResourceBundle: (bundleId: string) => void;
  auctions: Auction[];
  createAuction: (auction: Omit<Auction, 'id' | 'currentBid' | 'highestBidder'>) => void;
  placeBid: (auctionId: string, bidAmount: number) => void;
  settleAuctions: () => void;
  marketNews: MarketNews[];
  generateMarketNews: () => void;
  automatedTrades: AutomatedTrade[];
  addAutomatedTrade: (trade: AutomatedTrade) => void;
  removeAutomatedTrade: (index: number) => void;
  lastUpdate: number;
  calculateOfflineProgress: () => void;
  org: Org | null;
  createOrg: (name: string) => void;
  joinOrg: (orgName: string) => void;
  contributeToOrg: (resource: string, amount: number) => void;
  upgradeOrg: (upgradeName: string) => void;
  startOrgMission: (missionName: string) => void;
  completeOrgMission: (missionName: string) => void;
  productionChains: Record<string, ProductionChain>;
  automationUpgrades: AutomationUpgrade[];
  blueprints: Blueprint[];
  workers: Worker[];
  startProductionChain: (chainId: string) => void;
  upgradeAutomation: (chainId: string, upgradeId: string) => void;
  unlockBlueprint: (blueprintId: string) => void;
  assignWorker: (workerId: string, chainId: string) => void;
  updateProductionProgress: (deltaTime: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      resources: {
        credits: 0,
        data: 0,
        energy: 0,
        rawMaterials: 0,
        components: 0,
        advancedComponents: 0,
        qubits: 0,
        nanomaterials: 0,
        syntheticNeurons: 0,
        darkMatter: 0,
        antimatter: 0,
        exoticAlloys: 0,
        biochips: 0,
        plasma: 0,
      },
      skills: {
        hacking: { level: 0, experience: 0, nextLevelCost: 100 },
        engineering: { level: 0, experience: 0, nextLevelCost: 100 },
        networking: { level: 0, experience: 0, nextLevelCost: 100 },
      },
      productionNodes,
      clan: null,
      research: [
        {
          name: "Basic Data Mining",
          cost: { credits: 100, data: 50 },
          unlocks: ["Improved Credit Mining", "Advanced Data Structures"],
          completed: false,
          description: "Unlock basic data mining techniques",
          effects: ["Increases data production by 10%"],
          requiredResources: { credits: 0, data: 0 }
        },
        {
          name: "Improved Credit Mining",
          cost: { credits: 250, data: 100 },
          unlocks: ["Advanced Hacking"],
          completed: false,
          description: "Enhance credit mining efficiency",
          effects: ["Increases credit production by 20%"],
          requirements: ["Basic Data Mining"],
          requiredResources: { credits: 0, data: 0 }
        },
        {
          name: "Advanced Data Structures",
          cost: { credits: 300, data: 150 },
          unlocks: ["Quantum Computing"],
          completed: false,
          description: "Implement advanced data structures for better efficiency",
          effects: ["Increases overall production speed by 5%"],
          requirements: ["Basic Data Mining"],
          requiredResources: { credits: 0, data: 0 }
        },
        {
          name: "Advanced Hacking",
          cost: { credits: 500, data: 250 },
          unlocks: [],
          completed: false,
          description: "Master advanced hacking techniques",
          effects: ["Increases credit production by 30%", "Unlocks new hacking missions"],
          requirements: ["Improved Credit Mining"],
          requiredResources: { credits: 0, data: 0 }
        },
        {
          name: "Quantum Computing",
          cost: { credits: 5000, data: 1000, advancedComponents: 50 },
          unlocks: ["Quantum Encryption", "Quantum Networking"],
          completed: false,
          description: "Harness the power of quantum superposition and entanglement",
          effects: ["Unlocks Quantum Computer production node", "Increases overall data processing speed by 20%"],
          requirements: ["Advanced Data Structures"]
        },
        {
          name: "Nanotechnology",
          cost: { credits: 4000, rawMaterials: 1000, components: 100 },
          unlocks: ["Molecular Assembly", "Nanorobotics"],
          completed: false,
          description: "Manipulate matter at the atomic and molecular scale",
          effects: ["Unlocks Nanoforge production node", "Increases efficiency of all material-based production by 15%"],
          requirements: ["Advanced Material Science"]
        },
        {
          name: "Neural Interface",
          cost: { credits: 10000, data: 2000, advancedComponents: 200 },
          unlocks: ["Brain-Computer Interface", "Synthetic Consciousness"],
          completed: false,
          description: "Develop direct communication pathways between the brain and external devices",
          effects: ["Unlocks Neurosynth Lab production node", "Increases all skill experience gain by 25%"],
          requirements: ["Quantum Computing", "Nanotechnology"]
        },
        {
          name: "Dark Matter Manipulation",
          cost: { credits: 25000, qubits: 500, nanomaterials: 1000 },
          unlocks: ["Gravitational Lensing", "Spacetime Warping"],
          completed: false,
          description: "Harness the mysterious properties of dark matter",
          effects: ["Unlocks Dark Matter Collector production node", "Enables faster-than-light communication"],
          requirements: ["Quantum Computing", "Advanced Astrophysics"]
        },
        {
          name: "Antimatter Containment",
          cost: { credits: 50000, darkMatter: 100, exoticAlloys: 500 },
          unlocks: ["Matter-Antimatter Reactors", "Antimatter Weapons"],
          completed: false,
          description: "Safely store and manipulate antimatter",
          effects: ["Unlocks Antimatter Synthesizer production node", "Dramatically increases energy production efficiency"],
          requirements: ["Dark Matter Manipulation", "Advanced Particle Physics"]
        },
        {
          name: "Exotic Materials Engineering",
          cost: { credits: 15000, nanomaterials: 500, advancedComponents: 300 },
          unlocks: ["Metamaterials", "Programmable Matter"],
          completed: false,
          description: "Create materials with properties not found in nature",
          effects: ["Unlocks Exotic Alloy Foundry production node", "Increases durability of all production nodes by 30%"],
          requirements: ["Nanotechnology", "Advanced Material Science"]
        },
        {
          name: "Bionic Enhancement",
          cost: { credits: 35000, syntheticNeurons: 200, exoticAlloys: 300 },
          unlocks: ["Cybernetic Implants", "Neural Boosters"],
          completed: false,
          description: "Augment biological functions with synthetic components",
          effects: ["Unlocks Biochip Implanter production node", "Increases all skill caps by 10 levels"],
          requirements: ["Neural Interface", "Exotic Materials Engineering"]
        },
        {
          name: "Plasma Physics",
          cost: { credits: 75000, antimatter: 50, qubits: 1000 },
          unlocks: ["Fusion Reactors", "Plasma Weapons"],
          completed: false,
          description: "Master the fourth state of matter",
          effects: ["Unlocks Plasma Containment Unit production node", "Enables new energy-based technologies"],
          requirements: ["Antimatter Containment", "Advanced Thermodynamics"]
        }
      ],
      availableResearch: ["Basic Data Mining"],
      market: {
        orders: [],
        events: [],
        addOrder: (order) => set((state) => ({
          market: {
            ...state.market,
            orders: [
              ...state.market.orders,
              {
                ...order,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: Date.now(),
              },
            ],
          },
        })),
        removeOrder: (orderId) => set((state) => ({
          market: {
            ...state.market,
            orders: state.market.orders.filter((order) => order.id !== orderId),
          },
        })),
        fulfillOrder: (orderId, quantity) => set((state) => {
          const order = state.market.orders.find((o) => o.id === orderId);
          if (!order) return state;

          const totalCost = order.pricePerUnit * quantity;
          if (state.resources.credits < totalCost) return state;

          const newQuantity = order.quantity - quantity;
          const newOrders = newQuantity > 0
            ? state.market.orders.map((o) => o.id === orderId ? { ...o, quantity: newQuantity } : o)
            : state.market.orders.filter((o) => o.id !== orderId);

          // Add to market history
          state.addToMarketHistory({
            type: 'buy',
            resourceType: order.resourceType,
            quantity,
            pricePerUnit: order.pricePerUnit,
            totalPrice: totalCost,
          });

          return {
            resources: {
              ...state.resources,
              credits: state.resources.credits - totalCost,
              [order.resourceType]: (state.resources[order.resourceType] || 0) + quantity,
            },
            market: {
              ...state.market,
              orders: newOrders,
            },
          };
        }),
        generateMarketEvent: () => set((state) => {
          const resourceTypes = ['credits', 'data', 'energy', 'rawMaterials', 'components', 'advancedComponents'];
          const eventTypes: MarketEvent['type'][] = ['boom', 'crash', 'shortage', 'surplus'];
          const newEvent: MarketEvent = {
            id: Math.random().toString(36).substr(2, 9),
            type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
            resourceType: resourceTypes[Math.floor(Math.random() * resourceTypes.length)],
            magnitude: Math.random() * 0.5 + 0.5, // 50% to 100% effect
            duration: Math.floor(Math.random() * 300000) + 300000, // 5 to 10 minutes
            startTime: Date.now(),
          };
          return {
            market: {
              ...state.market,
              events: [...state.market.events, newEvent],
            },
          };
        }),
        updatePrices: () => set((state) => {
          const newOrders = state.market.orders.map(order => {
            const activeEvents = state.market.events.filter(event => 
              event.resourceType === order.resourceType && 
              Date.now() - event.startTime < event.duration
            );
            
            let priceMultiplier = 1;
            activeEvents.forEach(event => {
              switch (event.type) {
                case 'boom':
                  priceMultiplier *= (1 + event.magnitude);
                  break;
                case 'crash':
                  priceMultiplier *= (1 - event.magnitude);
                  break;
                case 'shortage':
                  priceMultiplier *= (1 + event.magnitude / 2);
                  break;
                case 'surplus':
                  priceMultiplier *= (1 - event.magnitude / 2);
                  break;
              }
            });

            const randomFactor = 0.95 + Math.random() * 0.1; // ±5% random fluctuation
            const newPrice = order.pricePerUnit * priceMultiplier * randomFactor;
            return { ...order, pricePerUnit: Math.max(0.01, newPrice) };
          });

          return {
            market: {
              ...state.market,
              orders: newOrders,
            },
          };
        }),
        cancelOrder: (orderId) => set((state) => ({
          market: {
            ...state.market,
            orders: state.market.orders.filter((order) => order.id !== orderId),
          },
        })),
        getMarketHistory: () => get().marketHistory,
      },
      marketHistory: [],
      futuresContracts: [],
      createFuturesContract: (contract) => set(state => ({
        futuresContracts: [...state.futuresContracts, { ...contract, id: Math.random().toString(36).substr(2, 9) }],
        resources: {
          ...state.resources,
          credits: state.resources.credits - (contract.price * contract.quantity)
        }
      })),
      settleFuturesContract: (contractId) => set(state => {
        const contract = state.futuresContracts.find(c => c.id === contractId);
        if (!contract) return state;

        const currentPrice = state.market.orders.find(o => o.resourceType === contract.resourceType)?.pricePerUnit || 0;
        const profit = (currentPrice - contract.price) * contract.quantity;

        return {
          resources: {
            ...state.resources,
            credits: state.resources.credits + contract.price * contract.quantity + profit,
            [contract.resourceType]: state.resources[contract.resourceType] + contract.quantity
          },
          futuresContracts: state.futuresContracts.filter(c => c.id !== contractId)
        };
      }),
      lastUpdate: Date.now(),
      tick: () => {
        const state = get();
        const now = Date.now();
        const deltaSeconds = (now - state.lastUpdate) / 1000;
        const newResources = { ...state.resources };
        const newSkills = { ...state.skills };
    
        // Production
        Object.values(state.productionNodes).forEach(node => {
          if (node.unlocked) {
            const skillBonus = calculateSkillBonus(newSkills[getSkillForNode(node.name)].level);
            const production = node.baseRate * skillBonus * deltaSeconds;
    
            // Consume resources
            let canProduce = true;
            Object.entries(node.inputs).forEach(([resource, amount]) => {
              if (newResources[resource] < amount * production) {
                canProduce = false;
              }
            });
    
            if (canProduce) {
              // Consume inputs
              Object.entries(node.inputs).forEach(([resource, amount]) => {
                newResources[resource] -= amount * production;
              });
    
              // Produce outputs
              Object.entries(node.outputs).forEach(([resource, amount]) => {
                newResources[resource] = (newResources[resource] || 0) + amount * production;
              });
    
              // Generate experience
              newSkills[getSkillForNode(node.name)].experience += production;
            }
          }
        });
    
        // Skill leveling
        Object.entries(newSkills).forEach(([skillName, skill]) => {
          while (skill.experience >= skill.nextLevelCost) {
            skill.experience -= skill.nextLevelCost;
            skill.level += 1;
            skill.nextLevelCost = calculateNextLevelCost(skill.level);
          }
        });
    
        set({ resources: newResources, skills: newSkills, lastUpdate: now });
      },
      calculateOfflineProgress: () => {
        const state = get();
        const now = Date.now();
        const offlineTime = differenceInSeconds(now, state.lastUpdate);
        
        // Simulate ticks for the offline time
        for (let i = 0; i < offlineTime; i++) {
          state.tick();
        }
        
        set({ lastUpdate: now });
      },
      upgradeSkill: (skillName: string) => {
        const state = get();
        const skill = state.skills[skillName];
        if (state.resources.credits >= skill.nextLevelCost && skill.experience >= skill.nextLevelCost) {
          set(state => ({
            resources: {
              ...state.resources,
              credits: state.resources.credits - skill.nextLevelCost
            },
            skills: {
              ...state.skills,
              [skillName]: {
                ...skill,
                level: skill.level + 1,
                experience: skill.experience - skill.nextLevelCost,
                nextLevelCost: calculateNextLevelCost(skill.level + 1)
              }
            }
          }));
        }
      },
      completeResearch: (researchName: string) => {
        const state = get();
        const research = state.research.find(r => r.name === researchName);
        if (research && !research.completed) {
          const canComplete = Object.entries(research.cost).every(
            ([resource, cost]) => state.resources[resource] >= cost
          );
          if (canComplete) {
            set(state => ({
              resources: Object.entries(state.resources).reduce((acc, [resource, amount]) => {
                acc[resource] = amount - (research.cost[resource] || 0);
                return acc;
              }, { ...state.resources }),
              research: state.research.map(r =>
                r.name === researchName ? { ...r, completed: true } : r
              ),
              availableResearch: [
                ...state.availableResearch.filter(name => name !== researchName),
                ...research.unlocks.filter(name =>
                  state.research.find(r => r.name === name)?.requirements?.every(req =>
                    state.research.find(r => r.name === req)?.completed
                  )
                )
              ]
            }));
            // Apply research effects here
            applyResearchEffects(research);
          }
        }
      },
      createClan: (name: string) => {
        set({
          clan: {
            name,
            level: 1,
            experience: 0,
            members: [],
            resources: {},
            upgrades: CLAN_UPGRADES,
            missions: CLAN_MISSIONS
          }
        });
      },
      joinClan: (clanName: string) => set((state) => ({
        clan: state.clan 
          ? { ...state.clan, name: clanName, members: [...state.clan.members, 'Player'] }
          : {
              name: clanName,
              level: 1,
              experience: 0,
              members: ['Player'],
              resources: { credits: 0, data: 0, energy: 0 },
              upgrades: CLAN_UPGRADES,
              missions: CLAN_MISSIONS
            }
      })),
      contributeToClan: (resource: string, amount: number) => {
        // Implement resource contribution to clan
      },
      upgradeClan: (upgradeName: string) => {
        // Implement clan upgrade logic
      },
      startClanMission: (missionName: string) => {
        // Implement starting a clan mission
      },
      completeClanMission: (missionName: string) => {
        // Implement completing a clan mission
      },
      buyFromMarket: (itemName: string, amount: number) => {
        const state = get();
        const item = state.market[itemName];
        const totalCost = item.currentPrice * amount;
        if (state.resources.credits >= totalCost && item.available >= amount) {
          set(state => ({
            resources: {
              ...state.resources,
              credits: state.resources.credits - totalCost,
              [itemName]: (state.resources[itemName] || 0) + amount
            },
            market: {
              ...state.market,
              [itemName]: {
                ...item,
                available: item.available - amount
              }
            }
          }));
        }
      },
      sellToMarket: (itemName: string, amount: number) => {
        const state = get();
        const item = state.market[itemName];
        const totalEarnings = item.currentPrice * amount;
        if (state.resources[itemName] >= amount) {
          set(state => ({
            resources: {
              ...state.resources,
              credits: state.resources.credits + totalEarnings,
              [itemName]: state.resources[itemName] - amount
            },
            market: {
              ...state.market,
              [itemName]: {
                ...item,
                available: item.available + amount
              }
            }
          }));
        }
      },
      updateMarketPrices: () => set((state) => {
        const newMarket = { ...state.market };
        Object.keys(newMarket).forEach((itemName) => {
          if (itemName === 'credits') return; // Don't update credits price
          const item = newMarket[itemName];
          const priceChange = (Math.random() - 0.5) * 2 * item.volatility * item.basePrice;
          item.currentPrice = Math.max(item.basePrice * 0.5, Math.min(item.basePrice * 1.5, item.currentPrice + priceChange));
        });
        return { market: newMarket };
      }),
      settings: {
        volume: 50,
        theme: 'light',
        language: 'en',
        notifications: true,
        difficulty: 'normal',
      },
      setVolume: (volume: number) => set((state) => ({
        settings: { ...state.settings, volume }
      })),
      setTheme: (theme: 'light' | 'dark') => set((state) => ({
        settings: { ...state.settings, theme }
      })),
      setLanguage: (language: string) => set((state) => ({
        settings: { ...state.settings, language }
      })),
      setNotifications: (enabled: boolean) => set((state) => ({
        settings: { ...state.settings, notifications: enabled }
      })),
      setDifficulty: (difficulty: 'easy' | 'normal' | 'hard') => set((state) => ({
        settings: { ...state.settings, difficulty }
      })),
      purchaseProductionNode: (nodeName: string) => set((state) => {
        const node = state.productionNodes[nodeName];
        if (!node || node.unlocked || !node.purchaseCost) return state;

        const canPurchase = Object.entries(node.purchaseCost).every(
          ([resource, cost]) => state.resources[resource] >= cost
        );

        if (!canPurchase) return state;

        const newResources = { ...state.resources };
        Object.entries(node.purchaseCost).forEach(([resource, cost]) => {
          newResources[resource] -= cost;
        });

        return {
          resources: newResources,
          productionNodes: {
            ...state.productionNodes,
            [nodeName]: { ...node, unlocked: true }
          }
        };
      }),
      upgradeProductionNode: (nodeName: string) => set((state) => {
        const node = state.productionNodes[nodeName];
        if (!node || !node.unlocked) return state;

        const canUpgrade = Object.entries(node.upgradeCost).every(
          ([resource, cost]) => state.resources[resource] >= cost * (node.level + 1)
        );

        if (!canUpgrade) return state;

        const newResources = { ...state.resources };
        Object.entries(node.upgradeCost).forEach(([resource, cost]) => {
          newResources[resource] -= cost * (node.level + 1);
        });

        return {
          resources: newResources,
          productionNodes: {
            ...state.productionNodes,
            [nodeName]: { 
              ...node, 
              level: node.level + 1,
              baseRate: node.baseRate * 1.1 // 10% increase per level
            }
          }
        };
      }),
      getResearchProgress: (researchName: string) => {
        const state = get();
        const research = state.research.find(r => r.name === researchName);
        if (!research) return 0;
        
        return Object.entries(research.cost).reduce((progress, [resource, cost]) => {
          const available = state.resources[resource] || 0;
          return Math.min(progress, available / cost);
        }, 1);
      },
      addToMarketHistory: (entry: Omit<MarketHistoryEntry, 'id' | 'timestamp'>) => set((state) => ({
        marketHistory: [
          {
            ...entry,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
          },
          ...state.marketHistory.slice(0, 99), // Keep only the last 100 entries
        ],
      })),
      resourceBundles: [],
      createResourceBundle: (bundle) => set(state => ({
        resourceBundles: [...state.resourceBundles, { ...bundle, id: Math.random().toString(36).substr(2, 9) }]
      })),
      buyResourceBundle: (bundleId) => set(state => {
        const bundle = state.resourceBundles.find(b => b.id === bundleId);
        if (!bundle || state.resources.credits < bundle.price) return state;

        const newResources = { ...state.resources, credits: state.resources.credits - bundle.price };
        Object.entries(bundle.contents).forEach(([resource, amount]) => {
          newResources[resource] = (newResources[resource] || 0) + amount;
        });

        return { resources: newResources };
      }),
      auctions: [],
      createAuction: (auction) => set(state => ({
        auctions: [...state.auctions, { 
          ...auction, 
          id: Math.random().toString(36).substr(2, 9),
          currentBid: auction.startingPrice,
          highestBidder: null
        }]
      })),
      placeBid: (auctionId, bidAmount) => set(state => {
        const auction = state.auctions.find(a => a.id === auctionId);
        if (!auction || bidAmount <= auction.currentBid || state.resources.credits < bidAmount) return state;

        return {
          auctions: state.auctions.map(a => a.id === auctionId ? { ...a, currentBid: bidAmount, highestBidder: 'player' } : a)
        };
      }),
      settleAuctions: () => set(state => {
        const now = Date.now();
        const endedAuctions = state.auctions.filter(a => a.endTime <= now);
        const ongoingAuctions = state.auctions.filter(a => a.endTime > now);

        const newResources = { ...state.resources };
        endedAuctions.forEach(auction => {
          if (auction.highestBidder === 'player') {
            newResources.credits -= auction.currentBid;
            newResources[auction.itemName] = (newResources[auction.itemName] || 0) + 1;
          }
        });

        return {
          auctions: ongoingAuctions,
          resources: newResources
        };
      }),
      marketNews: [],
      generateMarketNews: () => set(state => {
        const headlines = [
          "New technology breakthrough affects {resource} production",
          "Political tensions rise, impacting {resource} trade",
          "Natural disaster disrupts {resource} supply chain",
          "Unexpected surge in {resource} demand",
          "Regulatory changes affect {resource} market"
        ];

        const resources = Object.keys(state.resources);
        const affectedResource = resources[Math.floor(Math.random() * resources.length)];
        const headline = headlines[Math.floor(Math.random() * headlines.length)].replace('{resource}', affectedResource);
        const impact = (Math.random() * 2 - 1) * 0.5; // -0.5 to 0.5

        const news: MarketNews = {
          id: Math.random().toString(36).substr(2, 9),
          headline,
          content: "Experts predict significant market changes in the coming days.",
          affectedResources: [affectedResource],
          impact,
          timestamp: Date.now()
        };

        return { marketNews: [...state.marketNews, news] };
      }),
      automatedTrades: [],
      addAutomatedTrade: (trade) => set((state) => ({
        automatedTrades: [...state.automatedTrades, trade],
      })),
      removeAutomatedTrade: (index) => set((state) => ({
        automatedTrades: state.automatedTrades.filter((_, i) => i !== index),
      })),
      org: null,
      createOrg: (name: string) => {
        const ORG_UPGRADES: OrgUpgrade[] = [
          {
            name: "Production Boost",
            level: 0,
            cost: {
              credits: 1000,
              data: 500
            },
            effect: (org) => {
              org.level += 1;
            }
          },
          // Add more org upgrades here
        ];

        const ORG_MISSIONS: OrgMission[] = [
          {
            name: "Data Heist",
            description: "Infiltrate a corporate database and extract valuable data.",
            requirements: { credits: 5000, data: 1000 },
            rewards: { credits: 10000, data: 5000 },
            completed: false
          },
          // Add more org missions here
        ];

        set({
          org: {
            name,
            level: 1,
            experience: 0,
            members: [],
            resources: {},
            upgrades: ORG_UPGRADES,
            missions: ORG_MISSIONS
          }
        });
      },
      joinOrg: (orgName: string) => set((state) => ({
        org: state.org 
          ? { ...state.org, name: orgName, members: [...state.org.members, 'Player'] }
          : {
              name: orgName,
              level: 1,
              experience: 0,
              members: ['Player'],
              resources: { credits: 0, data: 0, energy: 0 },
              upgrades: ORG_UPGRADES,
              missions: ORG_MISSIONS
            }
      })),
      contributeToOrg: (resource: string, amount: number) => set((state) => {
        if (!state.org) return state;
        return {
          org: {
            ...state.org,
            resources: {
              ...state.org.resources,
              [resource]: (state.org.resources[resource] || 0) + amount
            }
          },
          resources: {
            ...state.resources,
            [resource]: state.resources[resource] - amount
          }
        };
      }),
      upgradeOrg: (upgradeName: string) => set((state) => {
        if (!state.org) return state;
        const upgrade = state.org.upgrades.find(u => u.name === upgradeName);
        if (!upgrade) return state;

        const canUpgrade = Object.entries(upgrade.cost).every(
          ([resource, cost]) => (state.org?.resources[resource] || 0) >= cost
        );

        if (!canUpgrade) return state;

        const newResources = { ...state.org.resources };
        Object.entries(upgrade.cost).forEach(([resource, cost]) => {
          newResources[resource] -= cost;
        });

        upgrade.effect(state.org);

        return {
          org: {
            ...state.org,
            resources: newResources,
            upgrades: state.org.upgrades.map(u =>
              u.name === upgradeName ? { ...u, level: u.level + 1 } : u
            )
          }
        };
      }),
      startOrgMission: (missionName: string) => set((state) => {
        if (!state.org) return state;
        const mission = state.org.missions.find(m => m.name === missionName);
        if (!mission || mission.completed) return state;

        const canStart = Object.entries(mission.requirements).every(
          ([resource, amount]) => (state.org?.resources[resource] || 0) >= amount
        );

        if (!canStart) return state;

        const newResources = { ...state.org.resources };
        Object.entries(mission.requirements).forEach(([resource, amount]) => {
          newResources[resource] -= amount;
        });

        return {
          org: {
            ...state.org,
            resources: newResources,
            missions: state.org.missions.map(m =>
              m.name === missionName ? { ...m, completed: true } : m
            )
          }
        };
      }),
      completeOrgMission: (missionName: string) => set((state) => {
        if (!state.org) return state;
        const mission = state.org.missions.find(m => m.name === missionName);
        if (!mission || !mission.completed) return state;

        const newResources = { ...state.org.resources };
        Object.entries(mission.rewards).forEach(([resource, amount]) => {
          newResources[resource] = (newResources[resource] || 0) + amount;
        });

        return {
          org: {
            ...state.org,
            resources: newResources,
            experience: state.org.experience + 100 // Add experience for completing a mission
          }
        };
      }),
      productionChains: {
        basicCircuitBoard: {
          id: 'basicCircuitBoard',
          name: 'Basic Circuit Board',
          stages: [
            {
              inputs: { rawMaterials: 2, energy: 1 },
              outputs: { components: 1 },
              duration: 60,
              requiredNode: 'Component Fabricator',
            },
            {
              inputs: { components: 2, energy: 2 },
              outputs: { basicCircuitBoard: 1 },
              duration: 120,
              requiredNode: 'Advanced Component Assembler',
            },
          ],
          finalOutput: { basicCircuitBoard: 1 },
          automationLevel: 0,
          blueprintUnlocked: false,
        },
        // Add more production chains here as needed
      },
    }),
    {
      name: 'game-storage',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      partialize: (state) => ({
        ...state,
        // Remove sensitive data from persistence
        user: undefined,
        isLoading: undefined,
        lastUpdate: state.lastUpdate,
      }),
    }
  )
);

// Update this section to use useAuthStore
auth.onAuthStateChanged((user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});

function getSkillForNode(nodeName: string): string {
  switch (nodeName) {
    case 'Credit Miner':
      return 'hacking';
    case 'Data Harvester':
    case 'Advanced Component Assembler':
      return 'networking';
    case 'Energy Generator':
    case 'Raw Material Extractor':
    case 'Component Fabricator':
      return 'engineering';
    default:
      return 'hacking';
  }
}

export const useTheme = () => {
  const theme = useGameStore((state) => state.settings.theme);
  const setTheme = useGameStore((state) => state.setTheme);
  return { theme, setTheme };
};

function applyResearchEffects(research: Research) {
  // Implement the logic to apply research effects
  // This could involve updating production rates, unlocking new features, etc.
  console.log(`Applying effects for research: ${research.name}`);
  // Example: 
  // if (research.name === "Basic Data Mining") {
  //   // Increase data production by 10%
  //   // You'd need to implement this logic in your production calculations
  // }
}