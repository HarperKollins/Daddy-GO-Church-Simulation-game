/**
 * Gatekept Actions System
 * 
 * Actions that unlock based on:
 * - Fame level
 * - Anointing level
 * - Members count
 * - Story progression
 * - Hidden flags
 * - Achievements
 */

import type { CoreStats, HiddenFlags } from '@/types/game';

// ============================================================================
// GATE DEFINITIONS
// ============================================================================

export interface ActionGate {
    id: string;
    name: string;
    category: 'ministry' | 'social' | 'financial' | 'dark' | 'political' | 'media';
    description: string;
    requirements: GateRequirement[];
    negativeRequirements?: GateRequirement[];  // Things that BLOCK this action
    unlockMessage: string;
}

export interface GateRequirement {
    type: 'stat' | 'flag' | 'achievement' | 'members' | 'week' | 'venue' | 'item';
    key: string;
    operator: 'gte' | 'lte' | 'eq' | 'neq' | 'exists' | 'not_exists';
    value: number | string | boolean;
}

// ============================================================================
// ACTION GATES DATABASE
// ============================================================================

export const ACTION_GATES: ActionGate[] = [
    // Ministry unlocks
    {
        id: 'HOLD_CRUSADE',
        name: 'Hold Citywide Crusade',
        category: 'ministry',
        description: 'Large outdoor evangelism event',
        requirements: [
            { type: 'members', key: 'members', operator: 'gte', value: 1000 },
            { type: 'stat', key: 'fame', operator: 'gte', value: 5000 },
            { type: 'stat', key: 'churchCash', operator: 'gte', value: 20000000 }
        ],
        unlockMessage: "🔓 Your ministry is now big enough to hold citywide crusades!"
    },
    {
        id: 'ORDINATION',
        name: 'Ordain Pastors',
        category: 'ministry',
        description: 'Ordain your own ministers',
        requirements: [
            { type: 'members', key: 'members', operator: 'gte', value: 500 },
            { type: 'stat', key: 'anointing', operator: 'gte', value: 6000 },
            { type: 'venue', key: 'venue', operator: 'gte', value: 'BUILDING' }
        ],
        unlockMessage: "🔓 You can now ordain pastors under your ministry!"
    },
    {
        id: 'HEALING_SERVICE',
        name: 'Hold Healing Services',
        category: 'ministry',
        description: 'Special miracle and healing programs',
        requirements: [
            { type: 'stat', key: 'anointing', operator: 'gte', value: 5000 },
            { type: 'members', key: 'members', operator: 'gte', value: 200 }
        ],
        unlockMessage: "🔓 Your anointing level qualifies you for miracle services!"
    },
    {
        id: 'DELIVERANCE_SESSION',
        name: 'Conduct Deliverance',
        category: 'ministry',
        description: 'Cast out demons',
        requirements: [
            { type: 'stat', key: 'anointing', operator: 'gte', value: 4000 },
            { type: 'stat', key: 'prayerPower', operator: 'gte', value: 3000 }
        ],
        unlockMessage: "🔓 You are now equipped for deliverance ministry!"
    },

    // Media unlocks
    {
        id: 'TV_BROADCAST',
        name: 'Start TV Program',
        category: 'media',
        description: 'Your own TV show',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 7000 },
            { type: 'stat', key: 'churchCash', operator: 'gte', value: 50000000 }
        ],
        unlockMessage: "🔓 Networks are interested in giving you airtime!"
    },
    {
        id: 'WRITE_BOOK',
        name: 'Publish a Book',
        category: 'media',
        description: 'Write and publish your own book',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 3000 },
            { type: 'members', key: 'members', operator: 'gte', value: 500 }
        ],
        unlockMessage: "🔓 Publishers are interested in your story!"
    },
    {
        id: 'PODCAST',
        name: 'Start a Podcast',
        category: 'media',
        description: 'Weekly podcast for broader reach',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 2000 }
        ],
        unlockMessage: "🔓 You can now start your own podcast!"
    },

    // Financial unlocks
    {
        id: 'BUY_PRIVATE_JET',
        name: 'Buy Private Jet',
        category: 'financial',
        description: 'The ultimate status symbol',
        requirements: [
            { type: 'stat', key: 'personalCash', operator: 'gte', value: 2000000000 },
            { type: 'stat', key: 'fame', operator: 'gte', value: 8000 }
        ],
        unlockMessage: "🔓 Private jet dealers are calling you now!"
    },
    {
        id: 'UNIVERSITY_OWNERSHIP',
        name: 'Found a University',
        category: 'financial',
        description: 'Start your own private university',
        requirements: [
            { type: 'stat', key: 'churchCash', operator: 'gte', value: 500000000 },
            { type: 'stat', key: 'fame', operator: 'gte', value: 9000 },
            { type: 'members', key: 'members', operator: 'gte', value: 10000 }
        ],
        unlockMessage: "🔓 You can now found your own university!"
    },
    {
        id: 'CRYPTO_TRADING',
        name: 'Crypto Trading',
        category: 'financial',
        description: 'Trade cryptocurrency',
        requirements: [
            { type: 'stat', key: 'personalCash', operator: 'gte', value: 500000 },
            { type: 'week', key: 'week', operator: 'gte', value: 10 }
        ],
        unlockMessage: "🔓 You now have access to crypto trading!"
    },

    // Political unlocks
    {
        id: 'POLITICAL_ENDORSEMENT',
        name: 'Endorse Politicians',
        category: 'political',
        description: 'Your voice can sway elections',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 6000 },
            { type: 'members', key: 'members', operator: 'gte', value: 5000 },
            { type: 'stat', key: 'influence', operator: 'gte', value: 2000 }
        ],
        unlockMessage: "🔓 Politicians are seeking your endorsement!"
    },
    {
        id: 'RUN_FOR_OFFICE',
        name: 'Run for Political Office',
        category: 'political',
        description: 'Enter politics yourself',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 8000 },
            { type: 'stat', key: 'influence', operator: 'gte', value: 5000 },
            { type: 'stat', key: 'personalCash', operator: 'gte', value: 100000000 }
        ],
        unlockMessage: "🔓 Party leaders want you to run for office!"
    },

    // Dark path unlocks
    {
        id: 'EMBEZZLE',
        name: 'Embezzle Church Funds',
        category: 'dark',
        description: 'Siphon money from offerings',
        requirements: [
            { type: 'stat', key: 'churchCash', operator: 'gte', value: 1000000 },
            { type: 'stat', key: 'morality', operator: 'lte', value: 40 }
        ],
        negativeRequirements: [
            { type: 'stat', key: 'integrity', operator: 'gte', value: 80 }
        ],
        unlockMessage: "⚠️ Dark path available: Embezzle from church funds..."
    },
    {
        id: 'VISIT_JUJU',
        name: 'Visit Native Doctor',
        category: 'dark',
        description: 'Seek power from other sources',
        requirements: [
            { type: 'stat', key: 'anointing', operator: 'lte', value: 3000 },
            { type: 'week', key: 'week', operator: 'gte', value: 20 }
        ],
        unlockMessage: "⚠️ Dark path available: A native doctor knows your troubles..."
    },
    {
        id: 'FAKE_MIRACLE',
        name: 'Stage Fake Miracle',
        category: 'dark',
        description: 'Use actors to fake healings',
        requirements: [
            { type: 'stat', key: 'anointing', operator: 'lte', value: 4000 },
            { type: 'stat', key: 'fame', operator: 'gte', value: 2000 },
            { type: 'stat', key: 'morality', operator: 'lte', value: 30 }
        ],
        unlockMessage: "⚠️ Dark path available: Your PA knows some actors..."
    },
    {
        id: 'YAHOO_CONNECTION',
        name: 'Connect with Yahoo Boys',
        category: 'dark',
        description: 'They want spiritual cover',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 3000 },
            { type: 'stat', key: 'morality', operator: 'lte', value: 35 }
        ],
        unlockMessage: "⚠️ Dark path available: Yahoo boys need your blessings..."
    },

    // Social unlocks
    {
        id: 'VIP_CLUBS',
        name: 'Access VIP Clubs',
        category: 'social',
        description: 'Elite nightlife access',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 7000 }
        ],
        unlockMessage: "🔓 VIP sections are now open to you!"
    },
    {
        id: 'CELEBRITY_MARRIAGE',
        name: 'Marry Celebrity',
        category: 'social',
        description: 'High-profile marriage options',
        requirements: [
            { type: 'stat', key: 'fame', operator: 'gte', value: 6000 },
            { type: 'flag', key: 'single', operator: 'eq', value: true }
        ],
        unlockMessage: "🔓 Celebrity marriage prospects available!"
    }
];

