/**
 * Causality Engine - Newton's Third Law for Game Events
 * 
 * Every action has consequences that may trigger days, weeks, or months later.
 * This creates emergent storytelling where choices have real, delayed impact.
 */

import type {
    ConsequenceChain,
    PendingConsequence,
    KarmaLedger,
    KarmaEntry,
    CoreStats
} from '@/types/game';

// ============================================================================
// CONSEQUENCE CHAIN DEFINITIONS
// ============================================================================

/**
 * Predefined consequence chains for various actions
 */
export const CONSEQUENCE_CHAINS: Record<string, Omit<ConsequenceChain, 'triggerWeek'>> = {
    // Financial corruption
    'SIPHON_SMALL': {
        triggerId: 'SIPHON_SMALL',
        triggerAction: 'Siphoned less than ₦100K',
        consequences: [
            { id: 'GUILT_1', delayWeeks: 2, probability: 0.3, severity: 'minor', eventTemplate: 'GUILTY_CONSCIENCE', modifiedBy: ['integrity'], fired: false },
        ]
    },
    'SIPHON_MEDIUM': {
        triggerId: 'SIPHON_MEDIUM',
        triggerAction: 'Siphoned ₦100K - ₦1M',
        consequences: [
            { id: 'ACCOUNTANT_NOTICE', delayWeeks: 4, probability: 0.4, severity: 'moderate', eventTemplate: 'ACCOUNTANT_QUESTIONS', modifiedBy: ['anointing'], fired: false },
            { id: 'MEMBER_SUSPICION', delayWeeks: 8, probability: 0.2, severity: 'minor', eventTemplate: 'SUSPICIOUS_MEMBER', modifiedBy: ['fame'], fired: false },
        ]
    },
    'SIPHON_LARGE': {
        triggerId: 'SIPHON_LARGE',
        triggerAction: 'Siphoned over ₦1M',
        consequences: [
            { id: 'EFCC_TIP', delayWeeks: 12, probability: 0.3, severity: 'major', eventTemplate: 'EFCC_INVESTIGATION', modifiedBy: ['influence'], fired: false },
            { id: 'ACCOUNTANT_EXPOSE', delayWeeks: 6, probability: 0.5, severity: 'major', eventTemplate: 'ACCOUNTANT_EXPOSED', modifiedBy: ['personalCash'], fired: false },
            { id: 'KARMA_RETURN', delayWeeks: 20, probability: 0.4, severity: 'moderate', eventTemplate: 'FINANCIAL_LOSS', modifiedBy: ['karma'], fired: false },
        ]
    },

    // Relationship betrayals
    'CHEAT_ON_PARTNER': {
        triggerId: 'CHEAT_ON_PARTNER',
        triggerAction: 'Cheated on partner',
        consequences: [
            { id: 'PARTNER_SUSPICION', delayWeeks: 3, probability: 0.4, severity: 'moderate', eventTemplate: 'PARTNER_SUSPICIOUS', modifiedBy: ['charisma'], fired: false },
            { id: 'BABY_MAMA_REVEAL', delayWeeks: 36, probability: 0.3, severity: 'catastrophic', eventTemplate: 'BABY_MAMA_APPEARS', modifiedBy: [], fired: false },
            { id: 'GUILT_SERMON', delayWeeks: 2, probability: 0.5, severity: 'minor', eventTemplate: 'AWKWARD_SERMON', modifiedBy: ['anointing'], fired: false },
        ]
    },

    // Fake miracles
    'STAGE_MIRACLE': {
        triggerId: 'STAGE_MIRACLE',
        triggerAction: 'Staged a fake miracle',
        consequences: [
            { id: 'BLOGGER_INVESTIGATION', delayWeeks: 8, probability: 0.4, severity: 'major', eventTemplate: 'BLOGGER_EXPOSES', modifiedBy: ['fame'], fired: false },
            { id: 'ACTOR_TALKS', delayWeeks: 20, probability: 0.3, severity: 'catastrophic', eventTemplate: 'FAKE_MIRACLE_EXPOSED', modifiedBy: ['personalCash'], fired: false },
        ]
    },

    // Political involvement
    'POLITICIAN_MONEY': {
        triggerId: 'POLITICIAN_MONEY',
        triggerAction: 'Accepted politician money',
        consequences: [
            { id: 'POLITICAL_FAVOR', delayWeeks: 10, probability: 0.6, severity: 'moderate', eventTemplate: 'POLITICIAN_CALLS_FAVOR', modifiedBy: ['influence'], fired: false },
            { id: 'OPPOSITION_TARGET', delayWeeks: 15, probability: 0.3, severity: 'major', eventTemplate: 'POLITICAL_ATTACK', modifiedBy: ['fame'], fired: false },
        ]
    },

    // Family neglect
    'IGNORE_FAMILY': {
        triggerId: 'IGNORE_FAMILY',
        triggerAction: 'Ignored family request',
        consequences: [
            { id: 'FAMILY_GOSSIP', delayWeeks: 4, probability: 0.5, severity: 'minor', eventTemplate: 'VILLAGE_GOSSIP', modifiedBy: [], fired: false },
            { id: 'FAMILY_CURSE', delayWeeks: 52, probability: 0.2, severity: 'major', eventTemplate: 'FAMILY_CURSE', modifiedBy: ['anointing'], fired: false },
        ]
    },
};

