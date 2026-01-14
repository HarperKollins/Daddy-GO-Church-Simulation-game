/**
 * Nightlife & Social System
 * 
 * Underground activities and social life:
 * - Clubs and nightlife
 * - Secret relationships
 * - VIP lifestyle
 * - Social events
 */

import type { CoreStats } from '@/types/game';

// ============================================================================
// NIGHTLIFE VENUES
// ============================================================================

export interface NightlifeVenue {
    id: string;
    name: string;
    type: 'club' | 'lounge' | 'beach' | 'hotel' | 'secret';
    location: string;
    entryFee: number;
    minimumSpend: number;
    fameRequired: number;
    scandalRisk: number;
    description: string;
    unlockCondition?: string;
}

export const NIGHTLIFE_VENUES: NightlifeVenue[] = [
    // Public venues
    {
        id: 'QUILOX',
        name: 'Club Quilox',
        type: 'club',
        location: 'Victoria Island, Lagos',
        entryFee: 50000,
        minimumSpend: 200000,
        fameRequired: 0,
        scandalRisk: 40,
        description: 'Lagos premium nightclub. Politicians and celebrities.'
    },
    {
        id: 'HARDROCK',
        name: 'Hard Rock Cafe',
        type: 'lounge',
        location: 'Lagos',
        entryFee: 20000,
        minimumSpend: 50000,
        fameRequired: 0,
        scandalRisk: 20,
        description: 'Low-key vibes. Good for business meetings.'
    },
    {
        id: 'CLUB_ZONE',
        name: 'Club Zone',
        type: 'club',
        location: 'Ikeja, Lagos',
        entryFee: 10000,
        minimumSpend: 30000,
        fameRequired: 0,
        scandalRisk: 30,
        description: 'Regular people club. Less risk of being spotted.'
    },
    {
        id: 'ELEGUSHI',
        name: 'Elegushi Beach',
        type: 'beach',
        location: 'Lekki, Lagos',
        entryFee: 5000,
        minimumSpend: 20000,
        fameRequired: 0,
        scandalRisk: 25,
        description: 'Beach vibes. Suya, drinks, and sunset.'
    },

    // VIP / Secret venues
    {
        id: 'THE_VAULT',
        name: 'The Vault',
        type: 'secret',
        location: 'Undisclosed, Lagos',
        entryFee: 500000,
        minimumSpend: 2000000,
        fameRequired: 7000,
        scandalRisk: 10,
        description: 'Invitation only. What happens here stays here.',
        unlockCondition: 'fame > 7000'
    },
    {
        id: 'POLITICIANS_LOUNGE',
        name: 'Governor\'s Private Lounge',
        type: 'secret',
        location: 'Government House',
        entryFee: 0,
        minimumSpend: 0,
        fameRequired: 8000,
        scandalRisk: 60,
        description: 'Where deals are made. Political connections only.',
        unlockCondition: 'influence > 3000'
    },
    {
        id: 'ABUJA_SUITE',
        name: 'Transcorp Hilton Suite',
        type: 'hotel',
        location: 'Abuja',
        entryFee: 300000,
        minimumSpend: 500000,
        fameRequired: 5000,
        scandalRisk: 50,
        description: 'Where federal deals happen after hours.'
    }
];

// ============================================================================
// CLUB ACTIVITIES
// ============================================================================

export interface ClubActivity {
    id: string;
    name: string;
    cost: number;
    effects: Record<string, number>;
    scandalRisk: number;
    energyCost: number;
    description: string;
}

export const CLUB_ACTIVITIES: ClubActivity[] = [
    {
        id: 'VIP_TABLE',
        name: 'Get VIP Table',
        cost: 500000,
        effects: { fame: 200, stress: -300 },
        scandalRisk: 30,
        energyCost: 200,
        description: 'Pop champagne. Let them see you.'
    },
    {
        id: 'LOW_KEY',
        name: 'Stay Low-Key',
        cost: 50000,
        effects: { stress: -200 },
        scandalRisk: 10,
        energyCost: 100,
        description: 'Enjoy the music. No attention.'
    },
    {
        id: 'NETWORK',
        name: 'Network with Big Men',
        cost: 100000,
        effects: { influence: 200, stress: -100 },
        scandalRisk: 20,
        energyCost: 300,
        description: 'Exchange numbers with politicians and businessmen.'
    },
    {
        id: 'DANCE_GIRLS',
        name: 'Dance with... Friends',
        cost: 200000,
        effects: { stress: -500, health: -100 },
        scandalRisk: 60,
        energyCost: 300,
        description: 'Who these girls be? Nobody knows.'
    },
    {
        id: 'POP_BOTTLES',
        name: 'Pop 10 Bottles for the Gram',
        cost: 2000000,
        effects: { fame: 500, stress: -400 },
        scandalRisk: 50,
        energyCost: 400,
        description: 'Make it rain! Instagram will love this.'
    },
    {
        id: 'PRIVATE_ROOM',
        name: 'Private Room',
        cost: 1000000,
        effects: { stress: -600, health: -200 },
        scandalRisk: 80,
        energyCost: 400,
        description: 'What happens in the private room...'
    }
];