// ============================================================================
// GATE CHECKING FUNCTIONS
// ============================================================================

/**
 * Check if a single requirement is met
 */
export function checkRequirement(
    req: GateRequirement,
    stats: CoreStats,
    members: number,
    week: number,
    flags: HiddenFlags,
    venue: string,
    achievements: string[]
): boolean {
    let value: number | string | boolean;

    switch (req.type) {
        case 'stat':
            value = stats[req.key as keyof CoreStats] ?? 0;
            break;
        case 'members':
            value = members;
            break;
        case 'week':
            value = week;
            break;
        case 'flag':
            value = flags[req.key as keyof HiddenFlags] ?? false;
            break;
        case 'venue':
            value = venue;
            break;
        case 'achievement':
            value = achievements.includes(req.key);
            break;
        default:
            return false;
    }

    switch (req.operator) {
        case 'gte':
            return (value as number) >= (req.value as number);
        case 'lte':
            return (value as number) <= (req.value as number);
        case 'eq':
            return value === req.value;
        case 'neq':
            return value !== req.value;
        case 'exists':
            return value !== undefined && value !== null && value !== false;
        case 'not_exists':
            return value === undefined || value === null || value === false;
        default:
            return false;
    }
}

/**
 * Check if an action gate is unlocked
 */
export function isActionUnlocked(
    gate: ActionGate,
    stats: CoreStats,
    members: number,
    week: number,
    flags: HiddenFlags,
    venue: string,
    achievements: string[]
): boolean {
    // Check all positive requirements
    const requirementsMet = gate.requirements.every(req =>
        checkRequirement(req, stats, members, week, flags, venue, achievements)
    );

    if (!requirementsMet) return false;

    // Check negative requirements (things that block)
    if (gate.negativeRequirements) {
        const blocked = gate.negativeRequirements.some(req =>
            checkRequirement(req, stats, members, week, flags, venue, achievements)
        );
        if (blocked) return false;
    }

    return true;
}

