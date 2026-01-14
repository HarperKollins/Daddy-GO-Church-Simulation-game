/**
 * Spiritual Warfare System
 * 
 * Deep spiritual mechanics including:
 * - Demon encounters and battles
 * - Deliverance sessions
 * - Juju/occult temptations
 * - Prayer power levels
 * - Spiritual protection states
 */

import type { CoreStats } from '@/types/game';

// ============================================================================
// SPIRITUAL ENTITIES
// ============================================================================

export interface DemonEntity {
    id: string;
    name: string;
    tier: 'minor' | 'major' | 'principality' | 'territorial';
    domain: string;
    strength: number;  // 0-10000
    weakness: string[];
    unlockCondition: string;
}

export interface SpiritualState {
    protectionLevel: number;      // 0-10000
    vulnerabilities: string[];
    activeBlessing: Blessing | null;
    activeCurse: Curse | null;
    prayerPower: number;          // 0-10000
    fastingBonus: number;         // 0-1000
    lastDeliverance: number;      // Week
    demonsFought: string[];
    demonsDefeated: string[];
}

export interface Blessing {
    id: string;
    name: string;
    source: string;
    strength: number;
    duration: number;  // Weeks
    effects: Record<string, number>;
}

export interface Curse {
    id: string;
    name: string;
    source: string;
    strength: number;
    breakCondition: string;
    effects: Record<string, number>;
}

// ============================================================================
// DEMON DATABASE
// ============================================================================

export const DEMONS: DemonEntity[] = [
    // Minor spirits
    {
        id: 'SPIRIT_OF_LUST',
        name: 'Spirit of Lust',
        tier: 'minor',
        domain: 'sexual immorality',
        strength: 2000,
        weakness: ['fasting', 'accountability'],
        unlockCondition: 'hookup > 3'
    },
    {
        id: 'SPIRIT_OF_GREED',
        name: 'Spirit of Mammon',
        tier: 'minor',
        domain: 'love of money',
        strength: 2500,
        weakness: ['giving', 'contentment'],
        unlockCondition: 'siphoned > 100000'
    },
    {
        id: 'SPIRIT_OF_PRIDE',
        name: 'Spirit of Pride',
        tier: 'minor',
        domain: 'arrogance',
        strength: 2200,
        weakness: ['humility', 'service'],
        unlockCondition: 'fame > 5000'
    },
    {
        id: 'SPIRIT_OF_FEAR',
        name: 'Spirit of Fear',
        tier: 'minor',
        domain: 'anxiety and doubt',
        strength: 1800,
        weakness: ['faith declaration', 'worship'],
        unlockCondition: 'stress > 7000'
    },

    // Major demons
    {
        id: 'MARINE_SPIRIT',
        name: 'Marine Spirit',
        tier: 'major',
        domain: 'water spirits, financial blockage',
        strength: 5000,
        weakness: ['fire prayers', 'midnight vigil'],
        unlockCondition: 'visited_beach_ritual'
    },
    {
        id: 'JEZEBEL_SPIRIT',
        name: 'Jezebel Spirit',
        tier: 'major',
        domain: 'manipulation, false prophecy',
        strength: 5500,
        weakness: ['humility', 'truth speaking'],
        unlockCondition: 'fake_prophecies > 5'
    },
    {
        id: 'SPIRIT_OF_PYTHON',
        name: 'Python Spirit',
        tier: 'major',
        domain: 'constriction, slow death',
        strength: 4800,
        weakness: ['praise', 'persistence'],
        unlockCondition: 'members_leaving_streak > 10'
    },

    // Principalities
    {
        id: 'TERRITORIAL_SPIRIT',
        name: 'Territorial Spirit',
        tier: 'principality',
        domain: 'regional control',
        strength: 8000,
        weakness: ['united prayer', 'strategic warfare'],
        unlockCondition: 'fame > 8000 && members > 5000'
    },
    {
        id: 'ANCESTRAL_POWER',
        name: 'Ancestral Covenant',
        tier: 'principality',
        domain: 'family curses',
        strength: 7500,
        weakness: ['blood of Jesus', 'renunciation'],
        unlockCondition: 'family_curse_active'
    }
];

// ============================================================================
// BATTLE SYSTEM
// ============================================================================

