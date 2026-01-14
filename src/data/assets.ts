/**
 * Assets Database
 * 
 * Cars, property, and investments the player can own.
 * Assets provide fame bonuses but have maintenance costs.
 * 
 * Cultural Context:
 * In Nigerian megachurch culture, vehicles are major status symbols.
 * The progression from Corolla to Lexus to G-Wagon to Private Jet
 * mirrors real-world pastor flex culture.
 */

import type { Asset } from '@/types/game';

export const assets: Asset[] = [
    // =========================================================================
    // VEHICLES - Progression of flex
    // =========================================================================
    {
        id: 'COROLLA',
        name: 'Toyota Corolla',
        category: 'vehicle',
        cost: 3000000,
        weeklyMaintenance: 5000,
        fameBonus: 2,
    },
    {
        id: 'CAMRY',
        name: 'Toyota Camry',
        category: 'vehicle',
        cost: 8000000,
        weeklyMaintenance: 10000,
        fameBonus: 5,
    },
    {
        id: 'HIGHLANDER',
        name: 'Toyota Highlander',
        category: 'vehicle',
        cost: 15000000,
        weeklyMaintenance: 20000,
        fameBonus: 8,
    },
    {
        id: 'LEXUS_RX',
        name: 'Lexus RX 350',
        category: 'vehicle',
        cost: 25000000,
        weeklyMaintenance: 35000,
        fameBonus: 12,
    },
    {
        id: 'LAND_CRUISER',
        name: 'Toyota Land Cruiser',
        category: 'vehicle',
        cost: 45000000,
        weeklyMaintenance: 50000,
        fameBonus: 18,
    },
    {
        id: 'MERCEDES_S_CLASS',
        name: 'Mercedes S-Class',
        category: 'vehicle',
        cost: 80000000,
        weeklyMaintenance: 80000,
        fameBonus: 25,
    },
    {
        id: 'G_WAGON',
        name: 'Mercedes G-Wagon',
        category: 'vehicle',
        cost: 150000000,
        weeklyMaintenance: 150000,
        fameBonus: 35,
    },
    {
        id: 'ROLLS_ROYCE',
        name: 'Rolls Royce Phantom',
        category: 'vehicle',
        cost: 500000000,
        weeklyMaintenance: 300000,
        fameBonus: 50,
    },
    {
        id: 'PRIVATE_JET',
        name: 'Private Jet (Gulfstream G650)',
        category: 'vehicle',
        cost: 2000000000,
        weeklyMaintenance: 5000000,
        fameBonus: 100,
    },

    // =========================================================================
    // PROPERTY - Church and personal real estate
    // =========================================================================
    {
        id: 'FLAT_LAGOS',
        name: '3-Bedroom Flat (Lagos)',
        category: 'property',
        cost: 30000000,
        weeklyMaintenance: 20000,
        fameBonus: 3,
    },
    {
        id: 'DUPLEX_LEKKI',
        name: 'Duplex in Lekki',
        category: 'property',
        cost: 120000000,
        weeklyMaintenance: 50000,
        fameBonus: 10,
    },
    {
        id: 'MANSION_BANANA',
        name: 'Mansion in Banana Island',
        category: 'property',
        cost: 500000000,
        weeklyMaintenance: 200000,
        fameBonus: 30,
    },
    {
        id: 'ESTATE_ABUJA',
        name: 'Estate in Maitama, Abuja',
        category: 'property',
        cost: 1000000000,
        weeklyMaintenance: 500000,
        fameBonus: 45,
    },

    // =========================================================================
    // INVESTMENTS - The casino (high risk, high reward)
    // =========================================================================
    {
        id: 'DANGOTE_STOCK',
        name: 'Dangote Cement Shares',
        category: 'investment',
        cost: 10000000,
        weeklyMaintenance: 0,
        fameBonus: 0,
        volatility: 15,
        rugPullChance: 0.01,
    },
    {
        id: 'BANK_STOCK',
        name: 'GTBank Shares',
        category: 'investment',
        cost: 5000000,
        weeklyMaintenance: 0,
        fameBonus: 0,
        volatility: 20,
        rugPullChance: 0.02,
    },
    {
        id: 'CRYPTO_BTC',
        name: 'Bitcoin Investment',
        category: 'investment',
        cost: 20000000,
        weeklyMaintenance: 0,
        fameBonus: 5,
        volatility: 50,
        rugPullChance: 0.05,
    },
    {
        id: 'GLORY_COIN',
        name: 'GloryCoin (Shitcoin)',
        category: 'investment',
        cost: 5000000,
        weeklyMaintenance: 0,
        fameBonus: 0,
        volatility: 90,
        rugPullChance: 0.30,
    },
    {
        id: 'PONZI_SCHEME',
        name: 'Pastor Profit Investment',
        category: 'investment',
        cost: 50000000,
        weeklyMaintenance: 0,
        fameBonus: 0,
        volatility: 100,
        rugPullChance: 0.50,
    },
];

/**
 * Get assets available based on church cash
 */
export const getAffordableAssets = (cash: number): Asset[] => {
    return assets.filter(asset => asset.cost <= cash);
};

/**
 * Get assets by category
 */
export const getAssetsByCategory = (category: Asset['category']): Asset[] => {
    return assets.filter(asset => asset.category === category);
};

/**
 * Simulate weekly investment returns
 */
export const simulateInvestmentReturn = (asset: Asset, currentValue: number): { newValue: number; rugPulled: boolean } => {
    // Check for rug pull
    if (asset.rugPullChance && Math.random() < asset.rugPullChance) {
        return { newValue: 0, rugPulled: true };
    }

    // Calculate volatility-based return
    const volatility = asset.volatility || 0;
    const maxChange = volatility / 100;
    const change = (Math.random() * 2 - 1) * maxChange;
    const newValue = Math.max(0, Math.floor(currentValue * (1 + change)));

    return { newValue, rugPulled: false };
};

export default assets;