/**
 * Get all currently unlocked actions
 */
export function getUnlockedActions(
    stats: CoreStats,
    members: number,
    week: number,
    flags: HiddenFlags,
    venue: string,
    achievements: string[]
): ActionGate[] {
    return ACTION_GATES.filter(gate =>
        isActionUnlocked(gate, stats, members, week, flags, venue, achievements)
    );
}

/**
 * Get actions that are close to unlocking (progress > 50%)
 */
export function getAlmostUnlockedActions(
    stats: CoreStats,
    members: number,
    week: number,
    flags: HiddenFlags,
    venue: string,
    achievements: string[]
): Array<{ gate: ActionGate; progress: number; missingReqs: string[] }> {
    const results: Array<{ gate: ActionGate; progress: number; missingReqs: string[] }> = [];

    for (const gate of ACTION_GATES) {
        const metCount = gate.requirements.filter(req =>
            checkRequirement(req, stats, members, week, flags, venue, achievements)
        ).length;

        const progress = metCount / gate.requirements.length;

        if (progress > 0.5 && progress < 1) {
            const missingReqs = gate.requirements
                .filter(req => !checkRequirement(req, stats, members, week, flags, venue, achievements))
                .map(req => `${req.key} ${req.operator} ${req.value}`);

            results.push({ gate, progress, missingReqs });
        }
    }

    return results.sort((a, b) => b.progress - a.progress);
}

// ============================================================================
// EXPORTS
// ============================================================================

export function getActionsByCategory(category: ActionGate['category']): ActionGate[] {
    return ACTION_GATES.filter(gate => gate.category === category);
}
