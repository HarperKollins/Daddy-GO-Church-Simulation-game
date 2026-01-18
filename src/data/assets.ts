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
    // UNIVERSITY ERA (Survival Essentials)
    // =========================================================================
    {
        id: 'USED_LAPTOP',
        name: 'Used Dell Laptop',
        category: 'property',
        cost: 50000,
        weeklyMaintenance: 0,
        fameBonus: 1,
        unlockEra: 'University'
    },
    {
        id: 'FRIDGE',
        name: 'Small Hostel Fridge',
        category: 'property',
        cost: 80000,
        weeklyMaintenance: 1000,
        fameBonus: 1,
        unlockEra: 'University'
    },
    {
        id: 'TEXTBOOKS',
        name: 'Theology Textbooks',
        category: 'property',
        cost: 30000,
        weeklyMaintenance: 0,
        fameBonus: 2, // Knowledge flex
        unlockEra: 'University'
    },

    // =========================================================================
    // CITY ERA (The Rise) - Cars & Land
    // =========================================================================
    {
        id: 'COROLLA',
        name: 'Toyota Corolla',
        category: 'vehicle',
        cost: 3000000,
        weeklyMaintenance: 5000,
        fameBonus: 5,
        unlockEra: 'City'
    },
    {
        id: 'CAMRY',
        name: 'Toyota Camry',
        category: 'vehicle',
        cost: 8000000,
        weeklyMaintenance: 10000,
        fameBonus: 10,
        unlockEra: 'City'
    },
    {
        id: 'GENERATOR',
        name: 'Mikano Generator (Small)',
        category: 'property',
        cost: 500000,
        weeklyMaintenance: 20000, // Fuel is expensive
        fameBonus: 5,
        unlockEra: 'City'
    },
    {
        id: 'LAND_LEKKI',
        name: 'Half Plot in Lekki',
        category: 'property',
        cost: 50000000,
        weeklyMaintenance: 5000,
        fameBonus: 20,
        unlockEra: 'City'
    },

    // =========================================================================
    // EMPIRE ERA (National Power) - Jets & Media
    // =========================================================================
    {
        id: 'G_WAGON',
        name: 'Mercedes G-Wagon',
        category: 'vehicle',
        cost: 150000000,
        weeklyMaintenance: 150000,
        fameBonus: 50,
        unlockEra: 'Empire'
    },
    {
        id: 'PRIVATE_JET',
        name: 'Private Jet (Challenger)',
        category: 'vehicle',
        cost: 3000000000, // 3 Billion
        weeklyMaintenance: 10000000,
        fameBonus: 500,
        unlockEra: 'Empire'
    },
    {
        id: 'TV_STATION',
        name: 'Satellite TV Station',
        category: 'property',
        cost: 500000000, // 500m
        weeklyMaintenance: 5000000,
        fameBonus: 1000,
        unlockEra: 'Empire'
    },
    {
        id: 'MANSION_ABUJA',
        name: 'Mansion in Asokoro',
        category: 'property',
        cost: 1500000000,
        weeklyMaintenance: 500000,
        fameBonus: 200,
        unlockEra: 'Empire'
    },

    // =========================================================================
    // ULTIMATE ERA (Interdimensional Flex)
    // =========================================================================
    {
        id: 'SPACE_ARK',
        name: 'The Space Ark',
        category: 'vehicle',
        cost: 10000000000000, // 10 Trillion
        weeklyMaintenance: 1000000000,
        fameBonus: 50000,
        unlockEra: 'Ultimate'
    },
    {
        id: 'WEATHER_MACHINE',
        name: 'Atmospheric Controller',
        category: 'property',
        cost: 5000000000000, // 5 Trillion
        weeklyMaintenance: 500000000,
        fameBonus: 25000,
        unlockEra: 'Ultimate'
    },
    {
        id: 'PRIVATE_ISLAND',
        name: 'Sovereign Island Nation',
        category: 'property',
        cost: 200000000000, // 200 Billion
        weeklyMaintenance: 100000000,
        fameBonus: 5000,
        unlockEra: 'Ultimate'
    },
    {
        id: 'INTERDIMENSIONAL_PORTAL',
        name: 'Spirit Realm Gateway',
        category: 'investment',
        cost: 50000000000000, // 50 Trillion
        weeklyMaintenance: 0,
        fameBonus: 100000,
        unlockEra: 'Ultimate'
    },

    // =========================================================================
    // INVESTMENTS (Available Mostly from City+)
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
        unlockEra: 'City'
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
        unlockEra: 'City'
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
        unlockEra: 'City'
    }
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