/**
 * Process club night outcome
 */
export function processClubNight(
    venue: NightlifeVenue,
    activities: ClubActivity[],
    currentFame: number
): {
    totalCost: number;
    effects: Record<string, number>;
    wasSpotted: boolean;
    spottedBy: string;
    narrative: string;
} {
    let totalCost = venue.entryFee + venue.minimumSpend;
    const effects: Record<string, number> = {};
    let maxScandalRisk = venue.scandalRisk;

    for (const activity of activities) {
        totalCost += activity.cost;
        maxScandalRisk = Math.max(maxScandalRisk, activity.scandalRisk);

        for (const [key, value] of Object.entries(activity.effects)) {
            effects[key] = (effects[key] || 0) + value;
        }
    }

    // Fame increases chance of being spotted
    const spotChance = (maxScandalRisk / 100) * (1 + currentFame / 10000);
    const wasSpotted = Math.random() < spotChance;

    const spotters = [
        'a church member',
        'a blogger with 500K followers',
        'your wife\'s friend',
        'a junior pastor',
        'Instablog9ja photographer',
        'an opposing pastor\'s spy'
    ];

    return {
        totalCost,
        effects,
        wasSpotted,
        spottedBy: wasSpotted ? spotters[Math.floor(Math.random() * spotters.length)] : '',
        narrative: wasSpotted
            ? `You were spotted by ${spotters[Math.floor(Math.random() * spotters.length)]}! Photos were taken.`
            : 'You had a great night. No cameras caught you.'
    };
}

// ============================================================================
// LIFESTYLE FEATURES
// ============================================================================

export interface LifestyleItem {
    id: string;
    name: string;
    category: 'fashion' | 'accessory' | 'experience' | 'membership';
    cost: number;
    weeklyMaintenance?: number;
    fameBonus: number;
    scandalIfSeen: number;
    description: string;
}

export const LIFESTYLE_ITEMS: LifestyleItem[] = [
    // Fashion
    {
        id: 'GUCCI_ROBE',
        name: 'Gucci Pastoral Robe',
        category: 'fashion',
        cost: 2000000,
        fameBonus: 200,
        scandalIfSeen: 100,
        description: 'Designer ministry wear. ₦2M for the drip.'
    },
    {
        id: 'ROLEX',
        name: 'Rolex Day-Date',
        category: 'accessory',
        cost: 35000000,
        fameBonus: 500,
        scandalIfSeen: 300,
        description: 'The pastor\'s watch. Gold, obviously.'
    },
    {
        id: 'CUBAN_CHAIN',
        name: 'Cuban Link Chain (Gold)',
        category: 'accessory',
        cost: 5000000,
        fameBonus: 150,
        scandalIfSeen: 200,
        description: '"It\'s a gift from church members!"'
    },

    // Experiences
    {
        id: 'DUBAI_TRIP',
        name: 'Dubai Shopping Trip',
        category: 'experience',
        cost: 15000000,
        fameBonus: 800,
        scandalIfSeen: 400,
        description: 'Burj Khalifa photos incoming.'
    },
    {
        id: 'LONDON_PROPERTY',
        name: 'London Property Tour',
        category: 'experience',
        cost: 25000000,
        fameBonus: 600,
        scandalIfSeen: 600,
        description: 'Shopping for overseas investments.'
    },

    // Memberships
    {
        id: 'IKOYI_CLUB',
        name: 'Ikoyi Club Membership',
        category: 'membership',
        cost: 10000000,
        weeklyMaintenance: 100000,
        fameBonus: 300,
        scandalIfSeen: 50,
        description: 'Where Lagos elite meet.'
    },
    {
        id: 'GOLF_CLUB',
        name: 'IBB Golf Club (Abuja)',
        category: 'membership',
        cost: 20000000,
        weeklyMaintenance: 200000,
        fameBonus: 400,
        scandalIfSeen: 100,
        description: 'Political deals on the green.'
    }
];

// ============================================================================
// SOCIAL RELATIONSHIPS
// ============================================================================

export interface SecretRelationship {
    id: string;
    name: string;
    type: 'affair' | 'side_chick' | 'baby_mama' | 'secret_family';
    weeklyMaintenanceCost: number;
    discoveryRisk: number;  // Per week %
    happiness: number;
    scandalIfExposed: number;
}

export function processSecretRelationship(
    relationship: SecretRelationship,
    weeks: number
): { discovered: boolean; totalCost: number; stressRelief: number } {
    const totalCost = relationship.weeklyMaintenanceCost * weeks;

    // Cumulative discovery risk
    const discoveryProb = 1 - Math.pow(1 - relationship.discoveryRisk / 100, weeks);
    const discovered = Math.random() < discoveryProb;

    return {
        discovered,
        totalCost,
        stressRelief: discovered ? -1000 : relationship.happiness * weeks
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function getUnlockedVenues(fame: number, influence: number): NightlifeVenue[] {
    return NIGHTLIFE_VENUES.filter(v => {
        if (v.fameRequired > fame) return false;
        if (v.unlockCondition?.includes('influence') && influence < 3000) return false;
        return true;
    });
}