export interface BattleResult {
    victory: boolean;
    playerDamage: number;
    demonWeakened: boolean;
    demonDefeated: boolean;
    rewards: Record<string, number>;
    narrative: string;
}

/**
 * Calculate battle outcome between player and demon
 */
export function fightDemon(
    demon: DemonEntity,
    spiritualState: SpiritualState,
    stats: CoreStats,
    tactics: string[]
): BattleResult {
    // Calculate player power
    let playerPower = spiritualState.prayerPower + spiritualState.fastingBonus;
    playerPower += stats.anointing * 0.5;
    playerPower += spiritualState.protectionLevel * 0.3;

    // Apply weakness bonuses
    const weaknessHit = tactics.filter(t => demon.weakness.includes(t)).length;
    playerPower *= (1 + weaknessHit * 0.3);

    // Apply vulnerability penalties
    const vulnerabilityHit = spiritualState.vulnerabilities.filter(v =>
        demon.domain.includes(v)
    ).length;
    playerPower *= (1 - vulnerabilityHit * 0.2);

    // Battle calculation
    const demonPower = demon.strength * (1 + Math.random() * 0.3);
    const powerRatio = playerPower / demonPower;

    // Determine outcome
    const roll = Math.random();
    const victory = roll < powerRatio;

    // Calculate damage
    const playerDamage = victory
        ? Math.floor(demon.strength * (1 - powerRatio) * 0.1)
        : Math.floor(demon.strength * 0.3);

    // Narrative
    const narratives = {
        victory: [
            `"In Jesus name!" The ${demon.name} fled in terror!`,
            `After intense prayer, the ${demon.name} was bound and cast out!`,
            `Your faith proved stronger than the ${demon.name}!`,
        ],
        defeat: [
            `The ${demon.name} overpowered your prayers. You need more fasting.`,
            `"The sons of Sceva tried this too..." The battle continues.`,
            `You retreated, wounded but wiser. More preparation needed.`,
        ]
    };

    return {
        victory,
        playerDamage,
        demonWeakened: victory && powerRatio > 0.8,
        demonDefeated: victory && powerRatio > 1.5,
        rewards: victory ? {
            anointing: Math.floor(demon.strength * 0.1),
            fame: demon.tier === 'principality' ? 500 : 100,
            prayerPower: 200,
        } : {},
        narrative: victory
            ? narratives.victory[Math.floor(Math.random() * narratives.victory.length)]
            : narratives.defeat[Math.floor(Math.random() * narratives.defeat.length)]
    };
}

// ============================================================================
// DELIVERANCE SESSIONS
// ============================================================================

export interface DeliveranceSession {
    targetMember: string;
    manifestations: string[];
    requiredPower: number;
    duration: number;  // Minutes
    successRate: number;
}

const MANIFESTATIONS = [
    'screaming', 'falling down', 'speaking in strange tongues',
    'supernatural strength', 'vomiting', 'confessing secrets',
    'snake-like movements', 'eye rolling', 'voice change'
];

/**
 * Generate a deliverance session scenario
 */
export function generateDeliveranceSession(
    memberName: string,
    difficulty: number
): DeliveranceSession {
    const manifestationCount = Math.floor(difficulty / 20) + 1;
    const manifestations = [];
    for (let i = 0; i < manifestationCount; i++) {
        manifestations.push(MANIFESTATIONS[Math.floor(Math.random() * MANIFESTATIONS.length)]);
    }

    return {
        targetMember: memberName,
        manifestations: [...new Set(manifestations)],
        requiredPower: difficulty * 50,
        duration: 30 + difficulty * 2,
        successRate: Math.max(20, 100 - difficulty),
    };
}

/**
 * Conduct deliverance and determine outcome
 */
