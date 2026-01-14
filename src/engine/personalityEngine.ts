/**
 * Personality Engine (ML-Lite)
 * 
 * Tracks player choices to build a personality profile.
 * This affects:
 * - Which events are more likely to trigger
 * - NPC reactions to the player
 * - Story arc selection
 * - Ending determination
 */

import type {
    PlayerPersonality,
    ChoiceRecord,
    GameEvent
} from '@/types/game';

// ============================================================================
// PERSONALITY TRAITS CALCULATION
// ============================================================================

/**
 * Choice categories that affect personality traits
 */
const CHOICE_PERSONALITY_MAP: Record<string, Record<string, number>> = {
    // Morality impact
    'help_poor': { morality: 10, empathy: 15 },
    'refuse_bribe': { morality: 15, spirituality: 5 },
    'honest_sermon': { morality: 10, spirituality: 10 },
    'siphon_money': { morality: -15, ambition: 5 },
    'cheat_partner': { morality: -20, empathy: -10 },
    'fake_miracle': { morality: -25, ambition: 10 },
    'accept_bribe': { morality: -15 },
    'exploit_member': { morality: -20, empathy: -15 },

    // Ambition impact
    'build_bigger_church': { ambition: 15 },
    'pursue_fame': { ambition: 10, spirituality: -5 },
    'seek_political_power': { ambition: 20, influence: 10 },
    'humble_service': { ambition: -10, spirituality: 15 },

    // Spirituality impact
    'genuine_prayer': { spirituality: 10, morality: 5 },
    'night_vigil': { spirituality: 15 },
    'fast_for_days': { spirituality: 20, empathy: 5 },
    'skip_prayer': { spirituality: -5 },
    'stage_miracle': { spirituality: -25 },

    // Risk tolerance
    'take_risk': { riskTolerance: 10 },
    'play_safe': { riskTolerance: -5 },
    'confront_cult': { riskTolerance: 20 },
    'avoid_conflict': { riskTolerance: -10 },

    // Empathy
    'help_family': { empathy: 15, morality: 5 },
    'ignore_need': { empathy: -20 },
    'sacrifice_for_others': { empathy: 25 },
};

/**
 * Create empty personality profile
 */
export function createEmptyPersonality(): PlayerPersonality {
    return {
        morality: 50,
        ambition: 50,
        spirituality: 50,
        riskTolerance: 50,
        empathy: 50,
        choiceHistory: [],
        dominantTraits: [],
    };
}

/**
 * Record a choice and update personality
 */
export function recordChoiceAndUpdatePersonality(
    personality: PlayerPersonality,
    eventId: string,
    choiceId: string,
    week: number,
    category: string,
    outcome: 'positive' | 'negative' | 'neutral'
): PlayerPersonality {
    // Add to history
    const moralWeight = CHOICE_PERSONALITY_MAP[choiceId] ?
        (CHOICE_PERSONALITY_MAP[choiceId].morality || 0) : 0;

    const newRecord: ChoiceRecord = {
        eventId,
        choiceId,
        week,
        category,
        moralWeight,
        outcome,
    };

    // Update traits based on choice
    const impacts = CHOICE_PERSONALITY_MAP[choiceId] || {};
    let newPersonality = {
        ...personality,
        choiceHistory: [...personality.choiceHistory, newRecord],
    };

    // Apply impacts with diminishing returns
    for (const [trait, impact] of Object.entries(impacts)) {
        if (trait in newPersonality) {
            const currentValue = newPersonality[trait as keyof PlayerPersonality] as number;
            // Diminishing returns: impact reduces as you approach extremes
            const diminishedImpact = impact * (1 - Math.abs(currentValue - 50) / 100);
            (newPersonality as Record<string, unknown>)[trait] = clamp(currentValue + diminishedImpact, 0, 100);
        }
    }

    // Update dominant traits
    newPersonality.dominantTraits = calculateDominantTraits(newPersonality);

    return newPersonality;
}

/**
 * Calculate dominant traits based on current values
 */
function calculateDominantTraits(personality: PlayerPersonality): string[] {
    const traits: string[] = [];

    if (personality.morality >= 70) traits.push('RIGHTEOUS');
    if (personality.morality <= 30) traits.push('CORRUPT');
    if (personality.ambition >= 70) traits.push('POWER_HUNGRY');
    if (personality.ambition <= 30) traits.push('CONTENT');
    if (personality.spirituality >= 70) traits.push('GENUINE_FAITH');
    if (personality.spirituality <= 30) traits.push('FAKE_FAITH');
    if (personality.riskTolerance >= 70) traits.push('RECKLESS');
    if (personality.riskTolerance <= 30) traits.push('CAUTIOUS');
    if (personality.empathy >= 70) traits.push('SELFLESS');
    if (personality.empathy <= 30) traits.push('SELFISH');

    return traits;
}

