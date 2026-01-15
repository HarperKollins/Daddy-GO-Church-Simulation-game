/**
 * Nigerian Realism Engine
 * 
 * Generates procedural events that reflect the chaotic reality of living in Nigeria.
 * Focuses on:
 * - Owambe Parties (Weddings, Burials, Chieftaincy)
 * - Infrastructure failures (NEPA, Fuel)
 * - Family demands (Black Tax)
 */

import { OwambeEvent, VenueTier, ChurchStaff, ChurchMother, StaffDrama } from '@/types/game';

export const OWAMBE_TYPES = ['wedding', 'burial', 'chieftaincy', 'thanksgiving', 'launch', 'birthday'] as const;

export const CHOIR_DRAMA_TEMPLATES = [
    { title: 'Solist Jealousy', description: 'The alto singer is poisoning the soprano.' },
    { title: 'Keyboardist Strike', description: 'Wants 50% raise or he plays wrong chords.' }
];

export const CHURCH_MOTHER_POWERS = [
    'Arranged Marriage',
    'Market Mobilization',
    'Gossip Network'
];

const VENUES = [
    'Eko Hotel & Suites',
    'Civic Center',
    'Local Government Hall',
    'Primary School Field',
    'Oriental Hotel',
    'Monarch Event Center',
    'Family Compound'
];

const DESCRIPTIONS = [
    "A lavish wedding for a senator's daughter.",
    "A burial ceremony that looks like a carnival.",
    "A chieftaincy title coronation for a local don.",
    "A 50th birthday party with King Sunny Ade performing.",
    "A thanksgiving service for a miraculous contract.",
    "A product launch for a new magic whitening cream."
];

/**
 * Generate a random Owambe event
 */
export function generateOwambeInvitation(currentWeek: number, fame: number): OwambeEvent {
    const type = OWAMBE_TYPES[Math.floor(Math.random() * OWAMBE_TYPES.length)];
    const venue = VENUES[Math.floor(Math.random() * VENUES.length)];
    const baseCost = 50000;

    // Scale cost and importance with fame
    // The more famous you are, the "higher class" events you get invited to
    const scaleFactor = Math.max(1, fame / 1000);
    const cost = Math.floor(baseCost * scaleFactor * (0.5 + Math.random()));

    const networkingPotential = Math.floor((cost / 1000) * (0.8 + Math.random() * 0.4));

    return {
        id: `owambe_${currentWeek}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        host: "Chief & Mrs. " + (Math.random() > 0.5 ? "Adeleke" : "Okonkwo"),
        venue,
        estimatedGuests: 200 + Math.floor(Math.random() * 2000),
        dressCode: Math.random() > 0.5 ? "Aso Ebi (Teal & Gold)" : "All White",
        networkingPotential, // Fame gain if attended
        cost,
        politicalImportance: Math.floor(Math.random() * 100),
        description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
    };
}

/**
 * Check for infrastructure failure
 */
export interface RealismEvent {
    id: string;
    type: 'nepa_failure' | 'police_stop' | 'fuel_scarcity' | 'traffic_jam' | 'japa_opportunity' | 'flood';
    severity: number;
    description: string;
    choices: {
        id: string;
        label: string;
        cost?: number;
        consequence: string;
    }[];
}

/**
 * Check for infrastructure failure
 */
export function checkInfrastructureFailure(season: 'dry' | 'rainy'): RealismEvent | null {
    const roll = Math.random();

    if (season === 'rainy' && roll < 0.3) {
        return {
            id: `flood_${Date.now()}`,
            type: 'flood',
            severity: 0.9,
            description: "HEAVY RAIN! Lagos is flooded. Your church venue is leaking.",
            choices: [
                { id: 'drain', label: 'Hire Area Boys to Drain', cost: 20000, consequence: 'Venue saved, -20k Cash' },
                { id: 'ignore', label: 'Preach in the Rain', cost: 0, consequence: '+Spirit, -Health, Members unhappy' },
                { id: 'online', label: 'Move Service Online', cost: 5000, consequence: 'Safety first. -Offering' }
            ]
        };
    }

    if (roll < 0.1) {
        return {
            id: `light_${Date.now()}`,
            type: 'nepa_failure',
            severity: 0.8,
            description: "NEPA has taken the light! The church is now operating in darkness.",
            choices: [
                { id: 'gen', label: 'Buy Fuel & Run Generator', cost: 50000, consequence: 'Light restored. -50k Cash' },
                { id: 'dark', label: 'Hold Vigil in Darkness', cost: 0, consequence: 'Atmosphere intensified! +Spirit, -Comfort' },
                { id: 'solar', label: 'Install Solar (Expensive)', cost: 5000000, consequence: 'Permanent Power Solution!' }
            ]
        };
    }

    if (roll < 0.05) {
        return {
            id: `fuel_${Date.now()}`,
            type: 'fuel_scarcity',
            severity: 0.95,
            description: "FUEL SCARCITY! Queues are 5 hours long.",
            choices: [
                { id: 'black_market', label: 'Buy Black Market (3x Price)', cost: 100000, consequence: 'Mobility secured. -100k Cash' },
                { id: 'trek', label: 'Trek for the Lord', cost: 0, consequence: '-Energy, +Humility' },
                { id: 'bribe', label: 'Bribe Attendant', cost: 20000, consequence: 'Skipped queue. -Integrity' }
            ]
        };
    }

    return null;
}

// ==========================================
// RESTORED STUBS FOR COMPATIBILITY
// ==========================================

export function rsvpToOwambe(eventId: string, attending: boolean): void {
    // Logic for RSVP
}

export function generateConstructionProblem(): any {
    return { type: 'stolen_materials', cost: 50000 };
}

export function generateMotherConflict(): any {
    return { type: 'daughter_in_law_wahala', impact: -10 };
}

export function processThanksgivingDonation(): void {
    // Logic
}

export function generateStaffDrama(): StaffDrama {
    return {
        type: 'salary_complaint',
        involvedStaff: [],
        description: 'Staff are grumbling about salary.',
        evidence: true,
        actionRequired: 'ignore'
    };
}