export function conductDeliverance(
    session: DeliveranceSession,
    spiritualState: SpiritualState,
    approach: 'gentle' | 'aggressive' | 'team'
): { success: boolean; fameGain: number; scandalRisk: number; narrative: string } {
    let successBonus = 0;
    let scandalRisk = 10;

    switch (approach) {
        case 'gentle':
            successBonus = 10;
            scandalRisk = 5;
            break;
        case 'aggressive':
            successBonus = 30;
            scandalRisk = 40;
            break;
        case 'team':
            successBonus = 50;
            scandalRisk = 15;
            break;
    }

    const powerRatio = spiritualState.prayerPower / session.requiredPower;
    const successChance = (session.successRate + successBonus) * powerRatio;
    const success = Math.random() * 100 < successChance;

    return {
        success,
        fameGain: success ? session.duration * 5 : -100,
        scandalRisk: success ? scandalRisk * 0.5 : scandalRisk * 2,
        narrative: success
            ? `${session.targetMember} was delivered! The manifestations ceased after ${session.duration} minutes.`
            : `The deliverance was unsuccessful. ${session.targetMember} left confused. Some members doubt your power.`
    };
}

// ============================================================================
// JUJU / OCCULT TEMPTATIONS
// ============================================================================

export interface JujuOption {
    id: string;
    name: string;
    cost: number;
    effect: string;
    statBonus: Record<string, number>;
    consequences: string[];
    addictionLevel: number;  // How hard to quit
}

export const JUJU_OPTIONS: JujuOption[] = [
    {
        id: 'CHARM_MEMBERS',
        name: 'Member Attraction Charm',
        cost: 500000,
        effect: 'Doubles member growth rate',
        statBonus: { members: 200 },
        consequences: ['Members act strangely', 'Unexplained deaths'],
        addictionLevel: 3
    },
    {
        id: 'MONEY_RITUAL',
        name: 'Money Ritual',
        cost: 100000,
        effect: 'Immediate wealth',
        statBonus: { personalCash: 5000000 },
        consequences: ['Unexplained deaths', 'Madness risk', 'Terminal illness'],
        addictionLevel: 5
    },
    {
        id: 'POWER_CHARM',
        name: 'Power/Influence Charm',
        cost: 300000,
        effect: 'Political connections',
        statBonus: { influence: 500 },
        consequences: ['Bound to secret oaths', 'Required sacrifices'],
        addictionLevel: 4
    },
    {
        id: 'PROTECTION_RING',
        name: 'Native Doctor Protection',
        cost: 200000,
        effect: 'Protection from enemies',
        statBonus: { protectionLevel: 500 },
        consequences: ['Must avoid certain foods', 'Cannot enter some places'],
        addictionLevel: 2
    }
];

/**
 * Process juju consequences each week
 */
export function processJujuConsequences(
    activeJuju: JujuOption[],
    currentWeek: number
): { consequence: string; effect: Record<string, number> } | null {
    if (activeJuju.length === 0) return null;

    // Each juju has daily chance of consequence
    for (const juju of activeJuju) {
        const consequenceChance = juju.addictionLevel * 0.02;

        if (Math.random() < consequenceChance) {
            const consequence = juju.consequences[
                Math.floor(Math.random() * juju.consequences.length)
            ];

            return {
                consequence,
                effect: {
                    scandal: 500,
                    health: -300,
                    anointing: -500,
                }
            };
        }
    }

    return null;
}

// ============================================================================
// PRAYER SYSTEM
// ============================================================================

const PRAYER_TYPES = {
    'thanksgiving': { power: 100, duration: 5 },
    'intercession': { power: 200, duration: 15 },
    'warfare': { power: 400, duration: 30 },
    'midnight': { power: 600, duration: 120 },
    'mountain': { power: 800, duration: 480 },  // 8 hours
    'forty_day_fast': { power: 2000, duration: 960 * 40 },
};

/**
 * Calculate prayer power based on type and duration
 */
export function calculatePrayerPower(
    prayerType: keyof typeof PRAYER_TYPES,
    duration: number,
    anointing: number,
    fastingDays: number
): number {
    const base = PRAYER_TYPES[prayerType].power;
    const durationMultiplier = Math.min(2, duration / PRAYER_TYPES[prayerType].duration);
    const anointingMultiplier = 1 + (anointing / 10000);
    const fastingMultiplier = 1 + (fastingDays * 0.1);

    return Math.floor(base * durationMultiplier * anointingMultiplier * fastingMultiplier);
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createDefaultSpiritualState(): SpiritualState {
    return {
        protectionLevel: 5000,
        vulnerabilities: [],
        activeBlessing: null,
        activeCurse: null,
        prayerPower: 2000,
        fastingBonus: 0,
        lastDeliverance: 0,
        demonsFought: [],
        demonsDefeated: [],
    };
}