// ============================================================================
// EVENT WEIGHTING BASED ON PERSONALITY
// ============================================================================

/**
 * Calculate event probability weight based on player personality
 */
export function calculateEventWeight(
    event: GameEvent,
    personality: PlayerPersonality,
    baseWeight: number
): number {
    let weight = baseWeight;

    // Scandal events more likely for corrupt players
    if (event.category === 'crisis' && event.id.includes('SCANDAL')) {
        if (personality.morality <= 30) {
            weight *= 1.5;
        } else if (personality.morality >= 70) {
            weight *= 0.5;
        }
    }

    // Miracle events more likely for spiritual players
    if (event.id.includes('MIRACLE') || event.id.includes('DELIVERANCE')) {
        weight *= (personality.spirituality / 50);
    }

    // Family conflict events more likely for low empathy
    if (event.category === 'random' && event.id.includes('FAMILY')) {
        if (personality.empathy <= 30) {
            weight *= 1.5;
        }
    }

    // Opportunity events more likely for ambitious players
    if (event.category === 'opportunity') {
        weight *= (personality.ambition / 50);
    }

    // High-risk events more likely for reckless players
    if (event.id.includes('CULT') || event.id.includes('DANGER')) {
        weight *= (personality.riskTolerance / 50);
    }

    return weight;
}

/**
 * Determine player's story arc based on personality
 */
export function detectStoryArc(personality: PlayerPersonality): string {
    const traits = personality.dominantTraits;

    if (traits.includes('CORRUPT') && traits.includes('POWER_HUNGRY')) {
        return 'FALL_FROM_GRACE';
    }
    if (traits.includes('RIGHTEOUS') && traits.includes('GENUINE_FAITH')) {
        return 'TRUE_PROPHET';
    }
    if (traits.includes('POWER_HUNGRY') && personality.ambition >= 80) {
        return 'EMPIRE_BUILDER';
    }
    if (traits.includes('RECKLESS')) {
        return 'VIRAL_PASTOR';
    }
    if (traits.includes('SELFLESS') && traits.includes('CONTENT')) {
        return 'HUMBLE_SHEPHERD';
    }
    if (traits.includes('CORRUPT') && traits.includes('FAKE_FAITH')) {
        return 'WOLF_IN_SHEEPS_CLOTHING';
    }

    return 'BALANCED_MINISTRY';
}

/**
 * Get ending type based on final personality state
 */
export function getEndingType(personality: PlayerPersonality): string {
    const arc = detectStoryArc(personality);

    switch (arc) {
        case 'TRUE_PROPHET':
            return personality.empathy >= 70 ? 'SAINTHOOD' : 'RESPECTED_LEGACY';
        case 'FALL_FROM_GRACE':
            return 'PRISON_OR_EXILE';
        case 'EMPIRE_BUILDER':
            return personality.morality >= 50 ? 'MEGA_CHURCH_LEGACY' : 'EFCC_INVESTIGATION';
        case 'HUMBLE_SHEPHERD':
            return 'PEACEFUL_RETIREMENT';
        case 'WOLF_IN_SHEEPS_CLOTHING':
            return 'EXPOSURE_AND_DISGRACE';
        default:
            return 'MIXED_LEGACY';
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Get personality summary for display
 */
export function getPersonalitySummary(personality: PlayerPersonality): string {
    const arc = detectStoryArc(personality);
    const traits = personality.dominantTraits;

    const arcDescriptions: Record<string, string> = {
        'TRUE_PROPHET': 'A genuine man of God, walking in righteousness',
        'FALL_FROM_GRACE': 'Once pure, now corrupted by power and wealth',
        'EMPIRE_BUILDER': 'Building a ministry empire at any cost',
        'HUMBLE_SHEPHERD': 'Content to serve, not seeking fame',
        'VIRAL_PASTOR': 'Controversial, attention-seeking, unpredictable',
        'WOLF_IN_SHEEPS_CLOTHING': 'Fake faith, exploiting the flock',
        'BALANCED_MINISTRY': 'Walking the line between worlds',
    };

    return arcDescriptions[arc] || 'Your story is still being written...';
}