// ============================================================================
// CONSEQUENCE PROCESSING
// ============================================================================

/**
 * Register a new consequence chain when an action is taken
 */
export function registerConsequence(
    actionId: string,
    currentWeek: number
): ConsequenceChain | null {
    const template = CONSEQUENCE_CHAINS[actionId];
    if (!template) return null;

    return {
        ...template,
        triggerWeek: currentWeek,
    };
}

/**
 * Process pending consequences for the current week
 */
export function processPendingConsequences(
    chains: ConsequenceChain[],
    currentWeek: number,
    stats: CoreStats,
    netKarma: number
): { triggeredEvents: string[], updatedChains: ConsequenceChain[] } {
    const triggeredEvents: string[] = [];

    const updatedChains = chains.map(chain => {
        const updatedConsequences = chain.consequences.map(consequence => {
            if (consequence.fired) return consequence;

            const targetWeek = chain.triggerWeek + consequence.delayWeeks;
            if (currentWeek < targetWeek) return consequence;

            // Calculate modified probability
            let probability = consequence.probability;

            // Apply modifiers
            for (const modifier of consequence.modifiedBy) {
                if (modifier === 'karma') {
                    // High positive karma reduces bad consequences
                    probability *= (1 - (netKarma / 20000));
                } else if (modifier in stats) {
                    const statValue = stats[modifier as keyof CoreStats] as number;
                    // Higher stats can reduce probability
                    probability *= (1 - (statValue / 20000));
                }
            }

            // Roll the dice
            if (Math.random() < probability) {
                triggeredEvents.push(consequence.eventTemplate);
                return { ...consequence, fired: true };
            }

            return consequence;
        });

        return { ...chain, consequences: updatedConsequences };
    });

    return { triggeredEvents, updatedChains };
}

// ============================================================================
// KARMA SYSTEM
// ============================================================================

/**
 * Calculate karma impact of an action
 */
export function calculateKarmaImpact(
    action: string,
    category: 'good' | 'bad' | 'neutral'
): number {
    const karmaValues: Record<string, number> = {
        // Good actions (positive karma)
        'help_poor': 100,
        'genuine_prayer': 50,
        'refuse_bribe': 150,
        'help_family': 75,
        'honest_sermon': 60,
        'forgive_enemy': 120,
        'anonymous_good_deed': 200,

        // Bad actions (negative karma)
        'siphon_money': -150,
        'cheat_partner': -200,
        'fake_miracle': -300,
        'accept_bribe': -175,
        'neglect_family': -100,
        'slander_rival': -125,
        'exploit_member': -250,
    };

    return karmaValues[action] || (category === 'good' ? 50 : category === 'bad' ? -50 : 0);
}

/**
 * Add karma entry to ledger
 */
export function addKarmaEntry(
    ledger: KarmaLedger,
    action: string,
    week: number,
    value: number
): KarmaLedger {
    const entry: KarmaEntry = {
        action,
        week,
        karmaValue: value,
        resolved: false,
    };

    if (value >= 0) {
        return {
            ...ledger,
            positiveKarma: [...ledger.positiveKarma, entry],
            netKarma: ledger.netKarma + value,
        };
    } else {
        return {
            ...ledger,
            negativeKarma: [...ledger.negativeKarma, entry],
            netKarma: ledger.netKarma + value,
        };
    }
}

/**
 * Get karma tier based on net karma
 */
export function getKarmaTier(netKarma: number): string {
    if (netKarma >= 5000) return 'SAINT';
    if (netKarma >= 2000) return 'RIGHTEOUS';
    if (netKarma >= 500) return 'GOOD';
    if (netKarma >= -500) return 'NEUTRAL';
    if (netKarma >= -2000) return 'QUESTIONABLE';
    if (netKarma >= -5000) return 'CORRUPT';
    return 'EVIL';
}

// ============================================================================
// NEAR-MISS GENERATOR
// ============================================================================

const NEAR_MISSES = [
    "EFCC officers were at your gate... they had the wrong address.",
    "A blogger had your photo in a scandal story... their phone died before upload.",
    "Your wife found suspicious texts... the battery died before she finished reading.",
    "A newspaper was printing an exposé about you... their printing press broke.",
    "Someone recognized your 'miracle actor'... they got distracted and forgot.",
    "Your accountant was about to report you... they got a better job offer.",
    "The politician you crossed was planning retaliation... he got arrested first.",
    "Your baby mama was about to show up at church... she missed her bus.",
];

/**
 * Generate a near-miss event if conditions are right
 */
export function generateNearMiss(
    scandal: number,
    negativeKarmaCount: number
): string | null {
    // Only trigger near-misses when scandal is moderate-high
    if (scandal < 3000) return null;

    // Probability increases with scandal and negative karma
    const probability = (scandal / 10000) * 0.15 + (negativeKarmaCount * 0.02);

    if (Math.random() < probability) {
        return NEAR_MISSES[Math.floor(Math.random() * NEAR_MISSES.length)];
    }

    return null;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const createEmptyKarmaLedger = (): KarmaLedger => ({
    positiveKarma: [],
    negativeKarma: [],
    netKarma: 0,
});
